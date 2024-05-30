- `position` 속성을 통해 **문서 상에 요소를 배치하는 방법**을 지정한다.

    | 속성 | 효과 |
    | --- | --- |
    | static | 기준 없음 (배치 불가능 / 기본값) |
    | relative | 자기 자신을 기준으로 배치 |
    | absolute | 부모(조상) 요소를 기준으로 배치 |
    | fixed | 뷰포트 기준으로 배치 |
    | sticky | 스크롤 영역 기준으로 배치 |
    
- `top` `bottom` `left` `right` 속성을 통해 **요소의 최종 위치**를 결정한다.

### position: relative

- 원래 위치를 기준으로 상대적으로 배치
- top, bottom, left, right 속성을 통해 원래 위치에서 상하좌우로부터 얼마나 떨어지게 할지를 지정할 수 있다.

### position: absolute

- **가장 가까운 위치에 있는 조상 요소를 기준**으로 배치
- DOM 트리를 따라 올라가다가 position 속성이 **static이 아닌 첫 번째 상위 요소를 기준**으로 한다.
- 조상 중 position을 가진 요소가 없다면 **\<body> 요소를 기준**으로 한다.
- 요소의 position을 absolute로 설정한다면 부모 요소의 position을 relative로 지정해준다.
- 문서상에서 독립되어 다른 요소와 더이상 상호작용하지 않는다.

### position: fixed

- viewport를 기준으로 한다. (화면에 붙어있게 된다)
- 요소를 일반적인 문서 흐름에서 제거한다.

### position: sticky

- 스크롤 영역을 기준으로 한다.

[CSS의 position 속성으로 HTML 요소 배치하기](https://www.daleseo.com/css-position/)