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
  app.utils.services.register(app, app.v1, 'gateway/authorization/distribution/save', api.saveDistributionAuthorization)
  app.utils.services.register(app, app.v1, 'gateway/authorization/distribution/update', api.updateDistributionAuthorization)
  app.utils.services.register(app, app.v1, 'gateway/authorization/distribution/remove', api.removeDistributionAuthorization)
  app.utils.services.register(app, app.v1, 'gateway/authorization/distribution/get', api.getDistributionAuthorization)
}

/**
 * Validator register
 * @param {object} app - Feather's app
 */
module.exports.validator = (app) => {
  app.v1.service('gateway/authorization/distribution/save').hooks(validator.saveDistributionAuthorization)
  app.v1.service('gateway/authorization/distribution/update').hooks(validator.updateDistributionAuthorization)
  app.v1.service('gateway/authorization/distribution/remove').hooks(validator.removeDistributionAuthorization)
  app.v1.service('gateway/authorization/distribution/get').hooks(validator.getDistributionAuthorization)
}
