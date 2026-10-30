---
name: "로그인"
order: 10
kind: "페이지 양식"
concept: "이미 계정이 있는 사람이 가장 적은 생각으로 들어오게 하는 화면. 외우게 하지 않고, 틀렸을 때 무엇을 고칠지 바로 알려 준다."
preview: "/previews/login/"
parts:
  - name: "제목"
    note: "한 줄. \"로그인\"처럼 지금 하는 일을 그대로"
  - name: "이메일"
    note: "라벨은 칸 위에. autocomplete=\"username\""
  - name: "비밀번호"
    note: "보기 토글 포함. autocomplete=\"current-password\""
  - name: "로그인 버튼"
    note: "이 화면의 유일한 Primary"
  - name: "비밀번호 찾기"
    note: "버튼이 아니라 링크"
  - name: "소셜 로그인"
    note: "구분선 아래 Secondary 버튼으로"
    optional: true
  - name: "회원가입 안내"
    note: "맨 아래 한 줄 + 링크"
rules:
  - text: "비밀번호 칸에서 붙여넣기와 비밀번호 관리자 자동 입력을 막지 않는다. 외우게 하는 로그인은 인지 기능 시험이 된다."
    source: "WCAG 2.2 · 3.3.8 Accessible Authentication (Minimum) · GOV.UK Design System Password input"
  - text: "비밀번호에 \"보기\" 토글을 둔다. 입력한 값을 눈으로 확인할 수 있으면 오타가 줄어든다."
    source: "GOV.UK Design System Password input"
  - text: "autocomplete를 정확히 단다: 이메일 칸은 username, 로그인 비밀번호는 current-password(가입 화면은 new-password)."
    source: "GOV.UK Design System Password input"
  - text: "비밀번호 칸의 맞춤법 검사와 자동 대문자를 끈다 (spellcheck=\"false\", autocapitalize=\"none\")."
    source: "GOV.UK Design System Password input"
  - text: "칸을 벗어날 때가 아니라 로그인 버튼을 눌렀을 때 검사한다. 입력 중에 오류를 띄우지 않는다."
    source: "GOV.UK Design System · Recover from validation errors"
  - text: "형식 오류(빈 칸, 이메일 형식)는 그 칸 바로 아래에 무엇이 틀렸고 어떻게 고칠지 쓴다."
    source: "GOV.UK Design System · Recover from validation errors · Cordovan DESIGN.md §5"
  - text: "계정 확인 실패는 어느 쪽이 틀렸는지 밝히지 않고 하나의 문구로 알린다 (\"이메일 또는 비밀번호가 맞지 않습니다\")."
    source: "OWASP Authentication Cheat Sheet · Authentication and Error Messages"
  - text: "라벨은 칸 위에 두고, 플레이스홀더로 라벨을 대신하지 않는다."
    source: "Cordovan DESIGN.md §4 Inputs"
  - text: "채운 버튼은 \"로그인\" 하나. 비밀번호 찾기와 회원가입은 링크로 내린다."
    source: "Cordovan DESIGN.md §2 한 화면 한 색"
---

## 메모

- 미리보기는 하나의 양식에 등록된 디자인 시스템의 토큰을 입혀 보는 방식이다. 같은 구조가 시스템마다 어떻게 달라 보이는지 비교할 수 있다.
- 미리보기에서 빈 칸으로 로그인을 누르면 제출 시점 검사가, "계정 오류" 상태에서는 하나로 묶은 실패 문구가 나온다.
