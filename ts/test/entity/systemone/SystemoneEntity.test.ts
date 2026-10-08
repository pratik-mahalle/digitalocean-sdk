

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


describe('SystemoneEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when DIGITALOCEAN_TEST_LIVE=TRUE.
  afterEach(liveDelay('DIGITALOCEAN_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = DigitaloceanSDK.test()
    const ent = testsdk.Systemone()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = DigitaloceanSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.Systemone().create({"answers":"x","model":1,"questions":"x","state":"x","usage":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.DIGITALOCEAN_TEST_LIVE
    for (const op of ['create']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'systemone.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"answers":{"a":true,"h":"Answers","n":"answers","r":true,"sh":"A map of question name to answer, using the same keys as the request's `questions` object.","t":"`$OBJECT`","key$":"answers","index$":0},"model":{"a":true,"h":"Model","n":"model","r":true,"sh":"Model ID that produced the response.","t":"`$STRING`","key$":"model","index$":1},"questions":{"a":true,"h":"Questions","n":"questions","r":true,"sh":"A map of question name to question definition.","t":"`$OBJECT`","union":{"branches":2,"count":1,"depth":3},"key$":"questions","index$":2},"state":{"a":true,"h":"State","n":"state","r":true,"sh":"The state to evaluate.","t":"`$STRING`","key$":"state","index$":3},"usage":{"a":true,"h":"Usage","n":"usage","r":true,"sh":"Token usage for the request.","t":"`$OBJECT`","key$":"usage","index$":4}},"name":"systemone","op":{"create":{"input":"data","name":"create","points":[{"a":true,"co":{"id":"POST /v1/systemone","source":"openapi3","version":2},"g":{},"k":"http","m":"POST","o":"/v1/systemone","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v1"},{"lit":"systemone"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"}},"relations":{"ancestors":[]},"key$":"systemone","name__orig":"systemone","Name":"Systemone","name_":"systemone","name-":"systemone","NAME":"SYSTEMONE","index$":216}, {"active":true,"entity":"systemone","key$":"BasicSystemoneFlow","kind":"basic","name":"BasicSystemoneFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"systemone_ref01"},"m":{},"o":"create","s":[],"v":[],"index$":0}]}, 'Systemone', {"POST /v1/systemone":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","description":"Request payload for a System One evaluation.","required":["state","model","questions"],"properties":{"state":{"type":"string","description":"The state to evaluate.","example":"The customer said the delivery was late but the product quality was excellent.","key$":"state"},"model":{"type":"string","description":"Model ID used to evaluate the request.","example":"typesafe-jev-1.13.0","key$":"model"},"questions":{"type":"object","description":"A map of question name to question definition. Each key becomes the corresponding key in the response's `answers` object.","additionalProperties":{"type":"object","description":"A single question to evaluate against the provided state. The `type` field determines how `criteria` should be shaped and how the corresponding answer is returned.","required":["type","instructions"],"properties":{"type":{"type":"string","description":"Question discriminator. Use `noul` for a boolean-like true/false check, `choice` to select one option from a fixed set, and `score` to rate against an ordered rubric.","enum":[],"example":"choice"},"instructions":{"description":"The prompt describing what the question is asking the model to evaluate.","type":"string","example":"What is the overall sentiment of this feedback?"},"criteria":{"description":"Optional criteria payload. The expected shape depends on `type`: for `noul`, an optional object describing the true/false semantics; for `choice`, an object mapping each option name to a description of that option (minimum 2 options, maximum 255 options); for `score`, an ordered array of descriptive rubric levels (minimum 2, maximum 10 levels). Score levels must be descriptive labels, such as `[\"poor\", \"average\", \"excellent\"]`, not numeric values.","oneOf":[],"example":{}}},"x-ref":"#/components/schemas/systemone_question"},"example":{"sentiment":{"type":"choice","instructions":"What is the overall sentiment of this feedback?","criteria":{"positive":"Customer is happy overall","negative":"Customer is unhappy overall","mixed":"Customer has both good and bad things to say"}},"needs_followup":{"type":"noul","instructions":"Does this feedback require a follow-up from the support team?"}},"key$":"questions"}},"x-ref":"#/components/schemas/systemone_request","index$":1}}}},"parameters":[]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const systemone_ref01_ent = client.Systemone()
    let systemone_ref01_data = setup.data.new.systemone['systemone_ref01']

    systemone_ref01_data = (await systemone_ref01_ent.create(systemone_ref01_data)).data()
    assert(null != systemone_ref01_data)


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
      '../../../../.sdk/test/entity/systemone/SystemoneTestData.json')

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
    ['systemone01','systemone02','systemone03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'DIGITALOCEAN_TEST_SYSTEMONE_ENTID': idmap,
    'DIGITALOCEAN_TEST_LIVE': 'FALSE',
    'DIGITALOCEAN_TEST_EXPLAIN': 'FALSE',
    'DIGITALOCEAN_APIKEY': '',
  })

  idmap = env['DIGITALOCEAN_TEST_SYSTEMONE_ENTID']

  const live = 'TRUE' === env.DIGITALOCEAN_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['DIGITALOCEAN_TEST_SYSTEMONE_ENTID']
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
  
