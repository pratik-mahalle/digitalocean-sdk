

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


describe('ApiGetModelEvaluationRunOutputEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when DIGITALOCEAN_TEST_LIVE=TRUE.
  afterEach(liveDelay('DIGITALOCEAN_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = DigitaloceanSDK.test()
    const ent = testsdk.ApiGetModelEvaluationRunOutput()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = DigitaloceanSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.ApiGetModelEvaluationRunOutput().load({"eval_run_uuid":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.DIGITALOCEAN_TEST_LIVE
    for (const op of []) {
      if (!live && maybeSkipControl(t, 'entityOp', 'api_get_model_evaluation_run_output.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"links":{"a":true,"h":"Links","n":"links","r":false,"sh":"Links to other pages","t":"`$OBJECT`","key$":"links","index$":0},"meta":{"a":true,"h":"Meta","n":"meta","r":false,"sh":"Meta information about the data set","t":"`$OBJECT`","key$":"meta","index$":1},"results":{"a":true,"h":"Results","n":"results","r":false,"sh":"Paginated per-prompt evaluation results.","t":"`$ARRAY`","key$":"results","index$":2},"run":{"a":true,"h":"Run","n":"run","r":false,"sh":"Model Evaluation Run Detail - full view returned when fetching a specific run.","t":"`$OBJECT`","key$":"run","index$":3}},"name":"api_get_model_evaluation_run_output","op":{"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /v2/gen-ai/model_evaluation_runs/{eval_run_uuid}","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":"\"123e4567-e89b-12d3-a456-426614174000\"","k":"param","n":"eval_run_uuid","or":"eval_run_uuid","r":true,"t":"`$STRING`","index$":0}],"query":[{"a":true,"ex":1,"k":"query","n":"page","or":"page","r":false,"t":"`$INTEGER`","index$":0},{"a":true,"ex":1,"k":"query","n":"per_page","or":"per_page","r":false,"t":"`$INTEGER`","index$":1}]},"k":"http","m":"GET","o":"/v2/gen-ai/model_evaluation_runs/{eval_run_uuid}","q":{"exist":["eval_run_uuid"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v2"},{"lit":"gen-ai"},{"lit":"model_evaluation_runs"},{"var":"eval_run_uuid"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"},"update":{"input":"data","name":"update","points":[{"a":true,"co":{"id":"PUT /v2/gen-ai/model_evaluation_runs/{eval_run_uuid}/cancel","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":"\"123e4567-e89b-12d3-a456-426614174000\"","k":"param","n":"eval_run_uuid","or":"eval_run_uuid","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"PUT","o":"/v2/gen-ai/model_evaluation_runs/{eval_run_uuid}/cancel","q":{"$action":"cancel","exist":["eval_run_uuid"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v2"},{"lit":"gen-ai"},{"lit":"model_evaluation_runs"},{"var":"eval_run_uuid"},{"lit":"cancel"}],"t":{"req":"`reqdata`","res":"`body.run`"},"index$":0}],"key$":"update"}},"relations":{"ancestors":[]},"key$":"api_get_model_evaluation_run_output","name__orig":"api_get_model_evaluation_run_output","Name":"ApiGetModelEvaluationRunOutput","name_":"api_get_model_evaluation_run_output","name-":"api-get-model-evaluation-run-output","NAME":"API_GET_MODEL_EVALUATION_RUN_OUTPUT","index$":44}, {"active":true,"entity":"api_get_model_evaluation_run_output","key$":"BasicApiGetModelEvaluationRunOutputFlow","kind":"basic","name":"BasicApiGetModelEvaluationRunOutputFlow","param":{},"step":[{"a":false,"d":{},"i":{"ref":"api_get_model_evaluation_run_output_ref01","srcdatavar":"api_get_model_evaluation_run_output_ref01_data","suffix":"_up0"},"m":{},"o":"update","s":[{"apply":"TextFieldMark","def":{"mark":"Mark01-api_get_model_evaluation_run_output_ref01"}}],"v":[],"unreachable":true},{"a":false,"d":{},"i":{"ref":"api_get_model_evaluation_run_output_ref01","srcdatavar":"api_get_model_evaluation_run_output_ref01_data","suffix":"_dt0"},"m":{"id":"api_get_model_evaluation_run_output01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-api_get_model_evaluation_run_output_ref01"}}],"unreachable":true}]}, 'ApiGetModelEvaluationRunOutput', {"GET /v2/gen-ai/model_evaluation_runs/{eval_run_uuid}":{"protocol":"http","parameters":[{"description":"UUID of the evaluation run.","example":"\"123e4567-e89b-12d3-a456-426614174000\"","in":"path","name":"eval_run_uuid","required":true,"schema":{"type":"string"},"index$":0},{"description":"Page number for per-prompt results (defaults to 1).","example":1,"in":"query","name":"page","schema":{"type":"integer"},"index$":1},{"description":"Number of per-prompt results per page (defaults to 50).","example":1,"in":"query","name":"per_page","schema":{"type":"integer"},"index$":2}]},"PUT /v2/gen-ai/model_evaluation_runs/{eval_run_uuid}/cancel":{"protocol":"http","requestBody":{"content":{"application/json":{"schema":{"properties":{"eval_run_uuid":{"description":"UUID of the model evaluation run to cancel. Returned by `CreateModelEvaluationRun`\nand listed via `ListModelEvaluationRuns`. The run must be in a non-terminal status\n(queued, running_dataset, or evaluating_results); already-terminal runs return an\nerror.","example":"\"12345678-1234-1234-1234-123456789012\"","type":"string"}},"type":"object","x-ref":"#/components/schemas/apiCancelModelEvaluationRunInputPublic"}}}},"parameters":[{"description":"UUID of the model evaluation run to cancel. Returned by `CreateModelEvaluationRun`\nand listed via `ListModelEvaluationRuns`. The run must be in a non-terminal status\n(queued, running_dataset, or evaluating_results); already-terminal runs return an\nerror.","example":"\"123e4567-e89b-12d3-a456-426614174000\"","in":"path","name":"eval_run_uuid","required":true,"schema":{"type":"string"},"index$":0}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let api_get_model_evaluation_run_output_ref01_data = Object.values(setup.data.existing.api_get_model_evaluation_run_output)[0] as any

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
      '../../../../.sdk/test/entity/api_get_model_evaluation_run_output/ApiGetModelEvaluationRunOutputTestData.json')

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
    ['api_get_model_evaluation_run_output01','api_get_model_evaluation_run_output02','api_get_model_evaluation_run_output03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'DIGITALOCEAN_TEST_API_GET_MODEL_EVALUATION_RUN_OUTPUT_ENTID': idmap,
    'DIGITALOCEAN_TEST_LIVE': 'FALSE',
    'DIGITALOCEAN_TEST_EXPLAIN': 'FALSE',
    'DIGITALOCEAN_APIKEY': '',
  })

  idmap = env['DIGITALOCEAN_TEST_API_GET_MODEL_EVALUATION_RUN_OUTPUT_ENTID']

  const live = 'TRUE' === env.DIGITALOCEAN_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['DIGITALOCEAN_TEST_API_GET_MODEL_EVALUATION_RUN_OUTPUT_ENTID']
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
  
