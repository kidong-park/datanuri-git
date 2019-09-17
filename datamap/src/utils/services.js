/**
 *  Copyright (c) Electronics and Telecommunications Research Institute. All rights reserved.
 *  See License.txt in the project root for license information.
 */

const { authenticate } = require('@feathersjs/authentication').hooks
const localeUtils = require('./locales')
const errorUtils = require('./errors')
const multer = require('multer')()

/**
 * Service Authentication Wrapper
 * @param {object} context - Feathers's context
 */
module.exports.authenticate = async (context) => {
  await authenticate('jwt')(context)
}

/**
 * Service Authorization Wrapper
 * @param {object} context - Feathers's context
 */
module.exports.authorize = async (context, ...roles) => {
  const { user } = context.params
  if (user) {
    const found = user && user.roles.find((access) => roles.includes(access))
    if (!found) {
      errorUtils.handle(context.app, { statusCode: 401, errorCode: 10002 })
    }
  } else {
    errorUtils.handle(context.app, { statusCode: 401, errorCode: 10002 })
  }
}

/**
 * Service Register
 * @param {object} app - Feathers's app
 * @param {object} version - App's version
 * @param {string} service - App's service
 * @param {object} api - Service's implementation
 * @param {boolean} removeDoc - Remove auto generated document
 */
module.exports.register = (app, version, service, api, removeDoc) => {
  if (!version.service(service) && api) {
    version.use(service, api(app))
    if (removeDoc) {
      // FIXME: hard coding version
      app.utils.docs.removeDocs(app, `api/v1/${service}`)
    }
  }
}

/**
 * Service Register with Form Data Input
 * @param {object} app - Feathers's app
 * @param {object} version - App's version
 * @param {string} service - App's service
 * @param {object} api - Service's implementation
 * @param {boolean} removeDoc - Remove auto generated document
 */
module.exports.registerFormData = (app, version, service, api, removeDoc) => {
  if (!version.service(service) && api) {
    version.use(service, multer.any(), (req, res, next) => { req.feathers.files = req.files; next() }, api(app))
    if (removeDoc) {
      // FIXME: hard coding version
      app.utils.docs.removeDocs(app, `api/v1/${service}`)
    }
  }
}

/**
 * Service Register for file response
 * @param {object} app - Feathers's app
 * @param {object} version - App's version
 * @param {string} service - App's service
 * @param {object} api - Service's implementation
 * @param {boolean} removeDoc - Remove auto generated document
 */
module.exports.registerForFile = (app, version, service, api, removeDoc) => {
  if (!version.service(service) && api) {
    version.use(service, api(app), (req, res, next) => {
      res.attachment(res.data.filename)
      res.data.stream.on('response', remoteRes => {
        delete remoteRes.headers['content-disposition']
      }).pipe(res)
    })
    if (removeDoc) {
      // FIXME: hard coding version
      app.utils.docs.removeDocs(app, `api/v1/${service}`)
    }
  }
}

/**
 * Translate docs message
 * @param {string} msg - Message
 */
module.exports.translate = (msg) => {
  return localeUtils.t(`service:${msg}`)
}
