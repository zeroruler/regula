---
name: "스낵바"
en: "Snackbar"
category: "알림"
intrusiveness: 4
use_when: "되돌릴 수 있는 행동 직후. \"되돌리기\" 하나를 제공."
avoid_when: "버튼이 두 개 이상 필요할 때."
dismiss: "4–10초 (MDC Web 허용 범위 · Compose M3 짧게 4초 · 길게 10초) · 호버 · 포커스 중엔 멈춤 (어림)"
actions: "1개"
confused_with: "토스트: 액션 유무가 유일한 차이"
source: "인스타 릴스 '알림 9가지' · Material Design 3 Snackbar · 시간: material-components-web mdc-snackbar constants.ts (4000–10000ms, 기본 5000) · androidx Compose Material3 SnackbarHost.kt (Short 4000 · Long 10000ms)"
refs: ["material-design-3"]
mock: "<div class=\"ln d\"></div><div class=\"tag\" style=\"left:12px;right:12px;bottom:12px;border-radius:6px;display:flex;justify-content:space-between\"><span>지원서를 삭제했어요</span><span style=\"color:var(--mark)\">되돌리기</span></div>"
---
