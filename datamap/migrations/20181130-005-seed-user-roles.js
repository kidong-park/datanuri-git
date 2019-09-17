/**
 *  Copyright (c) Electronics and Telecommunications Research Institute. All rights reserved.
 *  See License.txt in the project root for license information.
 */

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('user_role', [
      { user_id: 'sodas_admin', role_id: 'platform_admin', tenant_relation_id: 'sodas_admin##default_org', issuer_id: 'sodas_admin', issued: new Date() },
      { user_id: 'sodas_user', role_id: 'org_member', tenant_relation_id: 'sodas_user##default_org', issuer_id: 'sodas_admin', issued: new Date() }
    ], {})
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('user_role', { issuer_id: 'sodas_admin' }, {})
  }
}
