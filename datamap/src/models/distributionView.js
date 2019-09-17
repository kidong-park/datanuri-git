/* jshint indent: 1 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('distributionView', {
    id: {
      type: DataTypes.TEXT,
      allowNull: false,
      primaryKey: true,
      field: 'id'
    },
    distributionId: {
      type: DataTypes.TEXT,
      allowNull: false,
      field: 'distribution_id'
    },
    title: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'title'
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'description'
    },
    viewType: {
      type: DataTypes.TEXT,
      allowNull: false,
      field: 'view_type'
    },
    viewOrder: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'view_order'
    },
    config: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'config'
    }
  }, {
    tableName: 'distribution_view',
    timestamps: false,
    schema: 'public'
  })
}
