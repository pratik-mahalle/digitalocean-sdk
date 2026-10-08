

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


describe('ApiSimulationTrajectoryEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when DIGITALOCEAN_TEST_LIVE=TRUE.
  afterEach(liveDelay('DIGITALOCEAN_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = DigitaloceanSDK.test()
    const ent = testsdk.ApiSimulationTrajectory()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = DigitaloceanSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.ApiSimulationTrajectory().load({"journey_id":1,"simulation_run_id":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.DIGITALOCEAN_TEST_LIVE
    for (const op of []) {
      if (!live && maybeSkipControl(t, 'entityOp', 'api_simulation_trajectory.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"agent_id":{"a":true,"h":"Agent Id","n":"agent_id","r":false,"sh":"Identifier of the candidate agent under test for this journey.","t":"`$STRING`","key$":"agent_id","index$":0},"completed_at":{"a":true,"h":"Completed At","n":"completed_at","r":false,"t":"`$STRING`","key$":"completed_at","index$":1},"duration_sec":{"a":true,"fo":"uint64","h":"Duration Sec","n":"duration_sec","r":false,"t":"`$STRING`","key$":"duration_sec","index$":2},"evaluation_metrics":{"a":true,"h":"Evaluation Metrics","n":"evaluation_metrics","r":false,"sh":"Per-metric scores and judge reasoning for this trajectory.","t":"`$ARRAY`","key$":"evaluation_metrics","index$":3},"failure_reason":{"a":true,"h":"Failure Reason","n":"failure_reason","r":false,"t":"`$STRING`","key$":"failure_reason","index$":4},"journey_index":{"a":true,"fo":"int64","h":"Journey Index","n":"journey_index","r":false,"t":"`$INTEGER`","key$":"journey_index","index$":5},"journey_uuid":{"a":true,"h":"Journey Uuid","n":"journey_uuid","r":false,"t":"`$STRING`","key$":"journey_uuid","index$":6},"judge":{"a":true,"h":"Judge","n":"judge","r":false,"sh":"Judge output embedded in the trajectory JSON.","t":"`$OBJECT`","key$":"judge","index$":7},"max_turns":{"a":true,"fo":"int64","h":"Max Turns","n":"max_turns","r":false,"sh":"Turn budget configured for this journey (per-scenario max_turns, after any run-level override).","t":"`$INTEGER`","key$":"max_turns","index$":8},"messages":{"a":true,"h":"Messages","n":"messages","r":false,"t":"`$ARRAY`","key$":"messages","index$":9},"run_uuid":{"a":true,"h":"Run Uuid","n":"run_uuid","r":false,"t":"`$STRING`","key$":"run_uuid","index$":10},"scenario_uuid":{"a":true,"h":"Scenario Uuid","n":"scenario_uuid","r":false,"t":"`$STRING`","key$":"scenario_uuid","index$":11},"session_id":{"a":true,"h":"Session Id","n":"session_id","r":false,"t":"`$STRING`","key$":"session_id","index$":12},"started_at":{"a":true,"h":"Started At","n":"started_at","r":false,"t":"`$STRING`","key$":"started_at","index$":13},"status":{"a":true,"h":"Status","n":"status","r":false,"sh":"Lifecycle status of the trajectory.","t":"`$STRING`","key$":"status","index$":14},"token_usage":{"a":true,"h":"Token Usage","n":"token_usage","r":false,"sh":"Per-actor token accounting for a run or journey.","t":"`$OBJECT`","key$":"token_usage","index$":15},"turn_count":{"a":true,"fo":"int64","h":"Turn Count","n":"turn_count","r":false,"t":"`$INTEGER`","key$":"turn_count","index$":16},"verdict":{"a":true,"h":"Verdict","n":"verdict","r":false,"sh":"The judge's verdict for a journey.","t":"`$STRING`","key$":"verdict","index$":17}},"name":"api_simulation_trajectory","op":{"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /v2/gen-ai/simulation_runs/{run_uuid}/journeys/{journey_uuid}/trajectory","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":"\"123e4567-e89b-12d3-a456-426614174000\"","k":"param","n":"journey_id","or":"journey_uuid","r":true,"t":"`$STRING`","index$":0},{"a":true,"ex":"\"123e4567-e89b-12d3-a456-426614174000\"","k":"param","n":"simulation_run_id","or":"run_uuid","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"GET","o":"/v2/gen-ai/simulation_runs/{run_uuid}/journeys/{journey_uuid}/trajectory","q":{"exist":["journey_id","simulation_run_id"]},"r":{"param":{"journey_uuid":"journey_id","run_uuid":"simulation_run_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v2"},{"lit":"gen-ai"},{"lit":"simulation_runs"},{"var":"simulation_run_id"},{"lit":"journeys"},{"var":"journey_id"},{"lit":"trajectory"}],"t":{"req":"`reqdata`","res":"`body.trajectory`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"api_simulation_trajectory","name__orig":"api_simulation_trajectory","Name":"ApiSimulationTrajectory","name_":"api_simulation_trajectory","name-":"api-simulation-trajectory","NAME":"API_SIMULATION_TRAJECTORY","index$":82}, {"active":true,"entity":"api_simulation_trajectory","key$":"BasicApiSimulationTrajectoryFlow","kind":"basic","name":"BasicApiSimulationTrajectoryFlow","param":{},"step":[{"a":false,"d":{},"i":{"ref":"api_simulation_trajectory_ref01","srcdatavar":"api_simulation_trajectory_ref01_data","suffix":"_dt0"},"m":{"id":"api_simulation_trajectory01","simulation_run_id":"simulation_run01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-api_simulation_trajectory_ref01"}}],"unreachable":true}]}, 'ApiSimulationTrajectory', {"GET /v2/gen-ai/simulation_runs/{run_uuid}/journeys/{journey_uuid}/trajectory":{"protocol":"http","parameters":[{"description":"UUID of the run the journey belongs to.","example":"\"123e4567-e89b-12d3-a456-426614174000\"","in":"path","name":"run_uuid","required":true,"schema":{"type":"string"},"index$":0},{"description":"UUID of the journey.","example":"\"123e4567-e89b-12d3-a456-426614174000\"","in":"path","name":"journey_uuid","required":true,"schema":{"type":"string"},"index$":1}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let api_simulation_trajectory_ref01_data = Object.values(setup.data.existing.api_simulation_trajectory)[0] as any

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
      '../../../../.sdk/test/entity/api_simulation_trajectory/ApiSimulationTrajectoryTestData.json')

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
    ['api_simulation_trajectory01','api_simulation_trajectory02','api_simulation_trajectory03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'DIGITALOCEAN_TEST_API_SIMULATION_TRAJECTORY_ENTID': idmap,
    'DIGITALOCEAN_TEST_LIVE': 'FALSE',
    'DIGITALOCEAN_TEST_EXPLAIN': 'FALSE',
    'DIGITALOCEAN_APIKEY': '',
  })

  idmap = env['DIGITALOCEAN_TEST_API_SIMULATION_TRAJECTORY_ENTID']

  const live = 'TRUE' === env.DIGITALOCEAN_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['DIGITALOCEAN_TEST_API_SIMULATION_TRAJECTORY_ENTID']
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
  
