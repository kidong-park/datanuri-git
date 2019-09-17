/* jshint indent: 1 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('catalog', {
    catalogId: {
      type: DataTypes.TEXT,
      allowNull: false,
      primaryKey: true,
      field: 'catalog_id'
    },
    orgId: {
      type: DataTypes.TEXT,
      allowNull: false,
      field: 'org_id'
    },
    license: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'license'
    },
    rights: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'rights'
    },
    homepage: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'homepage'
    },
    catalogName: {
      type: DataTypes.TEXT,
      allowNull: false,
      field: 'catalog_name'
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
    uri: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'uri'
    }
  }, {
    tableName: 'catalog',
    timestamps: false,
    schema: 'public'
  })
}
