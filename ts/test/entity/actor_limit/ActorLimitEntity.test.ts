

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


describe('ActorLimitEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when DIGITALOCEAN_TEST_LIVE=TRUE.
  afterEach(liveDelay('DIGITALOCEAN_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = DigitaloceanSDK.test()
    const ent = testsdk.ActorLimit()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = DigitaloceanSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.ActorLimit().list({"id":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.DIGITALOCEAN_TEST_LIVE
    for (const op of []) {
      if (!live && maybeSkipControl(t, 'entityOp', 'actor_limit.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"category":{"a":true,"h":"Category","n":"category","r":true,"sh":"The category the limit applies to.","t":"`$STRING`","key$":"category","index$":0},"id":{"a":true,"h":"Id","n":"id","r":false,"t":"`$STRING`","key$":"id","index$":1},"requests_per_minute":{"a":true,"fo":"uint64","h":"Requests Per Minute","n":"requests_per_minute","r":true,"sh":"Calls allowed per minute.","t":"`$STRING`","key$":"requests_per_minute","index$":2}},"id":{"field":"id","name":"id"},"name":"actor_limit","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /v2/action-gateway/actors/{actor_id}/limits","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":"alice","k":"param","n":"id","or":"actor_id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/v2/action-gateway/actors/{actor_id}/limits","q":{"exist":["id"]},"r":{"param":{"actor_id":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v2"},{"lit":"action-gateway"},{"lit":"actors"},{"var":"id"},{"lit":"limits"}],"t":{"req":"`reqdata`","res":"`body.configured_limits`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"actor_limit","name__orig":"actor_limit","Name":"ActorLimit","name_":"actor_limit","name-":"actor-limit","NAME":"ACTOR_LIMIT","index$":3}, {"active":true,"entity":"actor_limit","key$":"BasicActorLimitFlow","kind":"basic","name":"BasicActorLimitFlow","param":{},"step":[{"a":false,"d":{},"i":{},"m":{"actor_id":"actor01"},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"actor_limit_ref01"}}],"unreachable":true}]}, 'ActorLimit', {"GET /v2/action-gateway/actors/{actor_id}/limits":{"protocol":"http","parameters":[{"name":"actor_id","in":"path","required":true,"description":"Actor ID: a session `actor_id` or a connection `user_id`, 1 to 64 characters from `[A-Za-z0-9._-]`.","schema":{"type":"string","pattern":"^[A-Za-z0-9._-]{1,64}$"},"example":"alice","x-ref":"#/components/parameters/actor_id","index$":0}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let actor_limit_ref01_data = Object.values(setup.data.existing.actor_limit)[0] as any

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
      '../../../../.sdk/test/entity/actor_limit/ActorLimitTestData.json')

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
    ['actor_limit01','actor_limit02','actor_limit03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'DIGITALOCEAN_TEST_ACTOR_LIMIT_ENTID': idmap,
    'DIGITALOCEAN_TEST_LIVE': 'FALSE',
    'DIGITALOCEAN_TEST_EXPLAIN': 'FALSE',
    'DIGITALOCEAN_APIKEY': '',
  })

  idmap = env['DIGITALOCEAN_TEST_ACTOR_LIMIT_ENTID']

  const live = 'TRUE' === env.DIGITALOCEAN_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['DIGITALOCEAN_TEST_ACTOR_LIMIT_ENTID']
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
  
