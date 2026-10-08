

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


describe('ApiModelPublicEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when DIGITALOCEAN_TEST_LIVE=TRUE.
  afterEach(liveDelay('DIGITALOCEAN_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = DigitaloceanSDK.test()
    const ent = testsdk.ApiModelPublic()
    assert(null != ent)
  })


  class FailHook extends BaseFeature {
    name = 'failhook'
    version = '0.0.1'
    active = true
    unexpected = 0
    init() { }
    PreSpec() { throw new Error('api_model_public hook failed') }
    PreUnexpected() { this.unexpected++ }
  }

  test('stream-error', async () => {
    const offline = { net: { offline: true } }
    await assert.rejects(async () => {
      for await (const _item of DigitaloceanSDK.test(offline).ApiModelPublic().stream('list')) { }
    }, /offline/)

    for await (const _item of DigitaloceanSDK.test(offline).ApiModelPublic()
      .stream('list', undefined, { ctrl: { throw: false } })) { }

    if (null != (config as any).feature?.rbac) {
      const denied = DigitaloceanSDK.test(undefined, { feature: { rbac: { active: true, deny: true } } })
      await assert.rejects(async () => {
        for await (const _item of denied.ApiModelPublic().stream('list')) { }
      }, (err: any) => 'rbac_denied' === err.code)
    }
  })

  test('stream-ctrl', async () => {
    const explain: any = {}
    const ctrl: any = { explain }
    for await (const _item of DigitaloceanSDK.test().ApiModelPublic().stream('list', undefined, { ctrl })) { }
    assert.deepStrictEqual(Object.keys(ctrl), ['explain'])
    assert(explain === ctrl.explain && 0 < Object.keys(explain).length)
  })

  test('unexpected', async () => {
    const hook = new FailHook()
    const client = new DigitaloceanSDK({ feature: { test: { active: true } }, extend: [hook] })
    await assert.rejects(client.ApiModelPublic().list(), /hook failed/)
    assert(0 < hook.unexpected)

    const fired = hook.unexpected
    assert.strictEqual(await client.ApiModelPublic().list(undefined, { throw: false }), undefined)
    assert(fired < hook.unexpected)
  })

  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = DigitaloceanSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.ApiModelPublic().list({"page":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.DIGITALOCEAN_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'api_model_public.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"agreement":{"a":true,"h":"Agreement","n":"agreement","r":false,"sh":"Agreement Description","t":"`$OBJECT`","key$":"agreement","index$":0},"benchmark_score":{"a":true,"h":"Benchmark Score","n":"benchmark_score","r":false,"sh":"Benchmark scores for this model, stored as arbitrary JSON","t":"`$OBJECT`","key$":"benchmark_score","index$":1},"capabilities":{"a":true,"h":"Capabilities","n":"capabilities","r":false,"sh":"Model capabilities (inference, reasoning, vectorization, etc.)","t":"`$ARRAY`","key$":"capabilities","index$":2},"context_window":{"a":true,"fo":"int64","h":"Context Window","n":"context_window","r":false,"sh":"Context window (maximum tokens)","t":"`$STRING`","key$":"context_window","index$":3},"created_at":{"a":true,"fo":"date-time","h":"Created At","n":"created_at","r":false,"sh":"Creation date / time","t":"`$STRING`","key$":"created_at","index$":4},"description":{"a":true,"h":"Description","n":"description","r":false,"sh":"Model description","t":"`$STRING`","key$":"description","index$":5},"endpoints":{"a":true,"h":"Endpoints","n":"endpoints","r":false,"sh":"Available endpoints and their capabilities","t":"`$ARRAY`","key$":"endpoints","index$":6},"id":{"a":true,"h":"Id","n":"id","r":false,"sh":"Human-readable model identifier","t":"`$STRING`","key$":"id","index$":7},"is_foundational":{"a":true,"h":"Is Foundational","n":"is_foundational","r":false,"sh":"True if it is a foundational model provided by do","t":"`$BOOLEAN`","key$":"is_foundational","index$":8},"kb_default_chunk_size":{"a":true,"fo":"int64","h":"Kb Default Chunk Size","n":"kb_default_chunk_size","r":false,"sh":"Default chunking size limit to show in UI","t":"`$INTEGER`","key$":"kb_default_chunk_size","index$":9},"kb_max_chunk_size":{"a":true,"fo":"int64","h":"Kb Max Chunk Size","n":"kb_max_chunk_size","r":false,"sh":"Maximum chunk size limit of model","t":"`$INTEGER`","key$":"kb_max_chunk_size","index$":10},"kb_min_chunk_size":{"a":true,"fo":"int64","h":"Kb Min Chunk Size","n":"kb_min_chunk_size","r":false,"sh":"Minimum chunking size token limits if model supports KNOWLEDGEBASE usecase","t":"`$INTEGER`","key$":"kb_min_chunk_size","index$":11},"lifecycle_status":{"a":true,"h":"Lifecycle Status","n":"lifecycle_status","r":false,"sh":"Lifecycle status of the model (internal, public-preview, active, deprecated, end_of_life)","t":"`$STRING`","key$":"lifecycle_status","index$":12},"modalities":{"a":true,"h":"Modalities","n":"modalities","r":false,"sh":"Input/output modalities","t":"`$OBJECT`","key$":"modalities","index$":13},"model_availability":{"a":true,"h":"Model Availability","n":"model_availability","r":false,"sh":"Model availability (serverless, dedicated, etc.)","t":"`$STRING`","key$":"model_availability","index$":14},"name":{"a":true,"h":"Name","n":"name","r":false,"sh":"Display name of the model","t":"`$STRING`","key$":"name","index$":15},"parameter_count":{"a":true,"fo":"float","h":"Parameter Count","n":"parameter_count","r":false,"sh":"Parameter count in billions","t":"`$NUMBER`","key$":"parameter_count","index$":16},"parent_uuid":{"a":true,"h":"Parent Uuid","n":"parent_uuid","r":false,"sh":"Unique id of the model, this model is based on","t":"`$STRING`","key$":"parent_uuid","index$":17},"pricing":{"a":true,"h":"Pricing","n":"pricing","r":false,"sh":"Pricing per million tokens (aligns with existing ModelPrice pattern)","t":"`$OBJECT`","key$":"pricing","index$":18},"provider":{"a":true,"h":"Provider","n":"provider","r":false,"t":"`$STRING`","key$":"provider","index$":19},"reasoning_efforts":{"a":true,"h":"Reasoning Efforts","n":"reasoning_efforts","r":false,"sh":"Available reasoning efforts for this model","t":"`$ARRAY`","key$":"reasoning_efforts","index$":20},"settings":{"a":true,"h":"Settings","n":"settings","r":false,"sh":"Playground settings derived from model metadata","t":"`$ARRAY`","key$":"settings","index$":21},"thinking":{"a":true,"h":"Thinking","n":"thinking","r":false,"sh":"Whether this model supports extended thinking (Anthropic models)","t":"`$BOOLEAN`","key$":"thinking","index$":22},"type":{"a":true,"h":"Type","n":"type","r":false,"sh":"Model type (chat, embedding, image, reasoning, coding)","t":"`$STRING`","key$":"type","index$":23},"updated_at":{"a":true,"fo":"date-time","h":"Updated At","n":"updated_at","r":false,"sh":"Last modified","t":"`$STRING`","key$":"updated_at","index$":24},"upload_complete":{"a":true,"h":"Upload Complete","n":"upload_complete","r":false,"sh":"Model has been fully uploaded","t":"`$BOOLEAN`","key$":"upload_complete","index$":25},"url":{"a":true,"h":"Url","n":"url","r":false,"sh":"Download url","t":"`$STRING`","key$":"url","index$":26},"uuid":{"a":true,"h":"Uuid","n":"uuid","r":false,"sh":"Unique id","t":"`$STRING`","key$":"uuid","index$":27},"version":{"a":true,"h":"Version","n":"version","r":false,"sh":"Version Information about a Model","t":"`$OBJECT`","key$":"version","index$":28}},"id":{"field":"id","name":"id"},"name":"api_model_public","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /v2/gen-ai/models","source":"openapi3","version":2},"g":{"query":[{"a":true,"ex":1,"k":"query","n":"page","or":"page","r":false,"t":"`$INTEGER`","index$":0},{"a":true,"ex":1,"k":"query","n":"per_page","or":"per_page","r":false,"t":"`$INTEGER`","index$":1},{"a":true,"ex":true,"k":"query","n":"public_only","or":"public_only","r":false,"t":"`$BOOLEAN`","index$":2},{"a":true,"ex":["MODEL_USECASE_UNKNOWN"],"k":"query","n":"usecase","or":"usecases","r":false,"t":"`$ARRAY`","index$":3}]},"k":"http","m":"GET","o":"/v2/gen-ai/models","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v2"},{"lit":"gen-ai"},{"lit":"models"}],"t":{"req":"`reqdata`","res":"`body.models`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"api_model_public","name__orig":"api_model_public","Name":"ApiModelPublic","name_":"api_model_public","name-":"api-model-public","NAME":"API_MODEL_PUBLIC","index$":75}, {"active":true,"entity":"api_model_public","key$":"BasicApiModelPublicFlow","kind":"basic","name":"BasicApiModelPublicFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"api_model_public_ref01"}}],"index$":0}]}, 'ApiModelPublic', {"GET /v2/gen-ai/models":{"protocol":"http","parameters":[{"description":"Include only models defined for the listed usecases.\n\n - MODEL_USECASE_UNKNOWN: The use case of the model is unknown\n - MODEL_USECASE_AGENT: The model maybe used in an agent\n - MODEL_USECASE_FINETUNED: The model maybe used for fine tuning\n - MODEL_USECASE_KNOWLEDGEBASE: The model maybe used for knowledge bases (embedding models)\n - MODEL_USECASE_GUARDRAIL: The model maybe used for guardrails\n - MODEL_USECASE_REASONING: The model usecase for reasoning\n - MODEL_USECASE_SERVERLESS: The model usecase for serverless inference","example":["MODEL_USECASE_UNKNOWN"],"in":"query","name":"usecases","schema":{"items":{"enum":["MODEL_USECASE_UNKNOWN","MODEL_USECASE_AGENT","MODEL_USECASE_FINETUNED","MODEL_USECASE_KNOWLEDGEBASE","MODEL_USECASE_GUARDRAIL","MODEL_USECASE_REASONING","MODEL_USECASE_SERVERLESS"],"type":"string"},"type":"array"},"index$":0},{"description":"Only include models that are publicly available.","example":true,"in":"query","name":"public_only","schema":{"type":"boolean"},"index$":1},{"description":"Page number.","example":1,"in":"query","name":"page","schema":{"type":"integer"},"index$":2},{"description":"Items per page.","example":1,"in":"query","name":"per_page","schema":{"type":"integer"},"index$":3}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let api_model_public_ref01_data = Object.values(setup.data.existing.api_model_public)[0] as any

    // LIST
    const api_model_public_ref01_ent = client.ApiModelPublic()
    const api_model_public_ref01_match: any = {}

    const api_model_public_ref01_list = (await api_model_public_ref01_ent.list(api_model_public_ref01_match)).map((e: any) => e.data())


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
      '../../../../.sdk/test/entity/api_model_public/ApiModelPublicTestData.json')

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
    ['api_model_public01','api_model_public02','api_model_public03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'DIGITALOCEAN_TEST_API_MODEL_PUBLIC_ENTID': idmap,
    'DIGITALOCEAN_TEST_LIVE': 'FALSE',
    'DIGITALOCEAN_TEST_EXPLAIN': 'FALSE',
    'DIGITALOCEAN_APIKEY': '',
  })

  idmap = env['DIGITALOCEAN_TEST_API_MODEL_PUBLIC_ENTID']

  const live = 'TRUE' === env.DIGITALOCEAN_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['DIGITALOCEAN_TEST_API_MODEL_PUBLIC_ENTID']
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
  
