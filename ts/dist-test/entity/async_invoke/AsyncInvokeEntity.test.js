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
(0, node_test_1.describe)('AsyncInvokeEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when DIGITALOCEAN_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('DIGITALOCEAN_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.DigitaloceanSDK.test();
        const ent = testsdk.AsyncInvoke();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.DigitaloceanSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.AsyncInvoke().create({ "completed_at": 1, "created_at": "x", "input": "x", "model_id": "x", "request_id": "x", "status": "x" }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.DIGITALOCEAN_TEST_LIVE;
        for (const op of ['create']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'async_invoke.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "completed_at": { "a": true, "fo": "date-time", "h": "Completed At", "n": "completed_at", "r": false, "sh": "The timestamp when the job completed.", "t": "`$STRING`", "key$": "completed_at", "index$": 0 }, "created_at": { "a": true, "fo": "date-time", "h": "Created At", "n": "created_at", "r": true, "sh": "The timestamp when the request was created.", "t": "`$STRING`", "key$": "created_at", "index$": 1 }, "error": { "a": true, "h": "Error", "n": "error", "r": false, "sh": "Error message if the job failed.", "t": "`$STRING`", "key$": "error", "index$": 2 }, "input": { "a": true, "h": "Input", "n": "input", "r": true, "sh": "The input parameters for the model invocation.", "t": "`$OBJECT`", "key$": "input", "index$": 3 }, "model_id": { "a": true, "h": "Model Id", "n": "model_id", "r": true, "sh": "The model ID that was invoked.", "t": "`$STRING`", "key$": "model_id", "index$": 4 }, "output": { "a": true, "h": "Output", "n": "output", "r": false, "sh": "The output of the invocation.", "t": "`$OBJECT`", "key$": "output", "index$": 5 }, "request_id": { "a": true, "h": "Request Id", "n": "request_id", "r": true, "sh": "A unique identifier for the async invocation request.", "t": "`$STRING`", "key$": "request_id", "index$": 6 }, "started_at": { "a": true, "fo": "date-time", "h": "Started At", "n": "started_at", "r": false, "sh": "The timestamp when the job started processing.", "t": "`$STRING`", "key$": "started_at", "index$": 7 }, "status": { "a": true, "h": "Status", "n": "status", "r": true, "sh": "The current status of the async invocation.", "t": "`$STRING`", "key$": "status", "index$": 8 }, "tags": { "a": true, "h": "Tags", "n": "tags", "r": false, "sh": "An optional list of key-value tags to attach to the invocation request for tracking or categorization.", "t": "`$ARRAY`", "key$": "tags", "index$": 9 } }, "name": "async_invoke", "op": { "create": { "input": "data", "name": "create", "points": [{ "a": true, "co": { "id": "POST /v1/async-invoke", "source": "openapi3", "version": 2 }, "g": {}, "k": "http", "m": "POST", "o": "/v1/async-invoke", "q": {}, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "v1" }, { "lit": "async-invoke" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "create" } }, "relations": { "ancestors": [] }, "key$": "async_invoke", "name__orig": "async_invoke", "Name": "AsyncInvoke", "name_": "async_invoke", "name-": "async-invoke", "NAME": "ASYNC_INVOKE", "index$": 116 }, { "active": true, "entity": "async_invoke", "key$": "BasicAsyncInvokeFlow", "kind": "basic", "name": "BasicAsyncInvokeFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "async_invoke_ref01" }, "m": {}, "o": "create", "s": [], "v": [], "index$": 0 }] }, 'AsyncInvoke', { "POST /v1/async-invoke": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "description": "Request body for asynchronously invoking a model. Supports image generation, audio generation, and text-to-speech models. The `input` object fields vary depending on the model type.\n", "required": ["model_id", "input"], "properties": { "model_id": { "type": "string", "description": "The ID of the model to invoke asynchronously.\n", "example": "fal-ai/flux/schnell", "key$": "model_id" }, "input": { "type": "object", "description": "The input parameters for the model invocation. Fields vary by model type.\n\nFor **image generation** models (e.g., `fal-ai/flux/schnell`, `fal-ai/fast-sdxl`), use `prompt` along with optional image parameters like `output_format`, `num_inference_steps`, `guidance_scale`, `num_images`, and `enable_safety_checker`.\n\nFor **audio generation** models (e.g., `fal-ai/stable-audio-25/text-to-audio`), use `prompt` along with `seconds_total` to control the duration.\n\nFor **text-to-speech** models (e.g., `fal-ai/elevenlabs/tts/multilingual-v2`), use `text` with the content you want converted to speech.\n", "properties": { "prompt": { "type": "string", "description": "The text prompt describing the desired output. Used for image generation and audio generation models.\n", "example": "A futuristic city at sunset" }, "text": { "type": "string", "description": "The text content to convert to speech. Used for text-to-speech models.\n", "example": "This text-to-speech example uses DigitalOcean multilingual voice." }, "output_format": { "type": "string", "nullable": true, "description": "The desired output format or aspect ratio for image generation.\n", "example": "landscape_4_3" }, "num_inference_steps": { "type": "integer", "minimum": 1, "nullable": true, "description": "The number of inference steps to use during image generation. More steps generally produce higher quality output but take longer.\n", "example": 4 }, "guidance_scale": { "type": "number", "nullable": true, "description": "Controls how closely the image generation model follows the prompt. Higher values produce output more closely matching the prompt.\n", "example": 3.5 }, "num_images": { "type": "integer", "minimum": 1, "nullable": true, "description": "The number of images to generate.", "example": 1 }, "enable_safety_checker": { "type": "boolean", "nullable": true, "description": "Whether to enable the safety checker for generated content.", "example": true }, "seconds_total": { "type": "integer", "minimum": 1, "nullable": true, "description": "The total duration in seconds for generated audio. Used for audio generation models.\n", "example": 60 } }, "additionalProperties": true, "key$": "input" }, "tags": { "type": "array", "nullable": true, "description": "An optional list of key-value tags to attach to the invocation request for tracking or categorization.\n", "items": { "type": "object", "required": ["key", "value"], "properties": { "key": { "type": "string", "description": "The tag key.", "example": "type" }, "value": { "type": "string", "description": "The tag value.", "example": "test" } } }, "key$": "tags" } }, "x-ref": "#/components/schemas/async_invoke_request", "index$": 1 }, "examples": { "Image Generation": { "value": { "model_id": "fal-ai/flux/schnell", "input": { "prompt": "A futuristic city at sunset" } } }, "Generate Audio": { "value": { "model_id": "fal-ai/stable-audio-25/text-to-audio", "input": { "prompt": "Techno song with futuristic sounds", "seconds_total": 60 }, "tags": [{ "key": "type", "value": "test" }] } }, "Text-to-Speech": { "value": { "model_id": "fal-ai/elevenlabs/tts/multilingual-v2", "input": { "text": "This text-to-speech example uses DigitalOcean multilingual voice." }, "tags": [{ "key": "type", "value": "test" }] } } } } } }, "parameters": [] } }, { strict: LIVE_STRICT, t });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const async_invoke_ref01_ent = client.AsyncInvoke();
        let async_invoke_ref01_data = setup.data.new.async_invoke['async_invoke_ref01'];
        async_invoke_ref01_data = (await async_invoke_ref01_ent.create(async_invoke_ref01_data)).data();
        (0, node_assert_1.default)(null != async_invoke_ref01_data);
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
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/async_invoke/AsyncInvokeTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.DigitaloceanSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['async_invoke01', 'async_invoke02', 'async_invoke03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'DIGITALOCEAN_TEST_ASYNC_INVOKE_ENTID': idmap,
        'DIGITALOCEAN_TEST_LIVE': 'FALSE',
        'DIGITALOCEAN_TEST_EXPLAIN': 'FALSE',
        'DIGITALOCEAN_APIKEY': '',
    });
    idmap = env['DIGITALOCEAN_TEST_ASYNC_INVOKE_ENTID'];
    const live = 'TRUE' === env.DIGITALOCEAN_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['DIGITALOCEAN_TEST_ASYNC_INVOKE_ENTID'];
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
//# sourceMappingURL=AsyncInvokeEntity.test.js.map