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
(0, node_test_1.describe)('ByoipPrefixEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when DIGITALOCEAN_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('DIGITALOCEAN_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.DigitaloceanSDK.test();
        const ent = testsdk.ByoipPrefix();
        (0, node_assert_1.default)(null != ent);
    });
    class FailHook extends __1.BaseFeature {
        name = 'failhook';
        version = '0.0.1';
        active = true;
        unexpected = 0;
        init() { }
        PreSpec() { throw new Error('byoip_prefix hook failed'); }
        PreUnexpected() { this.unexpected++; }
    }
    (0, node_test_1.test)('stream-error', async () => {
        const offline = { net: { offline: true } };
        await node_assert_1.default.rejects(async () => {
            for await (const _item of __1.DigitaloceanSDK.test(offline).ByoipPrefix().stream('list')) { }
        }, /offline/);
        for await (const _item of __1.DigitaloceanSDK.test(offline).ByoipPrefix()
            .stream('list', undefined, { ctrl: { throw: false } })) { }
        if (null != __1.config.feature?.rbac) {
            const denied = __1.DigitaloceanSDK.test(undefined, { feature: { rbac: { active: true, deny: true } } });
            await node_assert_1.default.rejects(async () => {
                for await (const _item of denied.ByoipPrefix().stream('list')) { }
            }, (err) => 'rbac_denied' === err.code);
        }
    });
    (0, node_test_1.test)('stream-ctrl', async () => {
        const explain = {};
        const ctrl = { explain };
        for await (const _item of __1.DigitaloceanSDK.test().ByoipPrefix().stream('list', undefined, { ctrl })) { }
        node_assert_1.default.deepStrictEqual(Object.keys(ctrl), ['explain']);
        (0, node_assert_1.default)(explain === ctrl.explain && 0 < Object.keys(explain).length);
    });
    (0, node_test_1.test)('unexpected', async () => {
        const hook = new FailHook();
        const client = new __1.DigitaloceanSDK({ feature: { test: { active: true } }, extend: [hook] });
        await node_assert_1.default.rejects(client.ByoipPrefix().list(), /hook failed/);
        (0, node_assert_1.default)(0 < hook.unexpected);
        const fired = hook.unexpected;
        node_assert_1.default.strictEqual(await client.ByoipPrefix().list(undefined, { throw: false }), undefined);
        (0, node_assert_1.default)(fired < hook.unexpected);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.DigitaloceanSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.ByoipPrefix().list({ "page": "x" }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.DIGITALOCEAN_TEST_LIVE;
        for (const op of ['create', 'list', 'update', 'load', 'remove']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'byoip_prefix.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "advertise": { "a": true, "h": "Advertise", "n": "advertise", "r": false, "sh": "Whether the BYOIP prefix should be advertised", "t": "`$BOOLEAN`", "key$": "advertise", "index$": 0 }, "advertised": { "a": true, "h": "Advertised", "n": "advertised", "r": false, "sh": "Whether the BYOIP prefix is being advertised", "t": "`$BOOLEAN`", "key$": "advertised", "index$": 1 }, "failure_reason": { "a": true, "h": "Failure Reason", "n": "failure_reason", "r": false, "sh": "Reason for failure, if applicable", "t": "`$STRING`", "key$": "failure_reason", "index$": 2 }, "id": { "a": true, "h": "Id", "n": "id", "r": false, "t": "`$STRING`", "key$": "id", "index$": 3 }, "locked": { "a": true, "h": "Locked", "n": "locked", "r": false, "sh": "Whether the BYOIP prefix is locked", "t": "`$BOOLEAN`", "key$": "locked", "index$": 4 }, "name": { "a": true, "h": "Name", "n": "name", "r": false, "sh": "Name of the BYOIP prefix", "t": "`$STRING`", "key$": "name", "index$": 5 }, "prefix": { "a": true, "h": "Prefix", "n": "prefix", "op": { "create": { "req": true, "type": "`$STRING`" } }, "r": false, "sh": "The IP prefix in CIDR notation", "t": "`$STRING`", "key$": "prefix", "index$": 6 }, "project_id": { "a": true, "h": "Project Id", "n": "project_id", "r": false, "sh": "The ID of the project associated with the BYOIP prefix", "t": "`$STRING`", "key$": "project_id", "index$": 7 }, "region": { "a": true, "h": "Region", "n": "region", "op": { "create": { "req": true, "type": "`$STRING`" } }, "r": false, "sh": "Region where the BYOIP prefix is located", "t": "`$STRING`", "key$": "region", "index$": 8 }, "signature": { "a": true, "h": "Signature", "n": "signature", "r": true, "sh": "The signature hash for the prefix creation request", "t": "`$STRING`", "key$": "signature", "index$": 9 }, "status": { "a": true, "h": "Status", "n": "status", "r": false, "sh": "Status of the BYOIP prefix", "t": "`$STRING`", "key$": "status", "index$": 10 }, "uuid": { "a": true, "h": "Uuid", "n": "uuid", "r": false, "sh": "Unique identifier for the BYOIP prefix", "t": "`$STRING`", "key$": "uuid", "index$": 11 }, "validations": { "a": true, "h": "Validations", "n": "validations", "r": false, "sh": "List of validation statuses for the BYOIP prefix", "t": "`$ARRAY`", "key$": "validations", "index$": 12 } }, "id": { "field": "id", "name": "id" }, "name": "byoip_prefix", "op": { "create": { "input": "data", "name": "create", "points": [{ "a": true, "co": { "id": "POST /v2/byoip_prefixes", "source": "openapi3", "version": 2 }, "g": {}, "k": "http", "m": "POST", "o": "/v2/byoip_prefixes", "q": {}, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "v2" }, { "lit": "byoip_prefixes" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "create" }, "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /v2/byoip_prefixes/{byoip_prefix_uuid}/ips", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "ex": "f47ac10b-58cc-4372-a567-0e02b2c3d479", "k": "param", "n": "id", "or": "byoip_prefix_uuid", "r": true, "t": "`$STRING`", "index$": 0 }], "query": [{ "a": true, "ex": 1, "k": "query", "n": "page", "or": "page", "r": false, "t": "`$INTEGER`", "index$": 0 }, { "a": true, "ex": 2, "k": "query", "n": "per_page", "or": "per_page", "r": false, "t": "`$INTEGER`", "index$": 1 }] }, "k": "http", "m": "GET", "o": "/v2/byoip_prefixes/{byoip_prefix_uuid}/ips", "q": { "$action": "ips", "exist": ["id"] }, "r": { "param": { "byoip_prefix_uuid": "id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "v2" }, { "lit": "byoip_prefixes" }, { "var": "id" }, { "lit": "ips" }], "t": { "req": "`reqdata`", "res": "`body.ips`" }, "index$": 0 }, { "a": true, "co": { "id": "GET /v2/byoip_prefixes", "source": "openapi3", "version": 2 }, "g": { "query": [{ "a": true, "ex": 1, "k": "query", "n": "page", "or": "page", "r": false, "t": "`$INTEGER`", "index$": 0 }, { "a": true, "ex": 2, "k": "query", "n": "per_page", "or": "per_page", "r": false, "t": "`$INTEGER`", "index$": 1 }] }, "k": "http", "m": "GET", "o": "/v2/byoip_prefixes", "q": {}, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "v2" }, { "lit": "byoip_prefixes" }], "t": { "req": "`reqdata`", "res": "`body.byoip_prefixes`" }, "index$": 1 }], "key$": "list" }, "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /v2/byoip_prefixes/{byoip_prefix_uuid}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "ex": "f47ac10b-58cc-4372-a567-0e02b2c3d479", "k": "param", "n": "id", "or": "byoip_prefix_uuid", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/v2/byoip_prefixes/{byoip_prefix_uuid}", "q": { "exist": ["id"] }, "r": { "param": { "byoip_prefix_uuid": "id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "v2" }, { "lit": "byoip_prefixes" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body.byoip_prefix`" }, "index$": 0 }], "key$": "load" }, "remove": { "input": "data", "name": "remove", "points": [{ "a": true, "co": { "id": "DELETE /v2/byoip_prefixes/{byoip_prefix_uuid}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "ex": "f47ac10b-58cc-4372-a567-0e02b2c3d479", "k": "param", "n": "id", "or": "byoip_prefix_uuid", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "DELETE", "o": "/v2/byoip_prefixes/{byoip_prefix_uuid}", "q": { "exist": ["id"] }, "r": { "param": { "byoip_prefix_uuid": "id" } }, "s": [{ "lit": "v2" }, { "lit": "byoip_prefixes" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "remove" }, "update": { "input": "data", "name": "update", "points": [{ "a": true, "co": { "id": "PATCH /v2/byoip_prefixes/{byoip_prefix_uuid}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "ex": "f47ac10b-58cc-4372-a567-0e02b2c3d479", "k": "param", "n": "id", "or": "byoip_prefix_uuid", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "PATCH", "o": "/v2/byoip_prefixes/{byoip_prefix_uuid}", "q": { "exist": ["id"] }, "r": { "param": { "byoip_prefix_uuid": "id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "v2" }, { "lit": "byoip_prefixes" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body.byoip_prefix`" }, "index$": 0 }], "key$": "update" } }, "relations": { "ancestors": [] }, "key$": "byoip_prefix", "name__orig": "byoip_prefix", "Name": "ByoipPrefix", "name_": "byoip_prefix", "name-": "byoip-prefix", "NAME": "BYOIP_PREFIX", "index$": 125 }, { "active": true, "entity": "byoip_prefix", "key$": "BasicByoipPrefixFlow", "kind": "basic", "name": "BasicByoipPrefixFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "byoip_prefix_ref01" }, "m": {}, "o": "create", "s": [], "v": [], "index$": 0 }, { "a": true, "d": {}, "i": {}, "m": {}, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "byoip_prefix_ref01" } }], "index$": 1 }, { "a": true, "d": {}, "i": { "ref": "byoip_prefix_ref01", "srcdatavar": "byoip_prefix_ref01_data", "suffix": "_up0", "textfield": "failure_reason" }, "m": {}, "o": "update", "s": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-byoip_prefix_ref01" } }], "v": [], "index$": 2 }, { "a": true, "d": {}, "i": { "ref": "byoip_prefix_ref01", "srcdatavar": "byoip_prefix_ref01_data", "suffix": "_dt0" }, "m": { "id": "byoip_prefix01" }, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-byoip_prefix_ref01" } }], "index$": 3 }, { "a": true, "d": {}, "i": { "ref": "byoip_prefix_ref01", "suffix": "_rm0" }, "m": { "id": "byoip_prefix01" }, "o": "remove", "s": [], "v": [], "index$": 4 }, { "a": true, "d": {}, "i": { "suffix": "_rt0" }, "m": {}, "o": "list", "s": [], "v": [{ "apply": "ItemNotExists", "def": { "ref": "byoip_prefix_ref01" } }], "index$": 5 }] }, 'ByoipPrefix', { "POST /v2/byoip_prefixes": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "properties": { "prefix": { "type": "string", "description": "The IP prefix in CIDR notation to bring", "example": "203.11.13.0/24", "key$": "prefix" }, "region": { "type": "string", "description": "The region where the prefix will be created", "example": "nyc3", "key$": "region" }, "signature": { "type": "string", "description": "The signature hash for the prefix creation request", "example": "<sample-signature>", "key$": "signature" } }, "required": ["prefix", "region", "signature"], "x-ref": "#/components/schemas/byoip_prefix_create", "index$": 1 } } } }, "parameters": [] }, "GET /v2/byoip_prefixes/{byoip_prefix_uuid}/ips": { "protocol": "http", "parameters": [{ "in": "path", "name": "byoip_prefix_uuid", "description": "The unique identifier for the BYOIP Prefix.", "required": true, "schema": { "type": "string", "format": "uuid", "minimum": 1 }, "example": "f47ac10b-58cc-4372-a567-0e02b2c3d479", "x-ref": "#/components/parameters/byoip_prefix", "index$": 0 }, { "in": "query", "name": "per_page", "required": false, "description": "Number of items returned per page", "schema": { "type": "integer", "minimum": 1, "default": 20, "maximum": 200 }, "example": 2, "x-ref": "#/components/parameters/parameters_per_page", "index$": 1 }, { "in": "query", "name": "page", "required": false, "description": "Which 'page' of paginated results to return.", "schema": { "type": "integer", "minimum": 1, "default": 1 }, "example": 1, "x-ref": "#/components/parameters/page", "index$": 2 }] }, "GET /v2/byoip_prefixes": { "protocol": "http", "parameters": [{ "in": "query", "name": "per_page", "required": false, "description": "Number of items returned per page", "schema": { "type": "integer", "minimum": 1, "default": 20, "maximum": 200 }, "example": 2, "x-ref": "#/components/parameters/parameters_per_page", "index$": 0 }, { "in": "query", "name": "page", "required": false, "description": "Which 'page' of paginated results to return.", "schema": { "type": "integer", "minimum": 1, "default": 1 }, "example": 1, "x-ref": "#/components/parameters/page", "index$": 1 }] }, "GET /v2/byoip_prefixes/{byoip_prefix_uuid}": { "protocol": "http", "parameters": [{ "in": "path", "name": "byoip_prefix_uuid", "description": "The unique identifier for the BYOIP Prefix.", "required": true, "schema": { "type": "string", "format": "uuid", "minimum": 1 }, "example": "f47ac10b-58cc-4372-a567-0e02b2c3d479", "x-ref": "#/components/parameters/byoip_prefix", "index$": 0 }] }, "DELETE /v2/byoip_prefixes/{byoip_prefix_uuid}": { "protocol": "http", "parameters": [{ "in": "path", "name": "byoip_prefix_uuid", "description": "The unique identifier for the BYOIP Prefix.", "required": true, "schema": { "type": "string", "format": "uuid", "minimum": 1 }, "example": "f47ac10b-58cc-4372-a567-0e02b2c3d479", "x-ref": "#/components/parameters/byoip_prefix", "index$": 0 }] }, "PATCH /v2/byoip_prefixes/{byoip_prefix_uuid}": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "properties": { "advertise": { "type": "boolean", "description": "Whether the BYOIP prefix should be advertised", "example": true, "key$": "advertise" } }, "x-ref": "#/components/schemas/byoip_prefix_update", "index$": 1 } } } }, "parameters": [{ "in": "path", "name": "byoip_prefix_uuid", "schema": { "type": "string", "format": "uuid" }, "required": true, "description": "A unique identifier for a BYOIP prefix.", "example": "f47ac10b-58cc-4372-a567-0e02b2c3d479", "index$": 0 }] } }, { strict: LIVE_STRICT, t });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const byoip_prefix_ref01_ent = client.ByoipPrefix();
        let byoip_prefix_ref01_data = setup.data.new.byoip_prefix['byoip_prefix_ref01'];
        byoip_prefix_ref01_data = (await byoip_prefix_ref01_ent.create(byoip_prefix_ref01_data)).data();
        (0, node_assert_1.default)(null != byoip_prefix_ref01_data.id);
        // LIST
        const byoip_prefix_ref01_match = {};
        const byoip_prefix_ref01_list = (await byoip_prefix_ref01_ent.list(byoip_prefix_ref01_match)).map((e) => e.data());
        (0, node_assert_1.default)(!isempty(select(byoip_prefix_ref01_list, { id: byoip_prefix_ref01_data.id })));
        // UPDATE
        const byoip_prefix_ref01_data_up0 = {};
        byoip_prefix_ref01_data_up0.id = byoip_prefix_ref01_data.id;
        const byoip_prefix_ref01_markdef_up0 = { name: 'failure_reason', value: 'Mark01-byoip_prefix_ref01_' + setup.now };
        byoip_prefix_ref01_data_up0[byoip_prefix_ref01_markdef_up0.name] = byoip_prefix_ref01_markdef_up0.value;
        const byoip_prefix_ref01_resdata_up0 = (await byoip_prefix_ref01_ent.update(byoip_prefix_ref01_data_up0)).data();
        (0, node_assert_1.default)(byoip_prefix_ref01_resdata_up0.id === byoip_prefix_ref01_data_up0.id);
        (0, node_assert_1.default)(byoip_prefix_ref01_resdata_up0[byoip_prefix_ref01_markdef_up0.name] === byoip_prefix_ref01_markdef_up0.value);
        // LOAD
        const byoip_prefix_ref01_match_dt0 = {};
        byoip_prefix_ref01_match_dt0.id = byoip_prefix_ref01_data.id;
        const byoip_prefix_ref01_data_dt0 = (await byoip_prefix_ref01_ent.load(byoip_prefix_ref01_match_dt0)).data();
        (0, node_assert_1.default)(byoip_prefix_ref01_data_dt0.id === byoip_prefix_ref01_data.id);
        // REMOVE
        const byoip_prefix_ref01_match_rm0 = { id: byoip_prefix_ref01_data.id };
        await byoip_prefix_ref01_ent.remove(byoip_prefix_ref01_match_rm0);
        // LIST
        const byoip_prefix_ref01_match_rt0 = {};
        const byoip_prefix_ref01_list_rt0 = (await byoip_prefix_ref01_ent.list(byoip_prefix_ref01_match_rt0)).map((e) => e.data());
        (0, node_assert_1.default)(isempty(select(byoip_prefix_ref01_list_rt0, { id: byoip_prefix_ref01_data.id })));
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
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/byoip_prefix/ByoipPrefixTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.DigitaloceanSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['byoip_prefix01', 'byoip_prefix02', 'byoip_prefix03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'DIGITALOCEAN_TEST_BYOIP_PREFIX_ENTID': idmap,
        'DIGITALOCEAN_TEST_LIVE': 'FALSE',
        'DIGITALOCEAN_TEST_EXPLAIN': 'FALSE',
        'DIGITALOCEAN_APIKEY': '',
    });
    idmap = env['DIGITALOCEAN_TEST_BYOIP_PREFIX_ENTID'];
    const live = 'TRUE' === env.DIGITALOCEAN_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['DIGITALOCEAN_TEST_BYOIP_PREFIX_ENTID'];
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
//# sourceMappingURL=ByoipPrefixEntity.test.js.map