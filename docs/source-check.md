# 출처 검증 기록

사이트의 출처를 원문(또는 원문을 옮긴 믿을 만한 기록)과 대조한 결과. 새로 확인할 때마다 위에 덧붙인다.

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

- 스낵바 4–10초: Material 공식 문서에서 숫자를 찾지 못함 (Compose 구현의 짧게 ≈ 4초 · 길게 ≈ 10초로 알려짐)
- Material 3 Navigation bar의 목적지 수(3–5), M3 easing · duration 토큰 값 — m3.material.io가 스크립트로 그려져 읽지 못함
- 클레이모피즘 · 3D 아이콘이라는 이름을 처음 쓴 곳
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

- Material 3 easing · duration 토큰의 구체적인 값 (페이지가 스크립트로 그려져 읽지 못함 — 사이트에는 숫자를 적지 않고 "토큰"으로만 인용)
- Apple HIG의 각 페이지 본문 (이름만 확인. Gestures는 지금 Inputs › Gestures 아래)
- Redelmeier & Kahneman (1996) 대장 내시경 연구의 서지
- 고전 서적(Fitts 1954, Hick 1952, Hyman 1953, Koffka 1935, Albers 1963, Itten, Müller-Brockmann 1981, Bringhurst, Cialdini 1984)은 널리 알려진 서지라 이번에 따로 대조하지 않음
