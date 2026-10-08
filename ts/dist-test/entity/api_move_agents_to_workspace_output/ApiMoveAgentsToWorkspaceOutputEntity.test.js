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
(0, node_test_1.describe)('ApiMoveAgentsToWorkspaceOutputEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when DIGITALOCEAN_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('DIGITALOCEAN_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.DigitaloceanSDK.test();
        const ent = testsdk.ApiMoveAgentsToWorkspaceOutput();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.DigitaloceanSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.ApiMoveAgentsToWorkspaceOutput().update({ "workspace_id": 1 }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.DIGITALOCEAN_TEST_LIVE;
        for (const op of []) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'api_move_agents_to_workspace_output.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "agent_uuids": { "a": true, "h": "Agent Uuids", "n": "agent_uuids", "r": false, "sh": "Agent uuids", "t": "`$ARRAY`", "key$": "agent_uuids", "index$": 0 }, "agents": { "a": true, "h": "Agents", "n": "agents", "r": false, "sh": "Agents", "t": "`$ARRAY`", "key$": "agents", "index$": 1 }, "created_at": { "a": true, "fo": "date-time", "h": "Created At", "n": "created_at", "r": false, "sh": "Creation date", "t": "`$STRING`", "key$": "created_at", "index$": 2 }, "created_by": { "a": true, "fo": "uint64", "h": "Created By", "n": "created_by", "r": false, "sh": "The id of user who created this workspace", "t": "`$STRING`", "key$": "created_by", "index$": 3 }, "created_by_email": { "a": true, "h": "Created By Email", "n": "created_by_email", "r": false, "sh": "The email of the user who created this workspace", "t": "`$STRING`", "key$": "created_by_email", "index$": 4 }, "deleted_at": { "a": true, "fo": "date-time", "h": "Deleted At", "n": "deleted_at", "r": false, "sh": "Deleted date", "t": "`$STRING`", "key$": "deleted_at", "index$": 5 }, "description": { "a": true, "h": "Description", "n": "description", "r": false, "sh": "Description of the workspace", "t": "`$STRING`", "key$": "description", "index$": 6 }, "evaluation_test_cases": { "a": true, "h": "Evaluation Test Cases", "n": "evaluation_test_cases", "r": false, "sh": "Evaluations", "t": "`$ARRAY`", "key$": "evaluation_test_cases", "index$": 7 }, "name": { "a": true, "h": "Name", "n": "name", "r": false, "sh": "Name of the workspace", "t": "`$STRING`", "key$": "name", "index$": 8 }, "updated_at": { "a": true, "fo": "date-time", "h": "Updated At", "n": "updated_at", "r": false, "sh": "Update date", "t": "`$STRING`", "key$": "updated_at", "index$": 9 }, "uuid": { "a": true, "h": "Uuid", "n": "uuid", "r": false, "sh": "Unique id", "t": "`$STRING`", "key$": "uuid", "index$": 10 }, "workspace_uuid": { "a": true, "h": "Workspace Uuid", "n": "workspace_uuid", "r": false, "sh": "Workspace uuid to move agents to", "t": "`$STRING`", "key$": "workspace_uuid", "index$": 11 } }, "name": "api_move_agents_to_workspace_output", "op": { "update": { "input": "data", "name": "update", "points": [{ "a": true, "co": { "id": "PUT /v2/gen-ai/workspaces/{workspace_uuid}/agents", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "ex": "\"123e4567-e89b-12d3-a456-426614174000\"", "k": "param", "n": "workspace_id", "or": "workspace_uuid", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "PUT", "o": "/v2/gen-ai/workspaces/{workspace_uuid}/agents", "q": { "exist": ["workspace_id"] }, "r": { "param": { "workspace_uuid": "workspace_id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "v2" }, { "lit": "gen-ai" }, { "lit": "workspaces" }, { "var": "workspace_id" }, { "lit": "agents" }], "t": { "req": "`reqdata`", "res": "`body.workspace`" }, "index$": 0 }], "key$": "update" } }, "relations": { "ancestors": [] }, "key$": "api_move_agents_to_workspace_output", "name__orig": "api_move_agents_to_workspace_output", "Name": "ApiMoveAgentsToWorkspaceOutput", "name_": "api_move_agents_to_workspace_output", "name-": "api-move-agents-to-workspace-output", "NAME": "API_MOVE_AGENTS_TO_WORKSPACE_OUTPUT", "index$": 76 }, { "active": true, "entity": "api_move_agents_to_workspace_output", "key$": "BasicApiMoveAgentsToWorkspaceOutputFlow", "kind": "basic", "name": "BasicApiMoveAgentsToWorkspaceOutputFlow", "param": {}, "step": [{ "a": false, "d": {}, "i": { "ref": "api_move_agents_to_workspace_output_ref01", "srcdatavar": "api_move_agents_to_workspace_output_ref01_data", "suffix": "_up0", "textfield": "created_at" }, "m": {}, "o": "update", "s": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-api_move_agents_to_workspace_output_ref01" } }], "v": [], "unreachable": true }] }, 'ApiMoveAgentsToWorkspaceOutput', { "PUT /v2/gen-ai/workspaces/{workspace_uuid}/agents": { "protocol": "http", "requestBody": { "content": { "application/json": { "schema": { "description": "Parameters for Moving agents to a Workspace", "properties": { "agent_uuids": { "description": "Agent uuids", "example": ["example string"], "items": { "example": "example string", "type": "string" }, "type": "array", "key$": "agent_uuids" }, "workspace_uuid": { "description": "Workspace uuid to move agents to", "example": "123e4567-e89b-12d3-a456-426614174000", "type": "string", "key$": "workspace_uuid" } }, "type": "object", "x-ref": "#/components/schemas/apiMoveAgentsToWorkspaceInputPublic", "index$": 1 } } } }, "parameters": [{ "description": "Workspace uuid to move agents to", "example": "\"123e4567-e89b-12d3-a456-426614174000\"", "in": "path", "name": "workspace_uuid", "required": true, "schema": { "type": "string" }, "index$": 0 }] } }, { strict: LIVE_STRICT, t });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let api_move_agents_to_workspace_output_ref01_data = Object.values(setup.data.existing.api_move_agents_to_workspace_output)[0];
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
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/api_move_agents_to_workspace_output/ApiMoveAgentsToWorkspaceOutputTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.DigitaloceanSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['api_move_agents_to_workspace_output01', 'api_move_agents_to_workspace_output02', 'api_move_agents_to_workspace_output03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'DIGITALOCEAN_TEST_API_MOVE_AGENTS_TO_WORKSPACE_OUTPUT_ENTID': idmap,
        'DIGITALOCEAN_TEST_LIVE': 'FALSE',
        'DIGITALOCEAN_TEST_EXPLAIN': 'FALSE',
        'DIGITALOCEAN_APIKEY': '',
    });
    idmap = env['DIGITALOCEAN_TEST_API_MOVE_AGENTS_TO_WORKSPACE_OUTPUT_ENTID'];
    const live = 'TRUE' === env.DIGITALOCEAN_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['DIGITALOCEAN_TEST_API_MOVE_AGENTS_TO_WORKSPACE_OUTPUT_ENTID'];
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
//# sourceMappingURL=ApiMoveAgentsToWorkspaceOutputEntity.test.js.map