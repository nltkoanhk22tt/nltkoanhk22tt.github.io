exports.getExpenses = (req, res) => {  // Đổi tên thành getExpenses
  Expense.findAllByUserId(req.user.id, (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
};

exports.addExpenses = (req, res) => {  // Đổi tên thành addExpenses
  const expenseData = { ...req.body, user_id: req.user.id };
  Expense.create(expenseData, (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.status(201).json({ id: result.insertId, ...expenseData });
  });
};

exports.updateExpenses = (req, res) => {  // Đổi tên thành updateExpenses
  Expense.update(req.params.id, req.body, (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: 'Expense updated' });
  });
};

exports.deleteExpenses = (req, res) => {  // Đổi tên thành deleteExpenses
  Expense.delete(req.params.id, (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: 'Expense deleted' });
  });
};
