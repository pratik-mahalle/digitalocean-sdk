

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


describe('AddOnAppEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when DIGITALOCEAN_TEST_LIVE=TRUE.
  afterEach(liveDelay('DIGITALOCEAN_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = DigitaloceanSDK.test()
    const ent = testsdk.AddOnApp()
    assert(null != ent)
  })


  class FailHook extends BaseFeature {
    name = 'failhook'
    version = '0.0.1'
    active = true
    unexpected = 0
    init() { }
    PreSpec() { throw new Error('add_on_app hook failed') }
    PreUnexpected() { this.unexpected++ }
  }

  test('stream-error', async () => {
    const offline = { net: { offline: true } }
    await assert.rejects(async () => {
      for await (const _item of DigitaloceanSDK.test(offline).AddOnApp().stream('list')) { }
    }, /offline/)

    for await (const _item of DigitaloceanSDK.test(offline).AddOnApp()
      .stream('list', undefined, { ctrl: { throw: false } })) { }

    if (null != (config as any).feature?.rbac) {
      const denied = DigitaloceanSDK.test(undefined, { feature: { rbac: { active: true, deny: true } } })
      await assert.rejects(async () => {
        for await (const _item of denied.AddOnApp().stream('list')) { }
      }, (err: any) => 'rbac_denied' === err.code)
    }
  })

  test('stream-ctrl', async () => {
    const explain: any = {}
    const ctrl: any = { explain }
    for await (const _item of DigitaloceanSDK.test().AddOnApp().stream('list', undefined, { ctrl })) { }
    assert.deepStrictEqual(Object.keys(ctrl), ['explain'])
    assert(explain === ctrl.explain && 0 < Object.keys(explain).length)
  })

  test('unexpected', async () => {
    const hook = new FailHook()
    const client = new DigitaloceanSDK({ feature: { test: { active: true } }, extend: [hook] })
    await assert.rejects(client.AddOnApp().list(), /hook failed/)
    assert(0 < hook.unexpected)

    const fired = hook.unexpected
    assert.strictEqual(await client.AddOnApp().list(undefined, { throw: false }), undefined)
    assert(fired < hook.unexpected)
  })

  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = DigitaloceanSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.AddOnApp().list({"app_slug":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.DIGITALOCEAN_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'add_on_app.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"app_slug":{"a":true,"h":"App Slug","n":"app_slug","r":true,"sh":"The slug identifier for the application associated with the resource.","t":"`$STRING`","key$":"app_slug","index$":0},"description":{"a":true,"h":"Description","n":"description","r":true,"sh":"A brief description of the metadata item.","t":"`$STRING`","key$":"description","index$":1},"display_name":{"a":true,"h":"Display Name","n":"display_name","r":true,"sh":"The display name of the metadata item.","t":"`$STRING`","key$":"display_name","index$":2},"eula":{"a":true,"h":"Eula","n":"eula","r":true,"sh":"The End User License Agreement URL for the resource.","t":"`$STRING`","key$":"eula","index$":3},"id":{"a":true,"h":"Id","n":"id","r":true,"sh":"Unique identifier for the addon metadata item.","t":"`$INTEGER`","key$":"id","index$":4},"name":{"a":true,"h":"Name","n":"name","r":true,"sh":"The name of the metadata item.","t":"`$STRING`","key$":"name","index$":5},"options":{"a":true,"h":"Options","n":"options","r":false,"t":"`$ARRAY`","key$":"options","index$":6},"plans":{"a":true,"h":"Plans","n":"plans","r":true,"sh":"A list of plans available for the resource.","t":"`$ARRAY`","union":{"branches":3,"count":1,"depth":6},"key$":"plans","index$":7},"tos":{"a":true,"h":"Tos","n":"tos","r":true,"sh":"The Terms of Service URL for the resource.","t":"`$STRING`","key$":"tos","index$":8},"type":{"a":true,"h":"Type","n":"type","r":true,"sh":"The data type of the metadata value.","t":"`$STRING`","key$":"type","index$":9}},"id":{"field":"id","name":"id"},"name":"add_on_app","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /v2/add-ons/apps/{app_slug}/metadata","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":"example_app","k":"param","n":"app_slug","or":"app_slug","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/v2/add-ons/apps/{app_slug}/metadata","q":{"exist":["app_slug"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v2"},{"lit":"add-ons"},{"lit":"apps"},{"var":"app_slug"},{"lit":"metadata"}],"t":{"req":"`reqdata`","res":"`body.metadata`"},"index$":0},{"a":true,"co":{"id":"GET /v2/add-ons/apps","source":"openapi3","version":2},"g":{},"k":"http","m":"GET","o":"/v2/add-ons/apps","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v2"},{"lit":"add-ons"},{"lit":"apps"}],"t":{"req":"`reqdata`","res":"`body.apps`"},"index$":1}],"key$":"list"}},"relations":{"ancestors":[["$.main.kit.entity.app"]]},"key$":"add_on_app","name__orig":"add_on_app","Name":"AddOnApp","name_":"add_on_app","name-":"add-on-app","NAME":"ADD_ON_APP","index$":4}, {"active":true,"entity":"add_on_app","key$":"BasicAddOnAppFlow","kind":"basic","name":"BasicAddOnAppFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"add_on_app_ref01"}}],"index$":0}]}, 'AddOnApp', {"GET /v2/add-ons/apps/{app_slug}/metadata":{"protocol":"http","parameters":[{"name":"app_slug","in":"path","required":true,"example":"example_app","schema":{"type":"string"},"description":"The slug identifier for the application whose metadata is being requested.","index$":0}]},"GET /v2/add-ons/apps":{"protocol":"http","parameters":[]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let add_on_app_ref01_data = Object.values(setup.data.existing.add_on_app)[0] as any

    // LIST
    const add_on_app_ref01_ent = client.AddOnApp()
    const add_on_app_ref01_match: any = {}

    const add_on_app_ref01_list = (await add_on_app_ref01_ent.list(add_on_app_ref01_match)).map((e: any) => e.data())


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
      '../../../../.sdk/test/entity/add_on_app/AddOnAppTestData.json')

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
    ['add_on_app01','add_on_app02','add_on_app03','app01','app02','app03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'DIGITALOCEAN_TEST_ADD_ON_APP_ENTID': idmap,
    'DIGITALOCEAN_TEST_LIVE': 'FALSE',
    'DIGITALOCEAN_TEST_EXPLAIN': 'FALSE',
    'DIGITALOCEAN_APIKEY': '',
  })

  idmap = env['DIGITALOCEAN_TEST_ADD_ON_APP_ENTID']

  const live = 'TRUE' === env.DIGITALOCEAN_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['DIGITALOCEAN_TEST_ADD_ON_APP_ENTID']
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
  
