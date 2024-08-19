
## git hooks

특정 git 이벤트(commit, push 등)가 발생할 때마다 스크립트를 실행하여 추가 작업을 수행할 수 있는 도구

### 클라이언트 훅

- **pre-commit** : 커밋을 수행하기 전에 실행되는 훅으로 formatting, lint, test 등을 수행할 수 있다.
- **pre-push** : 리모트로 푸시를 실행하기 전에 실행되는 훅으로 커밋이 유효한지 확인하는 용도로 사용할 수 있다.

### 서버 훅

- **pre-recieve** : 서버에서 푸시를 받기 전에 실행되는 훅으로 fast-forward push가 아니면 거절하거나 branch push 권한을 제어할 수 있다.
- **post-recieve** : 서버에서 푸시를 받은 후에 실행되는 훅으로 메일링 리스트에 메일을 보내거나 ci 서버나 ticket-tracking 시스템의 정보를 수정할 수 있다. 스크립트가 완전히 종료할 때까지 클라이언트와의 연결이 유지되고 push를 중단시킬 수 없으므로 long task를 실행할 때는 조심해야 한다.

https://git-scm.com/book/ko/v2/Git%EB%A7%9E%EC%B6%A4-Git-Hooks

## husky

git hooks을 쉽게 설정하고 관리할 수 있도록 도와주는 도구

1. 설치
2. prepare 스크립트 추가 및 실행
	1. prepare 스크립트란 npm 패키지를 설치하거나 배포하기 전에 실행되는 스크립
3. git hook 추가

lint-staged와 함께 사용하면 stage 단계에 있는 파일들만 linter가 동작하도록 할 수 있다.
