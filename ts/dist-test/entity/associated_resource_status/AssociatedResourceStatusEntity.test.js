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
(0, node_test_1.describe)('AssociatedResourceStatusEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when DIGITALOCEAN_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('DIGITALOCEAN_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.DigitaloceanSDK.test();
        const ent = testsdk.AssociatedResourceStatus();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.DigitaloceanSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.AssociatedResourceStatus().load({ "droplet_id": "x" }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.DIGITALOCEAN_TEST_LIVE;
        for (const op of []) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'associated_resource_status.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "completed_at": { "a": true, "fo": "date-time", "h": "Completed At", "n": "completed_at", "r": false, "sh": "A time value given in ISO8601 combined date and time format indicating when the requested action was completed.", "t": "`$STRING`", "key$": "completed_at", "index$": 0 }, "droplet": { "a": true, "h": "Droplet", "n": "droplet", "r": false, "sh": "An object containing information about a resource scheduled for deletion.", "t": "`$OBJECT`", "key$": "droplet", "index$": 1 }, "failures": { "a": true, "h": "Failures", "n": "failures", "r": false, "sh": "A count of the associated resources that failed to be destroyed, if any.", "t": "`$INTEGER`", "key$": "failures", "index$": 2 }, "resources": { "a": true, "h": "Resources", "n": "resources", "r": false, "sh": "An object containing additional information about resource related to a Droplet requested to be destroyed.", "t": "`$OBJECT`", "key$": "resources", "index$": 3 } }, "name": "associated_resource_status", "op": { "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /v2/droplets/{droplet_id}/destroy_with_associated_resources/status", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "ex": 3164444, "k": "param", "n": "droplet_id", "or": "droplet_id", "r": true, "t": "`$INTEGER`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/v2/droplets/{droplet_id}/destroy_with_associated_resources/status", "q": { "exist": ["droplet_id"] }, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "v2" }, { "lit": "droplets" }, { "var": "droplet_id" }, { "lit": "destroy_with_associated_resources" }, { "lit": "status" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "load" } }, "relations": { "ancestors": [["$.main.kit.entity.droplet"]] }, "key$": "associated_resource_status", "name__orig": "associated_resource_status", "Name": "AssociatedResourceStatus", "name_": "associated_resource_status", "name-": "associated-resource-status", "NAME": "ASSOCIATED_RESOURCE_STATUS", "index$": 115 }, { "active": true, "entity": "associated_resource_status", "key$": "BasicAssociatedResourceStatusFlow", "kind": "basic", "name": "BasicAssociatedResourceStatusFlow", "param": {}, "step": [{ "a": false, "d": {}, "i": { "ref": "associated_resource_status_ref01", "srcdatavar": "associated_resource_status_ref01_data", "suffix": "_dt0" }, "m": { "id": "associated_resource_status01" }, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-associated_resource_status_ref01" } }], "unreachable": true }] }, 'AssociatedResourceStatus', { "GET /v2/droplets/{droplet_id}/destroy_with_associated_resources/status": { "protocol": "http", "parameters": [{ "in": "path", "name": "droplet_id", "description": "A unique identifier for a Droplet instance.", "required": true, "schema": { "type": "integer", "minimum": 1 }, "example": 3164444, "x-ref": "#/components/parameters/droplet_id", "index$": 0 }] } }, { strict: LIVE_STRICT, t });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let associated_resource_status_ref01_data = Object.values(setup.data.existing.associated_resource_status)[0];
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
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/associated_resource_status/AssociatedResourceStatusTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.DigitaloceanSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['associated_resource_status01', 'associated_resource_status02', 'associated_resource_status03', 'droplet01', 'droplet02', 'droplet03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'DIGITALOCEAN_TEST_ASSOCIATED_RESOURCE_STATUS_ENTID': idmap,
        'DIGITALOCEAN_TEST_LIVE': 'FALSE',
        'DIGITALOCEAN_TEST_EXPLAIN': 'FALSE',
        'DIGITALOCEAN_APIKEY': '',
    });
    idmap = env['DIGITALOCEAN_TEST_ASSOCIATED_RESOURCE_STATUS_ENTID'];
    const live = 'TRUE' === env.DIGITALOCEAN_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['DIGITALOCEAN_TEST_ASSOCIATED_RESOURCE_STATUS_ENTID'];
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
//# sourceMappingURL=AssociatedResourceStatusEntity.test.js.map