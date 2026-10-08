

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


describe('ApiDeleteAgentOutputEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when DIGITALOCEAN_TEST_LIVE=TRUE.
  afterEach(liveDelay('DIGITALOCEAN_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = DigitaloceanSDK.test()
    const ent = testsdk.ApiDeleteAgentOutput()
    assert(null != ent)
  })


  class FailHook extends BaseFeature {
    name = 'failhook'
    version = '0.0.1'
    active = true
    unexpected = 0
    init() { }
    PreSpec() { throw new Error('api_delete_agent_output hook failed') }
    PreUnexpected() { this.unexpected++ }
  }

  test('stream-error', async () => {
    const offline = { net: { offline: true } }
    await assert.rejects(async () => {
      for await (const _item of DigitaloceanSDK.test(offline).ApiDeleteAgentOutput().stream('list')) { }
    }, /offline/)

    for await (const _item of DigitaloceanSDK.test(offline).ApiDeleteAgentOutput()
      .stream('list', undefined, { ctrl: { throw: false } })) { }

    if (null != (config as any).feature?.rbac) {
      const denied = DigitaloceanSDK.test(undefined, { feature: { rbac: { active: true, deny: true } } })
      await assert.rejects(async () => {
        for await (const _item of denied.ApiDeleteAgentOutput().stream('list')) { }
      }, (err: any) => 'rbac_denied' === err.code)
    }
  })

  test('stream-ctrl', async () => {
    const explain: any = {}
    const ctrl: any = { explain }
    for await (const _item of DigitaloceanSDK.test().ApiDeleteAgentOutput().stream('list', undefined, { ctrl })) { }
    assert.deepStrictEqual(Object.keys(ctrl), ['explain'])
    assert(explain === ctrl.explain && 0 < Object.keys(explain).length)
  })

  test('unexpected', async () => {
    const hook = new FailHook()
    const client = new DigitaloceanSDK({ feature: { test: { active: true } }, extend: [hook] })
    await assert.rejects(client.ApiDeleteAgentOutput().list(), /hook failed/)
    assert(0 < hook.unexpected)

    const fired = hook.unexpected
    assert.strictEqual(await client.ApiDeleteAgentOutput().list(undefined, { throw: false }), undefined)
    assert(fired < hook.unexpected)
  })

  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = DigitaloceanSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.ApiDeleteAgentOutput().list({"only_deployed":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.DIGITALOCEAN_TEST_LIVE
    for (const op of ['create', 'list', 'remove']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'api_delete_agent_output.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"anthropic_api_key":{"a":true,"h":"Anthropic Api Key","n":"anthropic_api_key","r":false,"sh":"Anthropic API Key Info","t":"`$OBJECT`","key$":"anthropic_api_key","index$":0},"anthropic_key_uuid":{"a":true,"h":"Anthropic Key Uuid","n":"anthropic_key_uuid","r":false,"sh":"Optional Anthropic API key ID to use with Anthropic models","t":"`$STRING`","key$":"anthropic_key_uuid","index$":1},"api_key_infos":{"a":true,"h":"Api Key Infos","n":"api_key_infos","r":false,"sh":"Api key infos","t":"`$ARRAY`","key$":"api_key_infos","index$":2},"api_keys":{"a":true,"h":"Api Keys","n":"api_keys","r":false,"sh":"Api keys","t":"`$ARRAY`","key$":"api_keys","index$":3},"chatbot":{"a":true,"h":"Chatbot","n":"chatbot","r":false,"sh":"A Chatbot","t":"`$OBJECT`","key$":"chatbot","index$":4},"chatbot_identifiers":{"a":true,"h":"Chatbot Identifiers","n":"chatbot_identifiers","r":false,"sh":"Chatbot identifiers","t":"`$ARRAY`","key$":"chatbot_identifiers","index$":5},"child_agents":{"a":true,"h":"Child Agents","n":"child_agents","r":false,"sh":"Child agents","t":"`$ARRAY`","key$":"child_agents","index$":6},"conversation_logs_enabled":{"a":true,"h":"Conversation Logs Enabled","n":"conversation_logs_enabled","r":false,"sh":"Whether conversation logs are enabled for the agent","t":"`$BOOLEAN`","key$":"conversation_logs_enabled","index$":7},"created_at":{"a":true,"fo":"date-time","h":"Created At","n":"created_at","r":false,"sh":"Creation date / time","t":"`$STRING`","key$":"created_at","index$":8},"deployment":{"a":true,"h":"Deployment","n":"deployment","r":false,"sh":"Description of deployment","t":"`$OBJECT`","key$":"deployment","index$":9},"description":{"a":true,"h":"Description","n":"description","r":false,"sh":"Description of agent","t":"`$STRING`","key$":"description","index$":10},"functions":{"a":true,"h":"Functions","n":"functions","r":false,"t":"`$ARRAY`","key$":"functions","index$":11},"guardrails":{"a":true,"h":"Guardrails","n":"guardrails","r":false,"sh":"The guardrails the agent is attached to","t":"`$ARRAY`","key$":"guardrails","index$":12},"if_case":{"a":true,"h":"If Case","n":"if_case","r":false,"sh":"Instructions to the agent on how to use the route","t":"`$STRING`","key$":"if_case","index$":13},"instruction":{"a":true,"h":"Instruction","n":"instruction","r":false,"sh":"Agent instruction.","t":"`$STRING`","key$":"instruction","index$":14},"k":{"a":true,"fo":"int64","h":"K","n":"k","r":false,"sh":"How many results should be considered from an attached knowledge base","t":"`$INTEGER`","key$":"k","index$":15},"knowledge_base_uuid":{"a":true,"h":"Knowledge Base Uuid","n":"knowledge_base_uuid","r":false,"sh":"Ids of the knowledge base(s) to attach to the agent","t":"`$ARRAY`","key$":"knowledge_base_uuid","index$":16},"knowledge_bases":{"a":true,"h":"Knowledge Bases","n":"knowledge_bases","r":false,"sh":"Knowledge bases","t":"`$ARRAY`","key$":"knowledge_bases","index$":17},"logging_config":{"a":true,"h":"Logging Config","n":"logging_config","r":false,"t":"`$OBJECT`","key$":"logging_config","index$":18},"max_tokens":{"a":true,"fo":"int64","h":"Max Tokens","n":"max_tokens","r":false,"sh":"Specifies the maximum number of tokens the model can process in a single input or output, set as a number between 1 and 512.","t":"`$INTEGER`","key$":"max_tokens","index$":19},"mcp_servers":{"a":true,"h":"Mcp Servers","n":"mcp_servers","r":false,"sh":"MCP (Model Context Protocol) servers attached to this agent","t":"`$ARRAY`","key$":"mcp_servers","index$":20},"model":{"a":true,"h":"Model","n":"model","r":false,"sh":"Description of a Model","t":"`$OBJECT`","key$":"model","index$":21},"model_provider_key":{"a":true,"h":"Model Provider Key","n":"model_provider_key","r":false,"t":"`$OBJECT`","key$":"model_provider_key","index$":22},"model_provider_key_uuid":{"a":true,"h":"Model Provider Key Uuid","n":"model_provider_key_uuid","r":false,"t":"`$STRING`","key$":"model_provider_key_uuid","index$":23},"model_router":{"a":true,"h":"Model Router","n":"model_router","r":false,"sh":"Model router","t":"`$OBJECT`","key$":"model_router","index$":24},"model_router_uuid":{"a":true,"h":"Model Router Uuid","n":"model_router_uuid","r":false,"t":"`$STRING`","key$":"model_router_uuid","index$":25},"model_uuid":{"a":true,"h":"Model Uuid","n":"model_uuid","r":false,"sh":"Identifier for the foundation model.","t":"`$STRING`","key$":"model_uuid","index$":26},"name":{"a":true,"h":"Name","n":"name","r":false,"sh":"Agent name","t":"`$STRING`","key$":"name","index$":27},"open_ai_key_uuid":{"a":true,"h":"Open Ai Key Uuid","n":"open_ai_key_uuid","r":false,"sh":"Optional OpenAI API key ID to use with OpenAI models","t":"`$STRING`","key$":"open_ai_key_uuid","index$":28},"openai_api_key":{"a":true,"h":"Openai Api Key","n":"openai_api_key","r":false,"sh":"OpenAI API Key Info","t":"`$OBJECT`","key$":"openai_api_key","index$":29},"parent_agents":{"a":true,"h":"Parent Agents","n":"parent_agents","r":false,"sh":"Parent agents","t":"`$ARRAY`","key$":"parent_agents","index$":30},"project_id":{"a":true,"h":"Project Id","n":"project_id","r":false,"sh":"The id of the DigitalOcean project this agent will belong to","t":"`$STRING`","key$":"project_id","index$":31},"provide_citations":{"a":true,"h":"Provide Citations","n":"provide_citations","r":false,"sh":"Whether the agent should provide in-response citations","t":"`$BOOLEAN`","key$":"provide_citations","index$":32},"reasoning_effort":{"a":true,"h":"Reasoning Effort","n":"reasoning_effort","r":false,"sh":"The reasoning effort for the agent","t":"`$STRING`","key$":"reasoning_effort","index$":33},"region":{"a":true,"h":"Region","n":"region","r":false,"sh":"Region code","t":"`$STRING`","key$":"region","index$":34},"retrieval_method":{"a":true,"h":"Retrieval Method","n":"retrieval_method","r":false,"sh":"- RETRIEVAL_METHOD_UNKNOWN: The retrieval method is unknown - RETRIEVAL_METHOD_REWRITE: The retrieval method is rewrite - RETRIEVAL_METHOD_STEP_BACK: The retrieval method is step back - RETRIEVAL_METHOD_SUB_QUERIES: The retrieval method is…","t":"`$STRING`","key$":"retrieval_method","index$":35},"route_created_at":{"a":true,"fo":"date-time","h":"Route Created At","n":"route_created_at","r":false,"sh":"Creation of route date / time","t":"`$STRING`","key$":"route_created_at","index$":36},"route_created_by":{"a":true,"fo":"uint64","h":"Route Created By","n":"route_created_by","r":false,"sh":"Id of user that created the route","t":"`$STRING`","key$":"route_created_by","index$":37},"route_name":{"a":true,"h":"Route Name","n":"route_name","r":false,"sh":"Route name","t":"`$STRING`","key$":"route_name","index$":38},"route_uuid":{"a":true,"h":"Route Uuid","n":"route_uuid","r":false,"sh":"Route uuid","t":"`$STRING`","key$":"route_uuid","index$":39},"router_preset_slug":{"a":true,"h":"Router Preset Slug","n":"router_preset_slug","r":false,"t":"`$STRING`","key$":"router_preset_slug","index$":40},"tags":{"a":true,"h":"Tags","n":"tags","r":false,"sh":"Agent tag to organize related resources","t":"`$ARRAY`","key$":"tags","index$":41},"temperature":{"a":true,"fo":"float","h":"Temperature","n":"temperature","r":false,"sh":"Controls the model’s creativity, specified as a number between 0 and 1.","t":"`$NUMBER`","key$":"temperature","index$":42},"template":{"a":true,"h":"Template","n":"template","r":false,"sh":"Represents an AgentTemplate entity","t":"`$OBJECT`","key$":"template","index$":43},"thinking_token_budget":{"a":true,"fo":"int64","h":"Thinking Token Budget","n":"thinking_token_budget","r":false,"sh":"The thinking token budget for Anthropic extended thinking (0 = disabled)","t":"`$INTEGER`","key$":"thinking_token_budget","index$":44},"top_p":{"a":true,"fo":"float","h":"Top P","n":"top_p","r":false,"sh":"Defines the cumulative probability threshold for word selection, specified as a number between 0 and 1.","t":"`$NUMBER`","key$":"top_p","index$":45},"updated_at":{"a":true,"fo":"date-time","h":"Updated At","n":"updated_at","r":false,"sh":"Last modified","t":"`$STRING`","key$":"updated_at","index$":46},"url":{"a":true,"h":"Url","n":"url","r":false,"sh":"Access your agent under this url","t":"`$STRING`","key$":"url","index$":47},"user_id":{"a":true,"fo":"uint64","h":"User Id","n":"user_id","r":false,"sh":"Id of user that created the agent","t":"`$STRING`","key$":"user_id","index$":48},"uuid":{"a":true,"h":"Uuid","n":"uuid","r":false,"sh":"Unique agent id","t":"`$STRING`","key$":"uuid","index$":49},"version_hash":{"a":true,"h":"Version Hash","n":"version_hash","r":false,"sh":"The latest version of the agent","t":"`$STRING`","key$":"version_hash","index$":50},"vpc_egress_ips":{"a":true,"h":"Vpc Egress Ips","n":"vpc_egress_ips","r":false,"sh":"VPC Egress IPs","t":"`$ARRAY`","key$":"vpc_egress_ips","index$":51},"vpc_uuid":{"a":true,"h":"Vpc Uuid","n":"vpc_uuid","r":false,"t":"`$STRING`","key$":"vpc_uuid","index$":52},"web_fetch_enabled":{"a":true,"h":"Web Fetch Enabled","n":"web_fetch_enabled","r":false,"sh":"Whether this agent can use the built-in web_fetch tool.","t":"`$BOOLEAN`","key$":"web_fetch_enabled","index$":53},"web_search_enabled":{"a":true,"h":"Web Search Enabled","n":"web_search_enabled","r":false,"sh":"Whether this agent can use the built-in web_search tool.","t":"`$BOOLEAN`","key$":"web_search_enabled","index$":54},"workspace":{"a":true,"h":"Workspace","n":"workspace","r":false,"t":"`$OBJECT`","key$":"workspace","index$":55},"workspace_uuid":{"a":true,"h":"Workspace Uuid","n":"workspace_uuid","r":false,"sh":"Identifier for the workspace","t":"`$STRING`","key$":"workspace_uuid","index$":56}},"name":"api_delete_agent_output","op":{"create":{"input":"data","name":"create","points":[{"a":true,"co":{"id":"POST /v2/gen-ai/agents","source":"openapi3","version":2},"g":{},"k":"http","m":"POST","o":"/v2/gen-ai/agents","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v2"},{"lit":"gen-ai"},{"lit":"agents"}],"t":{"req":"`reqdata`","res":"`body.agent`"},"index$":0}],"key$":"create"},"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /v2/gen-ai/agents","source":"openapi3","version":2},"g":{"query":[{"a":true,"ex":true,"k":"query","n":"only_deployed","or":"only_deployed","r":false,"t":"`$BOOLEAN`","index$":0},{"a":true,"ex":1,"k":"query","n":"page","or":"page","r":false,"t":"`$INTEGER`","index$":1},{"a":true,"ex":1,"k":"query","n":"per_page","or":"per_page","r":false,"t":"`$INTEGER`","index$":2}]},"k":"http","m":"GET","o":"/v2/gen-ai/agents","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v2"},{"lit":"gen-ai"},{"lit":"agents"}],"t":{"req":"`reqdata`","res":"`body.agents`"},"index$":0}],"key$":"list"},"remove":{"input":"data","name":"remove","points":[{"a":true,"co":{"id":"DELETE /v2/gen-ai/agents/{uuid}","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":"\"123e4567-e89b-12d3-a456-426614174000\"","k":"param","n":"uuid","or":"uuid","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"DELETE","o":"/v2/gen-ai/agents/{uuid}","q":{"exist":["uuid"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v2"},{"lit":"gen-ai"},{"lit":"agents"},{"var":"uuid"}],"t":{"req":"`reqdata`","res":"`body.agent`"},"index$":0}],"key$":"remove"}},"relations":{"ancestors":[]},"key$":"api_delete_agent_output","name__orig":"api_delete_agent_output","Name":"ApiDeleteAgentOutput","name_":"api_delete_agent_output","name-":"api-delete-agent-output","NAME":"API_DELETE_AGENT_OUTPUT","index$":11}, {"active":true,"entity":"api_delete_agent_output","key$":"BasicApiDeleteAgentOutputFlow","kind":"basic","name":"BasicApiDeleteAgentOutputFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"api_delete_agent_output_ref01"},"m":{},"o":"create","s":[],"v":[],"index$":0},{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"api_delete_agent_output_ref01"}}],"index$":1},{"a":true,"d":{},"i":{"ref":"api_delete_agent_output_ref01","suffix":"_rm0"},"m":{"id":"api_delete_agent_output01"},"o":"remove","s":[],"v":[],"index$":2},{"a":true,"d":{},"i":{"suffix":"_rt0"},"m":{},"o":"list","s":[],"v":[{"apply":"ItemNotExists","def":{"ref":"api_delete_agent_output_ref01"}}],"index$":3}]}, 'ApiDeleteAgentOutput', {"POST /v2/gen-ai/agents":{"protocol":"http","requestBody":{"content":{"application/json":{"schema":{"description":"Parameters for Agent Creation","properties":{"anthropic_key_uuid":{"description":"Optional Anthropic API key ID to use with Anthropic models","example":"\"12345678-1234-1234-1234-123456789012\"","type":"string","key$":"anthropic_key_uuid"},"description":{"description":"A text description of the agent, not used in inference","example":"\"My Agent Description\"","type":"string","key$":"description"},"instruction":{"description":"Agent instruction. Instructions help your agent to perform its job effectively. See [Write Effective Agent Instructions](https://docs.digitalocean.com/products/genai-platform/concepts/best-practices/#agent-instructions) for best practices.","example":"\"You are an agent who thinks deeply about the world\"","type":"string","key$":"instruction"},"knowledge_base_uuid":{"description":"Ids of the knowledge base(s) to attach to the agent","example":["example string"],"items":{"example":"example string","type":"string"},"type":"array","key$":"knowledge_base_uuid"},"mcp_servers":{"description":"MCP (Model Context Protocol) servers to attach to the agent","items":{"description":"McpServer defines a remote MCP server configuration for an agent.","properties":{"allowed_tools":{"description":"Optional list of allowed tool names to expose from this server","example":[],"items":{},"type":"array"},"authorization":{"description":"Optional authorization header value for the MCP server","example":"example string","type":"string"},"headers":{"additionalProperties":{},"description":"Optional additional headers to send to the MCP server","type":"object"},"server_label":{"description":"A label identifying this MCP server","example":"example string","type":"string"},"server_url":{"description":"The URL of the MCP server","example":"example string","type":"string"}},"type":"object","x-ref":"#/components/schemas/apiMcpServer"},"type":"array","key$":"mcp_servers"},"model_provider_key_uuid":{"example":"\"12345678-1234-1234-1234-123456789012\"","type":"string","key$":"model_provider_key_uuid"},"model_router_uuid":{"example":"\"12345678-1234-1234-1234-123456789012\"","type":"string","key$":"model_router_uuid"},"model_uuid":{"description":"Identifier for the foundation model.","example":"\"12345678-1234-1234-1234-123456789012\"","type":"string","key$":"model_uuid"},"name":{"description":"Agent name","example":"\"My Agent\"","type":"string","key$":"name"},"open_ai_key_uuid":{"description":"Optional OpenAI API key ID to use with OpenAI models","example":"\"12345678-1234-1234-1234-123456789012\"","type":"string","key$":"open_ai_key_uuid"},"project_id":{"description":"The id of the DigitalOcean project this agent will belong to","example":"\"12345678-1234-1234-1234-123456789012\"","type":"string","key$":"project_id"},"reasoning_effort":{"example":"\"low\"","type":"string","key$":"reasoning_effort"},"region":{"description":"The DigitalOcean region to deploy your agent in","example":"\"tor1\"","type":"string","key$":"region"},"router_preset_slug":{"example":"\"general\"","type":"string","key$":"router_preset_slug"},"tags":{"description":"Agent tag to organize related resources","example":["example string"],"items":{"example":"example string","type":"string"},"type":"array","key$":"tags"},"thinking_token_budget":{"example":123,"format":"int64","type":"integer","key$":"thinking_token_budget"},"web_fetch_enabled":{"description":"Whether the agent can use the built-in web_fetch tool to retrieve content from public web pages.","example":true,"type":"boolean","key$":"web_fetch_enabled"},"web_search_enabled":{"description":"Whether the agent can use the built-in web_search tool to search the public web for current information.","example":true,"type":"boolean","key$":"web_search_enabled"},"workspace_uuid":{"description":"Identifier for the workspace","example":"123e4567-e89b-12d3-a456-426614174000","type":"string","key$":"workspace_uuid"}},"type":"object","x-ref":"#/components/schemas/apiCreateAgentInputPublic","index$":1}}}},"parameters":[]},"GET /v2/gen-ai/agents":{"protocol":"http","parameters":[{"description":"Only list agents that are deployed.","example":true,"in":"query","name":"only_deployed","schema":{"type":"boolean"},"index$":0},{"description":"Page number.","example":1,"in":"query","name":"page","schema":{"type":"integer"},"index$":1},{"description":"Items per page.","example":1,"in":"query","name":"per_page","schema":{"type":"integer"},"index$":2}]},"DELETE /v2/gen-ai/agents/{uuid}":{"protocol":"http","parameters":[{"description":"Unique agent id","example":"\"123e4567-e89b-12d3-a456-426614174000\"","in":"path","name":"uuid","required":true,"schema":{"type":"string"},"index$":0}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const api_delete_agent_output_ref01_ent = client.ApiDeleteAgentOutput()
    let api_delete_agent_output_ref01_data = setup.data.new.api_delete_agent_output['api_delete_agent_output_ref01']

    api_delete_agent_output_ref01_data = (await api_delete_agent_output_ref01_ent.create(api_delete_agent_output_ref01_data)).data()
    assert(null != api_delete_agent_output_ref01_data)


    // LIST
    const api_delete_agent_output_ref01_match: any = {}

    const api_delete_agent_output_ref01_list = (await api_delete_agent_output_ref01_ent.list(api_delete_agent_output_ref01_match)).map((e: any) => e.data())



    // LIST
    const api_delete_agent_output_ref01_match_rt0: any = {}

    const api_delete_agent_output_ref01_list_rt0 = (await api_delete_agent_output_ref01_ent.list(api_delete_agent_output_ref01_match_rt0)).map((e: any) => e.data())


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
      '../../../../.sdk/test/entity/api_delete_agent_output/ApiDeleteAgentOutputTestData.json')

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
    ['api_delete_agent_output01','api_delete_agent_output02','api_delete_agent_output03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'DIGITALOCEAN_TEST_API_DELETE_AGENT_OUTPUT_ENTID': idmap,
    'DIGITALOCEAN_TEST_LIVE': 'FALSE',
    'DIGITALOCEAN_TEST_EXPLAIN': 'FALSE',
    'DIGITALOCEAN_APIKEY': '',
  })

  idmap = env['DIGITALOCEAN_TEST_API_DELETE_AGENT_OUTPUT_ENTID']

  const live = 'TRUE' === env.DIGITALOCEAN_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['DIGITALOCEAN_TEST_API_DELETE_AGENT_OUTPUT_ENTID']
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
  
