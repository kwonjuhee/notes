
# State update scheduling

업데이트 함수를 호출하면 state update가 즉시 일어나는 것이 아니라 schedule함. state change 순서가 보장됨.

이전 state에 의존하는 업데이트를 해야 하는 경우 동시에 한 state에 여러번의 업데이트가 schedule된다면 컴포넌트가 마지막으로 리렌더링 되었을 때의 latest state가 아니라 schedule되었을 때의 state를 사용하기 때문에 올바른 결과가 나오지 못할 것이다.

⇒ updating function에 function form을 전달해야 한다.

# updater 함수

이전 state 값을 기준으로 상태를 업데이트하고자 한다면 updater 함수를 전달해야한다. 가장 최신의 state 값을 사용하도록 보장하기 위한 방법이다.

다음과 같은 코드는 예상대로 동작하지 않을 것이다.

```jsx
incrementCount() {
  // 주의: 이 코드는 예상대로 동작하지 *않을 것*입니다.
  this.setState({count: this.state.count + 1});
}

handleSomething() {
  // `this.state.count`가 0에서 시작한다고 해봅시다.
  this.incrementCount();
  this.incrementCount();
  this.incrementCount();
  // React가 컴포넌트를 리렌더링할 때 `this.state.count`는 3이 될 것 같은 예상과 달리 1이 됩니다.

  // 이것은 `incrementCount()` 함수가 `this.state.count`에서 값을 읽어 오는데
  // React는 컴포넌트가 리렌더링될 때까지 `this.state.count`를 갱신하지 않기 때문입니다.
  // 그러므로 `incrementCount()`는 매번 `this.state.count`의 값을 0으로 읽은 뒤에 이 값을 1로 설정합니다.

  // 이 문제의 해결 방법은 아래에 설명되어 있습니다.
}
```

요렇게 updater 함수를 전달해야 의도한 대로 동작할 것

```jsx
incrementCount() {
  this.setState((state) => {
    // 중요: 값을 업데이트할 때 `this.state` 대신 `state` 값을 읽어옵니다.
    return {count: state.count + 1}
  });
}

handleSomething() {
  // `this.state.count`가 0에서 시작한다고 해봅시다.
  this.incrementCount();
  this.incrementCount();
  this.incrementCount();

  // 지금 `this.state.count` 값을 읽어 보면 이 값은 여전히 0일 것입니다.
  // 하지만 React가 컴포넌트를 리렌더링하게 되면 이 값은 3이 됩니다.
}
```