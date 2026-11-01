---
name: "회원가입"
order: 11
kind: "페이지 양식"
concept: "처음 온 사람이 꼭 필요한 것만 한 번씩 적고 계정을 만드는 화면. 비밀번호 조건은 미리 알려 주고, 약관은 필수와 선택을 나눠 선택은 비워 둔다."
preview: "/previews/signup/"
parts:
  - name: "제목"
    note: "\"계정 만들기\". 로그인 화면과 헷갈리지 않게 지금 하는 일을 그대로"
  - name: "이름"
    note: "서비스에 꼭 필요할 때만. autocomplete=\"name\""
    optional: true
  - name: "이메일"
    note: "라벨은 칸 위에. type=\"email\", autocomplete=\"email\""
  - name: "비밀번호 만들기"
    note: "조건을 라벨 아래 힌트로 먼저. 보기 토글, 확인 칸 없음. autocomplete=\"new-password\""
  - name: "약관 동의"
    note: "전체 동의 + 필수 항목 + 선택 항목. 선택은 비워 둔 채로"
  - name: "계정 만들기 버튼"
    note: "이 화면의 유일한 Primary"
  - name: "로그인 안내"
    note: "맨 아래 한 줄 + 링크"
states:
  - { key: "default", label: "기본" }
  - { key: "error", label: "입력 오류" }
  - { key: "terms", label: "약관 동의" }
preview_note: "미리보기 안에서 직접 입력해 볼 수 있어요. 빈 칸으로 계정 만들기를 누르면 위에 오류 요약, 칸 아래에 고칠 방법이 나옵니다. 비밀번호에 12345678이나 password를 넣어 보세요."
see:
  - { label: "입력과 폼 (라벨 위치 · 검증 시점)", path: "patterns/forms/" }
  - { label: "문구 (오류 문구)", path: "patterns/writing/" }
  - { label: "다크 패턴 (미리 체크된 동의 · 죄책감 버튼)", path: "patterns/dark/" }
  - { label: "로그인 양식", path: "templates/login/" }
rules:
  - text: "제목과 라벨은 \"계정 만들기\", \"비밀번호 만들기\"처럼 새로 만든다는 걸 드러낸다. 이미 있는 계정을 넣는 칸으로 착각하지 않게."
    source: "GOV.UK Design System · Create accounts"
  - text: "가입 화면에는 가입에 필요한 것만 둔다. 다른 링크나 홍보를 붙이지 않고, 같은 정보를 두 번 묻지 않는다."
    source: "GOV.UK Design System · Create accounts"
  - text: "비밀번호 확인 칸을 따로 두지 않는다. 보기 토글로 입력한 값을 확인하면 된다."
    source: "GOV.UK Design System · Password input"
  - text: "비밀번호 조건은 입력하기 전에 힌트로 알려 주고, 가입 · 로그인 · 변경 화면에서 같게 유지한다."
    source: "GOV.UK Design System · Ask users for passwords · Password input"
  - text: "길이만 요구하고 \"대문자 · 숫자 · 특수문자 섞기\" 같은 조합 규칙은 걸지 않는다. 대신 흔한 비밀번호와 유출된 비밀번호를 막고, 막을 때는 이유를 말한다."
    source: "NIST SP 800-63B-4 §3.1.1 · GOV.UK Design System · Ask users for passwords"
  - text: "최소 길이는 8자 이상. 비밀번호 하나만으로 로그인하는 서비스라면 15자 이상이 기준이다. 최대 길이는 두지 않거나 넉넉히(64자 이상)."
    source: "GOV.UK Design System · Ask users for passwords (8자) · NIST SP 800-63B-4 §3.1.1.2 (단일 요소 15자, 다중 요소 8자, 최대 64자 이상 허용)"
  - text: "붙여넣기와 비밀번호 관리자를 막지 않는다. 관리자가 강한 비밀번호를 제안하도록 autocomplete=\"new-password\"를 단다."
    source: "WCAG 2.2 · 3.3.8 Accessible Authentication (Minimum) · NIST SP 800-63B-4 §3.1.1.2 · GOV.UK Design System · Password input"
  - text: "이름 · 이메일 칸에 autocomplete(name, email)를 달아 브라우저가 채워 주게 한다."
    source: "WCAG 2.1 · 1.3.5 Identify Input Purpose"
  - text: "CAPTCHA로 사람인지 확인하지 않는다. 글자 옮겨 적기는 인지 기능 시험이고, 그림 알아보기도 사람과 문화에 따라 어렵다."
    source: "GOV.UK Design System · Create accounts"
  - text: "검사는 버튼을 눌렀을 때. 오류가 여럿이면 위에 오류 요약(각 칸으로 가는 링크)을 두고, 칸 아래에도 무엇을 어떻게 고칠지 쓴다."
    source: "GOV.UK Design System · Recover from validation errors · Error summary"
  - text: "약관 동의는 항목마다 따로 받고, 필수와 선택을 이름에 밝힌다. 마케팅(홍보 · 판매 권유) 동의는 반드시 따로."
    source: "개인정보 보호법 제22조 제1항 (제7호: 홍보 · 판매 권유 동의는 구분해 받기)"
  - text: "선택 항목은 비워 둔다. 미리 체크된 상자는 동의가 아니다."
    source: "deceptive.design 「Preselection」 · 유럽사법재판소 Planet49 판결 (C-673/17, 2019)"
  - text: "선택 항목에 동의하지 않아도 가입이 된다. 계정 만들기 버튼은 필수 항목만 따진다."
    source: "개인정보 보호법 제22조 제5항"
  - text: "\"전체 동의\"를 둘 때도 아래에 항목을 펼쳐 두어 선택 항목이 무엇인지 보이게 한다. 거절 쪽 문구로 죄책감을 주지 않는다."
    source: "Regula 다크 패턴 · 미리 체크된 동의 · 죄책감 버튼 (deceptive.design 「Confirmshaming」)"
---

## 메모

- 로그인 양식과 같은 방식으로, 등록된 디자인 시스템 4개의 토큰을 바꿔 입혀 본다. 같은 구조가 시스템마다 어떻게 달라 보이는지 비교할 수 있다.
- "입력 오류" 상태는 이메일 형식 오류 · 짧은 비밀번호 · 필수 약관 빠짐을 한 번에 보여 준다. "약관 동의" 상태는 필수만 체크하고 선택은 비워 둔 채로 가입 버튼을 누를 수 있는 모습이다.
- 비밀번호 최소 길이는 두 출처가 다르다. GOV.UK는 "8자 이상", NIST SP 800-63B-4(2025)는 비밀번호만으로 로그인하면 15자, 다른 인증 수단과 함께 쓰면 8자. 미리보기는 8자로 두었다.
- 개인정보 보호법 조문은 IT위키에 옮겨 둔 조문으로 확인했다. 국가법령정보센터 원문과는 직접 대조하지 못했다(사이트가 스크립트로 그려짐).
