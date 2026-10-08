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
(0, node_test_1.describe)('ApiAgentVersionEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when DIGITALOCEAN_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('DIGITALOCEAN_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.DigitaloceanSDK.test();
        const ent = testsdk.ApiAgentVersion();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.DigitaloceanSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.ApiAgentVersion().list({ "agent_id": 1 }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.DIGITALOCEAN_TEST_LIVE;
        for (const op of ['list']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'api_agent_version.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "agent_uuid": { "a": true, "h": "Agent Uuid", "n": "agent_uuid", "r": false, "sh": "Uuid of the agent this version belongs to", "t": "`$STRING`", "key$": "agent_uuid", "index$": 0 }, "attached_child_agents": { "a": true, "h": "Attached Child Agents", "n": "attached_child_agents", "r": false, "sh": "List of child agent relationships", "t": "`$ARRAY`", "key$": "attached_child_agents", "index$": 1 }, "attached_functions": { "a": true, "h": "Attached Functions", "n": "attached_functions", "r": false, "sh": "List of function versions", "t": "`$ARRAY`", "key$": "attached_functions", "index$": 2 }, "attached_guardrails": { "a": true, "h": "Attached Guardrails", "n": "attached_guardrails", "r": false, "sh": "List of guardrail version", "t": "`$ARRAY`", "key$": "attached_guardrails", "index$": 3 }, "attached_knowledgebases": { "a": true, "h": "Attached Knowledgebases", "n": "attached_knowledgebases", "r": false, "sh": "List of knowledge base agent versions", "t": "`$ARRAY`", "key$": "attached_knowledgebases", "index$": 4 }, "can_rollback": { "a": true, "h": "Can Rollback", "n": "can_rollback", "r": false, "sh": "Whether the version is able to be rolled back to", "t": "`$BOOLEAN`", "key$": "can_rollback", "index$": 5 }, "created_at": { "a": true, "fo": "date-time", "h": "Created At", "n": "created_at", "r": false, "sh": "Creation date", "t": "`$STRING`", "key$": "created_at", "index$": 6 }, "created_by_email": { "a": true, "h": "Created By Email", "n": "created_by_email", "r": false, "sh": "User who created this version", "t": "`$STRING`", "key$": "created_by_email", "index$": 7 }, "currently_applied": { "a": true, "h": "Currently Applied", "n": "currently_applied", "r": false, "sh": "Whether this is the currently applied configuration", "t": "`$BOOLEAN`", "key$": "currently_applied", "index$": 8 }, "description": { "a": true, "h": "Description", "n": "description", "r": false, "sh": "Description of the agent", "t": "`$STRING`", "key$": "description", "index$": 9 }, "id": { "a": true, "fo": "uint64", "h": "Id", "n": "id", "r": false, "sh": "Unique identifier", "t": "`$STRING`", "key$": "id", "index$": 10 }, "instruction": { "a": true, "h": "Instruction", "n": "instruction", "r": false, "sh": "Instruction for the agent", "t": "`$STRING`", "key$": "instruction", "index$": 11 }, "k": { "a": true, "fo": "int64", "h": "K", "n": "k", "r": false, "sh": "K value for the agent's configuration", "t": "`$INTEGER`", "key$": "k", "index$": 12 }, "max_tokens": { "a": true, "fo": "int64", "h": "Max Tokens", "n": "max_tokens", "r": false, "sh": "Max tokens setting for the agent", "t": "`$INTEGER`", "key$": "max_tokens", "index$": 13 }, "model_name": { "a": true, "h": "Model Name", "n": "model_name", "r": false, "sh": "Name of model associated to the agent version", "t": "`$STRING`", "key$": "model_name", "index$": 14 }, "name": { "a": true, "h": "Name", "n": "name", "r": false, "sh": "Name of the agent", "t": "`$STRING`", "key$": "name", "index$": 15 }, "provide_citations": { "a": true, "h": "Provide Citations", "n": "provide_citations", "r": false, "sh": "Whether the agent should provide in-response citations", "t": "`$BOOLEAN`", "key$": "provide_citations", "index$": 16 }, "retrieval_method": { "a": true, "h": "Retrieval Method", "n": "retrieval_method", "r": false, "sh": "- RETRIEVAL_METHOD_UNKNOWN: The retrieval method is unknown - RETRIEVAL_METHOD_REWRITE: The retrieval method is rewrite - RETRIEVAL_METHOD_STEP_BACK: The retrieval method is step back - RETRIEVAL_METHOD_SUB_QUERIES: The retrieval method is…", "t": "`$STRING`", "key$": "retrieval_method", "index$": 17 }, "tags": { "a": true, "h": "Tags", "n": "tags", "r": false, "sh": "Tags associated with the agent", "t": "`$ARRAY`", "key$": "tags", "index$": 18 }, "temperature": { "a": true, "fo": "float", "h": "Temperature", "n": "temperature", "r": false, "sh": "Temperature setting for the agent", "t": "`$NUMBER`", "key$": "temperature", "index$": 19 }, "top_p": { "a": true, "fo": "float", "h": "Top P", "n": "top_p", "r": false, "sh": "Top_p setting for the agent", "t": "`$NUMBER`", "key$": "top_p", "index$": 20 }, "trigger_action": { "a": true, "h": "Trigger Action", "n": "trigger_action", "r": false, "sh": "Action triggering the configuration update", "t": "`$STRING`", "key$": "trigger_action", "index$": 21 }, "version_hash": { "a": true, "h": "Version Hash", "n": "version_hash", "r": false, "sh": "Version hash", "t": "`$STRING`", "key$": "version_hash", "index$": 22 } }, "id": { "field": "id", "name": "id" }, "name": "api_agent_version", "op": { "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /v2/gen-ai/agents/{uuid}/versions", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "ex": "\"123e4567-e89b-12d3-a456-426614174000\"", "k": "param", "n": "agent_id", "or": "uuid", "r": true, "t": "`$STRING`", "index$": 0 }], "query": [{ "a": true, "ex": 1, "k": "query", "n": "page", "or": "page", "r": false, "t": "`$INTEGER`", "index$": 0 }, { "a": true, "ex": 1, "k": "query", "n": "per_page", "or": "per_page", "r": false, "t": "`$INTEGER`", "index$": 1 }] }, "k": "http", "m": "GET", "o": "/v2/gen-ai/agents/{uuid}/versions", "q": { "exist": ["agent_id"] }, "r": { "param": { "uuid": "agent_id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "v2" }, { "lit": "gen-ai" }, { "lit": "agents" }, { "var": "agent_id" }, { "lit": "versions" }], "t": { "req": "`reqdata`", "res": "`body.agent_versions`" }, "index$": 0 }], "key$": "list" } }, "relations": { "ancestors": [] }, "key$": "api_agent_version", "name__orig": "api_agent_version", "Name": "ApiAgentVersion", "name_": "api_agent_version", "name-": "api-agent-version", "NAME": "API_AGENT_VERSION", "index$": 5 }, { "active": true, "entity": "api_agent_version", "key$": "BasicApiAgentVersionFlow", "kind": "basic", "name": "BasicApiAgentVersionFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": {}, "m": { "agent_id": "agent01" }, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "api_agent_version_ref01" } }], "index$": 0 }] }, 'ApiAgentVersion', { "GET /v2/gen-ai/agents/{uuid}/versions": { "protocol": "http", "parameters": [{ "description": "Agent uuid", "example": "\"123e4567-e89b-12d3-a456-426614174000\"", "in": "path", "name": "uuid", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "description": "Page number.", "example": 1, "in": "query", "name": "page", "schema": { "type": "integer" }, "index$": 1 }, { "description": "Items per page.", "example": 1, "in": "query", "name": "per_page", "schema": { "type": "integer" }, "index$": 2 }] } }, { strict: LIVE_STRICT, t });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let api_agent_version_ref01_data = Object.values(setup.data.existing.api_agent_version)[0];
        // LIST
        const api_agent_version_ref01_ent = client.ApiAgentVersion();
        const api_agent_version_ref01_match = {};
        api_agent_version_ref01_match['agent_id'] = setup.idmap['agent01'];
        const api_agent_version_ref01_list = (await api_agent_version_ref01_ent.list(api_agent_version_ref01_match)).map((e) => e.data());
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
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/api_agent_version/ApiAgentVersionTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.DigitaloceanSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['api_agent_version01', 'api_agent_version02', 'api_agent_version03', 'agent01'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'DIGITALOCEAN_TEST_API_AGENT_VERSION_ENTID': idmap,
        'DIGITALOCEAN_TEST_LIVE': 'FALSE',
        'DIGITALOCEAN_TEST_EXPLAIN': 'FALSE',
        'DIGITALOCEAN_APIKEY': '',
    });
    idmap = env['DIGITALOCEAN_TEST_API_AGENT_VERSION_ENTID'];
    const live = 'TRUE' === env.DIGITALOCEAN_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['DIGITALOCEAN_TEST_API_AGENT_VERSION_ENTID'];
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
//# sourceMappingURL=ApiAgentVersionEntity.test.js.map