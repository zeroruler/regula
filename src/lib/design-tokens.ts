// DESIGN.md의 ```css 블록(또는 CSS 파일)에서 토큰을 읽어 그룹별로 나눈다.
// 그룹은 `/* 이름 — 설명 */` 주석으로 구분하고, 다크 값은 [data-theme="dark"] 블록에서 가져온다.
export type Token = { name: string; value: string; dark?: string; note?: string };
export type TokenGroup = { title: string; note?: string; tokens: Token[] };

const block = (css: string, selector: RegExp) => css.match(selector)?.[1] ?? '';

export function parseTokens(source: string): TokenGroup[] {
  const css = source.match(/```css\n([\s\S]*?)```/)?.[1] ?? source;
  const light = block(css, /:root\s*\{([\s\S]*?)\n?\}/);
  const dark = block(css, /\[data-theme="dark"\]\s*\{([\s\S]*?)\n?\}/);

  const darkValues = new Map<string, string>();
  for (const [, name, value] of dark.matchAll(/(--[\w-]+)\s*:\s*([^;]+);/g)) darkValues.set(name, value.trim());

  const groups: TokenGroup[] = [];
  let current: TokenGroup = { title: '토큰', tokens: [] };
  groups.push(current);
  for (const line of light.split('\n')) {
    const heading = line.match(/^\s*\/\*\s*([^—*]+?)(?:\s+—\s+(.+?))?\s*\*\/\s*$/);
    if (heading && !/^\s*--/.test(line)) {
      // 영문 이름으로 시작하는 주석(Key, Neutral, z-index …)이 그룹 머리말이다.
      // 그 밖의 보충 주석(예: "pill 뱃지 9999px")은 현재 그룹의 설명으로 붙인다.
      if (/^([A-Z]|z-index)/.test(heading[1])) {
        current = { title: heading[1].trim(), note: heading[2]?.trim(), tokens: [] };
        groups.push(current);
      } else {
        const text = heading[2] ? `${heading[1].trim()} — ${heading[2].trim()}` : heading[1].trim();
        current.note = [current.note, text].filter(Boolean).join(' · ');
      }
      continue;
    }
    const comment = line.match(/\/\*\s*(.+?)\s*\*\//)?.[1];
    for (const [, name, value] of line.matchAll(/(--[\w-]+)\s*:\s*([^;]+);/g)) {
      current.tokens.push({ name, value: value.trim(), dark: darkValues.get(name), note: comment });
    }
  }
  return groups.filter((g) => g.tokens.length);
}

export const isColor = (v: string) => /^(#[0-9a-f]{3,8}|rgba?\()/i.test(v);

// 대표 색: 배경 → 표면 → 잉크 → 키 컬러 순으로 있는 것만
export function swatches(groups: TokenGroup[], names: string[]) {
  const all = new Map(groups.flatMap((g) => g.tokens).map((t) => [t.name, t]));
  return names.map((n) => all.get(n)).filter((t): t is Token => !!t && isColor(t.value));
}
