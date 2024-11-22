// backend/app.js
const express = require('express');
const cors = require('cors');
const todoRoutes = require('./routes/todoRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', todoRoutes);

app.listen(5000, () => {
  console.log('Server đang chạy trên cổng 5000');
});