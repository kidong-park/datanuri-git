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
  app.utils.services.register(app, app.v1, 'tenant/organization/save', api.saveOrganization)
  app.utils.services.register(app, app.v1, 'tenant/organization/update', api.updateOrganization)
  app.utils.services.register(app, app.v1, 'tenant/organization/remove', api.removeOrganization)
  app.utils.services.register(app, app.v1, 'tenant/organization/get', api.getOrganization)
  app.utils.services.register(app, app.v1, 'tenant/organization/list', api.getOrganizationList)
  app.utils.services.register(app, app.v1, 'tenant/organization/member/save', api.saveOrganizationMember)
  app.utils.services.register(app, app.v1, 'tenant/organization/member/remove', api.removeOrganizationMember)
  // app.utils.services.register(app, app.v1, 'tenant/organization/member/get', api.getOrganizationMember)
  app.utils.services.register(app, app.v1, 'tenant/organization/member/list', api.getOrganizationMemberList)
}

/**
 * Validator register
 * @param {object} app - Feather's app
 */
module.exports.validator = (app) => {
  app.v1.service('tenant/organization/save').hooks(validator.saveOrganization)
  app.v1.service('tenant/organization/update').hooks(validator.updateOrganization)
  app.v1.service('tenant/organization/remove').hooks(validator.removeOrganization)
  app.v1.service('tenant/organization/get').hooks(validator.getOrganization)
  app.v1.service('tenant/organization/list').hooks(validator.getOrganizationList)
  app.v1.service('tenant/organization/member/save').hooks(validator.saveOrganizationMember)
  app.v1.service('tenant/organization/member/remove').hooks(validator.removeOrganizationMember)
  // app.v1.service('tenant/organization/member/get').hooks(api.getOrganizationMember)
  app.v1.service('tenant/organization/member/list').hooks(validator.getOrganizationMemberList)
}
