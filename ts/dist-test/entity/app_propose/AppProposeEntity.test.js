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
(0, node_test_1.describe)('AppProposeEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when DIGITALOCEAN_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('DIGITALOCEAN_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.DigitaloceanSDK.test();
        const ent = testsdk.AppPropose();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.DigitaloceanSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.AppPropose().create({ "app_cost": "x", "spec": "x" }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.DIGITALOCEAN_TEST_LIVE;
        for (const op of ['create']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'app_propose.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "app_cost": { "a": true, "fo": "int32", "h": "App Cost", "n": "app_cost", "r": false, "sh": "The monthly cost of the proposed app in USD.", "t": "`$INTEGER`", "key$": "app_cost", "index$": 0 }, "app_id": { "a": true, "h": "App Id", "n": "app_id", "r": false, "sh": "An optional ID of an existing app.", "t": "`$STRING`", "key$": "app_id", "index$": 1 }, "app_is_static": { "a": true, "h": "App Is Static", "n": "app_is_static", "r": false, "sh": "Indicates whether the app is a static app.", "t": "`$BOOLEAN`", "key$": "app_is_static", "index$": 2 }, "app_name_available": { "a": true, "h": "App Name Available", "n": "app_name_available", "r": false, "sh": "Indicates whether the app name is available.", "t": "`$BOOLEAN`", "key$": "app_name_available", "index$": 3 }, "app_name_suggestion": { "a": true, "h": "App Name Suggestion", "n": "app_name_suggestion", "r": false, "sh": "The suggested name if the proposed app name is unavailable.", "t": "`$STRING`", "key$": "app_name_suggestion", "index$": 4 }, "app_tier_downgrade_cost": { "a": true, "de": true, "fo": "int32", "h": "App Tier Downgrade Cost", "n": "app_tier_downgrade_cost", "r": false, "sh": "The monthly cost of the proposed app in USD using the previous pricing plan tier.", "t": "`$INTEGER`", "key$": "app_tier_downgrade_cost", "index$": 5 }, "existing_static_apps": { "a": true, "h": "Existing Static Apps", "n": "existing_static_apps", "r": false, "sh": "The maximum number of free static apps the account can have.", "t": "`$STRING`", "key$": "existing_static_apps", "index$": 6 }, "spec": { "a": true, "h": "Spec", "n": "spec", "r": true, "sh": "The desired configuration of an application.", "t": "`$OBJECT`", "union": { "branches": 2, "count": 1, "depth": 7 }, "key$": "spec", "index$": 7 } }, "name": "app_propose", "op": { "create": { "input": "data", "name": "create", "points": [{ "a": true, "co": { "id": "POST /v2/apps/propose", "source": "openapi3", "version": 2 }, "g": {}, "k": "http", "m": "POST", "o": "/v2/apps/propose", "q": {}, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "v2" }, { "lit": "apps" }, { "lit": "propose" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "create" } }, "relations": { "ancestors": [] }, "key$": "app_propose", "name__orig": "app_propose", "Name": "AppPropose", "name_": "app_propose", "name-": "app-propose", "NAME": "APP_PROPOSE", "index$": 110 }, { "active": true, "entity": "app_propose", "key$": "BasicAppProposeFlow", "kind": "basic", "name": "BasicAppProposeFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "app_propose_ref01" }, "m": {}, "o": "create", "s": [], "v": [], "index$": 0 }] }, 'AppPropose', { "POST /v2/apps/propose": { "protocol": "http", "requestBody": { "content": { "application/json": { "schema": { "type": "object", "properties": { "spec": { "title": "AppSpec", "type": "object", "description": "The desired configuration of an application.", "properties": { "name": { "description": "The name of the app. Must be unique across all apps in the same account.", "maxLength": 32, "minLength": 2, "pattern": "^[a-z][a-z0-9-]{0,30}[a-z0-9]$", "type": "string", "example": "web-app-01" }, "region": { "description": "The slug form of the geographical origin of the app. Default: `nearest available`", "type": "string", "enum": ["atl", "nyc", "sfo", "tor", "ams", "fra", "lon", "blr", "sgp", "syd"], "example": "nyc" }, "disable_edge_cache": { "description": "If set to `true`, the app will **not** be cached at the edge (CDN). Enable this option if you want to manage CDN configuration yourself—whether by using an external CDN provider or by handling static content and caching within your app. This setting is also recommended for apps that require real-time data or serve dynamic content, such as those using Server-Sent Events (SSE) over GET, or hosting an MCP (Model Context Protocol) Server that utilizes SSE.  \n**Note:** This feature is not available for static site components.  \nFor more information, see [Disable CDN Cache](https://docs.digitalocean.com/products/app-platform/how-to/cache-content/#disable-cdn-cache).", "type": "boolean", "default": false }, "disable_email_obfuscation": { "description": "If set to `true`, email addresses in the app will not be obfuscated. This is\nuseful for apps that require email addresses to be visible (in the HTML markup).", "type": "boolean", "default": false }, "enhanced_threat_control_enabled": { "description": "If set to `true`, suspicious requests will go through additional security checks to help mitigate layer 7 DDoS attacks.", "type": "boolean", "default": false }, "domains": { "description": "A set of hostnames where the application will be available.", "type": "array", "items": { "type": "object", "properties": {}, "required": [], "x-ref": "#/components/schemas/app_domain_spec" } }, "services": { "description": "Workloads which expose publicly-accessible HTTP services.", "type": "array", "items": { "allOf": [], "x-ref": "#/components/schemas/app_service_spec" } }, "static_sites": { "description": "Content which can be rendered to static web assets.", "type": "array", "items": { "allOf": [], "required": [], "x-ref": "#/components/schemas/app_static_site_spec" } }, "jobs": { "description": "Pre and post deployment workloads which do not expose publicly-accessible HTTP routes.", "type": "array", "items": { "allOf": [], "x-ref": "#/components/schemas/app_job_spec" } }, "workers": { "description": "Workloads which do not expose publicly-accessible HTTP services.", "items": { "allOf": [], "required": [], "x-ref": "#/components/schemas/app_worker_spec" }, "type": "array" }, "functions": { "description": "Workloads which expose publicly-accessible HTTP services via Functions Components.", "items": { "type": "object", "properties": {}, "required": [], "x-ref": "#/components/schemas/app_functions_spec" }, "type": "array" }, "databases": { "description": "Database instances which can provide persistence to workloads within the\napplication.", "type": "array", "items": { "type": "object", "properties": {}, "required": [], "x-ref": "#/components/schemas/app_database_spec" } }, "ingress": { "type": "object", "properties": { "rules": {}, "custom_error_page_url": {} }, "description": "Specification for app ingress configurations.", "x-ref": "#/components/schemas/app_ingress_spec" }, "egress": { "type": "object", "description": "Specification for app egress configurations.", "properties": { "type": {} }, "x-ref": "#/components/schemas/app_egress_spec" }, "maintenance": { "type": "object", "description": "Specification to configure maintenance settings for the app, such as maintenance mode and archiving the app.", "properties": { "enabled": {}, "archive": {}, "offline_page_url": {} }, "x-ref": "#/components/schemas/app_maintenance_spec" }, "vpc": { "type": "object", "readOnly": true, "properties": { "id": {}, "egress_ips": {} }, "x-ref": "#/components/schemas/apps_vpc" } }, "required": ["name"], "x-ref": "#/components/schemas/app_spec", "key$": "spec" }, "app_id": { "type": "string", "description": "An optional ID of an existing app. If set, the spec will be treated as a proposed update to the specified app. The existing app is not modified using this method.", "example": "b6bdf840-2854-4f87-a36c-5f231c617c84", "key$": "app_id" } }, "required": ["spec"], "x-ref": "#/components/schemas/app_propose", "index$": 1 }, "example": { "spec": { "name": "web-app", "region": "nyc", "services": [{ "name": "api", "github": { "branch": "main", "deploy_on_push": true, "repo": "digitalocean/sample-golang" }, "run_command": "bin/api", "environment_slug": "node-js", "instance_count": 2, "instance_size_slug": "apps-s-1vcpu-0.5gb", "routes": [{ "path": "/api" }] }] }, "app_id": "b6bdf840-2854-4f87-a36c-5f231c617c84" } } }, "required": true }, "parameters": [] } }, { strict: LIVE_STRICT, t });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const app_propose_ref01_ent = client.AppPropose();
        let app_propose_ref01_data = setup.data.new.app_propose['app_propose_ref01'];
        app_propose_ref01_data = (await app_propose_ref01_ent.create(app_propose_ref01_data)).data();
        (0, node_assert_1.default)(null != app_propose_ref01_data);
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
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/app_propose/AppProposeTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.DigitaloceanSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['app_propose01', 'app_propose02', 'app_propose03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'DIGITALOCEAN_TEST_APP_PROPOSE_ENTID': idmap,
        'DIGITALOCEAN_TEST_LIVE': 'FALSE',
        'DIGITALOCEAN_TEST_EXPLAIN': 'FALSE',
        'DIGITALOCEAN_APIKEY': '',
    });
    idmap = env['DIGITALOCEAN_TEST_APP_PROPOSE_ENTID'];
    const live = 'TRUE' === env.DIGITALOCEAN_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['DIGITALOCEAN_TEST_APP_PROPOSE_ENTID'];
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
//# sourceMappingURL=AppProposeEntity.test.js.map