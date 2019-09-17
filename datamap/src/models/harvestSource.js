/* jshint indent: 1 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('harvestSource', {
    id: {
      type: DataTypes.TEXT,
      allowNull: false,
      primaryKey: true,
      field: 'id'
    },
    url: {
      type: DataTypes.TEXT,
      allowNull: false,
      field: 'url'
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
    config: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'config'
    },
    issued: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'issued'
    },
    type: {
      type: DataTypes.TEXT,
      allowNull: false,
      field: 'type'
    },
    active: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      field: 'active'
    },
    userId: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'user_id'
    },
    publisherId: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'publisher_id'
    },
    frequency: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'frequency'
    },
    nextRun: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'next_run'
    },
    approvalState: {
      type: DataTypes.TEXT,
      allowNull: false,
      field: 'approval_state'
    },
    storageType: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'storage_type'
    },
    tenantId: {
      type: DataTypes.TEXT,
      allowNull: false,
      field: 'tenant_id'
    }
  }, {
    tableName: 'harvest_source',
    timestamps: false,
    schema: 'public'
  })
}
