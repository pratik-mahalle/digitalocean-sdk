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
(0, node_test_1.describe)('AppAlertEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when DIGITALOCEAN_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('DIGITALOCEAN_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.DigitaloceanSDK.test();
        const ent = testsdk.AppAlert();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.DigitaloceanSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.AppAlert().list({ "id": 1 }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.DIGITALOCEAN_TEST_LIVE;
        for (const op of ['create', 'list']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'app_alert.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "component_name": { "a": true, "h": "Component Name", "n": "component_name", "r": false, "t": "`$STRING`", "key$": "component_name", "index$": 0 }, "emails": { "a": true, "h": "Emails", "n": "emails", "r": false, "t": "`$ARRAY`", "key$": "emails", "index$": 1 }, "id": { "a": true, "h": "Id", "n": "id", "r": false, "ro": true, "t": "`$STRING`", "key$": "id", "index$": 2 }, "phase": { "a": true, "h": "Phase", "n": "phase", "r": false, "t": "`$STRING`", "key$": "phase", "index$": 3 }, "progress": { "a": true, "h": "Progress", "n": "progress", "r": false, "t": "`$OBJECT`", "key$": "progress", "index$": 4 }, "slack_webhooks": { "a": true, "h": "Slack Webhooks", "n": "slack_webhooks", "r": false, "t": "`$ARRAY`", "key$": "slack_webhooks", "index$": 5 }, "spec": { "a": true, "h": "Spec", "n": "spec", "r": false, "t": "`$OBJECT`", "key$": "spec", "index$": 6 } }, "id": { "field": "id", "name": "id" }, "name": "app_alert", "op": { "create": { "input": "data", "name": "create", "points": [{ "a": true, "co": { "id": "POST /v2/apps/{app_id}/alerts/{alert_id}/destinations", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "ex": "5a624ab5-dd58-4b39-b7dd-8b7c36e8a91d", "k": "param", "n": "alert_id", "or": "alert_id", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "ex": "4f6c71e2-1e90-4762-9fee-6cc4a0a9f2cf", "k": "param", "n": "app_id", "or": "app_id", "r": true, "t": "`$STRING`", "index$": 1 }] }, "k": "http", "m": "POST", "o": "/v2/apps/{app_id}/alerts/{alert_id}/destinations", "q": { "exist": ["alert_id", "app_id"] }, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "v2" }, { "lit": "apps" }, { "var": "app_id" }, { "lit": "alerts" }, { "var": "alert_id" }, { "lit": "destinations" }], "t": { "req": "`reqdata`", "res": "`body.alert`" }, "index$": 0 }], "key$": "create" }, "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /v2/apps/{app_id}/alerts", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "ex": "4f6c71e2-1e90-4762-9fee-6cc4a0a9f2cf", "k": "param", "n": "id", "or": "app_id", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/v2/apps/{app_id}/alerts", "q": { "exist": ["id"] }, "r": { "param": { "app_id": "id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "v2" }, { "lit": "apps" }, { "var": "id" }, { "lit": "alerts" }], "t": { "req": "`reqdata`", "res": "`body.alerts`" }, "index$": 0 }], "key$": "list" } }, "relations": { "ancestors": [["$.main.kit.entity.app"]] }, "key$": "app_alert", "name__orig": "app_alert", "Name": "AppAlert", "name_": "app_alert", "name-": "app-alert", "NAME": "APP_ALERT", "index$": 104 }, { "active": true, "entity": "app_alert", "key$": "BasicAppAlertFlow", "kind": "basic", "name": "BasicAppAlertFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "app_alert_ref01" }, "m": { "alert_id": "alert01", "app_id": "app01" }, "o": "create", "s": [], "v": [], "index$": 0 }, { "a": true, "d": {}, "i": {}, "m": { "app_id": "app01" }, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "app_alert_ref01" } }], "index$": 1 }] }, 'AppAlert', { "POST /v2/apps/{app_id}/alerts/{alert_id}/destinations": { "protocol": "http", "requestBody": { "content": { "application/json": { "schema": { "properties": { "emails": { "type": "array", "items": { "default": "", "type": "string", "example": "sammy@digitalocean.com", "x-ref": "#/components/schemas/app_alert_email" }, "example": ["sammy@digitalocean.com"], "key$": "emails" }, "slack_webhooks": { "type": "array", "items": { "properties": { "url": { "title": "URL of the Slack webhook", "type": "string", "example": "https://hooks.slack.com/services/EXAMPLE-WEBHOOK" }, "channel": { "title": "Name of the Slack Webhook Channel", "type": "string", "example": "Channel Name" } }, "type": "object", "x-ref": "#/components/schemas/app_alert_slack_webhook" }, "key$": "slack_webhooks" } }, "type": "object", "x-ref": "#/components/schemas/apps_assign_app_alert_destinations_request", "index$": 1 } } }, "required": true }, "parameters": [{ "description": "The app ID", "in": "path", "name": "app_id", "required": true, "schema": { "type": "string" }, "example": "4f6c71e2-1e90-4762-9fee-6cc4a0a9f2cf", "x-ref": "#/components/parameters/app_id", "index$": 0 }, { "description": "The alert ID", "in": "path", "name": "alert_id", "required": true, "schema": { "type": "string" }, "example": "5a624ab5-dd58-4b39-b7dd-8b7c36e8a91d", "x-ref": "#/components/parameters/alert_id", "index$": 1 }] }, "GET /v2/apps/{app_id}/alerts": { "protocol": "http", "parameters": [{ "description": "The app ID", "in": "path", "name": "app_id", "required": true, "schema": { "type": "string" }, "example": "4f6c71e2-1e90-4762-9fee-6cc4a0a9f2cf", "x-ref": "#/components/parameters/app_id", "index$": 0 }] } }, { strict: LIVE_STRICT, t });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const app_alert_ref01_ent = client.AppAlert();
        let app_alert_ref01_data = setup.data.new.app_alert['app_alert_ref01'];
        app_alert_ref01_data['alert_id'] = setup.idmap['alert01'];
        app_alert_ref01_data['app_id'] = setup.idmap['app01'];
        app_alert_ref01_data = (await app_alert_ref01_ent.create(app_alert_ref01_data)).data();
        (0, node_assert_1.default)(null != app_alert_ref01_data.id);
        // LIST
        const app_alert_ref01_match = {};
        app_alert_ref01_match['app_id'] = setup.idmap['app01'];
        const app_alert_ref01_list = (await app_alert_ref01_ent.list(app_alert_ref01_match)).map((e) => e.data());
        (0, node_assert_1.default)(!isempty(select(app_alert_ref01_list, { id: app_alert_ref01_data.id })));
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
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/app_alert/AppAlertTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.DigitaloceanSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['app_alert01', 'app_alert02', 'app_alert03', 'app01', 'app02', 'app03', 'alert01'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'DIGITALOCEAN_TEST_APP_ALERT_ENTID': idmap,
        'DIGITALOCEAN_TEST_LIVE': 'FALSE',
        'DIGITALOCEAN_TEST_EXPLAIN': 'FALSE',
        'DIGITALOCEAN_APIKEY': '',
    });
    idmap = env['DIGITALOCEAN_TEST_APP_ALERT_ENTID'];
    const live = 'TRUE' === env.DIGITALOCEAN_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['DIGITALOCEAN_TEST_APP_ALERT_ENTID'];
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
//# sourceMappingURL=AppAlertEntity.test.js.map