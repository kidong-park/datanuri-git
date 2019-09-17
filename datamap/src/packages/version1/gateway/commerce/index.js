/**
 *  Copyright (c) Electronics and Telecommunications Research Institute. All rights reserved.
 *  See License.txt in the project root for license information.
 */

const purchase = require('./purchase')
const shoppingBasket = require('./shopping-basket')

/**
 * Api register
 * @param {object} app - Feather's app
 */
module.exports.api = (app) => {
  app.configure(purchase.api)
  app.configure(shoppingBasket.api)
}

/**
 * Validator register
 * @param {object} app - Feather's app
 */
module.exports.validator = (app) => {
  app.configure(purchase.validator)
  app.configure(shoppingBasket.validator)
}
