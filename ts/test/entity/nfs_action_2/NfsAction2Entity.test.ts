

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


describe('NfsAction2Entity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when DIGITALOCEAN_TEST_LIVE=TRUE.
  afterEach(liveDelay('DIGITALOCEAN_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = DigitaloceanSDK.test()
    const ent = testsdk.NfsAction2()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = DigitaloceanSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.NfsAction2().create({"id":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.DIGITALOCEAN_TEST_LIVE
    for (const op of []) {
      if (!live && maybeSkipControl(t, 'entityOp', 'nfs_action_2.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"id":{"a":true,"h":"Id","n":"id","r":false,"t":"`$STRING`","key$":"id","index$":0}},"id":{"field":"id","name":"id"},"name":"nfs_action_2","op":{"create":{"input":"data","name":"create","points":[{"a":true,"co":{"id":"POST /v2/nfs/{nfs_id}/actions","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":"0a1b2c3d-4e5f-6a7b-8c9d-0e1f2a3b4c5d","k":"param","n":"id","or":"nfs_id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"POST","o":"/v2/nfs/{nfs_id}/actions","q":{"$action":"actions","exist":["id"]},"r":{"param":{"nfs_id":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v2"},{"lit":"nfs"},{"var":"id"},{"lit":"actions"}],"t":{"req":"`reqdata`","res":"`body.action`"},"index$":0}],"key$":"create"}},"relations":{"ancestors":[]},"key$":"nfs_action_2","name__orig":"nfs_action_2","Name":"NfsAction2","name_":"nfs_action_2","name-":"nfs-action-2","NAME":"NFS_ACTION_2","index$":184}, {"active":true,"entity":"nfs_action_2","key$":"BasicNfsAction2Flow","kind":"basic","name":"BasicNfsAction2Flow","param":{},"step":[{"a":false,"d":{},"i":{"ref":"nfs_action_2_ref01"},"m":{"nfs_id":"nfs01"},"o":"create","s":[],"v":[],"unreachable":true}]}, 'NfsAction2', {"POST /v2/nfs/{nfs_id}/actions":{"protocol":"http","requestBody":{"required":true,"description":"The `type` attribute set in the request body will specify the  action that\nwill be taken on the NFS share. Some actions will require additional\nattributes to be set as well.\n","content":{"application/json":{"schema":{"anyOf":[{"allOf":[{"required":["type"],"type":"object","description":"Specifies the action that will be taken on the NFS share.","properties":{"type":{},"region":{}},"x-ref":"#/components/schemas/nfs_action"},{"type":"object","properties":{"params":{}}}],"x-ref":"#/components/schemas/nfs_action_resize"},{"allOf":[{"required":["type"],"type":"object","description":"Specifies the action that will be taken on the NFS share.","properties":{"type":{},"region":{}},"x-ref":"#/components/schemas/nfs_action"},{"type":"object","properties":{"params":{}}}],"x-ref":"#/components/schemas/nfs_action_snapshot"},{"allOf":[{"required":["type"],"type":"object","description":"Specifies the action that will be taken on the NFS share.","properties":{"type":{},"region":{}},"x-ref":"#/components/schemas/nfs_action"},{"type":"object","properties":{"params":{}}}],"x-ref":"#/components/schemas/nfs_action_attach"},{"allOf":[{"required":["type"],"type":"object","description":"Specifies the action that will be taken on the NFS share.","properties":{"type":{},"region":{}},"x-ref":"#/components/schemas/nfs_action"},{"type":"object","properties":{"params":{}}}],"x-ref":"#/components/schemas/nfs_action_detach"},{"allOf":[{"required":["type"],"type":"object","description":"Specifies the action that will be taken on the NFS share.","properties":{"type":{},"region":{}},"x-ref":"#/components/schemas/nfs_action"},{"type":"object","properties":{"params":{}}}],"x-ref":"#/components/schemas/nfs_action_reassign"},{"allOf":[{"required":["type"],"type":"object","description":"Specifies the action that will be taken on the NFS share.","properties":{"type":{},"region":{}},"x-ref":"#/components/schemas/nfs_action"},{"type":"object","properties":{"params":{}}}],"x-ref":"#/components/schemas/nfs_action_switch_performance_tier"}],"discriminator":{"propertyName":"type","mapping":{"resize":"#/components/schemas/nfs_action_resize","snapshot":"#/components/schemas/nfs_action_snapshot","attach":"#/components/schemas/nfs_action_attach","detach":"#/components/schemas/nfs_action_detach","reassign":"#/components/schemas/nfs_action_reassign","switch_performance_tier":"#/components/schemas/nfs_action_switch_performance_tier"}}}}}},"parameters":[{"in":"path","name":"nfs_id","description":"The unique ID of the NFS share","required":true,"schema":{"type":"string"},"example":"0a1b2c3d-4e5f-6a7b-8c9d-0e1f2a3b4c5d","x-ref":"#/components/parameters/nfs_id","index$":0}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let nfs_action_2_ref01_data = Object.values(setup.data.existing.nfs_action_2)[0] as any

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
      '../../../../.sdk/test/entity/nfs_action_2/NfsAction2TestData.json')

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
    ['nfs_action_201','nfs_action_202','nfs_action_203'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'DIGITALOCEAN_TEST_NFS_ACTION_2_ENTID': idmap,
    'DIGITALOCEAN_TEST_LIVE': 'FALSE',
    'DIGITALOCEAN_TEST_EXPLAIN': 'FALSE',
    'DIGITALOCEAN_APIKEY': '',
  })

  idmap = env['DIGITALOCEAN_TEST_NFS_ACTION_2_ENTID']

  const live = 'TRUE' === env.DIGITALOCEAN_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['DIGITALOCEAN_TEST_NFS_ACTION_2_ENTID']
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
  
