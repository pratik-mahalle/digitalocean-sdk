"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_path_1 = __importDefault(require("node:path"));
const Fs = __importStar(require("node:fs"));
const node_test_1 = require("node:test");
const node_assert_1 = __importDefault(require("node:assert"));
const live_runner_1 = require("../../live-runner");
const live_entity_1 = require("../../live-entity");
const __1 = require("../../..");
const utility_1 = require("../../utility");
(0, utility_1.loadEnvLocal)(__dirname + '/../../../.env.local');
(0, node_test_1.describe)('ApiCreateKnowledgeBaseDataSourceOutputEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when DIGITALOCEAN_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('DIGITALOCEAN_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.DigitaloceanSDK.test();
        const ent = testsdk.ApiCreateKnowledgeBaseDataSourceOutput();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.DigitaloceanSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.ApiCreateKnowledgeBaseDataSourceOutput().create({ "knowledge_base_id": 1 }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.DIGITALOCEAN_TEST_LIVE;
        for (const op of ['create']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'api_create_knowledge_base_data_source_output.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "aws_data_source": { "a": true, "h": "Aws Data Source", "n": "aws_data_source", "r": false, "sh": "AWS S3 Data Source for Display", "t": "`$OBJECT`", "key$": "aws_data_source", "index$": 0 }, "bucket_name": { "a": true, "h": "Bucket Name", "n": "bucket_name", "r": false, "sh": "Name of storage bucket - Deprecated, moved to data_source_details", "t": "`$STRING`", "key$": "bucket_name", "index$": 1 }, "chunking_algorithm": { "a": true, "h": "Chunking Algorithm", "n": "chunking_algorithm", "r": false, "t": "`$STRING`", "key$": "chunking_algorithm", "index$": 2 }, "chunking_options": { "a": true, "h": "Chunking Options", "n": "chunking_options", "r": false, "t": "`$OBJECT`", "key$": "chunking_options", "index$": 3 }, "created_at": { "a": true, "fo": "date-time", "h": "Created At", "n": "created_at", "r": false, "sh": "Creation date / time", "t": "`$STRING`", "key$": "created_at", "index$": 4 }, "dropbox_data_source": { "a": true, "h": "Dropbox Data Source", "n": "dropbox_data_source", "r": false, "sh": "Dropbox Data Source for Display", "t": "`$OBJECT`", "key$": "dropbox_data_source", "index$": 5 }, "file_upload_data_source": { "a": true, "h": "File Upload Data Source", "n": "file_upload_data_source", "r": false, "sh": "File to upload as data source for knowledge base.", "t": "`$OBJECT`", "key$": "file_upload_data_source", "index$": 6 }, "google_drive_data_source": { "a": true, "h": "Google Drive Data Source", "n": "google_drive_data_source", "r": false, "sh": "Google Drive Data Source for Display", "t": "`$OBJECT`", "key$": "google_drive_data_source", "index$": 7 }, "item_path": { "a": true, "h": "Item Path", "n": "item_path", "r": false, "sh": "Path of folder or object in bucket - Deprecated, moved to data_source_details", "t": "`$STRING`", "key$": "item_path", "index$": 8 }, "knowledge_base_uuid": { "a": true, "h": "Knowledge Base Uuid", "n": "knowledge_base_uuid", "r": false, "sh": "Knowledge base id", "t": "`$STRING`", "key$": "knowledge_base_uuid", "index$": 9 }, "last_datasource_indexing_job": { "a": true, "h": "Last Datasource Indexing Job", "n": "last_datasource_indexing_job", "r": false, "t": "`$OBJECT`", "key$": "last_datasource_indexing_job", "index$": 10 }, "region": { "a": true, "h": "Region", "n": "region", "r": false, "sh": "Region code - Deprecated, moved to data_source_details", "t": "`$STRING`", "key$": "region", "index$": 11 }, "spaces_data_source": { "a": true, "h": "Spaces Data Source", "n": "spaces_data_source", "r": false, "sh": "Spaces Bucket Data Source", "t": "`$OBJECT`", "key$": "spaces_data_source", "index$": 12 }, "updated_at": { "a": true, "fo": "date-time", "h": "Updated At", "n": "updated_at", "r": false, "sh": "Last modified", "t": "`$STRING`", "key$": "updated_at", "index$": 13 }, "uuid": { "a": true, "h": "Uuid", "n": "uuid", "r": false, "sh": "Unique id of knowledge base", "t": "`$STRING`", "key$": "uuid", "index$": 14 }, "web_crawler_data_source": { "a": true, "h": "Web Crawler Data Source", "n": "web_crawler_data_source", "r": false, "sh": "WebCrawlerDataSource", "t": "`$OBJECT`", "key$": "web_crawler_data_source", "index$": 15 } }, "name": "api_create_knowledge_base_data_source_output", "op": { "create": { "input": "data", "name": "create", "points": [{ "a": true, "co": { "id": "POST /v2/gen-ai/knowledge_bases/{knowledge_base_uuid}/data_sources", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "ex": "\"123e4567-e89b-12d3-a456-426614174000\"", "k": "param", "n": "knowledge_base_id", "or": "knowledge_base_uuid", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "POST", "o": "/v2/gen-ai/knowledge_bases/{knowledge_base_uuid}/data_sources", "q": { "exist": ["knowledge_base_id"] }, "r": { "param": { "knowledge_base_uuid": "knowledge_base_id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "v2" }, { "lit": "gen-ai" }, { "lit": "knowledge_bases" }, { "var": "knowledge_base_id" }, { "lit": "data_sources" }], "t": { "req": "`reqdata`", "res": "`body.knowledge_base_data_source`" }, "index$": 0 }], "key$": "create" } }, "relations": { "ancestors": [] }, "key$": "api_create_knowledge_base_data_source_output", "name__orig": "api_create_knowledge_base_data_source_output", "Name": "ApiCreateKnowledgeBaseDataSourceOutput", "name_": "api_create_knowledge_base_data_source_output", "name-": "api-create-knowledge-base-data-source-output", "NAME": "API_CREATE_KNOWLEDGE_BASE_DATA_SOURCE_OUTPUT", "index$": 8 }, { "active": true, "entity": "api_create_knowledge_base_data_source_output", "key$": "BasicApiCreateKnowledgeBaseDataSourceOutputFlow", "kind": "basic", "name": "BasicApiCreateKnowledgeBaseDataSourceOutputFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "api_create_knowledge_base_data_source_output_ref01" }, "m": { "knowledge_base_id": "knowledge_base01" }, "o": "create", "s": [], "v": [], "index$": 0 }] }, 'ApiCreateKnowledgeBaseDataSourceOutput', { "POST /v2/gen-ai/knowledge_bases/{knowledge_base_uuid}/data_sources": { "protocol": "http", "requestBody": { "content": { "application/json": { "schema": { "description": "Data to create a knowledge base data source", "properties": { "aws_data_source": { "description": "AWS S3 Data Source", "properties": { "bucket_name": { "description": "Spaces bucket name", "example": "example name", "type": "string" }, "item_path": { "example": "example string", "type": "string" }, "key_id": { "description": "The AWS Key ID", "example": "123e4567-e89b-12d3-a456-426614174000", "type": "string" }, "region": { "description": "Region of bucket", "example": "example string", "type": "string" }, "secret_key": { "description": "The AWS Secret Key", "example": "example string", "type": "string" } }, "type": "object", "x-ref": "#/components/schemas/apiAWSDataSource", "key$": "aws_data_source" }, "chunking_algorithm": { "default": "CHUNKING_ALGORITHM_UNKNOWN", "enum": ["CHUNKING_ALGORITHM_UNKNOWN", "CHUNKING_ALGORITHM_SECTION_BASED", "CHUNKING_ALGORITHM_HIERARCHICAL", "CHUNKING_ALGORITHM_SEMANTIC", "CHUNKING_ALGORITHM_FIXED_LENGTH"], "example": "CHUNKING_ALGORITHM_UNKNOWN", "type": "string", "x-ref": "#/components/schemas/apiChunkingAlgorithm", "key$": "chunking_algorithm" }, "chunking_options": { "properties": { "child_chunk_size": { "example": 350, "format": "int64", "type": "integer" }, "max_chunk_size": { "description": "Common options", "example": 750, "format": "int64", "type": "integer" }, "parent_chunk_size": { "description": "Hierarchical options", "example": 1000, "format": "int64", "type": "integer" }, "semantic_threshold": { "description": "Semantic options", "example": 0.5, "format": "float", "type": "number" } }, "type": "object", "x-ref": "#/components/schemas/apiChunkingOptions", "key$": "chunking_options" }, "knowledge_base_uuid": { "description": "Knowledge base id", "example": "\"12345678-1234-1234-1234-123456789012\"", "type": "string", "key$": "knowledge_base_uuid" }, "spaces_data_source": { "description": "Spaces Bucket Data Source", "properties": { "bucket_name": { "description": "Spaces bucket name", "example": "example name", "type": "string" }, "item_path": { "example": "example string", "type": "string" }, "region": { "description": "Region of bucket", "example": "example string", "type": "string" } }, "type": "object", "x-ref": "#/components/schemas/apiSpacesDataSource", "key$": "spaces_data_source" }, "web_crawler_data_source": { "description": "WebCrawlerDataSource", "properties": { "base_url": { "description": "The base url to crawl.", "example": "example string", "type": "string" }, "crawling_option": { "default": "UNKNOWN", "description": "Options for specifying how URLs found on pages should be handled.\n\n - UNKNOWN: Default unknown value\n - SCOPED: Only include the base URL.\n - PATH: Crawl the base URL and linked pages within the URL path.\n - DOMAIN: Crawl the base URL and linked pages within the same domain.\n - SUBDOMAINS: Crawl the base URL and linked pages for any subdomain.\n - SITEMAP: Crawl URLs discovered in the sitemap.", "enum": ["UNKNOWN", "SCOPED", "PATH", "DOMAIN", "SUBDOMAINS", "SITEMAP"], "example": "UNKNOWN", "type": "string", "x-ref": "#/components/schemas/apiCrawlingOption" }, "embed_media": { "description": "Whether to ingest and index media (images, etc.) on web pages.", "example": true, "type": "boolean" }, "exclude_tags": { "description": "Declaring which tags to exclude in web pages while webcrawling", "example": ["example string"], "items": { "example": "example string", "type": "string" }, "type": "array" } }, "type": "object", "x-ref": "#/components/schemas/apiWebCrawlerDataSource", "key$": "web_crawler_data_source" } }, "type": "object", "x-ref": "#/components/schemas/apiCreateKnowledgeBaseDataSourceInputPublic", "index$": 1 } } } }, "parameters": [{ "description": "Knowledge base id", "example": "\"123e4567-e89b-12d3-a456-426614174000\"", "in": "path", "name": "knowledge_base_uuid", "required": true, "schema": { "type": "string" }, "index$": 0 }] } }, { strict: LIVE_STRICT, t });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const api_create_knowledge_base_data_source_output_ref01_ent = client.ApiCreateKnowledgeBaseDataSourceOutput();
        let api_create_knowledge_base_data_source_output_ref01_data = setup.data.new.api_create_knowledge_base_data_source_output['api_create_knowledge_base_data_source_output_ref01'];
        api_create_knowledge_base_data_source_output_ref01_data['knowledge_base_id'] = setup.idmap['knowledge_base01'];
        api_create_knowledge_base_data_source_output_ref01_data = (await api_create_knowledge_base_data_source_output_ref01_ent.create(api_create_knowledge_base_data_source_output_ref01_data)).data();
        (0, node_assert_1.default)(null != api_create_knowledge_base_data_source_output_ref01_data);
    });
});
// main.kit.test.live.strict is true (the default is true): a live
// request that fails, or a live test missing an input it needs,
// fails the test.
// An account with no record for a test to read skips it either way.
const LIVE_STRICT = true;
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/api_create_knowledge_base_data_source_output/ApiCreateKnowledgeBaseDataSourceOutputTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.DigitaloceanSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['api_create_knowledge_base_data_source_output01', 'api_create_knowledge_base_data_source_output02', 'api_create_knowledge_base_data_source_output03', 'knowledge_base01'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'DIGITALOCEAN_TEST_API_CREATE_KNOWLEDGE_BASE_DATA_SOURCE_OUTPUT_ENTID': idmap,
        'DIGITALOCEAN_TEST_LIVE': 'FALSE',
        'DIGITALOCEAN_TEST_EXPLAIN': 'FALSE',
        'DIGITALOCEAN_APIKEY': '',
    });
    idmap = env['DIGITALOCEAN_TEST_API_CREATE_KNOWLEDGE_BASE_DATA_SOURCE_OUTPUT_ENTID'];
    const live = 'TRUE' === env.DIGITALOCEAN_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['DIGITALOCEAN_TEST_API_CREATE_KNOWLEDGE_BASE_DATA_SOURCE_OUTPUT_ENTID'];
        idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {};
        if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
            throw new Error('Live ENTID must be a JSON object');
        }
        client = new __1.DigitaloceanSDK(merge([
            // FIRST, so the generated fields below win: sdk-test-control.json's
            // test.client.options adds to the live client, it does not redirect it.
            (0, utility_1.liveClientOptions)(),
            {
                apikey: env.DIGITALOCEAN_APIKEY,
            },
            // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
            // last entry is undefined, and basicSetup is normally called with no
            // argument at all - so a bare 'extra' silently discarded the apikey
            // and server values above and handed the SDK undefined. Harmless
            // while there was nothing in that object; not harmless now.
            extra || {},
            { system: { fetch: transport.fetch } }
        ]));
    }
    const setup = {
        idmap,
        env,
        options,
        client,
        struct,
        data: entityData,
        explain: 'TRUE' === env.DIGITALOCEAN_TEST_EXPLAIN,
        live,
        transport,
        now: Date.now(),
    };
    return setup;
}
//# sourceMappingURL=ApiCreateKnowledgeBaseDataSourceOutputEntity.test.js.map