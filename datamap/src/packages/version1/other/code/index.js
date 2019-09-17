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
  app.utils.services.register(app, app.v1, 'other/code/list', api.getCodeList)
  app.utils.services.register(app, app.v1, 'other/code/get', api.getCode)
  app.utils.services.register(app, app.v1, 'other/code/save', api.saveCode)
  app.utils.services.register(app, app.v1, 'other/code/update', api.updateCode)
  app.utils.services.register(app, app.v1, 'other/code/remove', api.removeCode)
  app.utils.services.register(app, app.v1, 'other/code/group/list', api.getCodeGroupList)
  app.utils.services.register(app, app.v1, 'other/code/group/get', api.getCodeGroup)
  app.utils.services.register(app, app.v1, 'other/code/group/save', api.saveCodeGroup)
  app.utils.services.register(app, app.v1, 'other/code/group/update', api.updateCodeGroup)
  app.utils.services.register(app, app.v1, 'other/code/group/remove', api.removeCodeGroup)
}

/**
 * Validator register
 * @param {object} app - Feather's app
 */
module.exports.validator = (app) => {
  app.v1.service('other/code/list').hooks(validator.getCodeList)
  app.v1.service('other/code/get').hooks(validator.getCode)
  app.v1.service('other/code/save').hooks(validator.saveCode)
  app.v1.service('other/code/update').hooks(validator.updateCode)
  app.v1.service('other/code/remove').hooks(validator.removeCode)
  app.v1.service('other/code/group/list').hooks(validator.getCodeGroupList)
  app.v1.service('other/code/group/get').hooks(validator.getCodeGroup)
  app.v1.service('other/code/group/save').hooks(validator.saveCodeGroup)
  app.v1.service('other/code/group/update').hooks(validator.updateCodeGroup)
  app.v1.service('other/code/group/remove').hooks(validator.removeCodeGroup)
}
