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
(0, node_test_1.describe)('ApiUpdateAgentOutputEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when DIGITALOCEAN_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('DIGITALOCEAN_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.DigitaloceanSDK.test();
        const ent = testsdk.ApiUpdateAgentOutput();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.DigitaloceanSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.ApiUpdateAgentOutput().update({ "uuid": 1 }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.DIGITALOCEAN_TEST_LIVE;
        for (const op of []) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'api_update_agent_output.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "agent_log_insights_enabled": { "a": true, "h": "Agent Log Insights Enabled", "n": "agent_log_insights_enabled", "r": false, "t": "`$BOOLEAN`", "key$": "agent_log_insights_enabled", "index$": 0 }, "allowed_domains": { "a": true, "h": "Allowed Domains", "n": "allowed_domains", "r": false, "sh": "Optional list of allowed domains for the chatbot - Must use fully qualified domain name (FQDN) such as https://example.com", "t": "`$ARRAY`", "key$": "allowed_domains", "index$": 1 }, "anthropic_api_key": { "a": true, "h": "Anthropic Api Key", "n": "anthropic_api_key", "r": false, "sh": "Anthropic API Key Info", "t": "`$OBJECT`", "key$": "anthropic_api_key", "index$": 2 }, "anthropic_key_uuid": { "a": true, "h": "Anthropic Key Uuid", "n": "anthropic_key_uuid", "r": false, "sh": "Optional anthropic key uuid for use with anthropic models", "t": "`$STRING`", "key$": "anthropic_key_uuid", "index$": 3 }, "api_key_infos": { "a": true, "h": "Api Key Infos", "n": "api_key_infos", "r": false, "sh": "Api key infos", "t": "`$ARRAY`", "key$": "api_key_infos", "index$": 4 }, "api_keys": { "a": true, "h": "Api Keys", "n": "api_keys", "r": false, "sh": "Api keys", "t": "`$ARRAY`", "key$": "api_keys", "index$": 5 }, "chatbot": { "a": true, "h": "Chatbot", "n": "chatbot", "r": false, "sh": "A Chatbot", "t": "`$OBJECT`", "key$": "chatbot", "index$": 6 }, "chatbot_identifiers": { "a": true, "h": "Chatbot Identifiers", "n": "chatbot_identifiers", "r": false, "sh": "Chatbot identifiers", "t": "`$ARRAY`", "key$": "chatbot_identifiers", "index$": 7 }, "child_agents": { "a": true, "h": "Child Agents", "n": "child_agents", "r": false, "sh": "Child agents", "t": "`$ARRAY`", "key$": "child_agents", "index$": 8 }, "clear_mcp_servers": { "a": true, "h": "Clear Mcp Servers", "n": "clear_mcp_servers", "r": false, "sh": "When true, removes all MCP servers from the agent.", "t": "`$BOOLEAN`", "key$": "clear_mcp_servers", "index$": 9 }, "conversation_logs_enabled": { "a": true, "h": "Conversation Logs Enabled", "n": "conversation_logs_enabled", "r": false, "sh": "Whether conversation logs are enabled for the agent", "t": "`$BOOLEAN`", "key$": "conversation_logs_enabled", "index$": 10 }, "created_at": { "a": true, "fo": "date-time", "h": "Created At", "n": "created_at", "r": false, "sh": "Creation date / time", "t": "`$STRING`", "key$": "created_at", "index$": 11 }, "deployment": { "a": true, "h": "Deployment", "n": "deployment", "r": false, "sh": "Description of deployment", "t": "`$OBJECT`", "key$": "deployment", "index$": 12 }, "description": { "a": true, "h": "Description", "n": "description", "r": false, "sh": "Description of agent", "t": "`$STRING`", "key$": "description", "index$": 13 }, "functions": { "a": true, "h": "Functions", "n": "functions", "r": false, "t": "`$ARRAY`", "key$": "functions", "index$": 14 }, "guardrails": { "a": true, "h": "Guardrails", "n": "guardrails", "r": false, "sh": "The guardrails the agent is attached to", "t": "`$ARRAY`", "key$": "guardrails", "index$": 15 }, "if_case": { "a": true, "h": "If Case", "n": "if_case", "r": false, "t": "`$STRING`", "key$": "if_case", "index$": 16 }, "instruction": { "a": true, "h": "Instruction", "n": "instruction", "r": false, "sh": "Agent instruction.", "t": "`$STRING`", "key$": "instruction", "index$": 17 }, "k": { "a": true, "fo": "int64", "h": "K", "n": "k", "r": false, "sh": "How many results should be considered from an attached knowledge base", "t": "`$INTEGER`", "key$": "k", "index$": 18 }, "knowledge_bases": { "a": true, "h": "Knowledge Bases", "n": "knowledge_bases", "r": false, "sh": "Knowledge bases", "t": "`$ARRAY`", "key$": "knowledge_bases", "index$": 19 }, "logging_config": { "a": true, "h": "Logging Config", "n": "logging_config", "r": false, "t": "`$OBJECT`", "key$": "logging_config", "index$": 20 }, "max_tokens": { "a": true, "fo": "int64", "h": "Max Tokens", "n": "max_tokens", "r": false, "sh": "Specifies the maximum number of tokens the model can process in a single input or output, set as a number between 1 and 512.", "t": "`$INTEGER`", "key$": "max_tokens", "index$": 21 }, "mcp_servers": { "a": true, "h": "Mcp Servers", "n": "mcp_servers", "r": false, "sh": "MCP (Model Context Protocol) servers attached to this agent", "t": "`$ARRAY`", "key$": "mcp_servers", "index$": 22 }, "model": { "a": true, "h": "Model", "n": "model", "r": false, "sh": "Description of a Model", "t": "`$OBJECT`", "key$": "model", "index$": 23 }, "model_provider_key": { "a": true, "h": "Model Provider Key", "n": "model_provider_key", "r": false, "t": "`$OBJECT`", "key$": "model_provider_key", "index$": 24 }, "model_provider_key_uuid": { "a": true, "h": "Model Provider Key Uuid", "n": "model_provider_key_uuid", "r": false, "sh": "Optional Model Provider uuid for use with provider models", "t": "`$STRING`", "key$": "model_provider_key_uuid", "index$": 25 }, "model_router": { "a": true, "h": "Model Router", "n": "model_router", "r": false, "sh": "Model router", "t": "`$OBJECT`", "key$": "model_router", "index$": 26 }, "model_router_uuid": { "a": true, "h": "Model Router Uuid", "n": "model_router_uuid", "r": false, "t": "`$STRING`", "key$": "model_router_uuid", "index$": 27 }, "model_uuid": { "a": true, "h": "Model Uuid", "n": "model_uuid", "r": false, "sh": "Identifier for the foundation model.", "t": "`$STRING`", "key$": "model_uuid", "index$": 28 }, "name": { "a": true, "h": "Name", "n": "name", "r": false, "sh": "Agent name", "t": "`$STRING`", "key$": "name", "index$": 29 }, "open_ai_key_uuid": { "a": true, "h": "Open Ai Key Uuid", "n": "open_ai_key_uuid", "r": false, "sh": "Optional OpenAI key uuid for use with OpenAI models", "t": "`$STRING`", "key$": "open_ai_key_uuid", "index$": 30 }, "openai_api_key": { "a": true, "h": "Openai Api Key", "n": "openai_api_key", "r": false, "sh": "OpenAI API Key Info", "t": "`$OBJECT`", "key$": "openai_api_key", "index$": 31 }, "parent_agents": { "a": true, "h": "Parent Agents", "n": "parent_agents", "r": false, "sh": "Parent agents", "t": "`$ARRAY`", "key$": "parent_agents", "index$": 32 }, "project_id": { "a": true, "h": "Project Id", "n": "project_id", "r": false, "sh": "The id of the DigitalOcean project this agent will belong to", "t": "`$STRING`", "key$": "project_id", "index$": 33 }, "provide_citations": { "a": true, "h": "Provide Citations", "n": "provide_citations", "r": false, "sh": "Whether the agent should provide in-response citations", "t": "`$BOOLEAN`", "key$": "provide_citations", "index$": 34 }, "reasoning_effort": { "a": true, "h": "Reasoning Effort", "n": "reasoning_effort", "r": false, "sh": "The reasoning effort for the agent", "t": "`$STRING`", "key$": "reasoning_effort", "index$": 35 }, "region": { "a": true, "h": "Region", "n": "region", "r": false, "sh": "Region code", "t": "`$STRING`", "key$": "region", "index$": 36 }, "retrieval_method": { "a": true, "h": "Retrieval Method", "n": "retrieval_method", "r": false, "sh": "- RETRIEVAL_METHOD_UNKNOWN: The retrieval method is unknown - RETRIEVAL_METHOD_REWRITE: The retrieval method is rewrite - RETRIEVAL_METHOD_STEP_BACK: The retrieval method is step back - RETRIEVAL_METHOD_SUB_QUERIES: The retrieval method is…", "t": "`$STRING`", "key$": "retrieval_method", "index$": 37 }, "route_created_at": { "a": true, "fo": "date-time", "h": "Route Created At", "n": "route_created_at", "r": false, "sh": "Creation of route date / time", "t": "`$STRING`", "key$": "route_created_at", "index$": 38 }, "route_created_by": { "a": true, "fo": "uint64", "h": "Route Created By", "n": "route_created_by", "r": false, "t": "`$STRING`", "key$": "route_created_by", "index$": 39 }, "route_name": { "a": true, "h": "Route Name", "n": "route_name", "r": false, "sh": "Route name", "t": "`$STRING`", "key$": "route_name", "index$": 40 }, "route_uuid": { "a": true, "h": "Route Uuid", "n": "route_uuid", "r": false, "t": "`$STRING`", "key$": "route_uuid", "index$": 41 }, "router_preset_slug": { "a": true, "h": "Router Preset Slug", "n": "router_preset_slug", "r": false, "t": "`$STRING`", "key$": "router_preset_slug", "index$": 42 }, "tags": { "a": true, "h": "Tags", "n": "tags", "r": false, "sh": "Agent tag to organize related resources", "t": "`$ARRAY`", "key$": "tags", "index$": 43 }, "temperature": { "a": true, "fo": "float", "h": "Temperature", "n": "temperature", "r": false, "sh": "Controls the model’s creativity, specified as a number between 0 and 1.", "t": "`$NUMBER`", "key$": "temperature", "index$": 44 }, "template": { "a": true, "h": "Template", "n": "template", "r": false, "sh": "Represents an AgentTemplate entity", "t": "`$OBJECT`", "key$": "template", "index$": 45 }, "thinking_token_budget": { "a": true, "fo": "int64", "h": "Thinking Token Budget", "n": "thinking_token_budget", "r": false, "sh": "The thinking token budget for Anthropic extended thinking (0 = disabled)", "t": "`$INTEGER`", "key$": "thinking_token_budget", "index$": 46 }, "top_p": { "a": true, "fo": "float", "h": "Top P", "n": "top_p", "r": false, "sh": "Defines the cumulative probability threshold for word selection, specified as a number between 0 and 1.", "t": "`$NUMBER`", "key$": "top_p", "index$": 47 }, "updated_at": { "a": true, "fo": "date-time", "h": "Updated At", "n": "updated_at", "r": false, "sh": "Last modified", "t": "`$STRING`", "key$": "updated_at", "index$": 48 }, "url": { "a": true, "h": "Url", "n": "url", "r": false, "sh": "Access your agent under this url", "t": "`$STRING`", "key$": "url", "index$": 49 }, "user_id": { "a": true, "fo": "uint64", "h": "User Id", "n": "user_id", "r": false, "sh": "Id of user that created the agent", "t": "`$STRING`", "key$": "user_id", "index$": 50 }, "uuid": { "a": true, "h": "Uuid", "n": "uuid", "r": false, "sh": "Unique agent id", "t": "`$STRING`", "key$": "uuid", "index$": 51 }, "version_hash": { "a": true, "h": "Version Hash", "n": "version_hash", "r": false, "sh": "The latest version of the agent", "t": "`$STRING`", "key$": "version_hash", "index$": 52 }, "vpc_egress_ips": { "a": true, "h": "Vpc Egress Ips", "n": "vpc_egress_ips", "r": false, "sh": "VPC Egress IPs", "t": "`$ARRAY`", "key$": "vpc_egress_ips", "index$": 53 }, "vpc_uuid": { "a": true, "h": "Vpc Uuid", "n": "vpc_uuid", "r": false, "t": "`$STRING`", "key$": "vpc_uuid", "index$": 54 }, "web_fetch_enabled": { "a": true, "h": "Web Fetch Enabled", "n": "web_fetch_enabled", "r": false, "sh": "Whether this agent can use the built-in web_fetch tool.", "t": "`$BOOLEAN`", "key$": "web_fetch_enabled", "index$": 55 }, "web_search_enabled": { "a": true, "h": "Web Search Enabled", "n": "web_search_enabled", "r": false, "sh": "Whether this agent can use the built-in web_search tool.", "t": "`$BOOLEAN`", "key$": "web_search_enabled", "index$": 56 }, "workspace": { "a": true, "h": "Workspace", "n": "workspace", "r": false, "t": "`$OBJECT`", "key$": "workspace", "index$": 57 } }, "name": "api_update_agent_output", "op": { "update": { "input": "data", "name": "update", "points": [{ "a": true, "co": { "id": "PUT /v2/gen-ai/agents/{uuid}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "ex": "\"123e4567-e89b-12d3-a456-426614174000\"", "k": "param", "n": "uuid", "or": "uuid", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "PUT", "o": "/v2/gen-ai/agents/{uuid}", "q": { "exist": ["uuid"] }, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "v2" }, { "lit": "gen-ai" }, { "lit": "agents" }, { "var": "uuid" }], "t": { "req": "`reqdata`", "res": "`body.agent`" }, "index$": 0 }], "key$": "update" } }, "relations": { "ancestors": [] }, "key$": "api_update_agent_output", "name__orig": "api_update_agent_output", "Name": "ApiUpdateAgentOutput", "name_": "api_update_agent_output", "name-": "api-update-agent-output", "NAME": "API_UPDATE_AGENT_OUTPUT", "index$": 89 }, { "active": true, "entity": "api_update_agent_output", "key$": "BasicApiUpdateAgentOutputFlow", "kind": "basic", "name": "BasicApiUpdateAgentOutputFlow", "param": {}, "step": [{ "a": false, "d": {}, "i": { "ref": "api_update_agent_output_ref01", "srcdatavar": "api_update_agent_output_ref01_data", "suffix": "_up0", "textfield": "anthropic_key_uuid" }, "m": {}, "o": "update", "s": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-api_update_agent_output_ref01" } }], "v": [], "unreachable": true }] }, 'ApiUpdateAgentOutput', { "PUT /v2/gen-ai/agents/{uuid}": { "protocol": "http", "requestBody": { "content": { "application/json": { "schema": { "description": "Data to modify an existing Agent", "properties": { "agent_log_insights_enabled": { "example": true, "type": "boolean", "key$": "agent_log_insights_enabled" }, "allowed_domains": { "description": "Optional list of allowed domains for the chatbot - Must use fully qualified domain name (FQDN) such as https://example.com", "example": ["example string"], "items": { "example": "example string", "type": "string" }, "type": "array", "key$": "allowed_domains" }, "anthropic_key_uuid": { "description": "Optional anthropic key uuid for use with anthropic models", "example": "\"12345678-1234-1234-1234-123456789012\"", "type": "string", "key$": "anthropic_key_uuid" }, "clear_mcp_servers": { "description": "When true, removes all MCP servers from the agent. Use this instead of sending an empty mcp_servers array.", "example": true, "type": "boolean", "key$": "clear_mcp_servers" }, "conversation_logs_enabled": { "description": "Optional update of conversation logs enabled", "example": true, "type": "boolean", "key$": "conversation_logs_enabled" }, "description": { "description": "Agent description", "example": "\"My Agent Description\"", "type": "string", "key$": "description" }, "instruction": { "description": "Agent instruction. Instructions help your agent to perform its job effectively. See [Write Effective Agent Instructions](https://docs.digitalocean.com/products/genai-platform/concepts/best-practices/#agent-instructions) for best practices.", "example": "\"You are an agent who thinks deeply about the world\"", "type": "string", "key$": "instruction" }, "k": { "description": "How many results should be considered from an attached knowledge base", "example": 5, "format": "int64", "type": "integer", "key$": "k" }, "max_tokens": { "description": "Specifies the maximum number of tokens the model can process in a single input or output, set as a number between 1 and 512. This determines the length of each response.", "example": 100, "format": "int64", "type": "integer", "key$": "max_tokens" }, "mcp_servers": { "description": "MCP (Model Context Protocol) servers to attach to the agent", "items": { "description": "McpServer defines a remote MCP server configuration for an agent.", "properties": { "allowed_tools": { "description": "Optional list of allowed tool names to expose from this server", "example": [], "items": {}, "type": "array" }, "authorization": { "description": "Optional authorization header value for the MCP server", "example": "example string", "type": "string" }, "headers": { "additionalProperties": {}, "description": "Optional additional headers to send to the MCP server", "type": "object" }, "server_label": { "description": "A label identifying this MCP server", "example": "example string", "type": "string" }, "server_url": { "description": "The URL of the MCP server", "example": "example string", "type": "string" } }, "type": "object", "x-ref": "#/components/schemas/apiMcpServer" }, "type": "array", "key$": "mcp_servers" }, "model_provider_key_uuid": { "description": "Optional Model Provider uuid for use with provider models", "example": "\"12345678-1234-1234-1234-123456789012\"", "type": "string", "key$": "model_provider_key_uuid" }, "model_router_uuid": { "example": "\"12345678-1234-1234-1234-123456789012\"", "type": "string", "key$": "model_router_uuid" }, "model_uuid": { "description": "Identifier for the foundation model.", "example": "\"12345678-1234-1234-1234-123456789012\"", "type": "string", "key$": "model_uuid" }, "name": { "description": "Agent name", "example": "\"My New Agent Name\"", "type": "string", "key$": "name" }, "open_ai_key_uuid": { "description": "Optional OpenAI key uuid for use with OpenAI models", "example": "\"12345678-1234-1234-1234-123456789012\"", "type": "string", "key$": "open_ai_key_uuid" }, "project_id": { "description": "The id of the DigitalOcean project this agent will belong to", "example": "\"12345678-1234-1234-1234-123456789012\"", "type": "string", "key$": "project_id" }, "provide_citations": { "example": true, "type": "boolean", "key$": "provide_citations" }, "reasoning_effort": { "example": "\"low\"", "type": "string", "key$": "reasoning_effort" }, "retrieval_method": { "default": "RETRIEVAL_METHOD_UNKNOWN", "description": "- RETRIEVAL_METHOD_UNKNOWN: The retrieval method is unknown\n - RETRIEVAL_METHOD_REWRITE: The retrieval method is rewrite\n - RETRIEVAL_METHOD_STEP_BACK: The retrieval method is step back\n - RETRIEVAL_METHOD_SUB_QUERIES: The retrieval method is sub queries\n - RETRIEVAL_METHOD_NONE: The retrieval method is none", "enum": ["RETRIEVAL_METHOD_UNKNOWN", "RETRIEVAL_METHOD_REWRITE", "RETRIEVAL_METHOD_STEP_BACK", "RETRIEVAL_METHOD_SUB_QUERIES", "RETRIEVAL_METHOD_NONE"], "example": "RETRIEVAL_METHOD_UNKNOWN", "type": "string", "x-ref": "#/components/schemas/apiRetrievalMethod", "key$": "retrieval_method" }, "router_preset_slug": { "example": "\"general\"", "type": "string", "key$": "router_preset_slug" }, "tags": { "description": "A set of abitrary tags to organize your agent", "example": ["example string"], "items": { "example": "example string", "type": "string" }, "type": "array", "key$": "tags" }, "temperature": { "description": "Controls the model’s creativity, specified as a number between 0 and 1. Lower values produce more predictable and conservative responses, while higher values encourage creativity and variation.", "example": 0.7, "format": "float", "type": "number", "key$": "temperature" }, "thinking_token_budget": { "example": 123, "format": "int64", "type": "integer", "key$": "thinking_token_budget" }, "top_p": { "description": "Defines the cumulative probability threshold for word selection, specified as a number between 0 and 1. Higher values allow for more diverse outputs, while lower values ensure focused and coherent responses.", "example": 0.9, "format": "float", "type": "number", "key$": "top_p" }, "uuid": { "description": "Unique agent id", "example": "\"12345678-1234-1234-1234-123456789012\"", "type": "string", "key$": "uuid" }, "web_fetch_enabled": { "description": "Optional. Set to true to let the agent use the built-in web_fetch tool to retrieve content from public web pages, or false to disable it.", "example": true, "type": "boolean", "key$": "web_fetch_enabled" }, "web_search_enabled": { "description": "Optional. Set to true to let the agent use the built-in web_search tool to search the public web for current information, or false to disable it.", "example": true, "type": "boolean", "key$": "web_search_enabled" } }, "type": "object", "x-ref": "#/components/schemas/apiUpdateAgentInputPublic", "index$": 1 } } } }, "parameters": [{ "description": "Unique agent id", "example": "\"123e4567-e89b-12d3-a456-426614174000\"", "in": "path", "name": "uuid", "required": true, "schema": { "type": "string" }, "index$": 0 }] } }, { strict: LIVE_STRICT, t });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let api_update_agent_output_ref01_data = Object.values(setup.data.existing.api_update_agent_output)[0];
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
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/api_update_agent_output/ApiUpdateAgentOutputTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.DigitaloceanSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['api_update_agent_output01', 'api_update_agent_output02', 'api_update_agent_output03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'DIGITALOCEAN_TEST_API_UPDATE_AGENT_OUTPUT_ENTID': idmap,
        'DIGITALOCEAN_TEST_LIVE': 'FALSE',
        'DIGITALOCEAN_TEST_EXPLAIN': 'FALSE',
        'DIGITALOCEAN_APIKEY': '',
    });
    idmap = env['DIGITALOCEAN_TEST_API_UPDATE_AGENT_OUTPUT_ENTID'];
    const live = 'TRUE' === env.DIGITALOCEAN_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['DIGITALOCEAN_TEST_API_UPDATE_AGENT_OUTPUT_ENTID'];
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
//# sourceMappingURL=ApiUpdateAgentOutputEntity.test.js.map