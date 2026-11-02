---
name: "오류 페이지"
order: 17
kind: "페이지 양식"
concept: "없는 페이지를 열었거나 서비스가 고장 났을 때, 무슨 일인지 쉬운 말로 알리고 다음에 할 일을 주는 화면. 사용자를 탓하지 않고, 하던 일이 어떻게 됐는지 말한다."
preview: "/previews/error-pages/"
parts:
  - name: "제목"
    note: "무슨 일인지 한 줄. \"페이지를 찾을 수 없어요\"처럼 쉬운 말로. 404 · 500 같은 숫자는 쓰지 않는다"
  - name: "설명"
    note: "왜 이런지, 사용자가 할 일을 짧게. 주소를 직접 쳤는지 붙여 넣었는지에 따라 안내가 다르다"
  - name: "하던 일의 상태"
    note: "입력하던 내용이 저장됐는지, 처음부터 다시 해야 하는지를 분명히"
    optional: true
  - name: "다음 길"
    note: "찾기 · 홈 · 비슷한 페이지 링크, 또는 \"나중에 다시 시도\". 막다른 길로 두지 않는다"
  - name: "연락처"
    note: "있고 도움이 될 때만. 번호와 운영 시간을 함께 적거나 그것이 있는 페이지로 링크"
    optional: true
states:
  - { key: "notfound", label: "페이지 없음" }
  - { key: "problem", label: "서비스 문제" }
  - { key: "unavailable", label: "서비스 중단" }
preview_note: "세 가지 오류를 서로 다른 화면으로 나눴어요. 서비스 문제 화면에서 \"저장됨 / 저장 안 됨\"을 바꿔 볼 수 있습니다. 서비스 이름 · 날짜 · 전화번호는 모두 예시예요."
see:
  - { label: "문구 (쉬운 말 · 탓하지 않기)", path: "patterns/writing/" }
  - { label: "빈 상태 (다음 행동 주기)", path: "patterns/states/" }
  - { label: "찾기와 거르기 (검색창)", path: "patterns/search/" }
  - { label: "다크 패턴 (속이지 않는 문구)", path: "patterns/dark/" }
rules:
  - text: "없는 페이지에는 \"페이지를 찾을 수 없어요\"처럼 한 줄로 말한다. 링크나 버튼이 없는 페이지로 이어졌을 때, 주소를 틀리게 쳤을 때 모두 같은 화면을 쓴다."
    source: "GOV.UK Design System · Page not found pages"
  - text: "404 · bad request 같은 기술 용어를 제목에 쓰지 않는다."
    source: "GOV.UK Design System · Page not found pages · There is a problem with the service pages"
  - text: "사용자를 탓하지 않는다. 가볍게 사과하고, 요청한 주소를 사이트에서 찾지 못했다고만 말한다."
    source: "GOV.UK Design System · Page not found pages · Jakob Nielsen, 「Improving the Dreaded 404 Error Message」 (NN/g, 1998)"
  - text: "\"앗!\" 같은 가벼운 말투나 농담을 피한다. 일을 하다 막힌 사람에겐 웃음이 아니라 다음 길이 필요하다."
    source: "GOV.UK Design System · Page not found pages (\"Avoid informal or humorous language\")"
  - text: "경고하겠다고 글자를 빨갛게 하지 않는다."
    source: "GOV.UK Design System · Page not found · Problem with the service · Service unavailable pages"
  - text: "오류 화면에는 브레드크럼을 두지 않는다."
    source: "GOV.UK Design System · Page not found · Problem with the service · Service unavailable pages"
  - text: "직접 친 주소와 붙여 넣은 주소를 나눠 안내한다. 쳤다면 주소가 맞는지, 붙여 넣었다면 주소 전체를 복사했는지 확인하게 한다."
    source: "GOV.UK Design System · Page not found pages"
  - text: "왜 못 찾았는지 설명하고, 철자가 비슷한 유효한 페이지를 눌러 갈 수 있는 링크로 제안한다."
    source: "Jakob Nielsen, 「Improving the Dreaded 404 Error Message」 (NN/g, 1998)"
  - text: "사이트 검색창을 오류 화면에 둔다. 찾던 것이 있는지 바로 찾아볼 수 있다."
    source: "Jakob Nielsen, 「Improving the Dreaded 404 Error Message」 (NN/g, 1998)"
  - text: "예상하지 못한 문제는 종류와 상관없이 같은 \"서비스에 문제가 있어요\" 화면 하나로 보여 주고, 어떤 오류였는지 모두 기록해 빨리 고친다. 이 화면은 잠깐만 띄운다."
    source: "GOV.UK Design System · There is a problem with the service pages"
  - text: "\"기술적인 어려움을 겪고 있습니다\" 같은 말은 쓰지 않는다. \"나중에 다시 시도해 주세요\"처럼 사용자가 할 일을 쓴다."
    source: "GOV.UK Design System · There is a problem with the service pages"
  - text: "입력하던 내용이 어떻게 됐는지 말한다. 저장했다면 얼마나 보관하는지(\"30일\"), 저장하지 않았다면 처음부터 다시 해야 한다고 적는다."
    source: "GOV.UK Design System · There is a problem with the service pages"
  - text: "문제가 금방 고쳐지지 않으면 서비스를 닫고 \"서비스 중단\" 화면으로 바꾼다. 다시 열리는 요일 · 날짜 · 시각을 쓰고, \"점검\" \"개선\" 같은 모호한 말은 피한다."
    source: "GOV.UK Design System · Service unavailable pages"
  - text: "연락처는 있고 도움이 될 때만 넣는다. 번호와 운영 시간을 모두 적거나, 그것이 있는 페이지로 링크한다. 같은 일을 할 수 있는 다른 서비스가 있으면 링크한다."
    source: "GOV.UK Design System · Page not found · Problem with the service · Service unavailable pages"
---

## 메모

- 출처 대부분이 GOV.UK 디자인 시스템이라 공공 서비스 기준이다. 상점 · 앱에 그대로 옮길 때는 연락처와 다른 서비스 링크 규칙을 상황에 맞게 줄이면 된다.
- 「Improving the Dreaded 404 Error Message」는 1998년 글이다. 문구와 검색창 제안의 원리만 가져왔고, 서버 로그로 흔한 철자 실수를 모으라는 방법은 오늘의 사이트에 맞게 줄여 썼다.
- GOV.UK "서비스에 문제가 있어요" 페이지는 다시 시도 버튼 같은 재시도 장치를 설명하지 않는다. 미리보기의 "다시 시도" 버튼은 Regula의 예시다.
- 미리보기의 서비스 이름 · 날짜 · 전화번호는 지어낸 예시다.
