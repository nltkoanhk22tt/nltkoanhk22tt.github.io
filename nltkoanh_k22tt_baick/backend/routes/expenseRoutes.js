const express = require('express');
const router = express.Router();
const { getExpenses, addExpenses, updateExpenses, deleteExpenses } = require('../controllers/expenseController');
const authMiddleware = require('../middleware/authMiddleware');


router.get('/', authMiddleware, getExpenses);
router.post('/', authMiddleware, addExpenses);
router.put('/:id', authMiddleware, updateExpenses);
router.delete('/:id', authMiddleware, deleteExpenses);

module.exports = router;
