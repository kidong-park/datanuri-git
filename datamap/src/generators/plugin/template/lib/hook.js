/**
 *  Copyright (c) Electronics and Telecommunications Research Institute. All rights reserved.
 *  See License.txt in the project root for license information.
 */

module.exports = (app) => {
  app.v1.service('/{{ name }}/api').hooks({
    after: {
      async find (context) {
      },
      async create (context) {
      }
    }
  })
}
