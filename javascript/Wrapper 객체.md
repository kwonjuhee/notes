
## 동작 방식
```jsx
var greet = 'hello';

greet.smile = true;
// 원시 데이터 타입에 확장을 시도해도 에러가 발생하지 않음

// 하지만 실제로 동작하는 것은 아니다.
(typeof greet.smile); // undefined
```

원시값인 문자열, 숫자, 불리언 값의 경우 객체 타입처럼 접근해도 에러가 발생하지 않는다. (strict mode에서는 에러) 이는 래퍼 객체때문!

래퍼 객체(wrapper object)란 문자열, 숫자, 불리언 값에 대해 객체처럼 접근했을 경우 자바스크립트 엔진에 의해 생성되는 임시 객체를 말한다. 

이 임시 객체를 통해 프로퍼티에 접근하거나 메서드를 호출한 후 다시 원시값으로 되돌아간다.

string 타입은 원시 타입으로 length 프로퍼티를 갖지 못하고 String.prototype의 메서드를 사용할 수 없지만 이 또한 래퍼 객체로 인해 가능하게 된다.

```jsx
const str = 'hi';

// 원시 타입인 문자열이 래퍼 객체인 String 인스턴스로 반환된다.
console.log(str.length);

// 인스턴스는 String.prototype의 메서드를 상속받아 사용할 수 있다.
console.log(str.toUpperCase());

// 다시 원시값으로 되돌린다.
console.log(typeof str); // string

// 객체는 무겁기 때문에 메서드 호출시에만 잠깐 바꿈
```

래퍼 객체의 동작 방식은 다음과 같다.

- 래퍼 객체인 String 생성자 함수의 인스턴스가 생성된다.
- 식별자가 생성된 래퍼 객체를 가리키게 되고 래퍼 객체의 \[\[StringData]] 내부 슬롯에 문자열이 할당된다.
- 래퍼 객체를 통한 처리가 끝나면 래퍼 객체의 \[\[StringData]] 내부 슬롯에 할당된 원시값으로 식별자가 원래의 상태를 갖도록 되돌린다.
- 래퍼 객체는 아무도 참조하지 않는 상태가 되므로 가비지 컬렉션의 대상이 된다.

원시값을 객체 형태로 변환해 주는 것과 같다. 래퍼객체에서 감싼 원시값으로 접근하려면 valueOf() 사용

```jsx
console.log(Object(1), Object(''), Object(true), Object(null), Object(undefined));
// Number {1} String {""} Boolean {true} {} {}
```

## String/Number/Boolean을 생성자로 쓸 경우 문제점

```jsx
let zero = new Number(0); // Number {0}
if (zero) alert("zero는 객체이므로 조건문이 참이 된다!");
```

생성자없이 사용하면 원하는 형의 원시값으로 변환

```jsx
let num = Number("0"); // 0
```
