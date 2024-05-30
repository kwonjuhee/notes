
```jsx
function App() {    // App
    return (
      <div className="wrapper">    // W
        <div className="list">    // L
          <div className="list_item">List item A</div>    // LA
          <div className="list_item">List item B</div>    // LB
        </div>
        <div className="section">   // S
          <button>Add</button>   // SB
          <span>No. of items: 2</span>   // SS
        </div>
      </div>
    );
}
 
  ReactDOM.render(<App />, document.getElementById('root'));  // HostRoot
```

![[Fiber Tree.png]]
