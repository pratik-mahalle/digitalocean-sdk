

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


describe('ApiGetEvaluationTestCaseOutputEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when DIGITALOCEAN_TEST_LIVE=TRUE.
  afterEach(liveDelay('DIGITALOCEAN_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = DigitaloceanSDK.test()
    const ent = testsdk.ApiGetEvaluationTestCaseOutput()
    assert(null != ent)
  })


  class FailHook extends BaseFeature {
    name = 'failhook'
    version = '0.0.1'
    active = true
    unexpected = 0
    init() { }
    PreSpec() { throw new Error('api_get_evaluation_test_case_output hook failed') }
    PreUnexpected() { this.unexpected++ }
  }

  test('stream-error', async () => {
    const offline = { net: { offline: true } }
    await assert.rejects(async () => {
      for await (const _item of DigitaloceanSDK.test(offline).ApiGetEvaluationTestCaseOutput().stream('list')) { }
    }, /offline/)

    for await (const _item of DigitaloceanSDK.test(offline).ApiGetEvaluationTestCaseOutput()
      .stream('list', undefined, { ctrl: { throw: false } })) { }

    if (null != (config as any).feature?.rbac) {
      const denied = DigitaloceanSDK.test(undefined, { feature: { rbac: { active: true, deny: true } } })
      await assert.rejects(async () => {
        for await (const _item of denied.ApiGetEvaluationTestCaseOutput().stream('list')) { }
      }, (err: any) => 'rbac_denied' === err.code)
    }
  })

  test('stream-ctrl', async () => {
    const explain: any = {}
    const ctrl: any = { explain }
    for await (const _item of DigitaloceanSDK.test().ApiGetEvaluationTestCaseOutput().stream('list', undefined, { ctrl })) { }
    assert.deepStrictEqual(Object.keys(ctrl), ['explain'])
    assert(explain === ctrl.explain && 0 < Object.keys(explain).length)
  })

  test('unexpected', async () => {
    const hook = new FailHook()
    const client = new DigitaloceanSDK({ feature: { test: { active: true } }, extend: [hook] })
    await assert.rejects(client.ApiGetEvaluationTestCaseOutput().list(), /hook failed/)
    assert(0 < hook.unexpected)

    const fired = hook.unexpected
    assert.strictEqual(await client.ApiGetEvaluationTestCaseOutput().list(undefined, { throw: false }), undefined)
    assert(fired < hook.unexpected)
  })

  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = DigitaloceanSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.ApiGetEvaluationTestCaseOutput().list({"agent_workspace_name":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.DIGITALOCEAN_TEST_LIVE
    for (const op of ['create', 'list', 'load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'api_get_evaluation_test_case_output.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"agent_workspace_name":{"a":true,"h":"Agent Workspace Name","n":"agent_workspace_name","r":false,"t":"`$STRING`","key$":"agent_workspace_name","index$":0},"archived_at":{"a":true,"fo":"date-time","h":"Archived At","n":"archived_at","r":false,"t":"`$STRING`","key$":"archived_at","index$":1},"created_at":{"a":true,"fo":"date-time","h":"Created At","n":"created_at","r":false,"t":"`$STRING`","key$":"created_at","index$":2},"created_by_user_email":{"a":true,"h":"Created By User Email","n":"created_by_user_email","r":false,"t":"`$STRING`","key$":"created_by_user_email","index$":3},"created_by_user_id":{"a":true,"fo":"uint64","h":"Created By User Id","n":"created_by_user_id","r":false,"t":"`$STRING`","key$":"created_by_user_id","index$":4},"dataset":{"a":true,"h":"Dataset","n":"dataset","r":false,"t":"`$OBJECT`","key$":"dataset","index$":5},"dataset_name":{"a":true,"h":"Dataset Name","n":"dataset_name","r":false,"t":"`$STRING`","key$":"dataset_name","index$":6},"dataset_uuid":{"a":true,"h":"Dataset Uuid","n":"dataset_uuid","r":false,"sh":"Dataset against which the test‑case is executed.","t":"`$STRING`","key$":"dataset_uuid","index$":7},"description":{"a":true,"h":"Description","n":"description","r":false,"sh":"Description of the test case.","t":"`$STRING`","key$":"description","index$":8},"latest_version_number_of_runs":{"a":true,"fo":"int32","h":"Latest Version Number Of Runs","n":"latest_version_number_of_runs","r":false,"t":"`$INTEGER`","key$":"latest_version_number_of_runs","index$":9},"metrics":{"a":true,"h":"Metrics","n":"metrics","r":false,"sh":"Full metric list to use for evaluation test case.","t":"`$ARRAY`","key$":"metrics","index$":10},"name":{"a":true,"h":"Name","n":"name","r":false,"sh":"Name of the test case.","t":"`$STRING`","key$":"name","index$":11},"star_metric":{"a":true,"h":"Star Metric","n":"star_metric","r":false,"t":"`$OBJECT`","key$":"star_metric","index$":12},"test_case_uuid":{"a":true,"h":"Test Case Uuid","n":"test_case_uuid","r":false,"sh":"Test‑case UUID.","t":"`$STRING`","key$":"test_case_uuid","index$":13},"total_runs":{"a":true,"fo":"int32","h":"Total Runs","n":"total_runs","r":false,"t":"`$INTEGER`","key$":"total_runs","index$":14},"updated_at":{"a":true,"fo":"date-time","h":"Updated At","n":"updated_at","r":false,"t":"`$STRING`","key$":"updated_at","index$":15},"updated_by_user_email":{"a":true,"h":"Updated By User Email","n":"updated_by_user_email","r":false,"t":"`$STRING`","key$":"updated_by_user_email","index$":16},"updated_by_user_id":{"a":true,"fo":"uint64","h":"Updated By User Id","n":"updated_by_user_id","r":false,"t":"`$STRING`","key$":"updated_by_user_id","index$":17},"version":{"a":true,"fo":"int64","h":"Version","n":"version","r":false,"t":"`$INTEGER`","key$":"version","index$":18},"workspace_uuid":{"a":true,"h":"Workspace Uuid","n":"workspace_uuid","r":false,"sh":"The workspace uuid.","t":"`$STRING`","key$":"workspace_uuid","index$":19}},"name":"api_get_evaluation_test_case_output","op":{"create":{"input":"data","name":"create","points":[{"a":true,"co":{"id":"POST /v2/gen-ai/evaluation_test_cases","source":"openapi3","version":2},"g":{},"k":"http","m":"POST","o":"/v2/gen-ai/evaluation_test_cases","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v2"},{"lit":"gen-ai"},{"lit":"evaluation_test_cases"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"},"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /v2/gen-ai/evaluation_test_cases","source":"openapi3","version":2},"g":{},"k":"http","m":"GET","o":"/v2/gen-ai/evaluation_test_cases","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v2"},{"lit":"gen-ai"},{"lit":"evaluation_test_cases"}],"t":{"req":"`reqdata`","res":"`body.evaluation_test_cases`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /v2/gen-ai/evaluation_test_cases/{test_case_uuid}","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":"\"123e4567-e89b-12d3-a456-426614174000\"","k":"param","n":"test_case_uuid","or":"test_case_uuid","r":true,"t":"`$STRING`","index$":0}],"query":[{"a":true,"ex":1,"k":"query","n":"evaluation_test_case_version","or":"evaluation_test_case_version","r":false,"t":"`$INTEGER`","index$":0}]},"k":"http","m":"GET","o":"/v2/gen-ai/evaluation_test_cases/{test_case_uuid}","q":{"exist":["test_case_uuid"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v2"},{"lit":"gen-ai"},{"lit":"evaluation_test_cases"},{"var":"test_case_uuid"}],"t":{"req":"`reqdata`","res":"`body.evaluation_test_case`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"api_get_evaluation_test_case_output","name__orig":"api_get_evaluation_test_case_output","Name":"ApiGetEvaluationTestCaseOutput","name_":"api_get_evaluation_test_case_output","name-":"api-get-evaluation-test-case-output","NAME":"API_GET_EVALUATION_TEST_CASE_OUTPUT","index$":38}, {"active":true,"entity":"api_get_evaluation_test_case_output","key$":"BasicApiGetEvaluationTestCaseOutputFlow","kind":"basic","name":"BasicApiGetEvaluationTestCaseOutputFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"api_get_evaluation_test_case_output_ref01"},"m":{},"o":"create","s":[],"v":[],"index$":0},{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"api_get_evaluation_test_case_output_ref01"}}],"index$":1},{"a":true,"d":{},"i":{"ref":"api_get_evaluation_test_case_output_ref01","srcdatavar":"api_get_evaluation_test_case_output_ref01_data","suffix":"_dt0"},"m":{"id":"api_get_evaluation_test_case_output01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-api_get_evaluation_test_case_output_ref01"}}],"index$":2}]}, 'ApiGetEvaluationTestCaseOutput', {"POST /v2/gen-ai/evaluation_test_cases":{"protocol":"http","requestBody":{"content":{"application/json":{"schema":{"properties":{"agent_workspace_name":{"example":"example name","type":"string","key$":"agent_workspace_name"},"dataset_uuid":{"description":"Dataset against which the test‑case is executed.","example":"123e4567-e89b-12d3-a456-426614174000","type":"string","key$":"dataset_uuid"},"description":{"description":"Description of the test case.","example":"example string","type":"string","key$":"description"},"metrics":{"description":"Full metric list to use for evaluation test case.","example":["example string"],"items":{"example":"example string","type":"string"},"type":"array","key$":"metrics"},"name":{"description":"Name of the test case.","example":"example name","type":"string","key$":"name"},"star_metric":{"properties":{"metric_uuid":{"example":"123e4567-e89b-12d3-a456-426614174000","type":"string"},"name":{"example":"example name","type":"string"},"success_threshold":{"description":"The success threshold for the star metric.\nThis is a value that the metric must reach to be considered successful.","example":123,"format":"float","type":"number"},"success_threshold_pct":{"description":"The success threshold for the star metric.\nThis is a percentage value between 0 and 100.","example":123,"format":"int32","type":"integer"}},"type":"object","x-ref":"#/components/schemas/apiStarMetric","key$":"star_metric"},"workspace_uuid":{"description":"The workspace uuid.","example":"123e4567-e89b-12d3-a456-426614174000","type":"string","key$":"workspace_uuid"}},"type":"object","x-ref":"#/components/schemas/apiCreateEvaluationTestCaseInputPublic","index$":1}}}},"parameters":[]},"GET /v2/gen-ai/evaluation_test_cases":{"protocol":"http","parameters":[]},"GET /v2/gen-ai/evaluation_test_cases/{test_case_uuid}":{"protocol":"http","parameters":[{"description":"The test case uuid to retrieve.","example":"\"123e4567-e89b-12d3-a456-426614174000\"","in":"path","name":"test_case_uuid","required":true,"schema":{"type":"string"},"index$":0},{"description":"Version of the test case.","example":1,"in":"query","name":"evaluation_test_case_version","schema":{"type":"integer"},"index$":1}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const api_get_evaluation_test_case_output_ref01_ent = client.ApiGetEvaluationTestCaseOutput()
    let api_get_evaluation_test_case_output_ref01_data = setup.data.new.api_get_evaluation_test_case_output['api_get_evaluation_test_case_output_ref01']

    api_get_evaluation_test_case_output_ref01_data = (await api_get_evaluation_test_case_output_ref01_ent.create(api_get_evaluation_test_case_output_ref01_data)).data()
    assert(null != api_get_evaluation_test_case_output_ref01_data)


    // LIST
    const api_get_evaluation_test_case_output_ref01_match: any = {}

    const api_get_evaluation_test_case_output_ref01_list = (await api_get_evaluation_test_case_output_ref01_ent.list(api_get_evaluation_test_case_output_ref01_match)).map((e: any) => e.data())



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
      '../../../../.sdk/test/entity/api_get_evaluation_test_case_output/ApiGetEvaluationTestCaseOutputTestData.json')

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
    ['api_get_evaluation_test_case_output01','api_get_evaluation_test_case_output02','api_get_evaluation_test_case_output03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'DIGITALOCEAN_TEST_API_GET_EVALUATION_TEST_CASE_OUTPUT_ENTID': idmap,
    'DIGITALOCEAN_TEST_LIVE': 'FALSE',
    'DIGITALOCEAN_TEST_EXPLAIN': 'FALSE',
    'DIGITALOCEAN_APIKEY': '',
  })

  idmap = env['DIGITALOCEAN_TEST_API_GET_EVALUATION_TEST_CASE_OUTPUT_ENTID']

  const live = 'TRUE' === env.DIGITALOCEAN_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['DIGITALOCEAN_TEST_API_GET_EVALUATION_TEST_CASE_OUTPUT_ENTID']
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
  
