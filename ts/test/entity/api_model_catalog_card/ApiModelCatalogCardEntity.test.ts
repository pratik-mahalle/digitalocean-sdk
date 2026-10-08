

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


describe('ApiModelCatalogCardEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when DIGITALOCEAN_TEST_LIVE=TRUE.
  afterEach(liveDelay('DIGITALOCEAN_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = DigitaloceanSDK.test()
    const ent = testsdk.ApiModelCatalogCard()
    assert(null != ent)
  })


  class FailHook extends BaseFeature {
    name = 'failhook'
    version = '0.0.1'
    active = true
    unexpected = 0
    init() { }
    PreSpec() { throw new Error('api_model_catalog_card hook failed') }
    PreUnexpected() { this.unexpected++ }
  }

  test('stream-error', async () => {
    const offline = { net: { offline: true } }
    await assert.rejects(async () => {
      for await (const _item of DigitaloceanSDK.test(offline).ApiModelCatalogCard().stream('list')) { }
    }, /offline/)

    for await (const _item of DigitaloceanSDK.test(offline).ApiModelCatalogCard()
      .stream('list', undefined, { ctrl: { throw: false } })) { }

    if (null != (config as any).feature?.rbac) {
      const denied = DigitaloceanSDK.test(undefined, { feature: { rbac: { active: true, deny: true } } })
      await assert.rejects(async () => {
        for await (const _item of denied.ApiModelCatalogCard().stream('list')) { }
      }, (err: any) => 'rbac_denied' === err.code)
    }
  })

  test('stream-ctrl', async () => {
    const explain: any = {}
    const ctrl: any = { explain }
    for await (const _item of DigitaloceanSDK.test().ApiModelCatalogCard().stream('list', undefined, { ctrl })) { }
    assert.deepStrictEqual(Object.keys(ctrl), ['explain'])
    assert(explain === ctrl.explain && 0 < Object.keys(explain).length)
  })

  test('unexpected', async () => {
    const hook = new FailHook()
    const client = new DigitaloceanSDK({ feature: { test: { active: true } }, extend: [hook] })
    await assert.rejects(client.ApiModelCatalogCard().list(), /hook failed/)
    assert(0 < hook.unexpected)

    const fired = hook.unexpected
    assert.strictEqual(await client.ApiModelCatalogCard().list(undefined, { throw: false }), undefined)
    assert(fired < hook.unexpected)
  })

  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = DigitaloceanSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.ApiModelCatalogCard().list({"limit":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.DIGITALOCEAN_TEST_LIVE
    for (const op of ['list', 'load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'api_model_catalog_card.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"availability":{"a":true,"h":"Availability","n":"availability","r":false,"t":"`$ARRAY`","key$":"availability","index$":0},"badges":{"a":true,"h":"Badges","n":"badges","r":false,"sh":"Badges for models","t":"`$ARRAY`","key$":"badges","index$":1},"benchmark_score":{"a":true,"h":"Benchmark Score","n":"benchmark_score","r":false,"sh":"Benchmark scores for this model, stored as arbitrary JSON","t":"`$OBJECT`","key$":"benchmark_score","index$":2},"capabilities":{"a":true,"h":"Capabilities","n":"capabilities","r":false,"t":"`$ARRAY`","key$":"capabilities","index$":3},"code_snippets":{"a":true,"h":"Code Snippets","n":"code_snippets","r":false,"sh":"Code examples for using the model","t":"`$OBJECT`","key$":"code_snippets","index$":4},"context_window":{"a":true,"fo":"int64","h":"Context Window","n":"context_window","r":false,"sh":"Specs (same as Entry)","t":"`$STRING`","key$":"context_window","index$":5},"created_at":{"a":true,"fo":"date-time","h":"Created At","n":"created_at","r":false,"sh":"RFC 3339 timestamp indicating when the model was added to the catalog.","t":"`$STRING`","key$":"created_at","index$":6},"creator":{"a":true,"h":"Creator","n":"creator","r":false,"sh":"Model creator/developer (e.g., \"Meta\", \"Anthropic\", \"OpenAI\")","t":"`$STRING`","key$":"creator","index$":7},"description":{"a":true,"h":"Description","n":"description","r":false,"sh":"Card-specific","t":"`$STRING`","key$":"description","index$":8},"hugging_face_id":{"a":true,"h":"Hugging Face Id","n":"hugging_face_id","r":false,"sh":"The Hugging Face repository ID (e.g.","t":"`$STRING`","key$":"hugging_face_id","index$":9},"id":{"a":true,"h":"Id","n":"id","r":false,"sh":"Identity (same as Entry)","t":"`$STRING`","key$":"id","index$":10},"max_output_tokens":{"a":true,"fo":"int64","h":"Max Output Tokens","n":"max_output_tokens","r":false,"sh":"The maximum number of output tokens the model can generate in a single response.","t":"`$STRING`","key$":"max_output_tokens","index$":11},"modalities":{"a":true,"h":"Modalities","n":"modalities","r":false,"sh":"Input/output modalities","t":"`$OBJECT`","key$":"modalities","index$":12},"model_id":{"a":true,"h":"Model Id","n":"model_id","r":false,"sh":"Model identifier used for API calls (e.g., \"llama3.1-70b-instruct\")","t":"`$STRING`","key$":"model_id","index$":13},"name":{"a":true,"h":"Name","n":"name","r":false,"t":"`$STRING`","key$":"name","index$":14},"parameter_count":{"a":true,"fo":"float","h":"Parameter Count","n":"parameter_count","r":false,"t":"`$NUMBER`","key$":"parameter_count","index$":15},"pricing":{"a":true,"h":"Pricing","n":"pricing","r":false,"sh":"Pricing per million tokens (aligns with existing ModelPrice pattern)","t":"`$OBJECT`","key$":"pricing","index$":16},"pricing_detail":{"a":true,"h":"Pricing Detail","n":"pricing_detail","r":false,"sh":"The complete set of prices for a model, covering every available variant.","t":"`$OBJECT`","key$":"pricing_detail","index$":17},"provider":{"a":true,"h":"Provider","n":"provider","r":false,"t":"`$STRING`","key$":"provider","index$":18},"scaled_pricing_enabled":{"a":true,"h":"Scaled Pricing Enabled","n":"scaled_pricing_enabled","r":false,"sh":"True when this model's pricing varies over time.","t":"`$BOOLEAN`","key$":"scaled_pricing_enabled","index$":19},"short_description":{"a":true,"h":"Short Description","n":"short_description","r":false,"t":"`$STRING`","key$":"short_description","index$":20},"type":{"a":true,"h":"Type","n":"type","r":false,"t":"`$STRING`","key$":"type","index$":21}},"id":{"field":"id","name":"id"},"name":"api_model_catalog_card","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /v2/gen-ai/models/catalog","source":"openapi3","version":2},"g":{"query":[{"a":true,"ex":["serverless"],"k":"query","n":"availability","or":"availability","r":false,"t":"`$ARRAY`","index$":0},{"a":true,"ex":["featured"],"k":"query","n":"badge","or":"badges","r":false,"t":"`$ARRAY`","index$":1},{"a":true,"ex":1,"k":"query","n":"limit","or":"limit","r":false,"t":"`$INTEGER`","index$":2},{"a":true,"ex":["chat"],"k":"query","n":"model_type","or":"model_type","r":false,"t":"`$ARRAY`","index$":3},{"a":true,"ex":1,"k":"query","n":"page","or":"page","r":false,"t":"`$INTEGER`","index$":4},{"a":true,"ex":1,"k":"query","n":"per_page","or":"per_page","r":false,"t":"`$INTEGER`","index$":5},{"a":true,"ex":["Meta"],"k":"query","n":"provider","or":"provider","r":false,"t":"`$ARRAY`","index$":6},{"a":true,"ex":"llama","k":"query","n":"search","or":"search","r":false,"t":"`$STRING`","index$":7},{"a":true,"ex":"MODEL_CATALOG_SORT_BY_NAME","k":"query","n":"sort_by","or":"sort_by","r":false,"t":"`$STRING`","index$":8},{"a":true,"ex":"SORT_DIRECTION_ASC","k":"query","n":"sort_direction","or":"sort_direction","r":false,"t":"`$STRING`","index$":9},{"a":true,"ex":"MODEL_CATALOG_USE_CASE_CODING","k":"query","n":"use_case","or":"use_case","r":false,"t":"`$STRING`","index$":10}]},"k":"http","m":"GET","o":"/v2/gen-ai/models/catalog","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v2"},{"lit":"gen-ai"},{"lit":"models"},{"lit":"catalog"}],"t":{"req":"`reqdata`","res":"`body.data`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /v2/gen-ai/models/catalog/{id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":"\"example string\"","k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":0}],"query":[{"a":true,"ex":"\"example string\"","k":"query","n":"model_id","or":"model_id","r":false,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/v2/gen-ai/models/catalog/{id}","q":{"exist":["id"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v2"},{"lit":"gen-ai"},{"lit":"models"},{"lit":"catalog"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body.data`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"api_model_catalog_card","name__orig":"api_model_catalog_card","Name":"ApiModelCatalogCard","name_":"api_model_catalog_card","name-":"api-model-catalog-card","NAME":"API_MODEL_CATALOG_CARD","index$":73}, {"active":true,"entity":"api_model_catalog_card","key$":"BasicApiModelCatalogCardFlow","kind":"basic","name":"BasicApiModelCatalogCardFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"api_model_catalog_card_ref01"}}],"index$":0},{"a":true,"d":{},"i":{"ref":"api_model_catalog_card_ref01","srcdatavar":"api_model_catalog_card_ref01_data","suffix":"_dt0"},"m":{"id":"api_model_catalog_card01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-api_model_catalog_card_ref01"}}],"index$":1}]}, 'ApiModelCatalogCard', {"GET /v2/gen-ai/models/catalog":{"protocol":"http","parameters":[{"description":"Page number for pagination.","example":1,"in":"query","name":"page","schema":{"type":"integer"},"index$":0},{"description":"Deprecated. Use `per_page` instead.","example":1,"in":"query","name":"limit","schema":{"type":"integer"},"index$":1},{"description":"Partial, case-insensitive match on the model's display name.","example":"llama","in":"query","name":"search","schema":{"type":"string"},"index$":2},{"description":"Filter by model type. Multiple values use OR semantics.\nAccepted values: `chat`, `embedding`, `image`, `reasoning`, `coding`, `audio`, `reranking`.","example":["chat"],"in":"query","name":"model_type","schema":{"items":{"type":"string"},"type":"array"},"index$":3},{"description":"Filter by model creator/developer. Multiple values use OR semantics.\nValues are data-driven; use `available_providers` from the response to discover valid options.","example":["Meta"],"in":"query","name":"provider","schema":{"items":{"type":"string"},"type":"array"},"index$":4},{"description":"Filter by deployment availability. Multiple values use OR semantics.\nAccepted values: `serverless`, `dedicated`.","example":["serverless"],"in":"query","name":"availability","schema":{"items":{"type":"string"},"type":"array"},"index$":5},{"description":"Filter by badge. Multiple values use OR semantics.\nAccepted values: `featured`, `new`, `preview`.","example":["featured"],"in":"query","name":"badges","schema":{"items":{"type":"string"},"type":"array"},"index$":6},{"description":"Field to sort results by. Default is `MODEL_CATALOG_SORT_BY_CREATED_AT`.\n\n - MODEL_CATALOG_SORT_BY_CREATED_AT: Default: sort by creation date.\n - MODEL_CATALOG_SORT_BY_NAME: Sort by the model's display name (case-insensitive).\n - MODEL_CATALOG_SORT_BY_PRICE: Sort by input token price.","example":"MODEL_CATALOG_SORT_BY_NAME","in":"query","name":"sort_by","schema":{"default":"MODEL_CATALOG_SORT_BY_CREATED_AT","enum":["MODEL_CATALOG_SORT_BY_CREATED_AT","MODEL_CATALOG_SORT_BY_NAME","MODEL_CATALOG_SORT_BY_PRICE"],"type":"string"},"index$":7},{"description":"Number of items per page. Replaces the deprecated `limit` field.","example":1,"in":"query","name":"per_page","schema":{"type":"integer"},"index$":8},{"description":"Sort direction. Defaults to descending when unspecified.","example":"SORT_DIRECTION_ASC","in":"query","name":"sort_direction","schema":{"default":"SORT_DIRECTION_UNSPECIFIED","enum":["SORT_DIRECTION_UNSPECIFIED","SORT_DIRECTION_ASC","SORT_DIRECTION_DESC"],"type":"string"},"index$":9},{"description":"Filter by pre-defined use case. When unspecified, no use-case filter is applied.\nAccepted values: `MODEL_CATALOG_USE_CASE_CODING`, `MODEL_CATALOG_USE_CASE_AGENTS`,\n`MODEL_CATALOG_USE_CASE_AUDIO`, `MODEL_CATALOG_USE_CASE_IMAGE`,\n`MODEL_CATALOG_USE_CASE_EMBEDDING`, `MODEL_CATALOG_USE_CASE_VIDEO`.\n\n - MODEL_CATALOG_USE_CASE_UNSPECIFIED: No use-case filter applied; return all models.\n - MODEL_CATALOG_USE_CASE_CODING: Coding-optimized models: model_type = coding, or usecases include coding,\nagentic_coding, or code_generation.\n - MODEL_CATALOG_USE_CASE_AGENTS: Agent-building models: usecases include tool_calling, agentic,\nagent_platform, agentic_workflows, or agentic_coding.\n - MODEL_CATALOG_USE_CASE_AUDIO: Audio models: model_type is audio, or usecases include audio,\ntext_to_speech, or voice_cloning, or output modalities include audio.\n - MODEL_CATALOG_USE_CASE_IMAGE: Image models: model_type is image, or usecases include image_generation,\ntext_to_image, or ideogram, or output modalities include image.\n - MODEL_CATALOG_USE_CASE_VIDEO: Video models: usecases include video_generation or text_to_video, or\noutput modalities include video.\n - MODEL_CATALOG_USE_CASE_EMBEDDING: Embedding and reranking models: model_type is embedding or reranking, or\nusecases include vectorization or reranking.","example":"MODEL_CATALOG_USE_CASE_CODING","in":"query","name":"use_case","schema":{"default":"MODEL_CATALOG_USE_CASE_UNSPECIFIED","enum":["MODEL_CATALOG_USE_CASE_UNSPECIFIED","MODEL_CATALOG_USE_CASE_CODING","MODEL_CATALOG_USE_CASE_AGENTS","MODEL_CATALOG_USE_CASE_AUDIO","MODEL_CATALOG_USE_CASE_IMAGE","MODEL_CATALOG_USE_CASE_VIDEO","MODEL_CATALOG_USE_CASE_EMBEDDING"],"type":"string"},"index$":10}]},"GET /v2/gen-ai/models/catalog/{id}":{"protocol":"http","parameters":[{"example":"\"example string\"","in":"path","name":"id","required":true,"schema":{"type":"string"},"index$":0},{"description":"Model identifier used for API calls (e.g., \"llama3.1-70b-instruct\"). Alternative to UUID lookup.","example":"\"example string\"","in":"query","name":"model_id","schema":{"type":"string"},"index$":1}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let api_model_catalog_card_ref01_data = Object.values(setup.data.existing.api_model_catalog_card)[0] as any

    // LIST
    const api_model_catalog_card_ref01_ent = client.ApiModelCatalogCard()
    const api_model_catalog_card_ref01_match: any = {}

    const api_model_catalog_card_ref01_list = (await api_model_catalog_card_ref01_ent.list(api_model_catalog_card_ref01_match)).map((e: any) => e.data())


    // LOAD
    const api_model_catalog_card_ref01_match_dt0: any = {}
    api_model_catalog_card_ref01_match_dt0.id = api_model_catalog_card_ref01_data.id
    const api_model_catalog_card_ref01_data_dt0 = (await api_model_catalog_card_ref01_ent.load(api_model_catalog_card_ref01_match_dt0)).data()
    assert(api_model_catalog_card_ref01_data_dt0.id === api_model_catalog_card_ref01_data.id)


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
      '../../../../.sdk/test/entity/api_model_catalog_card/ApiModelCatalogCardTestData.json')

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
    ['api_model_catalog_card01','api_model_catalog_card02','api_model_catalog_card03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'DIGITALOCEAN_TEST_API_MODEL_CATALOG_CARD_ENTID': idmap,
    'DIGITALOCEAN_TEST_LIVE': 'FALSE',
    'DIGITALOCEAN_TEST_EXPLAIN': 'FALSE',
    'DIGITALOCEAN_APIKEY': '',
  })

  idmap = env['DIGITALOCEAN_TEST_API_MODEL_CATALOG_CARD_ENTID']

  const live = 'TRUE' === env.DIGITALOCEAN_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['DIGITALOCEAN_TEST_API_MODEL_CATALOG_CARD_ENTID']
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
  
