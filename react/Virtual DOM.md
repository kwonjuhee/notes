- [등장 배경](#%EB%93%B1%EC%9E%A5%20%EB%B0%B0%EA%B2%BD)
	- [DOM이란](#DOM%EC%9D%B4%EB%9E%80)
	- [DOM 조작의 문제점](#DOM%20%EC%A1%B0%EC%9E%91%EC%9D%98%20%EB%AC%B8%EC%A0%9C%EC%A0%90)
- [Virtual DOM이란](#Virtual%20DOM%EC%9D%B4%EB%9E%80)
- [Virtual DOM의 장점](#Virtual%20DOM%EC%9D%98%20%EC%9E%A5%EC%A0%90)
- [일반적인 오해](#%EC%9D%BC%EB%B0%98%EC%A0%81%EC%9D%B8%20%EC%98%A4%ED%95%B4)
- [Reference](#Reference)

## 등장 배경

### DOM이란

DOM은 1) HTML 문서 내 모든 노드의 구조적인 표현이기도 하고 2) 스크립트가 내용, 스타일, 문서 구조를 업데이트할 수 있도록 하는 인터페이스이기도 하다.

DOM 조작(DOM manipulation)을 통해 동적으로 웹 페이지의 내용을 변경할 수 있고, 그 과정은 다음과 같다.

1. 브라우저가 조작할 대상 element를 찾는다.
2. 해당 element와 자식 element들을 DOM에서 제거하고 업데이트한 element로 교체한다.
3. 스타일과 레이아웃(또는 하나만)을 다시 계산한다.
4. 변경된 내용을 브라우저에 다시 그린다.

### DOM 조작의 문제점

DOM은 트리 구조로 이루어져 있기 때문에 DOM을 업데이트하는 것은 매우 빠르고 가벼운 작업이다. 하지만 변경 사항이 있을 때마다 매번 UI를 리렌더링하는 과정에서 성능 이슈가 발생할 수 있다.

다음 예제에서 발생하는 문제들

- 매초마다 리렌더링이 트리거된다. (reflow, repaint)
- 변경된 부분만이 아니라 전체가 리렌더링되므로 리렌더링 될 때마다 input의 상태를 잃는다.

```javascript
const update = () => {
 const element = `
  <h3>JavaScript:</h3>
  <form>
   <input type="text"/>
  </form>
  <span>Time: ${new Date().toLocaleTimeString()}</span>
 `;

 document.getElementById("root1").innerHTML = element;
};

setInterval(update, 1000);
```

![[Virtual DOM.png]]

웹 페이지가 발전하고 DOM 조작이 점점 복잡해지면서 virtual dom 개념이 등장하게 되었다.

## Virtual DOM이란

💡 **virtual DOM**은 실제 DOM의 UI를 가상으로 표현한 개념(객체)으로 메모리 상에서 유지된다.

React는 virtual DOM에 변경 사항을 업데이트하고 나서 ReactDOM과 같은 라이브러리를 통해 real DOM과 동기화한다. 이 과정을 [[react/재조정 (Reconciliation)|재조정 (Reconciliation)]]이라 한다. 즉, VDOM은 청사진 역할을 하며 청사진은 변경될 수 있지만 변경 사항이 바로 적용되지는 않는다.

virtual DOM은 특정 기술이라기보다는 패턴에 가깝기 때문에 용어의 의미가 다양할 수 있다. React 세계에서 virtual DOM은 UI를 나타내는 객체이기 때문에 [[React Element]]와 관련이 있지만 내부적으로 [[Fiber]]라는 객체를 사용하여 컴포넌트 트리에 대한 추가 정보를 저장하고 관리한다. 이러한 fiber 객체들은 virtual DOM 구현의 일부로 간주될 수 있다.


## Virtual DOM의 장점

- ⭐ DOM 조작의 문제점을 해결 : 모든 dom 변경 사항을 real DOM이 아닌 메모리 상에서 먼저 적용하고 **변경된 부분만 real DOM과 동기화**하는 방식으로 동작하기 때문에 **reflow, repaint 비용을 최소화**할 수 있다.

	![[Virtual DOM-2.png]]

	> 브라우저가 DOM 변경 사항이 있을 때마다 매번 무조건 reflow를 발생시키는 것은 아니다. 브라우저도 어느정도 reflow를 최소화하려고 한다. 연속적인 DOM 수정이 일어날 경우 대기했다가 한번의 reflow와 repaint로 처리한다. 따라서 자바스크립트 코드에서 read 작업과 write 작업을 배치하는 것이 좋다. ([[Layout Thrashing#1. Batch Reads and Writes]])
	> 
	> => 다만 React를 사용하면 상태 변경 작업, 일괄 처리를 라이브러리가 맡아서 처리하기 때문에 개발자가 이를 고려하지 않아도 되어 일을 더 쉽게 만들 수 있다. 

- React의 **선언적 API**를 가능하게 한다. React에게 UI에 원하는 상태를 알려주고 DOM이 해당 상태와 일치하는지 확인한다. 이것은 attribute 조작, 이벤트 핸들링, DOM 업데이트를 추상화한다.

- real DOM에 종속적이지 않기 때문에 브라우저 환경이 아니더라도 사용할 수 있다.


## 일반적인 오해

> 🚨 virtual DOM이 real DOM보다 무조건 빠르고 성능이 좋은게 아니다.

virtual DOM도 마지막에는 real DOM 작업을 한다. 결국 diffing + DOM 조작이기 때문에 diffing이 오히려 오버헤드가 될 수도 있다.

처리 자체를 더 빠르게 완료하는 것이 아니라 변경 사항이 많을 때 전체 페이지가 아닌 일부만 업데이트하도록 하여 효율성을 높인 방식이다.

virtual DOM은 리렌더링시 최소한의 DOM 연산을 할 수 있는 매커니즘을 제공하는 것에 의의가 있다. 


## Reference

- https://reactjs.org/docs/faq-internals.html
- [does-the-browser-re-render-the-whole-page-on-changes-or-only-the-specific-elements](https://stackoverflow.com/questions/25464939/does-the-browser-re-render-the-whole-page-on-changes-or-only-the-specific-elemen/25471007#25471007)
- [executing-multiple-dom-updates-with-javascript-efficiently](https://stackoverflow.com/questions/37039667/executing-multiple-dom-updates-with-javascript-efficiently)
- [how-exactly-is-reacts-virtual-dom-faster](https://stackoverflow.com/questions/61245695/how-exactly-is-reacts-virtual-dom-faster/61272492#61272492)
- https://blog.logrocket.com/virtual-dom-react/