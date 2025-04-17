const db = require('../config/db');

const User = {
  findByEmail: (email, callback) => {
    const sql = 'SELECT * FROM users WHERE email = ?';
    db.query(sql, [email], callback);
  },
  create: (userData, callback) => {
    const sql = 'INSERT INTO users SET ?';
    db.query(sql, userData, callback);
  },
};

module.exports = User;
