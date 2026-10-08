

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


describe('ApiDeleteScheduledIndexingOutputEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when DIGITALOCEAN_TEST_LIVE=TRUE.
  afterEach(liveDelay('DIGITALOCEAN_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = DigitaloceanSDK.test()
    const ent = testsdk.ApiDeleteScheduledIndexingOutput()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = DigitaloceanSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.ApiDeleteScheduledIndexingOutput().create({"created_at":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.DIGITALOCEAN_TEST_LIVE
    for (const op of ['create', 'remove']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'api_delete_scheduled_indexing_output.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"created_at":{"a":true,"fo":"date-time","h":"Created At","n":"created_at","r":false,"sh":"Created at timestamp","t":"`$STRING`","key$":"created_at","index$":0},"days":{"a":true,"h":"Days","n":"days","r":false,"sh":"Days for execution (day is represented same as in a cron expression, e.g.","t":"`$ARRAY`","key$":"days","index$":1},"deleted_at":{"a":true,"fo":"date-time","h":"Deleted At","n":"deleted_at","r":false,"sh":"Deleted at timestamp (if soft deleted)","t":"`$STRING`","key$":"deleted_at","index$":2},"is_active":{"a":true,"h":"Is Active","n":"is_active","r":false,"sh":"Whether the schedule is currently active","t":"`$BOOLEAN`","key$":"is_active","index$":3},"knowledge_base_uuid":{"a":true,"h":"Knowledge Base Uuid","n":"knowledge_base_uuid","r":false,"sh":"Knowledge base uuid associated with this schedule","t":"`$STRING`","key$":"knowledge_base_uuid","index$":4},"last_ran_at":{"a":true,"fo":"date-time","h":"Last Ran At","n":"last_ran_at","r":false,"sh":"Last time the schedule was executed","t":"`$STRING`","key$":"last_ran_at","index$":5},"next_run_at":{"a":true,"fo":"date-time","h":"Next Run At","n":"next_run_at","r":false,"sh":"Next scheduled run","t":"`$STRING`","key$":"next_run_at","index$":6},"time":{"a":true,"h":"Time","n":"time","r":false,"sh":"Scheduled time of execution (HH:MM:SS format)","t":"`$STRING`","key$":"time","index$":7},"updated_at":{"a":true,"fo":"date-time","h":"Updated At","n":"updated_at","r":false,"sh":"Updated at timestamp","t":"`$STRING`","key$":"updated_at","index$":8},"uuid":{"a":true,"h":"Uuid","n":"uuid","r":false,"sh":"Unique identifier for the scheduled indexing entry","t":"`$STRING`","key$":"uuid","index$":9}},"name":"api_delete_scheduled_indexing_output","op":{"create":{"input":"data","name":"create","points":[{"a":true,"co":{"id":"POST /v2/gen-ai/scheduled-indexing","source":"openapi3","version":2},"g":{},"k":"http","m":"POST","o":"/v2/gen-ai/scheduled-indexing","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v2"},{"lit":"gen-ai"},{"lit":"scheduled-indexing"}],"t":{"req":"`reqdata`","res":"`body.indexing_info`"},"index$":0}],"key$":"create"},"remove":{"input":"data","name":"remove","points":[{"a":true,"co":{"id":"DELETE /v2/gen-ai/scheduled-indexing/{uuid}","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":"\"123e4567-e89b-12d3-a456-426614174000\"","k":"param","n":"uuid","or":"uuid","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"DELETE","o":"/v2/gen-ai/scheduled-indexing/{uuid}","q":{"exist":["uuid"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v2"},{"lit":"gen-ai"},{"lit":"scheduled-indexing"},{"var":"uuid"}],"t":{"req":"`reqdata`","res":"`body.indexing_info`"},"index$":0}],"key$":"remove"}},"relations":{"ancestors":[]},"key$":"api_delete_scheduled_indexing_output","name__orig":"api_delete_scheduled_indexing_output","Name":"ApiDeleteScheduledIndexingOutput","name_":"api_delete_scheduled_indexing_output","name-":"api-delete-scheduled-indexing-output","NAME":"API_DELETE_SCHEDULED_INDEXING_OUTPUT","index$":26}, {"active":true,"entity":"api_delete_scheduled_indexing_output","key$":"BasicApiDeleteScheduledIndexingOutputFlow","kind":"basic","name":"BasicApiDeleteScheduledIndexingOutputFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"api_delete_scheduled_indexing_output_ref01"},"m":{},"o":"create","s":[],"v":[],"index$":0},{"a":true,"d":{},"i":{"ref":"api_delete_scheduled_indexing_output_ref01","suffix":"_rm0"},"m":{"id":"api_delete_scheduled_indexing_output01"},"o":"remove","s":[],"v":[],"index$":1}]}, 'ApiDeleteScheduledIndexingOutput', {"POST /v2/gen-ai/scheduled-indexing":{"protocol":"http","requestBody":{"content":{"application/json":{"schema":{"properties":{"days":{"description":"Days for execution (day is represented same as in a cron expression, e.g. Monday begins with 1 )","items":{"example":123,"format":"int32","type":"integer"},"type":"array","key$":"days"},"knowledge_base_uuid":{"description":"Knowledge base uuid for which the schedule is created","example":"123e4567-e89b-12d3-a456-426614174000","type":"string","key$":"knowledge_base_uuid"},"time":{"description":"Time of execution (HH:MM) UTC","example":"example string","type":"string","key$":"time"}},"type":"object","x-ref":"#/components/schemas/apiCreateScheduledIndexingInputPublic","index$":1}}}},"parameters":[]},"DELETE /v2/gen-ai/scheduled-indexing/{uuid}":{"protocol":"http","parameters":[{"description":"UUID of the scheduled indexing","example":"\"123e4567-e89b-12d3-a456-426614174000\"","in":"path","name":"uuid","required":true,"schema":{"type":"string"},"index$":0}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const api_delete_scheduled_indexing_output_ref01_ent = client.ApiDeleteScheduledIndexingOutput()
    let api_delete_scheduled_indexing_output_ref01_data = setup.data.new.api_delete_scheduled_indexing_output['api_delete_scheduled_indexing_output_ref01']

    api_delete_scheduled_indexing_output_ref01_data = (await api_delete_scheduled_indexing_output_ref01_ent.create(api_delete_scheduled_indexing_output_ref01_data)).data()
    assert(null != api_delete_scheduled_indexing_output_ref01_data)



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
      '../../../../.sdk/test/entity/api_delete_scheduled_indexing_output/ApiDeleteScheduledIndexingOutputTestData.json')

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
    ['api_delete_scheduled_indexing_output01','api_delete_scheduled_indexing_output02','api_delete_scheduled_indexing_output03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'DIGITALOCEAN_TEST_API_DELETE_SCHEDULED_INDEXING_OUTPUT_ENTID': idmap,
    'DIGITALOCEAN_TEST_LIVE': 'FALSE',
    'DIGITALOCEAN_TEST_EXPLAIN': 'FALSE',
    'DIGITALOCEAN_APIKEY': '',
  })

  idmap = env['DIGITALOCEAN_TEST_API_DELETE_SCHEDULED_INDEXING_OUTPUT_ENTID']

  const live = 'TRUE' === env.DIGITALOCEAN_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['DIGITALOCEAN_TEST_API_DELETE_SCHEDULED_INDEXING_OUTPUT_ENTID']
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
  
