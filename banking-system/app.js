const express = require("express")
const app = express()
const cors = require("cors")
const morgan = require("morgan")
const bodyPareser = require("body-parser")
const conn = require("./db/connection")


const bankAccountRouter = require("./routes/bank-account")
const bankerRouter= require('./routes/banker')
const clientRouter= require('./routes/client')

app.use(morgan("dev"))
app.use(cors())



app.use(bodyPareser.urlencoded({
    extended: false
}))

app.use(bodyPareser.json())

const knex = conn.openConnection()

app.locals.knex = knex

// open database conn


// routes

app.use("/bankaccount",bankAccountRouter)

app.use("/banker",bankerRouter)
app.use("/client",clientRouter)


app.use((req, res, next) => {
    const error = new Error("Page not Found")
    error.status = 404
    next(error)
})

app.use((error, req, res, next) => {
    if (error.status = 404) {
        res.status(404).json({
            status: "error",
            msg: "Page not Found"
        })
        //error in bracetis } in if condtion
    }
})


module.exports = app