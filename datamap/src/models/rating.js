/* jshint indent: 1 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('rating', {
    id: {
      type: DataTypes.TEXT,
      allowNull: false,
      primaryKey: true,
      field: 'id'
    },
    userId: {
      type: DataTypes.TEXT,
      allowNull: false,
      field: 'user_id'
    },
    userIpAddress: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'user_ip_address'
    },
    resourceId: {
      type: DataTypes.TEXT,
      allowNull: false,
      field: 'resource_id'
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'rating'
    },
    issued: {
      type: DataTypes.DATE,
      allowNull: true,
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
    ratingType: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'rating_type'
    }
  }, {
    tableName: 'rating',
    timestamps: false,
    schema: 'public'
  })
}
