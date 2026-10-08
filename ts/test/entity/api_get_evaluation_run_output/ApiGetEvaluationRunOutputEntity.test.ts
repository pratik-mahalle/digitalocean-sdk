

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


describe('ApiGetEvaluationRunOutputEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when DIGITALOCEAN_TEST_LIVE=TRUE.
  afterEach(liveDelay('DIGITALOCEAN_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = DigitaloceanSDK.test()
    const ent = testsdk.ApiGetEvaluationRunOutput()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = DigitaloceanSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.ApiGetEvaluationRunOutput().load({"evaluation_run_uuid":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.DIGITALOCEAN_TEST_LIVE
    for (const op of ['create', 'load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'api_get_evaluation_run_output.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"agent_deleted":{"a":true,"h":"Agent Deleted","n":"agent_deleted","r":false,"sh":"Whether agent is deleted","t":"`$BOOLEAN`","key$":"agent_deleted","index$":0},"agent_deployment_name":{"a":true,"h":"Agent Deployment Name","n":"agent_deployment_name","r":false,"sh":"The agent deployment name","t":"`$STRING`","key$":"agent_deployment_name","index$":1},"agent_deployment_names":{"a":true,"h":"Agent Deployment Names","n":"agent_deployment_names","r":false,"sh":"Agent deployment names to run the test case against.","t":"`$ARRAY`","key$":"agent_deployment_names","index$":2},"agent_name":{"a":true,"h":"Agent Name","n":"agent_name","r":false,"sh":"Agent name","t":"`$STRING`","key$":"agent_name","index$":3},"agent_uuid":{"a":true,"h":"Agent Uuid","n":"agent_uuid","r":false,"sh":"Agent UUID.","t":"`$STRING`","key$":"agent_uuid","index$":4},"agent_uuids":{"a":true,"h":"Agent Uuids","n":"agent_uuids","r":false,"sh":"Agent UUIDs to run the test case against (legacy agents).","t":"`$ARRAY`","key$":"agent_uuids","index$":5},"agent_version_hash":{"a":true,"h":"Agent Version Hash","n":"agent_version_hash","r":false,"sh":"Version hash","t":"`$STRING`","key$":"agent_version_hash","index$":6},"agent_workspace_uuid":{"a":true,"h":"Agent Workspace Uuid","n":"agent_workspace_uuid","r":false,"sh":"Agent workspace uuid","t":"`$STRING`","key$":"agent_workspace_uuid","index$":7},"created_by_user_email":{"a":true,"h":"Created By User Email","n":"created_by_user_email","r":false,"t":"`$STRING`","key$":"created_by_user_email","index$":8},"created_by_user_id":{"a":true,"fo":"uint64","h":"Created By User Id","n":"created_by_user_id","r":false,"t":"`$STRING`","key$":"created_by_user_id","index$":9},"error_description":{"a":true,"h":"Error Description","n":"error_description","r":false,"sh":"The error description","t":"`$STRING`","key$":"error_description","index$":10},"evaluation_run_uuid":{"a":true,"h":"Evaluation Run Uuid","n":"evaluation_run_uuid","r":false,"sh":"Evaluation run UUID.","t":"`$STRING`","key$":"evaluation_run_uuid","index$":11},"evaluation_run_uuids":{"a":true,"h":"Evaluation Run Uuids","n":"evaluation_run_uuids","r":false,"t":"`$ARRAY`","key$":"evaluation_run_uuids","index$":12},"evaluation_test_case_workspace_uuid":{"a":true,"h":"Evaluation Test Case Workspace Uuid","n":"evaluation_test_case_workspace_uuid","r":false,"sh":"Evaluation test case workspace uuid","t":"`$STRING`","key$":"evaluation_test_case_workspace_uuid","index$":13},"finished_at":{"a":true,"fo":"date-time","h":"Finished At","n":"finished_at","r":false,"sh":"Run end time.","t":"`$STRING`","key$":"finished_at","index$":14},"pass_status":{"a":true,"h":"Pass Status","n":"pass_status","r":false,"sh":"The pass status of the evaluation run based on the star metric.","t":"`$BOOLEAN`","key$":"pass_status","index$":15},"queued_at":{"a":true,"fo":"date-time","h":"Queued At","n":"queued_at","r":false,"sh":"Run queued time.","t":"`$STRING`","key$":"queued_at","index$":16},"run_level_metric_results":{"a":true,"h":"Run Level Metric Results","n":"run_level_metric_results","r":false,"t":"`$ARRAY`","key$":"run_level_metric_results","index$":17},"run_name":{"a":true,"h":"Run Name","n":"run_name","r":false,"sh":"Run name.","t":"`$STRING`","key$":"run_name","index$":18},"star_metric_result":{"a":true,"h":"Star Metric Result","n":"star_metric_result","r":false,"t":"`$OBJECT`","key$":"star_metric_result","index$":19},"started_at":{"a":true,"fo":"date-time","h":"Started At","n":"started_at","r":false,"sh":"Run start time.","t":"`$STRING`","key$":"started_at","index$":20},"status":{"a":true,"h":"Status","n":"status","r":false,"sh":"Evaluation Run Statuses","t":"`$STRING`","key$":"status","index$":21},"test_case_description":{"a":true,"h":"Test Case Description","n":"test_case_description","r":false,"sh":"Test case description.","t":"`$STRING`","key$":"test_case_description","index$":22},"test_case_name":{"a":true,"h":"Test Case Name","n":"test_case_name","r":false,"sh":"Test case name.","t":"`$STRING`","key$":"test_case_name","index$":23},"test_case_uuid":{"a":true,"h":"Test Case Uuid","n":"test_case_uuid","r":false,"sh":"Test-case UUID.","t":"`$STRING`","key$":"test_case_uuid","index$":24},"test_case_version":{"a":true,"fo":"int64","h":"Test Case Version","n":"test_case_version","r":false,"sh":"Test-case-version.","t":"`$INTEGER`","key$":"test_case_version","index$":25}},"name":"api_get_evaluation_run_output","op":{"create":{"input":"data","name":"create","points":[{"a":true,"co":{"id":"POST /v2/gen-ai/evaluation_runs","source":"openapi3","version":2},"g":{},"k":"http","m":"POST","o":"/v2/gen-ai/evaluation_runs","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v2"},{"lit":"gen-ai"},{"lit":"evaluation_runs"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /v2/gen-ai/evaluation_runs/{evaluation_run_uuid}","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":"\"123e4567-e89b-12d3-a456-426614174000\"","k":"param","n":"evaluation_run_uuid","or":"evaluation_run_uuid","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/v2/gen-ai/evaluation_runs/{evaluation_run_uuid}","q":{"exist":["evaluation_run_uuid"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v2"},{"lit":"gen-ai"},{"lit":"evaluation_runs"},{"var":"evaluation_run_uuid"}],"t":{"req":"`reqdata`","res":"`body.evaluation_run`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"api_get_evaluation_run_output","name__orig":"api_get_evaluation_run_output","Name":"ApiGetEvaluationRunOutput","name_":"api_get_evaluation_run_output","name-":"api-get-evaluation-run-output","NAME":"API_GET_EVALUATION_RUN_OUTPUT","index$":38}, {"active":true,"entity":"api_get_evaluation_run_output","key$":"BasicApiGetEvaluationRunOutputFlow","kind":"basic","name":"BasicApiGetEvaluationRunOutputFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"api_get_evaluation_run_output_ref01"},"m":{},"o":"create","s":[],"v":[],"index$":0},{"a":true,"d":{},"i":{"ref":"api_get_evaluation_run_output_ref01","srcdatavar":"api_get_evaluation_run_output_ref01_data","suffix":"_dt0"},"m":{"id":"api_get_evaluation_run_output01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-api_get_evaluation_run_output_ref01"}}],"index$":1}]}, 'ApiGetEvaluationRunOutput', {"POST /v2/gen-ai/evaluation_runs":{"protocol":"http","requestBody":{"content":{"application/json":{"schema":{"description":"Run an evaluation test case.","properties":{"agent_deployment_names":{"description":"Agent deployment names to run the test case against.","example":["example string"],"items":{"example":"example string","type":"string"},"type":"array","key$":"agent_deployment_names"},"agent_uuids":{"description":"Agent UUIDs to run the test case against (legacy agents).","example":["example string"],"items":{"example":"example string","type":"string"},"type":"array","key$":"agent_uuids"},"run_name":{"description":"The name of the run.","example":"Evaluation Run Name","type":"string","key$":"run_name"},"test_case_uuid":{"description":"Test-case UUID to run","example":"\"12345678-1234-1234-1234-123456789012\"","type":"string","key$":"test_case_uuid"}},"type":"object","x-ref":"#/components/schemas/apiRunEvaluationTestCaseInputPublic","index$":1}}}},"parameters":[]},"GET /v2/gen-ai/evaluation_runs/{evaluation_run_uuid}":{"protocol":"http","parameters":[{"description":"Evaluation run UUID.","example":"\"123e4567-e89b-12d3-a456-426614174000\"","in":"path","name":"evaluation_run_uuid","required":true,"schema":{"type":"string"},"index$":0}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const api_get_evaluation_run_output_ref01_ent = client.ApiGetEvaluationRunOutput()
    let api_get_evaluation_run_output_ref01_data = setup.data.new.api_get_evaluation_run_output['api_get_evaluation_run_output_ref01']

    api_get_evaluation_run_output_ref01_data = (await api_get_evaluation_run_output_ref01_ent.create(api_get_evaluation_run_output_ref01_data)).data()
    assert(null != api_get_evaluation_run_output_ref01_data)



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
      '../../../../.sdk/test/entity/api_get_evaluation_run_output/ApiGetEvaluationRunOutputTestData.json')

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
    ['api_get_evaluation_run_output01','api_get_evaluation_run_output02','api_get_evaluation_run_output03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'DIGITALOCEAN_TEST_API_GET_EVALUATION_RUN_OUTPUT_ENTID': idmap,
    'DIGITALOCEAN_TEST_LIVE': 'FALSE',
    'DIGITALOCEAN_TEST_EXPLAIN': 'FALSE',
    'DIGITALOCEAN_APIKEY': '',
  })

  idmap = env['DIGITALOCEAN_TEST_API_GET_EVALUATION_RUN_OUTPUT_ENTID']

  const live = 'TRUE' === env.DIGITALOCEAN_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['DIGITALOCEAN_TEST_API_GET_EVALUATION_RUN_OUTPUT_ENTID']
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
  
