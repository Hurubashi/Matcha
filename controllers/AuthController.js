const router = require('express').Router()

const actions = require('../actions/auth')
const BaseController = require('../core/BaseController')

class AuthController extends BaseController {
    get router () {
      router.post('/auth/login', this.actionRunner(actions.LoginAction))
    //   router.post('/auth/logout', this.actionRunner(actions.LogoutAction))
    //   router.post('/auth/refresh-tokens', this.actionRunner(actions.RefreshTokensAction))
  
      return router
    }

    async init () {
      __logger.info(`${this.constructor.name} initialized...`)
    }
  }
  
  module.exports = new AuthController()