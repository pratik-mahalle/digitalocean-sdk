

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


describe('ListProviderEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when DIGITALOCEAN_TEST_LIVE=TRUE.
  afterEach(liveDelay('DIGITALOCEAN_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = DigitaloceanSDK.test()
    const ent = testsdk.ListProvider()
    assert(null != ent)
  })


  class FailHook extends BaseFeature {
    name = 'failhook'
    version = '0.0.1'
    active = true
    unexpected = 0
    init() { }
    PreSpec() { throw new Error('list_provider hook failed') }
    PreUnexpected() { this.unexpected++ }
  }

  test('stream-error', async () => {
    const offline = { net: { offline: true } }
    await assert.rejects(async () => {
      for await (const _item of DigitaloceanSDK.test(offline).ListProvider().stream('list')) { }
    }, /offline/)

    for await (const _item of DigitaloceanSDK.test(offline).ListProvider()
      .stream('list', undefined, { ctrl: { throw: false } })) { }

    if (null != (config as any).feature?.rbac) {
      const denied = DigitaloceanSDK.test(undefined, { feature: { rbac: { active: true, deny: true } } })
      await assert.rejects(async () => {
        for await (const _item of denied.ListProvider().stream('list')) { }
      }, (err: any) => 'rbac_denied' === err.code)
    }
  })

  test('stream-ctrl', async () => {
    const explain: any = {}
    const ctrl: any = { explain }
    for await (const _item of DigitaloceanSDK.test().ListProvider().stream('list', undefined, { ctrl })) { }
    assert.deepStrictEqual(Object.keys(ctrl), ['explain'])
    assert(explain === ctrl.explain && 0 < Object.keys(explain).length)
  })

  test('unexpected', async () => {
    const hook = new FailHook()
    const client = new DigitaloceanSDK({ feature: { test: { active: true } }, extend: [hook] })
    await assert.rejects(client.ListProvider().list(), /hook failed/)
    assert(0 < hook.unexpected)

    const fired = hook.unexpected
    assert.strictEqual(await client.ListProvider().list(undefined, { throw: false }), undefined)
    assert(fired < hook.unexpected)
  })

  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = DigitaloceanSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.ListProvider().list({"auth_type":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.DIGITALOCEAN_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'list_provider.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"auth_type":{"a":true,"de":true,"h":"Auth Type","n":"auth_type","r":false,"sh":"Deprecated: read `auth_types`, since a provider may accept more than one credential kind.","t":"`$STRING`","key$":"auth_type","index$":0},"auth_types":{"a":true,"h":"Auth Types","n":"auth_types","r":false,"sh":"Credential kinds the provider accepts, sorted: none|oauth|`shared_api_key`|unknown|`user_oauth_app`|`user_token`.","t":"`$ARRAY`","key$":"auth_types","index$":1},"connection_parameters":{"a":true,"h":"Connection Parameters","n":"connection_parameters","r":false,"sh":"Non-sensitive values collected when creating a connection.","t":"`$ARRAY`","key$":"connection_parameters","index$":2},"credential_parameters":{"a":true,"h":"Credential Parameters","n":"credential_parameters","r":false,"sh":"Non-secret values collected when registering an API key provider credential.","t":"`$ARRAY`","key$":"credential_parameters","index$":3},"description":{"a":true,"h":"Description","n":"description","r":false,"sh":"Provider description.","t":"`$STRING`","key$":"description","index$":4},"display_name":{"a":true,"h":"Display Name","n":"display_name","r":false,"sh":"Human-readable provider name.","t":"`$STRING`","key$":"display_name","index$":5},"name":{"a":true,"h":"Name","n":"name","r":false,"sh":"Provider slug, used as provider when creating a connection or a provider credential.","t":"`$STRING`","key$":"name","index$":6},"oauth_client_setup_url":{"a":true,"h":"Oauth Client Setup Url","n":"oauth_client_setup_url","r":false,"sh":"HTTPS page at the provider where a team creates that OAuth client, such as its developer console or setup guide.","t":"`$STRING`","key$":"oauth_client_setup_url","index$":7},"oauth_redirect_url":{"a":true,"h":"Oauth Redirect Url","n":"oauth_redirect_url","r":false,"sh":"Callback URL a team must register with the provider when it creates its own OAuth client.","t":"`$STRING`","key$":"oauth_redirect_url","index$":8},"scopes":{"a":true,"h":"Scopes","n":"scopes","r":false,"sh":"The OAuth scopes a connection may request; a connection that requests none gets all of them.","t":"`$ARRAY`","key$":"scopes","index$":9}},"name":"list_provider","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /v2/action-gateway/tools/providers","source":"openapi3","version":2},"g":{},"k":"http","m":"GET","o":"/v2/action-gateway/tools/providers","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v2"},{"lit":"action-gateway"},{"lit":"tools"},{"lit":"providers"}],"t":{"req":"`reqdata`","res":"`body.providers`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"list_provider","name__orig":"list_provider","Name":"ListProvider","name_":"list_provider","name-":"list-provider","NAME":"LIST_PROVIDER","index$":164}, {"active":true,"entity":"list_provider","key$":"BasicListProviderFlow","kind":"basic","name":"BasicListProviderFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"list_provider_ref01"}}],"index$":0}]}, 'ListProvider', {"GET /v2/action-gateway/tools/providers":{"protocol":"http","parameters":[]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let list_provider_ref01_data = Object.values(setup.data.existing.list_provider)[0] as any

    // LIST
    const list_provider_ref01_ent = client.ListProvider()
    const list_provider_ref01_match: any = {}

    const list_provider_ref01_list = (await list_provider_ref01_ent.list(list_provider_ref01_match)).map((e: any) => e.data())


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
      '../../../../.sdk/test/entity/list_provider/ListProviderTestData.json')

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
    ['list_provider01','list_provider02','list_provider03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'DIGITALOCEAN_TEST_LIST_PROVIDER_ENTID': idmap,
    'DIGITALOCEAN_TEST_LIVE': 'FALSE',
    'DIGITALOCEAN_TEST_EXPLAIN': 'FALSE',
    'DIGITALOCEAN_APIKEY': '',
  })

  idmap = env['DIGITALOCEAN_TEST_LIST_PROVIDER_ENTID']

  const live = 'TRUE' === env.DIGITALOCEAN_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['DIGITALOCEAN_TEST_LIST_PROVIDER_ENTID']
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
  
