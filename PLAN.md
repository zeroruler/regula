# Regula 기획안

> 디자인을 공부하면서 찾은 공식, UI 패턴, 페이지 양식을 한 곳에 쌓는 개인 디자인 규칙집.
> 감으로 고르던 값을 이유가 있는 값으로 바꾸는 게 목표.

- 시작일: 2026-10-30
- 현재 버전: v0.2 (Astro). v0.1 원본은 `regula.html`로 보존
- 작성자: zero_ruler

---

## 1. 이름

**Regula** (라틴어) — ① 자, 곧은 막대 ② 규칙, 기준.

- 공식(측정 가능한 규칙)과 패턴(사용 규칙)을 모두 포괄한다.
- 닉네임 zero_ruler의 ruler를 라틴어로 옮긴 이름.
- 같은 라틴어 계열인 Lecto와 나란히 둘 수 있다.

## 2. 목표

1. **공식은 공식으로 남긴다.** 황금비, 타입 스케일, 간격, 대비처럼 숫자로 표현되는 규칙은 수식 + 의미 + 출처로 기록한다.
2. **패턴은 사용 기준까지 남긴다.** "어떻게 생겼나"보다 "언제 쓰고 언제 피하나"를 기록한다.
3. **직접 만든 디자인 양식을 재사용 가능한 형태로 모은다.** (Cordovan 등)
4. **자료를 계속 쌓는다.** 콘텐츠 추가가 코드 수정 없이 파일 하나 추가로 끝나야 한다.

### 하지 않을 것

- 남의 디자인 시스템을 통째로 복사하기 (참고는 하되 내 말로 정리)
- 출처 없는 규칙 추가하기
- 카드·박스를 남발하는 AI스러운 레이아웃

## 3. 정보 구조

| § | 섹션 | 내용 | 현재 상태 |
|---|------|------|-----------|
| 1 | 원리와 공식 | 수식 + 의미 + 출처. 일부는 인터랙티브 실험 | 11개 + 황금비 실험 |
| 2 | 계산 도구 | 타입 스케일, 명도 대비, 간격 스케일 | 3개 |
| 3 | UI 패턴 | 컴포넌트별 사용 기준, 미니 목업, 비교표 | 알림 9가지 |
| 4 | 페이지 양식 | 직접 만든 디자인 시스템·페이지 템플릿 | Cordovan (색은 근사치) |
| 5 | 레퍼런스 | 책, 디자인 시스템, GitHub, 커뮤니티. 봤음 체크 | 24개 |
| 6 | 작업 기록 | 버전별 변경 내역, 다음 할 일 | v0.1 |

## 4. 콘텐츠 작성 규칙

### 공식 (§1)

각 항목은 다음 필드를 가진다.

```yaml
name: 황금비
equation: φ = (1 + √5) / 2 ≈ 1.618
meaning: 한두 문장. 왜 이 값인지, 어디에 쓰는지.
source: 원저자 · 책/문서 이름 (필수)
note: 직접 써 보고 느낀 점 (선택, 나중에 추가)
demo: true/false (인터랙티브 실험 여부)
```

### UI 패턴 (§3)

```yaml
name: 스낵바
en: Snackbar
category: 알림
intrusiveness: 4   # 1(조용함) ~ 9(흐름을 멈춤)
use_when: 되돌릴 수 있는 행동 직후. 액션 1개.
avoid_when: 버튼이 두 개 이상 필요할 때.
dismiss: 4–10초 · 호버하면 타이머 멈춤
actions: 1개
confused_with: 토스트 — 액션 유무가 유일한 차이
source: Material Design, SAP Fiori 등
```

- 같은 카테고리 안에서는 의미 있는 기준(예: 방해 정도)으로 정렬한다. 번호는 그 순서를 나타낼 때만 쓴다.
- 미니 목업은 흑백 와이어프레임으로 통일한다. 특정 브랜드 화면을 그대로 옮기지 않는다.

### 페이지 양식 (§4)

- 디자인 토큰(색, 타입, 간격, 반경)을 실제 값으로 기록한다.
- 사용처(어느 프로젝트에 썼는지)와 피하는 것(안티 패턴)을 같이 적는다.

### 레퍼런스 (§5)

- 제목 · 저자/기관 · 한 줄 요약 · 링크. 링크가 확실하지 않으면 비워 둔다.

## 5. 디자인 (Regula 자체)

콘셉트: **제도용 자.** 상단 눈금 띠, 좌측 고정 목차, 가는 선으로 구획.

| 토큰 | 라이트 | 다크 | 용도 |
|------|--------|------|------|
| `--paper` | `#F1F3F0` | `#111214` | 배경 |
| `--surface` | `#FFFFFF` | `#1A1C1F` | 도구·실험 영역 |
| `--ink` | `#15171A` | `#ECEDEA` | 본문, 선 |
| `--ink-2` | `#4A4F57` | `#AAAFB6` | 보조 글자 |
| `--ink-3` | `#7E848D` | `#6E747C` | 라벨, 캡션 |
| `--rule` | `#D3D7D2` | `#2C2F34` | 구분선 |
| `--mark` | `#F2C230` | `#F2C230` | 자의 노란색. 형광펜·강조에만 |
| `--error` | `#C2382D` | `#FF6E61` | 오류 상태 |

- 서체: 제목 Hahmlet / 본문 IBM Plex Sans KR / 라벨·수치 IBM Plex Mono (모두 Google Fonts)
- 강조는 노란 형광펜 하나만 쓴다. 글자를 노란색으로 칠하지 않는다(흰 배경에서 안 읽힘).
- 라이트·다크 둘 다 지원 (`prefers-color-scheme`).

## 6. 기술 방향

**추천: Astro + Markdown(MDX) 콘텐츠 컬렉션 → GitHub Pages 배포**

- 공식·패턴·레퍼런스를 각각 `.md` 파일 하나로 추가하면 페이지와 목록이 자동으로 생긴다. "자료를 쌓는다"는 목표에 가장 맞다.
- 출력은 정적 HTML이라 지금 파일의 CSS/JS를 거의 그대로 옮길 수 있다.
- 커밋 기록이 곧 공부 기록이 된다.

대안으로 빌드 없는 순수 HTML + JSON 데이터도 가능하지만, 항목이 50개를 넘으면 관리가 어려워진다.

### 제안 폴더 구조

```
regula/
├─ src/
│  ├─ content/
│  │  ├─ formulas/        # golden-ratio.md, type-scale.md …
│  │  ├─ patterns/
│  │  │  └─ feedback/     # toast.md, snackbar.md …
│  │  ├─ templates/       # cordovan.md
│  │  └─ references/      # refactoring-ui.md …
│  ├─ components/         # FormulaRow, PatternCard, MiniMock, Ruler …
│  ├─ demos/              # 인터랙티브 실험 (golden-ratio, contrast, type-scale)
│  ├─ layouts/
│  ├─ pages/
│  └─ styles/tokens.css
├─ public/
├─ PLAN.md
└─ CLAUDE.md
```

## 7. 로드맵

### v0.2 — 저장소로 옮기기
- [ ] GitHub 저장소 생성 (로컬 git과 Astro 초기화는 완료)
- [x] `regula.html`의 섹션을 컴포넌트 + 콘텐츠 파일로 분리
- [x] 기존 공식 11개, 패턴 9개, 레퍼런스 24개를 `.md`로 이전
- [ ] GitHub Pages 배포
- [x] 레퍼런스 "봤음" 체크는 localStorage 유지 (키를 slug로 바꿔 순서가 바뀌어도 유지)
- [x] 레퍼런스 상세 페이지: 내 정리 · Regula에서 쓴 곳 · 원문
  - 자유 라이선스 저장소(awesome-design-systems 3곳)는 README를 가져와 사이트 안에서 보고 거를 수 있음
  - 다른 페이지 안에 띄울 수 있는 사이트는 iframe 미리보기, 막힌 곳(Refactoring UI, Laws of UX, Material 3, NN/g, X, Mobbin)은 링크
  - 책은 원문 대신 내 정리만

### v0.3 — 양식 채우기
- [ ] Cordovan: Lecto의 DESIGN.md에서 실제 토큰 옮기기
- [ ] Regula 자체 토큰을 양식으로 등록
- [ ] 페이지 양식 1개 추가 (로그인 또는 설정 화면)

### v0.4 — 원리 확장
- [ ] 색 이론: 색상환, 보색·유사색, 60-30-10 실습
- [ ] 게슈탈트 법칙 도해 (근접성, 유사성, 연속성, 폐합, 공통 영역)
- [ ] 그리드: 12단 그리드, 거터, 브레이크포인트
- [ ] Dieter Rams의 좋은 디자인 10원칙

### v0.5 — 패턴 확장
- [ ] 버튼 (위계: primary/secondary/tertiary, 상태)
- [ ] 입력창과 폼 (라벨 위치, 검증 시점)
- [ ] 내비게이션 (탭 바, 사이드바, 브레드크럼)
- [ ] 빈 상태, 로딩 상태 (스켈레톤 vs 스피너)
- [ ] UX 라이팅 (오류 문구, 버튼 문구)

### 이후
- 검색 / 태그 필터
- 각 공식에 "직접 써 본 예시" 붙이기
- 공부한 날짜별 기록 페이지

## 8. 콘텐츠 백로그 (출처 후보)

- 책: Refactoring UI, Laws of UX, The Design of Everyday Things, Don't Make Me Think, Thinking with Type, Grid Systems in Graphic Design, Interaction of Color, The Elements of Typographic Style
- 디자인 시스템: Material 3, Apple HIG, 토스 TDS, 원티드 Montage, IBM Carbon, GOV.UK, GitHub Primer
- 저장소: alexpate/awesome-design-systems, klaufel/awesome-design-systems, cvega/awesome-design-systems
- 커뮤니티: Nielsen Norman Group, Steve Schoger(X), Learn UI Design, 디자인 나침반, 토스 기술 블로그, 오빠두 디자인 시스템 갤러리, Mobbin
- 인스타 릴스에서 본 것: 알림 9가지(§3 반영 완료), 황금비(§1 반영 완료)

## 9. Claude Code 작업 시 참고

- 현재 `regula.html`은 단일 파일로 동작하는 v0.1. 디자인과 콘텐츠의 기준으로 삼는다.
- 콘텐츠는 출처를 반드시 남기고, 원문을 길게 옮기지 말고 내 말로 요약한다.
- 새 섹션을 추가해도 토큰(§5)과 서체는 바꾸지 않는다.
- 모바일(400px)에서 가로 스크롤이 생기지 않아야 한다. 표와 수식만 자체 가로 스크롤 허용.
