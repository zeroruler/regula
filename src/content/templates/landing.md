---
name: "랜딩 페이지"
order: 15
kind: "페이지 양식"
concept: "처음 온 사람이 무엇을 하는 곳인지 한 문장으로 알고, 할 일 하나를 바로 시작하는 화면. 꾸밈보다 실제 화면을, 재촉보다 시작 전에 알아야 할 것을 보여 준다."
preview: "/previews/landing/"
parts:
  - name: "머리글"
    note: "이름, 메뉴 몇 개, 로그인 링크"
  - name: "첫 화면"
    note: "무엇을 하는 곳인지 한 문장 + 부연 한 줄 + 주 버튼 하나와 보조 링크 + 실제 화면"
  - name: "하는 일"
    note: "주요 할 일 1–4개를 짧은 제목과 한 문장으로"
  - name: "실제 예시"
    note: "설명 대신 실제 화면 · 결과물"
  - name: "시작 전에 알 것"
    note: "비용, 걸리는 시간, 필요한 것"
  - name: "후기 · 쓰는 곳"
    note: "실제 사람 · 실제 출처만. 없으면 비워 둔다"
  - name: "마지막 버튼 + 바닥글"
    note: "첫 화면과 같은 주 버튼, 회사 정보는 한곳에"
states:
  - { key: "default", label: "기본" }
  - { key: "twoprimary", label: "주 버튼 둘" }
  - { key: "stock", label: "꾸밈용 그림" }
preview_note: "\"주 버튼 둘\"과 \"꾸밈용 그림\"은 피할 화면이에요. 제품 이름 · 문구 · 가격은 모두 예시입니다."
see:
  - { label: "버튼 (무게와 위계)", path: "patterns/buttons/" }
  - { label: "다크 패턴 (가짜 긴박감 · 숨은 비용)", path: "patterns/dark/" }
  - { label: "심리와 편향 (사회적 증거 · 희소성)", path: "principles/psychology/" }
  - { label: "글 본문 양식", path: "templates/article/" }
  - { label: "회원가입 양식", path: "templates/signup/" }
rules:
  - text: "첫 줄에서 무엇을 하는 곳인지 한 문장으로 말한다. 이름이 낯설수록, 표어가 이로움을 말하지 않을수록 더 필요하다."
    source: "Nielsen Norman Group 「Top 10 Guidelines for Homepage Usability」 (Jakob Nielsen, 2002) #1"
  - text: "브라우저 탭 제목은 서비스 이름으로 시작하고 짧게 설명한다. \"환영합니다\"로 시작하지 않는다."
    source: "Nielsen Norman Group 「Top 10 Guidelines for Homepage Usability」 #2"
  - text: "사람들이 이 페이지에 와서 하려는 일 1–4개에 분명한 시작점을 준다."
    source: "Nielsen Norman Group 「Top 10 Guidelines for Homepage Usability」 #4"
  - text: "말로 설명하기보다 실제 화면과 결과물을 보여 준다."
    source: "Nielsen Norman Group 「Top 10 Guidelines for Homepage Usability」 #6 (Specifics beat abstractions)"
  - text: "꾸밈용 스톡 사진은 쓰지 않는다. 사람들은 일반적인 인물 사진을 건너뛰고, 실제 사람 · 실제 제품 사진은 오래 본다."
    source: "Nielsen Norman Group 「Photos as Web Content」 (Jakob Nielsen, 2010) · 「Top 10 Guidelines…」 #10"
  - text: "가장 중요한 내용과 주 버튼은 첫 화면 안에. 시선의 57%가 첫 화면, 74%가 처음 두 화면에 머문다(1920×1080, 120명)."
    source: "Nielsen Norman Group 「Scrolling and Attention」 (Therese Fessenden, 2018)"
  - text: "첫 화면 아래가 끝처럼 보이지 않게 한다(거짓 바닥). 다음 내용이 살짝 걸쳐 보이면 내려 볼 이유가 생긴다."
    source: "Nielsen Norman Group 「Scrolling and Attention」 (Fessenden, 2018)"
  - text: "주 버튼은 한 화면에 하나. 둘째 행동은 보조 버튼이나 링크로. 버튼 글자는 누르면 일어나는 일을 말한다(\"무료로 시작하기\")."
    source: "GOV.UK Design System · Button · Start using a service"
  - text: "시작하기 전에 알아야 할 것 — 비용, 대략 걸리는 시간, 준비할 것 — 을 버튼 가까이에 적는다."
    source: "GOV.UK Design System · Start using a service"
  - text: "상자 · 색 · 그림으로 과하게 꾸미지 않는다. 사람들은 요란한 그래픽을 광고로 여기고 지나친다."
    source: "Nielsen Norman Group 「Top 10 Guidelines for Homepage Usability」 #9"
  - text: "저절로 넘어가는 캐러셀을 쓰지 않는다. 다음 패널은 사용자가 원할 때만. 5초 넘게 저절로 움직이는 것에는 멈춤 수단을 둔다."
    source: "Nielsen Norman Group 「Auto-Forwarding Carousels and Accordions Annoy Users and Reduce Visibility」 (Nielsen, 2013) · WCAG 2.2 · 2.2.2 Pause, Stop, Hide"
  - text: "소리를 저절로 틀지 않는다. 3초 넘게 나오면 멈추거나 음량을 따로 줄이는 수단이 있어야 한다."
    source: "WCAG 2.2 · 1.4.2 Audio Control · Understanding 1.4.2"
  - text: "그림이나 색 면 위의 글자도 본문 4.5:1, 큰 글자 3:1 대비를 지킨다."
    source: "WCAG 2.2 · 1.4.3 Contrast (Minimum)"
  - text: "가격은 처음부터 총액으로. 가짜 마감 시간 · 가짜 재고 · 지어낸 후기로 재촉하지 않는다."
    source: "deceptive.design (Hidden costs · Fake urgency · Fake scarcity · Fake social proof)"
---

## 메모

- 랜딩 페이지 전용 연구는 대부분 마케팅 회사의 전환율 글이라 쓰지 않았다. 홈페이지 · 첫 화면 · 시작 페이지를 다룬 NN/g · GOV.UK 글과 WCAG에서 랜딩 페이지에도 그대로 맞는 것만 골랐다.
- NN/g 「Top 10 Guidelines for Homepage Usability」는 2002년 글이다. 검색창 너비 같은 항목은 랜딩 페이지와 맞지 않아 뺐고, 목적을 한 문장으로 · 실제 예시 · 실제 사진 · 과한 꾸밈 피하기처럼 지금도 같은 원리만 옮겼다.
- 「Scrolling and Attention」의 숫자는 1920×1080 데스크톱 화면에서 잰 값이다. 휴대폰 화면에 그대로 옮길 수는 없다. 같은 글에서 2010년 조사는 첫 화면 80%였다.
- GOV.UK의 "시작 페이지"는 공공 서비스를 시작하는 페이지라 상업 랜딩 페이지와 목적이 다르다. 비용 · 시간 · 준비물을 먼저 알리는 것, 버튼 하나와 보조 링크라는 짜임만 가져왔다.
- 하는 일 "1–4개"는 NN/g의 주요 작업 개수(1–4)를 빌린 것이다. 기능 소개를 몇 칸으로 나누라는 출처는 찾지 못했다.
- 미리보기의 서비스 이름 "줄자"와 가격 · 문구는 지어낸 예시다.
