- [도입 배경](#%EB%8F%84%EC%9E%85%20%EB%B0%B0%EA%B2%BD)
	- [old reconciler의 한계](#old%20reconciler%EC%9D%98%20%ED%95%9C%EA%B3%84)
- [Fiber의 목표](#Fiber%EC%9D%98%20%EB%AA%A9%ED%91%9C)
	- [증분 렌더링 (Incremental Rendering)](#%EC%A6%9D%EB%B6%84%20%EB%A0%8C%EB%8D%94%EB%A7%81%20(Incremental%20Rendering))
	- [스케줄링 (Scheduling)](#%EC%8A%A4%EC%BC%80%EC%A4%84%EB%A7%81%20(Scheduling))
- [Fiber란](#Fiber%EB%9E%80)
	- [unit of work](#unit%20of%20work)
	- [가상 스택 프레임](#%EA%B0%80%EC%83%81%20%EC%8A%A4%ED%83%9D%20%ED%94%84%EB%A0%88%EC%9E%84)
- [fiber 노드 구조](#fiber%20%EB%85%B8%EB%93%9C%20%EA%B5%AC%EC%A1%B0)
	- [`type`과 `key`](#%60type%60%EA%B3%BC%20%60key%60)
	- [`child`와 `sibling`](#%60child%60%EC%99%80%20%60sibling%60)
	- [`return`](#%60return%60)
	- [`pendingProps`와 `memoizedProps`](#%60pendingProps%60%EC%99%80%20%60memoizedProps%60)
	- [`pendingWorkPriority`](#%60pendingWorkPriority%60)
	- [`alternate`](#%60alternate%60)
	- [`output`](#%60output%60)
- [Reference](#Reference)


## 도입 배경

### old reconciler의 한계

이전 react에서는 한 번의 tick동안 **재귀적으로 트리를 탐색**하고 업데이트된 트리 전체의 render 함수를 호출하는 방식을 사용했다.([[react/재조정 (Reconciliation)#React 16 이전의 Stack Reconciler|Stack Reconciler]]) 따라서 앱이 커지고 복잡해지면 프레임 드롭이 발생하고 뚝뚝 끊기는 느낌을 주어 사용자 경험이 저하된다는 문제가 발생한다.

또한 너무 많은 작업이 동시에 수행되는 경우 응답성이 떨어지는 문제도 발생한다. react 앱을 렌더링하는 것은 다른 함수에 대한 호출이 포함된 함수를 호출하는 것과 유사한데, 호출된 함수들이 쌓인 콜 스택이 모두 빌 때까지 대기중인 작업이 수행되지 못하기 때문이다.

- [[실행 컨텍스트#실행 컨텍스트 스택 (Execution Context Stack / Call Stack)]]
- [[이벤트 루프#브라우저 환경]]

> 🔎 프레임 드롭
> 
> 일반적인 모니터는 초당 60회 화면 갱신을 한다. 한 프레임 안에서 작업을 수행하는데 걸리는 시간이 16ms(1 프레임당 소요할 수 있는 시간, 1초 / 60 프레임 = 약 16ms)가 넘어가면 jank 현상이 발생하는데 이를 프레임 드롭이라 한다.

## Fiber의 목표

### 증분 렌더링 (Incremental Rendering)

- 렌더링 작업을 청크로 나누어 여러 프레임에 걸쳐 실행할 수 있다.

### 스케줄링 (Scheduling)

- 스케줄링이란 작업(work)을 언제 수행해야 하는지 결정하는 프로세스다. Fiber의 주요 목표는 스케줄링을 잘 활용하는 것이다. 특히 다음을 수행할 수 있어야 한다.
	- 작업을 pause, abort, reuse한다.
	- 업데이트 종류에 따라 우선순위를 부여한다.

- 작업(work) 이란 수행되어야 하는 모든 계산을 말한다. 보통 업데이트의 결과다. (e.g. `setState`)

> 🔎 [Scheduling Design Principle](reactjs.org/docs/design-principles.html)에서 Fiber가 필요한 이유를 잘 설명한다.
> 
> - 모든 업데이트가 즉각적으로 UI에 반영될 필요는 없다. 그렇게 하면 프레임이 드랍되고 사용자 경험을 저하시키기 때문에 낭비일 수 있기 때문이다.
>   
> - 업데이트 종류마다 우선순위가 다르다.
> 	- 유저 상호작용에서 발생하는 작업(ex. 버튼 클릭시 애니메이션)에 덜 중요한 백그라운드 작업(ex. 네트워크로부터 방금 막 도착하여 새롭게 렌더링되는 컨텐츠)보다 높은 우선순위를 줄 수 있다.
>   
> - pull 기반 접근 방식을 사용한다. react가 작업들의 우선순위를 전제하고 스케줄링을 대신한다는 의미


## Fiber란

### unit of work

작업에 우선순위를 부여하고 일시 중지, 중단, 재사용하기 위해서는 작업을 작은 단위로 나눌 방법이 필요하다. 어떤 의미에서 이것이 fiber다. fiber는 작업의 작은 단위(unit of work)를 나타낸다.

### 가상 스택 프레임

[[Fiber#old reconciler의 한계]]를 해결하기 위해 React 16부터 Fiber라는 새로운 재조정(reconciliation) 엔진을 도입하였다.

모던 브라우저들도 이와 동일한 문제를 해결하는 것을 돕는 API를 가지고 있지만, 이를 사용하기 위해서는 렌더링 작업을 incremental unit으로 나눌 방법이 필요하다는 문제가 있다.

> - `requestIdleCallback`: 우선 순위가 낮은 함수들이 유휴 기간동안 호출될 수 있도록 스케줄링
> - `requestAnimationFrame`: 우선 순위가 높은 함수들이 다음 animation frame에 호출되도록 스케줄링

UI 렌더링을 최적화하기 위해서 콜 스택의 동작을 커스텀할 수 있다면, 콜 스택을 인터럽트하고 스택 프레임을 수동으로 조작할 수 있다면 좋을 것이라는 생각에서 출발하였다.

따라서 react에서는 Fiber를 도입하여 react 컴포넌트에 특화된 **스택을 재구현**하였고 단일 fiber는 가상 스택 프레임(virtual stack frame)이라 볼 수 있다. **스택 프레임을 메모리에 저장해두고 원할 때 실행**할 수 있도록 한다.

이로 인해 스케줄링 작업뿐만 아니라 동시성, error boundary와 같은 기능들이 가능하게 되었다.

## fiber 노드 구조

fiber는 컴포넌트 인스턴스에 대응되며 컴포넌트의 입력과 출력에 대한 정보를 갖고 있다. 이는 작업 단위가 된다.

```jsx
export type Fiber = {|
  tag: WorkTag,

  // Unique identifier of this child.
  key: null | string,
  
  // The resolved function/class/ associated with this fiber.
  type: any,

  // The Fiber to return to after finishing processing this one.
  // This is effectively the parent, but there can be multiple parents (two)
  // so this is only the parent of the thing we're currently processing.
  // It is conceptually the same as the return address of a stack frame.
  return: Fiber | null,

  // Singly Linked List Tree Structure.
  child: Fiber | null,
  sibling: Fiber | null,
  index: number,

  // Input is the data coming into process this fiber. Arguments. Props.
  pendingProps: any, // This type will be more specific once we overload the tag.
  memoizedProps: any, // The props used to create the output.

  // ....
|};

```

### `type`과 `key`

- react element와 동일한 목적
 - type은 해당 컴포넌트를 설명한다. 함수 또는 클래스 컴포넌트 자체이거나 호스트 컴포넌트의 경우 문자열이다. 개념적으로 실행이 스택 프레임에 의해 추적되는 함수를 가리킨다.
 - key는 type과 함께 fiber가 재사용될 수 있는지를 결정하기 위해 재조정 중에 사용된다.

### `child`와 `sibling`

- 재귀적인 트리 구조를 갖는 다른 fiber를 가리킨다.
	- child fiber는 컴포넌트의 render 메소드가 반환하는 값을 가리킨다.
	- sibling fiber는 render 메소드가 여러개의 children을 반환하는 경우를 설명한다.

### `return`

 - return fiber는 현재 항목을 처리한 후 반환해야하는 fiber다.
 - stack frame의 return address와 동일하며 parent fiber로 생각할 수 있다.

### `pendingProps`와 `memoizedProps`

 - pendingProps는 실행 시작시 설정되고 memoizedProps는 마지막에 설정된다.
 - 새로 들어오는 pendingProps가 memoizedProps와 같다면 fiber의 이전 결과는 재사용될 수 있으며 불필요한 작업을 방지할 수 있다.

### `pendingWorkPriority`

- fiber를 대표하는 작업의 우선순위를 나타내는 숫자

### `alternate`

- 컴포넌트 인스턴스는 최대 두가지 fiber를 갖는다. (current flushed fiber, work-in-progress fiber)
- 서로가 서로의 alternate이다.
- fiber의 alternate는 `cloneFiber`라는 함수를 통해 지연 생성된다. `cloneFiber`는 새로운 객체를 생성하는 대신에 기존의 fiber의 alternate를 재사용하여 allocation을 최소화한다.

### `output`

 - fiber의 출력값은 함수의 반환 값이다.
 - 출력값은 리프 노드에 있는 host component에 의해서만 생성된다. 이는 트리 위로 전달되며 결국 모든 fiber가 출력값을 갖게된다.
 - 출력값은 렌더링 환경에 변경 사항들을 flush할 수 있도록 renderer에게 전달된다. 출력값이 어떻게 생성되고 업데이트될지 정의하는 것은 renderer의 역할이다.


> **flush**: fiber를 flush하는 것은 스크린에 결과를 렌더링하는 것을 말한다.
> 
> **work-in-progress**: 완료되지 않은 fiber, 즉 아직 return되지 않은 stack frame을 말한다.
> 
> **host component**란 react 어플리케이션에서 리프 노드를 말하며 브라우저 환경을 예로 들면 div, span 등등이 있다. (렌더링 환경마다 다름)
> 이들은 JSX에서 lowercase tag name으로 표시되는 것을 의미한다.


## Reference

- https://github.com/acdlite/react-fiber-architecture