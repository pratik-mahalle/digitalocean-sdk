

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


describe('AddOnPlanEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when DIGITALOCEAN_TEST_LIVE=TRUE.
  afterEach(liveDelay('DIGITALOCEAN_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = DigitaloceanSDK.test()
    const ent = testsdk.AddOnPlan()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = DigitaloceanSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.AddOnPlan().update({"resource_uuid":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.DIGITALOCEAN_TEST_LIVE
    for (const op of []) {
      if (!live && maybeSkipControl(t, 'entityOp', 'add_on_plan.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"app_name":{"a":true,"h":"App Name","n":"app_name","r":false,"sh":"The name of the application associated with the resource.","t":"`$STRING`","key$":"app_name","index$":0},"app_slug":{"a":true,"h":"App Slug","n":"app_slug","r":true,"sh":"The slug identifier for the application associated with the resource.","t":"`$STRING`","key$":"app_slug","index$":1},"has_config":{"a":true,"h":"Has Config","n":"has_config","r":true,"sh":"Indicates if the resource has configuration values set by the vendor.","t":"`$BOOLEAN`","key$":"has_config","index$":2},"message":{"a":true,"h":"Message","n":"message","r":false,"sh":"A message related to the resource, if applicable.","t":"`$STRING`","key$":"message","index$":3},"metadata":{"a":true,"h":"Metadata","n":"metadata","r":false,"sh":"Metadata associated with the resource, set by the user.","t":"`$ARRAY`","union":{"branches":2,"count":1,"depth":3},"key$":"metadata","index$":4},"name":{"a":true,"h":"Name","n":"name","r":true,"sh":"The name of the addon resource.","t":"`$STRING`","key$":"name","index$":5},"plan_name":{"a":true,"h":"Plan Name","n":"plan_name","r":false,"sh":"The name of the plan associated with the resource.","t":"`$STRING`","key$":"plan_name","index$":6},"plan_price_per_month":{"a":true,"h":"Plan Price Per Month","n":"plan_price_per_month","r":false,"sh":"The price of the plan per month in US dollars.","t":"`$INTEGER`","key$":"plan_price_per_month","index$":7},"plan_slug":{"a":true,"h":"Plan Slug","n":"plan_slug","r":true,"sh":"The slug identifier for the plan associated with the resource.","t":"`$STRING`","key$":"plan_slug","index$":8},"sso_url":{"a":true,"h":"Sso Url","n":"sso_url","r":false,"sh":"The Single Sign-On URL for the resource, if applicable.","t":"`$STRING`","key$":"sso_url","index$":9},"state":{"a":true,"h":"State","n":"state","r":true,"sh":"The state the resource is currently in.","t":"`$STRING`","key$":"state","index$":10},"uuid":{"a":true,"h":"Uuid","n":"uuid","r":true,"sh":"The unique identifier for the addon resource.","t":"`$STRING`","key$":"uuid","index$":11}},"name":"add_on_plan","op":{"update":{"input":"data","name":"update","points":[{"a":true,"co":{"id":"PATCH /v2/add-ons/saas/{resource_uuid}/plan","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":"123e4567-e89b-12d3-a456-426614174000","k":"param","n":"resource_uuid","or":"resource_uuid","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"PATCH","o":"/v2/add-ons/saas/{resource_uuid}/plan","q":{"exist":["resource_uuid"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v2"},{"lit":"add-ons"},{"lit":"saas"},{"var":"resource_uuid"},{"lit":"plan"}],"t":{"req":"`reqdata`","res":"`body.resource`"},"index$":0}],"key$":"update"}},"relations":{"ancestors":[]},"key$":"add_on_plan","name__orig":"add_on_plan","Name":"AddOnPlan","name_":"add_on_plan","name-":"add-on-plan","NAME":"ADD_ON_PLAN","index$":5}, {"active":true,"entity":"add_on_plan","key$":"BasicAddOnPlanFlow","kind":"basic","name":"BasicAddOnPlanFlow","param":{},"step":[{"a":false,"d":{},"i":{"ref":"add_on_plan_ref01","srcdatavar":"add_on_plan_ref01_data","suffix":"_up0","textfield":"app_name"},"m":{},"o":"update","s":[{"apply":"TextFieldMark","def":{"mark":"Mark01-add_on_plan_ref01"}}],"v":[],"unreachable":true}]}, 'AddOnPlan', {"PATCH /v2/add-ons/saas/{resource_uuid}/plan":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","properties":{"plan_slug":{"type":"string","description":"The slug identifier for the new plan to apply to the add-on resource.","example":"basic_plan","key$":"plan_slug"}},"required":["plan_slug"],"index$":1}}}},"parameters":[{"name":"resource_uuid","in":"path","required":true,"example":"123e4567-e89b-12d3-a456-426614174000","schema":{"type":"string"},"description":"The UUID of the add-on resource to update.","index$":0}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let add_on_plan_ref01_data = Object.values(setup.data.existing.add_on_plan)[0] as any

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
      '../../../../.sdk/test/entity/add_on_plan/AddOnPlanTestData.json')

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
    ['add_on_plan01','add_on_plan02','add_on_plan03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'DIGITALOCEAN_TEST_ADD_ON_PLAN_ENTID': idmap,
    'DIGITALOCEAN_TEST_LIVE': 'FALSE',
    'DIGITALOCEAN_TEST_EXPLAIN': 'FALSE',
    'DIGITALOCEAN_APIKEY': '',
  })

  idmap = env['DIGITALOCEAN_TEST_ADD_ON_PLAN_ENTID']

  const live = 'TRUE' === env.DIGITALOCEAN_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['DIGITALOCEAN_TEST_ADD_ON_PLAN_ENTID']
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
  
