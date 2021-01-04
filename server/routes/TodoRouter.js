const route = require("express").Router()
const TodoController = require("../controllers/todoControllers")
const authentications = require("../middlewares/authentication")
const authorization = require("../middlewares/authorization")

route.use(authentications)
route.get('/', TodoController.getTodos)
route.post('/', TodoController.addTodo)

route.get('/:id', authorization, TodoController.filterId)
route.put('/:id', authorization, TodoController.putTodos)
route.patch('/:id', authorization, TodoController.editStatusTodo)
route.delete('/:id', authorization, TodoController.deleteId)

module.exports = route