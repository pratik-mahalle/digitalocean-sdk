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
(0, node_test_1.describe)('ListProviderEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when DIGITALOCEAN_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('DIGITALOCEAN_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.DigitaloceanSDK.test();
        const ent = testsdk.ListProvider();
        (0, node_assert_1.default)(null != ent);
    });
    class FailHook extends __1.BaseFeature {
        name = 'failhook';
        version = '0.0.1';
        active = true;
        unexpected = 0;
        init() { }
        PreSpec() { throw new Error('list_provider hook failed'); }
        PreUnexpected() { this.unexpected++; }
    }
    (0, node_test_1.test)('stream-error', async () => {
        const offline = { net: { offline: true } };
        await node_assert_1.default.rejects(async () => {
            for await (const _item of __1.DigitaloceanSDK.test(offline).ListProvider().stream('list')) { }
        }, /offline/);
        for await (const _item of __1.DigitaloceanSDK.test(offline).ListProvider()
            .stream('list', undefined, { ctrl: { throw: false } })) { }
        if (null != __1.config.feature?.rbac) {
            const denied = __1.DigitaloceanSDK.test(undefined, { feature: { rbac: { active: true, deny: true } } });
            await node_assert_1.default.rejects(async () => {
                for await (const _item of denied.ListProvider().stream('list')) { }
            }, (err) => 'rbac_denied' === err.code);
        }
    });
    (0, node_test_1.test)('stream-ctrl', async () => {
        const explain = {};
        const ctrl = { explain };
        for await (const _item of __1.DigitaloceanSDK.test().ListProvider().stream('list', undefined, { ctrl })) { }
        node_assert_1.default.deepStrictEqual(Object.keys(ctrl), ['explain']);
        (0, node_assert_1.default)(explain === ctrl.explain && 0 < Object.keys(explain).length);
    });
    (0, node_test_1.test)('unexpected', async () => {
        const hook = new FailHook();
        const client = new __1.DigitaloceanSDK({ feature: { test: { active: true } }, extend: [hook] });
        await node_assert_1.default.rejects(client.ListProvider().list(), /hook failed/);
        (0, node_assert_1.default)(0 < hook.unexpected);
        const fired = hook.unexpected;
        node_assert_1.default.strictEqual(await client.ListProvider().list(undefined, { throw: false }), undefined);
        (0, node_assert_1.default)(fired < hook.unexpected);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.DigitaloceanSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.ListProvider().list({ "auth_type": 1 }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.DIGITALOCEAN_TEST_LIVE;
        for (const op of ['list']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'list_provider.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "auth_type": { "a": true, "de": true, "h": "Auth Type", "n": "auth_type", "r": false, "sh": "Deprecated: read `auth_types`, since a provider may accept more than one credential kind.", "t": "`$STRING`", "key$": "auth_type", "index$": 0 }, "auth_types": { "a": true, "h": "Auth Types", "n": "auth_types", "r": false, "sh": "Credential kinds the provider accepts, sorted: none|oauth|`shared_api_key`|unknown|`user_oauth_app`|`user_token`.", "t": "`$ARRAY`", "key$": "auth_types", "index$": 1 }, "connection_parameters": { "a": true, "h": "Connection Parameters", "n": "connection_parameters", "r": false, "sh": "Non-sensitive values collected when creating a connection.", "t": "`$ARRAY`", "key$": "connection_parameters", "index$": 2 }, "credential_parameters": { "a": true, "h": "Credential Parameters", "n": "credential_parameters", "r": false, "sh": "Non-secret values collected when registering an API key provider credential.", "t": "`$ARRAY`", "key$": "credential_parameters", "index$": 3 }, "description": { "a": true, "h": "Description", "n": "description", "r": false, "sh": "Provider description.", "t": "`$STRING`", "key$": "description", "index$": 4 }, "display_name": { "a": true, "h": "Display Name", "n": "display_name", "r": false, "sh": "Human-readable provider name.", "t": "`$STRING`", "key$": "display_name", "index$": 5 }, "name": { "a": true, "h": "Name", "n": "name", "r": false, "sh": "Provider slug, used as provider when creating a connection or a provider credential.", "t": "`$STRING`", "key$": "name", "index$": 6 }, "oauth_client_setup_url": { "a": true, "h": "Oauth Client Setup Url", "n": "oauth_client_setup_url", "r": false, "sh": "HTTPS page at the provider where a team creates that OAuth client, such as its developer console or setup guide.", "t": "`$STRING`", "key$": "oauth_client_setup_url", "index$": 7 }, "oauth_redirect_url": { "a": true, "h": "Oauth Redirect Url", "n": "oauth_redirect_url", "r": false, "sh": "Callback URL a team must register with the provider when it creates its own OAuth client.", "t": "`$STRING`", "key$": "oauth_redirect_url", "index$": 8 }, "scopes": { "a": true, "h": "Scopes", "n": "scopes", "r": false, "sh": "The OAuth scopes a connection may request; a connection that requests none gets all of them.", "t": "`$ARRAY`", "key$": "scopes", "index$": 9 } }, "name": "list_provider", "op": { "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /v2/action-gateway/tools/providers", "source": "openapi3", "version": 2 }, "g": {}, "k": "http", "m": "GET", "o": "/v2/action-gateway/tools/providers", "q": {}, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "v2" }, { "lit": "action-gateway" }, { "lit": "tools" }, { "lit": "providers" }], "t": { "req": "`reqdata`", "res": "`body.providers`" }, "index$": 0 }], "key$": "list" } }, "relations": { "ancestors": [] }, "key$": "list_provider", "name__orig": "list_provider", "Name": "ListProvider", "name_": "list_provider", "name-": "list-provider", "NAME": "LIST_PROVIDER", "index$": 160 }, { "active": true, "entity": "list_provider", "key$": "BasicListProviderFlow", "kind": "basic", "name": "BasicListProviderFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": {}, "m": {}, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "list_provider_ref01" } }], "index$": 0 }] }, 'ListProvider', { "GET /v2/action-gateway/tools/providers": { "protocol": "http", "parameters": [] } }, { strict: LIVE_STRICT, t });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let list_provider_ref01_data = Object.values(setup.data.existing.list_provider)[0];
        // LIST
        const list_provider_ref01_ent = client.ListProvider();
        const list_provider_ref01_match = {};
        const list_provider_ref01_list = (await list_provider_ref01_ent.list(list_provider_ref01_match)).map((e) => e.data());
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
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/list_provider/ListProviderTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.DigitaloceanSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['list_provider01', 'list_provider02', 'list_provider03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'DIGITALOCEAN_TEST_LIST_PROVIDER_ENTID': idmap,
        'DIGITALOCEAN_TEST_LIVE': 'FALSE',
        'DIGITALOCEAN_TEST_EXPLAIN': 'FALSE',
        'DIGITALOCEAN_APIKEY': '',
    });
    idmap = env['DIGITALOCEAN_TEST_LIST_PROVIDER_ENTID'];
    const live = 'TRUE' === env.DIGITALOCEAN_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['DIGITALOCEAN_TEST_LIST_PROVIDER_ENTID'];
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
//# sourceMappingURL=ListProviderEntity.test.js.map