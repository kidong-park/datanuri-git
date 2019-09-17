/* jshint indent: 1 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('taxonomy', {
    id: {
      type: DataTypes.TEXT,
      allowNull: false,
      primaryKey: true,
      field: 'id'
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
    title: {
      type: DataTypes.TEXT,
      allowNull: false,
      field: 'title'
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'description'
    },
    parentId: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'parent_id'
    },
    classImageFilename: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'class_image_filename'
    },
    approvalState: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'approval_state'
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
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      field: 'is_active'
    }
  }, {
    tableName: 'taxonomy',
    timestamps: false,
    schema: 'public'
  })
}
