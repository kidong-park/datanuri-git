/* jshint indent: 1 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('datasetHistory', {
    historyId: {
      type: DataTypes.TEXT,
      allowNull: false,
      primaryKey: true,
      field: 'history_id'
    },
    goodsName: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'goods_name'
    },
    goodsType: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'goods_type'
    },
    publisher: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'publisher'
    },
    actionType: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'action_type'
    },
    actionDetail: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'action_detail'
    },
    issuedDate: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'issued_date'
    },
    resourceId: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'resource_id'
    },
    tenantId: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'tenant_id'
    }
  }, {
    tableName: 'dataset_history',
    timestamps: false,
    schema: 'public'
  })
}
