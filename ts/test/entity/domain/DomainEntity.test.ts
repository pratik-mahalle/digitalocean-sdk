

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


describe('DomainEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when DIGITALOCEAN_TEST_LIVE=TRUE.
  afterEach(liveDelay('DIGITALOCEAN_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = DigitaloceanSDK.test()
    const ent = testsdk.Domain()
    assert(null != ent)
  })


  class FailHook extends BaseFeature {
    name = 'failhook'
    version = '0.0.1'
    active = true
    unexpected = 0
    init() { }
    PreSpec() { throw new Error('domain hook failed') }
    PreUnexpected() { this.unexpected++ }
  }

  test('stream-error', async () => {
    const offline = { net: { offline: true } }
    await assert.rejects(async () => {
      for await (const _item of DigitaloceanSDK.test(offline).Domain().stream('list')) { }
    }, /offline/)

    for await (const _item of DigitaloceanSDK.test(offline).Domain()
      .stream('list', undefined, { ctrl: { throw: false } })) { }

    if (null != (config as any).feature?.rbac) {
      const denied = DigitaloceanSDK.test(undefined, { feature: { rbac: { active: true, deny: true } } })
      await assert.rejects(async () => {
        for await (const _item of denied.Domain().stream('list')) { }
      }, (err: any) => 'rbac_denied' === err.code)
    }
  })

  test('stream-ctrl', async () => {
    const explain: any = {}
    const ctrl: any = { explain }
    for await (const _item of DigitaloceanSDK.test().Domain().stream('list', undefined, { ctrl })) { }
    assert.deepStrictEqual(Object.keys(ctrl), ['explain'])
    assert(explain === ctrl.explain && 0 < Object.keys(explain).length)
  })

  test('unexpected', async () => {
    const hook = new FailHook()
    const client = new DigitaloceanSDK({ feature: { test: { active: true } }, extend: [hook] })
    await assert.rejects(client.Domain().list(), /hook failed/)
    assert(0 < hook.unexpected)

    const fired = hook.unexpected
    assert.strictEqual(await client.Domain().list(undefined, { throw: false }), undefined)
    assert(fired < hook.unexpected)
  })

  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = DigitaloceanSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.Domain().list({"page":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.DIGITALOCEAN_TEST_LIVE
    for (const op of ['create', 'list', 'load', 'remove']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'domain.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"id":{"a":true,"h":"Id","n":"id","r":false,"t":"`$STRING`","key$":"id","index$":0},"ip_address":{"a":true,"h":"Ip Address","n":"ip_address","r":false,"sh":"This optional attribute may contain an IP address.","t":"`$STRING`","wo":true,"key$":"ip_address","index$":1},"name":{"a":true,"h":"Name","n":"name","r":false,"sh":"The name of the domain itself.","t":"`$STRING`","key$":"name","index$":2},"ttl":{"a":true,"h":"Ttl","n":"ttl","r":false,"ro":true,"sh":"This value is the time to live for the records on this domain, in seconds.","t":"`$INTEGER`","key$":"ttl","index$":3},"zone_file":{"a":true,"h":"Zone File","n":"zone_file","r":false,"ro":true,"sh":"This attribute contains the complete contents of the zone file for the selected domain.","t":"`$STRING`","key$":"zone_file","index$":4}},"id":{"field":"id","name":"id"},"name":"domain","op":{"create":{"input":"data","name":"create","points":[{"a":true,"co":{"id":"POST /v2/domains","source":"openapi3","version":2},"g":{},"k":"http","m":"POST","o":"/v2/domains","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v2"},{"lit":"domains"}],"t":{"req":"`reqdata`","res":"`body.domain`"},"index$":0}],"key$":"create"},"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /v2/domains","source":"openapi3","version":2},"g":{"query":[{"a":true,"ex":1,"k":"query","n":"page","or":"page","r":false,"t":"`$INTEGER`","index$":0},{"a":true,"ex":2,"k":"query","n":"per_page","or":"per_page","r":false,"t":"`$INTEGER`","index$":1}]},"k":"http","m":"GET","o":"/v2/domains","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v2"},{"lit":"domains"}],"t":{"req":"`reqdata`","res":"`body.domains`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /v2/domains/{domain_name}","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":"example.com","k":"param","n":"id","or":"domain_name","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/v2/domains/{domain_name}","q":{"exist":["id"]},"r":{"param":{"domain_name":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v2"},{"lit":"domains"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body.domain`"},"index$":0}],"key$":"load"},"remove":{"input":"data","name":"remove","points":[{"a":true,"co":{"id":"DELETE /v2/domains/{domain_name}","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":"example.com","k":"param","n":"id","or":"domain_name","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"DELETE","o":"/v2/domains/{domain_name}","q":{"exist":["id"]},"r":{"param":{"domain_name":"id"}},"s":[{"lit":"v2"},{"lit":"domains"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"remove"}},"relations":{"ancestors":[]},"key$":"domain","name__orig":"domain","Name":"Domain","name_":"domain","name-":"domain","NAME":"DOMAIN","index$":141}, {"active":true,"entity":"domain","key$":"BasicDomainFlow","kind":"basic","name":"BasicDomainFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"domain_ref01"},"m":{},"o":"create","s":[],"v":[],"index$":0},{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"domain_ref01"}}],"index$":1},{"a":true,"d":{},"i":{"ref":"domain_ref01","srcdatavar":"domain_ref01_data","suffix":"_dt0"},"m":{"id":"domain01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-domain_ref01"}}],"index$":2},{"a":true,"d":{},"i":{"ref":"domain_ref01","suffix":"_rm0"},"m":{"id":"domain01"},"o":"remove","s":[],"v":[],"index$":3},{"a":true,"d":{},"i":{"suffix":"_rt0"},"m":{},"o":"list","s":[],"v":[{"apply":"ItemNotExists","def":{"ref":"domain_ref01"}}],"index$":4}]}, 'Domain', {"POST /v2/domains":{"protocol":"http","requestBody":{"content":{"application/json":{"schema":{"type":"object","properties":{"name":{"type":"string","description":"The name of the domain itself. This should follow the standard domain format of domain.TLD. For instance, `example.com` is a valid domain name.","example":"example.com","key$":"name"},"ip_address":{"type":"string","writeOnly":true,"description":"This optional attribute may contain an IP address. When provided, an A record will be automatically created pointing to the apex domain.","example":"192.0.2.1","key$":"ip_address"},"ttl":{"type":"integer","readOnly":true,"nullable":true,"description":"This value is the time to live for the records on this domain, in seconds. This defines the time frame that clients can cache queried information before a refresh should be requested.","example":1800,"key$":"ttl"},"zone_file":{"type":"string","readOnly":true,"nullable":true,"description":"This attribute contains the complete contents of the zone file for the selected domain. Individual domain record resources should be used to get more granular control over records. However, this attribute can also be used to get information about the SOA record, which is created automatically and is not accessible as an individual record resource.","example":"$ORIGIN example.com.\n$TTL 1800\nexample.com. IN SOA ns1.digitalocean.com. hostmaster.example.com. 1415982609 10800 3600 604800 1800\nexample.com. 1800 IN NS ns1.digitalocean.com.\nexample.com. 1800 IN NS ns2.digitalocean.com.\nexample.com. 1800 IN NS ns3.digitalocean.com.\nexample.com. 1800 IN A 1.2.3.4\n","key$":"zone_file"}},"x-ref":"#/components/schemas/domain","index$":1},"example":{"name":"example.com"}}}},"parameters":[]},"GET /v2/domains":{"protocol":"http","parameters":[{"in":"query","name":"per_page","required":false,"description":"Number of items returned per page","schema":{"type":"integer","minimum":1,"default":20,"maximum":200},"example":2,"x-ref":"#/components/parameters/parameters_per_page","index$":0},{"in":"query","name":"page","required":false,"description":"Which 'page' of paginated results to return.","schema":{"type":"integer","minimum":1,"default":1},"example":1,"x-ref":"#/components/parameters/page","index$":1}]},"GET /v2/domains/{domain_name}":{"protocol":"http","parameters":[{"name":"domain_name","description":"The name of the domain itself.","in":"path","schema":{"type":"string"},"example":"example.com","required":true,"x-ref":"#/components/parameters/domain_name","index$":0}]},"DELETE /v2/domains/{domain_name}":{"protocol":"http","parameters":[{"name":"domain_name","description":"The name of the domain itself.","in":"path","schema":{"type":"string"},"example":"example.com","required":true,"x-ref":"#/components/parameters/domain_name","index$":0}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const domain_ref01_ent = client.Domain()
    let domain_ref01_data = setup.data.new.domain['domain_ref01']

    domain_ref01_data = (await domain_ref01_ent.create(domain_ref01_data)).data()
    assert(null != domain_ref01_data.id)


    // LIST
    const domain_ref01_match: any = {}

    const domain_ref01_list = (await domain_ref01_ent.list(domain_ref01_match)).map((e: any) => e.data())

    assert(!isempty(select(domain_ref01_list, { id: domain_ref01_data.id })))


    // LOAD
    const domain_ref01_match_dt0: any = {}
    domain_ref01_match_dt0.id = domain_ref01_data.id
    const domain_ref01_data_dt0 = (await domain_ref01_ent.load(domain_ref01_match_dt0)).data()
    assert(domain_ref01_data_dt0.id === domain_ref01_data.id)


    // REMOVE
    const domain_ref01_match_rm0: any = { id: domain_ref01_data.id }
    await domain_ref01_ent.remove(domain_ref01_match_rm0)
  

    // LIST
    const domain_ref01_match_rt0: any = {}

    const domain_ref01_list_rt0 = (await domain_ref01_ent.list(domain_ref01_match_rt0)).map((e: any) => e.data())

    assert(isempty(select(domain_ref01_list_rt0, { id: domain_ref01_data.id })))


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
      '../../../../.sdk/test/entity/domain/DomainTestData.json')

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
    ['domain01','domain02','domain03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'DIGITALOCEAN_TEST_DOMAIN_ENTID': idmap,
    'DIGITALOCEAN_TEST_LIVE': 'FALSE',
    'DIGITALOCEAN_TEST_EXPLAIN': 'FALSE',
    'DIGITALOCEAN_APIKEY': '',
  })

  idmap = env['DIGITALOCEAN_TEST_DOMAIN_ENTID']

  const live = 'TRUE' === env.DIGITALOCEAN_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['DIGITALOCEAN_TEST_DOMAIN_ENTID']
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
  
