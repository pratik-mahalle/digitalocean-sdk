

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


describe('ChatCompletionEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when DIGITALOCEAN_TEST_LIVE=TRUE.
  afterEach(liveDelay('DIGITALOCEAN_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = DigitaloceanSDK.test()
    const ent = testsdk.ChatCompletion()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = DigitaloceanSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.ChatCompletion().create({"choices":"x","created":"x","id":"x","messages":"x","model":"x","object":"x","usage":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.DIGITALOCEAN_TEST_LIVE
    for (const op of ['create']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'chat_completion.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"choices":{"a":true,"h":"Choices","n":"choices","r":true,"sh":"A list of chat completion choices.","t":"`$ARRAY`","key$":"choices","index$":0},"created":{"a":true,"h":"Created","n":"created","r":true,"sh":"The Unix timestamp (in seconds) of when the chat completion was created.","t":"`$INTEGER`","key$":"created","index$":1},"frequency_penalty":{"a":true,"h":"Frequency Penalty","n":"frequency_penalty","r":false,"sh":"Number between -2.0 and 2.0.","t":"`$NUMBER`","key$":"frequency_penalty","index$":2},"id":{"a":true,"h":"Id","n":"id","r":true,"sh":"A unique identifier for the chat completion.","t":"`$STRING`","key$":"id","index$":3},"logit_bias":{"a":true,"h":"Logit Bias","n":"logit_bias","r":false,"sh":"Modify the likelihood of specified tokens appearing in the completion.","t":"`$OBJECT`","key$":"logit_bias","index$":4},"logprobs":{"a":true,"h":"Logprobs","n":"logprobs","r":false,"sh":"Whether to return log probabilities of the output tokens or not.","t":"`$BOOLEAN`","key$":"logprobs","index$":5},"max_completion_tokens":{"a":true,"h":"Max Completion Tokens","n":"max_completion_tokens","r":false,"sh":"The maximum number of completion tokens that may be used over the course of the run.","t":"`$INTEGER`","key$":"max_completion_tokens","index$":6},"max_tokens":{"a":true,"h":"Max Tokens","n":"max_tokens","r":false,"sh":"The maximum number of tokens that can be generated in the completion.","t":"`$INTEGER`","key$":"max_tokens","index$":7},"messages":{"a":true,"h":"Messages","n":"messages","r":true,"sh":"A list of messages comprising the conversation so far.","t":"`$ARRAY`","key$":"messages","index$":8},"metadata":{"a":true,"h":"Metadata","n":"metadata","r":false,"sh":"Set of 16 key-value pairs that can be attached to an object.","t":"`$OBJECT`","key$":"metadata","index$":9},"model":{"a":true,"h":"Model","n":"model","r":true,"sh":"The model used for the chat completion.","t":"`$STRING`","key$":"model","index$":10},"n":{"a":true,"h":"N","n":"n","r":false,"sh":"How many chat completion choices to generate for each input message.","t":"`$INTEGER`","key$":"n","index$":11},"object":{"a":true,"h":"Object","n":"object","r":true,"sh":"The object type, which is always chat.completion.","t":"`$STRING`","key$":"object","index$":12},"presence_penalty":{"a":true,"h":"Presence Penalty","n":"presence_penalty","r":false,"sh":"Number between -2.0 and 2.0.","t":"`$NUMBER`","key$":"presence_penalty","index$":13},"reasoning_effort":{"a":true,"h":"Reasoning Effort","n":"reasoning_effort","r":false,"sh":"Constrains effort on reasoning for reasoning models.","t":"`$STRING`","key$":"reasoning_effort","index$":14},"seed":{"a":true,"h":"Seed","n":"seed","r":false,"sh":"If specified, the system will make a best effort to sample deterministically, such that repeated requests with the same seed and parameters should return the same result.","t":"`$INTEGER`","key$":"seed","index$":15},"stop":{"a":true,"h":"Stop","n":"stop","r":false,"sh":"Up to 4 sequences where the API will stop generating further tokens.","t":"`$ANY`","union":{"branches":2,"count":1,"depth":0},"key$":"stop","index$":16},"stream":{"a":true,"h":"Stream","n":"stream","r":false,"sh":"If set to true, the model response data will be streamed to the client as it is generated using server-sent events.","t":"`$BOOLEAN`","key$":"stream","index$":17},"stream_options":{"a":true,"h":"Stream Options","n":"stream_options","r":false,"sh":"Options for streaming response.","t":"`$OBJECT`","key$":"stream_options","index$":18},"temperature":{"a":true,"h":"Temperature","n":"temperature","r":false,"sh":"What sampling temperature to use, between 0 and 2.","t":"`$NUMBER`","key$":"temperature","index$":19},"tool_choice":{"a":true,"h":"Tool Choice","n":"tool_choice","r":false,"sh":"Controls which (if any) tool is called by the model.","t":"`$ANY`","union":{"branches":2,"count":1,"depth":0},"key$":"tool_choice","index$":20},"tools":{"a":true,"h":"Tools","n":"tools","r":false,"sh":"A list of tools the model may call.","t":"`$ARRAY`","key$":"tools","index$":21},"top_logprobs":{"a":true,"h":"Top Logprobs","n":"top_logprobs","r":false,"sh":"An integer between 0 and 20 specifying the number of most likely tokens to return at each token position, each with an associated log probability.","t":"`$INTEGER`","key$":"top_logprobs","index$":22},"top_p":{"a":true,"h":"Top P","n":"top_p","r":false,"sh":"An alternative to sampling with temperature, called nucleus sampling, where the model considers the results of the tokens with top_p probability mass.","t":"`$NUMBER`","key$":"top_p","index$":23},"usage":{"a":true,"h":"Usage","n":"usage","r":true,"sh":"Usage statistics for the completion request.","t":"`$OBJECT`","key$":"usage","index$":24},"user":{"a":true,"h":"User","n":"user","r":false,"sh":"A unique identifier representing your end-user, which can help DigitalOcean to monitor and detect abuse.","t":"`$STRING`","key$":"user","index$":25}},"id":{"field":"id","name":"id"},"name":"chat_completion","op":{"create":{"input":"data","name":"create","points":[{"a":true,"co":{"id":"POST /api/v1/chat/completions","source":"openapi3","version":2},"g":{"query":[{"a":true,"ex":true,"k":"query","n":"agent","or":"agent","r":true,"t":"`$BOOLEAN`","index$":0}]},"k":"http","m":"POST","o":"/api/v1/chat/completions","q":{"exist":["agent"]},"r":{},"rs":{"alternatives":[{"kind":"raw","media":"text/event-stream"}],"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"chat"},{"lit":"completions"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0},{"a":true,"co":{"id":"POST /v1/chat/completions","source":"openapi3","version":2},"g":{},"k":"http","m":"POST","o":"/v1/chat/completions","q":{},"r":{},"rs":{"alternatives":[{"kind":"raw","media":"text/event-stream"}],"kind":"json","media":"application/json"},"s":[{"lit":"v1"},{"lit":"chat"},{"lit":"completions"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":1}],"key$":"create"}},"relations":{"ancestors":[]},"key$":"chat_completion","name__orig":"chat_completion","Name":"ChatCompletion","name_":"chat_completion","name-":"chat-completion","NAME":"CHAT_COMPLETION","index$":128}, {"active":true,"entity":"chat_completion","key$":"BasicChatCompletionFlow","kind":"basic","name":"BasicChatCompletionFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"chat_completion_ref01"},"m":{},"o":"create","s":[],"v":[],"index$":0}]}, 'ChatCompletion', {"POST /api/v1/chat/completions":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","required":["model","messages"],"properties":{"messages":{"description":"A list of messages comprising the conversation so far.","type":"array","minItems":1,"items":{"type":"object","description":"A message in the chat conversation.","required":["role"],"properties":{"role":{"type":"string","description":"The role of the message author.","enum":[],"example":"user"},"content":{"type":"string","nullable":true,"description":"The contents of the message.","example":"Hello, how are you?"},"refusal":{"type":"string","nullable":true,"description":"The refusal message generated by the model (assistant messages only).","example":null},"tool_calls":{"type":"array","description":"The tool calls generated by the model (assistant messages only).","items":{}},"tool_call_id":{"type":"string","description":"Tool call that this message is responding to (tool messages only).","example":"call_abc123"},"reasoning_content":{"type":"string","nullable":true,"description":"The reasoning content generated by the model (assistant messages only).","example":null}},"x-ref":"#/components/schemas/chat_message"},"key$":"messages"},"model":{"description":"Model ID used to generate the response.","type":"string","example":"llama3-8b-instruct","key$":"model"},"max_tokens":{"type":"integer","minimum":0,"nullable":true,"description":"The maximum number of tokens that can be generated in the completion. The token count of your prompt plus max_tokens cannot exceed the model's context length.\n","key$":"max_tokens"},"max_completion_tokens":{"type":"integer","nullable":true,"minimum":256,"description":"The maximum number of completion tokens that may be used over the course of the run. The run will make a best effort to use only the number of completion tokens specified, across multiple turns of the run.\n","key$":"max_completion_tokens"},"frequency_penalty":{"type":"number","default":0,"minimum":-2,"maximum":2,"nullable":true,"description":"Number between -2.0 and 2.0. Positive values penalize new tokens based on their existing frequency in the text so far, decreasing the model's likelihood to repeat the same line verbatim.\n","key$":"frequency_penalty"},"presence_penalty":{"type":"number","default":0,"minimum":-2,"maximum":2,"nullable":true,"description":"Number between -2.0 and 2.0. Positive values penalize new tokens based on whether they appear in the text so far, increasing the model's likelihood to talk about new topics.\n","key$":"presence_penalty"},"top_logprobs":{"type":"integer","minimum":0,"maximum":20,"nullable":true,"description":"An integer between 0 and 20 specifying the number of most likely tokens to return at each token position, each with an associated log probability. logprobs must be set to true if this parameter is used.\n","key$":"top_logprobs"},"tools":{"type":"array","description":"A list of tools the model may call. Currently, only functions are supported as a tool.","items":{"type":"object","required":["type","function"],"properties":{"type":{"type":"string","enum":[],"description":"The type of the tool. Currently, only function is supported.","example":"function"},"function":{"type":"object","required":[],"properties":{},"x-ref":"#/components/schemas/function_object"}},"x-ref":"#/components/schemas/chat_completion_tool"},"key$":"tools"},"tool_choice":{"description":"Controls which (if any) tool is called by the model. none means the model will not call any tool and instead generates a message. auto means the model can pick between generating a message or calling one or more tools. required means the model must call one or more tools. Specifying a particular tool via {\"type\": \"function\", \"function\": {\"name\": \"my_function\"}} forces the model to call that tool. none is the default when no tools are present. auto is the default if tools are present.\n","oneOf":[{"type":"string","enum":["none","auto","required"]},{"type":"object","description":"Force a specific tool to be called.","required":["type","function"],"properties":{"type":{},"function":{}}}],"key$":"tool_choice"},"stream":{"type":"boolean","nullable":true,"default":false,"description":"If set to true, the model response data will be streamed to the client as it is generated using server-sent events.\n","key$":"stream"},"stop":{"description":"Up to 4 sequences where the API will stop generating further tokens. The returned text will not contain the stop sequence.\n","default":null,"oneOf":[{"type":"string"},{"type":"array","minItems":1,"maxItems":4,"items":{"type":"string"}}],"key$":"stop"},"logit_bias":{"type":"object","default":null,"nullable":true,"additionalProperties":{"type":"integer"},"description":"Modify the likelihood of specified tokens appearing in the completion. Accepts a JSON object that maps tokens (specified by their token ID in the tokenizer) to an associated bias value from -100 to 100. Mathematically, the bias is added to the logits generated by the model prior to sampling. The exact effect will vary per model, but values between -1 and 1 should decrease or increase likelihood of selection; values like -100 or 100 should result in a ban or exclusive selection of the relevant token.\n","key$":"logit_bias"},"logprobs":{"type":"boolean","default":false,"nullable":true,"description":"Whether to return log probabilities of the output tokens or not. If true, returns the log probabilities of each output token returned in the content of message.\n","key$":"logprobs"},"n":{"type":"integer","minimum":1,"maximum":128,"default":1,"example":1,"nullable":true,"description":"How many chat completion choices to generate for each input message. Note that you will be charged based on the number of generated tokens across all of the choices. Keep n as 1 to minimize costs.","key$":"n"},"stream_options":{"description":"Options for streaming response. Only set this when you set stream to true.","type":"object","nullable":true,"default":null,"properties":{"include_usage":{"type":"boolean","description":"If set, an additional chunk will be streamed before the data [DONE] message. The usage field on this chunk shows the token usage statistics for the entire request, and the choices field will always be an empty array."}},"key$":"stream_options"},"reasoning_effort":{"type":"string","nullable":true,"description":"Constrains effort on reasoning for reasoning models. Reducing reasoning effort can result in faster responses and fewer tokens used on reasoning in a response.\n","enum":["none","minimal","low","medium","high","xhigh"],"key$":"reasoning_effort"},"seed":{"type":"integer","nullable":true,"description":"If specified, the system will make a best effort to sample deterministically, such that repeated requests with the same seed and parameters should return the same result. Determinism is not guaranteed.\n","key$":"seed"},"metadata":{"type":"object","nullable":true,"description":"Set of 16 key-value pairs that can be attached to an object. This can be useful for storing additional information about the object in a structured format. Keys are strings with a maximum length of 64 characters. Values are strings with a maximum length of 512 characters.","additionalProperties":{"type":"string"},"key$":"metadata"},"temperature":{"type":"number","minimum":0,"maximum":2,"example":1,"nullable":true,"description":"What sampling temperature to use, between 0 and 2. Higher values like 0.8 will make the output more random, while lower values like 0.2 will make it more focused and deterministic. We generally recommend altering this or top_p but not both.\n","key$":"temperature"},"top_p":{"type":"number","minimum":0,"maximum":1,"example":1,"nullable":true,"description":"An alternative to sampling with temperature, called nucleus sampling, where the model considers the results of the tokens with top_p probability mass. So 0.1 means only the tokens comprising the top 10% probability mass are considered. We generally recommend altering this or temperature but not both.\n","key$":"top_p"},"user":{"type":"string","example":"user-1234","description":"A unique identifier representing your end-user, which can help DigitalOcean to monitor and detect abuse.","key$":"user"}},"x-ref":"#/components/schemas/chat_completion_request","index$":1}}}},"parameters":[{"name":"agent","in":"query","required":true,"schema":{"type":"boolean","default":true},"description":"Must be set to true for agent-based completion behavior.","example":true,"index$":0}]},"POST /v1/chat/completions":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","required":["model","messages"],"properties":{"messages":{"description":"A list of messages comprising the conversation so far.","type":"array","minItems":1,"items":{"type":"object","description":"A message in the chat conversation.","required":["role"],"properties":{"role":{"type":"string","description":"The role of the message author.","enum":[],"example":"user"},"content":{"type":"string","nullable":true,"description":"The contents of the message.","example":"Hello, how are you?"},"refusal":{"type":"string","nullable":true,"description":"The refusal message generated by the model (assistant messages only).","example":null},"tool_calls":{"type":"array","description":"The tool calls generated by the model (assistant messages only).","items":{}},"tool_call_id":{"type":"string","description":"Tool call that this message is responding to (tool messages only).","example":"call_abc123"},"reasoning_content":{"type":"string","nullable":true,"description":"The reasoning content generated by the model (assistant messages only).","example":null}},"x-ref":"#/components/schemas/chat_message"},"key$":"messages"},"model":{"description":"Model ID used to generate the response.","type":"string","example":"llama3-8b-instruct","key$":"model"},"max_tokens":{"type":"integer","minimum":0,"nullable":true,"description":"The maximum number of tokens that can be generated in the completion. The token count of your prompt plus max_tokens cannot exceed the model's context length.\n","key$":"max_tokens"},"max_completion_tokens":{"type":"integer","nullable":true,"minimum":256,"description":"The maximum number of completion tokens that may be used over the course of the run. The run will make a best effort to use only the number of completion tokens specified, across multiple turns of the run.\n","key$":"max_completion_tokens"},"frequency_penalty":{"type":"number","default":0,"minimum":-2,"maximum":2,"nullable":true,"description":"Number between -2.0 and 2.0. Positive values penalize new tokens based on their existing frequency in the text so far, decreasing the model's likelihood to repeat the same line verbatim.\n","key$":"frequency_penalty"},"presence_penalty":{"type":"number","default":0,"minimum":-2,"maximum":2,"nullable":true,"description":"Number between -2.0 and 2.0. Positive values penalize new tokens based on whether they appear in the text so far, increasing the model's likelihood to talk about new topics.\n","key$":"presence_penalty"},"top_logprobs":{"type":"integer","minimum":0,"maximum":20,"nullable":true,"description":"An integer between 0 and 20 specifying the number of most likely tokens to return at each token position, each with an associated log probability. logprobs must be set to true if this parameter is used.\n","key$":"top_logprobs"},"tools":{"type":"array","description":"A list of tools the model may call. Currently, only functions are supported as a tool.","items":{"type":"object","required":["type","function"],"properties":{"type":{"type":"string","enum":[],"description":"The type of the tool. Currently, only function is supported.","example":"function"},"function":{"type":"object","required":[],"properties":{},"x-ref":"#/components/schemas/function_object"}},"x-ref":"#/components/schemas/chat_completion_tool"},"key$":"tools"},"tool_choice":{"description":"Controls which (if any) tool is called by the model. none means the model will not call any tool and instead generates a message. auto means the model can pick between generating a message or calling one or more tools. required means the model must call one or more tools. Specifying a particular tool via {\"type\": \"function\", \"function\": {\"name\": \"my_function\"}} forces the model to call that tool. none is the default when no tools are present. auto is the default if tools are present.\n","oneOf":[{"type":"string","enum":["none","auto","required"]},{"type":"object","description":"Force a specific tool to be called.","required":["type","function"],"properties":{"type":{},"function":{}}}],"key$":"tool_choice"},"stream":{"type":"boolean","nullable":true,"default":false,"description":"If set to true, the model response data will be streamed to the client as it is generated using server-sent events.\n","key$":"stream"},"stop":{"description":"Up to 4 sequences where the API will stop generating further tokens. The returned text will not contain the stop sequence.\n","default":null,"oneOf":[{"type":"string"},{"type":"array","minItems":1,"maxItems":4,"items":{"type":"string"}}],"key$":"stop"},"logit_bias":{"type":"object","default":null,"nullable":true,"additionalProperties":{"type":"integer"},"description":"Modify the likelihood of specified tokens appearing in the completion. Accepts a JSON object that maps tokens (specified by their token ID in the tokenizer) to an associated bias value from -100 to 100. Mathematically, the bias is added to the logits generated by the model prior to sampling. The exact effect will vary per model, but values between -1 and 1 should decrease or increase likelihood of selection; values like -100 or 100 should result in a ban or exclusive selection of the relevant token.\n","key$":"logit_bias"},"logprobs":{"type":"boolean","default":false,"nullable":true,"description":"Whether to return log probabilities of the output tokens or not. If true, returns the log probabilities of each output token returned in the content of message.\n","key$":"logprobs"},"n":{"type":"integer","minimum":1,"maximum":128,"default":1,"example":1,"nullable":true,"description":"How many chat completion choices to generate for each input message. Note that you will be charged based on the number of generated tokens across all of the choices. Keep n as 1 to minimize costs.","key$":"n"},"stream_options":{"description":"Options for streaming response. Only set this when you set stream to true.","type":"object","nullable":true,"default":null,"properties":{"include_usage":{"type":"boolean","description":"If set, an additional chunk will be streamed before the data [DONE] message. The usage field on this chunk shows the token usage statistics for the entire request, and the choices field will always be an empty array."}},"key$":"stream_options"},"reasoning_effort":{"type":"string","nullable":true,"description":"Constrains effort on reasoning for reasoning models. Reducing reasoning effort can result in faster responses and fewer tokens used on reasoning in a response.\n","enum":["none","minimal","low","medium","high","xhigh"],"key$":"reasoning_effort"},"seed":{"type":"integer","nullable":true,"description":"If specified, the system will make a best effort to sample deterministically, such that repeated requests with the same seed and parameters should return the same result. Determinism is not guaranteed.\n","key$":"seed"},"metadata":{"type":"object","nullable":true,"description":"Set of 16 key-value pairs that can be attached to an object. This can be useful for storing additional information about the object in a structured format. Keys are strings with a maximum length of 64 characters. Values are strings with a maximum length of 512 characters.","additionalProperties":{"type":"string"},"key$":"metadata"},"temperature":{"type":"number","minimum":0,"maximum":2,"example":1,"nullable":true,"description":"What sampling temperature to use, between 0 and 2. Higher values like 0.8 will make the output more random, while lower values like 0.2 will make it more focused and deterministic. We generally recommend altering this or top_p but not both.\n","key$":"temperature"},"top_p":{"type":"number","minimum":0,"maximum":1,"example":1,"nullable":true,"description":"An alternative to sampling with temperature, called nucleus sampling, where the model considers the results of the tokens with top_p probability mass. So 0.1 means only the tokens comprising the top 10% probability mass are considered. We generally recommend altering this or temperature but not both.\n","key$":"top_p"},"user":{"type":"string","example":"user-1234","description":"A unique identifier representing your end-user, which can help DigitalOcean to monitor and detect abuse.","key$":"user"}},"x-ref":"#/components/schemas/chat_completion_request","index$":1}}}},"parameters":[]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const chat_completion_ref01_ent = client.ChatCompletion()
    let chat_completion_ref01_data = setup.data.new.chat_completion['chat_completion_ref01']

    chat_completion_ref01_data = (await chat_completion_ref01_ent.create(chat_completion_ref01_data)).data()
    assert(null != chat_completion_ref01_data.id)


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
      '../../../../.sdk/test/entity/chat_completion/ChatCompletionTestData.json')

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
    ['chat_completion01','chat_completion02','chat_completion03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'DIGITALOCEAN_TEST_CHAT_COMPLETION_ENTID': idmap,
    'DIGITALOCEAN_TEST_LIVE': 'FALSE',
    'DIGITALOCEAN_TEST_EXPLAIN': 'FALSE',
    'DIGITALOCEAN_APIKEY': '',
  })

  idmap = env['DIGITALOCEAN_TEST_CHAT_COMPLETION_ENTID']

  const live = 'TRUE' === env.DIGITALOCEAN_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['DIGITALOCEAN_TEST_CHAT_COMPLETION_ENTID']
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
  
