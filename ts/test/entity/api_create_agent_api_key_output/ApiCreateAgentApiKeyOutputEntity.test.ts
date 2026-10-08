

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


describe('ApiCreateAgentApiKeyOutputEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when DIGITALOCEAN_TEST_LIVE=TRUE.
  afterEach(liveDelay('DIGITALOCEAN_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = DigitaloceanSDK.test()
    const ent = testsdk.ApiCreateAgentApiKeyOutput()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = DigitaloceanSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.ApiCreateAgentApiKeyOutput().create({"agent_id":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.DIGITALOCEAN_TEST_LIVE
    for (const op of ['create']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'api_create_agent_api_key_output.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"agent_uuid":{"a":true,"h":"Agent Uuid","n":"agent_uuid","r":false,"sh":"Agent id","t":"`$STRING`","key$":"agent_uuid","index$":0},"created_at":{"a":true,"fo":"date-time","h":"Created At","n":"created_at","r":false,"sh":"Creation date","t":"`$STRING`","key$":"created_at","index$":1},"created_by":{"a":true,"fo":"uint64","h":"Created By","n":"created_by","r":false,"sh":"Created by","t":"`$STRING`","key$":"created_by","index$":2},"deleted_at":{"a":true,"fo":"date-time","h":"Deleted At","n":"deleted_at","r":false,"sh":"Deleted date","t":"`$STRING`","key$":"deleted_at","index$":3},"name":{"a":true,"h":"Name","n":"name","r":false,"sh":"Name","t":"`$STRING`","key$":"name","index$":4},"secret_key":{"a":true,"h":"Secret Key","n":"secret_key","r":false,"t":"`$STRING`","key$":"secret_key","index$":5},"uuid":{"a":true,"h":"Uuid","n":"uuid","r":false,"sh":"Uuid","t":"`$STRING`","key$":"uuid","index$":6}},"name":"api_create_agent_api_key_output","op":{"create":{"input":"data","name":"create","points":[{"a":true,"co":{"id":"POST /v2/gen-ai/agents/{agent_uuid}/api_keys","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":"\"123e4567-e89b-12d3-a456-426614174000\"","k":"param","n":"agent_id","or":"agent_uuid","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"POST","o":"/v2/gen-ai/agents/{agent_uuid}/api_keys","q":{"exist":["agent_id"]},"r":{"param":{"agent_uuid":"agent_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v2"},{"lit":"gen-ai"},{"lit":"agents"},{"var":"agent_id"},{"lit":"api_keys"}],"t":{"req":"`reqdata`","res":"`body.api_key_info`"},"index$":0}],"key$":"create"}},"relations":{"ancestors":[]},"key$":"api_create_agent_api_key_output","name__orig":"api_create_agent_api_key_output","Name":"ApiCreateAgentApiKeyOutput","name_":"api_create_agent_api_key_output","name-":"api-create-agent-api-key-output","NAME":"API_CREATE_AGENT_API_KEY_OUTPUT","index$":6}, {"active":true,"entity":"api_create_agent_api_key_output","key$":"BasicApiCreateAgentApiKeyOutputFlow","kind":"basic","name":"BasicApiCreateAgentApiKeyOutputFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"api_create_agent_api_key_output_ref01"},"m":{"agent_id":"agent01"},"o":"create","s":[],"v":[],"index$":0}]}, 'ApiCreateAgentApiKeyOutput', {"POST /v2/gen-ai/agents/{agent_uuid}/api_keys":{"protocol":"http","requestBody":{"content":{"application/json":{"schema":{"properties":{"agent_uuid":{"description":"Agent id","example":"\"12345678-1234-1234-1234-123456789012\"","type":"string","key$":"agent_uuid"},"name":{"description":"A human friendly name to identify the key","example":"Production Key","type":"string","key$":"name"}},"type":"object","x-ref":"#/components/schemas/apiCreateAgentAPIKeyInputPublic","index$":1}}}},"parameters":[{"description":"Agent id","example":"\"123e4567-e89b-12d3-a456-426614174000\"","in":"path","name":"agent_uuid","required":true,"schema":{"type":"string"},"index$":0}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const api_create_agent_api_key_output_ref01_ent = client.ApiCreateAgentApiKeyOutput()
    let api_create_agent_api_key_output_ref01_data = setup.data.new.api_create_agent_api_key_output['api_create_agent_api_key_output_ref01']
    api_create_agent_api_key_output_ref01_data['agent_id'] = setup.idmap['agent01']

    api_create_agent_api_key_output_ref01_data = (await api_create_agent_api_key_output_ref01_ent.create(api_create_agent_api_key_output_ref01_data)).data()
    assert(null != api_create_agent_api_key_output_ref01_data)


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
      '../../../../.sdk/test/entity/api_create_agent_api_key_output/ApiCreateAgentApiKeyOutputTestData.json')

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
    ['api_create_agent_api_key_output01','api_create_agent_api_key_output02','api_create_agent_api_key_output03','agent01'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'DIGITALOCEAN_TEST_API_CREATE_AGENT_API_KEY_OUTPUT_ENTID': idmap,
    'DIGITALOCEAN_TEST_LIVE': 'FALSE',
    'DIGITALOCEAN_TEST_EXPLAIN': 'FALSE',
    'DIGITALOCEAN_APIKEY': '',
  })

  idmap = env['DIGITALOCEAN_TEST_API_CREATE_AGENT_API_KEY_OUTPUT_ENTID']

  const live = 'TRUE' === env.DIGITALOCEAN_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['DIGITALOCEAN_TEST_API_CREATE_AGENT_API_KEY_OUTPUT_ENTID']
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
  
