---
name: "터치 영역"
order: 11
topic: "사용성과 접근성"
equation: "iOS 기본 44 × 44pt · Android 48 × 48dp · 웹 최소 24 × 24px"
meaning: "눈에 보이는 아이콘이 작아도 눌리는 영역은 이만큼 확보합니다. Apple은 기본 44pt를 권하고 최소 28pt까지 허용하며, WCAG는 24px를 최소로 둡니다."
source: "Apple HIG Accessibility (기본 44 × 44pt · 최소 28 × 28pt) · Material Design · WCAG 2.2 2.5.8 Target Size (Minimum) (AA, 24 × 24 CSS px) · 2.5.5 Target Size (Enhanced) (AAA, 44 × 44 CSS px)"
refs: ["apple-hig","material-design-3","wcag-22"]
note: "WCAG의 간격 예외: 24px보다 작은 목표도 각 목표 중심에 지름 24px 원을 그렸을 때 다른 목표나 다른 원과 겹치지 않으면 통과한다. 문장 속 링크처럼 크기가 글줄 높이에 묶인 목표도 예외."
web: "아이콘이 16px이어도 버튼 상자(padding)를 키워 눌리는 영역을 24px 이상으로, 가능하면 44px로. 작은 목표끼리 붙여 놓았다면 중심 사이를 24px 이상 띄운다."
demo: true
---
