/**
 *  Copyright (c) Electronics and Telecommunications Research Institute. All rights reserved.
 *  See License.txt in the project root for license information.
 */

const Joi = require('joi')

/**
 * saveDistributionAuthorization's validator
 */
module.exports.saveDistributionAuthorization = {
  before: {
    async create (context) {
      await context.app.utils.services.authenticate(context)
      const parameterSchema = Joi.object().keys({
        tenantId: Joi.string().required(),
        distributionId: Joi.string().required(),
        purchaseId: Joi.string(),
        right: Joi.string().only('allow', 'block')
      })
      context.app.utils.errors.handleJoi(context, context.data, parameterSchema)
      await context.app.utils.services.authorize(context, 'platform_admin')
    }
  }
}

/**
 * updateDistributionAuthorization's validator
 */
module.exports.updateDistributionAuthorization = {
  before: {
    async create (context) {
      await context.app.utils.services.authenticate(context)
      const parameterSchema = Joi.object().keys({
        tenantId: Joi.string().required(),
        distributionId: Joi.string().required(),
        purchaseId: Joi.string(),
        right: Joi.string().only('allow', 'block')
      })
      context.app.utils.errors.handleJoi(context, context.data, parameterSchema)
      await context.app.utils.services.authorize(context, 'platform_admin')
    }
  }
}

/**
 * removeDistributionAuthorization's validator
 */
module.exports.removeDistributionAuthorization = {
  before: {
    async create (context) {
      await context.app.utils.services.authenticate(context)
      const parameterSchema = Joi.object().keys({
        tenantId: Joi.string().required(),
        distributionId: Joi.string().required(),
        purchaseId: Joi.string()
      })
      context.app.utils.errors.handleJoi(context, context.data, parameterSchema)
      await context.app.utils.services.authorize(context, 'platform_admin')
    }
  }
}

/**
 * getDistributionAuthorization's validator
 */
module.exports.getDistributionAuthorization = {
  before: {
    async find (context) {
      await context.app.utils.services.authenticate(context)
      const parameterSchema = Joi.object().keys({
        offset: Joi.number(),
        limit: Joi.number(),
        distributionId: Joi.string().required()
      })
      context.app.utils.errors.handleJoi(context, context.params.query, parameterSchema)
      await context.app.utils.services.authorize(context, 'platform_admin')
    }
  }
}
