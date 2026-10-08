

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


describe('VpcPeeringEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when DIGITALOCEAN_TEST_LIVE=TRUE.
  afterEach(liveDelay('DIGITALOCEAN_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = DigitaloceanSDK.test()
    const ent = testsdk.VpcPeering()
    assert(null != ent)
  })


  class FailHook extends BaseFeature {
    name = 'failhook'
    version = '0.0.1'
    active = true
    unexpected = 0
    init() { }
    PreSpec() { throw new Error('vpc_peering hook failed') }
    PreUnexpected() { this.unexpected++ }
  }

  test('stream-error', async () => {
    const offline = { net: { offline: true } }
    await assert.rejects(async () => {
      for await (const _item of DigitaloceanSDK.test(offline).VpcPeering().stream('list')) { }
    }, /offline/)

    for await (const _item of DigitaloceanSDK.test(offline).VpcPeering()
      .stream('list', undefined, { ctrl: { throw: false } })) { }

    if (null != (config as any).feature?.rbac) {
      const denied = DigitaloceanSDK.test(undefined, { feature: { rbac: { active: true, deny: true } } })
      await assert.rejects(async () => {
        for await (const _item of denied.VpcPeering().stream('list')) { }
      }, (err: any) => 'rbac_denied' === err.code)
    }
  })

  test('stream-ctrl', async () => {
    const explain: any = {}
    const ctrl: any = { explain }
    for await (const _item of DigitaloceanSDK.test().VpcPeering().stream('list', undefined, { ctrl })) { }
    assert.deepStrictEqual(Object.keys(ctrl), ['explain'])
    assert(explain === ctrl.explain && 0 < Object.keys(explain).length)
  })

  test('unexpected', async () => {
    const hook = new FailHook()
    const client = new DigitaloceanSDK({ feature: { test: { active: true } }, extend: [hook] })
    await assert.rejects(client.VpcPeering().list(), /hook failed/)
    assert(0 < hook.unexpected)

    const fired = hook.unexpected
    assert.strictEqual(await client.VpcPeering().list(undefined, { throw: false }), undefined)
    assert(fired < hook.unexpected)
  })

  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = DigitaloceanSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.VpcPeering().list({"page":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.DIGITALOCEAN_TEST_LIVE
    for (const op of ['create', 'list', 'update', 'load', 'remove']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'vpc_peering.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"created_at":{"a":true,"fo":"date-time","h":"Created At","n":"created_at","r":false,"ro":true,"sh":"A time value given in ISO8601 combined date and time format.","t":"`$STRING`","key$":"created_at","index$":0},"id":{"a":true,"fo":"uuid","h":"Id","n":"id","r":false,"ro":true,"sh":"A unique ID that can be used to identify and reference the VPC peering.","t":"`$STRING`","key$":"id","index$":1},"name":{"a":true,"h":"Name","n":"name","op":{"create":{"req":true,"type":"`$STRING`"},"update":{"req":true,"type":"`$STRING`"}},"r":false,"sh":"The name of the VPC peering.","t":"`$STRING`","key$":"name","index$":2},"status":{"a":true,"h":"Status","n":"status","r":false,"ro":true,"sh":"The current status of the VPC peering.","t":"`$STRING`","key$":"status","index$":3},"vpc_ids":{"a":true,"h":"Vpc Ids","n":"vpc_ids","op":{"create":{"req":true,"type":"`$ARRAY`"}},"r":false,"sh":"An array of the two peered VPCs IDs.","t":"`$ARRAY`","key$":"vpc_ids","index$":4}},"id":{"field":"id","name":"id"},"name":"vpc_peering","op":{"create":{"input":"data","name":"create","points":[{"a":true,"co":{"id":"POST /v2/vpc_peerings","source":"openapi3","version":2},"g":{},"k":"http","m":"POST","o":"/v2/vpc_peerings","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v2"},{"lit":"vpc_peerings"}],"t":{"req":"`reqdata`","res":"`body.vpc_peering`"},"index$":0}],"key$":"create"},"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /v2/vpc_peerings","source":"openapi3","version":2},"g":{"query":[{"a":true,"ex":1,"k":"query","n":"page","or":"page","r":false,"t":"`$INTEGER`","index$":0},{"a":true,"ex":2,"k":"query","n":"per_page","or":"per_page","r":false,"t":"`$INTEGER`","index$":1},{"a":true,"ex":"nyc3","k":"query","n":"region","or":"region","r":false,"t":"`$STRING`","index$":2}]},"k":"http","m":"GET","o":"/v2/vpc_peerings","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v2"},{"lit":"vpc_peerings"}],"t":{"req":"`reqdata`","res":"`body.vpc_peerings`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /v2/vpc_peerings/{vpc_peering_id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":"5a4981aa-9653-4bd1-bef5-d6bff52042e4","k":"param","n":"id","or":"vpc_peering_id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/v2/vpc_peerings/{vpc_peering_id}","q":{"exist":["id"]},"r":{"param":{"vpc_peering_id":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v2"},{"lit":"vpc_peerings"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body.vpc_peering`"},"index$":0}],"key$":"load"},"remove":{"input":"data","name":"remove","points":[{"a":true,"co":{"id":"DELETE /v2/vpc_peerings/{vpc_peering_id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":"5a4981aa-9653-4bd1-bef5-d6bff52042e4","k":"param","n":"id","or":"vpc_peering_id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"DELETE","o":"/v2/vpc_peerings/{vpc_peering_id}","q":{"exist":["id"]},"r":{"param":{"vpc_peering_id":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v2"},{"lit":"vpc_peerings"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body.vpc_peering`"},"index$":0}],"key$":"remove"},"update":{"input":"data","name":"update","points":[{"a":true,"co":{"id":"PATCH /v2/vpc_peerings/{vpc_peering_id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":"5a4981aa-9653-4bd1-bef5-d6bff52042e4","k":"param","n":"id","or":"vpc_peering_id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"PATCH","o":"/v2/vpc_peerings/{vpc_peering_id}","q":{"exist":["id"]},"r":{"param":{"vpc_peering_id":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v2"},{"lit":"vpc_peerings"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body.vpc_peering`"},"index$":0}],"key$":"update"}},"relations":{"ancestors":[]},"key$":"vpc_peering","name__orig":"vpc_peering","Name":"VpcPeering","name_":"vpc_peering","name-":"vpc-peering","NAME":"VPC_PEERING","index$":223}, {"active":true,"entity":"vpc_peering","key$":"BasicVpcPeeringFlow","kind":"basic","name":"BasicVpcPeeringFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"vpc_peering_ref01"},"m":{},"o":"create","s":[],"v":[],"index$":0},{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"vpc_peering_ref01"}}],"index$":1},{"a":true,"d":{},"i":{"ref":"vpc_peering_ref01","srcdatavar":"vpc_peering_ref01_data","suffix":"_up0","textfield":"name"},"m":{},"o":"update","s":[{"apply":"TextFieldMark","def":{"mark":"Mark01-vpc_peering_ref01"}}],"v":[],"index$":2},{"a":true,"d":{},"i":{"ref":"vpc_peering_ref01","srcdatavar":"vpc_peering_ref01_data","suffix":"_dt0"},"m":{"id":"vpc_peering01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-vpc_peering_ref01"}}],"index$":3},{"a":true,"d":{},"i":{"ref":"vpc_peering_ref01","suffix":"_rm0"},"m":{"id":"vpc_peering01"},"o":"remove","s":[],"v":[],"index$":4},{"a":true,"d":{},"i":{"suffix":"_rt0"},"m":{},"o":"list","s":[],"v":[{"apply":"ItemNotExists","def":{"ref":"vpc_peering_ref01"}}],"index$":5}]}, 'VpcPeering', {"POST /v2/vpc_peerings":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","allOf":[{"type":"object","properties":{"name":{"type":"string","pattern":"^[a-zA-Z0-9\\-]+$","example":"nyc1-blr1-peering","description":"The name of the VPC peering. Must be unique within the team and may only contain alphanumeric characters and dashes.","key$":"name"}},"x-ref":"#/components/schemas/vpc_peering_updatable"},{"type":"object","properties":{"vpc_ids":{"type":"array","items":{"type":"string","format":"uuid"},"minItems":2,"maxItems":2,"example":["c140286f-e6ce-4131-8b7b-df4590ce8d6a","994a2735-dc84-11e8-80bc-3cfdfea9fba1"],"description":"An array of the two peered VPCs IDs.","key$":"vpc_ids"}},"x-ref":"#/components/schemas/vpc_peering_create"}],"required":["name","vpc_ids"],"index$":1}}}},"parameters":[]},"GET /v2/vpc_peerings":{"protocol":"http","parameters":[{"in":"query","name":"per_page","required":false,"description":"Number of items returned per page","schema":{"type":"integer","minimum":1,"default":20,"maximum":200},"example":2,"x-ref":"#/components/parameters/parameters_per_page","index$":0},{"in":"query","name":"page","required":false,"description":"Which 'page' of paginated results to return.","schema":{"type":"integer","minimum":1,"default":1},"example":1,"x-ref":"#/components/parameters/page","index$":1},{"name":"region","in":"query","description":"The slug identifier for the region where the resource is available.","schema":{"type":"string","description":"The slug identifier for the region where the resource will initially be  available.","enum":["ams1","ams2","ams3","blr1","fra1","lon1","nyc1","nyc2","nyc3","sfo1","sfo2","sfo3","sgp1","tor1","syd1"],"example":"nyc3","x-ref":"#/components/schemas/region_slug"},"example":"nyc3","x-ref":"#/components/parameters/parameters_region-3","index$":2}]},"GET /v2/vpc_peerings/{vpc_peering_id}":{"protocol":"http","parameters":[{"in":"path","name":"vpc_peering_id","description":"A unique identifier for a VPC peering.","required":true,"schema":{"type":"string","format":"uuid"},"example":"5a4981aa-9653-4bd1-bef5-d6bff52042e4","x-ref":"#/components/parameters/vpc_peering_id","index$":0}]},"DELETE /v2/vpc_peerings/{vpc_peering_id}":{"protocol":"http","parameters":[{"in":"path","name":"vpc_peering_id","description":"A unique identifier for a VPC peering.","required":true,"schema":{"type":"string","format":"uuid"},"example":"5a4981aa-9653-4bd1-bef5-d6bff52042e4","x-ref":"#/components/parameters/vpc_peering_id","index$":0}]},"PATCH /v2/vpc_peerings/{vpc_peering_id}":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","allOf":[{"type":"object","properties":{"name":{"type":"string","pattern":"^[a-zA-Z0-9\\-]+$","example":"nyc1-blr1-peering","description":"The name of the VPC peering. Must be unique within the team and may only contain alphanumeric characters and dashes.","key$":"name"}},"x-ref":"#/components/schemas/vpc_peering_updatable"}],"required":["name"],"index$":1}}}},"parameters":[{"in":"path","name":"vpc_peering_id","description":"A unique identifier for a VPC peering.","required":true,"schema":{"type":"string","format":"uuid"},"example":"5a4981aa-9653-4bd1-bef5-d6bff52042e4","x-ref":"#/components/parameters/vpc_peering_id","index$":0}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const vpc_peering_ref01_ent = client.VpcPeering()
    let vpc_peering_ref01_data = setup.data.new.vpc_peering['vpc_peering_ref01']

    vpc_peering_ref01_data = (await vpc_peering_ref01_ent.create(vpc_peering_ref01_data)).data()
    assert(null != vpc_peering_ref01_data.id)


    // LIST
    const vpc_peering_ref01_match: any = {}

    const vpc_peering_ref01_list = (await vpc_peering_ref01_ent.list(vpc_peering_ref01_match)).map((e: any) => e.data())

    assert(!isempty(select(vpc_peering_ref01_list, { id: vpc_peering_ref01_data.id })))


    // UPDATE
    const vpc_peering_ref01_data_up0: any = {}
    vpc_peering_ref01_data_up0.id = vpc_peering_ref01_data.id

    const vpc_peering_ref01_markdef_up0 = { name: 'name', value: 'Mark01-vpc_peering_ref01_' + setup.now }
    ;(vpc_peering_ref01_data_up0 as any)[vpc_peering_ref01_markdef_up0.name] = vpc_peering_ref01_markdef_up0.value

    const vpc_peering_ref01_resdata_up0 = (await vpc_peering_ref01_ent.update(vpc_peering_ref01_data_up0)).data()
    assert(vpc_peering_ref01_resdata_up0.id === vpc_peering_ref01_data_up0.id)

    assert((vpc_peering_ref01_resdata_up0 as any)[vpc_peering_ref01_markdef_up0.name] === vpc_peering_ref01_markdef_up0.value)


    // LOAD
    const vpc_peering_ref01_match_dt0: any = {}
    vpc_peering_ref01_match_dt0.id = vpc_peering_ref01_data.id
    const vpc_peering_ref01_data_dt0 = (await vpc_peering_ref01_ent.load(vpc_peering_ref01_match_dt0)).data()
    assert(vpc_peering_ref01_data_dt0.id === vpc_peering_ref01_data.id)


    // REMOVE
    const vpc_peering_ref01_match_rm0: any = { id: vpc_peering_ref01_data.id }
    await vpc_peering_ref01_ent.remove(vpc_peering_ref01_match_rm0)
  

    // LIST
    const vpc_peering_ref01_match_rt0: any = {}

    const vpc_peering_ref01_list_rt0 = (await vpc_peering_ref01_ent.list(vpc_peering_ref01_match_rt0)).map((e: any) => e.data())

    assert(isempty(select(vpc_peering_ref01_list_rt0, { id: vpc_peering_ref01_data.id })))


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
      '../../../../.sdk/test/entity/vpc_peering/VpcPeeringTestData.json')

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
    ['vpc_peering01','vpc_peering02','vpc_peering03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'DIGITALOCEAN_TEST_VPC_PEERING_ENTID': idmap,
    'DIGITALOCEAN_TEST_LIVE': 'FALSE',
    'DIGITALOCEAN_TEST_EXPLAIN': 'FALSE',
    'DIGITALOCEAN_APIKEY': '',
  })

  idmap = env['DIGITALOCEAN_TEST_VPC_PEERING_ENTID']

  const live = 'TRUE' === env.DIGITALOCEAN_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['DIGITALOCEAN_TEST_VPC_PEERING_ENTID']
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
  
