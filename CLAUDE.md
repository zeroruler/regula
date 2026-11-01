# Regula

웹디자인 아카이브 — 원리 · 패턴 · 양식을 확인한 출처와 함께 모아, 누구나 공부하고 참고할 수 있게 한다. 화면 문구는 "나"가 아니라 방문자를 기준으로 쓴다("내 정리" × → "정리"). 기획은 PLAN.md, v0.1 원본은 regula.html(디자인 기준으로 보존).

## 명령

- `npm run dev` — 개발 서버 (http://localhost:4321)
- `npm run build` — 정적 빌드 → dist/
- `npm run sync-refs` — `github:` 필드가 있는 레퍼런스의 README를 src/imported/에 다시 가져온다 (자유 라이선스만)

## 콘텐츠 추가

- 공식: `src/content/formulas/<slug>.md`, 패턴: `src/content/patterns/<category>/<slug>.md`, 레퍼런스: `src/content/references/<slug>.md`
- 필드는 `src/content.config.ts` 스키마를 따른다. `source`는 필수.
- 공식의 `web`은 그 원리를 웹 화면에 옮기는 한 줄. 출처의 문장이 아니라 적용 예이고, 웹과 거리가 먼 출처(그래픽·사진 이론)를 옮길 때는 꼭 붙인다.
- 공식·패턴의 `refs`에 레퍼런스 slug를 넣으면 레퍼런스 상세 페이지의 "Regula에서 쓴 곳"에 자동으로 연결된다.
- 디자인 시스템 원본은 `DESIGN/<이름>/`(DESIGN.md · DESIGN.html · preview.html). 양식 항목은 `src/content/templates/<이름>.md`에 `design: <이름>`으로 연결한다. 토큰 표는 DESIGN.md의 ```css 블록에서 빌드 때 읽고, 파일들은 `public/design/`으로 자동 복사된다(직접 고치지 말 것).
- 서체: `src/content/fonts/<이름>.md`. status는 실제로 양식에 쓴 것만 `쓰는 중`, 사용자가 눈여겨봤다고 한 것만 `눈여겨봄`.
- 출처 기록(구 기록장, 내비게이션에는 없음): `src/content/notes/<날짜>-<이름>.md` (kind: 본 것 · 메모 · 써 본 예시). `about`에 `formulas/<id>`, `patterns/<카테고리>/<id>`, `darkpatterns/<id>`, `references/<id>`, `fonts/<id>`를 넣으면 그 항목 아래 "본 곳"에 붙는다. 자료를 어디서 봤는지 남기는 용도로만 쓰고, 개인 경험 기록을 권하지 않는다. 사용자가 직접 보여 준 자료는 `본 것`으로 남길 수 있고, 사용자가 하지 않은 일을 지어내지 않는다.
- 레퍼런스 `embed: true`는 iframe 안에서 실제로 열리는지 확인한 사이트에만 켠다.

## 규칙

- 섹션마다 별도 페이지다(src/pages/*.astro). 새 섹션은 홈에 붙이지 말고 페이지를 만들고 `src/lib/site.ts`의 nav에 등록한다. 작업 기록도 site.ts의 `log`에 추가한다.

- 출처를 반드시 남기고, 원문을 길게 옮기지 말고 내 말로 요약한다. 원문 전체를 가져오는 건 퍼블릭 도메인·CC0·MIT 등 자유 라이선스일 때만.
- 토큰(src/styles/tokens.css, PLAN §5)과 서체는 바꾸지 않는다. 강조는 노란 형광펜(--mark) 하나만.
- 모바일 400px에서 가로 스크롤이 생기지 않아야 한다. 표와 수식만 자체 가로 스크롤 허용.
- 미니 목업은 흑백 와이어프레임. 특정 브랜드 화면을 그대로 옮기지 않는다.
