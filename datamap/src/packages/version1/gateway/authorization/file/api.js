/**
 *  Copyright (c) Electronics and Telecommunications Research Institute. All rights reserved.
 *  See License.txt in the project root for license information.
 */

/**
 * setFileAuthorization api
 */
module.exports.setFileAuthorization = (app) => {
  return {
    docs: {
      create: {
        summary: app.utils.docs.translate.default('Set File Authorization'),
        description: app.utils.docs.translate.default('Set File Authorization'),
        parameters: [
          {
            description: app.utils.docs.translate.property('File Authorization'),
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
                acl: {
                  description: app.utils.docs.translate.property('Acl'),
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
      const operateData = { path: data.path, method: 'put', action: 'SETACL', payload: [{ name: 'aclspec', value: data.acl }], proxy: app.get('bigdata').hadoop.superuser }
      await app.v1.service('resource/file/operate').create(operateData, params)
      return { result: true }
    }
  }
}

/**
 * updateFileAuthorization api
 */
module.exports.updateFileAuthorization = (app) => {
  return {
    docs: {
      create: {
        summary: app.utils.docs.translate.default('Update File Authorization'),
        description: app.utils.docs.translate.default('Update File Authorization'),
        parameters: [
          {
            description: app.utils.docs.translate.property('File Authorization'),
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
                acl: {
                  description: app.utils.docs.translate.property('Acl'),
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
      const operateData = { path: data.path, method: 'put', action: 'MODIFYACLENTRIES', payload: [{ name: 'aclspec', value: data.acl }], proxy: app.get('bigdata').hadoop.superuser }
      await app.v1.service('resource/file/operate').create(operateData, params)
      return { result: true }
    }
  }
}

/**
 * removeFileAuthorization api
 */
module.exports.removeFileAuthorization = (app) => {
  return {
    docs: {
      create: {
        summary: app.utils.docs.translate.default('Remove File Authorization'),
        description: app.utils.docs.translate.default('Remove File Authorization'),
        parameters: [
          {
            description: app.utils.docs.translate.property('File Authorization'),
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
                acl: {
                  description: app.utils.docs.translate.property('Acl'),
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
                success: { type: 'boolean', description: app.utils.docs.translate.property('success') }
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
      // BUG: REMOVEACLENTRIES does not work with hdfs
      // const operateData = { path: data.path, method: 'put', action: 'REMOVEACLENTRIES', payload: [{ name: 'aclspec', value: data.acl }], proxy: app.get('bigdata').hadoop.superuser }
      // await app.v1.service('resource/file/operate').create(operateData, params)
      // return { result: true }
      const operateGetAclData = { path: data.path, action: 'GETACLSTATUS', proxy: app.get('bigdata').hadoop.superuser }
      const resultAcl = (await app.v1.service('resource/file/operate').create(operateGetAclData, params))
      const acl = resultAcl.data.AclStatus.entries.filter((entry) => entry !== data.acl).join(',')
      const operateRemoveAclData = { path: data.path, method: 'put', action: 'REMOVEACL', proxy: app.get('bigdata').hadoop.superuser }
      await app.v1.service('resource/file/operate').create(operateRemoveAclData, params)
      const operateData = { path: data.path, method: 'put', action: 'MODIFYACLENTRIES', payload: [{ name: 'aclspec', value: acl }], proxy: app.get('bigdata').hadoop.superuser }
      await app.v1.service('resource/file/operate').create(operateData, params)
      return { result: true }
    }
  }
}

/**
 * getFileAuthorization api
 */
module.exports.getFileAuthorization = (app) => {
  return {
    docs: {
      find: {
        summary: app.utils.docs.translate.default('Get File Authorization'),
        description: app.utils.docs.translate.default('Get File Authorization'),
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
      const operateData = { path: params.query.path, action: 'GETACLSTATUS', proxy: app.get('bigdata').hadoop.superuser }
      const { data } = (await app.v1.service('resource/file/operate').create(operateData, params))
      return data.AclStatus
    }
  }
}
