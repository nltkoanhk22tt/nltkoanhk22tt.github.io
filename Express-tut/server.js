const express = require('express');
var morgan = require('morgan')
const router = require('./routes/router')

app = express();

app.use(express.json())
app.use(morgan('combined'))

app.use('/', express.static('public'))

app.use('/api', router)

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.listen(3000, () => {
    console.log("Server is running on port 3000!")
})

