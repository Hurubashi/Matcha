const joi = require('joi')
// const JoiToJsonSchema = require('joi-to-json-schema')
// const { checkAccessByTagService } = require('../services/security')

class BaseController {

  async validate (ctx, rules) {

    // map list of validation schemas
    let validationSchemas = Object.keys(rules).map(key => {
      return joi.validate(ctx[key], rules[key])
    })

    // execute validation
    await Promise.all(validationSchemas)
  }

  actionRunner (action) {

    if (!action.hasOwnProperty('run')) {
      throw new Error(`'run' method not declared in invoked '${action.name}' action`)
    }

    return async (req, res, next) => {

      const ctx = {
        currentUser: req.currentUser,
        body: req.body,
        query: req.query,
        params: req.params,
        ip: req.ip,
        method: req.method,
        url: req.url,
        headers: {
          'Content-Type': req.get('Content-Type'),
          Referer: req.get('referer'),
          'User-Agent': req.get('User-Agent')
        }
      }

      try {
        // Validate action input data
        // if (action.validationRules) {
        //   await this.validate(ctx, action.validationRules)
        // }

        // Fire action
        const response = await action.run(ctx)
      
        // Set headers
        // if (response.headers) res.set(response.headers)
        console.log('responce: ' + response)
        return res.json(response)
        // return res.status(response.status).json({
        //   success: response.success,
        //   message: response.message,
        //   data: response.data
        // })
      } catch (error) {
        error.req = ctx
        next(error)
      }
    }
  }
}

module.exports = BaseController
