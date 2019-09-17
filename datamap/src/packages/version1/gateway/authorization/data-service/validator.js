/**
 *  Copyright (c) Electronics and Telecommunications Research Institute. All rights reserved.
 *  See License.txt in the project root for license information.
 */

const Joi = require('joi')

/**
 * saveDataserviceAuthorization's validator
 */
module.exports.saveDataserviceAuthorization = {
  before: {
    async create (context) {
      await context.app.utils.services.authenticate(context)
      const parameterSchema = Joi.object().keys({
        tenantId: Joi.string().required(),
        dataserviceId: Joi.string().required(),
        purchaseId: Joi.string(),
        right: Joi.string().only('allow', 'block')
      })
      context.app.utils.errors.handleJoi(context, context.data, parameterSchema)
      await context.app.utils.services.authorize(context, 'platform_admin')
    }
  }
}

/**
 * updateDataserviceAuthorization's validator
 */
module.exports.updateDataserviceAuthorization = {
  before: {
    async create (context) {
      await context.app.utils.services.authenticate(context)
      const parameterSchema = Joi.object().keys({
        tenantId: Joi.string().required(),
        dataserviceId: Joi.string().required(),
        purchaseId: Joi.string(),
        right: Joi.string().only('allow', 'block')
      })
      context.app.utils.errors.handleJoi(context, context.data, parameterSchema)
      await context.app.utils.services.authorize(context, 'platform_admin')
    }
  }
}

/**
 * removeDataserviceAuthorization's validator
 */
module.exports.removeDataserviceAuthorization = {
  before: {
    async create (context) {
      await context.app.utils.services.authenticate(context)
      const parameterSchema = Joi.object().keys({
        tenantId: Joi.string().required(),
        dataserviceId: Joi.string().required(),
        purchaseId: Joi.string()
      })
      context.app.utils.errors.handleJoi(context, context.data, parameterSchema)
      await context.app.utils.services.authorize(context, 'platform_admin')
    }
  }
}

/**
 * getDataserviceAuthorization's validator
 */
module.exports.getDataserviceAuthorization = {
  before: {
    async find (context) {
      await context.app.utils.services.authenticate(context)
      const parameterSchema = Joi.object().keys({
        offset: Joi.number(),
        limit: Joi.number(),
        dataserviceId: Joi.string().required()
      })
      context.app.utils.errors.handleJoi(context, context.params.query, parameterSchema)
      await context.app.utils.services.authorize(context, 'platform_admin')
    }
  }
}
