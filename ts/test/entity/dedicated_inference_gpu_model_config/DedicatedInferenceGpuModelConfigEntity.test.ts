

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


describe('DedicatedInferenceGpuModelConfigEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when DIGITALOCEAN_TEST_LIVE=TRUE.
  afterEach(liveDelay('DIGITALOCEAN_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = DigitaloceanSDK.test()
    const ent = testsdk.DedicatedInferenceGpuModelConfig()
    assert(null != ent)
  })


  class FailHook extends BaseFeature {
    name = 'failhook'
    version = '0.0.1'
    active = true
    unexpected = 0
    init() { }
    PreSpec() { throw new Error('dedicated_inference_gpu_model_config hook failed') }
    PreUnexpected() { this.unexpected++ }
  }

  test('stream-error', async () => {
    const offline = { net: { offline: true } }
    await assert.rejects(async () => {
      for await (const _item of DigitaloceanSDK.test(offline).DedicatedInferenceGpuModelConfig().stream('list')) { }
    }, /offline/)

    for await (const _item of DigitaloceanSDK.test(offline).DedicatedInferenceGpuModelConfig()
      .stream('list', undefined, { ctrl: { throw: false } })) { }

    if (null != (config as any).feature?.rbac) {
      const denied = DigitaloceanSDK.test(undefined, { feature: { rbac: { active: true, deny: true } } })
      await assert.rejects(async () => {
        for await (const _item of denied.DedicatedInferenceGpuModelConfig().stream('list')) { }
      }, (err: any) => 'rbac_denied' === err.code)
    }
  })

  test('stream-ctrl', async () => {
    const explain: any = {}
    const ctrl: any = { explain }
    for await (const _item of DigitaloceanSDK.test().DedicatedInferenceGpuModelConfig().stream('list', undefined, { ctrl })) { }
    assert.deepStrictEqual(Object.keys(ctrl), ['explain'])
    assert(explain === ctrl.explain && 0 < Object.keys(explain).length)
  })

  test('unexpected', async () => {
    const hook = new FailHook()
    const client = new DigitaloceanSDK({ feature: { test: { active: true } }, extend: [hook] })
    await assert.rejects(client.DedicatedInferenceGpuModelConfig().list(), /hook failed/)
    assert(0 < hook.unexpected)

    const fired = hook.unexpected
    assert.strictEqual(await client.DedicatedInferenceGpuModelConfig().list(undefined, { throw: false }), undefined)
    assert(fired < hook.unexpected)
  })

  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = DigitaloceanSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.DedicatedInferenceGpuModelConfig().list({"is_gated_model":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.DIGITALOCEAN_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'dedicated_inference_gpu_model_config.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"gpu_slugs":{"a":true,"h":"Gpu Slugs","n":"gpu_slugs","r":false,"t":"`$ARRAY`","key$":"gpu_slugs","index$":0},"is_gated_model":{"a":true,"h":"Is Gated Model","n":"is_gated_model","r":false,"sh":"Whether the model requires gated access (e.g.","t":"`$BOOLEAN`","key$":"is_gated_model","index$":1},"model_name":{"a":true,"h":"Model Name","n":"model_name","r":false,"t":"`$STRING`","key$":"model_name","index$":2},"model_slug":{"a":true,"h":"Model Slug","n":"model_slug","r":false,"t":"`$STRING`","key$":"model_slug","index$":3}},"name":"dedicated_inference_gpu_model_config","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /v2/dedicated-inferences/gpu-model-config","source":"openapi3","version":2},"g":{},"k":"http","m":"GET","o":"/v2/dedicated-inferences/gpu-model-config","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v2"},{"lit":"dedicated-inferences"},{"lit":"gpu-model-config"}],"t":{"req":"`reqdata`","res":"`body.gpu_model_configs`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"dedicated_inference_gpu_model_config","name__orig":"dedicated_inference_gpu_model_config","Name":"DedicatedInferenceGpuModelConfig","name_":"dedicated_inference_gpu_model_config","name-":"dedicated-inference-gpu-model-config","NAME":"DEDICATED_INFERENCE_GPU_MODEL_CONFIG","index$":140}, {"active":true,"entity":"dedicated_inference_gpu_model_config","key$":"BasicDedicatedInferenceGpuModelConfigFlow","kind":"basic","name":"BasicDedicatedInferenceGpuModelConfigFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"dedicated_inference_gpu_model_config_ref01"}}],"index$":0}]}, 'DedicatedInferenceGpuModelConfig', {"GET /v2/dedicated-inferences/gpu-model-config":{"protocol":"http","parameters":[]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let dedicated_inference_gpu_model_config_ref01_data = Object.values(setup.data.existing.dedicated_inference_gpu_model_config)[0] as any

    // LIST
    const dedicated_inference_gpu_model_config_ref01_ent = client.DedicatedInferenceGpuModelConfig()
    const dedicated_inference_gpu_model_config_ref01_match: any = {}

    const dedicated_inference_gpu_model_config_ref01_list = (await dedicated_inference_gpu_model_config_ref01_ent.list(dedicated_inference_gpu_model_config_ref01_match)).map((e: any) => e.data())


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
      '../../../../.sdk/test/entity/dedicated_inference_gpu_model_config/DedicatedInferenceGpuModelConfigTestData.json')

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
    ['dedicated_inference_gpu_model_config01','dedicated_inference_gpu_model_config02','dedicated_inference_gpu_model_config03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'DIGITALOCEAN_TEST_DEDICATED_INFERENCE_GPU_MODEL_CONFIG_ENTID': idmap,
    'DIGITALOCEAN_TEST_LIVE': 'FALSE',
    'DIGITALOCEAN_TEST_EXPLAIN': 'FALSE',
    'DIGITALOCEAN_APIKEY': '',
  })

  idmap = env['DIGITALOCEAN_TEST_DEDICATED_INFERENCE_GPU_MODEL_CONFIG_ENTID']

  const live = 'TRUE' === env.DIGITALOCEAN_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['DIGITALOCEAN_TEST_DEDICATED_INFERENCE_GPU_MODEL_CONFIG_ENTID']
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
  
