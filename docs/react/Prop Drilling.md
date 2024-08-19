
prop drilling 이란 **중첩된 여러 하위 컴포넌트들을 통해 데이터를 전달하는 것**을 말한다.

## 장점

props를 전달하는 것은 UI 트리를 통해 **데이터를 사용하는 컴포넌트에 "명시적"으로 데이터를 전달하는 좋은 방법**이다.

**데이터를 추적하기 쉬워지기 때문에 코드 변경이 애플리케이션의 다른 영역에 어떤 영향을 주는지 쉽게 파악할 수 있고 수정도 간단하게 할 수 있다.**

## 단점

하지만 **중간에 너무 많은 컴포넌트들을 거쳐야하거나 많은 컴포넌트에서 동일한 prop을 필요로하는 경우**에 번거롭고 불편해질 수 있다. 가장 가까운 공통 조상은 데이터가 필요한 컴포넌트로부터 멀리 위치할 수 있으며 그렇게 높은 곳으로 lifting state up하게 되면 깊은 prop drilling 상황이 발생할 수 있다. 단순히 전달 매체로 사용되는 컴포넌트들이 많아지는 것이다.

![[Prop Drilling.png]]

### 발생할 수 있는 문제

- 일부 데이터의 자료형을 바꾸게 된다면 해당 컴포넌트들을 모두 수정해주어야 한다.
- 일부 props가 필요했지만 더이상 필요하지 않은 컴포넌트를 이동하여 props를 필요 이상으로 전달하는 경우 
- 필요보다 적은 props 전달과 동시에 `defaultProps`의 남용으로 누락된 props를 인지하기 어려운 경우 (또한 컴포넌트의 이동 때문일 수 있다.)
- props 이름이 중간에서 변경되어 값을 추적하는 것이 쉽지 않아지는 경우

## 대안

### Context 사용하기

context는 부모 컴포넌트가 하위 트리 전체에 데이터를 제공할 수 있게 해준다. 하지만 prop drilling을 피하기 위해서 무작정 context를 사용하면 안된다. 그 이유는 다음과 같다.

- **컴포넌트 재사용이 어려워진다**는 문제가 있다. 컴포넌트가 provider가 제공하는 상태에 종속되고 provider 경계 밖에서 재사용할 수 없기 때문이다.
- **성능 문제**가 발생할 수 있다. context 업데이트가 발생하면 context를 사용하는 모든 컴포넌트가 변경 사항이 실제로 영향을 미치는지 여부와 관계없이 리렌더링되기 때문이다.  ([[Context API#리렌더링 이슈]])

따라서 context를 사용하기 전에 props를 전달하는 것으로 먼저 시작하자. 컴포넌트들이 사소하지 않다면 props 수십 개를 컴포넌트 수십 개를 통해 전달해야 하는 경우도 드물지 않다. 이 방식이 오히려 어떤 컴포넌트에서 어떤 데이터를 사용하는지 명확하게 만든다. 코드를 유지 관리하는 사람의 입장에서도 명확한 data flow가 더 좋을 것이다.

### Composition 사용하기

context를 사용하기 이전에 컴포넌트를 추출하여 JSX를 children으로 전달하는 것([[합성 (Composition)]])을 고려해보자. 데이터를 해당 데이터를 사용하지 않는 중간 컴포넌트의 여러 레이어를 거쳐 전달할 경우 (아래로만 전달할 경우), 이는 종종 컴포넌트를 추출하는 것을 잊었다는 것을 의미한다.

예를 들어, 데이터를 직접 사용하지 않는 시각적 컴포넌트(`<Layout posts={posts} />`)에 전달하는 대신,  Layout이 children prop을 갖도록 하고 `<Layout><Posts posts={posts} /></Layout>`을 렌더링할 수 있다. 이렇게 하면 **데이터를 명시하는 컴포넌트와 데이터를 필요로 하는 컴포넌트 사이의 레이어 수가 줄어든다.**


- https://react.dev/learn/passing-data-deeply-with-context#the-problem-with-passing-props
- https://kentcdodds.com/blog/prop-drilling
- https://react.dev/learn/passing-data-deeply-with-context#before-you-use-context



