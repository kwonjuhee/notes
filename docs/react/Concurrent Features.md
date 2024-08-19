

### startTransition

- 느린 차선(낮은 우선순위)을 만들어주는 API
- 콜백 함수가 즉시 실행되지만 상태 변경의 우선순위가 낮아진다.
- 낮은 우선순위를 부여받으면 중요한 업데이트에 CPU 양보

API

```jsx
// 높은 우선순위 업데이트 예약
setStateA(val1)

// 상태 업데이트를 전환으로 표시
startTransition(() => {
  // 낮은 우선순위 업데이트 예약
  setStateB(val2)
})
```

내부 구현

```javascript
// pseudo code

let isInTransition = false

function startTransition(fn) {
  isInTransition = true
  fn()
  isInTransition = false
}

function setState(value) {
  stateQueue.push({
    nextState: value,
    isTransition: isInTransition
  })
}
```

- 무엇을 해결하는가
	- CPU Bound UX 문제를 해결
	- 대규모 화면 업데이트 중 응답성을 유지
	- 상태 전환 중에 시각적 피드백을 제공

- 어떻게 작동하는가
	- Yielding : 렌더링 과정을 작게 분할하고 일시 중지할 수 있음
	- Interrupting : 동시성 모드에서 업데이트에 대해 우선 순위가 있음
	- 이전 결과 건너뛰기 : 현재 상태만 반영하도록 중간 상태 반영을 건너 뜀

- setTimeout으로 task queue에 들어간 작업은 순서대로 처리되고 취소될 수 없다.

Urgent Updates

- 입력, 클릭, 누르기 등과 같은 직접적인 상호 작용을 반영하기
- 즉각적 응답이 필요하다
- React 18은 업데이트를 기본적으로 urgent로 처리

Transition Updates

- 하나의 view에서 다른 view로 전환하기
- 전환되는 중간과정을 기대하지 않는다.
- 결과에 시간이 소요되는 것을 예상한다.
- Load Transition, Refresh Transition


### Streaming SSR with selective hydration

기존 SSR의 문제

- 어떤 것이라도 보여주기 위해 모든 data를 fetch해야 함
- 어떤 것이라도 hydrate하기 전에 필요한 모든 것을 로드해야 함
- 어떤 것이라도 상호작용하기 위해 모든 부분을 hydrate해야 함

![[Concurrent Features.png]]

Case 1. 필요한 데이터를 모두 불러오기 전에 HTML 스트리밍하기

![[Concurrent Features-2.png]]
![[Concurrent Features-3.png]]

Case 2. React.lazy와 함께 모든 코드가 로드되기 전에 Hydrate

![[Concurrent Features-4.png]]


Case 3. 모든 HTML이 스트리밍되기 전에 하이드레이션

![[Concurrent Features-5.png]]

Case 4. 모든 컴포넌트가 하이드레이션되기 전에 상호작용

![[Concurrent Features-6.png]]


Case 5. Hydration 우선 순위 조정

![[Concurrent Features-7.png]]


### Suspense 변화

### Automatic Batching

### Concurrent 모드 기능에 대한 공통 주제

HCI에 대한 연구 결과가 실제 UI와 통합되도록 돕는 것

- 화면 간 전환에서 로딩 중 상태를 너무 많이 표시하면 UX 품질이 낮아진다.
- 빠르게 처리되기를 기대하는 상호작용과 느려도 문제 없는 상호작용
- 동시성 모드의 목적은 HCI 연구 결과를 추상화하고 구현할 수 있는 방법을 제공하는 것