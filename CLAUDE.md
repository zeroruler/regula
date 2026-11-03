# Regula

웹디자인 아카이브 — 원리 · 패턴 · 양식을 확인한 출처와 함께 모아, 누구나 공부하고 참고할 수 있게 한다. 화면 문구는 "나"가 아니라 방문자를 기준으로 쓴다("내 정리" × → "정리"). 기획은 PLAN.md, v0.1 원본은 regula.html(디자인 기준으로 보존).

## 명령

- `npm run dev` — 개발 서버 (http://localhost:4321)
- `npm run build` — 정적 빌드 → dist/
- `npm run sync-design-md` — VoltAgent/awesome-design-md(MIT)의 사이트별 DESIGN.md를 src/imported/design-md/에 다시 가져온다
- `npm run sync-refs` — `github:` 필드가 있는 레퍼런스의 README를 src/imported/에 다시 가져온다 (자유 라이선스만)
- `npm run sync-wcag` — WCAG 2.2 성공 기준 원문을 src/imported/w3c/에 다시 가져온다 (W3C Document License: 고치거나 번역하지 않는다)
- `npm run sync-govuk` — Regula가 출처로 쓴 GOV.UK Design System 안내 페이지를 src/imported/govuk/에 다시 가져온다 (OGL v3.0, 출처 표시 문구를 지우지 않는다)
- `npm run sync-docs` — Carbon(Apache-2.0) · Primer(MIT) 문서 저장소에서 Regula가 쓰는 페이지를 src/imported/docs/에 다시 가져온다 (둘 다 보관된 저장소 판본, 가져올 페이지는 scripts/sync-docs.mjs의 SOURCES에 적는다. Primer Typography의 토큰 표는 @primer/primitives(MIT)에서 만들고, 로그인 없이 안 열리는 그림은 그림 설명으로 바꾼다 — 출처 34차)
- `npm run measure-embeds` — `embed: true` 사이트의 폭별 페이지 높이를 재서 src/imported/measured/에 남긴다 (Playwright 필요, 레퍼런스 iframe을 사이트 길이만큼 펼치는 데 씀)

## 콘텐츠 추가

- 공식: `src/content/formulas/<slug>.md`, 패턴: `src/content/patterns/<category>/<slug>.md`, 레퍼런스: `src/content/references/<slug>.md`
- 필드는 `src/content.config.ts` 스키마를 따른다. `source`는 필수.
- 공식의 `web`은 그 원리를 웹 화면에 옮기는 한 줄. 출처의 문장이 아니라 적용 예이고, 웹과 거리가 먼 출처(그래픽·사진 이론)를 옮길 때는 꼭 붙인다.
- 공식·패턴의 `refs`에 레퍼런스 slug를 넣으면 레퍼런스 상세 페이지의 "Regula에서 쓴 곳"에 자동으로 연결된다.
- 디자인 시스템 원본은 `DESIGN/<이름>/`(DESIGN.md · DESIGN.html · preview.html). 양식 항목은 `src/content/templates/<이름>.md`에 `design: <이름>`으로 연결한다. 토큰 표는 DESIGN.md의 ```css 블록에서 빌드 때 읽고, 파일들은 `public/design/`으로 자동 복사된다(직접 고치지 말 것).
- 서체: `src/content/fonts/<이름>.md`. status는 실제로 양식에 쓴 것만 `쓰는 중`, 사용자가 눈여겨봤다고 한 것만 `눈여겨봄`.
- 출처 기록(구 기록장, 내비게이션에는 없음): `src/content/notes/<날짜>-<이름>.md` (kind: 본 것 · 메모 · 써 본 예시). `about`에 `formulas/<id>`, `patterns/<카테고리>/<id>`, `darkpatterns/<id>`, `references/<id>`, `fonts/<id>`를 넣으면 그 항목 아래 "본 곳"에 붙는다. 자료를 어디서 봤는지 남기는 용도로만 쓰고, 개인 경험 기록을 권하지 않는다. 사용자가 직접 보여 준 자료는 `본 것`으로 남길 수 있고, 사용자가 하지 않은 일을 지어내지 않는다.
- 디자인 파일 만들기(`/builder/`): 로직은 `src/lib/builder/`(spec 설정·프리셋, derive 토큰·대비 계산, files 내려받는 파일, zip, ui 화면). 서체 후보는 `src/content/fonts`에서 읽는다. 대비 기준 숫자는 원문을 확인한 WCAG 값만 쓰고, 도구가 정한 값(색 섞기·그림자 단계 등)은 파일에도 "출처 없음"이라 적는다. 기록은 `docs/source-check.md` 15차.
- 색(`/colors/`): 견본 `src/content/palettes/<slug>.md`(값 전체는 라이선스 원문을 확인한 자유 라이선스만, 팬톤 같은 독점 체계는 references에 색값 없이), 조합 `src/content/combos/<slug>.md`(`group`에 결 — 스키마의 `comboGroups`, `principles`에 공식 slug, 색은 `hex`+`from` 또는 양식 `token`). 조합 로직은 `src/lib/combos.ts`, 디자인 파일 만들기는 같은 데이터로 "조합에서 고르기"를 만들고 보조 색은 DESIGN.md에 `--accent-*`로만 넣는다. 기록은 `docs/source-check.md` 17 · 18차.
- 사이트 DESIGN.md(`/design-md/`): 원문은 `src/imported/design-md/`(직접 고치지 말 것), 읽기 · 색 뽑기는 `src/lib/designmd.ts`. 각 회사의 공식 문서가 아니라 VoltAgent의 해석이라는 표시를 지우지 않는다. 기록은 `docs/source-check.md` 19차.
- 레퍼런스 `embed: true`는 iframe 안에서 실제로 열리는지 확인한 사이트에만 켠다. 이용 약관이 콘텐츠의 복제 · 전시나 자동 접근을 막는 곳은 열려도 켜지 않고 `noembed: "terms"`를 적는다(Apple HIG · 디자인 나침반 · Wanted Montage, 출처 33차). 켜거나 url을 바꾸면 `npm run measure-embeds`를 다시 돌린다(잰 값이 없거나 url이 다르면 예전처럼 상자 안에서 스크롤).
- 레퍼런스 원문 가져오기: 저장소 README는 `github:`, 그 밖의 원문은 `imported:`(지금은 `wcag22` · `govuk` · `carbon` · `primer`). 원문의 라이선스를 직접 읽고 허용될 때만 가져오며, 기록은 `docs/source-check.md` 20 · 21 · 22차. GOV.UK는 refs에 `gov-uk`를 넣고 source에 "GOV.UK Design System <페이지 이름>"을 적은 페이지를 가져오니, 새로 쓰면 `npm run sync-govuk`를 다시 돌린다.

- 페이지 규칙 표(대상 · 규칙 · 출처)는 `src/lib/rules.ts`에 페이지 key별로 적고, 페이지는 `rulesOf('<key>')`로 읽어 줄마다 `ruleId`를 단다. 출처 칸 · 양식 규칙의 source에 WCAG 번호나 "GOV.UK Design System <페이지>"를 적으면 출처 줄은 원문으로 링크되고(`src/lib/cite.ts`), 레퍼런스 원문 아래 "Regula에서"에도 자동으로 붙는다(`src/lib/citedby.ts`).

## 규칙

- 섹션마다 별도 페이지다(src/pages/*.astro). 새 섹션은 홈에 붙이지 말고 페이지를 만들고 `src/lib/site.ts`의 nav에 등록한다. 작업 기록도 site.ts의 `log`에 추가한다.

- 출처를 반드시 남기고, 원문을 길게 옮기지 말고 내 말로 요약한다. 원문 전체를 가져오는 건 퍼블릭 도메인·CC0·MIT 등 자유 라이선스일 때만.
- 토큰(src/styles/tokens.css, PLAN §5)과 서체는 바꾸지 않는다. 강조는 노란 형광펜(--mark) 하나만.
- 모바일 400px에서 가로 스크롤이 생기지 않아야 한다. 표와 수식만 자체 가로 스크롤 허용.
- 미니 목업은 흑백 와이어프레임. 특정 브랜드 화면을 그대로 옮기지 않는다.
