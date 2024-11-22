module.exports = (req, res) => {
    const baseURL = req.url.substring(0, req.url.lastIndexOf('/'));
    const id = req.url.substring(req.url.lastIndexOf('/') + 1);

    if (req.url === '/api/todos') {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.write(JSON.stringify(req.todos));
        res.end();
    } else if (baseURL === '/api/todos' && id) {
        const todo = req.todos.filter((todo) => todo.id == id);
        if (todo.length > 0) {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.write(JSON.stringify(todo));
            res.end();
        } else {
            res.statusCode = 404;
            res.setHeader('Content-Type', 'application/json');
            res.write(JSON.stringify({ message: 'TODO NOT FOUND' }));
            res.end();
        }
    } else {
        res.statusCode = 404;
        res.setHeader('Content-Type', 'application/json');
        res.write(JSON.stringify({ message: 'TODOS NOT FOUND' }));
        res.end();
    }
}