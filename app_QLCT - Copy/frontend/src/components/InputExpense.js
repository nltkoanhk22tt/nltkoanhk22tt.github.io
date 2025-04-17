import React, { useState } from 'react';

const InputExpense = ({ onAdd }) => {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title && amount) {
      onAdd({ title, amount });
      setTitle('');
      setAmount('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Tên khoản chi"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="number"
        placeholder="Số tiền"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <button type="submit">Thêm</button>
    </form>
  );
};

export default InputExpense;
