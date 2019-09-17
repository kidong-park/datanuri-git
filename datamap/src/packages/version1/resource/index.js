/**
 *  Copyright (c) Electronics and Telecommunications Research Institute. All rights reserved.
 *  See License.txt in the project root for license information.
 */

const catalog = require('./catalog')
const dataset = require('./dataset')
const distribution = require('./distribution')
const service = require('./data-service')
const relationship = require('./relationship')
const file = require('./file')

/**
 * Api register
 * @param {object} app - Feather's app
 */
module.exports.api = (app) => {
  app.configure(catalog.api)
  app.configure(dataset.api)
  app.configure(distribution.api)
  app.configure(service.api)
  app.configure(relationship.api)
  app.configure(file.api)
}

/**
 * Validator register
 * @param {object} app - Feather's app
 */
module.exports.validator = (app) => {
  app.configure(catalog.validator)
  app.configure(dataset.validator)
  app.configure(distribution.validator)
  app.configure(service.validator)
  app.configure(relationship.validator)
  app.configure(file.validator)
}
