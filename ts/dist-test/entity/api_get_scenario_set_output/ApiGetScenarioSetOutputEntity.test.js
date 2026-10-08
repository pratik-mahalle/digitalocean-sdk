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
(0, node_test_1.describe)('ApiGetScenarioSetOutputEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when DIGITALOCEAN_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('DIGITALOCEAN_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.DigitaloceanSDK.test();
        const ent = testsdk.ApiGetScenarioSetOutput();
        (0, node_assert_1.default)(null != ent);
    });
    class FailHook extends __1.BaseFeature {
        name = 'failhook';
        version = '0.0.1';
        active = true;
        unexpected = 0;
        init() { }
        PreSpec() { throw new Error('api_get_scenario_set_output hook failed'); }
        PreUnexpected() { this.unexpected++; }
    }
    (0, node_test_1.test)('stream-error', async () => {
        const offline = { net: { offline: true } };
        await node_assert_1.default.rejects(async () => {
            for await (const _item of __1.DigitaloceanSDK.test(offline).ApiGetScenarioSetOutput().stream('list')) { }
        }, /offline/);
        for await (const _item of __1.DigitaloceanSDK.test(offline).ApiGetScenarioSetOutput()
            .stream('list', undefined, { ctrl: { throw: false } })) { }
        if (null != __1.config.feature?.rbac) {
            const denied = __1.DigitaloceanSDK.test(undefined, { feature: { rbac: { active: true, deny: true } } });
            await node_assert_1.default.rejects(async () => {
                for await (const _item of denied.ApiGetScenarioSetOutput().stream('list')) { }
            }, (err) => 'rbac_denied' === err.code);
        }
    });
    (0, node_test_1.test)('stream-ctrl', async () => {
        const explain = {};
        const ctrl = { explain };
        for await (const _item of __1.DigitaloceanSDK.test().ApiGetScenarioSetOutput().stream('list', undefined, { ctrl })) { }
        node_assert_1.default.deepStrictEqual(Object.keys(ctrl), ['explain']);
        (0, node_assert_1.default)(explain === ctrl.explain && 0 < Object.keys(explain).length);
    });
    (0, node_test_1.test)('unexpected', async () => {
        const hook = new FailHook();
        const client = new __1.DigitaloceanSDK({ feature: { test: { active: true } }, extend: [hook] });
        await node_assert_1.default.rejects(client.ApiGetScenarioSetOutput().list(), /hook failed/);
        (0, node_assert_1.default)(0 < hook.unexpected);
        const fired = hook.unexpected;
        node_assert_1.default.strictEqual(await client.ApiGetScenarioSetOutput().list(undefined, { throw: false }), undefined);
        (0, node_assert_1.default)(fired < hook.unexpected);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.DigitaloceanSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.ApiGetScenarioSetOutput().list({ "page": "x" }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.DIGITALOCEAN_TEST_LIVE;
        for (const op of ['create', 'list', 'load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'api_get_scenario_set_output.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "bucket_name": { "a": true, "h": "Bucket Name", "n": "bucket_name", "r": false, "sh": "Object storage bucket holding the scenario file.", "t": "`$STRING`", "key$": "bucket_name", "index$": 0 }, "bucket_region": { "a": true, "h": "Bucket Region", "n": "bucket_region", "r": false, "sh": "Object storage bucket region.", "t": "`$STRING`", "key$": "bucket_region", "index$": 1 }, "created_at": { "a": true, "fo": "date-time", "h": "Created At", "n": "created_at", "r": false, "sh": "Time created at.", "t": "`$STRING`", "key$": "created_at", "index$": 2 }, "deleted_at": { "a": true, "fo": "date-time", "h": "Deleted At", "n": "deleted_at", "r": false, "sh": "Time deleted at.", "t": "`$STRING`", "key$": "deleted_at", "index$": 3 }, "description": { "a": true, "h": "Description", "n": "description", "r": false, "sh": "Customer-supplied description.", "t": "`$STRING`", "key$": "description", "index$": 4 }, "failure_reason": { "a": true, "h": "Failure Reason", "n": "failure_reason", "r": false, "sh": "Human-readable explanation of a terminal FAILED status.", "t": "`$STRING`", "key$": "failure_reason", "index$": 5 }, "file_upload_scenario_set": { "a": true, "h": "File Upload Scenario Set", "n": "file_upload_scenario_set", "r": false, "sh": "Uploaded scenario file to ingest.", "t": "`$ANY`", "key$": "file_upload_scenario_set", "index$": 6 }, "generator_model_uuid": { "a": true, "h": "Generator Model Uuid", "n": "generator_model_uuid", "r": false, "sh": "Model that produced the scenarios.", "t": "`$STRING`", "key$": "generator_model_uuid", "index$": 7 }, "library_scenario_uuid": { "a": true, "h": "Library Scenario Uuid", "n": "library_scenario_uuid", "r": false, "sh": "UUID of the source library entry.", "t": "`$STRING`", "key$": "library_scenario_uuid", "index$": 8 }, "name": { "a": true, "h": "Name", "n": "name", "r": false, "sh": "Customer-supplied name.", "t": "`$STRING`", "key$": "name", "index$": 9 }, "scenario_count": { "a": true, "fo": "int64", "h": "Scenario Count", "n": "scenario_count", "r": false, "sh": "Number of scenarios in the set.", "t": "`$INTEGER`", "key$": "scenario_count", "index$": 10 }, "scenario_set_uuid": { "a": true, "h": "Scenario Set Uuid", "n": "scenario_set_uuid", "r": false, "sh": "UUID of the scenario set.", "t": "`$STRING`", "key$": "scenario_set_uuid", "index$": 11 }, "scenarios": { "a": true, "h": "Scenarios", "n": "scenarios", "r": false, "sh": "Inline scenarios.", "t": "`$ARRAY`", "key$": "scenarios", "index$": 12 }, "source_export_id": { "a": true, "h": "Source Export Id", "n": "source_export_id", "r": false, "sh": "Signals export UUID that produced this set.", "t": "`$STRING`", "key$": "source_export_id", "index$": 13 }, "source_goal_description": { "a": true, "h": "Source Goal Description", "n": "source_goal_description", "r": false, "sh": "The goal that drove generation.", "t": "`$STRING`", "key$": "source_goal_description", "index$": 14 }, "source_kind": { "a": true, "h": "Source Kind", "n": "source_kind", "r": false, "sh": "How a scenario set was created.", "t": "`$STRING`", "key$": "source_kind", "index$": 15 }, "spaces_key": { "a": true, "h": "Spaces Key", "n": "spaces_key", "r": false, "sh": "Object storage key for the scenario file.", "t": "`$STRING`", "key$": "spaces_key", "index$": 16 }, "status": { "a": true, "h": "Status", "n": "status", "r": false, "sh": "Lifecycle status of a scenario set.", "t": "`$STRING`", "key$": "status", "index$": 17 }, "updated_at": { "a": true, "fo": "date-time", "h": "Updated At", "n": "updated_at", "r": false, "sh": "Time last updated at.", "t": "`$STRING`", "key$": "updated_at", "index$": 18 }, "workflow_uuid": { "a": true, "h": "Workflow Uuid", "n": "workflow_uuid", "r": false, "sh": "Identifier of the generation workflow.", "t": "`$STRING`", "key$": "workflow_uuid", "index$": 19 } }, "name": "api_get_scenario_set_output", "op": { "create": { "input": "data", "name": "create", "points": [{ "a": true, "co": { "id": "POST /v2/gen-ai/scenario_sets/{scenario_set_uuid}/duplicate", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "ex": "\"123e4567-e89b-12d3-a456-426614174000\"", "k": "param", "n": "scenario_set_uuid", "or": "scenario_set_uuid", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "POST", "o": "/v2/gen-ai/scenario_sets/{scenario_set_uuid}/duplicate", "q": { "$action": "duplicate", "exist": ["scenario_set_uuid"] }, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "v2" }, { "lit": "gen-ai" }, { "lit": "scenario_sets" }, { "var": "scenario_set_uuid" }, { "lit": "duplicate" }], "t": { "req": "`reqdata`", "res": "`body.scenario_set`" }, "index$": 0 }, { "a": true, "co": { "id": "POST /v2/gen-ai/scenario_sets", "source": "openapi3", "version": 2 }, "g": {}, "k": "http", "m": "POST", "o": "/v2/gen-ai/scenario_sets", "q": {}, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "v2" }, { "lit": "gen-ai" }, { "lit": "scenario_sets" }], "t": { "req": "`reqdata`", "res": "`body.scenario_set`" }, "index$": 1 }], "key$": "create" }, "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /v2/gen-ai/scenario_sets", "source": "openapi3", "version": 2 }, "g": { "query": [{ "a": true, "ex": 1, "k": "query", "n": "page", "or": "page", "r": false, "t": "`$INTEGER`", "index$": 0 }, { "a": true, "ex": 1, "k": "query", "n": "per_page", "or": "per_page", "r": false, "t": "`$INTEGER`", "index$": 1 }, { "a": true, "ex": "example string", "k": "query", "n": "search", "or": "search", "r": false, "t": "`$STRING`", "index$": 2 }, { "a": true, "ex": "SCENARIO_SET_SORT_FIELD_UNSPECIFIED", "k": "query", "n": "sort_by", "or": "sort_by", "r": false, "t": "`$STRING`", "index$": 3 }, { "a": true, "ex": "SORT_DIRECTION_UNSPECIFIED", "k": "query", "n": "sort_direction", "or": "sort_direction", "r": false, "t": "`$STRING`", "index$": 4 }, { "a": true, "ex": ["SCENARIO_SET_SOURCE_KIND_USER_UPLOAD"], "k": "query", "n": "source_kind", "or": "source_kinds", "r": false, "t": "`$ARRAY`", "index$": 5 }, { "a": true, "ex": ["SCENARIO_SET_STATUS_READY"], "k": "query", "n": "status", "or": "statuses", "r": false, "t": "`$ARRAY`", "index$": 6 }] }, "k": "http", "m": "GET", "o": "/v2/gen-ai/scenario_sets", "q": {}, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "v2" }, { "lit": "gen-ai" }, { "lit": "scenario_sets" }], "t": { "req": "`reqdata`", "res": "`body.scenario_sets`" }, "index$": 0 }], "key$": "list" }, "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /v2/gen-ai/scenario_sets/{scenario_set_uuid}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "ex": "\"123e4567-e89b-12d3-a456-426614174000\"", "k": "param", "n": "scenario_set_uuid", "or": "scenario_set_uuid", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/v2/gen-ai/scenario_sets/{scenario_set_uuid}", "q": { "exist": ["scenario_set_uuid"] }, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "v2" }, { "lit": "gen-ai" }, { "lit": "scenario_sets" }, { "var": "scenario_set_uuid" }], "t": { "req": "`reqdata`", "res": "`body.scenario_set`" }, "index$": 0 }], "key$": "load" } }, "relations": { "ancestors": [] }, "key$": "api_get_scenario_set_output", "name__orig": "api_get_scenario_set_output", "Name": "ApiGetScenarioSetOutput", "name_": "api_get_scenario_set_output", "name-": "api-get-scenario-set-output", "NAME": "API_GET_SCENARIO_SET_OUTPUT", "index$": 49 }, { "active": true, "entity": "api_get_scenario_set_output", "key$": "BasicApiGetScenarioSetOutputFlow", "kind": "basic", "name": "BasicApiGetScenarioSetOutputFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "api_get_scenario_set_output_ref01" }, "m": {}, "o": "create", "s": [], "v": [], "index$": 0 }, { "a": true, "d": {}, "i": {}, "m": {}, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "api_get_scenario_set_output_ref01" } }], "index$": 1 }, { "a": true, "d": {}, "i": { "ref": "api_get_scenario_set_output_ref01", "srcdatavar": "api_get_scenario_set_output_ref01_data", "suffix": "_dt0" }, "m": { "id": "api_get_scenario_set_output01" }, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-api_get_scenario_set_output_ref01" } }], "index$": 2 }] }, 'ApiGetScenarioSetOutput', { "POST /v2/gen-ai/scenario_sets/{scenario_set_uuid}/duplicate": { "protocol": "http", "requestBody": { "content": { "application/json": { "schema": { "description": "Public parameters for duplicating a scenario set.", "properties": { "scenario_set_uuid": { "description": "UUID of the scenario set to duplicate.", "example": "123e4567-e89b-12d3-a456-426614174000", "type": "string" } }, "type": "object", "x-ref": "#/components/schemas/apiDuplicateScenarioSetInputPublic" } } } }, "parameters": [{ "description": "UUID of the scenario set to duplicate.", "example": "\"123e4567-e89b-12d3-a456-426614174000\"", "in": "path", "name": "scenario_set_uuid", "required": true, "schema": { "type": "string" }, "index$": 0 }] }, "POST /v2/gen-ai/scenario_sets": { "protocol": "http", "requestBody": { "content": { "application/json": { "schema": { "description": "Public parameters for creating a scenario set.", "properties": { "file_upload_scenario_set": { "allOf": [{ "description": "File to upload as data source for knowledge base.", "properties": { "original_file_name": {}, "size_in_bytes": {}, "stored_object_key": {} }, "type": "object", "x-ref": "#/components/schemas/apiFileUploadDataSource" }], "description": "Uploaded scenario file to ingest. Provide this or `scenarios`, not both.", "key$": "file_upload_scenario_set" }, "name": { "description": "The name of the scenario set.", "example": "support-agent-scenarios", "type": "string", "key$": "name" }, "scenarios": { "description": "Inline scenarios. Provide this or `file_upload_scenario_set`, not both.", "items": { "description": "A single test case in a scenario set.", "properties": { "description": { "description": "What the user tries to accomplish. Required.", "example": "example string", "type": "string", "key$": "description" }, "exploration_budget": { "description": "Number of journeys to explore for this scenario. Defaults to 1 if unset.", "example": 123, "format": "int64", "type": "integer", "key$": "exploration_budget" }, "max_turns": { "description": "Turn budget for the scenario. Falls back to the run-level default if unset.", "example": 123, "format": "int64", "type": "integer", "key$": "max_turns" }, "name": { "description": "Human-readable name for the scenario. Optional.", "example": "example name", "type": "string", "key$": "name" }, "scenario_uuid": { "description": "Unique id for the scenario. Always generated by the API; any\ncustomer-supplied value is ignored and overwritten.", "example": "123e4567-e89b-12d3-a456-426614174000", "type": "string", "key$": "scenario_uuid" }, "stopping_criteria": { "description": "Judge stopping criteria. Required; must contain at least one entry.", "example": [], "items": {}, "type": "array", "key$": "stopping_criteria" }, "user_persona": { "description": "How the user communicates (tone, role). Optional.", "example": "example string", "type": "string", "key$": "user_persona" } }, "type": "object", "x-ref": "#/components/schemas/apiScenario" }, "type": "array", "key$": "scenarios" } }, "type": "object", "x-ref": "#/components/schemas/apiCreateScenarioSetInputPublic", "index$": 1 } } } }, "parameters": [] }, "GET /v2/gen-ai/scenario_sets": { "protocol": "http", "parameters": [{ "description": "Page number.", "example": 1, "in": "query", "name": "page", "schema": { "type": "integer" }, "index$": 0 }, { "description": "Items per page.", "example": 1, "in": "query", "name": "per_page", "schema": { "type": "integer" }, "index$": 1 }, { "description": "Filter by one or more statuses. Empty means no status filter.\n\n - SCENARIO_SET_STATUS_GENERATING: Generation is in progress. The scenarios are not ready yet.\n - SCENARIO_SET_STATUS_READY: The scenario set is ready to use.\n - SCENARIO_SET_STATUS_FAILED: Generation failed. The scenario set has no readable scenarios.\n - SCENARIO_SET_STATUS_CANCELLED: Generation was cancelled before completion.", "example": ["SCENARIO_SET_STATUS_READY"], "in": "query", "name": "statuses", "schema": { "items": { "enum": ["SCENARIO_SET_STATUS_UNSPECIFIED", "SCENARIO_SET_STATUS_GENERATING", "SCENARIO_SET_STATUS_READY", "SCENARIO_SET_STATUS_FAILED", "SCENARIO_SET_STATUS_CANCELLED"], "type": "string" }, "type": "array" }, "index$": 2 }, { "description": "Filter by one or more source kinds. Empty means no source-kind filter.\n\n - SCENARIO_SET_SOURCE_KIND_USER_UPLOAD: Created from uploaded or inline scenarios.\n - SCENARIO_SET_SOURCE_KIND_GOAL_GENERATED: Produced by goal-driven generation.\n - SCENARIO_SET_SOURCE_KIND_LIBRARY: Copied from a platform-curated library entry.\n - SCENARIO_SET_SOURCE_KIND_SIGNAL_GENERATED: Produced from a completed Signals export.", "example": ["SCENARIO_SET_SOURCE_KIND_USER_UPLOAD"], "in": "query", "name": "source_kinds", "schema": { "items": { "enum": ["SCENARIO_SET_SOURCE_KIND_UNSPECIFIED", "SCENARIO_SET_SOURCE_KIND_USER_UPLOAD", "SCENARIO_SET_SOURCE_KIND_GOAL_GENERATED", "SCENARIO_SET_SOURCE_KIND_LIBRARY", "SCENARIO_SET_SOURCE_KIND_SIGNAL_GENERATED"], "type": "string" }, "type": "array" }, "index$": 3 }, { "description": "Free-text search across name and description\n(case-insensitive substring match). Empty means no search.", "example": "example string", "in": "query", "name": "search", "schema": { "type": "string" }, "index$": 4 }, { "description": "Field to sort by. Defaults to creation date when unspecified.\n\n - SCENARIO_SET_SORT_FIELD_CREATED_AT: Sort by creation date. Default.\n - SCENARIO_SET_SORT_FIELD_NAME: Sort by customer-supplied name (case-insensitive).\n - SCENARIO_SET_SORT_FIELD_STATUS: Sort by status using lifecycle order (generating → ready → terminal).\n - SCENARIO_SET_SORT_FIELD_SCENARIO_COUNT: Sort by scenario_count.\n - SCENARIO_SET_SORT_FIELD_UPDATED_AT: Sort by last update date.", "example": "SCENARIO_SET_SORT_FIELD_UNSPECIFIED", "in": "query", "name": "sort_by", "schema": { "default": "SCENARIO_SET_SORT_FIELD_UNSPECIFIED", "enum": ["SCENARIO_SET_SORT_FIELD_UNSPECIFIED", "SCENARIO_SET_SORT_FIELD_CREATED_AT", "SCENARIO_SET_SORT_FIELD_NAME", "SCENARIO_SET_SORT_FIELD_STATUS", "SCENARIO_SET_SORT_FIELD_SCENARIO_COUNT", "SCENARIO_SET_SORT_FIELD_UPDATED_AT"], "type": "string" }, "index$": 5 }, { "description": "Sort direction. Defaults to descending when unspecified.", "example": "SORT_DIRECTION_UNSPECIFIED", "in": "query", "name": "sort_direction", "schema": { "default": "SORT_DIRECTION_UNSPECIFIED", "enum": ["SORT_DIRECTION_UNSPECIFIED", "SORT_DIRECTION_ASC", "SORT_DIRECTION_DESC"], "type": "string" }, "index$": 6 }] }, "GET /v2/gen-ai/scenario_sets/{scenario_set_uuid}": { "protocol": "http", "parameters": [{ "description": "UUID of the scenario set.", "example": "\"123e4567-e89b-12d3-a456-426614174000\"", "in": "path", "name": "scenario_set_uuid", "required": true, "schema": { "type": "string" }, "index$": 0 }] } }, { strict: LIVE_STRICT, t });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const api_get_scenario_set_output_ref01_ent = client.ApiGetScenarioSetOutput();
        let api_get_scenario_set_output_ref01_data = setup.data.new.api_get_scenario_set_output['api_get_scenario_set_output_ref01'];
        api_get_scenario_set_output_ref01_data = (await api_get_scenario_set_output_ref01_ent.create(api_get_scenario_set_output_ref01_data)).data();
        (0, node_assert_1.default)(null != api_get_scenario_set_output_ref01_data);
        // LIST
        const api_get_scenario_set_output_ref01_match = {};
        const api_get_scenario_set_output_ref01_list = (await api_get_scenario_set_output_ref01_ent.list(api_get_scenario_set_output_ref01_match)).map((e) => e.data());
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
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/api_get_scenario_set_output/ApiGetScenarioSetOutputTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.DigitaloceanSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['api_get_scenario_set_output01', 'api_get_scenario_set_output02', 'api_get_scenario_set_output03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'DIGITALOCEAN_TEST_API_GET_SCENARIO_SET_OUTPUT_ENTID': idmap,
        'DIGITALOCEAN_TEST_LIVE': 'FALSE',
        'DIGITALOCEAN_TEST_EXPLAIN': 'FALSE',
        'DIGITALOCEAN_APIKEY': '',
    });
    idmap = env['DIGITALOCEAN_TEST_API_GET_SCENARIO_SET_OUTPUT_ENTID'];
    const live = 'TRUE' === env.DIGITALOCEAN_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['DIGITALOCEAN_TEST_API_GET_SCENARIO_SET_OUTPUT_ENTID'];
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
//# sourceMappingURL=ApiGetScenarioSetOutputEntity.test.js.map