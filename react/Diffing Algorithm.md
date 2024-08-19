재조정 과정에서 사용되는 diffing algorithm은 UI 업데이트를 더 효율적으로 만들어준다.

하나의 트리를 가지고 다른 트리로 변환하기 위한 최소한의 연산 수를 구하는 알고리즘 해결책도 n개의 요소가 있는 트리에 대해 `O(n^3) (n: 트리 요소수)`의 시간 복잡도를 가진다.
React에 적용하기에는 너무 비싼 연산이다. (ex. 1000개의 요소를 그리기 위해 10억 번의 비교 연산을 수행해야 함)
따라서 React는 두 가지 가정을 기반하여 `O(n)` 복잡도의 휴리스틱 알고리즘을 구현한다.

**1. 두 element의 타입이 다르면 다른 트리를 생성한다.**

트리를 비교하려 하지 않고 단순히 old tree를 교체한다.

다음과 같은 상황에서 이전 Counter는 사라지고 새로 다시 마운트가 될 것이다.

```jsx
<div>
  <Counter />
</div>

<span>
  <Counter />
</span>
```

**💡 DOM 요소의 타입이 같다면**

변경된 속성들만 갱신하고, 처리가 끝나면 이어서 해당 노드의 자식들을 재귀적으로 처리한다.

```jsx
<div className="before" title="stuff" />

<div className="after" title="stuff" />

// className만 수정
```

```jsx
<div style={{color: 'red', fontWeight: 'bold'}} />

<div style={{color: 'green', fontWeight: 'bold'}} />

// style이 갱신될 때는 color 속성만 수정
```

**💡 같은 타입의 컴포넌트 요소**

같은 타입의 컴포넌트가 갱신되면 인스턴스는 동일하게 유지되어 렌더링간 state가 유지된다.

새로운 요소의 내용을 반영하기 위해 현재 컴포넌트 인스턴스의 props를 갱신한다.

다음으로 render() 메서드가 호출되고 비교 알고리즘이 이전 결과와 새로운 결과를 재귀적으로 처리한다.

**2. 개발자는 key prop을 사용하여 변경이 필요하지 않은 자식 element를 표시할 수 있다.**

https://ko.reactjs.org/docs/reconciliation.html