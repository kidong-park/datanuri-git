/**
 *  Copyright (c) Electronics and Telecommunications Research Institute. All rights reserved.
 *  See License.txt in the project root for license information.
 */

const rating = require('./rating')
const favorite = require('./favorite')
const code = require('./code')
const keyword = require('./keyword')

/**
 * Api register
 * @param {object} app - Feather's app
 */
module.exports.api = (app) => {
  app.configure(rating.api)
  app.configure(favorite.api)
  app.configure(code.api)
  app.configure(keyword.api)
}

/**
 * Validator register
 * @param {object} app - Feather's app
 */
module.exports.validator = (app) => {
  app.configure(rating.validator)
  app.configure(favorite.validator)
  app.configure(code.validator)
  app.configure(keyword.validator)
}
