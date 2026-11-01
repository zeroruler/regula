# Regula

개인 디자인 규칙집. 기획은 PLAN.md, v0.1 원본은 regula.html(디자인 기준으로 보존).

## 명령

- `npm run dev` — 개발 서버 (http://localhost:4321)
- `npm run build` — 정적 빌드 → dist/
- `npm run sync-refs` — `github:` 필드가 있는 레퍼런스의 README를 src/imported/에 다시 가져온다 (자유 라이선스만)

## 콘텐츠 추가

- 공식: `src/content/formulas/<slug>.md`, 패턴: `src/content/patterns/<category>/<slug>.md`, 레퍼런스: `src/content/references/<slug>.md`
- 필드는 `src/content.config.ts` 스키마를 따른다. `source`는 필수.
- 공식·패턴의 `refs`에 레퍼런스 slug를 넣으면 레퍼런스 상세 페이지의 "Regula에서 쓴 곳"에 자동으로 연결된다.
- 디자인 시스템 원본은 `DESIGN/<이름>/`(DESIGN.md · DESIGN.html · preview.html). 양식 항목은 `src/content/templates/<이름>.md`에 `design: <이름>`으로 연결한다. 토큰 표는 DESIGN.md의 ```css 블록에서 빌드 때 읽고, 파일들은 `public/design/`으로 자동 복사된다(직접 고치지 말 것).
- 기록장: `src/content/notes/<날짜>-<이름>.md` (kind: 본 것 · 메모 · 써 본 예시). `about`에 `formulas/<id>`, `patterns/<카테고리>/<id>`, `darkpatterns/<id>`, `references/<id>`를 넣으면 그 항목 아래 "내 기록"에 붙는다. 사용자가 무언가를 보여 주거나 써 봤다고 하면 기록을 남긴다 — 사용자가 하지 않은 일을 지어내지 않는다.
- 레퍼런스 `embed: true`는 iframe 안에서 실제로 열리는지 확인한 사이트에만 켠다.

## 규칙

- 섹션마다 별도 페이지다(src/pages/*.astro). 새 섹션은 홈에 붙이지 말고 페이지를 만들고 `src/lib/site.ts`의 nav에 등록한다. 작업 기록도 site.ts의 `log`에 추가한다.

- 출처를 반드시 남기고, 원문을 길게 옮기지 말고 내 말로 요약한다. 원문 전체를 가져오는 건 퍼블릭 도메인·CC0·MIT 등 자유 라이선스일 때만.
- 토큰(src/styles/tokens.css, PLAN §5)과 서체는 바꾸지 않는다. 강조는 노란 형광펜(--mark) 하나만.
- 모바일 400px에서 가로 스크롤이 생기지 않아야 한다. 표와 수식만 자체 가로 스크롤 허용.
- 미니 목업은 흑백 와이어프레임. 특정 브랜드 화면을 그대로 옮기지 않는다.
