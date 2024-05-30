
```tsx
import { ReactNode, useState } from "react";

interface Props<T> {
  items: T[];
  renderItem: (item: T) => ReactNode;
}

function List<T>(props: Props<T>) {
  const { items, renderItem } = props;
  const [state, setState] = useState<T[]>([]); // You can use type T in List function scope.
  return (
    <div>
      {items.map(renderItem)}
      <button onClick={() => setState(items)}>Clone</button>
      {JSON.stringify(state, null, 2)}
    </div>
  );
}
```

- 제네릭 컴포넌트를 사용하면 다음과 같은 상황에서 type safe함

```tsx
ReactDOM.render(
  <List
    items={["a", "b"]} // type of 'string' inferred
    renderItem={(item) => (
      <li key={item}>
        {/* Error: Property 'toPrecision' does not exist on type 'string'. */}
        {item.toPrecision(3)}
      </li>
    )}
  />,
  document.body
);
```

- JSX에 타입 파라미터를 제공할 수 있다.

```tsx
ReactDOM.render(
  <List<number>
    items={["a", "b"]} // Error: Type 'string' is not assignable to type 'number'.
    renderItem={(item) => <li key={item}>{item.toPrecision(3)}</li>}
  />,
  document.body
);
```

- 화살표 함수에서도 제네릭을 사용할 수 있다. 
	- tsx parser가 JSX 태그와 헷갈리지 않게 `<T extends unknown>` 또는 `<T,>`를 사용해야 함

```tsx
import { ReactNode, useState } from "react";

interface Props<T> {
  items: T[];
  renderItem: (item: T) => ReactNode;
}

// Note the <T extends unknown> before the function definition.
// You can't use just `<T>` as it will confuse the TSX parser whether it's a JSX tag or a Generic Declaration.
// You can also use <T,> https://github.com/microsoft/TypeScript/issues/15713#issuecomment-499474386
const List = <T extends unknown>(props: Props<T>) => {
  const { items, renderItem } = props;
  const [state, setState] = useState<T[]>([]); // You can use type T in List function scope.
  return (
    <div>
      {items.map(renderItem)}
      <button onClick={() => setState(items)}>Clone</button>
      {JSON.stringify(state, null, 2)}
    </div>
  );
};
```