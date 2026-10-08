

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


describe('FloatingIpEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when DIGITALOCEAN_TEST_LIVE=TRUE.
  afterEach(liveDelay('DIGITALOCEAN_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = DigitaloceanSDK.test()
    const ent = testsdk.FloatingIp()
    assert(null != ent)
  })


  class FailHook extends BaseFeature {
    name = 'failhook'
    version = '0.0.1'
    active = true
    unexpected = 0
    init() { }
    PreSpec() { throw new Error('floating_ip hook failed') }
    PreUnexpected() { this.unexpected++ }
  }

  test('stream-error', async () => {
    const offline = { net: { offline: true } }
    await assert.rejects(async () => {
      for await (const _item of DigitaloceanSDK.test(offline).FloatingIp().stream('list')) { }
    }, /offline/)

    for await (const _item of DigitaloceanSDK.test(offline).FloatingIp()
      .stream('list', undefined, { ctrl: { throw: false } })) { }

    if (null != (config as any).feature?.rbac) {
      const denied = DigitaloceanSDK.test(undefined, { feature: { rbac: { active: true, deny: true } } })
      await assert.rejects(async () => {
        for await (const _item of denied.FloatingIp().stream('list')) { }
      }, (err: any) => 'rbac_denied' === err.code)
    }
  })

  test('stream-ctrl', async () => {
    const explain: any = {}
    const ctrl: any = { explain }
    for await (const _item of DigitaloceanSDK.test().FloatingIp().stream('list', undefined, { ctrl })) { }
    assert.deepStrictEqual(Object.keys(ctrl), ['explain'])
    assert(explain === ctrl.explain && 0 < Object.keys(explain).length)
  })

  test('unexpected', async () => {
    const hook = new FailHook()
    const client = new DigitaloceanSDK({ feature: { test: { active: true } }, extend: [hook] })
    await assert.rejects(client.FloatingIp().list(), /hook failed/)
    assert(0 < hook.unexpected)

    const fired = hook.unexpected
    assert.strictEqual(await client.FloatingIp().list(undefined, { throw: false }), undefined)
    assert(fired < hook.unexpected)
  })

  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = DigitaloceanSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.FloatingIp().list({"page":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.DIGITALOCEAN_TEST_LIVE
    for (const op of ['create', 'list', 'load', 'remove']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'floating_ip.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"droplet":{"a":true,"h":"Droplet","n":"droplet","r":false,"sh":"The Droplet that the floating IP has been assigned to.","t":"`$ANY`","union":{"branches":2,"count":1,"depth":0},"key$":"droplet","index$":0},"floating_ip":{"a":true,"h":"Floating Ip","n":"floating_ip","r":false,"t":"`$OBJECT`","union":{"branches":2,"count":1,"depth":2},"key$":"floating_ip","index$":1},"id":{"a":true,"h":"Id","n":"id","r":false,"t":"`$STRING`","key$":"id","index$":2},"ip":{"a":true,"fo":"ipv4","h":"Ip","n":"ip","r":false,"sh":"The public IP address of the floating IP.","t":"`$STRING`","key$":"ip","index$":3},"links":{"a":true,"h":"Links","n":"links","r":false,"t":"`$OBJECT`","key$":"links","index$":4},"locked":{"a":true,"h":"Locked","n":"locked","r":false,"sh":"A boolean value indicating whether or not the floating IP has pending actions preventing new ones from being submitted.","t":"`$BOOLEAN`","key$":"locked","index$":5},"project_id":{"a":true,"fo":"uuid","h":"Project Id","n":"project_id","r":false,"sh":"The UUID of the project to which the reserved IP currently belongs.<br><br>Requires `project:read` scope.","t":"`$STRING`","key$":"project_id","index$":6},"region":{"a":true,"h":"Region","n":"region","r":false,"t":"`$ANY`","key$":"region","index$":7}},"id":{"field":"id","name":"id"},"name":"floating_ip","op":{"create":{"input":"data","name":"create","points":[{"a":true,"co":{"id":"POST /v2/floating_ips","source":"openapi3","version":2},"g":{},"k":"http","m":"POST","o":"/v2/floating_ips","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v2"},{"lit":"floating_ips"}],"t":{"req":"`reqdata`","res":"`body.floating_ip`"},"index$":0}],"key$":"create"},"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /v2/floating_ips","source":"openapi3","version":2},"g":{"query":[{"a":true,"ex":1,"k":"query","n":"page","or":"page","r":false,"t":"`$INTEGER`","index$":0},{"a":true,"ex":2,"k":"query","n":"per_page","or":"per_page","r":false,"t":"`$INTEGER`","index$":1}]},"k":"http","m":"GET","o":"/v2/floating_ips","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v2"},{"lit":"floating_ips"}],"t":{"req":"`reqdata`","res":"`body.floating_ips`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /v2/floating_ips/{floating_ip}","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":"45.55.96.47","k":"param","n":"id","or":"floating_ip","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/v2/floating_ips/{floating_ip}","q":{"exist":["id"]},"r":{"param":{"floating_ip":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v2"},{"lit":"floating_ips"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body.floating_ip`"},"index$":0}],"key$":"load"},"remove":{"input":"data","name":"remove","points":[{"a":true,"co":{"id":"DELETE /v2/floating_ips/{floating_ip}","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":"45.55.96.47","k":"param","n":"id","or":"floating_ip","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"DELETE","o":"/v2/floating_ips/{floating_ip}","q":{"exist":["id"]},"r":{"param":{"floating_ip":"id"}},"s":[{"lit":"v2"},{"lit":"floating_ips"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"remove"}},"relations":{"ancestors":[]},"key$":"floating_ip","name__orig":"floating_ip","Name":"FloatingIp","name_":"floating_ip","name-":"floating-ip","NAME":"FLOATING_IP","index$":149}, {"active":true,"entity":"floating_ip","key$":"BasicFloatingIpFlow","kind":"basic","name":"BasicFloatingIpFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"floating_ip_ref01"},"m":{},"o":"create","s":[],"v":[],"index$":0},{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"floating_ip_ref01"}}],"index$":1},{"a":true,"d":{},"i":{"ref":"floating_ip_ref01","srcdatavar":"floating_ip_ref01_data","suffix":"_dt0"},"m":{"id":"floating_ip01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-floating_ip_ref01"}}],"index$":2},{"a":true,"d":{},"i":{"ref":"floating_ip_ref01","suffix":"_rm0"},"m":{"id":"floating_ip01"},"o":"remove","s":[],"v":[],"index$":3},{"a":true,"d":{},"i":{"suffix":"_rt0"},"m":{},"o":"list","s":[],"v":[{"apply":"ItemNotExists","def":{"ref":"floating_ip_ref01"}}],"index$":4}]}, 'FloatingIp', {"POST /v2/floating_ips":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"oneOf":[{"title":"Assign to Droplet","type":"object","properties":{"droplet_id":{"type":"integer","example":2457247,"description":"The ID of the Droplet that the floating IP will be assigned to."}},"required":["droplet_id"]},{"title":"Reserve to Region","type":"object","properties":{"region":{"type":"string","example":"nyc3","description":"The slug identifier for the region the floating IP will be reserved to."},"project_id":{"type":"string","format":"uuid","example":"746c6152-2fa2-11ed-92d3-27aaa54e4988","description":"The UUID of the project to which the floating IP will be assigned."}},"required":["region"]}],"x-ref":"#/components/schemas/floating_ip_create","index$":1}}}},"parameters":[]},"GET /v2/floating_ips":{"protocol":"http","parameters":[{"in":"query","name":"per_page","required":false,"description":"Number of items returned per page","schema":{"type":"integer","minimum":1,"default":20,"maximum":200},"example":2,"x-ref":"#/components/parameters/parameters_per_page","index$":0},{"in":"query","name":"page","required":false,"description":"Which 'page' of paginated results to return.","schema":{"type":"integer","minimum":1,"default":1},"example":1,"x-ref":"#/components/parameters/page","index$":1}]},"GET /v2/floating_ips/{floating_ip}":{"protocol":"http","parameters":[{"in":"path","name":"floating_ip","description":"A floating IP address.","required":true,"schema":{"type":"string","format":"ipv4","minimum":1},"example":"45.55.96.47","x-ref":"#/components/parameters/floating_ip","index$":0}]},"DELETE /v2/floating_ips/{floating_ip}":{"protocol":"http","parameters":[{"in":"path","name":"floating_ip","description":"A floating IP address.","required":true,"schema":{"type":"string","format":"ipv4","minimum":1},"example":"45.55.96.47","x-ref":"#/components/parameters/floating_ip","index$":0}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const floating_ip_ref01_ent = client.FloatingIp()
    let floating_ip_ref01_data = setup.data.new.floating_ip['floating_ip_ref01']

    floating_ip_ref01_data = (await floating_ip_ref01_ent.create(floating_ip_ref01_data)).data()
    assert(null != floating_ip_ref01_data.id)


    // LIST
    const floating_ip_ref01_match: any = {}

    const floating_ip_ref01_list = (await floating_ip_ref01_ent.list(floating_ip_ref01_match)).map((e: any) => e.data())

    assert(!isempty(select(floating_ip_ref01_list, { id: floating_ip_ref01_data.id })))


    // LOAD
    const floating_ip_ref01_match_dt0: any = {}
    floating_ip_ref01_match_dt0.id = floating_ip_ref01_data.id
    const floating_ip_ref01_data_dt0 = (await floating_ip_ref01_ent.load(floating_ip_ref01_match_dt0)).data()
    assert(floating_ip_ref01_data_dt0.id === floating_ip_ref01_data.id)


    // REMOVE
    const floating_ip_ref01_match_rm0: any = { id: floating_ip_ref01_data.id }
    await floating_ip_ref01_ent.remove(floating_ip_ref01_match_rm0)
  

    // LIST
    const floating_ip_ref01_match_rt0: any = {}

    const floating_ip_ref01_list_rt0 = (await floating_ip_ref01_ent.list(floating_ip_ref01_match_rt0)).map((e: any) => e.data())

    assert(isempty(select(floating_ip_ref01_list_rt0, { id: floating_ip_ref01_data.id })))


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
      '../../../../.sdk/test/entity/floating_ip/FloatingIpTestData.json')

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
    ['floating_ip01','floating_ip02','floating_ip03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'DIGITALOCEAN_TEST_FLOATING_IP_ENTID': idmap,
    'DIGITALOCEAN_TEST_LIVE': 'FALSE',
    'DIGITALOCEAN_TEST_EXPLAIN': 'FALSE',
    'DIGITALOCEAN_APIKEY': '',
  })

  idmap = env['DIGITALOCEAN_TEST_FLOATING_IP_ENTID']

  const live = 'TRUE' === env.DIGITALOCEAN_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['DIGITALOCEAN_TEST_FLOATING_IP_ENTID']
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
  
