

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


describe('ApiGetOpenAiapiKeyOutputEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when DIGITALOCEAN_TEST_LIVE=TRUE.
  afterEach(liveDelay('DIGITALOCEAN_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = DigitaloceanSDK.test()
    const ent = testsdk.ApiGetOpenAiapiKeyOutput()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = DigitaloceanSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.ApiGetOpenAiapiKeyOutput().load({"api_key_uuid":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.DIGITALOCEAN_TEST_LIVE
    for (const op of []) {
      if (!live && maybeSkipControl(t, 'entityOp', 'api_get_open_aiapi_key_output.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"created_at":{"a":true,"fo":"date-time","h":"Created At","n":"created_at","r":false,"sh":"Key creation date","t":"`$STRING`","key$":"created_at","index$":0},"created_by":{"a":true,"fo":"uint64","h":"Created By","n":"created_by","r":false,"sh":"Created by user id from DO","t":"`$STRING`","key$":"created_by","index$":1},"deleted_at":{"a":true,"fo":"date-time","h":"Deleted At","n":"deleted_at","r":false,"sh":"Key deleted date","t":"`$STRING`","key$":"deleted_at","index$":2},"models":{"a":true,"h":"Models","n":"models","r":false,"sh":"Models supported by the openAI api key","t":"`$ARRAY`","key$":"models","index$":3},"name":{"a":true,"h":"Name","n":"name","r":false,"sh":"Name","t":"`$STRING`","key$":"name","index$":4},"updated_at":{"a":true,"fo":"date-time","h":"Updated At","n":"updated_at","r":false,"sh":"Key last updated date","t":"`$STRING`","key$":"updated_at","index$":5},"uuid":{"a":true,"h":"Uuid","n":"uuid","r":false,"sh":"Uuid","t":"`$STRING`","key$":"uuid","index$":6}},"name":"api_get_open_aiapi_key_output","op":{"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /v2/gen-ai/openai/keys/{api_key_uuid}","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":"\"123e4567-e89b-12d3-a456-426614174000\"","k":"param","n":"api_key_uuid","or":"api_key_uuid","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/v2/gen-ai/openai/keys/{api_key_uuid}","q":{"exist":["api_key_uuid"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v2"},{"lit":"gen-ai"},{"lit":"openai"},{"lit":"keys"},{"var":"api_key_uuid"}],"t":{"req":"`reqdata`","res":"`body.api_key_info`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"api_get_open_aiapi_key_output","name__orig":"api_get_open_aiapi_key_output","Name":"ApiGetOpenAiapiKeyOutput","name_":"api_get_open_aiapi_key_output","name-":"api-get-open-aiapi-key-output","NAME":"API_GET_OPEN_AIAPI_KEY_OUTPUT","index$":45}, {"active":true,"entity":"api_get_open_aiapi_key_output","key$":"BasicApiGetOpenAiapiKeyOutputFlow","kind":"basic","name":"BasicApiGetOpenAiapiKeyOutputFlow","param":{},"step":[{"a":false,"d":{},"i":{"ref":"api_get_open_aiapi_key_output_ref01","srcdatavar":"api_get_open_aiapi_key_output_ref01_data","suffix":"_dt0"},"m":{"id":"api_get_open_aiapi_key_output01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-api_get_open_aiapi_key_output_ref01"}}],"unreachable":true}]}, 'ApiGetOpenAiapiKeyOutput', {"GET /v2/gen-ai/openai/keys/{api_key_uuid}":{"protocol":"http","parameters":[{"description":"API key ID","example":"\"123e4567-e89b-12d3-a456-426614174000\"","in":"path","name":"api_key_uuid","required":true,"schema":{"type":"string"},"index$":0}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let api_get_open_aiapi_key_output_ref01_data = Object.values(setup.data.existing.api_get_open_aiapi_key_output)[0] as any

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
      '../../../../.sdk/test/entity/api_get_open_aiapi_key_output/ApiGetOpenAiapiKeyOutputTestData.json')

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
    ['api_get_open_aiapi_key_output01','api_get_open_aiapi_key_output02','api_get_open_aiapi_key_output03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'DIGITALOCEAN_TEST_API_GET_OPEN_AIAPI_KEY_OUTPUT_ENTID': idmap,
    'DIGITALOCEAN_TEST_LIVE': 'FALSE',
    'DIGITALOCEAN_TEST_EXPLAIN': 'FALSE',
    'DIGITALOCEAN_APIKEY': '',
  })

  idmap = env['DIGITALOCEAN_TEST_API_GET_OPEN_AIAPI_KEY_OUTPUT_ENTID']

  const live = 'TRUE' === env.DIGITALOCEAN_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['DIGITALOCEAN_TEST_API_GET_OPEN_AIAPI_KEY_OUTPUT_ENTID']
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
  
