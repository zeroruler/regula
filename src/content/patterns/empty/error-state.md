---
name: "오류 상태"
en: "Error state"
category: "빈 상태"
block: 9
use_when: "불러오지 못했을 때, 오프라인일 때. 무슨 일이 생겼는지 쉬운 말로, 할 수 있는 일(다시 시도)과 함께."
avoid_when: "오류 코드만 보여 줄 때, 사용자를 탓하는 말투. 이미 불러온 내용을 지우고 빈 오류 화면으로 바꿀 때."
fits: "불러오지 못했을 때"
confused_with: "결과 없음: \"없어요\"와 \"불러오지 못했어요\"를 섞으면 사람들은 데이터가 사라졌다고 믿는다"
source: "Nielsen Norman Group 「Designing Empty States in Complex Applications」 · WCAG 2.2 4.1.3 Status Messages"
refs: ["nngroup"]
mock: "<div class=\"emm\"><i class=\"emi\">!</i><b>목록을 불러오지 못했어요</b><span>연결을 확인한 뒤 다시 시도해 주세요</span><em class=\"bm fill\" style=\"position:static\">다시 시도</em></div>"
---
