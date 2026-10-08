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
(0, node_test_1.describe)('BatchEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when DIGITALOCEAN_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('DIGITALOCEAN_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.DigitaloceanSDK.test();
        const ent = testsdk.Batch();
        (0, node_assert_1.default)(null != ent);
    });
    class FailHook extends __1.BaseFeature {
        name = 'failhook';
        version = '0.0.1';
        active = true;
        unexpected = 0;
        init() { }
        PreSpec() { throw new Error('batch hook failed'); }
        PreUnexpected() { this.unexpected++; }
    }
    (0, node_test_1.test)('stream-error', async () => {
        const offline = { net: { offline: true } };
        await node_assert_1.default.rejects(async () => {
            for await (const _item of __1.DigitaloceanSDK.test(offline).Batch().stream('list')) { }
        }, /offline/);
        for await (const _item of __1.DigitaloceanSDK.test(offline).Batch()
            .stream('list', undefined, { ctrl: { throw: false } })) { }
        if (null != __1.config.feature?.rbac) {
            const denied = __1.DigitaloceanSDK.test(undefined, { feature: { rbac: { active: true, deny: true } } });
            await node_assert_1.default.rejects(async () => {
                for await (const _item of denied.Batch().stream('list')) { }
            }, (err) => 'rbac_denied' === err.code);
        }
    });
    (0, node_test_1.test)('stream-ctrl', async () => {
        const explain = {};
        const ctrl = { explain };
        for await (const _item of __1.DigitaloceanSDK.test().Batch().stream('list', undefined, { ctrl })) { }
        node_assert_1.default.deepStrictEqual(Object.keys(ctrl), ['explain']);
        (0, node_assert_1.default)(explain === ctrl.explain && 0 < Object.keys(explain).length);
    });
    (0, node_test_1.test)('unexpected', async () => {
        const hook = new FailHook();
        const client = new __1.DigitaloceanSDK({ feature: { test: { active: true } }, extend: [hook] });
        await node_assert_1.default.rejects(client.Batch().list(), /hook failed/);
        (0, node_assert_1.default)(0 < hook.unexpected);
        const fired = hook.unexpected;
        node_assert_1.default.strictEqual(await client.Batch().list(undefined, { throw: false }), undefined);
        (0, node_assert_1.default)(fired < hook.unexpected);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.DigitaloceanSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.Batch().list({ "after": 1 }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.DIGITALOCEAN_TEST_LIVE;
        for (const op of ['create', 'list', 'load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'batch.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "batch_id": { "a": true, "fo": "uuid", "h": "Batch Id", "n": "batch_id", "r": true, "sh": "Unique identifier for the batch job.", "t": "`$STRING`", "key$": "batch_id", "index$": 0 }, "cancelled_at": { "a": true, "fo": "date-time", "h": "Cancelled At", "n": "cancelled_at", "r": false, "t": "`$STRING`", "key$": "cancelled_at", "index$": 1 }, "completed_at": { "a": true, "fo": "date-time", "h": "Completed At", "n": "completed_at", "r": false, "t": "`$STRING`", "key$": "completed_at", "index$": 2 }, "completion_window": { "a": true, "h": "Completion Window", "n": "completion_window", "r": true, "sh": "Time window in which the job must complete.", "t": "`$STRING`", "key$": "completion_window", "index$": 3 }, "created_at": { "a": true, "fo": "date-time", "h": "Created At", "n": "created_at", "r": true, "t": "`$STRING`", "key$": "created_at", "index$": 4 }, "endpoint": { "a": true, "h": "Endpoint", "n": "endpoint", "r": false, "sh": "Inference endpoint each request is dispatched to.", "t": "`$STRING`", "key$": "endpoint", "index$": 5 }, "error_file_id": { "a": true, "fo": "uuid", "h": "Error File Id", "n": "error_file_id", "r": false, "sh": "Error sidecar file.", "t": "`$STRING`", "key$": "error_file_id", "index$": 6 }, "errors": { "a": true, "h": "Errors", "n": "errors", "r": false, "sh": "Top-level errors that prevented the batch from completing.", "t": "`$ARRAY`", "key$": "errors", "index$": 7 }, "expires_at": { "a": true, "fo": "date-time", "h": "Expires At", "n": "expires_at", "r": false, "sh": "Derived from `created_at` plus `completion_window`.", "t": "`$STRING`", "key$": "expires_at", "index$": 8 }, "failed_at": { "a": true, "fo": "date-time", "h": "Failed At", "n": "failed_at", "r": false, "t": "`$STRING`", "key$": "failed_at", "index$": 9 }, "file_id": { "a": true, "fo": "uuid", "h": "File Id", "n": "file_id", "r": true, "sh": "The `file_id` returned by `POST /v1/batches/files`.", "t": "`$STRING`", "key$": "file_id", "index$": 10 }, "finalizing_at": { "a": true, "fo": "date-time", "h": "Finalizing At", "n": "finalizing_at", "r": false, "t": "`$STRING`", "key$": "finalizing_at", "index$": 11 }, "id": { "a": true, "h": "Id", "n": "id", "r": false, "t": "`$STRING`", "key$": "id", "index$": 12 }, "in_progress_at": { "a": true, "fo": "date-time", "h": "In Progress At", "n": "in_progress_at", "r": false, "t": "`$STRING`", "key$": "in_progress_at", "index$": 13 }, "input_file_id": { "a": true, "fo": "uuid", "h": "Input File Id", "n": "input_file_id", "r": true, "sh": "The uploaded JSONL input file.", "t": "`$STRING`", "key$": "input_file_id", "index$": 14 }, "metadata": { "a": true, "h": "Metadata", "n": "metadata", "r": false, "sh": "Metadata attached at creation.", "t": "`$OBJECT`", "key$": "metadata", "index$": 15 }, "output_file_id": { "a": true, "fo": "uuid", "h": "Output File Id", "n": "output_file_id", "r": false, "sh": "Output JSONL file.", "t": "`$STRING`", "key$": "output_file_id", "index$": 16 }, "provider": { "a": true, "h": "Provider", "n": "provider", "r": true, "sh": "The inference provider whose JSONL schema the input file conforms to.", "t": "`$STRING`", "key$": "provider", "index$": 17 }, "request_counts": { "a": true, "h": "Request Counts", "n": "request_counts", "r": false, "sh": "Aggregate request counts.", "t": "`$OBJECT`", "key$": "request_counts", "index$": 18 }, "request_id": { "a": true, "h": "Request Id", "n": "request_id", "op": { "create": { "req": true, "type": "`$STRING`" } }, "r": false, "sh": "The idempotency key supplied at creation.", "t": "`$STRING`", "key$": "request_id", "index$": 19 }, "status": { "a": true, "h": "Status", "n": "status", "r": true, "sh": "Lifecycle status.", "t": "`$STRING`", "key$": "status", "index$": 20 } }, "id": { "field": "id", "name": "id" }, "name": "batch", "op": { "create": { "input": "data", "name": "create", "points": [{ "a": true, "co": { "id": "POST /v1/batches/{batch_id}/cancel", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "ex": "0e9d1d35-3d1e-4d66-9a2f-8c7e0f6b3e21", "k": "param", "n": "id", "or": "batch_id", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "POST", "o": "/v1/batches/{batch_id}/cancel", "q": { "$action": "cancel", "exist": ["id"] }, "r": { "param": { "batch_id": "id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "v1" }, { "lit": "batches" }, { "var": "id" }, { "lit": "cancel" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }, { "a": true, "co": { "id": "POST /v1/batches", "source": "openapi3", "version": 2 }, "g": {}, "k": "http", "m": "POST", "o": "/v1/batches", "q": {}, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "v1" }, { "lit": "batches" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 1 }], "key$": "create" }, "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /v1/batches", "source": "openapi3", "version": 2 }, "g": { "query": [{ "a": true, "ex": "7b2e9c1a-6f4d-4d9b-a0f1-5c4b7e2f8a12", "k": "query", "n": "after", "or": "after", "r": false, "t": "`$STRING`", "index$": 0 }, { "a": true, "ex": 20, "k": "query", "n": "limit", "or": "limit", "r": false, "t": "`$INTEGER`", "index$": 1 }, { "a": true, "ex": "in_progress", "k": "query", "n": "status", "or": "status", "r": false, "t": "`$STRING`", "index$": 2 }] }, "k": "http", "m": "GET", "o": "/v1/batches", "q": {}, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "v1" }, { "lit": "batches" }], "t": { "req": "`reqdata`", "res": "`body.data`" }, "index$": 0 }], "key$": "list" }, "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /v1/batches/{batch_id}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "ex": "0e9d1d35-3d1e-4d66-9a2f-8c7e0f6b3e21", "k": "param", "n": "id", "or": "batch_id", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/v1/batches/{batch_id}", "q": { "exist": ["id"] }, "r": { "param": { "batch_id": "id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "v1" }, { "lit": "batches" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "load" } }, "relations": { "ancestors": [] }, "key$": "batch", "name__orig": "batch", "Name": "Batch", "name_": "batch", "name-": "batch", "NAME": "BATCH", "index$": 120 }, { "active": true, "entity": "batch", "key$": "BasicBatchFlow", "kind": "basic", "name": "BasicBatchFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "batch_ref01" }, "m": {}, "o": "create", "s": [], "v": [], "index$": 0 }, { "a": true, "d": {}, "i": {}, "m": {}, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "batch_ref01" } }], "index$": 1 }, { "a": true, "d": {}, "i": { "ref": "batch_ref01", "srcdatavar": "batch_ref01_data", "suffix": "_dt0" }, "m": { "id": "batch01" }, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-batch_ref01" } }], "index$": 2 }] }, 'Batch', { "POST /v1/batches/{batch_id}/cancel": { "protocol": "http", "parameters": [{ "in": "path", "name": "batch_id", "description": "The batch job identifier.", "required": true, "schema": { "type": "string", "format": "uuid" }, "example": "0e9d1d35-3d1e-4d66-9a2f-8c7e0f6b3e21", "index$": 0 }] }, "POST /v1/batches": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "description": "Request body for creating a batch inference job.\n\nWhen `provider` is `openai`, `endpoint` is required and must be one of `/v1/responses` or `/v1/chat/completions`. When `provider` is `anthropic`, `endpoint` must be omitted — the Anthropic Message Batches API does not need a per-job endpoint.\n", "required": ["file_id", "provider", "completion_window", "request_id"], "properties": { "file_id": { "type": "string", "format": "uuid", "description": "The `file_id` returned by `POST /v1/batches/files`.", "example": "a1b2c3d4-e5f6-4789-90ab-cdef12345678", "key$": "file_id" }, "provider": { "type": "string", "description": "The inference provider whose JSONL schema the input file conforms to. `openai` follows the OpenAI Batch API input schema (`custom_id`, `method`, `url`, `body`); `anthropic` follows the Anthropic Message Batches JSONL conventions.\n", "enum": ["openai", "anthropic"], "example": "openai", "key$": "provider" }, "endpoint": { "type": "string", "description": "Inference endpoint each request is dispatched to. **Required when `provider` is `openai` and must match the `url` on every JSONL line. Must be omitted when `provider` is `anthropic`.**\n", "enum": ["/v1/responses", "/v1/chat/completions"], "example": "/v1/chat/completions", "key$": "endpoint" }, "completion_window": { "type": "string", "description": "Time window in which the job must complete. Jobs that do not finish in time transition to `expired`.\n", "enum": ["24h"], "default": "24h", "example": "24h", "key$": "completion_window" }, "request_id": { "type": "string", "description": "Client-supplied idempotency key. Retries with the same value return the existing job instead of creating a duplicate.\n", "example": "c7e3ad1e-20c3-4e47-9bf2-6f2a4d6a2f11", "key$": "request_id" }, "metadata": { "type": "object", "nullable": true, "description": "Optional string-valued metadata to attach to the job.", "additionalProperties": { "type": "string" }, "example": { "team": "ml-eval", "dataset": "prompts_v1" }, "key$": "metadata" } }, "x-ref": "#/components/schemas/batch_create_request", "index$": 1 }, "examples": { "OpenAI Chat Completions": { "value": { "file_id": "a1b2c3d4-e5f6-4789-90ab-cdef12345678", "provider": "openai", "endpoint": "/v1/chat/completions", "completion_window": "24h", "request_id": "c7e3ad1e-20c3-4e47-9bf2-6f2a4d6a2f11" } }, "OpenAI Responses": { "value": { "file_id": "a1b2c3d4-e5f6-4789-90ab-cdef12345678", "provider": "openai", "endpoint": "/v1/responses", "completion_window": "24h", "request_id": "9f7b9d4a-4e6c-4a27-8e35-1b0e4c5a9a12" } }, "Anthropic Messages": { "value": { "file_id": "a1b2c3d4-e5f6-4789-90ab-cdef12345678", "provider": "anthropic", "completion_window": "24h", "request_id": "2f1a7d9e-8c03-4d2c-9b7e-6f8e2b1a4c77", "metadata": { "team": "ml-eval", "dataset": "prompts_v1" } } } } } } }, "parameters": [] }, "GET /v1/batches": { "protocol": "http", "parameters": [{ "in": "query", "name": "after", "description": "Cursor for pagination. Pass the `last_id` value from the previous response to fetch the next page. Omit for the first page.\n", "required": false, "schema": { "type": "string", "format": "uuid" }, "example": "7b2e9c1a-6f4d-4d9b-a0f1-5c4b7e2f8a12", "index$": 0 }, { "in": "query", "name": "limit", "description": "Maximum number of batches to return per page.", "required": false, "schema": { "type": "integer", "minimum": 1, "maximum": 100, "default": 20 }, "example": 20, "index$": 1 }, { "in": "query", "name": "status", "description": "Optional filter restricting results to batches in the given lifecycle state.\n", "required": false, "schema": { "type": "string", "enum": ["validating", "in_progress", "finalizing", "completed", "failed", "expired", "cancelling", "cancelled"] }, "example": "in_progress", "index$": 2 }] }, "GET /v1/batches/{batch_id}": { "protocol": "http", "parameters": [{ "in": "path", "name": "batch_id", "description": "The batch job identifier.", "required": true, "schema": { "type": "string", "format": "uuid" }, "example": "0e9d1d35-3d1e-4d66-9a2f-8c7e0f6b3e21", "index$": 0 }] } }, { strict: LIVE_STRICT, t });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const batch_ref01_ent = client.Batch();
        let batch_ref01_data = setup.data.new.batch['batch_ref01'];
        batch_ref01_data = (await batch_ref01_ent.create(batch_ref01_data)).data();
        (0, node_assert_1.default)(null != batch_ref01_data.id);
        // LIST
        const batch_ref01_match = {};
        const batch_ref01_list = (await batch_ref01_ent.list(batch_ref01_match)).map((e) => e.data());
        (0, node_assert_1.default)(!isempty(select(batch_ref01_list, { id: batch_ref01_data.id })));
        // LOAD
        const batch_ref01_match_dt0 = {};
        batch_ref01_match_dt0.id = batch_ref01_data.id;
        const batch_ref01_data_dt0 = (await batch_ref01_ent.load(batch_ref01_match_dt0)).data();
        (0, node_assert_1.default)(batch_ref01_data_dt0.id === batch_ref01_data.id);
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
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/batch/BatchTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.DigitaloceanSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['batch01', 'batch02', 'batch03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'DIGITALOCEAN_TEST_BATCH_ENTID': idmap,
        'DIGITALOCEAN_TEST_LIVE': 'FALSE',
        'DIGITALOCEAN_TEST_EXPLAIN': 'FALSE',
        'DIGITALOCEAN_APIKEY': '',
    });
    idmap = env['DIGITALOCEAN_TEST_BATCH_ENTID'];
    const live = 'TRUE' === env.DIGITALOCEAN_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['DIGITALOCEAN_TEST_BATCH_ENTID'];
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
//# sourceMappingURL=BatchEntity.test.js.map