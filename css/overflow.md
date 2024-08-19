## overflow 속성

overflow 속성은 컨테이너보다 내용이 더 길때 어떻게 보일지 선택하는 속성이다.

- visible (default)
- hidden : 부모 컨테이너의 범위를 넘어가는 부분은 보이지 않도록 처리
- scroll : 보이지 않는 부분을 스크롤로 확인하도록 한다. 스크롤바 항상 표시
- auto : 보이지 않는 부분을 스크롤로 확인하도록 한다. 내용이 넘칠 때만 스크롤바 표시

## scrollbar 숨기기

overflow 속성이 scroll이거나 auto이어야 한다.

```css
/* Hide scrollbar for Chrome, Safari and Opera */  
.example::-webkit-scrollbar {
  display: none;
}  
  
/* Hide scrollbar for IE, Edge and Firefox */  
.example {
  -ms-overflow-style: none;  /* IE and Edge */  
  scrollbar-width: none;  /* Firefox */
}
```

https://www.w3schools.com/howto/howto_css_hide_scrollbars.asp