

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


describe('AppInstanceEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when DIGITALOCEAN_TEST_LIVE=TRUE.
  afterEach(liveDelay('DIGITALOCEAN_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = DigitaloceanSDK.test()
    const ent = testsdk.AppInstance()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = DigitaloceanSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.AppInstance().list({"id":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.DIGITALOCEAN_TEST_LIVE
    for (const op of []) {
      if (!live && maybeSkipControl(t, 'entityOp', 'app_instance.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"component_name":{"a":true,"h":"Component Name","n":"component_name","r":false,"sh":"Name of the component, from the app spec.","t":"`$STRING`","key$":"component_name","index$":0},"component_type":{"a":true,"h":"Component Type","n":"component_type","r":false,"sh":"Supported compute component by DigitalOcean App Platform.","t":"`$STRING`","key$":"component_type","index$":1},"id":{"a":true,"h":"Id","n":"id","r":false,"t":"`$STRING`","key$":"id","index$":2},"instance_alias":{"a":true,"h":"Instance Alias","n":"instance_alias","r":false,"sh":"Readable identifier, an alias of the instance name, reference for mapping insights to instance names.","t":"`$STRING`","key$":"instance_alias","index$":3},"instance_name":{"a":true,"h":"Instance Name","n":"instance_name","r":false,"sh":"Name of the instance, which is a unique identifier for the instance.","t":"`$STRING`","key$":"instance_name","index$":4}},"id":{"field":"id","name":"id"},"name":"app_instance","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /v2/apps/{app_id}/instances","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":"4f6c71e2-1e90-4762-9fee-6cc4a0a9f2cf","k":"param","n":"id","or":"app_id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/v2/apps/{app_id}/instances","q":{"exist":["id"]},"r":{"param":{"app_id":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v2"},{"lit":"apps"},{"var":"id"},{"lit":"instances"}],"t":{"req":"`reqdata`","res":"`body.instances`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"app_instance","name__orig":"app_instance","Name":"AppInstance","name_":"app_instance","name-":"app-instance","NAME":"APP_INSTANCE","index$":105}, {"active":true,"entity":"app_instance","key$":"BasicAppInstanceFlow","kind":"basic","name":"BasicAppInstanceFlow","param":{},"step":[{"a":false,"d":{},"i":{},"m":{"app_id":"app01"},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"app_instance_ref01"}}],"unreachable":true}]}, 'AppInstance', {"GET /v2/apps/{app_id}/instances":{"protocol":"http","parameters":[{"description":"The app ID","in":"path","name":"app_id","required":true,"schema":{"type":"string"},"example":"4f6c71e2-1e90-4762-9fee-6cc4a0a9f2cf","x-ref":"#/components/parameters/app_id","index$":0}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let app_instance_ref01_data = Object.values(setup.data.existing.app_instance)[0] as any

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
      '../../../../.sdk/test/entity/app_instance/AppInstanceTestData.json')

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
    ['app_instance01','app_instance02','app_instance03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'DIGITALOCEAN_TEST_APP_INSTANCE_ENTID': idmap,
    'DIGITALOCEAN_TEST_LIVE': 'FALSE',
    'DIGITALOCEAN_TEST_EXPLAIN': 'FALSE',
    'DIGITALOCEAN_APIKEY': '',
  })

  idmap = env['DIGITALOCEAN_TEST_APP_INSTANCE_ENTID']

  const live = 'TRUE' === env.DIGITALOCEAN_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['DIGITALOCEAN_TEST_APP_INSTANCE_ENTID']
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
  
