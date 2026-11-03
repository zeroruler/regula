// GOV.UK Design System에서 Regula가 출처로 쓴 컴포넌트 · 패턴 안내 페이지를 가져와
// src/imported/govuk/pages.json에 스냅숏으로 저장한다. 빌드는 네트워크 없이 이 스냅숏만 읽는다.
//
// 라이선스(docs/source-check.md 21차): 사이트 글은 Open Government Licence v3.0
// ("All content is available under the Open Government Licence v3.0, except where otherwise stated"),
// 저장소 코드는 MIT. OGL은 복제 · 배포 · 고치기를 허용하고, 출처 표시 문구와 라이선스 링크를 요구한다.
// 글은 고치지 않고, 바꾸는 건 템플릿 문법(Nunjucks)을 걷어 내고 예시를 원문 링크로 바꾸는 것뿐이다.
//
// 어떤 페이지를 가져올지: refs에 "gov-uk"를 넣은 공식 · 패턴의 글에서 "GOV.UK Design System <페이지 이름>"을
// 찾아 그 페이지를 가져오고, EXTRA에 적은 페이지를 더한다.
import { execSync } from 'node:child_process';
import { mkdtempSync, readFileSync, readdirSync, writeFileSync, mkdirSync, rmSync, existsSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { marked } from 'marked';
import sanitizeHtml from 'sanitize-html';

const REPO = 'alphagov/govuk-design-system';
const SITE = 'https://design-system.service.gov.uk';
const OGL = 'https://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/';
// 레퍼런스 정리(src/content/references/gov-uk.md)의 "볼 것"에 적은 페이지
const EXTRA = ['components/error-summary', 'patterns/validation', 'patterns/question-pages'];

const root = new URL('../', import.meta.url);
const out = new URL('src/imported/govuk/', root);

// 1. 라이선스가 그대로인지 확인한다
const home = await (await fetch(SITE, { headers: { 'User-Agent': 'regula-sync' } })).text();
if (!/All content is available under the[\s\S]{0,300}open-government-licence\/version\/3[\s\S]{0,120}Open Government Licence v3\.0/.test(home)) {
  throw new Error('사이트 바닥글에서 OGL v3.0 문구를 찾지 못함 — 라이선스를 다시 확인할 것');
}

// 2. 저장소를 받는다(얕은 복제)
const dir = mkdtempSync(join(tmpdir(), 'govuk-'));
try {
  execSync(`git clone -q --depth 1 https://github.com/${REPO}.git "${dir}"`, { stdio: 'inherit' });
  if (!/^MIT License/.test(readFileSync(join(dir, 'LICENSE'), 'utf8'))) throw new Error('저장소 LICENSE가 MIT가 아님');
  const commit = execSync('git log -1 --format=%H', { cwd: dir }).toString().trim();
  const committed = execSync('git log -1 --format=%cs', { cwd: dir }).toString().trim();

  // 3. 컴포넌트 · 패턴 페이지 목록(제목 · 별칭)
  const all = [];
  for (const section of ['components', 'patterns']) {
    for (const slug of readdirSync(join(dir, 'src', section))) {
      const file = join(dir, 'src', section, slug, 'index.md');
      if (!existsSync(file)) continue;
      const src = readFileSync(file, 'utf8');
      const fm = src.match(/^---\n([\s\S]*?)\n---\n/);
      if (!fm) continue;
      const field = (k) => fm[1].match(new RegExp(`^${k}:\\s*(.+)$`, 'm'))?.[1].trim().replace(/^["']|["']$/g, '');
      all.push({
        path: `${section}/${slug}`,
        section,
        title: field('title'),
        description: field('description') ?? '',
        aliases: (field('aliases') ?? '').split(',').map((a) => a.trim().toLowerCase()).filter(Boolean),
        body: src.slice(fm[0].length),
      });
    }
  }

  // 4. Regula 항목이 이름으로 가리킨 페이지를 고른다
  const contentDir = new URL('src/content/', root);
  const files = (sub) =>
    readdirSync(new URL(sub, contentDir), { recursive: true }).filter((f) => f.endsWith('.md')).map((f) => new URL(`${sub}${f}`, contentDir));
  const named = new Set();
  for (const f of [...files('formulas/'), ...files('patterns/')]) {
    const text = readFileSync(f, 'utf8');
    if (!/^refs:.*"gov-uk"/m.test(text)) continue;
    for (const m of text.matchAll(/GOV\.UK Design System\s*「?([A-Z][A-Za-z' -]*?)\s*(?:」|"|\(|·|,|$)/gm)) named.add(m[1].trim().toLowerCase());
  }
  const matches = (p, name) => name === p.title.toLowerCase() || p.aliases.some((a) => name === a || name.startsWith(`${a} `));
  const wanted = all.filter((p) => EXTRA.includes(p.path) || [...named].some((n) => matches(p, n)));
  const unmatched = [...named].filter((n) => !all.some((p) => matches(p, n)));
  if (unmatched.length) console.warn(`GOV.UK에서 찾지 못한 이름: ${unmatched.join(', ')}`);
  const imported = new Set(wanted.map((p) => p.path));

  // 5. 본문: Nunjucks를 걷어 내고 마크다운을 HTML로
  const exampleLink = (args, path) => {
    const item = args.match(/item:\s*"([^"]+)"/)?.[1];
    const group = args.match(/group:\s*"([^"]+)"/)?.[1];
    const example = args.match(/example:\s*"([^"]+)"/)?.[1];
    if (!item || !group || !example) return '';
    return `\n\n<p class="gv-example"><a href="${SITE}/${group}/${item}/${example}/index.html">Example: ${example}</a></p>\n\n`;
  };
  const toHtml = (p) => {
    let md = p.body
      .replace(/\{%-?\s*from [^%]*%\}/g, '')
      .replace(/\{%-?\s*call govukInsetText\(\)\s*-?%\}([\s\S]*?)\{%-?\s*endcall\s*-?%\}/g, (_m, inner) => `\n\n<div class="gv-inset">\n\n${inner.trim()}\n\n</div>\n\n`)
      .replace(/\{\{-?\s*example\(\{([\s\S]*?)\}\)\s*-?\}\}/g, (_m, args) => exampleLink(args, p.path));
    const left = md.match(/\{\{[\s\S]*?\}\}|\{%[\s\S]*?%\}/g);
    if (left) {
      console.warn(`${p.path}: 처리하지 못한 템플릿 ${left.length}개를 뺌`);
      md = md.replace(/\{\{[\s\S]*?\}\}|\{%[\s\S]*?%\}/g, '');
    }
    const base = `${SITE}/${p.path}/`;
    const link = (href) => {
      if (!href || /^(mailto:|#)/.test(href)) return { href };
      const abs = new URL(href, base);
      if (abs.origin === SITE) {
        const target = abs.pathname.replace(/^\/|\/$/g, '');
        // 함께 가져온 페이지면 이 페이지 안으로
        if (imported.has(target)) return { href: `#gv-${target.replace('/', '-')}${abs.hash ? `--${abs.hash.slice(1)}` : ''}`, internal: true };
      }
      return { href: abs.href };
    };
    return sanitizeHtml(marked.parse(md, { async: false }), {
      allowedTags: ['h2', 'h3', 'h4', 'p', 'a', 'ul', 'ol', 'li', 'strong', 'em', 'code', 'pre', 'blockquote', 'img', 'table', 'thead', 'tbody', 'tr', 'th', 'td', 'div', 'br', 'hr'],
      allowedAttributes: { a: ['href', 'target', 'rel'], img: ['src', 'alt', 'loading'], div: ['class'], p: ['class'], '*': ['id'] },
      allowedClasses: { div: ['gv-inset'], p: ['gv-example'] },
      allowedSchemes: ['https', 'http', 'mailto'],
      transformTags: {
        a: (tag, attribs) => {
          const l = link(attribs.href);
          return { tagName: 'a', attribs: l.internal || l.href?.startsWith('#') ? { href: l.href } : { href: l.href, target: '_blank', rel: 'noopener' } };
        },
        img: (tag, attribs) => ({ tagName: 'img', attribs: { ...attribs, src: new URL(attribs.src ?? '', base).href, loading: 'lazy' } }),
      },
    })
      // 제목에 페이지별 id를 붙여, 원문 안의 #링크와 다른 페이지에서 오는 링크가 닿게 한다
      .replace(/<h([234])>([\s\S]*?)<\/h\1>/g, (_m, l, inner) => {
        const id = inner.replace(/<[^>]+>/g, '').toLowerCase().replace(/&[a-z#0-9]+;/g, '').replace(/[^a-z0-9\s-]/g, '').trim().replace(/\s+/g, '-');
        return `<h${l} id="gv-${p.path.replace('/', '-')}--${id}">${inner}</h${l}>`;
      })
      .replace(/href="#(?!gv-)([^"]+)"/g, `href="#gv-${p.path.replace('/', '-')}--$1"`);
  };

  const pages = wanted.map((p) => ({
    path: p.path,
    id: `gv-${p.path.replace('/', '-')}`,
    section: p.section === 'components' ? 'Component' : 'Pattern',
    title: p.title,
    aliases: p.aliases,
    description: p.description,
    url: `${SITE}/${p.path}/`,
    html: toHtml(p),
  }));

  mkdirSync(out, { recursive: true });
  writeFileSync(
    new URL('pages.json', out),
    JSON.stringify(
      {
        site: SITE,
        repo: REPO,
        commit,
        committed,
        license: 'Open Government Licence v3.0',
        licenseUrl: OGL,
        attribution: 'Contains public sector information licensed under the Open Government Licence v3.0.',
        fetchedAt: new Date().toISOString().slice(0, 10),
        pages,
      },
      null,
      1,
    ) + '\n',
  );
  console.log(`가져옴 GOV.UK 페이지 ${pages.length}개 (${REPO}@${commit.slice(0, 7)}, ${committed}) → src/imported/govuk/pages.json`);
  console.log(pages.map((p) => `  ${p.path}`).join('\n'));
} finally {
  rmSync(dir, { recursive: true, force: true });
}
