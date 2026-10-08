

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


describe('ApiListAgentApiKeysOutputEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when DIGITALOCEAN_TEST_LIVE=TRUE.
  afterEach(liveDelay('DIGITALOCEAN_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = DigitaloceanSDK.test()
    const ent = testsdk.ApiListAgentApiKeysOutput()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = DigitaloceanSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.ApiListAgentApiKeysOutput().list({"agent_id":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.DIGITALOCEAN_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'api_list_agent_api_keys_output.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"created_at":{"a":true,"fo":"date-time","h":"Created At","n":"created_at","r":false,"sh":"Creation date","t":"`$STRING`","key$":"created_at","index$":0},"created_by":{"a":true,"fo":"uint64","h":"Created By","n":"created_by","r":false,"sh":"Created by","t":"`$STRING`","key$":"created_by","index$":1},"deleted_at":{"a":true,"fo":"date-time","h":"Deleted At","n":"deleted_at","r":false,"sh":"Deleted date","t":"`$STRING`","key$":"deleted_at","index$":2},"name":{"a":true,"h":"Name","n":"name","r":false,"sh":"Name","t":"`$STRING`","key$":"name","index$":3},"secret_key":{"a":true,"h":"Secret Key","n":"secret_key","r":false,"t":"`$STRING`","key$":"secret_key","index$":4},"uuid":{"a":true,"h":"Uuid","n":"uuid","r":false,"sh":"Uuid","t":"`$STRING`","key$":"uuid","index$":5}},"name":"api_list_agent_api_keys_output","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /v2/gen-ai/agents/{agent_uuid}/api_keys","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":"\"123e4567-e89b-12d3-a456-426614174000\"","k":"param","n":"agent_id","or":"agent_uuid","r":true,"t":"`$STRING`","index$":0}],"query":[{"a":true,"ex":1,"k":"query","n":"page","or":"page","r":false,"t":"`$INTEGER`","index$":0},{"a":true,"ex":1,"k":"query","n":"per_page","or":"per_page","r":false,"t":"`$INTEGER`","index$":1}]},"k":"http","m":"GET","o":"/v2/gen-ai/agents/{agent_uuid}/api_keys","q":{"exist":["agent_id"]},"r":{"param":{"agent_uuid":"agent_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v2"},{"lit":"gen-ai"},{"lit":"agents"},{"var":"agent_id"},{"lit":"api_keys"}],"t":{"req":"`reqdata`","res":"`body.api_key_infos`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"api_list_agent_api_keys_output","name__orig":"api_list_agent_api_keys_output","Name":"ApiListAgentApiKeysOutput","name_":"api_list_agent_api_keys_output","name-":"api-list-agent-api-keys-output","NAME":"API_LIST_AGENT_API_KEYS_OUTPUT","index$":60}, {"active":true,"entity":"api_list_agent_api_keys_output","key$":"BasicApiListAgentApiKeysOutputFlow","kind":"basic","name":"BasicApiListAgentApiKeysOutputFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{"agent_id":"agent01"},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"api_list_agent_api_keys_output_ref01"}}],"index$":0}]}, 'ApiListAgentApiKeysOutput', {"GET /v2/gen-ai/agents/{agent_uuid}/api_keys":{"protocol":"http","parameters":[{"description":"Agent id","example":"\"123e4567-e89b-12d3-a456-426614174000\"","in":"path","name":"agent_uuid","required":true,"schema":{"type":"string"},"index$":0},{"description":"Page number.","example":1,"in":"query","name":"page","schema":{"type":"integer"},"index$":1},{"description":"Items per page.","example":1,"in":"query","name":"per_page","schema":{"type":"integer"},"index$":2}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let api_list_agent_api_keys_output_ref01_data = Object.values(setup.data.existing.api_list_agent_api_keys_output)[0] as any

    // LIST
    const api_list_agent_api_keys_output_ref01_ent = client.ApiListAgentApiKeysOutput()
    const api_list_agent_api_keys_output_ref01_match: any = {}
    api_list_agent_api_keys_output_ref01_match['agent_id'] = setup.idmap['agent01']

    const api_list_agent_api_keys_output_ref01_list = (await api_list_agent_api_keys_output_ref01_ent.list(api_list_agent_api_keys_output_ref01_match)).map((e: any) => e.data())


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
      '../../../../.sdk/test/entity/api_list_agent_api_keys_output/ApiListAgentApiKeysOutputTestData.json')

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
    ['api_list_agent_api_keys_output01','api_list_agent_api_keys_output02','api_list_agent_api_keys_output03','agent01'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'DIGITALOCEAN_TEST_API_LIST_AGENT_API_KEYS_OUTPUT_ENTID': idmap,
    'DIGITALOCEAN_TEST_LIVE': 'FALSE',
    'DIGITALOCEAN_TEST_EXPLAIN': 'FALSE',
    'DIGITALOCEAN_APIKEY': '',
  })

  idmap = env['DIGITALOCEAN_TEST_API_LIST_AGENT_API_KEYS_OUTPUT_ENTID']

  const live = 'TRUE' === env.DIGITALOCEAN_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['DIGITALOCEAN_TEST_API_LIST_AGENT_API_KEYS_OUTPUT_ENTID']
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
  
