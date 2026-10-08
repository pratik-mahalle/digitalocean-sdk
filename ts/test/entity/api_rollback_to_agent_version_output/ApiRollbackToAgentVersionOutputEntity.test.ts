

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


describe('ApiRollbackToAgentVersionOutputEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when DIGITALOCEAN_TEST_LIVE=TRUE.
  afterEach(liveDelay('DIGITALOCEAN_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = DigitaloceanSDK.test()
    const ent = testsdk.ApiRollbackToAgentVersionOutput()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = DigitaloceanSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.ApiRollbackToAgentVersionOutput().update({"agent_id":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.DIGITALOCEAN_TEST_LIVE
    for (const op of []) {
      if (!live && maybeSkipControl(t, 'entityOp', 'api_rollback_to_agent_version_output.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"audit_header":{"a":true,"h":"Audit Header","n":"audit_header","r":false,"sh":"An alternative way to provide auth information.","t":"`$OBJECT`","key$":"audit_header","index$":0},"uuid":{"a":true,"h":"Uuid","n":"uuid","r":false,"sh":"Agent unique identifier","t":"`$STRING`","key$":"uuid","index$":1},"version_hash":{"a":true,"h":"Version Hash","n":"version_hash","r":false,"sh":"Unique identifier","t":"`$STRING`","key$":"version_hash","index$":2}},"name":"api_rollback_to_agent_version_output","op":{"update":{"input":"data","name":"update","points":[{"a":true,"co":{"id":"PUT /v2/gen-ai/agents/{uuid}/versions","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":"\"123e4567-e89b-12d3-a456-426614174000\"","k":"param","n":"agent_id","or":"uuid","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"PUT","o":"/v2/gen-ai/agents/{uuid}/versions","q":{"exist":["agent_id"]},"r":{"param":{"uuid":"agent_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v2"},{"lit":"gen-ai"},{"lit":"agents"},{"var":"agent_id"},{"lit":"versions"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"update"}},"relations":{"ancestors":[]},"key$":"api_rollback_to_agent_version_output","name__orig":"api_rollback_to_agent_version_output","Name":"ApiRollbackToAgentVersionOutput","name_":"api_rollback_to_agent_version_output","name-":"api-rollback-to-agent-version-output","NAME":"API_ROLLBACK_TO_AGENT_VERSION_OUTPUT","index$":80}, {"active":true,"entity":"api_rollback_to_agent_version_output","key$":"BasicApiRollbackToAgentVersionOutputFlow","kind":"basic","name":"BasicApiRollbackToAgentVersionOutputFlow","param":{},"step":[{"a":false,"d":{},"i":{"ref":"api_rollback_to_agent_version_output_ref01","srcdatavar":"api_rollback_to_agent_version_output_ref01_data","suffix":"_up0","textfield":"uuid"},"m":{},"o":"update","s":[{"apply":"TextFieldMark","def":{"mark":"Mark01-api_rollback_to_agent_version_output_ref01"}}],"v":[],"unreachable":true}]}, 'ApiRollbackToAgentVersionOutput', {"PUT /v2/gen-ai/agents/{uuid}/versions":{"protocol":"http","requestBody":{"content":{"application/json":{"schema":{"properties":{"uuid":{"description":"Agent unique identifier","example":"\"12345678-1234-1234-1234-123456789012\"","type":"string","key$":"uuid"},"version_hash":{"description":"Unique identifier","example":"c3658d8b5c05494cd03ce042926ef08157889ed54b1b74b5ee0b3d66dcee4b73","type":"string","key$":"version_hash"}},"type":"object","x-ref":"#/components/schemas/apiRollbackToAgentVersionInputPublic","index$":1}}}},"parameters":[{"description":"Agent unique identifier","example":"\"123e4567-e89b-12d3-a456-426614174000\"","in":"path","name":"uuid","required":true,"schema":{"type":"string"},"index$":0}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let api_rollback_to_agent_version_output_ref01_data = Object.values(setup.data.existing.api_rollback_to_agent_version_output)[0] as any

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
      '../../../../.sdk/test/entity/api_rollback_to_agent_version_output/ApiRollbackToAgentVersionOutputTestData.json')

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
    ['api_rollback_to_agent_version_output01','api_rollback_to_agent_version_output02','api_rollback_to_agent_version_output03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'DIGITALOCEAN_TEST_API_ROLLBACK_TO_AGENT_VERSION_OUTPUT_ENTID': idmap,
    'DIGITALOCEAN_TEST_LIVE': 'FALSE',
    'DIGITALOCEAN_TEST_EXPLAIN': 'FALSE',
    'DIGITALOCEAN_APIKEY': '',
  })

  idmap = env['DIGITALOCEAN_TEST_API_ROLLBACK_TO_AGENT_VERSION_OUTPUT_ENTID']

  const live = 'TRUE' === env.DIGITALOCEAN_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['DIGITALOCEAN_TEST_API_ROLLBACK_TO_AGENT_VERSION_OUTPUT_ENTID']
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
  
