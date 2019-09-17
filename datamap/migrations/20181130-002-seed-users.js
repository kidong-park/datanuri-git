/**
 *  Copyright (c) Electronics and Telecommunications Research Institute. All rights reserved.
 *  See License.txt in the project root for license information.
 */

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('tenant', [
      { id: 'sodas_admin', name: 'sodas', family_name: 'admin', title: 'sodas_admin', email: 'sodas_admin@sodas.etri.re.kr', tenant_type: 'user', approval_state: 'accept', issuer_id: 'sodas_admin', issued: new Date() },
      { id: 'sodas_user', name: 'sodas', family_name: 'user', title: 'user', email: 'sodas_user@sodas.etri.re.kr', tenant_type: 'user', approval_state: 'accept', issuer_id: 'sodas_admin', issued: new Date() }
    ], {})
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('tenant', { tenant_type: 'user', issuer_id: 'sodas_admin' }, {})
  }
}
