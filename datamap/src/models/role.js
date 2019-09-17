/* jshint indent: 1 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('role', {
    roleId: {
      type: DataTypes.TEXT,
      allowNull: false,
      primaryKey: true,
      field: 'role_id'
    },
    roleName: {
      type: DataTypes.TEXT,
      allowNull: false,
      field: 'role_name'
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
    }
  }, {
    tableName: 'role',
    timestamps: false,
    schema: 'public'
  })
}
