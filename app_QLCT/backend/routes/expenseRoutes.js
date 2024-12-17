const express = require('express');
const router = express.Router();
const { createExpense, getExpenses } = require('../controllers/expenseController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', authMiddleware, createExpense);
router.get('/', authMiddleware, getExpenses);

module.exports = router;
