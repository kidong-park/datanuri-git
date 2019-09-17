/* jshint indent: 1 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('resource', {
    id: {
      type: DataTypes.TEXT,
      allowNull: false,
      primaryKey: true,
      field: 'id'
    },
    title: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'title'
    },
    version: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'version'
    },
    landingPage: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'landing_page'
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'description'
    },
    license: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'license'
    },
    state: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'state'
    },
    isPublic: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      field: 'is_public'
    },
    issued: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'issued'
    },
    modified: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'modified'
    },
    type: {
      type: DataTypes.TEXT,
      allowNull: false,
      field: 'type'
    },
    dqIndex: {
      type: DataTypes.DOUBLE,
      allowNull: true,
      field: 'dq_index'
    },
    measureDate: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      field: 'measure_date'
    },
    approvalState: {
      type: DataTypes.TEXT,
      allowNull: false,
      field: 'approval_state'
    },
    language: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'language'
    },
    extras: {
      type: DataTypes.JSONB,
      allowNull: true,
      field: 'extras'
    },
    endpointDescription: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'endpoint_description'
    },
    endpointUrl: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'endpoint_url'
    },
    accessRights: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'access_rights'
    },
    temporalStart: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'temporal_start'
    },
    temporalEnd: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'temporal_end'
    },
    accrualPeriodicity: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'accrual_periodicity'
    },
    spatialUri: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'spatial_uri'
    },
    imagePath: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'image_path'
    },
    isFree: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      field: 'is_free'
    },
    isPersonal: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      field: 'is_personal'
    },
    publisherId: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'publisher_id'
    },
    ownerId: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'owner_id'
    },
    removeType: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'remove_type'
    },
    sourceType: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'source_type'
    },
    publisherSpatialUri: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'publisher_spatial_uri'
    },
    landingPageUrl: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'landing_page_url'
    },
    creatorId: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'creator_id'
    },
    conformsTo: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'conforms_to'
    },
    spatialResolutionInMeters: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'spatial_resolution_in_meters'
    },
    temporalResolution: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'temporal_resolution'
    },
    wasGeneratedBy: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'was_generated_by'
    },
    servesDataset: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'serves_dataset'
    },
    method: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'method'
    },
    versionDescription: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'version_description'
    }
  }, {
    tableName: 'resource',
    timestamps: false,
    schema: 'public'
  })
}
