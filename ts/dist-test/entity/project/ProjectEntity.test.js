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
(0, node_test_1.describe)('ProjectEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when DIGITALOCEAN_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('DIGITALOCEAN_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.DigitaloceanSDK.test();
        const ent = testsdk.Project();
        (0, node_assert_1.default)(null != ent);
    });
    class FailHook extends __1.BaseFeature {
        name = 'failhook';
        version = '0.0.1';
        active = true;
        unexpected = 0;
        init() { }
        PreSpec() { throw new Error('project hook failed'); }
        PreUnexpected() { this.unexpected++; }
    }
    (0, node_test_1.test)('stream-error', async () => {
        const offline = { net: { offline: true } };
        await node_assert_1.default.rejects(async () => {
            for await (const _item of __1.DigitaloceanSDK.test(offline).Project().stream('list')) { }
        }, /offline/);
        for await (const _item of __1.DigitaloceanSDK.test(offline).Project()
            .stream('list', undefined, { ctrl: { throw: false } })) { }
        if (null != __1.config.feature?.rbac) {
            const denied = __1.DigitaloceanSDK.test(undefined, { feature: { rbac: { active: true, deny: true } } });
            await node_assert_1.default.rejects(async () => {
                for await (const _item of denied.Project().stream('list')) { }
            }, (err) => 'rbac_denied' === err.code);
        }
    });
    (0, node_test_1.test)('stream-ctrl', async () => {
        const explain = {};
        const ctrl = { explain };
        for await (const _item of __1.DigitaloceanSDK.test().Project().stream('list', undefined, { ctrl })) { }
        node_assert_1.default.deepStrictEqual(Object.keys(ctrl), ['explain']);
        (0, node_assert_1.default)(explain === ctrl.explain && 0 < Object.keys(explain).length);
    });
    (0, node_test_1.test)('unexpected', async () => {
        const hook = new FailHook();
        const client = new __1.DigitaloceanSDK({ feature: { test: { active: true } }, extend: [hook] });
        await node_assert_1.default.rejects(client.Project().list(), /hook failed/);
        (0, node_assert_1.default)(0 < hook.unexpected);
        const fired = hook.unexpected;
        node_assert_1.default.strictEqual(await client.Project().list(undefined, { throw: false }), undefined);
        (0, node_assert_1.default)(fired < hook.unexpected);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.DigitaloceanSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.Project().list({ "page": "x" }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.DIGITALOCEAN_TEST_LIVE;
        for (const op of ['create', 'list', 'update', 'load', 'remove']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'project.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "created_at": { "a": true, "fo": "date-time", "h": "Created At", "n": "created_at", "r": false, "ro": true, "sh": "A time value given in ISO8601 combined date and time format that represents when the project was created.", "t": "`$STRING`", "key$": "created_at", "index$": 0 }, "description": { "a": true, "h": "Description", "n": "description", "op": { "update": { "req": true, "type": "`$STRING`" } }, "r": false, "sh": "The description of the project.", "t": "`$STRING`", "key$": "description", "index$": 1 }, "environment": { "a": true, "h": "Environment", "n": "environment", "op": { "update": { "req": true, "type": "`$STRING`" } }, "r": false, "sh": "The environment of the project's resources.", "t": "`$STRING`", "key$": "environment", "index$": 2 }, "id": { "a": true, "fo": "uuid", "h": "Id", "n": "id", "r": false, "ro": true, "sh": "The unique universal identifier of this project.", "t": "`$STRING`", "key$": "id", "index$": 3 }, "is_default": { "a": true, "h": "Is Default", "n": "is_default", "op": { "update": { "req": true, "type": "`$BOOLEAN`" } }, "r": false, "sh": "If true, all resources will be added to this project if no project is specified.", "t": "`$BOOLEAN`", "key$": "is_default", "index$": 4 }, "name": { "a": true, "h": "Name", "n": "name", "op": { "create": { "req": true, "type": "`$STRING`" }, "update": { "req": true, "type": "`$STRING`" } }, "r": false, "sh": "The human-readable name for the project.", "t": "`$STRING`", "key$": "name", "index$": 5 }, "owner_id": { "a": true, "h": "Owner Id", "n": "owner_id", "r": false, "ro": true, "sh": "The integer id of the project owner.", "t": "`$INTEGER`", "key$": "owner_id", "index$": 6 }, "owner_uuid": { "a": true, "h": "Owner Uuid", "n": "owner_uuid", "r": false, "ro": true, "sh": "The unique universal identifier of the project owner.", "t": "`$STRING`", "key$": "owner_uuid", "index$": 7 }, "purpose": { "a": true, "h": "Purpose", "n": "purpose", "op": { "create": { "req": true, "type": "`$STRING`" }, "update": { "req": true, "type": "`$STRING`" } }, "r": false, "sh": "The purpose of the project.", "t": "`$STRING`", "key$": "purpose", "index$": 8 }, "updated_at": { "a": true, "fo": "date-time", "h": "Updated At", "n": "updated_at", "r": false, "ro": true, "sh": "A time value given in ISO8601 combined date and time format that represents when the project was updated.", "t": "`$STRING`", "key$": "updated_at", "index$": 9 } }, "id": { "field": "id", "name": "id" }, "name": "project", "op": { "create": { "input": "data", "name": "create", "points": [{ "a": true, "co": { "id": "POST /v2/projects", "source": "openapi3", "version": 2 }, "g": {}, "k": "http", "m": "POST", "o": "/v2/projects", "q": {}, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "v2" }, { "lit": "projects" }], "t": { "req": "`reqdata`", "res": "`body.project`" }, "index$": 0 }], "key$": "create" }, "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /v2/projects", "source": "openapi3", "version": 2 }, "g": { "query": [{ "a": true, "ex": 1, "k": "query", "n": "page", "or": "page", "r": false, "t": "`$INTEGER`", "index$": 0 }, { "a": true, "ex": 2, "k": "query", "n": "per_page", "or": "per_page", "r": false, "t": "`$INTEGER`", "index$": 1 }] }, "k": "http", "m": "GET", "o": "/v2/projects", "q": {}, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "v2" }, { "lit": "projects" }], "t": { "req": "`reqdata`", "res": "`body.projects`" }, "index$": 0 }], "key$": "list" }, "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /v2/projects/{project_id}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "ex": "4de7ac8b-495b-4884-9a69-1050c6793cd6", "k": "param", "n": "id", "or": "project_id", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/v2/projects/{project_id}", "q": { "exist": ["id"] }, "r": { "param": { "project_id": "id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "v2" }, { "lit": "projects" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body.project`" }, "index$": 0 }, { "a": true, "co": { "id": "GET /v2/projects/default", "source": "openapi3", "version": 2 }, "g": {}, "k": "http", "m": "GET", "o": "/v2/projects/default", "q": { "$action": "default" }, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "v2" }, { "lit": "projects" }, { "lit": "default" }], "t": { "req": "`reqdata`", "res": "`body.project`" }, "index$": 1 }], "key$": "load" }, "patch": { "input": "data", "name": "patch", "points": [{ "a": true, "co": { "id": "PATCH /v2/projects/{project_id}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "ex": "4de7ac8b-495b-4884-9a69-1050c6793cd6", "k": "param", "n": "id", "or": "project_id", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "PATCH", "o": "/v2/projects/{project_id}", "q": { "exist": ["id"] }, "r": { "param": { "project_id": "id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "v2" }, { "lit": "projects" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body.project`" }, "index$": 0 }, { "a": true, "co": { "id": "PATCH /v2/projects/default", "source": "openapi3", "version": 2 }, "g": {}, "k": "http", "m": "PATCH", "o": "/v2/projects/default", "q": { "$action": "default" }, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "v2" }, { "lit": "projects" }, { "lit": "default" }], "t": { "req": "`reqdata`", "res": "`body.project`" }, "index$": 1 }], "key$": "patch" }, "remove": { "input": "data", "name": "remove", "points": [{ "a": true, "co": { "id": "DELETE /v2/projects/{project_id}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "ex": "4de7ac8b-495b-4884-9a69-1050c6793cd6", "k": "param", "n": "id", "or": "project_id", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "DELETE", "o": "/v2/projects/{project_id}", "q": { "exist": ["id"] }, "r": { "param": { "project_id": "id" } }, "s": [{ "lit": "v2" }, { "lit": "projects" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "remove" }, "update": { "input": "data", "name": "update", "points": [{ "a": true, "co": { "id": "PUT /v2/projects/{project_id}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "ex": "4de7ac8b-495b-4884-9a69-1050c6793cd6", "k": "param", "n": "id", "or": "project_id", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "PUT", "o": "/v2/projects/{project_id}", "q": { "exist": ["id"] }, "r": { "param": { "project_id": "id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "v2" }, { "lit": "projects" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body.project`" }, "index$": 0 }, { "a": true, "co": { "id": "PUT /v2/projects/default", "source": "openapi3", "version": 2 }, "g": {}, "k": "http", "m": "PUT", "o": "/v2/projects/default", "q": { "$action": "default" }, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "v2" }, { "lit": "projects" }, { "lit": "default" }], "t": { "req": "`reqdata`", "res": "`body.project`" }, "index$": 1 }], "key$": "update" } }, "relations": { "ancestors": [] }, "key$": "project", "name__orig": "project", "Name": "Project", "name_": "project", "name-": "project", "NAME": "PROJECT", "index$": 193 }, { "active": true, "entity": "project", "key$": "BasicProjectFlow", "kind": "basic", "name": "BasicProjectFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "project_ref01" }, "m": {}, "o": "create", "s": [], "v": [], "index$": 0 }, { "a": true, "d": {}, "i": {}, "m": {}, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "project_ref01" } }], "index$": 1 }, { "a": true, "d": {}, "i": { "ref": "project_ref01", "srcdatavar": "project_ref01_data", "suffix": "_up0", "textfield": "description" }, "m": {}, "o": "update", "s": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-project_ref01" } }], "v": [], "index$": 2 }, { "a": true, "d": {}, "i": { "ref": "project_ref01", "srcdatavar": "project_ref01_data", "suffix": "_dt0" }, "m": {}, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-project_ref01" } }], "index$": 3 }, { "a": true, "d": {}, "i": { "ref": "project_ref01", "suffix": "_rm0" }, "m": { "id": "project01" }, "o": "remove", "s": [], "v": [], "index$": 4 }, { "a": true, "d": {}, "i": { "suffix": "_rt0" }, "m": {}, "o": "list", "s": [], "v": [{ "apply": "ItemNotExists", "def": { "ref": "project_ref01" } }], "index$": 5 }] }, 'Project', { "POST /v2/projects": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "allOf": [{ "type": "object", "properties": { "id": { "type": "string", "format": "uuid", "readOnly": true, "example": "4e1bfbc3-dc3e-41f2-a18f-1b4d7ba71679", "description": "The unique universal identifier of this project.", "key$": "id" }, "owner_uuid": { "type": "string", "readOnly": true, "example": "99525febec065ca37b2ffe4f852fd2b2581895e7", "description": "The unique universal identifier of the project owner.", "key$": "owner_uuid" }, "owner_id": { "type": "integer", "readOnly": true, "example": 258992, "description": "The integer id of the project owner.", "key$": "owner_id" }, "name": { "type": "string", "maxLength": 175, "example": "my-web-api", "description": "The human-readable name for the project. The maximum length is 175 characters and the name must be unique.", "key$": "name" }, "description": { "type": "string", "maxLength": 255, "example": "My website API", "description": "The description of the project. The maximum length is 255 characters.", "key$": "description" }, "purpose": { "type": "string", "maxLength": 255, "example": "Service or API", "description": "The purpose of the project. The maximum length is 255 characters. It can\nhave one of the following values:\n\n- Just trying out DigitalOcean\n- Class project / Educational purposes\n- Website or blog\n- Web Application\n- Service or API\n- Mobile Application\n- Machine learning / AI / Data processing\n- IoT\n- Operational / Developer tooling\n\nIf another value for purpose is specified, for example, \"your custom purpose\",\nyour purpose will be stored as `Other: your custom purpose`.\n", "key$": "purpose" }, "environment": { "type": "string", "enum": ["Development", "Staging", "Production"], "example": "Production", "description": "The environment of the project's resources.", "key$": "environment" }, "created_at": { "type": "string", "format": "date-time", "readOnly": true, "example": "2018-09-27T20:10:35Z", "description": "A time value given in ISO8601 combined date and time format that represents when the project was created.", "key$": "created_at" }, "updated_at": { "type": "string", "format": "date-time", "readOnly": true, "example": "2018-09-27T20:10:35Z", "description": "A time value given in ISO8601 combined date and time format that represents when the project was updated.", "key$": "updated_at" } }, "x-ref": "#/components/schemas/project_base" }], "required": ["name", "purpose"], "index$": 1 } } } }, "parameters": [] }, "GET /v2/projects": { "protocol": "http", "parameters": [{ "in": "query", "name": "per_page", "required": false, "description": "Number of items returned per page", "schema": { "type": "integer", "minimum": 1, "default": 20, "maximum": 200 }, "example": 2, "x-ref": "#/components/parameters/parameters_per_page", "index$": 0 }, { "in": "query", "name": "page", "required": false, "description": "Which 'page' of paginated results to return.", "schema": { "type": "integer", "minimum": 1, "default": 1 }, "example": 1, "x-ref": "#/components/parameters/page", "index$": 1 }] }, "GET /v2/projects/{project_id}": { "protocol": "http", "parameters": [{ "in": "path", "name": "project_id", "description": "A unique identifier for a project.", "required": true, "schema": { "type": "string", "format": "uuid", "minimum": 1 }, "example": "4de7ac8b-495b-4884-9a69-1050c6793cd6", "x-ref": "#/components/parameters/project_id", "index$": 0 }] }, "GET /v2/projects/default": { "protocol": "http", "parameters": [] }, "PATCH /v2/projects/{project_id}": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "allOf": [{ "type": "object", "properties": { "id": { "type": "string", "format": "uuid", "readOnly": true, "example": "4e1bfbc3-dc3e-41f2-a18f-1b4d7ba71679", "description": "The unique universal identifier of this project.", "key$": "id" }, "owner_uuid": { "type": "string", "readOnly": true, "example": "99525febec065ca37b2ffe4f852fd2b2581895e7", "description": "The unique universal identifier of the project owner.", "key$": "owner_uuid" }, "owner_id": { "type": "integer", "readOnly": true, "example": 258992, "description": "The integer id of the project owner.", "key$": "owner_id" }, "name": { "type": "string", "maxLength": 175, "example": "my-web-api", "description": "The human-readable name for the project. The maximum length is 175 characters and the name must be unique.", "key$": "name" }, "description": { "type": "string", "maxLength": 255, "example": "My website API", "description": "The description of the project. The maximum length is 255 characters.", "key$": "description" }, "purpose": { "type": "string", "maxLength": 255, "example": "Service or API", "description": "The purpose of the project. The maximum length is 255 characters. It can\nhave one of the following values:\n\n- Just trying out DigitalOcean\n- Class project / Educational purposes\n- Website or blog\n- Web Application\n- Service or API\n- Mobile Application\n- Machine learning / AI / Data processing\n- IoT\n- Operational / Developer tooling\n\nIf another value for purpose is specified, for example, \"your custom purpose\",\nyour purpose will be stored as `Other: your custom purpose`.\n", "key$": "purpose" }, "environment": { "type": "string", "enum": ["Development", "Staging", "Production"], "example": "Production", "description": "The environment of the project's resources.", "key$": "environment" }, "created_at": { "type": "string", "format": "date-time", "readOnly": true, "example": "2018-09-27T20:10:35Z", "description": "A time value given in ISO8601 combined date and time format that represents when the project was created.", "key$": "created_at" }, "updated_at": { "type": "string", "format": "date-time", "readOnly": true, "example": "2018-09-27T20:10:35Z", "description": "A time value given in ISO8601 combined date and time format that represents when the project was updated.", "key$": "updated_at" } }, "x-ref": "#/components/schemas/project_base" }, { "type": "object", "properties": { "is_default": { "type": "boolean", "example": false, "description": "If true, all resources will be added to this project if no project is specified.", "key$": "is_default" } } }], "x-ref": "#/components/schemas/project", "index$": 1 }, "example": { "name": "my-web-api" } } } }, "parameters": [{ "in": "path", "name": "project_id", "description": "A unique identifier for a project.", "required": true, "schema": { "type": "string", "format": "uuid", "minimum": 1 }, "example": "4de7ac8b-495b-4884-9a69-1050c6793cd6", "x-ref": "#/components/parameters/project_id", "index$": 0 }] }, "PATCH /v2/projects/default": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "allOf": [{ "type": "object", "properties": { "id": { "type": "string", "format": "uuid", "readOnly": true, "example": "4e1bfbc3-dc3e-41f2-a18f-1b4d7ba71679", "description": "The unique universal identifier of this project.", "key$": "id" }, "owner_uuid": { "type": "string", "readOnly": true, "example": "99525febec065ca37b2ffe4f852fd2b2581895e7", "description": "The unique universal identifier of the project owner.", "key$": "owner_uuid" }, "owner_id": { "type": "integer", "readOnly": true, "example": 258992, "description": "The integer id of the project owner.", "key$": "owner_id" }, "name": { "type": "string", "maxLength": 175, "example": "my-web-api", "description": "The human-readable name for the project. The maximum length is 175 characters and the name must be unique.", "key$": "name" }, "description": { "type": "string", "maxLength": 255, "example": "My website API", "description": "The description of the project. The maximum length is 255 characters.", "key$": "description" }, "purpose": { "type": "string", "maxLength": 255, "example": "Service or API", "description": "The purpose of the project. The maximum length is 255 characters. It can\nhave one of the following values:\n\n- Just trying out DigitalOcean\n- Class project / Educational purposes\n- Website or blog\n- Web Application\n- Service or API\n- Mobile Application\n- Machine learning / AI / Data processing\n- IoT\n- Operational / Developer tooling\n\nIf another value for purpose is specified, for example, \"your custom purpose\",\nyour purpose will be stored as `Other: your custom purpose`.\n", "key$": "purpose" }, "environment": { "type": "string", "enum": ["Development", "Staging", "Production"], "example": "Production", "description": "The environment of the project's resources.", "key$": "environment" }, "created_at": { "type": "string", "format": "date-time", "readOnly": true, "example": "2018-09-27T20:10:35Z", "description": "A time value given in ISO8601 combined date and time format that represents when the project was created.", "key$": "created_at" }, "updated_at": { "type": "string", "format": "date-time", "readOnly": true, "example": "2018-09-27T20:10:35Z", "description": "A time value given in ISO8601 combined date and time format that represents when the project was updated.", "key$": "updated_at" } }, "x-ref": "#/components/schemas/project_base" }, { "type": "object", "properties": { "is_default": { "type": "boolean", "example": false, "description": "If true, all resources will be added to this project if no project is specified.", "key$": "is_default" } } }], "x-ref": "#/components/schemas/project" }, "example": { "name": "my-web-api" } } } }, "parameters": [] }, "DELETE /v2/projects/{project_id}": { "protocol": "http", "parameters": [{ "in": "path", "name": "project_id", "description": "A unique identifier for a project.", "required": true, "schema": { "type": "string", "format": "uuid", "minimum": 1 }, "example": "4de7ac8b-495b-4884-9a69-1050c6793cd6", "x-ref": "#/components/parameters/project_id", "index$": 0 }] }, "PUT /v2/projects/{project_id}": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "allOf": [{ "allOf": [{ "type": "object", "properties": { "id": {}, "owner_uuid": {}, "owner_id": {}, "name": {}, "description": {}, "purpose": {}, "environment": {}, "created_at": {}, "updated_at": {} }, "x-ref": "#/components/schemas/project_base" }, { "type": "object", "properties": { "is_default": {} } }], "x-ref": "#/components/schemas/project" }], "required": ["name", "description", "purpose", "environment", "is_default"], "index$": 1 } } } }, "parameters": [{ "in": "path", "name": "project_id", "description": "A unique identifier for a project.", "required": true, "schema": { "type": "string", "format": "uuid", "minimum": 1 }, "example": "4de7ac8b-495b-4884-9a69-1050c6793cd6", "x-ref": "#/components/parameters/project_id", "index$": 0 }] }, "PUT /v2/projects/default": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "allOf": [{ "allOf": [{ "type": "object", "properties": { "id": {}, "owner_uuid": {}, "owner_id": {}, "name": {}, "description": {}, "purpose": {}, "environment": {}, "created_at": {}, "updated_at": {} }, "x-ref": "#/components/schemas/project_base" }, { "type": "object", "properties": { "is_default": {} } }], "x-ref": "#/components/schemas/project" }], "required": ["name", "description", "purpose", "environment", "is_default"] } } } }, "parameters": [] } }, { strict: LIVE_STRICT, t });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const project_ref01_ent = client.Project();
        let project_ref01_data = setup.data.new.project['project_ref01'];
        project_ref01_data = (await project_ref01_ent.create(project_ref01_data)).data();
        (0, node_assert_1.default)(null != project_ref01_data.id);
        // LIST
        const project_ref01_match = {};
        const project_ref01_list = (await project_ref01_ent.list(project_ref01_match)).map((e) => e.data());
        (0, node_assert_1.default)(!isempty(select(project_ref01_list, { id: project_ref01_data.id })));
        // UPDATE
        const project_ref01_data_up0 = {};
        project_ref01_data_up0.id = project_ref01_data.id;
        const project_ref01_markdef_up0 = { name: 'description', value: 'Mark01-project_ref01_' + setup.now };
        project_ref01_data_up0[project_ref01_markdef_up0.name] = project_ref01_markdef_up0.value;
        const project_ref01_resdata_up0 = (await project_ref01_ent.update(project_ref01_data_up0)).data();
        (0, node_assert_1.default)(project_ref01_resdata_up0.id === project_ref01_data_up0.id);
        (0, node_assert_1.default)(project_ref01_resdata_up0[project_ref01_markdef_up0.name] === project_ref01_markdef_up0.value);
        // LOAD
        const project_ref01_match_dt0 = {};
        project_ref01_match_dt0.id = project_ref01_data.id;
        const project_ref01_data_dt0 = (await project_ref01_ent.load(project_ref01_match_dt0)).data();
        (0, node_assert_1.default)(project_ref01_data_dt0.id === project_ref01_data.id);
        // REMOVE
        const project_ref01_match_rm0 = { id: project_ref01_data.id };
        await project_ref01_ent.remove(project_ref01_match_rm0);
        // LIST
        const project_ref01_match_rt0 = {};
        const project_ref01_list_rt0 = (await project_ref01_ent.list(project_ref01_match_rt0)).map((e) => e.data());
        (0, node_assert_1.default)(isempty(select(project_ref01_list_rt0, { id: project_ref01_data.id })));
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
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/project/ProjectTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.DigitaloceanSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['project01', 'project02', 'project03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'DIGITALOCEAN_TEST_PROJECT_ENTID': idmap,
        'DIGITALOCEAN_TEST_LIVE': 'FALSE',
        'DIGITALOCEAN_TEST_EXPLAIN': 'FALSE',
        'DIGITALOCEAN_APIKEY': '',
    });
    idmap = env['DIGITALOCEAN_TEST_PROJECT_ENTID'];
    const live = 'TRUE' === env.DIGITALOCEAN_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['DIGITALOCEAN_TEST_PROJECT_ENTID'];
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
//# sourceMappingURL=ProjectEntity.test.js.map