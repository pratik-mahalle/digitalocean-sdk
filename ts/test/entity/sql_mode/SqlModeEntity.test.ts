

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


describe('SqlModeEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when DIGITALOCEAN_TEST_LIVE=TRUE.
  afterEach(liveDelay('DIGITALOCEAN_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = DigitaloceanSDK.test()
    const ent = testsdk.SqlMode()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = DigitaloceanSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.SqlMode().load({"database_id":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.DIGITALOCEAN_TEST_LIVE
    for (const op of []) {
      if (!live && maybeSkipControl(t, 'entityOp', 'sql_mode.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"sql_mode":{"a":true,"h":"Sql Mode","n":"sql_mode","r":true,"sh":"A string specifying the configured SQL modes for the MySQL cluster.","t":"`$STRING`","key$":"sql_mode","index$":0}},"name":"sql_mode","op":{"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /v2/databases/{database_cluster_uuid}/sql_mode","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":"9cc10173-e9ea-4176-9dbc-a4cee4c4ff30","k":"param","n":"database_id","or":"database_cluster_uuid","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/v2/databases/{database_cluster_uuid}/sql_mode","q":{"exist":["database_id"]},"r":{"param":{"database_cluster_uuid":"database_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v2"},{"lit":"databases"},{"var":"database_id"},{"lit":"sql_mode"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[["$.main.kit.entity.database"]]},"key$":"sql_mode","name__orig":"sql_mode","Name":"SqlMode","name_":"sql_mode","name-":"sql-mode","NAME":"SQL_MODE","index$":205}, {"active":true,"entity":"sql_mode","key$":"BasicSqlModeFlow","kind":"basic","name":"BasicSqlModeFlow","param":{},"step":[{"a":false,"d":{},"i":{"ref":"sql_mode_ref01","srcdatavar":"sql_mode_ref01_data","suffix":"_dt0"},"m":{"id":"sql_mode01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-sql_mode_ref01"}}],"unreachable":true}]}, 'SqlMode', {"GET /v2/databases/{database_cluster_uuid}/sql_mode":{"protocol":"http","parameters":[{"in":"path","name":"database_cluster_uuid","description":"A unique identifier for a database cluster.","required":true,"example":"9cc10173-e9ea-4176-9dbc-a4cee4c4ff30","schema":{"type":"string","format":"uuid"},"x-ref":"#/components/parameters/database_cluster_uuid","index$":0}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let sql_mode_ref01_data = Object.values(setup.data.existing.sql_mode)[0] as any

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
      '../../../../.sdk/test/entity/sql_mode/SqlModeTestData.json')

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
    ['sql_mode01','sql_mode02','sql_mode03','database01','database02','database03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'DIGITALOCEAN_TEST_SQL_MODE_ENTID': idmap,
    'DIGITALOCEAN_TEST_LIVE': 'FALSE',
    'DIGITALOCEAN_TEST_EXPLAIN': 'FALSE',
    'DIGITALOCEAN_APIKEY': '',
  })

  idmap = env['DIGITALOCEAN_TEST_SQL_MODE_ENTID']

  const live = 'TRUE' === env.DIGITALOCEAN_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['DIGITALOCEAN_TEST_SQL_MODE_ENTID']
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
  
