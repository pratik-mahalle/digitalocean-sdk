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
(0, node_test_1.describe)('ApiUpdateModelApiKeyOutputEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when DIGITALOCEAN_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('DIGITALOCEAN_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.DigitaloceanSDK.test();
        const ent = testsdk.ApiUpdateModelApiKeyOutput();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.DigitaloceanSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.ApiUpdateModelApiKeyOutput().update({ "api_key_uuid": 1 }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.DIGITALOCEAN_TEST_LIVE;
        for (const op of []) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'api_update_model_api_key_output.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "api_key_uuid": { "a": true, "h": "Api Key Uuid", "n": "api_key_uuid", "r": false, "sh": "API key ID", "t": "`$STRING`", "key$": "api_key_uuid", "index$": 0 }, "created_at": { "a": true, "fo": "date-time", "h": "Created At", "n": "created_at", "r": false, "sh": "Creation date", "t": "`$STRING`", "key$": "created_at", "index$": 1 }, "created_by": { "a": true, "fo": "uint64", "h": "Created By", "n": "created_by", "r": false, "sh": "Created by", "t": "`$STRING`", "key$": "created_by", "index$": 2 }, "deleted_at": { "a": true, "fo": "date-time", "h": "Deleted At", "n": "deleted_at", "r": false, "sh": "Deleted date", "t": "`$STRING`", "key$": "deleted_at", "index$": 3 }, "name": { "a": true, "h": "Name", "n": "name", "r": false, "sh": "Name", "t": "`$STRING`", "key$": "name", "index$": 4 }, "secret_key": { "a": true, "h": "Secret Key", "n": "secret_key", "r": false, "t": "`$STRING`", "key$": "secret_key", "index$": 5 }, "uuid": { "a": true, "h": "Uuid", "n": "uuid", "r": false, "sh": "Uuid", "t": "`$STRING`", "key$": "uuid", "index$": 6 } }, "name": "api_update_model_api_key_output", "op": { "update": { "input": "data", "name": "update", "points": [{ "a": true, "co": { "id": "PUT /v2/gen-ai/models/api_keys/{api_key_uuid}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "ex": "\"123e4567-e89b-12d3-a456-426614174000\"", "k": "param", "n": "api_key_uuid", "or": "api_key_uuid", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "PUT", "o": "/v2/gen-ai/models/api_keys/{api_key_uuid}", "q": { "exist": ["api_key_uuid"] }, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "v2" }, { "lit": "gen-ai" }, { "lit": "models" }, { "lit": "api_keys" }, { "var": "api_key_uuid" }], "t": { "req": "`reqdata`", "res": "`body.api_key_info`" }, "index$": 0 }], "key$": "update" } }, "relations": { "ancestors": [] }, "key$": "api_update_model_api_key_output", "name__orig": "api_update_model_api_key_output", "Name": "ApiUpdateModelApiKeyOutput", "name_": "api_update_model_api_key_output", "name-": "api-update-model-api-key-output", "NAME": "API_UPDATE_MODEL_API_KEY_OUTPUT", "index$": 96 }, { "active": true, "entity": "api_update_model_api_key_output", "key$": "BasicApiUpdateModelApiKeyOutputFlow", "kind": "basic", "name": "BasicApiUpdateModelApiKeyOutputFlow", "param": {}, "step": [{ "a": false, "d": {}, "i": { "ref": "api_update_model_api_key_output_ref01", "srcdatavar": "api_update_model_api_key_output_ref01_data", "suffix": "_up0", "textfield": "created_at" }, "m": {}, "o": "update", "s": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-api_update_model_api_key_output_ref01" } }], "v": [], "unreachable": true }] }, 'ApiUpdateModelApiKeyOutput', { "PUT /v2/gen-ai/models/api_keys/{api_key_uuid}": { "protocol": "http", "requestBody": { "content": { "application/json": { "schema": { "properties": { "api_key_uuid": { "description": "API key ID", "example": "\"12345678-1234-1234-1234-123456789012\"", "type": "string", "key$": "api_key_uuid" }, "name": { "description": "Name", "example": "\"Production Key\"", "type": "string", "key$": "name" } }, "type": "object", "x-ref": "#/components/schemas/apiUpdateModelAPIKeyInputPublic", "index$": 1 } } } }, "parameters": [{ "description": "API key ID", "example": "\"123e4567-e89b-12d3-a456-426614174000\"", "in": "path", "name": "api_key_uuid", "required": true, "schema": { "type": "string" }, "index$": 0 }] } }, { strict: LIVE_STRICT, t });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let api_update_model_api_key_output_ref01_data = Object.values(setup.data.existing.api_update_model_api_key_output)[0];
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
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/api_update_model_api_key_output/ApiUpdateModelApiKeyOutputTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.DigitaloceanSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['api_update_model_api_key_output01', 'api_update_model_api_key_output02', 'api_update_model_api_key_output03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'DIGITALOCEAN_TEST_API_UPDATE_MODEL_API_KEY_OUTPUT_ENTID': idmap,
        'DIGITALOCEAN_TEST_LIVE': 'FALSE',
        'DIGITALOCEAN_TEST_EXPLAIN': 'FALSE',
        'DIGITALOCEAN_APIKEY': '',
    });
    idmap = env['DIGITALOCEAN_TEST_API_UPDATE_MODEL_API_KEY_OUTPUT_ENTID'];
    const live = 'TRUE' === env.DIGITALOCEAN_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['DIGITALOCEAN_TEST_API_UPDATE_MODEL_API_KEY_OUTPUT_ENTID'];
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
//# sourceMappingURL=ApiUpdateModelApiKeyOutputEntity.test.js.map