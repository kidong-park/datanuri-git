/**
 *  Copyright (c) Electronics and Telecommunications Research Institute. All rights reserved.
 *  See License.txt in the project root for license information.
 */

const Joi = require('joi')

/**
 * getUserList's validator
 */
module.exports.getUserList = {
  before: {
    async find (context) {
      await context.app.utils.services.authenticate(context)
      const parameterSchema = Joi.object().keys({
        offset: Joi.number(),
        limit: Joi.number()
      })
      context.app.utils.errors.handleJoi(context, context.params.query, parameterSchema)
    }
  }
}

/**
 * getUser's validator
 */
module.exports.getUser = {
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
 * saveUser's validator
 */
module.exports.saveUser = {
  before: {
    async create (context) {
      // TODO: check something else (apikey) for register from normal page
      await context.app.utils.services.authenticate(context)
      const parameterSchema = Joi.object().keys({
        id: Joi.string().required(),
        email: Joi.string().email().required(),
        lastName: Joi.string().required(),
        firstName: Joi.string().required(),
        password: Joi.string().required()
      })
      context.app.utils.errors.handleJoi(context, context.data, parameterSchema)
      await context.app.utils.services.authorize(context, 'platform_admin')
    }
  }
}

/**
 * updateUser's validator
 */
module.exports.updateUser = {
  before: {
    async create (context) {
      await context.app.utils.services.authenticate(context)
      const parameterSchema = Joi.object().keys({
        id: Joi.string().required(),
        lastName: Joi.string(),
        firstName: Joi.string()
      })
      context.app.utils.errors.handleJoi(context, context.data, parameterSchema)
      await context.app.utils.services.authorize(context, 'platform_admin')
    }
  }
}

/**
 * removeUser's validator
 */
module.exports.removeUser = {
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
 * resetUserPassword's validator
 */
module.exports.resetUserPassword = {
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
 * changeUserPassword's validator
 */
module.exports.changeUserPassword = {
  before: {
    async create (context) {
      await context.app.utils.services.authenticate(context)
      const parameterSchema = Joi.object().keys({
        id: Joi.string().required(),
        currentPassword: Joi.string().required(),
        newPassword: Joi.string().required()
      })
      context.app.utils.errors.handleJoi(context, context.data, parameterSchema)
    }
  }
}
