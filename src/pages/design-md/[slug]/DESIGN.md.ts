// 사이트별 DESIGN.md 원문을 그대로 내려준다(/design-md/<slug>/DESIGN.md).
import type { APIRoute } from 'astro';
import { loadDesignMd } from '../../../lib/designmd';

export function getStaticPaths() {
  return loadDesignMd().map((d) => ({ params: { slug: d.slug }, props: { text: d.text } }));
}
export const GET: APIRoute = ({ props }) => new Response((props as { text: string }).text, { headers: { 'Content-Type': 'text/markdown; charset=utf-8' } });
