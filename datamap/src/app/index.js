/**
 *  Copyright (c) Electronics and Telecommunications Research Institute. All rights reserved.
 *  See License.txt in the project root for license information.
 */

const path = require('path')
const favicon = require('serve-favicon')
const compress = require('compression')
const helmet = require('helmet')
const cors = require('cors')
const feathers = require('@feathersjs/feathers')
const configuration = require('@feathersjs/configuration')
const express = require('@feathersjs/express')
const feathersLogger = require('feathers-logger')
const versionate = require('feathers-versionate')
const authentication = require('./authentication')
const docs = require('./docs')
const plugins = require('./plugins')
const packages = require('../packages')
const utils = require('../utils')
const models = require('../models')

const app = express(feathers())
app.utils = utils
app.models = models
app.configure(configuration())
app.use(helmet())
app.use(cors({ exposedHeaders: 'content-disposition' }))
app.use(compress())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(favicon(path.join('./src/static', 'favicon.ico')))
app.use('/', express.static('./src/static'))
app.configure(feathersLogger(app.utils.logger.winston))
app.configure(express.rest())
app.configure(versionate())
app.versionate('v1', '/api/v1/')
app.versionate('v2', '/api/v2/')
app.configure(docs)
app.configure(authentication)
app.configure(plugins.api)
app.configure(packages.api)
app.configure(plugins.validator)
app.configure(packages.validator)
app.configure(plugins.hook)
app.use(express.notFound())
app.use(express.errorHandler({ html: false, logger: utils.logger.winston, json: app.utils.errors.handleFeather }))
app.hooks({ before: { all: [utils.logger.hook()] }, after: { all: [utils.logger.hook(), utils.logger.hookAccess()] }, error: { all: [utils.logger.hook()] } })

module.exports = app
