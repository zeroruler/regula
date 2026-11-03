// 공개 디자인 시스템 문서 저장소(MDX)에서 Regula가 쓰는 페이지를 가져와 src/imported/docs/<key>.json에 저장한다.
// 빌드는 네트워크 없이 이 스냅숏만 읽는다. 사용: npm run sync-docs [-- carbon|primer]
//
// 라이선스와 판본(docs/source-check.md 22차):
// - Carbon: carbon-design-system/carbon-website, Apache-2.0. 2026-09-30에 보관됨("The Carbon website has moved to
//   PayloadCMS"). 지금 사이트(carbondesignsystem.com)는 새 CMS에서 나오고 따로 라이선스를 밝히지 않아,
//   라이선스가 분명한 보관본을 가져온다.
// - Primer: primer/design, MIT. 2025-07-01 이후 커밋이 없고 지금 primer.style은 다른 곳에서 빌드된다. 마찬가지로 저장소 판본.
// 바꾸는 건 MDX 컴포넌트 문법을 걷어 내는 것(Apache-2.0 4(b)에 따라 화면에 적는다)과 링크 · 이미지 주소뿐이다.
// 덧붙이는 것(원문이 아니라고 화면에 적는다, docs/source-check.md 34차):
// - 로그인하지 않은 요청에 4xx를 돌려주는 그림은 깨진 그림 대신 원문의 그림 설명(alt)과 그림 주소로 바꾼다
// - Primer Typography의 Storybook 데모 자리에는 같은 값을 담은 @primer/primitives(MIT)의 토큰 표를 붙인다
import { execSync } from 'node:child_process';
import { mkdtempSync, readFileSync, writeFileSync, mkdirSync, rmSync, existsSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, dirname } from 'node:path';
import { marked } from 'marked';
import sanitizeHtml from 'sanitize-html';

const SOURCES = {
  carbon: {
    name: 'Carbon Design System',
    repo: 'carbon-design-system/carbon-website',
    site: 'https://carbondesignsystem.com',
    pagesDir: 'src/pages',
    staticDir: 'static',
    license: 'Apache-2.0',
    licenseCheck: /^\s*Apache License\s+Version 2\.0/,
    licenseUrl: 'https://www.apache.org/licenses/LICENSE-2.0',
    copyright: 'Copyright 2018 IBM Corp.',
    archived: 'carbon-design-system/carbon-website는 2026-09-30에 보관됐어요(사이트가 새 CMS로 옮겨 감). 라이선스가 분명한 이 보관본을 실었고, 지금 사이트와 다를 수 있어요.',
    // Regula 공식 · 패턴의 source에 "Carbon <페이지 이름>" 꼴로 적은 페이지 + 레퍼런스 정리의 "볼 것"
    cite: 'Carbon',
    pages: [
      { file: 'elements/spacing/overview.mdx', path: 'elements/spacing/overview/' },
      { file: 'components/notification/usage.mdx', path: 'components/notification/usage/' },
      { file: 'components/progress-indicator/usage.mdx', path: 'components/progress-indicator/usage/' },
      { file: 'components/data-table/usage.mdx', path: 'components/data-table/usage/' },
      { file: 'patterns/forms-pattern/index.mdx', path: 'patterns/forms-pattern/' },
      { file: 'patterns/notification-pattern/index.mdx', path: 'patterns/notification-pattern/' },
    ],
  },
  primer: {
    name: 'Primer',
    repo: 'primer/design',
    site: 'https://primer.style',
    pagesDir: 'content',
    license: 'MIT',
    licenseCheck: /Permission is hereby granted, free of charge/,
    licenseUrl: 'https://github.com/primer/design/blob/main/LICENSE',
    copyright: 'Copyright (c) GitHub, Inc.',
    archived: 'primer/design 저장소는 2025-07-01 뒤로 바뀌지 않았고, 지금 primer.style은 다른 곳에서 만들어져요. 라이선스가 분명한 저장소 판본을 실었고, 지금 사이트와 다를 수 있어요.',
    cite: 'Primer',
    // Typography 페이지의 Storybook 데모(글자 크기 · 굵기 · 서체)는 @primer/primitives 토큰을 그린 것이라, 같은 토큰 값을 표로 붙인다.
    // 문서 판본(2025-07-01) 바로 전 릴리스를 쓴다(11.0.0은 2025-07-03).
    tokens: { package: '@primer/primitives', version: '10.7.0', licenseCheck: /Permission is hereby granted, free of charge/ },
    // 레퍼런스 정리의 "볼 것"(정보 밀도가 높은 화면의 간격과 타이포그래피)
    pages: [
      { file: 'foundations/layout.mdx', path: 'foundations/layout/' },
      { file: 'foundations/typography.mdx', path: 'foundations/typography/' },
    ],
  },
};

const want = process.argv.slice(2);
const keys = want.length ? want : Object.keys(SOURCES);

// 맨 앞 YAML에서 title · description만 읽는다(접힌 여러 줄 값 포함)
const frontmatter = (src) => {
  const m = src.match(/^---\n([\s\S]*?)\n---\n/);
  const out = {};
  if (!m) return { data: out, body: src };
  let key = null;
  for (const line of m[1].split('\n')) {
    const kv = line.match(/^([A-Za-z_]+):\s*(.*)$/);
    if (kv) {
      key = kv[1];
      out[key] = kv[2].replace(/^["']|["']$/g, '');
    } else if (key && /^\s+\S/.test(line)) out[key] = `${out[key]} ${line.trim()}`.trim();
  }
  return { data: out, body: src.slice(m[0].length) };
};

const attr = (tag, name) => tag.match(new RegExp(`${name}=(?:"([^"]*)"|'([^']*)'|\\{["']([^"']*)["']\\})`))?.slice(1).find((v) => v !== undefined);

// MDX → 마크다운: 화면용 컴포넌트를 걷어 내고, 글이 들어 있는 것은 글만 남긴다
function mdxToMd(body) {
  return (
    body
      .replace(/^(import|export) .*$/gm, '')
      .replace(/\{\/\*[\s\S]*?\*\/\}/g, '')
      .replace(/<!--[\s\S]*?-->/g, '')
      // 사이트에 박아 넣은 Storybook 데모는 그 데모로 가는 링크로 바꾼다(데모 자체는 가져오지 않는다)
      .replace(/<StorybookEmbed\b([\s\S]*?)\/>/g, (_m, a) => {
        const base = attr(a, 'baseUrl');
        const ids = [...a.matchAll(/id:\s*['"]([^'"]+)['"]/g)].map((m) => m[1]);
        return base ? ids.map((id) => `\n\n<p class="gv-example"><a href="${base}?path=/story/${id}">Storybook: ${id}</a></p>\n\n`).join('') : '';
      })
      .replace(/<StorybookDemo\b([\s\S]*?)\/>/g, (_m, a) => {
        const base = attr(a, 'url');
        const vs = [...a.matchAll(/label:\s*['"]([^'"]+)['"],\s*variant:\s*['"]([^'"]+)['"]/g)];
        return base ? vs.map(([, label, v]) => `\n\n<p class="gv-example"><a href="${base}/?path=/story/${v}">Storybook: ${label}</a></p>\n\n`).join('') : '';
      })
      // 목차는 뺀다
      .replace(/<AnchorLinks[\s\S]*?<\/AnchorLinks>/g, '')
      // 해야 할 것 · 하지 말 것: 설명(caption)은 글이므로 남긴다
      .replace(/<DoDont\b([\s\S]*?)>/g, (_m, a) => {
        const t = /type=["']dont["']/.test(a) ? 'dont' : 'do';
        const cap = attr(a, 'caption');
        return `\n\n<div class="doc-dd doc-${t}"><p class="doc-dd-label">${t === 'do' ? 'Do' : 'Don’t'}</p>\n\n${cap ? `${cap}\n\n` : ''}`;
      })
      .replace(/<\/DoDont>/g, '\n\n</div>\n\n')
      .replace(/<(Do|Dont)>/g, (_m, t) => `\n\n<div class="doc-dd doc-${t.toLowerCase()}"><p class="doc-dd-label">${t === 'Do' ? 'Do' : 'Don’t'}</p>\n\n`)
      .replace(/<\/(Do|Dont)>/g, '\n\n</div>\n\n')
      .replace(/<ResourceCard\b([\s\S]*?)>/g, (_m, a) => {
        const title = attr(a, 'subTitle') ?? attr(a, 'title');
        const href = attr(a, 'href');
        return title && href ? `\n\n<p class="doc-resource"><a href="${href}">${title}</a></p>\n\n` : '';
      })
      .replace(/<\/ResourceCard>/g, '')
      .replace(/<PageDescription>/g, '\n\n<div class="doc-lead">\n\n')
      .replace(/<\/PageDescription>/g, '\n\n</div>\n\n')
      .replace(/<(InlineNotification|Note)\b[^>]*>/g, '\n\n<div class="doc-note">\n\n')
      .replace(/<\/(InlineNotification|Note)>/g, '\n\n</div>\n\n')
      .replace(/<Caption\b[^>]*>/g, '\n\n<p class="doc-caption">')
      .replace(/<\/Caption>/g, '</p>\n\n')
      .replace(/<Title\b[^>]*>/g, '\n\n<p class="doc-title">')
      .replace(/<\/Title>/g, '</p>\n\n')
      .replace(/<A\b([^>]*)>/g, (_m, a) => `<a href="${attr(a, 'href') ?? ''}">`)
      .replace(/<\/A>/g, '</a>')
      .replace(/<Heading\b[^>]*>/g, '\n\n<p class="doc-title">')
      .replace(/<\/Heading>/g, '</p>\n\n')
      // 나머지 대문자 컴포넌트(배치용 Row · Column · Box, 데모 임베드 등)는 태그만 지운다
      .replace(/<\/?[A-Z][\w.]*\b[\s\S]*?\/?>/g, '')
      .replace(/\{["'`]\s*["'`]\}/g, ' ')
      .replace(/\bclassName=/g, 'class=')
      .replace(/\n{3,}/g, '\n\n')
  );
}

const esc = (t) => String(t).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);

// 그림 주소가 로그인 없이 열리는지. 4xx · 5xx면 그 상태 코드를, 열리거나 이 컴퓨터에서 닿지 않으면(000) null
const imageStatus = new Map();
function brokenImage(src) {
  if (!imageStatus.has(src)) {
    let code = '000';
    try {
      code = execSync(`curl -sS -o /dev/null -L --max-time 20 -w '%{http_code}' ${JSON.stringify(src)}`, { stdio: ['ignore', 'pipe', 'ignore'] }).toString().trim();
    } catch {}
    if (code === '000') console.warn(`그림을 확인하지 못함(네트워크): ${src}`);
    imageStatus.set(src, /^[45]\d\d$/.test(code) ? code : null);
  }
  return imageStatus.get(src);
}
const fixImages = (html) =>
  html.replace(/<img src="([^"]+)" alt="([^"]*)"[^>]*\/?>/g, (m, src, alt) => {
    const code = brokenImage(src.replaceAll('&amp;', '&'));
    if (!code) return m;
    return `<span class="doc-noimg">그림을 불러올 수 없어요 — 이 그림 주소는 로그인하지 않은 요청에 ${code}을 돌려줘요.${alt ? ` 원문의 그림 설명: “${alt}”` : ''} <a href="${src}" target="_blank" rel="noopener">그림 주소 ↗</a></span>`;
  });

// @primer/primitives 판본의 토큰 값(dist/docs: 참조를 풀어 둔 값)으로 Typography 페이지의 데모 자리에 붙일 표를 만든다
function primerTokenTables(t, dir) {
  try {
    return tokenTables(t, dir);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
}
function tokenTables(t, dir) {
  execSync(`npm pack ${t.package}@${t.version} --silent --pack-destination "${dir}"`, { stdio: ['ignore', 'pipe', 'inherit'] });
  const tgz = execSync(`ls "${dir}"/*.tgz`).toString().trim();
  execSync(`tar xzf "${tgz}" -C "${dir}"`);
  const pkg = join(dir, 'package');
  const license = readFileSync(join(pkg, 'LICENSE'), 'utf8');
  if (!t.licenseCheck.test(license)) throw new Error(`${t.package}: LICENSE가 MIT가 아님 — 라이선스를 다시 확인할 것`);
  const fn = JSON.parse(readFileSync(join(pkg, 'dist/docs/functional/typography/typography.json'), 'utf8'));
  const base = JSON.parse(readFileSync(join(pkg, 'dist/docs/base/typography/typography.json'), 'utf8'));
  const v = (name) => {
    if (!(name in fn)) throw new Error(`${t.package}@${t.version}: 토큰 ${name} 없음`);
    return fn[name].value;
  };
  const px = (rem) => (/rem$/.test(rem) ? `${rem} (${Math.round(parseFloat(rem) * 16 * 100) / 100}px)` : rem);
  const credit = (what) =>
    `<p class="doc-caption">Regula가 덧붙인 표 — 원문이 아니에요. 위 Storybook 데모가 그리는 값(${what})을 <a href="https://www.npmjs.com/package/${t.package}/v/${t.version}" target="_blank" rel="noopener">${t.package} ${t.version}</a>(MIT, Copyright (c) 2018 GitHub Inc.)의 토큰 파일에서 옮겼어요. 이 문서 판본 바로 전 릴리스라 지금 데모와 다를 수 있어요.</p>`;
  const table = (head, rows) =>
    `<table><thead><tr>${head.map((h) => `<th>${h}</th>`).join('')}</tr></thead><tbody>${rows
      .map((r) => `<tr>${r.map((c) => `<td>${c}</td>`).join('')}</tr>`)
      .join('')}</tbody></table>`;

  // Storybook 이야기 이름 → 토큰 이름(text-<스타일>-…[-<크기>])
  const styles = [
    ['Display', 'display'], ['Title (large)', 'title', 'large'], ['Title (medium)', 'title', 'medium'], ['Title (small)', 'title', 'small'],
    ['Subtitle', 'subtitle'], ['Body (large)', 'body', 'large'], ['Body (medium)', 'body', 'medium'], ['Body (small)', 'body', 'small'],
    ['Caption', 'caption'], ['Code block', 'codeBlock'], ['Inline code', 'codeInline'],
  ];
  const tok = (style, part, size) => `text-${style}-${part}${size && part !== 'weight' ? `-${size}` : ''}`;
  const weightTok = (style, size) => (`text-${style}-weight-${size}` in fn ? `text-${style}-weight-${size}` : `text-${style}-weight`);
  const functional = table(
    ['스타일', '크기', '줄 높이', '굵기', '토큰', '설명(토큰 파일의 원문)'],
    styles.map(([label, style, size]) => {
      const short = `text-${style}-shorthand${size ? `-${size}` : ''}`;
      const lh = tok(style, 'lineHeight', size) in fn ? v(tok(style, 'lineHeight', size)) : null;
      const sz = v(tok(style, 'size', size));
      const lhPx = lh && /rem$/.test(sz) ? ` (${Math.round(parseFloat(sz) * 16 * lh)}px)` : '';
      return [esc(label), px(sz), lh ? `${lh}${lhPx}` : '—', String(v(size ? weightTok(style, size) : `text-${style}-weight`)), `<code>--${short}</code>`, esc(fn[short].description ?? '')];
    }),
  );
  const weights = table(
    ['이름', '토큰', '값'],
    ['light', 'normal', 'medium', 'semibold'].map((w) => [w, `<code>--base-text-weight-${w}</code>`, String(base[`base-text-weight-${w}`].value)]),
  );
  const stacks = table(
    ['이름', '토큰', '값'],
    ['sansSerif', 'sansSerifDisplay', 'system', 'monospace'].map((n) => [n, `<code>--fontStack-${n}</code>`, `<code>${esc(v(`fontStack-${n}`))}</code>`]),
  );
  const block = (what, body) => `<div class="doc-tokens">${credit(what)}${body}</div>`;
  return {
    license,
    'typography-functional--overview': block('글자 스타일의 크기 · 줄 높이 · 굵기', functional),
    'typography-base--base': block('굵기 값', weights),
    'typography-functional--font-family': block('서체 묶음', stacks),
  };
}

for (const key of keys) {
  const s = SOURCES[key];
  if (!s) throw new Error(`모르는 이름: ${key}`);
  const dir = mkdtempSync(join(tmpdir(), `${key}-`));
  try {
    execSync(`git clone -q --depth 1 https://github.com/${s.repo}.git "${dir}"`, { stdio: 'inherit' });
    const licenseText = readFileSync(join(dir, 'LICENSE'), 'utf8');
    if (!s.licenseCheck.test(licenseText)) throw new Error(`${s.repo}: LICENSE가 ${s.license}가 아님 — 라이선스를 다시 확인할 것`);
    const commit = execSync('git log -1 --format=%H', { cwd: dir }).toString().trim();
    const committed = execSync('git log -1 --format=%cs', { cwd: dir }).toString().trim();
    const raw = (p) => `https://raw.githubusercontent.com/${s.repo}/${commit}/${p}`;
    const { license: tokensLicense, ...extras } = s.tokens ? primerTokenTables(s.tokens, mkdtempSync(join(tmpdir(), `${key}-tokens-`))) : {};
    const ids = new Map(s.pages.map((p) => [p.path.replace(/\/$/, ''), `doc-${key}-${p.path.replace(/\/$/, '').replaceAll('/', '-')}`]));

    const pages = s.pages.map((p) => {
      const file = join(dir, s.pagesDir, p.file);
      if (!existsSync(file)) throw new Error(`${s.repo}: ${p.file} 없음`);
      const { data, body } = frontmatter(readFileSync(file, 'utf8'));
      const id = ids.get(p.path.replace(/\/$/, ''));
      const fileDir = dirname(`${s.pagesDir}/${p.file}`);
      const pageUrl = `${s.site}/${p.path}`;
      const link = (href) => {
        if (!href || /^(mailto:|#)/.test(href)) return { href: href?.startsWith('#') ? `#${id}--${href.slice(1)}` : href };
        if (/^https?:/.test(href)) return { href };
        if (href.startsWith('/')) {
          const target = href.replace(/^\/|\/$/g, '').split('#')[0];
          if (ids.has(target)) return { href: `#${ids.get(target)}`, internal: true };
          return { href: `${s.site}${href}` };
        }
        return { href: new URL(href, pageUrl).href };
      };
      const img = (src) => {
        if (!src || /^https?:/.test(src)) return src;
        // Carbon 문서의 "/images/x.png"는 사이트 뿌리가 아니라 그 페이지 폴더의 images/를 가리킨다(gatsby-remark-images)
        if (src.startsWith('/images/')) return raw(`${fileDir}${src}`);
        if (src.startsWith('/') && s.staticDir) return raw(`${s.staticDir}${src}`);
        return raw(`${fileDir}/${src.replace(/^\.\//, '')}`);
      };
      let html = sanitizeHtml(marked.parse(mdxToMd(body), { async: false }), {
        allowedTags: ['h2', 'h3', 'h4', 'h5', 'p', 'a', 'ul', 'ol', 'li', 'strong', 'em', 'code', 'pre', 'blockquote', 'img', 'table', 'thead', 'tbody', 'tr', 'th', 'td', 'div', 'br', 'hr'],
        allowedAttributes: { a: ['href', 'target', 'rel'], img: ['src', 'alt', 'loading', 'width'], div: ['class'], p: ['class'] },
        allowedClasses: { div: ['doc-dd', 'doc-do', 'doc-dont', 'doc-lead', 'doc-note'], p: ['doc-dd-label', 'doc-caption', 'doc-title', 'doc-resource', 'gv-example'] },
        allowedSchemes: ['https', 'http', 'mailto'],
        transformTags: {
          a: (_t, a) => {
            const l = link(a.href);
            return { tagName: 'a', attribs: l.internal || l.href?.startsWith('#') ? { href: l.href } : { href: l.href, target: '_blank', rel: 'noopener' } };
          },
          img: (_t, a) => ({ tagName: 'img', attribs: { src: img(a.src), alt: a.alt ?? '', loading: 'lazy', ...(a.width ? { width: a.width } : {}) } }),
        },
        exclusiveFilter: (frame) => frame.tag === 'div' && !frame.text.trim() && !frame.mediaChildren?.length && frame.attribs.class === undefined,
      })
        .replace(/<h([2345])>([\s\S]*?)<\/h\1>/g, (_m, l, inner) => {
          const slug = inner.replace(/<[^>]+>/g, '').toLowerCase().replace(/&[a-z#0-9]+;/g, '').replace(/[^a-z0-9\s-]/g, '').trim().replace(/\s+/g, '-');
          return `<h${l} id="${id}--${slug}">${inner}</h${l}>`;
        })
        .replace(/<p>\s*<\/p>/g, '')
        .replace(/\n{2,}/g, '\n');
      html = fixImages(html);
      for (const [story, block] of Object.entries(extras)) {
        const at = html.match(new RegExp(`<p class="gv-example"><a href="[^"]*path=/story/${story}"[^>]*>[^<]*</a></p>`));
        if (at) html = html.replace(at[0], `${at[0]}${block}`);
      }
      const left = html.match(/<\/?[A-Z][\w.]*[\s>]/g);
      if (left) console.warn(`${key}/${p.file}: 남은 컴포넌트 ${left.join(' ')}`);
      return { id, title: data.title ?? p.path, description: data.description ?? '', path: p.path, url: pageUrl, html };
    });

    const out = new URL('../src/imported/docs/', import.meta.url);
    mkdirSync(out, { recursive: true });
    writeFileSync(
      new URL(`${key}.json`, out),
      JSON.stringify(
        {
          name: s.name,
          site: s.site,
          repo: s.repo,
          commit,
          committed,
          license: s.license,
          licenseUrl: s.licenseUrl,
          licenseText,
          copyright: s.copyright,
          archived: s.archived,
          cite: s.cite,
          ...(s.tokens ? { tokens: { name: s.tokens.package, version: s.tokens.version, license: 'MIT', licenseText: tokensLicense } } : {}),
          fetchedAt: new Date().toISOString().slice(0, 10),
          pages,
        },
        null,
        1,
      ) + '\n',
    );
    console.log(`가져옴 ${s.name} ${pages.length}쪽 (${s.repo}@${commit.slice(0, 7)}, ${committed}, ${s.license}) → src/imported/docs/${key}.json`);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
}
