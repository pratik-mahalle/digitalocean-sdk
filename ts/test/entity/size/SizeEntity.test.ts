

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


describe('SizeEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when DIGITALOCEAN_TEST_LIVE=TRUE.
  afterEach(liveDelay('DIGITALOCEAN_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = DigitaloceanSDK.test()
    const ent = testsdk.Size()
    assert(null != ent)
  })


  class FailHook extends BaseFeature {
    name = 'failhook'
    version = '0.0.1'
    active = true
    unexpected = 0
    init() { }
    PreSpec() { throw new Error('size hook failed') }
    PreUnexpected() { this.unexpected++ }
  }

  test('stream-error', async () => {
    const offline = { net: { offline: true } }
    await assert.rejects(async () => {
      for await (const _item of DigitaloceanSDK.test(offline).Size().stream('list')) { }
    }, /offline/)

    for await (const _item of DigitaloceanSDK.test(offline).Size()
      .stream('list', undefined, { ctrl: { throw: false } })) { }

    if (null != (config as any).feature?.rbac) {
      const denied = DigitaloceanSDK.test(undefined, { feature: { rbac: { active: true, deny: true } } })
      await assert.rejects(async () => {
        for await (const _item of denied.Size().stream('list')) { }
      }, (err: any) => 'rbac_denied' === err.code)
    }
  })

  test('stream-ctrl', async () => {
    const explain: any = {}
    const ctrl: any = { explain }
    for await (const _item of DigitaloceanSDK.test().Size().stream('list', undefined, { ctrl })) { }
    assert.deepStrictEqual(Object.keys(ctrl), ['explain'])
    assert(explain === ctrl.explain && 0 < Object.keys(explain).length)
  })

  test('unexpected', async () => {
    const hook = new FailHook()
    const client = new DigitaloceanSDK({ feature: { test: { active: true } }, extend: [hook] })
    await assert.rejects(client.Size().list(), /hook failed/)
    assert(0 < hook.unexpected)

    const fired = hook.unexpected
    assert.strictEqual(await client.Size().list(undefined, { throw: false }), undefined)
    assert(fired < hook.unexpected)
  })

  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = DigitaloceanSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.Size().list({"page":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.DIGITALOCEAN_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'size.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"available":{"a":true,"h":"Available","n":"available","r":true,"sh":"This is a boolean value that represents whether new Droplets can be created with this size.","t":"`$BOOLEAN`","key$":"available","index$":0},"description":{"a":true,"h":"Description","n":"description","r":true,"sh":"A string describing the class of Droplets created from this size.","t":"`$STRING`","key$":"description","index$":1},"disk":{"a":true,"h":"Disk","n":"disk","r":true,"sh":"The amount of disk space set aside for Droplets of this size.","t":"`$INTEGER`","key$":"disk","index$":2},"disk_info":{"a":true,"h":"Disk Info","n":"disk_info","r":false,"sh":"An array of objects containing information about the disks available to Droplets created with this size.","t":"`$ARRAY`","key$":"disk_info","index$":3},"gpu_info":{"a":true,"h":"Gpu Info","n":"gpu_info","r":false,"sh":"An object containing information about the GPU capabilities of Droplets created with this size.","t":"`$OBJECT`","key$":"gpu_info","index$":4},"memory":{"a":true,"h":"Memory","n":"memory","r":true,"sh":"The amount of RAM allocated to Droplets created of this size.","t":"`$INTEGER`","key$":"memory","index$":5},"price_hourly":{"a":true,"fo":"float","h":"Price Hourly","n":"price_hourly","r":true,"sh":"This describes the price of the Droplet size as measured hourly.","t":"`$NUMBER`","key$":"price_hourly","index$":6},"price_monthly":{"a":true,"fo":"float","h":"Price Monthly","n":"price_monthly","r":true,"sh":"This attribute describes the monthly cost of this Droplet size if the Droplet is kept for an entire month.","t":"`$NUMBER`","key$":"price_monthly","index$":7},"regions":{"a":true,"h":"Regions","n":"regions","r":true,"sh":"An array containing the region slugs where this size is available for Droplet creates.","t":"`$ARRAY`","key$":"regions","index$":8},"slug":{"a":true,"h":"Slug","n":"slug","r":true,"sh":"A human-readable string that is used to uniquely identify each size.","t":"`$STRING`","key$":"slug","index$":9},"transfer":{"a":true,"fo":"float","h":"Transfer","n":"transfer","r":true,"sh":"The amount of transfer bandwidth that is available for Droplets created in this size.","t":"`$NUMBER`","key$":"transfer","index$":10},"vcpus":{"a":true,"h":"Vcpus","n":"vcpus","r":true,"sh":"The number of CPUs allocated to Droplets of this size.","t":"`$INTEGER`","key$":"vcpus","index$":11}},"name":"size","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /v2/sizes","source":"openapi3","version":2},"g":{"query":[{"a":true,"ex":1,"k":"query","n":"page","or":"page","r":false,"t":"`$INTEGER`","index$":0},{"a":true,"ex":2,"k":"query","n":"per_page","or":"per_page","r":false,"t":"`$INTEGER`","index$":1}]},"k":"http","m":"GET","o":"/v2/sizes","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v2"},{"lit":"sizes"}],"t":{"req":"`reqdata`","res":"`body.sizes`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"size","name__orig":"size","Name":"Size","name_":"size","name-":"size","NAME":"SIZE","index$":202}, {"active":true,"entity":"size","key$":"BasicSizeFlow","kind":"basic","name":"BasicSizeFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"size_ref01"}}],"index$":0}]}, 'Size', {"GET /v2/sizes":{"protocol":"http","parameters":[{"in":"query","name":"per_page","required":false,"description":"Number of items returned per page","schema":{"type":"integer","minimum":1,"default":20,"maximum":200},"example":2,"x-ref":"#/components/parameters/parameters_per_page","index$":0},{"in":"query","name":"page","required":false,"description":"Which 'page' of paginated results to return.","schema":{"type":"integer","minimum":1,"default":1},"example":1,"x-ref":"#/components/parameters/page","index$":1}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let size_ref01_data = Object.values(setup.data.existing.size)[0] as any

    // LIST
    const size_ref01_ent = client.Size()
    const size_ref01_match: any = {}

    const size_ref01_list = (await size_ref01_ent.list(size_ref01_match)).map((e: any) => e.data())


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
      '../../../../.sdk/test/entity/size/SizeTestData.json')

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
    ['size01','size02','size03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'DIGITALOCEAN_TEST_SIZE_ENTID': idmap,
    'DIGITALOCEAN_TEST_LIVE': 'FALSE',
    'DIGITALOCEAN_TEST_EXPLAIN': 'FALSE',
    'DIGITALOCEAN_APIKEY': '',
  })

  idmap = env['DIGITALOCEAN_TEST_SIZE_ENTID']

  const live = 'TRUE' === env.DIGITALOCEAN_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['DIGITALOCEAN_TEST_SIZE_ENTID']
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
  
