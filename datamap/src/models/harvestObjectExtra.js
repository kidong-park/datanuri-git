/* jshint indent: 1 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('harvestObjectExtra', {
    id: {
      type: DataTypes.TEXT,
      allowNull: false,
      primaryKey: true,
      field: 'id'
    },
    harvestObjectId: {
      type: DataTypes.TEXT,
      allowNull: false,
      field: 'harvest_object_id'
    },
    key: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'key'
    },
    value: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'value'
    }
  }, {
    tableName: 'harvest_object_extra',
    timestamps: false,
    schema: 'public'
  })
}
