// frontend/src/components/TodoApp.js
import React, { useState, useEffect } from 'react';
import Header from './Header';
import TodoLogic from './TodoLogic';
import '../App.css';

function TodoApp() {
  return (
    <div className="todo-app">
      <Header />
      <TodoLogic />
    </div>
  );
}

export default TodoApp;