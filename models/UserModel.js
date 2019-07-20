const BaseModel = require('../core/BaseModel')

class UserModel extends BaseModel{
  static get tableName () {
    return 'user'
  }

  static get jsonAttributes () {
    return ['refreshTokensMap']
  }

  // static get relationMappings () {
  //   return {
  //     posts: {
  //       relation: UserModel.HasManyRelation,
  //       modelClass: `${__dirname}/UserModel`,
  //       join: {
  //         from: 'user.id',
  //         to: 'post.userId'
  //       }
  //     }
  //   }
  // }

  /**
   * ------------------------------
   * @HOOKS
   * ------------------------------
   */
  $formatJson (json) {
    json = super.$formatJson(json)

    delete json.passwordHash
    delete json.tokenReset
    delete json.avatar

    return json
  }

  /**
   * ------------------------------
   * @METHODS
   * ------------------------------
   */

  static Create (data) {
    return this.query().insert(data)
  }

  static getByEmail (email) {

    return this.query().where({ email }).first()
      .then(data => {
        if (!data) throw this.errorEmptyResponse()
        return data
      }).catch(error => { throw error })
  }

  /**
   * @description check email availability in DB.
   * @param email
   * @returns {Promise<boolean>}
   */
  static IsEmailExist (email) {

    return this.query().where({ email }).first()
      .then(data => Boolean(data))
      .catch(error => { throw error })
  }
}

module.exports = UserModel
