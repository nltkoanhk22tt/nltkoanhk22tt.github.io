const express = require('express');
const router = express.Router();


let users = [];

// Đăng ký người dùng
router.post('/register', (req, res) => {
    const { firstName, lastName, email, password } = req.body;
    users.push({ firstName, lastName, email, password });
    res.json({ message: 'User registered successfully!' });
});

// Đăng nhập người dùng
router.post('/login', (req, res) => {
    const { email, password } = req.body;
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
        res.json({ message: 'Login successful!', token: 'fake-jwt-token' });
    } else {
        res.status(401).json({ message: 'Invalid email or password' });
    }
});

module.exports = router;
