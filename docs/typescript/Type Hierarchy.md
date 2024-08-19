## Hierarchy Tree

- 타입스크립트의 모든 타입은 **계층 구조**로 이루어져있다. 부모 타입을 **상위 타입(super type)**, 자식 타입을 **하위 타입(sub type)** 이라 한다.
- 상속처럼 `is-a` 관계를 형성한다.
- super type의 인스턴스를 프로그램 변경 없이 sub type의 인스턴스로 대체할 수 있어야 한다.
반대는 안됨
  - 예를 들면 "`Car` is `Vehicle`" 관계에서, `Vehicle` (상위 타입)은 `Cars`(하위 타입)으로 대체 가능하다. 

## nominal vs. structural typing

### nominal typing

- 대부분의 주류 statically-typed 언어에서 사용하는 방식 (ex. Java)
- 어떤 타입이 다른 타입의 하위 타입임을 *명시적으로* 선언해야 한다. `class Foo extends Bar`

### structural typing

- 타입스크립트가 사용하는 방식
- 코드에서 타입 관계를 명시적으로 선언할 필요가 없다.
- 타입의 집합을 포함하는지 확인
  - `Foo` 타입이 `Bar` 타입의 모든 멤버를 포함한다면 `Foo` 타입은 `Bar` 타입의 하위 타입이다.  (`Foo`가 추가적인 멤버를 갖는다 하더라도)
- 어떤 타입이 더 엄격한지 확인
  - 예를 들어, `{ name: string, age: number }` 타입은 `{ name: string }` 타입보다 더 엄격하다. 더 많은 멤버를 필요로 하기 때문.
  - 그러므로 더 엄격한 `{ name: string, age: number }` 타입은 `{ name: string }` 타입의 sub type이다. 

## 할당 가능성을 체크하는 두 가지 방법

- type cast

- `extends` 키워드

```tsx
type A = string extends unknown? true : false;  // true
type B = unknown extends string? true : false; // false
```

## the top of the tree

- 모든 타입의 상위 타입인 두 가지 타입 => `any`와 `unknown`
- 어떤 타입의 어떤 값이라도 할당을 허용한다.

## upcast & downcast

<img src="https://user-images.githubusercontent.com/62097867/222366711-3a629688-0c66-43f5-b716-3da136bbf847.png" width="600px" />

### 업캐스트 (upcast)

- 하위 타입을 상위 타입에 할당하는 것
- 업캐스트는 안전하므로 암묵적으로 수행할 수 있다.
- 예를 들면 모든 string 타입은 any 타입과 unknown 타입의 서브타입이므로 다음과 같이 할당할 수 있다.

```tsx
let string: string = 'foo'
let any: any = string // ✅ ⬆️upcast
let unknown: unknown = string // ✅ ⬆️upcast
```

### 다운캐스트(downcast)

- 업캐스트와 반대로 상위타입을 하위타입에 할당하는 것
- upcast와 반대로 downcast는 안전하지 않고 대부분의 strongly typed 언어는 이것을 자동으로 허용하지 않는다.
- unknown 타입을 string 타입에 할당하면 타입 에러가 발생하는 것을 확인할 수 없다. 다운캐스트는 명시적으로 타입 검사기를 우회하지 않고 수행될 수 없기 때문이다.

```tsx
let any: any
let unknown: unknown
let stringA: string = any // ✅ ⬇️downcast - it is allowed because `any` is different..
let stringB: string = unknown // ❌ ⬇️downcast
```

💡 하지만 any는 예외다. any 타입을 다운캐스트하는 것은 허용된다.

- any는 타입스크립트에서 자바스크립트 세계로 탈출하는 backdoor 역할을 하기 위해 존재한다. 자바스크립트의 유연성을 반영하는 것
- 런타임 언어는 여전히 자바스크립트이기 때문

## the bottom of the tree

`never` 타입은 top types(any, unknown)의 반대 타입처럼 동작한다. 모든 타입의 하위 타입이기 때문에 any를 포함해서 어떠한 값도 허용하지 않는다.

**절대 반환되지 않는 함수**에서 반환 값에 타입을 지정하는 경우에 사용한다.
- 항상 예외를 던지는 경우
- 프로그램이 종료될 때까지 무한 루프를 도는 경우 (이벤트 루프같은)

```tsx
function fnThatNeverReturns(): never {
	throw 'It never returns'
}

const number: number = fnThatNeverReturns() // ✅ ⬆️upcast
```

💡 never 타입이 업캐스트가 가능한 이유

- 기술적으로 불가능하기 때문에 허용한다.
  - 타입스크립트는 never 타입을 empty type으로 만든다.
  - **런타임에 실제 값을 가질 수 없고**, 프로퍼티에 접근하는 등 타입에 대해 아무것도 할 수 없는 타입
- 컴파일러가 함수가 절대 리턴하지 않고 number 변수에 아무것도 할당되지 않을 것이라는 걸 알기 때문이다.
- 타입은 런타임시 데이터가 올바른지 보장하기 위해 존재한다. 할당이 실제로 런타임에 절대 일어나지 않는다면 컴파일러는 타입이 중요하지 않다는 것을 알고 있다.

## types in between

- string literal type
  - `let stringLiteral: 'hello' = 'hello'`과 같은 문자열 리터럴 타입은 `string`타입으로 업캐스트될 수 있다.
- object
```tsx
type UserWithEmail = {name: string, email: string}
type UserWithoutEmail = {name: string}

type A = UserWithEmail extends UserWithoutEmail ? true : false // true ✅ ⬆️upcast
```
- empty object
```tsx
const emptyObject: {} = {foo: 'bar'} // ✅ ⬆️upcast 
```

### void

void는 타입스크립트에서 undefined의 상위 타입이다.

함수 구현자의 **리턴 타입을 보장하지 않음** 나타낼 때 사용된다.

void 함수가 런타임에 undefined 이외의 것을 반환할 수 있지만 **반환 값이 호출자에 의해 사용되어서는 안된다**는 것을 의미한다.

```tsx
function fn(cb: () => void): void {
    return cb()
}

fn(() => 'string')
```

💡  string 타입이 void 타입으로 대체 불가능한데 위의 예제가 가능한 이유

- 하지만 프로그램의 정확성을 변경하는지에 대한 관점에서 본다면 caller 함수가 리턴 값을 사용하지 않는 이상 다른 것을 반환하는 함수로 대체되어도 무해하다.
- 자바스크립트에서는 리턴 값이 무시되는 상황에서 함수가 재사용되는 경우가 꽤 흔하기 때문에 이런 점을 타입스크립트가 보완하려고 하는 것

💡 this를 void 타입으로 지정하기

- 함수 내에서 this를 사용하는 것을 막을 수 있다.

```tsx
function doSomething(this: void, value: string) {
    this // void
}
```

💡 void는 자바스크립트 연산자이기도 하다. 다음에 나오는 표현식을 undefined로 평가한다. e.g. `void 2 === undefined // true.`

## 타입스크립트가 implicit upcast를 허용하지 않는 경우 (잉여 속성 체크)

- 리터럴 객체를 함수에 직접 전달하는 경우

```tsx
function fn(obj: {name: string}) {}

fn({name: 'foo', key: 1}) // ❌ Object literal may only specify known properties, and 'key' does not exist in type '{ name: string; }'
```

- 리터럴 객체를 명시적인 타입을 가진 변수에 직접 할당하는 경우

```tsx
type UserWithEmail = {name: string, email: string}
type UserWithoutEmail = {name: string}

let userB: UserWithoutEmail = {name: 'foo', email: 'foo@gmail.com'} // ❌ Type '{ name: string; email: string; }' is not assignable to type 'UserWithoutEmail'.
```

https://www.zhenghao.io/posts/type-hierarchy-tree
