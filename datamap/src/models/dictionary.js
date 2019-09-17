/* jshint indent: 1 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('dictionary', {
    id: {
      type: DataTypes.TEXT,
      allowNull: false,
      primaryKey: true,
      field: 'id'
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: false,
      field: 'name'
    },
    vocaType: {
      type: DataTypes.TEXT,
      allowNull: false,
      field: 'voca_type'
    },
    approvalState: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'approval_state'
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
    tableName: 'dictionary',
    timestamps: false,
    schema: 'public'
  })
}
