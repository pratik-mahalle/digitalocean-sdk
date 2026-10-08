

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


describe('ApiLinkAgentGuardrailOutputEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when DIGITALOCEAN_TEST_LIVE=TRUE.
  afterEach(liveDelay('DIGITALOCEAN_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = DigitaloceanSDK.test()
    const ent = testsdk.ApiLinkAgentGuardrailOutput()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = DigitaloceanSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.ApiLinkAgentGuardrailOutput().create({"agent_id":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.DIGITALOCEAN_TEST_LIVE
    for (const op of ['create']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'api_link_agent_guardrail_output.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"agent_uuid":{"a":true,"h":"Agent Uuid","n":"agent_uuid","r":false,"sh":"The UUID of the agent.","t":"`$STRING`","key$":"agent_uuid","index$":0},"anthropic_api_key":{"a":true,"h":"Anthropic Api Key","n":"anthropic_api_key","r":false,"sh":"Anthropic API Key Info","t":"`$OBJECT`","key$":"anthropic_api_key","index$":1},"api_key_infos":{"a":true,"h":"Api Key Infos","n":"api_key_infos","r":false,"sh":"Api key infos","t":"`$ARRAY`","key$":"api_key_infos","index$":2},"api_keys":{"a":true,"h":"Api Keys","n":"api_keys","r":false,"sh":"Api keys","t":"`$ARRAY`","key$":"api_keys","index$":3},"chatbot":{"a":true,"h":"Chatbot","n":"chatbot","r":false,"sh":"A Chatbot","t":"`$OBJECT`","key$":"chatbot","index$":4},"chatbot_identifiers":{"a":true,"h":"Chatbot Identifiers","n":"chatbot_identifiers","r":false,"sh":"Chatbot identifiers","t":"`$ARRAY`","key$":"chatbot_identifiers","index$":5},"child_agents":{"a":true,"h":"Child Agents","n":"child_agents","r":false,"sh":"Child agents","t":"`$ARRAY`","key$":"child_agents","index$":6},"conversation_logs_enabled":{"a":true,"h":"Conversation Logs Enabled","n":"conversation_logs_enabled","r":false,"sh":"Whether conversation logs are enabled for the agent","t":"`$BOOLEAN`","key$":"conversation_logs_enabled","index$":7},"created_at":{"a":true,"fo":"date-time","h":"Created At","n":"created_at","r":false,"sh":"Creation date / time","t":"`$STRING`","key$":"created_at","index$":8},"deployment":{"a":true,"h":"Deployment","n":"deployment","r":false,"sh":"Description of deployment","t":"`$OBJECT`","key$":"deployment","index$":9},"description":{"a":true,"h":"Description","n":"description","r":false,"sh":"Description of agent","t":"`$STRING`","key$":"description","index$":10},"functions":{"a":true,"h":"Functions","n":"functions","r":false,"t":"`$ARRAY`","key$":"functions","index$":11},"guardrails":{"a":true,"h":"Guardrails","n":"guardrails","r":false,"sh":"The guardrails the agent is attached to","t":"`$ARRAY`","key$":"guardrails","index$":12},"if_case":{"a":true,"h":"If Case","n":"if_case","r":false,"t":"`$STRING`","key$":"if_case","index$":13},"instruction":{"a":true,"h":"Instruction","n":"instruction","r":false,"sh":"Agent instruction.","t":"`$STRING`","key$":"instruction","index$":14},"k":{"a":true,"fo":"int64","h":"K","n":"k","r":false,"t":"`$INTEGER`","key$":"k","index$":15},"knowledge_bases":{"a":true,"h":"Knowledge Bases","n":"knowledge_bases","r":false,"sh":"Knowledge bases","t":"`$ARRAY`","key$":"knowledge_bases","index$":16},"logging_config":{"a":true,"h":"Logging Config","n":"logging_config","r":false,"t":"`$OBJECT`","key$":"logging_config","index$":17},"max_tokens":{"a":true,"fo":"int64","h":"Max Tokens","n":"max_tokens","r":false,"t":"`$INTEGER`","key$":"max_tokens","index$":18},"mcp_servers":{"a":true,"h":"Mcp Servers","n":"mcp_servers","r":false,"sh":"MCP (Model Context Protocol) servers attached to this agent","t":"`$ARRAY`","key$":"mcp_servers","index$":19},"model":{"a":true,"h":"Model","n":"model","r":false,"sh":"Description of a Model","t":"`$OBJECT`","key$":"model","index$":20},"model_provider_key":{"a":true,"h":"Model Provider Key","n":"model_provider_key","r":false,"t":"`$OBJECT`","key$":"model_provider_key","index$":21},"model_router":{"a":true,"h":"Model Router","n":"model_router","r":false,"sh":"Model router","t":"`$OBJECT`","key$":"model_router","index$":22},"name":{"a":true,"h":"Name","n":"name","r":false,"sh":"Agent name","t":"`$STRING`","key$":"name","index$":23},"openai_api_key":{"a":true,"h":"Openai Api Key","n":"openai_api_key","r":false,"sh":"OpenAI API Key Info","t":"`$OBJECT`","key$":"openai_api_key","index$":24},"parent_agents":{"a":true,"h":"Parent Agents","n":"parent_agents","r":false,"sh":"Parent agents","t":"`$ARRAY`","key$":"parent_agents","index$":25},"project_id":{"a":true,"h":"Project Id","n":"project_id","r":false,"t":"`$STRING`","key$":"project_id","index$":26},"provide_citations":{"a":true,"h":"Provide Citations","n":"provide_citations","r":false,"sh":"Whether the agent should provide in-response citations","t":"`$BOOLEAN`","key$":"provide_citations","index$":27},"reasoning_effort":{"a":true,"h":"Reasoning Effort","n":"reasoning_effort","r":false,"sh":"The reasoning effort for the agent","t":"`$STRING`","key$":"reasoning_effort","index$":28},"region":{"a":true,"h":"Region","n":"region","r":false,"sh":"Region code","t":"`$STRING`","key$":"region","index$":29},"retrieval_method":{"a":true,"h":"Retrieval Method","n":"retrieval_method","r":false,"sh":"- RETRIEVAL_METHOD_UNKNOWN: The retrieval method is unknown - RETRIEVAL_METHOD_REWRITE: The retrieval method is rewrite - RETRIEVAL_METHOD_STEP_BACK: The retrieval method is step back - RETRIEVAL_METHOD_SUB_QUERIES: The retrieval method is…","t":"`$STRING`","key$":"retrieval_method","index$":30},"route_created_at":{"a":true,"fo":"date-time","h":"Route Created At","n":"route_created_at","r":false,"sh":"Creation of route date / time","t":"`$STRING`","key$":"route_created_at","index$":31},"route_created_by":{"a":true,"fo":"uint64","h":"Route Created By","n":"route_created_by","r":false,"t":"`$STRING`","key$":"route_created_by","index$":32},"route_name":{"a":true,"h":"Route Name","n":"route_name","r":false,"sh":"Route name","t":"`$STRING`","key$":"route_name","index$":33},"route_uuid":{"a":true,"h":"Route Uuid","n":"route_uuid","r":false,"t":"`$STRING`","key$":"route_uuid","index$":34},"tags":{"a":true,"h":"Tags","n":"tags","r":false,"sh":"Agent tag to organize related resources","t":"`$ARRAY`","key$":"tags","index$":35},"temperature":{"a":true,"fo":"float","h":"Temperature","n":"temperature","r":false,"t":"`$NUMBER`","key$":"temperature","index$":36},"template":{"a":true,"h":"Template","n":"template","r":false,"sh":"Represents an AgentTemplate entity","t":"`$OBJECT`","key$":"template","index$":37},"thinking_token_budget":{"a":true,"fo":"int64","h":"Thinking Token Budget","n":"thinking_token_budget","r":false,"sh":"The thinking token budget for Anthropic extended thinking (0 = disabled)","t":"`$INTEGER`","key$":"thinking_token_budget","index$":38},"top_p":{"a":true,"fo":"float","h":"Top P","n":"top_p","r":false,"t":"`$NUMBER`","key$":"top_p","index$":39},"updated_at":{"a":true,"fo":"date-time","h":"Updated At","n":"updated_at","r":false,"sh":"Last modified","t":"`$STRING`","key$":"updated_at","index$":40},"url":{"a":true,"h":"Url","n":"url","r":false,"sh":"Access your agent under this url","t":"`$STRING`","key$":"url","index$":41},"user_id":{"a":true,"fo":"uint64","h":"User Id","n":"user_id","r":false,"sh":"Id of user that created the agent","t":"`$STRING`","key$":"user_id","index$":42},"uuid":{"a":true,"h":"Uuid","n":"uuid","r":false,"sh":"Unique agent id","t":"`$STRING`","key$":"uuid","index$":43},"version_hash":{"a":true,"h":"Version Hash","n":"version_hash","r":false,"sh":"The latest version of the agent","t":"`$STRING`","key$":"version_hash","index$":44},"vpc_egress_ips":{"a":true,"h":"Vpc Egress Ips","n":"vpc_egress_ips","r":false,"sh":"VPC Egress IPs","t":"`$ARRAY`","key$":"vpc_egress_ips","index$":45},"vpc_uuid":{"a":true,"h":"Vpc Uuid","n":"vpc_uuid","r":false,"t":"`$STRING`","key$":"vpc_uuid","index$":46},"web_fetch_enabled":{"a":true,"h":"Web Fetch Enabled","n":"web_fetch_enabled","r":false,"sh":"Whether this agent can use the built-in web_fetch tool.","t":"`$BOOLEAN`","key$":"web_fetch_enabled","index$":47},"web_search_enabled":{"a":true,"h":"Web Search Enabled","n":"web_search_enabled","r":false,"sh":"Whether this agent can use the built-in web_search tool.","t":"`$BOOLEAN`","key$":"web_search_enabled","index$":48},"workspace":{"a":true,"h":"Workspace","n":"workspace","r":false,"t":"`$OBJECT`","key$":"workspace","index$":49}},"name":"api_link_agent_guardrail_output","op":{"create":{"input":"data","name":"create","points":[{"a":true,"co":{"id":"POST /v2/gen-ai/agents/{agent_uuid}/guardrails","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":"\"123e4567-e89b-12d3-a456-426614174000\"","k":"param","n":"agent_id","or":"agent_uuid","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"POST","o":"/v2/gen-ai/agents/{agent_uuid}/guardrails","q":{"exist":["agent_id"]},"r":{"param":{"agent_uuid":"agent_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v2"},{"lit":"gen-ai"},{"lit":"agents"},{"var":"agent_id"},{"lit":"guardrails"}],"t":{"req":"`reqdata`","res":"`body.agent`"},"index$":0}],"key$":"create"}},"relations":{"ancestors":[]},"key$":"api_link_agent_guardrail_output","name__orig":"api_link_agent_guardrail_output","Name":"ApiLinkAgentGuardrailOutput","name_":"api_link_agent_guardrail_output","name-":"api-link-agent-guardrail-output","NAME":"API_LINK_AGENT_GUARDRAIL_OUTPUT","index$":55}, {"active":true,"entity":"api_link_agent_guardrail_output","key$":"BasicApiLinkAgentGuardrailOutputFlow","kind":"basic","name":"BasicApiLinkAgentGuardrailOutputFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"api_link_agent_guardrail_output_ref01"},"m":{"agent_id":"agent01"},"o":"create","s":[],"v":[],"index$":0}]}, 'ApiLinkAgentGuardrailOutput', {"POST /v2/gen-ai/agents/{agent_uuid}/guardrails":{"protocol":"http","requestBody":{"content":{"application/json":{"schema":{"description":"Information about linking an agent to a guardrail","properties":{"agent_uuid":{"description":"The UUID of the agent.","example":"\"12345678-1234-1234-1234-123456789012\"","type":"string","key$":"agent_uuid"},"guardrails":{"description":"The list of guardrails to attach.","items":{"properties":{"guardrail_uuid":{"description":"Guardrail uuid","example":"123e4567-e89b-12d3-a456-426614174000","type":"string"},"priority":{"description":"Priority of the guardrail","example":123,"format":"int64","type":"integer"}},"type":"object","x-ref":"#/components/schemas/apiAgentGuardrailInput"},"type":"array","key$":"guardrails"}},"type":"object","x-ref":"#/components/schemas/apiLinkAgentGuardrailsInputPublic","index$":1}}}},"parameters":[{"description":"The UUID of the agent.","example":"\"123e4567-e89b-12d3-a456-426614174000\"","in":"path","name":"agent_uuid","required":true,"schema":{"type":"string"},"index$":0}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const api_link_agent_guardrail_output_ref01_ent = client.ApiLinkAgentGuardrailOutput()
    let api_link_agent_guardrail_output_ref01_data = setup.data.new.api_link_agent_guardrail_output['api_link_agent_guardrail_output_ref01']
    api_link_agent_guardrail_output_ref01_data['agent_id'] = setup.idmap['agent01']

    api_link_agent_guardrail_output_ref01_data = (await api_link_agent_guardrail_output_ref01_ent.create(api_link_agent_guardrail_output_ref01_data)).data()
    assert(null != api_link_agent_guardrail_output_ref01_data)


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
      '../../../../.sdk/test/entity/api_link_agent_guardrail_output/ApiLinkAgentGuardrailOutputTestData.json')

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
    ['api_link_agent_guardrail_output01','api_link_agent_guardrail_output02','api_link_agent_guardrail_output03','agent01'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'DIGITALOCEAN_TEST_API_LINK_AGENT_GUARDRAIL_OUTPUT_ENTID': idmap,
    'DIGITALOCEAN_TEST_LIVE': 'FALSE',
    'DIGITALOCEAN_TEST_EXPLAIN': 'FALSE',
    'DIGITALOCEAN_APIKEY': '',
  })

  idmap = env['DIGITALOCEAN_TEST_API_LINK_AGENT_GUARDRAIL_OUTPUT_ENTID']

  const live = 'TRUE' === env.DIGITALOCEAN_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['DIGITALOCEAN_TEST_API_LINK_AGENT_GUARDRAIL_OUTPUT_ENTID']
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
  
