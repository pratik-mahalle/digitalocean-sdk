

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


describe('CredentialEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when DIGITALOCEAN_TEST_LIVE=TRUE.
  afterEach(liveDelay('DIGITALOCEAN_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = DigitaloceanSDK.test()
    const ent = testsdk.Credential()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = DigitaloceanSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.Credential().load({"cluster_id":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.DIGITALOCEAN_TEST_LIVE
    for (const op of []) {
      if (!live && maybeSkipControl(t, 'entityOp', 'credential.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"certificate_authority_data":{"a":true,"fo":"byte","h":"Certificate Authority Data","n":"certificate_authority_data","r":false,"sh":"A base64 encoding of bytes representing the certificate authority data for accessing the cluster.","t":"`$STRING`","key$":"certificate_authority_data","index$":0},"client_certificate_data":{"a":true,"de":true,"fo":"byte","h":"Client Certificate Data","n":"client_certificate_data","r":false,"sh":"A base64 encoding of bytes representing the x509 client certificate data for access the cluster.","t":"`$STRING`","key$":"client_certificate_data","index$":1},"client_key_data":{"a":true,"de":true,"fo":"byte","h":"Client Key Data","n":"client_key_data","r":false,"sh":"A base64 encoding of bytes representing the x509 client key data for access the cluster.","t":"`$STRING`","key$":"client_key_data","index$":2},"expires_at":{"a":true,"fo":"date-time","h":"Expires At","n":"expires_at","r":false,"sh":"A time value given in ISO8601 combined date and time format that represents when the access token expires.","t":"`$STRING`","key$":"expires_at","index$":3},"server":{"a":true,"fo":"uri","h":"Server","n":"server","r":false,"sh":"The URL used to access the cluster API server.","t":"`$STRING`","key$":"server","index$":4},"token":{"a":true,"h":"Token","n":"token","r":false,"sh":"An access token used to authenticate with the cluster.","t":"`$STRING`","key$":"token","index$":5}},"name":"credential","op":{"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /v2/kubernetes/clusters/{cluster_id}/credentials","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":"bd5f5959-5e1e-4205-a714-a914373942af","k":"param","n":"cluster_id","or":"cluster_id","r":true,"t":"`$STRING`","index$":0}],"query":[{"a":true,"ex":300,"k":"query","n":"expiry_second","or":"expiry_seconds","r":false,"t":"`$INTEGER`","index$":0}]},"k":"http","m":"GET","o":"/v2/kubernetes/clusters/{cluster_id}/credentials","q":{"exist":["cluster_id"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v2"},{"lit":"kubernetes"},{"lit":"clusters"},{"var":"cluster_id"},{"lit":"credentials"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"credential","name__orig":"credential","Name":"Credential","name_":"credential","name-":"credential","NAME":"CREDENTIAL","index$":136}, {"active":true,"entity":"credential","key$":"BasicCredentialFlow","kind":"basic","name":"BasicCredentialFlow","param":{},"step":[{"a":false,"d":{},"i":{"ref":"credential_ref01","srcdatavar":"credential_ref01_data","suffix":"_dt0"},"m":{"id":"credential01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-credential_ref01"}}],"unreachable":true}]}, 'Credential', {"GET /v2/kubernetes/clusters/{cluster_id}/credentials":{"protocol":"http","parameters":[{"in":"path","name":"cluster_id","description":"A unique ID that can be used to reference a Kubernetes cluster.","required":true,"schema":{"type":"string","format":"uuid","minimum":1},"example":"bd5f5959-5e1e-4205-a714-a914373942af","x-ref":"#/components/parameters/kubernetes_cluster_id","index$":0},{"in":"query","name":"expiry_seconds","required":false,"description":"The duration in seconds that the returned Kubernetes credentials will be valid. If not set or 0, the credentials will have a 7 day expiry.","schema":{"type":"integer","minimum":0,"default":0},"example":300,"x-ref":"#/components/parameters/kubernetes_expiry_seconds","index$":1}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let credential_ref01_data = Object.values(setup.data.existing.credential)[0] as any

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
      '../../../../.sdk/test/entity/credential/CredentialTestData.json')

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
    ['credential01','credential02','credential03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'DIGITALOCEAN_TEST_CREDENTIAL_ENTID': idmap,
    'DIGITALOCEAN_TEST_LIVE': 'FALSE',
    'DIGITALOCEAN_TEST_EXPLAIN': 'FALSE',
    'DIGITALOCEAN_APIKEY': '',
  })

  idmap = env['DIGITALOCEAN_TEST_CREDENTIAL_ENTID']

  const live = 'TRUE' === env.DIGITALOCEAN_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['DIGITALOCEAN_TEST_CREDENTIAL_ENTID']
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
  
