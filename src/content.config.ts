import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// 필드는 PLAN.md §4 콘텐츠 작성 규칙을 그대로 따른다. source는 필수 — 출처 없는 규칙은 빌드가 막는다.
const formulas = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/formulas' }),
  schema: z.object({
    name: z.string(),
    order: z.number(),
    // 원리와 공식 페이지에서 묶는 단위. 실습 페이지가 있는 주제는 src/lib/site.ts의 topics에 등록
    topic: z.enum(['비율과 간격', '타이포그래피', '색', '게슈탈트', '조형', '그리드', '사용성과 접근성', '심리와 편향', '움직임', '비주얼 스타일', '좋은 디자인']),
    equation: z.string(),
    meaning: z.string(),
    source: z.string().min(1),
    refs: z.array(z.string()).default([]),
    note: z.string().optional(),
    // 웹 화면에 옮기는 한 줄. 출처의 문장이 아니라 Regula가 붙인 적용 예다(출처가 따로 있으면 문장 안에 적는다)
    web: z.string().optional(),
    demo: z.boolean().default(false),
  }),
});

const patterns = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/patterns' }),
  schema: z.object({
    name: z.string(),
    en: z.string(),
    category: z.string(),
    // 카테고리마다 1–9 눈금 하나로 정렬한다. 알림은 방해 정도, 버튼은 시각적 무게, 입력은 입력 수고, 내비게이션은 다루는 범위, 로딩은 기다리는 시간, 빈 상태는 막힌 정도, 제스처는 알아채기 어려운 정도, AI 화면은 대화의 시점, 화면 구성은 가려진 정도, 찾기와 거르기는 둘러보는 정도 (src/lib/site.ts patternGroups)
    intrusiveness: z.number().int().min(1).max(9).optional(),
    emphasis: z.number().int().min(1).max(9).optional(),
    effort: z.number().int().min(1).max(9).optional(),
    scope: z.number().int().min(1).max(9).optional(),
    wait: z.number().int().min(1).max(9).optional(),
    block: z.number().int().min(1).max(9).optional(),
    // 제스처: 알아채기 어려운 정도 · AI 화면: 대화에서 쓰이는 시점
    discover: z.number().int().min(1).max(9).optional(),
    stage: z.number().int().min(1).max(9).optional(),
    // 화면 구성: 내용이 가려진 정도(다 보임 → 열어야 보임)
    hide: z.number().int().min(1).max(9).optional(),
    // 찾기와 거르기: 둘러보는 정도(아는 것을 바로 찾음 → 둘러보며 좁혀 감)
    browse: z.number().int().min(1).max(9).optional(),
    use_when: z.string(),
    avoid_when: z.string(),
    // 알림
    dismiss: z.string().optional(),
    actions: z.string().optional(),
    // 버튼: 한 화면(영역)에 몇 개까지
    per_view: z.string().optional(),
    // 입력: 알맞은 선택지 수나 답의 길이 · 내비게이션: 알맞은 목적지 수 · 로딩: 알맞은 시간 · 빈 상태: 언제 · 제스처: 대체 수단 · AI 화면: 언제
    fits: z.string().optional(),
    confused_with: z.string(),
    source: z.string().min(1),
    refs: z.array(z.string()).default([]),
    mock: z.string(),
  }),
});

// 다크 패턴: 피해야 할 화면. 속이는 화면(mock)과 정직한 화면(fix)을 나란히 둔다.
// bias에는 그 속임이 기대는 심리 편향(공식 slug)을 넣어 원리 페이지와 잇는다.
const darkpatterns = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/darkpatterns' }),
  schema: z.object({
    name: z.string(),
    en: z.string(),
    order: z.number(),
    trick: z.string(),
    honest: z.string(),
    bias: z.array(z.string()).default([]),
    source: z.string().min(1),
    refs: z.array(z.string()).default([]),
    mock: z.string(),
    fix: z.string(),
  }),
});

// 서체: 내가 쓰는 · 눈여겨본 서체. used_in에 양식 이름(templates의 id)과 역할을 적는다.
// 견본은 load(google: Google Fonts 패밀리 / css: 서체를 내려받는 CSS 주소)로 서체 페이지에서만 불러온다.
export const fontKinds = ['산세리프', '세리프', '디스플레이', '모노'] as const;

const fonts = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/fonts' }),
  schema: z.object({
    name: z.string(),
    family: z.string(),
    order: z.number(),
    kind: z.enum(fontKinds),
    script: z.enum(['한글 · 라틴', '라틴']),
    maker: z.string(),
    license: z.string(),
    weights: z.string(),
    status: z.enum(['쓰는 중', '눈여겨봄']),
    used_in: z.array(z.object({ template: z.string(), role: z.string() })).default([]),
    traits: z.string(),
    url: z.url(),
    load: z.object({ google: z.string().optional(), css: z.url().optional() }),
  }),
});

// 출처 기록(구 기록장): 자료를 본 곳 · 메모. 파일 하나가 기록 하나. 내비게이션에는 없고 항목 아래 "본 곳"으로 이어진다.
// about에 "formulas/<id>", "patterns/<카테고리>/<id>", "darkpatterns/<id>", "references/<id>", "fonts/<id>"를 넣으면
// 그 항목 아래에 이 기록이 붙는다. 없는 항목을 적으면 빌드가 멈춘다(src/lib/items.ts).
export const noteKinds = ['본 것', '메모', '써 본 예시'] as const;

const notes = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/notes' }),
  schema: z.object({
    date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    kind: z.enum(noteKinds),
    title: z.string(),
    about: z.array(z.string()).default([]),
    // 어디서 봤나 (계정, 책, 사이트). 링크가 있으면 link에
    seen_at: z.string().optional(),
    link: z.url().optional(),
  }),
});

export const refGroups = ['책', '공개 디자인 시스템', 'GitHub 저장소', '색 체계', '커뮤니티 · 글 · 디자이너'] as const;

const references = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/references' }),
  schema: z.object({
    title: z.string(),
    author: z.string(),
    group: z.enum(refGroups),
    order: z.number(),
    summary: z.string(),
    url: z.url().optional(),
    // 사이트가 다른 페이지 안에서 실제로 열릴 때만 true. 헤더(X-Frame-Options, frame-ancestors)가 허용해도
    // 스크립트로 막는 곳이 있어(Material 3) iframe 화면을 직접 확인하고 켠다.
    embed: z.boolean().default(false),
    // 자유 라이선스 저장소: scripts/sync-refs.mjs가 README를 src/imported/에 스냅숏으로 가져온다
    github: z.string().regex(/^[\w.-]+\/[\w.-]+$/).optional(),
  }),
});

// 직접 만든 디자인 시스템과 페이지 양식 (PLAN §6 페이지 양식)
export const templateKinds = ['디자인 시스템', '페이지 양식'] as const;

const templates = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/templates' }),
  schema: z.object({
    name: z.string(),
    order: z.number(),
    kind: z.enum(templateKinds),
    concept: z.string(),
    used_in: z.array(z.string()).default([]),

    // ── 디자인 시스템 ──
    // 토큰의 원본: DESIGN/<design>/DESIGN.md, 또는 tokens_from에 적은 CSS 파일
    design: z.string().optional(),
    tokens_from: z.string().optional(),
    // 미리보기로 띄울 페이지 (사이트 기준 경로). 없으면 DESIGN/<design>/preview.html
    preview: z.string().optional(),
    signatures: z.array(z.string()).default([]),
    avoid: z.array(z.string()).default([]),
    // 목록에 보여 줄 대표 색 토큰 이름
    swatch: z.array(z.string()).default([]),
    // 페이지 양식 미리보기에 입힐 역할 → 토큰 이름(--로 시작) 또는 그대로 쓸 값
    roles: z.record(z.string(), z.string()).optional(),

    // ── 페이지 양식 ──
    // 화면 위에서 아래로 놓이는 구성
    parts: z.array(z.object({ name: z.string(), note: z.string().optional(), optional: z.boolean().default(false) })).default([]),
    // 규칙마다 출처 필수
    rules: z.array(z.object({ text: z.string(), source: z.string().min(1) })).default([]),
    // 미리보기에서 고를 수 있는 상태 (?state=<key>). 첫 번째가 기본
    states: z.array(z.object({ key: z.string(), label: z.string() })).default([]),
    // 미리보기 아래 한 줄 안내
    preview_note: z.string().optional(),
    // 이 양식과 이어지는 사이트 안 페이지 (사이트 기준 경로)
    see: z.array(z.object({ label: z.string(), path: z.string() })).default([]),
  }),
});

// ── 색 (PLAN §7) ──
// 견본: 값 전체를 싣는 건 자유 라이선스 팔레트만. 팬톤 같은 독점 체계는 references에 색값 없이 둔다.
const hex6 = z.string().regex(/^#[0-9A-Fa-f]{6}$/, 'HEX는 #RRGGBB');
const palettes = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/palettes' }),
  schema: z.object({
    name: z.string(),
    order: z.number(),
    maker: z.string(),
    license: z.string().min(1),
    // 라이선스 원문을 확인한 주소
    license_url: z.url(),
    // 값을 가져온 파일(버전이 드러나는 주소)
    data_url: z.url(),
    url: z.url(),
    source: z.string().min(1),
    summary: z.string(),
    // 모두 싣지 않았다면 무엇을 뺐는지
    partial: z.string().optional(),
    scales: z.array(z.object({ name: z.string(), steps: z.array(z.object({ name: z.string(), hex: hex6 })) })),
    refs: z.array(z.string()).default([]),
  }),
});

// 조합: 같이 쓰기 좋은 색 묶음. role은 디자인 파일 만들기의 색 키로 옮겨진다(src/lib/combos.ts).
// 값은 hex로 적거나(from에 팔레트 · 단계), template의 토큰 이름(token)으로 적는다 — 토큰이면 빌드 때 DESIGN.md에서 읽는다.
export const comboRoles = ['bg', 'surface', 'ink', 'key', 'accent', 'danger', 'success'] as const;
export const comboBasis = ['자유 라이선스 팔레트', 'Regula 양식'] as const;
// /colors/와 디자인 파일 만들기에서 조합을 묶는 결(느낌). 양식 조합은 따로 묶으므로 비워 둔다
export const comboGroups = ['뉴트럴과 포인트 하나', '따뜻한 바탕', '옅은 색 바탕', '다크 우선', '선명한 두 색'] as const;
const comboColor = z.object({
  role: z.enum(comboRoles),
  name: z.string().optional(),
  hex: hex6.optional(),
  token: z.string().regex(/^--[\w-]+$/).optional(),
  from: z.string().optional(),
}).refine((c) => !!c.hex !== !!c.token, 'hex와 token 중 하나만');
const combos = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/combos' }),
  schema: z.object({
    name: z.string(),
    order: z.number(),
    basis: z.enum(comboBasis),
    group: z.enum(comboGroups).optional(),
    // 배색 근거가 된 공식 slug (complementary · analogous · split-complementary · triadic · 60-30-10 …)
    principles: z.array(z.string()).default([]),
    // 값의 출처(팔레트 · 양식). 고른 일 자체는 Regula가 했다는 것을 note가 아니라 화면이 따로 밝힌다
    source: z.string().min(1),
    palette: z.string().optional(),
    template: z.string().optional(),
    mood: z.array(z.string()).default([]),
    use: z.array(z.string()).default([]),
    note: z.string().optional(),
    light: z.array(comboColor).min(3).max(8),
    // 없으면 라이트만. template 조합은 토큰의 다크 값을 쓰므로 비워 둔다
    dark: z.array(comboColor).optional(),
    refs: z.array(z.string()).default([]),
  }).refine((c) => c.light.some((x) => x.role === 'bg') && c.light.some((x) => x.role === 'ink'), '조합에는 bg와 ink가 있어야 함'),
});

export const collections = { formulas, patterns, darkpatterns, references, templates, notes, fonts, palettes, combos };
