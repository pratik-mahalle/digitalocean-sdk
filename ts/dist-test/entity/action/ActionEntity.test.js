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
(0, node_test_1.describe)('ActionEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when DIGITALOCEAN_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('DIGITALOCEAN_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.DigitaloceanSDK.test();
        const ent = testsdk.Action();
        (0, node_assert_1.default)(null != ent);
    });
    class FailHook extends __1.BaseFeature {
        name = 'failhook';
        version = '0.0.1';
        active = true;
        unexpected = 0;
        init() { }
        PreSpec() { throw new Error('action hook failed'); }
        PreUnexpected() { this.unexpected++; }
    }
    (0, node_test_1.test)('stream-error', async () => {
        const offline = { net: { offline: true } };
        await node_assert_1.default.rejects(async () => {
            for await (const _item of __1.DigitaloceanSDK.test(offline).Action().stream('list')) { }
        }, /offline/);
        for await (const _item of __1.DigitaloceanSDK.test(offline).Action()
            .stream('list', undefined, { ctrl: { throw: false } })) { }
        if (null != __1.config.feature?.rbac) {
            const denied = __1.DigitaloceanSDK.test(undefined, { feature: { rbac: { active: true, deny: true } } });
            await node_assert_1.default.rejects(async () => {
                for await (const _item of denied.Action().stream('list')) { }
            }, (err) => 'rbac_denied' === err.code);
        }
    });
    (0, node_test_1.test)('stream-ctrl', async () => {
        const explain = {};
        const ctrl = { explain };
        for await (const _item of __1.DigitaloceanSDK.test().Action().stream('list', undefined, { ctrl })) { }
        node_assert_1.default.deepStrictEqual(Object.keys(ctrl), ['explain']);
        (0, node_assert_1.default)(explain === ctrl.explain && 0 < Object.keys(explain).length);
    });
    (0, node_test_1.test)('unexpected', async () => {
        const hook = new FailHook();
        const client = new __1.DigitaloceanSDK({ feature: { test: { active: true } }, extend: [hook] });
        await node_assert_1.default.rejects(client.Action().list(), /hook failed/);
        (0, node_assert_1.default)(0 < hook.unexpected);
        const fired = hook.unexpected;
        node_assert_1.default.strictEqual(await client.Action().list(undefined, { throw: false }), undefined);
        (0, node_assert_1.default)(fired < hook.unexpected);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.DigitaloceanSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.Action().list({ "page": "x" }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.DIGITALOCEAN_TEST_LIVE;
        for (const op of ['create', 'list', 'load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'action.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "action": { "a": true, "h": "Action", "n": "action", "r": false, "t": "`$OBJECT`", "key$": "action", "index$": 0 }, "completed_at": { "a": true, "fo": "date-time", "h": "Completed At", "n": "completed_at", "r": false, "sh": "A time value given in ISO8601 combined date and time format that represents when the action was completed.", "t": "`$STRING`", "key$": "completed_at", "index$": 1 }, "id": { "a": true, "h": "Id", "n": "id", "r": false, "sh": "A unique numeric ID that can be used to identify and reference an action.", "t": "`$INTEGER`", "key$": "id", "index$": 2 }, "region": { "a": true, "h": "Region", "n": "region", "r": true, "t": "`$OBJECT`", "key$": "region", "index$": 3 }, "region_slug": { "a": true, "h": "Region Slug", "n": "region_slug", "r": false, "sh": "A human-readable string that is used as a unique identifier for each region.", "t": "`$STRING`", "key$": "region_slug", "index$": 4 }, "resource_id": { "a": true, "h": "Resource Id", "n": "resource_id", "r": false, "sh": "A unique identifier for the resource that the action is associated with.", "t": "`$INTEGER`", "key$": "resource_id", "index$": 5 }, "resource_type": { "a": true, "h": "Resource Type", "n": "resource_type", "r": false, "sh": "The type of resource that the action is associated with.", "t": "`$STRING`", "key$": "resource_type", "index$": 6 }, "started_at": { "a": true, "fo": "date-time", "h": "Started At", "n": "started_at", "r": false, "sh": "A time value given in ISO8601 combined date and time format that represents when the action was initiated.", "t": "`$STRING`", "key$": "started_at", "index$": 7 }, "status": { "a": true, "h": "Status", "n": "status", "r": false, "sh": "The current status of the action.", "t": "`$STRING`", "key$": "status", "index$": 8 }, "type": { "a": true, "h": "Type", "n": "type", "r": false, "sh": "This is the type of action that the object represents.", "t": "`$STRING`", "key$": "type", "index$": 9 } }, "id": { "field": "id", "name": "id" }, "name": "action", "op": { "create": { "input": "data", "name": "create", "points": [{ "a": true, "co": { "id": "POST /v2/images/{image_id}/actions", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "ex": 62137902, "k": "param", "n": "image_id", "or": "image_id", "r": true, "t": "`$INTEGER`", "index$": 0 }] }, "k": "http", "m": "POST", "o": "/v2/images/{image_id}/actions", "q": { "exist": ["image_id"] }, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "v2" }, { "lit": "images" }, { "var": "image_id" }, { "lit": "actions" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "create" }, "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /v2/actions", "source": "openapi3", "version": 2 }, "g": { "query": [{ "a": true, "ex": 1, "k": "query", "n": "page", "or": "page", "r": false, "t": "`$INTEGER`", "index$": 0 }, { "a": true, "ex": 2, "k": "query", "n": "per_page", "or": "per_page", "r": false, "t": "`$INTEGER`", "index$": 1 }] }, "k": "http", "m": "GET", "o": "/v2/actions", "q": {}, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "v2" }, { "lit": "actions" }], "t": { "req": "`reqdata`", "res": "`body.actions`" }, "index$": 0 }], "key$": "list" }, "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /v2/images/{image_id}/actions/{action_id}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "ex": 36804636, "k": "param", "n": "id", "or": "action_id", "r": true, "t": "`$INTEGER`", "index$": 0 }, { "a": true, "ex": 62137902, "k": "param", "n": "image_id", "or": "image_id", "r": true, "t": "`$INTEGER`", "index$": 1 }] }, "k": "http", "m": "GET", "o": "/v2/images/{image_id}/actions/{action_id}", "q": { "exist": ["id", "image_id"] }, "r": { "param": { "action_id": "id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "v2" }, { "lit": "images" }, { "var": "image_id" }, { "lit": "actions" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }, { "a": true, "co": { "id": "GET /v2/actions/{action_id}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "ex": 36804636, "k": "param", "n": "id", "or": "action_id", "r": true, "t": "`$INTEGER`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/v2/actions/{action_id}", "q": { "exist": ["id"] }, "r": { "param": { "action_id": "id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "v2" }, { "lit": "actions" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body.action`" }, "index$": 1 }], "key$": "load" } }, "relations": { "ancestors": [["$.main.kit.entity.image"]] }, "key$": "action", "name__orig": "action", "Name": "Action", "name_": "action", "name-": "action", "NAME": "ACTION", "index$": 2 }, { "active": true, "entity": "action", "key$": "BasicActionFlow", "kind": "basic", "name": "BasicActionFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "action_ref01" }, "m": { "image_id": "image01" }, "o": "create", "s": [], "v": [], "index$": 0 }, { "a": true, "d": {}, "i": {}, "m": {}, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "action_ref01" } }], "index$": 1 }, { "a": true, "d": {}, "i": { "ref": "action_ref01", "srcdatavar": "action_ref01_data", "suffix": "_dt0" }, "m": { "id": "action01" }, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-action_ref01" } }], "index$": 2 }] }, 'Action', { "POST /v2/images/{image_id}/actions": { "protocol": "http", "requestBody": { "content": { "application/json": { "schema": { "anyOf": [{ "type": "object", "properties": { "type": { "type": "string", "description": "The action to be taken on the image. Can be either `convert` or `transfer`.", "enum": ["convert", "transfer"], "example": "convert" } }, "required": ["type"], "x-ref": "#/components/schemas/image_action_base" }, { "allOf": [{ "type": "object", "properties": { "type": {} }, "required": ["type"], "x-ref": "#/components/schemas/image_action_base" }, { "type": "object", "properties": { "region": {} }, "required": ["type", "region"] }], "x-ref": "#/components/schemas/image_action_transfer" }], "discriminator": { "propertyName": "type", "mapping": { "convert": "#/components/schemas/image_action_base", "transfer": "#/components/schemas/image_action_transfer" } }, "index$": 1 } } } }, "parameters": [{ "in": "path", "name": "image_id", "description": "A unique number that can be used to identify and reference a specific image.", "required": true, "schema": { "type": "integer" }, "example": 62137902, "x-ref": "#/components/parameters/image_id", "index$": 0 }] }, "GET /v2/actions": { "protocol": "http", "parameters": [{ "in": "query", "name": "per_page", "required": false, "description": "Number of items returned per page", "schema": { "type": "integer", "minimum": 1, "default": 20, "maximum": 200 }, "example": 2, "x-ref": "#/components/parameters/parameters_per_page", "index$": 0 }, { "in": "query", "name": "page", "required": false, "description": "Which 'page' of paginated results to return.", "schema": { "type": "integer", "minimum": 1, "default": 1 }, "example": 1, "x-ref": "#/components/parameters/page", "index$": 1 }] }, "GET /v2/images/{image_id}/actions/{action_id}": { "protocol": "http", "parameters": [{ "in": "path", "name": "image_id", "description": "A unique number that can be used to identify and reference a specific image.", "required": true, "schema": { "type": "integer" }, "example": 62137902, "x-ref": "#/components/parameters/image_id", "index$": 0 }, { "in": "path", "name": "action_id", "description": "A unique numeric ID that can be used to identify and reference an action.", "required": true, "schema": { "type": "integer", "minimum": 1 }, "example": 36804636, "x-ref": "#/components/parameters/action_id", "index$": 1 }] }, "GET /v2/actions/{action_id}": { "protocol": "http", "parameters": [{ "in": "path", "name": "action_id", "description": "A unique numeric ID that can be used to identify and reference an action.", "required": true, "schema": { "type": "integer", "minimum": 1 }, "example": 36804636, "x-ref": "#/components/parameters/action_id", "index$": 0 }] } }, { strict: LIVE_STRICT, t });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const action_ref01_ent = client.Action();
        let action_ref01_data = setup.data.new.action['action_ref01'];
        action_ref01_data['image_id'] = setup.idmap['image01'];
        action_ref01_data = (await action_ref01_ent.create(action_ref01_data)).data();
        (0, node_assert_1.default)(null != action_ref01_data.id);
        // LIST
        const action_ref01_match = {};
        const action_ref01_list = (await action_ref01_ent.list(action_ref01_match)).map((e) => e.data());
        (0, node_assert_1.default)(!isempty(select(action_ref01_list, { id: action_ref01_data.id })));
        // LOAD
        const action_ref01_match_dt0 = {};
        action_ref01_match_dt0.id = action_ref01_data.id;
        const action_ref01_data_dt0 = (await action_ref01_ent.load(action_ref01_match_dt0)).data();
        (0, node_assert_1.default)(action_ref01_data_dt0.id === action_ref01_data.id);
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
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/action/ActionTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.DigitaloceanSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['action01', 'action02', 'action03', 'image01', 'image02', 'image03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'DIGITALOCEAN_TEST_ACTION_ENTID': idmap,
        'DIGITALOCEAN_TEST_LIVE': 'FALSE',
        'DIGITALOCEAN_TEST_EXPLAIN': 'FALSE',
        'DIGITALOCEAN_APIKEY': '',
    });
    idmap = env['DIGITALOCEAN_TEST_ACTION_ENTID'];
    const live = 'TRUE' === env.DIGITALOCEAN_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['DIGITALOCEAN_TEST_ACTION_ENTID'];
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
//# sourceMappingURL=ActionEntity.test.js.map