---
name: "스트리밍 답변"
en: "Streaming response"
category: "AI 화면"
stage: 5
use_when: "답을 다 쓰는 데 몇 초 이상 걸릴 때. 쓰는 대로 보여 주면 첫 글자까지의 기다림이 짧아지고, 앞부분을 읽다가 멈출 수 있다."
avoid_when: "화면을 강제로 따라 내려 읽던 자리를 잃게 할 때, 화면 낭독기에 한 글자씩 읽힐 때, 멈춤 버튼이 없을 때."
fits: "답을 쓰는 동안"
confused_with: "스트리밍 텍스트(로딩): 같은 기법. AI 화면에서는 멈춤 버튼과 \"다 썼음\" 알림이 짝이다"
source: "Jakob Nielsen (1993) 응답 시간 한계 · Amershi 외, 「Guidelines for Human-AI Interaction」 (CHI, 2019) G8 쉽게 멈추게"
refs: ["hax-guidelines"]
mock: "<div class=\"aub\">모달이랑 바텀시트 차이?</div><div class=\"strm\" style=\"top:50px\">모달은 하던 일을 멈추고<i></i></div><span class=\"bm out\" style=\"right:14px;bottom:12px\">■ 멈추기</span>"
---
