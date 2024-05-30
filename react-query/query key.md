
- https://tanstack.com/query/v4/docs/react/guides/query-keys
- https://tkdodo.eu/blog/effective-react-query-keys
- https://tkdodo.eu/blog/practical-react-query#treat-the-query-key-like-a-dependency-array

react query에서는 query key를 통해

- 데이터를 올바르게 캐시
- 자동으로 리페치
- query cache와 수동으로 상호작용 (https://tanstack.com/query/latest/docs/react/guides/filters?from=reactQueryV3&original=https%3A%2F%2Ftanstack.com%2Fquery%2Fv3%2Fdocs%2Fguides%2Ffilters#query-filters)

## query key란

- query cache는 key가 직렬화 + 해쉬되어 관리된다.
- 객체의 키의 순서와 관계없이 다음 쿼리들은 모두 동일하게 취급된다.

```tsx
useQuery(['todos', { status, page }], ...)
useQuery(['todos', { page, status }], ...)
useQuery(['todos', { page, status, other: undefined }], ...)
```

- 다음 쿼리 키는 동일하지 않다. 배열 요소는 순서가 중요하다.

```
useQuery(['todos', status, page], ...)
useQuery(['todos', page, status], ...)
useQuery(['todos', undefined, page, status], ...)
```

- key는 쿼리에 대해 유니크해야한다.
- react query는 cache에 key를 이용해 접근한다.
- key가 변경될 때마다 refetch가 자동으로 트리거된다. 따라서 데이터를 변경하는 state가 있는 경우 key에 저장한다. (searchParams 등)

```tsx
type State = 'all' | 'open' | 'done'
type Todo = {
  id: number
  state: State
}
type Todos = ReadonlyArray<Todo>

const fetchTodos = async (state: State): Promise<Todos> => {
  const response = await axios.get(`todos/${state}`)
  return response.data
}

export const useTodosQuery = (state: State) => {
    return useQuery(['todos', state], () => fetchTodos(state))
}

function Component() {
  const [filters, setFilters] = React.useState()
  const { data } = useTodosQuery(filters)

  return <Filters onApply={setFilters} />
}
```


## Effective React Query Keys

### Colocate

### Always use Array Keys

- string일수도 있지만 배열을 사용하여 통일성을 유지하자. 어쨋든 react query 내부적으로 배열로 변환한다.
- react query v4에서는 모든 키가 array여야 한다.

### Structure

- 일반적인 것부터 구체적인 것까지 쿼리 키를 구조화한다.
- 다음과 같은 구조를 사용하면 ['todos']와 관련된 모든 것을 invalidate할 수 있고 훨씬 유연하게 관리가 가능하다.

```
['todos', 'list', { filters: 'all' }]
['todos', 'list', { filters: 'done' }]
['todos', 'detail', 1]
['todos', 'detail', 2]
```

- mutation 응답 후 업데이트

```js
function useUpdateTitle() {
  return useMutation({
    mutationFn: updateTitle,
    onSuccess: (newTodo) => {
      // ✅ update the todo detail
      queryClient.setQueryData(['todos', 'detail', newTodo.id], newTodo)

      // ✅ update all the lists that contain this todo
      queryClient.setQueriesData(['todos', 'list'], (previous) =>
        previous.map((todo) => (todo.id === newTodo.id ? newtodo : todo))
      )
    },
  })
}
```

- 리스트와 디테일의 구조가 다르다면

```js
function useUpdateTitle() {
  return useMutation({
    mutationFn: updateTitle,
    onSuccess: (newTodo) => {
      queryClient.setQueryData(['todos', 'detail', newTodo.id], newTodo)

      // ✅ just invalidate all the lists
      queryClient.invalidateQueries({ queryKey: ['todos', 'list'] })
    },
  })
}
```

### Use Query Key factories

쿼리 키를 수동으로 선언하는 것은

- 오류 발생 위험
- 나중에 세분화하기 힘듦

```js
const todoKeys = {
  all: ['todos'] as const,
  lists: () => [...todoKeys.all, 'list'] as const,
  list: (filters: string) => [...todoKeys.lists(), { filters }] as const,
  details: () => [...todoKeys.all, 'detail'] as const,
  detail: (id: number) => [...todoKeys.details(), id] as const,
}
```

```js
// 🕺 모든 todos 삭제
queryClient.removeQueries(todoKeys.all)

// 🚀 모든 리스트 invalidate
queryClient.invalidateQueries(todoKeys.lists())

// 🙌 prefetch 하나의 todo
queryClient.prefetchQueries(todoKeys.detail(id), () => fetchTodo(id))
```



