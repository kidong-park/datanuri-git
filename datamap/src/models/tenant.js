/* jshint indent: 1 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('tenant', {
    id: {
      type: DataTypes.TEXT,
      allowNull: false,
      primaryKey: true,
      field: 'id'
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: false,
      field: 'name'
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
    tenantType: {
      type: DataTypes.TEXT,
      allowNull: false,
      field: 'tenant_type'
    },
    orgnameEng: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'orgname_eng'
    },
    busiRegNum: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'busi_reg_num'
    },
    state: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'state'
    },
    imageUrl: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'image_url'
    },
    representativePhoneNumber: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'representative_phone_number'
    },
    representativeName: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'representative_name'
    },
    address: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'address'
    },
    extras: {
      type: DataTypes.JSONB,
      allowNull: true,
      field: 'extras'
    },
    homepageUrl: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'homepage_url'
    },
    orgLogoFilename: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'org_logo_filename'
    },
    password: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'password'
    },
    email: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'email'
    },
    resetKey: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'reset_key'
    },
    activityStreamsEmailNotifications: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
      field: 'activity_streams_email_notifications'
    },
    phoneNumber: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'phone_number'
    },
    issued: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'issued'
    },
    approvalState: {
      type: DataTypes.TEXT,
      allowNull: false,
      field: 'approval_state'
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
    },
    familyName: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'family_name'
    },
    isCreator: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
      field: 'is_creator'
    },
    uri: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'uri'
    },
    tenantTypeUriId: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'tenant_type_uri_id'
    }
  }, {
    tableName: 'tenant',
    timestamps: false,
    schema: 'public'
  })
}
