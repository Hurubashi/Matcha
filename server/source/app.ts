import express, { Application, Request, Response, NextFunction } from 'express'
import './config/env'
import bodyParser from 'body-parser'
import morgan from 'morgan'
import users from './routes/user'
import auth from './routes/auth'
import image from './routes/image'
import heart from './routes/heart'
import search from './routes/search'
import chat from './routes/chat'
import message from './routes/message'
import ResManager from './util/ResManager'

import cookieParser from 'cookie-parser'

const app: Application = express()

app.use(cookieParser())

// Middleware
// if(process.env.NODE_ENV == 'development'){
app.use(morgan('dev'))
// }
// app.use(function(req: Request, res: Response, next: NextFunction) {
//   if (req.headers.origin) {
//     res.header('Access-Control-Allow-Origin', '*')
//     res.header('Access-Control-Allow-Headers', 'X-Requested-With,Content-Type,Authorization')
//     res.header('Access-Control-Allow-Methods', 'GET,PUT,PATCH,POST,DELETE')
//     if (req.method === 'OPTIONS') return res.sendStatus(200)
//   }
//   next()
// })

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(function (error: Error, req: Request, res: Response, next: NextFunction) {
	//Catch json error
	res.json(ResManager.error('JSON parsing error'))
})

app.use('/public', express.static(__dirname.slice(0, __dirname.length - 4) + 'public'))

import { ChatServer } from './util/ChatServer'

new ChatServer()

// io.on("connection", function(socket: any) {
//   console.log("a user connected");
//   // whenever we receive a 'message' we log it out
//   socket.on("message", function(message: any) {
//     console.log(message);

//     var ID = (socket.id).toString().substr(0, 5);
//     var time = (new Date).toLocaleTimeString();
//     // Посылаем клиенту сообщение о том, что он успешно подключился и его имя
//     socket.json.send({'event': 'connected', 'name': ID, 'time': time});
//     // Посылаем всем остальным пользователям, что подключился новый клиент и его имя
//     socket.broadcast.json.send({'event': 'userJoined', 'name': ID, 'time': time});
//     // Навешиваем обработчик на входящее сообщение
//     socket.on('message', function (message: any) {
//       var time = (new Date).toLocaleTimeString();
//       // Уведомляем клиента, что его сообщение успешно дошло до сервера
//       socket.json.send({'event': 'messageSent', 'name': ID, 'text': message, 'time': time});
//       // Отсылаем сообщение остальным участникам чата
//       socket.broadcast.json.send({'event': 'messageReceived', 'name': ID, 'text': message, 'time': time})
//     });
//     // При отключении клиента - уведомляем остальных
//     socket.on('disconnect', function() {
//       var time = (new Date).toLocaleTimeString();
//       io.sockets.json.send({'event': 'userSplit', 'name': ID, 'time': time});
//     });
//   });

// });

app.use('/message', message)
app.use('/chat', chat)
app.use('/search', search)
app.use('/user', users)
app.use('/auth', auth)
app.use('/image', image)
app.use('/heart', heart)

app.listen(process.env.APP_PORT, () => {
	console.log(`Server is running on port ${process.env.APP_PORT}`)
})
