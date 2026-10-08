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
(0, node_test_1.describe)('ApiDeleteOpenAiapiKeyOutputEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when DIGITALOCEAN_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('DIGITALOCEAN_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.DigitaloceanSDK.test();
        const ent = testsdk.ApiDeleteOpenAiapiKeyOutput();
        (0, node_assert_1.default)(null != ent);
    });
    class FailHook extends __1.BaseFeature {
        name = 'failhook';
        version = '0.0.1';
        active = true;
        unexpected = 0;
        init() { }
        PreSpec() { throw new Error('api_delete_open_aiapi_key_output hook failed'); }
        PreUnexpected() { this.unexpected++; }
    }
    (0, node_test_1.test)('stream-error', async () => {
        const offline = { net: { offline: true } };
        await node_assert_1.default.rejects(async () => {
            for await (const _item of __1.DigitaloceanSDK.test(offline).ApiDeleteOpenAiapiKeyOutput().stream('list')) { }
        }, /offline/);
        for await (const _item of __1.DigitaloceanSDK.test(offline).ApiDeleteOpenAiapiKeyOutput()
            .stream('list', undefined, { ctrl: { throw: false } })) { }
        if (null != __1.config.feature?.rbac) {
            const denied = __1.DigitaloceanSDK.test(undefined, { feature: { rbac: { active: true, deny: true } } });
            await node_assert_1.default.rejects(async () => {
                for await (const _item of denied.ApiDeleteOpenAiapiKeyOutput().stream('list')) { }
            }, (err) => 'rbac_denied' === err.code);
        }
    });
    (0, node_test_1.test)('stream-ctrl', async () => {
        const explain = {};
        const ctrl = { explain };
        for await (const _item of __1.DigitaloceanSDK.test().ApiDeleteOpenAiapiKeyOutput().stream('list', undefined, { ctrl })) { }
        node_assert_1.default.deepStrictEqual(Object.keys(ctrl), ['explain']);
        (0, node_assert_1.default)(explain === ctrl.explain && 0 < Object.keys(explain).length);
    });
    (0, node_test_1.test)('unexpected', async () => {
        const hook = new FailHook();
        const client = new __1.DigitaloceanSDK({ feature: { test: { active: true } }, extend: [hook] });
        await node_assert_1.default.rejects(client.ApiDeleteOpenAiapiKeyOutput().list(), /hook failed/);
        (0, node_assert_1.default)(0 < hook.unexpected);
        const fired = hook.unexpected;
        node_assert_1.default.strictEqual(await client.ApiDeleteOpenAiapiKeyOutput().list(undefined, { throw: false }), undefined);
        (0, node_assert_1.default)(fired < hook.unexpected);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.DigitaloceanSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.ApiDeleteOpenAiapiKeyOutput().list({ "page": "x" }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.DIGITALOCEAN_TEST_LIVE;
        for (const op of ['create', 'list']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'api_delete_open_aiapi_key_output.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "api_key": { "a": true, "h": "Api Key", "n": "api_key", "r": false, "sh": "OpenAI API key", "t": "`$STRING`", "key$": "api_key", "index$": 0 }, "created_at": { "a": true, "fo": "date-time", "h": "Created At", "n": "created_at", "r": false, "sh": "Key creation date", "t": "`$STRING`", "key$": "created_at", "index$": 1 }, "created_by": { "a": true, "fo": "uint64", "h": "Created By", "n": "created_by", "r": false, "sh": "Created by user id from DO", "t": "`$STRING`", "key$": "created_by", "index$": 2 }, "deleted_at": { "a": true, "fo": "date-time", "h": "Deleted At", "n": "deleted_at", "r": false, "sh": "Key deleted date", "t": "`$STRING`", "key$": "deleted_at", "index$": 3 }, "models": { "a": true, "h": "Models", "n": "models", "r": false, "sh": "Models supported by the openAI api key", "t": "`$ARRAY`", "key$": "models", "index$": 4 }, "name": { "a": true, "h": "Name", "n": "name", "r": false, "sh": "Name", "t": "`$STRING`", "key$": "name", "index$": 5 }, "updated_at": { "a": true, "fo": "date-time", "h": "Updated At", "n": "updated_at", "r": false, "sh": "Key last updated date", "t": "`$STRING`", "key$": "updated_at", "index$": 6 }, "uuid": { "a": true, "h": "Uuid", "n": "uuid", "r": false, "sh": "Uuid", "t": "`$STRING`", "key$": "uuid", "index$": 7 } }, "name": "api_delete_open_aiapi_key_output", "op": { "create": { "input": "data", "name": "create", "points": [{ "a": true, "co": { "id": "POST /v2/gen-ai/openai/keys", "source": "openapi3", "version": 2 }, "g": {}, "k": "http", "m": "POST", "o": "/v2/gen-ai/openai/keys", "q": {}, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "v2" }, { "lit": "gen-ai" }, { "lit": "openai" }, { "lit": "keys" }], "t": { "req": "`reqdata`", "res": "`body.api_key_info`" }, "index$": 0 }], "key$": "create" }, "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /v2/gen-ai/openai/keys", "source": "openapi3", "version": 2 }, "g": { "query": [{ "a": true, "ex": 1, "k": "query", "n": "page", "or": "page", "r": false, "t": "`$INTEGER`", "index$": 0 }, { "a": true, "ex": 1, "k": "query", "n": "per_page", "or": "per_page", "r": false, "t": "`$INTEGER`", "index$": 1 }] }, "k": "http", "m": "GET", "o": "/v2/gen-ai/openai/keys", "q": {}, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "v2" }, { "lit": "gen-ai" }, { "lit": "openai" }, { "lit": "keys" }], "t": { "req": "`reqdata`", "res": "`body.api_key_infos`" }, "index$": 0 }], "key$": "list" }, "remove": { "input": "data", "name": "remove", "points": [{ "a": true, "co": { "id": "DELETE /v2/gen-ai/openai/keys/{api_key_uuid}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "ex": "\"123e4567-e89b-12d3-a456-426614174000\"", "k": "param", "n": "api_key_uuid", "or": "api_key_uuid", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "DELETE", "o": "/v2/gen-ai/openai/keys/{api_key_uuid}", "q": { "exist": ["api_key_uuid"] }, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "v2" }, { "lit": "gen-ai" }, { "lit": "openai" }, { "lit": "keys" }, { "var": "api_key_uuid" }], "t": { "req": "`reqdata`", "res": "`body.api_key_info`" }, "index$": 0 }], "key$": "remove" } }, "relations": { "ancestors": [] }, "key$": "api_delete_open_aiapi_key_output", "name__orig": "api_delete_open_aiapi_key_output", "Name": "ApiDeleteOpenAiapiKeyOutput", "name_": "api_delete_open_aiapi_key_output", "name-": "api-delete-open-aiapi-key-output", "NAME": "API_DELETE_OPEN_AIAPI_KEY_OUTPUT", "index$": 24 }, { "active": true, "entity": "api_delete_open_aiapi_key_output", "key$": "BasicApiDeleteOpenAiapiKeyOutputFlow", "kind": "basic", "name": "BasicApiDeleteOpenAiapiKeyOutputFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "api_delete_open_aiapi_key_output_ref01" }, "m": {}, "o": "create", "s": [], "v": [], "index$": 0 }, { "a": true, "d": {}, "i": {}, "m": {}, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "api_delete_open_aiapi_key_output_ref01" } }], "index$": 1 }, { "a": false, "d": {}, "i": { "ref": "api_delete_open_aiapi_key_output_ref01", "suffix": "_rm0" }, "m": { "id": "api_delete_open_aiapi_key_output01" }, "o": "remove", "s": [], "v": [], "unreachable": true }, { "a": true, "d": {}, "i": { "suffix": "_rt0" }, "m": {}, "o": "list", "s": [], "v": [{ "apply": "ItemNotExists", "def": { "ref": "api_delete_open_aiapi_key_output_ref01" } }], "index$": 2 }] }, 'ApiDeleteOpenAiapiKeyOutput', { "POST /v2/gen-ai/openai/keys": { "protocol": "http", "requestBody": { "content": { "application/json": { "schema": { "description": "CreateOpenAIAPIKeyInputPublic is used to create a new OpenAI API key for a specific agent.", "properties": { "api_key": { "description": "OpenAI API key", "example": "\"sk-proj--123456789098765432123456789\"", "type": "string", "key$": "api_key" }, "name": { "description": "Name of the key", "example": "\"Production Key\"", "type": "string", "key$": "name" } }, "type": "object", "x-ref": "#/components/schemas/apiCreateOpenAIAPIKeyInputPublic", "index$": 1 } } } }, "parameters": [] }, "GET /v2/gen-ai/openai/keys": { "protocol": "http", "parameters": [{ "description": "Page number.", "example": 1, "in": "query", "name": "page", "schema": { "type": "integer" }, "index$": 0 }, { "description": "Items per page.", "example": 1, "in": "query", "name": "per_page", "schema": { "type": "integer" }, "index$": 1 }] }, "DELETE /v2/gen-ai/openai/keys/{api_key_uuid}": { "protocol": "http", "parameters": [{ "description": "API key ID", "example": "\"123e4567-e89b-12d3-a456-426614174000\"", "in": "path", "name": "api_key_uuid", "required": true, "schema": { "type": "string" }, "index$": 0 }] } }, { strict: LIVE_STRICT, t });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const api_delete_open_aiapi_key_output_ref01_ent = client.ApiDeleteOpenAiapiKeyOutput();
        let api_delete_open_aiapi_key_output_ref01_data = setup.data.new.api_delete_open_aiapi_key_output['api_delete_open_aiapi_key_output_ref01'];
        api_delete_open_aiapi_key_output_ref01_data = (await api_delete_open_aiapi_key_output_ref01_ent.create(api_delete_open_aiapi_key_output_ref01_data)).data();
        (0, node_assert_1.default)(null != api_delete_open_aiapi_key_output_ref01_data);
        // LIST
        const api_delete_open_aiapi_key_output_ref01_match = {};
        const api_delete_open_aiapi_key_output_ref01_list = (await api_delete_open_aiapi_key_output_ref01_ent.list(api_delete_open_aiapi_key_output_ref01_match)).map((e) => e.data());
        // LIST
        const api_delete_open_aiapi_key_output_ref01_match_rt0 = {};
        const api_delete_open_aiapi_key_output_ref01_list_rt0 = (await api_delete_open_aiapi_key_output_ref01_ent.list(api_delete_open_aiapi_key_output_ref01_match_rt0)).map((e) => e.data());
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
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/api_delete_open_aiapi_key_output/ApiDeleteOpenAiapiKeyOutputTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.DigitaloceanSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['api_delete_open_aiapi_key_output01', 'api_delete_open_aiapi_key_output02', 'api_delete_open_aiapi_key_output03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'DIGITALOCEAN_TEST_API_DELETE_OPEN_AIAPI_KEY_OUTPUT_ENTID': idmap,
        'DIGITALOCEAN_TEST_LIVE': 'FALSE',
        'DIGITALOCEAN_TEST_EXPLAIN': 'FALSE',
        'DIGITALOCEAN_APIKEY': '',
    });
    idmap = env['DIGITALOCEAN_TEST_API_DELETE_OPEN_AIAPI_KEY_OUTPUT_ENTID'];
    const live = 'TRUE' === env.DIGITALOCEAN_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['DIGITALOCEAN_TEST_API_DELETE_OPEN_AIAPI_KEY_OUTPUT_ENTID'];
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
//# sourceMappingURL=ApiDeleteOpenAiapiKeyOutputEntity.test.js.map