/* jshint indent: 1 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('harvestGatherError', {
    id: {
      type: DataTypes.TEXT,
      allowNull: false,
      primaryKey: true,
      field: 'id'
    },
    harvestJobId: {
      type: DataTypes.TEXT,
      allowNull: false,
      field: 'harvest_job_id'
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'message'
    },
    issued: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'issued'
    }
  }, {
    tableName: 'harvest_gather_error',
    timestamps: false,
    schema: 'public'
  })
}
