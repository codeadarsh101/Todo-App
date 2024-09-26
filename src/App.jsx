import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [editId, setEditId] = useState(null); // Use null instead of 0 for edit mode

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editId !== null) {
      // Update existing todo
      const updatedTodos = todos.map((t) =>
        t.id === editId ? { id: t.id, todo } : t
      );
      setTodos(updatedTodos);
      setEditId(null); // Reset edit mode
      setTodo(""); // Clear input
      return;
    }

    if (todo !== "") {
      // Add new todo
      setTodos([{ id: `${todo}-${Date.now()}`, todo }, ...todos]);
      setTodo("");
    }
  };

  const handleDelete = (id) => {
    const delTodo = todos.filter((to) => to.id !== id);
    setTodos([...delTodo]);
  };

  const handleEdit = (id) => {
    const editTodo = todos.find((i) => i.id === id);
    setTodo(editTodo.todo);
    setEditId(id); // Set the id of the todo to be edited
  };

  return (
    <div className="App">
      <div className="container">
        <h1>Todo List App</h1>

        <form className="todoForm" onSubmit={handleSubmit}>
          <input
            type="text"
            value={todo}
            onChange={(e) => setTodo(e.target.value)}
          />
          <button type="submit">{editId !== null ? "Edit" : "Go"}</button>
        </form>

        <ul className="allTodos">
          {todos.map((t) => (
            <li className="singleTodo" key={t.id}>
              <span className="todoText">{t.todo}</span>
              <button onClick={() => handleEdit(t.id)}>Edit</button>
              <button onClick={() => handleDelete(t.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
