import express, { Application, Request, Response, NextFunction } from 'express'
import './config/env'
import bodyParser from 'body-parser'
import morgan from 'morgan'
import users from './routes/users'
import auth from './routes/auth'

import cookieParser from 'cookie-parser'

const app: Application = express()

app.use(cookieParser())

// Middleware
// if(process.env.NODE_ENV == 'development'){
app.use(morgan('dev'))
// }
app.use(function(req: Request, res: Response, next: NextFunction) {
  if (req.headers.origin) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'X-Requested-With,Content-Type,Authorization')
    res.header('Access-Control-Allow-Methods', 'GET,PUT,PATCH,POST,DELETE')
    if (req.method === 'OPTIONS') return res.sendStatus(200)
  }
  next()
})

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// app.use('/public', express.static(__dirname + '/public'));
app.use('/api/user', users)
app.use('/api/auth', auth)

app.listen(5000, () => {
  console.log('Server is running')
})
