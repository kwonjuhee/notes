https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/The_box_model

- 박스 모델이란 각 요소를 margin, border, padding, content로 구성된 box로 표현하는 개념
- 모든 요소는 박스로 구성되고 이를 기반으로 스타일링 및 배치된다.
- block box에 적용됨. inline box는 박스 모델에 정의된 동작 중 일부만 사용.

## box의 유형

박스는 크게 두 가지 유형(block, inline)이 있다. 이러한 특성은 페이지 flow 측면과 다른 박스와의 관계 측면에서 어떻게 동작하는지를 나타낸다.

### block
- box는 새 줄로 바뀌게 된다.
- width와 height 속성이 적용된다.
- padding, margin, border로 인해 다른 요소가 밀려난다.
- 만약 width가 지정되지 않은 경우 box는 컨테이너에서 사용가능한 공간을 채우기위해 inline 방향으로 확장된다. 대부분의 경우 box는 컨테이너만큼 넓어져 사용가능한 공간을 100% 채운다.

### inline
- box가 새 줄로 넘어가지 않는다.
- width와 height가 적용되지 않는다.
- top bottom padding, margin, border가 적용되지만 다른 inline box가 멀어지는 원인이 되지는 않는다.
- left right padding, margin, border가 적용되어 다른 inline box가 멀어지게 된다.

## display type

박스에는 outer, inner display type이 있으며, 이는 display 속성 값을 통해 변경할 수 있다.

- outer display type
	- block, inline, inline-block
- inner display type
	- 박스의 내부 요소가 배치되는 방법. 기본적으로 일반 flow(block or inline layout)를 따름.
	- flex, grid

> inline-block
> - box가 새줄로 넘어가지 않지만 (inline 특징)
> - width와 height 속성이 적용되고, padding, margin, border로 인해 다른 요소가 밀려난다.(block 특징)

## box의 구성

- content box : content가 표시되는 영역
- padding box : content와 border 사이의 영역으로 content를 둘러싼다.
- border box : content와 padding을 감싼다.
- margin box : 가장 바깥 영역 레이어로 content, padding, border를 감싼다.

## 표준 box model

- inline-size와 block-size (또는 width와 height)는 content box의 크기가 됨.
- 실제 크기는 padding과 border이 추가됨.
	- width + padding\*2 + border\*2
	- height + padding\*2 + border\*2

<img src="https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/The_box_model/standard-box-model.png" />

## 대체 box model

- width가표시되는 box의 width가 된다. content 영역의 너비가 width에서 padding과 border를 뺀 것임.
- `box-sizing: border-box`를 통해 대체 box model을 지정할 수 있다. 모든 요소에 적용하려면 html 선택자 설정해서 상속시키면 됨.

<img src="https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/The_box_model/alternate-box-model.png" />

