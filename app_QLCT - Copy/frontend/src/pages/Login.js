import React, { useState } from 'react';
import { login } from '../services/authService';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await login({ email, password });
      localStorage.setItem('token', res.data.token);
      alert('Đăng nhập thành công!');
      navigate('/dashboard'); // Chuyển đến trang Dashboard
    } catch (error) {
      alert('Đăng nhập thất bại');
    }
  };

  return (
    <div>
      <h2>Đăng nhập</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Mật khẩu"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Đăng nhập</button>
      <p>Chưa có tài khoản? <a href="/register">Đăng ký</a></p>
    </div>
  );
};

export default Login;
