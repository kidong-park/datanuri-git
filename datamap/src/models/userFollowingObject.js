/* jshint indent: 1 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('userFollowingObject', {
    followerId: {
      type: DataTypes.TEXT,
      allowNull: false,
      primaryKey: true,
      field: 'follower_id'
    },
    objectId: {
      type: DataTypes.TEXT,
      allowNull: false,
      primaryKey: true,
      field: 'object_id'
    },
    issued: {
      type: DataTypes.DATE,
      allowNull: false,
      field: 'issued'
    },
    objectType: {
      type: DataTypes.TEXT,
      allowNull: false,
      field: 'object_type'
    },
    issuerId: {
      type: DataTypes.TEXT,
      allowNull: false,
      field: 'issuer_id'
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
    tableName: 'user_following_object',
    timestamps: false,
    schema: 'public'
  })
}
