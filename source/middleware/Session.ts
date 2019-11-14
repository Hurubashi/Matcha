import * as redis from 'redis'
import session from 'express-session'
import * as ConnectRedis from 'connect-redis'

// let store = ConnectRedis(session())

// const redis = require('redis')
// const session = require('express-session')
//
// let RedisStore = require('connect-redis')(session)
// let client = redis.createClient()
//
// app.use(
// 	session({
// 		store: new RedisStore({ client }),
// 		secret: 'keyboard cat',
// 		resave: false,
// 	})
// )