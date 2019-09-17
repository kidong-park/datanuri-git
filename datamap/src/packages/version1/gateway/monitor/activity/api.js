/**
 *  Copyright (c) Electronics and Telecommunications Research Institute. All rights reserved.
 *  See License.txt in the project root for license information.
 */

const uuidv1 = require('uuid/v1')

/**
 * getActivityList api
 */
module.exports.getActivityList = (app) => {
  return {
    docs: {
      find: {
        summary: app.utils.docs.translate.default('Get Activity List'),
        description: app.utils.docs.translate.default('Get Activity List'),
        parameters: [
          {
            description: app.utils.docs.translate.property('Tenant Id'),
            in: 'query',
            name: 'tenantId',
            type: 'string',
            required: false
          },
          {
            description: app.utils.docs.translate.property('Resource Id'),
            in: 'query',
            name: 'resourceId',
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
                activities: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      id: { type: 'string', description: app.utils.docs.translate.property('Id') },
                      tenantId: { type: 'string', description: app.utils.docs.translate.property('Tenant Id') },
                      resourceId: { type: 'string', description: app.utils.docs.translate.property('Resource Id') },
                      actionType: { type: 'string', description: app.utils.docs.translate.property('Action Type') },
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
      const { tenantId, resourceId, offset, limit } = params.query
      const query = {
        attributes: [['history_id', 'id'], 'tenantId', 'resourceId', 'actionType', ['issued_date', 'issued']],
        limit: limit || 10,
        offset: offset || 0,
        where: {}
      }
      if (tenantId) {
        query.where.tenantId = tenantId
      }
      if (resourceId) {
        query.where.resourceId = resourceId
      }
      const { count, rows } = await app.models.datasetHistory.findAndCountAll(query)
      return {
        total: count,
        activities: rows
      }
    }
  }
}

/**
 * getActivity api
 */
module.exports.getActivity = (app) => {
  return {
    docs: {
      find: {
        summary: app.utils.docs.translate.default('Get Activity'),
        description: app.utils.docs.translate.default('Get Activity'),
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
                id: { type: 'string', description: app.utils.docs.translate.property('Id') },
                tenantId: { type: 'string', description: app.utils.docs.translate.property('Tenant Id') },
                resourceId: { type: 'string', description: app.utils.docs.translate.property('Resource Id') },
                actionType: { type: 'string', description: app.utils.docs.translate.property('Action Type') },
                issued: { type: 'string', description: app.utils.docs.translate.property('Issued') }
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
      const { id } = params.query
      const query = {
        attributes: [['history_id', 'id'], 'tenantId', 'resourceId', 'actionType', ['issued_date', 'issued']],
        where: { historyId: id }
      }
      const result = await app.models.datasetHistory.find(query)
      if (!result) {
        await app.utils.errors.handle(app, { statusCode: 404, errorCode: 20018 })
      }
      return result
    }
  }
}

/**
 * saveActivity api
 */
module.exports.saveActivity = (app) => {
  return {
    docs: {
      create: {
        summary: app.utils.docs.translate.default('Save Activity'),
        description: app.utils.docs.translate.default('Save Activity'),
        parameters: [
          {
            description: app.utils.docs.translate.property('Activity'),
            in: 'body',
            name: 'body',
            required: true,
            schema: {
              type: 'object',
              properties: {
                tenantId: {
                  description: app.utils.docs.translate.property('TenantId'),
                  type: 'string',
                  required: true
                },
                resourceId: {
                  description: app.utils.docs.translate.property('resourceId'),
                  type: 'string',
                  required: true
                },
                actionType: {
                  description: app.utils.docs.translate.property('actionType'),
                  type: 'string',
                  required: true
                },
                actionDetail: {
                  description: app.utils.docs.translate.property('actionDetail'),
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
      const id = uuidv1()
      const { tenantId, resourceId, actionType, actionDetail } = data
      const resource = await app.models.resource.findOne({ where: { id: resourceId } })
      if (!resource) {
        await app.utils.errors.handle(app, { statusCode: 404, errorCode: 20017 })
      }
      await app.models.datasetHistory.create({
        historyId: id,
        tenantId,
        resourceId,
        goodsName: resource.title,
        goodsType: resource.type,
        actionType,
        actionDetail,
        publisher: resource.ownerId,
        issuedDate: new Date()
      })
      return { id }
    }
  }
}

/**
 * updateActivity api
 */
module.exports.updateActivity = (app) => {
  return {
    docs: {
      create: {
        summary: app.utils.docs.translate.default('Update Activity'),
        description: app.utils.docs.translate.default('Update Activity'),
        parameters: [
          {
            description: app.utils.docs.translate.property('Activity'),
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
                actionType: {
                  description: app.utils.docs.translate.property('actionType'),
                  type: 'string',
                  required: false
                },
                actionDetail: {
                  description: app.utils.docs.translate.property('actionDetail'),
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
      const { id } = data
      const found = await app.models.datasetHistory.findOne({ where: { historyId: id } })
      if (!found) {
        await app.utils.errors.handle(app, { statusCode: 404, errorCode: 20018 })
      }
      await app.models.datasetHistory.update({
        ...found,
        ...data,
        issued: new Date()
      }, {
        where: { historyId: id },
        returning: true
      })
      return { result: 'success' }
    }
  }
}

/**
 * removeActivity api
 */
module.exports.removeActivity = (app) => {
  return {
    docs: {
      create: {
        summary: app.utils.docs.translate.default('Remove Activity'),
        description: app.utils.docs.translate.default('Remove Activity'),
        parameters: [
          {
            description: app.utils.docs.translate.property('Activity'),
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
      const found = await app.models.datasetHistory.findOne({ where: { historyId: id } })
      if (!found) {
        await app.utils.errors.handle(app, { statusCode: 404, errorCode: 20018 })
      }
      await app.models.datasetHistory.destroy({ where: { historyId: id } })
      return { result: 'success' }
    }
  }
}
