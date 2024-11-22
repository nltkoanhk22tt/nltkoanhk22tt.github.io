const express = require('express');
const crypto = require('crypto')
const writeToFile = require('../utils/write-to-file')

const router = express.Router();
let todos = require('../data/todo.json')

// GET /api/todos/
router.get('/', (req, res) => {
    console.log(todos)
    res.status(200).json(
        todos
    )
})


// GET /api/todos/2b5a2686-1588-423c-88d9-f4456e02cc9f
router.get('/:id', (req, res) => {
    const todo = todos.filter(todo => todo.id == req.params.id)
    res.status(200).json(
        todo
    )
})

// POST /api/todos/
router.post('/', (req, res) => {
    let todo = req.body
    console.log("todo: ", todo)
    const id = crypto.randomUUID()
    todo.id = id
    console.log(todo)
    todos.push(todo)
    writeToFile(todos)
    res.status(201).json({ message: 'TODO created' })
})

// PUT /api/todos/2b5a2686-1588-423c-88d9-f4456e02cc9f
router.put('/:id', (req, res) => {
    const todo = todos.filter(todo => todo.id == req.params.id)[0]
    const newTodo = { ...todo, task: req.body.task }
    const index = todos.indexOf(todo)
    todos.splice(index, 1)
    todos.push(newTodo)
    writeToFile(todos)

    res.status(200).json({ message: 'Todo is updated' })
})

// DELETE /api/todos/2b5a2686-1588-423c-88d9-f4456e02cc9f
router.delete('/:id', (req, res) => {
    const todo = todos.filter(todo => todo.id == req.params.id)[0]
    const index = todos.indexOf(todo)
    todos.splice(index, 1)
    writeToFile(todos)

    res.status(200).json({ message: 'Todo is deleted' })
})

module.exports = router;