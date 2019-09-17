/**
 *  Copyright (c) Electronics and Telecommunications Research Institute. All rights reserved.
 *  See License.txt in the project root for license information.
 */

/**
 * getUserList api
 */
module.exports.getUserList = (app) => {
  return {
    docs: {
      find: {
        summary: app.utils.docs.translate.default('Get User List'),
        description: app.utils.docs.translate.default('Get User List'),
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
                users: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      id: { type: 'string', description: app.utils.docs.translate.property('Id') },
                      firstName: { type: 'string', description: app.utils.docs.translate.property('First Name') },
                      lastName: { type: 'string', description: app.utils.docs.translate.property('Last Name') },
                      email: { type: 'string', description: app.utils.docs.translate.property('Email') },
                      issuer: { type: 'string', description: app.utils.docs.translate.property('Issuer') },
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
        attributes: ['id', ['name', 'firstName'], 'email', ['family_name', 'lastName'], ['issuer_id', 'issuer'], 'issued'],
        limit: limit || 10,
        offset: offset || 0,
        where: { tenantType: 'user' } }
      const { count, rows } = await app.models.tenant.findAndCountAll(query)
      return {
        total: count,
        users: rows
      }
    }
  }
}

/**
 * getUser api
 */
module.exports.getUser = (app) => {
  return {
    docs: {
      find: {
        summary: app.utils.docs.translate.default('Get User'),
        description: app.utils.docs.translate.default('Get User'),
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
                firstName: { type: 'string', description: app.utils.docs.translate.property('First Name') },
                lastName: { type: 'string', description: app.utils.docs.translate.property('Last Name') },
                email: { type: 'string', description: app.utils.docs.translate.property('Email') },
                issuer: { type: 'string', description: app.utils.docs.translate.property('Issuer') },
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
        attributes: ['id', ['name', 'firstName'], 'email', ['family_name', 'lastName'], ['issuer_id', 'issuer'], 'issued'],
        // where: { id: id || params.user.username }
        where: { id }
      }
      // if (!params.user.roles.includes('platform_admin')) {
      //   query.where.id = params.user.username
      // }
      const result = await app.models.tenant.findOne(query)
      if (!result) {
        await app.utils.errors.handle(app, { statusCode: 404, errorCode: 10013 })
      }
      return result
    }
  }
}

/**
 * saveUser api
 */
module.exports.saveUser = (app) => {
  return {
    docs: {
      create: {
        summary: app.utils.docs.translate.default('Save User'),
        description: app.utils.docs.translate.default('Save User'),
        parameters: [
          {
            description: app.utils.docs.translate.property('User'),
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
                firstName: {
                  description: app.utils.docs.translate.property('First Name'),
                  type: 'string',
                  required: true
                },
                lastName: {
                  description: app.utils.docs.translate.property('Last Name'),
                  type: 'string',
                  required: true
                },
                email: {
                  description: app.utils.docs.translate.property('Email'),
                  type: 'string',
                  required: true
                },
                password: {
                  description: app.utils.docs.translate.property('Password'),
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
      const { id, firstName, lastName, email, password } = data
      const found = await app.models.tenant.findOne({ where: { id } })
      if (found) {
        await app.utils.errors.handle(app, { statusCode: 400, errorCode: 20024 })
      }
      await app.v1.service('tenant/sso/user/save').create({ id, firstName, lastName, email, password })
      await app.models.tenant.create({
        id,
        name: firstName,
        title: id,
        familyName: lastName,
        email,
        tenantType: 'user',
        approvalState: 'accept',
        state: 'active',
        issuerId: params.user.username,
        issued: new Date()
      })
      await app.v1.service('tenant/organization/member/save').create({ userId: id, organizationId: 'default_org', role: 'org_member' }, params)
      return { result: 'success' }
    }
  }
}

/**
 * updateUser api
 */
module.exports.updateUser = (app) => {
  return {
    docs: {
      create: {
        summary: app.utils.docs.translate.default('Update User'),
        description: app.utils.docs.translate.default('Update User'),
        parameters: [
          {
            description: app.utils.docs.translate.property('User'),
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
                firstName: {
                  description: app.utils.docs.translate.property('First Name'),
                  type: 'string',
                  required: false
                },
                lastName: {
                  description: app.utils.docs.translate.property('Last Name'),
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
      const { id, firstName, lastName } = data
      const found = await app.models.tenant.findOne({ where: { id } })
      if (!found) {
        await app.utils.errors.handle(app, { statusCode: 404, errorCode: 10013 })
      }
      await app.v1.service('tenant/sso/user/update').create({ id, firstName: firstName || found.firstName, lastName: lastName || found.familyName })
      await app.models.tenant.update({
        ...data,
        name: firstName,
        familyName: lastName,
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
 * removeUser api
 */
module.exports.removeUser = (app) => {
  return {
    docs: {
      create: {
        summary: app.utils.docs.translate.default('Remove User'),
        description: app.utils.docs.translate.default('Remove User (only non-member user)'),
        parameters: [
          {
            description: app.utils.docs.translate.property('User'),
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
      const found = await app.models.tenant.findOne({ where: { id } })
      if (!found) {
        await app.utils.errors.handle(app, { statusCode: 404, errorCode: 10013 })
      }
      const foundRelation = await app.models.tenantRelation.findOne({ where: { userId: id } })
      if (foundRelation) {
        await app.utils.errors.handle(app, { statusCode: 400, errorCode: 10015 })
      }
      await app.v1.service('tenant/sso/user/remove').create({ id })
      await app.models.tenant.destroy({ where: { id } })
      return { result: 'success' }
    }
  }
}

/**
 * resetUserPassword api
 */
module.exports.resetUserPassword = (app) => {
  return {
    docs: {
      create: {
        summary: app.utils.docs.translate.default('Reset User Password'),
        description: app.utils.docs.translate.default('Reset User Password'),
        parameters: [
          {
            description: app.utils.docs.translate.property('User'),
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
                password: { type: 'string', description: app.utils.docs.translate.property('Password') }
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
      return app.v1.service('tenant/sso/user/password/reset').create({ id })
    }
  }
}

/**
 * changeUserPassword api
 */
module.exports.changeUserPassword = (app) => {
  return {
    docs: {
      create: {
        summary: app.utils.docs.translate.default('Change User Password'),
        description: app.utils.docs.translate.default('Change User Password'),
        parameters: [
          {
            description: app.utils.docs.translate.property('User'),
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
                currentPassword: {
                  description: app.utils.docs.translate.property('Current Password'),
                  type: 'string',
                  required: true
                },
                newPassword: {
                  description: app.utils.docs.translate.property('New Password'),
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
      const { id, currentPassword, newPassword } = data
      return app.v1.service('tenant/sso/user/password/change').create({ id, currentPassword, newPassword })
    }
  }
}
