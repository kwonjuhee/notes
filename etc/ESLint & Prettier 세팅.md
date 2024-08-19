# Prettier

>🔨 일관된 코드 스타일을 유지하기 위해 자동으로 코드를 정리해주는 도구


[Why Prettier? · Prettier](https://prettier.io/docs/en/why-prettier.html)

- default 옵션 사용 권장 (옵션 선택은 시간 낭비!)
- Prettier 설치시에 package.json에 정확한 버전을 기입하여 협업을 하는 모두가 동일한 Prettier를 설치하도록 해야한다.
- IDE의 설정과 Prettier의 default 옵션이 다를 수 있다.

## vscode 설정

- format on save 설정시 저장할때마다 포맷 자동 정렬
- default formatter를 prettier로 설정
- vscode의 기본 설정을 덮어쓸 수 있음
    - settings.json (vscode) < .editorconfig < .prettierrc

# ESLint

> 🔨 ESLint is **a static code analysis tool** for identifying **problematic patterns** found in JavaScript code

ESLint는 코드 실행 전에 코드를 분석하여 잠재적인 오류나 안티 패턴을 찾아준다. 자바스크립트 언어의 특성상 실행 이전에 에러를 감지할 수 없기 때문에 ESLint를 사용하면 잠재적인 오류를 예방할 수 있다. 

## 설치 및 설정

1. devDependencies로 설치하기
    1. `$ yarn add eslint --dev`
    2. `$ npm i -D eslint`
2.  설정파일 생성
    1. `$ yarn eslint --init`
    2. `$ npx eslint --init`
3. `.eslintrc.json` 파일에서 세부 설정
    
    ```jsx
    // .eslintrc
    module.exports = {
        "env": { // 프로젝트 환경 설정
            "browser": true,
            "commonjs": true,
            "es2021": true,
            "node": true
        },
        "extends": "eslint:recommended", // ESLint 확장
        "parserOptions": { // JavaScript 언어 옵션 지정
            "ecmaVersion": 13 // 사용할 ECMAScript 버전 설정
        },
        "rules": { // 강제할 규칙 정의
        }
    };
    ```
    
- eslint 플러그인 설정
    - airbnb JS style, google JS style, eslint:recommended 등
    - airbnb-base는 react 관련 규칙이 포함되어 있지 않아 vanilla JS 프로젝트에 적합
- prettier config
    - eslint에도 일부 포맷팅 기능이 있기 때문에 prettier가 적용한 코드 포맷과 충돌시 eslint에 의해 오류로 감지될 수 있다.
    - `eslint-config-prettier`를 설치하면 prettier와 충돌하는 eslint의 코드 포맷팅 관련 규칙을 모두 취소한다.
    - `eslint-plugin-prettier`를 설치하면 Prettier를 ESLint rule처럼 동작시킨다.
    - 포맷팅은 prettier, 코드 품질은 eslint로 설정하는 것을 권장

## 검사하기

1. 파일 단위 검사

`node_modules/.bin/eslint 검사하고_싶은_파일명.js`

`npx eslint 검사하고_싶은_파일명.js --fix`

- 터미널 창에 오류를 알려준다.
- fix 옵션을 주면 자동 교정이 된다.
2. package.json scripts 설정

`"lint": "eslint ."`

`$npm run lint`로 실행

3. vscode extension 설치하면 에디터에서 알아서 error, warning 띄워줌

# commit 전 린트 자동화하기

- git hook
- husky