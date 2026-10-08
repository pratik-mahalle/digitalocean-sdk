

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


describe('BlockStorageEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when DIGITALOCEAN_TEST_LIVE=TRUE.
  afterEach(liveDelay('DIGITALOCEAN_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = DigitaloceanSDK.test()
    const ent = testsdk.BlockStorage()
    assert(null != ent)
  })


  class FailHook extends BaseFeature {
    name = 'failhook'
    version = '0.0.1'
    active = true
    unexpected = 0
    init() { }
    PreSpec() { throw new Error('block_storage hook failed') }
    PreUnexpected() { this.unexpected++ }
  }

  test('stream-error', async () => {
    const offline = { net: { offline: true } }
    await assert.rejects(async () => {
      for await (const _item of DigitaloceanSDK.test(offline).BlockStorage().stream('list')) { }
    }, /offline/)

    for await (const _item of DigitaloceanSDK.test(offline).BlockStorage()
      .stream('list', undefined, { ctrl: { throw: false } })) { }

    if (null != (config as any).feature?.rbac) {
      const denied = DigitaloceanSDK.test(undefined, { feature: { rbac: { active: true, deny: true } } })
      await assert.rejects(async () => {
        for await (const _item of denied.BlockStorage().stream('list')) { }
      }, (err: any) => 'rbac_denied' === err.code)
    }
  })

  test('stream-ctrl', async () => {
    const explain: any = {}
    const ctrl: any = { explain }
    for await (const _item of DigitaloceanSDK.test().BlockStorage().stream('list', undefined, { ctrl })) { }
    assert.deepStrictEqual(Object.keys(ctrl), ['explain'])
    assert(explain === ctrl.explain && 0 < Object.keys(explain).length)
  })

  test('unexpected', async () => {
    const hook = new FailHook()
    const client = new DigitaloceanSDK({ feature: { test: { active: true } }, extend: [hook] })
    await assert.rejects(client.BlockStorage().list(), /hook failed/)
    assert(0 < hook.unexpected)

    const fired = hook.unexpected
    assert.strictEqual(await client.BlockStorage().list(undefined, { throw: false }), undefined)
    assert(fired < hook.unexpected)
  })

  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = DigitaloceanSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.BlockStorage().list({"name":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.DIGITALOCEAN_TEST_LIVE
    for (const op of ['create', 'list', 'load', 'remove']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'block_storage.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"created_at":{"a":true,"fo":"date-time","h":"Created At","n":"created_at","op":{"list":{"req":false,"type":"`$STRING`"},"load":{"req":false,"type":"`$STRING`"}},"r":true,"ro":true,"sh":"A time value given in ISO8601 combined date and time format that represents when the snapshot was created.","t":"`$STRING`","key$":"created_at","index$":0},"description":{"a":true,"h":"Description","n":"description","r":false,"sh":"An optional free-form text field to describe a block storage volume.","t":"`$STRING`","key$":"description","index$":1},"droplet_ids":{"a":true,"h":"Droplet Ids","n":"droplet_ids","r":false,"ro":true,"sh":"An array containing the IDs of the Droplets the volume is attached to.","t":"`$ARRAY`","key$":"droplet_ids","index$":2},"filesystem_label":{"a":true,"h":"Filesystem Label","n":"filesystem_label","r":false,"sh":"The label currently applied to the filesystem.","t":"`$STRING`","key$":"filesystem_label","index$":3},"filesystem_type":{"a":true,"h":"Filesystem Type","n":"filesystem_type","r":false,"sh":"The type of filesystem currently in-use on the volume.","t":"`$STRING`","key$":"filesystem_type","index$":4},"id":{"a":true,"h":"Id","n":"id","op":{"list":{"req":false,"type":"`$STRING`"},"load":{"req":false,"type":"`$STRING`"}},"r":true,"ro":true,"sh":"The unique identifier for the snapshot.","t":"`$STRING`","key$":"id","index$":5},"min_disk_size":{"a":true,"h":"Min Disk Size","n":"min_disk_size","r":true,"sh":"The minimum size in GB required for a volume or Droplet to use this snapshot.","t":"`$INTEGER`","key$":"min_disk_size","index$":6},"name":{"a":true,"h":"Name","n":"name","op":{"list":{"req":false,"type":"`$STRING`"},"load":{"req":false,"type":"`$STRING`"}},"r":true,"sh":"A human-readable name for the snapshot.","t":"`$STRING`","key$":"name","index$":7},"region":{"a":true,"h":"Region","n":"region","r":false,"ro":true,"t":"`$ANY`","key$":"region","index$":8},"regions":{"a":true,"h":"Regions","n":"regions","r":true,"sh":"An array of the regions that the snapshot is available in.","t":"`$ARRAY`","key$":"regions","index$":9},"resource_id":{"a":true,"h":"Resource Id","n":"resource_id","r":true,"sh":"The unique identifier for the resource that the snapshot originated from.","t":"`$STRING`","key$":"resource_id","index$":10},"resource_type":{"a":true,"h":"Resource Type","n":"resource_type","r":true,"sh":"The type of resource that the snapshot originated from.","t":"`$STRING`","key$":"resource_type","index$":11},"size_gigabytes":{"a":true,"fo":"float","h":"Size Gigabytes","n":"size_gigabytes","op":{"list":{"req":false,"type":"`$INTEGER`"},"load":{"req":false,"type":"`$INTEGER`"}},"r":true,"sh":"The billable size of the snapshot in gigabytes.","t":"`$NUMBER`","key$":"size_gigabytes","index$":12},"tags":{"a":true,"h":"Tags","n":"tags","op":{"create":{"req":false,"type":"`$ARRAY`"},"list":{"req":false,"type":"`$ARRAY`"},"load":{"req":false,"type":"`$ARRAY`"}},"r":true,"sh":"An array of Tags the snapshot has been tagged with.<br><br>Requires `tag:read` scope.","t":"`$ARRAY`","key$":"tags","index$":13},"volume":{"a":true,"h":"Volume","n":"volume","r":false,"t":"`$OBJECT`","key$":"volume","index$":14}},"id":{"field":"id","name":"id"},"name":"block_storage","op":{"create":{"input":"data","name":"create","points":[{"a":true,"co":{"id":"POST /v2/volumes/{volume_id}/snapshots","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":"7724db7c-e098-11e5-b522-000f53304e51","k":"param","n":"volume_id","or":"volume_id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"POST","o":"/v2/volumes/{volume_id}/snapshots","q":{"exist":["volume_id"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v2"},{"lit":"volumes"},{"var":"volume_id"},{"lit":"snapshots"}],"t":{"req":"`reqdata`","res":"`body.snapshot`"},"index$":0},{"a":true,"co":{"id":"POST /v2/volumes","source":"openapi3","version":2},"g":{},"k":"http","m":"POST","o":"/v2/volumes","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v2"},{"lit":"volumes"}],"t":{"req":"`reqdata`","res":"`body.volume`"},"index$":1}],"key$":"create"},"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /v2/volumes/{volume_id}/snapshots","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":"7724db7c-e098-11e5-b522-000f53304e51","k":"param","n":"volume_id","or":"volume_id","r":true,"t":"`$STRING`","index$":0}],"query":[{"a":true,"ex":1,"k":"query","n":"page","or":"page","r":false,"t":"`$INTEGER`","index$":0},{"a":true,"ex":2,"k":"query","n":"per_page","or":"per_page","r":false,"t":"`$INTEGER`","index$":1}]},"k":"http","m":"GET","o":"/v2/volumes/{volume_id}/snapshots","q":{"exist":["volume_id"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v2"},{"lit":"volumes"},{"var":"volume_id"},{"lit":"snapshots"}],"t":{"req":"`reqdata`","res":"`body.snapshots`"},"index$":0},{"a":true,"co":{"id":"GET /v2/volumes","source":"openapi3","version":2},"g":{"query":[{"a":true,"ex":"example","k":"query","n":"name","or":"name","r":false,"t":"`$STRING`","index$":0},{"a":true,"ex":1,"k":"query","n":"page","or":"page","r":false,"t":"`$INTEGER`","index$":1},{"a":true,"ex":2,"k":"query","n":"per_page","or":"per_page","r":false,"t":"`$INTEGER`","index$":2},{"a":true,"ex":"nyc3","k":"query","n":"region","or":"region","r":false,"t":"`$STRING`","index$":3}]},"k":"http","m":"GET","o":"/v2/volumes","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v2"},{"lit":"volumes"}],"t":{"req":"`reqdata`","res":"`body.volumes`"},"index$":1}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /v2/volumes/snapshots/{snapshot_id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":"fbe805e8-866b-11e6-96bf-000f53315a41","k":"param","n":"snapshot_id","or":"snapshot_id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/v2/volumes/snapshots/{snapshot_id}","q":{"exist":["snapshot_id"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v2"},{"lit":"volumes"},{"lit":"snapshots"},{"var":"snapshot_id"}],"t":{"req":"`reqdata`","res":"`body.snapshot`"},"index$":0},{"a":true,"co":{"id":"GET /v2/volumes/{volume_id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":"7724db7c-e098-11e5-b522-000f53304e51","k":"param","n":"volume_id","or":"volume_id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/v2/volumes/{volume_id}","q":{"exist":["volume_id"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v2"},{"lit":"volumes"},{"var":"volume_id"}],"t":{"req":"`reqdata`","res":"`body.volume`"},"index$":1}],"key$":"load"},"remove":{"input":"data","name":"remove","points":[{"a":true,"co":{"id":"DELETE /v2/volumes/snapshots/{snapshot_id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":"fbe805e8-866b-11e6-96bf-000f53315a41","k":"param","n":"snapshot_id","or":"snapshot_id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"DELETE","o":"/v2/volumes/snapshots/{snapshot_id}","q":{"exist":["snapshot_id"]},"r":{},"s":[{"lit":"v2"},{"lit":"volumes"},{"lit":"snapshots"},{"var":"snapshot_id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0},{"a":true,"co":{"id":"DELETE /v2/volumes/{volume_id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":"7724db7c-e098-11e5-b522-000f53304e51","k":"param","n":"volume_id","or":"volume_id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"DELETE","o":"/v2/volumes/{volume_id}","q":{"exist":["volume_id"]},"r":{},"s":[{"lit":"v2"},{"lit":"volumes"},{"var":"volume_id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":1},{"a":true,"co":{"id":"DELETE /v2/volumes","source":"openapi3","version":2},"g":{"query":[{"a":true,"ex":"example","k":"query","n":"name","or":"name","r":false,"t":"`$STRING`","index$":0},{"a":true,"ex":"nyc3","k":"query","n":"region","or":"region","r":false,"t":"`$STRING`","index$":1}]},"k":"http","m":"DELETE","o":"/v2/volumes","q":{},"r":{},"s":[{"lit":"v2"},{"lit":"volumes"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":2}],"key$":"remove"}},"relations":{"ancestors":[["$.main.kit.entity.snapshot"]]},"key$":"block_storage","name__orig":"block_storage","Name":"BlockStorage","name_":"block_storage","name-":"block-storage","NAME":"BLOCK_STORAGE","index$":123}, {"active":true,"entity":"block_storage","key$":"BasicBlockStorageFlow","kind":"basic","name":"BasicBlockStorageFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"block_storage_ref01"},"m":{"volume_id":"volume01"},"o":"create","s":[],"v":[],"index$":0},{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"block_storage_ref01"}}],"index$":1},{"a":true,"d":{},"i":{"ref":"block_storage_ref01","srcdatavar":"block_storage_ref01_data","suffix":"_dt0"},"m":{"id":"block_storage01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-block_storage_ref01"}}],"index$":2},{"a":true,"d":{},"i":{"ref":"block_storage_ref01","suffix":"_rm0"},"m":{},"o":"remove","s":[],"v":[],"index$":3},{"a":true,"d":{},"i":{"suffix":"_rt0"},"m":{},"o":"list","s":[],"v":[{"apply":"ItemNotExists","def":{"ref":"block_storage_ref01"}}],"index$":4}]}, 'BlockStorage', {"POST /v2/volumes/{volume_id}/snapshots":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"properties":{"name":{"type":"string","description":"A human-readable name for the volume snapshot.","example":"big-data-snapshot1475261774","key$":"name"},"tags":{"type":"array","items":{"type":"string"},"nullable":true,"description":"A flat array of tag names as strings to be applied to the resource. Tag names may be for either existing or new tags. <br><br>Requires `tag:create` scope.","example":["base-image","prod"],"x-ref":"#/components/schemas/tags_array","key$":"tags"}},"required":["name"],"index$":1},"example":{"name":"big-data-snapshot1475261774"}}}},"parameters":[{"name":"volume_id","in":"path","required":true,"description":"The ID of the block storage volume.","schema":{"type":"string","format":"uuid"},"example":"7724db7c-e098-11e5-b522-000f53304e51","x-ref":"#/components/parameters/volume_id","index$":0}]},"POST /v2/volumes":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"anyOf":[{"type":"object","allOf":[{"type":"object","properties":{"id":{},"droplet_ids":{},"name":{},"description":{},"size_gigabytes":{},"created_at":{},"tags":{}},"x-ref":"#/components/schemas/volume_base"},{"properties":{"snapshot_id":{}},"x-ref":"#/components/schemas/volume_snapshot_id"},{"type":"object","properties":{"filesystem_type":{}},"x-ref":"#/components/schemas/volume_write_file_system_type"},{"properties":{"region":{},"filesystem_label":{}},"required":["name","size_gigabytes","region"]}],"x-ref":"#/components/schemas/volumes_ext4"},{"type":"object","allOf":[{"type":"object","properties":{"id":{},"droplet_ids":{},"name":{},"description":{},"size_gigabytes":{},"created_at":{},"tags":{}},"x-ref":"#/components/schemas/volume_base"},{"properties":{"snapshot_id":{}},"x-ref":"#/components/schemas/volume_snapshot_id"},{"type":"object","properties":{"filesystem_type":{}},"x-ref":"#/components/schemas/volume_write_file_system_type"},{"properties":{"region":{},"filesystem_label":{}},"required":["name","size_gigabytes","region"]}],"x-ref":"#/components/schemas/volumes_xfs"}],"index$":1},"examples":{"ext4 volume":{"value":{"size_gigabytes":10,"name":"ext4-example","description":"Block store for examples","region":"nyc1","filesystem_type":"ext4","filesystem_label":"ext4_volume_01"}},"xfs volume":{"value":{"size_gigabytes":10,"name":"xfs_example","description":"Block store for examples","region":"nyc1","filesystem_type":"xfs","filesystem_label":"xfs_volume01"}},"Volume from a snapshot":{"value":{"size_gigabytes":10,"name":"snapshot_example","snapshot_id":"b0798135-fb76-11eb-946a-0a58ac146f33","region":"nyc1","description":"A new volume based on a snapshot","filesystem_type":"ext4","filesystem_label":"ext4_volume_01"}}}}}},"parameters":[]},"GET /v2/volumes/{volume_id}/snapshots":{"protocol":"http","parameters":[{"name":"volume_id","in":"path","required":true,"description":"The ID of the block storage volume.","schema":{"type":"string","format":"uuid"},"example":"7724db7c-e098-11e5-b522-000f53304e51","x-ref":"#/components/parameters/volume_id","index$":0},{"in":"query","name":"per_page","required":false,"description":"Number of items returned per page","schema":{"type":"integer","minimum":1,"default":20,"maximum":200},"example":2,"x-ref":"#/components/parameters/parameters_per_page","index$":1},{"in":"query","name":"page","required":false,"description":"Which 'page' of paginated results to return.","schema":{"type":"integer","minimum":1,"default":1},"example":1,"x-ref":"#/components/parameters/page","index$":2}]},"GET /v2/volumes":{"protocol":"http","parameters":[{"name":"name","in":"query","description":"The block storage volume's name.","schema":{"type":"string"},"example":"example","x-ref":"#/components/parameters/volume_name","index$":0},{"name":"region","in":"query","description":"The slug identifier for the region where the resource is available.","schema":{"type":"string","description":"The slug identifier for the region where the resource will initially be  available.","enum":["ams1","ams2","ams3","blr1","fra1","lon1","nyc1","nyc2","nyc3","sfo1","sfo2","sfo3","sgp1","tor1","syd1"],"example":"nyc3","x-ref":"#/components/schemas/region_slug"},"example":"nyc3","x-ref":"#/components/parameters/parameters_region-3","index$":1},{"in":"query","name":"per_page","required":false,"description":"Number of items returned per page","schema":{"type":"integer","minimum":1,"default":20,"maximum":200},"example":2,"x-ref":"#/components/parameters/parameters_per_page","index$":2},{"in":"query","name":"page","required":false,"description":"Which 'page' of paginated results to return.","schema":{"type":"integer","minimum":1,"default":1},"example":1,"x-ref":"#/components/parameters/page","index$":3}]},"GET /v2/volumes/snapshots/{snapshot_id}":{"protocol":"http","parameters":[{"name":"snapshot_id","in":"path","description":"The unique identifier for the snapshot.","schema":{"type":"string"},"required":true,"example":"fbe805e8-866b-11e6-96bf-000f53315a41","x-ref":"#/components/parameters/volume_snapshot_id","index$":0}]},"GET /v2/volumes/{volume_id}":{"protocol":"http","parameters":[{"name":"volume_id","in":"path","required":true,"description":"The ID of the block storage volume.","schema":{"type":"string","format":"uuid"},"example":"7724db7c-e098-11e5-b522-000f53304e51","x-ref":"#/components/parameters/volume_id","index$":0}]},"DELETE /v2/volumes/snapshots/{snapshot_id}":{"protocol":"http","parameters":[{"name":"snapshot_id","in":"path","description":"The unique identifier for the snapshot.","schema":{"type":"string"},"required":true,"example":"fbe805e8-866b-11e6-96bf-000f53315a41","x-ref":"#/components/parameters/volume_snapshot_id","index$":0}]},"DELETE /v2/volumes/{volume_id}":{"protocol":"http","parameters":[{"name":"volume_id","in":"path","required":true,"description":"The ID of the block storage volume.","schema":{"type":"string","format":"uuid"},"example":"7724db7c-e098-11e5-b522-000f53304e51","x-ref":"#/components/parameters/volume_id","index$":0}]},"DELETE /v2/volumes":{"protocol":"http","parameters":[{"name":"name","in":"query","description":"The block storage volume's name.","schema":{"type":"string"},"example":"example","x-ref":"#/components/parameters/volume_name","index$":0},{"name":"region","in":"query","description":"The slug identifier for the region where the resource is available.","schema":{"type":"string","description":"The slug identifier for the region where the resource will initially be  available.","enum":["ams1","ams2","ams3","blr1","fra1","lon1","nyc1","nyc2","nyc3","sfo1","sfo2","sfo3","sgp1","tor1","syd1"],"example":"nyc3","x-ref":"#/components/schemas/region_slug"},"example":"nyc3","x-ref":"#/components/parameters/parameters_region-3","index$":1}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const block_storage_ref01_ent = client.BlockStorage()
    let block_storage_ref01_data = setup.data.new.block_storage['block_storage_ref01']
    block_storage_ref01_data['volume_id'] = setup.idmap['volume01']

    block_storage_ref01_data = (await block_storage_ref01_ent.create(block_storage_ref01_data)).data()
    assert(null != block_storage_ref01_data.id)


    // LIST
    const block_storage_ref01_match: any = {}

    const block_storage_ref01_list = (await block_storage_ref01_ent.list(block_storage_ref01_match)).map((e: any) => e.data())

    assert(!isempty(select(block_storage_ref01_list, { id: block_storage_ref01_data.id })))


    // LOAD
    const block_storage_ref01_match_dt0: any = {}
    block_storage_ref01_match_dt0.id = block_storage_ref01_data.id
    const block_storage_ref01_data_dt0 = (await block_storage_ref01_ent.load(block_storage_ref01_match_dt0)).data()
    assert(block_storage_ref01_data_dt0.id === block_storage_ref01_data.id)


    // REMOVE
    const block_storage_ref01_match_rm0: any = { id: block_storage_ref01_data.id }
    await block_storage_ref01_ent.remove(block_storage_ref01_match_rm0)
  

    // LIST
    const block_storage_ref01_match_rt0: any = {}

    const block_storage_ref01_list_rt0 = (await block_storage_ref01_ent.list(block_storage_ref01_match_rt0)).map((e: any) => e.data())

    assert(isempty(select(block_storage_ref01_list_rt0, { id: block_storage_ref01_data.id })))


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
      '../../../../.sdk/test/entity/block_storage/BlockStorageTestData.json')

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
    ['block_storage01','block_storage02','block_storage03','snapshot01','snapshot02','snapshot03','volume01'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'DIGITALOCEAN_TEST_BLOCK_STORAGE_ENTID': idmap,
    'DIGITALOCEAN_TEST_LIVE': 'FALSE',
    'DIGITALOCEAN_TEST_EXPLAIN': 'FALSE',
    'DIGITALOCEAN_APIKEY': '',
  })

  idmap = env['DIGITALOCEAN_TEST_BLOCK_STORAGE_ENTID']

  const live = 'TRUE' === env.DIGITALOCEAN_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['DIGITALOCEAN_TEST_BLOCK_STORAGE_ENTID']
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
  
