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
(0, node_test_1.describe)('ApiListScenarioLibraryOutputEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when DIGITALOCEAN_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('DIGITALOCEAN_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.DigitaloceanSDK.test();
        const ent = testsdk.ApiListScenarioLibraryOutput();
        (0, node_assert_1.default)(null != ent);
    });
    class FailHook extends __1.BaseFeature {
        name = 'failhook';
        version = '0.0.1';
        active = true;
        unexpected = 0;
        init() { }
        PreSpec() { throw new Error('api_list_scenario_library_output hook failed'); }
        PreUnexpected() { this.unexpected++; }
    }
    (0, node_test_1.test)('stream-error', async () => {
        const offline = { net: { offline: true } };
        await node_assert_1.default.rejects(async () => {
            for await (const _item of __1.DigitaloceanSDK.test(offline).ApiListScenarioLibraryOutput().stream('list')) { }
        }, /offline/);
        for await (const _item of __1.DigitaloceanSDK.test(offline).ApiListScenarioLibraryOutput()
            .stream('list', undefined, { ctrl: { throw: false } })) { }
        if (null != __1.config.feature?.rbac) {
            const denied = __1.DigitaloceanSDK.test(undefined, { feature: { rbac: { active: true, deny: true } } });
            await node_assert_1.default.rejects(async () => {
                for await (const _item of denied.ApiListScenarioLibraryOutput().stream('list')) { }
            }, (err) => 'rbac_denied' === err.code);
        }
    });
    (0, node_test_1.test)('stream-ctrl', async () => {
        const explain = {};
        const ctrl = { explain };
        for await (const _item of __1.DigitaloceanSDK.test().ApiListScenarioLibraryOutput().stream('list', undefined, { ctrl })) { }
        node_assert_1.default.deepStrictEqual(Object.keys(ctrl), ['explain']);
        (0, node_assert_1.default)(explain === ctrl.explain && 0 < Object.keys(explain).length);
    });
    (0, node_test_1.test)('unexpected', async () => {
        const hook = new FailHook();
        const client = new __1.DigitaloceanSDK({ feature: { test: { active: true } }, extend: [hook] });
        await node_assert_1.default.rejects(client.ApiListScenarioLibraryOutput().list(), /hook failed/);
        (0, node_assert_1.default)(0 < hook.unexpected);
        const fired = hook.unexpected;
        node_assert_1.default.strictEqual(await client.ApiListScenarioLibraryOutput().list(undefined, { throw: false }), undefined);
        (0, node_assert_1.default)(fired < hook.unexpected);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.DigitaloceanSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.ApiListScenarioLibraryOutput().list({ "category": 1 }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.DIGITALOCEAN_TEST_LIVE;
        for (const op of ['list']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'api_list_scenario_library_output.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "category": { "a": true, "h": "Category", "n": "category", "r": false, "sh": "Optional grouping for catalog browsing (e.g.", "t": "`$STRING`", "key$": "category", "index$": 0 }, "created_at": { "a": true, "fo": "date-time", "h": "Created At", "n": "created_at", "r": false, "sh": "Time created at.", "t": "`$STRING`", "key$": "created_at", "index$": 1 }, "description": { "a": true, "h": "Description", "n": "description", "r": false, "sh": "Curated description.", "t": "`$STRING`", "key$": "description", "index$": 2 }, "goal_description": { "a": true, "h": "Goal Description", "n": "goal_description", "r": false, "sh": "The goal this scenario set demonstrates, shown as context alongside goal-driven generation.", "t": "`$STRING`", "key$": "goal_description", "index$": 3 }, "library_scenario_uuid": { "a": true, "h": "Library Scenario Uuid", "n": "library_scenario_uuid", "r": false, "sh": "UUID of the library entry.", "t": "`$STRING`", "key$": "library_scenario_uuid", "index$": 4 }, "name": { "a": true, "h": "Name", "n": "name", "r": false, "sh": "Curated display name.", "t": "`$STRING`", "key$": "name", "index$": 5 }, "scenario_count": { "a": true, "fo": "int64", "h": "Scenario Count", "n": "scenario_count", "r": false, "sh": "Number of scenarios in the library entry.", "t": "`$INTEGER`", "key$": "scenario_count", "index$": 6 }, "status": { "a": true, "h": "Status", "n": "status", "r": false, "sh": "Lifecycle status of a Common Scenario & Goal Library entry.", "t": "`$STRING`", "key$": "status", "index$": 7 }, "updated_at": { "a": true, "fo": "date-time", "h": "Updated At", "n": "updated_at", "r": false, "sh": "Time last updated at.", "t": "`$STRING`", "key$": "updated_at", "index$": 8 } }, "name": "api_list_scenario_library_output", "op": { "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /v2/gen-ai/scenario_library", "source": "openapi3", "version": 2 }, "g": { "query": [{ "a": true, "ex": "example string", "k": "query", "n": "category", "or": "category", "r": false, "t": "`$STRING`", "index$": 0 }, { "a": true, "ex": 1, "k": "query", "n": "page", "or": "page", "r": false, "t": "`$INTEGER`", "index$": 1 }, { "a": true, "ex": 1, "k": "query", "n": "per_page", "or": "per_page", "r": false, "t": "`$INTEGER`", "index$": 2 }, { "a": true, "ex": "example string", "k": "query", "n": "search", "or": "search", "r": false, "t": "`$STRING`", "index$": 3 }, { "a": true, "ex": "SCENARIO_LIBRARY_SORT_FIELD_UNSPECIFIED", "k": "query", "n": "sort_by", "or": "sort_by", "r": false, "t": "`$STRING`", "index$": 4 }, { "a": true, "ex": "SORT_DIRECTION_UNSPECIFIED", "k": "query", "n": "sort_direction", "or": "sort_direction", "r": false, "t": "`$STRING`", "index$": 5 }] }, "k": "http", "m": "GET", "o": "/v2/gen-ai/scenario_library", "q": {}, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "v2" }, { "lit": "gen-ai" }, { "lit": "scenario_library" }], "t": { "req": "`reqdata`", "res": "`body.scenarios`" }, "index$": 0 }], "key$": "list" } }, "relations": { "ancestors": [] }, "key$": "api_list_scenario_library_output", "name__orig": "api_list_scenario_library_output", "Name": "ApiListScenarioLibraryOutput", "name_": "api_list_scenario_library_output", "name-": "api-list-scenario-library-output", "NAME": "API_LIST_SCENARIO_LIBRARY_OUTPUT", "index$": 70 }, { "active": true, "entity": "api_list_scenario_library_output", "key$": "BasicApiListScenarioLibraryOutputFlow", "kind": "basic", "name": "BasicApiListScenarioLibraryOutputFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": {}, "m": {}, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "api_list_scenario_library_output_ref01" } }], "index$": 0 }] }, 'ApiListScenarioLibraryOutput', { "GET /v2/gen-ai/scenario_library": { "protocol": "http", "parameters": [{ "description": "Page number.", "example": 1, "in": "query", "name": "page", "schema": { "type": "integer" }, "index$": 0 }, { "description": "Items per page.", "example": 1, "in": "query", "name": "per_page", "schema": { "type": "integer" }, "index$": 1 }, { "description": "Filter by category (exact match). Empty means no category filter.", "example": "example string", "in": "query", "name": "category", "schema": { "type": "string" }, "index$": 2 }, { "description": "Free-text search across name, description, and goal_description\n(case-insensitive substring match). Empty means no search.", "example": "example string", "in": "query", "name": "search", "schema": { "type": "string" }, "index$": 3 }, { "description": "Field to sort by. Defaults to name when unspecified.\n\n - SCENARIO_LIBRARY_SORT_FIELD_NAME: Sort by customer-facing name (case-insensitive). Default.\n - SCENARIO_LIBRARY_SORT_FIELD_CREATED_AT: Sort by creation date.", "example": "SCENARIO_LIBRARY_SORT_FIELD_UNSPECIFIED", "in": "query", "name": "sort_by", "schema": { "default": "SCENARIO_LIBRARY_SORT_FIELD_UNSPECIFIED", "enum": ["SCENARIO_LIBRARY_SORT_FIELD_UNSPECIFIED", "SCENARIO_LIBRARY_SORT_FIELD_NAME", "SCENARIO_LIBRARY_SORT_FIELD_CREATED_AT"], "type": "string" }, "index$": 4 }, { "description": "Sort direction. Defaults to ascending when unspecified.", "example": "SORT_DIRECTION_UNSPECIFIED", "in": "query", "name": "sort_direction", "schema": { "default": "SORT_DIRECTION_UNSPECIFIED", "enum": ["SORT_DIRECTION_UNSPECIFIED", "SORT_DIRECTION_ASC", "SORT_DIRECTION_DESC"], "type": "string" }, "index$": 5 }] } }, { strict: LIVE_STRICT, t });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let api_list_scenario_library_output_ref01_data = Object.values(setup.data.existing.api_list_scenario_library_output)[0];
        // LIST
        const api_list_scenario_library_output_ref01_ent = client.ApiListScenarioLibraryOutput();
        const api_list_scenario_library_output_ref01_match = {};
        const api_list_scenario_library_output_ref01_list = (await api_list_scenario_library_output_ref01_ent.list(api_list_scenario_library_output_ref01_match)).map((e) => e.data());
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
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/api_list_scenario_library_output/ApiListScenarioLibraryOutputTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.DigitaloceanSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['api_list_scenario_library_output01', 'api_list_scenario_library_output02', 'api_list_scenario_library_output03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'DIGITALOCEAN_TEST_API_LIST_SCENARIO_LIBRARY_OUTPUT_ENTID': idmap,
        'DIGITALOCEAN_TEST_LIVE': 'FALSE',
        'DIGITALOCEAN_TEST_EXPLAIN': 'FALSE',
        'DIGITALOCEAN_APIKEY': '',
    });
    idmap = env['DIGITALOCEAN_TEST_API_LIST_SCENARIO_LIBRARY_OUTPUT_ENTID'];
    const live = 'TRUE' === env.DIGITALOCEAN_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['DIGITALOCEAN_TEST_API_LIST_SCENARIO_LIBRARY_OUTPUT_ENTID'];
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
//# sourceMappingURL=ApiListScenarioLibraryOutputEntity.test.js.map