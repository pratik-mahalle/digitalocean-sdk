

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


describe('VectordbRestoreBackupEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when DIGITALOCEAN_TEST_LIVE=TRUE.
  afterEach(liveDelay('DIGITALOCEAN_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = DigitaloceanSDK.test()
    const ent = testsdk.VectordbRestoreBackup()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = DigitaloceanSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.VectordbRestoreBackup().create({"backup_id":1,"vector_database_id":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.DIGITALOCEAN_TEST_LIVE
    for (const op of ['create']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'vectordb_restore_backup.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"backup_id":{"a":true,"h":"Backup Id","n":"backup_id","r":false,"sh":"The backup ID being restored.","t":"`$STRING`","key$":"backup_id","index$":0},"id":{"a":true,"h":"Id","n":"id","r":false,"sh":"Required.","t":"`$STRING`","key$":"id","index$":1},"status":{"a":true,"h":"Status","n":"status","r":false,"sh":"Initial status of the restore operation (e.g., \"STARTED\").","t":"`$STRING`","key$":"status","index$":2}},"id":{"field":"id","name":"id"},"name":"vectordb_restore_backup","op":{"create":{"input":"data","name":"create","points":[{"a":true,"co":{"id":"POST /v2/vector-databases/{id}/backups/{backup_id}/restore","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":"\"example string\"","k":"param","n":"backup_id","or":"backup_id","r":true,"t":"`$STRING`","index$":0},{"a":true,"ex":"\"example string\"","k":"param","n":"vector_database_id","or":"id","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"POST","o":"/v2/vector-databases/{id}/backups/{backup_id}/restore","q":{"exist":["backup_id","vector_database_id"]},"r":{"param":{"id":"vector_database_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v2"},{"lit":"vector-databases"},{"var":"vector_database_id"},{"lit":"backups"},{"var":"backup_id"},{"lit":"restore"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"}},"relations":{"ancestors":[["$.main.kit.entity.vector_database"]]},"key$":"vectordb_restore_backup","name__orig":"vectordb_restore_backup","Name":"VectordbRestoreBackup","name_":"vectordb_restore_backup","name-":"vectordb-restore-backup","NAME":"VECTORDB_RESTORE_BACKUP","index$":218}, {"active":true,"entity":"vectordb_restore_backup","key$":"BasicVectordbRestoreBackupFlow","kind":"basic","name":"BasicVectordbRestoreBackupFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"vectordb_restore_backup_ref01"},"m":{"backup_id":"backup01","vector_database_id":"vector_database01"},"o":"create","s":[],"v":[],"index$":0}]}, 'VectordbRestoreBackup', {"POST /v2/vector-databases/{id}/backups/{backup_id}/restore":{"protocol":"http","requestBody":{"content":{"application/json":{"schema":{"properties":{"backup_id":{"description":"Required. ID of the backup to restore from.","example":"123e4567-e89b-12d3-a456-426614174000","type":"string","key$":"backup_id"},"id":{"description":"Required. ID of the vector database.","example":"example string","type":"string","key$":"id"}},"type":"object","x-ref":"#/components/schemas/vectordbRestoreBackupRequest","index$":1}}}},"parameters":[{"description":"Required. ID of the vector database.","example":"\"example string\"","in":"path","name":"id","required":true,"schema":{"type":"string"},"index$":0},{"description":"Required. ID of the backup to restore from.","example":"\"example string\"","in":"path","name":"backup_id","required":true,"schema":{"type":"string"},"index$":1}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const vectordb_restore_backup_ref01_ent = client.VectordbRestoreBackup()
    let vectordb_restore_backup_ref01_data = setup.data.new.vectordb_restore_backup['vectordb_restore_backup_ref01']
    vectordb_restore_backup_ref01_data['backup_id'] = setup.idmap['backup01']
    vectordb_restore_backup_ref01_data['vector_database_id'] = setup.idmap['vector_database01']

    vectordb_restore_backup_ref01_data = (await vectordb_restore_backup_ref01_ent.create(vectordb_restore_backup_ref01_data)).data()
    assert(null != vectordb_restore_backup_ref01_data.id)


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
      '../../../../.sdk/test/entity/vectordb_restore_backup/VectordbRestoreBackupTestData.json')

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
    ['vectordb_restore_backup01','vectordb_restore_backup02','vectordb_restore_backup03','vector_database01','vector_database02','vector_database03','backup01'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'DIGITALOCEAN_TEST_VECTORDB_RESTORE_BACKUP_ENTID': idmap,
    'DIGITALOCEAN_TEST_LIVE': 'FALSE',
    'DIGITALOCEAN_TEST_EXPLAIN': 'FALSE',
    'DIGITALOCEAN_APIKEY': '',
  })

  idmap = env['DIGITALOCEAN_TEST_VECTORDB_RESTORE_BACKUP_ENTID']

  const live = 'TRUE' === env.DIGITALOCEAN_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['DIGITALOCEAN_TEST_VECTORDB_RESTORE_BACKUP_ENTID']
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
  
