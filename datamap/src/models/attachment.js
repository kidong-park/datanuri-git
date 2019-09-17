/* jshint indent: 1 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('attachment', {
    contentsNum: {
      type: DataTypes.TEXT,
      allowNull: false,
      primaryKey: true,
      field: 'contents_num'
    },
    attachNum: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      field: 'attach_num'
    },
    fileName: {
      type: DataTypes.TEXT,
      allowNull: false,
      field: 'file_name'
    },
    filePath: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'file_path'
    },
    fileDescription: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'file_description'
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
    tableName: 'attachment',
    timestamps: false,
    schema: 'public'
  })
}
