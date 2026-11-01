---
title: "WCAG 2.2"
author: "W3C · 웹 콘텐츠 접근성 지침 (W3C 권고안, 2024-12-12판)"
group: "공개 디자인 시스템"
order: 9
summary: "웹 접근성의 국제 표준. 성공 기준마다 번호와 수준(A · AA · AAA)이 있고, 대부분 숫자로 확인할 수 있다."
url: "https://www.w3.org/TR/WCAG22/"
---

## 읽는 법

- 원칙 4개(인식 · 운용 · 이해 · 견고) 아래 지침, 그 아래 성공 기준이 있다. 번호 1.4.3은 1번 원칙 · 4번 지침 · 3번 기준.
- 수준은 A(최소) · AA · AAA. 법과 조달 기준은 대개 AA를 요구한다. AAA는 모든 콘텐츠에 다 지키기 어려워 전체 목표로는 권하지 않는다.
- 기준마다 Understanding 문서(왜 필요한지, 예외)와 How to Meet(기법 목록)이 따로 있다. 판단이 애매하면 Understanding을 본다.

## 웹디자인에서 자주 쓰는 기준

- 글자 대비 4.5 : 1, 큰 글자(18pt · 굵은 14pt 이상) 3 : 1 — 1.4.3 (AA)
- 컴포넌트 경계 · 그래픽 대비 3 : 1 — 1.4.11 (AA)
- 색에만 기대지 않기 — 1.4.1 (A)
- 폭 320 CSS px에서 가로 스크롤 없이 — 1.4.10 (AA)
- 포커스 표시 2.4.7 (AA) · 포커스 순서 2.4.3 (A) · 포커스가 가려지지 않게 2.4.11 (AA)
- 눌리는 영역 24 × 24 CSS px — 2.5.8 (AA), 44 × 44 — 2.5.5 (AAA)
- 끌기에는 누르기 대안 — 2.5.7 (AA)

## 2.2에서 새로 생긴 것

2.4.11 · 2.4.12 Focus Not Obscured, 2.4.13 Focus Appearance, 2.5.7 Dragging Movements, 2.5.8 Target Size (Minimum), 3.2.6 Consistent Help, 3.3.7 Redundant Entry, 3.3.8 · 3.3.9 Accessible Authentication. 2.1에 있던 4.1.1 Parsing은 빠졌다.
