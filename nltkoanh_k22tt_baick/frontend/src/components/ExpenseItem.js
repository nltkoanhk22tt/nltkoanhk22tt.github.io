import React from 'react';

const ExpenseItem = ({ expense, onDelete }) => {
  return (
    <li>
      {expense.amount} VND - {expense.description} ({expense.category}){' '}
      <button onClick={() => onDelete(expense.id)}>Xóa</button>
    </li>
  );
};

export default ExpenseItem;
