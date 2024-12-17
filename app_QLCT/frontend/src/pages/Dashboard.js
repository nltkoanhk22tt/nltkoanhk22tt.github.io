import React, { useEffect, useState } from 'react';
import { getExpenses, addExpense } from '../services/expenseService';
import InputExpense from '../components/InputExpense';
import ExpenseList from '../components/ExpenseList';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [expenses, setExpenses] = useState([]);
  const navigate = useNavigate();

  const fetchExpenses = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('Bạn cần đăng nhập!');
        navigate('/');
        return;
      }
      const res = await getExpenses(token);
      setExpenses(res.data);
    } catch (error) {
      console.error('Lỗi khi lấy dữ liệu:', error);
    }
  };

  const handleAddExpense = async (expenseData) => {
    try {
      const token = localStorage.getItem('token');
      await addExpense(expenseData, token);
      fetchExpenses(); // Reload danh sách sau khi thêm thành công
    } catch (error) {
      alert('Lỗi khi thêm khoản chi tiêu!');
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  return (
    <div>
      <h2>Quản Lý Chi Tiêu</h2>
      <InputExpense onAdd={handleAddExpense} />
      <ExpenseList expenses={expenses} />
    </div>
  );
};

export default Dashboard;
