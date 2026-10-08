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
(0, node_test_1.describe)('ReservedIpActionEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when DIGITALOCEAN_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('DIGITALOCEAN_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.DigitaloceanSDK.test();
        const ent = testsdk.ReservedIpAction();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.DigitaloceanSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.ReservedIpAction().list({ "reserved_ip_id": 1 }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.DIGITALOCEAN_TEST_LIVE;
        for (const op of ['create', 'list', 'load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'reserved_ip_action.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "action": { "a": true, "h": "Action", "n": "action", "r": false, "t": "`$OBJECT`", "key$": "action", "index$": 0 }, "completed_at": { "a": true, "fo": "date-time", "h": "Completed At", "n": "completed_at", "r": false, "sh": "A time value given in ISO8601 combined date and time format that represents when the action was completed.", "t": "`$STRING`", "key$": "completed_at", "index$": 1 }, "id": { "a": true, "h": "Id", "n": "id", "r": false, "sh": "A unique numeric ID that can be used to identify and reference an action.", "t": "`$INTEGER`", "key$": "id", "index$": 2 }, "project_id": { "a": true, "fo": "uuid", "h": "Project Id", "n": "project_id", "r": false, "sh": "The UUID of the project to which the reserved IP currently belongs.", "t": "`$STRING`", "key$": "project_id", "index$": 3 }, "region": { "a": true, "h": "Region", "n": "region", "r": true, "t": "`$OBJECT`", "key$": "region", "index$": 4 }, "region_slug": { "a": true, "h": "Region Slug", "n": "region_slug", "r": false, "sh": "A human-readable string that is used as a unique identifier for each region.", "t": "`$STRING`", "key$": "region_slug", "index$": 5 }, "resource_id": { "a": true, "h": "Resource Id", "n": "resource_id", "r": false, "sh": "A unique identifier for the resource that the action is associated with.", "t": "`$INTEGER`", "key$": "resource_id", "index$": 6 }, "resource_type": { "a": true, "h": "Resource Type", "n": "resource_type", "r": false, "sh": "The type of resource that the action is associated with.", "t": "`$STRING`", "key$": "resource_type", "index$": 7 }, "started_at": { "a": true, "fo": "date-time", "h": "Started At", "n": "started_at", "r": false, "sh": "A time value given in ISO8601 combined date and time format that represents when the action was initiated.", "t": "`$STRING`", "key$": "started_at", "index$": 8 }, "status": { "a": true, "h": "Status", "n": "status", "r": false, "sh": "The current status of the action.", "t": "`$STRING`", "key$": "status", "index$": 9 }, "type": { "a": true, "h": "Type", "n": "type", "r": false, "sh": "This is the type of action that the object represents.", "t": "`$STRING`", "key$": "type", "index$": 10 } }, "id": { "field": "id", "name": "id" }, "name": "reserved_ip_action", "op": { "create": { "input": "data", "name": "create", "points": [{ "a": true, "co": { "id": "POST /v2/reserved_ips/{reserved_ip}/actions", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "ex": "45.55.96.47", "k": "param", "n": "reserved_ip_id", "or": "reserved_ip", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "POST", "o": "/v2/reserved_ips/{reserved_ip}/actions", "q": { "exist": ["reserved_ip_id"] }, "r": { "param": { "reserved_ip": "reserved_ip_id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "v2" }, { "lit": "reserved_ips" }, { "var": "reserved_ip_id" }, { "lit": "actions" }], "t": { "req": "`reqdata`", "res": "`body.action`" }, "index$": 0 }], "key$": "create" }, "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /v2/reserved_ips/{reserved_ip}/actions", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "ex": "45.55.96.47", "k": "param", "n": "reserved_ip_id", "or": "reserved_ip", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/v2/reserved_ips/{reserved_ip}/actions", "q": { "exist": ["reserved_ip_id"] }, "r": { "param": { "reserved_ip": "reserved_ip_id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "v2" }, { "lit": "reserved_ips" }, { "var": "reserved_ip_id" }, { "lit": "actions" }], "t": { "req": "`reqdata`", "res": "`body.actions`" }, "index$": 0 }], "key$": "list" }, "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /v2/reserved_ips/{reserved_ip}/actions/{action_id}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "ex": 36804636, "k": "param", "n": "id", "or": "action_id", "r": true, "t": "`$INTEGER`", "index$": 0 }, { "a": true, "ex": "45.55.96.47", "k": "param", "n": "reserved_ip_id", "or": "reserved_ip", "r": true, "t": "`$STRING`", "index$": 1 }] }, "k": "http", "m": "GET", "o": "/v2/reserved_ips/{reserved_ip}/actions/{action_id}", "q": { "exist": ["id", "reserved_ip_id"] }, "r": { "param": { "action_id": "id", "reserved_ip": "reserved_ip_id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "v2" }, { "lit": "reserved_ips" }, { "var": "reserved_ip_id" }, { "lit": "actions" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body.action`" }, "index$": 0 }], "key$": "load" } }, "relations": { "ancestors": [["$.main.kit.entity.reserved_ip"]] }, "key$": "reserved_ip_action", "name__orig": "reserved_ip_action", "Name": "ReservedIpAction", "name_": "reserved_ip_action", "name-": "reserved-ip-action", "NAME": "RESERVED_IP_ACTION", "index$": 203 }, { "active": true, "entity": "reserved_ip_action", "key$": "BasicReservedIpActionFlow", "kind": "basic", "name": "BasicReservedIpActionFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "reserved_ip_action_ref01" }, "m": { "reserved_ip_id": "reserved_ip01" }, "o": "create", "s": [], "v": [], "index$": 0 }, { "a": true, "d": {}, "i": {}, "m": { "reserved_ip_id": "reserved_ip01" }, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "reserved_ip_action_ref01" } }], "index$": 1 }, { "a": true, "d": {}, "i": { "ref": "reserved_ip_action_ref01", "srcdatavar": "reserved_ip_action_ref01_data", "suffix": "_dt0" }, "m": { "id": "reserved_ip_action01", "reserved_ip_id": "reserved_ip01" }, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-reserved_ip_action_ref01" } }], "index$": 2 }] }, 'ReservedIpAction', { "POST /v2/reserved_ips/{reserved_ip}/actions": { "protocol": "http", "requestBody": { "description": "The `type` attribute set in the request body will specify the action that\nwill be taken on the reserved IP.\n", "content": { "application/json": { "schema": { "anyOf": [{ "allOf": [{ "type": "object", "required": ["type"], "properties": { "type": {} }, "discriminator": { "propertyName": "type", "mapping": {} }, "x-ref": "#/components/schemas/reserved_ip_action_type" }, { "type": "object", "required": ["type"] }], "x-ref": "#/components/schemas/reserved_ip_action_unassign" }, { "allOf": [{ "type": "object", "required": ["type"], "properties": { "type": {} }, "discriminator": { "propertyName": "type", "mapping": {} }, "x-ref": "#/components/schemas/reserved_ip_action_type" }, { "type": "object", "required": ["type", "droplet_id"], "properties": { "droplet_id": {} } }], "x-ref": "#/components/schemas/reserved_ip_action_assign" }], "discriminator": { "propertyName": "type", "mapping": { "unassign": "#/components/schemas/reserved_ip_action_unassign", "assign": "#/components/schemas/reserved_ip_action_assign" } }, "index$": 1 } } } }, "parameters": [{ "in": "path", "name": "reserved_ip", "description": "A reserved IP address.", "required": true, "schema": { "type": "string", "format": "ipv4", "minimum": 1 }, "example": "45.55.96.47", "x-ref": "#/components/parameters/reserved_ip", "index$": 0 }] }, "GET /v2/reserved_ips/{reserved_ip}/actions": { "protocol": "http", "parameters": [{ "in": "path", "name": "reserved_ip", "description": "A reserved IP address.", "required": true, "schema": { "type": "string", "format": "ipv4", "minimum": 1 }, "example": "45.55.96.47", "x-ref": "#/components/parameters/reserved_ip", "index$": 0 }] }, "GET /v2/reserved_ips/{reserved_ip}/actions/{action_id}": { "protocol": "http", "parameters": [{ "in": "path", "name": "reserved_ip", "description": "A reserved IP address.", "required": true, "schema": { "type": "string", "format": "ipv4", "minimum": 1 }, "example": "45.55.96.47", "x-ref": "#/components/parameters/reserved_ip", "index$": 0 }, { "in": "path", "name": "action_id", "description": "A unique numeric ID that can be used to identify and reference an action.", "required": true, "schema": { "type": "integer", "minimum": 1 }, "example": 36804636, "x-ref": "#/components/parameters/action_id", "index$": 1 }] } }, { strict: LIVE_STRICT, t });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const reserved_ip_action_ref01_ent = client.ReservedIpAction();
        let reserved_ip_action_ref01_data = setup.data.new.reserved_ip_action['reserved_ip_action_ref01'];
        reserved_ip_action_ref01_data['reserved_ip_id'] = setup.idmap['reserved_ip01'];
        reserved_ip_action_ref01_data = (await reserved_ip_action_ref01_ent.create(reserved_ip_action_ref01_data)).data();
        (0, node_assert_1.default)(null != reserved_ip_action_ref01_data.id);
        // LIST
        const reserved_ip_action_ref01_match = {};
        reserved_ip_action_ref01_match['reserved_ip_id'] = setup.idmap['reserved_ip01'];
        const reserved_ip_action_ref01_list = (await reserved_ip_action_ref01_ent.list(reserved_ip_action_ref01_match)).map((e) => e.data());
        (0, node_assert_1.default)(!isempty(select(reserved_ip_action_ref01_list, { id: reserved_ip_action_ref01_data.id })));
        // LOAD
        const reserved_ip_action_ref01_match_dt0 = {};
        reserved_ip_action_ref01_match_dt0.id = reserved_ip_action_ref01_data.id;
        const reserved_ip_action_ref01_data_dt0 = (await reserved_ip_action_ref01_ent.load(reserved_ip_action_ref01_match_dt0)).data();
        (0, node_assert_1.default)(reserved_ip_action_ref01_data_dt0.id === reserved_ip_action_ref01_data.id);
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
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/reserved_ip_action/ReservedIpActionTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.DigitaloceanSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['reserved_ip_action01', 'reserved_ip_action02', 'reserved_ip_action03', 'reserved_ip01', 'reserved_ip02', 'reserved_ip03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'DIGITALOCEAN_TEST_RESERVED_IP_ACTION_ENTID': idmap,
        'DIGITALOCEAN_TEST_LIVE': 'FALSE',
        'DIGITALOCEAN_TEST_EXPLAIN': 'FALSE',
        'DIGITALOCEAN_APIKEY': '',
    });
    idmap = env['DIGITALOCEAN_TEST_RESERVED_IP_ACTION_ENTID'];
    const live = 'TRUE' === env.DIGITALOCEAN_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['DIGITALOCEAN_TEST_RESERVED_IP_ACTION_ENTID'];
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
//# sourceMappingURL=ReservedIpActionEntity.test.js.map