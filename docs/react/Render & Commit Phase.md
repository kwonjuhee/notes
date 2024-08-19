https://react.dev/learn/render-and-commit

![](https://velog.velcdn.com/images/mogulist/post/b8b38f38-dd5d-4063-bf40-50a5d59f16a2/image.png)

컴포넌트를 화면에 표시하기 전에 React에 의해 렌더링되어야 한다.

컴포넌트가 요리사이고, React가 손님의 요청을 접수하고 주문을 가져오는 웨이터 역할을 한다고 생각해보자. UI를 요청하고 가져오는 단계는 세 단계로 이루어진다.

1. Triggering a render (주방으로 손님의 주문을 전달)
2. Rendering the component (주방에서 주문을 준비)
3. Committing to the DOM (테이블에 주문한 요리 놓기)

![[Render & Commit Phase.png]]

## Step 1: 렌더링 트리거

컴포넌트가 렌더링되는 데에는 두 가지 이유가 있다.

- 컴포넌트의 **초기 렌더링**
- 컴포넌트(또는 조상 컴포넌트)의 **state가 업데이트된 경우**

### Initial render

초기 렌더링은 target DOM 노드로 `createRoot`를 호출한 다음 `render` 메소드를 호출함으로써 수행된다.

```jsx
import Image from './Image.js';
import { createRoot } from 'react-dom/client';

const root = createRoot(document.getElementById('root'))
root.render(<Image />);
```

### state 업데이트시 리렌더링

컴포넌트가 처음 렌더링되면 set 함수로 state를 업데이트하여 추가 렌더링을 트리거할 수 있다. 컴포넌트의 state를 업데이트하면 자동으로 렌더링이 queue된다. (레스토랑에서 손님이 첫 주문을 한 후 갈증이나 배고픔의 상태에 따라 차, 디저트 등 다양한 음식을 주문하는 것을 상상해 보세요.)


## Step 2: React가 컴포넌트를 렌더링

렌더링을 트리거하고 나서 React는 컴포넌트를 호출해서 화면에 표시할 내용을 파악한다. **"렌더링"은 React가 컴포넌트를 호출하는 것**이다.

- 초기 렌더링에서 React는 root 컴포넌트를 호출한다.
- 이후 렌더링에서 React는 state 업데이트가 일어나 리렌더링을 트리거한 컴포넌트를 호출한다.

이 프로세스는 **재귀적(recursive)** 이다. 만약 업데이트된 컴포넌트가 다른 컴포넌트를 반환하면 React는 그 컴포넌트를 다음으로 렌더링할 것이고, 그 컴포넌트 역시 무언가를 반환하면 그 컴포넌트를 다음에 렌더링할 것이다. 중첩된 컴포넌트가 더이상 존재하지 않을 때까지, React가 화면에 표시되어야 할 내용을 정확히 파악할 때까지 계속된다.

> [!warning] Pitfall
> 
> 렌더링은 항상 [pure calculation](https://react.dev/learn/keeping-components-pure)이어야 한다.
> 
> - 동일한 입력에는 동일한 출력이 나와야 한다. 동일한 입력이 주어지면 컴포넌트는 항상 동일한 JSX를 반환해야 한다. (토마토 샐러드를 시켰는데 양파 샐러드를 받아서는 안된다.)
> - 자기 일에만 신경써야 한다. 렌더링 전에 존재했던 객체나 변수를 변경해서는 안된다. (하나의 주문이 다른 사람의 주문을 변경해서는 안된다.)
>   
>   그렇지 않으면 코드베이스가 복잡해지면서 버그와 예상치 못한 동작이 발생할 수 있다. "Strict Mode"에서 개발하면 React가 각 컴포넌트 함수를 두 번씩 호출하므로 impure 함수로 인해 발생하는 실수를 발견하는 데 도움이 될 수 있다.

> 🤿 성능 최적화 https://reactjs.org/docs/optimizing-performance.html


## Step 3: React가 변경 사항을 DOM에 커밋

컴포넌트를 렌더링(호출)한 후 React는 DOM을 수정한다.

- 초기 렌더링의 경우, React는  `appendChild()` DOM API를 사용하여 생성된 모든 DOM 노드를 화면에 배치한다.
- 리렌더링의 경우, React는 **렌더링하는 동안 계산([[Diffing Algorithm]])해둔 필요한 최소한의 연산을 적용**하여 DOM이 최신 렌더링 출력과 일치하도록 한다. ([[react/재조정 (Reconciliation)#재조정 과정|재조정 과정]] 참고)

**React는 렌더링 간 차이가 있을 때만 DOM 노드를 변경한다.** 예를 들어, 매초마다 부모에게 전달받은 다른 props로 리렌더링하는 컴포넌트가 있다.

```jsx
export default function Clock({ time }) {
  return (
    <>
      <h1>{time}</h1>
      <input />
    </>
  );
}
```

`<input>`에 텍스트를 추가하고 `value`를 업데이트 하지만 컴포넌트가 리렌더링될 때 텍스트가 사라지지 않는 것을 확인할 수 있다. 마지막 단계 동안 React가 새로운 `time` prop으로 `<h1>`의 내용만 업데이트하기 때문이다. `<input>`이 JSX에서 이전과 동일한 위치에 나타나므로 React는 `<input>` 또는 `value`를 건들지 않는다.


## Epilogue: 브라우저가 페인트

렌더링이 끝나고 React가 DOM을 업데이트한 후, 브라우저는 화면을 다시 페인트한다. 이 과정은 "브라우저 렌더링"이라고 알려져있지만, 우리는 혼동을 피하기 위해 이것을 "페인팅"이라고 언급할 것이다.