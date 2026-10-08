

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


describe('ApiLinkAgentOutputEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when DIGITALOCEAN_TEST_LIVE=TRUE.
  afterEach(liveDelay('DIGITALOCEAN_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = DigitaloceanSDK.test()
    const ent = testsdk.ApiLinkAgentOutput()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = DigitaloceanSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.ApiLinkAgentOutput().create({"agent_id":1,"child_agent_uuid":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.DIGITALOCEAN_TEST_LIVE
    for (const op of ['create']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'api_link_agent_output.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"child_agent_uuid":{"a":true,"h":"Child Agent Uuid","n":"child_agent_uuid","r":false,"sh":"Routed agent id","t":"`$STRING`","key$":"child_agent_uuid","index$":0},"if_case":{"a":true,"h":"If Case","n":"if_case","r":false,"t":"`$STRING`","key$":"if_case","index$":1},"parent_agent_uuid":{"a":true,"h":"Parent Agent Uuid","n":"parent_agent_uuid","r":false,"sh":"A unique identifier for the parent agent.","t":"`$STRING`","key$":"parent_agent_uuid","index$":2},"route_name":{"a":true,"h":"Route Name","n":"route_name","r":false,"sh":"Name of route","t":"`$STRING`","key$":"route_name","index$":3}},"name":"api_link_agent_output","op":{"create":{"input":"data","name":"create","points":[{"a":true,"co":{"id":"POST /v2/gen-ai/agents/{parent_agent_uuid}/child_agents/{child_agent_uuid}","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":"\"123e4567-e89b-12d3-a456-426614174000\"","k":"param","n":"agent_id","or":"parent_agent_uuid","r":true,"t":"`$STRING`","index$":0},{"a":true,"ex":"\"123e4567-e89b-12d3-a456-426614174000\"","k":"param","n":"child_agent_uuid","or":"child_agent_uuid","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"POST","o":"/v2/gen-ai/agents/{parent_agent_uuid}/child_agents/{child_agent_uuid}","q":{"exist":["agent_id","child_agent_uuid"]},"r":{"param":{"parent_agent_uuid":"agent_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v2"},{"lit":"gen-ai"},{"lit":"agents"},{"var":"agent_id"},{"lit":"child_agents"},{"var":"child_agent_uuid"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"}},"relations":{"ancestors":[]},"key$":"api_link_agent_output","name__orig":"api_link_agent_output","Name":"ApiLinkAgentOutput","name_":"api_link_agent_output","name-":"api-link-agent-output","NAME":"API_LINK_AGENT_OUTPUT","index$":56}, {"active":true,"entity":"api_link_agent_output","key$":"BasicApiLinkAgentOutputFlow","kind":"basic","name":"BasicApiLinkAgentOutputFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"api_link_agent_output_ref01"},"m":{"agent_id":"agent01","child_agent_uuid":"child_agent_uuid01"},"o":"create","s":[],"v":[],"index$":0}]}, 'ApiLinkAgentOutput', {"POST /v2/gen-ai/agents/{parent_agent_uuid}/child_agents/{child_agent_uuid}":{"protocol":"http","requestBody":{"content":{"application/json":{"schema":{"description":"Information for linking an agent","properties":{"child_agent_uuid":{"description":"Routed agent id","example":"\"12345678-1234-1234-1234-123456789012\"","type":"string","key$":"child_agent_uuid"},"if_case":{"example":"\"use this to get weather information\"","type":"string","key$":"if_case"},"parent_agent_uuid":{"description":"A unique identifier for the parent agent.","example":"\"12345678-1234-1234-1234-123456789012\"","type":"string","key$":"parent_agent_uuid"},"route_name":{"description":"Name of route","example":"\"weather_route\"","type":"string","key$":"route_name"}},"type":"object","x-ref":"#/components/schemas/apiLinkAgentInputPublic","index$":1}}}},"parameters":[{"description":"A unique identifier for the parent agent.","example":"\"123e4567-e89b-12d3-a456-426614174000\"","in":"path","name":"parent_agent_uuid","required":true,"schema":{"type":"string"},"index$":0},{"description":"Routed agent id","example":"\"123e4567-e89b-12d3-a456-426614174000\"","in":"path","name":"child_agent_uuid","required":true,"schema":{"type":"string"},"index$":1}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const api_link_agent_output_ref01_ent = client.ApiLinkAgentOutput()
    let api_link_agent_output_ref01_data = setup.data.new.api_link_agent_output['api_link_agent_output_ref01']
    api_link_agent_output_ref01_data['agent_id'] = setup.idmap['agent01']
    api_link_agent_output_ref01_data['child_agent_uuid'] = setup.idmap['child_agent_uuid01']

    api_link_agent_output_ref01_data = (await api_link_agent_output_ref01_ent.create(api_link_agent_output_ref01_data)).data()
    assert(null != api_link_agent_output_ref01_data)


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
      '../../../../.sdk/test/entity/api_link_agent_output/ApiLinkAgentOutputTestData.json')

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
    ['api_link_agent_output01','api_link_agent_output02','api_link_agent_output03','agent01','child_agent_uuid01'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'DIGITALOCEAN_TEST_API_LINK_AGENT_OUTPUT_ENTID': idmap,
    'DIGITALOCEAN_TEST_LIVE': 'FALSE',
    'DIGITALOCEAN_TEST_EXPLAIN': 'FALSE',
    'DIGITALOCEAN_APIKEY': '',
  })

  idmap = env['DIGITALOCEAN_TEST_API_LINK_AGENT_OUTPUT_ENTID']

  const live = 'TRUE' === env.DIGITALOCEAN_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['DIGITALOCEAN_TEST_API_LINK_AGENT_OUTPUT_ENTID']
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
  
