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
(0, node_test_1.describe)('DedicatedInferenceEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when DIGITALOCEAN_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('DIGITALOCEAN_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.DigitaloceanSDK.test();
        const ent = testsdk.DedicatedInference();
        (0, node_assert_1.default)(null != ent);
    });
    class FailHook extends __1.BaseFeature {
        name = 'failhook';
        version = '0.0.1';
        active = true;
        unexpected = 0;
        init() { }
        PreSpec() { throw new Error('dedicated_inference hook failed'); }
        PreUnexpected() { this.unexpected++; }
    }
    (0, node_test_1.test)('stream-error', async () => {
        const offline = { net: { offline: true } };
        await node_assert_1.default.rejects(async () => {
            for await (const _item of __1.DigitaloceanSDK.test(offline).DedicatedInference().stream('list')) { }
        }, /offline/);
        for await (const _item of __1.DigitaloceanSDK.test(offline).DedicatedInference()
            .stream('list', undefined, { ctrl: { throw: false } })) { }
        if (null != __1.config.feature?.rbac) {
            const denied = __1.DigitaloceanSDK.test(undefined, { feature: { rbac: { active: true, deny: true } } });
            await node_assert_1.default.rejects(async () => {
                for await (const _item of denied.DedicatedInference().stream('list')) { }
            }, (err) => 'rbac_denied' === err.code);
        }
    });
    (0, node_test_1.test)('stream-ctrl', async () => {
        const explain = {};
        const ctrl = { explain };
        for await (const _item of __1.DigitaloceanSDK.test().DedicatedInference().stream('list', undefined, { ctrl })) { }
        node_assert_1.default.deepStrictEqual(Object.keys(ctrl), ['explain']);
        (0, node_assert_1.default)(explain === ctrl.explain && 0 < Object.keys(explain).length);
    });
    (0, node_test_1.test)('unexpected', async () => {
        const hook = new FailHook();
        const client = new __1.DigitaloceanSDK({ feature: { test: { active: true } }, extend: [hook] });
        await node_assert_1.default.rejects(client.DedicatedInference().list(), /hook failed/);
        (0, node_assert_1.default)(0 < hook.unexpected);
        const fired = hook.unexpected;
        node_assert_1.default.strictEqual(await client.DedicatedInference().list(undefined, { throw: false }), undefined);
        (0, node_assert_1.default)(fired < hook.unexpected);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.DigitaloceanSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.DedicatedInference().list({ "page": "x" }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.DIGITALOCEAN_TEST_LIVE;
        for (const op of ['create', 'list', 'update', 'load', 'remove']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'dedicated_inference.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "access_tokens": { "a": true, "h": "Access Tokens", "n": "access_tokens", "r": false, "sh": "Key-value pairs for provider tokens (e.g.", "t": "`$OBJECT`", "key$": "access_tokens", "index$": 0 }, "created_at": { "a": true, "fo": "date-time", "h": "Created At", "n": "created_at", "r": false, "ro": true, "sh": "When the Dedicated Inference was created.", "t": "`$STRING`", "key$": "created_at", "index$": 1 }, "dedicated_inference": { "a": true, "h": "Dedicated Inference", "n": "dedicated_inference", "r": false, "sh": "A Dedicated Inference instance.", "t": "`$OBJECT`", "key$": "dedicated_inference", "index$": 2 }, "endpoints": { "a": true, "h": "Endpoints", "n": "endpoints", "r": false, "ro": true, "t": "`$OBJECT`", "key$": "endpoints", "index$": 3 }, "id": { "a": true, "fo": "uuid", "h": "Id", "n": "id", "r": false, "ro": true, "sh": "Unique ID of the Dedicated Inference.", "t": "`$STRING`", "key$": "id", "index$": 4 }, "pending_deployment_spec": { "a": true, "h": "Pending Deployment Spec", "n": "pending_deployment_spec", "r": false, "sh": "Pending deployment when status is provisioning or updating.", "t": "`$OBJECT`", "key$": "pending_deployment_spec", "index$": 5 }, "region": { "a": true, "h": "Region", "n": "region", "r": false, "ro": true, "sh": "DigitalOcean region where the Dedicated Inference is hosted.", "t": "`$STRING`", "key$": "region", "index$": 6 }, "spec": { "a": true, "h": "Spec", "n": "spec", "r": true, "sh": "Structured configuration for a Dedicated Inference deployment.", "t": "`$OBJECT`", "key$": "spec", "index$": 7 }, "status": { "a": true, "h": "Status", "n": "status", "r": false, "ro": true, "sh": "Current state of the Dedicated Inference.", "t": "`$STRING`", "key$": "status", "index$": 8 }, "token": { "a": true, "h": "Token", "n": "token", "r": false, "sh": "Access token for authenticating to Dedicated Inference endpoints.", "t": "`$OBJECT`", "key$": "token", "index$": 9 }, "updated_at": { "a": true, "fo": "date-time", "h": "Updated At", "n": "updated_at", "r": false, "ro": true, "sh": "When the Dedicated Inference was last updated.", "t": "`$STRING`", "key$": "updated_at", "index$": 10 }, "vpc_uuid": { "a": true, "fo": "uuid", "h": "Vpc Uuid", "n": "vpc_uuid", "r": false, "ro": true, "sh": "VPC UUID of the Dedicated Inference.", "t": "`$STRING`", "key$": "vpc_uuid", "index$": 11 } }, "id": { "field": "id", "name": "id" }, "name": "dedicated_inference", "op": { "create": { "input": "data", "name": "create", "points": [{ "a": true, "co": { "id": "POST /v2/dedicated-inferences/{dedicated_inference_id}/tokens", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "ex": "6b5c619c-359c-44ca-87e2-47e98170c01d", "k": "param", "n": "id", "or": "dedicated_inference_id", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "POST", "o": "/v2/dedicated-inferences/{dedicated_inference_id}/tokens", "q": { "$action": "token", "exist": ["id"] }, "r": { "param": { "dedicated_inference_id": "id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "v2" }, { "lit": "dedicated-inferences" }, { "var": "id" }, { "lit": "tokens" }], "t": { "req": "`reqdata`", "res": "`body.token`" }, "index$": 0 }, { "a": true, "co": { "id": "POST /v2/dedicated-inferences", "source": "openapi3", "version": 2 }, "g": {}, "k": "http", "m": "POST", "o": "/v2/dedicated-inferences", "q": {}, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "v2" }, { "lit": "dedicated-inferences" }], "t": { "req": "`reqdata`", "res": "`body.dedicated_inference`" }, "index$": 1 }], "key$": "create" }, "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /v2/dedicated-inferences/{dedicated_inference_id}/accelerators", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "ex": "6b5c619c-359c-44ca-87e2-47e98170c01d", "k": "param", "n": "id", "or": "dedicated_inference_id", "r": true, "t": "`$STRING`", "index$": 0 }], "query": [{ "a": true, "ex": 1, "k": "query", "n": "page", "or": "page", "r": false, "t": "`$INTEGER`", "index$": 0 }, { "a": true, "ex": 20, "k": "query", "n": "per_page", "or": "per_page", "r": false, "t": "`$INTEGER`", "index$": 1 }, { "a": true, "ex": "gpu-mi300x1-192gb", "k": "query", "n": "slug", "or": "slug", "r": false, "t": "`$STRING`", "index$": 2 }] }, "k": "http", "m": "GET", "o": "/v2/dedicated-inferences/{dedicated_inference_id}/accelerators", "q": { "$action": "accelerator", "exist": ["id"] }, "r": { "param": { "dedicated_inference_id": "id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "v2" }, { "lit": "dedicated-inferences" }, { "var": "id" }, { "lit": "accelerators" }], "t": { "req": "`reqdata`", "res": "`body.accelerators`" }, "index$": 0 }, { "a": true, "co": { "id": "GET /v2/dedicated-inferences/{dedicated_inference_id}/tokens", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "ex": "6b5c619c-359c-44ca-87e2-47e98170c01d", "k": "param", "n": "id", "or": "dedicated_inference_id", "r": true, "t": "`$STRING`", "index$": 0 }], "query": [{ "a": true, "ex": 1, "k": "query", "n": "page", "or": "page", "r": false, "t": "`$INTEGER`", "index$": 0 }, { "a": true, "ex": 2, "k": "query", "n": "per_page", "or": "per_page", "r": false, "t": "`$INTEGER`", "index$": 1 }] }, "k": "http", "m": "GET", "o": "/v2/dedicated-inferences/{dedicated_inference_id}/tokens", "q": { "$action": "token", "exist": ["id"] }, "r": { "param": { "dedicated_inference_id": "id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "v2" }, { "lit": "dedicated-inferences" }, { "var": "id" }, { "lit": "tokens" }], "t": { "req": "`reqdata`", "res": "`body.tokens`" }, "index$": 1 }, { "a": true, "co": { "id": "GET /v2/dedicated-inferences", "source": "openapi3", "version": 2 }, "g": { "query": [{ "a": true, "ex": 1, "k": "query", "n": "page", "or": "page", "r": false, "t": "`$INTEGER`", "index$": 0 }, { "a": true, "ex": 2, "k": "query", "n": "per_page", "or": "per_page", "r": false, "t": "`$INTEGER`", "index$": 1 }, { "a": true, "ex": "atl1", "k": "query", "n": "region", "or": "region", "r": false, "t": "`$STRING`", "index$": 2 }] }, "k": "http", "m": "GET", "o": "/v2/dedicated-inferences", "q": {}, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "v2" }, { "lit": "dedicated-inferences" }], "t": { "req": "`reqdata`", "res": "`body.dedicated_inferences`" }, "index$": 2 }], "key$": "list" }, "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /v2/dedicated-inferences/{dedicated_inference_id}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "ex": "6b5c619c-359c-44ca-87e2-47e98170c01d", "k": "param", "n": "id", "or": "dedicated_inference_id", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/v2/dedicated-inferences/{dedicated_inference_id}", "q": { "exist": ["id"] }, "r": { "param": { "dedicated_inference_id": "id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "v2" }, { "lit": "dedicated-inferences" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body.dedicated_inference`" }, "index$": 0 }, { "a": true, "co": { "id": "GET /v2/dedicated-inferences/{dedicated_inference_id}/ca", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "ex": "6b5c619c-359c-44ca-87e2-47e98170c01d", "k": "param", "n": "id", "or": "dedicated_inference_id", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/v2/dedicated-inferences/{dedicated_inference_id}/ca", "q": { "$action": "ca", "exist": ["id"] }, "r": { "param": { "dedicated_inference_id": "id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "v2" }, { "lit": "dedicated-inferences" }, { "var": "id" }, { "lit": "ca" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 1 }], "key$": "load" }, "remove": { "input": "data", "name": "remove", "points": [{ "a": true, "co": { "id": "DELETE /v2/dedicated-inferences/{dedicated_inference_id}/tokens/{token_id}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "ex": "6b5c619c-359c-44ca-87e2-47e98170c01d", "k": "param", "n": "id", "or": "dedicated_inference_id", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "ex": "f11d4795-c1db-4ac3-9aa6-a0ea3c58877e", "k": "param", "n": "token_id", "or": "token_id", "r": true, "t": "`$STRING`", "index$": 1 }] }, "k": "http", "m": "DELETE", "o": "/v2/dedicated-inferences/{dedicated_inference_id}/tokens/{token_id}", "q": { "exist": ["id", "token_id"] }, "r": { "param": { "dedicated_inference_id": "id" } }, "s": [{ "lit": "v2" }, { "lit": "dedicated-inferences" }, { "var": "id" }, { "lit": "tokens" }, { "var": "token_id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }, { "a": true, "co": { "id": "DELETE /v2/dedicated-inferences/{dedicated_inference_id}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "ex": "6b5c619c-359c-44ca-87e2-47e98170c01d", "k": "param", "n": "id", "or": "dedicated_inference_id", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "DELETE", "o": "/v2/dedicated-inferences/{dedicated_inference_id}", "q": { "exist": ["id"] }, "r": { "param": { "dedicated_inference_id": "id" } }, "s": [{ "lit": "v2" }, { "lit": "dedicated-inferences" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 1 }], "key$": "remove" }, "update": { "input": "data", "name": "update", "points": [{ "a": true, "co": { "id": "PATCH /v2/dedicated-inferences/{dedicated_inference_id}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "ex": "6b5c619c-359c-44ca-87e2-47e98170c01d", "k": "param", "n": "id", "or": "dedicated_inference_id", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "PATCH", "o": "/v2/dedicated-inferences/{dedicated_inference_id}", "q": { "exist": ["id"] }, "r": { "param": { "dedicated_inference_id": "id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "v2" }, { "lit": "dedicated-inferences" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body.dedicated_inference`" }, "index$": 0 }], "key$": "update" } }, "relations": { "ancestors": [] }, "key$": "dedicated_inference", "name__orig": "dedicated_inference", "Name": "DedicatedInference", "name_": "dedicated_inference", "name-": "dedicated-inference", "NAME": "DEDICATED_INFERENCE", "index$": 138 }, { "active": true, "entity": "dedicated_inference", "key$": "BasicDedicatedInferenceFlow", "kind": "basic", "name": "BasicDedicatedInferenceFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "dedicated_inference_ref01" }, "m": {}, "o": "create", "s": [], "v": [], "index$": 0 }, { "a": true, "d": {}, "i": {}, "m": {}, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "dedicated_inference_ref01" } }], "index$": 1 }, { "a": true, "d": {}, "i": { "ref": "dedicated_inference_ref01", "srcdatavar": "dedicated_inference_ref01_data", "suffix": "_up0" }, "m": {}, "o": "update", "s": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-dedicated_inference_ref01" } }], "v": [], "index$": 2 }, { "a": true, "d": {}, "i": { "ref": "dedicated_inference_ref01", "srcdatavar": "dedicated_inference_ref01_data", "suffix": "_dt0" }, "m": { "id": "dedicated_inference01" }, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-dedicated_inference_ref01" } }], "index$": 3 }, { "a": true, "d": {}, "i": { "ref": "dedicated_inference_ref01", "suffix": "_rm0" }, "m": { "id": "dedicated_inference01" }, "o": "remove", "s": [], "v": [], "index$": 4 }, { "a": true, "d": {}, "i": { "suffix": "_rt0" }, "m": {}, "o": "list", "s": [], "v": [{ "apply": "ItemNotExists", "def": { "ref": "dedicated_inference_ref01" } }], "index$": 5 }] }, 'DedicatedInference', { "POST /v2/dedicated-inferences/{dedicated_inference_id}/tokens": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "required": ["name"], "properties": { "name": { "type": "string", "maxLength": 255, "pattern": "^[a-zA-Z0-9_-]+$", "example": "new-inference-token", "description": "Name for the new token." } }, "x-ref": "#/components/schemas/dedicated_inference_token_create_request" } } } }, "parameters": [{ "name": "dedicated_inference_id", "in": "path", "required": true, "description": "A unique identifier for a Dedicated Inference instance.", "schema": { "type": "string", "format": "uuid" }, "example": "6b5c619c-359c-44ca-87e2-47e98170c01d", "x-ref": "#/components/parameters/dedicated_inference_id", "index$": 0 }] }, "POST /v2/dedicated-inferences": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "required": ["spec"], "properties": { "spec": { "type": "object", "description": "Structured configuration for a Dedicated Inference deployment.", "required": ["version", "name", "region", "vpc", "enable_public_endpoint", "model_deployments"], "properties": { "version": { "type": "integer", "example": 1, "description": "Spec version." }, "name": { "type": "string", "maxLength": 255, "pattern": "^[a-zA-Z0-9_-]+$", "example": "new-dedicated-inference", "description": "Name of the Dedicated Inference. Must be unique within the team." }, "region": { "type": "string", "enum": ["atl1", "nyc2", "tor1"], "example": "atl1", "description": "DigitalOcean region where the Dedicated Inference is hosted." }, "vpc": { "type": "object", "required": ["uuid"], "properties": { "uuid": {} } }, "enable_public_endpoint": { "type": "boolean", "description": "Whether to expose a public LLM endpoint." }, "model_deployments": { "type": "array", "minItems": 1, "items": { "type": "object", "description": "Configuration for a single model deployment.", "properties": {}, "x-ref": "#/components/schemas/model_deployment_spec" }, "description": "At least one model deployment is required." } }, "x-ref": "#/components/schemas/dedicated_inference_spec", "key$": "spec" }, "access_tokens": { "type": "object", "additionalProperties": { "type": "string" }, "example": { "hugging_face_token": "$HF_TOKEN" }, "description": "Key-value pairs for provider tokens (e.g. Hugging Face).", "key$": "access_tokens" } }, "x-ref": "#/components/schemas/dedicated_inference_create_request", "index$": 1 } } } }, "parameters": [] }, "GET /v2/dedicated-inferences/{dedicated_inference_id}/accelerators": { "protocol": "http", "parameters": [{ "name": "dedicated_inference_id", "in": "path", "required": true, "description": "A unique identifier for a Dedicated Inference instance.", "schema": { "type": "string", "format": "uuid" }, "example": "6b5c619c-359c-44ca-87e2-47e98170c01d", "index$": 0 }, { "name": "per_page", "in": "query", "required": false, "description": "Number of items returned per page", "schema": { "type": "integer", "minimum": 1, "default": 20, "maximum": 200 }, "example": 20, "index$": 1 }, { "name": "page", "in": "query", "required": false, "description": "Which 'page' of paginated results to return.", "schema": { "type": "integer", "minimum": 1, "default": 1 }, "example": 1, "index$": 2 }, { "name": "slug", "in": "query", "required": false, "description": "Filter accelerators by GPU slug.", "schema": { "type": "string" }, "example": "gpu-mi300x1-192gb", "index$": 3 }] }, "GET /v2/dedicated-inferences/{dedicated_inference_id}/tokens": { "protocol": "http", "parameters": [{ "name": "dedicated_inference_id", "in": "path", "required": true, "description": "A unique identifier for a Dedicated Inference instance.", "schema": { "type": "string", "format": "uuid" }, "example": "6b5c619c-359c-44ca-87e2-47e98170c01d", "x-ref": "#/components/parameters/dedicated_inference_id", "index$": 0 }, { "in": "query", "name": "per_page", "required": false, "description": "Number of items returned per page", "schema": { "type": "integer", "minimum": 1, "default": 20, "maximum": 200 }, "example": 2, "x-ref": "#/components/parameters/parameters_per_page", "index$": 1 }, { "in": "query", "name": "page", "required": false, "description": "Which 'page' of paginated results to return.", "schema": { "type": "integer", "minimum": 1, "default": 1 }, "example": 1, "x-ref": "#/components/parameters/page", "index$": 2 }] }, "GET /v2/dedicated-inferences": { "protocol": "http", "parameters": [{ "in": "query", "name": "per_page", "required": false, "description": "Number of items returned per page", "schema": { "type": "integer", "minimum": 1, "default": 20, "maximum": 200 }, "example": 2, "x-ref": "#/components/parameters/parameters_per_page", "index$": 0 }, { "in": "query", "name": "page", "required": false, "description": "Which 'page' of paginated results to return.", "schema": { "type": "integer", "minimum": 1, "default": 1 }, "example": 1, "x-ref": "#/components/parameters/page", "index$": 1 }, { "name": "region", "in": "query", "required": false, "description": "Filter by region. Dedicated Inference is only available in nyc2, tor1, and atl1.", "schema": { "type": "string", "enum": ["nyc2", "tor1", "atl1"] }, "example": "atl1", "x-ref": "#/components/parameters/region", "index$": 2 }] }, "GET /v2/dedicated-inferences/{dedicated_inference_id}": { "protocol": "http", "parameters": [{ "name": "dedicated_inference_id", "in": "path", "required": true, "description": "A unique identifier for a Dedicated Inference instance.", "schema": { "type": "string", "format": "uuid" }, "example": "6b5c619c-359c-44ca-87e2-47e98170c01d", "x-ref": "#/components/parameters/dedicated_inference_id", "index$": 0 }] }, "GET /v2/dedicated-inferences/{dedicated_inference_id}/ca": { "protocol": "http", "parameters": [{ "name": "dedicated_inference_id", "in": "path", "required": true, "description": "A unique identifier for a Dedicated Inference instance.", "schema": { "type": "string", "format": "uuid" }, "example": "6b5c619c-359c-44ca-87e2-47e98170c01d", "x-ref": "#/components/parameters/dedicated_inference_id", "index$": 0 }] }, "DELETE /v2/dedicated-inferences/{dedicated_inference_id}/tokens/{token_id}": { "protocol": "http", "parameters": [{ "name": "dedicated_inference_id", "in": "path", "required": true, "description": "A unique identifier for a Dedicated Inference instance.", "schema": { "type": "string", "format": "uuid" }, "example": "6b5c619c-359c-44ca-87e2-47e98170c01d", "x-ref": "#/components/parameters/dedicated_inference_id", "index$": 0 }, { "name": "token_id", "in": "path", "required": true, "description": "A unique identifier for a Dedicated Inference access token.", "schema": { "type": "string", "format": "uuid" }, "example": "f11d4795-c1db-4ac3-9aa6-a0ea3c58877e", "x-ref": "#/components/parameters/token_id", "index$": 1 }] }, "DELETE /v2/dedicated-inferences/{dedicated_inference_id}": { "protocol": "http", "parameters": [{ "name": "dedicated_inference_id", "in": "path", "required": true, "description": "A unique identifier for a Dedicated Inference instance.", "schema": { "type": "string", "format": "uuid" }, "example": "6b5c619c-359c-44ca-87e2-47e98170c01d", "x-ref": "#/components/parameters/dedicated_inference_id", "index$": 0 }] }, "PATCH /v2/dedicated-inferences/{dedicated_inference_id}": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "properties": { "spec": { "type": "object", "description": "Structured configuration for a Dedicated Inference deployment.", "required": ["version", "name", "region", "vpc", "enable_public_endpoint", "model_deployments"], "properties": { "version": { "type": "integer", "example": 1, "description": "Spec version." }, "name": { "type": "string", "maxLength": 255, "pattern": "^[a-zA-Z0-9_-]+$", "example": "new-dedicated-inference", "description": "Name of the Dedicated Inference. Must be unique within the team." }, "region": { "type": "string", "enum": ["atl1", "nyc2", "tor1"], "example": "atl1", "description": "DigitalOcean region where the Dedicated Inference is hosted." }, "vpc": { "type": "object", "required": ["uuid"], "properties": { "uuid": {} } }, "enable_public_endpoint": { "type": "boolean", "description": "Whether to expose a public LLM endpoint." }, "model_deployments": { "type": "array", "minItems": 1, "items": { "type": "object", "description": "Configuration for a single model deployment.", "properties": {}, "x-ref": "#/components/schemas/model_deployment_spec" }, "description": "At least one model deployment is required." } }, "x-ref": "#/components/schemas/dedicated_inference_spec", "key$": "spec" }, "access_tokens": { "type": "object", "description": "Provider tokens for model access (e.g. gated Hugging Face models).", "properties": { "hugging_face_token": { "type": "string", "example": "$HF_TOKEN", "description": "Hugging Face token required for gated models." } }, "additionalProperties": false, "key$": "access_tokens" } }, "x-ref": "#/components/schemas/dedicated_inference_update_request", "index$": 1 } } } }, "parameters": [{ "name": "dedicated_inference_id", "in": "path", "required": true, "description": "A unique identifier for a Dedicated Inference instance.", "schema": { "type": "string", "format": "uuid" }, "example": "6b5c619c-359c-44ca-87e2-47e98170c01d", "x-ref": "#/components/parameters/dedicated_inference_id", "index$": 0 }] } }, { strict: LIVE_STRICT, t });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const dedicated_inference_ref01_ent = client.DedicatedInference();
        let dedicated_inference_ref01_data = setup.data.new.dedicated_inference['dedicated_inference_ref01'];
        dedicated_inference_ref01_data = (await dedicated_inference_ref01_ent.create(dedicated_inference_ref01_data)).data();
        (0, node_assert_1.default)(null != dedicated_inference_ref01_data.id);
        // LIST
        const dedicated_inference_ref01_match = {};
        const dedicated_inference_ref01_list = (await dedicated_inference_ref01_ent.list(dedicated_inference_ref01_match)).map((e) => e.data());
        (0, node_assert_1.default)(!isempty(select(dedicated_inference_ref01_list, { id: dedicated_inference_ref01_data.id })));
        // UPDATE
        const dedicated_inference_ref01_data_up0 = {};
        dedicated_inference_ref01_data_up0.id = dedicated_inference_ref01_data.id;
        const dedicated_inference_ref01_resdata_up0 = (await dedicated_inference_ref01_ent.update(dedicated_inference_ref01_data_up0)).data();
        (0, node_assert_1.default)(dedicated_inference_ref01_resdata_up0.id === dedicated_inference_ref01_data_up0.id);
        // LOAD
        const dedicated_inference_ref01_match_dt0 = {};
        dedicated_inference_ref01_match_dt0.id = dedicated_inference_ref01_data.id;
        const dedicated_inference_ref01_data_dt0 = (await dedicated_inference_ref01_ent.load(dedicated_inference_ref01_match_dt0)).data();
        (0, node_assert_1.default)(dedicated_inference_ref01_data_dt0.id === dedicated_inference_ref01_data.id);
        // REMOVE
        const dedicated_inference_ref01_match_rm0 = { id: dedicated_inference_ref01_data.id };
        await dedicated_inference_ref01_ent.remove(dedicated_inference_ref01_match_rm0);
        // LIST
        const dedicated_inference_ref01_match_rt0 = {};
        const dedicated_inference_ref01_list_rt0 = (await dedicated_inference_ref01_ent.list(dedicated_inference_ref01_match_rt0)).map((e) => e.data());
        (0, node_assert_1.default)(isempty(select(dedicated_inference_ref01_list_rt0, { id: dedicated_inference_ref01_data.id })));
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
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/dedicated_inference/DedicatedInferenceTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.DigitaloceanSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['dedicated_inference01', 'dedicated_inference02', 'dedicated_inference03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'DIGITALOCEAN_TEST_DEDICATED_INFERENCE_ENTID': idmap,
        'DIGITALOCEAN_TEST_LIVE': 'FALSE',
        'DIGITALOCEAN_TEST_EXPLAIN': 'FALSE',
        'DIGITALOCEAN_APIKEY': '',
    });
    idmap = env['DIGITALOCEAN_TEST_DEDICATED_INFERENCE_ENTID'];
    const live = 'TRUE' === env.DIGITALOCEAN_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['DIGITALOCEAN_TEST_DEDICATED_INFERENCE_ENTID'];
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
//# sourceMappingURL=DedicatedInferenceEntity.test.js.map