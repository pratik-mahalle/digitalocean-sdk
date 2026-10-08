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
(0, node_test_1.describe)('ApiListScenariosOutputEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when DIGITALOCEAN_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('DIGITALOCEAN_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.DigitaloceanSDK.test();
        const ent = testsdk.ApiListScenariosOutput();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.DigitaloceanSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.ApiListScenariosOutput().list({ "scenario_library_id": 1 }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.DIGITALOCEAN_TEST_LIVE;
        for (const op of ['list']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'api_list_scenarios_output.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "description": { "a": true, "h": "Description", "n": "description", "r": false, "sh": "What the user tries to accomplish.", "t": "`$STRING`", "key$": "description", "index$": 0 }, "exploration_budget": { "a": true, "fo": "int64", "h": "Exploration Budget", "n": "exploration_budget", "r": false, "sh": "Number of journeys to explore for this scenario.", "t": "`$INTEGER`", "key$": "exploration_budget", "index$": 1 }, "max_turns": { "a": true, "fo": "int64", "h": "Max Turns", "n": "max_turns", "r": false, "sh": "Turn budget for the scenario.", "t": "`$INTEGER`", "key$": "max_turns", "index$": 2 }, "name": { "a": true, "h": "Name", "n": "name", "r": false, "sh": "Human-readable name for the scenario.", "t": "`$STRING`", "key$": "name", "index$": 3 }, "scenario_uuid": { "a": true, "h": "Scenario Uuid", "n": "scenario_uuid", "r": false, "sh": "Unique id for the scenario.", "t": "`$STRING`", "key$": "scenario_uuid", "index$": 4 }, "stopping_criteria": { "a": true, "h": "Stopping Criteria", "n": "stopping_criteria", "r": false, "sh": "Judge stopping criteria.", "t": "`$ARRAY`", "key$": "stopping_criteria", "index$": 5 }, "user_persona": { "a": true, "h": "User Persona", "n": "user_persona", "r": false, "sh": "How the user communicates (tone, role).", "t": "`$STRING`", "key$": "user_persona", "index$": 6 } }, "name": "api_list_scenarios_output", "op": { "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /v2/gen-ai/scenario_library/{library_scenario_uuid}/scenarios", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "ex": "\"123e4567-e89b-12d3-a456-426614174000\"", "k": "param", "n": "scenario_library_id", "or": "library_scenario_uuid", "r": true, "t": "`$STRING`", "index$": 0 }], "query": [{ "a": true, "ex": 1, "k": "query", "n": "page", "or": "page", "r": false, "t": "`$INTEGER`", "index$": 0 }, { "a": true, "ex": 1, "k": "query", "n": "per_page", "or": "per_page", "r": false, "t": "`$INTEGER`", "index$": 1 }, { "a": true, "ex": "example string", "k": "query", "n": "search", "or": "search", "r": false, "t": "`$STRING`", "index$": 2 }, { "a": true, "ex": "SCENARIO_SORT_FIELD_UNSPECIFIED", "k": "query", "n": "sort_by", "or": "sort_by", "r": false, "t": "`$STRING`", "index$": 3 }, { "a": true, "ex": "SORT_DIRECTION_UNSPECIFIED", "k": "query", "n": "sort_direction", "or": "sort_direction", "r": false, "t": "`$STRING`", "index$": 4 }] }, "k": "http", "m": "GET", "o": "/v2/gen-ai/scenario_library/{library_scenario_uuid}/scenarios", "q": { "exist": ["scenario_library_id"] }, "r": { "param": { "library_scenario_uuid": "scenario_library_id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "v2" }, { "lit": "gen-ai" }, { "lit": "scenario_library" }, { "var": "scenario_library_id" }, { "lit": "scenarios" }], "t": { "req": "`reqdata`", "res": "`body.scenarios`" }, "index$": 0 }, { "a": true, "co": { "id": "GET /v2/gen-ai/scenario_sets/{scenario_set_uuid}/scenarios", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "ex": "\"123e4567-e89b-12d3-a456-426614174000\"", "k": "param", "n": "scenario_set_id", "or": "scenario_set_uuid", "r": true, "t": "`$STRING`", "index$": 0 }], "query": [{ "a": true, "ex": 1, "k": "query", "n": "page", "or": "page", "r": false, "t": "`$INTEGER`", "index$": 0 }, { "a": true, "ex": 1, "k": "query", "n": "per_page", "or": "per_page", "r": false, "t": "`$INTEGER`", "index$": 1 }, { "a": true, "ex": "example string", "k": "query", "n": "search", "or": "search", "r": false, "t": "`$STRING`", "index$": 2 }, { "a": true, "ex": "SCENARIO_SORT_FIELD_UNSPECIFIED", "k": "query", "n": "sort_by", "or": "sort_by", "r": false, "t": "`$STRING`", "index$": 3 }, { "a": true, "ex": "SORT_DIRECTION_UNSPECIFIED", "k": "query", "n": "sort_direction", "or": "sort_direction", "r": false, "t": "`$STRING`", "index$": 4 }] }, "k": "http", "m": "GET", "o": "/v2/gen-ai/scenario_sets/{scenario_set_uuid}/scenarios", "q": { "exist": ["scenario_set_id"] }, "r": { "param": { "scenario_set_uuid": "scenario_set_id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "v2" }, { "lit": "gen-ai" }, { "lit": "scenario_sets" }, { "var": "scenario_set_id" }, { "lit": "scenarios" }], "t": { "req": "`reqdata`", "res": "`body.scenarios`" }, "index$": 1 }], "key$": "list" } }, "relations": { "ancestors": [] }, "key$": "api_list_scenarios_output", "name__orig": "api_list_scenarios_output", "Name": "ApiListScenariosOutput", "name_": "api_list_scenarios_output", "name-": "api-list-scenarios-output", "NAME": "API_LIST_SCENARIOS_OUTPUT", "index$": 69 }, { "active": true, "entity": "api_list_scenarios_output", "key$": "BasicApiListScenariosOutputFlow", "kind": "basic", "name": "BasicApiListScenariosOutputFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": {}, "m": { "scenario_set_id": "scenario_set01" }, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "api_list_scenarios_output_ref01" } }], "index$": 0 }] }, 'ApiListScenariosOutput', { "GET /v2/gen-ai/scenario_library/{library_scenario_uuid}/scenarios": { "protocol": "http", "parameters": [{ "description": "UUID of the library entry to read.", "example": "\"123e4567-e89b-12d3-a456-426614174000\"", "in": "path", "name": "library_scenario_uuid", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "description": "Page number.", "example": 1, "in": "query", "name": "page", "schema": { "type": "integer" }, "index$": 1 }, { "description": "Items per page.", "example": 1, "in": "query", "name": "per_page", "schema": { "type": "integer" }, "index$": 2 }, { "description": "Free-text search across name, description, and user_persona\n(case-insensitive substring match). Empty means no search.", "example": "example string", "in": "query", "name": "search", "schema": { "type": "string" }, "index$": 3 }, { "description": "Field to sort by. Defaults to original file order when unspecified.\n\n - SCENARIO_SORT_FIELD_FILE_ORDER: Preserve original file order. Default.\n - SCENARIO_SORT_FIELD_NAME: Sort by scenario name (case-insensitive). Empty names sort last.\n - SCENARIO_SORT_FIELD_DESCRIPTION: Sort by scenario description (case-insensitive).", "example": "SCENARIO_SORT_FIELD_UNSPECIFIED", "in": "query", "name": "sort_by", "schema": { "default": "SCENARIO_SORT_FIELD_UNSPECIFIED", "enum": ["SCENARIO_SORT_FIELD_UNSPECIFIED", "SCENARIO_SORT_FIELD_FILE_ORDER", "SCENARIO_SORT_FIELD_NAME", "SCENARIO_SORT_FIELD_DESCRIPTION"], "type": "string" }, "index$": 4 }, { "description": "Sort direction. Defaults to ascending when unspecified.", "example": "SORT_DIRECTION_UNSPECIFIED", "in": "query", "name": "sort_direction", "schema": { "default": "SORT_DIRECTION_UNSPECIFIED", "enum": ["SORT_DIRECTION_UNSPECIFIED", "SORT_DIRECTION_ASC", "SORT_DIRECTION_DESC"], "type": "string" }, "index$": 5 }] }, "GET /v2/gen-ai/scenario_sets/{scenario_set_uuid}/scenarios": { "protocol": "http", "parameters": [{ "description": "UUID of the scenario set to read.", "example": "\"123e4567-e89b-12d3-a456-426614174000\"", "in": "path", "name": "scenario_set_uuid", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "description": "Page number.", "example": 1, "in": "query", "name": "page", "schema": { "type": "integer" }, "index$": 1 }, { "description": "Items per page.", "example": 1, "in": "query", "name": "per_page", "schema": { "type": "integer" }, "index$": 2 }, { "description": "Free-text search across name, description, and user_persona\n(case-insensitive substring match). Empty means no search.", "example": "example string", "in": "query", "name": "search", "schema": { "type": "string" }, "index$": 3 }, { "description": "Field to sort by. Defaults to original file order when unspecified.\n\n - SCENARIO_SORT_FIELD_FILE_ORDER: Preserve original file order. Default.\n - SCENARIO_SORT_FIELD_NAME: Sort by scenario name (case-insensitive). Empty names sort last.\n - SCENARIO_SORT_FIELD_DESCRIPTION: Sort by scenario description (case-insensitive).", "example": "SCENARIO_SORT_FIELD_UNSPECIFIED", "in": "query", "name": "sort_by", "schema": { "default": "SCENARIO_SORT_FIELD_UNSPECIFIED", "enum": ["SCENARIO_SORT_FIELD_UNSPECIFIED", "SCENARIO_SORT_FIELD_FILE_ORDER", "SCENARIO_SORT_FIELD_NAME", "SCENARIO_SORT_FIELD_DESCRIPTION"], "type": "string" }, "index$": 4 }, { "description": "Sort direction. Defaults to ascending when unspecified.", "example": "SORT_DIRECTION_UNSPECIFIED", "in": "query", "name": "sort_direction", "schema": { "default": "SORT_DIRECTION_UNSPECIFIED", "enum": ["SORT_DIRECTION_UNSPECIFIED", "SORT_DIRECTION_ASC", "SORT_DIRECTION_DESC"], "type": "string" }, "index$": 5 }] } }, { strict: LIVE_STRICT, t });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let api_list_scenarios_output_ref01_data = Object.values(setup.data.existing.api_list_scenarios_output)[0];
        // LIST
        const api_list_scenarios_output_ref01_ent = client.ApiListScenariosOutput();
        const api_list_scenarios_output_ref01_match = {};
        api_list_scenarios_output_ref01_match['scenario_set_id'] = setup.idmap['scenario_set01'];
        const api_list_scenarios_output_ref01_list = (await api_list_scenarios_output_ref01_ent.list(api_list_scenarios_output_ref01_match)).map((e) => e.data());
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
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/api_list_scenarios_output/ApiListScenariosOutputTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.DigitaloceanSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['api_list_scenarios_output01', 'api_list_scenarios_output02', 'api_list_scenarios_output03', 'scenario_set01'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'DIGITALOCEAN_TEST_API_LIST_SCENARIOS_OUTPUT_ENTID': idmap,
        'DIGITALOCEAN_TEST_LIVE': 'FALSE',
        'DIGITALOCEAN_TEST_EXPLAIN': 'FALSE',
        'DIGITALOCEAN_APIKEY': '',
    });
    idmap = env['DIGITALOCEAN_TEST_API_LIST_SCENARIOS_OUTPUT_ENTID'];
    const live = 'TRUE' === env.DIGITALOCEAN_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['DIGITALOCEAN_TEST_API_LIST_SCENARIOS_OUTPUT_ENTID'];
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
//# sourceMappingURL=ApiListScenariosOutputEntity.test.js.map