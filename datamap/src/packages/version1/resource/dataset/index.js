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
  app.utils.services.registerFormData(app, app.v1, 'resource/dataset/save', api.saveDataset)
  app.utils.services.registerFormData(app, app.v1, 'resource/dataset/update', api.updateDataset)
  app.utils.services.register(app, app.v1, 'resource/dataset/remove', api.removeDataset)
  app.utils.services.register(app, app.v1, 'resource/dataset/get', api.getDataset)
  app.utils.services.register(app, app.v1, 'resource/dataset/list', api.getDatasetList)
}

/**
 * Validator register
 * @param {object} app - Feather's app
 */
module.exports.validator = (app) => {
  app.v1.service('resource/dataset/save').hooks(validator.saveDataset)
  app.v1.service('resource/dataset/update').hooks(validator.updateDataset)
  app.v1.service('resource/dataset/remove').hooks(validator.removeDataset)
  app.v1.service('resource/dataset/get').hooks(validator.getDataset)
  app.v1.service('resource/dataset/list').hooks(validator.getDatasetList)
}
