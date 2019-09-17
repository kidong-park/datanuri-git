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
  app.utils.services.register(app, app.v1, 'tenant/sso/user/save', api.saveUser, true)
  app.utils.services.register(app, app.v1, 'tenant/sso/user/update', api.updateUser, true)
  app.utils.services.register(app, app.v1, 'tenant/sso/user/remove', api.removeUser, true)
  app.utils.services.register(app, app.v1, 'tenant/sso/user/password/reset', api.resetUserPassword, true)
  app.utils.services.register(app, app.v1, 'tenant/sso/user/password/change', api.changeUserPassword, true)
  app.utils.services.register(app, app.v1, 'tenant/sso/organization/save', api.saveOrganization, true)
  app.utils.services.register(app, app.v1, 'tenant/sso/organization/update', api.updateOrganization, true)
  app.utils.services.register(app, app.v1, 'tenant/sso/organization/remove', api.removeOrganization, true)
  app.utils.services.register(app, app.v1, 'tenant/sso/organization/member/save', api.saveOrganizationMember, true)
  app.utils.services.register(app, app.v1, 'tenant/sso/organization/member/remove', api.removeOrganizationMember, true)
  app.utils.services.register(app, app.v1, 'tenant/sso/organization/member/role/save', api.saveOrganizationMemberRole, true)
  app.utils.services.register(app, app.v1, 'tenant/sso/organization/member/role/remove', api.removeOrganizationMemberRole, true)
}

/**
 * Validator register
 * @param {object} app - Feather's app
 */
module.exports.validator = (app) => {
  app.v1.service('tenant/sso/user/save').hooks(validator.saveUser)
  app.v1.service('tenant/sso/user/update').hooks(validator.updateUser)
  app.v1.service('tenant/sso/user/remove').hooks(validator.removeUser)
  app.v1.service('tenant/sso/user/password/reset').hooks(validator.resetUserPassword)
  app.v1.service('tenant/sso/user/password/change').hooks(validator.changeUserPassword)
  app.v1.service('tenant/sso/organization/save').hooks(validator.saveOrganization)
  app.v1.service('tenant/sso/organization/remove').hooks(validator.removeOrganization)
  app.v1.service('tenant/sso/organization/member/save').hooks(api.saveOrganizationMember)
  app.v1.service('tenant/sso/organization/member/remove').hooks(api.removeOrganizationMember)
  app.v1.service('tenant/sso/organization/member/role/save').hooks(api.saveOrganizationMemberRole)
  app.v1.service('tenant/sso/organization/member/role/remove').hooks(api.removeOrganizationMemberRole)
}
