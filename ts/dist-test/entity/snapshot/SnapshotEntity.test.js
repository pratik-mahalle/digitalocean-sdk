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
(0, node_test_1.describe)('SnapshotEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when DIGITALOCEAN_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('DIGITALOCEAN_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.DigitaloceanSDK.test();
        const ent = testsdk.Snapshot();
        (0, node_assert_1.default)(null != ent);
    });
    class FailHook extends __1.BaseFeature {
        name = 'failhook';
        version = '0.0.1';
        active = true;
        unexpected = 0;
        init() { }
        PreSpec() { throw new Error('snapshot hook failed'); }
        PreUnexpected() { this.unexpected++; }
    }
    (0, node_test_1.test)('stream-error', async () => {
        const offline = { net: { offline: true } };
        await node_assert_1.default.rejects(async () => {
            for await (const _item of __1.DigitaloceanSDK.test(offline).Snapshot().stream('list')) { }
        }, /offline/);
        for await (const _item of __1.DigitaloceanSDK.test(offline).Snapshot()
            .stream('list', undefined, { ctrl: { throw: false } })) { }
        if (null != __1.config.feature?.rbac) {
            const denied = __1.DigitaloceanSDK.test(undefined, { feature: { rbac: { active: true, deny: true } } });
            await node_assert_1.default.rejects(async () => {
                for await (const _item of denied.Snapshot().stream('list')) { }
            }, (err) => 'rbac_denied' === err.code);
        }
    });
    (0, node_test_1.test)('stream-ctrl', async () => {
        const explain = {};
        const ctrl = { explain };
        for await (const _item of __1.DigitaloceanSDK.test().Snapshot().stream('list', undefined, { ctrl })) { }
        node_assert_1.default.deepStrictEqual(Object.keys(ctrl), ['explain']);
        (0, node_assert_1.default)(explain === ctrl.explain && 0 < Object.keys(explain).length);
    });
    (0, node_test_1.test)('unexpected', async () => {
        const hook = new FailHook();
        const client = new __1.DigitaloceanSDK({ feature: { test: { active: true } }, extend: [hook] });
        await node_assert_1.default.rejects(client.Snapshot().list(), /hook failed/);
        (0, node_assert_1.default)(0 < hook.unexpected);
        const fired = hook.unexpected;
        node_assert_1.default.strictEqual(await client.Snapshot().list(undefined, { throw: false }), undefined);
        (0, node_assert_1.default)(fired < hook.unexpected);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.DigitaloceanSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.Snapshot().list({ "page": "x" }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.DIGITALOCEAN_TEST_LIVE;
        for (const op of ['list', 'load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'snapshot.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "created_at": { "a": true, "fo": "date-time", "h": "Created At", "n": "created_at", "r": true, "sh": "A time value given in ISO8601 combined date and time format that represents when the snapshot was created.", "t": "`$STRING`", "key$": "created_at", "index$": 0 }, "id": { "a": true, "h": "Id", "n": "id", "r": true, "sh": "The unique identifier for the snapshot.", "t": "`$STRING`", "key$": "id", "index$": 1 }, "min_disk_size": { "a": true, "h": "Min Disk Size", "n": "min_disk_size", "r": true, "sh": "The minimum size in GB required for a volume or Droplet to use this snapshot.", "t": "`$INTEGER`", "key$": "min_disk_size", "index$": 2 }, "name": { "a": true, "h": "Name", "n": "name", "r": true, "sh": "A human-readable name for the snapshot.", "t": "`$STRING`", "key$": "name", "index$": 3 }, "regions": { "a": true, "h": "Regions", "n": "regions", "r": true, "sh": "An array of the regions that the snapshot is available in.", "t": "`$ARRAY`", "key$": "regions", "index$": 4 }, "resource_id": { "a": true, "h": "Resource Id", "n": "resource_id", "r": true, "sh": "The unique identifier for the resource that the snapshot originated from.", "t": "`$STRING`", "key$": "resource_id", "index$": 5 }, "resource_type": { "a": true, "h": "Resource Type", "n": "resource_type", "r": true, "sh": "The type of resource that the snapshot originated from.", "t": "`$STRING`", "key$": "resource_type", "index$": 6 }, "size_gigabytes": { "a": true, "fo": "float", "h": "Size Gigabytes", "n": "size_gigabytes", "r": true, "sh": "The billable size of the snapshot in gigabytes.", "t": "`$NUMBER`", "key$": "size_gigabytes", "index$": 7 }, "tags": { "a": true, "h": "Tags", "n": "tags", "r": true, "sh": "An array of Tags the snapshot has been tagged with.<br><br>Requires `tag:read` scope.", "t": "`$ARRAY`", "key$": "tags", "index$": 8 } }, "id": { "field": "id", "name": "id" }, "name": "snapshot", "op": { "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /v2/snapshots", "source": "openapi3", "version": 2 }, "g": { "query": [{ "a": true, "ex": 1, "k": "query", "n": "page", "or": "page", "r": false, "t": "`$INTEGER`", "index$": 0 }, { "a": true, "ex": 2, "k": "query", "n": "per_page", "or": "per_page", "r": false, "t": "`$INTEGER`", "index$": 1 }, { "a": true, "ex": "droplet", "k": "query", "n": "resource_type", "or": "resource_type", "r": false, "t": "`$STRING`", "index$": 2 }] }, "k": "http", "m": "GET", "o": "/v2/snapshots", "q": {}, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "v2" }, { "lit": "snapshots" }], "t": { "req": "`reqdata`", "res": "`body.snapshots`" }, "index$": 0 }], "key$": "list" }, "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /v2/snapshots/{snapshot_id}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "ex": 6372321, "k": "param", "n": "id", "or": "snapshot_id", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/v2/snapshots/{snapshot_id}", "q": { "exist": ["id"] }, "r": { "param": { "snapshot_id": "id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "v2" }, { "lit": "snapshots" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body.snapshot`" }, "index$": 0 }], "key$": "load" }, "remove": { "input": "data", "name": "remove", "points": [{ "a": true, "co": { "id": "DELETE /v2/snapshots/{snapshot_id}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "ex": 6372321, "k": "param", "n": "id", "or": "snapshot_id", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "DELETE", "o": "/v2/snapshots/{snapshot_id}", "q": { "exist": ["id"] }, "r": { "param": { "snapshot_id": "id" } }, "s": [{ "lit": "v2" }, { "lit": "snapshots" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "remove" } }, "relations": { "ancestors": [] }, "key$": "snapshot", "name__orig": "snapshot", "Name": "Snapshot", "name_": "snapshot", "name-": "snapshot", "NAME": "SNAPSHOT", "index$": 212 }, { "active": true, "entity": "snapshot", "key$": "BasicSnapshotFlow", "kind": "basic", "name": "BasicSnapshotFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": {}, "m": {}, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "snapshot_ref01" } }], "index$": 0 }, { "a": true, "d": {}, "i": { "ref": "snapshot_ref01", "srcdatavar": "snapshot_ref01_data", "suffix": "_dt0" }, "m": { "id": "snapshot01" }, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-snapshot_ref01" } }], "index$": 1 }] }, 'Snapshot', { "GET /v2/snapshots": { "protocol": "http", "parameters": [{ "in": "query", "name": "per_page", "required": false, "description": "Number of items returned per page", "schema": { "type": "integer", "minimum": 1, "default": 20, "maximum": 200 }, "example": 2, "x-ref": "#/components/parameters/parameters_per_page", "index$": 0 }, { "in": "query", "name": "page", "required": false, "description": "Which 'page' of paginated results to return.", "schema": { "type": "integer", "minimum": 1, "default": 1 }, "example": 1, "x-ref": "#/components/parameters/page", "index$": 1 }, { "in": "query", "name": "resource_type", "description": "Used to filter snapshots by a resource type.", "required": false, "schema": { "type": "string", "enum": ["droplet", "volume"] }, "example": "droplet", "x-ref": "#/components/parameters/snapshot_resource_type", "index$": 2 }] }, "GET /v2/snapshots/{snapshot_id}": { "protocol": "http", "parameters": [{ "in": "path", "name": "snapshot_id", "required": true, "description": "Either the ID of an existing snapshot. This will be an integer for a Droplet snapshot or a string for a volume snapshot.", "schema": { "anyOf": [{ "type": "integer", "description": "The ID of a Droplet snapshot.", "example": 6372321 }, { "type": "string", "description": "The ID of a volume snapshot.", "example": "fbe805e8-866b-11e6-96bf-000f53315a41" }] }, "example": 6372321, "x-ref": "#/components/parameters/snapshot_id", "index$": 0 }] }, "DELETE /v2/snapshots/{snapshot_id}": { "protocol": "http", "parameters": [{ "in": "path", "name": "snapshot_id", "required": true, "description": "Either the ID of an existing snapshot. This will be an integer for a Droplet snapshot or a string for a volume snapshot.", "schema": { "anyOf": [{ "type": "integer", "description": "The ID of a Droplet snapshot.", "example": 6372321 }, { "type": "string", "description": "The ID of a volume snapshot.", "example": "fbe805e8-866b-11e6-96bf-000f53315a41" }] }, "example": 6372321, "x-ref": "#/components/parameters/snapshot_id", "index$": 0 }] } }, { strict: LIVE_STRICT, t });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let snapshot_ref01_data = Object.values(setup.data.existing.snapshot)[0];
        // LIST
        const snapshot_ref01_ent = client.Snapshot();
        const snapshot_ref01_match = {};
        const snapshot_ref01_list = (await snapshot_ref01_ent.list(snapshot_ref01_match)).map((e) => e.data());
        // LOAD
        const snapshot_ref01_match_dt0 = {};
        snapshot_ref01_match_dt0.id = snapshot_ref01_data.id;
        const snapshot_ref01_data_dt0 = (await snapshot_ref01_ent.load(snapshot_ref01_match_dt0)).data();
        (0, node_assert_1.default)(snapshot_ref01_data_dt0.id === snapshot_ref01_data.id);
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
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/snapshot/SnapshotTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.DigitaloceanSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['snapshot01', 'snapshot02', 'snapshot03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'DIGITALOCEAN_TEST_SNAPSHOT_ENTID': idmap,
        'DIGITALOCEAN_TEST_LIVE': 'FALSE',
        'DIGITALOCEAN_TEST_EXPLAIN': 'FALSE',
        'DIGITALOCEAN_APIKEY': '',
    });
    idmap = env['DIGITALOCEAN_TEST_SNAPSHOT_ENTID'];
    const live = 'TRUE' === env.DIGITALOCEAN_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['DIGITALOCEAN_TEST_SNAPSHOT_ENTID'];
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
//# sourceMappingURL=SnapshotEntity.test.js.map