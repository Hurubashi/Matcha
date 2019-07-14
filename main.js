require('dotenv').config()
require('./globals')()

const Knex = require('knex')

const Server = require('./core/Server')
const controllers = require('./controllers')
const config = require('./config')
const middlewares = require('./middlewares')








/********
const express = require('express')
const app = express()

// Routes
const userRouter = require("./routes/userRouter.js")
app.use("/api/users", userRouter)

// Db config

// Run server
const port = 5000

app.listen(port, () => console.log(`Server started on port ${port}`))
******/
