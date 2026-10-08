

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


describe('PartnerNetworkConnectEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when DIGITALOCEAN_TEST_LIVE=TRUE.
  afterEach(liveDelay('DIGITALOCEAN_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = DigitaloceanSDK.test()
    const ent = testsdk.PartnerNetworkConnect()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = DigitaloceanSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.PartnerNetworkConnect().list({"pa_id":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.DIGITALOCEAN_TEST_LIVE
    for (const op of []) {
      if (!live && maybeSkipControl(t, 'entityOp', 'partner_network_connect.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"bgp":{"a":true,"h":"Bgp","n":"bgp","r":false,"sh":"The BGP configuration for the partner attachment.","t":"`$OBJECT`","key$":"bgp","index$":0},"bgp_auth_key":{"a":true,"h":"Bgp Auth Key","n":"bgp_auth_key","r":false,"t":"`$OBJECT`","key$":"bgp_auth_key","index$":1},"children":{"a":true,"h":"Children","n":"children","r":false,"ro":true,"sh":"An array of associated partner attachment UUIDs.","t":"`$ARRAY`","key$":"children","index$":2},"cidr":{"a":true,"h":"Cidr","n":"cidr","r":false,"ro":true,"sh":"A CIDR block representing a remote route.","t":"`$STRING`","key$":"cidr","index$":3},"connection_bandwidth_in_mbps":{"a":true,"h":"Connection Bandwidth In Mbps","n":"connection_bandwidth_in_mbps","r":false,"sh":"The bandwidth (in Mbps) of the connection.","t":"`$INTEGER`","key$":"connection_bandwidth_in_mbps","index$":4},"created_at":{"a":true,"fo":"date-time","h":"Created At","n":"created_at","r":false,"ro":true,"sh":"A time value given in ISO8601 combined date and time format.","t":"`$STRING`","key$":"created_at","index$":5},"id":{"a":true,"fo":"string","h":"Id","n":"id","r":false,"ro":true,"sh":"A unique ID that can be used to identify and reference the partner attachment.","t":"`$STRING`","key$":"id","index$":6},"naas_provider":{"a":true,"h":"Naas Provider","n":"naas_provider","r":false,"sh":"The Network as a Service (NaaS) provider for the partner attachment.","t":"`$STRING`","key$":"naas_provider","index$":7},"name":{"a":true,"h":"Name","n":"name","r":false,"sh":"The name of the partner attachment.","t":"`$STRING`","key$":"name","index$":8},"parent_uuid":{"a":true,"h":"Parent Uuid","n":"parent_uuid","r":false,"ro":true,"sh":"Associated partner attachment UUID","t":"`$STRING`","key$":"parent_uuid","index$":9},"region":{"a":true,"h":"Region","n":"region","r":false,"sh":"The region where the partner attachment is located.","t":"`$STRING`","key$":"region","index$":10},"state":{"a":true,"h":"State","n":"state","r":false,"ro":true,"sh":"The current operational state of the attachment.","t":"`$STRING`","key$":"state","index$":11},"vpc_ids":{"a":true,"h":"Vpc Ids","n":"vpc_ids","r":false,"sh":"An array of VPC network IDs.","t":"`$ARRAY`","key$":"vpc_ids","index$":12}},"id":{"field":"id","name":"id"},"name":"partner_network_connect","op":{"create":{"input":"data","name":"create","points":[{"a":true,"co":{"id":"POST /v2/partner_network_connect/attachments/{pa_id}/service_key","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":"4de7ac8b-495b-4884-9a69-1050c6793cd6","k":"param","n":"pa_id","or":"pa_id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"POST","o":"/v2/partner_network_connect/attachments/{pa_id}/service_key","q":{"$action":"service_key","exist":["pa_id"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v2"},{"lit":"partner_network_connect"},{"lit":"attachments"},{"var":"pa_id"},{"lit":"service_key"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0},{"a":true,"co":{"id":"POST /v2/partner_network_connect/attachments","source":"openapi3","version":2},"g":{},"k":"http","m":"POST","o":"/v2/partner_network_connect/attachments","q":{"$action":"attachment"},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v2"},{"lit":"partner_network_connect"},{"lit":"attachments"}],"t":{"req":"`reqdata`","res":"`body.partner_attachment`"},"index$":1}],"key$":"create"},"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /v2/partner_network_connect/attachments/{pa_id}/remote_routes","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":"4de7ac8b-495b-4884-9a69-1050c6793cd6","k":"param","n":"pa_id","or":"pa_id","r":true,"t":"`$STRING`","index$":0}],"query":[{"a":true,"ex":1,"k":"query","n":"page","or":"page","r":false,"t":"`$INTEGER`","index$":0},{"a":true,"ex":2,"k":"query","n":"per_page","or":"per_page","r":false,"t":"`$INTEGER`","index$":1}]},"k":"http","m":"GET","o":"/v2/partner_network_connect/attachments/{pa_id}/remote_routes","q":{"exist":["pa_id"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v2"},{"lit":"partner_network_connect"},{"lit":"attachments"},{"var":"pa_id"},{"lit":"remote_routes"}],"t":{"req":"`reqdata`","res":"`body.remote_routes`"},"index$":0},{"a":true,"co":{"id":"GET /v2/partner_network_connect/attachments","source":"openapi3","version":2},"g":{"query":[{"a":true,"ex":1,"k":"query","n":"page","or":"page","r":false,"t":"`$INTEGER`","index$":0},{"a":true,"ex":2,"k":"query","n":"per_page","or":"per_page","r":false,"t":"`$INTEGER`","index$":1}]},"k":"http","m":"GET","o":"/v2/partner_network_connect/attachments","q":{"$action":"attachment"},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v2"},{"lit":"partner_network_connect"},{"lit":"attachments"}],"t":{"req":"`reqdata`","res":"`body.partner_attachments`"},"index$":1}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /v2/partner_network_connect/attachments/{pa_id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":"4de7ac8b-495b-4884-9a69-1050c6793cd6","k":"param","n":"pa_id","or":"pa_id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/v2/partner_network_connect/attachments/{pa_id}","q":{"exist":["pa_id"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v2"},{"lit":"partner_network_connect"},{"lit":"attachments"},{"var":"pa_id"}],"t":{"req":"`reqdata`","res":"`body.partner_attachment`"},"index$":0},{"a":true,"co":{"id":"GET /v2/partner_network_connect/attachments/{pa_id}/bgp_auth_key","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":"4de7ac8b-495b-4884-9a69-1050c6793cd6","k":"param","n":"pa_id","or":"pa_id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/v2/partner_network_connect/attachments/{pa_id}/bgp_auth_key","q":{"exist":["pa_id"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v2"},{"lit":"partner_network_connect"},{"lit":"attachments"},{"var":"pa_id"},{"lit":"bgp_auth_key"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":1},{"a":true,"co":{"id":"GET /v2/partner_network_connect/attachments/{pa_id}/service_key","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":"4de7ac8b-495b-4884-9a69-1050c6793cd6","k":"param","n":"pa_id","or":"pa_id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/v2/partner_network_connect/attachments/{pa_id}/service_key","q":{"$action":"service_key","exist":["pa_id"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v2"},{"lit":"partner_network_connect"},{"lit":"attachments"},{"var":"pa_id"},{"lit":"service_key"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":2}],"key$":"load"},"remove":{"input":"data","name":"remove","points":[{"a":true,"co":{"id":"DELETE /v2/partner_network_connect/attachments/{pa_id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":"4de7ac8b-495b-4884-9a69-1050c6793cd6","k":"param","n":"pa_id","or":"pa_id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"DELETE","o":"/v2/partner_network_connect/attachments/{pa_id}","q":{"exist":["pa_id"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v2"},{"lit":"partner_network_connect"},{"lit":"attachments"},{"var":"pa_id"}],"t":{"req":"`reqdata`","res":"`body.partner_attachment`"},"index$":0}],"key$":"remove"},"update":{"input":"data","name":"update","points":[{"a":true,"co":{"id":"PATCH /v2/partner_network_connect/attachments/{pa_id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":"4de7ac8b-495b-4884-9a69-1050c6793cd6","k":"param","n":"pa_id","or":"pa_id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"PATCH","o":"/v2/partner_network_connect/attachments/{pa_id}","q":{"exist":["pa_id"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v2"},{"lit":"partner_network_connect"},{"lit":"attachments"},{"var":"pa_id"}],"t":{"req":"`reqdata`","res":"`body.partner_attachment`"},"index$":0}],"key$":"update"}},"relations":{"ancestors":[]},"key$":"partner_network_connect","name__orig":"partner_network_connect","Name":"PartnerNetworkConnect","name_":"partner_network_connect","name-":"partner-network-connect","NAME":"PARTNER_NETWORK_CONNECT","index$":190}, {"active":true,"entity":"partner_network_connect","key$":"BasicPartnerNetworkConnectFlow","kind":"basic","name":"BasicPartnerNetworkConnectFlow","param":{},"step":[{"a":false,"d":{},"i":{"ref":"partner_network_connect_ref01"},"m":{"pa_id":"pa01"},"o":"create","s":[],"v":[],"unreachable":true},{"a":false,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"partner_network_connect_ref01"}}],"unreachable":true},{"a":false,"d":{},"i":{"ref":"partner_network_connect_ref01","srcdatavar":"partner_network_connect_ref01_data","suffix":"_up0","textfield":"naas_provider"},"m":{},"o":"update","s":[{"apply":"TextFieldMark","def":{"mark":"Mark01-partner_network_connect_ref01"}}],"v":[],"unreachable":true},{"a":false,"d":{},"i":{"ref":"partner_network_connect_ref01","srcdatavar":"partner_network_connect_ref01_data","suffix":"_dt0"},"m":{"id":"partner_network_connect01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-partner_network_connect_ref01"}}],"unreachable":true},{"a":false,"d":{},"i":{"ref":"partner_network_connect_ref01","suffix":"_rm0"},"m":{"id":"partner_network_connect01"},"o":"remove","s":[],"v":[],"unreachable":true},{"a":false,"d":{},"i":{"suffix":"_rt0"},"m":{},"o":"list","s":[],"v":[{"apply":"ItemNotExists","def":{"ref":"partner_network_connect_ref01"}}],"unreachable":true}]}, 'PartnerNetworkConnect', {"POST /v2/partner_network_connect/attachments/{pa_id}/service_key":{"protocol":"http","parameters":[{"in":"path","name":"pa_id","description":"A unique identifier for a partner attachment.","required":true,"schema":{"type":"string","format":"string","minimum":1},"example":"4de7ac8b-495b-4884-9a69-1050c6793cd6","x-ref":"#/components/parameters/pa_id","index$":0}]},"POST /v2/partner_network_connect/attachments":{"protocol":"http","requestBody":{"content":{"application/json":{"schema":{"type":"object","required":["name","connection_bandwidth_in_mbps","region","naas_provider","vpc_ids"],"properties":{"name":{"type":"string","pattern":"^[a-zA-Z0-9\\-\\.]+$","example":"env.prod-partner-network-connect","description":"The name of the partner attachment. Must be unique and may only contain alphanumeric characters, dashes, and periods."},"connection_bandwidth_in_mbps":{"type":"integer","description":"Bandwidth (in Mbps) of the connection.","enum":[1000,2000,5000,10000],"example":1000},"region":{"description":"The region to create the partner attachment.","enum":["nyc","sfo","fra","ams","sgp"],"type":"string","example":"nyc"},"naas_provider":{"type":"string","example":"megaport"},"vpc_ids":{"type":"array","items":{"type":"string","format":"string"},"minItems":1,"example":["c140286f-e6ce-4131-8b7b-df4590ce8d6a","994a2735-dc84-11e8-80bc-3cfdfea9fba1"],"description":"An array of VPCs IDs."},"parent_uuid":{"type":"string","description":"Optional associated partner attachment UUID","example":"d594cf8d-8c79-4bc5-aec1-6f9b211506b3"},"bgp":{"type":"object","description":"Optional BGP configurations","required":["local_router_ip","peer_router_ip","peer_router_asn","auth_key"],"properties":{"local_router_ip":{"type":"string","example":"169.254.0.1/29","description":"IP of the DO router"},"peer_router_ip":{"type":"string","example":"169.254.0.6/29","description":"IP of the Naas Provider router"},"peer_router_asn":{"type":"integer","example":64532,"description":"ASN of the peer router"},"auth_key":{"type":"string","example":"0xsNnb1pwQlowdoMySEfWwk4I","description":"BGP Auth Key"}}},"redundancy_zone":{"type":"string","description":"Optional redundancy zone for the partner attachment.","enum":["MEGAPORT_BLUE","MEGAPORT_RED"],"example":"MEGAPORT_BLUE"}},"x-ref":"#/components/schemas/partner_attachment_writable"}}}},"parameters":[]},"GET /v2/partner_network_connect/attachments/{pa_id}/remote_routes":{"protocol":"http","parameters":[{"in":"path","name":"pa_id","description":"A unique identifier for a partner attachment.","required":true,"schema":{"type":"string","format":"string","minimum":1},"example":"4de7ac8b-495b-4884-9a69-1050c6793cd6","x-ref":"#/components/parameters/pa_id","index$":0},{"in":"query","name":"per_page","required":false,"description":"Number of items returned per page","schema":{"type":"integer","minimum":1,"default":20,"maximum":200},"example":2,"x-ref":"#/components/parameters/parameters_per_page","index$":1},{"in":"query","name":"page","required":false,"description":"Which 'page' of paginated results to return.","schema":{"type":"integer","minimum":1,"default":1},"example":1,"x-ref":"#/components/parameters/page","index$":2}]},"GET /v2/partner_network_connect/attachments":{"protocol":"http","parameters":[{"in":"query","name":"per_page","required":false,"description":"Number of items returned per page","schema":{"type":"integer","minimum":1,"default":20,"maximum":200},"example":2,"x-ref":"#/components/parameters/parameters_per_page","index$":0},{"in":"query","name":"page","required":false,"description":"Which 'page' of paginated results to return.","schema":{"type":"integer","minimum":1,"default":1},"example":1,"x-ref":"#/components/parameters/page","index$":1}]},"GET /v2/partner_network_connect/attachments/{pa_id}":{"protocol":"http","parameters":[{"in":"path","name":"pa_id","description":"A unique identifier for a partner attachment.","required":true,"schema":{"type":"string","format":"string","minimum":1},"example":"4de7ac8b-495b-4884-9a69-1050c6793cd6","x-ref":"#/components/parameters/pa_id","index$":0}]},"GET /v2/partner_network_connect/attachments/{pa_id}/bgp_auth_key":{"protocol":"http","parameters":[{"in":"path","name":"pa_id","description":"A unique identifier for a partner attachment.","required":true,"schema":{"type":"string","format":"string","minimum":1},"example":"4de7ac8b-495b-4884-9a69-1050c6793cd6","x-ref":"#/components/parameters/pa_id","index$":0}]},"GET /v2/partner_network_connect/attachments/{pa_id}/service_key":{"protocol":"http","parameters":[{"in":"path","name":"pa_id","description":"A unique identifier for a partner attachment.","required":true,"schema":{"type":"string","format":"string","minimum":1},"example":"4de7ac8b-495b-4884-9a69-1050c6793cd6","x-ref":"#/components/parameters/pa_id","index$":0}]},"DELETE /v2/partner_network_connect/attachments/{pa_id}":{"protocol":"http","parameters":[{"in":"path","name":"pa_id","description":"A unique identifier for a partner attachment.","required":true,"schema":{"type":"string","format":"string","minimum":1},"example":"4de7ac8b-495b-4884-9a69-1050c6793cd6","x-ref":"#/components/parameters/pa_id","index$":0}]},"PATCH /v2/partner_network_connect/attachments/{pa_id}":{"protocol":"http","requestBody":{"content":{"application/json":{"schema":{"anyOf":[{"title":"Name","required":["name"],"type":"object","properties":{"name":{"type":"string","pattern":"^[a-zA-Z0-9\\-\\.]+$","example":"env.prod-partner-network-connect","description":"The name of the partner attachment. Must be unique and may only contain alphanumeric characters, dashes, and periods."}}},{"title":"VPC IDs","type":"object","required":["vpc_ids"],"properties":{"vpc_ids":{"type":"array","items":{"type":"string","format":"string"},"minItems":1,"example":["c140286f-e6ce-4131-8b7b-df4590ce8d6a","994a2735-dc84-11e8-80bc-3cfdfea9fba1"],"description":"An array of VPCs IDs."}}},{"title":"BGP","type":"object","properties":{"bgp":{"type":"object","description":"BGP configurations","required":["local_router_ip","peer_router_ip","peer_router_asn","auth_key"],"properties":{"local_router_ip":{},"peer_router_ip":{},"peer_router_asn":{},"auth_key":{}}}}}],"x-ref":"#/components/schemas/partner_attachment_updatable","index$":1}}}},"parameters":[{"in":"path","name":"pa_id","description":"A unique identifier for a partner attachment.","required":true,"schema":{"type":"string","format":"string","minimum":1},"example":"4de7ac8b-495b-4884-9a69-1050c6793cd6","x-ref":"#/components/parameters/pa_id","index$":0}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let partner_network_connect_ref01_data = Object.values(setup.data.existing.partner_network_connect)[0] as any

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
      '../../../../.sdk/test/entity/partner_network_connect/PartnerNetworkConnectTestData.json')

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
    ['partner_network_connect01','partner_network_connect02','partner_network_connect03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'DIGITALOCEAN_TEST_PARTNER_NETWORK_CONNECT_ENTID': idmap,
    'DIGITALOCEAN_TEST_LIVE': 'FALSE',
    'DIGITALOCEAN_TEST_EXPLAIN': 'FALSE',
    'DIGITALOCEAN_APIKEY': '',
  })

  idmap = env['DIGITALOCEAN_TEST_PARTNER_NETWORK_CONNECT_ENTID']

  const live = 'TRUE' === env.DIGITALOCEAN_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['DIGITALOCEAN_TEST_PARTNER_NETWORK_CONNECT_ENTID']
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
  
