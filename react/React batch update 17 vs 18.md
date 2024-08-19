# batch update

> 여러 개의 state 업데이트를 각각 업데이트 하는 것이 아니라 일괄 업데이트(batch update)하여 한번의 리렌더링이 일어나도록 하는 것을 말한다.
> 

## batch update로 렌더링 횟수를 최소화한다.

다음과 같은 상황을 예로 들어보자.

```jsx
const clickHandler = () => {
	setName('');
	setAge(0);
}
```

setState 함수를 호출하였을 때 state가 바로 업데이트 된다면 컴포넌트의 렌더링이 2번 발생할 것이다. 이렇게 렌더링에 들어가는 비용을 줄이기 위해 React에서는 batch update를 수행한다.

React는 state 업데이트 작업은 큐에서 일괄적으로 처리한다. setState가 호출되면 state 변경 큐에 순차적으로 변경된 내역을 넣고 함수가 종료되면 일괄적으로 업데이트를 진행한 다음 변경된 내용을 렌더링한다.

## React 17에서의 배칭

```jsx
function App() {
  const [count, setCount] = useState(0);
  const [flag, setFlag] = useState(false);

  function handleClick() {
    setCount((c) => c + 1); // 아직 리렌더링 하지 않는다
    setFlag((f) => !f); // 아직 리렌더링 하지 않는다
    // React는 이 함수가 끝나면 리렌더링을 한다 (이것이 배칭이다!)
  }

  return (
    <div>
      <button onClick={handleClick}>Next</button>
      <h1 style=>{count}</h1>
    </div>
  );
}
```

하지만 **React17에서는 이벤트 핸들러내의 업데이트만 배칭을 수행**했다. Promise, setTimeout, native 이벤트 핸들러 등의 내부에서 발생하는 업데이트들은 배칭이 적용되지 않았다.

다음은 콜백에서 이벤트 핸들링이 완료된 이후에 state를 업데이트할 경우 배칭이 적용되지 않는 예시이다.

```jsx
function App() {
  const [count, setCount] = useState(0);
  const [flag, setFlag] = useState(false);

  function handleClick() {
    fetchSomething().then(() => {
      // React 17과 이전 버전에서는 이 업데이트들이
      // 이벤트가 *진행되는 중*이 아닌, *완료된 후의* 콜백에서 실행되기 때문에
      // 배칭되지 않았다.
      setCount((c) => c + 1); // 리렌더링을 발생시킨다.
      setFlag((f) => !f); // 리렌더링을 발생시킨다.
    });
  }

  return (
    <div>
      <button onClick={handleClick}>Next</button>
      <h1 style=>{count}</h1>
    </div>
  );
}
```

## React 18의 자동 배칭

React 18의 createRoot는 업데이트 발생 지점과 무관하게 배칭이 적용된다!

```jsx
ReactDOM.createRoot(rootElement).render(<App />);
```

아래의 예제들이 모두 동일하게 동작한다!

```jsx
function handleClick() {
  setCount((c) => c + 1);
  setFlag((f) => !f);
  // React는 이 함수가 끝날 때만 리렌더링을 한다 (배칭이다!)
}

setTimeout(() => {
  setCount((c) => c + 1);
  setFlag((f) => !f);
  // React는 이 함수가 끝날 때만 리렌더링을 한다 (배칭이다!)
}, 1000);

fetch(/*...*/).then(() => {
  setCount((c) => c + 1);
  setFlag((f) => !f);
  // React는 이 함수가 끝날 때만 리렌더링을 한다 (배칭이다!)
});

elm.addEventListener("click", () => {
  setCount((c) => c + 1);
  setFlag((f) => !f);
  // React는 이 함수가 끝날 때만 리렌더링을 한다 (배칭이다!)
});
```

배칭을 하고 싶지 않다면 `ReactDom.flushSync()`를 사용할 수 있다.