

서버사이드에서 prefetchQuery로 불러온 쿼리들은 dehydrate된 queryClient에 담겨있음

```tsx
{
  mutations: [],
  queries: [
      { state: [Object], queryKey: [Array], queryHash: '["user"]' },
      { state: [Object], queryKey: [Array], queryHash: '["event",1]' }
    ]
}
```

`<Hydrate>`는 dehydrateState로 받은 props를 캐시에 새팅하고 _core.hydrate() 함수를 호출하여 수화를 담당한다.

```tsx
// Hydrate.js
function useHydrate(state, options) {
  var queryClient = (0, _QueryClientProvider.useQueryClient)();

  var optionsRef = _react.default.useRef(options);

  optionsRef.current = options; // Running hydrate again with the same queries is safe,
  // it wont overwrite or initialize existing queries,
  // relying on useMemo here is only a performance optimization.
  // hydrate can and should be run *during* render here for SSR to work properly

  _react.default.useMemo(function () {
    if (state) {
      (0, _core.hydrate)(queryClient, state, optionsRef.current);
    }
  }, [queryClient, state]);
}

var Hydrate = function Hydrate(_ref) {
  var children = _ref.children,
      options = _ref.options,
      state = _ref.state;
  useHydrate(state, options);
  return children;
};
```

queryCache에 세팅

```tsx
// hydration.js
var queries = dehydratedState.queries || [];
queries.forEach(function (dehydratedQuery) {
  var _options$defaultOptio2;

  var query = queryCache.get(dehydratedQuery.queryHash); // Do not hydrate if an existing query exists with newer data

  if (query) {
    if (query.state.dataUpdatedAt < dehydratedQuery.state.dataUpdatedAt) {
      query.setState(dehydratedQuery.state);
    }

    return;
  } // Restore query

  queryCache.build(client, (0, _extends2.default)({}, options == null ? void 0 : (_options$defaultOptio2 = options.defaultOptions) == null ? void 0 : _options$defaultOptio2.queries, {
    queryKey: dehydratedQuery.queryKey,
    queryHash: dehydratedQuery.queryHash
  }), dehydratedQuery.state);
});
```

ssr 도중 useQuery를 만나면 해당 키로 캐싱된 값을 queryCache에서 찾아 렌더링 진행

또한 클라이언트에서 hydrate되는 경우에도 queryClient에 dehydrate했던 데이터를 바탕으로 진행

캐시에 유효한 데이터가 있다면 prefetch X

[https://abangpa1ace.tistory.com/267](https://abangpa1ace.tistory.com/267)

주의할점

- 다른 유저나 다른 요청들과 공유되지 않도록 queryClient 인스턴스를 앱에서 생성해야 한다.

[https://velog.io/@eunnbi/NextJS-React-Query-with-SSR](https://velog.io/@eunnbi/NextJS-React-Query-with-SSR)

[SSR | TanStack Query Docs](https://tanstack.com/query/v4/docs/react/guides/ssr)