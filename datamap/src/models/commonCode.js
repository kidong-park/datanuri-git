/* jshint indent: 1 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('commonCode', {
    cdgrpCode: {
      type: DataTypes.TEXT,
      allowNull: false,
      primaryKey: true,
      field: 'cdgrp_code'
    },
    code: {
      type: DataTypes.TEXT,
      allowNull: false,
      primaryKey: true,
      field: 'code'
    },
    codeName: {
      type: DataTypes.TEXT,
      allowNull: false,
      field: 'code_name'
    },
    codeNameKor: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'code_name_kor'
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'description'
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
    tableName: 'common_code',
    timestamps: false,
    schema: 'public'
  })
}
