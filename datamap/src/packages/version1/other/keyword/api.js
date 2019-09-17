/**
 *  Copyright (c) Electronics and Telecommunications Research Institute. All rights reserved.
 *  See License.txt in the project root for license information.
 */
const uuidv1 = require('uuid/v1')
/**
 * saveKeyword api
 */
module.exports.saveKeyword = (app) => {
  return {
    docs: {
      create: {
        summary: app.utils.docs.translate.default('Save Keyword'),
        description: app.utils.docs.translate.default('Save Keyword'),
        parameters: [
          {
            description: app.utils.docs.translate.property('Keyword'),
            in: 'body',
            name: 'body',
            required: true,
            schema: {
              type: 'object',
              properties: {
                // keywordType: { type: 'string', description: app.utils.docs.translate.property('keywordType') },
                name: { type: 'string', description: app.utils.docs.translate.property('name'), required: true },
                vocaType: { type: 'string', description: app.utils.docs.translate.property('vocaType') }
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
      const dicionaryId = uuidv1()
      const found = await app.models.dictionary.findOne({ where: { name: data.name } })
      if (found) {
        await app.utils.errors.handle(app, { statusCode: 404, errorCode: 20014 })
      }
      await app.models.dictionary.create({
        id: dicionaryId,
        name: data.name,
        vocaType: data.vocaType,
        approvalState: 'accept',
        issuerId: params.user.username,
        issued: Date.now()
      })
      return { id: dicionaryId }
    }
  }
}

/**
 * getKeywordList api
 */
module.exports.getKeywordList = (app) => {
  return {
    docs: {
      find: {
        summary: app.utils.docs.translate.default('Get Keyword List'),
        description: app.utils.docs.translate.default('Get Keyword List'),
        parameters: [
          {
            description: app.utils.docs.translate.property('name'),
            in: 'query',
            name: 'name',
            type: 'string',
            required: false
          },
          {
            description: app.utils.docs.translate.property('vocaType'),
            in: 'query',
            name: 'vocaType',
            type: 'string',
            required: false
          },
          {
            description: app.utils.docs.translate.property('offset'),
            in: 'query',
            name: 'offset',
            type: 'string',
            required: false
          },
          {
            description: app.utils.docs.translate.property('limit'),
            in: 'query',
            name: 'limit',
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
      let selectQuery = ``
      let countQuery = ``
      const queryParams = {}
      selectQuery = `select
                          id,
                          name,
                          voca_type as "vocaType",
                          issuer_id as "issuerId",
                          issued
                    from dictionary
                    where 1=1 `
      countQuery = `select
                          count(1) as totalCount
                    from dictionary
                    where 1=1 `

      if (params.query.name) {
        selectQuery += ` and name like '%${params.query.name}%'`
        countQuery += ` and name like '%${params.query.name}%'`
      }

      if (params.query.vocaType) {
        selectQuery += ` and voca_type = '${params.query.vocaType}'`
        countQuery += ` and voca_type = '${params.query.vocaType}'`
      }
      selectQuery += ` limit :limit offset :offset`
      queryParams.limit = params.query.limit || 18
      queryParams.offset = params.query.offset || 0
      const response = {}
      const totalCount = await app.models.sequelize.query(countQuery, {replacements: queryParams, type: app.models.sequelize.QueryTypes.SELECT})
      response.total = Number(totalCount[0].totalcount)
      response.lists = await app.models.sequelize.query(selectQuery, {replacements: queryParams, type: app.models.sequelize.QueryTypes.SELECT})
      return response || {}
    }
  }
}

/**
 * getKeyword api
 */
module.exports.getKeyword = (app) => {
  return {
    docs: {
      find: {
        summary: app.utils.docs.translate.default('Get Keyword'),
        description: app.utils.docs.translate.default('Get Keyword'),
        parameters: [
          {
            description: app.utils.docs.translate.property('id'),
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
      const id = params.query.id
      const response = await app.models.dictionary.findOne({where: {id}})
      if (!response) {
        await app.utils.errors.handle(app, { statusCode: 404, errorCode: 20013 })
      }
      return response
    }
  }
}

/**
 * updateKeyword api
 */
module.exports.updateKeyword = (app) => {
  return {
    docs: {
      create: {
        summary: app.utils.docs.translate.default('Update Keyword'),
        description: app.utils.docs.translate.default('Update Keyword'),
        parameters: [
          {
            description: app.utils.docs.translate.property('Keyword'),
            in: 'body',
            name: 'body',
            required: true,
            schema: {
              type: 'object',
              properties: {
                id: { type: 'string', description: app.utils.docs.translate.property('id'), required: true },
                name: { type: 'string', description: app.utils.docs.translate.property('name') }
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
      const id = data.id
      const name = data.name
      const found = await app.models.dictionary.findOne({ where: { id } })
      if (!found) {
        await app.utils.errors.handle(app, { statusCode: 404, errorCode: 20013 })
      }
      await app.models.dictionary.update({ name, modifierId: params.user.username, modified: Date.now() }, { where: {id} })
      return { result: 'success' }
    }
  }
}

/**
 * deleteKeyword api
 */
module.exports.deleteKeyword = (app) => {
  return {
    docs: {
      create: {
        summary: app.utils.docs.translate.default('Remove Keyword'),
        description: app.utils.docs.translate.default('Remove Keyword'),
        parameters: [
          {
            description: app.utils.docs.translate.property('Keyword'),
            in: 'body',
            name: 'body',
            required: true,
            schema: {
              type: 'object',
              properties: {
                id: { type: 'string', description: app.utils.docs.translate.property('id'), required: true }
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
      const id = data.id
      const found = await app.models.dictionary.findOne({ where: { id } })
      if (!found) {
        await app.utils.errors.handle(app, { statusCode: 404, errorCode: 20013 })
      }
      await app.models.dictionary.destroy({where: {id}})
      return { result: 'success' }
    }
  }
}
