/**
 *  Copyright (c) Electronics and Telecommunications Research Institute. All rights reserved.
 *  See License.txt in the project root for license information.
 */
const uuidv1 = require('uuid/v1')
/**
 * getSourceList api
 */
module.exports.getSourceList = (app) => {
  return {
    docs: {
      find: {
        summary: app.utils.docs.translate.default('Get Source List'),
        description: app.utils.docs.translate.default('Get Source List'),
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
                sources: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      id: { type: 'string', description: app.utils.docs.translate.property('Id') },
                      title: { type: 'string', description: app.utils.docs.translate.property('Title') },
                      description: { type: 'string', description: app.utils.docs.translate.property('Description') },
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
      const { offset, limit } = params.query
      const query = {
        attributes: ['id', 'title', 'description', 'issued'],
        order: [['issued', 'DESC']],
        limit: limit || 10,
        offset: offset || 0
      }
      const { count, rows } = await app.models.harvestSource.findAndCountAll(query)
      return {
        total: count,
        sources: rows
      }
    }
  }
}

/**
 * getSource api
 */
module.exports.getSource = (app) => {
  return {
    docs: {
      find: {
        summary: app.utils.docs.translate.default('Get Source'),
        description: app.utils.docs.translate.default('Get Source'),
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
      const result = await app.models.harvestSource.find(query)
      if (!result) {
        await app.utils.errors.handle(app, { statusCode: 404, errorCode: 20008 })
      }
      return result
    }
  }
}

/**
 * saveSource api
 */
module.exports.saveSource = (app) => {
  return {
    docs: {
      create: {
        summary: app.utils.docs.translate.default('Save Source'),
        description: app.utils.docs.translate.default('Save Source'),
        parameters: [
          {
            description: app.utils.docs.translate.property('Source'),
            in: 'body',
            name: 'body',
            required: true,
            schema: {
              type: 'object',
              properties: {
                url: {
                  description: app.utils.docs.translate.property('Url'),
                  type: 'string',
                  required: true
                },
                type: {
                  description: app.utils.docs.translate.property('Type (ckan, dcat1, dcat2 or dcat_rdf)'),
                  type: 'string',
                  required: true
                },
                title: {
                  description: app.utils.docs.translate.property('Title'),
                  type: 'string',
                  required: true
                },
                description: {
                  description: app.utils.docs.translate.property('Description'),
                  type: 'string',
                  required: false
                },
                config: {
                  description: app.utils.docs.translate.property('Config'),
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
      const { url, type, title, description, config } = data
      const id = uuidv1()
      await app.models.harvestSource.create({
        id,
        title,
        description,
        url,
        // type: type === 'dcat1' || type === 'dcat2' ? 'dcat_rdf' : type,
        type,
        config,
        active: true,
        tenantId: 'default_org',
        approvalState: 'accept',
        publisherId: params.user.username,
        issued: new Date()
      })
      return { id }
    }
  }
}

/**
 * updateSource api
 */
module.exports.updateSource = (app) => {
  return {
    docs: {
      create: {
        summary: app.utils.docs.translate.default('Update Source'),
        description: app.utils.docs.translate.default('Update Source'),
        parameters: [
          {
            description: app.utils.docs.translate.property('Source'),
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
                title: {
                  description: app.utils.docs.translate.property('Title'),
                  type: 'string',
                  required: false
                },
                description: {
                  description: app.utils.docs.translate.property('Description'),
                  type: 'string',
                  required: false
                },
                config: {
                  description: app.utils.docs.translate.property('Config'),
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
      const found = await app.models.harvestSource.findOne({ where: { id } })
      if (!found) {
        await app.utils.errors.handle(app, { statusCode: 404, errorCode: 20008 })
      }
      await app.models.harvestSource.update({
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
 * removeSource api
 */
module.exports.removeSource = (app) => {
  return {
    docs: {
      create: {
        summary: app.utils.docs.translate.default('Remove Source'),
        description: app.utils.docs.translate.default('Remove Source'),
        parameters: [
          {
            description: app.utils.docs.translate.property('Source'),
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
      const found = await app.models.harvestSource.findOne({ where: { id } })
      if (!found) {
        await app.utils.errors.handle(app, { statusCode: 404, errorCode: 20008 })
      }
      await app.models.harvestSource.destroy({ where: { id } })
      return { result: 'success' }
    }
  }
}
