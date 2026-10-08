

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


describe('ApiUpdateAnthropicApiKeyOutputEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when DIGITALOCEAN_TEST_LIVE=TRUE.
  afterEach(liveDelay('DIGITALOCEAN_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = DigitaloceanSDK.test()
    const ent = testsdk.ApiUpdateAnthropicApiKeyOutput()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = DigitaloceanSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.ApiUpdateAnthropicApiKeyOutput().update({"api_key_uuid":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.DIGITALOCEAN_TEST_LIVE
    for (const op of []) {
      if (!live && maybeSkipControl(t, 'entityOp', 'api_update_anthropic_api_key_output.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"api_key":{"a":true,"h":"Api Key","n":"api_key","r":false,"sh":"Anthropic API key","t":"`$STRING`","key$":"api_key","index$":0},"api_key_uuid":{"a":true,"h":"Api Key Uuid","n":"api_key_uuid","r":false,"sh":"API key ID","t":"`$STRING`","key$":"api_key_uuid","index$":1},"created_at":{"a":true,"fo":"date-time","h":"Created At","n":"created_at","r":false,"sh":"Key creation date","t":"`$STRING`","key$":"created_at","index$":2},"created_by":{"a":true,"fo":"uint64","h":"Created By","n":"created_by","r":false,"sh":"Created by user id from DO","t":"`$STRING`","key$":"created_by","index$":3},"deleted_at":{"a":true,"fo":"date-time","h":"Deleted At","n":"deleted_at","r":false,"sh":"Key deleted date","t":"`$STRING`","key$":"deleted_at","index$":4},"name":{"a":true,"h":"Name","n":"name","r":false,"sh":"Name","t":"`$STRING`","key$":"name","index$":5},"updated_at":{"a":true,"fo":"date-time","h":"Updated At","n":"updated_at","r":false,"sh":"Key last updated date","t":"`$STRING`","key$":"updated_at","index$":6},"uuid":{"a":true,"h":"Uuid","n":"uuid","r":false,"sh":"Uuid","t":"`$STRING`","key$":"uuid","index$":7}},"name":"api_update_anthropic_api_key_output","op":{"update":{"input":"data","name":"update","points":[{"a":true,"co":{"id":"PUT /v2/gen-ai/anthropic/keys/{api_key_uuid}","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":"\"123e4567-e89b-12d3-a456-426614174000\"","k":"param","n":"api_key_uuid","or":"api_key_uuid","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"PUT","o":"/v2/gen-ai/anthropic/keys/{api_key_uuid}","q":{"exist":["api_key_uuid"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v2"},{"lit":"gen-ai"},{"lit":"anthropic"},{"lit":"keys"},{"var":"api_key_uuid"}],"t":{"req":"`reqdata`","res":"`body.api_key_info`"},"index$":0}],"key$":"update"}},"relations":{"ancestors":[]},"key$":"api_update_anthropic_api_key_output","name__orig":"api_update_anthropic_api_key_output","Name":"ApiUpdateAnthropicApiKeyOutput","name_":"api_update_anthropic_api_key_output","name-":"api-update-anthropic-api-key-output","NAME":"API_UPDATE_ANTHROPIC_API_KEY_OUTPUT","index$":88}, {"active":true,"entity":"api_update_anthropic_api_key_output","key$":"BasicApiUpdateAnthropicApiKeyOutputFlow","kind":"basic","name":"BasicApiUpdateAnthropicApiKeyOutputFlow","param":{},"step":[{"a":false,"d":{},"i":{"ref":"api_update_anthropic_api_key_output_ref01","srcdatavar":"api_update_anthropic_api_key_output_ref01_data","suffix":"_up0","textfield":"api_key"},"m":{},"o":"update","s":[{"apply":"TextFieldMark","def":{"mark":"Mark01-api_update_anthropic_api_key_output_ref01"}}],"v":[],"unreachable":true}]}, 'ApiUpdateAnthropicApiKeyOutput', {"PUT /v2/gen-ai/anthropic/keys/{api_key_uuid}":{"protocol":"http","requestBody":{"content":{"application/json":{"schema":{"description":"UpdateAnthropicAPIKeyInputPublic is used to update an existing Anthropic API key for a specific agent.","properties":{"api_key":{"description":"Anthropic API key","example":"\"sk-ant-12345678901234567890123456789012\"","type":"string","key$":"api_key"},"api_key_uuid":{"description":"API key ID","example":"\"12345678-1234-1234-1234-123456789012\"","type":"string","key$":"api_key_uuid"},"name":{"description":"Name of the key","example":"\"Production Key\"","type":"string","key$":"name"}},"type":"object","x-ref":"#/components/schemas/apiUpdateAnthropicAPIKeyInputPublic","index$":1}}}},"parameters":[{"description":"API key ID","example":"\"123e4567-e89b-12d3-a456-426614174000\"","in":"path","name":"api_key_uuid","required":true,"schema":{"type":"string"},"index$":0}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let api_update_anthropic_api_key_output_ref01_data = Object.values(setup.data.existing.api_update_anthropic_api_key_output)[0] as any

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
      '../../../../.sdk/test/entity/api_update_anthropic_api_key_output/ApiUpdateAnthropicApiKeyOutputTestData.json')

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
    ['api_update_anthropic_api_key_output01','api_update_anthropic_api_key_output02','api_update_anthropic_api_key_output03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'DIGITALOCEAN_TEST_API_UPDATE_ANTHROPIC_API_KEY_OUTPUT_ENTID': idmap,
    'DIGITALOCEAN_TEST_LIVE': 'FALSE',
    'DIGITALOCEAN_TEST_EXPLAIN': 'FALSE',
    'DIGITALOCEAN_APIKEY': '',
  })

  idmap = env['DIGITALOCEAN_TEST_API_UPDATE_ANTHROPIC_API_KEY_OUTPUT_ENTID']

  const live = 'TRUE' === env.DIGITALOCEAN_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['DIGITALOCEAN_TEST_API_UPDATE_ANTHROPIC_API_KEY_OUTPUT_ENTID']
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
  
