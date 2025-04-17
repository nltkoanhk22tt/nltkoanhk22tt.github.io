const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

require('dotenv').config();


const authRoutes = require('./routes/authRoutes');
const expenseRoutes = require('./routes/expenseRoutes');

const app = express();
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());


app.use('/api/auth', authRoutes);
app.use('/api/expenses', expenseRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
