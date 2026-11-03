// 출처 줄(source)로 레퍼런스의 원문을 가리킨 곳을 모은다. 출처 줄 → 원문 링크(cite.ts)와 같은 매칭을 거꾸로 쓴다.
// refs에 레퍼런스를 넣지 않았어도 출처에 적었으면 잡힌다: 공식 · 패턴 · 다크 패턴 · 양식 규칙 · 페이지 규칙 표.
import { getCollection } from 'astro:content';
import { citeTargets } from './cite';
import { ruleTables, ruleId } from './rules';
import { patternGroups, section } from './site';
import { href } from './url';

// anchors: 이 항목이 가리킨 원문 위치(id). 없으면 text에서 번호 · 이름을 찾는다(refs로 이은 항목).
// group: 양식 하나 · 규칙 표 하나로 묶는 이름. 레퍼런스 페이지의 "Regula에서 쓴 곳" 목록에는 name 한 줄로(링크가 없으면
// 묶음에서 처음 나온 항목으로), 원문 위치 아래에는 "short · 항목 · 항목"으로 모아 보인다(item: 규칙 번호나 대상).
// parts: usesAt이 묶어 돌려준 항목들
export type Use = {
  label: string; name: string; to: string; text?: string; anchors?: string[];
  group?: { name: string; short: string; to?: string }; item?: string; parts?: { text: string; to: string }[];
};

const cache = new Map<string, Use[]>();

async function all(): Promise<(Omit<Use, 'anchors'> & { source: string })[]> {
  const [formulas, patterns, darks, templates] = await Promise.all([
    getCollection('formulas'), getCollection('patterns'), getCollection('darkpatterns'), getCollection('templates'),
  ]);
  const byOrder = <T extends { data: { order: number } }>(a: T, b: T) => a.data.order - b.data.order;
  return [
    ...formulas.sort(byOrder).map((f) => ({
      label: `§${section('principles').no} 공식`, name: f.data.name, to: href(`principles/#f-${f.id}`), source: f.data.source,
    })),
    ...patterns.map((p) => ({
      label: `§${section('patterns').no} 패턴`, name: p.data.name,
      to: href(`${patternGroups.find((g) => g.name === p.data.category)?.path ?? 'patterns/'}#p-${p.id.split('/').pop()}`), source: p.data.source,
    })),
    ...darks.sort(byOrder).map((d) => ({
      label: `§${section('patterns').no} 다크 패턴`, name: d.data.name, to: href(`patterns/dark/#d-${d.id}`), source: d.data.source,
    })),
    ...templates.sort(byOrder).flatMap((t) =>
      t.data.rules.map((r, i) => ({
        label: `§${section('templates').no} 양식 규칙`, name: `${t.data.name} · 규칙 ${i + 1}`, to: href(`templates/${t.id}/#rule-${i + 1}`), source: r.source,
        group: { name: `${t.data.name} 양식 규칙`, short: `${t.data.name} 양식`, to: href(`templates/${t.id}/#rules`) }, item: `규칙 ${i + 1}`,
      })),
    ),
    ...ruleTables.flatMap((t) =>
      t.rules.map((r, i) => ({
        label: `§${section(t.section).no} 규칙 표`, name: `${t.name} · ${r.s}`, to: href(`${t.path}#${ruleId(t.key, i)}`), source: r.src,
        group: { name: `${t.name} 규칙 표`, short: `${t.name} 규칙` }, item: r.s,
      })),
    ),
  ];
}

// 출처 줄로 이 레퍼런스(wcag-22 · gov-uk · ibm-carbon · github-primer)의 원문 위치를 가리킨 곳
export async function citedIn(ref: string): Promise<Use[]> {
  if (!cache.has(ref)) {
    const out: Use[] = [];
    for (const { source, ...u } of await all()) {
      const anchors = citeTargets(source).filter((t) => t.ref === ref).map((t) => t.anchor);
      if (anchors.length) out.push({ ...u, anchors });
    }
    cache.set(ref, out);
  }
  return cache.get(ref)!;
}

// 한 원문 위치(기준 · 페이지)를 가리킨 곳. refs로 이은 항목은 text 매칭(match)으로, 출처 줄로 찾은 항목은 anchors로.
// 같은 링크는 한 번만, 같은 양식 · 같은 규칙 표의 항목은 하나로 묶는다(같은 대상 이름은 처음 것만).
export function usesAt(uses: Use[], anchor: string, match: (u: Use) => boolean): Use[] {
  const seen = new Set<string>();
  const out: Use[] = [];
  const groups = new Map<string, Use>();
  for (const u of uses) {
    if (!(u.anchors ? u.anchors.includes(anchor) : match(u)) || seen.has(u.to)) continue;
    seen.add(u.to);
    if (!u.group || !u.item) {
      out.push(u);
      continue;
    }
    let g = groups.get(u.group.name);
    if (!g) {
      g = { ...u, name: u.group.short, parts: [] };
      groups.set(u.group.name, g);
      out.push(g);
    }
    if (!g.parts!.some((p) => p.text === u.item)) g.parts!.push({ text: u.item, to: u.to });
  }
  return out;
}
