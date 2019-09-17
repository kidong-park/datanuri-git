/**
 *  Copyright (c) Electronics and Telecommunications Research Institute. All rights reserved.
 *  See License.txt in the project root for license information.
 */

const Joi = require('joi')

/**
 * getActivityList's validator
 */
module.exports.getActivityList = {
  before: {
    async find (context) {
      await context.app.utils.services.authenticate(context)
      const parameterSchema = Joi.object().keys({
        tenantId: Joi.string(),
        resourceId: Joi.string(),
        offset: Joi.number(),
        limit: Joi.number()
      })
      context.app.utils.errors.handleJoi(context, context.params.query, parameterSchema)
      await context.app.utils.services.authorize(context, 'platform_admin')
    }
  }
}

/**
 * getActivity's validator
 */
module.exports.getActivity = {
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
 * saveActivity's validator
 */
module.exports.saveActivity = {
  before: {
    async create (context) {
      await context.app.utils.services.authenticate(context)
      const parameterSchema = Joi.object().keys({
        tenantId: Joi.string().required(),
        resourceId: Joi.string().required(),
        actionType: Joi.string().required(),
        actionDetail: Joi.string().required()
      })
      context.app.utils.errors.handleJoi(context, context.data, parameterSchema)
      await context.app.utils.services.authorize(context, 'platform_admin')
    }
  }
}

/**
 * updateActivity's validator
 */
module.exports.updateActivity = {
  before: {
    async create (context) {
      await context.app.utils.services.authenticate(context)
      const parameterSchema = Joi.object().keys({
        id: Joi.string().required(),
        actionType: Joi.string(),
        actionDetail: Joi.string()
      })
      context.app.utils.errors.handleJoi(context, context.data, parameterSchema)
      await context.app.utils.services.authorize(context, 'platform_admin')
    }
  }
}

/**
 * removeActivity's validator
 */
module.exports.removeActivity = {
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
