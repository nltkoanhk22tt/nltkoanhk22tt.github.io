const express = require('express');
const router = express.Router();


const posts = [
    { id: 1, content: "Bài viết đầu tiên" },
    { id: 2, content: "Bài viết thứ hai" }
];


router.get('/', (req, res) => {
    res.json(posts);
});

module.exports = router;
