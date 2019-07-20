const router = require('express').Router()

const actions = require('../actions/user')
const BaseController = require('../core/BaseController')

class UserController extends BaseController {
  get router () {
    router.param('id', prepareUserId)

    router.get('/user', this.actionRunner(actions.ListAction))
    router.get('/user/current', this.actionRunner(actions.GetCurrentUserAction))
    router.get('/user/:id', this.actionRunner(actions.GetByIdAction))
    router.post('/user', this.actionRunner(actions.CreateAction))
    router.patch('/user', this.actionRunner(actions.UpdateAction))
    router.delete('/user/:id', this.actionRunner(actions.RemoveAction))

    router.post('/user/change-password', this.actionRunner(actions.ChangePasswordAction))
    router.post('/user/send-reset-email', this.actionRunner(actions.SendResetEmailAction))
    router.post('/user/reset-password', this.actionRunner(actions.ResetPasswordAction))

    router.post('/user/confirm-email', this.actionRunner(actions.ConfirmEmailAction))
    router.post('/user/send-email-confirm-token', this.actionRunner(actions.SendEmailConfirmTokenAction))
    router.post('/user/change-email', this.actionRunner(actions.ChangeEmailAction))

    return router
  }

  async init () {
    __logger.info(`${this.constructor.name} initialized...`)
  }
}

function prepareUserId (req, res, next) {
  const id = Number(req.params.id)
  if (id) req.params.id = id
  next()
}

module.exports = new UserController()

