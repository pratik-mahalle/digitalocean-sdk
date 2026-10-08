

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


describe('EmbeddingEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when DIGITALOCEAN_TEST_LIVE=TRUE.
  afterEach(liveDelay('DIGITALOCEAN_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = DigitaloceanSDK.test()
    const ent = testsdk.Embedding()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = DigitaloceanSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.Embedding().create({"data":"x","encoding_format":1,"input":"x","model":"x","object":"x","usage":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.DIGITALOCEAN_TEST_LIVE
    for (const op of ['create']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'embedding.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"data":{"a":true,"h":"Data","n":"data","r":true,"sh":"One entry for each `input` string, in the same order.","t":"`$ARRAY`","union":{"branches":2,"count":1,"depth":3},"key$":"data","index$":0},"encoding_format":{"a":true,"h":"Encoding Format","n":"encoding_format","r":false,"sh":"How embedding values are returned in each `data[].embedding` field.","t":"`$STRING`","key$":"encoding_format","index$":1},"input":{"a":true,"h":"Input","n":"input","r":true,"sh":"A single string or 1–2048 strings; each string produces one row in `data`, in order.","t":"`$ANY`","union":{"branches":2,"count":1,"depth":0},"key$":"input","index$":2},"model":{"a":true,"h":"Model","n":"model","r":true,"sh":"The embedding model that produced the vectors.","t":"`$STRING`","key$":"model","index$":3},"object":{"a":true,"h":"Object","n":"object","r":true,"sh":"The object type, which is always the string `list`.","t":"`$STRING`","key$":"object","index$":4},"usage":{"a":true,"h":"Usage","n":"usage","r":true,"sh":"Token usage for the embeddings request.","t":"`$OBJECT`","key$":"usage","index$":5},"user":{"a":true,"h":"User","n":"user","r":false,"sh":"Optional end-user identifier to help with abuse monitoring.","t":"`$STRING`","key$":"user","index$":6}},"name":"embedding","op":{"create":{"input":"data","name":"create","points":[{"a":true,"co":{"id":"POST /v1/embeddings","source":"openapi3","version":2},"g":{},"k":"http","m":"POST","o":"/v1/embeddings","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v1"},{"lit":"embeddings"}],"t":{"req":{"encoding_format":"`reqdata.encoding_format`","input":"`reqdata.input`","model":"`reqdata.model`","user":"`reqdata.user`"},"res":"`body`"},"index$":0}],"key$":"create"}},"relations":{"ancestors":[]},"key$":"embedding","name__orig":"embedding","Name":"Embedding","name_":"embedding","name-":"embedding","NAME":"EMBEDDING","index$":148}, {"active":true,"entity":"embedding","key$":"BasicEmbeddingFlow","kind":"basic","name":"BasicEmbeddingFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"embedding_ref01"},"m":{},"o":"create","s":[],"v":[],"index$":0}]}, 'Embedding', {"POST /v1/embeddings":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","description":"Request body for `POST /v1/embeddings` (OpenAI-compatible). Extra fields are rejected.","required":["model","input"],"additionalProperties":false,"properties":{"model":{"type":"string","description":"Model id to use for embeddings. Must match a model your account can access.","example":"qwen3-embedding-0.6b","key$":"model"},"input":{"description":"A single string or 1–2048 strings; each string produces one row in `data`, in order.","example":"hello world","oneOf":[{"type":"string","example":"hello world"},{"type":"array","minItems":1,"maxItems":2048,"items":{"type":"string"},"example":["hello world","goodbye world"]}],"key$":"input"},"user":{"type":"string","description":"Optional end-user identifier to help with abuse monitoring.","example":"user-1234","key$":"user"},"encoding_format":{"type":"string","description":"How embedding values are returned in each `data[].embedding` field.","enum":["float","base64"],"default":"float","example":"float","key$":"encoding_format"}},"x-ref":"#/components/schemas/embeddings_request","index$":1}}}},"parameters":[]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const embedding_ref01_ent = client.Embedding()
    let embedding_ref01_data = setup.data.new.embedding['embedding_ref01']

    embedding_ref01_data = (await embedding_ref01_ent.create(embedding_ref01_data)).data()
    assert(null != embedding_ref01_data)


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
      '../../../../.sdk/test/entity/embedding/EmbeddingTestData.json')

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
    ['embedding01','embedding02','embedding03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'DIGITALOCEAN_TEST_EMBEDDING_ENTID': idmap,
    'DIGITALOCEAN_TEST_LIVE': 'FALSE',
    'DIGITALOCEAN_TEST_EXPLAIN': 'FALSE',
    'DIGITALOCEAN_APIKEY': '',
  })

  idmap = env['DIGITALOCEAN_TEST_EMBEDDING_ENTID']

  const live = 'TRUE' === env.DIGITALOCEAN_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['DIGITALOCEAN_TEST_EMBEDDING_ENTID']
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
  
