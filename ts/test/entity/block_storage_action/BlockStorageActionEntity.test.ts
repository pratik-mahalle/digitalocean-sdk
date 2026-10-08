

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


describe('BlockStorageActionEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when DIGITALOCEAN_TEST_LIVE=TRUE.
  afterEach(liveDelay('DIGITALOCEAN_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = DigitaloceanSDK.test()
    const ent = testsdk.BlockStorageAction()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = DigitaloceanSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.BlockStorageAction().list({"volume_id":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.DIGITALOCEAN_TEST_LIVE
    for (const op of ['create', 'list', 'load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'block_storage_action.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"completed_at":{"a":true,"fo":"date-time","h":"Completed At","n":"completed_at","r":false,"sh":"A time value given in ISO8601 combined date and time format that represents when the action was completed.","t":"`$STRING`","key$":"completed_at","index$":0},"id":{"a":true,"h":"Id","n":"id","r":false,"sh":"A unique numeric ID that can be used to identify and reference an action.","t":"`$INTEGER`","key$":"id","index$":1},"region":{"a":true,"h":"Region","n":"region","r":true,"t":"`$OBJECT`","key$":"region","index$":2},"region_slug":{"a":true,"h":"Region Slug","n":"region_slug","r":false,"sh":"A human-readable string that is used as a unique identifier for each region.","t":"`$STRING`","key$":"region_slug","index$":3},"resource_id":{"a":true,"h":"Resource Id","n":"resource_id","r":false,"sh":"A unique identifier for the resource that the action is associated with.","t":"`$INTEGER`","key$":"resource_id","index$":4},"resource_type":{"a":true,"h":"Resource Type","n":"resource_type","r":false,"sh":"The type of resource that the action is associated with.","t":"`$STRING`","key$":"resource_type","index$":5},"started_at":{"a":true,"fo":"date-time","h":"Started At","n":"started_at","r":false,"sh":"A time value given in ISO8601 combined date and time format that represents when the action was initiated.","t":"`$STRING`","key$":"started_at","index$":6},"status":{"a":true,"h":"Status","n":"status","r":false,"sh":"The current status of the action.","t":"`$STRING`","key$":"status","index$":7},"type":{"a":true,"h":"Type","n":"type","r":false,"sh":"This is the type of action that the object represents.","t":"`$STRING`","key$":"type","index$":8}},"id":{"field":"id","name":"id"},"name":"block_storage_action","op":{"create":{"input":"data","name":"create","points":[{"a":true,"co":{"id":"POST /v2/volumes/{volume_id}/actions","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":"7724db7c-e098-11e5-b522-000f53304e51","k":"param","n":"volume_id","or":"volume_id","r":true,"t":"`$STRING`","index$":0}],"query":[{"a":true,"ex":1,"k":"query","n":"page","or":"page","r":false,"t":"`$INTEGER`","index$":0},{"a":true,"ex":2,"k":"query","n":"per_page","or":"per_page","r":false,"t":"`$INTEGER`","index$":1}]},"k":"http","m":"POST","o":"/v2/volumes/{volume_id}/actions","q":{"exist":["volume_id"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v2"},{"lit":"volumes"},{"var":"volume_id"},{"lit":"actions"}],"t":{"req":"`reqdata`","res":"`body.action`"},"index$":0},{"a":true,"co":{"id":"POST /v2/volumes/actions","source":"openapi3","version":2},"g":{"query":[{"a":true,"ex":1,"k":"query","n":"page","or":"page","r":false,"t":"`$INTEGER`","index$":0},{"a":true,"ex":2,"k":"query","n":"per_page","or":"per_page","r":false,"t":"`$INTEGER`","index$":1}]},"k":"http","m":"POST","o":"/v2/volumes/actions","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v2"},{"lit":"volumes"},{"lit":"actions"}],"t":{"req":"`reqdata`","res":"`body.action`"},"index$":1}],"key$":"create"},"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /v2/volumes/{volume_id}/actions","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":"7724db7c-e098-11e5-b522-000f53304e51","k":"param","n":"volume_id","or":"volume_id","r":true,"t":"`$STRING`","index$":0}],"query":[{"a":true,"ex":1,"k":"query","n":"page","or":"page","r":false,"t":"`$INTEGER`","index$":0},{"a":true,"ex":2,"k":"query","n":"per_page","or":"per_page","r":false,"t":"`$INTEGER`","index$":1}]},"k":"http","m":"GET","o":"/v2/volumes/{volume_id}/actions","q":{"exist":["volume_id"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v2"},{"lit":"volumes"},{"var":"volume_id"},{"lit":"actions"}],"t":{"req":"`reqdata`","res":"`body.actions`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /v2/volumes/{volume_id}/actions/{action_id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":36804636,"k":"param","n":"id","or":"action_id","r":true,"t":"`$INTEGER`","index$":0},{"a":true,"ex":"7724db7c-e098-11e5-b522-000f53304e51","k":"param","n":"volume_id","or":"volume_id","r":true,"t":"`$STRING`","index$":1}],"query":[{"a":true,"ex":1,"k":"query","n":"page","or":"page","r":false,"t":"`$INTEGER`","index$":0},{"a":true,"ex":2,"k":"query","n":"per_page","or":"per_page","r":false,"t":"`$INTEGER`","index$":1}]},"k":"http","m":"GET","o":"/v2/volumes/{volume_id}/actions/{action_id}","q":{"exist":["id","volume_id"]},"r":{"param":{"action_id":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v2"},{"lit":"volumes"},{"var":"volume_id"},{"lit":"actions"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body.action`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"block_storage_action","name__orig":"block_storage_action","Name":"BlockStorageAction","name_":"block_storage_action","name-":"block-storage-action","NAME":"BLOCK_STORAGE_ACTION","index$":124}, {"active":true,"entity":"block_storage_action","key$":"BasicBlockStorageActionFlow","kind":"basic","name":"BasicBlockStorageActionFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"block_storage_action_ref01"},"m":{"volume_id":"volume01"},"o":"create","s":[],"v":[],"index$":0},{"a":true,"d":{},"i":{},"m":{"volume_id":"volume01"},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"block_storage_action_ref01"}}],"index$":1},{"a":true,"d":{},"i":{"ref":"block_storage_action_ref01","srcdatavar":"block_storage_action_ref01_data","suffix":"_dt0"},"m":{"id":"block_storage_action01","volume_id":"volume01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-block_storage_action_ref01"}}],"index$":2}]}, 'BlockStorageAction', {"POST /v2/volumes/{volume_id}/actions":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"anyOf":[{"type":"object","allOf":[{"type":"object","properties":{"type":{},"region":{}},"required":["type"],"x-ref":"#/components/schemas/volume_action_post_base"},{"properties":{"droplet_id":{},"tags":{}},"required":["droplet_id"]}],"x-ref":"#/components/schemas/volume_action_post_attach"},{"type":"object","allOf":[{"type":"object","properties":{"type":{},"region":{}},"required":["type"],"x-ref":"#/components/schemas/volume_action_post_base"},{"properties":{"droplet_id":{}},"required":["droplet_id"]}],"x-ref":"#/components/schemas/volume_action_post_detach"},{"type":"object","allOf":[{"type":"object","properties":{"type":{},"region":{}},"required":["type"],"x-ref":"#/components/schemas/volume_action_post_base"},{"properties":{"size_gigabytes":{}},"required":["size_gigabytes"]}],"x-ref":"#/components/schemas/volume_action_post_resize"}],"discriminator":{"propertyName":"type","mapping":{"attach":"#/components/schemas/volume_action_post_attach","detach":"#/components/schemas/volume_action_post_detach","resize":"#/components/schemas/volume_action_post_resize"}},"index$":1},"examples":{"VolumeActionAttach":{"value":{"type":"attach","droplet_id":11612190,"region":"nyc1","tags":["aninterestingtag"]}},"VolumeActionDetach":{"value":{"type":"detach","droplet_id":11612190,"region":"nyc1"}},"VolumeActionResize":{"value":{"type":"resize","size_gigabytes":100,"region":"nyc1"}}}}}},"parameters":[{"name":"volume_id","in":"path","required":true,"description":"The ID of the block storage volume.","schema":{"type":"string","format":"uuid"},"example":"7724db7c-e098-11e5-b522-000f53304e51","x-ref":"#/components/parameters/volume_id","index$":0},{"in":"query","name":"per_page","required":false,"description":"Number of items returned per page","schema":{"type":"integer","minimum":1,"default":20,"maximum":200},"example":2,"x-ref":"#/components/parameters/parameters_per_page","index$":1},{"in":"query","name":"page","required":false,"description":"Which 'page' of paginated results to return.","schema":{"type":"integer","minimum":1,"default":1},"example":1,"x-ref":"#/components/parameters/page","index$":2}]},"POST /v2/volumes/actions":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"anyOf":[{"type":"object","allOf":[{"type":"object","properties":{"type":{},"region":{}},"required":["type"],"x-ref":"#/components/schemas/volume_action_post_base"},{"properties":{"droplet_id":{},"tags":{}},"required":["droplet_id"]}],"x-ref":"#/components/schemas/volume_action_post_attach"},{"type":"object","allOf":[{"type":"object","properties":{"type":{},"region":{}},"required":["type"],"x-ref":"#/components/schemas/volume_action_post_base"},{"properties":{"droplet_id":{}},"required":["droplet_id"]}],"x-ref":"#/components/schemas/volume_action_post_detach"}],"discriminator":{"propertyName":"type","mapping":{"attach":"#/components/schemas/volume_action_post_attach","detach":"#/components/schemas/volume_action_post_detach"}},"index$":1},"examples":{"VolumeActionAttach":{"value":{"type":"attach","volume_name":"example","droplet_id":11612190,"region":"nyc1","tags":["aninterestingtag"]}},"VolumeActionDetach":{"value":{"type":"detach","volume_name":"example","droplet_id":11612190,"region":"nyc1"}}}}}},"parameters":[{"in":"query","name":"per_page","required":false,"description":"Number of items returned per page","schema":{"type":"integer","minimum":1,"default":20,"maximum":200},"example":2,"x-ref":"#/components/parameters/parameters_per_page","index$":0},{"in":"query","name":"page","required":false,"description":"Which 'page' of paginated results to return.","schema":{"type":"integer","minimum":1,"default":1},"example":1,"x-ref":"#/components/parameters/page","index$":1}]},"GET /v2/volumes/{volume_id}/actions":{"protocol":"http","parameters":[{"name":"volume_id","in":"path","required":true,"description":"The ID of the block storage volume.","schema":{"type":"string","format":"uuid"},"example":"7724db7c-e098-11e5-b522-000f53304e51","x-ref":"#/components/parameters/volume_id","index$":0},{"in":"query","name":"per_page","required":false,"description":"Number of items returned per page","schema":{"type":"integer","minimum":1,"default":20,"maximum":200},"example":2,"x-ref":"#/components/parameters/parameters_per_page","index$":1},{"in":"query","name":"page","required":false,"description":"Which 'page' of paginated results to return.","schema":{"type":"integer","minimum":1,"default":1},"example":1,"x-ref":"#/components/parameters/page","index$":2}]},"GET /v2/volumes/{volume_id}/actions/{action_id}":{"protocol":"http","parameters":[{"name":"volume_id","in":"path","required":true,"description":"The ID of the block storage volume.","schema":{"type":"string","format":"uuid"},"example":"7724db7c-e098-11e5-b522-000f53304e51","x-ref":"#/components/parameters/volume_id","index$":0},{"in":"path","name":"action_id","description":"A unique numeric ID that can be used to identify and reference an action.","required":true,"schema":{"type":"integer","minimum":1},"example":36804636,"x-ref":"#/components/parameters/action_id","index$":1},{"in":"query","name":"per_page","required":false,"description":"Number of items returned per page","schema":{"type":"integer","minimum":1,"default":20,"maximum":200},"example":2,"x-ref":"#/components/parameters/parameters_per_page","index$":2},{"in":"query","name":"page","required":false,"description":"Which 'page' of paginated results to return.","schema":{"type":"integer","minimum":1,"default":1},"example":1,"x-ref":"#/components/parameters/page","index$":3}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const block_storage_action_ref01_ent = client.BlockStorageAction()
    let block_storage_action_ref01_data = setup.data.new.block_storage_action['block_storage_action_ref01']
    block_storage_action_ref01_data['volume_id'] = setup.idmap['volume01']

    block_storage_action_ref01_data = (await block_storage_action_ref01_ent.create(block_storage_action_ref01_data)).data()
    assert(null != block_storage_action_ref01_data.id)


    // LIST
    const block_storage_action_ref01_match: any = {}
    block_storage_action_ref01_match['volume_id'] = setup.idmap['volume01']

    const block_storage_action_ref01_list = (await block_storage_action_ref01_ent.list(block_storage_action_ref01_match)).map((e: any) => e.data())

    assert(!isempty(select(block_storage_action_ref01_list, { id: block_storage_action_ref01_data.id })))


    // LOAD
    const block_storage_action_ref01_match_dt0: any = {}
    block_storage_action_ref01_match_dt0.id = block_storage_action_ref01_data.id
    const block_storage_action_ref01_data_dt0 = (await block_storage_action_ref01_ent.load(block_storage_action_ref01_match_dt0)).data()
    assert(block_storage_action_ref01_data_dt0.id === block_storage_action_ref01_data.id)


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
      '../../../../.sdk/test/entity/block_storage_action/BlockStorageActionTestData.json')

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
    ['block_storage_action01','block_storage_action02','block_storage_action03','volume01'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'DIGITALOCEAN_TEST_BLOCK_STORAGE_ACTION_ENTID': idmap,
    'DIGITALOCEAN_TEST_LIVE': 'FALSE',
    'DIGITALOCEAN_TEST_EXPLAIN': 'FALSE',
    'DIGITALOCEAN_APIKEY': '',
  })

  idmap = env['DIGITALOCEAN_TEST_BLOCK_STORAGE_ACTION_ENTID']

  const live = 'TRUE' === env.DIGITALOCEAN_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['DIGITALOCEAN_TEST_BLOCK_STORAGE_ACTION_ENTID']
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
  
