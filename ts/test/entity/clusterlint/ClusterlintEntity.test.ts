

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


describe('ClusterlintEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when DIGITALOCEAN_TEST_LIVE=TRUE.
  afterEach(liveDelay('DIGITALOCEAN_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = DigitaloceanSDK.test()
    const ent = testsdk.Clusterlint()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = DigitaloceanSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.Clusterlint().list({"cluster_id":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.DIGITALOCEAN_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'clusterlint.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"check_name":{"a":true,"h":"Check Name","n":"check_name","r":false,"sh":"The clusterlint check that resulted in the diagnostic.","t":"`$STRING`","key$":"check_name","index$":0},"message":{"a":true,"h":"Message","n":"message","r":false,"sh":"Feedback about the object for users to fix.","t":"`$STRING`","key$":"message","index$":1},"object":{"a":true,"h":"Object","n":"object","r":false,"sh":"Metadata about the Kubernetes API object the diagnostic is reported on.","t":"`$OBJECT`","key$":"object","index$":2},"severity":{"a":true,"h":"Severity","n":"severity","r":false,"sh":"Can be one of error, warning or suggestion.","t":"`$STRING`","key$":"severity","index$":3}},"name":"clusterlint","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /v2/kubernetes/clusters/{cluster_id}/clusterlint","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":"bd5f5959-5e1e-4205-a714-a914373942af","k":"param","n":"cluster_id","or":"cluster_id","r":true,"t":"`$STRING`","index$":0}],"query":[{"a":true,"ex":"50c2f44c-011d-493e-aee5-361a4a0d1844","k":"query","n":"run_id","or":"run_id","r":false,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/v2/kubernetes/clusters/{cluster_id}/clusterlint","q":{"exist":["cluster_id"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v2"},{"lit":"kubernetes"},{"lit":"clusters"},{"var":"cluster_id"},{"lit":"clusterlint"}],"t":{"req":"`reqdata`","res":"`body.diagnostics`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"clusterlint","name__orig":"clusterlint","Name":"Clusterlint","name_":"clusterlint","name-":"clusterlint","NAME":"CLUSTERLINT","index$":129}, {"active":true,"entity":"clusterlint","key$":"BasicClusterlintFlow","kind":"basic","name":"BasicClusterlintFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{"cluster_id":"cluster01"},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"clusterlint_ref01"}}],"index$":0}]}, 'Clusterlint', {"GET /v2/kubernetes/clusters/{cluster_id}/clusterlint":{"protocol":"http","parameters":[{"in":"path","name":"cluster_id","description":"A unique ID that can be used to reference a Kubernetes cluster.","required":true,"schema":{"type":"string","format":"uuid","minimum":1},"example":"bd5f5959-5e1e-4205-a714-a914373942af","x-ref":"#/components/parameters/kubernetes_cluster_id","index$":0},{"in":"query","name":"run_id","description":"Specifies the clusterlint run whose results will be retrieved.","required":false,"schema":{"type":"string","format":"uuid"},"example":"50c2f44c-011d-493e-aee5-361a4a0d1844","x-ref":"#/components/parameters/clusterlint_run_id","index$":1}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let clusterlint_ref01_data = Object.values(setup.data.existing.clusterlint)[0] as any

    // LIST
    const clusterlint_ref01_ent = client.Clusterlint()
    const clusterlint_ref01_match: any = {}
    clusterlint_ref01_match['cluster_id'] = setup.idmap['cluster01']

    const clusterlint_ref01_list = (await clusterlint_ref01_ent.list(clusterlint_ref01_match)).map((e: any) => e.data())


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
      '../../../../.sdk/test/entity/clusterlint/ClusterlintTestData.json')

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
    ['clusterlint01','clusterlint02','clusterlint03','cluster01'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'DIGITALOCEAN_TEST_CLUSTERLINT_ENTID': idmap,
    'DIGITALOCEAN_TEST_LIVE': 'FALSE',
    'DIGITALOCEAN_TEST_EXPLAIN': 'FALSE',
    'DIGITALOCEAN_APIKEY': '',
  })

  idmap = env['DIGITALOCEAN_TEST_CLUSTERLINT_ENTID']

  const live = 'TRUE' === env.DIGITALOCEAN_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['DIGITALOCEAN_TEST_CLUSTERLINT_ENTID']
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
  
