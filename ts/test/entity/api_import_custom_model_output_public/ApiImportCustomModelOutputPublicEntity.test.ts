

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


describe('ApiImportCustomModelOutputPublicEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when DIGITALOCEAN_TEST_LIVE=TRUE.
  afterEach(liveDelay('DIGITALOCEAN_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = DigitaloceanSDK.test()
    const ent = testsdk.ApiImportCustomModelOutputPublic()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = DigitaloceanSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.ApiImportCustomModelOutputPublic().create({"accept_hf_token_storage":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.DIGITALOCEAN_TEST_LIVE
    for (const op of ['create']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'api_import_custom_model_output_public.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"accept_hf_token_storage":{"a":true,"h":"Accept Hf Token Storage","n":"accept_hf_token_storage","r":false,"sh":"Whether the caller accepts storage of their HuggingFace token for gated model access","t":"`$BOOLEAN`","key$":"accept_hf_token_storage","index$":0},"accept_terms_and_conditions":{"a":true,"h":"Accept Terms And Conditions","n":"accept_terms_and_conditions","r":false,"sh":"Whether the caller accepts the terms and conditions for importing this model","t":"`$BOOLEAN`","key$":"accept_terms_and_conditions","index$":1},"description":{"a":true,"h":"Description","n":"description","r":false,"sh":"Description of the model","t":"`$STRING`","key$":"description","index$":2},"error":{"a":true,"h":"Error","n":"error","r":false,"t":"`$STRING`","key$":"error","index$":3},"import_job":{"a":true,"h":"Import Job","n":"import_job","r":false,"sh":"Import job tracking for a custom model","t":"`$OBJECT`","key$":"import_job","index$":4},"model":{"a":true,"h":"Model","n":"model","r":false,"sh":"Custom model - user-imported model from HuggingFace, Spaces, etc.","t":"`$OBJECT`","key$":"model","index$":5},"name":{"a":true,"h":"Name","n":"name","r":false,"sh":"Name for the imported model","t":"`$STRING`","key$":"name","index$":6},"preferred_gpu_region":{"a":true,"h":"Preferred Gpu Region","n":"preferred_gpu_region","r":false,"sh":"Preferred GPU region for deployment","t":"`$STRING`","key$":"preferred_gpu_region","index$":7},"source_ref":{"a":true,"h":"Source Ref","n":"source_ref","r":false,"sh":"Reference to the original source of the model","t":"`$OBJECT`","key$":"source_ref","index$":8},"source_type":{"a":true,"h":"Source Type","n":"source_type","r":false,"sh":"Source from which the model was imported","t":"`$STRING`","key$":"source_type","index$":9},"tags":{"a":true,"h":"Tags","n":"tags","r":false,"sh":"User-defined tags for organizing models","t":"`$OBJECT`","key$":"tags","index$":10},"validation_steps":{"a":true,"h":"Validation Steps","n":"validation_steps","r":false,"sh":"Validation steps performed during import","t":"`$ARRAY`","key$":"validation_steps","index$":11}},"name":"api_import_custom_model_output_public","op":{"create":{"input":"data","name":"create","points":[{"a":true,"co":{"id":"POST /v2/gen-ai/custom_models/import","source":"openapi3","version":2},"g":{},"k":"http","m":"POST","o":"/v2/gen-ai/custom_models/import","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v2"},{"lit":"gen-ai"},{"lit":"custom_models"},{"lit":"import"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"}},"relations":{"ancestors":[]},"key$":"api_import_custom_model_output_public","name__orig":"api_import_custom_model_output_public","Name":"ApiImportCustomModelOutputPublic","name_":"api_import_custom_model_output_public","name-":"api-import-custom-model-output-public","NAME":"API_IMPORT_CUSTOM_MODEL_OUTPUT_PUBLIC","index$":54}, {"active":true,"entity":"api_import_custom_model_output_public","key$":"BasicApiImportCustomModelOutputPublicFlow","kind":"basic","name":"BasicApiImportCustomModelOutputPublicFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"api_import_custom_model_output_public_ref01"},"m":{},"o":"create","s":[],"v":[],"index$":0}]}, 'ApiImportCustomModelOutputPublic', {"POST /v2/gen-ai/custom_models/import":{"protocol":"http","requestBody":{"content":{"application/json":{"schema":{"description":"Request to import a custom model (public)","properties":{"accept_hf_token_storage":{"description":"Whether the caller accepts storage of their HuggingFace token for gated model access","example":true,"type":"boolean","key$":"accept_hf_token_storage"},"accept_terms_and_conditions":{"description":"Whether the caller accepts the terms and conditions for importing this model","example":true,"type":"boolean","key$":"accept_terms_and_conditions"},"description":{"description":"Description of the model","example":"Production model for customer support","type":"string","key$":"description"},"name":{"description":"Name for the imported model","example":"my-mistral-7b","type":"string","key$":"name"},"preferred_gpu_region":{"description":"Preferred GPU region for deployment","example":"nyc3","type":"string","key$":"preferred_gpu_region"},"source_ref":{"description":"Reference to the original source of the model","properties":{"access_type":{"default":"ACCESS_TYPE_UNSPECIFIED","description":"Access level required for the model repository","enum":["ACCESS_TYPE_UNSPECIFIED","ACCESS_TYPE_PUBLIC","ACCESS_TYPE_PRIVATE","ACCESS_TYPE_GATED"],"example":"ACCESS_TYPE_UNSPECIFIED","type":"string","x-ref":"#/components/schemas/SourceRefAccessType"},"bucket":{"description":"Spaces bucket name","example":"example string","type":"string"},"commit_sha":{"description":"Git commit SHA of the model version","example":"example string","type":"string"},"hf_token":{"description":"User-provided HuggingFace token for gated/private models (not persisted in source_ref)","example":"example string","type":"string"},"prefix":{"description":"Object prefix path in the bucket","example":"example string","type":"string"},"region":{"description":"Spaces bucket region","example":"example string","type":"string"},"repo_id":{"description":"Huggingface repository identifier","example":"123e4567-e89b-12d3-a456-426614174000","type":"string"}},"type":"object","x-ref":"#/components/schemas/CustomModelSourceRef","key$":"source_ref"},"source_type":{"default":"SOURCE_TYPE_UNSPECIFIED","description":"Source from which the model was imported","enum":["SOURCE_TYPE_UNSPECIFIED","SOURCE_TYPE_HUGGINGFACE","SOURCE_TYPE_SPACES_BUCKET","SOURCE_TYPE_SDK_UPLOAD","SOURCE_TYPE_FINE_TUNING"],"example":"SOURCE_TYPE_UNSPECIFIED","type":"string","x-ref":"#/components/schemas/CustomModelSourceType","key$":"source_type"},"tags":{"description":"User-defined tags for organizing models","properties":{"tags":{"description":"List of tag strings","example":["example string"],"items":{"example":"example string","type":"string"},"type":"array"}},"type":"object","x-ref":"#/components/schemas/CustomModelTags","key$":"tags"}},"type":"object","x-ref":"#/components/schemas/apiImportCustomModelInputPublic","index$":1}}}},"parameters":[]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const api_import_custom_model_output_public_ref01_ent = client.ApiImportCustomModelOutputPublic()
    let api_import_custom_model_output_public_ref01_data = setup.data.new.api_import_custom_model_output_public['api_import_custom_model_output_public_ref01']

    api_import_custom_model_output_public_ref01_data = (await api_import_custom_model_output_public_ref01_ent.create(api_import_custom_model_output_public_ref01_data)).data()
    assert(null != api_import_custom_model_output_public_ref01_data)


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
      '../../../../.sdk/test/entity/api_import_custom_model_output_public/ApiImportCustomModelOutputPublicTestData.json')

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
    ['api_import_custom_model_output_public01','api_import_custom_model_output_public02','api_import_custom_model_output_public03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'DIGITALOCEAN_TEST_API_IMPORT_CUSTOM_MODEL_OUTPUT_PUBLIC_ENTID': idmap,
    'DIGITALOCEAN_TEST_LIVE': 'FALSE',
    'DIGITALOCEAN_TEST_EXPLAIN': 'FALSE',
    'DIGITALOCEAN_APIKEY': '',
  })

  idmap = env['DIGITALOCEAN_TEST_API_IMPORT_CUSTOM_MODEL_OUTPUT_PUBLIC_ENTID']

  const live = 'TRUE' === env.DIGITALOCEAN_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['DIGITALOCEAN_TEST_API_IMPORT_CUSTOM_MODEL_OUTPUT_PUBLIC_ENTID']
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
  
