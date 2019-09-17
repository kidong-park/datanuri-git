/**
 *  Copyright (c) Electronics and Telecommunications Research Institute. All rights reserved.
 *  See License.txt in the project root for license information.
 */

const api = require('./api')
const validator = require('./validator')

/**
 * Api register
 * @param {object} app - Feather's app
 */
module.exports.api = (app) => {
  app.utils.services.register(app, app.v1, 'gateway/purchase/shopping-basket/save', api.saveShoppingBasket)
  // app.utils.services.register(app, app.v1, 'gateway/purchase/shopping-basket/update', api.updateShoppingBasket)
  app.utils.services.register(app, app.v1, 'gateway/purchase/shopping-basket/remove', api.removeShoppingBasket)
  // app.utils.services.register(app, app.v1, 'gateway/purchase/shopping-basket/get', api.getShoppingBasket)
  app.utils.services.register(app, app.v1, 'gateway/purchase/shopping-basket/list', api.getShoppingBasketList)
}

/**
 * Validator register
 * @param {object} app - Feather's app
 */
module.exports.validator = (app) => {
  app.v1.service('gateway/purchase/shopping-basket/save').hooks(validator.saveShoppingBasket)
  // app.v1.service('gateway/purchase/shopping-basket/update').hooks(validator.updateShoppingBasket)
  app.v1.service('gateway/purchase/shopping-basket/remove').hooks(validator.removeShoppingBasket)
  // app.v1.service('gateway/purchase/shopping-basket/get').hooks(validator.getShoppingBasket)
  app.v1.service('gateway/purchase/shopping-basket/list').hooks(validator.getShoppingBasketList)
}
