---
name: "Radix Colors"
order: 3
maker: "WorkOS (Radix)"
license: "MIT"
license_url: "https://github.com/radix-ui/colors/blob/main/LICENSE"
data_url: "https://cdn.jsdelivr.net/npm/@radix-ui/colors@3.0.0/"
url: "https://www.radix-ui.com/colors"
source: "@radix-ui/colors 3.0.0 패키지의 라이트 CSS (2026-11-02 받음), 라이선스 MIT"
summary: "단계마다 쓰임이 정해진 12단계. 1–2 배경, 3–5 컴포넌트 면, 6–8 선, 9–10 단색 면, 11–12 글자."
partial: "30개가 넘는 스케일 중 gray · blue · green · red · amber · violet 6개의 라이트 값만 실었다. 다크 값과 P3 값은 원본 패키지에 있다."
scales:
  - name: "gray"
    steps:
      - { name: "1", hex: "#FCFCFC" }
      - { name: "2", hex: "#F9F9F9" }
      - { name: "3", hex: "#F0F0F0" }
      - { name: "4", hex: "#E8E8E8" }
      - { name: "5", hex: "#E0E0E0" }
      - { name: "6", hex: "#D9D9D9" }
      - { name: "7", hex: "#CECECE" }
      - { name: "8", hex: "#BBBBBB" }
      - { name: "9", hex: "#8D8D8D" }
      - { name: "10", hex: "#838383" }
      - { name: "11", hex: "#646464" }
      - { name: "12", hex: "#202020" }
  - name: "blue"
    steps:
      - { name: "1", hex: "#FBFDFF" }
      - { name: "2", hex: "#F4FAFF" }
      - { name: "3", hex: "#E6F4FE" }
      - { name: "4", hex: "#D5EFFF" }
      - { name: "5", hex: "#C2E5FF" }
      - { name: "6", hex: "#ACD8FC" }
      - { name: "7", hex: "#8EC8F6" }
      - { name: "8", hex: "#5EB1EF" }
      - { name: "9", hex: "#0090FF" }
      - { name: "10", hex: "#0588F0" }
      - { name: "11", hex: "#0D74CE" }
      - { name: "12", hex: "#113264" }
  - name: "green"
    steps:
      - { name: "1", hex: "#FBFEFC" }
      - { name: "2", hex: "#F4FBF6" }
      - { name: "3", hex: "#E6F6EB" }
      - { name: "4", hex: "#D6F1DF" }
      - { name: "5", hex: "#C4E8D1" }
      - { name: "6", hex: "#ADDDC0" }
      - { name: "7", hex: "#8ECEAA" }
      - { name: "8", hex: "#5BB98B" }
      - { name: "9", hex: "#30A46C" }
      - { name: "10", hex: "#2B9A66" }
      - { name: "11", hex: "#218358" }
      - { name: "12", hex: "#193B2D" }
  - name: "red"
    steps:
      - { name: "1", hex: "#FFFCFC" }
      - { name: "2", hex: "#FFF7F7" }
      - { name: "3", hex: "#FEEBEC" }
      - { name: "4", hex: "#FFDBDC" }
      - { name: "5", hex: "#FFCDCE" }
      - { name: "6", hex: "#FDBDBE" }
      - { name: "7", hex: "#F4A9AA" }
      - { name: "8", hex: "#EB8E90" }
      - { name: "9", hex: "#E5484D" }
      - { name: "10", hex: "#DC3E42" }
      - { name: "11", hex: "#CE2C31" }
      - { name: "12", hex: "#641723" }
  - name: "amber"
    steps:
      - { name: "1", hex: "#FEFDFB" }
      - { name: "2", hex: "#FEFBE9" }
      - { name: "3", hex: "#FFF7C2" }
      - { name: "4", hex: "#FFEE9C" }
      - { name: "5", hex: "#FBE577" }
      - { name: "6", hex: "#F3D673" }
      - { name: "7", hex: "#E9C162" }
      - { name: "8", hex: "#E2A336" }
      - { name: "9", hex: "#FFC53D" }
      - { name: "10", hex: "#FFBA18" }
      - { name: "11", hex: "#AB6400" }
      - { name: "12", hex: "#4F3422" }
  - name: "violet"
    steps:
      - { name: "1", hex: "#FDFCFE" }
      - { name: "2", hex: "#FAF8FF" }
      - { name: "3", hex: "#F4F0FE" }
      - { name: "4", hex: "#EBE4FF" }
      - { name: "5", hex: "#E1D9FF" }
      - { name: "6", hex: "#D4CAFE" }
      - { name: "7", hex: "#C2B5F5" }
      - { name: "8", hex: "#AA99EC" }
      - { name: "9", hex: "#6E56CF" }
      - { name: "10", hex: "#654DC4" }
      - { name: "11", hex: "#6550B9" }
      - { name: "12", hex: "#2F265F" }
---
다른 팔레트와 다른 점은 단계 번호가 곧 쓰임이라는 것. 문서(Understanding the scale)는 단계마다 쓰는 곳을 정해 둔다.

- 1–2 앱 배경 · 은은한 면(카드, 사이드바, 코드 블록)
- 3–5 컴포넌트 면 — 3 기본, 4 호버, 5 눌림 · 선택
- 6–8 테두리 — 6 비대화형, 7 대화형, 8 더 강한 테두리와 포커스 링
- 9–10 단색 면 — 9 기본, 10 호버
- 11–12 글자 — 11 대비 낮은 글자, 12 대비 높은 글자

다크 스케일도 같은 번호로 쓰게 맞춰져 있어서, 모드를 바꿀 때 번호는 그대로 두고 스케일만 바꾸면 된다.
