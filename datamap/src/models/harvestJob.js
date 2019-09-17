/* jshint indent: 1 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('harvestJob', {
    id: {
      type: DataTypes.TEXT,
      allowNull: false,
      primaryKey: true,
      field: 'id'
    },
    issued: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'issued'
    },
    gatherStarted: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'gather_started'
    },
    gatherFinished: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'gather_finished'
    },
    finished: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'finished'
    },
    sourceId: {
      type: DataTypes.TEXT,
      allowNull: false,
      field: 'source_id'
    },
    status: {
      type: DataTypes.TEXT,
      allowNull: false,
      field: 'status'
    }
  }, {
    tableName: 'harvest_job',
    timestamps: false,
    schema: 'public'
  })
}
