// 토큰 → 내려받는 파일(DESIGN.md · tokens.json · preview.html · DESIGN.html)과 AI에 붙여 넣을 프롬프트.
// 미리보기 화면과 preview.html은 같은 componentCss() · sampleHtml()을 쓴다.
import { darkOverrides, showRatio, type Check, type Tokens } from './derive.ts';
import { EASES, PRESETS, presetEdited, slugify, type FontOption, type Spec } from './spec.ts';

export const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const presetName = (s: Spec) => PRESETS.find((p) => p.id === s.preset)?.name ?? '직접 조절';
const radiusLabel = (n: number) => (n >= 999 ? 'pill' : `${n}px`);
const SHADOW_NAME = { none: '없음', soft: '흐린 그림자', hard: '흐림 없는 어긋난 그림자', dual: '밝고 어두운 그림자 한 쌍' } as const;
const TEXTURE_NAME = { none: '없음', gloss: '광택', inset: '안쪽 그림자', edge: '가장자리 빛' } as const;
const glassOn = (s: Spec) => s.effect.alpha < 100 || s.effect.blur > 0;

// ── CSS 블록 ────────────────────────────────────────────
type Vars = [string, string, string?][];
function cssBlock(selector: string, groups: { title: string; note: string; vars: Vars }[]): string {
  const width = Math.max(...groups.flatMap((g) => g.vars.map(([k]) => k.length))) + 2;
  const out = [`${selector} {`];
  groups.forEach((g, i) => {
    if (i) out.push('');
    out.push(`  /* ${g.title} — ${g.note} */`);
    for (const [k, v, note] of g.vars) out.push(`  ${(k + ':').padEnd(width)} ${v};${note ? `  /* ${note} */` : ''}`);
  });
  out.push('}');
  return out.join('\n');
}
export function tokensCss(t: Tokens, s: Spec): string {
  const light = cssBlock(':root', [...t.modes[0].groups, ...t.common]);
  if (!s.color.darkOn) return light;
  const dark = darkOverrides(t);
  const body = dark.map(([k, v]) => `  ${(k + ':').padEnd(22)} ${v};`).join('\n');
  return `${light}\n\n/* Dark mode — 값이 달라지는 토큰만. 나머지는 위와 같다 */\n[data-theme="dark"] {\n${body}\n}`;
}

// ── 컴포넌트 CSS ─ 미리보기와 내려받는 파일이 공유한다
export function componentCss(t: Tokens): string {
  const near = (px: number) => { const v = t.space.scale.find((x) => x >= px) ?? t.space.scale[t.space.scale.length - 1]; return `var(${t.space.name(v)})`; };
  return `.ds-root { background: var(--bg); color: var(--ink); font-family: var(--font-sans); font-size: var(--text-body); font-weight: var(--weight-regular); line-height: var(--line-body); }
.ds-root *, .ds-root *::before, .ds-root *::after { box-sizing: border-box; }
.ds-h { font-family: var(--font-display); font-weight: var(--weight-heading); line-height: var(--line-heading); letter-spacing: var(--tracking-heading); margin: 0; color: var(--ink); overflow-wrap: anywhere; }
.ds-display { font-size: var(--text-display); } .ds-h1 { font-size: var(--text-h1); } .ds-h2 { font-size: var(--text-h2); } .ds-h3 { font-size: var(--text-h3); }
.ds-large { font-size: var(--text-large); } .ds-small { font-size: var(--text-small); color: var(--ink-secondary); }
.ds-num { font-family: var(--font-mono); font-variant-numeric: tabular-nums; }
.ds-root p { margin: 0; }

.ds-btn { display: inline-flex; align-items: center; justify-content: center; gap: ${near(8)}; min-height: var(--control-height); padding: 0 var(--control-pad-x); font: inherit; font-family: var(--font-sans); font-size: var(--text-body); font-weight: var(--weight-strong); line-height: 1; border: var(--border-width) solid transparent; border-radius: var(--radius-button); cursor: pointer; transition: background-color var(--dur-fast) var(--ease), border-color var(--dur-fast) var(--ease), transform var(--dur-fast) var(--ease); }
.ds-btn:focus-visible, .ds-input:focus-visible { outline: var(--focus-ring); outline-offset: 2px; }
.ds-btn:active { transform: translateY(1px); }
.ds-btn--primary { background-color: var(--key); background-image: var(--sheen); color: var(--key-on); border-color: var(--key-active); box-shadow: var(--shadow-button); }
.ds-btn--primary:hover { background-color: var(--key-hover); }
.ds-btn--primary:active { background-color: var(--key-active); }
.ds-btn--secondary { background: var(--surface); color: var(--ink); border: var(--input-border-width) solid var(--border-strong); box-shadow: var(--shadow-button); }
.ds-btn--secondary:hover { background: var(--key-soft); }
.ds-btn--ghost { background: transparent; color: var(--ink-secondary); }
.ds-btn--ghost:hover { background: var(--key-soft); color: var(--ink); }
.ds-btn--danger { background: var(--surface); color: var(--danger); border: var(--input-border-width) solid var(--danger); }
.ds-btn--danger:hover { background: var(--danger-soft); }
.ds-btn:disabled { opacity: 0.5; cursor: not-allowed; box-shadow: none; transform: none; }

.ds-field { display: grid; gap: ${near(4)}; }
.ds-label { font-size: var(--text-small); font-weight: var(--weight-strong); color: var(--ink); }
.ds-input { width: 100%; min-height: var(--control-height); padding: 0 var(--control-pad-x); font: inherit; font-size: var(--text-body); color: var(--ink); background: var(--surface); border: var(--input-border-width) solid var(--border-strong); border-radius: var(--radius-input); transition: border-color var(--dur-fast) var(--ease); }
.ds-input::placeholder { color: var(--ink-secondary); opacity: 1; }
.ds-input:focus { border-color: var(--key); }
.ds-input[aria-invalid="true"] { border-color: var(--danger); }
.ds-error { font-size: var(--text-small); color: var(--danger); }

.ds-card, .ds-toast, .ds-list { background-color: var(--material-bg); -webkit-backdrop-filter: var(--material-blur); backdrop-filter: var(--material-blur); border: var(--border-width) solid var(--border); border-radius: var(--radius-card); }
.ds-card { background-image: var(--sheen); box-shadow: var(--shadow-card); padding: var(--card-pad); display: grid; gap: var(--gap); }
.ds-toast { box-shadow: var(--shadow-overlay); padding: ${near(16)} var(--card-pad); display: flex; align-items: center; justify-content: space-between; gap: var(--gap); }
.ds-list { list-style: none; margin: 0; padding: 0; overflow: hidden; box-shadow: var(--shadow-card); }
.ds-list li { display: flex; justify-content: space-between; gap: var(--gap); padding: ${near(12)} var(--card-pad); border-top: 1px solid var(--border); }
.ds-list li:first-child { border-top: 0; }

.ds-alert { display: grid; gap: ${near(4)}; padding: ${near(16)} var(--card-pad); color: var(--ink); border: var(--border-width) solid var(--border); border-left: 4px solid var(--tone); border-radius: var(--radius-input); background: var(--tone-soft); }
.ds-alert b { font-weight: var(--weight-strong); }
.ds-alert--info { --tone: var(--key); --tone-soft: var(--key-soft); }
.ds-alert--success { --tone: var(--success); --tone-soft: var(--success-soft); }
.ds-alert--danger { --tone: var(--danger); --tone-soft: var(--danger-soft); }

.ds-pop { transition: opacity var(--dur-base) var(--ease), transform var(--dur-base) var(--ease); }
.ds-track { position: relative; height: 20px; border-radius: var(--radius-full); background: var(--border); }
.ds-dot { position: absolute; left: 0; top: 0; width: 20px; height: 20px; border-radius: var(--radius-full); background: var(--key); transition: left var(--dur-slow) var(--ease); }
.ds-track.is-go .ds-dot { left: calc(100% - 20px); }

@media (prefers-reduced-motion: reduce) { .ds-root *, .ds-root *::before, .ds-root *::after { transition: none !important; animation: none !important; } }
@media (prefers-reduced-transparency: reduce), (prefers-contrast: more) { .ds-card, .ds-toast, .ds-list { background-color: var(--surface); -webkit-backdrop-filter: none; backdrop-filter: none; } }`;
}

// ── 대표 컴포넌트 견본 ─ 버튼 · 입력 · 카드 · 알림 · 목록 · 그림자 · 간격 · 움직임
export function sampleHtml(t: Tokens, s: Spec): string {
  const name = esc(s.name);
  const stack = (css: string) => `style="${css}"`;
  const clamp = (v: string) => `min(var(${v}), 13vw)`;
  return `<div class="ds-stage" data-glass="${glassOn(s)}">
  <span class="ds-blob ds-blob--a" aria-hidden="true"></span><span class="ds-blob ds-blob--b" aria-hidden="true"></span>
  <div class="ds-col">
    <div class="ds-card">
      <p class="ds-small ds-num">${name} · 미리보기</p>
      <h1 class="ds-h ds-display" ${stack(`font-size:${clamp('--text-display')}`)}>가나다 Aa</h1>
      <h2 class="ds-h ds-h3">제목은 display 서체</h2>
      <p>본문은 sans 서체입니다. 같은 설정으로 만든 모든 화면이 이 글자 크기와 행간을 따릅니다.</p>
      <p class="ds-small">보조 설명 · <span class="ds-num">1,234.56</span> 숫자는 고정폭</p>
    </div>
    <div class="ds-card" role="group" aria-label="버튼">
      <h2 class="ds-h ds-h3">버튼</h2>
      <div class="ds-row">
        <button class="ds-btn ds-btn--primary" type="button">저장</button>
        <button class="ds-btn ds-btn--secondary" type="button">취소</button>
        <button class="ds-btn ds-btn--ghost" type="button">더 보기</button>
        <button class="ds-btn ds-btn--danger" type="button">삭제</button>
        <button class="ds-btn ds-btn--primary" type="button" disabled>저장 중</button>
      </div>
    </div>
    <div class="ds-card" role="group" aria-label="입력">
      <h2 class="ds-h ds-h3">입력</h2>
      <div class="ds-field"><label class="ds-label" for="ds-email">이메일</label><input class="ds-input" id="ds-email" type="email" placeholder="name@example.com"></div>
      <div class="ds-field"><label class="ds-label" for="ds-pw">비밀번호</label><input class="ds-input" id="ds-pw" type="password" value="123" aria-invalid="true" aria-describedby="ds-pw-err"><span class="ds-error" id="ds-pw-err">오류: 8자 이상이어야 합니다</span></div>
    </div>
    <div class="ds-col ds-col--tight" role="group" aria-label="알림">
      <div class="ds-alert ds-alert--info"><b>안내</b><span>새 버전이 있습니다.</span></div>
      <div class="ds-alert ds-alert--success"><b>완료</b><span>변경 사항을 저장했습니다.</span></div>
      <div class="ds-alert ds-alert--danger"><b>오류</b><span>연결이 끊겼습니다. 다시 시도해 주세요.</span></div>
    </div>
    <ul class="ds-list" aria-label="목록">
      <li><span>월간 방문</span><span class="ds-num">12,408</span></li>
      <li><span>가입</span><span class="ds-num">318</span></li>
      <li><span>전환율</span><span class="ds-num">2.56%</span></li>
    </ul>
    <div class="ds-toast"><span>메시지를 보냈습니다</span><button class="ds-btn ds-btn--ghost" type="button">실행 취소</button></div>
    <div class="ds-card" role="group" aria-label="그림자 · 간격 · 움직임">
      <h2 class="ds-h ds-h3">그림자 · 간격 · 움직임</h2>
      <div class="ds-row">${[1, 2, 3, 4].map((n) => `<span class="ds-sh" style="box-shadow:var(--shadow-${n})"><span class="ds-num ds-small">${n}</span></span>`).join('')}</div>
      <div class="ds-spaces">${t.space.scale.map((v, i) => `<span style="width:var(--space-${i + 1})" title="--space-${i + 1} ${v}px"></span>`).join('')}</div>
      <div class="ds-track" id="ds-track" aria-hidden="true"><span class="ds-dot"></span></div>
      <div class="ds-row"><button class="ds-btn ds-btn--secondary" type="button" id="ds-play">움직임 재생</button><span class="ds-small ds-num">${s.motion.slow}ms · ${EASES.find((e) => e.id === s.motion.ease)?.css ?? ''}</span></div>
    </div>
  </div>
</div>`;
}
// 견본 배치용 CSS(토큰이 아니라 견본 자체의 틀). 사이트 미리보기와 preview.html이 공유한다.
export const SAMPLE_CSS = `.ds-stage { position: relative; overflow: hidden; padding: var(--card-pad); }
.ds-col { position: relative; display: grid; gap: var(--gap); max-width: 640px; margin: 0 auto; min-width: 0; }
.ds-col--tight { gap: calc(var(--gap) / 2); }
.ds-row { display: flex; flex-wrap: wrap; gap: var(--gap); align-items: center; }
.ds-blob { position: absolute; border-radius: 9999px; opacity: 0; pointer-events: none; }
.ds-blob--a { width: 180px; height: 180px; left: -30px; top: 40px; background: var(--key); }
.ds-blob--b { width: 140px; height: 140px; right: -20px; top: 420px; background: var(--ink-secondary); }
.ds-stage[data-glass="true"] .ds-blob { opacity: 0.85; }
.ds-sh { display: grid; place-items: center; width: 56px; height: 56px; background: var(--material-bg); border: var(--border-width) solid var(--border); border-radius: var(--radius-card); }
.ds-spaces { display: flex; flex-wrap: wrap; gap: 4px; align-items: flex-end; }
.ds-spaces span { display: block; height: 12px; background: var(--ink-secondary); border-radius: 2px; max-width: 100%; }`;

// ── 글꼴 불러오기 ───────────────────────────────────────
function fontLinks(t: Tokens): string[] {
  const urls = [...new Set(Object.values(t.type.picks).map((p) => p.url).filter(Boolean) as string[])];
  return urls;
}
function fontLoadMd(t: Tokens): string {
  const picks = Object.values(t.type.picks);
  const lines = picks.map((p) => `- ${p.role === 'display' ? '제목' : p.role === 'body' ? '본문' : '숫자'}: ${p.family ? `**${p.family}**` : '시스템 서체(불러올 파일 없음)'}${p.url ? ` — \`${p.url}\`` : ''}`);
  return [...lines, '- 위 서체 외에 서체를 추가하지 않는다. 불러온 굵기만 쓴다.'].join('\n');
}

// ── DESIGN.md ──────────────────────────────────────────
const mdTable = (head: string[], rows: string[][]) => [`| ${head.join(' | ')} |`, `|${head.map(() => '---').join('|')}|`, ...rows.map((r) => `| ${r.join(' | ')} |`)].join('\n');
const fmtChecks = (cs: Check[]) => mdTable(['조합', '글자/선', '배경', '대비', '기준', '결과'], cs.map((c) => [c.label, `\`${c.fgName}\` ${c.fg}`, `\`${c.bgName}\` ${c.bg}`, `${showRatio(c.ratio)}:1`, `${c.need}:1 (WCAG 2.2 ${c.sc})`, c.pass ? '통과' : '**미달**']));

export function autoIntent(t: Tokens, s: Spec): string {
  const p = t.type.picks;
  const fam = (x: { family?: string }) => x.family ?? '시스템 서체';
  const shadow = s.effect.shadow === 'none' ? '그림자 없음' : `그림자는 ${SHADOW_NAME[s.effect.shadow]} ${s.effect.depth}단계`;
  return `${presetName(s)} 재료를 바탕으로 만든 시스템입니다. 모서리는 버튼 ${radiusLabel(s.radius.button)} · 입력 ${radiusLabel(s.radius.input)} · 카드 ${radiusLabel(s.radius.card)}이고, ${shadow}, 테두리 ${s.effect.border}px입니다. 강조색 ${s.color.light.key} 하나로 눌러야 할 곳을 알리고, 제목은 ${fam(p.display)}, 본문은 ${fam(p.body)}, 숫자는 ${fam(p.mono)}로 씁니다.`;
}

export const norm = (s: Spec): Spec => ({ ...s, name: s.name.replace(/\s+/g, ' ').trim() || '새 디자인 시스템', intent: s.intent.replace(/\s+/g, ' ').trim() });

export function designMd(t: Tokens, s0: Spec, today: string): string {
  const s = norm(s0);
  const lightChecks = t.modes[0].checks;
  const darkChecks = t.modes[1].checks;
  const failing = lightChecks.filter((c) => !c.pass).length + (s.color.darkOn ? darkChecks.filter((c) => !c.pass).length : 0);
  const sp = t.space;
  const e = s.effect;
  const ease = EASES.find((x) => x.id === s.motion.ease)!;
  const shadowRows = t.modes[0].fx.ladder.map((v, i) => [`\`--shadow-${i + 1}\``, `\`${v}\``]);
  const typeRows = t.type.rows.map((r) => [r.label, `\`--font-${r.font === 'body' ? 'sans' : r.font}\``, `${r.size}px`, String(r.weight), String(r.line), r.track ? `${+(r.track * 1).toFixed(3)}em` : '0']);
  const glass = glassOn(s);

  const avoid = [
    '문서에 없는 색 · 크기 · 서체 · 그림자 · 모서리 값을 새로 만들거나 hex를 직접 적는다 — 가장 가까운 토큰을 쓴다',
    '강조색(`--key`)으로 채운 면을 한 화면에 여러 개 둔다 — 주 행동 하나에만, 나머지는 보조(secondary) · 고스트(ghost)로 내린다',
    '상태를 색만으로 구분한다 — 오류 · 완료 · 안내는 글자("오류", "완료", "안내")를 같이 쓴다 (WCAG 2.2 1.4.1)',
    '`outline: none`으로 포커스 표시를 지우고 대체하지 않는다 — `--focus-ring`을 쓴다',
    '글자 크기를 `--text-*` 밖의 값으로, 굵기를 `--weight-*` 밖의 값으로 쓴다',
    '`--key-on` 대신 다른 글자색을 강조색 면 위에 얹는다',
    `간격에 ${sp.unit}px 배수가 아닌 값을 쓴다 (예외: 컨트롤 높이 \`--control-height\`, 4px 이하의 선 · 띠)`,
    '움직임 줄이기 설정을 무시한다 — §7의 `prefers-reduced-motion` 규칙을 지운다',
    '저절로 5초 넘게 움직이는 것을 멈출 수단 없이 둔다 (WCAG 2.2 2.2.2)',
    ...(e.shadow === 'none' ? ['그림자를 새로 더한다 — 층 구분은 면 색과 테두리로 한다'] : []),
    ...(e.shadow === 'soft' ? ['흐린 그림자와 흐림 없는 어긋난 그림자를 한 화면에 섞는다', '그림자 색에 순흑을 직접 쓴다 — `--shadow-*` 토큰만 쓴다'] : []),
    ...(e.shadow === 'hard' ? ['흐린 그림자를 섞는다 — 이 시스템의 그림자는 흐림 없이 어긋난 것뿐이다'] : []),
    ...(e.shadow === 'dual' ? ['배경(`--bg`)과 표면(`--surface`)을 서로 다른 색으로 바꾼다 — 이 그림자는 같은 색 면 위에서만 입체로 보인다', '버튼 · 입력칸의 경계를 그림자만으로 만든다 — 입력칸 테두리는 최소 1px (경계 대비 3:1, WCAG 2.2 1.4.11)'] : []),
    ...(glass ? ['반투명 면(`--material-bg`) 위 본문 글자를 가장 나쁜 배경에서의 대비 확인 없이 둔다 (4.5:1, WCAG 2.2 1.4.3)', '투명도 줄이기 · 대비 높이기 설정을 켠 사람에게도 반투명 면을 그대로 보인다 — §11의 미디어 쿼리처럼 불투명한 면으로 바꾼다'] : []),
    ...(e.texture !== 'none' ? [`${TEXTURE_NAME[e.texture]} 질감을 버튼 · 카드 밖(본문 배경, 글자 뒤)에 깐다`] : []),
    ...(s.radius.button === 0 && s.radius.card === 0 ? ['모서리를 둥글게 만든다 — 이 시스템의 모서리는 0이다'] : []),
    ...(failing ? [`§8에서 **미달**로 표시된 조합을 그대로 쓴다 — 색을 고쳐 다시 계산하거나 그 조합을 쓰지 않는다`] : []),
  ];

  const colorRoles = mdTable(['토큰', '쓰는 곳'], [
    ['`--bg`', '페이지 배경'], ['`--surface`', '카드 · 입력칸 면'], ['`--ink`', '제목 · 본문'], ['`--ink-secondary`', '설명 · 보조 글자 · 플레이스홀더'],
    ['`--border`', '구분선 · 카드 테두리'], ['`--border-strong`', '입력칸 · 보조 버튼 테두리'],
    ['`--key` · `--key-hover` · `--key-active`', '주 버튼 · 링크 · 포커스 · 선택'], ['`--key-soft`', '선택 배경 · 안내 알림 배경'], ['`--key-on`', '`--key` 면 위의 글자'],
    ['`--danger` · `--danger-soft`', '오류 글자 · 위험 버튼 · 오류 알림'], ['`--success` · `--success-soft`', '성공 글자 · 성공 알림'],
  ]);

  return `# DESIGN.md — ${s.name} 디자인 시스템

${s.intent || autoIntent(t, s)}

**만든 곳**: Regula 「디자인 파일 만들기」 · ${today} · 스타일 시작점: ${presetName(s)}${presetEdited(s) && s.preset !== 'custom' ? '(값을 고침)' : ''}
**AI 에이전트에게**: 이 문서의 §1 토큰(CSS 변수)과 규칙만으로 화면을 만든다. 문서에 없는 값을 새로 만들지 않는다. 판단이 애매하면 §9 빠른 결정 규칙 → §10 하지 말 것 순으로 본다. 같은 값이 \`tokens.json\`에도 있고, \`preview.html\`에서 컴포넌트가 이 값으로 그려진 모습을 볼 수 있다.

**세 가지 시그니처** — 이 시스템을 다른 시스템과 가르는 것:
1. **모서리** — 버튼 ${radiusLabel(s.radius.button)} · 입력 ${radiusLabel(s.radius.input)} · 카드 ${radiusLabel(s.radius.card)}
2. **재료** — 그림자 ${SHADOW_NAME[e.shadow]}${e.shadow === 'none' ? '' : ` ${e.depth}단계`} · 테두리 ${e.border}px · 면 투명도 ${e.alpha}% · 배경 흐림 ${e.blur}px · 질감 ${TEXTURE_NAME[e.texture]}
3. **서체** — 제목 ${t.type.picks.display.family ?? '시스템 서체'} · 본문 ${t.type.picks.body.family ?? '시스템 서체'} · 숫자 ${t.type.picks.mono.family ?? '시스템 서체'} · 기본 ${s.type.base}px, 비율 ${s.type.ratio}

값에 출처가 있는 기준(WCAG 등)은 그 자리에 출처를 적었다. 색 섞기 비율, 그림자 단계 값, 간격 밀도 같은 나머지 값은 이 도구가 설정에서 계산한 것이며 출처가 있는 기준이 아니다.

---

## 1. Design Tokens (모든 값의 원본 — 여기 외에 값을 정의하지 않는다)

\`\`\`css
${tokensCss(t, s)}
\`\`\`

**서체 불러오기**:
${fontLoadMd(t)}

---

## 2. Color Rules (색 사용 규칙)

${colorRoles}

1. **강조색 면은 한 화면에 하나.** \`--key\`로 채운 요소(주 버튼)는 화면당 하나. 두 번째 행동부터는 보조 · 고스트로 내린다. 링크 · 포커스 · 선택 표시에 \`--key\`를 쓰는 것은 개수에 넣지 않는다
2. \`--key\` 위의 글자는 항상 \`--key-on\` (이 설정에서 \`--surface\`와 \`--ink\` 중 대비가 큰 쪽으로 정했다)
3. 상태(오류 · 성공 · 안내)는 색과 글자를 함께 쓴다
4. 새 글자/배경 조합을 만들면 대비를 확인한다 — 본문 글자 4.5:1 (WCAG 2.2 1.4.3), 입력칸 경계 · 아이콘 등 UI 구성요소 3:1 (WCAG 2.2 1.4.11). §8의 조합은 이 설정에서 계산했다
5. ${s.color.darkOn ? '다크 모드는 `<html data-theme="dark">`일 때 §1의 `[data-theme="dark"]` 값으로 바뀐다. 컴포넌트 CSS는 그대로 두고 토큰만 바꾼다' : '다크 모드 값은 만들지 않았다. 다크 모드를 임의로 만들지 않는다'}

---

## 3. Typography (타이포그래피)

기본 ${s.type.base}px, 단계 비율 ${s.type.ratio} (크기 = 기본 × 비율ⁿ, 반올림). 본문 행간 ${s.type.lhBody}, 제목 행간 ${s.type.lhHead}, 제목 자간 ${s.type.trackHead}em.

${mdTable(['역할', '서체', '크기', '굵기', '행간', '자간'], typeRows)}

토큰 이름: \`--text-display\` \`--text-h1\` \`--text-h2\` \`--text-h3\` \`--text-large\` \`--text-body\` \`--text-small\`

### Rules
- 제목은 \`--font-display\`와 \`--weight-heading\`, 본문 · 버튼 · 라벨은 \`--font-sans\`, 숫자 · 코드는 \`--font-mono\`
- 굵기는 \`--weight-regular\`(${t.type.regular}) · \`--weight-strong\`(${t.type.strong}) · \`--weight-heading\`(${t.type.heading}) 셋만 — 불러오는 서체 파일에 있는 굵기에서 골랐다
- 금액 · 통계처럼 세로로 줄 서는 숫자는 \`font-variant-numeric: tabular-nums\`
- Display · H1은 한 화면에 하나. 좁은 화면(640px 미만)에서는 Display · H1을 한 단계 작은 크기로 낮춘다 (이 도구의 기본 규칙)
- \`--text-small\` 크기의 글자는 보조 정보에만 쓴다
${t.type.picks.display.script === '라틴' || t.type.picks.body.script === '라틴' ? '- 라틴 글자만 있는 서체는 한글을 시스템 한글 서체(`Apple SD Gothic Neo`, `Malgun Gothic`)가 받는다. 서체 스택의 순서를 바꾸지 않는다\n' : ''}
---

## 4. Components (컴포넌트)

### 상태 공통 규칙
${mdTable(['상태', '규칙'], [
    ['Hover', `배경 한 단계(\`--key-hover\` 또는 \`--key-soft\`), \`--dur-fast\` — 크기 변화 없음`],
    ['Active', '`--key-active`, `translateY(1px)`'],
    ['Focus', '`outline: var(--focus-ring); outline-offset: 2px` — 모든 인터랙티브 요소, 예외 없음'],
    ['Disabled', '`opacity: 0.5`, `cursor: not-allowed`, 그림자 없음. 가능하면 비활성 대신 눌렀을 때 부족한 것을 안내'],
  ])}

### Buttons
공통: 모서리 \`--radius-button\`, 최소 높이 \`--control-height\`(${s.space.control}px), 좌우 패딩 \`--control-pad-x\`(${sp.comp.controlX}px), 글자 \`--text-body\` / \`--weight-strong\`, 테두리 \`--border-width\`(${e.border}px), 그림자 \`--shadow-button\`.

${mdTable(['종류', '배경', '글자', '테두리', 'Hover', '용도'], [
    ['Primary', '`--key`', '`--key-on`', '`--key-active`', '`--key-hover`', '화면의 핵심 행동 하나'],
    ['Secondary', '`--surface`', '`--ink`', '`--border-strong` (최소 1px)', '`--key-soft`', '일반 행동'],
    ['Ghost', '투명', '`--ink-secondary`', '—', '`--key-soft`', '3순위 행동'],
    ['Danger', '`--surface`', '`--danger`', '`--danger` (최소 1px)', '`--danger-soft`', '되돌릴 수 없는 행동 — 채우지 않는다'],
  ])}

### Inputs
- 높이 \`--control-height\`, 면 \`--surface\`, 테두리 \`--border-strong\` **최소 1px**(테두리 설정이 0이어도), 모서리 \`--radius-input\`, 좌우 패딩 \`--control-pad-x\`
- 라벨은 입력칸 위에 \`--text-small\` / \`--weight-strong\`. 플레이스홀더로 라벨을 대신하지 않는다
- 포커스: 테두리 \`--key\` + \`--focus-ring\` / 오류: 테두리 \`--danger\` + 아래에 \`--danger\` 글자로 "오류: …" 문구

### Cards
- 면 \`--material-bg\`(+ \`backdrop-filter: var(--material-blur)\`), 광택 \`--sheen\`, 테두리 \`--border-width\` \`--border\`, 모서리 \`--radius-card\`, 그림자 \`--shadow-card\`, 안쪽 패딩 \`--card-pad\`(${sp.comp.card}px), 안쪽 간격 \`--gap\`(${sp.comp.gap}px)

### Alerts · Toast · List
- 알림(inline): 왼쪽 4px 띠 + 부드러운 배경(\`--key-soft\` / \`--success-soft\` / \`--danger-soft\`) + 굵은 글자 라벨("안내" · "완료" · "오류") + \`--ink\` 본문
- 토스트 · 팝오버: 카드와 같은 면, 그림자는 \`--shadow-overlay\`
- 목록: 카드 면 위, 항목 사이 1px \`--border\` 구분선, 숫자는 \`--font-mono\`

---

## 5. Shape & Material (모서리 · 그림자 · 테두리 · 재질)

${mdTable(['토큰', '값', '쓰는 곳'], [
    ['`--radius-button`', radiusLabel(s.radius.button), '버튼'], ['`--radius-input`', radiusLabel(s.radius.input), '입력칸 · 알림'],
    ['`--radius-card`', radiusLabel(s.radius.card), '카드 · 목록 · 토스트'], ['`--radius-full`', '9999px', '아바타 · 뱃지'],
  ])}

- 테두리 \`--border-width\` ${e.border}px. 구분선은 항상 1px \`--border\`
- 그림자 종류: **${SHADOW_NAME[e.shadow]}**${e.shadow === 'none' ? '' : `, 카드는 \`--shadow-${e.depth}\` 단계, 버튼은 한 단계 아래, 떠 있는 것(토스트 · 팝오버)은 한 단계 위`}
${e.shadow === 'none' ? '' : `\n${mdTable(['토큰', '값 (라이트)'], shadowRows)}\n`}
- 면 투명도 ${e.alpha}%, 배경 흐림 ${e.blur}px → \`--material-bg\` · \`--material-blur\`${glass ? ' (반투명 — 뒤가 비친다)' : ' (불투명)'}
- 질감: ${TEXTURE_NAME[e.texture]}${e.texture === 'none' ? '' : ' — `--sheen`과 `--shadow-card` · `--shadow-button` 안의 안쪽 그림자로만 표현한다'}

---

## 6. Spacing & Layout (간격 · 레이아웃)

- 기본 단위 ${sp.unit}px. 간격은 아래 8단계에서만 고른다: ${sp.scale.map((v, i) => `\`--space-${i + 1}\` ${v}px`).join(' · ')}
- 밀도 "${{ compact: '촘촘', normal: '보통', relaxed: '여유' }[s.space.density]}": 컨트롤 좌우 ${sp.comp.controlX}px · 카드 안쪽 ${sp.comp.card}px · 요소 사이 ${sp.comp.gap}px · 섹션 사이 ${sp.comp.section}px
- 컨트롤 높이 ${s.space.control}px.${s.space.control >= 44 ? ' 44px 이상이라 WCAG 2.2 2.5.5(AAA)의 44×44px을 만족한다(가로가 충분할 때).' : ' WCAG 2.2 2.5.8(AA)의 최소 24×24px은 넘는다. 2.5.5(AAA)의 44×44px에는 못 미친다.'}
- 구분선보다 여백을 먼저 늘려 본다. 섹션 사이가 가장 큰 간격이어야 한다

---

## 7. Motion (움직임)

- 시간: \`--dur-fast\` ${s.motion.fast}ms(hover · 버튼) / \`--dur-base\` ${s.motion.base}ms(알림 · 팝오버 등장) / \`--dur-slow\` ${s.motion.slow}ms(화면 전환)
- 곡선: \`--ease\` = \`${ease.css}\` (${ease.label})
- 들어오는 것은 감속, 나가는 것은 가속하는 곡선이 어울린다 (Material 3 Motion). 나가는 쪽은 \`--dur-fast\`로 짧게
${s.motion.base === 0 ? '- 이 설정은 움직임을 쓰지 않는다(0ms). 전환을 새로 넣지 않는다\n' : ''}- 움직임 줄이기 설정을 따른다 (WCAG 2.2 2.3.3 Animation from Interactions · Media Queries Level 5):

\`\`\`css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { transition: none !important; animation: none !important; }
}
\`\`\`

---

## 8. Accessibility (접근성 · 대비 검증)

이 설정의 색으로 계산한 대비다. 기준은 본문 글자 4.5:1 (WCAG 2.2 1.4.3 Contrast (Minimum), AA), UI 구성요소 3:1 (WCAG 2.2 1.4.11 Non-text Contrast, AA).${failing ? `\n\n> **미달 ${failing}건.** 미달 조합은 쓰지 않거나, 색을 고쳐 다시 계산한다.` : '\n\n> 아래 조합은 모두 기준을 통과한다.'}

### 라이트
${fmtChecks(lightChecks)}
${s.color.darkOn ? `\n### 다크\n${fmtChecks(darkChecks)}\n` : ''}
${glass ? `> 면이 반투명(${e.alpha}%)이라 글자 대비는 뒤에 무엇이 깔리느냐에 따라 달라진다. 위 표는 면이 불투명하다고 보고 계산했다.\n` : ''}
- Tab 키만으로 모든 기능에 닿고 포커스 표시가 보인다
- 모든 입력칸에 라벨, 의미 있는 이미지에 대체 텍스트(장식은 \`alt=""\`)
- 페이지 \`lang="ko"\`

---

## 9. Quick Decision Rules (빠른 결정 규칙)

${mdTable(['고민', '답'], [
    ['색', '가장 중요한 행동 하나 → `--key`. 나머지는 `--ink` · `--ink-secondary` · 선. 상태는 semantic'],
    ['서체', '제목 display, 본문 · 버튼 sans, 숫자 mono'],
    ['글자 크기', '`--text-*` 일곱 단계 중 하나'],
    ['간격', `\`--space-*\`에서 고른다. 애매하면 큰 쪽`],
    ['모서리', '버튼 `--radius-button`, 입력 `--radius-input`, 담는 것 `--radius-card`'],
    ['그림자', '카드 `--shadow-card`, 버튼 `--shadow-button`, 떠 있는 것 `--shadow-overlay`'],
    ['움직임', 'hover `--dur-fast`, 등장 `--dur-base`, 화면 전환 `--dur-slow`, 곡선은 `--ease`'],
    ['새 값이 필요하다', '만들지 말고 가장 가까운 토큰을 쓴다'],
  ])}

---

## 10. Avoid (하지 말 것)

${avoid.map((a) => `- ${a}`).join('\n')}

---

## 11. Reference CSS (미리보기와 같은 컴포넌트 CSS)

\`preview.html\`이 이 CSS로 그려진다. 토큰만 참조하므로 §1을 바꾸면 따라 바뀐다. 클래스 이름은 참고용이고, 프레임워크의 컴포넌트에 같은 규칙을 옮겨도 된다. \`.ds-pop\` · \`.ds-track\` · \`.ds-dot\`은 움직임 견본용이다.

\`\`\`css
${componentCss(t)}
\`\`\`
`;
}

// ── tokens.json ─ Regula 자체 형식(W3C Design Tokens 형식이 아니다)
export function tokensJson(t: Tokens, s0: Spec, today: string, fonts: FontOption[]): string {
  const s = norm(s0);
  const asMap = (mi: number) => Object.fromEntries(t.modes[mi].groups.flatMap((g) => g.vars).map(([k, v]) => [k, v]));
  const common = Object.fromEntries(t.common.flatMap((g) => g.vars).map(([k, v]) => [k, v]));
  const picks = Object.fromEntries(Object.entries(t.type.picks).map(([role, p]) => [role, { family: p.family ?? null, stack: p.stack, weights: p.weights, load: p.url ?? null }]));
  const out = {
    format: 'regula-design-tokens/1',
    generator: 'Regula 디자인 파일 만들기',
    generated: today,
    name: s.name,
    slug: slugify(s.name),
    intent: s.intent || autoIntent(t, s),
    preset: s.preset,
    color: { light: s.color.light, ...(s.color.darkOn ? { dark: s.color.dark } : {}) },
    font: picks,
    typography: {
      base: s.type.base, ratio: s.type.ratio, lineHeightBody: s.type.lhBody, lineHeightHeading: s.type.lhHead, trackingHeading: `${s.type.trackHead}em`,
      weights: { regular: t.type.regular, strong: t.type.strong, heading: t.type.heading },
      scale: Object.fromEntries(Object.entries(t.type.sizes).map(([k, v]) => [k, `${v}px`])),
    },
    radius: { button: s.radius.button >= 999 ? '9999px' : `${s.radius.button}px`, input: s.radius.input >= 999 ? '9999px' : `${s.radius.input}px`, card: s.radius.card >= 999 ? '9999px' : `${s.radius.card}px`, full: '9999px' },
    border: { width: `${s.effect.border}px`, inputWidth: `${Math.max(1, s.effect.border)}px` },
    shadow: { kind: s.effect.shadow, depth: s.effect.depth, light: Object.fromEntries(t.modes[0].fx.ladder.map((v, i) => [String(i + 1), v])), card: t.modes[0].fx.card, button: t.modes[0].fx.button, overlay: t.modes[0].fx.overlay },
    material: { alpha: s.effect.alpha / 100, blur: s.effect.blur > 0 ? `${s.effect.blur}px` : null, texture: s.effect.texture },
    spacing: { unit: `${s.space.unit}px`, scale: Object.fromEntries(t.space.scale.map((v, i) => [String(i + 1), `${v}px`])), density: s.space.density, controlHeight: `${s.space.control}px` },
    motion: { duration: { fast: `${s.motion.fast}ms`, base: `${s.motion.base}ms`, slow: `${s.motion.slow}ms` }, easing: EASES.find((e) => e.id === s.motion.ease)?.css, reducedMotion: 'prefers-reduced-motion: reduce이면 transition · animation을 끈다' },
    contrast: Object.fromEntries(t.modes.filter((m) => m.mode === 'light' || s.color.darkOn).map((m) => [m.mode, m.checks.map((c) => ({ pair: c.label, fg: c.fg, bg: c.bg, ratio: +showRatio(c.ratio), required: c.need, criterion: `WCAG 2.2 ${c.sc}`, pass: c.pass }))])),
    css: { ':root': { ...asMap(0), ...common }, ...(s.color.darkOn ? { '[data-theme="dark"]': Object.fromEntries(darkOverrides(t)) } : {}) },
    // 이 파일을 도구에 다시 불러와 이어서 고칠 수 있다
    spec: s,
  };
  void fonts;
  return JSON.stringify(out, null, 2) + '\n';
}

// ── HTML 파일 ───────────────────────────────────────────
function htmlShell(title: string, t: Tokens, s: Spec, body: string, extraCss: string, script = ''): string {
  const links = fontLinks(t).map((u) => `<link rel="stylesheet" href="${esc(u)}">`).join('\n');
  const pre = fontLinks(t).some((u) => u.includes('fonts.googleapis.com')) ? '<link rel="preconnect" href="https://fonts.googleapis.com">\n<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>\n' : '';
  return `<!DOCTYPE html>
<html lang="ko" data-theme="light">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
${pre}${links}
<style>
${tokensCss(t, s)}

${componentCss(t)}

${SAMPLE_CSS}
body { margin: 0; background: var(--bg); }
${extraCss}
</style>
</head>
<body class="ds-root">
${body}
${script}
</body>
</html>
`;
}
const THEME_BUTTON = (s: Spec) => (s.color.darkOn ? '<button class="ds-btn ds-btn--secondary ds-theme" type="button" id="ds-theme">다크 / 라이트</button>' : '');
const THEME_SCRIPT = (s: Spec) => `<script>
(function () {
  var play = document.getElementById('ds-play'), track = document.getElementById('ds-track');
  if (play && track) play.addEventListener('click', function () { track.classList.toggle('is-go'); });
  ${s.color.darkOn ? "var b = document.getElementById('ds-theme'); if (b) b.addEventListener('click', function () { var h = document.documentElement; h.setAttribute('data-theme', h.getAttribute('data-theme') === 'dark' ? 'light' : 'dark'); });" : ''}
})();
</script>`;

export function previewHtml(t: Tokens, s0: Spec): string {
  const s = norm(s0);
  return htmlShell(`${s.name} 미리보기`, t, s, `${THEME_BUTTON(s) ? `<div class="ds-bar">${THEME_BUTTON(s)}</div>` : ''}\n${sampleHtml(t, s)}`, '.ds-bar { display: flex; justify-content: flex-end; padding: 12px 16px 0; }', THEME_SCRIPT(s));
}

export function designHtml(t: Tokens, s0: Spec): string {
  const s = norm(s0);
  const sw = (name: string, v: string) => `<div class="doc-sw"><i style="background:${esc(v)}"></i><b>${esc(name)}</b><code>${esc(v)}</code></div>`;
  const colorSection = (mi: number) => t.modes[mi].groups.filter((g) => ['Color', 'Key', 'Semantic'].includes(g.title)).map((g) => g.vars.filter(([, v]) => v.startsWith('#')).map(([k, v]) => sw(k, v)).join('')).join('');
  const rowsOf = (cs: Check[]) => cs.map((c) => `<tr><td>${esc(c.label)}</td><td><code>${esc(c.fg)}</code> / <code>${esc(c.bg)}</code></td><td>${showRatio(c.ratio)}:1</td><td>${c.need}:1</td><td class="${c.pass ? 'ok' : 'bad'}">${c.pass ? '통과' : '미달'}</td></tr>`).join('');
  const body = `<main class="doc">
  <p class="ds-small ds-num">DESIGN.html · Regula 디자인 파일 만들기</p>
  <h1 class="ds-h ds-h1">${esc(s.name)}</h1>
  <p>${esc(s.intent || autoIntent(t, s))}</p>
  ${THEME_BUTTON(s)}
  <h2 class="ds-h ds-h3">색 (라이트)</h2><div class="doc-grid">${colorSection(0)}</div>
  ${s.color.darkOn ? `<h2 class="ds-h ds-h3">색 (다크)</h2><div class="doc-grid">${colorSection(1)}</div>` : ''}
  <h2 class="ds-h ds-h3">타입 스케일</h2>
  <table><thead><tr><th>역할</th><th>크기</th><th>굵기</th><th>행간</th><th>견본</th></tr></thead><tbody>
  ${t.type.rows.map((r) => `<tr><td>${r.label}</td><td>${r.size}px</td><td>${r.weight}</td><td>${r.line}</td><td><span style="font-family:var(--font-${r.font === 'body' ? 'sans' : r.font});font-size:min(${r.size}px,9vw);font-weight:${r.weight};line-height:${r.line};letter-spacing:${r.track}em">가나다 Aa 123</span></td></tr>`).join('')}
  </tbody></table>
  <h2 class="ds-h ds-h3">모서리 · 그림자 · 간격</h2>
  <div class="doc-grid">
    ${(['button', 'input', 'card'] as const).map((k) => `<div class="doc-sw"><i style="border-radius:var(--radius-${k});background:var(--key)"></i><b>--radius-${k}</b><code>${radiusLabel(s.radius[k])}</code></div>`).join('')}
    ${[1, 2, 3, 4].map((n) => `<div class="doc-sw"><i style="background:var(--surface);border:1px solid var(--border);box-shadow:var(--shadow-${n})"></i><b>--shadow-${n}</b><code>${esc(t.modes[0].fx.ladder[n - 1])}</code></div>`).join('')}
  </div>
  <div class="ds-spaces">${t.space.scale.map((v, i) => `<span style="width:var(--space-${i + 1})" title="--space-${i + 1} ${v}px"></span>`).join('')}</div>
  <h2 class="ds-h ds-h3">움직임</h2>
  <p class="ds-num">fast ${s.motion.fast}ms · base ${s.motion.base}ms · slow ${s.motion.slow}ms · ${esc(EASES.find((e) => e.id === s.motion.ease)?.css ?? '')}</p>
  <h2 class="ds-h ds-h3">대비 검증 (라이트)</h2>
  <table><thead><tr><th>조합</th><th>색</th><th>대비</th><th>기준</th><th>결과</th></tr></thead><tbody>${rowsOf(t.modes[0].checks)}</tbody></table>
  ${s.color.darkOn ? `<h2 class="ds-h ds-h3">대비 검증 (다크)</h2><table><thead><tr><th>조합</th><th>색</th><th>대비</th><th>기준</th><th>결과</th></tr></thead><tbody>${rowsOf(t.modes[1].checks)}</tbody></table>` : ''}
  <p class="ds-small">기준: WCAG 2.2 1.4.3 (본문 4.5:1) · 1.4.11 (UI 구성요소 3:1). 전체 규칙은 DESIGN.md.</p>
</main>`;
  const css = `.doc { max-width: 880px; margin: 0 auto; padding: var(--card-pad); display: grid; gap: var(--gap); }
.doc table { width: 100%; border-collapse: collapse; display: block; overflow-x: auto; }
.doc th, .doc td { text-align: left; padding: 8px 12px; border-bottom: 1px solid var(--border); font-size: var(--text-small); white-space: nowrap; vertical-align: middle; }
.doc code { font-family: var(--font-mono); font-size: 12px; color: var(--ink-secondary); }
.doc .ok { color: var(--success); font-weight: var(--weight-strong); } .doc .bad { color: var(--danger); font-weight: var(--weight-strong); }
.doc-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); gap: var(--gap); }
.doc-sw { display: grid; gap: 4px; min-width: 0; } .doc-sw i { display: block; height: 48px; border: 1px solid var(--border); border-radius: var(--radius-input); }
.doc-sw b { font-size: var(--text-small); font-weight: var(--weight-strong); overflow-wrap: anywhere; } .doc-sw code { overflow-wrap: anywhere; }`;
  return htmlShell(`${s.name} 디자인 시스템`, t, s, body, css, THEME_SCRIPT(s));
}

// ── AI에 붙여 넣을 프롬프트 ────────────────────────────
export function promptText(md: string): string {
  return `아래 DESIGN.md는 이 프로젝트의 디자인 시스템입니다. 화면을 만들 때 이 문서의 토큰(CSS 변수)과 규칙만 사용하세요.
- 문서에 없는 색 · 크기 · 서체 · 그림자 · 모서리 값을 새로 만들지 마세요.
- §10 하지 말 것을 어기지 마세요.
- 끝나면 사용한 토큰 이름을 목록으로 알려 주세요.

만들 화면: (여기에 적으세요)

--- DESIGN.md ---
${md}`;
}

export const fileBase = (s: Spec) => slugify(s.name);
