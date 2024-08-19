## CSS Variables

- `--*` prefix가 붙은 프로퍼티는 커스텀 프로퍼티를 의미한다.
- `var()` 함수를 통해 그 값을 사용할 수 있다.
- 커스텀 프로퍼티는 선언된 요소에 scoped된다.
- 커스텀 프로퍼티 이름은 case sensitive하다.

```css
:root {
  --first-color: #16f;
  --second-color: #ff7;
}

#firstParagraph {
  background-color: var(--first-color);
  color: var(--second-color);
}
```

https://developer.mozilla.org/en-US/docs/Web/CSS/--*