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
(0, node_test_1.describe)('DomainRecordEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when DIGITALOCEAN_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('DIGITALOCEAN_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.DigitaloceanSDK.test();
        const ent = testsdk.DomainRecord();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.DigitaloceanSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.DomainRecord().list({ "domain_name": 1 }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.DIGITALOCEAN_TEST_LIVE;
        for (const op of ['create', 'list', 'update', 'load', 'remove']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'domain_record.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "data": { "a": true, "h": "Data", "n": "data", "r": false, "sh": "Variable data depending on record type.", "t": "`$STRING`", "key$": "data", "index$": 0 }, "domain_record": { "a": true, "h": "Domain Record", "n": "domain_record", "r": false, "t": "`$OBJECT`", "key$": "domain_record", "index$": 1 }, "flags": { "a": true, "h": "Flags", "n": "flags", "r": false, "sh": "An unsigned integer between 0-255 used for CAA records.", "t": "`$INTEGER`", "key$": "flags", "index$": 2 }, "id": { "a": true, "h": "Id", "n": "id", "r": false, "ro": true, "sh": "A unique identifier for each domain record.", "t": "`$INTEGER`", "key$": "id", "index$": 3 }, "name": { "a": true, "h": "Name", "n": "name", "r": false, "sh": "The host name, alias, or service being defined by the record.", "t": "`$STRING`", "key$": "name", "index$": 4 }, "port": { "a": true, "h": "Port", "n": "port", "r": false, "sh": "The port for SRV records.", "t": "`$INTEGER`", "key$": "port", "index$": 5 }, "priority": { "a": true, "h": "Priority", "n": "priority", "r": false, "sh": "The priority for SRV and MX records.", "t": "`$INTEGER`", "key$": "priority", "index$": 6 }, "tag": { "a": true, "h": "Tag", "n": "tag", "r": false, "sh": "The parameter tag for CAA records.", "t": "`$STRING`", "key$": "tag", "index$": 7 }, "ttl": { "a": true, "h": "Ttl", "n": "ttl", "r": false, "sh": "This value is the time to live for the record, in seconds.", "t": "`$INTEGER`", "key$": "ttl", "index$": 8 }, "type": { "a": true, "h": "Type", "n": "type", "r": true, "sh": "The type of the DNS record.", "t": "`$STRING`", "key$": "type", "index$": 9 }, "weight": { "a": true, "h": "Weight", "n": "weight", "r": false, "sh": "The weight for SRV records.", "t": "`$INTEGER`", "key$": "weight", "index$": 10 } }, "id": { "field": "id", "name": "id" }, "name": "domain_record", "op": { "create": { "input": "data", "name": "create", "points": [{ "a": true, "co": { "id": "POST /v2/domains/{domain_name}/records", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "ex": "example.com", "k": "param", "n": "domain_name", "or": "domain_name", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "POST", "o": "/v2/domains/{domain_name}/records", "q": { "exist": ["domain_name"] }, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "v2" }, { "lit": "domains" }, { "var": "domain_name" }, { "lit": "records" }], "t": { "req": "`reqdata`", "res": "`body.domain_record`" }, "index$": 0 }], "key$": "create" }, "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /v2/domains/{domain_name}/records", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "ex": "example.com", "k": "param", "n": "domain_name", "or": "domain_name", "r": true, "t": "`$STRING`", "index$": 0 }], "query": [{ "a": true, "ex": "sub.example.com", "k": "query", "n": "name", "or": "name", "r": false, "t": "`$STRING`", "index$": 0 }, { "a": true, "ex": 1, "k": "query", "n": "page", "or": "page", "r": false, "t": "`$INTEGER`", "index$": 1 }, { "a": true, "ex": 2, "k": "query", "n": "per_page", "or": "per_page", "r": false, "t": "`$INTEGER`", "index$": 2 }, { "a": true, "ex": "A", "k": "query", "n": "type", "or": "type", "r": false, "t": "`$STRING`", "index$": 3 }] }, "k": "http", "m": "GET", "o": "/v2/domains/{domain_name}/records", "q": { "exist": ["domain_name"] }, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "v2" }, { "lit": "domains" }, { "var": "domain_name" }, { "lit": "records" }], "t": { "req": "`reqdata`", "res": "`body.domain_records`" }, "index$": 0 }], "key$": "list" }, "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /v2/domains/{domain_name}/records/{domain_record_id}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "ex": "example.com", "k": "param", "n": "domain_name", "or": "domain_name", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "ex": 3352896, "k": "param", "n": "id", "or": "domain_record_id", "r": true, "t": "`$INTEGER`", "index$": 1 }] }, "k": "http", "m": "GET", "o": "/v2/domains/{domain_name}/records/{domain_record_id}", "q": { "exist": ["domain_name", "id"] }, "r": { "param": { "domain_record_id": "id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "v2" }, { "lit": "domains" }, { "var": "domain_name" }, { "lit": "records" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body.domain_record`" }, "index$": 0 }], "key$": "load" }, "patch": { "input": "data", "name": "patch", "points": [{ "a": true, "co": { "id": "PATCH /v2/domains/{domain_name}/records/{domain_record_id}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "ex": "example.com", "k": "param", "n": "domain_name", "or": "domain_name", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "ex": 3352896, "k": "param", "n": "id", "or": "domain_record_id", "r": true, "t": "`$INTEGER`", "index$": 1 }] }, "k": "http", "m": "PATCH", "o": "/v2/domains/{domain_name}/records/{domain_record_id}", "q": { "exist": ["domain_name", "id"] }, "r": { "param": { "domain_record_id": "id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "v2" }, { "lit": "domains" }, { "var": "domain_name" }, { "lit": "records" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body.domain_record`" }, "index$": 0 }], "key$": "patch" }, "remove": { "input": "data", "name": "remove", "points": [{ "a": true, "co": { "id": "DELETE /v2/domains/{domain_name}/records/{domain_record_id}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "ex": "example.com", "k": "param", "n": "domain_name", "or": "domain_name", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "ex": 3352896, "k": "param", "n": "id", "or": "domain_record_id", "r": true, "t": "`$INTEGER`", "index$": 1 }] }, "k": "http", "m": "DELETE", "o": "/v2/domains/{domain_name}/records/{domain_record_id}", "q": { "exist": ["domain_name", "id"] }, "r": { "param": { "domain_record_id": "id" } }, "s": [{ "lit": "v2" }, { "lit": "domains" }, { "var": "domain_name" }, { "lit": "records" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "remove" }, "update": { "input": "data", "name": "update", "points": [{ "a": true, "co": { "id": "PUT /v2/domains/{domain_name}/records/{domain_record_id}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "ex": "example.com", "k": "param", "n": "domain_name", "or": "domain_name", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "ex": 3352896, "k": "param", "n": "id", "or": "domain_record_id", "r": true, "t": "`$INTEGER`", "index$": 1 }] }, "k": "http", "m": "PUT", "o": "/v2/domains/{domain_name}/records/{domain_record_id}", "q": { "exist": ["domain_name", "id"] }, "r": { "param": { "domain_record_id": "id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "v2" }, { "lit": "domains" }, { "var": "domain_name" }, { "lit": "records" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body.domain_record`" }, "index$": 0 }], "key$": "update" } }, "relations": { "ancestors": [["$.main.kit.entity.domain"]] }, "key$": "domain_record", "name__orig": "domain_record", "Name": "DomainRecord", "name_": "domain_record", "name-": "domain-record", "NAME": "DOMAIN_RECORD", "index$": 144 }, { "active": true, "entity": "domain_record", "key$": "BasicDomainRecordFlow", "kind": "basic", "name": "BasicDomainRecordFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "domain_record_ref01" }, "m": { "domain_name": "domain_name01" }, "o": "create", "s": [], "v": [], "index$": 0 }, { "a": true, "d": {}, "i": {}, "m": { "domain_name": "domain_name01" }, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "domain_record_ref01" } }], "index$": 1 }, { "a": true, "d": { "domain_name": "domain_name01" }, "i": { "ref": "domain_record_ref01", "srcdatavar": "domain_record_ref01_data", "suffix": "_up0", "textfield": "data" }, "m": {}, "o": "update", "s": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-domain_record_ref01" } }], "v": [], "index$": 2 }, { "a": true, "d": {}, "i": { "ref": "domain_record_ref01", "srcdatavar": "domain_record_ref01_data", "suffix": "_dt0" }, "m": { "domain_name": "domain_name01", "id": "domain_record01" }, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-domain_record_ref01" } }], "index$": 3 }, { "a": true, "d": {}, "i": { "ref": "domain_record_ref01", "suffix": "_rm0" }, "m": { "domain_name": "domain_name01", "id": "domain_record01" }, "o": "remove", "s": [], "v": [], "index$": 4 }, { "a": true, "d": {}, "i": { "suffix": "_rt0" }, "m": { "domain_name": "domain_name01" }, "o": "list", "s": [], "v": [{ "apply": "ItemNotExists", "def": { "ref": "domain_record_ref01" } }], "index$": 5 }] }, 'DomainRecord', { "POST /v2/domains/{domain_name}/records": { "protocol": "http", "requestBody": { "content": { "application/json": { "schema": { "anyOf": [{ "allOf": [{ "type": "object", "required": ["type"], "properties": { "id": {}, "type": {}, "name": {}, "data": {}, "priority": {}, "port": {}, "ttl": {}, "weight": {}, "flags": {}, "tag": {} }, "x-ref": "#/components/schemas/domain_record" }, { "required": ["type", "name", "data"] }], "x-ref": "#/components/schemas/domain_record_a" }, { "allOf": [{ "type": "object", "required": ["type"], "properties": { "id": {}, "type": {}, "name": {}, "data": {}, "priority": {}, "port": {}, "ttl": {}, "weight": {}, "flags": {}, "tag": {} }, "x-ref": "#/components/schemas/domain_record" }, { "required": ["type", "name", "data"] }], "x-ref": "#/components/schemas/domain_record_aaaa" }, { "allOf": [{ "type": "object", "required": ["type"], "properties": { "id": {}, "type": {}, "name": {}, "data": {}, "priority": {}, "port": {}, "ttl": {}, "weight": {}, "flags": {}, "tag": {} }, "x-ref": "#/components/schemas/domain_record" }, { "required": ["type", "name", "data", "flags", "tag"] }], "x-ref": "#/components/schemas/domain_record_caa" }, { "allOf": [{ "type": "object", "required": ["type"], "properties": { "id": {}, "type": {}, "name": {}, "data": {}, "priority": {}, "port": {}, "ttl": {}, "weight": {}, "flags": {}, "tag": {} }, "x-ref": "#/components/schemas/domain_record" }, { "required": ["type", "name", "data"] }], "x-ref": "#/components/schemas/domain_record_cname" }, { "allOf": [{ "type": "object", "required": ["type"], "properties": { "id": {}, "type": {}, "name": {}, "data": {}, "priority": {}, "port": {}, "ttl": {}, "weight": {}, "flags": {}, "tag": {} }, "x-ref": "#/components/schemas/domain_record" }, { "required": ["type", "data", "priority"] }], "x-ref": "#/components/schemas/domain_record_mx" }, { "allOf": [{ "type": "object", "required": ["type"], "properties": { "id": {}, "type": {}, "name": {}, "data": {}, "priority": {}, "port": {}, "ttl": {}, "weight": {}, "flags": {}, "tag": {} }, "x-ref": "#/components/schemas/domain_record" }, { "required": ["type", "name", "data", "flags", "tag"] }], "x-ref": "#/components/schemas/domain_record_ns" }, { "allOf": [{ "type": "object", "required": ["type"], "properties": { "id": {}, "type": {}, "name": {}, "data": {}, "priority": {}, "port": {}, "ttl": {}, "weight": {}, "flags": {}, "tag": {} }, "x-ref": "#/components/schemas/domain_record" }, { "required": ["type", "ttl"] }], "x-ref": "#/components/schemas/domain_record_soa" }, { "allOf": [{ "type": "object", "required": ["type"], "properties": { "id": {}, "type": {}, "name": {}, "data": {}, "priority": {}, "port": {}, "ttl": {}, "weight": {}, "flags": {}, "tag": {} }, "x-ref": "#/components/schemas/domain_record" }, { "required": ["type", "name", "data", "priority", "port", "flags", "tag"] }], "x-ref": "#/components/schemas/domain_record_srv" }, { "allOf": [{ "type": "object", "required": ["type"], "properties": { "id": {}, "type": {}, "name": {}, "data": {}, "priority": {}, "port": {}, "ttl": {}, "weight": {}, "flags": {}, "tag": {} }, "x-ref": "#/components/schemas/domain_record" }, { "required": ["type", "name", "data", "flags", "tag"] }], "x-ref": "#/components/schemas/domain_record_txt" }], "discriminator": { "propertyName": "type", "mapping": { "A": "#/components/schemas/domain_record_a", "AAAA": "#/components/schemas/domain_record_aaaa", "CAA": "#/components/schemas/domain_record_caa", "CNAME": "#/components/schemas/domain_record_cname", "MX": "#/components/schemas/domain_record_mx", "NS": "#/components/schemas/domain_record_ns", "SOA": "#/components/schemas/domain_record_soa", "SRV": "#/components/schemas/domain_record_srv", "TXT": "#/components/schemas/domain_record_txt" } }, "index$": 1 }, "example": { "type": "A", "name": "www", "data": "162.10.66.0", "priority": null, "port": null, "ttl": 1800, "weight": null, "flags": null, "tag": null } } } }, "parameters": [{ "name": "domain_name", "description": "The name of the domain itself.", "in": "path", "schema": { "type": "string" }, "example": "example.com", "required": true, "x-ref": "#/components/parameters/domain_name", "index$": 0 }] }, "GET /v2/domains/{domain_name}/records": { "protocol": "http", "parameters": [{ "name": "domain_name", "description": "The name of the domain itself.", "in": "path", "schema": { "type": "string" }, "example": "example.com", "required": true, "x-ref": "#/components/parameters/domain_name", "index$": 0 }, { "name": "name", "description": "A fully qualified record name. For example, to only include records matching sub.example.com, send a GET request to `/v2/domains/$DOMAIN_NAME/records?name=sub.example.com`.", "in": "query", "schema": { "type": "string" }, "example": "sub.example.com", "x-ref": "#/components/parameters/domain_name_query", "index$": 1 }, { "name": "type", "description": "The type of the DNS record. For example: A, CNAME, TXT, ...", "in": "query", "schema": { "type": "string", "enum": ["A", "AAAA", "CAA", "CNAME", "MX", "NS", "SOA", "SRV", "TXT"] }, "example": "A", "x-ref": "#/components/parameters/domain_type_query", "index$": 2 }, { "in": "query", "name": "per_page", "required": false, "description": "Number of items returned per page", "schema": { "type": "integer", "minimum": 1, "default": 20, "maximum": 200 }, "example": 2, "x-ref": "#/components/parameters/parameters_per_page", "index$": 3 }, { "in": "query", "name": "page", "required": false, "description": "Which 'page' of paginated results to return.", "schema": { "type": "integer", "minimum": 1, "default": 1 }, "example": 1, "x-ref": "#/components/parameters/page", "index$": 4 }] }, "GET /v2/domains/{domain_name}/records/{domain_record_id}": { "protocol": "http", "parameters": [{ "name": "domain_name", "description": "The name of the domain itself.", "in": "path", "schema": { "type": "string" }, "example": "example.com", "required": true, "x-ref": "#/components/parameters/domain_name", "index$": 0 }, { "name": "domain_record_id", "description": "The unique identifier of the domain record.", "in": "path", "schema": { "type": "integer" }, "example": 3352896, "required": true, "x-ref": "#/components/parameters/domain_record_id", "index$": 1 }] }, "PATCH /v2/domains/{domain_name}/records/{domain_record_id}": { "protocol": "http", "requestBody": { "content": { "application/json": { "schema": { "type": "object", "required": ["type"], "properties": { "id": { "type": "integer", "description": "A unique identifier for each domain record.", "example": 28448429, "readOnly": true, "key$": "id" }, "type": { "type": "string", "description": "The type of the DNS record. For example: A, CNAME, TXT, ...", "example": "NS", "key$": "type" }, "name": { "type": "string", "description": "The host name, alias, or service being defined by the record.", "example": "@", "key$": "name" }, "data": { "type": "string", "description": "Variable data depending on record type. For example, the \"data\" value for an A record would be the IPv4 address to which the domain will be mapped. For a CAA record, it would contain the domain name of the CA being granted permission to issue certificates.", "example": "ns1.digitalocean.com", "key$": "data" }, "priority": { "type": "integer", "description": "The priority for SRV and MX records.", "nullable": true, "example": null, "key$": "priority" }, "port": { "type": "integer", "description": "The port for SRV records.", "nullable": true, "example": null, "key$": "port" }, "ttl": { "type": "integer", "description": "This value is the time to live for the record, in seconds. This defines the time frame that clients can cache queried information before a refresh should be requested.", "example": 1800, "key$": "ttl" }, "weight": { "type": "integer", "description": "The weight for SRV records.", "nullable": true, "example": null, "key$": "weight" }, "flags": { "type": "integer", "description": "An unsigned integer between 0-255 used for CAA records.", "nullable": true, "example": null, "key$": "flags" }, "tag": { "type": "string", "description": "The parameter tag for CAA records. Valid values are \"issue\", \"issuewild\", or \"iodef\"", "nullable": true, "example": null, "key$": "tag" } }, "x-ref": "#/components/schemas/domain_record", "index$": 1 }, "example": { "name": "blog", "type": "A" } } } }, "parameters": [{ "name": "domain_name", "description": "The name of the domain itself.", "in": "path", "schema": { "type": "string" }, "example": "example.com", "required": true, "x-ref": "#/components/parameters/domain_name", "index$": 0 }, { "name": "domain_record_id", "description": "The unique identifier of the domain record.", "in": "path", "schema": { "type": "integer" }, "example": 3352896, "required": true, "x-ref": "#/components/parameters/domain_record_id", "index$": 1 }] }, "DELETE /v2/domains/{domain_name}/records/{domain_record_id}": { "protocol": "http", "parameters": [{ "name": "domain_name", "description": "The name of the domain itself.", "in": "path", "schema": { "type": "string" }, "example": "example.com", "required": true, "x-ref": "#/components/parameters/domain_name", "index$": 0 }, { "name": "domain_record_id", "description": "The unique identifier of the domain record.", "in": "path", "schema": { "type": "integer" }, "example": 3352896, "required": true, "x-ref": "#/components/parameters/domain_record_id", "index$": 1 }] }, "PUT /v2/domains/{domain_name}/records/{domain_record_id}": { "protocol": "http", "requestBody": { "content": { "application/json": { "schema": { "type": "object", "required": ["type"], "properties": { "id": { "type": "integer", "description": "A unique identifier for each domain record.", "example": 28448429, "readOnly": true, "key$": "id" }, "type": { "type": "string", "description": "The type of the DNS record. For example: A, CNAME, TXT, ...", "example": "NS", "key$": "type" }, "name": { "type": "string", "description": "The host name, alias, or service being defined by the record.", "example": "@", "key$": "name" }, "data": { "type": "string", "description": "Variable data depending on record type. For example, the \"data\" value for an A record would be the IPv4 address to which the domain will be mapped. For a CAA record, it would contain the domain name of the CA being granted permission to issue certificates.", "example": "ns1.digitalocean.com", "key$": "data" }, "priority": { "type": "integer", "description": "The priority for SRV and MX records.", "nullable": true, "example": null, "key$": "priority" }, "port": { "type": "integer", "description": "The port for SRV records.", "nullable": true, "example": null, "key$": "port" }, "ttl": { "type": "integer", "description": "This value is the time to live for the record, in seconds. This defines the time frame that clients can cache queried information before a refresh should be requested.", "example": 1800, "key$": "ttl" }, "weight": { "type": "integer", "description": "The weight for SRV records.", "nullable": true, "example": null, "key$": "weight" }, "flags": { "type": "integer", "description": "An unsigned integer between 0-255 used for CAA records.", "nullable": true, "example": null, "key$": "flags" }, "tag": { "type": "string", "description": "The parameter tag for CAA records. Valid values are \"issue\", \"issuewild\", or \"iodef\"", "nullable": true, "example": null, "key$": "tag" } }, "x-ref": "#/components/schemas/domain_record", "index$": 1 }, "example": { "name": "blog", "type": "CNAME" } } } }, "parameters": [{ "name": "domain_name", "description": "The name of the domain itself.", "in": "path", "schema": { "type": "string" }, "example": "example.com", "required": true, "x-ref": "#/components/parameters/domain_name", "index$": 0 }, { "name": "domain_record_id", "description": "The unique identifier of the domain record.", "in": "path", "schema": { "type": "integer" }, "example": 3352896, "required": true, "x-ref": "#/components/parameters/domain_record_id", "index$": 1 }] } }, { strict: LIVE_STRICT, t });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const domain_record_ref01_ent = client.DomainRecord();
        let domain_record_ref01_data = setup.data.new.domain_record['domain_record_ref01'];
        domain_record_ref01_data['domain_name'] = setup.idmap['domain_name01'];
        domain_record_ref01_data = (await domain_record_ref01_ent.create(domain_record_ref01_data)).data();
        (0, node_assert_1.default)(null != domain_record_ref01_data.id);
        // LIST
        const domain_record_ref01_match = {};
        domain_record_ref01_match['domain_name'] = setup.idmap['domain_name01'];
        const domain_record_ref01_list = (await domain_record_ref01_ent.list(domain_record_ref01_match)).map((e) => e.data());
        (0, node_assert_1.default)(!isempty(select(domain_record_ref01_list, { id: domain_record_ref01_data.id })));
        // UPDATE
        const domain_record_ref01_data_up0 = {};
        domain_record_ref01_data_up0.id = domain_record_ref01_data.id;
        domain_record_ref01_data_up0['domain_name'] = setup.idmap['domain_name'];
        const domain_record_ref01_markdef_up0 = { name: 'data', value: 'Mark01-domain_record_ref01_' + setup.now };
        domain_record_ref01_data_up0[domain_record_ref01_markdef_up0.name] = domain_record_ref01_markdef_up0.value;
        const domain_record_ref01_resdata_up0 = (await domain_record_ref01_ent.update(domain_record_ref01_data_up0)).data();
        (0, node_assert_1.default)(domain_record_ref01_resdata_up0.id === domain_record_ref01_data_up0.id);
        (0, node_assert_1.default)(domain_record_ref01_resdata_up0[domain_record_ref01_markdef_up0.name] === domain_record_ref01_markdef_up0.value);
        // LOAD
        const domain_record_ref01_match_dt0 = {};
        domain_record_ref01_match_dt0.id = domain_record_ref01_data.id;
        const domain_record_ref01_data_dt0 = (await domain_record_ref01_ent.load(domain_record_ref01_match_dt0)).data();
        (0, node_assert_1.default)(domain_record_ref01_data_dt0.id === domain_record_ref01_data.id);
        // REMOVE
        const domain_record_ref01_match_rm0 = { id: domain_record_ref01_data.id };
        await domain_record_ref01_ent.remove(domain_record_ref01_match_rm0);
        // LIST
        const domain_record_ref01_match_rt0 = {};
        domain_record_ref01_match_rt0['domain_name'] = setup.idmap['domain_name01'];
        const domain_record_ref01_list_rt0 = (await domain_record_ref01_ent.list(domain_record_ref01_match_rt0)).map((e) => e.data());
        (0, node_assert_1.default)(isempty(select(domain_record_ref01_list_rt0, { id: domain_record_ref01_data.id })));
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
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/domain_record/DomainRecordTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.DigitaloceanSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['domain_record01', 'domain_record02', 'domain_record03', 'domain01', 'domain02', 'domain03', 'domain_name01'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'DIGITALOCEAN_TEST_DOMAIN_RECORD_ENTID': idmap,
        'DIGITALOCEAN_TEST_LIVE': 'FALSE',
        'DIGITALOCEAN_TEST_EXPLAIN': 'FALSE',
        'DIGITALOCEAN_APIKEY': '',
    });
    idmap = env['DIGITALOCEAN_TEST_DOMAIN_RECORD_ENTID'];
    const live = 'TRUE' === env.DIGITALOCEAN_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['DIGITALOCEAN_TEST_DOMAIN_RECORD_ENTID'];
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
//# sourceMappingURL=DomainRecordEntity.test.js.map