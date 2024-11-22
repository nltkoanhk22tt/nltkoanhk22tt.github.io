// backend/controllers/todoController.js
const Todo = require('../models/todoModel');

const getTodos = (req, res) => {
  Todo.getAllTodos((err, todos) => {
    if (err) {
      return res.status(500).send('Có lỗi khi lấy danh sách Todo.');
    }
    res.json(todos);
  });
};

const addTodo = (req, res) => {
  const { title } = req.body;
  Todo.addTodo(title, (err, result) => {
    if (err) {
      return res.status(500).send('Có lỗi khi thêm Todo.');
    }
    res.status(201).json({ id: result.insertId, title, completed: false });
  });
};

const updateTodo = (req, res) => {
  const { id } = req.params;
  const { completed } = req.body;
  Todo.updateTodo(id, completed, (err, result) => {
    if (err) {
      return res.status(500).send('Có lỗi khi cập nhật Todo.');
    }
    res.json({ id, completed });
  });
};

const deleteTodo = (req, res) => {
  const { id } = req.params;
  Todo.deleteTodo(id, (err, result) => {
    if (err) {
      return res.status(500).send('Có lỗi khi xóa Todo.');
    }
    res.status(204).send();
  });
};

module.exports = { getTodos, addTodo, updateTodo, deleteTodo };