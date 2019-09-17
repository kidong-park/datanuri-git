/* jshint indent: 1 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('distribution', {
    id: {
      type: DataTypes.TEXT,
      allowNull: false,
      primaryKey: true,
      field: 'id'
    },
    accessUrl: {
      type: DataTypes.TEXT,
      allowNull: false,
      field: 'access_url'
    },
    downloadUrl: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'download_url'
    },
    format: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'format'
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'description'
    },
    title: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'title'
    },
    mediaType: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'media_type'
    },
    byteSize: {
      type: DataTypes.BIGINT,
      allowNull: true,
      field: 'byte_size'
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
    resourceId: {
      type: DataTypes.TEXT,
      allowNull: false,
      field: 'resource_id'
    },
    schemaType: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'schema_type'
    },
    rights: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'rights'
    },
    extras: {
      type: DataTypes.JSONB,
      allowNull: true,
      field: 'extras'
    },
    storageType: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'storage_type'
    },
    fileName: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'file_name'
    },
    landingPage: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'landing_page'
    },
    dataType: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'data_type'
    },
    landingPageUrl: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'landing_page_url'
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
    conformsTo: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'conforms_to'
    },
    license: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'license'
    },
    version: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'version'
    },
    versionDescription: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'version_description'
    },
    uri: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'uri'
    }
  }, {
    tableName: 'distribution',
    timestamps: false,
    schema: 'public'
  })
}
