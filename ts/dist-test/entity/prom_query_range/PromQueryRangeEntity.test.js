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
(0, node_test_1.describe)('PromQueryRangeEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when DIGITALOCEAN_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('DIGITALOCEAN_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.DigitaloceanSDK.test();
        const ent = testsdk.PromQueryRange();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.DigitaloceanSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.PromQueryRange().load({ "query_id": 1, "end": "x", "query": "x", "start": "x", "step": "x" }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.DIGITALOCEAN_TEST_LIVE;
        for (const op of ['create', 'load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'prom_query_range.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "result": { "a": true, "h": "Result", "n": "result", "r": true, "sh": "One entry per matching series, each carrying the samples evaluated at every step across the requested range.", "t": "`$ARRAY`", "union": { "branches": 2, "count": 1, "depth": 5 }, "key$": "result", "index$": 0 }, "resultType": { "a": true, "h": "Result Type", "n": "resultType", "r": true, "t": "`$STRING`", "key$": "resultType", "index$": 1 } }, "name": "prom_query_range", "op": { "create": { "input": "data", "name": "create", "points": [{ "a": true, "co": { "id": "POST /v2/insights/query/{region}/prom/api/v1/query_range", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "ex": "nyc3", "k": "param", "n": "query_id", "or": "region", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "POST", "o": "/v2/insights/query/{region}/prom/api/v1/query_range", "q": { "exist": ["query_id"] }, "r": { "param": { "region": "query_id" } }, "rb": { "fields": [{ "name": "end" }, { "name": "query" }, { "name": "start" }, { "name": "step" }, { "name": "timeout" }], "kind": "form", "media": "application/x-www-form-urlencoded" }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "v2" }, { "lit": "insights" }, { "lit": "query" }, { "var": "query_id" }, { "lit": "prom" }, { "lit": "api" }, { "lit": "v1" }, { "lit": "query_range" }], "t": { "req": "`reqdata`", "res": "`body.data`" }, "index$": 0 }], "key$": "create" }, "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /v2/insights/query/{region}/prom/api/v1/query_range", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "ex": "nyc3", "k": "param", "n": "query_id", "or": "region", "r": true, "t": "`$STRING`", "index$": 0 }], "query": [{ "a": true, "ex": "1620705417", "k": "query", "n": "end", "or": "end", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "ex": "do.droplets.cpu_time", "k": "query", "n": "query", "or": "query", "r": true, "t": "`$STRING`", "index$": 1 }, { "a": true, "ex": "1620683817", "k": "query", "n": "start", "or": "start", "r": true, "t": "`$STRING`", "index$": 2 }, { "a": true, "ex": "15s", "k": "query", "n": "step", "or": "step", "r": true, "t": "`$STRING`", "index$": 3 }, { "a": true, "ex": "30s", "k": "query", "n": "timeout", "or": "timeout", "r": false, "t": "`$STRING`", "index$": 4 }] }, "k": "http", "m": "GET", "o": "/v2/insights/query/{region}/prom/api/v1/query_range", "q": { "exist": ["end", "query", "query_id", "start", "step"] }, "r": { "param": { "region": "query_id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "v2" }, { "lit": "insights" }, { "lit": "query" }, { "var": "query_id" }, { "lit": "prom" }, { "lit": "api" }, { "lit": "v1" }, { "lit": "query_range" }], "t": { "req": "`reqdata`", "res": "`body.data`" }, "index$": 0 }], "key$": "load" } }, "relations": { "ancestors": [] }, "key$": "prom_query_range", "name__orig": "prom_query_range", "Name": "PromQueryRange", "name_": "prom_query_range", "name-": "prom-query-range", "NAME": "PROM_QUERY_RANGE", "index$": 190 }, { "active": true, "entity": "prom_query_range", "key$": "BasicPromQueryRangeFlow", "kind": "basic", "name": "BasicPromQueryRangeFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "prom_query_range_ref01" }, "m": { "query_id": "query01" }, "o": "create", "s": [], "v": [], "index$": 0 }, { "a": true, "d": {}, "i": { "ref": "prom_query_range_ref01", "srcdatavar": "prom_query_range_ref01_data", "suffix": "_dt0" }, "m": { "id": "prom_query_range01" }, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-prom_query_range_ref01" } }], "index$": 1 }] }, 'PromQueryRange', { "POST /v2/insights/query/{region}/prom/api/v1/query_range": { "protocol": "http", "requestBody": { "required": true, "content": { "application/x-www-form-urlencoded": { "schema": { "type": "object", "required": ["query", "start", "end", "step"], "properties": { "query": { "type": "string", "description": "A PromQL expression to evaluate.", "example": "do.droplets.cpu_time" }, "start": { "type": "string", "description": "Start timestamp. RFC3339 or UNIX timestamp.", "example": "1620683817" }, "end": { "type": "string", "description": "End timestamp. RFC3339 or UNIX timestamp.", "example": "1620705417" }, "step": { "type": "string", "description": "Query resolution step width.", "example": "15s" }, "timeout": { "type": "string", "description": "Optional evaluation timeout duration.", "example": "30s" } } } } } }, "parameters": [{ "in": "path", "name": "region", "description": "The datacenter region slug for the query.", "required": true, "schema": { "type": "string" }, "example": "nyc3", "x-ref": "#/components/parameters/parameters_region", "index$": 0 }] }, "GET /v2/insights/query/{region}/prom/api/v1/query_range": { "protocol": "http", "parameters": [{ "in": "path", "name": "region", "description": "The datacenter region slug for the query.", "required": true, "schema": { "type": "string" }, "example": "nyc3", "x-ref": "#/components/parameters/parameters_region", "index$": 0 }, { "in": "query", "name": "query", "description": "A PromQL expression. This may be a metric selector (for example `do.droplets.cpu_time`) or a fuller expression (for example `rate(do.droplets.cpu_time[5m])`).", "required": true, "schema": { "type": "string" }, "example": "do.droplets.cpu_time", "x-ref": "#/components/parameters/query", "index$": 1 }, { "in": "query", "name": "start", "description": "Start timestamp (inclusive). Accepts a RFC3339 string or a UNIX timestamp.", "required": true, "schema": { "type": "string" }, "example": "1620683817", "x-ref": "#/components/parameters/start", "index$": 2 }, { "in": "query", "name": "end", "description": "End timestamp (inclusive). Accepts a RFC3339 string or a UNIX timestamp.", "required": true, "schema": { "type": "string" }, "example": "1620705417", "x-ref": "#/components/parameters/end", "index$": 3 }, { "in": "query", "name": "step", "description": "Query resolution step width as a Prometheus duration string (for example `15s`, `1m`, `1h`).", "required": true, "schema": { "type": "string" }, "example": "15s", "x-ref": "#/components/parameters/step", "index$": 4 }, { "in": "query", "name": "timeout", "description": "Optional evaluation timeout as a Prometheus duration string.", "required": false, "schema": { "type": "string" }, "example": "30s", "x-ref": "#/components/parameters/timeout", "index$": 5 }] } }, { strict: LIVE_STRICT, t });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const prom_query_range_ref01_ent = client.PromQueryRange();
        let prom_query_range_ref01_data = setup.data.new.prom_query_range['prom_query_range_ref01'];
        prom_query_range_ref01_data['query_id'] = setup.idmap['query01'];
        prom_query_range_ref01_data = (await prom_query_range_ref01_ent.create(prom_query_range_ref01_data)).data();
        (0, node_assert_1.default)(null != prom_query_range_ref01_data);
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
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/prom_query_range/PromQueryRangeTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.DigitaloceanSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['prom_query_range01', 'prom_query_range02', 'prom_query_range03', 'query01'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'DIGITALOCEAN_TEST_PROM_QUERY_RANGE_ENTID': idmap,
        'DIGITALOCEAN_TEST_LIVE': 'FALSE',
        'DIGITALOCEAN_TEST_EXPLAIN': 'FALSE',
        'DIGITALOCEAN_APIKEY': '',
    });
    idmap = env['DIGITALOCEAN_TEST_PROM_QUERY_RANGE_ENTID'];
    const live = 'TRUE' === env.DIGITALOCEAN_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['DIGITALOCEAN_TEST_PROM_QUERY_RANGE_ENTID'];
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
//# sourceMappingURL=PromQueryRangeEntity.test.js.map