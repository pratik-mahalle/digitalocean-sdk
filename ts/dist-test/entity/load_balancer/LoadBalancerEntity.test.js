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
(0, node_test_1.describe)('LoadBalancerEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when DIGITALOCEAN_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('DIGITALOCEAN_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.DigitaloceanSDK.test();
        const ent = testsdk.LoadBalancer();
        (0, node_assert_1.default)(null != ent);
    });
    class FailHook extends __1.BaseFeature {
        name = 'failhook';
        version = '0.0.1';
        active = true;
        unexpected = 0;
        init() { }
        PreSpec() { throw new Error('load_balancer hook failed'); }
        PreUnexpected() { this.unexpected++; }
    }
    (0, node_test_1.test)('stream-error', async () => {
        const offline = { net: { offline: true } };
        await node_assert_1.default.rejects(async () => {
            for await (const _item of __1.DigitaloceanSDK.test(offline).LoadBalancer().stream('list')) { }
        }, /offline/);
        for await (const _item of __1.DigitaloceanSDK.test(offline).LoadBalancer()
            .stream('list', undefined, { ctrl: { throw: false } })) { }
        if (null != __1.config.feature?.rbac) {
            const denied = __1.DigitaloceanSDK.test(undefined, { feature: { rbac: { active: true, deny: true } } });
            await node_assert_1.default.rejects(async () => {
                for await (const _item of denied.LoadBalancer().stream('list')) { }
            }, (err) => 'rbac_denied' === err.code);
        }
    });
    (0, node_test_1.test)('stream-ctrl', async () => {
        const explain = {};
        const ctrl = { explain };
        for await (const _item of __1.DigitaloceanSDK.test().LoadBalancer().stream('list', undefined, { ctrl })) { }
        node_assert_1.default.deepStrictEqual(Object.keys(ctrl), ['explain']);
        (0, node_assert_1.default)(explain === ctrl.explain && 0 < Object.keys(explain).length);
    });
    (0, node_test_1.test)('unexpected', async () => {
        const hook = new FailHook();
        const client = new __1.DigitaloceanSDK({ feature: { test: { active: true } }, extend: [hook] });
        await node_assert_1.default.rejects(client.LoadBalancer().list(), /hook failed/);
        (0, node_assert_1.default)(0 < hook.unexpected);
        const fired = hook.unexpected;
        node_assert_1.default.strictEqual(await client.LoadBalancer().list(undefined, { throw: false }), undefined);
        (0, node_assert_1.default)(fired < hook.unexpected);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.DigitaloceanSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.LoadBalancer().list({ "page": "x" }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.DIGITALOCEAN_TEST_LIVE;
        for (const op of ['create', 'list', 'update', 'load', 'remove']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'load_balancer.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "algorithm": { "a": true, "de": true, "h": "Algorithm", "n": "algorithm", "r": false, "sh": "This field has been deprecated.", "t": "`$STRING`", "key$": "algorithm", "index$": 0 }, "created_at": { "a": true, "fo": "date-time", "h": "Created At", "n": "created_at", "r": false, "ro": true, "sh": "A time value given in ISO8601 combined date and time format that represents when the load balancer was created.", "t": "`$STRING`", "key$": "created_at", "index$": 1 }, "disable_lets_encrypt_dns_records": { "a": true, "h": "Disable Lets Encrypt Dns Records", "n": "disable_lets_encrypt_dns_records", "r": false, "sh": "A boolean value indicating whether to disable automatic DNS record creation for Let's Encrypt certificates that are added to the load balancer.", "t": "`$BOOLEAN`", "key$": "disable_lets_encrypt_dns_records", "index$": 2 }, "domains": { "a": true, "h": "Domains", "n": "domains", "r": false, "sh": "An array of objects specifying the domain configurations for a Global load balancer.", "t": "`$ARRAY`", "key$": "domains", "index$": 3 }, "droplet_ids": { "a": true, "h": "Droplet Ids", "n": "droplet_ids", "r": false, "sh": "An array containing the IDs of the Droplets assigned to the load balancer.", "t": "`$ARRAY`", "key$": "droplet_ids", "index$": 4 }, "enable_backend_keepalive": { "a": true, "h": "Enable Backend Keepalive", "n": "enable_backend_keepalive", "r": false, "sh": "A boolean value indicating whether HTTP keepalive connections are maintained to target Droplets.", "t": "`$BOOLEAN`", "key$": "enable_backend_keepalive", "index$": 5 }, "enable_proxy_protocol": { "a": true, "h": "Enable Proxy Protocol", "n": "enable_proxy_protocol", "r": false, "sh": "A boolean value indicating whether PROXY Protocol is in use.", "t": "`$BOOLEAN`", "key$": "enable_proxy_protocol", "index$": 6 }, "firewall": { "a": true, "h": "Firewall", "n": "firewall", "r": false, "sh": "An object specifying allow and deny rules to control traffic to the load balancer.", "t": "`$OBJECT`", "key$": "firewall", "index$": 7 }, "forwarding_rules": { "a": true, "h": "Forwarding Rules", "n": "forwarding_rules", "r": true, "sh": "An array of objects specifying the forwarding rules for a load balancer.", "t": "`$ARRAY`", "key$": "forwarding_rules", "index$": 8 }, "glb_settings": { "a": true, "h": "Glb Settings", "n": "glb_settings", "r": false, "sh": "An object specifying forwarding configurations for a Global load balancer.", "t": "`$OBJECT`", "key$": "glb_settings", "index$": 9 }, "health_check": { "a": true, "h": "Health Check", "n": "health_check", "r": false, "sh": "An object specifying health check settings for the load balancer.", "t": "`$OBJECT`", "key$": "health_check", "index$": 10 }, "http_idle_timeout_seconds": { "a": true, "h": "Http Idle Timeout Seconds", "n": "http_idle_timeout_seconds", "r": false, "sh": "An integer value which configures the idle timeout for HTTP requests to the target droplets.", "t": "`$INTEGER`", "key$": "http_idle_timeout_seconds", "index$": 11 }, "id": { "a": true, "fo": "uuid", "h": "Id", "n": "id", "r": false, "ro": true, "sh": "A unique ID that can be used to identify and reference a load balancer.", "t": "`$STRING`", "key$": "id", "index$": 12 }, "ip": { "a": true, "h": "Ip", "n": "ip", "r": false, "ro": true, "sh": "An attribute containing the public-facing IP address of the load balancer.", "t": "`$STRING`", "key$": "ip", "index$": 13 }, "ipv6": { "a": true, "h": "Ipv6", "n": "ipv6", "r": false, "ro": true, "sh": "An attribute containing the public-facing IPv6 address of the load balancer.", "t": "`$STRING`", "key$": "ipv6", "index$": 14 }, "name": { "a": true, "h": "Name", "n": "name", "r": false, "sh": "A human-readable name for a load balancer instance.", "t": "`$STRING`", "key$": "name", "index$": 15 }, "network": { "a": true, "h": "Network", "n": "network", "r": false, "sh": "A string indicating whether the load balancer should be external or internal.", "t": "`$STRING`", "key$": "network", "index$": 16 }, "network_stack": { "a": true, "h": "Network Stack", "n": "network_stack", "r": false, "sh": "A string indicating whether the load balancer will support IPv4 or both IPv4 and IPv6 networking.", "t": "`$STRING`", "key$": "network_stack", "index$": 17 }, "project_id": { "a": true, "h": "Project Id", "n": "project_id", "r": false, "sh": "The ID of the project that the load balancer is associated with.", "t": "`$STRING`", "key$": "project_id", "index$": 18 }, "redirect_http_to_https": { "a": true, "h": "Redirect Http To Https", "n": "redirect_http_to_https", "r": false, "sh": "A boolean value indicating whether HTTP requests to the load balancer on port 80 will be redirected to HTTPS on port 443.", "t": "`$BOOLEAN`", "key$": "redirect_http_to_https", "index$": 19 }, "region": { "a": true, "h": "Region", "n": "region", "r": false, "t": "`$OBJECT`", "key$": "region", "index$": 20 }, "size": { "a": true, "de": true, "h": "Size", "n": "size", "r": false, "sh": "This field has been replaced by the `size_unit` field for all regions except in AMS2, NYC2, and SFO1.", "t": "`$STRING`", "key$": "size", "index$": 21 }, "size_unit": { "a": true, "h": "Size Unit", "n": "size_unit", "r": false, "sh": "How many nodes the load balancer contains.", "t": "`$INTEGER`", "key$": "size_unit", "index$": 22 }, "status": { "a": true, "h": "Status", "n": "status", "r": false, "ro": true, "sh": "A status string indicating the current state of the load balancer.", "t": "`$STRING`", "key$": "status", "index$": 23 }, "sticky_sessions": { "a": true, "h": "Sticky Sessions", "n": "sticky_sessions", "r": false, "sh": "An object specifying sticky sessions settings for the load balancer.", "t": "`$OBJECT`", "key$": "sticky_sessions", "index$": 24 }, "subnet_uuid": { "a": true, "fo": "uuid", "h": "Subnet Uuid", "n": "subnet_uuid", "r": false, "sh": "A string specifying the UUID of the VPC subnet to which the load balancer is assigned.", "t": "`$STRING`", "key$": "subnet_uuid", "index$": 25 }, "tag": { "a": true, "h": "Tag", "n": "tag", "r": false, "sh": "The name of a Droplet tag corresponding to Droplets assigned to the load balancer.", "t": "`$STRING`", "key$": "tag", "index$": 26 }, "target_load_balancer_ids": { "a": true, "h": "Target Load Balancer Ids", "n": "target_load_balancer_ids", "r": false, "sh": "An array containing the UUIDs of the Regional load balancers to be used as target backends for a Global load balancer.", "t": "`$ARRAY`", "key$": "target_load_balancer_ids", "index$": 27 }, "tls_cipher_policy": { "a": true, "h": "Tls Cipher Policy", "n": "tls_cipher_policy", "r": false, "sh": "A string indicating the policy for the TLS cipher suites used by the load balancer.", "t": "`$STRING`", "key$": "tls_cipher_policy", "index$": 28 }, "type": { "a": true, "h": "Type", "n": "type", "r": false, "sh": "A string indicating whether the load balancer should be a standard regional HTTP load balancer, a regional network load balancer that routes traffic at the TCP/UDP transport layer, or a global load balancer.", "t": "`$STRING`", "key$": "type", "index$": 29 }, "vpc_uuid": { "a": true, "fo": "uuid", "h": "Vpc Uuid", "n": "vpc_uuid", "r": false, "sh": "A string specifying the UUID of the VPC to which the load balancer is assigned.", "t": "`$STRING`", "key$": "vpc_uuid", "index$": 30 } }, "id": { "field": "id", "name": "id" }, "name": "load_balancer", "op": { "create": { "input": "data", "name": "create", "points": [{ "a": true, "co": { "id": "POST /v2/load_balancers/{lb_id}/droplets", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "ex": "4de7ac8b-495b-4884-9a69-1050c6793cd6", "k": "param", "n": "id", "or": "lb_id", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "POST", "o": "/v2/load_balancers/{lb_id}/droplets", "q": { "$action": "droplet", "exist": ["id"] }, "r": { "param": { "lb_id": "id" } }, "s": [{ "lit": "v2" }, { "lit": "load_balancers" }, { "var": "id" }, { "lit": "droplets" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }, { "a": true, "co": { "id": "POST /v2/load_balancers/{lb_id}/forwarding_rules", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "ex": "4de7ac8b-495b-4884-9a69-1050c6793cd6", "k": "param", "n": "id", "or": "lb_id", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "POST", "o": "/v2/load_balancers/{lb_id}/forwarding_rules", "q": { "$action": "forwarding_rule", "exist": ["id"] }, "r": { "param": { "lb_id": "id" } }, "s": [{ "lit": "v2" }, { "lit": "load_balancers" }, { "var": "id" }, { "lit": "forwarding_rules" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 1 }, { "a": true, "co": { "id": "POST /v2/load_balancers", "source": "openapi3", "version": 2 }, "g": {}, "k": "http", "m": "POST", "o": "/v2/load_balancers", "q": {}, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "v2" }, { "lit": "load_balancers" }], "t": { "req": "`reqdata`", "res": "`body.load_balancer`" }, "index$": 2 }], "key$": "create" }, "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /v2/load_balancers", "source": "openapi3", "version": 2 }, "g": { "query": [{ "a": true, "ex": 1, "k": "query", "n": "page", "or": "page", "r": false, "t": "`$INTEGER`", "index$": 0 }, { "a": true, "ex": 2, "k": "query", "n": "per_page", "or": "per_page", "r": false, "t": "`$INTEGER`", "index$": 1 }] }, "k": "http", "m": "GET", "o": "/v2/load_balancers", "q": {}, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "v2" }, { "lit": "load_balancers" }], "t": { "req": "`reqdata`", "res": "`body.load_balancers`" }, "index$": 0 }], "key$": "list" }, "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /v2/load_balancers/{lb_id}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "ex": "4de7ac8b-495b-4884-9a69-1050c6793cd6", "k": "param", "n": "id", "or": "lb_id", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/v2/load_balancers/{lb_id}", "q": { "exist": ["id"] }, "r": { "param": { "lb_id": "id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "v2" }, { "lit": "load_balancers" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body.load_balancer`" }, "index$": 0 }], "key$": "load" }, "remove": { "input": "data", "name": "remove", "points": [{ "a": true, "co": { "id": "DELETE /v2/load_balancers/{lb_id}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "ex": "4de7ac8b-495b-4884-9a69-1050c6793cd6", "k": "param", "n": "id", "or": "lb_id", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "DELETE", "o": "/v2/load_balancers/{lb_id}", "q": { "exist": ["id"] }, "r": { "param": { "lb_id": "id" } }, "s": [{ "lit": "v2" }, { "lit": "load_balancers" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }, { "a": true, "co": { "id": "DELETE /v2/load_balancers/{lb_id}/cache", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "ex": "4de7ac8b-495b-4884-9a69-1050c6793cd6", "k": "param", "n": "id", "or": "lb_id", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "DELETE", "o": "/v2/load_balancers/{lb_id}/cache", "q": { "$action": "cache", "exist": ["id"] }, "r": { "param": { "lb_id": "id" } }, "s": [{ "lit": "v2" }, { "lit": "load_balancers" }, { "var": "id" }, { "lit": "cache" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 1 }, { "a": true, "co": { "id": "DELETE /v2/load_balancers/{lb_id}/droplets", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "ex": "4de7ac8b-495b-4884-9a69-1050c6793cd6", "k": "param", "n": "id", "or": "lb_id", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "DELETE", "o": "/v2/load_balancers/{lb_id}/droplets", "q": { "$action": "droplet", "exist": ["id"] }, "r": { "param": { "lb_id": "id" } }, "s": [{ "lit": "v2" }, { "lit": "load_balancers" }, { "var": "id" }, { "lit": "droplets" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 2 }, { "a": true, "co": { "id": "DELETE /v2/load_balancers/{lb_id}/forwarding_rules", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "ex": "4de7ac8b-495b-4884-9a69-1050c6793cd6", "k": "param", "n": "id", "or": "lb_id", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "DELETE", "o": "/v2/load_balancers/{lb_id}/forwarding_rules", "q": { "$action": "forwarding_rule", "exist": ["id"] }, "r": { "param": { "lb_id": "id" } }, "s": [{ "lit": "v2" }, { "lit": "load_balancers" }, { "var": "id" }, { "lit": "forwarding_rules" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 3 }], "key$": "remove" }, "update": { "input": "data", "name": "update", "points": [{ "a": true, "co": { "id": "PUT /v2/load_balancers/{lb_id}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "ex": "4de7ac8b-495b-4884-9a69-1050c6793cd6", "k": "param", "n": "id", "or": "lb_id", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "PUT", "o": "/v2/load_balancers/{lb_id}", "q": { "exist": ["id"] }, "r": { "param": { "lb_id": "id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "v2" }, { "lit": "load_balancers" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body.load_balancer`" }, "index$": 0 }], "key$": "update" } }, "relations": { "ancestors": [] }, "key$": "load_balancer", "name__orig": "load_balancer", "Name": "LoadBalancer", "name_": "load_balancer", "name-": "load-balancer", "NAME": "LOAD_BALANCER", "index$": 170 }, { "active": true, "entity": "load_balancer", "key$": "BasicLoadBalancerFlow", "kind": "basic", "name": "BasicLoadBalancerFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "load_balancer_ref01" }, "m": {}, "o": "create", "s": [], "v": [], "index$": 0 }, { "a": true, "d": {}, "i": {}, "m": {}, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "load_balancer_ref01" } }], "index$": 1 }, { "a": true, "d": {}, "i": { "ref": "load_balancer_ref01", "srcdatavar": "load_balancer_ref01_data", "suffix": "_up0", "textfield": "algorithm" }, "m": {}, "o": "update", "s": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-load_balancer_ref01" } }], "v": [], "index$": 2 }, { "a": true, "d": {}, "i": { "ref": "load_balancer_ref01", "srcdatavar": "load_balancer_ref01_data", "suffix": "_dt0" }, "m": { "id": "load_balancer01" }, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-load_balancer_ref01" } }], "index$": 3 }, { "a": true, "d": {}, "i": { "ref": "load_balancer_ref01", "suffix": "_rm0" }, "m": { "id": "load_balancer01" }, "o": "remove", "s": [], "v": [], "index$": 4 }, { "a": true, "d": {}, "i": { "suffix": "_rt0" }, "m": {}, "o": "list", "s": [], "v": [{ "apply": "ItemNotExists", "def": { "ref": "load_balancer_ref01" } }], "index$": 5 }] }, 'LoadBalancer', { "POST /v2/load_balancers/{lb_id}/droplets": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "allOf": [{ "type": "object", "properties": { "droplet_ids": { "type": "array", "items": { "type": "integer" }, "example": [3164444, 3164445], "description": "An array containing the IDs of the Droplets assigned to the load balancer.", "key$": "droplet_ids" } }, "x-ref": "#/components/schemas/load_balancer_droplet_ids" }, { "type": "object", "required": ["droplet_ids"] }] } } } }, "parameters": [{ "in": "path", "name": "lb_id", "description": "A unique identifier for a load balancer.", "required": true, "schema": { "type": "string", "minimum": 1 }, "example": "4de7ac8b-495b-4884-9a69-1050c6793cd6", "x-ref": "#/components/parameters/load_balancer_id", "index$": 0 }] }, "POST /v2/load_balancers/{lb_id}/forwarding_rules": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "properties": { "forwarding_rules": { "type": "array", "minItems": 1, "items": { "type": "object", "description": "An object specifying a forwarding rule for a load balancer.", "properties": { "entry_protocol": { "type": "string", "enum": [], "example": "https", "description": "The protocol used for traffic to the load balancer. The possible values are: `http`, `https`, `http2`, `http3`, `tcp`, or `udp`. If you set the  `entry_protocol` to `udp`, the `target_protocol` must be set to `udp`.  When using UDP, the load balancer requires that you set up a health  check with a port that uses TCP, HTTP, or HTTPS to work properly.\n" }, "entry_port": { "type": "integer", "example": 443, "description": "An integer representing the port on which the load balancer instance will listen." }, "target_protocol": { "type": "string", "enum": [], "example": "http", "description": "The protocol used for traffic from the load balancer to the backend Droplets. The possible values are: `http`, `https`, `http2`, `tcp`, or `udp`. If you set the `target_protocol` to `udp`, the `entry_protocol` must be set to  `udp`. When using UDP, the load balancer requires that you set up a health  check with a port that uses TCP, HTTP, or HTTPS to work properly.\n" }, "target_port": { "type": "integer", "example": 80, "description": "An integer representing the port on the backend Droplets to which the load balancer will send traffic." }, "certificate_id": { "type": "string", "example": "892071a0-bb95-49bc-8021-3afd67a210bf", "description": "The ID of the TLS certificate used for SSL termination if enabled." }, "tls_passthrough": { "type": "boolean", "example": false, "description": "A boolean value indicating whether SSL encrypted traffic will be passed through to the backend Droplets." } }, "required": ["entry_protocol", "entry_port", "target_protocol", "target_port"], "x-ref": "#/components/schemas/forwarding_rule" } } }, "required": ["forwarding_rules"] } } } }, "parameters": [{ "in": "path", "name": "lb_id", "description": "A unique identifier for a load balancer.", "required": true, "schema": { "type": "string", "minimum": 1 }, "example": "4de7ac8b-495b-4884-9a69-1050c6793cd6", "x-ref": "#/components/parameters/load_balancer_id", "index$": 0 }] }, "POST /v2/load_balancers": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "description": "The request schema for creating a load balancer. This is the same as the update schema with the addition of the create-only `ip` field, which assigns a Bring Your Own IP (BYOIP) address to the load balancer.", "oneOf": [{ "title": "Assign Droplets by ID", "allOf": [{ "type": "object", "properties": { "droplet_ids": {} }, "x-ref": "#/components/schemas/load_balancer_droplet_ids" }, { "type": "object", "properties": { "ip": {} }, "x-ref": "#/components/schemas/load_balancer_ip" }, { "type": "object", "properties": { "region": {} } }, { "type": "object", "properties": { "id": {}, "name": {}, "project_id": {}, "ipv6": {}, "size_unit": {}, "size": {}, "algorithm": {}, "status": {}, "created_at": {}, "forwarding_rules": {}, "health_check": {}, "sticky_sessions": {}, "redirect_http_to_https": {}, "enable_proxy_protocol": {}, "enable_backend_keepalive": {}, "http_idle_timeout_seconds": {}, "vpc_uuid": {}, "subnet_uuid": {}, "disable_lets_encrypt_dns_records": {}, "firewall": {}, "network": {}, "network_stack": {}, "type": {}, "domains": {}, "glb_settings": {}, "target_load_balancer_ids": {}, "tls_cipher_policy": {} }, "required": ["forwarding_rules"], "x-ref": "#/components/schemas/load_balancer_base" }], "required": ["droplet_ids", "region"] }, { "title": "Assign Droplets by Tag", "allOf": [{ "type": "object", "properties": { "tag": {} }, "x-ref": "#/components/schemas/load_balancer_droplet_tag" }, { "type": "object", "properties": { "ip": {} }, "x-ref": "#/components/schemas/load_balancer_ip" }, { "type": "object", "properties": { "region": {} } }, { "type": "object", "properties": { "id": {}, "name": {}, "project_id": {}, "ipv6": {}, "size_unit": {}, "size": {}, "algorithm": {}, "status": {}, "created_at": {}, "forwarding_rules": {}, "health_check": {}, "sticky_sessions": {}, "redirect_http_to_https": {}, "enable_proxy_protocol": {}, "enable_backend_keepalive": {}, "http_idle_timeout_seconds": {}, "vpc_uuid": {}, "subnet_uuid": {}, "disable_lets_encrypt_dns_records": {}, "firewall": {}, "network": {}, "network_stack": {}, "type": {}, "domains": {}, "glb_settings": {}, "target_load_balancer_ids": {}, "tls_cipher_policy": {} }, "required": ["forwarding_rules"], "x-ref": "#/components/schemas/load_balancer_base" }], "required": ["tag", "region"] }], "x-ref": "#/components/schemas/load_balancer_create", "index$": 1 }, "examples": { "Basic Create Request": { "description": "Passing requests directly through to 80 and 443.", "value": { "name": "example-lb-01", "region": "nyc3", "subnet_uuid": "cbd79771-23eb-49be-b5ea-59cc56222622", "forwarding_rules": [{ "entry_protocol": "http", "entry_port": 80, "target_protocol": "http", "target_port": 80 }, { "entry_protocol": "https", "entry_port": 443, "target_protocol": "https", "target_port": 443, "tls_passthrough": true }], "droplet_ids": [3164444, 3164445], "project_id": "9cc10173-e9ea-4176-9dbc-a4cee4c4ff30", "http_idle_timeout_seconds": 60, "firewall": { "deny": ["cidr:1.2.0.0/16", "ip:2.3.4.5"], "allow": ["ip:1.2.3.4", "cidr:2.3.4.0/24"] } }, "x-ref": "#/components/examples/load_balancer_basic_create_request" }, "SSL Termination Create Request": { "description": "Terminating SSL at the load balancer using a managed SSL certificate specifying Droplets using `droplet_ids`.", "value": { "name": "example-lb-01", "region": "nyc3", "forwarding_rules": [{ "entry_protocol": "https", "entry_port": 443, "target_protocol": "http", "target_port": 8080, "certificate_id": "892071a0-bb95-49bc-8021-3afd67a210bf" }], "droplet_ids": [3164444, 3164445] }, "x-ref": "#/components/examples/load_balancer_ssl_termination_create_request" }, "Create Request Using Droplet Tag": { "description": "Terminating SSL at the load balancer using a managed SSL certificate specifying Droplets using `tag`.", "value": { "name": "example-lb-01", "region": "nyc3", "forwarding_rules": [{ "entry_protocol": "https", "entry_port": 443, "target_protocol": "http", "target_port": 8080, "certificate_id": "892071a0-bb95-49bc-8021-3afd67a210bf" }], "tag": "prod:web" }, "x-ref": "#/components/examples/load_balancer_using_tag_create_request" }, "Sticky Sessions and Custom Health Check": { "description": "Terminating SSL at the load balancer using a managed SSL certificate specifying Droplets using `tag`.", "value": { "name": "example-lb-01", "region": "nyc3", "forwarding_rules": [{ "entry_protocol": "https", "entry_port": 443, "target_protocol": "http", "target_port": 8080, "certificate_id": "892071a0-bb95-49bc-8021-3afd67a210bf" }], "health_check": { "protocol": "http", "port": 8080, "path": "/health", "check_interval_seconds": 10, "response_timeout_seconds": 5, "healthy_threshold": 5, "unhealthy_threshold": 3 }, "sticky_sessions": { "type": "cookies", "cookie_name": "LB_COOKIE", "cookie_ttl_seconds": 300 }, "tag": "prod:web" }, "x-ref": "#/components/examples/load_balancer_sticky_sessions_and_health_check_create_request" } } } } }, "parameters": [] }, "GET /v2/load_balancers": { "protocol": "http", "parameters": [{ "in": "query", "name": "per_page", "required": false, "description": "Number of items returned per page", "schema": { "type": "integer", "minimum": 1, "default": 20, "maximum": 200 }, "example": 2, "x-ref": "#/components/parameters/parameters_per_page", "index$": 0 }, { "in": "query", "name": "page", "required": false, "description": "Which 'page' of paginated results to return.", "schema": { "type": "integer", "minimum": 1, "default": 1 }, "example": 1, "x-ref": "#/components/parameters/page", "index$": 1 }] }, "GET /v2/load_balancers/{lb_id}": { "protocol": "http", "parameters": [{ "in": "path", "name": "lb_id", "description": "A unique identifier for a load balancer.", "required": true, "schema": { "type": "string", "minimum": 1 }, "example": "4de7ac8b-495b-4884-9a69-1050c6793cd6", "x-ref": "#/components/parameters/load_balancer_id", "index$": 0 }] }, "DELETE /v2/load_balancers/{lb_id}": { "protocol": "http", "parameters": [{ "in": "path", "name": "lb_id", "description": "A unique identifier for a load balancer.", "required": true, "schema": { "type": "string", "minimum": 1 }, "example": "4de7ac8b-495b-4884-9a69-1050c6793cd6", "x-ref": "#/components/parameters/load_balancer_id", "index$": 0 }] }, "DELETE /v2/load_balancers/{lb_id}/cache": { "protocol": "http", "parameters": [{ "in": "path", "name": "lb_id", "description": "A unique identifier for a load balancer.", "required": true, "schema": { "type": "string", "minimum": 1 }, "example": "4de7ac8b-495b-4884-9a69-1050c6793cd6", "x-ref": "#/components/parameters/load_balancer_id", "index$": 0 }] }, "DELETE /v2/load_balancers/{lb_id}/droplets": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "allOf": [{ "type": "object", "properties": { "droplet_ids": { "type": "array", "items": { "type": "integer" }, "example": [3164444, 3164445], "description": "An array containing the IDs of the Droplets assigned to the load balancer.", "key$": "droplet_ids" } }, "x-ref": "#/components/schemas/load_balancer_droplet_ids" }, { "type": "object", "required": ["droplet_ids"] }] } } } }, "parameters": [{ "in": "path", "name": "lb_id", "description": "A unique identifier for a load balancer.", "required": true, "schema": { "type": "string", "minimum": 1 }, "example": "4de7ac8b-495b-4884-9a69-1050c6793cd6", "x-ref": "#/components/parameters/load_balancer_id", "index$": 0 }] }, "DELETE /v2/load_balancers/{lb_id}/forwarding_rules": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "properties": { "forwarding_rules": { "type": "array", "minItems": 1, "items": { "type": "object", "description": "An object specifying a forwarding rule for a load balancer.", "properties": { "entry_protocol": { "type": "string", "enum": [], "example": "https", "description": "The protocol used for traffic to the load balancer. The possible values are: `http`, `https`, `http2`, `http3`, `tcp`, or `udp`. If you set the  `entry_protocol` to `udp`, the `target_protocol` must be set to `udp`.  When using UDP, the load balancer requires that you set up a health  check with a port that uses TCP, HTTP, or HTTPS to work properly.\n" }, "entry_port": { "type": "integer", "example": 443, "description": "An integer representing the port on which the load balancer instance will listen." }, "target_protocol": { "type": "string", "enum": [], "example": "http", "description": "The protocol used for traffic from the load balancer to the backend Droplets. The possible values are: `http`, `https`, `http2`, `tcp`, or `udp`. If you set the `target_protocol` to `udp`, the `entry_protocol` must be set to  `udp`. When using UDP, the load balancer requires that you set up a health  check with a port that uses TCP, HTTP, or HTTPS to work properly.\n" }, "target_port": { "type": "integer", "example": 80, "description": "An integer representing the port on the backend Droplets to which the load balancer will send traffic." }, "certificate_id": { "type": "string", "example": "892071a0-bb95-49bc-8021-3afd67a210bf", "description": "The ID of the TLS certificate used for SSL termination if enabled." }, "tls_passthrough": { "type": "boolean", "example": false, "description": "A boolean value indicating whether SSL encrypted traffic will be passed through to the backend Droplets." } }, "required": ["entry_protocol", "entry_port", "target_protocol", "target_port"], "x-ref": "#/components/schemas/forwarding_rule" } } }, "required": ["forwarding_rules"] } } } }, "parameters": [{ "in": "path", "name": "lb_id", "description": "A unique identifier for a load balancer.", "required": true, "schema": { "type": "string", "minimum": 1 }, "example": "4de7ac8b-495b-4884-9a69-1050c6793cd6", "x-ref": "#/components/parameters/load_balancer_id", "index$": 0 }] }, "PUT /v2/load_balancers/{lb_id}": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "oneOf": [{ "title": "Assign Droplets by ID", "allOf": [{ "type": "object", "properties": { "droplet_ids": {} }, "x-ref": "#/components/schemas/load_balancer_droplet_ids" }, { "type": "object", "properties": { "region": {} } }, { "type": "object", "properties": { "id": {}, "name": {}, "project_id": {}, "ipv6": {}, "size_unit": {}, "size": {}, "algorithm": {}, "status": {}, "created_at": {}, "forwarding_rules": {}, "health_check": {}, "sticky_sessions": {}, "redirect_http_to_https": {}, "enable_proxy_protocol": {}, "enable_backend_keepalive": {}, "http_idle_timeout_seconds": {}, "vpc_uuid": {}, "subnet_uuid": {}, "disable_lets_encrypt_dns_records": {}, "firewall": {}, "network": {}, "network_stack": {}, "type": {}, "domains": {}, "glb_settings": {}, "target_load_balancer_ids": {}, "tls_cipher_policy": {} }, "required": ["forwarding_rules"], "x-ref": "#/components/schemas/load_balancer_base" }], "required": ["droplet_ids", "region"] }, { "title": "Assign Droplets by Tag", "allOf": [{ "type": "object", "properties": { "tag": {} }, "x-ref": "#/components/schemas/load_balancer_droplet_tag" }, { "type": "object", "properties": { "region": {} } }, { "type": "object", "properties": { "id": {}, "name": {}, "project_id": {}, "ipv6": {}, "size_unit": {}, "size": {}, "algorithm": {}, "status": {}, "created_at": {}, "forwarding_rules": {}, "health_check": {}, "sticky_sessions": {}, "redirect_http_to_https": {}, "enable_proxy_protocol": {}, "enable_backend_keepalive": {}, "http_idle_timeout_seconds": {}, "vpc_uuid": {}, "subnet_uuid": {}, "disable_lets_encrypt_dns_records": {}, "firewall": {}, "network": {}, "network_stack": {}, "type": {}, "domains": {}, "glb_settings": {}, "target_load_balancer_ids": {}, "tls_cipher_policy": {} }, "required": ["forwarding_rules"], "x-ref": "#/components/schemas/load_balancer_base" }], "required": ["tag", "region"] }], "x-ref": "#/components/schemas/load_balancer_update", "index$": 1 }, "examples": { "load_balancer_update_request": { "value": { "name": "updated-example-lb-01", "region": "nyc3", "droplet_ids": [3164444, 3164445], "algorithm": "round_robin", "forwarding_rules": [{ "entry_protocol": "http", "entry_port": 80, "target_protocol": "http", "target_port": 80, "certificate_id": "", "tls_passthrough": false }, { "entry_protocol": "https", "entry_port": 443, "target_protocol": "https", "target_port": 443, "certificate_id": "", "tls_passthrough": true }], "health_check": { "protocol": "http", "port": 80, "path": "/", "check_interval_seconds": 10, "response_timeout_seconds": 5, "healthy_threshold": 5, "unhealthy_threshold": 3 }, "sticky_sessions": { "type": "none" }, "redirect_http_to_https": false, "enable_proxy_protocol": true, "enable_backend_keepalive": true, "vpc_uuid": "c33931f2-a26a-4e61-b85c-4e95a2ec431b", "subnet_uuid": "cbd79771-23eb-49be-b5ea-59cc56222622", "project_id": "9cc10173-e9ea-4176-9dbc-a4cee4c4ff30", "http_idle_timeout_seconds": 60, "firewall": { "deny": ["cidr:1.2.0.0/16", "ip:2.3.4.5"], "allow": ["ip:1.2.3.4", "cidr:2.3.4.0/24"] } }, "x-ref": "#/components/examples/load_balancer_update_request" } } } } }, "parameters": [{ "in": "path", "name": "lb_id", "description": "A unique identifier for a load balancer.", "required": true, "schema": { "type": "string", "minimum": 1 }, "example": "4de7ac8b-495b-4884-9a69-1050c6793cd6", "x-ref": "#/components/parameters/load_balancer_id", "index$": 0 }] } }, { strict: LIVE_STRICT, t });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const load_balancer_ref01_ent = client.LoadBalancer();
        let load_balancer_ref01_data = setup.data.new.load_balancer['load_balancer_ref01'];
        load_balancer_ref01_data = (await load_balancer_ref01_ent.create(load_balancer_ref01_data)).data();
        (0, node_assert_1.default)(null != load_balancer_ref01_data.id);
        // LIST
        const load_balancer_ref01_match = {};
        const load_balancer_ref01_list = (await load_balancer_ref01_ent.list(load_balancer_ref01_match)).map((e) => e.data());
        (0, node_assert_1.default)(!isempty(select(load_balancer_ref01_list, { id: load_balancer_ref01_data.id })));
        // UPDATE
        const load_balancer_ref01_data_up0 = {};
        load_balancer_ref01_data_up0.id = load_balancer_ref01_data.id;
        const load_balancer_ref01_markdef_up0 = { name: 'algorithm', value: 'Mark01-load_balancer_ref01_' + setup.now };
        load_balancer_ref01_data_up0[load_balancer_ref01_markdef_up0.name] = load_balancer_ref01_markdef_up0.value;
        const load_balancer_ref01_resdata_up0 = (await load_balancer_ref01_ent.update(load_balancer_ref01_data_up0)).data();
        (0, node_assert_1.default)(load_balancer_ref01_resdata_up0.id === load_balancer_ref01_data_up0.id);
        (0, node_assert_1.default)(load_balancer_ref01_resdata_up0[load_balancer_ref01_markdef_up0.name] === load_balancer_ref01_markdef_up0.value);
        // LOAD
        const load_balancer_ref01_match_dt0 = {};
        load_balancer_ref01_match_dt0.id = load_balancer_ref01_data.id;
        const load_balancer_ref01_data_dt0 = (await load_balancer_ref01_ent.load(load_balancer_ref01_match_dt0)).data();
        (0, node_assert_1.default)(load_balancer_ref01_data_dt0.id === load_balancer_ref01_data.id);
        // REMOVE
        const load_balancer_ref01_match_rm0 = { id: load_balancer_ref01_data.id };
        await load_balancer_ref01_ent.remove(load_balancer_ref01_match_rm0);
        // LIST
        const load_balancer_ref01_match_rt0 = {};
        const load_balancer_ref01_list_rt0 = (await load_balancer_ref01_ent.list(load_balancer_ref01_match_rt0)).map((e) => e.data());
        (0, node_assert_1.default)(isempty(select(load_balancer_ref01_list_rt0, { id: load_balancer_ref01_data.id })));
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
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/load_balancer/LoadBalancerTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.DigitaloceanSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['load_balancer01', 'load_balancer02', 'load_balancer03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'DIGITALOCEAN_TEST_LOAD_BALANCER_ENTID': idmap,
        'DIGITALOCEAN_TEST_LIVE': 'FALSE',
        'DIGITALOCEAN_TEST_EXPLAIN': 'FALSE',
        'DIGITALOCEAN_APIKEY': '',
    });
    idmap = env['DIGITALOCEAN_TEST_LOAD_BALANCER_ENTID'];
    const live = 'TRUE' === env.DIGITALOCEAN_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['DIGITALOCEAN_TEST_LOAD_BALANCER_ENTID'];
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
//# sourceMappingURL=LoadBalancerEntity.test.js.map