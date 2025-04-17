const Expense = require('../models/expenseModel'); // Cần thêm dòng này để import Expense model

exports.getExpenses = (req, res) => {
  Expense.findAllByUserId(req.user.id, (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
};

exports.addExpenses = (req, res) => {
  const expenseData = { ...req.body, user_id: req.user.id };
  Expense.create(expenseData, (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.status(201).json({ id: result.insertId, ...expenseData });
  });
};

exports.updateExpenses = (req, res) => {
  Expense.update(req.params.id, req.body, (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: 'Expense updated' });
  });
};

exports.deleteExpenses = (req, res) => {
  Expense.delete(req.params.id, (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: 'Expense deleted' });
  });
};
