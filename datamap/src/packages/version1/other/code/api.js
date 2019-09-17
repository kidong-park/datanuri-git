/**
 *  Copyright (c) Electronics and Telecommunications Research Institute. All rights reserved.
 *  See License.txt in the project root for license information.
 */

module.exports.getCodeList = (app) => {
  return {
    docs: {
      find: {
        summary: app.utils.docs.translate.default('Get Code List'),
        description: app.utils.docs.translate.default('Get Code List'),
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
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  id: { type: 'string', description: app.utils.docs.translate.property('Id') },
                  group: { type: 'string', description: app.utils.docs.translate.property('Group') },
                  name: { type: 'string', description: app.utils.docs.translate.property('Name') },
                  nameKr: { type: 'string', description: app.utils.docs.translate.property('Name (Korean)') },
                  issuer: { type: 'string', description: app.utils.docs.translate.property('Issuer') },
                  issued: { type: 'string', description: app.utils.docs.translate.property('Issued') }
                }
              }
            }
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
        security: []
      }
    },
    async find (params) {
      const limit = params.query.limit || 10
      const offset = params.query.offset || 0
      const { count, rows } = await app.models.commonCode.findAndCountAll({
        attributes: [['code', 'id'], ['cdgrp_code', 'group'], ['code_name', 'name'], ['code_name_kor', 'nameKr'], ['issuer_id', 'issuer'], 'issued'],
        limit: limit,
        offset: offset
      })
      return { total: count, codes: rows }
    }
  }
}

module.exports.getCode = (app) => {
  return {
    docs: {
      find: {
        summary: app.utils.docs.translate.default('Get Code'),
        description: app.utils.docs.translate.default('Get Code'),
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
                group: { type: 'string', description: app.utils.docs.translate.property('Group') },
                name: { type: 'string', description: app.utils.docs.translate.property('Name') },
                nameKr: { type: 'string', description: app.utils.docs.translate.property('Name (Korean)') },
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
        security: []
      }
    },
    async find (params) {
      const id = params.query.id
      const result = await app.models.commonCode.findOne({
        attributes: [['code', 'id'], ['cdgrp_code', 'group'], ['code_name', 'name'], ['code_name_kor', 'nameKr'], 'description', ['issuer_id', 'issuer'], 'issued'],
        where: { code: id }
      })
      if (!result) {
        await app.utils.errors.handle(app, { statusCode: 404, errorCode: 1100004 })
      }
      return result
    }
  }
}

module.exports.saveCode = (app) => {
  return {
    docs: {
      create: {
        summary: app.utils.docs.translate.default('Save Code'),
        description: app.utils.docs.translate.default('Save Code'),
        parameters: [
          {
            description: app.utils.docs.translate.property('Code'),
            in: 'body',
            name: 'body',
            required: true,
            schema: {
              type: 'object',
              properties: {
                groupId: {
                  description: app.utils.docs.translate.property('groupId'),
                  type: 'string',
                  required: true
                },
                name: {
                  description: app.utils.docs.translate.property('name'),
                  type: 'string',
                  required: true
                },
                nameKr: {
                  description: app.utils.docs.translate.property('nameKr'),
                  type: 'string',
                  required: true
                },
                description: {
                  description: app.utils.docs.translate.property('description'),
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
    async create (data, params) {
      const { groupId, name, nameKr, description } = data

      const targetGroup = await app.models.commonCodeGroup.find({ where: { cdgrpCode: groupId } })
      if (!targetGroup) {
        await app.utils.errors.handle(app, { statusCode: 404, errorCode: 1100003 })
      }

      const total = await app.models.commonCode.count()
      const code = await idGenerator(app.models.commonCode, 'code', total, app)

      await app.models.commonCode.create({
        cdgrpCode: groupId,
        codeName: name,
        codeNameKor: nameKr,
        description: description,
        issuerId: params.user.username,
        issued: new Date(Date.now()),
        code: code
      })

      return { id: code }
    }
  }
}

module.exports.updateCode = (app) => {
  return {
    docs: {
      create: {
        summary: app.utils.docs.translate.default('Update Code'),
        description: app.utils.docs.translate.default('Update Code'),
        parameters: [
          {
            description: app.utils.docs.translate.property('Code'),
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
                groupId: {
                  description: app.utils.docs.translate.property('groupId'),
                  type: 'string',
                  required: false
                },
                name: {
                  description: app.utils.docs.translate.property('name'),
                  type: 'string',
                  required: false
                },
                nameKr: {
                  description: app.utils.docs.translate.property('nameKr'),
                  type: 'string',
                  required: false
                },
                description: {
                  description: app.utils.docs.translate.property('description'),
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
    async create (data, params) {
      const { id, groupId, name, nameKr, description } = data
      const found = app.models.commonCode.findOne({ where: { code: data.id } })
      if (!found) {
        await app.utils.errors.handle(app, { statusCode: 404, errorCode: 1100004 })
      }
      const targetGroup = await app.models.commonCodeGroup.find({ where: { cdgrpCode: groupId } })
      if (!targetGroup) {
        await app.utils.errors.handle(app, { statusCode: 404, errorCode: 1100003 })
      }

      await app.models.commonCode.update({
        code: id,
        cdgrpCode: groupId,
        codeName: name,
        codeNameKor: nameKr,
        description: description,
        modifierId: params.user.username,
        modified: new Date(Date.now())
      }, { where: { code: id } })

      return { result: 'success' }
    }
  }
}

module.exports.removeCode = (app) => {
  return {
    docs: {
      create: {
        summary: app.utils.docs.translate.default('Remove Code'),
        description: app.utils.docs.translate.default('Remove Code'),
        parameters: [
          {
            description: app.utils.docs.translate.property('Code'),
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
      const found = app.models.commonCode.findOne({ where: { code: data.id } })
      if (!found) {
        await app.utils.errors.handle(app, { statusCode: 404, errorCode: 1100004 })
      }
      await app.models.commonCode.destroy({ where: { code: data['id'] } })
      return { result: 'success' }
    }
  }
}

module.exports.getCodeGroupList = (app) => {
  return {
    docs: {
      find: {
        summary: app.utils.docs.translate.default('Get Code Group List'),
        description: app.utils.docs.translate.default('Get Code Group List'),
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
                groups: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      id: { type: 'string', description: app.utils.docs.translate.property('Id') },
                      name: { type: 'string', description: app.utils.docs.translate.property('name') },
                      description: { type: 'string', description: app.utils.docs.translate.property('description') }
                    }
                  }
                }
              }
            }
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
        security: []
      }
    },
    async find (params) {
      const limit = params.query.limit || 10
      const offset = params.query.offset || 0
      const { count, rows } = await app.models.commonCodeGroup.findAndCountAll({
        attributes: [['cdgrp_code', 'id'], ['cdgrp_name', 'name'], ['cdgrp_description', 'description']],
        limit: limit,
        offset: offset
      })
      return { total: count, groups: rows }
    }
  }
}

module.exports.getCodeGroup = (app) => {
  return {
    docs: {
      find: {
        summary: app.utils.docs.translate.default('Get Code Group'),
        description: app.utils.docs.translate.default('Get Code Group'),
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
            description: app.utils.docs.translate.property('Successful'),
            schema: {
              type: 'object',
              properties: {
                id: { type: 'string', description: app.utils.docs.translate.property('Id') },
                name: { type: 'string', description: app.utils.docs.translate.property('name') },
                description: { type: 'string', description: app.utils.docs.translate.property('description') },
                codes: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      id: { type: 'string', description: app.utils.docs.translate.property('Id') },
                      name: { type: 'string', description: app.utils.docs.translate.property('name') }
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
        security: []
      }
    },
    async find (params) {
      const id = params.query.id
      app.models.commonCodeGroup.hasMany(app.models.commonCode, { foreignKey: 'cdgrpCode' })
      app.models.commonCode.belongsTo(app.models.commonCodeGroup, { foreignKey: 'cdgrpCode' })
      const result = await app.models.commonCodeGroup.findOne({
        attributes: [['cdgrp_code', 'id'], ['cdgrp_name', 'name'], ['cdgrp_description', 'description']],
        where: { cdgrpCode: id },
        include: [{
          required: false,
          model: app.models.commonCode,
          attributes: [['code', 'id'], ['cdgrp_code', 'group'], ['code_name', 'name'], ['code_name_kor', 'nameKr'], ['issuer_id', 'issuer'], 'issued']
        }]
      })
      if (!result) {
        await app.utils.errors.handle(app, { statusCode: 404, errorCode: 1100003 })
      }
      return result
    }
  }
}

module.exports.saveCodeGroup = (app) => {
  return {
    docs: {
      create: {
        summary: app.utils.docs.translate.default('Save Code Group'),
        description: app.utils.docs.translate.default('Save Code Group'),
        parameters: [
          {
            description: app.utils.docs.translate.property('Code Group'),
            in: 'body',
            name: 'body',
            required: true,
            schema: {
              type: 'object',
              properties: {
                name: {
                  description: app.utils.docs.translate.property('name'),
                  type: 'string',
                  required: true
                },
                description: {
                  description: app.utils.docs.translate.property('description'),
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
    async create (data, params) {
      const { name, description } = data

      const total = await app.models.commonCodeGroup.count()
      const code = await idGenerator(app.models.commonCodeGroup, 'cdgrp_code', total, app)

      await app.models.commonCodeGroup.create({
        cdgrpCode: code,
        cdgrpName: name,
        cdgrpDescription: description
      })

      return { id: code }
    }
  }
}

module.exports.updateCodeGroup = (app) => {
  return {
    docs: {
      create: {
        summary: app.utils.docs.translate.default('Update Code Group'),
        description: app.utils.docs.translate.default('Update Code Group'),
        parameters: [
          {
            description: app.utils.docs.translate.property('Code Group'),
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
                  description: app.utils.docs.translate.property('name'),
                  type: 'string',
                  required: false
                },
                description: {
                  description: app.utils.docs.translate.property('description'),
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
    async create (data, params) {
      const { id, name, description } = data
      const found = app.models.commonCodeGroup.findOne({ where: { cdgrpCode: id } })
      if (!found) {
        await app.utils.errors.handle(app, { statusCode: 404, errorCode: 1100003 })
      }
      await app.models.commonCodeGroup.update({
        cdgrpCode: id,
        cdgrpName: name,
        cdgrpDescription: description
      }, { where: { cdgrpCode: id } })

      return { result: 'success' }
    }
  }
}

module.exports.removeCodeGroup = (app) => {
  return {
    docs: {
      create: {
        summary: app.utils.docs.translate.default('Remove Code Group'),
        description: app.utils.docs.translate.default('Remove Code Group'),
        parameters: [
          {
            description: app.utils.docs.translate.property('Code Group'),
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
    async create (data, params) {
      const cdgrpCode = data['id']
      const found = app.models.commonCodeGroup.findOne({ where: { cdgrpCode } })
      if (!found) {
        await app.utils.errors.handle(app, { statusCode: 404, errorCode: 1100003 })
      }
      const codes = await app.models.commonCode.findAll({ raw: true, where: { cdgrpCode: cdgrpCode } })
      if (!Array.isArray(codes) || codes.length) {
        await app.utils.errors.handle(app, { statusCode: 404, errorCode: 1100005 })
      }
      await app.models.commonCodeGroup.destroy({ where: { cdgrpCode: cdgrpCode } })
      return { result: 'success' }
    }
  }
}

async function idGenerator (model, attribute, total, app) {
  let code = 0
  const sequelize = app.models.sequelize
  if (total) {
    const lastEntry = await model.findOne({
      attributes: [attribute],
      limit: 1,
      order: [[ sequelize.cast(sequelize.col(attribute), 'INT'), 'DESC' ]],
      raw: true
    })

    code = parseInt(lastEntry[attribute]) + 1
  }

  return code
}
