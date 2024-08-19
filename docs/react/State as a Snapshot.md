https://react.dev/learn/state-as-a-snapshot

상태 변수는 읽고 쓸 수 있는 자바스크립트 변수처럼 보일 수 있다. 하지만 상태는 **스냅샷처럼 동작**한다. 상태를 설정하는 것은 **이미 가지고 있던 상태 변수를 변경하지않고, 대신 리렌더링을 트리거**한다.

## State 설정은 렌더링을 트리거한다

click과 같은 유저 이벤트에 반응하여 UI가 직접 변경되는 것이 아니다. React의 멘탈 모델에서 리렌더링은 state 변경에 의해 트리거된다. 즉, 인터페이스가 이벤트에 반응하려면 state를 업데이트해야 한다.

## 렌더링은 그 시점의 스냅샷을 찍는다.

렌더링이란 React가 컴포넌트, 즉 함수를 호출하는 것을 의미한다. 그 함수에서 반환하는 JSX는 **그 시점의 UI 스냅샷**과 같다. 그 props, 이벤트 핸들러, 지역 변수는 모두 **렌더링 당시의 state를 사용**해 계산된다.

UI 스냅샷은 인터랙티브하다. 여기에는 입력을 처리하는 이벤트 핸들러와 같은 로직이 포함된다. React는 이 스냅샷에 맞춰 화면을 업데이트하고 이벤트 핸들러를 연결한다. 결과적으로 버튼을 누르면 JSX에서 click 핸들러가 트리거된다.

React가 컴포넌트를 리렌더링 할 때

1. React가 함수를 다시 호출한다.
2. 함수는 새로운 JSX 스냅샷을 반환한다.
3. 그리고나서 React는 함수가 반환한 스냅샷에 맞춰 화면을 업데이트한다.

![[State as a Snapshot.png]]

컴포넌트 메모리로서 state는 함수가 반환된 후에 사라지는 일반 변수와 다르다. state는 실제로 함수 외부에  React 자체에 존재한다. React가 컴포넌트를 호출하면 특정 렌더링에 대한 state의 스냅샷을 제공한다. 컴포넌트는 JSX에 해당 렌더링의 state 값을 사용해 계산된 새로운 props와 이벤트 핸들러가 포함된 UI의 스냅샷을 반환한다.

![[State as a Snapshot-1.png]]

다음 예제에서 "+3" 버튼을 클릭할 때마다 `number`는 1씩 증가한다. state 설정은 오직 다음 렌더링에서만 변경되기 때문에, 해당 렌더링의 `onClick` 핸들러에서 `number`의 값은 `setNumber(number+1)`이 호출된 후에도 계속 0이다. 

```jsx
import { useState } from 'react';

export default function Counter() {
  const [number, setNumber] = useState(0);

  return (
    <>
      <h1>{number}</h1>
      <button onClick={() => {
        setNumber(number + 1);
        setNumber(number + 1);
        setNumber(number + 1);
      }}>+3</button>
    </>
  )
}
```

## 시간 경과에 따른 state

```jsx
import { useState } from 'react';

export default function Counter() {
  const [number, setNumber] = useState(0);

  return (
    <>
      <h1>{number}</h1>
      <button onClick={() => {
        setNumber(number + 5);
        setTimeout(() => {
          alert(number);
        }, 3000);
      }}>+5</button>
    </>
  )
}
```

alert에 타이머가 설정하여 컴포넌트가 리렌더링된 후에 발동하도록 하면 어떻게 될까? 이때도 alert는 0을 보여준다. React에 저장된 state는 alert가 실행될 때 변경되었을 수 있지만, 사용자가 상호작용한 시점의 state 스냅샷을 사용하여 예약되었기 때문이다.

state 변수는 이벤트 핸들러의 코드가 비동기적이더라도 **렌더링 내에서 절대 변경되지 않는다.** 이 값은 컴포넌트가 호출되어 **React가 UI의 스냅샷을 "가져올" 때 "고정된" 값**이다.

리렌더링하기 전에 최신 state를 읽고 싶다면 **state updater 함수**를 사용하면 된다.