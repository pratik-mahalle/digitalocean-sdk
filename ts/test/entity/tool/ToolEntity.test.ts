

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


describe('ToolEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when DIGITALOCEAN_TEST_LIVE=TRUE.
  afterEach(liveDelay('DIGITALOCEAN_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = DigitaloceanSDK.test()
    const ent = testsdk.Tool()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = DigitaloceanSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.Tool().list({"name":1,"provider_id":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.DIGITALOCEAN_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'tool.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"category":{"a":true,"h":"Category","n":"category","r":false,"sh":"Best-effort catalog metadata and is empty for a large share of the catalog.","t":"`$STRING`","key$":"category","index$":0},"description":{"a":true,"h":"Description","n":"description","r":false,"sh":"What the tool does.","t":"`$STRING`","key$":"description","index$":1},"history":{"a":true,"h":"History","n":"history","r":false,"sh":"Present only when the request set `include_history`.","t":"`$OBJECT`","key$":"history","index$":2},"id":{"a":true,"h":"Id","n":"id","r":false,"t":"`$STRING`","key$":"id","index$":3},"name":{"a":true,"h":"Name","n":"name","r":false,"sh":"The unqualified tool name, without the provider prefix.","t":"`$STRING`","key$":"name","index$":4},"provider":{"a":true,"h":"Provider","n":"provider","r":false,"sh":"The ID of the provider that offers the tool, broken out so a client never has to split `tool_slug`.","t":"`$STRING`","key$":"provider","index$":5},"snapshot":{"a":true,"h":"Snapshot","n":"snapshot","r":false,"sh":"When the metrics were computed and the window they cover.","t":"`$ANY`","key$":"snapshot","index$":6},"title":{"a":true,"h":"Title","n":"title","r":false,"sh":"Human-readable tool title.","t":"`$STRING`","key$":"title","index$":7},"tool":{"a":true,"h":"Tool","n":"tool","r":false,"sh":"The tool's metrics over the window.","t":"`$ANY`","key$":"tool","index$":8},"tool_slug":{"a":true,"h":"Tool Slug","n":"tool_slug","r":false,"sh":"The provider-qualified, stable tool identifier (`<provider>_<name>`).","t":"`$STRING`","key$":"tool_slug","index$":9},"version":{"a":true,"fo":"int32","h":"Version","n":"version","r":false,"sh":"The version this toolbelt version pins for the member, matching the `@<version>` suffix in the corresponding toolbelt.tools entry.","t":"`$INTEGER`","key$":"version","index$":10}},"id":{"field":"id","name":"id"},"name":"tool","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /v2/action-gateway/toolbelts/{name}/providers/{provider}/tools","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":"search-toolbelt","k":"param","n":"name","or":"name","r":true,"t":"`$STRING`","index$":0},{"a":true,"ex":"exa","k":"param","n":"provider_id","or":"provider","r":true,"t":"`$STRING`","index$":1}],"query":[{"a":true,"ex":1,"k":"query","n":"page","or":"page","r":false,"t":"`$INTEGER`","index$":0},{"a":true,"ex":20,"k":"query","n":"per_page","or":"per_page","r":false,"t":"`$INTEGER`","index$":1},{"a":true,"ex":"search","k":"query","n":"search","or":"search","r":false,"t":"`$STRING`","index$":2},{"a":true,"ex":"1","k":"query","n":"version","or":"version","r":false,"t":"`$STRING`","index$":3}]},"k":"http","m":"GET","o":"/v2/action-gateway/toolbelts/{name}/providers/{provider}/tools","q":{"exist":["name","provider_id"]},"r":{"param":{"provider":"provider_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v2"},{"lit":"action-gateway"},{"lit":"toolbelts"},{"var":"name"},{"lit":"providers"},{"var":"provider_id"},{"lit":"tools"}],"t":{"req":"`reqdata`","res":"`body.tools`"},"index$":0},{"a":true,"co":{"id":"GET /v2/action-gateway/tools/search","source":"openapi3","version":2},"g":{"query":[{"a":true,"ex":20,"k":"query","n":"page_size","or":"page_size","r":false,"t":"`$INTEGER`","index$":0},{"a":true,"ex":"ZXhhX3dlYl9zZWFyY2hAMQ","k":"query","n":"page_token","or":"page_token","r":false,"t":"`$STRING`","index$":1},{"a":true,"ex":["exa"],"k":"query","n":"provider","or":"provider","r":false,"t":"`$ARRAY`","index$":2},{"a":true,"ex":"search","k":"query","n":"query","or":"query","r":false,"t":"`$STRING`","index$":3},{"a":true,"ex":"search-toolbelt","k":"query","n":"toolbelt","or":"toolbelt","r":false,"t":"`$STRING`","index$":4}]},"k":"http","m":"GET","o":"/v2/action-gateway/tools/search","q":{"$action":"search"},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v2"},{"lit":"action-gateway"},{"lit":"tools"},{"lit":"search"}],"t":{"req":"`reqdata`","res":"`body.tools`"},"index$":1}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /v2/action-gateway/tools/health/tools/{tool_slug}","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":"exa_web_search","k":"param","n":"id","or":"tool_slug","r":true,"t":"`$STRING`","index$":0}],"query":[{"a":true,"ex":true,"k":"query","n":"include_history","or":"include_history","r":false,"t":"`$BOOLEAN`","index$":0},{"a":true,"ex":"HEALTH_WINDOW_SEVEN_DAYS","k":"query","n":"window","or":"window","r":false,"t":"`$STRING`","index$":1}]},"k":"http","m":"GET","o":"/v2/action-gateway/tools/health/tools/{tool_slug}","q":{"exist":["id"]},"r":{"param":{"tool_slug":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v2"},{"lit":"action-gateway"},{"lit":"tools"},{"lit":"health"},{"lit":"tools"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body.tool`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[["$.main.kit.entity.toolbelt"]]},"key$":"tool","name__orig":"tool","Name":"Tool","name_":"tool","name-":"tool","NAME":"TOOL","index$":218}, {"active":true,"entity":"tool","key$":"BasicToolFlow","kind":"basic","name":"BasicToolFlow","param":{},"step":[{"a":false,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"tool_ref01"}}],"unreachable":true},{"a":true,"d":{},"i":{"ref":"tool_ref01","srcdatavar":"tool_ref01_data","suffix":"_dt0"},"m":{"id":"tool01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-tool_ref01"}}],"index$":0}]}, 'Tool', {"GET /v2/action-gateway/toolbelts/{name}/providers/{provider}/tools":{"protocol":"http","parameters":[{"name":"name","in":"path","required":true,"description":"Toolbelt name.","schema":{"type":"string","pattern":"^[a-z][a-z0-9_-]{0,63}$"},"example":"search-toolbelt","x-ref":"#/components/parameters/toolbelt_name","index$":0},{"name":"provider","in":"path","required":true,"description":"A provider ID from the toolbelt's provider list, or `_legacy` for members recorded without a provider. Matched exactly.","schema":{"type":"string"},"example":"exa","x-ref":"#/components/parameters/toolbelt_provider","index$":1},{"name":"version","in":"query","required":false,"description":"Version number to read. Empty reads the latest version.","schema":{"type":"string","pattern":"^[0-9]+$"},"example":"1","x-ref":"#/components/parameters/toolbelt_version_toolbelts_providers","index$":2},{"in":"query","name":"page","required":false,"description":"1-based page number. Values below 1 are treated as 1.","schema":{"type":"integer","minimum":1,"default":1},"example":1,"x-ref":"#/components/parameters/page_connections","index$":3},{"name":"per_page","in":"query","required":false,"description":"Page size. Defaults to 20; values above 100 are capped at 100.","schema":{"type":"integer","minimum":1,"maximum":100,"default":20},"example":20,"x-ref":"#/components/parameters/per_page","index$":4},{"name":"search","in":"query","required":false,"description":"Restricts tools whose slug, name, title, description, provider, or category contains this value, case-insensitively, within the provider only.","schema":{"type":"string"},"example":"search","x-ref":"#/components/parameters/toolbelt_search_toolbelts_providers_tools","index$":5}]},"GET /v2/action-gateway/tools/search":{"protocol":"http","parameters":[{"name":"query","in":"query","required":false,"description":"Matched case- and accent-insensitively as a substring of the tool's name, title, description, category, provider ID, or tool slug. Empty matches every tool your team can use.","schema":{"type":"string"},"example":"search","x-ref":"#/components/parameters/search_query_tools_search","index$":0},{"name":"provider","in":"query","required":false,"description":"Restricts results to these provider IDs, OR'd together. Repeat the parameter to select several. An unknown ID matches nothing.","schema":{"type":"array","items":{"type":"string"}},"style":"form","explode":true,"example":["exa"],"x-ref":"#/components/parameters/search_tools_provider","index$":1},{"name":"toolbelt","in":"query","required":false,"description":"Restricts results to the members of that toolbelt of your team at its latest version, combined with query and provider as AND. Members are matched at the version the toolbelt pins, which is the same set and the same versions `GET /v2/action-gateway/toolbelts/{name}` reports. An unknown or deleted toolbelt returns 404 rather than an empty page.","schema":{"type":"string"},"example":"search-toolbelt","x-ref":"#/components/parameters/search_tools_toolbelt","index$":2},{"name":"page_size","in":"query","required":false,"description":"Page size, 1 to 100. Defaults to 20 when omitted or 0; other values are rejected with 400.","schema":{"type":"integer","minimum":1,"maximum":100,"default":20},"example":20,"x-ref":"#/components/parameters/page_size","index$":3},{"name":"page_token","in":"query","required":false,"description":"A `next_page_token` from the preceding response. It is pinned to the query and filters that produced it: replaying one against a different search is rejected with 400, not a silent restart from the top.","schema":{"type":"string"},"example":"ZXhhX3dlYl9zZWFyY2hAMQ","x-ref":"#/components/parameters/page_token_tools_search","index$":4}]},"GET /v2/action-gateway/tools/health/tools/{tool_slug}":{"protocol":"http","parameters":[{"name":"tool_slug","in":"path","required":true,"description":"Catalog tool slug, for example `exa_search`. Required.","schema":{"type":"string"},"example":"exa_web_search","x-ref":"#/components/parameters/tool_slug","index$":0},{"name":"window","in":"query","required":false,"description":"Window to aggregate over. Defaults to twenty-four hours.\n\n- `HEALTH_WINDOW_UNSPECIFIED`: Twenty-four hours.\n- `HEALTH_WINDOW_ONE_HOUR`: One hour; history points are 10 minutes.\n- `HEALTH_WINDOW_TWENTY_FOUR_HOURS`: Twenty-four hours; history points are 1 hour.\n- `HEALTH_WINDOW_SEVEN_DAYS`: Seven days; history points are 6 hours.\n- `HEALTH_WINDOW_THIRTY_DAYS`: Thirty days; history points are 24 hours.","schema":{"type":"string","enum":["HEALTH_WINDOW_ONE_HOUR","HEALTH_WINDOW_TWENTY_FOUR_HOURS","HEALTH_WINDOW_SEVEN_DAYS","HEALTH_WINDOW_THIRTY_DAYS"],"default":"HEALTH_WINDOW_TWENTY_FOUR_HOURS"},"example":"HEALTH_WINDOW_SEVEN_DAYS","x-ref":"#/components/parameters/health_window","index$":1},{"name":"include_history","in":"query","required":false,"description":"Additionally returns the window split into resolution-aligned points (the history field below).","schema":{"type":"boolean","default":false},"example":true,"x-ref":"#/components/parameters/include_history","index$":2}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let tool_ref01_data = Object.values(setup.data.existing.tool)[0] as any

    // LOAD
    const tool_ref01_ent = client.Tool()
    const tool_ref01_match_dt0: any = {}
    tool_ref01_match_dt0.id = tool_ref01_data.id
    const tool_ref01_data_dt0 = (await tool_ref01_ent.load(tool_ref01_match_dt0)).data()
    assert(tool_ref01_data_dt0.id === tool_ref01_data.id)


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
      '../../../../.sdk/test/entity/tool/ToolTestData.json')

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
    ['tool01','tool02','tool03','toolbelt01','toolbelt02','toolbelt03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'DIGITALOCEAN_TEST_TOOL_ENTID': idmap,
    'DIGITALOCEAN_TEST_LIVE': 'FALSE',
    'DIGITALOCEAN_TEST_EXPLAIN': 'FALSE',
    'DIGITALOCEAN_APIKEY': '',
  })

  idmap = env['DIGITALOCEAN_TEST_TOOL_ENTID']

  const live = 'TRUE' === env.DIGITALOCEAN_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['DIGITALOCEAN_TEST_TOOL_ENTID']
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
  
