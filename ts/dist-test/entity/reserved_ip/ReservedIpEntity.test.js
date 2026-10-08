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
(0, node_test_1.describe)('ReservedIpEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when DIGITALOCEAN_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('DIGITALOCEAN_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.DigitaloceanSDK.test();
        const ent = testsdk.ReservedIp();
        (0, node_assert_1.default)(null != ent);
    });
    class FailHook extends __1.BaseFeature {
        name = 'failhook';
        version = '0.0.1';
        active = true;
        unexpected = 0;
        init() { }
        PreSpec() { throw new Error('reserved_ip hook failed'); }
        PreUnexpected() { this.unexpected++; }
    }
    (0, node_test_1.test)('stream-error', async () => {
        const offline = { net: { offline: true } };
        await node_assert_1.default.rejects(async () => {
            for await (const _item of __1.DigitaloceanSDK.test(offline).ReservedIp().stream('list')) { }
        }, /offline/);
        for await (const _item of __1.DigitaloceanSDK.test(offline).ReservedIp()
            .stream('list', undefined, { ctrl: { throw: false } })) { }
        if (null != __1.config.feature?.rbac) {
            const denied = __1.DigitaloceanSDK.test(undefined, { feature: { rbac: { active: true, deny: true } } });
            await node_assert_1.default.rejects(async () => {
                for await (const _item of denied.ReservedIp().stream('list')) { }
            }, (err) => 'rbac_denied' === err.code);
        }
    });
    (0, node_test_1.test)('stream-ctrl', async () => {
        const explain = {};
        const ctrl = { explain };
        for await (const _item of __1.DigitaloceanSDK.test().ReservedIp().stream('list', undefined, { ctrl })) { }
        node_assert_1.default.deepStrictEqual(Object.keys(ctrl), ['explain']);
        (0, node_assert_1.default)(explain === ctrl.explain && 0 < Object.keys(explain).length);
    });
    (0, node_test_1.test)('unexpected', async () => {
        const hook = new FailHook();
        const client = new __1.DigitaloceanSDK({ feature: { test: { active: true } }, extend: [hook] });
        await node_assert_1.default.rejects(client.ReservedIp().list(), /hook failed/);
        (0, node_assert_1.default)(0 < hook.unexpected);
        const fired = hook.unexpected;
        node_assert_1.default.strictEqual(await client.ReservedIp().list(undefined, { throw: false }), undefined);
        (0, node_assert_1.default)(fired < hook.unexpected);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.DigitaloceanSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.ReservedIp().list({ "page": "x" }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.DIGITALOCEAN_TEST_LIVE;
        for (const op of ['create', 'list', 'load', 'remove']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'reserved_ip.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "droplet": { "a": true, "h": "Droplet", "n": "droplet", "r": false, "sh": "The Droplet that the reserved IP has been assigned to.", "t": "`$ANY`", "union": { "branches": 2, "count": 1, "depth": 0 }, "key$": "droplet", "index$": 0 }, "id": { "a": true, "h": "Id", "n": "id", "r": false, "t": "`$STRING`", "key$": "id", "index$": 1 }, "ip": { "a": true, "fo": "ipv4", "h": "Ip", "n": "ip", "r": false, "sh": "The public IP address of the reserved IP.", "t": "`$STRING`", "key$": "ip", "index$": 2 }, "links": { "a": true, "h": "Links", "n": "links", "r": false, "t": "`$OBJECT`", "key$": "links", "index$": 3 }, "locked": { "a": true, "h": "Locked", "n": "locked", "r": false, "sh": "A boolean value indicating whether or not the reserved IP has pending actions preventing new ones from being submitted.", "t": "`$BOOLEAN`", "key$": "locked", "index$": 4 }, "project_id": { "a": true, "fo": "uuid", "h": "Project Id", "n": "project_id", "r": false, "sh": "The UUID of the project to which the reserved IP currently belongs.<br><br>Requires `project:read` scope.", "t": "`$STRING`", "key$": "project_id", "index$": 5 }, "region": { "a": true, "h": "Region", "n": "region", "r": false, "t": "`$ANY`", "key$": "region", "index$": 6 }, "reserved_ip": { "a": true, "h": "Reserved Ip", "n": "reserved_ip", "r": false, "t": "`$OBJECT`", "union": { "branches": 2, "count": 1, "depth": 2 }, "key$": "reserved_ip", "index$": 7 } }, "id": { "field": "id", "name": "id" }, "name": "reserved_ip", "op": { "create": { "input": "data", "name": "create", "points": [{ "a": true, "co": { "id": "POST /v2/reserved_ips", "source": "openapi3", "version": 2 }, "g": {}, "k": "http", "m": "POST", "o": "/v2/reserved_ips", "q": {}, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "v2" }, { "lit": "reserved_ips" }], "t": { "req": "`reqdata`", "res": "`body.reserved_ip`" }, "index$": 0 }], "key$": "create" }, "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /v2/reserved_ips", "source": "openapi3", "version": 2 }, "g": { "query": [{ "a": true, "ex": 1, "k": "query", "n": "page", "or": "page", "r": false, "t": "`$INTEGER`", "index$": 0 }, { "a": true, "ex": 2, "k": "query", "n": "per_page", "or": "per_page", "r": false, "t": "`$INTEGER`", "index$": 1 }] }, "k": "http", "m": "GET", "o": "/v2/reserved_ips", "q": {}, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "v2" }, { "lit": "reserved_ips" }], "t": { "req": "`reqdata`", "res": "`body.reserved_ips`" }, "index$": 0 }], "key$": "list" }, "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /v2/reserved_ips/{reserved_ip}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "ex": "45.55.96.47", "k": "param", "n": "id", "or": "reserved_ip", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/v2/reserved_ips/{reserved_ip}", "q": { "exist": ["id"] }, "r": { "param": { "reserved_ip": "id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "v2" }, { "lit": "reserved_ips" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body.reserved_ip`" }, "index$": 0 }], "key$": "load" }, "remove": { "input": "data", "name": "remove", "points": [{ "a": true, "co": { "id": "DELETE /v2/reserved_ips/{reserved_ip}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "ex": "45.55.96.47", "k": "param", "n": "id", "or": "reserved_ip", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "DELETE", "o": "/v2/reserved_ips/{reserved_ip}", "q": { "exist": ["id"] }, "r": { "param": { "reserved_ip": "id" } }, "s": [{ "lit": "v2" }, { "lit": "reserved_ips" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "remove" } }, "relations": { "ancestors": [] }, "key$": "reserved_ip", "name__orig": "reserved_ip", "Name": "ReservedIp", "name_": "reserved_ip", "name-": "reserved-ip", "NAME": "RESERVED_IP", "index$": 196 }, { "active": true, "entity": "reserved_ip", "key$": "BasicReservedIpFlow", "kind": "basic", "name": "BasicReservedIpFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "reserved_ip_ref01" }, "m": {}, "o": "create", "s": [], "v": [], "index$": 0 }, { "a": true, "d": {}, "i": {}, "m": {}, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "reserved_ip_ref01" } }], "index$": 1 }, { "a": true, "d": {}, "i": { "ref": "reserved_ip_ref01", "srcdatavar": "reserved_ip_ref01_data", "suffix": "_dt0" }, "m": { "id": "reserved_ip01" }, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-reserved_ip_ref01" } }], "index$": 2 }, { "a": true, "d": {}, "i": { "ref": "reserved_ip_ref01", "suffix": "_rm0" }, "m": { "id": "reserved_ip01" }, "o": "remove", "s": [], "v": [], "index$": 3 }, { "a": true, "d": {}, "i": { "suffix": "_rt0" }, "m": {}, "o": "list", "s": [], "v": [{ "apply": "ItemNotExists", "def": { "ref": "reserved_ip_ref01" } }], "index$": 4 }] }, 'ReservedIp', { "POST /v2/reserved_ips": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "oneOf": [{ "title": "Assign to Droplet", "type": "object", "properties": { "droplet_id": { "type": "integer", "example": 2457247, "description": "The ID of the Droplet that the reserved IP will be assigned to." } }, "required": ["droplet_id"] }, { "title": "Reserve to Region", "type": "object", "properties": { "region": { "type": "string", "example": "nyc3", "description": "The slug identifier for the region the reserved IP will be reserved to." }, "project_id": { "type": "string", "format": "uuid", "example": "746c6152-2fa2-11ed-92d3-27aaa54e4988", "description": "The UUID of the project to which the reserved IP will be assigned." } }, "required": ["region"] }], "x-ref": "#/components/schemas/reserved_ip_create", "index$": 1 } } } }, "parameters": [] }, "GET /v2/reserved_ips": { "protocol": "http", "parameters": [{ "in": "query", "name": "per_page", "required": false, "description": "Number of items returned per page", "schema": { "type": "integer", "minimum": 1, "default": 20, "maximum": 200 }, "example": 2, "x-ref": "#/components/parameters/parameters_per_page", "index$": 0 }, { "in": "query", "name": "page", "required": false, "description": "Which 'page' of paginated results to return.", "schema": { "type": "integer", "minimum": 1, "default": 1 }, "example": 1, "x-ref": "#/components/parameters/page", "index$": 1 }] }, "GET /v2/reserved_ips/{reserved_ip}": { "protocol": "http", "parameters": [{ "in": "path", "name": "reserved_ip", "description": "A reserved IP address.", "required": true, "schema": { "type": "string", "format": "ipv4", "minimum": 1 }, "example": "45.55.96.47", "x-ref": "#/components/parameters/reserved_ip", "index$": 0 }] }, "DELETE /v2/reserved_ips/{reserved_ip}": { "protocol": "http", "parameters": [{ "in": "path", "name": "reserved_ip", "description": "A reserved IP address.", "required": true, "schema": { "type": "string", "format": "ipv4", "minimum": 1 }, "example": "45.55.96.47", "x-ref": "#/components/parameters/reserved_ip", "index$": 0 }] } }, { strict: LIVE_STRICT, t });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const reserved_ip_ref01_ent = client.ReservedIp();
        let reserved_ip_ref01_data = setup.data.new.reserved_ip['reserved_ip_ref01'];
        reserved_ip_ref01_data = (await reserved_ip_ref01_ent.create(reserved_ip_ref01_data)).data();
        (0, node_assert_1.default)(null != reserved_ip_ref01_data.id);
        // LIST
        const reserved_ip_ref01_match = {};
        const reserved_ip_ref01_list = (await reserved_ip_ref01_ent.list(reserved_ip_ref01_match)).map((e) => e.data());
        (0, node_assert_1.default)(!isempty(select(reserved_ip_ref01_list, { id: reserved_ip_ref01_data.id })));
        // LOAD
        const reserved_ip_ref01_match_dt0 = {};
        reserved_ip_ref01_match_dt0.id = reserved_ip_ref01_data.id;
        const reserved_ip_ref01_data_dt0 = (await reserved_ip_ref01_ent.load(reserved_ip_ref01_match_dt0)).data();
        (0, node_assert_1.default)(reserved_ip_ref01_data_dt0.id === reserved_ip_ref01_data.id);
        // REMOVE
        const reserved_ip_ref01_match_rm0 = { id: reserved_ip_ref01_data.id };
        await reserved_ip_ref01_ent.remove(reserved_ip_ref01_match_rm0);
        // LIST
        const reserved_ip_ref01_match_rt0 = {};
        const reserved_ip_ref01_list_rt0 = (await reserved_ip_ref01_ent.list(reserved_ip_ref01_match_rt0)).map((e) => e.data());
        (0, node_assert_1.default)(isempty(select(reserved_ip_ref01_list_rt0, { id: reserved_ip_ref01_data.id })));
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
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/reserved_ip/ReservedIpTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.DigitaloceanSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['reserved_ip01', 'reserved_ip02', 'reserved_ip03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'DIGITALOCEAN_TEST_RESERVED_IP_ENTID': idmap,
        'DIGITALOCEAN_TEST_LIVE': 'FALSE',
        'DIGITALOCEAN_TEST_EXPLAIN': 'FALSE',
        'DIGITALOCEAN_APIKEY': '',
    });
    idmap = env['DIGITALOCEAN_TEST_RESERVED_IP_ENTID'];
    const live = 'TRUE' === env.DIGITALOCEAN_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['DIGITALOCEAN_TEST_RESERVED_IP_ENTID'];
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
//# sourceMappingURL=ReservedIpEntity.test.js.map