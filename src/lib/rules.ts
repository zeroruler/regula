// 페이지마다 붙은 규칙 표(대상 · 규칙 · 출처). 각 페이지가 표를 그리고, 레퍼런스 페이지의 "Regula에서 쓴 곳"이
// 출처 칸을 읽어 원문(WCAG · GOV.UK · Carbon · Primer)의 그 기준 · 그 페이지 아래에 이 줄을 잇는다.
// 규칙은 출처가 있는 것만 적는다.
import type { SectionKey } from './site';

export type Rule = { s: string; rule: string; ex?: string; src: string };
export type RuleTable = { key: string; name: string; path: string; section: SectionKey; rules: Rule[] };

const H = 'Amershi 외, 「Guidelines for Human-AI Interaction」 (CHI, 2019)';

export const ruleTables: RuleTable[] = [
  // 상태별 규칙. 출처가 있는 것만 적는다.
  { key: 'buttons', name: '버튼', path: 'patterns/buttons/', section: 'patterns', rules: [
    { s: '포커스', rule: '키보드 포커스가 항상 눈에 보여야 한다', src: 'WCAG 2.2 2.4.7 Focus Visible (AA)' },
    { s: '포커스', rule: '포커스 링은 주변과 3:1 이상, 2px 두께 둘레 이상', src: 'WCAG 2.2 2.4.13 Focus Appearance (AAA)' },
    { s: '눌림', rule: '0.1초 안에 반응하면 직접 조작한다고 느낀다', src: 'Jakob Nielsen, 『Usability Engineering』 (1993) 응답 시간 한계' },
    { s: '비활성', rule: '대비가 낮고 이유를 알려 주지 않으니 되도록 쓰지 않는다', src: 'GOV.UK Design System Button' },
    { s: '로딩', rule: '처리 중 다시 눌러 두 번 제출되지 않게 막는다', src: 'GOV.UK Design System Button (이중 클릭 방지)' },
    { s: '전체', rule: '터치 영역은 최소 24×24 CSS px, 권장 44–48', src: 'WCAG 2.2 2.5.8 Target Size (Minimum) · Apple HIG · Material 3' },
  ] },
  // 폼 규칙. 출처가 있는 것만 적는다.
  { key: 'forms', name: '입력', path: 'patterns/forms/', section: 'patterns', rules: [
    { s: '라벨', rule: '라벨은 칸 위에 둔다. 시선 이동이 가장 적고 작성 시간이 가장 짧았다', src: 'Matteo Penzo, 「Label Placement in Forms」 (UXmatters, 2006)' },
    { s: '라벨', rule: '플레이스홀더를 라벨 대신 쓰지 않는다. 쓰는 순간 사라지고, 흐려서 읽기 어렵다', src: 'Katie Sherwin, 「Placeholders in Form Fields Are Harmful」 (NN/g, 2014) · WCAG 2.2 3.3.2' },
    { s: '라벨', rule: '필수에 별표를 다는 대신, 몇 안 되는 선택 항목에 "(선택)"을 붙인다', src: 'GOV.UK Design System Question pages' },
    { s: '칸', rule: '칸 너비는 답의 길이에 맞춘다. 칸이 곧 힌트다', src: 'GOV.UK Design System Text input (fixed width inputs)' },
    { s: '칸', rule: '입력 목적을 autocomplete로 알려 자동 채우기를 돕는다', src: 'WCAG 2.2 1.3.5 Identify Input Purpose' },
    { s: '검증', rule: '칸을 떠난 뒤 확인하는 인라인 검증이 오류와 작성 시간을 줄였다. 쓰는 도중의 확인은 오히려 방해', src: 'Luke Wroblewski, 「Inline Validation in Web Forms」 (A List Apart, 2009)' },
    { s: '검증', rule: '제출 시 오류가 있으면 맨 위에 요약을 두고 각 칸으로 이동하는 링크를 단다', src: 'GOV.UK Design System Error summary' },
    { s: '오류', rule: '오류를 색만으로 알리지 않는다. 문장으로, 무엇을 어떻게 고칠지', src: 'WCAG 2.2 1.4.1 Use of Color · 3.3.1 Error Identification · 3.3.3 Error Suggestion' },
  ] },
  // 문구 규칙. 출처가 있는 것만 적는다. 예시는 Regula가 지은 것.
  { key: 'writing', name: '문구', path: 'patterns/writing/', section: 'patterns', rules: [
    { s: '오류', rule: '무엇이 잘못됐는지와 어떻게 고칠지를 쉬운 말로. 코드와 판정어("올바르지 않음") 대신', ex: '이메일 주소에 @가 빠졌어요. name@example.com처럼 써 주세요.', src: 'Jakob Nielsen, 「Error-Message Guidelines」 (NN/g) · GOV.UK Design System Error message' },
    { s: '오류', rule: '사용자를 탓하지 않는다. 시스템의 일이면 시스템이 주어', ex: '지금 저장하지 못했어요.', src: 'Jakob Nielsen, 「Error-Message Guidelines」 (NN/g)' },
    { s: '오류', rule: '고칠 방법을 제안한다', ex: '두 글자 이상 더 써 주세요.', src: 'WCAG 2.2 3.3.3 Error Suggestion' },
    { s: '버튼', rule: '"확인" 대신 누르면 일어나는 일을 동사로', ex: '삭제 · 계속 쓰기 · 해지하기', src: 'Apple HIG Alerts' },
    { s: '링크', rule: '"여기"나 "더 보기"만 쓰지 않고 목적지를 말한다', ex: '환불 규정 보기', src: 'WCAG 2.2 2.4.4 Link Purpose (In Context)' },
    { s: '용어', rule: '같은 것은 끝까지 같은 말로. "저장"과 "보관"을 섞지 않는다', ex: '저장 → 저장한 글', src: 'Jakob Nielsen, 10 Usability Heuristics (1994) #4 Consistency and standards' },
    { s: '용어', rule: '시스템의 말이 아니라 사용자의 말로', ex: '세션 만료 → 오래 쉬어서 다시 로그인해야 해요', src: 'Jakob Nielsen, 10 Usability Heuristics (1994) #2 Match between system and the real world' },
    { s: '읽기', rule: '사람들은 읽지 않고 훑는다. 핵심을 문장 앞에', ex: '결제되지 않았어요. 카드 한도가…', src: 'Nielsen Norman Group 「How Users Read on the Web」 (1997)' },
  ] },
  // 화면 구성 규칙. 원문을 읽고 확인한 것만 적는다(docs/source-check.md 5차).
  { key: 'layout', name: '화면 구성', path: 'patterns/layout/', section: 'patterns', rules: [
    { s: '카드', rule: '카드는 둘러볼 때 맞고, 하나를 찾거나 여럿을 견줄 때는 목록보다 못하다 — 요소 자리가 카드마다 달라 훑기 어렵다', src: 'Page Laubheimer, 「Cards: UI-Component Definition」 (NN/g, 2016)' },
    { s: '표', rule: '표는 네 가지 일을 돕는다 — 조건에 맞는 항목 찾기, 견주기, 한 줄 보기 · 고치기, 여러 줄에 한꺼번에 행동하기. 열 순서는 중요한 것부터, 관련 열은 붙여서', src: 'Page Laubheimer, 「Data Tables: Four Major User Tasks」 (NN/g, 2022)' },
    { s: '좁은 표', rule: '모바일의 큰 표는 머리글을 고정하고, 볼 열 · 행을 고르게 한다', src: 'Amy Schade, 「Mobile Tables」 (NN/g, 2017)' },
    { s: '캐러셀', rule: '5장 이하로, 지금 몇 번째인지 보이게. 사람들은 첫 장만 보고 지나치기 쉽다', src: 'Kara Pernice, 「Designing Effective Carousels」 (NN/g, 2013)' },
    { s: '자동 넘김', rule: '자동으로 넘기지 않는다. 넘긴다면 멈춤 버튼을 두고, 키보드 포커스가 들어오거나 마우스를 올리면 멈춘다. 5초 넘게 움직이면 멈출 수단이 필수', src: 'Jakob Nielsen, 「Auto-Forwarding Carousels…」 (NN/g, 2013) · W3C WAI-ARIA APG Carousel · WCAG 2.2 2.2.2 (A)' },
    { s: '아코디언', rule: '사용자가 몇 칸만 열어 볼 긴 내용에 쓴다. 대부분 다 열어야 하면 펼쳐 둔다. "모두 펼치기"와 인쇄를 챙긴다', src: 'Huei-Hsin Wang, 「Accordions on Desktop」 (NN/g, 2023)' },
    { s: '접근성', rule: '아코디언 머리는 버튼이고 aria-expanded로 열림을 알린다. 팝오버(popover="auto")는 바깥을 누르거나 Esc로 닫힌다', src: 'W3C WAI-ARIA APG Accordion · MDN popover 전역 속성' },
  ] },
  // 내비게이션 규칙. 출처가 있는 것만 적는다.
  { key: 'navigation', name: '내비게이션', path: 'patterns/navigation/', section: 'patterns', rules: [
    { s: '숨김', rule: '숨은 내비게이션(햄버거 메뉴)은 드러난 내비게이션보다 덜 쓰이고, 찾는 데 더 오래 걸렸다', src: 'Kara Pernice · Raluca Budiu, 「Hamburger Menus and Hidden Navigation Hurt UX Metrics」 (NN/g, 2016)' },
    { s: '탭 바', rule: '탭은 적을수록 찾기 쉽다 — 다섯 개 안쪽으로, 아이콘에는 한 단어 라벨을 함께', src: 'Apple HIG Tab bars ("five or fewer", "Include tab labels") · Material Design 3 Navigation bar' },
    { s: '너비', rule: '좁은 화면은 하단 바, 중간은 레일, 넓은 화면은 레일이나 펼친 드로어', src: 'Material Design 3 Navigation (window size classes)' },
    { s: '브레드크럼', rule: '지나온 기록이 아니라 구조상 위치를 보여 주고, 현재 페이지는 링크로 만들지 않는다', src: 'NN/g 「Breadcrumbs: 11 Design Guidelines for Desktop and Mobile」 · WAI-ARIA APG Breadcrumb (aria-current="page")' },
    { s: '탭', rule: '탭 목록 안은 화살표 키로 움직이고, Tab 키는 탭 패널로 넘어간다', src: 'W3C WAI-ARIA Authoring Practices Tabs Pattern' },
    { s: '현재 위치', rule: '지금 있는 곳을 내비게이션에 표시한다 — 색만이 아니라 굵기나 표시선으로도', src: 'WCAG 2.2 1.4.1 Use of Color · 2.4.8 Location (AAA)' },
  ] },
  // 찾기와 거르기 규칙. 원문을 읽고 확인한 것만 적는다(docs/source-check.md 10차).
  { key: 'search', name: '찾기와 거르기', path: 'patterns/search/', section: 'patterns', rules: [
    { s: '검색창', rule: '링크가 아니라 바로 칠 수 있는 입력칸으로, 흔한 검색어가 다 보일 만큼 넓게 둔다', src: 'Jakob Nielsen, 「Search: Visible and Simple」 (NN/g, 2001)' },
    { s: '돋보기', rule: '돋보기는 검색으로 알아보지만, 입력칸 없이 아이콘만 두면 검색을 찾기 어렵다', src: 'Katie Sherwin, 「The Magnifying-Glass Icon in Search Design」 (NN/g, 2014)' },
    { s: '검색 범위', rule: 'placeholder로 무엇을 찾을 수 있는지 알리고, 범위는 넓게 시작해 사용자가 좁히게 한다', src: 'Apple HIG Search fields' },
    { s: '검색 제안', rule: '끝 글자를 채워 주는 제안이면 덧붙인 글자를, 검색어가 가운데 들어가는 제안이면 사용자가 친 글자를 강조한다', src: 'Kate Moran, 「Site Search Suggestions」 (NN/g, 2018)' },
    { s: '적용 시점', rule: '둘러보는 사용자에겐 바로 적용, 조건이 분명하거나 사이트가 느리면 모아서 적용. 고르는 도중 화면을 위로 튕기지 않는다', src: 'Katie Sherwin, 「User Intent Affects Filter Design」 (NN/g, 2016)' },
    { s: '좁은 화면', rule: '패싯은 결과 위에 뜨는 판(tray)에 두어 결과가 뒤에서 바뀌는 게 보이게 하고, 전체 결과 수를 늘 보여 준다', src: 'Kathryn Whitenton, 「Mobile Faceted Search with a Tray」 (NN/g, 2015)' },
    { s: '필터 이름', rule: '카테고리와 값은 알맞고, 예측할 수 있고, 내부 용어 없이, 중요한 것부터', src: 'Kate Moran, 「Helpful Filter Categories and Values for Better UX」 (NN/g, 2018)' },
    { s: '결과 없음', rule: '결과가 없다고 분명히 말하고, 다음에 할 일을 주고, 사용자를 탓하지 않는다', src: 'Kathryn Whitenton, 「3 Guidelines for Search Engine "No Results" Pages」 (NN/g, 2014)' },
    { s: '접근성', rule: '결과 수 변화는 포커스를 옮기지 않고 화면 낭독기에 알린다(role="status"). 정렬된 열 머리에는 aria-sort', src: 'WCAG 2.2 4.1.3 Status Messages (AA) · W3C WAI-ARIA APG Sortable Table' },
  ] },
  // 로딩·빈 상태 규칙. 출처가 있는 것만 적는다.
  { key: 'states', name: '로딩과 빈 상태', path: 'patterns/states/', section: 'patterns', rules: [
    { s: '시간', rule: '0.1초 안이면 즉각, 1초 안이면 흐름이 끊기지 않음, 10초를 넘으면 주의가 떠난다', src: 'Jakob Nielsen, 『Usability Engineering』 (1993) 응답 시간 한계' },
    { s: '긴 작업', rule: '10초 넘게 걸리면 진행률이나 남은 시간을 보여 준다', src: 'Nielsen Norman Group 「Progress Indicators Make a Slow System Less Insufferable」' },
    { s: '스켈레톤', rule: '실제 레이아웃과 같은 모양으로. 다 불러온 뒤 화면이 튀지 않게', src: 'Nielsen Norman Group 「Skeleton Screens 101」' },
    { s: '접근성', rule: '불러오는 중 · 다 불러옴 · 오류를 화면 낭독기에도 알린다 (aria-busy, role="status")', src: 'WCAG 2.2 4.1.3 Status Messages' },
    { s: '움직임', rule: '반짝이는 스켈레톤과 회전 애니메이션은 움직임 줄이기 설정을 따른다', src: 'WCAG 2.2 2.3.3 Animation from Interactions (AAA)' },
    { s: '빈 상태', rule: '왜 비었는지와 다음 행동을 함께. "결과 없음"과 "오류"를 다른 말로', src: 'Nielsen Norman Group 「Designing Empty States in Complex Applications: 3 Guidelines」 (Kate Kaplan, 2021)' },
  ] },
  // 제스처 규칙. 출처가 있는 것만 적는다.
  { key: 'gestures', name: '제스처', path: 'patterns/gestures/', section: 'patterns', rules: [
    { s: '대체 수단', rule: '여러 손가락이나 경로를 그리는 제스처(핀치, 밀기)로 하는 일은 한 손가락으로 한 번 눌러서도 할 수 있어야 한다', src: 'WCAG 2.2 2.5.1 Pointer Gestures (A)' },
    { s: '끌기', rule: '끌어서 하는 일은 끌지 않고도(누르기만으로) 할 수 있어야 한다', src: 'WCAG 2.2 2.5.7 Dragging Movements (AA)' },
    { s: '취소', rule: '누를 때가 아니라 뗄 때 실행하고, 손가락을 밖으로 빼면 취소된다', src: 'WCAG 2.2 2.5.2 Pointer Cancellation (A)' },
    { s: '크기', rule: '누르는 목표는 최소 24px(AA), 권장은 44pt · 48dp', src: 'WCAG 2.2 2.5.8 Target Size (Minimum) · Apple HIG · Material Design 3' },
    { s: '숨김', rule: '보이지 않는 제스처는 지름길로만. 같은 일을 하는 보이는 컨트롤을 둔다', src: 'Apple HIG Gestures' },
    { s: '시스템', rule: '운영체제가 쓰는 제스처(가장자리 뒤로 가기, 홈 표시줄)와 겹치는 동작을 만들지 않는다', src: 'Apple HIG Gestures · Material Design 3 Gestures' },
  ] },
  // AI 화면 규칙. 출처가 있는 것만 적는다.
  { key: 'ai', name: 'AI 화면', path: 'patterns/ai/', section: 'patterns', rules: [
    { s: '처음', rule: '무엇을 할 수 있는지, 그리고 얼마나 잘 하는지(틀릴 수 있음)를 먼저 알린다', src: `${H} G1 · G2` },
    { s: '기다림', rule: '1초가 넘으면 무언가 하고 있음을, 10초가 넘으면 무엇을 하는지와 멈출 길을 보인다', src: 'Jakob Nielsen (1993) 응답 시간 한계 · ' + H + ' G8' },
    { s: '근거', rule: '왜 그런 답을 했는지, 무엇을 근거로 했는지 확인할 수 있게 한다', src: `${H} G11` },
    { s: '고치기', rule: '틀린 답을 쉽게 고치게 — 다시 생성, 질문 고치기, 이전 답 남기기', src: `${H} G9` },
    { s: '피드백', rule: '좋다 · 싫다를 답마다 조용히, 싫다면 이유를 잘게 고르게', src: `${H} G15` },
    { s: '행동', rule: '바깥에 흔적을 남기는 일(보내기, 결제, 삭제)은 하기 전에 결과를 알리고 묻는다', src: `${H} G16` },
    { s: '접근성', rule: '답을 쓰는 중 · 다 썼음을 화면 낭독기에 한 번씩 알린다 — 글자마다 읽히지 않게', src: 'WCAG 2.2 4.1.3 Status Messages' },
  ] },
  // 다크 패턴 규칙과 규제. 출처가 있는 것만 적는다.
  { key: 'dark', name: '다크 패턴', path: 'patterns/dark/', section: 'patterns', rules: [
    { s: '정의', rule: '사용자가 원하지 않았을 결정을 하게 만드는 인터페이스. 설득은 정보를 주고, 속임은 정보를 숨기거나 비튼다', src: 'Harry Brignull, deceptive.design · Gray 외, 「The Dark (Patterns) Side of UX Design」 (CHI, 2018)' },
    { s: '실태', rule: '쇼핑몰 약 1만 1천 곳을 훑어 1,800여 건의 다크 패턴을 찾았다 — 가짜 마감, 가짜 희소성, 끼워 팔기가 흔했다', src: 'Mathur 외, 「Dark Patterns at Scale」 (CSCW, 2019)' },
    { s: '동의', rule: '침묵, 미리 체크된 상자, 아무것도 안 함은 동의가 아니다', src: 'GDPR 전문 32항 · 유럽사법재판소 Planet49 판결 (C-673/17, 2019)' },
    { s: '규제', rule: '온라인 플랫폼은 사용자가 자유롭게 정보를 갖고 결정하는 것을 해치도록 인터페이스를 설계해서는 안 된다', src: 'EU 디지털서비스법(DSA) 제25조' },
    { s: '규제', rule: '여섯 유형을 규제한다 — 숨은 갱신, 순차 공개 가격(처음엔 일부만 보여 주기), 특정 옵션 사전 선택, 잘못된 계층 구조(거절을 눈에 덜 띄게), 취소·탈퇴 방해, 반복 간섭(거절했는데 팝업으로 다시 묻기)', src: '전자상거래법 제13조 제6항 · 제21조의2 (2025년 2월 14일 시행) · 공정거래위원회 다크패턴 문답서' },
    { s: '규제', rule: '숨은 자동 결제, 해지 방해, 숨은 비용을 미국 연방거래위원회가 단속 대상으로 정리했다', src: 'FTC 「Bringing Dark Patterns to Light」 (2022)' },
  ] },
  { key: 'typography', name: '타이포그래피', path: 'principles/typography/', section: 'principles', rules: [
    { s: '간격 조절', rule: '사용자가 행간 1.5배, 문단 간격 2배, 자간 0.12em, 단어 간격 0.16em으로 바꿔도 글이 잘리거나 겹치지 않게', src: 'WCAG 2.2 1.4.12 Text Spacing (AA)' },
    { s: '줄 길이', rule: '본문 한 줄은 라틴 80자, 한중일 글자 40자 이하. 양쪽 정렬은 하지 않는다', src: 'WCAG 2.2 1.4.8 Visual Presentation (AAA)' },
    { s: '줄 길이 (한글)', rule: '한글 웹 본문 한 줄 10자는 30 · 50자보다 확실히 느렸다. 30자와 50자는 차이가 작았고, 선호는 30자', src: '신종현 · 박민용, 대한산업공학회지 29(3), 2003 — 18명 · 굴림 12pt' },
    { s: '확대', rule: '글자를 200%까지 키워도 내용과 기능을 잃지 않게 — 크기는 px로 못 박지 않는다', src: 'WCAG 2.2 1.4.4 Resize Text (AA)' },
    { s: '대비', rule: '본문 4.5:1, 큰 글자 3:1 이상', src: 'WCAG 2.2 1.4.3 Contrast (Minimum) (AA)' },
    { s: '숫자', rule: '표 · 금액 · 시계처럼 세로로 줄 서는 숫자는 고정폭 숫자로', src: 'W3C CSS Fonts Module Level 4 (font-variant-numeric: tabular-nums)' },
    { s: '서체 수', rule: '역할(본문 · 제목 · 숫자/코드)마다 하나씩, 양식 하나에 2–3개', src: 'Regula 양식 4개의 공통점 (DESIGN.md)' },
    { s: '라이선스', rule: '여기 서체는 모두 SIL OFL — 상업적 사용 · 수정 · 재배포는 되고, 서체만 따로 파는 것은 안 된다', src: 'SIL Open Font License 1.1' },
  ] },
  // 움직임 규칙. 출처가 있는 것만 적는다.
  { key: 'motion', name: '움직임', path: 'principles/motion/', section: 'principles', rules: [
    { s: '시간', rule: 'UI 움직임은 대개 0.1–0.5초. 작은 것(토글, 아이콘)은 짧게, 화면 전체가 바뀌는 것은 길게', src: 'Nielsen Norman Group 「Executing UX Animations: Duration and Motion Characteristics」 · Material Design 3 Motion (duration 토큰)' },
    { s: '곡선', rule: '들어오는 것은 감속(ease-out), 나가는 것은 가속(ease-in), 화면 안에서 옮기는 것은 둘 다(ease-in-out)', src: 'Material Design 3 Motion (easing 토큰)' },
    { s: 'M3 토큰', rule: '시간: short 50–200ms · medium 250–400ms · long 450–600ms · extra-long 700–1000ms (각 50ms 또는 100ms 간격 4단계). 곡선: standard cubic-bezier(0.2, 0, 0, 1), standard-decelerate (0, 0, 0, 1), standard-accelerate (0.3, 0, 1, 1)', src: 'Material 3 토큰 md.sys.motion (material-web 저장소 tokens/versions/v0_192)' },
    { s: '줄이기', rule: '움직임 줄이기 설정(prefers-reduced-motion)을 따른다 — 큰 이동 · 확대 · 출렁임은 끄거나 페이드로 바꾼다', src: 'WCAG 2.2 2.3.3 Animation from Interactions (AAA) · W3C Media Queries Level 5' },
    { s: '멈춤', rule: '저절로 5초 넘게 움직이는 것은 멈추거나 숨길 수 있게 한다', src: 'WCAG 2.2 2.2.2 Pause, Stop, Hide (A)' },
    { s: '번쩍임', rule: '1초에 세 번 넘게 번쩍이지 않는다', src: 'WCAG 2.2 2.3.1 Three Flashes or Below Threshold (A)' },
    { s: '뜻', rule: '움직임은 관계를 말할 때 쓴다 — 어디서 왔는지, 무엇이 바뀌었는지. 꾸밈만을 위한 움직임은 덜어낸다', src: 'Material Design 3 Motion · Apple HIG Motion' },
  ] },
  { key: 'styles', name: '비주얼 스타일', path: 'principles/styles/', section: 'principles', rules: [
    { s: '단서', rule: '스타일이 무엇이든 누를 수 있는 것은 누를 수 있어 보여야 한다 — 평면이면 그림자 · 밑줄 같은 단서를 조금 되살린다', src: 'Kate Moran, 「Flat Design…」 (NN/g, 2015)' },
    { s: '경계 대비', rule: '버튼 · 입력칸의 경계와 상태는 주변과 3:1 이상 — 그림자만으로 경계를 만드는 스타일은 여기서 걸린다', src: 'WCAG 2.2 1.4.11 Non-text Contrast (AA)' },
    { s: '글자 대비', rule: '반투명 면 위 글자는 가장 나쁜 배경에서도 4.5:1 — 흐림을 더 주거나 면을 덜 투명하게', src: 'WCAG 2.2 1.4.3 · Megan Brown, 「Glassmorphism…」 (NN/g, 2024)' },
    { s: '설정', rule: '투명도 줄이기 · 대비 높이기 설정을 켠 사람에게는 불투명한 면으로', src: 'Megan Brown, 「Glassmorphism…」 (NN/g, 2024) · W3C Media Queries Level 5 (prefers-reduced-transparency · prefers-contrast)' },
    { s: '절제', rule: '강한 스타일일수록 색은 2–3개, 본문 서체는 평범하게', src: 'Hayat Sheikh, 「Neobrutalism…」 (NN/g, 2025)' },
  ] },
  // 도구가 쓰는 기준 중 출처가 있는 것만. 원문 확인 기록은 docs/source-check.md (15차).
  { key: 'builder', name: '디자인 파일 만들기', path: 'builder/', section: 'builder', rules: [
    { s: '글자 대비', rule: '본문 글자는 배경과 4.5:1 이상. 도구는 글자 · 보조 글자 · 강조색 · 알림 · 위험 버튼의 조합을 계산해 미달을 표시한다', src: 'WCAG 2.2 1.4.3 Contrast (Minimum) (AA)' },
    { s: '경계 · 포커스', rule: '입력칸 경계와 포커스 링은 주변과 3:1 이상. 그래서 입력칸 테두리는 두께 0이어도 1px를 남긴다', src: 'WCAG 2.2 1.4.11 Non-text Contrast (AA)' },
    { s: '색에만 기대지 않기', rule: '파일의 알림 견본은 색과 함께 "안내 · 완료 · 오류" 글자를 쓴다', src: 'WCAG 2.2 1.4.1 Use of Color (A)' },
    { s: '반투명 면', rule: '반투명 면 위 글자는 가장 나쁜 배경에서도 4.5:1. 투명도 줄이기 · 대비 높이기 설정에는 불투명한 면으로 — DESIGN.md와 preview.html에 미디어 쿼리가 들어간다', src: 'Megan Brown, 「Glassmorphism: Definition and Best Practices」 (NN/g, 2024) · W3C Media Queries Level 5 (prefers-reduced-transparency · prefers-contrast, 2026-02-19 Working Draft 원문에서 이름 확인)' },
    { s: '움직임 줄이기', rule: 'prefers-reduced-motion이면 전환을 끈다. 5초 넘게 저절로 움직이는 것은 멈출 수단을 둔다', src: 'WCAG 2.2 2.3.3 Animation from Interactions (AAA) · 2.2.2 Pause, Stop, Hide (A)' },
    { s: '곡선', rule: '표준 cubic-bezier(0.2, 0, 0, 1) · 감속 (0, 0, 0, 1) · 가속 (0.3, 0, 1, 1)', src: 'Material 3 토큰 md.sys.motion (material-web 저장소 tokens/versions/v0_192)' },
    { s: '컨트롤 크기', rule: '최소 24×24px(AA), 44×44px이면 향상 기준(AAA)까지', src: 'WCAG 2.2 2.5.8 Target Size (Minimum) · 2.5.5 Target Size (Enhanced)' },
  ] },
];

export const rulesOf = (key: string) => {
  const t = ruleTables.find((x) => x.key === key);
  if (!t) throw new Error(`규칙 표 없음: ${key}`);
  return t;
};
// 표의 줄 id(1부터). 레퍼런스 페이지에서 그 줄로 바로 간다.
export const ruleId = (key: string, i: number) => `rule-${key}-${i + 1}`;
