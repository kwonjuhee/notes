
useState(함수()) 하면 함수의 return 값으로 state를 초기화하게 되는데

이러면 컴포넌트가 리렌더링 될 때마다 함수가 실행된다.

무거운 작업을 수행하는 함수라면 의미없는 작업이 될 것이다.

콜백함수로 전달하는 lazy initialization 방식을 통해 첫 렌더링이 일어날 때 딱 한번만 함수를 실행하게 할 수 있다.

[https://kentcdodds.com/blog/use-state-lazy-initialization-and-function-updates](https://kentcdodds.com/blog/use-state-lazy-initialization-and-function-updates)