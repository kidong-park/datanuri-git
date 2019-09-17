/**
 *  Copyright (c) Electronics and Telecommunications Research Institute. All rights reserved.
 *  See License.txt in the project root for license information.
 */

const datamap = require('./datamap')
const source = require('./source')
const job = require('./job')

/**
 * Api register
 * @param {object} app - Feather's app
 */
module.exports.api = (app) => {
  app.configure(datamap.api)
  app.configure(source.api)
  app.configure(job.api)
}

/**
 * Validator register
 * @param {object} app - Feather's app
 */
module.exports.validator = (app) => {
  app.configure(datamap.validator)
  app.configure(source.validator)
  app.configure(job.validator)
}
