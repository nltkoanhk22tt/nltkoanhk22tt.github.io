const http = require('http');
require('dotenv').config();
const todos = require('./data/todo.json');
const getRequest = require('./method/getRequest');
const postRequest = require('./method/postRequest');
const putRequest = require('./method/putRequest');
const deleteRequest = require('./method/deleteRequest');

const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {

  req.todos = todos;
  switch (req.method) {
    case 'GET':
      getRequest(req, res);
      break;
    case 'POST':
      postRequest(req, res);
      break;
    case 'PUT':
      putRequest(req, res);
      break;
    case 'DELETE':
      deleteRequest(req, res);
      break;

    default:
      res.statusCode = 404;
      res.setHeader('Content-Type', 'application/json');
      res.write(JSON.stringify({ message: 'ROUTE NOT FOUND' }));
      res.end();
      break;
  }
});

server.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});