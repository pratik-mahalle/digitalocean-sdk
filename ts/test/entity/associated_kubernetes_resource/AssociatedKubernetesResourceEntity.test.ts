

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


describe('AssociatedKubernetesResourceEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when DIGITALOCEAN_TEST_LIVE=TRUE.
  afterEach(liveDelay('DIGITALOCEAN_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = DigitaloceanSDK.test()
    const ent = testsdk.AssociatedKubernetesResource()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = DigitaloceanSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.AssociatedKubernetesResource().list({"cluster_id":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.DIGITALOCEAN_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'associated_kubernetes_resource.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"load_balancers":{"a":true,"h":"Load Balancers","n":"load_balancers","r":false,"sh":"A list of names and IDs for associated load balancers that can be destroyed along with the cluster.","t":"`$ARRAY`","key$":"load_balancers","index$":0},"volume_snapshots":{"a":true,"h":"Volume Snapshots","n":"volume_snapshots","r":false,"sh":"A list of names and IDs for associated volume snapshots that can be destroyed along with the cluster.","t":"`$ARRAY`","key$":"volume_snapshots","index$":1},"volumes":{"a":true,"h":"Volumes","n":"volumes","r":false,"sh":"A list of names and IDs for associated volumes that can be destroyed along with the cluster.","t":"`$ARRAY`","key$":"volumes","index$":2}},"name":"associated_kubernetes_resource","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /v2/kubernetes/clusters/{cluster_id}/destroy_with_associated_resources","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":"bd5f5959-5e1e-4205-a714-a914373942af","k":"param","n":"cluster_id","or":"cluster_id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/v2/kubernetes/clusters/{cluster_id}/destroy_with_associated_resources","q":{"exist":["cluster_id"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v2"},{"lit":"kubernetes"},{"lit":"clusters"},{"var":"cluster_id"},{"lit":"destroy_with_associated_resources"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"associated_kubernetes_resource","name__orig":"associated_kubernetes_resource","Name":"AssociatedKubernetesResource","name_":"associated_kubernetes_resource","name-":"associated-kubernetes-resource","NAME":"ASSOCIATED_KUBERNETES_RESOURCE","index$":116}, {"active":true,"entity":"associated_kubernetes_resource","key$":"BasicAssociatedKubernetesResourceFlow","kind":"basic","name":"BasicAssociatedKubernetesResourceFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{"cluster_id":"cluster01"},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"associated_kubernetes_resource_ref01"}}],"index$":0}]}, 'AssociatedKubernetesResource', {"GET /v2/kubernetes/clusters/{cluster_id}/destroy_with_associated_resources":{"protocol":"http","parameters":[{"in":"path","name":"cluster_id","description":"A unique ID that can be used to reference a Kubernetes cluster.","required":true,"schema":{"type":"string","format":"uuid","minimum":1},"example":"bd5f5959-5e1e-4205-a714-a914373942af","x-ref":"#/components/parameters/kubernetes_cluster_id","index$":0}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let associated_kubernetes_resource_ref01_data = Object.values(setup.data.existing.associated_kubernetes_resource)[0] as any

    // LIST
    const associated_kubernetes_resource_ref01_ent = client.AssociatedKubernetesResource()
    const associated_kubernetes_resource_ref01_match: any = {}
    associated_kubernetes_resource_ref01_match['cluster_id'] = setup.idmap['cluster01']

    const associated_kubernetes_resource_ref01_list = (await associated_kubernetes_resource_ref01_ent.list(associated_kubernetes_resource_ref01_match)).map((e: any) => e.data())


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
      '../../../../.sdk/test/entity/associated_kubernetes_resource/AssociatedKubernetesResourceTestData.json')

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
    ['associated_kubernetes_resource01','associated_kubernetes_resource02','associated_kubernetes_resource03','cluster01'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'DIGITALOCEAN_TEST_ASSOCIATED_KUBERNETES_RESOURCE_ENTID': idmap,
    'DIGITALOCEAN_TEST_LIVE': 'FALSE',
    'DIGITALOCEAN_TEST_EXPLAIN': 'FALSE',
    'DIGITALOCEAN_APIKEY': '',
  })

  idmap = env['DIGITALOCEAN_TEST_ASSOCIATED_KUBERNETES_RESOURCE_ENTID']

  const live = 'TRUE' === env.DIGITALOCEAN_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['DIGITALOCEAN_TEST_ASSOCIATED_KUBERNETES_RESOURCE_ENTID']
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
  
