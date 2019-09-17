/* jshint indent: 1 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('shoppingBasket', {
    purchaserId: {
      type: DataTypes.TEXT,
      allowNull: false,
      primaryKey: true,
      field: 'purchaser_id'
    },
    goodsId: {
      type: DataTypes.TEXT,
      allowNull: false,
      primaryKey: true,
      field: 'goods_id'
    },
    goodsType: {
      type: DataTypes.TEXT,
      allowNull: false,
      field: 'goods_type'
    },
    basketIssued: {
      type: DataTypes.DATE,
      allowNull: false,
      field: 'basket_issued'
    }
  }, {
    tableName: 'shopping_basket',
    timestamps: false,
    schema: 'public'
  })
}
