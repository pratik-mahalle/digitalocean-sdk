

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


describe('UserEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when DIGITALOCEAN_TEST_LIVE=TRUE.
  afterEach(liveDelay('DIGITALOCEAN_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = DigitaloceanSDK.test()
    const ent = testsdk.User()
    assert(null != ent)
  })


  class FailHook extends BaseFeature {
    name = 'failhook'
    version = '0.0.1'
    active = true
    unexpected = 0
    init() { }
    PreSpec() { throw new Error('user hook failed') }
    PreUnexpected() { this.unexpected++ }
  }

  test('stream-error', async () => {
    const offline = { net: { offline: true } }
    await assert.rejects(async () => {
      for await (const _item of DigitaloceanSDK.test(offline).User().stream('list')) { }
    }, /offline/)

    for await (const _item of DigitaloceanSDK.test(offline).User()
      .stream('list', undefined, { ctrl: { throw: false } })) { }

    if (null != (config as any).feature?.rbac) {
      const denied = DigitaloceanSDK.test(undefined, { feature: { rbac: { active: true, deny: true } } })
      await assert.rejects(async () => {
        for await (const _item of denied.User().stream('list')) { }
      }, (err: any) => 'rbac_denied' === err.code)
    }
  })

  test('stream-ctrl', async () => {
    const explain: any = {}
    const ctrl: any = { explain }
    for await (const _item of DigitaloceanSDK.test().User().stream('list', undefined, { ctrl })) { }
    assert.deepStrictEqual(Object.keys(ctrl), ['explain'])
    assert(explain === ctrl.explain && 0 < Object.keys(explain).length)
  })

  test('unexpected', async () => {
    const hook = new FailHook()
    const client = new DigitaloceanSDK({ feature: { test: { active: true } }, extend: [hook] })
    await assert.rejects(client.User().list(), /hook failed/)
    assert(0 < hook.unexpected)

    const fired = hook.unexpected
    assert.strictEqual(await client.User().list(undefined, { throw: false }), undefined)
    assert(fired < hook.unexpected)
  })

  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = DigitaloceanSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.User().list({"page":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.DIGITALOCEAN_TEST_LIVE
    for (const op of ['list', 'load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'user.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"connections":{"a":true,"h":"Connections","n":"connections","r":false,"sh":"The user's connections that are not revoked, sorted by provider.","t":"`$ARRAY`","key$":"connections","index$":0},"groups":{"a":true,"h":"Groups","n":"groups","r":false,"sh":"A list of in-cluster groups that the user belongs to.","t":"`$ARRAY`","key$":"groups","index$":1},"id":{"a":true,"h":"Id","n":"id","r":false,"t":"`$STRING`","key$":"id","index$":2},"pagination":{"a":true,"h":"Pagination","n":"pagination","r":false,"sh":"Paging applied to this response and the total number of users.","t":"`$ANY`","key$":"pagination","index$":3},"sessions":{"a":true,"h":"Sessions","n":"sessions","r":false,"sh":"Sessions bound to the user, oldest first.","t":"`$ARRAY`","key$":"sessions","index$":4},"user_id":{"a":true,"h":"User Id","n":"user_id","r":false,"sh":"The user ID: a session `actor_id` or a connection `user_id`.","t":"`$STRING`","key$":"user_id","index$":5},"user_ids":{"a":true,"h":"User Ids","n":"user_ids","r":false,"sh":"User IDs on this page.","t":"`$ARRAY`","key$":"user_ids","index$":6},"username":{"a":true,"fo":"email","h":"Username","n":"username","r":false,"sh":"The username for the cluster admin user.","t":"`$STRING`","key$":"username","index$":7}},"id":{"field":"id","name":"id"},"name":"user","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /v2/action-gateway/users","source":"openapi3","version":2},"g":{"query":[{"a":true,"ex":1,"k":"query","n":"page","or":"page","r":false,"t":"`$INTEGER`","index$":0},{"a":true,"ex":20,"k":"query","n":"per_page","or":"per_page","r":false,"t":"`$INTEGER`","index$":1},{"a":true,"ex":"session_count","k":"query","n":"sort","or":"sort","r":false,"t":"`$STRING`","index$":2},{"a":true,"ex":"desc","k":"query","n":"sort_direction","or":"sort_direction","r":false,"t":"`$STRING`","index$":3},{"a":true,"ex":"al","k":"query","n":"user_id","or":"user_id","r":false,"t":"`$STRING`","index$":4}]},"k":"http","m":"GET","o":"/v2/action-gateway/users","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v2"},{"lit":"action-gateway"},{"lit":"users"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /v2/kubernetes/clusters/{cluster_id}/user","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":"bd5f5959-5e1e-4205-a714-a914373942af","k":"param","n":"cluster_id","or":"cluster_id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/v2/kubernetes/clusters/{cluster_id}/user","q":{"exist":["cluster_id"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v2"},{"lit":"kubernetes"},{"lit":"clusters"},{"var":"cluster_id"},{"lit":"user"}],"t":{"req":"`reqdata`","res":"`body.kubernetes_cluster_user`"},"index$":0},{"a":true,"co":{"id":"GET /v2/action-gateway/users/{user_id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":"alice","k":"param","n":"id","or":"user_id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/v2/action-gateway/users/{user_id}","q":{"exist":["id"]},"r":{"param":{"user_id":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v2"},{"lit":"action-gateway"},{"lit":"users"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body.user`"},"index$":1}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"user","name__orig":"user","Name":"User","name_":"user","name-":"user","NAME":"USER","index$":221}, {"active":true,"entity":"user","key$":"BasicUserFlow","kind":"basic","name":"BasicUserFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"user_ref01"}}],"index$":0},{"a":true,"d":{},"i":{"ref":"user_ref01","srcdatavar":"user_ref01_data","suffix":"_dt0"},"m":{"id":"user01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-user_ref01"}}],"index$":1}]}, 'User', {"GET /v2/action-gateway/users":{"protocol":"http","parameters":[{"name":"user_id","in":"query","required":false,"description":"User ID prefix to return. An empty value returns all users.","schema":{"type":"string"},"example":"al","x-ref":"#/components/parameters/users_user_id","index$":0},{"name":"sort","in":"query","required":false,"description":"`user_id`|`created_at`|`session_count`|`connection_count`. `created_at` is the earliest creation time among the user's sessions, connections, and limit overrides. Defaults to `created_at`.","schema":{"type":"string","enum":["created_at","user_id","session_count","connection_count"],"default":"created_at"},"example":"session_count","x-ref":"#/components/parameters/users_sort","index$":1},{"name":"sort_direction","in":"query","required":false,"description":"asc|desc. Defaults to desc.","schema":{"type":"string","enum":["asc","desc"]},"example":"desc","x-ref":"#/components/parameters/sort_direction_users","index$":2},{"in":"query","name":"page","required":false,"description":"1-based page number. Values below 1 are treated as 1.","schema":{"type":"integer","minimum":1,"default":1},"example":1,"x-ref":"#/components/parameters/page_connections","index$":3},{"name":"per_page","in":"query","required":false,"description":"Page size. Defaults to 20; values above 100 are capped at 100.","schema":{"type":"integer","minimum":1,"maximum":100,"default":20},"example":20,"x-ref":"#/components/parameters/per_page","index$":4}]},"GET /v2/kubernetes/clusters/{cluster_id}/user":{"protocol":"http","parameters":[{"in":"path","name":"cluster_id","description":"A unique ID that can be used to reference a Kubernetes cluster.","required":true,"schema":{"type":"string","format":"uuid","minimum":1},"example":"bd5f5959-5e1e-4205-a714-a914373942af","x-ref":"#/components/parameters/kubernetes_cluster_id","index$":0}]},"GET /v2/action-gateway/users/{user_id}":{"protocol":"http","parameters":[{"name":"user_id","in":"path","required":true,"description":"User ID.","schema":{"type":"string"},"example":"alice","x-ref":"#/components/parameters/user_id","index$":0}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let user_ref01_data = Object.values(setup.data.existing.user)[0] as any

    // LIST
    const user_ref01_ent = client.User()
    const user_ref01_match: any = {}

    const user_ref01_list = (await user_ref01_ent.list(user_ref01_match)).map((e: any) => e.data())


    // LOAD
    const user_ref01_match_dt0: any = {}
    user_ref01_match_dt0.id = user_ref01_data.id
    const user_ref01_data_dt0 = (await user_ref01_ent.load(user_ref01_match_dt0)).data()
    assert(user_ref01_data_dt0.id === user_ref01_data.id)


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
      '../../../../.sdk/test/entity/user/UserTestData.json')

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
    ['user01','user02','user03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'DIGITALOCEAN_TEST_USER_ENTID': idmap,
    'DIGITALOCEAN_TEST_LIVE': 'FALSE',
    'DIGITALOCEAN_TEST_EXPLAIN': 'FALSE',
    'DIGITALOCEAN_APIKEY': '',
  })

  idmap = env['DIGITALOCEAN_TEST_USER_ENTID']

  const live = 'TRUE' === env.DIGITALOCEAN_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['DIGITALOCEAN_TEST_USER_ENTID']
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
  
