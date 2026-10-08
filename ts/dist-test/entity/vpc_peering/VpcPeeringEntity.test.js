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
(0, node_test_1.describe)('VpcPeeringEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when DIGITALOCEAN_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('DIGITALOCEAN_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.DigitaloceanSDK.test();
        const ent = testsdk.VpcPeering();
        (0, node_assert_1.default)(null != ent);
    });
    class FailHook extends __1.BaseFeature {
        name = 'failhook';
        version = '0.0.1';
        active = true;
        unexpected = 0;
        init() { }
        PreSpec() { throw new Error('vpc_peering hook failed'); }
        PreUnexpected() { this.unexpected++; }
    }
    (0, node_test_1.test)('stream-error', async () => {
        const offline = { net: { offline: true } };
        await node_assert_1.default.rejects(async () => {
            for await (const _item of __1.DigitaloceanSDK.test(offline).VpcPeering().stream('list')) { }
        }, /offline/);
        for await (const _item of __1.DigitaloceanSDK.test(offline).VpcPeering()
            .stream('list', undefined, { ctrl: { throw: false } })) { }
        if (null != __1.config.feature?.rbac) {
            const denied = __1.DigitaloceanSDK.test(undefined, { feature: { rbac: { active: true, deny: true } } });
            await node_assert_1.default.rejects(async () => {
                for await (const _item of denied.VpcPeering().stream('list')) { }
            }, (err) => 'rbac_denied' === err.code);
        }
    });
    (0, node_test_1.test)('stream-ctrl', async () => {
        const explain = {};
        const ctrl = { explain };
        for await (const _item of __1.DigitaloceanSDK.test().VpcPeering().stream('list', undefined, { ctrl })) { }
        node_assert_1.default.deepStrictEqual(Object.keys(ctrl), ['explain']);
        (0, node_assert_1.default)(explain === ctrl.explain && 0 < Object.keys(explain).length);
    });
    (0, node_test_1.test)('unexpected', async () => {
        const hook = new FailHook();
        const client = new __1.DigitaloceanSDK({ feature: { test: { active: true } }, extend: [hook] });
        await node_assert_1.default.rejects(client.VpcPeering().list(), /hook failed/);
        (0, node_assert_1.default)(0 < hook.unexpected);
        const fired = hook.unexpected;
        node_assert_1.default.strictEqual(await client.VpcPeering().list(undefined, { throw: false }), undefined);
        (0, node_assert_1.default)(fired < hook.unexpected);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.DigitaloceanSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.VpcPeering().list({ "page": "x" }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.DIGITALOCEAN_TEST_LIVE;
        for (const op of ['create', 'list', 'update', 'load', 'remove']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'vpc_peering.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "created_at": { "a": true, "fo": "date-time", "h": "Created At", "n": "created_at", "r": false, "ro": true, "sh": "A time value given in ISO8601 combined date and time format.", "t": "`$STRING`", "key$": "created_at", "index$": 0 }, "id": { "a": true, "fo": "uuid", "h": "Id", "n": "id", "r": false, "ro": true, "sh": "A unique ID that can be used to identify and reference the VPC peering.", "t": "`$STRING`", "key$": "id", "index$": 1 }, "name": { "a": true, "h": "Name", "n": "name", "op": { "create": { "req": true, "type": "`$STRING`" }, "update": { "req": true, "type": "`$STRING`" } }, "r": false, "sh": "The name of the VPC peering.", "t": "`$STRING`", "key$": "name", "index$": 2 }, "status": { "a": true, "h": "Status", "n": "status", "r": false, "ro": true, "sh": "The current status of the VPC peering.", "t": "`$STRING`", "key$": "status", "index$": 3 }, "vpc_ids": { "a": true, "h": "Vpc Ids", "n": "vpc_ids", "op": { "create": { "req": true, "type": "`$ARRAY`" } }, "r": false, "sh": "An array of the two peered VPCs IDs.", "t": "`$ARRAY`", "key$": "vpc_ids", "index$": 4 } }, "id": { "field": "id", "name": "id" }, "name": "vpc_peering", "op": { "create": { "input": "data", "name": "create", "points": [{ "a": true, "co": { "id": "POST /v2/vpc_peerings", "source": "openapi3", "version": 2 }, "g": {}, "k": "http", "m": "POST", "o": "/v2/vpc_peerings", "q": {}, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "v2" }, { "lit": "vpc_peerings" }], "t": { "req": "`reqdata`", "res": "`body.vpc_peering`" }, "index$": 0 }], "key$": "create" }, "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /v2/vpc_peerings", "source": "openapi3", "version": 2 }, "g": { "query": [{ "a": true, "ex": 1, "k": "query", "n": "page", "or": "page", "r": false, "t": "`$INTEGER`", "index$": 0 }, { "a": true, "ex": 2, "k": "query", "n": "per_page", "or": "per_page", "r": false, "t": "`$INTEGER`", "index$": 1 }, { "a": true, "ex": "nyc3", "k": "query", "n": "region", "or": "region", "r": false, "t": "`$STRING`", "index$": 2 }] }, "k": "http", "m": "GET", "o": "/v2/vpc_peerings", "q": {}, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "v2" }, { "lit": "vpc_peerings" }], "t": { "req": "`reqdata`", "res": "`body.vpc_peerings`" }, "index$": 0 }], "key$": "list" }, "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /v2/vpc_peerings/{vpc_peering_id}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "ex": "5a4981aa-9653-4bd1-bef5-d6bff52042e4", "k": "param", "n": "id", "or": "vpc_peering_id", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/v2/vpc_peerings/{vpc_peering_id}", "q": { "exist": ["id"] }, "r": { "param": { "vpc_peering_id": "id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "v2" }, { "lit": "vpc_peerings" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body.vpc_peering`" }, "index$": 0 }], "key$": "load" }, "remove": { "input": "data", "name": "remove", "points": [{ "a": true, "co": { "id": "DELETE /v2/vpc_peerings/{vpc_peering_id}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "ex": "5a4981aa-9653-4bd1-bef5-d6bff52042e4", "k": "param", "n": "id", "or": "vpc_peering_id", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "DELETE", "o": "/v2/vpc_peerings/{vpc_peering_id}", "q": { "exist": ["id"] }, "r": { "param": { "vpc_peering_id": "id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "v2" }, { "lit": "vpc_peerings" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body.vpc_peering`" }, "index$": 0 }], "key$": "remove" }, "update": { "input": "data", "name": "update", "points": [{ "a": true, "co": { "id": "PATCH /v2/vpc_peerings/{vpc_peering_id}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "ex": "5a4981aa-9653-4bd1-bef5-d6bff52042e4", "k": "param", "n": "id", "or": "vpc_peering_id", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "PATCH", "o": "/v2/vpc_peerings/{vpc_peering_id}", "q": { "exist": ["id"] }, "r": { "param": { "vpc_peering_id": "id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "v2" }, { "lit": "vpc_peerings" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body.vpc_peering`" }, "index$": 0 }], "key$": "update" } }, "relations": { "ancestors": [] }, "key$": "vpc_peering", "name__orig": "vpc_peering", "Name": "VpcPeering", "name_": "vpc_peering", "name-": "vpc-peering", "NAME": "VPC_PEERING", "index$": 223 }, { "active": true, "entity": "vpc_peering", "key$": "BasicVpcPeeringFlow", "kind": "basic", "name": "BasicVpcPeeringFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "vpc_peering_ref01" }, "m": {}, "o": "create", "s": [], "v": [], "index$": 0 }, { "a": true, "d": {}, "i": {}, "m": {}, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "vpc_peering_ref01" } }], "index$": 1 }, { "a": true, "d": {}, "i": { "ref": "vpc_peering_ref01", "srcdatavar": "vpc_peering_ref01_data", "suffix": "_up0", "textfield": "name" }, "m": {}, "o": "update", "s": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-vpc_peering_ref01" } }], "v": [], "index$": 2 }, { "a": true, "d": {}, "i": { "ref": "vpc_peering_ref01", "srcdatavar": "vpc_peering_ref01_data", "suffix": "_dt0" }, "m": { "id": "vpc_peering01" }, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-vpc_peering_ref01" } }], "index$": 3 }, { "a": true, "d": {}, "i": { "ref": "vpc_peering_ref01", "suffix": "_rm0" }, "m": { "id": "vpc_peering01" }, "o": "remove", "s": [], "v": [], "index$": 4 }, { "a": true, "d": {}, "i": { "suffix": "_rt0" }, "m": {}, "o": "list", "s": [], "v": [{ "apply": "ItemNotExists", "def": { "ref": "vpc_peering_ref01" } }], "index$": 5 }] }, 'VpcPeering', { "POST /v2/vpc_peerings": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "allOf": [{ "type": "object", "properties": { "name": { "type": "string", "pattern": "^[a-zA-Z0-9\\-]+$", "example": "nyc1-blr1-peering", "description": "The name of the VPC peering. Must be unique within the team and may only contain alphanumeric characters and dashes.", "key$": "name" } }, "x-ref": "#/components/schemas/vpc_peering_updatable" }, { "type": "object", "properties": { "vpc_ids": { "type": "array", "items": { "type": "string", "format": "uuid" }, "minItems": 2, "maxItems": 2, "example": ["c140286f-e6ce-4131-8b7b-df4590ce8d6a", "994a2735-dc84-11e8-80bc-3cfdfea9fba1"], "description": "An array of the two peered VPCs IDs.", "key$": "vpc_ids" } }, "x-ref": "#/components/schemas/vpc_peering_create" }], "required": ["name", "vpc_ids"], "index$": 1 } } } }, "parameters": [] }, "GET /v2/vpc_peerings": { "protocol": "http", "parameters": [{ "in": "query", "name": "per_page", "required": false, "description": "Number of items returned per page", "schema": { "type": "integer", "minimum": 1, "default": 20, "maximum": 200 }, "example": 2, "x-ref": "#/components/parameters/parameters_per_page", "index$": 0 }, { "in": "query", "name": "page", "required": false, "description": "Which 'page' of paginated results to return.", "schema": { "type": "integer", "minimum": 1, "default": 1 }, "example": 1, "x-ref": "#/components/parameters/page", "index$": 1 }, { "name": "region", "in": "query", "description": "The slug identifier for the region where the resource is available.", "schema": { "type": "string", "description": "The slug identifier for the region where the resource will initially be  available.", "enum": ["ams1", "ams2", "ams3", "blr1", "fra1", "lon1", "nyc1", "nyc2", "nyc3", "sfo1", "sfo2", "sfo3", "sgp1", "tor1", "syd1"], "example": "nyc3", "x-ref": "#/components/schemas/region_slug" }, "example": "nyc3", "x-ref": "#/components/parameters/parameters_region-3", "index$": 2 }] }, "GET /v2/vpc_peerings/{vpc_peering_id}": { "protocol": "http", "parameters": [{ "in": "path", "name": "vpc_peering_id", "description": "A unique identifier for a VPC peering.", "required": true, "schema": { "type": "string", "format": "uuid" }, "example": "5a4981aa-9653-4bd1-bef5-d6bff52042e4", "x-ref": "#/components/parameters/vpc_peering_id", "index$": 0 }] }, "DELETE /v2/vpc_peerings/{vpc_peering_id}": { "protocol": "http", "parameters": [{ "in": "path", "name": "vpc_peering_id", "description": "A unique identifier for a VPC peering.", "required": true, "schema": { "type": "string", "format": "uuid" }, "example": "5a4981aa-9653-4bd1-bef5-d6bff52042e4", "x-ref": "#/components/parameters/vpc_peering_id", "index$": 0 }] }, "PATCH /v2/vpc_peerings/{vpc_peering_id}": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "allOf": [{ "type": "object", "properties": { "name": { "type": "string", "pattern": "^[a-zA-Z0-9\\-]+$", "example": "nyc1-blr1-peering", "description": "The name of the VPC peering. Must be unique within the team and may only contain alphanumeric characters and dashes.", "key$": "name" } }, "x-ref": "#/components/schemas/vpc_peering_updatable" }], "required": ["name"], "index$": 1 } } } }, "parameters": [{ "in": "path", "name": "vpc_peering_id", "description": "A unique identifier for a VPC peering.", "required": true, "schema": { "type": "string", "format": "uuid" }, "example": "5a4981aa-9653-4bd1-bef5-d6bff52042e4", "x-ref": "#/components/parameters/vpc_peering_id", "index$": 0 }] } }, { strict: LIVE_STRICT, t });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const vpc_peering_ref01_ent = client.VpcPeering();
        let vpc_peering_ref01_data = setup.data.new.vpc_peering['vpc_peering_ref01'];
        vpc_peering_ref01_data = (await vpc_peering_ref01_ent.create(vpc_peering_ref01_data)).data();
        (0, node_assert_1.default)(null != vpc_peering_ref01_data.id);
        // LIST
        const vpc_peering_ref01_match = {};
        const vpc_peering_ref01_list = (await vpc_peering_ref01_ent.list(vpc_peering_ref01_match)).map((e) => e.data());
        (0, node_assert_1.default)(!isempty(select(vpc_peering_ref01_list, { id: vpc_peering_ref01_data.id })));
        // UPDATE
        const vpc_peering_ref01_data_up0 = {};
        vpc_peering_ref01_data_up0.id = vpc_peering_ref01_data.id;
        const vpc_peering_ref01_markdef_up0 = { name: 'name', value: 'Mark01-vpc_peering_ref01_' + setup.now };
        vpc_peering_ref01_data_up0[vpc_peering_ref01_markdef_up0.name] = vpc_peering_ref01_markdef_up0.value;
        const vpc_peering_ref01_resdata_up0 = (await vpc_peering_ref01_ent.update(vpc_peering_ref01_data_up0)).data();
        (0, node_assert_1.default)(vpc_peering_ref01_resdata_up0.id === vpc_peering_ref01_data_up0.id);
        (0, node_assert_1.default)(vpc_peering_ref01_resdata_up0[vpc_peering_ref01_markdef_up0.name] === vpc_peering_ref01_markdef_up0.value);
        // LOAD
        const vpc_peering_ref01_match_dt0 = {};
        vpc_peering_ref01_match_dt0.id = vpc_peering_ref01_data.id;
        const vpc_peering_ref01_data_dt0 = (await vpc_peering_ref01_ent.load(vpc_peering_ref01_match_dt0)).data();
        (0, node_assert_1.default)(vpc_peering_ref01_data_dt0.id === vpc_peering_ref01_data.id);
        // REMOVE
        const vpc_peering_ref01_match_rm0 = { id: vpc_peering_ref01_data.id };
        await vpc_peering_ref01_ent.remove(vpc_peering_ref01_match_rm0);
        // LIST
        const vpc_peering_ref01_match_rt0 = {};
        const vpc_peering_ref01_list_rt0 = (await vpc_peering_ref01_ent.list(vpc_peering_ref01_match_rt0)).map((e) => e.data());
        (0, node_assert_1.default)(isempty(select(vpc_peering_ref01_list_rt0, { id: vpc_peering_ref01_data.id })));
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
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/vpc_peering/VpcPeeringTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.DigitaloceanSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['vpc_peering01', 'vpc_peering02', 'vpc_peering03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'DIGITALOCEAN_TEST_VPC_PEERING_ENTID': idmap,
        'DIGITALOCEAN_TEST_LIVE': 'FALSE',
        'DIGITALOCEAN_TEST_EXPLAIN': 'FALSE',
        'DIGITALOCEAN_APIKEY': '',
    });
    idmap = env['DIGITALOCEAN_TEST_VPC_PEERING_ENTID'];
    const live = 'TRUE' === env.DIGITALOCEAN_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['DIGITALOCEAN_TEST_VPC_PEERING_ENTID'];
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
//# sourceMappingURL=VpcPeeringEntity.test.js.map