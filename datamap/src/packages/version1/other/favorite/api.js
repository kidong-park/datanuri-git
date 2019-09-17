/**
 *  Copyright (c) Electronics and Telecommunications Research Institute. All rights reserved.
 *  See License.txt in the project root for license information.
 */

/**
 * getFavoriteList api
 */
module.exports.getFavoriteList = (app) => {
  return {
    docs: {
      find: {
        summary: app.utils.docs.translate.default('Get Favorite List'),
        description: app.utils.docs.translate.default('Get Favorite List'),
        parameters: [
          {
            description: app.utils.docs.translate.property('Object Type'),
            in: 'query',
            name: 'objectType',
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
          },
          {
            description: app.utils.docs.translate.property('Sort'),
            in: 'query',
            name: 'sort',
            type: 'integer',
            default: 0,
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
                      followerId: { type: 'string', description: app.utils.docs.translate.property('Follower Id') },
                      objectId: { type: 'string', description: app.utils.docs.translate.property('Object Id') },
                      issued: { type: 'string', description: app.utils.docs.translate.property('Issued') },
                      objectType: { type: 'string', description: app.utils.docs.translate.property('Object Type') },
                      issuerId: { type: 'string', description: app.utils.docs.translate.property('Issuer Id') },
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
      const followerId = params.user.username
      const {
        objectType,
        limit,
        offset
      } = params.query
      const where = { followerId, objectType }
      const Op = app.models.Sequelize.Op

      if (objectType === undefined) {
        where.objectType = {
          [Op.or]: ['dataset', 'api']
        }
      }

      const {count, rows} = (await app.models.userFollowingObject.findAndCountAll({
        where,
        limit,
        offset,
        raw: true
      }))

      return { total: count, rows }
    }
  }
}

/**
 * saveFavorite api
 */
module.exports.saveFavorite = (app) => {
  return {
    docs: {
      create: {
        summary: app.utils.docs.translate.default('Save Favorite'),
        description: app.utils.docs.translate.default('Save Favorite'),
        parameters: [
          {
            description: app.utils.docs.translate.property('user_following_object'),
            in: 'body',
            name: 'body',
            required: true,
            schema: {
              type: 'object',
              properties: {
                objectId: {
                  description: app.utils.docs.translate.property('Object Id'),
                  type: 'string',
                  required: true
                },
                objectType: {
                  description: app.utils.docs.translate.property('Object Type'),
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
      const followerId = params.user.username
      const issued = new Date()
      const { objectId, objectType } = data
      const issuerId = followerId
      let result

      await app.models.userFollowingObject.findOrCreate({ where: { followerId, objectId, objectType }, defaults: { followerId, objectId, objectType, issuerId, issued } })
        .spread(function (userFollowingObject, created) {
          result = userFollowingObject.get({
            plain: true
          })
          result['created'] = created
        })
      return { result: 'success' }
    }
  }
}

/**
 * removeFavorite api
 */
module.exports.removeFavorite = (app) => {
  return {
    docs: {
      create: {
        summary: app.utils.docs.translate.default('Remove Favorite'),
        description: app.utils.docs.translate.default('Remove Favorite'),
        parameters: [
          {
            description: app.utils.docs.translate.property('user_following_object'),
            in: 'body',
            name: 'body',
            required: true,
            schema: {
              type: 'object',
              properties: {
                objectId: {
                  description: app.utils.docs.translate.property('Object Id'),
                  type: 'array',
                  required: true,
                  items: {}
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
    deleteRows: function (data) {
      const { followerId, objectId } = data
      const result = objectId.map(async (id) => {
        const results = await app.models.userFollowingObject.destroy({ where: { followerId, objectId: id } })
        return results
      })
      return Promise.all(result)
    },
    // POST method
    async create (data, params) {
      return this.deleteRows({ followerId: params.user.username, objectId: data.objectId })
        .then(result => {
          return {
            result: 'success'
          }
        })
        .catch(err => {
          return {
            result: 'failed',
            err
          }
        })
    }
  }
}
