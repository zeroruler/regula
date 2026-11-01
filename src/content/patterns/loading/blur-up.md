---
name: "블러 업"
en: "Blur-up image"
category: "로딩"
wait: 4
use_when: "사진이 큰 피드·상세 화면. 아주 작은 흐린 미리보기를 먼저 깔고, 원본이 오면 바꿔 끼운다. 자리 크기는 처음부터 잡아 둔다."
avoid_when: "아이콘이나 작은 썸네일(그냥 빨리 불러온다), 흐린 미리보기만으로 내용을 잘못 읽을 수 있는 이미지(문서 스캔, 표)."
fits: "이미지 · 몇 초"
confused_with: "스켈레톤: 스켈레톤은 모양만, 블러 업은 색과 구도까지 미리 보여 준다. 둘 다 자리를 먼저 잡아 화면이 튀지 않게 한다"
source: "José M. Pérez 「How Medium does progressive image loading」 (2015) · web.dev 「Cumulative Layout Shift (CLS)」"
refs: []
mock: "<div class=\"blurm\"><i></i></div><div class=\"ln\" style=\"margin-top:10px\"></div><div class=\"ln\" style=\"width:60%\"></div>"
---
