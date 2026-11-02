// WCAG 2.2 성공 기준(원칙 · 지침 · 성공 기준)을 W3C가 공개한 wcag.json에서 가져와
// src/imported/w3c/wcag22.json에 스냅숏으로 저장한다. 빌드는 네트워크 없이 이 스냅숏만 읽는다.
//
// 라이선스: W3C Document License(2023). 복제 · 배포는 허용, 고치거나 번역해 싣는 것은 허용되지 않는다.
// 그래서 문장은 원문 그대로 두고, 바꾸는 건 표시용 마크업(id 지우기, 링크를 새 탭으로)뿐이다.
// 페이지에는 원문 링크 · 저작권 고지 · 문서 상태(STATUS)를 함께 보인다(docs/source-check.md 20차).
import { mkdirSync, writeFileSync } from 'node:fs';
import sanitizeHtml from 'sanitize-html';

const JSON_URL = 'https://www.w3.org/WAI/WCAG22/wcag.json';
const TR_URL = 'https://www.w3.org/TR/WCAG22/';
const LICENSE_URL = 'https://www.w3.org/copyright/document-license-2023/';
const out = new URL('../src/imported/w3c/', import.meta.url);

const get = async (url, as) => {
  const res = await fetch(url, { headers: { 'User-Agent': 'regula-sync' } });
  if (!res.ok) throw new Error(`${url}: ${res.status}`);
  return as === 'json' ? res.json() : res.text();
};

const [data, tr] = await Promise.all([get(JSON_URL, 'json'), get(TR_URL)]);

// 라이선스가 바뀌었으면 멈춘다
if (!tr.includes('https://www.w3.org/copyright/document-license/')) {
  throw new Error('TR 문서의 저작권 줄에서 W3C Document License 링크를 찾지 못함 — 라이선스를 다시 확인할 것');
}
// 문서 상태: <p id="w3c-state"><a …>W3C Recommendation</a> <time datetime="2024-12-12">12 December 2024</time></p>
const state = tr.match(/<p id="w3c-state">([\s\S]*?)<\/p>/)?.[1];
if (!state) throw new Error('TR 문서에서 w3c-state를 찾지 못함');
const status = state.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
const published = state.match(/datetime="([\d-]+)"/)?.[1] ?? '';

const clean = (html) =>
  sanitizeHtml(html, {
    allowedTags: ['p', 'a', 'dl', 'dt', 'dd', 'ul', 'ol', 'li', 'abbr', 'code', 'cite', 'em', 'strong', 'div', 'span'],
    allowedAttributes: { a: ['href', 'title', 'target', 'rel'], abbr: ['title'], div: ['class'], span: ['class'] },
    allowedClasses: { div: ['note'], span: [] },
    allowedSchemes: ['https', 'http'],
    transformTags: {
      a: (tag, attribs) => ({
        tagName: 'a',
        attribs: { ...attribs, href: new URL(attribs.href ?? '', TR_URL).href, target: '_blank', rel: 'noopener' },
      }),
      // 노트 제목(<div class="note-title"><span>Note</span></div>)은 문단 앞 꼬리표로
      div: (tag, attribs) =>
        /\bnote-title\b/.test(attribs.class ?? '') ? { tagName: 'span', attribs: {} } : { tagName: 'div', attribs },
    },
  })
    .replace(/<span>\s*<span>([^<]*)<\/span>\s*<\/span>/g, '<strong>$1</strong> ')
    .replace(/\n\s*\n/g, '\n')
    .trim();

const principles = data.principles.map((p) => ({
  num: p.num,
  handle: p.handle,
  html: clean(p.content),
  guidelines: p.guidelines.map((g) => ({
    num: g.num,
    id: g.id,
    handle: g.handle,
    html: clean(g.content),
    criteria: g.successcriteria.map((s) => ({
      num: s.num,
      id: s.id,
      handle: s.handle,
      level: s.level || '',
      versions: s.versions,
      html: clean(s.content),
    })),
  })),
}));

const count = principles.flatMap((p) => p.guidelines.flatMap((g) => g.criteria)).length;
mkdirSync(out, { recursive: true });
writeFileSync(
  new URL('wcag22.json', out),
  JSON.stringify(
    {
      title: 'Web Content Accessibility Guidelines (WCAG) 2.2',
      url: TR_URL,
      source: JSON_URL,
      status,
      published,
      license: 'W3C Document License',
      licenseUrl: LICENSE_URL,
      notice: `Copyright © ${published.slice(0, 4) || '2024'} World Wide Web Consortium. https://www.w3.org/copyright/document-license-2023/`,
      fetchedAt: new Date().toISOString().slice(0, 10),
      principles,
    },
    null,
    1,
  ) + '\n',
);
console.log(`가져옴 WCAG 2.2 성공 기준 ${count}개 (${status}) → src/imported/w3c/wcag22.json`);
