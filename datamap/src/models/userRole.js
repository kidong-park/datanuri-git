/* jshint indent: 1 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('userRole', {
    userId: {
      type: DataTypes.TEXT,
      allowNull: false,
      primaryKey: true,
      field: 'user_id'
    },
    roleId: {
      type: DataTypes.TEXT,
      allowNull: false,
      primaryKey: true,
      field: 'role_id'
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
    tenantRelationId: {
      type: DataTypes.TEXT,
      allowNull: false,
      primaryKey: true,
      field: 'tenant_relation_id'
    }
  }, {
    tableName: 'user_role',
    timestamps: false,
    schema: 'public'
  })
}
