const clientRouter= require("express").Router()
const clientController= require("../controllers/client")
const middleWares = require("../util/middlewares")



clientRouter.put("/deposite/:id",clientController.deposite )
clientRouter.put("/withdraw/:id",clientController.withdraw )


module.exports = clientRouter