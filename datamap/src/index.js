/**
 *  Copyright (c) Electronics and Telecommunications Research Institute. All rights reserved.
 *  See License.txt in the project root for license information.
 */

const i18next = require('i18next')
const backend = require('i18next-node-fs-backend')
const path = require('path')
const { ns } = require('./locales')
const config = require('config')

/**
 * Run Sodas Server
 */
function runServer () {
  i18next.use(backend).init({
    ns,
    lng: config.get('locale'),
    fallbackLng: 'en',
    defaultNS: 'service',
    backend: { loadPath: path.join(__dirname, './locales/{{lng}}/{{ns}}.json') }
  }, () => {
    const app = require('./app')
    const server = app.listen(app.get('port'))
    server.on('listening', () =>
      app.info('SODAS platform started on http://%s:%d', app.get('host'), app.get('port'))
    )
  })
}

runServer()
