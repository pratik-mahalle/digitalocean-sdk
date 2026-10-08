

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


describe('MessageEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when DIGITALOCEAN_TEST_LIVE=TRUE.
  afterEach(liveDelay('DIGITALOCEAN_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = DigitaloceanSDK.test()
    const ent = testsdk.Message()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = DigitaloceanSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.Message().create({"content":"x","id":1,"max_tokens":1,"messages":"x","model":"x","role":"x","stop_reason":"x","thinking":"x","type":"x","usage":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.DIGITALOCEAN_TEST_LIVE
    for (const op of ['create']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'message.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"content":{"a":true,"h":"Content","n":"content","r":true,"sh":"Assistant output blocks (`text` and/or `tool_use`).","t":"`$ARRAY`","union":{"branches":2,"count":1,"depth":1},"key$":"content","index$":0},"id":{"a":true,"h":"Id","n":"id","r":true,"sh":"Unique identifier for this message object.","t":"`$STRING`","key$":"id","index$":1},"max_tokens":{"a":true,"h":"Max Tokens","n":"max_tokens","r":true,"sh":"Maximum tokens to generate before stopping.","t":"`$INTEGER`","key$":"max_tokens","index$":2},"messages":{"a":true,"h":"Messages","n":"messages","r":true,"sh":"Conversation turns.","t":"`$ARRAY`","union":{"branches":4,"count":3,"depth":10},"key$":"messages","index$":3},"metadata":{"a":true,"h":"Metadata","n":"metadata","r":false,"sh":"Optional request metadata.","t":"`$OBJECT`","key$":"metadata","index$":4},"model":{"a":true,"h":"Model","n":"model","r":true,"sh":"Model that produced the message.","t":"`$STRING`","key$":"model","index$":5},"reasoning_effort":{"a":true,"h":"Reasoning Effort","n":"reasoning_effort","r":false,"sh":"DigitalOcean extension for reasoning-capable models.","t":"`$STRING`","key$":"reasoning_effort","index$":6},"role":{"a":true,"h":"Role","n":"role","r":true,"sh":"Always `assistant` for this response.","t":"`$STRING`","key$":"role","index$":7},"speed":{"a":true,"h":"Speed","n":"speed","r":false,"sh":"DigitalOcean extension for preferred inference speed.","t":"`$STRING`","key$":"speed","index$":8},"stop_reason":{"a":true,"h":"Stop Reason","n":"stop_reason","r":true,"sh":"Why generation stopped.","t":"`$STRING`","key$":"stop_reason","index$":9},"stop_sequence":{"a":true,"h":"Stop Sequence","n":"stop_sequence","r":false,"sh":"When `stop_reason` is `stop_sequence`, the sequence that matched.","t":"`$STRING`","key$":"stop_sequence","index$":10},"stop_sequences":{"a":true,"h":"Stop Sequences","n":"stop_sequences","r":false,"sh":"Custom strings that stop generation when produced.","t":"`$ARRAY`","key$":"stop_sequences","index$":11},"stream":{"a":true,"h":"Stream","n":"stream","r":false,"sh":"When true, the response is streamed using server-sent events (SSE).","t":"`$BOOLEAN`","key$":"stream","index$":12},"system":{"a":true,"h":"System","n":"system","r":false,"sh":"System prompt as plain text or as an array of text blocks.","t":"`$ANY`","union":{"branches":2,"count":1,"depth":0},"key$":"system","index$":13},"temperature":{"a":true,"h":"Temperature","n":"temperature","r":false,"sh":"Sampling temperature between 0.0 and 1.0.","t":"`$NUMBER`","key$":"temperature","index$":14},"thinking":{"a":true,"h":"Thinking","n":"thinking","r":true,"sh":"Extended thinking configuration.","t":"`$OBJECT`","key$":"thinking","index$":15},"tool_choice":{"a":true,"h":"Tool Choice","n":"tool_choice","r":false,"sh":"Controls how the model uses tools: automatic selection, require any tool, force a specific tool, or a string form accepted by the service.","t":"`$ANY`","union":{"branches":2,"count":1,"depth":0},"key$":"tool_choice","index$":16},"tools":{"a":true,"h":"Tools","n":"tools","r":false,"sh":"Tool definitions the model may invoke.","t":"`$ARRAY`","key$":"tools","index$":17},"top_k":{"a":true,"h":"Top K","n":"top_k","r":false,"sh":"Top-K sampling cutoff.","t":"`$INTEGER`","key$":"top_k","index$":18},"top_p":{"a":true,"h":"Top P","n":"top_p","r":false,"sh":"Nucleus sampling; use either `temperature` or `top_p`, not both.","t":"`$NUMBER`","key$":"top_p","index$":19},"type":{"a":true,"h":"Type","n":"type","r":true,"sh":"Object type discriminator.","t":"`$STRING`","key$":"type","index$":20},"usage":{"a":true,"h":"Usage","n":"usage","r":true,"sh":"Token usage for a non-streaming `POST /v1/messages` response.","t":"`$OBJECT`","key$":"usage","index$":21}},"id":{"field":"id","name":"id"},"name":"message","op":{"create":{"input":"data","name":"create","points":[{"a":true,"co":{"id":"POST /v1/messages","source":"openapi3","version":2},"g":{},"k":"http","m":"POST","o":"/v1/messages","q":{},"r":{},"rs":{"alternatives":[{"kind":"raw","media":"text/event-stream"}],"kind":"json","media":"application/json"},"s":[{"lit":"v1"},{"lit":"messages"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"}},"relations":{"ancestors":[]},"key$":"message","name__orig":"message","Name":"Message","name_":"message","name-":"message","NAME":"MESSAGE","index$":170}, {"active":true,"entity":"message","key$":"BasicMessageFlow","kind":"basic","name":"BasicMessageFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"message_ref01"},"m":{},"o":"create","s":[],"v":[],"index$":0}]}, 'Message', {"POST /v1/messages":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","description":"Request body for `POST /v1/messages`. Required fields are `model`, `messages`, and `max_tokens`.\n","required":["model","max_tokens","messages"],"properties":{"model":{"type":"string","description":"Model ID (for example `claude-opus-4-6` or a serverless model id).","example":"claude-opus-4-6","key$":"model"},"max_tokens":{"type":"integer","minimum":1,"description":"Maximum tokens to generate before stopping.","key$":"max_tokens"},"messages":{"type":"array","description":"Conversation turns. Each item has `role` `user` or `assistant` and `content` as a string or an array of content blocks.\n","minItems":1,"items":{"type":"object","description":"One turn in the conversation. Roles are `user` or `assistant` (no `system` role; use the top-level `system` field). Content may be a string (equivalent to a single text block) or an array of content blocks.\n","required":["role","content"],"properties":{"role":{"type":"string","description":"Speaker role for this message.","enum":[],"example":"user"},"content":{"description":"Message body as plain text or structured blocks.","example":"What is the capital of Portugal?","oneOf":[]}},"x-ref":"#/components/schemas/messages_api_message_param"},"key$":"messages"},"system":{"description":"System prompt as plain text or as an array of text blocks.","oneOf":[{"type":"string"},{"type":"array","items":{"type":"object","description":"A text content block in a request message.","required":[],"properties":{},"x-ref":"#/components/schemas/messages_request_text_block_param"}}],"key$":"system"},"stop_sequences":{"type":"array","description":"Custom strings that stop generation when produced.","items":{"type":"string"},"key$":"stop_sequences"},"stream":{"type":"boolean","default":false,"description":"When true, the response is streamed using server-sent events (SSE).","key$":"stream"},"temperature":{"type":"number","minimum":0,"maximum":1,"nullable":true,"description":"Sampling temperature between 0.0 and 1.0.","key$":"temperature"},"top_p":{"type":"number","nullable":true,"description":"Nucleus sampling; use either `temperature` or `top_p`, not both.","key$":"top_p"},"top_k":{"type":"integer","minimum":0,"nullable":true,"description":"Top-K sampling cutoff.","key$":"top_k"},"tools":{"type":"array","description":"Tool definitions the model may invoke.","items":{"type":"object","description":"Tool definition the model may call (`name`, JSON Schema for `input`).","required":["name","input_schema"],"properties":{"name":{"type":"string","description":"Tool name referenced in `tool_use` blocks.","example":"get_weather"},"description":{"type":"string","description":"Human-readable description of what the tool does.","example":"Get the current weather for a location."},"input_schema":{"type":"object","description":"JSON Schema (draft 2020-12 style) describing the tool input object.","additionalProperties":true}},"x-ref":"#/components/schemas/messages_tool_definition_param"},"key$":"tools"},"tool_choice":{"description":"Controls how the model uses tools: automatic selection, require any tool, force a specific tool, or a string form accepted by the service.\n","oneOf":[{"type":"string","example":"auto"},{"type":"object","required":["type"],"properties":{"type":{},"name":{}}}],"x-ref":"#/components/schemas/messages_tool_choice_param","key$":"tool_choice"},"metadata":{"type":"object","description":"Optional request metadata.","properties":{"user_id":{"type":"string","description":"Opaque identifier for the end user (for example a UUID or hash). Do not include PII.\n","example":"550e8400-e29b-41d4-a716-446655440000"}},"key$":"metadata"},"reasoning_effort":{"type":"string","nullable":true,"description":"DigitalOcean extension for reasoning-capable models. Ignored by executors that do not support it.\n","enum":["none","minimal","low","medium","high","xhigh"],"key$":"reasoning_effort"},"speed":{"type":"string","nullable":true,"description":"DigitalOcean extension for preferred inference speed. Ignored when not supported.\n","enum":["standard","fast"],"key$":"speed"},"thinking":{"type":"object","nullable":true,"description":"Extended thinking configuration. Executors that do not support thinking may ignore this field.\n","required":["type"],"properties":{"type":{"type":"string","description":"Thinking mode discriminator (for example enabled or disabled).","example":"enabled"}},"x-ref":"#/components/schemas/messages_thinking_config_param","key$":"thinking"}},"x-ref":"#/components/schemas/messages_create_request","index$":1}}}},"parameters":[]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const message_ref01_ent = client.Message()
    let message_ref01_data = setup.data.new.message['message_ref01']

    message_ref01_data = (await message_ref01_ent.create(message_ref01_data)).data()
    assert(null != message_ref01_data.id)


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
      '../../../../.sdk/test/entity/message/MessageTestData.json')

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
    ['message01','message02','message03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'DIGITALOCEAN_TEST_MESSAGE_ENTID': idmap,
    'DIGITALOCEAN_TEST_LIVE': 'FALSE',
    'DIGITALOCEAN_TEST_EXPLAIN': 'FALSE',
    'DIGITALOCEAN_APIKEY': '',
  })

  idmap = env['DIGITALOCEAN_TEST_MESSAGE_ENTID']

  const live = 'TRUE' === env.DIGITALOCEAN_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['DIGITALOCEAN_TEST_MESSAGE_ENTID']
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
  
