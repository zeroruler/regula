---
name: "랜드마크"
en: "Landmarks"
category: "키보드와 구조"
shown: 2
use_when: "머리말 · 메뉴 · 본문 · 꼬리말처럼 화면에서 덩어리로 보이는 영역을 header · nav · main · footer 같은 요소(랜드마크)로 표시하고, 페이지의 모든 내용을 어느 영역 안에 둔다. 보조 기술 사용자는 영역 사이를 바로 옮겨 다니며 되풀이되는 메뉴를 건너뛴다."
avoid_when: "같은 종류의 영역이 둘 이상인데 이름 없이 두는 것(메뉴가 둘이면 \"주 메뉴\" · \"바닥 메뉴\"처럼 aria-label로 구별). 랜드마크는 제목 · 목록 같은 구조 표시를 대신하지 않고 더하는 것이다."
fits: "화면 낭독기의 영역 목록이나 접근성 검사 도구로 영역 이름을 훑어본다"
confused_with: "건너뛰기 링크: 랜드마크는 보조 기술이 영역 사이를 뛰는 길이고, 건너뛰기 링크는 키보드만 쓰는 사람도 보이는 링크로 같은 일을 하게 한다. 둘 다 둔다"
source: "WCAG 2.2 1.3.1 Info and Relationships (A) · 2.4.1 Bypass Blocks (A) · Technique ARIA11"
refs: ["wcag-22"]
mock: "<div class=\"kblm\"><span>header</span></div><div class=\"kblm-row\"><div class=\"kblm\"><span>nav</span></div><div class=\"kblm main\"><span>main</span></div></div><div class=\"kblm\"><span>footer</span></div>"
---
