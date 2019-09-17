/**
 *  Copyright (c) Electronics and Telecommunications Research Institute. All rights reserved.
 *  See License.txt in the project root for license information.
 */

/**
 * saveDistributionAuthorization api
 */
module.exports.saveDistributionAuthorization = (app) => {
  return {
    docs: {
      create: {
        summary: app.utils.docs.translate.default('Save Distribution Authorization'),
        description: app.utils.docs.translate.default('Save Distribution Authorization'),
        parameters: [
          {
            description: app.utils.docs.translate.property('Distribution Authorization'),
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
                distributionId: {
                  description: app.utils.docs.translate.property('Distribution Id'),
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
      const query = { where: { id: data.distributionId } }
      // if (!params.user.roles.includes('platform_admin')) {
      //   query.where.issuer = params.user.username
      // }
      const foundDistribution = await app.models.distribution.findOne(query)
      if (!foundDistribution) {
        await app.utils.errors.handle(app, { statusCode: 404, errorCode: 20004 })
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
      const foundAuthorization = await app.models.datasetAcl.findOne({ where: { tenantId: data.tenantId, goodsId: data.distributionId, goodsType: 'distribution' } })
      if (foundAuthorization) {
        await app.utils.errors.handle(app, { statusCode: 400, errorCode: 10020 })
      }
      if (foundDistribution.dataType === 'file') {
        const right = data.right === 'block' ? '---' : 'r-x'
        const acl = `user:${data.tenantId}:${right}`
        const path = `/sodas/${foundDistribution.id}.${foundDistribution.format || 'raw'}`
        await app.v1.service('gateway/authorization/file/update').create({ path, acl }, params)
      }
      await app.models.datasetAcl.create({
        tenantId: data.tenantId,
        goodsId: data.distributionId,
        goodsType: 'distribution',
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
 * updateDistributionAuthorization api
 */
module.exports.updateDistributionAuthorization = (app) => {
  return {
    docs: {
      create: {
        summary: app.utils.docs.translate.default('Update Distribution Authorization'),
        description: app.utils.docs.translate.default('Update Distribution Authorization'),
        parameters: [
          {
            description: app.utils.docs.translate.property('Distribution Authorization'),
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
                distributionId: {
                  description: app.utils.docs.translate.property('Distribution Id'),
                  type: 'string',
                  required: true
                },
                purchaseId: {
                  description: app.utils.docs.translate.property('PurchaseId'),
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
      const { tenantId, distributionId } = data
      const query = { where: { tenantId, goodsId: distributionId, goodsType: 'distribution' } }
      // if (!params.user.roles.includes('platform_admin')) {
      //   query.where.issuer = params.user.username
      // }
      const found = await app.models.datasetAcl.findOne(query)
      if (!found) {
        await app.utils.errors.handle(app, { statusCode: 404, errorCode: 10011 })
      }
      const queryDistribution = { where: { id: found.goodsId } }
      // if (!params.user.roles.includes('platform_admin')) {
      //   queryDataset.where.issuer = params.user.username
      // }
      const foundDistribution = await app.models.distribution.findOne(queryDistribution)
      if (!foundDistribution) {
        await app.utils.errors.handle(app, { statusCode: 404, errorCode: 20004 })
      }
      if (data.purchaseId) {
        const foundPurchase = await app.models.purchase.findOne({ where: { purchaseId: data.purchaseId } })
        if (!foundPurchase) {
          await app.utils.errors.handle(app, { statusCode: 404, errorCode: 10013 })
        }
      }
      if (data.right) {
        if (foundDistribution.dataType === 'file') {
          const right = data.right === 'block' ? '---' : 'r-x'
          const acl = `user:${found.tenantId}:${right}`
          const path = `/sodas/${foundDistribution.id}.${foundDistribution.format || 'raw'}`
          await app.v1.service('gateway/authorization/file/update').create({ path, acl }, params)
        }
      }
      await app.models.datasetAcl.update({
        purchaseId: data.purchaseId,
        exceptionType: data.right,
        modifierId: params.user.username,
        modified: new Date()
      }, {
        where: { tenantId: data.tenantId, goodsId: data.distributionId, goodsType: 'distribution' },
        returning: true
      })
      return { result: 'success' }
    }
  }
}

/**
 * removeDistributionAuthorization api
 */
module.exports.removeDistributionAuthorization = (app) => {
  return {
    docs: {
      create: {
        summary: app.utils.docs.translate.default('Remove Distribution Authorization'),
        description: app.utils.docs.translate.default('Remove Distribution Authorization'),
        parameters: [
          {
            description: app.utils.docs.translate.property('Distribution Authorization'),
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
                distributionId: {
                  description: app.utils.docs.translate.property('Distribution Id'),
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
      const { tenantId, distributionId, purchaseId } = data
      const query = { where: { tenantId, goodsId: distributionId, goodsType: 'distribution' } }
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
      const queryDistribution = { where: { id: found.goodsId } }
      // if (!params.user.roles.includes('platform_admin')) {
      //   queryDataset.where.issuer = params.user.username
      // }
      const foundDistribution = await app.models.distribution.findOne(queryDistribution)
      if (!foundDistribution) {
        await app.utils.errors.handle(app, { statusCode: 404, errorCode: 20004 })
      }
      if (foundDistribution.dataType === 'file') {
        const right = found.right === 'block' ? '---' : 'r-x'
        const acl = `user:${found.tenantId}:${right}`
        const path = `/sodas/${foundDistribution.id}.${foundDistribution.format || 'raw'}`
        await app.v1.service('gateway/authorization/file/remove').create({ path, acl }, params)
      }
      await app.models.datasetAcl.destroy(query)
      return { result: 'success' }
    }
  }
}

/**
 * getDistributionAuthorization api
 */
module.exports.getDistributionAuthorization = (app) => {
  return {
    docs: {
      find: {
        summary: app.utils.docs.translate.default('Get Distribution Authorization'),
        description: app.utils.docs.translate.default('Get Distribution Authorization'),
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
            description: app.utils.docs.translate.property('Distribution Id'),
            in: 'query',
            name: 'distributionId',
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
      const { offset, limit, distributionId } = params.query
      const query = { limit: limit || 10, offset: offset || 0, where: { goodsId: distributionId, goodsType: 'distribution' } }
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
