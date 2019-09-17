/**
 *  Copyright (c) Electronics and Telecommunications Research Institute. All rights reserved.
 *  See License.txt in the project root for license information.
 */
const uuidv1 = require('uuid/v1')
const dateFormat = require('dateformat')

/**
 * saveCatalog api
 */
module.exports.saveCatalog = (app) => {
  return {
    docs: {
      create: {
        summary: app.utils.docs.translate.default('Save Catalog'),
        description: app.utils.docs.translate.default('Save Catalog'),
        parameters: [
          {
            description: app.utils.docs.translate.property('Catalog'),
            in: 'body',
            name: 'body',
            required: true,
            schema: {
              type: 'object',
              properties: {
                orgId: { type: 'string', description: app.utils.docs.translate.property('Organization Id') },
                name: { type: 'string', description: app.utils.docs.translate.property('name'), required: true },
                description: { type: 'string', description: app.utils.docs.translate.property('description') },
                license: { type: 'string', description: app.utils.docs.translate.property('license') },
                rights: { type: 'string', description: app.utils.docs.translate.property('right') },
                homepage: { type: 'string', description: app.utils.docs.translate.property('homepage') }
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
      const catalogId = uuidv1()
      if (data.orgId) {
        const found = await app.models.tenant.findOne({ where: { id: data.orgId, tenantType: 'org' } })
        if (!found) {
          await app.utils.errors.handle(app, { statusCode: 404, errorCode: 10014 })
        }
        if ((data.orgId === 'default_org' && !params.user.roles.includes('platform_admin')) ||
          (!params.user.organization.includes(data.orgId) && !params.user.roles.includes('platform_admin'))) {
          await app.utils.errors.handle(app, { statusCode: 404, errorCode: 10002 })
        }
      }
      await app.models.catalog.create({
        orgId: data.orgId || 'default_org',
        catalogId,
        validStart: Date.now(),
        validEnd: dateFormat('9999-12-31 23:59:59', 'yyyy-mm-dd HH:MM:ss'),
        catalogName: data.name,
        description: data.description,
        license: data.license,
        rights: data.rights,
        homepage: data.homepage,
        issuerId: params.user.username,
        issued: Date.now()
      })
      return { id: catalogId }
    }
  }
}

/**
 * removeCatalog api
 */
module.exports.removeCatalog = (app) => {
  return {
    docs: {
      create: {
        summary: app.utils.docs.translate.default('Remove Catalog'),
        description: app.utils.docs.translate.default('Remove Catalog'),
        parameters: [
          {
            description: app.utils.docs.translate.property('Catalog'),
            in: 'body',
            name: 'body',
            required: true,
            schema: {
              type: 'object',
              properties: {
                id: { type: 'string', description: app.utils.docs.translate.property('id'), required: true }
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
      const found = await app.models.catalog.findOne({ where: { catalogId: data.id } })
      if (!found) {
        await app.utils.errors.handle(app, { statusCode: 404, errorCode: 20001 })
      }
      const foundChildCatalog = await app.models.catalogComponents.findOne({ where: { nodeId: data.id, nodeType: 'catalog' } })
      if (foundChildCatalog) {
        await app.utils.errors.handle(app, { statusCode: 400, errorCode: 20011 })
      }
      if ((found.orgId === 'default_org' && !params.user.roles.includes('platform_admin')) ||
          (!params.user.organization.includes(found.orgId) && !params.user.roles.includes('platform_admin'))) {
        await app.utils.errors.handle(app, { statusCode: 401, errorCode: 10002 })
      }
      const catalogId = data.id
      const countQuery = `select count(1) as cnt from resource_category_map where catalog_id = :catalogId `
      const mappingCount = await app.models.sequelize.query(countQuery, {replacements: { catalogId }, type: app.models.sequelize.QueryTypes.SELECT})
      if (mappingCount[0].cnt > 0) {
        await app.utils.errors.handle(app, { statusCode: 404, errorCode: 20005 })
      }
      await app.models.catalogComponents.destroy({where: {catalogId}})
      await app.models.catalogComponents.destroy({ where: { nodeId: catalogId, nodeType: 'catalog' } })
      await app.models.catalog.destroy({where: {catalogId}})
      return { result: 'success' }
    }
  }
}

/**
 * getCatalog api
 */
module.exports.getCatalog = (app) => {
  return {
    docs: {
      find: {
        summary: app.utils.docs.translate.default('Get Catalog'),
        description: app.utils.docs.translate.default('Get Catalog'),
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
    // GET method
    async find (params) {
      const values = {}
      const selectQuery = `select * from catalog where catalog_id = :catalogId `
      values.catalogId = params.query.id
      const catalog = await app.models.sequelize.query(selectQuery, {replacements: values, type: app.models.sequelize.QueryTypes.SELECT})
      if (catalog && catalog[0]) {
        const componentsQuery = ` WITH RECURSIVE serach_catalog_components(
          node_id, node_type, description, issuer_id, issued, parent_node_id, LEVEL) AS (
            SELECT cc.node_id, cc.node_type, cc.description, cc.issuer_id, cc.issued, cc.parent_node_id, 0
            FROM catalog_components cc
            WHERE cc.catalog_id = :catalog_id
            and cc.parent_node_id = '-1'
            UNION ALL
            SELECT cc.node_id, cc.node_type, cc.description, cc.issuer_id, cc.issued, cc.parent_node_id, LEVEL+1
            FROM catalog_components cc, serach_catalog_components scc
            WHERE cc.parent_node_id = scc.node_id
            and cc.catalog_id = :catalog_id
            and scc.node_type = cc.parent_node_type
          )
          SELECT node_id, CASE CC.NODE_TYPE
               WHEN 'catalog' THEN (SELECT catalog_name FROM CATALOG WHERE catalog_id = CC.NODE_ID)
               WHEN 'taxonomy' THEN (SELECT TITLE FROM TAXONOMY WHERE ID = CC.NODE_ID)
               WHEN 'dictionary' THEN (SELECT NAME FROM DICTIONARY WHERE ID = CC.NODE_ID)
            END AS TITLE,  node_type, description, issuer_id, issued, parent_node_id, LEVEL
              FROM serach_catalog_components CC
              order by node_type `
        const componentValues = {}
        componentValues.catalog_id = params.query.id
        const component = await app.models.sequelize.query(componentsQuery, {replacements: componentValues, type: app.models.sequelize.QueryTypes.SELECT})
        catalog[0].catalogComponents = component
      } else {
        await app.utils.errors.handle(app, { statusCode: 404, errorCode: 20001 })
      }
      return app.utils.format.toCamelCase(catalog[0] || {})
    }
  }
}

/**
 * getCatalogList api
 */
module.exports.getCatalogList = (app) => {
  return {
    docs: {
      find: {
        summary: app.utils.docs.translate.default('Get Catalog List'),
        description: app.utils.docs.translate.default('Get Catalog List'),
        parameters: [
          {
            description: app.utils.docs.translate.property('offset'),
            in: 'query',
            name: 'offset',
            type: 'integer',
            required: false
          },
          {
            description: app.utils.docs.translate.property('limit'),
            in: 'query',
            name: 'limit',
            type: 'integer',
            required: false
          },
          {
            description: app.utils.docs.translate.property('name'),
            in: 'query',
            name: 'name',
            type: 'string',
            required: false
          },
          {
            description: app.utils.docs.translate.property('Organization Id'),
            in: 'query',
            name: 'orgId',
            type: 'string',
            required: false
          }
        ],
        responses: {
          200: {
            description: app.utils.docs.translate.response('Successful')
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
      const values = {}
      let selectQuery = `select catalog_id as "catalogId", org_id as "orgId", catalog_name as "catalogName", issuer_id as "issuerId", issued from catalog where 1=1 `
      let countQuery = `select count(1) as totalcount from catalog where 1=1 `
      if (params.query.name) {
        selectQuery += ` and catalog_name like :catalogName`
        countQuery += ` and catalog_name like :catalogName`
        values.catalogName = params.query.name
      }
      if (params.query.orgId) {
        selectQuery += ` and org_id like :organizationId`
        countQuery += ` and org_id like :organizationId`
        values.organizationId = params.query.orgId
      }
      selectQuery += ` limit :limit offset :offset `
      values.limit = params.query.limit || 10
      values.offset = params.query.offset || 0
      const totalcount = await app.models.sequelize.query(countQuery, {replacements: values, type: app.models.sequelize.QueryTypes.SELECT})
      const catalogs = await app.models.sequelize.query(selectQuery, {replacements: values, type: app.models.sequelize.QueryTypes.SELECT})
      return { total: Number(totalcount[0].totalcount), catalogs }
    }
  }
}

/**
 * updateCatalog api
 */
module.exports.updateCatalog = (app) => {
  return {
    docs: {
      create: {
        summary: app.utils.docs.translate.default('Update Catalog'),
        description: app.utils.docs.translate.default('Update Catalog'),
        parameters: [
          {
            description: app.utils.docs.translate.property('Catalog'),
            in: 'body',
            name: 'body',
            required: true,
            schema: {
              type: 'object',
              properties: {
                id: { type: 'string', description: app.utils.docs.translate.property('catalogId'), required: true },
                name: { type: 'string', description: app.utils.docs.translate.property('catalogName') },
                description: { type: 'string', description: app.utils.docs.translate.property('description') },
                license: { type: 'string', description: app.utils.docs.translate.property('license') },
                rights: { type: 'string', description: app.utils.docs.translate.property('right') },
                homepage: { type: 'string', description: app.utils.docs.translate.property('homepage') }
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
      const found = await app.models.catalog.findOne({ where: { catalogId: data.id } })
      if (!found) {
        await app.utils.errors.handle(app, { statusCode: 404, errorCode: 20001 })
      }
      if ((found.orgId === 'default_org' && !params.user.roles.includes('platform_admin')) ||
          (!params.user.organization.includes(found.orgId) && !params.user.roles.includes('platform_admin'))) {
        await app.utils.errors.handle(app, { statusCode: 401, errorCode: 10002 })
      }
      let isUpdated = false
      const catalogId = data.id
      try {
        const values = {}
        let updateQuery = `update catalog set modified = issued, modifier_id = :modifierId`
        values.modifierId = params.user.username
        if (data.name) {
          updateQuery += `, catalog_name = :catalogName `
          values.catalogName = data.name
        }
        if (data.description) {
          updateQuery += `, description = :description `
          values.description = data.description
        }
        if (data.license) {
          updateQuery += `, license = :license `
          values.license = data.license
        }
        if (data.homepage) {
          updateQuery += `, homepage = :homepage `
          values.homepage = data.homepage
        }
        if (data.rights) {
          updateQuery += `, rights = :rights `
          values.rights = data.rights
        }
        updateQuery += ` where catalog_id = :catalogId`
        values.catalogId = catalogId
        await app.models.sequelize.query(updateQuery, {replacements: values, type: app.models.sequelize.QueryTypes.SELECT})
        isUpdated = true
      } catch (error) {
        isUpdated = false
      }

      return { result: isUpdated ? 'success' : 'failed' }
    }
  }
}

/**
 * saveCatalogComponents api
 */
module.exports.saveCatalogComponents = (app) => {
  return {
    docs: {
      create: {
        summary: app.utils.docs.translate.default('Save Catalog Component'),
        description: app.utils.docs.translate.default('Save Catalog Component'),
        parameters: [
          {
            description: app.utils.docs.translate.property('Catalog Component'),
            in: 'body',
            name: 'body',
            required: true,
            schema: {
              type: 'object',
              properties: {
                catalogId: { type: 'string', description: app.utils.docs.translate.property('catalogId'), required: true },
                nodeId: { type: 'string', description: app.utils.docs.translate.property('nodeId'), required: true },
                nodeType: { type: 'string', description: app.utils.docs.translate.property('nodeType (taxonomy or dictionary)'), required: true },
                parentNodeId: { type: 'string', description: app.utils.docs.translate.property('parentNodeId') },
                parentNodeType: { type: 'string', description: app.utils.docs.translate.property('parentNodeType (dictionary)') }
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
      const found = await app.models.catalog.findOne({ where: { catalogId: data.catalogId } })
      if (!found) {
        await app.utils.errors.handle(app, { statusCode: 404, errorCode: 20001 })
      }
      if ((found.orgId === 'default_org' && !params.user.roles.includes('platform_admin')) ||
          (!params.user.organization.includes(found.orgId) && !params.user.roles.includes('platform_admin'))) {
        await app.utils.errors.handle(app, { statusCode: 401, errorCode: 10002 })
      }
      if (data.parentNodeId && data.parentNodeType) {
        if (data.parentNodeType === 'dictionary') {
          const foundParent = await app.models.dictionary.findOne({ where: { id: data.parentNodeId } })
          if (!foundParent) {
            await app.utils.errors.handle(app, { statusCode: 404, errorCode: 20013 })
          }
        }
      }
      if (data.nodeType === 'taxonomy') {
        const foundTaxonomy = await app.models.taxonomy.findOne({ where: { id: data.nodeId, parentId: '0' } })
        if (!foundTaxonomy) {
          await app.utils.errors.handle(app, { statusCode: 404, errorCode: 1000007 })
        }
        await app.models.catalogComponents.create({
          catalogId: data.catalogId,
          nodeId: data.nodeId,
          validStart: Date.now(),
          validEnd: dateFormat('9999-12-31 23:59:59', 'yyyy-mm-dd HH:MM:ss'),
          issuerId: params.user.username,
          issued: Date.now(),
          nodeType: data.nodeType,
          parentNodeId: data.parentNodeId || `-1`,
          parentNodeType: data.parentNodeType || `-1`
        })
      } else if (data.nodeType === 'dictionary') {
        const foundKeyword = await app.models.dictionary.findOne({ where: { id: data.nodeId } })
        if (!foundKeyword) {
          await app.utils.errors.handle(app, { statusCode: 404, errorCode: 20013 })
        }
        await app.models.catalogComponents.create({
          catalogId: data.catalogId,
          nodeId: data.nodeId,
          validStart: Date.now(),
          validEnd: dateFormat('9999-12-31 23:59:59', 'yyyy-mm-dd HH:MM:ss'),
          issuerId: params.user.username,
          issued: Date.now(),
          nodeType: data.nodeType,
          parentNodeId: data.parentNodeId || `-1`,
          parentNodeType: data.parentNodeType || `-1`
        })
      } else if (data.nodeType === 'catalog') {
        const foundCatalog = await app.models.catalog.findOne({ where: { catalogId: data.nodeId } })
        if (!foundCatalog) {
          await app.utils.errors.handle(app, { statusCode: 404, errorCode: 20001 })
        }
        const foundKeyword = await app.models.dictionary.findOne({ where: { id: data.parentNodeId } })
        if (!foundKeyword) {
          await app.utils.errors.handle(app, { statusCode: 404, errorCode: 20013 })
        }
        const foundParent = await app.models.catalogComponents.findOne({ where: { catalogId: data.catalogId, nodeId: data.parentNodeId, nodeType: data.parentNodeType } })
        if (!foundParent) {
          await app.utils.errors.handle(app, { statusCode: 404, errorCode: 20021 })
        }
        await app.models.catalogComponents.create({
          catalogId: data.catalogId,
          nodeId: data.nodeId,
          validStart: Date.now(),
          validEnd: dateFormat('9999-12-31 23:59:59', 'yyyy-mm-dd HH:MM:ss'),
          issuerId: params.user.username,
          issued: Date.now(),
          nodeType: data.nodeType,
          parentNodeId: data.parentNodeId || `-1`,
          parentNodeType: data.parentNodeType || `-1`
        })
      }
      return { result: 'success' }
    }
  }
}

/**
 * removeCatalogComponents api
 */
module.exports.removeCatalogComponents = (app) => {
  return {
    docs: {
      create: {
        summary: app.utils.docs.translate.default('Remove Catalog Component'),
        description: app.utils.docs.translate.default('Remove Catalog Component'),
        parameters: [
          {
            description: app.utils.docs.translate.property('Catalog Component'),
            in: 'body',
            name: 'body',
            required: true,
            schema: {
              type: 'object',
              properties: {
                catalogId: { type: 'string', description: app.utils.docs.translate.property('catalogId'), required: true },
                nodeId: { type: 'string', description: app.utils.docs.translate.property('nodeId'), required: true },
                nodeType: { type: 'string', description: app.utils.docs.translate.property('nodeType'), required: true }
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
      const { catalogId, nodeId, nodeType } = data
      const found = await app.models.catalogComponents.findOne({ where: { catalogId, nodeId, nodeType } })
      if (!found) {
        await app.utils.errors.handle(app, { statusCode: 404, errorCode: 20006 })
      }
      if ((found.orgId === 'default_org' && !params.user.roles.includes('platform_admin')) ||
          (!params.user.organization.includes(found.orgId) && !params.user.roles.includes('platform_admin'))) {
        await app.utils.errors.handle(app, { statusCode: 401, errorCode: 10002 })
      }
      const foundChildComponent = await app.models.catalogComponents.findOne({ where: { parentNodeId: nodeId, parentNodeType: nodeType } })
      if (foundChildComponent) {
        await app.utils.errors.handle(app, { statusCode: 400, errorCode: 20012 })
      }
      await app.models.catalogComponents.destroy({ where: { catalogId, nodeId, nodeType } })
      return { result: 'success' }
    }
  }
}
