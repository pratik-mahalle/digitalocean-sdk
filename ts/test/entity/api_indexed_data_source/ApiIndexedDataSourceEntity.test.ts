

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


describe('ApiIndexedDataSourceEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when DIGITALOCEAN_TEST_LIVE=TRUE.
  afterEach(liveDelay('DIGITALOCEAN_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = DigitaloceanSDK.test()
    const ent = testsdk.ApiIndexedDataSource()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = DigitaloceanSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.ApiIndexedDataSource().list({"indexing_job_id":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.DIGITALOCEAN_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'api_indexed_data_source.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"completed_at":{"a":true,"fo":"date-time","h":"Completed At","n":"completed_at","r":false,"sh":"Timestamp when data source completed indexing","t":"`$STRING`","key$":"completed_at","index$":0},"data_source_uuid":{"a":true,"h":"Data Source Uuid","n":"data_source_uuid","r":false,"sh":"Uuid of the indexed data source","t":"`$STRING`","key$":"data_source_uuid","index$":1},"error_details":{"a":true,"h":"Error Details","n":"error_details","r":false,"sh":"A detailed error description","t":"`$STRING`","key$":"error_details","index$":2},"error_msg":{"a":true,"h":"Error Msg","n":"error_msg","r":false,"sh":"A string code provinding a hint which part of the system experienced an error","t":"`$STRING`","key$":"error_msg","index$":3},"failed_item_count":{"a":true,"fo":"uint64","h":"Failed Item Count","n":"failed_item_count","r":false,"sh":"Total count of files that have failed","t":"`$STRING`","key$":"failed_item_count","index$":4},"indexed_file_count":{"a":true,"fo":"uint64","h":"Indexed File Count","n":"indexed_file_count","r":false,"sh":"Total count of files that have been indexed","t":"`$STRING`","key$":"indexed_file_count","index$":5},"indexed_item_count":{"a":true,"fo":"uint64","h":"Indexed Item Count","n":"indexed_item_count","r":false,"sh":"Total count of files that have been indexed","t":"`$STRING`","key$":"indexed_item_count","index$":6},"removed_item_count":{"a":true,"fo":"uint64","h":"Removed Item Count","n":"removed_item_count","r":false,"sh":"Total count of files that have been removed","t":"`$STRING`","key$":"removed_item_count","index$":7},"skipped_item_count":{"a":true,"fo":"uint64","h":"Skipped Item Count","n":"skipped_item_count","r":false,"sh":"Total count of files that have been skipped","t":"`$STRING`","key$":"skipped_item_count","index$":8},"started_at":{"a":true,"fo":"date-time","h":"Started At","n":"started_at","r":false,"sh":"Timestamp when data source started indexing","t":"`$STRING`","key$":"started_at","index$":9},"status":{"a":true,"h":"Status","n":"status","r":false,"t":"`$STRING`","key$":"status","index$":10},"total_bytes":{"a":true,"fo":"uint64","h":"Total Bytes","n":"total_bytes","r":false,"sh":"Total size of files in data source in bytes","t":"`$STRING`","key$":"total_bytes","index$":11},"total_bytes_indexed":{"a":true,"fo":"uint64","h":"Total Bytes Indexed","n":"total_bytes_indexed","r":false,"sh":"Total size of files in data source in bytes that have been indexed","t":"`$STRING`","key$":"total_bytes_indexed","index$":12},"total_file_count":{"a":true,"fo":"uint64","h":"Total File Count","n":"total_file_count","r":false,"sh":"Total file count in the data source","t":"`$STRING`","key$":"total_file_count","index$":13}},"name":"api_indexed_data_source","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /v2/gen-ai/indexing_jobs/{indexing_job_uuid}/data_sources","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":"\"123e4567-e89b-12d3-a456-426614174000\"","k":"param","n":"indexing_job_id","or":"indexing_job_uuid","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/v2/gen-ai/indexing_jobs/{indexing_job_uuid}/data_sources","q":{"exist":["indexing_job_id"]},"r":{"param":{"indexing_job_uuid":"indexing_job_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v2"},{"lit":"gen-ai"},{"lit":"indexing_jobs"},{"var":"indexing_job_id"},{"lit":"data_sources"}],"t":{"req":"`reqdata`","res":"`body.indexed_data_sources`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"api_indexed_data_source","name__orig":"api_indexed_data_source","Name":"ApiIndexedDataSource","name_":"api_indexed_data_source","name-":"api-indexed-data-source","NAME":"API_INDEXED_DATA_SOURCE","index$":53}, {"active":true,"entity":"api_indexed_data_source","key$":"BasicApiIndexedDataSourceFlow","kind":"basic","name":"BasicApiIndexedDataSourceFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{"indexing_job_id":"indexing_job01"},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"api_indexed_data_source_ref01"}}],"index$":0}]}, 'ApiIndexedDataSource', {"GET /v2/gen-ai/indexing_jobs/{indexing_job_uuid}/data_sources":{"protocol":"http","parameters":[{"description":"Uuid of the indexing job","example":"\"123e4567-e89b-12d3-a456-426614174000\"","in":"path","name":"indexing_job_uuid","required":true,"schema":{"type":"string"},"index$":0}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let api_indexed_data_source_ref01_data = Object.values(setup.data.existing.api_indexed_data_source)[0] as any

    // LIST
    const api_indexed_data_source_ref01_ent = client.ApiIndexedDataSource()
    const api_indexed_data_source_ref01_match: any = {}
    api_indexed_data_source_ref01_match['indexing_job_id'] = setup.idmap['indexing_job01']

    const api_indexed_data_source_ref01_list = (await api_indexed_data_source_ref01_ent.list(api_indexed_data_source_ref01_match)).map((e: any) => e.data())


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
      '../../../../.sdk/test/entity/api_indexed_data_source/ApiIndexedDataSourceTestData.json')

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
    ['api_indexed_data_source01','api_indexed_data_source02','api_indexed_data_source03','indexing_job01'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'DIGITALOCEAN_TEST_API_INDEXED_DATA_SOURCE_ENTID': idmap,
    'DIGITALOCEAN_TEST_LIVE': 'FALSE',
    'DIGITALOCEAN_TEST_EXPLAIN': 'FALSE',
    'DIGITALOCEAN_APIKEY': '',
  })

  idmap = env['DIGITALOCEAN_TEST_API_INDEXED_DATA_SOURCE_ENTID']

  const live = 'TRUE' === env.DIGITALOCEAN_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['DIGITALOCEAN_TEST_API_INDEXED_DATA_SOURCE_ENTID']
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
  
