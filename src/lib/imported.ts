// 가져온 README HTML을 이 사이트 페이지에 맞게 다듬는다(스냅숏 원본은 그대로 둔다).
// - README의 h1은 페이지 h1과 겹치므로 h2로 낮춘다(.readme-title로 예전 크기를 유지).
// - 제목에 GitHub과 같은 방식의 id를 붙여, README 안의 목차 링크(#design-systems 등)가 동작하게 한다.
const slugify = (text: string) =>
  text
    .replace(/<[^>]+>/g, '')
    .replace(/&[a-z]+;|&#\d+;/gi, '')
    .trim()
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s_-]/gu, '')
    .replace(/\s/g, '-');

export function prepareImported(html: string, taken: Iterable<string> = []): string {
  const used = new Map<string, number>();
  const reserved = new Set(taken);
  return html.replace(/<h([1-6])(\s[^>]*)?>([\s\S]*?)<\/h\1>/g, (_m, level: string, attrs = '', inner: string) => {
    let tag = `h${level}`;
    let extra = attrs;
    if (level === '1') {
      tag = 'h2';
      extra += ' class="readme-title"';
    }
    if (!/\sid=/.test(attrs)) {
      const base = slugify(inner);
      if (base) {
        const n = used.get(base) ?? 0;
        used.set(base, n + 1);
        const id = n ? `${base}-${n}` : base;
        if (!reserved.has(id)) extra += ` id="${id}"`;
      }
    }
    return `<${tag}${extra}>${inner}</${tag}>`;
  });
}
