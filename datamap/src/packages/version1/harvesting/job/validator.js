/**
 *  Copyright (c) Electronics and Telecommunications Research Institute. All rights reserved.
 *  See License.txt in the project root for license information.
 */

const Joi = require('joi')

/**
 * getJobList's validator
 */
module.exports.getJobList = {
  before: {
    async find (context) {
      await context.app.utils.services.authenticate(context)
      const parameterSchema = Joi.object().keys({
        sourceId: Joi.string(),
        offset: Joi.number(),
        limit: Joi.number()
      })
      context.app.utils.errors.handleJoi(context, context.params.query, parameterSchema)
      await context.app.utils.services.authorize(context, 'platform_admin')
    }
  }
}

/**
 * getJob's validator
 */
module.exports.getJob = {
  before: {
    async find (context) {
      await context.app.utils.services.authenticate(context)
      const parameterSchema = Joi.object().keys({
        id: Joi.string().required()
      })
      context.app.utils.errors.handleJoi(context, context.params.query, parameterSchema)
      await context.app.utils.services.authorize(context, 'platform_admin')
    }
  }
}

/**
 * saveJob's validator
 */
module.exports.saveJob = {
  before: {
    async create (context) {
      await context.app.utils.services.authenticate(context)
      const parameterSchema = Joi.object().keys({
        sourceId: Joi.string().required()
      })
      context.app.utils.errors.handleJoi(context, context.data, parameterSchema)
      await context.app.utils.services.authorize(context, 'platform_admin')
    }
  }
}

/**
 * updateJob's validator
 */
module.exports.updateJob = {
  before: {
    async create (context) {
      await context.app.utils.services.authenticate(context)
      const parameterSchema = Joi.object().keys({
        id: Joi.string().required(),
        action: Joi.string().only('stop').required()
      })
      context.app.utils.errors.handleJoi(context, context.data, parameterSchema)
      await context.app.utils.services.authorize(context, 'platform_admin')
    }
  }
}

/**
 * removeJob's validator
 */
module.exports.removeJob = {
  before: {
    async create (context) {
      await context.app.utils.services.authenticate(context)
      const parameterSchema = Joi.object().keys({
        id: Joi.string().required()
      })
      context.app.utils.errors.handleJoi(context, context.data, parameterSchema)
      await context.app.utils.services.authorize(context, 'platform_admin')
    }
  }
}

/**
 * saveObjectJob's validator
 */
module.exports.saveObjectJob = {
  before: {
    async create (context) {
      const parameterSchema = Joi.object().keys({
        url: Joi.string().required(),
        type: Joi.string().only('ckan', 'rdf')
      })
      context.app.utils.errors.handleJoi(context, context.data, parameterSchema)
    }
  }
}
