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
(0, node_test_1.describe)('PromStringListEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when DIGITALOCEAN_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('DIGITALOCEAN_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.DigitaloceanSDK.test();
        const ent = testsdk.PromStringList();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.DigitaloceanSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.PromStringList().list({ "name": 1, "query_id": "x" }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.DIGITALOCEAN_TEST_LIVE;
        for (const op of ['create', 'list']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'prom_string_list.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "data": { "a": true, "h": "Data", "n": "data", "r": true, "t": "`$ARRAY`", "key$": "data", "index$": 0 }, "status": { "a": true, "h": "Status", "n": "status", "r": true, "t": "`$STRING`", "key$": "status", "index$": 1 } }, "name": "prom_string_list", "op": { "create": { "input": "data", "name": "create", "points": [{ "a": true, "co": { "id": "POST /v2/insights/query/{region}/prom/api/v1/labels", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "ex": "nyc3", "k": "param", "n": "query_id", "or": "region", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "POST", "o": "/v2/insights/query/{region}/prom/api/v1/labels", "q": { "exist": ["query_id"] }, "r": { "param": { "region": "query_id" } }, "rb": { "fields": [{ "name": "end" }, { "list": true, "name": "match[]" }, { "name": "start" }], "kind": "form", "media": "application/x-www-form-urlencoded" }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "v2" }, { "lit": "insights" }, { "lit": "query" }, { "var": "query_id" }, { "lit": "prom" }, { "lit": "api" }, { "lit": "v1" }, { "lit": "labels" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "create" }, "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /v2/insights/query/{region}/prom/api/v1/label/{name}/values", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "ex": "__name__", "k": "param", "n": "name", "or": "name", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "ex": "nyc3", "k": "param", "n": "query_id", "or": "region", "r": true, "t": "`$STRING`", "index$": 1 }], "query": [{ "a": true, "ex": "1620705417", "k": "query", "n": "end", "or": "end", "r": false, "t": "`$STRING`", "index$": 0 }, { "a": true, "ex": ["{__name__=~\".+\"}"], "k": "query", "n": "match", "or": "match[]", "r": false, "t": "`$ARRAY`", "index$": 1 }, { "a": true, "ex": "1620683817", "k": "query", "n": "start", "or": "start", "r": false, "t": "`$STRING`", "index$": 2 }] }, "k": "http", "m": "GET", "o": "/v2/insights/query/{region}/prom/api/v1/label/{name}/values", "q": { "exist": ["name", "query_id"] }, "r": { "param": { "region": "query_id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "v2" }, { "lit": "insights" }, { "lit": "query" }, { "var": "query_id" }, { "lit": "prom" }, { "lit": "api" }, { "lit": "v1" }, { "lit": "label" }, { "var": "name" }, { "lit": "values" }], "t": { "req": "`reqdata`", "res": "`body.data`" }, "index$": 0 }, { "a": true, "co": { "id": "GET /v2/insights/query/{region}/prom/api/v1/labels", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "ex": "nyc3", "k": "param", "n": "query_id", "or": "region", "r": true, "t": "`$STRING`", "index$": 0 }], "query": [{ "a": true, "ex": "1620705417", "k": "query", "n": "end", "or": "end", "r": false, "t": "`$STRING`", "index$": 0 }, { "a": true, "ex": ["{__name__=~\".+\"}"], "k": "query", "n": "match", "or": "match[]", "r": false, "t": "`$ARRAY`", "index$": 1 }, { "a": true, "ex": "1620683817", "k": "query", "n": "start", "or": "start", "r": false, "t": "`$STRING`", "index$": 2 }] }, "k": "http", "m": "GET", "o": "/v2/insights/query/{region}/prom/api/v1/labels", "q": { "exist": ["query_id"] }, "r": { "param": { "region": "query_id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "v2" }, { "lit": "insights" }, { "lit": "query" }, { "var": "query_id" }, { "lit": "prom" }, { "lit": "api" }, { "lit": "v1" }, { "lit": "labels" }], "t": { "req": "`reqdata`", "res": "`body.data`" }, "index$": 1 }], "key$": "list" } }, "relations": { "ancestors": [] }, "key$": "prom_string_list", "name__orig": "prom_string_list", "Name": "PromStringList", "name_": "prom_string_list", "name-": "prom-string-list", "NAME": "PROM_STRING_LIST", "index$": 192 }, { "active": true, "entity": "prom_string_list", "key$": "BasicPromStringListFlow", "kind": "basic", "name": "BasicPromStringListFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "prom_string_list_ref01" }, "m": { "name": "name01", "query_id": "query01" }, "o": "create", "s": [], "v": [], "index$": 0 }, { "a": true, "d": {}, "i": {}, "m": { "query_id": "query01" }, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "prom_string_list_ref01" } }], "index$": 1 }] }, 'PromStringList', { "POST /v2/insights/query/{region}/prom/api/v1/labels": { "protocol": "http", "requestBody": { "required": false, "content": { "application/x-www-form-urlencoded": { "schema": { "type": "object", "properties": { "start": { "type": "string", "description": "Optional start timestamp.", "example": "1620683817" }, "end": { "type": "string", "description": "Optional end timestamp.", "example": "1620705417" }, "match[]": { "type": "array", "items": { "type": "string" }, "description": "Optional series selectors." } } } } } }, "parameters": [{ "in": "path", "name": "region", "description": "The datacenter region slug for the query.", "required": true, "schema": { "type": "string" }, "example": "nyc3", "x-ref": "#/components/parameters/parameters_region", "index$": 0 }] }, "GET /v2/insights/query/{region}/prom/api/v1/label/{name}/values": { "protocol": "http", "parameters": [{ "in": "path", "name": "region", "description": "The datacenter region slug for the query.", "required": true, "schema": { "type": "string" }, "example": "nyc3", "x-ref": "#/components/parameters/parameters_region", "index$": 0 }, { "in": "path", "name": "name", "description": "The label name whose values should be listed.", "required": true, "schema": { "type": "string" }, "example": "__name__", "x-ref": "#/components/parameters/label_name", "index$": 1 }, { "in": "query", "name": "start", "description": "Optional start timestamp (inclusive). Accepts a RFC3339 string or a UNIX timestamp.", "required": false, "schema": { "type": "string" }, "example": "1620683817", "x-ref": "#/components/parameters/start_optional", "index$": 2 }, { "in": "query", "name": "end", "description": "Optional end timestamp (inclusive). Accepts a RFC3339 string or a UNIX timestamp.", "required": false, "schema": { "type": "string" }, "example": "1620705417", "x-ref": "#/components/parameters/end_optional", "index$": 3 }, { "in": "query", "name": "match[]", "description": "One or more series selectors. Repeat the parameter for multiple matchers.", "required": false, "schema": { "type": "array", "items": { "type": "string" } }, "style": "form", "explode": true, "example": ["{__name__=~\".+\"}"], "x-ref": "#/components/parameters/match", "index$": 4 }] }, "GET /v2/insights/query/{region}/prom/api/v1/labels": { "protocol": "http", "parameters": [{ "in": "path", "name": "region", "description": "The datacenter region slug for the query.", "required": true, "schema": { "type": "string" }, "example": "nyc3", "x-ref": "#/components/parameters/parameters_region", "index$": 0 }, { "in": "query", "name": "start", "description": "Optional start timestamp (inclusive). Accepts a RFC3339 string or a UNIX timestamp.", "required": false, "schema": { "type": "string" }, "example": "1620683817", "x-ref": "#/components/parameters/start_optional", "index$": 1 }, { "in": "query", "name": "end", "description": "Optional end timestamp (inclusive). Accepts a RFC3339 string or a UNIX timestamp.", "required": false, "schema": { "type": "string" }, "example": "1620705417", "x-ref": "#/components/parameters/end_optional", "index$": 2 }, { "in": "query", "name": "match[]", "description": "One or more series selectors. Repeat the parameter for multiple matchers.", "required": false, "schema": { "type": "array", "items": { "type": "string" } }, "style": "form", "explode": true, "example": ["{__name__=~\".+\"}"], "x-ref": "#/components/parameters/match", "index$": 3 }] } }, { strict: LIVE_STRICT, t });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const prom_string_list_ref01_ent = client.PromStringList();
        let prom_string_list_ref01_data = setup.data.new.prom_string_list['prom_string_list_ref01'];
        prom_string_list_ref01_data['name'] = setup.idmap['name01'];
        prom_string_list_ref01_data['query_id'] = setup.idmap['query01'];
        prom_string_list_ref01_data = (await prom_string_list_ref01_ent.create(prom_string_list_ref01_data)).data();
        (0, node_assert_1.default)(null != prom_string_list_ref01_data);
        // LIST
        const prom_string_list_ref01_match = {};
        prom_string_list_ref01_match['query_id'] = setup.idmap['query01'];
        const prom_string_list_ref01_list = (await prom_string_list_ref01_ent.list(prom_string_list_ref01_match)).map((e) => e.data());
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
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/prom_string_list/PromStringListTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.DigitaloceanSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['prom_string_list01', 'prom_string_list02', 'prom_string_list03', 'name01', 'query01'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'DIGITALOCEAN_TEST_PROM_STRING_LIST_ENTID': idmap,
        'DIGITALOCEAN_TEST_LIVE': 'FALSE',
        'DIGITALOCEAN_TEST_EXPLAIN': 'FALSE',
        'DIGITALOCEAN_APIKEY': '',
    });
    idmap = env['DIGITALOCEAN_TEST_PROM_STRING_LIST_ENTID'];
    const live = 'TRUE' === env.DIGITALOCEAN_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['DIGITALOCEAN_TEST_PROM_STRING_LIST_ENTID'];
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
//# sourceMappingURL=PromStringListEntity.test.js.map