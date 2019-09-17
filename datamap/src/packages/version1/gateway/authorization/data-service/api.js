/**
 *  Copyright (c) Electronics and Telecommunications Research Institute. All rights reserved.
 *  See License.txt in the project root for license information.
 */

/**
 * saveDataserviceAuthorization api
 */
module.exports.saveDataserviceAuthorization = (app) => {
  return {
    docs: {
      create: {
        summary: app.utils.docs.translate.default('Save Dataservice Authorization'),
        description: app.utils.docs.translate.default('Save Dataservice Authorization'),
        parameters: [
          {
            description: app.utils.docs.translate.property('Dataservice Authorization'),
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
                dataserviceId: {
                  description: app.utils.docs.translate.property('Dataservice Id'),
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
      const query = { where: { id: data.dataserviceId, type: 'api' } }
      // if (!params.user.roles.includes('platform_admin')) {
      //   query.where.issuer = params.user.username
      // }
      const foundDataservice = await app.models.resource.findOne(query)
      if (!foundDataservice) {
        await app.utils.errors.handle(app, { statusCode: 404, errorCode: 20003 })
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
      const foundAuthorization = await app.models.datasetAcl.findOne({ where: { tenantId: data.tenantId, goodsId: data.dataserviceId, goodsType: 'dataservice' } })
      if (foundAuthorization) {
        await app.utils.errors.handle(app, { statusCode: 400, errorCode: 10020 })
      }
      // TODO: gateway
      await app.models.datasetAcl.create({
        tenantId: data.tenantId,
        goodsId: data.dataserviceId,
        goodsType: 'api',
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
 * updateDataserviceAuthorization api
 */
module.exports.updateDataserviceAuthorization = (app) => {
  return {
    docs: {
      create: {
        summary: app.utils.docs.translate.default('Update Dataservice Authorization'),
        description: app.utils.docs.translate.default('Update Dataservice Authorization'),
        parameters: [
          {
            description: app.utils.docs.translate.property('Dataservice Authorization'),
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
                dataserviceId: {
                  description: app.utils.docs.translate.property('Dataservice Id'),
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
      const { tenantId, dataserviceId } = data
      const query = { where: { tenantId, goodsId: dataserviceId, goodsType: 'api' } }
      // if (!params.user.roles.includes('platform_admin')) {
      //   query.where.issuer = params.user.username
      // }
      const found = await app.models.datasetAcl.findOne(query)
      if (!found) {
        await app.utils.errors.handle(app, { statusCode: 404, errorCode: 10011 })
      }
      const queryDataservice = { where: { id: found.goodsId, type: 'api' } }
      // if (!params.user.roles.includes('platform_admin')) {
      //   queryDataset.where.issuer = params.user.username
      // }
      const foundDataservice = await app.models.resource.findOne(queryDataservice)
      if (!foundDataservice) {
        await app.utils.errors.handle(app, { statusCode: 404, errorCode: 20003 })
      }
      if (data.purchaseId) {
        const foundPurchase = await app.models.purchase.findOne({ where: { purchaseId: data.purchaseId } })
        if (!foundPurchase) {
          await app.utils.errors.handle(app, { statusCode: 404, errorCode: 10013 })
        }
      }
      // TODO: gateway
      await app.models.datasetAcl.update({
        purchaseId: data.purchaseId,
        exceptionType: data.right,
        modifierId: params.user.username,
        modified: new Date()
      }, {
        where: { tenantId, goodsId: dataserviceId, goodsType: 'api' },
        returning: true
      })
      return { result: 'success' }
    }
  }
}

/**
 * removeDataserviceAuthorization api
 */
module.exports.removeDataserviceAuthorization = (app) => {
  return {
    docs: {
      create: {
        summary: app.utils.docs.translate.default('Remove Dataservice Authorization'),
        description: app.utils.docs.translate.default('Remove Dataservice Authorization'),
        parameters: [
          {
            description: app.utils.docs.translate.property('Dataservice Authorization'),
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
                dataserviceId: {
                  description: app.utils.docs.translate.property('Dataservice Id'),
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
      const { tenantId, dataserviceId, purchaseId } = data
      const query = { where: { tenantId, goodsId: dataserviceId, goodsType: 'api' } }
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
      const queryDataservice = { where: { id: found.goodsId, type: 'api' } }
      // if (!params.user.roles.includes('platform_admin')) {
      //   queryDataset.where.issuer = params.user.username
      // }
      const foundDataservice = await app.models.resource.findOne(queryDataservice)
      if (!foundDataservice) {
        await app.utils.errors.handle(app, { statusCode: 404, errorCode: 20003 })
      }
      // TODO: gateway
      await app.models.datasetAcl.destroy(query)
      return { result: 'success' }
    }
  }
}

/**
 * getDataserviceAuthorization api
 */
module.exports.getDataserviceAuthorization = (app) => {
  return {
    docs: {
      find: {
        summary: app.utils.docs.translate.default('Get Dataservice Authorization'),
        description: app.utils.docs.translate.default('Get Dataservice Authorization'),
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
            description: app.utils.docs.translate.property('Dataservice Id'),
            in: 'query',
            name: 'dataserviceId',
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
      const { offset, limit, dataserviceId } = params.query
      const query = { limit: limit || 10, offset: offset || 0, where: { goodsId: dataserviceId, goodsType: 'api' } }
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
