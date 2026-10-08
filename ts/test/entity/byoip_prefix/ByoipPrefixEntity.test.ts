

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


describe('ByoipPrefixEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when DIGITALOCEAN_TEST_LIVE=TRUE.
  afterEach(liveDelay('DIGITALOCEAN_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = DigitaloceanSDK.test()
    const ent = testsdk.ByoipPrefix()
    assert(null != ent)
  })


  class FailHook extends BaseFeature {
    name = 'failhook'
    version = '0.0.1'
    active = true
    unexpected = 0
    init() { }
    PreSpec() { throw new Error('byoip_prefix hook failed') }
    PreUnexpected() { this.unexpected++ }
  }

  test('stream-error', async () => {
    const offline = { net: { offline: true } }
    await assert.rejects(async () => {
      for await (const _item of DigitaloceanSDK.test(offline).ByoipPrefix().stream('list')) { }
    }, /offline/)

    for await (const _item of DigitaloceanSDK.test(offline).ByoipPrefix()
      .stream('list', undefined, { ctrl: { throw: false } })) { }

    if (null != (config as any).feature?.rbac) {
      const denied = DigitaloceanSDK.test(undefined, { feature: { rbac: { active: true, deny: true } } })
      await assert.rejects(async () => {
        for await (const _item of denied.ByoipPrefix().stream('list')) { }
      }, (err: any) => 'rbac_denied' === err.code)
    }
  })

  test('stream-ctrl', async () => {
    const explain: any = {}
    const ctrl: any = { explain }
    for await (const _item of DigitaloceanSDK.test().ByoipPrefix().stream('list', undefined, { ctrl })) { }
    assert.deepStrictEqual(Object.keys(ctrl), ['explain'])
    assert(explain === ctrl.explain && 0 < Object.keys(explain).length)
  })

  test('unexpected', async () => {
    const hook = new FailHook()
    const client = new DigitaloceanSDK({ feature: { test: { active: true } }, extend: [hook] })
    await assert.rejects(client.ByoipPrefix().list(), /hook failed/)
    assert(0 < hook.unexpected)

    const fired = hook.unexpected
    assert.strictEqual(await client.ByoipPrefix().list(undefined, { throw: false }), undefined)
    assert(fired < hook.unexpected)
  })

  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = DigitaloceanSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.ByoipPrefix().list({"page":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.DIGITALOCEAN_TEST_LIVE
    for (const op of ['create', 'list', 'update', 'load', 'remove']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'byoip_prefix.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"advertise":{"a":true,"h":"Advertise","n":"advertise","r":false,"sh":"Whether the BYOIP prefix should be advertised","t":"`$BOOLEAN`","key$":"advertise","index$":0},"advertised":{"a":true,"h":"Advertised","n":"advertised","r":false,"sh":"Whether the BYOIP prefix is being advertised","t":"`$BOOLEAN`","key$":"advertised","index$":1},"failure_reason":{"a":true,"h":"Failure Reason","n":"failure_reason","r":false,"sh":"Reason for failure, if applicable","t":"`$STRING`","key$":"failure_reason","index$":2},"id":{"a":true,"h":"Id","n":"id","r":false,"t":"`$STRING`","key$":"id","index$":3},"locked":{"a":true,"h":"Locked","n":"locked","r":false,"sh":"Whether the BYOIP prefix is locked","t":"`$BOOLEAN`","key$":"locked","index$":4},"name":{"a":true,"h":"Name","n":"name","r":false,"sh":"Name of the BYOIP prefix","t":"`$STRING`","key$":"name","index$":5},"prefix":{"a":true,"h":"Prefix","n":"prefix","op":{"create":{"req":true,"type":"`$STRING`"}},"r":false,"sh":"The IP prefix in CIDR notation","t":"`$STRING`","key$":"prefix","index$":6},"project_id":{"a":true,"h":"Project Id","n":"project_id","r":false,"sh":"The ID of the project associated with the BYOIP prefix","t":"`$STRING`","key$":"project_id","index$":7},"region":{"a":true,"h":"Region","n":"region","op":{"create":{"req":true,"type":"`$STRING`"}},"r":false,"sh":"Region where the BYOIP prefix is located","t":"`$STRING`","key$":"region","index$":8},"signature":{"a":true,"h":"Signature","n":"signature","r":true,"sh":"The signature hash for the prefix creation request","t":"`$STRING`","key$":"signature","index$":9},"status":{"a":true,"h":"Status","n":"status","r":false,"sh":"Status of the BYOIP prefix","t":"`$STRING`","key$":"status","index$":10},"uuid":{"a":true,"h":"Uuid","n":"uuid","r":false,"sh":"Unique identifier for the BYOIP prefix","t":"`$STRING`","key$":"uuid","index$":11},"validations":{"a":true,"h":"Validations","n":"validations","r":false,"sh":"List of validation statuses for the BYOIP prefix","t":"`$ARRAY`","key$":"validations","index$":12}},"id":{"field":"id","name":"id"},"name":"byoip_prefix","op":{"create":{"input":"data","name":"create","points":[{"a":true,"co":{"id":"POST /v2/byoip_prefixes","source":"openapi3","version":2},"g":{},"k":"http","m":"POST","o":"/v2/byoip_prefixes","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v2"},{"lit":"byoip_prefixes"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"},"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /v2/byoip_prefixes/{byoip_prefix_uuid}/ips","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":"f47ac10b-58cc-4372-a567-0e02b2c3d479","k":"param","n":"id","or":"byoip_prefix_uuid","r":true,"t":"`$STRING`","index$":0}],"query":[{"a":true,"ex":1,"k":"query","n":"page","or":"page","r":false,"t":"`$INTEGER`","index$":0},{"a":true,"ex":2,"k":"query","n":"per_page","or":"per_page","r":false,"t":"`$INTEGER`","index$":1}]},"k":"http","m":"GET","o":"/v2/byoip_prefixes/{byoip_prefix_uuid}/ips","q":{"$action":"ips","exist":["id"]},"r":{"param":{"byoip_prefix_uuid":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v2"},{"lit":"byoip_prefixes"},{"var":"id"},{"lit":"ips"}],"t":{"req":"`reqdata`","res":"`body.ips`"},"index$":0},{"a":true,"co":{"id":"GET /v2/byoip_prefixes","source":"openapi3","version":2},"g":{"query":[{"a":true,"ex":1,"k":"query","n":"page","or":"page","r":false,"t":"`$INTEGER`","index$":0},{"a":true,"ex":2,"k":"query","n":"per_page","or":"per_page","r":false,"t":"`$INTEGER`","index$":1}]},"k":"http","m":"GET","o":"/v2/byoip_prefixes","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v2"},{"lit":"byoip_prefixes"}],"t":{"req":"`reqdata`","res":"`body.byoip_prefixes`"},"index$":1}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /v2/byoip_prefixes/{byoip_prefix_uuid}","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":"f47ac10b-58cc-4372-a567-0e02b2c3d479","k":"param","n":"id","or":"byoip_prefix_uuid","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/v2/byoip_prefixes/{byoip_prefix_uuid}","q":{"exist":["id"]},"r":{"param":{"byoip_prefix_uuid":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v2"},{"lit":"byoip_prefixes"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body.byoip_prefix`"},"index$":0}],"key$":"load"},"remove":{"input":"data","name":"remove","points":[{"a":true,"co":{"id":"DELETE /v2/byoip_prefixes/{byoip_prefix_uuid}","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":"f47ac10b-58cc-4372-a567-0e02b2c3d479","k":"param","n":"id","or":"byoip_prefix_uuid","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"DELETE","o":"/v2/byoip_prefixes/{byoip_prefix_uuid}","q":{"exist":["id"]},"r":{"param":{"byoip_prefix_uuid":"id"}},"s":[{"lit":"v2"},{"lit":"byoip_prefixes"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"remove"},"update":{"input":"data","name":"update","points":[{"a":true,"co":{"id":"PATCH /v2/byoip_prefixes/{byoip_prefix_uuid}","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":"f47ac10b-58cc-4372-a567-0e02b2c3d479","k":"param","n":"id","or":"byoip_prefix_uuid","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"PATCH","o":"/v2/byoip_prefixes/{byoip_prefix_uuid}","q":{"exist":["id"]},"r":{"param":{"byoip_prefix_uuid":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v2"},{"lit":"byoip_prefixes"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body.byoip_prefix`"},"index$":0}],"key$":"update"}},"relations":{"ancestors":[]},"key$":"byoip_prefix","name__orig":"byoip_prefix","Name":"ByoipPrefix","name_":"byoip_prefix","name-":"byoip-prefix","NAME":"BYOIP_PREFIX","index$":125}, {"active":true,"entity":"byoip_prefix","key$":"BasicByoipPrefixFlow","kind":"basic","name":"BasicByoipPrefixFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"byoip_prefix_ref01"},"m":{},"o":"create","s":[],"v":[],"index$":0},{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"byoip_prefix_ref01"}}],"index$":1},{"a":true,"d":{},"i":{"ref":"byoip_prefix_ref01","srcdatavar":"byoip_prefix_ref01_data","suffix":"_up0","textfield":"failure_reason"},"m":{},"o":"update","s":[{"apply":"TextFieldMark","def":{"mark":"Mark01-byoip_prefix_ref01"}}],"v":[],"index$":2},{"a":true,"d":{},"i":{"ref":"byoip_prefix_ref01","srcdatavar":"byoip_prefix_ref01_data","suffix":"_dt0"},"m":{"id":"byoip_prefix01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-byoip_prefix_ref01"}}],"index$":3},{"a":true,"d":{},"i":{"ref":"byoip_prefix_ref01","suffix":"_rm0"},"m":{"id":"byoip_prefix01"},"o":"remove","s":[],"v":[],"index$":4},{"a":true,"d":{},"i":{"suffix":"_rt0"},"m":{},"o":"list","s":[],"v":[{"apply":"ItemNotExists","def":{"ref":"byoip_prefix_ref01"}}],"index$":5}]}, 'ByoipPrefix', {"POST /v2/byoip_prefixes":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","properties":{"prefix":{"type":"string","description":"The IP prefix in CIDR notation to bring","example":"203.11.13.0/24","key$":"prefix"},"region":{"type":"string","description":"The region where the prefix will be created","example":"nyc3","key$":"region"},"signature":{"type":"string","description":"The signature hash for the prefix creation request","example":"<sample-signature>","key$":"signature"}},"required":["prefix","region","signature"],"x-ref":"#/components/schemas/byoip_prefix_create","index$":1}}}},"parameters":[]},"GET /v2/byoip_prefixes/{byoip_prefix_uuid}/ips":{"protocol":"http","parameters":[{"in":"path","name":"byoip_prefix_uuid","description":"The unique identifier for the BYOIP Prefix.","required":true,"schema":{"type":"string","format":"uuid","minimum":1},"example":"f47ac10b-58cc-4372-a567-0e02b2c3d479","x-ref":"#/components/parameters/byoip_prefix","index$":0},{"in":"query","name":"per_page","required":false,"description":"Number of items returned per page","schema":{"type":"integer","minimum":1,"default":20,"maximum":200},"example":2,"x-ref":"#/components/parameters/parameters_per_page","index$":1},{"in":"query","name":"page","required":false,"description":"Which 'page' of paginated results to return.","schema":{"type":"integer","minimum":1,"default":1},"example":1,"x-ref":"#/components/parameters/page","index$":2}]},"GET /v2/byoip_prefixes":{"protocol":"http","parameters":[{"in":"query","name":"per_page","required":false,"description":"Number of items returned per page","schema":{"type":"integer","minimum":1,"default":20,"maximum":200},"example":2,"x-ref":"#/components/parameters/parameters_per_page","index$":0},{"in":"query","name":"page","required":false,"description":"Which 'page' of paginated results to return.","schema":{"type":"integer","minimum":1,"default":1},"example":1,"x-ref":"#/components/parameters/page","index$":1}]},"GET /v2/byoip_prefixes/{byoip_prefix_uuid}":{"protocol":"http","parameters":[{"in":"path","name":"byoip_prefix_uuid","description":"The unique identifier for the BYOIP Prefix.","required":true,"schema":{"type":"string","format":"uuid","minimum":1},"example":"f47ac10b-58cc-4372-a567-0e02b2c3d479","x-ref":"#/components/parameters/byoip_prefix","index$":0}]},"DELETE /v2/byoip_prefixes/{byoip_prefix_uuid}":{"protocol":"http","parameters":[{"in":"path","name":"byoip_prefix_uuid","description":"The unique identifier for the BYOIP Prefix.","required":true,"schema":{"type":"string","format":"uuid","minimum":1},"example":"f47ac10b-58cc-4372-a567-0e02b2c3d479","x-ref":"#/components/parameters/byoip_prefix","index$":0}]},"PATCH /v2/byoip_prefixes/{byoip_prefix_uuid}":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","properties":{"advertise":{"type":"boolean","description":"Whether the BYOIP prefix should be advertised","example":true,"key$":"advertise"}},"x-ref":"#/components/schemas/byoip_prefix_update","index$":1}}}},"parameters":[{"in":"path","name":"byoip_prefix_uuid","schema":{"type":"string","format":"uuid"},"required":true,"description":"A unique identifier for a BYOIP prefix.","example":"f47ac10b-58cc-4372-a567-0e02b2c3d479","index$":0}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const byoip_prefix_ref01_ent = client.ByoipPrefix()
    let byoip_prefix_ref01_data = setup.data.new.byoip_prefix['byoip_prefix_ref01']

    byoip_prefix_ref01_data = (await byoip_prefix_ref01_ent.create(byoip_prefix_ref01_data)).data()
    assert(null != byoip_prefix_ref01_data.id)


    // LIST
    const byoip_prefix_ref01_match: any = {}

    const byoip_prefix_ref01_list = (await byoip_prefix_ref01_ent.list(byoip_prefix_ref01_match)).map((e: any) => e.data())

    assert(!isempty(select(byoip_prefix_ref01_list, { id: byoip_prefix_ref01_data.id })))


    // UPDATE
    const byoip_prefix_ref01_data_up0: any = {}
    byoip_prefix_ref01_data_up0.id = byoip_prefix_ref01_data.id

    const byoip_prefix_ref01_markdef_up0 = { name: 'failure_reason', value: 'Mark01-byoip_prefix_ref01_' + setup.now }
    ;(byoip_prefix_ref01_data_up0 as any)[byoip_prefix_ref01_markdef_up0.name] = byoip_prefix_ref01_markdef_up0.value

    const byoip_prefix_ref01_resdata_up0 = (await byoip_prefix_ref01_ent.update(byoip_prefix_ref01_data_up0)).data()
    assert(byoip_prefix_ref01_resdata_up0.id === byoip_prefix_ref01_data_up0.id)

    assert((byoip_prefix_ref01_resdata_up0 as any)[byoip_prefix_ref01_markdef_up0.name] === byoip_prefix_ref01_markdef_up0.value)


    // LOAD
    const byoip_prefix_ref01_match_dt0: any = {}
    byoip_prefix_ref01_match_dt0.id = byoip_prefix_ref01_data.id
    const byoip_prefix_ref01_data_dt0 = (await byoip_prefix_ref01_ent.load(byoip_prefix_ref01_match_dt0)).data()
    assert(byoip_prefix_ref01_data_dt0.id === byoip_prefix_ref01_data.id)


    // REMOVE
    const byoip_prefix_ref01_match_rm0: any = { id: byoip_prefix_ref01_data.id }
    await byoip_prefix_ref01_ent.remove(byoip_prefix_ref01_match_rm0)
  

    // LIST
    const byoip_prefix_ref01_match_rt0: any = {}

    const byoip_prefix_ref01_list_rt0 = (await byoip_prefix_ref01_ent.list(byoip_prefix_ref01_match_rt0)).map((e: any) => e.data())

    assert(isempty(select(byoip_prefix_ref01_list_rt0, { id: byoip_prefix_ref01_data.id })))


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
      '../../../../.sdk/test/entity/byoip_prefix/ByoipPrefixTestData.json')

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
    ['byoip_prefix01','byoip_prefix02','byoip_prefix03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'DIGITALOCEAN_TEST_BYOIP_PREFIX_ENTID': idmap,
    'DIGITALOCEAN_TEST_LIVE': 'FALSE',
    'DIGITALOCEAN_TEST_EXPLAIN': 'FALSE',
    'DIGITALOCEAN_APIKEY': '',
  })

  idmap = env['DIGITALOCEAN_TEST_BYOIP_PREFIX_ENTID']

  const live = 'TRUE' === env.DIGITALOCEAN_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['DIGITALOCEAN_TEST_BYOIP_PREFIX_ENTID']
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
  
