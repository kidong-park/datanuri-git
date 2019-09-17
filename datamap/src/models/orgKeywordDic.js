/* jshint indent: 1 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('orgKeywordDic', {
    id: {
      type: DataTypes.TEXT,
      allowNull: false,
      primaryKey: true,
      field: 'id'
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: false,
      field: 'name'
    },
    orgId: {
      type: DataTypes.TEXT,
      allowNull: false,
      field: 'org_id'
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
    }
  }, {
    tableName: 'org_keyword_dic',
    timestamps: false,
    schema: 'public'
  })
}
