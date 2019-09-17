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
  app.utils.services.register(app, app.v1, 'gateway/authorization/data-service/save', api.saveDataserviceAuthorization)
  app.utils.services.register(app, app.v1, 'gateway/authorization/data-service/update', api.updateDataserviceAuthorization)
  app.utils.services.register(app, app.v1, 'gateway/authorization/data-service/remove', api.removeDataserviceAuthorization)
  app.utils.services.register(app, app.v1, 'gateway/authorization/data-service/get', api.getDataserviceAuthorization)
}

/**
 * Validator register
 * @param {object} app - Feather's app
 */
module.exports.validator = (app) => {
  app.v1.service('gateway/authorization/data-service/save').hooks(validator.saveDataserviceAuthorization)
  app.v1.service('gateway/authorization/data-service/update').hooks(validator.updateDataserviceAuthorization)
  app.v1.service('gateway/authorization/data-service/remove').hooks(validator.removeDataserviceAuthorization)
  app.v1.service('gateway/authorization/data-service/get').hooks(validator.getDataserviceAuthorization)
}
