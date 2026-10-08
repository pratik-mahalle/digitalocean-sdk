

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


describe('ListMcpServerToolEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when DIGITALOCEAN_TEST_LIVE=TRUE.
  afterEach(liveDelay('DIGITALOCEAN_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = DigitaloceanSDK.test()
    const ent = testsdk.ListMcpServerTool()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = DigitaloceanSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.ListMcpServerTool().list({"server_ref":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.DIGITALOCEAN_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'list_mcp_server_tool.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"description":{"a":true,"h":"Description","n":"description","r":false,"sh":"Tool description as the server reports it.","t":"`$STRING`","key$":"description","index$":0},"enabled":{"a":true,"h":"Enabled","n":"enabled","r":false,"sh":"Whether the tool is enabled in your team's catalog.","t":"`$BOOLEAN`","key$":"enabled","index$":1},"enabledToolSlugs":{"a":true,"h":"Enabled Tool Slugs","n":"enabledToolSlugs","r":true,"sh":"The complete set of tool slugs (`<server_ref>_<name>`) to enable; every other tool of the server is disabled.","t":"`$ARRAY`","key$":"enabledToolSlugs","index$":2},"name":{"a":true,"h":"Name","n":"name","r":false,"sh":"Tool name as the server reports it, normalized to the catalog's naming rules.","t":"`$STRING`","key$":"name","index$":3},"quarantineReason":{"a":true,"h":"Quarantine Reason","n":"quarantineReason","r":false,"sh":"Why the tool was quarantined; empty otherwise.","t":"`$STRING`","key$":"quarantineReason","index$":4},"quarantined":{"a":true,"h":"Quarantined","n":"quarantined","r":false,"sh":"True when the enabled tool was suspended because it disappeared from the server or its input schema changed incompatibly.","t":"`$BOOLEAN`","key$":"quarantined","index$":5},"toolSlug":{"a":true,"h":"Tool Slug","n":"toolSlug","r":false,"sh":"`<server_ref>_<name>`: the tool's catalog slug, and the value to list in `enabledToolSlugs`.","t":"`$STRING`","key$":"toolSlug","index$":6},"tools":{"a":true,"h":"Tools","n":"tools","r":false,"sh":"Tools sorted by name.","t":"`$ARRAY`","key$":"tools","index$":7},"user_id":{"a":true,"h":"User Id","n":"user_id","r":false,"sh":"Required for a server registered with `credentialRefSource` connection when a tool needs verification against the live server, which can only be reached as a user who has authorized it.","t":"`$STRING`","key$":"user_id","index$":8}},"name":"list_mcp_server_tool","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /v2/action-gateway/mcp-servers/{server_ref}/tools","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":"docs","k":"param","n":"server_ref","or":"server_ref","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/v2/action-gateway/mcp-servers/{server_ref}/tools","q":{"exist":["server_ref"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v2"},{"lit":"action-gateway"},{"lit":"mcp-servers"},{"var":"server_ref"},{"lit":"tools"}],"t":{"req":"`reqdata`","res":"`body.tools`"},"index$":0}],"key$":"list"},"update":{"input":"data","name":"update","points":[{"a":true,"co":{"id":"PUT /v2/action-gateway/mcp-servers/{server_ref}/tools","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":"docs","k":"param","n":"server_ref","or":"server_ref","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"PUT","o":"/v2/action-gateway/mcp-servers/{server_ref}/tools","q":{"exist":["server_ref"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v2"},{"lit":"action-gateway"},{"lit":"mcp-servers"},{"var":"server_ref"},{"lit":"tools"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"update"}},"relations":{"ancestors":[["$.main.kit.entity.mcp_server"]]},"key$":"list_mcp_server_tool","name__orig":"list_mcp_server_tool","Name":"ListMcpServerTool","name_":"list_mcp_server_tool","name-":"list-mcp-server-tool","NAME":"LIST_MCP_SERVER_TOOL","index$":163}, {"active":true,"entity":"list_mcp_server_tool","key$":"BasicListMcpServerToolFlow","kind":"basic","name":"BasicListMcpServerToolFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{"server_ref":"server_ref01"},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"list_mcp_server_tool_ref01"}}],"index$":0},{"a":false,"d":{},"i":{"ref":"list_mcp_server_tool_ref01","srcdatavar":"list_mcp_server_tool_ref01_data","suffix":"_up0","textfield":"description"},"m":{},"o":"update","s":[{"apply":"TextFieldMark","def":{"mark":"Mark01-list_mcp_server_tool_ref01"}}],"v":[],"unreachable":true}]}, 'ListMcpServerTool', {"GET /v2/action-gateway/mcp-servers/{server_ref}/tools":{"protocol":"http","parameters":[{"name":"server_ref","in":"path","required":true,"description":"Server identifier (`serverRef`) of one of your team's MCP servers.","schema":{"type":"string"},"example":"docs","x-ref":"#/components/parameters/server_ref","index$":0}]},"PUT /v2/action-gateway/mcp-servers/{server_ref}/tools":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","required":["enabledToolSlugs"],"properties":{"enabledToolSlugs":{"type":"array","description":"The complete set of tool slugs (`<server_ref>_<name>`) to enable; every other tool of the server is disabled. Empty disables every tool.","items":{"type":"string"},"example":["docs_search","docs_get_page"],"key$":"enabledToolSlugs"},"user_id":{"type":"string","description":"Required for a server registered with `credentialRefSource` connection when a tool needs verification against the live server, which can only be reached as a user who has authorized it. Ignored otherwise.","example":"","key$":"user_id"}},"description":"Complete set of a server's tools to enable.","x-ref":"#/components/schemas/mcp_server_tools_update","index$":1},"example":{"enabledToolSlugs":["docs_get_page"]}}}},"parameters":[{"name":"server_ref","in":"path","required":true,"description":"Server identifier (`serverRef`) of one of your team's MCP servers.","schema":{"type":"string"},"example":"docs","x-ref":"#/components/parameters/server_ref","index$":0}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let list_mcp_server_tool_ref01_data = Object.values(setup.data.existing.list_mcp_server_tool)[0] as any

    // LIST
    const list_mcp_server_tool_ref01_ent = client.ListMcpServerTool()
    const list_mcp_server_tool_ref01_match: any = {}
    list_mcp_server_tool_ref01_match['server_ref'] = setup.idmap['server_ref01']

    const list_mcp_server_tool_ref01_list = (await list_mcp_server_tool_ref01_ent.list(list_mcp_server_tool_ref01_match)).map((e: any) => e.data())


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
      '../../../../.sdk/test/entity/list_mcp_server_tool/ListMcpServerToolTestData.json')

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
    ['list_mcp_server_tool01','list_mcp_server_tool02','list_mcp_server_tool03','mcp_server01','mcp_server02','mcp_server03','server_ref01'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'DIGITALOCEAN_TEST_LIST_MCP_SERVER_TOOL_ENTID': idmap,
    'DIGITALOCEAN_TEST_LIVE': 'FALSE',
    'DIGITALOCEAN_TEST_EXPLAIN': 'FALSE',
    'DIGITALOCEAN_APIKEY': '',
  })

  idmap = env['DIGITALOCEAN_TEST_LIST_MCP_SERVER_TOOL_ENTID']

  const live = 'TRUE' === env.DIGITALOCEAN_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['DIGITALOCEAN_TEST_LIST_MCP_SERVER_TOOL_ENTID']
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
  
