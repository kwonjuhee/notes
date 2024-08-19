
- https://react.dev/blog/2022/03/29/react-v18#new-suspense-features
- https://fe-developers.kakaoent.com/2021/211127-211209-suspense/
- https://17.reactjs.org/docs/concurrent-mode-suspense.html#traditional-approaches-vs-suspense
- https://hackernoon.com/unravelling-the-suspense-about-render-as-you-fetch-in-react

todo
- https://www.developerway.com/posts/how-to-fetch-data-in-react
- https://ko.react.dev/reference/react/useEffect#what-are-good-alternatives-to-data-fetching-in-effects

## Suspense란?

```jsx
<Suspense fallback={<Loading />}>  
  <SomeComponent />  
</Suspense>
```

children의 로딩이 끝날 때까지 fallback을 보여주는 컴포넌트
- 렌더링중에 children이 일시중단(suspend)되면 `fallback` 렌더링으로 전환한다.
- 데이터가 준비되면 다시 children으로 전환한다.

> -  React 16에서 실험적 버전으로 등장하여 `React.lazy`와 함께 코드 스플리팅을 위해서만 사용할 수 있었다.
> - React 18에서 서버 지원을 추가하고 concurrent features를 통해 기능을 확장하여 정식 출시되었다. [[Suspense in React 18]]


데이터 페칭 라이브러리가 컴포넌트가 읽고 있는 데이터가 아직 준비되지 않았다고 React와 소통하기 위한 메커니즘이다. 그러면 React는 데이터가 준비될 때까지 기다렸다가 UI를 업데이트할 수 있다.

## 전통적인 data fetching 접근 방식과 문제점

### Fetch-on-render (not using Suspense)

- 컴포넌트 렌더링을 시작하고 effects나 라이프사이클 메서드에서 데이터 페칭을 트리거하는 방법
- 컴포넌트가 화면에 렌더링된 이후까지 데이터 페칭을 수행하지 않는다.
- waterfall 문제가 발생할 수 있다.
	- waterfall : 병렬 처리되어야 할 의도지 않은 시퀀스

```jsx
function ProfilePage() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchUser().then(u => setUser(u));
  }, []);
  
  if (user === null) {
    return <p>Loading profile...</p>;
  }
  
  return (
    <>
      <h1>{user.name}</h1>
      <ProfileTimeline />
    </>
  );
}

function ProfileTimeline() {
  const [posts, setPosts] = useState(null);

  // fetchUser가 수행된 후에야 fetchPost 수행
  // waterfall 발생
  useEffect(() => {
    fetchPosts().then(p => setPosts(p));
  }, []);
  
  if (posts === null) {
    return <h2>Loading posts...</h2>;
  }
  
  return (
    <ul>
      {posts.map(post => (
        <li key={post.id}>{post.text}</li>
      ))}
    </ul>
  );
}
```

### Fetch-then-render (not using Suspense)

- 먼저 다음 화면의 모든 데이터를 가져와서 새 화면을 렌더링하는 방법
- 데이터가 모두 준비될 때까지 아무것도 할 수 없다.
- 라이브러리는 데이터 페칭을 보다 중앙집중화된 방식으로 수행하여 waterfall을 방지할 수 있다.
	- Relay는 컴포넌트에 필요한 데이터에 대한 정보를 정적으로 분석가능한 조각으로 이동하고 나중에 단일 쿼리로 구성하여 이 문제를 해결한다.

```jsx
// relay의 동작과 비슷하게 작성한 것
function fetchProfileData() {
  return Promise.all([
    fetchUser(),
    fetchPosts()
  ]).then(([user, posts]) => {
    return {user, posts};
  })
}
```

- waterfall은 해결했지만 다른 문제가 발생한다. `fetchProfileData` 내부에서 Promise.all을 사용하여 모든 데이터가 반환될 때까지 기다리므로 user보다 posts가 오래 걸리는 작업이라면 posts를 가져올 때까지 profile을 렌더링할 수 없다.
- Promise.all을 제거하고 개별적으로 promise를 기다려서 해결할 수 있지만 이 접근 방식은 데이터와 컴포넌트 트리의 복잡성이 커질수록 점점 더 어려워진다. 데이터 트리의 일부분이 누락되거나 stale할 때 신뢰할 수 있는 컴포넌트를 작성하기 어렵다. 따라서 새 화면에 대한 모든 데이터를 가져온 다음 렌더링하는 것이 더 실용적일 수 있다.

### Render-as-You-Fetch (using Suspense)

- 먼저 다음 화면에 필요한 모든 데이터 페칭을 시작하고 이에 대한 응답을 받기 전에 즉시 새 화면 렌더링을 시작하는 방법
	- Start fetching -> Start Rendering -> Finish fetching
- 데이터가 도착하면 React는 데이터가 필요한 컴포넌트 렌더링을 다시 시도한다.
- Suspense를 사용하면 데이터 페칭 응답을 기다리기 전에 렌더링을 시작할 수 있다. 실제로 네트워크 요청을 시작한 후 거의 즉시 렌더링을 시작한다.

```jsx
// https://codesandbox.io/s/frosty-hermann-bztrp?file=/src/fakeApi.js
export function fetchProfileData(userId) {
  let userPromise = fetchUser(userId);
  let postsPromise = fetchPosts(userId);

  return {
    userId,
    user: wrapPromise(userPromise),
    posts: wrapPromise(postsPromise)
  };
}

// Suspense integrations like Relay implement
// a contract like this to integrate with React.
// Real implementations can be significantly more complex.
// Don't copy-paste this into your project!
function wrapPromise(promise) {
  let status = "pending";
  let result;
  let suspender = promise.then(
    r => {
      status = "success";
      result = r;
    },
    e => {
      status = "error";
      result = e;
    }
  );
  
  return {
    read() {
      if (status === "pending") {
        throw suspender;
      } else if (status === "error") {
        throw result;
      } else if (status === "success") {
        return result;
      }
    }
  };
}
```

```jsx
// This is not a Promise. It's a special object from our Suspense integration.
const resource = fetchProfileData();

function ProfilePage() {
  return (
    <Suspense fallback={<h1>Loading profile...</h1>}>
      <ProfileDetails />
      <Suspense fallback={<h1>Loading posts...</h1>}>
        <ProfileTimeline />
      </Suspense>
    </Suspense>
  );
}

function ProfileDetails() {
  // Try to read user info, although it might not have loaded yet
  const user = resource.user.read();
  return <h1>{user.name}</h1>;
}

function ProfileTimeline() {
  // Try to read posts, although they might not have loaded yet
  const posts = resource.posts.read();
  return (
    <ul>
      {posts.map(post => (
        <li key={post.id}>{post.text}</li>
      ))}
    </ul>
  );
}
```

1. 이미 `fetchProfileData()`에서 요청을 시작했다. Promise 대신 특별한 resource를 제공했고 실제로는 데이터 라이브러리에 의해 제공될 것이다.
2. React는 `<ProfilePage>`를 렌더링하려고 시도한다.
3. React는 `<ProfileDetails>`를 렌더링하려고 시도한다. 이는 `resource.user.read()`를 호출한다. 아직 가져온 데이터가 없으므로 이 컴포넌트는 "일시 중단(suspend)"된다. React는 이를 건너뛰고 트리의 다른 컴포넌트를 렌더링하려고 시도한다.
4. React가 `<ProfileTimeline>`을 렌더링하려고 시도한다. 3과 동일하게 일시 중단되고 렌더링을 건너뛴다.
5. 이제 렌더링을 시도할 것이 아무것도 남지 않았다. `<ProfileDetails>`가 일시 중단되었기 때문에 React는 트리에서 그 위에 가장 가까운 suspense fallback을 표시한다. (여기서는 `<h1>Loading profile...</h1>`)
6. `resource.user`를 불러오면 fallback이 없어지고 `<ProfileDetails>` 컴포넌트가 렌더링된다.

이 접근 방식을 사용하면 코드와 데이터를 동시에 가져오기 시작할 수 있으므로 훨씬 더 나은 사용자 경험을 제공할 수 있다.


## Race Conditions

race conditions는 코드가 실행될 순서에 대한 잘못된 가정으로 인해 발생하는 버그이다. `componentDidUpdate`와 같은 라이프사이클 메서드에서 데이터를 가져올 때 종종 발생한다. 여기에서도 Suspense가 도움이 될 수 있다.

```jsx
function getNextId(id) {
  // ...
}

function App() {
  const [id, setId] = useState(0);
  return (
    <>
      <button onClick={() => setId(getNextId(id))}>
        Next
      </button>
      <ProfilePage id={id} />
    </>
  );
}
```

여러 프로필 사이를 전환하는 Next 버튼을 빠르게 누르면, 이전 프로필의 요청은 이미 다른 id로 전환된 후에 응답받을 수 있으며 이 경우 다른 id에 대한 stale한 응답으로 새 상태를 덮어쓸 수 있다.

```jsx
function ProfilePage({ id }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchUser(id).then(u => setUser(u));
  }, [id]);
  
  if (user === null) {
    return <p>Loading profile...</p>;
  }
  
  return (
    <>
      <h1>{user.name}</h1>
      <ProfileTimeline id={id} />
    </>
  );
}

function ProfileTimeline({ id }) {
  const [posts, setPosts] = useState(null);

  useEffect(() => {
    fetchPosts(id).then(p => setPosts(p));
  }, [id]);
    
  if (posts === null) {
    return <h2>Loading posts...</h2>;
  }
  
  return (
  <ul>
    {posts.map(post => (
      <li key={post.id}>{post.text}</li>
    ))}
  </ul>
  );
}
```

### 해결 방법1. cleanup function

이 문제는 stale 요청을 무시하거나 취소하기위해 effect cleanup 함수를 사용하여 해결할 수 있지만 직관적이지 않고 디버깅하기 어렵다.

```jsx
function ProfilePage({ id }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    let canceled = false;
    fetchUser(id).then(u => {
      if (!canceled) {
        setUser(u);
      }
    });

    // id가 바뀌면 cleanup 함수가 실행되어 
    return () => {
      canceled = true;
    }
  }, [id]);
  
  if (user === null) {
    return <p>Loading profile...</p>;
  }
  
  return (
    <>
      <h1>{user.name}</h1>
      <ProfileTimeline id={id} />
    </>
  );
}

```

- id가 바뀌면 cleanup function이 실행되어 canceled 변수가 true로 변경된다.
- promise가 resolve되었을 때 canceled 변수가 false인 경우에만 상태를 업데이트한다.

=> 가장 마지막 클릭의 promise가 resolve 되었을 때만 업데이트를 수행하도록 할 수 있다.

https://medium.com/hackernoon/avoiding-race-conditions-when-fetching-data-with-react-hooks-220d6fd0f663

### 해결 방법 2. Suspense

state를 설정하기 위해 응답을 기다리지 않아도 된다. 오히려 그 반대다. 요청을 시작한 직후에 상태를 설정하고 렌더링을 시작한다. 그리고 데이터를 확보하자마자 React는 Suspense 컴포넌트 내부에 콘텐츠를 채운다(fills in).

위의 코드에서는 적절한 순간에 상태를 설정할 필요가 있었고 그렇지 않으면 오류가 발생했다. Suspense를 사용하면 응답이 오는 시간에 대해 많이 생각할 필요가 없다. 요청을 하는 즉시 상태를 설정하기 때문에 바로 이전 요청이 새로운 요청으로 대체되기 때문이다.

Suspense는 suspender가 throw된 (suspend된) 컴포넌트를 fallback으로 표시한다.

```jsx
// https://codesandbox.io/s/sparkling-field-41z4r3
const initialResource = fetchProfileData(0);

function App() {
  const [resource, setResource] = useState(initialResource);
  return (
    <>
      <button onClick={() => {
        const nextUserId = getNextId(resource.userId);
        setResource(fetchProfileData(nextUserId));
      }}>
        Next
      </button>
      <ProfilePage resource={resource} />
    </>
  );
}

function ProfilePage({ resource }) {
  return (
    <Suspense fallback={<h1>Loading profile...</h1>}>
      <ProfileDetails resource={resource} />
      <Suspense fallback={<h1>Loading posts...</h1>}>
        <ProfileTimeline resource={resource} />
      </Suspense>
    </Suspense>
  );
}

function ProfileDetails({ resource }) {
  const user = resource.user.read();
  return <h1>{user.name}</h1>;
}

function ProfileTimeline({ resource }) {
  const posts = resource.posts.read();
  return (
    <ul>
      {posts.map(post => (
        <li key={post.id}>{post.text}</li>
      ))}
    </ul>
  );
}
```

## Suspense를 사용해야 하는 이유

- 여러 데이터 페칭을 병렬적으로 수행하므로 waterfall 문제를 해결할 수 있다.
- 컴포넌트가 렌더링을 시작하자마자 데이터 페칭을 트리거하므로 데이터 페칭을 일찍 시작할 수 있다.
- 비동기 작업을 처리할 때 state와 effect를 제거하고 동기식 코드(like async/await)로 작성할 수 있기 때문에 코드 가독성이 향상되고 이해하기 쉬워진다.
- 데이터 페칭 컴포넌트 또는 hook은 데이터 페칭만 담당할 수 있다. fallback UI를 표시하는 것은 Suspense, 에러 핸들링은 ErrorBoundary로 수행된다. 이를 통해 책임 분리가 가능하다.
- 향후에 출시될 Suspense의 추가 기능들을 최소한의 코드 리팩터링을 통해 활용할 수 있다.