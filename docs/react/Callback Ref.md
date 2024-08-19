
- ref가 설정되고 해제되는 시점을 보다 세밀하게 제어할 수 있다.
- ref 객체를 전달하는 대신 함수를 전달한다.
	- 전달된 함수는 렌더링된 후 호출되며 언마운트시 null로 다시 한번 호출된다. 
	- 렌더링된 컴포넌트 인스턴스나 DOM 엘리먼트 노드를 인수로 받는다.


- ref에 대한 타입 선언을 보면 ref 객체뿐만 아니라 함수도 전달할 수 있음을 알 수 있다.

```tsx
type Ref<T> = RefCallback<T> | RefObject<T> | null
```

- ref로 RefObject를 전달하는 것도 아래 코드의 문법적 설탕이다.

```tsx
<input
  ref={(node) => {
    ref.current = node;
  }}
  defaultValue="Hello world"
/>
```

즉, 모든 ref props는 함수일 뿐이다. 이 함수는 모든 렌더링 후에 실행된다.

## 언제 사용?

```jsx
function App() {
  const ref = React.useRef(null)

  React.useEffect(() => {
    // 🚨 ref.current is always null when this runs
    ref.current?.focus()
  }, [])

  return <Form ref={ref} />
}

const Form = React.forwardRef((props, ref) => {
  const [show, setShow] = React.useState(false)

  return (
    <form>
      <button type="button" onClick={() => setShow(true)}>
        show
      </button>
      // 🧐 ref is attached to the input, but it's conditionally rendered
      // so it won't be filled when the above effect runs
      {show && <input ref={ref} />}
    </form>
  )
})
```

위의 코드는 input이 렌더링되어 ref가 채워져도 useEffect의 의존성 배열에 show가 없기 때문에 focus가 트리거되지 않는다.

다음과 같이 작성하면 input이 렌더링될 때 callback ref가 실행되어 focus가 트리거된다.

```jsx
<input
  ref={(node) => {
    node?.focus()
  }}
  defaultValue="Hello world"
/>
```


## useCallback과 함께 사용하기

React는 참조 동일성을 통해 callback ref를 실행해야 하는지 여부를 확인한다. 따라서 useCallback hook을 사용하여 ref에 동일한 객체를 전달하도록 하면 실행을 건너뛸 수 있다.

```jsx
const ref = React.useCallback((node) => {
  node?.focus()
}, [])

return <input ref={ref} defaultValue="Hello world" />
```


## useEffect와 비교

- useRef + useEffect 조합 대신 useCallback을 사용한다.
- callback ref는 이를 마운트하는 컴포넌트가 아니라 DOM 노드의 수명 주기에 바인딩된다.
- strict mode에서 두 번 실행되지 않는다.


## 예시

DOM 노드 크기 측정

```jsx
function MeasureExample() {
  const [height, setHeight] = useState(0);

  const measuredRef = useCallback(node => {
    if (node !== null) {
      setHeight(node.getBoundingClientRect().height);
    }
  }, []);

  return (
    <>
      <h1 ref={measuredRef}>Hello, world</h1>
      <h2>The above header is {Math.round(height)}px tall</h2>
    </>
  );
}
```

- ref 객체가 현재 ref 값의 변경에 대해 알려주지 않기 때문에 useRef를 사용할 수 없다.
- callback ref를 사용하면 나중에(ex. 클릭 이후) 하위 컴포넌트가 측정된 노드를 표시하더라도 부모 컴포넌트에서 해당 노드에 대한 알림을 받고 측정값을 업데이트할 수 있다.

hook으로 추출

```jsx
function MeasureExample() {
  const [rect, ref] = useClientRect();
  return (
    <>
      <h1 ref={ref}>Hello, world</h1>
      {rect !== null &&
        <h2>The above header is {Math.round(rect.height)}px tall</h2>
      }
    </>
  );
}

function useClientRect() {
  const [rect, setRect] = useState(null);
  const ref = useCallback(node => {
    if (node !== null) {
      setRect(node.getBoundingClientRect());
    }
  }, []);

  return [rect, ref];
}

```


reactjs.org/docs/refs-and-the-dom.html#callback-refs

reactjs.org/docs/hooks-faq.html#how-can-i-measure-a-dom-node

https://itchallenger.tistory.com/673
