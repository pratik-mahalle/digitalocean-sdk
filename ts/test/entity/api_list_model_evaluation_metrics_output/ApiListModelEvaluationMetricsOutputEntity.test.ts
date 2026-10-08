

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


describe('ApiListModelEvaluationMetricsOutputEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when DIGITALOCEAN_TEST_LIVE=TRUE.
  afterEach(liveDelay('DIGITALOCEAN_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = DigitaloceanSDK.test()
    const ent = testsdk.ApiListModelEvaluationMetricsOutput()
    assert(null != ent)
  })


  class FailHook extends BaseFeature {
    name = 'failhook'
    version = '0.0.1'
    active = true
    unexpected = 0
    init() { }
    PreSpec() { throw new Error('api_list_model_evaluation_metrics_output hook failed') }
    PreUnexpected() { this.unexpected++ }
  }

  test('stream-error', async () => {
    const offline = { net: { offline: true } }
    await assert.rejects(async () => {
      for await (const _item of DigitaloceanSDK.test(offline).ApiListModelEvaluationMetricsOutput().stream('list')) { }
    }, /offline/)

    for await (const _item of DigitaloceanSDK.test(offline).ApiListModelEvaluationMetricsOutput()
      .stream('list', undefined, { ctrl: { throw: false } })) { }

    if (null != (config as any).feature?.rbac) {
      const denied = DigitaloceanSDK.test(undefined, { feature: { rbac: { active: true, deny: true } } })
      await assert.rejects(async () => {
        for await (const _item of denied.ApiListModelEvaluationMetricsOutput().stream('list')) { }
      }, (err: any) => 'rbac_denied' === err.code)
    }
  })

  test('stream-ctrl', async () => {
    const explain: any = {}
    const ctrl: any = { explain }
    for await (const _item of DigitaloceanSDK.test().ApiListModelEvaluationMetricsOutput().stream('list', undefined, { ctrl })) { }
    assert.deepStrictEqual(Object.keys(ctrl), ['explain'])
    assert(explain === ctrl.explain && 0 < Object.keys(explain).length)
  })

  test('unexpected', async () => {
    const hook = new FailHook()
    const client = new DigitaloceanSDK({ feature: { test: { active: true } }, extend: [hook] })
    await assert.rejects(client.ApiListModelEvaluationMetricsOutput().list(), /hook failed/)
    assert(0 < hook.unexpected)

    const fired = hook.unexpected
    assert.strictEqual(await client.ApiListModelEvaluationMetricsOutput().list(undefined, { throw: false }), undefined)
    assert(fired < hook.unexpected)
  })

  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = DigitaloceanSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.ApiListModelEvaluationMetricsOutput().list({"category":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.DIGITALOCEAN_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'api_list_model_evaluation_metrics_output.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"associated_presets":{"a":true,"h":"Associated Presets","n":"associated_presets","r":false,"sh":"Saved model evaluation presets that reference this metric.","t":"`$ARRAY`","key$":"associated_presets","index$":0},"category":{"a":true,"h":"Category","n":"category","r":false,"t":"`$STRING`","key$":"category","index$":1},"custom_eval_config":{"a":true,"h":"Custom Eval Config","n":"custom_eval_config","r":false,"sh":"Configuration for a custom model-evaluation metric scored by an LLM judge.","t":"`$OBJECT`","key$":"custom_eval_config","index$":2},"description":{"a":true,"h":"Description","n":"description","r":false,"t":"`$STRING`","key$":"description","index$":3},"evaluation_scope":{"a":true,"h":"Evaluation Scope","n":"evaluation_scope","r":false,"sh":"Scope that determines whether a metric belongs to agent evaluation or model evaluation.","t":"`$STRING`","key$":"evaluation_scope","index$":4},"inverted":{"a":true,"h":"Inverted","n":"inverted","r":false,"sh":"If true, the metric is inverted, meaning that a lower value is better.","t":"`$BOOLEAN`","key$":"inverted","index$":5},"is_metric_goal":{"a":true,"h":"Is Metric Goal","n":"is_metric_goal","r":false,"t":"`$BOOLEAN`","key$":"is_metric_goal","index$":6},"metric_name":{"a":true,"h":"Metric Name","n":"metric_name","r":false,"t":"`$STRING`","key$":"metric_name","index$":7},"metric_rank":{"a":true,"fo":"int64","h":"Metric Rank","n":"metric_rank","r":false,"t":"`$INTEGER`","key$":"metric_rank","index$":8},"metric_type":{"a":true,"h":"Metric Type","n":"metric_type","r":false,"t":"`$STRING`","key$":"metric_type","index$":9},"metric_uuid":{"a":true,"h":"Metric Uuid","n":"metric_uuid","r":false,"t":"`$STRING`","key$":"metric_uuid","index$":10},"metric_value_type":{"a":true,"h":"Metric Value Type","n":"metric_value_type","r":false,"t":"`$STRING`","key$":"metric_value_type","index$":11},"range_max":{"a":true,"fo":"float","h":"Range Max","n":"range_max","r":false,"sh":"The maximum value for the metric.","t":"`$NUMBER`","key$":"range_max","index$":12},"range_min":{"a":true,"fo":"float","h":"Range Min","n":"range_min","r":false,"sh":"The minimum value for the metric.","t":"`$NUMBER`","key$":"range_min","index$":13},"source":{"a":true,"h":"Source","n":"source","r":false,"sh":"Distinguishes platform catalog metrics from user-defined LLM-as-judge metrics.","t":"`$STRING`","key$":"source","index$":14}},"name":"api_list_model_evaluation_metrics_output","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /v2/gen-ai/model_evaluation_metrics","source":"openapi3","version":2},"g":{},"k":"http","m":"GET","o":"/v2/gen-ai/model_evaluation_metrics","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v2"},{"lit":"gen-ai"},{"lit":"model_evaluation_metrics"}],"t":{"req":"`reqdata`","res":"`body.metrics`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"api_list_model_evaluation_metrics_output","name__orig":"api_list_model_evaluation_metrics_output","Name":"ApiListModelEvaluationMetricsOutput","name_":"api_list_model_evaluation_metrics_output","name-":"api-list-model-evaluation-metrics-output","NAME":"API_LIST_MODEL_EVALUATION_METRICS_OUTPUT","index$":69}, {"active":true,"entity":"api_list_model_evaluation_metrics_output","key$":"BasicApiListModelEvaluationMetricsOutputFlow","kind":"basic","name":"BasicApiListModelEvaluationMetricsOutputFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"api_list_model_evaluation_metrics_output_ref01"}}],"index$":0}]}, 'ApiListModelEvaluationMetricsOutput', {"GET /v2/gen-ai/model_evaluation_metrics":{"protocol":"http","parameters":[]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let api_list_model_evaluation_metrics_output_ref01_data = Object.values(setup.data.existing.api_list_model_evaluation_metrics_output)[0] as any

    // LIST
    const api_list_model_evaluation_metrics_output_ref01_ent = client.ApiListModelEvaluationMetricsOutput()
    const api_list_model_evaluation_metrics_output_ref01_match: any = {}

    const api_list_model_evaluation_metrics_output_ref01_list = (await api_list_model_evaluation_metrics_output_ref01_ent.list(api_list_model_evaluation_metrics_output_ref01_match)).map((e: any) => e.data())


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
      '../../../../.sdk/test/entity/api_list_model_evaluation_metrics_output/ApiListModelEvaluationMetricsOutputTestData.json')

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
    ['api_list_model_evaluation_metrics_output01','api_list_model_evaluation_metrics_output02','api_list_model_evaluation_metrics_output03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'DIGITALOCEAN_TEST_API_LIST_MODEL_EVALUATION_METRICS_OUTPUT_ENTID': idmap,
    'DIGITALOCEAN_TEST_LIVE': 'FALSE',
    'DIGITALOCEAN_TEST_EXPLAIN': 'FALSE',
    'DIGITALOCEAN_APIKEY': '',
  })

  idmap = env['DIGITALOCEAN_TEST_API_LIST_MODEL_EVALUATION_METRICS_OUTPUT_ENTID']

  const live = 'TRUE' === env.DIGITALOCEAN_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['DIGITALOCEAN_TEST_API_LIST_MODEL_EVALUATION_METRICS_OUTPUT_ENTID']
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
  
