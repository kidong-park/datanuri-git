/**
 *  Copyright (c) Electronics and Telecommunications Research Institute. All rights reserved.
 *  See License.txt in the project root for license information.
 */

const uuidv1 = require('uuid/v1')
const moment = require('moment')
/**
 * getPurchaseList api
 */
module.exports.getPurchaseList = (app) => {
  return {
    docs: {
      find: {
        summary: app.utils.docs.translate.default('Get Purchase List'),
        description: app.utils.docs.translate.default('Get Purchase List'),
        parameters: [
          {
            description: app.utils.docs.translate.property('Purchaser Id'),
            in: 'query',
            name: 'purchaserId',
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
                purchases: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      id: { type: 'string', description: app.utils.docs.translate.property('Id') },
                      purchaserId: { type: 'string', description: app.utils.docs.translate.property('Purchaser Id') },
                      purchased: { type: 'string', description: app.utils.docs.translate.property('Purchased') },
                      refunded: { type: 'string', description: app.utils.docs.translate.property('Refunded') },
                      cancelled: { type: 'string', description: app.utils.docs.translate.property('Cancelled') },
                      purchasePaymentId: { type: 'string', description: app.utils.docs.translate.property('Payment Id') }
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
      const { purchaserId, limit, offset } = params.query
      const query = {
        attributes: [['purchase_id', 'id'], 'purchaserId', ['actual_purchased', 'purchased'], ['canceled', 'cancelled'], 'refunded', 'purchasePaymentId'],
        limit: limit || 10,
        offset: offset || 0,
        where: { purchaserId: params.user.username }
      }
      if (params.user.roles.includes('platform_admin')) {
        query.where.purchaserId = purchaserId || params.user.username
      }
      const { count, rows } = await app.models.purchase.findAndCountAll(query)
      return {
        total: count,
        purchases: rows
      }
    }
  }
}

/**
 * getPurchase api
 */
module.exports.getPurchase = (app) => {
  return {
    docs: {
      find: {
        summary: app.utils.docs.translate.default('Get Purchase'),
        description: app.utils.docs.translate.default('Get Purchase'),
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
        raw: true,
        attributes: [['purchase_id', 'id'], 'purchaserId', ['actual_purchased', 'purchased'], ['canceled', 'cancelled'], 'refunded', 'purchasePaymentId'],
        where: { purchaseId: id }
      }
      if (!params.user.roles.includes('platform_admin')) {
        query.where.purchaserId = params.user.username
      }
      const found = await app.models.purchase.findOne(query)
      if (!found) {
        await app.utils.errors.handle(app, { statusCode: 404, errorCode: 20010 })
      }
      const details = await app.models.purchaseDetail.findAll({
        attributes: ['goodsId', 'goodsType', 'price', 'serviceStart', 'serviceEnd', 'issued'],
        where: { purchaseId: id }
      })
      return { ...found, details }
    }
  }
}

/**
 * savePurchase api
 */
module.exports.savePurchase = (app) => {
  return {
    docs: {
      create: {
        summary: app.utils.docs.translate.default('Save Purchase'),
        description: app.utils.docs.translate.default(`Save Purchase (with goodsId or purchaser's shopping basket)`),
        parameters: [
          {
            description: app.utils.docs.translate.property('Purchase'),
            in: 'body',
            name: 'body',
            required: true,
            schema: {
              type: 'object',
              properties: {
                purchaserId: {
                  description: app.utils.docs.translate.property('Purchaser Id'),
                  type: 'string',
                  required: true
                },
                goodsId: {
                  description: app.utils.docs.translate.property('Goods Id'),
                  type: 'string',
                  required: false
                },
                goodsType: {
                  description: app.utils.docs.translate.property('Goods Type'),
                  type: 'string',
                  required: false
                },
                purchasePaymentId: {
                  description: app.utils.docs.translate.property('Purchase Payment Id'),
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
      const { purchaserId, purchasePaymentId, goodsId, goodsType } = data
      const purchaseId = uuidv1()
      const now = new Date()
      const momentNow = moment(now)
      const processDetail = async (id, type) => {
        try {
          const acl = await app.models.datasetAcl.findOne({ where: { tenantId: purchaserId, goodsId: id, goodsType: type } })
          if ((!acl) || (acl && acl.right !== 'block')) {
            const action = !acl ? 'save' : 'update'
            if (type === 'distribution') {
              await app.v1.service(`gateway/authorization/distribution/${action}`).create({ tenantId: purchaserId, distributionId: id, purchaseId, right: 'allow' }, params)
            } else if (type === 'dataset') {
              await app.v1.service(`gateway/authorization/dataset/${action}`).create({ tenantId: purchaserId, datasetId: id, purchaseId, right: 'allow' }, params)
            } else if (type === 'api') {
              await app.v1.service(`gateway/authorization/data-service/${action}`).create({ tenantId: purchaserId, dataserviceId: id, purchaseId, right: 'allow' }, params)
            }
          }
        } catch (error) {
          // skip error
        }
        const userPrice = await app.models.priceCondition.findOne({ where: { goodsId: id, tenantType: 'user', resourceType: type } })
        await app.models.purchaseDetail.create({
          purchaseId,
          goodsId: id,
          goodsType: type,
          price: userPrice.price,
          ownerId: purchaserId,
          serviceStart: now,
          serviceEnd: momentNow.add(userPrice.servicePeriod, userPrice.periodUnit),
          actualPurchased: now,
          issued: now
        })
      }
      await app.models.purchase.create({
        purchaseId,
        purchaserId,
        purchaseType: 'purchased',
        purchaseObjectType: 'data',
        purchasePaymentId,
        actualPurchased: now
      })
      if (goodsId && goodsType) {
        await processDetail(goodsId, goodsType)
      } else {
        const baskets = await app.models.shoppingBasket.findAll({ where: { purchaserId } })
        for (const basketRow of baskets) {
          const basket = basketRow.dataValues
          await processDetail(basket.goodsId, basket.goodsType)
        }
        await app.models.shoppingBasket.destroy({ where: { purchaserId } })
      }
      return { id: purchaseId }
    }
  }
}

/**
 * updatePurchase api
 */
module.exports.updatePurchase = (app) => {
  return {
    docs: {
      create: {
        summary: app.utils.docs.translate.default('Update Purchase'),
        description: app.utils.docs.translate.default('Update Purchase'),
        parameters: [
          {
            description: app.utils.docs.translate.property('Purchase'),
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
                type: {
                  description: app.utils.docs.translate.property('Type (cancelled or refunded or both)'),
                  type: 'string',
                  default: 'both',
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
      const found = await app.models.purchase.findOne({ where: { purchaseId: id } })
      if (!found) {
        await app.utils.errors.handle(app, { statusCode: 404, errorCode: 20010 })
      }
      if (data.type === 'cancelled' || data.type === 'both') {
        if (!found.canceled) {
          const details = await app.models.purchaseDetail.findAll({ where: { purchaseId: id } })
          for (const detail of details) {
            try {
              const purchaseDetail = detail.dataValues
              if (purchaseDetail.goodsType === 'distribution') {
                await app.v1.service('gateway/authorization/distribution/remove').create({ tenantId: found.purchaserId, distributionId: purchaseDetail.goodsId, purchaseId: id }, params)
              } else if (purchaseDetail.goodsType === 'dataset') {
                await app.v1.service('gateway/authorization/dataset/remove').create({ tenantId: found.purchaserId, datasetId: purchaseDetail.goodsId, purchaseId: id }, params)
              } else if (purchaseDetail.goodsType === 'api') {
                await app.v1.service('gateway/authorization/data-service/remove').create({ tenantId: found.purchaserId, dataserviceId: purchaseDetail.goodsId, purchaseId: id }, params)
              }
            } catch (error) {
              // skip error
            }
          }
        }
      }
      await app.models.purchase.update({
        ...found,
        purchaseType: data.type,
        canceled: data.type === 'cancelled' || data.type === 'both' ? new Date() : undefined,
        refunded: data.type === 'refunded' || data.type === 'both' ? new Date() : undefined
      }, {
        where: { purchaseId: id },
        returning: true
      })
      return { result: 'success' }
    }
  }
}

/**
 * removePurchase api
 */
module.exports.removePurchase = (app) => {
  return {
    docs: {
      create: {
        summary: app.utils.docs.translate.default('Remove Purchase'),
        description: app.utils.docs.translate.default('Remove Purchase'),
        parameters: [
          {
            description: app.utils.docs.translate.property('Purchase'),
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
      const found = await app.models.purchase.findOne({ where: { purchaseId: id } })
      if (!found) {
        await app.utils.errors.handle(app, { statusCode: 404, errorCode: 20010 })
      }
      if (!found.canceled) {
        const details = await app.models.purchaseDetail.findAll({ where: { purchaseId: id } })
        for (const detail of details) {
          try {
            const purchaseDetail = detail.dataValues
            if (purchaseDetail.goodsType === 'distribution') {
              await app.v1.service('gateway/authorization/distribution/remove').create({ tenantId: found.purchaserId, distributionId: purchaseDetail.goodsId, purchaseId: id }, params)
            } else if (purchaseDetail.goodsType === 'dataset') {
              await app.v1.service('gateway/authorization/dataset/remove').create({ tenantId: found.purchaserId, datasetId: purchaseDetail.goodsId, purchaseId: id }, params)
            } else if (purchaseDetail.goodsType === 'api') {
              await app.v1.service('gateway/authorization/data-service/remove').create({ tenantId: found.purchaserId, dataserviceId: purchaseDetail.goodsId, purchaseId: id }, params)
            }
          } catch (error) {
            // skip error
          }
        }
      }
      await app.models.purchase.destroy({ where: { purchaseId: id } })
      await app.models.purchaseDetail.destroy({ where: { purchaseId: id } })
      return { result: 'success' }
    }
  }
}
