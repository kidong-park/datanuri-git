/**
 *  Copyright (c) Electronics and Telecommunications Research Institute. All rights reserved.
 *  See License.txt in the project root for license information.
 */

const Joi = require('joi')

/**
 * getFileList's validator
 */
module.exports.getFileList = {
  before: {
    async find (context) {
      await context.app.utils.services.authenticate(context)
      const parameterSchema = Joi.object().keys({
        path: Joi.string().required()
      })
      context.app.utils.errors.handleJoi(context, context.params.query, parameterSchema)
    }
  }
}

/**
 * getFile's validator
 */
module.exports.getFile = {
  before: {
    async find (context) {
      await context.app.utils.services.authenticate(context)
      const parameterSchema = Joi.object().keys({
        path: Joi.string().required()
      })
      context.app.utils.errors.handleJoi(context, context.params.query, parameterSchema)
    }
  }
}

/**
 * getFileContent's validator
 */
module.exports.getFileContent = {
  before: {
    async find (context) {
      await context.app.utils.services.authenticate(context)
      const parameterSchema = Joi.object().keys({
        path: Joi.string().required(),
        filename: Joi.string()
      })
      context.app.utils.errors.handleJoi(context, context.params.query, parameterSchema)
    }
  }
}

/**
 * saveFile's validator
 */
module.exports.saveFile = {
  before: {
    async create (context) {
      await context.app.utils.services.authenticate(context)
      const filesSchema = Joi.array().items(Joi.object().keys({
        fieldname: Joi.string().only('file'),
        originalname: Joi.string(),
        encoding: Joi.string(),
        mimetype: Joi.string(),
        buffer: Joi.object(),
        size: Joi.number()
      }))
      context.app.utils.errors.handleJoi(context, context.params.files, filesSchema)
      const parameterSchema = Joi.object().keys({
        path: Joi.string().required(),
        permission: Joi.string(),
        owner: Joi.string(),
        groupOwner: Joi.string()
      })
      context.app.utils.errors.handleJoi(context, context.data, parameterSchema)
    }
  }
}

/**
 * removeFile's validator
 */
module.exports.removeFile = {
  before: {
    async create (context) {
      await context.app.utils.services.authenticate(context)
      const parameterSchema = Joi.object().keys({
        path: Joi.string().required()
      })
      context.app.utils.errors.handleJoi(context, context.data, parameterSchema)
    }
  }
}

/**
 * operateFile's validator
 */
module.exports.operateFile = {
  before: {
    async create (context) {
      await context.app.utils.services.authenticate(context)
      // TODO: payload
      const parameterSchema = Joi.object().keys({
        path: Joi.string().required(),
        method: Joi.string().only('get', 'post', 'put', 'delete'),
        action: Joi.string().required(),
        proxy: Joi.string(),
        payload: Joi.array().items(Joi.object().keys({
          name: Joi.string(),
          value: Joi.string()
        }))
      })
      context.app.utils.errors.handleJoi(context, context.data, parameterSchema)
    }
  }
}
