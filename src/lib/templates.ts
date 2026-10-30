import { readFileSync } from 'node:fs';
import type { CollectionEntry } from 'astro:content';
import { parseTokens, swatches } from './design-tokens';
import { href } from './url';

// 양식 하나의 토큰 원본과 미리보기·문서 주소를 모은다
export function loadTemplate(t: CollectionEntry<'templates'>) {
  const d = t.data;
  const source = d.tokens_from ?? (d.design ? `DESIGN/${d.design}/DESIGN.md` : undefined);
  const groups = source ? parseTokens(readFileSync(source, 'utf8')) : [];
  const file = (name: string) => (d.design ? href(`design/${d.design}/${name}`) : undefined);
  return {
    source,
    groups,
    strip: swatches(groups, d.swatch),
    preview: d.preview ? href(d.preview) : file('preview.html'),
    doc: file('DESIGN.html'),
    markdown: file('DESIGN.md'),
  };
}
