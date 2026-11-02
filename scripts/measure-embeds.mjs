// `embed: true`인 레퍼런스 사이트를 헤드리스 브라우저로 열어, 폭별로 페이지 전체 높이를 잰다.
// 결과(src/imported/measured/embed-heights.json)로 레퍼런스 페이지의 iframe을 사이트 길이만큼 펼친다.
// 사이트 내용은 저장하지 않는다. 높이 숫자만 남기고, 화면은 늘 원본 사이트에서 직접 불러온다.
//
// 펼칠 수 없는 사이트는 fit: false로 남겨 예전처럼 상자 안에서 스크롤한다(일부 폭에서만 안 되면 그 폭만 null).
// - vh: 높이를 화면 높이(100vh)에 맞추는 요소가 있어, 창을 키우면 페이지도 따라 길어지는 경우
// - inner: 문서 자체는 스크롤되지 않고 안쪽 영역만 스크롤되는 경우(앱 형태 페이지)
import { readdirSync, readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { createRequire } from 'node:module';
import { execSync } from 'node:child_process';

const require = createRequire(import.meta.url);
let playwright;
try {
  playwright = require('playwright');
} catch {
  // 프로젝트 의존성에 넣지 않고, 미리 깔린(전역) Playwright를 쓴다
  const globalRoot = execSync('npm root -g').toString().trim();
  playwright = createRequire(`${globalRoot}/`)('playwright');
}

// 반응형 사이트는 폭 구간(브레이크포인트)마다 높이가 크게 뛰므로 촘촘히 잰다. 레퍼런스 iframe 폭이 될 수 있는 범위.
const WIDTHS = Array.from({ length: 17 }, (_, i) => 320 + i * 40); // 320 … 960 (본문 칸이 가장 넓을 때 약 900px)
const START_H = 900;
const MAX_H = 40000;
const dir = new URL('../src/content/references/', import.meta.url);
const outDir = new URL('../src/imported/measured/', import.meta.url);

const targets = readdirSync(dir)
  .filter((f) => f.endsWith('.md'))
  .map((f) => ({ slug: f.replace(/\.md$/, ''), src: readFileSync(new URL(f, dir), 'utf8') }))
  .filter((r) => /^embed:\s*true\s*$/m.test(r.src))
  .map((r) => ({ slug: r.slug, url: r.src.match(/^url:\s*"?([^"\n]+)"?/m)?.[1] }))
  .filter((r) => r.url);

const browser = await playwright.chromium.launch();
const sites = {};

// 레퍼런스 페이지와 같은 조건(sandbox · referrerpolicy)의 iframe 안에서 잰다. 최상위 창으로 열 때와
// iframe 안에서 열 때 사이트가 조금 다르게 그려져(쿠키 배너, 저장소 차단 등) 높이가 100px 넘게 차이 난 적이 있다.
const SANDBOX = 'allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox allow-forms';
const docHeight = (frame) =>
  frame.evaluate(() => Math.max(document.documentElement.scrollHeight, document.body?.scrollHeight ?? 0));

// 한 번 연 페이지에서 창 폭만 바꿔 가며 잰다. 폭마다 높이 900에서 시작해, 창을 페이지 높이만큼 키운 뒤
// 다시 재는 일을 높이가 멈출 때까지 한다(늦게 불러오는 이미지가 늘리는 높이도 여기서 잡힌다).
// 멈추지 않으면 그 폭은 null(펼치지 않음).
async function measureSite(url) {
  const ctx = await browser.newContext({ viewport: { width: 1200, height: START_H } });
  const page = await ctx.newPage();
  let frame;
  const size = (width, height) =>
    page.evaluate(([w, h]) => Object.assign(document.querySelector('iframe').style, { width: `${w}px`, height: `${h}px` }), [width, height]);
  const at = async (width) => {
    await size(width, START_H);
    await page.waitForTimeout(800);
    let h = await docHeight(frame);
    if (h <= START_H + 4) return 'inner';
    for (let i = 0; i < 6; i++) {
      await size(width, Math.min(h, MAX_H));
      await page.waitForTimeout(900);
      const next = await docHeight(frame);
      if (next > MAX_H || next > h * 1.5) return 'vh';
      if (Math.abs(next - h) <= 4) return next;
      h = next;
    }
    return 'vh';
  };
  try {
    await page.setContent(
      `<!doctype html><body style="margin:0"><iframe src="${url}" referrerpolicy="no-referrer" sandbox="${SANDBOX}"
        style="display:block;border:0;width:${WIDTHS[0]}px;height:${START_H}px"></iframe></body>`,
    );
    await page.waitForLoadState('networkidle', { timeout: 45000 }).catch(() => {});
    await page.waitForTimeout(1500);
    frame = page.frames().find((f) => f !== page.mainFrame());
    const heights = [];
    for (const width of WIDTHS) heights.push([width, await at(width)]);

    // 이웃한 두 폭의 높이가 크게 다르면(브레이크포인트) 그 사이를 반씩 좁혀 1px 앞뒤까지 찾아 둘 다 남긴다.
    // 페이지는 두 값 중 큰 쪽을 쓰므로, 이렇게 해 두면 빈칸이 남는 구간이 1px로 줄어든다.
    const extra = [];
    for (let i = 1; i < heights.length; i++) {
      let [lo, hLo] = heights[i - 1];
      let [hi, hHi] = heights[i];
      if (typeof hLo !== 'number' || typeof hHi !== 'number') continue;
      if (Math.abs(hHi - hLo) < 0.25 * Math.max(hLo, hHi)) continue;
      const loSide = hLo;
      while (hi - lo > 1) {
        const mid = Math.round((lo + hi) / 2);
        const h = await at(mid);
        if (typeof h !== 'number') break;
        if (Math.abs(h - loSide) < Math.abs(h - hHi)) [lo, hLo] = [mid, h];
        else [hi, hHi] = [mid, h];
      }
      extra.push([lo, hLo], [hi, hHi]);
    }
    const seen = new Set();
    return [...heights, ...extra]
      .sort((a, b) => a[0] - b[0])
      .filter(([w]) => !seen.has(w) && seen.add(w));
  } finally {
    await ctx.close();
  }
}

for (const { slug, url } of targets) {
  const raw = await measureSite(url); // [폭, 높이 | 'vh' | 'inner']
  const heights = raw.map(([w, h]) => [w, typeof h === 'number' ? h : null]);
  const ok = heights.filter(([, h]) => h !== null).length;
  sites[slug] = ok
    ? { url, fit: true, heights }
    : { url, fit: false, reason: raw.every(([, h]) => h === 'inner') ? 'inner' : 'vh' };
  console.log(`${slug}: ${ok ? `${ok}/${heights.length}개 폭에서 펼침 — ` + heights.map(([w, h]) => `${w}→${h ?? '×'}`).join(' ') : `펼치지 않음(${sites[slug].reason})`}`);
}
await browser.close();

mkdirSync(outDir, { recursive: true });
writeFileSync(
  new URL('embed-heights.json', outDir),
  JSON.stringify({ measuredAt: new Date().toISOString().slice(0, 10), sites }, null, 1) + '\n',
);
console.log('→ src/imported/measured/embed-heights.json');
