
## ESLint와 Prettier?

- eslint는 코드 퀄리티 보장, 코드 구현 방식에 관한 것
- prettier는 코드 스타일 통일, 줄 바꿈, 들여쓰기, 공백 등 코드 포맷팅에 관한 것

[[ESLint & Prettier 세팅]]

## ESLint 세팅

### ESLint install

```
npm install -D eslint
// or
yarn add -D eslint
```

### ESLint extension

- VSCode에 ESLint를 통합시켜주는 것이 ESLint extension의 역할이다. 따라서 익스텐션 설치 필수!
- ESLint extension은 해당 워크스페이스에서 eslint가 설치되어 있는지 확인해보고, 없으면 글로벌 eslint를 참조한다.

### configuration file 생성

린트 규칙을 설정하는 파일

```
npx eslint --init

npm init @eslint/config
```

```json
// .eslintrc
// https://eslint.org/docs/latest/use/configure/configuration-files#using-configuration-files

{
    "root": true,
    "extends": [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended"
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": { "project": ["./tsconfig.json"] },
    "plugins": [
        "@typescript-eslint"
    ],
    "rules": {
        "@typescript-eslint/strict-boolean-expressions": [
            2,
            {
                "allowString" : false,
                "allowNumber" : false
            }
        ]
    },
    "ignorePatterns": ["src/**/*.test.ts", "src/frontend/generated/*"]
}
```

### plugin 설치 및 설정

> - eslint-config-airbnb-base
> - eslint-config-next
> - eslint-plugin-prettier : prettier를 eslint rule처럼 동작시킴
> - eslint-config-prettier : prettier와 충돌하는 eslint rule 취소
> - @typescript-eslint/eslint-plugin : 린트 규칙
> - @typescript-eslint/parser :
> - 등등

- 먼저 사용할 플러그인을 `plugins`에 추가한다. (eslint-plugin- prefix 생략 가능)
- 플러그인의 rule set중 적용시킬 규칙을 `rules`에 명시한다. 여기에 명시하지 않으면 규칙이 적용되지 않는다.
- 일부 플러그인은 rule set을 한번에 적용하기 위한 sharable config를 제공한다. 이를 적용하기 위해서는 `extends`에 추가한다.
	- 보통 root/index.js에서 export하는 config를 확인할 수 있다. (https://github.com/jsx-eslint/eslint-plugin-react/blob/master/index.js#L118-L179)
	- ex. eslint-plugin-react의 recommend config 적용 => `"extends": ["plugin:react/recomended"]` (eslint-plugin-/eslint-config- prefix는 생략 가능)

https://code-logs.github.io/eslint---plugin-and-extends


## Prettier 세팅

### Prettier install

```
npm install -D prettier
// or
yarn add -D prettier
```

보통 ESLint와 함께 사용하기 때문에 eslint-config-prettier 설치 필요

### Prettier extension

- VSCode settings에서 설정 가능 (단, 내 PC의 VSCode 환경에만 적용된다.)
	- 단, 내 PC의 VSCode 환경에만 적용된다. 설치한 플러그인에는 따로 설정이 필요하다.
- `.prettierrc`에서도 설정 가능
-  우선순위 settings.json (vscode) < .editorconfig < .prettierrc

### eslintrc에 prettier 플러그인 적용

- eslint-config-prettier, eslint-plugin-prettier 적용
```
// .eslintrc
{
  "extends": ["plugin:prettier/recommended"]
}
```

### .prettierrc 설정

- 상세 설정


## VSCode settings.json

- format on save 설정시 저장할때마다 포맷 자동 정렬
- default formatter를 prettier로 설정
- vscode의 기본 설정을 덮어쓸 수 있음
    - settings.json (vscode) < .editorconfig < .prettierrc


https://helloinyong.tistory.com/325