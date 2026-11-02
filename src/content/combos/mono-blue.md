---
name: "흑백과 파랑"
order: 1
basis: "자유 라이선스 팔레트"
group: "뉴트럴과 포인트 하나"
principles: ["60-30-10"]
source: "Tailwind CSS v3 기본 색(MIT)"
palette: "tailwind-v3"
mood: ["깔끔", "차가움"]
use: ["SaaS", "대시보드"]
note: "거의 흰 바탕과 거의 검은 글자에 파랑 하나. 회색은 zinc라 살짝 차갑다. 가장 무난한 출발점."
light:
  - { role: bg, hex: "#FAFAFA", from: "tailwind-v3/zinc/50", name: "zinc-50" }
  - { role: surface, hex: "#FFFFFF", from: "tailwind-v3/white", name: "white" }
  - { role: ink, hex: "#09090B", from: "tailwind-v3/zinc/950", name: "zinc-950" }
  - { role: key, hex: "#2563EB", from: "tailwind-v3/blue/600", name: "blue-600" }
dark:
  - { role: bg, hex: "#09090B", from: "tailwind-v3/zinc/950", name: "zinc-950" }
  - { role: surface, hex: "#18181B", from: "tailwind-v3/zinc/900", name: "zinc-900" }
  - { role: ink, hex: "#FAFAFA", from: "tailwind-v3/zinc/50", name: "zinc-50" }
  - { role: key, hex: "#3B82F6", from: "tailwind-v3/blue/500", name: "blue-500" }
---
