
**`JSX`** 는 **JavaScript를 확장한 문법**으로 JavaScript 파일을 HTML과 비슷하게 마크업을 작성할 수 있도록 해주며 **[[React Element]]를 생성**한다.

```jsx
const element = <h1 className="greeting">Hello, world!</h1>;
```


## JSX: JavaScript에 마크업 넣기

전통적으로 웹 개발자 HTML로 내용을, CSS로 디자인을, JavaScript로 로직을 작성해왔다. 내용은 HTML 안에서 마크업되고 페이지의 로직은 JavaScript 안에서 분리되어 있었다.

하지만 웹이 더 인터랙티브해지면서 로직이 내용을 결정하는 경우가 많아졌다. 그래서 JavaScript가 HTML을 담당하게 되었다. 이것이 바로 **React에서 렌더링 로직과 마크업이 같은 위치(컴포넌트)에 함께 있게 된 이유**이다.

React 컴포넌트는 React가 브라우저에 마크업을 렌더링할 수 있는 JavaScript 함수이며 마크업을 나타내기 위해 JSX라는 확장된 문법을 사용하는 것이다. JSX는 HTML과 비슷해 보이지만 조금 더 엄격하며 동적으로 정보를 표시할 수 있다.


## JSX의 규칙

### 1. 하나의 루트 엘리먼트로 반환하기

- 한 컴포넌트에서 여러 엘리먼트를 반환하려면 하나의 부모 태그로 감싸야 한다.
- 불필요한 `<div>`를 추가하고 싶지 않다면 `<> </>`로 대체할 수 있다. 이런 빈 태그를 [[Fragment]]라고 한다.

> 🤿 왜 여러 JSX 태그를 하나로 감싸줘야 할까?
> 
> JSX는 내부적으로 일반 JavaScript 객체로 변환되는데, 하나의 함수에서 두 객체를 배열로 래핑하지 않고는 반환할 수 없다. 이것이 바로 두 개의 JSX 태그를 또 다른 태그나 Fragment로 래핑하지 않고는 반환할 수 없는 이유를 설명한다.

### 2. 모든 태그는 닫아주기

- JSX에서는 태그를 명시적으로 닫아야 한다.

### 3. 대부분 camelCase 사용하기

- JSX에서 작성된 어트리뷰트는 JavaScript 객체의 키가 된다. 컴포넌트에서 이러한 어트리뷰트를 변수로 읽고 싶은 경우가 있지만 JavaScript는 변수명에 제한이 있다. 예를 들면 이름에 dash가 포함되거나 예약어(예: class)를 사용할 수 없다.
- React에서 HTML과 SVG의 어트리뷰트 대부분이 camelCase로 작성되는 이유이다. 예를 들면, `stroke-width` 대신 `strokeWidth`로 사용한다. `class`는 예약어이기 때문에 React에서는 [DOM의 프로퍼티](https://developer.mozilla.org/en-US/docs/Web/API/Element/className)의 이름을 따서 `className`으로 대신 작성한다.
- 모든 어트리뷰트는 https://ko.react.dev/reference/react-dom/components/common 여기서 찾을 수 있다.

> ⚠️ 역사적인 이유로 `aria-*`와 `data-*`의 어트리뷰트는 HTML에서와 동일하기 dash를 사용하여 작성한다.


## JSX 변환

JSX는 브라우저가 이해할 수 없는 문법이다. 따라서 JSX 문법을 사용하려면 **Babel이나 TypeScript 같은 컴파일러**를 이용해 JSX를 **브라우저가 이해할 수 있는 순수한 자바스크립트 코드로 변환**해주어야 한다.

### React17 이전

JSX가 `React.createElement()`를 호출하는 코드로 컴파일된다. [컴파일 해보기](https://babeljs.io/repl/#?browsers=defaults%2C%20not%20ie%2011%2C%20not%20ie_mob%2011&build=&builtIns=false&corejs=3.21&spec=false&loose=false&code_lz=GYVwdgxgLglg9mABACQKYBt1wBQEpEDeAUIohAgM5SIAWAhmACbqoDC6MEA1ogLyJ4-APkIlSiOiwBOUbAHIA7nCnpGc3GIC-YqaiggpSbGNIAeAEYgoUBIgTtOXXgXpMWD7pqEQO3UwHpLawQhMQ1tIlBIWFsAQQAHeMFiUl19Q0RTNEw4RH8hAG4iTQKgA&debug=false&forceAllTransforms=false&shippedProposals=false&circleciRepo=&evaluate=false&fileSize=false&timeTravel=false&sourceType=module&lineWrap=true&presets=env%2Creact%2Cstage-2&prettier=false&targets=&version=7.20.12&externalPlugins=&assumptions=%7B%7D)

```js
// const element = createElement(type, props, ...children)

const element = React.createElement(
  "h1",
  { className: "greeting" },
  "Hello, world!"
);
```

하지만 이 방식은...

- JSX가 React의 메서드를 사용하여 컴파일되기 때문에 React가 스코프 내에 존재해야 한다.
- React.createElement가 허용하지 않는 몇 가지 [성능 개선과 단순화](https://github.com/reactjs/rfcs/blob/createlement-rfc/text/0000-create-element-changes.md#motivation)할 점이 있다.

### 새로운 변환 방식

위의 문제를 해결하기 위해 React17에서는 Babel과 TypeScript와 같은 컴파일러에서만 사용되도록 의도된 React 패키지에 두 개의 새로운 진입점을 도입했다.

새로운 변환 방식은 JSX를 `React.createElement`로 변환하는 대신 **새로운 진입점(`react/jsx-runtime`)에서 특수한 함수(`_jsx`)를 자동으로 import해서 호출**한다.

**빌드 시점에 Babel이 import문을 주입**하기 때문에 직접 import할 필요가 없다.

```jsx
// Inserted by a compiler (don't import it yourself!)
import { jsx as _jsx } from "react/jsx-runtime";

function App() {
  return _jsx("h1", { children: "Hello world" });
}
```

💡 더이상 JSX를 사용하기 위해 React를 import할 필요가 없어졌다.


## JSX 사용하기

- https://ko.reactjs.org/docs/jsx-in-depth.html


## Reference

- https://ko.reactjs.org/blog/2020/09/22/introducing-the-new-jsx-transform.html

- https://ko.reactjs.org/docs/jsx-in-depth.html

- https://ko.react.dev/learn/writing-markup-with-jsx
