https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/Cascade_and_inheritance

cascade와 specificity는 동일한 요소, 동일한 속성에 서로 다른 규칙을 적용할때 규칙 충돌을 제어하는 메커니즘

## Cascade

- css 규칙의 순서를 의미
- 동일한 cascade layer에서 같은 specificity를 갖는 두개의 규칙이 적용될 때 더 나중에 오는 규칙이 사용됨.

## Specificity

- 다른 selector이지만 같은 element에 적용되는 규칙이 여러개일때 브라우저가 어떤 규칙을 적용시킬지 결정하는 방법
- selector가 얼마나 구체적인지를 나타내는 기준. 예를 들면 element selector는 class selector보다 덜 구체적임.

```css
.main-heading {
  color: red;
}

h1 {
  color: blue;
}

/* 마지막 color 규칙은 blue 이지만 class selector가 더 높은 specificity를 가지므로 red가 적용된다. */
```

## inheritance

- 어떤 속성은 부모 요소의 속성 값을 상속한다. 안그런 것도 있음.
- 예를 들면 color, font-family는 상속 / width, margin, padding, border는 상속되지 않음

상속을 제어하기 위한 속성 값

- inherit : 부모 요소의 값을 상속
- initial : 해당 속성의 초기 값으로 지정
- revert : 브라우저의 기본 스타일
- revert-layer : 이전 cascade layer에서 설정한 값
- unset : 자연적인 값. 상속된 속성이면 inherit 처럼, 아니면 initial 처럼.

모든 속성 값 재설정

- 단축 속성 `all`을 통해 모든 속성에 상속 값을 적용할 수 있다.
- 스타일 변경을 시작하기 전에 스타일 변경 사항을 취소하는 편리한 방법

```css
blockquote {
  background-color: orange;
  border: 2px solid blue;
}

.fix-this {
  all: unset;
}
```