---
name: "스켈레톤"
en: "Skeleton screen"
category: "로딩"
wait: 5
use_when: "화면 전체나 목록을 처음 불러올 때, 2–10초쯤. 실제 레이아웃 모양의 회색 틀이 먼저 자리를 잡는다."
avoid_when: "실제 모양과 다른 틀(다 불러오면 화면이 튄다), 10초 넘게 걸리는 작업, 작은 부분 하나."
fits: "2–10초 · 화면 전체 첫 로드"
confused_with: "스피너: 스켈레톤은 내용이 들어설 자리를 미리 보여 줘서 레이아웃이 튀지 않는다. 반짝임 효과는 움직임 줄이기 설정을 따른다"
source: "Nielsen Norman Group 「Skeleton Screens 101」"
refs: ["nngroup"]
mock: "<div class=\"skm\"><i style=\"width:30%\"></i><i></i><i style=\"width:85%\"></i></div><div class=\"skm\" style=\"margin-top:12px\"><i style=\"width:30%\"></i><i></i><i style=\"width:70%\"></i></div>"
---
