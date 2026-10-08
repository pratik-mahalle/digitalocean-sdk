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
(0, node_test_1.describe)('ApiSimulationJourneyEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when DIGITALOCEAN_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('DIGITALOCEAN_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.DigitaloceanSDK.test();
        const ent = testsdk.ApiSimulationJourney();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.DigitaloceanSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.ApiSimulationJourney().load({ "id": 1, "simulation_run_id": "x" }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.DIGITALOCEAN_TEST_LIVE;
        for (const op of ['load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'api_simulation_journey.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "created_at": { "a": true, "fo": "date-time", "h": "Created At", "n": "created_at", "r": false, "sh": "Time created at.", "t": "`$STRING`", "key$": "created_at", "index$": 0 }, "duration_sec": { "a": true, "fo": "uint64", "h": "Duration Sec", "n": "duration_sec", "r": false, "sh": "Wall-clock time taken for the journey to complete, in seconds.", "t": "`$STRING`", "key$": "duration_sec", "index$": 1 }, "failure_reason": { "a": true, "h": "Failure Reason", "n": "failure_reason", "r": false, "sh": "Human-readable explanation of a terminal FAILED status.", "t": "`$STRING`", "key$": "failure_reason", "index$": 2 }, "id": { "a": true, "h": "Id", "n": "id", "r": false, "t": "`$STRING`", "key$": "id", "index$": 3 }, "journey_index": { "a": true, "fo": "int64", "h": "Journey Index", "n": "journey_index", "r": false, "sh": "Zero-based index of this journey within its scenario's exploration budget.", "t": "`$INTEGER`", "key$": "journey_index", "index$": 4 }, "journey_uuid": { "a": true, "h": "Journey Uuid", "n": "journey_uuid", "r": false, "sh": "UUID of the journey.", "t": "`$STRING`", "key$": "journey_uuid", "index$": 5 }, "judge_reasoning": { "a": true, "h": "Judge Reasoning", "n": "judge_reasoning", "r": false, "sh": "Optional judge reasoning for the verdict.", "t": "`$STRING`", "key$": "judge_reasoning", "index$": 6 }, "run_uuid": { "a": true, "h": "Run Uuid", "n": "run_uuid", "r": false, "sh": "UUID of the run this journey belongs to.", "t": "`$STRING`", "key$": "run_uuid", "index$": 7 }, "scenario_uuid": { "a": true, "h": "Scenario Uuid", "n": "scenario_uuid", "r": false, "sh": "UUID of the scenario this journey executed.", "t": "`$STRING`", "key$": "scenario_uuid", "index$": 8 }, "session_id": { "a": true, "h": "Session Id", "n": "session_id", "r": false, "sh": "Session identifier for this journey.", "t": "`$STRING`", "key$": "session_id", "index$": 9 }, "status": { "a": true, "h": "Status", "n": "status", "r": false, "sh": "Lifecycle status of a single journey.", "t": "`$STRING`", "key$": "status", "index$": 10 }, "token_usage": { "a": true, "h": "Token Usage", "n": "token_usage", "r": false, "sh": "Per-actor token accounting for a run or journey.", "t": "`$OBJECT`", "key$": "token_usage", "index$": 11 }, "trajectory_bucket_name": { "a": true, "h": "Trajectory Bucket Name", "n": "trajectory_bucket_name", "r": false, "sh": "Object storage bucket holding the trajectory JSON.", "t": "`$STRING`", "key$": "trajectory_bucket_name", "index$": 12 }, "trajectory_bucket_region": { "a": true, "h": "Trajectory Bucket Region", "n": "trajectory_bucket_region", "r": false, "sh": "Object storage bucket region for the trajectory JSON.", "t": "`$STRING`", "key$": "trajectory_bucket_region", "index$": 13 }, "trajectory_spaces_key": { "a": true, "h": "Trajectory Spaces Key", "n": "trajectory_spaces_key", "r": false, "sh": "Object storage key for the trajectory JSON.", "t": "`$STRING`", "key$": "trajectory_spaces_key", "index$": 14 }, "updated_at": { "a": true, "fo": "date-time", "h": "Updated At", "n": "updated_at", "r": false, "sh": "Time last updated at.", "t": "`$STRING`", "key$": "updated_at", "index$": 15 }, "verdict": { "a": true, "h": "Verdict", "n": "verdict", "r": false, "sh": "The judge's verdict for a journey.", "t": "`$STRING`", "key$": "verdict", "index$": 16 } }, "id": { "field": "id", "name": "id" }, "name": "api_simulation_journey", "op": { "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /v2/gen-ai/simulation_runs/{run_uuid}/journeys/{journey_uuid}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "ex": "\"123e4567-e89b-12d3-a456-426614174000\"", "k": "param", "n": "id", "or": "journey_uuid", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "ex": "\"123e4567-e89b-12d3-a456-426614174000\"", "k": "param", "n": "simulation_run_id", "or": "run_uuid", "r": true, "t": "`$STRING`", "index$": 1 }] }, "k": "http", "m": "GET", "o": "/v2/gen-ai/simulation_runs/{run_uuid}/journeys/{journey_uuid}", "q": { "exist": ["id", "simulation_run_id"] }, "r": { "param": { "journey_uuid": "id", "run_uuid": "simulation_run_id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "v2" }, { "lit": "gen-ai" }, { "lit": "simulation_runs" }, { "var": "simulation_run_id" }, { "lit": "journeys" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body.journey`" }, "index$": 0 }], "key$": "load" } }, "relations": { "ancestors": [] }, "key$": "api_simulation_journey", "name__orig": "api_simulation_journey", "Name": "ApiSimulationJourney", "name_": "api_simulation_journey", "name-": "api-simulation-journey", "NAME": "API_SIMULATION_JOURNEY", "index$": 81 }, { "active": true, "entity": "api_simulation_journey", "key$": "BasicApiSimulationJourneyFlow", "kind": "basic", "name": "BasicApiSimulationJourneyFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "api_simulation_journey_ref01", "srcdatavar": "api_simulation_journey_ref01_data", "suffix": "_dt0" }, "m": { "id": "api_simulation_journey01", "simulation_run_id": "simulation_run01" }, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-api_simulation_journey_ref01" } }], "index$": 0 }] }, 'ApiSimulationJourney', { "GET /v2/gen-ai/simulation_runs/{run_uuid}/journeys/{journey_uuid}": { "protocol": "http", "parameters": [{ "description": "UUID of the run the journey belongs to.", "example": "\"123e4567-e89b-12d3-a456-426614174000\"", "in": "path", "name": "run_uuid", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "description": "UUID of the journey.", "example": "\"123e4567-e89b-12d3-a456-426614174000\"", "in": "path", "name": "journey_uuid", "required": true, "schema": { "type": "string" }, "index$": 1 }] } }, { strict: LIVE_STRICT, t });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let api_simulation_journey_ref01_data = Object.values(setup.data.existing.api_simulation_journey)[0];
        // LOAD
        const api_simulation_journey_ref01_ent = client.ApiSimulationJourney();
        const api_simulation_journey_ref01_match_dt0 = {};
        api_simulation_journey_ref01_match_dt0.id = api_simulation_journey_ref01_data.id;
        const api_simulation_journey_ref01_data_dt0 = (await api_simulation_journey_ref01_ent.load(api_simulation_journey_ref01_match_dt0)).data();
        (0, node_assert_1.default)(api_simulation_journey_ref01_data_dt0.id === api_simulation_journey_ref01_data.id);
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
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/api_simulation_journey/ApiSimulationJourneyTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.DigitaloceanSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['api_simulation_journey01', 'api_simulation_journey02', 'api_simulation_journey03', 'simulation_run01'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'DIGITALOCEAN_TEST_API_SIMULATION_JOURNEY_ENTID': idmap,
        'DIGITALOCEAN_TEST_LIVE': 'FALSE',
        'DIGITALOCEAN_TEST_EXPLAIN': 'FALSE',
        'DIGITALOCEAN_APIKEY': '',
    });
    idmap = env['DIGITALOCEAN_TEST_API_SIMULATION_JOURNEY_ENTID'];
    const live = 'TRUE' === env.DIGITALOCEAN_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['DIGITALOCEAN_TEST_API_SIMULATION_JOURNEY_ENTID'];
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
//# sourceMappingURL=ApiSimulationJourneyEntity.test.js.map