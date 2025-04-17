const db = require('../config/db');

const Expense = {
  findAllByUserId: (userId, callback) => {
    const sql = 'SELECT * FROM expenses WHERE user_id = ?'; // Sửa "todos" thành "expenses"
    db.query(sql, [userId], callback);
  },
  create: (expenseData, callback) => {
    const sql = 'INSERT INTO expenses SET ?'; // Sửa "todos" thành "expenses"
    db.query(sql, expenseData, callback); // Sửa user_id thành expenseData
  },
  update: (id, updatedData, callback) => {
    const sql = 'UPDATE expenses SET ? WHERE id = ?'; // Sửa "todos" thành "expenses"
    db.query(sql, [updatedData, id], callback);
  },
  delete: (id, callback) => {
    const sql = 'DELETE FROM expenses WHERE id = ?'; // Sửa "todos" thành "expenses"
    db.query(sql, [id], callback);
  },
};

module.exports = Expense;
