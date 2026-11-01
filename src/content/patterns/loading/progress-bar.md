---
name: "진행 막대"
en: "Progress bar"
category: "로딩"
wait: 8
use_when: "10초 넘게 걸리고 진행률을 알 수 있는 작업. 업로드, 내보내기. 퍼센트나 남은 시간을 같이."
avoid_when: "진행률을 모르는데 가짜로 채울 때 — 99%에서 멈추면 신뢰를 잃는다. 그때는 단계 이름(\"압축하는 중\")이라도 보여 준다."
fits: "10초 이상 · 진행률을 아는 작업"
confused_with: "스피너: 진행 막대는 얼마나 남았는지 알려서 기다릴지 떠날지 정하게 해 준다"
source: "Jakob Nielsen (1993) 응답 시간 한계 10초 · Nielsen Norman Group 「Progress Indicators Make a Slow System Less Insufferable」"
refs: ["nngroup"]
mock: "<b class=\"flab\" style=\"width:40%\"></b><div class=\"pbm\"><i style=\"width:62%\"></i></div><span class=\"fcount\" style=\"text-align:left\">62% · 약 20초 남음</span>"
---
