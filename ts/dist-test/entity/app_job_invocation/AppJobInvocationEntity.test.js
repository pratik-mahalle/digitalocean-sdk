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
(0, node_test_1.describe)('AppJobInvocationEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when DIGITALOCEAN_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('DIGITALOCEAN_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.DigitaloceanSDK.test();
        const ent = testsdk.AppJobInvocation();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.DigitaloceanSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.AppJobInvocation().list({ "id": 1 }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.DIGITALOCEAN_TEST_LIVE;
        for (const op of ['create', 'list', 'load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'app_job_invocation.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "completed_at": { "a": true, "fo": "date-time", "h": "Completed At", "n": "completed_at", "r": false, "t": "`$STRING`", "key$": "completed_at", "index$": 0 }, "created_at": { "a": true, "fo": "date-time", "h": "Created At", "n": "created_at", "r": false, "t": "`$STRING`", "key$": "created_at", "index$": 1 }, "deployment_id": { "a": true, "h": "Deployment Id", "n": "deployment_id", "r": false, "t": "`$STRING`", "key$": "deployment_id", "index$": 2 }, "id": { "a": true, "h": "Id", "n": "id", "r": false, "t": "`$STRING`", "key$": "id", "index$": 3 }, "job_name": { "a": true, "h": "Job Name", "n": "job_name", "r": false, "t": "`$STRING`", "key$": "job_name", "index$": 4 }, "phase": { "a": true, "h": "Phase", "n": "phase", "r": false, "sh": "The phase of the job invocation", "t": "`$STRING`", "key$": "phase", "index$": 5 }, "started_at": { "a": true, "fo": "date-time", "h": "Started At", "n": "started_at", "r": false, "t": "`$STRING`", "key$": "started_at", "index$": 6 }, "trigger": { "a": true, "h": "Trigger", "n": "trigger", "r": false, "t": "`$OBJECT`", "key$": "trigger", "index$": 7 } }, "id": { "field": "id", "name": "id" }, "name": "app_job_invocation", "op": { "create": { "input": "data", "name": "create", "points": [{ "a": true, "co": { "id": "POST /v2/apps/{app_id}/job-invocations/{job_invocation_id}/cancel", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "ex": "4f6c71e2-1e90-4762-9fee-6cc4a0a9f2cf", "k": "param", "n": "app_id", "or": "app_id", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "ex": "123e4567-e89b-12d3-a456-426", "k": "param", "n": "job_invocation_id", "or": "job_invocation_id", "r": true, "t": "`$STRING`", "index$": 1 }], "query": [{ "a": true, "ex": "component", "k": "query", "n": "job_name", "or": "job_name", "r": false, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "POST", "o": "/v2/apps/{app_id}/job-invocations/{job_invocation_id}/cancel", "q": { "exist": ["app_id", "job_invocation_id"] }, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "v2" }, { "lit": "apps" }, { "var": "app_id" }, { "lit": "job-invocations" }, { "var": "job_invocation_id" }, { "lit": "cancel" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "create" }, "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /v2/apps/{app_id}/job-invocations", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "ex": "4f6c71e2-1e90-4762-9fee-6cc4a0a9f2cf", "k": "param", "n": "id", "or": "app_id", "r": true, "t": "`$STRING`", "index$": 0 }], "query": [{ "a": true, "ex": "3aa4d20e-5527-4c00-b496-601fbd22520a", "k": "query", "n": "deployment_id", "or": "deployment_id", "r": false, "t": "`$STRING`", "index$": 0 }, { "a": true, "ex": ["component1", "component2"], "k": "query", "n": "job_name", "or": "job_names", "r": false, "t": "`$ARRAY`", "index$": 1 }, { "a": true, "ex": 1, "k": "query", "n": "page", "or": "page", "r": false, "t": "`$INTEGER`", "index$": 2 }, { "a": true, "ex": 2, "k": "query", "n": "per_page", "or": "per_page", "r": false, "t": "`$INTEGER`", "index$": 3 }] }, "k": "http", "m": "GET", "o": "/v2/apps/{app_id}/job-invocations", "q": { "exist": ["id"] }, "r": { "param": { "app_id": "id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "v2" }, { "lit": "apps" }, { "var": "id" }, { "lit": "job-invocations" }], "t": { "req": "`reqdata`", "res": "`body.job_invocations`" }, "index$": 0 }], "key$": "list" }, "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /v2/apps/{app_id}/job-invocations/{job_invocation_id}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "ex": "4f6c71e2-1e90-4762-9fee-6cc4a0a9f2cf", "k": "param", "n": "app_id", "or": "app_id", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "ex": "123e4567-e89b-12d3-a456-426", "k": "param", "n": "id", "or": "job_invocation_id", "r": true, "t": "`$STRING`", "index$": 1 }], "query": [{ "a": true, "ex": "component", "k": "query", "n": "job_name", "or": "job_name", "r": false, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/v2/apps/{app_id}/job-invocations/{job_invocation_id}", "q": { "exist": ["app_id", "id"] }, "r": { "param": { "job_invocation_id": "id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "v2" }, { "lit": "apps" }, { "var": "app_id" }, { "lit": "job-invocations" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "load" } }, "relations": { "ancestors": [["$.main.kit.entity.app"], ["$.main.kit.entity.app"]] }, "key$": "app_job_invocation", "name__orig": "app_job_invocation", "Name": "AppJobInvocation", "name_": "app_job_invocation", "name-": "app-job-invocation", "NAME": "APP_JOB_INVOCATION", "index$": 108 }, { "active": true, "entity": "app_job_invocation", "key$": "BasicAppJobInvocationFlow", "kind": "basic", "name": "BasicAppJobInvocationFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "app_job_invocation_ref01" }, "m": { "app_id": "app01", "job_invocation_id": "job_invocation01" }, "o": "create", "s": [], "v": [], "index$": 0 }, { "a": true, "d": {}, "i": {}, "m": { "app_id": "app01" }, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "app_job_invocation_ref01" } }], "index$": 1 }, { "a": true, "d": {}, "i": { "ref": "app_job_invocation_ref01", "srcdatavar": "app_job_invocation_ref01_data", "suffix": "_dt0" }, "m": { "app_id": "app01", "id": "app_job_invocation01" }, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-app_job_invocation_ref01" } }], "index$": 2 }] }, 'AppJobInvocation', { "POST /v2/apps/{app_id}/job-invocations/{job_invocation_id}/cancel": { "protocol": "http", "parameters": [{ "description": "The app ID", "in": "path", "name": "app_id", "required": true, "schema": { "type": "string" }, "example": "4f6c71e2-1e90-4762-9fee-6cc4a0a9f2cf", "x-ref": "#/components/parameters/app_id", "index$": 0 }, { "description": "The ID of the job invocation to retrieve.", "in": "path", "name": "job_invocation_id", "required": true, "schema": { "type": "string" }, "example": "123e4567-e89b-12d3-a456-426", "x-ref": "#/components/parameters/job_invocation_id", "index$": 1 }, { "description": "The job name to list job invocations for.", "in": "query", "name": "job_name", "required": false, "schema": { "type": "string" }, "example": "component", "x-ref": "#/components/parameters/job_name", "index$": 2 }] }, "GET /v2/apps/{app_id}/job-invocations": { "protocol": "http", "parameters": [{ "description": "The app ID", "in": "path", "name": "app_id", "required": true, "schema": { "type": "string" }, "example": "4f6c71e2-1e90-4762-9fee-6cc4a0a9f2cf", "x-ref": "#/components/parameters/app_id", "index$": 0 }, { "description": "The job names to list job invocations for.", "in": "query", "name": "job_names", "required": false, "schema": { "type": "array", "items": { "type": "string", "x-ref": "#/components/schemas/schema" } }, "example": ["component1", "component2"], "x-ref": "#/components/parameters/job_names", "index$": 1 }, { "description": "The deployment ID", "in": "query", "name": "deployment_id", "required": false, "schema": { "type": "string" }, "example": "3aa4d20e-5527-4c00-b496-601fbd22520a", "index$": 2 }, { "in": "query", "name": "page", "required": false, "description": "Which 'page' of paginated results to return.", "schema": { "type": "integer", "minimum": 1, "default": 1 }, "example": 1, "x-ref": "#/components/parameters/page", "index$": 3 }, { "in": "query", "name": "per_page", "required": false, "description": "Number of items returned per page", "schema": { "type": "integer", "minimum": 1, "default": 20, "maximum": 200 }, "example": 2, "x-ref": "#/components/parameters/parameters_per_page", "index$": 4 }] }, "GET /v2/apps/{app_id}/job-invocations/{job_invocation_id}": { "protocol": "http", "parameters": [{ "description": "The app ID", "in": "path", "name": "app_id", "required": true, "schema": { "type": "string" }, "example": "4f6c71e2-1e90-4762-9fee-6cc4a0a9f2cf", "x-ref": "#/components/parameters/app_id", "index$": 0 }, { "description": "The ID of the job invocation to retrieve.", "in": "path", "name": "job_invocation_id", "required": true, "schema": { "type": "string" }, "example": "123e4567-e89b-12d3-a456-426", "x-ref": "#/components/parameters/job_invocation_id", "index$": 1 }, { "description": "The job name to list job invocations for.", "in": "query", "name": "job_name", "required": false, "schema": { "type": "string" }, "example": "component", "x-ref": "#/components/parameters/job_name", "index$": 2 }] } }, { strict: LIVE_STRICT, t });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const app_job_invocation_ref01_ent = client.AppJobInvocation();
        let app_job_invocation_ref01_data = setup.data.new.app_job_invocation['app_job_invocation_ref01'];
        app_job_invocation_ref01_data['app_id'] = setup.idmap['app01'];
        app_job_invocation_ref01_data['job_invocation_id'] = setup.idmap['job_invocation01'];
        app_job_invocation_ref01_data = (await app_job_invocation_ref01_ent.create(app_job_invocation_ref01_data)).data();
        (0, node_assert_1.default)(null != app_job_invocation_ref01_data.id);
        // LIST
        const app_job_invocation_ref01_match = {};
        app_job_invocation_ref01_match['app_id'] = setup.idmap['app01'];
        const app_job_invocation_ref01_list = (await app_job_invocation_ref01_ent.list(app_job_invocation_ref01_match)).map((e) => e.data());
        (0, node_assert_1.default)(!isempty(select(app_job_invocation_ref01_list, { id: app_job_invocation_ref01_data.id })));
        // LOAD
        const app_job_invocation_ref01_match_dt0 = {};
        app_job_invocation_ref01_match_dt0.id = app_job_invocation_ref01_data.id;
        const app_job_invocation_ref01_data_dt0 = (await app_job_invocation_ref01_ent.load(app_job_invocation_ref01_match_dt0)).data();
        (0, node_assert_1.default)(app_job_invocation_ref01_data_dt0.id === app_job_invocation_ref01_data.id);
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
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/app_job_invocation/AppJobInvocationTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.DigitaloceanSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['app_job_invocation01', 'app_job_invocation02', 'app_job_invocation03', 'app01', 'app02', 'app03', 'job_invocation01'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'DIGITALOCEAN_TEST_APP_JOB_INVOCATION_ENTID': idmap,
        'DIGITALOCEAN_TEST_LIVE': 'FALSE',
        'DIGITALOCEAN_TEST_EXPLAIN': 'FALSE',
        'DIGITALOCEAN_APIKEY': '',
    });
    idmap = env['DIGITALOCEAN_TEST_APP_JOB_INVOCATION_ENTID'];
    const live = 'TRUE' === env.DIGITALOCEAN_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['DIGITALOCEAN_TEST_APP_JOB_INVOCATION_ENTID'];
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
//# sourceMappingURL=AppJobInvocationEntity.test.js.map