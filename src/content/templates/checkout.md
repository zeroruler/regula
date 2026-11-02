---
name: "결제"
order: 18
kind: "페이지 양식"
concept: "주문 내용과 금액을 마지막으로 확인하고 돈을 내는 화면. 얼마를 무엇에 내는지 처음부터 끝까지 같게 보이고, 바꿀 곳은 바로 고칠 수 있다. 끝나면 주문이 됐다는 증거를 남긴다."
preview: "/previews/checkout/"
parts:
  - name: "주문 내용"
    note: "상품 · 수량 · 가격. 항목마다 \"변경\" 링크"
  - name: "받는 곳 · 연락처"
    note: "이미 입력한 정보를 다시 묻지 않는다. 주문자와 같으면 고르기만"
  - name: "결제 수단"
    note: "고른 수단을 보여 주고 \"변경\"으로 바꾼다. 카드 칸은 자동 완성이 되게"
  - name: "금액"
    note: "상품 · 배송비 · 할인을 항목별로, 맨 아래에 총액. 처음 화면부터 같은 항목"
  - name: "확인 문장 + 결제 버튼"
    note: "버튼에 금액과 하는 일을 적는다. 누르기 전엔 아직 주문이 아니라는 걸 분명히"
  - name: "완료 화면"
    note: "주문 번호 · 다음에 일어날 일 · 연락처 · 기록 저장"
    optional: true
states:
  - { key: "default", label: "기본 (확인)" }
  - { key: "hidden", label: "추가 비용 숨김 (피할 것)" }
  - { key: "done", label: "결제 완료" }
preview_note: "\"변경\"을 누르면 그 항목만 고치고 확인 화면으로 돌아와요. \"추가 비용 숨김\"은 피해야 할 화면으로, 마지막에야 배송비가 더해지는 모습을 보여 줍니다. 상점 · 상품 · 금액 · 번호는 모두 예시예요."
see:
  - { label: "입력과 폼 (라벨 · 검증 시점)", path: "patterns/forms/" }
  - { label: "다크 패턴 (숨은 비용 · 미리 선택 · 숨은 정기결제)", path: "patterns/dark/" }
  - { label: "문구 (버튼 문구)", path: "patterns/writing/" }
  - { label: "회원가입 양식", path: "templates/signup/" }
  - { label: "오류 페이지 양식 (결제 중 서비스 문제)", path: "templates/error-pages/" }
rules:
  - text: "결제 직전에 주문 내용을 한 화면에 모아 확인하게 한다. 작은 거래는 확인 화면 하나면 된다."
    source: "GOV.UK Design System · Check answers pattern"
  - text: "확인 화면의 제목은 사용자가 할 일을 말한다. 예: \"주문 내용을 확인하고 결제하세요\"."
    source: "GOV.UK Design System · Check answers pattern"
  - text: "항목마다 \"변경\" 링크를 두고, 눈에 안 보이는 글로 무엇을 바꾸는지 덧붙인다(\"배송지 변경\"). 화면 낭독기는 링크만 따로 읽는다."
    source: "GOV.UK Design System · Check answers pattern"
  - text: "고친 뒤에는 확인 화면으로 돌아온다. 처음부터 다시 하게 하지 않고, 돌아가 보면 이전에 쓴 값이 채워져 있어야 한다."
    source: "GOV.UK Design System · Check answers pattern"
  - text: "결제 버튼은 하는 일을 말한다(\"12,900원 결제하기\"). \"확인\" \"다음\" 같은 막연한 말은 쓰지 않는다."
    source: "GOV.UK Design System · Check answers pattern (button wording)"
  - text: "버튼을 누르기 전에는 아직 주문이 끝나지 않았다는 걸 분명히 하고, 입력한 내용이 맞다는 확인 문장을 버튼 위에 둔다."
    source: "GOV.UK Design System · Check answers pattern"
  - text: "금전 거래는 되돌릴 수 있거나, 입력을 검사해 고치게 하거나, 확정 전에 확인·정정하게 하는 셋 중 하나는 지킨다."
    source: "WCAG 2.2 · 3.3.4 Error Prevention (Legal, Financial, Data) (AA)"
  - text: "같은 과정에서 이미 입력한 정보는 다시 묻지 않고 채워 두거나 고르게 한다(받는 사람 = 주문자). 비밀번호 확인처럼 보안상 필요한 재입력은 예외다."
    source: "WCAG 2.2 · 3.3.7 Redundant Entry (A)"
  - text: "이름 · 주소 · 카드 번호 같은 칸에는 입력 목적을 표시(autocomplete)해 브라우저가 채울 수 있게 한다."
    source: "WCAG 2.2 · 1.3.5 Identify Input Purpose (AA)"
  - text: "배송비 · 수수료 같은 추가 비용을 마지막 단계에서야 처음 보여 주지 않는다. 총액을 이루는 항목은 처음 화면부터 같은 이름으로 보여 준다."
    source: "deceptive.design · Hidden costs"
  - text: "부가 상품이나 보험을 미리 담아 두지 않는다. 사용자가 직접 고르게 한다."
    source: "deceptive.design · Preselection · Sneaking"
  - text: "정기결제는 결제 전에 주기 · 금액 · 해지 방법을 눈에 띄게 적는다. 첫 결제 화면에 숨기지 않는다."
    source: "deceptive.design · Hidden subscription"
  - text: "결제 완료 화면에는 주문 번호(있으면), 다음에 일어날 일과 시점, 연락처, 다음에 필요한 링크, 거래 기록을 저장할 방법을 넣는다."
    source: "GOV.UK Design System · Confirmation pages"
  - text: "완료 패널 안에 링크나 버튼을 넣을 때는 패널 배경과의 명도 대비가 3:1 이상인지 확인한다."
    source: "GOV.UK Design System · Confirmation pages"
---

## 메모

- 출처 대부분이 GOV.UK Design System이라 서비스 신청 흐름을 기준으로 쓴 글이다. 쇼핑몰의 결제 화면에 맞게 옮긴 부분(총액 항목, 결제 버튼에 금액 쓰기)은 Regula의 적용이고 출처 문장이 아니다.
- 「Check answers」의 버튼 예시는 "Accept and send"다. 버튼에 금액을 함께 적는 건 같은 원리(하는 일을 적는다)를 결제에 옮긴 것이다.
- 「Hidden costs」 페이지에 인용된 연구(요금을 처음부터 보지 못한 사람이 약 21% 더 쓰고 14.1% 더 많이 구매를 마침)는 한 티켓 시장 실험의 수치라 규칙 문장에는 쓰지 않았다.
- 국내 전자상거래법의 청약 전 확인 · 총 비용 표시 조항은 원문을 읽어 확인하지 못해 규칙에 넣지 않았다.
- 결제 수단별 인증, 카드 번호 검증 규칙(Luhn 등), 결제 대행사 화면은 다루지 않았다. 미리보기의 상점 · 상품 · 금액 · 번호는 지어낸 예시다.
