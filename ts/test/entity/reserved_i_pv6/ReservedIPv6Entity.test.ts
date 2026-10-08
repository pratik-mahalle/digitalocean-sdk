

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


describe('ReservedIPv6Entity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when DIGITALOCEAN_TEST_LIVE=TRUE.
  afterEach(liveDelay('DIGITALOCEAN_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = DigitaloceanSDK.test()
    const ent = testsdk.ReservedIPv6()
    assert(null != ent)
  })


  class FailHook extends BaseFeature {
    name = 'failhook'
    version = '0.0.1'
    active = true
    unexpected = 0
    init() { }
    PreSpec() { throw new Error('reserved_i_pv6 hook failed') }
    PreUnexpected() { this.unexpected++ }
  }

  test('stream-error', async () => {
    const offline = { net: { offline: true } }
    await assert.rejects(async () => {
      for await (const _item of DigitaloceanSDK.test(offline).ReservedIPv6().stream('list')) { }
    }, /offline/)

    for await (const _item of DigitaloceanSDK.test(offline).ReservedIPv6()
      .stream('list', undefined, { ctrl: { throw: false } })) { }

    if (null != (config as any).feature?.rbac) {
      const denied = DigitaloceanSDK.test(undefined, { feature: { rbac: { active: true, deny: true } } })
      await assert.rejects(async () => {
        for await (const _item of denied.ReservedIPv6().stream('list')) { }
      }, (err: any) => 'rbac_denied' === err.code)
    }
  })

  test('stream-ctrl', async () => {
    const explain: any = {}
    const ctrl: any = { explain }
    for await (const _item of DigitaloceanSDK.test().ReservedIPv6().stream('list', undefined, { ctrl })) { }
    assert.deepStrictEqual(Object.keys(ctrl), ['explain'])
    assert(explain === ctrl.explain && 0 < Object.keys(explain).length)
  })

  test('unexpected', async () => {
    const hook = new FailHook()
    const client = new DigitaloceanSDK({ feature: { test: { active: true } }, extend: [hook] })
    await assert.rejects(client.ReservedIPv6().list(), /hook failed/)
    assert(0 < hook.unexpected)

    const fired = hook.unexpected
    assert.strictEqual(await client.ReservedIPv6().list(undefined, { throw: false }), undefined)
    assert(fired < hook.unexpected)
  })

  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = DigitaloceanSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.ReservedIPv6().list({"page":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.DIGITALOCEAN_TEST_LIVE
    for (const op of ['create', 'list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'reserved_i_pv6.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"droplet":{"a":true,"h":"Droplet","n":"droplet","r":false,"sh":"Requires `droplet:read` scope.","t":"`$ANY`","union":{"branches":2,"count":1,"depth":0},"key$":"droplet","index$":0},"ip":{"a":true,"fo":"ipv6","h":"Ip","n":"ip","r":false,"sh":"The public IP address of the reserved IPv6.","t":"`$STRING`","key$":"ip","index$":1},"region_slug":{"a":true,"h":"Region Slug","n":"region_slug","op":{"create":{"req":true,"type":"`$STRING`"}},"r":false,"sh":"The region that the reserved IPv6 is reserved to.","t":"`$STRING`","key$":"region_slug","index$":2},"reserved_at":{"a":true,"fo":"date-time","h":"Reserved At","n":"reserved_at","r":false,"sh":"The date and time when the reserved IPv6 was reserved.","t":"`$STRING`","key$":"reserved_at","index$":3}},"name":"reserved_i_pv6","op":{"create":{"input":"data","name":"create","points":[{"a":true,"co":{"id":"POST /v2/reserved_ipv6","source":"openapi3","version":2},"g":{},"k":"http","m":"POST","o":"/v2/reserved_ipv6","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v2"},{"lit":"reserved_ipv6"}],"t":{"req":"`reqdata`","res":"`body.reserved_ipv6`"},"index$":0}],"key$":"create"},"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /v2/reserved_ipv6","source":"openapi3","version":2},"g":{"query":[{"a":true,"ex":1,"k":"query","n":"page","or":"page","r":false,"t":"`$INTEGER`","index$":0},{"a":true,"ex":2,"k":"query","n":"per_page","or":"per_page","r":false,"t":"`$INTEGER`","index$":1}]},"k":"http","m":"GET","o":"/v2/reserved_ipv6","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v2"},{"lit":"reserved_ipv6"}],"t":{"req":"`reqdata`","res":"`body.reserved_ipv6s`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /v2/reserved_ipv6/{reserved_ipv6}","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":"2409:40d0:f7:1017:74b4:3a96:105e:4c6e","k":"param","n":"reserved_ipv6","or":"reserved_ipv6","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/v2/reserved_ipv6/{reserved_ipv6}","q":{"exist":["reserved_ipv6"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v2"},{"lit":"reserved_ipv6"},{"var":"reserved_ipv6"}],"t":{"req":"`reqdata`","res":"`body.reserved_ipv6`"},"index$":0}],"key$":"load"},"remove":{"input":"data","name":"remove","points":[{"a":true,"co":{"id":"DELETE /v2/reserved_ipv6/{reserved_ipv6}","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":"2409:40d0:f7:1017:74b4:3a96:105e:4c6e","k":"param","n":"reserved_ipv6","or":"reserved_ipv6","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"DELETE","o":"/v2/reserved_ipv6/{reserved_ipv6}","q":{"exist":["reserved_ipv6"]},"r":{},"s":[{"lit":"v2"},{"lit":"reserved_ipv6"},{"var":"reserved_ipv6"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"remove"}},"relations":{"ancestors":[]},"key$":"reserved_i_pv6","name__orig":"reserved_i_pv6","Name":"ReservedIPv6","name_":"reserved_i_pv6","name-":"reserved-i-pv6","NAME":"RESERVED_I_PV6","index$":194}, {"active":true,"entity":"reserved_i_pv6","key$":"BasicReservedIPv6Flow","kind":"basic","name":"BasicReservedIPv6Flow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"reserved_i_pv6_ref01"},"m":{},"o":"create","s":[],"v":[],"index$":0},{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"reserved_i_pv6_ref01"}}],"index$":1},{"a":false,"d":{},"i":{"ref":"reserved_i_pv6_ref01","srcdatavar":"reserved_i_pv6_ref01_data","suffix":"_dt0"},"m":{"id":"reserved_i_pv601"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-reserved_i_pv6_ref01"}}],"unreachable":true},{"a":false,"d":{},"i":{"ref":"reserved_i_pv6_ref01","suffix":"_rm0"},"m":{"id":"reserved_i_pv601"},"o":"remove","s":[],"v":[],"unreachable":true},{"a":true,"d":{},"i":{"suffix":"_rt0"},"m":{},"o":"list","s":[],"v":[{"apply":"ItemNotExists","def":{"ref":"reserved_i_pv6_ref01"}}],"index$":2}]}, 'ReservedIPv6', {"POST /v2/reserved_ipv6":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"title":"Reserve to Region","type":"object","properties":{"region_slug":{"type":"string","example":"nyc3","description":"The slug identifier for the region the reserved IPv6 will be reserved to.","key$":"region_slug"}},"required":["region_slug"],"x-ref":"#/components/schemas/reserved_ipv6_create","index$":1}}}},"parameters":[]},"GET /v2/reserved_ipv6":{"protocol":"http","parameters":[{"in":"query","name":"per_page","required":false,"description":"Number of items returned per page","schema":{"type":"integer","minimum":1,"default":20,"maximum":200},"example":2,"x-ref":"#/components/parameters/parameters_per_page","index$":0},{"in":"query","name":"page","required":false,"description":"Which 'page' of paginated results to return.","schema":{"type":"integer","minimum":1,"default":1},"example":1,"x-ref":"#/components/parameters/page","index$":1}]},"GET /v2/reserved_ipv6/{reserved_ipv6}":{"protocol":"http","parameters":[{"in":"path","name":"reserved_ipv6","description":"A reserved IPv6 address.","required":true,"schema":{"type":"string","format":"ipv6","minimum":1},"example":"2409:40d0:f7:1017:74b4:3a96:105e:4c6e","x-ref":"#/components/parameters/reserved_ipv6","index$":0}]},"DELETE /v2/reserved_ipv6/{reserved_ipv6}":{"protocol":"http","parameters":[{"in":"path","name":"reserved_ipv6","description":"A reserved IPv6 address.","required":true,"schema":{"type":"string","format":"ipv6","minimum":1},"example":"2409:40d0:f7:1017:74b4:3a96:105e:4c6e","x-ref":"#/components/parameters/reserved_ipv6","index$":0}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const reserved_i_pv6_ref01_ent = client.ReservedIPv6()
    let reserved_i_pv6_ref01_data = setup.data.new.reserved_i_pv6['reserved_i_pv6_ref01']

    reserved_i_pv6_ref01_data = (await reserved_i_pv6_ref01_ent.create(reserved_i_pv6_ref01_data)).data()
    assert(null != reserved_i_pv6_ref01_data)


    // LIST
    const reserved_i_pv6_ref01_match: any = {}

    const reserved_i_pv6_ref01_list = (await reserved_i_pv6_ref01_ent.list(reserved_i_pv6_ref01_match)).map((e: any) => e.data())


    // LIST
    const reserved_i_pv6_ref01_match_rt0: any = {}

    const reserved_i_pv6_ref01_list_rt0 = (await reserved_i_pv6_ref01_ent.list(reserved_i_pv6_ref01_match_rt0)).map((e: any) => e.data())


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
      '../../../../.sdk/test/entity/reserved_i_pv6/ReservedIPv6TestData.json')

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
    ['reserved_i_pv601','reserved_i_pv602','reserved_i_pv603'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'DIGITALOCEAN_TEST_RESERVED_I_PV6_ENTID': idmap,
    'DIGITALOCEAN_TEST_LIVE': 'FALSE',
    'DIGITALOCEAN_TEST_EXPLAIN': 'FALSE',
    'DIGITALOCEAN_APIKEY': '',
  })

  idmap = env['DIGITALOCEAN_TEST_RESERVED_I_PV6_ENTID']

  const live = 'TRUE' === env.DIGITALOCEAN_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['DIGITALOCEAN_TEST_RESERVED_I_PV6_ENTID']
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
  
