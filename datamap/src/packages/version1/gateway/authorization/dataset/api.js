/**
 *  Copyright (c) Electronics and Telecommunications Research Institute. All rights reserved.
 *  See License.txt in the project root for license information.
 */

/**
 * saveDatasetAuthorization api
 */
module.exports.saveDatasetAuthorization = (app) => {
  return {
    docs: {
      create: {
        summary: app.utils.docs.translate.default('Save Dataset Authorization'),
        description: app.utils.docs.translate.default('Save Dataset Authorization'),
        parameters: [
          {
            description: app.utils.docs.translate.property('Dataset Authorization'),
            in: 'body',
            name: 'body',
            required: true,
            schema: {
              type: 'object',
              properties: {
                tenantId: {
                  description: app.utils.docs.translate.property('Tenant Id'),
                  type: 'string',
                  required: true
                },
                datasetId: {
                  description: app.utils.docs.translate.property('Dataset Id'),
                  type: 'string',
                  required: true
                },
                purchaseId: {
                  description: app.utils.docs.translate.property('Purchase Id'),
                  type: 'string',
                  required: false
                },
                right: {
                  description: app.utils.docs.translate.property('Right (allow/block)'),
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
      const query = { where: { id: data.datasetId, type: 'dataset' } }
      // if (!params.user.roles.includes('platform_admin')) {
      //   query.where.issuer = params.user.username
      // }
      const foundDataset = await app.models.resource.findOne(query)
      if (!foundDataset) {
        await app.utils.errors.handle(app, { statusCode: 404, errorCode: 20002 })
      }
      const foundUser = await app.models.tenant.findOne({ where: { id: data.tenantId } })
      if (!foundUser) {
        await app.utils.errors.handle(app, { statusCode: 404, errorCode: 10013 })
      }
      if (data.purchaseId) {
        const foundPurchase = await app.models.purchase.findOne({ where: { purchaseId: data.purchaseId } })
        if (!foundPurchase) {
          await app.utils.errors.handle(app, { statusCode: 404, errorCode: 20010 })
        }
      }
      const foundAuthorization = await app.models.datasetAcl.findOne({ where: { tenantId: data.tenantId, goodsId: data.datasetId, goodsType: 'dataset' } })
      if (foundAuthorization) {
        await app.utils.errors.handle(app, { statusCode: 400, errorCode: 10020 })
      }
      app.models.distribution.hasMany(app.models.datasetAcl, { foreignKey: 'goodsId' })
      app.models.datasetAcl.belongsTo(app.models.distribution, { foreignKey: 'goodsId' })
      const distributions = await app.models.distribution.findAll({
        where: { resourceId: data.datasetId },
        include: [{ required: false, model: app.models.datasetAcl, where: { tenantId: data.tenantId, goodsType: 'distribution' } }]
      })
      for (const distributionRow of distributions) {
        const distribution = distributionRow.dataValues
        if (!distribution.datasetAcls || distribution.datasetAcls.length === 0) {
          if (distribution.dataType === 'file') {
            const right = data.right === 'block' ? '---' : 'r-x'
            const acl = `user:${data.tenantId}:${right}`
            const path = `/sodas/${distribution.id}.${distribution.format || 'raw'}`
            await app.v1.service('gateway/authorization/file/update').create({ path, acl }, params)
          }
        }
      }
      await app.models.datasetAcl.create({
        tenantId: data.tenantId,
        goodsId: data.datasetId,
        goodsType: 'dataset',
        purchaseId: data.purchaseId,
        exceptionType: data.right === 'block' ? 'block' : 'allow',
        issuerId: params.user.username,
        issued: new Date()
      })
      return { result: 'success' }
    }
  }
}

/**
 * updateDatasetAuthorization api
 */
module.exports.updateDatasetAuthorization = (app) => {
  return {
    docs: {
      create: {
        summary: app.utils.docs.translate.default('Update Dataset Authorization'),
        description: app.utils.docs.translate.default('Update Dataset Authorization'),
        parameters: [
          {
            description: app.utils.docs.translate.property('Dataset Authorization'),
            in: 'body',
            name: 'body',
            required: true,
            schema: {
              type: 'object',
              properties: {
                tenantId: {
                  description: app.utils.docs.translate.property('Tenant Id'),
                  type: 'string',
                  required: true
                },
                datasetId: {
                  description: app.utils.docs.translate.property('Dataset Id'),
                  type: 'string',
                  required: true
                },
                purchaseId: {
                  description: app.utils.docs.translate.property('Purchase Id'),
                  type: 'string',
                  required: false
                },
                right: {
                  description: app.utils.docs.translate.property('Right (allow/block)'),
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
      const { tenantId, datasetId } = data
      const query = { where: { tenantId, goodsId: datasetId, goodsType: 'dataset' } }
      // if (!params.user.roles.includes('platform_admin')) {
      //   query.where.issuer = params.user.username
      // }
      const found = await app.models.datasetAcl.findOne(query)
      if (!found) {
        await app.utils.errors.handle(app, { statusCode: 404, errorCode: 10011 })
      }
      const queryDataset = { where: { id: found.goodsId, type: 'dataset' } }
      // if (!params.user.roles.includes('platform_admin')) {
      //   queryDataset.where.issuer = params.user.username
      // }
      const foundDataset = await app.models.resource.findOne(queryDataset)
      if (!foundDataset) {
        await app.utils.errors.handle(app, { statusCode: 404, errorCode: 20002 })
      }
      if (data.purchaseId) {
        const foundPurchase = await app.models.purchase.findOne({ where: { purchaseId: data.purchaseId } })
        if (!foundPurchase) {
          await app.utils.errors.handle(app, { statusCode: 404, errorCode: 10013 })
        }
      }
      if (data.right) {
        app.models.distribution.hasMany(app.models.datasetAcl, { foreignKey: 'goodsId' })
        app.models.datasetAcl.belongsTo(app.models.distribution, { foreignKey: 'goodsId' })
        const distributions = await app.models.distribution.findAll({
          where: { resourceId: data.datasetId },
          include: [{ required: false, model: app.models.datasetAcl, where: { tenantId: data.tenantId, goodsType: 'distribution' } }]
        })
        for (const distributionRow of distributions) {
          const distribution = distributionRow.dataValues
          if (!distribution.datasetAcls || distribution.datasetAcls.length === 0) {
            if (distribution.dataType === 'file') {
              const right = data.right === 'block' ? '---' : 'r-x'
              const acl = `user:${data.tenantId}:${right}`
              const path = `/sodas/${distribution.id}.${distribution.format || 'raw'}`
              await app.v1.service('gateway/authorization/file/update').create({ path, acl }, params)
            }
          }
        }
      }
      await app.models.datasetAcl.update({
        purchaseId: data.purchaseId,
        exceptionType: data.right,
        modifierId: params.user.username,
        modified: new Date()
      }, {
        where: { tenantId, goodsId: datasetId, goodsType: 'dataset' },
        returning: true
      })
      return { result: 'success' }
    }
  }
}

/**
 * removeDatasetAuthorization api
 */
module.exports.removeDatasetAuthorization = (app) => {
  return {
    docs: {
      create: {
        summary: app.utils.docs.translate.default('Remove Dataset Authorization'),
        description: app.utils.docs.translate.default('Remove Dataset Authorization'),
        parameters: [
          {
            description: app.utils.docs.translate.property('Dataset Authorization'),
            in: 'body',
            name: 'body',
            required: true,
            schema: {
              type: 'object',
              properties: {
                tenantId: {
                  description: app.utils.docs.translate.property('Tenant Id'),
                  type: 'string',
                  required: true
                },
                datasetId: {
                  description: app.utils.docs.translate.property('Dataset Id'),
                  type: 'string',
                  required: true
                },
                purchaseId: {
                  description: app.utils.docs.translate.property('Purchase Id'),
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
      const { tenantId, datasetId, purchaseId } = data
      const query = { where: { tenantId, goodsId: datasetId, goodsType: 'dataset' } }
      if (purchaseId) {
        query.where.purchaseId = purchaseId
      }
      // if (!params.user.roles.includes('platform_admin')) {
      //   query.where.issuer = params.user.username
      // }
      const found = await app.models.datasetAcl.findOne(query)
      if (!found) {
        await app.utils.errors.handle(app, { statusCode: 404, errorCode: 10011 })
      }
      const queryDataset = { where: { id: found.goodsId, type: 'dataset' } }
      // if (!params.user.roles.includes('platform_admin')) {
      //   queryDataset.where.issuer = params.user.username
      // }
      const foundDataset = await app.models.resource.findOne(queryDataset)
      if (!foundDataset) {
        await app.utils.errors.handle(app, { statusCode: 404, errorCode: 20002 })
      }
      app.models.distribution.hasMany(app.models.datasetAcl, { foreignKey: 'goodsId' })
      app.models.datasetAcl.belongsTo(app.models.distribution, { foreignKey: 'goodsId' })
      const distributions = await app.models.distribution.findAll({
        where: { resourceId: data.datasetId },
        include: [{ required: false, model: app.models.datasetAcl, where: { tenantId: data.tenantId, goodsType: 'distribution' } }]
      })
      for (const distributionRow of distributions) {
        const distribution = distributionRow.dataValues
        if (!distribution.datasetAcls || distribution.datasetAcls.length === 0) {
          if (distribution.dataType === 'file') {
            const right = found.right === 'block' ? '---' : 'r-x'
            const acl = `user:${found.tenantId}:${right}`
            const path = `/sodas/${distribution.id}.${distribution.format || 'raw'}`
            await app.v1.service('gateway/authorization/file/remove').create({ path, acl }, params)
          }
        }
      }
      // TODO: gateway
      await app.models.datasetAcl.destroy(query)
      return { result: 'success' }
    }
  }
}

/**
 * getDatasetAuthorization api
 */
module.exports.getDatasetAuthorization = (app) => {
  return {
    docs: {
      find: {
        summary: app.utils.docs.translate.default('Get Dataset Authorization'),
        description: app.utils.docs.translate.default('Get Dataset Authorization'),
        parameters: [
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
          },
          {
            description: app.utils.docs.translate.property('Dataset Id'),
            in: 'query',
            name: 'datasetId',
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
      const { offset, limit, datasetId } = params.query
      const query = { limit: limit || 10, offset: offset || 0, where: { goodsId: datasetId, goodsType: 'dataset' } }
      // if (!params.user.roles.includes('platform_admin')) {
      //   query.where.issuer = params.user.username
      // }
      const { count, rows } = await app.models.datasetAcl.findAndCountAll(query)
      return {
        total: count,
        acls: rows
      }
    }
  }
}
