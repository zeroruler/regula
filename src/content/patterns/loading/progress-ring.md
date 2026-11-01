---
name: "진행 링"
en: "Progress ring"
category: "로딩"
wait: 7
use_when: "진행률을 아는 작업인데 막대를 놓을 가로 자리가 없을 때. 카드 안, 업로드 중인 썸네일 위, 작은 위젯."
avoid_when: "진행률을 모를 때(그때는 스피너), 남은 양을 정확히 견줘야 할 때 — 같은 퍼센트도 원보다 막대가 읽기 쉽다."
fits: "10초 이상 · 진행률을 아는 작업 · 좁은 자리"
confused_with: "스피너: 둘 다 원이지만 진행 링은 채워진 만큼이 뜻이 있고 숫자를 함께 둔다. 스피너는 끝을 모른다"
source: "Material Design 3 Progress indicators (circular) · Nielsen Norman Group 「Progress Indicators Make a Slow System Less Insufferable」"
refs: ["material-design-3", "nngroup"]
mock: "<div class=\"ringm\" style=\"--p:15\"><span>15%</span></div>"
---
