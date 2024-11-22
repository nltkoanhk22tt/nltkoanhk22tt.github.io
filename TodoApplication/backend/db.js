const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',  // Thay đổi với thông tin kết nối của bạn
  password: 'password', // Thay đổi với thông tin kết nối của bạn
  database: 'todo_db' // Tạo một cơ sở dữ liệu mới nếu chưa có
});

db.connect((err) => {
  if (err) {
    console.error('Không thể kết nối đến MySQL: ' + err.stack);
    return;
  }
  console.log('Kết nối đến MySQL thành công');
});

module.exports = db;