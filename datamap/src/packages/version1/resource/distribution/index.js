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
  app.utils.services.register(app, app.v1, 'resource/dataset/distribution/list', api.getDistributionList)
  app.utils.services.register(app, app.v1, 'resource/dataset/distribution/get', api.getDistribution)
  app.utils.services.registerForFile(app, app.v1, 'resource/dataset/distribution/content/get', api.getDistributionContent)
  app.utils.services.registerFormData(app, app.v1, 'resource/dataset/distribution/save', api.saveDistribution)
  app.utils.services.register(app, app.v1, 'resource/dataset/distribution/update', api.updateDistribution)
  app.utils.services.register(app, app.v1, 'resource/dataset/distribution/remove', api.removeDistribution)
}

/**
 * Validator register
 * @param {object} app - Feather's app
 */
module.exports.validator = (app) => {
  app.v1.service('resource/dataset/distribution/list').hooks(validator.getDistributionList)
  app.v1.service('resource/dataset/distribution/get').hooks(validator.getDistribution)
  app.v1.service('resource/dataset/distribution/content/get').hooks(validator.getDistributionContent)
  app.v1.service('resource/dataset/distribution/save').hooks(validator.saveDistribution)
  app.v1.service('resource/dataset/distribution/update').hooks(validator.updateDistribution)
  app.v1.service('resource/dataset/distribution/remove').hooks(validator.removeDistribution)
}
