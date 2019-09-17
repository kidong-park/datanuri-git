/**
 *  Copyright (c) Electronics and Telecommunications Research Institute. All rights reserved.
 *  See License.txt in the project root for license information.
 */

const authentication = require('@feathersjs/authentication')
const jwt = require('@feathersjs/authentication-jwt')
const Verifier = require('@feathersjs/authentication-jwt').Verifier

class CustomVerifier extends Verifier {
  async verify (req, payload, done) {
    // Parse token from SSO server
    const entity = {
      username: payload.preferred_username,
      name: `${payload.given_name} ${payload.family_name}`,
      firstName: payload.given_name,
      lastName: payload.family_name,
      organization: payload.group || [],
      email: payload.email,
      roles: [],
      ...payload.realm_access
    }
    const models = require('../models')
    const organizationDB = await models.tenantRelation.findOne({ where: { userId: payload.preferred_username } })
    if ((!organizationDB && entity.organization.length !== 0) || (organizationDB && !entity.organization.includes(organizationDB.orgId))) {
      return done(null, null, null)
    }
    entity.roles = entity.roles.filter(role => role !== 'offline_access' && role !== 'uma_authorization')
    return done(null, entity, payload)
  }
}

/**
 * Authentication register
 * @param {object} app - Feather's app
 */
module.exports = (app) => {
  const config = app.get('authentication')
  app.configure(authentication(config))
  app.configure(jwt({ Verifier: CustomVerifier }))
  app.use('user', { get () {} })
  const { removeDocs } = app.utils.docs
  removeDocs(app, 'user')
  removeDocs(app, 'authentication')
}
