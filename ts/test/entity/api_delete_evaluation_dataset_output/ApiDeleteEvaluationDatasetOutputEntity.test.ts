

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


describe('ApiDeleteEvaluationDatasetOutputEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when DIGITALOCEAN_TEST_LIVE=TRUE.
  afterEach(liveDelay('DIGITALOCEAN_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = DigitaloceanSDK.test()
    const ent = testsdk.ApiDeleteEvaluationDatasetOutput()
    assert(null != ent)
  })


  class FailHook extends BaseFeature {
    name = 'failhook'
    version = '0.0.1'
    active = true
    unexpected = 0
    init() { }
    PreSpec() { throw new Error('api_delete_evaluation_dataset_output hook failed') }
    PreUnexpected() { this.unexpected++ }
  }

  test('stream-error', async () => {
    const offline = { net: { offline: true } }
    await assert.rejects(async () => {
      for await (const _item of DigitaloceanSDK.test(offline).ApiDeleteEvaluationDatasetOutput().stream('list')) { }
    }, /offline/)

    for await (const _item of DigitaloceanSDK.test(offline).ApiDeleteEvaluationDatasetOutput()
      .stream('list', undefined, { ctrl: { throw: false } })) { }

    if (null != (config as any).feature?.rbac) {
      const denied = DigitaloceanSDK.test(undefined, { feature: { rbac: { active: true, deny: true } } })
      await assert.rejects(async () => {
        for await (const _item of denied.ApiDeleteEvaluationDatasetOutput().stream('list')) { }
      }, (err: any) => 'rbac_denied' === err.code)
    }
  })

  test('stream-ctrl', async () => {
    const explain: any = {}
    const ctrl: any = { explain }
    for await (const _item of DigitaloceanSDK.test().ApiDeleteEvaluationDatasetOutput().stream('list', undefined, { ctrl })) { }
    assert.deepStrictEqual(Object.keys(ctrl), ['explain'])
    assert(explain === ctrl.explain && 0 < Object.keys(explain).length)
  })

  test('unexpected', async () => {
    const hook = new FailHook()
    const client = new DigitaloceanSDK({ feature: { test: { active: true } }, extend: [hook] })
    await assert.rejects(client.ApiDeleteEvaluationDatasetOutput().list(), /hook failed/)
    assert(0 < hook.unexpected)

    const fired = hook.unexpected
    assert.strictEqual(await client.ApiDeleteEvaluationDatasetOutput().list(undefined, { throw: false }), undefined)
    assert(fired < hook.unexpected)
  })

  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = DigitaloceanSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.ApiDeleteEvaluationDatasetOutput().list({"dataset_paradigm":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.DIGITALOCEAN_TEST_LIVE
    for (const op of ['create', 'list', 'remove']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'api_delete_evaluation_dataset_output.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"created_at":{"a":true,"fo":"date-time","h":"Created At","n":"created_at","r":false,"sh":"Time created at.","t":"`$STRING`","key$":"created_at","index$":0},"dataset_name":{"a":true,"h":"Dataset Name","n":"dataset_name","r":false,"sh":"Name of the dataset.","t":"`$STRING`","key$":"dataset_name","index$":1},"dataset_paradigm":{"a":true,"h":"Dataset Paradigm","n":"dataset_paradigm","r":false,"sh":"EvaluationDatasetParadigm is the row/content shape of a dataset, orthogonal to the surface in EvaluationDatasetType (e.g.","t":"`$STRING`","key$":"dataset_paradigm","index$":2},"dataset_type":{"a":true,"h":"Dataset Type","n":"dataset_type","r":false,"t":"`$STRING`","key$":"dataset_type","index$":3},"dataset_uuid":{"a":true,"h":"Dataset Uuid","n":"dataset_uuid","r":false,"sh":"UUID of the dataset.","t":"`$STRING`","key$":"dataset_uuid","index$":4},"evaluation_dataset_uuid":{"a":true,"h":"Evaluation Dataset Uuid","n":"evaluation_dataset_uuid","r":false,"sh":"Evaluation dataset uuid.","t":"`$STRING`","key$":"evaluation_dataset_uuid","index$":5},"file_size":{"a":true,"fo":"uint64","h":"File Size","n":"file_size","r":false,"sh":"The size of the dataset uploaded file in bytes.","t":"`$STRING`","key$":"file_size","index$":6},"file_upload_dataset":{"a":true,"h":"File Upload Dataset","n":"file_upload_dataset","r":false,"sh":"File to upload as data source for knowledge base.","t":"`$OBJECT`","key$":"file_upload_dataset","index$":7},"has_ground_truth":{"a":true,"h":"Has Ground Truth","n":"has_ground_truth","r":false,"sh":"Does the dataset have a ground truth column?","t":"`$BOOLEAN`","key$":"has_ground_truth","index$":8},"name":{"a":true,"h":"Name","n":"name","r":false,"sh":"The name of the agent evaluation dataset.","t":"`$STRING`","key$":"name","index$":9},"row_count":{"a":true,"fo":"int64","h":"Row Count","n":"row_count","r":false,"sh":"Number of rows in the dataset.","t":"`$INTEGER`","key$":"row_count","index$":10}},"name":"api_delete_evaluation_dataset_output","op":{"create":{"input":"data","name":"create","points":[{"a":true,"co":{"id":"POST /v2/gen-ai/evaluation_datasets","source":"openapi3","version":2},"g":{},"k":"http","m":"POST","o":"/v2/gen-ai/evaluation_datasets","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v2"},{"lit":"gen-ai"},{"lit":"evaluation_datasets"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"},"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /v2/gen-ai/evaluation_datasets","source":"openapi3","version":2},"g":{"query":[{"a":true,"ex":"EVALUATION_DATASET_PARADIGM_SINGLE_TURN","k":"query","n":"dataset_paradigm","or":"dataset_paradigm","r":false,"t":"`$STRING`","index$":0},{"a":true,"ex":"EVALUATION_DATASET_TYPE_UNKNOWN","k":"query","n":"dataset_type","or":"dataset_type","r":false,"t":"`$STRING`","index$":1},{"a":true,"ex":true,"k":"query","n":"has_ground_truth","or":"has_ground_truth","r":false,"t":"`$BOOLEAN`","index$":2}]},"k":"http","m":"GET","o":"/v2/gen-ai/evaluation_datasets","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v2"},{"lit":"gen-ai"},{"lit":"evaluation_datasets"}],"t":{"req":"`reqdata`","res":"`body.evaluation_datasets`"},"index$":0}],"key$":"list"},"remove":{"input":"data","name":"remove","points":[{"a":true,"co":{"id":"DELETE /v2/gen-ai/evaluation_datasets/{dataset_uuid}","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":"\"123e4567-e89b-12d3-a456-426614174000\"","k":"param","n":"dataset_uuid","or":"dataset_uuid","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"DELETE","o":"/v2/gen-ai/evaluation_datasets/{dataset_uuid}","q":{"exist":["dataset_uuid"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v2"},{"lit":"gen-ai"},{"lit":"evaluation_datasets"},{"var":"dataset_uuid"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"remove"}},"relations":{"ancestors":[]},"key$":"api_delete_evaluation_dataset_output","name__orig":"api_delete_evaluation_dataset_output","Name":"ApiDeleteEvaluationDatasetOutput","name_":"api_delete_evaluation_dataset_output","name-":"api-delete-evaluation-dataset-output","NAME":"API_DELETE_EVALUATION_DATASET_OUTPUT","index$":15}, {"active":true,"entity":"api_delete_evaluation_dataset_output","key$":"BasicApiDeleteEvaluationDatasetOutputFlow","kind":"basic","name":"BasicApiDeleteEvaluationDatasetOutputFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"api_delete_evaluation_dataset_output_ref01"},"m":{},"o":"create","s":[],"v":[],"index$":0},{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"api_delete_evaluation_dataset_output_ref01"}}],"index$":1},{"a":true,"d":{},"i":{"ref":"api_delete_evaluation_dataset_output_ref01","suffix":"_rm0"},"m":{"id":"api_delete_evaluation_dataset_output01"},"o":"remove","s":[],"v":[],"index$":2},{"a":true,"d":{},"i":{"suffix":"_rt0"},"m":{},"o":"list","s":[],"v":[{"apply":"ItemNotExists","def":{"ref":"api_delete_evaluation_dataset_output_ref01"}}],"index$":3}]}, 'ApiDeleteEvaluationDatasetOutput', {"POST /v2/gen-ai/evaluation_datasets":{"protocol":"http","requestBody":{"content":{"application/json":{"schema":{"description":"Creates an evaluation dataset for an agent","properties":{"dataset_paradigm":{"default":"EVALUATION_DATASET_PARADIGM_SINGLE_TURN","description":"EvaluationDatasetParadigm is the row/content shape of a dataset, orthogonal to the\nsurface in EvaluationDatasetType (e.g. a model dataset can be single- or multi-turn).","enum":["EVALUATION_DATASET_PARADIGM_SINGLE_TURN","EVALUATION_DATASET_PARADIGM_MULTI_TURN","EVALUATION_DATASET_PARADIGM_CODING","EVALUATION_DATASET_PARADIGM_N_PLUS_1"],"example":"EVALUATION_DATASET_PARADIGM_SINGLE_TURN","type":"string","x-ref":"#/components/schemas/apiEvaluationDatasetParadigm","key$":"dataset_paradigm"},"dataset_type":{"default":"EVALUATION_DATASET_TYPE_UNKNOWN","enum":["EVALUATION_DATASET_TYPE_UNKNOWN","EVALUATION_DATASET_TYPE_MODEL"],"example":"EVALUATION_DATASET_TYPE_UNKNOWN","type":"string","x-ref":"#/components/schemas/apiEvaluationDatasetType","key$":"dataset_type"},"file_upload_dataset":{"description":"File to upload as data source for knowledge base.","properties":{"original_file_name":{"description":"The original file name","example":"example name","type":"string"},"size_in_bytes":{"description":"The size of the file in bytes","example":"12345","format":"uint64","type":"string"},"stored_object_key":{"description":"The object key the file was stored as","example":"example string","type":"string"}},"type":"object","x-ref":"#/components/schemas/apiFileUploadDataSource","key$":"file_upload_dataset"},"name":{"description":"The name of the agent evaluation dataset.","example":"example name","type":"string","key$":"name"}},"type":"object","x-ref":"#/components/schemas/apiCreateEvaluationDatasetInputPublic","index$":1}}}},"parameters":[]},"GET /v2/gen-ai/evaluation_datasets":{"protocol":"http","parameters":[{"description":"Filter by evaluation dataset type.","example":"EVALUATION_DATASET_TYPE_UNKNOWN","in":"query","name":"dataset_type","schema":{"default":"EVALUATION_DATASET_TYPE_UNKNOWN","enum":["EVALUATION_DATASET_TYPE_UNKNOWN","EVALUATION_DATASET_TYPE_MODEL"],"type":"string"},"index$":0},{"description":"Filter by evaluation dataset paradigm (row/content shape).","example":"EVALUATION_DATASET_PARADIGM_SINGLE_TURN","in":"query","name":"dataset_paradigm","schema":{"default":"EVALUATION_DATASET_PARADIGM_SINGLE_TURN","description":"EvaluationDatasetParadigm is the row/content shape of a dataset, orthogonal to the\nsurface in EvaluationDatasetType (e.g. a model dataset can be single- or multi-turn).","enum":["EVALUATION_DATASET_PARADIGM_SINGLE_TURN","EVALUATION_DATASET_PARADIGM_MULTI_TURN","EVALUATION_DATASET_PARADIGM_CODING","EVALUATION_DATASET_PARADIGM_N_PLUS_1"],"example":"EVALUATION_DATASET_PARADIGM_SINGLE_TURN","type":"string","x-ref":"#/components/schemas/apiEvaluationDatasetParadigm"},"index$":1},{"description":"Filter by whether the dataset includes ground-truth values.","example":true,"in":"query","name":"has_ground_truth","schema":{"type":"boolean"},"index$":2}]},"DELETE /v2/gen-ai/evaluation_datasets/{dataset_uuid}":{"protocol":"http","parameters":[{"description":"UUID of the evaluation dataset to delete.","example":"\"123e4567-e89b-12d3-a456-426614174000\"","in":"path","name":"dataset_uuid","required":true,"schema":{"type":"string"},"index$":0}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const api_delete_evaluation_dataset_output_ref01_ent = client.ApiDeleteEvaluationDatasetOutput()
    let api_delete_evaluation_dataset_output_ref01_data = setup.data.new.api_delete_evaluation_dataset_output['api_delete_evaluation_dataset_output_ref01']

    api_delete_evaluation_dataset_output_ref01_data = (await api_delete_evaluation_dataset_output_ref01_ent.create(api_delete_evaluation_dataset_output_ref01_data)).data()
    assert(null != api_delete_evaluation_dataset_output_ref01_data)


    // LIST
    const api_delete_evaluation_dataset_output_ref01_match: any = {}

    const api_delete_evaluation_dataset_output_ref01_list = (await api_delete_evaluation_dataset_output_ref01_ent.list(api_delete_evaluation_dataset_output_ref01_match)).map((e: any) => e.data())



    // LIST
    const api_delete_evaluation_dataset_output_ref01_match_rt0: any = {}

    const api_delete_evaluation_dataset_output_ref01_list_rt0 = (await api_delete_evaluation_dataset_output_ref01_ent.list(api_delete_evaluation_dataset_output_ref01_match_rt0)).map((e: any) => e.data())


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
      '../../../../.sdk/test/entity/api_delete_evaluation_dataset_output/ApiDeleteEvaluationDatasetOutputTestData.json')

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
    ['api_delete_evaluation_dataset_output01','api_delete_evaluation_dataset_output02','api_delete_evaluation_dataset_output03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'DIGITALOCEAN_TEST_API_DELETE_EVALUATION_DATASET_OUTPUT_ENTID': idmap,
    'DIGITALOCEAN_TEST_LIVE': 'FALSE',
    'DIGITALOCEAN_TEST_EXPLAIN': 'FALSE',
    'DIGITALOCEAN_APIKEY': '',
  })

  idmap = env['DIGITALOCEAN_TEST_API_DELETE_EVALUATION_DATASET_OUTPUT_ENTID']

  const live = 'TRUE' === env.DIGITALOCEAN_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['DIGITALOCEAN_TEST_API_DELETE_EVALUATION_DATASET_OUTPUT_ENTID']
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
  
