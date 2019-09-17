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
  app.utils.services.register(app, app.v1, 'harvesting/source/save', api.saveSource)
  app.utils.services.register(app, app.v1, 'harvesting/source/update', api.updateSource)
  app.utils.services.register(app, app.v1, 'harvesting/source/remove', api.removeSource)
  app.utils.services.register(app, app.v1, 'harvesting/source/get', api.getSource)
  app.utils.services.register(app, app.v1, 'harvesting/source/list', api.getSourceList)
}

/**
 * Validator register
 * @param {object} app - Feather's app
 */
module.exports.validator = (app) => {
  app.v1.service('harvesting/source/save').hooks(validator.saveSource)
  app.v1.service('harvesting/source/update').hooks(validator.updateSource)
  app.v1.service('harvesting/source/remove').hooks(validator.removeSource)
  app.v1.service('harvesting/source/get').hooks(validator.getSource)
  app.v1.service('harvesting/source/list').hooks(validator.getSourceList)
}
