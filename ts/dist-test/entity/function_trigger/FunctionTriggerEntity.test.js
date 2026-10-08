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
(0, node_test_1.describe)('FunctionTriggerEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when DIGITALOCEAN_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('DIGITALOCEAN_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.DigitaloceanSDK.test();
        const ent = testsdk.FunctionTrigger();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.DigitaloceanSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.FunctionTrigger().list({ "namespace_id": 1 }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.DIGITALOCEAN_TEST_LIVE;
        for (const op of ['create', 'list']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'function_trigger.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "created_at": { "a": true, "h": "Created At", "n": "created_at", "r": false, "sh": "UTC time string.", "t": "`$STRING`", "key$": "created_at", "index$": 0 }, "function": { "a": true, "h": "Function", "n": "function", "op": { "create": { "req": true, "type": "`$STRING`" } }, "r": false, "sh": "Name of function(action) that exists in the given namespace.", "t": "`$STRING`", "key$": "function", "index$": 1 }, "is_enabled": { "a": true, "h": "Is Enabled", "n": "is_enabled", "op": { "create": { "req": true, "type": "`$BOOLEAN`" } }, "r": false, "sh": "Indicates weather the trigger is paused or unpaused.", "t": "`$BOOLEAN`", "key$": "is_enabled", "index$": 2 }, "name": { "a": true, "h": "Name", "n": "name", "op": { "create": { "req": true, "type": "`$STRING`" } }, "r": false, "sh": "The trigger's unique name within the namespace.", "t": "`$STRING`", "key$": "name", "index$": 3 }, "namespace": { "a": true, "h": "Namespace", "n": "namespace", "r": false, "sh": "A unique string format of UUID with a prefix fn-.", "t": "`$STRING`", "key$": "namespace", "index$": 4 }, "scheduled_details": { "a": true, "h": "Scheduled Details", "n": "scheduled_details", "r": true, "sh": "Trigger details for SCHEDULED type, where body is optional.", "t": "`$OBJECT`", "key$": "scheduled_details", "index$": 5 }, "scheduled_runs": { "a": true, "h": "Scheduled Runs", "n": "scheduled_runs", "r": false, "t": "`$OBJECT`", "key$": "scheduled_runs", "index$": 6 }, "type": { "a": true, "h": "Type", "n": "type", "op": { "create": { "req": true, "type": "`$STRING`" } }, "r": false, "sh": "String which indicates the type of trigger source like SCHEDULED.", "t": "`$STRING`", "key$": "type", "index$": 7 }, "updated_at": { "a": true, "h": "Updated At", "n": "updated_at", "r": false, "sh": "UTC time string.", "t": "`$STRING`", "key$": "updated_at", "index$": 8 } }, "name": "function_trigger", "op": { "create": { "input": "data", "name": "create", "points": [{ "a": true, "co": { "id": "POST /v2/functions/namespaces/{namespace_id}/triggers", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "ex": "fn-xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx", "k": "param", "n": "namespace_id", "or": "namespace_id", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "POST", "o": "/v2/functions/namespaces/{namespace_id}/triggers", "q": { "exist": ["namespace_id"] }, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "v2" }, { "lit": "functions" }, { "lit": "namespaces" }, { "var": "namespace_id" }, { "lit": "triggers" }], "t": { "req": "`reqdata`", "res": "`body.trigger`" }, "index$": 0 }], "key$": "create" }, "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /v2/functions/namespaces/{namespace_id}/triggers", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "ex": "fn-xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx", "k": "param", "n": "namespace_id", "or": "namespace_id", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/v2/functions/namespaces/{namespace_id}/triggers", "q": { "exist": ["namespace_id"] }, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "v2" }, { "lit": "functions" }, { "lit": "namespaces" }, { "var": "namespace_id" }, { "lit": "triggers" }], "t": { "req": "`reqdata`", "res": "`body.triggers`" }, "index$": 0 }], "key$": "list" }, "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /v2/functions/namespaces/{namespace_id}/triggers/{trigger_name}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "ex": "fn-xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx", "k": "param", "n": "namespace_id", "or": "namespace_id", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "ex": "my trigger", "k": "param", "n": "trigger_name", "or": "trigger_name", "r": true, "t": "`$STRING`", "index$": 1 }] }, "k": "http", "m": "GET", "o": "/v2/functions/namespaces/{namespace_id}/triggers/{trigger_name}", "q": { "exist": ["namespace_id", "trigger_name"] }, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "v2" }, { "lit": "functions" }, { "lit": "namespaces" }, { "var": "namespace_id" }, { "lit": "triggers" }, { "var": "trigger_name" }], "t": { "req": "`reqdata`", "res": "`body.trigger`" }, "index$": 0 }], "key$": "load" }, "remove": { "input": "data", "name": "remove", "points": [{ "a": true, "co": { "id": "DELETE /v2/functions/namespaces/{namespace_id}/triggers/{trigger_name}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "ex": "fn-xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx", "k": "param", "n": "namespace_id", "or": "namespace_id", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "ex": "my trigger", "k": "param", "n": "trigger_name", "or": "trigger_name", "r": true, "t": "`$STRING`", "index$": 1 }] }, "k": "http", "m": "DELETE", "o": "/v2/functions/namespaces/{namespace_id}/triggers/{trigger_name}", "q": { "exist": ["namespace_id", "trigger_name"] }, "r": {}, "s": [{ "lit": "v2" }, { "lit": "functions" }, { "lit": "namespaces" }, { "var": "namespace_id" }, { "lit": "triggers" }, { "var": "trigger_name" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "remove" }, "update": { "input": "data", "name": "update", "points": [{ "a": true, "co": { "id": "PUT /v2/functions/namespaces/{namespace_id}/triggers/{trigger_name}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "ex": "fn-xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx", "k": "param", "n": "namespace_id", "or": "namespace_id", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "ex": "my trigger", "k": "param", "n": "trigger_name", "or": "trigger_name", "r": true, "t": "`$STRING`", "index$": 1 }] }, "k": "http", "m": "PUT", "o": "/v2/functions/namespaces/{namespace_id}/triggers/{trigger_name}", "q": { "exist": ["namespace_id", "trigger_name"] }, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "v2" }, { "lit": "functions" }, { "lit": "namespaces" }, { "var": "namespace_id" }, { "lit": "triggers" }, { "var": "trigger_name" }], "t": { "req": "`reqdata`", "res": "`body.trigger`" }, "index$": 0 }], "key$": "update" } }, "relations": { "ancestors": [] }, "key$": "function_trigger", "name__orig": "function_trigger", "Name": "FunctionTrigger", "name_": "function_trigger", "name-": "function-trigger", "NAME": "FUNCTION_TRIGGER", "index$": 155 }, { "active": true, "entity": "function_trigger", "key$": "BasicFunctionTriggerFlow", "kind": "basic", "name": "BasicFunctionTriggerFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "function_trigger_ref01" }, "m": { "namespace_id": "namespace01" }, "o": "create", "s": [], "v": [], "index$": 0 }, { "a": true, "d": {}, "i": {}, "m": { "namespace_id": "namespace01" }, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "function_trigger_ref01" } }], "index$": 1 }, { "a": false, "d": { "namespace_id": "namespace01" }, "i": { "ref": "function_trigger_ref01", "srcdatavar": "function_trigger_ref01_data", "suffix": "_up0", "textfield": "created_at" }, "m": {}, "o": "update", "s": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-function_trigger_ref01" } }], "v": [], "unreachable": true }, { "a": false, "d": {}, "i": { "ref": "function_trigger_ref01", "srcdatavar": "function_trigger_ref01_data", "suffix": "_dt0" }, "m": { "id": "function_trigger01", "namespace_id": "namespace01" }, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-function_trigger_ref01" } }], "unreachable": true }, { "a": false, "d": {}, "i": { "ref": "function_trigger_ref01", "suffix": "_rm0" }, "m": { "id": "function_trigger01", "namespace_id": "namespace01" }, "o": "remove", "s": [], "v": [], "unreachable": true }, { "a": true, "d": {}, "i": { "suffix": "_rt0" }, "m": { "namespace_id": "namespace01" }, "o": "list", "s": [], "v": [{ "apply": "ItemNotExists", "def": { "ref": "function_trigger_ref01" } }], "index$": 2 }] }, 'FunctionTrigger', { "POST /v2/functions/namespaces/{namespace_id}/triggers": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "properties": { "name": { "type": "string", "example": "my trigger", "description": "The trigger's unique name within the namespace.", "key$": "name" }, "function": { "type": "string", "example": "hello", "description": "Name of function(action) that exists in the given namespace.", "key$": "function" }, "type": { "type": "string", "example": "SCHEDULED", "description": "One of different type of triggers. Currently only SCHEDULED is supported.", "key$": "type" }, "is_enabled": { "type": "boolean", "example": true, "description": "Indicates weather the trigger is paused or unpaused.", "key$": "is_enabled" }, "scheduled_details": { "type": "object", "description": "Trigger details for SCHEDULED type, where body is optional.\n", "properties": { "cron": { "description": "valid cron expression string which is required for SCHEDULED type triggers.", "type": "string", "example": "* * * * *" }, "body": { "description": "Optional data to be sent to function while triggering the function.", "type": "object", "nullable": true, "properties": { "name": {} } } }, "required": ["cron"], "x-ref": "#/components/schemas/scheduled_details", "key$": "scheduled_details" } }, "required": ["name", "function", "type", "is_enabled", "scheduled_details"], "x-ref": "#/components/schemas/create_trigger", "index$": 1 } } } }, "parameters": [{ "name": "namespace_id", "description": "The ID of the namespace to be managed.", "in": "path", "schema": { "type": "string" }, "example": "fn-xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx", "required": true, "x-ref": "#/components/parameters/namespace_id", "index$": 0 }] }, "GET /v2/functions/namespaces/{namespace_id}/triggers": { "protocol": "http", "parameters": [{ "name": "namespace_id", "description": "The ID of the namespace to be managed.", "in": "path", "schema": { "type": "string" }, "example": "fn-xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx", "required": true, "x-ref": "#/components/parameters/namespace_id", "index$": 0 }] }, "GET /v2/functions/namespaces/{namespace_id}/triggers/{trigger_name}": { "protocol": "http", "parameters": [{ "name": "namespace_id", "description": "The ID of the namespace to be managed.", "in": "path", "schema": { "type": "string" }, "example": "fn-xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx", "required": true, "x-ref": "#/components/parameters/namespace_id", "index$": 0 }, { "name": "trigger_name", "description": "The name of the trigger to be managed.", "in": "path", "schema": { "type": "string" }, "example": "my trigger", "required": true, "x-ref": "#/components/parameters/trigger_name", "index$": 1 }] }, "DELETE /v2/functions/namespaces/{namespace_id}/triggers/{trigger_name}": { "protocol": "http", "parameters": [{ "name": "namespace_id", "description": "The ID of the namespace to be managed.", "in": "path", "schema": { "type": "string" }, "example": "fn-xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx", "required": true, "x-ref": "#/components/parameters/namespace_id", "index$": 0 }, { "name": "trigger_name", "description": "The name of the trigger to be managed.", "in": "path", "schema": { "type": "string" }, "example": "my trigger", "required": true, "x-ref": "#/components/parameters/trigger_name", "index$": 1 }] }, "PUT /v2/functions/namespaces/{namespace_id}/triggers/{trigger_name}": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "properties": { "is_enabled": { "type": "boolean", "example": true, "description": "Indicates weather the trigger is paused or unpaused.", "key$": "is_enabled" }, "scheduled_details": { "type": "object", "description": "Trigger details for SCHEDULED type, where body is optional.\n", "properties": { "cron": { "description": "valid cron expression string which is required for SCHEDULED type triggers.", "type": "string", "example": "* * * * *" }, "body": { "description": "Optional data to be sent to function while triggering the function.", "type": "object", "nullable": true, "properties": { "name": {} } } }, "required": ["cron"], "x-ref": "#/components/schemas/scheduled_details", "key$": "scheduled_details" } }, "x-ref": "#/components/schemas/update_trigger", "index$": 1 } } } }, "parameters": [{ "name": "namespace_id", "description": "The ID of the namespace to be managed.", "in": "path", "schema": { "type": "string" }, "example": "fn-xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx", "required": true, "x-ref": "#/components/parameters/namespace_id", "index$": 0 }, { "name": "trigger_name", "description": "The name of the trigger to be managed.", "in": "path", "schema": { "type": "string" }, "example": "my trigger", "required": true, "x-ref": "#/components/parameters/trigger_name", "index$": 1 }] } }, { strict: LIVE_STRICT, t });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const function_trigger_ref01_ent = client.FunctionTrigger();
        let function_trigger_ref01_data = setup.data.new.function_trigger['function_trigger_ref01'];
        function_trigger_ref01_data['namespace_id'] = setup.idmap['namespace01'];
        function_trigger_ref01_data = (await function_trigger_ref01_ent.create(function_trigger_ref01_data)).data();
        (0, node_assert_1.default)(null != function_trigger_ref01_data);
        // LIST
        const function_trigger_ref01_match = {};
        function_trigger_ref01_match['namespace_id'] = setup.idmap['namespace01'];
        const function_trigger_ref01_list = (await function_trigger_ref01_ent.list(function_trigger_ref01_match)).map((e) => e.data());
        // LIST
        const function_trigger_ref01_match_rt0 = {};
        function_trigger_ref01_match_rt0['namespace_id'] = setup.idmap['namespace01'];
        const function_trigger_ref01_list_rt0 = (await function_trigger_ref01_ent.list(function_trigger_ref01_match_rt0)).map((e) => e.data());
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
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/function_trigger/FunctionTriggerTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.DigitaloceanSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['function_trigger01', 'function_trigger02', 'function_trigger03', 'namespace01'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'DIGITALOCEAN_TEST_FUNCTION_TRIGGER_ENTID': idmap,
        'DIGITALOCEAN_TEST_LIVE': 'FALSE',
        'DIGITALOCEAN_TEST_EXPLAIN': 'FALSE',
        'DIGITALOCEAN_APIKEY': '',
    });
    idmap = env['DIGITALOCEAN_TEST_FUNCTION_TRIGGER_ENTID'];
    const live = 'TRUE' === env.DIGITALOCEAN_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['DIGITALOCEAN_TEST_FUNCTION_TRIGGER_ENTID'];
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
//# sourceMappingURL=FunctionTriggerEntity.test.js.map