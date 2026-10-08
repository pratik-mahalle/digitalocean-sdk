

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


describe('SecuritySuppressionEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when DIGITALOCEAN_TEST_LIVE=TRUE.
  afterEach(liveDelay('DIGITALOCEAN_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = DigitaloceanSDK.test()
    const ent = testsdk.SecuritySuppression()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = DigitaloceanSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.SecuritySuppression().create({"rule_uuid":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.DIGITALOCEAN_TEST_LIVE
    for (const op of ['create']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'security_suppression.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"resources":{"a":true,"h":"Resources","n":"resources","r":false,"sh":"The URNs of resources to suppress for the rule.","t":"`$ARRAY`","key$":"resources","index$":0},"rule_uuid":{"a":true,"h":"Rule Uuid","n":"rule_uuid","r":false,"sh":"The rule UUID to suppress for the listed resources.","t":"`$STRING`","key$":"rule_uuid","index$":1}},"name":"security_suppression","op":{"create":{"input":"data","name":"create","points":[{"a":true,"co":{"id":"POST /v2/security/settings/suppressions","source":"openapi3","version":2},"g":{},"k":"http","m":"POST","o":"/v2/security/settings/suppressions","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v2"},{"lit":"security"},{"lit":"settings"},{"lit":"suppressions"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"},"remove":{"input":"data","name":"remove","points":[{"a":true,"co":{"id":"DELETE /v2/security/settings/suppressions/{suppression_uuid}","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":"5b3b2b2d-5c9c-4a61-9e2f-4d8f80f30a12","k":"param","n":"suppression_uuid","or":"suppression_uuid","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"DELETE","o":"/v2/security/settings/suppressions/{suppression_uuid}","q":{"exist":["suppression_uuid"]},"r":{},"s":[{"lit":"v2"},{"lit":"security"},{"lit":"settings"},{"lit":"suppressions"},{"var":"suppression_uuid"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"remove"}},"relations":{"ancestors":[]},"key$":"security_suppression","name__orig":"security_suppression","Name":"SecuritySuppression","name_":"security_suppression","name-":"security-suppression","NAME":"SECURITY_SUPPRESSION","index$":209}, {"active":true,"entity":"security_suppression","key$":"BasicSecuritySuppressionFlow","kind":"basic","name":"BasicSecuritySuppressionFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"security_suppression_ref01"},"m":{},"o":"create","s":[],"v":[],"index$":0},{"a":false,"d":{},"i":{"ref":"security_suppression_ref01","suffix":"_rm0"},"m":{"id":"security_suppression01"},"o":"remove","s":[],"v":[],"unreachable":true}]}, 'SecuritySuppression', {"POST /v2/security/settings/suppressions":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","properties":{"rule_uuid":{"type":"string","description":"The rule UUID to suppress for the listed resources.","key$":"rule_uuid"},"resources":{"type":"array","items":{"type":"string"},"example":["do:droplet:fe3a2fd7-903d-46e6-ada3-3e4f285fb89d"],"description":"The URNs of resources to suppress for the rule.","key$":"resources"}},"index$":1}}}},"parameters":[]},"DELETE /v2/security/settings/suppressions/{suppression_uuid}":{"protocol":"http","parameters":[{"in":"path","name":"suppression_uuid","description":"The suppression UUID to remove.","required":true,"schema":{"type":"string","format":"uuid"},"example":"5b3b2b2d-5c9c-4a61-9e2f-4d8f80f30a12","x-ref":"#/components/parameters/suppression_uuid","index$":0}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const security_suppression_ref01_ent = client.SecuritySuppression()
    let security_suppression_ref01_data = setup.data.new.security_suppression['security_suppression_ref01']

    security_suppression_ref01_data = (await security_suppression_ref01_ent.create(security_suppression_ref01_data)).data()
    assert(null != security_suppression_ref01_data)


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
      '../../../../.sdk/test/entity/security_suppression/SecuritySuppressionTestData.json')

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
    ['security_suppression01','security_suppression02','security_suppression03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'DIGITALOCEAN_TEST_SECURITY_SUPPRESSION_ENTID': idmap,
    'DIGITALOCEAN_TEST_LIVE': 'FALSE',
    'DIGITALOCEAN_TEST_EXPLAIN': 'FALSE',
    'DIGITALOCEAN_APIKEY': '',
  })

  idmap = env['DIGITALOCEAN_TEST_SECURITY_SUPPRESSION_ENTID']

  const live = 'TRUE' === env.DIGITALOCEAN_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['DIGITALOCEAN_TEST_SECURITY_SUPPRESSION_ENTID']
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
  
