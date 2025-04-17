const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel'); // Cần thêm dòng này để import User model

exports.register = async (req, res) => {
  const { email, password } = req.body;

  // Kiểm tra email đã tồn tại chưa
  User.findByEmail(email, async (err, result) => {
    if (err) return res.status(500).json({ error: err });
    if (result.length > 0) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    User.create({ email, password: hashedPassword }, (err, result) => {
      if (err) return res.status(500).json({ error: err });
      res.status(201).json({ message: 'User registered successfully' });
    });
  });
};

exports.login = (req, res) => {
  const { email, password } = req.body;

  User.findByEmail(email, async (err, results) => {
    if (err || results.length === 0)
      return res.status(401).json({ message: 'Invalid email or password' });

    const isMatch = await bcrypt.compare(password, results[0].password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: results[0].id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  });
};
