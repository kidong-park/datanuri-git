/**
 *  Copyright (c) Electronics and Telecommunications Research Institute. All rights reserved.
 *  See License.txt in the project root for license information.
 */

const SequelizeAuto = require('sequelize-auto')
const config = require('config')

/**
 * ORM Model generation
 */
async function modelGenerate () {
  const auto = new SequelizeAuto(config.database.postgres.name, config.database.postgres.username, config.database.postgres.password, {
    host: process.env['NODE_ENV'] !== 'docker' ? config.database.postgres.host : 'localhost',
    port: config.database.postgres.port,
    dialect: config.database.postgres.type,
    schema: config.database.postgres.schema,
    directory: config.database.postgres.directory,
    camelCase: true,
    camelCaseForFileName: true,
    additional: {
      timestamps: false,
      schema: config.database.postgres.schema
    }
  })

  auto.run((err) => {
    if (err) {
      /* eslint-disable */
      console.log(err)
      /* eslint-enable */
    } else {
      process.exit()
    }
  })
}

if (process.argv[1].indexOf('generators/model') !== -1) {
  modelGenerate()
}
