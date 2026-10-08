

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


describe('ApiGetSimulationJourneyTrajectoryUrlOutputEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when DIGITALOCEAN_TEST_LIVE=TRUE.
  afterEach(liveDelay('DIGITALOCEAN_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = DigitaloceanSDK.test()
    const ent = testsdk.ApiGetSimulationJourneyTrajectoryUrlOutput()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = DigitaloceanSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.ApiGetSimulationJourneyTrajectoryUrlOutput().load({"journey_id":1,"simulation_run_id":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.DIGITALOCEAN_TEST_LIVE
    for (const op of []) {
      if (!live && maybeSkipControl(t, 'entityOp', 'api_get_simulation_journey_trajectory_url_output.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"download_url":{"a":true,"h":"Download Url","n":"download_url","r":false,"sh":"The presigned URL to download the trajectory JSON file.","t":"`$STRING`","key$":"download_url","index$":0},"expires_at":{"a":true,"fo":"date-time","h":"Expires At","n":"expires_at","r":false,"sh":"The time the URL expires at.","t":"`$STRING`","key$":"expires_at","index$":1}},"name":"api_get_simulation_journey_trajectory_url_output","op":{"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /v2/gen-ai/simulation_runs/{run_uuid}/journeys/{journey_uuid}/trajectory_url","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":"\"123e4567-e89b-12d3-a456-426614174000\"","k":"param","n":"journey_id","or":"journey_uuid","r":true,"t":"`$STRING`","index$":0},{"a":true,"ex":"\"123e4567-e89b-12d3-a456-426614174000\"","k":"param","n":"simulation_run_id","or":"run_uuid","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"GET","o":"/v2/gen-ai/simulation_runs/{run_uuid}/journeys/{journey_uuid}/trajectory_url","q":{"exist":["journey_id","simulation_run_id"]},"r":{"param":{"journey_uuid":"journey_id","run_uuid":"simulation_run_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v2"},{"lit":"gen-ai"},{"lit":"simulation_runs"},{"var":"simulation_run_id"},{"lit":"journeys"},{"var":"journey_id"},{"lit":"trajectory_url"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"api_get_simulation_journey_trajectory_url_output","name__orig":"api_get_simulation_journey_trajectory_url_output","Name":"ApiGetSimulationJourneyTrajectoryUrlOutput","name_":"api_get_simulation_journey_trajectory_url_output","name-":"api-get-simulation-journey-trajectory-url-output","NAME":"API_GET_SIMULATION_JOURNEY_TRAJECTORY_URL_OUTPUT","index$":51}, {"active":true,"entity":"api_get_simulation_journey_trajectory_url_output","key$":"BasicApiGetSimulationJourneyTrajectoryUrlOutputFlow","kind":"basic","name":"BasicApiGetSimulationJourneyTrajectoryUrlOutputFlow","param":{},"step":[{"a":false,"d":{},"i":{"ref":"api_get_simulation_journey_trajectory_url_output_ref01","srcdatavar":"api_get_simulation_journey_trajectory_url_output_ref01_data","suffix":"_dt0"},"m":{"id":"api_get_simulation_journey_trajectory_url_output01","simulation_run_id":"simulation_run01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-api_get_simulation_journey_trajectory_url_output_ref01"}}],"unreachable":true}]}, 'ApiGetSimulationJourneyTrajectoryUrlOutput', {"GET /v2/gen-ai/simulation_runs/{run_uuid}/journeys/{journey_uuid}/trajectory_url":{"protocol":"http","parameters":[{"description":"UUID of the run the journey belongs to.","example":"\"123e4567-e89b-12d3-a456-426614174000\"","in":"path","name":"run_uuid","required":true,"schema":{"type":"string"},"index$":0},{"description":"UUID of the journey.","example":"\"123e4567-e89b-12d3-a456-426614174000\"","in":"path","name":"journey_uuid","required":true,"schema":{"type":"string"},"index$":1}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let api_get_simulation_journey_trajectory_url_output_ref01_data = Object.values(setup.data.existing.api_get_simulation_journey_trajectory_url_output)[0] as any

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
      '../../../../.sdk/test/entity/api_get_simulation_journey_trajectory_url_output/ApiGetSimulationJourneyTrajectoryUrlOutputTestData.json')

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
    ['api_get_simulation_journey_trajectory_url_output01','api_get_simulation_journey_trajectory_url_output02','api_get_simulation_journey_trajectory_url_output03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'DIGITALOCEAN_TEST_API_GET_SIMULATION_JOURNEY_TRAJECTORY_URL_OUTPUT_ENTID': idmap,
    'DIGITALOCEAN_TEST_LIVE': 'FALSE',
    'DIGITALOCEAN_TEST_EXPLAIN': 'FALSE',
    'DIGITALOCEAN_APIKEY': '',
  })

  idmap = env['DIGITALOCEAN_TEST_API_GET_SIMULATION_JOURNEY_TRAJECTORY_URL_OUTPUT_ENTID']

  const live = 'TRUE' === env.DIGITALOCEAN_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['DIGITALOCEAN_TEST_API_GET_SIMULATION_JOURNEY_TRAJECTORY_URL_OUTPUT_ENTID']
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
  
