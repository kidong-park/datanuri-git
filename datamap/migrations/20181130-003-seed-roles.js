/**
 *  Copyright (c) Electronics and Telecommunications Research Institute. All rights reserved.
 *  See License.txt in the project root for license information.
 */

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('role', [
      { role_id: 'platform_admin', role_name: 'platform_admin', issuer_id: 'sodas_admin', issued: new Date() },
      { role_id: 'system_admin', role_name: 'system_admin', issuer_id: 'sodas_admin', issued: new Date() },
      { role_id: 'standard_admin', role_name: 'standard_admin', issuer_id: 'sodas_admin', issued: new Date() },
      { role_id: 'org_admin', role_name: 'org_admin', issuer_id: 'sodas_admin', issued: new Date() },
      { role_id: 'org_standard_editor', role_name: 'org_standard_editor', issuer_id: 'sodas_admin', issued: new Date() },
      { role_id: 'org_data_editor', role_name: 'org_data_editor', issuer_id: 'sodas_admin', issued: new Date() },
      { role_id: 'org_member', role_name: 'org_member', issuer_id: 'sodas_admin', issued: new Date() }
    ], {})
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('role', { issuer_id: 'sodas_admin' }, {})
  }
}
