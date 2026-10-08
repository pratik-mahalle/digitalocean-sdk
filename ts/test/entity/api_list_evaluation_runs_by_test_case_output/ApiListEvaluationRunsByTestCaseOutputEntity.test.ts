

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


describe('ApiListEvaluationRunsByTestCaseOutputEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when DIGITALOCEAN_TEST_LIVE=TRUE.
  afterEach(liveDelay('DIGITALOCEAN_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = DigitaloceanSDK.test()
    const ent = testsdk.ApiListEvaluationRunsByTestCaseOutput()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = DigitaloceanSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.ApiListEvaluationRunsByTestCaseOutput().list({"evaluation_test_case_id":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.DIGITALOCEAN_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'api_list_evaluation_runs_by_test_case_output.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"agent_deleted":{"a":true,"h":"Agent Deleted","n":"agent_deleted","r":false,"sh":"Whether agent is deleted","t":"`$BOOLEAN`","key$":"agent_deleted","index$":0},"agent_deployment_name":{"a":true,"h":"Agent Deployment Name","n":"agent_deployment_name","r":false,"sh":"The agent deployment name","t":"`$STRING`","key$":"agent_deployment_name","index$":1},"agent_name":{"a":true,"h":"Agent Name","n":"agent_name","r":false,"sh":"Agent name","t":"`$STRING`","key$":"agent_name","index$":2},"agent_uuid":{"a":true,"h":"Agent Uuid","n":"agent_uuid","r":false,"sh":"Agent UUID.","t":"`$STRING`","key$":"agent_uuid","index$":3},"agent_version_hash":{"a":true,"h":"Agent Version Hash","n":"agent_version_hash","r":false,"sh":"Version hash","t":"`$STRING`","key$":"agent_version_hash","index$":4},"agent_workspace_uuid":{"a":true,"h":"Agent Workspace Uuid","n":"agent_workspace_uuid","r":false,"sh":"Agent workspace uuid","t":"`$STRING`","key$":"agent_workspace_uuid","index$":5},"created_by_user_email":{"a":true,"h":"Created By User Email","n":"created_by_user_email","r":false,"t":"`$STRING`","key$":"created_by_user_email","index$":6},"created_by_user_id":{"a":true,"fo":"uint64","h":"Created By User Id","n":"created_by_user_id","r":false,"t":"`$STRING`","key$":"created_by_user_id","index$":7},"error_description":{"a":true,"h":"Error Description","n":"error_description","r":false,"sh":"The error description","t":"`$STRING`","key$":"error_description","index$":8},"evaluation_run_uuid":{"a":true,"h":"Evaluation Run Uuid","n":"evaluation_run_uuid","r":false,"sh":"Evaluation run UUID.","t":"`$STRING`","key$":"evaluation_run_uuid","index$":9},"evaluation_test_case_workspace_uuid":{"a":true,"h":"Evaluation Test Case Workspace Uuid","n":"evaluation_test_case_workspace_uuid","r":false,"sh":"Evaluation test case workspace uuid","t":"`$STRING`","key$":"evaluation_test_case_workspace_uuid","index$":10},"finished_at":{"a":true,"fo":"date-time","h":"Finished At","n":"finished_at","r":false,"sh":"Run end time.","t":"`$STRING`","key$":"finished_at","index$":11},"pass_status":{"a":true,"h":"Pass Status","n":"pass_status","r":false,"sh":"The pass status of the evaluation run based on the star metric.","t":"`$BOOLEAN`","key$":"pass_status","index$":12},"queued_at":{"a":true,"fo":"date-time","h":"Queued At","n":"queued_at","r":false,"sh":"Run queued time.","t":"`$STRING`","key$":"queued_at","index$":13},"run_level_metric_results":{"a":true,"h":"Run Level Metric Results","n":"run_level_metric_results","r":false,"t":"`$ARRAY`","key$":"run_level_metric_results","index$":14},"run_name":{"a":true,"h":"Run Name","n":"run_name","r":false,"sh":"Run name.","t":"`$STRING`","key$":"run_name","index$":15},"star_metric_result":{"a":true,"h":"Star Metric Result","n":"star_metric_result","r":false,"t":"`$OBJECT`","key$":"star_metric_result","index$":16},"started_at":{"a":true,"fo":"date-time","h":"Started At","n":"started_at","r":false,"sh":"Run start time.","t":"`$STRING`","key$":"started_at","index$":17},"status":{"a":true,"h":"Status","n":"status","r":false,"sh":"Evaluation Run Statuses","t":"`$STRING`","key$":"status","index$":18},"test_case_description":{"a":true,"h":"Test Case Description","n":"test_case_description","r":false,"sh":"Test case description.","t":"`$STRING`","key$":"test_case_description","index$":19},"test_case_name":{"a":true,"h":"Test Case Name","n":"test_case_name","r":false,"sh":"Test case name.","t":"`$STRING`","key$":"test_case_name","index$":20},"test_case_uuid":{"a":true,"h":"Test Case Uuid","n":"test_case_uuid","r":false,"sh":"Test-case UUID.","t":"`$STRING`","key$":"test_case_uuid","index$":21},"test_case_version":{"a":true,"fo":"int64","h":"Test Case Version","n":"test_case_version","r":false,"sh":"Test-case-version.","t":"`$INTEGER`","key$":"test_case_version","index$":22}},"name":"api_list_evaluation_runs_by_test_case_output","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /v2/gen-ai/evaluation_test_cases/{evaluation_test_case_uuid}/evaluation_runs","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":"\"123e4567-e89b-12d3-a456-426614174000\"","k":"param","n":"evaluation_test_case_id","or":"evaluation_test_case_uuid","r":true,"t":"`$STRING`","index$":0}],"query":[{"a":true,"ex":1,"k":"query","n":"evaluation_test_case_version","or":"evaluation_test_case_version","r":false,"t":"`$INTEGER`","index$":0}]},"k":"http","m":"GET","o":"/v2/gen-ai/evaluation_test_cases/{evaluation_test_case_uuid}/evaluation_runs","q":{"exist":["evaluation_test_case_id"]},"r":{"param":{"evaluation_test_case_uuid":"evaluation_test_case_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v2"},{"lit":"gen-ai"},{"lit":"evaluation_test_cases"},{"var":"evaluation_test_case_id"},{"lit":"evaluation_runs"}],"t":{"req":"`reqdata`","res":"`body.evaluation_runs`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"api_list_evaluation_runs_by_test_case_output","name__orig":"api_list_evaluation_runs_by_test_case_output","Name":"ApiListEvaluationRunsByTestCaseOutput","name_":"api_list_evaluation_runs_by_test_case_output","name-":"api-list-evaluation-runs-by-test-case-output","NAME":"API_LIST_EVALUATION_RUNS_BY_TEST_CASE_OUTPUT","index$":65}, {"active":true,"entity":"api_list_evaluation_runs_by_test_case_output","key$":"BasicApiListEvaluationRunsByTestCaseOutputFlow","kind":"basic","name":"BasicApiListEvaluationRunsByTestCaseOutputFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{"evaluation_test_case_id":"evaluation_test_case01"},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"api_list_evaluation_runs_by_test_case_output_ref01"}}],"index$":0}]}, 'ApiListEvaluationRunsByTestCaseOutput', {"GET /v2/gen-ai/evaluation_test_cases/{evaluation_test_case_uuid}/evaluation_runs":{"protocol":"http","parameters":[{"description":"Evaluation run UUID.","example":"\"123e4567-e89b-12d3-a456-426614174000\"","in":"path","name":"evaluation_test_case_uuid","required":true,"schema":{"type":"string"},"index$":0},{"description":"Version of the test case.","example":1,"in":"query","name":"evaluation_test_case_version","schema":{"type":"integer"},"index$":1}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let api_list_evaluation_runs_by_test_case_output_ref01_data = Object.values(setup.data.existing.api_list_evaluation_runs_by_test_case_output)[0] as any

    // LIST
    const api_list_evaluation_runs_by_test_case_output_ref01_ent = client.ApiListEvaluationRunsByTestCaseOutput()
    const api_list_evaluation_runs_by_test_case_output_ref01_match: any = {}
    api_list_evaluation_runs_by_test_case_output_ref01_match['evaluation_test_case_id'] = setup.idmap['evaluation_test_case01']

    const api_list_evaluation_runs_by_test_case_output_ref01_list = (await api_list_evaluation_runs_by_test_case_output_ref01_ent.list(api_list_evaluation_runs_by_test_case_output_ref01_match)).map((e: any) => e.data())


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
      '../../../../.sdk/test/entity/api_list_evaluation_runs_by_test_case_output/ApiListEvaluationRunsByTestCaseOutputTestData.json')

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
    ['api_list_evaluation_runs_by_test_case_output01','api_list_evaluation_runs_by_test_case_output02','api_list_evaluation_runs_by_test_case_output03','evaluation_test_case01'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'DIGITALOCEAN_TEST_API_LIST_EVALUATION_RUNS_BY_TEST_CASE_OUTPUT_ENTID': idmap,
    'DIGITALOCEAN_TEST_LIVE': 'FALSE',
    'DIGITALOCEAN_TEST_EXPLAIN': 'FALSE',
    'DIGITALOCEAN_APIKEY': '',
  })

  idmap = env['DIGITALOCEAN_TEST_API_LIST_EVALUATION_RUNS_BY_TEST_CASE_OUTPUT_ENTID']

  const live = 'TRUE' === env.DIGITALOCEAN_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['DIGITALOCEAN_TEST_API_LIST_EVALUATION_RUNS_BY_TEST_CASE_OUTPUT_ENTID']
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
  
