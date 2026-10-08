

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


describe('ReservedIPv6ActionEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when DIGITALOCEAN_TEST_LIVE=TRUE.
  afterEach(liveDelay('DIGITALOCEAN_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = DigitaloceanSDK.test()
    const ent = testsdk.ReservedIPv6Action()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = DigitaloceanSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.ReservedIPv6Action().create({"reserved_ipv6_id":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.DIGITALOCEAN_TEST_LIVE
    for (const op of ['create']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'reserved_i_pv6_action.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"action":{"a":true,"h":"Action","n":"action","r":false,"t":"`$OBJECT`","key$":"action","index$":0}},"name":"reserved_i_pv6_action","op":{"create":{"input":"data","name":"create","points":[{"a":true,"co":{"id":"POST /v2/reserved_ipv6/{reserved_ipv6}/actions","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":"2409:40d0:f7:1017:74b4:3a96:105e:4c6e","k":"param","n":"reserved_ipv6_id","or":"reserved_ipv6","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"POST","o":"/v2/reserved_ipv6/{reserved_ipv6}/actions","q":{"exist":["reserved_ipv6_id"]},"r":{"param":{"reserved_ipv6":"reserved_ipv6_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v2"},{"lit":"reserved_ipv6"},{"var":"reserved_ipv6_id"},{"lit":"actions"}],"t":{"req":"`reqdata`","res":"`body.action`"},"index$":0}],"key$":"create"}},"relations":{"ancestors":[]},"key$":"reserved_i_pv6_action","name__orig":"reserved_i_pv6_action","Name":"ReservedIPv6Action","name_":"reserved_i_pv6_action","name-":"reserved-i-pv6-action","NAME":"RESERVED_I_PV6_ACTION","index$":201}, {"active":true,"entity":"reserved_i_pv6_action","key$":"BasicReservedIPv6ActionFlow","kind":"basic","name":"BasicReservedIPv6ActionFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"reserved_i_pv6_action_ref01"},"m":{"reserved_ipv6_id":"reserved_ipv601"},"o":"create","s":[],"v":[],"index$":0}]}, 'ReservedIPv6Action', {"POST /v2/reserved_ipv6/{reserved_ipv6}/actions":{"protocol":"http","requestBody":{"description":"The `type` attribute set in the request body will specify the action that\nwill be taken on the reserved IPv6.\n","content":{"application/json":{"schema":{"anyOf":[{"allOf":[{"type":"object","required":["type"],"properties":{"type":{}},"discriminator":{"propertyName":"type","mapping":{}},"x-ref":"#/components/schemas/reserved_ipv6_action_type"},{"type":"object","required":["type"]}],"x-ref":"#/components/schemas/reserved_ipv6_action_unassign"},{"allOf":[{"type":"object","required":["type"],"properties":{"type":{}},"discriminator":{"propertyName":"type","mapping":{}},"x-ref":"#/components/schemas/reserved_ipv6_action_type"},{"type":"object","required":["type","droplet_id"],"properties":{"droplet_id":{}}}],"x-ref":"#/components/schemas/reserved_ipv6_action_assign"}],"discriminator":{"propertyName":"type","mapping":{"unassign":"#/components/schemas/reserved_ipv6_action_unassign","assign":"#/components/schemas/reserved_ipv6_action_assign"}},"index$":1}}}},"parameters":[{"in":"path","name":"reserved_ipv6","description":"A reserved IPv6 address.","required":true,"schema":{"type":"string","format":"ipv6","minimum":1},"example":"2409:40d0:f7:1017:74b4:3a96:105e:4c6e","x-ref":"#/components/parameters/reserved_ipv6","index$":0}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const reserved_i_pv6_action_ref01_ent = client.ReservedIPv6Action()
    let reserved_i_pv6_action_ref01_data = setup.data.new.reserved_i_pv6_action['reserved_i_pv6_action_ref01']
    reserved_i_pv6_action_ref01_data['reserved_ipv6_id'] = setup.idmap['reserved_ipv601']

    reserved_i_pv6_action_ref01_data = (await reserved_i_pv6_action_ref01_ent.create(reserved_i_pv6_action_ref01_data)).data()
    assert(null != reserved_i_pv6_action_ref01_data)


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
      '../../../../.sdk/test/entity/reserved_i_pv6_action/ReservedIPv6ActionTestData.json')

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
    ['reserved_i_pv6_action01','reserved_i_pv6_action02','reserved_i_pv6_action03','reserved_ipv601'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'DIGITALOCEAN_TEST_RESERVED_I_PV6_ACTION_ENTID': idmap,
    'DIGITALOCEAN_TEST_LIVE': 'FALSE',
    'DIGITALOCEAN_TEST_EXPLAIN': 'FALSE',
    'DIGITALOCEAN_APIKEY': '',
  })

  idmap = env['DIGITALOCEAN_TEST_RESERVED_I_PV6_ACTION_ENTID']

  const live = 'TRUE' === env.DIGITALOCEAN_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['DIGITALOCEAN_TEST_RESERVED_I_PV6_ACTION_ENTID']
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
  
