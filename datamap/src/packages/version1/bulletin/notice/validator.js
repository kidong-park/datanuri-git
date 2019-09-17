/**
 *  Copyright (c) Electronics and Telecommunications Research Institute. All rights reserved.
 *  See License.txt in the project root for license information.
 */

const Joi = require('joi')

/**
 * getNoticeList's validator
 */
module.exports.getNoticeList = {
  before: {
    async find (context) {
      const parameterSchema = Joi.object().keys({
        offset: Joi.number(),
        limit: Joi.number(),
        keyword: Joi.string()
      })
      context.app.utils.errors.handleJoi(context, context.params.query, parameterSchema)
    }
  }
}

/**
 * getNotice's validator
 */
module.exports.getNotice = {
  before: {
    async find (context) {
      // await context.app.utils.services.authenticate(context)
      const parameterSchema = Joi.object().keys({
        id: Joi.string().required(),
        boardNum: Joi.string()
      })
      context.app.utils.errors.handleJoi(context, context.params.query, parameterSchema)
    }
  }
}

/**
 * saveNotice's validator
 */
module.exports.saveNotice = {
  before: {
    async create (context) {
      await context.app.utils.services.authenticate(context)
      await context.app.utils.services.authorize(context, 'platform_admin')
      const parameterSchema = Joi.object().keys({
        writerId: Joi.string(),
        title: Joi.string().required(),
        contents: Joi.string().required()
      })
      context.app.utils.errors.handleJoi(context, context.data, parameterSchema)
    }
  }
}

/**
 * updateNotice's validator
 */
module.exports.updateNotice = {
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
 * removeNotice's validator
 */
module.exports.removeNotice = {
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
