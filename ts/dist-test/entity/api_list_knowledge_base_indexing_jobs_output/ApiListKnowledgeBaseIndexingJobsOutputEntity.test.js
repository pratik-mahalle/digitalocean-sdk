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
(0, node_test_1.describe)('ApiListKnowledgeBaseIndexingJobsOutputEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when DIGITALOCEAN_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('DIGITALOCEAN_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.DigitaloceanSDK.test();
        const ent = testsdk.ApiListKnowledgeBaseIndexingJobsOutput();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.DigitaloceanSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.ApiListKnowledgeBaseIndexingJobsOutput().list({ "knowledge_base_id": 1 }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.DIGITALOCEAN_TEST_LIVE;
        for (const op of ['list']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'api_list_knowledge_base_indexing_jobs_output.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "completed_datasources": { "a": true, "fo": "int64", "h": "Completed Datasources", "n": "completed_datasources", "r": false, "sh": "Number of datasources indexed completed", "t": "`$INTEGER`", "key$": "completed_datasources", "index$": 0 }, "created_at": { "a": true, "fo": "date-time", "h": "Created At", "n": "created_at", "r": false, "sh": "Creation date / time", "t": "`$STRING`", "key$": "created_at", "index$": 1 }, "data_source_jobs": { "a": true, "h": "Data Source Jobs", "n": "data_source_jobs", "r": false, "sh": "Details on Data Sources included in the Indexing Job", "t": "`$ARRAY`", "key$": "data_source_jobs", "index$": 2 }, "data_source_uuids": { "a": true, "h": "Data Source Uuids", "n": "data_source_uuids", "r": false, "t": "`$ARRAY`", "key$": "data_source_uuids", "index$": 3 }, "finished_at": { "a": true, "fo": "date-time", "h": "Finished At", "n": "finished_at", "r": false, "t": "`$STRING`", "key$": "finished_at", "index$": 4 }, "is_report_available": { "a": true, "h": "Is Report Available", "n": "is_report_available", "r": false, "sh": "Boolean value to determine if the indexing job details are available", "t": "`$BOOLEAN`", "key$": "is_report_available", "index$": 5 }, "knowledge_base_uuid": { "a": true, "h": "Knowledge Base Uuid", "n": "knowledge_base_uuid", "r": false, "sh": "Knowledge base id", "t": "`$STRING`", "key$": "knowledge_base_uuid", "index$": 6 }, "phase": { "a": true, "h": "Phase", "n": "phase", "r": false, "t": "`$STRING`", "key$": "phase", "index$": 7 }, "started_at": { "a": true, "fo": "date-time", "h": "Started At", "n": "started_at", "r": false, "t": "`$STRING`", "key$": "started_at", "index$": 8 }, "status": { "a": true, "h": "Status", "n": "status", "r": false, "t": "`$STRING`", "key$": "status", "index$": 9 }, "tokens": { "a": true, "fo": "int64", "h": "Tokens", "n": "tokens", "r": false, "sh": "Number of tokens [This field is deprecated]", "t": "`$INTEGER`", "key$": "tokens", "index$": 10 }, "total_datasources": { "a": true, "fo": "int64", "h": "Total Datasources", "n": "total_datasources", "r": false, "sh": "Number of datasources being indexed", "t": "`$INTEGER`", "key$": "total_datasources", "index$": 11 }, "total_tokens": { "a": true, "fo": "uint64", "h": "Total Tokens", "n": "total_tokens", "r": false, "sh": "Total Tokens Consumed By the Indexing Job", "t": "`$STRING`", "key$": "total_tokens", "index$": 12 }, "updated_at": { "a": true, "fo": "date-time", "h": "Updated At", "n": "updated_at", "r": false, "sh": "Last modified", "t": "`$STRING`", "key$": "updated_at", "index$": 13 }, "uuid": { "a": true, "h": "Uuid", "n": "uuid", "r": false, "sh": "Unique id", "t": "`$STRING`", "key$": "uuid", "index$": 14 } }, "name": "api_list_knowledge_base_indexing_jobs_output", "op": { "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /v2/gen-ai/knowledge_bases/{knowledge_base_uuid}/indexing_jobs", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "ex": "\"123e4567-e89b-12d3-a456-426614174000\"", "k": "param", "n": "knowledge_base_id", "or": "knowledge_base_uuid", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/v2/gen-ai/knowledge_bases/{knowledge_base_uuid}/indexing_jobs", "q": { "exist": ["knowledge_base_id"] }, "r": { "param": { "knowledge_base_uuid": "knowledge_base_id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "v2" }, { "lit": "gen-ai" }, { "lit": "knowledge_bases" }, { "var": "knowledge_base_id" }, { "lit": "indexing_jobs" }], "t": { "req": "`reqdata`", "res": "`body.jobs`" }, "index$": 0 }], "key$": "list" } }, "relations": { "ancestors": [] }, "key$": "api_list_knowledge_base_indexing_jobs_output", "name__orig": "api_list_knowledge_base_indexing_jobs_output", "Name": "ApiListKnowledgeBaseIndexingJobsOutput", "name_": "api_list_knowledge_base_indexing_jobs_output", "name-": "api-list-knowledge-base-indexing-jobs-output", "NAME": "API_LIST_KNOWLEDGE_BASE_INDEXING_JOBS_OUTPUT", "index$": 68 }, { "active": true, "entity": "api_list_knowledge_base_indexing_jobs_output", "key$": "BasicApiListKnowledgeBaseIndexingJobsOutputFlow", "kind": "basic", "name": "BasicApiListKnowledgeBaseIndexingJobsOutputFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": {}, "m": { "knowledge_base_id": "knowledge_base01" }, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "api_list_knowledge_base_indexing_jobs_output_ref01" } }], "index$": 0 }] }, 'ApiListKnowledgeBaseIndexingJobsOutput', { "GET /v2/gen-ai/knowledge_bases/{knowledge_base_uuid}/indexing_jobs": { "protocol": "http", "parameters": [{ "description": "Knowledge base uuid in string", "example": "\"123e4567-e89b-12d3-a456-426614174000\"", "in": "path", "name": "knowledge_base_uuid", "required": true, "schema": { "type": "string" }, "index$": 0 }] } }, { strict: LIVE_STRICT, t });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let api_list_knowledge_base_indexing_jobs_output_ref01_data = Object.values(setup.data.existing.api_list_knowledge_base_indexing_jobs_output)[0];
        // LIST
        const api_list_knowledge_base_indexing_jobs_output_ref01_ent = client.ApiListKnowledgeBaseIndexingJobsOutput();
        const api_list_knowledge_base_indexing_jobs_output_ref01_match = {};
        api_list_knowledge_base_indexing_jobs_output_ref01_match['knowledge_base_id'] = setup.idmap['knowledge_base01'];
        const api_list_knowledge_base_indexing_jobs_output_ref01_list = (await api_list_knowledge_base_indexing_jobs_output_ref01_ent.list(api_list_knowledge_base_indexing_jobs_output_ref01_match)).map((e) => e.data());
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
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/api_list_knowledge_base_indexing_jobs_output/ApiListKnowledgeBaseIndexingJobsOutputTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.DigitaloceanSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['api_list_knowledge_base_indexing_jobs_output01', 'api_list_knowledge_base_indexing_jobs_output02', 'api_list_knowledge_base_indexing_jobs_output03', 'knowledge_base01'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'DIGITALOCEAN_TEST_API_LIST_KNOWLEDGE_BASE_INDEXING_JOBS_OUTPUT_ENTID': idmap,
        'DIGITALOCEAN_TEST_LIVE': 'FALSE',
        'DIGITALOCEAN_TEST_EXPLAIN': 'FALSE',
        'DIGITALOCEAN_APIKEY': '',
    });
    idmap = env['DIGITALOCEAN_TEST_API_LIST_KNOWLEDGE_BASE_INDEXING_JOBS_OUTPUT_ENTID'];
    const live = 'TRUE' === env.DIGITALOCEAN_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['DIGITALOCEAN_TEST_API_LIST_KNOWLEDGE_BASE_INDEXING_JOBS_OUTPUT_ENTID'];
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
//# sourceMappingURL=ApiListKnowledgeBaseIndexingJobsOutputEntity.test.js.map