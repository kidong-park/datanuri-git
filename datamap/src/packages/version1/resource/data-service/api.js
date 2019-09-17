/**
 *  Copyright (c) Electronics and Telecommunications Research Institute. All rights reserved.
 *  See License.txt in the project root for license information.
 */

const uuidv1 = require('uuid/v1')
const fsExtra = require('fs-extra')
const path = require('path')
const mime = require('mime-types')
const dateFormat = require('dateformat')

/**
 * saveDataservice api
 */
module.exports.saveDataservice = (app) => {
  return {
    docs: {
      create: {
        summary: app.utils.docs.translate.default('Save Dataservice'),
        description: app.utils.docs.translate.default('Save Dataservice'),
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
            description: app.utils.docs.translate.property('endPointUrl'),
            in: 'formData',
            name: 'endPointUrl',
            type: 'string',
            required: true
          },
          {
            description: app.utils.docs.translate.property('endPointDescription'),
            in: 'formData',
            name: 'endPointDescription',
            type: 'string'
          },
          {
            description: app.utils.docs.translate.property('method'),
            in: 'formData',
            name: 'method',
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
            type: 'api',
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
            endpointUrl: data.endPointUrl,
            endpointDescription: data.endPointDescription,
            method: data.method,
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
            resourceType: 'api',
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
 * removeDataservice api
 */
module.exports.removeDataservice = (app) => {
  return {
    docs: {
      create: {
        summary: app.utils.docs.translate.default('Remove Dataservice'),
        description: app.utils.docs.translate.default('Remove Dataservice'),
        parameters: [
          {
            description: app.utils.docs.translate.property('Dataservice'),
            in: 'body',
            name: 'body',
            required: true,
            schema: {
              type: 'object',
              properties: {
                id: {
                  description: app.utils.docs.translate.property('id'),
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
      let isUpdated = false
      const resource = await app.models.resource.findOne({where: {id, type: 'api'}})
      if (!resource) {
        await app.utils.errors.handle(app, { statusCode: 404, errorCode: 20003 })
      }
      if (!params.user.roles.includes('platform_admin')) {
        if (!params.user.roles.includes('org_admin')) {
          if (resource.publisherId !== params.user.username) {
            await app.utils.errors.handle(app, { statusCode: 401, errorCode: 10002 })
          }
        } else {
          if (resource.ownerId !== params.user.organization[0]) {
            await app.utils.errors.handle(app, { statusCode: 401, errorCode: 10002 })
          }
        }
      }
      try {
        // await app.models.resource.update({ removeType: 'remove' }, {where: {id}})
        params.user.roles = ['platform_admin']
        await app.v1.service('gateway/monitor/activity/save').create({ tenantId: params.user.username, resourceId: id, actionType: 'DELETE', actionDetail: JSON.stringify(data) }, params)
        await app.models.resource.destroy({ where: { id, type: 'api' } })
        isUpdated = true
      } catch (error) {
        isUpdated = false
      }
      return { result: isUpdated ? 'success' : 'failed' }
    }
  }
}

/**
 * getDataservice api
 */
module.exports.getDataservice = (app) => {
  return {
    docs: {
      find: {
        summary: app.utils.docs.translate.default('Get Dataservice'),
        description: app.utils.docs.translate.default('Get Dataservice'),
        parameters: [
          {
            description: app.utils.docs.translate.property('id'),
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
      const id = params.query.id
      const queryService = { where: { id, type: 'api' } }
      const foundDataservice = await app.models.resource.findOne(queryService)
      if (!foundDataservice) {
        await app.utils.errors.handle(app, { statusCode: 404, errorCode: 20003 })
      }
      if (!foundDataservice.isPublic) {
        if (!params.user.roles.includes('platform_admin')) {
          if (foundDataservice.ownerId !== 'default_org') {
            if (foundDataservice.ownerId !== params.user.organization[0]) {
              await app.utils.errors.handle(app, { statusCode: 401, errorCode: 10002 })
            }
          } else {
            if (foundDataservice.publisherId !== params.user.username) {
              await app.utils.errors.handle(app, { statusCode: 401, errorCode: 10002 })
            }
          }
        }
      }
      const selectQuery = `select
      id,
      title,
      image_path as "imagePath",
      latitude,
      longitude,
      publisherLatitude as "publisherLatitude",
      publisherLongitude as "publisherLongitude",
      language,
      version,
      description,
      license as "licenseInfo",
      (select family_name || name from tenant where id=a.publisher_id ) as register,
      is_free as "priceType",
      extras,
      pricePolicy as "pricePolicy",
      service_period as "downDate",
      openFlag as "openFlag",
      period_unit as "downDateType",
      productType as "productType",
      temporalStart as "temporalStart",
      temporalEnd as "temporalEnd",
      update,
      sum(user_price) as "userPrice",
      issued as "regDate",
      owner_id as "ownerId",
      landing_page as "landingPage",
      landing_page_url as "landingPageUrl",
      cp_phone as phone,
      cp_email as email,
      cp_address as address,
      creatorPhone as "creatorPhone",
      creatorName as "creatorName",
      creatorEmail as "creatorEmail",
      creatorAddress as "creatorAddress"
      from
      (
      select
        res.id
        , res.title
        , res.image_path
        , res.type
        , split_part(res.spatial_uri, ',', 1) as latitude
        , split_part(res.spatial_uri, ',', 2) as longitude
        , split_part(res.publisher_spatial_uri, ',', 1) as publisherLatitude
        , split_part(res.publisher_spatial_uri, ',', 2) as publisherLongitude
        , res.language
        , res.version
        , res.description
        , res.license
        , res.publisher_id
        , res.temporal_start as temporalStart
        , res.temporal_end as temporalEnd
        , res.accrual_periodicity as update
        , case when res.is_free then 'free' else 'pay' end as is_free
        , case when res.is_public then 'Y' else 'N' end as openFlag
        , case when res.is_personal then 'user' else 'org' end as productType
        , res.extras
        , pc.period_unit
        , pc.service_period
        , case when tenant_type = 'user' then pc.price end as user_price
        , pc.description as pricePolicy
        , res.issued
        , res.owner_id
        , res.landing_page
        , res.landing_page_url
        , (select phone_number from tenant where id=res.publisher_id) as cp_phone
        , (select email from tenant where id=res.publisher_id) as cp_email
        , (select address from tenant where id=res.publisher_id) as cp_address
        , (select name from tenant where id=res.creator_id and is_creator = true) as creatorName
        , (select phone_number from tenant where id=res.creator_id and is_creator = true) as creatorPhone
        , (select email from tenant where id=res.creator_id and is_creator = true) as creatorEmail
        , (select address from tenant where id=res.creator_id and is_creator = true) as creatorAddress
      from
        resource res
        left join price_condition pc
        on res.id = pc.goods_id
        where res.id = :id
        and res.type = 'api'
        and COALESCE(remove_type, '') not in ('remove','disuse')
      ) as a
      group by id, title, image_path, type, latitude, longitude, publisherLatitude, publisherLongitude, language, version, description,
      license, publisher_id, is_free, extras, period_unit, service_period, pricePolicy, openFlag,
      productType, temporalStart, temporalEnd, update, issued, owner_id, landing_page, landing_page_url, creatorPhone, creatorName, creatorEmail, creatorAddress, cp_phone, cp_email, cp_address`
      const queryParams = {}
      queryParams.id = id
      const resource = await app.models.sequelize.query(selectQuery, {replacements: queryParams, type: app.models.sequelize.QueryTypes.SELECT})
      if (resource && resource[0]) {
        const tagQuery = `select
            keyword_id as "keywordId"
            , dic.name
          from
            resource_keyword reskey,
            dictionary dic
          where dic.id = reskey.keyword_id
          and reskey.resource_id = :id`
        const tag = await app.models.sequelize.query(tagQuery, {replacements: queryParams, type: app.models.sequelize.QueryTypes.SELECT})
        resource[0].tag = tag

        const catalogQuery = `select * from resource_category_map where resource_id = :id `
        const catalog = await app.models.sequelize.query(catalogQuery, {replacements: queryParams, type: app.models.sequelize.QueryTypes.SELECT})
        resource[0].taxonomy = catalog
        const categoryMetaQuery = `select
                id,
                category_id,
                (select title from taxonomy where id = rcmav.category_id) as category_name,
                attribute_name,
                attribute_value
        from resource_cate_meta_attr_value rcmav where resource_id = :id `
        const categoryMeta = await app.models.sequelize.query(categoryMetaQuery, {replacements: queryParams, type: app.models.sequelize.QueryTypes.SELECT})
        resource[0].categoryMeta = categoryMeta

        const organizationQuery = `select tenant.title from tenant_relation join tenant on tenant.id = tenant_relation.org_id limit 1`
        const defaultOrganizationQuery = `select tenant.title from tenant where tenant.id = 'default_org' limit 1`
        const organization = await app.models.sequelize.query(resource[0].productType === 'org' ? organizationQuery : defaultOrganizationQuery, {replacements: { id: resource[0].register }, type: app.models.sequelize.QueryTypes.SELECT})
        resource[0].organization = organization && organization[0].title
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
      const catalogs = catalogRaws.map(catalogRaw => { return { id: catalogRaw.catalog.catalogId, name: catalogRaw.catalog.catalogName } })
      // const metadata = metadataRaws.map(metadataRaw => { return { name: metadataRaw.attributeName, value: metadataRaw.attributeValue } })
      // resource[0].metadata = metadata
      resource[0].catalog = catalogs.filter((catalog, index, self) =>
        index === self.findIndex((cal) => cal.id === catalog.id)
      )
      return app.utils.format.toCamelCase(resource[0] || {})
    }
  }
}

/**
 * accessDataservice api
 */
module.exports.accessDataservice = (app) => {
  return {
    docs: {
      create: {
        summary: app.utils.docs.translate.default('Update Dataservice'),
        description: app.utils.docs.translate.default('Update Dataservice'),
        parameters: [
          {
            description: app.utils.docs.translate.property('Dataservice'),
            in: 'body',
            name: 'body',
            required: true,
            schema: {
              type: 'object',
              properties: {
                id: { type: 'string', description: app.utils.docs.translate.property('id'), required: true },
                params: { type: 'object', description: app.utils.docs.translate.property('params') },
                data: { type: 'object', description: app.utils.docs.translate.property('data') }
              }
            }
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
    async create (data, params) {
      const resource = await app.models.resource.findOne({where: { id: data.id, type: 'api' }})
      if (!resource) {
        await app.utils.errors.handle(app, { statusCode: 404, errorCode: 20003 })
      }
      if (!params.user.roles.includes('platform_admin')) {
        const resourceAuthorization = await app.models.datasetAcl.findOne({ where: { tenantId: params.user.username, goodsId: resource.id, goodsType: 'api' } })
        if ((resourceAuthorization && resourceAuthorization.exceptionType === 'block')) {
          await app.utils.errors.handle(app, { statusCode: 401, errorCode: 10002 })
        }
        if (resource.ownerId === 'default_org') {
          if (resource.isPublic) {
            if (!resource.isFree) {
              if (resource.publisherId !== params.user.username) {
                if (!resourceAuthorization) {
                  await app.utils.errors.handle(app, { statusCode: 401, errorCode: 10002 })
                } else if (resourceAuthorization.purchaseId) {
                  const sequelize = app.models.sequelize
                  const pdQuery = {
                    where: {
                      [sequelize.Op.and]: [
                        sequelize.where(sequelize.col('service_end'), '>=', sequelize.literal('current_date')),
                        { purchaseId: resourceAuthorization.purchaseId, goodsId: resource.id, goodsType: 'api' }
                      ]
                    }
                  }
                  const purchaseDetail = await app.models.purchaseDetail.findOne(pdQuery)
                  if (!purchaseDetail) {
                    await app.utils.errors.handle(app, { statusCode: 401, errorCode: 10002 })
                  }
                }
              }
            }
          } else {
            if (resource.publisherId !== params.user.username) {
              await app.utils.errors.handle(app, { statusCode: 401, errorCode: 10002 })
            }
          }
        } else {
          if (resource.isPublic) {
            if (!resource.isFree) {
              if (resource.publisherId !== params.user.username) {
                if (!resourceAuthorization) {
                  if (resource.ownerId !== params.user.organization[0]) {
                    await app.utils.errors.handle(app, { statusCode: 401, errorCode: 10002 })
                  }
                } else if (resourceAuthorization.purchaseId) {
                  const sequelize = app.models.sequelize
                  const pdQuery = {
                    where: {
                      [sequelize.Op.and]: [
                        sequelize.where(sequelize.col('service_end'), '>=', sequelize.literal('current_date')),
                        { purchaseId: resourceAuthorization.purchaseId, goodsId: resource.id, goodsType: 'api' }
                      ]
                    }
                  }
                  const purchaseDetail = await app.models.purchaseDetail.findOne(pdQuery)
                  if (!purchaseDetail) {
                    await app.utils.errors.handle(app, { statusCode: 401, errorCode: 10002 })
                  }
                }
              }
            }
          } else {
            if (resource.publisherId !== params.user.username) {
              if (resource.ownerId !== params.user.organization[0]) {
                await app.utils.errors.handle(app, { statusCode: 401, errorCode: 10002 })
              }
            }
          }
        }
      }
      const axios = require('axios')
      return (await axios.request({
        // auth
        url: resource.endpointUrl,
        method: resource.method || 'GET',
        data: data.data,
        params: data.params
      })).data
    }
  }
}

/**
 * getDataserviceList api
 */
module.exports.getDataserviceList = (app) => {
  return {
    docs: {
      find: {
        summary: app.utils.docs.translate.default('Get Dataservice List'),
        description: app.utils.docs.translate.default('Get Dataservice List'),
        parameters: [
          {
            description: app.utils.docs.translate.property('catalogId'),
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
            description: app.utils.docs.translate.property('offset'),
            in: 'query',
            name: 'offset',
            type: 'integer',
            default: 0,
            required: false
          },
          {
            description: app.utils.docs.translate.property('limit'),
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
            where: { type: 'api', title: { [Op.like]: '%' + keyword + '%' } }
          }
          const { count, rows } = await app.models.resource.findAndCountAll(query)
          return {
            total: count,
            dataservices: rows
          }
        } else {
          const query = {
            attributes: ['id', 'title', 'imagePath', 'description', 'issued'],
            limit: limit || 10,
            offset: offset || 0,
            order: ['issued'],
            where: { type: 'api', title: { [Op.like]: '%' + keyword + '%' }, [app.models.sequelize.Op.or]: [ { isPublic: true }, { ownerId: params.user.organization[0] }, { publisherId: params.user.username } ] }
          }
          if (params.user.organization[0] === 'default_org') {
            query.where = { type: 'api', title: { [Op.like]: '%' + keyword + '%' }, [app.models.sequelize.Op.or]: [ { isPublic: true }, { publisherId: params.user.username } ] }
          }
          const { count, rows } = await app.models.resource.findAndCountAll(query)
          return {
            total: count,
            dataservices: rows
          }
        }
      } else {
        if (params.user.roles.includes('platform_admin')) {
          const values = { catalogId, limit: limit || 10, offset: offset || 0, keyword: '%' + keyword + '%' }
          const selectQuery = `select distinct resource.id, resource.title, resource.image_path as "imagePath", resource.description, resource.issued FROM resource_category_map INNER JOIN resource ON resource_category_map.resource_id = resource.id AND resource.type = 'api' AND resource.title like :keyword WHERE catalog_id = :catalogId ORDER BY resource.issued limit :limit offset :offset`
          const countQuery = `select count(distinct resource.id) as total FROM resource_category_map INNER JOIN resource ON resource_category_map.resource_id = resource.id AND resource.type = 'api' AND resource.title like :keyword WHERE catalog_id = :catalogId `
          const dataservices = await app.models.sequelize.query(selectQuery, {replacements: values, type: app.models.sequelize.QueryTypes.SELECT})
          const total = await app.models.sequelize.query(countQuery, {replacements: values, type: app.models.sequelize.QueryTypes.SELECT})
          return { total: total[0].total, dataservices }
        } else {
          if (params.user.organization[0] === 'default_org') {
            const values = { catalogId, limit: limit || 10, offset: offset || 0, username: params.user.username, keyword: '%' + keyword + '%' }
            const selectQuery = `select distinct resource.id, resource.title, resource.image_path as "imagePath", resource.description, resource.issued FROM resource_category_map INNER JOIN resource ON resource_category_map.resource_id = resource.id AND resource.type = 'api' AND resource.title like :keyword AND (resource.is_public = true OR resource.publisher_id = :username) WHERE catalog_id = :catalogId ORDER BY resource.issued limit :limit offset :offset`
            const countQuery = `select count(distinct resource.id) as total FROM resource_category_map INNER JOIN resource ON resource_category_map.resource_id = resource.id AND resource.type = 'api' AND resource.title like :keyword AND (resource.is_public = true OR resource.publisher_id = :username) WHERE catalog_id = :catalogId `
            const dataservices = await app.models.sequelize.query(selectQuery, {replacements: values, type: app.models.sequelize.QueryTypes.SELECT})
            const total = await app.models.sequelize.query(countQuery, {replacements: values, type: app.models.sequelize.QueryTypes.SELECT})
            return { total: total[0].total, dataservices }
          } else {
            const values = { catalogId, limit: limit || 10, offset: offset || 0, username: params.user.username, orgId: params.user.organization[0], keyword: '%' + keyword + '%' }
            const selectQuery = `select distinct resource.id, resource.title, resource.image_path as "imagePath", resource.description, resource.issued FROM resource_category_map INNER JOIN resource ON resource_category_map.resource_id = resource.id AND resource.type = 'api' AND resource.title like :keyword AND (resource.is_public = true OR resource.publisher_id = :username OR resource.owner_id = :orgId) WHERE catalog_id = :catalogId ORDER BY resource.issued limit :limit offset :offset`
            const countQuery = `select count(distinct resource.id) as total FROM resource_category_map INNER JOIN resource ON resource_category_map.resource_id = resource.id AND resource.type = 'api' AND resource.title like :keyword AND (resource.is_public = true OR resource.publisher_id = :username OR resource.owner_id = :orgId) WHERE catalog_id = :catalogId `
            const dataservices = await app.models.sequelize.query(selectQuery, {replacements: values, type: app.models.sequelize.QueryTypes.SELECT})
            const total = await app.models.sequelize.query(countQuery, {replacements: values, type: app.models.sequelize.QueryTypes.SELECT})
            return { total: total[0].total, dataservices }
          }
        }
      }
    }
  }
}

/**
 * updateDataservice api
 */
module.exports.updateDataservice = (app) => {
  return {
    docs: {
      create: {
        summary: app.utils.docs.translate.default('Update Dataservice'),
        description: app.utils.docs.translate.default('Update Dataservice'),
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
      const found = await app.models.resource.findOne({ where: { id, type: 'api' } })
      if (!found) {
        await app.utils.errors.handle(app, { statusCode: 404, errorCode: 20003 })
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
