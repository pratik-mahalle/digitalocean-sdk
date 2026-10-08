

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


describe('DedicatedInferenceAcceleratorEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when DIGITALOCEAN_TEST_LIVE=TRUE.
  afterEach(liveDelay('DIGITALOCEAN_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = DigitaloceanSDK.test()
    const ent = testsdk.DedicatedInferenceAccelerator()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = DigitaloceanSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.DedicatedInferenceAccelerator().load({"dedicated_inference_id":1,"id":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.DIGITALOCEAN_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'dedicated_inference_accelerator.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"created_at":{"a":true,"fo":"date-time","h":"Created At","n":"created_at","r":false,"ro":true,"t":"`$STRING`","key$":"created_at","index$":0},"id":{"a":true,"fo":"uuid","h":"Id","n":"id","r":false,"ro":true,"sh":"Unique ID of the accelerator.","t":"`$STRING`","key$":"id","index$":1},"name":{"a":true,"h":"Name","n":"name","r":false,"ro":true,"sh":"Name of the accelerator.","t":"`$STRING`","key$":"name","index$":2},"role":{"a":true,"h":"Role","n":"role","r":false,"ro":true,"sh":"Role of the accelerator (e.g.","t":"`$STRING`","key$":"role","index$":3},"slug":{"a":true,"h":"Slug","n":"slug","r":false,"ro":true,"sh":"DigitalOcean GPU slug.","t":"`$STRING`","key$":"slug","index$":4},"status":{"a":true,"h":"Status","n":"status","r":false,"ro":true,"sh":"Status of the accelerator.","t":"`$STRING`","key$":"status","index$":5}},"id":{"field":"id","name":"id"},"name":"dedicated_inference_accelerator","op":{"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /v2/dedicated-inferences/{dedicated_inference_id}/accelerators/{accelerator_id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":"6b5c619c-359c-44ca-87e2-47e98170c01d","k":"param","n":"dedicated_inference_id","or":"dedicated_inference_id","r":true,"t":"`$STRING`","index$":0},{"a":true,"ex":"5b5c619c-359c-44ca-87e2-47e98170c02f","k":"param","n":"id","or":"accelerator_id","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"GET","o":"/v2/dedicated-inferences/{dedicated_inference_id}/accelerators/{accelerator_id}","q":{"exist":["dedicated_inference_id","id"]},"r":{"param":{"accelerator_id":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v2"},{"lit":"dedicated-inferences"},{"var":"dedicated_inference_id"},{"lit":"accelerators"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[["$.main.kit.entity.dedicated_inference"]]},"key$":"dedicated_inference_accelerator","name__orig":"dedicated_inference_accelerator","Name":"DedicatedInferenceAccelerator","name_":"dedicated_inference_accelerator","name-":"dedicated-inference-accelerator","NAME":"DEDICATED_INFERENCE_ACCELERATOR","index$":137}, {"active":true,"entity":"dedicated_inference_accelerator","key$":"BasicDedicatedInferenceAcceleratorFlow","kind":"basic","name":"BasicDedicatedInferenceAcceleratorFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"dedicated_inference_accelerator_ref01","srcdatavar":"dedicated_inference_accelerator_ref01_data","suffix":"_dt0"},"m":{"dedicated_inference_id":"dedicated_inference01","id":"dedicated_inference_accelerator01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-dedicated_inference_accelerator_ref01"}}],"index$":0}]}, 'DedicatedInferenceAccelerator', {"GET /v2/dedicated-inferences/{dedicated_inference_id}/accelerators/{accelerator_id}":{"protocol":"http","parameters":[{"name":"dedicated_inference_id","in":"path","required":true,"description":"A unique identifier for a Dedicated Inference instance.","schema":{"type":"string","format":"uuid"},"example":"6b5c619c-359c-44ca-87e2-47e98170c01d","x-ref":"#/components/parameters/dedicated_inference_id","index$":0},{"name":"accelerator_id","in":"path","required":true,"description":"A unique identifier for a Dedicated Inference accelerator.","schema":{"type":"string","format":"uuid"},"example":"5b5c619c-359c-44ca-87e2-47e98170c02f","x-ref":"#/components/parameters/accelerator_id","index$":1}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let dedicated_inference_accelerator_ref01_data = Object.values(setup.data.existing.dedicated_inference_accelerator)[0] as any

    // LOAD
    const dedicated_inference_accelerator_ref01_ent = client.DedicatedInferenceAccelerator()
    const dedicated_inference_accelerator_ref01_match_dt0: any = {}
    dedicated_inference_accelerator_ref01_match_dt0.id = dedicated_inference_accelerator_ref01_data.id
    const dedicated_inference_accelerator_ref01_data_dt0 = (await dedicated_inference_accelerator_ref01_ent.load(dedicated_inference_accelerator_ref01_match_dt0)).data()
    assert(dedicated_inference_accelerator_ref01_data_dt0.id === dedicated_inference_accelerator_ref01_data.id)


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
      '../../../../.sdk/test/entity/dedicated_inference_accelerator/DedicatedInferenceAcceleratorTestData.json')

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
    ['dedicated_inference_accelerator01','dedicated_inference_accelerator02','dedicated_inference_accelerator03','dedicated_inference01','dedicated_inference02','dedicated_inference03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'DIGITALOCEAN_TEST_DEDICATED_INFERENCE_ACCELERATOR_ENTID': idmap,
    'DIGITALOCEAN_TEST_LIVE': 'FALSE',
    'DIGITALOCEAN_TEST_EXPLAIN': 'FALSE',
    'DIGITALOCEAN_APIKEY': '',
  })

  idmap = env['DIGITALOCEAN_TEST_DEDICATED_INFERENCE_ACCELERATOR_ENTID']

  const live = 'TRUE' === env.DIGITALOCEAN_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['DIGITALOCEAN_TEST_DEDICATED_INFERENCE_ACCELERATOR_ENTID']
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
  
