---
name: "끼워 팔기"
en: "Sneak into basket (Sneaking)"
order: 5
trick: "고르지 않은 상품(보험, 기부, 추가 옵션)을 장바구니에 슬쩍 넣어 둔다. 빼지 않으면 같이 결제된다."
honest: "추가 상품은 제안만 하고, 넣는 것은 사용자가. 합계에 무엇이 들어 있는지 한 줄씩 보이게."
bias: ["default-effect"]
source: "Harry Brignull, deceptive.design 「Sneaking」 · Mathur 외, 「Dark Patterns at Scale」 (CSCW, 2019)"
refs: ["deceptive-design"]
mock: "<div class=\"dk\"><b>장바구니</b><span class=\"dk-row\"><i>이력서 첨삭</i><i>30,000</i></span><span class=\"dk-ck on\">파손 보험 +3,000</span><span class=\"dk-row dk-sum\"><i>합계</i><i>33,000원</i></span></div>"
fix: "<div class=\"dk\"><b>장바구니</b><span class=\"dk-row\"><i>이력서 첨삭</i><i>30,000</i></span><span class=\"dk-ck\">파손 보험 추가 +3,000</span><span class=\"dk-row dk-sum\"><i>합계</i><i>30,000원</i></span></div>"
---
