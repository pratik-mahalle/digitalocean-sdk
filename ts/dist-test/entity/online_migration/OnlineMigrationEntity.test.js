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
(0, node_test_1.describe)('OnlineMigrationEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when DIGITALOCEAN_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('DIGITALOCEAN_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.DigitaloceanSDK.test();
        const ent = testsdk.OnlineMigration();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.DigitaloceanSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.OnlineMigration().load({ "database_id": 1 }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.DIGITALOCEAN_TEST_LIVE;
        for (const op of []) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'online_migration.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "created_at": { "a": true, "h": "Created At", "n": "created_at", "r": false, "sh": "The time the migration was initiated, in ISO 8601 format.", "t": "`$STRING`", "key$": "created_at", "index$": 0 }, "disable_ssl": { "a": true, "h": "Disable Ssl", "n": "disable_ssl", "r": false, "sh": "Enables SSL encryption when connecting to the source database.", "t": "`$BOOLEAN`", "key$": "disable_ssl", "index$": 1 }, "id": { "a": true, "h": "Id", "n": "id", "r": false, "sh": "The ID of the most recent migration.", "t": "`$STRING`", "key$": "id", "index$": 2 }, "ignore_dbs": { "a": true, "h": "Ignore Dbs", "n": "ignore_dbs", "r": false, "sh": "List of databases that should be ignored during migration.", "t": "`$ARRAY`", "key$": "ignore_dbs", "index$": 3 }, "source": { "a": true, "h": "Source", "n": "source", "r": true, "t": "`$OBJECT`", "key$": "source", "index$": 4 }, "status": { "a": true, "h": "Status", "n": "status", "r": false, "sh": "The current status of the migration.", "t": "`$STRING`", "key$": "status", "index$": 5 } }, "id": { "field": "id", "name": "id" }, "name": "online_migration", "op": { "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /v2/databases/{database_cluster_uuid}/online-migration", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "ex": "9cc10173-e9ea-4176-9dbc-a4cee4c4ff30", "k": "param", "n": "database_id", "or": "database_cluster_uuid", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/v2/databases/{database_cluster_uuid}/online-migration", "q": { "exist": ["database_id"] }, "r": { "param": { "database_cluster_uuid": "database_id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "v2" }, { "lit": "databases" }, { "var": "database_id" }, { "lit": "online-migration" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "load" }, "update": { "input": "data", "name": "update", "points": [{ "a": true, "co": { "id": "PUT /v2/databases/{database_cluster_uuid}/online-migration", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "ex": "9cc10173-e9ea-4176-9dbc-a4cee4c4ff30", "k": "param", "n": "database_id", "or": "database_cluster_uuid", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "PUT", "o": "/v2/databases/{database_cluster_uuid}/online-migration", "q": { "exist": ["database_id"] }, "r": { "param": { "database_cluster_uuid": "database_id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "v2" }, { "lit": "databases" }, { "var": "database_id" }, { "lit": "online-migration" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "update" } }, "relations": { "ancestors": [["$.main.kit.entity.database"]] }, "key$": "online_migration", "name__orig": "online_migration", "Name": "OnlineMigration", "name_": "online_migration", "name-": "online-migration", "NAME": "ONLINE_MIGRATION", "index$": 186 }, { "active": true, "entity": "online_migration", "key$": "BasicOnlineMigrationFlow", "kind": "basic", "name": "BasicOnlineMigrationFlow", "param": {}, "step": [{ "a": false, "d": {}, "i": { "ref": "online_migration_ref01", "srcdatavar": "online_migration_ref01_data", "suffix": "_up0", "textfield": "created_at" }, "m": {}, "o": "update", "s": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-online_migration_ref01" } }], "v": [], "unreachable": true }, { "a": false, "d": {}, "i": { "ref": "online_migration_ref01", "srcdatavar": "online_migration_ref01_data", "suffix": "_dt0" }, "m": { "id": "online_migration01" }, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-online_migration_ref01" } }], "unreachable": true }] }, 'OnlineMigration', { "GET /v2/databases/{database_cluster_uuid}/online-migration": { "protocol": "http", "parameters": [{ "in": "path", "name": "database_cluster_uuid", "description": "A unique identifier for a database cluster.", "required": true, "example": "9cc10173-e9ea-4176-9dbc-a4cee4c4ff30", "schema": { "type": "string", "format": "uuid" }, "x-ref": "#/components/parameters/database_cluster_uuid", "index$": 0 }] }, "PUT /v2/databases/{database_cluster_uuid}/online-migration": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "required": ["source"], "properties": { "source": { "type": "object", "properties": { "host": { "type": "string", "description": "The FQDN pointing to the database cluster's current primary node.", "example": "db.example.com" }, "port": { "type": "integer", "description": "The port on which the database cluster is listening.", "example": 25060 }, "dbname": { "type": "string", "description": "The name of the default database.", "example": "defaultdb" }, "username": { "type": "string", "description": "The default user for the database.", "example": "doadmin" }, "password": { "type": "string", "description": "The randomly generated password for the default user.", "example": "example_password" } }, "key$": "source" }, "disable_ssl": { "type": "boolean", "description": "Enables SSL encryption when connecting to the source database.", "example": false, "key$": "disable_ssl" }, "ignore_dbs": { "type": "array", "items": { "type": "string" }, "example": ["db0", "db1"], "default": [], "description": "List of databases that should be ignored during migration.", "key$": "ignore_dbs" } }, "x-ref": "#/components/schemas/source_database", "index$": 1 }, "example": { "source": { "host": "source-db.example.com", "dbname": "defaultdb", "port": 25060, "username": "doadmin", "password": "example_password" }, "disable_ssl": false, "ignore_dbs": ["db0", "db1"] } } } }, "parameters": [{ "in": "path", "name": "database_cluster_uuid", "description": "A unique identifier for a database cluster.", "required": true, "example": "9cc10173-e9ea-4176-9dbc-a4cee4c4ff30", "schema": { "type": "string", "format": "uuid" }, "x-ref": "#/components/parameters/database_cluster_uuid", "index$": 0 }] } }, { strict: LIVE_STRICT, t });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let online_migration_ref01_data = Object.values(setup.data.existing.online_migration)[0];
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
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/online_migration/OnlineMigrationTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.DigitaloceanSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['online_migration01', 'online_migration02', 'online_migration03', 'database01', 'database02', 'database03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'DIGITALOCEAN_TEST_ONLINE_MIGRATION_ENTID': idmap,
        'DIGITALOCEAN_TEST_LIVE': 'FALSE',
        'DIGITALOCEAN_TEST_EXPLAIN': 'FALSE',
        'DIGITALOCEAN_APIKEY': '',
    });
    idmap = env['DIGITALOCEAN_TEST_ONLINE_MIGRATION_ENTID'];
    const live = 'TRUE' === env.DIGITALOCEAN_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['DIGITALOCEAN_TEST_ONLINE_MIGRATION_ENTID'];
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
//# sourceMappingURL=OnlineMigrationEntity.test.js.map