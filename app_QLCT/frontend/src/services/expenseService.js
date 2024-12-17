import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

export const getExpenses = async (token) => {
  return await axios.get(`${API_URL}/expenses`, {
    headers: { Authorization: token },
  });
};

export const addExpense = async (data, token) => {
  return await axios.post(`${API_URL}/expenses`, data, {
    headers: { Authorization: token },
  });
};
