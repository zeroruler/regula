---
name: "파랑과 분홍 (Open Color)"
order: 32
basis: "자유 라이선스 팔레트"
group: "선명한 두 색"
principles: ["complementary", "60-30-10"]
source: "Open Color(MIT) · 흰색은 Tailwind white"
palette: "open-color"
mood: ["선명", "밝음"]
use: ["교육", "커뮤니티"]
note: "Open Color 파랑 키에 분홍과 주황 한 점씩. 다크에서는 주황 대신 노랑을 쓴다."
light:
  - { role: bg, hex: "#F8F9FA", from: "open-color/gray/0", name: "gray-0" }
  - { role: surface, hex: "#FFFFFF", from: "tailwind-v3/white", name: "white" }
  - { role: ink, hex: "#212529", from: "open-color/gray/9", name: "gray-9" }
  - { role: key, hex: "#1971C2", from: "open-color/blue/8", name: "blue-8" }
  - { role: accent, hex: "#E64980", from: "open-color/pink/6", name: "pink-6" }
  - { role: accent, hex: "#F76707", from: "open-color/orange/7", name: "orange-7" }
dark:
  - { role: bg, hex: "#212529", from: "open-color/gray/9", name: "gray-9" }
  - { role: surface, hex: "#343A40", from: "open-color/gray/8", name: "gray-8" }
  - { role: ink, hex: "#F8F9FA", from: "open-color/gray/0", name: "gray-0" }
  - { role: key, hex: "#74C0FC", from: "open-color/blue/3", name: "blue-3" }
  - { role: accent, hex: "#F783AC", from: "open-color/pink/4", name: "pink-4" }
  - { role: accent, hex: "#FFD43B", from: "open-color/yellow/4", name: "yellow-4" }
---
