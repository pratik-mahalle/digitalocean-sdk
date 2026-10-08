

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


describe('AddOnResourceEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when DIGITALOCEAN_TEST_LIVE=TRUE.
  afterEach(liveDelay('DIGITALOCEAN_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = DigitaloceanSDK.test()
    const ent = testsdk.AddOnResource()
    assert(null != ent)
  })


  class FailHook extends BaseFeature {
    name = 'failhook'
    version = '0.0.1'
    active = true
    unexpected = 0
    init() { }
    PreSpec() { throw new Error('add_on_resource hook failed') }
    PreUnexpected() { this.unexpected++ }
  }

  test('stream-error', async () => {
    const offline = { net: { offline: true } }
    await assert.rejects(async () => {
      for await (const _item of DigitaloceanSDK.test(offline).AddOnResource().stream('list')) { }
    }, /offline/)

    for await (const _item of DigitaloceanSDK.test(offline).AddOnResource()
      .stream('list', undefined, { ctrl: { throw: false } })) { }

    if (null != (config as any).feature?.rbac) {
      const denied = DigitaloceanSDK.test(undefined, { feature: { rbac: { active: true, deny: true } } })
      await assert.rejects(async () => {
        for await (const _item of denied.AddOnResource().stream('list')) { }
      }, (err: any) => 'rbac_denied' === err.code)
    }
  })

  test('stream-ctrl', async () => {
    const explain: any = {}
    const ctrl: any = { explain }
    for await (const _item of DigitaloceanSDK.test().AddOnResource().stream('list', undefined, { ctrl })) { }
    assert.deepStrictEqual(Object.keys(ctrl), ['explain'])
    assert(explain === ctrl.explain && 0 < Object.keys(explain).length)
  })

  test('unexpected', async () => {
    const hook = new FailHook()
    const client = new DigitaloceanSDK({ feature: { test: { active: true } }, extend: [hook] })
    await assert.rejects(client.AddOnResource().list(), /hook failed/)
    assert(0 < hook.unexpected)

    const fired = hook.unexpected
    assert.strictEqual(await client.AddOnResource().list(undefined, { throw: false }), undefined)
    assert(fired < hook.unexpected)
  })

  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = DigitaloceanSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.AddOnResource().list({"app_name":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.DIGITALOCEAN_TEST_LIVE
    for (const op of ['create', 'list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'add_on_resource.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"app_name":{"a":true,"h":"App Name","n":"app_name","r":false,"sh":"The name of the application associated with the resource.","t":"`$STRING`","key$":"app_name","index$":0},"app_slug":{"a":true,"h":"App Slug","n":"app_slug","r":true,"sh":"The slug identifier for the application associated with the resource.","t":"`$STRING`","key$":"app_slug","index$":1},"fleet_uuid":{"a":true,"h":"Fleet Uuid","n":"fleet_uuid","r":false,"sh":"UUID of the fleet/project to which this resource will belong.","t":"`$STRING`","key$":"fleet_uuid","index$":2},"has_config":{"a":true,"h":"Has Config","n":"has_config","r":true,"sh":"Indicates if the resource has configuration values set by the vendor.","t":"`$BOOLEAN`","key$":"has_config","index$":3},"linked_droplet_id":{"a":true,"h":"Linked Droplet Id","n":"linked_droplet_id","r":false,"sh":"ID of the droplet to be linked to this resource, if applicable.","t":"`$INTEGER`","key$":"linked_droplet_id","index$":4},"message":{"a":true,"h":"Message","n":"message","r":false,"sh":"A message related to the resource, if applicable.","t":"`$STRING`","key$":"message","index$":5},"metadata":{"a":true,"h":"Metadata","n":"metadata","op":{"create":{"req":true,"type":"`$ARRAY`"}},"r":false,"sh":"Metadata associated with the resource, set by the user.","t":"`$ARRAY`","union":{"branches":2,"count":1,"depth":3},"key$":"metadata","index$":6},"name":{"a":true,"h":"Name","n":"name","r":true,"sh":"The name of the addon resource.","t":"`$STRING`","key$":"name","index$":7},"plan_name":{"a":true,"h":"Plan Name","n":"plan_name","r":false,"sh":"The name of the plan associated with the resource.","t":"`$STRING`","key$":"plan_name","index$":8},"plan_price_per_month":{"a":true,"h":"Plan Price Per Month","n":"plan_price_per_month","r":false,"sh":"The price of the plan per month in US dollars.","t":"`$INTEGER`","key$":"plan_price_per_month","index$":9},"plan_slug":{"a":true,"h":"Plan Slug","n":"plan_slug","r":true,"sh":"The slug identifier for the plan associated with the resource.","t":"`$STRING`","key$":"plan_slug","index$":10},"sso_url":{"a":true,"h":"Sso Url","n":"sso_url","r":false,"sh":"The Single Sign-On URL for the resource, if applicable.","t":"`$STRING`","key$":"sso_url","index$":11},"state":{"a":true,"h":"State","n":"state","r":true,"sh":"The state the resource is currently in.","t":"`$STRING`","key$":"state","index$":12},"uuid":{"a":true,"h":"Uuid","n":"uuid","r":true,"sh":"The unique identifier for the addon resource.","t":"`$STRING`","key$":"uuid","index$":13}},"name":"add_on_resource","op":{"create":{"input":"data","name":"create","points":[{"a":true,"co":{"id":"POST /v2/add-ons/saas","source":"openapi3","version":2},"g":{},"k":"http","m":"POST","o":"/v2/add-ons/saas","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v2"},{"lit":"add-ons"},{"lit":"saas"}],"t":{"req":"`reqdata`","res":"`body.resource`"},"index$":0}],"key$":"create"},"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /v2/add-ons/saas","source":"openapi3","version":2},"g":{},"k":"http","m":"GET","o":"/v2/add-ons/saas","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v2"},{"lit":"add-ons"},{"lit":"saas"}],"t":{"req":"`reqdata`","res":"`body.resources`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /v2/add-ons/saas/{resource_uuid}","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":"123e4567-e89b-12d3-a456-426614174000","k":"param","n":"resource_uuid","or":"resource_uuid","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/v2/add-ons/saas/{resource_uuid}","q":{"exist":["resource_uuid"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v2"},{"lit":"add-ons"},{"lit":"saas"},{"var":"resource_uuid"}],"t":{"req":"`reqdata`","res":"`body.resource`"},"index$":0}],"key$":"load"},"remove":{"input":"data","name":"remove","points":[{"a":true,"co":{"id":"DELETE /v2/add-ons/saas/{resource_uuid}","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":"4de7ac8b-495b-4884-9a69-1050c6793cd6","k":"param","n":"resource_uuid","or":"resource_uuid","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"DELETE","o":"/v2/add-ons/saas/{resource_uuid}","q":{"exist":["resource_uuid"]},"r":{},"s":[{"lit":"v2"},{"lit":"add-ons"},{"lit":"saas"},{"var":"resource_uuid"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"remove"},"update":{"input":"data","name":"update","points":[{"a":true,"co":{"id":"PATCH /v2/add-ons/saas/{resource_uuid}","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":"123e4567-e89b-12d3-a456-426614174000","k":"param","n":"resource_uuid","or":"resource_uuid","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"PATCH","o":"/v2/add-ons/saas/{resource_uuid}","q":{"exist":["resource_uuid"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v2"},{"lit":"add-ons"},{"lit":"saas"},{"var":"resource_uuid"}],"t":{"req":"`reqdata`","res":"`body.resource`"},"index$":0}],"key$":"update"}},"relations":{"ancestors":[]},"key$":"add_on_resource","name__orig":"add_on_resource","Name":"AddOnResource","name_":"add_on_resource","name-":"add-on-resource","NAME":"ADD_ON_RESOURCE","index$":6}, {"active":true,"entity":"add_on_resource","key$":"BasicAddOnResourceFlow","kind":"basic","name":"BasicAddOnResourceFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"add_on_resource_ref01"},"m":{},"o":"create","s":[],"v":[],"index$":0},{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"add_on_resource_ref01"}}],"index$":1},{"a":false,"d":{},"i":{"ref":"add_on_resource_ref01","srcdatavar":"add_on_resource_ref01_data","suffix":"_up0","textfield":"app_name"},"m":{},"o":"update","s":[{"apply":"TextFieldMark","def":{"mark":"Mark01-add_on_resource_ref01"}}],"v":[],"unreachable":true},{"a":false,"d":{},"i":{"ref":"add_on_resource_ref01","srcdatavar":"add_on_resource_ref01_data","suffix":"_dt0"},"m":{"id":"add_on_resource01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-add_on_resource_ref01"}}],"unreachable":true},{"a":false,"d":{},"i":{"ref":"add_on_resource_ref01","suffix":"_rm0"},"m":{"id":"add_on_resource01"},"o":"remove","s":[],"v":[],"unreachable":true},{"a":true,"d":{},"i":{"suffix":"_rt0"},"m":{},"o":"list","s":[],"v":[{"apply":"ItemNotExists","def":{"ref":"add_on_resource_ref01"}}],"index$":2}]}, 'AddOnResource', {"POST /v2/add-ons/saas":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"allOf":[{"type":"object","properties":{"app_slug":{"title":"app_slug","type":"string","example":"example-app","description":"The slug identifier for the application associated with the resource.","key$":"app_slug"},"plan_slug":{"title":"plan_slug","type":"string","example":"basic_plan","description":"The slug identifier for the plan associated with the resource.","key$":"plan_slug"},"name":{"title":"name","type":"string","example":"my-resource-01","description":"The name of the addon resource.","key$":"name"},"metadata":{"title":"metadata","type":"array","items":{"type":"object","properties":{},"required":[],"x-ref":"#/components/schemas/addons_resource_metadata"},"description":"Metadata associated with the resource, set by the user. Metadata expected varies per app, and can be verified with a GET request to \"/v2/add-ons/apps/{app_slug}/metadata\"","key$":"metadata"},"linked_droplet_id":{"title":"linked_droplet_id","type":"integer","example":12345678,"description":"ID of the droplet to be linked to this resource, if applicable.","key$":"linked_droplet_id"},"fleet_uuid":{"title":"fleet_uuid","type":"string","example":"f1234567-89ab-cdef-0123-456789abcdef01","description":"UUID of the fleet/project to which this resource will belong.","key$":"fleet_uuid"}},"required":["app_slug","plan_slug","name","metadata"],"x-ref":"#/components/schemas/addons_resource_new"}],"required":["name","app_slug","plan_slug","metadata"],"index$":1}}}},"parameters":[]},"GET /v2/add-ons/saas":{"protocol":"http","parameters":[]},"GET /v2/add-ons/saas/{resource_uuid}":{"protocol":"http","parameters":[{"name":"resource_uuid","in":"path","required":true,"example":"123e4567-e89b-12d3-a456-426614174000","schema":{"type":"string"},"description":"The UUID of the add-on resource to retrieve.","index$":0}]},"DELETE /v2/add-ons/saas/{resource_uuid}":{"protocol":"http","parameters":[{"name":"resource_uuid","in":"path","description":"A unique identifier for the add-on resource.","required":true,"schema":{"type":"string","format":"uuid"},"example":"4de7ac8b-495b-4884-9a69-1050c6793cd6","x-ref":"#/components/parameters/resource_uuid","index$":0}]},"PATCH /v2/add-ons/saas/{resource_uuid}":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","properties":{"name":{"type":"string","description":"The new name for the add-on resource.","example":"new-name","key$":"name"}},"required":["name"],"index$":1}}}},"parameters":[{"name":"resource_uuid","in":"path","required":true,"example":"123e4567-e89b-12d3-a456-426614174000","schema":{"type":"string"},"description":"The UUID of the add-on resource to rename.","index$":0}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const add_on_resource_ref01_ent = client.AddOnResource()
    let add_on_resource_ref01_data = setup.data.new.add_on_resource['add_on_resource_ref01']

    add_on_resource_ref01_data = (await add_on_resource_ref01_ent.create(add_on_resource_ref01_data)).data()
    assert(null != add_on_resource_ref01_data)


    // LIST
    const add_on_resource_ref01_match: any = {}

    const add_on_resource_ref01_list = (await add_on_resource_ref01_ent.list(add_on_resource_ref01_match)).map((e: any) => e.data())


    // LIST
    const add_on_resource_ref01_match_rt0: any = {}

    const add_on_resource_ref01_list_rt0 = (await add_on_resource_ref01_ent.list(add_on_resource_ref01_match_rt0)).map((e: any) => e.data())


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
      '../../../../.sdk/test/entity/add_on_resource/AddOnResourceTestData.json')

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
    ['add_on_resource01','add_on_resource02','add_on_resource03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'DIGITALOCEAN_TEST_ADD_ON_RESOURCE_ENTID': idmap,
    'DIGITALOCEAN_TEST_LIVE': 'FALSE',
    'DIGITALOCEAN_TEST_EXPLAIN': 'FALSE',
    'DIGITALOCEAN_APIKEY': '',
  })

  idmap = env['DIGITALOCEAN_TEST_ADD_ON_RESOURCE_ENTID']

  const live = 'TRUE' === env.DIGITALOCEAN_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['DIGITALOCEAN_TEST_ADD_ON_RESOURCE_ENTID']
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
  
