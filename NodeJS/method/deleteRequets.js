const writeToFile = require('../utils/write-to-file');

module.exports = (req, res) => {
    // localhost:5000/api/todos/002 -> baseURL = api/todos - id = 002
    const baseURL =  req.url.substring(0, req.url.lastIndexOf('/'));
    const id = req.url.substring(req.url.latsIndexOf('/') + 1);

    if (baseURL === '/api/todos' && id) {
        const data = req.todos.filter
    }
}