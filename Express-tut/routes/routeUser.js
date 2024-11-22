const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.status(200).json(
        {
            id: '001',
            username: 'udck',
            age: 17
        }
    )
})

module.exports = router;