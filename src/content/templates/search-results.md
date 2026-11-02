---
name: "검색 결과"
order: 16
kind: "페이지 양식"
concept: "검색한 사람이 지금 무엇을 몇 개 찾았는지 알고, 검색어를 고치거나 조건을 걸어 좁히고, 맞는 것이 없을 때도 다음 길을 찾는 화면. 결과가 주인공이고 필터는 곁에 둔다."
preview: "/previews/search-results/"
parts:
  - name: "검색창"
    note: "입력칸 + 검색 버튼. 방금 친 검색어를 그대로 남겨 바로 고칠 수 있게"
  - name: "결과 수 + 정렬"
    note: "\"'니트' 결과 24개\"처럼 검색어와 개수를 한 줄에. 지금 정렬 기준을 보여 준다"
  - name: "필터"
    note: "넓은 화면은 왼쪽 열, 좁은 화면은 \"필터\" 버튼으로 결과 위에 뜨는 판. 결과보다 덜 눈에 띄게"
  - name: "적용된 필터"
    note: "걸린 조건을 결과 바로 위에 × 와 \"모두 지우기\"로"
  - name: "결과 목록"
    note: "가장 알맞은 것부터. 이름 · 한 줄 설명 · 가격 같은 견줄 정보는 같은 자리에"
  - name: "페이지 넘김"
    note: "한 페이지뿐이면 숨긴다. 첫 페이지에선 \"이전\", 마지막 페이지에선 \"다음\"을 뺀다"
  - name: "결과 없음"
    note: "없다고 분명히, 검색어 그대로, 조건을 줄이거나 다른 길로"
    optional: true
states:
  - { key: "default", label: "기본" }
  - { key: "filtered", label: "필터 걸림" }
  - { key: "empty", label: "결과 없음" }
preview_note: "미리보기 안에서 필터를 걸고 풀거나 정렬을 바꿔 볼 수 있어요. 폭이 좁으면 필터가 \"필터\" 버튼 뒤의 판으로 바뀝니다. 상점 이름 · 상품 · 가격은 모두 예시예요."
see:
  - { label: "찾기와 거르기 (검색창 · 필터 · 정렬)", path: "patterns/search/" }
  - { label: "빈 상태 (결과 없음)", path: "patterns/states/" }
  - { label: "화면 구성 (목록 · 카드 · 표)", path: "patterns/layout/" }
  - { label: "내비게이션 (페이지 넘김 · 무한 스크롤)", path: "patterns/navigation/" }
  - { label: "사용성과 접근성 (포스텔의 법칙 · 상태 메시지)", path: "principles/usability/" }
rules:
  - text: "검색은 링크가 아니라 바로 칠 수 있는 입력칸으로 둔다. 돋보기 아이콘만 두면 검색을 찾기 어렵다."
    source: "Jakob Nielsen, 「Search: Visible and Simple」 (NN/g, 2001) · Katie Sherwin, 「The Magnifying-Glass Icon in Search Design」 (NN/g, 2014)"
  - text: "결과 화면의 검색창에도 원래 검색어를 그대로 남겨 바로 고칠 수 있게 한다. 결과가 없을 때 특히 필요하다."
    source: "Kathryn Whitenton, 「3 Guidelines for Search Engine \"No Results\" Pages」 (NN/g, 2014)"
  - text: "결과가 없으면 없다고 분명히 말하고, 검색어를 다시 보여 주고, 다음에 할 일(철자 확인 · 비슷한 검색어 · 조건 줄이기)을 주되 사용자를 탓하거나 놀리지 않는다."
    source: "Kathryn Whitenton, 「3 Guidelines for Search Engine \"No Results\" Pages」 (NN/g, 2014)"
  - text: "가장 알맞은 결과를 맨 위에 둔다. 웹 검색에서 사람들이 첫 페이지를 넘긴 건 검색의 2%뿐이었다."
    source: "Kate Moran · Cami Goray, 「Complex Search-Results Pages Change Search Behavior: The Pinball Pattern」 (NN/g, 2019)"
  - text: "필터는 결과보다 덜 눈에 띄게 둔다. 결과 페이지의 주된 일은 결과를 보는 것이라, 작은 컨트롤이면 결과를 가리지 않고 조건을 보고 바꿀 수 있다."
    source: "GOV.UK Design System · Radios (Smaller radios)"
  - text: "필터 카테고리와 값은 알맞고, 예측할 수 있고, 내부 용어 없이, 중요한 것부터 놓는다."
    source: "Kate Moran, 「Helpful Filter Categories and Values for Better UX」 (NN/g, 2018)"
  - text: "둘러보는 사용자에겐 고를 때마다 바로 적용하고, 조건이 분명하거나 응답이 느리면 모아서 한 번에 적용한다. 고르는 도중 화면을 위로 튕기지 않는다."
    source: "Katie Sherwin, 「User Intent Affects Filter Design」 (NN/g, 2016)"
  - text: "좁은 화면에서는 필터를 결과 위에 뜨는 판에 두어 뒤에서 결과가 바뀌는 게 보이게 하고, 전체 결과 수를 판 안에서도 늘 보여 준다."
    source: "Kathryn Whitenton, 「Mobile Faceted Search with a Tray」 (NN/g, 2015)"
  - text: "걸린 조건은 결과 바로 위에 모아 하나씩 또는 한꺼번에 풀 수 있게 하고, 결과 수가 바뀌면 포커스를 옮기지 않고 화면 낭독기에 알린다."
    source: "WCAG 2.2 · 4.1.3 Status Messages (AA)"
  - text: "필터나 정렬은 지금 페이지가 아니라 전체 목록에 적용하고, 새 결과의 첫 페이지로 보낸다."
    source: "GOV.UK Design System · Pagination (Filtering and sorting)"
  - text: "페이지가 하나뿐이면 페이지 넘김을 보이지 않는다. 첫 페이지에선 \"이전\", 마지막 페이지에선 \"다음\" 링크를 뺀다."
    source: "GOV.UK Design System · Pagination"
  - text: "페이지 번호를 문서 제목(<title>)에도 넣는다(\"검색 결과 (2/4쪽)\"). 화면 낭독기 사용자가 페이지가 바뀐 것을 안다."
    source: "GOV.UK Design System · Pagination"
  - text: "끝에 닿으면 저절로 더 불러오는 무한 스크롤은 피한다. 키보드 사용자가 바닥글에 닿지 못한다."
    source: "GOV.UK Design System · Pagination (When not to use)"
  - text: "기본값(정렬 · 한 페이지 개수)은 대부분의 사람이 넘겨 볼 페이지 수를 줄이도록 정한다."
    source: "GOV.UK Design System · Pagination (Filtering and sorting)"
---

## 메모

- 「The Pinball Pattern」의 숫자(첫 페이지를 넘긴 검색 2%, 첫 자리가 받은 클릭 28%)는 구글 같은 웹 검색 엔진에서 잰 값이다. 사이트 안 검색에 그대로 옮길 수는 없어서 "가장 알맞은 것을 위에"라는 원리만 가져왔다.
- 「"No Results" Pages」는 웹 검색 엔진의 결과 없음 화면을 다룬 글이지만, 검색어를 남기고 다음 길을 주라는 원리는 사이트 검색에도 같다.
- GOV.UK의 무한 스크롤 이유("키보드 사용자에게 문제")는 원문 그대로다. "바닥글에 닿지 못한다"는 그 문제를 Regula가 풀어 쓴 예다.
- 정렬 기준을 몇 개 둘지, 한 페이지에 몇 개를 보일지 정한 출처는 찾지 못했다. 미리보기의 정렬 3개 · 한 페이지 6개는 예시다.
- 미리보기의 상점과 상품은 지어낸 예시다.
