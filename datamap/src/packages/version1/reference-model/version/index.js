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
  app.utils.services.register(app, app.v1, 'reference-model/taxonomy/version/list', api.getVersionList)
  app.utils.services.register(app, app.v1, 'reference-model/taxonomy/version/get', api.getVersion)
  app.utils.services.register(app, app.v1, 'reference-model/taxonomy/version/save', api.saveVersion)
  app.utils.services.register(app, app.v1, 'reference-model/taxonomy/version/update', api.updateVersion)
  app.utils.services.register(app, app.v1, 'reference-model/taxonomy/version/remove', api.removeVersion)
  app.utils.services.register(app, app.v1, 'reference-model/taxonomy/version/last', api.getVersionLast)
}

/**
 * Validator register
 * @param {object} app - Feather's app
 */
module.exports.validator = (app) => {
  app.v1.service('reference-model/taxonomy/version/list').hooks(validator.getVersionList)
  app.v1.service('reference-model/taxonomy/version/get').hooks(validator.getVersion)
  app.v1.service('reference-model/taxonomy/version/save').hooks(validator.saveVersion)
  app.v1.service('reference-model/taxonomy/version/update').hooks(validator.updateVersion)
  app.v1.service('reference-model/taxonomy/version/remove').hooks(validator.removeVersion)
  app.v1.service('reference-model/taxonomy/version/last').hooks(validator.getVersionLast)
}
