// frontend/src/components/TodoLogic.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import InputTodo from './InputTodo';
import TodoList from './TodoList';

function TodoLogic() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/todos')
      .then(response => setTodos(response.data))
      .catch(error => console.error(error));
  }, []);

  const addTodo = (title) => {
    axios.post('http://localhost:5000/api/todos', { title })
      .then(response => setTodos([...todos, response.data]))
      .catch(error => console.error(error));
  };

  const toggleTodo = (id, completed) => {
    axios.put(`http://localhost:5000/api/todos/${id}`, { completed: !completed })
      .then(() => setTodos(todos.map(todo => todo.id === id ? { ...todo, completed: !completed } : todo)))
      .catch(error => console.error(error));
  };

  const deleteTodo = (id) => {
    axios.delete(`http://localhost:5000/api/todos/${id}`)
      .then(() => setTodos(todos.filter(todo => todo.id !== id)))
      .catch(error => console.error(error));
  };

  return (
    <div className="todo-logic">
      <InputTodo addTodo={addTodo} />
      <TodoList todos={todos} toggleTodo={toggleTodo} deleteTodo={deleteTodo} />
    </div>
  );
}

export default TodoLogic;