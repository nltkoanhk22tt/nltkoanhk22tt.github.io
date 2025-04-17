const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const mysql = require('mysql2');
require('dotenv').config();
const connection = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'expense_manager',
});

connection.connect((err) => {
  if (err) {
    console.error('Lỗi kết nối MySQL:', err.message);
    process.exit(1);
  }
  console.log('Kết nối MySQL thành công');
});
const authRoutes = require('./routes/authRoutes');
const expenseRoutes = require('./routes/expenseRoutes');

const app = express();
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/expenses', expenseRoutes);

app.post('/api/auth/register', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    connection.query(
      'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
      [username, email, hashedPassword],
      (err, result) => {
        if (err) {
          console.error('Lỗi MySQL:', err); // In lỗi chi tiết
          return res.status(400).json({ error: 'User already exists or invalid input' });
        }
        res.json({ message: 'User registered successfully' });
      }
    );
  } catch (error) {
    console.error('Lỗi server:', error); // In lỗi server
    res.status(500).json({ error: 'Internal server error' });
  }
});


const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
