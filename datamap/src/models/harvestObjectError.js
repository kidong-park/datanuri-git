/* jshint indent: 1 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('harvestObjectError', {
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
    message: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'message'
    },
    stage: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'stage'
    },
    line: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'line'
    },
    issued: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'issued'
    }
  }, {
    tableName: 'harvest_object_error',
    timestamps: false,
    schema: 'public'
  })
}
