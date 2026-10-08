

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


describe('VpcSubnetsPublicPreviewEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when DIGITALOCEAN_TEST_LIVE=TRUE.
  afterEach(liveDelay('DIGITALOCEAN_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = DigitaloceanSDK.test()
    const ent = testsdk.VpcSubnetsPublicPreview()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = DigitaloceanSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.VpcSubnetsPublicPreview().list({"subnet_uuid":1,"vpc_id":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.DIGITALOCEAN_TEST_LIVE
    for (const op of []) {
      if (!live && maybeSkipControl(t, 'entityOp', 'vpc_subnets__public_preview.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"created_at":{"a":true,"fo":"date-time","h":"Created At","n":"created_at","op":{"list":{"req":false,"type":"`$STRING`"}},"r":true,"ro":true,"sh":"The time when the VPC subnet was created.","t":"`$STRING`","key$":"created_at","index$":0},"default":{"a":true,"h":"Default","n":"default","r":false,"ro":true,"sh":"Whether this is the default subnet for the VPC.","t":"`$BOOLEAN`","key$":"default","index$":1},"id":{"a":true,"fo":"uuid","h":"Id","n":"id","r":true,"ro":true,"sh":"The unique identifier of the VPC subnet.","t":"`$STRING`","key$":"id","index$":2},"ip_range":{"a":true,"h":"Ip Range","n":"ip_range","r":true,"ro":true,"sh":"The IPv4 range assigned to the subnet in CIDR notation.","t":"`$STRING`","key$":"ip_range","index$":3},"meta":{"a":true,"h":"Meta","n":"meta","r":false,"sh":"Additional information about the VPC subnet.","t":"`$OBJECT`","key$":"meta","index$":4},"name":{"a":true,"h":"Name","n":"name","op":{"list":{"req":false,"type":"`$STRING`"}},"r":true,"sh":"The human-readable name of the VPC subnet.","t":"`$STRING`","key$":"name","index$":5},"region":{"a":true,"h":"Region","n":"region","r":true,"ro":true,"sh":"The slug of the region containing the VPC subnet.","t":"`$STRING`","key$":"region","index$":6},"type":{"a":true,"h":"Type","n":"type","r":true,"ro":true,"sh":"The type of the VPC subnet.","t":"`$STRING`","key$":"type","index$":7},"urn":{"a":true,"h":"Urn","n":"urn","op":{"list":{"req":false,"type":"`$STRING`"}},"r":true,"ro":true,"sh":"The uniform resource name of the VPC subnet.","t":"`$STRING`","key$":"urn","index$":8}},"id":{"field":"id","name":"id"},"name":"vpc_subnets__public_preview","op":{"create":{"input":"data","name":"create","points":[{"a":true,"co":{"id":"POST /v2/vpcs/{vpc_uuid}/subnets","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":"997615ce-132d-4bae-9270-9ee21b395e5d","k":"param","n":"id","or":"vpc_uuid","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"POST","o":"/v2/vpcs/{vpc_uuid}/subnets","q":{"$action":"subnets","exist":["id"]},"r":{"param":{"vpc_uuid":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v2"},{"lit":"vpcs"},{"var":"id"},{"lit":"subnets"}],"t":{"req":"`reqdata`","res":"`body.vpc_subnet`"},"index$":0}],"key$":"create"},"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /v2/vpcs/{vpc_uuid}/subnets/{subnet_uuid}/members","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":"4de7ac8b-495b-4884-9a69-1050c6793cd6","k":"param","n":"subnet_uuid","or":"subnet_uuid","r":true,"t":"`$STRING`","index$":0},{"a":true,"ex":"997615ce-132d-4bae-9270-9ee21b395e5d","k":"param","n":"vpc_id","or":"vpc_uuid","r":true,"t":"`$STRING`","index$":1}],"query":[{"a":true,"ex":1,"k":"query","n":"page","or":"page","r":false,"t":"`$INTEGER`","index$":0},{"a":true,"ex":2,"k":"query","n":"per_page","or":"per_page","r":false,"t":"`$INTEGER`","index$":1},{"a":true,"ex":"droplet","k":"query","n":"resource_type","or":"resource_type","r":false,"t":"`$STRING`","index$":2}]},"k":"http","m":"GET","o":"/v2/vpcs/{vpc_uuid}/subnets/{subnet_uuid}/members","q":{"exist":["subnet_uuid","vpc_id"]},"r":{"param":{"vpc_uuid":"vpc_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v2"},{"lit":"vpcs"},{"var":"vpc_id"},{"lit":"subnets"},{"var":"subnet_uuid"},{"lit":"members"}],"t":{"req":"`reqdata`","res":"`body.members`"},"index$":0},{"a":true,"co":{"id":"GET /v2/vpcs/{vpc_uuid}/subnets","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":"997615ce-132d-4bae-9270-9ee21b395e5d","k":"param","n":"id","or":"vpc_uuid","r":true,"t":"`$STRING`","index$":0}],"query":[{"a":true,"ex":1,"k":"query","n":"page","or":"page","r":false,"t":"`$INTEGER`","index$":0},{"a":true,"ex":2,"k":"query","n":"per_page","or":"per_page","r":false,"t":"`$INTEGER`","index$":1}]},"k":"http","m":"GET","o":"/v2/vpcs/{vpc_uuid}/subnets","q":{"$action":"subnets","exist":["id"]},"r":{"param":{"vpc_uuid":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v2"},{"lit":"vpcs"},{"var":"id"},{"lit":"subnets"}],"t":{"req":"`reqdata`","res":"`body.vpc_subnet`"},"index$":1}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /v2/vpcs/{vpc_uuid}/subnets/{subnet_uuid}","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":"4de7ac8b-495b-4884-9a69-1050c6793cd6","k":"param","n":"subnet_uuid","or":"subnet_uuid","r":true,"t":"`$STRING`","index$":0},{"a":true,"ex":"997615ce-132d-4bae-9270-9ee21b395e5d","k":"param","n":"vpc_id","or":"vpc_uuid","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"GET","o":"/v2/vpcs/{vpc_uuid}/subnets/{subnet_uuid}","q":{"exist":["subnet_uuid","vpc_id"]},"r":{"param":{"vpc_uuid":"vpc_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v2"},{"lit":"vpcs"},{"var":"vpc_id"},{"lit":"subnets"},{"var":"subnet_uuid"}],"t":{"req":"`reqdata`","res":"`body.vpc_subnet`"},"index$":0}],"key$":"load"},"remove":{"input":"data","name":"remove","points":[{"a":true,"co":{"id":"DELETE /v2/vpcs/{vpc_uuid}/subnets/{subnet_uuid}","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":"4de7ac8b-495b-4884-9a69-1050c6793cd6","k":"param","n":"subnet_uuid","or":"subnet_uuid","r":true,"t":"`$STRING`","index$":0},{"a":true,"ex":"997615ce-132d-4bae-9270-9ee21b395e5d","k":"param","n":"vpc_id","or":"vpc_uuid","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"DELETE","o":"/v2/vpcs/{vpc_uuid}/subnets/{subnet_uuid}","q":{"exist":["subnet_uuid","vpc_id"]},"r":{"param":{"vpc_uuid":"vpc_id"}},"s":[{"lit":"v2"},{"lit":"vpcs"},{"var":"vpc_id"},{"lit":"subnets"},{"var":"subnet_uuid"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"remove"},"update":{"input":"data","name":"update","points":[{"a":true,"co":{"id":"PATCH /v2/vpcs/{vpc_uuid}/subnets/{subnet_uuid}","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":"4de7ac8b-495b-4884-9a69-1050c6793cd6","k":"param","n":"subnet_uuid","or":"subnet_uuid","r":true,"t":"`$STRING`","index$":0},{"a":true,"ex":"997615ce-132d-4bae-9270-9ee21b395e5d","k":"param","n":"vpc_id","or":"vpc_uuid","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"PATCH","o":"/v2/vpcs/{vpc_uuid}/subnets/{subnet_uuid}","q":{"exist":["subnet_uuid","vpc_id"]},"r":{"param":{"vpc_uuid":"vpc_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v2"},{"lit":"vpcs"},{"var":"vpc_id"},{"lit":"subnets"},{"var":"subnet_uuid"}],"t":{"req":"`reqdata`","res":"`body.vpc_subnet`"},"index$":0}],"key$":"update"}},"relations":{"ancestors":[["$.main.kit.entity.vpc"]]},"key$":"vpc_subnets__public_preview","name__orig":"vpc_subnets__public_preview","Name":"VpcSubnetsPublicPreview","name_":"vpc_subnets_public_preview","name-":"vpc-subnets-public-preview","NAME":"VPC_SUBNETS__PUBLIC_PREVIEW","index$":234}, {"active":true,"entity":"vpc_subnets__public_preview","key$":"BasicVpcSubnetsPublicPreviewFlow","kind":"basic","name":"BasicVpcSubnetsPublicPreviewFlow","param":{},"step":[{"a":false,"d":{},"i":{"ref":"vpc_subnets__public_preview_ref01"},"m":{"subnet_uuid":"subnet_uuid01","vpc_id":"vpc01","vpc_uuid":"vpc_uuid01"},"o":"create","s":[],"v":[],"unreachable":true},{"a":false,"d":{},"i":{},"m":{"vpc_uuid":"vpc_uuid01"},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"vpc_subnets__public_preview_ref01"}}],"unreachable":true},{"a":false,"d":{"vpc_id":"vpc01"},"i":{"ref":"vpc_subnets__public_preview_ref01","srcdatavar":"vpc_subnets__public_preview_ref01_data","suffix":"_up0","textfield":"name"},"m":{},"o":"update","s":[{"apply":"TextFieldMark","def":{"mark":"Mark01-vpc_subnets__public_preview_ref01"}}],"v":[],"unreachable":true},{"a":false,"d":{},"i":{"ref":"vpc_subnets__public_preview_ref01","srcdatavar":"vpc_subnets__public_preview_ref01_data","suffix":"_dt0"},"m":{"id":"vpc_subnets__public_preview01","vpc_id":"vpc01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-vpc_subnets__public_preview_ref01"}}],"unreachable":true},{"a":false,"d":{},"i":{"ref":"vpc_subnets__public_preview_ref01","suffix":"_rm0"},"m":{"id":"vpc_subnets__public_preview01","vpc_id":"vpc01"},"o":"remove","s":[],"v":[],"unreachable":true},{"a":false,"d":{},"i":{"suffix":"_rt0"},"m":{"vpc_uuid":"vpc_uuid01"},"o":"list","s":[],"v":[{"apply":"ItemNotExists","def":{"ref":"vpc_subnets__public_preview_ref01"}}],"unreachable":true}]}, 'VpcSubnetsPublicPreview', {"POST /v2/vpcs/{vpc_uuid}/subnets":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","required":["name"],"properties":{"name":{"type":"string","maxLength":255,"pattern":"^[a-zA-Z0-9_-]+$","example":"new-subnet","description":"The human-readable name of the VPC subnet."},"ip_range":{"type":"string","example":"10.20.0.0/16","description":"An RFC1918 CIDR range between /16 and /24 that does not overlap another team or VPC network."}},"x-ref":"#/components/schemas/vpc_subnet_create"}}}},"parameters":[{"in":"path","name":"vpc_uuid","description":"The unique identifier of the VPC to which the subnet belongs.","required":true,"schema":{"type":"string","format":"uuid"},"example":"997615ce-132d-4bae-9270-9ee21b395e5d","x-ref":"#/components/parameters/parameters_vpc_uuid","index$":0}]},"GET /v2/vpcs/{vpc_uuid}/subnets/{subnet_uuid}/members":{"protocol":"http","parameters":[{"in":"path","name":"vpc_uuid","description":"The unique identifier of the VPC to which the subnet belongs.","required":true,"schema":{"type":"string","format":"uuid"},"example":"997615ce-132d-4bae-9270-9ee21b395e5d","x-ref":"#/components/parameters/parameters_vpc_uuid","index$":0},{"in":"path","name":"subnet_uuid","description":"The unique identifier of a VPC subnet.","required":true,"schema":{"type":"string","format":"uuid"},"example":"4de7ac8b-495b-4884-9a69-1050c6793cd6","x-ref":"#/components/parameters/subnet_uuid","index$":1},{"in":"query","name":"resource_type","description":"Used to filter VPC subnet members by resource type.","required":false,"schema":{"type":"string","enum":["droplet","loadbalancer","kubernetes","dbaas","nat_gateway","app","nfs_share"]},"example":"droplet","x-ref":"#/components/parameters/resource_type","index$":2},{"in":"query","name":"per_page","required":false,"description":"Number of items returned per page","schema":{"type":"integer","minimum":1,"default":20,"maximum":200},"example":2,"x-ref":"#/components/parameters/parameters_per_page","index$":3},{"in":"query","name":"page","required":false,"description":"Which 'page' of paginated results to return.","schema":{"type":"integer","minimum":1,"default":1},"example":1,"x-ref":"#/components/parameters/page","index$":4}]},"GET /v2/vpcs/{vpc_uuid}/subnets":{"protocol":"http","parameters":[{"in":"path","name":"vpc_uuid","description":"The unique identifier of the VPC to which the subnet belongs.","required":true,"schema":{"type":"string","format":"uuid"},"example":"997615ce-132d-4bae-9270-9ee21b395e5d","x-ref":"#/components/parameters/parameters_vpc_uuid","index$":0},{"in":"query","name":"per_page","required":false,"description":"Number of items returned per page","schema":{"type":"integer","minimum":1,"default":20,"maximum":200},"example":2,"x-ref":"#/components/parameters/parameters_per_page","index$":1},{"in":"query","name":"page","required":false,"description":"Which 'page' of paginated results to return.","schema":{"type":"integer","minimum":1,"default":1},"example":1,"x-ref":"#/components/parameters/page","index$":2}]},"GET /v2/vpcs/{vpc_uuid}/subnets/{subnet_uuid}":{"protocol":"http","parameters":[{"in":"path","name":"vpc_uuid","description":"The unique identifier of the VPC to which the subnet belongs.","required":true,"schema":{"type":"string","format":"uuid"},"example":"997615ce-132d-4bae-9270-9ee21b395e5d","x-ref":"#/components/parameters/parameters_vpc_uuid","index$":0},{"in":"path","name":"subnet_uuid","description":"The unique identifier of a VPC subnet.","required":true,"schema":{"type":"string","format":"uuid"},"example":"4de7ac8b-495b-4884-9a69-1050c6793cd6","x-ref":"#/components/parameters/subnet_uuid","index$":1}]},"DELETE /v2/vpcs/{vpc_uuid}/subnets/{subnet_uuid}":{"protocol":"http","parameters":[{"in":"path","name":"vpc_uuid","description":"The unique identifier of the VPC to which the subnet belongs.","required":true,"schema":{"type":"string","format":"uuid"},"example":"997615ce-132d-4bae-9270-9ee21b395e5d","x-ref":"#/components/parameters/parameters_vpc_uuid","index$":0},{"in":"path","name":"subnet_uuid","description":"The unique identifier of a VPC subnet.","required":true,"schema":{"type":"string","format":"uuid"},"example":"4de7ac8b-495b-4884-9a69-1050c6793cd6","x-ref":"#/components/parameters/subnet_uuid","index$":1}]},"PATCH /v2/vpcs/{vpc_uuid}/subnets/{subnet_uuid}":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","required":["name"],"properties":{"name":{"type":"string","maxLength":255,"pattern":"^[a-zA-Z0-9_-]+$","example":"renamed-subnet","description":"The new human-readable name of the VPC subnet.","key$":"name"}},"x-ref":"#/components/schemas/vpc_subnet_update","index$":1}}}},"parameters":[{"in":"path","name":"vpc_uuid","description":"The unique identifier of the VPC to which the subnet belongs.","required":true,"schema":{"type":"string","format":"uuid"},"example":"997615ce-132d-4bae-9270-9ee21b395e5d","x-ref":"#/components/parameters/parameters_vpc_uuid","index$":0},{"in":"path","name":"subnet_uuid","description":"The unique identifier of a VPC subnet.","required":true,"schema":{"type":"string","format":"uuid"},"example":"4de7ac8b-495b-4884-9a69-1050c6793cd6","x-ref":"#/components/parameters/subnet_uuid","index$":1}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let vpc_subnets__public_preview_ref01_data = Object.values(setup.data.existing.vpc_subnets__public_preview)[0] as any

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
      '../../../../.sdk/test/entity/vpc_subnets__public_preview/VpcSubnetsPublicPreviewTestData.json')

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
    ['vpc_subnets__public_preview01','vpc_subnets__public_preview02','vpc_subnets__public_preview03','vpc01','vpc02','vpc03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'DIGITALOCEAN_TEST_VPC_SUBNETS_PUBLIC_PREVIEW_ENTID': idmap,
    'DIGITALOCEAN_TEST_LIVE': 'FALSE',
    'DIGITALOCEAN_TEST_EXPLAIN': 'FALSE',
    'DIGITALOCEAN_APIKEY': '',
  })

  idmap = env['DIGITALOCEAN_TEST_VPC_SUBNETS_PUBLIC_PREVIEW_ENTID']

  const live = 'TRUE' === env.DIGITALOCEAN_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['DIGITALOCEAN_TEST_VPC_SUBNETS_PUBLIC_PREVIEW_ENTID']
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
  
