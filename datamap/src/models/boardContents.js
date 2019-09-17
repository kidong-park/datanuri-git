/* jshint indent: 1 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('boardContents', {
    contentsNum: {
      type: DataTypes.TEXT,
      allowNull: false,
      primaryKey: true,
      field: 'contents_num'
    },
    orgId: {
      type: DataTypes.TEXT,
      allowNull: false,
      field: 'org_id'
    },
    boardNum: {
      type: DataTypes.TEXT,
      allowNull: false,
      field: 'board_num'
    },
    boardType: {
      type: DataTypes.TEXT,
      allowNull: false,
      field: 'board_type'
    },
    pContentsNum: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'p_contents_num'
    },
    writtenTimestamp: {
      type: DataTypes.DATE,
      allowNull: false,
      field: 'written_timestamp'
    },
    postingEnd: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      field: 'posting_end'
    },
    writerId: {
      type: DataTypes.TEXT,
      allowNull: false,
      field: 'writer_id'
    },
    title: {
      type: DataTypes.TEXT,
      allowNull: false,
      field: 'title'
    },
    contents: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'contents'
    },
    pageView: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'page_view'
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
    tableName: 'board_contents',
    timestamps: false,
    schema: 'public'
  })
}
