const express = require('express');
const router = express.Router();
const routeUser = require('./routeUser')
const routeAdmin = require('./routeAdmin')
const routeTodo = require('./routetodo')

// /api/users/
router.use('/users', routeUser)
// /api/admin/
router.use('/admin', routeAdmin)
// /api/todos/
router.use('/todos', routeTodo)


module.exports = router;










