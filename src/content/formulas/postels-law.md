---
name: "포스텔의 법칙"
order: 10.5
topic: "사용성과 접근성"
equation: "받을 때는 너그럽게 · 내보낼 때는 엄격하게"
meaning: "원래는 인터넷 통신 규약(TCP)의 원칙이다 — 남이 보낸 것은 너그럽게 받고, 내가 보내는 것은 규격대로 엄격하게. 화면에서는 사용자가 넣는 값은 여러 형식을 받아 주고, 저장하고 보여 주는 값은 한 형식으로 정리한다는 뜻이 된다."
source: "Jon Postel (ed.), RFC 761 「DOD Standard Transmission Control Protocol」 (1980) · RFC 1122 §1.2.2 Robustness Principle (1989) · GOV.UK Design System 「Telephone numbers」"
refs: ["laws-of-ux","gov-uk"]
note: "너그럽게 받기와 검사하지 않기는 다르다. 형식은 받아 주되 값이 틀리면 알려 준다. 통신 규약 쪽에서도 너무 너그러우면 잘못된 구현이 굳어진다는 비판이 있다(RFC 9413, 2023)."
web: "전화번호 칸은 010-1234-5678 · 010 1234 5678 · 01012345678을 모두 받아 숫자만 남기고, 확인 화면에는 한 형식으로 보여 준다. 공백 하나 때문에 오류를 띄우지 않는다."
demo: true
---
