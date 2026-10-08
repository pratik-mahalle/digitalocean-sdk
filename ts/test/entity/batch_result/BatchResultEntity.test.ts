

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


describe('BatchResultEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when DIGITALOCEAN_TEST_LIVE=TRUE.
  afterEach(liveDelay('DIGITALOCEAN_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = DigitaloceanSDK.test()
    const ent = testsdk.BatchResult()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = DigitaloceanSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.BatchResult().load({"id":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.DIGITALOCEAN_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'batch_result.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"batch_id":{"a":true,"fo":"uuid","h":"Batch Id","n":"batch_id","r":true,"t":"`$STRING`","key$":"batch_id","index$":0},"error_file_url":{"a":true,"fo":"uri","h":"Error File Url","n":"error_file_url","r":false,"sh":"Presigned URL for the error sidecar JSONL, if any.","t":"`$STRING`","key$":"error_file_url","index$":1},"expires_at":{"a":true,"fo":"date-time","h":"Expires At","n":"expires_at","r":false,"sh":"When the presigned URLs expire.","t":"`$STRING`","key$":"expires_at","index$":2},"id":{"a":true,"h":"Id","n":"id","r":false,"t":"`$STRING`","key$":"id","index$":3},"output_file_url":{"a":true,"fo":"uri","h":"Output File Url","n":"output_file_url","r":false,"sh":"Presigned URL for the main results JSONL.","t":"`$STRING`","key$":"output_file_url","index$":4},"result_available":{"a":true,"h":"Result Available","n":"result_available","r":true,"sh":"When `false`, keep polling batch status and retry later.","t":"`$BOOLEAN`","key$":"result_available","index$":5}},"id":{"field":"id","name":"id"},"name":"batch_result","op":{"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /v1/batches/{batch_id}/results","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":"0e9d1d35-3d1e-4d66-9a2f-8c7e0f6b3e21","k":"param","n":"id","or":"batch_id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/v1/batches/{batch_id}/results","q":{"exist":["id"]},"r":{"param":{"batch_id":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v1"},{"lit":"batches"},{"var":"id"},{"lit":"results"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"batch_result","name__orig":"batch_result","Name":"BatchResult","name_":"batch_result","name-":"batch-result","NAME":"BATCH_RESULT","index$":123}, {"active":true,"entity":"batch_result","key$":"BasicBatchResultFlow","kind":"basic","name":"BasicBatchResultFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"batch_result_ref01","srcdatavar":"batch_result_ref01_data","suffix":"_dt0"},"m":{"id":"batch_result01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-batch_result_ref01"}}],"index$":0}]}, 'BatchResult', {"GET /v1/batches/{batch_id}/results":{"protocol":"http","parameters":[{"in":"path","name":"batch_id","description":"The batch job identifier.","required":true,"schema":{"type":"string","format":"uuid"},"example":"0e9d1d35-3d1e-4d66-9a2f-8c7e0f6b3e21","index$":0}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let batch_result_ref01_data = Object.values(setup.data.existing.batch_result)[0] as any

    // LOAD
    const batch_result_ref01_ent = client.BatchResult()
    const batch_result_ref01_match_dt0: any = {}
    batch_result_ref01_match_dt0.id = batch_result_ref01_data.id
    const batch_result_ref01_data_dt0 = (await batch_result_ref01_ent.load(batch_result_ref01_match_dt0)).data()
    assert(batch_result_ref01_data_dt0.id === batch_result_ref01_data.id)


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
      '../../../../.sdk/test/entity/batch_result/BatchResultTestData.json')

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
    ['batch_result01','batch_result02','batch_result03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'DIGITALOCEAN_TEST_BATCH_RESULT_ENTID': idmap,
    'DIGITALOCEAN_TEST_LIVE': 'FALSE',
    'DIGITALOCEAN_TEST_EXPLAIN': 'FALSE',
    'DIGITALOCEAN_APIKEY': '',
  })

  idmap = env['DIGITALOCEAN_TEST_BATCH_RESULT_ENTID']

  const live = 'TRUE' === env.DIGITALOCEAN_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['DIGITALOCEAN_TEST_BATCH_RESULT_ENTID']
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
  
