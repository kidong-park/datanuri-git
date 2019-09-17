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
  app.utils.services.register(app, app.v1, 'other/rating/list', api.getRatingList)
  app.utils.services.register(app, app.v1, 'other/rating/get', api.getRating)
  app.utils.services.register(app, app.v1, 'other/rating/save', api.saveRating)
}

/**
 * Validator register
 * @param {object} app - Feather's app
 */
module.exports.validator = (app) => {
  app.v1.service('other/rating/list').hooks(validator.getRatingList)
  app.v1.service('other/rating/get').hooks(validator.getRating)
  app.v1.service('other/rating/save').hooks(validator.saveRating)
}
