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
(0, node_test_1.describe)('CdnEndpointEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when DIGITALOCEAN_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('DIGITALOCEAN_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.DigitaloceanSDK.test();
        const ent = testsdk.CdnEndpoint();
        (0, node_assert_1.default)(null != ent);
    });
    class FailHook extends __1.BaseFeature {
        name = 'failhook';
        version = '0.0.1';
        active = true;
        unexpected = 0;
        init() { }
        PreSpec() { throw new Error('cdn_endpoint hook failed'); }
        PreUnexpected() { this.unexpected++; }
    }
    (0, node_test_1.test)('stream-error', async () => {
        const offline = { net: { offline: true } };
        await node_assert_1.default.rejects(async () => {
            for await (const _item of __1.DigitaloceanSDK.test(offline).CdnEndpoint().stream('list')) { }
        }, /offline/);
        for await (const _item of __1.DigitaloceanSDK.test(offline).CdnEndpoint()
            .stream('list', undefined, { ctrl: { throw: false } })) { }
        if (null != __1.config.feature?.rbac) {
            const denied = __1.DigitaloceanSDK.test(undefined, { feature: { rbac: { active: true, deny: true } } });
            await node_assert_1.default.rejects(async () => {
                for await (const _item of denied.CdnEndpoint().stream('list')) { }
            }, (err) => 'rbac_denied' === err.code);
        }
    });
    (0, node_test_1.test)('stream-ctrl', async () => {
        const explain = {};
        const ctrl = { explain };
        for await (const _item of __1.DigitaloceanSDK.test().CdnEndpoint().stream('list', undefined, { ctrl })) { }
        node_assert_1.default.deepStrictEqual(Object.keys(ctrl), ['explain']);
        (0, node_assert_1.default)(explain === ctrl.explain && 0 < Object.keys(explain).length);
    });
    (0, node_test_1.test)('unexpected', async () => {
        const hook = new FailHook();
        const client = new __1.DigitaloceanSDK({ feature: { test: { active: true } }, extend: [hook] });
        await node_assert_1.default.rejects(client.CdnEndpoint().list(), /hook failed/);
        (0, node_assert_1.default)(0 < hook.unexpected);
        const fired = hook.unexpected;
        node_assert_1.default.strictEqual(await client.CdnEndpoint().list(undefined, { throw: false }), undefined);
        (0, node_assert_1.default)(fired < hook.unexpected);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.DigitaloceanSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.CdnEndpoint().list({ "page": "x" }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.DIGITALOCEAN_TEST_LIVE;
        for (const op of ['create', 'list', 'update', 'load', 'remove']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'cdn_endpoint.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "certificate_id": { "a": true, "fo": "uuid", "h": "Certificate Id", "n": "certificate_id", "r": false, "sh": "The ID of a DigitalOcean managed TLS certificate used for SSL when a custom subdomain is provided.", "t": "`$STRING`", "key$": "certificate_id", "index$": 0 }, "created_at": { "a": true, "fo": "date-time", "h": "Created At", "n": "created_at", "r": false, "ro": true, "sh": "A time value given in ISO8601 combined date and time format that represents when the CDN endpoint was created.", "t": "`$STRING`", "key$": "created_at", "index$": 1 }, "custom_domain": { "a": true, "fo": "hostname", "h": "Custom Domain", "n": "custom_domain", "r": false, "sh": "The fully qualified domain name (FQDN) of the custom subdomain used with the CDN endpoint.", "t": "`$STRING`", "key$": "custom_domain", "index$": 2 }, "endpoint": { "a": true, "fo": "hostname", "h": "Endpoint", "n": "endpoint", "r": false, "ro": true, "sh": "The fully qualified domain name (FQDN) from which the CDN-backed content is served.", "t": "`$STRING`", "key$": "endpoint", "index$": 3 }, "id": { "a": true, "fo": "uuid", "h": "Id", "n": "id", "r": false, "ro": true, "sh": "A unique ID that can be used to identify and reference a CDN endpoint.", "t": "`$STRING`", "key$": "id", "index$": 4 }, "origin": { "a": true, "fo": "hostname", "h": "Origin", "n": "origin", "r": true, "sh": "The fully qualified domain name (FQDN) for the origin server which provides the content for the CDN.", "t": "`$STRING`", "key$": "origin", "index$": 5 }, "ttl": { "a": true, "h": "Ttl", "n": "ttl", "r": false, "sh": "The amount of time the content is cached by the CDN's edge servers in seconds.", "t": "`$INTEGER`", "key$": "ttl", "index$": 6 } }, "id": { "field": "id", "name": "id" }, "name": "cdn_endpoint", "op": { "create": { "input": "data", "name": "create", "points": [{ "a": true, "co": { "id": "POST /v2/cdn/endpoints", "source": "openapi3", "version": 2 }, "g": {}, "k": "http", "m": "POST", "o": "/v2/cdn/endpoints", "q": {}, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "v2" }, { "lit": "cdn" }, { "lit": "endpoints" }], "t": { "req": "`reqdata`", "res": "`body.endpoint`" }, "index$": 0 }], "key$": "create" }, "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /v2/cdn/endpoints", "source": "openapi3", "version": 2 }, "g": { "query": [{ "a": true, "ex": 1, "k": "query", "n": "page", "or": "page", "r": false, "t": "`$INTEGER`", "index$": 0 }, { "a": true, "ex": 2, "k": "query", "n": "per_page", "or": "per_page", "r": false, "t": "`$INTEGER`", "index$": 1 }] }, "k": "http", "m": "GET", "o": "/v2/cdn/endpoints", "q": {}, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "v2" }, { "lit": "cdn" }, { "lit": "endpoints" }], "t": { "req": "`reqdata`", "res": "`body.endpoints`" }, "index$": 0 }], "key$": "list" }, "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /v2/cdn/endpoints/{cdn_id}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "ex": "19f06b6a-3ace-4315-b086-499a0e521b76", "k": "param", "n": "id", "or": "cdn_id", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/v2/cdn/endpoints/{cdn_id}", "q": { "exist": ["id"] }, "r": { "param": { "cdn_id": "id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "v2" }, { "lit": "cdn" }, { "lit": "endpoints" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body.endpoint`" }, "index$": 0 }], "key$": "load" }, "remove": { "input": "data", "name": "remove", "points": [{ "a": true, "co": { "id": "DELETE /v2/cdn/endpoints/{cdn_id}/cache", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "ex": "19f06b6a-3ace-4315-b086-499a0e521b76", "k": "param", "n": "endpoint_id", "or": "cdn_id", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "DELETE", "o": "/v2/cdn/endpoints/{cdn_id}/cache", "q": { "$action": "cache", "exist": ["endpoint_id"] }, "r": { "param": { "cdn_id": "endpoint_id" } }, "s": [{ "lit": "v2" }, { "lit": "cdn" }, { "lit": "endpoints" }, { "var": "endpoint_id" }, { "lit": "cache" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }, { "a": true, "co": { "id": "DELETE /v2/cdn/endpoints/{cdn_id}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "ex": "19f06b6a-3ace-4315-b086-499a0e521b76", "k": "param", "n": "id", "or": "cdn_id", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "DELETE", "o": "/v2/cdn/endpoints/{cdn_id}", "q": { "exist": ["id"] }, "r": { "param": { "cdn_id": "id" } }, "s": [{ "lit": "v2" }, { "lit": "cdn" }, { "lit": "endpoints" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 1 }], "key$": "remove" }, "update": { "input": "data", "name": "update", "points": [{ "a": true, "co": { "id": "PUT /v2/cdn/endpoints/{cdn_id}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "ex": "19f06b6a-3ace-4315-b086-499a0e521b76", "k": "param", "n": "id", "or": "cdn_id", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "PUT", "o": "/v2/cdn/endpoints/{cdn_id}", "q": { "exist": ["id"] }, "r": { "param": { "cdn_id": "id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "v2" }, { "lit": "cdn" }, { "lit": "endpoints" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body.endpoint`" }, "index$": 0 }], "key$": "update" } }, "relations": { "ancestors": [] }, "key$": "cdn_endpoint", "name__orig": "cdn_endpoint", "Name": "CdnEndpoint", "name_": "cdn_endpoint", "name-": "cdn-endpoint", "NAME": "CDN_ENDPOINT", "index$": 128 }, { "active": true, "entity": "cdn_endpoint", "key$": "BasicCdnEndpointFlow", "kind": "basic", "name": "BasicCdnEndpointFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "cdn_endpoint_ref01" }, "m": {}, "o": "create", "s": [], "v": [], "index$": 0 }, { "a": true, "d": {}, "i": {}, "m": {}, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "cdn_endpoint_ref01" } }], "index$": 1 }, { "a": true, "d": {}, "i": { "ref": "cdn_endpoint_ref01", "srcdatavar": "cdn_endpoint_ref01_data", "suffix": "_up0", "textfield": "certificate_id" }, "m": {}, "o": "update", "s": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-cdn_endpoint_ref01" } }], "v": [], "index$": 2 }, { "a": true, "d": {}, "i": { "ref": "cdn_endpoint_ref01", "srcdatavar": "cdn_endpoint_ref01_data", "suffix": "_dt0" }, "m": { "id": "cdn_endpoint01" }, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-cdn_endpoint_ref01" } }], "index$": 3 }, { "a": true, "d": {}, "i": { "ref": "cdn_endpoint_ref01", "suffix": "_rm0" }, "m": { "id": "cdn_endpoint01" }, "o": "remove", "s": [], "v": [], "index$": 4 }, { "a": true, "d": {}, "i": { "suffix": "_rt0" }, "m": {}, "o": "list", "s": [], "v": [{ "apply": "ItemNotExists", "def": { "ref": "cdn_endpoint_ref01" } }], "index$": 5 }] }, 'CdnEndpoint', { "POST /v2/cdn/endpoints": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "properties": { "id": { "type": "string", "format": "uuid", "readOnly": true, "example": "892071a0-bb95-49bc-8021-3afd67a210bf", "description": "A unique ID that can be used to identify and reference a CDN endpoint.", "key$": "id" }, "origin": { "type": "string", "format": "hostname", "example": "static-images.nyc3.digitaloceanspaces.com", "description": "The fully qualified domain name (FQDN) for the origin server which provides the content for the CDN. This is currently restricted to a Space.", "key$": "origin" }, "endpoint": { "type": "string", "format": "hostname", "readOnly": true, "example": "static-images.nyc3.cdn.digitaloceanspaces.com", "description": "The fully qualified domain name (FQDN) from which the CDN-backed content is served.", "key$": "endpoint" }, "ttl": { "type": "integer", "example": 3600, "enum": [60, 600, 3600, 86400, 604800], "default": 3600, "description": "The amount of time the content is cached by the CDN's edge servers in seconds. TTL must be one of 60, 600, 3600, 86400, or 604800. Defaults to 3600 (one hour) when excluded.", "key$": "ttl" }, "certificate_id": { "type": "string", "format": "uuid", "example": "892071a0-bb95-49bc-8021-3afd67a210bf", "description": "The ID of a DigitalOcean managed TLS certificate used for SSL when a custom subdomain is provided.", "key$": "certificate_id" }, "custom_domain": { "type": "string", "format": "hostname", "example": "static.example.com", "description": "The fully qualified domain name (FQDN) of the custom subdomain used with the CDN endpoint.", "key$": "custom_domain" }, "created_at": { "type": "string", "format": "date-time", "readOnly": true, "example": "2018-03-21T16:02:37Z", "description": "A time value given in ISO8601 combined date and time format that represents when the CDN endpoint was created.", "key$": "created_at" } }, "required": ["origin"], "x-ref": "#/components/schemas/cdn_endpoint", "index$": 1 }, "examples": { "CDN Endpoint": { "value": { "origin": "static-images.nyc3.digitaloceanspaces.com", "ttl": 3600 } }, "CDN Endpoint With Custom Domain": { "value": { "origin": "static-images.nyc3.digitaloceanspaces.com", "certificate_id": "892071a0-bb95-49bc-8021-3afd67a210bf", "custom_domain": "static.example.com", "ttl": 3600 } } } } } }, "parameters": [] }, "GET /v2/cdn/endpoints": { "protocol": "http", "parameters": [{ "in": "query", "name": "per_page", "required": false, "description": "Number of items returned per page", "schema": { "type": "integer", "minimum": 1, "default": 20, "maximum": 200 }, "example": 2, "x-ref": "#/components/parameters/parameters_per_page", "index$": 0 }, { "in": "query", "name": "page", "required": false, "description": "Which 'page' of paginated results to return.", "schema": { "type": "integer", "minimum": 1, "default": 1 }, "example": 1, "x-ref": "#/components/parameters/page", "index$": 1 }] }, "GET /v2/cdn/endpoints/{cdn_id}": { "protocol": "http", "parameters": [{ "in": "path", "name": "cdn_id", "description": "A unique identifier for a CDN endpoint.", "required": true, "schema": { "type": "string", "format": "uuid", "minimum": 1 }, "example": "19f06b6a-3ace-4315-b086-499a0e521b76", "x-ref": "#/components/parameters/cdn_endpoint_id", "index$": 0 }] }, "DELETE /v2/cdn/endpoints/{cdn_id}/cache": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "properties": { "files": { "type": "array", "items": { "type": "string" }, "example": ["path/to/image.png", "path/to/css/*"], "description": "An array of strings containing the path to the content to be purged from the CDN cache." } }, "required": ["files"], "x-ref": "#/components/schemas/purge_cache" } } } }, "parameters": [{ "in": "path", "name": "cdn_id", "description": "A unique identifier for a CDN endpoint.", "required": true, "schema": { "type": "string", "format": "uuid", "minimum": 1 }, "example": "19f06b6a-3ace-4315-b086-499a0e521b76", "x-ref": "#/components/parameters/cdn_endpoint_id", "index$": 0 }] }, "DELETE /v2/cdn/endpoints/{cdn_id}": { "protocol": "http", "parameters": [{ "in": "path", "name": "cdn_id", "description": "A unique identifier for a CDN endpoint.", "required": true, "schema": { "type": "string", "format": "uuid", "minimum": 1 }, "example": "19f06b6a-3ace-4315-b086-499a0e521b76", "x-ref": "#/components/parameters/cdn_endpoint_id", "index$": 0 }] }, "PUT /v2/cdn/endpoints/{cdn_id}": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "properties": { "ttl": { "type": "integer", "example": 3600, "enum": [60, 600, 3600, 86400, 604800], "default": 3600, "description": "The amount of time the content is cached by the CDN's edge servers in seconds. TTL must be one of 60, 600, 3600, 86400, or 604800. Defaults to 3600 (one hour) when excluded.", "key$": "ttl" }, "certificate_id": { "type": "string", "format": "uuid", "example": "892071a0-bb95-49bc-8021-3afd67a210bf", "description": "The ID of a DigitalOcean managed TLS certificate used for SSL when a custom subdomain is provided.", "key$": "certificate_id" }, "custom_domain": { "type": "string", "format": "hostname", "example": "static.example.com", "description": "The fully qualified domain name (FQDN) of the custom subdomain used with the CDN endpoint.", "key$": "custom_domain" } }, "x-ref": "#/components/schemas/update_endpoint", "index$": 1 } } } }, "parameters": [{ "in": "path", "name": "cdn_id", "description": "A unique identifier for a CDN endpoint.", "required": true, "schema": { "type": "string", "format": "uuid", "minimum": 1 }, "example": "19f06b6a-3ace-4315-b086-499a0e521b76", "x-ref": "#/components/parameters/cdn_endpoint_id", "index$": 0 }] } }, { strict: LIVE_STRICT, t });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const cdn_endpoint_ref01_ent = client.CdnEndpoint();
        let cdn_endpoint_ref01_data = setup.data.new.cdn_endpoint['cdn_endpoint_ref01'];
        cdn_endpoint_ref01_data = (await cdn_endpoint_ref01_ent.create(cdn_endpoint_ref01_data)).data();
        (0, node_assert_1.default)(null != cdn_endpoint_ref01_data.id);
        // LIST
        const cdn_endpoint_ref01_match = {};
        const cdn_endpoint_ref01_list = (await cdn_endpoint_ref01_ent.list(cdn_endpoint_ref01_match)).map((e) => e.data());
        (0, node_assert_1.default)(!isempty(select(cdn_endpoint_ref01_list, { id: cdn_endpoint_ref01_data.id })));
        // UPDATE
        const cdn_endpoint_ref01_data_up0 = {};
        cdn_endpoint_ref01_data_up0.id = cdn_endpoint_ref01_data.id;
        const cdn_endpoint_ref01_markdef_up0 = { name: 'certificate_id', value: 'Mark01-cdn_endpoint_ref01_' + setup.now };
        cdn_endpoint_ref01_data_up0[cdn_endpoint_ref01_markdef_up0.name] = cdn_endpoint_ref01_markdef_up0.value;
        const cdn_endpoint_ref01_resdata_up0 = (await cdn_endpoint_ref01_ent.update(cdn_endpoint_ref01_data_up0)).data();
        (0, node_assert_1.default)(cdn_endpoint_ref01_resdata_up0.id === cdn_endpoint_ref01_data_up0.id);
        (0, node_assert_1.default)(cdn_endpoint_ref01_resdata_up0[cdn_endpoint_ref01_markdef_up0.name] === cdn_endpoint_ref01_markdef_up0.value);
        // LOAD
        const cdn_endpoint_ref01_match_dt0 = {};
        cdn_endpoint_ref01_match_dt0.id = cdn_endpoint_ref01_data.id;
        const cdn_endpoint_ref01_data_dt0 = (await cdn_endpoint_ref01_ent.load(cdn_endpoint_ref01_match_dt0)).data();
        (0, node_assert_1.default)(cdn_endpoint_ref01_data_dt0.id === cdn_endpoint_ref01_data.id);
        // REMOVE
        const cdn_endpoint_ref01_match_rm0 = { id: cdn_endpoint_ref01_data.id };
        await cdn_endpoint_ref01_ent.remove(cdn_endpoint_ref01_match_rm0);
        // LIST
        const cdn_endpoint_ref01_match_rt0 = {};
        const cdn_endpoint_ref01_list_rt0 = (await cdn_endpoint_ref01_ent.list(cdn_endpoint_ref01_match_rt0)).map((e) => e.data());
        (0, node_assert_1.default)(isempty(select(cdn_endpoint_ref01_list_rt0, { id: cdn_endpoint_ref01_data.id })));
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
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/cdn_endpoint/CdnEndpointTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.DigitaloceanSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['cdn_endpoint01', 'cdn_endpoint02', 'cdn_endpoint03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'DIGITALOCEAN_TEST_CDN_ENDPOINT_ENTID': idmap,
        'DIGITALOCEAN_TEST_LIVE': 'FALSE',
        'DIGITALOCEAN_TEST_EXPLAIN': 'FALSE',
        'DIGITALOCEAN_APIKEY': '',
    });
    idmap = env['DIGITALOCEAN_TEST_CDN_ENDPOINT_ENTID'];
    const live = 'TRUE' === env.DIGITALOCEAN_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['DIGITALOCEAN_TEST_CDN_ENDPOINT_ENTID'];
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
//# sourceMappingURL=CdnEndpointEntity.test.js.map