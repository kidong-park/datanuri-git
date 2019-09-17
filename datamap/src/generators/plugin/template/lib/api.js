/**
 *  Copyright (c) Electronics and Telecommunications Research Institute. All rights reserved.
 *  See License.txt in the project root for license information.
 */

module.exports = (app) => {
  const api = (app) => {
    return {
      docs: {
        find: {
          summary: 'api summary',
          description: 'api description',
          parameters: [],
          responses: {
            500: {
              description: 'Server Error'
            }
          }
        },
        create: {
          summary: 'api summary',
          description: 'api description',
          parameters: [],
          responses: {
            500: {
              description: 'Server Error'
            }
          }
        }
      },
      // GET method
      async find (params) {
        return params
      },
      // POST method
      async create (data, params) {
        return data
      }
    }
  }
  app.v1.use('/{{ name }}/api', api(app))
}
