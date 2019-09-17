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
  app.utils.services.register(app, app.v1, 'other/keyword/save', api.saveKeyword)
  app.utils.services.register(app, app.v1, 'other/keyword/list', api.getKeywordList)
  app.utils.services.register(app, app.v1, 'other/keyword/get', api.getKeyword)
  app.utils.services.register(app, app.v1, 'other/keyword/update', api.updateKeyword)
  app.utils.services.register(app, app.v1, 'other/keyword/delete', api.deleteKeyword)
}

/**
 * Validator register
 * @param {object} app - Feather's app
 */
module.exports.validator = (app) => {
  app.v1.service('other/keyword/save').hooks(validator.saveKeyword)
  app.v1.service('other/keyword/list').hooks(validator.getKeywordList)
  app.v1.service('other/keyword/get').hooks(validator.getKeyword)
  app.v1.service('other/keyword/update').hooks(validator.updateKeyword)
  app.v1.service('other/keyword/delete').hooks(validator.deleteKeyword)
}
