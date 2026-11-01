---
name: "설정"
order: 12
kind: "페이지 양식"
concept: "자주 바꾸지 않는 것만 모아 두는 화면. 스위치는 누르는 즉시 적용하고, 끄는 길을 막지 않으며, 되돌릴 수 없는 것(계정 삭제)만 맨 아래에서 한 번 더 묻는다."
preview: "/previews/settings/"
parts:
  - name: "제목"
    note: "\"설정\" 한 단어"
  - name: "계정"
    note: "이메일 · 비밀번호 · 언어. 현재 값을 오른쪽에 보이고, 누르면 그 항목을 바꾸는 화면으로"
  - name: "알림"
    note: "목록 행 안의 스위치. 누르는 즉시 적용, 저장 버튼 없음"
  - name: "광고성 정보 수신"
    note: "알림 묶음 안의 스위치 하나. 바꾸면 날짜와 처리 결과를 그 자리에 알린다"
  - name: "로그아웃"
    note: "평범한 버튼"
  - name: "계정 삭제"
    note: "맨 아래, 떨어뜨려서 위험 버튼으로. 누르면 확인 대화상자"
states:
  - { key: "default", label: "기본" }
  - { key: "saved", label: "바로 적용" }
  - { key: "delete", label: "계정 삭제 확인" }
preview_note: "미리보기 안에서 스위치를 직접 눌러 볼 수 있어요. 누르면 바로 적용되고, 광고성 정보 스위치는 처리 결과가 그 아래 나옵니다. 계정 삭제를 누르면 확인 대화상자가 열립니다."
see:
  - { label: "입력과 폼 (스위치 · 체크박스)", path: "patterns/forms/" }
  - { label: "버튼 (위험 버튼)", path: "patterns/buttons/" }
  - { label: "다크 패턴 (해지 방해 · 죄책감 버튼)", path: "patterns/dark/" }
  - { label: "게슈탈트 (공통 영역)", path: "principles/gestalt/" }
  - { label: "회원가입 양식", path: "templates/signup/" }
rules:
  - text: "설정은 적게 둔다. 대부분에게 가장 좋은 값을 기본으로 정해 두면 사람들이 설정 화면에 올 일이 줄어든다."
    source: "Apple HIG · Settings"
  - text: "설정 화면에는 자주 바꾸지 않는 것만. 정렬 · 필터 · 보기 방식처럼 작업 중에 바꾸는 옵션은 그 화면 안에 둔다."
    source: "Apple HIG · Settings"
  - text: "기기 전체 설정(접근성, 라이트 · 다크 모드)을 앱 안에서 따로 만들지 않고 그대로 따른다. 앱 전용 화면 모드 설정은 두 군데를 바꾸게 만든다."
    source: "Apple HIG · Settings · Dark Mode"
  - text: "비슷한 항목끼리 묶어 그룹 제목을 달고, 묶음마다 하나의 테두리(공통 영역) 안에 넣는다."
    source: "Palmer (1992) 공통 영역 · Regula 게슈탈트"
  - text: "스위치는 누르는 즉시 적용한다. 저장 버튼이 필요한 칸과 한 화면에 섞지 않고, 바로 적용이 어려우면 체크박스와 저장 버튼을 쓴다."
    source: "Nielsen Norman Group 「Toggle-Switch Guidelines」 (Alita Kendrick, 2018)"
  - text: "스위치 라벨은 켰을 때 일어나는 일을 짧게, 핵심어를 앞에. 질문형(\"알림을 받을까요?\")으로 쓰지 않는다."
    source: "Nielsen Norman Group 「Toggle-Switch Guidelines」"
  - text: "켜짐 · 꺼짐을 색만으로 구분하지 않는다. 손잡이 위치와 \"켬 · 끔\" 글자로도 보여 준다."
    source: "Apple HIG · Toggles · Nielsen Norman Group 「Toggle-Switch Guidelines」"
  - text: "스위치는 목록 행 안에 둔다. 행의 글이 곧 스위치의 라벨이다."
    source: "Apple HIG · Toggles (iOS, iPadOS)"
  - text: "광고성 정보 수신은 설정에서 언제든 끌 수 있게 하고, 켜거나 끄면 날짜와 처리 결과를 알린다."
    source: "정보통신망법 제50조 제2항 (철회하면 보내지 않기) · 제7항 (처리 결과 알리기)"
  - text: "끄는 길을 방해하지 않는다. 다시 로그인을 요구하거나, 끄는 쪽에 죄책감 주는 문구를 달지 않는다."
    source: "정보통신망법 제50조 제5항 (수신거부 · 철회 방해 금지) · deceptive.design 「Confirmshaming」"
  - text: "가입할 수 있는 서비스라면 계정 삭제도 서비스 안에서 할 수 있게 한다. 고객센터 전화나 메일로 돌리지 않는다."
    source: "Apple App Store Review Guidelines 5.1.1(v) · deceptive.design 「Hard to cancel」"
  - text: "계정 삭제는 맨 아래에 다른 항목과 떨어뜨려 두고, 위험 버튼으로 구분한다."
    source: "GOV.UK Design System · Button (warning) · Apple HIG · Buttons (destructive role)"
  - text: "확인 대화상자는 드물고 되돌릴 수 없는 일에만. 되돌릴 수 있는 일(스위치 끄기)에는 띄우지 않는다."
    source: "Apple HIG · Alerts"
  - text: "대화상자 제목은 상황을 구체적으로(\"계정을 삭제할까요?\"), 버튼은 결과를 말하는 동사(\"계정 삭제\")로, 취소는 \"취소\". \"확인\" 하나로 묻지 않는다."
    source: "Apple HIG · Alerts · Regula 문구"
---

## 메모

- 로그인 · 회원가입 양식과 같은 방식으로, 등록된 디자인 시스템 4개의 토큰을 바꿔 입혀 본다.
- 라이트 · 다크 모드 설정은 일부러 넣지 않았다. Apple HIG는 앱 전용 화면 모드 설정을 피하라고 한다. 웹에서는 `prefers-color-scheme`로 기기 설정을 따르면 된다. 다만 웹 서비스에서 이 설정을 두는 경우는 흔하다. 그래서 이 규칙은 Apple 플랫폼 기준이라는 점을 적어 둔다.
- 정보통신망법 조문은 IT위키에 옮겨 둔 조문으로 확인했다. 국가법령정보센터 원문과는 직접 대조하지 못했다. 시행령의 "14일 안에 처리 결과 알리기"와 "2년마다 수신동의 확인"은 해설 글에서만 봤다. 그래서 규칙에는 넣지 않았다.
- 계정 삭제 대화상자에서 처음 초점은 "취소"에 둔다. 출처가 있는 규칙은 아니고, 실수로 Enter를 눌러도 삭제되지 않게 하려는 구현 판단이다.
