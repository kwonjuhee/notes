## hook 소개

- hook은 함수 컴포넌트에서 state와 생명주기 기능(lifecycle features)을 "연동(hook into)"할 수 있게 해주는 함수
- 클래스 컴포넌트 안에서는 동작하지 않는다.

## useState

```jsx
// "count"라는 새 상태 변수를 선언합니다
const [count, setCount] = useState(0);
```

- 함수 컴포넌트에 state를 추가한다. state는 컴포넌트가 리렌더링 되어도 유지된다.
- 클래스 컴포넌트의 this.state와의 차이
	- 이전 state와 새로운 state를 합치지 않음
	- 함수 컴포넌트는 this를 가질 수 없기 때문에 this.state를 할당하거나 읽을 수 없다.

## useEffect

> side effect란?
> - 컴퓨터 용어에서 side effect는 함수가 결과를 산출하는 데 있어서 결과에 영향을 미치지 않는 모든 것을 의미한다.
> - 컴포넌트가 산출하고자 하는 결과는 렌더링인데 렌더링 과정에서 side effect가 발생하면 안되기에 따로 분리하여 관리
> - 직접적으로 UI를 그리는 것외의 모든 일 (컴포넌트 안에서 데이터를 가져오거나 DOM을 직접 조작하는 작업 등)

```jsx
useEffect(() => {...}, [dependencies]);
```

- 클래스 컴포넌트의 `componentDidMount`, `componentDidupdate`, `componentWillUnmount`와 같은 목적으로 제공되지만 하나의 API로 통합된 것
- 기본적으로 첫 렌더링을 포함해서 렌더링 이후에 매번 effect를 실행한다.
- 의존성 배열을 전달하여 조건부 effect 실행
  - 의존성 배열의 값이 변경될 때만 effect 실행 (componentDidMount + componentDidupdate)
  - 빈 배열을 넘기면 컴포넌트가 마운트될 때 한 번만 실행 (componentDidMount)
- useEffect 내부에서 return을 통해 effect를 해제(clean-up)할 수 있다. (componentWillUnmount)
  - 컴포넌트가 언마운트되기 전에 수행된다.
  - 다음 effect가 실행되기 이전에 이전 effect가 정리된다.
- 의존성
  - 추가해야하는 것 : effect 함수 안에서 사용된 모든 변수
  - 추가하지 않아도 되는 것 : state 업데이트 함수, built-in 함수, 컴포넌트 밖에서 정의된 변수나 함수

## useRef hook

```jsx
const ref = useRef(null);
```

- 렌더링에 필요하지 않은 값을 참조할 수 있게 해준다.
- ref 객체는 전 생애주기동안 유지된다.
- ref.current를 통해 변경 가능하다. (mutable)
- 리렌더링 사이에 정보를 저장할 수 있다. 렌더마다 리셋되는 다른 변수와 달리
- current 값을 변경해도 리렌더링을 트리거하지 않는다. ref는 일반 자바스크립트 객체이기 때문
- 정보는 각 컴포넌트에 local이다. 공유되는 외부 변수와 달리

- ref.current를 렌더링 중에 읽거나 쓰지 말자. 컴포넌트가 순수 함수처럼 동작한다는 react의 예상을 깬다.

```jsx
function MyComponent() {
  // ...
  // 🚩 Don't write a ref during rendering
  myRef.current = 123;
  // ...
  // 🚩 Don't read a ref during rendering
  return <h1>{myOtherRef.current}</h1>;
}
```

- 대신 이벤트 핸들러나 effect에서!

```jsx
function MyComponent() {
  // ...
  useEffect(() => {
    // ✅ You can read or write refs in effects
    myRef.current = 123;
  });
  // ...
  function handleClick() {
    // ✅ You can read or write refs in event handlers
    doSomething(myOtherRef.current);
  }
  // ...
}
```

- 보통 DOM을 조작하는 데에 사용된다.
  - DOM을 생성하고 화면에 그린 후 current 프로퍼티에 DOM 노드를 set
  - 해당 노드가 화면에서 제거되면 current 프로퍼티는 다시 null로 set

```jsx
function MyComponent() {
  const inputRef = useRef(null);

  function handleClick() {
    inputRef.current.focus();
  }

  return <input ref={inputRef} />;
}
```

Examples of manipulating the DOM with useRef (https://react.dev/reference/react/useRef#examples-dom)

### 초기 값 재생성을 방지하기

```jsx
const playerRef = useRef(new VideoPlayer());
```

- 초기값 `new VideoPlayer()`의 결과는 첫 렌더시에만 사용되지만 모든 렌더링에서 함수가 호출된다.
- expensive한 객체일 경우 낭비가 될 수 있다.

이렇게 초기화할 수 있다.

```jsx
function Video() {
  const playerRef = useRef(null);
  if (playerRef.current === null) {
    playerRef.current = new VideoPlayer();
  }
```

### 나중에 초기화할 때 null check 피하기

```jsx
function Video() {
  const playerRef = useRef(null);

  function getPlayer() {
    if (playerRef.current !== null) {
      return playerRef.current;
    }
    const player = new VideoPlayer();
    playerRef.current = player;
    return player;
  }

  // ...
```

### 컴포넌트로 부터 ref를 얻으려면

기본적으로 컴포넌트는 ref를 노출하지 않기 때문에 warning이 발생한다.

```jsx
const inputRef = useRef(null);

return <MyInput ref={inputRef} />;
```

forwardRef를 사용한다.

```jsx
import { forwardRef } from 'react';

const MyInput = forwardRef(({ value, onChange }, ref) => {
  return (
    <input
      value={value}
      onChange={onChange}
      ref={ref}
    />
  );
});

export default MyInput;
```

## useReducer hook

```jsx
const [state, dispatchFn] = useReducer(reducerFn, initialState, initFn);
```

```jsx
const emailReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.val, isValid: action.val.includes("@") };
  }
  if (action.type === "INPUT_BLUR") {
    return { value: state.value, isValid: state.value.includes("@") };
  }
  return { value: "", isValid: false };
};
```

```jsx
// useReducer를 선언하고 이벤트와 dispatch 함수 연결
const [emailState, dispatchEmail] = useReducer(emailReducer, {
  value: "",
  isValid: null,
});

const emailChangeHandler = (event) => {
  dispatchEmail({ type: "USER_INPUT", val: event.target.value });
};

const validateEmailHandler = () => {
  dispatchEmail({ type: "INPUT_BLUR" });
};
```

- reducer 함수는 컴포넌트 밖에 작성할 수 있어 상태 업데이트 로직을 컴포넌트에서 분리할 수 있다.
- 상태 업데이트가 복잡할 때 사용 고려하기

## custom hook

상태 관련 로직을 컴포넌트 간에 재사용하고 싶은 경우

1) higher-order components
2) render props
3) custom hooks 1~2와 달리 컴포넌트 트리에 새 컴포넌트를 추가하지 않고도 이것을 가능하게 해준다.