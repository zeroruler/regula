---
name: "대시보드"
order: 13
kind: "페이지 양식"
concept: "한눈에 보고 바로 판단하는 화면. 양은 길이와 위치로 그리고, 제목이 결론을 말하며, 그래프마다 같은 내용을 표로도 볼 수 있다."
preview: "/previews/dashboard/"
parts:
  - name: "제목 + 기간 선택"
    note: "오늘 · 7일 · 30일. 화면을 바꾸는 옵션은 설정이 아니라 이 화면 위에"
  - name: "핵심 숫자"
    note: "3–4개 (어림). 값, 비교 기준(지난 기간), 증감을 기호와 글자로"
  - name: "추이 선 그래프"
    note: "제목은 결론 한 문장, 부제에 데이터와 기간. 선 끝에 직접 라벨"
  - name: "비교 막대 그래프"
    note: "큰 순서로 정렬, 0에서 시작, 막대 끝에 값"
  - name: "표로 보기"
    note: "그래프마다 같은 데이터를 표로"
  - name: "갱신 시각"
    note: "맨 아래 한 줄. 언제 기준의 숫자인지"
states:
  - { key: "default", label: "기본" }
  - { key: "loading", label: "불러오는 중" }
  - { key: "empty", label: "데이터 없음" }
preview_note: "미리보기 안에서 기간을 바꿔 볼 수 있어요. 그래프 아래 \"표로 보기\"를 열면 같은 데이터가 표로 나옵니다. 숫자는 모두 예시 데이터예요."
see:
  - { label: "로딩 · 빈 상태 (스켈레톤 · 첫 사용)", path: "patterns/states/" }
  - { label: "타이포그래피 (고정폭 숫자)", path: "principles/typography/" }
  - { label: "색 (대비)", path: "principles/color/" }
  - { label: "게슈탈트 (근접성 · 공통 영역)", path: "principles/gestalt/" }
  - { label: "설정 양식", path: "templates/settings/" }
rules:
  - text: "대시보드는 한 화면에서 한눈에 보고 바로 행동하는 곳이다. 이리저리 파고드는 분석은 다른 화면으로 보낸다."
    source: "Nielsen Norman Group 「Dashboards: Making Charts and Graphs Easier to Understand」 (Page Laubheimer, 2017)"
  - text: "양을 비교할 때는 길이와 위치(막대 · 선)로 그린다. 파이 · 도넛 · 게이지 · 레이더 · 3D 그래프는 면적과 각도에 기대서 차이를 읽기 어렵다."
    source: "Nielsen Norman Group 「Dashboards」 (Laubheimer, 2017)"
  - text: "목표가 있는 숫자는 게이지 대신 불릿 차트처럼 목표와 범위를 함께 보여 준다."
    source: "Nielsen Norman Group 「Dashboards」 (Laubheimer, 2017)"
  - text: "색으로 양을 나타내지 않는다. 범주는 모양 · 선 종류 · 직접 라벨로 구분하고, 색은 거드는 역할만."
    source: "Nielsen Norman Group 「Dashboards」 · UK Analysis Function 「Data visualisation: charts」"
  - text: "증감은 ▲ · ▼ 기호와 \"지난 7일보다 12% 늘었어요\" 같은 글자로 쓴다. 빨강 · 초록만으로 알리지 않는다."
    source: "WCAG 2.2 · 1.4.1 Use of Color"
  - text: "막대는 0에서 시작하고, 큰 순서로 정렬한다."
    source: "UK Analysis Function 「Data visualisation: charts」 (Bar charts) · Nielsen Norman Group 「Dashboards」"
  - text: "선은 4개까지. 범례 대신 선 끝에 이름을 바로 붙인다."
    source: "UK Analysis Function 「Data visualisation: charts」 (Line charts · Legends)"
  - text: "그래프 제목은 결론을 말하는 문장으로(\"방문자가 지난주보다 12% 늘었어요\"). 무엇을 · 어디서 · 언제 쟀는지는 부제에."
    source: "UK Analysis Function 「Data visualisation: charts」 (What to supply with charts)"
  - text: "격자선은 옅게, 10개 안쪽으로."
    source: "UK Analysis Function 「Data visualisation: charts」 (Gridlines)"
  - text: "그래프의 선과 막대는 배경과 3:1 이상 대비. 같은 값을 글이나 표로도 보여 주면 이 기준에서 벗어날 수 있다."
    source: "WCAG 2.2 · 1.4.11 Non-text Contrast"
  - text: "그래프마다 같은 내용을 표나 글로도 제공한다. 사람이 그래프에서 값을 읽어야 한다면 표를 준다."
    source: "WCAG 2.2 · 1.1.1 Non-text Content · UK Analysis Function 「Data visualisation: charts」 (Alternative text · Data download)"
  - text: "세로로 줄 서는 숫자는 고정폭 숫자(tabular-nums)로 자릿수를 맞춘다."
    source: "W3C CSS Fonts Module Level 4 (font-variant-numeric) · Regula 타이포그래피"
  - text: "기간 선택 · 필터처럼 이 화면만 바꾸는 옵션은 설정 화면이 아니라 이 화면 위에 둔다."
    source: "Apple HIG · Settings (Task-specific options)"
  - text: "불러오는 동안은 그래프 자리를 스켈레톤으로 잡아 두고, 데이터가 없으면 빈 칸 대신 무엇을 하면 채워지는지 알린다."
    source: "Nielsen Norman Group 「Skeleton Screens 101」 · 「Designing Empty States in Complex Applications: 3 Guidelines」 (Kate Kaplan, 2021)"
---

## 메모

- 로그인 · 회원가입 · 설정 양식과 같은 방식으로, 등록된 디자인 시스템 4개의 토큰을 바꿔 입혀 본다. 그래프 색도 각 시스템의 키 색과 테두리 색을 쓴다.
- 지난 기간 선은 키 색 대신 회색 점선으로 그렸다. 두 선을 색만이 아니라 선 종류로도 구분하고, 끝에 이름을 붙였다.
- 파이 차트를 아예 쓰지 말라는 말은 아니다. Analysis Function은 범주가 5개 이하이고 전체가 의미 있으며 한 범주가 두드러질 때만 쓰라고 한다. NN/g도 몫의 차이가 아주 클 때는 괜찮다고 한다.
- "핵심 숫자 3–4개"는 출처에 없는 어림값이다. NN/g 글은 개수를 정하지 않는다.
- Stephen Few의 『Information Dashboard Design』(2006)이 대시보드를 "한 화면에서 한눈에"로 정의한 것으로 널리 인용된다. 책을 직접 보지 않아서 출처로 달지 않았다.
