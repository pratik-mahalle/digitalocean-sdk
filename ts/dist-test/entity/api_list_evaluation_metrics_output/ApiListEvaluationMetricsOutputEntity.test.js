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
(0, node_test_1.describe)('ApiListEvaluationMetricsOutputEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when DIGITALOCEAN_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('DIGITALOCEAN_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.DigitaloceanSDK.test();
        const ent = testsdk.ApiListEvaluationMetricsOutput();
        (0, node_assert_1.default)(null != ent);
    });
    class FailHook extends __1.BaseFeature {
        name = 'failhook';
        version = '0.0.1';
        active = true;
        unexpected = 0;
        init() { }
        PreSpec() { throw new Error('api_list_evaluation_metrics_output hook failed'); }
        PreUnexpected() { this.unexpected++; }
    }
    (0, node_test_1.test)('stream-error', async () => {
        const offline = { net: { offline: true } };
        await node_assert_1.default.rejects(async () => {
            for await (const _item of __1.DigitaloceanSDK.test(offline).ApiListEvaluationMetricsOutput().stream('list')) { }
        }, /offline/);
        for await (const _item of __1.DigitaloceanSDK.test(offline).ApiListEvaluationMetricsOutput()
            .stream('list', undefined, { ctrl: { throw: false } })) { }
        if (null != __1.config.feature?.rbac) {
            const denied = __1.DigitaloceanSDK.test(undefined, { feature: { rbac: { active: true, deny: true } } });
            await node_assert_1.default.rejects(async () => {
                for await (const _item of denied.ApiListEvaluationMetricsOutput().stream('list')) { }
            }, (err) => 'rbac_denied' === err.code);
        }
    });
    (0, node_test_1.test)('stream-ctrl', async () => {
        const explain = {};
        const ctrl = { explain };
        for await (const _item of __1.DigitaloceanSDK.test().ApiListEvaluationMetricsOutput().stream('list', undefined, { ctrl })) { }
        node_assert_1.default.deepStrictEqual(Object.keys(ctrl), ['explain']);
        (0, node_assert_1.default)(explain === ctrl.explain && 0 < Object.keys(explain).length);
    });
    (0, node_test_1.test)('unexpected', async () => {
        const hook = new FailHook();
        const client = new __1.DigitaloceanSDK({ feature: { test: { active: true } }, extend: [hook] });
        await node_assert_1.default.rejects(client.ApiListEvaluationMetricsOutput().list(), /hook failed/);
        (0, node_assert_1.default)(0 < hook.unexpected);
        const fired = hook.unexpected;
        node_assert_1.default.strictEqual(await client.ApiListEvaluationMetricsOutput().list(undefined, { throw: false }), undefined);
        (0, node_assert_1.default)(fired < hook.unexpected);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.DigitaloceanSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.ApiListEvaluationMetricsOutput().list({ "category": 1 }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.DIGITALOCEAN_TEST_LIVE;
        for (const op of ['list']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'api_list_evaluation_metrics_output.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "associated_presets": { "a": true, "h": "Associated Presets", "n": "associated_presets", "r": false, "sh": "Saved model evaluation presets that reference this metric.", "t": "`$ARRAY`", "key$": "associated_presets", "index$": 0 }, "category": { "a": true, "h": "Category", "n": "category", "r": false, "t": "`$STRING`", "key$": "category", "index$": 1 }, "custom_eval_config": { "a": true, "h": "Custom Eval Config", "n": "custom_eval_config", "r": false, "sh": "Configuration for a custom model-evaluation metric scored by an LLM judge.", "t": "`$OBJECT`", "key$": "custom_eval_config", "index$": 2 }, "description": { "a": true, "h": "Description", "n": "description", "r": false, "t": "`$STRING`", "key$": "description", "index$": 3 }, "evaluation_scope": { "a": true, "h": "Evaluation Scope", "n": "evaluation_scope", "r": false, "sh": "Scope that determines whether a metric belongs to agent evaluation or model evaluation.", "t": "`$STRING`", "key$": "evaluation_scope", "index$": 4 }, "inverted": { "a": true, "h": "Inverted", "n": "inverted", "r": false, "sh": "If true, the metric is inverted, meaning that a lower value is better.", "t": "`$BOOLEAN`", "key$": "inverted", "index$": 5 }, "is_metric_goal": { "a": true, "h": "Is Metric Goal", "n": "is_metric_goal", "r": false, "t": "`$BOOLEAN`", "key$": "is_metric_goal", "index$": 6 }, "metric_name": { "a": true, "h": "Metric Name", "n": "metric_name", "r": false, "t": "`$STRING`", "key$": "metric_name", "index$": 7 }, "metric_rank": { "a": true, "fo": "int64", "h": "Metric Rank", "n": "metric_rank", "r": false, "t": "`$INTEGER`", "key$": "metric_rank", "index$": 8 }, "metric_type": { "a": true, "h": "Metric Type", "n": "metric_type", "r": false, "t": "`$STRING`", "key$": "metric_type", "index$": 9 }, "metric_uuid": { "a": true, "h": "Metric Uuid", "n": "metric_uuid", "r": false, "t": "`$STRING`", "key$": "metric_uuid", "index$": 10 }, "metric_value_type": { "a": true, "h": "Metric Value Type", "n": "metric_value_type", "r": false, "t": "`$STRING`", "key$": "metric_value_type", "index$": 11 }, "range_max": { "a": true, "fo": "float", "h": "Range Max", "n": "range_max", "r": false, "sh": "The maximum value for the metric.", "t": "`$NUMBER`", "key$": "range_max", "index$": 12 }, "range_min": { "a": true, "fo": "float", "h": "Range Min", "n": "range_min", "r": false, "sh": "The minimum value for the metric.", "t": "`$NUMBER`", "key$": "range_min", "index$": 13 }, "source": { "a": true, "h": "Source", "n": "source", "r": false, "sh": "Distinguishes platform catalog metrics from user-defined LLM-as-judge metrics.", "t": "`$STRING`", "key$": "source", "index$": 14 } }, "name": "api_list_evaluation_metrics_output", "op": { "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /v2/gen-ai/evaluation_metrics", "source": "openapi3", "version": 2 }, "g": {}, "k": "http", "m": "GET", "o": "/v2/gen-ai/evaluation_metrics", "q": {}, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "v2" }, { "lit": "gen-ai" }, { "lit": "evaluation_metrics" }], "t": { "req": "`reqdata`", "res": "`body.metrics`" }, "index$": 0 }], "key$": "list" } }, "relations": { "ancestors": [] }, "key$": "api_list_evaluation_metrics_output", "name__orig": "api_list_evaluation_metrics_output", "Name": "ApiListEvaluationMetricsOutput", "name_": "api_list_evaluation_metrics_output", "name-": "api-list-evaluation-metrics-output", "NAME": "API_LIST_EVALUATION_METRICS_OUTPUT", "index$": 64 }, { "active": true, "entity": "api_list_evaluation_metrics_output", "key$": "BasicApiListEvaluationMetricsOutputFlow", "kind": "basic", "name": "BasicApiListEvaluationMetricsOutputFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": {}, "m": {}, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "api_list_evaluation_metrics_output_ref01" } }], "index$": 0 }] }, 'ApiListEvaluationMetricsOutput', { "GET /v2/gen-ai/evaluation_metrics": { "protocol": "http", "parameters": [] } }, { strict: LIVE_STRICT, t });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let api_list_evaluation_metrics_output_ref01_data = Object.values(setup.data.existing.api_list_evaluation_metrics_output)[0];
        // LIST
        const api_list_evaluation_metrics_output_ref01_ent = client.ApiListEvaluationMetricsOutput();
        const api_list_evaluation_metrics_output_ref01_match = {};
        const api_list_evaluation_metrics_output_ref01_list = (await api_list_evaluation_metrics_output_ref01_ent.list(api_list_evaluation_metrics_output_ref01_match)).map((e) => e.data());
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
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/api_list_evaluation_metrics_output/ApiListEvaluationMetricsOutputTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.DigitaloceanSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['api_list_evaluation_metrics_output01', 'api_list_evaluation_metrics_output02', 'api_list_evaluation_metrics_output03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'DIGITALOCEAN_TEST_API_LIST_EVALUATION_METRICS_OUTPUT_ENTID': idmap,
        'DIGITALOCEAN_TEST_LIVE': 'FALSE',
        'DIGITALOCEAN_TEST_EXPLAIN': 'FALSE',
        'DIGITALOCEAN_APIKEY': '',
    });
    idmap = env['DIGITALOCEAN_TEST_API_LIST_EVALUATION_METRICS_OUTPUT_ENTID'];
    const live = 'TRUE' === env.DIGITALOCEAN_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['DIGITALOCEAN_TEST_API_LIST_EVALUATION_METRICS_OUTPUT_ENTID'];
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
//# sourceMappingURL=ApiListEvaluationMetricsOutputEntity.test.js.map