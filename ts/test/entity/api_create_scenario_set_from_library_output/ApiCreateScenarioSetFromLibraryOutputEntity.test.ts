

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


describe('ApiCreateScenarioSetFromLibraryOutputEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when DIGITALOCEAN_TEST_LIVE=TRUE.
  afterEach(liveDelay('DIGITALOCEAN_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = DigitaloceanSDK.test()
    const ent = testsdk.ApiCreateScenarioSetFromLibraryOutput()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = DigitaloceanSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.ApiCreateScenarioSetFromLibraryOutput().create({"scenario_library_id":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.DIGITALOCEAN_TEST_LIVE
    for (const op of ['create']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'api_create_scenario_set_from_library_output.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"bucket_name":{"a":true,"h":"Bucket Name","n":"bucket_name","r":false,"sh":"Object storage bucket holding the scenario file.","t":"`$STRING`","key$":"bucket_name","index$":0},"bucket_region":{"a":true,"h":"Bucket Region","n":"bucket_region","r":false,"sh":"Object storage bucket region.","t":"`$STRING`","key$":"bucket_region","index$":1},"created_at":{"a":true,"fo":"date-time","h":"Created At","n":"created_at","r":false,"sh":"Time created at.","t":"`$STRING`","key$":"created_at","index$":2},"deleted_at":{"a":true,"fo":"date-time","h":"Deleted At","n":"deleted_at","r":false,"sh":"Time deleted at.","t":"`$STRING`","key$":"deleted_at","index$":3},"description":{"a":true,"h":"Description","n":"description","r":false,"sh":"Customer-supplied description.","t":"`$STRING`","key$":"description","index$":4},"failure_reason":{"a":true,"h":"Failure Reason","n":"failure_reason","r":false,"sh":"Human-readable explanation of a terminal FAILED status.","t":"`$STRING`","key$":"failure_reason","index$":5},"generator_model_uuid":{"a":true,"h":"Generator Model Uuid","n":"generator_model_uuid","r":false,"sh":"Model that produced the scenarios.","t":"`$STRING`","key$":"generator_model_uuid","index$":6},"library_scenario_uuid":{"a":true,"h":"Library Scenario Uuid","n":"library_scenario_uuid","r":false,"sh":"UUID of the source library entry.","t":"`$STRING`","key$":"library_scenario_uuid","index$":7},"name":{"a":true,"h":"Name","n":"name","r":false,"sh":"Customer-supplied name.","t":"`$STRING`","key$":"name","index$":8},"scenario_count":{"a":true,"fo":"int64","h":"Scenario Count","n":"scenario_count","r":false,"sh":"Number of scenarios in the set.","t":"`$INTEGER`","key$":"scenario_count","index$":9},"scenario_set_uuid":{"a":true,"h":"Scenario Set Uuid","n":"scenario_set_uuid","r":false,"sh":"UUID of the scenario set.","t":"`$STRING`","key$":"scenario_set_uuid","index$":10},"source_export_id":{"a":true,"h":"Source Export Id","n":"source_export_id","r":false,"sh":"Signals export UUID that produced this set.","t":"`$STRING`","key$":"source_export_id","index$":11},"source_goal_description":{"a":true,"h":"Source Goal Description","n":"source_goal_description","r":false,"sh":"The goal that drove generation.","t":"`$STRING`","key$":"source_goal_description","index$":12},"source_kind":{"a":true,"h":"Source Kind","n":"source_kind","r":false,"sh":"How a scenario set was created.","t":"`$STRING`","key$":"source_kind","index$":13},"spaces_key":{"a":true,"h":"Spaces Key","n":"spaces_key","r":false,"sh":"Object storage key for the scenario file.","t":"`$STRING`","key$":"spaces_key","index$":14},"status":{"a":true,"h":"Status","n":"status","r":false,"sh":"Lifecycle status of a scenario set.","t":"`$STRING`","key$":"status","index$":15},"updated_at":{"a":true,"fo":"date-time","h":"Updated At","n":"updated_at","r":false,"sh":"Time last updated at.","t":"`$STRING`","key$":"updated_at","index$":16},"workflow_uuid":{"a":true,"h":"Workflow Uuid","n":"workflow_uuid","r":false,"sh":"Identifier of the generation workflow.","t":"`$STRING`","key$":"workflow_uuid","index$":17}},"name":"api_create_scenario_set_from_library_output","op":{"create":{"input":"data","name":"create","points":[{"a":true,"co":{"id":"POST /v2/gen-ai/scenario_library/{library_scenario_uuid}/create_scenario_set","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":"\"123e4567-e89b-12d3-a456-426614174000\"","k":"param","n":"scenario_library_id","or":"library_scenario_uuid","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"POST","o":"/v2/gen-ai/scenario_library/{library_scenario_uuid}/create_scenario_set","q":{"exist":["scenario_library_id"]},"r":{"param":{"library_scenario_uuid":"scenario_library_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v2"},{"lit":"gen-ai"},{"lit":"scenario_library"},{"var":"scenario_library_id"},{"lit":"create_scenario_set"}],"t":{"req":"`reqdata`","res":"`body.scenario_set`"},"index$":0}],"key$":"create"}},"relations":{"ancestors":[]},"key$":"api_create_scenario_set_from_library_output","name__orig":"api_create_scenario_set_from_library_output","Name":"ApiCreateScenarioSetFromLibraryOutput","name_":"api_create_scenario_set_from_library_output","name-":"api-create-scenario-set-from-library-output","NAME":"API_CREATE_SCENARIO_SET_FROM_LIBRARY_OUTPUT","index$":11}, {"active":true,"entity":"api_create_scenario_set_from_library_output","key$":"BasicApiCreateScenarioSetFromLibraryOutputFlow","kind":"basic","name":"BasicApiCreateScenarioSetFromLibraryOutputFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"api_create_scenario_set_from_library_output_ref01"},"m":{"scenario_library_id":"scenario_library01"},"o":"create","s":[],"v":[],"index$":0}]}, 'ApiCreateScenarioSetFromLibraryOutput', {"POST /v2/gen-ai/scenario_library/{library_scenario_uuid}/create_scenario_set":{"protocol":"http","requestBody":{"content":{"application/json":{"schema":{"description":"Public parameters for creating a scenario set from a Common Scenario & Goal Library entry.","properties":{"library_scenario_uuid":{"description":"UUID of the library entry to copy.","example":"123e4567-e89b-12d3-a456-426614174000","type":"string","key$":"library_scenario_uuid"},"name":{"description":"Optional name for the new scenario set. Defaults to the library entry's\nname when unset.","example":"example name","type":"string","key$":"name"}},"type":"object","x-ref":"#/components/schemas/apiCreateScenarioSetFromLibraryInputPublic","index$":1}}}},"parameters":[{"description":"UUID of the library entry to copy.","example":"\"123e4567-e89b-12d3-a456-426614174000\"","in":"path","name":"library_scenario_uuid","required":true,"schema":{"type":"string"},"index$":0}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const api_create_scenario_set_from_library_output_ref01_ent = client.ApiCreateScenarioSetFromLibraryOutput()
    let api_create_scenario_set_from_library_output_ref01_data = setup.data.new.api_create_scenario_set_from_library_output['api_create_scenario_set_from_library_output_ref01']
    api_create_scenario_set_from_library_output_ref01_data['scenario_library_id'] = setup.idmap['scenario_library01']

    api_create_scenario_set_from_library_output_ref01_data = (await api_create_scenario_set_from_library_output_ref01_ent.create(api_create_scenario_set_from_library_output_ref01_data)).data()
    assert(null != api_create_scenario_set_from_library_output_ref01_data)


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
      '../../../../.sdk/test/entity/api_create_scenario_set_from_library_output/ApiCreateScenarioSetFromLibraryOutputTestData.json')

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
    ['api_create_scenario_set_from_library_output01','api_create_scenario_set_from_library_output02','api_create_scenario_set_from_library_output03','scenario_library01'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'DIGITALOCEAN_TEST_API_CREATE_SCENARIO_SET_FROM_LIBRARY_OUTPUT_ENTID': idmap,
    'DIGITALOCEAN_TEST_LIVE': 'FALSE',
    'DIGITALOCEAN_TEST_EXPLAIN': 'FALSE',
    'DIGITALOCEAN_APIKEY': '',
  })

  idmap = env['DIGITALOCEAN_TEST_API_CREATE_SCENARIO_SET_FROM_LIBRARY_OUTPUT_ENTID']

  const live = 'TRUE' === env.DIGITALOCEAN_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['DIGITALOCEAN_TEST_API_CREATE_SCENARIO_SET_FROM_LIBRARY_OUTPUT_ENTID']
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
  
