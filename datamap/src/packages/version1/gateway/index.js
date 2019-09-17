/**
 *  Copyright (c) Electronics and Telecommunications Research Institute. All rights reserved.
 *  See License.txt in the project root for license information.
 */

const authorization = require('./authorization')
const monitor = require('./monitor')
const commerce = require('./commerce')

/**
 * Api register
 * @param {object} app - Feather's app
 */
module.exports.api = (app) => {
  app.configure(authorization.api)
  app.configure(monitor.api)
  app.configure(commerce.api)
}

/**
 * Validator register
 * @param {object} app - Feather's app
 */
module.exports.validator = (app) => {
  app.configure(authorization.validator)
  app.configure(monitor.validator)
  app.configure(commerce.validator)
}
