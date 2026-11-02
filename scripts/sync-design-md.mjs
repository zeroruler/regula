// VoltAgent/awesome-design-md(MIT)의 사이트별 DESIGN.md를 src/imported/design-md/에 스냅숏으로 가져온다.
// 빌드는 네트워크 없이 이 스냅숏만 읽는다. 라이선스가 MIT가 아니게 바뀌면 가져오지 않고 멈춘다.
import { execFileSync } from 'node:child_process';
import { cpSync, existsSync, mkdtempSync, readdirSync, readFileSync, rmSync, writeFileSync, mkdirSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const REPO = 'VoltAgent/awesome-design-md';
const out = new URL('../src/imported/design-md/', import.meta.url);
const dir = mkdtempSync(join(tmpdir(), 'design-md-'));

try {
  execFileSync('git', ['clone', '--depth', '1', '--quiet', `https://github.com/${REPO}.git`, dir], { stdio: 'inherit' });
  const license = readFileSync(join(dir, 'LICENSE'), 'utf8');
  if (!/^MIT License/.test(license)) throw new Error(`${REPO}: 라이선스가 MIT가 아님 — 가져오지 않음`);
  const commit = execFileSync('git', ['-C', dir, 'rev-parse', 'HEAD'], { encoding: 'utf8' }).trim();
  const committedAt = execFileSync('git', ['-C', dir, 'log', '-1', '--format=%cs'], { encoding: 'utf8' }).trim();

  // README의 "### 분류" 아래 "- [**이름**](https://getdesign.md/<slug>/design-md) - 설명"에서 이름 · 분류 · 설명을 읽는다
  const readme = readFileSync(join(dir, 'README.md'), 'utf8');
  const listed = new Map();
  let category = '';
  for (const line of readme.split('\n')) {
    const h = line.match(/^###\s+(.+)/);
    if (h) { category = h[1].trim(); continue; }
    const m = line.match(/^- \[\*\*(.+?)\*\*\]\(https:\/\/getdesign\.md\/([^/]+)\/design-md\)\s*-\s*(.+)$/);
    if (m) listed.set(m[2], { name: m[1], category, blurb: m[3].trim() });
  }

  const src = join(dir, 'design-md');
  const slugs = readdirSync(src, { withFileTypes: true }).filter((d) => d.isDirectory() && existsSync(join(src, d.name, 'DESIGN.md'))).map((d) => d.name).sort();
  rmSync(out, { recursive: true, force: true });
  mkdirSync(out, { recursive: true });
  for (const s of slugs) cpSync(join(src, s, 'DESIGN.md'), new URL(`${s}.md`, out));
  writeFileSync(new URL('LICENSE', out), license);
  const entries = slugs.map((slug) => ({ slug, ...(listed.get(slug) ?? { name: slug, category: '', blurb: '' }) }));
  writeFileSync(
    new URL('index.json', out),
    JSON.stringify({ repo: REPO, license: 'MIT', commit, committedAt, fetchedAt: new Date().toISOString().slice(0, 10), entries }, null, 1) + '\n',
  );
  console.log(`가져옴 ${REPO}@${commit.slice(0, 7)} — DESIGN.md ${slugs.length}개 → src/imported/design-md/`);
} finally {
  rmSync(dir, { recursive: true, force: true });
}
