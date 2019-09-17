/**
 *  Copyright (c) Electronics and Telecommunications Research Institute. All rights reserved.
 *  See License.txt in the project root for license information.
 */

const axios = require('axios')

/**
 * getCatalog api
 */
module.exports.getCatalog = (app) => {
  return {
    docs: {
      find: {
        summary: app.utils.docs.translate.default('Get Catalog Datamap'),
        description: app.utils.docs.translate.default('Get Catalog Datamap'),
        parameters: [
          {
            description: app.utils.docs.translate.property('Page'),
            in: 'query',
            name: 'page',
            type: 'integer',
            default: 1,
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
    // POST method
    async find (params) {
      const { url } = app.get('mapper')
      const http = axios.create({ baseURL: url, responseType: 'stream' })
      const dataReq = {
        access: 'both',
        page: params.query.page || 1,
        user: params.user && params.user.username,
        org: params.user && params.user.organization[0],
        role: params.user && params.user.roles[0],
        timestamp: params.query.timestamp
      }
      const res = await http.post('/dcat/catalog', dataReq)
      const filename = `catalog_page_${dataReq.page}.rdf`
      return { filename, stream: res.data }
    }
  }
}

/**
 * getDataset api
 */
module.exports.getDataset = (app) => {
  return {
    docs: {
      find: {
        summary: app.utils.docs.translate.default('Get Dataset Datamap'),
        description: app.utils.docs.translate.default('Get Dataset Datamap'),
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
    // POST method
    async find (params) {
      const { id } = params.query
      const query = {
        where: { id, type: 'dataset' }
      }
      const result = await app.models.resource.findOne(query)
      if (!result) {
        await app.utils.errors.handle(app, { statusCode: 404, errorCode: 20002 })
      }
      const { url } = app.get('mapper')
      const http = axios.create({ baseURL: url, responseType: 'stream' })
      const dataReq = {
        id: params.query.id,
        user: params.user && params.user.username,
        org: params.user && params.user.organization[0],
        role: params.user && params.user.roles[0]
      }
      const res = await http.post('/dcat/dataset', dataReq)
      const filename = `${dataReq.id}.rdf`
      return { filename, stream: res.data }
    }
  }
}

/**
 * getDataService api
 */
module.exports.getDataService = (app) => {
  return {
    docs: {
      find: {
        summary: app.utils.docs.translate.default('Get DataService Datamap'),
        description: app.utils.docs.translate.default('Get DataService Datamap'),
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
    // POST method
    async find (params) {
      const id = params.query.id
      const queryService = { where: { id, type: 'api' } }
      const foundDataservice = await app.models.resource.findOne(queryService)
      if (!foundDataservice) {
        await app.utils.errors.handle(app, { statusCode: 404, errorCode: 20003 })
      }
      const { url } = app.get('mapper')
      const http = axios.create({ baseURL: url, responseType: 'stream' })
      const dataReq = {
        id: params.query.id,
        user: params.user && params.user.username,
        org: params.user && params.user.organization[0],
        role: params.user && params.user.roles[0]
      }
      const res = await http.post('/dcat/dataset', dataReq)
      const filename = `${dataReq.id}.rdf`
      return { filename, stream: res.data }
    }
  }
}

/**
 * getSource api
 */
module.exports.getSource = (app) => {
  return {
    docs: {
      create: {
        summary: app.utils.docs.translate.default('Get Source Datamap'),
        description: app.utils.docs.translate.default('Get Source Datamap'),
        parameters: [
          {
            description: app.utils.docs.translate.property('Datamap'),
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
    // POST method
    async create (data, params) {
      const { url } = app.get('mapper')
      const http = axios.create({ baseURL: url, responseType: 'stream' })
      const dataReq = {
        access: 'both',
        page: 1,
        user: params.user && params.user.username,
        org: params.user && params.user.organization[0],
        role: params.user && params.user.roles[0]
      }
      const res = await http.post('/dcat/catalog', dataReq)
      const filename = `${data.id}.rdf`
      return { filename, stream: res.data }
    }
  }
}
