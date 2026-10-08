

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


describe('VpcRoutesPublicPreviewEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when DIGITALOCEAN_TEST_LIVE=TRUE.
  afterEach(liveDelay('DIGITALOCEAN_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = DigitaloceanSDK.test()
    const ent = testsdk.VpcRoutesPublicPreview()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = DigitaloceanSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.VpcRoutesPublicPreview().list({"subnet_id":1,"vpc_id":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.DIGITALOCEAN_TEST_LIVE
    for (const op of ['create', 'list', 'update', 'remove']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'vpc_routes__public_preview.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"created_at":{"a":true,"fo":"date-time","h":"Created At","n":"created_at","r":false,"ro":true,"sh":"The time when the route was created.","t":"`$STRING`","key$":"created_at","index$":0},"destination_cidr":{"a":true,"h":"Destination Cidr","n":"destination_cidr","r":true,"sh":"A valid IPv4 CIDR accepted by the VPC routing product.","t":"`$STRING`","key$":"destination_cidr","index$":1},"id":{"a":true,"fo":"uuid","h":"Id","n":"id","r":true,"ro":true,"sh":"The unique identifier of the route.","t":"`$STRING`","key$":"id","index$":2},"modifiable":{"a":true,"h":"Modifiable","n":"modifiable","r":false,"ro":true,"sh":"Whether the caller can update or delete the route.","t":"`$BOOLEAN`","key$":"modifiable","index$":3},"target_urns":{"a":true,"h":"Target Urns","n":"target_urns","r":true,"sh":"The URNs of supported next-hop resources.","t":"`$ARRAY`","key$":"target_urns","index$":4},"type":{"a":true,"h":"Type","n":"type","r":true,"ro":true,"sh":"The route type inferred from how the route is sourced.","t":"`$STRING`","key$":"type","index$":5}},"id":{"field":"id","name":"id"},"name":"vpc_routes__public_preview","op":{"create":{"input":"data","name":"create","points":[{"a":true,"co":{"id":"POST /v2/vpcs/{vpc_uuid}/subnets/{subnet_uuid}/routes","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":"4de7ac8b-495b-4884-9a69-1050c6793cd6","k":"param","n":"subnet_id","or":"subnet_uuid","r":true,"t":"`$STRING`","index$":0},{"a":true,"ex":"997615ce-132d-4bae-9270-9ee21b395e5d","k":"param","n":"vpc_id","or":"vpc_uuid","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"POST","o":"/v2/vpcs/{vpc_uuid}/subnets/{subnet_uuid}/routes","q":{"exist":["subnet_id","vpc_id"]},"r":{"param":{"subnet_uuid":"subnet_id","vpc_uuid":"vpc_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v2"},{"lit":"vpcs"},{"var":"vpc_id"},{"lit":"subnets"},{"var":"subnet_id"},{"lit":"routes"}],"t":{"req":"`reqdata`","res":"`body.route`"},"index$":0}],"key$":"create"},"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /v2/vpcs/{vpc_uuid}/subnets/{subnet_uuid}/routes","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":"4de7ac8b-495b-4884-9a69-1050c6793cd6","k":"param","n":"subnet_id","or":"subnet_uuid","r":true,"t":"`$STRING`","index$":0},{"a":true,"ex":"997615ce-132d-4bae-9270-9ee21b395e5d","k":"param","n":"vpc_id","or":"vpc_uuid","r":true,"t":"`$STRING`","index$":1}],"query":[{"a":true,"ex":1,"k":"query","n":"page","or":"page","r":false,"t":"`$INTEGER`","index$":0},{"a":true,"ex":2,"k":"query","n":"per_page","or":"per_page","r":false,"t":"`$INTEGER`","index$":1}]},"k":"http","m":"GET","o":"/v2/vpcs/{vpc_uuid}/subnets/{subnet_uuid}/routes","q":{"exist":["subnet_id","vpc_id"]},"r":{"param":{"subnet_uuid":"subnet_id","vpc_uuid":"vpc_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v2"},{"lit":"vpcs"},{"var":"vpc_id"},{"lit":"subnets"},{"var":"subnet_id"},{"lit":"routes"}],"t":{"req":"`reqdata`","res":"`body.routes`"},"index$":0},{"a":true,"co":{"id":"GET /v2/vpcs/{vpc_uuid}/routes","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":"997615ce-132d-4bae-9270-9ee21b395e5d","k":"param","n":"vpc_id","or":"vpc_uuid","r":true,"t":"`$STRING`","index$":0}],"query":[{"a":true,"ex":1,"k":"query","n":"page","or":"page","r":false,"t":"`$INTEGER`","index$":0},{"a":true,"ex":2,"k":"query","n":"per_page","or":"per_page","r":false,"t":"`$INTEGER`","index$":1}]},"k":"http","m":"GET","o":"/v2/vpcs/{vpc_uuid}/routes","q":{"$action":"routes","exist":["vpc_id"]},"r":{"param":{"vpc_uuid":"vpc_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v2"},{"lit":"vpcs"},{"var":"vpc_id"},{"lit":"routes"}],"t":{"req":"`reqdata`","res":"`body.routes`"},"index$":1}],"key$":"list"},"remove":{"input":"data","name":"remove","points":[{"a":true,"co":{"id":"DELETE /v2/vpcs/{vpc_uuid}/subnets/{subnet_uuid}/routes/{route_uuid}","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":"f0e1d2c3-b4a5-6789-0fed-cba987654321","k":"param","n":"id","or":"route_uuid","r":true,"t":"`$STRING`","index$":0},{"a":true,"ex":"4de7ac8b-495b-4884-9a69-1050c6793cd6","k":"param","n":"subnet_id","or":"subnet_uuid","r":true,"t":"`$STRING`","index$":1},{"a":true,"ex":"997615ce-132d-4bae-9270-9ee21b395e5d","k":"param","n":"vpc_id","or":"vpc_uuid","r":true,"t":"`$STRING`","index$":2}]},"k":"http","m":"DELETE","o":"/v2/vpcs/{vpc_uuid}/subnets/{subnet_uuid}/routes/{route_uuid}","q":{"exist":["id","subnet_id","vpc_id"]},"r":{"param":{"route_uuid":"id","subnet_uuid":"subnet_id","vpc_uuid":"vpc_id"}},"s":[{"lit":"v2"},{"lit":"vpcs"},{"var":"vpc_id"},{"lit":"subnets"},{"var":"subnet_id"},{"lit":"routes"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"remove"},"update":{"input":"data","name":"update","points":[{"a":true,"co":{"id":"PATCH /v2/vpcs/{vpc_uuid}/subnets/{subnet_uuid}/routes/{route_uuid}","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":"f0e1d2c3-b4a5-6789-0fed-cba987654321","k":"param","n":"id","or":"route_uuid","r":true,"t":"`$STRING`","index$":0},{"a":true,"ex":"4de7ac8b-495b-4884-9a69-1050c6793cd6","k":"param","n":"subnet_id","or":"subnet_uuid","r":true,"t":"`$STRING`","index$":1},{"a":true,"ex":"997615ce-132d-4bae-9270-9ee21b395e5d","k":"param","n":"vpc_id","or":"vpc_uuid","r":true,"t":"`$STRING`","index$":2}]},"k":"http","m":"PATCH","o":"/v2/vpcs/{vpc_uuid}/subnets/{subnet_uuid}/routes/{route_uuid}","q":{"exist":["id","subnet_id","vpc_id"]},"r":{"param":{"route_uuid":"id","subnet_uuid":"subnet_id","vpc_uuid":"vpc_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v2"},{"lit":"vpcs"},{"var":"vpc_id"},{"lit":"subnets"},{"var":"subnet_id"},{"lit":"routes"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body.route`"},"index$":0}],"key$":"update"}},"relations":{"ancestors":[["$.main.kit.entity.vpc"],["$.main.kit.entity.vpc"]]},"key$":"vpc_routes__public_preview","name__orig":"vpc_routes__public_preview","Name":"VpcRoutesPublicPreview","name_":"vpc_routes_public_preview","name-":"vpc-routes-public-preview","NAME":"VPC_ROUTES__PUBLIC_PREVIEW","index$":233}, {"active":true,"entity":"vpc_routes__public_preview","key$":"BasicVpcRoutesPublicPreviewFlow","kind":"basic","name":"BasicVpcRoutesPublicPreviewFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"vpc_routes__public_preview_ref01"},"m":{"subnet_id":"subnet01","vpc_id":"vpc01"},"o":"create","s":[],"v":[],"index$":0},{"a":true,"d":{},"i":{},"m":{"vpc_id":"vpc01"},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"vpc_routes__public_preview_ref01"}}],"index$":1},{"a":true,"d":{"subnet_id":"subnet01","vpc_id":"vpc01"},"i":{"ref":"vpc_routes__public_preview_ref01","srcdatavar":"vpc_routes__public_preview_ref01_data","suffix":"_up0","textfield":"destination_cidr"},"m":{},"o":"update","s":[{"apply":"TextFieldMark","def":{"mark":"Mark01-vpc_routes__public_preview_ref01"}}],"v":[],"index$":2},{"a":true,"d":{},"i":{"ref":"vpc_routes__public_preview_ref01","suffix":"_rm0"},"m":{"id":"vpc_routes__public_preview01","subnet_id":"subnet01","vpc_id":"vpc01"},"o":"remove","s":[],"v":[],"index$":3},{"a":true,"d":{},"i":{"suffix":"_rt0"},"m":{"vpc_id":"vpc01"},"o":"list","s":[],"v":[{"apply":"ItemNotExists","def":{"ref":"vpc_routes__public_preview_ref01"}}],"index$":4}]}, 'VpcRoutesPublicPreview', {"POST /v2/vpcs/{vpc_uuid}/subnets/{subnet_uuid}/routes":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","required":["destination_cidr","target_urns"],"properties":{"destination_cidr":{"type":"string","example":"0.0.0.0/0","description":"A valid IPv4 CIDR accepted by the VPC routing product.","key$":"destination_cidr"},"target_urns":{"type":"array","items":{"type":"string"},"example":["do:droplet:4126873"],"description":"The URNs of supported next-hop resources. Droplet targets must use a\nnumeric ID in the format `do:droplet:<id>`. VPC NAT Gateway targets use\na UUID in the format `do:nat_gateway:<uuid>`.\n","key$":"target_urns"}},"x-ref":"#/components/schemas/route_create","index$":1}}}},"parameters":[{"in":"path","name":"vpc_uuid","description":"The unique identifier of the VPC.","required":true,"schema":{"type":"string","format":"uuid"},"example":"997615ce-132d-4bae-9270-9ee21b395e5d","x-ref":"#/components/parameters/vpc_uuid","index$":0},{"in":"path","name":"subnet_uuid","description":"The unique identifier of the VPC subnet.","required":true,"schema":{"type":"string","format":"uuid"},"example":"4de7ac8b-495b-4884-9a69-1050c6793cd6","x-ref":"#/components/parameters/parameters_subnet_uuid","index$":1}]},"GET /v2/vpcs/{vpc_uuid}/subnets/{subnet_uuid}/routes":{"protocol":"http","parameters":[{"in":"path","name":"vpc_uuid","description":"The unique identifier of the VPC.","required":true,"schema":{"type":"string","format":"uuid"},"example":"997615ce-132d-4bae-9270-9ee21b395e5d","x-ref":"#/components/parameters/vpc_uuid","index$":0},{"in":"path","name":"subnet_uuid","description":"The unique identifier of the VPC subnet.","required":true,"schema":{"type":"string","format":"uuid"},"example":"4de7ac8b-495b-4884-9a69-1050c6793cd6","x-ref":"#/components/parameters/parameters_subnet_uuid","index$":1},{"in":"query","name":"per_page","required":false,"description":"Number of items returned per page","schema":{"type":"integer","minimum":1,"default":20,"maximum":200},"example":2,"x-ref":"#/components/parameters/parameters_per_page","index$":2},{"in":"query","name":"page","required":false,"description":"Which 'page' of paginated results to return.","schema":{"type":"integer","minimum":1,"default":1},"example":1,"x-ref":"#/components/parameters/page","index$":3}]},"GET /v2/vpcs/{vpc_uuid}/routes":{"protocol":"http","parameters":[{"in":"path","name":"vpc_uuid","description":"The unique identifier of the VPC.","required":true,"schema":{"type":"string","format":"uuid"},"example":"997615ce-132d-4bae-9270-9ee21b395e5d","x-ref":"#/components/parameters/vpc_uuid","index$":0},{"in":"query","name":"per_page","required":false,"description":"Number of items returned per page","schema":{"type":"integer","minimum":1,"default":20,"maximum":200},"example":2,"x-ref":"#/components/parameters/parameters_per_page","index$":1},{"in":"query","name":"page","required":false,"description":"Which 'page' of paginated results to return.","schema":{"type":"integer","minimum":1,"default":1},"example":1,"x-ref":"#/components/parameters/page","index$":2}]},"DELETE /v2/vpcs/{vpc_uuid}/subnets/{subnet_uuid}/routes/{route_uuid}":{"protocol":"http","parameters":[{"in":"path","name":"vpc_uuid","description":"The unique identifier of the VPC.","required":true,"schema":{"type":"string","format":"uuid"},"example":"997615ce-132d-4bae-9270-9ee21b395e5d","x-ref":"#/components/parameters/vpc_uuid","index$":0},{"in":"path","name":"subnet_uuid","description":"The unique identifier of the VPC subnet.","required":true,"schema":{"type":"string","format":"uuid"},"example":"4de7ac8b-495b-4884-9a69-1050c6793cd6","x-ref":"#/components/parameters/parameters_subnet_uuid","index$":1},{"in":"path","name":"route_uuid","description":"The unique identifier of the route.","required":true,"schema":{"type":"string","format":"uuid"},"example":"f0e1d2c3-b4a5-6789-0fed-cba987654321","x-ref":"#/components/parameters/route_uuid","index$":2}]},"PATCH /v2/vpcs/{vpc_uuid}/subnets/{subnet_uuid}/routes/{route_uuid}":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","required":["target_urns"],"properties":{"target_urns":{"type":"array","items":{"type":"string"},"example":["do:droplet:4126873"],"description":"The URNs of supported next-hop resources. Droplet targets must use a\nnumeric ID in the format `do:droplet:<id>`. VPC NAT Gateway targets use\na UUID in the format `do:nat_gateway:<uuid>`.\n","key$":"target_urns"}},"x-ref":"#/components/schemas/route_update","index$":1}}}},"parameters":[{"in":"path","name":"vpc_uuid","description":"The unique identifier of the VPC.","required":true,"schema":{"type":"string","format":"uuid"},"example":"997615ce-132d-4bae-9270-9ee21b395e5d","x-ref":"#/components/parameters/vpc_uuid","index$":0},{"in":"path","name":"subnet_uuid","description":"The unique identifier of the VPC subnet.","required":true,"schema":{"type":"string","format":"uuid"},"example":"4de7ac8b-495b-4884-9a69-1050c6793cd6","x-ref":"#/components/parameters/parameters_subnet_uuid","index$":1},{"in":"path","name":"route_uuid","description":"The unique identifier of the route.","required":true,"schema":{"type":"string","format":"uuid"},"example":"f0e1d2c3-b4a5-6789-0fed-cba987654321","x-ref":"#/components/parameters/route_uuid","index$":2}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const vpc_routes__public_preview_ref01_ent = client.VpcRoutesPublicPreview()
    let vpc_routes__public_preview_ref01_data = setup.data.new.vpc_routes__public_preview['vpc_routes__public_preview_ref01']
    vpc_routes__public_preview_ref01_data['subnet_id'] = setup.idmap['subnet01']
    vpc_routes__public_preview_ref01_data['vpc_id'] = setup.idmap['vpc01']

    vpc_routes__public_preview_ref01_data = (await vpc_routes__public_preview_ref01_ent.create(vpc_routes__public_preview_ref01_data)).data()
    assert(null != vpc_routes__public_preview_ref01_data.id)


    // LIST
    const vpc_routes__public_preview_ref01_match: any = {}
    vpc_routes__public_preview_ref01_match['vpc_id'] = setup.idmap['vpc01']

    const vpc_routes__public_preview_ref01_list = (await vpc_routes__public_preview_ref01_ent.list(vpc_routes__public_preview_ref01_match)).map((e: any) => e.data())

    assert(!isempty(select(vpc_routes__public_preview_ref01_list, { id: vpc_routes__public_preview_ref01_data.id })))


    // UPDATE
    const vpc_routes__public_preview_ref01_data_up0: any = {}
    vpc_routes__public_preview_ref01_data_up0.id = vpc_routes__public_preview_ref01_data.id
    vpc_routes__public_preview_ref01_data_up0 ['subnet_id'] = setup.idmap['subnet_id']
    vpc_routes__public_preview_ref01_data_up0 ['vpc_id'] = setup.idmap['vpc_id']

    const vpc_routes__public_preview_ref01_markdef_up0 = { name: 'destination_cidr', value: 'Mark01-vpc_routes__public_preview_ref01_' + setup.now }
    ;(vpc_routes__public_preview_ref01_data_up0 as any)[vpc_routes__public_preview_ref01_markdef_up0.name] = vpc_routes__public_preview_ref01_markdef_up0.value

    const vpc_routes__public_preview_ref01_resdata_up0 = (await vpc_routes__public_preview_ref01_ent.update(vpc_routes__public_preview_ref01_data_up0)).data()
    assert(vpc_routes__public_preview_ref01_resdata_up0.id === vpc_routes__public_preview_ref01_data_up0.id)

    assert((vpc_routes__public_preview_ref01_resdata_up0 as any)[vpc_routes__public_preview_ref01_markdef_up0.name] === vpc_routes__public_preview_ref01_markdef_up0.value)


    // REMOVE
    const vpc_routes__public_preview_ref01_match_rm0: any = { id: vpc_routes__public_preview_ref01_data.id }
    await vpc_routes__public_preview_ref01_ent.remove(vpc_routes__public_preview_ref01_match_rm0)
  

    // LIST
    const vpc_routes__public_preview_ref01_match_rt0: any = {}
    vpc_routes__public_preview_ref01_match_rt0['vpc_id'] = setup.idmap['vpc01']

    const vpc_routes__public_preview_ref01_list_rt0 = (await vpc_routes__public_preview_ref01_ent.list(vpc_routes__public_preview_ref01_match_rt0)).map((e: any) => e.data())

    assert(isempty(select(vpc_routes__public_preview_ref01_list_rt0, { id: vpc_routes__public_preview_ref01_data.id })))


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
      '../../../../.sdk/test/entity/vpc_routes__public_preview/VpcRoutesPublicPreviewTestData.json')

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
    ['vpc_routes__public_preview01','vpc_routes__public_preview02','vpc_routes__public_preview03','vpc01','vpc02','vpc03','subnet01'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'DIGITALOCEAN_TEST_VPC_ROUTES_PUBLIC_PREVIEW_ENTID': idmap,
    'DIGITALOCEAN_TEST_LIVE': 'FALSE',
    'DIGITALOCEAN_TEST_EXPLAIN': 'FALSE',
    'DIGITALOCEAN_APIKEY': '',
  })

  idmap = env['DIGITALOCEAN_TEST_VPC_ROUTES_PUBLIC_PREVIEW_ENTID']

  const live = 'TRUE' === env.DIGITALOCEAN_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['DIGITALOCEAN_TEST_VPC_ROUTES_PUBLIC_PREVIEW_ENTID']
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
  
