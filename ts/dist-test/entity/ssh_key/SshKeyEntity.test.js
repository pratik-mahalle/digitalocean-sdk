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
(0, node_test_1.describe)('SshKeyEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when DIGITALOCEAN_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('DIGITALOCEAN_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.DigitaloceanSDK.test();
        const ent = testsdk.SshKey();
        (0, node_assert_1.default)(null != ent);
    });
    class FailHook extends __1.BaseFeature {
        name = 'failhook';
        version = '0.0.1';
        active = true;
        unexpected = 0;
        init() { }
        PreSpec() { throw new Error('ssh_key hook failed'); }
        PreUnexpected() { this.unexpected++; }
    }
    (0, node_test_1.test)('stream-error', async () => {
        const offline = { net: { offline: true } };
        await node_assert_1.default.rejects(async () => {
            for await (const _item of __1.DigitaloceanSDK.test(offline).SshKey().stream('list')) { }
        }, /offline/);
        for await (const _item of __1.DigitaloceanSDK.test(offline).SshKey()
            .stream('list', undefined, { ctrl: { throw: false } })) { }
        if (null != __1.config.feature?.rbac) {
            const denied = __1.DigitaloceanSDK.test(undefined, { feature: { rbac: { active: true, deny: true } } });
            await node_assert_1.default.rejects(async () => {
                for await (const _item of denied.SshKey().stream('list')) { }
            }, (err) => 'rbac_denied' === err.code);
        }
    });
    (0, node_test_1.test)('stream-ctrl', async () => {
        const explain = {};
        const ctrl = { explain };
        for await (const _item of __1.DigitaloceanSDK.test().SshKey().stream('list', undefined, { ctrl })) { }
        node_assert_1.default.deepStrictEqual(Object.keys(ctrl), ['explain']);
        (0, node_assert_1.default)(explain === ctrl.explain && 0 < Object.keys(explain).length);
    });
    (0, node_test_1.test)('unexpected', async () => {
        const hook = new FailHook();
        const client = new __1.DigitaloceanSDK({ feature: { test: { active: true } }, extend: [hook] });
        await node_assert_1.default.rejects(client.SshKey().list(), /hook failed/);
        (0, node_assert_1.default)(0 < hook.unexpected);
        const fired = hook.unexpected;
        node_assert_1.default.strictEqual(await client.SshKey().list(undefined, { throw: false }), undefined);
        (0, node_assert_1.default)(fired < hook.unexpected);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.DigitaloceanSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.SshKey().list({ "page": "x" }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.DIGITALOCEAN_TEST_LIVE;
        for (const op of ['create', 'list', 'update', 'load', 'remove']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'ssh_key.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "fingerprint": { "a": true, "h": "Fingerprint", "n": "fingerprint", "r": false, "ro": true, "sh": "A unique identifier that differentiates this key from other keys using a format that SSH recognizes.", "t": "`$STRING`", "key$": "fingerprint", "index$": 0 }, "id": { "a": true, "h": "Id", "n": "id", "r": false, "ro": true, "sh": "A unique identification number for this key.", "t": "`$INTEGER`", "key$": "id", "index$": 1 }, "name": { "a": true, "h": "Name", "n": "name", "op": { "update": { "req": false, "type": "`$STRING`" } }, "r": true, "sh": "A human-readable display name for this key, used to easily identify the SSH keys when they are displayed.", "t": "`$STRING`", "key$": "name", "index$": 2 }, "public_key": { "a": true, "h": "Public Key", "n": "public_key", "r": true, "sh": "The entire public key string that was uploaded.", "t": "`$STRING`", "key$": "public_key", "index$": 3 } }, "id": { "field": "id", "name": "id" }, "name": "ssh_key", "op": { "create": { "input": "data", "name": "create", "points": [{ "a": true, "co": { "id": "POST /v2/account/keys", "source": "openapi3", "version": 2 }, "g": {}, "k": "http", "m": "POST", "o": "/v2/account/keys", "q": {}, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "v2" }, { "lit": "account" }, { "lit": "keys" }], "t": { "req": "`reqdata`", "res": "`body.ssh_key`" }, "index$": 0 }], "key$": "create" }, "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /v2/account/keys", "source": "openapi3", "version": 2 }, "g": { "query": [{ "a": true, "ex": 1, "k": "query", "n": "page", "or": "page", "r": false, "t": "`$INTEGER`", "index$": 0 }, { "a": true, "ex": 2, "k": "query", "n": "per_page", "or": "per_page", "r": false, "t": "`$INTEGER`", "index$": 1 }] }, "k": "http", "m": "GET", "o": "/v2/account/keys", "q": {}, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "v2" }, { "lit": "account" }, { "lit": "keys" }], "t": { "req": "`reqdata`", "res": "`body.ssh_keys`" }, "index$": 0 }], "key$": "list" }, "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /v2/account/keys/{ssh_key_identifier}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "ex": 512189, "k": "param", "n": "id", "or": "ssh_key_identifier", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/v2/account/keys/{ssh_key_identifier}", "q": { "exist": ["id"] }, "r": { "param": { "ssh_key_identifier": "id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "v2" }, { "lit": "account" }, { "lit": "keys" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body.ssh_key`" }, "index$": 0 }], "key$": "load" }, "remove": { "input": "data", "name": "remove", "points": [{ "a": true, "co": { "id": "DELETE /v2/account/keys/{ssh_key_identifier}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "ex": 512189, "k": "param", "n": "id", "or": "ssh_key_identifier", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "DELETE", "o": "/v2/account/keys/{ssh_key_identifier}", "q": { "exist": ["id"] }, "r": { "param": { "ssh_key_identifier": "id" } }, "s": [{ "lit": "v2" }, { "lit": "account" }, { "lit": "keys" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "remove" }, "update": { "input": "data", "name": "update", "points": [{ "a": true, "co": { "id": "PUT /v2/account/keys/{ssh_key_identifier}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "ex": 512189, "k": "param", "n": "id", "or": "ssh_key_identifier", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "PUT", "o": "/v2/account/keys/{ssh_key_identifier}", "q": { "exist": ["id"] }, "r": { "param": { "ssh_key_identifier": "id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "v2" }, { "lit": "account" }, { "lit": "keys" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body.ssh_key`" }, "index$": 0 }], "key$": "update" } }, "relations": { "ancestors": [] }, "key$": "ssh_key", "name__orig": "ssh_key", "Name": "SshKey", "name_": "ssh_key", "name-": "ssh-key", "NAME": "SSH_KEY", "index$": 206 }, { "active": true, "entity": "ssh_key", "key$": "BasicSshKeyFlow", "kind": "basic", "name": "BasicSshKeyFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "ssh_key_ref01" }, "m": {}, "o": "create", "s": [], "v": [], "index$": 0 }, { "a": true, "d": {}, "i": {}, "m": {}, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "ssh_key_ref01" } }], "index$": 1 }, { "a": true, "d": {}, "i": { "ref": "ssh_key_ref01", "srcdatavar": "ssh_key_ref01_data", "suffix": "_up0", "textfield": "name" }, "m": {}, "o": "update", "s": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-ssh_key_ref01" } }], "v": [], "index$": 2 }, { "a": true, "d": {}, "i": { "ref": "ssh_key_ref01", "srcdatavar": "ssh_key_ref01_data", "suffix": "_dt0" }, "m": { "id": "ssh_key01" }, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-ssh_key_ref01" } }], "index$": 3 }, { "a": true, "d": {}, "i": { "ref": "ssh_key_ref01", "suffix": "_rm0" }, "m": { "id": "ssh_key01" }, "o": "remove", "s": [], "v": [], "index$": 4 }, { "a": true, "d": {}, "i": { "suffix": "_rt0" }, "m": {}, "o": "list", "s": [], "v": [{ "apply": "ItemNotExists", "def": { "ref": "ssh_key_ref01" } }], "index$": 5 }] }, 'SshKey', { "POST /v2/account/keys": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "properties": { "id": { "type": "integer", "description": "A unique identification number for this key. Can be used to embed a  specific SSH key into a Droplet.", "readOnly": true, "example": 512189, "x-ref": "#/components/schemas/ssh_key_id", "key$": "id" }, "fingerprint": { "type": "string", "description": "A unique identifier that differentiates this key from other keys using  a format that SSH recognizes. The fingerprint is created when the key is added to your account.", "readOnly": true, "example": "3b:16:bf:e4:8b:00:8b:b8:59:8c:a9:d3:f0:19:45:fa", "x-ref": "#/components/schemas/ssh_key_fingerprint", "key$": "fingerprint" }, "public_key": { "description": "The entire public key string that was uploaded. Embedded into the root user's `authorized_keys` file if you include this key during Droplet creation.", "type": "string", "example": "ssh-rsa AEXAMPLEaC1yc2EAAAADAQABAAAAQQDDHr/jh2Jy4yALcK4JyWbVkPRaWmhck3IgCoeOO3z1e2dBowLh64QAM+Qb72pxekALga2oi4GvT+TlWNhzPH4V example", "key$": "public_key" }, "name": { "type": "string", "description": "A human-readable display name for this key, used to easily identify the SSH keys when they are displayed.", "example": "My SSH Public Key", "x-ref": "#/components/schemas/ssh_key_name", "key$": "name" } }, "required": ["public_key", "name"], "x-ref": "#/components/schemas/sshKeys", "index$": 1 } } } }, "parameters": [] }, "GET /v2/account/keys": { "protocol": "http", "parameters": [{ "in": "query", "name": "per_page", "required": false, "description": "Number of items returned per page", "schema": { "type": "integer", "minimum": 1, "default": 20, "maximum": 200 }, "example": 2, "x-ref": "#/components/parameters/parameters_per_page", "index$": 0 }, { "in": "query", "name": "page", "required": false, "description": "Which 'page' of paginated results to return.", "schema": { "type": "integer", "minimum": 1, "default": 1 }, "example": 1, "x-ref": "#/components/parameters/page", "index$": 1 }] }, "GET /v2/account/keys/{ssh_key_identifier}": { "protocol": "http", "parameters": [{ "in": "path", "name": "ssh_key_identifier", "required": true, "description": "Either the ID or the fingerprint of an existing SSH key.", "schema": { "anyOf": [{ "type": "integer", "description": "A unique identification number for this key. Can be used to embed a  specific SSH key into a Droplet.", "readOnly": true, "example": 512189, "x-ref": "#/components/schemas/ssh_key_id" }, { "type": "string", "description": "A unique identifier that differentiates this key from other keys using  a format that SSH recognizes. The fingerprint is created when the key is added to your account.", "readOnly": true, "example": "3b:16:bf:e4:8b:00:8b:b8:59:8c:a9:d3:f0:19:45:fa", "x-ref": "#/components/schemas/ssh_key_fingerprint" }] }, "example": 512189, "x-ref": "#/components/parameters/ssh_key_identifier", "index$": 0 }] }, "DELETE /v2/account/keys/{ssh_key_identifier}": { "protocol": "http", "parameters": [{ "in": "path", "name": "ssh_key_identifier", "required": true, "description": "Either the ID or the fingerprint of an existing SSH key.", "schema": { "anyOf": [{ "type": "integer", "description": "A unique identification number for this key. Can be used to embed a  specific SSH key into a Droplet.", "readOnly": true, "example": 512189, "x-ref": "#/components/schemas/ssh_key_id" }, { "type": "string", "description": "A unique identifier that differentiates this key from other keys using  a format that SSH recognizes. The fingerprint is created when the key is added to your account.", "readOnly": true, "example": "3b:16:bf:e4:8b:00:8b:b8:59:8c:a9:d3:f0:19:45:fa", "x-ref": "#/components/schemas/ssh_key_fingerprint" }] }, "example": 512189, "x-ref": "#/components/parameters/ssh_key_identifier", "index$": 0 }] }, "PUT /v2/account/keys/{ssh_key_identifier}": { "protocol": "http", "requestBody": { "description": "Set the `name` attribute to the new name you want to use.", "required": true, "content": { "application/json": { "schema": { "type": "object", "properties": { "name": { "type": "string", "description": "A human-readable display name for this key, used to easily identify the SSH keys when they are displayed.", "example": "My SSH Public Key", "x-ref": "#/components/schemas/ssh_key_name", "key$": "name" } }, "index$": 1 } } } }, "parameters": [{ "in": "path", "name": "ssh_key_identifier", "required": true, "description": "Either the ID or the fingerprint of an existing SSH key.", "schema": { "anyOf": [{ "type": "integer", "description": "A unique identification number for this key. Can be used to embed a  specific SSH key into a Droplet.", "readOnly": true, "example": 512189, "x-ref": "#/components/schemas/ssh_key_id" }, { "type": "string", "description": "A unique identifier that differentiates this key from other keys using  a format that SSH recognizes. The fingerprint is created when the key is added to your account.", "readOnly": true, "example": "3b:16:bf:e4:8b:00:8b:b8:59:8c:a9:d3:f0:19:45:fa", "x-ref": "#/components/schemas/ssh_key_fingerprint" }] }, "example": 512189, "x-ref": "#/components/parameters/ssh_key_identifier", "index$": 0 }] } }, { strict: LIVE_STRICT, t });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const ssh_key_ref01_ent = client.SshKey();
        let ssh_key_ref01_data = setup.data.new.ssh_key['ssh_key_ref01'];
        ssh_key_ref01_data = (await ssh_key_ref01_ent.create(ssh_key_ref01_data)).data();
        (0, node_assert_1.default)(null != ssh_key_ref01_data.id);
        // LIST
        const ssh_key_ref01_match = {};
        const ssh_key_ref01_list = (await ssh_key_ref01_ent.list(ssh_key_ref01_match)).map((e) => e.data());
        (0, node_assert_1.default)(!isempty(select(ssh_key_ref01_list, { id: ssh_key_ref01_data.id })));
        // UPDATE
        const ssh_key_ref01_data_up0 = {};
        ssh_key_ref01_data_up0.id = ssh_key_ref01_data.id;
        const ssh_key_ref01_markdef_up0 = { name: 'name', value: 'Mark01-ssh_key_ref01_' + setup.now };
        ssh_key_ref01_data_up0[ssh_key_ref01_markdef_up0.name] = ssh_key_ref01_markdef_up0.value;
        const ssh_key_ref01_resdata_up0 = (await ssh_key_ref01_ent.update(ssh_key_ref01_data_up0)).data();
        (0, node_assert_1.default)(ssh_key_ref01_resdata_up0.id === ssh_key_ref01_data_up0.id);
        (0, node_assert_1.default)(ssh_key_ref01_resdata_up0[ssh_key_ref01_markdef_up0.name] === ssh_key_ref01_markdef_up0.value);
        // LOAD
        const ssh_key_ref01_match_dt0 = {};
        ssh_key_ref01_match_dt0.id = ssh_key_ref01_data.id;
        const ssh_key_ref01_data_dt0 = (await ssh_key_ref01_ent.load(ssh_key_ref01_match_dt0)).data();
        (0, node_assert_1.default)(ssh_key_ref01_data_dt0.id === ssh_key_ref01_data.id);
        // REMOVE
        const ssh_key_ref01_match_rm0 = { id: ssh_key_ref01_data.id };
        await ssh_key_ref01_ent.remove(ssh_key_ref01_match_rm0);
        // LIST
        const ssh_key_ref01_match_rt0 = {};
        const ssh_key_ref01_list_rt0 = (await ssh_key_ref01_ent.list(ssh_key_ref01_match_rt0)).map((e) => e.data());
        (0, node_assert_1.default)(isempty(select(ssh_key_ref01_list_rt0, { id: ssh_key_ref01_data.id })));
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
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/ssh_key/SshKeyTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.DigitaloceanSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['ssh_key01', 'ssh_key02', 'ssh_key03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'DIGITALOCEAN_TEST_SSH_KEY_ENTID': idmap,
        'DIGITALOCEAN_TEST_LIVE': 'FALSE',
        'DIGITALOCEAN_TEST_EXPLAIN': 'FALSE',
        'DIGITALOCEAN_APIKEY': '',
    });
    idmap = env['DIGITALOCEAN_TEST_SSH_KEY_ENTID'];
    const live = 'TRUE' === env.DIGITALOCEAN_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['DIGITALOCEAN_TEST_SSH_KEY_ENTID'];
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
//# sourceMappingURL=SshKeyEntity.test.js.map