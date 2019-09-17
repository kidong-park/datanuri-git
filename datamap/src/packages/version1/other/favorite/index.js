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
  app.utils.services.register(app, app.v1, 'other/favorite/save', api.saveFavorite)
  // app.utils.services.register(app, app.v1, 'other/favorite/update', api.updateFavorite)
  app.utils.services.register(app, app.v1, 'other/favorite/remove', api.removeFavorite)
  // app.utils.services.register(app, app.v1, 'other/favorite/get', api.getFavorite)
  app.utils.services.register(app, app.v1, 'other/favorite/list', api.getFavoriteList)
}

/**
 * Validator register
 * @param {object} app - Feather's app
 */
module.exports.validator = (app) => {
  app.v1.service('other/favorite/save').hooks(validator.saveFavorite)
  // app.v1.service('other/favorite/update').hooks(validator.updateFavorite)
  app.v1.service('other/favorite/remove').hooks(validator.removeFavorite)
  // app.v1.service('other/favorite/get').hooks(validator.getFavorite)
  app.v1.service('other/favorite/list').hooks(validator.getFavoriteList)
}
