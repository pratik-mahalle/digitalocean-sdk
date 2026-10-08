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
(0, node_test_1.describe)('ApiUpdateAgentFunctionOutputEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when DIGITALOCEAN_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('DIGITALOCEAN_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.DigitaloceanSDK.test();
        const ent = testsdk.ApiUpdateAgentFunctionOutput();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.DigitaloceanSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.ApiUpdateAgentFunctionOutput().update({ "agent_id": 1, "function_uuid": "x" }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.DIGITALOCEAN_TEST_LIVE;
        for (const op of []) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'api_update_agent_function_output.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "agent_uuid": { "a": true, "h": "Agent Uuid", "n": "agent_uuid", "r": false, "sh": "Agent id", "t": "`$STRING`", "key$": "agent_uuid", "index$": 0 }, "anthropic_api_key": { "a": true, "h": "Anthropic Api Key", "n": "anthropic_api_key", "r": false, "sh": "Anthropic API Key Info", "t": "`$OBJECT`", "key$": "anthropic_api_key", "index$": 1 }, "api_key_infos": { "a": true, "h": "Api Key Infos", "n": "api_key_infos", "r": false, "sh": "Api key infos", "t": "`$ARRAY`", "key$": "api_key_infos", "index$": 2 }, "api_keys": { "a": true, "h": "Api Keys", "n": "api_keys", "r": false, "sh": "Api keys", "t": "`$ARRAY`", "key$": "api_keys", "index$": 3 }, "chatbot": { "a": true, "h": "Chatbot", "n": "chatbot", "r": false, "sh": "A Chatbot", "t": "`$OBJECT`", "key$": "chatbot", "index$": 4 }, "chatbot_identifiers": { "a": true, "h": "Chatbot Identifiers", "n": "chatbot_identifiers", "r": false, "sh": "Chatbot identifiers", "t": "`$ARRAY`", "key$": "chatbot_identifiers", "index$": 5 }, "child_agents": { "a": true, "h": "Child Agents", "n": "child_agents", "r": false, "sh": "Child agents", "t": "`$ARRAY`", "key$": "child_agents", "index$": 6 }, "conversation_logs_enabled": { "a": true, "h": "Conversation Logs Enabled", "n": "conversation_logs_enabled", "r": false, "sh": "Whether conversation logs are enabled for the agent", "t": "`$BOOLEAN`", "key$": "conversation_logs_enabled", "index$": 7 }, "created_at": { "a": true, "fo": "date-time", "h": "Created At", "n": "created_at", "r": false, "sh": "Creation date / time", "t": "`$STRING`", "key$": "created_at", "index$": 8 }, "deployment": { "a": true, "h": "Deployment", "n": "deployment", "r": false, "sh": "Description of deployment", "t": "`$OBJECT`", "key$": "deployment", "index$": 9 }, "description": { "a": true, "h": "Description", "n": "description", "r": false, "sh": "Description of agent", "t": "`$STRING`", "key$": "description", "index$": 10 }, "faas_name": { "a": true, "h": "Faas Name", "n": "faas_name", "r": false, "sh": "The name of the function in the DigitalOcean functions platform", "t": "`$STRING`", "key$": "faas_name", "index$": 11 }, "faas_namespace": { "a": true, "h": "Faas Namespace", "n": "faas_namespace", "r": false, "sh": "The namespace of the function in the DigitalOcean functions platform", "t": "`$STRING`", "key$": "faas_namespace", "index$": 12 }, "function_name": { "a": true, "h": "Function Name", "n": "function_name", "r": false, "sh": "Function name", "t": "`$STRING`", "key$": "function_name", "index$": 13 }, "function_uuid": { "a": true, "h": "Function Uuid", "n": "function_uuid", "r": false, "sh": "Function id", "t": "`$STRING`", "key$": "function_uuid", "index$": 14 }, "functions": { "a": true, "h": "Functions", "n": "functions", "r": false, "t": "`$ARRAY`", "key$": "functions", "index$": 15 }, "guardrails": { "a": true, "h": "Guardrails", "n": "guardrails", "r": false, "sh": "The guardrails the agent is attached to", "t": "`$ARRAY`", "key$": "guardrails", "index$": 16 }, "if_case": { "a": true, "h": "If Case", "n": "if_case", "r": false, "t": "`$STRING`", "key$": "if_case", "index$": 17 }, "input_schema": { "a": true, "h": "Input Schema", "n": "input_schema", "r": false, "sh": "Describe the input schema for the function so the agent may call it", "t": "`$OBJECT`", "key$": "input_schema", "index$": 18 }, "instruction": { "a": true, "h": "Instruction", "n": "instruction", "r": false, "sh": "Agent instruction.", "t": "`$STRING`", "key$": "instruction", "index$": 19 }, "k": { "a": true, "fo": "int64", "h": "K", "n": "k", "r": false, "t": "`$INTEGER`", "key$": "k", "index$": 20 }, "knowledge_bases": { "a": true, "h": "Knowledge Bases", "n": "knowledge_bases", "r": false, "sh": "Knowledge bases", "t": "`$ARRAY`", "key$": "knowledge_bases", "index$": 21 }, "logging_config": { "a": true, "h": "Logging Config", "n": "logging_config", "r": false, "t": "`$OBJECT`", "key$": "logging_config", "index$": 22 }, "max_tokens": { "a": true, "fo": "int64", "h": "Max Tokens", "n": "max_tokens", "r": false, "t": "`$INTEGER`", "key$": "max_tokens", "index$": 23 }, "mcp_servers": { "a": true, "h": "Mcp Servers", "n": "mcp_servers", "r": false, "sh": "MCP (Model Context Protocol) servers attached to this agent", "t": "`$ARRAY`", "key$": "mcp_servers", "index$": 24 }, "model": { "a": true, "h": "Model", "n": "model", "r": false, "sh": "Description of a Model", "t": "`$OBJECT`", "key$": "model", "index$": 25 }, "model_provider_key": { "a": true, "h": "Model Provider Key", "n": "model_provider_key", "r": false, "t": "`$OBJECT`", "key$": "model_provider_key", "index$": 26 }, "model_router": { "a": true, "h": "Model Router", "n": "model_router", "r": false, "sh": "Model router", "t": "`$OBJECT`", "key$": "model_router", "index$": 27 }, "name": { "a": true, "h": "Name", "n": "name", "r": false, "sh": "Agent name", "t": "`$STRING`", "key$": "name", "index$": 28 }, "openai_api_key": { "a": true, "h": "Openai Api Key", "n": "openai_api_key", "r": false, "sh": "OpenAI API Key Info", "t": "`$OBJECT`", "key$": "openai_api_key", "index$": 29 }, "output_schema": { "a": true, "h": "Output Schema", "n": "output_schema", "r": false, "sh": "Describe the output schema for the function so the agent handle its response", "t": "`$OBJECT`", "key$": "output_schema", "index$": 30 }, "parent_agents": { "a": true, "h": "Parent Agents", "n": "parent_agents", "r": false, "sh": "Parent agents", "t": "`$ARRAY`", "key$": "parent_agents", "index$": 31 }, "project_id": { "a": true, "h": "Project Id", "n": "project_id", "r": false, "t": "`$STRING`", "key$": "project_id", "index$": 32 }, "provide_citations": { "a": true, "h": "Provide Citations", "n": "provide_citations", "r": false, "sh": "Whether the agent should provide in-response citations", "t": "`$BOOLEAN`", "key$": "provide_citations", "index$": 33 }, "reasoning_effort": { "a": true, "h": "Reasoning Effort", "n": "reasoning_effort", "r": false, "sh": "The reasoning effort for the agent", "t": "`$STRING`", "key$": "reasoning_effort", "index$": 34 }, "region": { "a": true, "h": "Region", "n": "region", "r": false, "sh": "Region code", "t": "`$STRING`", "key$": "region", "index$": 35 }, "retrieval_method": { "a": true, "h": "Retrieval Method", "n": "retrieval_method", "r": false, "sh": "- RETRIEVAL_METHOD_UNKNOWN: The retrieval method is unknown - RETRIEVAL_METHOD_REWRITE: The retrieval method is rewrite - RETRIEVAL_METHOD_STEP_BACK: The retrieval method is step back - RETRIEVAL_METHOD_SUB_QUERIES: The retrieval method is…", "t": "`$STRING`", "key$": "retrieval_method", "index$": 36 }, "route_created_at": { "a": true, "fo": "date-time", "h": "Route Created At", "n": "route_created_at", "r": false, "sh": "Creation of route date / time", "t": "`$STRING`", "key$": "route_created_at", "index$": 37 }, "route_created_by": { "a": true, "fo": "uint64", "h": "Route Created By", "n": "route_created_by", "r": false, "t": "`$STRING`", "key$": "route_created_by", "index$": 38 }, "route_name": { "a": true, "h": "Route Name", "n": "route_name", "r": false, "sh": "Route name", "t": "`$STRING`", "key$": "route_name", "index$": 39 }, "route_uuid": { "a": true, "h": "Route Uuid", "n": "route_uuid", "r": false, "t": "`$STRING`", "key$": "route_uuid", "index$": 40 }, "tags": { "a": true, "h": "Tags", "n": "tags", "r": false, "sh": "Agent tag to organize related resources", "t": "`$ARRAY`", "key$": "tags", "index$": 41 }, "temperature": { "a": true, "fo": "float", "h": "Temperature", "n": "temperature", "r": false, "t": "`$NUMBER`", "key$": "temperature", "index$": 42 }, "template": { "a": true, "h": "Template", "n": "template", "r": false, "sh": "Represents an AgentTemplate entity", "t": "`$OBJECT`", "key$": "template", "index$": 43 }, "thinking_token_budget": { "a": true, "fo": "int64", "h": "Thinking Token Budget", "n": "thinking_token_budget", "r": false, "sh": "The thinking token budget for Anthropic extended thinking (0 = disabled)", "t": "`$INTEGER`", "key$": "thinking_token_budget", "index$": 44 }, "top_p": { "a": true, "fo": "float", "h": "Top P", "n": "top_p", "r": false, "t": "`$NUMBER`", "key$": "top_p", "index$": 45 }, "updated_at": { "a": true, "fo": "date-time", "h": "Updated At", "n": "updated_at", "r": false, "sh": "Last modified", "t": "`$STRING`", "key$": "updated_at", "index$": 46 }, "url": { "a": true, "h": "Url", "n": "url", "r": false, "sh": "Access your agent under this url", "t": "`$STRING`", "key$": "url", "index$": 47 }, "user_id": { "a": true, "fo": "uint64", "h": "User Id", "n": "user_id", "r": false, "sh": "Id of user that created the agent", "t": "`$STRING`", "key$": "user_id", "index$": 48 }, "uuid": { "a": true, "h": "Uuid", "n": "uuid", "r": false, "sh": "Unique agent id", "t": "`$STRING`", "key$": "uuid", "index$": 49 }, "version_hash": { "a": true, "h": "Version Hash", "n": "version_hash", "r": false, "sh": "The latest version of the agent", "t": "`$STRING`", "key$": "version_hash", "index$": 50 }, "vpc_egress_ips": { "a": true, "h": "Vpc Egress Ips", "n": "vpc_egress_ips", "r": false, "sh": "VPC Egress IPs", "t": "`$ARRAY`", "key$": "vpc_egress_ips", "index$": 51 }, "vpc_uuid": { "a": true, "h": "Vpc Uuid", "n": "vpc_uuid", "r": false, "t": "`$STRING`", "key$": "vpc_uuid", "index$": 52 }, "web_fetch_enabled": { "a": true, "h": "Web Fetch Enabled", "n": "web_fetch_enabled", "r": false, "sh": "Whether this agent can use the built-in web_fetch tool.", "t": "`$BOOLEAN`", "key$": "web_fetch_enabled", "index$": 53 }, "web_search_enabled": { "a": true, "h": "Web Search Enabled", "n": "web_search_enabled", "r": false, "sh": "Whether this agent can use the built-in web_search tool.", "t": "`$BOOLEAN`", "key$": "web_search_enabled", "index$": 54 }, "workspace": { "a": true, "h": "Workspace", "n": "workspace", "r": false, "t": "`$OBJECT`", "key$": "workspace", "index$": 55 } }, "name": "api_update_agent_function_output", "op": { "update": { "input": "data", "name": "update", "points": [{ "a": true, "co": { "id": "PUT /v2/gen-ai/agents/{agent_uuid}/functions/{function_uuid}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "ex": "\"123e4567-e89b-12d3-a456-426614174000\"", "k": "param", "n": "agent_id", "or": "agent_uuid", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "ex": "\"123e4567-e89b-12d3-a456-426614174000\"", "k": "param", "n": "function_uuid", "or": "function_uuid", "r": true, "t": "`$STRING`", "index$": 1 }] }, "k": "http", "m": "PUT", "o": "/v2/gen-ai/agents/{agent_uuid}/functions/{function_uuid}", "q": { "exist": ["agent_id", "function_uuid"] }, "r": { "param": { "agent_uuid": "agent_id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "v2" }, { "lit": "gen-ai" }, { "lit": "agents" }, { "var": "agent_id" }, { "lit": "functions" }, { "var": "function_uuid" }], "t": { "req": "`reqdata`", "res": "`body.agent`" }, "index$": 0 }], "key$": "update" } }, "relations": { "ancestors": [] }, "key$": "api_update_agent_function_output", "name__orig": "api_update_agent_function_output", "Name": "ApiUpdateAgentFunctionOutput", "name_": "api_update_agent_function_output", "name-": "api-update-agent-function-output", "NAME": "API_UPDATE_AGENT_FUNCTION_OUTPUT", "index$": 88 }, { "active": true, "entity": "api_update_agent_function_output", "key$": "BasicApiUpdateAgentFunctionOutputFlow", "kind": "basic", "name": "BasicApiUpdateAgentFunctionOutputFlow", "param": {}, "step": [{ "a": false, "d": { "agent_id": "agent01" }, "i": { "ref": "api_update_agent_function_output_ref01", "srcdatavar": "api_update_agent_function_output_ref01_data", "suffix": "_up0", "textfield": "agent_uuid" }, "m": {}, "o": "update", "s": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-api_update_agent_function_output_ref01" } }], "v": [], "unreachable": true }] }, 'ApiUpdateAgentFunctionOutput', { "PUT /v2/gen-ai/agents/{agent_uuid}/functions/{function_uuid}": { "protocol": "http", "requestBody": { "content": { "application/json": { "schema": { "description": "Information about updating an agent function", "properties": { "agent_uuid": { "description": "Agent id", "example": "\"12345678-1234-1234-1234-123456789012\"", "type": "string", "key$": "agent_uuid" }, "description": { "description": "Funciton description", "example": "\"My Function Description\"", "type": "string", "key$": "description" }, "faas_name": { "description": "The name of the function in the DigitalOcean functions platform", "example": "\"my-function\"", "type": "string", "key$": "faas_name" }, "faas_namespace": { "description": "The namespace of the function in the DigitalOcean functions platform", "example": "\"default\"", "type": "string", "key$": "faas_namespace" }, "function_name": { "description": "Function name", "example": "\"My Function\"", "type": "string", "key$": "function_name" }, "function_uuid": { "description": "Function id", "example": "\"12345678-1234-1234-1234-123456789012\"", "type": "string", "key$": "function_uuid" }, "input_schema": { "description": "Describe the input schema for the function so the agent may call it", "type": "object", "key$": "input_schema" }, "output_schema": { "description": "Describe the output schema for the function so the agent handle its response", "type": "object", "key$": "output_schema" } }, "type": "object", "x-ref": "#/components/schemas/apiUpdateAgentFunctionInputPublic", "index$": 1 } } } }, "parameters": [{ "description": "Agent id", "example": "\"123e4567-e89b-12d3-a456-426614174000\"", "in": "path", "name": "agent_uuid", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "description": "Function id", "example": "\"123e4567-e89b-12d3-a456-426614174000\"", "in": "path", "name": "function_uuid", "required": true, "schema": { "type": "string" }, "index$": 1 }] } }, { strict: LIVE_STRICT, t });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let api_update_agent_function_output_ref01_data = Object.values(setup.data.existing.api_update_agent_function_output)[0];
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
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/api_update_agent_function_output/ApiUpdateAgentFunctionOutputTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.DigitaloceanSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['api_update_agent_function_output01', 'api_update_agent_function_output02', 'api_update_agent_function_output03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'DIGITALOCEAN_TEST_API_UPDATE_AGENT_FUNCTION_OUTPUT_ENTID': idmap,
        'DIGITALOCEAN_TEST_LIVE': 'FALSE',
        'DIGITALOCEAN_TEST_EXPLAIN': 'FALSE',
        'DIGITALOCEAN_APIKEY': '',
    });
    idmap = env['DIGITALOCEAN_TEST_API_UPDATE_AGENT_FUNCTION_OUTPUT_ENTID'];
    const live = 'TRUE' === env.DIGITALOCEAN_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['DIGITALOCEAN_TEST_API_UPDATE_AGENT_FUNCTION_OUTPUT_ENTID'];
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
//# sourceMappingURL=ApiUpdateAgentFunctionOutputEntity.test.js.map