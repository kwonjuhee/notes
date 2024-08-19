기본적으로 node.js는 production, development, test로 구분하여 사용한다. 그리고 실행 명령어에 따라 자동으로 NODE_ENV값이 정해진다.

```bash
# production 배포 env실행
$ npm run build

# development 개발 env실행
$ npm start

# test 개발 env실행
$ npm run test
```

실행 OS에 따라 환경변수를 설정하는 방법이 다르기 때문에 환경 변수 설정시 undefined가 나오는 경우가 있다. 따라서 `cross-env 모듈`을 사용하여 환경변수를 설정하는 것이 좋다.

환경 변수는 `REACT_APP_` prefix가 있어야 인식을 한다.

**env 파일 우선순위**
- .env.development.local > .env.development > .env.local > .env
- .env.production .local > .env.production > .env.local > .env
- .env.test.local > .env.test> .env.local > .env