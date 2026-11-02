// 색 조합(src/content/combos)을 화면과 디자인 파일 만들기가 쓰는 모양으로 푼다. 빌드 때만 돈다.
// - template 조합: 양식의 DESIGN.md(또는 tokens.css)에서 토큰 값을 읽는다 — 값을 두 군데에 적지 않는다.
// - from이 "<팔레트>/<스케일>/<단계>"이면 그 팔레트 파일의 값과 같은지 확인한다(옮겨 적다 틀리면 빌드가 멈춘다).
import { getCollection, type CollectionEntry } from 'astro:content';
import { contrast } from './color';
import { hexToRgb, mix } from './builder/derive';
import { loadTemplate } from './templates';
import type { ColorKey, ComboOption } from './builder/spec';

type Role = CollectionEntry<'combos'>['data']['light'][number]['role'];
export type Swatch = { role: Role; hex: string; label: string };
export type ComboCheck = { label: string; fg: string; bg: string; ratio: number; need: number; sc: '1.4.3' | '1.4.11'; pass: boolean };
export type Hue = { label: string; hex: string; hue: number | null; delta: number | null };
export type ResolvedCombo = {
  id: string;
  data: CollectionEntry<'combos'>['data'];
  light: Swatch[];
  dark?: Swatch[];
  checks: { light: ComboCheck[]; dark?: ComboCheck[] };
  hues: Hue[];
  option: ComboOption;
};

export const ROLE_NAME: Record<Role, string> = { bg: '바탕', surface: '면', ink: '글자', key: '주 강조', accent: '보조', danger: '오류', success: '성공' };
// 색 띠의 면적 — 60-30-10을 역할에 나눠 붙인 근사. Regula가 정한 값(출처 없음).
export const ROLE_WEIGHT: Record<Role, number> = { bg: 46, surface: 24, ink: 12, key: 10, accent: 6, danger: 1, success: 1 };

// sRGB HEX → OKLCH (Björn Ottosson의 OKLab 정의). 화면 표시 · 복사용
export function oklchOf(hex: string) {
  const [r, g, b] = hexToRgb(hex).map((v) => { const c = v / 255; return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4; });
  const l = Math.cbrt(0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b);
  const m = Math.cbrt(0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b);
  const s = Math.cbrt(0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b);
  const L = 0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s;
  const A = 1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s;
  const B = 0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s;
  const C = Math.hypot(A, B);
  const H = C < 0.0005 ? 0 : ((Math.atan2(B, A) * 180) / Math.PI + 360) % 360;
  return { l: L, c: C, h: H, css: `oklch(${(L * 100).toFixed(1)}% ${C.toFixed(3)} ${H.toFixed(1)})` };
}

// OKLCH 색상각(°). 채도가 아주 낮으면 각도가 의미 없어 null.
function hueOf(hex: string): number | null {
  const o = oklchOf(hex);
  return o.c < 0.03 ? null : Math.round(o.h) % 360;
}

const ratio = (a: string, b: string) => contrast(hexToRgb(a), hexToRgb(b));

function checksFor(sw: Swatch[]): ComboCheck[] {
  const get = (r: Role) => sw.find((x) => x.role === r)?.hex;
  const bg = get('bg')!, ink = get('ink')!, surface = get('surface') ?? bg, key = get('key');
  const out: ComboCheck[] = [];
  const add = (label: string, fg: string, back: string, need: number, sc: ComboCheck['sc']) => {
    const r = ratio(fg, back);
    out.push({ label, fg, bg: back, ratio: r, need, sc, pass: r >= need });
  };
  add('글자 / 바탕', ink, bg, 4.5, '1.4.3');
  if (surface !== bg) add('글자 / 면', ink, surface, 4.5, '1.4.3');
  if (key && key !== ink) {
    add('주 강조 글자(링크) / 면', key, surface, 4.5, '1.4.3');
    const on = ratio(surface, key) >= ratio(ink, key) ? surface : ink;
    add('주 강조 면 위 글자', on, key, 4.5, '1.4.3');
  }
  sw.filter((x) => x.role === 'accent').forEach((a) => add(`보조 ${a.label} / 면 (그래프 · 점)`, a.hex, surface, 3, '1.4.11'));
  return out;
}

// builder 색 키로 옮기기. 보조 글자 · 선은 바탕과 글자를 섞어 만든다(섞는 비율은 이 도구가 정한 값 — 출처 없음).
function toColors(sw: Swatch[]): Partial<Record<ColorKey, string>> {
  const get = (r: Role) => sw.find((x) => x.role === r)?.hex;
  const bg = get('bg')!, ink = get('ink')!, surface = get('surface') ?? bg;
  const c: Partial<Record<ColorKey, string>> = {
    bg, surface, ink,
    inkSecondary: mix(ink, surface, 0.25), border: mix(surface, ink, 0.16), borderStrong: mix(surface, ink, 0.5),
  };
  const key = get('key'), danger = get('danger'), success = get('success');
  if (key) c.key = key;
  if (danger) c.danger = danger;
  if (success) c.success = success;
  return c;
}

let cache: ResolvedCombo[] | null = null;

export async function loadCombos(): Promise<ResolvedCombo[]> {
  if (cache) return cache;
  const [combos, palettes, templates] = await Promise.all([getCollection('combos'), getCollection('palettes'), getCollection('templates')]);
  const paletteHex = new Map<string, string>();
  for (const p of palettes) for (const sc of p.data.scales) for (const st of sc.steps) paletteHex.set(`${p.id}/${sc.name}/${st.name}`, st.hex.toUpperCase());

  cache = combos.sort((a, b) => a.data.order - b.data.order).map((c) => {
    const d = c.data;
    let tokens: Map<string, { value: string; dark?: string }> | null = null;
    if (d.template) {
      const t = templates.find((x) => x.id === d.template);
      if (!t) throw new Error(`색 조합 ${c.id}: 없는 양식 "${d.template}"`);
      tokens = new Map(loadTemplate(t).groups.flatMap((g) => g.tokens).map((x) => [x.name, x]));
    }
    const resolve = (list: typeof d.light, mode: 'light' | 'dark'): Swatch[] => list.map((x) => {
      let hex = x.hex?.toUpperCase();
      if (x.token) {
        const tk = tokens?.get(x.token);
        if (!tk) throw new Error(`색 조합 ${c.id}: 토큰 ${x.token}이 양식 ${d.template}에 없음`);
        hex = (mode === 'dark' ? tk.dark ?? tk.value : tk.value).trim().toUpperCase();
      }
      if (!hex || !/^#[0-9A-F]{6}$/.test(hex)) throw new Error(`색 조합 ${c.id}: ${x.token ?? x.role} 값이 #RRGGBB가 아님 (${hex})`);
      if (x.from && x.from.split('/').length === 3) {
        const want = paletteHex.get(x.from);
        if (!want) throw new Error(`색 조합 ${c.id}: 팔레트에 없는 단계 ${x.from}`);
        if (want !== hex) throw new Error(`색 조합 ${c.id}: ${x.from}은 ${want}인데 ${hex}로 적힘`);
      }
      return { role: x.role, hex, label: x.name ?? x.token ?? ROLE_NAME[x.role] };
    });
    const light = resolve(d.light, 'light');
    // 양식 조합은 토큰에 다크 값이 하나라도 있을 때만 다크를 만든다
    const hasTokenDark = !!tokens && d.light.some((x) => x.token && tokens!.get(x.token)?.dark);
    const dark = d.dark ? resolve(d.dark, 'dark') : hasTokenDark ? resolve(d.light, 'dark') : undefined;

    const key = light.find((x) => x.role === 'key');
    const keyHue = key ? hueOf(key.hex) : null;
    const hues: Hue[] = light.filter((x) => x.role === 'key' || x.role === 'accent').map((x) => {
      const h = hueOf(x.hex);
      const delta = h == null || keyHue == null || x === key ? null : (h - keyHue + 360) % 360;
      return { label: x.label, hex: x.hex, hue: h, delta };
    });

    const accent = (sw?: Swatch[]) => (sw ?? []).filter((x) => x.role === 'accent').map((x) => x.hex).slice(0, 4);
    const option: ComboOption = {
      id: c.id, name: d.name, source: d.source, basis: d.basis, group: d.group ?? d.basis,
      strip: light.filter((x) => x.role !== 'danger' && x.role !== 'success').map((x) => x.hex),
      light: toColors(light), dark: dark ? toColors(dark) : undefined,
      accent: { light: accent(light), dark: accent(dark) },
    };
    return { id: c.id, data: d, light, dark, checks: { light: checksFor(light), dark: dark ? checksFor(dark) : undefined }, hues, option };
  });
  return cache;
}

// 이 공식을 근거로 든 조합
export async function combosFor(formulaId: string) {
  return (await loadCombos()).filter((c) => c.data.principles.includes(formulaId));
}
