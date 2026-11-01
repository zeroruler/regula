// 콘텐츠 항목을 "컬렉션/아이디" 문자열 하나로 가리키고, 이름과 링크로 바꾼다. 기록장의 about에서 쓴다.
import { getCollection, type CollectionEntry } from 'astro:content';
import { patternGroups, topics } from './site';
import { href } from './url';

export type Item = { ref: string; kind: string; name: string; url: string };

let cache: Map<string, Item> | null = null;

async function all() {
  if (cache) return cache;
  const [formulas, patterns, darks, refs] = await Promise.all([
    getCollection('formulas'), getCollection('patterns'), getCollection('darkpatterns'), getCollection('references'),
  ]);
  const m = new Map<string, Item>();
  for (const f of formulas) {
    const page = topics.find((t) => t.name === f.data.topic)?.path ?? 'principles/';
    m.set(`formulas/${f.id}`, { ref: `formulas/${f.id}`, kind: `공식 · ${f.data.topic}`, name: f.data.name, url: href(`${page}#f-${f.id}`) });
  }
  for (const p of patterns) {
    const g = patternGroups.find((x) => x.name === p.data.category);
    m.set(`patterns/${p.id}`, { ref: `patterns/${p.id}`, kind: `패턴 · ${p.data.category}`, name: p.data.name, url: href(`${g?.path ?? 'patterns/'}#p-${p.id.split('/').pop()}`) });
  }
  for (const d of darks) m.set(`darkpatterns/${d.id}`, { ref: `darkpatterns/${d.id}`, kind: '다크 패턴', name: d.data.name, url: href(`patterns/dark/#d-${d.id}`) });
  for (const r of refs) m.set(`references/${r.id}`, { ref: `references/${r.id}`, kind: '레퍼런스', name: r.data.title, url: href(`references/${r.id}/`) });
  cache = m;
  return m;
}

export async function resolve(ref: string): Promise<Item> {
  const it = (await all()).get(ref);
  if (!it) throw new Error(`기록장: 없는 항목 "${ref}" — src/lib/items.ts의 형식(formulas/<id>, patterns/<카테고리>/<id> …)을 확인하세요`);
  return it;
}

let notesCache: CollectionEntry<'notes'>[] | null = null;
export async function allNotes() {
  notesCache ??= (await getCollection('notes')).sort((a, b) => b.data.date.localeCompare(a.data.date) || a.id.localeCompare(b.id));
  return notesCache;
}

// 이 항목을 가리키는 기록 (최신 순)
export async function notesFor(ref: string) {
  return (await allNotes()).filter((n) => n.data.about.includes(ref));
}
