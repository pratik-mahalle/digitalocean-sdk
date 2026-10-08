

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


describe('ApiDeleteModelApiKeyOutputEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when DIGITALOCEAN_TEST_LIVE=TRUE.
  afterEach(liveDelay('DIGITALOCEAN_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = DigitaloceanSDK.test()
    const ent = testsdk.ApiDeleteModelApiKeyOutput()
    assert(null != ent)
  })


  class FailHook extends BaseFeature {
    name = 'failhook'
    version = '0.0.1'
    active = true
    unexpected = 0
    init() { }
    PreSpec() { throw new Error('api_delete_model_api_key_output hook failed') }
    PreUnexpected() { this.unexpected++ }
  }

  test('stream-error', async () => {
    const offline = { net: { offline: true } }
    await assert.rejects(async () => {
      for await (const _item of DigitaloceanSDK.test(offline).ApiDeleteModelApiKeyOutput().stream('list')) { }
    }, /offline/)

    for await (const _item of DigitaloceanSDK.test(offline).ApiDeleteModelApiKeyOutput()
      .stream('list', undefined, { ctrl: { throw: false } })) { }

    if (null != (config as any).feature?.rbac) {
      const denied = DigitaloceanSDK.test(undefined, { feature: { rbac: { active: true, deny: true } } })
      await assert.rejects(async () => {
        for await (const _item of denied.ApiDeleteModelApiKeyOutput().stream('list')) { }
      }, (err: any) => 'rbac_denied' === err.code)
    }
  })

  test('stream-ctrl', async () => {
    const explain: any = {}
    const ctrl: any = { explain }
    for await (const _item of DigitaloceanSDK.test().ApiDeleteModelApiKeyOutput().stream('list', undefined, { ctrl })) { }
    assert.deepStrictEqual(Object.keys(ctrl), ['explain'])
    assert(explain === ctrl.explain && 0 < Object.keys(explain).length)
  })

  test('unexpected', async () => {
    const hook = new FailHook()
    const client = new DigitaloceanSDK({ feature: { test: { active: true } }, extend: [hook] })
    await assert.rejects(client.ApiDeleteModelApiKeyOutput().list(), /hook failed/)
    assert(0 < hook.unexpected)

    const fired = hook.unexpected
    assert.strictEqual(await client.ApiDeleteModelApiKeyOutput().list(undefined, { throw: false }), undefined)
    assert(fired < hook.unexpected)
  })

  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = DigitaloceanSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.ApiDeleteModelApiKeyOutput().list({"page":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.DIGITALOCEAN_TEST_LIVE
    for (const op of ['create', 'list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'api_delete_model_api_key_output.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"created_at":{"a":true,"fo":"date-time","h":"Created At","n":"created_at","r":false,"sh":"Creation date","t":"`$STRING`","key$":"created_at","index$":0},"created_by":{"a":true,"fo":"uint64","h":"Created By","n":"created_by","r":false,"sh":"Created by","t":"`$STRING`","key$":"created_by","index$":1},"deleted_at":{"a":true,"fo":"date-time","h":"Deleted At","n":"deleted_at","r":false,"sh":"Deleted date","t":"`$STRING`","key$":"deleted_at","index$":2},"name":{"a":true,"h":"Name","n":"name","r":false,"sh":"A human friendly name to identify the key","t":"`$STRING`","key$":"name","index$":3},"secret_key":{"a":true,"h":"Secret Key","n":"secret_key","r":false,"t":"`$STRING`","key$":"secret_key","index$":4},"uuid":{"a":true,"h":"Uuid","n":"uuid","r":false,"sh":"Uuid","t":"`$STRING`","key$":"uuid","index$":5}},"name":"api_delete_model_api_key_output","op":{"create":{"input":"data","name":"create","points":[{"a":true,"co":{"id":"POST /v2/gen-ai/models/api_keys","source":"openapi3","version":2},"g":{},"k":"http","m":"POST","o":"/v2/gen-ai/models/api_keys","q":{},"r":{},"s":[{"lit":"v2"},{"lit":"gen-ai"},{"lit":"models"},{"lit":"api_keys"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"},"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /v2/gen-ai/models/api_keys","source":"openapi3","version":2},"g":{"query":[{"a":true,"ex":1,"k":"query","n":"page","or":"page","r":false,"t":"`$INTEGER`","index$":0},{"a":true,"ex":1,"k":"query","n":"per_page","or":"per_page","r":false,"t":"`$INTEGER`","index$":1}]},"k":"http","m":"GET","o":"/v2/gen-ai/models/api_keys","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v2"},{"lit":"gen-ai"},{"lit":"models"},{"lit":"api_keys"}],"t":{"req":"`reqdata`","res":"`body.api_key_infos`"},"index$":0}],"key$":"list"},"remove":{"input":"data","name":"remove","points":[{"a":true,"co":{"id":"DELETE /v2/gen-ai/models/api_keys/{api_key_uuid}","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":"\"123e4567-e89b-12d3-a456-426614174000\"","k":"param","n":"api_key_uuid","or":"api_key_uuid","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"DELETE","o":"/v2/gen-ai/models/api_keys/{api_key_uuid}","q":{"exist":["api_key_uuid"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v2"},{"lit":"gen-ai"},{"lit":"models"},{"lit":"api_keys"},{"var":"api_key_uuid"}],"t":{"req":"`reqdata`","res":"`body.api_key_info`"},"index$":0}],"key$":"remove"},"update":{"input":"data","name":"update","points":[{"a":true,"co":{"id":"PUT /v2/gen-ai/models/api_keys/{api_key_uuid}/regenerate","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":"\"123e4567-e89b-12d3-a456-426614174000\"","k":"param","n":"api_key_uuid","or":"api_key_uuid","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"PUT","o":"/v2/gen-ai/models/api_keys/{api_key_uuid}/regenerate","q":{"$action":"regenerate","exist":["api_key_uuid"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v2"},{"lit":"gen-ai"},{"lit":"models"},{"lit":"api_keys"},{"var":"api_key_uuid"},{"lit":"regenerate"}],"t":{"req":"`reqdata`","res":"`body.api_key_info`"},"index$":0}],"key$":"update"}},"relations":{"ancestors":[]},"key$":"api_delete_model_api_key_output","name__orig":"api_delete_model_api_key_output","Name":"ApiDeleteModelApiKeyOutput","name_":"api_delete_model_api_key_output","name-":"api-delete-model-api-key-output","NAME":"API_DELETE_MODEL_API_KEY_OUTPUT","index$":20}, {"active":true,"entity":"api_delete_model_api_key_output","key$":"BasicApiDeleteModelApiKeyOutputFlow","kind":"basic","name":"BasicApiDeleteModelApiKeyOutputFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"api_delete_model_api_key_output_ref01"},"m":{},"o":"create","s":[],"v":[],"index$":0},{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"api_delete_model_api_key_output_ref01"}}],"index$":1},{"a":false,"d":{},"i":{"ref":"api_delete_model_api_key_output_ref01","srcdatavar":"api_delete_model_api_key_output_ref01_data","suffix":"_up0","textfield":"created_at"},"m":{},"o":"update","s":[{"apply":"TextFieldMark","def":{"mark":"Mark01-api_delete_model_api_key_output_ref01"}}],"v":[],"unreachable":true},{"a":false,"d":{},"i":{"ref":"api_delete_model_api_key_output_ref01","suffix":"_rm0"},"m":{"id":"api_delete_model_api_key_output01"},"o":"remove","s":[],"v":[],"unreachable":true},{"a":true,"d":{},"i":{"suffix":"_rt0"},"m":{},"o":"list","s":[],"v":[{"apply":"ItemNotExists","def":{"ref":"api_delete_model_api_key_output_ref01"}}],"index$":2}]}, 'ApiDeleteModelApiKeyOutput', {"POST /v2/gen-ai/models/api_keys":{"protocol":"http","requestBody":{"content":{"application/json":{"schema":{"properties":{"name":{"description":"A human friendly name to identify the key","example":"Production Key","type":"string","key$":"name"}},"type":"object","x-ref":"#/components/schemas/apiCreateModelAPIKeyInputPublic","index$":1}}}},"parameters":[]},"GET /v2/gen-ai/models/api_keys":{"protocol":"http","parameters":[{"description":"Page number.","example":1,"in":"query","name":"page","schema":{"type":"integer"},"index$":0},{"description":"Items per page.","example":1,"in":"query","name":"per_page","schema":{"type":"integer"},"index$":1}]},"DELETE /v2/gen-ai/models/api_keys/{api_key_uuid}":{"protocol":"http","parameters":[{"description":"API key for an agent.","example":"\"123e4567-e89b-12d3-a456-426614174000\"","in":"path","name":"api_key_uuid","required":true,"schema":{"type":"string"},"index$":0}]},"PUT /v2/gen-ai/models/api_keys/{api_key_uuid}/regenerate":{"protocol":"http","parameters":[{"description":"API key ID","example":"\"123e4567-e89b-12d3-a456-426614174000\"","in":"path","name":"api_key_uuid","required":true,"schema":{"type":"string"},"index$":0}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const api_delete_model_api_key_output_ref01_ent = client.ApiDeleteModelApiKeyOutput()
    let api_delete_model_api_key_output_ref01_data = setup.data.new.api_delete_model_api_key_output['api_delete_model_api_key_output_ref01']

    api_delete_model_api_key_output_ref01_data = (await api_delete_model_api_key_output_ref01_ent.create(api_delete_model_api_key_output_ref01_data)).data()
    assert(null != api_delete_model_api_key_output_ref01_data)


    // LIST
    const api_delete_model_api_key_output_ref01_match: any = {}

    const api_delete_model_api_key_output_ref01_list = (await api_delete_model_api_key_output_ref01_ent.list(api_delete_model_api_key_output_ref01_match)).map((e: any) => e.data())


    // LIST
    const api_delete_model_api_key_output_ref01_match_rt0: any = {}

    const api_delete_model_api_key_output_ref01_list_rt0 = (await api_delete_model_api_key_output_ref01_ent.list(api_delete_model_api_key_output_ref01_match_rt0)).map((e: any) => e.data())


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
      '../../../../.sdk/test/entity/api_delete_model_api_key_output/ApiDeleteModelApiKeyOutputTestData.json')

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
    ['api_delete_model_api_key_output01','api_delete_model_api_key_output02','api_delete_model_api_key_output03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'DIGITALOCEAN_TEST_API_DELETE_MODEL_API_KEY_OUTPUT_ENTID': idmap,
    'DIGITALOCEAN_TEST_LIVE': 'FALSE',
    'DIGITALOCEAN_TEST_EXPLAIN': 'FALSE',
    'DIGITALOCEAN_APIKEY': '',
  })

  idmap = env['DIGITALOCEAN_TEST_API_DELETE_MODEL_API_KEY_OUTPUT_ENTID']

  const live = 'TRUE' === env.DIGITALOCEAN_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['DIGITALOCEAN_TEST_API_DELETE_MODEL_API_KEY_OUTPUT_ENTID']
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
  
