/**
 *  Copyright (c) Electronics and Telecommunications Research Institute. All rights reserved.
 *  See License.txt in the project root for license information.
 */

const swagger = require('feathers-swagger')
const path = require('path')

/**
 * Docs register
 * @param {object} app - Feather's app
 */
module.exports = (app) => {
  app.configure(swagger({
    prefix: /api\/v\d\//,
    versionPrefix: /v\d/,
    docsPath: '/docs',
    uiIndex: path.join(__dirname, '../static/docs.html'),
    info: {
      title: 'SODAS',
      description: 'CHANGELOG: <br>' +
                   '- 2019-05-21 feat: created basic api documentation <br>' +
                   '- 2019-05-31 feat: complete resource and reference-model api <br>' +
                   '- 2019-06-07 feat: complete gateway api <br>' +
                   '- 2019-07-01 feat: complete harvesting api'
    },
    securityDefinitions: {
      bearer: {
        type: 'apiKey',
        name: 'authorization',
        in: 'header'
      }
    },
    security: [
      {
        bearer: []
      }
    ]
  }))
}
