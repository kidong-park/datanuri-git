/**
 *  Copyright (c) Electronics and Telecommunications Research Institute. All rights reserved.
 *  See License.txt in the project root for license information.
 */

const catalog = require('./catalog')
const dataset = require('./dataset')
const dataService = require('./data-service')

/**
 * Api register
 * @param {object} app - Feather's app
 */
module.exports.api = (app) => {
  app.configure(catalog.api)
  app.configure(dataset.api)
  app.configure(dataService.api)
}

/**
 * Validator register
 * @param {object} app - Feather's app
 */
module.exports.validator = (app) => {
  app.configure(catalog.validator)
  app.configure(dataset.validator)
  app.configure(dataService.validator)
}
