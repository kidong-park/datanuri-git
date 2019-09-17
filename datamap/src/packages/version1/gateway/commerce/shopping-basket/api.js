/**
 *  Copyright (c) Electronics and Telecommunications Research Institute. All rights reserved.
 *  See License.txt in the project root for license information.
 */

/**
 * getShoppingBasketList api
 */
module.exports.getShoppingBasketList = (app) => {
  return {
    docs: {
      find: {
        summary: app.utils.docs.translate.default('Get Shopping-Basket List'),
        description: app.utils.docs.translate.default('Get Shopping-Basket List'),
        parameters: [
          {
            description: app.utils.docs.translate.property('Purchaser Id'),
            in: 'query',
            name: 'purchaserId',
            type: 'string',
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
            description: app.utils.docs.translate.property('Offset'),
            in: 'query',
            name: 'offset',
            type: 'integer',
            default: 0,
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
      const { purchaserId, limit, offset } = params.query
      const query = {
        limit: limit || 10,
        offset: offset || 0,
        where: { purchaserId: params.user.username },
        include: [
          { required: false, model: app.models.distribution, attributes: ['title', 'description', 'issued'] },
          { required: false, model: app.models.resource, attributes: ['title', 'imagePath', 'description', 'issued'] },
          { required: false, model: app.models.priceCondition, where: { tenantType: 'user' }, attributes: ['price', 'servicePeriod', 'periodUnit'] }
        ]
      }
      if (!params.user.roles.includes('platform_admin')) {
        query.where.purchaserId = purchaserId || params.user.username
      }
      app.models.shoppingBasket.belongsTo(app.models.distribution, { foreignKey: 'goodsId' })
      app.models.shoppingBasket.belongsTo(app.models.resource, { foreignKey: 'goodsId' })
      app.models.shoppingBasket.belongsTo(app.models.priceCondition, { foreignKey: 'goodsId' })
      const { count, rows } = await app.models.shoppingBasket.findAndCountAll(query)
      const baskets = rows.map(row => {
        const goods = row.dataValues.distribution ? row.dataValues.distribution : row.dataValues.resource
        delete row.dataValues.distribution
        delete row.dataValues.resource
        row.dataValues.goods = goods
        return row
      })
      return {
        total: count,
        baskets
      }
    }
  }
}

/**
 * saveShoppingBasket api
 */
module.exports.saveShoppingBasket = (app) => {
  return {
    docs: {
      create: {
        summary: app.utils.docs.translate.default('Save Shopping-Basket'),
        description: app.utils.docs.translate.default('Save Shopping-Basket'),
        parameters: [
          {
            description: app.utils.docs.translate.property('shopping_basket'),
            in: 'body',
            name: 'body',
            required: true,
            schema: {
              type: 'object',
              properties: {
                goodsId: {
                  description: app.utils.docs.translate.property('Goods Id'),
                  type: 'string',
                  required: true
                },
                goodsType: {
                  description: app.utils.docs.translate.property('Goods Type'),
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
      const { goodsId, goodsType } = data
      const query = {
        where: { purchaserId: params.user.username, goodsId, goodsType }
      }
      const found = await app.models.shoppingBasket.findOne(query)
      if (found) {
        await app.utils.errors.handle(app, { statusCode: 400, errorCode: 20019 })
      }
      await app.models.shoppingBasket.create({
        purchaserId: params.user.username,
        goodsId,
        goodsType,
        basketIssued: new Date()
      })
      return { result: 'success' }
    }
  }
}

/**
 * removeShoppingBasket api
 */
module.exports.removeShoppingBasket = (app) => {
  return {
    docs: {
      create: {
        summary: app.utils.docs.translate.default('remove Shopping-Basket'),
        description: app.utils.docs.translate.default('remove Shopping-Basket'),
        parameters: [
          {
            description: app.utils.docs.translate.property('shopping_basket'),
            in: 'body',
            name: 'body',
            required: true,
            schema: {
              type: 'object',
              properties: {
                goodsId: {
                  description: app.utils.docs.translate.property('Goods Id'),
                  type: 'string',
                  required: true
                },
                goodsType: {
                  description: app.utils.docs.translate.property('Goods Type'),
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
      const { goodsId, goodsType } = data
      const query = {
        where: { purchaserId: params.user.username, goodsId, goodsType }
      }
      const found = await app.models.shoppingBasket.findOne(query)
      if (!found) {
        await app.utils.errors.handle(app, { statusCode: 404, errorCode: 20020 })
      }
      await app.models.shoppingBasket.destroy(query)
      return { result: 'success' }
    }
  }
}
