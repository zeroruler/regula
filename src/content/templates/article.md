---
name: "글 본문"
order: 14
kind: "페이지 양식"
concept: "끝까지 읽히는 화면. 한 줄은 한글 40자 안쪽, 행간은 넉넉히, 제목은 단계를 건너뛰지 않고, 결론부터 말한다."
preview: "/previews/article/"
parts:
  - name: "제목 + 요약"
    note: "제목 바로 아래 한두 문장으로 결론부터"
  - name: "글쓴이 · 날짜"
    note: "언제 쓴 글인지. 고친 날이 있으면 함께"
  - name: "본문 문단"
    note: "한 줄 한글 40자 안쪽, 행간 1.5 이상, 왼쪽 정렬, 어절 단위 줄바꿈"
  - name: "소제목"
    note: "h2 → h3 차례로. 재치보다 내용을 말하는 말로"
  - name: "목록"
    note: "순서가 있으면 번호, 없으면 글머리표. 글머리표 앞에 이끄는 문장"
  - name: "인용"
    note: "출처는 인용 상자 밖에"
  - name: "코드 블록"
    note: "줄을 접지 않고 블록 안에서만 가로 스크롤"
  - name: "그림 + 캡션"
    note: "alt는 그림이 보여 주는 것, 캡션은 그림에 붙이는 설명"
states:
  - { key: "default", label: "기본" }
  - { key: "spacing", label: "간격 늘림 (1.4.12)" }
  - { key: "wide", label: "줄 길이 제한 없음" }
  - { key: "breakall", label: "글자 단위 줄바꿈" }
preview_note: "\"간격 늘림\"은 WCAG 1.4.12의 값(행간 1.5배, 문단 간격 2배, 자간 0.12em, 단어 간격 0.16em)을 덮어씌운 화면이에요. 이 값에서도 글이 잘리거나 겹치지 않아야 합니다. \"줄 길이 제한 없음\"과 \"글자 단위 줄바꿈\"은 피할 화면이라 넓은 화면에서 봐야 차이가 잘 보여요."
see:
  - { label: "타이포그래피 (줄 길이 · 행간 실습)", path: "principles/typography/" }
  - { label: "문구 (UX 라이팅)", path: "patterns/writing/" }
  - { label: "색 (대비)", path: "principles/color/" }
  - { label: "대시보드 양식", path: "templates/dashboard/" }
rules:
  - text: "본문 한 줄은 한글 40자 이하. 라틴 문자는 80자 이하인데, 한중일 글자는 같은 읽기 편함에서 폭이 두 배쯤이라 절반으로 잡는다."
    source: "WCAG 2.2 · 1.4.8 Visual Presentation (AAA) · Understanding 1.4.8"
  - text: "넓은 화면에서는 한 줄을 한글 30자보다 짧게 하지 않는다(휴대폰은 화면 폭이 정한다 — 375px이면 20자 남짓). 모니터 웹 문서 실험에서 10자는 30 · 50자보다 확실히 느렸고, 30자와 50자는 읽기 속도 차이가 크지 않았다. 선호는 30자가 가장 높았다."
    source: "신종현 · 박민용, 「읽기 형태, 줄 길이, 줄 간격이 한글 웹 문서의 가독성에 미치는 영향」, 대한산업공학회지 29권 3호 (2003)"
  - text: "행간은 글자 크기의 1.5배 이상, 문단 사이는 행간보다 1.5배 이상 넓게."
    source: "WCAG 2.2 · 1.4.8 Visual Presentation (AAA)"
  - text: "사용자가 행간 1.5배, 문단 간격 2배, 자간 0.12em, 단어 간격 0.16em으로 바꿔도 글이 잘리거나 겹치지 않게 높이를 못 박지 않는다."
    source: "WCAG 2.2 · 1.4.12 Text Spacing (AA)"
  - text: "양쪽 정렬을 하지 않는다. 단어 사이가 들쭉날쭉 벌어져 흰 강이 생기고, 어디서 끊기는지 찾기 어려워진다."
    source: "WCAG 2.2 · 1.4.8 · Failure F88"
  - text: "한글은 어절(띄어쓰기) 단위로 줄을 바꾼다(word-break: keep-all). 글자 단위로 바꾸는 것도 한국어의 흔한 방식이지만, 한 낱말이 두 줄로 갈라진다."
    source: "W3C CSS Text Module Level 3 (word-break)"
  - text: "제목은 h1에서 h2, h3 차례로 내려가고 단계를 건너뛰지 않는다. 제목은 페이지의 짜임을 알리는 것이지 글자를 키우는 수단이 아니다."
    source: "W3C WAI 「Headings」 튜토리얼"
  - text: "결론부터 쓰고(역피라미드), 문단 하나에 생각 하나, 소제목은 재치보다 내용을 말하게. 사람들은 대부분 처음 보는 페이지를 훑어 읽는다."
    source: "Nielsen Norman Group 「How Users Read on the Web」 (Jakob Nielsen, 1997)"
  - text: "순서가 중요하면 번호 목록, 아니면 글머리표 목록. 글머리표 목록은 이끄는 문장으로 시작한다."
    source: "GOV.UK Design System · Lists"
  - text: "인용의 출처는 인용 상자(blockquote) 밖에 둔다."
    source: "WHATWG HTML Living Standard · the blockquote element"
  - text: "코드는 들여쓰기와 줄바꿈이 뜻을 가지므로 접지 않는다. 쪽 전체가 아니라 코드 블록만 가로로 스크롤한다."
    source: "WCAG 2.2 · Understanding 1.4.10 Reflow (Nested lists or code formatting) · WHATWG HTML (the pre element)"
  - text: "그림에는 그림이 보여 주는 내용을 alt로, 그림에 붙일 설명은 캡션(figcaption)으로 따로 쓴다."
    source: "WCAG 2.2 · 1.1.1 Non-text Content · WHATWG HTML (the figure · figcaption elements)"
  - text: "본문 속 링크는 밑줄처럼 색이 아닌 표시로도 알아볼 수 있게 한다."
    source: "WCAG 2.2 · 1.4.1 Use of Color · Failure F73"
  - text: "320px 폭(글자 400% 확대와 같음)에서도 본문은 가로 스크롤 없이 읽힌다. 표 · 코드 · 그림처럼 2차원 배치가 뜻을 가진 것만 예외."
    source: "WCAG 2.2 · 1.4.10 Reflow (AA)"
---

## 메모

- 한글 글자 수의 근거는 두 개를 찾았다. WCAG 1.4.8은 "CJK면 40자"라는 상한을, 신종현 · 박민용(2003)은 "30자보다 짧으면 느리다"는 하한 쪽 근거를 준다. 이 양식의 "30–40자"는 두 출처를 겹쳐 잡은 범위이고, 한 연구가 30–40자를 직접 권한 것은 아니다.
- 신종현 · 박민용 실험의 조건: 18명, 굴림 12pt, 17인치 모니터(1024×768), 10 · 30 · 50자와 줄 간격 50 · 100 · 200%. 읽기 속도는 50자 · 줄 간격 100%에서 가장 빨랐다. 2003년 CRT 환경이고 사람 수가 적어 지금 화면에 그대로 옮기기는 조심스럽다. 이 논문의 "줄 간격 100%"는 줄 사이 빈 공간이 한 줄만큼이라는 뜻이라, CSS line-height로 몇에 해당하는지는 글자 크기 정의에 따라 달라서 숫자로 옮기지 않았다.
- 이수정 · 정우현 · 정찬섭 「글자꼴, 글줄길이, 글줄모양과 한글의 가독성」(1993, 한글 및 한국어 정보처리 학술발표 논문집)도 같은 주제지만, 서지만 확인했고 초록 · 본문을 읽지 못해 규칙에 넣지 않았다.
- 미리보기 본문 폭은 36em으로 잡았다. 한글 한 글자가 대략 1em이고 띄어쓰기 · 문장부호 · 숫자는 더 좁아서 실제로는 한 줄 40자 안팎이 된다(어림). 본문 크기 17px도 출처 없는 어림값이다.
- W3C 「Requirements for Hangul Text Layout and Typography」(klreq, 2026-03 Group Note 초안)은 행간 방식 네 가지와 줄 폭을 설명하지만 권장 숫자는 주지 않는다.
