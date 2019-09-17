/**
 *  Copyright (c) Electronics and Telecommunications Research Institute. All rights reserved.
 *  See License.txt in the project root for license information.
 */

const dataset = require('./dataset')
const distribution = require('./distribution')
const dataService = require('./data-service')
const file = require('./file')

/**
 * Api register
 * @param {object} app - Feather's app
 */
module.exports.api = (app) => {
  app.configure(dataset.api)
  app.configure(distribution.api)
  app.configure(file.api)
  app.configure(dataService.api)
}

/**
 * Validator register
 * @param {object} app - Feather's app
 */
module.exports.validator = (app) => {
  app.configure(file.validator)
  app.configure(dataset.validator)
  app.configure(distribution.validator)
  app.configure(dataService.validator)
}
