/**
 *  Copyright (c) Electronics and Telecommunications Research Institute. All rights reserved.
 *  See License.txt in the project root for license information.
 */

const Joi = require('joi')
const { disallow } = require('feathers-hooks-common')
/**
 * saveUser's validator
 */
module.exports.saveUser = {
  before: {
    async create (context) {
      await disallow('external')(context)
      const parameterSchema = Joi.object().keys({
        id: Joi.string().required(),
        email: Joi.string().required(),
        lastName: Joi.string().required(),
        firstName: Joi.string().required(),
        password: Joi.string().required()
      })
      context.app.utils.errors.handleJoi(context, context.data, parameterSchema)
    }
  }
}

/**
 * updateUser's validator
 */
module.exports.updateUser = {
  before: {
    async create (context) {
      await disallow('external')(context)
      const parameterSchema = Joi.object().keys({
        id: Joi.string().required(),
        lastName: Joi.string(),
        firstName: Joi.string()
      })
      context.app.utils.errors.handleJoi(context, context.data, parameterSchema)
    }
  }
}

/**
 * removeUser's validator
 */
module.exports.removeUser = {
  before: {
    async create (context) {
      await disallow('external')(context)
      const parameterSchema = Joi.object().keys({
        id: Joi.string().required()
      })
      context.app.utils.errors.handleJoi(context, context.data, parameterSchema)
    }
  }
}

/**
 * resetUserPassword's validator
 */
module.exports.resetUserPassword = {
  before: {
    async create (context) {
      await disallow('external')(context)
      const parameterSchema = Joi.object().keys({
        id: Joi.string().required()
      })
      context.app.utils.errors.handleJoi(context, context.data, parameterSchema)
    }
  }
}

/**
 * changeUserPassword's validator
 */
module.exports.changeUserPassword = {
  before: {
    async create (context) {
      await disallow('external')(context)
      const parameterSchema = Joi.object().keys({
        id: Joi.string().required(),
        currentPassword: Joi.string().required(),
        newPassword: Joi.string().required()
      })
      context.app.utils.errors.handleJoi(context, context.data, parameterSchema)
    }
  }
}

/**
 * saveOrganization's validator
 */
module.exports.saveOrganization = {
  before: {
    async create (context) {
      await disallow('external')(context)
      const parameterSchema = Joi.object().keys({
        id: Joi.string().required()
      })
      context.app.utils.errors.handleJoi(context, context.data, parameterSchema)
    }
  }
}

/**
 * removeOrganization's validator
 */
module.exports.removeOrganization = {
  before: {
    async create (context) {
      await disallow('external')(context)
      const parameterSchema = Joi.object().keys({
        id: Joi.string().required()
      })
      context.app.utils.errors.handleJoi(context, context.data, parameterSchema)
    }
  }
}
/**
 * saveOrganizationMember's validator
 */
module.exports.saveOrganizationMember = {
  before: {
    async create (context) {
      await disallow('external')(context)
      const parameterSchema = Joi.object().keys({
        organizationId: Joi.string().required(),
        userId: Joi.string().required()
      })
      context.app.utils.errors.handleJoi(context, context.data, parameterSchema)
    }
  }
}

/**
 * removeOrganizationMember's validator
 */
module.exports.removeOrganizationMember = {
  before: {
    async create (context) {
      await disallow('external')(context)
      const parameterSchema = Joi.object().keys({
        organizationId: Joi.string().required(),
        userId: Joi.string().required()
      })
      context.app.utils.errors.handleJoi(context, context.data, parameterSchema)
    }
  }
}

/**
 * saveOrganizationMemberRole's validator
 */
module.exports.saveOrganizationMemberRole = {
  before: {
    async create (context) {
      await disallow('external')(context)
      const parameterSchema = Joi.object().keys({
        id: Joi.string().required(),
        role: Joi.string().only('platform_admin').required()
      })
      context.app.utils.errors.handleJoi(context, context.data, parameterSchema)
    }
  }
}

/**
 * removeOrganizationMemberRole's validator
 */
module.exports.removeOrganizationMemberRole = {
  before: {
    async create (context) {
      await disallow('external')(context)
      const parameterSchema = Joi.object().keys({
        id: Joi.string().required(),
        role: Joi.string().only('platform_admin').required()
      })
      context.app.utils.errors.handleJoi(context, context.data, parameterSchema)
    }
  }
}
