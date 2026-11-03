---
name: "포커스 가두기"
en: "Focus trap in a modal"
category: "키보드와 구조"
shown: 8
use_when: "모달 대화 상자를 열었을 때. 포커스를 상자 안으로 옮기고, Tab · Shift+Tab은 상자 안에서만 돈다(뒤쪽 화면은 건드릴 수 없게). Esc로 닫히고, 닫히면 상자를 연 버튼으로 포커스가 돌아온다."
avoid_when: "나갈 길 없이 가두는 것 — Esc도 닫기 버튼도 안 듣는 상자는 키보드 사용자를 그 자리에 묶는다. 표준이 아닌 키로 나가게 했다면 그 방법을 알린다."
fits: "상자를 연 뒤 Tab을 여러 번 눌러 뒤쪽으로 새지 않는지, Esc로 닫고 원래 버튼으로 돌아오는지 본다"
confused_with: "키보드 함정: 둘 다 포커스를 묶지만, 포커스 가두기는 Esc · 닫기로 언제든 나갈 수 있고 키보드 함정은 나갈 수 없다"
source: "W3C WAI-ARIA APG Dialog (Modal) Pattern · WCAG 2.2 2.1.2 No Keyboard Trap (A) · Understanding No Keyboard Trap"
refs: ["wcag-22"]
mock: "<div class=\"kbdim\"><div class=\"kbdlg\"><b></b><div class=\"ln\"></div><div class=\"ln\" style=\"width:70%\"></div><div class=\"kbbtns\"><i></i><i class=\"on\"></i></div></div><span class=\"kbloop\">Tab ↻ 안에서만 · Esc 닫기</span></div>"
---
