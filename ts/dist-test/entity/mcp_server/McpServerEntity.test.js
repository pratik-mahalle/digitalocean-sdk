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
(0, node_test_1.describe)('McpServerEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when DIGITALOCEAN_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('DIGITALOCEAN_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.DigitaloceanSDK.test();
        const ent = testsdk.McpServer();
        (0, node_assert_1.default)(null != ent);
    });
    class FailHook extends __1.BaseFeature {
        name = 'failhook';
        version = '0.0.1';
        active = true;
        unexpected = 0;
        init() { }
        PreSpec() { throw new Error('mcp_server hook failed'); }
        PreUnexpected() { this.unexpected++; }
    }
    (0, node_test_1.test)('stream-error', async () => {
        const offline = { net: { offline: true } };
        await node_assert_1.default.rejects(async () => {
            for await (const _item of __1.DigitaloceanSDK.test(offline).McpServer().stream('list')) { }
        }, /offline/);
        for await (const _item of __1.DigitaloceanSDK.test(offline).McpServer()
            .stream('list', undefined, { ctrl: { throw: false } })) { }
        if (null != __1.config.feature?.rbac) {
            const denied = __1.DigitaloceanSDK.test(undefined, { feature: { rbac: { active: true, deny: true } } });
            await node_assert_1.default.rejects(async () => {
                for await (const _item of denied.McpServer().stream('list')) { }
            }, (err) => 'rbac_denied' === err.code);
        }
    });
    (0, node_test_1.test)('stream-ctrl', async () => {
        const explain = {};
        const ctrl = { explain };
        for await (const _item of __1.DigitaloceanSDK.test().McpServer().stream('list', undefined, { ctrl })) { }
        node_assert_1.default.deepStrictEqual(Object.keys(ctrl), ['explain']);
        (0, node_assert_1.default)(explain === ctrl.explain && 0 < Object.keys(explain).length);
    });
    (0, node_test_1.test)('unexpected', async () => {
        const hook = new FailHook();
        const client = new __1.DigitaloceanSDK({ feature: { test: { active: true } }, extend: [hook] });
        await node_assert_1.default.rejects(client.McpServer().list(), /hook failed/);
        (0, node_assert_1.default)(0 < hook.unexpected);
        const fired = hook.unexpected;
        node_assert_1.default.strictEqual(await client.McpServer().list(undefined, { throw: false }), undefined);
        (0, node_assert_1.default)(fired < hook.unexpected);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.DigitaloceanSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.McpServer().list({ "api_key": 1 }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.DIGITALOCEAN_TEST_LIVE;
        for (const op of ['create', 'list', 'update', 'load', 'remove']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'mcp_server.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "api_key": { "a": true, "h": "Api Key", "n": "api_key", "r": false, "sh": "For `credentialRefSource` secret: the key or token itself.", "t": "`$STRING`", "wo": true, "key$": "api_key", "index$": 0 }, "createdAt": { "a": true, "h": "Created At", "n": "createdAt", "r": false, "sh": "When the server was registered, in RFC 3339 format.", "t": "`$STRING`", "key$": "createdAt", "index$": 1 }, "credentialRef": { "a": true, "h": "Credential Ref", "n": "credentialRef", "r": false, "sh": "The secret reference supplied at registration when source=secret, or the team's OAuth credential ID when source=connection.", "t": "`$STRING`", "key$": "credentialRef", "index$": 2 }, "credentialRefSource": { "a": true, "h": "Credential Ref Source", "n": "credentialRefSource", "r": false, "sh": "How requests to the server authenticate: none, secret (a key or token sent in the Authorization header), or connection (each user's own OAuth authorization).", "t": "`$STRING`", "key$": "credentialRefSource", "index$": 3 }, "description": { "a": true, "h": "Description", "n": "description", "r": false, "sh": "Team-authored description, shown on the server's catalog card.", "t": "`$STRING`", "key$": "description", "index$": 4 }, "endpoint": { "a": true, "h": "Endpoint", "n": "endpoint", "op": { "create": { "req": true, "type": "`$STRING`" } }, "r": false, "sh": "HTTPS URL of the server's MCP endpoint.", "t": "`$STRING`", "key$": "endpoint", "index$": 5 }, "id": { "a": true, "h": "Id", "n": "id", "r": false, "t": "`$STRING`", "key$": "id", "index$": 6 }, "lastSyncedAt": { "a": true, "h": "Last Synced At", "n": "lastSyncedAt", "r": false, "sh": "When discovery last succeeded, in RFC 3339 format; empty until the first success.", "t": "`$STRING`", "key$": "lastSyncedAt", "index$": 7 }, "oauth_authorization_ttl_seconds": { "a": true, "fo": "uint64", "h": "Oauth Authorization Ttl Seconds", "n": "oauth_authorization_ttl_seconds", "r": false, "sh": "How long a user's authorization is reused before re-consent.", "t": "`$STRING`", "key$": "oauth_authorization_ttl_seconds", "index$": 8 }, "oauth_authorize_url": { "a": true, "h": "Oauth Authorize Url", "n": "oauth_authorize_url", "r": false, "sh": "OAuth authorization endpoint.", "t": "`$STRING`", "key$": "oauth_authorize_url", "index$": 9 }, "oauth_client_id": { "a": true, "h": "Oauth Client Id", "n": "oauth_client_id", "r": false, "sh": "Required for `credentialRefSource` connection: the client ID of your team's OAuth client for the server.", "t": "`$STRING`", "key$": "oauth_client_id", "index$": 10 }, "oauth_client_secret": { "a": true, "h": "Oauth Client Secret", "n": "oauth_client_secret", "r": false, "sh": "Required for `credentialRefSource` connection.", "t": "`$STRING`", "wo": true, "key$": "oauth_client_secret", "index$": 11 }, "oauth_scopes": { "a": true, "h": "Oauth Scopes", "n": "oauth_scopes", "r": false, "sh": "OAuth scopes requested from each user.", "t": "`$ARRAY`", "key$": "oauth_scopes", "index$": 12 }, "oauth_token_url": { "a": true, "h": "Oauth Token Url", "n": "oauth_token_url", "r": false, "sh": "Required for `credentialRefSource` connection: the OAuth token endpoint, under the same rules as `oauth_authorize_url`.", "t": "`$STRING`", "key$": "oauth_token_url", "index$": 13 }, "protocolVersion": { "a": true, "h": "Protocol Version", "n": "protocolVersion", "r": false, "sh": "MCP protocol revision negotiated with the server.", "t": "`$STRING`", "key$": "protocolVersion", "index$": 14 }, "serverRef": { "a": true, "h": "Server Ref", "n": "serverRef", "op": { "create": { "req": true, "type": "`$STRING`" } }, "r": false, "sh": "Server identifier, unique within your team.", "t": "`$STRING`", "key$": "serverRef", "index$": 15 }, "syncError": { "a": true, "h": "Sync Error", "n": "syncError", "r": false, "sh": "Why the latest discovery failed; empty after a successful one.", "t": "`$STRING`", "key$": "syncError", "index$": 16 }, "syncStatus": { "a": true, "h": "Sync Status", "n": "syncStatus", "r": false, "sh": "Outcome of the latest discovery: pending (no discovery has finished yet), ok, failed, or `unsupported_protocol`.", "t": "`$STRING`", "key$": "syncStatus", "index$": 17 }, "toolCount": { "a": true, "fo": "int32", "h": "Tool Count", "n": "toolCount", "r": false, "sh": "Number of tools discovered on the server, whether enabled or not.", "t": "`$INTEGER`", "key$": "toolCount", "index$": 18 }, "transport": { "a": true, "h": "Transport", "n": "transport", "r": false, "sh": "Always `streamable_http`.", "t": "`$STRING`", "key$": "transport", "index$": 19 }, "updatedAt": { "a": true, "h": "Updated At", "n": "updatedAt", "r": false, "sh": "When the server was last modified, in RFC 3339 format.", "t": "`$STRING`", "key$": "updatedAt", "index$": 20 } }, "id": { "field": "id", "name": "id" }, "name": "mcp_server", "op": { "create": { "input": "data", "name": "create", "points": [{ "a": true, "co": { "id": "POST /v2/action-gateway/mcp-servers", "source": "openapi3", "version": 2 }, "g": {}, "k": "http", "m": "POST", "o": "/v2/action-gateway/mcp-servers", "q": {}, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "v2" }, { "lit": "action-gateway" }, { "lit": "mcp-servers" }], "t": { "req": "`reqdata`", "res": "`body.mcpServer`" }, "index$": 0 }], "key$": "create" }, "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /v2/action-gateway/mcp-servers", "source": "openapi3", "version": 2 }, "g": {}, "k": "http", "m": "GET", "o": "/v2/action-gateway/mcp-servers", "q": {}, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "v2" }, { "lit": "action-gateway" }, { "lit": "mcp-servers" }], "t": { "req": "`reqdata`", "res": "`body.mcpServers`" }, "index$": 0 }], "key$": "list" }, "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /v2/action-gateway/mcp-servers/{server_ref}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "ex": "docs", "k": "param", "n": "id", "or": "server_ref", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/v2/action-gateway/mcp-servers/{server_ref}", "q": { "exist": ["id"] }, "r": { "param": { "server_ref": "id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "v2" }, { "lit": "action-gateway" }, { "lit": "mcp-servers" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body.mcpServer`" }, "index$": 0 }], "key$": "load" }, "remove": { "input": "data", "name": "remove", "points": [{ "a": true, "co": { "id": "DELETE /v2/action-gateway/mcp-servers/{server_ref}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "ex": "docs", "k": "param", "n": "id", "or": "server_ref", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "DELETE", "o": "/v2/action-gateway/mcp-servers/{server_ref}", "q": { "exist": ["id"] }, "r": { "param": { "server_ref": "id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "v2" }, { "lit": "action-gateway" }, { "lit": "mcp-servers" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body.mcpServer`" }, "index$": 0 }], "key$": "remove" }, "update": { "input": "data", "name": "update", "points": [{ "a": true, "co": { "id": "PATCH /v2/action-gateway/mcp-servers/{server_ref}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "ex": "docs", "k": "param", "n": "id", "or": "server_ref", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "PATCH", "o": "/v2/action-gateway/mcp-servers/{server_ref}", "q": { "exist": ["id"] }, "r": { "param": { "server_ref": "id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "v2" }, { "lit": "action-gateway" }, { "lit": "mcp-servers" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body.mcpServer`" }, "index$": 0 }], "key$": "update" } }, "relations": { "ancestors": [] }, "key$": "mcp_server", "name__orig": "mcp_server", "Name": "McpServer", "name_": "mcp_server", "name-": "mcp-server", "NAME": "MCP_SERVER", "index$": 169 }, { "active": true, "entity": "mcp_server", "key$": "BasicMcpServerFlow", "kind": "basic", "name": "BasicMcpServerFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "mcp_server_ref01" }, "m": {}, "o": "create", "s": [], "v": [], "index$": 0 }, { "a": true, "d": {}, "i": {}, "m": {}, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "mcp_server_ref01" } }], "index$": 1 }, { "a": true, "d": {}, "i": { "ref": "mcp_server_ref01", "srcdatavar": "mcp_server_ref01_data", "suffix": "_up0", "textfield": "api_key" }, "m": {}, "o": "update", "s": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-mcp_server_ref01" } }], "v": [], "index$": 2 }, { "a": true, "d": {}, "i": { "ref": "mcp_server_ref01", "srcdatavar": "mcp_server_ref01_data", "suffix": "_dt0" }, "m": { "id": "mcp_server01" }, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-mcp_server_ref01" } }], "index$": 3 }, { "a": true, "d": {}, "i": { "ref": "mcp_server_ref01", "suffix": "_rm0" }, "m": { "id": "mcp_server01" }, "o": "remove", "s": [], "v": [], "index$": 4 }, { "a": true, "d": {}, "i": { "suffix": "_rt0" }, "m": {}, "o": "list", "s": [], "v": [{ "apply": "ItemNotExists", "def": { "ref": "mcp_server_ref01" } }], "index$": 5 }] }, 'McpServer', { "POST /v2/action-gateway/mcp-servers": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "required": ["serverRef", "endpoint"], "properties": { "serverRef": { "type": "string", "pattern": "^[a-z][a-z0-9-]{0,63}$", "example": "docs", "description": "Identifier for the server, unique within your team. Must match `^`[a-z]``[a-z0-9-]`{0,63}$`.", "key$": "serverRef" }, "endpoint": { "type": "string", "description": "HTTPS URL of the server's MCP endpoint. Its host must resolve only to public IP addresses. Required.", "example": "https://mcp.example.com/mcp", "key$": "endpoint" }, "transport": { "type": "string", "enum": ["streamable_http"], "default": "streamable_http", "example": "streamable_http", "description": "Optional. `streamable_http`, the default and only accepted value.", "key$": "transport" }, "credentialRefSource": { "type": "string", "enum": ["none", "secret", "connection"], "default": "none", "description": "How requests to the server authenticate: none (the default), secret, or connection. With secret, the value from `credentialRef` or `api_key` is sent in the Authorization header, prefixed with \"Bearer \" unless it already contains a space.", "example": "secret", "key$": "credentialRefSource" }, "description": { "type": "string", "maxLength": 1024, "example": "Internal documentation search.", "description": "Optional description shown on the server's catalog card. At most 1024 characters.", "key$": "description" }, "credentialRef": { "type": "string", "description": "For `credentialRefSource` secret: a reference to a secret your team stores with DigitalOcean. Must match `^`[A-Za-z0-9]``[A-Za-z0-9:/_.-]`{0,254}$`. Set exactly one of `credentialRef` and `api_key`.", "example": "", "key$": "credentialRef" }, "api_key": { "type": "string", "writeOnly": true, "description": "For `credentialRefSource` secret: the key or token itself. DigitalOcean stores it; it is write-only and no response returns it. Set exactly one of `credentialRef` and `api_key`.", "example": "sk_live_example", "key$": "api_key" }, "oauth_client_id": { "type": "string", "description": "Required for `credentialRefSource` connection: the client ID of your team's OAuth client for the server. Each user of the server then authorizes individually.", "example": "", "key$": "oauth_client_id" }, "oauth_client_secret": { "type": "string", "writeOnly": true, "description": "Required for `credentialRefSource` connection. Write-only; no response returns it.", "example": "", "key$": "oauth_client_secret" }, "oauth_authorize_url": { "type": "string", "description": "Required for `credentialRefSource` connection: the OAuth authorization endpoint. It must use the endpoint's scheme and port, on the endpoint's host or another host under the same registrable domain.", "example": "", "key$": "oauth_authorize_url" }, "oauth_token_url": { "type": "string", "description": "Required for `credentialRefSource` connection: the OAuth token endpoint, under the same rules as `oauth_authorize_url`.", "example": "", "key$": "oauth_token_url" }, "oauth_scopes": { "type": "array", "items": { "type": "string" }, "example": [], "description": "Required for `credentialRefSource` connection: the scopes to request from each user, 1 to 64 of them.", "key$": "oauth_scopes" }, "oauth_authorization_ttl_seconds": { "type": "string", "format": "uint64", "description": "How long, in seconds, a user's authorization may be reused before they must consent again. Optional;\n0 means 30 days, and the maximum is 100 years.\n\nAuthorizations are not refreshed automatically, so this window, not the provider's token lifetime,\ndecides how often a user is sent back through consent. Set it no longer than the provider's own\ntoken lifetime, so the prompt arrives before a tool call fails against an expired token.", "example": "86400", "key$": "oauth_authorization_ttl_seconds" } }, "description": "Describes an MCP server to register.", "x-ref": "#/components/schemas/mcp_server_create", "index$": 1 }, "example": { "serverRef": "docs", "endpoint": "https://mcp.example.com/mcp", "credentialRefSource": "secret", "api_key": "sk_live_example", "description": "Internal documentation search." } } } }, "parameters": [] }, "GET /v2/action-gateway/mcp-servers": { "protocol": "http", "parameters": [] }, "GET /v2/action-gateway/mcp-servers/{server_ref}": { "protocol": "http", "parameters": [{ "name": "server_ref", "in": "path", "required": true, "description": "Server identifier (`serverRef`) of one of your team's MCP servers.", "schema": { "type": "string" }, "example": "docs", "x-ref": "#/components/parameters/server_ref", "index$": 0 }] }, "DELETE /v2/action-gateway/mcp-servers/{server_ref}": { "protocol": "http", "parameters": [{ "name": "server_ref", "in": "path", "required": true, "description": "Server identifier (`serverRef`) of one of your team's MCP servers.", "schema": { "type": "string" }, "example": "docs", "x-ref": "#/components/parameters/server_ref", "index$": 0 }] }, "PATCH /v2/action-gateway/mcp-servers/{server_ref}": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "properties": { "description": { "type": "string", "maxLength": 1024, "description": "Replaces the stored description; empty clears it. At most 1024 characters.", "example": "Internal documentation and runbook search.", "key$": "description" } }, "description": "Carries the editable fields of a registered server.", "x-ref": "#/components/schemas/mcp_server_update", "index$": 1 }, "example": { "description": "Internal documentation and runbook search." } } } }, "parameters": [{ "name": "server_ref", "in": "path", "required": true, "description": "Server identifier (`serverRef`) of one of your team's MCP servers.", "schema": { "type": "string" }, "example": "docs", "x-ref": "#/components/parameters/server_ref", "index$": 0 }] } }, { strict: LIVE_STRICT, t });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const mcp_server_ref01_ent = client.McpServer();
        let mcp_server_ref01_data = setup.data.new.mcp_server['mcp_server_ref01'];
        mcp_server_ref01_data = (await mcp_server_ref01_ent.create(mcp_server_ref01_data)).data();
        (0, node_assert_1.default)(null != mcp_server_ref01_data.id);
        // LIST
        const mcp_server_ref01_match = {};
        const mcp_server_ref01_list = (await mcp_server_ref01_ent.list(mcp_server_ref01_match)).map((e) => e.data());
        (0, node_assert_1.default)(!isempty(select(mcp_server_ref01_list, { id: mcp_server_ref01_data.id })));
        // UPDATE
        const mcp_server_ref01_data_up0 = {};
        mcp_server_ref01_data_up0.id = mcp_server_ref01_data.id;
        const mcp_server_ref01_markdef_up0 = { name: 'api_key', value: 'Mark01-mcp_server_ref01_' + setup.now };
        mcp_server_ref01_data_up0[mcp_server_ref01_markdef_up0.name] = mcp_server_ref01_markdef_up0.value;
        const mcp_server_ref01_resdata_up0 = (await mcp_server_ref01_ent.update(mcp_server_ref01_data_up0)).data();
        (0, node_assert_1.default)(mcp_server_ref01_resdata_up0.id === mcp_server_ref01_data_up0.id);
        (0, node_assert_1.default)(mcp_server_ref01_resdata_up0[mcp_server_ref01_markdef_up0.name] === mcp_server_ref01_markdef_up0.value);
        // LOAD
        const mcp_server_ref01_match_dt0 = {};
        mcp_server_ref01_match_dt0.id = mcp_server_ref01_data.id;
        const mcp_server_ref01_data_dt0 = (await mcp_server_ref01_ent.load(mcp_server_ref01_match_dt0)).data();
        (0, node_assert_1.default)(mcp_server_ref01_data_dt0.id === mcp_server_ref01_data.id);
        // REMOVE
        const mcp_server_ref01_match_rm0 = { id: mcp_server_ref01_data.id };
        await mcp_server_ref01_ent.remove(mcp_server_ref01_match_rm0);
        // LIST
        const mcp_server_ref01_match_rt0 = {};
        const mcp_server_ref01_list_rt0 = (await mcp_server_ref01_ent.list(mcp_server_ref01_match_rt0)).map((e) => e.data());
        (0, node_assert_1.default)(isempty(select(mcp_server_ref01_list_rt0, { id: mcp_server_ref01_data.id })));
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
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/mcp_server/McpServerTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.DigitaloceanSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['mcp_server01', 'mcp_server02', 'mcp_server03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'DIGITALOCEAN_TEST_MCP_SERVER_ENTID': idmap,
        'DIGITALOCEAN_TEST_LIVE': 'FALSE',
        'DIGITALOCEAN_TEST_EXPLAIN': 'FALSE',
        'DIGITALOCEAN_APIKEY': '',
    });
    idmap = env['DIGITALOCEAN_TEST_MCP_SERVER_ENTID'];
    const live = 'TRUE' === env.DIGITALOCEAN_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['DIGITALOCEAN_TEST_MCP_SERVER_ENTID'];
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
//# sourceMappingURL=McpServerEntity.test.js.map