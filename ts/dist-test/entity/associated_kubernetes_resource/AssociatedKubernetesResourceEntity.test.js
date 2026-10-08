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
(0, node_test_1.describe)('AssociatedKubernetesResourceEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when DIGITALOCEAN_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('DIGITALOCEAN_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.DigitaloceanSDK.test();
        const ent = testsdk.AssociatedKubernetesResource();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.DigitaloceanSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.AssociatedKubernetesResource().list({ "cluster_id": 1 }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.DIGITALOCEAN_TEST_LIVE;
        for (const op of ['list']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'associated_kubernetes_resource.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "load_balancers": { "a": true, "h": "Load Balancers", "n": "load_balancers", "r": false, "sh": "A list of names and IDs for associated load balancers that can be destroyed along with the cluster.", "t": "`$ARRAY`", "key$": "load_balancers", "index$": 0 }, "volume_snapshots": { "a": true, "h": "Volume Snapshots", "n": "volume_snapshots", "r": false, "sh": "A list of names and IDs for associated volume snapshots that can be destroyed along with the cluster.", "t": "`$ARRAY`", "key$": "volume_snapshots", "index$": 1 }, "volumes": { "a": true, "h": "Volumes", "n": "volumes", "r": false, "sh": "A list of names and IDs for associated volumes that can be destroyed along with the cluster.", "t": "`$ARRAY`", "key$": "volumes", "index$": 2 } }, "name": "associated_kubernetes_resource", "op": { "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /v2/kubernetes/clusters/{cluster_id}/destroy_with_associated_resources", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "ex": "bd5f5959-5e1e-4205-a714-a914373942af", "k": "param", "n": "cluster_id", "or": "cluster_id", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/v2/kubernetes/clusters/{cluster_id}/destroy_with_associated_resources", "q": { "exist": ["cluster_id"] }, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "v2" }, { "lit": "kubernetes" }, { "lit": "clusters" }, { "var": "cluster_id" }, { "lit": "destroy_with_associated_resources" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "list" } }, "relations": { "ancestors": [] }, "key$": "associated_kubernetes_resource", "name__orig": "associated_kubernetes_resource", "Name": "AssociatedKubernetesResource", "name_": "associated_kubernetes_resource", "name-": "associated-kubernetes-resource", "NAME": "ASSOCIATED_KUBERNETES_RESOURCE", "index$": 114 }, { "active": true, "entity": "associated_kubernetes_resource", "key$": "BasicAssociatedKubernetesResourceFlow", "kind": "basic", "name": "BasicAssociatedKubernetesResourceFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": {}, "m": { "cluster_id": "cluster01" }, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "associated_kubernetes_resource_ref01" } }], "index$": 0 }] }, 'AssociatedKubernetesResource', { "GET /v2/kubernetes/clusters/{cluster_id}/destroy_with_associated_resources": { "protocol": "http", "parameters": [{ "in": "path", "name": "cluster_id", "description": "A unique ID that can be used to reference a Kubernetes cluster.", "required": true, "schema": { "type": "string", "format": "uuid", "minimum": 1 }, "example": "bd5f5959-5e1e-4205-a714-a914373942af", "x-ref": "#/components/parameters/kubernetes_cluster_id", "index$": 0 }] } }, { strict: LIVE_STRICT, t });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let associated_kubernetes_resource_ref01_data = Object.values(setup.data.existing.associated_kubernetes_resource)[0];
        // LIST
        const associated_kubernetes_resource_ref01_ent = client.AssociatedKubernetesResource();
        const associated_kubernetes_resource_ref01_match = {};
        associated_kubernetes_resource_ref01_match['cluster_id'] = setup.idmap['cluster01'];
        const associated_kubernetes_resource_ref01_list = (await associated_kubernetes_resource_ref01_ent.list(associated_kubernetes_resource_ref01_match)).map((e) => e.data());
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
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/associated_kubernetes_resource/AssociatedKubernetesResourceTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.DigitaloceanSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['associated_kubernetes_resource01', 'associated_kubernetes_resource02', 'associated_kubernetes_resource03', 'cluster01'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'DIGITALOCEAN_TEST_ASSOCIATED_KUBERNETES_RESOURCE_ENTID': idmap,
        'DIGITALOCEAN_TEST_LIVE': 'FALSE',
        'DIGITALOCEAN_TEST_EXPLAIN': 'FALSE',
        'DIGITALOCEAN_APIKEY': '',
    });
    idmap = env['DIGITALOCEAN_TEST_ASSOCIATED_KUBERNETES_RESOURCE_ENTID'];
    const live = 'TRUE' === env.DIGITALOCEAN_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['DIGITALOCEAN_TEST_ASSOCIATED_KUBERNETES_RESOURCE_ENTID'];
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
//# sourceMappingURL=AssociatedKubernetesResourceEntity.test.js.map