

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


describe('LogsinkEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when DIGITALOCEAN_TEST_LIVE=TRUE.
  afterEach(liveDelay('DIGITALOCEAN_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = DigitaloceanSDK.test()
    const ent = testsdk.Logsink()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = DigitaloceanSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.Logsink().load({"database_id":1,"id":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.DIGITALOCEAN_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'logsink.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"config":{"a":true,"h":"Config","n":"config","r":true,"t":"`$ANY`","union":{"branches":4,"count":1,"depth":0},"key$":"config","index$":0},"id":{"a":true,"h":"Id","n":"id","r":false,"t":"`$STRING`","key$":"id","index$":1},"sink_id":{"a":true,"h":"Sink Id","n":"sink_id","r":true,"sh":"A unique identifier for Logsink","t":"`$STRING`","key$":"sink_id","index$":2},"sink_name":{"a":true,"h":"Sink Name","n":"sink_name","r":true,"sh":"The name of the Logsink","t":"`$STRING`","key$":"sink_name","index$":3},"sink_type":{"a":true,"h":"Sink Type","n":"sink_type","r":true,"t":"`$STRING`","key$":"sink_type","index$":4}},"id":{"field":"id","name":"id"},"name":"logsink","op":{"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /v2/databases/{database_cluster_uuid}/logsink/{logsink_id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":"9cc10173-e9ea-4176-9dbc-a4cee4c4ff30","k":"param","n":"database_id","or":"database_cluster_uuid","r":true,"t":"`$STRING`","index$":0},{"a":true,"ex":"50484ec3-19d6-4cd3-b56f-3b0381c289a6","k":"param","n":"id","or":"logsink_id","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"GET","o":"/v2/databases/{database_cluster_uuid}/logsink/{logsink_id}","q":{"exist":["database_id","id"]},"r":{"param":{"database_cluster_uuid":"database_id","logsink_id":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v2"},{"lit":"databases"},{"var":"database_id"},{"lit":"logsink"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[["$.main.kit.entity.database"]]},"key$":"logsink","name__orig":"logsink","Name":"Logsink","name_":"logsink","name-":"logsink","NAME":"LOGSINK","index$":168}, {"active":true,"entity":"logsink","key$":"BasicLogsinkFlow","kind":"basic","name":"BasicLogsinkFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"logsink_ref01","srcdatavar":"logsink_ref01_data","suffix":"_dt0"},"m":{"database_id":"database01","id":"logsink01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-logsink_ref01"}}],"index$":0}]}, 'Logsink', {"GET /v2/databases/{database_cluster_uuid}/logsink/{logsink_id}":{"protocol":"http","parameters":[{"in":"path","name":"database_cluster_uuid","description":"A unique identifier for a database cluster.","required":true,"example":"9cc10173-e9ea-4176-9dbc-a4cee4c4ff30","schema":{"type":"string","format":"uuid"},"x-ref":"#/components/parameters/database_cluster_uuid","index$":0},{"in":"path","name":"logsink_id","description":"A unique identifier for a logsink of a database cluster","required":true,"example":"50484ec3-19d6-4cd3-b56f-3b0381c289a6","schema":{"type":"string"},"x-ref":"#/components/parameters/logsink_id","index$":1}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let logsink_ref01_data = Object.values(setup.data.existing.logsink)[0] as any

    // LOAD
    const logsink_ref01_ent = client.Logsink()
    const logsink_ref01_match_dt0: any = {}
    logsink_ref01_match_dt0.id = logsink_ref01_data.id
    const logsink_ref01_data_dt0 = (await logsink_ref01_ent.load(logsink_ref01_match_dt0)).data()
    assert(logsink_ref01_data_dt0.id === logsink_ref01_data.id)


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
      '../../../../.sdk/test/entity/logsink/LogsinkTestData.json')

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
    ['logsink01','logsink02','logsink03','database01','database02','database03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'DIGITALOCEAN_TEST_LOGSINK_ENTID': idmap,
    'DIGITALOCEAN_TEST_LIVE': 'FALSE',
    'DIGITALOCEAN_TEST_EXPLAIN': 'FALSE',
    'DIGITALOCEAN_APIKEY': '',
  })

  idmap = env['DIGITALOCEAN_TEST_LOGSINK_ENTID']

  const live = 'TRUE' === env.DIGITALOCEAN_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['DIGITALOCEAN_TEST_LOGSINK_ENTID']
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
  
