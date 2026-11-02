// 사이트별 DESIGN.md 모음(VoltAgent/awesome-design-md, MIT) — scripts/sync-design-md.mjs가 받아 둔 스냅숏을 빌드 때 읽는다.
// 맨 위 YAML(colors · typography · rounded)에서 색 · 서체 · 모서리를 뽑고, YAML이 없거나 깨진 파일은 본문의 `#RRGGBB`에서 색만 뽑는다.
// YAML 전체를 해석하지 않고 필요한 줄만 정규식으로 읽는다(일부 파일의 YAML이 문법에 맞지 않음).
import { marked } from 'marked';
import sanitizeHtml from 'sanitize-html';
import index from '../imported/design-md/index.json';
import { prepareImported } from './imported';

const raw = import.meta.glob<string>('../imported/design-md/*.md', { eager: true, query: '?raw', import: 'default' });

// README의 분류 이름 → 화면 이름. 순서도 이 순서
export const DM_CATEGORIES: [string, string][] = [
  ['AI & LLM Platforms', 'AI · LLM 플랫폼'],
  ['Developer Tools & IDEs', '개발 도구 · IDE'],
  ['Backend, Database & DevOps', '백엔드 · 데이터베이스 · DevOps'],
  ['Productivity & SaaS', '생산성 · SaaS'],
  ['Design & Creative Tools', '디자인 · 창작 도구'],
  ['Fintech & Crypto', '핀테크 · 암호화폐'],
  ['E-commerce & Retail', '커머스 · 리테일'],
  ['Media & Consumer Tech', '미디어 · 소비자 기술'],
  ['Automotive', '자동차'],
  ['Retro Web · DESIGN.md Nostalgia', '옛날 웹'],
];
const OTHER = '기타 (원본 목록에 분류 없음)';

export type DmColor = { name: string; hex: string };
export type DesignMd = {
  slug: string; name: string; category: string; blurb: string;
  colors: DmColor[]; fonts: string[]; radius: string[]; hasTokens: boolean;
  text: string; html: string; frontmatter: string;
};
export const dmSource = { repo: index.repo, license: index.license, commit: index.commit, committedAt: index.committedAt, fetchedAt: index.fetchedAt };

const titleCase = (s: string) => s.replace(/(^|[-.])(\w)/g, (_m, p, c) => (p === '-' ? ' ' : p) + c.toUpperCase());

function splitFrontmatter(text: string) {
  const m = text.match(/^---\n([\s\S]*?)\n---\n?/);
  return m ? { fm: m[1], body: text.slice(m[0].length) } : { fm: '', body: text };
}

// 들여쓰기 2칸인 블록(`colors:` 아래 `  이름: "#hex"`)의 줄만 읽는다
function block(fm: string, key: string) {
  const m = fm.match(new RegExp(`^${key}:\\s*\\n((?:[ \\t]+.*\\n?)*)`, 'm'));
  return m ? m[1] : '';
}

function parse(slug: string, text: string, meta?: { name: string; category: string; blurb: string }): DesignMd {
  const { fm, body } = splitFrontmatter(text);
  let colors: DmColor[] = [];
  const cb = block(fm, 'colors');
  for (const line of cb.split('\n')) {
    const m = line.match(/^\s{2}([\w-]+):\s*["']?(#[0-9a-fA-F]{6})\b/);
    if (m) colors.push({ name: m[1], hex: m[2].toUpperCase() });
  }
  const hasTokens = colors.length > 0;
  if (!hasTokens) {
    // 본문의 "**이름** (`#hex`)" 꼴을 먼저, 없으면 나오는 순서대로
    const seen = new Set<string>();
    for (const m of body.matchAll(/\*\*([^*]{1,40})\*\*\s*\(`(#[0-9a-fA-F]{6})`/g)) {
      const hex = m[2].toUpperCase();
      if (!seen.has(hex)) { seen.add(hex); colors.push({ name: m[1].trim(), hex }); }
    }
    if (!colors.length) for (const m of body.matchAll(/`(#[0-9a-fA-F]{6})`/g)) {
      const hex = m[1].toUpperCase();
      if (!seen.has(hex)) { seen.add(hex); colors.push({ name: '', hex }); }
    }
  }
  const fonts = [...new Set([...block(fm, 'typography').matchAll(/fontFamily:\s*["']?([^,"'\n]+)/g)].map((m) => m[1].trim()))].slice(0, 4);
  const radius = [...block(fm, 'rounded').matchAll(/^\s{2}([\w-]+):\s*["']?([\w.%]+)/gm)].map((m) => `${m[1]} ${m[2]}`).slice(0, 8);

  const html = prepareImported(sanitizeHtml(marked.parse(body, { async: false }) as string, {
    allowedTags: sanitizeHtml.defaults.allowedTags.concat(['h1', 'h2', 'img']),
    allowedAttributes: { a: ['href', 'name', 'target', 'rel'], img: ['src', 'alt'], code: ['class'] },
    allowedSchemes: ['http', 'https', 'mailto'],
    transformTags: { a: (tag, a) => ({ tagName: 'a', attribs: a.href && !a.href.startsWith('#') ? { ...a, target: '_blank', rel: 'noopener' } : a }) },
  }));
  return {
    slug,
    name: meta?.name || titleCase(slug),
    category: meta?.category ? (DM_CATEGORIES.find(([en]) => en === meta.category)?.[1] ?? meta.category) : OTHER,
    blurb: meta?.blurb ?? '',
    colors, fonts, radius, hasTokens, text, html, frontmatter: fm,
  };
}

let cache: DesignMd[] | null = null;
export function loadDesignMd(): DesignMd[] {
  if (cache) return cache;
  const meta = new Map(index.entries.map((e) => [e.slug, e]));
  cache = Object.entries(raw).map(([path, text]) => {
    const slug = path.split('/').pop()!.replace(/\.md$/, '');
    return parse(slug, text, meta.get(slug));
  }).sort((a, b) => a.name.localeCompare(b.name, 'en'));
  return cache;
}

export const dmCategoryOrder = [...DM_CATEGORIES.map(([, ko]) => ko), OTHER];
