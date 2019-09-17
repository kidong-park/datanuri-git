/**
 *  Copyright (c) Electronics and Telecommunications Research Institute. All rights reserved.
 *  See License.txt in the project root for license information.
 */

const uuidv1 = require('uuid/v1')

/**
 * getDataserviceList api
 */
module.exports.getDataserviceList = (app) => {
  return {
    docs: {
      find: {
        summary: app.utils.docs.translate.default('Get Dataservice Relationship List'),
        description: app.utils.docs.translate.default('Get Dataservice Relationship List'),
        parameters: [
          {
            description: app.utils.docs.translate.property('Dataservice Id'),
            in: 'query',
            name: 'id',
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
      const { id, offset, limit } = params.query
      const query = {
        limit: limit || 10,
        offset: offset || 0,
        where: { subjectResourceId: id }
      }
      const { count, rows } = await app.models.resourceRelationship.findAndCountAll(query)
      return {
        total: count,
        relationships: rows
      }
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
        summary: app.utils.docs.translate.default('Get Dataservice Relationship'),
        description: app.utils.docs.translate.default('Get Dataservice Relationship'),
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
        where: { id }
      }
      const result = await app.models.resourceRelationship.find(query)
      if (!result) {
        await app.utils.errors.handle(app, { statusCode: 404, errorCode: 20007 })
      }
      return result
    }
  }
}

/**
 * saveDataservice api
 */
module.exports.saveDataservice = (app) => {
  return {
    docs: {
      create: {
        summary: app.utils.docs.translate.default('Save Dataservice Relationship'),
        description: app.utils.docs.translate.default('Save Dataservice Relationship'),
        parameters: [
          {
            description: app.utils.docs.translate.property('Dataservice Relationship'),
            in: 'body',
            name: 'body',
            required: true,
            schema: {
              type: 'object',
              properties: {
                sourceId: {
                  description: app.utils.docs.translate.property('sourceId'),
                  type: 'string',
                  required: true
                },
                targetId: {
                  description: app.utils.docs.translate.property('targetId'),
                  type: 'string',
                  required: true
                },
                relationType: {
                  description: app.utils.docs.translate.property('relationType'),
                  type: 'string',
                  required: true
                },
                hadRole: {
                  description: app.utils.docs.translate.property('hadRole'),
                  type: 'string',
                  required: false
                },
                description: {
                  description: app.utils.docs.translate.property('Description'),
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
      const id = uuidv1()
      const { sourceId, targetId, hadRole, relationType, description } = data
      await app.models.resourceRelationship.create({
        id,
        subjectResourceId: sourceId,
        objectResourceId: targetId,
        relationType,
        hadRole,
        description,
        issuerId: params.user.username,
        issued: new Date()
      })
      return { id }
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
        summary: app.utils.docs.translate.default('Update Dataservice Relationship'),
        description: app.utils.docs.translate.default('Update Dataservice Relationship'),
        parameters: [
          {
            description: app.utils.docs.translate.property('Dataservice Relationship'),
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
                },
                sourceId: {
                  description: app.utils.docs.translate.property('sourceId'),
                  type: 'string',
                  required: false
                },
                targetId: {
                  description: app.utils.docs.translate.property('targetId'),
                  type: 'string',
                  required: false
                },
                relationType: {
                  description: app.utils.docs.translate.property('relationType'),
                  type: 'string',
                  required: false
                },
                hadRole: {
                  description: app.utils.docs.translate.property('hadRole'),
                  type: 'string',
                  required: false
                },
                description: {
                  description: app.utils.docs.translate.property('Description'),
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
      const found = await app.models.resourceRelationship.findOne({ where: { id } })
      if (!found) {
        await app.utils.errors.handle(app, { statusCode: 404, errorCode: 20007 })
      }
      await app.models.resourceRelationship.update({
        ...found,
        ...data,
        issued: new Date()
      }, {
        where: { id },
        returning: true
      })
      return { result: 'success' }
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
        summary: app.utils.docs.translate.default('Remove Dataservice Relationship'),
        description: app.utils.docs.translate.default('Remove Dataservice Relationship'),
        parameters: [
          {
            description: app.utils.docs.translate.property('Dataservice Relationship'),
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
      const found = await app.models.resourceRelationship.findOne({ where: { id } })
      if (!found) {
        await app.utils.errors.handle(app, { statusCode: 404, errorCode: 20007 })
      }
      await app.models.resourceRelationship.destroy({ where: { id } })
      return { result: 'success' }
    }
  }
}
