/**
 *  Copyright (c) Electronics and Telecommunications Research Institute. All rights reserved.
 *  See License.txt in the project root for license information.
 */

const Joi = require('joi')

/**
 * getTaxonomyList's validator
 */
module.exports.getTaxonomyList = {
  before: {
    async find (context) {
      await context.app.utils.services.authenticate(context)
      const parameterSchema = Joi.object().keys({
        versionId: Joi.string().required(),
        conceptSchemaId: Joi.string(),
        offset: Joi.number(),
        limit: Joi.number()
      })
      context.app.utils.errors.handleJoi(context, context.params.query, parameterSchema)
    }
  }
}

/**
 * getTaxonomy's validator
 */
module.exports.getTaxonomy = {
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
 * saveTaxonomy's validator
 */
module.exports.saveTaxonomy = {
  before: {
    async create (context) {
      await context.app.utils.services.authenticate(context)
      const parameterSchema = Joi.object().keys({
        validStart: Joi.date(),
        validEnd: Joi.date(),
        title: Joi.string().required(),
        description: Joi.string(),
        parentId: Joi.string(),
        approvalState: Joi.string(),
        isActive: Joi.boolean()
      })
      context.app.utils.errors.handleJoi(context, context.data, parameterSchema)
      await context.app.utils.services.authorize(context, 'platform_admin', 'standard_admin')
    }
  }
}

/**
 * updateTaxonomy's validator
 */
module.exports.updateTaxonomy = {
  before: {
    async create (context) {
      await context.app.utils.services.authenticate(context)
      const parameterSchema = Joi.object().keys({
        id: Joi.string().required(),
        title: Joi.string(),
        description: Joi.string(),
        parentId: Joi.string(),
        approvalState: Joi.string(),
        isActive: Joi.string()
      })
      context.app.utils.errors.handleJoi(context, context.data, parameterSchema)
      await context.app.utils.services.authorize(context, 'platform_admin', 'standard_admin')
    }
  }
}

/**
 * removeTaxonomy's validator
 */
module.exports.removeTaxonomy = {
  before: {
    async create (context) {
      await context.app.utils.services.authenticate(context)
      const parameterSchema = Joi.object().keys({
        id: Joi.string().required()
      })
      context.app.utils.errors.handleJoi(context, context.data, parameterSchema)
      await context.app.utils.services.authorize(context, 'platform_admin', 'standard_admin')
    }
  }
}

/**
 * getTaxonomyCurrentPath's validator
 */
module.exports.getTaxonomyCurrentPath = {
  before: {
    async find (context) {
      await context.app.utils.services.authenticate(context)
      const parameterSchema = Joi.object().keys({
        id: Joi.string().required(),
        versionId: Joi.string().required()
      })
      context.app.utils.errors.handleJoi(context, context.params.query, parameterSchema)
    }
  }
}

/**
 * getTaxonomySubPath's validator
 */
module.exports.getTaxonomySubPath = {
  before: {
    async find (context) {
      await context.app.utils.services.authenticate(context)
      const parameterSchema = Joi.object().keys({
        id: Joi.number().required()
      })
      context.app.utils.errors.handleJoi(context, context.params.query, parameterSchema)
    }
  }
}

/**
 * getTaxonomyFirstLevel's validator
 */
module.exports.getTaxonomyFirstLevel = {
  before: {
    async find (context) {
      await context.app.utils.services.authenticate(context)
      const parameterSchema = Joi.object().keys({
        versionId: Joi.string().required(),
        conceptSchemaId: Joi.string()
      })
      context.app.utils.errors.handleJoi(context, context.params.query, parameterSchema)
    }
  }
}

/**
 * getConceptSchema's validator
 */
module.exports.getConceptSchema = {
  before: {
    async find (context) {
      await context.app.utils.services.authenticate(context)
      const parameterSchema = Joi.object().keys({
        versionId: Joi.string().required()
      })
      context.app.utils.errors.handleJoi(context, context.params.query, parameterSchema)
    }
  }
}

/**
 * saveConceptSchema's validator
 */
module.exports.saveConceptSchema = {
  before: {
    async create (context) {
      await context.app.utils.services.authenticate(context)
      const parameterSchema = Joi.object().keys({
        title: Joi.string().required(),
        description: Joi.string().required()
      })
      context.app.utils.errors.handleJoi(context, context.data, parameterSchema)
      await context.app.utils.services.authorize(context, 'platform_admin', 'standard_admin')
    }
  }
}
