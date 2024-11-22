// frontend/src/components/TodoItem.js
import React, { useState } from 'react';
import { FaTrashAlt, FaEdit } from 'react-icons/fa';

function TodoItem({ todo, toggleTodo, deleteTodo }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);

  const handleToggleComplete = () => {
    toggleTodo(todo.id, todo.completed);
  };

  const handleDelete = () => {
    deleteTodo(todo.id);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSaveEdit = () => {
    if (editTitle.trim()) {
      todo.title = editTitle;
      setIsEditing(false);
    }
  };

  return (
    <div className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={handleToggleComplete}
      />
      {isEditing ? (
        <input
          type="text"
          value={editTitle}
          onChange={(e) => setEditTitle(e.target.value)}
        />
      ) : (
        <label>{todo.title}</label>
      )}
      <div className="todo-actions">
        {isEditing ? (
          <button onClick={handleSaveEdit}>Save</button>
        ) : (
          <>
            <button onClick={handleEdit}><FaEdit /></button>
            <button onClick={handleDelete}><FaTrashAlt /></button>
          </>
        )}
      </div>
    </div>
  );
}

export default TodoItem;