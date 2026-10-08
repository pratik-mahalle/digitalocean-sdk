

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


describe('ApiUpdateEvaluationTestCaseOutputEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when DIGITALOCEAN_TEST_LIVE=TRUE.
  afterEach(liveDelay('DIGITALOCEAN_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = DigitaloceanSDK.test()
    const ent = testsdk.ApiUpdateEvaluationTestCaseOutput()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = DigitaloceanSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.ApiUpdateEvaluationTestCaseOutput().update({"test_case_uuid":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.DIGITALOCEAN_TEST_LIVE
    for (const op of []) {
      if (!live && maybeSkipControl(t, 'entityOp', 'api_update_evaluation_test_case_output.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"dataset_uuid":{"a":true,"h":"Dataset Uuid","n":"dataset_uuid","r":false,"sh":"Dataset against which the test‑case is executed.","t":"`$STRING`","key$":"dataset_uuid","index$":0},"description":{"a":true,"h":"Description","n":"description","r":false,"sh":"Description of the test case.","t":"`$STRING`","key$":"description","index$":1},"metrics":{"a":true,"h":"Metrics","n":"metrics","r":false,"t":"`$OBJECT`","key$":"metrics","index$":2},"name":{"a":true,"h":"Name","n":"name","r":false,"sh":"Name of the test case.","t":"`$STRING`","key$":"name","index$":3},"star_metric":{"a":true,"h":"Star Metric","n":"star_metric","r":false,"t":"`$OBJECT`","key$":"star_metric","index$":4},"test_case_uuid":{"a":true,"h":"Test Case Uuid","n":"test_case_uuid","r":false,"sh":"Test-case UUID to update","t":"`$STRING`","key$":"test_case_uuid","index$":5},"version":{"a":true,"fo":"int32","h":"Version","n":"version","r":false,"sh":"The new verson of the test case.","t":"`$INTEGER`","key$":"version","index$":6}},"name":"api_update_evaluation_test_case_output","op":{"update":{"input":"data","name":"update","points":[{"a":true,"co":{"id":"PUT /v2/gen-ai/evaluation_test_cases/{test_case_uuid}","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":"\"123e4567-e89b-12d3-a456-426614174000\"","k":"param","n":"test_case_uuid","or":"test_case_uuid","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"PUT","o":"/v2/gen-ai/evaluation_test_cases/{test_case_uuid}","q":{"exist":["test_case_uuid"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v2"},{"lit":"gen-ai"},{"lit":"evaluation_test_cases"},{"var":"test_case_uuid"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"update"}},"relations":{"ancestors":[]},"key$":"api_update_evaluation_test_case_output","name__orig":"api_update_evaluation_test_case_output","Name":"ApiUpdateEvaluationTestCaseOutput","name_":"api_update_evaluation_test_case_output","name-":"api-update-evaluation-test-case-output","NAME":"API_UPDATE_EVALUATION_TEST_CASE_OUTPUT","index$":90}, {"active":true,"entity":"api_update_evaluation_test_case_output","key$":"BasicApiUpdateEvaluationTestCaseOutputFlow","kind":"basic","name":"BasicApiUpdateEvaluationTestCaseOutputFlow","param":{},"step":[{"a":false,"d":{},"i":{"ref":"api_update_evaluation_test_case_output_ref01","srcdatavar":"api_update_evaluation_test_case_output_ref01_data","suffix":"_up0","textfield":"dataset_uuid"},"m":{},"o":"update","s":[{"apply":"TextFieldMark","def":{"mark":"Mark01-api_update_evaluation_test_case_output_ref01"}}],"v":[],"unreachable":true}]}, 'ApiUpdateEvaluationTestCaseOutput', {"PUT /v2/gen-ai/evaluation_test_cases/{test_case_uuid}":{"protocol":"http","requestBody":{"content":{"application/json":{"schema":{"properties":{"dataset_uuid":{"description":"Dataset against which the test‑case is executed.","example":"123e4567-e89b-12d3-a456-426614174000","type":"string","key$":"dataset_uuid"},"description":{"description":"Description of the test case.","example":"example string","type":"string","key$":"description"},"metrics":{"properties":{"metric_uuids":{"example":["example string"],"items":{"example":"example string","type":"string"},"type":"array"}},"type":"object","x-ref":"#/components/schemas/apiEvaluationTestCaseMetricList","key$":"metrics"},"name":{"description":"Name of the test case.","example":"example name","type":"string","key$":"name"},"star_metric":{"properties":{"metric_uuid":{"example":"123e4567-e89b-12d3-a456-426614174000","type":"string"},"name":{"example":"example name","type":"string"},"success_threshold":{"description":"The success threshold for the star metric.\nThis is a value that the metric must reach to be considered successful.","example":123,"format":"float","type":"number"},"success_threshold_pct":{"description":"The success threshold for the star metric.\nThis is a percentage value between 0 and 100.","example":123,"format":"int32","type":"integer"}},"type":"object","x-ref":"#/components/schemas/apiStarMetric","key$":"star_metric"},"test_case_uuid":{"description":"Test-case UUID to update","example":"123e4567-e89b-12d3-a456-426614174000","type":"string","key$":"test_case_uuid"}},"type":"object","x-ref":"#/components/schemas/apiUpdateEvaluationTestCaseInputPublic","index$":1}}}},"parameters":[{"description":"Test-case UUID to update","example":"\"123e4567-e89b-12d3-a456-426614174000\"","in":"path","name":"test_case_uuid","required":true,"schema":{"type":"string"},"index$":0}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let api_update_evaluation_test_case_output_ref01_data = Object.values(setup.data.existing.api_update_evaluation_test_case_output)[0] as any

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
      '../../../../.sdk/test/entity/api_update_evaluation_test_case_output/ApiUpdateEvaluationTestCaseOutputTestData.json')

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
    ['api_update_evaluation_test_case_output01','api_update_evaluation_test_case_output02','api_update_evaluation_test_case_output03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'DIGITALOCEAN_TEST_API_UPDATE_EVALUATION_TEST_CASE_OUTPUT_ENTID': idmap,
    'DIGITALOCEAN_TEST_LIVE': 'FALSE',
    'DIGITALOCEAN_TEST_EXPLAIN': 'FALSE',
    'DIGITALOCEAN_APIKEY': '',
  })

  idmap = env['DIGITALOCEAN_TEST_API_UPDATE_EVALUATION_TEST_CASE_OUTPUT_ENTID']

  const live = 'TRUE' === env.DIGITALOCEAN_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['DIGITALOCEAN_TEST_API_UPDATE_EVALUATION_TEST_CASE_OUTPUT_ENTID']
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
  
