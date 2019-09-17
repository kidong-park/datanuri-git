/* jshint indent: 1 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('purchaseDetail', {
    purchaseId: {
      type: DataTypes.TEXT,
      allowNull: false,
      primaryKey: true,
      field: 'purchase_id'
    },
    goodsId: {
      type: DataTypes.TEXT,
      allowNull: false,
      primaryKey: true,
      field: 'goods_id'
    },
    version: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'version'
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'price'
    },
    tenantType: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'tenant_type'
    },
    goodsType: {
      type: DataTypes.TEXT,
      allowNull: false,
      field: 'goods_type'
    },
    ownerId: {
      type: DataTypes.TEXT,
      allowNull: false,
      field: 'owner_id'
    },
    servicePeriod: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'service_period'
    },
    periodUnit: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'period_unit'
    },
    serviceStart: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      field: 'service_start'
    },
    serviceEnd: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      field: 'service_end'
    },
    serviceCount: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'service_count'
    },
    apikey: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'apikey'
    },
    issued: {
      type: DataTypes.DATE,
      allowNull: false,
      field: 'issued'
    },
    productCategory: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'product_category'
    }
  }, {
    tableName: 'purchase_detail',
    timestamps: false,
    schema: 'public'
  })
}
