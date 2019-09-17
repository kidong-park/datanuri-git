/* jshint indent: 1 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('resourceRelationship', {
    id: {
      type: DataTypes.TEXT,
      allowNull: false,
      primaryKey: true,
      field: 'id'
    },
    subjectResourceId: {
      type: DataTypes.TEXT,
      allowNull: false,
      field: 'subject_resource_id'
    },
    objectResourceId: {
      type: DataTypes.TEXT,
      allowNull: false,
      field: 'object_resource_id'
    },
    relationType: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'relation_type'
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'description'
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
    },
    hadRole: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'had_role'
    }
  }, {
    tableName: 'resource_relationship',
    timestamps: false,
    schema: 'public'
  })
}
