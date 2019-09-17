/* jshint indent: 1 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('priceCondition', {
    goodsId: {
      type: DataTypes.TEXT,
      allowNull: false,
      primaryKey: true,
      field: 'goods_id'
    },
    tenantType: {
      type: DataTypes.TEXT,
      allowNull: false,
      primaryKey: true,
      field: 'tenant_type'
    },
    servicePeriod: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      field: 'service_period'
    },
    periodUnit: {
      type: DataTypes.TEXT,
      allowNull: false,
      primaryKey: true,
      field: 'period_unit'
    },
    serviceCount: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      field: 'service_count'
    },
    validStart: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      primaryKey: true,
      field: 'valid_start'
    },
    validEnd: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      primaryKey: true,
      field: 'valid_end'
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'price'
    },
    priceUnit: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'price_unit'
    },
    productCategory: {
      type: DataTypes.TEXT,
      allowNull: false,
      field: 'product_category'
    },
    resourceType: {
      type: DataTypes.TEXT,
      allowNull: false,
      field: 'resource_type'
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
    tableName: 'price_condition',
    timestamps: false,
    schema: 'public'
  })
}
