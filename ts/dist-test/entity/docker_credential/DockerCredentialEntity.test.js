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
(0, node_test_1.describe)('DockerCredentialEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when DIGITALOCEAN_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('DIGITALOCEAN_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.DigitaloceanSDK.test();
        const ent = testsdk.DockerCredential();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.DigitaloceanSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.DockerCredential().load({ "expiry_second": "x" }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.DIGITALOCEAN_TEST_LIVE;
        for (const op of ['load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'docker_credential.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "registry_digitalocean_com": { "a": true, "h": "Registry Digitalocean Com", "n": "registry_digitalocean_com", "r": false, "t": "`$OBJECT`", "key$": "registry_digitalocean_com", "index$": 0 } }, "name": "docker_credential", "op": { "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /v2/registries/{registry_name}/docker-credentials", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "ex": "example", "k": "param", "n": "registry_name", "or": "registry_name", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/v2/registries/{registry_name}/docker-credentials", "q": { "exist": ["registry_name"] }, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "v2" }, { "lit": "registries" }, { "var": "registry_name" }, { "lit": "docker-credentials" }], "t": { "req": "`reqdata`", "res": "`body.auths`" }, "index$": 0 }, { "a": true, "co": { "id": "GET /v2/registry/docker-credentials", "source": "openapi3", "version": 2 }, "g": { "query": [{ "a": true, "ex": 3600, "k": "query", "n": "expiry_second", "or": "expiry_seconds", "r": false, "t": "`$INTEGER`", "index$": 0 }, { "a": true, "ex": true, "k": "query", "n": "read_write", "or": "read_write", "r": false, "t": "`$BOOLEAN`", "index$": 1 }] }, "k": "http", "m": "GET", "o": "/v2/registry/docker-credentials", "q": {}, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "v2" }, { "lit": "registry" }, { "lit": "docker-credentials" }], "t": { "req": "`reqdata`", "res": "`body.auths`" }, "index$": 1 }], "key$": "load" } }, "relations": { "ancestors": [] }, "key$": "docker_credential", "name__orig": "docker_credential", "Name": "DockerCredential", "name_": "docker_credential", "name-": "docker-credential", "NAME": "DOCKER_CREDENTIAL", "index$": 140 }, { "active": true, "entity": "docker_credential", "key$": "BasicDockerCredentialFlow", "kind": "basic", "name": "BasicDockerCredentialFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "docker_credential_ref01", "srcdatavar": "docker_credential_ref01_data", "suffix": "_dt0" }, "m": {}, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-docker_credential_ref01" } }], "index$": 0 }] }, 'DockerCredential', { "GET /v2/registries/{registry_name}/docker-credentials": { "protocol": "http", "parameters": [{ "in": "path", "name": "registry_name", "description": "The name of a container registry.", "required": true, "schema": { "type": "string" }, "example": "example", "x-ref": "#/components/parameters/registry_name", "index$": 0 }] }, "GET /v2/registry/docker-credentials": { "protocol": "http", "parameters": [{ "in": "query", "name": "expiry_seconds", "required": false, "description": "The duration in seconds that the returned registry credentials will be valid. If not set or 0, the credentials will not expire.", "schema": { "type": "integer", "minimum": 0, "default": 0 }, "example": 3600, "x-ref": "#/components/parameters/registry_expiry_seconds", "index$": 0 }, { "in": "query", "name": "read_write", "required": false, "description": "By default, the registry credentials allow for read-only access. Set this query parameter to `true` to obtain read-write credentials.", "schema": { "type": "boolean", "default": false }, "example": true, "x-ref": "#/components/parameters/registry_read_write", "index$": 1 }] } }, { strict: LIVE_STRICT, t });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let docker_credential_ref01_data = Object.values(setup.data.existing.docker_credential)[0];
        // LOAD: skipped — no entity id field and load requires path params.
        // Entity-var is declared here so later flow steps still compile.
        const docker_credential_ref01_ent = client.DockerCredential();
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
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/docker_credential/DockerCredentialTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.DigitaloceanSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['docker_credential01', 'docker_credential02', 'docker_credential03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'DIGITALOCEAN_TEST_DOCKER_CREDENTIAL_ENTID': idmap,
        'DIGITALOCEAN_TEST_LIVE': 'FALSE',
        'DIGITALOCEAN_TEST_EXPLAIN': 'FALSE',
        'DIGITALOCEAN_APIKEY': '',
    });
    idmap = env['DIGITALOCEAN_TEST_DOCKER_CREDENTIAL_ENTID'];
    const live = 'TRUE' === env.DIGITALOCEAN_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['DIGITALOCEAN_TEST_DOCKER_CREDENTIAL_ENTID'];
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
//# sourceMappingURL=DockerCredentialEntity.test.js.map