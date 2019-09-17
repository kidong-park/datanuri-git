/**
 *  Copyright (c) Electronics and Telecommunications Research Institute. All rights reserved.
 *  See License.txt in the project root for license information.
 */

const BOARD_TYPE = '3'
const BOARD_TYPE_TEXT = 'QnA'

/**
 * getAnswer api
 */
module.exports.getAnswer = (app) => {
  return {
    docs: {
      find: {
        summary: app.utils.docs.translate.default('Get Answer'),
        description: app.utils.docs.translate.default('Get Answer'),
        parameters: [
          {
            description: app.utils.docs.translate.property('Id'),
            in: 'query',
            name: 'id',
            type: 'string',
            required: true
          },
          {
            description: app.utils.docs.translate.property('pId'),
            in: 'query',
            name: 'pId',
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
                orgId: { type: 'string', description: app.utils.docs.translate.property('Org Id') },
                boardNum: { type: 'string', description: app.utils.docs.translate.property('Board Num') },
                boardType: { type: 'string', description: app.utils.docs.translate.property('Board Type') },
                writtenTimestamp: { type: 'string', description: app.utils.docs.translate.property('Written Timestamp') },
                writerId: { type: 'string', description: app.utils.docs.translate.property('Writer Id') },
                title: { type: 'string', description: app.utils.docs.translate.property('Title') },
                contents: { type: 'string', description: app.utils.docs.translate.property('Contents') },
                pageView: { type: 'integer', description: app.utils.docs.translate.property('Page View') },
                issuerId: { type: 'string', description: app.utils.docs.translate.property('Issuer Id') },
                issued: { type: 'string', description: app.utils.docs.translate.property('Issued') },
                pId: { type: 'string', description: app.utils.docs.translate.property('pId') },
                postingEnd: { type: 'string', description: app.utils.docs.translate.property('Posting End') },
                modifierId: { type: 'string', description: app.utils.docs.translate.property('Modifier Id') },
                modified: { type: 'string', description: app.utils.docs.translate.property('Modified') }
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
      const boardNum = BOARD_TYPE
      const contentsNum = params.query.id
      const pContentsNum = params.query.pId
      const result = await app.models.boardContents.findOne({
        attributes: [
          ['contents_num', 'id'],
          'title',
          'contents',
          'writerId',
          'issued',
          'modifierId',
          'modified'
        ],
        where: { contentsNum, pContentsNum, boardNum }
      })
      if (!result) {
        await app.utils.errors.handle(app, { statusCode: 404, errorCode: 20015 })
      }
      return result || {}
    }
  }
}

/**
 * saveAnswer api
 */
module.exports.saveAnswer = (app) => {
  return {
    docs: {
      create: {
        summary: app.utils.docs.translate.default('Save Answer'),
        description: app.utils.docs.translate.default('Save Answer'),
        parameters: [
          {
            description: app.utils.docs.translate.property('Answer'),
            in: 'body',
            name: 'body',
            required: true,
            schema: {
              type: 'object',
              properties: {
                writerId: {
                  description: app.utils.docs.translate.property('Writer Id'),
                  type: 'string',
                  required: false
                },
                pId: {
                  description: app.utils.docs.translate.property('pId'),
                  type: 'string',
                  required: true
                },
                title: {
                  description: app.utils.docs.translate.property('Title'),
                  type: 'string',
                  required: true
                },
                contents: {
                  description: app.utils.docs.translate.property('Contents'),
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
      const getContentsNum = function () {
        return '_' + Math.random().toString(36).substr(2, 9)
      }
      const contentsNum = getContentsNum()
      const writtenTimestamp = new Date()
      const pageView = 0
      const issuerId = data.writerId || params.user.username
      const issued = writtenTimestamp
      const boardNum = BOARD_TYPE
      const boardType = BOARD_TYPE_TEXT
      const { writerId, title, contents } = data
      const pContentsNum = data.pId
      await app.models.boardContents.create({ contentsNum, orgId: 'default_org', boardNum, boardType, pContentsNum, writtenTimestamp, writerId: writerId || params.user.username, title, contents, pageView, issuerId, issued })
      return { id: contentsNum }
    }
  }
}

/**
 * updateAnswer api
 */
module.exports.updateAnswer = (app) => {
  return {
    docs: {
      create: {
        summary: app.utils.docs.translate.default('Update Answer'),
        description: app.utils.docs.translate.default('Update Answer'),
        parameters: [
          {
            description: app.utils.docs.translate.property('board_contents'),
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
                pId: {
                  description: app.utils.docs.translate.property('pId'),
                  type: 'string',
                  required: true
                },
                writerId: {
                  description: app.utils.docs.translate.property('Writer Id'),
                  type: 'string',
                  required: false
                },
                title: {
                  description: app.utils.docs.translate.property('Title'),
                  type: 'string',
                  required: false
                },
                contents: {
                  description: app.utils.docs.translate.property('Contents'),
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
      const modified = new Date()
      const { title, contents } = data
      const pContentsNum = data.pId
      const contentsNum = data.id
      const modifierId = data.writerId || params.user.username
      const boardNum = BOARD_TYPE
      const found = await app.models.boardContents.findOne({ where: { contentsNum, pContentsNum, boardNum } })
      if (!found) {
        await app.utils.errors.handle(app, { statusCode: 404, errorCode: 20015 })
      }
      const result = await app.models.boardContents.update(
        { title, contents, modified, modifierId },
        { where: { boardNum, contentsNum, pContentsNum }, returning: true }
      )
      return { result: result[0] ? 'success' : 'failed' }
    }
  }
}

/**
 * removeAnswer api
 */
module.exports.removeAnswer = (app) => {
  return {
    docs: {
      create: {
        summary: app.utils.docs.translate.default('Remove Answer'),
        description: app.utils.docs.translate.default('Remove Answer'),
        parameters: [
          {
            description: app.utils.docs.translate.property('board_contents'),
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
                pId: {
                  description: app.utils.docs.translate.property('pId'),
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
      const boardNum = BOARD_TYPE
      const pContentsNum = data.pId
      const contentsNum = data.id
      const found = await app.models.boardContents.findOne({ where: { contentsNum, pContentsNum, boardNum } })
      if (!found) {
        await app.utils.errors.handle(app, { statusCode: 404, errorCode: 20015 })
      }
      const result = await app.models.boardContents.destroy({ where: { boardNum, contentsNum, pContentsNum } })
      return { result: result ? 'success' : 'failed' }
    }
  }
}
