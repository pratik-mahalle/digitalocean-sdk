

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


describe('N1ClickApplicationEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when DIGITALOCEAN_TEST_LIVE=TRUE.
  afterEach(liveDelay('DIGITALOCEAN_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = DigitaloceanSDK.test()
    const ent = testsdk.N1ClickApplication()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = DigitaloceanSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.N1ClickApplication().create({"addon_slugs":"x","cluster_uuid":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.DIGITALOCEAN_TEST_LIVE
    for (const op of ['create']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'n1_click_application.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"addon_slugs":{"a":true,"h":"Addon Slugs","n":"addon_slugs","r":true,"sh":"An array of 1-Click Application slugs to be installed to the Kubernetes cluster.","t":"`$ARRAY`","key$":"addon_slugs","index$":0},"cluster_uuid":{"a":true,"h":"Cluster Uuid","n":"cluster_uuid","r":true,"sh":"A unique ID for the Kubernetes cluster to which the 1-Click Applications will be installed.","t":"`$STRING`","key$":"cluster_uuid","index$":1},"message":{"a":true,"h":"Message","n":"message","r":false,"sh":"A message about the result of the request.","t":"`$STRING`","key$":"message","index$":2}},"name":"n1_click_application","op":{"create":{"input":"data","name":"create","points":[{"a":true,"co":{"id":"POST /v2/1-clicks/kubernetes","source":"openapi3","version":2},"g":{},"k":"http","m":"POST","o":"/v2/1-clicks/kubernetes","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v2"},{"lit":"1-clicks"},{"lit":"kubernetes"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"}},"relations":{"ancestors":[]},"key$":"n1_click_application","name__orig":"n1_click_application","Name":"N1ClickApplication","name_":"n1_click_application","name-":"n1-click-application","NAME":"N1_CLICK_APPLICATION","index$":181}, {"active":true,"entity":"n1_click_application","key$":"BasicN1ClickApplicationFlow","kind":"basic","name":"BasicN1ClickApplicationFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"n1_click_application_ref01"},"m":{},"o":"create","s":[],"v":[],"index$":0}]}, 'N1ClickApplication', {"POST /v2/1-clicks/kubernetes":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","properties":{"addon_slugs":{"title":"addon_slugs","type":"array","items":{"type":"string"},"example":["kube-state-metrics","loki"],"default":[],"description":"An array of 1-Click Application slugs to be installed to the Kubernetes cluster.","key$":"addon_slugs"},"cluster_uuid":{"title":"cluster_uuid","type":"string","example":"50a994b6-c303-438f-9495-7e896cfe6b08","description":"A unique ID for the Kubernetes cluster to which the 1-Click Applications will be installed.","key$":"cluster_uuid"}},"required":["addon_slugs","cluster_uuid"],"x-ref":"#/components/schemas/oneClicks_create","index$":1}}}},"parameters":[]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const n1_click_application_ref01_ent = client.N1ClickApplication()
    let n1_click_application_ref01_data = setup.data.new.n1_click_application['n1_click_application_ref01']

    n1_click_application_ref01_data = (await n1_click_application_ref01_ent.create(n1_click_application_ref01_data)).data()
    assert(null != n1_click_application_ref01_data)


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
      '../../../../.sdk/test/entity/n1_click_application/N1ClickApplicationTestData.json')

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
    ['n1_click_application01','n1_click_application02','n1_click_application03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'DIGITALOCEAN_TEST_N1_CLICK_APPLICATION_ENTID': idmap,
    'DIGITALOCEAN_TEST_LIVE': 'FALSE',
    'DIGITALOCEAN_TEST_EXPLAIN': 'FALSE',
    'DIGITALOCEAN_APIKEY': '',
  })

  idmap = env['DIGITALOCEAN_TEST_N1_CLICK_APPLICATION_ENTID']

  const live = 'TRUE' === env.DIGITALOCEAN_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['DIGITALOCEAN_TEST_N1_CLICK_APPLICATION_ENTID']
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
  
