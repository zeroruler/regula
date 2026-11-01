---
name: "뒤로 가기"
en: "Back navigation"
category: "내비게이션"
scope: 5
use_when: "목록 → 상세처럼 한 겹 들어간 화면에서 방금 있던 곳으로 돌아가게 할 때. 화면 왼쪽 위 버튼, 가장자리 스와이프, 시스템 뒤로 키가 모두 같은 곳으로 가야 한다."
avoid_when: "최상위 화면(돌아갈 곳이 없다), 뒤로 가면 입력이 사라질 때 — 저장하거나 묻는다. 웹에서 브라우저 뒤로 가기를 막지 않는다."
fits: "지나온 화면 한 겹씩"
confused_with: "브레드크럼: 뒤로 가기는 지나온 기록을, 브레드크럼은 구조상 위치를 따라 올라간다. 라벨에 돌아갈 화면 이름을 쓰면 더 분명하다"
source: "Apple HIG Navigation bars"
refs: ["apple-hig"]
mock: "<div class=\"backm\"><i>‹</i><span>주문 내역</span><b>주문 상세</b></div><div class=\"ln d\" style=\"margin-top:14px;width:48%\"></div><div class=\"ln\"></div><div class=\"ln\" style=\"width:75%\"></div>"
---
