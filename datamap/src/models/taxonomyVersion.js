/* jshint indent: 1 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('taxonomyVersion', {
    versionId: {
      type: DataTypes.TEXT,
      allowNull: false,
      primaryKey: true,
      field: 'version_id'
    },
    version: {
      type: DataTypes.TEXT,
      allowNull: false,
      field: 'version'
    },
    versionDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      field: 'version_date'
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'description'
    },
    topicId: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'topic_id'
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
    tableName: 'taxonomy_version',
    timestamps: false,
    schema: 'public'
  })
}
