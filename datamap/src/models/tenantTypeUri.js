/* jshint indent: 1 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('tenantTypeUri', {
    id: {
      type: DataTypes.TEXT,
      allowNull: false,
      primaryKey: true,
      field: 'id'
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'name'
    },
    uri: {
      type: DataTypes.TEXT,
      allowNull: false,
      field: 'uri'
    }
  }, {
    tableName: 'tenant_type_uri',
    timestamps: false,
    schema: 'public'
  })
}
