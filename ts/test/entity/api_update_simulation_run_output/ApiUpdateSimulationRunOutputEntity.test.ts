

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


describe('ApiUpdateSimulationRunOutputEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when DIGITALOCEAN_TEST_LIVE=TRUE.
  afterEach(liveDelay('DIGITALOCEAN_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = DigitaloceanSDK.test()
    const ent = testsdk.ApiUpdateSimulationRunOutput()
    assert(null != ent)
  })


  class FailHook extends BaseFeature {
    name = 'failhook'
    version = '0.0.1'
    active = true
    unexpected = 0
    init() { }
    PreSpec() { throw new Error('api_update_simulation_run_output hook failed') }
    PreUnexpected() { this.unexpected++ }
  }

  test('stream-error', async () => {
    const offline = { net: { offline: true } }
    await assert.rejects(async () => {
      for await (const _item of DigitaloceanSDK.test(offline).ApiUpdateSimulationRunOutput().stream('list')) { }
    }, /offline/)

    for await (const _item of DigitaloceanSDK.test(offline).ApiUpdateSimulationRunOutput()
      .stream('list', undefined, { ctrl: { throw: false } })) { }

    if (null != (config as any).feature?.rbac) {
      const denied = DigitaloceanSDK.test(undefined, { feature: { rbac: { active: true, deny: true } } })
      await assert.rejects(async () => {
        for await (const _item of denied.ApiUpdateSimulationRunOutput().stream('list')) { }
      }, (err: any) => 'rbac_denied' === err.code)
    }
  })

  test('stream-ctrl', async () => {
    const explain: any = {}
    const ctrl: any = { explain }
    for await (const _item of DigitaloceanSDK.test().ApiUpdateSimulationRunOutput().stream('list', undefined, { ctrl })) { }
    assert.deepStrictEqual(Object.keys(ctrl), ['explain'])
    assert(explain === ctrl.explain && 0 < Object.keys(explain).length)
  })

  test('unexpected', async () => {
    const hook = new FailHook()
    const client = new DigitaloceanSDK({ feature: { test: { active: true } }, extend: [hook] })
    await assert.rejects(client.ApiUpdateSimulationRunOutput().list(), /hook failed/)
    assert(0 < hook.unexpected)

    const fired = hook.unexpected
    assert.strictEqual(await client.ApiUpdateSimulationRunOutput().list(undefined, { throw: false }), undefined)
    assert(fired < hook.unexpected)
  })

  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = DigitaloceanSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.ApiUpdateSimulationRunOutput().list({"page":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.DIGITALOCEAN_TEST_LIVE
    for (const op of ['create', 'list', 'update']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'api_update_simulation_run_output.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"agent_config":{"a":true,"h":"Agent Config","n":"agent_config","r":false,"sh":"Configuration of the candidate agent under test for a simulation run.","t":"`$OBJECT`","key$":"agent_config","index$":0},"created_at":{"a":true,"fo":"date-time","h":"Created At","n":"created_at","r":false,"sh":"Time created at.","t":"`$STRING`","key$":"created_at","index$":1},"created_by_user_email":{"a":true,"h":"Created By User Email","n":"created_by_user_email","r":false,"sh":"Email of the user who triggered this run.","t":"`$STRING`","key$":"created_by_user_email","index$":2},"created_by_user_id":{"a":true,"fo":"uint64","h":"Created By User Id","n":"created_by_user_id","r":false,"sh":"User id of the actor who triggered this run.","t":"`$STRING`","key$":"created_by_user_id","index$":3},"deleted_at":{"a":true,"fo":"date-time","h":"Deleted At","n":"deleted_at","r":false,"sh":"Time deleted at.","t":"`$STRING`","key$":"deleted_at","index$":4},"evaluation_config":{"a":true,"h":"Evaluation Config","n":"evaluation_config","r":false,"sh":"Optional configuration that opts a simulation run into an evaluation.","t":"`$OBJECT`","key$":"evaluation_config","index$":5},"evaluation_run_uuid":{"a":true,"h":"Evaluation Run Uuid","n":"evaluation_run_uuid","r":false,"sh":"UUID of the evaluation run reserved for this simulation, when the create request included evaluation_config.","t":"`$STRING`","key$":"evaluation_run_uuid","index$":6},"exploration_budget":{"a":true,"fo":"int64","h":"Exploration Budget","n":"exploration_budget","r":false,"sh":"Optional run-level journeys-per-scenario override.","t":"`$INTEGER`","key$":"exploration_budget","index$":7},"failure_reason":{"a":true,"h":"Failure Reason","n":"failure_reason","r":false,"sh":"Human-readable explanation of a terminal FAILED status.","t":"`$STRING`","key$":"failure_reason","index$":8},"journeys_finished":{"a":true,"fo":"int64","h":"Journeys Finished","n":"journeys_finished","r":false,"sh":"Number of journeys that have finished (successfully or not).","t":"`$INTEGER`","key$":"journeys_finished","index$":9},"judge_model_name":{"a":true,"h":"Judge Model Name","n":"judge_model_name","r":false,"sh":"Display name of the judge model (from the model catalog).","t":"`$STRING`","key$":"judge_model_name","index$":10},"judge_model_uuid":{"a":true,"h":"Judge Model Uuid","n":"judge_model_uuid","r":false,"sh":"Model used by the judge.","t":"`$STRING`","key$":"judge_model_uuid","index$":11},"max_turns":{"a":true,"fo":"int64","h":"Max Turns","n":"max_turns","r":false,"sh":"Optional run-level turn budget.","t":"`$INTEGER`","key$":"max_turns","index$":12},"name":{"a":true,"h":"Name","n":"name","r":false,"sh":"Optional run name.","t":"`$STRING`","key$":"name","index$":13},"result_summary":{"a":true,"h":"Result Summary","n":"result_summary","r":false,"sh":"Aggregated final result of a simulation run: verdict counts plus token and duration totals.","t":"`$OBJECT`","key$":"result_summary","index$":14},"run_uuid":{"a":true,"h":"Run Uuid","n":"run_uuid","r":false,"sh":"UUID of the run.","t":"`$STRING`","key$":"run_uuid","index$":15},"scenario_count":{"a":true,"fo":"int64","h":"Scenario Count","n":"scenario_count","r":false,"sh":"Number of scenarios in the scenario set for this run.","t":"`$INTEGER`","key$":"scenario_count","index$":16},"scenario_set_uuid":{"a":true,"h":"Scenario Set Uuid","n":"scenario_set_uuid","r":false,"sh":"UUID of the scenario set being executed (must exist at run create).","t":"`$STRING`","key$":"scenario_set_uuid","index$":17},"status":{"a":true,"h":"Status","n":"status","r":false,"sh":"Lifecycle status of a simulation run.","t":"`$STRING`","key$":"status","index$":18},"total_journeys":{"a":true,"fo":"int64","h":"Total Journeys","n":"total_journeys","r":false,"sh":"Total number of journeys (sum of exploration budgets).","t":"`$INTEGER`","key$":"total_journeys","index$":19},"updated_at":{"a":true,"fo":"date-time","h":"Updated At","n":"updated_at","r":false,"sh":"Time last updated at.","t":"`$STRING`","key$":"updated_at","index$":20},"user_simulator_config":{"a":true,"h":"User Simulator Config","n":"user_simulator_config","r":false,"sh":"Optional user simulator model settings such as temperature and max_tokens.","t":"`$OBJECT`","key$":"user_simulator_config","index$":21},"user_simulator_model_name":{"a":true,"h":"User Simulator Model Name","n":"user_simulator_model_name","r":false,"sh":"Display name of the user simulator model (from the model catalog).","t":"`$STRING`","key$":"user_simulator_model_name","index$":22},"user_simulator_model_uuid":{"a":true,"h":"User Simulator Model Uuid","n":"user_simulator_model_uuid","r":false,"sh":"Model used by the user simulator.","t":"`$STRING`","key$":"user_simulator_model_uuid","index$":23},"workflow_uuid":{"a":true,"h":"Workflow Uuid","n":"workflow_uuid","r":false,"sh":"Identifier of the workflow executing this run.","t":"`$STRING`","key$":"workflow_uuid","index$":24}},"name":"api_update_simulation_run_output","op":{"create":{"input":"data","name":"create","points":[{"a":true,"co":{"id":"POST /v2/gen-ai/simulation_runs","source":"openapi3","version":2},"g":{},"k":"http","m":"POST","o":"/v2/gen-ai/simulation_runs","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v2"},{"lit":"gen-ai"},{"lit":"simulation_runs"}],"t":{"req":"`reqdata`","res":"`body.simulation_run`"},"index$":0}],"key$":"create"},"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /v2/gen-ai/simulation_runs","source":"openapi3","version":2},"g":{"query":[{"a":true,"ex":1,"k":"query","n":"page","or":"page","r":false,"t":"`$INTEGER`","index$":0},{"a":true,"ex":1,"k":"query","n":"per_page","or":"per_page","r":false,"t":"`$INTEGER`","index$":1},{"a":true,"ex":"123e4567-e89b-12d3-a456-426614174000","k":"query","n":"scenario_set_uuid","or":"scenario_set_uuid","r":false,"t":"`$STRING`","index$":2},{"a":true,"ex":"example string","k":"query","n":"search","or":"search","r":false,"t":"`$STRING`","index$":3},{"a":true,"ex":"SIMULATION_RUN_SORT_FIELD_UNSPECIFIED","k":"query","n":"sort_by","or":"sort_by","r":false,"t":"`$STRING`","index$":4},{"a":true,"ex":"SORT_DIRECTION_UNSPECIFIED","k":"query","n":"sort_direction","or":"sort_direction","r":false,"t":"`$STRING`","index$":5},{"a":true,"ex":["SIMULATION_RUN_STATUS_RUNNING"],"k":"query","n":"status","or":"statuses","r":false,"t":"`$ARRAY`","index$":6}]},"k":"http","m":"GET","o":"/v2/gen-ai/simulation_runs","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v2"},{"lit":"gen-ai"},{"lit":"simulation_runs"}],"t":{"req":"`reqdata`","res":"`body.simulation_runs`"},"index$":0}],"key$":"list"},"update":{"input":"data","name":"update","points":[{"a":true,"co":{"id":"PUT /v2/gen-ai/simulation_runs/{run_uuid}","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":"\"123e4567-e89b-12d3-a456-426614174000\"","k":"param","n":"run_uuid","or":"run_uuid","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"PUT","o":"/v2/gen-ai/simulation_runs/{run_uuid}","q":{"exist":["run_uuid"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v2"},{"lit":"gen-ai"},{"lit":"simulation_runs"},{"var":"run_uuid"}],"t":{"req":"`reqdata`","res":"`body.simulation_run`"},"index$":0}],"key$":"update"}},"relations":{"ancestors":[]},"key$":"api_update_simulation_run_output","name__orig":"api_update_simulation_run_output","Name":"ApiUpdateSimulationRunOutput","name_":"api_update_simulation_run_output","name-":"api-update-simulation-run-output","NAME":"API_UPDATE_SIMULATION_RUN_OUTPUT","index$":99}, {"active":true,"entity":"api_update_simulation_run_output","key$":"BasicApiUpdateSimulationRunOutputFlow","kind":"basic","name":"BasicApiUpdateSimulationRunOutputFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"api_update_simulation_run_output_ref01"},"m":{},"o":"create","s":[],"v":[],"index$":0},{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"api_update_simulation_run_output_ref01"}}],"index$":1},{"a":true,"d":{},"i":{"ref":"api_update_simulation_run_output_ref01","srcdatavar":"api_update_simulation_run_output_ref01_data","suffix":"_up0","textfield":"created_at"},"m":{},"o":"update","s":[{"apply":"TextFieldMark","def":{"mark":"Mark01-api_update_simulation_run_output_ref01"}}],"v":[],"index$":2}]}, 'ApiUpdateSimulationRunOutput', {"POST /v2/gen-ai/simulation_runs":{"protocol":"http","requestBody":{"content":{"application/json":{"schema":{"description":"Public parameters for creating a simulation run.","properties":{"agent_config":{"description":"Configuration of the candidate agent under test for a simulation run.","properties":{"agent_deployment_uuid":{"description":"Optional agent deployment to run. Defaults to the agent's current deployment when unset.","example":"123e4567-e89b-12d3-a456-426614174000","type":"string"},"agent_uuid":{"description":"UUID of the agent to exercise as the candidate.","example":"123e4567-e89b-12d3-a456-426614174000","type":"string"},"name":{"description":"Display name of the candidate agent. Persisted with the run.","example":"example name","type":"string"}},"type":"object","x-ref":"#/components/schemas/apiCandidateAgentConfig","key$":"agent_config"},"evaluation_config":{"description":"Optional configuration that opts a simulation run into an evaluation. When\nincluded on the create-run request, the platform reserves a\nmodel_evaluation_run linked to this simulation run and dispatches the\nevaluation automatically after the simulation finishes. The evaluation\nreuses the simulation run's judge_model_uuid.","properties":{"metric_uuids":{"description":"Evaluation metric UUIDs (from the evaluation metrics catalog). Must be\nsimulation-eligible (multi-turn) metrics; the create request is rejected\nif any UUID is unknown or ineligible.","example":["example string"],"items":{"example":"example string","type":"string"},"type":"array"},"star_metric":{"properties":{"metric_uuid":{},"name":{},"success_threshold":{},"success_threshold_pct":{}},"type":"object","x-ref":"#/components/schemas/apiStarMetric"}},"type":"object","x-ref":"#/components/schemas/apiSimulationEvaluationConfig","key$":"evaluation_config"},"exploration_budget":{"description":"Optional run-level journeys-per-scenario override. When set, overrides each scenario's exploration_budget.","example":123,"format":"int64","type":"integer","key$":"exploration_budget"},"judge_model_uuid":{"description":"Optional model override for the judge. Platform default when unset.","example":"123e4567-e89b-12d3-a456-426614174000","type":"string","key$":"judge_model_uuid"},"max_turns":{"description":"Optional run-level turn budget. When set, overrides each scenario's max_turns.","example":123,"format":"int64","type":"integer","key$":"max_turns"},"name":{"description":"Optional run name.","example":"example name","type":"string","key$":"name"},"scenario_set_uuid":{"description":"UUID of the existing scenario set to execute. The set must be ready.","example":"123e4567-e89b-12d3-a456-426614174000","type":"string","key$":"scenario_set_uuid"},"user_simulator_config":{"description":"Optional user simulator model settings such as temperature and max_tokens.","type":"object","key$":"user_simulator_config"},"user_simulator_model_uuid":{"description":"Optional model override for the user simulator. Platform default when unset.","example":"123e4567-e89b-12d3-a456-426614174000","type":"string","key$":"user_simulator_model_uuid"}},"type":"object","x-ref":"#/components/schemas/apiCreateSimulationRunInputPublic","index$":1}}}},"parameters":[]},"GET /v2/gen-ai/simulation_runs":{"protocol":"http","parameters":[{"description":"Optional filter by scenario set.","example":"123e4567-e89b-12d3-a456-426614174000","in":"query","name":"scenario_set_uuid","schema":{"type":"string"},"index$":0},{"description":"Page number.","example":1,"in":"query","name":"page","schema":{"type":"integer"},"index$":1},{"description":"Items per page.","example":1,"in":"query","name":"per_page","schema":{"type":"integer"},"index$":2},{"description":"Filter by one or more statuses. Empty means no status filter.\n\n - SIMULATION_RUN_STATUS_PENDING: Accepted and queued, not yet executing.\n - SIMULATION_RUN_STATUS_RUNNING: Journeys are executing.\n - SIMULATION_RUN_STATUS_SUCCEEDED: All journeys finished successfully.\n - SIMULATION_RUN_STATUS_FAILED: The run failed, for example because of a timeout or workflow error.\n - SIMULATION_RUN_STATUS_CANCELLED: The run was cancelled.\n - SIMULATION_RUN_STATUS_EVALUATING: Journeys finished and an attached evaluation is running. Only reachable\nwhen the create request included evaluation_config. When the evaluation\nreaches a terminal status, its outcome is reflected in the simulation run\nstatus.\n - SIMULATION_RUN_STATUS_PARTIALLY_SUCCESSFUL: The simulation or its attached evaluation completed with a mixture of\nsuccessful and failed results.","example":["SIMULATION_RUN_STATUS_RUNNING"],"in":"query","name":"statuses","schema":{"items":{"enum":["SIMULATION_RUN_STATUS_UNSPECIFIED","SIMULATION_RUN_STATUS_PENDING","SIMULATION_RUN_STATUS_RUNNING","SIMULATION_RUN_STATUS_SUCCEEDED","SIMULATION_RUN_STATUS_FAILED","SIMULATION_RUN_STATUS_CANCELLED","SIMULATION_RUN_STATUS_EVALUATING","SIMULATION_RUN_STATUS_PARTIALLY_SUCCESSFUL"],"type":"string"},"type":"array"},"index$":3},{"description":"Free-text search across the run name and scenario set name\n(case-insensitive substring match). Empty means no search.","example":"example string","in":"query","name":"search","schema":{"type":"string"},"index$":4},{"description":"Field to sort by. Defaults to creation date when unspecified.\n\n - SIMULATION_RUN_SORT_FIELD_CREATED_AT: Sort by creation date. Default.\n - SIMULATION_RUN_SORT_FIELD_NAME: Sort by customer-supplied run name (case-insensitive).\n - SIMULATION_RUN_SORT_FIELD_STATUS: Sort by status using lifecycle order (pending → running → terminal).\n - SIMULATION_RUN_SORT_FIELD_UPDATED_AT: Sort by last update date.","example":"SIMULATION_RUN_SORT_FIELD_UNSPECIFIED","in":"query","name":"sort_by","schema":{"default":"SIMULATION_RUN_SORT_FIELD_UNSPECIFIED","enum":["SIMULATION_RUN_SORT_FIELD_UNSPECIFIED","SIMULATION_RUN_SORT_FIELD_CREATED_AT","SIMULATION_RUN_SORT_FIELD_NAME","SIMULATION_RUN_SORT_FIELD_STATUS","SIMULATION_RUN_SORT_FIELD_UPDATED_AT"],"type":"string"},"index$":5},{"description":"Sort direction. Defaults to descending when unspecified.","example":"SORT_DIRECTION_UNSPECIFIED","in":"query","name":"sort_direction","schema":{"default":"SORT_DIRECTION_UNSPECIFIED","enum":["SORT_DIRECTION_UNSPECIFIED","SORT_DIRECTION_ASC","SORT_DIRECTION_DESC"],"type":"string"},"index$":6}]},"PUT /v2/gen-ai/simulation_runs/{run_uuid}":{"protocol":"http","requestBody":{"content":{"application/json":{"schema":{"description":"Public parameters for updating a simulation run.","properties":{"name":{"description":"The new name of the run.","example":"example name","type":"string","key$":"name"},"run_uuid":{"description":"UUID of the run to update.","example":"123e4567-e89b-12d3-a456-426614174000","type":"string","key$":"run_uuid"}},"type":"object","x-ref":"#/components/schemas/apiUpdateSimulationRunInputPublic","index$":1}}}},"parameters":[{"description":"UUID of the simulation run to update. Returned by `CreateSimulationRun`\nand listed via `ListSimulationRuns`.","example":"\"123e4567-e89b-12d3-a456-426614174000\"","in":"path","name":"run_uuid","required":true,"schema":{"type":"string"},"index$":0}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const api_update_simulation_run_output_ref01_ent = client.ApiUpdateSimulationRunOutput()
    let api_update_simulation_run_output_ref01_data = setup.data.new.api_update_simulation_run_output['api_update_simulation_run_output_ref01']

    api_update_simulation_run_output_ref01_data = (await api_update_simulation_run_output_ref01_ent.create(api_update_simulation_run_output_ref01_data)).data()
    assert(null != api_update_simulation_run_output_ref01_data)


    // LIST
    const api_update_simulation_run_output_ref01_match: any = {}

    const api_update_simulation_run_output_ref01_list = (await api_update_simulation_run_output_ref01_ent.list(api_update_simulation_run_output_ref01_match)).map((e: any) => e.data())


    // UPDATE
    const api_update_simulation_run_output_ref01_data_up0: any = {}

    const api_update_simulation_run_output_ref01_markdef_up0 = { name: 'created_at', value: 'Mark01-api_update_simulation_run_output_ref01_' + setup.now }
    ;(api_update_simulation_run_output_ref01_data_up0 as any)[api_update_simulation_run_output_ref01_markdef_up0.name] = api_update_simulation_run_output_ref01_markdef_up0.value

    const api_update_simulation_run_output_ref01_resdata_up0 = (await api_update_simulation_run_output_ref01_ent.update(api_update_simulation_run_output_ref01_data_up0)).data()
    assert(null != api_update_simulation_run_output_ref01_resdata_up0)

    assert((api_update_simulation_run_output_ref01_resdata_up0 as any)[api_update_simulation_run_output_ref01_markdef_up0.name] === api_update_simulation_run_output_ref01_markdef_up0.value)


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
      '../../../../.sdk/test/entity/api_update_simulation_run_output/ApiUpdateSimulationRunOutputTestData.json')

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
    ['api_update_simulation_run_output01','api_update_simulation_run_output02','api_update_simulation_run_output03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'DIGITALOCEAN_TEST_API_UPDATE_SIMULATION_RUN_OUTPUT_ENTID': idmap,
    'DIGITALOCEAN_TEST_LIVE': 'FALSE',
    'DIGITALOCEAN_TEST_EXPLAIN': 'FALSE',
    'DIGITALOCEAN_APIKEY': '',
  })

  idmap = env['DIGITALOCEAN_TEST_API_UPDATE_SIMULATION_RUN_OUTPUT_ENTID']

  const live = 'TRUE' === env.DIGITALOCEAN_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['DIGITALOCEAN_TEST_API_UPDATE_SIMULATION_RUN_OUTPUT_ENTID']
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
  
