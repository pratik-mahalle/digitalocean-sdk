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
(0, node_test_1.describe)('ToolbeltEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when DIGITALOCEAN_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('DIGITALOCEAN_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.DigitaloceanSDK.test();
        const ent = testsdk.Toolbelt();
        (0, node_assert_1.default)(null != ent);
    });
    class FailHook extends __1.BaseFeature {
        name = 'failhook';
        version = '0.0.1';
        active = true;
        unexpected = 0;
        init() { }
        PreSpec() { throw new Error('toolbelt hook failed'); }
        PreUnexpected() { this.unexpected++; }
    }
    (0, node_test_1.test)('stream-error', async () => {
        const offline = { net: { offline: true } };
        await node_assert_1.default.rejects(async () => {
            for await (const _item of __1.DigitaloceanSDK.test(offline).Toolbelt().stream('list')) { }
        }, /offline/);
        for await (const _item of __1.DigitaloceanSDK.test(offline).Toolbelt()
            .stream('list', undefined, { ctrl: { throw: false } })) { }
        if (null != __1.config.feature?.rbac) {
            const denied = __1.DigitaloceanSDK.test(undefined, { feature: { rbac: { active: true, deny: true } } });
            await node_assert_1.default.rejects(async () => {
                for await (const _item of denied.Toolbelt().stream('list')) { }
            }, (err) => 'rbac_denied' === err.code);
        }
    });
    (0, node_test_1.test)('stream-ctrl', async () => {
        const explain = {};
        const ctrl = { explain };
        for await (const _item of __1.DigitaloceanSDK.test().Toolbelt().stream('list', undefined, { ctrl })) { }
        node_assert_1.default.deepStrictEqual(Object.keys(ctrl), ['explain']);
        (0, node_assert_1.default)(explain === ctrl.explain && 0 < Object.keys(explain).length);
    });
    (0, node_test_1.test)('unexpected', async () => {
        const hook = new FailHook();
        const client = new __1.DigitaloceanSDK({ feature: { test: { active: true } }, extend: [hook] });
        await node_assert_1.default.rejects(client.Toolbelt().list(), /hook failed/);
        (0, node_assert_1.default)(0 < hook.unexpected);
        const fired = hook.unexpected;
        node_assert_1.default.strictEqual(await client.Toolbelt().list(undefined, { throw: false }), undefined);
        (0, node_assert_1.default)(fired < hook.unexpected);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.DigitaloceanSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.Toolbelt().list({ "page": "x" }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.DIGITALOCEAN_TEST_LIVE;
        for (const op of ['create', 'list', 'load', 'remove']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'toolbelt.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "created_at": { "a": true, "fo": "date-time", "h": "Created At", "n": "created_at", "r": false, "sh": "When this version was created, in RFC 3339 format.", "t": "`$STRING`", "key$": "created_at", "index$": 0 }, "description": { "a": true, "h": "Description", "n": "description", "r": false, "sh": "Team-authored description.", "t": "`$STRING`", "key$": "description", "index$": 1 }, "display_name": { "a": true, "h": "Display Name", "n": "display_name", "r": false, "sh": "Human-readable label.", "t": "`$STRING`", "key$": "display_name", "index$": 2 }, "id": { "a": true, "h": "Id", "n": "id", "r": false, "t": "`$STRING`", "key$": "id", "index$": 3 }, "latest_version": { "a": true, "h": "Latest Version", "n": "latest_version", "r": false, "sh": "Latest version number, as a string.", "t": "`$STRING`", "key$": "latest_version", "index$": 4 }, "name": { "a": true, "h": "Name", "n": "name", "op": { "create": { "req": true, "type": "`$STRING`" } }, "r": false, "sh": "Toolbelt name, unique among your team's active toolbelts.", "t": "`$STRING`", "key$": "name", "index$": 5 }, "next_page_token": { "a": true, "h": "Next Page Token", "n": "next_page_token", "r": false, "sh": "Token for the next page of `tool_details`; empty on the last page.", "t": "`$STRING`", "key$": "next_page_token", "index$": 6 }, "reference": { "a": true, "h": "Reference", "n": "reference", "r": false, "sh": "`<name>@<version>`, identifying this exact version.", "t": "`$STRING`", "key$": "reference", "index$": 7 }, "reference_latest": { "a": true, "h": "Reference Latest", "n": "reference_latest", "r": false, "sh": "The toolbelt name, which refers to whichever version is latest.", "t": "`$STRING`", "key$": "reference_latest", "index$": 8 }, "status": { "a": true, "h": "Status", "n": "status", "r": false, "sh": "active, or deprecated once the toolbelt is deleted.", "t": "`$STRING`", "key$": "status", "index$": 9 }, "tool_count": { "a": true, "fo": "int32", "h": "Tool Count", "n": "tool_count", "r": false, "sh": "Number of entries in tools.", "t": "`$INTEGER`", "key$": "tool_count", "index$": 10 }, "tool_details": { "a": true, "h": "Tool Details", "n": "tool_details", "r": false, "sh": "The requested page of resolved catalog metadata for the members named in toolbelt.tools.", "t": "`$ARRAY`", "key$": "tool_details", "index$": 11 }, "toolbelt": { "a": true, "h": "Toolbelt", "n": "toolbelt", "r": false, "sh": "The requested toolbelt version.", "t": "`$ANY`", "key$": "toolbelt", "index$": 12 }, "tools": { "a": true, "h": "Tools", "n": "tools", "r": false, "sh": "Members, sorted, each as `<tool_slug>@<version>`: the tool and the version this toolbelt version pins.", "t": "`$ARRAY`", "key$": "tools", "index$": 13 }, "updated_at": { "a": true, "fo": "date-time", "h": "Updated At", "n": "updated_at", "r": false, "sh": "When this version was last modified, in RFC 3339 format.", "t": "`$STRING`", "key$": "updated_at", "index$": 14 }, "version": { "a": true, "h": "Version", "n": "version", "r": false, "sh": "Version number of this toolbelt version, as a string, for example `3`.", "t": "`$STRING`", "key$": "version", "index$": 15 }, "version_count": { "a": true, "fo": "int32", "h": "Version Count", "n": "version_count", "r": false, "sh": "Number of versions recorded under this name, including versions from before the toolbelt was deleted and the name reused.", "t": "`$INTEGER`", "key$": "version_count", "index$": 16 } }, "id": { "field": "id", "name": "id" }, "name": "toolbelt", "op": { "create": { "input": "data", "name": "create", "points": [{ "a": true, "co": { "id": "POST /v2/action-gateway/toolbelts/{name}/tools/add", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "ex": "search-toolbelt", "k": "param", "n": "name", "or": "name", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "POST", "o": "/v2/action-gateway/toolbelts/{name}/tools/add", "q": { "$action": "tool_add", "exist": ["name"] }, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "v2" }, { "lit": "action-gateway" }, { "lit": "toolbelts" }, { "var": "name" }, { "lit": "tools" }, { "lit": "add" }], "t": { "req": "`reqdata`", "res": "`body.toolbelt`" }, "index$": 0 }, { "a": true, "co": { "id": "POST /v2/action-gateway/toolbelts/{name}/tools/remove", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "ex": "search-toolbelt", "k": "param", "n": "name", "or": "name", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "POST", "o": "/v2/action-gateway/toolbelts/{name}/tools/remove", "q": { "$action": "tool_remove", "exist": ["name"] }, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "v2" }, { "lit": "action-gateway" }, { "lit": "toolbelts" }, { "var": "name" }, { "lit": "tools" }, { "lit": "remove" }], "t": { "req": "`reqdata`", "res": "`body.toolbelt`" }, "index$": 1 }, { "a": true, "co": { "id": "POST /v2/action-gateway/toolbelts", "source": "openapi3", "version": 2 }, "g": {}, "k": "http", "m": "POST", "o": "/v2/action-gateway/toolbelts", "q": {}, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "v2" }, { "lit": "action-gateway" }, { "lit": "toolbelts" }], "t": { "req": "`reqdata`", "res": "`body.toolbelt`" }, "index$": 2 }], "key$": "create" }, "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /v2/action-gateway/toolbelts", "source": "openapi3", "version": 2 }, "g": { "query": [{ "a": true, "ex": 1, "k": "query", "n": "page", "or": "page", "r": false, "t": "`$INTEGER`", "index$": 0 }, { "a": true, "ex": 20, "k": "query", "n": "per_page", "or": "per_page", "r": false, "t": "`$INTEGER`", "index$": 1 }, { "a": true, "ex": "active", "k": "query", "n": "status", "or": "status", "r": false, "t": "`$STRING`", "index$": 2 }] }, "k": "http", "m": "GET", "o": "/v2/action-gateway/toolbelts", "q": {}, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "v2" }, { "lit": "action-gateway" }, { "lit": "toolbelts" }], "t": { "req": "`reqdata`", "res": "`body.toolbelts`" }, "index$": 0 }], "key$": "list" }, "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /v2/action-gateway/toolbelts/{name}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "ex": "search-toolbelt", "k": "param", "n": "id", "or": "name", "r": true, "t": "`$STRING`", "index$": 0 }], "query": [{ "a": true, "ex": 20, "k": "query", "n": "page_size", "or": "page_size", "r": false, "t": "`$INTEGER`", "index$": 0 }, { "a": true, "ex": "ZXhhX3dlYl9zZWFyY2hAMQ", "k": "query", "n": "page_token", "or": "page_token", "r": false, "t": "`$STRING`", "index$": 1 }, { "a": true, "ex": "search", "k": "query", "n": "search", "or": "search", "r": false, "t": "`$STRING`", "index$": 2 }, { "a": true, "ex": "1", "k": "query", "n": "version", "or": "version", "r": false, "t": "`$STRING`", "index$": 3 }] }, "k": "http", "m": "GET", "o": "/v2/action-gateway/toolbelts/{name}", "q": { "exist": ["id"] }, "r": { "param": { "name": "id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "v2" }, { "lit": "action-gateway" }, { "lit": "toolbelts" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body.toolbelt`" }, "index$": 0 }], "key$": "load" }, "remove": { "input": "data", "name": "remove", "points": [{ "a": true, "co": { "id": "DELETE /v2/action-gateway/toolbelts/{name}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "ex": "search-toolbelt", "k": "param", "n": "id", "or": "name", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "DELETE", "o": "/v2/action-gateway/toolbelts/{name}", "q": { "exist": ["id"] }, "r": { "param": { "name": "id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "v2" }, { "lit": "action-gateway" }, { "lit": "toolbelts" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body.toolbelt`" }, "index$": 0 }], "key$": "remove" } }, "relations": { "ancestors": [] }, "key$": "toolbelt", "name__orig": "toolbelt", "Name": "Toolbelt", "name_": "toolbelt", "name-": "toolbelt", "NAME": "TOOLBELT", "index$": 210 }, { "active": true, "entity": "toolbelt", "key$": "BasicToolbeltFlow", "kind": "basic", "name": "BasicToolbeltFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "toolbelt_ref01" }, "m": {}, "o": "create", "s": [], "v": [], "index$": 0 }, { "a": true, "d": {}, "i": {}, "m": {}, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "toolbelt_ref01" } }], "index$": 1 }, { "a": true, "d": {}, "i": { "ref": "toolbelt_ref01", "srcdatavar": "toolbelt_ref01_data", "suffix": "_dt0" }, "m": { "id": "toolbelt01" }, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-toolbelt_ref01" } }], "index$": 2 }, { "a": true, "d": {}, "i": { "ref": "toolbelt_ref01", "suffix": "_rm0" }, "m": { "id": "toolbelt01" }, "o": "remove", "s": [], "v": [], "index$": 3 }, { "a": true, "d": {}, "i": { "suffix": "_rt0" }, "m": {}, "o": "list", "s": [], "v": [{ "apply": "ItemNotExists", "def": { "ref": "toolbelt_ref01" } }], "index$": 4 }] }, 'Toolbelt', { "POST /v2/action-gateway/toolbelts/{name}/tools/add": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "required": ["tools"], "properties": { "tools": { "type": "array", "minItems": 1, "maxItems": 500, "description": "Tool slugs (`<provider>_<name>`) to add or remove, each optionally pinned as `<tool_slug>@<version>`. At least one is required. When adding, a pin must equal the tool's current released version.", "items": { "type": "string" }, "example": ["exa_web_search"] } }, "description": "Lists the tools to add to or remove from a toolbelt.", "x-ref": "#/components/schemas/toolbelt_tools" }, "example": { "tools": ["jira_create_issue"] } } } }, "parameters": [{ "name": "name", "in": "path", "required": true, "description": "Toolbelt name, from the path.", "schema": { "type": "string", "pattern": "^[a-z][a-z0-9_-]{0,63}$" }, "example": "search-toolbelt", "x-ref": "#/components/parameters/toolbelt_name_toolbelts_tools_add", "index$": 0 }] }, "POST /v2/action-gateway/toolbelts/{name}/tools/remove": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "required": ["tools"], "properties": { "tools": { "type": "array", "minItems": 1, "maxItems": 500, "description": "Tool slugs (`<provider>_<name>`) to add or remove, each optionally pinned as `<tool_slug>@<version>`. At least one is required. When adding, a pin must equal the tool's current released version.", "items": { "type": "string" }, "example": ["exa_web_search"] } }, "description": "Lists the tools to add to or remove from a toolbelt.", "x-ref": "#/components/schemas/toolbelt_tools" }, "example": { "tools": ["exa_web_fetch"] } } } }, "parameters": [{ "name": "name", "in": "path", "required": true, "description": "Toolbelt name, from the path.", "schema": { "type": "string", "pattern": "^[a-z][a-z0-9_-]{0,63}$" }, "example": "search-toolbelt", "x-ref": "#/components/parameters/toolbelt_name_toolbelts_tools_add", "index$": 0 }] }, "POST /v2/action-gateway/toolbelts": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "required": ["name"], "properties": { "name": { "type": "string", "pattern": "^[a-z][a-z0-9_-]{0,63}$", "description": "Toolbelt name, unique among your team's active toolbelts. Must match `^`[a-z]``[a-z0-9_-]`{0,63}$`; `search` is reserved.", "example": "search-toolbelt", "key$": "name" }, "version": { "type": "string", "pattern": "^[0-9]+$", "default": "1", "description": "Optional initial version number, a positive integer such as `1`. Defaults to 1.", "example": "1", "key$": "version" }, "display_name": { "type": "string", "maxLength": 128, "example": "Search Tools", "description": "Optional human-readable label, separate from name. At most 128 bytes.", "key$": "display_name" }, "description": { "type": "string", "maxLength": 255, "example": "Tools for searching and fetching public web pages.", "description": "Optional description. At most 255 bytes.", "key$": "description" }, "tools": { "type": "array", "maxItems": 500, "description": "Optional initial members, as catalog tool slugs (`<provider>_<name>`). Each may be pinned as `<tool_slug>@<version>`; a pin must equal the tool's current released version, and an unpinned tool is pinned to that version. Every tool must be an active catalog tool. Duplicates are merged; at most 500 tools. Empty creates a toolbelt with no tools.", "items": { "type": "string" }, "example": ["exa_web_search", "exa_web_fetch"], "key$": "tools" } }, "description": "Describes a new toolbelt.", "x-ref": "#/components/schemas/toolbelt_create", "index$": 1 }, "example": { "name": "search-toolbelt", "display_name": "Search Tools", "description": "Tools for searching and fetching public web pages.", "tools": ["exa_web_search", "exa_web_fetch"] } } } }, "parameters": [] }, "GET /v2/action-gateway/toolbelts": { "protocol": "http", "parameters": [{ "name": "status", "in": "query", "required": false, "description": "active (default), deprecated, or all. Case-insensitive.", "schema": { "type": "string", "enum": ["active", "deprecated", "all"], "default": "active" }, "example": "active", "x-ref": "#/components/parameters/toolbelt_status", "index$": 0 }, { "in": "query", "name": "page", "required": false, "description": "1-based page number. Values below 1 are treated as 1.", "schema": { "type": "integer", "minimum": 1, "default": 1 }, "example": 1, "x-ref": "#/components/parameters/page_connections", "index$": 1 }, { "name": "per_page", "in": "query", "required": false, "description": "Page size. Defaults to 20; values above 100 are capped at 100.", "schema": { "type": "integer", "minimum": 1, "maximum": 100, "default": 20 }, "example": 20, "x-ref": "#/components/parameters/per_page", "index$": 2 }] }, "GET /v2/action-gateway/toolbelts/{name}": { "protocol": "http", "parameters": [{ "name": "name", "in": "path", "required": true, "description": "Toolbelt name.", "schema": { "type": "string", "pattern": "^[a-z][a-z0-9_-]{0,63}$" }, "example": "search-toolbelt", "x-ref": "#/components/parameters/toolbelt_name", "index$": 0 }, { "name": "version", "in": "query", "required": false, "description": "Version number to read. Empty returns the latest version.", "schema": { "type": "string", "pattern": "^[0-9]+$" }, "example": "1", "x-ref": "#/components/parameters/toolbelt_version", "index$": 1 }, { "name": "page_size", "in": "query", "required": false, "description": "Page size for `tool_details` only; toolbelt.tools always lists every member. Defaults to 20; values above 100 are capped at 100.", "schema": { "type": "integer", "minimum": 1, "maximum": 100, "default": 20 }, "example": 20, "x-ref": "#/components/parameters/page_size_toolbelts", "index$": 2 }, { "name": "page_token", "in": "query", "required": false, "description": "`next_page_token` from the previous response, to continue `tool_details`. Treat it as opaque, and send it only with the same toolbelt, version, and search.", "schema": { "type": "string" }, "example": "ZXhhX3dlYl9zZWFyY2hAMQ", "x-ref": "#/components/parameters/page_token_toolbelts", "index$": 3 }, { "name": "search", "in": "query", "required": false, "description": "Restricts `tool_details` to members whose tool slug, name, title, description, provider, or category contains this value, case-insensitively. It does not filter toolbelt.tools. This is a substring match, not a filter expression.", "schema": { "type": "string" }, "example": "search", "x-ref": "#/components/parameters/toolbelt_search", "index$": 4 }] }, "DELETE /v2/action-gateway/toolbelts/{name}": { "protocol": "http", "parameters": [{ "name": "name", "in": "path", "required": true, "description": "Toolbelt name.", "schema": { "type": "string", "pattern": "^[a-z][a-z0-9_-]{0,63}$" }, "example": "search-toolbelt", "x-ref": "#/components/parameters/toolbelt_name", "index$": 0 }] } }, { strict: LIVE_STRICT, t });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const toolbelt_ref01_ent = client.Toolbelt();
        let toolbelt_ref01_data = setup.data.new.toolbelt['toolbelt_ref01'];
        toolbelt_ref01_data = (await toolbelt_ref01_ent.create(toolbelt_ref01_data)).data();
        (0, node_assert_1.default)(null != toolbelt_ref01_data.id);
        // LIST
        const toolbelt_ref01_match = {};
        const toolbelt_ref01_list = (await toolbelt_ref01_ent.list(toolbelt_ref01_match)).map((e) => e.data());
        (0, node_assert_1.default)(!isempty(select(toolbelt_ref01_list, { id: toolbelt_ref01_data.id })));
        // LOAD
        const toolbelt_ref01_match_dt0 = {};
        toolbelt_ref01_match_dt0.id = toolbelt_ref01_data.id;
        const toolbelt_ref01_data_dt0 = (await toolbelt_ref01_ent.load(toolbelt_ref01_match_dt0)).data();
        (0, node_assert_1.default)(toolbelt_ref01_data_dt0.id === toolbelt_ref01_data.id);
        // REMOVE
        const toolbelt_ref01_match_rm0 = { id: toolbelt_ref01_data.id };
        await toolbelt_ref01_ent.remove(toolbelt_ref01_match_rm0);
        // LIST
        const toolbelt_ref01_match_rt0 = {};
        const toolbelt_ref01_list_rt0 = (await toolbelt_ref01_ent.list(toolbelt_ref01_match_rt0)).map((e) => e.data());
        (0, node_assert_1.default)(isempty(select(toolbelt_ref01_list_rt0, { id: toolbelt_ref01_data.id })));
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
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/toolbelt/ToolbeltTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.DigitaloceanSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['toolbelt01', 'toolbelt02', 'toolbelt03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'DIGITALOCEAN_TEST_TOOLBELT_ENTID': idmap,
        'DIGITALOCEAN_TEST_LIVE': 'FALSE',
        'DIGITALOCEAN_TEST_EXPLAIN': 'FALSE',
        'DIGITALOCEAN_APIKEY': '',
    });
    idmap = env['DIGITALOCEAN_TEST_TOOLBELT_ENTID'];
    const live = 'TRUE' === env.DIGITALOCEAN_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['DIGITALOCEAN_TEST_TOOLBELT_ENTID'];
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
//# sourceMappingURL=ToolbeltEntity.test.js.map