// 사이트의 페이지 구성. 목적별로 페이지를 오간다 — 공부할 때는 "공부", 양식을 볼 때는 "만들기".
export const version = 'v0.4';

export type SectionKey = 'principles' | 'tools' | 'patterns' | 'references' | 'templates' | 'log';

export const nav: { group: string; items: { key: SectionKey; no: number; title: string; path: string; blurb: string }[] }[] = [
  {
    group: '공부',
    items: [
      { key: 'principles', no: 1, title: '원리와 공식', path: 'principles/', blurb: '비율, 간격, 글자 크기, 대비처럼 숫자로 남길 수 있는 규칙' },
      { key: 'tools', no: 2, title: '계산 도구', path: 'tools/', blurb: '타입 스케일, 명도 대비, 간격을 직접 넣어 보는 곳' },
      { key: 'patterns', no: 3, title: 'UI 패턴', path: 'patterns/', blurb: '알림, 버튼, 입력 — 컴포넌트를 언제 쓰고 언제 피하는지' },
      { key: 'references', no: 5, title: '레퍼런스', path: 'references/', blurb: '책, 디자인 시스템, 저장소, 커뮤니티 — 내 정리와 원문' },
    ],
  },
  {
    group: '만들기',
    items: [
      { key: 'templates', no: 4, title: '페이지 양식', path: 'templates/', blurb: '직접 만든 디자인 시스템과 페이지 양식' },
    ],
  },
  {
    group: '기록',
    items: [
      { key: 'log', no: 6, title: '작업 기록', path: 'log/', blurb: '버전별로 쌓아 온 것과 다음에 할 것' },
    ],
  },
];

export const sections = nav.flatMap((g) => g.items);

// 원리와 공식의 주제 순서. path가 있는 주제는 실습이 붙은 별도 페이지가 있다.
export const topics: { name: string; path?: string; blurb: string }[] = [
  { name: '비율과 간격', blurb: '황금비, 8pt 그리드' },
  { name: '타이포그래피', blurb: '타입 스케일, 줄 길이, 행간' },
  { name: '색', path: 'principles/color/', blurb: '색상환과 배색, 60-30-10, 동시 대비, 명도 대비' },
  { name: '게슈탈트', path: 'principles/gestalt/', blurb: '근접성, 유사성, 공통 영역, 연속성, 폐합' },
  { name: '그리드', path: 'principles/grid/', blurb: '12단 그리드, 열 너비, 거터, 브레이크포인트' },
  { name: '사용성', blurb: '피츠, 힉, 터치 영역' },
  { name: '좋은 디자인', path: 'principles/rams/', blurb: 'Dieter Rams 10원칙, 덜어내기, 점검표' },
];
// UI 패턴의 카테고리 순서. level은 카드와 눈금에 쓰는 1–9 값의 필드, path가 있으면 실습 페이지가 있다.
export const patternGroups: {
  id: string; name: string; path?: string; level: 'intrusiveness' | 'emphasis' | 'effort'; levelName: string;
  title: string; intro: string; ends: [string, string];
}[] = [
  {
    id: 'feedback', name: '알림', level: 'intrusiveness', levelName: '방해 정도',
    title: '사용자에게 알려주는 방법',
    intro: '릴스에서 본 9가지를 방해 정도 순으로 다시 놓았습니다. 왼쪽일수록 화면 구석에서 조용히 알리고, 오른쪽일수록 하던 일을 멈추게 합니다. 고를 때는 "이 메시지가 사용자의 흐름을 끊을 자격이 있나"부터 따져 보세요.',
    ends: ['조용함 · 지나쳐도 됨', '멈춤 · 응답해야 함'],
  },
  {
    id: 'buttons', name: '버튼', path: 'patterns/buttons/', level: 'emphasis', levelName: '시각적 무게',
    title: '버튼의 무게를 고르는 법',
    intro: '버튼은 생김새의 무게로 위계를 말합니다. 왼쪽일수록 가볍게 곁에 있고, 오른쪽일수록 화면에서 가장 먼저 눈에 띕니다. 무거운 버튼은 한 영역에 하나만 — 둘이면 서로 이기려고 다퉈요.',
    ends: ['가벼움 · 보조 행동', '무거움 · 화면의 주 행동'],
  },
  {
    id: 'forms', name: '입력', path: 'patterns/forms/', level: 'effort', levelName: '입력 수고',
    title: '답을 받는 방법',
    intro: '입력 컴포넌트를 사용자가 들이는 수고 순으로 놓았습니다. 왼쪽일수록 한 번 눌러 끝나고, 오른쪽일수록 직접 써야 합니다. 고를 수 있는 답이면 고르게 하고, 정말 자유로운 답만 쓰게 하세요.',
    ends: ['고르기만 · 한 번 누름', '직접 씀 · 오래 걸림'],
  },
];

export const section = (key: SectionKey) => sections.find((s) => s.key === key)!;

// 작업 기록 — 위가 최신
export const log: { date: string; text: string }[] = [
  { date: '2026-10-31', text: 'v0.5 UI 패턴에 "입력" 추가. 토글부터 여러 줄 입력까지 7가지를 입력 수고 순으로 놓고, 실습 페이지에서 라벨 위치(위·왼쪽·플레이스홀더·떠오르는 라벨)를 바꿔 직접 써 보는 실습과 검증 시점(입력마다·칸을 떠날 때·제출할 때) 실습을 붙임.' },
  { date: '2026-10-30', text: 'v0.5 UI 패턴에 "버튼" 추가. 텍스트·아이콘·아웃라인·채운·위험·플로팅 버튼 6가지를 시각적 무게 순으로 놓고, 실습 페이지에서 한 영역의 버튼 무게를 직접 정해 보는 위계 실습과 상태(호버·눌림·포커스·비활성·로딩) 실습을 붙임. 패턴 페이지를 카테고리별로 묶음.' },
  { date: '2026-10-30', text: 'v0.4 네 번째 실습 페이지 "좋은 디자인"을 추가하며 v0.4 원리 확장을 마침. Dieter Rams 10원칙을 원칙마다 UI 점검 질문으로 바꾸고, 카드 장식 여덟 가지를 켜고 끄는 덜어내기 실습과 브라우저에 남는 점검표를 붙임.' },
  { date: '2026-10-30', text: 'v0.4 세 번째 실습 페이지 "그리드"를 추가. 화면 너비를 바꾸면 구간별로 4 · 8 · 12열과 마진이 바뀌고 같은 블록이 다시 배치되는 실험, 10 · 12 · 16열을 2 · 3 · 4 · 6으로 나눠 보기, 거터와 행간 비교. 공식 4개(12단 그리드, 열 너비, 거터, 브레이크포인트) 추가.' },
  { date: '2026-10-30', text: 'v0.4 두 번째 실습 페이지 "게슈탈트"를 추가. 근접성(간격 슬라이더와 폼 목업), 유사성, 공통 영역(배경 상자 대 간격), 연속성, 폐합을 흑백 도해로 직접 조작해 봄. 근접성을 새 주제로 옮기고 공식 4개(유사성, 공통 영역, 연속성, 폐합) 추가.' },
  { date: '2026-10-30', text: 'v0.4 원리와 공식을 주제별로 묶고, 첫 실습 페이지 "색"을 추가. OKLCH 색상환으로 배색 고르기, 그 팔레트로 60-30-10 칠해 보기, Albers식 동시 대비 실습. 색 공식 6개(보색, 유사색, 삼각, 분할 보색, OKLCH, 동시 대비) 추가.' },
  { date: '2026-10-30', text: 'v0.4 첫 페이지 양식 "로그인" 추가. 구성과 규칙(출처: GOV.UK, WCAG 2.2, OWASP)을 정리하고, 등록된 디자인 시스템 4개의 토큰을 바꿔 입히며 기본·형식 오류·계정 오류 상태를 미리볼 수 있게 함.' },
  { date: '2026-10-30', text: 'v0.4 한 페이지에 쌓던 구조를 목적별 페이지로 나눔. 공부(원리·도구·패턴·레퍼런스)와 만들기(양식)를 오가며 볼 수 있게 공통 내비게이션을 붙임.' },
  { date: '2026-10-30', text: 'v0.3 페이지 양식에 Cordovan · Chamomile · Terrazzo · Regula 등록. 토큰은 각 DESIGN.md에서 빌드할 때 바로 읽어 오고, 미리보기 화면을 사이트 안에서 띄움.' },
  { date: '2026-10-30', text: 'v0.2 Astro로 옮김. 공식·패턴·레퍼런스를 파일 하나씩으로 나누고, 레퍼런스마다 상세 페이지(내 정리 · 원문 미리보기 · 쓰인 곳)를 붙임. 자유 라이선스 저장소 3곳은 README를 가져와 사이트 안에서 봄.' },
  { date: '2026-10-30', text: 'v0.1 시작. 황금비·타입 스케일·간격·대비 공식, 알림 패턴 9가지, Cordovan 양식, 레퍼런스 목록 정리.' },
];

export const next = [
  { when: '다음', text: '설정 화면·회원가입 양식 · v0.5 내비게이션 · 빈 상태와 로딩 패턴 추가' },
];
