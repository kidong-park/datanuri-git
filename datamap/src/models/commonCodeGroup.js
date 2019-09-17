/* jshint indent: 1 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('commonCodeGroup', {
    cdgrpCode: {
      type: DataTypes.TEXT,
      allowNull: false,
      primaryKey: true,
      field: 'cdgrp_code'
    },
    cdgrpName: {
      type: DataTypes.TEXT,
      allowNull: false,
      field: 'cdgrp_name'
    },
    cdgrpDescription: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'cdgrp_description'
    }
  }, {
    tableName: 'common_code_group',
    timestamps: false,
    schema: 'public'
  })
}
