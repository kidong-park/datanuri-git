/* jshint indent: 1 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('resourceCateMetaAttrValue', {
    id: {
      type: DataTypes.TEXT,
      allowNull: false,
      primaryKey: true,
      field: 'id'
    },
    resourceId: {
      type: DataTypes.TEXT,
      allowNull: false,
      field: 'resource_id'
    },
    categoryId: {
      type: DataTypes.TEXT,
      allowNull: false,
      field: 'category_id'
    },
    attributeName: {
      type: DataTypes.TEXT,
      allowNull: false,
      field: 'attribute_name'
    },
    attributeValue: {
      type: DataTypes.TEXT,
      allowNull: false,
      field: 'attribute_value'
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
    tableName: 'resource_cate_meta_attr_value',
    timestamps: false,
    schema: 'public'
  })
}
