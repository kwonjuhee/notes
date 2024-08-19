# Github Actions란?

Pull Request, Push 등의 이벤트 발생에 따라 자동화된 작업을 진행할 수 있게 해주는 기능

자동화된 작업이 필요한 경우

- CI/CD
    - 이벤트 발생에 따라 자동으로 빌드 및 배포하는 스크립트를 실행시켜주는 것
- Testing
    - 예: Pull Request를 보내면 자동으로 테스트를 진행하고 테스트 성공 여부에 따라 PR을 Open 하거나 Close
- Cron Job
    - 특정 시간대에 스크립트를 반복 실행하도록 구현할 수 있다.
    - 예: 특정 시간마다 크롤링 작업

# Github Actions의 구성 요소

### Workflow

- 레포지토리에 추가할 수 있는 일련의 자동화된 커맨드 집합
- 하나 이상의 Job으로 구성되어 있으며, Push나 PR같은 이벤트에 의해 실행될 수도 있고 특정 시간대에 실행될 수도 있다.
- 빌드, 테스트, 배포 등 각각의 역할에 맞는 Workflow를 추가할 수 있다.
- `.github/workflows 디렉토리`에 `YAML 형태`로 저장한다.

### Event

- Workflow를 실행시키는 Push, Pull Request, Commit 등의 특정 행동을 의미한다.
- Github 외부에서 발생한 이벤트에 의해서도 Workflow를 실행시킬 수 있다.

### Job

- 동일한 Runner에서 실행되는 여러 Step의 집합
- 기본적으로 하나의 Workflow 내의 여러 Job은 독립적으로 실행되지만, 필요에 따라 의존 관계를 설정하여 순서 지정 가능
- 예: 테스트를 수행하는 Job과 빌드 작업을 수행하는 Job이 하나의 Workflow 안에 있을 때 의존 관계를 설정해 빌드 Job이 성공적으로 끝나야 테스트 Job을 수행할 수 있도록 지정할 수 있다.

### Step

- 커맨드를 실행할 수 있는 각각의 Task
- shell 커맨드가 될 수도 있고, 하나의 action이 될 수도 있다.
- 하나의 Job 내에서 각각의 step은 다양한 task로 인해 생성된 데이터를 공유할 수 있다.

### Action

- Job을 만들기 위해 Step을 결합한 독립적인 커맨드로 재사용이 가능한 Workflow의 가장 작은 단위의 블럭
- 직접 만든 Action을 사용하거나 Github community에 의해 생성된 Action을 불러와 사용할 수 있다.

### Runner

- Github Actions Workflow 내에 있는 Job을 실행시키기 위한 애플리케이션
- Github에서 호스팅하는 가상 환경 또는 직접 호스팅하는 가상 환경에서 실행 가능

# Workflow 생성하기

`.github/workflows` 디렉토리 내에 `.yml 파일`을 생성

템플릿

```yaml
# Repository의 Actions 탭에 나타날 Workflow 이름으로 필수 옵션은 아닙니다.
name: CI

# Workflow를 실행시키기 위한 Event 목록입니다.
on:
  # 하단 코드에 따라 develop 브랜치에 Push 또는 Pull Request 이벤트가 발생한 경우에 Workflow가 실행됩니다.
  # 만약 브랜치 구분 없이 이벤트를 지정하고 싶을 경우에는 단순히 아래와 같이 작성도 가능합니다.
  # on: [push, pull_request]
  push:
    branches: [develop]
  pull_request:
    branches: [develop]

  # 해당 옵션을 통해 사용자가 직접 Actions 탭에서 Workflow를 실행시킬 수 있습니다.
  # 여기에서는 추가적으로 더 설명하지는 않겠습니다.
  workflow_dispatch:

# 해당 Workflow의 하나 이상의 Job 목록입니다.
jobs:
  # Job 이름으로, build라는 이름으로 Job이 표시됩니다.
  build:
    # Runner가 실행되는 환경을 정의하는 부분입니다.
    runs-on: ubuntu-latest

    # build Job 내의 step 목록입니다.
    steps:
      # uses 키워드를 통해 Action을 불러올 수 있습니다.
      # 여기에서는 해당 레포지토리로 check-out하여 레포지토리에 접근할 수 있는 Action을 불러왔습니다.
      - uses: actions/checkout@v2

      # 여기서 실행되는 커맨드에 대한 설명으로, Workflow에 표시됩니다.
      - name: Run a one-line script
        run: echo Hello, world!

      # 이렇게 하나의 커맨드가 아닌 여러 커맨드도 실행 가능합니다.
      - name: Run a multi-line script
        run: |
          echo Add other actions to build,
          echo test, and deploy your project.
```

[Github Actions으로 배포 자동화하기 : NHN Cloud Meetup](https://meetup.toast.com/posts/286)