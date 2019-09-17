/**
 *  Copyright (c) Electronics and Telecommunications Research Institute. All rights reserved.
 *  See License.txt in the project root for license information.
 */

const Joi = require('joi')

/**
 * saveCatalog's validator
 */
module.exports.saveCatalog = {
  before: {
    async create (context) {
      await context.app.utils.services.authenticate(context)
      const parameterSchema = Joi.object().keys({
        name: Joi.string().required(),
        orgId: Joi.string(),
        description: Joi.string(),
        license: Joi.string(),
        rights: Joi.string(),
        homepage: Joi.string()
      })
      context.app.utils.errors.handleJoi(context, context.data, parameterSchema)
      await context.app.utils.services.authorize(context, 'platform_admin', 'org_admin')
    }
  }
}

/**
 * removeCatalog's validator
 */
module.exports.removeCatalog = {
  before: {
    async create (context) {
      await context.app.utils.services.authenticate(context)
      const parameterSchema = Joi.object().keys({
        id: Joi.string()
      })
      context.app.utils.errors.handleJoi(context, context.data, parameterSchema)
      await context.app.utils.services.authorize(context, 'platform_admin', 'org_admin')
    }
  }
}

/**
 * getCatalog's validator
 */
module.exports.getCatalog = {
  before: {
    async find (context) {
      await context.app.utils.services.authenticate(context)
      const parameterSchema = Joi.object().keys({
        id: Joi.string()
      })
      context.app.utils.errors.handleJoi(context, context.data, parameterSchema)
    }
  }
}

/**
 * getCatalogList's validator
 */
module.exports.getCatalogList = {
  before: {
    async find (context) {
      await context.app.utils.services.authenticate(context)
      const parameterSchema = Joi.object().keys({
        orgId: Joi.string(),
        name: Joi.string(),
        limit: Joi.number(),
        offset: Joi.number()
      })
      context.app.utils.errors.handleJoi(context, context.data, parameterSchema)
    }
  }
}

/**
 * updateCatalog's validator
 */
module.exports.updateCatalog = {
  before: {
    async create (context) {
      await context.app.utils.services.authenticate(context)
      const parameterSchema = Joi.object().keys({
        id: Joi.string().required(),
        name: Joi.string(),
        description: Joi.string(),
        license: Joi.string(),
        rights: Joi.string(),
        homepage: Joi.string()
      })
      context.app.utils.errors.handleJoi(context, context.data, parameterSchema)
      await context.app.utils.services.authorize(context, 'platform_admin', 'org_admin')
    }
  }
}

/**
 * saveCatalogComponets's validator
 */
module.exports.saveCatalogComponents = {
  before: {
    async create (context) {
      await context.app.utils.services.authenticate(context)
      const parameterSchema = Joi.object().keys({
        catalogId: Joi.string().required(),
        nodeId: Joi.string().required(),
        nodeType: Joi.string().only('taxonomy', 'dictionary').required(),
        parentNodeId: Joi.string(),
        parentNodeType: Joi.string().only('dictionary')
      })
      context.app.utils.errors.handleJoi(context, context.data, parameterSchema)
      await context.app.utils.services.authorize(context, 'platform_admin', 'org_admin')
    }
  }
}

/**
 * removeCatalogComponents's validator
 */
module.exports.removeCatalogComponents = {
  before: {
    async create (context) {
      await context.app.utils.services.authenticate(context)
      const parameterSchema = Joi.object().keys({
        catalogId: Joi.string().required(),
        nodeId: Joi.string().required(),
        nodeType: Joi.string().only('taxonomy', 'dictionary').required()
      })
      context.app.utils.errors.handleJoi(context, context.data, parameterSchema)
      await context.app.utils.services.authorize(context, 'platform_admin', 'org_admin')
    }
  }
}
