/* jshint indent: 1 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('purchase', {
    purchaseId: {
      type: DataTypes.TEXT,
      allowNull: false,
      primaryKey: true,
      field: 'purchase_id'
    },
    purchaserId: {
      type: DataTypes.TEXT,
      allowNull: false,
      field: 'purchaser_id'
    },
    actualPurchased: {
      type: DataTypes.DATE,
      allowNull: false,
      field: 'actual_purchased'
    },
    canceled: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'canceled'
    },
    cancelReason: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'cancel_reason'
    },
    refunded: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'refunded'
    },
    refundedReason: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'refunded_reason'
    },
    purchaseType: {
      type: DataTypes.TEXT,
      allowNull: false,
      field: 'purchase_type'
    },
    purchaseObjectType: {
      type: DataTypes.TEXT,
      allowNull: false,
      field: 'purchase_object_type'
    },
    purchasePaymentId: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'purchase_payment_id'
    },
    cancelPaymentId: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'cancel_payment_id'
    }
  }, {
    tableName: 'purchase',
    timestamps: false,
    schema: 'public'
  })
}
