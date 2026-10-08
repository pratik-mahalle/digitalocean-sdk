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
(0, node_test_1.describe)('EmptyEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when DIGITALOCEAN_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('DIGITALOCEAN_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.DigitaloceanSDK.test();
        const ent = testsdk.Empty();
        (0, node_assert_1.default)(null != ent);
    });
    class FailHook extends __1.BaseFeature {
        name = 'failhook';
        version = '0.0.1';
        active = true;
        unexpected = 0;
        init() { }
        PreSpec() { throw new Error('empty hook failed'); }
        PreUnexpected() { this.unexpected++; }
    }
    (0, node_test_1.test)('stream-error', async () => {
        const offline = { net: { offline: true } };
        await node_assert_1.default.rejects(async () => {
            for await (const _item of __1.DigitaloceanSDK.test(offline).Empty().stream('list')) { }
        }, /offline/);
        for await (const _item of __1.DigitaloceanSDK.test(offline).Empty()
            .stream('list', undefined, { ctrl: { throw: false } })) { }
        if (null != __1.config.feature?.rbac) {
            const denied = __1.DigitaloceanSDK.test(undefined, { feature: { rbac: { active: true, deny: true } } });
            await node_assert_1.default.rejects(async () => {
                for await (const _item of denied.Empty().stream('list')) { }
            }, (err) => 'rbac_denied' === err.code);
        }
    });
    (0, node_test_1.test)('stream-ctrl', async () => {
        const explain = {};
        const ctrl = { explain };
        for await (const _item of __1.DigitaloceanSDK.test().Empty().stream('list', undefined, { ctrl })) { }
        node_assert_1.default.deepStrictEqual(Object.keys(ctrl), ['explain']);
        (0, node_assert_1.default)(explain === ctrl.explain && 0 < Object.keys(explain).length);
    });
    (0, node_test_1.test)('unexpected', async () => {
        const hook = new FailHook();
        const client = new __1.DigitaloceanSDK({ feature: { test: { active: true } }, extend: [hook] });
        await node_assert_1.default.rejects(client.Empty().list(), /hook failed/);
        (0, node_assert_1.default)(0 < hook.unexpected);
        const fired = hook.unexpected;
        node_assert_1.default.strictEqual(await client.Empty().list(undefined, { throw: false }), undefined);
        (0, node_assert_1.default)(fired < hook.unexpected);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.DigitaloceanSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.Empty().list({ "end_user_id": 1 }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.DIGITALOCEAN_TEST_LIVE;
        for (const op of ['create', 'list']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'empty.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "actorId": { "a": true, "h": "Actor Id", "n": "actorId", "r": false, "sh": "Optional actor binding: the user whose connections the session's tool calls use, matched against connection `user_id`.", "t": "`$STRING`", "key$": "actorId", "index$": 0 }, "agentName": { "a": true, "h": "Agent Name", "n": "agentName", "r": false, "sh": "Name of the agent that started the session.", "t": "`$STRING`", "key$": "agentName", "index$": 1 }, "agentUrn": { "a": true, "h": "Agent Urn", "n": "agentUrn", "r": false, "sh": "URN of the agent that started the session.", "t": "`$STRING`", "key$": "agentUrn", "index$": 2 }, "categories": { "a": true, "h": "Categories", "n": "categories", "r": true, "sh": "Required.", "t": "`$ARRAY`", "key$": "categories", "index$": 3 }, "config": { "a": true, "h": "Config", "n": "config", "r": false, "sh": "Optional session options.", "t": "`$OBJECT`", "key$": "config", "index$": 4 }, "createdAt": { "a": true, "fo": "date-time", "h": "Created At", "n": "createdAt", "r": false, "sh": "When the session was created.", "t": "`$STRING`", "key$": "createdAt", "index$": 5 }, "insights": { "a": true, "h": "Insights", "n": "insights", "r": false, "sh": "Omitted when the request omitted insights or explicitly sent null.", "t": "`$ANY`", "key$": "insights", "index$": 6 }, "mcpUrl": { "a": true, "h": "Mcp Url", "n": "mcpUrl", "r": false, "sh": "URL of the session's MCP endpoint, for the agent to connect to.", "t": "`$STRING`", "key$": "mcpUrl", "index$": 7 }, "name": { "a": true, "h": "Name", "n": "name", "op": { "list": { "req": false, "type": "`$STRING`" } }, "r": true, "sh": "Required human-readable session name.", "t": "`$STRING`", "key$": "name", "index$": 8 }, "network": { "a": true, "h": "Network", "n": "network", "r": false, "sh": "Product-level session network binding.", "t": "`$ANY`", "key$": "network", "index$": 9 }, "overrides": { "a": true, "h": "Overrides", "n": "overrides", "r": true, "sh": "Required.", "t": "`$ARRAY`", "key$": "overrides", "index$": 10 }, "owning_user_id": { "a": true, "h": "Owning User Id", "n": "owning_user_id", "r": false, "sh": "DigitalOcean user ID of the user who created the session, when recorded.", "t": "`$STRING`", "key$": "owning_user_id", "index$": 11 }, "policy": { "a": true, "h": "Policy", "n": "policy", "r": false, "sh": "Optional tool-permission policy.", "t": "`$ANY`", "key$": "policy", "index$": 12 }, "session": { "a": true, "h": "Session", "n": "session", "r": false, "sh": "The created session.", "t": "`$ANY`", "key$": "session", "index$": 13 }, "sessionUrn": { "a": true, "h": "Session Urn", "n": "sessionUrn", "r": false, "sh": "Session URN, for example `do:managed_agent_session:<uuid>`.", "t": "`$STRING`", "key$": "sessionUrn", "index$": 14 }, "tools": { "a": true, "h": "Tools", "n": "tools", "r": false, "sh": "Canonical, version-pinned selected tool references.", "t": "`$ARRAY`", "key$": "tools", "index$": 15 }, "updatedAt": { "a": true, "fo": "date-time", "h": "Updated At", "n": "updatedAt", "r": false, "sh": "When the session was last modified.", "t": "`$STRING`", "key$": "updatedAt", "index$": 16 } }, "name": "empty", "op": { "create": { "input": "data", "name": "create", "points": [{ "a": true, "co": { "id": "POST /v2/action-gateway/actors/{actor_id}/limits:clear", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "ex": "alice", "k": "param", "n": "actor_id", "or": "actor_id", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "POST", "o": "/v2/action-gateway/actors/{actor_id}/limits:clear", "q": { "exist": ["actor_id"] }, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "v2" }, { "lit": "action-gateway" }, { "lit": "actors" }, { "var": "actor_id" }, { "lit": "limits:clear" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }, { "a": true, "co": { "id": "POST /v2/action-gateway/actors/{actor_id}/limits:set", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "ex": "alice", "k": "param", "n": "actor_id", "or": "actor_id", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "POST", "o": "/v2/action-gateway/actors/{actor_id}/limits:set", "q": { "exist": ["actor_id"] }, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "v2" }, { "lit": "action-gateway" }, { "lit": "actors" }, { "var": "actor_id" }, { "lit": "limits:set" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 1 }, { "a": true, "co": { "id": "POST /v2/action-gateway/sessions", "source": "openapi3", "version": 2 }, "g": {}, "k": "http", "m": "POST", "o": "/v2/action-gateway/sessions", "q": {}, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "v2" }, { "lit": "action-gateway" }, { "lit": "sessions" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 2 }], "key$": "create" }, "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /v2/action-gateway/sessions", "source": "openapi3", "version": 2 }, "g": { "query": [{ "a": true, "ex": "alice", "k": "query", "n": "end_user_id", "or": "end_user_id", "r": false, "t": "`$STRING`", "index$": 0 }, { "a": true, "ex": 1, "k": "query", "n": "page", "or": "page", "r": false, "t": "`$INTEGER`", "index$": 1 }, { "a": true, "ex": 20, "k": "query", "n": "per_page", "or": "per_page", "r": false, "t": "`$INTEGER`", "index$": 2 }] }, "k": "http", "m": "GET", "o": "/v2/action-gateway/sessions", "q": {}, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "v2" }, { "lit": "action-gateway" }, { "lit": "sessions" }], "t": { "req": "`reqdata`", "res": "`body.sessions`" }, "index$": 0 }], "key$": "list" }, "remove": { "input": "data", "name": "remove", "points": [{ "a": true, "co": { "id": "DELETE /v2/action-gateway/sessions/{session_urn}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "ex": "do:managed_agent_session:2b3c9f0e-1a4d-4e5f-8a7b-6c5d4e3f2a1b", "k": "param", "n": "session_urn", "or": "session_urn", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "DELETE", "o": "/v2/action-gateway/sessions/{session_urn}", "q": { "exist": ["session_urn"] }, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "v2" }, { "lit": "action-gateway" }, { "lit": "sessions" }, { "var": "session_urn" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "remove" } }, "relations": { "ancestors": [] }, "key$": "empty", "name__orig": "empty", "Name": "Empty", "name_": "empty", "name-": "empty", "NAME": "EMPTY", "index$": 147 }, { "active": true, "entity": "empty", "key$": "BasicEmptyFlow", "kind": "basic", "name": "BasicEmptyFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "empty_ref01" }, "m": {}, "o": "create", "s": [], "v": [], "index$": 0 }, { "a": true, "d": {}, "i": {}, "m": {}, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "empty_ref01" } }], "index$": 1 }, { "a": false, "d": {}, "i": { "ref": "empty_ref01", "suffix": "_rm0" }, "m": { "id": "empty01" }, "o": "remove", "s": [], "v": [], "unreachable": true }, { "a": true, "d": {}, "i": { "suffix": "_rt0" }, "m": {}, "o": "list", "s": [], "v": [{ "apply": "ItemNotExists", "def": { "ref": "empty_ref01" } }], "index$": 2 }] }, 'Empty', { "POST /v2/action-gateway/actors/{actor_id}/limits:clear": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "required": ["categories"], "properties": { "categories": { "type": "array", "minItems": 1, "description": "Required. Categories to clear, each at most once.", "items": { "type": "string", "enum": ["LIMIT_CATEGORY_WEB_SEARCH_REQUESTS_PER_MINUTE", "LIMIT_CATEGORY_WEB_FETCH_REQUESTS_PER_MINUTE", "LIMIT_CATEGORY_NATIVE_TOOL_CALLS_REQUESTS_PER_MINUTE", "LIMIT_CATEGORY_NON_NATIVE_TOOL_CALLS_REQUESTS_PER_MINUTE"], "example": "LIMIT_CATEGORY_WEB_SEARCH_REQUESTS_PER_MINUTE", "x-ref": "#/components/schemas/limit_category" }, "example": ["LIMIT_CATEGORY_WEB_SEARCH_REQUESTS_PER_MINUTE"], "key$": "categories" } }, "description": "Removes an actor's overrides.", "x-ref": "#/components/schemas/clear_actor_limits", "index$": 1 }, "example": { "categories": ["LIMIT_CATEGORY_WEB_SEARCH_REQUESTS_PER_MINUTE"] } } } }, "parameters": [{ "name": "actor_id", "in": "path", "required": true, "description": "Actor ID: a session `actor_id` or a connection `user_id`, 1 to 64 characters from `[A-Za-z0-9._-]`.", "schema": { "type": "string", "pattern": "^[A-Za-z0-9._-]{1,64}$" }, "example": "alice", "x-ref": "#/components/parameters/actor_id", "index$": 0 }] }, "POST /v2/action-gateway/actors/{actor_id}/limits:set": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "required": ["overrides"], "properties": { "overrides": { "type": "array", "minItems": 1, "description": "Required. Limits to set, at most one per category.", "items": { "type": "object", "required": ["category", "requests_per_minute"], "properties": { "category": { "type": "string", "description": "The category the limit applies to.", "allOf": [], "key$": "category" }, "requests_per_minute": { "type": "string", "format": "uint64", "description": "Calls allowed per minute. 0 blocks every call in the category.", "example": "30", "key$": "requests_per_minute" } }, "description": "Actor's limit for one category.", "x-ref": "#/components/schemas/limit_override" }, "key$": "overrides" } }, "description": "Sets an actor's overrides.", "x-ref": "#/components/schemas/set_actor_limits", "index$": 1 }, "example": { "overrides": [{ "category": "LIMIT_CATEGORY_WEB_SEARCH_REQUESTS_PER_MINUTE", "requests_per_minute": "10" }] } } } }, "parameters": [{ "name": "actor_id", "in": "path", "required": true, "description": "Actor ID: a session `actor_id` or a connection `user_id`, 1 to 64 characters from `[A-Za-z0-9._-]`.", "schema": { "type": "string", "pattern": "^[A-Za-z0-9._-]{1,64}$" }, "example": "alice", "x-ref": "#/components/parameters/actor_id", "index$": 0 }] }, "POST /v2/action-gateway/sessions": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "required": ["name"], "properties": { "name": { "type": "string", "description": "Required human-readable session name.", "example": "support-bot-alice", "key$": "name" }, "actorId": { "type": "string", "pattern": "^[A-Za-z0-9._-]{1,64}$", "description": "Optional actor binding: the user whose connections the session's tool calls use, matched against connection `user_id`. When set it must use the same alphabet as a connection's `user_id`, `[A-Za-z0-9._-]`, at most 64 characters; anything else is rejected with 400.", "example": "alice", "key$": "actorId" }, "policy": { "description": "Optional tool-permission policy. Omitted asks before every call.", "allOf": [{ "type": "object", "nullable": true, "description": "Tool-permission policy of a session.", "properties": { "defaultAction": {}, "rules": {} }, "x-ref": "#/components/schemas/session_policy" }], "key$": "policy" }, "tools": { "type": "array", "description": "Omitted enables every tool. An explicit empty array enables no tools. Direct tools may be `<tool>` or `<tool>@<version>`, using provider-qualified tool slugs, and a pinned version must be the released one; toolbelt references must be version-pinned as `toolbelt:<belt-name>@<version>`.", "items": { "type": "string" }, "example": ["toolbelt:search-toolbelt@1", "jira_create_issue"], "key$": "tools" }, "config": { "type": "object", "description": "Optional session options. config.preloadTools may contain concrete tool names (optionally version-pinned) and version-pinned toolbelt references. config.customInstructions is a string of at most 1000 characters. config.outputViews maps up to 100 tool slugs to the name of an output view to apply to that tool's results.", "example": { "preloadTools": ["exa_web_search"], "outputViews": { "exa_web_search": "titles-and-urls" }, "customInstructions": "Prefer primary sources and cite URLs." }, "key$": "config" }, "network": { "description": "Product-level session network binding. When set, `vpc_uuid` must identify a VPC owned by the session's team.", "allOf": [{ "type": "object", "description": "Attaches a session to a VPC.", "properties": { "vpcUuid": {} }, "x-ref": "#/components/schemas/session_network" }], "key$": "network" }, "insights": { "description": "Omitted when the request omitted insights or explicitly sent null.", "allOf": [{ "type": "object", "description": "Records which of a session's telemetry is sent to Insights.", "properties": { "metrics": {}, "logs": {}, "traces": {} }, "x-ref": "#/components/schemas/session_insights" }], "key$": "insights" } }, "description": "Describes a session to create.", "x-ref": "#/components/schemas/session_create", "index$": 1 }, "example": { "name": "support-bot-alice", "actorId": "alice", "tools": ["toolbelt:search-toolbelt@1", "jira_create_issue"], "policy": { "defaultAction": "ask", "rules": [{ "tool": "toolbelt:search-toolbelt@1", "match": {}, "action": "allow" }, { "tool": "jira_create_issue", "match": {}, "action": "ask" }] }, "config": { "preloadTools": ["exa_web_search"], "outputViews": { "exa_web_search": "titles-and-urls" } } } } } }, "parameters": [] }, "GET /v2/action-gateway/sessions": { "protocol": "http", "parameters": [{ "name": "end_user_id", "in": "query", "required": false, "description": "Optional `actor_id`, matched exactly.", "schema": { "type": "string" }, "example": "alice", "x-ref": "#/components/parameters/end_user_id", "index$": 0 }, { "in": "query", "name": "page", "required": false, "description": "1-based page number. Values below 1 are treated as 1.", "schema": { "type": "integer", "minimum": 1, "default": 1 }, "example": 1, "x-ref": "#/components/parameters/page_connections", "index$": 1 }, { "name": "per_page", "in": "query", "required": false, "description": "Page size. Defaults to 20; values above 100 are capped at 100.", "schema": { "type": "integer", "minimum": 1, "maximum": 100, "default": 20 }, "example": 20, "x-ref": "#/components/parameters/per_page", "index$": 2 }] }, "DELETE /v2/action-gateway/sessions/{session_urn}": { "protocol": "http", "parameters": [{ "name": "session_urn", "in": "path", "required": true, "description": "URN of the session, for example `do:managed_agent_session:<uuid>`.", "schema": { "type": "string" }, "example": "do:managed_agent_session:2b3c9f0e-1a4d-4e5f-8a7b-6c5d4e3f2a1b", "x-ref": "#/components/parameters/session_urn", "index$": 0 }] } }, { strict: LIVE_STRICT, t });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const empty_ref01_ent = client.Empty();
        let empty_ref01_data = setup.data.new.empty['empty_ref01'];
        empty_ref01_data = (await empty_ref01_ent.create(empty_ref01_data)).data();
        (0, node_assert_1.default)(null != empty_ref01_data);
        // LIST
        const empty_ref01_match = {};
        const empty_ref01_list = (await empty_ref01_ent.list(empty_ref01_match)).map((e) => e.data());
        // LIST
        const empty_ref01_match_rt0 = {};
        const empty_ref01_list_rt0 = (await empty_ref01_ent.list(empty_ref01_match_rt0)).map((e) => e.data());
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
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/empty/EmptyTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.DigitaloceanSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['empty01', 'empty02', 'empty03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'DIGITALOCEAN_TEST_EMPTY_ENTID': idmap,
        'DIGITALOCEAN_TEST_LIVE': 'FALSE',
        'DIGITALOCEAN_TEST_EXPLAIN': 'FALSE',
        'DIGITALOCEAN_APIKEY': '',
    });
    idmap = env['DIGITALOCEAN_TEST_EMPTY_ENTID'];
    const live = 'TRUE' === env.DIGITALOCEAN_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['DIGITALOCEAN_TEST_EMPTY_ENTID'];
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
//# sourceMappingURL=EmptyEntity.test.js.map