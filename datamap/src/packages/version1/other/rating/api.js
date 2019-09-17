/**
 *  Copyright (c) Electronics and Telecommunications Research Institute. All rights reserved.
 *  See License.txt in the project root for license information.
 */

/**
 * getRatingList api
 */
module.exports.getRatingList = (app) => {
  return {
    docs: {
      find: {
        summary: app.utils.docs.translate.default('Get Rating List'),
        description: app.utils.docs.translate.default('Get Rating List'),
        parameters: [
          {
            description: app.utils.docs.translate.property('user Id'),
            in: 'query',
            name: 'userId',
            type: 'string',
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
                      userId: { type: 'string', description: app.utils.docs.translate.property('User Id') },
                      resourceId: { type: 'string', description: app.utils.docs.translate.property('Resource Id') },
                      rating: { type: 'integer', description: app.utils.docs.translate.property('Rating') },
                      issued: { type: 'string', description: app.utils.docs.translate.property('Issued') }
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
      const query = {
        attributes: ['id', 'userId', 'resourceId', 'rating', 'issued'],
        order: [['issued', 'DESC']],
        where: { userId: params.user.username }
      }
      if (params.user.roles.includes('platform_admin') && params.query.userId) {
        query.where.userId = params.query.userId
      }
      const { count, rows } = await app.models.rating.findAndCountAll(query)
      return { total: count, data: rows }
    }
  }
}
/**
 * getRating api
 */
module.exports.getRating = (app) => {
  return {
    docs: {
      find: {
        summary: app.utils.docs.translate.default('Get Rating'),
        description: app.utils.docs.translate.default('Get Rating'),
        parameters: [
          {
            description: app.utils.docs.translate.property('Resource Id'),
            in: 'query',
            name: 'resourceId',
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
                average: { type: 'integer', description: app.utils.docs.translate.property('Average') }
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
      const { resourceId } = params.query
      const { count, rows } = await app.models.rating.findAndCountAll({ where: { resourceId } })
      const totalRating = rows.reduce((sum, { rating }) => { sum += rating; return sum }, 0)
      const avgRating = count !== 0 ? totalRating / count : 0
      return { average: avgRating }
    }
  }
}

/**
 * saveRating api
 */
module.exports.saveRating = (app) => {
  return {
    docs: {
      create: {
        summary: app.utils.docs.translate.default('Save Rating'),
        description: app.utils.docs.translate.default('Save Rating'),
        parameters: [
          {
            description: app.utils.docs.translate.property('rating'),
            in: 'body',
            name: 'body',
            required: true,
            schema: {
              type: 'object',
              properties: {
                resourceId: {
                  description: app.utils.docs.translate.property('Resource Id'),
                  type: 'string',
                  required: true
                },
                rating: {
                  description: app.utils.docs.translate.property('Rating (0-10)'),
                  type: 'integer',
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
    getId: () => {
      return Math.random().toString(36).substr(2, 9)
    },
    updated: async data => {
      const { userId, resourceId, rating } = data
      const modified = new Date()
      const result = await app.models.rating.update({
        rating,
        modified,
        modifierId: userId
      }, {
        where: { userId, resourceId },
        returning: true
      })

      return result[1][0]
    },
    created: async data => {
      const issued = new Date()
      const result = await app.models.rating.create({
        ...data,
        issued
      })

      return result
    },
    // POST method
    async create (data, params) {
      const id = this.getId()
      const { resourceId } = data
      const resource = await app.models.resource.findOne({ where: { id: resourceId } })
      if (!resource) {
        await app.utils.errors.handle(app, { statusCode: 404, errorCode: 20017 })
      }
      const userId = params.user.username
      const isValue = await app.models.rating.find({
        where: { userId, resourceId }
      })
      const rating = {
        ...data,
        userId,
        resourceId,
        id
      }

      if (isValue === null) {
        this.created(rating)
      } else {
        this.updated(rating)
      }
      delete rating.id
      return { result: 'success' }
    }
  }
}
