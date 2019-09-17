/**
 *  Copyright (c) Electronics and Telecommunications Research Institute. All rights reserved.
 *  See License.txt in the project root for license information.
 */

const uuidv1 = require('uuid/v1')
const path = require('path')
const mime = require('mime-types')
const fsExtra = require('fs-extra')
const dateFormat = require('dateformat')

/**
 * getDatasetList api
 */
module.exports.getDatasetList = (app) => {
  return {
    docs: {
      find: {
        summary: app.utils.docs.translate.default('Get Dataset List'),
        description: app.utils.docs.translate.default('Get Dataset List'),
        parameters: [
          {
            description: app.utils.docs.translate.property('Catalog Id'),
            in: 'query',
            name: 'catalogId',
            type: 'string',
            required: false
          },
          {
            description: app.utils.docs.translate.property('Keyword'),
            in: 'query',
            name: 'keyword',
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
      const { catalogId, offset, limit } = params.query
      const keyword = params.query.keyword || ''
      const Op = app.models.sequelize.Op
      if (!catalogId) {
        if (params.user.roles.includes('platform_admin')) {
          const query = {
            attributes: ['id', 'title', 'imagePath', 'description', 'issued'],
            limit: limit || 10,
            offset: offset || 0,
            order: ['issued'],
            where: { type: 'dataset', title: { [Op.like]: '%' + keyword + '%' } }
          }
          const { count, rows } = await app.models.resource.findAndCountAll(query)
          return {
            total: count,
            datasets: rows
          }
        } else {
          const query = {
            attributes: ['id', 'title', 'imagePath', 'description', 'issued'],
            limit: limit || 10,
            offset: offset || 0,
            order: ['issued'],
            where: { type: 'dataset', title: { [Op.like]: '%' + keyword + '%' }, [app.models.sequelize.Op.or]: [ { isPublic: true }, { ownerId: params.user.organization[0] }, { publisherId: params.user.username } ] }
          }
          if (params.user.organization[0] === 'default_org') {
            query.where = { type: 'dataset', title: { [Op.like]: '%' + keyword + '%' }, [app.models.sequelize.Op.or]: [ { isPublic: true }, { publisherId: params.user.username } ] }
          }
          const { count, rows } = await app.models.resource.findAndCountAll(query)
          return {
            total: count,
            datasets: rows
          }
        }
      } else {
        if (params.user.roles.includes('platform_admin')) {
          const values = { catalogId, limit: limit || 10, offset: offset || 0, keyword: '%' + keyword + '%' }
          const selectQuery = `select distinct resource.id, resource.title, resource.image_path as "imagePath", resource.description, resource.issued FROM resource_category_map INNER JOIN resource ON resource_category_map.resource_id = resource.id AND resource.type = 'dataset' AND resource.title like :keyword WHERE catalog_id = :catalogId ORDER BY resource.issued limit :limit offset :offset`
          const countQuery = `select count(distinct resource.id) as total FROM resource_category_map INNER JOIN resource ON resource_category_map.resource_id = resource.id AND resource.type = 'dataset' AND resource.title like :keyword WHERE catalog_id = :catalogId `
          const datasets = await app.models.sequelize.query(selectQuery, {replacements: values, type: app.models.sequelize.QueryTypes.SELECT})
          const total = await app.models.sequelize.query(countQuery, {replacements: values, type: app.models.sequelize.QueryTypes.SELECT})
          return { total: total[0].total, datasets }
        } else {
          if (params.user.organization[0] === 'default_org') {
            const values = { catalogId, limit: limit || 10, offset: offset || 0, username: params.user.username, keyword: '%' + keyword + '%' }
            const selectQuery = `select distinct resource.id, resource.title, resource.image_path as "imagePath", resource.description, resource.issued FROM resource_category_map INNER JOIN resource ON resource_category_map.resource_id = resource.id AND resource.type = 'dataset' AND resource.title like :keyword AND (resource.is_public = true OR resource.publisher_id = :username) WHERE catalog_id = :catalogId ORDER BY resource.issued limit :limit offset :offset`
            const countQuery = `select count(distinct resource.id) as total FROM resource_category_map INNER JOIN resource ON resource_category_map.resource_id = resource.id AND resource.type = 'dataset' AND resource.title like :keyword AND (resource.is_public = true OR resource.publisher_id = :username) WHERE catalog_id = :catalogId `
            const datasets = await app.models.sequelize.query(selectQuery, {replacements: values, type: app.models.sequelize.QueryTypes.SELECT})
            const total = await app.models.sequelize.query(countQuery, {replacements: values, type: app.models.sequelize.QueryTypes.SELECT})
            return { total: total[0].total, datasets }
          } else {
            const values = { catalogId, limit: limit || 10, offset: offset || 0, username: params.user.username, orgId: params.user.organization[0], keyword: '%' + keyword + '%' }
            const selectQuery = `select distinct resource.id, resource.title, resource.image_path as "imagePath", resource.description, resource.issued FROM resource_category_map INNER JOIN resource ON resource_category_map.resource_id = resource.id AND resource.type = 'dataset' AND resource.title like :keyword AND (resource.is_public = true OR resource.publisher_id = :username OR resource.owner_id = :orgId) WHERE catalog_id = :catalogId ORDER BY resource.issued limit :limit offset :offset`
            const countQuery = `select count(distinct resource.id) as total FROM resource_category_map INNER JOIN resource ON resource_category_map.resource_id = resource.id AND resource.type = 'dataset' AND resource.title like :keyword AND (resource.is_public = true OR resource.publisher_id = :username OR resource.owner_id = :orgId) WHERE catalog_id = :catalogId`
            const datasets = await app.models.sequelize.query(selectQuery, {replacements: values, type: app.models.sequelize.QueryTypes.SELECT})
            const total = await app.models.sequelize.query(countQuery, {replacements: values, type: app.models.sequelize.QueryTypes.SELECT})
            return { total: total[0].total, datasets }
          }
        }
      }
    }
  }
}

/**
 * getDataset api
 */
module.exports.getDataset = (app) => {
  return {
    docs: {
      find: {
        summary: app.utils.docs.translate.default('Get Dataset'),
        description: app.utils.docs.translate.default('Get Dataset'),
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
      const { id } = params.query
      const query = {
        where: { id, type: 'dataset' }
      }
      const result = await app.models.resource.findOne(query)
      if (!result) {
        await app.utils.errors.handle(app, { statusCode: 404, errorCode: 20002 })
      }
      if (!result.isPublic) {
        if (!params.user.roles.includes('platform_admin')) {
          if (result.ownerId !== 'default_org') {
            if (result.ownerId !== params.user.organization[0]) {
              await app.utils.errors.handle(app, { statusCode: 401, errorCode: 10002 })
            }
          } else {
            if (result.publisherId !== params.user.username) {
              await app.utils.errors.handle(app, { statusCode: 401, errorCode: 10002 })
            }
          }
        }
      }
      app.models.resourceCategoryMap.belongsTo(app.models.catalog, { foreignKey: 'catalogId' })
      app.models.catalog.hasMany(app.models.resourceCategoryMap, { foreignKey: 'catalogId' })
      const queryCatalog = {
        where: { resourceId: id },
        include: [{
          model: app.models.catalog
        }]
      }
      const catalogRaws = await app.models.resourceCategoryMap.findAll(queryCatalog)
      // const metadataRaws = await app.models.resourceCateMetaAttrValue.findAll({ where: { resourceId: id } })
      const userPrice = await app.models.priceCondition.findOne({ attributes: [['price', 'userPrice']], where: { goodsId: id, tenantType: 'user', resourceType: 'dataset' } })
      const catalogs = catalogRaws.map(catalogRaw => { return { id: catalogRaw.catalog.catalogId, name: catalogRaw.catalog.catalogName } })
      // const metadata = metadataRaws.map(metadataRaw => { return { name: metadataRaw.attributeName, value: metadataRaw.attributeValue } })
      // result.setDataValue('metadata', metadata)
      result.setDataValue('catalog', catalogs.filter((catalog, index, self) => index === self.findIndex((cal) => cal.id === catalog.id)))
      result.setDataValue('userPrice', userPrice ? userPrice.dataValues.userPrice : { userPrice: 0 })
      return result
    }
  }
}

/**
 * saveDataset api
 */
module.exports.saveDataset = (app) => {
  return {
    docs: {
      create: {
        summary: app.utils.docs.translate.default('Save Dataset'),
        description: app.utils.docs.translate.default('Save Dataset'),
        parameters: [
          {
            description: app.utils.docs.translate.property('Title'),
            in: 'formData',
            name: 'title',
            type: 'string',
            required: true
          },
          {
            description: app.utils.docs.translate.property('Is Personal (Y or N)'),
            in: 'formData',
            name: 'isPersonal',
            type: 'string',
            default: 'Y'
          },
          {
            description: app.utils.docs.translate.property('Is Public (Y or N)'),
            in: 'formData',
            name: 'isPublic',
            type: 'string',
            default: 'Y'
          },
          {
            description: app.utils.docs.translate.property('creatorId'),
            in: 'formData',
            name: 'creatorId',
            type: 'string'
          },
          {
            description: app.utils.docs.translate.property('version'),
            in: 'formData',
            name: 'version',
            type: 'string'
          },
          {
            description: app.utils.docs.translate.property('language'),
            in: 'formData',
            name: 'language',
            type: 'string'
          },
          {
            description: app.utils.docs.translate.property('landingPage'),
            in: 'formData',
            name: 'landingPage',
            type: 'string'
          },
          {
            description: app.utils.docs.translate.property('latitude'),
            in: 'formData',
            name: 'latitude',
            type: 'string'
          },
          {
            description: app.utils.docs.translate.property('longitude'),
            in: 'formData',
            name: 'longitude',
            type: 'string'
          },
          {
            description: app.utils.docs.translate.property('publisherLatitude'),
            in: 'formData',
            name: 'publisherLatitude',
            type: 'string'
          },
          {
            description: app.utils.docs.translate.property('publisherLongitude'),
            in: 'formData',
            name: 'publisherLongitude',
            type: 'string'
          },
          {
            description: app.utils.docs.translate.property('temporalStart'),
            in: 'formData',
            name: 'temporalStart',
            type: 'string'
          },
          {
            description: app.utils.docs.translate.property('temporalEnd'),
            in: 'formData',
            name: 'temporalEnd',
            type: 'string'
          },
          {
            description: app.utils.docs.translate.property('accrualPeriodicity'),
            in: 'formData',
            name: 'accrualPeriodicity',
            type: 'string'
          },
          {
            description: app.utils.docs.translate.property('spatialResolutionInMeters'),
            in: 'formData',
            name: 'spatialResolutionInMeters',
            type: 'string'
          },
          {
            description: app.utils.docs.translate.property('temporalResolution'),
            in: 'formData',
            name: 'temporalResolution',
            type: 'string'
          },
          {
            description: app.utils.docs.translate.property('conformsTo'),
            in: 'formData',
            name: 'conformsTo',
            type: 'string'
          },
          {
            description: app.utils.docs.translate.property('description'),
            in: 'formData',
            name: 'description',
            type: 'string'
          },
          {
            description: app.utils.docs.translate.property('priceType (free or charge)'),
            in: 'formData',
            name: 'priceType',
            type: 'string'
          },
          {
            description: app.utils.docs.translate.property('userPrice'),
            in: 'formData',
            name: 'userPrice',
            type: 'number',
            required: true
          },
          {
            description: app.utils.docs.translate.property('downDate'),
            in: 'formData',
            name: 'downDate',
            type: 'number',
            required: true
          },
          {
            description: app.utils.docs.translate.property('downDateType (days, months, years)'),
            in: 'formData',
            name: 'downDateType',
            type: 'string',
            required: true
          },
          {
            description: app.utils.docs.translate.property('pricePolicy'),
            in: 'formData',
            name: 'pricePolicy',
            type: 'string'
          },
          {
            description: app.utils.docs.translate.property('taxonomy'),
            in: 'formData',
            name: 'taxonomy',
            type: 'string'
          },
          {
            description: app.utils.docs.translate.property('keyword'),
            in: 'formData',
            name: 'keyword',
            type: 'string'
          },
          {
            description: app.utils.docs.translate.property('etcValue'),
            in: 'formData',
            name: 'etcValue',
            type: 'string'
          },
          {
            description: app.utils.docs.translate.property('Image'),
            in: 'formData',
            name: 'image',
            type: 'file'
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
      let isRegisted = true
      if (!(data.isPersonal === 'Y')) {
        if (!params.user.roles.includes('platform_admin')) {
          if (!params.user.roles.includes('org_admin')) {
            if (!params.user.roles.includes('org_data_editor')) {
              await app.utils.errors.handle(app, { statusCode: 401, errorCode: 10002 })
            }
          }
        }
      }
      const resourceId = uuidv1()
      if (params.files && params.files[0] && params.files[0].fieldname === 'image') {
        const imgPath = path.join(__dirname, '../../../../static/images/' + resourceId + '.' + mime.extension(params.files[0].mimetype))
        const imageExists = await fsExtra.pathExists(imgPath)
        if (!imageExists) {
          try {
            await fsExtra.outputFile(imgPath, params.files[0].buffer)
            isRegisted = true
          } catch (err) {
            // console.log(err)
            isRegisted = false
          }
        } else {
          isRegisted = false
        }
      }

      if (isRegisted) {
        try {
          const extras = data.etcValue && typeof data.etcValue === 'string' ? JSON.parse(data.etcValue) : data.etcValue
          await app.models.resource.create({
            id: resourceId,
            type: 'dataset',
            title: data.title,
            imagePath: params.files && params.files[0] && params.files[0].fieldname === 'image' ? 'images/' + resourceId + '.' + mime.extension(params.files[0].mimetype) : undefined,
            isPersonal: data.isPersonal === 'Y',
            isPublic: data.isPublic === 'Y',
            creatorId: data.creatorId,
            version: data.version,
            language: data.language,
            landingPage: data.landingPage,
            landingPageUrl: `http://${params.headers.host}/schema/${resourceId}`,
            spatialUri: data.latitude + ',' + data.longitude,
            publisherSpatialUri: data.publisherLatitude + ',' + data.publisherLongitude,
            temporalStart: data.temporalStart,
            temporalEnd: data.temporalEnd,
            accrualPeriodicity: data.accrualPeriodicity,
            spatialResolutionInMeters: data.spatialResolutionInMeters,
            temporalResolution: data.temporalResolution,
            description: data.description,
            conformsTo: data.conformsTo,
            publisherId: params.user.username,
            ownerId: data.isPersonal === 'Y' ? 'default_org' : params.user.organization[0],
            approvalState: 'accept',
            isFree: data.priceType === 'free',
            issued: Date.now(),
            extras
          })
          await app.models.priceCondition.create({
            goodsId: resourceId,
            tenantType: 'user',
            servicePeriod: data.downDate,
            periodUnit: data.downDateType,
            serviceCount: -1,
            validStart: Date.now(),
            validEnd: dateFormat('9999-12-31 23:59:59', 'yyyy-mm-dd HH:MM:ss'),
            price: data.priceType === 'free' ? 0 : data.userPrice || 0,
            productCategory: 'resource',
            resourceType: 'dataset',
            description: data.pricePolicy,
            issuerId: params.user.username,
            issued: Date.now()
          })
          if (data.taxonomy) {
            const taxonomies = data.taxonomy && typeof data.taxonomy === 'string' ? JSON.parse(data.taxonomy) : data.taxonomy
            const orgId = data.isPersonal === 'Y' ? 'default_org' : params.user.organization[0]
            const conceptSchemaQuery = `WITH RECURSIVE search_taxonomy AS (
              SELECT CLS.ID, CLS.TITLE, CLS.TITLE as ROOT, CLS.ID as ROOT_ID FROM taxonomy CLS WHERE CLS.parent_id = '0'
              UNION ALL
              SELECT CLS.ID, CLS.TITLE, SCLS.ROOT, SCLS.ROOT_ID FROM taxonomy CLS, search_taxonomy SCLS WHERE CLS.parent_id = SCLS.ID
              )
              SELECT ID, TITLE, ROOT, ROOT_ID
              FROM search_taxonomy WHERE ID != ROOT_ID
              `
            const conceptSchemas = await app.models.sequelize.query(conceptSchemaQuery, {type: app.models.sequelize.QueryTypes.SELECT})
            for (const taxonomy of taxonomies) {
              let nodeId = taxonomy.nodeId
              if (taxonomy.nodeType === 'taxonomy') {
                const conceptSchemaNode = conceptSchemas.find((schema) => schema.id === taxonomy.nodeId)
                nodeId = conceptSchemaNode && conceptSchemaNode.root_id
              }
              app.models.catalog.hasMany(app.models.catalogComponents, { foreignKey: 'catalogId' })
              app.models.catalogComponents.belongsTo(app.models.catalog, { foreignKey: 'catalogId' })
              const catalogComponents = await app.models.catalogComponents.findAll({
                where: { nodeId, nodeType: taxonomy.nodeType },
                include: [{ model: app.models.catalog, where: { orgId } }]
              })
              const resourceCategoryMap = []
              for (const catalogComponent of catalogComponents) {
                resourceCategoryMap.push({
                  resourceId: resourceId,
                  catalogId: catalogComponent.catalogId,
                  nodeId: taxonomy.nodeId, // or just nodeId
                  issuerId: params.user.username,
                  nodeType: taxonomy.nodeType,
                  issued: Date.now()
                })
              }
              await app.models.resourceCategoryMap.bulkCreate(resourceCategoryMap)
            }
          }
          if (data.keyword) {
            const keywords = JSON.parse(data.keyword)
            const resourceKeyword = []
            for (const keyword of keywords) {
              resourceKeyword.push({
                keywordId: keyword.keywordId,
                resourceId: resourceId,
                keywordType: keyword.keywordType,
                issued: Date.now(),
                issuerId: params.user.username
              })
            }
            await app.models.resourceKeyword.bulkCreate(resourceKeyword)
          }
          // TODO: gateway-apiman register
          isRegisted = true
        } catch (error) {
          isRegisted = false
        }
        if (isRegisted) {
          params.user.roles = ['platform_admin']
          await app.v1.service('gateway/monitor/activity/save').create({ tenantId: params.user.username, resourceId, actionType: 'CREATE', actionDetail: JSON.stringify(data) }, params)
        }
      }

      return { id: resourceId }
    }
  }
}

/**
 * updateDataset api
 */
module.exports.updateDataset = (app) => {
  return {
    docs: {
      create: {
        summary: app.utils.docs.translate.default('Update Dataset'),
        description: app.utils.docs.translate.default('Update Dataset'),
        parameters: [
          {
            description: app.utils.docs.translate.property('Id'),
            in: 'formData',
            name: 'id',
            type: 'string',
            required: true
          },
          {
            description: app.utils.docs.translate.property('Title'),
            in: 'formData',
            name: 'title',
            type: 'string'
          },
          {
            description: app.utils.docs.translate.property('Is Public (Y or N)'),
            in: 'formData',
            name: 'isPublic',
            type: 'string'
          },
          {
            description: app.utils.docs.translate.property('creatorId'),
            in: 'formData',
            name: 'creatorId',
            type: 'string'
          },
          {
            description: app.utils.docs.translate.property('version'),
            in: 'formData',
            name: 'version',
            type: 'string'
          },
          {
            description: app.utils.docs.translate.property('language'),
            in: 'formData',
            name: 'language',
            type: 'string'
          },
          {
            description: app.utils.docs.translate.property('landingPage'),
            in: 'formData',
            name: 'landingPage',
            type: 'string'
          },
          {
            description: app.utils.docs.translate.property('latitude'),
            in: 'formData',
            name: 'latitude',
            type: 'string'
          },
          {
            description: app.utils.docs.translate.property('longitude'),
            in: 'formData',
            name: 'longitude',
            type: 'string'
          },
          {
            description: app.utils.docs.translate.property('publisherLatitude'),
            in: 'formData',
            name: 'publisherLatitude',
            type: 'string'
          },
          {
            description: app.utils.docs.translate.property('publisherLongitude'),
            in: 'formData',
            name: 'publisherLongitude',
            type: 'string'
          },
          {
            description: app.utils.docs.translate.property('temporalStart'),
            in: 'formData',
            name: 'temporalStart',
            type: 'string'
          },
          {
            description: app.utils.docs.translate.property('temporalEnd'),
            in: 'formData',
            name: 'temporalEnd',
            type: 'string'
          },
          {
            description: app.utils.docs.translate.property('accrualPeriodicity'),
            in: 'formData',
            name: 'accrualPeriodicity',
            type: 'string'
          },
          {
            description: app.utils.docs.translate.property('spatialResolutionInMeters'),
            in: 'formData',
            name: 'spatialResolutionInMeters',
            type: 'string'
          },
          {
            description: app.utils.docs.translate.property('temporalResolution'),
            in: 'formData',
            name: 'temporalResolution',
            type: 'string'
          },
          {
            description: app.utils.docs.translate.property('conformsTo'),
            in: 'formData',
            name: 'conformsTo',
            type: 'string'
          },
          {
            description: app.utils.docs.translate.property('description'),
            in: 'formData',
            name: 'description',
            type: 'string'
          },
          {
            description: app.utils.docs.translate.property('etcValue'),
            in: 'formData',
            name: 'etcValue',
            type: 'string'
          },
          {
            description: app.utils.docs.translate.property('Image'),
            in: 'formData',
            name: 'image',
            type: 'file'
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
      const found = await app.models.resource.findOne({ where: { id, type: 'dataset' } })
      if (!found) {
        await app.utils.errors.handle(app, { statusCode: 404, errorCode: 20002 })
      }
      if (!params.user.roles.includes('platform_admin')) {
        if (!params.user.roles.includes('org_admin')) {
          if (found.publisherId !== params.user.username) {
            await app.utils.errors.handle(app, { statusCode: 401, errorCode: 10002 })
          }
        } else {
          if (found.ownerId !== params.user.organization[0]) {
            await app.utils.errors.handle(app, { statusCode: 401, errorCode: 10002 })
          }
        }
      }
      let imagePath
      if (params.files && params.files[0]) {
        if (params.files[0].fieldname === 'image') {
          imagePath = `images/${id}.${mime.extension(params.files[0].mimetype)}`
          if (found.imagePath) {
            const imgPath = path.join(__dirname, `../../../../../static/${found.imagePath}`)
            const imageExists = await fsExtra.pathExists(imgPath)
            if (imageExists) {
              try {
                await fsExtra.remove(imgPath)
              } catch (err) {
                // skip
              }
            }
          }
          const imgPath = path.join(__dirname, `../../../../../static/${imagePath}`)
          await fsExtra.outputFile(imgPath, params.files[0].buffer)
        }
      }
      await app.models.resource.update({
        ...found,
        ...data,
        imagePath,
        issued: new Date()
      }, {
        where: { id },
        returning: true
      })
      params.user.roles = ['platform_admin']
      await app.v1.service('gateway/monitor/activity/save').create({ tenantId: params.user.username, resourceId: id, actionType: 'UPDATE', actionDetail: JSON.stringify(data) }, params)
      return { result: 'success' }
    }
  }
}

/**
 * removeDataset api
 */
module.exports.removeDataset = (app) => {
  return {
    docs: {
      create: {
        summary: app.utils.docs.translate.default('Remove Dataset'),
        description: app.utils.docs.translate.default('Remove Dataset'),
        parameters: [
          {
            description: app.utils.docs.translate.property('Dataset'),
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
      const found = await app.models.resource.findOne({ where: { id, type: 'dataset' } })
      if (!found) {
        await app.utils.errors.handle(app, { statusCode: 404, errorCode: 20002 })
      }
      if (!params.user.roles.includes('platform_admin')) {
        if (!params.user.roles.includes('org_admin')) {
          if (found.publisherId !== params.user.username) {
            await app.utils.errors.handle(app, { statusCode: 401, errorCode: 10002 })
          }
        } else {
          if (found.ownerId !== params.user.organization[0]) {
            await app.utils.errors.handle(app, { statusCode: 401, errorCode: 10002 })
          }
        }
      }
      params.user.roles = ['platform_admin']
      await app.v1.service('gateway/monitor/activity/save').create({ tenantId: params.user.username, resourceId: id, actionType: 'DELETE', actionDetail: JSON.stringify(data) }, params)
      await app.models.resource.destroy({ where: { id, type: 'dataset' } })
      return { result: 'success' }
    }
  }
}
