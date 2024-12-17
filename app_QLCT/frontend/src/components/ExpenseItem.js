import React from 'react';

const ExpenseItem = ({ expense }) => {
  return (
    <li>
      {expense.title} - {expense.amount} VND
    </li>
  );
};

export default ExpenseItem;
