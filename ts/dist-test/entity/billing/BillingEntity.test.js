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
(0, node_test_1.describe)('BillingEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when DIGITALOCEAN_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('DIGITALOCEAN_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.DigitaloceanSDK.test();
        const ent = testsdk.Billing();
        (0, node_assert_1.default)(null != ent);
    });
    class FailHook extends __1.BaseFeature {
        name = 'failhook';
        version = '0.0.1';
        active = true;
        unexpected = 0;
        init() { }
        PreSpec() { throw new Error('billing hook failed'); }
        PreUnexpected() { this.unexpected++; }
    }
    (0, node_test_1.test)('stream-error', async () => {
        const offline = { net: { offline: true } };
        await node_assert_1.default.rejects(async () => {
            for await (const _item of __1.DigitaloceanSDK.test(offline).Billing().stream('list')) { }
        }, /offline/);
        for await (const _item of __1.DigitaloceanSDK.test(offline).Billing()
            .stream('list', undefined, { ctrl: { throw: false } })) { }
        if (null != __1.config.feature?.rbac) {
            const denied = __1.DigitaloceanSDK.test(undefined, { feature: { rbac: { active: true, deny: true } } });
            await node_assert_1.default.rejects(async () => {
                for await (const _item of denied.Billing().stream('list')) { }
            }, (err) => 'rbac_denied' === err.code);
        }
    });
    (0, node_test_1.test)('stream-ctrl', async () => {
        const explain = {};
        const ctrl = { explain };
        for await (const _item of __1.DigitaloceanSDK.test().Billing().stream('list', undefined, { ctrl })) { }
        node_assert_1.default.deepStrictEqual(Object.keys(ctrl), ['explain']);
        (0, node_assert_1.default)(explain === ctrl.explain && 0 < Object.keys(explain).length);
    });
    (0, node_test_1.test)('unexpected', async () => {
        const hook = new FailHook();
        const client = new __1.DigitaloceanSDK({ feature: { test: { active: true } }, extend: [hook] });
        await node_assert_1.default.rejects(client.Billing().list(), /hook failed/);
        (0, node_assert_1.default)(0 < hook.unexpected);
        const fired = hook.unexpected;
        node_assert_1.default.strictEqual(await client.Billing().list(undefined, { throw: false }), undefined);
        (0, node_assert_1.default)(fired < hook.unexpected);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.DigitaloceanSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.Billing().list({ "amount": 1 }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.DIGITALOCEAN_TEST_LIVE;
        for (const op of ['list']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'billing.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "amount": { "a": true, "h": "Amount", "n": "amount", "r": false, "sh": "Amount of the billing history entry.", "t": "`$STRING`", "key$": "amount", "index$": 0 }, "current_page": { "a": true, "h": "Current Page", "n": "current_page", "r": true, "sh": "Current page number", "t": "`$INTEGER`", "key$": "current_page", "index$": 1 }, "data_points": { "a": true, "h": "Data Points", "n": "data_points", "r": true, "sh": "Array of billing data points, which are day-over-day changes in billing resource usage based on nightly invoice item estimates, for the requested period", "t": "`$ARRAY`", "key$": "data_points", "index$": 2 }, "date": { "a": true, "fo": "date-time", "h": "Date", "n": "date", "r": false, "sh": "Time the billing history entry occurred.", "t": "`$STRING`", "key$": "date", "index$": 3 }, "description": { "a": true, "h": "Description", "n": "description", "r": false, "sh": "Description of the billing history entry.", "t": "`$STRING`", "key$": "description", "index$": 4 }, "id": { "a": true, "h": "Id", "n": "id", "r": false, "t": "`$STRING`", "key$": "id", "index$": 5 }, "invoice_id": { "a": true, "h": "Invoice Id", "n": "invoice_id", "r": false, "sh": "ID of the invoice associated with the billing history entry, if applicable.", "t": "`$STRING`", "key$": "invoice_id", "index$": 6 }, "invoice_items": { "a": true, "h": "Invoice Items", "n": "invoice_items", "r": false, "t": "`$ARRAY`", "key$": "invoice_items", "index$": 7 }, "invoice_period": { "a": true, "h": "Invoice Period", "n": "invoice_period", "r": false, "sh": "Billing period of usage for which the invoice is issued, in `YYYY-MM` format.", "t": "`$STRING`", "key$": "invoice_period", "index$": 8 }, "invoice_uuid": { "a": true, "h": "Invoice Uuid", "n": "invoice_uuid", "r": false, "sh": "UUID of the invoice associated with the billing history entry, if applicable.", "t": "`$STRING`", "key$": "invoice_uuid", "index$": 9 }, "links": { "a": true, "h": "Links", "n": "links", "r": false, "t": "`$OBJECT`", "union": { "branches": 3, "count": 1, "depth": 2 }, "key$": "links", "index$": 10 }, "meta": { "a": true, "h": "Meta", "n": "meta", "r": true, "t": "`$ANY`", "key$": "meta", "index$": 11 }, "total_items": { "a": true, "h": "Total Items", "n": "total_items", "r": true, "sh": "Total number of items available across all pages", "t": "`$INTEGER`", "key$": "total_items", "index$": 12 }, "total_pages": { "a": true, "h": "Total Pages", "n": "total_pages", "r": true, "sh": "Total number of pages available", "t": "`$INTEGER`", "key$": "total_pages", "index$": 13 }, "type": { "a": true, "h": "Type", "n": "type", "r": false, "sh": "Type of billing history entry.", "t": "`$STRING`", "key$": "type", "index$": 14 }, "updated_at": { "a": true, "h": "Updated At", "n": "updated_at", "r": false, "sh": "Time the invoice was last updated.", "t": "`$STRING`", "key$": "updated_at", "index$": 15 } }, "id": { "field": "id", "name": "id", "parts": ["start_date", "end_date"], "sep": "/" }, "name": "billing", "op": { "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /v2/customers/my/billing_history", "source": "openapi3", "version": 2 }, "g": {}, "k": "http", "m": "GET", "o": "/v2/customers/my/billing_history", "q": {}, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "v2" }, { "lit": "customers" }, { "lit": "my" }, { "lit": "billing_history" }], "t": { "req": "`reqdata`", "res": "`body.billing_history`" }, "index$": 0 }, { "a": true, "co": { "id": "GET /v2/customers/my/invoices", "source": "openapi3", "version": 2 }, "g": { "query": [{ "a": true, "ex": 1, "k": "query", "n": "page", "or": "page", "r": false, "t": "`$INTEGER`", "index$": 0 }, { "a": true, "ex": 2, "k": "query", "n": "per_page", "or": "per_page", "r": false, "t": "`$INTEGER`", "index$": 1 }] }, "k": "http", "m": "GET", "o": "/v2/customers/my/invoices", "q": {}, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "v2" }, { "lit": "customers" }, { "lit": "my" }, { "lit": "invoices" }], "t": { "req": "`reqdata`", "res": "`body.invoices`" }, "index$": 1 }], "key$": "list" }, "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /v2/billing/{account_urn}/insights/{start_date}/{end_date}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "ex": "do:team:12345678-1234-1234-1234-123456789012", "k": "param", "n": "account_urn", "or": "account_urn", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "ex": "2025-01-31", "k": "param", "n": "end_date", "or": "end_date", "r": true, "t": "`$STRING`", "index$": 1 }, { "a": true, "ex": "2025-01-01", "k": "param", "n": "start_date", "or": "start_date", "r": true, "t": "`$STRING`", "index$": 2 }], "query": [{ "a": true, "ex": 1, "k": "query", "n": "page", "or": "page", "r": false, "t": "`$INTEGER`", "index$": 0 }, { "a": true, "ex": 2, "k": "query", "n": "per_page", "or": "per_page", "r": false, "t": "`$INTEGER`", "index$": 1 }] }, "k": "http", "m": "GET", "o": "/v2/billing/{account_urn}/insights/{start_date}/{end_date}", "q": { "exist": ["account_urn", "end_date", "start_date"] }, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "v2" }, { "lit": "billing" }, { "var": "account_urn" }, { "lit": "insights" }, { "var": "start_date" }, { "var": "end_date" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }, { "a": true, "co": { "id": "GET /v2/customers/my/invoices/{invoice_uuid}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "ex": "22737513-0ea7-4206-8ceb-98a575af7681", "k": "param", "n": "invoice_uuid", "or": "invoice_uuid", "r": true, "t": "`$STRING`", "index$": 0 }], "query": [{ "a": true, "ex": 1, "k": "query", "n": "page", "or": "page", "r": false, "t": "`$INTEGER`", "index$": 0 }, { "a": true, "ex": 2, "k": "query", "n": "per_page", "or": "per_page", "r": false, "t": "`$INTEGER`", "index$": 1 }] }, "k": "http", "m": "GET", "o": "/v2/customers/my/invoices/{invoice_uuid}", "q": { "exist": ["invoice_uuid"] }, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "v2" }, { "lit": "customers" }, { "lit": "my" }, { "lit": "invoices" }, { "var": "invoice_uuid" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 1 }, { "a": true, "co": { "id": "GET /v2/customers/my/invoices/{invoice_uuid}/csv", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "ex": "22737513-0ea7-4206-8ceb-98a575af7681", "k": "param", "n": "invoice_uuid", "or": "invoice_uuid", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/v2/customers/my/invoices/{invoice_uuid}/csv", "q": { "exist": ["invoice_uuid"] }, "r": {}, "rs": { "kind": "raw", "media": "text/csv" }, "s": [{ "lit": "v2" }, { "lit": "customers" }, { "lit": "my" }, { "lit": "invoices" }, { "var": "invoice_uuid" }, { "lit": "csv" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 2 }, { "a": true, "co": { "id": "GET /v2/customers/my/invoices/{invoice_uuid}/pdf", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "ex": "22737513-0ea7-4206-8ceb-98a575af7681", "k": "param", "n": "invoice_uuid", "or": "invoice_uuid", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/v2/customers/my/invoices/{invoice_uuid}/pdf", "q": { "exist": ["invoice_uuid"] }, "r": {}, "rs": { "binary": true, "kind": "raw", "media": "application/pdf" }, "s": [{ "lit": "v2" }, { "lit": "customers" }, { "lit": "my" }, { "lit": "invoices" }, { "var": "invoice_uuid" }, { "lit": "pdf" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 3 }], "key$": "load" } }, "relations": { "ancestors": [["$.main.kit.entity.insight"]] }, "key$": "billing", "name__orig": "billing", "Name": "Billing", "name_": "billing", "name-": "billing", "NAME": "BILLING", "index$": 124 }, { "active": true, "entity": "billing", "key$": "BasicBillingFlow", "kind": "basic", "name": "BasicBillingFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": {}, "m": {}, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "billing_ref01" } }], "index$": 0 }, { "a": false, "d": {}, "i": { "ref": "billing_ref01", "srcdatavar": "billing_ref01_data", "suffix": "_dt0" }, "m": { "id": "billing01" }, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-billing_ref01" } }], "unreachable": true }] }, 'Billing', { "GET /v2/customers/my/billing_history": { "protocol": "http", "parameters": [] }, "GET /v2/customers/my/invoices": { "protocol": "http", "parameters": [{ "in": "query", "name": "per_page", "required": false, "description": "Number of items returned per page", "schema": { "type": "integer", "minimum": 1, "default": 20, "maximum": 200 }, "example": 2, "x-ref": "#/components/parameters/parameters_per_page", "index$": 0 }, { "in": "query", "name": "page", "required": false, "description": "Which 'page' of paginated results to return.", "schema": { "type": "integer", "minimum": 1, "default": 1 }, "example": 1, "x-ref": "#/components/parameters/page", "index$": 1 }] }, "GET /v2/billing/{account_urn}/insights/{start_date}/{end_date}": { "protocol": "http", "parameters": [{ "name": "account_urn", "description": "URN of the customer account, can be a team (do:team:uuid) or an organization (do:teamgroup:uuid)", "in": "path", "schema": { "type": "string" }, "example": "do:team:12345678-1234-1234-1234-123456789012", "required": true, "x-ref": "#/components/parameters/account_urn", "index$": 0 }, { "name": "start_date", "description": "Start date for billing insights in YYYY-MM-DD format", "in": "path", "schema": { "type": "string", "format": "date" }, "example": "2025-01-01", "required": true, "x-ref": "#/components/parameters/start_date", "index$": 1 }, { "name": "end_date", "description": "End date for billing insights in YYYY-MM-DD format. Must be within 31 days of start_date", "in": "path", "schema": { "type": "string", "format": "date" }, "example": "2025-01-31", "required": true, "x-ref": "#/components/parameters/end_date", "index$": 2 }, { "in": "query", "name": "per_page", "required": false, "description": "Number of items returned per page", "schema": { "type": "integer", "minimum": 1, "default": 20, "maximum": 200 }, "example": 2, "x-ref": "#/components/parameters/parameters_per_page", "index$": 3 }, { "in": "query", "name": "page", "required": false, "description": "Which 'page' of paginated results to return.", "schema": { "type": "integer", "minimum": 1, "default": 1 }, "example": 1, "x-ref": "#/components/parameters/page", "index$": 4 }] }, "GET /v2/customers/my/invoices/{invoice_uuid}": { "protocol": "http", "parameters": [{ "name": "invoice_uuid", "description": "UUID of the invoice", "in": "path", "schema": { "type": "string" }, "example": "22737513-0ea7-4206-8ceb-98a575af7681", "required": true, "x-ref": "#/components/parameters/invoice_uuid", "index$": 0 }, { "in": "query", "name": "per_page", "required": false, "description": "Number of items returned per page", "schema": { "type": "integer", "minimum": 1, "default": 20, "maximum": 200 }, "example": 2, "x-ref": "#/components/parameters/parameters_per_page", "index$": 1 }, { "in": "query", "name": "page", "required": false, "description": "Which 'page' of paginated results to return.", "schema": { "type": "integer", "minimum": 1, "default": 1 }, "example": 1, "x-ref": "#/components/parameters/page", "index$": 2 }] }, "GET /v2/customers/my/invoices/{invoice_uuid}/csv": { "protocol": "http", "parameters": [{ "name": "invoice_uuid", "description": "UUID of the invoice", "in": "path", "schema": { "type": "string" }, "example": "22737513-0ea7-4206-8ceb-98a575af7681", "required": true, "x-ref": "#/components/parameters/invoice_uuid", "index$": 0 }] }, "GET /v2/customers/my/invoices/{invoice_uuid}/pdf": { "protocol": "http", "parameters": [{ "name": "invoice_uuid", "description": "UUID of the invoice", "in": "path", "schema": { "type": "string" }, "example": "22737513-0ea7-4206-8ceb-98a575af7681", "required": true, "x-ref": "#/components/parameters/invoice_uuid", "index$": 0 }] } }, { strict: LIVE_STRICT, t });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let billing_ref01_data = Object.values(setup.data.existing.billing)[0];
        // LIST
        const billing_ref01_ent = client.Billing();
        const billing_ref01_match = {};
        const billing_ref01_list = (await billing_ref01_ent.list(billing_ref01_match)).map((e) => e.data());
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
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/billing/BillingTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.DigitaloceanSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['billing01', 'billing02', 'billing03', 'insight01', 'insight02', 'insight03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'DIGITALOCEAN_TEST_BILLING_ENTID': idmap,
        'DIGITALOCEAN_TEST_LIVE': 'FALSE',
        'DIGITALOCEAN_TEST_EXPLAIN': 'FALSE',
        'DIGITALOCEAN_APIKEY': '',
    });
    idmap = env['DIGITALOCEAN_TEST_BILLING_ENTID'];
    const live = 'TRUE' === env.DIGITALOCEAN_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['DIGITALOCEAN_TEST_BILLING_ENTID'];
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
//# sourceMappingURL=BillingEntity.test.js.map