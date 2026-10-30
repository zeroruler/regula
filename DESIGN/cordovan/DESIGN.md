# DESIGN.md — Cordovan 디자인 시스템

순백 캔버스 위의 잉크와 옥스블러드. 이 문서의 값만 사용하고, 없는 색상·크기·폰트를 임의로 추가하지 않는다.

**컨셉 한 줄**: 화면의 95%는 흰 여백과 잉크빛 활자. 색은 눌러야 할 곳 단 한 군데에만 켜진다.

**재질 노트 — 이름과 디자인의 관계**: 코도반은 결과 모공이 보이지 않는 가죽이다. 값이 나가는 이유가 질감이 아니라 **매끈함과 색의 깊이**에 있다. 그래서 이 시스템은 평평하다. 가죽 무늬를 그리지 않는 것이 이 재질에 충실한 방식이고, 질감을 얹는 순간 재질에서 멀어진다.

**세 가지 시그니처** — 이 시스템을 다른 시스템과 구별하는 것:
1. **한 화면 한 색** (§2) — 옥스블러드는 화면당 주요 액션 하나에만. 그래서 눌러야 할 곳이 즉시 보인다.
2. **초광폭 모노 라벨** (§3) — 섹션 머리말·지표 이름·표 헤더는 전부 대문자 모노. 오래된 계기판 같은 인상을 만든다.
3. **반투명 머티리얼** (§4) — 고정 헤더·시트·모달 배경은 뒤가 비친다. 깊이를 그림자가 아니라 재질로 만든다.

**문서 사용법**: §1 토큰을 그대로 복사해 시작 → §2~§8 규칙에 따라 조합 → 판단이 애매하면 §9 빠른 결정 규칙.

---

## 1. Design Tokens (모든 값의 원본 — 여기 외에 값을 정의하지 않는다)

```css
:root {
  /* Key — 옥스블러드. 인터랙티브(버튼·링크·포커스·활성) 전용 */
  --key: #7C2B3B;
  --key-hover: #67222F;
  --key-active: #541B26;
  --key-soft: #F8ECEE;              /* 선택 배경, 강조 뱃지 배경 */
  --key-soft-border: #EFD8DC;
  --key-text: #7C2B3B;              /* 밝은 배경 위 링크 (흰 배경 대비 9.3:1) */
  --key-on: #FFFFFF;                /* --key로 채운 면 위의 텍스트 — 다크에서는 잉크로 뒤집힌다 */

  /* Neutral — 무채색 그래파이트. 화면의 95% */
  --bg: #F6F4F4;                    /* 페이지 배경 (카드가 얹히는 바닥) */
  --surface: #FFFFFF;               /* 카드, 모달, 입력창 — 문서형 페이지는 이 색이 배경 */
  --surface-sunken: #EDEAEA;        /* 스켈레톤, 비활성, 코드 블록 */
  --border: #E8E4E4;                /* 카드 테두리, 구분선 */
  --border-strong: #D8D3D3;         /* 입력창 테두리 */
  --ink: #171215;                   /* 제목, 강조 (순흑 금지 — 와인빛 한 방울) */
  --ink-secondary: #5E5458;         /* 본문, 설명 */
  --ink-tertiary: #736A6D;          /* 플레이스홀더, 비활성, 타임스탬프 */

  /* Semantic — 키 컬러와 절대 헷갈리지 않는 색만. Soft는 뱃지·배너 배경용 */
  --danger:  #C2381F;  --danger-soft:  #FCEDE9;  --danger-soft-text:  #A32D17;
  --success: #1F6E4A;  --success-soft: #E7F2EC;  --success-soft-text: #1B5E3F;
  --warning: #8F6100;  --warning-soft: #FBF0DC;  --warning-soft-text: #7A5300;
  --info:    #2C5D8F;  --info-soft:    #E9EFF6;  --info-soft-text:    #24507C;

  /* Chart — 사용 순서 고정. 버튼·링크·아이콘에 사용 금지 */
  --chart-1: #7C2B3B;  /* Oxblood */
  --chart-2: #2C5D8F;  /* Indigo — 천연 염료 */
  --chart-3: #C08A2E;  /* Whiskey — 실재하는 코도반 색상명 */
  --chart-4: #3F7D6E;  /* Verdigris — 시간이 앉힌 녹청 */
  --chart-5: #8B8489;  /* Ash — "기타" 묶음용 */
  /* 다섯 색 모두 염료·무두질·에이징 계열 이름이다. 임의로 바꾸지 않는다 */

  /* Radius — 애플식으로 한 단계씩 크다 */
  --radius-sm: 6px;    /* 체크박스, 작은 태그 */
  --radius-md: 10px;   /* 버튼, 입력창 — 기본값 */
  --radius-lg: 14px;   /* 카드, 드롭다운, 이미지 */
  --radius-xl: 20px;   /* 모달, 시트, 큰 패널 */
  /* pill 뱃지 9999px, 아바타 50% */

  /* Shadow — 항상 잉크색 기반. 순흑·파란기 금지 */
  --shadow-1: 0 1px 2px rgba(23,18,21,0.06);     /* 살짝 뜬 카드, 입력창 */
  --shadow-2: 0 4px 12px rgba(23,18,21,0.07);    /* hover 카드 */
  --shadow-3: 0 10px 28px rgba(23,18,21,0.10);   /* 드롭다운, 토스트 */
  --shadow-4: 0 24px 60px rgba(23,18,21,0.16);   /* 모달 */
  --focus-ring: 0 0 0 3px rgba(124,43,59,0.22);  /* 모든 인터랙티브 요소 필수 */

  /* Material — 시그니처. 뒤가 비치는 레이어 (§4 Navigation·Modals) */
  --material-bg: rgba(255,255,255,0.72);
  --material-blur: saturate(180%) blur(20px);
  --material-border: rgba(23,18,21,0.08);

  /* z-index — 이 6단계만. 임의 값 금지 */
  --z-header: 100; --z-dropdown: 200; --z-backdrop: 300;
  --z-modal: 400;  --z-toast: 500;    --z-tooltip: 600;

  /* Typography — 라틴은 앞 폰트가, 한글은 뒤 폰트가 받는다 (§3) */
  --font-display: "Bricolage Grotesque", "Wanted Sans Variable", "Wanted Sans", sans-serif;
  --font-sans: "Wanted Sans Variable", "Wanted Sans", -apple-system, BlinkMacSystemFont, sans-serif;
  --font-mono: "Martian Mono", ui-monospace, "SF Mono", Menlo, monospace;  /* 라벨 전용 — §3 규칙 */

  /* Motion */
  --ease: cubic-bezier(0.32, 0.72, 0, 1);   /* 빠르게 출발해 길게 안착 */
  --dur-fast: 140ms;   /* hover, 버튼 */
  --dur-base: 260ms;   /* 드롭다운, 모달 등장 */
  --dur-slow: 420ms;   /* 페이지 전환, 차트 최초 그리기 */

  /* Layout */
  --container: 1200px;  /* 본문 중심 페이지는 720px */
  /* breakpoint: mobile <640px / tablet 640–1024px / desktop ≥1024px */
}

/* Dark mode — 나머지 토큰은 동일 */
[data-theme="dark"] {
  --bg: #0E0C0D;
  --surface: #1A1719;
  --surface-sunken: #241F22;
  --border: #2E282B;
  --border-strong: #423B3F;
  --ink: #F5F1F2;
  --ink-secondary: #ADA3A7;
  --ink-tertiary: #8E8388;
  --key: #D4667B;               /* 빛을 받은 면 — 밝게 올린 옥스블러드 (대비 5.1:1) */
  --key-hover: #E07A8D;
  --key-text: #D4667B;
  --key-soft: #33191F;
  --key-soft-border: #4A252E;
  --key-on: #171215;            /* 다크의 key는 밝으므로 흰 텍스트가 아니라 잉크를 얹는다 */
  /* Semantic도 다크에서 밝게 올린다 — 라이트 값 그대로 두면 전부 대비 미달 */
  --danger:  #E8674A;  --danger-soft:  #3A1B14;  --danger-soft-text:  #F0A491;
  --success: #3E9E6E;  --success-soft: #122E20;  --success-soft-text: #8CCBA9;
  --warning: #C99433;  --warning-soft: #332400;  --warning-soft-text: #DDB160;
  --info:    #6FA3D8;  --info-soft:    #14243A;  --info-soft-text:    #9DBEDE;
  --material-bg: rgba(26,23,25,0.72);
  --material-border: rgba(245,241,242,0.10);
  /* 다크 모드에서는 그림자 대신 surface 밝기 단계로 깊이 표현 */
}
```

**폰트 로드**:
- Wanted Sans: `https://cdn.jsdelivr.net/gh/wanteddev/wanted-sans@v1.0.3/packages/wanted-sans/fonts/webfonts/variable/complete/WantedSansVariable.css`
- Bricolage Grotesque: `https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400..800&display=swap`
- Martian Mono: `https://fonts.googleapis.com/css2?family=Martian+Mono:wght@400..700&display=swap`
- 셋 외 폰트 추가 금지.

---

## 2. Color Rules (색 사용 규칙)

1. **한 화면 한 색.** `--key`로 채운 요소는 한 화면에 **하나**. 두 번째 액션부터는 Secondary·Ghost로 내린다. 이것이 이 시스템의 첫 번째 시그니처다
2. 링크·활성 탭·포커스 링·선택 상태는 `--key`를 써도 개수에 포함하지 않는다 — 규칙의 대상은 **면으로 채운 것**뿐
3. **`--key`와 `--danger`는 절대 나란히 두지 않는다.** 둘 다 붉은 계열이라 같은 화면에 채워진 면으로 공존하면 구분이 무너진다. 파괴적 동작은 §4 규칙대로 **테두리형**으로만 (형태로 구분, 색으로 구분하지 않음)
4. 순흑 `#000000` 금지. 텍스트는 항상 `--ink`(와인빛이 한 방울 섞인 잉크)
5. 그라데이션 금지 (배경·버튼·오버레이 전부. 예외: 차트의 단일색 농도 변화)
6. **질감 금지** — 가죽결·노이즈·종이결·박음질 무늬를 면에 얹지 않는다. 이름이 가죽이라고 가죽을 그리는 것은 이 재질을 오해한 것이다(위 재질 노트). 깊이가 필요하면 질감이 아니라 §4의 머티리얼로 만든다
7. Chart 색은 차트·일러스트 전용
8. 배경 선택: 카드가 얹히는 앱 화면은 `--bg`, 글이 중심인 문서 페이지는 `--surface`(흰색)를 배경으로 쓴다. 한 페이지 안에서 섞지 않는다
9. 새 텍스트/배경 조합을 만들면 WCAG AA(4.5:1) 확인. §1 조합은 모두 검증됨 (`--key` 위 흰 텍스트 9.3:1)

---

## 3. Typography (타이포그래피)

### 두 활자가 한 줄을 나눠 쓴다
`--font-display`·`--font-sans`는 폰트를 두 개 나열한다. 브라우저가 글자마다 갈라 쓰므로 **영문·숫자는 앞 폰트, 한글은 뒤 폰트**가 받는다. 개성은 라틴에서 뽑고 한글은 가독성을 지키는 구조이니, 순서를 바꾸지 않는다.

### Scale
| 역할 | 폰트 | 크기 | 굵기 | 행간 | 자간 |
|------|------|------|------|------|------|
| Display | display | 56px | 700 | 1.02 | -0.04em |
| H1 | display | 40px | 700 | 1.08 | -0.035em |
| H2 | sans | 30px | 700 | 1.2 | -0.03em |
| H3 | sans | 22px | 600 | 1.35 | -0.02em |
| H4 | sans | 18px | 600 | 1.45 | -0.01em |
| Body Large | sans | 18px | 400 | 1.7 | 0 |
| Body | sans | 16px | 400 | 1.65 | 0 |
| Small | sans | 14px | 400 | 1.55 | 0 |
| Caption | sans | 13px | 500 | 1.5 | 0 |
| **Label** | **mono** | **11px** | **600** | **1.3** | **0.1em, 대문자** |
| Metric | mono | 32px | 700 | 1 | -0.05em |
| Button | sans | 15px | 600 | 1 | -0.01em |
| Code | mono | 13px | 400 | 1.6 | 0 |

### Rules
- 굵기는 400/600/700만 (읽는 글 400, 누르는 것·소제목 600, 제목 700). 300·500·800 금지
- 본문 최소 16px, 행간 1.65 (한글 가독성 기준). 14px 이하는 보조 정보만, 11px 미만 금지
- **제목의 음수 자간은 이 시스템의 밀도다.** 22px 이상 제목은 표의 자간 값을 반드시 적용한다. 자간 0인 큰 제목은 이 시스템이 아니다
- 표 형태 숫자(금액·통계)는 `font-variant-numeric: tabular-nums`
- Display·H1은 한 화면에 하나. 3줄을 넘기지 않는다

### 모노 라벨 규칙 — 이 시스템의 시그니처
- **쓰는 곳 (이곳만)**: 섹션 머리말(overline), 지표·통계 이름, 표 헤더, 타임스탬프·ID·버전 번호, 차트 축 라벨, 큰 숫자(Metric)
- **금지**: 본문, 버튼 라벨, 내비게이션 링크, 제목, 두 단어를 넘는 문장
- 항상 대문자 + 자간 0.1em. 소문자 모노 라벨은 쓰지 않는다
- **한글은 모노를 쓰지 않는다** (Martian Mono에 한글이 없고, 한글엔 대문자도 없다). 한글 라벨은 `--font-sans` 12px/600/자간 0.06em로 대체한다. 영문·숫자로 쓸 수 있는 라벨이라면 영문을 택하는 편이 이 시스템의 톤에 맞다
- 라벨이 흔해지면 시그니처가 죽는다. 한 화면에 5개까지

---

## 4. Components (컴포넌트)

### 상태 공통 규칙 (모든 인터랙티브 요소)
| 상태 | 규칙 |
|------|------|
| Hover | 배경 한 단계 어둡게, `--dur-fast` — 크기 변화 금지 |
| Active | 배경 두 단계 어둡게, `scale(0.97)` 허용 |
| Focus | `--focus-ring` — 예외 없음. `outline: none` 후 대체 없이 방치 금지 |
| Disabled | 배경 `--surface-sunken`, 텍스트 `--ink-tertiary`, 테두리 `--border`, `cursor: not-allowed`. opacity로 흐리게 하지 말 것 |
| Loading | 텍스트를 16px 스피너로 교체, **폭 유지**, 클릭 잠금 |

- Disabled 버튼은 최후의 수단 — 가능하면 활성 상태로 두고 눌렀을 때 부족한 것을 안내

### Buttons
공통: radius `--radius-md`, 15px/600/자간 -0.01em, transition `--dur-fast`. 높이: Large 48 / Medium 40 / Small 32px. 패딩 10px 20px(Medium). **화면당 Primary 1개** (§2-1).

| 종류 | 배경 | 텍스트 | 테두리 | Hover | 용도 |
|------|------|--------|--------|-------|------|
| Primary | `--key` | `--key-on` | — | `--key-hover` | 화면의 핵심 동작 하나 ("시작", "저장") |
| Secondary | `--surface` | `--ink` | 1px `--border-strong` | 배경 `--surface-sunken` | 일반 동작 ("취소", "더 보기") |
| Ghost | 투명 | `--ink-secondary` | — | 배경 `--surface-sunken` | 툴바, 3순위 |
| Danger | 투명 | `--danger` | 1px `--danger` | 배경 `--danger-soft` | 파괴적 동작 — 확인 모달 필수 |

- **Danger는 절대 채우지 않는다.** "채워진 색면 = 진행", "빨간 테두리 = 파괴적 행동"으로 형태부터 갈라야 옥스블러드와 헷갈리지 않는다 (§2-3)
- 확인 모달 안에서도 마찬가지 — 모달의 삭제 버튼 역시 테두리형

### Cards
- `--surface` 배경, 1px `--border`, radius `--radius-lg`, 패딩 20~24px. 그림자는 기본 없음(테두리로 충분) → 필요시 `--shadow-1`
- 클릭 가능한 카드: hover 시 `--shadow-2` + `translateY(-2px)`, `--dur-fast`
- 카드에 색 배경 금지 (강조 영역만 `--key-soft` 허용, 한 화면 1개)
- 카드 머리말은 모노 라벨 → 그 아래 제목 순서 (§3)

### Inputs
- 높이 40px(기본)/48px(큰 폼), `--surface` 배경, 1px `--border-strong`, radius `--radius-md`, 패딩 10px 12px
- 텍스트 16px `--ink`, 플레이스홀더 `--ink-tertiary`
- Focus: 테두리 `--key` + `--focus-ring` / 오류: 테두리 `--danger` + 아래 13px `--danger` 도움말
- 라벨 필수: 14px/600 `--ink`, 입력창 위 6px. 플레이스홀더로 라벨 대체 금지

### Badges
- pill(9999px), 패딩 3px 10px, 11px/600 대문자 모노 + 자간 0.08em (한글이면 12px/600 sans)
- `*-soft` 배경 + `*-soft-text` 텍스트 조합 (중립: `--surface-sunken` + `--ink-secondary`, 강조: `--key-soft` + `--key-text`)

### Navigation
- 고정 헤더: `--material-bg` + `backdrop-filter: var(--material-blur)`, 하단 1px `--material-border`, 높이 60px, `--z-header`. **투명 배경으로 두지 말 것** — 뒤가 비치는 것이 시그니처이지, 안 보이는 것이 아니다
- 링크 15px/500 `--ink-secondary` → hover/활성 `--ink` (색 변화만, 밑줄·배경 금지). 활성 항목만 하단 2px `--key` 밑줄 허용
- 우측 Primary 버튼 1개. 이것이 그 화면의 유일한 Primary인 경우가 많다
- 모바일: 햄버거 → 전체 화면 드로어 (드로어도 머티리얼 배경)

### Modals / Sheets / Dropdowns / Toast
| 요소 | 스타일 |
|------|--------|
| 모달 | `--surface`, radius `--radius-xl`, 패딩 24px, `--shadow-4`, 백드롭 `rgba(23,18,21,0.4)` + `blur(4px)`. 모달 위 모달 금지 — 내용 교체로 해결 |
| 시트(모바일) | 하단에서 올라옴, 상단만 radius `--radius-xl`, 상단 중앙 36×4px `--border-strong` 손잡이, 배경 `--material-bg` + 블러 |
| 드롭다운 | radius `--radius-lg`, 1px `--border`, `--shadow-3`, 항목 hover `--surface-sunken` |
| 토스트 | 우하단(모바일: 하단 중앙, 폭-40px), 배경 `--ink`, 텍스트 `#F5F1F2`, radius `--radius-lg`, 패딩 12px 16px, `--shadow-3`, 4초 자동 닫힘. 성공/오류는 좌측 아이콘 색으로만 구분 |

### Icons
- **Phosphor Icons, Regular 굵기만.** 크기 16/20/24px, 색은 주변 텍스트 색을 따름
- 강조가 필요하면 Bold 굵기로 올리되 색은 그대로 — 아이콘에 `--key`를 칠하지 않는다 (§2-1의 개수를 잡아먹는다)
- filled·이모지 아이콘 금지

---

## 5. Feedback Patterns (로딩 · 빈 화면 · 오류)

### Loading
- 1초 미만 예상 → 아무것도 표시하지 않음
- 영역 로딩 = 스켈레톤: `--surface-sunken`, 콘텐츠와 같은 자리·크기·radius, 투명도 1→0.55→1 를 1.6초 반복. **shimmer 금지**. 텍스트 자리는 높이 14~16px, 폭 60~90% 랜덤
- 스피너는 버튼 내부(16px)·작은 영역만. 전체 화면 스피너는 앱 최초 진입 1곳만
- 3초 이상 작업엔 진행 텍스트 병행. 진행률을 알면 모노 라벨로 `43%` 표기

### Empty State
구성 순서 고정: ① Phosphor 아이콘 40px `--ink-tertiary` ② 제목 22px/600/자간 -0.02em — 가능성을 말할 것 ("첫 프로젝트를 만듭니다") ③ 설명 14px `--ink-secondary` 1~2줄 ④ 버튼 1개(핵심 흐름이면 Primary). 중앙 정렬, 상하 패딩 64px+.
검색 결과 없음: 검색어 표시 + 대안 제시.

### Error
- 폼 오류: 해당 입력창에 인라인 (상단에 몰아서 표시 금지)
- 영역 오류: Empty State 구성 + "다시 시도" Secondary 버튼
- 전체 페이지(404/500): `--surface` 배경 + Display 크기 숫자를 모노로 (`404`) + 홈으로 Primary 버튼 1개
- 오류에 채워진 빨강 배경 금지 — `--danger-soft`까지만

---

## 6. Imagery & Charts (이미지 · 일러스트 · 차트)

### 사진
- 대비를 살리고 채도는 낮게. 그림자가 또렷한 스튜디오·건축 사진 쪽이 맞고, 노랗게 물든 필름 톤은 이 시스템이 아니다
- radius `--radius-lg`, 카드 내부는 상단만 `14px 14px 0 0`, 아바타 원형. 테두리 금지(구분 필요시 `--shadow-1`)
- 텍스트 오버레이: `rgba(23,18,21,0.5)` 단색 레이어 + 흰 텍스트 (그라데이션 오버레이 금지)

### 일러스트
- 선 굵기가 일정한 평면 라인 스타일 + 단색 면. 색 3개까지: `--ink` + `--border-strong` 기본, 필요시 `--key` 하나만 포인트로
- 3D·그라데이션·과장된 표정 금지. 용도: 빈 화면, 온보딩, 404 — 기능성 UI 내부 금지
- 우선순위: 아이콘으로 충분하면 아이콘 → 설명이 필요하면 일러스트 → 실물·인물만 사진. 한 화면에 혼용 금지

### 차트
- 색은 `--chart-1`~`--chart-5` 순서 고정. **시리즈 1개면 `--chart-1`만.** 범주 6개 이상 → 상위 4 + "기타"(`--chart-5`)
- 증감: 상승 `--success`, 하락 `--danger` / 단계(히트맵): `--key-soft` → `--key` 농도 변화
- 항상 흰 카드 안에. 가로 그리드선만(`--border`), **축 라벨과 범례는 모노 대문자 11px** `--ink-tertiary` + tabular-nums (§3)
- 큰 숫자 하나를 보여주는 지표 카드: 모노 32px/700/자간 -0.05em, 그 아래 모노 라벨
- 막대: 상단 radius 4px, 간격은 막대 폭의 50%+ / 파이·도넛: 5조각 이하만, 넘으면 막대로
- 애니메이션은 최초 1회 `--dur-slow`만

---

## 7. Layout & Responsive (레이아웃 · 반응형)

### Spacing
- **4px 배수만**: 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96, 128
- 리듬: 컴포넌트 내부 8~16 / 컴포넌트 사이 16~24 / 카드 사이 24 / 섹션 사이 96~128 (모바일 56~72)
- 구분선보다 여백 우선 — 선 긋기 전에 여백을 2배로 늘려볼 것
- 섹션 간격이 이 시스템에서 가장 큰 값이다. 여백이 좁으면 활자의 밀도가 답답함으로 바뀐다

### Grid
- 최대 폭 `--container`(1200px), 본문 중심 페이지 720px. 좌우 여백: 데스크톱 32 / 모바일 20px
- 카드 그리드: 3열 → 2열(tablet) → 1열(mobile), gap 24px

### Responsive
| 구간 | 폭 | 규칙 |
|------|-----|------|
| Mobile | <640px | 1열, 여백 20px, 섹션 간격 56px, 버튼 전체 폭 허용 |
| Tablet | 640–1024px | 2열, 여백 24px |
| Desktop | ≥1024px | 3열, 최대 1200px, 여백 32px |

- 타이포 축소: Display 56→36 / H1 40→30 / H2 30→24 / Metric 32→26. **본문 16px은 모든 화면 유지**
- **음수 자간은 모바일에서도 유지한다.** 크기만 줄이고 밀도는 그대로
- 모노 라벨은 모바일에서 11px 유지 (더 줄이면 읽히지 않는다)
- 터치 타깃 최소 44×44px (작은 아이콘 버튼도 터치 영역은 확보)
- 표: 모바일에서 가로 스크롤 또는 카드형 변환

---

## 8. Motion · Voice · Accessibility

### Motion
- `--dur-fast` hover·버튼 / `--dur-base` 드롭다운·모달·시트 / `--dur-slow` 페이지 전환. easing은 `--ease`
- 등장: 아래서 8px 올라오며 fade-in / 퇴장: fade-out만(이동 없이, 등장의 ½ 시간)
- 시트는 아래에서 위로 밀려 올라오고, 같은 경로로 내려간다 (페이드로 사라지지 않는다)
- 무한 반복·바운스 금지 (예외: 스켈레톤 1.6초 펄스). `prefers-reduced-motion` 시 전부 비활성화

### Voice & Tone (UI 문구)
- **합니다체, 짧게.** "저장되었어요" ❌ → "저장했습니다" ⭕
- 버튼은 명사 또는 동사 원형 2~4글자: "저장", "계속", "보고서 열기". "~하기", "클릭하세요" 금지
- 문장 하나에 정보 하나. 두 문장이 되면 둘째 문장을 지울 수 있는지 먼저 본다
- 오류 = 무엇이 잘못됐는지 + 해결법: "이메일 형식이 올바르지 않습니다. @를 포함해 주십시오"
- 느낌표·이모지 금지. 감탄 대신 구체적인 숫자를 쓴다

### Accessibility
- 대비 AA: 본문 4.5:1, 24px+ 텍스트 3:1. §1의 모든 조합은 라이트·다크 양쪽에서 검증되었다
- **모노 라벨은 `--ink-tertiary`를 쓰되 이 값은 4.5:1을 통과하는 회색이다.** 라벨은 지표의 이름을 담으므로 장식이 아니다 — 더 흐리게 내리지 않는다
- **`--key` 위의 텍스트는 항상 `--key-on`.** 라이트에서는 흰색, 다크에서는 잉크다. 다크의 key는 밝은 로즈라 흰 텍스트를 얹으면 3.5:1로 미달한다
- 색에만 의존 금지 — 상태는 항상 아이콘/텍스트 병행. **특히 `--key`와 `--danger`는 색맹 사용자에게 거의 같은 색이므로, 형태(채움 vs 테두리)로 반드시 구분한다** (§4 Buttons)
- 모노 라벨은 자간이 넓어 스크린리더가 철자를 끊어 읽지 않도록 `text-transform: uppercase`로 처리하고 원문은 소문자로 둔다
- Tab 키만으로 전 기능 도달, 포커스 링 필수
- 모든 입력창에 라벨, 의미 있는 이미지에 alt (장식은 alt="")
- 머티리얼 위의 텍스트는 배경이 비쳐도 4.5:1이 유지되는지 확인 — 안 되면 `--material-bg`의 불투명도를 0.85까지 올린다
- 페이지 `lang="ko"`

---

## 9. Quick Decision Rules (빠른 결정 규칙)

판단이 애매할 때 이 표 순서로 해결한다.

| 고민 | 답 |
|------|-----|
| 색 | 화면에서 가장 중요한 동작 하나 → `--key`. 나머지 전부 → 뉴트럴. 그래도 안 되면 semantic |
| 이미 `--key`를 썼는데 또 필요하면 | 둘 중 덜 중요한 쪽을 Secondary로 내린다. 예외 없음 |
| 폰트 | 제목은 display, 나머지는 sans. mono는 §3의 라벨 자리에만 |
| 굵기 | 읽는 글 400 / 누르는 것·소제목 600 / 제목 700 |
| 자간 | 22px 이상 제목은 반드시 음수, 모노 라벨은 +0.1em, 본문은 0 |
| 간격 | 4px 배수 중 큰 쪽 (여백은 넘치는 게 낫다) |
| 모서리 | 작은 것 6 / 누르는 것 10 / 담는 것 14 / 띄우는 것 20px |
| 그림자 | 일단 테두리만 → 부족하면 `--shadow-1`부터. 화면에 고정되는 것은 그림자 대신 머티리얼 |
| 삭제 버튼 | 언제나 테두리형. 채우지 않는다 |
| 차트 색 | 1개 → `--chart-1`만 / 여러 개 → 순서대로 / 6개+ → 상위 4 + 기타 |
| 겹침 | §1 z-index 6단계 중 하나 — 새 값 발명 금지 |

### 자주 쓰는 조합 (복사용)
- **히어로**: `--surface` 배경, 모노 라벨 11px → 제목 56px display/700/1.02/-0.04em `--ink` → 부제 18px sans/400/1.7 `--ink-secondary` → Primary 1개 + Ghost 1개
- **카드**: `--surface`, 1px `--border`, radius 14px, 패딩 24px, 모노 라벨 → 제목 22px/600/-0.02em → 본문 16px/400/1.65 `--ink-secondary`
- **지표 카드**: 모노 라벨 11px `--ink-tertiary` → 숫자 32px mono/700/-0.05em `--ink` → 증감 13px `--success`/`--danger` + 화살표 아이콘
- **고정 헤더**: 높이 60px, `--material-bg` + `backdrop-filter: var(--material-blur)`, 하단 1px `--material-border`, 좌측 로고 + 중앙 링크 15px/500 + 우측 Primary 1개
- **빈 화면**: 아이콘 40px `--ink-tertiary` + 제목 22px/600 + 설명 14px + 버튼 1개, 중앙 정렬, 패딩 64px+
