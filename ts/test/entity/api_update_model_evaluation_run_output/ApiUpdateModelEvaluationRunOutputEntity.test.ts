

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


describe('ApiUpdateModelEvaluationRunOutputEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when DIGITALOCEAN_TEST_LIVE=TRUE.
  afterEach(liveDelay('DIGITALOCEAN_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = DigitaloceanSDK.test()
    const ent = testsdk.ApiUpdateModelEvaluationRunOutput()
    assert(null != ent)
  })


  class FailHook extends BaseFeature {
    name = 'failhook'
    version = '0.0.1'
    active = true
    unexpected = 0
    init() { }
    PreSpec() { throw new Error('api_update_model_evaluation_run_output hook failed') }
    PreUnexpected() { this.unexpected++ }
  }

  test('stream-error', async () => {
    const offline = { net: { offline: true } }
    await assert.rejects(async () => {
      for await (const _item of DigitaloceanSDK.test(offline).ApiUpdateModelEvaluationRunOutput().stream('list')) { }
    }, /offline/)

    for await (const _item of DigitaloceanSDK.test(offline).ApiUpdateModelEvaluationRunOutput()
      .stream('list', undefined, { ctrl: { throw: false } })) { }

    if (null != (config as any).feature?.rbac) {
      const denied = DigitaloceanSDK.test(undefined, { feature: { rbac: { active: true, deny: true } } })
      await assert.rejects(async () => {
        for await (const _item of denied.ApiUpdateModelEvaluationRunOutput().stream('list')) { }
      }, (err: any) => 'rbac_denied' === err.code)
    }
  })

  test('stream-ctrl', async () => {
    const explain: any = {}
    const ctrl: any = { explain }
    for await (const _item of DigitaloceanSDK.test().ApiUpdateModelEvaluationRunOutput().stream('list', undefined, { ctrl })) { }
    assert.deepStrictEqual(Object.keys(ctrl), ['explain'])
    assert(explain === ctrl.explain && 0 < Object.keys(explain).length)
  })

  test('unexpected', async () => {
    const hook = new FailHook()
    const client = new DigitaloceanSDK({ feature: { test: { active: true } }, extend: [hook] })
    await assert.rejects(client.ApiUpdateModelEvaluationRunOutput().list(), /hook failed/)
    assert(0 < hook.unexpected)

    const fired = hook.unexpected
    assert.strictEqual(await client.ApiUpdateModelEvaluationRunOutput().list(undefined, { throw: false }), undefined)
    assert(fired < hook.unexpected)
  })

  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = DigitaloceanSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.ApiUpdateModelEvaluationRunOutput().list({"eval_preset_uuid":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.DIGITALOCEAN_TEST_LIVE
    for (const op of ['create', 'list', 'update']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'api_update_model_evaluation_run_output.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"candidate_inference_config":{"a":true,"h":"Candidate Inference Config","n":"candidate_inference_config","r":false,"sh":"Inference configuration for the candidate model during evaluation.","t":"`$OBJECT`","key$":"candidate_inference_config","index$":0},"candidate_model_name":{"a":true,"h":"Candidate Model Name","n":"candidate_model_name","r":false,"sh":"Model slug used to call the candidate model API.","t":"`$STRING`","key$":"candidate_model_name","index$":1},"candidate_model_source":{"a":true,"h":"Candidate Model Source","n":"candidate_model_source","r":false,"sh":"Whether the candidate is a served model (serverless platform, a dedicated deployment, or a model router) or an OHS-hosted agent config.","t":"`$STRING`","key$":"candidate_model_source","index$":2},"candidate_model_uuid":{"a":true,"h":"Candidate Model Uuid","n":"candidate_model_uuid","r":false,"sh":"UUID of the candidate model to evaluate.","t":"`$STRING`","key$":"candidate_model_uuid","index$":3},"created_at":{"a":true,"fo":"date-time","h":"Created At","n":"created_at","r":false,"sh":"Timestamp when the run was created.","t":"`$STRING`","key$":"created_at","index$":4},"dataset_name":{"a":true,"h":"Dataset Name","n":"dataset_name","r":false,"sh":"Name of the dataset used for evaluation.","t":"`$STRING`","key$":"dataset_name","index$":5},"dataset_uuid":{"a":true,"h":"Dataset Uuid","n":"dataset_uuid","r":false,"sh":"UUID of the dataset to use for evaluation.","t":"`$STRING`","key$":"dataset_uuid","index$":6},"epochs":{"a":true,"fo":"int64","h":"Epochs","n":"epochs","r":false,"sh":"Number of times to evaluate each dataset row (n-pass/epochs), so the result reports avg@k/pass@k/cons@k instead of a single score.","t":"`$INTEGER`","key$":"epochs","index$":7},"eval_preset_uuid":{"a":true,"h":"Eval Preset Uuid","n":"eval_preset_uuid","r":false,"t":"`$STRING`","key$":"eval_preset_uuid","index$":8},"eval_run_uuid":{"a":true,"h":"Eval Run Uuid","n":"eval_run_uuid","r":false,"sh":"UUID of the created evaluation run.","t":"`$STRING`","key$":"eval_run_uuid","index$":9},"judge_model_name":{"a":true,"h":"Judge Model Name","n":"judge_model_name","r":false,"t":"`$STRING`","key$":"judge_model_name","index$":10},"judge_model_uuid":{"a":true,"h":"Judge Model Uuid","n":"judge_model_uuid","r":false,"sh":"UUID of the judge model used to score responses.","t":"`$STRING`","key$":"judge_model_uuid","index$":11},"metric_uuids":{"a":true,"h":"Metric Uuids","n":"metric_uuids","r":false,"sh":"UUIDs of metrics to evaluate (selected from ListModelEvaluationMetrics).","t":"`$ARRAY`","key$":"metric_uuids","index$":12},"name":{"a":true,"h":"Name","n":"name","r":false,"sh":"Name of the evaluation run.","t":"`$STRING`","key$":"name","index$":13},"preset_name":{"a":true,"h":"Preset Name","n":"preset_name","r":false,"t":"`$STRING`","key$":"preset_name","index$":14},"preset_save_sections":{"a":true,"h":"Preset Save Sections","n":"preset_save_sections","r":false,"sh":"Which sections of this run's resolved configuration to persist as a reusable preset.","t":"`$ARRAY`","key$":"preset_save_sections","index$":15},"progress":{"a":true,"h":"Progress","n":"progress","r":false,"sh":"Per-phase progress for a model evaluation run.","t":"`$OBJECT`","key$":"progress","index$":16},"save_as_preset":{"a":true,"h":"Save As Preset","n":"save_as_preset","r":false,"sh":"Deprecated: use `preset_save_sections`.","t":"`$BOOLEAN`","key$":"save_as_preset","index$":17},"source":{"a":true,"h":"Source","n":"source","r":false,"sh":"Source of the run creation (api, sdk, cli).","t":"`$STRING`","key$":"source","index$":18},"star_metric":{"a":true,"h":"Star Metric","n":"star_metric","r":false,"t":"`$OBJECT`","key$":"star_metric","index$":19},"status":{"a":true,"h":"Status","n":"status","r":false,"sh":"Model Evaluation Run Statuses","t":"`$STRING`","key$":"status","index$":20}},"name":"api_update_model_evaluation_run_output","op":{"create":{"input":"data","name":"create","points":[{"a":true,"co":{"id":"POST /v2/gen-ai/model_evaluation_runs","source":"openapi3","version":2},"g":{},"k":"http","m":"POST","o":"/v2/gen-ai/model_evaluation_runs","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v2"},{"lit":"gen-ai"},{"lit":"model_evaluation_runs"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"},"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /v2/gen-ai/model_evaluation_runs","source":"openapi3","version":2},"g":{"query":[{"a":true,"ex":["CANDIDATE_MODEL_SOURCE_SERVERLESS"],"k":"query","n":"candidate_type","or":"candidate_types","r":false,"t":"`$ARRAY`","index$":0},{"a":true,"ex":"123e4567-e89b-12d3-a456-426614174000","k":"query","n":"eval_preset_uuid","or":"eval_preset_uuid","r":false,"t":"`$STRING`","index$":1},{"a":true,"ex":1,"k":"query","n":"page","or":"page","r":false,"t":"`$INTEGER`","index$":2},{"a":true,"ex":1,"k":"query","n":"per_page","or":"per_page","r":false,"t":"`$INTEGER`","index$":3},{"a":true,"ex":"example string","k":"query","n":"search","or":"search","r":false,"t":"`$STRING`","index$":4},{"a":true,"ex":"MODEL_EVALUATION_RUN_SORT_FIELD_UNSPECIFIED","k":"query","n":"sort_by","or":"sort_by","r":false,"t":"`$STRING`","index$":5},{"a":true,"ex":"SORT_DIRECTION_UNSPECIFIED","k":"query","n":"sort_direction","or":"sort_direction","r":false,"t":"`$STRING`","index$":6},{"a":true,"ex":"MODEL_EVALUATION_RUN_STATUS_UNSPECIFIED","k":"query","n":"status","or":"status","r":false,"t":"`$STRING`","index$":7},{"a":true,"ex":["MODEL_EVALUATION_RUN_STATUS_UNSPECIFIED"],"k":"query","n":"status","or":"statuses","r":false,"t":"`$ARRAY`","index$":8}]},"k":"http","m":"GET","o":"/v2/gen-ai/model_evaluation_runs","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v2"},{"lit":"gen-ai"},{"lit":"model_evaluation_runs"}],"t":{"req":"`reqdata`","res":"`body.runs`"},"index$":0}],"key$":"list"},"update":{"input":"data","name":"update","points":[{"a":true,"co":{"id":"PATCH /v2/gen-ai/model_evaluation_runs/{eval_run_uuid}","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":"\"123e4567-e89b-12d3-a456-426614174000\"","k":"param","n":"eval_run_uuid","or":"eval_run_uuid","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"PATCH","o":"/v2/gen-ai/model_evaluation_runs/{eval_run_uuid}","q":{"exist":["eval_run_uuid"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v2"},{"lit":"gen-ai"},{"lit":"model_evaluation_runs"},{"var":"eval_run_uuid"}],"t":{"req":"`reqdata`","res":"`body.run`"},"index$":0}],"key$":"update"}},"relations":{"ancestors":[]},"key$":"api_update_model_evaluation_run_output","name__orig":"api_update_model_evaluation_run_output","Name":"ApiUpdateModelEvaluationRunOutput","name_":"api_update_model_evaluation_run_output","name-":"api-update-model-evaluation-run-output","NAME":"API_UPDATE_MODEL_EVALUATION_RUN_OUTPUT","index$":95}, {"active":true,"entity":"api_update_model_evaluation_run_output","key$":"BasicApiUpdateModelEvaluationRunOutputFlow","kind":"basic","name":"BasicApiUpdateModelEvaluationRunOutputFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"api_update_model_evaluation_run_output_ref01"},"m":{},"o":"create","s":[],"v":[],"index$":0},{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"api_update_model_evaluation_run_output_ref01"}}],"index$":1},{"a":true,"d":{},"i":{"ref":"api_update_model_evaluation_run_output_ref01","srcdatavar":"api_update_model_evaluation_run_output_ref01_data","suffix":"_up0","textfield":"candidate_model_name"},"m":{},"o":"update","s":[{"apply":"TextFieldMark","def":{"mark":"Mark01-api_update_model_evaluation_run_output_ref01"}}],"v":[],"index$":2}]}, 'ApiUpdateModelEvaluationRunOutput', {"POST /v2/gen-ai/model_evaluation_runs":{"protocol":"http","requestBody":{"content":{"application/json":{"schema":{"properties":{"candidate_inference_config":{"description":"Inference configuration for the candidate model during evaluation.","properties":{"max_tokens":{"example":123,"format":"int64","type":"integer"},"reasoning_effort":{"description":"Reasoning effort for reasoning-capable models (e.g. \"low\", \"medium\",\n\"high\"). Validated against the candidate model's supported values; a model\nthat advertises none rejects this field.","example":"low","type":"string"},"stop_token":{"example":"example string","type":"string"},"system_prompt":{"example":"example string","type":"string"},"temperature":{"example":123,"format":"float","type":"number"}},"type":"object","x-ref":"#/components/schemas/apiCandidateInferenceConfig","key$":"candidate_inference_config"},"candidate_model_name":{"description":"Model slug used to call the candidate model API.\nFor dedicated inference, this is the model slug from the deployment.\nFor serverless, this should match the model's internal name.","example":"example name","type":"string","key$":"candidate_model_name"},"candidate_model_source":{"default":"CANDIDATE_MODEL_SOURCE_SERVERLESS","description":"Whether the candidate is a served model (serverless platform, a dedicated\ndeployment, or a model router) or an OHS-hosted agent config.","enum":["CANDIDATE_MODEL_SOURCE_SERVERLESS","CANDIDATE_MODEL_SOURCE_DEDICATED","CANDIDATE_MODEL_SOURCE_ROUTER","CANDIDATE_MODEL_SOURCE_AGENT"],"example":"CANDIDATE_MODEL_SOURCE_SERVERLESS","type":"string","x-ref":"#/components/schemas/apiCandidateModelSource","key$":"candidate_model_source"},"candidate_model_uuid":{"description":"UUID of the candidate model to evaluate.","example":"123e4567-e89b-12d3-a456-426614174000","type":"string","key$":"candidate_model_uuid"},"dataset_uuid":{"description":"UUID of the dataset to use for evaluation.","example":"123e4567-e89b-12d3-a456-426614174000","type":"string","key$":"dataset_uuid"},"epochs":{"description":"Number of times to evaluate each dataset row (n-pass/epochs), so the\nresult reports avg@k/pass@k/cons@k instead of a single score. Defaults\nto 1 when unset. Capped at 3 until throughput/sharding work lands, since\neach extra epoch roughly multiplies wall-clock run time. Not persisted\non presets.","example":1,"format":"int64","type":"integer","key$":"epochs"},"eval_preset_uuid":{"example":"123e4567-e89b-12d3-a456-426614174000","type":"string","key$":"eval_preset_uuid"},"judge_model_uuid":{"description":"UUID of the judge model used to score responses.","example":"123e4567-e89b-12d3-a456-426614174000","type":"string","key$":"judge_model_uuid"},"metric_uuids":{"description":"UUIDs of metrics to evaluate (selected from ListModelEvaluationMetrics).","example":["example string"],"items":{"example":"example string","type":"string"},"type":"array","key$":"metric_uuids"},"name":{"example":"example name","type":"string","key$":"name"},"preset_name":{"example":"example name","type":"string","key$":"preset_name"},"preset_save_sections":{"description":"Which sections of this run's resolved configuration to persist as a\nreusable preset. Each selected section saves only its own fields; the\nremaining sections stay empty on the preset and must be supplied inline\non future runs that reference it. Empty means do not save a preset\n(unless the deprecated `save_as_preset` boolean is true, in which case\nall sections are saved). Ignored when `eval_preset_uuid` is set. Use\n`preset_name` to label the saved preset.","example":["PRESET_SAVE_SECTION_CANDIDATE","PRESET_SAVE_SECTION_METRICS"],"items":{"default":"PRESET_SAVE_SECTION_UNSPECIFIED","description":"Sections of an inline evaluation config that can be persisted as a reusable\npreset. Each value names a self-contained group of fields; selecting a\nsection saves exactly the fields it owns and leaves the rest of the preset\nempty so it can be merged with inline values on a future run.\n\n - PRESET_SAVE_SECTION_CANDIDATE: Candidate model identity (`candidate_model_uuid`, `candidate_model_source`,\n`candidate_model_name`) and the non-prompt inference params\n(`max_tokens`, `temperature`, `stop_token`).\n - PRESET_SAVE_SECTION_METRICS: The selected `metric_uuids` and the optional `star_metric`.\n - PRESET_SAVE_SECTION_JUDGE: The `judge_model_uuid`.\n - PRESET_SAVE_SECTION_DATASET: The `dataset_uuid`.\n - PRESET_SAVE_SECTION_SYSTEM_PROMPT: The candidate's `system_prompt` only. Independent of CANDIDATE so the\nmodel + params and the prompt can be saved/replayed separately.","enum":["PRESET_SAVE_SECTION_UNSPECIFIED","PRESET_SAVE_SECTION_CANDIDATE","PRESET_SAVE_SECTION_METRICS","PRESET_SAVE_SECTION_JUDGE","PRESET_SAVE_SECTION_DATASET","PRESET_SAVE_SECTION_SYSTEM_PROMPT"],"example":"PRESET_SAVE_SECTION_UNSPECIFIED","type":"string","x-ref":"#/components/schemas/apiPresetSaveSection"},"type":"array","key$":"preset_save_sections"},"save_as_preset":{"description":"Deprecated: use `preset_save_sections`. When `true` and\n`preset_save_sections` is empty, all five sections of the resolved\nconfiguration are saved as a reusable preset (legacy behavior). Ignored\nwhen `eval_preset_uuid` is set.","example":true,"type":"boolean","key$":"save_as_preset"},"source":{"description":"Source of the run creation (api, sdk, cli).","example":"example string","type":"string","key$":"source"},"star_metric":{"properties":{"metric_uuid":{"example":"123e4567-e89b-12d3-a456-426614174000","type":"string"},"name":{"example":"example name","type":"string"},"success_threshold":{"description":"The success threshold for the star metric.\nThis is a value that the metric must reach to be considered successful.","example":123,"format":"float","type":"number"},"success_threshold_pct":{"description":"The success threshold for the star metric.\nThis is a percentage value between 0 and 100.","example":123,"format":"int32","type":"integer"}},"type":"object","x-ref":"#/components/schemas/apiStarMetric","key$":"star_metric"}},"type":"object","x-ref":"#/components/schemas/apiCreateModelEvaluationRunInputPublic","index$":1}}}},"parameters":[]},"GET /v2/gen-ai/model_evaluation_runs":{"protocol":"http","parameters":[{"description":"UUID of the evaluation preset to filter by.","example":"123e4567-e89b-12d3-a456-426614174000","in":"query","name":"eval_preset_uuid","schema":{"type":"string"},"index$":0},{"description":"Filter by evaluation run status.","example":"MODEL_EVALUATION_RUN_STATUS_UNSPECIFIED","in":"query","name":"status","schema":{"default":"MODEL_EVALUATION_RUN_STATUS_UNSPECIFIED","enum":["MODEL_EVALUATION_RUN_STATUS_UNSPECIFIED","MODEL_EVALUATION_RUN_QUEUED","MODEL_EVALUATION_RUN_RUNNING_DATASET","MODEL_EVALUATION_RUN_EVALUATING_RESULTS","MODEL_EVALUATION_RUN_CANCELLING","MODEL_EVALUATION_RUN_CANCELLED","MODEL_EVALUATION_RUN_SUCCESSFUL","MODEL_EVALUATION_RUN_PARTIALLY_SUCCESSFUL","MODEL_EVALUATION_RUN_FAILED"],"type":"string"},"index$":1},{"description":"Page number.","example":1,"in":"query","name":"page","schema":{"type":"integer"},"index$":2},{"description":"Items per page.","example":1,"in":"query","name":"per_page","schema":{"type":"integer"},"index$":3},{"description":"Filter by one or more statuses. Empty means no status filter.","example":["MODEL_EVALUATION_RUN_STATUS_UNSPECIFIED"],"in":"query","name":"statuses","schema":{"items":{"enum":["MODEL_EVALUATION_RUN_STATUS_UNSPECIFIED","MODEL_EVALUATION_RUN_QUEUED","MODEL_EVALUATION_RUN_RUNNING_DATASET","MODEL_EVALUATION_RUN_EVALUATING_RESULTS","MODEL_EVALUATION_RUN_CANCELLING","MODEL_EVALUATION_RUN_CANCELLED","MODEL_EVALUATION_RUN_SUCCESSFUL","MODEL_EVALUATION_RUN_PARTIALLY_SUCCESSFUL","MODEL_EVALUATION_RUN_FAILED"],"type":"string"},"type":"array"},"index$":4},{"description":"Filter by one or more candidate model source types\n(serverless, dedicated, router). Empty means no candidate-type filter.","example":["CANDIDATE_MODEL_SOURCE_SERVERLESS"],"in":"query","name":"candidate_types","schema":{"items":{"enum":["CANDIDATE_MODEL_SOURCE_SERVERLESS","CANDIDATE_MODEL_SOURCE_DEDICATED","CANDIDATE_MODEL_SOURCE_ROUTER"],"type":"string"},"type":"array"},"index$":5},{"description":"Free-text search across the eval run name, candidate model name and\ndataset name (case-insensitive substring match). Empty means no search.","example":"example string","in":"query","name":"search","schema":{"type":"string"},"index$":6},{"description":"Field to sort by. Defaults to creation date when unspecified.","example":"MODEL_EVALUATION_RUN_SORT_FIELD_UNSPECIFIED","in":"query","name":"sort_by","schema":{"default":"MODEL_EVALUATION_RUN_SORT_FIELD_UNSPECIFIED","enum":["MODEL_EVALUATION_RUN_SORT_FIELD_UNSPECIFIED","MODEL_EVALUATION_RUN_SORT_FIELD_CREATED_AT","MODEL_EVALUATION_RUN_SORT_FIELD_STATUS"],"type":"string"},"index$":7},{"description":"Sort direction. Defaults to descending when unspecified.","example":"SORT_DIRECTION_UNSPECIFIED","in":"query","name":"sort_direction","schema":{"default":"SORT_DIRECTION_UNSPECIFIED","enum":["SORT_DIRECTION_UNSPECIFIED","SORT_DIRECTION_ASC","SORT_DIRECTION_DESC"],"type":"string"},"index$":8}]},"PATCH /v2/gen-ai/model_evaluation_runs/{eval_run_uuid}":{"protocol":"http","requestBody":{"content":{"application/json":{"schema":{"properties":{"eval_run_uuid":{"description":"UUID of the model evaluation run to update. Returned by `CreateModelEvaluationRun`\nand listed via `ListModelEvaluationRuns`.","example":"\"12345678-1234-1234-1234-123456789012\"","type":"string","key$":"eval_run_uuid"},"name":{"description":"Optional new display name for the evaluation run (max 255 characters).","example":"My evaluation run","type":"string","key$":"name"}},"type":"object","x-ref":"#/components/schemas/apiUpdateModelEvaluationRunInputPublic","index$":1}}}},"parameters":[{"description":"UUID of the model evaluation run to update. Returned by `CreateModelEvaluationRun`\nand listed via `ListModelEvaluationRuns`.","example":"\"123e4567-e89b-12d3-a456-426614174000\"","in":"path","name":"eval_run_uuid","required":true,"schema":{"type":"string"},"index$":0}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const api_update_model_evaluation_run_output_ref01_ent = client.ApiUpdateModelEvaluationRunOutput()
    let api_update_model_evaluation_run_output_ref01_data = setup.data.new.api_update_model_evaluation_run_output['api_update_model_evaluation_run_output_ref01']

    api_update_model_evaluation_run_output_ref01_data = (await api_update_model_evaluation_run_output_ref01_ent.create(api_update_model_evaluation_run_output_ref01_data)).data()
    assert(null != api_update_model_evaluation_run_output_ref01_data)


    // LIST
    const api_update_model_evaluation_run_output_ref01_match: any = {}

    const api_update_model_evaluation_run_output_ref01_list = (await api_update_model_evaluation_run_output_ref01_ent.list(api_update_model_evaluation_run_output_ref01_match)).map((e: any) => e.data())


    // UPDATE
    const api_update_model_evaluation_run_output_ref01_data_up0: any = {}

    const api_update_model_evaluation_run_output_ref01_markdef_up0 = { name: 'candidate_model_name', value: 'Mark01-api_update_model_evaluation_run_output_ref01_' + setup.now }
    ;(api_update_model_evaluation_run_output_ref01_data_up0 as any)[api_update_model_evaluation_run_output_ref01_markdef_up0.name] = api_update_model_evaluation_run_output_ref01_markdef_up0.value

    const api_update_model_evaluation_run_output_ref01_resdata_up0 = (await api_update_model_evaluation_run_output_ref01_ent.update(api_update_model_evaluation_run_output_ref01_data_up0)).data()
    assert(null != api_update_model_evaluation_run_output_ref01_resdata_up0)

    assert((api_update_model_evaluation_run_output_ref01_resdata_up0 as any)[api_update_model_evaluation_run_output_ref01_markdef_up0.name] === api_update_model_evaluation_run_output_ref01_markdef_up0.value)


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
      '../../../../.sdk/test/entity/api_update_model_evaluation_run_output/ApiUpdateModelEvaluationRunOutputTestData.json')

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
    ['api_update_model_evaluation_run_output01','api_update_model_evaluation_run_output02','api_update_model_evaluation_run_output03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'DIGITALOCEAN_TEST_API_UPDATE_MODEL_EVALUATION_RUN_OUTPUT_ENTID': idmap,
    'DIGITALOCEAN_TEST_LIVE': 'FALSE',
    'DIGITALOCEAN_TEST_EXPLAIN': 'FALSE',
    'DIGITALOCEAN_APIKEY': '',
  })

  idmap = env['DIGITALOCEAN_TEST_API_UPDATE_MODEL_EVALUATION_RUN_OUTPUT_ENTID']

  const live = 'TRUE' === env.DIGITALOCEAN_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['DIGITALOCEAN_TEST_API_UPDATE_MODEL_EVALUATION_RUN_OUTPUT_ENTID']
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
  
