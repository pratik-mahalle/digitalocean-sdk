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
(0, node_test_1.describe)('PromQueryEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when DIGITALOCEAN_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('DIGITALOCEAN_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.DigitaloceanSDK.test();
        const ent = testsdk.PromQuery();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.DigitaloceanSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.PromQuery().load({ "query_id": 1, "query": "x" }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.DIGITALOCEAN_TEST_LIVE;
        for (const op of ['create', 'load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'prom_query.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "result": { "a": true, "h": "Result", "n": "result", "r": true, "sh": "Result payload shape depends on `resultType`.", "t": "`$ANY`", "union": { "branches": 3, "count": 2, "depth": 6 }, "key$": "result", "index$": 0 }, "resultType": { "a": true, "h": "Result Type", "n": "resultType", "r": true, "t": "`$STRING`", "key$": "resultType", "index$": 1 } }, "name": "prom_query", "op": { "create": { "input": "data", "name": "create", "points": [{ "a": true, "co": { "id": "POST /v2/insights/query/{region}/prom/api/v1/query", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "ex": "nyc3", "k": "param", "n": "query_id", "or": "region", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "POST", "o": "/v2/insights/query/{region}/prom/api/v1/query", "q": { "exist": ["query_id"] }, "r": { "param": { "region": "query_id" } }, "rb": { "fields": [{ "name": "query" }, { "name": "time" }, { "name": "timeout" }], "kind": "form", "media": "application/x-www-form-urlencoded" }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "v2" }, { "lit": "insights" }, { "lit": "query" }, { "var": "query_id" }, { "lit": "prom" }, { "lit": "api" }, { "lit": "v1" }, { "lit": "query" }], "t": { "req": "`reqdata`", "res": "`body.data`" }, "index$": 0 }], "key$": "create" }, "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /v2/insights/query/{region}/prom/api/v1/query", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "ex": "nyc3", "k": "param", "n": "query_id", "or": "region", "r": true, "t": "`$STRING`", "index$": 0 }], "query": [{ "a": true, "ex": "do.droplets.cpu_time", "k": "query", "n": "query", "or": "query", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "ex": "1620683817", "k": "query", "n": "time", "or": "time", "r": false, "t": "`$STRING`", "index$": 1 }, { "a": true, "ex": "30s", "k": "query", "n": "timeout", "or": "timeout", "r": false, "t": "`$STRING`", "index$": 2 }] }, "k": "http", "m": "GET", "o": "/v2/insights/query/{region}/prom/api/v1/query", "q": { "exist": ["query", "query_id"] }, "r": { "param": { "region": "query_id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "v2" }, { "lit": "insights" }, { "lit": "query" }, { "var": "query_id" }, { "lit": "prom" }, { "lit": "api" }, { "lit": "v1" }, { "lit": "query" }], "t": { "req": "`reqdata`", "res": "`body.data`" }, "index$": 0 }], "key$": "load" } }, "relations": { "ancestors": [] }, "key$": "prom_query", "name__orig": "prom_query", "Name": "PromQuery", "name_": "prom_query", "name-": "prom-query", "NAME": "PROM_QUERY", "index$": 195 }, { "active": true, "entity": "prom_query", "key$": "BasicPromQueryFlow", "kind": "basic", "name": "BasicPromQueryFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "prom_query_ref01" }, "m": { "query_id": "query01" }, "o": "create", "s": [], "v": [], "index$": 0 }, { "a": true, "d": {}, "i": { "ref": "prom_query_ref01", "srcdatavar": "prom_query_ref01_data", "suffix": "_dt0" }, "m": { "id": "prom_query01" }, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-prom_query_ref01" } }], "index$": 1 }] }, 'PromQuery', { "POST /v2/insights/query/{region}/prom/api/v1/query": { "protocol": "http", "requestBody": { "required": true, "content": { "application/x-www-form-urlencoded": { "schema": { "type": "object", "required": ["query"], "properties": { "query": { "type": "string", "description": "A PromQL expression to evaluate.", "example": "do.droplets.cpu_time" }, "time": { "type": "string", "description": "Evaluation timestamp. RFC3339 or UNIX timestamp.", "example": "1620683817" }, "timeout": { "type": "string", "description": "Optional evaluation timeout duration.", "example": "30s" } } } } } }, "parameters": [{ "in": "path", "name": "region", "description": "The datacenter region slug for the query.", "required": true, "schema": { "type": "string" }, "example": "nyc3", "x-ref": "#/components/parameters/parameters_region", "index$": 0 }] }, "GET /v2/insights/query/{region}/prom/api/v1/query": { "protocol": "http", "parameters": [{ "in": "path", "name": "region", "description": "The datacenter region slug for the query.", "required": true, "schema": { "type": "string" }, "example": "nyc3", "x-ref": "#/components/parameters/parameters_region", "index$": 0 }, { "in": "query", "name": "query", "description": "A PromQL expression. This may be a metric selector (for example `do.droplets.cpu_time`) or a fuller expression (for example `rate(do.droplets.cpu_time[5m])`).", "required": true, "schema": { "type": "string" }, "example": "do.droplets.cpu_time", "x-ref": "#/components/parameters/query", "index$": 1 }, { "in": "query", "name": "time", "description": "Evaluation timestamp for an instant query. Accepts a RFC3339 string or a UNIX timestamp. Defaults to now when omitted.", "required": false, "schema": { "type": "string" }, "example": "1620683817", "x-ref": "#/components/parameters/time", "index$": 2 }, { "in": "query", "name": "timeout", "description": "Optional evaluation timeout as a Prometheus duration string.", "required": false, "schema": { "type": "string" }, "example": "30s", "x-ref": "#/components/parameters/timeout", "index$": 3 }] } }, { strict: LIVE_STRICT, t });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const prom_query_ref01_ent = client.PromQuery();
        let prom_query_ref01_data = setup.data.new.prom_query['prom_query_ref01'];
        prom_query_ref01_data['query_id'] = setup.idmap['query01'];
        prom_query_ref01_data = (await prom_query_ref01_ent.create(prom_query_ref01_data)).data();
        (0, node_assert_1.default)(null != prom_query_ref01_data);
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
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/prom_query/PromQueryTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.DigitaloceanSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['prom_query01', 'prom_query02', 'prom_query03', 'query01'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'DIGITALOCEAN_TEST_PROM_QUERY_ENTID': idmap,
        'DIGITALOCEAN_TEST_LIVE': 'FALSE',
        'DIGITALOCEAN_TEST_EXPLAIN': 'FALSE',
        'DIGITALOCEAN_APIKEY': '',
    });
    idmap = env['DIGITALOCEAN_TEST_PROM_QUERY_ENTID'];
    const live = 'TRUE' === env.DIGITALOCEAN_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['DIGITALOCEAN_TEST_PROM_QUERY_ENTID'];
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
//# sourceMappingURL=PromQueryEntity.test.js.map