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
(0, node_test_1.describe)('ApiIndexedDataSourceEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when DIGITALOCEAN_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('DIGITALOCEAN_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.DigitaloceanSDK.test();
        const ent = testsdk.ApiIndexedDataSource();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.DigitaloceanSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.ApiIndexedDataSource().list({ "indexing_job_id": 1 }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.DIGITALOCEAN_TEST_LIVE;
        for (const op of ['list']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'api_indexed_data_source.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "completed_at": { "a": true, "fo": "date-time", "h": "Completed At", "n": "completed_at", "r": false, "sh": "Timestamp when data source completed indexing", "t": "`$STRING`", "key$": "completed_at", "index$": 0 }, "data_source_uuid": { "a": true, "h": "Data Source Uuid", "n": "data_source_uuid", "r": false, "sh": "Uuid of the indexed data source", "t": "`$STRING`", "key$": "data_source_uuid", "index$": 1 }, "error_details": { "a": true, "h": "Error Details", "n": "error_details", "r": false, "sh": "A detailed error description", "t": "`$STRING`", "key$": "error_details", "index$": 2 }, "error_msg": { "a": true, "h": "Error Msg", "n": "error_msg", "r": false, "sh": "A string code provinding a hint which part of the system experienced an error", "t": "`$STRING`", "key$": "error_msg", "index$": 3 }, "failed_item_count": { "a": true, "fo": "uint64", "h": "Failed Item Count", "n": "failed_item_count", "r": false, "sh": "Total count of files that have failed", "t": "`$STRING`", "key$": "failed_item_count", "index$": 4 }, "indexed_file_count": { "a": true, "fo": "uint64", "h": "Indexed File Count", "n": "indexed_file_count", "r": false, "sh": "Total count of files that have been indexed", "t": "`$STRING`", "key$": "indexed_file_count", "index$": 5 }, "indexed_item_count": { "a": true, "fo": "uint64", "h": "Indexed Item Count", "n": "indexed_item_count", "r": false, "sh": "Total count of files that have been indexed", "t": "`$STRING`", "key$": "indexed_item_count", "index$": 6 }, "removed_item_count": { "a": true, "fo": "uint64", "h": "Removed Item Count", "n": "removed_item_count", "r": false, "sh": "Total count of files that have been removed", "t": "`$STRING`", "key$": "removed_item_count", "index$": 7 }, "skipped_item_count": { "a": true, "fo": "uint64", "h": "Skipped Item Count", "n": "skipped_item_count", "r": false, "sh": "Total count of files that have been skipped", "t": "`$STRING`", "key$": "skipped_item_count", "index$": 8 }, "started_at": { "a": true, "fo": "date-time", "h": "Started At", "n": "started_at", "r": false, "sh": "Timestamp when data source started indexing", "t": "`$STRING`", "key$": "started_at", "index$": 9 }, "status": { "a": true, "h": "Status", "n": "status", "r": false, "t": "`$STRING`", "key$": "status", "index$": 10 }, "total_bytes": { "a": true, "fo": "uint64", "h": "Total Bytes", "n": "total_bytes", "r": false, "sh": "Total size of files in data source in bytes", "t": "`$STRING`", "key$": "total_bytes", "index$": 11 }, "total_bytes_indexed": { "a": true, "fo": "uint64", "h": "Total Bytes Indexed", "n": "total_bytes_indexed", "r": false, "sh": "Total size of files in data source in bytes that have been indexed", "t": "`$STRING`", "key$": "total_bytes_indexed", "index$": 12 }, "total_file_count": { "a": true, "fo": "uint64", "h": "Total File Count", "n": "total_file_count", "r": false, "sh": "Total file count in the data source", "t": "`$STRING`", "key$": "total_file_count", "index$": 13 } }, "name": "api_indexed_data_source", "op": { "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /v2/gen-ai/indexing_jobs/{indexing_job_uuid}/data_sources", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "ex": "\"123e4567-e89b-12d3-a456-426614174000\"", "k": "param", "n": "indexing_job_id", "or": "indexing_job_uuid", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/v2/gen-ai/indexing_jobs/{indexing_job_uuid}/data_sources", "q": { "exist": ["indexing_job_id"] }, "r": { "param": { "indexing_job_uuid": "indexing_job_id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "v2" }, { "lit": "gen-ai" }, { "lit": "indexing_jobs" }, { "var": "indexing_job_id" }, { "lit": "data_sources" }], "t": { "req": "`reqdata`", "res": "`body.indexed_data_sources`" }, "index$": 0 }], "key$": "list" } }, "relations": { "ancestors": [] }, "key$": "api_indexed_data_source", "name__orig": "api_indexed_data_source", "Name": "ApiIndexedDataSource", "name_": "api_indexed_data_source", "name-": "api-indexed-data-source", "NAME": "API_INDEXED_DATA_SOURCE", "index$": 53 }, { "active": true, "entity": "api_indexed_data_source", "key$": "BasicApiIndexedDataSourceFlow", "kind": "basic", "name": "BasicApiIndexedDataSourceFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": {}, "m": { "indexing_job_id": "indexing_job01" }, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "api_indexed_data_source_ref01" } }], "index$": 0 }] }, 'ApiIndexedDataSource', { "GET /v2/gen-ai/indexing_jobs/{indexing_job_uuid}/data_sources": { "protocol": "http", "parameters": [{ "description": "Uuid of the indexing job", "example": "\"123e4567-e89b-12d3-a456-426614174000\"", "in": "path", "name": "indexing_job_uuid", "required": true, "schema": { "type": "string" }, "index$": 0 }] } }, { strict: LIVE_STRICT, t });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let api_indexed_data_source_ref01_data = Object.values(setup.data.existing.api_indexed_data_source)[0];
        // LIST
        const api_indexed_data_source_ref01_ent = client.ApiIndexedDataSource();
        const api_indexed_data_source_ref01_match = {};
        api_indexed_data_source_ref01_match['indexing_job_id'] = setup.idmap['indexing_job01'];
        const api_indexed_data_source_ref01_list = (await api_indexed_data_source_ref01_ent.list(api_indexed_data_source_ref01_match)).map((e) => e.data());
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
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/api_indexed_data_source/ApiIndexedDataSourceTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.DigitaloceanSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['api_indexed_data_source01', 'api_indexed_data_source02', 'api_indexed_data_source03', 'indexing_job01'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'DIGITALOCEAN_TEST_API_INDEXED_DATA_SOURCE_ENTID': idmap,
        'DIGITALOCEAN_TEST_LIVE': 'FALSE',
        'DIGITALOCEAN_TEST_EXPLAIN': 'FALSE',
        'DIGITALOCEAN_APIKEY': '',
    });
    idmap = env['DIGITALOCEAN_TEST_API_INDEXED_DATA_SOURCE_ENTID'];
    const live = 'TRUE' === env.DIGITALOCEAN_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['DIGITALOCEAN_TEST_API_INDEXED_DATA_SOURCE_ENTID'];
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
//# sourceMappingURL=ApiIndexedDataSourceEntity.test.js.map