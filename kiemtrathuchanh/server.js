const express = require('express');
const path = require('path');
const morgan = require('morgan');
const userRoutes = require('./client/userRoutes');
const postRoutes = require('./client/postRoutes');

const app = express();
const PORT = 5000;


app.use(express.json());
app.use(morgan('dev'))
app.use(express.static(path.join(__dirname, 'public')));


app.use('/api/user', userRoutes);
app.use('/api/posts', postRoutes);


app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
