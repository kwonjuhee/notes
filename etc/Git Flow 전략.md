주요 브랜치

- 항상 유지되는 메인 브랜치
    - master: 제품으로 출시되는 브랜치
    - develop: 다음 출시 버전을 개발하는 브랜치
- 일정 기간 동안만 유지되는 보조 브랜치들
    - feature: 기능을 개발하는 브랜치
    - release: 이번 출시 버전을 준비하는 브랜치
    - hotfix: 출시 버전에서 발생한 버그를 수정하는 브랜치

# 🛠️ 기능 추가 작업

1. master에서 dev를 생성한다.
2. dev에서 feature 브랜치를 생성해서 작업한다.
3. 기능 추가 작업이 완료되었다면 feature 브랜치를 dev 브랜치로 merge 한다.
4. release할 시점이 오면 dev를 기준으로 release 브랜치를 생성한다.

# 🛠️ 출시 준비 작업

develop에 이번 버전에 포함되는 모든 기능이 merge 되었다면 QA를 진행해야 한다.

> **QA (Quality Assurance)**
일정 수준의 품질을 가질 수 있도록 제품 출시 이전에 수행하는 각종 테스트 및 검수작업
> 
1. develop 브랜치에서부터 release 브랜치를 생성한다.
2. QA 중 버그가 발생하면 release를 기준으로 브랜치를 생성해서 버그 수정 작업을 진행한다.
3. 작업이 끝나면 release에 merge한다.

# 🛠️ 출시하기

1. QA가 완료되었다면 release 브랜치를 master 브랜치에 merge 한다.
2. 그리고 master와 develop 브랜치의 싱크를 맞춘다.
3. master 브랜치에 버전 태그를 추가하고 배포한다.

# 🛠️ hotfix

1. 긴급하게 hotfix가 발생할 경우 master 브랜치를 기준으로 hotfix 브랜치를 생성한다.
2. hotfix 브랜치에 버그 수정 작업을 진행한다.
3. 작업이 끝나면 master에 merge한 후 master를 배포한다.
4. 그리고 master와 develop 브랜치의 싱크를 맞춘다.

# 🛠️ master와 develop 브랜치 싱크 맞추기

release 브랜치 (or hotfix 브랜치)를 master에 merge한 후 master 브랜치와 develop 브랜치의 싱크를 맞추는 방법

- release 브랜치 (or hotfix 브랜치)를 master, develop에 각각 merge하는 방법
- release 브랜치 (or hotfix 브랜치)가 merge된 master 브랜치를 develop에 merge하는 방법