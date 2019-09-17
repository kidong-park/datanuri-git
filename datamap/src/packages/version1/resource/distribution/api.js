/**
 *  Copyright (c) Electronics and Telecommunications Research Institute. All rights reserved.
 *  See License.txt in the project root for license information.
 */

const uuidv1 = require('uuid/v1')
const dateFormat = require('dateformat')

/**
 * getDistributionList api
 */
module.exports.getDistributionList = (app) => {
  return {
    docs: {
      find: {
        summary: app.utils.docs.translate.default('Get Distribution List'),
        description: app.utils.docs.translate.default('Get Distribution List'),
        parameters: [
          {
            description: app.utils.docs.translate.property('DatasetId'),
            in: 'query',
            name: 'datasetId',
            type: 'string',
            required: true
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
      const { datasetId, offset, limit } = params.query
      const queryDataset = { where: { id: datasetId, type: 'dataset' } }
      const foundDataset = await app.models.resource.findOne(queryDataset)
      if (!foundDataset) {
        await app.utils.errors.handle(app, { statusCode: 404, errorCode: 20002 })
      }
      if (!foundDataset.isPublic) {
        if (!params.user.roles.includes('platform_admin')) {
          if (foundDataset.ownerId !== 'default_org') {
            if (!params.user.roles.includes('org_admin')) {
              if (foundDataset.publisherId !== params.user.username) {
                await app.utils.errors.handle(app, { statusCode: 401, errorCode: 10002 })
              }
            } else {
              if (foundDataset.ownerId !== params.user.organization[0]) {
                await app.utils.errors.handle(app, { statusCode: 401, errorCode: 10002 })
              }
            }
          } else {
            if (foundDataset.publisherId !== params.user.username) {
              await app.utils.errors.handle(app, { statusCode: 401, errorCode: 10002 })
            }
          }
        }
      }
      const query = {
        attributes: ['id', 'title', 'description', 'issued'],
        limit: limit || 10,
        offset: offset || 0,
        order: ['issued'],
        where: { resourceId: datasetId }
      }
      const { count, rows } = await app.models.distribution.findAndCountAll(query)
      return {
        total: count,
        distributions: rows
      }
    }
  }
}

/**
 * getDistribution api
 */
module.exports.getDistribution = (app) => {
  return {
    docs: {
      find: {
        summary: app.utils.docs.translate.default('Get Distribution'),
        description: app.utils.docs.translate.default('Get Distribution'),
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
      // TODO: check right + filter columns
      const result = await app.models.distribution.findOne({ attributes: { exclude: ['downloadUrl'] }, where: { id } })
      if (!result) {
        await app.utils.errors.handle(app, { statusCode: 404, errorCode: 20004 })
      }
      const queryDataset = { where: { id: result.resourceId, type: 'dataset' } }
      const foundDataset = await app.models.resource.findOne(queryDataset)
      if (!foundDataset) {
        await app.utils.errors.handle(app, { statusCode: 404, errorCode: 20002 })
      }
      if (!foundDataset.isPublic) {
        if (!params.user.roles.includes('platform_admin')) {
          if (foundDataset.ownerId !== 'default_org') {
            if (foundDataset.ownerId !== params.user.organization[0]) {
              await app.utils.errors.handle(app, { statusCode: 401, errorCode: 10002 })
            }
          } else {
            if (foundDataset.publisherId !== params.user.username) {
              await app.utils.errors.handle(app, { statusCode: 401, errorCode: 10002 })
            }
          }
        }
      }
      const userPrice = await app.models.priceCondition.findOne({ attributes: [['price', 'userPrice']], where: { goodsId: id, tenantType: 'user', resourceType: 'distribution' } })
      return { ...result.dataValues, ...userPrice.dataValues }
    }
  }
}

/**
 * getDistributionContent api
 */
module.exports.getDistributionContent = (app) => {
  return {
    docs: {
      find: {
        summary: app.utils.docs.translate.default('Get Distribution'),
        description: app.utils.docs.translate.default('Get Distribution'),
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
      const found = await app.models.distribution.findOne({ where: { id } })
      if (!found) {
        await app.utils.errors.handle(app, { statusCode: 404, errorCode: 20004 })
      }
      const queryDataset = { where: { id: found.resourceId, type: 'dataset' } }
      const foundDataset = await app.models.resource.findOne(queryDataset)
      if (!foundDataset) {
        await app.utils.errors.handle(app, { statusCode: 404, errorCode: 20002 })
      }
      if (!params.user.roles.includes('platform_admin')) {
        const sequelize = app.models.sequelize
        const foundDatasetAuthorization = await app.models.datasetAcl.findOne({ where: { tenantId: params.user.username, goodsId: found.resourceId, goodsType: 'dataset' } })
        const foundDistributionAuthorization = await app.models.datasetAcl.findOne({ where: { tenantId: params.user.username, goodsId: id, goodsType: 'distribution' } })
        if (foundDistributionAuthorization && foundDistributionAuthorization.exceptionType === 'block') {
          await app.utils.errors.handle(app, { statusCode: 401, errorCode: 10002 })
        } else if (!foundDistributionAuthorization && foundDatasetAuthorization && foundDatasetAuthorization.exceptionType === 'block') {
          await app.utils.errors.handle(app, { statusCode: 401, errorCode: 10002 })
        }
        if (foundDataset.ownerId === 'default_org') {
          if (foundDataset.isPublic) {
            if (!foundDataset.isFree) {
              if (foundDataset.publisherId !== params.user.username) {
                if (!foundDatasetAuthorization && !foundDistributionAuthorization) {
                  await app.utils.errors.handle(app, { statusCode: 401, errorCode: 10002 })
                } else if (foundDistributionAuthorization && foundDistributionAuthorization.purchaseId) {
                  const pdQuery = {
                    where: {
                      [sequelize.Op.and]: [
                        sequelize.where(sequelize.col('service_end'), '>=', sequelize.literal('current_date')),
                        { purchaseId: foundDistributionAuthorization.purchaseId, goodsId: id, goodsType: 'distribution' }
                      ]
                    }
                  }
                  const purchaseDetail = await app.models.purchaseDetail.findOne(pdQuery)
                  if (!purchaseDetail) {
                    await app.utils.errors.handle(app, { statusCode: 401, errorCode: 10002 })
                  }
                } else if (foundDatasetAuthorization && foundDatasetAuthorization.purchaseId) {
                  const pdQuery = {
                    where: {
                      [sequelize.Op.and]: [
                        sequelize.where(sequelize.col('service_end'), '>=', sequelize.literal('current_date')),
                        { purchaseId: foundDatasetAuthorization.purchaseId, goodsId: found.resourceId, goodsType: 'dataset' }
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
            if (foundDataset.publisherId !== params.user.username) {
              await app.utils.errors.handle(app, { statusCode: 401, errorCode: 10002 })
            }
          }
        } else {
          if (foundDataset.isPublic) {
            if (!foundDataset.isFree) {
              if (foundDataset.publisherId !== params.user.username) {
                if (foundDataset.ownerId !== params.user.organization[0]) {
                  if (!foundDatasetAuthorization && !foundDistributionAuthorization) {
                    await app.utils.errors.handle(app, { statusCode: 401, errorCode: 10002 })
                  } else if (foundDistributionAuthorization && foundDistributionAuthorization.purchaseId) {
                    const pdQuery = {
                      where: {
                        [sequelize.Op.and]: [
                          sequelize.where(sequelize.col('service_end'), '>=', sequelize.literal('current_date')),
                          { purchaseId: foundDistributionAuthorization.purchaseId, goodsId: id, goodsType: 'distribution' }
                        ]
                      }
                    }
                    const purchaseDetail = await app.models.purchaseDetail.findOne(pdQuery)
                    if (!purchaseDetail) {
                      await app.utils.errors.handle(app, { statusCode: 401, errorCode: 10002 })
                    }
                  } else if (foundDatasetAuthorization && foundDatasetAuthorization.purchaseId) {
                    const pdQuery = {
                      where: {
                        [sequelize.Op.and]: [
                          sequelize.where(sequelize.col('service_end'), '>=', sequelize.literal('current_date')),
                          { purchaseId: foundDatasetAuthorization.purchaseId, goodsId: found.resourceId, goodsType: 'dataset' }
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
            }
          } else {
            if (foundDataset.publisherId !== params.user.username) {
              if (foundDataset.ownerId !== params.user.organization[0]) {
                await app.utils.errors.handle(app, { statusCode: 401, errorCode: 10002 })
              }
            }
          }
        }
      }
      if (found.dataType === 'file') {
        // TODO: hdfs path
        params.query.path = `/sodas/${id}.${found.format || 'raw'}`
        delete params.query.id
        params.query.filename = found.fileName
        return app.v1.service('resource/file/content/get').find(params)
      } else {
        const request = require('request')
        const stream = request(found.accessUrl)
        return { filename: found.fileName, stream }
      }
    }
  }
}

/**
 * saveDistribution api
 */
module.exports.saveDistribution = (app) => {
  return {
    docs: {
      create: {
        summary: app.utils.docs.translate.default('Save Distribution'),
        description: app.utils.docs.translate.default('Save Distribution'),
        parameters: [
          {
            description: app.utils.docs.translate.property('DatasetId'),
            in: 'formData',
            name: 'datasetId',
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
            description: app.utils.docs.translate.property('Description'),
            in: 'formData',
            name: 'description',
            type: 'string'
          },
          {
            description: app.utils.docs.translate.property('Format'),
            in: 'formData',
            name: 'format',
            type: 'string'
          },
          {
            description: app.utils.docs.translate.property('Size'),
            in: 'formData',
            name: 'size',
            type: 'string'
          },
          {
            description: app.utils.docs.translate.property('MediaType'),
            in: 'formData',
            name: 'mediaType',
            type: 'string'
          },
          {
            description: app.utils.docs.translate.property('Rights'),
            in: 'formData',
            name: 'rights',
            type: 'string'
          },
          {
            description: app.utils.docs.translate.property('License'),
            in: 'formData',
            name: 'license',
            type: 'string'
          },
          {
            description: app.utils.docs.translate.property('Spatial Resolution In Meters'),
            in: 'formData',
            name: 'spatialResolutionInMeters',
            type: 'string'
          },
          {
            description: app.utils.docs.translate.property('Temporal Resolution'),
            in: 'formData',
            name: 'temporalResolution',
            type: 'string'
          },
          {
            description: app.utils.docs.translate.property('Conforms To'),
            in: 'formData',
            name: 'conformsTo',
            type: 'string'
          },
          {
            description: app.utils.docs.translate.property('Landing Page'),
            in: 'formData',
            name: 'landingPage',
            type: 'string'
          },
          {
            description: app.utils.docs.translate.property('DataType (file or link)'),
            in: 'formData',
            name: 'dataType',
            type: 'string',
            default: 'file'
          },
          {
            description: app.utils.docs.translate.property('Url'),
            in: 'formData',
            name: 'url',
            type: 'string'
          },
          {
            description: app.utils.docs.translate.property('UserPrice'),
            in: 'formData',
            name: 'userPrice',
            type: 'number'
          },
          {
            description: app.utils.docs.translate.property('Extra'),
            in: 'formData',
            name: 'extra',
            type: 'string'
          },
          {
            description: app.utils.docs.translate.property('File'),
            in: 'formData',
            name: 'file',
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
      const foundDataset = await app.models.resource.findOne({ where: { id: data.datasetId, type: 'dataset' } })
      if (!foundDataset) {
        await app.utils.errors.handle(app, { statusCode: 404, errorCode: 20002 })
      }
      if (!params.user.roles.includes('platform_admin')) {
        if (!params.user.roles.includes('org_admin')) {
          if (foundDataset.publisherId !== params.user.username) {
            await app.utils.errors.handle(app, { statusCode: 401, errorCode: 10002 })
          }
        } else {
          if (foundDataset.ownerId !== params.user.organization[0]) {
            await app.utils.errors.handle(app, { statusCode: 401, errorCode: 10002 })
          }
        }
      }
      const uuid = uuidv1()
      if (data.dataType === 'file') {
        const path = `/sodas/${uuid}.${data.format || 'raw'}`
        // TODO: dataset.isFree or dataset.isPublic or data.priceType
        const permission = !foundDataset.isFree ? '750' : '755'
        const owner = params.user.username
        const groupOwner = foundDataset.isPersonal || params.user.organization[0] === 'default_org' ? params.user.username : params.user.organization[0]
        await app.v1.service('resource/file/save').create({ path, permission, owner, groupOwner }, params)
        const datasetAcls = await app.models.datasetAcl.findAll({ where: { goodsId: data.datasetId, goodsType: 'dataset' } })
        for (const datasetAclRow of datasetAcls) {
          const datasetAcl = datasetAclRow.dataValues
          if (datasetAcl) {
            const right = datasetAcl.right === 'block' ? '---' : 'r-x'
            const acl = `user:${datasetAcl.tenantId}:${right}`
            params.user.roles = ['platform_admin']
            await app.v1.service('gateway/authorization/file/update').create({ path, acl }, params)
          }
        }
      }
      await app.models.distribution.create({
        id: uuid,
        resourceId: data.datasetId,
        title: data.title,
        format: data.format,
        byteSize: data.size,
        mediatype: data.mediaType,
        rights: data.rights,
        license: data.license,
        spatialResolutionInMeters: data.spatialResolutionInMeters,
        temporalResolution: data.temporalResolution,
        conformsTo: data.conformsTo,
        landingPage: data.landingPage,
        landingPageUrl: `http://${params.headers.host}/schema/${uuid}`,
        // TODO: download path
        accessUrl: `/api/v1/resource/dataset/distribution/get?id=${uuid}`,
        downloadUrl: `/api/v1/resource/dataset/distribution/content/get?id=${uuid}`,
        issued: Date.now(),
        extras: data.extras && JSON.parse(data.extras),
        endpointName: '',
        schemaType: '',
        storageType: data.dataType === 'file' ? 'HDFS' : 'WEB',
        fileName: data.dataType === 'file' ? params.files[0].originalname : require('path').basename(data.url),
        dataType: data.dataType,
        description: data.description
      })
      await app.models.priceCondition.create({
        goodsId: uuid,
        tenantType: 'user',
        servicePeriod: 0,
        periodUnit: 0,
        serviceCount: -1,
        validStart: Date.now(),
        validEnd: dateFormat('9999-12-31 23:59:59', 'yyyy-mm-dd HH:MM:ss'),
        price: foundDataset.isFree ? 0 : data.userPrice || 0,
        productCategory: 'resource',
        resourceType: 'distribution',
        issuerId: params.user.username,
        issued: Date.now()
      })
      params.user.roles = ['platform_admin']
      await app.v1.service('gateway/monitor/activity/save').create({ tenantId: params.user.username, resourceId: data.datasetId, actionType: 'SAVE_DISTRIBUTION', actionDetail: JSON.stringify(data) }, params)
      return { id: uuid }
    }
  }
}

/**
 * updateDistribution api
 */
module.exports.updateDistribution = (app) => {
  return {
    docs: {
      create: {
        summary: app.utils.docs.translate.default('Update Distribution'),
        description: app.utils.docs.translate.default('Update Distribution'),
        parameters: [
          {
            description: app.utils.docs.translate.property('Distribution'),
            in: 'body',
            name: 'body',
            required: true,
            schema: {
              type: 'object',
              properties: {
                id: { type: 'string', description: app.utils.docs.translate.property('Id'), required: true },
                title: { type: 'string', description: app.utils.docs.translate.property('title') },
                // format: { type: 'string', description: app.utils.docs.translate.property('format') },
                size: { type: 'string', description: app.utils.docs.translate.property('size') },
                mediaType: { type: 'string', description: app.utils.docs.translate.property('mediaType') },
                rights: { type: 'string', description: app.utils.docs.translate.property('rights') },
                license: { type: 'string', description: app.utils.docs.translate.property('license') },
                spatialResolutionInMeters: { type: 'string', description: app.utils.docs.translate.property('spatialresolutioninmeters') },
                temporalResolution: { type: 'string', description: app.utils.docs.translate.property('temporalresolution') },
                conformsTo: { type: 'string', description: app.utils.docs.translate.property('conformsto') },
                landingPage: { type: 'string', description: app.utils.docs.translate.property('landingPage') },
                description: { type: 'string', description: app.utils.docs.translate.property('description') },
                extra: { type: 'array', description: app.utils.docs.translate.property('Extra'), required: false, items: {} }
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
      const query = { where: { id: data.id } }
      // if (!params.user.roles.includes('platform_admin')) {
      //   query.where.issuer = params.user.username
      // }
      const found = await app.models.distribution.findOne(query)
      if (!found) {
        await app.utils.errors.handle(app, { statusCode: 404, errorCode: 20004 })
      }
      const queryDataset = { where: { id: found.resourceId, type: 'dataset' } }
      const foundDataset = await app.models.resource.findOne(queryDataset)
      if (!foundDataset) {
        await app.utils.errors.handle(app, { statusCode: 404, errorCode: 20002 })
      }
      if (!params.user.roles.includes('platform_admin')) {
        if (!params.user.roles.includes('org_admin')) {
          if (foundDataset.publisherId !== params.user.username) {
            await app.utils.errors.handle(app, { statusCode: 401, errorCode: 10002 })
          }
        } else {
          if (foundDataset.ownerId !== params.user.organization[0]) {
            await app.utils.errors.handle(app, { statusCode: 401, errorCode: 10002 })
          }
        }
      }
      await app.models.distribution.update({
        ...found,
        ...data,
        issued: new Date()
      }, {
        where: { id: data.id },
        returning: true
      })
      params.user.roles = ['platform_admin']
      await app.v1.service('gateway/monitor/activity/save').create({ tenantId: params.user.username, resourceId: found.resourceId, actionType: 'UPDATE_DISTRIBUTION', actionDetail: JSON.stringify(data) }, params)
      return { result: 'success' }
    }
  }
}

/**
 * removeDistribution api
 */
module.exports.removeDistribution = (app) => {
  return {
    docs: {
      create: {
        summary: app.utils.docs.translate.default('Remove Distribution'),
        description: app.utils.docs.translate.default('Remove Distribution'),
        parameters: [
          {
            description: app.utils.docs.translate.property('Distribution'),
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
      const query = { where: { id: data.id } }
      const found = await app.models.distribution.findOne(query)
      if (!found) {
        await app.utils.errors.handle(app, { statusCode: 404, errorCode: 20004 })
      }
      const queryDataset = { where: { id: found.resourceId, type: 'dataset' } }
      const foundDataset = await app.models.resource.findOne(queryDataset)
      if (!foundDataset) {
        await app.utils.errors.handle(app, { statusCode: 404, errorCode: 20002 })
      }
      if (!params.user.roles.includes('platform_admin')) {
        if (!params.user.roles.includes('org_admin')) {
          if (foundDataset.publisherId !== params.user.username) {
            await app.utils.errors.handle(app, { statusCode: 401, errorCode: 10002 })
          }
        } else {
          if (foundDataset.ownerId !== params.user.organization[0]) {
            await app.utils.errors.handle(app, { statusCode: 401, errorCode: 10002 })
          }
        }
      }
      // TODO: hdfs path
      if (found.dataType === 'file') {
        const hdfsPath = `/sodas/${data.id}.${found.format || 'raw'}`
        try {
          await app.v1.service('resource/file/remove').create({ path: hdfsPath }, params)
        } catch (error) {
          // TODO: handle error
        }
      }
      params.user.roles = ['platform_admin']
      await app.v1.service('gateway/monitor/activity/save').create({ tenantId: params.user.username, resourceId: found.resourceId, actionType: 'DELETE_DISTRIBUTION', actionDetail: JSON.stringify(data) }, params)
      await app.models.distribution.destroy({ where: { id: data.id } })
      await app.models.priceCondition.destroy({ where: { goodsId: data.id, productCategory: 'distribution' } })
      // TODO: remove right
      // await app.models.datasetAuthorization.destroy({ where: { dataset: data.id } })
      return { result: 'success' }
    }
  }
}
