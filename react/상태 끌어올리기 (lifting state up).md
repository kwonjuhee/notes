https://react.dev/learn/sharing-state-between-components

- 두 컴포넌트를 조정하려면 공통 부모 컴포넌트로 상태를 끌어올려야 한다.
- 공통 부모 컴포넌트에서 props를 통해 상태와 그 상태를 변경할 수 있는 이벤트 핸들러를 전달한다.
- 컴포넌트를 제어(controlled) 또는 비제어(uncontrolled)로 간주하는 것이 유용하다. [[제어(controlled) vs 비제어(uncontrolled)]]

## Example

```jsx
function Panel({ title, chlidren }) {
  const [isActive, setIsActive] = useState(false);

  return (
    <section className="panel">
      <h3>{title}</h3>
      {isActive ? (
        <p>{children}</p>
      ) : (
        <button onClick={() => setIsActive(true)}>
          Show
        </button>
      )}
    </section>
  );
}

export default function Accordion() {

  return (
    <>
      <Panel title="About">
        ~~~
      </Panel>
      <Panel title="Etymology">
        ~~~
      </Panel>
    </>
  )
}
```

여기서 하나의 Panel만 확장되도록 변경하고 싶다면?

- 공통 부모 컴포넌트(Accordion)으로 상태를 끌어올린다.
- 어떤 panel이 active되었는지 추적하기 위해 active panel의 인덱스를 상태 변수로 사용한다. (여기서는 숫자 사용)
- active index를 변경하는 이벤트 핸들러를 prop으로 전달하여 panel 컴포넌트가 상태를 변경할 수 있도록 한다.

```jsx
function Panel({ title, chlidren, isActive, onShow }) {

  return (
    <section className="panel">
      <h3>{title}</h3>
      {isActive ? (
        <p>{children}</p>
      ) : (
        <button onClick={onShow}>
          Show
        </button>
      )}
    </section>
  );
}

export default function Accordion() {
  const [activeIndex, setActiveIndex] = useState(0);
  
  return (
    <>
      <Panel
        title="About"
        isActive={activeIndex === 0}
        onShow={() => setActiveIndex(0)}
      >
        ~~~
      </Panel>
      <Panel
        title="Etymology"
        isActive={activeIndex === 1}
        onShow={() => setActiveIndex(1)}
      >
        ~~~
      </Panel>
    </>
  )
}

```

> 🤔 prop으로 setState를 직접 전달하는 방식은?
> 
> - 자식 컴포넌트가 부모 컴포넌트와 강하게 결합되어 컴포넌트 분리 및 재사용이 어려워진다.
> - 자식 컴포넌트가 부모 컴포넌트의 상태를 자유롭게 변경할 수 있게되므로 React의 주요 원칙 중 하나인 단방향 데이터 흐름을 깨뜨리고 상태 변경의 추적과 예측이 어려워진다. 버그 발생 위험 또한 높아진다.
>   
> 되도록 하위 컴포넌트에서 prop으로 전달받은 상태 변경 함수를 호출하여 상태를 변경할 수 있게 하되 상위 컴포넌트에서 실제로 상태 변경이 일어나도록 하자. 


## 각 상태에 대한 단일 진실 공급원(single source of truth)

많은 컴포넌트는 고유한 state를 갖는다. 일부 state는 입력값과 같이 leaf 컴포넌트에 가깝게 위치할 수 있다. 다른 state는 앱의 상단에 더 가깝게 위치할 수 있다. 예를 들어, 클라이언트 사이드 라우팅 라이브러리조차도 일반적으로 현재 경로를 state에 저장하고 props를 통해 전달하는 방식으로 구현된다.

각각의 고유한 state에 대해 이를 "소유(owns)"하는 컴포넌트를 선택할 것이다. 이 원칙을 "single source of truth"를 갖는다고도 한다. 모든 state가 한 곳에 존재한다는 것이 아니라 **각 state마다 해당 정보를 보유하는 특정 컴포넌트가 있다**는 뜻이다. **컴포넌트 간에 공유되는 state를 복제하는 대신 공통 부모 컴포넌트로 올려서 필요한 자식에게 전달해라!**

