/**
 *  Copyright (c) Electronics and Telecommunications Research Institute. All rights reserved.
 *  See License.txt in the project root for license information.
 */

const Joi = require('joi')

/**
 * saveDatasetAuthorization's validator
 */
module.exports.saveDatasetAuthorization = {
  before: {
    async create (context) {
      await context.app.utils.services.authenticate(context)
      const parameterSchema = Joi.object().keys({
        tenantId: Joi.string().required(),
        datasetId: Joi.string().required(),
        purchaseId: Joi.string(),
        right: Joi.string().only('allow', 'block')
      })
      context.app.utils.errors.handleJoi(context, context.data, parameterSchema)
      await context.app.utils.services.authorize(context, 'platform_admin')
    }
  }
}

/**
 * updateDatasetAuthorization's validator
 */
module.exports.updateDatasetAuthorization = {
  before: {
    async create (context) {
      await context.app.utils.services.authenticate(context)
      const parameterSchema = Joi.object().keys({
        tenantId: Joi.string().required(),
        datasetId: Joi.string().required(),
        purchaseId: Joi.string(),
        right: Joi.string().only('allow', 'block')
      })
      context.app.utils.errors.handleJoi(context, context.data, parameterSchema)
      await context.app.utils.services.authorize(context, 'platform_admin')
    }
  }
}

/**
 * removeDatasetAuthorization's validator
 */
module.exports.removeDatasetAuthorization = {
  before: {
    async create (context) {
      await context.app.utils.services.authenticate(context)
      const parameterSchema = Joi.object().keys({
        tenantId: Joi.string().required(),
        datasetId: Joi.string().required(),
        purchaseId: Joi.string()
      })
      context.app.utils.errors.handleJoi(context, context.data, parameterSchema)
      await context.app.utils.services.authorize(context, 'platform_admin')
    }
  }
}

/**
 * getDatasetAuthorization's validator
 */
module.exports.getDatasetAuthorization = {
  before: {
    async find (context) {
      await context.app.utils.services.authenticate(context)
      const parameterSchema = Joi.object().keys({
        offset: Joi.number(),
        limit: Joi.number(),
        datasetId: Joi.string().required()
      })
      context.app.utils.errors.handleJoi(context, context.params.query, parameterSchema)
      await context.app.utils.services.authorize(context, 'platform_admin')
    }
  }
}
