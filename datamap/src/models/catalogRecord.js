/* jshint indent: 1 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('catalogRecord', {
    catalogRecordId: {
      type: DataTypes.TEXT,
      allowNull: false,
      primaryKey: true,
      field: 'catalog_record_id'
    },
    catalogId: {
      type: DataTypes.TEXT,
      allowNull: false,
      field: 'catalog_id'
    },
    resourceId: {
      type: DataTypes.TEXT,
      allowNull: false,
      field: 'resource_id'
    },
    conformsTo: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'conforms_to'
    },
    contributor: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'contributor'
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'description'
    },
    issued: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'issued'
    },
    modified: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'modified'
    },
    title: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'title'
    }
  }, {
    tableName: 'catalog_record',
    timestamps: false,
    schema: 'public'
  })
}
