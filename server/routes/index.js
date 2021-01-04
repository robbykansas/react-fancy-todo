const route = require("express").Router()
const todoRoute = require("./TodoRouter")
const UserController = require("../controllers/userControllers")
const Controllers = require("../controllers/controllers")


route.use('/todos', todoRoute)
route.post('/register', UserController.register)
route.post('/login', UserController.login)
route.post('/googleLogin', UserController.googleLogin)
route.get('/quote', Controllers.generateQuote)

module.exports = route