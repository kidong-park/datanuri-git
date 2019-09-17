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
  app.utils.services.register(app, app.v1, 'harvesting/job/save', api.saveJob)
  app.utils.services.register(app, app.v1, 'harvesting/job/object/save', api.saveObjectJob, true)
  app.utils.services.register(app, app.v1, 'harvesting/job/update', api.updateJob)
  app.utils.services.register(app, app.v1, 'harvesting/job/remove', api.removeJob)
  app.utils.services.register(app, app.v1, 'harvesting/job/get', api.getJob)
  app.utils.services.register(app, app.v1, 'harvesting/job/list', api.getJobList)
}

/**
 * Validator register
 * @param {object} app - Feather's app
 */
module.exports.validator = (app) => {
  app.v1.service('harvesting/job/save').hooks(validator.saveJob)
  app.v1.service('harvesting/job/object/save').hooks(validator.saveObjectJob)
  app.v1.service('harvesting/job/update').hooks(validator.updateJob)
  app.v1.service('harvesting/job/remove').hooks(validator.removeJob)
  app.v1.service('harvesting/job/get').hooks(validator.getJob)
  app.v1.service('harvesting/job/list').hooks(validator.getJobList)
}
