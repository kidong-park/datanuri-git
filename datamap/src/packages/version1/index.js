/**
 *  Copyright (c) Electronics and Telecommunications Research Institute. All rights reserved.
 *  See License.txt in the project root for license information.
 */

const tenant = require('./tenant')
const resource = require('./resource')
const referenceModel = require('./reference-model')
const harvesting = require('./harvesting')
const gateway = require('./gateway')
const bulletin = require('./bulletin')
const other = require('./other')

/**
 * Api register
 * @param {object} app - Feather's app
 */
module.exports.api = (app) => {
  app.configure(tenant.api)
  app.configure(resource.api)
  app.configure(referenceModel.api)
  app.configure(harvesting.api)
  app.configure(gateway.api)
  app.configure(bulletin.api)
  app.configure(other.api)
}

/**
 * Validator register
 * @param {object} app - Feather's app
 */
module.exports.validator = (app) => {
  app.configure(tenant.validator)
  app.configure(resource.validator)
  app.configure(referenceModel.validator)
  app.configure(harvesting.validator)
  app.configure(gateway.validator)
  app.configure(bulletin.validator)
  app.configure(other.validator)
}
