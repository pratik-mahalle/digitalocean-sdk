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
(0, node_test_1.describe)('TagEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when DIGITALOCEAN_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('DIGITALOCEAN_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.DigitaloceanSDK.test();
        const ent = testsdk.Tag();
        (0, node_assert_1.default)(null != ent);
    });
    class FailHook extends __1.BaseFeature {
        name = 'failhook';
        version = '0.0.1';
        active = true;
        unexpected = 0;
        init() { }
        PreSpec() { throw new Error('tag hook failed'); }
        PreUnexpected() { this.unexpected++; }
    }
    (0, node_test_1.test)('stream-error', async () => {
        const offline = { net: { offline: true } };
        await node_assert_1.default.rejects(async () => {
            for await (const _item of __1.DigitaloceanSDK.test(offline).Tag().stream('list')) { }
        }, /offline/);
        for await (const _item of __1.DigitaloceanSDK.test(offline).Tag()
            .stream('list', undefined, { ctrl: { throw: false } })) { }
        if (null != __1.config.feature?.rbac) {
            const denied = __1.DigitaloceanSDK.test(undefined, { feature: { rbac: { active: true, deny: true } } });
            await node_assert_1.default.rejects(async () => {
                for await (const _item of denied.Tag().stream('list')) { }
            }, (err) => 'rbac_denied' === err.code);
        }
    });
    (0, node_test_1.test)('stream-ctrl', async () => {
        const explain = {};
        const ctrl = { explain };
        for await (const _item of __1.DigitaloceanSDK.test().Tag().stream('list', undefined, { ctrl })) { }
        node_assert_1.default.deepStrictEqual(Object.keys(ctrl), ['explain']);
        (0, node_assert_1.default)(explain === ctrl.explain && 0 < Object.keys(explain).length);
    });
    (0, node_test_1.test)('unexpected', async () => {
        const hook = new FailHook();
        const client = new __1.DigitaloceanSDK({ feature: { test: { active: true } }, extend: [hook] });
        await node_assert_1.default.rejects(client.Tag().list(), /hook failed/);
        (0, node_assert_1.default)(0 < hook.unexpected);
        const fired = hook.unexpected;
        node_assert_1.default.strictEqual(await client.Tag().list(undefined, { throw: false }), undefined);
        (0, node_assert_1.default)(fired < hook.unexpected);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.DigitaloceanSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.Tag().list({ "page": "x" }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.DIGITALOCEAN_TEST_LIVE;
        for (const op of ['create', 'list', 'load', 'remove']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'tag.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "id": { "a": true, "h": "Id", "n": "id", "r": false, "t": "`$STRING`", "key$": "id", "index$": 0 }, "name": { "a": true, "h": "Name", "n": "name", "r": false, "sh": "The name of the tag.", "t": "`$STRING`", "key$": "name", "index$": 1 }, "resources": { "a": true, "h": "Resources", "n": "resources", "r": false, "ro": true, "sh": "An embedded object containing key value pairs of resource type and resource statistics.", "t": "`$OBJECT`", "key$": "resources", "index$": 2 } }, "id": { "field": "id", "name": "id" }, "name": "tag", "op": { "create": { "input": "data", "name": "create", "points": [{ "a": true, "co": { "id": "POST /v2/tags/{tag_id}/resources", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "ex": "awesome", "k": "param", "n": "id", "or": "tag_id", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "POST", "o": "/v2/tags/{tag_id}/resources", "q": { "$action": "resource", "exist": ["id"] }, "r": { "param": { "tag_id": "id" } }, "s": [{ "lit": "v2" }, { "lit": "tags" }, { "var": "id" }, { "lit": "resources" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }, { "a": true, "co": { "id": "POST /v2/tags", "source": "openapi3", "version": 2 }, "g": {}, "k": "http", "m": "POST", "o": "/v2/tags", "q": {}, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "v2" }, { "lit": "tags" }], "t": { "req": "`reqdata`", "res": "`body.tag`" }, "index$": 1 }], "key$": "create" }, "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /v2/tags", "source": "openapi3", "version": 2 }, "g": { "query": [{ "a": true, "ex": 1, "k": "query", "n": "page", "or": "page", "r": false, "t": "`$INTEGER`", "index$": 0 }, { "a": true, "ex": 2, "k": "query", "n": "per_page", "or": "per_page", "r": false, "t": "`$INTEGER`", "index$": 1 }] }, "k": "http", "m": "GET", "o": "/v2/tags", "q": {}, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "v2" }, { "lit": "tags" }], "t": { "req": "`reqdata`", "res": "`body.tags`" }, "index$": 0 }], "key$": "list" }, "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /v2/tags/{tag_id}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "ex": "awesome", "k": "param", "n": "id", "or": "tag_id", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/v2/tags/{tag_id}", "q": { "exist": ["id"] }, "r": { "param": { "tag_id": "id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "v2" }, { "lit": "tags" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body.tag`" }, "index$": 0 }], "key$": "load" }, "remove": { "input": "data", "name": "remove", "points": [{ "a": true, "co": { "id": "DELETE /v2/tags/{tag_id}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "ex": "awesome", "k": "param", "n": "id", "or": "tag_id", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "DELETE", "o": "/v2/tags/{tag_id}", "q": { "exist": ["id"] }, "r": { "param": { "tag_id": "id" } }, "s": [{ "lit": "v2" }, { "lit": "tags" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }, { "a": true, "co": { "id": "DELETE /v2/tags/{tag_id}/resources", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "ex": "awesome", "k": "param", "n": "id", "or": "tag_id", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "DELETE", "o": "/v2/tags/{tag_id}/resources", "q": { "$action": "resource", "exist": ["id"] }, "r": { "param": { "tag_id": "id" } }, "s": [{ "lit": "v2" }, { "lit": "tags" }, { "var": "id" }, { "lit": "resources" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 1 }], "key$": "remove" } }, "relations": { "ancestors": [] }, "key$": "tag", "name__orig": "tag", "Name": "Tag", "name_": "tag", "name-": "tag", "NAME": "TAG", "index$": 217 }, { "active": true, "entity": "tag", "key$": "BasicTagFlow", "kind": "basic", "name": "BasicTagFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "tag_ref01" }, "m": {}, "o": "create", "s": [], "v": [], "index$": 0 }, { "a": true, "d": {}, "i": {}, "m": {}, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "tag_ref01" } }], "index$": 1 }, { "a": true, "d": {}, "i": { "ref": "tag_ref01", "srcdatavar": "tag_ref01_data", "suffix": "_dt0" }, "m": { "id": "tag01" }, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-tag_ref01" } }], "index$": 2 }, { "a": true, "d": {}, "i": { "ref": "tag_ref01", "suffix": "_rm0" }, "m": { "id": "tag01" }, "o": "remove", "s": [], "v": [], "index$": 3 }, { "a": true, "d": {}, "i": { "suffix": "_rt0" }, "m": {}, "o": "list", "s": [], "v": [{ "apply": "ItemNotExists", "def": { "ref": "tag_ref01" } }], "index$": 4 }] }, 'Tag', { "POST /v2/tags/{tag_id}/resources": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "properties": { "resources": { "description": "An array of objects containing resource_id and resource_type \nattributes.\n\nThis response will only include resources that you are authorized to see.\nFor example, to see Droplets, include the `droplet:read` scope.\n", "type": "array", "items": { "properties": { "resource_id": { "type": "string", "description": "The identifier of a resource.", "example": "3d80cb72-342b-4aaa-b92e-4e4abb24a933" }, "resource_type": { "type": "string", "description": "The type of the resource.", "example": "volume", "enum": [] } } }, "example": [{ "resource_id": "9569411", "resource_type": "droplet" }, { "resource_id": "7555620", "resource_type": "image" }, { "resource_id": "3d80cb72-342b-4aaa-b92e-4e4abb24a933", "resource_type": "volume" }] } }, "required": ["resources"], "x-ref": "#/components/schemas/tags_resource" } } } }, "parameters": [{ "in": "path", "name": "tag_id", "description": "The name of the tag. Tags may contain letters, numbers, colons, dashes, and underscores. There is a limit of 255 characters per tag.", "required": true, "schema": { "type": "string", "maxLength": 255, "pattern": "^[a-zA-Z0-9_\\-\\:]+$" }, "example": "awesome", "x-ref": "#/components/parameters/tag_id", "index$": 0 }] }, "POST /v2/tags": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "description": "A tag is a label that can be applied to a resource (currently Droplets, Images, Volumes, Volume Snapshots, and Database clusters) in order to better organize or facilitate the lookups and actions on it.\nTags have two attributes: a user defined `name` attribute and an embedded `resources` attribute with information about resources that have been tagged.", "properties": { "name": { "type": "string", "description": "The name of the tag. Tags may contain letters, numbers, colons, dashes, and underscores.\nThere is a limit of 255 characters per tag.\n\n**Note:** Tag names are case stable, which means the capitalization you use when you first create a tag is canonical.\n\nWhen working with tags in the API, you must use the tag's canonical capitalization. For example, if you create a tag named \"PROD\", the URL to add that tag to a resource would be `https://api.digitalocean.com/v2/tags/PROD/resources` (not `/v2/tags/prod/resources`).\n\nTagged resources in the control panel will always display the canonical capitalization. For example, if you create a tag named \"PROD\", you can tag resources in the control panel by entering \"prod\". The tag will still display with its canonical capitalization, \"PROD\".\n", "pattern": "^[a-zA-Z0-9_\\-\\:]+$", "maxLength": 255, "example": "extra-awesome", "key$": "name" }, "resources": { "type": "object", "description": "An embedded object containing key value pairs of resource type and resource statistics.\nIt also includes a count of the total number of resources tagged with the current tag as well as a `last_tagged_uri` attribute set to the last resource tagged with the current tag.\n\nThis will only include resources that you are authorized to see. For example, to see tagged Droplets, include the `droplet:read` scope.\n", "readOnly": true, "allOf": [{ "type": "object", "description": "Tagged Resource Statistics include metadata regarding the resource type that has been tagged.", "properties": { "count": {}, "last_tagged_uri": {} }, "x-ref": "#/components/schemas/tags_metadata" }, { "properties": { "droplets": {}, "imgages": {}, "volumes": {}, "volume_snapshots": {}, "databases": {} } }], "example": { "count": 5, "last_tagged_uri": "https://api.digitalocean.com/v2/images/7555620", "droplets": { "count": 1, "last_tagged_uri": "https://api.digitalocean.com/v2/droplets/3164444" }, "images": { "count": 1, "last_tagged_uri": "https://api.digitalocean.com/v2/images/7555620" }, "volumes": { "count": 1, "last_tagged_uri": "https://api.digitalocean.com/v2/volumes/3d80cb72-342b-4aaa-b92e-4e4abb24a933" }, "volume_snapshots": { "count": 1, "last_tagged_uri": "https://api.digitalocean.com/v2/snapshots/1f6f46e8-6b60-11e9-be4e-0a58ac144519" }, "databases": { "count": 1, "last_tagged_uri": "https://api.digitalocean.com/v2/databases/b92438f6-ba03-416c-b642-e9236db91976" } }, "key$": "resources" } }, "x-ref": "#/components/schemas/tags", "index$": 1 } } } }, "parameters": [] }, "GET /v2/tags": { "protocol": "http", "parameters": [{ "in": "query", "name": "per_page", "required": false, "description": "Number of items returned per page", "schema": { "type": "integer", "minimum": 1, "default": 20, "maximum": 200 }, "example": 2, "x-ref": "#/components/parameters/parameters_per_page", "index$": 0 }, { "in": "query", "name": "page", "required": false, "description": "Which 'page' of paginated results to return.", "schema": { "type": "integer", "minimum": 1, "default": 1 }, "example": 1, "x-ref": "#/components/parameters/page", "index$": 1 }] }, "GET /v2/tags/{tag_id}": { "protocol": "http", "parameters": [{ "in": "path", "name": "tag_id", "description": "The name of the tag. Tags may contain letters, numbers, colons, dashes, and underscores. There is a limit of 255 characters per tag.", "required": true, "schema": { "type": "string", "maxLength": 255, "pattern": "^[a-zA-Z0-9_\\-\\:]+$" }, "example": "awesome", "x-ref": "#/components/parameters/tag_id", "index$": 0 }] }, "DELETE /v2/tags/{tag_id}": { "protocol": "http", "parameters": [{ "in": "path", "name": "tag_id", "description": "The name of the tag. Tags may contain letters, numbers, colons, dashes, and underscores. There is a limit of 255 characters per tag.", "required": true, "schema": { "type": "string", "maxLength": 255, "pattern": "^[a-zA-Z0-9_\\-\\:]+$" }, "example": "awesome", "x-ref": "#/components/parameters/tag_id", "index$": 0 }] }, "DELETE /v2/tags/{tag_id}/resources": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "properties": { "resources": { "description": "An array of objects containing resource_id and resource_type \nattributes.\n\nThis response will only include resources that you are authorized to see.\nFor example, to see Droplets, include the `droplet:read` scope.\n", "type": "array", "items": { "properties": { "resource_id": { "type": "string", "description": "The identifier of a resource.", "example": "3d80cb72-342b-4aaa-b92e-4e4abb24a933" }, "resource_type": { "type": "string", "description": "The type of the resource.", "example": "volume", "enum": [] } } }, "example": [{ "resource_id": "9569411", "resource_type": "droplet" }, { "resource_id": "7555620", "resource_type": "image" }, { "resource_id": "3d80cb72-342b-4aaa-b92e-4e4abb24a933", "resource_type": "volume" }] } }, "required": ["resources"], "x-ref": "#/components/schemas/tags_resource" } } } }, "parameters": [{ "in": "path", "name": "tag_id", "description": "The name of the tag. Tags may contain letters, numbers, colons, dashes, and underscores. There is a limit of 255 characters per tag.", "required": true, "schema": { "type": "string", "maxLength": 255, "pattern": "^[a-zA-Z0-9_\\-\\:]+$" }, "example": "awesome", "x-ref": "#/components/parameters/tag_id", "index$": 0 }] } }, { strict: LIVE_STRICT, t });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const tag_ref01_ent = client.Tag();
        let tag_ref01_data = setup.data.new.tag['tag_ref01'];
        tag_ref01_data = (await tag_ref01_ent.create(tag_ref01_data)).data();
        (0, node_assert_1.default)(null != tag_ref01_data.id);
        // LIST
        const tag_ref01_match = {};
        const tag_ref01_list = (await tag_ref01_ent.list(tag_ref01_match)).map((e) => e.data());
        (0, node_assert_1.default)(!isempty(select(tag_ref01_list, { id: tag_ref01_data.id })));
        // LOAD
        const tag_ref01_match_dt0 = {};
        tag_ref01_match_dt0.id = tag_ref01_data.id;
        const tag_ref01_data_dt0 = (await tag_ref01_ent.load(tag_ref01_match_dt0)).data();
        (0, node_assert_1.default)(tag_ref01_data_dt0.id === tag_ref01_data.id);
        // REMOVE
        const tag_ref01_match_rm0 = { id: tag_ref01_data.id };
        await tag_ref01_ent.remove(tag_ref01_match_rm0);
        // LIST
        const tag_ref01_match_rt0 = {};
        const tag_ref01_list_rt0 = (await tag_ref01_ent.list(tag_ref01_match_rt0)).map((e) => e.data());
        (0, node_assert_1.default)(isempty(select(tag_ref01_list_rt0, { id: tag_ref01_data.id })));
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
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/tag/TagTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.DigitaloceanSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['tag01', 'tag02', 'tag03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'DIGITALOCEAN_TEST_TAG_ENTID': idmap,
        'DIGITALOCEAN_TEST_LIVE': 'FALSE',
        'DIGITALOCEAN_TEST_EXPLAIN': 'FALSE',
        'DIGITALOCEAN_APIKEY': '',
    });
    idmap = env['DIGITALOCEAN_TEST_TAG_ENTID'];
    const live = 'TRUE' === env.DIGITALOCEAN_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['DIGITALOCEAN_TEST_TAG_ENTID'];
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
//# sourceMappingURL=TagEntity.test.js.map