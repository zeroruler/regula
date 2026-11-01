---
name: "백그라운드 작업"
en: "Background task"
category: "로딩"
wait: 9
use_when: "몇 분 넘게 걸리는 작업. 사용자를 붙잡지 않고 다른 일을 하게 두었다가, 끝나면 알린다."
avoid_when: "결과가 있어야 다음 단계로 갈 수 있는 작업. 끝났다는 알림을 놓칠 수 있는 곳(알림 권한 없음)."
fits: "몇 분 이상 · 기다릴 필요 없는 작업"
confused_with: "진행 막대: 진행 막대는 지켜보며 기다리게 하고, 백그라운드 작업은 떠나도 되게 한다. 끝나면 토스트나 알림으로"
source: "Nielsen Norman Group 「Progress Indicators Make a Slow System Less Insufferable」"
refs: ["nngroup"]
mock: "<div class=\"ln d\"></div><div class=\"ln\"></div><div class=\"ln\" style=\"width:70%\"></div><div class=\"tag\" style=\"left:12px;right:12px;bottom:12px;border-radius:6px\">영상을 내보내는 중 · 끝나면 알려 드려요</div>"
---
