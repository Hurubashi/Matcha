import express from "express"
import * as http from "http"
// import cors from "cors"
import { Message } from "../models/Message"
import { User } from "../models/User"

export class ChatServer {
  public static readonly PORT:number = 8080
  private app: express.Application
  private server: http.Server
  private io: SocketIO.Server
  private port: string | number

  constructor() {
    this.app = express()
    // this.app.use(cors())
    this.port = process.env.SOCKET_PORT || ChatServer.PORT
    this.server = http.createServer(this.app)
    this.io = require("socket.io").listen(this.server, { origins: '*:*'})
    this.listen()
  }

  private listen(): void {
    this.server.listen(this.port, () => {
      console.log("Running server on port %s", this.port);
    })

    this.io.on("connect", (socket: any) => {
      console.log("Connected client on port %s.", this.port);
      socket.on("message", (m: Message) => {
        console.log("[server](message): %s", JSON.stringify(m));
        this.io.emit("message", m);
      })

      socket.on("disconnect", () => {
        console.log("Client disconnected");
      })
      
      socket.on('message', function (message: any) {
      var time = (new Date).toLocaleTimeString();
      // Уведомляем клиента, что его сообщение успешно дошло до сервера
      socket.json.send({'event': 'messageSent', 'text': message, 'time': time});
      // Отсылаем сообщение остальным участникам чата
      socket.broadcast.json.send({'event': 'messageReceived', 'text': message, 'time': time})
    })

    })
  }

  public getApp(): express.Application {
    return this.app;
  }
}