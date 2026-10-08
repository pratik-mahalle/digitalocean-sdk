

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


describe('AppsInstanceSizeEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when DIGITALOCEAN_TEST_LIVE=TRUE.
  afterEach(liveDelay('DIGITALOCEAN_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = DigitaloceanSDK.test()
    const ent = testsdk.AppsInstanceSize()
    assert(null != ent)
  })


  class FailHook extends BaseFeature {
    name = 'failhook'
    version = '0.0.1'
    active = true
    unexpected = 0
    init() { }
    PreSpec() { throw new Error('apps_instance_size hook failed') }
    PreUnexpected() { this.unexpected++ }
  }

  test('stream-error', async () => {
    const offline = { net: { offline: true } }
    await assert.rejects(async () => {
      for await (const _item of DigitaloceanSDK.test(offline).AppsInstanceSize().stream('list')) { }
    }, /offline/)

    for await (const _item of DigitaloceanSDK.test(offline).AppsInstanceSize()
      .stream('list', undefined, { ctrl: { throw: false } })) { }

    if (null != (config as any).feature?.rbac) {
      const denied = DigitaloceanSDK.test(undefined, { feature: { rbac: { active: true, deny: true } } })
      await assert.rejects(async () => {
        for await (const _item of denied.AppsInstanceSize().stream('list')) { }
      }, (err: any) => 'rbac_denied' === err.code)
    }
  })

  test('stream-ctrl', async () => {
    const explain: any = {}
    const ctrl: any = { explain }
    for await (const _item of DigitaloceanSDK.test().AppsInstanceSize().stream('list', undefined, { ctrl })) { }
    assert.deepStrictEqual(Object.keys(ctrl), ['explain'])
    assert(explain === ctrl.explain && 0 < Object.keys(explain).length)
  })

  test('unexpected', async () => {
    const hook = new FailHook()
    const client = new DigitaloceanSDK({ feature: { test: { active: true } }, extend: [hook] })
    await assert.rejects(client.AppsInstanceSize().list(), /hook failed/)
    assert(0 < hook.unexpected)

    const fired = hook.unexpected
    assert.strictEqual(await client.AppsInstanceSize().list(undefined, { throw: false }), undefined)
    assert(fired < hook.unexpected)
  })

  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = DigitaloceanSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.AppsInstanceSize().list({"bandwidth_allowance_gib":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.DIGITALOCEAN_TEST_LIVE
    for (const op of ['list', 'load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'apps_instance_size.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"bandwidth_allowance_gib":{"a":true,"fo":"int64","h":"Bandwidth Allowance Gib","n":"bandwidth_allowance_gib","r":false,"t":"`$STRING`","key$":"bandwidth_allowance_gib","index$":0},"cpu_type":{"a":true,"h":"Cpu Type","n":"cpu_type","r":false,"t":"`$STRING`","key$":"cpu_type","index$":1},"cpus":{"a":true,"fo":"int64","h":"Cpus","n":"cpus","r":false,"t":"`$STRING`","key$":"cpus","index$":2},"deprecation_intent":{"a":true,"h":"Deprecation Intent","n":"deprecation_intent","r":false,"t":"`$BOOLEAN`","key$":"deprecation_intent","index$":3},"id":{"a":true,"h":"Id","n":"id","r":false,"t":"`$STRING`","key$":"id","index$":4},"memory_bytes":{"a":true,"fo":"int64","h":"Memory Bytes","n":"memory_bytes","r":false,"t":"`$STRING`","key$":"memory_bytes","index$":5},"name":{"a":true,"h":"Name","n":"name","r":false,"t":"`$STRING`","key$":"name","index$":6},"scalable":{"a":true,"h":"Scalable","n":"scalable","r":false,"t":"`$BOOLEAN`","key$":"scalable","index$":7},"single_instance_only":{"a":true,"h":"Single Instance Only","n":"single_instance_only","r":false,"t":"`$BOOLEAN`","key$":"single_instance_only","index$":8},"slug":{"a":true,"h":"Slug","n":"slug","r":false,"t":"`$STRING`","key$":"slug","index$":9},"tier_downgrade_to":{"a":true,"de":true,"h":"Tier Downgrade To","n":"tier_downgrade_to","r":false,"t":"`$STRING`","key$":"tier_downgrade_to","index$":10},"tier_slug":{"a":true,"h":"Tier Slug","n":"tier_slug","r":false,"t":"`$STRING`","key$":"tier_slug","index$":11},"tier_upgrade_to":{"a":true,"de":true,"h":"Tier Upgrade To","n":"tier_upgrade_to","r":false,"t":"`$STRING`","key$":"tier_upgrade_to","index$":12},"usd_per_month":{"a":true,"h":"Usd Per Month","n":"usd_per_month","r":false,"t":"`$STRING`","key$":"usd_per_month","index$":13},"usd_per_second":{"a":true,"h":"Usd Per Second","n":"usd_per_second","r":false,"t":"`$STRING`","key$":"usd_per_second","index$":14}},"id":{"field":"id","name":"id"},"name":"apps_instance_size","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /v2/apps/tiers/instance_sizes","source":"openapi3","version":2},"g":{},"k":"http","m":"GET","o":"/v2/apps/tiers/instance_sizes","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v2"},{"lit":"apps"},{"lit":"tiers"},{"lit":"instance_sizes"}],"t":{"req":"`reqdata`","res":"`body.instance_sizes`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /v2/apps/tiers/instance_sizes/{slug}","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":"apps-s-1vcpu-0.5gb","k":"param","n":"id","or":"slug","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/v2/apps/tiers/instance_sizes/{slug}","q":{"exist":["id"]},"r":{"param":{"slug":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v2"},{"lit":"apps"},{"lit":"tiers"},{"lit":"instance_sizes"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body.instance_size`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"apps_instance_size","name__orig":"apps_instance_size","Name":"AppsInstanceSize","name_":"apps_instance_size","name-":"apps-instance-size","NAME":"APPS_INSTANCE_SIZE","index$":112}, {"active":true,"entity":"apps_instance_size","key$":"BasicAppsInstanceSizeFlow","kind":"basic","name":"BasicAppsInstanceSizeFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"apps_instance_size_ref01"}}],"index$":0},{"a":true,"d":{},"i":{"ref":"apps_instance_size_ref01","srcdatavar":"apps_instance_size_ref01_data","suffix":"_dt0"},"m":{"id":"apps_instance_size01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-apps_instance_size_ref01"}}],"index$":1}]}, 'AppsInstanceSize', {"GET /v2/apps/tiers/instance_sizes":{"protocol":"http","parameters":[]},"GET /v2/apps/tiers/instance_sizes/{slug}":{"protocol":"http","parameters":[{"description":"The slug of the instance size","in":"path","name":"slug","required":true,"schema":{"type":"string"},"example":"apps-s-1vcpu-0.5gb","x-ref":"#/components/parameters/slug_size","index$":0}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let apps_instance_size_ref01_data = Object.values(setup.data.existing.apps_instance_size)[0] as any

    // LIST
    const apps_instance_size_ref01_ent = client.AppsInstanceSize()
    const apps_instance_size_ref01_match: any = {}

    const apps_instance_size_ref01_list = (await apps_instance_size_ref01_ent.list(apps_instance_size_ref01_match)).map((e: any) => e.data())


    // LOAD
    const apps_instance_size_ref01_match_dt0: any = {}
    apps_instance_size_ref01_match_dt0.id = apps_instance_size_ref01_data.id
    const apps_instance_size_ref01_data_dt0 = (await apps_instance_size_ref01_ent.load(apps_instance_size_ref01_match_dt0)).data()
    assert(apps_instance_size_ref01_data_dt0.id === apps_instance_size_ref01_data.id)


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
      '../../../../.sdk/test/entity/apps_instance_size/AppsInstanceSizeTestData.json')

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
    ['apps_instance_size01','apps_instance_size02','apps_instance_size03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'DIGITALOCEAN_TEST_APPS_INSTANCE_SIZE_ENTID': idmap,
    'DIGITALOCEAN_TEST_LIVE': 'FALSE',
    'DIGITALOCEAN_TEST_EXPLAIN': 'FALSE',
    'DIGITALOCEAN_APIKEY': '',
  })

  idmap = env['DIGITALOCEAN_TEST_APPS_INSTANCE_SIZE_ENTID']

  const live = 'TRUE' === env.DIGITALOCEAN_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['DIGITALOCEAN_TEST_APPS_INSTANCE_SIZE_ENTID']
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
  
