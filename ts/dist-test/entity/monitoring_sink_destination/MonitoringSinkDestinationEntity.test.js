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
(0, node_test_1.describe)('MonitoringSinkDestinationEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when DIGITALOCEAN_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('DIGITALOCEAN_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.DigitaloceanSDK.test();
        const ent = testsdk.MonitoringSinkDestination();
        (0, node_assert_1.default)(null != ent);
    });
    class FailHook extends __1.BaseFeature {
        name = 'failhook';
        version = '0.0.1';
        active = true;
        unexpected = 0;
        init() { }
        PreSpec() { throw new Error('monitoring_sink_destination hook failed'); }
        PreUnexpected() { this.unexpected++; }
    }
    (0, node_test_1.test)('stream-error', async () => {
        const offline = { net: { offline: true } };
        await node_assert_1.default.rejects(async () => {
            for await (const _item of __1.DigitaloceanSDK.test(offline).MonitoringSinkDestination().stream('list')) { }
        }, /offline/);
        for await (const _item of __1.DigitaloceanSDK.test(offline).MonitoringSinkDestination()
            .stream('list', undefined, { ctrl: { throw: false } })) { }
        if (null != __1.config.feature?.rbac) {
            const denied = __1.DigitaloceanSDK.test(undefined, { feature: { rbac: { active: true, deny: true } } });
            await node_assert_1.default.rejects(async () => {
                for await (const _item of denied.MonitoringSinkDestination().stream('list')) { }
            }, (err) => 'rbac_denied' === err.code);
        }
    });
    (0, node_test_1.test)('stream-ctrl', async () => {
        const explain = {};
        const ctrl = { explain };
        for await (const _item of __1.DigitaloceanSDK.test().MonitoringSinkDestination().stream('list', undefined, { ctrl })) { }
        node_assert_1.default.deepStrictEqual(Object.keys(ctrl), ['explain']);
        (0, node_assert_1.default)(explain === ctrl.explain && 0 < Object.keys(explain).length);
    });
    (0, node_test_1.test)('unexpected', async () => {
        const hook = new FailHook();
        const client = new __1.DigitaloceanSDK({ feature: { test: { active: true } }, extend: [hook] });
        await node_assert_1.default.rejects(client.MonitoringSinkDestination().list(), /hook failed/);
        (0, node_assert_1.default)(0 < hook.unexpected);
        const fired = hook.unexpected;
        node_assert_1.default.strictEqual(await client.MonitoringSinkDestination().list(undefined, { throw: false }), undefined);
        (0, node_assert_1.default)(fired < hook.unexpected);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.DigitaloceanSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.MonitoringSinkDestination().list({ "id": 1 }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.DIGITALOCEAN_TEST_LIVE;
        for (const op of ['create', 'list', 'update', 'load', 'remove']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'monitoring_sink_destination.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "config": { "a": true, "h": "Config", "n": "config", "op": { "create": { "req": true, "type": "`$OBJECT`" }, "update": { "req": true, "type": "`$OBJECT`" } }, "r": false, "sh": "OpenSearch destination configuration with `credentials` omitted.", "t": "`$OBJECT`", "key$": "config", "index$": 0 }, "id": { "a": true, "h": "Id", "n": "id", "r": false, "sh": "A unique identifier for a destination.", "t": "`$STRING`", "key$": "id", "index$": 1 }, "name": { "a": true, "h": "Name", "n": "name", "r": false, "sh": "destination name", "t": "`$STRING`", "key$": "name", "index$": 2 }, "type": { "a": true, "h": "Type", "n": "type", "op": { "create": { "req": true, "type": "`$STRING`" }, "update": { "req": true, "type": "`$STRING`" } }, "r": false, "sh": "The destination type.", "t": "`$STRING`", "key$": "type", "index$": 3 } }, "id": { "field": "id", "name": "id" }, "name": "monitoring_sink_destination", "op": { "create": { "input": "data", "name": "create", "points": [{ "a": true, "co": { "id": "POST /v2/monitoring/sinks/destinations", "source": "openapi3", "version": 2 }, "g": {}, "k": "http", "m": "POST", "o": "/v2/monitoring/sinks/destinations", "q": {}, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "v2" }, { "lit": "monitoring" }, { "lit": "sinks" }, { "lit": "destinations" }], "t": { "req": "`reqdata`", "res": "`body.destination`" }, "index$": 0 }], "key$": "create" }, "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /v2/monitoring/sinks/destinations", "source": "openapi3", "version": 2 }, "g": {}, "k": "http", "m": "GET", "o": "/v2/monitoring/sinks/destinations", "q": {}, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "v2" }, { "lit": "monitoring" }, { "lit": "sinks" }, { "lit": "destinations" }], "t": { "req": "`reqdata`", "res": "`body.destinations`" }, "index$": 0 }], "key$": "list" }, "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /v2/monitoring/sinks/destinations/{destination_uuid}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "ex": "1a64809f-1708-48ee-a742-dec8d481b8d1", "k": "param", "n": "id", "or": "destination_uuid", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/v2/monitoring/sinks/destinations/{destination_uuid}", "q": { "exist": ["id"] }, "r": { "param": { "destination_uuid": "id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "v2" }, { "lit": "monitoring" }, { "lit": "sinks" }, { "lit": "destinations" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body.destination`" }, "index$": 0 }], "key$": "load" }, "remove": { "input": "data", "name": "remove", "points": [{ "a": true, "co": { "id": "DELETE /v2/monitoring/sinks/destinations/{destination_uuid}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "ex": "1a64809f-1708-48ee-a742-dec8d481b8d1", "k": "param", "n": "id", "or": "destination_uuid", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "DELETE", "o": "/v2/monitoring/sinks/destinations/{destination_uuid}", "q": { "exist": ["id"] }, "r": { "param": { "destination_uuid": "id" } }, "s": [{ "lit": "v2" }, { "lit": "monitoring" }, { "lit": "sinks" }, { "lit": "destinations" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "remove" }, "update": { "input": "data", "name": "update", "points": [{ "a": true, "co": { "id": "POST /v2/monitoring/sinks/destinations/{destination_uuid}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "ex": "1a64809f-1708-48ee-a742-dec8d481b8d1", "k": "param", "n": "id", "or": "destination_uuid", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "POST", "o": "/v2/monitoring/sinks/destinations/{destination_uuid}", "q": { "exist": ["id"] }, "r": { "param": { "destination_uuid": "id" } }, "s": [{ "lit": "v2" }, { "lit": "monitoring" }, { "lit": "sinks" }, { "lit": "destinations" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "update" } }, "relations": { "ancestors": [] }, "key$": "monitoring_sink_destination", "name__orig": "monitoring_sink_destination", "Name": "MonitoringSinkDestination", "name_": "monitoring_sink_destination", "name-": "monitoring-sink-destination", "NAME": "MONITORING_SINK_DESTINATION", "index$": 179 }, { "active": true, "entity": "monitoring_sink_destination", "key$": "BasicMonitoringSinkDestinationFlow", "kind": "basic", "name": "BasicMonitoringSinkDestinationFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "monitoring_sink_destination_ref01" }, "m": {}, "o": "create", "s": [], "v": [], "index$": 0 }, { "a": true, "d": {}, "i": {}, "m": {}, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "monitoring_sink_destination_ref01" } }], "index$": 1 }, { "a": true, "d": {}, "i": { "ref": "monitoring_sink_destination_ref01", "srcdatavar": "monitoring_sink_destination_ref01_data", "suffix": "_up0", "textfield": "name" }, "m": {}, "o": "update", "s": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-monitoring_sink_destination_ref01" } }], "v": [], "index$": 2 }, { "a": true, "d": {}, "i": { "ref": "monitoring_sink_destination_ref01", "srcdatavar": "monitoring_sink_destination_ref01_data", "suffix": "_dt0" }, "m": { "id": "monitoring_sink_destination01" }, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-monitoring_sink_destination_ref01" } }], "index$": 3 }, { "a": true, "d": {}, "i": { "ref": "monitoring_sink_destination_ref01", "suffix": "_rm0" }, "m": { "id": "monitoring_sink_destination01" }, "o": "remove", "s": [], "v": [], "index$": 4 }, { "a": true, "d": {}, "i": { "suffix": "_rt0" }, "m": {}, "o": "list", "s": [], "v": [{ "apply": "ItemNotExists", "def": { "ref": "monitoring_sink_destination_ref01" } }], "index$": 5 }] }, 'MonitoringSinkDestination', { "POST /v2/monitoring/sinks/destinations": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "required": ["config", "type"], "properties": { "name": { "type": "string", "description": "destination name", "example": "managed_opensearch_cluster", "key$": "name" }, "type": { "type": "string", "enum": ["opensearch_dbaas", "opensearch_ext"], "description": "The destination type. `opensearch_dbaas` for a DigitalOcean managed OpenSearch\ncluster or `opensearch_ext` for an externally managed one.\n", "key$": "type" }, "config": { "type": "object", "required": ["endpoint"], "properties": { "credentials": { "type": "object", "description": "Credentials for an OpenSearch cluster user. Optional if `cluster_uuid` is passed.", "properties": { "username": {}, "password": {} } }, "endpoint": { "type": "string", "example": "example.com", "description": "host of the OpenSearch cluster" }, "cluster_uuid": { "type": "string", "example": "85148069-7e35-4999-80bd-6fa1637ca385", "description": "A unique identifier for a managed OpenSearch cluster." }, "cluster_name": { "type": "string", "example": "managed_dbaas_cluster", "description": "Name of a managed OpenSearch cluster." }, "index_name": { "type": "string", "description": "OpenSearch index to send logs to.", "example": "logs" }, "retention_days": { "type": "integer", "description": "Number of days to retain logs in an OpenSearch cluster.", "example": 14, "default": 14 } }, "x-ref": "#/components/schemas/opensearch_config_request", "key$": "config" } }, "x-ref": "#/components/schemas/destination_request", "index$": 1 }, "examples": { "Managed OpenSearch Cluster": { "value": { "name": "managed_opensearch_cluster", "type": "opensearch_dbaas", "config": { "endpoint": "db-opensearch-nyc3-123456-do-user-123456-0.g.db.ondigitalocean.com", "cluster_uuid": "85148069-7e35-4999-80bd-6fa1637ca385", "cluster_name": "managed_dbaas_cluster", "index_name": "logs", "retention_days": 14 } } }, "External OpenSearch Cluster": { "value": { "name": "external_opensearch", "type": "opensearch_ext", "config": { "endpoint": "example.com", "credentials": { "username": "username", "password": "password" }, "index_name": "logs", "retention_days": 14 } } } } } } }, "parameters": [] }, "GET /v2/monitoring/sinks/destinations": { "protocol": "http", "parameters": [] }, "GET /v2/monitoring/sinks/destinations/{destination_uuid}": { "protocol": "http", "parameters": [{ "in": "path", "name": "destination_uuid", "description": "A unique identifier for a destination.", "required": true, "schema": { "type": "string" }, "example": "1a64809f-1708-48ee-a742-dec8d481b8d1", "x-ref": "#/components/parameters/destination_uuid", "index$": 0 }] }, "DELETE /v2/monitoring/sinks/destinations/{destination_uuid}": { "protocol": "http", "parameters": [{ "in": "path", "name": "destination_uuid", "description": "A unique identifier for a destination.", "required": true, "schema": { "type": "string" }, "example": "1a64809f-1708-48ee-a742-dec8d481b8d1", "x-ref": "#/components/parameters/destination_uuid", "index$": 0 }] }, "POST /v2/monitoring/sinks/destinations/{destination_uuid}": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "required": ["config", "type"], "properties": { "name": { "type": "string", "description": "destination name", "example": "managed_opensearch_cluster", "key$": "name" }, "type": { "type": "string", "enum": ["opensearch_dbaas", "opensearch_ext"], "description": "The destination type. `opensearch_dbaas` for a DigitalOcean managed OpenSearch\ncluster or `opensearch_ext` for an externally managed one.\n", "key$": "type" }, "config": { "type": "object", "required": ["endpoint"], "properties": { "credentials": { "type": "object", "description": "Credentials for an OpenSearch cluster user. Optional if `cluster_uuid` is passed.", "properties": { "username": {}, "password": {} } }, "endpoint": { "type": "string", "example": "example.com", "description": "host of the OpenSearch cluster" }, "cluster_uuid": { "type": "string", "example": "85148069-7e35-4999-80bd-6fa1637ca385", "description": "A unique identifier for a managed OpenSearch cluster." }, "cluster_name": { "type": "string", "example": "managed_dbaas_cluster", "description": "Name of a managed OpenSearch cluster." }, "index_name": { "type": "string", "description": "OpenSearch index to send logs to.", "example": "logs" }, "retention_days": { "type": "integer", "description": "Number of days to retain logs in an OpenSearch cluster.", "example": 14, "default": 14 } }, "x-ref": "#/components/schemas/opensearch_config_request", "key$": "config" } }, "x-ref": "#/components/schemas/destination_request", "index$": 1 } } } }, "parameters": [{ "in": "path", "name": "destination_uuid", "description": "A unique identifier for a destination.", "required": true, "schema": { "type": "string" }, "example": "1a64809f-1708-48ee-a742-dec8d481b8d1", "x-ref": "#/components/parameters/destination_uuid", "index$": 0 }] } }, { strict: LIVE_STRICT, t });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const monitoring_sink_destination_ref01_ent = client.MonitoringSinkDestination();
        let monitoring_sink_destination_ref01_data = setup.data.new.monitoring_sink_destination['monitoring_sink_destination_ref01'];
        monitoring_sink_destination_ref01_data = (await monitoring_sink_destination_ref01_ent.create(monitoring_sink_destination_ref01_data)).data();
        (0, node_assert_1.default)(null != monitoring_sink_destination_ref01_data.id);
        // LIST
        const monitoring_sink_destination_ref01_match = {};
        const monitoring_sink_destination_ref01_list = (await monitoring_sink_destination_ref01_ent.list(monitoring_sink_destination_ref01_match)).map((e) => e.data());
        (0, node_assert_1.default)(!isempty(select(monitoring_sink_destination_ref01_list, { id: monitoring_sink_destination_ref01_data.id })));
        // UPDATE
        const monitoring_sink_destination_ref01_data_up0 = {};
        monitoring_sink_destination_ref01_data_up0.id = monitoring_sink_destination_ref01_data.id;
        const monitoring_sink_destination_ref01_markdef_up0 = { name: 'name', value: 'Mark01-monitoring_sink_destination_ref01_' + setup.now };
        monitoring_sink_destination_ref01_data_up0[monitoring_sink_destination_ref01_markdef_up0.name] = monitoring_sink_destination_ref01_markdef_up0.value;
        const monitoring_sink_destination_ref01_resdata_up0 = (await monitoring_sink_destination_ref01_ent.update(monitoring_sink_destination_ref01_data_up0)).data();
        (0, node_assert_1.default)(monitoring_sink_destination_ref01_resdata_up0.id === monitoring_sink_destination_ref01_data_up0.id);
        (0, node_assert_1.default)(monitoring_sink_destination_ref01_resdata_up0[monitoring_sink_destination_ref01_markdef_up0.name] === monitoring_sink_destination_ref01_markdef_up0.value);
        // LOAD
        const monitoring_sink_destination_ref01_match_dt0 = {};
        monitoring_sink_destination_ref01_match_dt0.id = monitoring_sink_destination_ref01_data.id;
        const monitoring_sink_destination_ref01_data_dt0 = (await monitoring_sink_destination_ref01_ent.load(monitoring_sink_destination_ref01_match_dt0)).data();
        (0, node_assert_1.default)(monitoring_sink_destination_ref01_data_dt0.id === monitoring_sink_destination_ref01_data.id);
        // REMOVE
        const monitoring_sink_destination_ref01_match_rm0 = { id: monitoring_sink_destination_ref01_data.id };
        await monitoring_sink_destination_ref01_ent.remove(monitoring_sink_destination_ref01_match_rm0);
        // LIST
        const monitoring_sink_destination_ref01_match_rt0 = {};
        const monitoring_sink_destination_ref01_list_rt0 = (await monitoring_sink_destination_ref01_ent.list(monitoring_sink_destination_ref01_match_rt0)).map((e) => e.data());
        (0, node_assert_1.default)(isempty(select(monitoring_sink_destination_ref01_list_rt0, { id: monitoring_sink_destination_ref01_data.id })));
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
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/monitoring_sink_destination/MonitoringSinkDestinationTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.DigitaloceanSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['monitoring_sink_destination01', 'monitoring_sink_destination02', 'monitoring_sink_destination03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'DIGITALOCEAN_TEST_MONITORING_SINK_DESTINATION_ENTID': idmap,
        'DIGITALOCEAN_TEST_LIVE': 'FALSE',
        'DIGITALOCEAN_TEST_EXPLAIN': 'FALSE',
        'DIGITALOCEAN_APIKEY': '',
    });
    idmap = env['DIGITALOCEAN_TEST_MONITORING_SINK_DESTINATION_ENTID'];
    const live = 'TRUE' === env.DIGITALOCEAN_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['DIGITALOCEAN_TEST_MONITORING_SINK_DESTINATION_ENTID'];
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
//# sourceMappingURL=MonitoringSinkDestinationEntity.test.js.map