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
  app.utils.services.register(app, app.v1, 'resource/dataset/relationship/save', api.saveDataset)
  app.utils.services.register(app, app.v1, 'resource/dataset/relationship/update', api.updateDataset)
  app.utils.services.register(app, app.v1, 'resource/dataset/relationship/remove', api.removeDataset)
  app.utils.services.register(app, app.v1, 'resource/dataset/relationship/get', api.getDataset)
  app.utils.services.register(app, app.v1, 'resource/dataset/relationship/list', api.getDatasetList)
}

/**
 * Validator register
 * @param {object} app - Feather's app
 */
module.exports.validator = (app) => {
  app.v1.service('resource/dataset/relationship/save').hooks(validator.saveDataset)
  app.v1.service('resource/dataset/relationship/update').hooks(validator.updateDataset)
  app.v1.service('resource/dataset/relationship/remove').hooks(validator.removeDataset)
  app.v1.service('resource/dataset/relationship/get').hooks(validator.getDataset)
  app.v1.service('resource/dataset/relationship/list').hooks(validator.getDatasetList)
}
