import { v4 as uuid } from "uuid";
import "./App.css";
import { useState } from "react";
import Modal from "react-modal"; // Import the Modal component from the react-modal library

Modal.setAppElement("#root"); // Set the root element for accessibility

function App() {
  // state 새로운 값으로 대체한다
  const [inputValue, setInputValue] = useState("");
  const [todos, setTodos] = useState([]);
  const [sort, setSort] = useState("");
  const [filter, setFilter] = useState("ALL"); //State to set ALL as default filter option
  const [updateIndex, setUpdateIndex] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // State to manage the modal visibility
  const computedTodos = todos

    .filter((todo) => { 
      if (filter === "ALL") return true;
      if (filter === "DONE") return todo.isDone === true;
      if (filter === "NOT_DONE") return todo.isDone === false;
    })
    .sort((a, b) => {
      if (sort === "none") return 0;
      if (sort === "createdAt") return b.createdAt - a.createdAt;
      if (sort === "content") return a.content.localeCompare(b.content);
    });

  return (
    <div className="App">
      <head>

      </head>
      <body>
      <h1>TODO LIST</h1>
      <div>
        <label>필터 : </label>
        <input
          type="radio"
          value="ALL"
          checked={filter === "ALL"}
          onChange={(e) => setFilter(e.target.value)}
        />
        <label>전체</label>
        <input
          type="radio"
          value="DONE"
          checked={filter === "DONE"}
          onChange={(e) => setFilter(e.target.value)}
        />
        <label>완료</label>
        <input
          type="radio"
          value="NOT_DONE"
          checked={filter === "NOT_DONE"}
          onChange={(e) => setFilter(e.target.value)}
        />
        <label>미완료</label>
      </div>
      <div>
        <label htmlFor="sort">정렬 : </label>
        <select value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="none">생성순</option>
          <option value="createdAt">최신순</option>
          <option value="content">가나다순</option>
        </select>
      </div>
      <div>
        <input
          // Input의 제어권을 React(JS)가 가지고 있을 수 있게, state값을 주입했다.
          value={inputValue}
          // Input의 값이 변하는 이벤트가 발생했을 때, 제어권을 가진 React(JS)의 state값을 변경한다.
          onChange={(e) => {
            setInputValue(e.target.value);
          }}
        />
        <button
          onClick={() => {
            const newTodo = {
              id: uuid(),
              content: inputValue,
              isDone: false,
              createdAt: Date.now(),
            };
            setTodos([...todos, newTodo]);
            setInputValue("");
          }}
        >
          ADD
        </button>
      </div>
      <div>
        {computedTodos.map((todo, index) => (
          <div key={todo.id}>
            <input
              type="checkbox"
              checked={todo.isDone}
              onChange={(e) => {
                const nextTodos = todos.map((todo, idx) =>
                  idx === index ? { ...todo, isDone: e.target.checked } : todo
                );
                setTodos(nextTodos);
              }}
            />
            <span style={{ textDecoration: todo.isDone ? "line-through" : "" }}>
              {todo.content}
            </span>
            <button
              onClick={() => {
                setUpdateIndex(index);
                setInputValue(todo.content);
                setIsModalOpen(true); // Open the modal when the "Update" button is clicked
              }}
            >
              Update
            </button>
            <button
              onClick={() => {
                const nextTodos = todos.filter((_, idx) => idx !== index);
                setTodos(nextTodos);
                setUpdateIndex(null);
                setInputValue("");
              }}
            >
              DEL
            </button>
          </div>
        ))}
      </div>

        {/* Modal */}
        <Modal
          isOpen={isModalOpen}
          onRequestClose={() => setIsModalOpen(false)}
          contentLabel="Update Todo Modal"
        >
          <h2>Update Todo</h2>
          
          <input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button
            onClick={() => {
              const updatedTodos = todos.map((todo, idx) =>
                idx === updateIndex ? { ...todo, content: inputValue } : todo
              );
              setTodos(updatedTodos);
              setUpdateIndex(null);
              setInputValue("");
              setIsModalOpen(false); // Close the modal after saving changes
            }}
          >
            Save
          </button>
          <button onClick={() => setIsModalOpen(false)}>Cancel</button>
        </Modal>
      </body>
      
      <footer>

      </footer>
    </div>
  );
}

export default App;
