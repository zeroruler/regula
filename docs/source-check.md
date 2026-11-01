# 출처 검증 기록

사이트의 출처를 원문(또는 원문을 옮긴 믿을 만한 기록)과 대조한 결과. 새로 확인할 때마다 위에 덧붙인다.

## 2026-11-01 — 5차: 화면 구성 패턴 (목록 · 표 · 카드 · 캐러셀 · 아코디언 · 팝오버 · 사이드 시트)

### 원문을 읽고 확인

- Page Laubheimer, 「Cards: UI-Component Definition」 (NN/g, 2016-11-06): 카드는 둘러보기(browse)에 맞고 찾기(search)에는 목록보다 못함, 목록이 더 훑기 쉬움, 여러 항목 견주기에 나쁨(눈이 카드 사이를 오감)
- Page Laubheimer, 「Data Tables: Four Major User Tasks」 (NN/g, 2022-04-03): 찾기 · 견주기 · 한 줄 보기/고치기/더하기 · 행동하기 네 가지, 열 순서는 중요도순 · 관련 열은 붙여서
- Amy Schade, 「Mobile Tables: Comparisons and Other Data Tables」 (NN/g, 2017-09-17): 머리글 고정, 볼 데이터 고르게
- Kara Pernice, 「Designing Effective Carousels」 (NN/g, 2013-09-14, 현재 제목 「Carousel Usability: Effective UI for Content Overload」): 5장 이하, 사람들이 자주 지나침, 다음 장을 살짝 보이게
- Jakob Nielsen, 「Auto-Forwarding Carousels and Accordions Annoy Users and Reduce Visibility」 (NN/g, 2013-01-20)
- Huei-Hsin Wang, 「Accordions on Desktop: When and How to Use」 (NN/g, 2023-07-30): 보기 쉬움을 줄이고 조작 비용을 늘림, 여러 칸을 열어야 하면 피함, 모두 펼치기 · 인쇄
- W3C WAI-ARIA APG Carousel: 자동 회전이면 멈춤 버튼, 키보드 포커스가 들어오면 멈추고 다시 시작하지 않음, 마우스를 올리면 멈춤
- W3C WAI-ARIA APG Accordion: 머리 버튼에 aria-expanded, aria-controls
- MDN popover 전역 속성: popover="auto"는 바깥 누르기 · Esc로 닫힘(light dismiss), 다른 auto 팝오버를 닫음

### 직접 읽지 못함

- Material Design 3 Lists · Side sheets, Apple HIG Popovers — 페이지가 스크립트로 그려져 본문을 받지 못했다. 이름(standard · modal side sheet 등)만 쓰고 수치는 인용하지 않았다.

## 2026-11-01 — 4차: WCAG 2.2 성공 기준 (사용성과 접근성)

W3C 권고안 원문 https://www.w3.org/TR/WCAG22/ (W3C Recommendation 12 December 2024판)을 내려받아 해당 성공 기준의 문장과 수준을 대조했다.

### 원문을 읽고 확인 — 맞음

- 1.1.1 Non-text Content (A) · 1.4.1 Use of Color (A) · 2.4.3 Focus Order (A) · 2.2.2 Pause, Stop, Hide (A, 저절로 시작해 5초 넘게 다른 내용과 함께 움직이면 멈출 수단)
- 1.4.3 Contrast (Minimum) (AA): 4.5:1, 큰 글자 3:1. 큰 글자 정의 18pt 또는 굵은 14pt(= 24px · 18.66px)
- 1.4.10 Reflow (AA): 세로 스크롤 콘텐츠는 폭 320 CSS px, 가로 스크롤 콘텐츠는 높이 256 CSS px. 320px = 1280px의 400% 확대
- 1.4.11 Non-text Contrast (AA): UI 컴포넌트 · 그래픽 3:1, 비활성 컴포넌트와 브라우저 기본 모양은 예외
- 1.4.8 Visual Presentation (AAA): 80자, CJK 40자
- 2.4.7 Focus Visible (AA)
- 2.4.11 Focus Not Obscured (Minimum) (AA, New): 포커스 받은 컴포넌트가 작성자 콘텐츠에 "전부" 가려지지 않을 것
- 2.4.13 Focus Appearance (AAA, New): 2 CSS px 두께 둘레만큼의 면적, 포커스 전후 같은 픽셀 대비 3:1
- 2.3.3 Animation from Interactions (AAA)
- 2.5.7 Dragging Movements (AA, New)
- 2.5.8 Target Size (Minimum) (AA, New): 24 × 24 CSS px. 간격 예외 — 작은 목표마다 중심에 지름 24px 원을 그려 다른 목표나 다른 작은 목표의 원과 겹치지 않으면 통과. 그 밖에 Equivalent · Inline · User Agent Control · Essential 예외
- 2.5.5 Target Size (Enhanced) (AAA): 44 × 44 CSS px
- 2.2에서 새로 생긴 기준(3.2.6 · 3.3.7 · 3.3.8 · 3.3.9 · 2.4.12 포함)과 4.1.1 Parsing 삭제("Obsolete and removed")
- AAA를 전체 목표로 요구하지 말라는 문장("It is not recommended that Level AAA conformance be required...")

### 고친 것

- 터치 영역 note의 Inline 예외를 "줄 길이 안의 링크"에서 "크기가 글줄 높이에 묶인 문장 속 목표"로 바로잡음(원문: constrained by the line-height of non-target text)
- 터치 영역 출처에 2.5.5 (AAA, 44px)를 더함. 리플로 공식에 높이 256px를 더함

### 함께 확인

- MDN prefers-reduced-motion: `reduce`는 기기에서 움직임 줄이기를 켰다는 뜻, `@media (prefers-reduced-motion)`과 같음
- W3C WAI Images Tutorial — Decorative Images: 장식 이미지는 alt=""

## 2026-11-01 — 3차: Material 3 토큰 값 · 스낵바 시간 · 클레이모피즘 이름

m3.material.io는 스크립트로 그려져 직접 못 읽으므로, Google이 공개한 구현 저장소의 소스에서 값을 확인했다.

### 원문(소스)을 읽고 확인

- M3 motion 토큰 — material-components/material-web `tokens/versions/v0_192/_md-sys-motion.scss` (자동 생성 파일, "Design system version: v0.192", Apache-2.0, 2026-10-29 커밋 기준):
  - duration: short1–4 = 50 · 100 · 150 · 200ms, medium1–4 = 250 · 300 · 350 · 400ms, long1–4 = 450 · 500 · 550 · 600ms, extra-long1–4 = 700 · 800 · 900 · 1000ms
  - easing: standard (0.2, 0, 0, 1), standard-decelerate (0, 0, 0, 1), standard-accelerate (0.3, 0, 1, 1), emphasized (0.2, 0, 0, 1), emphasized-decelerate (0.05, 0.7, 0.1, 1), emphasized-accelerate (0.3, 0, 0.8, 0.15), legacy (0.4, 0, 0.2, 1), linear (0, 0, 1, 1)
  - emphasized는 원래 경로(path) 곡선인데 CSS로는 standard와 같은 값으로 들어가 있음("motion_path is not supported")
- M3 창 크기 구간 — androidx `window/window-core/.../WindowSizeClass.kt`: WIDTH_DP_MEDIUM_LOWER_BOUND = 600, WIDTH_DP_EXPANDED_LOWER_BOUND = 840 (그 위로 EXTRA_LARGE 1600도 있음)
- M3 Navigation bar 목적지 수 — material-components-android `docs/components/BottomNavigation.md`: "Navigation bars can have three to five destinations"
- 스낵바 시간:
  - material-components-web `packages/mdc-snackbar/constants.ts` · `foundation.ts`: 자동으로 닫히는 시간은 4000–10000ms만 허용(범위 밖이면 오류), 기본 5000ms, 닫지 않음(-1)도 가능
  - androidx Compose Material3 `SnackbarHost.kt`: Short = 4000ms, Long = 10000ms, Indefinite. 접근성 서비스가 켜져 있으면 접근성 관리자가 시간을 조정
  - 반대로 material-components-android(View) `SnackbarManager.java`는 SHORT 1500ms · LONG 2750ms — 같은 Material이라도 구현마다 다름
  - → 사이트의 "4–10초"는 MDC Web의 허용 범위와 Compose M3의 두 값으로 출처를 바꿈. "호버하면 멈춤"은 MDC Web 소스에 없음 → (어림)으로 표시
- 클레이모피즘: Michał Malewicz 「Claymorphism in User Interfaces」 (Hype4 Academy) 원문을 읽음. 두 겹 안쪽 그림자(위 왼쪽 밝게 · 아래 오른쪽 어둡게) + 큰 바깥 그림자, 크게 둥근 모서리. 원문은 이 이름을 자기가 지었다고 말하지 않음(스스로는 "fluffy 3d"라 부르고, 뉴모피즘 · 글래스모피즘 등을 만드는 데 참여했다고만 씀). Smashing Magazine 「Claymorphism: Will It Stick Around?」 (Adrian Bece, 2022-03-16)는 "이 용어는 Michal Malewicz가 지었다"고 씀

### 확인 못 한 것

- 클레이모피즘 원문의 게시 날짜(페이지에 날짜 없음, 웨이백 조회는 이 환경에서 막힘). "2021년"은 2차 자료에만 있음
- 처음 이 이름을 쓴 사람: 원문과 2차 자료가 엇갈려 확정하지 않음
- m3.material.io 문서 본문 자체(용도 설명 · 권장 문구)는 여전히 직접 읽지 못함. 위 값은 구현 소스 기준
- 3D 아이콘이라는 스타일 이름의 기원

## 2026-11-01 — 랜딩 페이지 양식에 단 출처

### 원문을 읽고 확인

- NN/g 「Top 10 Guidelines for Homepage Usability」 (Jakob Nielsen, 2002-05-11): #1 하는 일을 한 문장 표어로, #2 창 제목은 회사 이름으로 시작 · "Welcome to"로 시작하지 않기, #4 주요 작업 1–4개에 시작점, #6 "Specifics beat abstractions", #9 과한 꾸밈은 광고로 여겨짐, #10 꾸밈용 스톡 대신 실제 사람 사진
- NN/g 「Photos as Web Content」 (Nielsen, 2010-10-31): 일반 인물 스톡 사진은 무시되고 실제 직원 · 제품 사진은 오래 봄
- NN/g 「Scrolling and Attention」 (Therese Fessenden, 2018-04-15): 120명 · 1920×1080, 첫 화면 57%(2010년 80%), 처음 두 화면 74%, 세 화면 81%. 중요한 내용과 주 행동은 위에, 거짓 바닥 피하기
- NN/g 「Auto-Forwarding Carousels and Accordions Annoy Users and Reduce Visibility」 (Nielsen, 2013-01-19): 사용자가 원할 때만 다음 패널. 멈춤 버튼이나 시간 기준은 이 글에 없음
- GOV.UK Design System · Start using a service: 무엇을 하는지 · 누구를 위한지, 필요한 것, 비용과 대략 걸리는 시간, 시작 버튼 하나, 둘째 행동은 버튼 대신 링크, 복잡한 자격 조건은 시작 페이지에 두지 않기
- GOV.UK Design System · Button: 주 버튼은 페이지의 주 행동에, 주 버튼 여러 개 피하기, 버튼 글자는 하는 일을 말하게
- WCAG 2.2 · 2.2.2 Pause, Stop, Hide: 저절로 시작해 5초 넘게 움직이고 다른 내용과 함께 보이면 멈춤 · 정지 · 숨김 수단. Understanding 문서는 캐러셀을 직접 말하지 않음 — 캐러셀은 "움직이는 내용"으로 적용
- WCAG 2.2 · 1.4.2 Audio Control: 3초 넘는 자동 재생 소리는 멈춤 또는 따로 음량 조절. Intent는 자동 재생 자체를 권하지 않음

### 확인 못 한 것 · 어림값

- 랜딩 페이지 전용 전환율 연구(마케팅 회사 글)는 확인할 수 있는 원자료가 없어 쓰지 않음
- "하는 일 1–4개"는 NN/g의 주요 작업 개수를 빌린 것으로, 기능 소개 칸 수를 정한 출처는 없음
- 스크롤 숫자는 데스크톱 조사라 휴대폰에는 그대로 옮기지 않음

## 2026-11-01 — 글 본문 양식 · 한글 본문 한 줄 글자 수

### 원문을 읽고 확인

- WCAG 2.2 1.4.8 Visual Presentation (AAA) · Understanding 1.4.8: 폭 80자 이하(CJK 40자), 양쪽 정렬 안 함, 문단 안 행간 1.5 이상, 문단 간격은 행간의 1.5배 이상. CJK 글자가 같은 읽기 편함에서 비CJK 글자의 약 두 배 폭이라 절반으로 잡는다고 설명. CJK = 중국어 · 일본어 · 한국어
- 신종현 · 박민용, 「읽기 형태, 줄 길이, 줄 간격이 한글 웹 문서의 가독성에 미치는 영향」, 대한산업공학회지 29권 3호 197–205쪽 (2003-09), koreascience PDF 본문: 18명, 굴림 12pt, 17인치 1024×768, 줄 길이 10 · 30 · 50cpl, 줄 간격 50 · 100 · 200%(줄 사이 빈 공간 0.5 · 1 · 2줄). 읽기 속도는 50cpl · 100%에서 가장 빠름, 30과 50cpl은 차이가 크지 않고 10cpl보다 빠름 → "최소 30cpl 이상". 주관적 선호는 30cpl이 가장 높았으나 50cpl과 차이 작음
- WCAG 2.2 Understanding 1.4.10 Reflow: 목록과 코드 블록은 들여쓰기가 뜻을 가져, 그 뜻이 사라지는 경우 기준이 적용되지 않음
- W3C WAI 「Headings」 튜토리얼: 같거나 높은 단계의 제목이 새 구획을 연다, 단계 건너뛰기는 가능하면 피함(하위 구획을 닫을 때는 괜찮음). "h1은 하나"라는 말은 없음 — 규칙에서 h1 하나는 예시 구성으로만 둠
- WHATWG HTML: 인용의 출처는 blockquote 밖에 둔다(must). figcaption은 figure의 캡션. pre는 코드와 함께 code를 쓰라고 권함. 캡션이 alt를 대신한다는 말은 없고, 예시는 alt와 figcaption을 함께 씀
- W3C CSS Text Module Level 3 (word-break): 한국어 줄바꿈은 두 방식 — 음절 사이 아무 데서나(normal), 영어처럼 주로 띄어쓰기에서(keep-all)
- WCAG Failure F73: 링크는 밑줄 등 색이 아닌 표시가 필요, 또는 주변 글자와 명도 대비 3:1 이상 + 포커스 · 포인터 시 추가 표시
- GOV.UK Design System · Lists: 순서가 중요하면 번호 목록, 글머리표 목록은 이끄는 문장으로 시작
- NN/g 「How Users Read on the Web」 (Jakob Nielsen, 1997): 79%가 훑어 읽고 16%가 한 단어씩 읽음. 강조된 핵심어, 내용을 말하는 소제목, 글머리표, 문단 하나에 생각 하나, 역피라미드, 글자 수 절반

### 일부만 확인

- W3C 「Requirements for Hangul Text Layout and Typography」 (klreq, 2026-03-21 Group Note 초안): 행간 방식 네 가지와 줄 폭을 다루지만 권장 숫자 없음
- 이수정 · 정우현 · 정찬섭 「글자꼴, 글줄길이, 글줄모양과 한글의 가독성」 (1993, 한글 및 한국어 정보처리 학술발표 논문집 193–205쪽): DBpia에서 서지만 확인, 초록 · 본문을 못 읽어 사이트에 쓰지 않음. 검색 요약에 "글줄 길이 영향이 상대적으로 작았다"는 말이 돌지만 원문 대조 안 됨

### 확인 못 한 것 · 어림값

- 한글 본문 "30–40자"를 직접 권하는 출처는 찾지 못함. WCAG 상한(40)과 신종현 · 박민용의 하한 쪽 결과(30)를 겹친 범위로만 적음
- 미리보기의 본문 폭 36em, 본문 크기 17px, 행간 1.75는 출처 없는 어림값
- 2003년 실험의 "줄 간격 100%"를 CSS line-height 값으로 바꾸는 것은 글자 크기 정의(굴림 12pt의 em 상자)에 따라 달라 하지 않음

## 2026-11-01 — 대시보드 양식에 단 출처

### 원문을 읽고 확인

- NN/g 「Dashboards: Making Charts and Graphs Easier to Understand」 (Page Laubheimer, 2017-06-18): 한눈에 보고 행동하는 한 화면, 길이 · 2D 위치가 양 비교에 가장 정확, 파이 · 도넛 · 게이지 · 레이더 · 3D 피하기, 게이지 대신 불릿 차트, 색으로 양을 나타내지 않기. 항목 개수는 정하지 않음
- UK Analysis Function 「Data visualisation: charts」: 막대는 0에서 시작, 선은 4개까지, 범례보다 직접 라벨, 제목은 결론 · 부제는 데이터와 기간, 격자선 10개 안쪽, 색에만 기대지 않기, 데이터 표 · 내려받기 제공, 파이는 5개 이하 · 의미 있는 전체 · 두드러진 범주일 때만
- WCAG 2.2 Understanding 1.4.11 Non-text Contrast: 그래프의 선 · 막대는 배경과 3:1, 같은 정보를 글이나 표로 주면 예외

### 확인 못 한 것

- Stephen Few 『Information Dashboard Design』(2006)의 정의: 책을 직접 보지 않아서 출처로 달지 않고 메모에만 적음

## 2026-11-01 — 설정 양식에 단 출처

### 원문을 읽고 확인

- Apple HIG Settings: 설정은 적게 두고 기본값을 잘 정하기, 작업 중에 바꾸는 옵션은 그 화면에, 기기 전체 설정을 앱 안에 따로 만들지 않기
- Apple HIG Dark Mode: 앱 전용 화면 모드 설정 피하기
- Apple HIG Toggles: 상태를 색만으로 구분하지 않기, iOS에서 스위치는 목록 행 안에서만
- Apple HIG Alerts: 드물고 되돌릴 수 없는 파괴적 행동에만 알림창 띄우기, 제목은 상황을 구체적으로, 버튼은 결과를 말하는 동사, 취소는 "Cancel"
- NN/g 「Toggle-Switch Guidelines」 (Alita Kendrick, 2018): 즉시 적용, 저장 버튼이 필요한 칸과 섞지 않기, 라벨은 켰을 때 하는 일, 상태 표시
- Apple App Store Review Guidelines 5.1.1(v): 가입이 되는 앱은 앱 안에서 계정 삭제도 제공

### 일부만 확인

- 정보통신망법 제50조 제2항 · 제5항 · 제7항: IT위키에 옮겨 둔 조문으로 확인. 국가법령정보센터 원문과는 대조하지 못함. 시행령의 14일 처리 통지와 2년마다 동의 확인은 해설 글에서만 봐서 사이트에 넣지 않음

## 2026-11-01 — 회원가입 양식에 단 출처

### 원문을 읽고 확인

- GOV.UK Design System · Create accounts: "계정 만들기" · "비밀번호 만들기"처럼 새로 만든다는 말 쓰기, 가입 화면에 다른 내용 두지 않기, 같은 정보 두 번 묻지 않기, CAPTCHA 쓰지 않기
- GOV.UK Design System · Password input: 가입은 autocomplete="new-password", 비밀번호 확인 칸은 필요 없음(보기 토글로 대신), 조건은 분명하고 어디서나 같게
- GOV.UK Design System · Ask users for passwords: 최소 8자 이상, 최대 길이 두지 않기, 흔한 비밀번호 막기, 붙여넣기 허용
- NIST SP 800-63B-4 §3.1.1 (2025): 조합 규칙 금지, 금지 목록 대조 후 거절하면 이유 알리기, 비밀번호만으로 로그인하면 최소 15자 · 다른 인증과 함께면 8자, 최대 64자 이상 허용, 비밀번호 관리자 · 자동 입력 허용(SHALL), 붙여넣기 · 보기 허용(SHOULD)

### 일부만 확인

- 개인정보 보호법 제22조 제1항(제7호 홍보 · 판매 권유 동의는 구분) · 제5항(선택 동의 거부를 이유로 서비스 거부 금지): IT위키에 옮겨 둔 조문으로 확인. 국가법령정보센터 원문과는 대조하지 못함
- WCAG 3.3.8은 AA 수준에서 그림(사물) 알아보기를 예외로 둔다. 그래서 CAPTCHA 규칙의 출처에서는 빼고 GOV.UK만 남김

## 2026-11-01 — 2차 (1차에서 못 한 것 + 그 뒤에 단 출처)

방법: Apple HIG는 페이지의 JSON(developer.apple.com/tutorials/data/design/human-interface-guidelines/<page>.json)으로 본문을 읽었다. 나머지는 원문 페이지 · 서지 기록과 대조.

### 고친 것

| 어디 | 전 | 후 | 근거 |
|---|---|---|---|
| 터치 영역 | iOS ≥ 44pt | 기본 44pt · 최소 28pt, 웹 최소 24px 추가 | Apple HIG Accessibility 표, WCAG 2.5.8 |
| 피츠의 법칙 | 식을 Fitts(1954)로만 표기 | log₂(1 + D/W)는 MacKenzie(1992)의 Shannon 형식, Fitts 원식은 log₂(2D/W) | MacKenzie 논문 · 정리 |
| 탭 바 규칙 | 목적지 3–5곳 (Apple HIG) | HIG는 숫자 대신 "적을수록 쉽다", 사용자 편집 탭은 "다섯 개 이하", 라벨 함께 | Apple HIG Tab bars |
| 토스트 | 2–4초 뒤 자동 (Carbon) | Carbon v10 기준 5초 | Carbon v10 Notification usage |
| 스프링 | Apple HIG Motion | HIG Motion에는 스프링 언급 없음 → SwiftUI spring API만 | Apple HIG Motion |
| 손실 회피 | 메타분석 약 1.7–2 | 2024 메타분석 평균 1.955 (150편 · 607개), 2025 재분석은 견고성에 의문 | Brown 외 (JEL 2024) 초록 |
| 리퀴드 글래스 | HIG 본문 미확인 | 컨트롤 · 내비게이션 층에, 내용 층엔 쓰지 않음, 아껴서, 밝은 배경엔 35% 어두운 막 | Apple HIG Materials |
| 입력 개수 | 체크박스 10개 안쪽 · 라디오 2–5 · 드롭다운 7개 이상 | 출처에 없는 숫자라 "(어림)" 표시 | — |

### 맞는 것으로 확인

- Apple HIG Gestures: 제스처 말고 다른 길도 두기, 지름길 제스처는 보조로(뒤로 버튼 예시), 시스템 제스처와 겹치지 않기 — 제스처 페이지 규칙과 일치
- Apple HIG Motion: 목적 있는 움직임, 짧고 정확하게, 움직임을 선택 사항으로 — 움직임 규칙과 일치
- Redelmeier & Kahneman, 「Patients' Memories of Painful Medical Treatments」 (Pain 66, 1996)
- NN/g: Glassmorphism (Megan Brown, 2024) · Neobrutalism (Hayat Sheikh, 2025) · Flat Design (Kate Moran, 2015) · Placeholders in Form Fields Are Harmful (Katie Sherwin)
- Michal Malewicz, Neumorphism in user interfaces (UX Collective, 2019-12), Apple Liquid Glass 발표 (WWDC 2025-06-09)
- 서체 12개의 라이선스(SIL OFL)와 만든 곳
- Ottosson Oklab (2020), Tim Brown 「More Meaningful Typography」 (A List Apart, 모듈러 스케일)

### 아직 확인 못 한 것

- ~~스낵바 4–10초~~ → 3차에서 MDC Web · Compose 소스로 확인
- ~~Material 3 Navigation bar의 목적지 수(3–5), M3 easing · duration 토큰 값~~ → 3차에서 공개 저장소 소스로 확인
- 클레이모피즘 · 3D 아이콘이라는 이름을 처음 쓴 곳 → 3차: 클레이모피즘은 널리 알린 글만 확인, 처음 쓴 사람은 미확정
- 60-30-10의 기원 ("인테리어 디자인 관례"로만 표기)
- 고전 서적의 쪽수 단위 인용(Bringhurst 45–75자 · 66자, Itten 12색상환)은 책을 직접 보지 않음 — 널리 인용되는 내용

## 2026-11-01 — 1차 (출처 약 130개 중 확인이 필요한 것 위주)

방법: 웹 검색과 원문 페이지·PDF로 제목 · 저자 · 연도 · 인용한 숫자를 대조했다. 디자인 시스템 문서(Apple HIG, Material 3, GOV.UK, Carbon)와 WCAG 성공 기준 이름은 이름이 실제로 있는지만 봤고, 본문 문장까지 대조하지는 않았다.

### 고친 것

| 어디 | 전 | 후 | 근거 |
|---|---|---|---|
| 내비게이션 규칙 · 드로어 | Kim Flaherty, 「Hamburger Menus…」 | Kara Pernice · Raluca Budiu (NN/g, 2016) | nngroup.com 기사 본문의 저자 |
| 당겨서 새로고침 | Tweetie (2008) | Tweetie 2 (2009) | 2009년 9월 Tweetie 2에서 처음 나옴 |
| 다크 패턴 규제 표 | 전자상거래법 다섯 유형 | 여섯 유형 · 조항 번호 · 시행일(2025-02-14) | 공정위 개정 내용 보도 · 문답서 |
| 자이가르닉 효과 | 끝내지 않은 일을 더 잘 기억 | 다시 이어 하려는 경향(오브시안키나)만 확인, 기억 우위는 확인 안 됨 | Ghibellini & Meier 메타분석 (2025) |
| 선택 과부하 | 조건에 따라 효과가 없기도 | 평균 효과 0에 가까움, 조건에 따라 다름 | Scheibehenne 외 (2010) 초록 |
| 손실 회피 | λ ≈ 2 | 처음 추정 2.25(25명의 가상 선택), 뒤 메타분석은 약 1.7–2 | Tversky & Kahneman (1992), Brown 외 (2024) |
| NN/g 제목 | Breadcrumbs: 11 Design Guidelines | …for Desktop and Mobile | NN/g 목록 |
| NN/g 제목 | Infinite Scrolling Is Not for Every Website | Infinite Scrolling: When to Use It, When to Avoid It | NN/g 목록(제목이 바뀜) |
| NN/g 제목 | Designing Empty States in Complex Applications | …: 3 Guidelines (Kate Kaplan, 2021) | NN/g 영상 페이지 |
| NN/g 제목 | Error Message Guidelines | Error-Message Guidelines | NN/g 목록 |

### 맞는 것으로 확인

- Amershi 외, 「Guidelines for Human-AI Interaction」 (CHI 2019): G1 · G2 · G8 · G9 · G11 · G13 · G15 · G16 번호와 내용 (논문 표 1)
- deceptive.design 유형 이름 10개 (Hard to cancel · Preselection · Fake urgency · Confirmshaming · Sneaking · Fake scarcity · Fake social proof · Hidden costs · Hidden subscription · Nagging)
- Mathur 외 (CSCW 2019): 약 1만 1천 곳, 1,818건, 1,254곳
- Gray 외 (CHI 2018), FTC 「Bringing Dark Patterns to Light」 (2022년 9월), EU DSA 제25조, GDPR 전문 32항, Planet49 (C-673/17, 2019-10-01)
- NN/g: Executing UX Animations (Page Laubheimer, 2020, 100–500ms) · Progress Indicators Make a Slow System Less Insufferable · Skeleton Screens 101 · Sticky Headers · Toggle-Switch Guidelines · Placeholders in Form Fields Are Harmful · Checkboxes vs. Radio Buttons (2004) · How Users Read on the Web (1997)
- José M. Pérez 「How Medium does progressive image loading」 (2015-10-19)
- Kahneman 외 (1993, 14°C 찬물 실험), Iyengar & Lepper (2000, 잼 24종 대 6종), Johnson & Goldstein (Science, 2003), Worchel 외 (JPSP, 1975)
- Matteo Penzo (UXmatters, 2006), Luke Wroblewski (A List Apart, 2009), Palmer (1992), Wertheimer (1923)

### 아직 확인 못 한 것

- ~~Material 3 easing · duration 토큰의 구체적인 값~~ → 3차에서 material-web 토큰 파일로 확인, 움직임 규칙 표 · ease-in · ease-out에 값 추가
- Apple HIG의 각 페이지 본문 (이름만 확인. Gestures는 지금 Inputs › Gestures 아래)
- Redelmeier & Kahneman (1996) 대장 내시경 연구의 서지
- 고전 서적(Fitts 1954, Hick 1952, Hyman 1953, Koffka 1935, Albers 1963, Itten, Müller-Brockmann 1981, Bringhurst, Cialdini 1984)은 널리 알려진 서지라 이번에 따로 대조하지 않음
