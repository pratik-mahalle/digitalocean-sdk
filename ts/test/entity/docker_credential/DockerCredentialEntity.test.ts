

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


describe('DockerCredentialEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when DIGITALOCEAN_TEST_LIVE=TRUE.
  afterEach(liveDelay('DIGITALOCEAN_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = DigitaloceanSDK.test()
    const ent = testsdk.DockerCredential()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = DigitaloceanSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.DockerCredential().load({"expiry_second":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.DIGITALOCEAN_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'docker_credential.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"registry_digitalocean_com":{"a":true,"h":"Registry Digitalocean Com","n":"registry_digitalocean_com","r":false,"t":"`$OBJECT`","key$":"registry_digitalocean_com","index$":0}},"name":"docker_credential","op":{"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /v2/registries/{registry_name}/docker-credentials","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":"example","k":"param","n":"registry_name","or":"registry_name","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/v2/registries/{registry_name}/docker-credentials","q":{"exist":["registry_name"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v2"},{"lit":"registries"},{"var":"registry_name"},{"lit":"docker-credentials"}],"t":{"req":"`reqdata`","res":"`body.auths`"},"index$":0},{"a":true,"co":{"id":"GET /v2/registry/docker-credentials","source":"openapi3","version":2},"g":{"query":[{"a":true,"ex":3600,"k":"query","n":"expiry_second","or":"expiry_seconds","r":false,"t":"`$INTEGER`","index$":0},{"a":true,"ex":true,"k":"query","n":"read_write","or":"read_write","r":false,"t":"`$BOOLEAN`","index$":1}]},"k":"http","m":"GET","o":"/v2/registry/docker-credentials","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v2"},{"lit":"registry"},{"lit":"docker-credentials"}],"t":{"req":"`reqdata`","res":"`body.auths`"},"index$":1}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"docker_credential","name__orig":"docker_credential","Name":"DockerCredential","name_":"docker_credential","name-":"docker-credential","NAME":"DOCKER_CREDENTIAL","index$":140}, {"active":true,"entity":"docker_credential","key$":"BasicDockerCredentialFlow","kind":"basic","name":"BasicDockerCredentialFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"docker_credential_ref01","srcdatavar":"docker_credential_ref01_data","suffix":"_dt0"},"m":{},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-docker_credential_ref01"}}],"index$":0}]}, 'DockerCredential', {"GET /v2/registries/{registry_name}/docker-credentials":{"protocol":"http","parameters":[{"in":"path","name":"registry_name","description":"The name of a container registry.","required":true,"schema":{"type":"string"},"example":"example","x-ref":"#/components/parameters/registry_name","index$":0}]},"GET /v2/registry/docker-credentials":{"protocol":"http","parameters":[{"in":"query","name":"expiry_seconds","required":false,"description":"The duration in seconds that the returned registry credentials will be valid. If not set or 0, the credentials will not expire.","schema":{"type":"integer","minimum":0,"default":0},"example":3600,"x-ref":"#/components/parameters/registry_expiry_seconds","index$":0},{"in":"query","name":"read_write","required":false,"description":"By default, the registry credentials allow for read-only access. Set this query parameter to `true` to obtain read-write credentials.","schema":{"type":"boolean","default":false},"example":true,"x-ref":"#/components/parameters/registry_read_write","index$":1}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let docker_credential_ref01_data = Object.values(setup.data.existing.docker_credential)[0] as any

    // LOAD: skipped — no entity id field and load requires path params.
    // Entity-var is declared here so later flow steps still compile.
    const docker_credential_ref01_ent = client.DockerCredential()


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
      '../../../../.sdk/test/entity/docker_credential/DockerCredentialTestData.json')

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
    ['docker_credential01','docker_credential02','docker_credential03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'DIGITALOCEAN_TEST_DOCKER_CREDENTIAL_ENTID': idmap,
    'DIGITALOCEAN_TEST_LIVE': 'FALSE',
    'DIGITALOCEAN_TEST_EXPLAIN': 'FALSE',
    'DIGITALOCEAN_APIKEY': '',
  })

  idmap = env['DIGITALOCEAN_TEST_DOCKER_CREDENTIAL_ENTID']

  const live = 'TRUE' === env.DIGITALOCEAN_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['DIGITALOCEAN_TEST_DOCKER_CREDENTIAL_ENTID']
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
  
