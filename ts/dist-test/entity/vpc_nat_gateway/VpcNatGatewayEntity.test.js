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
(0, node_test_1.describe)('VpcNatGatewayEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when DIGITALOCEAN_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('DIGITALOCEAN_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.DigitaloceanSDK.test();
        const ent = testsdk.VpcNatGateway();
        (0, node_assert_1.default)(null != ent);
    });
    class FailHook extends __1.BaseFeature {
        name = 'failhook';
        version = '0.0.1';
        active = true;
        unexpected = 0;
        init() { }
        PreSpec() { throw new Error('vpc_nat_gateway hook failed'); }
        PreUnexpected() { this.unexpected++; }
    }
    (0, node_test_1.test)('stream-error', async () => {
        const offline = { net: { offline: true } };
        await node_assert_1.default.rejects(async () => {
            for await (const _item of __1.DigitaloceanSDK.test(offline).VpcNatGateway().stream('list')) { }
        }, /offline/);
        for await (const _item of __1.DigitaloceanSDK.test(offline).VpcNatGateway()
            .stream('list', undefined, { ctrl: { throw: false } })) { }
        if (null != __1.config.feature?.rbac) {
            const denied = __1.DigitaloceanSDK.test(undefined, { feature: { rbac: { active: true, deny: true } } });
            await node_assert_1.default.rejects(async () => {
                for await (const _item of denied.VpcNatGateway().stream('list')) { }
            }, (err) => 'rbac_denied' === err.code);
        }
    });
    (0, node_test_1.test)('stream-ctrl', async () => {
        const explain = {};
        const ctrl = { explain };
        for await (const _item of __1.DigitaloceanSDK.test().VpcNatGateway().stream('list', undefined, { ctrl })) { }
        node_assert_1.default.deepStrictEqual(Object.keys(ctrl), ['explain']);
        (0, node_assert_1.default)(explain === ctrl.explain && 0 < Object.keys(explain).length);
    });
    (0, node_test_1.test)('unexpected', async () => {
        const hook = new FailHook();
        const client = new __1.DigitaloceanSDK({ feature: { test: { active: true } }, extend: [hook] });
        await node_assert_1.default.rejects(client.VpcNatGateway().list(), /hook failed/);
        (0, node_assert_1.default)(0 < hook.unexpected);
        const fired = hook.unexpected;
        node_assert_1.default.strictEqual(await client.VpcNatGateway().list(undefined, { throw: false }), undefined);
        (0, node_assert_1.default)(fired < hook.unexpected);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.DigitaloceanSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.VpcNatGateway().list({ "name": 1 }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.DIGITALOCEAN_TEST_LIVE;
        for (const op of ['create', 'list', 'update', 'load', 'remove']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'vpc_nat_gateway.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "created_at": { "a": true, "fo": "date-time", "h": "Created At", "n": "created_at", "r": false, "sh": "A time value given in ISO8601 combined date and time format that represents when the VPC NAT gateway was created.", "t": "`$STRING`", "key$": "created_at", "index$": 0 }, "egresses": { "a": true, "h": "Egresses", "n": "egresses", "r": false, "sh": "An object containing egress information for the VPC NAT gateway.", "t": "`$OBJECT`", "key$": "egresses", "index$": 1 }, "icmp_timeout_seconds": { "a": true, "h": "Icmp Timeout Seconds", "n": "icmp_timeout_seconds", "r": false, "sh": "The ICMP timeout in seconds for the VPC NAT gateway.", "t": "`$INTEGER`", "key$": "icmp_timeout_seconds", "index$": 2 }, "id": { "a": true, "h": "Id", "n": "id", "r": false, "sh": "The unique identifier for the VPC NAT gateway.", "t": "`$STRING`", "key$": "id", "index$": 3 }, "name": { "a": true, "h": "Name", "n": "name", "op": { "create": { "req": true, "type": "`$STRING`" }, "update": { "req": true, "type": "`$STRING`" } }, "r": false, "sh": "The human-readable name of the VPC NAT gateway.", "t": "`$STRING`", "key$": "name", "index$": 4 }, "region": { "a": true, "h": "Region", "n": "region", "op": { "create": { "req": true, "type": "`$STRING`" } }, "r": false, "sh": "The region in which the VPC NAT gateway is created.", "t": "`$STRING`", "key$": "region", "index$": 5 }, "size": { "a": true, "h": "Size", "n": "size", "op": { "create": { "req": true, "type": "`$INTEGER`" }, "update": { "req": true, "type": "`$INTEGER`" } }, "r": false, "sh": "The size of the VPC NAT gateway.", "t": "`$INTEGER`", "key$": "size", "index$": 6 }, "state": { "a": true, "h": "State", "n": "state", "r": false, "sh": "The current state of the VPC NAT gateway.", "t": "`$STRING`", "key$": "state", "index$": 7 }, "tcp_timeout_seconds": { "a": true, "h": "Tcp Timeout Seconds", "n": "tcp_timeout_seconds", "r": false, "sh": "The TCP timeout in seconds for the VPC NAT gateway.", "t": "`$INTEGER`", "key$": "tcp_timeout_seconds", "index$": 8 }, "type": { "a": true, "h": "Type", "n": "type", "op": { "create": { "req": true, "type": "`$STRING`" } }, "r": false, "sh": "The type of the VPC NAT gateway.", "t": "`$STRING`", "key$": "type", "index$": 9 }, "udp_timeout_seconds": { "a": true, "h": "Udp Timeout Seconds", "n": "udp_timeout_seconds", "r": false, "sh": "The UDP timeout in seconds for the VPC NAT gateway.", "t": "`$INTEGER`", "key$": "udp_timeout_seconds", "index$": 10 }, "updated_at": { "a": true, "fo": "date-time", "h": "Updated At", "n": "updated_at", "r": false, "sh": "A time value given in ISO8601 combined date and time format that represents when the VPC NAT gateway was last updated.", "t": "`$STRING`", "key$": "updated_at", "index$": 11 }, "vpcs": { "a": true, "h": "Vpcs", "n": "vpcs", "op": { "create": { "req": true, "type": "`$ARRAY`" } }, "r": false, "sh": "An array of VPCs associated with the VPC NAT gateway.", "t": "`$ARRAY`", "key$": "vpcs", "index$": 12 } }, "id": { "field": "id", "name": "id" }, "name": "vpc_nat_gateway", "op": { "create": { "input": "data", "name": "create", "points": [{ "a": true, "co": { "id": "POST /v2/vpc_nat_gateways", "source": "openapi3", "version": 2 }, "g": {}, "k": "http", "m": "POST", "o": "/v2/vpc_nat_gateways", "q": {}, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "v2" }, { "lit": "vpc_nat_gateways" }], "t": { "req": "`reqdata`", "res": "`body.vpc_nat_gateway`" }, "index$": 0 }], "key$": "create" }, "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /v2/vpc_nat_gateways", "source": "openapi3", "version": 2 }, "g": { "query": [{ "a": true, "ex": "my-vpc-nat-gateway", "k": "query", "n": "name", "or": "name", "r": false, "t": "`$STRING`", "index$": 0 }, { "a": true, "ex": 1, "k": "query", "n": "page", "or": "page", "r": false, "t": "`$INTEGER`", "index$": 1 }, { "a": true, "ex": 2, "k": "query", "n": "per_page", "or": "per_page", "r": false, "t": "`$INTEGER`", "index$": 2 }, { "a": true, "ex": "tor1", "k": "query", "n": "region", "or": "region", "r": false, "t": "`$STRING`", "index$": 3 }, { "a": true, "ex": "active", "k": "query", "n": "state", "or": "state", "r": false, "t": "`$STRING`", "index$": 4 }, { "a": true, "ex": "public", "k": "query", "n": "type", "or": "type", "r": false, "t": "`$STRING`", "index$": 5 }] }, "k": "http", "m": "GET", "o": "/v2/vpc_nat_gateways", "q": {}, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "v2" }, { "lit": "vpc_nat_gateways" }], "t": { "req": "`reqdata`", "res": "`body.vpc_nat_gateways`" }, "index$": 0 }], "key$": "list" }, "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /v2/vpc_nat_gateways/{id}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "ex": "70e1b58d-cdec-4e95-b3ee-2d4d95feff51", "k": "param", "n": "id", "or": "id", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/v2/vpc_nat_gateways/{id}", "q": { "exist": ["id"] }, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "v2" }, { "lit": "vpc_nat_gateways" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body.vpc_nat_gateway`" }, "index$": 0 }], "key$": "load" }, "remove": { "input": "data", "name": "remove", "points": [{ "a": true, "co": { "id": "DELETE /v2/vpc_nat_gateways/{id}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "ex": "70e1b58d-cdec-4e95-b3ee-2d4d95feff51", "k": "param", "n": "id", "or": "id", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "DELETE", "o": "/v2/vpc_nat_gateways/{id}", "q": { "exist": ["id"] }, "r": {}, "s": [{ "lit": "v2" }, { "lit": "vpc_nat_gateways" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "remove" }, "update": { "input": "data", "name": "update", "points": [{ "a": true, "co": { "id": "PUT /v2/vpc_nat_gateways/{id}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "ex": "70e1b58d-cdec-4e95-b3ee-2d4d95feff51", "k": "param", "n": "id", "or": "id", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "PUT", "o": "/v2/vpc_nat_gateways/{id}", "q": { "exist": ["id"] }, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "v2" }, { "lit": "vpc_nat_gateways" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body.vpc_nat_gateway`" }, "index$": 0 }], "key$": "update" } }, "relations": { "ancestors": [] }, "key$": "vpc_nat_gateway", "name__orig": "vpc_nat_gateway", "Name": "VpcNatGateway", "name_": "vpc_nat_gateway", "name-": "vpc-nat-gateway", "NAME": "VPC_NAT_GATEWAY", "index$": 222 }, { "active": true, "entity": "vpc_nat_gateway", "key$": "BasicVpcNatGatewayFlow", "kind": "basic", "name": "BasicVpcNatGatewayFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "vpc_nat_gateway_ref01" }, "m": {}, "o": "create", "s": [], "v": [], "index$": 0 }, { "a": true, "d": {}, "i": {}, "m": {}, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "vpc_nat_gateway_ref01" } }], "index$": 1 }, { "a": true, "d": {}, "i": { "ref": "vpc_nat_gateway_ref01", "srcdatavar": "vpc_nat_gateway_ref01_data", "suffix": "_up0", "textfield": "created_at" }, "m": {}, "o": "update", "s": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-vpc_nat_gateway_ref01" } }], "v": [], "index$": 2 }, { "a": true, "d": {}, "i": { "ref": "vpc_nat_gateway_ref01", "srcdatavar": "vpc_nat_gateway_ref01_data", "suffix": "_dt0" }, "m": { "id": "vpc_nat_gateway01" }, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-vpc_nat_gateway_ref01" } }], "index$": 3 }, { "a": true, "d": {}, "i": { "ref": "vpc_nat_gateway_ref01", "suffix": "_rm0" }, "m": { "id": "vpc_nat_gateway01" }, "o": "remove", "s": [], "v": [], "index$": 4 }, { "a": true, "d": {}, "i": { "suffix": "_rt0" }, "m": {}, "o": "list", "s": [], "v": [{ "apply": "ItemNotExists", "def": { "ref": "vpc_nat_gateway_ref01" } }], "index$": 5 }] }, 'VpcNatGateway', { "POST /v2/vpc_nat_gateways": { "protocol": "http", "requestBody": { "content": { "application/json": { "schema": { "type": "object", "properties": { "name": { "type": "string", "example": "my-vpc-nat-gateway", "description": "The human-readable name of the VPC NAT gateway.", "key$": "name" }, "type": { "type": "string", "enum": ["PUBLIC"], "example": "PUBLIC", "description": "The type of the VPC NAT gateway.", "key$": "type" }, "region": { "type": "string", "enum": ["nyc1", "nyc2", "nyc3", "ams2", "ams3", "sfo1", "sfo2", "sfo3", "sgp1", "lon1", "fra1", "tor1", "blr1", "syd1", "atl1"], "example": "tor1", "description": "The region in which the VPC NAT gateway is created.", "key$": "region" }, "size": { "type": "integer", "example": 1, "description": "The size of the VPC NAT gateway.", "key$": "size" }, "vpcs": { "type": "array", "items": { "type": "object", "properties": { "vpc_uuid": { "type": "string", "format": "uuid", "example": "0d3db13e-a604-4944-9827-7ec2642d32ac", "description": "The unique identifier of the VPC to which the NAT gateway is attached." }, "subnet_uuid": { "type": "string", "format": "uuid", "example": "cbd79771-23eb-49be-b5ea-59cc56222622", "description": "The unique identifier of the VPC subnet to which the NAT gateway is attached." }, "default_gateway": { "type": "boolean", "example": true, "description": "The classification of the NAT gateway as the default egress route for the VPC traffic." } }, "required": ["vpc_uuid"] }, "description": "An array of VPCs associated with the VPC NAT gateway.", "key$": "vpcs" }, "udp_timeout_seconds": { "type": "integer", "example": 30, "description": "The UDP timeout in seconds for the VPC NAT gateway.", "key$": "udp_timeout_seconds" }, "icmp_timeout_seconds": { "type": "integer", "example": 30, "description": "The ICMP timeout in seconds for the VPC NAT gateway.", "key$": "icmp_timeout_seconds" }, "tcp_timeout_seconds": { "type": "integer", "example": 30, "description": "The TCP timeout in seconds for the VPC NAT gateway.", "key$": "tcp_timeout_seconds" }, "egresses": { "type": "object", "description": "An optional object specifying the public egress IP address to assign to the VPC NAT gateway. Provide this only to use a specific address. If omitted, DigitalOcean allocates a public IP address automatically.", "properties": { "public_gateways": { "type": "array", "description": "An array containing a single public gateway object that sets the gateway's public egress IP address.", "items": { "type": "object", "description": "Specify the address using either `ip` or `ipv4`. Both fields accept the same value and `ip` takes precedence if both are provided. The assigned address is returned in the `ipv4` field of GET and list responses.", "properties": {} } } }, "key$": "egresses" } }, "required": ["name", "type", "region", "size", "vpcs"], "x-ref": "#/components/schemas/vpc_nat_gateway_create", "index$": 1 }, "examples": { "VPC NAT Gateway Create Request": { "value": { "name": "test-vpc-nat-gateways", "type": "PUBLIC", "region": "tor1", "size": 1, "vpcs": [{ "vpc_uuid": "0eb1752f-807b-4562-a077-8018e13ab1fb", "subnet_uuid": "cbd79771-23eb-49be-b5ea-59cc56222622", "default_gateway": true }], "udp_timeout_seconds": 30, "icmp_timeout_seconds": 30, "tcp_timeout_seconds": 30, "project_id": "9cc10173-e9ea-4176-9dbc-a4cee4c4ff30" }, "x-ref": "#/components/examples/vpc_nat_gateway_create_request" } } } } }, "parameters": [] }, "GET /v2/vpc_nat_gateways": { "protocol": "http", "parameters": [{ "in": "query", "name": "per_page", "required": false, "description": "Number of items returned per page", "schema": { "type": "integer", "minimum": 1, "default": 20, "maximum": 200 }, "example": 2, "x-ref": "#/components/parameters/parameters_per_page", "index$": 0 }, { "in": "query", "name": "page", "required": false, "description": "Which 'page' of paginated results to return.", "schema": { "type": "integer", "minimum": 1, "default": 1 }, "example": 1, "x-ref": "#/components/parameters/page", "index$": 1 }, { "in": "query", "name": "state", "description": "The current state of the VPC NAT gateway.", "schema": { "type": "string", "enum": ["new", "provisioning", "active", "deleting", "error", "invalid"] }, "example": "active", "x-ref": "#/components/parameters/vpc_nat_gateway_state", "index$": 2 }, { "in": "query", "name": "region", "description": "The region where the VPC NAT gateway is located.", "schema": { "type": "string", "enum": ["nyc1", "nyc2", "nyc3", "ams2", "ams3", "sfo1", "sfo2", "sfo3", "sgp1", "lon1", "fra1", "tor1", "blr1", "syd1", "atl1"] }, "example": "tor1", "x-ref": "#/components/parameters/vpc_nat_gateway_region", "index$": 3 }, { "in": "query", "name": "type", "description": "The type of the VPC NAT gateway.", "schema": { "type": "string", "enum": ["public"] }, "example": "public", "x-ref": "#/components/parameters/vpc_nat_gateway_type", "index$": 4 }, { "in": "query", "name": "name", "description": "The name of the VPC NAT gateway.", "schema": { "type": "string" }, "example": "my-vpc-nat-gateway", "x-ref": "#/components/parameters/vpc_nat_gateway_name", "index$": 5 }] }, "GET /v2/vpc_nat_gateways/{id}": { "protocol": "http", "parameters": [{ "in": "path", "name": "id", "description": "The unique identifier of the VPC NAT gateway.", "required": true, "schema": { "type": "string" }, "example": "70e1b58d-cdec-4e95-b3ee-2d4d95feff51", "x-ref": "#/components/parameters/vpc_nat_gateway_id", "index$": 0 }] }, "DELETE /v2/vpc_nat_gateways/{id}": { "protocol": "http", "parameters": [{ "in": "path", "name": "id", "description": "The unique identifier of the VPC NAT gateway.", "required": true, "schema": { "type": "string" }, "example": "70e1b58d-cdec-4e95-b3ee-2d4d95feff51", "x-ref": "#/components/parameters/vpc_nat_gateway_id", "index$": 0 }] }, "PUT /v2/vpc_nat_gateways/{id}": { "protocol": "http", "requestBody": { "content": { "application/json": { "schema": { "type": "object", "properties": { "name": { "type": "string", "example": "my-vpc-nat-gateway", "description": "The human-readable name of the VPC NAT gateway.", "key$": "name" }, "size": { "type": "integer", "example": 1, "description": "The size of the VPC NAT gateway.", "key$": "size" }, "vpcs": { "type": "array", "items": { "type": "object", "properties": { "vpc_uuid": { "type": "string", "format": "uuid", "example": "0d3db13e-a604-4944-9827-7ec2642d32ac", "description": "The unique identifier of the VPC to which the NAT gateway is attached." }, "subnet_uuid": { "type": "string", "format": "uuid", "example": "cbd79771-23eb-49be-b5ea-59cc56222622", "description": "The unique identifier of the VPC subnet to which the NAT gateway is attached." }, "default_gateway": { "type": "boolean", "example": false, "description": "The classification of the NAT gateway as the default egress route for the VPC traffic." } } }, "description": "An array of VPCs associated with the VPC NAT gateway.", "key$": "vpcs" }, "udp_timeout_seconds": { "type": "integer", "example": 30, "description": "The UDP timeout in seconds for the VPC NAT gateway.", "key$": "udp_timeout_seconds" }, "icmp_timeout_seconds": { "type": "integer", "example": 30, "description": "The ICMP timeout in seconds for the VPC NAT gateway.", "key$": "icmp_timeout_seconds" }, "tcp_timeout_seconds": { "type": "integer", "example": 30, "description": "The TCP timeout in seconds for the VPC NAT gateway.", "key$": "tcp_timeout_seconds" } }, "required": ["name", "size"], "x-ref": "#/components/schemas/vpc_nat_gateway_update", "index$": 1 }, "examples": { "VPC NAT Gateway Update Request": { "value": { "name": "test-vpc-nat-gateways-updated", "size": 2, "vpcs": [{ "vpc_uuid": "0eb1752f-807b-4562-a077-8018e13ab1fb", "default_gateway": false }], "udp_timeout_seconds": 60, "icmp_timeout_seconds": 60, "tcp_timeout_seconds": 60 }, "x-ref": "#/components/examples/vpc_nat_gateway_update_request" } } } } }, "parameters": [{ "in": "path", "name": "id", "description": "The unique identifier of the VPC NAT gateway.", "required": true, "schema": { "type": "string" }, "example": "70e1b58d-cdec-4e95-b3ee-2d4d95feff51", "x-ref": "#/components/parameters/vpc_nat_gateway_id", "index$": 0 }] } }, { strict: LIVE_STRICT, t });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const vpc_nat_gateway_ref01_ent = client.VpcNatGateway();
        let vpc_nat_gateway_ref01_data = setup.data.new.vpc_nat_gateway['vpc_nat_gateway_ref01'];
        vpc_nat_gateway_ref01_data = (await vpc_nat_gateway_ref01_ent.create(vpc_nat_gateway_ref01_data)).data();
        (0, node_assert_1.default)(null != vpc_nat_gateway_ref01_data.id);
        // LIST
        const vpc_nat_gateway_ref01_match = {};
        const vpc_nat_gateway_ref01_list = (await vpc_nat_gateway_ref01_ent.list(vpc_nat_gateway_ref01_match)).map((e) => e.data());
        (0, node_assert_1.default)(!isempty(select(vpc_nat_gateway_ref01_list, { id: vpc_nat_gateway_ref01_data.id })));
        // UPDATE
        const vpc_nat_gateway_ref01_data_up0 = {};
        vpc_nat_gateway_ref01_data_up0.id = vpc_nat_gateway_ref01_data.id;
        const vpc_nat_gateway_ref01_markdef_up0 = { name: 'created_at', value: 'Mark01-vpc_nat_gateway_ref01_' + setup.now };
        vpc_nat_gateway_ref01_data_up0[vpc_nat_gateway_ref01_markdef_up0.name] = vpc_nat_gateway_ref01_markdef_up0.value;
        const vpc_nat_gateway_ref01_resdata_up0 = (await vpc_nat_gateway_ref01_ent.update(vpc_nat_gateway_ref01_data_up0)).data();
        (0, node_assert_1.default)(vpc_nat_gateway_ref01_resdata_up0.id === vpc_nat_gateway_ref01_data_up0.id);
        (0, node_assert_1.default)(vpc_nat_gateway_ref01_resdata_up0[vpc_nat_gateway_ref01_markdef_up0.name] === vpc_nat_gateway_ref01_markdef_up0.value);
        // LOAD
        const vpc_nat_gateway_ref01_match_dt0 = {};
        vpc_nat_gateway_ref01_match_dt0.id = vpc_nat_gateway_ref01_data.id;
        const vpc_nat_gateway_ref01_data_dt0 = (await vpc_nat_gateway_ref01_ent.load(vpc_nat_gateway_ref01_match_dt0)).data();
        (0, node_assert_1.default)(vpc_nat_gateway_ref01_data_dt0.id === vpc_nat_gateway_ref01_data.id);
        // REMOVE
        const vpc_nat_gateway_ref01_match_rm0 = { id: vpc_nat_gateway_ref01_data.id };
        await vpc_nat_gateway_ref01_ent.remove(vpc_nat_gateway_ref01_match_rm0);
        // LIST
        const vpc_nat_gateway_ref01_match_rt0 = {};
        const vpc_nat_gateway_ref01_list_rt0 = (await vpc_nat_gateway_ref01_ent.list(vpc_nat_gateway_ref01_match_rt0)).map((e) => e.data());
        (0, node_assert_1.default)(isempty(select(vpc_nat_gateway_ref01_list_rt0, { id: vpc_nat_gateway_ref01_data.id })));
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
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/vpc_nat_gateway/VpcNatGatewayTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.DigitaloceanSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['vpc_nat_gateway01', 'vpc_nat_gateway02', 'vpc_nat_gateway03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'DIGITALOCEAN_TEST_VPC_NAT_GATEWAY_ENTID': idmap,
        'DIGITALOCEAN_TEST_LIVE': 'FALSE',
        'DIGITALOCEAN_TEST_EXPLAIN': 'FALSE',
        'DIGITALOCEAN_APIKEY': '',
    });
    idmap = env['DIGITALOCEAN_TEST_VPC_NAT_GATEWAY_ENTID'];
    const live = 'TRUE' === env.DIGITALOCEAN_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['DIGITALOCEAN_TEST_VPC_NAT_GATEWAY_ENTID'];
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
//# sourceMappingURL=VpcNatGatewayEntity.test.js.map