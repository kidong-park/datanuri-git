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
  app.utils.services.register(app, app.v1, 'resource/catalog/relationship/save', api.saveCatalog)
  app.utils.services.register(app, app.v1, 'resource/catalog/relationship/update', api.updateCatalog)
  app.utils.services.register(app, app.v1, 'resource/catalog/relationship/remove', api.removeCatalog)
  app.utils.services.register(app, app.v1, 'resource/catalog/relationship/get', api.getCatalog)
  app.utils.services.register(app, app.v1, 'resource/catalog/relationship/list', api.getCatalogList)
}

/**
 * Validator register
 * @param {object} app - Feather's app
 */
module.exports.validator = (app) => {
  app.v1.service('resource/catalog/relationship/save').hooks(validator.saveCatalog)
  app.v1.service('resource/catalog/relationship/update').hooks(validator.updateCatalog)
  app.v1.service('resource/catalog/relationship/remove').hooks(validator.removeCatalog)
  app.v1.service('resource/catalog/relationship/get').hooks(validator.getCatalog)
  app.v1.service('resource/catalog/relationship/list').hooks(validator.getCatalogList)
}
