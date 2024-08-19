https://ko.reactjs.org/docs/composition-vs-inheritance.html

props와 합성은 컴포넌트의 모양과 동작을 커스터마이징하는 데 필요한 모든 유연성을 제공한다. 컴포넌트가 원시 타입의 값, React 엘리먼트 혹은 함수 등 어떠한 props도 받을 수 있다는 것을 기억하자.

### 컴포넌트에서 다른 컴포넌트 담기

- 어떤 자식 엘리먼트가 들어올지 미리 예상할 수 없을 때
- 범용적인 '박스' 역할을 하는 Sidebar 또는 Dialog와 같은 컴포넌트에서 사용
- `children` prop을 사용하여 자식 엘리먼트를 출력에 그대로 전달하는 것이 좋다.

```jsx
function FancyBorder(props) {
  return (
    <div className={'FancyBorder FancyBorder-' + props.color}>
    {props.children}
    </div>
  );
}
```

```jsx
function WelcomeDialog() {
  return (
    <FancyBorder color="blue">
      <h1 className="Dialog-title">
        Welcome
      </h1>
      <p className="Dialog-message">
        Thank you for visiting our spacecraft!
      </p>
    </FancyBorder>
  );
}
```

- 여러 개의 구멍이 필요할 때는 children 대신 고유한 prop을 사용할 수 있다.

```jsx
function SplitPane(props) {
  return (
    <div className="SplitPane">
      <div className="SplitPane-left">
        {props.left}
      </div>
      <div className="SplitPane-right">
        {props.right}
      </div>
    </div>
  )
}

function App() {
  return (
    <SplitPane
      left={
        <Contracts />
      }
      right={
        <Chat />
      }
    />
  );
}

```

### 특수화

- 어떤 컴포넌트의 "특수한 경우"인 컴포넌트를 고려해야 하는 경우
- 더 "구체적"인 컴포넌트가 "일반적인" 컴포넌트를 렌더링하고 props를 통해 내용을 구성할 수 있다.
- 예를 들어, `WelcomeDialog`는 `Dialog`의 특수한 경우

```jsx
function Dialog(props) {
  return (
    <FancyBorder color="blue">
      <h1 className="Dialog-title">
        {props.title}
      </h1>
      <p className="Dialog-message">
        {props.message}
      </p>
    </FancyBorder>
  );
}

function WelcomeDialog() {
  return (
    <Dialog
      title="Welcome"
      message="Thank you for visiting our spacecraft!" />
  );
}
```
