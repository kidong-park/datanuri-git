/**
 *  Copyright (c) Electronics and Telecommunications Research Institute. All rights reserved.
 *  See License.txt in the project root for license information.
 */

const winston = require('winston')
const util = require('util')
const config = require('config')
const path = require('path')
const logger = new winston.Logger()
const loggerDB = new winston.Logger()
const Postgres = require('winston-postgres').Postgres

// Store logs into DB
const { postgres } = config.get('database')
loggerDB.add(Postgres, {
  ssl: false,
  timestamp: true,
  connectionString: `postgres://${postgres.username}:${postgres.password}@${postgres.host}:${postgres.port}/${postgres.name}`,
  tableName: 'winston_logs'
})

if (config.get('logger').console) {
  logger.add(winston.transports.Console, {
    level: config.get('logger').level,
    colorize: true
  })
}

logger.add(winston.transports.File, {
  level: config.get('logger').level,
  filename: path.join(__dirname, `../../${config.get('logger').file}`),
  json: true,
  stringify: (obj) => JSON.stringify(obj)
})

module.exports.winston = logger

/**
 * Hook logger
 */
module.exports.hook = () => {
  return context => {
    logger.debug(`${context.type} app.service('${context.path}').${context.method}()`)
    if (typeof context.toJSON === 'function' && logger.level === 'debug') {
      logger.debug('Hook Context', util.inspect(context.params, { colors: false }))
    }
    if (context.error) {
      logger.error(context.path, context.error.stack)
    }
  }
}

/**
 * hookAccess logger
 */
module.exports.hookAccess = () => {
  return context => {
    if (context.method === 'create' && context.params.user) {
      const api = context.path
      const username = context.params.user.username
      loggerDB.info(api, username)
    }
  }
}
