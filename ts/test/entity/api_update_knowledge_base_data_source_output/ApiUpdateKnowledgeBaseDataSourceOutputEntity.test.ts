

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


describe('ApiUpdateKnowledgeBaseDataSourceOutputEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when DIGITALOCEAN_TEST_LIVE=TRUE.
  afterEach(liveDelay('DIGITALOCEAN_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = DigitaloceanSDK.test()
    const ent = testsdk.ApiUpdateKnowledgeBaseDataSourceOutput()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = DigitaloceanSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.ApiUpdateKnowledgeBaseDataSourceOutput().update({"data_source_uuid":1,"knowledge_base_id":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.DIGITALOCEAN_TEST_LIVE
    for (const op of []) {
      if (!live && maybeSkipControl(t, 'entityOp', 'api_update_knowledge_base_data_source_output.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"aws_data_source":{"a":true,"h":"Aws Data Source","n":"aws_data_source","r":false,"sh":"AWS S3 Data Source for Display","t":"`$OBJECT`","key$":"aws_data_source","index$":0},"bucket_name":{"a":true,"h":"Bucket Name","n":"bucket_name","r":false,"sh":"Name of storage bucket - Deprecated, moved to data_source_details","t":"`$STRING`","key$":"bucket_name","index$":1},"chunking_algorithm":{"a":true,"h":"Chunking Algorithm","n":"chunking_algorithm","r":false,"t":"`$STRING`","key$":"chunking_algorithm","index$":2},"chunking_options":{"a":true,"h":"Chunking Options","n":"chunking_options","r":false,"t":"`$OBJECT`","key$":"chunking_options","index$":3},"created_at":{"a":true,"fo":"date-time","h":"Created At","n":"created_at","r":false,"sh":"Creation date / time","t":"`$STRING`","key$":"created_at","index$":4},"data_source_uuid":{"a":true,"h":"Data Source Uuid","n":"data_source_uuid","r":false,"sh":"Data Source ID (Path Parameter)","t":"`$STRING`","key$":"data_source_uuid","index$":5},"dropbox_data_source":{"a":true,"h":"Dropbox Data Source","n":"dropbox_data_source","r":false,"sh":"Dropbox Data Source for Display","t":"`$OBJECT`","key$":"dropbox_data_source","index$":6},"file_upload_data_source":{"a":true,"h":"File Upload Data Source","n":"file_upload_data_source","r":false,"sh":"File to upload as data source for knowledge base.","t":"`$OBJECT`","key$":"file_upload_data_source","index$":7},"google_drive_data_source":{"a":true,"h":"Google Drive Data Source","n":"google_drive_data_source","r":false,"sh":"Google Drive Data Source for Display","t":"`$OBJECT`","key$":"google_drive_data_source","index$":8},"item_path":{"a":true,"h":"Item Path","n":"item_path","r":false,"sh":"Path of folder or object in bucket - Deprecated, moved to data_source_details","t":"`$STRING`","key$":"item_path","index$":9},"knowledge_base_uuid":{"a":true,"h":"Knowledge Base Uuid","n":"knowledge_base_uuid","r":false,"sh":"Knowledge Base ID (Path Parameter)","t":"`$STRING`","key$":"knowledge_base_uuid","index$":10},"last_datasource_indexing_job":{"a":true,"h":"Last Datasource Indexing Job","n":"last_datasource_indexing_job","r":false,"t":"`$OBJECT`","key$":"last_datasource_indexing_job","index$":11},"region":{"a":true,"h":"Region","n":"region","r":false,"sh":"Region code - Deprecated, moved to data_source_details","t":"`$STRING`","key$":"region","index$":12},"spaces_data_source":{"a":true,"h":"Spaces Data Source","n":"spaces_data_source","r":false,"sh":"Spaces Bucket Data Source","t":"`$OBJECT`","key$":"spaces_data_source","index$":13},"updated_at":{"a":true,"fo":"date-time","h":"Updated At","n":"updated_at","r":false,"sh":"Last modified","t":"`$STRING`","key$":"updated_at","index$":14},"uuid":{"a":true,"h":"Uuid","n":"uuid","r":false,"sh":"Unique id of knowledge base","t":"`$STRING`","key$":"uuid","index$":15},"web_crawler_data_source":{"a":true,"h":"Web Crawler Data Source","n":"web_crawler_data_source","r":false,"sh":"WebCrawlerDataSource","t":"`$OBJECT`","key$":"web_crawler_data_source","index$":16}},"name":"api_update_knowledge_base_data_source_output","op":{"update":{"input":"data","name":"update","points":[{"a":true,"co":{"id":"PUT /v2/gen-ai/knowledge_bases/{knowledge_base_uuid}/data_sources/{data_source_uuid}","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":"123e4567-e89b-12d3-a456-426614174000","k":"param","n":"data_source_uuid","or":"data_source_uuid","r":true,"t":"`$STRING`","index$":0},{"a":true,"ex":"123e4567-e89b-12d3-a456-426614174000","k":"param","n":"knowledge_base_id","or":"knowledge_base_uuid","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"PUT","o":"/v2/gen-ai/knowledge_bases/{knowledge_base_uuid}/data_sources/{data_source_uuid}","q":{"exist":["data_source_uuid","knowledge_base_id"]},"r":{"param":{"knowledge_base_uuid":"knowledge_base_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v2"},{"lit":"gen-ai"},{"lit":"knowledge_bases"},{"var":"knowledge_base_id"},{"lit":"data_sources"},{"var":"data_source_uuid"}],"t":{"req":"`reqdata`","res":"`body.knowledge_base_data_source`"},"index$":0}],"key$":"update"}},"relations":{"ancestors":[]},"key$":"api_update_knowledge_base_data_source_output","name__orig":"api_update_knowledge_base_data_source_output","Name":"ApiUpdateKnowledgeBaseDataSourceOutput","name_":"api_update_knowledge_base_data_source_output","name-":"api-update-knowledge-base-data-source-output","NAME":"API_UPDATE_KNOWLEDGE_BASE_DATA_SOURCE_OUTPUT","index$":93}, {"active":true,"entity":"api_update_knowledge_base_data_source_output","key$":"BasicApiUpdateKnowledgeBaseDataSourceOutputFlow","kind":"basic","name":"BasicApiUpdateKnowledgeBaseDataSourceOutputFlow","param":{},"step":[{"a":false,"d":{"knowledge_base_id":"knowledge_base01"},"i":{"ref":"api_update_knowledge_base_data_source_output_ref01","srcdatavar":"api_update_knowledge_base_data_source_output_ref01_data","suffix":"_up0","textfield":"bucket_name"},"m":{},"o":"update","s":[{"apply":"TextFieldMark","def":{"mark":"Mark01-api_update_knowledge_base_data_source_output_ref01"}}],"v":[],"unreachable":true}]}, 'ApiUpdateKnowledgeBaseDataSourceOutput', {"PUT /v2/gen-ai/knowledge_bases/{knowledge_base_uuid}/data_sources/{data_source_uuid}":{"protocol":"http","requestBody":{"content":{"application/json":{"schema":{"description":"Update a data source of a knowledge base with change in chunking algorithm/options","properties":{"chunking_algorithm":{"default":"CHUNKING_ALGORITHM_UNKNOWN","enum":["CHUNKING_ALGORITHM_UNKNOWN","CHUNKING_ALGORITHM_SECTION_BASED","CHUNKING_ALGORITHM_HIERARCHICAL","CHUNKING_ALGORITHM_SEMANTIC","CHUNKING_ALGORITHM_FIXED_LENGTH"],"example":"CHUNKING_ALGORITHM_UNKNOWN","type":"string","x-ref":"#/components/schemas/apiChunkingAlgorithm","key$":"chunking_algorithm"},"chunking_options":{"properties":{"child_chunk_size":{"example":350,"format":"int64","type":"integer"},"max_chunk_size":{"description":"Common options","example":750,"format":"int64","type":"integer"},"parent_chunk_size":{"description":"Hierarchical options","example":1000,"format":"int64","type":"integer"},"semantic_threshold":{"description":"Semantic options","example":0.5,"format":"float","type":"number"}},"type":"object","x-ref":"#/components/schemas/apiChunkingOptions","key$":"chunking_options"},"data_source_uuid":{"description":"Data Source ID (Path Parameter)","example":"\"98765432-1234-1234-1234-123456789012\"","type":"string","key$":"data_source_uuid"},"knowledge_base_uuid":{"description":"Knowledge Base ID (Path Parameter)","example":"\"12345678-1234-1234-1234-123456789012\"","type":"string","key$":"knowledge_base_uuid"}},"type":"object","x-ref":"#/components/schemas/apiUpdateKnowledgeBaseDataSourceInputPublic","index$":1}}}},"parameters":[{"description":"Knowledge Base ID (Path Parameter)","example":"123e4567-e89b-12d3-a456-426614174000","in":"path","name":"knowledge_base_uuid","required":true,"schema":{"type":"string"},"index$":0},{"description":"Data Source ID (Path Parameter)","example":"123e4567-e89b-12d3-a456-426614174000","in":"path","name":"data_source_uuid","required":true,"schema":{"type":"string"},"index$":1}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let api_update_knowledge_base_data_source_output_ref01_data = Object.values(setup.data.existing.api_update_knowledge_base_data_source_output)[0] as any

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
      '../../../../.sdk/test/entity/api_update_knowledge_base_data_source_output/ApiUpdateKnowledgeBaseDataSourceOutputTestData.json')

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
    ['api_update_knowledge_base_data_source_output01','api_update_knowledge_base_data_source_output02','api_update_knowledge_base_data_source_output03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'DIGITALOCEAN_TEST_API_UPDATE_KNOWLEDGE_BASE_DATA_SOURCE_OUTPUT_ENTID': idmap,
    'DIGITALOCEAN_TEST_LIVE': 'FALSE',
    'DIGITALOCEAN_TEST_EXPLAIN': 'FALSE',
    'DIGITALOCEAN_APIKEY': '',
  })

  idmap = env['DIGITALOCEAN_TEST_API_UPDATE_KNOWLEDGE_BASE_DATA_SOURCE_OUTPUT_ENTID']

  const live = 'TRUE' === env.DIGITALOCEAN_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['DIGITALOCEAN_TEST_API_UPDATE_KNOWLEDGE_BASE_DATA_SOURCE_OUTPUT_ENTID']
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
  
