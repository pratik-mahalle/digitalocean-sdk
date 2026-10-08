

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { DigitaloceanSDK, BaseFeature, config, stdutil } from '../../..'

import {
  envOverride,
  liveClientOptions,
  liveDelay,
  loadEnvLocal,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


loadEnvLocal(__dirname + '/../../../.env.local')


describe('OnlineMigrationEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when DIGITALOCEAN_TEST_LIVE=TRUE.
  afterEach(liveDelay('DIGITALOCEAN_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = DigitaloceanSDK.test()
    const ent = testsdk.OnlineMigration()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = DigitaloceanSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.OnlineMigration().load({"database_id":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.DIGITALOCEAN_TEST_LIVE
    for (const op of []) {
      if (!live && maybeSkipControl(t, 'entityOp', 'online_migration.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"created_at":{"a":true,"h":"Created At","n":"created_at","r":false,"sh":"The time the migration was initiated, in ISO 8601 format.","t":"`$STRING`","key$":"created_at","index$":0},"disable_ssl":{"a":true,"h":"Disable Ssl","n":"disable_ssl","r":false,"sh":"Enables SSL encryption when connecting to the source database.","t":"`$BOOLEAN`","key$":"disable_ssl","index$":1},"id":{"a":true,"h":"Id","n":"id","r":false,"sh":"The ID of the most recent migration.","t":"`$STRING`","key$":"id","index$":2},"ignore_dbs":{"a":true,"h":"Ignore Dbs","n":"ignore_dbs","r":false,"sh":"List of databases that should be ignored during migration.","t":"`$ARRAY`","key$":"ignore_dbs","index$":3},"source":{"a":true,"h":"Source","n":"source","r":true,"t":"`$OBJECT`","key$":"source","index$":4},"status":{"a":true,"h":"Status","n":"status","r":false,"sh":"The current status of the migration.","t":"`$STRING`","key$":"status","index$":5}},"id":{"field":"id","name":"id"},"name":"online_migration","op":{"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /v2/databases/{database_cluster_uuid}/online-migration","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":"9cc10173-e9ea-4176-9dbc-a4cee4c4ff30","k":"param","n":"database_id","or":"database_cluster_uuid","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/v2/databases/{database_cluster_uuid}/online-migration","q":{"exist":["database_id"]},"r":{"param":{"database_cluster_uuid":"database_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v2"},{"lit":"databases"},{"var":"database_id"},{"lit":"online-migration"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"},"update":{"input":"data","name":"update","points":[{"a":true,"co":{"id":"PUT /v2/databases/{database_cluster_uuid}/online-migration","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":"9cc10173-e9ea-4176-9dbc-a4cee4c4ff30","k":"param","n":"database_id","or":"database_cluster_uuid","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"PUT","o":"/v2/databases/{database_cluster_uuid}/online-migration","q":{"exist":["database_id"]},"r":{"param":{"database_cluster_uuid":"database_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v2"},{"lit":"databases"},{"var":"database_id"},{"lit":"online-migration"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"update"}},"relations":{"ancestors":[["$.main.kit.entity.database"]]},"key$":"online_migration","name__orig":"online_migration","Name":"OnlineMigration","name_":"online_migration","name-":"online-migration","NAME":"ONLINE_MIGRATION","index$":180}, {"active":true,"entity":"online_migration","key$":"BasicOnlineMigrationFlow","kind":"basic","name":"BasicOnlineMigrationFlow","param":{},"step":[{"a":false,"d":{},"i":{"ref":"online_migration_ref01","srcdatavar":"online_migration_ref01_data","suffix":"_up0","textfield":"created_at"},"m":{},"o":"update","s":[{"apply":"TextFieldMark","def":{"mark":"Mark01-online_migration_ref01"}}],"v":[],"unreachable":true},{"a":false,"d":{},"i":{"ref":"online_migration_ref01","srcdatavar":"online_migration_ref01_data","suffix":"_dt0"},"m":{"id":"online_migration01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-online_migration_ref01"}}],"unreachable":true}]}, 'OnlineMigration', {"GET /v2/databases/{database_cluster_uuid}/online-migration":{"protocol":"http","parameters":[{"in":"path","name":"database_cluster_uuid","description":"A unique identifier for a database cluster.","required":true,"example":"9cc10173-e9ea-4176-9dbc-a4cee4c4ff30","schema":{"type":"string","format":"uuid"},"x-ref":"#/components/parameters/database_cluster_uuid","index$":0}]},"PUT /v2/databases/{database_cluster_uuid}/online-migration":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","required":["source"],"properties":{"source":{"type":"object","properties":{"host":{"type":"string","description":"The FQDN pointing to the database cluster's current primary node.","example":"db.example.com"},"port":{"type":"integer","description":"The port on which the database cluster is listening.","example":25060},"dbname":{"type":"string","description":"The name of the default database.","example":"defaultdb"},"username":{"type":"string","description":"The default user for the database.","example":"doadmin"},"password":{"type":"string","description":"The randomly generated password for the default user.","example":"example_password"}},"key$":"source"},"disable_ssl":{"type":"boolean","description":"Enables SSL encryption when connecting to the source database.","example":false,"key$":"disable_ssl"},"ignore_dbs":{"type":"array","items":{"type":"string"},"example":["db0","db1"],"default":[],"description":"List of databases that should be ignored during migration.","key$":"ignore_dbs"}},"x-ref":"#/components/schemas/source_database","index$":1},"example":{"source":{"host":"source-db.example.com","dbname":"defaultdb","port":25060,"username":"doadmin","password":"example_password"},"disable_ssl":false,"ignore_dbs":["db0","db1"]}}}},"parameters":[{"in":"path","name":"database_cluster_uuid","description":"A unique identifier for a database cluster.","required":true,"example":"9cc10173-e9ea-4176-9dbc-a4cee4c4ff30","schema":{"type":"string","format":"uuid"},"x-ref":"#/components/parameters/database_cluster_uuid","index$":0}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let online_migration_ref01_data = Object.values(setup.data.existing.online_migration)[0] as any

  })
})



// main.kit.test.live.strict is true (the default is true): a live
// request that fails, or a live test missing an input it needs,
// fails the test.
// An account with no record for a test to read skips it either way.
const LIVE_STRICT = true

function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/online_migration/OnlineMigrationTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = DigitaloceanSDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['online_migration01','online_migration02','online_migration03','database01','database02','database03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'DIGITALOCEAN_TEST_ONLINE_MIGRATION_ENTID': idmap,
    'DIGITALOCEAN_TEST_LIVE': 'FALSE',
    'DIGITALOCEAN_TEST_EXPLAIN': 'FALSE',
    'DIGITALOCEAN_APIKEY': '',
  })

  idmap = env['DIGITALOCEAN_TEST_ONLINE_MIGRATION_ENTID']

  const live = 'TRUE' === env.DIGITALOCEAN_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['DIGITALOCEAN_TEST_ONLINE_MIGRATION_ENTID']
    idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {}
    if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
      throw new Error('Live ENTID must be a JSON object')
    }
    client = new DigitaloceanSDK(merge([
      // FIRST, so the generated fields below win: sdk-test-control.json's
      // test.client.options adds to the live client, it does not redirect it.
      liveClientOptions(),
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
    ]))
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
  }

  return setup
}
  
