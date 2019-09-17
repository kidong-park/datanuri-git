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
  app.utils.services.register(app, app.v1, 'gateway/monitor/activity/save', api.saveActivity)
  app.utils.services.register(app, app.v1, 'gateway/monitor/activity/update', api.updateActivity)
  app.utils.services.register(app, app.v1, 'gateway/monitor/activity/remove', api.removeActivity)
  app.utils.services.register(app, app.v1, 'gateway/monitor/activity/get', api.getActivity)
  app.utils.services.register(app, app.v1, 'gateway/monitor/activity/list', api.getActivityList)
}

/**
 * Validator register
 * @param {object} app - Feather's app
 */
module.exports.validator = (app) => {
  app.v1.service('gateway/monitor/activity/save').hooks(validator.saveActivity)
  app.v1.service('gateway/monitor/activity/update').hooks(validator.updateActivity)
  app.v1.service('gateway/monitor/activity/remove').hooks(validator.removeActivity)
  app.v1.service('gateway/monitor/activity/get').hooks(validator.getActivity)
  app.v1.service('gateway/monitor/activity/list').hooks(validator.getActivityList)
}
