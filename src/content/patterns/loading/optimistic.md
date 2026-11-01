---
name: "낙관적 업데이트"
en: "Optimistic UI"
category: "로딩"
wait: 1
use_when: "좋아요, 저장, 체크처럼 거의 늘 성공하는 작은 행동. 서버 응답을 기다리지 않고 화면부터 바꾼다."
avoid_when: "실패가 잦거나 실패하면 손해가 큰 행동(결제, 송금). 실패하면 되돌리고 그 사실을 알려야 한다."
fits: "결과를 바로 보여 줄 수 있을 때 · 0.1초 안의 반응"
confused_with: "스피너: 스피너는 기다림을 보여 주고, 낙관적 업데이트는 기다림을 숨긴다"
source: "Jakob Nielsen, 『Usability Engineering』 (1993) 응답 시간 한계 0.1초"
refs: []
mock: "<div class=\"frow\"><b></b><i class=\"heart on\">♥</i></div><div class=\"frow\"><b style=\"width:44%\"></b><i class=\"heart\">♡</i></div><div class=\"frow\"><b style=\"width:52%\"></b><i class=\"heart\">♡</i></div>"
---
