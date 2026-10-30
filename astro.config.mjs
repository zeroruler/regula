import { defineConfig } from 'astro/config';

// GitHub Pages(프로젝트 페이지)는 /<저장소 이름>/ 아래에서 열리므로 배포 때 BASE로 넘긴다.
export default defineConfig({
  site: process.env.SITE,
  base: process.env.BASE ?? '/',
  trailingSlash: 'always',
});
