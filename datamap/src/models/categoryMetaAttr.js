/* jshint indent: 1 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('categoryMetaAttr', {
    metaAttrType: {
      type: DataTypes.TEXT,
      allowNull: false,
      primaryKey: true,
      field: 'meta_attr_type'
    },
    categoryId: {
      type: DataTypes.TEXT,
      allowNull: false,
      primaryKey: true,
      field: 'category_id'
    },
    attributeName: {
      type: DataTypes.TEXT,
      allowNull: false,
      primaryKey: true,
      field: 'attribute_name'
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
      primaryKey: true,
      field: 'valid_end'
    },
    attrSeq: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'attr_seq'
    },
    ctqYn: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'ctq_yn'
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
    objectName: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'object_name'
    }
  }, {
    tableName: 'category_meta_attr',
    timestamps: false,
    schema: 'public'
  })
}
