// 레퍼런스 중 `github:` 필드가 있는 저장소의 README를 가져와 src/imported/<slug>.json에 스냅숏으로 저장한다.
// 자유 라이선스(퍼블릭 도메인·CC0·MIT 등)인 저장소만 가져온다. 빌드는 네트워크 없이 이 스냅숏만 읽는다.
import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { marked } from 'marked';
import sanitizeHtml from 'sanitize-html';

const ALLOWED = new Set(['Unlicense', 'CC0-1.0', 'MIT', 'CC-BY-4.0', 'Apache-2.0', 'BSD-2-Clause', 'BSD-3-Clause']);
const dir = new URL('../src/content/references/', import.meta.url);
const out = new URL('../src/imported/', import.meta.url);
const headers = { 'User-Agent': 'regula-sync', Accept: 'application/vnd.github+json' };
if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;

const gh = async (path, accept) => {
  const res = await fetch(`https://api.github.com${path}`, { headers: accept ? { ...headers, Accept: accept } : headers });
  if (!res.ok) throw new Error(`${path}: ${res.status}`);
  return accept ? res.text() : res.json();
};

for (const file of readdirSync(dir).filter((f) => f.endsWith('.md'))) {
  const repo = readFileSync(new URL(file, dir), 'utf8').match(/^github:\s*"?([^"\n]+)"?/m)?.[1];
  if (!repo) continue;
  const slug = file.replace(/\.md$/, '');
  const meta = await gh(`/repos/${repo}`);
  const license = meta.license?.spdx_id ?? 'NOASSERTION';
  if (!ALLOWED.has(license)) {
    console.warn(`건너뜀 ${repo}: 라이선스 ${license} — 링크와 내 정리만 남긴다`);
    continue;
  }
  const branch = meta.default_branch;
  const md = await gh(`/repos/${repo}/readme`, 'application/vnd.github.raw');

  // README 안의 상대 경로를 GitHub 원본 주소로 바꾼다
  const abs = (u, raw) => {
    if (!u || /^(https?:|mailto:|#)/.test(u)) return u;
    const base = raw ? `https://raw.githubusercontent.com/${repo}/${branch}/` : `https://github.com/${repo}/blob/${branch}/`;
    return new URL(u.replace(/^\//, ''), base).href;
  };
  const html = sanitizeHtml(await marked.parse(md), {
    allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img', 'h1', 'h2', 'details', 'summary']),
    allowedAttributes: { a: ['href', 'name', 'id', 'target', 'rel'], img: ['src', 'alt', 'width', 'height', 'loading'], '*': ['id'] },
    allowedSchemes: ['http', 'https', 'mailto'],
    transformTags: {
      a: (tag, attribs) => {
        const href = abs(attribs.href, false);
        const ext = href && !href.startsWith('#');
        return { tagName: 'a', attribs: ext ? { ...attribs, href, target: '_blank', rel: 'noopener' } : attribs };
      },
      img: (tag, attribs) => ({ tagName: 'img', attribs: { ...attribs, src: abs(attribs.src, true), loading: 'lazy' } }),
    },
  });

  writeFileSync(
    new URL(`${slug}.json`, out),
    JSON.stringify({ repo, license, branch, fetchedAt: new Date().toISOString().slice(0, 10), html }, null, 1) + '\n',
  );
  console.log(`가져옴 ${repo} (${license}) → src/imported/${slug}.json`);
}
