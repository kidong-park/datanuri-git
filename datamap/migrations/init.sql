CREATE TABLE attachment
(
    contents_num        TEXT NOT NULL,
    attach_num          INTEGER NOT NULL,
    file_name           TEXT NOT NULL,
    file_path           TEXT,
    file_description    TEXT,
    issuer_id           TEXT NOT NULL,
    issued              TIMESTAMPTZ NOT NULL,
    modifier_id         TEXT,
    modified            TIMESTAMPTZ
);

CREATE UNIQUE INDEX attachment_pk ON attachment ( contents_num,attach_num );

ALTER TABLE attachment *
 ADD CONSTRAINT attachment_pk PRIMARY KEY
 USING INDEX attachment_pk;

COMMENT ON COLUMN attachment.contents_num IS '게시글번호';

COMMENT ON COLUMN attachment.attach_num IS '첨부순번';

COMMENT ON COLUMN attachment.file_name IS '파일명';

COMMENT ON COLUMN attachment.file_path IS '파일경로';

COMMENT ON COLUMN attachment.file_description IS '파일설명';

COMMENT ON COLUMN attachment.issuer_id IS '등록자';

COMMENT ON COLUMN attachment.issued IS '등록일시';

COMMENT ON COLUMN attachment.modifier_id IS '수정자';

COMMENT ON COLUMN attachment.modified IS '수정일시';

COMMENT ON TABLE attachment IS '첨부파일';

CREATE TABLE board_contents
(
    contents_num         TEXT NOT NULL,
    org_id               TEXT NOT NULL,
    board_num            TEXT NOT NULL,
    board_type           TEXT NOT NULL,
    p_contents_num       TEXT,
    written_timestamp    TIMESTAMPTZ NOT NULL,
    posting_end          DATE,
    writer_id            TEXT NOT NULL,
    title                TEXT NOT NULL,
    contents             TEXT,
    page_view            INTEGER,
    issuer_id            TEXT NOT NULL,
    issued               TIMESTAMPTZ NOT NULL,
    modifier_id          TEXT,
    modified             TIMESTAMPTZ
);

CREATE UNIQUE INDEX board_contents_pk ON board_contents ( contents_num );

ALTER TABLE board_contents *
 ADD CONSTRAINT board_contents_pk PRIMARY KEY
 USING INDEX board_contents_pk;

COMMENT ON COLUMN board_contents.contents_num IS '게시글번호';

COMMENT ON COLUMN board_contents.org_id IS '게시조직ID';

COMMENT ON COLUMN board_contents.board_num IS '게시판번호';

COMMENT ON COLUMN board_contents.board_type IS '게시판구분';

COMMENT ON COLUMN board_contents.p_contents_num IS '상위게시글번호';

COMMENT ON COLUMN board_contents.written_timestamp IS '작성일시';

COMMENT ON COLUMN board_contents.posting_end IS '게시기한';

COMMENT ON COLUMN board_contents.writer_id IS '작성자ID';

COMMENT ON COLUMN board_contents.title IS '제목';

COMMENT ON COLUMN board_contents.contents IS '본문';

COMMENT ON COLUMN board_contents.page_view IS '조회수';

COMMENT ON COLUMN board_contents.issuer_id IS '등록자';

COMMENT ON COLUMN board_contents.issued IS '등록일시';

COMMENT ON COLUMN board_contents.modifier_id IS '수정자';

COMMENT ON COLUMN board_contents.modified IS '수정일시';

COMMENT ON TABLE board_contents IS '게시글';

CREATE TABLE catalog
(
    catalog_id      TEXT NOT NULL,
    org_id          TEXT NOT NULL,
    license         TEXT,
    rights          TEXT,
    homepage        TEXT,
    catalog_name    TEXT NOT NULL,
    description     TEXT,
    issuer_id       TEXT NOT NULL,
    issued          TIMESTAMPTZ NOT NULL,
    modifier_id     TEXT,
    modified        TIMESTAMPTZ,
    uri             TEXT
);

CREATE UNIQUE INDEX catalog_pk ON catalog ( catalog_id );

ALTER TABLE catalog *
 ADD CONSTRAINT catalog_pk PRIMARY KEY
 USING INDEX catalog_pk;

COMMENT ON COLUMN catalog.catalog_id IS '카탈로그ID';

COMMENT ON COLUMN catalog.org_id IS '조직ID';

COMMENT ON COLUMN catalog.license IS 'license';

COMMENT ON COLUMN catalog.rights IS 'rights';

COMMENT ON COLUMN catalog.homepage IS 'homepage';

COMMENT ON COLUMN catalog.catalog_name IS '카탈로그명';

COMMENT ON COLUMN catalog.description IS '설명';

COMMENT ON COLUMN catalog.issuer_id IS '등록자';

COMMENT ON COLUMN catalog.issued IS '등록일시';

COMMENT ON COLUMN catalog.modifier_id IS '수정자';

COMMENT ON COLUMN catalog.modified IS '수정일시';

COMMENT ON COLUMN catalog.uri IS 'URI';

COMMENT ON TABLE catalog IS '카탈로그';

CREATE TABLE catalog_components
(
    catalog_id          TEXT NOT NULL,
    node_type           TEXT NOT NULL,
    node_id             TEXT NOT NULL,
    valid_start         DATE NOT NULL,
    valid_end           DATE DEFAULT '99991231' NOT NULL,
    description         TEXT,
	range_type          TEXT,
    category_name       TEXT,
    parent_node_type    TEXT,
    parent_node_id      TEXT,
    issuer_id           TEXT NOT NULL,
    issued              TIMESTAMPTZ NOT NULL,
    modifier_id         TEXT,
    modified            TIMESTAMPTZ
);

CREATE UNIQUE INDEX catalog_components_pk ON catalog_components
( catalog_id,node_type,node_id,valid_start,valid_end );

ALTER TABLE catalog_components *
 ADD CONSTRAINT catalog_components_pk PRIMARY KEY
 USING INDEX catalog_components_pk;

COMMENT ON COLUMN catalog_components.catalog_id IS '카탈로그ID';

COMMENT ON COLUMN catalog_components.node_type IS '노드구분';

COMMENT ON COLUMN catalog_components.node_id IS '노드ID';

COMMENT ON COLUMN catalog_components.valid_start IS '유효시작일자';

COMMENT ON COLUMN catalog_components.valid_end IS '유효종료일자(99991231)';

COMMENT ON COLUMN catalog_components.description IS '설명';

COMMENT ON COLUMN catalog_components.range_type IS 'Range Type';

COMMENT ON COLUMN catalog_components.category_name IS '카테고리명';

COMMENT ON COLUMN catalog_components.parent_node_type IS '상위노드구분';

COMMENT ON COLUMN catalog_components.parent_node_id IS '상위노드ID';

COMMENT ON COLUMN catalog_components.issuer_id IS '등록자';

COMMENT ON COLUMN catalog_components.issued IS '등록일시';

COMMENT ON COLUMN catalog_components.modifier_id IS '수정자';

COMMENT ON COLUMN catalog_components.modified IS '수정일시';

COMMENT ON TABLE catalog_components IS '카탈로그구성';

CREATE TABLE category_meta_attr
(
    meta_attr_type    TEXT NOT NULL,
    category_id       TEXT NOT NULL,
    attribute_name    TEXT NOT NULL,
    valid_start       DATE NOT NULL,
    valid_end         DATE NOT NULL,
    issuer_id         TEXT NOT NULL,
    issued            TIMESTAMPTZ NOT NULL,
    modifier_id       TEXT,
    modified          TIMESTAMPTZ,
    attr_seq          SMALLINT,
    ctq_yn            VARCHAR(1),
    object_name       TEXT
);

CREATE UNIQUE INDEX category_meta_attr_pk ON category_meta_attr
( meta_attr_type,category_id,attribute_name,valid_start,valid_end );

ALTER TABLE category_meta_attr *
 ADD CONSTRAINT category_meta_attr_pk PRIMARY KEY
 USING INDEX category_meta_attr_pk;

COMMENT ON COLUMN category_meta_attr.meta_attr_type IS '메타항목구분';

COMMENT ON COLUMN category_meta_attr.category_id IS '카테고리ID';

COMMENT ON COLUMN category_meta_attr.attribute_name IS '속성명';

COMMENT ON COLUMN category_meta_attr.valid_start IS '유효시작일자';

COMMENT ON COLUMN category_meta_attr.valid_end IS '유효종료일자';

COMMENT ON COLUMN category_meta_attr.issuer_id IS '등록자';

COMMENT ON COLUMN category_meta_attr.issued IS '등록일시';

COMMENT ON COLUMN category_meta_attr.modifier_id IS '수정자';

COMMENT ON COLUMN category_meta_attr.modified IS '수정일시';

COMMENT ON COLUMN category_meta_attr.attr_seq IS '항목순서';

COMMENT ON COLUMN category_meta_attr.ctq_yn IS 'CTQ대상여부';

COMMENT ON COLUMN category_meta_attr.object_name IS '객체명';

COMMENT ON TABLE category_meta_attr IS '카테고리메타속성';

CREATE TABLE common_code
(
    cdgrp_code       TEXT NOT NULL,
    code             TEXT NOT NULL,
    code_name        TEXT NOT NULL,
    code_name_kor    TEXT,
    description      TEXT,
    issuer_id        TEXT NOT NULL,
    issued           TIMESTAMPTZ NOT NULL,
    modifier_id      TEXT,
    modified         TIMESTAMPTZ
);

CREATE UNIQUE INDEX common_code_pk ON common_code ( cdgrp_code,code );

ALTER TABLE common_code *
 ADD CONSTRAINT common_code_pk PRIMARY KEY
 USING INDEX common_code_pk;

COMMENT ON COLUMN common_code.cdgrp_code IS '코드그룹코드';

COMMENT ON COLUMN common_code.code IS '상세코드';

COMMENT ON COLUMN common_code.code_name IS '코드명';

COMMENT ON COLUMN common_code.code_name_kor IS '코드한글명';

COMMENT ON COLUMN common_code.description IS '코드설명';

COMMENT ON COLUMN common_code.issuer_id IS '등록자';

COMMENT ON COLUMN common_code.issued IS '등록일시';

COMMENT ON COLUMN common_code.modifier_id IS '수정자';

COMMENT ON COLUMN common_code.modified IS '수정일시';

COMMENT ON TABLE common_code IS '공통코드';

CREATE TABLE common_code_group
(
    cdgrp_code           TEXT NOT NULL,
    cdgrp_name           TEXT NOT NULL,
    cdgrp_description    TEXT
);

CREATE UNIQUE INDEX common_code_group_pk ON common_code_group ( cdgrp_code );

ALTER TABLE common_code_group *
 ADD CONSTRAINT common_code_group_pk PRIMARY KEY
 USING INDEX common_code_group_pk;

COMMENT ON COLUMN common_code_group.cdgrp_code IS '코드그룹코드';

COMMENT ON COLUMN common_code_group.cdgrp_name IS '코드그룹명';

COMMENT ON COLUMN common_code_group.cdgrp_description IS '코드그룹설명';

COMMENT ON TABLE common_code_group IS '공통코드그룹';

CREATE TABLE dataset_acl
(
    tenant_id         TEXT NOT NULL,
    goods_id          TEXT NOT NULL,
    goods_type        TEXT NOT NULL,
    exception_type    TEXT NOT NULL,
    purchase_id       TEXT,
    issuer_id         TEXT NOT NULL,
    issued            TIMESTAMPTZ NOT NULL,
    modifier_id       TEXT,
    modified          TIMESTAMPTZ
);

CREATE UNIQUE INDEX dataset_acl_pk ON dataset_acl ( tenant_id,goods_id );

ALTER TABLE dataset_acl *
 ADD CONSTRAINT dataset_acl_pk PRIMARY KEY
 USING INDEX dataset_acl_pk;

COMMENT ON COLUMN dataset_acl.tenant_id IS '권한주체ID';

COMMENT ON COLUMN dataset_acl.goods_id IS '대상상품ID';

COMMENT ON COLUMN dataset_acl.goods_type IS '상품구분';

COMMENT ON COLUMN dataset_acl.exception_type IS '예외유형';

COMMENT ON COLUMN dataset_acl.purchase_id IS '구매ID';

COMMENT ON COLUMN dataset_acl.issuer_id IS '등록자';

COMMENT ON COLUMN dataset_acl.issued IS '등록일시';

COMMENT ON COLUMN dataset_acl.modifier_id IS '수정자';

COMMENT ON COLUMN dataset_acl.modified IS '수정일시';

COMMENT ON TABLE dataset_acl IS '상품접근제어';

CREATE TABLE dataset_history
(
    history_id       TEXT NOT NULL,
    resource_id      TEXT,
    tenant_id        TEXT,
    goods_name       TEXT,
    goods_type       TEXT,
    publisher        TEXT,
    action_type      TEXT,
    action_detail    TEXT,
    issued_date      TIMESTAMPTZ
);

CREATE UNIQUE INDEX dataset_history_pk ON dataset_history ( history_id );

ALTER TABLE dataset_history *
 ADD CONSTRAINT dataset_history_pk PRIMARY KEY
 USING INDEX dataset_history_pk;

COMMENT ON COLUMN dataset_history.history_id IS '이력 ID';

COMMENT ON COLUMN dataset_history.resource_id IS '상품ID';

COMMENT ON COLUMN dataset_history.tenant_id IS '테넌트 ID';

COMMENT ON COLUMN dataset_history.goods_name IS '상품명';

COMMENT ON COLUMN dataset_history.goods_type IS '상품 타입';

COMMENT ON COLUMN dataset_history.publisher IS '제공자/제공기관';

COMMENT ON COLUMN dataset_history.action_type IS '변경구분';

COMMENT ON COLUMN dataset_history.action_detail IS '변경내용';

COMMENT ON COLUMN dataset_history.issued_date IS '발생일';

COMMENT ON TABLE dataset_history IS '상품이력정보';

CREATE TABLE dictionary
(
    id                TEXT NOT NULL,
    name              TEXT NOT NULL,
    voca_type         TEXT NOT NULL,
    approval_state    TEXT,
    issuer_id         TEXT NOT NULL,
    issued            TIMESTAMPTZ NOT NULL,
    modifier_id       TEXT,
    modified          TIMESTAMPTZ
);

CREATE UNIQUE INDEX dictionary_pk ON dictionary ( id );

ALTER TABLE dictionary *
 ADD CONSTRAINT dictionary_pk PRIMARY KEY
 USING INDEX dictionary_pk;

CREATE UNIQUE INDEX dictionary_uk ON dictionary ( voca_type,name );

ALTER TABLE dictionary *
 ADD CONSTRAINT dictionary_uk UNIQUE
 USING INDEX dictionary_uk;

COMMENT ON COLUMN dictionary.id IS 'id';

COMMENT ON COLUMN dictionary.name IS 'name';

COMMENT ON COLUMN dictionary.voca_type IS '어휘타입';

COMMENT ON COLUMN dictionary.approval_state IS '승인상태';

COMMENT ON COLUMN dictionary.issuer_id IS '등록자';

COMMENT ON COLUMN dictionary.issued IS '등록일시';

COMMENT ON COLUMN dictionary.modifier_id IS '수정자';

COMMENT ON COLUMN dictionary.modified IS '수정일시';

COMMENT ON TABLE dictionary IS '어휘사전';

CREATE TABLE distribution
(
    id                              TEXT NOT NULL,
    resource_id                     TEXT NOT NULL,
    title                           TEXT,
    description                     TEXT,
    access_url                      TEXT NOT NULL,
    issued                          TIMESTAMPTZ,
    modified                        TIMESTAMPTZ,
    rights                          TEXT,
    format                          TEXT,
    byte_size                       BIGINT,
    media_type                      TEXT,
    download_url                    TEXT,
    spatial_resolution_in_meters    TEXT,
    temporal_resolution             TEXT,
    conforms_to                     TEXT,
    license                         TEXT,
    schema_type                     TEXT,
    landing_page                    TEXT,
    landing_page_url                TEXT,
    storage_type                    TEXT,
    data_type                       TEXT,
    file_name                       TEXT,
    extras                          JSONB,
	version                         TEXT,
    version_description             TEXT,
    uri                             TEXT
);

CREATE UNIQUE INDEX distribution_pk ON distribution ( id );

ALTER TABLE distribution *
 ADD CONSTRAINT distribution_pk PRIMARY KEY
 USING INDEX distribution_pk;

COMMENT ON COLUMN distribution.id IS '배포ID';

COMMENT ON COLUMN distribution.resource_id IS '리소스 ID';

COMMENT ON COLUMN distribution.title IS '타이틀';

COMMENT ON COLUMN distribution.description IS '설명';

COMMENT ON COLUMN distribution.access_url IS '접근 URL';

COMMENT ON COLUMN distribution.issued IS '생성일자';

COMMENT ON COLUMN distribution.modified IS '수정일자';

COMMENT ON COLUMN distribution.rights IS '저작권';

COMMENT ON COLUMN distribution.format IS '포맷';

COMMENT ON COLUMN distribution.byte_size IS '크기';

COMMENT ON COLUMN distribution.media_type IS '미디어구분';

COMMENT ON COLUMN distribution.download_url IS '다운로드 URL';

COMMENT ON COLUMN distribution.spatial_resolution_in_meters IS '공간해상도';

COMMENT ON COLUMN distribution.temporal_resolution IS '시간해상도';

COMMENT ON COLUMN distribution.conforms_to IS 'conformsto';

COMMENT ON COLUMN distribution.license IS '라이선스';

COMMENT ON COLUMN distribution.schema_type IS '스키마구분';

COMMENT ON COLUMN distribution.landing_page IS '스키마정보';

COMMENT ON COLUMN distribution.landing_page_url IS '스키마정보URL';

COMMENT ON COLUMN distribution.storage_type IS '저장소 유형';

COMMENT ON COLUMN distribution.data_type IS '데이터유형';

COMMENT ON COLUMN distribution.file_name IS '파일명/URL';

COMMENT ON COLUMN distribution.extras IS 'extra필드';

COMMENT ON COLUMN distribution.version IS '버전';

COMMENT ON COLUMN distribution.version_description IS '버전설명';

COMMENT ON TABLE distribution IS '배포';

CREATE TABLE distribution_view
(
    id                 TEXT NOT NULL,
    distribution_id    TEXT NOT NULL,
    title              TEXT,
    description        TEXT,
    view_type          TEXT NOT NULL,
    view_order         INTEGER NOT NULL,
    config             TEXT
);

CREATE UNIQUE INDEX distribution_view_pk ON distribution_view ( id );

ALTER TABLE distribution_view *
 ADD CONSTRAINT distribution_view_pk PRIMARY KEY
 USING INDEX distribution_view_pk;

COMMENT ON COLUMN distribution_view.id IS 'id';

COMMENT ON COLUMN distribution_view.distribution_id IS 'Distribution ID';

COMMENT ON COLUMN distribution_view.title IS 'title';

COMMENT ON COLUMN distribution_view.description IS 'description';

COMMENT ON COLUMN distribution_view.view_type IS 'View Type';

COMMENT ON COLUMN distribution_view.view_order IS 'order';

COMMENT ON COLUMN distribution_view.config IS 'config';

COMMENT ON TABLE distribution_view IS 'distribution_view';

CREATE TABLE download_history
(
    resource_id        TEXT NOT NULL,
    timestamp          TIMESTAMPTZ NOT NULL,
    distribution_id    TEXT,
    user_id            TEXT,
    ip_addr            TEXT
);

CREATE UNIQUE INDEX download_history_pk ON download_history ( resource_id,timestamp );

ALTER TABLE download_history *
 ADD CONSTRAINT download_history_pk PRIMARY KEY
 USING INDEX download_history_pk;

COMMENT ON COLUMN download_history.resource_id IS '상품ID';

COMMENT ON COLUMN download_history.timestamp IS 'Timestamp';

COMMENT ON COLUMN download_history.distribution_id IS 'Distribution ID';

COMMENT ON COLUMN download_history.user_id IS '다운로드사용자ID';

COMMENT ON COLUMN download_history.ip_addr IS 'IP Address';

COMMENT ON TABLE download_history IS '상품다운로드이력';

CREATE TABLE harvest_gather_error
(
    id                TEXT NOT NULL,
    harvest_job_id    TEXT NOT NULL,
    message           TEXT,
    issued            TIMESTAMPTZ
);

CREATE UNIQUE INDEX harvest_gather_error_pk ON harvest_gather_error ( id );

ALTER TABLE harvest_gather_error *
 ADD CONSTRAINT harvest_gather_error_pk PRIMARY KEY
 USING INDEX harvest_gather_error_pk;

COMMENT ON COLUMN harvest_gather_error.id IS 'id';

COMMENT ON COLUMN harvest_gather_error.harvest_job_id IS 'harvest_job_id';

COMMENT ON COLUMN harvest_gather_error.message IS 'message';

COMMENT ON COLUMN harvest_gather_error.issued IS 'issued';

COMMENT ON TABLE harvest_gather_error IS 'harvest_gather_error';

CREATE TABLE harvest_job
(
    id                 TEXT NOT NULL,
    issued             TIMESTAMPTZ,
    gather_started     TIMESTAMPTZ,
    gather_finished    TIMESTAMPTZ,
    finished           TIMESTAMPTZ,
    source_id          TEXT NOT NULL,
    status             TEXT NOT NULL
);

CREATE UNIQUE INDEX harvest_job_pk ON harvest_job ( id );

ALTER TABLE harvest_job *
 ADD CONSTRAINT harvest_job_pk PRIMARY KEY
 USING INDEX harvest_job_pk;

COMMENT ON COLUMN harvest_job.id IS 'id';

COMMENT ON COLUMN harvest_job.issued IS 'issued';

COMMENT ON COLUMN harvest_job.gather_started IS 'gather_started';

COMMENT ON COLUMN harvest_job.gather_finished IS 'gather_finished';

COMMENT ON COLUMN harvest_job.finished IS 'finished';

COMMENT ON COLUMN harvest_job.source_id IS 'source_id';

COMMENT ON COLUMN harvest_job.status IS 'status';

COMMENT ON TABLE harvest_job IS 'harvest_job';

CREATE TABLE harvest_log
(
    id         TEXT NOT NULL,
    content    TEXT NOT NULL,
    level      TEXT,
    issued     TIMESTAMPTZ
);

CREATE UNIQUE INDEX harvest_log_pk ON harvest_log ( id );

ALTER TABLE harvest_log *
 ADD CONSTRAINT harvest_log_pk PRIMARY KEY
 USING INDEX harvest_log_pk;

COMMENT ON COLUMN harvest_log.id IS 'id';

COMMENT ON COLUMN harvest_log.content IS 'content';

COMMENT ON COLUMN harvest_log.level IS 'level';

COMMENT ON COLUMN harvest_log.issued IS 'issued';

COMMENT ON TABLE harvest_log IS 'harvest_log';

CREATE TABLE harvest_object
(
    id                        TEXT NOT NULL,
    guid                      TEXT,
    current                   BOOLEAN,
    gathered                  TIMESTAMPTZ,
    fetch_started             TIMESTAMPTZ,
    content                   TEXT,
    fetch_finished            TIMESTAMPTZ,
    import_started            TIMESTAMPTZ,
    import_finished           TIMESTAMPTZ,
    state                     TEXT,
    metadata_modified_date    TIMESTAMPTZ,
    retry_times               INTEGER,
    harvest_job_id            TEXT NOT NULL,
    harvest_source_id         TEXT NOT NULL,
    resource_id               TEXT,
    report_status             TEXT
);

CREATE UNIQUE INDEX harvest_object_pk ON harvest_object ( id );

ALTER TABLE harvest_object *
 ADD CONSTRAINT harvest_object_pk PRIMARY KEY
 USING INDEX harvest_object_pk;

COMMENT ON COLUMN harvest_object.id IS 'id';

COMMENT ON COLUMN harvest_object.guid IS 'guid';

COMMENT ON COLUMN harvest_object.current IS 'current';

COMMENT ON COLUMN harvest_object.gathered IS 'gathered';

COMMENT ON COLUMN harvest_object.fetch_started IS 'fetch_started';

COMMENT ON COLUMN harvest_object.content IS 'content';

COMMENT ON COLUMN harvest_object.fetch_finished IS 'fetch_finished';

COMMENT ON COLUMN harvest_object.import_started IS 'import_started';

COMMENT ON COLUMN harvest_object.import_finished IS 'import_finished';

COMMENT ON COLUMN harvest_object.state IS 'state';

COMMENT ON COLUMN harvest_object.metadata_modified_date IS 'metadata_modified_date';

COMMENT ON COLUMN harvest_object.retry_times IS 'retry_times';

COMMENT ON COLUMN harvest_object.harvest_job_id IS 'harvest_job_id';

COMMENT ON COLUMN harvest_object.harvest_source_id IS 'harvest_source_id';

COMMENT ON COLUMN harvest_object.resource_id IS 'resource_id';

COMMENT ON COLUMN harvest_object.report_status IS 'report_status';

COMMENT ON TABLE harvest_object IS 'harvest_object';

CREATE TABLE harvest_object_error
(
    id                   TEXT NOT NULL,
    harvest_object_id    TEXT NOT NULL,
    message              TEXT,
    stage                TEXT,
    line                 INTEGER,
    issued               TIMESTAMPTZ
);

CREATE UNIQUE INDEX harvest_object_error_pk ON harvest_object_error ( id );

ALTER TABLE harvest_object_error *
 ADD CONSTRAINT harvest_object_error_pk PRIMARY KEY
 USING INDEX harvest_object_error_pk;

COMMENT ON COLUMN harvest_object_error.id IS 'id';

COMMENT ON COLUMN harvest_object_error.harvest_object_id IS 'harvest_object_id';

COMMENT ON COLUMN harvest_object_error.message IS 'message';

COMMENT ON COLUMN harvest_object_error.stage IS 'stage';

COMMENT ON COLUMN harvest_object_error.line IS 'line';

COMMENT ON COLUMN harvest_object_error.issued IS 'issued';

COMMENT ON TABLE harvest_object_error IS 'harvest_object_error';

CREATE TABLE harvest_object_extra
(
    id                   TEXT NOT NULL,
    harvest_object_id    TEXT NOT NULL,
    key                  TEXT,
    value                TEXT
);

CREATE UNIQUE INDEX harvest_object_extra_pk ON harvest_object_extra ( id );

ALTER TABLE harvest_object_extra *
 ADD CONSTRAINT harvest_object_extra_pk PRIMARY KEY
 USING INDEX harvest_object_extra_pk;

COMMENT ON COLUMN harvest_object_extra.id IS 'id';

COMMENT ON COLUMN harvest_object_extra.harvest_object_id IS 'harvest_object_id';

COMMENT ON COLUMN harvest_object_extra.key IS 'key';

COMMENT ON COLUMN harvest_object_extra.value IS 'value';

COMMENT ON TABLE harvest_object_extra IS 'harvest_object_extra';

CREATE TABLE harvest_source
(
    id                TEXT NOT NULL,
    url               TEXT NOT NULL,
    title             TEXT,
    description       TEXT,
    config            TEXT,
    issued            TIMESTAMPTZ,
    type              TEXT NOT NULL,
    active            BOOLEAN,
    user_id           TEXT,
    publisher_id      TEXT,
    frequency         TEXT,
    next_run          TIMESTAMPTZ,
    approval_state    TEXT NOT NULL,
    storage_type      TEXT,
    tenant_id         TEXT NOT NULL
);

CREATE UNIQUE INDEX harvest_source_pk ON harvest_source ( id );

ALTER TABLE harvest_source *
 ADD CONSTRAINT harvest_source_pk PRIMARY KEY
 USING INDEX harvest_source_pk;

COMMENT ON COLUMN harvest_source.id IS 'id';

COMMENT ON COLUMN harvest_source.url IS 'url';

COMMENT ON COLUMN harvest_source.title IS 'title';

COMMENT ON COLUMN harvest_source.description IS 'description';

COMMENT ON COLUMN harvest_source.config IS 'config';

COMMENT ON COLUMN harvest_source.issued IS 'issued';

COMMENT ON COLUMN harvest_source.type IS 'type';

COMMENT ON COLUMN harvest_source.active IS 'active';

COMMENT ON COLUMN harvest_source.user_id IS 'user_id';

COMMENT ON COLUMN harvest_source.publisher_id IS 'publisher_id';

COMMENT ON COLUMN harvest_source.frequency IS 'frequency';

COMMENT ON COLUMN harvest_source.next_run IS 'next_run';

COMMENT ON COLUMN harvest_source.approval_state IS '승인상태';

COMMENT ON COLUMN harvest_source.storage_type IS '저장소 구분';

COMMENT ON COLUMN harvest_source.tenant_id IS '소유조직';

COMMENT ON TABLE harvest_source IS 'harvest_source';

CREATE TABLE license
(
    id             TEXT NOT NULL,
    name           TEXT,
	version        TEXT,
    description    TEXT,
    issued         TIMESTAMPTZ
);

CREATE UNIQUE INDEX license_pk ON license ( id );

ALTER TABLE license *
 ADD CONSTRAINT license_pk PRIMARY KEY
 USING INDEX license_pk;

COMMENT ON COLUMN license.id IS '라이선스 ID';

COMMENT ON COLUMN license.name IS '라이선스명';

COMMENT ON COLUMN license.version IS '버전';

COMMENT ON COLUMN license.description IS '설명';

COMMENT ON COLUMN license.issued IS '등록일';

COMMENT ON TABLE license IS '라이선스';

CREATE TABLE org_keyword_dic
(
    id           TEXT        NOT NULL,
    name         TEXT        NOT NULL,
    org_id       TEXT        NOT NULL,
    issuer_id    TEXT        NOT NULL,
    issued       TIMESTAMPTZ NOT NULL
);

CREATE UNIQUE INDEX org_keyword_dic_pk ON org_keyword_dic ( id );

ALTER TABLE org_keyword_dic *
 ADD CONSTRAINT org_keyword_dic_pk PRIMARY KEY
 USING INDEX org_keyword_dic_pk;

COMMENT ON COLUMN org_keyword_dic.id IS 'id';

COMMENT ON COLUMN org_keyword_dic.name IS 'name';

COMMENT ON COLUMN org_keyword_dic.org_id IS '소유조직ID';

COMMENT ON COLUMN org_keyword_dic.issuer_id IS '등록자';

COMMENT ON COLUMN org_keyword_dic.issued IS '등록일시';

COMMENT ON TABLE org_keyword_dic IS '조직키워드사전';

CREATE TABLE payment
(
    id                     TEXT        NOT NULL,
    pay_date               TIMESTAMPTZ NOT NULL,
	pay_amount             INTEGER     NOT NULL,
    pay_type               TEXT,
    pay_company            TEXT,
    pg_purchase            TEXT,
    pg_confirm             TEXT,
    confirm_num            TEXT,
    reg_id                 TEXT,
    reg_date               TIMESTAMPTZ,
    tid                    TEXT,
    token                  TEXT,
    net_cache_url          TEXT,
    auth_url               TEXT,
    check_ack_url          TEXT,
	payment_type           TEXT        NOT NULL,
    purchase_payment_id    TEXT
);

CREATE UNIQUE INDEX payment_pk ON payment ( id );

ALTER TABLE payment *
 ADD CONSTRAINT payment_pk PRIMARY KEY
 USING INDEX payment_pk;

COMMENT ON COLUMN payment.id IS '결제ID';

COMMENT ON COLUMN payment.pay_date IS '결제일시';

COMMENT ON COLUMN payment.pay_amount IS '결제금액';

COMMENT ON COLUMN payment.pay_type IS '결재방법(계좌이체, 카드, xx페이, ...)';

COMMENT ON COLUMN payment.pay_company IS '결제대행사';

COMMENT ON COLUMN payment.pg_purchase IS 'PG 거래정보';

COMMENT ON COLUMN payment.pg_confirm IS 'PG 승인정보';

COMMENT ON COLUMN payment.confirm_num IS '승인번호';

COMMENT ON COLUMN payment.reg_id IS '등록자ID';

COMMENT ON COLUMN payment.reg_date IS '등록일시';

COMMENT ON COLUMN payment.tid IS 'TID';

COMMENT ON COLUMN payment.token IS 'TOKEN';

COMMENT ON COLUMN payment.net_cache_url IS 'NET_CACHE_URL';

COMMENT ON COLUMN payment.auth_url IS 'AUTH_URL';

COMMENT ON COLUMN payment.check_ack_url IS 'CHECK_ACK_URL';

COMMENT ON COLUMN payment.payment_type IS '결제구분(purchase, cancel)';

COMMENT ON COLUMN payment.purchase_payment_id IS '기결제된구매결제ID';

COMMENT ON TABLE payment IS '결제';

CREATE TABLE price_condition
(
    goods_id            TEXT        NOT NULL,
    tenant_type         TEXT        NOT NULL,
    service_period      SMALLINT    NOT NULL,
    period_unit         TEXT        NOT NULL,
    service_count       SMALLINT    NOT NULL,
    valid_start         DATE        NOT NULL,
    valid_end           DATE        NOT NULL,
    price               INTEGER     NOT NULL,
    price_unit          TEXT,
    product_category    TEXT        NOT NULL,
    resource_type       TEXT        NOT NULL,
    description         TEXT,
    issuer_id           TEXT        NOT NULL,
    issued              TIMESTAMPTZ NOT NULL,
    modifier_id         TEXT,
    modified            TIMESTAMPTZ
);

CREATE UNIQUE INDEX price_condition_pk ON price_condition
( goods_id,tenant_type,service_period,period_unit,service_count,valid_start,valid_end );

ALTER TABLE price_condition *
 ADD CONSTRAINT price_condition_pk PRIMARY KEY
 USING INDEX price_condition_pk;

COMMENT ON COLUMN price_condition.goods_id IS '상품ID';

COMMENT ON COLUMN price_condition.tenant_type IS '테넌트구분(개인가격/조직가격)';

COMMENT ON COLUMN price_condition.service_period IS '제공기간';

COMMENT ON COLUMN price_condition.period_unit IS '제공기간단위(일/월/년)';

COMMENT ON COLUMN price_condition.service_count IS '제공횟수(Call수)';

COMMENT ON COLUMN price_condition.valid_start IS '유효시작일자';

COMMENT ON COLUMN price_condition.valid_end IS '유효종료일자';

COMMENT ON COLUMN price_condition.price IS '가격';

COMMENT ON COLUMN price_condition.price_unit IS '금액단위';

COMMENT ON COLUMN price_condition.product_category IS '상품구분';

COMMENT ON COLUMN price_condition.resource_type IS '상품타입';

COMMENT ON COLUMN price_condition.description IS '설명';

COMMENT ON COLUMN price_condition.issuer_id IS '등록자';

COMMENT ON COLUMN price_condition.issued IS '등록일시';

COMMENT ON COLUMN price_condition.modifier_id IS '수정자';

COMMENT ON COLUMN price_condition.modified IS '수정일시';

COMMENT ON TABLE price_condition IS '상품가격조건';

CREATE TABLE purchase
(
    purchase_id             TEXT        NOT NULL,
    purchaser_id            TEXT        NOT NULL,
    actual_purchased        TIMESTAMPTZ NOT NULL,
	purchase_type           TEXT        NOT NULL,
    purchase_object_type    TEXT        NOT NULL,
    purchase_payment_id     TEXT,
    cancel_payment_id       TEXT,
    canceled                TIMESTAMPTZ,
    cancel_reason           TEXT,
    refunded                TIMESTAMPTZ,
    refunded_reason         TEXT
);

CREATE UNIQUE INDEX purchase_pk ON purchase ( purchase_id );

ALTER TABLE purchase *
 ADD CONSTRAINT purchase_pk PRIMARY KEY
 USING INDEX purchase_pk;

COMMENT ON COLUMN purchase.purchase_id IS '구매ID';

COMMENT ON COLUMN purchase.purchaser_id IS '구매자ID';

COMMENT ON COLUMN purchase.actual_purchased IS '구매일시';

COMMENT ON COLUMN purchase.purchase_type IS '구매구분(confirm, cancel)';

COMMENT ON COLUMN purchase.purchase_object_type IS '구매대상구분(data, cloud)';

COMMENT ON COLUMN purchase.purchase_payment_id IS '구매결제ID';

COMMENT ON COLUMN purchase.cancel_payment_id IS '취소결제ID';

COMMENT ON COLUMN purchase.canceled IS '취소일시';

COMMENT ON COLUMN purchase.cancel_reason IS '취소사유';

COMMENT ON COLUMN purchase.refunded IS '환불일시';

COMMENT ON COLUMN purchase.refunded_reason IS '환불사유';

COMMENT ON TABLE purchase IS '상품구매';

CREATE TABLE purchase_detail
(
    purchase_id         TEXT NOT NULL,
    goods_id            TEXT NOT NULL,
    version             TEXT,
    price               INTEGER NOT NULL,
    tenant_type         TEXT,
    goods_type          TEXT NOT NULL,
    owner_id            TEXT NOT NULL,
    service_period      SMALLINT,
    period_unit         TEXT,
    service_start       DATE NOT NULL,
    service_end         DATE NOT NULL,
    service_count       SMALLINT,
    apikey              TEXT,
    issued              TIMESTAMPTZ NOT NULL,
    product_category    TEXT
);

CREATE UNIQUE INDEX purchase_detail_pk ON purchase_detail ( purchase_id,goods_id );

ALTER TABLE purchase_detail *
 ADD CONSTRAINT purchase_detail_pk PRIMARY KEY
 USING INDEX purchase_detail_pk;

COMMENT ON COLUMN purchase_detail.purchase_id IS '구매ID';

COMMENT ON COLUMN purchase_detail.goods_id IS '구매상품ID';

COMMENT ON COLUMN purchase_detail.version IS '버전';

COMMENT ON COLUMN purchase_detail.price IS '가격';

COMMENT ON COLUMN purchase_detail.tenant_type IS '테넌트구분(개인가격/조직가격)';

COMMENT ON COLUMN purchase_detail.goods_type IS '상품분류';

COMMENT ON COLUMN purchase_detail.owner_id IS '소유자id(사용권한자id)';

COMMENT ON COLUMN purchase_detail.service_period IS '제공기간';

COMMENT ON COLUMN purchase_detail.period_unit IS '제공기간단위(일/월/년)';

COMMENT ON COLUMN purchase_detail.service_start IS '기간시작일자';

COMMENT ON COLUMN purchase_detail.service_end IS '기간종료일자';

COMMENT ON COLUMN purchase_detail.service_count IS '제공횟수(Call수)';

COMMENT ON COLUMN purchase_detail.apikey IS 'API Key (엔드포인트인 경우)';

COMMENT ON COLUMN purchase_detail.issued IS '생성일시';

COMMENT ON COLUMN purchase_detail.product_category IS '상품구분';

COMMENT ON TABLE purchase_detail IS '구매상세내역';

CREATE TABLE rating
(
    id                 TEXT NOT NULL,
    user_id            TEXT NOT NULL,
    user_ip_address    TEXT,
    resource_id        TEXT NOT NULL,
    rating_type        TEXT,
    rating             INTEGER,
    issued             TIMESTAMPTZ,
    modifier_id        TEXT,
    modified           TIMESTAMPTZ
);

CREATE UNIQUE INDEX rating_pk ON rating ( id );

ALTER TABLE rating *
 ADD CONSTRAINT rating_pk PRIMARY KEY
 USING INDEX rating_pk;

COMMENT ON COLUMN rating.id IS 'id';

COMMENT ON COLUMN rating.user_id IS 'user_id(평가자id)';

COMMENT ON COLUMN rating.user_ip_address IS 'user_ip_address';

COMMENT ON COLUMN rating.resource_id IS 'resource_id';

COMMENT ON COLUMN rating.rating_type IS '평가구분';

COMMENT ON COLUMN rating.rating IS 'rating';

COMMENT ON COLUMN rating.issued IS 'issued';

COMMENT ON COLUMN rating.modifier_id IS '수정자';

COMMENT ON COLUMN rating.modified IS '수정일시';

COMMENT ON TABLE rating IS '사용자평가';

CREATE TABLE resource
(
    id                              TEXT NOT NULL,
    title                           TEXT,
    publisher_id                    TEXT,
    owner_id                        TEXT,
    creator_id                      TEXT,
    language                        TEXT,
    landing_page                    TEXT,
    description                     TEXT,
    type                            TEXT NOT NULL,
    issued                          TIMESTAMPTZ,
    modified                        TIMESTAMPTZ,
    conforms_to                     TEXT,
    version                         TEXT,
	version_description             TEXT,
    landing_page_url                TEXT,
    is_free                         BOOLEAN,
    is_public                       BOOLEAN,
    state                           TEXT,
    image_path                      TEXT,
    is_personal                     BOOLEAN,
    approval_state                  TEXT NOT NULL,
    extras                          JSONB,
    remove_type                     TEXT,
    dq_index                        NUMERIC(5,2),
    measure_date                    DATE,
    spatial_resolution_in_meters    TEXT,
    temporal_resolution             TEXT,
    spatial_uri                     TEXT,
    temporal_start                  TEXT,
    temporal_end                    TEXT,
    accrual_periodicity             TEXT,
    was_generated_by                TEXT,
    publisher_spatial_uri           TEXT,
    source_type                     TEXT,
    endpoint_description            TEXT,
    endpoint_url                    TEXT,
    serves_dataset                  TEXT,
    access_rights                   TEXT,
    license                         TEXT,
    method                          TEXT,
    uri                             TEXT
);

CREATE UNIQUE INDEX resource_pk ON resource ( id );

ALTER TABLE resource *
 ADD CONSTRAINT resource_pk PRIMARY KEY
 USING INDEX resource_pk;

COMMENT ON COLUMN resource.id IS '상품ID';

COMMENT ON COLUMN resource.title IS '상품명';

COMMENT ON COLUMN resource.publisher_id IS '상품등록자';

COMMENT ON COLUMN resource.owner_id IS '상품판매자';

COMMENT ON COLUMN resource.creator_id IS '상품생성자';

COMMENT ON COLUMN resource.language IS '언어';

COMMENT ON COLUMN resource.landing_page IS '랜딩페이지';

COMMENT ON COLUMN resource.description IS '설명';

COMMENT ON COLUMN resource.type IS '상품분류';

COMMENT ON COLUMN resource.issued IS '생성일자';

COMMENT ON COLUMN resource.modified IS '수정일자';

COMMENT ON COLUMN resource.conforms_to IS 'conformsto';

COMMENT ON COLUMN resource.version IS '버전';

COMMENT ON COLUMN resource.version_description IS '버전설명';

COMMENT ON COLUMN resource.landing_page_url IS '랜딩페이지URL';

COMMENT ON COLUMN resource.is_free IS '가격무료여부';

COMMENT ON COLUMN resource.is_public IS '공개여부';

COMMENT ON COLUMN resource.state IS '상품상태(라이프사이클)';

COMMENT ON COLUMN resource.image_path IS '상품이미지';

COMMENT ON COLUMN resource.is_personal IS '개인상품여부';

COMMENT ON COLUMN resource.approval_state IS '승인상태';

COMMENT ON COLUMN resource.extras IS 'extra 필드';

COMMENT ON COLUMN resource.remove_type IS '삭제타입';

COMMENT ON COLUMN resource.dq_index IS '데이터품질지수';

COMMENT ON COLUMN resource.measure_date IS '데이터품질지수측정일';

COMMENT ON COLUMN resource.spatial_resolution_in_meters IS '공간해상도';

COMMENT ON COLUMN resource.temporal_resolution IS '시간해상도';

COMMENT ON COLUMN resource.spatial_uri IS '공간정보(데이터)';

COMMENT ON COLUMN resource.temporal_start IS '시작일';

COMMENT ON COLUMN resource.temporal_end IS '종료일';

COMMENT ON COLUMN resource.accrual_periodicity IS '갱신주기';

COMMENT ON COLUMN resource.was_generated_by IS 'wasgeneratedby';

COMMENT ON COLUMN resource.publisher_spatial_uri IS '공간정보(제공자)';

COMMENT ON COLUMN resource.source_type IS '출처구분';

COMMENT ON COLUMN resource.endpoint_description IS '엔드포인트 설명';

COMMENT ON COLUMN resource.endpoint_url IS '엔드포인트 URL';

COMMENT ON COLUMN resource.serves_dataset IS 'servesdataset';

COMMENT ON COLUMN resource.access_rights IS '접근권한';

COMMENT ON COLUMN resource.license IS '라이선스';

COMMENT ON COLUMN resource.method IS '메소드';

COMMENT ON COLUMN resource.uri IS 'URI';

COMMENT ON TABLE resource IS '리소스';

CREATE TABLE resource_cate_meta_attr_value
(
    id                 TEXT NOT NULL,
    resource_id        TEXT NOT NULL,
    category_id        TEXT NOT NULL,
    attribute_name     TEXT NOT NULL,
    attribute_value    TEXT NOT NULL,
    issuer_id          TEXT NOT NULL,
    issued             TIMESTAMPTZ NOT NULL,
    modifier_id        TEXT,
    modified           TIMESTAMPTZ
);

CREATE UNIQUE INDEX resource_cate_meta_attr_value_pk ON resource_cate_meta_attr_value
( id );

ALTER TABLE resource_cate_meta_attr_value *
 ADD CONSTRAINT resource_cate_meta_attr_value_pk PRIMARY KEY
 USING INDEX resource_cate_meta_attr_value_pk;

CREATE INDEX resource_cate_meta_attr_value_ix1 ON resource_cate_meta_attr_value
( resource_id,category_id,attribute_name );

COMMENT ON COLUMN resource_cate_meta_attr_value.id IS 'ID';

COMMENT ON COLUMN resource_cate_meta_attr_value.resource_id IS '상품ID';

COMMENT ON COLUMN resource_cate_meta_attr_value.category_id IS '카테고리ID';

COMMENT ON COLUMN resource_cate_meta_attr_value.attribute_name IS '속성명';

COMMENT ON COLUMN resource_cate_meta_attr_value.attribute_value IS '속성값';

COMMENT ON COLUMN resource_cate_meta_attr_value.issuer_id IS '등록자';

COMMENT ON COLUMN resource_cate_meta_attr_value.issued IS '등록일시';

COMMENT ON COLUMN resource_cate_meta_attr_value.modifier_id IS '수정자';

COMMENT ON COLUMN resource_cate_meta_attr_value.modified IS '수정일시';

COMMENT ON TABLE resource_cate_meta_attr_value IS '상품카테고리메타속성값';

CREATE TABLE resource_category_map
(
    resource_id    TEXT NOT NULL,
    catalog_id     TEXT NOT NULL,
    node_type      TEXT NOT NULL,
    node_id        TEXT NOT NULL,
    issuer_id      TEXT NOT NULL,
    issued         TIMESTAMPTZ NOT NULL,
    modifier_id    TEXT,
    modified       TIMESTAMPTZ
);

CREATE UNIQUE INDEX resource_category_map_pk ON resource_category_map
( resource_id,catalog_id,node_type,node_id );

ALTER TABLE resource_category_map *
 ADD CONSTRAINT resource_category_map_pk PRIMARY KEY
 USING INDEX resource_category_map_pk;

COMMENT ON COLUMN resource_category_map.resource_id IS '상품ID';

COMMENT ON COLUMN resource_category_map.catalog_id IS '카탈로그ID';

COMMENT ON COLUMN resource_category_map.node_type IS '노드구분';

COMMENT ON COLUMN resource_category_map.node_id IS '노드ID';

COMMENT ON COLUMN resource_category_map.issuer_id IS '등록자';

COMMENT ON COLUMN resource_category_map.issued IS '등록일시';

COMMENT ON COLUMN resource_category_map.modifier_id IS '수정자';

COMMENT ON COLUMN resource_category_map.modified IS '수정일시';

COMMENT ON TABLE resource_category_map IS '상품분류매핑';

CREATE TABLE resource_keyword
(
    keyword_type    TEXT NOT NULL,
    keyword_id      TEXT NOT NULL,
    resource_id     TEXT NOT NULL,
    state           TEXT,
    issuer_id       TEXT NOT NULL,
    issued          TIMESTAMPTZ NOT NULL,
    modifier_id     TEXT,
    modified        TIMESTAMPTZ
);

CREATE UNIQUE INDEX resource_keyword_pk ON resource_keyword
( keyword_type,keyword_id,resource_id );

ALTER TABLE resource_keyword *
 ADD CONSTRAINT resource_keyword_pk PRIMARY KEY
 USING INDEX resource_keyword_pk;

COMMENT ON COLUMN resource_keyword.keyword_type IS '키워드구분';

COMMENT ON COLUMN resource_keyword.keyword_id IS '키워드 ID';

COMMENT ON COLUMN resource_keyword.resource_id IS '리소스 ID';

COMMENT ON COLUMN resource_keyword.state IS 'state';

COMMENT ON COLUMN resource_keyword.issuer_id IS '등록자';

COMMENT ON COLUMN resource_keyword.issued IS '등록일시';

COMMENT ON COLUMN resource_keyword.modifier_id IS '수정자';

COMMENT ON COLUMN resource_keyword.modified IS '수정일시';

COMMENT ON TABLE resource_keyword IS '리소스 키워드';

CREATE TABLE resource_relationship
(
    id                     TEXT NOT NULL,
    subject_resource_id    TEXT NOT NULL,
    object_resource_id     TEXT NOT NULL,
    relation_type          TEXT,
    description            TEXT,
    state                  TEXT,
    issuer_id              TEXT NOT NULL,
    issued                 TIMESTAMPTZ NOT NULL,
    modifier_id            TEXT,
    modified               TIMESTAMPTZ,
    had_role               TEXT
);

CREATE UNIQUE INDEX resource_relationship_pk ON resource_relationship ( id );

ALTER TABLE resource_relationship *
 ADD CONSTRAINT resource_relationship_pk PRIMARY KEY
 USING INDEX resource_relationship_pk;

COMMENT ON COLUMN resource_relationship.id IS 'id';

COMMENT ON COLUMN resource_relationship.subject_resource_id IS 'subject_resource_id';

COMMENT ON COLUMN resource_relationship.object_resource_id IS 'object_resource_id';

COMMENT ON COLUMN resource_relationship.relation_type IS 'RelationshipType';

COMMENT ON COLUMN resource_relationship.description IS 'Description';

COMMENT ON COLUMN resource_relationship.state IS 'state';

COMMENT ON COLUMN resource_relationship.issuer_id IS '등록자';

COMMENT ON COLUMN resource_relationship.issued IS '등록일시';

COMMENT ON COLUMN resource_relationship.modifier_id IS '수정자';

COMMENT ON COLUMN resource_relationship.modified IS '수정일시';

COMMENT ON COLUMN resource_relationship.had_role IS 'hadRole';

COMMENT ON TABLE resource_relationship IS '상품관계';

CREATE TABLE resource_usage
(
    id                  TEXT NOT NULL,
    tenant_id           TEXT NOT NULL,
    tenant_type         INTEGER NOT NULL,
    max_vm              INTEGER,
    max_gpu             INTEGER,
    max_cpu             DOUBLE PRECISION,
    max_memory          INTEGER,
    max_volume          INTEGER,
    max_deployment      INTEGER,
    max_pod             INTEGER,
    max_container       INTEGER,
    vm_usage            INTEGER,
    gpu_usage           INTEGER,
    cpu_usage           DOUBLE PRECISION,
    memory_usage        INTEGER,
    volume_usage        INTEGER,
    deployment_usage    INTEGER,
    pod_usage           INTEGER,
    container_usage     INTEGER,
    quota_type          INTEGER NOT NULL,
    issued              TIMESTAMPTZ NOT NULL,
    modified            TIMESTAMPTZ
);

CREATE UNIQUE INDEX resource_usage_pk ON resource_usage ( id );

ALTER TABLE resource_usage *
 ADD CONSTRAINT resource_usage_pk PRIMARY KEY
 USING INDEX resource_usage_pk;

COMMENT ON COLUMN resource_usage.id IS '아이디';

COMMENT ON COLUMN resource_usage.tenant_id IS '테넌트 ID';

COMMENT ON COLUMN resource_usage.tenant_type IS '테넌트구분';

COMMENT ON COLUMN resource_usage.max_vm IS 'VM 총량';

COMMENT ON COLUMN resource_usage.max_gpu IS 'GPU 총량';

COMMENT ON COLUMN resource_usage.max_cpu IS 'CPU 총량';

COMMENT ON COLUMN resource_usage.max_memory IS 'Memory 총량';

COMMENT ON COLUMN resource_usage.max_volume IS 'Volume 총량';

COMMENT ON COLUMN resource_usage.max_deployment IS 'Deployment 총량';

COMMENT ON COLUMN resource_usage.max_pod IS 'POD 총량';

COMMENT ON COLUMN resource_usage.max_container IS 'Container 총량';

COMMENT ON COLUMN resource_usage.vm_usage IS 'VM 사용량';

COMMENT ON COLUMN resource_usage.gpu_usage IS 'GPU 사용량';

COMMENT ON COLUMN resource_usage.cpu_usage IS 'CPU 사용량';

COMMENT ON COLUMN resource_usage.memory_usage IS 'Memory 사용량';

COMMENT ON COLUMN resource_usage.volume_usage IS 'Volume 사용량';

COMMENT ON COLUMN resource_usage.deployment_usage IS 'Deplolyment 사용량';

COMMENT ON COLUMN resource_usage.pod_usage IS 'Pod 사용량';

COMMENT ON COLUMN resource_usage.container_usage IS 'Container 사용량';

COMMENT ON COLUMN resource_usage.quota_type IS 'Quota구분';

COMMENT ON COLUMN resource_usage.issued IS '등록일시';

COMMENT ON COLUMN resource_usage.modified IS '수정일시';

COMMENT ON TABLE resource_usage IS '리소스 관리';

CREATE TABLE role
(
    role_id        TEXT NOT NULL,
    role_name      TEXT NOT NULL,
    issuer_id      TEXT NOT NULL,
    issued         TIMESTAMPTZ NOT NULL,
    modifier_id    TEXT,
    modified       TIMESTAMPTZ
);

CREATE UNIQUE INDEX role_pk ON role ( role_id );

ALTER TABLE role *
 ADD CONSTRAINT role_pk PRIMARY KEY
 USING INDEX role_pk;

COMMENT ON COLUMN role.role_id IS '역할ID';

COMMENT ON COLUMN role.role_name IS '역할명';

COMMENT ON COLUMN role.issuer_id IS '등록자';

COMMENT ON COLUMN role.issued IS '등록일시';

COMMENT ON COLUMN role.modifier_id IS '수정자';

COMMENT ON COLUMN role.modified IS '수정일시';

COMMENT ON TABLE role IS '역할';

CREATE TABLE shopping_basket
(
    purchaser_id     TEXT NOT NULL,
    goods_id         TEXT NOT NULL,
    goods_type       TEXT NOT NULL,
    basket_issued    TIMESTAMPTZ NOT NULL
);

CREATE UNIQUE INDEX shopping_basket_pk ON shopping_basket ( purchaser_id,goods_id );

ALTER TABLE shopping_basket *
 ADD CONSTRAINT shopping_basket_pk PRIMARY KEY
 USING INDEX shopping_basket_pk;

COMMENT ON COLUMN shopping_basket.purchaser_id IS '구매자ID';

COMMENT ON COLUMN shopping_basket.goods_id IS '구매상품ID';

COMMENT ON COLUMN shopping_basket.goods_type IS '상품분류';

COMMENT ON COLUMN shopping_basket.basket_issued IS '등록일시';

COMMENT ON TABLE shopping_basket IS '장바구니';

CREATE TABLE taxonomy
(
    id                      TEXT NOT NULL,
    valid_start             DATE NOT NULL,
    valid_end               DATE DEFAULT '9999-12-31'::date NOT NULL,
    title                   TEXT NOT NULL,
    description             TEXT,
    parent_id               TEXT,
    class_image_filename    TEXT,
    is_active               BOOLEAN,
    approval_state          TEXT,
    issuer_id               TEXT NOT NULL,
    issued                  TIMESTAMPTZ NOT NULL,
    modifier_id             TEXT,
    modified                TIMESTAMPTZ
);

CREATE UNIQUE INDEX taxonomy_pk ON taxonomy ( id,valid_start,valid_end );

ALTER TABLE taxonomy *
 ADD CONSTRAINT taxonomy_pk PRIMARY KEY
 USING INDEX taxonomy_pk;

CREATE UNIQUE INDEX taxonomy_ix1 ON taxonomy ( parent_id,id,valid_start,valid_end );

COMMENT ON COLUMN taxonomy.id IS '노드ID';

COMMENT ON COLUMN taxonomy.valid_start IS '유효시작일자';

COMMENT ON COLUMN taxonomy.valid_end IS '유효종료일자(99991231)';

COMMENT ON COLUMN taxonomy.title IS '노드명';

COMMENT ON COLUMN taxonomy.description IS '설명';

COMMENT ON COLUMN taxonomy.parent_id IS '상위노드ID';

COMMENT ON COLUMN taxonomy.class_image_filename IS '분류체계이미지';

COMMENT ON COLUMN taxonomy.is_active IS '활성화';

COMMENT ON COLUMN taxonomy.approval_state IS '승인상태';

COMMENT ON COLUMN taxonomy.issuer_id IS '등록자';

COMMENT ON COLUMN taxonomy.issued IS '등록일시';

COMMENT ON COLUMN taxonomy.modifier_id IS '수정자';

COMMENT ON COLUMN taxonomy.modified IS '수정일시';

COMMENT ON TABLE taxonomy IS '분류체계';

CREATE TABLE taxonomy_version
(
    version_id      TEXT NOT NULL,
    version         TEXT NOT NULL,
    version_date    DATE NOT NULL,
    description     TEXT,
    issuer_id       TEXT NOT NULL,
    issued          TIMESTAMPTZ NOT NULL,
    modifier_id     TEXT,
    modified        TIMESTAMPTZ,
    topic_id        TEXT
);

CREATE UNIQUE INDEX taxonomy_version_pk ON taxonomy_version ( version_id );

ALTER TABLE taxonomy_version *
 ADD CONSTRAINT taxonomy_version_pk PRIMARY KEY
 USING INDEX taxonomy_version_pk;

COMMENT ON COLUMN taxonomy_version.version_id IS '버전id';

COMMENT ON COLUMN taxonomy_version.version IS '버전번호';

COMMENT ON COLUMN taxonomy_version.version_date IS '버전날짜';

COMMENT ON COLUMN taxonomy_version.description IS '버전설명';

COMMENT ON COLUMN taxonomy_version.issuer_id IS '등록자';

COMMENT ON COLUMN taxonomy_version.issued IS '등록일시';

COMMENT ON COLUMN taxonomy_version.modifier_id IS '수정자';

COMMENT ON COLUMN taxonomy_version.modified IS '수정일시';

COMMENT ON COLUMN taxonomy_version.topic_id IS '토픽 아이디';

COMMENT ON TABLE taxonomy_version IS '분류체계버전';

CREATE TABLE tenant
(
    id                                      TEXT NOT NULL,
    name                                    TEXT NOT NULL,
    title                                   TEXT NOT NULL,
    description                             TEXT,
    tenant_type                             TEXT NOT NULL,
    state                                   TEXT,
    approval_state                          TEXT NOT NULL,
    is_creator                              BOOLEAN,
    uri                                     TEXT,
    tenant_type_uri_id                      TEXT,
    orgname_eng                             TEXT,
    busi_reg_num                            TEXT,
    image_url                               TEXT,
    representative_phone_number             TEXT,
    representative_name                     TEXT,
    address                                 TEXT,
    extras                                  JSONB,
    homepage_url                            TEXT,
    org_logo_filename                       TEXT,
    password                                TEXT,
    family_name                             TEXT,
    email                                   TEXT,
    reset_key                               TEXT,
    activity_streams_email_notifications    BOOLEAN DEFAULT 'false',
    phone_number                            TEXT,
    issuer_id                               TEXT NOT NULL,
    issued                                  TIMESTAMPTZ,
    modifier_id                             TEXT,
    modified                                TIMESTAMPTZ
);

CREATE UNIQUE INDEX tenant_pk ON tenant ( id );

ALTER TABLE tenant *
 ADD CONSTRAINT tenant_pk PRIMARY KEY
 USING INDEX tenant_pk;

COMMENT ON COLUMN tenant.id IS 'ID';

COMMENT ON COLUMN tenant.name IS 'name';

COMMENT ON COLUMN tenant.title IS 'title';

COMMENT ON COLUMN tenant.description IS 'Description';

COMMENT ON COLUMN tenant.tenant_type IS '테넌트구분';

COMMENT ON COLUMN tenant.state IS '가입탈퇴여부';

COMMENT ON COLUMN tenant.approval_state IS '승인상태';

COMMENT ON COLUMN tenant.is_creator IS '생성자여부';

COMMENT ON COLUMN tenant.uri IS 'URI';

COMMENT ON COLUMN tenant.tenant_type_uri_id IS 'tenantTypeURI id';

COMMENT ON COLUMN tenant.orgname_eng IS '조직명 영문';

COMMENT ON COLUMN tenant.busi_reg_num IS '사업자등록번호';

COMMENT ON COLUMN tenant.image_url IS 'image_url';

COMMENT ON COLUMN tenant.representative_phone_number IS '대표전화번호';

COMMENT ON COLUMN tenant.representative_name IS '대표자명';

COMMENT ON COLUMN tenant.address IS '주소';

COMMENT ON COLUMN tenant.extras IS 'extras';

COMMENT ON COLUMN tenant.homepage_url IS '홈페이지URL';

COMMENT ON COLUMN tenant.org_logo_filename IS '회사로고이미지';

COMMENT ON COLUMN tenant.password IS 'password';

COMMENT ON COLUMN tenant.family_name IS 'family_name';

COMMENT ON COLUMN tenant.email IS 'email';

COMMENT ON COLUMN tenant.reset_key IS 'reset_key';

COMMENT ON COLUMN tenant.activity_streams_email_notifications IS 'activity_streams_email_notifications';

COMMENT ON COLUMN tenant.phone_number IS 'phone_number';

COMMENT ON COLUMN tenant.issuer_id IS '등록자';

COMMENT ON COLUMN tenant.issued IS '등록일';

COMMENT ON COLUMN tenant.modifier_id IS '수정자';

COMMENT ON COLUMN tenant.modified IS '수정일시';

COMMENT ON TABLE tenant IS '구성원';

CREATE TABLE tenant_relation
(
    id                TEXT NOT NULL,
    org_id            TEXT NOT NULL,
    user_id           TEXT NOT NULL,
    state             TEXT,
    issuer_id         TEXT NOT NULL,
    issued            TIMESTAMPTZ NOT NULL,
    modifier_id       TEXT,
    modified          TIMESTAMPTZ,
    approval_state    TEXT
);

CREATE UNIQUE INDEX tenant_relation_pk ON tenant_relation ( id );

ALTER TABLE tenant_relation *
 ADD CONSTRAINT tenant_relation_pk PRIMARY KEY
 USING INDEX tenant_relation_pk;

COMMENT ON COLUMN tenant_relation.id IS 'ID';

COMMENT ON COLUMN tenant_relation.org_id IS '조직 ID';

COMMENT ON COLUMN tenant_relation.user_id IS 'User ID';

COMMENT ON COLUMN tenant_relation.state IS '가입탈퇴여부';

COMMENT ON COLUMN tenant_relation.issuer_id IS '등록자';

COMMENT ON COLUMN tenant_relation.issued IS '등록일시';

COMMENT ON COLUMN tenant_relation.modifier_id IS '수정자';

COMMENT ON COLUMN tenant_relation.modified IS '수정일시';

COMMENT ON COLUMN tenant_relation.approval_state IS '승인상태';

COMMENT ON TABLE tenant_relation IS '테넌트관계';

CREATE TABLE tenant_type_uri
(
    id      TEXT NOT NULL,
    name    TEXT,
    uri     TEXT NOT NULL
);

CREATE UNIQUE INDEX tenant_type_uri_pk ON tenant_type_uri ( id );

ALTER TABLE tenant_type_uri *
 ADD CONSTRAINT tenant_type_uri_pk PRIMARY KEY
 USING INDEX tenant_type_uri_pk;

COMMENT ON COLUMN tenant_type_uri.id IS 'id';

COMMENT ON COLUMN tenant_type_uri.name IS 'name';

COMMENT ON COLUMN tenant_type_uri.uri IS 'uri';

COMMENT ON TABLE tenant_type_uri IS 'tenantTypeURI';

CREATE TABLE user_following_object
(
    follower_id    TEXT NOT NULL,
    object_id      TEXT NOT NULL,
    issued         TIMESTAMPTZ NOT NULL,
    object_type    TEXT NOT NULL,
    issuer_id      TEXT NOT NULL,
    modifier_id    TEXT,
    modified       TIMESTAMPTZ
);

CREATE UNIQUE INDEX user_following_object_pk ON user_following_object
( follower_id,object_id );

ALTER TABLE user_following_object *
 ADD CONSTRAINT user_following_object_pk PRIMARY KEY
 USING INDEX user_following_object_pk;

COMMENT ON COLUMN user_following_object.follower_id IS 'follower_id';

COMMENT ON COLUMN user_following_object.object_id IS 'object_id';

COMMENT ON COLUMN user_following_object.issued IS 'issued';

COMMENT ON COLUMN user_following_object.object_type IS 'object_type';

COMMENT ON COLUMN user_following_object.issuer_id IS '등록자';

COMMENT ON COLUMN user_following_object.modifier_id IS '수정자';

COMMENT ON COLUMN user_following_object.modified IS '수정일시';

COMMENT ON TABLE user_following_object IS '관심객체';

CREATE TABLE user_role
(
    user_id               TEXT NOT NULL,
    role_id               TEXT NOT NULL,
    tenant_relation_id    TEXT NOT NULL,
    issuer_id             TEXT NOT NULL,
    issued                TIMESTAMPTZ NOT NULL,
    modifier_id           TEXT,
    modified              TIMESTAMPTZ
);

CREATE UNIQUE INDEX user_role_pk ON user_role ( role_id,user_id,tenant_relation_id );

ALTER TABLE user_role *
 ADD CONSTRAINT user_role_pk PRIMARY KEY
 USING INDEX user_role_pk;

COMMENT ON COLUMN user_role.user_id IS '사용자ID';

COMMENT ON COLUMN user_role.role_id IS '역할ID';

COMMENT ON COLUMN user_role.tenant_relation_id IS '테넌트 릴레이션 ID';

COMMENT ON COLUMN user_role.issuer_id IS '등록자';

COMMENT ON COLUMN user_role.issued IS '등록일시';

COMMENT ON COLUMN user_role.modifier_id IS '수정자';

COMMENT ON COLUMN user_role.modified IS '수정일시';

COMMENT ON TABLE user_role IS '사용자역할';

CREATE TABLE catalog_record
(
    catalog_record_id    TEXT NOT NULL,
    catalog_id           TEXT NOT NULL,
    resource_id          TEXT NOT NULL,
    conforms_to          TEXT,
    contributor          TEXT,
    description          TEXT,
    issued               TIMESTAMPTZ,
    modified             TIMESTAMPTZ,
    title                TEXT
);

COMMENT ON COLUMN catalog_record.catalog_record_id IS 'CatalogRecordID';

COMMENT ON COLUMN catalog_record.catalog_id IS '카탈로그ID';

COMMENT ON COLUMN catalog_record.resource_id IS '상품ID';

COMMENT ON COLUMN catalog_record.conforms_to IS 'conformsTo';

COMMENT ON COLUMN catalog_record.contributor IS 'contributor (tenant_id)';

COMMENT ON COLUMN catalog_record.description IS 'description';

COMMENT ON COLUMN catalog_record.issued IS 'issued';

COMMENT ON COLUMN catalog_record.modified IS 'modified';

COMMENT ON COLUMN catalog_record.title IS 'title';

COMMENT ON TABLE catalog_record IS 'CatalogRecord';

CREATE UNIQUE INDEX catalog_record_pk ON catalog_record ( catalog_record_id );

ALTER TABLE catalog_record *
 ADD CONSTRAINT catalog_record_pk PRIMARY KEY
 USING INDEX catalog_record_pk;
