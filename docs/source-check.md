# 출처 검증 기록

사이트의 출처를 원문(또는 원문을 옮긴 믿을 만한 기록)과 대조한 결과. 새로 확인할 때마다 위에 덧붙인다.

## 2026-11-03 — 33차: 결정 — NC-ND 원문은 싣지 않고, 약관이 엄격한 곳은 미리보기를 끔

- Laws of UX(25차) · Dieter Rams 10원칙(32차)은 CC BY-NC-ND 4.0이라 원문을 싣지 않기로 함. 지금처럼 Regula의 요약과 링크만 둔다
- Apple HIG(24차) · 디자인 나침반 · Wanted Montage(31차)는 약관이 콘텐츠의 복제 · 전시와 자동 접근을 막으므로 iframe 미리보기를 끔(`noembed: "terms"`). 페이지에는 미리보기 대신 약관 때문에 링크만 둔다고 적는다

## 2026-11-03 — 32차: 남은 레퍼런스 4곳 라이선스 확인

### Microsoft HAX Guidelines (공식 · 패턴 8개가 출처로 씀)

- 바닥글 "© Microsoft 2026" · Terms of use(microsoft.com/en-us/legal/terms-of-use). 약관: 따로 정하지 않으면 개인 · 비상업 용도이고, 서비스에서 얻은 정보를 수정 · 복제 · 배포 · 게시 · 2차 저작물로 만들 수 없다. 문서류도 고지문을 붙여 개인 · 비상업적으로만 쓰고 네트워크에 올리지 말 것
- 원문을 싣지 않고 지금처럼 요약과 링크만 둔다

### Dieter Rams 10원칙 · Vitsœ (공식 10개가 출처로 씀)

- 페이지 본문: "These principles can be shared accurately and fairly under the Creative Commons CC-BY-NC-ND 4.0 licence." 바닥글 "© 2026 Vitsœ". 25차 Laws of UX와 같은 라이선스(비영리 · 변경 금지)
- 영어 원문을 고치지 않고 출처를 밝혀 싣는 것은 비영리라면 가능하지만, CLAUDE.md의 자유 라이선스에는 들지 않는다 → Laws of UX와 함께 사용자 판단을 기다린다
- Regula의 `/principles/rams/`에서 원칙을 UI 점검 질문으로 바꾼 것은 원문의 번역 · 각색이 아니라 Regula의 해석이며, 원문 문장을 옮겨 싣지 않았다

### Learn UI Design (미리보기 켜짐, 높이 측정함)

- 바닥글 "©2026 Kennedy Design, Inc."뿐, 라이선스 · 이용약관 링크 없음. 자유 라이선스가 아니므로 원문을 싣지 않는다
- 자동 접근을 막는 약관을 찾지 못해(약관 페이지 자체가 없음) 미리보기 · 높이 측정은 그대로 둔다

### 오빠두 디자인 시스템 갤러리 (미리보기 켜짐, 높이 측정함)

- 바닥글 "Copyright 2026 오빠두엑셀 All rights reserved." · 이용약관(oppadu.com/terms/). 제23조: 회사가 만든 글 · 이미지 · 도구의 저작권은 회사에 있고, 허락 없이 복제 · 배포 등 영리 목적으로 쓸 수 없다. 금지 행위에 "자동화된 프로그램으로 서비스에 접속해 정보를 대량으로 모으거나 서버에 지나친 부담을 주는 행위"
- 원문을 싣지 않는다. 높이 측정은 페이지 하나를 한 번 불러 창 크기만 바꾸는 것이라 "대량 수집 · 과부하"에 해당하지 않는다고 보고 그대로 둔다(24 · 31차처럼 자동 접근 자체를 막는 조항은 아님)

### 확인하지 않은 것

- Steve Schoger(X 계정): Regula에서 출처로 쓰는 곳이 없어 이번에 보지 않음
- 책 9권: 판매 중인 책이라 원문을 싣지 않는 것이 분명해 따로 확인하지 않음. Pantone은 17차에서 색값 없이 두기로 함

## 2026-11-03 — 31차: 디자인 나침반 원문은 가져오지 않음

### 확인한 것

- designcompass.org 바닥글: "© 2026 Design Compass All rights reserved." · 이용약관 · 개인정보취급방침. 자유 라이선스 표시 없음. Wanted Montage 소개 글의 그림에는 "©Wanted"가 붙어 있어 원티드의 권리도 얽혀 있다
- 이용약관: 서비스와 관련된 이미지 · 디자인 · 정보 등의 지식재산권은 회사에 있고, 명시적 승인 없이 수정 · 배포 · 상업적 이용 등을 할 수 없다. 회원 금지 행위에 서비스의 콘텐츠를 아카이브 · 복제 · 공중송신 · 배포 · 전시하는 것과 "로봇, 스파이더, 스크레이퍼나 기타 자동화 수단"으로 서비스에 접근하는 것이 들어 있다
- 그래서 원문을 싣지 않고, 레퍼런스 2개(디자인 나침반 · Wanted Montage)는 지금처럼 요약과 링크만 둔다
- 금지 조항은 "회원"에게 적용되는 것이지만, 24차(Apple)와 같은 기준으로 `npm run measure-embeds`의 측정 대상에서 빼고(NO_ROBOTS) 잰 값도 지움 → 두 미리보기는 예전처럼 상자 안에서 스크롤
- iframe 미리보기 자체는 그대로 둠(방문자 브라우저가 원본을 불러옴, 사이트가 다른 페이지 안에 띄우는 것을 막지 않음). 다만 약관이 콘텐츠 "전시"도 금지 행위로 적고 있어, 더 조심하려면 embed를 끄는 것도 방법이다

## 2026-11-03 — 30차: 토스(TDS · 토스 기술 블로그) 원문은 가져오지 않음

### 확인한 것

- TDS 문서(tossmini-docs.toss.im/tds-mobile/): 페이지 안에 라이선스 · 저작권 표시가 없다. npm 패키지 @toss/tds-mobile(2.5.1)에도 license 필드가 없어, 코드조차 오픈소스 라이선스로 공개된 것이 아니다
- 토스 기술 블로그(toss.tech): 바닥글은 ㈜비바리퍼블리카 회사 정보와 토스 앱 서비스 약관 · 개인정보 처리방침 목록뿐이다. 글에 대한 라이선스 표시는 없다
- 라이선스를 밝히지 않은 글은 저작권법상 모든 권리가 저작자에게 있다. 그래서 원문을 싣지 않고, 지금처럼 Regula의 요약과 링크(정당한 범위의 인용)만 둔다
- 두 곳 모두 iframe 미리보기는 그대로 둔다(방문자 브라우저가 원본을 불러옴). 높이 측정(measure-embeds)을 막는 약관 조항은 이번에 찾지 못했다 — 토스 약관은 금융 서비스용이라 웹사이트 자동 접근을 따로 다루지 않는 것으로 보이나, 약관 전문을 다 읽지는 않았다

## 2026-11-03 — 29차: Mobbin 원문은 가져오지 않음

### 확인한 것

- mobbin.com 바닥글에 Terms · Copyright 링크. 자유 라이선스 표시 없음
- Terms "10. Intellectual Property Rights": 서비스 안의 자료는 Mobbin이나 Mobbin에 라이선스를 준 쪽의 소유이고 저작권 · 상표권으로 보호된다. 유료 플랜 고객에게도 개인 · 비상업 · 일시적 사용만 허락한다
- 같은 약관의 금지 사항: Mobbin에서 가져온 자료를 다른 웹사이트 · 서버에 모으거나 미러링 · 저장 · 재게시하는 것(서면 동의 없이), 상업적 이용, 허락되지 않은 scraper · robot 등으로 접근 · 복사하는 것. 검색 엔진 · 크롤러는 robots.txt를 따르는 조건으로 허용
- 화면 캡처 자체가 각 앱 회사의 화면이라 제3자 권리도 얽혀 있다. 그래서 화면이나 목록을 싣지 않고 지금처럼 요약과 링크만 둔다(CLAUDE.md: 미니 목업은 흑백 와이어프레임, 특정 브랜드 화면을 옮기지 않음)
- 응답 헤더 X-Frame-Options: SAMEORIGIN이라 iframe 미리보기도 열리지 않는다(embed 꺼진 그대로). Regula에서 mobbin을 출처로 쓴 공식 · 패턴은 없음

## 2026-11-03 — 28차: Refactoring UI 원문은 가져오지 않음

### 확인한 것

- refactoringui.com은 218쪽 PDF 책을 파는 판매 페이지다(책 $99, 묶음 $149, 팀 할인 따로). 바닥글 "Copyright © 2026 The UI Company Inc.", 자유 라이선스 표시 없음
- 사이트에 공개된 라이선스는 묶음 상품에 든 아이콘용("Refactoring UI Icon License", GitHub gist)뿐이다. 구매자가 자기 프로젝트에 쓰고 고칠 수는 있지만 재배포 · 재라이선스 · 재판매는 할 수 없다. 책 본문에 대한 라이선스가 아니며, Regula는 아이콘을 쓰지 않는다
- 그래서 책 내용을 싣지 않고, 지금처럼 Regula의 요약(항목 4개)과 링크만 둔다
- 응답 헤더 X-Frame-Options: deny라 iframe 미리보기도 열리지 않는다(embed 꺼진 그대로)

## 2026-11-03 — 27차: Deceptive Patterns 원문은 가져오지 않음

### 확인한 것

- deceptive.design(www.deceptive.design에서 옮겨 감) 바닥글: "©2026 Testimonium Ltd." · Terms and Conditions · Privacy Policy. 자유 라이선스 표시 없음
- Terms and Conditions "Intellectual Property": 서비스와 그 원래 콘텐츠는 회사와 라이선스 제공자의 독점 재산이며 저작권 · 상표법으로 보호된다. 복제나 재게시를 허락하는 조항은 없음
- robots.txt와 llms.txt는 인용과 색인을 환영한다고 적고, "How to cite this website" 페이지에서 인용 형식(APA · BibTeX 등)을 안내한다. 인용 · 링크를 권하는 것이지 글을 옮겨 실어도 된다는 허락은 아님
- 그래서 원문을 싣지 않고, 지금처럼 Regula의 요약(다크 패턴 9개 항목)과 링크만 둔다
- 응답 헤더에 X-Frame-Options · frame-ancestors가 없어 iframe 미리보기는 될 수도 있으나, 실제로 열리는지는 확인하지 않음(embed는 꺼 둔 그대로)

## 2026-11-03 — 26차: Nielsen Norman Group 원문은 가져오지 않음

### 확인한 것

- 글 바닥글: "Copyright © 1998-2026 Nielsen Norman Group, All Rights Reserved." · Terms & Conditions · Copyright & Reprint Policy
- Copyright and Reprint Information(nngroup.com/copyright-and-reprint-info/): 다른 웹사이트가 글을 옮겨 싣는 것은 허락하지 않고, 글마다 250달러 라이선스 비용을 내야 한다. 링크는 얼마든지 걸어도 된다. 몇 단어나 몇 줄 인용은 따로 허락 없이 할 수 있다(원문 링크를 붙이길 권함). 번역도 유료(글당 250달러 또는 연 1만 달러). 그림은 따로 허락이 필요하다. 무료 종이 인쇄 허락은 온라인판에는 적용되지 않는다
- 그래서 원문을 싣지 않고, 지금처럼 Regula의 요약 · 짧은 인용과 원문 링크만 둔다. Regula에서 nngroup을 출처로 쓴 항목 41개도 이 범위(요약과 링크) 안에 있다
- 사이트가 다른 페이지 안에 띄우는 것을 막고 있어(embed 꺼짐) 미리보기도 없다

## 2026-11-03 — 25차: Laws of UX 라이선스 확인 (원문은 아직 싣지 않음)

### 확인한 것

- lawsofux.com 바닥글(첫 페이지와 법칙 페이지 모두): "Laws of UX © Jon Yablonski 2026" · License 링크가 CC BY-NC-ND 4.0(creativecommons.org/licenses/by-nc-nd/4.0/)을 가리킴
- CC BY-NC-ND 4.0 법률 원문: 비영리 목적이면 전부나 일부를 복제 · 공유할 수 있다(출처 표시 조건). "Adapted Material"(번역 · 변경 · 재배열 등)은 만들 수는 있어도 공유할 수 없다. 비영리는 "주로 상업적 이익이나 금전 보상을 위한 것이 아닌" 것
- 즉 영어 원문을 고치지 않고 출처를 밝혀 싣는 것은 비영리 사이트라면 가능하지만, 번역해 싣는 것은 안 된다. CLAUDE.md가 원문 전체를 실어도 된다고 한 퍼블릭 도메인 · CC0 · MIT 같은 자유 라이선스에는 들지 않는다(비영리 · 변경 금지 조건)
- 그래서 싣지 않고 사용자 판단을 기다린다. Regula의 해당 공식 23개는 7차에서 사이트 요약이 아니라 원래 논문 · 글로 확인해 옮겼다

## 2026-11-03 — 24차: Apple Human Interface Guidelines 원문은 가져오지 않음

### 확인한 것

- HIG 페이지(developer.apple.com/design/human-interface-guidelines/…) 바닥글: "Copyright © 2026 Apple Inc. All rights reserved." · Terms of Use(apple.com/legal/internet-services/terms/site.html) · Agreements and Guidelines. 자유 라이선스 없음
- Terms of Use "Content": 사이트의 글 · 그림 · 화면 등 모든 콘텐츠는 Apple 소유이며, 약관이 따로 허락한 경우 말고는 Apple의 서면 동의 없이 복제 · 재게시 · 번역 · 배포(미러링 포함)할 수 없다. 내려받기용 자료도 개인 · 비상업 용도로만, 네트워크에 올리지 말 것
- 그래서 원문을 싣지 않고 지금처럼 요약과 링크만 둔다
- 같은 약관 "Your Use of the Site"는 robot · spider 등 자동 프로그램으로 사이트에 접근 · 수집 · 감시하는 것을 막는다. 20차의 `npm run measure-embeds`가 헤드리스 브라우저로 HIG 높이를 쟀으므로, 측정 대상에서 빼고(NO_ROBOTS) 잰 값도 지움 → HIG 미리보기는 예전처럼 상자 안에서 스크롤
- 미리보기 iframe은 방문자의 브라우저가 Apple 페이지를 그대로 불러오는 것이라 그대로 둠(사이트가 다른 페이지 안에 띄우는 것을 막지 않음). 약관이 iframe 삽입을 따로 다루지는 않는다

## 2026-11-03 — 23차: Material Design 3 원문은 가져오지 않음

### 확인한 것

- m3.material.io(가이드라인 사이트)를 브라우저로 열어 바닥글을 확인: Privacy Policy · Terms of Service(policies.google.com)만 있고 글의 라이선스는 밝히지 않음. 자유 라이선스가 아니므로 원문을 싣지 않고, 지금처럼 요약과 링크만 둔다
- 대신 쓸 수 있는 것으로 material-components/material-web 저장소(Apache-2.0, 커밋 de5470f, 2026-10-29)의 docs/components/*.md가 있다. 하지만 이것은 웹 컴포넌트 사용법 · API 문서이고, Regula 공식 · 패턴 36개가 출처로 적은 M3 가이드라인(Gestures · Motion · Snackbar · Dialogs 등)과는 다른 문서다. 저장소도 "maintenance mode"라 이번에는 싣지 않음
- m2.material.io(Material Design 2) 바닥글에는 "License" 링크가 Apache-2.0을 가리키지만, 글에 대한 것인지 코드에 대한 것인지 분명하지 않고 M3와 다른 판이라 이번 범위에서 뺌

## 2026-11-03 — 22차: Carbon · Primer 문서 원문 가져오기

### 원문을 읽고 확인

- Carbon: 문서 저장소 carbon-design-system/carbon-website의 LICENSE가 Apache License 2.0(부록 예시 문구 "Copyright 2018 IBM Corp."). 그런데 README 맨 위에 "The Carbon website has moved to PayloadCMS. This version of the website is now archived."라고 적혀 있고 마지막 커밋이 "chore: archive website repo"(5e9cd1d, 2026-09-30). 지금 carbondesignsystem.com은 Next.js로 새로 만들어졌고 바닥글에 "Copyright © 2026 IBM"만 있어 라이선스를 따로 밝히지 않음 → 라이선스가 분명한 보관본을 가져옴
- Primer: 문서 저장소 primer/design의 LICENSE가 MIT(Copyright (c) GitHub, Inc.). 마지막 커밋 87f799f(2025-07-01). 지금 primer.style은 Next.js로 바뀌어 이 저장소에서 나오지 않음 → 저장소 판본을 가져옴
- 두 곳 모두 "지금 사이트와 다를 수 있다"고 화면에 적고, 라이선스 전문(MIT는 고지와 허락 문구를 모든 사본에 넣어야 함)을 접어서 함께 실음
- Apache-2.0 4(b)(바꾼 파일에는 바꿨다는 표시): 화면용 MDX 컴포넌트(배치 Row · Column · Box, 목차 AnchorLinks, 데모 StorybookDemo · StorybookEmbed 등)를 걷어 낸 것, Do · Don't 설명(caption)을 본문으로 옮긴 것, 데모를 Storybook 링크로 바꾼 것을 화면에 적음. 글 자체는 고치지 않음
- 이미지는 저장소의 그 커밋에서 불러옴(raw.githubusercontent.com). Carbon 문서의 "/images/…"는 사이트 뿌리가 아니라 페이지 폴더의 images/라서(gatsby-remark-images) 그렇게 고쳐 연결. 이미지 107개 중 106개가 열림, Primer의 github.com/user-attachments 이미지 하나는 로그인하지 않은 요청에 403

### 가져온 페이지

- Carbon 6쪽: Spacing(공식 8pt 그리드 · 간격 스케일 · 간격의 위계가 출처로 씀), Notification(패턴 토스트), Progress indicator(패턴 단계 표시), 정리의 "볼 것"인 Data table · Forms · Notifications 패턴
- Primer 2쪽: 정리의 "볼 것"(정보 밀도가 높은 화면의 간격과 타이포그래피)에 맞춰 Layout · Typography. Primer를 출처로 쓴 공식 · 패턴은 아직 없음

### 주의

- 페이지 안 링크는 지금 사이트 주소로 연결하는데, 사이트가 새로 만들어지며 주소가 바뀐 곳은 열리지 않을 수 있음

## 2026-11-03 — 21차: GOV.UK Design System 원문 가져오기

### 원문을 읽고 확인

- 사이트(https://design-system.service.gov.uk) 바닥글: "All content is available under the Open Government Licence v3.0, except where otherwise stated". 저장소 alphagov/govuk-design-system의 LICENSE 파일: MIT License, Copyright (c) 2017 Crown Copyright (Government Digital Service)
- OGL v3.0 원문(National Archives)을 읽음: 복제 · 배포 · 고치기 · 상업적 이용 허용. 조건은 정보 제공자가 정한 출처 표시를 넣거나 링크하고, 가능하면 라이선스에 링크할 것. 따로 정한 문구가 없으면 "Contains public sector information licensed under the Open Government Licence v3.0."를 쓴다 → 페이지에 이 문구와 라이선스 링크를 함께 보임
- 가져온 페이지 13개: Regula 공식 · 패턴 14개가 source에 적은 GOV.UK 페이지 10개(Button · Checkboxes · Error message · File upload · Pagination · Radios · Select · Text input · Textarea · Phone numbers)와 레퍼런스 정리의 "볼 것" 3개(Error summary · Recover from validation errors · Question pages). 기준 커밋 1403d1b(2026-11-02)
- 글은 고치지 않음. 바꾼 것은 Nunjucks 템플릿 문법을 걷어 낸 것, 예시 화면을 원문 사이트의 예시 페이지 링크로 바꾼 것, 사이트 안 링크를 절대 주소로(함께 가져온 페이지면 이 페이지 안으로) 바꾼 것, 이미지를 원문 사이트에서 불러오게 한 것
- postels-law의 source에 적힌 「Telephone numbers」는 지금 페이지 제목이 "Phone numbers"(별칭: phone numbers, telephone)라 별칭으로 연결됨
- 갱신은 `npm run sync-govuk`. 바닥글의 OGL 문구나 저장소 LICENSE(MIT)가 바뀌면 멈춤

### 가져오지 않은 것

- 나머지 컴포넌트 · 패턴 페이지(Regula가 출처로 쓰지 않은 것). 쓰게 되면 source에 페이지 이름을 적고 다시 가져온다

## 2026-11-02 — 20차: 레퍼런스 원문 가져오기 (WCAG 2.2) · 펼친 미리보기

### 원문을 읽고 확인

- WCAG 2.2 TR 문서(https://www.w3.org/TR/WCAG22/)의 저작권 줄이 "document use" 규칙으로 W3C Document License(https://www.w3.org/copyright/document-license/)를 가리키는 것을 확인. 2023판 원문을 읽음: 어떤 매체로든 복제 · 배포 허용, 조건은 ① 원문 링크 ② 저작권 고지 "Copyright © [문서 연도] World Wide Web Consortium." ③ 문서 상태(STATUS). 고치거나 파생물을 만드는 권리는 주지 않음(소프트웨어 문서에 딸린 경우만 예외)
- 그래서 성공 기준 87개(원칙 4 · 지침 13 포함)를 W3C가 공개한 https://www.w3.org/WAI/WCAG22/wcag.json에서 원문 그대로 가져옴. 번역 · 요약으로 바꿔 싣지 않음. 바꾼 건 표시용 마크업뿐(자동 id 삭제, 링크를 절대 주소 · 새 탭으로, 노트 제목 꼬리표). 문서 상태 "W3C Recommendation 12 December 2024"는 TR 문서의 w3c-state에서 읽음
- 페이지에 원문 링크 · 고지 · 상태 · 라이선스 링크를 함께 보임. 4.1.1 Parsing은 원문대로 "삭제됨"으로 둠(수준 없음)
- 갱신은 `npm run sync-wcag`. TR 문서의 저작권 줄에서 Document License 링크가 사라지면 멈춤

### Regula가 정한 것 (출처 없음)

- 기준마다 붙인 "Regula에서" 연결: wcag-22를 refs에 넣은 공식 · 패턴의 글에서 기준 번호(1.4.3 꼴)를 찾아 붙임. 번호를 적지 않은 항목은 연결되지 않음
- "2.2에서 새로" 표시는 wcag.json의 versions가 2.2 하나뿐인 기준

### 가져오지 않은 것

- GOV.UK(OGL v3 · MIT), Carbon(Apache-2.0로 알려짐), Primer는 아직 라이선스 원문을 확인하지 않아 이번에 가져오지 않음. 책과 저작권이 있는 사이트(Apple HIG · NN/g · Laws of UX 등)는 지금처럼 요약과 링크만 둠

### 펼친 미리보기 (embed)

- 사이트 내용을 저장하지 않는다. `npm run measure-embeds`가 헤드리스 브라우저에서 레퍼런스 페이지와 같은 sandbox iframe에 사이트를 띄워 폭 320–960px(40px 간격, 높이가 25% 넘게 뛰는 브레이크포인트는 1px 앞뒤까지)에서 문서 높이만 재고, 페이지의 iframe은 늘 원본 사이트를 직접 불러와 그 높이만큼 펼친다(사이는 직선 보간)
- 창을 키우면 따라 길어지는(100vh 구조) 폭과 안쪽 영역만 스크롤되는 사이트는 펼치지 않고 예전처럼 상자 안에서 스크롤

## 2026-11-02 — 19차: 사이트 DESIGN.md (/design-md/)

### 원문을 읽고 확인

- VoltAgent/awesome-design-md 저장소를 받아 LICENSE 파일을 직접 읽음: MIT License, Copyright (c) 2026 VoltAgent. 그래서 DESIGN.md 84개를 원문 그대로 실음(src/imported/design-md/, LICENSE 사본 포함). 기준 커밋 fcc7028(2026-10-28)
- 사이트 이름 · 분류 · 한 줄 설명은 저장소 README의 Collection 목록에서 읽음. Slack은 폴더는 있지만 README 목록에 없어 "기타"로 둠
- 문서는 회사의 공식 디자인 시스템이 아니라 VoltAgent가 공개 화면을 보고 쓴 해석이다(README: "DESIGN.md analysis", 파일 이름 예: "Stripi-Inspired-design-analysis"). 화면에 그렇게 적음

### Regula가 정한 것 (출처 없음)

- 분류 이름의 한국어 번역, 색 견본에 올릴 색을 뽑는 방법(YAML의 colors 블록, 없으면 본문의 `**이름** (`#hex`)` 꼴, 그것도 없으면 본문에 나온 순서)

### 주의

- 71개만 맨 위 YAML이 있고, 3개(elevenlabs · raycast · supabase)는 YAML 문법이 깨져 있으며 10개는 YAML이 없다. 그래서 YAML 전체를 해석하지 않고 필요한 줄만 읽는다
- 원문을 고치지 않는다. 갱신은 `npm run sync-design-md`(라이선스가 MIT가 아니게 바뀌면 멈춤)

## 2026-11-02 — 18차: 색 조합 다시 고르기

### 바꾼 것

- 자유 라이선스 팔레트 조합 14개를 모두 지우고 32개로 새로 고름. 원리별 묶음 대신 결(group)로 묶음: 뉴트럴과 포인트 하나 8 · 따뜻한 바탕 7 · 옅은 색 바탕 6 · 다크 우선 5 · 선명한 두 색 6. Regula 양식 4개는 그대로
- 값은 17차에서 라이선스를 확인한 Tailwind CSS v3 · Open Color · CSS 이름 색(linen · floralwhite · oldlace)에서만 가져옴. 빌드가 팔레트 파일 값과 다시 맞춰 봄

### Regula가 정한 것 (출처 없음)

- 어떤 색을 묶을지, 결로 나누는 기준, "요즘 웹 화면에서 자주 보인다"는 판단 — 조사한 통계가 아님. 화면 표에도 그렇게 적음
- 원리(보색 · 유사색) 표시는 OKLCH로 키와 보조 색의 색상각 차이를 계산해 135–225°면 보색, 60° 이내면 유사색으로 붙임. 모든 조합에 60-30-10을 붙임

### 확인

- 32개 모두 라이트 · 다크에서 글자 / 바탕 · 글자 / 면 · 키 글자 / 면 · 키 면 위 글자 4.5:1, 보조 색 / 면 3:1 이상(WCAG 2.2 1.4.3 · 1.4.11, 4차에서 확인한 기준). 미달은 기존 양식 조합(Cordovan 1 · Terrazzo 4 · Regula 1)만 남음

## 2026-11-02 — 17차: 색 견본 · 조합 (/colors/)

### 원문을 읽고 확인

- 라이선스 원문(저장소의 LICENSE 파일을 직접 받아 읽음): Open Color (yeun/open-color, MIT, © 2016 heeyeun) · Radix Colors (radix-ui/colors, MIT, © Modulz · WorkOS) · Tailwind CSS (tailwindlabs/tailwindcss, MIT, © Tailwind Labs). 셋 다 MIT라 값 전체를 실음
- 값: Open Color `open-color.json`(master), Tailwind `src/public/colors.js`(**v3 브랜치** — v4는 같은 이름을 OKLCH로 다시 정의해 값이 다름), Radix `@radix-ui/colors@3.0.0`의 라이트 CSS 중 gray · blue · green · red · amber · violet 6개(일부만 실었다고 화면에 적음)
- CSS 이름 색: W3C CSS Color Module Level 4 §6.1 Named Colors 표에서 148개를 받음(**Candidate Recommendation Draft 2026-11-01**). 16개는 VGA, 대부분은 X11에서 왔다는 설명, "좋아서가 아니라 널리 쓰여서 표준화했다", `darkgray`가 `gray`보다 밝고 `lightpink`가 `pink`보다 짙다는 예, 사용을 권하지 않는다는 문장을 본문에서 확인
- Radix 단계의 쓰임(1–2 배경 · 3–5 컴포넌트 면 · 6–8 테두리 · 9–10 단색 면 · 11–12 글자): Radix 문서 「Understanding the scale」에서 확인
- 팬톤: Adobe 도움말 「Pantone Color Books | Photoshop」(helpx.adobe.com)과 당시 보도(AppleInsider 2022-10-29 등)로 2022년부터 Creative Cloud 앱에서 팬톤 견본첩이 빠지고 Pantone Connect 라이선스가 필요해졌음을 확인. 팬톤 번호 · 색값은 싣지 않음

### Regula가 정한 것 (출처 없음 — 화면 · 파일에 그렇게 적음)

- 어떤 색을 한 조합으로 묶을지, 몇 단계를 쓸지. 근거로 든 원리(보색 · 유사색 · 삼각 · 분할 보색 · 60-30-10)는 각 공식의 출처를 따르지만, 조합 자체는 출처가 있는 배색이 아니다
- 팔레트의 정해진 단계에서 고르기 때문에 규칙의 각도와 몇십 도 어긋난다 — 조합마다 OKLCH 색상각을 계산해 그대로 적음(예: 청록과 장미 +190°)
- 색 띠 면적(바탕 46 · 면 24 · 글자 12 · 주 강조 10 · 보조 6)
- 디자인 파일 만들기로 옮길 때 보조 글자 = 글자 75% + 면 25%, 선 = 면 84% + 글자 16%, 입력칸 테두리 = 반반
- 대비 검사 짝(글자/바탕 · 글자/면 · 주 강조 글자/면 · 주 강조 면 위 글자 · 보조 색/면)을 고른 것. 기준 숫자는 WCAG 2.2 1.4.3 · 1.4.11(4차에서 확인)
- Terrazzo 조합에는 원리를 붙이지 않음 — 빨강 · 파랑 · 노랑이 OKLCH로는 120°씩 떨어져 있지 않아 "삼각 배색"이라 부르지 않음

### 주의

- 조합의 HEX가 팔레트 파일 값과 다르면 빌드가 멈춘다(src/lib/combos.ts). 양식 조합은 DESIGN.md 토큰을 빌드 때 읽으므로 두 곳에 값을 적지 않는다
- 미달인 짝을 숨기지 않고 표시한다(노랑 · 형광펜 같은 밝은 보조 색은 흰 면 위에서 3:1이 안 됨)

## 2026-11-02 — 16차: 백로그 대조와 토스 TDS Button

### 대조

- PLAN §8 백로그 대비 레퍼런스에 없던 것은 『The Elements of Typographic Style』 하나뿐이었다(책 · 디자인 시스템 · 저장소 · 커뮤니티 나머지는 모두 있음). 레퍼런스로 추가하고 "줄 길이" 원리의 근거로 이은 것이 전부이며, 책 원문은 대조하지 않았다.

### 원문을 읽고 확인

- 토스 TDS Mobile 소개 페이지: 컴포넌트 목록(Button · Toast · Bottom Sheet · TextField 등)과 Foundation은 Colors · Typography. 소개 페이지에는 값이 없음
- 토스 TDS Mobile Button 문서: size small · medium · large · xlarge(기본 xlarge), variant fill(기본) · weak, color primary(기본) · danger · light · dark, display inline · block · full, `loading`은 로딩 표시를 보이고 버튼 너비를 유지, `disabled`는 클릭을 막음, 아이콘만 있거나 모호한 라벨에는 `aria-label`

### 확인 못 한 것

- 토스 TDS Foundation(Colors · Typography) 페이지 주소 — 추정한 주소는 404
- Wanted Montage 문서: 첫 페이지에 값이 없고 foundation/typography 주소는 404 — 아무것도 옮기지 않음

## 2026-11-02 — 15차: 디자인 파일 만들기 (/builder/)

이 차수에서 새로 원문을 읽은 것은 W3C Media Queries 하나이고, 나머지는 이전 차수에 원문으로 확인한 기준을 도구에 옮긴 것이다.

### 원문을 읽고 확인

- W3C Media Queries Level 5 (https://www.w3.org/TR/mediaqueries-5/, **Working Draft 2026-02-19**): `prefers-reduced-transparency`(no-preference | reduce — 시스템에 투명 · 반투명 효과를 줄여 달라고 요청했는지)와 `prefers-contrast`(no-preference | less | more | custom)가 정의돼 있음을 본문에서 확인. 권고안(Recommendation)이 아니라 작업 초안이라 파일에는 "Working Draft"로 적고, 지원하지 않는 브라우저는 그 조건만 무시한다(미디어 쿼리 목록이라 나머지는 그대로 적용)
- 이전 차수에서 이미 원문으로 확인한 기준을 그대로 사용: WCAG 2.2 1.4.1 · 1.4.3(4.5:1) · 1.4.11(3:1) · 2.2.2 · 2.3.3 · 2.5.5(44px) · 2.5.8(24px) (4차), Material 3 motion 토큰의 곡선 값 standard (0.2, 0, 0, 1) · decelerate (0, 0, 0, 1) · accelerate (0.3, 0, 1, 1) (3차), NN/g Glassmorphism (1차 · 반투명 면 위 글자 대비)

### 이 도구가 정한 값 (출처 없음 — 파일에도 그렇게 적음)

- 호버 12% · 눌림 24% 섞기, 부드러운 배경 12% 섞기, 강조색 위 글자색 고르는 법
- 그림자 단계 값(흐린 4단계 y · 번짐 · 투명도, 어긋난 2/4/6/8px, 한 쌍 3/6/10/16px)과 "카드 = 고른 단계, 버튼 = 한 단계 아래, 떠 있는 것 = 한 단계 위"
- 간격 8단계 배수, 밀도 3종, 시간 묶음(빠름 · 보통 · 느림), 타입 단계 비율 6개, 비주얼 스타일 9가지의 CSS 근사값
- 위험 버튼 · 알림 · 입력칸 조합 17쌍을 검사 대상으로 고른 것. 기준 숫자는 WCAG에서 왔지만 어떤 조합을 볼지는 이 도구의 선택

### 주의

- 대비는 sRGB 값으로 계산(src/lib/color.ts의 luminance · contrast)하고, 화면에는 소수 둘째 자리 **버림**으로 보여 4.499가 4.50으로 보이지 않게 함. 이 버림 처리는 도구의 선택이고 WCAG 문장을 인용한 것이 아님
- 면이 반투명(투명도 < 100%)이면 대비는 뒤 배경에 따라 달라지므로 표는 불투명 기준이라고 파일에 적음
- 내려받는 `tokens.json`은 W3C Design Tokens 형식이 아니라 Regula 자체 형식(`format: regula-design-tokens/1`)

## 2026-11-02 — 14차: 온보딩 양식

### 원문을 읽고 확인

- Alita Kendrick, 「Mobile-App Onboarding: An Analysis of Components and Techniques」 (NN/g, 2020): 가능하면 만들지 않기, 정당한 경우 셋(시작에 사용자 정보가 필요 · 개인 상황에 달린 기능 · 낯선 새 기능), 맥락 속 안내, 짧고 건너뛸 수 있는 카드(건너뛰기 · 적은 장수 · 장당 개념 하나 · 진행 표시), 계정 만들기와 맞춤 설정 질문의 한계, 테마 같은 선택은 설정으로
- Maria Rosala, 「3 Design Considerations for Effective Mobile-App Permission Requests」 (NN/g, 2019): 기능을 누른 순간에 요청, 접근 대상과 얻는 것 설명, 거절 시 이유 + 기기 설정 링크, 위장 · 거절 어렵게 하기는 다크 패턴
- Aurora Harley, 「Instructional Overlays and Coach Marks for Mobile Apps」 (NN/g, 2014-02-16): 숨은 기능에만, 힌트 하나에 상호작용 하나, 도달한 자리에서 하나씩, 연달아 보이면 닫힘
- WCAG 2.2 Understanding 2.2.2 Pause, Stop, Hide (A): 자동 시작 + 5초 초과 + 다른 내용과 함께면 멈춤 · 숨김
- WCAG 2.2 Understanding 3.2.6 Consistent Help (A): 반복되는 도움말은 같은 순서

### 주의

- Apple HIG Onboarding 페이지는 본문을 받지 못해 인용하지 않음(제목만 나옴)
- 코치마크 글(2014)은 건너뛰기 · 닫는 시점을 다루지 않아 미리보기의 "닫으면 다시 안 나옴"은 예시
- 소개 카드 장수 3장은 "적게"라는 원문에 맞춘 예시

## 2026-11-02 — 13차: 결제 양식

### 원문을 읽고 확인

- GOV.UK Design System 「Check answers pattern」: 작은 거래는 확인 화면 하나, 제목이 할 일을 말하기, 항목별 "Change" 링크 + 숨은 글, 고친 뒤 확인 화면으로 돌아오기 · 이전 값 채우기, 제출 전 확인 문장, 버튼은 하는 일을 말하기("Accept and send")
- GOV.UK 「Confirmation pages」: 참조 번호 · 다음에 일어날 일과 시점 · 연락처 · 다음에 필요한 링크 · 피드백 링크 · 기록 저장(PDF), 패널 안 링크 · 버튼은 3:1 대비
- WCAG 2.2 Understanding 3.3.4 Error Prevention (Legal, Financial, Data) (AA): 되돌리기 · 검사 · 확인 중 하나
- WCAG 2.2 Understanding 3.3.7 Redundant Entry (A): 이미 입력한 정보는 자동 채우기 또는 선택, 예외 셋(필수 재입력 · 보안 · 더는 유효하지 않음)
- deceptive.design 「Hidden costs」: 마지막 단계에서야 높은 최종 금액이 나타나는 패턴

### 주의

- 「Hidden costs」 페이지의 연구 수치(약 21% 더 지출, 14.1% 더 구매 완료)는 한 티켓 시장 실험의 값이라 규칙 문장에 쓰지 않음
- 전자상거래법 조항은 law.go.kr 본문을 받지 못해 확인하지 못함 — 규칙에 넣지 않음
- Preselection · Sneaking · Hidden subscription은 4차에서 확인한 유형 이름을 그대로 씀
- 결제 버튼에 금액을 쓰는 것은 Check answers의 "하는 일을 말한다"를 옮긴 Regula의 적용

## 2026-11-02 — 12차: 오류 페이지 양식

### 원문을 읽고 확인

- GOV.UK Design System 「Page not found pages」: 제목 "Page not found", 404 · bad request 같은 용어 · "oops" 같은 가벼운 말 · 탓하기 · 빨간 글씨 · 브레드크럼 금지, 직접 친 주소 / 붙여 넣은 주소 안내 문구 분리, 연락처는 필요할 때만(번호 + 운영 시간), 링크 · 버튼 점검과 옛 주소 리디렉트
- GOV.UK 「There is a problem with the service pages」: 예상 못한 문제는 같은 페이지 하나로, "Try again later.", 입력한 답의 상태(저장 시 30일 / 저장 안 됨) 알리기, "We are experiencing technical difficulties" 금지, 오래가면 Service unavailable로, 다른 서비스 링크
- GOV.UK 「Service unavailable pages」: 의도해서 닫은 서비스에 쓰기, 다시 열리는 요일 · 날짜 · 시각, "maintenance" · "improvements" 같은 모호한 말 금지
- Jakob Nielsen, 「Improving the Dreaded 404 Error Message」 (NN/g, 1998): 가볍게 사과하되 탓하지 않기, 이유 설명, 비슷한 철자의 유효한 주소를 링크로 제안, 검색창

### 주의

- GOV.UK 세 페이지는 영국 공공 서비스 기준이라 상점 · 앱에는 연락처 · 다른 서비스 링크 규칙을 줄여 쓴다(양식 메모에 적음)
- 다시 시도 버튼은 GOV.UK가 설명하지 않는 장치라 미리보기의 값은 예시
- NN/g 글은 1998년 것이라 문구 · 검색창 원리만 가져옴

## 2026-11-02 — 11차: 검색 결과 양식

10차에서 확인한 NN/g 글(검색창 · 돋보기 · 결과 없음 · 필터 카테고리 · 적용 시점 · 판)과 WCAG 4.1.3에 더해 아래를 읽었다.

### 원문을 읽고 확인

- GOV.UK Design System 「Pagination」: 검색 결과처럼 여러 페이지를 오갈 때. 한 페이지뿐이면 보이지 않기, 첫 페이지에 "이전" · 마지막 페이지에 "다음" 빼기, 페이지 번호를 `<title>`에(예: 'Search results (page 1 of 4)'), 무한 스크롤은 키보드 사용자에게 문제라 피하기, 필터 · 정렬은 전체 목록에 적용하고 새 결과의 첫 페이지로, 기본값은 넘겨 볼 페이지 수를 줄이도록
- GOV.UK Design System 「Radios」 Smaller radios: 검색 결과 페이지의 주된 일은 결과를 보는 것, 작은 라디오로 필터를 결과에서 주의를 빼앗지 않게
- Kathryn Whitenton, 「3 Guidelines for Search Engine "No Results" Pages」 (NN/g, 2014): 원래 검색어를 다시 보여 주고, 검색창에 원래 검색어를 남겨 고치기 쉽게
- Kate Moran · Cami Goray, 「Complex Search-Results Pages Change Search Behavior: The Pinball Pattern」 (NN/g, 2019-11-17): 첫 자리 클릭 28%, 첫 페이지를 넘긴 검색 2% — 웹 검색 엔진 기준

### 주의

- Pinball Pattern의 숫자는 웹 검색 엔진(SERP) 연구라 사이트 검색에 그대로 옮기지 않고 원리만 씀(양식 메모에 적음)
- 정렬 기준 개수 · 한 페이지 개수의 출처는 찾지 못함 — 미리보기 값은 예시

## 2026-11-02 — 10차: 찾기와 거르기 패턴 (검색창 · 최근 검색어 · 검색 제안 · 정렬 · 필터 칩 · 적용된 필터 · 패싯 필터)

### 원문을 읽고 확인

- Jakob Nielsen, 「Search: Visible and Simple」 (NN/g, 2001-05-12): 검색은 링크가 아니라 입력칸, 흔한 검색어가 다 보일 만큼 넓게, 보통 위쪽
- Katie Sherwin, 「The Magnifying-Glass Icon in Search Design: Pros and Cons」 (NN/g, 2014-02-23): 돋보기는 라벨 없이도 알아보지만, 아이콘만 두면 검색을 찾기 어려움
- Kate Moran, 「Site Search Suggestions」 (NN/g, 2018-05-20): 끝을 채우는 제안은 덧붙인 글자, 가운데 포함 제안은 사용자가 친 글자를 강조. 범위 · 썸네일 · 카테고리는 알맞을 때
- Kathryn Whitenton, 「Filters vs. Facets: Definitions」 (NN/g, 2014-03-16): 필터는 일부를 빼는 모든 것, 패싯은 내용 전체를 설명하는 여러 필터
- Kathryn Whitenton, 「Mobile Faceted Search with a Tray」 (NN/g, 2015-07-26): 결과 위에 뜨는 판, 결과가 뒤에서 바뀌는 게 보임, 전체 결과 수가 늘 보임
- Katie Sherwin, 「User Intent Affects Filter Design」 (NN/g, 2016-02-07): 바로 적용(interactive) vs 모아서 적용(batch) — 둘러보는 사용자에겐 바로, 조건이 분명하거나 사이트가 느리면 모아서. 고르는 도중 화면 위치를 튕기지 않기
- Kate Moran, 「Helpful Filter Categories and Values for Better UX」 (NN/g, 2018-07-15): appropriate · predictable · free of jargon · prioritized
- Kathryn Whitenton, 「3 Guidelines for Search Engine "No Results" Pages」 (NN/g, 2014-01-05): 결과 없음을 분명히, 다음 길을, 사용자를 놀리지 않기
- Apple HIG Search fields (developer.apple.com JSON 본문): placeholder로 범위 알리기, 검색 시작 전 최근 검색어 · 치는 동안 제안, scope bar · token, 넓은 범위에서 시작
- material-components-android `docs/components/Chip.md`: filter chip은 태그나 짧은 말로 내용을 거르고, 토글 버튼 · 체크박스의 대안
- W3C WAI-ARIA APG Sortable Table 예제: 정렬된 열 머리에 aria-sort, 정렬 가능한 머리 글자는 button
- WCAG 2.2 4.1.3 Status Messages (AA): 상태 메시지는 포커스를 받지 않고도 보조 기술에 전달되게

### 직접 읽지 못함

- NN/g의 정렬 · 최근 검색어 · 적용된 필터 전용 글은 찾은 주소가 404였다. 최근 검색어는 Apple HIG, 정렬은 W3C APG만 출처로 씀
- Material Design 3 Chips 문서 본문(m3.material.io) — 구현 저장소 문서로 대신

## 2026-11-02 — 9차: 포스텔 · 인지 부하 · 멘탈 모델 · 능동적 사용자의 역설 · 배너 맹시

### 원문을 읽고 확인

- RFC 761 (Jon Postel 편, 1980-01) TCP 명세: "be conservative in what you do, be liberal in what you accept from others"
- RFC 1122 §1.2.2 Robustness Principle (1989): "Be liberal in what you accept, and conservative in what you send"
- RFC 9413 「Maintaining Robust Protocols」 (IAB, Informational, 2023-06): 견고성 원칙은 해석이 여러 갈래이고, 어떤 해석은 시간이 지나며 상호 운용성을 해친다고 봄 → 포스텔의 법칙 메모에 비판으로 적음
- GOV.UK Design System 「Telephone numbers」: 익숙한 형식 그대로 넣게 하고 공백 · 하이픈 · 대시 · 괄호, 국가 · 지역 번호를 받아 줄 것. 그래도 검증은 할 것
- Kathryn Whitenton, 「Minimize Cognitive Load to Maximize Usability」 (NN/g, 2013-12-22): 줄여야 할 것은 extraneous cognitive load, 방법 세 가지(시각적 잡동사니 · 기존 멘탈 모델 · 일을 시스템이 떠맡기)
- Megan Chan, 「Mental Models」 (NN/g, 2024-01-26, 2026-09-01 재검토, Nielsen 2010년 글 개정판): 멘탈 모델은 사용자가 시스템에 대해 믿는 것, 사실이 아니라 믿음
- Jakob Nielsen, 「Paradox of the Active User」 (NN/g, 1998-10-04): Carroll & Rosson이 1980년대 초 IBM 연구에서 관찰, 사용자는 설명서를 읽지 않고 바로 씀. 참고문헌 Carroll & Rosson (1987), 『Interfacing Thought』 (MIT Press)
- Kara Pernice, 「Banner Blindness Revisited: Users Dodge Ads on Mobile and Desktop」 (NN/g, 2018-04-22): 1997년 처음 기록, 2007년 · 2018년 시선 추적으로 재확인. 광고처럼 보이거나 광고 가까이 · 광고 자리에 있는 것을 무시. 내용을 광고처럼 꾸미지 말 것

### 직접 읽지 못함

- Carroll & Rosson 1987 원문(책 속 장) — NN/g의 소개만 읽음
- Broadbent 1958 · Cherry 1953(선택적 주의의 기원) — Laws of UX 요약만 보고 공식 출처로 쓰지 않음

## 2026-11-02 — 8차: 폰 레스토프 · 계열 위치 · 목표 경사 · 균일 연결성

### 원문을 읽고 확인

- Ran Kivetz · Oleg Urminsky · Yuhuang Zheng, 「The Goal-Gradient Hypothesis Resurrected」 (Journal of Marketing Research 43(1), 2006, pp.39–58) — Urminsky의 시카고대 페이지에 올린 PDF 전문: 카페 쿠폰에서 무료 한 잔에 가까워질수록 구매 간격이 평균 20%(0.7일) 줄어듦. 10칸 빈 쿠폰은 10잔을 평균 15.6일, 보너스 도장 2개가 찍힌 12칸 쿠폰은 12.7일에 채움(약 20% 빠름, 중앙값 15일 vs 10일). 보상 뒤에는 속도가 다시 느려짐(postreward resetting). Hull(1932) · Hull(1934) 쥐 실험을 출발점으로 인용
- Stephen Palmer · Irvin Rock, 「Rethinking perceptual organization: The role of uniform connectedness」 (Psychonomic Bulletin & Review 1(1), 1994) — 초록(Europe PMC): 밝기 · 색 · 질감이 고른 닫힌 영역은 처음에 한 단위로 보이고, 근접성 · 유사성과 맞서도 이김. 묶기의 한 형태가 아니라 그보다 먼저 일어나는 단계로 봄
- R. Reed Hunt, 「The subtlety of distinctiveness: What von Restorff really did」 (Psychonomic Bulletin & Review, 1995) — 초록: 폰 레스토프는 눈에 띄는 차이(지각적 두드러짐)가 꼭 필요하지 않다는 증거를 보였고, 차이는 나머지 항목의 비슷함 속에서만 힘을 가진다고 봄. 원 논문은 영어 번역이 없음
- 서지 정보만 확인(Crossref): von Restorff (1933) Psychologische Forschung 18 · Hull (1932) Psychological Review 39, pp.25–43 · Murdock (1962) Journal of Experimental Psychology 64, pp.482–488

### 직접 읽지 못함

- von Restorff 1933 원문(독일어, Springer 유료), Murdock 1962 본문(APA 유료)
- 계열 위치 효과라는 이름을 Ebbinghaus가 지었다는 Laws of UX의 설명 — 확인 못 함, 공식 메모에 적음
- NN/g의 계열 위치 효과 글은 주소가 404

## 2026-11-01 — 7차: Laws of UX 남은 법칙 (밀러 · 제이콥 · 테슬러 · 응답 시간 · 심미적 사용성)

lawsofux.com의 각 법칙 페이지에서 "Origins"를 읽고, 거기서 가리키는 원래 글을 찾아 대조했다.

### 원문을 읽고 확인

- George A. Miller, 「The Magical Number Seven, Plus or Minus Two」 (Psychological Review, 1956) — York University Classics in the History of Psychology 전문. 즉시 기억은 비트가 아니라 청크 수로 제한되고, 묶어 다시 부호화(recoding)하면 더 많이 기억함. 절대 판단과 즉시 기억에 7이 함께 나오는 것은 "pernicious, Pythagorean coincidence"일 수 있다고 본인이 씀
- Nelson Cowan, 「The Magical Mystery Four」 (Current Directions in Psychological Science, 2010) — 초록(Europe PMC): 젊은 성인의 중심 기억 저장소는 의미 있는 항목 3–5개. PMC 본문은 봇 확인 화면에 막힘
- Jakob Nielsen, 「The End of Web Design」 (NN/g, 2000-07-22): "Users spend most of their time on other sites" — 그래서 다른 사이트와 같은 방식으로 동작하기를 원함. NN/g 영상 「Jakob's Law of Internet User Experience」 (2017-08-18)도 같은 요약
- Larry Tesler, 「The Law of Conservation of Complexity」 (nomodes.com, Tesler 본인 사이트): 원래 표현(1984년경) "Every application has an inherent amount of irreducible complexity. The only question is: Who will have to deal with it—the user, the application developer, or the platform developer?" 자세한 논의는 Saffer 인터뷰를 가리킴
- Kate Moran, 「The Aesthetic-Usability Effect」 (NN/g, 2024-02-03판, 2026-09-01 재검토): 보기 좋으면 작은 문제를 너그럽게 넘기고 테스트에서 문제를 가림. Kurosu & Kashimura 1995 — ATM 화면 26가지, 참가자 252명, 아름다움 평가가 실제 쓰기 쉬움보다 쓰기 쉬워 보임과 더 강하게 상관. 논문 제목 「Apparent usability vs. inherent usability」 (CHI '95 Conference Companion)은 Crossref 메타데이터로 확인
- Jakob Nielsen, 「Response Times: The 3 Important Limits」 (NN/g, 『Usability Engineering』 1993 5장 발췌): 0.1초 즉시 반응 · 1초 생각의 흐름 · 10초 주의
- Walter J. Doherty · Arvind J. Thadhani, 「The Economic Value of Rapid Response Time」 (IBM, 1982-11) — Jim Elliott 블로그에 옮긴 사본: 응답 3초 → 0.3초에서 시간당 처리 약 180 → 371건(+106%), "sub-second response"를 권함

### 고친 것 · 다르게 적은 것

- "도허티 임계값 400ms": Laws of UX는 이 보고서가 400ms를 요구 기준으로 정했다고 쓰지만, 확인한 사본에는 400ms라는 숫자가 없다(0.3초 · 1초 미만만 나옴). 사이트에는 숫자를 쓰지 않고 1초 미만과 실험 수치만 적고, 400ms는 확인하지 못한 수치라고 밝힘
- 공저자 이름이 사본 안에서 Thadani · Thadhani로 섞여 있어 본문 쪽(Arvind J. Thadhani)을 씀
- 밀러의 7 ± 2는 "메뉴 7개 제한" 근거로 쓰지 말라는 메모를 붙임(Laws of UX의 Takeaway와 같고, Miller 본인도 숫자에 거리를 둠)

### 직접 읽지 못함

- Kurosu & Kashimura 1995 논문 본문(ACM 403) — 실험 수치는 NN/g · Laws of UX 요약 기준
- Dan Saffer, 『Designing for Interaction』의 Tesler 인터뷰
- 1982년 IBM 보고서 원본 인쇄본 — 블로그 사본만 읽음

## 2026-11-01 — 6차: 비율과 간격 (간격 스케일 · 간격의 위계 · 부품/레이아웃 간격 · 수직 리듬 · 8pt 그리드 · 황금비)

### 원문을 읽고 확인

- IBM Carbon, Spacing (carbondesignsystem.com, 2026-09-30 갱신판): 스케일은 2 · 4 · 8의 배수, 토큰 $spacing-01–13 = 2 · 4 · 8 · 12 · 16 · 24 · 32 · 40 · 48 · 64 · 80 · 96 · 160px. 「Designing with space」 — 가까운 요소는 관련 있어 보이고 멀어질수록 약해짐, 주위 여백이 많은 요소가 더 중요해 보임(상위 제목일수록 여백 크게), 섹션 나누기에 선 대신 여백. FAQ — 스케일 밖 값은 되도록 피함, 토큰은 반응형이 아니지만 브레이크포인트에서 한두 단계 건너뛰어도 됨
- Atlassian Design System, Spacing: 8px 기본 단위, space.0–space.1000(0–80px). 「Spacing usage」 — Small 0–8px(아이콘–글자, 배지 · 아이콘 버튼 · 표 칸 안쪽, 입력칸 안쪽), Medium 12–24px(버튼 안쪽, 카드 속 요소 사이), Large 32–80px(페이지 구역 사이). 「Group by proximity」 「Create order and hierarchy」 「Introduce visual rhythm」 「Use optical adjustment」
- Adobe Spectrum, Spacing: layout spacing(컴포넌트 위)과 component spacing(컴포넌트 안) 두 갈래, 서로 다른 속도로 커짐. 근접성에 기댄다고 명시
- U.S. Web Design System, Spacing units: 8px 배수 토큰(작은 값 1 · 2 · 4 · 12px 등 추가)
- GitHub Primer, Size primitives: --base-size-2 … 128. 4px 간격이 이어지는 구간(28 · 32 · 36 · 40 · 44)이 있어 "인접 25%" 기준과는 맞지 않음 → 간격 스케일 refs에서 뺌
- W3C, CSS Rhythmic Sizing Module Level 1 (Working Draft, 2026-02-17) §1.1 Vertical Rhythms: 동아시아의 느슨한 수직 리듬(테두리 · 여백이 끼면 리듬을 밀어냄), block-step · line-height-step은 초안
- MDN, `<length>`: lh = 그 요소의 계산된 line-height, rlh = 루트 요소의 lh
- 유클리드 『원론』 6권 정의 3(외중비: 전체 : 긴 쪽 = 긴 쪽 : 짧은 쪽) · 명제 30 (D. E. Joyce 판, Clark University)
- 『Refactoring UI』 목차(refactoringui.com): 「Start with too much white space」 p.56, 「Establish a spacing and sizing system」 p.60, 「Avoid ambiguous spacing」 p.83

### 고친 것

- 8pt 그리드: 출처를 "Material Design · Refactoring UI"에서 원문으로 확인한 Atlassian · USWDS · Carbon으로 바꾸고, Material 3 문서는 읽지 못했다고 적음
- 황금비: 의미를 『원론』의 정의(외중비)에 맞게 다시 쓰고 출처에 권 · 정의 번호를 붙임. "위 실험처럼"은 실험이 이 페이지로 옮겨지며 원리 목록에서는 맞지 않아 뺌
- 간격 스케일의 25% 기준: Carbon 스케일도 40→48, 80→96이 20%라 "어림"으로 적음

### 직접 읽지 못함

- 『Refactoring UI』 본문 — 유료 책이라 목차만 확인. "인접한 값은 25% 이상 차이"는 책 본문의 기준으로 알려져 있지만 문장을 대조하지 못했다
- Material Design 3 Spacing · Material 2 Spacing methods(4dp 기준선 격자) — 스크립트로 그려져 본문을 받지 못함
- 르 코르뷔지에 『Modulor』 — 원문을 보지 못함

## 2026-11-01 — 5차: 화면 구성 패턴 (목록 · 표 · 카드 · 캐러셀 · 아코디언 · 팝오버 · 사이드 시트)

### 원문을 읽고 확인

- Page Laubheimer, 「Cards: UI-Component Definition」 (NN/g, 2016-11-06): 카드는 둘러보기(browse)에 맞고 찾기(search)에는 목록보다 못함, 목록이 더 훑기 쉬움, 여러 항목 견주기에 나쁨(눈이 카드 사이를 오감)
- Page Laubheimer, 「Data Tables: Four Major User Tasks」 (NN/g, 2022-04-03): 찾기 · 견주기 · 한 줄 보기/고치기/더하기 · 행동하기 네 가지, 열 순서는 중요도순 · 관련 열은 붙여서
- Amy Schade, 「Mobile Tables: Comparisons and Other Data Tables」 (NN/g, 2017-09-17): 머리글 고정, 볼 데이터 고르게
- Kara Pernice, 「Designing Effective Carousels」 (NN/g, 2013-09-14, 현재 제목 「Carousel Usability: Effective UI for Content Overload」): 5장 이하, 사람들이 자주 지나침, 다음 장을 살짝 보이게
- Jakob Nielsen, 「Auto-Forwarding Carousels and Accordions Annoy Users and Reduce Visibility」 (NN/g, 2013-01-20)
- Huei-Hsin Wang, 「Accordions on Desktop: When and How to Use」 (NN/g, 2023-07-30): 보기 쉬움을 줄이고 조작 비용을 늘림, 여러 칸을 열어야 하면 피함, 모두 펼치기 · 인쇄
- W3C WAI-ARIA APG Carousel: 자동 회전이면 멈춤 버튼, 키보드 포커스가 들어오면 멈추고 다시 시작하지 않음, 마우스를 올리면 멈춤
- W3C WAI-ARIA APG Accordion: 머리 버튼에 aria-expanded, aria-controls
- MDN popover 전역 속성: popover="auto"는 바깥 누르기 · Esc로 닫힘(light dismiss), 다른 auto 팝오버를 닫음

### 직접 읽지 못함

- Material Design 3 Lists · Side sheets, Apple HIG Popovers — 페이지가 스크립트로 그려져 본문을 받지 못했다. 이름(standard · modal side sheet 등)만 쓰고 수치는 인용하지 않았다.

## 2026-11-01 — 4차: WCAG 2.2 성공 기준 (사용성과 접근성)

W3C 권고안 원문 https://www.w3.org/TR/WCAG22/ (W3C Recommendation 12 December 2024판)을 내려받아 해당 성공 기준의 문장과 수준을 대조했다.

### 원문을 읽고 확인 — 맞음

- 1.1.1 Non-text Content (A) · 1.4.1 Use of Color (A) · 2.4.3 Focus Order (A) · 2.2.2 Pause, Stop, Hide (A, 저절로 시작해 5초 넘게 다른 내용과 함께 움직이면 멈출 수단)
- 1.4.3 Contrast (Minimum) (AA): 4.5:1, 큰 글자 3:1. 큰 글자 정의 18pt 또는 굵은 14pt(= 24px · 18.66px)
- 1.4.10 Reflow (AA): 세로 스크롤 콘텐츠는 폭 320 CSS px, 가로 스크롤 콘텐츠는 높이 256 CSS px. 320px = 1280px의 400% 확대
- 1.4.11 Non-text Contrast (AA): UI 컴포넌트 · 그래픽 3:1, 비활성 컴포넌트와 브라우저 기본 모양은 예외
- 1.4.8 Visual Presentation (AAA): 80자, CJK 40자
- 2.4.7 Focus Visible (AA)
- 2.4.11 Focus Not Obscured (Minimum) (AA, New): 포커스 받은 컴포넌트가 작성자 콘텐츠에 "전부" 가려지지 않을 것
- 2.4.13 Focus Appearance (AAA, New): 2 CSS px 두께 둘레만큼의 면적, 포커스 전후 같은 픽셀 대비 3:1
- 2.3.3 Animation from Interactions (AAA)
- 2.5.7 Dragging Movements (AA, New)
- 2.5.8 Target Size (Minimum) (AA, New): 24 × 24 CSS px. 간격 예외 — 작은 목표마다 중심에 지름 24px 원을 그려 다른 목표나 다른 작은 목표의 원과 겹치지 않으면 통과. 그 밖에 Equivalent · Inline · User Agent Control · Essential 예외
- 2.5.5 Target Size (Enhanced) (AAA): 44 × 44 CSS px
- 2.2에서 새로 생긴 기준(3.2.6 · 3.3.7 · 3.3.8 · 3.3.9 · 2.4.12 포함)과 4.1.1 Parsing 삭제("Obsolete and removed")
- AAA를 전체 목표로 요구하지 말라는 문장("It is not recommended that Level AAA conformance be required...")

### 고친 것

- 터치 영역 note의 Inline 예외를 "줄 길이 안의 링크"에서 "크기가 글줄 높이에 묶인 문장 속 목표"로 바로잡음(원문: constrained by the line-height of non-target text)
- 터치 영역 출처에 2.5.5 (AAA, 44px)를 더함. 리플로 공식에 높이 256px를 더함

### 함께 확인

- MDN prefers-reduced-motion: `reduce`는 기기에서 움직임 줄이기를 켰다는 뜻, `@media (prefers-reduced-motion)`과 같음
- W3C WAI Images Tutorial — Decorative Images: 장식 이미지는 alt=""

## 2026-11-01 — 3차: Material 3 토큰 값 · 스낵바 시간 · 클레이모피즘 이름

m3.material.io는 스크립트로 그려져 직접 못 읽으므로, Google이 공개한 구현 저장소의 소스에서 값을 확인했다.

### 원문(소스)을 읽고 확인

- M3 motion 토큰 — material-components/material-web `tokens/versions/v0_192/_md-sys-motion.scss` (자동 생성 파일, "Design system version: v0.192", Apache-2.0, 2026-10-29 커밋 기준):
  - duration: short1–4 = 50 · 100 · 150 · 200ms, medium1–4 = 250 · 300 · 350 · 400ms, long1–4 = 450 · 500 · 550 · 600ms, extra-long1–4 = 700 · 800 · 900 · 1000ms
  - easing: standard (0.2, 0, 0, 1), standard-decelerate (0, 0, 0, 1), standard-accelerate (0.3, 0, 1, 1), emphasized (0.2, 0, 0, 1), emphasized-decelerate (0.05, 0.7, 0.1, 1), emphasized-accelerate (0.3, 0, 0.8, 0.15), legacy (0.4, 0, 0.2, 1), linear (0, 0, 1, 1)
  - emphasized는 원래 경로(path) 곡선인데 CSS로는 standard와 같은 값으로 들어가 있음("motion_path is not supported")
- M3 창 크기 구간 — androidx `window/window-core/.../WindowSizeClass.kt`: WIDTH_DP_MEDIUM_LOWER_BOUND = 600, WIDTH_DP_EXPANDED_LOWER_BOUND = 840 (그 위로 EXTRA_LARGE 1600도 있음)
- M3 Navigation bar 목적지 수 — material-components-android `docs/components/BottomNavigation.md`: "Navigation bars can have three to five destinations"
- 스낵바 시간:
  - material-components-web `packages/mdc-snackbar/constants.ts` · `foundation.ts`: 자동으로 닫히는 시간은 4000–10000ms만 허용(범위 밖이면 오류), 기본 5000ms, 닫지 않음(-1)도 가능
  - androidx Compose Material3 `SnackbarHost.kt`: Short = 4000ms, Long = 10000ms, Indefinite. 접근성 서비스가 켜져 있으면 접근성 관리자가 시간을 조정
  - 반대로 material-components-android(View) `SnackbarManager.java`는 SHORT 1500ms · LONG 2750ms — 같은 Material이라도 구현마다 다름
  - → 사이트의 "4–10초"는 MDC Web의 허용 범위와 Compose M3의 두 값으로 출처를 바꿈. "호버하면 멈춤"은 MDC Web 소스에 없음 → (어림)으로 표시
- 클레이모피즘: Michał Malewicz 「Claymorphism in User Interfaces」 (Hype4 Academy) 원문을 읽음. 두 겹 안쪽 그림자(위 왼쪽 밝게 · 아래 오른쪽 어둡게) + 큰 바깥 그림자, 크게 둥근 모서리. 원문은 이 이름을 자기가 지었다고 말하지 않음(스스로는 "fluffy 3d"라 부르고, 뉴모피즘 · 글래스모피즘 등을 만드는 데 참여했다고만 씀). Smashing Magazine 「Claymorphism: Will It Stick Around?」 (Adrian Bece, 2022-03-16)는 "이 용어는 Michal Malewicz가 지었다"고 씀

### 확인 못 한 것

- 클레이모피즘 원문의 게시 날짜(페이지에 날짜 없음, 웨이백 조회는 이 환경에서 막힘). "2021년"은 2차 자료에만 있음
- 처음 이 이름을 쓴 사람: 원문과 2차 자료가 엇갈려 확정하지 않음
- m3.material.io 문서 본문 자체(용도 설명 · 권장 문구)는 여전히 직접 읽지 못함. 위 값은 구현 소스 기준
- 3D 아이콘이라는 스타일 이름의 기원

## 2026-11-01 — 랜딩 페이지 양식에 단 출처

### 원문을 읽고 확인

- NN/g 「Top 10 Guidelines for Homepage Usability」 (Jakob Nielsen, 2002-05-11): #1 하는 일을 한 문장 표어로, #2 창 제목은 회사 이름으로 시작 · "Welcome to"로 시작하지 않기, #4 주요 작업 1–4개에 시작점, #6 "Specifics beat abstractions", #9 과한 꾸밈은 광고로 여겨짐, #10 꾸밈용 스톡 대신 실제 사람 사진
- NN/g 「Photos as Web Content」 (Nielsen, 2010-10-31): 일반 인물 스톡 사진은 무시되고 실제 직원 · 제품 사진은 오래 봄
- NN/g 「Scrolling and Attention」 (Therese Fessenden, 2018-04-15): 120명 · 1920×1080, 첫 화면 57%(2010년 80%), 처음 두 화면 74%, 세 화면 81%. 중요한 내용과 주 행동은 위에, 거짓 바닥 피하기
- NN/g 「Auto-Forwarding Carousels and Accordions Annoy Users and Reduce Visibility」 (Nielsen, 2013-01-19): 사용자가 원할 때만 다음 패널. 멈춤 버튼이나 시간 기준은 이 글에 없음
- GOV.UK Design System · Start using a service: 무엇을 하는지 · 누구를 위한지, 필요한 것, 비용과 대략 걸리는 시간, 시작 버튼 하나, 둘째 행동은 버튼 대신 링크, 복잡한 자격 조건은 시작 페이지에 두지 않기
- GOV.UK Design System · Button: 주 버튼은 페이지의 주 행동에, 주 버튼 여러 개 피하기, 버튼 글자는 하는 일을 말하게
- WCAG 2.2 · 2.2.2 Pause, Stop, Hide: 저절로 시작해 5초 넘게 움직이고 다른 내용과 함께 보이면 멈춤 · 정지 · 숨김 수단. Understanding 문서는 캐러셀을 직접 말하지 않음 — 캐러셀은 "움직이는 내용"으로 적용
- WCAG 2.2 · 1.4.2 Audio Control: 3초 넘는 자동 재생 소리는 멈춤 또는 따로 음량 조절. Intent는 자동 재생 자체를 권하지 않음

### 확인 못 한 것 · 어림값

- 랜딩 페이지 전용 전환율 연구(마케팅 회사 글)는 확인할 수 있는 원자료가 없어 쓰지 않음
- "하는 일 1–4개"는 NN/g의 주요 작업 개수를 빌린 것으로, 기능 소개 칸 수를 정한 출처는 없음
- 스크롤 숫자는 데스크톱 조사라 휴대폰에는 그대로 옮기지 않음

## 2026-11-01 — 글 본문 양식 · 한글 본문 한 줄 글자 수

### 원문을 읽고 확인

- WCAG 2.2 1.4.8 Visual Presentation (AAA) · Understanding 1.4.8: 폭 80자 이하(CJK 40자), 양쪽 정렬 안 함, 문단 안 행간 1.5 이상, 문단 간격은 행간의 1.5배 이상. CJK 글자가 같은 읽기 편함에서 비CJK 글자의 약 두 배 폭이라 절반으로 잡는다고 설명. CJK = 중국어 · 일본어 · 한국어
- 신종현 · 박민용, 「읽기 형태, 줄 길이, 줄 간격이 한글 웹 문서의 가독성에 미치는 영향」, 대한산업공학회지 29권 3호 197–205쪽 (2003-09), koreascience PDF 본문: 18명, 굴림 12pt, 17인치 1024×768, 줄 길이 10 · 30 · 50cpl, 줄 간격 50 · 100 · 200%(줄 사이 빈 공간 0.5 · 1 · 2줄). 읽기 속도는 50cpl · 100%에서 가장 빠름, 30과 50cpl은 차이가 크지 않고 10cpl보다 빠름 → "최소 30cpl 이상". 주관적 선호는 30cpl이 가장 높았으나 50cpl과 차이 작음
- WCAG 2.2 Understanding 1.4.10 Reflow: 목록과 코드 블록은 들여쓰기가 뜻을 가져, 그 뜻이 사라지는 경우 기준이 적용되지 않음
- W3C WAI 「Headings」 튜토리얼: 같거나 높은 단계의 제목이 새 구획을 연다, 단계 건너뛰기는 가능하면 피함(하위 구획을 닫을 때는 괜찮음). "h1은 하나"라는 말은 없음 — 규칙에서 h1 하나는 예시 구성으로만 둠
- WHATWG HTML: 인용의 출처는 blockquote 밖에 둔다(must). figcaption은 figure의 캡션. pre는 코드와 함께 code를 쓰라고 권함. 캡션이 alt를 대신한다는 말은 없고, 예시는 alt와 figcaption을 함께 씀
- W3C CSS Text Module Level 3 (word-break): 한국어 줄바꿈은 두 방식 — 음절 사이 아무 데서나(normal), 영어처럼 주로 띄어쓰기에서(keep-all)
- WCAG Failure F73: 링크는 밑줄 등 색이 아닌 표시가 필요, 또는 주변 글자와 명도 대비 3:1 이상 + 포커스 · 포인터 시 추가 표시
- GOV.UK Design System · Lists: 순서가 중요하면 번호 목록, 글머리표 목록은 이끄는 문장으로 시작
- NN/g 「How Users Read on the Web」 (Jakob Nielsen, 1997): 79%가 훑어 읽고 16%가 한 단어씩 읽음. 강조된 핵심어, 내용을 말하는 소제목, 글머리표, 문단 하나에 생각 하나, 역피라미드, 글자 수 절반

### 일부만 확인

- W3C 「Requirements for Hangul Text Layout and Typography」 (klreq, 2026-03-21 Group Note 초안): 행간 방식 네 가지와 줄 폭을 다루지만 권장 숫자 없음
- 이수정 · 정우현 · 정찬섭 「글자꼴, 글줄길이, 글줄모양과 한글의 가독성」 (1993, 한글 및 한국어 정보처리 학술발표 논문집 193–205쪽): DBpia에서 서지만 확인, 초록 · 본문을 못 읽어 사이트에 쓰지 않음. 검색 요약에 "글줄 길이 영향이 상대적으로 작았다"는 말이 돌지만 원문 대조 안 됨

### 확인 못 한 것 · 어림값

- 한글 본문 "30–40자"를 직접 권하는 출처는 찾지 못함. WCAG 상한(40)과 신종현 · 박민용의 하한 쪽 결과(30)를 겹친 범위로만 적음
- 미리보기의 본문 폭 36em, 본문 크기 17px, 행간 1.75는 출처 없는 어림값
- 2003년 실험의 "줄 간격 100%"를 CSS line-height 값으로 바꾸는 것은 글자 크기 정의(굴림 12pt의 em 상자)에 따라 달라 하지 않음

## 2026-11-01 — 대시보드 양식에 단 출처

### 원문을 읽고 확인

- NN/g 「Dashboards: Making Charts and Graphs Easier to Understand」 (Page Laubheimer, 2017-06-18): 한눈에 보고 행동하는 한 화면, 길이 · 2D 위치가 양 비교에 가장 정확, 파이 · 도넛 · 게이지 · 레이더 · 3D 피하기, 게이지 대신 불릿 차트, 색으로 양을 나타내지 않기. 항목 개수는 정하지 않음
- UK Analysis Function 「Data visualisation: charts」: 막대는 0에서 시작, 선은 4개까지, 범례보다 직접 라벨, 제목은 결론 · 부제는 데이터와 기간, 격자선 10개 안쪽, 색에만 기대지 않기, 데이터 표 · 내려받기 제공, 파이는 5개 이하 · 의미 있는 전체 · 두드러진 범주일 때만
- WCAG 2.2 Understanding 1.4.11 Non-text Contrast: 그래프의 선 · 막대는 배경과 3:1, 같은 정보를 글이나 표로 주면 예외

### 확인 못 한 것

- Stephen Few 『Information Dashboard Design』(2006)의 정의: 책을 직접 보지 않아서 출처로 달지 않고 메모에만 적음

## 2026-11-01 — 설정 양식에 단 출처

### 원문을 읽고 확인

- Apple HIG Settings: 설정은 적게 두고 기본값을 잘 정하기, 작업 중에 바꾸는 옵션은 그 화면에, 기기 전체 설정을 앱 안에 따로 만들지 않기
- Apple HIG Dark Mode: 앱 전용 화면 모드 설정 피하기
- Apple HIG Toggles: 상태를 색만으로 구분하지 않기, iOS에서 스위치는 목록 행 안에서만
- Apple HIG Alerts: 드물고 되돌릴 수 없는 파괴적 행동에만 알림창 띄우기, 제목은 상황을 구체적으로, 버튼은 결과를 말하는 동사, 취소는 "Cancel"
- NN/g 「Toggle-Switch Guidelines」 (Alita Kendrick, 2018): 즉시 적용, 저장 버튼이 필요한 칸과 섞지 않기, 라벨은 켰을 때 하는 일, 상태 표시
- Apple App Store Review Guidelines 5.1.1(v): 가입이 되는 앱은 앱 안에서 계정 삭제도 제공

### 일부만 확인

- 정보통신망법 제50조 제2항 · 제5항 · 제7항: IT위키에 옮겨 둔 조문으로 확인. 국가법령정보센터 원문과는 대조하지 못함. 시행령의 14일 처리 통지와 2년마다 동의 확인은 해설 글에서만 봐서 사이트에 넣지 않음

## 2026-11-01 — 회원가입 양식에 단 출처

### 원문을 읽고 확인

- GOV.UK Design System · Create accounts: "계정 만들기" · "비밀번호 만들기"처럼 새로 만든다는 말 쓰기, 가입 화면에 다른 내용 두지 않기, 같은 정보 두 번 묻지 않기, CAPTCHA 쓰지 않기
- GOV.UK Design System · Password input: 가입은 autocomplete="new-password", 비밀번호 확인 칸은 필요 없음(보기 토글로 대신), 조건은 분명하고 어디서나 같게
- GOV.UK Design System · Ask users for passwords: 최소 8자 이상, 최대 길이 두지 않기, 흔한 비밀번호 막기, 붙여넣기 허용
- NIST SP 800-63B-4 §3.1.1 (2025): 조합 규칙 금지, 금지 목록 대조 후 거절하면 이유 알리기, 비밀번호만으로 로그인하면 최소 15자 · 다른 인증과 함께면 8자, 최대 64자 이상 허용, 비밀번호 관리자 · 자동 입력 허용(SHALL), 붙여넣기 · 보기 허용(SHOULD)

### 일부만 확인

- 개인정보 보호법 제22조 제1항(제7호 홍보 · 판매 권유 동의는 구분) · 제5항(선택 동의 거부를 이유로 서비스 거부 금지): IT위키에 옮겨 둔 조문으로 확인. 국가법령정보센터 원문과는 대조하지 못함
- WCAG 3.3.8은 AA 수준에서 그림(사물) 알아보기를 예외로 둔다. 그래서 CAPTCHA 규칙의 출처에서는 빼고 GOV.UK만 남김

## 2026-11-01 — 2차 (1차에서 못 한 것 + 그 뒤에 단 출처)

방법: Apple HIG는 페이지의 JSON(developer.apple.com/tutorials/data/design/human-interface-guidelines/<page>.json)으로 본문을 읽었다. 나머지는 원문 페이지 · 서지 기록과 대조.

### 고친 것

| 어디 | 전 | 후 | 근거 |
|---|---|---|---|
| 터치 영역 | iOS ≥ 44pt | 기본 44pt · 최소 28pt, 웹 최소 24px 추가 | Apple HIG Accessibility 표, WCAG 2.5.8 |
| 피츠의 법칙 | 식을 Fitts(1954)로만 표기 | log₂(1 + D/W)는 MacKenzie(1992)의 Shannon 형식, Fitts 원식은 log₂(2D/W) | MacKenzie 논문 · 정리 |
| 탭 바 규칙 | 목적지 3–5곳 (Apple HIG) | HIG는 숫자 대신 "적을수록 쉽다", 사용자 편집 탭은 "다섯 개 이하", 라벨 함께 | Apple HIG Tab bars |
| 토스트 | 2–4초 뒤 자동 (Carbon) | Carbon v10 기준 5초 | Carbon v10 Notification usage |
| 스프링 | Apple HIG Motion | HIG Motion에는 스프링 언급 없음 → SwiftUI spring API만 | Apple HIG Motion |
| 손실 회피 | 메타분석 약 1.7–2 | 2024 메타분석 평균 1.955 (150편 · 607개), 2025 재분석은 견고성에 의문 | Brown 외 (JEL 2024) 초록 |
| 리퀴드 글래스 | HIG 본문 미확인 | 컨트롤 · 내비게이션 층에, 내용 층엔 쓰지 않음, 아껴서, 밝은 배경엔 35% 어두운 막 | Apple HIG Materials |
| 입력 개수 | 체크박스 10개 안쪽 · 라디오 2–5 · 드롭다운 7개 이상 | 출처에 없는 숫자라 "(어림)" 표시 | — |

### 맞는 것으로 확인

- Apple HIG Gestures: 제스처 말고 다른 길도 두기, 지름길 제스처는 보조로(뒤로 버튼 예시), 시스템 제스처와 겹치지 않기 — 제스처 페이지 규칙과 일치
- Apple HIG Motion: 목적 있는 움직임, 짧고 정확하게, 움직임을 선택 사항으로 — 움직임 규칙과 일치
- Redelmeier & Kahneman, 「Patients' Memories of Painful Medical Treatments」 (Pain 66, 1996)
- NN/g: Glassmorphism (Megan Brown, 2024) · Neobrutalism (Hayat Sheikh, 2025) · Flat Design (Kate Moran, 2015) · Placeholders in Form Fields Are Harmful (Katie Sherwin)
- Michal Malewicz, Neumorphism in user interfaces (UX Collective, 2019-12), Apple Liquid Glass 발표 (WWDC 2025-06-09)
- 서체 12개의 라이선스(SIL OFL)와 만든 곳
- Ottosson Oklab (2020), Tim Brown 「More Meaningful Typography」 (A List Apart, 모듈러 스케일)

### 아직 확인 못 한 것

- ~~스낵바 4–10초~~ → 3차에서 MDC Web · Compose 소스로 확인
- ~~Material 3 Navigation bar의 목적지 수(3–5), M3 easing · duration 토큰 값~~ → 3차에서 공개 저장소 소스로 확인
- 클레이모피즘 · 3D 아이콘이라는 이름을 처음 쓴 곳 → 3차: 클레이모피즘은 널리 알린 글만 확인, 처음 쓴 사람은 미확정
- 60-30-10의 기원 ("인테리어 디자인 관례"로만 표기)
- 고전 서적의 쪽수 단위 인용(Bringhurst 45–75자 · 66자, Itten 12색상환)은 책을 직접 보지 않음 — 널리 인용되는 내용

## 2026-11-01 — 1차 (출처 약 130개 중 확인이 필요한 것 위주)

방법: 웹 검색과 원문 페이지·PDF로 제목 · 저자 · 연도 · 인용한 숫자를 대조했다. 디자인 시스템 문서(Apple HIG, Material 3, GOV.UK, Carbon)와 WCAG 성공 기준 이름은 이름이 실제로 있는지만 봤고, 본문 문장까지 대조하지는 않았다.

### 고친 것

| 어디 | 전 | 후 | 근거 |
|---|---|---|---|
| 내비게이션 규칙 · 드로어 | Kim Flaherty, 「Hamburger Menus…」 | Kara Pernice · Raluca Budiu (NN/g, 2016) | nngroup.com 기사 본문의 저자 |
| 당겨서 새로고침 | Tweetie (2008) | Tweetie 2 (2009) | 2009년 9월 Tweetie 2에서 처음 나옴 |
| 다크 패턴 규제 표 | 전자상거래법 다섯 유형 | 여섯 유형 · 조항 번호 · 시행일(2025-02-14) | 공정위 개정 내용 보도 · 문답서 |
| 자이가르닉 효과 | 끝내지 않은 일을 더 잘 기억 | 다시 이어 하려는 경향(오브시안키나)만 확인, 기억 우위는 확인 안 됨 | Ghibellini & Meier 메타분석 (2025) |
| 선택 과부하 | 조건에 따라 효과가 없기도 | 평균 효과 0에 가까움, 조건에 따라 다름 | Scheibehenne 외 (2010) 초록 |
| 손실 회피 | λ ≈ 2 | 처음 추정 2.25(25명의 가상 선택), 뒤 메타분석은 약 1.7–2 | Tversky & Kahneman (1992), Brown 외 (2024) |
| NN/g 제목 | Breadcrumbs: 11 Design Guidelines | …for Desktop and Mobile | NN/g 목록 |
| NN/g 제목 | Infinite Scrolling Is Not for Every Website | Infinite Scrolling: When to Use It, When to Avoid It | NN/g 목록(제목이 바뀜) |
| NN/g 제목 | Designing Empty States in Complex Applications | …: 3 Guidelines (Kate Kaplan, 2021) | NN/g 영상 페이지 |
| NN/g 제목 | Error Message Guidelines | Error-Message Guidelines | NN/g 목록 |

### 맞는 것으로 확인

- Amershi 외, 「Guidelines for Human-AI Interaction」 (CHI 2019): G1 · G2 · G8 · G9 · G11 · G13 · G15 · G16 번호와 내용 (논문 표 1)
- deceptive.design 유형 이름 10개 (Hard to cancel · Preselection · Fake urgency · Confirmshaming · Sneaking · Fake scarcity · Fake social proof · Hidden costs · Hidden subscription · Nagging)
- Mathur 외 (CSCW 2019): 약 1만 1천 곳, 1,818건, 1,254곳
- Gray 외 (CHI 2018), FTC 「Bringing Dark Patterns to Light」 (2022년 9월), EU DSA 제25조, GDPR 전문 32항, Planet49 (C-673/17, 2019-10-01)
- NN/g: Executing UX Animations (Page Laubheimer, 2020, 100–500ms) · Progress Indicators Make a Slow System Less Insufferable · Skeleton Screens 101 · Sticky Headers · Toggle-Switch Guidelines · Placeholders in Form Fields Are Harmful · Checkboxes vs. Radio Buttons (2004) · How Users Read on the Web (1997)
- José M. Pérez 「How Medium does progressive image loading」 (2015-10-19)
- Kahneman 외 (1993, 14°C 찬물 실험), Iyengar & Lepper (2000, 잼 24종 대 6종), Johnson & Goldstein (Science, 2003), Worchel 외 (JPSP, 1975)
- Matteo Penzo (UXmatters, 2006), Luke Wroblewski (A List Apart, 2009), Palmer (1992), Wertheimer (1923)

### 아직 확인 못 한 것

- ~~Material 3 easing · duration 토큰의 구체적인 값~~ → 3차에서 material-web 토큰 파일로 확인, 움직임 규칙 표 · ease-in · ease-out에 값 추가
- Apple HIG의 각 페이지 본문 (이름만 확인. Gestures는 지금 Inputs › Gestures 아래)
- Redelmeier & Kahneman (1996) 대장 내시경 연구의 서지
- 고전 서적(Fitts 1954, Hick 1952, Hyman 1953, Koffka 1935, Albers 1963, Itten, Müller-Brockmann 1981, Bringhurst, Cialdini 1984)은 널리 알려진 서지라 이번에 따로 대조하지 않음
