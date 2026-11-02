// 「디자인 파일 만들기」 화면. 컨트롤을 만들고, 값이 바뀔 때마다 토큰 → 미리보기 → 대비 검사 → 주소 해시를 갱신한다.
import { buildTokens, showRatio } from './derive.ts';
import { componentCss, designHtml, designMd, fileBase, norm, previewHtml, promptText, sampleHtml, SAMPLE_CSS, tokensCss, tokensJson } from './files.ts';
import {
  CONTROLS, DEFAULT, EASES, MOTION_SETS, PRESETS, RADII, RATIOS, applyPreset, decodeSpec, encodeSpec, presetEdited, sanitize,
  type FontOption, type Mode, type Spec,
} from './spec.ts';
import { makeZip } from './zip.ts';

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const today = () => { const d = new Date(); return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`; };

// ── 컨트롤 조각 ─ data-p는 spec 안의 경로, data-t는 값의 종류(n 숫자 · b 참거짓 · 없으면 문자열). 경로의 $는 편집 중인 색 모드로 바뀐다.
const chip = (p: string, v: string | number, label: string, t = 's') =>
  `<button type="button" class="chip" data-p="${p}" data-v="${v}" data-t="${t}" aria-pressed="false">${label}</button>`;
const range = (p: string, label: string, min: number, max: number, step: number, unit = '') =>
  `<label class="bd-r"><span>${label}</span><input type="range" data-p="${p}" data-t="n" data-unit="${unit}" min="${min}" max="${max}" step="${step}"><output></output></label>`;
const select = (p: string, label: string, opts: [string | number, string][], t = 's') =>
  `<label class="bd-r"><span>${label}</span><select data-p="${p}" data-t="${t}">${opts.map(([v, l]) => `<option value="${v}">${esc(l)}</option>`).join('')}</select></label>`;
const colorRow = (key: string, label: string) =>
  `<div class="bd-c"><span>${label}</span><input type="color" data-p="color.$.${key}" aria-label="${label} 색 고르기"><input type="text" data-p="color.$.${key}" data-hex maxlength="7" spellcheck="false" aria-label="${label} hex 값"></div>`;
const group = (n: number, title: string, body: string, note = '') =>
  `<details class="bd-g" open><summary><span class="label">${n}</span><b>${title}</b></summary><div class="bd-gb">${body}${note ? `<p class="bd-note">${note}</p>` : ''}</div></details>`;

const radiusOpts: [number, string][] = RADII.map((r) => [r, r >= 999 ? 'pill' : `${r}px`]);

export function initBuilder(host: HTMLElement, fonts: FontOption[], origin: { styles: string; motion: string; spacing: string }) {
  const fontIds = fonts.map((f) => f.id);
  const fontOpts = (pred: (f: FontOption) => boolean): [string, string][] => [
    ['system', '시스템 서체'],
    ...fonts.filter(pred).map((f) => [f.id, `${f.name} · ${f.kind}${f.script === '라틴' ? ' (라틴만)' : ''}`] as [string, string]),
  ];

  host.innerHTML = `
  <div class="bd-top">
  <div class="bd-side">
    ${group(1, '시작점 · 비주얼 스타일', `<div class="chips" role="group" aria-label="비주얼 스타일">${PRESETS.map((p) => chip('preset', p.id, p.name)).join('')}</div>
      <p class="bd-note" id="bdPresetNote" aria-live="polite"></p>`,
      `재료(그림자 · 테두리 · 투명도 · 질감)와 모서리만 바뀝니다. 색과 서체는 그대로예요. 스타일 이름과 재료는 <a href="${origin.styles}">비주얼 스타일</a>에서 설명합니다.`)}
    ${group(2, '서체와 크기', `${select('fonts.display', '제목', fontOpts((f) => f.kind !== '모노'))}${select('fonts.body', '본문', fontOpts((f) => f.kind === '산세리프' || f.kind === '세리프'))}${select('fonts.mono', '숫자', fontOpts((f) => f.kind === '모노'))}
      ${range('type.base', '기본 크기', 14, 20, 1, 'px')}${select('type.ratio', '단계 비율', RATIOS.map((r) => [r, r === 1.618 ? '1.618 (황금비)' : String(r)] as [number, string]), 'n')}
      ${range('type.lhBody', '본문 행간', 1.3, 2, 0.05)}${range('type.lhHead', '제목 행간', 1, 1.5, 0.05)}${range('type.trackHead', '제목 자간', -0.05, 0.05, 0.005, 'em')}
      <p class="bd-scale" id="bdScale"></p>`,
      '서체 후보는 이 사이트에서 정리한 12개와 시스템 서체입니다. 파일을 부르는 서체는 그 파일에 있는 굵기만 씁니다.')}
    ${group(3, '모서리', `${select('radius.button', '버튼', radiusOpts, 'n')}${select('radius.input', '입력칸', radiusOpts, 'n')}${select('radius.card', '카드', radiusOpts, 'n')}
      <div class="chips" role="group" aria-label="한 번에 맞추기"><span class="label">모두</span>${[0, 4, 8, 16, 999].map((r) => `<button type="button" class="chip" data-all-radius="${r}">${r >= 999 ? 'pill' : r}</button>`).join('')}</div>`)}
    ${group(4, '효과', `<div class="chips" role="group" aria-label="그림자 종류">${[['none', '그림자 없음'], ['soft', '흐린 그림자'], ['hard', '어긋난 그림자'], ['dual', '밝고 어두운 한 쌍']].map(([v, l]) => chip('effect.shadow', v, l)).join('')}</div>
      ${range('effect.depth', '그림자 단계', 1, 4, 1)}${range('effect.border', '테두리 두께', 0, 3, 1, 'px')}${range('effect.alpha', '면 투명도', 20, 100, 5, '%')}${range('effect.blur', '뒤 배경 흐림', 0, 24, 1, 'px')}
      ${select('effect.texture', '질감', [['none', '없음'], ['gloss', '광택'], ['inset', '안쪽 그림자'], ['edge', '가장자리 빛']])}
      <label class="bd-chk"><input type="checkbox" data-p="effect.alertBar" data-t="b"> 알림 왼쪽에 세로 띠 (안내 · 완료 · 오류)</label>`,
      '입력칸 테두리는 두께를 0으로 해도 1px를 남깁니다 — 입력칸을 알아보는 경계는 주변과 3:1 이상이어야 해요(WCAG 2.2 1.4.11).')}
    ${group(5, '색', `<div class="chips" role="group" aria-label="편집할 모드"><span class="label">편집 중</span>${chip('$view', 'light', '라이트')}${chip('$view', 'dark', '다크')}</div>
      <label class="bd-chk"><input type="checkbox" data-p="color.darkOn" data-t="b"> 다크 값도 파일에 넣기</label>
      ${[['bg', '배경'], ['surface', '표면 (카드 · 입력칸)'], ['ink', '글자'], ['inkSecondary', '보조 글자'], ['border', '선'], ['borderStrong', '입력칸 테두리'], ['key', '강조 (key)'], ['danger', '오류'], ['success', '성공']].map(([k, l]) => colorRow(k, l)).join('')}`,
      '호버 · 눌림 · 부드러운 배경 · 강조색 위 글자는 위 색에서 계산합니다. 대비는 아래 "대비 검사"에서 바로 확인하세요.')}
    ${group(6, '간격', `<div class="chips" role="group" aria-label="기본 단위"><span class="label">기본 단위</span>${chip('space.unit', 4, '4px', 'n')}${chip('space.unit', 8, '8px', 'n')}</div>
      ${select('space.density', '밀도', [['compact', '촘촘'], ['normal', '보통'], ['relaxed', '여유']])}${select('space.control', '버튼 · 입력칸 높이', CONTROLS.map((c) => [c, `${c}px`] as [number, string]), 'n')}`,
      `간격 규칙은 <a href="${origin.spacing}">비율과 간격</a>에서 다룹니다. 44px 이상이면 WCAG 2.5.5(AAA)의 44×44px을 채웁니다.`)}
    ${group(7, '움직임', `<div class="chips" role="group" aria-label="시간 묶음">${MOTION_SETS.map((m) => `<button type="button" class="chip" data-motion="${m.id}">${m.label}</button>`).join('')}</div>
      ${range('motion.fast', 'fast (hover)', 0, 1000, 10, 'ms')}${range('motion.base', 'base (등장)', 0, 1000, 10, 'ms')}${range('motion.slow', 'slow (전환)', 0, 1000, 10, 'ms')}
      ${select('motion.ease', '곡선', EASES.map((e) => [e.id, e.label] as [string, string]))}`,
      `곡선 값과 시간 범위는 <a href="${origin.motion}">움직임</a>에서 확인한 Material 3 토큰을 씁니다.`)}
    ${group(8, '이름과 의도', `<label class="bd-r bd-t"><span>이름</span><input type="text" data-p="name" maxlength="24" data-raw></label>
      <label class="bd-r bd-t"><span>의도 (선택)</span><textarea data-p="intent" maxlength="200" rows="3" data-raw placeholder="비워 두면 설정에서 한 단락을 만듭니다"></textarea></label>`)}
  </div>
  <div class="bd-stage" id="bdStage">
    <div class="bd-bar">
      <span class="label">미리보기</span>
      <div class="chips" role="group" aria-label="미리보기 모드">${chip('$view', 'light', '라이트')}${chip('$view', 'dark', '다크')}</div>
    </div>
    <div class="bd-preview ds-root" id="bdPreview" data-theme="light"></div>
  </div>
  </div>
  <div class="bd-checks" id="bdChecks"></div>
  <div class="bd-out">
    <span class="label">내려받기</span>
    <div class="bd-actions">
      <button type="button" class="bd-btn primary" id="bdZip">zip으로 한 번에 받기</button>
      <button type="button" class="bd-btn" data-save="md">DESIGN.md</button>
      <button type="button" class="bd-btn" data-save="json">tokens.json</button>
      <button type="button" class="bd-btn" data-save="preview">preview.html</button>
      <button type="button" class="bd-btn" data-save="doc">DESIGN.html</button>
    </div>
    <div class="bd-actions">
      <button type="button" class="bd-btn" id="bdPrompt">AI에 붙여 넣을 프롬프트 복사</button>
      <button type="button" class="bd-btn" id="bdCopyMd">DESIGN.md 복사</button>
      <button type="button" class="bd-btn" id="bdLink">설정 링크 복사</button>
      <label class="bd-btn bd-file">tokens.json 불러오기<input type="file" id="bdLoad" accept="application/json,.json"></label>
      <button type="button" class="bd-btn" id="bdReset">처음 값으로</button>
    </div>
    <p class="bd-status" id="bdStatus" role="status" aria-live="polite"></p>
    <details class="bd-md" id="bdMdBox"><summary>DESIGN.md 미리 보기 <span class="label" id="bdMdSize"></span></summary><pre id="bdMd" tabindex="0"></pre></details>
  </div>`;

  // ── 상태
  const fromHash = () => {
    const m = location.hash.match(/^#s=([\w-]+)$/);
    return m ? decodeSpec(m[1], fontIds) : null;
  };
  let spec: Spec = fromHash() ?? sanitize(DEFAULT, fontIds);
  let view: Mode = 'light';

  const $ = <T extends HTMLElement>(id: string) => host.querySelector<T>(`#${id}`)!;
  const styleEl = document.createElement('style');
  styleEl.id = 'bdPreviewStyle';
  document.head.append(styleEl);
  const loaded = new Set<string>();

  const getAt = (path: string): unknown => path.split('.').reduce<any>((o, k) => (o == null ? o : o[k]), spec);
  const setAt = (path: string, v: unknown) => {
    const parts = path.split('.');
    let o: any = spec;
    for (let i = 0; i < parts.length - 1; i++) o = o[parts[i]];
    o[parts[parts.length - 1]] = v;
  };
  // 이름 · 의도는 입력 중에 다듬지 않는다(띄어쓰기가 사라지지 않게). 나머지는 허용 범위로 맞춘다.
  const commit = () => {
    const { name, intent } = spec;
    spec = sanitize(spec, fontIds);
    spec.name = name; spec.intent = intent;
    update();
  };

  // ── 갱신
  function update(): void {
    const t = buildTokens(spec, fonts);
    const tokenCss = tokensCss(t, spec).replace(/^:root \{/m, '.bd-preview {').replace(/^\[data-theme="dark"\] \{/m, '.bd-preview[data-theme="dark"] {');
    styleEl.textContent = `${tokenCss}\n${componentCss(t)}\n${SAMPLE_CSS}`;
    const prev = $('bdPreview');
    const go = prev.querySelector('#ds-track')?.classList.contains('is-go');
    prev.innerHTML = sampleHtml(t, norm(spec));
    if (go) prev.querySelector('#ds-track')?.classList.add('is-go');
    prev.dataset.theme = spec.color.darkOn ? view : 'light';
    if (!spec.color.darkOn && view === 'dark') view = 'light';

    // 서체 파일
    for (const p of Object.values(t.type.picks)) {
      if (p.url && !loaded.has(p.url)) {
        loaded.add(p.url);
        const l = document.createElement('link'); l.rel = 'stylesheet'; l.href = p.url; document.head.append(l);
      }
    }

    // 컨트롤 값 맞추기
    host.querySelectorAll<HTMLElement>('[data-p]').forEach((el) => {
      const path = el.dataset.p!;
      if (path === '$view') { el.setAttribute('aria-pressed', String(el.dataset.v === view)); return; }
      const v = getAt(path.replace('$', view));
      if (el instanceof HTMLButtonElement) el.setAttribute('aria-pressed', String(String(v) === el.dataset.v));
      else if (el instanceof HTMLInputElement && el.type === 'checkbox') el.checked = !!v;
      else if (el instanceof HTMLInputElement || el instanceof HTMLSelectElement || el instanceof HTMLTextAreaElement) {
        if (el === document.activeElement && (el.type === 'text' || el instanceof HTMLTextAreaElement)) return;
        el.value = el instanceof HTMLInputElement && el.type === 'color' ? String(v).toLowerCase() : String(v);
        if (el instanceof HTMLInputElement && el.type === 'range') {
          const o = el.parentElement!.querySelector('output')!;
          const n = Number(v);
          o.textContent = `${el.dataset.unit === 'em' ? (n > 0 ? '+' : '') + n : n}${el.dataset.unit ?? ''}`;
        }
      }
    });
    host.querySelector<HTMLInputElement>('[data-p="effect.depth"]')!.disabled = spec.effect.shadow === 'none';
    const pr = PRESETS.find((p) => p.id === spec.preset);
    $('bdPresetNote').textContent = pr ? `${pr.name}${presetEdited(spec) ? ' (값을 고침)' : ''} — ${pr.note}. AI에게는 "${pr.prompt}"` : '';
    $('bdScale').innerHTML = `크기 단계 <b>${[t.type.sizes.small, t.type.sizes.body, t.type.sizes.large, t.type.sizes.h3, t.type.sizes.h2, t.type.sizes.h1, t.type.sizes.display].join(' · ')}</b> px${t.type.picks.display.script === '라틴' || t.type.picks.body.script === '라틴' ? '<br>라틴만 있는 서체는 한글을 시스템 한글 서체가 받습니다.' : ''}`;

    renderChecks(t);
    if (host.querySelector<HTMLDetailsElement>('#bdMdBox')!.open) renderMd(t);
    scheduleHash();
  }

  function renderChecks(t: ReturnType<typeof buildTokens>): void {
    const mode = spec.color.darkOn ? view : 'light';
    const m = t.modes.find((x) => x.mode === mode)!;
    const fails = [...t.modes[0].checks, ...(spec.color.darkOn ? t.modes[1].checks : [])].filter((c) => !c.pass).length;
    const notes: string[] = [];
    const e = spec.effect;
    if (e.alpha < 100) notes.push(`면 투명도 ${e.alpha}% — 글자 대비는 뒤에 깔리는 것에 따라 달라집니다. 아래 표는 불투명한 면 기준이에요. 투명도 줄이기 · 대비 높이기 설정을 켠 사람에게는 불투명한 면을 보이게 하세요(DESIGN.md와 preview.html에 미디어 쿼리가 들어 있음).`);
    if (e.blur > 0 && e.alpha === 100) notes.push('면이 불투명(100%)이라 뒤 배경 흐림이 보이지 않습니다. 투명도를 낮춰야 흐림이 드러나요.');
    if (e.shadow === 'dual' && spec.color[mode].bg.toUpperCase() !== spec.color[mode].surface.toUpperCase()) notes.push('밝고 어두운 한 쌍의 그림자는 배경과 표면이 같은 색일 때 입체로 보입니다. 지금은 두 색이 다릅니다.');
    if (spec.space.control < 44) notes.push(`버튼 높이 ${spec.space.control}px — WCAG 2.5.8(AA)의 24px은 넘지만 2.5.5(AAA)의 44px에는 못 미칩니다.`);
    $('bdChecks').innerHTML = `
      <div class="bd-ch-head"><span class="label">대비 검사 · ${mode === 'light' ? '라이트' : '다크'}</span>
        <b class="${fails ? 'bad' : 'ok'}">${fails ? `미달 ${fails}건${spec.color.darkOn ? ' (라이트 + 다크)' : ''}` : '모두 통과'}</b></div>
      <div class="compare"><table class="bd-table"><thead><tr><th>조합</th><th>색</th><th>대비</th><th>기준</th><th></th></tr></thead><tbody>
      ${m.checks.map((c) => `<tr><td>${esc(c.label)}</td><td class="bd-sw"><i style="background:${c.bg}"><b style="color:${c.fg}">Aa</b></i><code>${c.fg}</code> / <code>${c.bg}</code></td><td class="mono">${showRatio(c.ratio)}:1</td><td class="mono">${c.need}:1 · ${c.sc}</td><td class="${c.pass ? 'ok' : 'bad'}">${c.pass ? '통과' : '미달'}</td></tr>`).join('')}
      </tbody></table></div>
      ${notes.length ? `<ul class="bd-notes">${notes.map((n) => `<li>${esc(n)}</li>`).join('')}</ul>` : ''}`;
  }

  // ── 파일
  const build = () => {
    const t = buildTokens(spec, fonts);
    const day = today();
    return {
      t,
      files: {
        'DESIGN.md': designMd(t, spec, day),
        'tokens.json': tokensJson(t, spec, day, fonts),
        'preview.html': previewHtml(t, spec),
        'DESIGN.html': designHtml(t, spec),
      } as Record<string, string>,
    };
  };
  function renderMd(t = buildTokens(spec, fonts)): void {
    const md = designMd(t, spec, today());
    $('bdMd').textContent = md;
    $('bdMdSize').textContent = `${md.split('\n').length}줄`;
  }
  const status = (msg: string) => { $('bdStatus').textContent = msg; };
  const save = (name: string, data: BlobPart, type: string) => {
    const url = URL.createObjectURL(new Blob([data], { type }));
    const a = document.createElement('a');
    a.href = url; a.download = name; document.body.append(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 2000);
    status(`내려받았습니다: ${name}`);
  };
  const copy = async (text: string, what: string) => {
    try { await navigator.clipboard.writeText(text); status(`복사했습니다: ${what}`); }
    catch { status('복사하지 못했습니다. 브라우저가 클립보드를 막았어요 — DESIGN.md 미리 보기에서 직접 선택해 복사하세요.'); }
  };

  // ── 주소 해시: 설정을 링크로 나눌 수 있게
  let hashTimer = 0;
  function scheduleHash(): void {
    clearTimeout(hashTimer);
    hashTimer = window.setTimeout(() => { try { history.replaceState(null, '', `#s=${encodeSpec(spec)}`); } catch { /* 주소를 바꾸지 못해도 도구는 동작한다 */ } }, 300);
  }

  // ── 이벤트
  host.addEventListener('input', (e) => {
    const el = e.target as HTMLElement;
    const path = el.dataset.p;
    if (!path || el instanceof HTMLButtonElement || path === '$view') return;
    if (el instanceof HTMLSelectElement || (el instanceof HTMLInputElement && el.type === 'checkbox')) return; // change에서
    const input = el as HTMLInputElement;
    let v: unknown = input.value;
    if (input.dataset.hex !== undefined) {
      const x = input.value.trim();
      if (!/^#?[0-9a-fA-F]{6}$/.test(x)) return;
      v = (x.startsWith('#') ? x : `#${x}`).toUpperCase();
    } else if (input.dataset.t === 'n') v = Number(input.value);
    setAt(path.replace('$', view), v);
    commit();
  });
  host.addEventListener('change', (e) => {
    const el = e.target as HTMLInputElement | HTMLSelectElement;
    if (el.id === 'bdLoad') return;
    const path = el.dataset?.p;
    if (!path || path === '$view') return;
    if (el instanceof HTMLInputElement && el.type === 'checkbox') setAt(path, el.checked);
    else if (el instanceof HTMLSelectElement) setAt(path, el.dataset.t === 'n' ? Number(el.value) : el.value);
    else return;
    commit();
  });
  host.addEventListener('click', (e) => {
    const el = (e.target as Element).closest<HTMLElement>('button, summary');
    if (!el) return;
    if (el.id === 'ds-play') { host.querySelector('#ds-track')?.classList.toggle('is-go'); return; }
    const d = el.dataset;
    if (d.p === '$view') { view = d.v as Mode; update(); return; }
    if (d.p && el instanceof HTMLButtonElement) {
      if (d.p === 'preset') { spec = applyPreset(spec, d.v!); commit(); return; }
      setAt(d.p.replace('$', view), d.t === 'n' ? Number(d.v) : d.v);
      commit();
      return;
    }
    if (d.allRadius) { const r = Number(d.allRadius); spec.radius = { button: r, input: r, card: r }; commit(); return; }
    if (d.motion) { const m = MOTION_SETS.find((x) => x.id === d.motion)!; spec.motion = { ...spec.motion, fast: m.fast, base: m.base, slow: m.slow }; commit(); return; }
    if (d.save) {
      const f = build().files;
      const [name, type] = { md: ['DESIGN.md', 'text/markdown'], json: ['tokens.json', 'application/json'], preview: ['preview.html', 'text/html'], doc: ['DESIGN.html', 'text/html'] }[d.save]!;
      save(name, f[name], `${type};charset=utf-8`);
      return;
    }
    if (el.id === 'bdZip') {
      const f = build().files;
      const dir = fileBase(spec);
      const enc = new TextEncoder();
      const zip = makeZip(Object.entries(f).map(([name, text]) => ({ name: `${dir}/${name}`, data: enc.encode(text) })));
      save(`${dir}.zip`, zip, 'application/zip');
      status(`내려받았습니다: ${dir}.zip — 풀면 ${dir}/ 폴더에 DESIGN.md · tokens.json · preview.html · DESIGN.html이 있어요. 이 폴더를 저장소의 DESIGN/ 아래에 두면 됩니다.`);
      return;
    }
    if (el.id === 'bdPrompt') { void copy(promptText(build().files['DESIGN.md']), '프롬프트'); return; }
    if (el.id === 'bdCopyMd') { void copy(build().files['DESIGN.md'], 'DESIGN.md'); return; }
    if (el.id === 'bdLink') { scheduleHash(); window.setTimeout(() => void copy(location.href, '설정 링크'), 350); return; }
    if (el.id === 'bdReset') { spec = sanitize(DEFAULT, fontIds); view = 'light'; commit(); status('처음 값으로 되돌렸습니다.'); }
  });
  $('bdMdBox').addEventListener('toggle', () => { if ((host.querySelector('#bdMdBox') as HTMLDetailsElement).open) renderMd(); });
  $<HTMLInputElement>('bdLoad').addEventListener('change', async (e) => {
    const file = (e.target as HTMLInputElement).files?.[0];
    if (!file) return;
    try {
      const json = JSON.parse(await file.text());
      if (json?.format !== 'regula-design-tokens/1' || !json.spec) throw new Error('형식이 다릅니다');
      spec = sanitize(json.spec, fontIds);
      commit();
      status(`불러왔습니다: ${file.name}`);
    } catch {
      status('불러오지 못했습니다. 이 도구가 만든 tokens.json이어야 해요.');
    }
    (e.target as HTMLInputElement).value = '';
  });
  window.addEventListener('hashchange', () => { const s = fromHash(); if (s) { spec = s; update(); } });

  update();
}
