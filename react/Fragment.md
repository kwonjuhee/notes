
DOM에 별도의 wrapper 노드를 추가하지 않고 여러 엘리먼트를 그룹화하는 방법

```jsx
function Post({ title, body }) {
  return (
    <>
      <PostTitle title={title} />
      <PostBody body={body} />
    </>
  );
}
```

- 실제 DOM에 나타나지 않는다.
- 레이아웃이나 스타일에 영향을 주지 않는다.
- key가 없는 경우에는 보통 단축 문법 (`<></>`) 을 사용한다.


## key가 있는 Fragments

- key가 있는 경우 단축 문법을 사용할 수 없고 `React.Fragment`를 명시적으로 사용해야 한다.

```jsx
export default function Blog() {
  return posts.map(post =>
    <Fragment key={post.id}>
      <PostTitle title={post.title} />
      <PostBody body={post.body} />
    </Fragment>
  );
}
```