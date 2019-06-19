const express = require('express')
const app = express()

// Routes
const userRouter = require("./routes/userRouter.js")
app.use("/api/users", userRouter)

// Db config

// Run server
const port = 5000

app.listen(port, () => console.log(`Server started on port ${port}`))