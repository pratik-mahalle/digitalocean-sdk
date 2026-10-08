

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


describe('MonitoringSinkEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when DIGITALOCEAN_TEST_LIVE=TRUE.
  afterEach(liveDelay('DIGITALOCEAN_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = DigitaloceanSDK.test()
    const ent = testsdk.MonitoringSink()
    assert(null != ent)
  })


  class FailHook extends BaseFeature {
    name = 'failhook'
    version = '0.0.1'
    active = true
    unexpected = 0
    init() { }
    PreSpec() { throw new Error('monitoring_sink hook failed') }
    PreUnexpected() { this.unexpected++ }
  }

  test('stream-error', async () => {
    const offline = { net: { offline: true } }
    await assert.rejects(async () => {
      for await (const _item of DigitaloceanSDK.test(offline).MonitoringSink().stream('list')) { }
    }, /offline/)

    for await (const _item of DigitaloceanSDK.test(offline).MonitoringSink()
      .stream('list', undefined, { ctrl: { throw: false } })) { }

    if (null != (config as any).feature?.rbac) {
      const denied = DigitaloceanSDK.test(undefined, { feature: { rbac: { active: true, deny: true } } })
      await assert.rejects(async () => {
        for await (const _item of denied.MonitoringSink().stream('list')) { }
      }, (err: any) => 'rbac_denied' === err.code)
    }
  })

  test('stream-ctrl', async () => {
    const explain: any = {}
    const ctrl: any = { explain }
    for await (const _item of DigitaloceanSDK.test().MonitoringSink().stream('list', undefined, { ctrl })) { }
    assert.deepStrictEqual(Object.keys(ctrl), ['explain'])
    assert(explain === ctrl.explain && 0 < Object.keys(explain).length)
  })

  test('unexpected', async () => {
    const hook = new FailHook()
    const client = new DigitaloceanSDK({ feature: { test: { active: true } }, extend: [hook] })
    await assert.rejects(client.MonitoringSink().list(), /hook failed/)
    assert(0 < hook.unexpected)

    const fired = hook.unexpected
    assert.strictEqual(await client.MonitoringSink().list(undefined, { throw: false }), undefined)
    assert(fired < hook.unexpected)
  })

  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = DigitaloceanSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.MonitoringSink().list({"resource_id":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.DIGITALOCEAN_TEST_LIVE
    for (const op of ['create', 'list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'monitoring_sink.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"destination":{"a":true,"h":"Destination","n":"destination","r":true,"t":"`$OBJECT`","key$":"destination","index$":0},"destination_uuid":{"a":true,"h":"Destination Uuid","n":"destination_uuid","r":false,"sh":"A unique identifier for an already-existing destination.","t":"`$STRING`","key$":"destination_uuid","index$":1},"resources":{"a":true,"h":"Resources","n":"resources","r":false,"sh":"List of resources identified by their URNs.","t":"`$ARRAY`","key$":"resources","index$":2}},"name":"monitoring_sink","op":{"create":{"input":"data","name":"create","points":[{"a":true,"co":{"id":"POST /v2/monitoring/sinks","source":"openapi3","version":2},"g":{},"k":"http","m":"POST","o":"/v2/monitoring/sinks","q":{},"r":{},"s":[{"lit":"v2"},{"lit":"monitoring"},{"lit":"sinks"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"},"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /v2/monitoring/sinks","source":"openapi3","version":2},"g":{"query":[{"a":true,"ex":"do:kubernetes:5ba4518b-b9e2-4978-aa92-2d4c727e8824","k":"query","n":"resource_id","or":"resource_id","r":false,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/v2/monitoring/sinks","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v2"},{"lit":"monitoring"},{"lit":"sinks"}],"t":{"req":"`reqdata`","res":"`body.sinks`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /v2/monitoring/sinks/{sink_uuid}","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":"78b172b6-52c3-4a4b-96d5-78d3f1a0b18c","k":"param","n":"sink_uuid","or":"sink_uuid","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/v2/monitoring/sinks/{sink_uuid}","q":{"exist":["sink_uuid"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v2"},{"lit":"monitoring"},{"lit":"sinks"},{"var":"sink_uuid"}],"t":{"req":"`reqdata`","res":"`body.sink`"},"index$":0}],"key$":"load"},"remove":{"input":"data","name":"remove","points":[{"a":true,"co":{"id":"DELETE /v2/monitoring/sinks/{sink_uuid}","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":"78b172b6-52c3-4a4b-96d5-78d3f1a0b18c","k":"param","n":"sink_uuid","or":"sink_uuid","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"DELETE","o":"/v2/monitoring/sinks/{sink_uuid}","q":{"exist":["sink_uuid"]},"r":{},"s":[{"lit":"v2"},{"lit":"monitoring"},{"lit":"sinks"},{"var":"sink_uuid"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"remove"}},"relations":{"ancestors":[]},"key$":"monitoring_sink","name__orig":"monitoring_sink","Name":"MonitoringSink","name_":"monitoring_sink","name-":"monitoring-sink","NAME":"MONITORING_SINK","index$":178}, {"active":true,"entity":"monitoring_sink","key$":"BasicMonitoringSinkFlow","kind":"basic","name":"BasicMonitoringSinkFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"monitoring_sink_ref01"},"m":{},"o":"create","s":[],"v":[],"index$":0},{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"monitoring_sink_ref01"}}],"index$":1},{"a":false,"d":{},"i":{"ref":"monitoring_sink_ref01","srcdatavar":"monitoring_sink_ref01_data","suffix":"_dt0"},"m":{"id":"monitoring_sink01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-monitoring_sink_ref01"}}],"unreachable":true},{"a":false,"d":{},"i":{"ref":"monitoring_sink_ref01","suffix":"_rm0"},"m":{"id":"monitoring_sink01"},"o":"remove","s":[],"v":[],"unreachable":true},{"a":true,"d":{},"i":{"suffix":"_rt0"},"m":{},"o":"list","s":[],"v":[{"apply":"ItemNotExists","def":{"ref":"monitoring_sink_ref01"}}],"index$":2}]}, 'MonitoringSink', {"POST /v2/monitoring/sinks":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"properties":{"destination_uuid":{"type":"string","example":"9df2b7e9-3fb2-4577-b60a-e9c0d53f9a99","description":"A unique identifier for an already-existing destination.","key$":"destination_uuid"},"resources":{"type":"array","description":"List of resources identified by their URNs.","items":{"type":"object","required":["urn"],"properties":{"urn":{"type":"string","pattern":"^do:kubernetes:.*","example":"do:kubernetes:f453aa14-646e-4cf8-8c62-75a19fb24ec2","description":"The uniform resource name (URN) for the resource in the format do:resource_type:resource_id."},"name":{"type":"string","description":"resource name","example":"managed_kubernetes_cluster"}},"x-ref":"#/components/schemas/sink_resource"},"key$":"resources"}},"index$":1}}}},"parameters":[]},"GET /v2/monitoring/sinks":{"protocol":"http","parameters":[{"in":"query","name":"resource_id","description":"A unique URN for a resource.","schema":{"type":"string","pattern":"^do:(dbaas|domain|droplet|floatingip|loadbalancer|space|volume|kubernetes|vpc):.*","example":"do:droplet:13457723","description":"The uniform resource name (URN) for the resource in the format do:resource_type:resource_id.","x-ref":"#/components/schemas/urn"},"example":"do:kubernetes:5ba4518b-b9e2-4978-aa92-2d4c727e8824","x-ref":"#/components/parameters/resource_id","index$":0}]},"GET /v2/monitoring/sinks/{sink_uuid}":{"protocol":"http","parameters":[{"in":"path","name":"sink_uuid","description":"A unique identifier for a sink.","required":true,"schema":{"type":"string"},"example":"78b172b6-52c3-4a4b-96d5-78d3f1a0b18c","x-ref":"#/components/parameters/sink_uuid","index$":0}]},"DELETE /v2/monitoring/sinks/{sink_uuid}":{"protocol":"http","parameters":[{"in":"path","name":"sink_uuid","description":"A unique identifier for a sink.","required":true,"schema":{"type":"string"},"example":"78b172b6-52c3-4a4b-96d5-78d3f1a0b18c","x-ref":"#/components/parameters/sink_uuid","index$":0}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const monitoring_sink_ref01_ent = client.MonitoringSink()
    let monitoring_sink_ref01_data = setup.data.new.monitoring_sink['monitoring_sink_ref01']

    monitoring_sink_ref01_data = (await monitoring_sink_ref01_ent.create(monitoring_sink_ref01_data)).data()
    assert(null != monitoring_sink_ref01_data)


    // LIST
    const monitoring_sink_ref01_match: any = {}

    const monitoring_sink_ref01_list = (await monitoring_sink_ref01_ent.list(monitoring_sink_ref01_match)).map((e: any) => e.data())


    // LIST
    const monitoring_sink_ref01_match_rt0: any = {}

    const monitoring_sink_ref01_list_rt0 = (await monitoring_sink_ref01_ent.list(monitoring_sink_ref01_match_rt0)).map((e: any) => e.data())


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
      '../../../../.sdk/test/entity/monitoring_sink/MonitoringSinkTestData.json')

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
    ['monitoring_sink01','monitoring_sink02','monitoring_sink03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'DIGITALOCEAN_TEST_MONITORING_SINK_ENTID': idmap,
    'DIGITALOCEAN_TEST_LIVE': 'FALSE',
    'DIGITALOCEAN_TEST_EXPLAIN': 'FALSE',
    'DIGITALOCEAN_APIKEY': '',
  })

  idmap = env['DIGITALOCEAN_TEST_MONITORING_SINK_ENTID']

  const live = 'TRUE' === env.DIGITALOCEAN_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['DIGITALOCEAN_TEST_MONITORING_SINK_ENTID']
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
  
