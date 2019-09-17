/**
 *  Copyright (c) Electronics and Telecommunications Research Institute. All rights reserved.
 *  See License.txt in the project root for license information.
 */

const uuidv1 = require('uuid/v1')

/**
 * getVersionList api
 */
module.exports.getVersionList = (app) => {
  return {
    docs: {
      find: {
        summary: app.utils.docs.translate.default('Get Version List'),
        description: app.utils.docs.translate.default('Get Version List'),
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
                      versionId: { type: 'string', description: app.utils.docs.translate.property('Version Id') },
                      version: { type: 'string', description: app.utils.docs.translate.property('Version') },
                      versionDate: { type: 'string', format: 'date', description: app.utils.docs.translate.property('Version Date') },
                      description: { type: 'string', description: app.utils.docs.translate.property('Description') },
                      issuerId: { type: 'string', description: app.utils.docs.translate.property('Issuer Id') },
                      issued: { type: 'string', format: 'date', description: app.utils.docs.translate.property('Issued') },
                      modifierId: { type: 'string', description: app.utils.docs.translate.property('Modifier Id') },
                      modified: { type: 'string', format: 'date', description: app.utils.docs.translate.property('Modified') }
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
      const {
        offset,
        limit
      } = params.query

      const { count, rows } = await app.models.taxonomyVersion.findAndCountAll({
        limit: limit || 10,
        offset: offset || 0
      })

      return {
        total: count,
        versions: rows
      }
    }
  }
}

/**
 * getVersion api
 */
module.exports.getVersion = (app) => {
  return {
    docs: {
      find: {
        summary: app.utils.docs.translate.default('Get Version'),
        description: app.utils.docs.translate.default('Get Version'),
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
                versionId: { type: 'string', description: app.utils.docs.translate.property('Version Id') },
                version: { type: 'string', description: app.utils.docs.translate.property('Version') },
                versionDate: { type: 'string', format: 'date', description: app.utils.docs.translate.property('Version Date') },
                description: { type: 'string', description: app.utils.docs.translate.property('Description') },
                issuerId: { type: 'string', description: app.utils.docs.translate.property('Issuer Id') },
                issued: { type: 'string', format: 'date', description: app.utils.docs.translate.property('Issued') },
                modifierId: { type: 'string', description: app.utils.docs.translate.property('Modifier Id') },
                modified: { type: 'string', format: 'date', description: app.utils.docs.translate.property('Modified') }
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
      const version = await app.models.taxonomyVersion.find({ where: { versionId: id } })

      if (!version) {
        await app.utils.errors.handle(app, { statusCode: 404, errorCode: 1000004 })
      }

      return version
    }
  }
}

/**
 * saveVersion api
 */
module.exports.saveVersion = (app) => {
  return {
    docs: {
      create: {
        summary: app.utils.docs.translate.default('Save Version'),
        description: app.utils.docs.translate.default('Save Version'),
        parameters: [
          {
            description: app.utils.docs.translate.property('Version'),
            in: 'body',
            name: 'body',
            required: true,
            schema: {
              type: 'object',
              properties: {
                version: {
                  description: app.utils.docs.translate.property('Version'),
                  type: 'string',
                  required: true
                },
                versionDate: {
                  description: app.utils.docs.translate.property('Version Date'),
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
      const date = new Date()
      const versionId = uuidv1()

      await app.models.taxonomyVersion.create({
        versionId,
        versionDate: date,
        ...data,
        issuerId: params.user.username,
        issued: date
      })

      return { id: versionId }
    }
  }
}

/**
 * updateVersion api
 */
module.exports.updateVersion = (app) => {
  return {
    docs: {
      create: {
        summary: app.utils.docs.translate.default('Update Version'),
        description: app.utils.docs.translate.default('Update Version'),
        parameters: [
          {
            description: app.utils.docs.translate.property('Version'),
            in: 'body',
            name: 'body',
            required: true,
            schema: {
              type: 'object',
              properties: {
                versionId: {
                  description: app.utils.docs.translate.property('Version Id'),
                  type: 'string',
                  required: true
                },
                version: {
                  description: app.utils.docs.translate.property('Version'),
                  type: 'string',
                  required: false
                },
                versionDate: {
                  description: app.utils.docs.translate.property('Version Date'),
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
      const { versionId } = data
      const date = new Date()
      const {
        version,
        issuerId,
        issued
      } = await app.models.taxonomyVersion.find({ where: { versionId } })

      if (!version) {
        await app.utils.errors.handle(app, { statusCode: 404, errorCode: 1000004 })
      }

      await app.models.taxonomyVersion.update({
        ...data,
        modifierId: params.user.username,
        modified: date,
        issuerId,
        issued
      }, {
        where: { versionId },
        returning: true
      })

      return { result: 'success' }
    }
  }
}

/**
 * removeVersion api
 */
module.exports.removeVersion = (app) => {
  return {
    docs: {
      create: {
        summary: app.utils.docs.translate.default('Remove Version'),
        description: app.utils.docs.translate.default('Remove Version'),
        parameters: [
          {
            description: app.utils.docs.translate.property('Version'),
            in: 'body',
            name: 'body',
            required: true,
            schema: {
              type: 'object',
              properties: {
                versionId: {
                  description: app.utils.docs.translate.property('Version Id'),
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
      const { versionId } = data
      const found = await app.models.taxonomyVersion.findOne({ where: { versionId } })

      if (!found) {
        await app.utils.errors.handle(app, { statusCode: 404, errorCode: 1000004 })
      }
      const version = await app.models.taxonomyVersion.destroy({ where: { versionId } })

      return {
        results: version === 1 ? 'success' : 'failed'
      }
    }
  }
}

/**
 * getVersionLast api
 */
module.exports.getVersionLast = (app) => {
  return {
    docs: {
      find: {
        summary: app.utils.docs.translate.default('Get Version'),
        description: app.utils.docs.translate.default('Get Version'),
        parameters: [
          {
            description: app.utils.docs.translate.property('Order'),
            in: 'query',
            name: 'ordered',
            type: 'string',
            default: 'DESC',
            required: false
          }
        ],
        responses: {
          200: {
            description: app.utils.docs.translate.response('Successful'),
            schema: {
              type: 'object',
              properties: {
                versionId: { type: 'string', description: app.utils.docs.translate.property('Version Id') },
                version: { type: 'string', description: app.utils.docs.translate.property('Version') },
                versionDate: { type: 'string', format: 'date', description: app.utils.docs.translate.property('Version Date') },
                description: { type: 'string', description: app.utils.docs.translate.property('Description') },
                issuerId: { type: 'string', description: app.utils.docs.translate.property('Issuer Id') },
                issued: { type: 'string', format: 'date', description: app.utils.docs.translate.property('Issued') },
                modifierId: { type: 'string', description: app.utils.docs.translate.property('Modifier Id') },
                modified: { type: 'string', format: 'date', description: app.utils.docs.translate.property('Modified') }
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
      const { ordered } = params.query
      const version = await app.models.taxonomyVersion.findAll({
        limit: 1,
        order: [ [ 'issued', ordered || 'DESC' ] ]
      })

      if (!version) {
        await app.utils.errors.handle(app, { statusCode: 404, errorCode: 1000004 })
      }

      return version
    }
  }
}
