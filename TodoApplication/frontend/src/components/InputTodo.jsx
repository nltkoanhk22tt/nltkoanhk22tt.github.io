// frontend/src/components/InputTodo.js
import React, { useState } from 'react';
import { FaPlus } from 'react-icons/fa';

function InputTodo({ addTodo }) {
  const [title, setTitle] = useState('');

  const handleAddTodo = () => {
    if (title.trim()) {
      addTodo(title);
      setTitle('');
    }
  };

  return (
    <div className="input-todo">
      <input
        type="text"
        placeholder="Nhập công việc..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button onClick={handleAddTodo}>
        <FaPlus />
      </button>
    </div>
  );
}

export default InputTodo;