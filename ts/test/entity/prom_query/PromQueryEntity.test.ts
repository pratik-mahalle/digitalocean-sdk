

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


describe('PromQueryEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when DIGITALOCEAN_TEST_LIVE=TRUE.
  afterEach(liveDelay('DIGITALOCEAN_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = DigitaloceanSDK.test()
    const ent = testsdk.PromQuery()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = DigitaloceanSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.PromQuery().load({"query_id":1,"query":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.DIGITALOCEAN_TEST_LIVE
    for (const op of ['create', 'load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'prom_query.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"result":{"a":true,"h":"Result","n":"result","r":true,"sh":"Result payload shape depends on `resultType`.","t":"`$ANY`","union":{"branches":3,"count":2,"depth":6},"key$":"result","index$":0},"resultType":{"a":true,"h":"Result Type","n":"resultType","r":true,"t":"`$STRING`","key$":"resultType","index$":1}},"name":"prom_query","op":{"create":{"input":"data","name":"create","points":[{"a":true,"co":{"id":"POST /v2/insights/query/{region}/prom/api/v1/query","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":"nyc3","k":"param","n":"query_id","or":"region","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"POST","o":"/v2/insights/query/{region}/prom/api/v1/query","q":{"exist":["query_id"]},"r":{"param":{"region":"query_id"}},"rb":{"fields":[{"name":"query"},{"name":"time"},{"name":"timeout"}],"kind":"form","media":"application/x-www-form-urlencoded"},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v2"},{"lit":"insights"},{"lit":"query"},{"var":"query_id"},{"lit":"prom"},{"lit":"api"},{"lit":"v1"},{"lit":"query"}],"t":{"req":"`reqdata`","res":"`body.data`"},"index$":0}],"key$":"create"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /v2/insights/query/{region}/prom/api/v1/query","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":"nyc3","k":"param","n":"query_id","or":"region","r":true,"t":"`$STRING`","index$":0}],"query":[{"a":true,"ex":"do.droplets.cpu_time","k":"query","n":"query","or":"query","r":true,"t":"`$STRING`","index$":0},{"a":true,"ex":"1620683817","k":"query","n":"time","or":"time","r":false,"t":"`$STRING`","index$":1},{"a":true,"ex":"30s","k":"query","n":"timeout","or":"timeout","r":false,"t":"`$STRING`","index$":2}]},"k":"http","m":"GET","o":"/v2/insights/query/{region}/prom/api/v1/query","q":{"exist":["query","query_id"]},"r":{"param":{"region":"query_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v2"},{"lit":"insights"},{"lit":"query"},{"var":"query_id"},{"lit":"prom"},{"lit":"api"},{"lit":"v1"},{"lit":"query"}],"t":{"req":"`reqdata`","res":"`body.data`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"prom_query","name__orig":"prom_query","Name":"PromQuery","name_":"prom_query","name-":"prom-query","NAME":"PROM_QUERY","index$":189}, {"active":true,"entity":"prom_query","key$":"BasicPromQueryFlow","kind":"basic","name":"BasicPromQueryFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"prom_query_ref01"},"m":{"query_id":"query01"},"o":"create","s":[],"v":[],"index$":0},{"a":true,"d":{},"i":{"ref":"prom_query_ref01","srcdatavar":"prom_query_ref01_data","suffix":"_dt0"},"m":{"id":"prom_query01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-prom_query_ref01"}}],"index$":1}]}, 'PromQuery', {"POST /v2/insights/query/{region}/prom/api/v1/query":{"protocol":"http","requestBody":{"required":true,"content":{"application/x-www-form-urlencoded":{"schema":{"type":"object","required":["query"],"properties":{"query":{"type":"string","description":"A PromQL expression to evaluate.","example":"do.droplets.cpu_time"},"time":{"type":"string","description":"Evaluation timestamp. RFC3339 or UNIX timestamp.","example":"1620683817"},"timeout":{"type":"string","description":"Optional evaluation timeout duration.","example":"30s"}}}}}},"parameters":[{"in":"path","name":"region","description":"The datacenter region slug for the query.","required":true,"schema":{"type":"string"},"example":"nyc3","x-ref":"#/components/parameters/parameters_region","index$":0}]},"GET /v2/insights/query/{region}/prom/api/v1/query":{"protocol":"http","parameters":[{"in":"path","name":"region","description":"The datacenter region slug for the query.","required":true,"schema":{"type":"string"},"example":"nyc3","x-ref":"#/components/parameters/parameters_region","index$":0},{"in":"query","name":"query","description":"A PromQL expression. This may be a metric selector (for example `do.droplets.cpu_time`) or a fuller expression (for example `rate(do.droplets.cpu_time[5m])`).","required":true,"schema":{"type":"string"},"example":"do.droplets.cpu_time","x-ref":"#/components/parameters/query","index$":1},{"in":"query","name":"time","description":"Evaluation timestamp for an instant query. Accepts a RFC3339 string or a UNIX timestamp. Defaults to now when omitted.","required":false,"schema":{"type":"string"},"example":"1620683817","x-ref":"#/components/parameters/time","index$":2},{"in":"query","name":"timeout","description":"Optional evaluation timeout as a Prometheus duration string.","required":false,"schema":{"type":"string"},"example":"30s","x-ref":"#/components/parameters/timeout","index$":3}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const prom_query_ref01_ent = client.PromQuery()
    let prom_query_ref01_data = setup.data.new.prom_query['prom_query_ref01']
    prom_query_ref01_data['query_id'] = setup.idmap['query01']

    prom_query_ref01_data = (await prom_query_ref01_ent.create(prom_query_ref01_data)).data()
    assert(null != prom_query_ref01_data)



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
      '../../../../.sdk/test/entity/prom_query/PromQueryTestData.json')

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
    ['prom_query01','prom_query02','prom_query03','query01'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'DIGITALOCEAN_TEST_PROM_QUERY_ENTID': idmap,
    'DIGITALOCEAN_TEST_LIVE': 'FALSE',
    'DIGITALOCEAN_TEST_EXPLAIN': 'FALSE',
    'DIGITALOCEAN_APIKEY': '',
  })

  idmap = env['DIGITALOCEAN_TEST_PROM_QUERY_ENTID']

  const live = 'TRUE' === env.DIGITALOCEAN_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['DIGITALOCEAN_TEST_PROM_QUERY_ENTID']
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
  
