---
name: "생각 중 표시"
en: "Thinking indicator"
category: "AI 화면"
stage: 3
use_when: "보낸 뒤 첫 글자가 나오기까지 1초 넘게 걸릴 때. 답이 들어올 자리에서 무언가 일어나고 있음을 보인다."
avoid_when: "10초 넘게 점 세 개만 둘 때 — 그때는 지금 하는 일(단계)이나 멈춤 버튼을 보인다."
fits: "보낸 뒤 첫 글자까지"
confused_with: "스피너: 같은 역할을 답이 들어올 자리에서 한다. 화면 낭독기에는 \"답을 쓰는 중\"을 한 번만 알린다"
source: "Jakob Nielsen, 『Usability Engineering』 (1993) 응답 시간 한계 · WCAG 2.2 4.1.3 Status Messages"
refs: []
mock: "<div class=\"aub\">대비 기준 알려 줘</div><div class=\"adots\"><i></i><i></i><i></i></div><span class=\"aq\" style=\"margin-top:4px\">답을 쓰는 중</span>"
---
