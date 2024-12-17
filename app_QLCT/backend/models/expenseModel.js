const db = require('../config/db');

const Expense = {
  create: (expense, callback) => {
    const sql = `INSERT INTO expenses (user_id, title, amount, date) VALUES (?, ?, ?, ?)`;
    db.query(sql, [expense.user_id, expense.title, expense.amount, expense.date], callback);
  },
  findAll: (user_id, callback) => {
    const sql = `SELECT * FROM expenses WHERE user_id = ?`;
    db.query(sql, [user_id], callback);
  },
  update: (id, expense, callback) => {
    const sql = `UPDATE expenses SET title = ?, amount = ?, date = ? WHERE id = ?`;
    db.query(sql, [expense.title, expense.amount, expense.date, id], callback);
  },
  delete: (id, callback) => {
    const sql = `DELETE FROM expenses WHERE id = ?`;
    db.query(sql, [id], callback);
  }
};

module.exports = Expense;
