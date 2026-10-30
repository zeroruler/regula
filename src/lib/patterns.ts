import { getCollection } from 'astro:content';
import { patternGroups } from './site';

// 카테고리별 패턴을 그 카테고리의 눈금(방해 정도, 시각적 무게) 순으로 (PLAN §4)
export async function patternsByGroup() {
  const all = await getCollection('patterns');
  return patternGroups.map((g) => ({
    group: g,
    items: all.filter((p) => p.data.category === g.name).sort((a, b) => (a.data[g.level] ?? 0) - (b.data[g.level] ?? 0)),
  }));
}
