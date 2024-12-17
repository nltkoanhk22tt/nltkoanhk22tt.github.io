import React, { useState } from 'react';
import { register } from '../services/authService';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      alert('Mật khẩu xác nhận không khớp!');
      return;
    }

    try {
      await register({ email, password });
      alert('Đăng ký thành công! Vui lòng đăng nhập.');
      navigate('/'); // Chuyển về trang đăng nhập
    } catch (error) {
      alert('Đăng ký thất bại, vui lòng thử lại.');
    }
  };

  return (
    <div>
      <h2>Đăng ký</h2>
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
      <input
        type="password"
        placeholder="Xác nhận mật khẩu"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      <button onClick={handleRegister}>Đăng ký</button>
      <p>Đã có tài khoản? <a href="/">Đăng nhập</a></p>
    </div>
  );
};

export default Register;
