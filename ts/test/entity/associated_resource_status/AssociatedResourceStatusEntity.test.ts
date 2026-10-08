

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


describe('AssociatedResourceStatusEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when DIGITALOCEAN_TEST_LIVE=TRUE.
  afterEach(liveDelay('DIGITALOCEAN_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = DigitaloceanSDK.test()
    const ent = testsdk.AssociatedResourceStatus()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = DigitaloceanSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.AssociatedResourceStatus().load({"droplet_id":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.DIGITALOCEAN_TEST_LIVE
    for (const op of []) {
      if (!live && maybeSkipControl(t, 'entityOp', 'associated_resource_status.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"completed_at":{"a":true,"fo":"date-time","h":"Completed At","n":"completed_at","r":false,"sh":"A time value given in ISO8601 combined date and time format indicating when the requested action was completed.","t":"`$STRING`","key$":"completed_at","index$":0},"droplet":{"a":true,"h":"Droplet","n":"droplet","r":false,"sh":"An object containing information about a resource scheduled for deletion.","t":"`$OBJECT`","key$":"droplet","index$":1},"failures":{"a":true,"h":"Failures","n":"failures","r":false,"sh":"A count of the associated resources that failed to be destroyed, if any.","t":"`$INTEGER`","key$":"failures","index$":2},"resources":{"a":true,"h":"Resources","n":"resources","r":false,"sh":"An object containing additional information about resource related to a Droplet requested to be destroyed.","t":"`$OBJECT`","key$":"resources","index$":3}},"name":"associated_resource_status","op":{"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /v2/droplets/{droplet_id}/destroy_with_associated_resources/status","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":3164444,"k":"param","n":"droplet_id","or":"droplet_id","r":true,"t":"`$INTEGER`","index$":0}]},"k":"http","m":"GET","o":"/v2/droplets/{droplet_id}/destroy_with_associated_resources/status","q":{"exist":["droplet_id"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v2"},{"lit":"droplets"},{"var":"droplet_id"},{"lit":"destroy_with_associated_resources"},{"lit":"status"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[["$.main.kit.entity.droplet"]]},"key$":"associated_resource_status","name__orig":"associated_resource_status","Name":"AssociatedResourceStatus","name_":"associated_resource_status","name-":"associated-resource-status","NAME":"ASSOCIATED_RESOURCE_STATUS","index$":115}, {"active":true,"entity":"associated_resource_status","key$":"BasicAssociatedResourceStatusFlow","kind":"basic","name":"BasicAssociatedResourceStatusFlow","param":{},"step":[{"a":false,"d":{},"i":{"ref":"associated_resource_status_ref01","srcdatavar":"associated_resource_status_ref01_data","suffix":"_dt0"},"m":{"id":"associated_resource_status01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-associated_resource_status_ref01"}}],"unreachable":true}]}, 'AssociatedResourceStatus', {"GET /v2/droplets/{droplet_id}/destroy_with_associated_resources/status":{"protocol":"http","parameters":[{"in":"path","name":"droplet_id","description":"A unique identifier for a Droplet instance.","required":true,"schema":{"type":"integer","minimum":1},"example":3164444,"x-ref":"#/components/parameters/droplet_id","index$":0}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let associated_resource_status_ref01_data = Object.values(setup.data.existing.associated_resource_status)[0] as any

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
      '../../../../.sdk/test/entity/associated_resource_status/AssociatedResourceStatusTestData.json')

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
    ['associated_resource_status01','associated_resource_status02','associated_resource_status03','droplet01','droplet02','droplet03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'DIGITALOCEAN_TEST_ASSOCIATED_RESOURCE_STATUS_ENTID': idmap,
    'DIGITALOCEAN_TEST_LIVE': 'FALSE',
    'DIGITALOCEAN_TEST_EXPLAIN': 'FALSE',
    'DIGITALOCEAN_APIKEY': '',
  })

  idmap = env['DIGITALOCEAN_TEST_ASSOCIATED_RESOURCE_STATUS_ENTID']

  const live = 'TRUE' === env.DIGITALOCEAN_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['DIGITALOCEAN_TEST_ASSOCIATED_RESOURCE_STATUS_ENTID']
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
  
