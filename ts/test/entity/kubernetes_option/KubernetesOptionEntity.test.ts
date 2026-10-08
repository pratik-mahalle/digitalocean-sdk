

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


describe('KubernetesOptionEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when DIGITALOCEAN_TEST_LIVE=TRUE.
  afterEach(liveDelay('DIGITALOCEAN_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = DigitaloceanSDK.test()
    const ent = testsdk.KubernetesOption()
    assert(null != ent)
  })




  test('basic', async (t) => {

    const live = 'TRUE' === process.env.DIGITALOCEAN_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'kubernetes_option.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"regions":{"a":true,"h":"Regions","n":"regions","r":false,"t":"`$ARRAY`","key$":"regions","index$":0},"sizes":{"a":true,"h":"Sizes","n":"sizes","r":false,"t":"`$ARRAY`","key$":"sizes","index$":1},"versions":{"a":true,"h":"Versions","n":"versions","r":false,"t":"`$ARRAY`","key$":"versions","index$":2}},"name":"kubernetes_option","op":{"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /v2/kubernetes/options","source":"openapi3","version":2},"g":{},"k":"http","m":"GET","o":"/v2/kubernetes/options","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v2"},{"lit":"kubernetes"},{"lit":"options"}],"t":{"req":"`reqdata`","res":"`body.options`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"kubernetes_option","name__orig":"kubernetes_option","Name":"KubernetesOption","name_":"kubernetes_option","name-":"kubernetes-option","NAME":"KUBERNETES_OPTION","index$":158}, {"active":true,"entity":"kubernetes_option","key$":"BasicKubernetesOptionFlow","kind":"basic","name":"BasicKubernetesOptionFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"kubernetes_option_ref01","srcdatavar":"kubernetes_option_ref01_data","suffix":"_dt0"},"m":{},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-kubernetes_option_ref01"}}],"index$":0}]}, 'KubernetesOption', {"GET /v2/kubernetes/options":{"protocol":"http","parameters":[]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let kubernetes_option_ref01_data = Object.values(setup.data.existing.kubernetes_option)[0] as any

    // LOAD
    const kubernetes_option_ref01_ent = client.KubernetesOption()
    const kubernetes_option_ref01_match_dt0: any = {}
    const kubernetes_option_ref01_data_dt0 = (await kubernetes_option_ref01_ent.load(kubernetes_option_ref01_match_dt0)).data()
    assert(null != kubernetes_option_ref01_data_dt0)


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
      '../../../../.sdk/test/entity/kubernetes_option/KubernetesOptionTestData.json')

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
    ['kubernetes_option01','kubernetes_option02','kubernetes_option03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'DIGITALOCEAN_TEST_KUBERNETES_OPTION_ENTID': idmap,
    'DIGITALOCEAN_TEST_LIVE': 'FALSE',
    'DIGITALOCEAN_TEST_EXPLAIN': 'FALSE',
    'DIGITALOCEAN_APIKEY': '',
  })

  idmap = env['DIGITALOCEAN_TEST_KUBERNETES_OPTION_ENTID']

  const live = 'TRUE' === env.DIGITALOCEAN_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['DIGITALOCEAN_TEST_KUBERNETES_OPTION_ENTID']
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
  
