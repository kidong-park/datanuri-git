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
  app.utils.services.register(app, app.v1, 'gateway/commerce/purchase/save', api.savePurchase)
  app.utils.services.register(app, app.v1, 'gateway/commerce/purchase/update', api.updatePurchase)
  app.utils.services.register(app, app.v1, 'gateway/commerce/purchase/remove', api.removePurchase)
  app.utils.services.register(app, app.v1, 'gateway/commerce/purchase/get', api.getPurchase)
  app.utils.services.register(app, app.v1, 'gateway/commerce/purchase/list', api.getPurchaseList)
}

/**
 * Validator register
 * @param {object} app - Feather's app
 */
module.exports.validator = (app) => {
  app.v1.service('gateway/commerce/purchase/save').hooks(validator.savePurchase)
  app.v1.service('gateway/commerce/purchase/update').hooks(validator.updatePurchase)
  app.v1.service('gateway/commerce/purchase/remove').hooks(validator.removePurchase)
  app.v1.service('gateway/commerce/purchase/get').hooks(validator.getPurchase)
  app.v1.service('gateway/commerce/purchase/list').hooks(validator.getPurchaseList)
}
