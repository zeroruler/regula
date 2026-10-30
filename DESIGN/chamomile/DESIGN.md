# DESIGN.md — 통합 디자인 시스템

모든 웹사이트·앱에 적용하는 단일 디자인 기준. 이 문서의 값만 사용하고, 없는 색상·크기·폰트를 임의로 추가하지 않는다.

**컨셉 한 줄**: 따뜻한 크림 배경 위의 톤 다운된 세이지 그린 — 차분하고 정갈하며, 세리프 제목 하나만 은은하게 특별한.

**문서 사용법**: §1 토큰을 그대로 복사해 시작 → §2~§8 규칙에 따라 조합 → 판단이 애매하면 §9 빠른 결정 규칙.

---

## 1. Design Tokens (모든 값의 원본 — 여기 외에 값을 정의하지 않는다)

```css
:root {
  /* Primary — 세이지 그린. 인터랙티브(버튼·링크·포커스·활성) 전용 */
  --primary: #5A7359;
  --primary-hover: #4A614A;
  --primary-active: #3D523E;
  --primary-soft: #E9EFE5;          /* 선택 배경, 초록 뱃지 배경 */
  --primary-soft-border: #CBD8C6;
  --primary-text: #47603F;          /* 밝은 배경 위 초록 텍스트(링크) */

  /* Neutral — 웜 크림·샌드. 화면의 95% */
  --bg: #F9F7F2;                    /* 페이지 배경(크림) */
  --surface: #FFFFFF;               /* 카드, 모달, 입력창 */
  --surface-sunken: #F1EEE6;        /* 스켈레톤, 비활성, 코드 블록 */
  --border: #E7E3D8;                /* 카드 테두리, 구분선 */
  --border-strong: #D6D1C4;         /* 입력창 테두리 */
  --text: #26241F;                  /* 제목, 강조 (잉크색 — 순흑 금지) */
  --text-secondary: #5C574C;        /* 본문, 설명 */
  --text-tertiary: #A39D8F;         /* 플레이스홀더, 비활성, 타임스탬프 */

  /* Semantic — 전부 톤 다운 버전. Soft는 뱃지·배너 배경용 */
  --success: #4A7B52;  --success-soft: #E9F1E8;  --success-soft-text: #3D6644;
  --warning: #A16E2C;  --warning-soft: #F7EEDD;  --warning-soft-text: #8A5D24;
  --danger:  #B5524B;  --danger-soft:  #F7E9E7;  --danger-soft-text:  #9C443E;
  --danger-hover: #9C443E;
  --info:    #56789B;  --info-soft:    #E9EEF4;

  /* Chart — 사용 순서 고정. 버튼·링크·아이콘에 사용 금지 */
  --chart-1: #5A7359;  /* Sage */
  --chart-2: #BE7C5A;  /* Terracotta */
  --chart-3: #7B8FA3;  /* Slate */
  --chart-4: #C0A05C;  /* Ochre */
  --chart-5: #8A8478;  /* Warm Gray — "기타" 묶음용 */

  /* Radius */
  --radius-sm: 6px;    /* 체크박스, 작은 태그 */
  --radius-md: 8px;    /* 버튼, 입력창 — 기본값 */
  --radius-lg: 12px;   /* 카드, 드롭다운, 이미지 */
  --radius-xl: 16px;   /* 모달, 큰 패널 */
  /* pill 뱃지 9999px, 아바타 50% */

  /* Shadow — 항상 잉크색 기반. 순흑·파란기 금지 */
  --shadow-1: 0 1px 2px rgba(38,36,31,0.05);    /* 살짝 뜬 카드, 입력창 */
  --shadow-2: 0 2px 8px rgba(38,36,31,0.07);    /* hover 카드, 고정 헤더 */
  --shadow-3: 0 4px 16px rgba(38,36,31,0.09);   /* 드롭다운, 토스트 */
  --shadow-4: 0 12px 32px rgba(38,36,31,0.13);  /* 모달 */
  --focus-ring: 0 0 0 3px rgba(90,115,89,0.18); /* 모든 인터랙티브 요소 필수 */

  /* z-index — 이 6단계만. 임의 값 금지 */
  --z-header: 100; --z-dropdown: 200; --z-backdrop: 300;
  --z-modal: 400;  --z-toast: 500;    --z-tooltip: 600;

  /* Typography */
  --font-sans: "Pretendard Variable", Pretendard, -apple-system, "Noto Sans KR", sans-serif;
  --font-serif: "Noto Serif KR", "Source Serif 4", Georgia, serif;  /* 포인트 전용 — §3 규칙 */
  --font-mono: "JetBrains Mono", ui-monospace, "SF Mono", Menlo, monospace;

  /* Motion */
  --ease: cubic-bezier(0.2, 0, 0, 1);
  --dur-fast: 150ms;   /* hover, 버튼 */
  --dur-base: 250ms;   /* 드롭다운, 모달 등장 */
  --dur-slow: 400ms;   /* 페이지 전환, 차트 최초 그리기 */

  /* Layout */
  --container: 1120px;  /* 본문 중심 페이지는 720px */
  /* breakpoint: mobile <640px / tablet 640–1024px / desktop ≥1024px */
}

/* Dark mode — 나머지 토큰은 동일 */
[data-theme="dark"] {
  --bg: #1B1915;
  --surface: #26231D;
  --surface-sunken: #302C25;
  --border: #3E3A31;
  --text: #F2F0EA;
  --text-secondary: #B5AFA2;
  --text-tertiary: #7A7466;
  --primary: #8FAE8C;          /* 다크에서는 한 단계 밝은 세이지 */
  --primary-soft: #2A352A;
  /* 다크 모드에서는 그림자 대신 surface 밝기 단계로 깊이 표현 */
}
```

**폰트 로드**:
- Pretendard: `https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/variable/pretendardvariable-dynamic-subset.min.css`
- Noto Serif KR (600만): `https://fonts.googleapis.com/css2?family=Noto+Serif+KR:wght@600&display=swap`
- JetBrains Mono: Google Fonts. 셋 외 폰트 추가 금지

---

## 2. Color Rules (색 사용 규칙)

1. **인터랙티브 = `--primary` 하나뿐.** 누를 수 있는 것(버튼·링크·활성 상태·포커스)에만 사용. 장식 금지
2. 채도 높은 색은 시스템 어디에도 없다 — 상태 색도 §1의 톤 다운 버전만
3. 순흑 `#000000` 금지, 파란기 도는 차가운 회색 금지 — 항상 웜 톤
4. 그라데이션 금지 (배경·버튼·오버레이 전부. 예외: 차트의 단일색 농도 변화)
5. Chart 색은 차트·일러스트 전용
6. 새 텍스트/배경 조합을 만들면 WCAG AA(4.5:1) 확인. §1 조합은 모두 검증됨 (`--primary` 위 흰 텍스트 5.2:1)

---

## 3. Typography (타이포그래피)

### Scale
| 역할 | 폰트 | 크기 | 굵기 | 행간 | 자간 |
|------|------|------|------|------|------|
| Display (Serif) | serif | 44px | 600 | 1.3 | -0.01em |
| Display (Sans) | sans | 44px | 700 | 1.2 | -0.02em |
| H1 | sans | 34px | 700 | 1.25 | -0.02em |
| H2 | sans | 26px | 700 | 1.3 | -0.01em |
| H3 | sans | 21px | 600 | 1.35 | -0.01em |
| H4 | sans | 18px | 600 | 1.4 | 0 |
| Quote (Serif) | serif | 20px | 600 | 1.7 | 0 |
| Body Large | sans | 18px | 400 | 1.7 | 0 |
| Body | sans | 16px | 400 | 1.65 | 0 |
| Small | sans | 14px | 400 | 1.55 | 0 |
| Caption | sans | 13px | 500 | 1.5 | 0 |
| Overline | sans | 12px | 600 | 1.4 | 0.06em, 대문자 |
| Button | sans | 15px | 600 | 1 | 0 |
| Code | mono | 14px | 400 | 1.6 | 0 |

### Rules
- 고딕 굵기는 400/600/700만 (읽는 글 400, 누르는 것 600, 제목 700). 500·800 금지
- 본문 최소 16px, 행간 1.65 (한글 가독성 기준). 14px 이하는 보조 정보만, 12px 미만 금지
- 음수 자간은 26px 이상 고딕 제목만
- 표 형태 숫자(금액·통계)는 `font-variant-numeric: tabular-nums`

### 세리프 규칙 — 이 시스템의 시그니처
- **쓰는 곳 (이곳만)**: 랜딩 히어로 제목, 인용문·추천사, 온보딩/완료 화면 환영 문구, 매거진형 아티클 제목, (선택) 감성적 무게가 필요한 H1
- **금지**: 본문, 버튼, 입력창, 라벨, 내비게이션, 뱃지, 표 등 모든 기능성 UI 텍스트
- 항상 20px 이상, 굵기 600, 화면당 1~2개까지. 세리프가 흔해지면 시그니처가 죽는다

---

## 4. Components (컴포넌트)

### 상태 공통 규칙 (모든 인터랙티브 요소)
| 상태 | 규칙 |
|------|------|
| Hover | 배경 한 단계 어둡게, `--dur-fast` — 크기 변화 금지 |
| Active | 배경 두 단계 어둡게, `scale(0.98)` 허용 |
| Focus | `--focus-ring` — 예외 없음. `outline: none` 후 대체 없이 방치 금지 |
| Disabled | 배경 `--surface-sunken`, 텍스트 `--text-tertiary`, 테두리 `--border`, `cursor: not-allowed`. opacity로 흐리게 하지 말 것 |
| Loading | 텍스트를 16px 스피너로 교체, **폭 유지**, 클릭 잠금 |

- Disabled 버튼은 최후의 수단 — 가능하면 활성 상태로 두고 눌렀을 때 부족한 것을 안내

### Buttons
공통: radius `--radius-md`, 15px/600, transition `--dur-fast`. 높이: Large 48 / Medium 40 / Small 32px. 패딩 10px 20px(Medium). **페이지당 Primary 1~2개.**

| 종류 | 배경 | 텍스트 | 테두리 | Hover | 용도 |
|------|------|--------|--------|-------|------|
| Primary | `--primary` | #FFF | — | `--primary-hover` | 핵심 동작 ("시작하기", "저장") |
| Secondary | `--surface` | `--text` | 1px `--border-strong` | 배경 `--surface-sunken` | 일반 동작 ("취소", "더 보기") |
| Ghost | 투명 | `--text-secondary` | — | 배경 `--surface-sunken` | 툴바, 3순위 |
| Danger | `--danger` | #FFF | — | `--danger-hover` | 파괴적 동작 — 확인 모달 필수 |

### Cards
- `--surface` 배경, 1px `--border`, radius `--radius-lg`, 패딩 20~24px. 그림자는 기본 없음(테두리로 충분) → 필요시 `--shadow-1`
- 클릭 가능한 카드: hover 시 `--shadow-2` + `translateY(-2px)`, `--dur-fast`
- 카드에 크림·초록 배경 금지 (강조 영역만 `--primary-soft` 허용)

### Inputs
- 높이 40px(기본)/48px(큰 폼), `--surface` 배경, 1px `--border-strong`, radius `--radius-md`, 패딩 10px 12px
- 텍스트 16px `--text`, 플레이스홀더 `--text-tertiary`
- Focus: 테두리 `--primary` + `--focus-ring` / 오류: 테두리 `--danger` + 아래 13px `--danger` 도움말
- 라벨 필수: 14px/600 `--text`, 입력창 위 6px. 플레이스홀더로 라벨 대체 금지

### Badges
- pill(9999px), 패딩 2px 10px, 12px/600. `*-soft` 배경 + `*-soft-text` 텍스트 조합 (중립: `--surface-sunken` + `--text-secondary`)

### Navigation
- 고정 헤더: `rgba(249,247,242,0.85)` + `backdrop-filter: blur(12px)`, 하단 1px `--border`, 높이 64px, `--z-header`
- 링크 15px/500 `--text-secondary` → hover/활성 `--text` (색 변화만, 밑줄·배경 금지). 우측 Primary 버튼 1개
- 모바일: 햄버거 → 전체 화면 드로어

### Modals / Dropdowns / Toast
| 요소 | 스타일 |
|------|--------|
| 모달 | `--surface`, radius `--radius-xl`, 패딩 24px, `--shadow-4`, 백드롭 `rgba(38,36,31,0.5)`. 모달 위 모달 금지 — 내용 교체로 해결 |
| 드롭다운 | radius `--radius-lg`, 1px `--border`, `--shadow-3`, 항목 hover `--surface-sunken` |
| 토스트 | 우하단(모바일: 하단 중앙, 폭-40px), 배경 `--text`, 텍스트 `#F2F0EA`, radius `--radius-lg`, 패딩 12px 16px, `--shadow-3`, 4초 자동 닫힘. 성공/오류는 좌측 아이콘 색으로만 구분(성공 `#8FAE8C`, 오류 `#D89088`) |

### Icons
- **Lucide outline만.** 크기 16/20/24px, stroke 1.75, 색은 주변 텍스트 색을 따름. filled·이모지 아이콘 금지

---

## 5. Feedback Patterns (로딩 · 빈 화면 · 오류)

### Loading
- 1초 미만 예상 → 아무것도 표시하지 않음
- 영역 로딩 = 스켈레톤: `--surface-sunken`, 콘텐츠와 같은 자리·크기·radius, 투명도 1→0.55→1 를 1.6초 반복. **shimmer 금지**. 텍스트 자리는 높이 14~16px, 폭 60~90% 랜덤
- 스피너는 버튼 내부(16px)·작은 영역만. 전체 화면 스피너는 앱 최초 진입 1곳만
- 3초 이상 작업엔 진행 텍스트 병행 ("파일을 올리고 있어요...")

### Empty State
구성 순서 고정: ① Lucide 아이콘 40px `--text-tertiary` ② 제목 16px/600 — 가능성을 말할 것 ("첫 프로젝트를 시작해 보세요") ③ 설명 14px `--text-secondary` 1~2줄 ④ 버튼 1개(핵심 흐름이면 Primary). 중앙 정렬, 상하 패딩 64px+.
검색 결과 없음: 검색어 표시 + 대안 제시.

### Error
- 폼 오류: 해당 입력창에 인라인 (상단에 몰아서 표시 금지)
- 영역 오류: Empty State 구성 + "다시 시도" Secondary 버튼
- 전체 페이지(404/500): 크림 배경 + 세리프 제목 허용 + 홈으로 Primary 버튼
- 오류에도 쨍한 빨강 배경 금지 — `--danger-soft`까지만

---

## 6. Imagery & Charts (이미지 · 일러스트 · 차트)

### 사진
- 따뜻한 자연광 톤, 채도·대비 살짝 낮게. 차가운 형광·플래시 톤 금지
- radius `--radius-lg`, 카드 내부는 상단만 `12px 12px 0 0`, 아바타 원형. 테두리 금지(구분 필요시 `--shadow-1`)
- 텍스트 오버레이: `rgba(38,36,31,0.55)` 단색 레이어 + 흰 텍스트 (그라데이션 오버레이 금지)

### 일러스트
- 평면 라인 스타일(Lucide stroke 감각) + 단색 면. 색 3개까지: `--primary` + `--border-strong` 기본, 필요시 `--chart-2` 추가
- 3D·그라데이션·과장된 표정 금지. 용도: 빈 화면, 온보딩, 404 — 기능성 UI 내부 금지
- 우선순위: 아이콘으로 충분하면 아이콘 → 감정이 필요하면 일러스트 → 실물·인물만 사진. 한 화면에 혼용 금지

### 차트
- 색은 `--chart-1`~`--chart-5` 순서 고정. **시리즈 1개면 `--chart-1`만.** 범주 6개 이상 → 상위 4 + "기타"(`--chart-5`)
- 증감: 상승 `--success`, 하락 `--danger` / 단계(히트맵): `--primary-soft` → `--primary` 농도 변화
- 항상 흰 카드 안에. 가로 그리드선만(`--border`), 축 라벨 13px `--text-tertiary` + tabular-nums, 범례는 상단 12px
- 막대: 상단 radius 4px, 간격은 막대 폭의 50%+ / 파이·도넛: 5조각 이하만, 넘으면 막대로
- 애니메이션은 최초 1회 `--dur-slow`만

---

## 7. Layout & Responsive (레이아웃 · 반응형)

### Spacing
- **4px 배수만**: 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96
- 리듬: 컴포넌트 내부 8~16 / 컴포넌트 사이 16~24 / 카드 사이 24 / 섹션 사이 80~96 (모바일 48~64)
- 구분선보다 여백 우선 — 선 긋기 전에 여백을 2배로 늘려볼 것. 크림 배경이 곧 여백

### Grid
- 최대 폭 `--container`(1120px), 본문 중심 페이지 720px. 좌우 여백: 데스크톱 32 / 모바일 20px
- 카드 그리드: 3열 → 2열(tablet) → 1열(mobile), gap 24px

### Responsive
| 구간 | 폭 | 규칙 |
|------|-----|------|
| Mobile | <640px | 1열, 여백 20px, 섹션 간격 48px, 버튼 전체 폭 허용 |
| Tablet | 640–1024px | 2열, 여백 24px |
| Desktop | ≥1024px | 3열, 최대 1120px, 여백 32px |

- 타이포 축소: Display 44→32 / H1 34→27 / H2 26→21. **본문 16px은 모든 화면 유지.** 세리프는 모바일에서도 세리프(32px, 행간 1.35)
- 터치 타깃 최소 44×44px (작은 아이콘 버튼도 터치 영역은 확보)
- 표: 모바일에서 가로 스크롤 또는 카드형 변환

---

## 8. Motion · Voice · Accessibility

### Motion
- `--dur-fast` hover·버튼 / `--dur-base` 드롭다운·모달 / `--dur-slow` 페이지 전환. easing은 `--ease`
- 등장: 아래서 8px 올라오며 fade-in / 퇴장: fade-out만(이동 없이, 등장의 ½ 시간)
- 무한 반복·바운스 금지 (예외: 스켈레톤 1.6초 펄스). `prefers-reduced-motion` 시 전부 비활성화

### Voice & Tone (UI 문구)
- 해요체: "저장되었습니다" ❌ → "저장했어요" ⭕
- 버튼은 동사 2~4글자. "클릭하세요" 류 지시어 생략
- 오류 = 무엇이 잘못됐는지 + 해결법: "이메일 형식이 올바르지 않아요. @를 포함해 주세요"
- 느낌표는 축하할 때만, 이모지 금지. 세리프 문구(히어로·환영)만 문학적 표현 허용

### Accessibility
- 대비 AA: 본문 4.5:1, 24px+ 텍스트 3:1
- 색에만 의존 금지 — 상태는 항상 아이콘/텍스트 병행
- Tab 키만으로 전 기능 도달, 포커스 링 필수
- 모든 입력창에 라벨, 의미 있는 이미지에 alt (장식은 alt="")
- 페이지 `lang="ko"`

---

## 9. Quick Decision Rules (빠른 결정 규칙)

판단이 애매할 때 이 표 순서로 해결한다.

| 고민 | 답 |
|------|-----|
| 색 | 누르는 것 → `--primary`, 나머지 → 뉴트럴. 그래도 안 되면 semantic |
| 폰트 | 무조건 sans. "브랜드의 목소리인가?"에 확실히 예일 때만 serif |
| 굵기 | 읽는 글 400 / 누르는 것 600 / 제목 700 (serif는 600) |
| 간격 | 4px 배수 중 큰 쪽 (여백은 넘치는 게 낫다) |
| 모서리 | 작은 것 8 / 담는 것 12 / 띄우는 것 16px |
| 그림자 | 일단 테두리만 → 부족하면 `--shadow-1`부터 |
| 차트 색 | 1개 → `--chart-1`만 / 여러 개 → 순서대로 / 6개+ → 상위 4 + 기타 |
| 겹침 | §1 z-index 6단계 중 하나 — 새 값 발명 금지 |

### 자주 쓰는 조합 (복사용)
- **히어로**: `--bg` 배경, 제목 44px serif/600/1.3 `--text`, 부제 18px sans/400/1.7 `--text-secondary`, Primary + Secondary 버튼. 제목만 세리프
- **카드**: `--surface`, 1px `--border`, radius 12px, 패딩 24px, 제목 21px/600, 본문 16px/400/1.65 `--text-secondary`
- **인용문**: 20px serif/600/1.7 `--text`, 좌측 3px `--primary-soft-border` 세로선, 좌측 패딩 20px, 출처 13px `--text-tertiary`
- **빈 화면**: 아이콘 40px `--text-tertiary` + 제목 16px/600 + 설명 14px + 버튼 1개, 중앙 정렬, 패딩 64px+
