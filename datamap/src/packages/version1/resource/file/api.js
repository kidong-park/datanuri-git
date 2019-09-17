/**
 *  Copyright (c) Electronics and Telecommunications Research Institute. All rights reserved.
 *  See License.txt in the project root for license information.
 */

const axios = require('axios')
const path = require('path')

/**
 * getFileList api
 */
module.exports.getFileList = (app) => {
  return {
    docs: {
      find: {
        summary: app.utils.docs.translate.default('Get File List'),
        description: app.utils.docs.translate.default('Get File List'),
        parameters: [
          {
            description: app.utils.docs.translate.property('Path'),
            in: 'query',
            name: 'path',
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
      const operateData = { path: params.query.path, action: 'LISTSTATUS', proxy: app.get('bigdata').hadoop.superuser }
      const { data } = (await app.v1.service('resource/file/operate').create(operateData, params))
      return data.FileStatuses.FileStatus
    }
  }
}

/**
 * getFile api
 */
module.exports.getFile = (app) => {
  return {
    docs: {
      find: {
        summary: app.utils.docs.translate.default('Get File'),
        description: app.utils.docs.translate.default('Get File'),
        parameters: [
          {
            description: app.utils.docs.translate.property('Path'),
            in: 'query',
            name: 'path',
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
      const operateData = { path: params.query.path, action: 'GETFILESTATUS', proxy: app.get('bigdata').hadoop.superuser }
      const { data } = (await app.v1.service('resource/file/operate').create(operateData, params))
      return data.FileStatus
    }
  }
}

/**
 * getFileContent api
 */
module.exports.getFileContent = (app) => {
  return {
    docs: {
      find: {
        summary: app.utils.docs.translate.default('Get File Content'),
        description: app.utils.docs.translate.default('Get File Content'),
        parameters: [
          {
            description: app.utils.docs.translate.property('Path'),
            in: 'query',
            name: 'path',
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
      const operateData = { path: params.query.path, action: 'OPEN', payload: [{ name: 'noredirect', value: 'true' }], proxy: app.get('bigdata').hadoop.superuser }
      const { redirect } = await app.v1.service('resource/file/operate').create(operateData, params)
      const request = require('request')
      const stream = request(redirect)
      const filename = params.query.filename || path.basename(params.query.path)
      return { filename, stream }
    }
  }
}

/**
 * saveFile api
 */
module.exports.saveFile = (app) => {
  return {
    docs: {
      create: {
        summary: app.utils.docs.translate.default('Save File'),
        description: app.utils.docs.translate.default('Save File'),
        parameters: [
          {
            description: app.utils.docs.translate.property('File'),
            in: 'body',
            name: 'body',
            required: true,
            schema: {
              type: 'object',
              properties: {
                content: {
                  description: app.utils.docs.translate.property('Content'),
                  type: 'string',
                  required: true
                },
                path: {
                  description: app.utils.docs.translate.property('Path'),
                  type: 'string',
                  required: true
                },
                permission: {
                  description: app.utils.docs.translate.property('Permission'),
                  type: 'string',
                  required: false
                },
                owner: {
                  description: app.utils.docs.translate.property('Owner'),
                  type: 'string',
                  required: false
                },
                groupOwner: {
                  description: app.utils.docs.translate.property('GroupOwner'),
                  type: 'string',
                  required: false
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
      const operateData = { path: data.path, method: 'put', action: 'CREATE', payload: [{ name: 'noredirect', value: 'true' }, { name: 'permission', value: data.permission || '750' }], proxy: app.get('bigdata').hadoop.superuser }
      const { redirect } = await app.v1.service('resource/file/operate').create(operateData, params)
      try {
        await axios.put(redirect, params.files[0].buffer)
      } catch (e) {
        await app.v1.service('resource/file/remove').create({ path: data.path }, params)
        await app.utils.errors.handle(app, { statusCode: 401, errorCode: 10005 })
      }
      if (data.owner || data.groupOwner) {
        const setOwnerOperateData = { path: data.path, method: 'put', action: 'SETOWNER', payload: [{ name: 'owner', value: data.owner }, { name: 'group', value: data.groupOwner }], proxy: app.get('bigdata').hadoop.superuser }
        await app.v1.service('resource/file/operate').create(setOwnerOperateData, params)
      }
      return { result: 'success' }
    }
  }
}

/**
 * removeFile api
 */
module.exports.removeFile = (app) => {
  return {
    docs: {
      create: {
        summary: app.utils.docs.translate.default('Remove File'),
        description: app.utils.docs.translate.default('Remove File'),
        parameters: [
          {
            description: app.utils.docs.translate.property('File'),
            in: 'body',
            name: 'body',
            required: true,
            schema: {
              type: 'object',
              properties: {
                path: {
                  description: app.utils.docs.translate.property('Path'),
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
      const operateData = { path: data.path, method: 'delete', action: 'DELETE', proxy: app.get('bigdata').hadoop.superuser }
      const re = await app.v1.service('resource/file/operate').create(operateData, params)
      return re.data
    }
  }
}

/**
 * operateFile api
 */
module.exports.operateFile = (app) => {
  return {
    docs: {
      create: {
        summary: app.utils.docs.translate.default('Operate File'),
        description: app.utils.docs.translate.default('Operate File'),
        parameters: [
          {
            description: app.utils.docs.translate.property('File'),
            in: 'body',
            name: 'body',
            required: true,
            schema: {
              type: 'object',
              properties: {
                path: {
                  description: app.utils.docs.translate.property('Path'),
                  type: 'string',
                  required: true
                },
                method: {
                  description: app.utils.docs.translate.property('Method'),
                  type: 'string',
                  required: false
                },
                action: {
                  description: app.utils.docs.translate.property('Action'),
                  type: 'string',
                  required: true
                },
                proxy: {
                  description: app.utils.docs.translate.property('Proxy'),
                  type: 'string',
                  required: false
                },
                payload: {
                  description: app.utils.docs.translate.property('Payload'),
                  type: 'array',
                  required: false,
                  items: {
                    type: 'object',
                    properties: {
                      name: {
                        description: app.utils.docs.translate.property('Name'),
                        type: 'string',
                        required: false
                      },
                      value: {
                        description: app.utils.docs.translate.property('Value'),
                        type: 'string',
                        required: false
                      }
                    }
                  }
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
      const { path, method, action, payload, proxy } = data
      const { authentication, hadoop } = app.get('bigdata')
      const token = await app.utils.kerberos.getToken(authentication, hadoop.master)
      const http = axios.create({ headers: { Authorization: `Negotiate ${token}` }, method: method || 'get', maxRedirects: 0 })
      const query = payload ? payload.reduce((re, item) => { re += `&${item.name.trim()}=${item.value.trim()}`; return re }, '') : ''
      const proxyUser = proxy && params.user.roles.includes('platform_admin') ? proxy : params.user.username
      try {
        app.debug(`${hadoop.hdfs}${path}?op=${action}&doas=${proxyUser}${query}`)
        const re = await http.request(`${hadoop.hdfs}${path}?op=${action}&doas=${proxyUser}${query}`)
        return { headers: re.headers, data: re.data, redirect: re.request.res.responseUrl }
      } catch (error) {
        return { headers: error.headers, data: error.data, redirect: error.response.headers.location }
      }
    }
  }
}
