/* jshint indent: 1 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('payment', {
    id: {
      type: DataTypes.TEXT,
      allowNull: false,
      primaryKey: true,
      field: 'id'
    },
    payDate: {
      type: DataTypes.DATE,
      allowNull: false,
      field: 'pay_date'
    },
    payType: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'pay_type'
    },
    payCompany: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'pay_company'
    },
    pgPurchase: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'pg_purchase'
    },
    pgConfirm: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'pg_confirm'
    },
    confirmNum: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'confirm_num'
    },
    regId: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'reg_id'
    },
    regDate: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'reg_date'
    },
    tid: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'tid'
    },
    token: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'token'
    },
    netCacheUrl: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'net_cache_url'
    },
    authUrl: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'auth_url'
    },
    checkAckUrl: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'check_ack_url'
    },
    payAmount: {
      type: DataTypes.TEXT,
      allowNull: false,
      field: 'pay_amount'
    },
    paymentType: {
      type: DataTypes.TEXT,
      allowNull: false,
      field: 'payment_type'
    },
    purchasePaymentId: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'purchase_payment_id'
    }
  }, {
    tableName: 'payment',
    timestamps: false,
    schema: 'public'
  })
}
