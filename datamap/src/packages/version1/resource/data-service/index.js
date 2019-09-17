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
  app.utils.services.registerFormData(app, app.v1, 'resource/data-service/save', api.saveDataservice)
  app.utils.services.registerFormData(app, app.v1, 'resource/data-service/update', api.updateDataservice)
  app.utils.services.register(app, app.v1, 'resource/data-service/remove', api.removeDataservice)
  app.utils.services.register(app, app.v1, 'resource/data-service/access', api.accessDataservice)
  app.utils.services.register(app, app.v1, 'resource/data-service/get', api.getDataservice)
  app.utils.services.register(app, app.v1, 'resource/data-service/list', api.getDataserviceList)
}

/**
 * Validator register
 * @param {object} app - Feather's app
 */
module.exports.validator = (app) => {
  app.v1.service('resource/data-service/save').hooks(validator.saveDataservice)
  app.v1.service('resource/data-service/remove').hooks(validator.removeDataservice)
  app.v1.service('resource/data-service/get').hooks(validator.getDataservice)
  app.v1.service('resource/data-service/access').hooks(validator.accessDataservice)
  app.v1.service('resource/data-service/list').hooks(validator.getDataserviceList)
  app.v1.service('resource/data-service/update').hooks(validator.updateDataservice)
}
