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
(0, node_test_1.describe)('ApiGetKnowledgeBaseIndexingJobOutputEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when DIGITALOCEAN_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('DIGITALOCEAN_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.DigitaloceanSDK.test();
        const ent = testsdk.ApiGetKnowledgeBaseIndexingJobOutput();
        (0, node_assert_1.default)(null != ent);
    });
    class FailHook extends __1.BaseFeature {
        name = 'failhook';
        version = '0.0.1';
        active = true;
        unexpected = 0;
        init() { }
        PreSpec() { throw new Error('api_get_knowledge_base_indexing_job_output hook failed'); }
        PreUnexpected() { this.unexpected++; }
    }
    (0, node_test_1.test)('stream-error', async () => {
        const offline = { net: { offline: true } };
        await node_assert_1.default.rejects(async () => {
            for await (const _item of __1.DigitaloceanSDK.test(offline).ApiGetKnowledgeBaseIndexingJobOutput().stream('list')) { }
        }, /offline/);
        for await (const _item of __1.DigitaloceanSDK.test(offline).ApiGetKnowledgeBaseIndexingJobOutput()
            .stream('list', undefined, { ctrl: { throw: false } })) { }
        if (null != __1.config.feature?.rbac) {
            const denied = __1.DigitaloceanSDK.test(undefined, { feature: { rbac: { active: true, deny: true } } });
            await node_assert_1.default.rejects(async () => {
                for await (const _item of denied.ApiGetKnowledgeBaseIndexingJobOutput().stream('list')) { }
            }, (err) => 'rbac_denied' === err.code);
        }
    });
    (0, node_test_1.test)('stream-ctrl', async () => {
        const explain = {};
        const ctrl = { explain };
        for await (const _item of __1.DigitaloceanSDK.test().ApiGetKnowledgeBaseIndexingJobOutput().stream('list', undefined, { ctrl })) { }
        node_assert_1.default.deepStrictEqual(Object.keys(ctrl), ['explain']);
        (0, node_assert_1.default)(explain === ctrl.explain && 0 < Object.keys(explain).length);
    });
    (0, node_test_1.test)('unexpected', async () => {
        const hook = new FailHook();
        const client = new __1.DigitaloceanSDK({ feature: { test: { active: true } }, extend: [hook] });
        await node_assert_1.default.rejects(client.ApiGetKnowledgeBaseIndexingJobOutput().list(), /hook failed/);
        (0, node_assert_1.default)(0 < hook.unexpected);
        const fired = hook.unexpected;
        node_assert_1.default.strictEqual(await client.ApiGetKnowledgeBaseIndexingJobOutput().list(undefined, { throw: false }), undefined);
        (0, node_assert_1.default)(fired < hook.unexpected);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.DigitaloceanSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.ApiGetKnowledgeBaseIndexingJobOutput().list({ "page": "x" }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.DIGITALOCEAN_TEST_LIVE;
        for (const op of ['create', 'list', 'update', 'load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'api_get_knowledge_base_indexing_job_output.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "completed_datasources": { "a": true, "fo": "int64", "h": "Completed Datasources", "n": "completed_datasources", "r": false, "sh": "Number of datasources indexed completed", "t": "`$INTEGER`", "key$": "completed_datasources", "index$": 0 }, "created_at": { "a": true, "fo": "date-time", "h": "Created At", "n": "created_at", "r": false, "sh": "Creation date / time", "t": "`$STRING`", "key$": "created_at", "index$": 1 }, "data_source_jobs": { "a": true, "h": "Data Source Jobs", "n": "data_source_jobs", "r": false, "sh": "Details on Data Sources included in the Indexing Job", "t": "`$ARRAY`", "key$": "data_source_jobs", "index$": 2 }, "data_source_uuids": { "a": true, "h": "Data Source Uuids", "n": "data_source_uuids", "r": false, "sh": "List of data source ids to index, if none are provided, all data sources will be indexed", "t": "`$ARRAY`", "key$": "data_source_uuids", "index$": 3 }, "finished_at": { "a": true, "fo": "date-time", "h": "Finished At", "n": "finished_at", "r": false, "t": "`$STRING`", "key$": "finished_at", "index$": 4 }, "is_report_available": { "a": true, "h": "Is Report Available", "n": "is_report_available", "r": false, "sh": "Boolean value to determine if the indexing job details are available", "t": "`$BOOLEAN`", "key$": "is_report_available", "index$": 5 }, "knowledge_base_uuid": { "a": true, "h": "Knowledge Base Uuid", "n": "knowledge_base_uuid", "r": false, "sh": "Knowledge base id", "t": "`$STRING`", "key$": "knowledge_base_uuid", "index$": 6 }, "phase": { "a": true, "h": "Phase", "n": "phase", "r": false, "t": "`$STRING`", "key$": "phase", "index$": 7 }, "started_at": { "a": true, "fo": "date-time", "h": "Started At", "n": "started_at", "r": false, "t": "`$STRING`", "key$": "started_at", "index$": 8 }, "status": { "a": true, "h": "Status", "n": "status", "r": false, "t": "`$STRING`", "key$": "status", "index$": 9 }, "tokens": { "a": true, "fo": "int64", "h": "Tokens", "n": "tokens", "r": false, "sh": "Number of tokens [This field is deprecated]", "t": "`$INTEGER`", "key$": "tokens", "index$": 10 }, "total_datasources": { "a": true, "fo": "int64", "h": "Total Datasources", "n": "total_datasources", "r": false, "sh": "Number of datasources being indexed", "t": "`$INTEGER`", "key$": "total_datasources", "index$": 11 }, "total_tokens": { "a": true, "fo": "uint64", "h": "Total Tokens", "n": "total_tokens", "r": false, "sh": "Total Tokens Consumed By the Indexing Job", "t": "`$STRING`", "key$": "total_tokens", "index$": 12 }, "updated_at": { "a": true, "fo": "date-time", "h": "Updated At", "n": "updated_at", "r": false, "sh": "Last modified", "t": "`$STRING`", "key$": "updated_at", "index$": 13 }, "uuid": { "a": true, "h": "Uuid", "n": "uuid", "r": false, "sh": "Unique id", "t": "`$STRING`", "key$": "uuid", "index$": 14 } }, "name": "api_get_knowledge_base_indexing_job_output", "op": { "create": { "input": "data", "name": "create", "points": [{ "a": true, "co": { "id": "POST /v2/gen-ai/indexing_jobs", "source": "openapi3", "version": 2 }, "g": {}, "k": "http", "m": "POST", "o": "/v2/gen-ai/indexing_jobs", "q": {}, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "v2" }, { "lit": "gen-ai" }, { "lit": "indexing_jobs" }], "t": { "req": "`reqdata`", "res": "`body.job`" }, "index$": 0 }], "key$": "create" }, "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /v2/gen-ai/indexing_jobs", "source": "openapi3", "version": 2 }, "g": { "query": [{ "a": true, "ex": 1, "k": "query", "n": "page", "or": "page", "r": false, "t": "`$INTEGER`", "index$": 0 }, { "a": true, "ex": 1, "k": "query", "n": "per_page", "or": "per_page", "r": false, "t": "`$INTEGER`", "index$": 1 }] }, "k": "http", "m": "GET", "o": "/v2/gen-ai/indexing_jobs", "q": {}, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "v2" }, { "lit": "gen-ai" }, { "lit": "indexing_jobs" }], "t": { "req": "`reqdata`", "res": "`body.jobs`" }, "index$": 0 }], "key$": "list" }, "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /v2/gen-ai/indexing_jobs/{uuid}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "ex": "\"123e4567-e89b-12d3-a456-426614174000\"", "k": "param", "n": "uuid", "or": "uuid", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/v2/gen-ai/indexing_jobs/{uuid}", "q": { "exist": ["uuid"] }, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "v2" }, { "lit": "gen-ai" }, { "lit": "indexing_jobs" }, { "var": "uuid" }], "t": { "req": "`reqdata`", "res": "`body.job`" }, "index$": 0 }], "key$": "load" }, "update": { "input": "data", "name": "update", "points": [{ "a": true, "co": { "id": "PUT /v2/gen-ai/indexing_jobs/{uuid}/cancel", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "ex": "\"123e4567-e89b-12d3-a456-426614174000\"", "k": "param", "n": "uuid", "or": "uuid", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "PUT", "o": "/v2/gen-ai/indexing_jobs/{uuid}/cancel", "q": { "$action": "cancel", "exist": ["uuid"] }, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "v2" }, { "lit": "gen-ai" }, { "lit": "indexing_jobs" }, { "var": "uuid" }, { "lit": "cancel" }], "t": { "req": "`reqdata`", "res": "`body.job`" }, "index$": 0 }], "key$": "update" } }, "relations": { "ancestors": [] }, "key$": "api_get_knowledge_base_indexing_job_output", "name__orig": "api_get_knowledge_base_indexing_job_output", "Name": "ApiGetKnowledgeBaseIndexingJobOutput", "name_": "api_get_knowledge_base_indexing_job_output", "name-": "api-get-knowledge-base-indexing-job-output", "NAME": "API_GET_KNOWLEDGE_BASE_INDEXING_JOB_OUTPUT", "index$": 40 }, { "active": true, "entity": "api_get_knowledge_base_indexing_job_output", "key$": "BasicApiGetKnowledgeBaseIndexingJobOutputFlow", "kind": "basic", "name": "BasicApiGetKnowledgeBaseIndexingJobOutputFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "api_get_knowledge_base_indexing_job_output_ref01" }, "m": {}, "o": "create", "s": [], "v": [], "index$": 0 }, { "a": true, "d": {}, "i": {}, "m": {}, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "api_get_knowledge_base_indexing_job_output_ref01" } }], "index$": 1 }, { "a": true, "d": {}, "i": { "ref": "api_get_knowledge_base_indexing_job_output_ref01", "srcdatavar": "api_get_knowledge_base_indexing_job_output_ref01_data", "suffix": "_up0", "textfield": "created_at" }, "m": {}, "o": "update", "s": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-api_get_knowledge_base_indexing_job_output_ref01" } }], "v": [], "index$": 2 }, { "a": true, "d": {}, "i": { "ref": "api_get_knowledge_base_indexing_job_output_ref01", "srcdatavar": "api_get_knowledge_base_indexing_job_output_ref01_data", "suffix": "_dt0" }, "m": { "id": "api_get_knowledge_base_indexing_job_output01" }, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-api_get_knowledge_base_indexing_job_output_ref01" } }], "index$": 3 }] }, 'ApiGetKnowledgeBaseIndexingJobOutput', { "POST /v2/gen-ai/indexing_jobs": { "protocol": "http", "requestBody": { "content": { "application/json": { "schema": { "description": "StartKnowledgeBaseIndexingJobInputPublic description", "properties": { "data_source_uuids": { "description": "List of data source ids to index, if none are provided, all data sources will be indexed", "example": ["example string"], "items": { "example": "example string", "type": "string" }, "type": "array", "key$": "data_source_uuids" }, "knowledge_base_uuid": { "description": "Knowledge base id", "example": "\"12345678-1234-1234-1234-123456789012\"", "type": "string", "key$": "knowledge_base_uuid" } }, "type": "object", "x-ref": "#/components/schemas/apiStartKnowledgeBaseIndexingJobInputPublic", "index$": 1 } } } }, "parameters": [] }, "GET /v2/gen-ai/indexing_jobs": { "protocol": "http", "parameters": [{ "description": "Page number.", "example": 1, "in": "query", "name": "page", "schema": { "type": "integer" }, "index$": 0 }, { "description": "Items per page.", "example": 1, "in": "query", "name": "per_page", "schema": { "type": "integer" }, "index$": 1 }] }, "GET /v2/gen-ai/indexing_jobs/{uuid}": { "protocol": "http", "parameters": [{ "description": "Indexing job id", "example": "\"123e4567-e89b-12d3-a456-426614174000\"", "in": "path", "name": "uuid", "required": true, "schema": { "type": "string" }, "index$": 0 }] }, "PUT /v2/gen-ai/indexing_jobs/{uuid}/cancel": { "protocol": "http", "requestBody": { "content": { "application/json": { "schema": { "description": "CancelKnowledgeBaseIndexingJobInputPublic description", "properties": { "uuid": { "description": "A unique identifier for an indexing job.", "example": "\"12345678-1234-1234-1234-123456789012\"", "type": "string" } }, "type": "object", "x-ref": "#/components/schemas/apiCancelKnowledgeBaseIndexingJobInputPublic" } } } }, "parameters": [{ "description": "A unique identifier for an indexing job.", "example": "\"123e4567-e89b-12d3-a456-426614174000\"", "in": "path", "name": "uuid", "required": true, "schema": { "type": "string" }, "index$": 0 }] } }, { strict: LIVE_STRICT, t });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const api_get_knowledge_base_indexing_job_output_ref01_ent = client.ApiGetKnowledgeBaseIndexingJobOutput();
        let api_get_knowledge_base_indexing_job_output_ref01_data = setup.data.new.api_get_knowledge_base_indexing_job_output['api_get_knowledge_base_indexing_job_output_ref01'];
        api_get_knowledge_base_indexing_job_output_ref01_data = (await api_get_knowledge_base_indexing_job_output_ref01_ent.create(api_get_knowledge_base_indexing_job_output_ref01_data)).data();
        (0, node_assert_1.default)(null != api_get_knowledge_base_indexing_job_output_ref01_data);
        // LIST
        const api_get_knowledge_base_indexing_job_output_ref01_match = {};
        const api_get_knowledge_base_indexing_job_output_ref01_list = (await api_get_knowledge_base_indexing_job_output_ref01_ent.list(api_get_knowledge_base_indexing_job_output_ref01_match)).map((e) => e.data());
        // UPDATE
        const api_get_knowledge_base_indexing_job_output_ref01_data_up0 = {};
        const api_get_knowledge_base_indexing_job_output_ref01_markdef_up0 = { name: 'created_at', value: 'Mark01-api_get_knowledge_base_indexing_job_output_ref01_' + setup.now };
        api_get_knowledge_base_indexing_job_output_ref01_data_up0[api_get_knowledge_base_indexing_job_output_ref01_markdef_up0.name] = api_get_knowledge_base_indexing_job_output_ref01_markdef_up0.value;
        const api_get_knowledge_base_indexing_job_output_ref01_resdata_up0 = (await api_get_knowledge_base_indexing_job_output_ref01_ent.update(api_get_knowledge_base_indexing_job_output_ref01_data_up0)).data();
        (0, node_assert_1.default)(null != api_get_knowledge_base_indexing_job_output_ref01_resdata_up0);
        (0, node_assert_1.default)(api_get_knowledge_base_indexing_job_output_ref01_resdata_up0[api_get_knowledge_base_indexing_job_output_ref01_markdef_up0.name] === api_get_knowledge_base_indexing_job_output_ref01_markdef_up0.value);
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
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/api_get_knowledge_base_indexing_job_output/ApiGetKnowledgeBaseIndexingJobOutputTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.DigitaloceanSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['api_get_knowledge_base_indexing_job_output01', 'api_get_knowledge_base_indexing_job_output02', 'api_get_knowledge_base_indexing_job_output03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'DIGITALOCEAN_TEST_API_GET_KNOWLEDGE_BASE_INDEXING_JOB_OUTPUT_ENTID': idmap,
        'DIGITALOCEAN_TEST_LIVE': 'FALSE',
        'DIGITALOCEAN_TEST_EXPLAIN': 'FALSE',
        'DIGITALOCEAN_APIKEY': '',
    });
    idmap = env['DIGITALOCEAN_TEST_API_GET_KNOWLEDGE_BASE_INDEXING_JOB_OUTPUT_ENTID'];
    const live = 'TRUE' === env.DIGITALOCEAN_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['DIGITALOCEAN_TEST_API_GET_KNOWLEDGE_BASE_INDEXING_JOB_OUTPUT_ENTID'];
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
//# sourceMappingURL=ApiGetKnowledgeBaseIndexingJobOutputEntity.test.js.map