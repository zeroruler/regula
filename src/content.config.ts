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
    topic: z.enum(['비율과 간격', '타이포그래피', '색', '게슈탈트', '그리드', '사용성', '좋은 디자인']),
    equation: z.string(),
    meaning: z.string(),
    source: z.string().min(1),
    refs: z.array(z.string()).default([]),
    note: z.string().optional(),
    demo: z.boolean().default(false),
  }),
});

const patterns = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/patterns' }),
  schema: z.object({
    name: z.string(),
    en: z.string(),
    category: z.string(),
    intrusiveness: z.number().int().min(1).max(9),
    use_when: z.string(),
    avoid_when: z.string(),
    dismiss: z.string(),
    actions: z.string(),
    confused_with: z.string(),
    source: z.string().min(1),
    refs: z.array(z.string()).default([]),
    mock: z.string(),
  }),
});

export const refGroups = ['책', '공개 디자인 시스템', 'GitHub 저장소', '커뮤니티 · 글 · 디자이너'] as const;

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

// 직접 만든 디자인 시스템과 페이지 양식 (PLAN §4 페이지 양식)
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
  }),
});

export const collections = { formulas, patterns, references, templates };
