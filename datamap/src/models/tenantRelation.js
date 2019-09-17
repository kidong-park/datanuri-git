/* jshint indent: 1 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('tenantRelation', {
    id: {
      type: DataTypes.TEXT,
      allowNull: false,
      primaryKey: true,
      field: 'id'
    },
    orgId: {
      type: DataTypes.TEXT,
      allowNull: false,
      field: 'org_id'
    },
    userId: {
      type: DataTypes.TEXT,
      allowNull: false,
      field: 'user_id'
    },
    state: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'state'
    },
    issuerId: {
      type: DataTypes.TEXT,
      allowNull: false,
      field: 'issuer_id'
    },
    issued: {
      type: DataTypes.DATE,
      allowNull: false,
      field: 'issued'
    },
    modifierId: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'modifier_id'
    },
    modified: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'modified'
    },
    approvalState: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'approval_state'
    }
  }, {
    tableName: 'tenant_relation',
    timestamps: false,
    schema: 'public'
  })
}
