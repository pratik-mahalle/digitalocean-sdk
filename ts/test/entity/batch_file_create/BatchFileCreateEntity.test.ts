

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


describe('BatchFileCreateEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when DIGITALOCEAN_TEST_LIVE=TRUE.
  afterEach(liveDelay('DIGITALOCEAN_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = DigitaloceanSDK.test()
    const ent = testsdk.BatchFileCreate()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = DigitaloceanSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.BatchFileCreate().create({"file_name":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.DIGITALOCEAN_TEST_LIVE
    for (const op of ['create']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'batch_file_create.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"file_name":{"a":true,"h":"File Name","n":"file_name","r":true,"sh":"The file you plan to upload.","t":"`$STRING`","key$":"file_name","index$":0}},"name":"batch_file_create","op":{"create":{"input":"data","name":"create","points":[{"a":true,"co":{"id":"POST /v1/batches/files","source":"openapi3","version":2},"g":{},"k":"http","m":"POST","o":"/v1/batches/files","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v1"},{"lit":"batches"},{"lit":"files"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"}},"relations":{"ancestors":[]},"key$":"batch_file_create","name__orig":"batch_file_create","Name":"BatchFileCreate","name_":"batch_file_create","name-":"batch-file-create","NAME":"BATCH_FILE_CREATE","index$":119}, {"active":true,"entity":"batch_file_create","key$":"BasicBatchFileCreateFlow","kind":"basic","name":"BasicBatchFileCreateFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"batch_file_create_ref01"},"m":{},"o":"create","s":[],"v":[],"index$":0}]}, 'BatchFileCreate', {"POST /v1/batches/files":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","title":"BatchFileCreateRequest","description":"Request body for creating a batch input file intent.","required":["file_name"],"properties":{"file_name":{"type":"string","description":"The file you plan to upload. Must end with `.jsonl` (case-insensitive) and contain one request per line in the schema expected by the target `provider`.\n","minLength":7,"pattern":".+\\.[Jj][Ss][Oo][Nn][Ll]$","example":"batch_requests.jsonl","key$":"file_name"}},"x-ref":"#/components/schemas/batch_file_create_request","index$":1},"examples":{"Default":{"value":{"file_name":"batch_requests.jsonl"}}}}}},"parameters":[]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const batch_file_create_ref01_ent = client.BatchFileCreate()
    let batch_file_create_ref01_data = setup.data.new.batch_file_create['batch_file_create_ref01']

    batch_file_create_ref01_data = (await batch_file_create_ref01_ent.create(batch_file_create_ref01_data)).data()
    assert(null != batch_file_create_ref01_data)


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
      '../../../../.sdk/test/entity/batch_file_create/BatchFileCreateTestData.json')

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
    ['batch_file_create01','batch_file_create02','batch_file_create03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'DIGITALOCEAN_TEST_BATCH_FILE_CREATE_ENTID': idmap,
    'DIGITALOCEAN_TEST_LIVE': 'FALSE',
    'DIGITALOCEAN_TEST_EXPLAIN': 'FALSE',
    'DIGITALOCEAN_APIKEY': '',
  })

  idmap = env['DIGITALOCEAN_TEST_BATCH_FILE_CREATE_ENTID']

  const live = 'TRUE' === env.DIGITALOCEAN_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['DIGITALOCEAN_TEST_BATCH_FILE_CREATE_ENTID']
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
  
