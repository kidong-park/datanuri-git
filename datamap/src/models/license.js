/* jshint indent: 1 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('license', {
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
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'description'
    },
    version: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'version'
    },
    issued: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'issued'
    }
  }, {
    tableName: 'license',
    timestamps: false,
    schema: 'public'
  })
}
