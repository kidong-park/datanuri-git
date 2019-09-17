/**
 *  Copyright (c) Electronics and Telecommunications Research Institute. All rights reserved.
 *  See License.txt in the project root for license information.
 */

const Joi = require('joi')

/**
 * getFaqList's validator
 */
module.exports.getFaqList = {
  before: {
    async find (context) {
      // await context.app.utils.services.authenticate(context)
      const parameterSchema = Joi.object().keys({
        offset: Joi.number(),
        limit: Joi.number(),
        keyword: Joi.string(),
        boardNum: Joi.string()
      })
      context.app.utils.errors.handleJoi(context, context.params.query, parameterSchema)
    }
  }
}

/**
 * getFaq's validator
 */
module.exports.getFaq = {
  before: {
    async find (context) {
      // await context.app.utils.services.authenticate(context)
      const parameterSchema = Joi.object().keys({
        id: Joi.string().required()
      })
      context.app.utils.errors.handleJoi(context, context.params.query, parameterSchema)
    }
  }
}

/**
 * saveFaq's validator
 */
module.exports.saveFaq = {
  before: {
    async create (context) {
      await context.app.utils.services.authenticate(context)
      await context.app.utils.services.authorize(context, 'platform_admin')
      const parameterSchema = Joi.object().keys({
        id: Joi.string(),
        writerId: Joi.string(),
        title: Joi.string().required(),
        contents: Joi.string().required()
      })
      context.app.utils.errors.handleJoi(context, context.data, parameterSchema)
    }
  }
}

/**
 * updateFaq's validator
 */
module.exports.updateFaq = {
  before: {
    async create (context) {
      await context.app.utils.services.authenticate(context)
      await context.app.utils.services.authorize(context, 'platform_admin')
      const parameterSchema = Joi.object().keys({
        writerId: Joi.string(),
        id: Joi.string().required(),
        title: Joi.string(),
        contents: Joi.string()
      })
      context.app.utils.errors.handleJoi(context, context.data, parameterSchema)
    }
  }
}

/**
 * removeFaq's validator
 */
module.exports.removeFaq = {
  before: {
    async create (context) {
      await context.app.utils.services.authenticate(context)
      await context.app.utils.services.authorize(context, 'platform_admin')
      const parameterSchema = Joi.object().keys({
        id: Joi.string().required()
      })
      context.app.utils.errors.handleJoi(context, context.data, parameterSchema)
    }
  }
}
