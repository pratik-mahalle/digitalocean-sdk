

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


describe('ApiListSimulationJourneysOutputEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when DIGITALOCEAN_TEST_LIVE=TRUE.
  afterEach(liveDelay('DIGITALOCEAN_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = DigitaloceanSDK.test()
    const ent = testsdk.ApiListSimulationJourneysOutput()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = DigitaloceanSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.ApiListSimulationJourneysOutput().list({"simulation_run_id":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.DIGITALOCEAN_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'api_list_simulation_journeys_output.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"created_at":{"a":true,"fo":"date-time","h":"Created At","n":"created_at","r":false,"sh":"Time created at.","t":"`$STRING`","key$":"created_at","index$":0},"duration_sec":{"a":true,"fo":"uint64","h":"Duration Sec","n":"duration_sec","r":false,"sh":"Wall-clock time taken for the journey to complete, in seconds.","t":"`$STRING`","key$":"duration_sec","index$":1},"failure_reason":{"a":true,"h":"Failure Reason","n":"failure_reason","r":false,"sh":"Human-readable explanation of a terminal FAILED status.","t":"`$STRING`","key$":"failure_reason","index$":2},"journey_index":{"a":true,"fo":"int64","h":"Journey Index","n":"journey_index","r":false,"sh":"Zero-based index of this journey within its scenario's exploration budget.","t":"`$INTEGER`","key$":"journey_index","index$":3},"journey_uuid":{"a":true,"h":"Journey Uuid","n":"journey_uuid","r":false,"sh":"UUID of the journey.","t":"`$STRING`","key$":"journey_uuid","index$":4},"judge_reasoning":{"a":true,"h":"Judge Reasoning","n":"judge_reasoning","r":false,"sh":"Optional judge reasoning for the verdict.","t":"`$STRING`","key$":"judge_reasoning","index$":5},"run_uuid":{"a":true,"h":"Run Uuid","n":"run_uuid","r":false,"sh":"UUID of the run this journey belongs to.","t":"`$STRING`","key$":"run_uuid","index$":6},"scenario_uuid":{"a":true,"h":"Scenario Uuid","n":"scenario_uuid","r":false,"sh":"UUID of the scenario this journey executed.","t":"`$STRING`","key$":"scenario_uuid","index$":7},"session_id":{"a":true,"h":"Session Id","n":"session_id","r":false,"sh":"Session identifier for this journey.","t":"`$STRING`","key$":"session_id","index$":8},"status":{"a":true,"h":"Status","n":"status","r":false,"sh":"Lifecycle status of a single journey.","t":"`$STRING`","key$":"status","index$":9},"token_usage":{"a":true,"h":"Token Usage","n":"token_usage","r":false,"sh":"Per-actor token accounting for a run or journey.","t":"`$OBJECT`","key$":"token_usage","index$":10},"trajectory_bucket_name":{"a":true,"h":"Trajectory Bucket Name","n":"trajectory_bucket_name","r":false,"sh":"Object storage bucket holding the trajectory JSON.","t":"`$STRING`","key$":"trajectory_bucket_name","index$":11},"trajectory_bucket_region":{"a":true,"h":"Trajectory Bucket Region","n":"trajectory_bucket_region","r":false,"sh":"Object storage bucket region for the trajectory JSON.","t":"`$STRING`","key$":"trajectory_bucket_region","index$":12},"trajectory_spaces_key":{"a":true,"h":"Trajectory Spaces Key","n":"trajectory_spaces_key","r":false,"sh":"Object storage key for the trajectory JSON.","t":"`$STRING`","key$":"trajectory_spaces_key","index$":13},"updated_at":{"a":true,"fo":"date-time","h":"Updated At","n":"updated_at","r":false,"sh":"Time last updated at.","t":"`$STRING`","key$":"updated_at","index$":14},"verdict":{"a":true,"h":"Verdict","n":"verdict","r":false,"sh":"The judge's verdict for a journey.","t":"`$STRING`","key$":"verdict","index$":15}},"name":"api_list_simulation_journeys_output","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /v2/gen-ai/simulation_runs/{run_uuid}/journeys","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":"\"123e4567-e89b-12d3-a456-426614174000\"","k":"param","n":"simulation_run_id","or":"run_uuid","r":true,"t":"`$STRING`","index$":0}],"query":[{"a":true,"ex":1,"k":"query","n":"page","or":"page","r":false,"t":"`$INTEGER`","index$":0},{"a":true,"ex":1,"k":"query","n":"per_page","or":"per_page","r":false,"t":"`$INTEGER`","index$":1},{"a":true,"ex":"123e4567-e89b-12d3-a456-426614174000","k":"query","n":"scenario_uuid","or":"scenario_uuid","r":false,"t":"`$STRING`","index$":2},{"a":true,"ex":"example string","k":"query","n":"search","or":"search","r":false,"t":"`$STRING`","index$":3},{"a":true,"ex":"SIMULATION_JOURNEY_SORT_FIELD_UNSPECIFIED","k":"query","n":"sort_by","or":"sort_by","r":false,"t":"`$STRING`","index$":4},{"a":true,"ex":"SORT_DIRECTION_UNSPECIFIED","k":"query","n":"sort_direction","or":"sort_direction","r":false,"t":"`$STRING`","index$":5},{"a":true,"ex":["SIMULATION_JOURNEY_STATUS_FINISHED"],"k":"query","n":"status","or":"statuses","r":false,"t":"`$ARRAY`","index$":6},{"a":true,"ex":["SIMULATION_JOURNEY_VERDICT_SUCCESS"],"k":"query","n":"verdict","or":"verdicts","r":false,"t":"`$ARRAY`","index$":7}]},"k":"http","m":"GET","o":"/v2/gen-ai/simulation_runs/{run_uuid}/journeys","q":{"exist":["simulation_run_id"]},"r":{"param":{"run_uuid":"simulation_run_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v2"},{"lit":"gen-ai"},{"lit":"simulation_runs"},{"var":"simulation_run_id"},{"lit":"journeys"}],"t":{"req":"`reqdata`","res":"`body.journeys`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"api_list_simulation_journeys_output","name__orig":"api_list_simulation_journeys_output","Name":"ApiListSimulationJourneysOutput","name_":"api_list_simulation_journeys_output","name-":"api-list-simulation-journeys-output","NAME":"API_LIST_SIMULATION_JOURNEYS_OUTPUT","index$":70}, {"active":true,"entity":"api_list_simulation_journeys_output","key$":"BasicApiListSimulationJourneysOutputFlow","kind":"basic","name":"BasicApiListSimulationJourneysOutputFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{"simulation_run_id":"simulation_run01"},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"api_list_simulation_journeys_output_ref01"}}],"index$":0}]}, 'ApiListSimulationJourneysOutput', {"GET /v2/gen-ai/simulation_runs/{run_uuid}/journeys":{"protocol":"http","parameters":[{"description":"UUID of the run whose journeys to list.","example":"\"123e4567-e89b-12d3-a456-426614174000\"","in":"path","name":"run_uuid","required":true,"schema":{"type":"string"},"index$":0},{"description":"Optional filter by scenario.","example":"123e4567-e89b-12d3-a456-426614174000","in":"query","name":"scenario_uuid","schema":{"type":"string"},"index$":1},{"description":"Page number.","example":1,"in":"query","name":"page","schema":{"type":"integer"},"index$":2},{"description":"Items per page.","example":1,"in":"query","name":"per_page","schema":{"type":"integer"},"index$":3},{"description":"Filter by one or more statuses. Empty means no status filter.\n\n - SIMULATION_JOURNEY_STATUS_RUNNING: The journey is executing and a trajectory is available to retrieve.\n - SIMULATION_JOURNEY_STATUS_FINISHED: The journey reached a stop condition and produced a verdict.\n - SIMULATION_JOURNEY_STATUS_FAILED: The journey failed because of a cancel, timeout, or error.\n - SIMULATION_JOURNEY_STATUS_PREPARING: The journey is allocated but its trajectory is not available yet.","example":["SIMULATION_JOURNEY_STATUS_FINISHED"],"in":"query","name":"statuses","schema":{"items":{"enum":["SIMULATION_JOURNEY_STATUS_UNSPECIFIED","SIMULATION_JOURNEY_STATUS_RUNNING","SIMULATION_JOURNEY_STATUS_FINISHED","SIMULATION_JOURNEY_STATUS_FAILED","SIMULATION_JOURNEY_STATUS_PREPARING"],"type":"string"},"type":"array"},"index$":4},{"description":"Filter by one or more verdicts. Empty means no verdict filter.\n\n - SIMULATION_JOURNEY_VERDICT_SUCCESS: The candidate agent satisfied the scenario's stopping criteria.\n - SIMULATION_JOURNEY_VERDICT_FAILURE: The candidate agent did not satisfy the stopping criteria.\n - SIMULATION_JOURNEY_VERDICT_INCONCLUSIVE: No conclusive verdict (e.g. max_turns reached without the judge finishing).","example":["SIMULATION_JOURNEY_VERDICT_SUCCESS"],"in":"query","name":"verdicts","schema":{"items":{"enum":["SIMULATION_JOURNEY_VERDICT_UNSPECIFIED","SIMULATION_JOURNEY_VERDICT_SUCCESS","SIMULATION_JOURNEY_VERDICT_FAILURE","SIMULATION_JOURNEY_VERDICT_INCONCLUSIVE"],"type":"string"},"type":"array"},"index$":5},{"description":"Free-text search across scenario_uuid and session_id\n(case-insensitive substring match). Empty means no search.","example":"example string","in":"query","name":"search","schema":{"type":"string"},"index$":6},{"description":"Field to sort by. Defaults to scenario ordering when unspecified.\n\n - SIMULATION_JOURNEY_SORT_FIELD_SCENARIO: Sort by scenario_uuid then journey_index. Default.\n - SIMULATION_JOURNEY_SORT_FIELD_CREATED_AT: Sort by creation date.\n - SIMULATION_JOURNEY_SORT_FIELD_STATUS: Sort by journey status using lifecycle order.\n - SIMULATION_JOURNEY_SORT_FIELD_VERDICT: Sort by verdict (nulls last).","example":"SIMULATION_JOURNEY_SORT_FIELD_UNSPECIFIED","in":"query","name":"sort_by","schema":{"default":"SIMULATION_JOURNEY_SORT_FIELD_UNSPECIFIED","enum":["SIMULATION_JOURNEY_SORT_FIELD_UNSPECIFIED","SIMULATION_JOURNEY_SORT_FIELD_SCENARIO","SIMULATION_JOURNEY_SORT_FIELD_CREATED_AT","SIMULATION_JOURNEY_SORT_FIELD_STATUS","SIMULATION_JOURNEY_SORT_FIELD_VERDICT"],"type":"string"},"index$":7},{"description":"Sort direction. Defaults to ascending when unspecified.","example":"SORT_DIRECTION_UNSPECIFIED","in":"query","name":"sort_direction","schema":{"default":"SORT_DIRECTION_UNSPECIFIED","enum":["SORT_DIRECTION_UNSPECIFIED","SORT_DIRECTION_ASC","SORT_DIRECTION_DESC"],"type":"string"},"index$":8}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let api_list_simulation_journeys_output_ref01_data = Object.values(setup.data.existing.api_list_simulation_journeys_output)[0] as any

    // LIST
    const api_list_simulation_journeys_output_ref01_ent = client.ApiListSimulationJourneysOutput()
    const api_list_simulation_journeys_output_ref01_match: any = {}
    api_list_simulation_journeys_output_ref01_match['simulation_run_id'] = setup.idmap['simulation_run01']

    const api_list_simulation_journeys_output_ref01_list = (await api_list_simulation_journeys_output_ref01_ent.list(api_list_simulation_journeys_output_ref01_match)).map((e: any) => e.data())


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
      '../../../../.sdk/test/entity/api_list_simulation_journeys_output/ApiListSimulationJourneysOutputTestData.json')

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
    ['api_list_simulation_journeys_output01','api_list_simulation_journeys_output02','api_list_simulation_journeys_output03','simulation_run01'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'DIGITALOCEAN_TEST_API_LIST_SIMULATION_JOURNEYS_OUTPUT_ENTID': idmap,
    'DIGITALOCEAN_TEST_LIVE': 'FALSE',
    'DIGITALOCEAN_TEST_EXPLAIN': 'FALSE',
    'DIGITALOCEAN_APIKEY': '',
  })

  idmap = env['DIGITALOCEAN_TEST_API_LIST_SIMULATION_JOURNEYS_OUTPUT_ENTID']

  const live = 'TRUE' === env.DIGITALOCEAN_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['DIGITALOCEAN_TEST_API_LIST_SIMULATION_JOURNEYS_OUTPUT_ENTID']
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
  
