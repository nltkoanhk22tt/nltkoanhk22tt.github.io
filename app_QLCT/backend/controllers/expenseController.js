const Expense = require('../models/expenseModel');

exports.createExpense = (req, res) => {
  const { title, amount, date } = req.body;
  Expense.create({ user_id: req.user.id, title, amount, date }, (err) => {
    if (err) return res.status(400).json({ message: 'Error creating expense' });
    res.json({ message: 'Expense created successfully' });
  });
};

exports.getExpenses = (req, res) => {
  Expense.findAll(req.user.id, (err, results) => {
    if (err) return res.status(400).json({ message: 'Error fetching expenses' });
    res.json(results);
  });
};
