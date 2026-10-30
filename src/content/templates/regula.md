---
name: "Regula"
order: 4
kind: "디자인 시스템"
concept: "제도용 자. 상단 눈금 띠, 좌측 고정 목차, 가는 선으로 나눈 구획. 강조는 노란 형광펜 하나."
tokens_from: "src/styles/tokens.css"
preview: "/"
used_in: ["Regula (이 사이트)"]
signatures:
  - "눈금 띠 — 화면 맨 위의 자 눈금"
  - "노란 형광펜 하나 — 글자를 노랗게 칠하지 않고 밑에 깔기만"
  - "카드 대신 선 — 구획은 1px 선과 여백으로"
avoid:
  - "카드·박스를 남발하는 레이아웃"
  - "노란색 글자 (흰 배경에서 안 읽힘)"
swatch: ["--paper", "--surface", "--ink", "--ink-2", "--rule", "--mark"]
---

## 메모

- 서체: 제목 Hahmlet / 본문 IBM Plex Sans KR / 라벨·수치 IBM Plex Mono.
- 토큰은 src/styles/tokens.css가 원본이다. PLAN §5 표와 같이 고친다.
