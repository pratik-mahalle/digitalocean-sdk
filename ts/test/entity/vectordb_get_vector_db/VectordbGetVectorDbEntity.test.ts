

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


describe('VectordbGetVectorDbEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when DIGITALOCEAN_TEST_LIVE=TRUE.
  afterEach(liveDelay('DIGITALOCEAN_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = DigitaloceanSDK.test()
    const ent = testsdk.VectordbGetVectorDb()
    assert(null != ent)
  })


  class FailHook extends BaseFeature {
    name = 'failhook'
    version = '0.0.1'
    active = true
    unexpected = 0
    init() { }
    PreSpec() { throw new Error('vectordb_get_vector_db hook failed') }
    PreUnexpected() { this.unexpected++ }
  }

  test('stream-error', async () => {
    const offline = { net: { offline: true } }
    await assert.rejects(async () => {
      for await (const _item of DigitaloceanSDK.test(offline).VectordbGetVectorDb().stream('list')) { }
    }, /offline/)

    for await (const _item of DigitaloceanSDK.test(offline).VectordbGetVectorDb()
      .stream('list', undefined, { ctrl: { throw: false } })) { }

    if (null != (config as any).feature?.rbac) {
      const denied = DigitaloceanSDK.test(undefined, { feature: { rbac: { active: true, deny: true } } })
      await assert.rejects(async () => {
        for await (const _item of denied.VectordbGetVectorDb().stream('list')) { }
      }, (err: any) => 'rbac_denied' === err.code)
    }
  })

  test('stream-ctrl', async () => {
    const explain: any = {}
    const ctrl: any = { explain }
    for await (const _item of DigitaloceanSDK.test().VectordbGetVectorDb().stream('list', undefined, { ctrl })) { }
    assert.deepStrictEqual(Object.keys(ctrl), ['explain'])
    assert(explain === ctrl.explain && 0 < Object.keys(explain).length)
  })

  test('unexpected', async () => {
    const hook = new FailHook()
    const client = new DigitaloceanSDK({ feature: { test: { active: true } }, extend: [hook] })
    await assert.rejects(client.VectordbGetVectorDb().list(), /hook failed/)
    assert(0 < hook.unexpected)

    const fired = hook.unexpected
    assert.strictEqual(await client.VectordbGetVectorDb().list(undefined, { throw: false }), undefined)
    assert(fired < hook.unexpected)
  })

  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = DigitaloceanSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.VectordbGetVectorDb().list({"page":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.DIGITALOCEAN_TEST_LIVE
    for (const op of ['create', 'list', 'load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'vectordb_get_vector_db.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"config":{"a":true,"h":"Config","n":"config","r":false,"sh":"VectorDBConfig holds optional, advanced cluster settings.","t":"`$OBJECT`","key$":"config","index$":0},"created_at":{"a":true,"fo":"date-time","h":"Created At","n":"created_at","r":false,"t":"`$STRING`","key$":"created_at","index$":1},"endpoints":{"a":true,"h":"Endpoints","n":"endpoints","r":false,"sh":"VectorDBEndpoints contains the connection endpoints for a vector database instance.","t":"`$OBJECT`","key$":"endpoints","index$":2},"forked_from_id":{"a":true,"h":"Forked From Id","n":"forked_from_id","r":false,"sh":"ID of the vector database this instance was forked from.","t":"`$STRING`","key$":"forked_from_id","index$":3},"id":{"a":true,"h":"Id","n":"id","r":false,"t":"`$STRING`","key$":"id","index$":4},"last_restore_id":{"a":true,"h":"Last Restore Id","n":"last_restore_id","r":false,"sh":"Backup_id of the most recent restore initiated against this instance.","t":"`$STRING`","key$":"last_restore_id","index$":5},"name":{"a":true,"h":"Name","n":"name","r":false,"sh":"Required.","t":"`$STRING`","key$":"name","index$":6},"owner_uuid":{"a":true,"h":"Owner Uuid","n":"owner_uuid","r":false,"t":"`$STRING`","key$":"owner_uuid","index$":7},"project_id":{"a":true,"h":"Project Id","n":"project_id","r":false,"sh":"Project this database belongs to.","t":"`$STRING`","key$":"project_id","index$":8},"region":{"a":true,"h":"Region","n":"region","r":false,"sh":"Required.","t":"`$STRING`","key$":"region","index$":9},"size":{"a":true,"h":"Size","n":"size","r":false,"sh":"Resource tier: small, medium, or large.","t":"`$STRING`","key$":"size","index$":10},"status":{"a":true,"h":"Status","n":"status","r":false,"sh":"Lifecycle state: pending, creating, active, errored, or deleting.","t":"`$STRING`","key$":"status","index$":11},"tags":{"a":true,"h":"Tags","n":"tags","r":false,"sh":"A set of arbitrary tags to organize your vector database","t":"`$ARRAY`","key$":"tags","index$":12},"updated_at":{"a":true,"fo":"date-time","h":"Updated At","n":"updated_at","r":false,"t":"`$STRING`","key$":"updated_at","index$":13}},"id":{"field":"id","name":"id"},"name":"vectordb_get_vector_db","op":{"create":{"input":"data","name":"create","points":[{"a":true,"co":{"id":"POST /v2/vector-databases/{id}/resize","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":"\"example string\"","k":"param","n":"vector_database_id","or":"id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"POST","o":"/v2/vector-databases/{id}/resize","q":{"$action":"resize","exist":["vector_database_id"]},"r":{"param":{"id":"vector_database_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v2"},{"lit":"vector-databases"},{"var":"vector_database_id"},{"lit":"resize"}],"t":{"req":"`reqdata`","res":"`body.vector_db`"},"index$":0},{"a":true,"co":{"id":"POST /v2/vector-databases","source":"openapi3","version":2},"g":{},"k":"http","m":"POST","o":"/v2/vector-databases","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v2"},{"lit":"vector-databases"}],"t":{"req":"`reqdata`","res":"`body.vector_db`"},"index$":1}],"key$":"create"},"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /v2/vector-databases","source":"openapi3","version":2},"g":{"query":[{"a":true,"ex":1,"k":"query","n":"page","or":"page","r":false,"t":"`$INTEGER`","index$":0},{"a":true,"ex":1,"k":"query","n":"per_page","or":"per_page","r":false,"t":"`$INTEGER`","index$":1}]},"k":"http","m":"GET","o":"/v2/vector-databases","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v2"},{"lit":"vector-databases"}],"t":{"req":"`reqdata`","res":"`body.vector_dbs`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /v2/vector-databases/{id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":"\"example string\"","k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/v2/vector-databases/{id}","q":{"exist":["id"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v2"},{"lit":"vector-databases"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body.vector_db`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[["$.main.kit.entity.vector_database"]]},"key$":"vectordb_get_vector_db","name__orig":"vectordb_get_vector_db","Name":"VectordbGetVectorDb","name_":"vectordb_get_vector_db","name-":"vectordb-get-vector-db","NAME":"VECTORDB_GET_VECTOR_DB","index$":216}, {"active":true,"entity":"vectordb_get_vector_db","key$":"BasicVectordbGetVectorDbFlow","kind":"basic","name":"BasicVectordbGetVectorDbFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"vectordb_get_vector_db_ref01"},"m":{},"o":"create","s":[],"v":[],"index$":0},{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"vectordb_get_vector_db_ref01"}}],"index$":1},{"a":true,"d":{},"i":{"ref":"vectordb_get_vector_db_ref01","srcdatavar":"vectordb_get_vector_db_ref01_data","suffix":"_dt0"},"m":{"id":"vectordb_get_vector_db01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-vectordb_get_vector_db_ref01"}}],"index$":2}]}, 'VectordbGetVectorDb', {"POST /v2/vector-databases/{id}/resize":{"protocol":"http","requestBody":{"content":{"application/json":{"schema":{"properties":{"id":{"description":"Required. ID of the vector database to resize.","example":"example string","type":"string"},"size":{"description":"Required. Target resource tier: small, medium, or large.","example":"example string","type":"string"}},"type":"object","x-ref":"#/components/schemas/vectordbResizeVectorDBRequest"}}}},"parameters":[{"description":"Required. ID of the vector database to resize.","example":"\"example string\"","in":"path","name":"id","required":true,"schema":{"type":"string"},"index$":0}]},"POST /v2/vector-databases":{"protocol":"http","requestBody":{"content":{"application/json":{"schema":{"properties":{"name":{"description":"Required. Human-readable name for the database.","example":"example name","type":"string","key$":"name"},"project_id":{"description":"Required. ID of the project to create the vector database in.","example":"123e4567-e89b-12d3-a456-426614174000","type":"string","key$":"project_id"},"region":{"description":"Required. Region slug where the database will be provisioned.","example":"tor1","type":"string","key$":"region"},"size":{"description":"Required. Resource tier: small, medium, or large.","example":"example string","type":"string","key$":"size"},"tags":{"description":"A set of arbitrary tags to organize your vector database","example":["example string"],"items":{"example":"example string","type":"string"},"type":"array","key$":"tags"}},"type":"object","x-ref":"#/components/schemas/vectordbCreateVectorDBRequest","index$":1}}}},"parameters":[]},"GET /v2/vector-databases":{"protocol":"http","parameters":[{"example":1,"in":"query","name":"page","schema":{"type":"integer"},"index$":0},{"example":1,"in":"query","name":"per_page","schema":{"type":"integer"},"index$":1}]},"GET /v2/vector-databases/{id}":{"protocol":"http","parameters":[{"description":"ID of the vector database.","example":"\"example string\"","in":"path","name":"id","required":true,"schema":{"type":"string"},"index$":0}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const vectordb_get_vector_db_ref01_ent = client.VectordbGetVectorDb()
    let vectordb_get_vector_db_ref01_data = setup.data.new.vectordb_get_vector_db['vectordb_get_vector_db_ref01']

    vectordb_get_vector_db_ref01_data = (await vectordb_get_vector_db_ref01_ent.create(vectordb_get_vector_db_ref01_data)).data()
    assert(null != vectordb_get_vector_db_ref01_data.id)


    // LIST
    const vectordb_get_vector_db_ref01_match: any = {}

    const vectordb_get_vector_db_ref01_list = (await vectordb_get_vector_db_ref01_ent.list(vectordb_get_vector_db_ref01_match)).map((e: any) => e.data())

    assert(!isempty(select(vectordb_get_vector_db_ref01_list, { id: vectordb_get_vector_db_ref01_data.id })))


    // LOAD
    const vectordb_get_vector_db_ref01_match_dt0: any = {}
    vectordb_get_vector_db_ref01_match_dt0.id = vectordb_get_vector_db_ref01_data.id
    const vectordb_get_vector_db_ref01_data_dt0 = (await vectordb_get_vector_db_ref01_ent.load(vectordb_get_vector_db_ref01_match_dt0)).data()
    assert(vectordb_get_vector_db_ref01_data_dt0.id === vectordb_get_vector_db_ref01_data.id)


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
      '../../../../.sdk/test/entity/vectordb_get_vector_db/VectordbGetVectorDbTestData.json')

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
    ['vectordb_get_vector_db01','vectordb_get_vector_db02','vectordb_get_vector_db03','vector_database01','vector_database02','vector_database03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'DIGITALOCEAN_TEST_VECTORDB_GET_VECTOR_DB_ENTID': idmap,
    'DIGITALOCEAN_TEST_LIVE': 'FALSE',
    'DIGITALOCEAN_TEST_EXPLAIN': 'FALSE',
    'DIGITALOCEAN_APIKEY': '',
  })

  idmap = env['DIGITALOCEAN_TEST_VECTORDB_GET_VECTOR_DB_ENTID']

  const live = 'TRUE' === env.DIGITALOCEAN_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['DIGITALOCEAN_TEST_VECTORDB_GET_VECTOR_DB_ENTID']
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
  
