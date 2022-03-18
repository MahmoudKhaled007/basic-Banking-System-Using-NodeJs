const bankerRouter= require("express").Router()
const bankerController= require("../controllers/banker")


const bank_accoutController= require("../controllers/bank-account")
const clientController= require("../controllers/client")

const middleWares = require("../util/middlewares")

//-----------FOR BANK-----
bankerRouter.get("/bankaccount",middleWares.checkBankerAuth, bank_accoutController.selectBankAccount)
bankerRouter.post("/bankaccount",  middleWares.checkBankerAuth,bank_accoutController.addBankAccount)
 bankerRouter.post("/login", bankerController.login)
bankerRouter.put("/bankaccount/:id",middleWares.checkBankerAuth,bank_accoutController.updateBankAccount )
bankerRouter.delete("/bankaccount/:id", middleWares.checkBankerAuth,bank_accoutController.deleteBankAccount)
bankerRouter.patch("/bankaccount/:id", middleWares.checkBankerAuth,bank_accoutController.restoreBankAccount)

//-----------FOR CLIENT-----
bankerRouter.get("/client", middleWares.checkBankerAuth,clientController.selectClient)
bankerRouter.post("/client",  middleWares.checkBankerAuth,clientController.addClient)
bankerRouter.put("/client/:id",middleWares.checkBankerAuth,clientController.updateClient )
bankerRouter.delete("/client/:id", middleWares.checkBankerAuth,clientController.deleteClient)
bankerRouter.patch("/client/:id", middleWares.checkBankerAuth,clientController.restoreClient)

module.exports = bankerRouter