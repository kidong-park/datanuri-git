/* jshint indent: 1 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('harvestObject', {
    id: {
      type: DataTypes.TEXT,
      allowNull: false,
      primaryKey: true,
      field: 'id'
    },
    guid: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'guid'
    },
    current: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      field: 'current'
    },
    gathered: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'gathered'
    },
    fetchStarted: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'fetch_started'
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'content'
    },
    fetchFinished: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'fetch_finished'
    },
    importStarted: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'import_started'
    },
    importFinished: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'import_finished'
    },
    state: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'state'
    },
    metadataModifiedDate: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'metadata_modified_date'
    },
    retryTimes: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'retry_times'
    },
    harvestJobId: {
      type: DataTypes.TEXT,
      allowNull: false,
      field: 'harvest_job_id'
    },
    harvestSourceId: {
      type: DataTypes.TEXT,
      allowNull: false,
      field: 'harvest_source_id'
    },
    resourceId: {
      type: DataTypes.TEXT,
      allowNull: false,
      field: 'resource_id'
    },
    reportStatus: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'report_status'
    }
  }, {
    tableName: 'harvest_object',
    timestamps: false,
    schema: 'public'
  })
}
