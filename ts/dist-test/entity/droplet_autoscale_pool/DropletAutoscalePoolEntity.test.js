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
(0, node_test_1.describe)('DropletAutoscalePoolEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when DIGITALOCEAN_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('DIGITALOCEAN_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.DigitaloceanSDK.test();
        const ent = testsdk.DropletAutoscalePool();
        (0, node_assert_1.default)(null != ent);
    });
    class FailHook extends __1.BaseFeature {
        name = 'failhook';
        version = '0.0.1';
        active = true;
        unexpected = 0;
        init() { }
        PreSpec() { throw new Error('droplet_autoscale_pool hook failed'); }
        PreUnexpected() { this.unexpected++; }
    }
    (0, node_test_1.test)('stream-error', async () => {
        const offline = { net: { offline: true } };
        await node_assert_1.default.rejects(async () => {
            for await (const _item of __1.DigitaloceanSDK.test(offline).DropletAutoscalePool().stream('list')) { }
        }, /offline/);
        for await (const _item of __1.DigitaloceanSDK.test(offline).DropletAutoscalePool()
            .stream('list', undefined, { ctrl: { throw: false } })) { }
        if (null != __1.config.feature?.rbac) {
            const denied = __1.DigitaloceanSDK.test(undefined, { feature: { rbac: { active: true, deny: true } } });
            await node_assert_1.default.rejects(async () => {
                for await (const _item of denied.DropletAutoscalePool().stream('list')) { }
            }, (err) => 'rbac_denied' === err.code);
        }
    });
    (0, node_test_1.test)('stream-ctrl', async () => {
        const explain = {};
        const ctrl = { explain };
        for await (const _item of __1.DigitaloceanSDK.test().DropletAutoscalePool().stream('list', undefined, { ctrl })) { }
        node_assert_1.default.deepStrictEqual(Object.keys(ctrl), ['explain']);
        (0, node_assert_1.default)(explain === ctrl.explain && 0 < Object.keys(explain).length);
    });
    (0, node_test_1.test)('unexpected', async () => {
        const hook = new FailHook();
        const client = new __1.DigitaloceanSDK({ feature: { test: { active: true } }, extend: [hook] });
        await node_assert_1.default.rejects(client.DropletAutoscalePool().list(), /hook failed/);
        (0, node_assert_1.default)(0 < hook.unexpected);
        const fired = hook.unexpected;
        node_assert_1.default.strictEqual(await client.DropletAutoscalePool().list(undefined, { throw: false }), undefined);
        (0, node_assert_1.default)(fired < hook.unexpected);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.DigitaloceanSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.DropletAutoscalePool().list({ "name": 1 }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.DIGITALOCEAN_TEST_LIVE;
        for (const op of ['create', 'list', 'update', 'load', 'remove']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'droplet_autoscale_pool.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "active_resources_count": { "a": true, "h": "Active Resources Count", "n": "active_resources_count", "r": true, "sh": "The number of active Droplets in the autoscale pool.", "t": "`$INTEGER`", "key$": "active_resources_count", "index$": 0 }, "config": { "a": true, "h": "Config", "n": "config", "r": true, "sh": "The scaling configuration for an autoscale pool, which is how the pool scales up and down (either by resource utilization or static configuration).", "t": "`$OBJECT`", "union": { "branches": 2, "count": 1, "depth": 0 }, "key$": "config", "index$": 1 }, "created_at": { "a": true, "fo": "date-time", "h": "Created At", "n": "created_at", "r": true, "sh": "A time value given in ISO8601 combined date and time format that represents when the autoscale pool was created.", "t": "`$STRING`", "key$": "created_at", "index$": 2 }, "current_instance_count": { "a": true, "h": "Current Instance Count", "n": "current_instance_count", "r": true, "sh": "The current number of Droplets in the autoscale pool.", "t": "`$INTEGER`", "key$": "current_instance_count", "index$": 3 }, "current_utilization": { "a": true, "h": "Current Utilization", "n": "current_utilization", "op": { "list": { "req": true, "type": "`$OBJECT`" } }, "r": false, "t": "`$OBJECT`", "key$": "current_utilization", "index$": 4 }, "desired_instance_count": { "a": true, "h": "Desired Instance Count", "n": "desired_instance_count", "r": true, "sh": "The target number of Droplets for the autoscale pool after the scaling event.", "t": "`$INTEGER`", "key$": "desired_instance_count", "index$": 5 }, "droplet_id": { "a": true, "h": "Droplet Id", "n": "droplet_id", "r": true, "sh": "The unique identifier of the Droplet.", "t": "`$INTEGER`", "key$": "droplet_id", "index$": 6 }, "droplet_template": { "a": true, "h": "Droplet Template", "n": "droplet_template", "r": true, "t": "`$OBJECT`", "key$": "droplet_template", "index$": 7 }, "health_status": { "a": true, "h": "Health Status", "n": "health_status", "r": true, "sh": "The health status of the Droplet.", "t": "`$STRING`", "key$": "health_status", "index$": 8 }, "history_event_id": { "a": true, "h": "History Event Id", "n": "history_event_id", "r": true, "sh": "The unique identifier of the history event.", "t": "`$STRING`", "key$": "history_event_id", "index$": 9 }, "id": { "a": true, "h": "Id", "n": "id", "r": true, "sh": "A unique identifier for each autoscale pool instance.", "t": "`$STRING`", "key$": "id", "index$": 10 }, "name": { "a": true, "h": "Name", "n": "name", "r": true, "sh": "The human-readable name set for the autoscale pool.", "t": "`$STRING`", "key$": "name", "index$": 11 }, "reason": { "a": true, "h": "Reason", "n": "reason", "r": true, "sh": "The reason for the scaling event.", "t": "`$STRING`", "key$": "reason", "index$": 12 }, "status": { "a": true, "h": "Status", "n": "status", "r": true, "sh": "The current status of the autoscale pool.", "t": "`$STRING`", "key$": "status", "index$": 13 }, "unhealthy_reason": { "a": true, "h": "Unhealthy Reason", "n": "unhealthy_reason", "r": false, "sh": "A human-readable description of why the Droplet is unhealthy.", "t": "`$STRING`", "key$": "unhealthy_reason", "index$": 14 }, "updated_at": { "a": true, "fo": "date-time", "h": "Updated At", "n": "updated_at", "r": true, "sh": "A time value given in ISO8601 combined date and time format that represents when the autoscale pool was last updated.", "t": "`$STRING`", "key$": "updated_at", "index$": 15 } }, "id": { "field": "id", "name": "id" }, "name": "droplet_autoscale_pool", "op": { "create": { "input": "data", "name": "create", "points": [{ "a": true, "co": { "id": "POST /v2/droplets/autoscale", "source": "openapi3", "version": 2 }, "g": {}, "k": "http", "m": "POST", "o": "/v2/droplets/autoscale", "q": {}, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "v2" }, { "lit": "droplets" }, { "lit": "autoscale" }], "t": { "req": "`reqdata`", "res": "`body.autoscale_pool`" }, "index$": 0 }], "key$": "create" }, "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /v2/droplets/autoscale/{autoscale_pool_id}/history", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "ex": "0d3db13e-a604-4944-9827-7ec2642d32ac", "k": "param", "n": "autoscale_pool_id", "or": "autoscale_pool_id", "r": true, "t": "`$STRING`", "index$": 0 }], "query": [{ "a": true, "ex": 1, "k": "query", "n": "page", "or": "page", "r": false, "t": "`$INTEGER`", "index$": 0 }, { "a": true, "ex": 2, "k": "query", "n": "per_page", "or": "per_page", "r": false, "t": "`$INTEGER`", "index$": 1 }] }, "k": "http", "m": "GET", "o": "/v2/droplets/autoscale/{autoscale_pool_id}/history", "q": { "exist": ["autoscale_pool_id"] }, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "v2" }, { "lit": "droplets" }, { "lit": "autoscale" }, { "var": "autoscale_pool_id" }, { "lit": "history" }], "t": { "req": "`reqdata`", "res": "`body.history`" }, "index$": 0 }, { "a": true, "co": { "id": "GET /v2/droplets/autoscale/{autoscale_pool_id}/members", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "ex": "0d3db13e-a604-4944-9827-7ec2642d32ac", "k": "param", "n": "autoscale_pool_id", "or": "autoscale_pool_id", "r": true, "t": "`$STRING`", "index$": 0 }], "query": [{ "a": true, "ex": 1, "k": "query", "n": "page", "or": "page", "r": false, "t": "`$INTEGER`", "index$": 0 }, { "a": true, "ex": 2, "k": "query", "n": "per_page", "or": "per_page", "r": false, "t": "`$INTEGER`", "index$": 1 }] }, "k": "http", "m": "GET", "o": "/v2/droplets/autoscale/{autoscale_pool_id}/members", "q": { "exist": ["autoscale_pool_id"] }, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "v2" }, { "lit": "droplets" }, { "lit": "autoscale" }, { "var": "autoscale_pool_id" }, { "lit": "members" }], "t": { "req": "`reqdata`", "res": "`body.droplets`" }, "index$": 1 }, { "a": true, "co": { "id": "GET /v2/droplets/autoscale", "source": "openapi3", "version": 2 }, "g": { "query": [{ "a": true, "ex": "my-autoscale-pool", "k": "query", "n": "name", "or": "name", "r": false, "t": "`$STRING`", "index$": 0 }, { "a": true, "ex": 1, "k": "query", "n": "page", "or": "page", "r": false, "t": "`$INTEGER`", "index$": 1 }, { "a": true, "ex": 2, "k": "query", "n": "per_page", "or": "per_page", "r": false, "t": "`$INTEGER`", "index$": 2 }] }, "k": "http", "m": "GET", "o": "/v2/droplets/autoscale", "q": {}, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "v2" }, { "lit": "droplets" }, { "lit": "autoscale" }], "t": { "req": "`reqdata`", "res": "`body.autoscale_pools`" }, "index$": 2 }], "key$": "list" }, "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /v2/droplets/autoscale/{autoscale_pool_id}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "ex": "0d3db13e-a604-4944-9827-7ec2642d32ac", "k": "param", "n": "autoscale_pool_id", "or": "autoscale_pool_id", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/v2/droplets/autoscale/{autoscale_pool_id}", "q": { "exist": ["autoscale_pool_id"] }, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "v2" }, { "lit": "droplets" }, { "lit": "autoscale" }, { "var": "autoscale_pool_id" }], "t": { "req": "`reqdata`", "res": "`body.autoscale_pool`" }, "index$": 0 }], "key$": "load" }, "remove": { "input": "data", "name": "remove", "points": [{ "a": true, "co": { "id": "DELETE /v2/droplets/autoscale/{autoscale_pool_id}/dangerous", "source": "openapi3", "version": 2 }, "g": { "header": [{ "a": true, "ex": true, "k": "header", "n": "x_dangerous", "or": "X-Dangerous", "r": true, "t": "`$BOOLEAN`", "index$": 0 }], "params": [{ "a": true, "ex": "0d3db13e-a604-4944-9827-7ec2642d32ac", "k": "param", "n": "autoscale_pool_id", "or": "autoscale_pool_id", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "DELETE", "o": "/v2/droplets/autoscale/{autoscale_pool_id}/dangerous", "q": { "$action": "dangerous", "exist": ["autoscale_pool_id", "x_dangerous"] }, "r": {}, "s": [{ "lit": "v2" }, { "lit": "droplets" }, { "lit": "autoscale" }, { "var": "autoscale_pool_id" }, { "lit": "dangerous" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }, { "a": true, "co": { "id": "DELETE /v2/droplets/autoscale/{autoscale_pool_id}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "ex": "0d3db13e-a604-4944-9827-7ec2642d32ac", "k": "param", "n": "autoscale_pool_id", "or": "autoscale_pool_id", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "DELETE", "o": "/v2/droplets/autoscale/{autoscale_pool_id}", "q": { "exist": ["autoscale_pool_id"] }, "r": {}, "s": [{ "lit": "v2" }, { "lit": "droplets" }, { "lit": "autoscale" }, { "var": "autoscale_pool_id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 1 }], "key$": "remove" }, "update": { "input": "data", "name": "update", "points": [{ "a": true, "co": { "id": "PUT /v2/droplets/autoscale/{autoscale_pool_id}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "ex": "0d3db13e-a604-4944-9827-7ec2642d32ac", "k": "param", "n": "autoscale_pool_id", "or": "autoscale_pool_id", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "PUT", "o": "/v2/droplets/autoscale/{autoscale_pool_id}", "q": { "exist": ["autoscale_pool_id"] }, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "v2" }, { "lit": "droplets" }, { "lit": "autoscale" }, { "var": "autoscale_pool_id" }], "t": { "req": "`reqdata`", "res": "`body.autoscale_pool`" }, "index$": 0 }], "key$": "update" } }, "relations": { "ancestors": [] }, "key$": "droplet_autoscale_pool", "name__orig": "droplet_autoscale_pool", "Name": "DropletAutoscalePool", "name_": "droplet_autoscale_pool", "name-": "droplet-autoscale-pool", "NAME": "DROPLET_AUTOSCALE_POOL", "index$": 147 }, { "active": true, "entity": "droplet_autoscale_pool", "key$": "BasicDropletAutoscalePoolFlow", "kind": "basic", "name": "BasicDropletAutoscalePoolFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "droplet_autoscale_pool_ref01" }, "m": { "autoscale_pool_id": "autoscale_pool01" }, "o": "create", "s": [], "v": [], "index$": 0 }, { "a": true, "d": {}, "i": {}, "m": {}, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "droplet_autoscale_pool_ref01" } }], "index$": 1 }, { "a": true, "d": {}, "i": { "ref": "droplet_autoscale_pool_ref01", "srcdatavar": "droplet_autoscale_pool_ref01_data", "suffix": "_up0", "textfield": "created_at" }, "m": {}, "o": "update", "s": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-droplet_autoscale_pool_ref01" } }], "v": [], "index$": 2 }, { "a": true, "d": {}, "i": { "ref": "droplet_autoscale_pool_ref01", "srcdatavar": "droplet_autoscale_pool_ref01_data", "suffix": "_dt0" }, "m": { "id": "droplet_autoscale_pool01" }, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-droplet_autoscale_pool_ref01" } }], "index$": 3 }, { "a": true, "d": {}, "i": { "ref": "droplet_autoscale_pool_ref01", "suffix": "_rm0" }, "m": { "id": "droplet_autoscale_pool01" }, "o": "remove", "s": [], "v": [], "index$": 4 }, { "a": true, "d": {}, "i": { "suffix": "_rt0" }, "m": {}, "o": "list", "s": [], "v": [{ "apply": "ItemNotExists", "def": { "ref": "droplet_autoscale_pool_ref01" } }], "index$": 5 }] }, 'DropletAutoscalePool', { "POST /v2/droplets/autoscale": { "protocol": "http", "requestBody": { "content": { "application/json": { "schema": { "type": "object", "properties": { "name": { "example": "my-autoscale-pool", "type": "string", "description": "The human-readable name of the autoscale pool. This field cannot be updated", "key$": "name" }, "config": { "oneOf": [{ "type": "object", "properties": { "target_number_instances": {} }, "required": ["target_number_instances"], "x-ref": "#/components/schemas/autoscale_pool_static_config" }, { "type": "object", "properties": { "min_instances": {}, "max_instances": {}, "target_cpu_utilization": {}, "target_memory_utilization": {}, "cooldown_minutes": {} }, "required": ["min_instances", "max_instances"], "x-ref": "#/components/schemas/autoscale_pool_dynamic_config" }], "type": "object", "description": "The scaling configuration for an autoscale pool, which is how the pool scales up and down (either by resource utilization or static configuration).", "key$": "config" }, "droplet_template": { "type": "object", "properties": { "name": { "type": "string", "example": "my-droplet-name", "description": "The name(s) to be applied to all Droplets in the autoscale pool." }, "region": { "type": "string", "example": "tor1", "enum": ["nyc1", "nyc2", "nyc3", "ams2", "ams3", "sfo1", "sfo2", "sfo3", "sgp1", "lon1", "fra1", "tor1", "blr1", "syd1"], "description": "The datacenter in which all of the Droplets will be created." }, "size": { "type": "string", "example": "c-2", "description": "The Droplet size to be used for all Droplets in the autoscale pool." }, "image": { "type": "string", "example": "ubuntu-20-04-x64", "description": "The Droplet image to be used for all Droplets in the autoscale pool. You may specify the slug or the image ID." }, "ssh_keys": { "type": "array", "items": { "type": "string" }, "example": ["88:66:90:d2:68:d5:b5:85:e3:26:26:11:31:57:e6:f8"], "description": "The SSH keys to be installed on the Droplets in the autoscale pool. You can either specify the key ID or the fingerprint.\nRequires `ssh_key:read` scope.\n" }, "tags": { "type": "array", "items": { "type": "string" }, "example": ["my-tag"], "description": "The tags to apply to each of the Droplets in the autoscale pool.\nRequires `tag:read` scope.\n" }, "vpc_uuid": { "type": "string", "description": "The VPC where the Droplets in the autoscale pool will be created. The VPC must be in the region where you want to create the Droplets.\nRequires `vpc:read` scope.\n", "example": "760e09ef-dc84-11e8-981e-3cfdfeaae000" }, "with_droplet_agent": { "type": "boolean", "description": "Installs the Droplet agent. This must be set to true to monitor Droplets for resource utilization scaling.", "example": true }, "project_id": { "type": "string", "description": "The project that the Droplets in the autoscale pool will belong to.\nRequires `project:read` scope.\n", "example": "746c6152-2fa2-11ed-92d3-27aaa54e4988" }, "ipv6": { "type": "boolean", "description": "Assigns a unique IPv6 address to each of the Droplets in the autoscale pool.", "example": true }, "user_data": { "type": "string", "example": "#cloud-config\nruncmd:\n  - touch /test.txt\n", "description": "A string containing user data that cloud-init consumes to configure a Droplet on first boot. User data is often a cloud-config file or Bash script. It must be plain text and may not exceed 64 KiB in size." }, "public_networking": { "type": "boolean", "example": true, "default": true, "description": "An optional boolean indicating whether the Droplets should be created with public networking or not. By default, all Droplets are created with public networking available. If explicitly set to `false`, only private networking will be enabled, and public networking will be disabled; currently this means that it will not have any public static or Reserved IPv4 or IPv6 address, nor can one be assigned later. If explicitly set to `false`, `ipv6` must also be `false`." } }, "required": ["region", "image", "size", "ssh_keys"], "x-ref": "#/components/schemas/autoscale_pool_droplet_template", "key$": "droplet_template" } }, "required": ["name", "config", "droplet_template"], "x-ref": "#/components/schemas/autoscale_pool_create", "index$": 1 }, "examples": { "Autoscale Create Request Dynamic Config": { "value": { "name": "my-autoscale-pool", "config": { "min_instances": 1, "max_instances": 5, "target_cpu_utilization": 0.5, "cooldown_minutes": 10 }, "droplet_template": { "name": "example.com", "region": "nyc3", "size": "c-2", "image": "ubuntu-20-04-x64", "ssh_keys": ["3b:16:e4:bf:8b:00:8b:b8:59:8c:a9:d3:f0:19:fa:45"], "backups": true, "ipv6": true, "monitoring": true, "tags": ["env:prod", "web"], "user_data": "#cloud-config\nruncmd:\n  - touch /test.txt\n", "vpc_uuid": "760e09ef-dc84-11e8-981e-3cfdfeaae000" } }, "x-ref": "#/components/examples/autoscale_create_request_dynamic" }, "Autoscale Create Request Static Config": { "value": { "name": "my-autoscale-pool", "config": { "target_number_instances": 2 }, "droplet_template": { "name": "example.com", "region": "nyc3", "size": "c-2", "image": "ubuntu-20-04-x64", "ssh_keys": ["3b:16:e4:bf:8b:00:8b:b8:59:8c:a9:d3:f0:19:fa:45"], "backups": true, "ipv6": true, "monitoring": true, "tags": ["env:prod", "web"], "user_data": "#cloud-config\nruncmd:\n  - touch /test.txt\n", "vpc_uuid": "760e09ef-dc84-11e8-981e-3cfdfeaae000" } }, "x-ref": "#/components/examples/autoscale_create_request_static" } } } } }, "parameters": [] }, "GET /v2/droplets/autoscale/{autoscale_pool_id}/history": { "protocol": "http", "parameters": [{ "in": "query", "name": "per_page", "required": false, "description": "Number of items returned per page", "schema": { "type": "integer", "minimum": 1, "default": 20, "maximum": 200 }, "example": 2, "x-ref": "#/components/parameters/parameters_per_page", "index$": 0 }, { "in": "query", "name": "page", "required": false, "description": "Which 'page' of paginated results to return.", "schema": { "type": "integer", "minimum": 1, "default": 1 }, "example": 1, "x-ref": "#/components/parameters/page", "index$": 1 }, { "in": "path", "name": "autoscale_pool_id", "description": "A unique identifier for an autoscale pool.", "required": true, "schema": { "type": "string" }, "example": "0d3db13e-a604-4944-9827-7ec2642d32ac", "x-ref": "#/components/parameters/autoscale_pool_id", "index$": 2 }] }, "GET /v2/droplets/autoscale/{autoscale_pool_id}/members": { "protocol": "http", "parameters": [{ "in": "query", "name": "per_page", "required": false, "description": "Number of items returned per page", "schema": { "type": "integer", "minimum": 1, "default": 20, "maximum": 200 }, "example": 2, "x-ref": "#/components/parameters/parameters_per_page", "index$": 0 }, { "in": "query", "name": "page", "required": false, "description": "Which 'page' of paginated results to return.", "schema": { "type": "integer", "minimum": 1, "default": 1 }, "example": 1, "x-ref": "#/components/parameters/page", "index$": 1 }, { "in": "path", "name": "autoscale_pool_id", "description": "A unique identifier for an autoscale pool.", "required": true, "schema": { "type": "string" }, "example": "0d3db13e-a604-4944-9827-7ec2642d32ac", "x-ref": "#/components/parameters/autoscale_pool_id", "index$": 2 }] }, "GET /v2/droplets/autoscale": { "protocol": "http", "parameters": [{ "in": "query", "name": "per_page", "required": false, "description": "Number of items returned per page", "schema": { "type": "integer", "minimum": 1, "default": 20, "maximum": 200 }, "example": 2, "x-ref": "#/components/parameters/parameters_per_page", "index$": 0 }, { "in": "query", "name": "page", "required": false, "description": "Which 'page' of paginated results to return.", "schema": { "type": "integer", "minimum": 1, "default": 1 }, "example": 1, "x-ref": "#/components/parameters/page", "index$": 1 }, { "name": "name", "in": "query", "description": "The name of the autoscale pool", "schema": { "type": "string" }, "example": "my-autoscale-pool", "x-ref": "#/components/parameters/autoscale_pool_name", "index$": 2 }] }, "GET /v2/droplets/autoscale/{autoscale_pool_id}": { "protocol": "http", "parameters": [{ "in": "path", "name": "autoscale_pool_id", "description": "A unique identifier for an autoscale pool.", "required": true, "schema": { "type": "string" }, "example": "0d3db13e-a604-4944-9827-7ec2642d32ac", "x-ref": "#/components/parameters/autoscale_pool_id", "index$": 0 }] }, "DELETE /v2/droplets/autoscale/{autoscale_pool_id}/dangerous": { "protocol": "http", "parameters": [{ "in": "path", "name": "autoscale_pool_id", "description": "A unique identifier for an autoscale pool.", "required": true, "schema": { "type": "string" }, "example": "0d3db13e-a604-4944-9827-7ec2642d32ac", "x-ref": "#/components/parameters/autoscale_pool_id", "index$": 0 }, { "in": "header", "name": "X-Dangerous", "description": "Acknowledge this action will destroy the autoscale pool and its associated resources and _can not_ be reversed.", "schema": { "type": "boolean" }, "example": true, "required": true, "x-ref": "#/components/parameters/parameters_x_dangerous", "index$": 1 }] }, "DELETE /v2/droplets/autoscale/{autoscale_pool_id}": { "protocol": "http", "parameters": [{ "in": "path", "name": "autoscale_pool_id", "description": "A unique identifier for an autoscale pool.", "required": true, "schema": { "type": "string" }, "example": "0d3db13e-a604-4944-9827-7ec2642d32ac", "x-ref": "#/components/parameters/autoscale_pool_id", "index$": 0 }] }, "PUT /v2/droplets/autoscale/{autoscale_pool_id}": { "protocol": "http", "requestBody": { "content": { "application/json": { "schema": { "type": "object", "properties": { "name": { "example": "my-autoscale-pool", "type": "string", "description": "The human-readable name of the autoscale pool. This field cannot be updated", "key$": "name" }, "config": { "oneOf": [{ "type": "object", "properties": { "target_number_instances": {} }, "required": ["target_number_instances"], "x-ref": "#/components/schemas/autoscale_pool_static_config" }, { "type": "object", "properties": { "min_instances": {}, "max_instances": {}, "target_cpu_utilization": {}, "target_memory_utilization": {}, "cooldown_minutes": {} }, "required": ["min_instances", "max_instances"], "x-ref": "#/components/schemas/autoscale_pool_dynamic_config" }], "type": "object", "description": "The scaling configuration for an autoscale pool, which is how the pool scales up and down (either by resource utilization or static configuration).", "key$": "config" }, "droplet_template": { "type": "object", "properties": { "name": { "type": "string", "example": "my-droplet-name", "description": "The name(s) to be applied to all Droplets in the autoscale pool." }, "region": { "type": "string", "example": "tor1", "enum": ["nyc1", "nyc2", "nyc3", "ams2", "ams3", "sfo1", "sfo2", "sfo3", "sgp1", "lon1", "fra1", "tor1", "blr1", "syd1"], "description": "The datacenter in which all of the Droplets will be created." }, "size": { "type": "string", "example": "c-2", "description": "The Droplet size to be used for all Droplets in the autoscale pool." }, "image": { "type": "string", "example": "ubuntu-20-04-x64", "description": "The Droplet image to be used for all Droplets in the autoscale pool. You may specify the slug or the image ID." }, "ssh_keys": { "type": "array", "items": { "type": "string" }, "example": ["88:66:90:d2:68:d5:b5:85:e3:26:26:11:31:57:e6:f8"], "description": "The SSH keys to be installed on the Droplets in the autoscale pool. You can either specify the key ID or the fingerprint.\nRequires `ssh_key:read` scope.\n" }, "tags": { "type": "array", "items": { "type": "string" }, "example": ["my-tag"], "description": "The tags to apply to each of the Droplets in the autoscale pool.\nRequires `tag:read` scope.\n" }, "vpc_uuid": { "type": "string", "description": "The VPC where the Droplets in the autoscale pool will be created. The VPC must be in the region where you want to create the Droplets.\nRequires `vpc:read` scope.\n", "example": "760e09ef-dc84-11e8-981e-3cfdfeaae000" }, "with_droplet_agent": { "type": "boolean", "description": "Installs the Droplet agent. This must be set to true to monitor Droplets for resource utilization scaling.", "example": true }, "project_id": { "type": "string", "description": "The project that the Droplets in the autoscale pool will belong to.\nRequires `project:read` scope.\n", "example": "746c6152-2fa2-11ed-92d3-27aaa54e4988" }, "ipv6": { "type": "boolean", "description": "Assigns a unique IPv6 address to each of the Droplets in the autoscale pool.", "example": true }, "user_data": { "type": "string", "example": "#cloud-config\nruncmd:\n  - touch /test.txt\n", "description": "A string containing user data that cloud-init consumes to configure a Droplet on first boot. User data is often a cloud-config file or Bash script. It must be plain text and may not exceed 64 KiB in size." }, "public_networking": { "type": "boolean", "example": true, "default": true, "description": "An optional boolean indicating whether the Droplets should be created with public networking or not. By default, all Droplets are created with public networking available. If explicitly set to `false`, only private networking will be enabled, and public networking will be disabled; currently this means that it will not have any public static or Reserved IPv4 or IPv6 address, nor can one be assigned later. If explicitly set to `false`, `ipv6` must also be `false`." } }, "required": ["region", "image", "size", "ssh_keys"], "x-ref": "#/components/schemas/autoscale_pool_droplet_template", "key$": "droplet_template" } }, "required": ["name", "config", "droplet_template"], "x-ref": "#/components/schemas/autoscale_pool_create", "index$": 1 }, "examples": { "Autoscale Update Request": { "value": { "name": "my-autoscale-pool", "config": { "target_number_instances": 2 }, "droplet_template": { "name": "example.com", "region": "nyc3", "size": "c-2", "image": "ubuntu-20-04-x64", "ssh_keys": ["3b:16:e4:bf:8b:00:8b:b8:59:8c:a9:d3:f0:19:fa:45"], "backups": true, "ipv6": true, "monitoring": true, "tags": ["env:prod", "web"], "user_data": "#cloud-config\nruncmd:\n  - touch /test.txt\n", "vpc_uuid": "760e09ef-dc84-11e8-981e-3cfdfeaae000" } }, "x-ref": "#/components/examples/autoscale_update_request" } } } } }, "parameters": [{ "in": "path", "name": "autoscale_pool_id", "description": "A unique identifier for an autoscale pool.", "required": true, "schema": { "type": "string" }, "example": "0d3db13e-a604-4944-9827-7ec2642d32ac", "x-ref": "#/components/parameters/autoscale_pool_id", "index$": 0 }] } }, { strict: LIVE_STRICT, t });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const droplet_autoscale_pool_ref01_ent = client.DropletAutoscalePool();
        let droplet_autoscale_pool_ref01_data = setup.data.new.droplet_autoscale_pool['droplet_autoscale_pool_ref01'];
        droplet_autoscale_pool_ref01_data['autoscale_pool_id'] = setup.idmap['autoscale_pool01'];
        droplet_autoscale_pool_ref01_data = (await droplet_autoscale_pool_ref01_ent.create(droplet_autoscale_pool_ref01_data)).data();
        (0, node_assert_1.default)(null != droplet_autoscale_pool_ref01_data.id);
        // LIST
        const droplet_autoscale_pool_ref01_match = {};
        const droplet_autoscale_pool_ref01_list = (await droplet_autoscale_pool_ref01_ent.list(droplet_autoscale_pool_ref01_match)).map((e) => e.data());
        (0, node_assert_1.default)(!isempty(select(droplet_autoscale_pool_ref01_list, { id: droplet_autoscale_pool_ref01_data.id })));
        // UPDATE
        const droplet_autoscale_pool_ref01_data_up0 = {};
        droplet_autoscale_pool_ref01_data_up0.id = droplet_autoscale_pool_ref01_data.id;
        const droplet_autoscale_pool_ref01_markdef_up0 = { name: 'created_at', value: 'Mark01-droplet_autoscale_pool_ref01_' + setup.now };
        droplet_autoscale_pool_ref01_data_up0[droplet_autoscale_pool_ref01_markdef_up0.name] = droplet_autoscale_pool_ref01_markdef_up0.value;
        const droplet_autoscale_pool_ref01_resdata_up0 = (await droplet_autoscale_pool_ref01_ent.update(droplet_autoscale_pool_ref01_data_up0)).data();
        (0, node_assert_1.default)(droplet_autoscale_pool_ref01_resdata_up0.id === droplet_autoscale_pool_ref01_data_up0.id);
        (0, node_assert_1.default)(droplet_autoscale_pool_ref01_resdata_up0[droplet_autoscale_pool_ref01_markdef_up0.name] === droplet_autoscale_pool_ref01_markdef_up0.value);
        // LOAD
        const droplet_autoscale_pool_ref01_match_dt0 = {};
        droplet_autoscale_pool_ref01_match_dt0.id = droplet_autoscale_pool_ref01_data.id;
        const droplet_autoscale_pool_ref01_data_dt0 = (await droplet_autoscale_pool_ref01_ent.load(droplet_autoscale_pool_ref01_match_dt0)).data();
        (0, node_assert_1.default)(droplet_autoscale_pool_ref01_data_dt0.id === droplet_autoscale_pool_ref01_data.id);
        // REMOVE
        const droplet_autoscale_pool_ref01_match_rm0 = { id: droplet_autoscale_pool_ref01_data.id };
        await droplet_autoscale_pool_ref01_ent.remove(droplet_autoscale_pool_ref01_match_rm0);
        // LIST
        const droplet_autoscale_pool_ref01_match_rt0 = {};
        const droplet_autoscale_pool_ref01_list_rt0 = (await droplet_autoscale_pool_ref01_ent.list(droplet_autoscale_pool_ref01_match_rt0)).map((e) => e.data());
        (0, node_assert_1.default)(isempty(select(droplet_autoscale_pool_ref01_list_rt0, { id: droplet_autoscale_pool_ref01_data.id })));
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
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/droplet_autoscale_pool/DropletAutoscalePoolTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.DigitaloceanSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['droplet_autoscale_pool01', 'droplet_autoscale_pool02', 'droplet_autoscale_pool03', 'autoscale_pool01'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'DIGITALOCEAN_TEST_DROPLET_AUTOSCALE_POOL_ENTID': idmap,
        'DIGITALOCEAN_TEST_LIVE': 'FALSE',
        'DIGITALOCEAN_TEST_EXPLAIN': 'FALSE',
        'DIGITALOCEAN_APIKEY': '',
    });
    idmap = env['DIGITALOCEAN_TEST_DROPLET_AUTOSCALE_POOL_ENTID'];
    const live = 'TRUE' === env.DIGITALOCEAN_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['DIGITALOCEAN_TEST_DROPLET_AUTOSCALE_POOL_ENTID'];
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
//# sourceMappingURL=DropletAutoscalePoolEntity.test.js.map