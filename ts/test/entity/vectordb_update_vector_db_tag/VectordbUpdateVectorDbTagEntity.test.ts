

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


describe('VectordbUpdateVectorDbTagEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when DIGITALOCEAN_TEST_LIVE=TRUE.
  afterEach(liveDelay('DIGITALOCEAN_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = DigitaloceanSDK.test()
    const ent = testsdk.VectordbUpdateVectorDbTag()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = DigitaloceanSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.VectordbUpdateVectorDbTag().update({"vector_database_id":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.DIGITALOCEAN_TEST_LIVE
    for (const op of []) {
      if (!live && maybeSkipControl(t, 'entityOp', 'vectordb_update_vector_db_tag.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"config":{"a":true,"h":"Config","n":"config","r":false,"sh":"VectorDBConfig holds optional, advanced cluster settings.","t":"`$OBJECT`","key$":"config","index$":0},"created_at":{"a":true,"fo":"date-time","h":"Created At","n":"created_at","r":false,"t":"`$STRING`","key$":"created_at","index$":1},"endpoints":{"a":true,"h":"Endpoints","n":"endpoints","r":false,"sh":"VectorDBEndpoints contains the connection endpoints for a vector database instance.","t":"`$OBJECT`","key$":"endpoints","index$":2},"forked_from_id":{"a":true,"h":"Forked From Id","n":"forked_from_id","r":false,"sh":"ID of the vector database this instance was forked from.","t":"`$STRING`","key$":"forked_from_id","index$":3},"id":{"a":true,"h":"Id","n":"id","r":false,"sh":"Required.","t":"`$STRING`","key$":"id","index$":4},"last_restore_id":{"a":true,"h":"Last Restore Id","n":"last_restore_id","r":false,"sh":"Backup_id of the most recent restore initiated against this instance.","t":"`$STRING`","key$":"last_restore_id","index$":5},"name":{"a":true,"h":"Name","n":"name","r":false,"t":"`$STRING`","key$":"name","index$":6},"owner_uuid":{"a":true,"h":"Owner Uuid","n":"owner_uuid","r":false,"t":"`$STRING`","key$":"owner_uuid","index$":7},"project_id":{"a":true,"h":"Project Id","n":"project_id","r":false,"sh":"Project this database belongs to.","t":"`$STRING`","key$":"project_id","index$":8},"region":{"a":true,"h":"Region","n":"region","r":false,"t":"`$STRING`","key$":"region","index$":9},"size":{"a":true,"h":"Size","n":"size","r":false,"sh":"Resource tier: small, medium, or large.","t":"`$STRING`","key$":"size","index$":10},"status":{"a":true,"h":"Status","n":"status","r":false,"sh":"Lifecycle state: pending, creating, active, errored, or deleting.","t":"`$STRING`","key$":"status","index$":11},"tags":{"a":true,"h":"Tags","n":"tags","r":false,"sh":"Tags to set on the vector database.","t":"`$ARRAY`","key$":"tags","index$":12},"updated_at":{"a":true,"fo":"date-time","h":"Updated At","n":"updated_at","r":false,"t":"`$STRING`","key$":"updated_at","index$":13}},"id":{"field":"id","name":"id"},"name":"vectordb_update_vector_db_tag","op":{"update":{"input":"data","name":"update","points":[{"a":true,"co":{"id":"PUT /v2/vector-databases/{id}/tags","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":"\"example string\"","k":"param","n":"vector_database_id","or":"id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"PUT","o":"/v2/vector-databases/{id}/tags","q":{"exist":["vector_database_id"]},"r":{"param":{"id":"vector_database_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v2"},{"lit":"vector-databases"},{"var":"vector_database_id"},{"lit":"tags"}],"t":{"req":"`reqdata`","res":"`body.vector_db`"},"index$":0}],"key$":"update"}},"relations":{"ancestors":[["$.main.kit.entity.vector_database"]]},"key$":"vectordb_update_vector_db_tag","name__orig":"vectordb_update_vector_db_tag","Name":"VectordbUpdateVectorDbTag","name_":"vectordb_update_vector_db_tag","name-":"vectordb-update-vector-db-tag","NAME":"VECTORDB_UPDATE_VECTOR_DB_TAG","index$":220}, {"active":true,"entity":"vectordb_update_vector_db_tag","key$":"BasicVectordbUpdateVectorDbTagFlow","kind":"basic","name":"BasicVectordbUpdateVectorDbTagFlow","param":{},"step":[{"a":false,"d":{},"i":{"ref":"vectordb_update_vector_db_tag_ref01","srcdatavar":"vectordb_update_vector_db_tag_ref01_data","suffix":"_up0","textfield":"created_at"},"m":{},"o":"update","s":[{"apply":"TextFieldMark","def":{"mark":"Mark01-vectordb_update_vector_db_tag_ref01"}}],"v":[],"unreachable":true}]}, 'VectordbUpdateVectorDbTag', {"PUT /v2/vector-databases/{id}/tags":{"protocol":"http","requestBody":{"content":{"application/json":{"schema":{"properties":{"id":{"description":"Required. ID of the vector database to update tags for.","example":"example string","type":"string","key$":"id"},"tags":{"description":"Tags to set on the vector database. Replaces all existing tags.","example":["example string"],"items":{"example":"example string","type":"string"},"type":"array","key$":"tags"}},"type":"object","x-ref":"#/components/schemas/vectordbUpdateVectorDBTagsRequest","index$":1}}}},"parameters":[{"description":"Required. ID of the vector database to update tags for.","example":"\"example string\"","in":"path","name":"id","required":true,"schema":{"type":"string"},"index$":0}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let vectordb_update_vector_db_tag_ref01_data = Object.values(setup.data.existing.vectordb_update_vector_db_tag)[0] as any

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
      '../../../../.sdk/test/entity/vectordb_update_vector_db_tag/VectordbUpdateVectorDbTagTestData.json')

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
    ['vectordb_update_vector_db_tag01','vectordb_update_vector_db_tag02','vectordb_update_vector_db_tag03','vector_database01','vector_database02','vector_database03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'DIGITALOCEAN_TEST_VECTORDB_UPDATE_VECTOR_DB_TAG_ENTID': idmap,
    'DIGITALOCEAN_TEST_LIVE': 'FALSE',
    'DIGITALOCEAN_TEST_EXPLAIN': 'FALSE',
    'DIGITALOCEAN_APIKEY': '',
  })

  idmap = env['DIGITALOCEAN_TEST_VECTORDB_UPDATE_VECTOR_DB_TAG_ENTID']

  const live = 'TRUE' === env.DIGITALOCEAN_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['DIGITALOCEAN_TEST_VECTORDB_UPDATE_VECTOR_DB_TAG_ENTID']
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
  
