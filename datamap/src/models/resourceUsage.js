/* jshint indent: 1 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('resourceUsage', {
    tenantId: {
      type: DataTypes.TEXT,
      allowNull: false,
      field: 'tenant_id'
    },
    tenantType: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'tenant_type'
    },
    maxCpu: {
      type: DataTypes.DOUBLE,
      allowNull: true,
      field: 'max_cpu'
    },
    maxMemory: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'max_memory'
    },
    maxVolume: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'max_volume'
    },
    maxDeployment: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'max_deployment'
    },
    maxPod: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'max_pod'
    },
    maxContainer: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'max_container'
    },
    cpuUsage: {
      type: DataTypes.DOUBLE,
      allowNull: true,
      field: 'cpu_usage'
    },
    memoryUsage: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'memory_usage'
    },
    volumeUsage: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'volume_usage'
    },
    deploymentUsage: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'deployment_usage'
    },
    podUsage: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'pod_usage'
    },
    containerUsage: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'container_usage'
    },
    quotaType: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'quota_type'
    },
    issued: {
      type: DataTypes.DATE,
      allowNull: false,
      field: 'issued'
    },
    modified: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'modified'
    },
    id: {
      type: DataTypes.TEXT,
      allowNull: false,
      primaryKey: true,
      field: 'id'
    },
    cloudPackageContractId: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'cloud_package_contract_id'
    }
  }, {
    tableName: 'resource_usage',
    timestamps: false,
    schema: 'public'
  })
}
