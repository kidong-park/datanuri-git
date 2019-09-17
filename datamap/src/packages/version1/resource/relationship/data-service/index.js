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
  app.utils.services.register(app, app.v1, 'resource/data-service/relationship/save', api.saveDataservice)
  app.utils.services.register(app, app.v1, 'resource/data-service/relationship/update', api.updateDataservice)
  app.utils.services.register(app, app.v1, 'resource/data-service/relationship/remove', api.removeDataservice)
  app.utils.services.register(app, app.v1, 'resource/data-service/relationship/get', api.getDataservice)
  app.utils.services.register(app, app.v1, 'resource/data-service/relationship/list', api.getDataserviceList)
}

/**
 * Validator register
 * @param {object} app - Feather's app
 */
module.exports.validator = (app) => {
  app.v1.service('resource/data-service/relationship/save').hooks(validator.saveDataservice)
  app.v1.service('resource/data-service/relationship/update').hooks(validator.updateDataservice)
  app.v1.service('resource/data-service/relationship/remove').hooks(validator.removeDataservice)
  app.v1.service('resource/data-service/relationship/get').hooks(validator.getDataservice)
  app.v1.service('resource/data-service/relationship/list').hooks(validator.getDataserviceList)
}
