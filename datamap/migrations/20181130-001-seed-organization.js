/**
 *  Copyright (c) Electronics and Telecommunications Research Institute. All rights reserved.
 *  See License.txt in the project root for license information.
 */

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('tenant', [
      { id: 'default_org', name: 'default_org', title: 'default_org', description: 'default org', tenant_type: 'org', approval_state: 'accept', issuer_id: 'sodas_admin', issued: new Date() }
    ], {})
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('tenant', { tenant_type: 'org', issuer_id: 'pf_admin' }, {})
  }
}
