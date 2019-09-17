/**
 *  Copyright (c) Electronics and Telecommunications Research Institute. All rights reserved.
 *  See License.txt in the project root for license information.
 */

const fs = require('fs-extra')
const path = require('path')
const Umzug = require('umzug')
const config = require('config')
const Sequelize = require('sequelize')
const { winston } = require('../../utils/logger')

/**
 * Migration up and down
 * @external https://codeburst.io/sequelize-migrations-setting-up-associations-985d29b61ee7
 * @param {object} argv - argument
 */
async function migrationGenerate (argv) {
  const sequelize = new Sequelize(config.database.postgres.name, config.database.postgres.username, config.database.postgres.password, {
    host: config.database.postgres.host,
    port: config.database.postgres.port,
    dialect: config.database.postgres.type,
    schema: config.database.postgres.schema,
    operatorsAliases: false,
    logging: winston.debug
  })
  const tmp = path.join(__dirname, `../../../${config.migrationDir}`)
  await fs.ensureDir(tmp)
  const umzug = new Umzug({
    storage: 'json',
    storageOptions: {
      path: path.join(tmp, 'migrations.json')
    },
    migrations: {
      params: [
        sequelize.getQueryInterface(),
        Sequelize
      ],
      path: path.join(__dirname, '../../../migrations')
    }
  })
  if (argv[2] === 'up') {
    await umzug.up()
  } else {
    await umzug.down()
  }
  process.exit(0)
}

if (process.argv[1].indexOf('migration') !== -1) {
  migrationGenerate(process.argv)
}
