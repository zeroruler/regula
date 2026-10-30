import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// 필드는 PLAN.md §4 콘텐츠 작성 규칙을 그대로 따른다. source는 필수 — 출처 없는 규칙은 빌드가 막는다.
const formulas = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/formulas' }),
  schema: z.object({
    name: z.string(),
    order: z.number(),
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

export const collections = { formulas, patterns, references };
