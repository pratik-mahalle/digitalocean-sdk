

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


describe('ApiListEvaluationTestCasesByWorkspaceOutputEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when DIGITALOCEAN_TEST_LIVE=TRUE.
  afterEach(liveDelay('DIGITALOCEAN_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = DigitaloceanSDK.test()
    const ent = testsdk.ApiListEvaluationTestCasesByWorkspaceOutput()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = DigitaloceanSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.ApiListEvaluationTestCasesByWorkspaceOutput().list({"workspace_id":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.DIGITALOCEAN_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'api_list_evaluation_test_cases_by_workspace_output.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"archived_at":{"a":true,"fo":"date-time","h":"Archived At","n":"archived_at","r":false,"t":"`$STRING`","key$":"archived_at","index$":0},"created_at":{"a":true,"fo":"date-time","h":"Created At","n":"created_at","r":false,"t":"`$STRING`","key$":"created_at","index$":1},"created_by_user_email":{"a":true,"h":"Created By User Email","n":"created_by_user_email","r":false,"t":"`$STRING`","key$":"created_by_user_email","index$":2},"created_by_user_id":{"a":true,"fo":"uint64","h":"Created By User Id","n":"created_by_user_id","r":false,"t":"`$STRING`","key$":"created_by_user_id","index$":3},"dataset":{"a":true,"h":"Dataset","n":"dataset","r":false,"t":"`$OBJECT`","key$":"dataset","index$":4},"dataset_name":{"a":true,"h":"Dataset Name","n":"dataset_name","r":false,"t":"`$STRING`","key$":"dataset_name","index$":5},"dataset_uuid":{"a":true,"h":"Dataset Uuid","n":"dataset_uuid","r":false,"t":"`$STRING`","key$":"dataset_uuid","index$":6},"description":{"a":true,"h":"Description","n":"description","r":false,"t":"`$STRING`","key$":"description","index$":7},"latest_version_number_of_runs":{"a":true,"fo":"int32","h":"Latest Version Number Of Runs","n":"latest_version_number_of_runs","r":false,"t":"`$INTEGER`","key$":"latest_version_number_of_runs","index$":8},"metrics":{"a":true,"h":"Metrics","n":"metrics","r":false,"t":"`$ARRAY`","key$":"metrics","index$":9},"name":{"a":true,"h":"Name","n":"name","r":false,"t":"`$STRING`","key$":"name","index$":10},"star_metric":{"a":true,"h":"Star Metric","n":"star_metric","r":false,"t":"`$OBJECT`","key$":"star_metric","index$":11},"test_case_uuid":{"a":true,"h":"Test Case Uuid","n":"test_case_uuid","r":false,"t":"`$STRING`","key$":"test_case_uuid","index$":12},"total_runs":{"a":true,"fo":"int32","h":"Total Runs","n":"total_runs","r":false,"t":"`$INTEGER`","key$":"total_runs","index$":13},"updated_at":{"a":true,"fo":"date-time","h":"Updated At","n":"updated_at","r":false,"t":"`$STRING`","key$":"updated_at","index$":14},"updated_by_user_email":{"a":true,"h":"Updated By User Email","n":"updated_by_user_email","r":false,"t":"`$STRING`","key$":"updated_by_user_email","index$":15},"updated_by_user_id":{"a":true,"fo":"uint64","h":"Updated By User Id","n":"updated_by_user_id","r":false,"t":"`$STRING`","key$":"updated_by_user_id","index$":16},"version":{"a":true,"fo":"int64","h":"Version","n":"version","r":false,"t":"`$INTEGER`","key$":"version","index$":17}},"name":"api_list_evaluation_test_cases_by_workspace_output","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /v2/gen-ai/workspaces/{workspace_uuid}/evaluation_test_cases","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":"\"123e4567-e89b-12d3-a456-426614174000\"","k":"param","n":"workspace_id","or":"workspace_uuid","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/v2/gen-ai/workspaces/{workspace_uuid}/evaluation_test_cases","q":{"exist":["workspace_id"]},"r":{"param":{"workspace_uuid":"workspace_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v2"},{"lit":"gen-ai"},{"lit":"workspaces"},{"var":"workspace_id"},{"lit":"evaluation_test_cases"}],"t":{"req":"`reqdata`","res":"`body.evaluation_test_cases`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"api_list_evaluation_test_cases_by_workspace_output","name__orig":"api_list_evaluation_test_cases_by_workspace_output","Name":"ApiListEvaluationTestCasesByWorkspaceOutput","name_":"api_list_evaluation_test_cases_by_workspace_output","name-":"api-list-evaluation-test-cases-by-workspace-output","NAME":"API_LIST_EVALUATION_TEST_CASES_BY_WORKSPACE_OUTPUT","index$":66}, {"active":true,"entity":"api_list_evaluation_test_cases_by_workspace_output","key$":"BasicApiListEvaluationTestCasesByWorkspaceOutputFlow","kind":"basic","name":"BasicApiListEvaluationTestCasesByWorkspaceOutputFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{"workspace_id":"workspace01"},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"api_list_evaluation_test_cases_by_workspace_output_ref01"}}],"index$":0}]}, 'ApiListEvaluationTestCasesByWorkspaceOutput', {"GET /v2/gen-ai/workspaces/{workspace_uuid}/evaluation_test_cases":{"protocol":"http","parameters":[{"description":"Workspace UUID.","example":"\"123e4567-e89b-12d3-a456-426614174000\"","in":"path","name":"workspace_uuid","required":true,"schema":{"type":"string"},"index$":0}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let api_list_evaluation_test_cases_by_workspace_output_ref01_data = Object.values(setup.data.existing.api_list_evaluation_test_cases_by_workspace_output)[0] as any

    // LIST
    const api_list_evaluation_test_cases_by_workspace_output_ref01_ent = client.ApiListEvaluationTestCasesByWorkspaceOutput()
    const api_list_evaluation_test_cases_by_workspace_output_ref01_match: any = {}
    api_list_evaluation_test_cases_by_workspace_output_ref01_match['workspace_id'] = setup.idmap['workspace01']

    const api_list_evaluation_test_cases_by_workspace_output_ref01_list = (await api_list_evaluation_test_cases_by_workspace_output_ref01_ent.list(api_list_evaluation_test_cases_by_workspace_output_ref01_match)).map((e: any) => e.data())


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
      '../../../../.sdk/test/entity/api_list_evaluation_test_cases_by_workspace_output/ApiListEvaluationTestCasesByWorkspaceOutputTestData.json')

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
    ['api_list_evaluation_test_cases_by_workspace_output01','api_list_evaluation_test_cases_by_workspace_output02','api_list_evaluation_test_cases_by_workspace_output03','workspace01'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'DIGITALOCEAN_TEST_API_LIST_EVALUATION_TEST_CASES_BY_WORKSPACE_OUTPUT_ENTID': idmap,
    'DIGITALOCEAN_TEST_LIVE': 'FALSE',
    'DIGITALOCEAN_TEST_EXPLAIN': 'FALSE',
    'DIGITALOCEAN_APIKEY': '',
  })

  idmap = env['DIGITALOCEAN_TEST_API_LIST_EVALUATION_TEST_CASES_BY_WORKSPACE_OUTPUT_ENTID']

  const live = 'TRUE' === env.DIGITALOCEAN_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['DIGITALOCEAN_TEST_API_LIST_EVALUATION_TEST_CASES_BY_WORKSPACE_OUTPUT_ENTID']
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
  
