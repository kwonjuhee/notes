- [서버 컴포넌트란](#%EC%84%9C%EB%B2%84%20%EC%BB%B4%ED%8F%AC%EB%84%8C%ED%8A%B8%EB%9E%80)
	- [Basic Example](#Basic%20Example)
- [RSC의 이점](#RSC%EC%9D%98%20%EC%9D%B4%EC%A0%90)
	- [Zero-Bundle-Size Components](#Zero-Bundle-Size%20Components)
	- [자유로운 서버 리소스 접근](#%EC%9E%90%EC%9C%A0%EB%A1%9C%EC%9A%B4%20%EC%84%9C%EB%B2%84%20%EB%A6%AC%EC%86%8C%EC%8A%A4%20%EC%A0%91%EA%B7%BC)
	- [자동 코드 분할](#%EC%9E%90%EB%8F%99%20%EC%BD%94%EB%93%9C%20%EB%B6%84%ED%95%A0)
	- [No Waterfalls](#No%20Waterfalls)
- [RSC 렌더링 라이프 사이클](#RSC%20%EB%A0%8C%EB%8D%94%EB%A7%81%20%EB%9D%BC%EC%9D%B4%ED%94%84%20%EC%82%AC%EC%9D%B4%ED%81%B4)
	- [Overview](#Overview)
	- [1. 서버가 렌더링 요청을 받는다.](#1.%20%EC%84%9C%EB%B2%84%EA%B0%80%20%EB%A0%8C%EB%8D%94%EB%A7%81%20%EC%9A%94%EC%B2%AD%EC%9D%84%20%EB%B0%9B%EB%8A%94%EB%8B%A4.)
	- [2. 서버가 root 컴포넌트를 JSON으로 직렬화(serialize)한다.](#2.%20%EC%84%9C%EB%B2%84%EA%B0%80%20root%20%EC%BB%B4%ED%8F%AC%EB%84%8C%ED%8A%B8%EB%A5%BC%20JSON%EC%9C%BC%EB%A1%9C%20%EC%A7%81%EB%A0%AC%ED%99%94(serialize)%ED%95%9C%EB%8B%A4.)
	- [3. 브라우저가 React tree를 재구성한다.](#3.%20%EB%B8%8C%EB%9D%BC%EC%9A%B0%EC%A0%80%EA%B0%80%20React%20tree%EB%A5%BC%20%EC%9E%AC%EA%B5%AC%EC%84%B1%ED%95%9C%EB%8B%A4.)
- [RSC Wire format](#RSC%20Wire%20format)
	- [RSC format -> React element의 변환](#RSC%20format%20-%3E%20React%20element%EC%9D%98%20%EB%B3%80%ED%99%98)
	- [plain HTML을 사용하지 않는 이유](#plain%20HTML%EC%9D%84%20%EC%82%AC%EC%9A%A9%ED%95%98%EC%A7%80%20%EC%95%8A%EB%8A%94%20%EC%9D%B4%EC%9C%A0)
	- [클라이언트 컴포넌트에서 data fetching을 수행하는 것보다 나은 이유](#%ED%81%B4%EB%9D%BC%EC%9D%B4%EC%96%B8%ED%8A%B8%20%EC%BB%B4%ED%8F%AC%EB%84%8C%ED%8A%B8%EC%97%90%EC%84%9C%20data%20fetching%EC%9D%84%20%EC%88%98%ED%96%89%ED%95%98%EB%8A%94%20%EA%B2%83%EB%B3%B4%EB%8B%A4%20%EB%82%98%EC%9D%80%20%EC%9D%B4%EC%9C%A0)
- [RSC이 SSR을 대체할 수 있을까?](#RSC%EC%9D%B4%20SSR%EC%9D%84%20%EB%8C%80%EC%B2%B4%ED%95%A0%20%EC%88%98%20%EC%9E%88%EC%9D%84%EA%B9%8C?)
	- [RSC와 SSR의 차이](#RSC%EC%99%80%20SSR%EC%9D%98%20%EC%B0%A8%EC%9D%B4)
	- [상호보완적 기술](#%EC%83%81%ED%98%B8%EB%B3%B4%EC%99%84%EC%A0%81%20%EA%B8%B0%EC%88%A0)
	- [RSC + SSR Framework 동작 과정](#RSC%20+%20SSR%20Framework%20%EB%8F%99%EC%9E%91%20%EA%B3%BC%EC%A0%95)
- [Reference](#Reference)
- [보완할 점](#%EB%B3%B4%EC%99%84%ED%95%A0%20%EC%A0%90)


## 서버 컴포넌트란

용어 그대로 서버에서 렌더링을 수행하는 React 컴포넌트를 말한다.  RSC 이전에는 모든 컴포넌트가 '클라이언트' 컴포넌트였지만 RSC를 통해 서버와 클라이언트(브라우저)가 서로 협력하여 렌더링할 수 있도록 한다.

**서버 컴포넌트는 데이터를 가져오고 콘텐츠를 렌더링하는데 집중하고(기존 SSR의 향상된 성능) 클라이언트 컴포넌트는 stateful한 상호작용에 집중**할 수 있어 **빠른 페이지 로딩, 작은 js 번들 사이즈, 더 나은 사용자 경험**을 제공할 수 있다.

![[RSC (React Server Component).png]]


확장자가 `.server.jsx`면 서버 컴포넌트 `.client.jsx`면 클라이언트 컴포넌트로 구별된다. (둘다 아니라면 양쪽 모두에서 사용할 수 있는 컴포넌트)

이는 개발자가 구별하기도 쉽지만, 번들러가 파일 이름을 검사하여 클라이언트 컴포넌트를 별도로 처리할 수 있게 한다.

### Basic Example

```js
// Note.server.js - Server Component

import db from 'db.server'; 
// (A1) We import from NoteEditor.client.js - a Client Component.
import NoteEditor from 'NoteEditor.client';

function Note(props) {
  const {id, isEditing} = props;
  // (B) Can directly access server data sources during render, e.g. databases
  const note = db.posts.get(id);
  
  return (
    <div>
      <h1>{note.title}</h1>
      <section>{note.body}</section>
      {/* (A2) Dynamically render the editor only if necessary */}
      {isEditing 
        ? <NoteEditor note={note} />
        : null
      }
    </div>
  );
}
```

- 서버 컴포넌트는 그냥 props를 받아 뷰를 렌더링하는 React 컴포넌트다. (state나 effect를 사용할 수 없다는 제약은 존재)
- 서버 데이터 소스에 직접 액세스할 수 있다.
- 클라이언트 컴포넌트를 import하고 렌더링하여 클라이언트에 넘길 수 있다. 번들러는 이러한 import를 다른 dynamic import와 유사하게 처리하여 다른 번들로 분할할 수 있다. 이 예제에서는 props.isEditing이 true인 경우에만 NodeEditor.client.js가 클라이언트에 로드된다.


## RSC의 이점

### Zero-Bundle-Size Components

라이브러리들을 하나 둘 추가하다보면 번들 사이즈가 늘어나고 성능에 악영향을 끼치게 된다. 트리 셰이킹, code splitting으로 렌더링에 필요한 번들 사이즈를 최대한 줄일 수 있지만 결국 번들 사이즈가 늘어나는 것은 막을 수 없다.

예를 들어 아래와 같은 클라이언트 컴포넌트를 렌더링하기 위해서는 컴포넌트 코드와 marked, sanitize-hml 패키지 또한 번들에 추가되어야 한다.

```js
// NoteWithMarkdown.js
// NOTE: *before* Server Components

import marked from 'marked'; // 35.9K (11.2K gzipped)
import sanitizeHtml from 'sanitize-html'; // 206K (63.3K gzipped)

function NoteWithMarkdown({text}) {
  const html = sanitizeHtml(marked(text));
  return (/* render */);
}
```

하지만 이와 다르게 **서버 컴포넌트 코드는 브라우저에 로드되지 않고 서버에서 미리 렌더링된 static content를 전달**하기 때문에 패키지를 추가해도 번들 사이즈에 영향을 끼치지 않는다.

위 클라이언트 컴포넌트처럼 유저 인터랙션이 없는 컴포넌트들을 서버 컴포넌트로 마이그레이션한다면 **번들 사이즈와 초기 로딩 시간을 감소**시킬 수 있을 것이다.


### 자유로운 서버 리소스 접근

서버 컴포넌트는 서버에서 동작하기 때문에 데이터베이스, 파일 시스템, 인터널 서비스같은 서버 사이드 데이터 소스에 직접 접근할 수 있다.

```js
// Note.server.js - Server Component
import fs from 'react-fs';

function Note({id}) {
  const note = JSON.parse(fs.readFile(`${id}.json`)) // 파일 접근
  return <NoteWithMarkdown note={note} />;
}
```

```js
// Note.server.js - Server Component
import db from 'db.server';

function Note({id}) {
  const note = db.notes.get(id); // 데이터베이스 접근
  return <NoteWithMarkdown note={note} />;
}
```

이렇게 서버에서 fetching한 데이터는 클라이언트 컴포넌트에 props로 전달 가능하다. (단, json으로 인코딩 가능한 serializable props만 전달 가능하며 function은 전달할 수 없다.)


### 자동 코드 분할

코드 분할은 클라이언트에서 **페이지를 렌더링할 때 최소한의 코드만 로드할 수 있도록** 돕는다. 기존에 클라이언트 컴포넌트에서는 `React.lazy`와 dynamic import를 사용하여 렌더링에 필요한 컴포넌트를 동적으로 불러왔는데 이는 다음과 같은 단점이 존재한다.

- lazy loading이 필요한 컴포넌트마다 일일이 `React.lazy`와 dynamic import를 적용해야 한다.
- 부모 컴포넌트가 렌더링된 이후 로딩을 시작하기 때문에 화면에 보이기 전 어느 정도의 딜레이가 존재한다.

**서버 컴포넌트는 import 되는 모든 클라이언트 컴포넌트를 code splitting 포인트로 간주**하기 때문에 더 이상 `React.lazy`로 명시하지 않아도 된다.
또한 **서버에서 미리 필요한 컴포넌트를 선택**하기 때문에 클라이언트는 렌더링 프로세스 초기에 해당 컴포넌트를 다운로드할 수 있다.

```js
// PhotoRenderer.server.js - Server Component
import React from 'react';

// one of these will start loading *once rendered and streamed to the client*:
import NewPhotoRenderer from './NewPhotoRenderer.client.js';
import OldPhotoRenderer from './OldPhotoRenderer.client.js';

function Photo(props) {
  // Switch on feature flags, logged in/out, type of content, etc:
  if (FeatureFlags.useNewPhotoRenderer) {
    return <NewPhotoRenderer {...props} />;
  } else {
    return <OldPhotoRenderer {...props} />;
  }
}
```


### No Waterfalls

데이터 페칭 방법으로 흔히 두 가지 중 하나를 선택하게 된다.

- 모든 정보를 부모 컴포넌트에서 하나의 거대한 API로 호출하여 자식으로 내려준다.
	- API 요청수를 줄일 수 있다.
	- 부모와 자식 컴포넌트가 결속되고 유지보수가 어려워진다.
	- 컴포넌트의 구성이나 위치가 바뀐다면 해당 API를 다른 컴포넌트에서도 호출해줘야 하고 불필요한 정보를 over fetching하게 된다.
- 컴포넌트에 필요한 API를 각 컴포넌트에서 호출한다.
	- 각 컴포넌트가 렌더링될 때 필요한 데이터만 가져와 보여줄 수 있다.
	- high latency를 가진 클라이언트에서의 API 요청수가 늘어난다.
	- 중첩된 컴포넌트의 경우 자식 컴포넌트의 렌더링과 API 호출 지연으로 인한 waterfall 문제가 발생한다.

서버 컴포넌트를 통해 두번째 방식의 컴포넌트에서 필요한 데이터만 fetching하는 방식을 유지하면서 클라이언트와 서버 간 요청의 high latency와 중첩된 컴포넌트에서 발생하는 waterfall 문제를 제거할 수 있다.

다음 예제는 렌더링 후 필요한 데이터를 받아오기 시작하기 때문에 이 과정이 끝나기 전까지 자식 컴포넌트의 렌더링과 API 호출이 지연된다. 이는 불필요한 로딩 시간이 걸릴뿐더러 children에서 waterfall 문제를 유발할 수 있다.

```js
// Note.js
// NOTE: *before* Server Components

function Note(props) {
  const [note, setNote] = useState(null);
  
  useEffect(() => {
    // NOTE: loads *after* rendering, triggering waterfalls in children
    fetchNote(props.id).then(noteData => {
      setNote(noteData);
    });
  }, [props.id]);
  
  if (note == null) {
    return "Loading";
  } else {
    return (/* render note here... */);
  }
}
```

서버 컴포넌트를 사용하면 렌더링 중에 데이터 로드를 시작하기 때문에 요청 latency를 줄일 수 있고, 순차적이고 연속된 API 호출을 클라이언트에서 서버로 이동하여 waterfall 현상을 막을 수 있다.

```js
// Note.server.js - Server Component

function Note(props) {
  // NOTE: loads *during* render, w low-latency data access on the server
  const note = db.notes.get(props.id);
  if (note == null) {
    // handle missing note
  }
  return (/* render note here... */);
}
```


## RSC 렌더링 라이프 사이클

### Overview

서버에서 서버 컴포넌트를 렌더링한다. 리액트 컴포넌트를 div, p와 같은 네이티브 HTML 요소로 변환한다. 클라이언트 컴포넌트를 만나면 올바른 클라이언트 컴포넌트와 props로 채우라는 명령과 함께 placeholder를 출력한다. 그러면 브라우저는 그 출력을 받아 클라이언트 컴포넌트로 그 구멍을 채운다.

### 1. 서버가 렌더링 요청을 받는다.

### 2. 서버가 root 컴포넌트를 JSON으로 직렬화(serialize)한다.

1. 초기 root 서버 컴포넌트를 기본 HTML 태그와 클라이언트 컴포넌트 placeholder의 트리를 렌더링하고 
2. 트리를 직렬화(serialize)하여
3. 스트림 형태로 브라우저에 전송한다.

직렬화할 React element은

- native html 태그라면 이미 serializable하다.
- 서버 컴포넌트라면 호출한다음 그 결과를 직렬화(serialize)한다. 이것은 서버 컴포넌트를 효과적으로 렌더링하는 것이고 모든 서버 컴포넌트를 html 태그로 변환하는 것이 목표이다.
- 클라이언트 컴포넌트라면 이미 serializable하다. `type` 필드가 이미 컴포넌트 함수가 아닌 module reference 객체를 가리키고 있기 때문이다.
	- React는 컴포넌트 함수 참조를 처리하는 replacer function을 `JSON.stringify()`에 전달한다. ([resolveModelToJSON()](https://github.com/facebook/react/blob/42c30e8b122841d7fe72e28e36848a6de1363b0c/packages/react-server/src/ReactFlightServer.js#L368))

> 🔎 module reference 객체란?
> 
> RSC는 React element의 `type` 필드에 컴포넌트 함수 대신에 module reference 값을 도입하였다. 함수는 JSON-serializable하지 않기 때문에 직접 참조하는 대신 그것에 대한 serializable "reference"
> 
> 컴포넌트 요소라면 React element의 `type` 필드가 컴포넌트 함수를 참조한다. 하지만 함수는 JSON-serializable하지 않기 때문에 RSC에서는 컴포넌트 함수를 직접 참조하는 대신 그것에 대한 serializable한 "reference"인 "module reference" 객체를 도입하였다.
> 
> 이러한 변환 작업은 번들러가 수행한다. React 팀은 `react-server-dom-webpack`에서 webpack-loader나 node-register로 webpack을 위한 RSC 지원을 제공한다. 서버 컴포넌트가 `*.client.jsx` 파일로부터 무언가를 import하면 실제로 그것을 가져오는 대신 file name과 export name을 포함하는 module reference 객체만 가져온다. 

```jsx
// ClientComponent.client.jsx
export default function ClientComponent({ children }) {
  return (
    <div>
      <h1>Hello from client land</h1>
      {children}
    </div>
  )
}

// ServerComponent.server.jsx
export default function ServerComponent() {
  return <span>Hello from server land</span>
}

// OuterServerComponent.server.jsx
// OuterServerComponent can instantiate both client and server
// components, and we are passing in a <ServerComponent/> as
// the children prop to the ClientComponent.
import ClientComponent from './ClientComponent.client'
import ServerComponent from './ServerComponent.server'
export default function OuterServerComponent() {
  return (
    <ClientComponent>
      <ServerComponent />
    </ClientComponent>
  )
}

```

```js
// 다음과 같은 JSON 트리 생성

{
  // The ClientComponent element placeholder with "module reference"
  $$typeof: Symbol(react.element),
  type: { // 원래는 type: ClientComponent일 것
    // The type field now has a reference object,
    // instead of the actual component function
    $$typeof: Symbol(react.module.reference),
    // ClientComponent is the default export...
    name: "default",
    // from this file!
    filename: "./src/ClientComponent.client.js"
  },
  props: {
    // children passed to ClientComponent, which was <ServerComponent />.
    children: {
      // ServerComponent gets directly rendered into html tags;
      // notice that there's no reference at all to the
      // ServerComponent - we're directly rendering the `span`.
      $$typeof: Symbol(react.element),
      type: "span",
      props: {
        children: "Hello from server land"
      }
    }
  }
}

```

이 프로세스가 끝나면 다음과 같은 JSON 트리가 직렬화되어 서버에서 브라우저로 스트리밍된다.


![[RSC (React Server Component)-2.png]]



직렬화가 가능해야 하기 때문에

### 3. 브라우저가 React tree를 재구성한다.

브라우저는 서버로부터 받은 JSON을 역직렬화(deserialize)하고 클라이언트 placeholder를 실제 클라이언트 컴포넌트로 채우고 최종 결과를 렌더링하는 작업을 수행한다.

placeholder를 채우는 작업은 번들러의 도움을 받는다. `type`이 module reference인 요소를 만나면 실제 클라이언트 컴포넌트 함수에 대한 참조로 대체한다.

React tree는 native 태그와 바뀐 클라이언트 컴포넌트로 재구성되어 다음과 같이 보일 것이다.
![[RSC (React Server Component)-3.png]]

그리고나서 이 트리를 DOM에 렌더하고 커밋한다.

## RSC Wire format

**서버가 브라우저에 스트리밍하는 데이터 포맷**으로 각 줄에 하나의 JSON blob이 있고 id로 태그된 간단한 형식이다. 

JSON과 비슷하지만 나중에 채울 수 있는 슬롯이 있어 이를 통해 콘텐츠를 단계적으로 스트리밍할 수 있다. Suspense와 함께 사용하면 모든 콘텐츠가 완전히 스트리밍되기 전에 결과를 표시할 수 있다.
초기 non-interactive 렌더링 속도를 높이기 위해 HTML 스트림으로 변환될 수도 있는 더 풍부한 형식이다.

```js
// Tweets.server.js
import { fetch } from 'react-fetch' // React's Suspense-aware fetch()
import Tweet from './Tweet.client'
export default function Tweets() {
  const tweets = fetch(`/tweets`).json()
  return (
    <ul>
      {tweets.slice(0, 2).map((tweet) => (
        <li>
          <Tweet tweet={tweet} />
        </li>
      ))}
    </ul>
  )
}

// Tweet.client.js
export default function Tweet({ tweet }) {
  return <div onClick={() => alert(`Written by ${tweet.username}`)}>{tweet.body}</div>
}

// OuterServerComponent.server.js
export default function OuterServerComponent() {
  return (
    <ClientComponent>
      <ServerComponent />
      <Suspense fallback={'Loading tweets...'}>
        <Tweets />
      </Suspense>
    </ClientComponent>
  )
}
```

```json
M1:{"id":"./src/ClientComponent.client.js","chunks":["client1"],"name":""}
S2:"react.suspense"
J0:["$","@1",null,{"children":[["$","span",null,{"children":"Hello from server land"}],["$","$2",null,{"fallback":"Loading tweets...","children":"@3"}]]}]

M4:{"id":"./src/Tweet.client.js","chunks":["client8"],"name":""}
J3:["$","ul",null,{"children":[["$","li",null,{"children":["$","@4",null,{"tweet":{...}}}]}],["$","li",null,{"children":["$","@4",null,{"tweet":{...}}}]}]]}]
```

- `M` : 클라이언트 컴포넌트 module reference, 클라이언트 번들에서 컴포넌트 함수를 조회할 때 필요한 정보
- `J` : 실제 React element tree, `@1`은 앞서 `M`줄에 정의된 클라이언트 컴포넌트를 참조함
- Suspense를 만나고나서 `J0`에서 `@3`을 가리키는 Suspense boundary를 자식 컴포넌트를 갖는 것을 확인할 수 있다. 이 시점에서 `@3`은 아직 정의되지 않았다. 서버가 tweets 로딩을 끝내면 `M4` 행과 `J3` 행을 출력한다.
	- `M4` 행은 `Tweet.client.js` 컴포넌트에 대한 module reference를 정의
	- `J3` 행은 `@3`이 있는 위치로 스왑되어야 하는 또다른 React element tree를 정의
	- `J3`의 children은 `M4`에 정의된 Tweet 컴포넌트를 참조하고 있다.

### RSC format -> React element의 변환

`react-server-dom-webpack`에는 RSC 응답을 받아 React element tree를 재생성하는 entrypoint가 포함되어 있다.

`react-server-dom-webpack`에 API 엔드포인트에서 RSC 응답을 읽도록 요청하면 `response.readRoot()`는 응답 스트림이 처리될 때 업데이트되는 React element를 반환한다.

스트림을 읽기 전에는 아직 콘텐츠가 준비되지 않았기 때문에 즉시 프로미스를 던진다.

```jsx
// root 클라이언트 컴포넌트의 단순화된 버전
import { createFromFetch } from 'react-server-dom-webpack'
function ClientRootComponent() {
  // fetch() from our RSC API endpoint.  react-server-dom-webpack
  // can then take the fetch result and reconstruct the React
  // element tree
  const response = createFromFetch(fetch('/rsc?...'))
  return <Suspense fallback={null}>{response.readRoot() /* Returns a React element! */}</Suspense>
}
```

### plain HTML을 사용하지 않는 이유

RSC 포맷을 사용하면 서버에서 새로운 컴포넌트 props를 전달하고 트리를 재조정(기존 트리에 변경 사항 merge)할 수 있다.
- DOM focus, scroll, 클라이언트 컴포넌트 state 등 클라이언트 상태가 날라가지 않는다.
- 화면을 완전히 새로 그리지 않고 DOM에 커밋을 최소한으로 할 수 있다.

### 클라이언트 컴포넌트에서 data fetching을 수행하는 것보다 나은 이유

~~어차피 데이터를 가져오기 위해 서버에 API 요청을 해야한다면, data fetching만 요청하고 클라이언트에서 렌더링을 완전히 수행하는 방식보다 더 낫다고 할 수 있을까?
궁극적으로 화면에 렌더링하는 내용에 따라 달라진다. RSC를 사용하면 사용자에게 표시할 내용에 직접 매핑되는 비정규화된(denormalized), "처리된(processed)" 데이터를 얻을 수 있으므로 가져올 데이터의 일부만 렌더링하거나, 렌더링 자체에 브라우저에 로드하는 것을 피하고 싶은 자바스크립트가 많다면 유리하다.
또한 렌더링에 waterfall처럼 서로 의존하는 여러 data fetching이 필요한 경우에는 fetching이 브라우저보다 data latency가 훨씬 짧은 서버에서 일어나는 것이 더 좋다.~~


## RSC이 SSR을 대체할 수 있을까?

> [!note]
> 리액트 서버 컴포넌트는 서버 사이드 렌더링의 대체재가 아니다. 하지만 사용자 경험 향상을 위해 함께 사용할 수는 있다.

>  🔎SSR 동작 방식
> 
> 1. React 엘리먼트의 초기 렌더링 결과값을 HTML 형태의 string으로 반환 (`renderToString` 메서드)
> 2. 클라이언트에서 HTML 응답을 받으면 js 번들을 로딩
> 3. 클라이언트에서 렌더링 과정을 다시 거치면서 이미 서버에서 렌더링된 마크업이 있다면 hydration 수행, 일치하지 않는 부분만 새로 렌더링 (`ReactDOM.hydrate()`)
> ![[RSC (React Server Component)-4.png]]
> 
> ![[RSC (React Server Component)-5.png]]

### RSC와 SSR의 차이

- 서버 컴포넌트의 코드는 클라이언트로 전달되지 않는다. 하지만 서버 사이드 렌더링의 모든 컴포넌트의 코드는 자바스크립트 번들에 포함되어 클라이언트로 전송된다. 이는 인터랙션을 지연시킨다.
- 서버 컴포넌트는 페이지 레벨에 상관없이 모든 컴포넌트에서 서버에 접근 가능하다. 하지만 Next.js (page router)의 경우 가장 top level의 페이지에서만 `getServerProps()`나 `getInitialProps()`로 서버에 접근 가능하다.
- 서버 컴포넌트는 클라이언트 상태를 유지하며 refetch될 수 있다. 서버 컴포넌트는 HTML이 아닌 특별한 형태로 컴포넌트를 전달하기 때문에 필요한 경우 포커스, 인풋 입력값 같은 클라이언트 상태를 유지하면서 리페칭, 리렌더링이 가능하다. 하지만 SSR의 경우 HTML로 전달되기 때문에 hydration 이후에는 컴포넌트를 다시 사용할 수 없다. 새로운 refetch가 필요한 경우 HTML 전체를 리렌더링 해야 하며 이로 인해 클라이언트 상태를 유지할 수 없다.

### 상호보완적 기술

서버 사이드 렌더링의 가장 큰 목적은 non-interactive한 버전의 클라이언트 컴포넌트를 최대한 빠르게 브라우저에 전달하여 초기 페이지의 FCP 또는 LCP 속도를 향상시키는 것이다. 초기 HTML이 로드된 후에도 클라이언트 컴포넌트를 로드하고 파싱하고 실행하는 데 드는 비용은 여전히 지불해야한다.

서버 컴포넌트와 SSR을 함께 사용하면, 먼저 UI를 중간 포맷으로 렌더링한 다음(RSC) HTML로 렌더링할 수 있으므로(SSR) 빠른 초기 페인트 속도를 유지하면서 클라이언트에서 로드해야하는 js의 양을 줄일 수 있다.

또한 서버 컴포넌트의 중간 추상 포맷은 자바스크립트를 추가로 받지 않아도 되도록하며 렌더링된 트리의 상태를 잃어버리지 않고 서버에서 렌더링된 트리를 병합할 수 있도록 한다.
![[RSC (React Server Component)-6.png]]

### RSC + SSR Framework 동작 과정

용어 정리

- RSC 서버 환경만을 의미하기 위해 React Server(or Server)라고 할 것이다. RSC 서버에만 존재하는 컴포넌트를 서버 컴포넌트라 부른다.
- React Server output을 소비하는 모든 환경을 의미하기 위해 React Client(or Client)라고 할 것이다. SSR은 React Client이며 브라우저도 마찬가지다.

> - RSC에서 server와 client는 물리적 서버와 클라이언트에 직접적으로 대응하지 않는다.
> - React Server는 일반적으로 빌드시(default)에 실행되거나 실제 서버에서 실행된다.
> - React Client는 일반적으로 두 환경 모두에서 실행된다. (브라우저에서는 DOM을 관리하고 다른 환경에서는 초기 HTML을 생성)

![[RSC (React Server Component)-8.png]]
On the server

- (프레임워크) 프레임워크의 라우터는 요청된 URL을 서버 컴포넌트에 매치시키고 route 파라미터를 컴포넌트에 props로 전달한다. 그리고 React에게 컴포넌트와 props를 렌더링할 것을 요청한다.
- (리액트) root 서버 컴포넌트와 서버 컴포넌트인 모든 자식들을 렌더링한다. 렌더링은 네이티브 컴포넌트와 클라이언트 컴포넌트에서 멈춘다. 네이티브 컴포넌트는 UI에 대한 JSON 설명으로 스트리밍되고 클라이언트 컴포넌트는 직렬화된(serialized) props와 번들 참조를 포함하여 스트리밍된다.
	- 서버 컴포넌트가 일시중단(suspend)되면 리액트는 해당 하위 트리의 렌더링을 일시 중지하고 대신 placeholder 값을 스트리밍한다. 컴포넌트가 계속할 수 있게 되면 리액트는 컴포넌트를 다시 렌더링하고 실제 결과를 클라이언트에 스트리밍한다. 타깃으로 스트리밍되는 데이터는 JSON이지만 일시 중단되는 컴포넌트를 위한 슬롯이 있으며 해당 슬롯에 배치할 값은 나중에 응답 스트림에서 추가 항목으로 제공된다고 생각할 수 있다.
- (프레임워크) 프레임워크는 리액트가 각 UI 단위를 렌더링할 때 렌더링된 출력을 클라이언트에 점진적으로 스트리밍하는 역할을 한다.
	- 기본적으로 React는 HTML이 아닌 렌더링된 UI에 대한 설명을 반환한다. 이는 새로 가져온 데이터를 기존 클라이언트 컴포넌트와 reconciling (merging)하기 위해 필요하다. 프레임워크는 서버 컴포넌트를 SSR과 결합하여 초기 렌더링을 HTML로 스트리밍하여 초기의 non-interactive 화면의 속도를 높일 수 있다.

On the client

- (프레임워크) 클라이언트에서 프레임워크는 스트리밍된 응답을 받아 React로 그것을 렌더링한다.
- (리액트) 리액트는 응답을 역직렬화(deserialize)하고 native 요소와 클라이언트 컴포넌트를 렌더링한다. 이 작업은 점진적으로 이루어지며 React가 전체 스트림이 완료될 때까지 기다릴 필요가 없다. Suspense를 사용하면 개발자는 클라이언트 컴포넌트의 코드가 로드되는 동안과 서버 컴포넌트가 나머지 데이터를 가져오는 동안 의도적인 로딩 상태를 표시할 수 있다.
- (리액트) 모든 클라이언트 컴포넌트와 모든 서버 컴포넌트의 출력이 로드되면 최종 UI 상태가 사용자에게 표시된다. 이 시점에는 이미 모든 Suspense boundary가 드러나 있을 것이다.

![[RSC (React Server Component)-7.png]]
On the client

- (App) 앱이 지정된 UI 단위(예: 전체 route)를 다시 가져오도록 요청한다.
- (프레임워크) 프레임워크는 적절한 endpoint에서 렌더링된 결과를 요청하도록 조율한다.

On the server

- (프레임워크) 프레임워크 endpoint가 요청을 수신하고 그것을 요청된 서버 컴포넌트와 매치한다. React에 컴포넌트와 prop를 렌더링하도록 요청하고 렌더링된 결과의 스트림을 처리한다.
- (리액트) 리액트는 초기 로딩과 마찬가지로 컴포넌트를 타깃에 렌더링한다.
- (프레임워크) 프레임워크는 스트리밍된 응답 데이터를 클라이언트에 점진적으로 반환하는 작업을 처리한다.

On the client

- (프레임워크) 프레임워크는 스트리밍된 응답을 수신하고 새로 렌더링된 출력을 사용하여 route를 리렌더링한다.
- (리액트) 리액트는 새로 렌더링된 결과를 화면에 존재하는 컴포넌트와 조정(reconclie)한다. UI에 대한 설명은 HTML이 아닌 데이터이기 때문에 리액트는 새로운 props를 기존 컴포넌트에 병합하여 focus, typing input과 같은 중요한 UI 상태를 유지하거나 기존 콘텐츠에서 CSS transition을 트리거할 수 있다.


## Reference

- https://react.dev/blog/2020/12/21/data-fetching-with-react-server-components

- https://github.com/reactjs/rfcs/blob/bf51f8755ddb38d92e23ad415fc4e3c02b95b331/text/0000-server-components.md

- https://github.com/reactwg/server-components/discussions/5

- https://github.com/reactwg/server-components/discussions/4

- https://www.plasmic.app/blog/how-react-server-components-work#what-are-react-server-components

- https://tech.kakaopay.com/post/react-server-components/

- https://pyjun01.github.io/v/rsc/#client-component-%EB%82%B4%EB%B6%80%EC%97%90-server-component-%EB%A0%8C%EB%8D%94%EB%A7%81%ED%95%98%EA%B8%B0


## 보완할 점

- 합성으로 구성
- 버 컴포넌트가 이벤트 핸들러를 props로 전달 못하는 이유 => 직렬화
- RSC 기반 기술 (SSR/Concurrent/streaming SSR/Suspense)
- 서버 컴포넌트의 성능상 이점
	- Server Components let you put most of your data fetching on the server so that the client doesn’t need to make many requests. This also avoids client network waterfalls, which is typical for fetching in useEffect. Note that this achieves some of the benefits of GraphQL - though of course you may still combine Server Components with GraphQL.
	- ✨Server Components also let you add non-interactive features to your app without increasing the bundle size. Moving features from the client to the server decreases the initial code size and client JS parse time. Having fewer Client component layers also improves the client CPU time. The client can skip server-generated parts of the tree during reconciliation because it knows they could not have possibly been affected by any state updates.
- 컴포넌트 단위 refetching
	- 장점: You can (and should) use Client components at any level of the tree for fast interactions. Also, you don’t want to always refetch — the fetched trees can stay in the client cache and be reused for navigations like back button.