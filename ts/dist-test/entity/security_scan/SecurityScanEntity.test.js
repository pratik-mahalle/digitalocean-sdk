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
(0, node_test_1.describe)('SecurityScanEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when DIGITALOCEAN_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('DIGITALOCEAN_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.DigitaloceanSDK.test();
        const ent = testsdk.SecurityScan();
        (0, node_assert_1.default)(null != ent);
    });
    class FailHook extends __1.BaseFeature {
        name = 'failhook';
        version = '0.0.1';
        active = true;
        unexpected = 0;
        init() { }
        PreSpec() { throw new Error('security_scan hook failed'); }
        PreUnexpected() { this.unexpected++; }
    }
    (0, node_test_1.test)('stream-error', async () => {
        const offline = { net: { offline: true } };
        await node_assert_1.default.rejects(async () => {
            for await (const _item of __1.DigitaloceanSDK.test(offline).SecurityScan().stream('list')) { }
        }, /offline/);
        for await (const _item of __1.DigitaloceanSDK.test(offline).SecurityScan()
            .stream('list', undefined, { ctrl: { throw: false } })) { }
        if (null != __1.config.feature?.rbac) {
            const denied = __1.DigitaloceanSDK.test(undefined, { feature: { rbac: { active: true, deny: true } } });
            await node_assert_1.default.rejects(async () => {
                for await (const _item of denied.SecurityScan().stream('list')) { }
            }, (err) => 'rbac_denied' === err.code);
        }
    });
    (0, node_test_1.test)('stream-ctrl', async () => {
        const explain = {};
        const ctrl = { explain };
        for await (const _item of __1.DigitaloceanSDK.test().SecurityScan().stream('list', undefined, { ctrl })) { }
        node_assert_1.default.deepStrictEqual(Object.keys(ctrl), ['explain']);
        (0, node_assert_1.default)(explain === ctrl.explain && 0 < Object.keys(explain).length);
    });
    (0, node_test_1.test)('unexpected', async () => {
        const hook = new FailHook();
        const client = new __1.DigitaloceanSDK({ feature: { test: { active: true } }, extend: [hook] });
        await node_assert_1.default.rejects(client.SecurityScan().list(), /hook failed/);
        (0, node_assert_1.default)(0 < hook.unexpected);
        const fired = hook.unexpected;
        node_assert_1.default.strictEqual(await client.SecurityScan().list(undefined, { throw: false }), undefined);
        (0, node_assert_1.default)(fired < hook.unexpected);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.DigitaloceanSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.SecurityScan().list({ "page": "x" }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.DIGITALOCEAN_TEST_LIVE;
        for (const op of ['create', 'list', 'load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'security_scan.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "created_at": { "a": true, "fo": "date-time", "h": "Created At", "n": "created_at", "r": false, "sh": "When scan was created.", "t": "`$STRING`", "key$": "created_at", "index$": 0 }, "findings": { "a": true, "h": "Findings", "n": "findings", "r": false, "t": "`$ARRAY`", "key$": "findings", "index$": 1 }, "id": { "a": true, "h": "Id", "n": "id", "r": false, "sh": "The unique identifier for the scan.", "t": "`$STRING`", "key$": "id", "index$": 2 }, "name": { "a": true, "h": "Name", "n": "name", "r": false, "sh": "The name of the affected resource.", "t": "`$STRING`", "key$": "name", "index$": 3 }, "status": { "a": true, "h": "Status", "n": "status", "r": false, "sh": "The status of the scan.", "t": "`$STRING`", "key$": "status", "index$": 4 }, "type": { "a": true, "h": "Type", "n": "type", "r": false, "sh": "The type of the affected resource.", "t": "`$STRING`", "key$": "type", "index$": 5 }, "urn": { "a": true, "h": "Urn", "n": "urn", "r": false, "sh": "The URN for the affected resource.", "t": "`$STRING`", "key$": "urn", "index$": 6 } }, "id": { "field": "id", "name": "id" }, "name": "security_scan", "op": { "create": { "input": "data", "name": "create", "points": [{ "a": true, "co": { "id": "POST /v2/security/scans", "source": "openapi3", "version": 2 }, "g": {}, "k": "http", "m": "POST", "o": "/v2/security/scans", "q": {}, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "v2" }, { "lit": "security" }, { "lit": "scans" }], "t": { "req": "`reqdata`", "res": "`body.scan`" }, "index$": 0 }], "key$": "create" }, "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /v2/security/scans/{scan_id}/findings/{finding_uuid}/affected_resources", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "ex": "50e14f43-dd4e-412f-864d-78943ea28d91", "k": "param", "n": "finding_id", "or": "finding_uuid", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "ex": "497dcba3-ecbf-4587-a2dd-5eb0665e6880", "k": "param", "n": "scan_id", "or": "scan_id", "r": true, "t": "`$STRING`", "index$": 1 }], "query": [{ "a": true, "ex": 1, "k": "query", "n": "page", "or": "page", "r": false, "t": "`$INTEGER`", "index$": 0 }, { "a": true, "ex": 2, "k": "query", "n": "per_page", "or": "per_page", "r": false, "t": "`$INTEGER`", "index$": 1 }] }, "k": "http", "m": "GET", "o": "/v2/security/scans/{scan_id}/findings/{finding_uuid}/affected_resources", "q": { "exist": ["finding_id", "scan_id"] }, "r": { "param": { "finding_uuid": "finding_id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "v2" }, { "lit": "security" }, { "lit": "scans" }, { "var": "scan_id" }, { "lit": "findings" }, { "var": "finding_id" }, { "lit": "affected_resources" }], "t": { "req": "`reqdata`", "res": "`body.affected_resources`" }, "index$": 0 }, { "a": true, "co": { "id": "GET /v2/security/scans", "source": "openapi3", "version": 2 }, "g": { "query": [{ "a": true, "ex": 1, "k": "query", "n": "page", "or": "page", "r": false, "t": "`$INTEGER`", "index$": 0 }, { "a": true, "ex": 2, "k": "query", "n": "per_page", "or": "per_page", "r": false, "t": "`$INTEGER`", "index$": 1 }] }, "k": "http", "m": "GET", "o": "/v2/security/scans", "q": {}, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "v2" }, { "lit": "security" }, { "lit": "scans" }], "t": { "req": "`reqdata`", "res": "`body.scans`" }, "index$": 1 }], "key$": "list" }, "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /v2/security/scans/{scan_id}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "ex": "497dcba3-ecbf-4587-a2dd-5eb0665e6880", "k": "param", "n": "scan_id", "or": "scan_id", "r": true, "t": "`$STRING`", "index$": 0 }], "query": [{ "a": true, "ex": 1, "k": "query", "n": "page", "or": "page", "r": false, "t": "`$INTEGER`", "index$": 0 }, { "a": true, "ex": 2, "k": "query", "n": "per_page", "or": "per_page", "r": false, "t": "`$INTEGER`", "index$": 1 }, { "a": true, "ex": "CRITICAL", "k": "query", "n": "severity", "or": "severity", "r": false, "t": "`$STRING`", "index$": 2 }, { "a": true, "ex": "CSPM", "k": "query", "n": "type", "or": "type", "r": false, "t": "`$STRING`", "index$": 3 }] }, "k": "http", "m": "GET", "o": "/v2/security/scans/{scan_id}", "q": { "exist": ["scan_id"] }, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "v2" }, { "lit": "security" }, { "lit": "scans" }, { "var": "scan_id" }], "t": { "req": "`reqdata`", "res": "`body.scan`" }, "index$": 0 }, { "a": true, "co": { "id": "GET /v2/security/scans/latest", "source": "openapi3", "version": 2 }, "g": { "query": [{ "a": true, "ex": 1, "k": "query", "n": "page", "or": "page", "r": false, "t": "`$INTEGER`", "index$": 0 }, { "a": true, "ex": 2, "k": "query", "n": "per_page", "or": "per_page", "r": false, "t": "`$INTEGER`", "index$": 1 }, { "a": true, "ex": "CRITICAL", "k": "query", "n": "severity", "or": "severity", "r": false, "t": "`$STRING`", "index$": 2 }, { "a": true, "ex": "CSPM", "k": "query", "n": "type", "or": "type", "r": false, "t": "`$STRING`", "index$": 3 }] }, "k": "http", "m": "GET", "o": "/v2/security/scans/latest", "q": {}, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "v2" }, { "lit": "security" }, { "lit": "scans" }, { "lit": "latest" }], "t": { "req": "`reqdata`", "res": "`body.scan`" }, "index$": 1 }], "key$": "load" } }, "relations": { "ancestors": [] }, "key$": "security_scan", "name__orig": "security_scan", "Name": "SecurityScan", "name_": "security_scan", "name-": "security-scan", "NAME": "SECURITY_SCAN", "index$": 208 }, { "active": true, "entity": "security_scan", "key$": "BasicSecurityScanFlow", "kind": "basic", "name": "BasicSecurityScanFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "security_scan_ref01" }, "m": { "finding_id": "finding01", "scan_id": "scan01" }, "o": "create", "s": [], "v": [], "index$": 0 }, { "a": true, "d": {}, "i": {}, "m": {}, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "security_scan_ref01" } }], "index$": 1 }, { "a": true, "d": {}, "i": { "ref": "security_scan_ref01", "srcdatavar": "security_scan_ref01_data", "suffix": "_dt0" }, "m": {}, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-security_scan_ref01" } }], "index$": 2 }] }, 'SecurityScan', { "POST /v2/security/scans": { "protocol": "http", "parameters": [] }, "GET /v2/security/scans/{scan_id}/findings/{finding_uuid}/affected_resources": { "protocol": "http", "parameters": [{ "in": "path", "name": "scan_id", "description": "The scan UUID.", "required": true, "schema": { "type": "string", "format": "uuid" }, "example": "497dcba3-ecbf-4587-a2dd-5eb0665e6880", "x-ref": "#/components/parameters/scan_id", "index$": 0 }, { "in": "path", "name": "finding_uuid", "description": "The finding UUID.", "required": true, "schema": { "type": "string", "format": "uuid" }, "example": "50e14f43-dd4e-412f-864d-78943ea28d91", "x-ref": "#/components/parameters/finding_uuid", "index$": 1 }, { "in": "query", "name": "per_page", "required": false, "description": "Number of items returned per page", "schema": { "type": "integer", "minimum": 1, "default": 20, "maximum": 200 }, "example": 2, "x-ref": "#/components/parameters/parameters_per_page", "index$": 2 }, { "in": "query", "name": "page", "required": false, "description": "Which 'page' of paginated results to return.", "schema": { "type": "integer", "minimum": 1, "default": 1 }, "example": 1, "x-ref": "#/components/parameters/page", "index$": 3 }] }, "GET /v2/security/scans": { "protocol": "http", "parameters": [{ "in": "query", "name": "per_page", "required": false, "description": "Number of items returned per page", "schema": { "type": "integer", "minimum": 1, "default": 20, "maximum": 200 }, "example": 2, "x-ref": "#/components/parameters/parameters_per_page", "index$": 0 }, { "in": "query", "name": "page", "required": false, "description": "Which 'page' of paginated results to return.", "schema": { "type": "integer", "minimum": 1, "default": 1 }, "example": 1, "x-ref": "#/components/parameters/page", "index$": 1 }] }, "GET /v2/security/scans/{scan_id}": { "protocol": "http", "parameters": [{ "in": "path", "name": "scan_id", "description": "The scan UUID.", "required": true, "schema": { "type": "string", "format": "uuid" }, "example": "497dcba3-ecbf-4587-a2dd-5eb0665e6880", "x-ref": "#/components/parameters/scan_id", "index$": 0 }, { "in": "query", "name": "severity", "required": false, "description": "The finding severity level to include.", "schema": { "type": "string", "enum": ["LOW", "MEDIUM", "HIGH", "CRITICAL"] }, "example": "CRITICAL", "x-ref": "#/components/parameters/severity", "index$": 1 }, { "in": "query", "name": "per_page", "required": false, "description": "Number of items returned per page", "schema": { "type": "integer", "minimum": 1, "default": 20, "maximum": 200 }, "example": 2, "x-ref": "#/components/parameters/parameters_per_page", "index$": 2 }, { "in": "query", "name": "page", "required": false, "description": "Which 'page' of paginated results to return.", "schema": { "type": "integer", "minimum": 1, "default": 1 }, "example": 1, "x-ref": "#/components/parameters/page", "index$": 3 }, { "in": "query", "name": "type", "required": false, "description": "The finding type to include.", "schema": { "type": "string" }, "example": "CSPM", "index$": 4 }] }, "GET /v2/security/scans/latest": { "protocol": "http", "parameters": [{ "in": "query", "name": "per_page", "required": false, "description": "Number of items returned per page", "schema": { "type": "integer", "minimum": 1, "default": 20, "maximum": 200 }, "example": 2, "x-ref": "#/components/parameters/parameters_per_page", "index$": 0 }, { "in": "query", "name": "page", "required": false, "description": "Which 'page' of paginated results to return.", "schema": { "type": "integer", "minimum": 1, "default": 1 }, "example": 1, "x-ref": "#/components/parameters/page", "index$": 1 }, { "in": "query", "name": "severity", "required": false, "description": "The finding severity level to include.", "schema": { "type": "string", "enum": ["LOW", "MEDIUM", "HIGH", "CRITICAL"] }, "example": "CRITICAL", "x-ref": "#/components/parameters/severity", "index$": 2 }, { "in": "query", "name": "type", "required": false, "description": "The finding type to include.", "schema": { "type": "string" }, "example": "CSPM", "index$": 3 }] } }, { strict: LIVE_STRICT, t });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const security_scan_ref01_ent = client.SecurityScan();
        let security_scan_ref01_data = setup.data.new.security_scan['security_scan_ref01'];
        security_scan_ref01_data['finding_id'] = setup.idmap['finding01'];
        security_scan_ref01_data['scan_id'] = setup.idmap['scan01'];
        security_scan_ref01_data = (await security_scan_ref01_ent.create(security_scan_ref01_data)).data();
        (0, node_assert_1.default)(null != security_scan_ref01_data.id);
        // LIST
        const security_scan_ref01_match = {};
        const security_scan_ref01_list = (await security_scan_ref01_ent.list(security_scan_ref01_match)).map((e) => e.data());
        (0, node_assert_1.default)(!isempty(select(security_scan_ref01_list, { id: security_scan_ref01_data.id })));
        // LOAD
        const security_scan_ref01_match_dt0 = {};
        security_scan_ref01_match_dt0.id = security_scan_ref01_data.id;
        const security_scan_ref01_data_dt0 = (await security_scan_ref01_ent.load(security_scan_ref01_match_dt0)).data();
        (0, node_assert_1.default)(security_scan_ref01_data_dt0.id === security_scan_ref01_data.id);
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
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/security_scan/SecurityScanTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.DigitaloceanSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['security_scan01', 'security_scan02', 'security_scan03', 'finding01', 'scan01'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'DIGITALOCEAN_TEST_SECURITY_SCAN_ENTID': idmap,
        'DIGITALOCEAN_TEST_LIVE': 'FALSE',
        'DIGITALOCEAN_TEST_EXPLAIN': 'FALSE',
        'DIGITALOCEAN_APIKEY': '',
    });
    idmap = env['DIGITALOCEAN_TEST_SECURITY_SCAN_ENTID'];
    const live = 'TRUE' === env.DIGITALOCEAN_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['DIGITALOCEAN_TEST_SECURITY_SCAN_ENTID'];
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
//# sourceMappingURL=SecurityScanEntity.test.js.map