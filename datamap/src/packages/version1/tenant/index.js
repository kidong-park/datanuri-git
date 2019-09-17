/**
 *  Copyright (c) Electronics and Telecommunications Research Institute. All rights reserved.
 *  See License.txt in the project root for license information.
 */

const sso = require('./sso')
const user = require('./user')
const organization = require('./organization')

/**
 * Api register
 * @param {object} app - Feather's app
 */
module.exports.api = (app) => {
  app.configure(sso.api)
  app.configure(user.api)
  app.configure(organization.api)
}

/**
 * Validator register
 * @param {object} app - Feather's app
 */
module.exports.validator = (app) => {
  app.configure(sso.validator)
  app.configure(user.validator)
  app.configure(organization.validator)
}
