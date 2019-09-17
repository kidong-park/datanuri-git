/* jshint indent: 1 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('datasetAcl', {
    tenantId: {
      type: DataTypes.TEXT,
      allowNull: false,
      primaryKey: true,
      field: 'tenant_id'
    },
    goodsId: {
      type: DataTypes.TEXT,
      allowNull: false,
      primaryKey: true,
      field: 'goods_id'
    },
    goodsType: {
      type: DataTypes.TEXT,
      allowNull: false,
      field: 'goods_type'
    },
    exceptionType: {
      type: DataTypes.TEXT,
      allowNull: false,
      field: 'exception_type'
    },
    purchaseId: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'purchase_id'
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
    tableName: 'dataset_acl',
    timestamps: false,
    schema: 'public'
  })
}
