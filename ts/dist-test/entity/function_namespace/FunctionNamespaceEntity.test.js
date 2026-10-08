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
(0, node_test_1.describe)('FunctionNamespaceEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when DIGITALOCEAN_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('DIGITALOCEAN_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.DigitaloceanSDK.test();
        const ent = testsdk.FunctionNamespace();
        (0, node_assert_1.default)(null != ent);
    });
    class FailHook extends __1.BaseFeature {
        name = 'failhook';
        version = '0.0.1';
        active = true;
        unexpected = 0;
        init() { }
        PreSpec() { throw new Error('function_namespace hook failed'); }
        PreUnexpected() { this.unexpected++; }
    }
    (0, node_test_1.test)('stream-error', async () => {
        const offline = { net: { offline: true } };
        await node_assert_1.default.rejects(async () => {
            for await (const _item of __1.DigitaloceanSDK.test(offline).FunctionNamespace().stream('list')) { }
        }, /offline/);
        for await (const _item of __1.DigitaloceanSDK.test(offline).FunctionNamespace()
            .stream('list', undefined, { ctrl: { throw: false } })) { }
        if (null != __1.config.feature?.rbac) {
            const denied = __1.DigitaloceanSDK.test(undefined, { feature: { rbac: { active: true, deny: true } } });
            await node_assert_1.default.rejects(async () => {
                for await (const _item of denied.FunctionNamespace().stream('list')) { }
            }, (err) => 'rbac_denied' === err.code);
        }
    });
    (0, node_test_1.test)('stream-ctrl', async () => {
        const explain = {};
        const ctrl = { explain };
        for await (const _item of __1.DigitaloceanSDK.test().FunctionNamespace().stream('list', undefined, { ctrl })) { }
        node_assert_1.default.deepStrictEqual(Object.keys(ctrl), ['explain']);
        (0, node_assert_1.default)(explain === ctrl.explain && 0 < Object.keys(explain).length);
    });
    (0, node_test_1.test)('unexpected', async () => {
        const hook = new FailHook();
        const client = new __1.DigitaloceanSDK({ feature: { test: { active: true } }, extend: [hook] });
        await node_assert_1.default.rejects(client.FunctionNamespace().list(), /hook failed/);
        (0, node_assert_1.default)(0 < hook.unexpected);
        const fired = hook.unexpected;
        node_assert_1.default.strictEqual(await client.FunctionNamespace().list(undefined, { throw: false }), undefined);
        (0, node_assert_1.default)(fired < hook.unexpected);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.DigitaloceanSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.FunctionNamespace().list({ "api_host": 1 }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.DIGITALOCEAN_TEST_LIVE;
        for (const op of ['create', 'list']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'function_namespace.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "api_host": { "a": true, "h": "Api Host", "n": "api_host", "r": false, "sh": "The namespace's API hostname.", "t": "`$STRING`", "key$": "api_host", "index$": 0 }, "created_at": { "a": true, "h": "Created At", "n": "created_at", "r": false, "sh": "UTC time string.", "t": "`$STRING`", "key$": "created_at", "index$": 1 }, "key": { "a": true, "h": "Key", "n": "key", "r": false, "sh": "A random alpha numeric string.", "t": "`$STRING`", "key$": "key", "index$": 2 }, "label": { "a": true, "h": "Label", "n": "label", "op": { "create": { "req": true, "type": "`$STRING`" } }, "r": false, "sh": "The namespace's unique name.", "t": "`$STRING`", "key$": "label", "index$": 3 }, "namespace": { "a": true, "h": "Namespace", "n": "namespace", "r": false, "sh": "A unique string format of UUID with a prefix fn-.", "t": "`$STRING`", "key$": "namespace", "index$": 4 }, "region": { "a": true, "h": "Region", "n": "region", "op": { "create": { "req": true, "type": "`$STRING`" } }, "r": false, "sh": "The namespace's datacenter region.", "t": "`$STRING`", "key$": "region", "index$": 5 }, "updated_at": { "a": true, "h": "Updated At", "n": "updated_at", "r": false, "sh": "UTC time string.", "t": "`$STRING`", "key$": "updated_at", "index$": 6 }, "uuid": { "a": true, "h": "Uuid", "n": "uuid", "r": false, "sh": "The namespace's Universally Unique Identifier.", "t": "`$STRING`", "key$": "uuid", "index$": 7 } }, "name": "function_namespace", "op": { "create": { "input": "data", "name": "create", "points": [{ "a": true, "co": { "id": "POST /v2/functions/namespaces", "source": "openapi3", "version": 2 }, "g": {}, "k": "http", "m": "POST", "o": "/v2/functions/namespaces", "q": {}, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "v2" }, { "lit": "functions" }, { "lit": "namespaces" }], "t": { "req": "`reqdata`", "res": "`body.namespace`" }, "index$": 0 }], "key$": "create" }, "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /v2/functions/namespaces", "source": "openapi3", "version": 2 }, "g": {}, "k": "http", "m": "GET", "o": "/v2/functions/namespaces", "q": {}, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "v2" }, { "lit": "functions" }, { "lit": "namespaces" }], "t": { "req": "`reqdata`", "res": "`body.namespaces`" }, "index$": 0 }], "key$": "list" }, "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /v2/functions/namespaces/{namespace_id}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "ex": "fn-xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx", "k": "param", "n": "namespace_id", "or": "namespace_id", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/v2/functions/namespaces/{namespace_id}", "q": { "exist": ["namespace_id"] }, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "v2" }, { "lit": "functions" }, { "lit": "namespaces" }, { "var": "namespace_id" }], "t": { "req": "`reqdata`", "res": "`body.namespace`" }, "index$": 0 }], "key$": "load" }, "remove": { "input": "data", "name": "remove", "points": [{ "a": true, "co": { "id": "DELETE /v2/functions/namespaces/{namespace_id}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "ex": "fn-xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx", "k": "param", "n": "namespace_id", "or": "namespace_id", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "DELETE", "o": "/v2/functions/namespaces/{namespace_id}", "q": { "exist": ["namespace_id"] }, "r": {}, "s": [{ "lit": "v2" }, { "lit": "functions" }, { "lit": "namespaces" }, { "var": "namespace_id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "remove" } }, "relations": { "ancestors": [] }, "key$": "function_namespace", "name__orig": "function_namespace", "Name": "FunctionNamespace", "name_": "function_namespace", "name-": "function-namespace", "NAME": "FUNCTION_NAMESPACE", "index$": 154 }, { "active": true, "entity": "function_namespace", "key$": "BasicFunctionNamespaceFlow", "kind": "basic", "name": "BasicFunctionNamespaceFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "function_namespace_ref01" }, "m": {}, "o": "create", "s": [], "v": [], "index$": 0 }, { "a": true, "d": {}, "i": {}, "m": {}, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "function_namespace_ref01" } }], "index$": 1 }, { "a": false, "d": {}, "i": { "ref": "function_namespace_ref01", "srcdatavar": "function_namespace_ref01_data", "suffix": "_dt0" }, "m": { "id": "function_namespace01" }, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-function_namespace_ref01" } }], "unreachable": true }, { "a": false, "d": {}, "i": { "ref": "function_namespace_ref01", "suffix": "_rm0" }, "m": { "id": "function_namespace01" }, "o": "remove", "s": [], "v": [], "unreachable": true }, { "a": true, "d": {}, "i": { "suffix": "_rt0" }, "m": {}, "o": "list", "s": [], "v": [{ "apply": "ItemNotExists", "def": { "ref": "function_namespace_ref01" } }], "index$": 2 }] }, 'FunctionNamespace', { "POST /v2/functions/namespaces": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "properties": { "region": { "type": "string", "example": "nyc1", "description": "The [datacenter region](https://docs.digitalocean.com/products/platform/availability-matrix/#available-datacenters) in which to create the namespace.", "key$": "region" }, "label": { "type": "string", "example": "my namespace", "description": "The namespace's unique name.", "key$": "label" } }, "required": ["region", "label"], "x-ref": "#/components/schemas/create_namespace", "index$": 1 } } } }, "parameters": [] }, "GET /v2/functions/namespaces": { "protocol": "http", "parameters": [] }, "GET /v2/functions/namespaces/{namespace_id}": { "protocol": "http", "parameters": [{ "name": "namespace_id", "description": "The ID of the namespace to be managed.", "in": "path", "schema": { "type": "string" }, "example": "fn-xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx", "required": true, "x-ref": "#/components/parameters/namespace_id", "index$": 0 }] }, "DELETE /v2/functions/namespaces/{namespace_id}": { "protocol": "http", "parameters": [{ "name": "namespace_id", "description": "The ID of the namespace to be managed.", "in": "path", "schema": { "type": "string" }, "example": "fn-xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx", "required": true, "x-ref": "#/components/parameters/namespace_id", "index$": 0 }] } }, { strict: LIVE_STRICT, t });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const function_namespace_ref01_ent = client.FunctionNamespace();
        let function_namespace_ref01_data = setup.data.new.function_namespace['function_namespace_ref01'];
        function_namespace_ref01_data = (await function_namespace_ref01_ent.create(function_namespace_ref01_data)).data();
        (0, node_assert_1.default)(null != function_namespace_ref01_data);
        // LIST
        const function_namespace_ref01_match = {};
        const function_namespace_ref01_list = (await function_namespace_ref01_ent.list(function_namespace_ref01_match)).map((e) => e.data());
        // LIST
        const function_namespace_ref01_match_rt0 = {};
        const function_namespace_ref01_list_rt0 = (await function_namespace_ref01_ent.list(function_namespace_ref01_match_rt0)).map((e) => e.data());
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
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/function_namespace/FunctionNamespaceTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.DigitaloceanSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['function_namespace01', 'function_namespace02', 'function_namespace03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'DIGITALOCEAN_TEST_FUNCTION_NAMESPACE_ENTID': idmap,
        'DIGITALOCEAN_TEST_LIVE': 'FALSE',
        'DIGITALOCEAN_TEST_EXPLAIN': 'FALSE',
        'DIGITALOCEAN_APIKEY': '',
    });
    idmap = env['DIGITALOCEAN_TEST_FUNCTION_NAMESPACE_ENTID'];
    const live = 'TRUE' === env.DIGITALOCEAN_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['DIGITALOCEAN_TEST_FUNCTION_NAMESPACE_ENTID'];
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
//# sourceMappingURL=FunctionNamespaceEntity.test.js.map