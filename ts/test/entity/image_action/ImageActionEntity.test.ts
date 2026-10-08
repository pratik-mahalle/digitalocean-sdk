

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


describe('ImageActionEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when DIGITALOCEAN_TEST_LIVE=TRUE.
  afterEach(liveDelay('DIGITALOCEAN_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = DigitaloceanSDK.test()
    const ent = testsdk.ImageAction()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = DigitaloceanSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.ImageAction().list({"id":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.DIGITALOCEAN_TEST_LIVE
    for (const op of []) {
      if (!live && maybeSkipControl(t, 'entityOp', 'image_action.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"completed_at":{"a":true,"fo":"date-time","h":"Completed At","n":"completed_at","r":false,"sh":"A time value given in ISO8601 combined date and time format that represents when the action was completed.","t":"`$STRING`","key$":"completed_at","index$":0},"id":{"a":true,"h":"Id","n":"id","r":false,"sh":"A unique numeric ID that can be used to identify and reference an action.","t":"`$INTEGER`","key$":"id","index$":1},"region":{"a":true,"h":"Region","n":"region","r":true,"t":"`$OBJECT`","key$":"region","index$":2},"region_slug":{"a":true,"h":"Region Slug","n":"region_slug","r":false,"sh":"A human-readable string that is used as a unique identifier for each region.","t":"`$STRING`","key$":"region_slug","index$":3},"resource_id":{"a":true,"h":"Resource Id","n":"resource_id","r":false,"sh":"A unique identifier for the resource that the action is associated with.","t":"`$INTEGER`","key$":"resource_id","index$":4},"resource_type":{"a":true,"h":"Resource Type","n":"resource_type","r":false,"sh":"The type of resource that the action is associated with.","t":"`$STRING`","key$":"resource_type","index$":5},"started_at":{"a":true,"fo":"date-time","h":"Started At","n":"started_at","r":false,"sh":"A time value given in ISO8601 combined date and time format that represents when the action was initiated.","t":"`$STRING`","key$":"started_at","index$":6},"status":{"a":true,"h":"Status","n":"status","r":false,"sh":"The current status of the action.","t":"`$STRING`","key$":"status","index$":7},"type":{"a":true,"h":"Type","n":"type","r":false,"sh":"This is the type of action that the object represents.","t":"`$STRING`","key$":"type","index$":8}},"id":{"field":"id","name":"id"},"name":"image_action","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /v2/images/{image_id}/actions","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":62137902,"k":"param","n":"id","or":"image_id","r":true,"t":"`$INTEGER`","index$":0}]},"k":"http","m":"GET","o":"/v2/images/{image_id}/actions","q":{"exist":["id"]},"r":{"param":{"image_id":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v2"},{"lit":"images"},{"var":"id"},{"lit":"actions"}],"t":{"req":"`reqdata`","res":"`body.actions`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"image_action","name__orig":"image_action","Name":"ImageAction","name_":"image_action","name-":"image-action","NAME":"IMAGE_ACTION","index$":158}, {"active":true,"entity":"image_action","key$":"BasicImageActionFlow","kind":"basic","name":"BasicImageActionFlow","param":{},"step":[{"a":false,"d":{},"i":{},"m":{"image_id":"image01"},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"image_action_ref01"}}],"unreachable":true}]}, 'ImageAction', {"GET /v2/images/{image_id}/actions":{"protocol":"http","parameters":[{"in":"path","name":"image_id","description":"A unique number that can be used to identify and reference a specific image.","required":true,"schema":{"type":"integer"},"example":62137902,"x-ref":"#/components/parameters/image_id","index$":0}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let image_action_ref01_data = Object.values(setup.data.existing.image_action)[0] as any

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
      '../../../../.sdk/test/entity/image_action/ImageActionTestData.json')

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
    ['image_action01','image_action02','image_action03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'DIGITALOCEAN_TEST_IMAGE_ACTION_ENTID': idmap,
    'DIGITALOCEAN_TEST_LIVE': 'FALSE',
    'DIGITALOCEAN_TEST_EXPLAIN': 'FALSE',
    'DIGITALOCEAN_APIKEY': '',
  })

  idmap = env['DIGITALOCEAN_TEST_IMAGE_ACTION_ENTID']

  const live = 'TRUE' === env.DIGITALOCEAN_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['DIGITALOCEAN_TEST_IMAGE_ACTION_ENTID']
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
  
