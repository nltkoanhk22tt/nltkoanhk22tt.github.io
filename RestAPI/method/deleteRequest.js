const writeToFile = require('../utils/write-to-file');

module.exports = (req, res) => {
    // localhost:5000/api/todos/002 -> baseURL = api/todos - id = 002
    const baseURL = req.url.substring(0, req.url.lastIndexOf('/'));
    const id = req.url.substring(req.url.lastIndexOf('/') + 1);

    if (baseURL === '/api/todos' && id) {
        const data = req.todos.filter((todo) => todo.id == id);
        if (data.length > 0) {
            // delete data in DB
            todo = data[0];
            const index = req.todos.indexOf(todo);
            req.todos.splice(index, 1);
            writeToFile(req.todos);
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.write(JSON.stringify({ message: 'Todo is deleted' }));
            res.end();
        } else {
            res.statusCode = 404;
            res.setHeader('Content-Type', 'application/json');
            res.write(JSON.stringify({ message: 'Todo is not found' }));
            res.end();
        }
    } else {
        res.statusCode = 404;
        res.setHeader('Content-Type', 'application/json');
        res.write(JSON.stringify({ message: 'TODOS NOT FOUND' }));
        res.end();
    }
}