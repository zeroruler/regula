---
name: "응답 시간 한계"
order: 10.4
topic: "사용성과 접근성"
equation: "0.1초 바로 반응 · 1초 생각이 안 끊김 · 10초 주의가 머묾"
meaning: "0.1초 안이면 사용자는 자기가 직접 움직였다고 느끼고, 1초 안이면 지연은 느껴도 생각의 흐름은 이어지며, 10초를 넘으면 다른 일로 주의가 떠난다. 응답이 빠를수록 사람도 빨라진다 — IBM의 1982년 보고서는 응답이 3초에서 0.3초로 줄자 프로그래머의 시간당 처리 건수가 약 180건에서 371건으로 늘었다고 적었다."
source: "Jakob Nielsen, 『Usability Engineering』 (1993) 5장 · 「Response Times: The 3 Important Limits」 (NN/g) · Walter J. Doherty · Arvind J. Thadhani, 「The Economic Value of Rapid Response Time」 (IBM, 1982)"
refs: ["nngroup","laws-of-ux"]
note: "흔히 \"도허티 임계값 400ms\"로 알려졌지만, 확인한 1982년 보고서 사본에는 400ms라는 숫자가 없고 \"1초 미만(sub-second)\" 응답을 권한다. 400ms는 출처를 확인하지 못한 수치로 둔다."
web: "누르면 0.1초 안에 눌린 상태를 보여 주고, 1초를 넘길 일은 스피너 · 스켈레톤을, 10초를 넘길 일은 진행률과 남은 시간을 보여 준다. 고르는 법은 로딩 패턴에 있다."
demo: false
---
