---
name: "청록과 빨강 (Open Color)"
order: 14
basis: "자유 라이선스 팔레트"
principles: ["complementary"]
source: "Open Color(MIT)"
palette: "open-color"
mood: ["선명"]
use: ["랜딩"]
note: "청록 9단계만 흰 면 위 본문 글자 대비(4.5:1)를 넘는다. 빨강은 오류처럼 보이기 쉬워 장식 점으로만."
light:
  - { role: bg, hex: "#F8F9FA", from: "open-color/gray/0", name: "gray-0" }
  - { role: surface, hex: "#FFFFFF", from: "open-color/white", name: "white" }
  - { role: ink, hex: "#212529", from: "open-color/gray/9", name: "gray-9" }
  - { role: key, hex: "#087F5B", from: "open-color/teal/9", name: "teal-9" }
  - { role: accent, hex: "#FA5252", from: "open-color/red/6", name: "red-6" }
dark:
  - { role: bg, hex: "#212529", from: "open-color/gray/9", name: "gray-9" }
  - { role: surface, hex: "#343A40", from: "open-color/gray/8", name: "gray-8" }
  - { role: ink, hex: "#F8F9FA", from: "open-color/gray/0", name: "gray-0" }
  - { role: key, hex: "#63E6BE", from: "open-color/teal/3", name: "teal-3" }
  - { role: accent, hex: "#FF8787", from: "open-color/red/4", name: "red-4" }
---
