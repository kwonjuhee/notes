[Element.scrollIntoView() - Web APIs | MDN](https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollIntoView)

특정 요소 위치로 스크롤을 이동시킨다.

```jsx
element.scrollIntoView();
element.scrollIntoView(alignToTop); // Boolean parameter
/**
 true - 요소의 상단을 기준으로 스크롤 이동
 false - 요소의 하단을 기준으로 스크롤 이동
*/

element.scrollIntoView(scrollIntoViewOptions); // Object parameter
/**
 behavior - 전환 애니메이션 (auto / smooth)
 block - 수직 정렬 (start / center / end / nearest)
 inline - 수평 정렬 (start / center / end / nearest)
*/
```

⚠ React에서 사용시 요소가 아닌 컴포넌트에 사용하면 작동하지 않는다.
