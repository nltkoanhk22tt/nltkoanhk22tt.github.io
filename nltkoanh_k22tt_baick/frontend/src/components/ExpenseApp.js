import React, { useState } from 'react';
import { addExpense, deleteExpense, getTotalExpense } from './Logic';
import ExpenseList from './ExpenseList';

const ExpenseApp = () => {
  const [expenseData, setExpenseData] = useState({
    amount: '',
    description: '',
    category: '',
  });
  const [expenses, setExpenses] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setExpenseData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleAddExpense = () => {
    if (expenseData.amount && expenseData.description && expenseData.category) {
      const newExpense = { ...expenseData, id: Date.now() };
      setExpenses(addExpense(expenses, newExpense));
      setExpenseData({ amount: '', description: '', category: '' });
    } else {
      alert('Vui lòng nhập đủ thông tin');
    }
  };

  const handleDeleteExpense = (id) => {
    setExpenses(deleteExpense(expenses, id));
  };

  return (
    <div>
      <h1>Ứng dụng Quản lý Chi tiêu</h1>
      <div>
        <input
          type="number"
          name="amount"
          placeholder="Số tiền"
          value={expenseData.amount}
          onChange={handleChange}
        />
        <input
          type="text"
          name="description"
          placeholder="Mô tả"
          value={expenseData.description}
          onChange={handleChange}
        />
        <input
          type="text"
          name="category"
          placeholder="Loại chi tiêu"
          value={expenseData.category}
          onChange={handleChange}
        />
        <button onClick={handleAddExpense}>Thêm Chi tiêu</button>
      </div>

      <h2>Tổng chi tiêu: {getTotalExpense(expenses)} VND</h2>

      <ExpenseList expenses={expenses} onDelete={handleDeleteExpense} />
    </div>
  );
};

export default ExpenseApp;
