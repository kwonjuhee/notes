```tsx
import * as React from 'react';

function App() {
  return (
    <>
      <WrappedButton onClick={() => {}}> text </WrappedButton>
    </>);
}

type ButtonProps = React.ComponentPropsWithoutRef<"button">

export function Button(props: ButtonProps) {
  return <button {...props} />;
}

type WrappedButtonProps = React.ComponentPropsWithoutRef<typeof Button> & {
  onClick: (data: string) => void;
}

export function WrappedButton(props: WrappedButtonProps) {
  return <Button {...props} />;
x
}
```

https://www.typescriptlang.org/play?#code/JYWwDg9gTgLgBAKjgQwM5wEoFNkGN4BmUEIcA5FDvmQNwCwAUI4wQK4B2+wE7cAgmDAAKAJRwA3ozhxKMVlF5Cp0uAB4AfMpVqA6lGSCsAEwBCrGDB5weAYQA2wXAGsAvONFwX6iQF8f3mCwAD3hVAHo9AzBjMwseTQZtcPURegYfZgYYAE9ouFjLdgAFYjB0F0wqGAA6GxJIdix2GBKIMp1gGAALCHNsAlUAIgAjc0LBhMZgyFg4Nk4Ybl4CniEwUtQALnyxnlaysUlEmSw5BTVRuN5xatv1ttQfODD1NIymLNysOEjDU13ihtPJU8DU6uAeE0WhsOt1ejB+qoctEIAQdldvAAyCTKWwOZzbIRGZAwZDbVAwKDAdgAczEXjgADcIMAjG9MtNoIQOFwrL9ov8rmsNtt+TEAftUIdlLJ5LxVCtrrdqvcyk8Xm8gA

타입으로 작성하면 intersection 타입으로 인해 WrappedButton의 onClick 타입이 다음과 같이 추론됨

`onClick: React.MouseEventHandler<HTMLButtonElement> & ((data: string) => void)`

인터페이스로 변경하면 타입 작성시에 에러 발생

```tsx
interface ButtonProps extends React.ComponentPropsWithoutRef<"button"> {}

export function Button(props: ButtonProps) {
  return <button {...props} />;
}

interface WrappedButtonProps extends React.ComponentPropsWithoutRef<typeof Button> {
  // Error
  onClick: (data: string) => void;
}

export function WrappedButton(props: WrappedButtonProps) {
  // Error
  return <Button {...props} />;
}
```

https://www.typescriptlang.org/play?#code/JYWwDg9gTgLgBAKjgQwM5wEoFNkGN4BmUEIcA5FDvmQNwCwAUI4wQK4B2+wE7cAgmDAAKAJRwA3ozhxKMVlF5Cp0uAB4AfMpVqA6lGSCsAEwBCrGDB5weAYQA2wXAGsAvONFwX6iQF8f3mCwAD3hVAHo9AzBjMwseTQZtcPURegYfZgZgdkCoAjwsOFjLdgAFYjB0YMD2I3RsPBgAOhsSSHYsHPKISp1gGAALCHNsAlUAIgAjcxLx73EMpgZgyFg4Nk4Ybl5iniEwCtQALiKZnm7KsUlEmSw5BTVpuN5xJreDntQfODD1NMXGNlcvlcIVIoZTGcyoc4NVOnVMFRmq1wDxOjALqg+oNhjBRqoYABPaIQAinZ7zZS2BzOE5CIzIGDIE6oGBQbIAczEXjgADcIMAjP9MitoIQOFwrODopDnvtDidpTEoZirspZPJeKpdi83k0PpVvr9-kA

이런 상황에서는 Omit 연산자를 통해 기존 타입을 제거한 후 