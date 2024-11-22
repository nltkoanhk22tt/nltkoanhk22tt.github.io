const writeToFile = require("../utils/write-to-file");

module.exports = (req, res) => {
    // localhost:5000/api/todos/002 -> baseURL = api/todos - id = 002
    const baseURL = req.url.substring(0, req.url.lastIndexOf('/'));
    const id = req.url.substring(req.url.lastIndexOf('/') + 1);

    if (baseURL === '/api/todos' && id) {
        let data = req.todos.filter((todo) => todo.id == id);
        if (data.length > 0) {
            // delete old data in DB
            todo = data[0];
            const index = req.todos.indexOf(todo);
            console.log(index);
            req.todos.splice(index, 1);
            // update DB with new data
            let body = "";
            req.on('data', (chunk) => {
                body += chunk.toString();
            });
            req.on('end', () => {
                req.body = JSON.parse(body);
                todo = data[0]; // todo = { id: '003', task: 'clean house' }
                todo = { ...todo, task: req.body.task }; // todo = { id: '003', task: 'play game' }
                req.todos.push(todo);
                writeToFile(req.todos);
            });

            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.write(JSON.stringify({ message: 'Todo is updated' }));
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