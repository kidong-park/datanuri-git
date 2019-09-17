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
  app.utils.services.register(app, app.v1, 'resource/catalog/save', api.saveCatalog)
  app.utils.services.register(app, app.v1, 'resource/catalog/remove', api.removeCatalog)
  app.utils.services.register(app, app.v1, 'resource/catalog/get', api.getCatalog)
  app.utils.services.register(app, app.v1, 'resource/catalog/list', api.getCatalogList)
  app.utils.services.register(app, app.v1, 'resource/catalog/update', api.updateCatalog)
  app.utils.services.register(app, app.v1, 'resource/catalog/components/save', api.saveCatalogComponents)
  app.utils.services.register(app, app.v1, 'resource/catalog/components/remove', api.removeCatalogComponents)
}

/**
 * Validator register
 * @param {object} app - Feather's app
 */
module.exports.validator = (app) => {
  app.v1.service('resource/catalog/save').hooks(validator.saveCatalog)
  app.v1.service('resource/catalog/remove').hooks(validator.removeCatalog)
  app.v1.service('resource/catalog/get').hooks(validator.getCatalog)
  app.v1.service('resource/catalog/list').hooks(validator.getCatalogList)
  app.v1.service('resource/catalog/update').hooks(validator.updateCatalog)
  app.v1.service('resource/catalog/components/save').hooks(validator.saveCatalogComponents)
  app.v1.service('resource/catalog/components/remove').hooks(validator.removeCatalogComponents)
}
