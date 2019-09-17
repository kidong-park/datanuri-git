/**
 *  Copyright (c) Electronics and Telecommunications Research Institute. All rights reserved.
 *  See License.txt in the project root for license information.
 */

const { FeathersError } = require('@feathersjs/errors')
const localeUtils = require('./locales')
const errors = require('../locales/en/error.json')

/**
 * Sodas Error
 */
class SodasError extends FeathersError {
  constructor ({ statusCode, errorCode, flag, message }) {
    super(message, errorCode, statusCode, flag)
    this.errorCode = errorCode
    this.flag = flag
  }
  toJSON () {
    return {
      type: 'SodasError',
      statusCode: this.code,
      errorCode: this.errorCode,
      flag: this.flag,
      message: this.message
    }
  }
}

/**
 * Sodas Error Handler
 * @param {object} app - Feather's app
 * @param {number} statusCode - HTTP's code
 * @param {number} errorCode - Sodas's code
 * @param {string} flag - Sodas's error flag
 * @param {string} message - Sodas's error message
 */
module.exports.handleSodas = (app, { statusCode, errorCode, flag, message }) => {
  app.error({ statusCode, errorCode, flag, message })
  if (process.env['NODE_ENV'] === 'production' && statusCode >= 500) {
    const error = new SodasError({ statusCode, message: localeUtils.t(`system:server error`) })
    return error
  } else {
    const error = new SodasError({ statusCode, errorCode, flag, message })
    return error
  }
}

/**
 * Joi Error Handler
 * @param {object} context - Feather's context
 * @param {object} data - data
 * @param {object} schema - Joi schema
 * @returns {any} Sodas's Error or false
 */
module.exports.handleJoi = (context, data, schema) => {
  const locale = context.app.get('locale')
  const Joi = require('joi')
  const language = require(`../locales/${locale}/joi.json`)
  const result = Joi.validate(data, schema, { language: language.errors })
  if (result.error) {
    const statusCode = language.statusCode
    const errorCode = language.errorCode
    const flag = language.flag
    throw this.handleSodas(context.app, { statusCode, errorCode, flag, message: result.error.details[0].message })
  }
  return false
}

/**
 * Sodas Error Handler
 * @param {object} app - Feather's app
 * @param {number} statusCode - data
 * @param {number} errorCode - Joi schema
 * @returns {any} Sodas's Error or false
 */
module.exports.handle = (app, { statusCode, errorCode }) => {
  throw this.handleSodas(app, { statusCode, errorCode, flag: errors[errorCode].flag, message: localeUtils.t(`error:${errorCode}.message`) })
}

/**
 * Convert Feather Error to Sodas Error
 * @param {object} error - Feather's error
 * @param {object} req - Feather's req
 * @param {object} res - Feather's res
 * @param {object} next - Feather's next
 */
module.exports.handleFeather = (error, req, res, next) => {
  const output = { ...error.toJSON() }
  if (output.type !== 'SodasError') {
    output.statusCode = output.code
    output.errorCode = 'system'
    output.flag = output.className.replace(/-/g, '_').toUpperCase()
    // FIXME: output.message = localeUtils.t(`system:${output.flag}.message`)
    output.message = localeUtils.t(`system:${output.message}`)
  }
  const result = {
    statusCode: output.statusCode,
    errorCode: output.errorCode,
    flag: output.flag,
    message: output.message,
    stack: output.stack
  }
  if (process.env.NODE_ENV === 'production') {
    delete result.stack
  }
  res.set('Content-Type', 'application/json')
  res.json(result)
}
