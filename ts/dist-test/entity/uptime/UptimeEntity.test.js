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
(0, node_test_1.describe)('UptimeEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when DIGITALOCEAN_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('DIGITALOCEAN_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.DigitaloceanSDK.test();
        const ent = testsdk.Uptime();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.DigitaloceanSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.Uptime().list({ "check_id": 1 }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.DIGITALOCEAN_TEST_LIVE;
        for (const op of ['create', 'list', 'update', 'load', 'remove']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'uptime.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "comparison": { "a": true, "h": "Comparison", "n": "comparison", "r": false, "sh": "The comparison operator used against the alert's threshold.", "t": "`$STRING`", "key$": "comparison", "index$": 0 }, "enabled": { "a": true, "h": "Enabled", "n": "enabled", "r": false, "sh": "A boolean value indicating whether the check is enabled/disabled.", "t": "`$BOOLEAN`", "key$": "enabled", "index$": 1 }, "id": { "a": true, "fo": "uuid", "h": "Id", "n": "id", "r": false, "ro": true, "sh": "A unique ID that can be used to identify and reference the alert.", "t": "`$STRING`", "key$": "id", "index$": 2 }, "name": { "a": true, "h": "Name", "n": "name", "op": { "create": { "req": true, "type": "`$STRING`" }, "update": { "req": true, "type": "`$STRING`" } }, "r": false, "sh": "A human-friendly display name.", "t": "`$STRING`", "key$": "name", "index$": 3 }, "notifications": { "a": true, "h": "Notifications", "n": "notifications", "r": true, "sh": "The notification settings for a trigger alert.", "t": "`$OBJECT`", "key$": "notifications", "index$": 4 }, "period": { "a": true, "h": "Period", "n": "period", "op": { "create": { "req": true, "type": "`$STRING`" }, "update": { "req": true, "type": "`$STRING`" } }, "r": false, "sh": "Period of time the threshold must be exceeded to trigger the alert.", "t": "`$STRING`", "key$": "period", "index$": 5 }, "previous_outage": { "a": true, "h": "Previous Outage", "n": "previous_outage", "r": false, "t": "`$OBJECT`", "key$": "previous_outage", "index$": 6 }, "regions": { "a": true, "h": "Regions", "n": "regions", "r": false, "sh": "An array containing the selected regions to perform healthchecks from.", "t": "`$ARRAY`", "key$": "regions", "index$": 7 }, "target": { "a": true, "fo": "url", "h": "Target", "n": "target", "r": false, "sh": "The endpoint to perform healthchecks on.", "t": "`$STRING`", "key$": "target", "index$": 8 }, "threshold": { "a": true, "h": "Threshold", "n": "threshold", "r": false, "sh": "The threshold at which the alert will enter a trigger state.", "t": "`$INTEGER`", "key$": "threshold", "index$": 9 }, "type": { "a": true, "h": "Type", "n": "type", "op": { "create": { "req": true, "type": "`$STRING`" }, "update": { "req": true, "type": "`$STRING`" } }, "r": false, "sh": "The type of alert.", "t": "`$STRING`", "key$": "type", "index$": 10 } }, "id": { "field": "id", "name": "id" }, "name": "uptime", "op": { "create": { "input": "data", "name": "create", "points": [{ "a": true, "co": { "id": "POST /v2/uptime/checks/{check_id}/alerts", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "ex": "4de7ac8b-495b-4884-9a69-1050c6793cd6", "k": "param", "n": "check_id", "or": "check_id", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "POST", "o": "/v2/uptime/checks/{check_id}/alerts", "q": { "exist": ["check_id"] }, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "v2" }, { "lit": "uptime" }, { "lit": "checks" }, { "var": "check_id" }, { "lit": "alerts" }], "t": { "req": "`reqdata`", "res": "`body.alert`" }, "index$": 0 }, { "a": true, "co": { "id": "POST /v2/uptime/checks", "source": "openapi3", "version": 2 }, "g": {}, "k": "http", "m": "POST", "o": "/v2/uptime/checks", "q": { "$action": "check" }, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "v2" }, { "lit": "uptime" }, { "lit": "checks" }], "t": { "req": "`reqdata`", "res": "`body.check`" }, "index$": 1 }], "key$": "create" }, "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /v2/uptime/checks/{check_id}/alerts", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "ex": "4de7ac8b-495b-4884-9a69-1050c6793cd6", "k": "param", "n": "check_id", "or": "check_id", "r": true, "t": "`$STRING`", "index$": 0 }], "query": [{ "a": true, "ex": 1, "k": "query", "n": "page", "or": "page", "r": false, "t": "`$INTEGER`", "index$": 0 }, { "a": true, "ex": 2, "k": "query", "n": "per_page", "or": "per_page", "r": false, "t": "`$INTEGER`", "index$": 1 }] }, "k": "http", "m": "GET", "o": "/v2/uptime/checks/{check_id}/alerts", "q": { "exist": ["check_id"] }, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "v2" }, { "lit": "uptime" }, { "lit": "checks" }, { "var": "check_id" }, { "lit": "alerts" }], "t": { "req": "`reqdata`", "res": "`body.alerts`" }, "index$": 0 }, { "a": true, "co": { "id": "GET /v2/uptime/checks", "source": "openapi3", "version": 2 }, "g": { "query": [{ "a": true, "ex": 1, "k": "query", "n": "page", "or": "page", "r": false, "t": "`$INTEGER`", "index$": 0 }, { "a": true, "ex": 2, "k": "query", "n": "per_page", "or": "per_page", "r": false, "t": "`$INTEGER`", "index$": 1 }] }, "k": "http", "m": "GET", "o": "/v2/uptime/checks", "q": { "$action": "check" }, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "v2" }, { "lit": "uptime" }, { "lit": "checks" }], "t": { "req": "`reqdata`", "res": "`body.checks`" }, "index$": 1 }], "key$": "list" }, "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /v2/uptime/checks/{check_id}/alerts/{alert_id}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "ex": "17f0f0ae-b7e5-4ef6-86e3-aa569db58284", "k": "param", "n": "alert_id", "or": "alert_id", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "ex": "4de7ac8b-495b-4884-9a69-1050c6793cd6", "k": "param", "n": "check_id", "or": "check_id", "r": true, "t": "`$STRING`", "index$": 1 }] }, "k": "http", "m": "GET", "o": "/v2/uptime/checks/{check_id}/alerts/{alert_id}", "q": { "exist": ["alert_id", "check_id"] }, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "v2" }, { "lit": "uptime" }, { "lit": "checks" }, { "var": "check_id" }, { "lit": "alerts" }, { "var": "alert_id" }], "t": { "req": "`reqdata`", "res": "`body.alert`" }, "index$": 0 }, { "a": true, "co": { "id": "GET /v2/uptime/checks/{check_id}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "ex": "4de7ac8b-495b-4884-9a69-1050c6793cd6", "k": "param", "n": "check_id", "or": "check_id", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/v2/uptime/checks/{check_id}", "q": { "exist": ["check_id"] }, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "v2" }, { "lit": "uptime" }, { "lit": "checks" }, { "var": "check_id" }], "t": { "req": "`reqdata`", "res": "`body.check`" }, "index$": 1 }, { "a": true, "co": { "id": "GET /v2/uptime/checks/{check_id}/state", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "ex": "4de7ac8b-495b-4884-9a69-1050c6793cd6", "k": "param", "n": "check_id", "or": "check_id", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/v2/uptime/checks/{check_id}/state", "q": { "exist": ["check_id"] }, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "v2" }, { "lit": "uptime" }, { "lit": "checks" }, { "var": "check_id" }, { "lit": "state" }], "t": { "req": "`reqdata`", "res": "`body.state`" }, "index$": 2 }], "key$": "load" }, "remove": { "input": "data", "name": "remove", "points": [{ "a": true, "co": { "id": "DELETE /v2/uptime/checks/{check_id}/alerts/{alert_id}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "ex": "17f0f0ae-b7e5-4ef6-86e3-aa569db58284", "k": "param", "n": "alert_id", "or": "alert_id", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "ex": "4de7ac8b-495b-4884-9a69-1050c6793cd6", "k": "param", "n": "check_id", "or": "check_id", "r": true, "t": "`$STRING`", "index$": 1 }] }, "k": "http", "m": "DELETE", "o": "/v2/uptime/checks/{check_id}/alerts/{alert_id}", "q": { "exist": ["alert_id", "check_id"] }, "r": {}, "s": [{ "lit": "v2" }, { "lit": "uptime" }, { "lit": "checks" }, { "var": "check_id" }, { "lit": "alerts" }, { "var": "alert_id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }, { "a": true, "co": { "id": "DELETE /v2/uptime/checks/{check_id}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "ex": "4de7ac8b-495b-4884-9a69-1050c6793cd6", "k": "param", "n": "check_id", "or": "check_id", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "DELETE", "o": "/v2/uptime/checks/{check_id}", "q": { "exist": ["check_id"] }, "r": {}, "s": [{ "lit": "v2" }, { "lit": "uptime" }, { "lit": "checks" }, { "var": "check_id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 1 }], "key$": "remove" }, "update": { "input": "data", "name": "update", "points": [{ "a": true, "co": { "id": "PUT /v2/uptime/checks/{check_id}/alerts/{alert_id}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "ex": "17f0f0ae-b7e5-4ef6-86e3-aa569db58284", "k": "param", "n": "alert_id", "or": "alert_id", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "ex": "4de7ac8b-495b-4884-9a69-1050c6793cd6", "k": "param", "n": "check_id", "or": "check_id", "r": true, "t": "`$STRING`", "index$": 1 }] }, "k": "http", "m": "PUT", "o": "/v2/uptime/checks/{check_id}/alerts/{alert_id}", "q": { "exist": ["alert_id", "check_id"] }, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "v2" }, { "lit": "uptime" }, { "lit": "checks" }, { "var": "check_id" }, { "lit": "alerts" }, { "var": "alert_id" }], "t": { "req": "`reqdata`", "res": "`body.alert`" }, "index$": 0 }, { "a": true, "co": { "id": "PUT /v2/uptime/checks/{check_id}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "ex": "4de7ac8b-495b-4884-9a69-1050c6793cd6", "k": "param", "n": "check_id", "or": "check_id", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "PUT", "o": "/v2/uptime/checks/{check_id}", "q": { "exist": ["check_id"] }, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "v2" }, { "lit": "uptime" }, { "lit": "checks" }, { "var": "check_id" }], "t": { "req": "`reqdata`", "res": "`body.check`" }, "index$": 1 }], "key$": "update" } }, "relations": { "ancestors": [] }, "key$": "uptime", "name__orig": "uptime", "Name": "Uptime", "name_": "uptime", "name-": "uptime", "NAME": "UPTIME", "index$": 220 }, { "active": true, "entity": "uptime", "key$": "BasicUptimeFlow", "kind": "basic", "name": "BasicUptimeFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "uptime_ref01" }, "m": { "check_id": "check01" }, "o": "create", "s": [], "v": [], "index$": 0 }, { "a": true, "d": {}, "i": {}, "m": {}, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "uptime_ref01" } }], "index$": 1 }, { "a": true, "d": {}, "i": { "ref": "uptime_ref01", "srcdatavar": "uptime_ref01_data", "suffix": "_up0", "textfield": "comparison" }, "m": {}, "o": "update", "s": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-uptime_ref01" } }], "v": [], "index$": 2 }, { "a": true, "d": {}, "i": { "ref": "uptime_ref01", "srcdatavar": "uptime_ref01_data", "suffix": "_dt0" }, "m": { "id": "uptime01" }, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-uptime_ref01" } }], "index$": 3 }, { "a": true, "d": {}, "i": { "ref": "uptime_ref01", "suffix": "_rm0" }, "m": { "id": "uptime01" }, "o": "remove", "s": [], "v": [], "index$": 4 }, { "a": true, "d": {}, "i": { "suffix": "_rt0" }, "m": {}, "o": "list", "s": [], "v": [{ "apply": "ItemNotExists", "def": { "ref": "uptime_ref01" } }], "index$": 5 }] }, 'Uptime', { "POST /v2/uptime/checks/{check_id}/alerts": { "protocol": "http", "requestBody": { "required": true, "description": "The ''type'' field dictates the type of alert, and hence what type of value to pass into the threshold property.\nType | Description | Threshold Value\n-----|-------------|--------------------\n`latency` | alerts on the response latency | milliseconds\n`down` | alerts on a target registering as down in any region | N/A (Not required)\n`down_global` | alerts on a target registering as down globally | N/A (Not required)\n`ssl_expiry` | alerts on a SSL certificate expiring within $threshold days | days\n", "content": { "application/json": { "schema": { "type": "object", "allOf": [{ "type": "object", "allOf": [{ "type": "object", "properties": { "id": {} }, "x-ref": "#/components/schemas/alert_base" }, { "type": "object", "properties": { "name": {}, "type": {}, "threshold": {}, "comparison": {}, "notifications": {}, "period": {} }, "x-ref": "#/components/schemas/alert_updatable" }], "x-ref": "#/components/schemas/alert" }], "required": ["name", "type", "notifications", "period"], "index$": 1 } } } }, "parameters": [{ "in": "path", "name": "check_id", "description": "A unique identifier for a check.", "required": true, "schema": { "type": "string", "format": "uuid" }, "example": "4de7ac8b-495b-4884-9a69-1050c6793cd6", "x-ref": "#/components/parameters/check_id", "index$": 0 }] }, "POST /v2/uptime/checks": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "allOf": [{ "type": "object", "properties": { "name": { "type": "string", "example": "Landing page check", "description": "A human-friendly display name.", "key$": "name" }, "type": { "type": "string", "example": "https", "enum": ["ping", "http", "https"], "description": "The type of health check to perform.", "key$": "type" }, "target": { "type": "string", "format": "url", "example": "https://www.landingpage.com", "description": "The endpoint to perform healthchecks on.", "key$": "target" }, "regions": { "type": "array", "items": { "type": "string", "enum": [] }, "example": ["us_east", "eu_west"], "description": "An array containing the selected regions to perform healthchecks from.", "key$": "regions" }, "enabled": { "type": "boolean", "example": true, "default": true, "description": "A boolean value indicating whether the check is enabled/disabled.", "key$": "enabled" } }, "x-ref": "#/components/schemas/check_updatable" }], "required": ["name", "method", "target", "regions", "type", "enabled"] } } } }, "parameters": [] }, "GET /v2/uptime/checks/{check_id}/alerts": { "protocol": "http", "parameters": [{ "in": "path", "name": "check_id", "description": "A unique identifier for a check.", "required": true, "schema": { "type": "string", "format": "uuid" }, "example": "4de7ac8b-495b-4884-9a69-1050c6793cd6", "x-ref": "#/components/parameters/check_id", "index$": 0 }, { "in": "query", "name": "per_page", "required": false, "description": "Number of items returned per page", "schema": { "type": "integer", "minimum": 1, "default": 20, "maximum": 200 }, "example": 2, "x-ref": "#/components/parameters/parameters_per_page", "index$": 1 }, { "in": "query", "name": "page", "required": false, "description": "Which 'page' of paginated results to return.", "schema": { "type": "integer", "minimum": 1, "default": 1 }, "example": 1, "x-ref": "#/components/parameters/page", "index$": 2 }] }, "GET /v2/uptime/checks": { "protocol": "http", "parameters": [{ "in": "query", "name": "per_page", "required": false, "description": "Number of items returned per page", "schema": { "type": "integer", "minimum": 1, "default": 20, "maximum": 200 }, "example": 2, "x-ref": "#/components/parameters/parameters_per_page", "index$": 0 }, { "in": "query", "name": "page", "required": false, "description": "Which 'page' of paginated results to return.", "schema": { "type": "integer", "minimum": 1, "default": 1 }, "example": 1, "x-ref": "#/components/parameters/page", "index$": 1 }] }, "GET /v2/uptime/checks/{check_id}/alerts/{alert_id}": { "protocol": "http", "parameters": [{ "in": "path", "name": "check_id", "description": "A unique identifier for a check.", "required": true, "schema": { "type": "string", "format": "uuid" }, "example": "4de7ac8b-495b-4884-9a69-1050c6793cd6", "x-ref": "#/components/parameters/check_id", "index$": 0 }, { "in": "path", "name": "alert_id", "description": "A unique identifier for an alert.", "required": true, "schema": { "type": "string", "format": "uuid" }, "example": "17f0f0ae-b7e5-4ef6-86e3-aa569db58284", "x-ref": "#/components/parameters/parameters_alert_id", "index$": 1 }] }, "GET /v2/uptime/checks/{check_id}": { "protocol": "http", "parameters": [{ "in": "path", "name": "check_id", "description": "A unique identifier for a check.", "required": true, "schema": { "type": "string", "format": "uuid" }, "example": "4de7ac8b-495b-4884-9a69-1050c6793cd6", "x-ref": "#/components/parameters/check_id", "index$": 0 }] }, "GET /v2/uptime/checks/{check_id}/state": { "protocol": "http", "parameters": [{ "in": "path", "name": "check_id", "description": "A unique identifier for a check.", "required": true, "schema": { "type": "string", "format": "uuid" }, "example": "4de7ac8b-495b-4884-9a69-1050c6793cd6", "x-ref": "#/components/parameters/check_id", "index$": 0 }] }, "DELETE /v2/uptime/checks/{check_id}/alerts/{alert_id}": { "protocol": "http", "parameters": [{ "in": "path", "name": "check_id", "description": "A unique identifier for a check.", "required": true, "schema": { "type": "string", "format": "uuid" }, "example": "4de7ac8b-495b-4884-9a69-1050c6793cd6", "x-ref": "#/components/parameters/check_id", "index$": 0 }, { "in": "path", "name": "alert_id", "description": "A unique identifier for an alert.", "required": true, "schema": { "type": "string", "format": "uuid" }, "example": "17f0f0ae-b7e5-4ef6-86e3-aa569db58284", "x-ref": "#/components/parameters/parameters_alert_id", "index$": 1 }] }, "DELETE /v2/uptime/checks/{check_id}": { "protocol": "http", "parameters": [{ "in": "path", "name": "check_id", "description": "A unique identifier for a check.", "required": true, "schema": { "type": "string", "format": "uuid" }, "example": "4de7ac8b-495b-4884-9a69-1050c6793cd6", "x-ref": "#/components/parameters/check_id", "index$": 0 }] }, "PUT /v2/uptime/checks/{check_id}/alerts/{alert_id}": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "allOf": [{ "type": "object", "properties": { "name": { "type": "string", "example": "Landing page degraded performance", "description": "A human-friendly display name.", "key$": "name" }, "type": { "type": "string", "example": "latency", "enum": ["latency", "down", "down_global", "ssl_expiry"], "description": "The type of alert.", "key$": "type" }, "threshold": { "type": "integer", "example": 300, "description": "The threshold at which the alert will enter a trigger state. The specific threshold is dependent on the alert type.", "key$": "threshold" }, "comparison": { "type": "string", "example": "greater_than", "description": "The comparison operator used against the alert's threshold.", "enum": ["greater_than", "less_than"], "key$": "comparison" }, "notifications": { "type": "object", "description": "The notification settings for a trigger alert.", "required": ["slack", "email"], "properties": { "email": {}, "slack": {} }, "x-ref": "#/components/schemas/notification", "key$": "notifications" }, "period": { "type": "string", "example": "2m", "description": "Period of time the threshold must be exceeded to trigger the alert.", "enum": ["2m", "3m", "5m", "10m", "15m", "30m", "1h"], "key$": "period" } }, "x-ref": "#/components/schemas/alert_updatable" }], "required": ["name", "type", "notifications", "period"], "index$": 1 } } } }, "parameters": [{ "in": "path", "name": "check_id", "description": "A unique identifier for a check.", "required": true, "schema": { "type": "string", "format": "uuid" }, "example": "4de7ac8b-495b-4884-9a69-1050c6793cd6", "x-ref": "#/components/parameters/check_id", "index$": 0 }, { "in": "path", "name": "alert_id", "description": "A unique identifier for an alert.", "required": true, "schema": { "type": "string", "format": "uuid" }, "example": "17f0f0ae-b7e5-4ef6-86e3-aa569db58284", "x-ref": "#/components/parameters/parameters_alert_id", "index$": 1 }] }, "PUT /v2/uptime/checks/{check_id}": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "allOf": [{ "type": "object", "properties": { "name": { "type": "string", "example": "Landing page check", "description": "A human-friendly display name.", "key$": "name" }, "type": { "type": "string", "example": "https", "enum": ["ping", "http", "https"], "description": "The type of health check to perform.", "key$": "type" }, "target": { "type": "string", "format": "url", "example": "https://www.landingpage.com", "description": "The endpoint to perform healthchecks on.", "key$": "target" }, "regions": { "type": "array", "items": { "type": "string", "enum": [] }, "example": ["us_east", "eu_west"], "description": "An array containing the selected regions to perform healthchecks from.", "key$": "regions" }, "enabled": { "type": "boolean", "example": true, "default": true, "description": "A boolean value indicating whether the check is enabled/disabled.", "key$": "enabled" } }, "x-ref": "#/components/schemas/check_updatable" }], "index$": 1 } } } }, "parameters": [{ "in": "path", "name": "check_id", "description": "A unique identifier for a check.", "required": true, "schema": { "type": "string", "format": "uuid" }, "example": "4de7ac8b-495b-4884-9a69-1050c6793cd6", "x-ref": "#/components/parameters/check_id", "index$": 0 }] } }, { strict: LIVE_STRICT, t });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const uptime_ref01_ent = client.Uptime();
        let uptime_ref01_data = setup.data.new.uptime['uptime_ref01'];
        uptime_ref01_data['check_id'] = setup.idmap['check01'];
        uptime_ref01_data = (await uptime_ref01_ent.create(uptime_ref01_data)).data();
        (0, node_assert_1.default)(null != uptime_ref01_data.id);
        // LIST
        const uptime_ref01_match = {};
        const uptime_ref01_list = (await uptime_ref01_ent.list(uptime_ref01_match)).map((e) => e.data());
        (0, node_assert_1.default)(!isempty(select(uptime_ref01_list, { id: uptime_ref01_data.id })));
        // UPDATE
        const uptime_ref01_data_up0 = {};
        uptime_ref01_data_up0.id = uptime_ref01_data.id;
        const uptime_ref01_markdef_up0 = { name: 'comparison', value: 'Mark01-uptime_ref01_' + setup.now };
        uptime_ref01_data_up0[uptime_ref01_markdef_up0.name] = uptime_ref01_markdef_up0.value;
        const uptime_ref01_resdata_up0 = (await uptime_ref01_ent.update(uptime_ref01_data_up0)).data();
        (0, node_assert_1.default)(uptime_ref01_resdata_up0.id === uptime_ref01_data_up0.id);
        (0, node_assert_1.default)(uptime_ref01_resdata_up0[uptime_ref01_markdef_up0.name] === uptime_ref01_markdef_up0.value);
        // LOAD
        const uptime_ref01_match_dt0 = {};
        uptime_ref01_match_dt0.id = uptime_ref01_data.id;
        const uptime_ref01_data_dt0 = (await uptime_ref01_ent.load(uptime_ref01_match_dt0)).data();
        (0, node_assert_1.default)(uptime_ref01_data_dt0.id === uptime_ref01_data.id);
        // REMOVE
        const uptime_ref01_match_rm0 = { id: uptime_ref01_data.id };
        await uptime_ref01_ent.remove(uptime_ref01_match_rm0);
        // LIST
        const uptime_ref01_match_rt0 = {};
        const uptime_ref01_list_rt0 = (await uptime_ref01_ent.list(uptime_ref01_match_rt0)).map((e) => e.data());
        (0, node_assert_1.default)(isempty(select(uptime_ref01_list_rt0, { id: uptime_ref01_data.id })));
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
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/uptime/UptimeTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.DigitaloceanSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['uptime01', 'uptime02', 'uptime03', 'check01'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'DIGITALOCEAN_TEST_UPTIME_ENTID': idmap,
        'DIGITALOCEAN_TEST_LIVE': 'FALSE',
        'DIGITALOCEAN_TEST_EXPLAIN': 'FALSE',
        'DIGITALOCEAN_APIKEY': '',
    });
    idmap = env['DIGITALOCEAN_TEST_UPTIME_ENTID'];
    const live = 'TRUE' === env.DIGITALOCEAN_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['DIGITALOCEAN_TEST_UPTIME_ENTID'];
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
//# sourceMappingURL=UptimeEntity.test.js.map