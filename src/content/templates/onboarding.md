---
name: "온보딩"
order: 19
kind: "페이지 양식"
concept: "처음 들어온 사람이 이 서비스가 뭔지, 어떻게 시작하는지 알게 하는 짧은 흐름. 대부분의 안내는 없어도 되는지 먼저 따져 보고, 남는 것만 짧게, 건너뛸 수 있게, 필요한 순간에 보여 준다."
preview: "/previews/onboarding/"
parts:
  - name: "소개 카드"
    note: "한 장에 개념 하나. 그림 + 짧은 글. 장수는 적게"
  - name: "건너뛰기"
    note: "모든 카드에서 눈에 띄게. 건너뛰어도 바로 쓸 수 있어야 한다"
  - name: "진행 표시"
    note: "\"2 / 3\"처럼 몇 장 남았는지. 자동으로 넘기지 않는다"
  - name: "시작 버튼"
    note: "마지막 카드에서 첫 행동으로 바로 이어지는 하나의 버튼"
  - name: "맞춤 질문"
    note: "꼭 필요한 것만, 왜 묻는지와 어디에 쓰는지를 같이"
    optional: true
  - name: "권한 요청"
    note: "그 기능을 누른 순간에, 이유를 먼저 말하고, 거절해도 길을 남긴다"
    optional: true
  - name: "맥락 힌트"
    note: "쓸 수 있게 된 자리에서 한 번에 하나, 닫으면 다시 안 나온다"
    optional: true
states:
  - { key: "default", label: "소개 카드" }
  - { key: "permission", label: "권한 요청" }
  - { key: "hint", label: "맥락 힌트" }
preview_note: "소개 카드는 건너뛰기 · 이전 · 다음으로 오가고 저절로 넘어가지 않아요. 권한 요청에서는 허용 / 나중에 / 거절 뒤의 안내를 모두 볼 수 있습니다. 서비스 이름과 기능은 모두 예시예요."
see:
  - { label: "빈 상태 (첫 사용)", path: "patterns/states/" }
  - { label: "알림 (코치 마크 · 툴팁)", path: "patterns/feedback/" }
  - { label: "다크 패턴 (권한 요청 위장 · 거절 어렵게 하기)", path: "patterns/dark/" }
  - { label: "회원가입 양식", path: "templates/signup/" }
  - { label: "설정 양식 (테마 같은 선택)", path: "templates/settings/" }
rules:
  - text: "온보딩을 만들기 전에, 없이도 쓸 수 있게 화면을 고칠 수 있는지 먼저 본다. 온보딩은 사용자에게 외울 것과 넘길 것을 더한다."
    source: "Alita Kendrick, 「Mobile-App Onboarding: An Analysis of Components and Techniques」 (NN/g, 2020)"
  - text: "안내 흐름이 정당한 경우는 셋이다: 시작하려면 사용자 정보가 필요할 때, 기능이 개인 상황에 달려 있을 때, 낯설고 새로운 기능일 때. 그 밖에는 쓰면서 배우게 둔다."
    source: "Alita Kendrick, 「Mobile-App Onboarding」 (NN/g, 2020)"
  - text: "처음에 몰아서 가르치지 말고, 기능이 실제로 쓸 수 있는 자리에서 맥락에 맞게 알려 준다."
    source: "Alita Kendrick, 「Mobile-App Onboarding」 (NN/g, 2020)"
  - text: "남는 안내는 짧고 건너뛸 수 있게 한다. 카드로 만들면 \"건너뛰기\"를 분명히 보이고, 장수를 적게, 한 장에 개념 하나, 진행 표시를 붙인다."
    source: "Alita Kendrick, 「Mobile-App Onboarding」 (NN/g, 2020)"
  - text: "계정 만들기는 그것 없이는 서비스가 쓸모 없을 때만 온보딩에 넣는다."
    source: "Alita Kendrick, 「Mobile-App Onboarding」 (NN/g, 2020)"
  - text: "맞춤 설정 질문은 짧게, 왜 묻는지와 어디에 쓰는지를 같이 적는다. 이유를 처음에 설명할 수 없는 정보는 나중에 묻는다."
    source: "Alita Kendrick, 「Mobile-App Onboarding」 (NN/g, 2020)"
  - text: "색 테마 같은 겉모습 선택은 설정으로 보낸다. 써 보기 전에는 고르기 어렵고, 대부분 기본값을 그대로 쓴다."
    source: "Alita Kendrick, 「Mobile-App Onboarding」 (NN/g, 2020)"
  - text: "권한은 설치나 첫 실행 때 한꺼번에 묻지 말고, 사용자가 그 권한이 필요한 기능을 누른 순간에 묻는다."
    source: "Maria Rosala, 「3 Design Considerations for Effective Mobile-App Permission Requests」 (NN/g, 2019)"
  - text: "권한 요청에는 무엇에 접근하는지와 그 대가로 무엇을 얻는지를 사용자의 말로 적는다. 시스템 창만으로는 이유가 전해지지 않는다."
    source: "Maria Rosala, 「3 Design Considerations for Effective Mobile-App Permission Requests」 (NN/g, 2019)"
  - text: "거절해도 막다른 길로 두지 않는다. 그 기능을 못 쓰는 이유를 말하고, 권한을 켤 수 있는 기기 설정으로 바로 가는 링크를 준다."
    source: "Maria Rosala, 「3 Design Considerations for Effective Mobile-App Permission Requests」 (NN/g, 2019)"
  - text: "권한 요청을 안내문처럼 위장하거나 거절을 어렵게 만들지 않는다. 신뢰가 깎인다."
    source: "Maria Rosala, 「3 Design Considerations for Effective Mobile-App Permission Requests」 (NN/g, 2019)"
  - text: "코치 마크는 숨은 기능을 찾게 돕는 데만 쓰고, 힌트 하나에 상호작용 하나, 그 자리에 닿았을 때 한 번에 하나씩. 팁을 연달아 보이면 사용자는 읽지 않고 닫고, 앱이 복잡해 보인다."
    source: "Aurora Harley, 「Instructional Overlays and Coach Marks for Mobile Apps」 (NN/g, 2014)"
  - text: "저절로 넘어가거나 움직이는 소개 내용이 5초를 넘고 다른 내용과 함께 보이면, 멈추거나 숨길 수 있어야 한다. 자동으로 넘기지 않으면 가장 안전하다."
    source: "WCAG 2.2 · 2.2.2 Pause, Stop, Hide (A)"
  - text: "도움말(연락처 · 자주 묻는 질문 등)이 여러 화면에 있으면 화면마다 같은 순서에 둔다. 온보딩 도중 막힌 사람이 같은 자리에서 찾는다."
    source: "WCAG 2.2 · 3.2.6 Consistent Help (A)"
---

## 메모

- 출처가 모바일 앱 글(NN/g 2014 · 2019 · 2020)이 중심이라 웹에는 바꿔 읽어야 하는 부분이 있다. 권한 요청은 브라우저의 위치 · 알림 · 카메라 요청에도 같은 원리가 적용된다.
- 「Mobile-App Onboarding」의 "온보딩은 가능하면 만들지 않는다"가 이 양식의 첫 줄이다. 이 양식은 그 판단을 끝낸 뒤에도 남는 것을 어떻게 만들지를 다룬다.
- 「Instructional Overlays and Coach Marks」(2014)는 건너뛰기나 닫는 시점을 다루지 않는다. 미리보기의 "닫으면 다시 안 나온다"는 Regula의 예시다.
- Apple HIG의 Onboarding 페이지는 본문을 받지 못해 규칙에 넣지 않았다.
- 소개 카드 장수(미리보기는 3장)는 NN/g가 "적게"라고만 해서 정한 예시다. 미리보기의 서비스 이름과 기능은 지어낸 것이다.
