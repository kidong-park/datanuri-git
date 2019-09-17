/* jshint indent: 1 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('resourceCategoryMap', {
    resourceId: {
      type: DataTypes.TEXT,
      allowNull: false,
      primaryKey: true,
      field: 'resource_id'
    },
    nodeId: {
      type: DataTypes.TEXT,
      allowNull: false,
      primaryKey: true,
      field: 'node_id'
    },
    issuerId: {
      type: DataTypes.TEXT,
      allowNull: false,
      field: 'issuer_id'
    },
    issued: {
      type: DataTypes.DATE,
      allowNull: false,
      field: 'issued'
    },
    modifierId: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'modifier_id'
    },
    modified: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'modified'
    },
    nodeType: {
      type: DataTypes.TEXT,
      allowNull: false,
      primaryKey: true,
      field: 'node_type'
    },
    catalogId: {
      type: DataTypes.TEXT,
      allowNull: false,
      primaryKey: true,
      field: 'catalog_id'
    }
  }, {
    tableName: 'resource_category_map',
    timestamps: false,
    schema: 'public'
  })
}
