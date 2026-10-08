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
(0, node_test_1.describe)('ImageActionEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when DIGITALOCEAN_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('DIGITALOCEAN_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.DigitaloceanSDK.test();
        const ent = testsdk.ImageAction();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.DigitaloceanSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.ImageAction().list({ "id": "x" }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.DIGITALOCEAN_TEST_LIVE;
        for (const op of []) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'image_action.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "completed_at": { "a": true, "fo": "date-time", "h": "Completed At", "n": "completed_at", "r": false, "sh": "A time value given in ISO8601 combined date and time format that represents when the action was completed.", "t": "`$STRING`", "key$": "completed_at", "index$": 0 }, "id": { "a": true, "h": "Id", "n": "id", "r": false, "sh": "A unique numeric ID that can be used to identify and reference an action.", "t": "`$INTEGER`", "key$": "id", "index$": 1 }, "region": { "a": true, "h": "Region", "n": "region", "r": true, "t": "`$OBJECT`", "key$": "region", "index$": 2 }, "region_slug": { "a": true, "h": "Region Slug", "n": "region_slug", "r": false, "sh": "A human-readable string that is used as a unique identifier for each region.", "t": "`$STRING`", "key$": "region_slug", "index$": 3 }, "resource_id": { "a": true, "h": "Resource Id", "n": "resource_id", "r": false, "sh": "A unique identifier for the resource that the action is associated with.", "t": "`$INTEGER`", "key$": "resource_id", "index$": 4 }, "resource_type": { "a": true, "h": "Resource Type", "n": "resource_type", "r": false, "sh": "The type of resource that the action is associated with.", "t": "`$STRING`", "key$": "resource_type", "index$": 5 }, "started_at": { "a": true, "fo": "date-time", "h": "Started At", "n": "started_at", "r": false, "sh": "A time value given in ISO8601 combined date and time format that represents when the action was initiated.", "t": "`$STRING`", "key$": "started_at", "index$": 6 }, "status": { "a": true, "h": "Status", "n": "status", "r": false, "sh": "The current status of the action.", "t": "`$STRING`", "key$": "status", "index$": 7 }, "type": { "a": true, "h": "Type", "n": "type", "r": false, "sh": "This is the type of action that the object represents.", "t": "`$STRING`", "key$": "type", "index$": 8 } }, "id": { "field": "id", "name": "id" }, "name": "image_action", "op": { "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /v2/images/{image_id}/actions", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "ex": 62137902, "k": "param", "n": "id", "or": "image_id", "r": true, "t": "`$INTEGER`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/v2/images/{image_id}/actions", "q": { "exist": ["id"] }, "r": { "param": { "image_id": "id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "v2" }, { "lit": "images" }, { "var": "id" }, { "lit": "actions" }], "t": { "req": "`reqdata`", "res": "`body.actions`" }, "index$": 0 }], "key$": "list" } }, "relations": { "ancestors": [] }, "key$": "image_action", "name__orig": "image_action", "Name": "ImageAction", "name_": "image_action", "name-": "image-action", "NAME": "IMAGE_ACTION", "index$": 154 }, { "active": true, "entity": "image_action", "key$": "BasicImageActionFlow", "kind": "basic", "name": "BasicImageActionFlow", "param": {}, "step": [{ "a": false, "d": {}, "i": {}, "m": { "image_id": "image01" }, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "image_action_ref01" } }], "unreachable": true }] }, 'ImageAction', { "GET /v2/images/{image_id}/actions": { "protocol": "http", "parameters": [{ "in": "path", "name": "image_id", "description": "A unique number that can be used to identify and reference a specific image.", "required": true, "schema": { "type": "integer" }, "example": 62137902, "x-ref": "#/components/parameters/image_id", "index$": 0 }] } }, { strict: LIVE_STRICT, t });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let image_action_ref01_data = Object.values(setup.data.existing.image_action)[0];
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
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/image_action/ImageActionTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.DigitaloceanSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['image_action01', 'image_action02', 'image_action03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'DIGITALOCEAN_TEST_IMAGE_ACTION_ENTID': idmap,
        'DIGITALOCEAN_TEST_LIVE': 'FALSE',
        'DIGITALOCEAN_TEST_EXPLAIN': 'FALSE',
        'DIGITALOCEAN_APIKEY': '',
    });
    idmap = env['DIGITALOCEAN_TEST_IMAGE_ACTION_ENTID'];
    const live = 'TRUE' === env.DIGITALOCEAN_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['DIGITALOCEAN_TEST_IMAGE_ACTION_ENTID'];
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
//# sourceMappingURL=ImageActionEntity.test.js.map