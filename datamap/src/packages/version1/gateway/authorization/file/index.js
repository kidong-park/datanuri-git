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
  app.utils.services.register(app, app.v1, 'gateway/authorization/file/set', api.setFileAuthorization, true)
  app.utils.services.register(app, app.v1, 'gateway/authorization/file/update', api.updateFileAuthorization, true)
  app.utils.services.register(app, app.v1, 'gateway/authorization/file/remove', api.removeFileAuthorization, true)
  app.utils.services.register(app, app.v1, 'gateway/authorization/file/get', api.getFileAuthorization, true)
}

/**
 * Validator register
 * @param {object} app - Feather's app
 */
module.exports.validator = (app) => {
  app.v1.service('gateway/authorization/file/set').hooks(validator.setFileAuthorization)
  app.v1.service('gateway/authorization/file/update').hooks(validator.updateFileAuthorization)
  app.v1.service('gateway/authorization/file/remove').hooks(validator.removeFileAuthorization)
  app.v1.service('gateway/authorization/file/get').hooks(validator.getFileAuthorization)
}
