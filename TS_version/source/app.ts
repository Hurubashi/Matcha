import express, { Application, Request, Response, NextFunction } from 'express'
import "./config/env"
import morgan from 'morgan'
import users from './routes/users'

const app: Application = express()

// Middleware
// if(process.env.NODE_ENV == 'development'){
    app.use(morgan('dev'))
// }

app.get("/", (req: Request, res: Response, next: NextFunction) => {
    res.send("Hello world")
})

app.use('/api/users', users);

app.listen(5000, () => {
    console.log('Server is running')
})