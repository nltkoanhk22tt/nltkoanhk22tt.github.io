const User = {
  findByEmail: (email, callback) => {
    const sql = 'SELECT * FROM users WHERE email = ?';
    db.query(sql, [email], callback);
  },
  create: (userData, callback) => {
    const sql = 'INSERT INTO users (email, password) VALUES (?, ?)';
    db.query(sql, [userData.email, userData.password], callback);
  },
};
