/**
 *  Copyright (c) Electronics and Telecommunications Research Institute. All rights reserved.
 *  See License.txt in the project root for license information.
 */

const localeUtils = require('./locales')

/**
 * List default Feather's service api
 * @param {string} name - Feather's service
 */
module.exports.getDocsInfo = (name) => {
  const basePath = `/${name}`
  const idPath = `${basePath}/{id}`
  const allPaths = [basePath, idPath]
  const docLocationByServiceMethod = {
    find: { path: basePath, httpMethod: 'get' },
    get: { path: idPath, httpMethod: 'get' },
    create: { path: basePath, httpMethod: 'post' },
    update: { path: idPath, httpMethod: 'put' },
    patch: { path: idPath, httpMethod: 'patch' },
    remove: { path: idPath, httpMethod: 'delete' }
  }
  return { allPaths, docLocationByServiceMethod }
}

/**
 * Update Feather's docs
 * @param {object} app - Feather's app
 * @param {string} name - Feather service name
 * @param {object} docs - Feather's docs
 */
module.exports.updateDocs = (app, name, docs) => {
  const { docLocationByServiceMethod } = this.getDocsInfo(name)
  Object.assign(app.docs.definitions, docs.definitions)
  Object.keys(docLocationByServiceMethod).forEach((serviceMethod) => {
    const docLocation = docLocationByServiceMethod[serviceMethod]
    const doc = app.docs.paths[docLocation.path]
    if (!doc || !doc[docLocation.httpMethod] || !docs[serviceMethod]) {
      return
    }
    Object.assign(doc[docLocation.httpMethod], docs[serviceMethod])
  })
}

/**
 * Remove Feather's docs
 * @param {object} app - Feather's app
 * @param {string} name - Feather service name
 * @param {object} serviceMethods - Feather's methods
 */
module.exports.removeDocs = (app, name, serviceMethods = ['find', 'get', 'create', 'update', 'patch', 'remove']) => {
  const { allPaths, docLocationByServiceMethod } = this.getDocsInfo(name)
  serviceMethods.forEach((serviceMethod) => {
    const docLocation = docLocationByServiceMethod[serviceMethod]
    const doc = app.docs.paths[docLocation.path]
    // Remove doc method
    if (doc) {
      delete doc[docLocation.httpMethod]
    }
  })
  const numOfRemovedPaths = allPaths.reduce((count, path) => {
    const doc = app.docs.paths[path]
    // Already removed
    if (!doc) {
      return count + 1
    }
    // Remove empty doc
    if (!Object.keys(doc).length) {
      delete app.docs.paths[path]
      return count + 1
    }
    return count
  }, 0)
  if (numOfRemovedPaths === allPaths.length) {
    // Remove tag if service has no doc
    app.docs.tags = app.docs.tags.filter((tag) => tag.name !== name)
  }
}

/**
 * Translate docs message
 * @param {string} msg - Message
 */
module.exports.translate = {
  // default: (msg) => localeUtils.t(`doc:default.${msg}`),
  // property: (msg) => localeUtils.t(`doc:property.${msg}`),
  // response: (msg) => localeUtils.t(`doc:response.${msg}`)
  default: (msg) => localeUtils.t(`doc:${msg}`),
  property: (msg) => localeUtils.t(`doc:${msg}`),
  response: (msg) => localeUtils.t(`doc:${msg}`)
}
