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
(0, node_test_1.describe)('AccessPointEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when DIGITALOCEAN_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('DIGITALOCEAN_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.DigitaloceanSDK.test();
        const ent = testsdk.AccessPoint();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.DigitaloceanSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.AccessPoint().list({ "share_id": 1 }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.DIGITALOCEAN_TEST_LIVE;
        for (const op of ['create', 'list', 'load', 'remove']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'access_point.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "access_policy": { "a": true, "h": "Access Policy", "n": "access_policy", "r": true, "sh": "Provider-agnostic NFS access policy for an access point.", "t": "`$OBJECT`", "key$": "access_policy", "index$": 0 }, "created_at": { "a": true, "fo": "date-time", "h": "Created At", "n": "created_at", "r": true, "ro": true, "sh": "The timestamp when the access point was created.", "t": "`$STRING`", "key$": "created_at", "index$": 1 }, "id": { "a": true, "fo": "uuid", "h": "Id", "n": "id", "r": true, "ro": true, "sh": "The unique identifier of the access point.", "t": "`$STRING`", "key$": "id", "index$": 2 }, "is_default": { "a": true, "h": "Is Default", "n": "is_default", "r": true, "ro": true, "sh": "Whether this is the share's default access point.", "t": "`$BOOLEAN`", "key$": "is_default", "index$": 3 }, "name": { "a": true, "h": "Name", "n": "name", "r": true, "sh": "The human-readable name of the access point.", "t": "`$STRING`", "key$": "name", "index$": 4 }, "path": { "a": true, "h": "Path", "n": "path", "r": true, "sh": "The export sub-path for this access point (always starts with `/`).", "t": "`$STRING`", "key$": "path", "index$": 5 }, "share_id": { "a": true, "fo": "uuid", "h": "Share Id", "n": "share_id", "r": true, "ro": true, "sh": "The unique identifier of the share this access point belongs to.", "t": "`$STRING`", "key$": "share_id", "index$": 6 }, "status": { "a": true, "h": "Status", "n": "status", "r": true, "ro": true, "sh": "The current lifecycle status of an access point.", "t": "`$STRING`", "key$": "status", "index$": 7 }, "updated_at": { "a": true, "h": "Updated At", "n": "updated_at", "r": true, "ro": true, "sh": "The timestamp when the access point was last updated.", "t": "`$STRING`", "key$": "updated_at", "index$": 8 }, "vpc_id": { "a": true, "h": "Vpc Id", "n": "vpc_id", "op": { "create": { "req": true, "type": "`$STRING`" } }, "r": false, "sh": "The VPC this access point is pinned to.", "t": "`$STRING`", "key$": "vpc_id", "index$": 9 } }, "id": { "field": "id", "name": "id" }, "name": "access_point", "op": { "create": { "input": "data", "name": "create", "points": [{ "a": true, "co": { "id": "POST /v2/nfs/shares/{share_id}/access_points", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "ex": "baf4827c-6fa9-456f-9dbd-9ddfcacd0720", "k": "param", "n": "share_id", "or": "share_id", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "POST", "o": "/v2/nfs/shares/{share_id}/access_points", "q": { "exist": ["share_id"] }, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "v2" }, { "lit": "nfs" }, { "lit": "shares" }, { "var": "share_id" }, { "lit": "access_points" }], "t": { "req": "`reqdata`", "res": "`body.access_point`" }, "index$": 0 }], "key$": "create" }, "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /v2/nfs/shares/{share_id}/access_points", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "ex": "baf4827c-6fa9-456f-9dbd-9ddfcacd0720", "k": "param", "n": "share_id", "or": "share_id", "r": true, "t": "`$STRING`", "index$": 0 }], "query": [{ "a": true, "ex": "ACCESS_POINT_ACTIVE", "k": "query", "n": "status", "or": "status", "r": false, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/v2/nfs/shares/{share_id}/access_points", "q": { "exist": ["share_id"] }, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "v2" }, { "lit": "nfs" }, { "lit": "shares" }, { "var": "share_id" }, { "lit": "access_points" }], "t": { "req": "`reqdata`", "res": "`body.access_points`" }, "index$": 0 }], "key$": "list" }, "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /v2/nfs/access_points/{access_point_id}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "ex": "becd9f04-8afa-4ccd-b03e-9676447df603", "k": "param", "n": "id", "or": "access_point_id", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/v2/nfs/access_points/{access_point_id}", "q": { "exist": ["id"] }, "r": { "param": { "access_point_id": "id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "v2" }, { "lit": "nfs" }, { "lit": "access_points" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body.access_point`" }, "index$": 0 }], "key$": "load" }, "remove": { "input": "data", "name": "remove", "points": [{ "a": true, "co": { "id": "DELETE /v2/nfs/access_points/{access_point_id}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "ex": "becd9f04-8afa-4ccd-b03e-9676447df603", "k": "param", "n": "id", "or": "access_point_id", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "DELETE", "o": "/v2/nfs/access_points/{access_point_id}", "q": { "exist": ["id"] }, "r": { "param": { "access_point_id": "id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "v2" }, { "lit": "nfs" }, { "lit": "access_points" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body.access_point`" }, "index$": 0 }], "key$": "remove" } }, "relations": { "ancestors": [] }, "key$": "access_point", "name__orig": "access_point", "Name": "AccessPoint", "name_": "access_point", "name-": "access-point", "NAME": "ACCESS_POINT", "index$": 0 }, { "active": true, "entity": "access_point", "key$": "BasicAccessPointFlow", "kind": "basic", "name": "BasicAccessPointFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "access_point_ref01" }, "m": { "share_id": "share01" }, "o": "create", "s": [], "v": [], "index$": 0 }, { "a": true, "d": {}, "i": {}, "m": { "share_id": "share01" }, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "access_point_ref01" } }], "index$": 1 }, { "a": true, "d": {}, "i": { "ref": "access_point_ref01", "srcdatavar": "access_point_ref01_data", "suffix": "_dt0" }, "m": { "id": "access_point01" }, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-access_point_ref01" } }], "index$": 2 }, { "a": true, "d": {}, "i": { "ref": "access_point_ref01", "suffix": "_rm0" }, "m": { "id": "access_point01" }, "o": "remove", "s": [], "v": [], "index$": 3 }, { "a": true, "d": {}, "i": { "suffix": "_rt0" }, "m": { "share_id": "share01" }, "o": "list", "s": [], "v": [{ "apply": "ItemNotExists", "def": { "ref": "access_point_ref01" } }], "index$": 4 }] }, 'AccessPoint', { "POST /v2/nfs/shares/{share_id}/access_points": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "description": "Payload for creating a new access point on a share.", "properties": { "name": { "type": "string", "description": "The name for the access point. Must be unique per share. Must be 2–63\ncharacters and match `^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9]$`.\nThe name `default` is reserved (case-insensitive) for the implicit default\naccess point created with each share.\n", "example": "other-vpc", "key$": "name" }, "path": { "type": "string", "description": "The export sub-path. Must start with `/`, must not be exactly `/` (reserved\nfor the default access point), must be at most 1024 characters, may contain\nonly alphanumerics, `-`, `_`, `.`, and `/`, and must not contain `..` path\nsegments.\n", "example": "/other-vpc", "key$": "path" }, "access_policy": { "type": "object", "description": "Provider-agnostic NFS access policy for an access point. Network CIDRs are\nmanaged by attach, detach, and managed-access workflows and are not part of\nthis policy.\n", "properties": { "anonuid": { "type": "integer", "description": "UID used for squashed users. Currently only 65534 is supported.", "example": 65534 }, "anongid": { "type": "integer", "description": "GID used for squashed users. Currently only 65534 is supported.", "example": 65534 }, "protocols": { "type": "array", "items": { "type": "string", "enum": [] }, "description": "Allowed NFS protocols for this export.", "example": ["NFS4", "NFS"] }, "squash_config": { "type": "string", "enum": ["NO_SQUASH", "ROOT_SQUASH", "ALL_SQUASH"], "description": "The squash mode applied to the access point export.", "example": "ROOT_SQUASH" }, "identity_enforcement_enabled": { "type": "boolean", "description": "Whether identity enforcement is enabled for this export.", "example": false } }, "required": ["anonuid", "anongid", "protocols", "squash_config", "identity_enforcement_enabled"], "x-ref": "#/components/schemas/access_policy", "key$": "access_policy" }, "vpc_id": { "type": "string", "description": "Required. The VPC this access point will be pinned to. A storage gateway is\nprovisioned (or reused) in this VPC, and the access point becomes mountable from\nthis VPC regardless of whether the parent share is currently attached to it.\n", "example": "3f34cdb2-1e4f-4100-b5c7-f55f2762085f", "key$": "vpc_id" } }, "required": ["name", "path", "access_policy", "vpc_id"], "x-ref": "#/components/schemas/access_point_request", "index$": 1 }, "examples": { "Basic Access Point": { "value": { "name": "other-vpc", "path": "/other-vpc", "vpc_id": "3f34cdb2-1e4f-4100-b5c7-f55f2762085f", "access_policy": { "anonuid": 65534, "anongid": 65534, "protocols": ["NFS4", "NFS"], "squash_config": "ROOT_SQUASH", "identity_enforcement_enabled": false } } } } } } }, "parameters": [{ "in": "path", "name": "share_id", "description": "The unique identifier of the NFS share.", "required": true, "schema": { "type": "string", "format": "uuid" }, "example": "baf4827c-6fa9-456f-9dbd-9ddfcacd0720", "x-ref": "#/components/parameters/share_id_path", "index$": 0 }] }, "GET /v2/nfs/shares/{share_id}/access_points": { "protocol": "http", "parameters": [{ "in": "path", "name": "share_id", "description": "The unique identifier of the NFS share.", "required": true, "schema": { "type": "string", "format": "uuid" }, "example": "baf4827c-6fa9-456f-9dbd-9ddfcacd0720", "x-ref": "#/components/parameters/share_id_path", "index$": 0 }, { "name": "status", "in": "query", "required": false, "schema": { "type": "string", "enum": ["ACCESS_POINT_CREATING", "ACCESS_POINT_ACTIVE", "ACCESS_POINT_FAILED", "ACCESS_POINT_DELETED"] }, "description": "Filter access points by status.", "example": "ACCESS_POINT_ACTIVE", "index$": 1 }] }, "GET /v2/nfs/access_points/{access_point_id}": { "protocol": "http", "parameters": [{ "in": "path", "name": "access_point_id", "description": "The unique identifier of the NFS access point.", "required": true, "schema": { "type": "string", "format": "uuid" }, "example": "becd9f04-8afa-4ccd-b03e-9676447df603", "x-ref": "#/components/parameters/access_point_id", "index$": 0 }] }, "DELETE /v2/nfs/access_points/{access_point_id}": { "protocol": "http", "parameters": [{ "in": "path", "name": "access_point_id", "description": "The unique identifier of the NFS access point.", "required": true, "schema": { "type": "string", "format": "uuid" }, "example": "becd9f04-8afa-4ccd-b03e-9676447df603", "x-ref": "#/components/parameters/access_point_id", "index$": 0 }] } }, { strict: LIVE_STRICT, t });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const access_point_ref01_ent = client.AccessPoint();
        let access_point_ref01_data = setup.data.new.access_point['access_point_ref01'];
        access_point_ref01_data['share_id'] = setup.idmap['share01'];
        access_point_ref01_data = (await access_point_ref01_ent.create(access_point_ref01_data)).data();
        (0, node_assert_1.default)(null != access_point_ref01_data.id);
        // LIST
        const access_point_ref01_match = {};
        access_point_ref01_match['share_id'] = setup.idmap['share01'];
        const access_point_ref01_list = (await access_point_ref01_ent.list(access_point_ref01_match)).map((e) => e.data());
        (0, node_assert_1.default)(!isempty(select(access_point_ref01_list, { id: access_point_ref01_data.id })));
        // LOAD
        const access_point_ref01_match_dt0 = {};
        access_point_ref01_match_dt0.id = access_point_ref01_data.id;
        const access_point_ref01_data_dt0 = (await access_point_ref01_ent.load(access_point_ref01_match_dt0)).data();
        (0, node_assert_1.default)(access_point_ref01_data_dt0.id === access_point_ref01_data.id);
        // REMOVE
        const access_point_ref01_match_rm0 = { id: access_point_ref01_data.id };
        await access_point_ref01_ent.remove(access_point_ref01_match_rm0);
        // LIST
        const access_point_ref01_match_rt0 = {};
        access_point_ref01_match_rt0['share_id'] = setup.idmap['share01'];
        const access_point_ref01_list_rt0 = (await access_point_ref01_ent.list(access_point_ref01_match_rt0)).map((e) => e.data());
        (0, node_assert_1.default)(isempty(select(access_point_ref01_list_rt0, { id: access_point_ref01_data.id })));
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
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/access_point/AccessPointTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.DigitaloceanSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['access_point01', 'access_point02', 'access_point03', 'share01'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'DIGITALOCEAN_TEST_ACCESS_POINT_ENTID': idmap,
        'DIGITALOCEAN_TEST_LIVE': 'FALSE',
        'DIGITALOCEAN_TEST_EXPLAIN': 'FALSE',
        'DIGITALOCEAN_APIKEY': '',
    });
    idmap = env['DIGITALOCEAN_TEST_ACCESS_POINT_ENTID'];
    const live = 'TRUE' === env.DIGITALOCEAN_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['DIGITALOCEAN_TEST_ACCESS_POINT_ENTID'];
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
//# sourceMappingURL=AccessPointEntity.test.js.map