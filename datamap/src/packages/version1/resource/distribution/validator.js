/**
 *  Copyright (c) Electronics and Telecommunications Research Institute. All rights reserved.
 *  See License.txt in the project root for license information.
 */

const Joi = require('joi')

/**
 * getDistributionList's validator
 */
module.exports.getDistributionList = {
  before: {
    async find (context) {
      await context.app.utils.services.authenticate(context)
      const parameterSchema = Joi.object().keys({
        datasetId: Joi.string().required(),
        offset: Joi.number(),
        limit: Joi.number()
      })
      context.app.utils.errors.handleJoi(context, context.params.query, parameterSchema)
    }
  }
}

/**
 * getDistribution's validator
 */
module.exports.getDistribution = {
  before: {
    async find (context) {
      await context.app.utils.services.authenticate(context)
      const parameterSchema = Joi.object().keys({
        id: Joi.string().required()
      })
      context.app.utils.errors.handleJoi(context, context.params.query, parameterSchema)
    }
  }
}

/**
 * getDistributionContent's validator
 */
module.exports.getDistributionContent = {
  before: {
    async find (context) {
      await context.app.utils.services.authenticate(context)
      const parameterSchema = Joi.object().keys({
        id: Joi.string().required()
      })
      context.app.utils.errors.handleJoi(context, context.params.query, parameterSchema)
    }
  }
}

/**
 * saveDistribution's validator
 */
module.exports.saveDistribution = {
  before: {
    async create (context) {
      await context.app.utils.services.authenticate(context)
      const filesSchema = Joi.array().items(Joi.object().keys({
        fieldname: Joi.string().only('file'),
        originalname: Joi.string().required(),
        encoding: Joi.string().required(),
        mimetype: Joi.string().required(),
        buffer: Joi.object().required(),
        size: Joi.number().required()
      }))
      context.app.utils.errors.handleJoi(context, context.params.files, filesSchema)
      const parameterSchema = Joi.object().keys({
        datasetId: Joi.string().required(),
        title: Joi.string(),
        format: Joi.string(),
        size: Joi.string(),
        mediaType: Joi.string(),
        rights: Joi.string(),
        license: Joi.string(),
        spatialResolutionInMeters: Joi.string(),
        temporalResolution: Joi.string(),
        conformsTo: Joi.string(),
        landingPage: Joi.string(),
        dataType: Joi.string().only('file', 'link'),
        // dataType: Joi.string().only('file'),
        url: Joi.string(),
        description: Joi.string(),
        // priceType: Joi.string(),
        userPrice: Joi.number(),
        // orgPrice: Joi.number(),
        // pricePolicy: Joi.string(),
        extra: Joi.object()
      })
      context.app.utils.errors.handleJoi(context, context.data, parameterSchema)
    }
  }
}

/**
 * updateDistribution's validator
 */
module.exports.updateDistribution = {
  before: {
    async create (context) {
      await context.app.utils.services.authenticate(context)
      const parameterSchema = Joi.object().keys({
        id: Joi.string().required(),
        title: Joi.string(),
        // format: Joi.string(),
        size: Joi.string(),
        mediaType: Joi.string(),
        rights: Joi.string(),
        license: Joi.string(),
        spatialResolutionInMeters: Joi.string(),
        temporalResolution: Joi.string(),
        conformsTo: Joi.string(),
        landingPage: Joi.string(),
        // dataType: Joi.string(),
        // url: Joi.string(),
        description: Joi.string(),
        // priceType: Joi.string(),
        // userPrice: Joi.number(),
        // orgPrice: Joi.number(),
        // pricePolicy: Joi.string(),
        extra: Joi.object()
      })
      context.app.utils.errors.handleJoi(context, context.data, parameterSchema)
    }
  }
}

/**
 * removeDistribution's validator
 */
module.exports.removeDistribution = {
  before: {
    async create (context) {
      await context.app.utils.services.authenticate(context)
      const parameterSchema = Joi.object().keys({
        id: Joi.string().required()
      })
      context.app.utils.errors.handleJoi(context, context.data, parameterSchema)
    }
  }
}
