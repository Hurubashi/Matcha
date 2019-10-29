import express, { Application, Request, Response, NextFunction } from 'express'
import users from './routes/users'

const app: Application = express()

app.get("/", (req: Request, res: Response, next: NextFunction) => {
    res.send("Hello world")
})

app.use(users)

app.listen(5000, () => {
    console.log('Server is running')
})