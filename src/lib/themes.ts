import { getCollection } from 'astro:content';
import { loadTemplate } from './templates';

// roles가 있는 디자인 시스템마다 역할 → 실제 값을 풀어 둔다. 페이지 양식 미리보기가 이 값을 CSS 변수로 입힌다.
export async function loadThemes() {
  const systems = (await getCollection('templates', (t) => t.data.kind === '디자인 시스템' && !!t.data.roles))
    .sort((a, b) => a.data.order - b.data.order);
  return systems.map((t) => {
    const values = new Map(loadTemplate(t).groups.flatMap((g) => g.tokens).map((k) => [k.name, k.value]));
    // var(--x) 참조는 같은 시스템 안에서 끝까지 푼다
    const resolve = (v: string, depth = 0): string =>
      depth > 5 ? v : v.replace(/var\((--[\w-]+)\)/g, (_, n) => resolve(values.get(n) ?? n, depth + 1));
    const vars = Object.fromEntries(
      Object.entries(t.data.roles!).map(([role, ref]) => [role, resolve(ref.startsWith('--') ? values.get(ref) ?? '' : ref)]),
    );
    return { id: t.id, name: t.data.name, vars };
  });
}
