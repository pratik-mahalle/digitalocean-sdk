

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


describe('FirewallEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when DIGITALOCEAN_TEST_LIVE=TRUE.
  afterEach(liveDelay('DIGITALOCEAN_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = DigitaloceanSDK.test()
    const ent = testsdk.Firewall()
    assert(null != ent)
  })


  class FailHook extends BaseFeature {
    name = 'failhook'
    version = '0.0.1'
    active = true
    unexpected = 0
    init() { }
    PreSpec() { throw new Error('firewall hook failed') }
    PreUnexpected() { this.unexpected++ }
  }

  test('stream-error', async () => {
    const offline = { net: { offline: true } }
    await assert.rejects(async () => {
      for await (const _item of DigitaloceanSDK.test(offline).Firewall().stream('list')) { }
    }, /offline/)

    for await (const _item of DigitaloceanSDK.test(offline).Firewall()
      .stream('list', undefined, { ctrl: { throw: false } })) { }

    if (null != (config as any).feature?.rbac) {
      const denied = DigitaloceanSDK.test(undefined, { feature: { rbac: { active: true, deny: true } } })
      await assert.rejects(async () => {
        for await (const _item of denied.Firewall().stream('list')) { }
      }, (err: any) => 'rbac_denied' === err.code)
    }
  })

  test('stream-ctrl', async () => {
    const explain: any = {}
    const ctrl: any = { explain }
    for await (const _item of DigitaloceanSDK.test().Firewall().stream('list', undefined, { ctrl })) { }
    assert.deepStrictEqual(Object.keys(ctrl), ['explain'])
    assert(explain === ctrl.explain && 0 < Object.keys(explain).length)
  })

  test('unexpected', async () => {
    const hook = new FailHook()
    const client = new DigitaloceanSDK({ feature: { test: { active: true } }, extend: [hook] })
    await assert.rejects(client.Firewall().list(), /hook failed/)
    assert(0 < hook.unexpected)

    const fired = hook.unexpected
    assert.strictEqual(await client.Firewall().list(undefined, { throw: false }), undefined)
    assert(fired < hook.unexpected)
  })

  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = DigitaloceanSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.Firewall().list({"page":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.DIGITALOCEAN_TEST_LIVE
    for (const op of ['create', 'list', 'update', 'load', 'remove']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'firewall.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"created_at":{"a":true,"fo":"date-time","h":"Created At","n":"created_at","r":false,"ro":true,"sh":"A time value given in ISO8601 combined date and time format that represents when the firewall was created.","t":"`$STRING`","key$":"created_at","index$":0},"droplet_ids":{"a":true,"h":"Droplet Ids","n":"droplet_ids","r":false,"sh":"An array containing the IDs of the Droplets assigned to the firewall.","t":"`$ARRAY`","key$":"droplet_ids","index$":1},"id":{"a":true,"h":"Id","n":"id","r":false,"ro":true,"sh":"A unique ID that can be used to identify and reference a firewall.","t":"`$STRING`","key$":"id","index$":2},"inbound_rules":{"a":true,"h":"Inbound Rules","n":"inbound_rules","r":false,"t":"`$ARRAY`","key$":"inbound_rules","index$":3},"name":{"a":true,"h":"Name","n":"name","op":{"create":{"req":true,"type":"`$STRING`"},"update":{"req":true,"type":"`$STRING`"}},"r":false,"sh":"A human-readable name for a firewall.","t":"`$STRING`","key$":"name","index$":4},"outbound_rules":{"a":true,"h":"Outbound Rules","n":"outbound_rules","r":false,"t":"`$ARRAY`","key$":"outbound_rules","index$":5},"pending_changes":{"a":true,"h":"Pending Changes","n":"pending_changes","r":false,"ro":true,"sh":"An array of objects each containing the fields \"droplet_id\", \"removing\", and \"status\".","t":"`$ARRAY`","key$":"pending_changes","index$":6},"status":{"a":true,"h":"Status","n":"status","r":false,"ro":true,"sh":"A status string indicating the current state of the firewall.","t":"`$STRING`","key$":"status","index$":7},"tags":{"a":true,"h":"Tags","n":"tags","r":false,"t":"`$ANY`","key$":"tags","index$":8}},"id":{"field":"id","name":"id"},"name":"firewall","op":{"create":{"input":"data","name":"create","points":[{"a":true,"co":{"id":"POST /v2/firewalls/{firewall_id}/droplets","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":"bb4b2611-3d72-467b-8602-280330ecd65c","k":"param","n":"id","or":"firewall_id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"POST","o":"/v2/firewalls/{firewall_id}/droplets","q":{"$action":"droplet","exist":["id"]},"r":{"param":{"firewall_id":"id"}},"s":[{"lit":"v2"},{"lit":"firewalls"},{"var":"id"},{"lit":"droplets"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0},{"a":true,"co":{"id":"POST /v2/firewalls/{firewall_id}/rules","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":"bb4b2611-3d72-467b-8602-280330ecd65c","k":"param","n":"id","or":"firewall_id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"POST","o":"/v2/firewalls/{firewall_id}/rules","q":{"$action":"rule","exist":["id"]},"r":{"param":{"firewall_id":"id"}},"s":[{"lit":"v2"},{"lit":"firewalls"},{"var":"id"},{"lit":"rules"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":1},{"a":true,"co":{"id":"POST /v2/firewalls/{firewall_id}/tags","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":"bb4b2611-3d72-467b-8602-280330ecd65c","k":"param","n":"id","or":"firewall_id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"POST","o":"/v2/firewalls/{firewall_id}/tags","q":{"$action":"tag","exist":["id"]},"r":{"param":{"firewall_id":"id"}},"s":[{"lit":"v2"},{"lit":"firewalls"},{"var":"id"},{"lit":"tags"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":2},{"a":true,"co":{"id":"POST /v2/firewalls","source":"openapi3","version":2},"g":{},"k":"http","m":"POST","o":"/v2/firewalls","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v2"},{"lit":"firewalls"}],"t":{"req":"`reqdata`","res":"`body.firewall`"},"index$":3}],"key$":"create"},"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /v2/firewalls","source":"openapi3","version":2},"g":{"query":[{"a":true,"ex":1,"k":"query","n":"page","or":"page","r":false,"t":"`$INTEGER`","index$":0},{"a":true,"ex":2,"k":"query","n":"per_page","or":"per_page","r":false,"t":"`$INTEGER`","index$":1}]},"k":"http","m":"GET","o":"/v2/firewalls","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v2"},{"lit":"firewalls"}],"t":{"req":"`reqdata`","res":"`body.firewalls`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /v2/firewalls/{firewall_id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":"bb4b2611-3d72-467b-8602-280330ecd65c","k":"param","n":"id","or":"firewall_id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/v2/firewalls/{firewall_id}","q":{"exist":["id"]},"r":{"param":{"firewall_id":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v2"},{"lit":"firewalls"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body.firewall`"},"index$":0}],"key$":"load"},"remove":{"input":"data","name":"remove","points":[{"a":true,"co":{"id":"DELETE /v2/firewalls/{firewall_id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":"bb4b2611-3d72-467b-8602-280330ecd65c","k":"param","n":"id","or":"firewall_id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"DELETE","o":"/v2/firewalls/{firewall_id}","q":{"exist":["id"]},"r":{"param":{"firewall_id":"id"}},"s":[{"lit":"v2"},{"lit":"firewalls"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0},{"a":true,"co":{"id":"DELETE /v2/firewalls/{firewall_id}/droplets","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":"bb4b2611-3d72-467b-8602-280330ecd65c","k":"param","n":"id","or":"firewall_id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"DELETE","o":"/v2/firewalls/{firewall_id}/droplets","q":{"$action":"droplet","exist":["id"]},"r":{"param":{"firewall_id":"id"}},"s":[{"lit":"v2"},{"lit":"firewalls"},{"var":"id"},{"lit":"droplets"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":1},{"a":true,"co":{"id":"DELETE /v2/firewalls/{firewall_id}/rules","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":"bb4b2611-3d72-467b-8602-280330ecd65c","k":"param","n":"id","or":"firewall_id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"DELETE","o":"/v2/firewalls/{firewall_id}/rules","q":{"$action":"rule","exist":["id"]},"r":{"param":{"firewall_id":"id"}},"s":[{"lit":"v2"},{"lit":"firewalls"},{"var":"id"},{"lit":"rules"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":2},{"a":true,"co":{"id":"DELETE /v2/firewalls/{firewall_id}/tags","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":"bb4b2611-3d72-467b-8602-280330ecd65c","k":"param","n":"id","or":"firewall_id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"DELETE","o":"/v2/firewalls/{firewall_id}/tags","q":{"$action":"tag","exist":["id"]},"r":{"param":{"firewall_id":"id"}},"s":[{"lit":"v2"},{"lit":"firewalls"},{"var":"id"},{"lit":"tags"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":3}],"key$":"remove"},"update":{"input":"data","name":"update","points":[{"a":true,"co":{"id":"PUT /v2/firewalls/{firewall_id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":"bb4b2611-3d72-467b-8602-280330ecd65c","k":"param","n":"id","or":"firewall_id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"PUT","o":"/v2/firewalls/{firewall_id}","q":{"exist":["id"]},"r":{"param":{"firewall_id":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v2"},{"lit":"firewalls"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body.firewall`"},"index$":0}],"key$":"update"}},"relations":{"ancestors":[]},"key$":"firewall","name__orig":"firewall","Name":"Firewall","name_":"firewall","name-":"firewall","NAME":"FIREWALL","index$":150}, {"active":true,"entity":"firewall","key$":"BasicFirewallFlow","kind":"basic","name":"BasicFirewallFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"firewall_ref01"},"m":{},"o":"create","s":[],"v":[],"index$":0},{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"firewall_ref01"}}],"index$":1},{"a":true,"d":{},"i":{"ref":"firewall_ref01","srcdatavar":"firewall_ref01_data","suffix":"_up0","textfield":"name"},"m":{},"o":"update","s":[{"apply":"TextFieldMark","def":{"mark":"Mark01-firewall_ref01"}}],"v":[],"index$":2},{"a":true,"d":{},"i":{"ref":"firewall_ref01","srcdatavar":"firewall_ref01_data","suffix":"_dt0"},"m":{"id":"firewall01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-firewall_ref01"}}],"index$":3},{"a":true,"d":{},"i":{"ref":"firewall_ref01","suffix":"_rm0"},"m":{"id":"firewall01"},"o":"remove","s":[],"v":[],"index$":4},{"a":true,"d":{},"i":{"suffix":"_rt0"},"m":{},"o":"list","s":[],"v":[{"apply":"ItemNotExists","def":{"ref":"firewall_ref01"}}],"index$":5}]}, 'Firewall', {"POST /v2/firewalls/{firewall_id}/droplets":{"protocol":"http","requestBody":{"content":{"application/json":{"schema":{"properties":{"droplet_ids":{"type":"array","description":"An array containing the IDs of the Droplets to be assigned to the firewall.","items":{"type":"integer"},"example":[49696269]}},"required":["droplet_ids"]},"example":{"droplet_ids":[49696269]}}}},"parameters":[{"name":"firewall_id","description":"A unique ID that can be used to identify and reference a firewall.","in":"path","schema":{"type":"string","format":"uuid"},"example":"bb4b2611-3d72-467b-8602-280330ecd65c","required":true,"x-ref":"#/components/parameters/firewall_id","index$":0}]},"POST /v2/firewalls/{firewall_id}/rules":{"protocol":"http","requestBody":{"content":{"application/json":{"schema":{"allOf":[{"type":"object","properties":{"inbound_rules":{"nullable":true,"type":"array","items":{"allOf":[]},"key$":"inbound_rules"},"outbound_rules":{"nullable":true,"type":"array","items":{"allOf":[]},"key$":"outbound_rules"}},"x-ref":"#/components/schemas/firewall_rules"},{"anyOf":[{"title":"Inbound Rules","required":["inbound_rules"]},{"title":"Outbound Rules","required":["outbound_rules"]}]}]},"example":{"inbound_rules":[{"protocol":"tcp","ports":"3306","action":"allow","sources":{"droplet_ids":[49696269]}}],"outbound_rules":[{"protocol":"tcp","ports":"3306","action":"allow","destinations":{"droplet_ids":[49696269]}}]}}}},"parameters":[{"name":"firewall_id","description":"A unique ID that can be used to identify and reference a firewall.","in":"path","schema":{"type":"string","format":"uuid"},"example":"bb4b2611-3d72-467b-8602-280330ecd65c","required":true,"x-ref":"#/components/parameters/firewall_id","index$":0}]},"POST /v2/firewalls/{firewall_id}/tags":{"protocol":"http","requestBody":{"content":{"application/json":{"schema":{"properties":{"tags":{"allOf":[{"type":"array","items":{"type":"string"},"nullable":true,"description":"A flat array of tag names as strings to be applied to the resource. Tag names must exist in order to be referenced in a request. <br><br>Requires `tag:create` and `tag:read` scopes.","example":["base-image","prod"],"x-ref":"#/components/schemas/existing_tags_array"},{"description":"An array containing the names of the Tags to be assigned to the firewall."}]}},"required":["tags"]},"example":{"tags":["frontend"]}}}},"parameters":[{"name":"firewall_id","description":"A unique ID that can be used to identify and reference a firewall.","in":"path","schema":{"type":"string","format":"uuid"},"example":"bb4b2611-3d72-467b-8602-280330ecd65c","required":true,"x-ref":"#/components/parameters/firewall_id","index$":0}]},"POST /v2/firewalls":{"protocol":"http","requestBody":{"content":{"application/json":{"schema":{"allOf":[{"type":"object","allOf":[{"properties":{"id":{},"status":{},"created_at":{},"pending_changes":{},"name":{},"droplet_ids":{},"tags":{}}},{"type":"object","properties":{"inbound_rules":{},"outbound_rules":{}},"x-ref":"#/components/schemas/firewall_rules"}],"x-ref":"#/components/schemas/firewall"},{"required":["name"]},{"anyOf":[{"title":"Inbound Rules","required":["inbound_rules"]},{"title":"Outbound Rules","required":["outbound_rules"]}]}],"index$":1},"example":{"name":"firewall","inbound_rules":[{"protocol":"tcp","ports":"80","action":"allow","sources":{"load_balancer_uids":["4de7ac8b-495b-4884-9a69-1050c6793cd6"]}},{"protocol":"tcp","ports":"22","action":"allow","sources":{"tags":["gateway"],"addresses":["18.0.0.0/8"]}}],"outbound_rules":[{"protocol":"tcp","ports":"80","action":"allow","destinations":{"addresses":["0.0.0.0/0","::/0"]}}],"droplet_ids":[8043964]}}}},"parameters":[]},"GET /v2/firewalls":{"protocol":"http","parameters":[{"in":"query","name":"per_page","required":false,"description":"Number of items returned per page","schema":{"type":"integer","minimum":1,"default":20,"maximum":200},"example":2,"x-ref":"#/components/parameters/parameters_per_page","index$":0},{"in":"query","name":"page","required":false,"description":"Which 'page' of paginated results to return.","schema":{"type":"integer","minimum":1,"default":1},"example":1,"x-ref":"#/components/parameters/page","index$":1}]},"GET /v2/firewalls/{firewall_id}":{"protocol":"http","parameters":[{"name":"firewall_id","description":"A unique ID that can be used to identify and reference a firewall.","in":"path","schema":{"type":"string","format":"uuid"},"example":"bb4b2611-3d72-467b-8602-280330ecd65c","required":true,"x-ref":"#/components/parameters/firewall_id","index$":0}]},"DELETE /v2/firewalls/{firewall_id}":{"protocol":"http","parameters":[{"name":"firewall_id","description":"A unique ID that can be used to identify and reference a firewall.","in":"path","schema":{"type":"string","format":"uuid"},"example":"bb4b2611-3d72-467b-8602-280330ecd65c","required":true,"x-ref":"#/components/parameters/firewall_id","index$":0}]},"DELETE /v2/firewalls/{firewall_id}/droplets":{"protocol":"http","requestBody":{"content":{"application/json":{"schema":{"properties":{"droplet_ids":{"type":"array","description":"An array containing the IDs of the Droplets to be removed from the firewall.","items":{"type":"integer"},"example":[49696269]}},"required":["droplet_ids"]},"example":{"droplet_ids":[49696269]}}}},"parameters":[{"name":"firewall_id","description":"A unique ID that can be used to identify and reference a firewall.","in":"path","schema":{"type":"string","format":"uuid"},"example":"bb4b2611-3d72-467b-8602-280330ecd65c","required":true,"x-ref":"#/components/parameters/firewall_id","index$":0}]},"DELETE /v2/firewalls/{firewall_id}/rules":{"protocol":"http","requestBody":{"content":{"application/json":{"schema":{"allOf":[{"type":"object","properties":{"inbound_rules":{"nullable":true,"type":"array","items":{"allOf":[]},"key$":"inbound_rules"},"outbound_rules":{"nullable":true,"type":"array","items":{"allOf":[]},"key$":"outbound_rules"}},"x-ref":"#/components/schemas/firewall_rules"},{"anyOf":[{"title":"Inbound Rules","required":["inbound_rules"]},{"title":"Outbound Rules","required":["outbound_rules"]}]}]},"example":{"inbound_rules":[{"protocol":"tcp","ports":"3306","action":"allow","sources":{"droplet_ids":[49696269]}}],"outbound_rules":[{"protocol":"tcp","ports":"3306","action":"allow","destinations":{"droplet_ids":[49696269]}}]}}}},"parameters":[{"name":"firewall_id","description":"A unique ID that can be used to identify and reference a firewall.","in":"path","schema":{"type":"string","format":"uuid"},"example":"bb4b2611-3d72-467b-8602-280330ecd65c","required":true,"x-ref":"#/components/parameters/firewall_id","index$":0}]},"DELETE /v2/firewalls/{firewall_id}/tags":{"protocol":"http","requestBody":{"content":{"application/json":{"schema":{"properties":{"tags":{"allOf":[{"type":"array","items":{"type":"string"},"nullable":true,"description":"A flat array of tag names as strings to be applied to the resource. Tag names must exist in order to be referenced in a request. <br><br>Requires `tag:create` and `tag:read` scopes.","example":["base-image","prod"],"x-ref":"#/components/schemas/existing_tags_array"},{"description":"An array containing the names of the Tags to be removed from the firewall."}]}},"required":["tags"]},"example":{"tags":["frontend"]}}}},"parameters":[{"name":"firewall_id","description":"A unique ID that can be used to identify and reference a firewall.","in":"path","schema":{"type":"string","format":"uuid"},"example":"bb4b2611-3d72-467b-8602-280330ecd65c","required":true,"x-ref":"#/components/parameters/firewall_id","index$":0}]},"PUT /v2/firewalls/{firewall_id}":{"protocol":"http","requestBody":{"content":{"application/json":{"schema":{"required":["name"],"allOf":[{"type":"object","allOf":[{"properties":{"id":{},"status":{},"created_at":{},"pending_changes":{},"name":{},"droplet_ids":{},"tags":{}}},{"type":"object","properties":{"inbound_rules":{},"outbound_rules":{}},"x-ref":"#/components/schemas/firewall_rules"}],"x-ref":"#/components/schemas/firewall"},{"anyOf":[{"title":"Inbound Rules","required":["inbound_rules"]},{"title":"Outbound Rules","required":["outbound_rules"]}]}],"index$":1},"example":{"name":"frontend-firewall","inbound_rules":[{"protocol":"tcp","ports":"8080","action":"allow","sources":{"load_balancer_uids":["4de7ac8b-495b-4884-9a69-1050c6793cd6"]}},{"protocol":"tcp","ports":"22","action":"allow","sources":{"tags":["gateway"],"addresses":["18.0.0.0/8"]}}],"outbound_rules":[{"protocol":"tcp","ports":"8080","action":"allow","destinations":{"addresses":["0.0.0.0/0","::/0"]}}],"droplet_ids":[8043964],"tags":["frontend"]}}}},"parameters":[{"name":"firewall_id","description":"A unique ID that can be used to identify and reference a firewall.","in":"path","schema":{"type":"string","format":"uuid"},"example":"bb4b2611-3d72-467b-8602-280330ecd65c","required":true,"x-ref":"#/components/parameters/firewall_id","index$":0}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const firewall_ref01_ent = client.Firewall()
    let firewall_ref01_data = setup.data.new.firewall['firewall_ref01']

    firewall_ref01_data = (await firewall_ref01_ent.create(firewall_ref01_data)).data()
    assert(null != firewall_ref01_data.id)


    // LIST
    const firewall_ref01_match: any = {}

    const firewall_ref01_list = (await firewall_ref01_ent.list(firewall_ref01_match)).map((e: any) => e.data())

    assert(!isempty(select(firewall_ref01_list, { id: firewall_ref01_data.id })))


    // UPDATE
    const firewall_ref01_data_up0: any = {}
    firewall_ref01_data_up0.id = firewall_ref01_data.id

    const firewall_ref01_markdef_up0 = { name: 'name', value: 'Mark01-firewall_ref01_' + setup.now }
    ;(firewall_ref01_data_up0 as any)[firewall_ref01_markdef_up0.name] = firewall_ref01_markdef_up0.value

    const firewall_ref01_resdata_up0 = (await firewall_ref01_ent.update(firewall_ref01_data_up0)).data()
    assert(firewall_ref01_resdata_up0.id === firewall_ref01_data_up0.id)

    assert((firewall_ref01_resdata_up0 as any)[firewall_ref01_markdef_up0.name] === firewall_ref01_markdef_up0.value)


    // LOAD
    const firewall_ref01_match_dt0: any = {}
    firewall_ref01_match_dt0.id = firewall_ref01_data.id
    const firewall_ref01_data_dt0 = (await firewall_ref01_ent.load(firewall_ref01_match_dt0)).data()
    assert(firewall_ref01_data_dt0.id === firewall_ref01_data.id)


    // REMOVE
    const firewall_ref01_match_rm0: any = { id: firewall_ref01_data.id }
    await firewall_ref01_ent.remove(firewall_ref01_match_rm0)
  

    // LIST
    const firewall_ref01_match_rt0: any = {}

    const firewall_ref01_list_rt0 = (await firewall_ref01_ent.list(firewall_ref01_match_rt0)).map((e: any) => e.data())

    assert(isempty(select(firewall_ref01_list_rt0, { id: firewall_ref01_data.id })))


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
      '../../../../.sdk/test/entity/firewall/FirewallTestData.json')

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
    ['firewall01','firewall02','firewall03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'DIGITALOCEAN_TEST_FIREWALL_ENTID': idmap,
    'DIGITALOCEAN_TEST_LIVE': 'FALSE',
    'DIGITALOCEAN_TEST_EXPLAIN': 'FALSE',
    'DIGITALOCEAN_APIKEY': '',
  })

  idmap = env['DIGITALOCEAN_TEST_FIREWALL_ENTID']

  const live = 'TRUE' === env.DIGITALOCEAN_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['DIGITALOCEAN_TEST_FIREWALL_ENTID']
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
  
