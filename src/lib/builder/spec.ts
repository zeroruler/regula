// 「디자인 파일 만들기」의 설정(spec). 화면 컨트롤 ↔ 주소 해시 ↔ 내려받는 파일이 모두 이 한 구조를 거친다.
// 주소 해시와 불러온 파일은 믿을 수 없는 입력이라, 모든 값은 sanitize()를 지나야 CSS와 파일에 들어간다.

export const COLOR_KEYS = ['bg', 'surface', 'ink', 'inkSecondary', 'border', 'borderStrong', 'key', 'danger', 'success'] as const;
export type ColorKey = (typeof COLOR_KEYS)[number];
export type Colors = Record<ColorKey, string>;
export type Mode = 'light' | 'dark';

export const SHADOW_KINDS = ['none', 'soft', 'hard', 'dual'] as const;
export const TEXTURES = ['none', 'gloss', 'inset', 'edge'] as const;

// 불러올 수 있는 서체. 사이트의 fonts 컬렉션에서 만들고, 'system'은 서체 파일을 부르지 않는 시스템 서체.
export type FontOption = {
  id: string; name: string; family: string; kind: '산세리프' | '세리프' | '디스플레이' | '모노'; script: '한글 · 라틴' | '라틴';
  load: { google?: string; css?: string };
};

export type Spec = {
  v: 1;
  name: string;
  intent: string;
  preset: string;
  fonts: { display: string; body: string; mono: string };
  type: { base: number; ratio: number; lhBody: number; lhHead: number; trackHead: number };
  radius: { button: number; input: number; card: number };
  effect: {
    shadow: (typeof SHADOW_KINDS)[number]; depth: number; border: number;
    blur: number; alpha: number; texture: (typeof TEXTURES)[number]; alertBar: boolean;
  };
  color: { light: Colors; dark: Colors; darkOn: boolean };
  space: { unit: 4 | 8; density: 'compact' | 'normal' | 'relaxed'; control: number };
  motion: { fast: number; base: number; slow: number; ease: string };
  // 시작점으로 고른 색 조합(/colors/). 보조 색(accent)은 builder 색 키가 아니라 DESIGN.md에만 --accent-*로 들어간다(PLAN §7).
  combo: ComboPick | null;
};
export type ComboPick = { id: string; name: string; source: string; accent: { light: string[]; dark: string[] } };

// /colors/의 조합을 builder에 넘기는 모양. 색 키는 src/lib/combos.ts가 빌드 때 채운다(없는 키는 지금 값 유지).
export type ComboOption = {
  id: string; name: string; source: string; basis: string; group: string; strip: string[];
  light: Partial<Colors>; dark?: Partial<Colors>; accent: { light: string[]; dark: string[] };
};

export const RATIOS = [1.125, 1.2, 1.25, 1.333, 1.5, 1.618];
export const RADII = [0, 2, 4, 6, 8, 12, 16, 24, 32, 999];
export const CONTROLS = [32, 40, 44, 48];
export const DENSITIES = ['compact', 'normal', 'relaxed'] as const;

// 곡선. 이름 있는 세 개는 Material 3 motion 토큰(material-web)의 값 — Regula 움직임 페이지에서 확인한 것.
export const EASES: { id: string; label: string; css: string }[] = [
  { id: 'standard', label: '표준 · M3 standard', css: 'cubic-bezier(0.2, 0, 0, 1)' },
  { id: 'decelerate', label: '감속 · M3 standard-decelerate', css: 'cubic-bezier(0, 0, 0, 1)' },
  { id: 'accelerate', label: '가속 · M3 standard-accelerate', css: 'cubic-bezier(0.3, 0, 1, 1)' },
  { id: 'ease-in-out', label: 'ease-in-out (CSS 기본)', css: 'ease-in-out' },
  { id: 'ease-out', label: 'ease-out (CSS 기본)', css: 'ease-out' },
  { id: 'linear', label: 'linear', css: 'linear' },
];
// 시간 묶음: 빠름 · 보통 · 느림 (fast / base / slow). 이 도구가 정한 조합이고, UI 움직임은 대개 0.1–0.5초라는 규칙 안에서 잡았다.
export const MOTION_SETS: { id: string; label: string; fast: number; base: number; slow: number }[] = [
  { id: 'quick', label: '빠름', fast: 100, base: 200, slow: 300 },
  { id: 'normal', label: '보통', fast: 150, base: 300, slow: 500 },
  { id: 'calm', label: '느림', fast: 200, base: 400, slow: 600 },
  { id: 'none', label: '없음', fast: 0, base: 0, slow: 0 },
];

export const LIGHT: Colors = {
  bg: '#F4F5F3', surface: '#FFFFFF', ink: '#16181B', inkSecondary: '#4B5058', border: '#D5D8DC', borderStrong: '#80868E',
  key: '#2B59C3', danger: '#B3261E', success: '#1B6B45',
};
export const DARK: Colors = {
  bg: '#101214', surface: '#1B1D20', ink: '#EEF0F1', inkSecondary: '#B0B5BB', border: '#33373C', borderStrong: '#8A9099',
  key: '#8CAAF0', danger: '#FF8A80', success: '#5FCB8E',
};

export const DEFAULT: Spec = {
  v: 1, name: '새 디자인 시스템', intent: '', preset: 'material',
  fonts: { display: 'system', body: 'system', mono: 'system' },
  type: { base: 16, ratio: 1.25, lhBody: 1.6, lhHead: 1.2, trackHead: -0.01 },
  radius: { button: 20, input: 8, card: 16 },
  effect: { shadow: 'soft', depth: 2, border: 0, blur: 0, alpha: 100, texture: 'none', alertBar: false },
  color: { light: { ...LIGHT }, dark: { ...DARK }, darkOn: true },
  space: { unit: 4, density: 'normal', control: 40 },
  motion: { fast: 150, base: 300, slow: 500, ease: 'standard' },
  combo: null,
};

// ── 비주얼 스타일 프리셋 ─ 재료(그림자 · 테두리 · 투명도 · 질감)와 모서리만 정한다. 색과 서체는 건드리지 않는다(뉴모피즘만 예외).
// 재료의 근거는 Regula 「비주얼 스타일」 페이지(/principles/styles/)의 9가지 정리. 값 자체는 그 정리를 CSS로 옮긴 근사다.
type Effect = Spec['effect'];
export type Preset = {
  id: string; name: string; note: string; prompt: string;
  radius: Spec['radius']; effect: Effect; colors?: Partial<Record<Mode, Partial<Record<ColorKey, string>>>>;
};
const fx = (p: Partial<Effect>): Effect => ({ shadow: 'none', depth: 1, border: 0, blur: 0, alpha: 100, texture: 'none', alertBar: false, ...p });
export const PRESETS: Preset[] = [
  { id: 'skeuo', name: '스큐어모피즘', note: '광택 있는 면과 짙은 그림자로 실물처럼', prompt: 'skeuomorphic UI, realistic textures, soft lighting, glossy button',
    radius: { button: 8, input: 6, card: 10 }, effect: fx({ shadow: 'soft', depth: 3, border: 1, texture: 'gloss' }) },
  { id: 'flat', name: '플랫', note: '그림자 없는 단색 면', prompt: 'flat design, solid colors, no shadows, simple geometric shapes',
    radius: { button: 0, input: 0, card: 0 }, effect: fx({}) },
  { id: 'material', name: '머티리얼', note: '높이만큼 커지는 그림자', prompt: 'Material Design 3, layered surfaces, elevation shadows, rounded containers',
    radius: { button: 20, input: 8, card: 16 }, effect: fx({ shadow: 'soft', depth: 2 }) },
  { id: 'neu', name: '뉴모피즘', note: '배경과 같은 색 면 + 밝고 어두운 그림자 한 쌍', prompt: 'neumorphism, soft UI, same-color background, dual soft shadows (light top-left, dark bottom-right)',
    radius: { button: 14, input: 14, card: 22 }, effect: fx({ shadow: 'dual', depth: 2 }),
    colors: { light: { bg: '#E6E8EB', surface: '#E6E8EB' }, dark: { bg: '#1E2024', surface: '#1E2024' } } },
  { id: 'glass', name: '글래스모피즘', note: '반투명 면 + 뒤 배경 흐림 + 얇은 테두리', prompt: 'glassmorphism, frosted glass panel, background blur, thin light border',
    radius: { button: 20, input: 12, card: 18 }, effect: fx({ shadow: 'soft', depth: 1, border: 1, blur: 14, alpha: 35 }) },
  { id: 'clay', name: '클레이모피즘', note: '크게 둥근 덩어리 + 안쪽 그림자', prompt: 'claymorphism, soft 3D clay, inflated rounded shapes, inner shadows',
    radius: { button: 14, input: 14, card: 32 }, effect: fx({ shadow: 'soft', depth: 3, texture: 'inset' }) },
  { id: 'brutal', name: '네오 브루탈리즘', note: '굵은 테두리 + 흐림 없는 어긋난 그림자', prompt: 'neo-brutalism, thick black borders, hard offset shadows, flat bright colors, bold type',
    radius: { button: 0, input: 0, card: 0 }, effect: fx({ shadow: 'hard', depth: 3, border: 3 }),
    colors: { light: { border: '#16181B', borderStrong: '#16181B' }, dark: { border: '#EEF0F1', borderStrong: '#EEF0F1' } } },
  { id: 'icon3d', name: '3D 아이콘', note: '광택과 부드러운 그림자(아이콘 스타일이라 컴포넌트에는 가볍게)', prompt: '3D icon, soft render, studio lighting, subtle gloss, front view',
    radius: { button: 12, input: 10, card: 14 }, effect: fx({ shadow: 'soft', depth: 2, texture: 'gloss' }) },
  { id: 'liquid', name: '리퀴드 글래스', note: '아주 투명한 면 + 가장자리의 빛', prompt: 'Apple Liquid Glass, translucent refractive glass, specular highlights, adapts to content beneath',
    radius: { button: 24, input: 16, card: 26 }, effect: fx({ shadow: 'soft', depth: 2, blur: 6, alpha: 22, texture: 'edge' }) },
];

// 프리셋을 적용한 새 spec. 뉴모피즘 · 브루탈리즘은 색 일부도 같이 바꾼다.
export function applyPreset(spec: Spec, id: string): Spec {
  const p = PRESETS.find((x) => x.id === id);
  if (!p) return spec;
  const next: Spec = structuredClone(spec);
  next.preset = id;
  next.radius = { ...p.radius };
  next.effect = { ...p.effect, alertBar: spec.effect.alertBar }; // 알림 띠는 스타일이 아니라 취향이라 프리셋이 바꾸지 않는다
  for (const mode of ['light', 'dark'] as Mode[]) Object.assign(next.color[mode], p.colors?.[mode] ?? {});
  return next;
}
// 프리셋 값에서 컨트롤로 벗어났는지(수정됨 표시용)
export function presetEdited(spec: Spec): boolean {
  const p = PRESETS.find((x) => x.id === spec.preset);
  if (!p) return true;
  return JSON.stringify(p.radius) !== JSON.stringify(spec.radius) || JSON.stringify({ ...p.effect, alertBar: 0 }) !== JSON.stringify({ ...spec.effect, alertBar: 0 });
}

// 조합을 적용한 새 spec. 조합에 있는 색 키만 덮어쓰고, 다크 값이 없는 조합이면 다크는 그대로 둔다.
export function applyCombo(spec: Spec, c: ComboOption): Spec {
  const next: Spec = structuredClone(spec);
  Object.assign(next.color.light, c.light);
  if (c.dark) Object.assign(next.color.dark, c.dark);
  next.combo = { id: c.id, name: c.name, source: c.source, accent: { light: [...c.accent.light], dark: [...c.accent.dark] } };
  return next;
}
// 조합 값에서 손으로 고쳤는지(수정됨 표시용)
export function comboEdited(spec: Spec, c: ComboOption | undefined): boolean {
  if (!c) return false;
  const same = (want: Partial<Colors>, have: Colors) => Object.entries(want).every(([k, v]) => have[k as ColorKey].toUpperCase() === String(v).toUpperCase());
  return !same(c.light, spec.color.light) || (!!c.dark && spec.color.darkOn && !same(c.dark, spec.color.dark));
}

// ── 값 검증 ─────────────────────────────────────────────
const isObj = (v: unknown): v is Record<string, unknown> => typeof v === 'object' && v !== null && !Array.isArray(v);
const num = (v: unknown, min: number, max: number, fallback: number, step = 0): number => {
  const n = typeof v === 'number' && Number.isFinite(v) ? v : fallback;
  const c = Math.min(max, Math.max(min, n));
  return step ? +(Math.round(c / step) * step).toFixed(4) : c;
};
const oneOf = <T extends string | number>(v: unknown, list: readonly T[], fallback: T): T => (list.includes(v as T) ? (v as T) : fallback);
export const HEX = /^#[0-9a-fA-F]{6}$/;
const hex = (v: unknown, fallback: string) => (typeof v === 'string' && HEX.test(v) ? v.toUpperCase() : fallback);

export function slugify(name: string): string {
  const s = name.toLowerCase().normalize('NFKD').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 32);
  return s || 'my-design';
}

export function sanitize(input: unknown, fontIds: readonly string[] = []): Spec {
  const d = DEFAULT;
  const i = isObj(input) ? input : {};
  const f = isObj(i.fonts) ? i.fonts : {};
  const t = isObj(i.type) ? i.type : {};
  const r = isObj(i.radius) ? i.radius : {};
  const e = isObj(i.effect) ? i.effect : {};
  const c = isObj(i.color) ? i.color : {};
  const s = isObj(i.space) ? i.space : {};
  const m = isObj(i.motion) ? i.motion : {};
  const ids = ['system', ...fontIds];
  const colors = (v: unknown, base: Colors): Colors => {
    const o = isObj(v) ? v : {};
    return Object.fromEntries(COLOR_KEYS.map((k) => [k, hex(o[k], base[k])])) as Colors;
  };
  const text = (v: unknown, max: number, fallback: string) =>
    typeof v === 'string' ? v.replace(/[\u0000-\u001f\u007f<>`]/g, ' ').replace(/\s+/g, ' ').trim().slice(0, max) : fallback;
  const hexList = (v: unknown) => (Array.isArray(v) ? v.filter((x) => typeof x === 'string' && HEX.test(x)).slice(0, 4).map((x) => (x as string).toUpperCase()) : []);
  const combo = (v: unknown): ComboPick | null => {
    if (!isObj(v) || typeof v.id !== 'string' || !/^[a-z0-9-]{1,40}$/.test(v.id)) return null;
    const a = isObj(v.accent) ? v.accent : {};
    return { id: v.id, name: text(v.name, 40, v.id) || v.id, source: text(v.source, 120, ''), accent: { light: hexList(a.light), dark: hexList(a.dark) } };
  };
  return {
    v: 1,
    name: text(i.name, 24, d.name) || d.name,
    intent: text(i.intent, 200, ''),
    preset: [...PRESETS.map((p) => p.id), 'custom'].includes(String(i.preset)) ? String(i.preset) : d.preset,
    fonts: {
      display: oneOf(f.display, ids, 'system'), body: oneOf(f.body, ids, 'system'), mono: oneOf(f.mono, ids, 'system'),
    },
    type: {
      base: num(t.base, 14, 20, d.type.base, 1),
      ratio: oneOf(t.ratio, RATIOS, d.type.ratio),
      lhBody: num(t.lhBody, 1.3, 2, d.type.lhBody, 0.05),
      lhHead: num(t.lhHead, 1, 1.5, d.type.lhHead, 0.05),
      trackHead: num(t.trackHead, -0.05, 0.05, d.type.trackHead, 0.005),
    },
    radius: { button: oneOf(r.button, RADII, d.radius.button), input: oneOf(r.input, RADII, d.radius.input), card: oneOf(r.card, RADII, d.radius.card) },
    effect: {
      shadow: oneOf(e.shadow, SHADOW_KINDS, d.effect.shadow),
      depth: num(e.depth, 1, 4, d.effect.depth, 1),
      border: num(e.border, 0, 3, d.effect.border, 1),
      blur: num(e.blur, 0, 24, d.effect.blur, 1),
      alpha: num(e.alpha, 20, 100, d.effect.alpha, 5),
      texture: oneOf(e.texture, TEXTURES, d.effect.texture),
      alertBar: e.alertBar === true,
    },
    color: { light: colors(c.light, LIGHT), dark: colors(c.dark, DARK), darkOn: c.darkOn === false ? false : true },
    space: { unit: s.unit === 8 ? 8 : 4, density: oneOf(s.density, DENSITIES, 'normal'), control: oneOf(s.control, CONTROLS, d.space.control) },
    motion: {
      fast: num(m.fast, 0, 1000, d.motion.fast, 10), base: num(m.base, 0, 1000, d.motion.base, 10), slow: num(m.slow, 0, 1000, d.motion.slow, 10),
      ease: oneOf(m.ease, EASES.map((x) => x.id), d.motion.ease),
    },
    combo: combo(i.combo),
  };
}

// ── 주소 해시 ─ UTF-8 JSON을 base64url로. 한글 이름과 의도가 들어가도 된다.
export function encodeSpec(spec: Spec): string {
  const bytes = new TextEncoder().encode(JSON.stringify(spec));
  let bin = '';
  bytes.forEach((b) => (bin += String.fromCharCode(b)));
  return btoa(bin).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}
export function decodeSpec(code: string, fontIds: readonly string[] = []): Spec | null {
  try {
    const b64 = code.replace(/-/g, '+').replace(/_/g, '/');
    const bin = atob(b64 + '='.repeat((4 - (b64.length % 4)) % 4));
    const bytes = Uint8Array.from(bin, (ch) => ch.charCodeAt(0));
    return sanitize(JSON.parse(new TextDecoder().decode(bytes)), fontIds);
  } catch {
    return null;
  }
}
