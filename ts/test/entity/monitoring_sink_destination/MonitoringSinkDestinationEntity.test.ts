

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


describe('MonitoringSinkDestinationEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when DIGITALOCEAN_TEST_LIVE=TRUE.
  afterEach(liveDelay('DIGITALOCEAN_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = DigitaloceanSDK.test()
    const ent = testsdk.MonitoringSinkDestination()
    assert(null != ent)
  })


  class FailHook extends BaseFeature {
    name = 'failhook'
    version = '0.0.1'
    active = true
    unexpected = 0
    init() { }
    PreSpec() { throw new Error('monitoring_sink_destination hook failed') }
    PreUnexpected() { this.unexpected++ }
  }

  test('stream-error', async () => {
    const offline = { net: { offline: true } }
    await assert.rejects(async () => {
      for await (const _item of DigitaloceanSDK.test(offline).MonitoringSinkDestination().stream('list')) { }
    }, /offline/)

    for await (const _item of DigitaloceanSDK.test(offline).MonitoringSinkDestination()
      .stream('list', undefined, { ctrl: { throw: false } })) { }

    if (null != (config as any).feature?.rbac) {
      const denied = DigitaloceanSDK.test(undefined, { feature: { rbac: { active: true, deny: true } } })
      await assert.rejects(async () => {
        for await (const _item of denied.MonitoringSinkDestination().stream('list')) { }
      }, (err: any) => 'rbac_denied' === err.code)
    }
  })

  test('stream-ctrl', async () => {
    const explain: any = {}
    const ctrl: any = { explain }
    for await (const _item of DigitaloceanSDK.test().MonitoringSinkDestination().stream('list', undefined, { ctrl })) { }
    assert.deepStrictEqual(Object.keys(ctrl), ['explain'])
    assert(explain === ctrl.explain && 0 < Object.keys(explain).length)
  })

  test('unexpected', async () => {
    const hook = new FailHook()
    const client = new DigitaloceanSDK({ feature: { test: { active: true } }, extend: [hook] })
    await assert.rejects(client.MonitoringSinkDestination().list(), /hook failed/)
    assert(0 < hook.unexpected)

    const fired = hook.unexpected
    assert.strictEqual(await client.MonitoringSinkDestination().list(undefined, { throw: false }), undefined)
    assert(fired < hook.unexpected)
  })

  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = DigitaloceanSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.MonitoringSinkDestination().list({"id":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.DIGITALOCEAN_TEST_LIVE
    for (const op of ['create', 'list', 'update', 'load', 'remove']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'monitoring_sink_destination.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"config":{"a":true,"h":"Config","n":"config","op":{"create":{"req":true,"type":"`$OBJECT`"},"update":{"req":true,"type":"`$OBJECT`"}},"r":false,"sh":"OpenSearch destination configuration with `credentials` omitted.","t":"`$OBJECT`","key$":"config","index$":0},"id":{"a":true,"h":"Id","n":"id","r":false,"sh":"A unique identifier for a destination.","t":"`$STRING`","key$":"id","index$":1},"name":{"a":true,"h":"Name","n":"name","r":false,"sh":"destination name","t":"`$STRING`","key$":"name","index$":2},"type":{"a":true,"h":"Type","n":"type","op":{"create":{"req":true,"type":"`$STRING`"},"update":{"req":true,"type":"`$STRING`"}},"r":false,"sh":"The destination type.","t":"`$STRING`","key$":"type","index$":3}},"id":{"field":"id","name":"id"},"name":"monitoring_sink_destination","op":{"create":{"input":"data","name":"create","points":[{"a":true,"co":{"id":"POST /v2/monitoring/sinks/destinations","source":"openapi3","version":2},"g":{},"k":"http","m":"POST","o":"/v2/monitoring/sinks/destinations","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v2"},{"lit":"monitoring"},{"lit":"sinks"},{"lit":"destinations"}],"t":{"req":"`reqdata`","res":"`body.destination`"},"index$":0}],"key$":"create"},"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /v2/monitoring/sinks/destinations","source":"openapi3","version":2},"g":{},"k":"http","m":"GET","o":"/v2/monitoring/sinks/destinations","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v2"},{"lit":"monitoring"},{"lit":"sinks"},{"lit":"destinations"}],"t":{"req":"`reqdata`","res":"`body.destinations`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /v2/monitoring/sinks/destinations/{destination_uuid}","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":"1a64809f-1708-48ee-a742-dec8d481b8d1","k":"param","n":"id","or":"destination_uuid","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/v2/monitoring/sinks/destinations/{destination_uuid}","q":{"exist":["id"]},"r":{"param":{"destination_uuid":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v2"},{"lit":"monitoring"},{"lit":"sinks"},{"lit":"destinations"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body.destination`"},"index$":0}],"key$":"load"},"remove":{"input":"data","name":"remove","points":[{"a":true,"co":{"id":"DELETE /v2/monitoring/sinks/destinations/{destination_uuid}","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":"1a64809f-1708-48ee-a742-dec8d481b8d1","k":"param","n":"id","or":"destination_uuid","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"DELETE","o":"/v2/monitoring/sinks/destinations/{destination_uuid}","q":{"exist":["id"]},"r":{"param":{"destination_uuid":"id"}},"s":[{"lit":"v2"},{"lit":"monitoring"},{"lit":"sinks"},{"lit":"destinations"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"remove"},"update":{"input":"data","name":"update","points":[{"a":true,"co":{"id":"POST /v2/monitoring/sinks/destinations/{destination_uuid}","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":"1a64809f-1708-48ee-a742-dec8d481b8d1","k":"param","n":"id","or":"destination_uuid","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"POST","o":"/v2/monitoring/sinks/destinations/{destination_uuid}","q":{"exist":["id"]},"r":{"param":{"destination_uuid":"id"}},"s":[{"lit":"v2"},{"lit":"monitoring"},{"lit":"sinks"},{"lit":"destinations"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"update"}},"relations":{"ancestors":[]},"key$":"monitoring_sink_destination","name__orig":"monitoring_sink_destination","Name":"MonitoringSinkDestination","name_":"monitoring_sink_destination","name-":"monitoring-sink-destination","NAME":"MONITORING_SINK_DESTINATION","index$":179}, {"active":true,"entity":"monitoring_sink_destination","key$":"BasicMonitoringSinkDestinationFlow","kind":"basic","name":"BasicMonitoringSinkDestinationFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"monitoring_sink_destination_ref01"},"m":{},"o":"create","s":[],"v":[],"index$":0},{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"monitoring_sink_destination_ref01"}}],"index$":1},{"a":true,"d":{},"i":{"ref":"monitoring_sink_destination_ref01","srcdatavar":"monitoring_sink_destination_ref01_data","suffix":"_up0","textfield":"name"},"m":{},"o":"update","s":[{"apply":"TextFieldMark","def":{"mark":"Mark01-monitoring_sink_destination_ref01"}}],"v":[],"index$":2},{"a":true,"d":{},"i":{"ref":"monitoring_sink_destination_ref01","srcdatavar":"monitoring_sink_destination_ref01_data","suffix":"_dt0"},"m":{"id":"monitoring_sink_destination01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-monitoring_sink_destination_ref01"}}],"index$":3},{"a":true,"d":{},"i":{"ref":"monitoring_sink_destination_ref01","suffix":"_rm0"},"m":{"id":"monitoring_sink_destination01"},"o":"remove","s":[],"v":[],"index$":4},{"a":true,"d":{},"i":{"suffix":"_rt0"},"m":{},"o":"list","s":[],"v":[{"apply":"ItemNotExists","def":{"ref":"monitoring_sink_destination_ref01"}}],"index$":5}]}, 'MonitoringSinkDestination', {"POST /v2/monitoring/sinks/destinations":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","required":["config","type"],"properties":{"name":{"type":"string","description":"destination name","example":"managed_opensearch_cluster","key$":"name"},"type":{"type":"string","enum":["opensearch_dbaas","opensearch_ext"],"description":"The destination type. `opensearch_dbaas` for a DigitalOcean managed OpenSearch\ncluster or `opensearch_ext` for an externally managed one.\n","key$":"type"},"config":{"type":"object","required":["endpoint"],"properties":{"credentials":{"type":"object","description":"Credentials for an OpenSearch cluster user. Optional if `cluster_uuid` is passed.","properties":{"username":{},"password":{}}},"endpoint":{"type":"string","example":"example.com","description":"host of the OpenSearch cluster"},"cluster_uuid":{"type":"string","example":"85148069-7e35-4999-80bd-6fa1637ca385","description":"A unique identifier for a managed OpenSearch cluster."},"cluster_name":{"type":"string","example":"managed_dbaas_cluster","description":"Name of a managed OpenSearch cluster."},"index_name":{"type":"string","description":"OpenSearch index to send logs to.","example":"logs"},"retention_days":{"type":"integer","description":"Number of days to retain logs in an OpenSearch cluster.","example":14,"default":14}},"x-ref":"#/components/schemas/opensearch_config_request","key$":"config"}},"x-ref":"#/components/schemas/destination_request","index$":1},"examples":{"Managed OpenSearch Cluster":{"value":{"name":"managed_opensearch_cluster","type":"opensearch_dbaas","config":{"endpoint":"db-opensearch-nyc3-123456-do-user-123456-0.g.db.ondigitalocean.com","cluster_uuid":"85148069-7e35-4999-80bd-6fa1637ca385","cluster_name":"managed_dbaas_cluster","index_name":"logs","retention_days":14}}},"External OpenSearch Cluster":{"value":{"name":"external_opensearch","type":"opensearch_ext","config":{"endpoint":"example.com","credentials":{"username":"username","password":"password"},"index_name":"logs","retention_days":14}}}}}}},"parameters":[]},"GET /v2/monitoring/sinks/destinations":{"protocol":"http","parameters":[]},"GET /v2/monitoring/sinks/destinations/{destination_uuid}":{"protocol":"http","parameters":[{"in":"path","name":"destination_uuid","description":"A unique identifier for a destination.","required":true,"schema":{"type":"string"},"example":"1a64809f-1708-48ee-a742-dec8d481b8d1","x-ref":"#/components/parameters/destination_uuid","index$":0}]},"DELETE /v2/monitoring/sinks/destinations/{destination_uuid}":{"protocol":"http","parameters":[{"in":"path","name":"destination_uuid","description":"A unique identifier for a destination.","required":true,"schema":{"type":"string"},"example":"1a64809f-1708-48ee-a742-dec8d481b8d1","x-ref":"#/components/parameters/destination_uuid","index$":0}]},"POST /v2/monitoring/sinks/destinations/{destination_uuid}":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","required":["config","type"],"properties":{"name":{"type":"string","description":"destination name","example":"managed_opensearch_cluster","key$":"name"},"type":{"type":"string","enum":["opensearch_dbaas","opensearch_ext"],"description":"The destination type. `opensearch_dbaas` for a DigitalOcean managed OpenSearch\ncluster or `opensearch_ext` for an externally managed one.\n","key$":"type"},"config":{"type":"object","required":["endpoint"],"properties":{"credentials":{"type":"object","description":"Credentials for an OpenSearch cluster user. Optional if `cluster_uuid` is passed.","properties":{"username":{},"password":{}}},"endpoint":{"type":"string","example":"example.com","description":"host of the OpenSearch cluster"},"cluster_uuid":{"type":"string","example":"85148069-7e35-4999-80bd-6fa1637ca385","description":"A unique identifier for a managed OpenSearch cluster."},"cluster_name":{"type":"string","example":"managed_dbaas_cluster","description":"Name of a managed OpenSearch cluster."},"index_name":{"type":"string","description":"OpenSearch index to send logs to.","example":"logs"},"retention_days":{"type":"integer","description":"Number of days to retain logs in an OpenSearch cluster.","example":14,"default":14}},"x-ref":"#/components/schemas/opensearch_config_request","key$":"config"}},"x-ref":"#/components/schemas/destination_request","index$":1}}}},"parameters":[{"in":"path","name":"destination_uuid","description":"A unique identifier for a destination.","required":true,"schema":{"type":"string"},"example":"1a64809f-1708-48ee-a742-dec8d481b8d1","x-ref":"#/components/parameters/destination_uuid","index$":0}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const monitoring_sink_destination_ref01_ent = client.MonitoringSinkDestination()
    let monitoring_sink_destination_ref01_data = setup.data.new.monitoring_sink_destination['monitoring_sink_destination_ref01']

    monitoring_sink_destination_ref01_data = (await monitoring_sink_destination_ref01_ent.create(monitoring_sink_destination_ref01_data)).data()
    assert(null != monitoring_sink_destination_ref01_data.id)


    // LIST
    const monitoring_sink_destination_ref01_match: any = {}

    const monitoring_sink_destination_ref01_list = (await monitoring_sink_destination_ref01_ent.list(monitoring_sink_destination_ref01_match)).map((e: any) => e.data())

    assert(!isempty(select(monitoring_sink_destination_ref01_list, { id: monitoring_sink_destination_ref01_data.id })))


    // UPDATE
    const monitoring_sink_destination_ref01_data_up0: any = {}
    monitoring_sink_destination_ref01_data_up0.id = monitoring_sink_destination_ref01_data.id

    const monitoring_sink_destination_ref01_markdef_up0 = { name: 'name', value: 'Mark01-monitoring_sink_destination_ref01_' + setup.now }
    ;(monitoring_sink_destination_ref01_data_up0 as any)[monitoring_sink_destination_ref01_markdef_up0.name] = monitoring_sink_destination_ref01_markdef_up0.value

    const monitoring_sink_destination_ref01_resdata_up0 = (await monitoring_sink_destination_ref01_ent.update(monitoring_sink_destination_ref01_data_up0)).data()
    assert(monitoring_sink_destination_ref01_resdata_up0.id === monitoring_sink_destination_ref01_data_up0.id)

    assert((monitoring_sink_destination_ref01_resdata_up0 as any)[monitoring_sink_destination_ref01_markdef_up0.name] === monitoring_sink_destination_ref01_markdef_up0.value)


    // LOAD
    const monitoring_sink_destination_ref01_match_dt0: any = {}
    monitoring_sink_destination_ref01_match_dt0.id = monitoring_sink_destination_ref01_data.id
    const monitoring_sink_destination_ref01_data_dt0 = (await monitoring_sink_destination_ref01_ent.load(monitoring_sink_destination_ref01_match_dt0)).data()
    assert(monitoring_sink_destination_ref01_data_dt0.id === monitoring_sink_destination_ref01_data.id)


    // REMOVE
    const monitoring_sink_destination_ref01_match_rm0: any = { id: monitoring_sink_destination_ref01_data.id }
    await monitoring_sink_destination_ref01_ent.remove(monitoring_sink_destination_ref01_match_rm0)
  

    // LIST
    const monitoring_sink_destination_ref01_match_rt0: any = {}

    const monitoring_sink_destination_ref01_list_rt0 = (await monitoring_sink_destination_ref01_ent.list(monitoring_sink_destination_ref01_match_rt0)).map((e: any) => e.data())

    assert(isempty(select(monitoring_sink_destination_ref01_list_rt0, { id: monitoring_sink_destination_ref01_data.id })))


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
      '../../../../.sdk/test/entity/monitoring_sink_destination/MonitoringSinkDestinationTestData.json')

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
    ['monitoring_sink_destination01','monitoring_sink_destination02','monitoring_sink_destination03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'DIGITALOCEAN_TEST_MONITORING_SINK_DESTINATION_ENTID': idmap,
    'DIGITALOCEAN_TEST_LIVE': 'FALSE',
    'DIGITALOCEAN_TEST_EXPLAIN': 'FALSE',
    'DIGITALOCEAN_APIKEY': '',
  })

  idmap = env['DIGITALOCEAN_TEST_MONITORING_SINK_DESTINATION_ENTID']

  const live = 'TRUE' === env.DIGITALOCEAN_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['DIGITALOCEAN_TEST_MONITORING_SINK_DESTINATION_ENTID']
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
  
