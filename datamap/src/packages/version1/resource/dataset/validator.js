/**
 *  Copyright (c) Electronics and Telecommunications Research Institute. All rights reserved.
 *  See License.txt in the project root for license information.
 */

const Joi = require('joi')

/**
 * getDatasetList's validator
 */
module.exports.getDatasetList = {
  before: {
    async find (context) {
      await context.app.utils.services.authenticate(context)
      const parameterSchema = Joi.object().keys({
        catalogId: Joi.string(),
        keyword: Joi.string(),
        offset: Joi.number(),
        limit: Joi.number()
      })
      context.app.utils.errors.handleJoi(context, context.params.query, parameterSchema)
    }
  }
}

/**
 * getDataset's validator
 */
module.exports.getDataset = {
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
 * saveDataset's validator
 */
module.exports.saveDataset = {
  before: {
    async create (context) {
      await context.app.utils.services.authenticate(context)
      const filesSchema = Joi.array().items(Joi.object().keys({
        fieldname: Joi.string().only('image'),
        originalname: Joi.string(),
        encoding: Joi.string(),
        mimetype: Joi.string(),
        buffer: Joi.object(),
        size: Joi.number()
      }))
      context.app.utils.errors.handleJoi(context, context.params.files, filesSchema)
      const parameterSchema = Joi.object().keys({
        title: Joi.string().required(),
        isPersonal: Joi.string().only('Y', 'N'),
        isPublic: Joi.string().only('Y', 'N'),
        creatorId: Joi.string(),
        version: Joi.string(),
        language: Joi.string(),
        landingPage: Joi.string(),
        latitude: Joi.string(),
        longitude: Joi.string(),
        publisherLatitude: Joi.string(),
        publisherLongitude: Joi.string(),
        temporalStart: Joi.string(),
        temporalEnd: Joi.string(),
        accrualPeriodicity: Joi.string(),
        spatialResolutionInMeters: Joi.string(),
        temporalResolution: Joi.string(),
        description: Joi.string(),
        conformsTo: Joi.string(),
        priceType: Joi.string().only('free', 'charge'),
        userPrice: Joi.number().required(),
        // orgPrice: Joi.number(),
        downDate: Joi.number().required(),
        downDateType: Joi.string().only('days', 'months', 'years').required(),
        pricePolicy: Joi.string(),
        taxonomy: Joi.array().items(Joi.object().keys({
          nodeId: Joi.string(),
          nodeType: Joi.string().only('taxonomy', 'vocabulary'),
          attributes: Joi.array().items(Joi.object().keys({
            name: Joi.string(),
            value: Joi.string()
          }))
        })),
        keyword: Joi.string(),
        etcValue: Joi.object()
      })
      context.app.utils.errors.handleJoi(context, context.data, parameterSchema)
    }
  }
}

/**
 * updateDataset's validator
 */
module.exports.updateDataset = {
  before: {
    async create (context) {
      await context.app.utils.services.authenticate(context)
      const filesSchema = Joi.array().items(Joi.object().keys({
        fieldname: Joi.string().only('image'),
        originalname: Joi.string(),
        encoding: Joi.string(),
        mimetype: Joi.string(),
        buffer: Joi.object(),
        size: Joi.number()
      }))
      context.app.utils.errors.handleJoi(context, context.params.files, filesSchema)
      const parameterSchema = Joi.object().keys({
        id: Joi.string().required(),
        title: Joi.string(),
        isPublic: Joi.string().only('Y', 'N'),
        creatorId: Joi.string(),
        version: Joi.string(),
        language: Joi.string(),
        landingPage: Joi.string(),
        latitude: Joi.string(),
        longitude: Joi.string(),
        publisherLatitude: Joi.string(),
        publisherLongitude: Joi.string(),
        temporalStart: Joi.string(),
        temporalEnd: Joi.string(),
        accrualPeriodicity: Joi.string(),
        spatialResolutionInMeters: Joi.string(),
        temporalResolution: Joi.string(),
        description: Joi.string(),
        conformsTo: Joi.string(),
        // priceType: Joi.string().only('free', 'charge'),
        // userPrice: Joi.number(),
        // orgPrice: Joi.number(),
        // downDate: Joi.number(),
        // downDateType: Joi.string().only('day', 'month', 'year'),
        // pricePolicy: Joi.string(),
        // taxonomy: Joi.array().items(Joi.object().keys({
        //   nodeId: Joi.string(),
        //   nodeType: Joi.string().only('taxonomy', 'vocabulary'),
        //   attributes: Joi.array().items(Joi.object().keys({
        //     name: Joi.string(),
        //     value: Joi.string()
        //   }))
        // })),
        // keyword: Joi.string(),
        etcValue: Joi.object()
      })
      context.app.utils.errors.handleJoi(context, context.data, parameterSchema)
    }
  }
}

/**
 * removeDataset's validator
 */
module.exports.removeDataset = {
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
