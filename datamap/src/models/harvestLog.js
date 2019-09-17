/* jshint indent: 1 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('harvestLog', {
    id: {
      type: DataTypes.TEXT,
      allowNull: false,
      primaryKey: true,
      field: 'id'
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
      field: 'content'
    },
    level: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'level'
    },
    issued: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'issued'
    }
  }, {
    tableName: 'harvest_log',
    timestamps: false,
    schema: 'public'
  })
}
