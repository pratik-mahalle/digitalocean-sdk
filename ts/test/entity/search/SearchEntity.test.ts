

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


describe('SearchEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when DIGITALOCEAN_TEST_LIVE=TRUE.
  afterEach(liveDelay('DIGITALOCEAN_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = DigitaloceanSDK.test()
    const ent = testsdk.Search()
    assert(null != ent)
  })


  class FailHook extends BaseFeature {
    name = 'failhook'
    version = '0.0.1'
    active = true
    unexpected = 0
    init() { }
    PreSpec() { throw new Error('search hook failed') }
    PreUnexpected() { this.unexpected++ }
  }

  test('stream-error', async () => {
    const offline = { net: { offline: true } }
    await assert.rejects(async () => {
      for await (const _item of DigitaloceanSDK.test(offline).Search().stream('list')) { }
    }, /offline/)

    for await (const _item of DigitaloceanSDK.test(offline).Search()
      .stream('list', undefined, { ctrl: { throw: false } })) { }

    if (null != (config as any).feature?.rbac) {
      const denied = DigitaloceanSDK.test(undefined, { feature: { rbac: { active: true, deny: true } } })
      await assert.rejects(async () => {
        for await (const _item of denied.Search().stream('list')) { }
      }, (err: any) => 'rbac_denied' === err.code)
    }
  })

  test('stream-ctrl', async () => {
    const explain: any = {}
    const ctrl: any = { explain }
    for await (const _item of DigitaloceanSDK.test().Search().stream('list', undefined, { ctrl })) { }
    assert.deepStrictEqual(Object.keys(ctrl), ['explain'])
    assert(explain === ctrl.explain && 0 < Object.keys(explain).length)
  })

  test('unexpected', async () => {
    const hook = new FailHook()
    const client = new DigitaloceanSDK({ feature: { test: { active: true } }, extend: [hook] })
    await assert.rejects(client.Search().list(), /hook failed/)
    assert(0 < hook.unexpected)

    const fired = hook.unexpected
    assert.strictEqual(await client.Search().list(undefined, { throw: false }), undefined)
    assert(fired < hook.unexpected)
  })

  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = DigitaloceanSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.Search().list({"end_user_id":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.DIGITALOCEAN_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'search.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"actorId":{"a":true,"h":"Actor Id","n":"actorId","r":false,"sh":"Empty when the session is not bound to an actor.","t":"`$STRING`","key$":"actorId","index$":0},"agentName":{"a":true,"h":"Agent Name","n":"agentName","r":false,"sh":"Name of the agent that started the session.","t":"`$STRING`","key$":"agentName","index$":1},"agentUrn":{"a":true,"h":"Agent Urn","n":"agentUrn","r":false,"sh":"URN of the agent that started the session.","t":"`$STRING`","key$":"agentUrn","index$":2},"auth_type":{"a":true,"de":true,"h":"Auth Type","n":"auth_type","r":false,"sh":"Deprecated: read `auth_types`, since a provider may accept more than one credential kind.","t":"`$STRING`","key$":"auth_type","index$":3},"auth_types":{"a":true,"h":"Auth Types","n":"auth_types","r":false,"sh":"Credential kinds the provider accepts, sorted: none|oauth|`shared_api_key`|unknown|`user_oauth_app`|`user_token`.","t":"`$ARRAY`","key$":"auth_types","index$":4},"config":{"a":true,"h":"Config","n":"config","r":false,"sh":"Session options as supplied at creation.","t":"`$OBJECT`","key$":"config","index$":5},"connection_parameters":{"a":true,"h":"Connection Parameters","n":"connection_parameters","r":false,"sh":"Non-sensitive values collected when creating a connection.","t":"`$ARRAY`","key$":"connection_parameters","index$":6},"createdAt":{"a":true,"fo":"date-time","h":"Created At","n":"createdAt","r":false,"sh":"When the session was created.","t":"`$STRING`","key$":"createdAt","index$":7},"credential_parameters":{"a":true,"h":"Credential Parameters","n":"credential_parameters","r":false,"sh":"Non-secret values collected when registering an API key provider credential.","t":"`$ARRAY`","key$":"credential_parameters","index$":8},"description":{"a":true,"h":"Description","n":"description","r":false,"sh":"Description of the latest version.","t":"`$STRING`","key$":"description","index$":9},"display_name":{"a":true,"h":"Display Name","n":"display_name","r":false,"sh":"Human-readable label of the latest version.","t":"`$STRING`","key$":"display_name","index$":10},"insights":{"a":true,"h":"Insights","n":"insights","r":false,"sh":"Omitted when no explicit customer Insights choice was stored.","t":"`$ANY`","key$":"insights","index$":11},"latest_version":{"a":true,"h":"Latest Version","n":"latest_version","r":false,"sh":"Latest version number, as a string.","t":"`$STRING`","key$":"latest_version","index$":12},"name":{"a":true,"h":"Name","n":"name","r":false,"sh":"The required human-readable session name.","t":"`$STRING`","key$":"name","index$":13},"network":{"a":true,"h":"Network","n":"network","r":false,"sh":"Omitted when the request omitted network.","t":"`$ANY`","key$":"network","index$":14},"oauth_client_setup_url":{"a":true,"h":"Oauth Client Setup Url","n":"oauth_client_setup_url","r":false,"sh":"HTTPS page at the provider where a team creates that OAuth client, such as its developer console or setup guide.","t":"`$STRING`","key$":"oauth_client_setup_url","index$":15},"oauth_redirect_url":{"a":true,"h":"Oauth Redirect Url","n":"oauth_redirect_url","r":false,"sh":"Callback URL a team must register with the provider when it creates its own OAuth client.","t":"`$STRING`","key$":"oauth_redirect_url","index$":16},"owning_user_id":{"a":true,"h":"Owning User Id","n":"owning_user_id","r":false,"sh":"DigitalOcean user ID of the user who created the session, when recorded.","t":"`$STRING`","key$":"owning_user_id","index$":17},"policy":{"a":true,"h":"Policy","n":"policy","r":false,"sh":"The session's tool-permission policy.","t":"`$ANY`","key$":"policy","index$":18},"reference_latest":{"a":true,"h":"Reference Latest","n":"reference_latest","r":false,"sh":"The toolbelt name, which refers to whichever version is latest.","t":"`$STRING`","key$":"reference_latest","index$":19},"scopes":{"a":true,"h":"Scopes","n":"scopes","r":false,"sh":"The OAuth scopes a connection may request; a connection that requests none gets all of them.","t":"`$ARRAY`","key$":"scopes","index$":20},"sessionUrn":{"a":true,"h":"Session Urn","n":"sessionUrn","r":false,"sh":"Session URN, for example `do:managed_agent_session:<uuid>`.","t":"`$STRING`","key$":"sessionUrn","index$":21},"status":{"a":true,"h":"Status","n":"status","r":false,"sh":"active, or deprecated once the toolbelt is deleted.","t":"`$STRING`","key$":"status","index$":22},"tool_count":{"a":true,"fo":"int32","h":"Tool Count","n":"tool_count","r":false,"sh":"Number of members in the latest version.","t":"`$INTEGER`","key$":"tool_count","index$":23},"tools":{"a":true,"h":"Tools","n":"tools","r":false,"sh":"Omitted when the request omitted tools (all tools).","t":"`$OBJECT`","key$":"tools","index$":24},"updatedAt":{"a":true,"fo":"date-time","h":"Updated At","n":"updatedAt","r":false,"sh":"When the session was last modified.","t":"`$STRING`","key$":"updatedAt","index$":25},"updated_at":{"a":true,"fo":"date-time","h":"Updated At","n":"updated_at","r":false,"sh":"When the latest version was last modified, in RFC 3339 format.","t":"`$STRING`","key$":"updated_at","index$":26},"version_count":{"a":true,"fo":"int32","h":"Version Count","n":"version_count","r":false,"sh":"Number of versions recorded under this name, including versions from before the toolbelt was deleted and the name reused.","t":"`$INTEGER`","key$":"version_count","index$":27}},"name":"search","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /v2/action-gateway/sessions/search","source":"openapi3","version":2},"g":{"query":[{"a":true,"ex":"alice","k":"query","n":"end_user_id","or":"end_user_id","r":false,"t":"`$STRING`","index$":0},{"a":true,"ex":20,"k":"query","n":"page_size","or":"page_size","r":false,"t":"`$INTEGER`","index$":1},{"a":true,"ex":"ZXhhX3dlYl9zZWFyY2hAMQ","k":"query","n":"page_token","or":"page_token","r":false,"t":"`$STRING`","index$":2},{"a":true,"ex":"search","k":"query","n":"query","or":"query","r":false,"t":"`$STRING`","index$":3}]},"k":"http","m":"GET","o":"/v2/action-gateway/sessions/search","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v2"},{"lit":"action-gateway"},{"lit":"sessions"},{"lit":"search"}],"t":{"req":"`reqdata`","res":"`body.sessions`"},"index$":0},{"a":true,"co":{"id":"GET /v2/action-gateway/toolbelts/search","source":"openapi3","version":2},"g":{"query":[{"a":true,"ex":20,"k":"query","n":"page_size","or":"page_size","r":false,"t":"`$INTEGER`","index$":0},{"a":true,"ex":"ZXhhX3dlYl9zZWFyY2hAMQ","k":"query","n":"page_token","or":"page_token","r":false,"t":"`$STRING`","index$":1},{"a":true,"ex":"search","k":"query","n":"query","or":"query","r":false,"t":"`$STRING`","index$":2},{"a":true,"ex":"active","k":"query","n":"status","or":"status","r":false,"t":"`$STRING`","index$":3}]},"k":"http","m":"GET","o":"/v2/action-gateway/toolbelts/search","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v2"},{"lit":"action-gateway"},{"lit":"toolbelts"},{"lit":"search"}],"t":{"req":"`reqdata`","res":"`body.toolbelts`"},"index$":1},{"a":true,"co":{"id":"GET /v2/action-gateway/tools/providers/search","source":"openapi3","version":2},"g":{"query":[{"a":true,"ex":20,"k":"query","n":"page_size","or":"page_size","r":false,"t":"`$INTEGER`","index$":0},{"a":true,"ex":"ZXhhX3dlYl9zZWFyY2hAMQ","k":"query","n":"page_token","or":"page_token","r":false,"t":"`$STRING`","index$":1},{"a":true,"ex":"search","k":"query","n":"query","or":"query","r":false,"t":"`$STRING`","index$":2}]},"k":"http","m":"GET","o":"/v2/action-gateway/tools/providers/search","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v2"},{"lit":"action-gateway"},{"lit":"tools"},{"lit":"providers"},{"lit":"search"}],"t":{"req":"`reqdata`","res":"`body.providers`"},"index$":2}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"search","name__orig":"search","Name":"Search","name_":"search","name-":"search","NAME":"SEARCH","index$":199}, {"active":true,"entity":"search","key$":"BasicSearchFlow","kind":"basic","name":"BasicSearchFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"search_ref01"}}],"index$":0}]}, 'Search', {"GET /v2/action-gateway/sessions/search":{"protocol":"http","parameters":[{"name":"query","in":"query","required":false,"description":"Matched case-insensitively as a substring of name, `actor_id`, `session_urn`, or `agentName`. Empty matches every session you can see. Results are ordered by match quality (an exact name, `session_urn`, or `actor_id` match, then a prefix, then a substring), then by name, across the whole result set, so a client must not re-sort a page to rank it.","schema":{"type":"string"},"example":"search","x-ref":"#/components/parameters/search_query","index$":0},{"name":"end_user_id","in":"query","required":false,"description":"`end_user_id`, when set, is an exact filter on `actor_id` (the same filter as on the session list) and combines with query as AND.","schema":{"type":"string"},"example":"alice","x-ref":"#/components/parameters/end_user_id_sessions_search","index$":1},{"name":"page_size","in":"query","required":false,"description":"Page size, 1 to 100. Defaults to 20 when omitted or 0; other values are rejected with 400.","schema":{"type":"integer","minimum":1,"maximum":100,"default":20},"example":20,"x-ref":"#/components/parameters/page_size","index$":2},{"name":"page_token","in":"query","required":false,"description":"`next_page_token` from the previous response. Valid only with the same query and `end_user_id`; otherwise the request is rejected with 400.","schema":{"type":"string"},"example":"ZXhhX3dlYl9zZWFyY2hAMQ","x-ref":"#/components/parameters/page_token_sessions_search","index$":3}]},"GET /v2/action-gateway/toolbelts/search":{"protocol":"http","parameters":[{"name":"query","in":"query","required":false,"description":"Matched case-insensitively as a substring of name, `display_name`, or description. Empty matches every toolbelt of your team.","schema":{"type":"string"},"example":"search","x-ref":"#/components/parameters/search_query_toolbelts_search","index$":0},{"name":"status","in":"query","required":false,"description":"active (default), deprecated, or all. Case-insensitive.","schema":{"type":"string","enum":["active","deprecated","all"],"default":"active"},"example":"active","x-ref":"#/components/parameters/toolbelt_status","index$":1},{"name":"page_size","in":"query","required":false,"description":"Page size, 1 to 100. Defaults to 20 when omitted or 0; other values are rejected with 400.","schema":{"type":"integer","minimum":1,"maximum":100,"default":20},"example":20,"x-ref":"#/components/parameters/page_size","index$":2},{"name":"page_token","in":"query","required":false,"description":"`next_page_token` from the previous response. Valid only with the same query and status; otherwise the request is rejected with 400.","schema":{"type":"string"},"example":"ZXhhX3dlYl9zZWFyY2hAMQ","x-ref":"#/components/parameters/page_token_toolbelts_search","index$":3}]},"GET /v2/action-gateway/tools/providers/search":{"protocol":"http","parameters":[{"name":"query","in":"query","required":false,"description":"Matched case-insensitively as a substring of name, `display_name`, or description. It does not match the titles of the tools a provider owns: \"providers owning a tool that matches\" is a tool search grouped by the provider field of each result.","schema":{"type":"string"},"example":"search","x-ref":"#/components/parameters/search_query_tools_providers_search","index$":0},{"name":"page_size","in":"query","required":false,"description":"Page size, 1 to 100. Defaults to 20 when omitted or 0; other values are rejected with 400.","schema":{"type":"integer","minimum":1,"maximum":100,"default":20},"example":20,"x-ref":"#/components/parameters/page_size","index$":1},{"name":"page_token","in":"query","required":false,"description":"`next_page_token` from the previous response. Valid only with the same query; otherwise the request is rejected with 400.","schema":{"type":"string"},"example":"ZXhhX3dlYl9zZWFyY2hAMQ","x-ref":"#/components/parameters/page_token_tools_providers_search","index$":2}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let search_ref01_data = Object.values(setup.data.existing.search)[0] as any

    // LIST
    const search_ref01_ent = client.Search()
    const search_ref01_match: any = {}

    const search_ref01_list = (await search_ref01_ent.list(search_ref01_match)).map((e: any) => e.data())


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
      '../../../../.sdk/test/entity/search/SearchTestData.json')

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
    ['search01','search02','search03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'DIGITALOCEAN_TEST_SEARCH_ENTID': idmap,
    'DIGITALOCEAN_TEST_LIVE': 'FALSE',
    'DIGITALOCEAN_TEST_EXPLAIN': 'FALSE',
    'DIGITALOCEAN_APIKEY': '',
  })

  idmap = env['DIGITALOCEAN_TEST_SEARCH_ENTID']

  const live = 'TRUE' === env.DIGITALOCEAN_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['DIGITALOCEAN_TEST_SEARCH_ENTID']
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
  
