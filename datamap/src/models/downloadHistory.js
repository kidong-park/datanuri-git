/* jshint indent: 1 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('downloadHistory', {
    resourceId: {
      type: DataTypes.TEXT,
      allowNull: false,
      primaryKey: true,
      field: 'resource_id'
    },
    timestamp: {
      type: DataTypes.DATE,
      allowNull: false,
      primaryKey: true,
      field: 'timestamp'
    },
    distributionId: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'distribution_id'
    },
    userId: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'user_id'
    },
    ipAddr: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'ip_addr'
    }
  }, {
    tableName: 'download_history',
    timestamps: false,
    schema: 'public'
  })
}
