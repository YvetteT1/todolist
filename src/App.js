import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";

function App() {
  // react way
  const [inputValue, setInputValue] = useState("");
  const [todos, setTodos] = useState(["할일 1", "할일 2"]);
  // state 변화하는 값
  // React -> state가 변할때마다 화면을 다시 그린다.
  // ["할일 1", "할일 2"];

  return (
    // JSX (JS -> HTML)
    <div className="App">
      <h1>TODO LIST</h1>
      <div>
        <input />
        <button>ADD</button>
      </div>
      {/* DRY Don't Repeat Yourself */}
      {todos.map((todo, index) => (
        <div key={index}>
          <input type="checkbox" />
          <span>{todo}</span>
          <button>DEL</button>
        </div>
      ))}
    </div>
  );
}

export default App;


/* <ul>
<li>
  <input type="checkbox" />
  Task 1<button>수정</button>
  <button>X</button>
</li>
<li>
  <input type="checkbox" />
  Task 2<button>수정</button>
  <button>X</button>
</li>
</ul> */