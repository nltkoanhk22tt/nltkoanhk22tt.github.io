// backend/models/todoModel.js
const db = require('../db');

const getAllTodos = (callback) => {
  db.query('SELECT * FROM todos', (err, results) => {
    if (err) {
      console.log(err);
      return callback(err, null);
    }
    callback(null, results);
  });
};

const addTodo = (title, callback) => {
  db.query('INSERT INTO todos (title, completed) VALUES (?, ?)', [title, false], (err, results) => {
    if (err) {
      console.log(err);
      return callback(err, null);
    }
    callback(null, results);
  });
};

const updateTodo = (id, completed, callback) => {
  db.query('UPDATE todos SET completed = ? WHERE id = ?', [completed, id], (err, results) => {
    if (err) {
      console.log(err);
      return callback(err, null);
    }
    callback(null, results);
  });
};

const deleteTodo = (id, callback) => {
  db.query('DELETE FROM todos WHERE id = ?', [id], (err, results) => {
    if (err) {
      console.log(err);
      return callback(err, null);
    }
    callback(null, results);
  });
};

module.exports = { getAllTodos, addTodo, updateTodo, deleteTodo };