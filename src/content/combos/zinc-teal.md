---
name: "회색과 청록"
order: 8
basis: "자유 라이선스 팔레트"
group: "뉴트럴과 포인트 하나"
principles: ["60-30-10"]
source: "Tailwind CSS v3 기본 색(MIT)"
palette: "tailwind-v3"
mood: ["차분", "깔끔"]
use: ["헬스케어", "대시보드"]
note: "청록 700은 흰 면 위 글자로도 충분히 짙다. 다크에서는 400으로 밝힌다."
light:
  - { role: bg, hex: "#FAFAFA", from: "tailwind-v3/zinc/50", name: "zinc-50" }
  - { role: surface, hex: "#FFFFFF", from: "tailwind-v3/white", name: "white" }
  - { role: ink, hex: "#18181B", from: "tailwind-v3/zinc/900", name: "zinc-900" }
  - { role: key, hex: "#0F766E", from: "tailwind-v3/teal/700", name: "teal-700" }
dark:
  - { role: bg, hex: "#09090B", from: "tailwind-v3/zinc/950", name: "zinc-950" }
  - { role: surface, hex: "#18181B", from: "tailwind-v3/zinc/900", name: "zinc-900" }
  - { role: ink, hex: "#F4F4F5", from: "tailwind-v3/zinc/100", name: "zinc-100" }
  - { role: key, hex: "#2DD4BF", from: "tailwind-v3/teal/400", name: "teal-400" }
---
