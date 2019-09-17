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
  app.utils.services.register(app, app.v1, 'resource/file/list', api.getFileList, true)
  app.utils.services.register(app, app.v1, 'resource/file/get', api.getFile, true)
  app.utils.services.registerForFile(app, app.v1, 'resource/file/content/get', api.getFileContent, true)
  app.utils.services.registerFormData(app, app.v1, 'resource/file/save', api.saveFile, true)
  app.utils.services.register(app, app.v1, 'resource/file/remove', api.removeFile, true)
  app.utils.services.register(app, app.v1, 'resource/file/operate', api.operateFile, true)
}

/**
 * Validator register
 * @param {object} app - Feather's app
 */
module.exports.validator = (app) => {
  app.v1.service('resource/file/list').hooks(validator.getFileList)
  app.v1.service('resource/file/get').hooks(validator.getFile)
  app.v1.service('resource/file/content/get').hooks(validator.getFileContent)
  app.v1.service('resource/file/save').hooks(validator.saveFile)
  app.v1.service('resource/file/remove').hooks(validator.removeFile)
  app.v1.service('resource/file/operate').hooks(validator.operateFile)
}
