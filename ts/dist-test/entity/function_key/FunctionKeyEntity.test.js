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
(0, node_test_1.describe)('FunctionKeyEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when DIGITALOCEAN_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('DIGITALOCEAN_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.DigitaloceanSDK.test();
        const ent = testsdk.FunctionKey();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.DigitaloceanSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.FunctionKey().list({ "namespace_id": 1 }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.DIGITALOCEAN_TEST_LIVE;
        for (const op of ['create', 'list', 'update', 'remove']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'function_key.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "created_at": { "a": true, "fo": "date-time", "h": "Created At", "n": "created_at", "r": false, "ro": true, "sh": "The date and time the key was created.", "t": "`$STRING`", "key$": "created_at", "index$": 0 }, "expires_at": { "a": true, "fo": "date-time", "h": "Expires At", "n": "expires_at", "r": false, "ro": true, "sh": "When the key expires (null for non-expiring keys).", "t": "`$STRING`", "key$": "expires_at", "index$": 1 }, "expires_in": { "a": true, "h": "Expires In", "n": "expires_in", "r": false, "sh": "The duration after which the access key expires, specified as a human-readable duration string in the format `<int>h` (hours) or `<int>d` (days).", "t": "`$STRING`", "key$": "expires_in", "index$": 2 }, "id": { "a": true, "h": "Id", "n": "id", "r": false, "ro": true, "sh": "The access key's unique identifier with prefix 'dof_v1_'.", "t": "`$STRING`", "key$": "id", "index$": 3 }, "name": { "a": true, "h": "Name", "n": "name", "op": { "list": { "req": false, "type": "`$STRING`" }, "update": { "req": false, "type": "`$STRING`" } }, "r": true, "sh": "The access key's name.", "t": "`$STRING`", "key$": "name", "index$": 4 }, "updated_at": { "a": true, "fo": "date-time", "h": "Updated At", "n": "updated_at", "r": false, "ro": true, "sh": "The date and time the key was last updated.", "t": "`$STRING`", "key$": "updated_at", "index$": 5 } }, "id": { "field": "id", "name": "id" }, "name": "function_key", "op": { "create": { "input": "data", "name": "create", "points": [{ "a": true, "co": { "id": "POST /v2/functions/namespaces/{namespace_id}/keys", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "ex": "fn-xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx", "k": "param", "n": "namespace_id", "or": "namespace_id", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "POST", "o": "/v2/functions/namespaces/{namespace_id}/keys", "q": { "exist": ["namespace_id"] }, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "v2" }, { "lit": "functions" }, { "lit": "namespaces" }, { "var": "namespace_id" }, { "lit": "keys" }], "t": { "req": "`reqdata`", "res": "`body.access_key`" }, "index$": 0 }], "key$": "create" }, "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /v2/functions/namespaces/{namespace_id}/keys", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "ex": "fn-xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx", "k": "param", "n": "namespace_id", "or": "namespace_id", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/v2/functions/namespaces/{namespace_id}/keys", "q": { "exist": ["namespace_id"] }, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "v2" }, { "lit": "functions" }, { "lit": "namespaces" }, { "var": "namespace_id" }, { "lit": "keys" }], "t": { "req": "`reqdata`", "res": "`body.access_keys`" }, "index$": 0 }], "key$": "list" }, "remove": { "input": "data", "name": "remove", "points": [{ "a": true, "co": { "id": "DELETE /v2/functions/namespaces/{namespace_id}/keys/{key_id}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "ex": "dof-xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx", "k": "param", "n": "id", "or": "key_id", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "ex": "fn-xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx", "k": "param", "n": "namespace_id", "or": "namespace_id", "r": true, "t": "`$STRING`", "index$": 1 }] }, "k": "http", "m": "DELETE", "o": "/v2/functions/namespaces/{namespace_id}/keys/{key_id}", "q": { "exist": ["id", "namespace_id"] }, "r": { "param": { "key_id": "id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "v2" }, { "lit": "functions" }, { "lit": "namespaces" }, { "var": "namespace_id" }, { "lit": "keys" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "remove" }, "update": { "input": "data", "name": "update", "points": [{ "a": true, "co": { "id": "PUT /v2/functions/namespaces/{namespace_id}/keys/{key_id}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "ex": "dof-xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx", "k": "param", "n": "id", "or": "key_id", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "ex": "fn-xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx", "k": "param", "n": "namespace_id", "or": "namespace_id", "r": true, "t": "`$STRING`", "index$": 1 }] }, "k": "http", "m": "PUT", "o": "/v2/functions/namespaces/{namespace_id}/keys/{key_id}", "q": { "exist": ["id", "namespace_id"] }, "r": { "param": { "key_id": "id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "v2" }, { "lit": "functions" }, { "lit": "namespaces" }, { "var": "namespace_id" }, { "lit": "keys" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body.access_key`" }, "index$": 0 }], "key$": "update" } }, "relations": { "ancestors": [] }, "key$": "function_key", "name__orig": "function_key", "Name": "FunctionKey", "name_": "function_key", "name-": "function-key", "NAME": "FUNCTION_KEY", "index$": 153 }, { "active": true, "entity": "function_key", "key$": "BasicFunctionKeyFlow", "kind": "basic", "name": "BasicFunctionKeyFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "function_key_ref01" }, "m": { "namespace_id": "namespace01" }, "o": "create", "s": [], "v": [], "index$": 0 }, { "a": true, "d": {}, "i": {}, "m": { "namespace_id": "namespace01" }, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "function_key_ref01" } }], "index$": 1 }, { "a": true, "d": { "namespace_id": "namespace01" }, "i": { "ref": "function_key_ref01", "srcdatavar": "function_key_ref01_data", "suffix": "_up0", "textfield": "expires_in" }, "m": {}, "o": "update", "s": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-function_key_ref01" } }], "v": [], "index$": 2 }, { "a": true, "d": {}, "i": { "ref": "function_key_ref01", "suffix": "_rm0" }, "m": { "id": "function_key01", "namespace_id": "namespace01" }, "o": "remove", "s": [], "v": [], "index$": 3 }, { "a": true, "d": {}, "i": { "suffix": "_rt0" }, "m": { "namespace_id": "namespace01" }, "o": "list", "s": [], "v": [{ "apply": "ItemNotExists", "def": { "ref": "function_key_ref01" } }], "index$": 4 }] }, 'FunctionKey', { "POST /v2/functions/namespaces/{namespace_id}/keys": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "properties": { "name": { "type": "string", "description": "The access key's name.", "example": "my-function-access-key", "key$": "name" }, "expires_in": { "type": "string", "description": "The duration after which the access key expires, specified as a human-readable duration string in the format `<int>h` (hours) or `<int>d` (days). Minimum value is `1h`. If omitted, the key will never expire.", "example": "7d", "key$": "expires_in" } }, "required": ["name"], "x-ref": "#/components/schemas/access_key_create_request", "index$": 1 }, "examples": { "Create Non-Expiring Key": { "value": { "name": "my-function-access-key" } }, "Create Expiring Key": { "value": { "name": "my-function-access-key", "expires_in": "7d" } } } } } }, "parameters": [{ "name": "namespace_id", "description": "The ID of the namespace to be managed.", "in": "path", "schema": { "type": "string" }, "example": "fn-xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx", "required": true, "x-ref": "#/components/parameters/namespace_id", "index$": 0 }] }, "GET /v2/functions/namespaces/{namespace_id}/keys": { "protocol": "http", "parameters": [{ "name": "namespace_id", "description": "The ID of the namespace to be managed.", "in": "path", "schema": { "type": "string" }, "example": "fn-xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx", "required": true, "x-ref": "#/components/parameters/namespace_id", "index$": 0 }] }, "DELETE /v2/functions/namespaces/{namespace_id}/keys/{key_id}": { "protocol": "http", "parameters": [{ "name": "namespace_id", "description": "The ID of the namespace to be managed.", "in": "path", "schema": { "type": "string" }, "example": "fn-xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx", "required": true, "x-ref": "#/components/parameters/namespace_id", "index$": 0 }, { "name": "key_id", "description": "The ID of the access key to be managed.", "in": "path", "schema": { "type": "string" }, "example": "dof-xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx", "required": true, "x-ref": "#/components/parameters/key_id", "index$": 1 }] }, "PUT /v2/functions/namespaces/{namespace_id}/keys/{key_id}": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "properties": { "name": { "type": "string", "description": "The new name for the access key.", "example": "updated-key-name", "key$": "name" } }, "required": ["name"], "index$": 1 }, "examples": { "Update Key Name": { "value": { "name": "updated-key-name" } } } } } }, "parameters": [{ "name": "namespace_id", "description": "The ID of the namespace to be managed.", "in": "path", "schema": { "type": "string" }, "example": "fn-xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx", "required": true, "x-ref": "#/components/parameters/namespace_id", "index$": 0 }, { "name": "key_id", "description": "The ID of the access key to be managed.", "in": "path", "schema": { "type": "string" }, "example": "dof-xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx", "required": true, "x-ref": "#/components/parameters/key_id", "index$": 1 }] } }, { strict: LIVE_STRICT, t });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const function_key_ref01_ent = client.FunctionKey();
        let function_key_ref01_data = setup.data.new.function_key['function_key_ref01'];
        function_key_ref01_data['namespace_id'] = setup.idmap['namespace01'];
        function_key_ref01_data = (await function_key_ref01_ent.create(function_key_ref01_data)).data();
        (0, node_assert_1.default)(null != function_key_ref01_data.id);
        // LIST
        const function_key_ref01_match = {};
        function_key_ref01_match['namespace_id'] = setup.idmap['namespace01'];
        const function_key_ref01_list = (await function_key_ref01_ent.list(function_key_ref01_match)).map((e) => e.data());
        (0, node_assert_1.default)(!isempty(select(function_key_ref01_list, { id: function_key_ref01_data.id })));
        // UPDATE
        const function_key_ref01_data_up0 = {};
        function_key_ref01_data_up0.id = function_key_ref01_data.id;
        function_key_ref01_data_up0['namespace_id'] = setup.idmap['namespace_id'];
        const function_key_ref01_markdef_up0 = { name: 'expires_in', value: 'Mark01-function_key_ref01_' + setup.now };
        function_key_ref01_data_up0[function_key_ref01_markdef_up0.name] = function_key_ref01_markdef_up0.value;
        const function_key_ref01_resdata_up0 = (await function_key_ref01_ent.update(function_key_ref01_data_up0)).data();
        (0, node_assert_1.default)(function_key_ref01_resdata_up0.id === function_key_ref01_data_up0.id);
        (0, node_assert_1.default)(function_key_ref01_resdata_up0[function_key_ref01_markdef_up0.name] === function_key_ref01_markdef_up0.value);
        // REMOVE
        const function_key_ref01_match_rm0 = { id: function_key_ref01_data.id };
        await function_key_ref01_ent.remove(function_key_ref01_match_rm0);
        // LIST
        const function_key_ref01_match_rt0 = {};
        function_key_ref01_match_rt0['namespace_id'] = setup.idmap['namespace01'];
        const function_key_ref01_list_rt0 = (await function_key_ref01_ent.list(function_key_ref01_match_rt0)).map((e) => e.data());
        (0, node_assert_1.default)(isempty(select(function_key_ref01_list_rt0, { id: function_key_ref01_data.id })));
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
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/function_key/FunctionKeyTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.DigitaloceanSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['function_key01', 'function_key02', 'function_key03', 'namespace01'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'DIGITALOCEAN_TEST_FUNCTION_KEY_ENTID': idmap,
        'DIGITALOCEAN_TEST_LIVE': 'FALSE',
        'DIGITALOCEAN_TEST_EXPLAIN': 'FALSE',
        'DIGITALOCEAN_APIKEY': '',
    });
    idmap = env['DIGITALOCEAN_TEST_FUNCTION_KEY_ENTID'];
    const live = 'TRUE' === env.DIGITALOCEAN_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['DIGITALOCEAN_TEST_FUNCTION_KEY_ENTID'];
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
//# sourceMappingURL=FunctionKeyEntity.test.js.map