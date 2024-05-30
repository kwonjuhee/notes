https://reactjs.org/docs/rendering-elements.html

React element는 React 앱의 가장 작은 단위를 말하며 **화면에 표시할 내용을 기술**한다.

```jsx
const element = <h1>Hello, world</h1>;
```

- 브라우저 DOM element와 달리 React element는 **일반 객체**이며 쉽게 생성할 수 있다.
- ReactDOM은 React element와 일치하도록 DOM을 업데이트한다.

> [!note] vs React Component
> 
> 리액트 컴포넌트는 페이지에 렌더링될 **리액트 엘리먼트를 반환하는 재사용 가능한 코드 조각**이다. 보통 리액트 엘리먼트는 직접 사용되지 않고 컴포넌트에서 리턴된다.
> 
> ```jsx
> function Welcome(props) {
>   return <h1>Hello, {props.name}</h1>;
> }
> ```
> 
>  https://reactjs.org/docs/glossary.html#components

## React Element 객체

- jsx 함수 https://github.com/facebook/react/blob/v16.12.0/packages/react/src/ReactElement.js#L173
- ReactElement https://github.com/facebook/react/blob/v16.12.0/packages/react/src/ReactElement.js#L111

```js
const ReactElement = function(type, key, ref, self, source, owner, props) {
  const element = {
    // This tag allows us to uniquely identify this as a React Element
    $$typeof: REACT_ELEMENT_TYPE,

    // Built-in properties that belong on the element
    type: type,
    key: key,
    ref: ref,
    props: props,

    // Record the component responsible for creating this element.
    _owner: owner,
  };

  // ...

  return element;
};
```

```jsx
// 주의: 다음 구조는 단순화되었습니다
const element = {
  type: "h1",
  props: {
    className: "greeting",
    children: "Hello, world!",
  },
};
```

## DOM에 엘리먼트 렌더링하기

React로 구현된 애플리케이션은 일반적으로 하나의 root DOM 노드가 있다. React 엘리먼트를 렌더링하기 위해서는 우선 root DOM 엘리먼트를 `ReactDOM.createRoot()`에 전달한 다음, React 엘리먼트를 `root.render()`에 전달해야 한다.

```jsx
const root = ReactDOM.createRoot(
  document.getElementById('root')
);
const element = <h1>Hello, world</h1>;
root.render(element);
```


## 렌더링된 엘리먼트 업데이트하기

이미 렌더링된 엘리먼트는 **불변 객체(immutable)** 이기 때문에, 엘리먼트를 생성한 이후에는 해당 엘리먼트의 children이나 attributes를 변경할 수 없다. 엘리먼트는 영화의 한 프레임처럼 특정 시점의 UI를 보여준다.

따라서 UI를 업데이트하는 유일한 방법은 **새로운 엘리먼트를 생성하고 이를 `root.render`에 다시 전달하는 것**이다.

```jsx
const root = ReactDOM.createRoot(
  document.getElementById('root')
);

function tick() {
  const element = (
    <div>
      <h1>Hello, world!</h1>
      <h2>It is {new Date().toLocaleTimeString()}.</h2>
    </div>
  );
  root.render(element);
}

setInterval(tick, 1000);
```

> ⚠️ 대부분의 React 앱은 실제로 `root.render()`를 한 번만 호출한다. 이러한 코드는 state를 갖는 컴포넌트에 캡슐화된다.


## 변경된 부분만 업데이트

ReactDOM은 해당 엘리먼트와 그 자식들을 이전과 비교하여 변경된 부분만 DOM에 업데이트한다.

위의 예제에서 전체 UI 트리를 나타내는 element를 매초 생성했지만 ReactDOM에 의해 내용이 변경된 텍스트 노드만 업데이트 된다.

![](https://reactjs.org/c158617ed7cc0eac8f58330e49e48224/granular-dom-updates.gif)

