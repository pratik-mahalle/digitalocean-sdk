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
(0, node_test_1.describe)('ApiLinkAgentOutputEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when DIGITALOCEAN_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('DIGITALOCEAN_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.DigitaloceanSDK.test();
        const ent = testsdk.ApiLinkAgentOutput();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.DigitaloceanSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.ApiLinkAgentOutput().create({ "agent_id": 1, "child_agent_uuid": "x" }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.DIGITALOCEAN_TEST_LIVE;
        for (const op of ['create']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'api_link_agent_output.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "child_agent_uuid": { "a": true, "h": "Child Agent Uuid", "n": "child_agent_uuid", "r": false, "sh": "Routed agent id", "t": "`$STRING`", "key$": "child_agent_uuid", "index$": 0 }, "if_case": { "a": true, "h": "If Case", "n": "if_case", "r": false, "t": "`$STRING`", "key$": "if_case", "index$": 1 }, "parent_agent_uuid": { "a": true, "h": "Parent Agent Uuid", "n": "parent_agent_uuid", "r": false, "sh": "A unique identifier for the parent agent.", "t": "`$STRING`", "key$": "parent_agent_uuid", "index$": 2 }, "route_name": { "a": true, "h": "Route Name", "n": "route_name", "r": false, "sh": "Name of route", "t": "`$STRING`", "key$": "route_name", "index$": 3 } }, "name": "api_link_agent_output", "op": { "create": { "input": "data", "name": "create", "points": [{ "a": true, "co": { "id": "POST /v2/gen-ai/agents/{parent_agent_uuid}/child_agents/{child_agent_uuid}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "ex": "\"123e4567-e89b-12d3-a456-426614174000\"", "k": "param", "n": "agent_id", "or": "parent_agent_uuid", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "ex": "\"123e4567-e89b-12d3-a456-426614174000\"", "k": "param", "n": "child_agent_uuid", "or": "child_agent_uuid", "r": true, "t": "`$STRING`", "index$": 1 }] }, "k": "http", "m": "POST", "o": "/v2/gen-ai/agents/{parent_agent_uuid}/child_agents/{child_agent_uuid}", "q": { "exist": ["agent_id", "child_agent_uuid"] }, "r": { "param": { "parent_agent_uuid": "agent_id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "v2" }, { "lit": "gen-ai" }, { "lit": "agents" }, { "var": "agent_id" }, { "lit": "child_agents" }, { "var": "child_agent_uuid" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "create" } }, "relations": { "ancestors": [] }, "key$": "api_link_agent_output", "name__orig": "api_link_agent_output", "Name": "ApiLinkAgentOutput", "name_": "api_link_agent_output", "name-": "api-link-agent-output", "NAME": "API_LINK_AGENT_OUTPUT", "index$": 58 }, { "active": true, "entity": "api_link_agent_output", "key$": "BasicApiLinkAgentOutputFlow", "kind": "basic", "name": "BasicApiLinkAgentOutputFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "api_link_agent_output_ref01" }, "m": { "agent_id": "agent01", "child_agent_uuid": "child_agent_uuid01" }, "o": "create", "s": [], "v": [], "index$": 0 }] }, 'ApiLinkAgentOutput', { "POST /v2/gen-ai/agents/{parent_agent_uuid}/child_agents/{child_agent_uuid}": { "protocol": "http", "requestBody": { "content": { "application/json": { "schema": { "description": "Information for linking an agent", "properties": { "child_agent_uuid": { "description": "Routed agent id", "example": "\"12345678-1234-1234-1234-123456789012\"", "type": "string", "key$": "child_agent_uuid" }, "if_case": { "example": "\"use this to get weather information\"", "type": "string", "key$": "if_case" }, "parent_agent_uuid": { "description": "A unique identifier for the parent agent.", "example": "\"12345678-1234-1234-1234-123456789012\"", "type": "string", "key$": "parent_agent_uuid" }, "route_name": { "description": "Name of route", "example": "\"weather_route\"", "type": "string", "key$": "route_name" } }, "type": "object", "x-ref": "#/components/schemas/apiLinkAgentInputPublic", "index$": 1 } } } }, "parameters": [{ "description": "A unique identifier for the parent agent.", "example": "\"123e4567-e89b-12d3-a456-426614174000\"", "in": "path", "name": "parent_agent_uuid", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "description": "Routed agent id", "example": "\"123e4567-e89b-12d3-a456-426614174000\"", "in": "path", "name": "child_agent_uuid", "required": true, "schema": { "type": "string" }, "index$": 1 }] } }, { strict: LIVE_STRICT, t });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const api_link_agent_output_ref01_ent = client.ApiLinkAgentOutput();
        let api_link_agent_output_ref01_data = setup.data.new.api_link_agent_output['api_link_agent_output_ref01'];
        api_link_agent_output_ref01_data['agent_id'] = setup.idmap['agent01'];
        api_link_agent_output_ref01_data['child_agent_uuid'] = setup.idmap['child_agent_uuid01'];
        api_link_agent_output_ref01_data = (await api_link_agent_output_ref01_ent.create(api_link_agent_output_ref01_data)).data();
        (0, node_assert_1.default)(null != api_link_agent_output_ref01_data);
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
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/api_link_agent_output/ApiLinkAgentOutputTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.DigitaloceanSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['api_link_agent_output01', 'api_link_agent_output02', 'api_link_agent_output03', 'agent01', 'child_agent_uuid01'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'DIGITALOCEAN_TEST_API_LINK_AGENT_OUTPUT_ENTID': idmap,
        'DIGITALOCEAN_TEST_LIVE': 'FALSE',
        'DIGITALOCEAN_TEST_EXPLAIN': 'FALSE',
        'DIGITALOCEAN_APIKEY': '',
    });
    idmap = env['DIGITALOCEAN_TEST_API_LINK_AGENT_OUTPUT_ENTID'];
    const live = 'TRUE' === env.DIGITALOCEAN_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['DIGITALOCEAN_TEST_API_LINK_AGENT_OUTPUT_ENTID'];
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
//# sourceMappingURL=ApiLinkAgentOutputEntity.test.js.map