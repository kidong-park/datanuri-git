/**
 *  Copyright (c) Electronics and Telecommunications Research Institute. All rights reserved.
 *  See License.txt in the project root for license information.
 */

const Joi = require('joi')

/**
 * getShoppingBasketList's validator
 */
module.exports.getShoppingBasketList = {
  before: {
    async find (context) {
      await context.app.utils.services.authenticate(context)
      const parameterSchema = Joi.object().keys({
        purchaserId: Joi.string(),
        limit: Joi.number(),
        offset: Joi.number()
      })
      context.app.utils.errors.handleJoi(context, context.params.query, parameterSchema)
    }
  }
}

/**
 * saveShoppingBasket's validator
 */
module.exports.saveShoppingBasket = {
  before: {
    async create (context) {
      await context.app.utils.services.authenticate(context)
      const parameterSchema = Joi.object().keys({
        goodsId: Joi.string().required(),
        goodsType: Joi.string().required()
      })
      context.app.utils.errors.handleJoi(context, context.data, parameterSchema)
    }
  }
}

/**
 * removeShoppingBasket's validator
 */
module.exports.removeShoppingBasket = {
  before: {
    async create (context) {
      await context.app.utils.services.authenticate(context)
      const parameterSchema = Joi.object().keys({
        goodsId: Joi.string().required(),
        goodsType: Joi.string().required()
      })
      context.app.utils.errors.handleJoi(context, context.data, parameterSchema)
    }
  }
}
