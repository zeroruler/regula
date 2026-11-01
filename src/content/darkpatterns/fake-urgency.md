---
name: "가짜 마감 시계"
en: "Fake urgency (Fake countdown)"
order: 3
trick: "\"오늘만 70% 할인\"에 초 단위 시계를 붙인다. 시계가 0이 되어도 할인은 그대로이거나, 새로고침하면 다시 시작된다."
honest: "실제 마감이 있을 때만, 날짜로 알린다. 시계는 실제로 끝나는 순간이 있을 때만 쓴다."
bias: ["loss-aversion", "scarcity"]
source: "Harry Brignull, deceptive.design 「Fake urgency」 · Mathur 외, 「Dark Patterns at Scale」 (CSCW, 2019)"
refs: ["deceptive-design"]
mock: "<div class=\"dk dk-c\"><span class=\"dk-note\">오늘만 70% 할인</span><span class=\"dk-big\">00:00:03</span><span class=\"dk-faint\">곧 마감돼요</span></div>"
fix: "<div class=\"dk dk-c\"><span class=\"dk-note\">할인</span><span class=\"dk-big\" style=\"font-size:15px\">11월 30일까지</span><span class=\"dk-faint\">날짜가 바뀌어도 그대로예요</span></div>"
---
