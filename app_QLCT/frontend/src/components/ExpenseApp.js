import React, { useState } from 'react';
import { addExpense, deleteExpense, getTotalExpense } from './Logic';

const ExpenseApp = () => {
  // Trạng thái cho các trường nhập liệu và danh sách chi tiêu
  const [expenseData, setExpenseData] = useState({
    amount: '',
    description: '',
    category: '',
  });
  const [expenses, setExpenses] = useState([]);
  
  // Hàm xử lý khi người dùng nhập vào các trường
  const handleChange = (e) => {
    const { name, value } = e.target;
    setExpenseData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Hàm xử lý khi người dùng thêm chi tiêu
  const handleAddExpense = () => {
    if (expenseData.amount && expenseData.description && expenseData.category) {
      const newExpense = { ...expenseData, id: Date.now() };
      setExpenses(addExpense(expenses, newExpense));  // Thêm chi tiêu mới
      setExpenseData({ amount: '', description: '', category: '' }); // Làm trống các trường
    } else {
      alert('Vui lòng nhập đủ thông tin');
    }
  };

  // Hàm xử lý khi người dùng xóa chi tiêu
  const handleDeleteExpense = (id) => {
    setExpenses(deleteExpense(expenses, id));  // Xóa chi tiêu theo id
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

      <ul>
        {expenses.map((expense) => (
          <li key={expense.id}>
            {expense.amount} VND - {expense.description} ({expense.category}){' '}
            <button onClick={() => handleDeleteExpense(expense.id)}>Xóa</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExpenseApp;
