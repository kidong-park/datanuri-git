/**
 *  Copyright (c) Electronics and Telecommunications Research Institute. All rights reserved.
 *  See License.txt in the project root for license information.
 */

/**
 * getOrganizationList api
 */
module.exports.getOrganizationList = (app) => {
  return {
    docs: {
      find: {
        summary: app.utils.docs.translate.default('Get Organization List'),
        description: app.utils.docs.translate.default('Get Organization List'),
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
                organizations: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      id: { type: 'string', description: app.utils.docs.translate.property('Id') },
                      name: { type: 'string', description: app.utils.docs.translate.property('Name') },
                      description: { type: 'string', description: app.utils.docs.translate.property('Description') },
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
        attributes: ['id', 'name', 'description', ['issuer_id', 'issuer'], 'issued'],
        limit: limit || 10,
        offset: offset || 0,
        where: { tenantType: 'org' }
      }
      const { count, rows } = await app.models.tenant.findAndCountAll(query)
      return {
        total: count,
        organizations: rows
      }
    }
  }
}

/**
 * getOrganization api
 */
module.exports.getOrganization = (app) => {
  return {
    docs: {
      find: {
        summary: app.utils.docs.translate.default('Get Organization'),
        description: app.utils.docs.translate.default('Get Organization'),
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
                name: { type: 'string', description: app.utils.docs.translate.property('Name') },
                description: { type: 'string', description: app.utils.docs.translate.property('Description') },
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
        attributes: ['id', 'name', 'description', ['issuer_id', 'issuer'], 'issued'],
        where: { id }
      }
      const result = await app.models.tenant.find(query)
      if (!result) {
        await app.utils.errors.handle(app, { statusCode: 404, errorCode: 10014 })
      }
      return result
    }
  }
}

/**
 * saveOrganization api
 */
module.exports.saveOrganization = (app) => {
  return {
    docs: {
      create: {
        summary: app.utils.docs.translate.default('Save Organization'),
        description: app.utils.docs.translate.default('Save Organization'),
        parameters: [
          {
            description: app.utils.docs.translate.property('Organization'),
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
                name: {
                  description: app.utils.docs.translate.property('Name'),
                  type: 'string',
                  required: true
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
      const { id, name, description } = data
      const found = await app.models.tenant.findOne({ where: { id } })
      if (found) {
        await app.utils.errors.handle(app, { statusCode: 400, errorCode: 20024 })
      }
      await app.v1.service('tenant/sso/organization/save').create({ id })
      await app.models.tenant.create({
        id,
        name,
        title: name,
        description,
        tenantType: 'org',
        approvalState: 'accept',
        state: 'active',
        issuerId: params.user.username,
        issued: new Date()
      })
      return { result: 'success' }
    }
  }
}

/**
 * updateOrganization api
 */
module.exports.updateOrganization = (app) => {
  return {
    docs: {
      create: {
        summary: app.utils.docs.translate.default('Update Organization'),
        description: app.utils.docs.translate.default('Update Organization'),
        parameters: [
          {
            description: app.utils.docs.translate.property('Organization'),
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
                name: {
                  description: app.utils.docs.translate.property('Name'),
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
      const found = await app.models.tenant.findOne({ where: { id, tenantType: 'org' } })
      if (!found) {
        await app.utils.errors.handle(app, { statusCode: 404, errorCode: 10014 })
      }
      await app.models.tenant.update({
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
 * removeOrganization api
 */
module.exports.removeOrganization = (app) => {
  return {
    docs: {
      create: {
        summary: app.utils.docs.translate.default('Remove Organization'),
        description: app.utils.docs.translate.default('Remove Organization (only organization with 0 member)'),
        parameters: [
          {
            description: app.utils.docs.translate.property('Organization'),
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
      const found = await app.models.tenant.findOne({ where: { id, tenantType: 'org' } })
      if (!found) {
        await app.utils.errors.handle(app, { statusCode: 404, errorCode: 10014 })
      }
      const foundMember = await app.models.tenantRelation.findOne({ where: { orgId: id } })
      if (foundMember) {
        await app.utils.errors.handle(app, { statusCode: 400, errorCode: 10015 })
      }
      await app.v1.service('tenant/sso/organization/remove').create({ id })
      await app.models.tenant.destroy({ where: { id, tenantType: 'org' } })
      return { result: 'success' }
    }
  }
}

/**
 * getOrganizationMemberList api
 */
module.exports.getOrganizationMemberList = (app) => {
  return {
    docs: {
      find: {
        summary: app.utils.docs.translate.default('Get Organization Member List'),
        description: app.utils.docs.translate.default('Get Organization Member List'),
        parameters: [
          {
            description: app.utils.docs.translate.property('Tenant Id'),
            in: 'query',
            name: 'id',
            type: 'string',
            required: true
          },
          {
            description: app.utils.docs.translate.property('Tenant Type (user/organization)'),
            in: 'query',
            name: 'type',
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
            description: app.utils.docs.translate.response('Successful'),
            schema: {
              type: 'object',
              properties: {
                total: { type: 'integer', description: app.utils.docs.translate.property('Total') },
                members: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      organizationId: { type: 'string', description: app.utils.docs.translate.property('Organization Id') },
                      userId: { type: 'string', description: app.utils.docs.translate.property('User Id') },
                      issuer: { type: 'string', description: app.utils.docs.translate.property('Issuer') },
                      issued: { type: 'string', description: app.utils.docs.translate.property('Issued') },
                      roleId: { type: 'array', description: app.utils.docs.translate.property('Issued') }
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
      const { id, type, offset, limit } = params.query
      const where = type !== 'user' ? { orgId: id } : { userId: id }
      const query = {
        attributes: [['org_id', 'organizationId'], ['user_id', 'userId'], ['issuer_id', 'issuer'], 'issued'],
        limit: limit || 10,
        offset: offset || 0,
        where,
        include: [{
          model: app.models.userRole,
          attributes: [['role_id', 'roleId']]
        }]
      }
      if (!params.user.roles.includes('platform_admin')) {
        if (type !== 'user') {
          if (id === 'default_org' || !(params.user.organization.includes(id) && params.user.roles.includes('org_admin'))) {
            await app.utils.errors.handle(app, { statusCode: 401, errorCode: 10002 })
          }
        } else {
          query.where = { userId: params.user.username }
        }
      }
      app.models.tenantRelation.hasMany(app.models.userRole, { foreignKey: 'tenantRelationId' })
      app.models.userRole.belongsTo(app.models.tenantRelation, { foreignKey: 'tenantRelationId' })
      const { count, rows } = await app.models.tenantRelation.findAndCountAll(query)
      return {
        total: count,
        members: rows
      }
    }
  }
}

/**
 * saveOrganizationMember api
 */
module.exports.saveOrganizationMember = (app) => {
  return {
    docs: {
      create: {
        summary: app.utils.docs.translate.default('Save Organization Member'),
        description: app.utils.docs.translate.default('Save Organization Member (only non-member user)'),
        parameters: [
          {
            description: app.utils.docs.translate.property('Member'),
            in: 'body',
            name: 'body',
            required: true,
            schema: {
              type: 'object',
              properties: {
                userId: {
                  description: app.utils.docs.translate.property('Username'),
                  type: 'string',
                  required: true
                },
                organizationId: {
                  description: app.utils.docs.translate.property('Organization'),
                  type: 'string',
                  required: true
                },
                role: {
                  description: app.utils.docs.translate.property('Role'),
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
      const { userId, organizationId, role } = data
      const foundUser = await app.models.tenant.findOne({ where: { id: userId } })
      if (!foundUser) {
        await app.utils.errors.handle(app, { statusCode: 404, errorCode: 10013 })
      }
      const foundOrganization = await app.models.tenant.findOne({ where: { id: organizationId } })
      if (!foundOrganization) {
        await app.utils.errors.handle(app, { statusCode: 404, errorCode: 10014 })
      }
      // TODO: move to validator
      if (!params.user.roles.includes('platform_admin')) {
        if (organizationId === 'default_org' || !(params.user.organization.includes(organizationId) && params.user.roles.includes('org_admin'))) {
          await app.utils.errors.handle(app, { statusCode: 401, errorCode: 10002 })
        }
      }
      const found = await app.models.tenantRelation.findOne({ where: { userId } })
      if (found) {
        await app.utils.errors.handle(app, { statusCode: 400, errorCode: 10015 })
      }
      await app.v1.service('tenant/sso/organization/member/save').create({ organizationId, userId })
      const query = {
        id: `${userId}##${organizationId}`,
        userId,
        orgId: organizationId,
        approvalState: 'accept',
        issuerId: params.user.username,
        issued: new Date()
      }
      await app.models.tenantRelation.create(query)
      await app.v1.service('tenant/sso/organization/member/role/save').create({ id: userId, role })
      const queryRole = {
        userId,
        roleId: role,
        tenantRelationId: `${userId}##${organizationId}`,
        issuerId: params.user.username,
        issued: new Date()
      }
      await app.models.userRole.create(queryRole)
      return { result: 'success' }
    }
  }
}

/**
 * removeOrganizationMember api
 */
module.exports.removeOrganizationMember = (app) => {
  return {
    docs: {
      create: {
        summary: app.utils.docs.translate.default('Remove Organization Member'),
        description: app.utils.docs.translate.default('Remove Organization Member (only non-resource member)'),
        parameters: [
          {
            description: app.utils.docs.translate.property('Member'),
            in: 'body',
            name: 'body',
            required: true,
            schema: {
              type: 'object',
              properties: {
                userId: {
                  description: app.utils.docs.translate.property('Username'),
                  type: 'string',
                  required: true
                },
                organizationId: {
                  description: app.utils.docs.translate.property('Organization'),
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
      const { userId, organizationId } = data
      const found = await app.models.tenantRelation.findOne({ where: { userId, orgId: organizationId } })
      if (!found) {
        await app.utils.errors.handle(app, { statusCode: 404, errorCode: 10017 })
      }
      // TODO: move to validator
      if (!params.user.roles.includes('platform_admin')) {
        if (organizationId === 'default_org' || !(params.user.organization.includes(organizationId) && params.user.roles.includes('org_admin'))) {
          await app.utils.errors.handle(app, { statusCode: 401, errorCode: 10002 })
        }
      }
      const foundResource = await app.models.resource.findOne({ where: { publisherId: userId, ownerId: organizationId } })
      if (foundResource) {
        await app.utils.errors.handle(app, { statusCode: 400, errorCode: 20005 })
      }
      await app.v1.service('tenant/sso/organization/member/remove').create({ organizationId, userId })
      await app.models.tenantRelation.destroy({ where: { userId, orgId: organizationId } })
      const foundRole = await app.models.userRole.findOne({ where: { tenantRelationId: `${userId}##${organizationId}` } })
      if (!foundRole) {
        await app.utils.errors.handle(app, { statusCode: 404, errorCode: 10016 })
      }
      await app.v1.service('tenant/sso/organization/member/role/remove').create({ id: userId, role: foundRole.role })
      await app.models.userRole.destroy({ where: { tenantRelationId: `${userId}##${organizationId}` } })
      return { result: 'success' }
    }
  }
}
