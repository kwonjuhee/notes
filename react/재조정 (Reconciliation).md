- [재조정이란?](#%EC%9E%AC%EC%A1%B0%EC%A0%95%EC%9D%B4%EB%9E%80?)
	- [과정](#%EA%B3%BC%EC%A0%95)
	- [reconciler와 renderer](#reconciler%EC%99%80%20renderer)
- [React 16 이전의 Stack Reconciler](#React%2016%20%EC%9D%B4%EC%A0%84%EC%9D%98%20Stack%20Reconciler)
- [Fiber Reconciler](#Fiber%20Reconciler)
- [재조정 과정](#%EC%9E%AC%EC%A1%B0%EC%A0%95%20%EA%B3%BC%EC%A0%95)
- [Reference](#Reference)


## 재조정이란?

> 💡상태 변경이 발생하면 old VDOM과 updated VDOM을 diffing 알고리즘을 통해 비교한 후 업데이트가 필요한 요소만 새로 그리는 과정을 말한다. 효율적으로 UI를 갱신하기 위한 방법

### 과정

![[재조정 (Reconciliation).png]]

1. 변경 사항이 발생하면 새로운 [Virtual DOM](Virtual%20DOM.md) 트리를 생성한다. (이때 VDOM은 UI를 나타내는 객체일 뿐이므로 아직 화면에 반영되지 않는다.)
2. [[Diffing Algorithm]]을 통해 이전 스냅샷과 비교하여 어떤 변경이 필요한지 파악한다.
3. ReactDOM과 같은 렌더러 라이브러리를 통해 변경된 노드만 real DOM에 반영한다.

### reconciler와 renderer

- reconciliation은 reconciler와 renderer에 의해 수행된다.
- reconciler는 새로운 virtual dom과 이전 스냅샷을 비교하여 (by diffing algorithm) 변경된 부분을 감지하는 역할
- renderer는 변경 사항을 실제 dom에 반영하여 UI를 업데이트하는 작업을 수행
- reconciler와 renderer 모듈이 분리되어 있기 때문에 React와 React Native는 같은 reconciler 코어를 공유하는 반면에 다른 renderer를 사용한다.


## React 16 이전의 Stack Reconciler

![[재조정 (Reconciliation)-2.png]]

- virtual DOM 트리를 비교하고 화면에 변경 사항을 푸시하는 모든 작업 동기적으로, 하나의 큰 태스크로 일어난다.
- 이렇게 dfs 형식으로 재귀적으로 탐색하는 방식은 깊은 콜 스택을 형성하게 되는데, 콜 스택이 모두 처리될 때까지 메인 스레드는 아무 작업도 할 수 없게 된다.
- 앱이 일시적으로 무반응 상태가 되거나 버벅거리게 된다.

## Fiber Reconciler

![[재조정 (Reconciliation)-3.png]]
https://codepen.io/ejilee/pen/eYMXJPN

- fiber 트리에서는 각 노드가 return, sibling, child 포인터 값을 사용하여 체인 형태의 링크트 리스트를 이룬다.
- child > sibling > return 순으로 탐색한다.
- 각 fiber는 다음으로 처리해야 할 fiber를 가리키고 있기 때문에 작업을 일시 중단하거나 재시작하는 것이 가능하다.
- 각 fiber는 각자의 변경 사항에 대한 정보(effect)를 들고 있는데, 이를 DOM에 바로 반영하지 않고 모아뒀다가 모든 fiber 탐색이 끝나면 마지막에 commit 단계에서 한 번에 반영한다. 따라서 reconciliation 작업이 commit 단계 전에 중단되어도 실제 렌더된 화면에는 영향을 미치지 않는다.

## 재조정 과정

1. React는 상태 변경이 발생하면 메인 스레드가 idle 상태가 될 때까지 대기한 다음 fiber를 사용하여 WIP(Work In Progress) 트리를 생성하기 시작한다.

2. **`render/reconcile phase`** - **WIP 트리를 구축**하면서 **WIP 트리와 current 트리를 비교하여 변경 사항이 있는지 확인**한다.
	- 각 fiber에는 다른 트리의 fiber를 가리키는 `alternate` 속성이 있다. diffing 알고리즘을 사용하여 변경이 필요한지 확인하고, 변경이 필요하지 않은 fiber는 current tree에서 복제한다. 이는 작업을 재사용하는 것을 돕는다.
	- 변경 사항(effect)이 있는 fiber를 표시하고 나중에 DOM을 변경하는데 사용되는 이펙트 리스트(updateQueue)를 만든다.
	- 유저 이벤트, 애니메이션 같은 더 급한 작업이 있는 경우 일시 중지될 수 있고 메인 스레드가 다시 idle 상태가 되면 중단했던 부분부터 WIP 트리 구축을 재개한다.(concurrent) 이로 인해 아무리 트리가 커도 비교 작업이 메인 스레드를 막을 걱정이 없다.
	- asynchronous하게 수행된다.

3. **`commit phase`** - 전체 WIP 트리가 완성되면 **변경된 부분을 실제 DOM에 반영**한다.
	- current tree와 WIP tree의 포인터를 스왑하고 변경 사항이 있는 fiber를 DOM으로 flush하여 DOM을 변경하는 것.
	- synchronous하게 수행되고 중단될 수 없다.

4. 새로운 WIP 트리(이전 current)는 새로운 상태 변경이 발생할 때 재사용된다.


<p align="center">
  <img src="https://user-images.githubusercontent.com/62097867/212477622-c6cb5e26-23af-4ad9-853a-f38b732ef618.png" width="600px" />
</p>
<p align="center">
  <img src="https://user-images.githubusercontent.com/62097867/212477627-764b8917-9a37-40df-af63-0a33b8d917a7.png" width="600px" />
</p>

![[재조정 (Reconciliation)-4.png]]

![[재조정 (Reconciliation)-5.png]]

## Reference

- https://namansaxena-official.medium.com/react-virtual-dom-reconciliation-and-fiber-reconciler-cd33ceb0478e
- https://blog.mathpresso.com/react-deep-dive-fiber-88860f6edbd0
