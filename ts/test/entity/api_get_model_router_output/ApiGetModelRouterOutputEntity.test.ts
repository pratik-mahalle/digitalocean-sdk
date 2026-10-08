

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


describe('ApiGetModelRouterOutputEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when DIGITALOCEAN_TEST_LIVE=TRUE.
  afterEach(liveDelay('DIGITALOCEAN_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = DigitaloceanSDK.test()
    const ent = testsdk.ApiGetModelRouterOutput()
    assert(null != ent)
  })


  class FailHook extends BaseFeature {
    name = 'failhook'
    version = '0.0.1'
    active = true
    unexpected = 0
    init() { }
    PreSpec() { throw new Error('api_get_model_router_output hook failed') }
    PreUnexpected() { this.unexpected++ }
  }

  test('stream-error', async () => {
    const offline = { net: { offline: true } }
    await assert.rejects(async () => {
      for await (const _item of DigitaloceanSDK.test(offline).ApiGetModelRouterOutput().stream('list')) { }
    }, /offline/)

    for await (const _item of DigitaloceanSDK.test(offline).ApiGetModelRouterOutput()
      .stream('list', undefined, { ctrl: { throw: false } })) { }

    if (null != (config as any).feature?.rbac) {
      const denied = DigitaloceanSDK.test(undefined, { feature: { rbac: { active: true, deny: true } } })
      await assert.rejects(async () => {
        for await (const _item of denied.ApiGetModelRouterOutput().stream('list')) { }
      }, (err: any) => 'rbac_denied' === err.code)
    }
  })

  test('stream-ctrl', async () => {
    const explain: any = {}
    const ctrl: any = { explain }
    for await (const _item of DigitaloceanSDK.test().ApiGetModelRouterOutput().stream('list', undefined, { ctrl })) { }
    assert.deepStrictEqual(Object.keys(ctrl), ['explain'])
    assert(explain === ctrl.explain && 0 < Object.keys(explain).length)
  })

  test('unexpected', async () => {
    const hook = new FailHook()
    const client = new DigitaloceanSDK({ feature: { test: { active: true } }, extend: [hook] })
    await assert.rejects(client.ApiGetModelRouterOutput().list(), /hook failed/)
    assert(0 < hook.unexpected)

    const fired = hook.unexpected
    assert.strictEqual(await client.ApiGetModelRouterOutput().list(undefined, { throw: false }), undefined)
    assert(fired < hook.unexpected)
  })

  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = DigitaloceanSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.ApiGetModelRouterOutput().list({"page":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.DIGITALOCEAN_TEST_LIVE
    for (const op of ['create', 'list', 'load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'api_get_model_router_output.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"config":{"a":true,"h":"Config","n":"config","r":false,"t":"`$OBJECT`","key$":"config","index$":0},"created_at":{"a":true,"fo":"date-time","h":"Created At","n":"created_at","r":false,"sh":"Creation date / time","t":"`$STRING`","key$":"created_at","index$":1},"description":{"a":true,"h":"Description","n":"description","r":false,"sh":"Description","t":"`$STRING`","key$":"description","index$":2},"fallback_models":{"a":true,"h":"Fallback Models","n":"fallback_models","r":false,"sh":"At least one fallback model is required; order defines failover priority","t":"`$ARRAY`","key$":"fallback_models","index$":3},"name":{"a":true,"h":"Name","n":"name","r":false,"sh":"Name of the model router","t":"`$STRING`","key$":"name","index$":4},"policies":{"a":true,"h":"Policies","n":"policies","r":false,"sh":"Router policies","t":"`$ARRAY`","key$":"policies","index$":5},"regions":{"a":true,"h":"Regions","n":"regions","r":false,"sh":"Target regions for the router","t":"`$ARRAY`","key$":"regions","index$":6},"updated_at":{"a":true,"fo":"date-time","h":"Updated At","n":"updated_at","r":false,"sh":"Last modified","t":"`$STRING`","key$":"updated_at","index$":7},"uuid":{"a":true,"h":"Uuid","n":"uuid","r":false,"sh":"Unique id","t":"`$STRING`","key$":"uuid","index$":8}},"name":"api_get_model_router_output","op":{"create":{"input":"data","name":"create","points":[{"a":true,"co":{"id":"POST /v2/gen-ai/models/routers","source":"openapi3","version":2},"g":{},"k":"http","m":"POST","o":"/v2/gen-ai/models/routers","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v2"},{"lit":"gen-ai"},{"lit":"models"},{"lit":"routers"}],"t":{"req":"`reqdata`","res":"`body.model_router`"},"index$":0}],"key$":"create"},"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /v2/gen-ai/models/routers","source":"openapi3","version":2},"g":{"query":[{"a":true,"ex":1,"k":"query","n":"page","or":"page","r":false,"t":"`$INTEGER`","index$":0},{"a":true,"ex":1,"k":"query","n":"per_page","or":"per_page","r":false,"t":"`$INTEGER`","index$":1}]},"k":"http","m":"GET","o":"/v2/gen-ai/models/routers","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v2"},{"lit":"gen-ai"},{"lit":"models"},{"lit":"routers"}],"t":{"req":"`reqdata`","res":"`body.model_routers`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /v2/gen-ai/models/routers/{uuid}","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":"\"123e4567-e89b-12d3-a456-426614174000\"","k":"param","n":"uuid","or":"uuid","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/v2/gen-ai/models/routers/{uuid}","q":{"exist":["uuid"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v2"},{"lit":"gen-ai"},{"lit":"models"},{"lit":"routers"},{"var":"uuid"}],"t":{"req":"`reqdata`","res":"`body.model_router`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"api_get_model_router_output","name__orig":"api_get_model_router_output","Name":"ApiGetModelRouterOutput","name_":"api_get_model_router_output","name-":"api-get-model-router-output","NAME":"API_GET_MODEL_ROUTER_OUTPUT","index$":46}, {"active":true,"entity":"api_get_model_router_output","key$":"BasicApiGetModelRouterOutputFlow","kind":"basic","name":"BasicApiGetModelRouterOutputFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"api_get_model_router_output_ref01"},"m":{},"o":"create","s":[],"v":[],"index$":0},{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"api_get_model_router_output_ref01"}}],"index$":1},{"a":true,"d":{},"i":{"ref":"api_get_model_router_output_ref01","srcdatavar":"api_get_model_router_output_ref01_data","suffix":"_dt0"},"m":{"id":"api_get_model_router_output01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-api_get_model_router_output_ref01"}}],"index$":2}]}, 'ApiGetModelRouterOutput', {"POST /v2/gen-ai/models/routers":{"protocol":"http","requestBody":{"content":{"application/json":{"schema":{"description":"Create a model router","properties":{"description":{"description":"Model router description","example":"\"My Model Router Description\"","type":"string","key$":"description"},"fallback_models":{"description":"At least one fallback model is required; order defines failover priority","example":["example string"],"items":{"example":"example string","type":"string"},"type":"array","key$":"fallback_models"},"name":{"description":"Model router name: lowercase, at most 255 characters, only a-z, 0-9, and hyphens","example":"\"my-model-router\"","type":"string","key$":"name"},"policies":{"description":"Router policies","items":{"description":"Model router policy","properties":{"custom_task":{"description":"Task definition embedded in a model router config.","properties":{},"type":"object","x-ref":"#/components/schemas/apiModelRouterTaskDetails"},"models":{"description":"Models assigned to the task","example":[],"items":{},"type":"array"},"selection_policy":{"description":"Selection policy preference for choosing among assigned models.","properties":{},"type":"object","x-ref":"#/components/schemas/apiModelRouterSelectionPolicy"},"task_slug":{"description":"Task slug","example":"\"summarization\"","type":"string"}},"type":"object","x-ref":"#/components/schemas/apiModelRouterTaskPolicy"},"type":"array","key$":"policies"},"regions":{"description":"DEPRECATED: this field does not affect deployment and model routers are always\ndeployed to all regions. Must be omitted or set to [\"all\"].","example":["example string"],"items":{"example":"example string","type":"string"},"type":"array","key$":"regions"}},"type":"object","x-ref":"#/components/schemas/apiCreateModelRouterInputPublic","index$":1}}}},"parameters":[]},"GET /v2/gen-ai/models/routers":{"protocol":"http","parameters":[{"description":"Page number.","example":1,"in":"query","name":"page","schema":{"type":"integer"},"index$":0},{"description":"Items per page.","example":1,"in":"query","name":"per_page","schema":{"type":"integer"},"index$":1}]},"GET /v2/gen-ai/models/routers/{uuid}":{"protocol":"http","parameters":[{"description":"Model router id","example":"\"123e4567-e89b-12d3-a456-426614174000\"","in":"path","name":"uuid","required":true,"schema":{"type":"string"},"index$":0}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const api_get_model_router_output_ref01_ent = client.ApiGetModelRouterOutput()
    let api_get_model_router_output_ref01_data = setup.data.new.api_get_model_router_output['api_get_model_router_output_ref01']

    api_get_model_router_output_ref01_data = (await api_get_model_router_output_ref01_ent.create(api_get_model_router_output_ref01_data)).data()
    assert(null != api_get_model_router_output_ref01_data)


    // LIST
    const api_get_model_router_output_ref01_match: any = {}

    const api_get_model_router_output_ref01_list = (await api_get_model_router_output_ref01_ent.list(api_get_model_router_output_ref01_match)).map((e: any) => e.data())



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
      '../../../../.sdk/test/entity/api_get_model_router_output/ApiGetModelRouterOutputTestData.json')

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
    ['api_get_model_router_output01','api_get_model_router_output02','api_get_model_router_output03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'DIGITALOCEAN_TEST_API_GET_MODEL_ROUTER_OUTPUT_ENTID': idmap,
    'DIGITALOCEAN_TEST_LIVE': 'FALSE',
    'DIGITALOCEAN_TEST_EXPLAIN': 'FALSE',
    'DIGITALOCEAN_APIKEY': '',
  })

  idmap = env['DIGITALOCEAN_TEST_API_GET_MODEL_ROUTER_OUTPUT_ENTID']

  const live = 'TRUE' === env.DIGITALOCEAN_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['DIGITALOCEAN_TEST_API_GET_MODEL_ROUTER_OUTPUT_ENTID']
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
  
