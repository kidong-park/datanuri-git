/**
 *  Copyright (c) Electronics and Telecommunications Research Institute. All rights reserved.
 *  See License.txt in the project root for license information.
 */

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('tenant_relation', [
      { id: 'sodas_admin##default_org', org_id: 'default_org', user_id: 'sodas_admin', approval_state: 'accept', issuer_id: 'sodas_admin', issued: new Date() },
      { id: 'sodas_user##default_org', org_id: 'default_org', user_id: 'sodas_user', approval_state: 'accept', issuer_id: 'sodas_admin', issued: new Date() }
    ], {})
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('tenant_relation', { issuer_id: 'sodas_admin' }, {})
  }
}
