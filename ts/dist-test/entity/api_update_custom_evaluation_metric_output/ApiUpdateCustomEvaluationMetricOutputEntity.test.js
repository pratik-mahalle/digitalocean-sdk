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
(0, node_test_1.describe)('ApiUpdateCustomEvaluationMetricOutputEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when DIGITALOCEAN_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('DIGITALOCEAN_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.DigitaloceanSDK.test();
        const ent = testsdk.ApiUpdateCustomEvaluationMetricOutput();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.DigitaloceanSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.ApiUpdateCustomEvaluationMetricOutput().create({ "category": 1 }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.DIGITALOCEAN_TEST_LIVE;
        for (const op of ['create', 'update']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'api_update_custom_evaluation_metric_output.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "associated_presets": { "a": true, "h": "Associated Presets", "n": "associated_presets", "r": false, "sh": "Saved model evaluation presets that reference this metric.", "t": "`$ARRAY`", "key$": "associated_presets", "index$": 0 }, "category": { "a": true, "h": "Category", "n": "category", "r": false, "t": "`$STRING`", "key$": "category", "index$": 1 }, "config": { "a": true, "h": "Config", "n": "config", "r": false, "sh": "Configuration for a custom model-evaluation metric scored by an LLM judge.", "t": "`$OBJECT`", "key$": "config", "index$": 2 }, "custom_eval_config": { "a": true, "h": "Custom Eval Config", "n": "custom_eval_config", "r": false, "sh": "Configuration for a custom model-evaluation metric scored by an LLM judge.", "t": "`$OBJECT`", "key$": "custom_eval_config", "index$": 3 }, "description": { "a": true, "h": "Description", "n": "description", "r": false, "t": "`$STRING`", "key$": "description", "index$": 4 }, "evaluation_scope": { "a": true, "h": "Evaluation Scope", "n": "evaluation_scope", "r": false, "sh": "Scope that determines whether a metric belongs to agent evaluation or model evaluation.", "t": "`$STRING`", "key$": "evaluation_scope", "index$": 5 }, "inverted": { "a": true, "h": "Inverted", "n": "inverted", "r": false, "sh": "If true, the metric is inverted, meaning that a lower value is better.", "t": "`$BOOLEAN`", "key$": "inverted", "index$": 6 }, "is_metric_goal": { "a": true, "h": "Is Metric Goal", "n": "is_metric_goal", "r": false, "t": "`$BOOLEAN`", "key$": "is_metric_goal", "index$": 7 }, "metric_name": { "a": true, "h": "Metric Name", "n": "metric_name", "r": false, "t": "`$STRING`", "key$": "metric_name", "index$": 8 }, "metric_rank": { "a": true, "fo": "int64", "h": "Metric Rank", "n": "metric_rank", "r": false, "t": "`$INTEGER`", "key$": "metric_rank", "index$": 9 }, "metric_type": { "a": true, "h": "Metric Type", "n": "metric_type", "r": false, "t": "`$STRING`", "key$": "metric_type", "index$": 10 }, "metric_uuid": { "a": true, "h": "Metric Uuid", "n": "metric_uuid", "r": false, "t": "`$STRING`", "key$": "metric_uuid", "index$": 11 }, "metric_value_type": { "a": true, "h": "Metric Value Type", "n": "metric_value_type", "r": false, "t": "`$STRING`", "key$": "metric_value_type", "index$": 12 }, "range_max": { "a": true, "fo": "float", "h": "Range Max", "n": "range_max", "r": false, "sh": "The maximum value for the metric.", "t": "`$NUMBER`", "key$": "range_max", "index$": 13 }, "range_min": { "a": true, "fo": "float", "h": "Range Min", "n": "range_min", "r": false, "sh": "The minimum value for the metric.", "t": "`$NUMBER`", "key$": "range_min", "index$": 14 }, "source": { "a": true, "h": "Source", "n": "source", "r": false, "sh": "Distinguishes platform catalog metrics from user-defined LLM-as-judge metrics.", "t": "`$STRING`", "key$": "source", "index$": 15 } }, "name": "api_update_custom_evaluation_metric_output", "op": { "create": { "input": "data", "name": "create", "points": [{ "a": true, "co": { "id": "POST /v2/gen-ai/custom_evaluation_metrics", "source": "openapi3", "version": 2 }, "g": {}, "k": "http", "m": "POST", "o": "/v2/gen-ai/custom_evaluation_metrics", "q": {}, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "v2" }, { "lit": "gen-ai" }, { "lit": "custom_evaluation_metrics" }], "t": { "req": "`reqdata`", "res": "`body.metric`" }, "index$": 0 }], "key$": "create" }, "update": { "input": "data", "name": "update", "points": [{ "a": true, "co": { "id": "PUT /v2/gen-ai/custom_evaluation_metrics/{metric_uuid}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "ex": "\"123e4567-e89b-12d3-a456-426614174000\"", "k": "param", "n": "metric_uuid", "or": "metric_uuid", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "PUT", "o": "/v2/gen-ai/custom_evaluation_metrics/{metric_uuid}", "q": { "exist": ["metric_uuid"] }, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "v2" }, { "lit": "gen-ai" }, { "lit": "custom_evaluation_metrics" }, { "var": "metric_uuid" }], "t": { "req": "`reqdata`", "res": "`body.metric`" }, "index$": 0 }], "key$": "update" } }, "relations": { "ancestors": [] }, "key$": "api_update_custom_evaluation_metric_output", "name__orig": "api_update_custom_evaluation_metric_output", "Name": "ApiUpdateCustomEvaluationMetricOutput", "name_": "api_update_custom_evaluation_metric_output", "name-": "api-update-custom-evaluation-metric-output", "NAME": "API_UPDATE_CUSTOM_EVALUATION_METRIC_OUTPUT", "index$": 91 }, { "active": true, "entity": "api_update_custom_evaluation_metric_output", "key$": "BasicApiUpdateCustomEvaluationMetricOutputFlow", "kind": "basic", "name": "BasicApiUpdateCustomEvaluationMetricOutputFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "api_update_custom_evaluation_metric_output_ref01" }, "m": {}, "o": "create", "s": [], "v": [], "index$": 0 }, { "a": true, "d": {}, "i": { "ref": "api_update_custom_evaluation_metric_output_ref01", "srcdatavar": "api_update_custom_evaluation_metric_output_ref01_data", "suffix": "_up0", "textfield": "category" }, "m": {}, "o": "update", "s": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-api_update_custom_evaluation_metric_output_ref01" } }], "v": [], "index$": 1 }] }, 'ApiUpdateCustomEvaluationMetricOutput', { "POST /v2/gen-ai/custom_evaluation_metrics": { "protocol": "http", "requestBody": { "content": { "application/json": { "schema": { "properties": { "config": { "description": "Configuration for a custom model-evaluation metric scored by an LLM judge.\nPrompt and model response are always included in the judge context.", "properties": { "created_at": { "example": "2023-01-01T00:00:00Z", "format": "date-time", "type": "string" }, "deleted_at": { "description": "When set, the custom metric is soft-deleted and must not appear in pickers.", "example": "2023-01-01T00:00:00Z", "format": "date-time", "type": "string" }, "requires_ground_truth": { "description": "When true, each row must provide ground truth and it is included in the judge context.\nWhen false, ground truth is not required and is not sent to the judge.", "example": true, "type": "boolean" }, "scoring_prompt": { "description": "Instructions for the judge model (multi-line).", "example": "example string", "type": "string" }, "updated_at": { "example": "2023-01-01T00:00:00Z", "format": "date-time", "type": "string" } }, "type": "object", "x-ref": "#/components/schemas/apiCustomEvaluationMetricConfig", "key$": "config" }, "description": { "example": "\"Scores adherence to our support macros\"", "type": "string", "key$": "description" }, "metric_name": { "example": "\"My domain tone metric\"", "type": "string", "key$": "metric_name" } }, "type": "object", "x-ref": "#/components/schemas/apiCreateCustomEvaluationMetricInputPublic", "index$": 1 } } } }, "parameters": [] }, "PUT /v2/gen-ai/custom_evaluation_metrics/{metric_uuid}": { "protocol": "http", "requestBody": { "content": { "application/json": { "schema": { "properties": { "config": { "description": "Configuration for a custom model-evaluation metric scored by an LLM judge.\nPrompt and model response are always included in the judge context.", "properties": { "created_at": { "example": "2023-01-01T00:00:00Z", "format": "date-time", "type": "string" }, "deleted_at": { "description": "When set, the custom metric is soft-deleted and must not appear in pickers.", "example": "2023-01-01T00:00:00Z", "format": "date-time", "type": "string" }, "requires_ground_truth": { "description": "When true, each row must provide ground truth and it is included in the judge context.\nWhen false, ground truth is not required and is not sent to the judge.", "example": true, "type": "boolean" }, "scoring_prompt": { "description": "Instructions for the judge model (multi-line).", "example": "example string", "type": "string" }, "updated_at": { "example": "2023-01-01T00:00:00Z", "format": "date-time", "type": "string" } }, "type": "object", "x-ref": "#/components/schemas/apiCustomEvaluationMetricConfig", "key$": "config" }, "description": { "example": "example string", "type": "string", "key$": "description" }, "metric_name": { "example": "\"My domain tone metric\"", "type": "string", "key$": "metric_name" }, "metric_uuid": { "example": "\"12345678-1234-1234-1234-123456789012\"", "type": "string", "key$": "metric_uuid" } }, "type": "object", "x-ref": "#/components/schemas/apiUpdateCustomEvaluationMetricInputPublic", "index$": 1 } } } }, "parameters": [{ "description": "UUID of the custom metric to update.", "example": "\"123e4567-e89b-12d3-a456-426614174000\"", "in": "path", "name": "metric_uuid", "required": true, "schema": { "type": "string" }, "index$": 0 }] } }, { strict: LIVE_STRICT, t });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const api_update_custom_evaluation_metric_output_ref01_ent = client.ApiUpdateCustomEvaluationMetricOutput();
        let api_update_custom_evaluation_metric_output_ref01_data = setup.data.new.api_update_custom_evaluation_metric_output['api_update_custom_evaluation_metric_output_ref01'];
        api_update_custom_evaluation_metric_output_ref01_data = (await api_update_custom_evaluation_metric_output_ref01_ent.create(api_update_custom_evaluation_metric_output_ref01_data)).data();
        (0, node_assert_1.default)(null != api_update_custom_evaluation_metric_output_ref01_data);
        // UPDATE
        const api_update_custom_evaluation_metric_output_ref01_data_up0 = {};
        const api_update_custom_evaluation_metric_output_ref01_markdef_up0 = { name: 'category', value: 'Mark01-api_update_custom_evaluation_metric_output_ref01_' + setup.now };
        api_update_custom_evaluation_metric_output_ref01_data_up0[api_update_custom_evaluation_metric_output_ref01_markdef_up0.name] = api_update_custom_evaluation_metric_output_ref01_markdef_up0.value;
        const api_update_custom_evaluation_metric_output_ref01_resdata_up0 = (await api_update_custom_evaluation_metric_output_ref01_ent.update(api_update_custom_evaluation_metric_output_ref01_data_up0)).data();
        (0, node_assert_1.default)(null != api_update_custom_evaluation_metric_output_ref01_resdata_up0);
        (0, node_assert_1.default)(api_update_custom_evaluation_metric_output_ref01_resdata_up0[api_update_custom_evaluation_metric_output_ref01_markdef_up0.name] === api_update_custom_evaluation_metric_output_ref01_markdef_up0.value);
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
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/api_update_custom_evaluation_metric_output/ApiUpdateCustomEvaluationMetricOutputTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.DigitaloceanSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['api_update_custom_evaluation_metric_output01', 'api_update_custom_evaluation_metric_output02', 'api_update_custom_evaluation_metric_output03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'DIGITALOCEAN_TEST_API_UPDATE_CUSTOM_EVALUATION_METRIC_OUTPUT_ENTID': idmap,
        'DIGITALOCEAN_TEST_LIVE': 'FALSE',
        'DIGITALOCEAN_TEST_EXPLAIN': 'FALSE',
        'DIGITALOCEAN_APIKEY': '',
    });
    idmap = env['DIGITALOCEAN_TEST_API_UPDATE_CUSTOM_EVALUATION_METRIC_OUTPUT_ENTID'];
    const live = 'TRUE' === env.DIGITALOCEAN_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['DIGITALOCEAN_TEST_API_UPDATE_CUSTOM_EVALUATION_METRIC_OUTPUT_ENTID'];
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
//# sourceMappingURL=ApiUpdateCustomEvaluationMetricOutputEntity.test.js.map