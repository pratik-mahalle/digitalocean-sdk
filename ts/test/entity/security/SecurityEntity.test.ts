

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


describe('SecurityEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when DIGITALOCEAN_TEST_LIVE=TRUE.
  afterEach(liveDelay('DIGITALOCEAN_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = DigitaloceanSDK.test()
    const ent = testsdk.Security()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = DigitaloceanSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.Security().list({"finding_id":1,"scan_id":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.DIGITALOCEAN_TEST_LIVE
    for (const op of ['create', 'list', 'update', 'load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'security.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"created_at":{"a":true,"fo":"date-time","h":"Created At","n":"created_at","r":false,"sh":"When scan was created.","t":"`$STRING`","key$":"created_at","index$":0},"findings":{"a":true,"h":"Findings","n":"findings","r":false,"t":"`$ARRAY`","key$":"findings","index$":1},"id":{"a":true,"h":"Id","n":"id","r":false,"sh":"The unique identifier for the scan.","t":"`$STRING`","key$":"id","index$":2},"name":{"a":true,"h":"Name","n":"name","r":false,"sh":"The name of the affected resource.","t":"`$STRING`","key$":"name","index$":3},"resource":{"a":true,"h":"Resource","n":"resource","r":false,"sh":"The URN of a resource to exclude from future scans.","t":"`$STRING`","key$":"resource","index$":4},"resources":{"a":true,"h":"Resources","n":"resources","r":false,"sh":"The URNs of resources to suppress for the rule.","t":"`$ARRAY`","key$":"resources","index$":5},"rule_uuid":{"a":true,"h":"Rule Uuid","n":"rule_uuid","r":false,"sh":"The rule UUID to suppress for the listed resources.","t":"`$STRING`","key$":"rule_uuid","index$":6},"status":{"a":true,"h":"Status","n":"status","r":false,"sh":"The status of the scan.","t":"`$STRING`","key$":"status","index$":7},"tier_coverage":{"a":true,"h":"Tier Coverage","n":"tier_coverage","r":false,"sh":"Scan coverage for each available plan tier.","t":"`$OBJECT`","key$":"tier_coverage","index$":8},"type":{"a":true,"h":"Type","n":"type","r":false,"sh":"The type of the affected resource.","t":"`$STRING`","key$":"type","index$":9},"urn":{"a":true,"h":"Urn","n":"urn","r":false,"sh":"The URN for the affected resource.","t":"`$STRING`","key$":"urn","index$":10}},"id":{"field":"id","name":"id"},"name":"security","op":{"create":{"input":"data","name":"create","points":[{"a":true,"co":{"id":"POST /v2/security/scans","source":"openapi3","version":2},"g":{},"k":"http","m":"POST","o":"/v2/security/scans","q":{"$action":"scan"},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v2"},{"lit":"security"},{"lit":"scans"}],"t":{"req":"`reqdata`","res":"`body.scan`"},"index$":0},{"a":true,"co":{"id":"POST /v2/security/scans/rules","source":"openapi3","version":2},"g":{},"k":"http","m":"POST","o":"/v2/security/scans/rules","q":{},"r":{},"s":[{"lit":"v2"},{"lit":"security"},{"lit":"scans"},{"lit":"rules"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":1},{"a":true,"co":{"id":"POST /v2/security/settings/suppressions","source":"openapi3","version":2},"g":{},"k":"http","m":"POST","o":"/v2/security/settings/suppressions","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v2"},{"lit":"security"},{"lit":"settings"},{"lit":"suppressions"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":2}],"key$":"create"},"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /v2/security/scans/{scan_id}/findings/{finding_uuid}/affected_resources","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":"50e14f43-dd4e-412f-864d-78943ea28d91","k":"param","n":"finding_id","or":"finding_uuid","r":true,"t":"`$STRING`","index$":0},{"a":true,"ex":"497dcba3-ecbf-4587-a2dd-5eb0665e6880","k":"param","n":"scan_id","or":"scan_id","r":true,"t":"`$STRING`","index$":1}],"query":[{"a":true,"ex":1,"k":"query","n":"page","or":"page","r":false,"t":"`$INTEGER`","index$":0},{"a":true,"ex":2,"k":"query","n":"per_page","or":"per_page","r":false,"t":"`$INTEGER`","index$":1}]},"k":"http","m":"GET","o":"/v2/security/scans/{scan_id}/findings/{finding_uuid}/affected_resources","q":{"exist":["finding_id","scan_id"]},"r":{"param":{"finding_uuid":"finding_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v2"},{"lit":"security"},{"lit":"scans"},{"var":"scan_id"},{"lit":"findings"},{"var":"finding_id"},{"lit":"affected_resources"}],"t":{"req":"`reqdata`","res":"`body.affected_resources`"},"index$":0},{"a":true,"co":{"id":"GET /v2/security/scans","source":"openapi3","version":2},"g":{"query":[{"a":true,"ex":1,"k":"query","n":"page","or":"page","r":false,"t":"`$INTEGER`","index$":0},{"a":true,"ex":2,"k":"query","n":"per_page","or":"per_page","r":false,"t":"`$INTEGER`","index$":1}]},"k":"http","m":"GET","o":"/v2/security/scans","q":{"$action":"scan"},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v2"},{"lit":"security"},{"lit":"scans"}],"t":{"req":"`reqdata`","res":"`body.scans`"},"index$":1}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /v2/security/scans/{scan_id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":"497dcba3-ecbf-4587-a2dd-5eb0665e6880","k":"param","n":"scan_id","or":"scan_id","r":true,"t":"`$STRING`","index$":0}],"query":[{"a":true,"ex":1,"k":"query","n":"page","or":"page","r":false,"t":"`$INTEGER`","index$":0},{"a":true,"ex":2,"k":"query","n":"per_page","or":"per_page","r":false,"t":"`$INTEGER`","index$":1},{"a":true,"ex":"CRITICAL","k":"query","n":"severity","or":"severity","r":false,"t":"`$STRING`","index$":2},{"a":true,"ex":"CSPM","k":"query","n":"type","or":"type","r":false,"t":"`$STRING`","index$":3}]},"k":"http","m":"GET","o":"/v2/security/scans/{scan_id}","q":{"exist":["scan_id"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v2"},{"lit":"security"},{"lit":"scans"},{"var":"scan_id"}],"t":{"req":"`reqdata`","res":"`body.scan`"},"index$":0},{"a":true,"co":{"id":"GET /v2/security/scans/latest","source":"openapi3","version":2},"g":{"query":[{"a":true,"ex":1,"k":"query","n":"page","or":"page","r":false,"t":"`$INTEGER`","index$":0},{"a":true,"ex":2,"k":"query","n":"per_page","or":"per_page","r":false,"t":"`$INTEGER`","index$":1},{"a":true,"ex":"CRITICAL","k":"query","n":"severity","or":"severity","r":false,"t":"`$STRING`","index$":2},{"a":true,"ex":"CSPM","k":"query","n":"type","or":"type","r":false,"t":"`$STRING`","index$":3}]},"k":"http","m":"GET","o":"/v2/security/scans/latest","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v2"},{"lit":"security"},{"lit":"scans"},{"lit":"latest"}],"t":{"req":"`reqdata`","res":"`body.scan`"},"index$":1}],"key$":"load"},"remove":{"input":"data","name":"remove","points":[{"a":true,"co":{"id":"DELETE /v2/security/settings/suppressions/{suppression_uuid}","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":"5b3b2b2d-5c9c-4a61-9e2f-4d8f80f30a12","k":"param","n":"suppression_uuid","or":"suppression_uuid","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"DELETE","o":"/v2/security/settings/suppressions/{suppression_uuid}","q":{"exist":["suppression_uuid"]},"r":{},"s":[{"lit":"v2"},{"lit":"security"},{"lit":"settings"},{"lit":"suppressions"},{"var":"suppression_uuid"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"remove"},"update":{"input":"data","name":"update","points":[{"a":true,"co":{"id":"PUT /v2/security/settings/plan","source":"openapi3","version":2},"g":{},"k":"http","m":"PUT","o":"/v2/security/settings/plan","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v2"},{"lit":"security"},{"lit":"settings"},{"lit":"plan"}],"t":{"req":"`reqdata`","res":"`body.tier_coverage`"},"index$":0}],"key$":"update"}},"relations":{"ancestors":[]},"key$":"security","name__orig":"security","Name":"Security","name_":"security","name-":"security","NAME":"SECURITY","index$":200}, {"active":true,"entity":"security","key$":"BasicSecurityFlow","kind":"basic","name":"BasicSecurityFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"security_ref01"},"m":{"finding_id":"finding01","scan_id":"scan01"},"o":"create","s":[],"v":[],"index$":0},{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"security_ref01"}}],"index$":1},{"a":true,"d":{},"i":{"ref":"security_ref01","srcdatavar":"security_ref01_data","suffix":"_up0","textfield":"created_at"},"m":{},"o":"update","s":[{"apply":"TextFieldMark","def":{"mark":"Mark01-security_ref01"}}],"v":[],"index$":2},{"a":true,"d":{},"i":{"ref":"security_ref01","srcdatavar":"security_ref01_data","suffix":"_dt0"},"m":{},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-security_ref01"}}],"index$":3},{"a":false,"d":{},"i":{"ref":"security_ref01","suffix":"_rm0"},"m":{"id":"security01"},"o":"remove","s":[],"v":[],"unreachable":true},{"a":true,"d":{},"i":{"suffix":"_rt0"},"m":{},"o":"list","s":[],"v":[{"apply":"ItemNotExists","def":{"ref":"security_ref01"}}],"index$":4}]}, 'Security', {"POST /v2/security/scans":{"protocol":"http","parameters":[]},"POST /v2/security/scans/rules":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","properties":{"resource":{"type":"string","example":"do:droplet:fe3a2fd7-903d-46e6-ada3-3e4f285fb89d","description":"The URN of a resource to exclude from future scans.","key$":"resource"}},"index$":1}}}},"parameters":[]},"POST /v2/security/settings/suppressions":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","properties":{"rule_uuid":{"type":"string","description":"The rule UUID to suppress for the listed resources.","key$":"rule_uuid"},"resources":{"type":"array","items":{"type":"string"},"example":["do:droplet:fe3a2fd7-903d-46e6-ada3-3e4f285fb89d"],"description":"The URNs of resources to suppress for the rule.","key$":"resources"}},"index$":1}}}},"parameters":[]},"GET /v2/security/scans/{scan_id}/findings/{finding_uuid}/affected_resources":{"protocol":"http","parameters":[{"in":"path","name":"scan_id","description":"The scan UUID.","required":true,"schema":{"type":"string","format":"uuid"},"example":"497dcba3-ecbf-4587-a2dd-5eb0665e6880","x-ref":"#/components/parameters/scan_id","index$":0},{"in":"path","name":"finding_uuid","description":"The finding UUID.","required":true,"schema":{"type":"string","format":"uuid"},"example":"50e14f43-dd4e-412f-864d-78943ea28d91","x-ref":"#/components/parameters/finding_uuid","index$":1},{"in":"query","name":"per_page","required":false,"description":"Number of items returned per page","schema":{"type":"integer","minimum":1,"default":20,"maximum":200},"example":2,"x-ref":"#/components/parameters/parameters_per_page","index$":2},{"in":"query","name":"page","required":false,"description":"Which 'page' of paginated results to return.","schema":{"type":"integer","minimum":1,"default":1},"example":1,"x-ref":"#/components/parameters/page","index$":3}]},"GET /v2/security/scans":{"protocol":"http","parameters":[{"in":"query","name":"per_page","required":false,"description":"Number of items returned per page","schema":{"type":"integer","minimum":1,"default":20,"maximum":200},"example":2,"x-ref":"#/components/parameters/parameters_per_page","index$":0},{"in":"query","name":"page","required":false,"description":"Which 'page' of paginated results to return.","schema":{"type":"integer","minimum":1,"default":1},"example":1,"x-ref":"#/components/parameters/page","index$":1}]},"GET /v2/security/scans/{scan_id}":{"protocol":"http","parameters":[{"in":"path","name":"scan_id","description":"The scan UUID.","required":true,"schema":{"type":"string","format":"uuid"},"example":"497dcba3-ecbf-4587-a2dd-5eb0665e6880","x-ref":"#/components/parameters/scan_id","index$":0},{"in":"query","name":"severity","required":false,"description":"The finding severity level to include.","schema":{"type":"string","enum":["LOW","MEDIUM","HIGH","CRITICAL"]},"example":"CRITICAL","x-ref":"#/components/parameters/severity","index$":1},{"in":"query","name":"per_page","required":false,"description":"Number of items returned per page","schema":{"type":"integer","minimum":1,"default":20,"maximum":200},"example":2,"x-ref":"#/components/parameters/parameters_per_page","index$":2},{"in":"query","name":"page","required":false,"description":"Which 'page' of paginated results to return.","schema":{"type":"integer","minimum":1,"default":1},"example":1,"x-ref":"#/components/parameters/page","index$":3},{"in":"query","name":"type","required":false,"description":"The finding type to include.","schema":{"type":"string"},"example":"CSPM","index$":4}]},"GET /v2/security/scans/latest":{"protocol":"http","parameters":[{"in":"query","name":"per_page","required":false,"description":"Number of items returned per page","schema":{"type":"integer","minimum":1,"default":20,"maximum":200},"example":2,"x-ref":"#/components/parameters/parameters_per_page","index$":0},{"in":"query","name":"page","required":false,"description":"Which 'page' of paginated results to return.","schema":{"type":"integer","minimum":1,"default":1},"example":1,"x-ref":"#/components/parameters/page","index$":1},{"in":"query","name":"severity","required":false,"description":"The finding severity level to include.","schema":{"type":"string","enum":["LOW","MEDIUM","HIGH","CRITICAL"]},"example":"CRITICAL","x-ref":"#/components/parameters/severity","index$":2},{"in":"query","name":"type","required":false,"description":"The finding type to include.","schema":{"type":"string"},"example":"CSPM","index$":3}]},"DELETE /v2/security/settings/suppressions/{suppression_uuid}":{"protocol":"http","parameters":[{"in":"path","name":"suppression_uuid","description":"The suppression UUID to remove.","required":true,"schema":{"type":"string","format":"uuid"},"example":"5b3b2b2d-5c9c-4a61-9e2f-4d8f80f30a12","x-ref":"#/components/parameters/suppression_uuid","index$":0}]},"PUT /v2/security/settings/plan":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","properties":{"tier_coverage":{"type":"object","description":"Scan coverage for each available plan tier.","additionalProperties":{"type":"object","properties":{"resources":{"type":"array","items":{},"description":"The URNs of resources to scan for the tier.","default":[],"example":[]},"tags":{"type":"array","items":{},"description":"Resource tags to scan for the tier.","default":[],"example":[]}}},"example":{"basic":{"resources":["do:droplet:fe3a2fd7-903d-46e6-ada3-3e4f285fb89d"],"tags":["production"]}},"key$":"tier_coverage"}},"index$":1}}}},"parameters":[]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const security_ref01_ent = client.Security()
    let security_ref01_data = setup.data.new.security['security_ref01']
    security_ref01_data['finding_id'] = setup.idmap['finding01']
    security_ref01_data['scan_id'] = setup.idmap['scan01']

    security_ref01_data = (await security_ref01_ent.create(security_ref01_data)).data()
    assert(null != security_ref01_data.id)


    // LIST
    const security_ref01_match: any = {}

    const security_ref01_list = (await security_ref01_ent.list(security_ref01_match)).map((e: any) => e.data())

    assert(!isempty(select(security_ref01_list, { id: security_ref01_data.id })))


    // UPDATE
    const security_ref01_data_up0: any = {}
    security_ref01_data_up0.id = security_ref01_data.id

    const security_ref01_markdef_up0 = { name: 'created_at', value: 'Mark01-security_ref01_' + setup.now }
    ;(security_ref01_data_up0 as any)[security_ref01_markdef_up0.name] = security_ref01_markdef_up0.value

    const security_ref01_resdata_up0 = (await security_ref01_ent.update(security_ref01_data_up0)).data()
    assert(security_ref01_resdata_up0.id === security_ref01_data_up0.id)

    assert((security_ref01_resdata_up0 as any)[security_ref01_markdef_up0.name] === security_ref01_markdef_up0.value)


    // LOAD
    const security_ref01_match_dt0: any = {}
    security_ref01_match_dt0.id = security_ref01_data.id
    const security_ref01_data_dt0 = (await security_ref01_ent.load(security_ref01_match_dt0)).data()
    assert(security_ref01_data_dt0.id === security_ref01_data.id)


    // LIST
    const security_ref01_match_rt0: any = {}

    const security_ref01_list_rt0 = (await security_ref01_ent.list(security_ref01_match_rt0)).map((e: any) => e.data())

    assert(isempty(select(security_ref01_list_rt0, { id: security_ref01_data.id })))


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
      '../../../../.sdk/test/entity/security/SecurityTestData.json')

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
    ['security01','security02','security03','finding01','scan01'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'DIGITALOCEAN_TEST_SECURITY_ENTID': idmap,
    'DIGITALOCEAN_TEST_LIVE': 'FALSE',
    'DIGITALOCEAN_TEST_EXPLAIN': 'FALSE',
    'DIGITALOCEAN_APIKEY': '',
  })

  idmap = env['DIGITALOCEAN_TEST_SECURITY_ENTID']

  const live = 'TRUE' === env.DIGITALOCEAN_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['DIGITALOCEAN_TEST_SECURITY_ENTID']
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
  
