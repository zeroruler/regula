---
name: "페이지 언어"
en: "Page language"
category: "키보드와 구조"
shown: 1
use_when: "모든 페이지에. 문서 맨 위 html 요소에 lang=\"ko\"처럼 주된 언어를 적고, 본문 속 다른 언어 문장 · 구절에는 그 부분에만 lang을 따로 단다. 화면 낭독기가 이 값으로 읽는 목소리와 발음을 고른다."
avoid_when: "고유명사 · 전문 용어 · 이미 우리말처럼 쓰는 낱말(와이파이, 앱)에까지 하나하나 다는 것. 기준도 이런 말은 따로 표시하지 않아도 된다고 둔다."
fits: "html의 lang 값과 본문 속 외국어 구절의 lang을 개발자 도구로 본다"
confused_with: "언어 바꾸기 메뉴: 메뉴는 사람이 고르는 것이고, lang은 지금 페이지가 어떤 말로 쓰였는지 기계에게 알리는 값이다"
source: "WCAG 2.2 3.1.1 Language of Page (A) · 3.1.2 Language of Parts (AA) · Understanding Language of Page"
refs: ["wcag-22"]
mock: "<div class=\"kbcode\">&lt;html <b>lang=\"ko\"</b>&gt;</div><div class=\"ln\"></div><div class=\"ln\" style=\"width:72%\"></div><div class=\"kbcode\">&lt;q <b>lang=\"en\"</b>&gt;Less is more&lt;/q&gt;</div><div class=\"ln\" style=\"width:84%\"></div>"
---
