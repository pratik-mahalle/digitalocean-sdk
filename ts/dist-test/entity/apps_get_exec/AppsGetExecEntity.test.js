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
(0, node_test_1.describe)('AppsGetExecEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when DIGITALOCEAN_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('DIGITALOCEAN_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.DigitaloceanSDK.test();
        const ent = testsdk.AppsGetExec();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.DigitaloceanSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.AppsGetExec().load({ "app_id": 1, "component_name": "x" }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.DIGITALOCEAN_TEST_LIVE;
        for (const op of []) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'apps_get_exec.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "url": { "a": true, "h": "Url", "n": "url", "r": false, "sh": "A websocket URL that allows sending/receiving console input and receiving console output.", "t": "`$STRING`", "key$": "url", "index$": 0 } }, "name": "apps_get_exec", "op": { "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /v2/apps/{app_id}/deployments/{deployment_id}/components/{component_name}/exec", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "ex": "4f6c71e2-1e90-4762-9fee-6cc4a0a9f2cf", "k": "param", "n": "app_id", "or": "app_id", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "ex": "component", "k": "param", "n": "component_name", "or": "component_name", "r": true, "t": "`$STRING`", "index$": 1 }, { "a": true, "ex": "3aa4d20e-5527-4c00-b496-601fbd22520a", "k": "param", "n": "deployment_id", "or": "deployment_id", "r": true, "t": "`$STRING`", "index$": 2 }], "query": [{ "a": true, "ex": "go-app-d768568df-zz77d", "k": "query", "n": "instance_name", "or": "instance_name", "r": false, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/v2/apps/{app_id}/deployments/{deployment_id}/components/{component_name}/exec", "q": { "exist": ["app_id", "component_name", "deployment_id"] }, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "v2" }, { "lit": "apps" }, { "var": "app_id" }, { "lit": "deployments" }, { "var": "deployment_id" }, { "lit": "components" }, { "var": "component_name" }, { "lit": "exec" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }, { "a": true, "co": { "id": "GET /v2/apps/{app_id}/components/{component_name}/exec", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "ex": "4f6c71e2-1e90-4762-9fee-6cc4a0a9f2cf", "k": "param", "n": "app_id", "or": "app_id", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "ex": "component", "k": "param", "n": "component_name", "or": "component_name", "r": true, "t": "`$STRING`", "index$": 1 }], "query": [{ "a": true, "ex": "go-app-d768568df-zz77d", "k": "query", "n": "instance_name", "or": "instance_name", "r": false, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/v2/apps/{app_id}/components/{component_name}/exec", "q": { "exist": ["app_id", "component_name"] }, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "v2" }, { "lit": "apps" }, { "var": "app_id" }, { "lit": "components" }, { "var": "component_name" }, { "lit": "exec" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 1 }], "key$": "load" } }, "relations": { "ancestors": [["$.main.kit.entity.app"], ["$.main.kit.entity.app"]] }, "key$": "apps_get_exec", "name__orig": "apps_get_exec", "Name": "AppsGetExec", "name_": "apps_get_exec", "name-": "apps-get-exec", "NAME": "APPS_GET_EXEC", "index$": 112 }, { "active": true, "entity": "apps_get_exec", "key$": "BasicAppsGetExecFlow", "kind": "basic", "name": "BasicAppsGetExecFlow", "param": {}, "step": [{ "a": false, "d": {}, "i": { "ref": "apps_get_exec_ref01", "srcdatavar": "apps_get_exec_ref01_data", "suffix": "_dt0" }, "m": { "app_id": "app01", "id": "apps_get_exec01" }, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-apps_get_exec_ref01" } }], "unreachable": true }] }, 'AppsGetExec', { "GET /v2/apps/{app_id}/deployments/{deployment_id}/components/{component_name}/exec": { "protocol": "http", "parameters": [{ "description": "The app ID", "in": "path", "name": "app_id", "required": true, "schema": { "type": "string" }, "example": "4f6c71e2-1e90-4762-9fee-6cc4a0a9f2cf", "x-ref": "#/components/parameters/app_id", "index$": 0 }, { "description": "The deployment ID", "in": "path", "name": "deployment_id", "required": true, "schema": { "type": "string" }, "example": "3aa4d20e-5527-4c00-b496-601fbd22520a", "x-ref": "#/components/parameters/deployment_id", "index$": 1 }, { "description": "An optional component name. If set, logs will be limited to this component only.", "in": "path", "name": "component_name", "required": true, "schema": { "type": "string" }, "example": "component", "x-ref": "#/components/parameters/component", "index$": 2 }, { "description": "The name of the actively running ephemeral compute instance", "in": "query", "name": "instance_name", "required": false, "schema": { "type": "string" }, "example": "go-app-d768568df-zz77d", "x-ref": "#/components/parameters/instance_name", "index$": 3 }] }, "GET /v2/apps/{app_id}/components/{component_name}/exec": { "protocol": "http", "parameters": [{ "description": "The app ID", "in": "path", "name": "app_id", "required": true, "schema": { "type": "string" }, "example": "4f6c71e2-1e90-4762-9fee-6cc4a0a9f2cf", "x-ref": "#/components/parameters/app_id", "index$": 0 }, { "description": "An optional component name. If set, logs will be limited to this component only.", "in": "path", "name": "component_name", "required": true, "schema": { "type": "string" }, "example": "component", "x-ref": "#/components/parameters/component", "index$": 1 }, { "description": "The name of the actively running ephemeral compute instance", "in": "query", "name": "instance_name", "required": false, "schema": { "type": "string" }, "example": "go-app-d768568df-zz77d", "x-ref": "#/components/parameters/instance_name", "index$": 2 }] } }, { strict: LIVE_STRICT, t });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let apps_get_exec_ref01_data = Object.values(setup.data.existing.apps_get_exec)[0];
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
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/apps_get_exec/AppsGetExecTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.DigitaloceanSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['apps_get_exec01', 'apps_get_exec02', 'apps_get_exec03', 'app01', 'app02', 'app03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'DIGITALOCEAN_TEST_APPS_GET_EXEC_ENTID': idmap,
        'DIGITALOCEAN_TEST_LIVE': 'FALSE',
        'DIGITALOCEAN_TEST_EXPLAIN': 'FALSE',
        'DIGITALOCEAN_APIKEY': '',
    });
    idmap = env['DIGITALOCEAN_TEST_APPS_GET_EXEC_ENTID'];
    const live = 'TRUE' === env.DIGITALOCEAN_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['DIGITALOCEAN_TEST_APPS_GET_EXEC_ENTID'];
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
//# sourceMappingURL=AppsGetExecEntity.test.js.map