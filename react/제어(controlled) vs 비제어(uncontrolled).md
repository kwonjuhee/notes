
## HTML form element

- form 엘리먼트(input, textarea, select)는 자체적으로 내부 상태를 갖는다. (value attribute)
- 사용자의 입력 데이터가 DOM에 저장되는 것

## 제어 컴포넌트 (controlled component)

- React 상태를 "신뢰 가능한 단일 출처 (single source of truth)"로 만들어 form 엘리먼트의 내부 상태와 React의 상태를 결합하는 방식
- React 컴포넌트가 form에 발생하는 사용자 입력 값을 제어한다.
- 이러한 방식으로 **React에 의해 입력 값이 제어되는 form 엘리먼트**를 "제어 컴포넌트"라고 한다.

- form 엘리먼트의 값으로 React 상태 값을 사용하고 입력 값이 변경될 때마다 상태 업데이트를 수행하도록 한다.

- 변경된 value가 매번 state로 push되므로 input value와 react state가 항상 최신의 값으로 일치함이 보장된다.
- 매 입력마다 state가 변경되므로 리렌더링이 계속 발생한다.

- 언제 사용? => 매 입력마다 입력값으로 어떤 동작을 해야하는 경우
	- 입력 값을 다른 곳에 렌더링 해야할 때
	- 사용자 입력에 대한 즉각적인 validation


## 비제어 컴포넌트 (uncontrolled component)

- DOM 자체에서 form 데이터를 다루는 방법
- ref를 사용하여 DOM에서 form 값을 가져올 수 있다.
- DOM에 신뢰 가능한 출처를 유지하므로 React와 non-React 코드를 통합하는 것이 쉬울 수 있다.
- 빠르고 간편하게 적은 코드를 작성할 수 있다.
- 보통은 제어 컴포넌트 사용을 권장

- React 렌더링 생명주기에서 form 엘리먼트의 `value` 어트리뷰트는 DOM의 `value`를 대체한다.
- 비제어 컴포넌트에서 `defaultValue` 어트리뷰트로 초기값을 지정할 수 있다.
- 컴포넌트가 마운트된 이후에 `defaultValue` 어트리뷰트를 변경해도 DOM의 값이 업데이트되지 않는다.

- \<input type="file">은 프로그래밍적으로 값을 설정할 수 없고 사용자만이 값을 설정할 수 있기 때문에 항상 비제어 컴포넌트이다.

- 값이 필요할 때 pull해서 사용한다.
- 데이터가 항상 일치함을 보장하지 못한다.
- state가 아니므로 리렌더링이 발생하지 않는다.

- 언제 사용? => 원하는 시점에 값을 가져오면 될때
	- 매 입력마다 최신의 값이 꼭 필요하지 않을 때
	- 매 렌더링마다 복잡한 연산이 발생할때

## 신뢰 가능한 단일 출처 (single source of truth)

- 하나의 상태를 나타내는 state는 한 곳에만 존재해야 한다.
- 출처가 다양해지면 값을 관리하기 & 동기화하기 어려워진다.
- 컴포넌트간 공유되는 state는 복제하는 대신 공유되는 부모로 lift up하거나 자식으로 pass down 한다.


## React Docs (new)


일부 local state를 가진 컴포넌트를 "(비제어)uncontrolled"라고 부르는 것이 일반적이다.

반대로 컴포넌트의 주요한 정보가 local state가 아닌 props에 의해 주도되는 경우 "(제어)controlled"라 한다. 이렇게 하면 부모 컴포넌트가 그 동작을 완전히 지정할 수 있다.

비제어 컴포넌트는 구성이 덜 필요하기 때문에 부모 컴포넌트 내에서 사용하기가 더 쉽다. 하지만 함께 조정하려는 경우 유연성이 떨어진다. 

제어 컴포넌트는 최대한의 유연성을 제공하지만 부모 컴포넌트가 props로 완전히 구성해야한다.

실제로 제어와 비제어는 엄격한 기술 용어가 아니며, 각 컴포넌트에는 일반적으로 local 상태와 props가 어느정도 혼합되어 있다. 하지만 컴포넌트가 어떻게 설계되고 어떤 기능을 제공하는지 설명하는데 유용한 용어이다.

컴포넌트를 작성할 때는 컴포넌트에서 어떤 정보를 제어해야 하는지(via props), 어떤 정보를 제어하지 않아야 하는지(via state) 고려해야한다. 하지만 나중에 언제든지 마음을 바꾸고 리팩터링할 수 있다.


https://ko.reactjs.org/docs/forms.html#controlled-components

https://react.dev/learn/sharing-state-between-components#controlled-and-uncontrolled-components