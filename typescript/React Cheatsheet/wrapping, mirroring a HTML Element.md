
https://react-typescript-cheatsheet.netlify.app/docs/advanced/patterns_by_usecase/

## Use Case

html element의 props를 모두 상속받는 컴포넌트를 만들고 싶을 때

## ComponentPropsWithoutRef

```tsx
import * as React from 'react';

// usage
function App() {
  // Type '"foo"' is not assignable to type '"button" | "submit" | "reset" | undefined'.(2322)
  // return <Button type="foo"> sldkj </Button>
  // no error
  
  return <Button type="button"> text </Button>
}

  

// implementation
export interface ButtonProps extends React.ComponentPropsWithoutRef<'button'> {
  specialProp?: string;
}

export function Button(props: ButtonProps) {
  const { specialProp, ...rest } = props;

  // do something with specialProp
  return <button {...rest} />;
}
```

- forwardRef를 사용하여 부모 컴포넌트로 dom node를 노출시키는 경우에는 `ComponentPropsWithRef` 사용
- `ComponentPropsWithRef` 대신 `ComponentProps`로 대체 가능하다. ref forwarded 여부를 명시하는 것을 선호하는지에 따라 선택

## `React.JSX.IntrinsicElements` or `[Element]HTMLAttributes`

```tsx
// Method 1: React.JSX.IntrinsicElements
type BtnType = React.JSX.IntrinsicElements["button"]; // cannot inline or will error
export interface ButtonProps extends BtnType {} // etc

// Method 2: React.[Element]HTMLAttributes
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>
```

- `ComponentProps`는 `React.JSX.IntrinsicElements`의 래핑 타입이다.

- `HTMLAttributes`는 global attributes를 위한 가장 generic한 버전
- `[Element]HTMLAttributes`는 특정 Element에 specialized HTMLAttributes
- `[Element]HTMLAttributes<T>`에서 제네릭은 `DOMAttribute<T>`에서 이벤트 타입으로 사용된다.


## 🚫 `React.HTMLProps` or `React.HTMLAttributes`

- HTMLProps는 내부적으로 `AllHTMLAttributes`를 사용하기 때문에 too-wide type
- 예를 들어 button type이 string으로 추론되어 할당 오류가 발생함

```tsx
export interface ButtonProps extends React.HTMLProps<HTMLButtonElement> {
  specialProp: string;
}
export function Button(props: ButtonProps) {
  const { specialProp, ...rest } = props;
  // ERROR: Type 'string' is not assignable to type '"button" | "submit" | "reset" | undefined'.
  return <button {...rest} />;
}
```

- HTMLAttributes는 global attributes가 아니면 존재하지 않음

```tsx
import { HTMLAttributes } from "react";

export interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
  /* etc */
}

function App() {
  // Property 'type' does not exist on type 'IntrinsicAttributes & ButtonProps'
  return <Button type="submit"> text </Button>;
}
```


## ComponentProps와 `[Element]HTMLAttributes` 비교

```tsx
type ComponentProps<T extends keyof JSX.IntrinsicElements | JSXElementConstructor<any>> =
    T extends JSXElementConstructor<infer P>
        ? P
        : T extends keyof JSX.IntrinsicElements
	        ? JSX.IntrinsicElements[T]
            : {};

type JSXElementConstructor<P> =
    | ((props: P) => ReactElement | null)
    | (new (props: P) => Component<P, any>);
```

- `JSX.IntrinsicElements` 타입은 JSX에서 사용 가능한 HTML 요소에 대한 타입 정보를 담은 타입이다. HTML 태그 이름을 key로 갖고 해당 요소에 사용할 수 있는 속성들의 타입을 값으로 갖는다.
	- `a: React.DetailedHTMLProps<React.AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>`
- `DetailedHTMLProps`를 통해 `[Element]HTMLAttributes<HTML[Element]Element>` 타입을 확장하여 ref, key 속성을 추가로 갖는다.

- `JSXElementContructor` 타입은 JSX 요소를 생성하는 함수나 클래스 타입을 나타내는 타입이다. 이로 인해 HTML 요소 외에 React 컴포넌트도 제네릭으로 받을 수 있다.

https://react-typescript-cheatsheet.netlify.app/docs/react-types/componentprops/