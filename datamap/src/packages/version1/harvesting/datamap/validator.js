/**
 *  Copyright (c) Electronics and Telecommunications Research Institute. All rights reserved.
 *  See License.txt in the project root for license information.
 */

const Joi = require('joi')

/**
 * getCatalog's validator
 */
module.exports.getCatalog = {
  before: {
    async find (context) {
      await context.app.utils.services.authenticate(context)
      const parameterSchema = Joi.object().keys({
        page: Joi.string(),
        timestamp: Joi.string()
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
 * getDataService's validator
 */
module.exports.getDataService = {
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
 * getSource's validator
 */
module.exports.getSource = {
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
