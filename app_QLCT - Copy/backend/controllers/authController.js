exports.register = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }
  
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    User.create({ email, password: hashedPassword }, (err, result) => {
      if (err) {
        console.error('Database error:', err);  // Thêm log lỗi ở đây
        return res.status(500).json({ error: err.message || 'Database error' });
      }
      res.status(201).json({ message: 'User registered' });
    });
  } catch (error) {
    console.error('Error in registration process:', error);  // Log lỗi thêm tại đây
    res.status(500).json({ error: error.message || 'Internal server error' });
  }
};



exports.login = (req, res) => {  // Đổi thành "login"
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
