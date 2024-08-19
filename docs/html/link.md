`<link>`는 현재 문서와 외부 리소스간의 관계를 명시하는 HTML element이다.

- 보통 stylesheets를 연결하는데에 사용
- 사이트 아이콘(파비콘, 홈 화면 아이콘 등등) 연결

외부 스타일시트를 연결하려면 `<head>`안에 포함한다.

```html
<link href="main.css" rel="stylesheet" />
```

- `href`에는 스타일시트의 경로를 제공한다.
- `rel`은 현재 문서와 리소스의 관계를 나타낸다.

파비콘 연결

```html
<link rel="icon" href="favicon.ico" />
<!-- 모바일 아이콘 -->
<link
  rel="apple-touch-icon-precomposed"
  sizes="114x114"
  href="apple-icon-114.png"
  type="image/png" />
```

- `size`는 아이콘 사이즈를 나타낸다.
- `type`은 리소스의 MIME type을 포함한다.

미디어 쿼리 제공 가능

```html
<link href="print.css" rel="stylesheet" media="print" />
<link
  href="mobile.css"
  rel="stylesheet"
  media="screen and (max-width: 600px)" />
```

preload

```html
<link
  rel="preload"
  href="myFont.woff2"
  as="font"
  type="font/woff2"
  crossorigin="anonymous" />
```

- 빨리 로딩하고 싶은 리소스를 명시할때 사용하는 값이다.
- 빨리 이용가능하게 하고 페이지 렌더를 차단할 가능성이 적다. → 성능 향상
- 이름에 load가 포함되지만 스크립트를 로드 및 실행하는 것은 아니고 더 높은 우선순위로 다운로드 및 캐시하도록 예약한다.
- 프리로드해두면 페이지 렌더링시 필요해지면 바로 사용 가능하다!

\<link>는 link type에 따라 \<body>에 존재하는 것이 가능하다. 하지만 좋은 방법은 아니다. \<link>는 바디 컨텐츠로부터 분리하여 \<head>에 두는 것이 좋다.