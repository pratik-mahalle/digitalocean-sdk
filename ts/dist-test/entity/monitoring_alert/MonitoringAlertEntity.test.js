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
(0, node_test_1.describe)('MonitoringAlertEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when DIGITALOCEAN_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('DIGITALOCEAN_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.DigitaloceanSDK.test();
        const ent = testsdk.MonitoringAlert();
        (0, node_assert_1.default)(null != ent);
    });
    class FailHook extends __1.BaseFeature {
        name = 'failhook';
        version = '0.0.1';
        active = true;
        unexpected = 0;
        init() { }
        PreSpec() { throw new Error('monitoring_alert hook failed'); }
        PreUnexpected() { this.unexpected++; }
    }
    (0, node_test_1.test)('stream-error', async () => {
        const offline = { net: { offline: true } };
        await node_assert_1.default.rejects(async () => {
            for await (const _item of __1.DigitaloceanSDK.test(offline).MonitoringAlert().stream('list')) { }
        }, /offline/);
        for await (const _item of __1.DigitaloceanSDK.test(offline).MonitoringAlert()
            .stream('list', undefined, { ctrl: { throw: false } })) { }
        if (null != __1.config.feature?.rbac) {
            const denied = __1.DigitaloceanSDK.test(undefined, { feature: { rbac: { active: true, deny: true } } });
            await node_assert_1.default.rejects(async () => {
                for await (const _item of denied.MonitoringAlert().stream('list')) { }
            }, (err) => 'rbac_denied' === err.code);
        }
    });
    (0, node_test_1.test)('stream-ctrl', async () => {
        const explain = {};
        const ctrl = { explain };
        for await (const _item of __1.DigitaloceanSDK.test().MonitoringAlert().stream('list', undefined, { ctrl })) { }
        node_assert_1.default.deepStrictEqual(Object.keys(ctrl), ['explain']);
        (0, node_assert_1.default)(explain === ctrl.explain && 0 < Object.keys(explain).length);
    });
    (0, node_test_1.test)('unexpected', async () => {
        const hook = new FailHook();
        const client = new __1.DigitaloceanSDK({ feature: { test: { active: true } }, extend: [hook] });
        await node_assert_1.default.rejects(client.MonitoringAlert().list(), /hook failed/);
        (0, node_assert_1.default)(0 < hook.unexpected);
        const fired = hook.unexpected;
        node_assert_1.default.strictEqual(await client.MonitoringAlert().list(undefined, { throw: false }), undefined);
        (0, node_assert_1.default)(fired < hook.unexpected);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.DigitaloceanSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.MonitoringAlert().list({ "page": "x" }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.DIGITALOCEAN_TEST_LIVE;
        for (const op of ['create', 'list']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'monitoring_alert.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "alerts": { "a": true, "h": "Alerts", "n": "alerts", "r": true, "t": "`$OBJECT`", "key$": "alerts", "index$": 0 }, "compare": { "a": true, "h": "Compare", "n": "compare", "r": true, "t": "`$STRING`", "key$": "compare", "index$": 1 }, "description": { "a": true, "h": "Description", "n": "description", "r": true, "t": "`$STRING`", "key$": "description", "index$": 2 }, "enabled": { "a": true, "h": "Enabled", "n": "enabled", "r": true, "t": "`$BOOLEAN`", "key$": "enabled", "index$": 3 }, "entities": { "a": true, "h": "Entities", "n": "entities", "r": true, "t": "`$ARRAY`", "key$": "entities", "index$": 4 }, "tags": { "a": true, "h": "Tags", "n": "tags", "r": true, "t": "`$ARRAY`", "key$": "tags", "index$": 5 }, "type": { "a": true, "h": "Type", "n": "type", "r": true, "t": "`$STRING`", "key$": "type", "index$": 6 }, "uuid": { "a": true, "h": "Uuid", "n": "uuid", "r": true, "t": "`$STRING`", "key$": "uuid", "index$": 7 }, "value": { "a": true, "fo": "float", "h": "Value", "n": "value", "r": true, "t": "`$NUMBER`", "key$": "value", "index$": 8 }, "window": { "a": true, "h": "Window", "n": "window", "r": true, "t": "`$STRING`", "key$": "window", "index$": 9 } }, "name": "monitoring_alert", "op": { "create": { "input": "data", "name": "create", "points": [{ "a": true, "co": { "id": "POST /v2/monitoring/alerts", "source": "openapi3", "version": 2 }, "g": {}, "k": "http", "m": "POST", "o": "/v2/monitoring/alerts", "q": {}, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "v2" }, { "lit": "monitoring" }, { "lit": "alerts" }], "t": { "req": "`reqdata`", "res": "`body.policy`" }, "index$": 0 }], "key$": "create" }, "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /v2/monitoring/alerts", "source": "openapi3", "version": 2 }, "g": { "query": [{ "a": true, "ex": 1, "k": "query", "n": "page", "or": "page", "r": false, "t": "`$INTEGER`", "index$": 0 }, { "a": true, "ex": 2, "k": "query", "n": "per_page", "or": "per_page", "r": false, "t": "`$INTEGER`", "index$": 1 }] }, "k": "http", "m": "GET", "o": "/v2/monitoring/alerts", "q": {}, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "v2" }, { "lit": "monitoring" }, { "lit": "alerts" }], "t": { "req": "`reqdata`", "res": "`body.policies`" }, "index$": 0 }], "key$": "list" }, "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /v2/monitoring/alerts/{alert_uuid}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "ex": "4de7ac8b-495b-4884-9a69-1050c6793cd6", "k": "param", "n": "alert_uuid", "or": "alert_uuid", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/v2/monitoring/alerts/{alert_uuid}", "q": { "exist": ["alert_uuid"] }, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "v2" }, { "lit": "monitoring" }, { "lit": "alerts" }, { "var": "alert_uuid" }], "t": { "req": "`reqdata`", "res": "`body.policy`" }, "index$": 0 }], "key$": "load" }, "remove": { "input": "data", "name": "remove", "points": [{ "a": true, "co": { "id": "DELETE /v2/monitoring/alerts/{alert_uuid}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "ex": "4de7ac8b-495b-4884-9a69-1050c6793cd6", "k": "param", "n": "alert_uuid", "or": "alert_uuid", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "DELETE", "o": "/v2/monitoring/alerts/{alert_uuid}", "q": { "exist": ["alert_uuid"] }, "r": {}, "s": [{ "lit": "v2" }, { "lit": "monitoring" }, { "lit": "alerts" }, { "var": "alert_uuid" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "remove" }, "update": { "input": "data", "name": "update", "points": [{ "a": true, "co": { "id": "PUT /v2/monitoring/alerts/{alert_uuid}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "ex": "4de7ac8b-495b-4884-9a69-1050c6793cd6", "k": "param", "n": "alert_uuid", "or": "alert_uuid", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "PUT", "o": "/v2/monitoring/alerts/{alert_uuid}", "q": { "exist": ["alert_uuid"] }, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "v2" }, { "lit": "monitoring" }, { "lit": "alerts" }, { "var": "alert_uuid" }], "t": { "req": "`reqdata`", "res": "`body.policy`" }, "index$": 0 }], "key$": "update" } }, "relations": { "ancestors": [] }, "key$": "monitoring_alert", "name__orig": "monitoring_alert", "Name": "MonitoringAlert", "name_": "monitoring_alert", "name-": "monitoring-alert", "NAME": "MONITORING_ALERT", "index$": 177 }, { "active": true, "entity": "monitoring_alert", "key$": "BasicMonitoringAlertFlow", "kind": "basic", "name": "BasicMonitoringAlertFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "monitoring_alert_ref01" }, "m": {}, "o": "create", "s": [], "v": [], "index$": 0 }, { "a": true, "d": {}, "i": {}, "m": {}, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "monitoring_alert_ref01" } }], "index$": 1 }, { "a": false, "d": {}, "i": { "ref": "monitoring_alert_ref01", "srcdatavar": "monitoring_alert_ref01_data", "suffix": "_up0", "textfield": "compare" }, "m": {}, "o": "update", "s": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-monitoring_alert_ref01" } }], "v": [], "unreachable": true }, { "a": false, "d": {}, "i": { "ref": "monitoring_alert_ref01", "srcdatavar": "monitoring_alert_ref01_data", "suffix": "_dt0" }, "m": { "id": "monitoring_alert01" }, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-monitoring_alert_ref01" } }], "unreachable": true }, { "a": false, "d": {}, "i": { "ref": "monitoring_alert_ref01", "suffix": "_rm0" }, "m": { "id": "monitoring_alert01" }, "o": "remove", "s": [], "v": [], "unreachable": true }, { "a": true, "d": {}, "i": { "suffix": "_rt0" }, "m": {}, "o": "list", "s": [], "v": [{ "apply": "ItemNotExists", "def": { "ref": "monitoring_alert_ref01" } }], "index$": 2 }] }, 'MonitoringAlert', { "POST /v2/monitoring/alerts": { "protocol": "http", "requestBody": { "description": "The `type` field dictates what type of entity that the alert policy applies to and hence what type of entity is passed in the `entities` array. If both the `tags` array and `entities` array are empty the alert policy applies to all entities of the relevant type that are owned by the user account. Otherwise the following table shows the valid entity types for each type of alert policy:\n\nType | Description | Valid Entity Type\n-----|-------------|--------------------\n`v1/insights/droplet/memory_utilization_percent` | alert on the percent of memory utilization | Droplet ID\n`v1/insights/droplet/disk_read` | alert on the rate of disk read I/O in MBps | Droplet ID\n`v1/insights/droplet/load_5` | alert on the 5 minute load average | Droplet ID\n`v1/insights/droplet/load_15` | alert on the 15 minute load average | Droplet ID\n`v1/insights/droplet/disk_utilization_percent` | alert on the percent of disk utilization | Droplet ID\n`v1/insights/droplet/cpu` | alert on the percent of CPU utilization | Droplet ID\n`v1/insights/droplet/disk_write` | alert on the rate of disk write I/O in MBps | Droplet ID\n`v1/insights/droplet/public_outbound_bandwidth` | alert on the rate of public outbound bandwidth in Mbps | Droplet ID\n`v1/insights/droplet/public_inbound_bandwidth` | alert on the rate of public inbound bandwidth in Mbps | Droplet ID\n`v1/insights/droplet/private_outbound_bandwidth` | alert on the rate of private outbound bandwidth in Mbps | Droplet ID\n`v1/insights/droplet/private_inbound_bandwidth` | alert on the rate of private inbound bandwidth in Mbps | Droplet ID\n`v1/insights/droplet/load_1` | alert on the 1 minute load average | Droplet ID\n`v1/insights/lbaas/avg_cpu_utilization_percent`|alert on the percent of CPU utilization|load balancer ID\n`v1/insights/lbaas/connection_utilization_percent`|alert on the percent of connection utilization|load balancer ID\n`v1/insights/lbaas/droplet_health`|alert on Droplet health status changes|load balancer ID\n`v1/insights/lbaas/tls_connections_per_second_utilization_percent`|alert on the percent of TLS connections per second utilization (requires at least one HTTPS forwarding rule)|load balancer ID\n`v1/insights/lbaas/increase_in_http_error_rate_percentage_5xx`|alert on the percent increase of 5xx level http errors over 5m|load balancer ID\n`v1/insights/lbaas/increase_in_http_error_rate_percentage_4xx`|alert on the percent increase of 4xx level http errors over 5m|load balancer ID\n`v1/insights/lbaas/increase_in_http_error_rate_count_5xx`|alert on the count of 5xx level http errors over 5m|load balancer ID\n`v1/insights/lbaas/increase_in_http_error_rate_count_4xx`|alert on the count of 4xx level http errors over 5m|load balancer ID\n`v1/insights/lbaas/high_http_request_response_time`|alert on high average http response time|load balancer ID\n`v1/insights/lbaas/high_http_request_response_time_50p`|alert on high 50th percentile http response time|load balancer ID\n`v1/insights/lbaas/high_http_request_response_time_95p`|alert on high 95th percentile http response time|load balancer ID\n`v1/insights/lbaas/high_http_request_response_time_99p`|alert on high 99th percentile http response time|load balancer ID\n`v1/dbaas/alerts/load_15_alerts` | alert on 15 minute load average across the database cluster | database cluster UUID\n`v1/dbaas/alerts/memory_utilization_alerts` | alert on the percent memory utilization average across the database cluster | database cluster UUID\n`v1/dbaas/alerts/disk_utilization_alerts` | alert on the percent disk utilization average across the database cluster | database cluster UUID\n`v1/dbaas/alerts/cpu_alerts` | alert on the percent CPU usage average across the database cluster | database cluster UUID\n`v1/droplet/autoscale_alerts/current_instances` | alert on current pool size | autoscale pool ID\n`v1/droplet/autoscale_alerts/target_instances` | alert on target pool size | autoscale pool ID\n`v1/droplet/autoscale_alerts/current_cpu_utilization` | alert on current average CPU utilization | autoscale pool ID\n`v1/droplet/autoscale_alerts/target_cpu_utilization` | alert on target average CPU utilization | autoscale pool ID\n`v1/droplet/autoscale_alerts/current_memory_utilization` | alert on current average memory utilization | autoscale pool ID\n`v1/droplet/autoscale_alerts/target_memory_utilization` | alert on target average memory utilization | autoscale pool ID\n`v1/droplet/autoscale_alerts/scale_up` | alert on scale up event | autoscale pool ID\n`v1/droplet/autoscale_alerts/scale_down` | alert on scale down event | autoscale pool ID\n", "required": true, "content": { "application/json": { "schema": { "type": "object", "required": ["type", "description", "compare", "value", "window", "entities", "tags", "alerts", "enabled"], "properties": { "alerts": { "type": "object", "required": ["slack", "email"], "properties": { "email": { "description": "An email to notify on an alert trigger.", "example": ["bob@exmaple.com"], "type": "array", "items": { "type": "string" } }, "slack": { "type": "array", "description": "Slack integration details.", "items": { "type": "object", "required": [], "properties": {}, "x-ref": "#/components/schemas/slack_details" } } }, "x-ref": "#/components/schemas/alerts", "key$": "alerts" }, "compare": { "type": "string", "example": "GreaterThan", "enum": ["GreaterThan", "LessThan"], "key$": "compare" }, "description": { "type": "string", "example": "CPU Alert", "key$": "description" }, "enabled": { "type": "boolean", "example": true, "key$": "enabled" }, "entities": { "type": "array", "items": { "type": "string" }, "example": ["192018292"], "key$": "entities" }, "tags": { "type": "array", "items": { "type": "string" }, "example": ["droplet_tag"], "key$": "tags" }, "type": { "type": "string", "enum": ["v1/insights/droplet/load_1", "v1/insights/droplet/load_5", "v1/insights/droplet/load_15", "v1/insights/droplet/memory_utilization_percent", "v1/insights/droplet/disk_utilization_percent", "v1/insights/droplet/cpu", "v1/insights/droplet/disk_read", "v1/insights/droplet/disk_write", "v1/insights/droplet/public_outbound_bandwidth", "v1/insights/droplet/public_inbound_bandwidth", "v1/insights/droplet/private_outbound_bandwidth", "v1/insights/droplet/private_inbound_bandwidth", "v1/insights/lbaas/avg_cpu_utilization_percent", "v1/insights/lbaas/connection_utilization_percent", "v1/insights/lbaas/droplet_health", "v1/insights/lbaas/tls_connections_per_second_utilization_percent", "v1/insights/lbaas/increase_in_http_error_rate_percentage_5xx", "v1/insights/lbaas/increase_in_http_error_rate_percentage_4xx", "v1/insights/lbaas/increase_in_http_error_rate_count_5xx", "v1/insights/lbaas/increase_in_http_error_rate_count_4xx", "v1/insights/lbaas/high_http_request_response_time", "v1/insights/lbaas/high_http_request_response_time_50p", "v1/insights/lbaas/high_http_request_response_time_95p", "v1/insights/lbaas/high_http_request_response_time_99p", "v1/dbaas/alerts/load_15_alerts", "v1/dbaas/alerts/memory_utilization_alerts", "v1/dbaas/alerts/disk_utilization_alerts", "v1/dbaas/alerts/cpu_alerts", "v1/droplet/autoscale_alerts/current_instances", "v1/droplet/autoscale_alerts/target_instances", "v1/droplet/autoscale_alerts/current_cpu_utilization", "v1/droplet/autoscale_alerts/target_cpu_utilization", "v1/droplet/autoscale_alerts/current_memory_utilization", "v1/droplet/autoscale_alerts/target_memory_utilization", "v1/droplet/autoscale_alerts/scale_up", "v1/droplet/autoscale_alerts/scale_down"], "example": "v1/insights/droplet/cpu", "key$": "type" }, "value": { "type": "number", "format": "float", "example": 80, "key$": "value" }, "window": { "type": "string", "example": "5m", "enum": ["5m", "10m", "30m", "1h"], "key$": "window" } }, "x-ref": "#/components/schemas/alert_policy_request", "index$": 1 } } } }, "parameters": [] }, "GET /v2/monitoring/alerts": { "protocol": "http", "parameters": [{ "in": "query", "name": "per_page", "required": false, "description": "Number of items returned per page", "schema": { "type": "integer", "minimum": 1, "default": 20, "maximum": 200 }, "example": 2, "x-ref": "#/components/parameters/parameters_per_page", "index$": 0 }, { "in": "query", "name": "page", "required": false, "description": "Which 'page' of paginated results to return.", "schema": { "type": "integer", "minimum": 1, "default": 1 }, "example": 1, "x-ref": "#/components/parameters/page", "index$": 1 }] }, "GET /v2/monitoring/alerts/{alert_uuid}": { "protocol": "http", "parameters": [{ "in": "path", "name": "alert_uuid", "description": "A unique identifier for an alert policy.", "required": true, "schema": { "type": "string" }, "example": "4de7ac8b-495b-4884-9a69-1050c6793cd6", "x-ref": "#/components/parameters/alert_uuid", "index$": 0 }] }, "DELETE /v2/monitoring/alerts/{alert_uuid}": { "protocol": "http", "parameters": [{ "in": "path", "name": "alert_uuid", "description": "A unique identifier for an alert policy.", "required": true, "schema": { "type": "string" }, "example": "4de7ac8b-495b-4884-9a69-1050c6793cd6", "x-ref": "#/components/parameters/alert_uuid", "index$": 0 }] }, "PUT /v2/monitoring/alerts/{alert_uuid}": { "protocol": "http", "requestBody": { "description": "The `type` field dictates what type of entity that the alert policy applies to and hence what type of entity is passed in the `entities` array. If both the `tags` array and `entities` array are empty the alert policy applies to all entities of the relevant type that are owned by the user account. Otherwise the following table shows the valid entity types for each type of alert policy:\n\nType | Description | Valid Entity Type\n-----|-------------|--------------------\n`v1/insights/droplet/memory_utilization_percent` | alert on the percent of memory utilization | Droplet ID\n`v1/insights/droplet/disk_read` | alert on the rate of disk read I/O in MBps | Droplet ID\n`v1/insights/droplet/load_5` | alert on the 5 minute load average | Droplet ID\n`v1/insights/droplet/load_15` | alert on the 15 minute load average | Droplet ID\n`v1/insights/droplet/disk_utilization_percent` | alert on the percent of disk utilization | Droplet ID\n`v1/insights/droplet/cpu` | alert on the percent of CPU utilization | Droplet ID\n`v1/insights/droplet/disk_write` | alert on the rate of disk write I/O in MBps | Droplet ID\n`v1/insights/droplet/public_outbound_bandwidth` | alert on the rate of public outbound bandwidth in Mbps | Droplet ID\n`v1/insights/droplet/public_inbound_bandwidth` | alert on the rate of public inbound bandwidth in Mbps | Droplet ID\n`v1/insights/droplet/private_outbound_bandwidth` | alert on the rate of private outbound bandwidth in Mbps | Droplet ID\n`v1/insights/droplet/private_inbound_bandwidth` | alert on the rate of private inbound bandwidth in Mbps | Droplet ID\n`v1/insights/droplet/load_1` | alert on the 1 minute load average | Droplet ID\n`v1/insights/lbaas/avg_cpu_utilization_percent`|alert on the percent of CPU utilization|load balancer ID\n`v1/insights/lbaas/connection_utilization_percent`|alert on the percent of connection utilization|load balancer ID\n`v1/insights/lbaas/droplet_health`|alert on Droplet health status changes|load balancer ID\n`v1/insights/lbaas/tls_connections_per_second_utilization_percent`|alert on the percent of TLS connections per second utilization (requires at least one HTTPS forwarding rule)|load balancer ID\n`v1/insights/lbaas/increase_in_http_error_rate_percentage_5xx`|alert on the percent increase of 5xx level http errors over 5m|load balancer ID\n`v1/insights/lbaas/increase_in_http_error_rate_percentage_4xx`|alert on the percent increase of 4xx level http errors over 5m|load balancer ID\n`v1/insights/lbaas/increase_in_http_error_rate_count_5xx`|alert on the count of 5xx level http errors over 5m|load balancer ID\n`v1/insights/lbaas/increase_in_http_error_rate_count_4xx`|alert on the count of 4xx level http errors over 5m|load balancer ID\n`v1/insights/lbaas/high_http_request_response_time`|alert on high average http response time|load balancer ID\n`v1/insights/lbaas/high_http_request_response_time_50p`|alert on high 50th percentile http response time|load balancer ID\n`v1/insights/lbaas/high_http_request_response_time_95p`|alert on high 95th percentile http response time|load balancer ID\n`v1/insights/lbaas/high_http_request_response_time_99p`|alert on high 99th percentile http response time|load balancer ID\n`v1/dbaas/alerts/load_15_alerts` | alert on 15 minute load average across the database cluster | database cluster UUID\n`v1/dbaas/alerts/memory_utilization_alerts` | alert on the percent memory utilization average across the database cluster | database cluster UUID\n`v1/dbaas/alerts/disk_utilization_alerts` | alert on the percent disk utilization average across the database cluster | database cluster UUID\n`v1/dbaas/alerts/cpu_alerts` | alert on the percent CPU usage average across the database cluster | database cluster UUID\n`v1/droplet/autoscale_alerts/current_instances` | alert on current pool size | autoscale pool ID\n`v1/droplet/autoscale_alerts/target_instances` | alert on target pool size | autoscale pool ID\n`v1/droplet/autoscale_alerts/current_cpu_utilization` | alert on current average CPU utilization | autoscale pool ID\n`v1/droplet/autoscale_alerts/target_cpu_utilization` | alert on target average CPU utilization | autoscale pool ID\n`v1/droplet/autoscale_alerts/current_memory_utilization` | alert on current average memory utilization | autoscale pool ID\n`v1/droplet/autoscale_alerts/target_memory_utilization` | alert on target average memory utilization | autoscale pool ID\n`v1/droplet/autoscale_alerts/scale_up` | alert on scale up event | autoscale pool ID\n`v1/droplet/autoscale_alerts/scale_down` | alert on scale down event | autoscale pool ID\n", "required": true, "content": { "application/json": { "schema": { "type": "object", "required": ["type", "description", "compare", "value", "window", "entities", "tags", "alerts", "enabled"], "properties": { "alerts": { "type": "object", "required": ["slack", "email"], "properties": { "email": { "description": "An email to notify on an alert trigger.", "example": ["bob@exmaple.com"], "type": "array", "items": { "type": "string" } }, "slack": { "type": "array", "description": "Slack integration details.", "items": { "type": "object", "required": [], "properties": {}, "x-ref": "#/components/schemas/slack_details" } } }, "x-ref": "#/components/schemas/alerts", "key$": "alerts" }, "compare": { "type": "string", "example": "GreaterThan", "enum": ["GreaterThan", "LessThan"], "key$": "compare" }, "description": { "type": "string", "example": "CPU Alert", "key$": "description" }, "enabled": { "type": "boolean", "example": true, "key$": "enabled" }, "entities": { "type": "array", "items": { "type": "string" }, "example": ["192018292"], "key$": "entities" }, "tags": { "type": "array", "items": { "type": "string" }, "example": ["droplet_tag"], "key$": "tags" }, "type": { "type": "string", "enum": ["v1/insights/droplet/load_1", "v1/insights/droplet/load_5", "v1/insights/droplet/load_15", "v1/insights/droplet/memory_utilization_percent", "v1/insights/droplet/disk_utilization_percent", "v1/insights/droplet/cpu", "v1/insights/droplet/disk_read", "v1/insights/droplet/disk_write", "v1/insights/droplet/public_outbound_bandwidth", "v1/insights/droplet/public_inbound_bandwidth", "v1/insights/droplet/private_outbound_bandwidth", "v1/insights/droplet/private_inbound_bandwidth", "v1/insights/lbaas/avg_cpu_utilization_percent", "v1/insights/lbaas/connection_utilization_percent", "v1/insights/lbaas/droplet_health", "v1/insights/lbaas/tls_connections_per_second_utilization_percent", "v1/insights/lbaas/increase_in_http_error_rate_percentage_5xx", "v1/insights/lbaas/increase_in_http_error_rate_percentage_4xx", "v1/insights/lbaas/increase_in_http_error_rate_count_5xx", "v1/insights/lbaas/increase_in_http_error_rate_count_4xx", "v1/insights/lbaas/high_http_request_response_time", "v1/insights/lbaas/high_http_request_response_time_50p", "v1/insights/lbaas/high_http_request_response_time_95p", "v1/insights/lbaas/high_http_request_response_time_99p", "v1/dbaas/alerts/load_15_alerts", "v1/dbaas/alerts/memory_utilization_alerts", "v1/dbaas/alerts/disk_utilization_alerts", "v1/dbaas/alerts/cpu_alerts", "v1/droplet/autoscale_alerts/current_instances", "v1/droplet/autoscale_alerts/target_instances", "v1/droplet/autoscale_alerts/current_cpu_utilization", "v1/droplet/autoscale_alerts/target_cpu_utilization", "v1/droplet/autoscale_alerts/current_memory_utilization", "v1/droplet/autoscale_alerts/target_memory_utilization", "v1/droplet/autoscale_alerts/scale_up", "v1/droplet/autoscale_alerts/scale_down"], "example": "v1/insights/droplet/cpu", "key$": "type" }, "value": { "type": "number", "format": "float", "example": 80, "key$": "value" }, "window": { "type": "string", "example": "5m", "enum": ["5m", "10m", "30m", "1h"], "key$": "window" } }, "x-ref": "#/components/schemas/alert_policy_request", "index$": 1 } } } }, "parameters": [{ "in": "path", "name": "alert_uuid", "description": "A unique identifier for an alert policy.", "required": true, "schema": { "type": "string" }, "example": "4de7ac8b-495b-4884-9a69-1050c6793cd6", "x-ref": "#/components/parameters/alert_uuid", "index$": 0 }] } }, { strict: LIVE_STRICT, t });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const monitoring_alert_ref01_ent = client.MonitoringAlert();
        let monitoring_alert_ref01_data = setup.data.new.monitoring_alert['monitoring_alert_ref01'];
        monitoring_alert_ref01_data = (await monitoring_alert_ref01_ent.create(monitoring_alert_ref01_data)).data();
        (0, node_assert_1.default)(null != monitoring_alert_ref01_data);
        // LIST
        const monitoring_alert_ref01_match = {};
        const monitoring_alert_ref01_list = (await monitoring_alert_ref01_ent.list(monitoring_alert_ref01_match)).map((e) => e.data());
        // LIST
        const monitoring_alert_ref01_match_rt0 = {};
        const monitoring_alert_ref01_list_rt0 = (await monitoring_alert_ref01_ent.list(monitoring_alert_ref01_match_rt0)).map((e) => e.data());
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
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/monitoring_alert/MonitoringAlertTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.DigitaloceanSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['monitoring_alert01', 'monitoring_alert02', 'monitoring_alert03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'DIGITALOCEAN_TEST_MONITORING_ALERT_ENTID': idmap,
        'DIGITALOCEAN_TEST_LIVE': 'FALSE',
        'DIGITALOCEAN_TEST_EXPLAIN': 'FALSE',
        'DIGITALOCEAN_APIKEY': '',
    });
    idmap = env['DIGITALOCEAN_TEST_MONITORING_ALERT_ENTID'];
    const live = 'TRUE' === env.DIGITALOCEAN_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['DIGITALOCEAN_TEST_MONITORING_ALERT_ENTID'];
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
//# sourceMappingURL=MonitoringAlertEntity.test.js.map