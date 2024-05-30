## BEM

- CSS의 global scope, cascade, specificity 특성으로 인해 css를 추가 또는 수정할 때마다 의도치 않은 변화를 일으킬 위험이 있음
- 따라서 CSS를 체계적으로 작성하기 위한 방법론 등장

### `Block--Element--Modifier` 규칙

**Block**

- **그 자체로 의미가 있는 독립적인 요소**
- header, container, menu, checkbox, input 등

**Element**

- 독립적인 의미가 없고 **의미적으로(semantically)** 연결된 블럭의 일부
- menu item, list item, checkbox caption, header title 등

**Modifiers**

- 블럭 또는 요소의 flag로 **모양이나 동작**을 변경하는 데에 사용
- disabled, hightlighted, checked, fixed, size big, color yellow 등

### Example

```html
<button class="button">
  Normal button
</button>
<button class="button button--state-success">
  Success button
</button>
<button class="button button--state-danger">
  Danger button
</button>
```

```css
.button {
  display: inline-block;
  border-radius: 3px;
  padding: 7px 12px;
  border: 1px solid #D5D5D5;
  background-image: linear-gradient(#EEE, #DDD);
  font: 700 13px/18px Helvetica, arial;
}

.button--state-success {
  color: #FFF;
  background: #569E3D linear-gradient(#79D858, #569E3D) repeat-x;
  border-color: #4A993E;
}

.button--state-danger {
  color: #900;
}
```

### 장점

1. **모듈화 (Modularity)** : 스타일이 다른 요소에 의존적이지 않기 때문에 cascading, specificity로 인한 문제를 해결한다.
2. **재사용성 (Reusability)** : 독립적인 블럭을 합성해서 재사용할 수 있어 CSS 코드 양을 줄일 수 있다.
3. **구조 (Structure)** : CSS 코드를 쉽게 작성하고 이해할 수 있는 견고한 컨벤션을 제공한다.

https://getbem.com/introduction/
