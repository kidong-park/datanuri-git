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
  app.utils.services.register(app, app.v1, 'gateway/authorization/dataset/save', api.saveDatasetAuthorization)
  app.utils.services.register(app, app.v1, 'gateway/authorization/dataset/update', api.updateDatasetAuthorization)
  app.utils.services.register(app, app.v1, 'gateway/authorization/dataset/remove', api.removeDatasetAuthorization)
  app.utils.services.register(app, app.v1, 'gateway/authorization/dataset/get', api.getDatasetAuthorization)
}

/**
 * Validator register
 * @param {object} app - Feather's app
 */
module.exports.validator = (app) => {
  app.v1.service('gateway/authorization/dataset/save').hooks(validator.saveDatasetAuthorization)
  app.v1.service('gateway/authorization/dataset/update').hooks(validator.updateDatasetAuthorization)
  app.v1.service('gateway/authorization/dataset/remove').hooks(validator.removeDatasetAuthorization)
  app.v1.service('gateway/authorization/dataset/get').hooks(validator.getDatasetAuthorization)
}
