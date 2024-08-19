# error boundary

속성: 2023년 2월 4일 오전 2:31

아직 class 컴포넌트가 필요한 이유 중 하나이다. hooks로는 에러를 제어할 방법이 없다.

```jsx
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // 다음 렌더링에서 폴백 UI가 보이도록 상태를 업데이트 합니다.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // 에러 리포팅 서비스에 에러를 기록할 수도 있습니다.
    logErrorToMyService(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // 폴백 UI를 커스텀하여 렌더링할 수 있습니다.
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children;
  }
}
```

- getDerivedStateFromError, componentDidCatch 메서드 중 하나만 정의해도 해당 컴포넌트는 에러 경계가 된다.
    - getDerivedStateFromError: 렌더 단계에서 호출된다. side effect가 발생하는 작업을 해서는 안된다.
    - componentDidCatch: 커밋 단계에서 호출된다.
- 컴포넌트 트리 내에서 하위에 존재하는 컴포넌트의 에러만 포착한다.
- 에러가 발생하면 가장 가까운 에러 경계가 이를 캐치한다.
- React 16부터는 에러가 발생하고 포착되지 않으면 전체 컴포넌트 트리가 마운트 해제된다. 에러 경계는 문제가 발생했음을 사용자에게 알려주어 더 나은 사용자 경험을 제공할 수 있다.
- 에러 리포팅 서비스(sentry)를 활용하여 처리되지 않은 예외 상황들을 기록할 수 있다.
- 명령적인 try~catch문보다 선언적으로 처리할 수 있다.

### 한계

에러 경계가 캐치하지 못하는 에러들

- 이벤트 핸들러에서 발생한 에러
- 비동기 함수로부터 발생하는 에러
- 서버 사이드 렌더링시 발생하는 에러
- 에러 경계 자체에서 발생하는 에러

이러한 경우에는

1) try~catch문을 사용하여 처리하거나

2) 컴포넌트 단에서 에러를 throw 해주거나

3) 에러를 전역 상태로 관리한다.