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
(0, node_test_1.describe)('ApiUpdateModelRouterOutputEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when DIGITALOCEAN_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('DIGITALOCEAN_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.DigitaloceanSDK.test();
        const ent = testsdk.ApiUpdateModelRouterOutput();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.DigitaloceanSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.ApiUpdateModelRouterOutput().update({ "uuid": 1 }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.DIGITALOCEAN_TEST_LIVE;
        for (const op of []) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'api_update_model_router_output.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "config": { "a": true, "h": "Config", "n": "config", "r": false, "t": "`$OBJECT`", "key$": "config", "index$": 0 }, "created_at": { "a": true, "fo": "date-time", "h": "Created At", "n": "created_at", "r": false, "sh": "Creation date / time", "t": "`$STRING`", "key$": "created_at", "index$": 1 }, "description": { "a": true, "h": "Description", "n": "description", "r": false, "sh": "Description", "t": "`$STRING`", "key$": "description", "index$": 2 }, "fallback_models": { "a": true, "h": "Fallback Models", "n": "fallback_models", "r": false, "t": "`$ARRAY`", "key$": "fallback_models", "index$": 3 }, "name": { "a": true, "h": "Name", "n": "name", "r": false, "sh": "Name of the model router", "t": "`$STRING`", "key$": "name", "index$": 4 }, "policies": { "a": true, "h": "Policies", "n": "policies", "r": false, "sh": "Router policies", "t": "`$ARRAY`", "key$": "policies", "index$": 5 }, "regions": { "a": true, "h": "Regions", "n": "regions", "r": false, "sh": "Target regions for the router", "t": "`$ARRAY`", "key$": "regions", "index$": 6 }, "updated_at": { "a": true, "fo": "date-time", "h": "Updated At", "n": "updated_at", "r": false, "sh": "Last modified", "t": "`$STRING`", "key$": "updated_at", "index$": 7 }, "uuid": { "a": true, "h": "Uuid", "n": "uuid", "r": false, "sh": "Unique id", "t": "`$STRING`", "key$": "uuid", "index$": 8 } }, "name": "api_update_model_router_output", "op": { "update": { "input": "data", "name": "update", "points": [{ "a": true, "co": { "id": "PUT /v2/gen-ai/models/routers/{uuid}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "ex": "\"123e4567-e89b-12d3-a456-426614174000\"", "k": "param", "n": "uuid", "or": "uuid", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "PUT", "o": "/v2/gen-ai/models/routers/{uuid}", "q": { "exist": ["uuid"] }, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "v2" }, { "lit": "gen-ai" }, { "lit": "models" }, { "lit": "routers" }, { "var": "uuid" }], "t": { "req": "`reqdata`", "res": "`body.model_router`" }, "index$": 0 }], "key$": "update" } }, "relations": { "ancestors": [] }, "key$": "api_update_model_router_output", "name__orig": "api_update_model_router_output", "Name": "ApiUpdateModelRouterOutput", "name_": "api_update_model_router_output", "name-": "api-update-model-router-output", "NAME": "API_UPDATE_MODEL_ROUTER_OUTPUT", "index$": 96 }, { "active": true, "entity": "api_update_model_router_output", "key$": "BasicApiUpdateModelRouterOutputFlow", "kind": "basic", "name": "BasicApiUpdateModelRouterOutputFlow", "param": {}, "step": [{ "a": false, "d": {}, "i": { "ref": "api_update_model_router_output_ref01", "srcdatavar": "api_update_model_router_output_ref01_data", "suffix": "_up0", "textfield": "created_at" }, "m": {}, "o": "update", "s": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-api_update_model_router_output_ref01" } }], "v": [], "unreachable": true }] }, 'ApiUpdateModelRouterOutput', { "PUT /v2/gen-ai/models/routers/{uuid}": { "protocol": "http", "requestBody": { "content": { "application/json": { "schema": { "description": "Information about updating a model router", "properties": { "description": { "description": "Model router description", "example": "\"My Model Router Description\"", "type": "string", "key$": "description" }, "fallback_models": { "items": { "type": "object" }, "type": "array", "key$": "fallback_models" }, "name": { "description": "Model router name: lowercase, at most 255 characters, only a-z, 0-9, and hyphens", "example": "\"my-model-router\"", "type": "string", "key$": "name" }, "policies": { "description": "Router policies", "items": { "description": "Model router policy", "properties": { "custom_task": { "description": "Task definition embedded in a model router config.", "properties": {}, "type": "object", "x-ref": "#/components/schemas/apiModelRouterTaskDetails" }, "models": { "description": "Models assigned to the task", "example": [], "items": {}, "type": "array" }, "selection_policy": { "description": "Selection policy preference for choosing among assigned models.", "properties": {}, "type": "object", "x-ref": "#/components/schemas/apiModelRouterSelectionPolicy" }, "task_slug": { "description": "Task slug", "example": "\"summarization\"", "type": "string" } }, "type": "object", "x-ref": "#/components/schemas/apiModelRouterTaskPolicy" }, "type": "array", "key$": "policies" }, "regions": { "description": "DEPRECATED: this field does not affect deployment and model routers are always\ndeployed to all regions. Must be omitted or set to [\"all\"].", "example": ["example string"], "items": { "example": "example string", "type": "string" }, "type": "array", "key$": "regions" }, "uuid": { "description": "Model router id", "example": "\"12345678-1234-1234-1234-123456789012\"", "type": "string", "key$": "uuid" } }, "type": "object", "x-ref": "#/components/schemas/apiUpdateModelRouterInputPublic", "index$": 1 } } } }, "parameters": [{ "description": "Model router id", "example": "\"123e4567-e89b-12d3-a456-426614174000\"", "in": "path", "name": "uuid", "required": true, "schema": { "type": "string" }, "index$": 0 }] } }, { strict: LIVE_STRICT, t });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let api_update_model_router_output_ref01_data = Object.values(setup.data.existing.api_update_model_router_output)[0];
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
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/api_update_model_router_output/ApiUpdateModelRouterOutputTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.DigitaloceanSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['api_update_model_router_output01', 'api_update_model_router_output02', 'api_update_model_router_output03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'DIGITALOCEAN_TEST_API_UPDATE_MODEL_ROUTER_OUTPUT_ENTID': idmap,
        'DIGITALOCEAN_TEST_LIVE': 'FALSE',
        'DIGITALOCEAN_TEST_EXPLAIN': 'FALSE',
        'DIGITALOCEAN_APIKEY': '',
    });
    idmap = env['DIGITALOCEAN_TEST_API_UPDATE_MODEL_ROUTER_OUTPUT_ENTID'];
    const live = 'TRUE' === env.DIGITALOCEAN_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['DIGITALOCEAN_TEST_API_UPDATE_MODEL_ROUTER_OUTPUT_ENTID'];
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
//# sourceMappingURL=ApiUpdateModelRouterOutputEntity.test.js.map