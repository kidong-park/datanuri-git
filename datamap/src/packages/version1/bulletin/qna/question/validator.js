/**
 *  Copyright (c) Electronics and Telecommunications Research Institute. All rights reserved.
 *  See License.txt in the project root for license information.
 */

const Joi = require('joi')

/**
 * getQuestionList's validator
 */
module.exports.getQuestionList = {
  before: {
    async find (context) {
      // await context.app.utils.services.authenticate(context)
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
 * getQuestion's validator
 */
module.exports.getQuestion = {
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
 * saveQuestion's validator
 */
module.exports.saveQuestion = {
  before: {
    async create (context) {
      await context.app.utils.services.authenticate(context)
      const parameterSchema = Joi.object().keys({
        title: Joi.string().required(),
        contents: Joi.string().required()
      })
      context.app.utils.errors.handleJoi(context, context.data, parameterSchema)
    }
  }
}

/**
 * updateQuestion's validator
 */
module.exports.updateQuestion = {
  before: {
    async create (context) {
      await context.app.utils.services.authenticate(context)
      const parameterSchema = Joi.object().keys({
        id: Joi.string().required(),
        title: Joi.string(),
        contents: Joi.string()
      })
      context.app.utils.errors.handleJoi(context, context.data, parameterSchema)
    }
  }
}

/**
 * removeQuestion's validator
 */
module.exports.removeQuestion = {
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
