https://developer.mozilla.org/en-US/docs/Web/CSS/aspect-ratio

- element의 width-to-height 비율을 정의하는 속성
- 부모 컨테이너나 뷰포트 크기가 변경되더라도 브라우저는 element의 크기를 조정하여 명시된 width-to-height 비율을 유지한다.
- aspect-ratio가 적용되려면 box의 width 또는 height가 auto 이어야 한다.

```css
aspect-ratio: 1 / 1;
aspect-ratio: 1;

/* fallback to 'auto' for replaced elements */
aspect-ratio: auto 3/4;
aspect-ratio: 9/6 auto;

/* Global values */
aspect-ratio: inherit;
aspect-ratio: initial;
aspect-ratio: revert;
aspect-ratio: revert-layer;
aspect-ratio: unset;
```

- auto와 ratio를 모두 명시하는 경우 => replaced element (ex. `<img>`) 라면 컨텐츠가 로드될 때까지 주어진 ratio를 사용하고 로드된 후에는 auto value가 적용되어 컨텐츠 
- replaced element라면 컨텐츠가 로드될 때까지 주어진 ratio가 사용된다. 컨텐츠가 로드된 후에는 auto가 적용되어 컨텐츠 자의 비율 사용된다.

## aspect-ratio가 무시되는 상황

https://css-tricks.com/almanac/properties/a/aspect-ratio/#aa-its-ignored-in-some-situations

### width와 height가 둘 다 선언된 경우

- aspect-ratio 대신 width와 height가 사용된다.
- 둘 중 하나만 사용해야 함

### 콘텐츠가 비율을 벗어나는 경우

- 콘텐츠가 길어서 비율을 벗어나는 경우 요소가 확장된다.
- `min-height: 0`을 설정하면 요소가 확장되는 대신 콘텐츠가 오버플로우된다.

### min-\* 또는 max-\* w, h를 모두 선언하고 w, h를 이기는 경우

- width와 height가 모두 선언된 효과를 지니므로 aspect-ratio 대신 고정 크기가 사용된다.


## Use Cases

https://css-tricks.com/almanac/properties/a/aspect-ratio/#aa-use-cases

replaced element와 달리 non-replaced element는 고유의 aspect ratio가 없지만 그러한 동작이 필요할 때가 있다.

1. resposive iframes : 유튜브같은 다른 사이트로부터 비디오를 표시하기 위해 iframe을 임베드하는 경우
2. background image url
3. grid layout

```css
.grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
}

/** width가 scale되는 것에 따라 height가 동적으로 변경됨 */
.grid-item {
  aspect-ratio: 1 / 1;
}
```

auto-fill 메커니즘을 갖는 flexbox나 grid 레이아웃에서 아이템이 콘텐츠 사이즈나 부모 컨테이너의 사이즈에 의해 shrink되거나 grow되는 것을 막을 수 있다.
