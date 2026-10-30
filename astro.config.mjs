import { defineConfig } from 'astro/config';
import { cpSync, existsSync, readdirSync, rmSync } from 'node:fs';

// DESIGN/<이름>/의 preview.html·DESIGN.html을 public/design/<이름>/으로 복사해 사이트에서 연다.
// 원본은 DESIGN/ 한 곳에만 두고, public/design/은 매번 새로 만든다(.gitignore).
const designFiles = {
  name: 'regula-design-files',
  hooks: {
    'astro:config:setup': () => {
      const out = 'public/design';
      rmSync(out, { recursive: true, force: true });
      for (const name of readdirSync('DESIGN', { withFileTypes: true })) {
        if (!name.isDirectory() || name.name.startsWith('.')) continue;
        for (const file of ['preview.html', 'DESIGN.html', 'DESIGN.md']) {
          const src = `DESIGN/${name.name}/${file}`;
          if (existsSync(src)) cpSync(src, `${out}/${name.name}/${file}`);
        }
      }
    },
  },
};

// GitHub Pages(프로젝트 페이지)는 /<저장소 이름>/ 아래에서 열리므로 배포 때 BASE로 넘긴다.
export default defineConfig({
  site: process.env.SITE,
  base: process.env.BASE ?? '/',
  trailingSlash: 'always',
  integrations: [designFiles],
});
