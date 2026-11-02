// spec → 토큰. 색 섞기, 타입 스케일, 그림자 단계, 대비 검사를 한 곳에서 계산한다.
// 미리보기와 내려받는 파일이 같은 결과를 쓰도록, 계산은 여기서만 한다.
import { contrast } from '../color.ts';
import { EASES, type ColorKey, type Colors, type FontOption, type Mode, type Spec } from './spec.ts';

// ── 색 ─────────────────────────────────────────────────
export type RGB = [number, number, number];
export const hexToRgb = (h: string): RGB => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16)) as RGB;
export const rgbToHex = (c: RGB) => '#' + c.map((v) => Math.round(Math.min(255, Math.max(0, v))).toString(16).padStart(2, '0')).join('').toUpperCase();
// a에 b를 t만큼(0–1) 섞는다 — sRGB 값을 그대로 섞는 단순 계산
export const mix = (a: string, b: string, t: number) => {
  const x = hexToRgb(a), y = hexToRgb(b);
  return rgbToHex(x.map((v, i) => v + (y[i] - v) * t) as RGB);
};
export const ratio = (a: string, b: string) => contrast(hexToRgb(a), hexToRgb(b));
// 화면에 보이는 값은 버림: 4.499가 4.50으로 보이지 않게
export const showRatio = (r: number) => (Math.floor(r * 100) / 100).toFixed(2);
export const rgba = (h: string, a: number) => `rgba(${hexToRgb(h).join(', ')}, ${+a.toFixed(3)})`;

export type ModeColors = Colors & {
  keyHover: string; keyActive: string; keySoft: string; keyOn: string; dangerSoft: string; successSoft: string;
};
export function deriveColors(c: Colors, mode: Mode): ModeColors {
  const toward = mode === 'light' ? '#000000' : '#FFFFFF';
  // 주 버튼 글자: 표면색과 글자색 중 key 위에서 대비가 큰 쪽
  const keyOn = ratio(c.surface, c.key) >= ratio(c.ink, c.key) ? c.surface : c.ink;
  return {
    ...c,
    keyHover: mix(c.key, toward, 0.12), keyActive: mix(c.key, toward, 0.24),
    keySoft: mix(c.surface, c.key, 0.12), keyOn,
    dangerSoft: mix(c.surface, c.danger, 0.12), successSoft: mix(c.surface, c.success, 0.12),
  };
}

// ── 대비 검사 ─ 기준: WCAG 2.2 1.4.3 (본문 4.5:1), 1.4.11 (UI 컴포넌트 · 그래픽 3:1). 둘 다 Regula에서 원문 확인한 기준.
export type Check = { id: string; label: string; fg: string; bg: string; ratio: number; need: number; pass: boolean; sc: '1.4.3' | '1.4.11'; fgName: string; bgName: string };
export function checks(c: ModeColors): Check[] {
  const rows: [string, string, string, string, string, number, '1.4.3' | '1.4.11'][] = [
    ['글자 on 배경', '--ink', 'ink', '--bg', 'bg', 4.5, '1.4.3'],
    ['글자 on 표면', '--ink', 'ink', '--surface', 'surface', 4.5, '1.4.3'],
    ['보조 글자 on 배경', '--ink-secondary', 'inkSecondary', '--bg', 'bg', 4.5, '1.4.3'],
    ['보조 글자 on 표면', '--ink-secondary', 'inkSecondary', '--surface', 'surface', 4.5, '1.4.3'],
    ['주 버튼 글자 on 강조색', '--key-on', 'keyOn', '--key', 'key', 4.5, '1.4.3'],
    ['강조색 링크 on 표면', '--key', 'key', '--surface', 'surface', 4.5, '1.4.3'],
    ['강조색 링크 on 배경', '--key', 'key', '--bg', 'bg', 4.5, '1.4.3'],
    ['오류 글자 on 표면', '--danger', 'danger', '--surface', 'surface', 4.5, '1.4.3'],
    ['성공 글자 on 표면', '--success', 'success', '--surface', 'surface', 4.5, '1.4.3'],
    ['안내 알림 글자 on 안내 배경', '--ink', 'ink', '--key-soft', 'keySoft', 4.5, '1.4.3'],
    ['오류 알림 글자 on 오류 배경', '--ink', 'ink', '--danger-soft', 'dangerSoft', 4.5, '1.4.3'],
    ['성공 알림 글자 on 성공 배경', '--ink', 'ink', '--success-soft', 'successSoft', 4.5, '1.4.3'],
    ['위험 버튼 글자 on 마우스 올린 배경', '--danger', 'danger', '--danger-soft', 'dangerSoft', 4.5, '1.4.3'],
    ['입력칸 경계 on 표면', '--border-strong', 'borderStrong', '--surface', 'surface', 3, '1.4.11'],
    ['입력칸 경계 on 배경', '--border-strong', 'borderStrong', '--bg', 'bg', 3, '1.4.11'],
    ['포커스 링(강조색) on 표면', '--key', 'key', '--surface', 'surface', 3, '1.4.11'],
    ['포커스 링(강조색) on 배경', '--key', 'key', '--bg', 'bg', 3, '1.4.11'],
  ];
  return rows.map(([label, fgName, fk, bgName, bk, need, sc], i) => {
    const fg = c[fk as keyof ModeColors], bg = c[bk as keyof ModeColors];
    const r = ratio(fg, bg);
    return { id: `c${i}`, label, fg, bg, ratio: r, need, pass: r >= need, sc, fgName, bgName };
  });
}

// ── 서체 ───────────────────────────────────────────────
export type FontRole = 'display' | 'body' | 'mono';
const KO_FALLBACK = '"Apple SD Gothic Neo", "Malgun Gothic"';
const SYSTEM: Record<FontRole, string> = {
  display: 'system-ui, -apple-system, "Segoe UI", "Apple SD Gothic Neo", "Malgun Gothic", sans-serif',
  body: 'system-ui, -apple-system, "Segoe UI", "Apple SD Gothic Neo", "Malgun Gothic", sans-serif',
  mono: 'ui-monospace, "SF Mono", Menlo, Consolas, monospace',
};
export type FontPick = { id: string; role: FontRole; label: string; family?: string; stack: string; weights: number[]; url?: string; kind?: string; script?: string };

// 서체 파일이 실제로 싣는 굵기. Google 주소의 wght 목록을 따르고, 목록이 없으면 한 굵기(400). CSS 주소(가변 서체)는 400 · 700만 쓴다.
function weightsOf(f: FontOption): number[] {
  if (f.load.google) {
    const m = f.load.google.match(/wght@([\d;]+)/);
    return m ? m[1].split(';').map(Number) : [400];
  }
  return [400, 700];
}
export function pickFont(role: FontRole, id: string, fonts: FontOption[]): FontPick {
  const f = fonts.find((x) => x.id === id);
  if (!f) return { id: 'system', role, label: '시스템 서체', stack: SYSTEM[role], weights: [400, 700] };
  const generic = f.kind === '모노' ? 'monospace' : f.kind === '세리프' ? 'serif' : 'sans-serif';
  // 라틴만 있는 서체는 한글을 시스템 한글 서체가 받게 한다
  const ko = f.script === '라틴' && f.kind !== '모노' ? `, ${KO_FALLBACK}` : '';
  const url = f.load.css ?? (f.load.google ? `https://fonts.googleapis.com/css2?family=${f.load.google}&display=swap` : undefined);
  return { id, role, label: f.name, family: f.family, stack: `"${f.family}"${ko}, ${generic}`, weights: weightsOf(f), url, kind: f.kind, script: f.script };
}

export type TypeRow = { key: string; label: string; font: FontRole; size: number; weight: number; line: number; track: number; note?: string };
export function deriveType(s: Spec, fonts: FontOption[]) {
  const picks = {
    display: pickFont('display', s.fonts.display, fonts),
    body: pickFont('body', s.fonts.body, fonts),
    mono: pickFont('mono', s.fonts.mono, fonts),
  };
  const { base, ratio: r, lhBody, lhHead, trackHead } = s.type;
  const px = (n: number) => Math.round(base * r ** n);
  const sizes = { small: px(-1), body: base, large: px(1), h3: px(2), h2: px(3), h1: px(4), display: px(5) };
  const regular = picks.body.weights.includes(400) ? 400 : Math.min(...picks.body.weights);
  const strong = Math.max(...picks.body.weights);
  const heading = Math.max(...picks.display.weights);
  const rows: TypeRow[] = [
    { key: 'display', label: 'Display', font: 'display', size: sizes.display, weight: heading, line: lhHead, track: trackHead },
    { key: 'h1', label: 'H1', font: 'display', size: sizes.h1, weight: heading, line: lhHead, track: trackHead },
    { key: 'h2', label: 'H2', font: 'display', size: sizes.h2, weight: heading, line: lhHead, track: trackHead },
    { key: 'h3', label: 'H3', font: 'display', size: sizes.h3, weight: heading, line: lhHead, track: trackHead },
    { key: 'large', label: 'Body Large', font: 'body', size: sizes.large, weight: regular, line: lhBody, track: 0 },
    { key: 'body', label: 'Body', font: 'body', size: sizes.body, weight: regular, line: lhBody, track: 0 },
    { key: 'button', label: 'Button', font: 'body', size: sizes.body, weight: strong, line: 1, track: 0 },
    { key: 'small', label: 'Small', font: 'body', size: sizes.small, weight: regular, line: lhBody, track: 0 },
    { key: 'number', label: 'Number (고정폭)', font: 'mono', size: sizes.body, weight: Math.min(...picks.mono.weights.filter((w) => w >= 400), 400) || 400, line: 1.3, track: 0 },
  ];
  return { picks, sizes, regular, strong, heading, rows };
}

// ── 모서리 · 간격 ───────────────────────────────────────
export const radiusPx = (n: number) => (n >= 999 ? '9999px' : `${n}px`);
const MULT = [1, 2, 3, 4, 6, 8, 12, 16];
export function deriveSpace(s: Spec) {
  const u = s.space.unit;
  const scale = MULT.map((m) => m * u);
  const up = (px: number) => Math.ceil(px / u) * u; // 단위의 배수로 올림 → 스케일 위의 값
  const dens = { compact: { ctrlX: 12, card: 16, gap: 8, section: 32 }, normal: { ctrlX: 16, card: 24, gap: 16, section: 48 }, relaxed: { ctrlX: 24, card: 32, gap: 24, section: 64 } }[s.space.density];
  const pick = (px: number) => { const v = up(px); return scale.includes(v) ? v : scale.find((x) => x >= v) ?? scale[scale.length - 1]; };
  const comp = { controlX: pick(dens.ctrlX), card: pick(dens.card), gap: pick(dens.gap), section: pick(dens.section), control: s.space.control };
  return { unit: u, scale, comp, name: (px: number) => `--space-${scale.indexOf(px) + 1}` };
}

// ── 그림자 · 재질 ───────────────────────────────────────
// 단계값은 이 도구가 정한 값이다(출처 없음). 1–4단계로 갈수록 크고 멀다.
const SOFT = { y: [1, 3, 8, 20], blur: [3, 10, 24, 56], a: [0.08, 0.1, 0.14, 0.2] };
const HARD = [2, 4, 6, 8];
const DUAL = [3, 6, 10, 16];

export function deriveEffects(s: Spec, c: ModeColors, mode: Mode) {
  const e = s.effect;
  const lo = mode === 'light' ? rgba(c.ink, 0.22) : 'rgba(0, 0, 0, 0.65)';
  const hi = mode === 'light' ? 'rgba(255, 255, 255, 0.85)' : 'rgba(255, 255, 255, 0.06)';
  const shadowRgb = mode === 'light' ? c.ink : '#000000';
  const ladder: string[] = [0, 1, 2, 3].map((i) => {
    if (e.shadow === 'none') return 'none';
    if (e.shadow === 'soft') return `0 ${SOFT.y[i]}px ${SOFT.blur[i]}px ${rgba(shadowRgb, mode === 'light' ? SOFT.a[i] : Math.min(0.6, SOFT.a[i] * 3))}`;
    if (e.shadow === 'hard') return `${HARD[i]}px ${HARD[i]}px 0 var(--ink)`;
    const d = DUAL[i];
    return `-${d}px -${d}px ${d * 2}px ${hi}, ${d}px ${d}px ${d * 2}px ${lo}`;
  });
  const step = (n: number) => ladder[Math.min(4, Math.max(1, n)) - 1];
  const inset: string[] = [];
  if (e.texture === 'inset') inset.push(`inset -6px -6px 12px ${lo}`, `inset 6px 6px 12px ${hi}`);
  if (e.texture === 'gloss') inset.push(`inset 0 1px 0 ${mode === 'light' ? 'rgba(255, 255, 255, 0.5)' : 'rgba(255, 255, 255, 0.18)'}`);
  if (e.texture === 'edge') inset.push(`inset 0 1px 0 ${mode === 'light' ? 'rgba(255, 255, 255, 0.9)' : 'rgba(255, 255, 255, 0.28)'}`, `inset 0 0 0 1px ${mode === 'light' ? 'rgba(255, 255, 255, 0.45)' : 'rgba(255, 255, 255, 0.12)'}`);
  const join = (...parts: string[]) => parts.filter((p) => p && p !== 'none').join(', ') || 'none';
  const sheen = e.texture === 'gloss'
    ? `linear-gradient(${mode === 'light' ? 'rgba(255, 255, 255, 0.35)' : 'rgba(255, 255, 255, 0.12)'}, rgba(255, 255, 255, 0) 60%)`
    : 'none';
  return {
    ladder,
    card: join(step(e.depth), ...inset),
    button: join(step(Math.max(1, e.depth - 1)), ...inset),
    overlay: join(step(e.depth + 1), ...inset),
    sheen,
    materialBg: rgba(c.surface, e.alpha / 100),
    materialBlur: e.blur > 0 ? `blur(${e.blur}px)` : 'none',
    focus: `2px solid ${c.key}`,
  };
}

export const easeCss = (id: string) => EASES.find((x) => x.id === id)?.css ?? EASES[0].css;

// ── 토큰 묶음 ─ CSS 블록 · JSON · 미리보기가 모두 여기서 읽는다.
export type Group = { title: string; note: string; vars: [string, string, string?][] };
export function buildTokens(s: Spec, fonts: FontOption[]) {
  const type = deriveType(s, fonts);
  const space = deriveSpace(s);
  const bw = s.effect.border;
  const modes = (['light', 'dark'] as Mode[]).map((mode) => {
    const c = deriveColors(s.color[mode], mode);
    return { mode, c, fx: deriveEffects(s, c, mode), checks: checks(c) };
  });
  const [L] = modes;

  // 모드와 상관없는 값
  const common: Group[] = [
    { title: 'Typography', note: '서체와 크기. 한글은 시스템 한글 서체가 받는다(라틴만 있는 서체)', vars: [
      ['--font-display', type.picks.display.stack, '제목'], ['--font-sans', type.picks.body.stack, '본문 · 버튼'], ['--font-mono', type.picks.mono.stack, '숫자 · 코드'],
      ['--weight-regular', String(type.regular)], ['--weight-strong', String(type.strong)], ['--weight-heading', String(type.heading)],
      ['--text-small', `${type.sizes.small}px`], ['--text-body', `${type.sizes.body}px`], ['--text-large', `${type.sizes.large}px`],
      ['--text-h3', `${type.sizes.h3}px`], ['--text-h2', `${type.sizes.h2}px`], ['--text-h1', `${type.sizes.h1}px`], ['--text-display', `${type.sizes.display}px`],
      ['--line-body', String(s.type.lhBody)], ['--line-heading', String(s.type.lhHead)], ['--tracking-heading', `${s.type.trackHead}em`],
    ] },
    { title: 'Radius', note: '모서리. 버튼 · 입력 · 카드를 따로 정한다', vars: [
      ['--radius-button', radiusPx(s.radius.button)], ['--radius-input', radiusPx(s.radius.input)], ['--radius-card', radiusPx(s.radius.card)], ['--radius-full', '9999px', '아바타 · 뱃지'],
    ] },
    { title: 'Border', note: '테두리 두께. 입력칸은 0이어도 1px', vars: [
      ['--border-width', `${bw}px`], ['--input-border-width', `${Math.max(1, bw)}px`],
    ] },
    { title: 'Spacing', note: `${space.unit}px 단위의 배수만`, vars: [
      ...space.scale.map((v, i) => [`--space-${i + 1}`, `${v}px`] as [string, string]),
      ['--control-height', `${s.space.control}px`, '버튼 · 입력칸 높이'],
      ['--control-pad-x', `${space.comp.controlX}px`], ['--card-pad', `${space.comp.card}px`], ['--gap', `${space.comp.gap}px`], ['--section-gap', `${space.comp.section}px`],
    ] },
    { title: 'Motion', note: '시간과 곡선', vars: [
      ['--ease', easeCss(s.motion.ease)], ['--dur-fast', `${s.motion.fast}ms`, 'hover · 버튼'], ['--dur-base', `${s.motion.base}ms`, '드롭다운 · 알림 등장'], ['--dur-slow', `${s.motion.slow}ms`, '화면 전환'],
    ] },
  ];
  // 모드마다 다른 값
  const perMode = (m: (typeof modes)[number]): Group[] => [
    { title: 'Color', note: '바탕 · 글자 · 선', vars: [
      ['--bg', m.c.bg, '페이지 배경'], ['--surface', m.c.surface, '카드 · 입력칸'], ['--ink', m.c.ink, '제목 · 본문'], ['--ink-secondary', m.c.inkSecondary, '설명 · 보조'],
      ['--border', m.c.border, '구분선 · 카드 테두리'], ['--border-strong', m.c.borderStrong, '입력칸 · 보조 버튼 테두리'],
    ] },
    { title: 'Key', note: '눌러야 할 곳 · 링크 · 포커스', vars: [
      ['--key', m.c.key], ['--key-hover', m.c.keyHover], ['--key-active', m.c.keyActive], ['--key-soft', m.c.keySoft, '선택 · 안내 배경'], ['--key-on', m.c.keyOn, '강조색 면 위의 글자'],
    ] },
    { title: 'Semantic', note: '상태. 색에만 기대지 않고 글자로도 알린다', vars: [
      ['--danger', m.c.danger], ['--danger-soft', m.c.dangerSoft], ['--success', m.c.success], ['--success-soft', m.c.successSoft],
    ] },
    { title: 'Shadow', note: '단계 1–4와 컴포넌트별 조합', vars: [
      ...m.fx.ladder.map((v, i) => [`--shadow-${i + 1}`, v] as [string, string]),
      ['--shadow-card', m.fx.card], ['--shadow-button', m.fx.button], ['--shadow-overlay', m.fx.overlay], ['--sheen', m.fx.sheen, '버튼 · 카드 위 광택 배경'], ['--focus-ring', m.fx.focus, 'outline 값. outline-offset: 2px와 함께'],
    ] },
    { title: 'Material', note: '카드 · 알림의 면. 투명도 100%, 흐림 none이면 불투명', vars: [
      ['--material-bg', m.fx.materialBg], ['--material-blur', m.fx.materialBlur],
    ] },
  ];
  return { type, space, common, modes: modes.map((m) => ({ ...m, groups: perMode(m) })), light: L };
}
export type Tokens = ReturnType<typeof buildTokens>;

// 모드 사이에서 값이 다른 변수만 골라 다크 블록을 만든다
export function darkOverrides(t: Tokens): [string, string][] {
  const light = new Map(t.modes[0].groups.flatMap((g) => g.vars).map(([k, v]) => [k, v]));
  return t.modes[1].groups.flatMap((g) => g.vars).filter(([k, v]) => light.get(k) !== v).map(([k, v]) => [k, v]);
}
