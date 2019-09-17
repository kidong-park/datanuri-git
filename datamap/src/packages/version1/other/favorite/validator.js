/**
 *  Copyright (c) Electronics and Telecommunications Research Institute. All rights reserved.
 *  See License.txt in the project root for license information.
 */

const Joi = require('joi')

/**
 * getFavoriteList's validator
 */
module.exports.getFavoriteList = {
  before: {
    async find (context) {
      await context.app.utils.services.authenticate(context)
      const parameterSchema = Joi.object().keys({
        objectType: Joi.string().only('dataset', 'api'),
        limit: Joi.number(),
        offset: Joi.number()
      })
      context.app.utils.errors.handleJoi(context, context.params.query, parameterSchema)
    }
  }
}

/**
 * saveFavorite's validator
 */
module.exports.saveFavorite = {
  before: {
    async create (context) {
      await context.app.utils.services.authenticate(context)
      const parameterSchema = Joi.object().keys({
        objectId: Joi.string().required(),
        objectType: Joi.string().only('dataset', 'api').required()
      })
      context.app.utils.errors.handleJoi(context, context.data, parameterSchema)
    }
  }
}

/**
 * removeFavorite's validator
 */
module.exports.removeFavorite = {
  before: {
    async create (context) {
      await context.app.utils.services.authenticate(context)
      const parameterSchema = Joi.object().keys({
        objectId: Joi.array().required()
      })
      context.app.utils.errors.handleJoi(context, context.data, parameterSchema)
    }
  }
}
