https://overreacted.io/a-complete-guide-to-useeffect/

## Each Render Has Its Own Props and State

> ### 💡각 렌더링은 고유의 props와 state를 갖는다.
> **상태(state)** 는 상태 변화를 "관찰(watch)"하여 자동으로 업데이트하는 것이 아니라 그저 `컴포넌트 함수 안에서 상수로 존재하는 값`이다. 리액트는 `setState`가 호출되면 변경된 상태 값과 함께 컴포넌트를 다시 호출한다. 즉, **특정 렌더링 안에 있는 상태 값은 불변**하며 각 렌더링은 **렌더링마다 격리된 고유한 상태 값**을 보게 된다.

이펙트에 대해 얘기하기 전에 먼저 렌더링에 대해 얘기할 필요가 있다.

```jsx
function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
```

6번째 줄은 무엇을 의미할까? `count`가 어찌저찌 상태 변화를 "관찰(watch)"하여 자동으로 업데이트한다는 것을 의미할까? 이것은 정확한 멘탈 모델이 아니다.

이 예제에서 `count`는 단지 숫자이다. 이것은 data binding, watcher, proxy, 혹은 그 어떤 것도 아니다.

```jsx
const count = 42;
// ...
<p>You clicked {count} times</p>
// ...
```

컴포넌트가 처음 렌더링될 때 `useState()`로부터 얻어온 `count` 변수는 `0`이다. `setCount(1)`을 호출하면 리액트는 컴포넌트를 다시 호출하고, `count` 변수는 1이 될 것이다. 그리고 계속 반복한다.

```jsx
// During first render
function Counter() {
  const count = 0; // Returned by useState()
  // ...
  <p>You clicked {count} times</p>
  // ...
}

// After a click, our function is called again
function Counter() {
  const count = 1; // Returned by useState()
  // ...
  <p>You clicked {count} times</p>
  // ...
}

// After another click, our function is called again
function Counter() {
  const count = 2; // Returned by useState()
  // ...
  <p>You clicked {count} times</p>
  // ...
}
```

state를 업데이트할 때마다 리액트는 컴포넌트를 호출한다. 각 렌더링 결과는 함수 내부에서 상수로 존재하는 값인 고유의 `count` 상태 값을 "바라본다(see)".

따라서 해당 라인은 어떠한 특별한 데이터 바인딩을 하지 않는다.

```jsx
<p>You clicked {count} times</p>
```

이것은 렌더링 결과물에 숫자를 내장하는 것에 불과하다. 그 숫자는 리액트에 의해 제공된다.
`setCount`를 호출하면 리액트는 다른 `count` 값과 함께 컴포넌트를 다시 호출한다. 그러면 리액트는 가장 최신의 렌더링 결과물과 일치하도록 DOM을 업데이트한다.

여기서 명심할 점은 특정 렌더링 안에 있는 `count` 상수는 시간이 지나도 변하지 않는다는 것이다. 다시 호출되는 것은 컴포넌트이며, 각 렌더링은 렌더링마다 격리된 고유한 `count` 값을 "보게(see)" 된다.

## Each Render Has Its Own Event Handlers

> ### 💡각 렌더링은 고유의 이벤트 핸들러를 갖는다.
> props와 state와 마찬가지로 이벤트 핸들러 또한 특정 렌더링에 속해있다. 이벤트 핸들러는 클로저의 특성으로 인해 **렌더링 시점의 고유한 state를 기억하고 사용**한다.

```jsx
function Counter() {
  const [count, setCount] = useState(0);

  function handleAlertClick() {
    setTimeout(() => {
      alert('You clicked on: ' + count);
    }, 3000);
  }
  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
      <button onClick={handleAlertClick}>
        Show alert
      </button>
    </div>
  );
}
```

단계별로 다음 과정을 실행해본다고 하면 얼럿에는 3이 나올 것이다. 얼럿은 버튼을 클릭했을 때의 상태를 "캡처(capture)"할 것이다.

- 카운터를 3으로 증가시킨다
- “Show alert” 을 누른다
- 타임아웃이 실행되기 전에 카운터를 5로 증가시킨다

왜 이렇게 동작할까?

앞서 말했던 것처럼 함수는 여러번 호출되지만(렌더링마다 한번씩), 그때마다 함수 안의 `count` 값은 상수이자 특정한 값(그 렌더링의 상태)이다. 이것은 리액트에만 국한된 것이 아니라 **보통의 함수도 비슷한 방식으로 동작**한다.

```javascript
function sayHi(person) {
  const name = person.name;
  setTimeout(() => {
    alert('Hello, ' + name);
  }, 3000);
}

let someone = {name: 'Dan'};
sayHi(someone);

someone = {name: 'Yuzhi'};
sayHi(someone);

someone = {name: 'Dominic'};
sayHi(someone);
```

이 예제에서 외부의 someone 변수는 여러 번 재할당된다. 하지만 sayHi 내부에서 특정 호출마다 person과 엮여있는 name이라는 지역 상수가 존재한다. 이 상수는 local이기 때문에 호출 간에 분리되어 있다. 결과적으로 타임아웃이 될 때마다 각각의 얼럿은 고유의 `name`을 기억하게 된다.

이는 어떻게 이벤트 핸들러가 클릭 시점의 `count`를 캡처하는지 설명한다. 각 렌더링이 고유한 `count`를 보는 것처럼 **고유한 "버전"의 `handleAlertClick`을 반환**한다. **이러한 각 버전은 고유한 `count`를 "기억(remember)"** 한다.

```jsx
// During first render
function Counter() {
  // ...
  function handleAlertClick() {
    setTimeout(() => {
      alert('You clicked on: ' + 0);
    }, 3000);
  }
  // ...
  <button onClick={handleAlertClick} /> // The one with 0 inside
  // ...
}

// After a click, our function is called again
function Counter() {
  // ...
  function handleAlertClick() {
    setTimeout(() => {
      alert('You clicked on: ' + 1);
    }, 3000);
  }
  // ...
  <button onClick={handleAlertClick} /> // The one with 1 inside
  // ...
}

// After another click, our function is called again
function Counter() {
  // ...
  function handleAlertClick() {
    setTimeout(() => {
      alert('You clicked on: ' + 2);
    }, 3000);
  }
  // ...
  <button onClick={handleAlertClick} /> // The one with 2 inside
  // ...
}
```

이벤트 핸들러가 **특정 렌더링에 "속해 있으며(belong)", 얼럿 표시 버튼을 클릭할 때 그 렌더링 시점의 `count` 상태를 계속 사용**하는 이유가 바로 여기에 있다.

특정 렌더링 안에서 props와 state는 영원히 같은 상태로 유지한다. 그러나 props와 state가 렌더링마다 격리되면 이를 사용하는 어떤 값(이벤트 핸들러를 포함해서)도 격리된다. 이들은 또한 특정 렌더링에 속해있다. 따라서 이벤트 핸들러 내부의 비동기 함수라 할지라도 같은 `count` 값을 "보게(see)"될 것이다.

NOTE: 구체적인 `count` 값을 `handleAlertClick` 함수에 바로 인라인 처리했다. `count`는 특정 렌더링 내에서 변경될 수 없기 때문에 이렇게 치환하여 보는 것은 안전하다. 이 값은 `const`로 선언되고 숫자이기 때문이다. 객체와 같은 다른 값에 대해서도 같은 방식으로 생각하는 것이 안전하지만, 상태 변경을 피하는 데에 동의하는 경우에만 가능하다. 새로 생성된 객체를 변경하는 대신 새로 생성된 객체로 `setSomething(newObj)`을 호출하는 것은 괜찮다. 이전 렌더링에 속하는 상태가 그대로 유지되기 때문이다.

## Each Render Has Its Own Effects

> ### 💡각 렌더링은 고유의 effect를 갖는다.
> 이펙트 함수는 이벤트 핸들러와 같은 방식으로 특정 렌더링에 속해있으며 자신이 속한 특정 렌더링 시점의 props와 state를 본다.

```jsx
function Counter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = `You clicked ${count} times`;
  });

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
```

여기서 effect가 어떻게 최신의 `count` 상태를 읽어들일까?

이미 `count`는 특정 컴포넌트 렌더링에 포함되는 상수라고 배웠다. 이벤트 핸들러는 그들이 속해있는 렌더링으로부터 `count` 상태를 "본다". `count`는 그 스코프 안에 있는 변수이기 때문이다. effect도 동일하다!

변화하지 않는 effect 안에서 변화하는 `count` 변수가 어떻게든 변경된다는 것이 아니다. effect 함수 자체가 매 렌더링마다 달라진다. 각 effect 버전은 그것이 "속해있는" 렌더링의 `count` 값을 "본다".

```jsx
// During first render
function Counter() {
  // ...
  useEffect(
    // Effect function from first render
    () => {
      document.title = `You clicked ${0} times`;
    }
  );
  // ...
}

// After a click, our function is called again
function Counter() {
  // ...
  useEffect(
    // Effect function from second render
    () => {
      document.title = `You clicked ${1} times`;
    }
  );
  // ...
}

// After another click, our function is called again
function Counter() {
  // ...
  useEffect(
    // Effect function from third render
    () => {
      document.title = `You clicked ${2} times`;
    }
  );
  // ..
}
```

리액트는 effect 함수를 기억했다가 변경 사항을 DOM에 flushing하고 브라우저가 스크린에 paint한 후 그것을 실행한다.

따라서 비록 하나의 개념으로 effect를 말하고 있지만 이것은 **모든 렌더링마다 다른 함수**로 표현되며, **각 effect 함수는 자신이 "속한(belong)" 특정 렌더링의 props와 state를 "본다(see)".**

개념적으로 effect는 렌더링 결과의 일부라고 생각할 수 있다.

엄밀히 말하면 그렇지 않다. (어색한 구문이나 런타임 오버헤드없이 hook 구성을 허용하기 위해서) 하지만 구축 중인 멘탈 모델에서 effect 함수는 이벤트 핸들러와 같은 방식으로 특정 렌더링에 속해있다고 생각하면 된다.

더 자세하게 이해할 수 있도록, 첫 번째 렌더링을 되짚어 보겠다.

> - 리액트: state가 0 일 때의 UI를 보여줘.
> - 컴포넌트:
>   - 여기 렌더링 결과물로 `<p>You clicked 0 times</p>` 가 있어.
>   - 그리고 모든 처리가 끝나고 이 이펙트를 실행하는 것을 잊지 마: `() => { document.title = 'You clicked 0 times' }`
> - 리액트: 좋아. UI를 업데이트 하겠어. 이봐 브라우저, 나 DOM에 뭘 좀 추가하려고 해.
> - 브라우저: 좋아, 화면에 그려줄게.
> - 리액트: 좋아 이제 컴포넌트 네가 준 이펙트를 실행할거야.
>   - `() => { document.title = 'You clicked 0 times' }` 를 실행하는 중.

버튼을 클릭하면

> - 컴포넌트: 이봐 리액트, 내 상태를 1 로 변경해줘.
> - 리액트: 상태가 1 일때의 UI를 줘.
> - 컴포넌트:
>   - 여기 렌더링 결과물로 `<p>You clicked 1 times</p>` 가 있어.
>   - 그리고 모든 처리가 끝나고 이 이펙트를 실행하는 것을 잊지 마: `() => { document.title = 'You clicked 1 times' }`
> - 리액트: 좋아. UI를 업데이트 하겠어. 이봐 브라우저, 나 DOM에 뭘 좀 추가하려고 해.
> - 브라우저: 좋아, 화면에 그려줄게.
> - 리액트: 좋아 이제 컴포넌트 네가 준 이펙트를 실행할거야.
>   - `() => { document.title = 'You clicked 1 times' }` 를 실행하는 중.


## Each Render Has Its Own… Everything

> ### 💡각 렌더링마다 고유한 모든 것이 있다.
> 클래스 컴포넌트에서 `this.state`는 항상 최신 상태를 가리킨다. 특정 렌더링에 속해있는 고유한 값을 참조하려면 클로저를 이용하면 된다.

함수 컴포넌트와 클래스 컴포넌트에서 버튼을 5번 클릭했을 때 로그 비교 

```jsx
function Counter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      console.log(`You clicked ${count} times`);
    }, 3000);
  });

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
```
```
You clicked 0 times

You clicked 1 times
You clicked 2 times
You clicked 3 times
You clicked 4 times
You clicked 5 times
```

클래스에서 `this.state`가 동작하는 방식은 다르다. 다음 예에서 `this.state.count`는 특정 렌더링에 속해있는 값이 아니라 항상 최신 값을 가리킨다.

```javascript
 componentDidUpdate() {
    setTimeout(() => {
      console.log(`You clicked ${this.state.count} times`);
    }, 3000);
}
```
```
You clicked 0 times

You clicked 5 times
You clicked 5 times
You clicked 5 times
You clicked 5 times
You clicked 5 times
```

이 문제는 클로저 자체의 문제가 아니라 **리액트가 `this.state`를 최신 상태를 가리키도록 변경하기 때문**이다.

클로저는 접근하려는 값이 절대 변하지 않을 때 유용하다. 본질적으로 상수를 참조하고 있기 때문에 생각하기 쉽다. 그리고 앞서 설명했듯이 props와 state는 특정 렌더링 내에서 절대 변경되지 않는다. 참고로 클로저를 이용하면 클래스 버전을 수정할 수 있다.

```javascript
componentDidMount() {
    const count = this.state.count;
    setTimeout(() => {
      console.log(`You clicked ${count} times`);
    }, 3000);
}
```

## Swimming Against the Tide

> ### 💡흐름을 거슬러 올라가기
> 

다시 한번 중요! 컴포넌트 렌더링 안에 있는 모든 함수는 (이벤트 핸들러, 이펙트, 타임아웃, API 호출 포함) 이를 정의한 렌더링 호출시의 props와 state를 캡처한다.

따라서 아래의 두 예제는 동일하다.

```jsx
function Example(props) {
  useEffect(() => {
    setTimeout(() => {
      console.log(props.counter);
    }, 1000);
  });
  // ...
}
```

```jsx
function Example(props) {
  const counter = props.counter;
  useEffect(() => {
    setTimeout(() => {
      console.log(counter);
    }, 1000);
  });
  // ...
}
```

props나 state를 일찍 읽어들였는지는 중요하지 않다. 그들은 변하지 않을 것이다. 하나의 렌더링 스코프 안에서 props와 state는 동일하게 유지된다.

물론 때로는 이펙트에 정의된 콜백 안에서 captured value가 아닌 latest value를 읽어들이는걸 원할 것이다. 가장 쉬운 방법은 이 글의 마지막 섹션에서 설명한 것처럼 refs를 사용하는 것이다.

**과거 렌더링 함수에서 미래의 props나 state를 읽으려는 경우 흐름을 거스르는 것이 될 수 있다는 점에 유의해야 한다.** 잘못된 것은 아니지만 (경우에 따라 필요할 수 있다) 패러다임에서 벗어나는 것이 덜 "clean"해 보일 수 있다. 이는 어떤 코드가 취약하고 타이밍에 따라 달라지는지 강조하는 데에 도움이 되므로 의도한 결과이다. class에서는 이런 일이 언제 발생하는지 잘 드러나지 않는다.

다음은 class 동작을 복제하는 counter 예제의 버전이다.

```jsx
function Example() {
  const [count, setCount] = useState(0);
  const latestCount = useRef(count);

  useEffect(() => {
    // Set the mutable latest value
    latestCount.current = count;
    setTimeout(() => {
      // Read the mutable latest value
      console.log(`You clicked ${latestCount.current} times`);
    }, 3000);
  });
  // ...
```

리액트에서 무언가를 변경하는 것이 이상하게 보일 수 있다. 하지만 이것이 바로 리액트가 class에서 `this.state`를 재할당하는 방식이다. 캡처된 props와 state와 달리 `latestCount.current`를 읽는 것은 특정 콜백에서 동일한 값을 얻을 수 있다는 보장이 없다. 정의에 따라 이 값은 언제든지 변경할 수 있다. 그렇기 때문에 기본값이 아니며 사용자가 직접 택해야 한다.

## So What About Cleanup?

어떤 이펙트는 cleanup 단계를 가질 수도 있다. 본질적으로 이것의 목적은 특정 상황에서 이펙트를 "undo"하는 것이다.

```jsx
useEffect(() => {
    ChatAPI.subscribeToFriendStatus(props.id, handleStatusChange);
    return () => {
      ChatAPI.unsubscribeFromFriendStatus(props.id, handleStatusChange);
    };
  });
```

첫 렌더링에서 props는 `{id: 10}`이고 두번째 렌더링에서는 `{id: 20}`해보자. 아마도 다음과 같은 일이 발생한다고 생각할 수 있다.

- 리액트는 `{id: 10}`에 대한 이펙트를 cleanup한다.
- 리액트는 `{id: 20}`에 대한 UI를 렌더링한다.
- 리액트는 `{id: 20}`에 대한 이펙트를 실행한다.

(실제는 조금 다르다.)

이 멘탈 모델대로라면 cleanup은 리렌더링 전에 실행되므로 old props를 "보고" 새 이펙트는 리렌더링 후에 실행되므로 new props를 "본다"고 생각할 수 있다. 이는 클래스 라이프사이클에서 직접 가져온 멘탈 모델이며 여기서는 정확하지 않다. 이유를 살펴보자.

리액트는 브라우저가 페인트하도록 한 후에만 이펙트를 실행한다. 이것은 대부분의 이펙트가 화면 업데이트를 block할 필요가 없기 때문에 앱을 더 빠르게 만든다. 이펙트 클린업도 지연된다. 이전 이펙트는 new props로 리렌더링된 후에 정리된다.

- 리액트는 `{id: 20}`에 대한 UI를 렌더링한다.
- 브라우저가 페인트한다. 우리는 화면에서 `{id: 20}`에 대한 UI를 본다.
- 리액트는 `{id: 10}`에 대한 이펙트를 클린업한다.
- 리액트는 `{id: 20}`에 대한 이펙트를 실행한다.

어떻게 prop이 `{id: 20}`으로 바뀌고 나서도 이전 이펙트 클린업이 여전히 예전 값인 `{id: 10}`을 "보는"것일까?

이전 섹션을 인용해보자면 "컴포넌트 렌더링 안에 있는 모든 함수는 (이벤트 핸들러, 이펙트, 타임아웃, API 호출 포함) 이를 정의한 렌더 호출시의 props와 state를 캡처한다."

이제 답이 명확해졌다. 이펙트 클린업은 "latest" props를 읽지 않는다. 그것이 정의된 렌더링에 속해있는 props를 읽는다.

```jsx
// First render, props are {id: 10}
function Example() {
  // ...
  useEffect(
    // Effect from first render
    () => {
      ChatAPI.subscribeToFriendStatus(10, handleStatusChange);
      // Cleanup for effect from first render
      return () => {
        ChatAPI.unsubscribeFromFriendStatus(10, handleStatusChange);
      };
    }
  );
  // ...
}

// Next render, props are {id: 20}
function Example() {
  // ...
  useEffect(
    // Effect from second render
    () => {
      ChatAPI.subscribeToFriendStatus(20, handleStatusChange);
      // Cleanup for effect from second render
      return () => {
        ChatAPI.unsubscribeFromFriendStatus(20, handleStatusChange);
      };
    }
  );
  // ...
}
```

이렇게 기본적으로 리액트는 페인팅 이후 이펙트를 다루고 앱을 더 빠르게 만들어 준다. 코드에서 old props가 필요하다면 여전히 남아있다.

## Synchronization, Not Lifecycle

리액트는 초기 렌더링 결과와 업데이트를 설명하는 것을 통합한다는 것이다. 이것은 프로그램의 엔트로피를 줄여준다.

```jsx
function Greeting({ name }) {
  return (
    <h1 className="Greeting">
      Hello, {name}
    </h1>
  );
}
```

`<Greeting name="Dan" />`을 렌더링 한 다음에 `<Greeting name="Yuzhi" />`를 렌더링하든, 아니면 `<Greeting name="Yuzhi" />`만 렌더링하든 상관없다. 결국 두 경우 모두 "Hello, Yuzhi"가 표시될 것이다.

리액트는 현재 props와 state에 따라 DOM을 동기화한다. 렌더링할때 "mount"와 "update"를 구분하지 않는다.

이펙트도 비슷한 방식으로 생각해야 한다. useEffect를 사용하면 props와 state에 따라 리액트 tree 외의 것들을 동기화할 수 있다.

```jsx
function Greeting({ name }) {
  useEffect(() => {
    document.title = 'Hello, ' + name;
  });
  return (
    <h1 className="Greeting">
      Hello, {name}
    </h1>
  );
}
```

이것은 익숙한 mount/update/unmount 멘탈 모델과는 미묘하게 다르다. 이를 내재화하는 것이 중요하다. 컴포넌트가 처음 렌더링되는지 아닌지에 따라 다르게 동작하는 이펙트를 작성하려고 한다면, 이는 조류에 역행하는 것이다. 결과가 "목적지"가 아닌 "여정"에 따라 달라진다면 동기화에 실패한다.

props A, B, C로 렌더링했는지, 아니면 C로 즉시 렌더링했는지는 중요하지 않아야 한다. 일시적인 차이가 있을 수 있지만 (e.g. 데이터를 가져오는 동안) 결국 최종 결과는 동일해야 한다.

물론 모든 렌더링에서 모든 이펙트를 실행하는 것은 효율적이지 않을 수 있다. (경우에 따라 무한 루프로 이어질 수도 있다.)

그렇다면 이 문제를 어떻게 해결할 수 있을까?

## Teaching React to Diff Your Effects

리액트는 렌더링할 때마다 DOM을 건드리지 않고 실제로 변경되는 부분만 업데이트한다.

```jsx
<h1 className="Greeting">
  Hello, Dan
</h1>
```

to

```jsx
<h1 className="Greeting">
  Hello, Yuzhi
</h1>
```

리액트는 두 객체를 비교한다.

```javascript
const oldProps = {className: 'Greeting', children: 'Hello, Dan'};
const newProps = {className: 'Greeting', children: 'Hello, Yuzhi'};
```

각 props를 보고 children이 변경되어 DOM 업데이트가 필요하지만 className은 그렇지 않다고 판단한다. 그래서 그저 다음과 같이 한다.

```javascript
domNode.innerText = 'Hello, Yuzhi';
// No need to touch domNode.className
```

이펙트에도 이러한 방법을 적용할 수 있을까? 이펙트를 적용하는 것이 불필요할 때 이펙트를 다시 실행하지 않도록 하면 좋을 것이다.

예를 들어, 컴포넌트가 상태 변경으로 인해 리렌더링될 수 있다.

```jsx
function Greeting({ name }) {
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    document.title = 'Hello, ' + name;
  });

  return (
    <h1 className="Greeting">
      Hello, {name}
      <button onClick={() => setCounter(count + 1)}>
        Increment
      </button>
    </h1>
  );
}
```

하지만 이 이펙트는 counter 상태를 사용하지 않는다. name prop으로 document.title을 동기화하지만 name prop은 동일하다. counter 상태가 변경될 때마다 document.title을 재할당하는 것은 이상적이지 않은 것 같다.

그렇다면 리액트가 그냥 이펙트를 비교해도 될까?

```javascript
let oldEffect = () => { document.title = 'Hello, Dan'; };
let newEffect = () => { document.title = 'Hello, Dan'; };
// Can 리액트 see these functions do the same thing?
```

그렇지 않다. 리액트는 함수를 호출하지 않고는 함수가 무엇을 하는지 알아낼 수 없다. (위 코드는 실제로 특정 값을 포함하지 않고 단지 name prop를 덮어썼을 뿐이다. )

그렇기 때문에 불필요하게 이펙트를 재실행하지 않으려면 useEffect에 의존성 배열("deps"라고도 함)을 인자로 제공할 수 있다.

```jsx
useEffect(() => {
    document.title = 'Hello, ' + name;
  }, [name]); // Our deps
```

우리가 리액트에게 "이봐, 함수 내부를 볼 수는 없지만 렌더링 범위에서 name만 사용하고 다른 것은 아무것도 사용하지 않을 거야"라고 말하는 것과 같다.

이 이펙트가 실행된 현재와 이전 사이에 각각의 값이 동일하다면, 동기화할 것이 없으므로 리액트는 이펙트를 스킵할 수 있다.

```jsx
const oldEffect = () => { document.title = 'Hello, Dan'; };
const oldDeps = ['Dan'];

const newEffect = () => { document.title = 'Hello, Dan'; };
const newDeps = ['Dan'];

// 리액트 can't peek inside of functions, but it can compare deps.
// Since all deps are the same, it doesn’t need to run the new effect.
```

의존성 배열의 값 중 하나라도 렌더링 간에 다르다면 이펙트 실행을 건너뛸 수 없다. 모든 것을 동기화해라!

## Don’t Lie to 리액트 About Dependencies