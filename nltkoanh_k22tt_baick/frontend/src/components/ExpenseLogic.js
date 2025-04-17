// Hàm thêm chi tiêu vào danh sách
export const addExpense = (expenses, newExpense) => {
    return [...expenses, newExpense];
  };
  
  // Hàm xóa chi tiêu khỏi danh sách
  export const deleteExpense = (expenses, id) => {
    return expenses.filter((expense) => expense.id !== id);
  };
  
  // Hàm tính tổng chi tiêu
  export const getTotalExpense = (expenses) => {
    return expenses.reduce((total, expense) => total + parseFloat(expense.amount), 0);
  };
  