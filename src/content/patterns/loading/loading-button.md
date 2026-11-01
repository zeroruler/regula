---
name: "로딩 버튼"
en: "Loading button"
category: "로딩"
wait: 2
use_when: "누른 버튼이 서버 응답을 기다리는 1–3초. 저장, 보내기, 결제처럼 두 번 누르면 곤란한 행동. 버튼 안에 작은 스피너를 넣고 그동안 다시 못 누르게 한다."
avoid_when: "화면 전체를 불러올 때(그때는 스켈레톤), 버튼 너비가 바뀌어 레이아웃이 흔들릴 때 — 라벨 자리를 지킨다."
fits: "1–3초 · 누른 그 자리"
confused_with: "스피너: 로딩 버튼은 무엇을 기다리는지(내가 누른 그 행동)가 분명하고, 중복 제출을 막는 역할까지 한다"
source: "GOV.UK Design System Button (중복 제출 막기) · Jakob Nielsen, 『Usability Engineering』 (1993) 응답 시간 한계"
refs: ["gov-uk"]
mock: "<div class=\"ln d\"></div><div class=\"ln\"></div><div class=\"ln\" style=\"width:60%\"></div><span class=\"bm fill\" style=\"left:14px;right:14px;bottom:12px;display:grid;place-items:center;height:26px\"><i class=\"spinbtn\"></i></span>"
---
