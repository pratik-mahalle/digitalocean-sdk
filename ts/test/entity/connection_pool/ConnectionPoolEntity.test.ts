

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


describe('ConnectionPoolEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when DIGITALOCEAN_TEST_LIVE=TRUE.
  afterEach(liveDelay('DIGITALOCEAN_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = DigitaloceanSDK.test()
    const ent = testsdk.ConnectionPool()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = DigitaloceanSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.ConnectionPool().list({"database_id":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.DIGITALOCEAN_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'connection_pool.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"connection":{"a":true,"h":"Connection","n":"connection","r":false,"t":"`$ANY`","key$":"connection","index$":0},"db":{"a":true,"h":"Db","n":"db","r":true,"sh":"The database for use with the connection pool.","t":"`$STRING`","key$":"db","index$":1},"mode":{"a":true,"h":"Mode","n":"mode","r":true,"sh":"The PGBouncer transaction mode for the connection pool.","t":"`$STRING`","key$":"mode","index$":2},"name":{"a":true,"h":"Name","n":"name","r":true,"sh":"A unique name for the connection pool.","t":"`$STRING`","key$":"name","index$":3},"private_connection":{"a":true,"h":"Private Connection","n":"private_connection","r":false,"t":"`$ANY`","key$":"private_connection","index$":4},"size":{"a":true,"fo":"int32","h":"Size","n":"size","r":true,"sh":"The desired size of the PGBouncer connection pool.","t":"`$INTEGER`","key$":"size","index$":5},"standby_connection":{"a":true,"h":"Standby Connection","n":"standby_connection","r":false,"t":"`$ANY`","key$":"standby_connection","index$":6},"standby_private_connection":{"a":true,"h":"Standby Private Connection","n":"standby_private_connection","r":false,"t":"`$ANY`","key$":"standby_private_connection","index$":7},"user":{"a":true,"h":"User","n":"user","r":false,"sh":"The name of the user for use with the connection pool.","t":"`$STRING`","key$":"user","index$":8}},"name":"connection_pool","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /v2/databases/{database_cluster_uuid}/pools","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":"9cc10173-e9ea-4176-9dbc-a4cee4c4ff30","k":"param","n":"database_id","or":"database_cluster_uuid","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/v2/databases/{database_cluster_uuid}/pools","q":{"exist":["database_id"]},"r":{"param":{"database_cluster_uuid":"database_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v2"},{"lit":"databases"},{"var":"database_id"},{"lit":"pools"}],"t":{"req":"`reqdata`","res":"`body.pools`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[["$.main.kit.entity.database"]]},"key$":"connection_pool","name__orig":"connection_pool","Name":"ConnectionPool","name_":"connection_pool","name-":"connection-pool","NAME":"CONNECTION_POOL","index$":133}, {"active":true,"entity":"connection_pool","key$":"BasicConnectionPoolFlow","kind":"basic","name":"BasicConnectionPoolFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{"database_id":"database01"},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"connection_pool_ref01"}}],"index$":0}]}, 'ConnectionPool', {"GET /v2/databases/{database_cluster_uuid}/pools":{"protocol":"http","parameters":[{"in":"path","name":"database_cluster_uuid","description":"A unique identifier for a database cluster.","required":true,"example":"9cc10173-e9ea-4176-9dbc-a4cee4c4ff30","schema":{"type":"string","format":"uuid"},"x-ref":"#/components/parameters/database_cluster_uuid","index$":0}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let connection_pool_ref01_data = Object.values(setup.data.existing.connection_pool)[0] as any

    // LIST
    const connection_pool_ref01_ent = client.ConnectionPool()
    const connection_pool_ref01_match: any = {}
    connection_pool_ref01_match['database_id'] = setup.idmap['database01']

    const connection_pool_ref01_list = (await connection_pool_ref01_ent.list(connection_pool_ref01_match)).map((e: any) => e.data())


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
      '../../../../.sdk/test/entity/connection_pool/ConnectionPoolTestData.json')

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
    ['connection_pool01','connection_pool02','connection_pool03','database01','database02','database03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'DIGITALOCEAN_TEST_CONNECTION_POOL_ENTID': idmap,
    'DIGITALOCEAN_TEST_LIVE': 'FALSE',
    'DIGITALOCEAN_TEST_EXPLAIN': 'FALSE',
    'DIGITALOCEAN_APIKEY': '',
  })

  idmap = env['DIGITALOCEAN_TEST_CONNECTION_POOL_ENTID']

  const live = 'TRUE' === env.DIGITALOCEAN_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['DIGITALOCEAN_TEST_CONNECTION_POOL_ENTID']
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
  
