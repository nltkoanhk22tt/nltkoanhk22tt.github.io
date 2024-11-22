const crypto = require('crypto')
const writeToFile = require('../utils/write-to-file');

module.exports = (req, res) => {
    const v4 = new RegExp(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i);

    const id = crypto.randomUUID();

    if (req.url === '/api/todos') {
        let body = "";
        req.on('data', (chunk) => {
            body += chunk.toString();
        });
        req.on('end', () => {
            req.body = JSON.parse(body);
            req.body = { id, ...req.body }

            req.todos.push(req.body);
            writeToFile(req.todos);
            res.statusCode = 201;
            res.statusMessage = "Created todo"
            res.setHeader('Content-Type', 'application/json');
            res.write(JSON.stringify({ message: 'TODO created' }));
            res.end();
        });
    }
    else {
        res.statusCode = 404;
        res.setHeader('Content-Type', 'application/json');
        res.write(JSON.stringify({ message: 'Route is not found' }));
        res.end();
    }
}