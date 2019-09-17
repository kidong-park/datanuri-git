/**
 *  Copyright (c) Electronics and Telecommunications Research Institute. All rights reserved.
 *  See License.txt in the project root for license information.
 */
const BOARD_TYPE = '2'
const BOARD_TYPE_TEXT = 'FAQ'

/**
 * getFaqList api
 */
module.exports.getFaqList = (app) => {
  return {
    docs: {
      find: {
        summary: app.utils.docs.translate.default('Get Faq List'),
        description: app.utils.docs.translate.default('Get Faq List'),
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
          },
          {
            description: app.utils.docs.translate.property('Search Value'),
            in: 'query',
            name: 'keyword',
            type: 'string',
            default: '',
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
                faqs: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      id: { type: 'string', description: app.utils.docs.translate.property('Id') },
                      title: { type: 'string', description: app.utils.docs.translate.property('Title') },
                      writerId: { type: 'string', description: app.utils.docs.translate.property('Writer Id') },
                      pageView: { type: 'integer', description: app.utils.docs.translate.property('Page View') },
                      issued: { type: 'string', description: app.utils.docs.translate.property('Issued') },
                      modifierId: { type: 'string', description: app.utils.docs.translate.property('Modifier Id') },
                      modified: { type: 'string', description: app.utils.docs.translate.property('Modified') }
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
      const boardNum = BOARD_TYPE
      const limit = params.query.limit || 10
      const offset = params.query.offset || 0
      const keyword = params.query.keyword || ''
      const Op = app.models.sequelize.Op
      const { count, rows } = await app.models.boardContents.findAndCountAll({
        attributes: [
          ['contents_num', 'id'],
          'title',
          'writerId',
          'pageView',
          'issued',
          'modifierId',
          'modified'
        ],
        order: [['issued', 'DESC']],
        where: {
          boardNum,
          title: { [Op.like]: '%' + keyword + '%' }
        },
        limit,
        offset })

      return {
        total: count,
        faqs: rows
      }
    }
  }
}

/**
 * getFaq api
 */
module.exports.getFaq = (app) => {
  return {
    docs: {
      find: {
        summary: app.utils.docs.translate.default('Get Faq'),
        description: app.utils.docs.translate.default('Get Faq'),
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
      app.models.boardContents.hasMany(app.models.attachment, { foreignKey: 'contentsNum' })
      app.models.attachment.belongsTo(app.models.boardContents, { foreignKey: 'contentsNum' })
      const boardNum = BOARD_TYPE
      const contentsNum = params.query.id
      const result = await app.models.boardContents.findOne({ where: { boardNum, contentsNum },
        include: [{
          required: false,
          model: app.models.attachment
        }]
      })
      if (!result) {
        await app.utils.errors.handle(app, { statusCode: 404, errorCode: 20015 })
      }
      // update pageView
      await app.models.boardContents.update({ pageView: app.models.sequelize.literal('page_view + 1') }, { where: { contentsNum, boardNum } })
      return result || {}
    }
  }
}

/**
 * saveFaq api
 */
module.exports.saveFaq = (app) => {
  return {
    docs: {
      create: {
        summary: app.utils.docs.translate.default('Save Faq'),
        description: app.utils.docs.translate.default('Save Faq'),
        parameters: [
          {
            description: app.utils.docs.translate.property('Faq'),
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
      await app.models.boardContents.create({ contentsNum, orgId: 'default_org', boardNum, boardType, writtenTimestamp, writerId: writerId || params.user.username, title, contents, pageView, issuerId, issued })
      return { id: contentsNum }
    }
  }
}

/**
 * updateFaq api
 */
module.exports.updateFaq = (app) => {
  return {
    docs: {
      create: {
        summary: app.utils.docs.translate.default('Update Faq'),
        description: app.utils.docs.translate.default('Update Faq'),
        parameters: [
          {
            description: app.utils.docs.translate.property('Faq'),
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
      const { id, title, contents } = data
      const modifierId = data.writerId || params.user.username
      const boardNum = BOARD_TYPE
      const found = await app.models.boardContents.findOne({ where: { contentsNum: id, boardNum } })
      if (!found) {
        await app.utils.errors.handle(app, { statusCode: 404, errorCode: 20015 })
      }
      const result = await app.models.boardContents.update(
        { title, contents, modified, modifierId },
        { where: { contentsNum: id, boardNum },
          returning: true }
      )
      return { result: result[0] ? 'success' : 'failed' }
    }
  }
}

/**
 * removeFaq api
 */
module.exports.removeFaq = (app) => {
  return {
    docs: {
      create: {
        summary: app.utils.docs.translate.default('Remove Faq'),
        description: app.utils.docs.translate.default('Remove Faq'),
        parameters: [
          {
            description: app.utils.docs.translate.property('Faq'),
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
      const boardNum = BOARD_TYPE
      const { id } = data
      const found = await app.models.boardContents.findOne({ where: { contentsNum: id, boardNum } })
      if (!found) {
        await app.utils.errors.handle(app, { statusCode: 404, errorCode: 20015 })
      }
      const result = await app.models.boardContents.destroy({ where: { contentsNum: id, boardNum } })
      return { result: result ? 'success' : 'failed' }
    }
  }
}
