

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


describe('VectordbBackupEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when DIGITALOCEAN_TEST_LIVE=TRUE.
  afterEach(liveDelay('DIGITALOCEAN_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = DigitaloceanSDK.test()
    const ent = testsdk.VectordbBackup()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = DigitaloceanSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.VectordbBackup().list({"vector_database_id":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.DIGITALOCEAN_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'vectordb_backup.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"backup_id":{"a":true,"h":"Backup Id","n":"backup_id","r":false,"sh":"Unique identifier for the backup (e.g., \"vectordb-{uuid}-20240101-120000\").","t":"`$STRING`","key$":"backup_id","index$":0},"completed_at":{"a":true,"fo":"date-time","h":"Completed At","n":"completed_at","r":false,"sh":"Timestamp when the backup process completed.","t":"`$STRING`","key$":"completed_at","index$":1},"started_at":{"a":true,"fo":"date-time","h":"Started At","n":"started_at","r":false,"sh":"Timestamp when the backup process started.","t":"`$STRING`","key$":"started_at","index$":2},"status":{"a":true,"h":"Status","n":"status","r":false,"sh":"Status of the backup: SUCCESS.","t":"`$STRING`","key$":"status","index$":3}},"name":"vectordb_backup","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /v2/vector-databases/{id}/backups","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":"\"example string\"","k":"param","n":"vector_database_id","or":"id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/v2/vector-databases/{id}/backups","q":{"exist":["vector_database_id"]},"r":{"param":{"id":"vector_database_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v2"},{"lit":"vector-databases"},{"var":"vector_database_id"},{"lit":"backups"}],"t":{"req":"`reqdata`","res":"`body.backups`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[["$.main.kit.entity.vector_database"]]},"key$":"vectordb_backup","name__orig":"vectordb_backup","Name":"VectordbBackup","name_":"vectordb_backup","name-":"vectordb-backup","NAME":"VECTORDB_BACKUP","index$":214}, {"active":true,"entity":"vectordb_backup","key$":"BasicVectordbBackupFlow","kind":"basic","name":"BasicVectordbBackupFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{"vector_database_id":"vector_database01"},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"vectordb_backup_ref01"}}],"index$":0}]}, 'VectordbBackup', {"GET /v2/vector-databases/{id}/backups":{"protocol":"http","parameters":[{"description":"Required. ID of the vector database.","example":"\"example string\"","in":"path","name":"id","required":true,"schema":{"type":"string"},"index$":0}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let vectordb_backup_ref01_data = Object.values(setup.data.existing.vectordb_backup)[0] as any

    // LIST
    const vectordb_backup_ref01_ent = client.VectordbBackup()
    const vectordb_backup_ref01_match: any = {}
    vectordb_backup_ref01_match['vector_database_id'] = setup.idmap['vector_database01']

    const vectordb_backup_ref01_list = (await vectordb_backup_ref01_ent.list(vectordb_backup_ref01_match)).map((e: any) => e.data())


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
      '../../../../.sdk/test/entity/vectordb_backup/VectordbBackupTestData.json')

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
    ['vectordb_backup01','vectordb_backup02','vectordb_backup03','vector_database01','vector_database02','vector_database03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'DIGITALOCEAN_TEST_VECTORDB_BACKUP_ENTID': idmap,
    'DIGITALOCEAN_TEST_LIVE': 'FALSE',
    'DIGITALOCEAN_TEST_EXPLAIN': 'FALSE',
    'DIGITALOCEAN_APIKEY': '',
  })

  idmap = env['DIGITALOCEAN_TEST_VECTORDB_BACKUP_ENTID']

  const live = 'TRUE' === env.DIGITALOCEAN_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['DIGITALOCEAN_TEST_VECTORDB_BACKUP_ENTID']
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
  
