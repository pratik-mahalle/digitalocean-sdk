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
(0, node_test_1.describe)('ApiUpdateKnowledgeBaseOutputEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when DIGITALOCEAN_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('DIGITALOCEAN_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.DigitaloceanSDK.test();
        const ent = testsdk.ApiUpdateKnowledgeBaseOutput();
        (0, node_assert_1.default)(null != ent);
    });
    class FailHook extends __1.BaseFeature {
        name = 'failhook';
        version = '0.0.1';
        active = true;
        unexpected = 0;
        init() { }
        PreSpec() { throw new Error('api_update_knowledge_base_output hook failed'); }
        PreUnexpected() { this.unexpected++; }
    }
    (0, node_test_1.test)('stream-error', async () => {
        const offline = { net: { offline: true } };
        await node_assert_1.default.rejects(async () => {
            for await (const _item of __1.DigitaloceanSDK.test(offline).ApiUpdateKnowledgeBaseOutput().stream('list')) { }
        }, /offline/);
        for await (const _item of __1.DigitaloceanSDK.test(offline).ApiUpdateKnowledgeBaseOutput()
            .stream('list', undefined, { ctrl: { throw: false } })) { }
        if (null != __1.config.feature?.rbac) {
            const denied = __1.DigitaloceanSDK.test(undefined, { feature: { rbac: { active: true, deny: true } } });
            await node_assert_1.default.rejects(async () => {
                for await (const _item of denied.ApiUpdateKnowledgeBaseOutput().stream('list')) { }
            }, (err) => 'rbac_denied' === err.code);
        }
    });
    (0, node_test_1.test)('stream-ctrl', async () => {
        const explain = {};
        const ctrl = { explain };
        for await (const _item of __1.DigitaloceanSDK.test().ApiUpdateKnowledgeBaseOutput().stream('list', undefined, { ctrl })) { }
        node_assert_1.default.deepStrictEqual(Object.keys(ctrl), ['explain']);
        (0, node_assert_1.default)(explain === ctrl.explain && 0 < Object.keys(explain).length);
    });
    (0, node_test_1.test)('unexpected', async () => {
        const hook = new FailHook();
        const client = new __1.DigitaloceanSDK({ feature: { test: { active: true } }, extend: [hook] });
        await node_assert_1.default.rejects(client.ApiUpdateKnowledgeBaseOutput().list(), /hook failed/);
        (0, node_assert_1.default)(0 < hook.unexpected);
        const fired = hook.unexpected;
        node_assert_1.default.strictEqual(await client.ApiUpdateKnowledgeBaseOutput().list(undefined, { throw: false }), undefined);
        (0, node_assert_1.default)(fired < hook.unexpected);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.DigitaloceanSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.ApiUpdateKnowledgeBaseOutput().list({ "page": "x" }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.DIGITALOCEAN_TEST_LIVE;
        for (const op of ['create', 'list', 'update']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'api_update_knowledge_base_output.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "added_to_agent_at": { "a": true, "fo": "date-time", "h": "Added To Agent At", "n": "added_to_agent_at", "r": false, "sh": "Time when the knowledge base was added to the agent", "t": "`$STRING`", "key$": "added_to_agent_at", "index$": 0 }, "created_at": { "a": true, "fo": "date-time", "h": "Created At", "n": "created_at", "r": false, "sh": "Creation date / time", "t": "`$STRING`", "key$": "created_at", "index$": 1 }, "database_id": { "a": true, "h": "Database Id", "n": "database_id", "r": false, "sh": "Identifier of the DigitalOcean OpenSearch database this knowledge base will use, optional.", "t": "`$STRING`", "key$": "database_id", "index$": 2 }, "datasources": { "a": true, "h": "Datasources", "n": "datasources", "r": false, "sh": "Optional data sources to attach at creation.", "t": "`$ARRAY`", "key$": "datasources", "index$": 3 }, "embedding_model_uuid": { "a": true, "h": "Embedding Model Uuid", "n": "embedding_model_uuid", "r": false, "sh": "Identifier for the [embedding model](https://docs.digitalocean.com/products/genai-platform/details/models/#embedding-models).", "t": "`$STRING`", "key$": "embedding_model_uuid", "index$": 4 }, "is_public": { "a": true, "h": "Is Public", "n": "is_public", "r": false, "sh": "Whether the knowledge base is public or not", "t": "`$BOOLEAN`", "key$": "is_public", "index$": 5 }, "last_indexing_job": { "a": true, "h": "Last Indexing Job", "n": "last_indexing_job", "r": false, "sh": "IndexingJob description", "t": "`$OBJECT`", "key$": "last_indexing_job", "index$": 6 }, "name": { "a": true, "h": "Name", "n": "name", "r": false, "sh": "Name of knowledge base", "t": "`$STRING`", "key$": "name", "index$": 7 }, "project_id": { "a": true, "h": "Project Id", "n": "project_id", "r": false, "sh": "Identifier of the DigitalOcean project this knowledge base will belong to.", "t": "`$STRING`", "key$": "project_id", "index$": 8 }, "region": { "a": true, "h": "Region", "n": "region", "r": false, "sh": "Region code", "t": "`$STRING`", "key$": "region", "index$": 9 }, "reranking_config": { "a": true, "h": "Reranking Config", "n": "reranking_config", "r": false, "sh": "Configuration for cross-encoder reranking during retrieval.", "t": "`$OBJECT`", "key$": "reranking_config", "index$": 10 }, "size": { "a": true, "h": "Size", "n": "size", "r": false, "t": "`$STRING`", "key$": "size", "index$": 11 }, "tags": { "a": true, "h": "Tags", "n": "tags", "r": false, "sh": "Tags to organize related resources", "t": "`$ARRAY`", "key$": "tags", "index$": 12 }, "updated_at": { "a": true, "fo": "date-time", "h": "Updated At", "n": "updated_at", "r": false, "sh": "Last modified", "t": "`$STRING`", "key$": "updated_at", "index$": 13 }, "user_id": { "a": true, "fo": "int64", "h": "User Id", "n": "user_id", "r": false, "sh": "Id of user that created the knowledge base", "t": "`$STRING`", "key$": "user_id", "index$": 14 }, "uuid": { "a": true, "h": "Uuid", "n": "uuid", "r": false, "sh": "Unique id for knowledge base", "t": "`$STRING`", "key$": "uuid", "index$": 15 }, "vpc_uuid": { "a": true, "h": "Vpc Uuid", "n": "vpc_uuid", "r": false, "sh": "The VPC to deploy the knowledge base database in", "t": "`$STRING`", "key$": "vpc_uuid", "index$": 16 } }, "name": "api_update_knowledge_base_output", "op": { "create": { "input": "data", "name": "create", "points": [{ "a": true, "co": { "id": "POST /v2/gen-ai/knowledge_bases", "source": "openapi3", "version": 2 }, "g": {}, "k": "http", "m": "POST", "o": "/v2/gen-ai/knowledge_bases", "q": {}, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "v2" }, { "lit": "gen-ai" }, { "lit": "knowledge_bases" }], "t": { "req": "`reqdata`", "res": "`body.knowledge_base`" }, "index$": 0 }], "key$": "create" }, "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /v2/gen-ai/knowledge_bases", "source": "openapi3", "version": 2 }, "g": { "query": [{ "a": true, "ex": 1, "k": "query", "n": "page", "or": "page", "r": false, "t": "`$INTEGER`", "index$": 0 }, { "a": true, "ex": 1, "k": "query", "n": "per_page", "or": "per_page", "r": false, "t": "`$INTEGER`", "index$": 1 }] }, "k": "http", "m": "GET", "o": "/v2/gen-ai/knowledge_bases", "q": {}, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "v2" }, { "lit": "gen-ai" }, { "lit": "knowledge_bases" }], "t": { "req": "`reqdata`", "res": "`body.knowledge_bases`" }, "index$": 0 }], "key$": "list" }, "update": { "input": "data", "name": "update", "points": [{ "a": true, "co": { "id": "PUT /v2/gen-ai/knowledge_bases/{uuid}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "ex": "\"123e4567-e89b-12d3-a456-426614174000\"", "k": "param", "n": "uuid", "or": "uuid", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "PUT", "o": "/v2/gen-ai/knowledge_bases/{uuid}", "q": { "exist": ["uuid"] }, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "v2" }, { "lit": "gen-ai" }, { "lit": "knowledge_bases" }, { "var": "uuid" }], "t": { "req": "`reqdata`", "res": "`body.knowledge_base`" }, "index$": 0 }], "key$": "update" } }, "relations": { "ancestors": [] }, "key$": "api_update_knowledge_base_output", "name__orig": "api_update_knowledge_base_output", "Name": "ApiUpdateKnowledgeBaseOutput", "name_": "api_update_knowledge_base_output", "name-": "api-update-knowledge-base-output", "NAME": "API_UPDATE_KNOWLEDGE_BASE_OUTPUT", "index$": 94 }, { "active": true, "entity": "api_update_knowledge_base_output", "key$": "BasicApiUpdateKnowledgeBaseOutputFlow", "kind": "basic", "name": "BasicApiUpdateKnowledgeBaseOutputFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "api_update_knowledge_base_output_ref01" }, "m": {}, "o": "create", "s": [], "v": [], "index$": 0 }, { "a": true, "d": {}, "i": {}, "m": {}, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "api_update_knowledge_base_output_ref01" } }], "index$": 1 }, { "a": true, "d": {}, "i": { "ref": "api_update_knowledge_base_output_ref01", "srcdatavar": "api_update_knowledge_base_output_ref01_data", "suffix": "_up0", "textfield": "added_to_agent_at" }, "m": {}, "o": "update", "s": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-api_update_knowledge_base_output_ref01" } }], "v": [], "index$": 2 }] }, 'ApiUpdateKnowledgeBaseOutput', { "POST /v2/gen-ai/knowledge_bases": { "protocol": "http", "requestBody": { "content": { "application/json": { "schema": { "description": "Data to create a new knowledge base.", "properties": { "database_id": { "description": "Identifier of the DigitalOcean OpenSearch database this knowledge base will use, optional.\nIf not provided, we create a new database for the knowledge base in\nthe same region as the knowledge base.", "example": "\"12345678-1234-1234-1234-123456789012\"", "type": "string", "key$": "database_id" }, "datasources": { "description": "Optional data sources to attach at creation. Omit or use an empty list to create the knowledge base without sources, then add sources (with chunking strategy and sizes) using [Add a Data Source to a Knowledge Base](#operation/create_knowledge_base_data_source). When provided, see [Organize Data Sources](https://docs.digitalocean.com/products/inference/how-to/create-manage-agent-knowledge-bases/#add-data-sources) for best practices.", "items": { "properties": { "aws_data_source": { "description": "AWS S3 Data Source", "properties": {}, "type": "object", "x-ref": "#/components/schemas/apiAWSDataSource" }, "bucket_name": { "description": "Deprecated, moved to data_source_details", "example": "example name", "type": "string" }, "bucket_region": { "description": "Deprecated, moved to data_source_details", "example": "example string", "type": "string" }, "chunking_algorithm": { "default": "CHUNKING_ALGORITHM_UNKNOWN", "enum": [], "example": "CHUNKING_ALGORITHM_UNKNOWN", "type": "string", "x-ref": "#/components/schemas/apiChunkingAlgorithm" }, "chunking_options": { "properties": {}, "type": "object", "x-ref": "#/components/schemas/apiChunkingOptions" }, "dropbox_data_source": { "description": "Dropbox Data Source", "properties": {}, "type": "object", "x-ref": "#/components/schemas/apiDropboxDataSource" }, "file_upload_data_source": { "description": "File to upload as data source for knowledge base.", "properties": {}, "type": "object", "x-ref": "#/components/schemas/apiFileUploadDataSource" }, "google_drive_data_source": { "description": "Google Drive Data Source", "properties": {}, "type": "object", "x-ref": "#/components/schemas/apiGoogleDriveDataSource" }, "item_path": { "example": "example string", "type": "string" }, "spaces_data_source": { "description": "Spaces Bucket Data Source", "properties": {}, "type": "object", "x-ref": "#/components/schemas/apiSpacesDataSource" }, "web_crawler_data_source": { "description": "WebCrawlerDataSource", "properties": {}, "type": "object", "x-ref": "#/components/schemas/apiWebCrawlerDataSource" } }, "type": "object", "x-ref": "#/components/schemas/apiKBDataSource" }, "type": "array", "key$": "datasources" }, "embedding_model_uuid": { "description": "Identifier for the [embedding model](https://docs.digitalocean.com/products/genai-platform/details/models/#embedding-models).", "example": "\"12345678-1234-1234-1234-123456789012\"", "type": "string", "key$": "embedding_model_uuid" }, "name": { "description": "Name of the knowledge base.", "example": "\"My Knowledge Base\"", "type": "string", "key$": "name" }, "project_id": { "description": "Identifier of the DigitalOcean project this knowledge base will belong to.", "example": "\"12345678-1234-1234-1234-123456789012\"", "type": "string", "key$": "project_id" }, "region": { "description": "The datacenter region to deploy the knowledge base in.", "example": "\"tor1\"", "type": "string", "key$": "region" }, "reranking_config": { "description": "Configuration for cross-encoder reranking during retrieval.", "properties": { "enabled": { "description": "Whether reranking is enabled for retrieval", "example": true, "type": "boolean" }, "model": { "description": "Reranker model internal name", "example": "\"bge-reranker-v2-m3\"", "type": "string" } }, "type": "object", "x-ref": "#/components/schemas/apiRerankingConfiguration", "key$": "reranking_config" }, "size": { "default": "OPEN_SEARCH_PLAN_SIZE_UNSPECIFIED", "enum": ["OPEN_SEARCH_PLAN_SIZE_UNSPECIFIED", "OPEN_SEARCH_PLAN_SIZE_SMALL", "OPEN_SEARCH_PLAN_SIZE_MEDIUM", "OPEN_SEARCH_PLAN_SIZE_LARGE", "OPEN_SEARCH_PLAN_SIZE_EXTRA_LARGE"], "example": "OPEN_SEARCH_PLAN_SIZE_UNSPECIFIED", "type": "string", "x-ref": "#/components/schemas/apiOpenSearchPlanSize", "key$": "size" }, "tags": { "description": "Tags to organize your knowledge base.", "example": ["example string"], "items": { "example": "example string", "type": "string" }, "type": "array", "key$": "tags" }, "vpc_uuid": { "description": "The VPC to deploy the knowledge base database in", "example": "\"12345678-1234-1234-1234-123456789012\"", "type": "string", "key$": "vpc_uuid" } }, "type": "object", "x-ref": "#/components/schemas/apiCreateKnowledgeBaseInputPublic", "index$": 1 } } } }, "parameters": [] }, "GET /v2/gen-ai/knowledge_bases": { "protocol": "http", "parameters": [{ "description": "Page number.", "example": 1, "in": "query", "name": "page", "schema": { "type": "integer" }, "index$": 0 }, { "description": "Items per page.", "example": 1, "in": "query", "name": "per_page", "schema": { "type": "integer" }, "index$": 1 }] }, "PUT /v2/gen-ai/knowledge_bases/{uuid}": { "protocol": "http", "requestBody": { "content": { "application/json": { "schema": { "description": "Information about updating a knowledge base", "properties": { "database_id": { "description": "The id of the DigitalOcean database this knowledge base will use, optional.", "example": "\"12345678-1234-1234-1234-123456789012\"", "type": "string", "key$": "database_id" }, "name": { "description": "Knowledge base name", "example": "\"My Knowledge Base\"", "type": "string", "key$": "name" }, "project_id": { "description": "The id of the DigitalOcean project this knowledge base will belong to", "example": "\"12345678-1234-1234-1234-123456789012\"", "type": "string", "key$": "project_id" }, "reranking_config": { "description": "Configuration for cross-encoder reranking during retrieval.", "properties": { "enabled": { "description": "Whether reranking is enabled for retrieval", "example": true, "type": "boolean" }, "model": { "description": "Reranker model internal name", "example": "\"bge-reranker-v2-m3\"", "type": "string" } }, "type": "object", "x-ref": "#/components/schemas/apiRerankingConfiguration", "key$": "reranking_config" }, "tags": { "description": "Tags to organize your knowledge base.", "example": ["example string"], "items": { "example": "example string", "type": "string" }, "type": "array", "key$": "tags" }, "uuid": { "description": "Knowledge base id", "example": "\"12345678-1234-1234-1234-123456789012\"", "type": "string", "key$": "uuid" } }, "type": "object", "x-ref": "#/components/schemas/apiUpdateKnowledgeBaseInputPublic", "index$": 1 } } } }, "parameters": [{ "description": "Knowledge base id", "example": "\"123e4567-e89b-12d3-a456-426614174000\"", "in": "path", "name": "uuid", "required": true, "schema": { "type": "string" }, "index$": 0 }] } }, { strict: LIVE_STRICT, t });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const api_update_knowledge_base_output_ref01_ent = client.ApiUpdateKnowledgeBaseOutput();
        let api_update_knowledge_base_output_ref01_data = setup.data.new.api_update_knowledge_base_output['api_update_knowledge_base_output_ref01'];
        api_update_knowledge_base_output_ref01_data = (await api_update_knowledge_base_output_ref01_ent.create(api_update_knowledge_base_output_ref01_data)).data();
        (0, node_assert_1.default)(null != api_update_knowledge_base_output_ref01_data);
        // LIST
        const api_update_knowledge_base_output_ref01_match = {};
        const api_update_knowledge_base_output_ref01_list = (await api_update_knowledge_base_output_ref01_ent.list(api_update_knowledge_base_output_ref01_match)).map((e) => e.data());
        // UPDATE
        const api_update_knowledge_base_output_ref01_data_up0 = {};
        const api_update_knowledge_base_output_ref01_markdef_up0 = { name: 'added_to_agent_at', value: 'Mark01-api_update_knowledge_base_output_ref01_' + setup.now };
        api_update_knowledge_base_output_ref01_data_up0[api_update_knowledge_base_output_ref01_markdef_up0.name] = api_update_knowledge_base_output_ref01_markdef_up0.value;
        const api_update_knowledge_base_output_ref01_resdata_up0 = (await api_update_knowledge_base_output_ref01_ent.update(api_update_knowledge_base_output_ref01_data_up0)).data();
        (0, node_assert_1.default)(null != api_update_knowledge_base_output_ref01_resdata_up0);
        (0, node_assert_1.default)(api_update_knowledge_base_output_ref01_resdata_up0[api_update_knowledge_base_output_ref01_markdef_up0.name] === api_update_knowledge_base_output_ref01_markdef_up0.value);
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
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/api_update_knowledge_base_output/ApiUpdateKnowledgeBaseOutputTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.DigitaloceanSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['api_update_knowledge_base_output01', 'api_update_knowledge_base_output02', 'api_update_knowledge_base_output03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'DIGITALOCEAN_TEST_API_UPDATE_KNOWLEDGE_BASE_OUTPUT_ENTID': idmap,
        'DIGITALOCEAN_TEST_LIVE': 'FALSE',
        'DIGITALOCEAN_TEST_EXPLAIN': 'FALSE',
        'DIGITALOCEAN_APIKEY': '',
    });
    idmap = env['DIGITALOCEAN_TEST_API_UPDATE_KNOWLEDGE_BASE_OUTPUT_ENTID'];
    const live = 'TRUE' === env.DIGITALOCEAN_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['DIGITALOCEAN_TEST_API_UPDATE_KNOWLEDGE_BASE_OUTPUT_ENTID'];
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
//# sourceMappingURL=ApiUpdateKnowledgeBaseOutputEntity.test.js.map