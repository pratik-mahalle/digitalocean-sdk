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
(0, node_test_1.describe)('ApiGetCustomModelOutputPublicEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when DIGITALOCEAN_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('DIGITALOCEAN_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.DigitaloceanSDK.test();
        const ent = testsdk.ApiGetCustomModelOutputPublic();
        (0, node_assert_1.default)(null != ent);
    });
    class FailHook extends __1.BaseFeature {
        name = 'failhook';
        version = '0.0.1';
        active = true;
        unexpected = 0;
        init() { }
        PreSpec() { throw new Error('api_get_custom_model_output_public hook failed'); }
        PreUnexpected() { this.unexpected++; }
    }
    (0, node_test_1.test)('stream-error', async () => {
        const offline = { net: { offline: true } };
        await node_assert_1.default.rejects(async () => {
            for await (const _item of __1.DigitaloceanSDK.test(offline).ApiGetCustomModelOutputPublic().stream('list')) { }
        }, /offline/);
        for await (const _item of __1.DigitaloceanSDK.test(offline).ApiGetCustomModelOutputPublic()
            .stream('list', undefined, { ctrl: { throw: false } })) { }
        if (null != __1.config.feature?.rbac) {
            const denied = __1.DigitaloceanSDK.test(undefined, { feature: { rbac: { active: true, deny: true } } });
            await node_assert_1.default.rejects(async () => {
                for await (const _item of denied.ApiGetCustomModelOutputPublic().stream('list')) { }
            }, (err) => 'rbac_denied' === err.code);
        }
    });
    (0, node_test_1.test)('stream-ctrl', async () => {
        const explain = {};
        const ctrl = { explain };
        for await (const _item of __1.DigitaloceanSDK.test().ApiGetCustomModelOutputPublic().stream('list', undefined, { ctrl })) { }
        node_assert_1.default.deepStrictEqual(Object.keys(ctrl), ['explain']);
        (0, node_assert_1.default)(explain === ctrl.explain && 0 < Object.keys(explain).length);
    });
    (0, node_test_1.test)('unexpected', async () => {
        const hook = new FailHook();
        const client = new __1.DigitaloceanSDK({ feature: { test: { active: true } }, extend: [hook] });
        await node_assert_1.default.rejects(client.ApiGetCustomModelOutputPublic().list(), /hook failed/);
        (0, node_assert_1.default)(0 < hook.unexpected);
        const fired = hook.unexpected;
        node_assert_1.default.strictEqual(await client.ApiGetCustomModelOutputPublic().list(undefined, { throw: false }), undefined);
        (0, node_assert_1.default)(fired < hook.unexpected);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.DigitaloceanSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.ApiGetCustomModelOutputPublic().list({ "page": "x" }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.DIGITALOCEAN_TEST_LIVE;
        for (const op of ['list']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'api_get_custom_model_output_public.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "active_deployments": { "a": true, "h": "Active Deployments", "n": "active_deployments", "r": false, "sh": "List of active deployments using this model", "t": "`$ARRAY`", "key$": "active_deployments", "index$": 0 }, "architecture": { "a": true, "h": "Architecture", "n": "architecture", "r": false, "sh": "Model architecture type (free-form string from config.json)", "t": "`$STRING`", "key$": "architecture", "index$": 1 }, "config_json": { "a": true, "h": "Config Json", "n": "config_json", "r": false, "sh": "Raw config.json contents from the model repository", "t": "`$OBJECT`", "key$": "config_json", "index$": 2 }, "context_length": { "a": true, "fo": "int64", "h": "Context Length", "n": "context_length", "r": false, "sh": "Maximum context length supported by the model", "t": "`$INTEGER`", "key$": "context_length", "index$": 3 }, "cost_estimate_per_month": { "a": true, "fo": "int64", "h": "Cost Estimate Per Month", "n": "cost_estimate_per_month", "r": false, "sh": "Estimated monthly cost in dollars for hosting", "t": "`$INTEGER`", "key$": "cost_estimate_per_month", "index$": 4 }, "created_at": { "a": true, "fo": "date-time", "h": "Created At", "n": "created_at", "r": false, "sh": "Timestamp when the model was created", "t": "`$STRING`", "key$": "created_at", "index$": 5 }, "description": { "a": true, "h": "Description", "n": "description", "r": false, "sh": "Description of the custom model", "t": "`$STRING`", "key$": "description", "index$": 6 }, "error_message": { "a": true, "h": "Error Message", "n": "error_message", "r": false, "sh": "User-facing reason the most recent import failed; empty otherwise.", "t": "`$STRING`", "key$": "error_message", "index$": 7 }, "file_count": { "a": true, "fo": "int64", "h": "File Count", "n": "file_count", "r": false, "sh": "Number of files in the model", "t": "`$INTEGER`", "key$": "file_count", "index$": 8 }, "input_modalities": { "a": true, "h": "Input Modalities", "n": "input_modalities", "r": false, "sh": "Input modalities supported (e.g., text, image)", "t": "`$ARRAY`", "key$": "input_modalities", "index$": 9 }, "license": { "a": true, "h": "License", "n": "license", "r": false, "sh": "License under which the model is distributed", "t": "`$STRING`", "key$": "license", "index$": 10 }, "name": { "a": true, "h": "Name", "n": "name", "r": false, "sh": "Name of the custom model", "t": "`$STRING`", "key$": "name", "index$": 11 }, "output_modalities": { "a": true, "h": "Output Modalities", "n": "output_modalities", "r": false, "sh": "Output modalities supported (e.g., text, image)", "t": "`$ARRAY`", "key$": "output_modalities", "index$": 12 }, "parameters": { "a": true, "fo": "uint64", "h": "Parameters", "n": "parameters", "r": false, "sh": "Number of parameters in the model", "t": "`$STRING`", "key$": "parameters", "index$": 13 }, "source_ref": { "a": true, "h": "Source Ref", "n": "source_ref", "r": false, "sh": "Reference to the original source of the model", "t": "`$OBJECT`", "key$": "source_ref", "index$": 14 }, "source_type": { "a": true, "h": "Source Type", "n": "source_type", "r": false, "sh": "Source from which the model was imported", "t": "`$STRING`", "key$": "source_type", "index$": 15 }, "status": { "a": true, "h": "Status", "n": "status", "r": false, "sh": "Import and deployment status of the custom model", "t": "`$STRING`", "key$": "status", "index$": 16 }, "storage_region": { "a": true, "h": "Storage Region", "n": "storage_region", "r": false, "sh": "Region of the Spaces bucket where model files are stored", "t": "`$STRING`", "key$": "storage_region", "index$": 17 }, "tags": { "a": true, "h": "Tags", "n": "tags", "r": false, "sh": "User-defined tags for organizing models", "t": "`$OBJECT`", "key$": "tags", "index$": 18 }, "team_id": { "a": true, "fo": "uint64", "h": "Team Id", "n": "team_id", "r": false, "sh": "Team that owns the model", "t": "`$STRING`", "key$": "team_id", "index$": 19 }, "total_size_bytes": { "a": true, "fo": "uint64", "h": "Total Size Bytes", "n": "total_size_bytes", "r": false, "sh": "Total size of model files in bytes", "t": "`$STRING`", "key$": "total_size_bytes", "index$": 20 }, "updated_at": { "a": true, "fo": "date-time", "h": "Updated At", "n": "updated_at", "r": false, "sh": "Timestamp when the model was last updated", "t": "`$STRING`", "key$": "updated_at", "index$": 21 }, "uuid": { "a": true, "h": "Uuid", "n": "uuid", "r": false, "sh": "Unique identifier for the custom model", "t": "`$STRING`", "key$": "uuid", "index$": 22 } }, "name": "api_get_custom_model_output_public", "op": { "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /v2/gen-ai/custom_models", "source": "openapi3", "version": 2 }, "g": { "query": [{ "a": true, "ex": 1, "k": "query", "n": "page", "or": "page", "r": false, "t": "`$INTEGER`", "index$": 0 }, { "a": true, "ex": 1, "k": "query", "n": "per_page", "or": "per_page", "r": false, "t": "`$INTEGER`", "index$": 1 }, { "a": true, "ex": "STATUS_UNSPECIFIED", "k": "query", "n": "status", "or": "status", "r": false, "t": "`$STRING`", "index$": 2 }] }, "k": "http", "m": "GET", "o": "/v2/gen-ai/custom_models", "q": {}, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "v2" }, { "lit": "gen-ai" }, { "lit": "custom_models" }], "t": { "req": "`reqdata`", "res": "`body.models`" }, "index$": 0 }], "key$": "list" }, "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /v2/gen-ai/custom_models/{uuid}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "ex": "\"123e4567-e89b-12d3-a456-426614174000\"", "k": "param", "n": "uuid", "or": "uuid", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/v2/gen-ai/custom_models/{uuid}", "q": { "exist": ["uuid"] }, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "v2" }, { "lit": "gen-ai" }, { "lit": "custom_models" }, { "var": "uuid" }], "t": { "req": "`reqdata`", "res": "`body.model`" }, "index$": 0 }], "key$": "load" }, "update": { "input": "data", "name": "update", "points": [{ "a": true, "co": { "id": "PATCH /v2/gen-ai/custom_models/{uuid}/metadata", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "ex": "\"123e4567-e89b-12d3-a456-426614174000\"", "k": "param", "n": "uuid", "or": "uuid", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "PATCH", "o": "/v2/gen-ai/custom_models/{uuid}/metadata", "q": { "$action": "metadata", "exist": ["uuid"] }, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "v2" }, { "lit": "gen-ai" }, { "lit": "custom_models" }, { "var": "uuid" }, { "lit": "metadata" }], "t": { "req": "`reqdata`", "res": "`body.model`" }, "index$": 0 }], "key$": "update" } }, "relations": { "ancestors": [] }, "key$": "api_get_custom_model_output_public", "name__orig": "api_get_custom_model_output_public", "Name": "ApiGetCustomModelOutputPublic", "name_": "api_get_custom_model_output_public", "name-": "api-get-custom-model-output-public", "NAME": "API_GET_CUSTOM_MODEL_OUTPUT_PUBLIC", "index$": 34 }, { "active": true, "entity": "api_get_custom_model_output_public", "key$": "BasicApiGetCustomModelOutputPublicFlow", "kind": "basic", "name": "BasicApiGetCustomModelOutputPublicFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": {}, "m": {}, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "api_get_custom_model_output_public_ref01" } }], "index$": 0 }, { "a": false, "d": {}, "i": { "ref": "api_get_custom_model_output_public_ref01", "srcdatavar": "api_get_custom_model_output_public_ref01_data", "suffix": "_up0", "textfield": "architecture" }, "m": {}, "o": "update", "s": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-api_get_custom_model_output_public_ref01" } }], "v": [], "unreachable": true }, { "a": false, "d": {}, "i": { "ref": "api_get_custom_model_output_public_ref01", "srcdatavar": "api_get_custom_model_output_public_ref01_data", "suffix": "_dt0" }, "m": { "id": "api_get_custom_model_output_public01" }, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-api_get_custom_model_output_public_ref01" } }], "unreachable": true }] }, 'ApiGetCustomModelOutputPublic', { "GET /v2/gen-ai/custom_models": { "protocol": "http", "parameters": [{ "description": "Page number for pagination.", "example": 1, "in": "query", "name": "page", "schema": { "type": "integer" }, "index$": 0 }, { "description": "Number of items per page.", "example": 1, "in": "query", "name": "per_page", "schema": { "type": "integer" }, "index$": 1 }, { "description": "Filter by model status.", "example": "STATUS_UNSPECIFIED", "in": "query", "name": "status", "schema": { "default": "STATUS_UNSPECIFIED", "enum": ["STATUS_UNSPECIFIED", "STATUS_IMPORTING", "STATUS_READY", "STATUS_FAILED", "STATUS_DELETED"], "type": "string" }, "index$": 2 }] }, "GET /v2/gen-ai/custom_models/{uuid}": { "protocol": "http", "parameters": [{ "description": "UUID of the custom model to retrieve", "example": "\"123e4567-e89b-12d3-a456-426614174000\"", "in": "path", "name": "uuid", "required": true, "schema": { "type": "string" }, "index$": 0 }] }, "PATCH /v2/gen-ai/custom_models/{uuid}/metadata": { "protocol": "http", "requestBody": { "content": { "application/json": { "schema": { "description": "Request to update custom model metadata (public)", "properties": { "description": { "example": "example string", "type": "string" }, "input_modalities": { "description": "Optional new input modalities for the model (replaces existing list when non-empty).\nSpaces-imported models only.", "example": ["example string"], "items": { "example": "example string", "type": "string" }, "type": "array" }, "license": { "example": "example string", "type": "string" }, "name": { "example": "example name", "type": "string" }, "output_modalities": { "description": "Optional new output modalities for the model (replaces existing list when non-empty).\nSpaces-imported models only.", "example": ["example string"], "items": { "example": "example string", "type": "string" }, "type": "array" }, "parameters": { "example": "12345", "format": "uint64", "type": "string" }, "tags": { "description": "User-defined tags for organizing models", "properties": { "tags": { "description": "List of tag strings", "example": ["example string"], "items": { "example": "example string", "type": "string" }, "type": "array" } }, "type": "object", "x-ref": "#/components/schemas/CustomModelTags" }, "uuid": { "description": "UUID of the custom model to update", "example": "a1b2c3d4-...", "type": "string" } }, "type": "object", "x-ref": "#/components/schemas/apiUpdateCustomModelMetadataInputPublic" } } } }, "parameters": [{ "description": "UUID of the custom model to update", "example": "\"123e4567-e89b-12d3-a456-426614174000\"", "in": "path", "name": "uuid", "required": true, "schema": { "type": "string" }, "index$": 0 }] } }, { strict: LIVE_STRICT, t });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let api_get_custom_model_output_public_ref01_data = Object.values(setup.data.existing.api_get_custom_model_output_public)[0];
        // LIST
        const api_get_custom_model_output_public_ref01_ent = client.ApiGetCustomModelOutputPublic();
        const api_get_custom_model_output_public_ref01_match = {};
        const api_get_custom_model_output_public_ref01_list = (await api_get_custom_model_output_public_ref01_ent.list(api_get_custom_model_output_public_ref01_match)).map((e) => e.data());
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
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/api_get_custom_model_output_public/ApiGetCustomModelOutputPublicTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.DigitaloceanSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['api_get_custom_model_output_public01', 'api_get_custom_model_output_public02', 'api_get_custom_model_output_public03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'DIGITALOCEAN_TEST_API_GET_CUSTOM_MODEL_OUTPUT_PUBLIC_ENTID': idmap,
        'DIGITALOCEAN_TEST_LIVE': 'FALSE',
        'DIGITALOCEAN_TEST_EXPLAIN': 'FALSE',
        'DIGITALOCEAN_APIKEY': '',
    });
    idmap = env['DIGITALOCEAN_TEST_API_GET_CUSTOM_MODEL_OUTPUT_PUBLIC_ENTID'];
    const live = 'TRUE' === env.DIGITALOCEAN_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['DIGITALOCEAN_TEST_API_GET_CUSTOM_MODEL_OUTPUT_PUBLIC_ENTID'];
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
//# sourceMappingURL=ApiGetCustomModelOutputPublicEntity.test.js.map