/**
 *  Copyright (c) Electronics and Telecommunications Research Institute. All rights reserved.
 *  See License.txt in the project root for license information.
 */

const Joi = require('joi')

/**
 * saveDataservice's validator
 */
module.exports.saveDataservice = {
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
        // orgPrice: Joi.number().required(),
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
        endPointUrl: Joi.string().required(),
        endPointDescription: Joi.string(),
        method: Joi.string(),
        etcValue: Joi.object()
      })
      context.app.utils.errors.handleJoi(context, context.data, parameterSchema)
    }
  }
}

/**
 * removeDataservice's validator
 */
module.exports.removeDataservice = {
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

/**
 * getDataservice's validator
 */
module.exports.getDataservice = {
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
 * accessDataservice's validator
 */
module.exports.accessDataservice = {
  before: {
    async create (context) {
      await context.app.utils.services.authenticate(context)
      const parameterSchema = Joi.object().keys({
        id: Joi.string().required(),
        params: Joi.object(),
        data: Joi.object()
      })
      context.app.utils.errors.handleJoi(context, context.data, parameterSchema)
    }
  }
}

/**
 * getDataserviceList's validator
 */
module.exports.getDataserviceList = {
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
 * updateDataservice's validator
 */
module.exports.updateDataservice = {
  before: {
    async create (context) {
      await context.app.utils.services.authenticate(context)
      const filesSchema = Joi.array().items(Joi.object().keys({
        fieldname: Joi.string().only('image').required(),
        originalname: Joi.string().required(),
        encoding: Joi.string().required(),
        mimetype: Joi.string().required(),
        buffer: Joi.object().required(),
        size: Joi.number().required()
      }))
      context.app.utils.errors.handleJoi(context, context.params.files, filesSchema)
      const parameterSchema = Joi.object().keys({
        id: Joi.string().required(),
        title: Joi.string(),
        // isPersonal: Joi.string().only('Y', 'N'),
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
        // userPrice: Joi.number().required(),
        // orgPrice: Joi.number().required(),
        // downDate: Joi.number().required(),
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
        // endPointUrl: Joi.string().required(),
        // endPointDescription: Joi.string(),
        // method: Joi.string(),
        etcValue: Joi.object()
      })
      context.app.utils.errors.handleJoi(context, context.data, parameterSchema)
    }
  }
}
