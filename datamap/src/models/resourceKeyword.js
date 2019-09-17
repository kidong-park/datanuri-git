/* jshint indent: 1 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('resourceKeyword', {
    keywordType: {
      type: DataTypes.TEXT,
      allowNull: false,
      primaryKey: true,
      field: 'keyword_type'
    },
    keywordId: {
      type: DataTypes.TEXT,
      allowNull: false,
      primaryKey: true,
      field: 'keyword_id'
    },
    resourceId: {
      type: DataTypes.TEXT,
      allowNull: false,
      primaryKey: true,
      field: 'resource_id'
    },
    state: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'state'
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
    }
  }, {
    tableName: 'resource_keyword',
    timestamps: false,
    schema: 'public'
  })
}
