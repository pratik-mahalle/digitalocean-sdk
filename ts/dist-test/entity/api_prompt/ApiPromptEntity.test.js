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
(0, node_test_1.describe)('ApiPromptEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when DIGITALOCEAN_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('DIGITALOCEAN_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.DigitaloceanSDK.test();
        const ent = testsdk.ApiPrompt();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.DigitaloceanSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.ApiPrompt().load({ "evaluation_run_id": 1, "prompt_id": 1 }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.DIGITALOCEAN_TEST_LIVE;
        for (const op of []) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'api_prompt.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "evaluation_trace_spans": { "a": true, "h": "Evaluation Trace Spans", "n": "evaluation_trace_spans", "r": false, "sh": "The evaluated trace spans.", "t": "`$ARRAY`", "key$": "evaluation_trace_spans", "index$": 0 }, "ground_truth": { "a": true, "h": "Ground Truth", "n": "ground_truth", "r": false, "sh": "The ground truth for the prompt.", "t": "`$STRING`", "key$": "ground_truth", "index$": 1 }, "input": { "a": true, "h": "Input", "n": "input", "r": false, "t": "`$STRING`", "key$": "input", "index$": 2 }, "input_tokens": { "a": true, "fo": "uint64", "h": "Input Tokens", "n": "input_tokens", "r": false, "sh": "The number of input tokens used in the prompt.", "t": "`$STRING`", "key$": "input_tokens", "index$": 3 }, "output": { "a": true, "h": "Output", "n": "output", "r": false, "t": "`$STRING`", "key$": "output", "index$": 4 }, "output_tokens": { "a": true, "fo": "uint64", "h": "Output Tokens", "n": "output_tokens", "r": false, "sh": "The number of output tokens used in the prompt.", "t": "`$STRING`", "key$": "output_tokens", "index$": 5 }, "prompt_chunks": { "a": true, "h": "Prompt Chunks", "n": "prompt_chunks", "r": false, "sh": "The list of prompt chunks.", "t": "`$ARRAY`", "key$": "prompt_chunks", "index$": 6 }, "prompt_id": { "a": true, "fo": "int64", "h": "Prompt Id", "n": "prompt_id", "r": false, "sh": "Prompt ID", "t": "`$INTEGER`", "key$": "prompt_id", "index$": 7 }, "prompt_level_metric_results": { "a": true, "h": "Prompt Level Metric Results", "n": "prompt_level_metric_results", "r": false, "sh": "The metric results for the prompt.", "t": "`$ARRAY`", "key$": "prompt_level_metric_results", "index$": 8 }, "trace_id": { "a": true, "h": "Trace Id", "n": "trace_id", "r": false, "sh": "The trace id for the prompt.", "t": "`$STRING`", "key$": "trace_id", "index$": 9 } }, "name": "api_prompt", "op": { "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /v2/gen-ai/evaluation_runs/{evaluation_run_uuid}/results/{prompt_id}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "ex": "\"123e4567-e89b-12d3-a456-426614174000\"", "k": "param", "n": "evaluation_run_id", "or": "evaluation_run_uuid", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "ex": 1, "k": "param", "n": "prompt_id", "or": "prompt_id", "r": true, "t": "`$INTEGER`", "index$": 1 }] }, "k": "http", "m": "GET", "o": "/v2/gen-ai/evaluation_runs/{evaluation_run_uuid}/results/{prompt_id}", "q": { "exist": ["evaluation_run_id", "prompt_id"] }, "r": { "param": { "evaluation_run_uuid": "evaluation_run_id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "v2" }, { "lit": "gen-ai" }, { "lit": "evaluation_runs" }, { "var": "evaluation_run_id" }, { "lit": "results" }, { "var": "prompt_id" }], "t": { "req": "`reqdata`", "res": "`body.prompt`" }, "index$": 0 }], "key$": "load" } }, "relations": { "ancestors": [] }, "key$": "api_prompt", "name__orig": "api_prompt", "Name": "ApiPrompt", "name_": "api_prompt", "name-": "api-prompt", "NAME": "API_PROMPT", "index$": 79 }, { "active": true, "entity": "api_prompt", "key$": "BasicApiPromptFlow", "kind": "basic", "name": "BasicApiPromptFlow", "param": {}, "step": [{ "a": false, "d": {}, "i": { "ref": "api_prompt_ref01", "srcdatavar": "api_prompt_ref01_data", "suffix": "_dt0" }, "m": { "evaluation_run_id": "evaluation_run01", "id": "api_prompt01" }, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-api_prompt_ref01" } }], "unreachable": true }] }, 'ApiPrompt', { "GET /v2/gen-ai/evaluation_runs/{evaluation_run_uuid}/results/{prompt_id}": { "protocol": "http", "parameters": [{ "description": "Evaluation run UUID.", "example": "\"123e4567-e89b-12d3-a456-426614174000\"", "in": "path", "name": "evaluation_run_uuid", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "description": "Prompt ID to get results for.", "example": 1, "in": "path", "name": "prompt_id", "required": true, "schema": { "type": "integer" }, "index$": 1 }] } }, { strict: LIVE_STRICT, t });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let api_prompt_ref01_data = Object.values(setup.data.existing.api_prompt)[0];
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
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/api_prompt/ApiPromptTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.DigitaloceanSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['api_prompt01', 'api_prompt02', 'api_prompt03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'DIGITALOCEAN_TEST_API_PROMPT_ENTID': idmap,
        'DIGITALOCEAN_TEST_LIVE': 'FALSE',
        'DIGITALOCEAN_TEST_EXPLAIN': 'FALSE',
        'DIGITALOCEAN_APIKEY': '',
    });
    idmap = env['DIGITALOCEAN_TEST_API_PROMPT_ENTID'];
    const live = 'TRUE' === env.DIGITALOCEAN_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['DIGITALOCEAN_TEST_API_PROMPT_ENTID'];
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
//# sourceMappingURL=ApiPromptEntity.test.js.map