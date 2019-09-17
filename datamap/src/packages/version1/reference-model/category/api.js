/**
 *  Copyright (c) Electronics and Telecommunications Research Institute. All rights reserved.
 *  See License.txt in the project root for license information.
 */

/**
 * getTaxonomyList api
 */
module.exports.getTaxonomyList = (app) => {
  return {
    docs: {
      find: {
        summary: app.utils.docs.translate.default('Get Taxonomy List'),
        description: app.utils.docs.translate.default('Get Taxonomy List'),
        parameters: [
          {
            description: app.utils.docs.translate.property('Version Id'),
            in: 'query',
            name: 'versionId',
            type: 'string',
            required: true
          },
          {
            description: app.utils.docs.translate.property('Concept Schema Id'),
            in: 'query',
            name: 'conceptSchemaId',
            type: 'string',
            required: false
          },
          {
            description: app.utils.docs.translate.property('Offset'),
            in: 'query',
            name: 'offset',
            type: 'integer',
            default: 0,
            required: false
          },
          {
            description: app.utils.docs.translate.property('Limit'),
            in: 'query',
            name: 'limit',
            type: 'integer',
            default: 10,
            required: false
          }
        ],
        responses: {
          200: {
            description: app.utils.docs.translate.response('Successful'),
            schema: {
              type: 'object',
              properties: {
                total: { type: 'integer', description: app.utils.docs.translate.property('Total') },
                data: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      id: { type: 'string', description: app.utils.docs.translate.property('Id') },
                      validStart: { type: 'string', description: app.utils.docs.translate.property('Validate Start') },
                      validEnd: { type: 'string', description: app.utils.docs.translate.property('Validate End') },
                      title: { type: 'string', description: app.utils.docs.translate.property('Title') },
                      description: { type: 'string', description: app.utils.docs.translate.property('Description') },
                      parentId: { type: 'string', description: app.utils.docs.translate.property('Parent Id') },
                      classificationType: { type: 'string', description: app.utils.docs.translate.property('Classification Type') },
                      classImageFilename: { type: 'string', description: app.utils.docs.translate.property('Classification Image Filename') },
                      approvalState: { type: 'string', description: app.utils.docs.translate.property('Approval State') },
                      issuerId: { type: 'string', description: app.utils.docs.translate.property('Issuer Id') },
                      issued: { type: 'string', description: app.utils.docs.translate.property('Issued') },
                      modifierId: { type: 'string', description: app.utils.docs.translate.property('Modifier Id') },
                      modified: { type: 'string', description: app.utils.docs.translate.property('Modified') }
                    }
                  }
                }
              }
            }
          },
          400: {
            description: app.utils.docs.translate.response('Input Violated')
          },
          401: {
            description: app.utils.docs.translate.response('Permission Violated')
          },
          404: {
            description: app.utils.docs.translate.response('Not Found')
          },
          500: {
            description: app.utils.docs.translate.response('Server Error')
          }
        },
        security: [{
          bearer: []
        }]
      }
    },
    // GET method
    async find (params) {
      const {
        versionId,
        conceptSchemaId,
        offset,
        limit
      } = params.query

      const version = await app.models.taxonomyVersion.find({ where: { versionId } })
      let itemsOnPage = `OFFSET 0`
      let _where = ''
      let total = 0

      if (!version) {
        await app.utils.errors.handle(app, { statusCode: 404, errorCode: 1000004 })
      }
      const versionDate = version.versionDate

      if (limit > 0) {
        itemsOnPage = `LIMIT ${limit} OFFSET ${offset}`
      }

      if (conceptSchemaId !== undefined) {
        _where = `where '${conceptSchemaId}' = ANY(PATH)`
      }

      const Sequelize = app.models.Sequelize
      const taxonomy = await app.models.sequelize.query(`
        WITH RECURSIVE search_category(DATA_ID, PARENT_ID, DATA_NAME, LEVEL, PATH, CYCLE, USER_ID, CREATE_DATE, UPDATE_DATE, ACTIVE) AS
          (SELECT  m.id, m.parent_id, m.title, 0, ARRAY[m.id]::int[], false, m.issuer_id, m.issued, m.modified, m.is_active FROM public.taxonomy m
            WHERE m.parent_id = '0' AND m.valid_start <= '${versionDate}' AND m.valid_end >= '${versionDate}' UNION ALL
          SELECT m.id, m.parent_id, m.title, LEVEL + 1, PATH || m.id::integer, m.id::integer = ANY(PATH), m.issuer_id, m.issued, m.modified, m.is_active
            FROM public.taxonomy m, search_category sb
              WHERE m.parent_id=sb.DATA_ID AND m.valid_start <= '${versionDate}' AND m.valid_end >= '${versionDate}' AND NOT CYCLE)
          SELECT CAST(DATA_ID AS Integer) as id, PARENT_ID as "parentId", lpad('', LEVEL) || DATA_NAME AS title,
            LEVEL, PATH, USER_ID as "issuerId", CREATE_DATE as issued,
            UPDATE_DATE as modified, ACTIVE as active,
            (SELECT COUNT(DATA_NAME) FROM search_category) AS total
          FROM search_category ${_where} ORDER BY PATH, id ${itemsOnPage}
        `, { type: Sequelize.QueryTypes.SELECT })

      if (taxonomy.length > 0) {
        total = taxonomy[0].total
      }

      return {
        total,
        taxonomy
      }
    }
  }
}

/**
 * getTaxonomy api
 */
module.exports.getTaxonomy = (app) => {
  return {
    docs: {
      find: {
        summary: app.utils.docs.translate.default('Get Taxonomy'),
        description: app.utils.docs.translate.default('Get Taxonomy'),
        parameters: [
          {
            description: app.utils.docs.translate.property('Id'),
            in: 'query',
            name: 'id',
            type: 'string',
            required: true
          }
        ],
        responses: {
          200: {
            description: app.utils.docs.translate.response('Successful'),
            schema: {
              type: 'object',
              properties: {
                id: { type: 'string', description: app.utils.docs.translate.property('Id') },
                validStart: { type: 'string', description: app.utils.docs.translate.property('Validate Start') },
                validEnd: { type: 'string', description: app.utils.docs.translate.property('Validate End') },
                title: { type: 'string', description: app.utils.docs.translate.property('Title') },
                description: { type: 'string', description: app.utils.docs.translate.property('Description') },
                parentId: { type: 'string', description: app.utils.docs.translate.property('Parent Id') },
                classificationType: { type: 'string', description: app.utils.docs.translate.property('Classification Type') },
                classImageFilename: { type: 'string', description: app.utils.docs.translate.property('Classification Image Filename') },
                approvalState: { type: 'string', description: app.utils.docs.translate.property('Approval State') },
                isActive: { type: 'string', description: app.utils.docs.translate.property('IsActive') },
                issuerId: { type: 'string', description: app.utils.docs.translate.property('Issuer Id') },
                issued: { type: 'string', description: app.utils.docs.translate.property('Issued') },
                modifierId: { type: 'string', description: app.utils.docs.translate.property('Modifier Id') },
                modified: { type: 'string', description: app.utils.docs.translate.property('Modified') }
              }
            }
          },
          400: {
            description: app.utils.docs.translate.response('Input Violated')
          },
          401: {
            description: app.utils.docs.translate.response('Permission Violated')
          },
          404: {
            description: app.utils.docs.translate.response('Not Found')
          },
          500: {
            description: app.utils.docs.translate.response('Server Error')
          }
        },
        security: [{
          bearer: []
        }]
      }
    },
    // GET method
    async find (params) {
      const { id } = params.query
      const taxonomy = await app.models.taxonomy.find({ where: { id } })

      if (!taxonomy) {
        await app.utils.errors.handle(app, { statusCode: 404, errorCode: 1000007 })
      }

      return taxonomy
    }
  }
}

/**
 * saveTaxonomy api
 */
module.exports.saveTaxonomy = (app) => {
  return {
    docs: {
      create: {
        summary: app.utils.docs.translate.default('Save Taxonomy'),
        description: app.utils.docs.translate.default('Save Taxonomy'),
        parameters: [
          {
            description: app.utils.docs.translate.property('Taxonomy'),
            in: 'body',
            name: 'body',
            required: true,
            schema: {
              type: 'object',
              properties: {
                validStart: {
                  description: app.utils.docs.translate.property('Validate Start'),
                  type: 'string',
                  required: false
                },
                validEnd: {
                  description: app.utils.docs.translate.property('Validate End'),
                  type: 'string',
                  required: false
                },
                title: {
                  description: app.utils.docs.translate.property('Title'),
                  type: 'string',
                  required: true
                },
                description: {
                  description: app.utils.docs.translate.property('Description'),
                  type: 'string',
                  required: false
                },
                parentId: {
                  description: app.utils.docs.translate.property('Parent Id'),
                  type: 'string',
                  required: false
                },
                approvalState: {
                  description: app.utils.docs.translate.property('Approval State'),
                  type: 'string',
                  required: false
                },
                isActive: {
                  description: app.utils.docs.translate.property('IsActive'),
                  type: 'boolean',
                  required: false
                }
              }
            }
          }
        ],
        responses: {
          200: {
            description: app.utils.docs.translate.response('Successful'),
            schema: {
              type: 'object',
              properties: {
                id: { type: 'string', description: app.utils.docs.translate.property('Id') }
              }
            }
          },
          400: {
            description: app.utils.docs.translate.response('Input Violated')
          },
          401: {
            description: app.utils.docs.translate.response('Permission Violated')
          },
          404: {
            description: app.utils.docs.translate.response('Not Found')
          },
          500: {
            description: app.utils.docs.translate.response('Server Error')
          }
        },
        security: [{
          bearer: []
        }]
      }
    },
    // POST method
    async create (data, params) {
      const { id } = await app.v1.service('reference-model/taxonomy/category/lastId').find()
      const { validStart, validEnd } = data
      const date = new Date()
      await app.models.taxonomy.create({
        id: (id * 1) + 1,
        ...data,
        validStart: validStart || date,
        validEnd: validEnd || '9999-12-31',
        issuerId: params.user.username,
        issued: date
      })
      return { id: (id * 1) + 1 }
    }
  }
}

/**
 * updateTaxonomy api
 */
module.exports.updateTaxonomy = (app) => {
  return {
    docs: {
      create: {
        summary: app.utils.docs.translate.default('Update Taxonomy'),
        description: app.utils.docs.translate.default('Update Taxonomy'),
        parameters: [
          {
            description: app.utils.docs.translate.property('Taxonomy'),
            in: 'body',
            name: 'body',
            required: true,
            schema: {
              type: 'object',
              properties: {
                id: {
                  description: app.utils.docs.translate.property('Id'),
                  type: 'string',
                  required: true
                },
                title: {
                  description: app.utils.docs.translate.property('Title'),
                  type: 'string',
                  required: false
                },
                description: {
                  description: app.utils.docs.translate.property('Description'),
                  type: 'string',
                  required: false
                },
                parentId: {
                  description: app.utils.docs.translate.property('Parent Id'),
                  type: 'string',
                  required: false
                },
                approvalState: {
                  description: app.utils.docs.translate.property('Approval State'),
                  type: 'string',
                  required: false
                },
                isActive: {
                  description: app.utils.docs.translate.property('Is Active'),
                  type: 'string',
                  required: false
                }
              }
            }
          }
        ],
        responses: {
          200: {
            description: app.utils.docs.translate.response('Successful'),
            schema: {
              type: 'object',
              properties: {
                result: { type: 'string', description: app.utils.docs.translate.property('Result') }
              }
            }
          },
          400: {
            description: app.utils.docs.translate.response('Input Violated')
          },
          401: {
            description: app.utils.docs.translate.response('Permission Violated')
          },
          404: {
            description: app.utils.docs.translate.response('Not Found')
          },
          500: {
            description: app.utils.docs.translate.response('Server Error')
          }
        },
        security: [{
          bearer: []
        }]
      }
    },
    // POST method
    async create (data, params) {
      const { id } = data
      const date = new Date()
      const {
        title,
        issuerId,
        issued
      } = await app.models.taxonomy.find({ where: { id } })

      delete data.id

      if (!id) {
        await app.utils.errors.handle(app, { statusCode: 404, errorCode: 1000008 })
      }

      if (!title) {
        await app.utils.errors.handle(app, { statusCode: 404, errorCode: 1000007 })
      }

      await app.models.taxonomy.update({
        ...data,
        modified: date,
        modifierId: params.user.username,
        issuerId,
        issued
      }, {
        where: { id },
        returning: true
      })

      return { result: 'success' }
    }
  }
}

/**
 * removeTaxonomy api
 */
module.exports.removeTaxonomy = (app) => {
  return {
    docs: {
      create: {
        summary: app.utils.docs.translate.default('Remove Taxonomy'),
        description: app.utils.docs.translate.default('Remove Taxonomy'),
        parameters: [
          {
            description: app.utils.docs.translate.property('Taxonomy'),
            in: 'body',
            name: 'body',
            required: true,
            schema: {
              type: 'object',
              properties: {
                id: {
                  description: app.utils.docs.translate.property('Id'),
                  type: 'string',
                  required: true
                }
              }
            }
          }
        ],
        responses: {
          200: {
            description: app.utils.docs.translate.response('Successful'),
            schema: {
              type: 'object',
              properties: {
                result: { type: 'string', description: app.utils.docs.translate.property('Result') }
              }
            }
          },
          400: {
            description: app.utils.docs.translate.response('Input Violated')
          },
          401: {
            description: app.utils.docs.translate.response('Permission Violated')
          },
          404: {
            description: app.utils.docs.translate.response('Not Found')
          },
          500: {
            description: app.utils.docs.translate.response('Server Error')
          }
        },
        security: [{
          bearer: []
        }]
      }
    },
    // POST method
    async create (data, params) {
      const { id } = data
      const { count } = await app.models.taxonomy.findAndCountAll({ where: { id } })

      if (count === 0) {
        await app.utils.errors.handle(app, { statusCode: 404, errorCode: 1000007 })
      }

      const taxonomy = await app.models.taxonomy.destroy({ where: { id } })

      return {
        result: taxonomy === 1 ? 'success' : 'failed'
      }
    }
  }
}

/**
 * getTaxonomyCurrentPath api
 */
module.exports.getTaxonomyCurrentPath = (app) => {
  return {
    docs: {
      find: {
        summary: app.utils.docs.translate.default('Get Taxonomy Current Path'),
        description: app.utils.docs.translate.default('Get Taxonomy Current Path'),
        parameters: [
          {
            description: app.utils.docs.translate.property('Id'),
            in: 'query',
            name: 'id',
            type: 'string',
            required: true
          },
          {
            description: app.utils.docs.translate.property('Version Id'),
            in: 'query',
            name: 'versionId',
            type: 'string',
            required: true
          }
        ],
        responses: {
          200: {
            description: app.utils.docs.translate.response('Successful'),
            schema: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  id: { type: 'string', description: app.utils.docs.translate.property('Id') },
                  validStart: { type: 'string', description: app.utils.docs.translate.property('Validate Start') },
                  validEnd: { type: 'string', description: app.utils.docs.translate.property('Validate End') },
                  title: { type: 'string', description: app.utils.docs.translate.property('Title') },
                  description: { type: 'string', description: app.utils.docs.translate.property('Description') },
                  parentId: { type: 'string', description: app.utils.docs.translate.property('Parent Id') },
                  classificationType: { type: 'string', description: app.utils.docs.translate.property('Classification Type') },
                  classImageFilename: { type: 'string', description: app.utils.docs.translate.property('Classification Image Filename') },
                  approvalState: { type: 'string', description: app.utils.docs.translate.property('Approval State') },
                  issuerId: { type: 'string', description: app.utils.docs.translate.property('Issuer Id') },
                  issued: { type: 'string', description: app.utils.docs.translate.property('Issued') },
                  modifierId: { type: 'string', description: app.utils.docs.translate.property('Modifier Id') },
                  modified: { type: 'string', description: app.utils.docs.translate.property('Modified') }
                }
              }
            }
          },
          400: {
            description: app.utils.docs.translate.response('Input Violated')
          },
          401: {
            description: app.utils.docs.translate.response('Permission Violated')
          },
          404: {
            description: app.utils.docs.translate.response('Not Found')
          },
          500: {
            description: app.utils.docs.translate.response('Server Error')
          }
        },
        security: [{
          bearer: []
        }]
      }
    },
    // GET method
    async find (params) {
      const {
        id,
        versionId
      } = params.query

      const version = await app.models.taxonomyVersion.find({ where: { versionId } })

      if (!version) {
        await app.utils.errors.handle(app, { statusCode: 404, errorCode: 1000004 })
      }
      const versionDate = version.versionDate
      const Sequelize = app.models.Sequelize
      const taxonomy = await app.models.sequelize.query(`
        WITH RECURSIVE search_category(id, "parentId", title, level, path, CYCLE) AS
          (SELECT  m.id, m.parent_id, m.title, 0, ARRAY[m.id]::int[], false FROM public.taxonomy m
            WHERE m.id = '${id}' AND m.valid_start <= '${versionDate}' AND m.valid_end >= '${versionDate}' UNION ALL
          SELECT m.id, m.parent_id, m.title, LEVEL + 1, PATH || m.id::integer, m.id::integer = ANY(PATH)
            FROM public.taxonomy m, search_category sb
            WHERE m.id=sb."parentId" AND CAST(m.parent_id AS Integer) > 0 AND
              m.valid_start <= '${versionDate}' AND m.valid_end >= '${versionDate}' AND NOT CYCLE)
          SELECT CAST(id AS Integer), "parentId", lpad('', LEVEL) || title AS title, level, path FROM search_category ORDER BY id
        `, { type: Sequelize.QueryTypes.SELECT })

      return {
        taxonomy
      }
    }
  }
}

/**
 * getTaxonomySubPath api
 */
module.exports.getTaxonomySubPath = (app) => {
  return {
    docs: {
      find: {
        summary: app.utils.docs.translate.default('Get Taxonomy Sub Path'),
        description: app.utils.docs.translate.default('Get Taxonomy Sub Path'),
        parameters: [
          {
            description: app.utils.docs.translate.property('Id'),
            in: 'query',
            name: 'id',
            type: 'integer',
            required: true
          }
        ],
        responses: {
          200: {
            description: app.utils.docs.translate.response('Successful'),
            schema: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  id: { type: 'string', description: app.utils.docs.translate.property('Id') },
                  parentId: { type: 'string', description: app.utils.docs.translate.property('Parent Id') },
                  title: { type: 'string', description: app.utils.docs.translate.property('Title') },
                  level: { type: 'integer', description: app.utils.docs.translate.property('Level') },
                  path: { type: 'array', items: {}, description: app.utils.docs.translate.property('Path') }
                }
              }
            }
          },
          400: {
            description: app.utils.docs.translate.response('Input Violated')
          },
          401: {
            description: app.utils.docs.translate.response('Permission Violated')
          },
          404: {
            description: app.utils.docs.translate.response('Not Found')
          },
          500: {
            description: app.utils.docs.translate.response('Server Error')
          }
        },
        security: [{
          bearer: []
        }]
      }
    },
    // GET method
    async find (params) {
      const { id } = params.query

      if (!id) {
        await app.utils.errors.handle(app, { statusCode: 404, errorCode: 1000008 })
      }

      const Sequelize = app.models.Sequelize
      const taxonomy = await app.models.sequelize.query(`
        WITH RECURSIVE search_category(id, "parentId", title, level, path, CYCLE) AS
          (SELECT  m.id, m.parent_id, m.title, 0, ARRAY[m.id], false FROM public.taxonomy m
            WHERE m.id = '${id}' AND
            m.valid_start <= (select version_date from taxonomy_version order by issued desc limit 1) AND
            m.valid_end >= (select version_date from taxonomy_version order by issued desc limit 1) UNION ALL
          SELECT m.id, m.parent_id, m.title, LEVEL + 1, PATH || m.id, m.id = ANY(PATH)
            FROM public.taxonomy m, search_category sb
            WHERE m.parent_id=sb.id AND
            m.valid_start <= (select version_date from taxonomy_version order by issued desc limit 1) AND
            m.valid_end >= (select version_date from taxonomy_version order by issued desc limit 1) AND NOT CYCLE)
          SELECT CAST(id as Integer) as id, "parentId", lpad('', LEVEL) || title AS title, level, path FROM search_category ORDER BY level, id
        `, { type: Sequelize.QueryTypes.SELECT })

      return {
        taxonomy
      }
    }
  }
}

/**
 * getTaxonomyFirstLevel api
 */
module.exports.getTaxonomyFirstLevel = (app) => {
  return {
    docs: {
      find: {
        summary: app.utils.docs.translate.default('Get Taxonomy First Level'),
        description: app.utils.docs.translate.default('Get Taxonomy First Level'),
        parameters: [
          {
            description: app.utils.docs.translate.property('Version Id'),
            in: 'query',
            name: 'versionId',
            type: 'string',
            required: true
          },
          {
            description: app.utils.docs.translate.property('Concept Schema Id'),
            in: 'query',
            name: 'conceptSchemaId',
            type: 'string',
            required: false
          }
        ],
        responses: {
          200: {
            description: app.utils.docs.translate.response('Successful'),
            schema: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  id: { type: 'string', description: app.utils.docs.translate.property('Id') },
                  validStart: { type: 'string', description: app.utils.docs.translate.property('Validate Start') },
                  validEnd: { type: 'string', description: app.utils.docs.translate.property('Validate End') },
                  title: { type: 'string', description: app.utils.docs.translate.property('Title') },
                  description: { type: 'string', description: app.utils.docs.translate.property('Description') },
                  parentId: { type: 'string', description: app.utils.docs.translate.property('Parent Id') },
                  classificationType: { type: 'string', description: app.utils.docs.translate.property('Classification Type') },
                  classImageFilename: { type: 'string', description: app.utils.docs.translate.property('Classification Image Filename') },
                  approvalState: { type: 'string', description: app.utils.docs.translate.property('Approval State') },
                  issuerId: { type: 'string', description: app.utils.docs.translate.property('Issuer Id') },
                  issued: { type: 'string', description: app.utils.docs.translate.property('Issued') },
                  modifierId: { type: 'string', description: app.utils.docs.translate.property('Modifier Id') },
                  modified: { type: 'string', description: app.utils.docs.translate.property('Modified') }
                }
              }
            }
          },
          400: {
            description: app.utils.docs.translate.response('Input Violated')
          },
          401: {
            description: app.utils.docs.translate.response('Permission Violated')
          },
          404: {
            description: app.utils.docs.translate.response('Not Found')
          },
          500: {
            description: app.utils.docs.translate.response('Server Error')
          }
        },
        security: [{
          bearer: []
        }]
      }
    },
    // GET method
    async find (params) {
      const { versionId, conceptSchemaId } = params.query

      const version = await app.models.taxonomyVersion.find({ where: { versionId } })

      if (!version) {
        await app.utils.errors.handle(app, { statusCode: 404, errorCode: 1000004 })
      }
      const versionDate = version.versionDate
      const conceptSchema = conceptSchemaId ? `AND m.id = '${conceptSchemaId}'` : ''
      const Sequelize = app.models.Sequelize
      const taxonomy = await app.models.sequelize.query(`
        WITH RECURSIVE search_category(DATA_ID, PARENT_ID, DATA_NAME, LEVEL, PATH, CYCLE, USER_ID, CREATE_DATE, UPDATE_DATE, ACTIVE) AS
          (SELECT  m.id, m.parent_id, m.title, 0, ARRAY[m.id]::int[], false, m.issuer_id, m.issued, m.modified, m.is_active FROM public.taxonomy m
            WHERE m.parent_id = '0' ${conceptSchema} AND m.valid_start <= '${versionDate}' AND m.valid_end >= '${versionDate}' UNION ALL
          SELECT m.id, m.parent_id, m.title, LEVEL + 1, PATH || m.id::integer, m.id::integer = ANY(PATH), m.issuer_id, m.issued, m.modified, m.is_active
            FROM public.taxonomy m, search_category sb
              WHERE m.parent_id=sb.DATA_ID AND m.valid_start <= '${versionDate}' AND m.valid_end >= '${versionDate}' AND NOT CYCLE)
          SELECT CAST(DATA_ID AS Integer) as id, PARENT_ID as "parentId", lpad('', LEVEL) || DATA_NAME AS title,
            LEVEL, PATH, USER_ID as "issuerId", CREATE_DATE as issued,
            UPDATE_DATE as modified, ACTIVE as active,
            (SELECT COUNT(DATA_NAME) FROM search_category) AS total
          FROM search_category WHERE LEVEL=1 ORDER BY PATH, id
        `, { type: Sequelize.QueryTypes.SELECT })

      return {
        taxonomy
      }
    }
  }
}

/**
 * getConceptSchema api
 */
module.exports.getConceptSchema = (app) => {
  return {
    docs: {
      find: {
        summary: app.utils.docs.translate.default('Get Concept Schema'),
        description: app.utils.docs.translate.default('Get Concept Schema'),
        parameters: [
          {
            description: app.utils.docs.translate.property('Version Id'),
            in: 'query',
            name: 'versionId',
            type: 'string',
            required: true
          }
        ],
        responses: {
          200: {
            description: app.utils.docs.translate.response('Successful'),
            schema: {
              type: 'object',
              properties: {
                id: { type: 'string', description: app.utils.docs.translate.property('Id') },
                validStart: { type: 'string', description: app.utils.docs.translate.property('Validate Start') },
                validEnd: { type: 'string', description: app.utils.docs.translate.property('Validate End') },
                title: { type: 'string', description: app.utils.docs.translate.property('Title') },
                description: { type: 'string', description: app.utils.docs.translate.property('Description') },
                parentId: { type: 'string', description: app.utils.docs.translate.property('Parent Id') },
                classificationType: { type: 'string', description: app.utils.docs.translate.property('Classification Type') },
                classImageFilename: { type: 'string', description: app.utils.docs.translate.property('Classification Image Filename') },
                approvalState: { type: 'string', description: app.utils.docs.translate.property('Approval State') },
                isActive: { type: 'string', description: app.utils.docs.translate.property('IsActive') },
                issuerId: { type: 'string', description: app.utils.docs.translate.property('Issuer Id') },
                issued: { type: 'string', description: app.utils.docs.translate.property('Issued') },
                modifierId: { type: 'string', description: app.utils.docs.translate.property('Modifier Id') },
                modified: { type: 'string', description: app.utils.docs.translate.property('Modified') }
              }
            }
          },
          400: {
            description: app.utils.docs.translate.response('Input Violated')
          },
          401: {
            description: app.utils.docs.translate.response('Permission Violated')
          },
          404: {
            description: app.utils.docs.translate.response('Not Found')
          },
          500: {
            description: app.utils.docs.translate.response('Server Error')
          }
        },
        security: [{
          bearer: []
        }]
      }
    },
    // GET method
    async find (params) {
      const { versionId } = params.query
      const { Op } = app.models.sequelize

      const version = await app.models.taxonomyVersion.find({ where: { versionId } })

      if (!version) {
        await app.utils.errors.handle(app, { statusCode: 404, errorCode: 1000004 })
      }

      const versionDate = version.versionDate

      const taxonomy = await app.models.taxonomy.findAndCountAll({
        where: {
          parentId: '0',
          validStart: { [Op.lte]: Date.parse(versionDate) },
          validEnd: { [Op.gte]: Date.parse(versionDate) }
        }
      })

      if (!taxonomy) {
        await app.utils.errors.handle(app, { statusCode: 404, errorCode: 1000007 })
      }

      return taxonomy
    }
  }
}

/**
 * saveConceptSchema api
 */
module.exports.saveConceptSchema = (app) => {
  return {
    docs: {
      create: {
        summary: app.utils.docs.translate.default('Save Concept Schema'),
        description: app.utils.docs.translate.default('Save Concept Schema'),
        parameters: [
          {
            description: app.utils.docs.translate.property('Taxonomy'),
            in: 'body',
            name: 'body',
            required: true,
            schema: {
              type: 'object',
              properties: {
                title: {
                  description: app.utils.docs.translate.property('Title'),
                  type: 'string',
                  required: true
                },
                description: {
                  description: app.utils.docs.translate.property('Description'),
                  type: 'string',
                  required: false
                }
              }
            }
          }
        ],
        responses: {
          200: {
            description: app.utils.docs.translate.response('Successful'),
            schema: {
              type: 'object',
              properties: {
                result: { type: 'string', description: app.utils.docs.translate.property('Result') }
              }
            }
          },
          400: {
            description: app.utils.docs.translate.response('Input Violated')
          },
          401: {
            description: app.utils.docs.translate.response('Permission Violated')
          },
          404: {
            description: app.utils.docs.translate.response('Not Found')
          },
          500: {
            description: app.utils.docs.translate.response('Server Error')
          }
        },
        security: [{
          bearer: []
        }]
      }
    },
    // POST method
    async create (data, params) {
      const date = new Date()
      const { id } = await app.v1.service('reference-model/taxonomy/category/lastId').find()
      await app.models.taxonomy.create({
        ...data,
        id: (id * 1) + 1,
        isActive: true,
        validStart: date,
        validEnd: '9999-12-31',
        issuerId: params.user.username,
        issued: date,
        parentId: '0'
      })
      return { id: (id * 1) + 1 }
    }
  }
}

/**
 * getTaxonomyLastId api
 */
module.exports.getTaxonomyLastId = (app) => {
  return {
    docs: {
      find: {
        summary: app.utils.docs.translate.default('Get Taxonomy Last ID'),
        description: app.utils.docs.translate.default('Get Taxonomy Last ID'),
        responses: {
          200: {
            description: app.utils.docs.translate.response('Successful'),
            schema: {
              type: 'object',
              properties: {
                id: { type: 'string', description: app.utils.docs.translate.property('Id') }
              }
            }
          },
          400: {
            description: app.utils.docs.translate.response('Input Violated')
          },
          401: {
            description: app.utils.docs.translate.response('Permission Violated')
          },
          404: {
            description: app.utils.docs.translate.response('Not Found')
          },
          500: {
            description: app.utils.docs.translate.response('Server Error')
          }
        },
        security: [{
          bearer: []
        }]
      }
    },
    // GET method
    async find (params) {
      const sequelize = app.models.sequelize

      const lastEntry = await app.models.taxonomy.findOne({
        attributes: ['id'],
        limit: 1,
        order: [[ sequelize.cast(sequelize.col('id'), 'INT'), 'DESC' ]],
        raw: true
      })

      return { id: lastEntry ? parseInt(lastEntry['id']) : 0 }
    }
  }
}
