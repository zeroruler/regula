// 출처 문자열(Regula가 쓴 글)에서 가져온 원문을 가리키는 부분을 찾아, 화면에 그릴 때만 그 원문 위치로 잇는다.
// 글 자체는 고치지 않는다. 매칭이 안 되는 출처는 글자 그대로 둔다.
// 원문: WCAG 2.2(src/imported/w3c) · GOV.UK(src/imported/govuk) · Carbon · Primer(src/imported/docs)
import wcag from '../imported/w3c/wcag22.json';
import govuk from '../imported/govuk/pages.json';
import carbon from '../imported/docs/carbon.json';
import primer from '../imported/docs/primer.json';
import { href } from './url';

export type Seg = { text: string; to?: string };
// 출처가 가리키는 원문 위치: 레퍼런스 slug와 그 페이지 안의 id
export type Target = { ref: string; anchor: string };

// ── WCAG ──────────────────────────────────────────────
export const wcagAnchor = (num: string) => `sc-${num.replaceAll('.', '-')}`;
export const wcagCriteria = wcag.principles.flatMap((p) => p.guidelines.flatMap((g) => g.criteria));
const wcagNums = new Set(wcagCriteria.map((c) => c.num));
const SC = /(?<![\d.§])([1-4]\.\d{1,2}\.\d{1,2})(?![\d.])/g;

// ── GOV.UK ────────────────────────────────────────────
type GovukPage = (typeof govuk.pages)[number];
// 글에 적힌 "GOV.UK Design System <페이지 이름>"에서 이름만 뽑는다(레퍼런스 페이지의 "Regula에서" 연결에 쓴다)
export const govukNames = (text: string) =>
  [...text.matchAll(/GOV\.UK Design System\s*「?([A-Z][A-Za-z' -]*?)\s*(?:」|"|\(|·|,|$)/gm)].map((m) => m[1].trim().toLowerCase());
// 이름이 이 페이지의 제목이거나 별칭이면(별칭 뒤에 말이 더 붙어도: "telephone numbers" → telephone)
export const govukMatches = (p: GovukPage, name: string) =>
  name === p.title.toLowerCase() || p.aliases.some((a) => name === a || name.startsWith(`${a} `));
const govukPage = (name: string) => govuk.pages.find((p) => govukMatches(p, name.toLowerCase()));

// ── Carbon · Primer ───────────────────────────────────
const docs = { carbon: { doc: carbon, ref: 'ibm-carbon' }, primer: { doc: primer, ref: 'github-primer' } };
// 글에 적힌 "<Carbon|Primer>, <페이지 이름>"에서 이름만 뽑는다
const docPattern = (cite: string) => new RegExp(`${cite},?\\s+「?([A-Z][A-Za-z -]*?)\\s*(?:」|「|"|\\(|·|,|$)`, 'gm');
export const docCited = (cite: string, text: string) => [...text.matchAll(docPattern(cite))].map((m) => m[1].trim().toLowerCase());

// ── 출처 문자열 → 조각 ────────────────────────────────
type Hit = { start: number; end: number } & Target;

// " · "로 나눈 출처 조각. 괄호 안의 · 도 나뉘지만 글은 다시 그대로 이어 붙이므로 상관없다.
const parts = (s: string) => {
  const out: { text: string; at: number }[] = [];
  let at = 0;
  for (const text of s.split(' · ')) {
    out.push({ text, at });
    at += text.length + 3;
  }
  return out;
};

function wcagHits(s: string): Hit[] {
  const hits: Hit[] = [];
  // "WCAG"가 나온 조각부터, 기준 번호 · Understanding · Failure로 시작하는 조각까지만 WCAG 쪽으로 본다
  // (RFC 1122 §1.2.2 같은 다른 문서의 번호를 잇지 않게)
  let on = false;
  for (const p of parts(s)) {
    if (/WCAG/.test(p.text)) on = true;
    else if (!(on && /^(?:Understanding |Failure |더 엄격한 기준: )?[1-4]\.\d/.test(p.text))) on = false;
    if (!on) continue;
    const from = p.text.search(/WCAG/) + 1; // "WCAG 2.2"의 2.2는 기준 번호 꼴이 아니라 상관없음
    for (const m of p.text.slice(Math.max(from, 0)).matchAll(SC)) {
      if (!wcagNums.has(m[1])) continue;
      const start = p.at + Math.max(from, 0) + m.index!;
      hits.push({ start, end: start + m[1].length, ref: 'wcag-22', anchor: wcagAnchor(m[1]) });
    }
  }
  return hits;
}

function govukHits(s: string): Hit[] {
  const hits: Hit[] = [];
  // "GOV.UK Design System"이 나온 조각부터, 실린 페이지 이름으로 시작하는 조각이 이어지는 동안
  let on = false;
  for (const p of parts(s)) {
    const i = p.text.indexOf('GOV.UK Design System');
    let rest = p.text;
    let at = p.at;
    if (i >= 0) {
      on = true;
      at += i + 'GOV.UK Design System'.length;
      rest = p.text.slice(i + 'GOV.UK Design System'.length);
    } else if (!on) continue;
    const m = rest.match(/^(\s*「?)([A-Z][A-Za-z' -]*?)\s*(?:」|"|\(|,|$)/);
    const page = m && govukPage(m[2].trim());
    if (!m || !page) {
      // "GOV.UK Design System · Button"처럼 이름이 다음 조각에 오는 경우는 그대로 둔다
      if (i < 0 || rest.trim()) on = false;
      continue;
    }
    const start = at + m[1].length;
    hits.push({ start, end: start + m[2].trim().length, ref: 'gov-uk', anchor: page.id });
  }
  return hits;
}

function docHits(s: string): Hit[] {
  const hits: Hit[] = [];
  for (const { doc, ref } of Object.values(docs)) {
    for (const m of s.matchAll(docPattern(doc.cite))) {
      const name = m[1].trim();
      const page = doc.pages.find((p) => p.title.toLowerCase() === name.toLowerCase());
      if (!page) continue;
      const start = m.index! + m[0].indexOf(name, doc.cite.length);
      hits.push({ start, end: start + name.length, ref, anchor: page.id });
    }
  }
  return hits;
}

const cache = new Map<string, Hit[]>();
const hitsOf = (source: string) => {
  let hits = cache.get(source);
  if (!hits) {
    hits = [...wcagHits(source), ...govukHits(source), ...docHits(source)].sort((a, b) => a.start - b.start);
    cache.set(source, hits);
  }
  return hits;
};

// 출처 문자열이 가리키는 원문 위치들(겹침 없이, 같은 위치는 한 번)
export function citeTargets(source: string): Target[] {
  const seen = new Set<string>();
  return hitsOf(source).filter((h) => {
    const k = `${h.ref}#${h.anchor}`;
    return !seen.has(k) && seen.add(k);
  }).map(({ ref, anchor }) => ({ ref, anchor }));
}

// 출처 문자열을 글 조각과 링크 조각으로 나눈다. 조각의 글을 모두 이으면 원래 문자열과 같다.
export function citeSegments(source: string): Seg[] {
  const hits = hitsOf(source);
  const segs: Seg[] = [];
  let at = 0;
  for (const h of hits) {
    if (h.start < at) continue; // 겹치면 앞의 것만
    if (h.start > at) segs.push({ text: source.slice(at, h.start) });
    segs.push({ text: source.slice(h.start, h.end), to: href(`references/${h.ref}/#${h.anchor}`) });
    at = h.end;
  }
  if (at < source.length) segs.push({ text: source.slice(at) });
  return segs;
}
