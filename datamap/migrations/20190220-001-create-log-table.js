/**
 *  Copyright (c) Electronics and Telecommunications Research Institute. All rights reserved.
 *  See License.txt in the project root for license information.
 */

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('winston_logs', {
      message: Sequelize.STRING,
      level: Sequelize.STRING,
      meta: Sequelize.JSONB
    })
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('winston_logs')
  }
}
