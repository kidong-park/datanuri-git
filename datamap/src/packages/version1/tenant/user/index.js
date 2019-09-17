/**
 *  Copyright (c) Electronics and Telecommunications Research Institute. All rights reserved.
 *  See License.txt in the project root for license information.
 */

const api = require('./api')
const validator = require('./validator')

/**
 * Api register
 * @param {object} app - Feather's app
 */
module.exports.api = (app) => {
  app.utils.services.register(app, app.v1, 'tenant/user/save', api.saveUser)
  app.utils.services.register(app, app.v1, 'tenant/user/update', api.updateUser)
  app.utils.services.register(app, app.v1, 'tenant/user/remove', api.removeUser)
  app.utils.services.register(app, app.v1, 'tenant/user/get', api.getUser)
  app.utils.services.register(app, app.v1, 'tenant/user/list', api.getUserList)
  app.utils.services.register(app, app.v1, 'tenant/user/password/reset', api.resetUserPassword)
  app.utils.services.register(app, app.v1, 'tenant/user/password/change', api.changeUserPassword)
}

/**
 * Validator register
 * @param {object} app - Feather's app
 */
module.exports.validator = (app) => {
  app.v1.service('tenant/user/save').hooks(validator.saveUser)
  app.v1.service('tenant/user/update').hooks(validator.updateUser)
  app.v1.service('tenant/user/remove').hooks(validator.removeUser)
  app.v1.service('tenant/user/get').hooks(validator.getUser)
  app.v1.service('tenant/user/list').hooks(validator.getUserList)
  app.v1.service('tenant/user/password/reset').hooks(validator.resetUserPassword)
  app.v1.service('tenant/user/password/change').hooks(validator.changeUserPassword)
}
