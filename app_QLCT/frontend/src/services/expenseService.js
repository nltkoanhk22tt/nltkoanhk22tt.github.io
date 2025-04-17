import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

export const getExpenses = async (token) => {
  return await axios.get(`${API_URL}/expenses`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const addExpense = async (data, token) => {
  return await axios.post(`${API_URL}/expenses`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const updateExpense = async (id, data, token) => {
  return await axios.put(`${API_URL}/expenses/${id}`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const deleteExpense = async (id, token) => {
  return await axios.delete(`${API_URL}/expenses/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
