/**
 *  Copyright (c) Electronics and Telecommunications Research Institute. All rights reserved.
 *  See License.txt in the project root for license information.
 */

const fs = require('fs')
const path = require('path')
const Sequelize = require('sequelize')
const Influx = require('influx')
const config = require('config')
const { winston } = require('../utils/logger')
const models = {}

const sequelize = new Sequelize(config.database.postgres.name, config.database.postgres.username, config.database.postgres.password, {
  host: config.database.postgres.host,
  port: config.database.postgres.port,
  dialect: config.database.postgres.type,
  schema: config.database.postgres.schema,
  operatorsAliases: false,
  logging: winston.debug
})

const influx = new Influx.InfluxDB({
  host: config.database.influxdb.host,
  port: config.database.influxdb.port,
  database: config.database.influxdb.name,
  username: config.database.influxdb.username,
  password: config.database.influxdb.password
})

fs.readdirSync(__dirname).filter((file) => {
  return (file.indexOf('.') !== 0) && (file !== path.basename(module.filename)) && (file.slice(-3) === '.js')
}).forEach((file) => {
  const model = sequelize['import'](path.join(__dirname, file))
  models[model.name] = model
})

Object.keys(models).forEach((modelName) => {
  if (models[modelName].associate) {
    models[modelName].associate(models)
  }
})

models.sequelize = sequelize
models.Sequelize = Sequelize

models.influx = influx
models.Influx = Influx

module.exports = models
