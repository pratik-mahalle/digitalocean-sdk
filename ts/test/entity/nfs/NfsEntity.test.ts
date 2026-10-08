

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


describe('NfsEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when DIGITALOCEAN_TEST_LIVE=TRUE.
  afterEach(liveDelay('DIGITALOCEAN_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = DigitaloceanSDK.test()
    const ent = testsdk.Nfs()
    assert(null != ent)
  })


  class FailHook extends BaseFeature {
    name = 'failhook'
    version = '0.0.1'
    active = true
    unexpected = 0
    init() { }
    PreSpec() { throw new Error('nfs hook failed') }
    PreUnexpected() { this.unexpected++ }
  }

  test('stream-error', async () => {
    const offline = { net: { offline: true } }
    await assert.rejects(async () => {
      for await (const _item of DigitaloceanSDK.test(offline).Nfs().stream('list')) { }
    }, /offline/)

    for await (const _item of DigitaloceanSDK.test(offline).Nfs()
      .stream('list', undefined, { ctrl: { throw: false } })) { }

    if (null != (config as any).feature?.rbac) {
      const denied = DigitaloceanSDK.test(undefined, { feature: { rbac: { active: true, deny: true } } })
      await assert.rejects(async () => {
        for await (const _item of denied.Nfs().stream('list')) { }
      }, (err: any) => 'rbac_denied' === err.code)
    }
  })

  test('stream-ctrl', async () => {
    const explain: any = {}
    const ctrl: any = { explain }
    for await (const _item of DigitaloceanSDK.test().Nfs().stream('list', undefined, { ctrl })) { }
    assert.deepStrictEqual(Object.keys(ctrl), ['explain'])
    assert(explain === ctrl.explain && 0 < Object.keys(explain).length)
  })

  test('unexpected', async () => {
    const hook = new FailHook()
    const client = new DigitaloceanSDK({ feature: { test: { active: true } }, extend: [hook] })
    await assert.rejects(client.Nfs().list(), /hook failed/)
    assert(0 < hook.unexpected)

    const fired = hook.unexpected
    assert.strictEqual(await client.Nfs().list(undefined, { throw: false }), undefined)
    assert(fired < hook.unexpected)
  })

  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = DigitaloceanSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.Nfs().list({"region":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.DIGITALOCEAN_TEST_LIVE
    for (const op of ['create', 'list', 'load', 'remove']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'nfs.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"access_points":{"a":true,"h":"Access Points","n":"access_points","r":false,"sh":"Access points configured on this share.","t":"`$ARRAY`","key$":"access_points","index$":0},"created_at":{"a":true,"fo":"date-time","h":"Created At","n":"created_at","r":true,"ro":true,"sh":"Timestamp for when the NFS share was created.","t":"`$STRING`","key$":"created_at","index$":1},"host":{"a":true,"h":"Host","n":"host","r":false,"sh":"The host IP of the NFS server that will be accessible from the associated VPC","t":"`$STRING`","key$":"host","index$":2},"id":{"a":true,"h":"Id","n":"id","r":true,"ro":true,"sh":"The unique identifier of the NFS share.","t":"`$STRING`","key$":"id","index$":3},"mount_path":{"a":true,"h":"Mount Path","n":"mount_path","r":false,"sh":"Path at which the share will be available, to be mounted at a target of the user's choice within the client","t":"`$STRING`","key$":"mount_path","index$":4},"name":{"a":true,"h":"Name","n":"name","r":true,"sh":"The human-readable name of the share.","t":"`$STRING`","key$":"name","index$":5},"performance_tier":{"a":true,"h":"Performance Tier","n":"performance_tier","r":false,"sh":"The performance tier of the share.","t":"`$STRING`","key$":"performance_tier","index$":6},"region":{"a":true,"h":"Region","n":"region","r":true,"sh":"The DigitalOcean region slug (e.g., nyc2, atl1) where the NFS share resides.","t":"`$STRING`","key$":"region","index$":7},"size_gib":{"a":true,"h":"Size Gib","n":"size_gib","r":true,"sh":"The desired/provisioned size of the share in GiB (Gibibytes).","t":"`$INTEGER`","key$":"size_gib","index$":8},"status":{"a":true,"h":"Status","n":"status","r":true,"ro":true,"sh":"The current status of the share.","t":"`$STRING`","key$":"status","index$":9},"vpc_ids":{"a":true,"h":"Vpc Ids","n":"vpc_ids","op":{"create":{"req":true,"type":"`$ARRAY`"}},"r":false,"sh":"List of VPC IDs that should be able to access the share.","t":"`$ARRAY`","key$":"vpc_ids","index$":10}},"id":{"field":"id","name":"id"},"name":"nfs","op":{"create":{"input":"data","name":"create","points":[{"a":true,"co":{"id":"POST /v2/nfs","source":"openapi3","version":2},"g":{},"k":"http","m":"POST","o":"/v2/nfs","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v2"},{"lit":"nfs"}],"t":{"req":"`reqdata`","res":"`body.share`"},"index$":0}],"key$":"create"},"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /v2/nfs","source":"openapi3","version":2},"g":{"query":[{"a":true,"ex":"atl1","k":"query","n":"region","or":"region","r":false,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/v2/nfs","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v2"},{"lit":"nfs"}],"t":{"req":"`reqdata`","res":"`body.shares`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /v2/nfs/{nfs_id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":"0a1b2c3d-4e5f-6a7b-8c9d-0e1f2a3b4c5d","k":"param","n":"id","or":"nfs_id","r":true,"t":"`$STRING`","index$":0}],"query":[{"a":true,"ex":"atl1","k":"query","n":"region","or":"region","r":false,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/v2/nfs/{nfs_id}","q":{"exist":["id"]},"r":{"param":{"nfs_id":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v2"},{"lit":"nfs"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body.share`"},"index$":0}],"key$":"load"},"remove":{"input":"data","name":"remove","points":[{"a":true,"co":{"id":"DELETE /v2/nfs/{nfs_id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":"0a1b2c3d-4e5f-6a7b-8c9d-0e1f2a3b4c5d","k":"param","n":"id","or":"nfs_id","r":true,"t":"`$STRING`","index$":0}],"query":[{"a":true,"ex":"atl1","k":"query","n":"region","or":"region","r":false,"t":"`$STRING`","index$":0}]},"k":"http","m":"DELETE","o":"/v2/nfs/{nfs_id}","q":{"exist":["id"]},"r":{"param":{"nfs_id":"id"}},"s":[{"lit":"v2"},{"lit":"nfs"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0},{"a":true,"co":{"id":"DELETE /v2/nfs/snapshots/{nfs_snapshot_id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":"0a1b2c3d-4e5f-6a7b-8c9d-0e1f2a3b4c5d","k":"param","n":"nfs_snapshot_id","or":"nfs_snapshot_id","r":true,"t":"`$STRING`","index$":0}],"query":[{"a":true,"ex":"atl1","k":"query","n":"region","or":"region","r":false,"t":"`$STRING`","index$":0}]},"k":"http","m":"DELETE","o":"/v2/nfs/snapshots/{nfs_snapshot_id}","q":{"exist":["nfs_snapshot_id"]},"r":{},"s":[{"lit":"v2"},{"lit":"nfs"},{"lit":"snapshots"},{"var":"nfs_snapshot_id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":1}],"key$":"remove"}},"relations":{"ancestors":[["$.main.kit.entity.snapshot"]]},"key$":"nfs","name__orig":"nfs","Name":"Nfs","name_":"nfs","name-":"nfs","NAME":"NFS","index$":183}, {"active":true,"entity":"nfs","key$":"BasicNfsFlow","kind":"basic","name":"BasicNfsFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"nfs_ref01"},"m":{},"o":"create","s":[],"v":[],"index$":0},{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"nfs_ref01"}}],"index$":1},{"a":true,"d":{},"i":{"ref":"nfs_ref01","srcdatavar":"nfs_ref01_data","suffix":"_dt0"},"m":{"id":"nfs01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-nfs_ref01"}}],"index$":2},{"a":true,"d":{},"i":{"ref":"nfs_ref01","suffix":"_rm0"},"m":{"id":"nfs01"},"o":"remove","s":[],"v":[],"index$":3},{"a":true,"d":{},"i":{"suffix":"_rt0"},"m":{},"o":"list","s":[],"v":[{"apply":"ItemNotExists","def":{"ref":"nfs_ref01"}}],"index$":4}]}, 'Nfs', {"POST /v2/nfs":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","properties":{"name":{"type":"string","description":"The human-readable name of the share.","example":"my-nfs-share","key$":"name"},"size_gib":{"type":"integer","description":"The desired/provisioned size of the share in GiB (Gibibytes). Must be >= 50.","example":50,"key$":"size_gib"},"region":{"type":"string","description":"The DigitalOcean region slug (e.g., nyc2, atl1) where the NFS share resides.","example":"atl1","key$":"region"},"vpc_ids":{"type":"array","items":{"type":"string"},"description":"List of VPC IDs that should be able to access the share.","example":["796c6fe3-2a1d-4da2-9f3e-38239827dc91"],"key$":"vpc_ids"},"performance_tier":{"type":"string","description":"The performance tier of the share.","example":"standard","key$":"performance_tier"}},"required":["name","size_gib","region","vpc_ids"],"x-ref":"#/components/schemas/nfs_request","index$":1},"examples":{"Basic NFS Share":{"value":{"name":"sammy-share-drive","size_gib":1024,"region":"atl1","vpc_ids":["796c6fe3-2a1d-4da2-9f3e-38239827dc91"],"performance_tier":"standard"}}}}}},"parameters":[]},"GET /v2/nfs":{"protocol":"http","parameters":[{"in":"query","name":"region","description":"The DigitalOcean region slug (e.g., nyc2, atl1) where the NFS share resides.","schema":{"type":"string"},"example":"atl1","x-ref":"#/components/parameters/parameters_region-2","index$":0}]},"GET /v2/nfs/{nfs_id}":{"protocol":"http","parameters":[{"in":"path","name":"nfs_id","description":"The unique ID of the NFS share","required":true,"schema":{"type":"string"},"example":"0a1b2c3d-4e5f-6a7b-8c9d-0e1f2a3b4c5d","x-ref":"#/components/parameters/nfs_id","index$":0},{"in":"query","name":"region","description":"The DigitalOcean region slug (e.g., nyc2, atl1) where the NFS share resides.","schema":{"type":"string"},"example":"atl1","x-ref":"#/components/parameters/parameters_region-2","index$":1}]},"DELETE /v2/nfs/{nfs_id}":{"protocol":"http","parameters":[{"in":"path","name":"nfs_id","description":"The unique ID of the NFS share","required":true,"schema":{"type":"string"},"example":"0a1b2c3d-4e5f-6a7b-8c9d-0e1f2a3b4c5d","x-ref":"#/components/parameters/nfs_id","index$":0},{"in":"query","name":"region","description":"The DigitalOcean region slug (e.g., nyc2, atl1) where the NFS share resides.","schema":{"type":"string"},"example":"atl1","x-ref":"#/components/parameters/parameters_region-2","index$":1}]},"DELETE /v2/nfs/snapshots/{nfs_snapshot_id}":{"protocol":"http","parameters":[{"in":"path","name":"nfs_snapshot_id","description":"The unique ID of the NFS snapshot","required":true,"schema":{"type":"string"},"example":"0a1b2c3d-4e5f-6a7b-8c9d-0e1f2a3b4c5d","x-ref":"#/components/parameters/nfs_snapshot_id","index$":0},{"in":"query","name":"region","description":"The DigitalOcean region slug (e.g., nyc2, atl1) where the NFS share resides.","schema":{"type":"string"},"example":"atl1","x-ref":"#/components/parameters/parameters_region-2","index$":1}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const nfs_ref01_ent = client.Nfs()
    let nfs_ref01_data = setup.data.new.nfs['nfs_ref01']

    nfs_ref01_data = (await nfs_ref01_ent.create(nfs_ref01_data)).data()
    assert(null != nfs_ref01_data.id)


    // LIST
    const nfs_ref01_match: any = {}

    const nfs_ref01_list = (await nfs_ref01_ent.list(nfs_ref01_match)).map((e: any) => e.data())

    assert(!isempty(select(nfs_ref01_list, { id: nfs_ref01_data.id })))


    // LOAD
    const nfs_ref01_match_dt0: any = {}
    nfs_ref01_match_dt0.id = nfs_ref01_data.id
    const nfs_ref01_data_dt0 = (await nfs_ref01_ent.load(nfs_ref01_match_dt0)).data()
    assert(nfs_ref01_data_dt0.id === nfs_ref01_data.id)


    // REMOVE
    const nfs_ref01_match_rm0: any = { id: nfs_ref01_data.id }
    await nfs_ref01_ent.remove(nfs_ref01_match_rm0)
  

    // LIST
    const nfs_ref01_match_rt0: any = {}

    const nfs_ref01_list_rt0 = (await nfs_ref01_ent.list(nfs_ref01_match_rt0)).map((e: any) => e.data())

    assert(isempty(select(nfs_ref01_list_rt0, { id: nfs_ref01_data.id })))


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
      '../../../../.sdk/test/entity/nfs/NfsTestData.json')

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
    ['nfs01','nfs02','nfs03','snapshot01','snapshot02','snapshot03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'DIGITALOCEAN_TEST_NFS_ENTID': idmap,
    'DIGITALOCEAN_TEST_LIVE': 'FALSE',
    'DIGITALOCEAN_TEST_EXPLAIN': 'FALSE',
    'DIGITALOCEAN_APIKEY': '',
  })

  idmap = env['DIGITALOCEAN_TEST_NFS_ENTID']

  const live = 'TRUE' === env.DIGITALOCEAN_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['DIGITALOCEAN_TEST_NFS_ENTID']
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
  
