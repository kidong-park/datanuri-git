/* jshint indent: 1 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('catalogComponents', {
    catalogId: {
      type: DataTypes.TEXT,
      allowNull: false,
      primaryKey: true,
      field: 'catalog_id'
    },
    nodeId: {
      type: DataTypes.TEXT,
      allowNull: false,
      primaryKey: true,
      field: 'node_id'
    },
    validStart: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      primaryKey: true,
      field: 'valid_start'
    },
    validEnd: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      defaultValue: '9999-12-31',
      primaryKey: true,
      field: 'valid_end'
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'description'
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
    parentNodeId: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'parent_node_id'
    },
    parentNodeType: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'parent_node_type'
    },
    rangeType: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'range_type'
    },
    categoryName: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'category_name'
    }
  }, {
    tableName: 'catalog_components',
    timestamps: false,
    schema: 'public'
  })
}
