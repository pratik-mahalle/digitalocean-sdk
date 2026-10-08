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
(0, node_test_1.describe)('ConnectionEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when DIGITALOCEAN_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('DIGITALOCEAN_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.DigitaloceanSDK.test();
        const ent = testsdk.Connection();
        (0, node_assert_1.default)(null != ent);
    });
    class FailHook extends __1.BaseFeature {
        name = 'failhook';
        version = '0.0.1';
        active = true;
        unexpected = 0;
        init() { }
        PreSpec() { throw new Error('connection hook failed'); }
        PreUnexpected() { this.unexpected++; }
    }
    (0, node_test_1.test)('stream-error', async () => {
        const offline = { net: { offline: true } };
        await node_assert_1.default.rejects(async () => {
            for await (const _item of __1.DigitaloceanSDK.test(offline).Connection().stream('list')) { }
        }, /offline/);
        for await (const _item of __1.DigitaloceanSDK.test(offline).Connection()
            .stream('list', undefined, { ctrl: { throw: false } })) { }
        if (null != __1.config.feature?.rbac) {
            const denied = __1.DigitaloceanSDK.test(undefined, { feature: { rbac: { active: true, deny: true } } });
            await node_assert_1.default.rejects(async () => {
                for await (const _item of denied.Connection().stream('list')) { }
            }, (err) => 'rbac_denied' === err.code);
        }
    });
    (0, node_test_1.test)('stream-ctrl', async () => {
        const explain = {};
        const ctrl = { explain };
        for await (const _item of __1.DigitaloceanSDK.test().Connection().stream('list', undefined, { ctrl })) { }
        node_assert_1.default.deepStrictEqual(Object.keys(ctrl), ['explain']);
        (0, node_assert_1.default)(explain === ctrl.explain && 0 < Object.keys(explain).length);
    });
    (0, node_test_1.test)('unexpected', async () => {
        const hook = new FailHook();
        const client = new __1.DigitaloceanSDK({ feature: { test: { active: true } }, extend: [hook] });
        await node_assert_1.default.rejects(client.Connection().list(), /hook failed/);
        (0, node_assert_1.default)(0 < hook.unexpected);
        const fired = hook.unexpected;
        node_assert_1.default.strictEqual(await client.Connection().list(undefined, { throw: false }), undefined);
        (0, node_assert_1.default)(fired < hook.unexpected);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.DigitaloceanSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.Connection().list({ "page": "x" }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.DIGITALOCEAN_TEST_LIVE;
        for (const op of ['create', 'list', 'load', 'remove']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'connection.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "api_key": { "a": true, "h": "Api Key", "n": "api_key", "r": false, "sh": "Set for `team_api_key` connections.", "t": "`$OBJECT`", "key$": "api_key", "index$": 0 }, "authorization": { "a": true, "h": "Authorization", "n": "authorization", "r": false, "sh": "Present only while the connection is pending and you created it.", "t": "`$ANY`", "key$": "authorization", "index$": 1 }, "connection": { "a": true, "h": "Connection", "n": "connection", "r": false, "sh": "The connection.", "t": "`$ANY`", "key$": "connection", "index$": 2 }, "connection_parameters": { "a": true, "h": "Connection Parameters", "n": "connection_parameters", "r": false, "sh": "Values for the provider's `connection_parameters`, validated against their specifications.", "t": "`$OBJECT`", "key$": "connection_parameters", "index$": 3 }, "created_at": { "a": true, "fo": "date-time", "h": "Created At", "n": "created_at", "r": false, "sh": "When the connection was created.", "t": "`$STRING`", "key$": "created_at", "index$": 4 }, "credential": { "a": true, "h": "Credential", "n": "credential", "r": false, "sh": "Optional credential to connect through.", "t": "`$OBJECT`", "key$": "credential", "index$": 5 }, "credential_id": { "a": true, "h": "Credential Id", "n": "credential_id", "r": false, "sh": "Empty for `digitalocean_oauth`; otherwise the ID of the team provider credential the connection uses.", "t": "`$STRING`", "key$": "credential_id", "index$": 6 }, "credential_kind": { "a": true, "h": "Credential Kind", "n": "credential_kind", "r": false, "sh": "`digitalocean_oauth`, `private_oauth`, or `team_api_key`.", "t": "`$STRING`", "key$": "credential_kind", "index$": 7 }, "granted_at": { "a": true, "de": true, "fo": "date-time", "h": "Granted At", "n": "granted_at", "r": false, "sh": "Deprecated: read `oauth.granted_at`.", "t": "`$STRING`", "key$": "granted_at", "index$": 8 }, "id": { "a": true, "fo": "uuid", "h": "Id", "n": "id", "r": false, "sh": "Opaque connection ID.", "t": "`$STRING`", "key$": "id", "index$": 9 }, "network": { "a": true, "h": "Network", "n": "network", "r": false, "sh": "Optional private network for the connection's calls.", "t": "`$OBJECT`", "key$": "network", "index$": 10 }, "oauth": { "a": true, "h": "Oauth", "n": "oauth", "r": false, "sh": "Set for `digitalocean_oauth` and `private_oauth` connections.", "t": "`$OBJECT`", "key$": "oauth", "index$": 11 }, "owning_user_id": { "a": true, "h": "Owning User Id", "n": "owning_user_id", "r": false, "sh": "DigitalOcean user ID of the user who created the connection, when recorded.", "t": "`$STRING`", "key$": "owning_user_id", "index$": 12 }, "provider": { "a": true, "h": "Provider", "n": "provider", "op": { "list": { "req": false, "type": "`$STRING`" } }, "r": true, "sh": "Required provider slug, from the provider list.", "t": "`$STRING`", "key$": "provider", "index$": 13 }, "provider_display_name": { "a": true, "h": "Provider Display Name", "n": "provider_display_name", "r": false, "sh": "Human-readable provider name, for example `Jira`.", "t": "`$STRING`", "key$": "provider_display_name", "index$": 14 }, "revoked_at": { "a": true, "fo": "date-time", "h": "Revoked At", "n": "revoked_at", "r": false, "sh": "When the connection was revoked.", "t": "`$STRING`", "key$": "revoked_at", "index$": 15 }, "scopes": { "a": true, "de": true, "h": "Scopes", "n": "scopes", "r": false, "sh": "Optional OAuth scopes to request.", "t": "`$ARRAY`", "key$": "scopes", "index$": 16 }, "status": { "a": true, "h": "Status", "n": "status", "r": false, "sh": "pending, active, revoked, or expired.", "t": "`$STRING`", "key$": "status", "index$": 17 }, "updated_at": { "a": true, "fo": "date-time", "h": "Updated At", "n": "updated_at", "r": false, "sh": "When the connection was last modified.", "t": "`$STRING`", "key$": "updated_at", "index$": 18 }, "user_id": { "a": true, "h": "User Id", "n": "user_id", "op": { "list": { "req": false, "type": "`$STRING`" } }, "r": true, "sh": "Required.", "t": "`$STRING`", "key$": "user_id", "index$": 19 } }, "id": { "field": "id", "name": "id" }, "name": "connection", "op": { "create": { "input": "data", "name": "create", "points": [{ "a": true, "co": { "id": "POST /v2/action-gateway/connections", "source": "openapi3", "version": 2 }, "g": {}, "k": "http", "m": "POST", "o": "/v2/action-gateway/connections", "q": {}, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "v2" }, { "lit": "action-gateway" }, { "lit": "connections" }], "t": { "req": "`reqdata`", "res": "`body.connection`" }, "index$": 0 }], "key$": "create" }, "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /v2/action-gateway/connections", "source": "openapi3", "version": 2 }, "g": { "query": [{ "a": true, "ex": 1, "k": "query", "n": "page", "or": "page", "r": false, "t": "`$INTEGER`", "index$": 0 }, { "a": true, "ex": 20, "k": "query", "n": "per_page", "or": "per_page", "r": false, "t": "`$INTEGER`", "index$": 1 }, { "a": true, "ex": "jira", "k": "query", "n": "provider", "or": "provider", "r": false, "t": "`$STRING`", "index$": 2 }, { "a": true, "ex": "created_at", "k": "query", "n": "sort", "or": "sort", "r": false, "t": "`$STRING`", "index$": 3 }, { "a": true, "ex": "desc", "k": "query", "n": "sort_direction", "or": "sort_direction", "r": false, "t": "`$STRING`", "index$": 4 }, { "a": true, "ex": "active", "k": "query", "n": "status", "or": "status", "r": false, "t": "`$STRING`", "index$": 5 }, { "a": true, "ex": "alice", "k": "query", "n": "user_id", "or": "user_id", "r": false, "t": "`$STRING`", "index$": 6 }] }, "k": "http", "m": "GET", "o": "/v2/action-gateway/connections", "q": {}, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "v2" }, { "lit": "action-gateway" }, { "lit": "connections" }], "t": { "req": "`reqdata`", "res": "`body.connections`" }, "index$": 0 }], "key$": "list" }, "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /v2/action-gateway/connections/{id}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "ex": "39f9f768-a7f9-4c91-9557-3328c53dd054", "k": "param", "n": "id", "or": "id", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/v2/action-gateway/connections/{id}", "q": { "exist": ["id"] }, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "v2" }, { "lit": "action-gateway" }, { "lit": "connections" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body.connection`" }, "index$": 0 }], "key$": "load" }, "remove": { "input": "data", "name": "remove", "points": [{ "a": true, "co": { "id": "DELETE /v2/action-gateway/connections/{id}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "ex": "39f9f768-a7f9-4c91-9557-3328c53dd054", "k": "param", "n": "id", "or": "id", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "DELETE", "o": "/v2/action-gateway/connections/{id}", "q": { "exist": ["id"] }, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "v2" }, { "lit": "action-gateway" }, { "lit": "connections" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body.connection`" }, "index$": 0 }], "key$": "remove" } }, "relations": { "ancestors": [] }, "key$": "connection", "name__orig": "connection", "Name": "Connection", "name_": "connection", "name-": "connection", "NAME": "CONNECTION", "index$": 130 }, { "active": true, "entity": "connection", "key$": "BasicConnectionFlow", "kind": "basic", "name": "BasicConnectionFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "connection_ref01" }, "m": {}, "o": "create", "s": [], "v": [], "index$": 0 }, { "a": true, "d": {}, "i": {}, "m": {}, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "connection_ref01" } }], "index$": 1 }, { "a": true, "d": {}, "i": { "ref": "connection_ref01", "srcdatavar": "connection_ref01_data", "suffix": "_dt0" }, "m": { "id": "connection01" }, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-connection_ref01" } }], "index$": 2 }, { "a": true, "d": {}, "i": { "ref": "connection_ref01", "suffix": "_rm0" }, "m": { "id": "connection01" }, "o": "remove", "s": [], "v": [], "index$": 3 }, { "a": true, "d": {}, "i": { "suffix": "_rt0" }, "m": {}, "o": "list", "s": [], "v": [{ "apply": "ItemNotExists", "def": { "ref": "connection_ref01" } }], "index$": 4 }] }, 'Connection', { "POST /v2/action-gateway/connections": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "required": ["provider", "user_id"], "properties": { "provider": { "type": "string", "description": "Required provider slug, from the provider list.", "example": "jira", "key$": "provider" }, "user_id": { "type": "string", "pattern": "^[A-Za-z0-9._-]{1,64}$", "description": "Required. Your identifier for the user the connection acts for: 1 to 64 characters from `[A-Za-z0-9._-]`. A session whose `actor_id` equals it uses this connection.", "example": "alice", "key$": "user_id" }, "scopes": { "type": "array", "description": "Optional OAuth scopes to request. Defaults to every scope the provider offers; scopes outside that set are rejected. Ignored for API-key credentials.", "items": { "type": "string" }, "example": ["write:jira-work"], "key$": "scopes" }, "connection_parameters": { "type": "object", "description": "Values for the provider's `connection_parameters`, validated against their specifications.", "example": { "site_url": "https://example.atlassian.net" }, "key$": "connection_parameters" }, "credential": { "type": "object", "description": "Optional credential to connect through. Omitted uses DigitalOcean's shared OAuth application.", "properties": { "digitalocean_oauth": { "type": "object", "description": "Use DigitalOcean's shared OAuth application.", "properties": {} }, "team_credential": { "type": "object", "description": "Use one of your team's provider credentials.", "properties": { "credential_id": {} } } }, "key$": "credential" }, "network": { "type": "object", "description": "Optional private network for the connection's calls. Requires VPC networking to be enabled for your account (403 otherwise).", "properties": { "vpc": { "type": "object", "properties": { "vpc_uuid": {}, "destinations": {} }, "description": "Route through a VPC." } }, "key$": "network" } }, "description": "Describes a connection to create.", "x-ref": "#/components/schemas/connection_create", "index$": 1 }, "example": { "provider": "jira", "user_id": "alice", "scopes": ["write:jira-work"], "connection_parameters": { "site_url": "https://example.atlassian.net" }, "credential": { "digitalocean_oauth": {} } } } } }, "parameters": [] }, "GET /v2/action-gateway/connections": { "protocol": "http", "parameters": [{ "name": "provider", "in": "query", "required": false, "description": "Optional provider slug, matched exactly.", "schema": { "type": "string" }, "example": "jira", "x-ref": "#/components/parameters/connection_provider", "index$": 0 }, { "name": "user_id", "in": "query", "required": false, "description": "Optional substring of `user_id`. It must use the `user_id` alphabet, `[A-Za-z0-9._-]`.", "schema": { "type": "string" }, "example": "alice", "x-ref": "#/components/parameters/connection_user_id", "index$": 1 }, { "name": "status", "in": "query", "required": false, "description": "pending|active|revoked|expired. List results always omit revoked connections, including when this filter is revoked.", "schema": { "type": "string", "enum": ["pending", "active", "expired"] }, "example": "active", "x-ref": "#/components/parameters/connection_status", "index$": 2 }, { "name": "sort", "in": "query", "required": false, "description": "`created_at`, provider, `user_id`, or status. Defaults to provider, then `user_id`.", "schema": { "type": "string", "enum": ["created_at", "provider", "user_id", "status"] }, "example": "created_at", "x-ref": "#/components/parameters/connection_sort", "index$": 3 }, { "name": "sort_direction", "in": "query", "required": false, "description": "asc (the default) or desc.", "schema": { "type": "string", "enum": ["asc", "desc"] }, "example": "desc", "x-ref": "#/components/parameters/sort_direction", "index$": 4 }, { "in": "query", "name": "page", "required": false, "description": "1-based page number. Values below 1 are treated as 1.", "schema": { "type": "integer", "minimum": 1, "default": 1 }, "example": 1, "x-ref": "#/components/parameters/page_connections", "index$": 5 }, { "name": "per_page", "in": "query", "required": false, "description": "Page size. Defaults to 20; values above 100 are capped at 100.", "schema": { "type": "integer", "minimum": 1, "maximum": 100, "default": 20 }, "example": 20, "x-ref": "#/components/parameters/per_page", "index$": 6 }] }, "GET /v2/action-gateway/connections/{id}": { "protocol": "http", "parameters": [{ "name": "id", "in": "path", "required": true, "description": "Connection ID.", "schema": { "type": "string" }, "example": "39f9f768-a7f9-4c91-9557-3328c53dd054", "x-ref": "#/components/parameters/connection_id", "index$": 0 }] }, "DELETE /v2/action-gateway/connections/{id}": { "protocol": "http", "parameters": [{ "name": "id", "in": "path", "required": true, "description": "Connection ID.", "schema": { "type": "string" }, "example": "39f9f768-a7f9-4c91-9557-3328c53dd054", "x-ref": "#/components/parameters/connection_id", "index$": 0 }] } }, { strict: LIVE_STRICT, t });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const connection_ref01_ent = client.Connection();
        let connection_ref01_data = setup.data.new.connection['connection_ref01'];
        connection_ref01_data = (await connection_ref01_ent.create(connection_ref01_data)).data();
        (0, node_assert_1.default)(null != connection_ref01_data.id);
        // LIST
        const connection_ref01_match = {};
        const connection_ref01_list = (await connection_ref01_ent.list(connection_ref01_match)).map((e) => e.data());
        (0, node_assert_1.default)(!isempty(select(connection_ref01_list, { id: connection_ref01_data.id })));
        // LOAD
        const connection_ref01_match_dt0 = {};
        connection_ref01_match_dt0.id = connection_ref01_data.id;
        const connection_ref01_data_dt0 = (await connection_ref01_ent.load(connection_ref01_match_dt0)).data();
        (0, node_assert_1.default)(connection_ref01_data_dt0.id === connection_ref01_data.id);
        // REMOVE
        const connection_ref01_match_rm0 = { id: connection_ref01_data.id };
        await connection_ref01_ent.remove(connection_ref01_match_rm0);
        // LIST
        const connection_ref01_match_rt0 = {};
        const connection_ref01_list_rt0 = (await connection_ref01_ent.list(connection_ref01_match_rt0)).map((e) => e.data());
        (0, node_assert_1.default)(isempty(select(connection_ref01_list_rt0, { id: connection_ref01_data.id })));
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
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/connection/ConnectionTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.DigitaloceanSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['connection01', 'connection02', 'connection03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'DIGITALOCEAN_TEST_CONNECTION_ENTID': idmap,
        'DIGITALOCEAN_TEST_LIVE': 'FALSE',
        'DIGITALOCEAN_TEST_EXPLAIN': 'FALSE',
        'DIGITALOCEAN_APIKEY': '',
    });
    idmap = env['DIGITALOCEAN_TEST_CONNECTION_ENTID'];
    const live = 'TRUE' === env.DIGITALOCEAN_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['DIGITALOCEAN_TEST_CONNECTION_ENTID'];
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
//# sourceMappingURL=ConnectionEntity.test.js.map