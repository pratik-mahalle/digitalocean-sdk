

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


describe('DropletActionEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when DIGITALOCEAN_TEST_LIVE=TRUE.
  afterEach(liveDelay('DIGITALOCEAN_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = DigitaloceanSDK.test()
    const ent = testsdk.DropletAction()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = DigitaloceanSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.DropletAction().list({"id":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.DIGITALOCEAN_TEST_LIVE
    for (const op of ['create', 'list', 'load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'droplet_action.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"completed_at":{"a":true,"fo":"date-time","h":"Completed At","n":"completed_at","r":false,"sh":"A time value given in ISO8601 combined date and time format that represents when the action was completed.","t":"`$STRING`","key$":"completed_at","index$":0},"id":{"a":true,"h":"Id","n":"id","r":false,"sh":"A unique numeric ID that can be used to identify and reference an action.","t":"`$INTEGER`","key$":"id","index$":1},"region":{"a":true,"h":"Region","n":"region","r":true,"t":"`$OBJECT`","key$":"region","index$":2},"region_slug":{"a":true,"h":"Region Slug","n":"region_slug","r":false,"sh":"A human-readable string that is used as a unique identifier for each region.","t":"`$STRING`","key$":"region_slug","index$":3},"resource_id":{"a":true,"h":"Resource Id","n":"resource_id","r":false,"sh":"A unique identifier for the resource that the action is associated with.","t":"`$INTEGER`","key$":"resource_id","index$":4},"resource_type":{"a":true,"h":"Resource Type","n":"resource_type","r":false,"sh":"The type of resource that the action is associated with.","t":"`$STRING`","key$":"resource_type","index$":5},"started_at":{"a":true,"fo":"date-time","h":"Started At","n":"started_at","r":false,"sh":"A time value given in ISO8601 combined date and time format that represents when the action was initiated.","t":"`$STRING`","key$":"started_at","index$":6},"status":{"a":true,"h":"Status","n":"status","r":false,"sh":"The current status of the action.","t":"`$STRING`","key$":"status","index$":7},"type":{"a":true,"h":"Type","n":"type","r":false,"sh":"This is the type of action that the object represents.","t":"`$STRING`","key$":"type","index$":8}},"id":{"field":"id","name":"id"},"name":"droplet_action","op":{"create":{"input":"data","name":"create","points":[{"a":true,"co":{"id":"POST /v2/droplets/{droplet_id}/actions","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":3164444,"k":"param","n":"id","or":"droplet_id","r":true,"t":"`$INTEGER`","index$":0}]},"k":"http","m":"POST","o":"/v2/droplets/{droplet_id}/actions","q":{"exist":["id"]},"r":{"param":{"droplet_id":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v2"},{"lit":"droplets"},{"var":"id"},{"lit":"actions"}],"t":{"req":"`reqdata`","res":"`body.action`"},"index$":0},{"a":true,"co":{"id":"POST /v2/droplets/actions","source":"openapi3","version":2},"g":{"query":[{"a":true,"ex":"env:prod","k":"query","n":"tag_name","or":"tag_name","r":false,"t":"`$STRING`","index$":0}]},"k":"http","m":"POST","o":"/v2/droplets/actions","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v2"},{"lit":"droplets"},{"lit":"actions"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":1}],"key$":"create"},"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /v2/droplets/{droplet_id}/actions","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":3164444,"k":"param","n":"id","or":"droplet_id","r":true,"t":"`$INTEGER`","index$":0}],"query":[{"a":true,"ex":1,"k":"query","n":"page","or":"page","r":false,"t":"`$INTEGER`","index$":0},{"a":true,"ex":2,"k":"query","n":"per_page","or":"per_page","r":false,"t":"`$INTEGER`","index$":1}]},"k":"http","m":"GET","o":"/v2/droplets/{droplet_id}/actions","q":{"exist":["id"]},"r":{"param":{"droplet_id":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v2"},{"lit":"droplets"},{"var":"id"},{"lit":"actions"}],"t":{"req":"`reqdata`","res":"`body.actions`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /v2/droplets/{droplet_id}/actions/{action_id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":3164444,"k":"param","n":"droplet_id","or":"droplet_id","r":true,"t":"`$INTEGER`","index$":0},{"a":true,"ex":36804636,"k":"param","n":"id","or":"action_id","r":true,"t":"`$INTEGER`","index$":1}]},"k":"http","m":"GET","o":"/v2/droplets/{droplet_id}/actions/{action_id}","q":{"exist":["droplet_id","id"]},"r":{"param":{"action_id":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v2"},{"lit":"droplets"},{"var":"droplet_id"},{"lit":"actions"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body.action`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[["$.main.kit.entity.droplet"]]},"key$":"droplet_action","name__orig":"droplet_action","Name":"DropletAction","name_":"droplet_action","name-":"droplet-action","NAME":"DROPLET_ACTION","index$":144}, {"active":true,"entity":"droplet_action","key$":"BasicDropletActionFlow","kind":"basic","name":"BasicDropletActionFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"droplet_action_ref01"},"m":{"droplet_id":"droplet01"},"o":"create","s":[],"v":[],"index$":0},{"a":true,"d":{},"i":{},"m":{"droplet_id":"droplet01"},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"droplet_action_ref01"}}],"index$":1},{"a":true,"d":{},"i":{"ref":"droplet_action_ref01","srcdatavar":"droplet_action_ref01_data","suffix":"_dt0"},"m":{"droplet_id":"droplet01","id":"droplet_action01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-droplet_action_ref01"}}],"index$":2}]}, 'DropletAction', {"POST /v2/droplets/{droplet_id}/actions":{"protocol":"http","requestBody":{"description":"The `type` attribute set in the request body will specify the  action that\nwill be taken on the Droplet. Some actions will require additional\nattributes to be set as well.\n","content":{"application/json":{"schema":{"anyOf":[{"required":["type"],"type":"object","description":"Specifies the action that will be taken on the Droplet.","properties":{"type":{"type":"string","enum":["enable_backups","disable_backups","reboot","power_cycle","shutdown","power_off","power_on","restore","password_reset","resize","rebuild","rename","change_kernel","enable_ipv6","snapshot"],"example":"reboot","description":"The type of action to initiate for the Droplet."}},"x-ref":"#/components/schemas/droplet_action"},{"allOf":[{"required":["type"],"type":"object","description":"Specifies the action that will be taken on the Droplet.","properties":{"type":{}},"x-ref":"#/components/schemas/droplet_action"},{"type":"object","properties":{"backup_policy":{}}}],"example":{"type":"enable_backups","backup_policy":{"plan":"daily","hour":20}},"x-ref":"#/components/schemas/droplet_action_enable_backups"},{"allOf":[{"required":["type"],"type":"object","description":"Specifies the action that will be taken on the Droplet.","properties":{"type":{}},"x-ref":"#/components/schemas/droplet_action"},{"type":"object","properties":{"backup_policy":{}}}],"required":["backup_policy"],"example":{"type":"enable_backups","backup_policy":{"plan":"weekly","day":"SUN","hour":20}},"x-ref":"#/components/schemas/droplet_action_change_backup_policy"},{"allOf":[{"required":["type"],"type":"object","description":"Specifies the action that will be taken on the Droplet.","properties":{"type":{}},"x-ref":"#/components/schemas/droplet_action"},{"type":"object","properties":{"image":{}}}],"x-ref":"#/components/schemas/droplet_action_restore"},{"allOf":[{"required":["type"],"type":"object","description":"Specifies the action that will be taken on the Droplet.","properties":{"type":{}},"x-ref":"#/components/schemas/droplet_action"},{"type":"object","properties":{"disk":{},"size":{}}}],"x-ref":"#/components/schemas/droplet_action_resize"},{"allOf":[{"required":["type"],"type":"object","description":"Specifies the action that will be taken on the Droplet.","properties":{"type":{}},"x-ref":"#/components/schemas/droplet_action"},{"type":"object","properties":{"image":{}}}],"x-ref":"#/components/schemas/droplet_action_rebuild"},{"allOf":[{"required":["type"],"type":"object","description":"Specifies the action that will be taken on the Droplet.","properties":{"type":{}},"x-ref":"#/components/schemas/droplet_action"},{"type":"object","properties":{"name":{}}}],"x-ref":"#/components/schemas/droplet_action_rename"},{"allOf":[{"required":["type"],"type":"object","description":"Specifies the action that will be taken on the Droplet.","properties":{"type":{}},"x-ref":"#/components/schemas/droplet_action"},{"type":"object","properties":{"kernel":{}}}],"x-ref":"#/components/schemas/droplet_action_change_kernel"},{"allOf":[{"required":["type"],"type":"object","description":"Specifies the action that will be taken on the Droplet.","properties":{"type":{}},"x-ref":"#/components/schemas/droplet_action"},{"type":"object","properties":{"name":{}}}],"x-ref":"#/components/schemas/droplet_action_snapshot"}],"discriminator":{"propertyName":"type","mapping":{"enable_backups":"#/components/schemas/droplet_action_enable_backups","disable_backups":"#/components/schemas/droplet_action","change_backup_policy":"#/components/schemas/droplet_action_change_backup_policy","reboot":"#/components/schemas/droplet_action","power_cycle":"#/components/schemas/droplet_action","shutdown":"#/components/schemas/droplet_action","power_off":"#/components/schemas/droplet_action","power_on":"#/components/schemas/droplet_action","password_reset":"#/components/schemas/droplet_action","restore":"#/components/schemas/droplet_action_restore","resize":"#/components/schemas/droplet_action_resize","rebuild":"#/components/schemas/droplet_action_rebuild","rename":"#/components/schemas/droplet_action_rename","change_kernel":"#/components/schemas/droplet_action_change_kernel","enable_ipv6":"#/components/schemas/droplet_action","snapshot":"#/components/schemas/droplet_action_snapshot"}},"index$":1}}}},"parameters":[{"in":"path","name":"droplet_id","description":"A unique identifier for a Droplet instance.","required":true,"schema":{"type":"integer","minimum":1},"example":3164444,"x-ref":"#/components/parameters/droplet_id","index$":0}]},"POST /v2/droplets/actions":{"protocol":"http","requestBody":{"description":"The `type` attribute set in the request body will specify the action that\nwill be taken on the Droplet. Some actions will require additional\nattributes to be set as well.\n","content":{"application/json":{"schema":{"oneOf":[{"required":["type"],"type":"object","description":"Specifies the action that will be taken on the Droplet.","properties":{"type":{"type":"string","enum":["enable_backups","disable_backups","reboot","power_cycle","shutdown","power_off","power_on","restore","password_reset","resize","rebuild","rename","change_kernel","enable_ipv6","snapshot"],"example":"reboot","description":"The type of action to initiate for the Droplet."}},"x-ref":"#/components/schemas/droplet_action"},{"allOf":[{"required":["type"],"type":"object","description":"Specifies the action that will be taken on the Droplet.","properties":{"type":{}},"x-ref":"#/components/schemas/droplet_action"},{"type":"object","properties":{"name":{}}}],"x-ref":"#/components/schemas/droplet_action_snapshot"}],"discriminator":{"propertyName":"type","mapping":{"enable_backups":"#/components/schemas/droplet_action","disable_backups":"#/components/schemas/droplet_action","power_cycle":"#/components/schemas/droplet_action","shutdown":"#/components/schemas/droplet_action","power_off":"#/components/schemas/droplet_action","power_on":"#/components/schemas/droplet_action","enable_ipv6":"#/components/schemas/droplet_action","snapshot":"#/components/schemas/droplet_action_snapshot"}},"index$":1}}}},"parameters":[{"in":"query","name":"tag_name","description":"Used to filter Droplets by a specific tag. Can not be combined with `name` or `type`.<br>Requires `tag:read` scope.","required":false,"schema":{"type":"string"},"example":"env:prod","x-ref":"#/components/parameters/droplet_tag_name","index$":0}]},"GET /v2/droplets/{droplet_id}/actions":{"protocol":"http","parameters":[{"in":"path","name":"droplet_id","description":"A unique identifier for a Droplet instance.","required":true,"schema":{"type":"integer","minimum":1},"example":3164444,"x-ref":"#/components/parameters/droplet_id","index$":0},{"in":"query","name":"per_page","required":false,"description":"Number of items returned per page","schema":{"type":"integer","minimum":1,"default":20,"maximum":200},"example":2,"x-ref":"#/components/parameters/parameters_per_page","index$":1},{"in":"query","name":"page","required":false,"description":"Which 'page' of paginated results to return.","schema":{"type":"integer","minimum":1,"default":1},"example":1,"x-ref":"#/components/parameters/page","index$":2}]},"GET /v2/droplets/{droplet_id}/actions/{action_id}":{"protocol":"http","parameters":[{"in":"path","name":"droplet_id","description":"A unique identifier for a Droplet instance.","required":true,"schema":{"type":"integer","minimum":1},"example":3164444,"x-ref":"#/components/parameters/droplet_id","index$":0},{"in":"path","name":"action_id","description":"A unique numeric ID that can be used to identify and reference an action.","required":true,"schema":{"type":"integer","minimum":1},"example":36804636,"x-ref":"#/components/parameters/action_id","index$":1}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const droplet_action_ref01_ent = client.DropletAction()
    let droplet_action_ref01_data = setup.data.new.droplet_action['droplet_action_ref01']
    droplet_action_ref01_data['droplet_id'] = setup.idmap['droplet01']

    droplet_action_ref01_data = (await droplet_action_ref01_ent.create(droplet_action_ref01_data)).data()
    assert(null != droplet_action_ref01_data.id)


    // LIST
    const droplet_action_ref01_match: any = {}
    droplet_action_ref01_match['droplet_id'] = setup.idmap['droplet01']

    const droplet_action_ref01_list = (await droplet_action_ref01_ent.list(droplet_action_ref01_match)).map((e: any) => e.data())

    assert(!isempty(select(droplet_action_ref01_list, { id: droplet_action_ref01_data.id })))


    // LOAD
    const droplet_action_ref01_match_dt0: any = {}
    droplet_action_ref01_match_dt0.id = droplet_action_ref01_data.id
    const droplet_action_ref01_data_dt0 = (await droplet_action_ref01_ent.load(droplet_action_ref01_match_dt0)).data()
    assert(droplet_action_ref01_data_dt0.id === droplet_action_ref01_data.id)


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
      '../../../../.sdk/test/entity/droplet_action/DropletActionTestData.json')

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
    ['droplet_action01','droplet_action02','droplet_action03','droplet01','droplet02','droplet03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'DIGITALOCEAN_TEST_DROPLET_ACTION_ENTID': idmap,
    'DIGITALOCEAN_TEST_LIVE': 'FALSE',
    'DIGITALOCEAN_TEST_EXPLAIN': 'FALSE',
    'DIGITALOCEAN_APIKEY': '',
  })

  idmap = env['DIGITALOCEAN_TEST_DROPLET_ACTION_ENTID']

  const live = 'TRUE' === env.DIGITALOCEAN_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['DIGITALOCEAN_TEST_DROPLET_ACTION_ENTID']
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
  
