---
name: "단계 표시"
en: "Stepper"
category: "로딩"
wait: 8
use_when: "여러 단계를 거치는 긴 작업이나 과정. 퍼센트는 몰라도 \"업로드 → 분석 → 정리\"처럼 지금 몇 번째 단계인지는 알 때."
avoid_when: "단계가 하나뿐이거나 단계 이름이 사용자에게 뜻이 없을 때(\"작업 2/3\"), 단계 사이를 자유롭게 오가야 할 때 — 그때는 탭."
fits: "단계 3–5개 · 긴 작업이나 여러 화면에 걸친 입력"
confused_with: "진행 막대: 진행 막대는 양을, 단계 표시는 순서와 지금 위치를 보여 준다. 끝난 단계는 체크로"
source: "IBM Carbon Progress indicator · Nielsen Norman Group 「Progress Indicators Make a Slow System Less Insufferable」"
refs: ["ibm-carbon", "nngroup"]
mock: "<div class=\"stepm\"><i class=\"done\">✓</i><b class=\"done\"></b><i class=\"on\">2</i><b></b><i>3</i></div><div class=\"stepl\"><span>업로드</span><span>분석</span><span>정리</span></div>"
---
