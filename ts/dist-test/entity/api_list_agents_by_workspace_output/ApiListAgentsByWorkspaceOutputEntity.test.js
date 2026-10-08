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
(0, node_test_1.describe)('ApiListAgentsByWorkspaceOutputEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when DIGITALOCEAN_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('DIGITALOCEAN_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.DigitaloceanSDK.test();
        const ent = testsdk.ApiListAgentsByWorkspaceOutput();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.DigitaloceanSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.ApiListAgentsByWorkspaceOutput().list({ "workspace_id": 1 }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.DIGITALOCEAN_TEST_LIVE;
        for (const op of ['list']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'api_list_agents_by_workspace_output.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "anthropic_api_key": { "a": true, "h": "Anthropic Api Key", "n": "anthropic_api_key", "r": false, "sh": "Anthropic API Key Info", "t": "`$OBJECT`", "key$": "anthropic_api_key", "index$": 0 }, "api_key_infos": { "a": true, "h": "Api Key Infos", "n": "api_key_infos", "r": false, "sh": "Api key infos", "t": "`$ARRAY`", "key$": "api_key_infos", "index$": 1 }, "api_keys": { "a": true, "h": "Api Keys", "n": "api_keys", "r": false, "sh": "Api keys", "t": "`$ARRAY`", "key$": "api_keys", "index$": 2 }, "chatbot": { "a": true, "h": "Chatbot", "n": "chatbot", "r": false, "sh": "A Chatbot", "t": "`$OBJECT`", "key$": "chatbot", "index$": 3 }, "chatbot_identifiers": { "a": true, "h": "Chatbot Identifiers", "n": "chatbot_identifiers", "r": false, "sh": "Chatbot identifiers", "t": "`$ARRAY`", "key$": "chatbot_identifiers", "index$": 4 }, "child_agents": { "a": true, "h": "Child Agents", "n": "child_agents", "r": false, "sh": "Child agents", "t": "`$ARRAY`", "key$": "child_agents", "index$": 5 }, "conversation_logs_enabled": { "a": true, "h": "Conversation Logs Enabled", "n": "conversation_logs_enabled", "r": false, "sh": "Whether conversation logs are enabled for the agent", "t": "`$BOOLEAN`", "key$": "conversation_logs_enabled", "index$": 6 }, "created_at": { "a": true, "fo": "date-time", "h": "Created At", "n": "created_at", "r": false, "sh": "Creation date / time", "t": "`$STRING`", "key$": "created_at", "index$": 7 }, "deployment": { "a": true, "h": "Deployment", "n": "deployment", "r": false, "sh": "Description of deployment", "t": "`$OBJECT`", "key$": "deployment", "index$": 8 }, "description": { "a": true, "h": "Description", "n": "description", "r": false, "sh": "Description of agent", "t": "`$STRING`", "key$": "description", "index$": 9 }, "functions": { "a": true, "h": "Functions", "n": "functions", "r": false, "t": "`$ARRAY`", "key$": "functions", "index$": 10 }, "guardrails": { "a": true, "h": "Guardrails", "n": "guardrails", "r": false, "sh": "The guardrails the agent is attached to", "t": "`$ARRAY`", "key$": "guardrails", "index$": 11 }, "if_case": { "a": true, "h": "If Case", "n": "if_case", "r": false, "t": "`$STRING`", "key$": "if_case", "index$": 12 }, "instruction": { "a": true, "h": "Instruction", "n": "instruction", "r": false, "sh": "Agent instruction.", "t": "`$STRING`", "key$": "instruction", "index$": 13 }, "k": { "a": true, "fo": "int64", "h": "K", "n": "k", "r": false, "t": "`$INTEGER`", "key$": "k", "index$": 14 }, "knowledge_bases": { "a": true, "h": "Knowledge Bases", "n": "knowledge_bases", "r": false, "sh": "Knowledge bases", "t": "`$ARRAY`", "key$": "knowledge_bases", "index$": 15 }, "logging_config": { "a": true, "h": "Logging Config", "n": "logging_config", "r": false, "t": "`$OBJECT`", "key$": "logging_config", "index$": 16 }, "max_tokens": { "a": true, "fo": "int64", "h": "Max Tokens", "n": "max_tokens", "r": false, "t": "`$INTEGER`", "key$": "max_tokens", "index$": 17 }, "mcp_servers": { "a": true, "h": "Mcp Servers", "n": "mcp_servers", "r": false, "sh": "MCP (Model Context Protocol) servers attached to this agent", "t": "`$ARRAY`", "key$": "mcp_servers", "index$": 18 }, "model": { "a": true, "h": "Model", "n": "model", "r": false, "sh": "Description of a Model", "t": "`$OBJECT`", "key$": "model", "index$": 19 }, "model_provider_key": { "a": true, "h": "Model Provider Key", "n": "model_provider_key", "r": false, "t": "`$OBJECT`", "key$": "model_provider_key", "index$": 20 }, "model_router": { "a": true, "h": "Model Router", "n": "model_router", "r": false, "sh": "Model router", "t": "`$OBJECT`", "key$": "model_router", "index$": 21 }, "name": { "a": true, "h": "Name", "n": "name", "r": false, "sh": "Agent name", "t": "`$STRING`", "key$": "name", "index$": 22 }, "openai_api_key": { "a": true, "h": "Openai Api Key", "n": "openai_api_key", "r": false, "sh": "OpenAI API Key Info", "t": "`$OBJECT`", "key$": "openai_api_key", "index$": 23 }, "parent_agents": { "a": true, "h": "Parent Agents", "n": "parent_agents", "r": false, "sh": "Parent agents", "t": "`$ARRAY`", "key$": "parent_agents", "index$": 24 }, "project_id": { "a": true, "h": "Project Id", "n": "project_id", "r": false, "t": "`$STRING`", "key$": "project_id", "index$": 25 }, "provide_citations": { "a": true, "h": "Provide Citations", "n": "provide_citations", "r": false, "sh": "Whether the agent should provide in-response citations", "t": "`$BOOLEAN`", "key$": "provide_citations", "index$": 26 }, "reasoning_effort": { "a": true, "h": "Reasoning Effort", "n": "reasoning_effort", "r": false, "sh": "The reasoning effort for the agent", "t": "`$STRING`", "key$": "reasoning_effort", "index$": 27 }, "region": { "a": true, "h": "Region", "n": "region", "r": false, "sh": "Region code", "t": "`$STRING`", "key$": "region", "index$": 28 }, "retrieval_method": { "a": true, "h": "Retrieval Method", "n": "retrieval_method", "r": false, "sh": "- RETRIEVAL_METHOD_UNKNOWN: The retrieval method is unknown - RETRIEVAL_METHOD_REWRITE: The retrieval method is rewrite - RETRIEVAL_METHOD_STEP_BACK: The retrieval method is step back - RETRIEVAL_METHOD_SUB_QUERIES: The retrieval method is…", "t": "`$STRING`", "key$": "retrieval_method", "index$": 29 }, "route_created_at": { "a": true, "fo": "date-time", "h": "Route Created At", "n": "route_created_at", "r": false, "sh": "Creation of route date / time", "t": "`$STRING`", "key$": "route_created_at", "index$": 30 }, "route_created_by": { "a": true, "fo": "uint64", "h": "Route Created By", "n": "route_created_by", "r": false, "t": "`$STRING`", "key$": "route_created_by", "index$": 31 }, "route_name": { "a": true, "h": "Route Name", "n": "route_name", "r": false, "sh": "Route name", "t": "`$STRING`", "key$": "route_name", "index$": 32 }, "route_uuid": { "a": true, "h": "Route Uuid", "n": "route_uuid", "r": false, "t": "`$STRING`", "key$": "route_uuid", "index$": 33 }, "tags": { "a": true, "h": "Tags", "n": "tags", "r": false, "sh": "Agent tag to organize related resources", "t": "`$ARRAY`", "key$": "tags", "index$": 34 }, "temperature": { "a": true, "fo": "float", "h": "Temperature", "n": "temperature", "r": false, "t": "`$NUMBER`", "key$": "temperature", "index$": 35 }, "template": { "a": true, "h": "Template", "n": "template", "r": false, "sh": "Represents an AgentTemplate entity", "t": "`$OBJECT`", "key$": "template", "index$": 36 }, "thinking_token_budget": { "a": true, "fo": "int64", "h": "Thinking Token Budget", "n": "thinking_token_budget", "r": false, "sh": "The thinking token budget for Anthropic extended thinking (0 = disabled)", "t": "`$INTEGER`", "key$": "thinking_token_budget", "index$": 37 }, "top_p": { "a": true, "fo": "float", "h": "Top P", "n": "top_p", "r": false, "t": "`$NUMBER`", "key$": "top_p", "index$": 38 }, "updated_at": { "a": true, "fo": "date-time", "h": "Updated At", "n": "updated_at", "r": false, "sh": "Last modified", "t": "`$STRING`", "key$": "updated_at", "index$": 39 }, "url": { "a": true, "h": "Url", "n": "url", "r": false, "sh": "Access your agent under this url", "t": "`$STRING`", "key$": "url", "index$": 40 }, "user_id": { "a": true, "fo": "uint64", "h": "User Id", "n": "user_id", "r": false, "sh": "Id of user that created the agent", "t": "`$STRING`", "key$": "user_id", "index$": 41 }, "uuid": { "a": true, "h": "Uuid", "n": "uuid", "r": false, "sh": "Unique agent id", "t": "`$STRING`", "key$": "uuid", "index$": 42 }, "version_hash": { "a": true, "h": "Version Hash", "n": "version_hash", "r": false, "sh": "The latest version of the agent", "t": "`$STRING`", "key$": "version_hash", "index$": 43 }, "vpc_egress_ips": { "a": true, "h": "Vpc Egress Ips", "n": "vpc_egress_ips", "r": false, "sh": "VPC Egress IPs", "t": "`$ARRAY`", "key$": "vpc_egress_ips", "index$": 44 }, "vpc_uuid": { "a": true, "h": "Vpc Uuid", "n": "vpc_uuid", "r": false, "t": "`$STRING`", "key$": "vpc_uuid", "index$": 45 }, "web_fetch_enabled": { "a": true, "h": "Web Fetch Enabled", "n": "web_fetch_enabled", "r": false, "sh": "Whether this agent can use the built-in web_fetch tool.", "t": "`$BOOLEAN`", "key$": "web_fetch_enabled", "index$": 46 }, "web_search_enabled": { "a": true, "h": "Web Search Enabled", "n": "web_search_enabled", "r": false, "sh": "Whether this agent can use the built-in web_search tool.", "t": "`$BOOLEAN`", "key$": "web_search_enabled", "index$": 47 }, "workspace": { "a": true, "h": "Workspace", "n": "workspace", "r": false, "t": "`$OBJECT`", "key$": "workspace", "index$": 48 } }, "name": "api_list_agents_by_workspace_output", "op": { "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /v2/gen-ai/workspaces/{workspace_uuid}/agents", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "ex": "\"123e4567-e89b-12d3-a456-426614174000\"", "k": "param", "n": "workspace_id", "or": "workspace_uuid", "r": true, "t": "`$STRING`", "index$": 0 }], "query": [{ "a": true, "ex": true, "k": "query", "n": "only_deployed", "or": "only_deployed", "r": false, "t": "`$BOOLEAN`", "index$": 0 }, { "a": true, "ex": 1, "k": "query", "n": "page", "or": "page", "r": false, "t": "`$INTEGER`", "index$": 1 }, { "a": true, "ex": 1, "k": "query", "n": "per_page", "or": "per_page", "r": false, "t": "`$INTEGER`", "index$": 2 }] }, "k": "http", "m": "GET", "o": "/v2/gen-ai/workspaces/{workspace_uuid}/agents", "q": { "exist": ["workspace_id"] }, "r": { "param": { "workspace_uuid": "workspace_id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "v2" }, { "lit": "gen-ai" }, { "lit": "workspaces" }, { "var": "workspace_id" }, { "lit": "agents" }], "t": { "req": "`reqdata`", "res": "`body.agents`" }, "index$": 0 }], "key$": "list" } }, "relations": { "ancestors": [] }, "key$": "api_list_agents_by_workspace_output", "name__orig": "api_list_agents_by_workspace_output", "Name": "ApiListAgentsByWorkspaceOutput", "name_": "api_list_agents_by_workspace_output", "name-": "api-list-agents-by-workspace-output", "NAME": "API_LIST_AGENTS_BY_WORKSPACE_OUTPUT", "index$": 61 }, { "active": true, "entity": "api_list_agents_by_workspace_output", "key$": "BasicApiListAgentsByWorkspaceOutputFlow", "kind": "basic", "name": "BasicApiListAgentsByWorkspaceOutputFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": {}, "m": { "workspace_id": "workspace01" }, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "api_list_agents_by_workspace_output_ref01" } }], "index$": 0 }] }, 'ApiListAgentsByWorkspaceOutput', { "GET /v2/gen-ai/workspaces/{workspace_uuid}/agents": { "protocol": "http", "parameters": [{ "description": "Workspace UUID.", "example": "\"123e4567-e89b-12d3-a456-426614174000\"", "in": "path", "name": "workspace_uuid", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "description": "Only list agents that are deployed.", "example": true, "in": "query", "name": "only_deployed", "schema": { "type": "boolean" }, "index$": 1 }, { "description": "Page number.", "example": 1, "in": "query", "name": "page", "schema": { "type": "integer" }, "index$": 2 }, { "description": "Items per page.", "example": 1, "in": "query", "name": "per_page", "schema": { "type": "integer" }, "index$": 3 }] } }, { strict: LIVE_STRICT, t });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let api_list_agents_by_workspace_output_ref01_data = Object.values(setup.data.existing.api_list_agents_by_workspace_output)[0];
        // LIST
        const api_list_agents_by_workspace_output_ref01_ent = client.ApiListAgentsByWorkspaceOutput();
        const api_list_agents_by_workspace_output_ref01_match = {};
        api_list_agents_by_workspace_output_ref01_match['workspace_id'] = setup.idmap['workspace01'];
        const api_list_agents_by_workspace_output_ref01_list = (await api_list_agents_by_workspace_output_ref01_ent.list(api_list_agents_by_workspace_output_ref01_match)).map((e) => e.data());
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
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/api_list_agents_by_workspace_output/ApiListAgentsByWorkspaceOutputTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.DigitaloceanSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['api_list_agents_by_workspace_output01', 'api_list_agents_by_workspace_output02', 'api_list_agents_by_workspace_output03', 'workspace01'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'DIGITALOCEAN_TEST_API_LIST_AGENTS_BY_WORKSPACE_OUTPUT_ENTID': idmap,
        'DIGITALOCEAN_TEST_LIVE': 'FALSE',
        'DIGITALOCEAN_TEST_EXPLAIN': 'FALSE',
        'DIGITALOCEAN_APIKEY': '',
    });
    idmap = env['DIGITALOCEAN_TEST_API_LIST_AGENTS_BY_WORKSPACE_OUTPUT_ENTID'];
    const live = 'TRUE' === env.DIGITALOCEAN_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['DIGITALOCEAN_TEST_API_LIST_AGENTS_BY_WORKSPACE_OUTPUT_ENTID'];
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
//# sourceMappingURL=ApiListAgentsByWorkspaceOutputEntity.test.js.map