/**
 *  Copyright (c) Electronics and Telecommunications Research Institute. All rights reserved.
 *  See License.txt in the project root for license information.
 */

const Joi = require('joi')

/**
 * getAnswer's validator
 */
module.exports.getAnswer = {
  before: {
    async find (context) {
      // await context.app.utils.services.authenticate(context)
      const parameterSchema = Joi.object().keys({
        id: Joi.string().required(),
        pId: Joi.string().required()
      })
      context.app.utils.errors.handleJoi(context, context.params.query, parameterSchema)
    }
  }
}

/**
 * saveAnswer's validator
 */
module.exports.saveAnswer = {
  before: {
    async create (context) {
      await context.app.utils.services.authenticate(context)
      await context.app.utils.services.authorize(context, 'platform_admin')
      const parameterSchema = Joi.object().keys({
        pId: Joi.string().required(),
        writerId: Joi.string(),
        title: Joi.string().required(),
        contents: Joi.string().required()
      })
      context.app.utils.errors.handleJoi(context, context.data, parameterSchema)
    }
  }
}

/**
 * updateAnswer's validator
 */
module.exports.updateAnswer = {
  before: {
    async create (context) {
      await context.app.utils.services.authenticate(context)
      await context.app.utils.services.authorize(context, 'platform_admin')
      const parameterSchema = Joi.object().keys({
        id: Joi.string().required(),
        pId: Joi.string().required(),
        writerId: Joi.string(),
        title: Joi.string(),
        contents: Joi.string()
      })
      context.app.utils.errors.handleJoi(context, context.data, parameterSchema)
    }
  }
}

/**
 * removeAnswer's validator
 */
module.exports.removeAnswer = {
  before: {
    async create (context) {
      await context.app.utils.services.authenticate(context)
      await context.app.utils.services.authorize(context, 'platform_admin')
      const parameterSchema = Joi.object().keys({
        id: Joi.string().required(),
        pId: Joi.string().required()
      })
      context.app.utils.errors.handleJoi(context, context.data, parameterSchema)
    }
  }
}
