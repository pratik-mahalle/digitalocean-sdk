

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


describe('LogsSearchEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when DIGITALOCEAN_TEST_LIVE=TRUE.
  afterEach(liveDelay('DIGITALOCEAN_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = DigitaloceanSDK.test()
    const ent = testsdk.LogsSearch()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = DigitaloceanSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.LogsSearch().create({"query_id":1,"time_range":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.DIGITALOCEAN_TEST_LIVE
    for (const op of ['create']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'logs_search.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"data":{"a":true,"h":"Data","n":"data","r":false,"sh":"Matching log records.","t":"`$ARRAY`","key$":"data","index$":0},"filter":{"a":true,"h":"Filter","n":"filter","r":false,"sh":"A boolean filter tree for logs queries.","t":"`$OBJECT`","key$":"filter","index$":1},"order_by":{"a":true,"h":"Order By","n":"order_by","r":false,"sh":"Sort clauses applied to the result set.","t":"`$ARRAY`","key$":"order_by","index$":2},"pagination":{"a":true,"h":"Pagination","n":"pagination","r":false,"sh":"Pagination response.","t":"`$OBJECT`","key$":"pagination","index$":3},"time_range":{"a":true,"h":"Time Range","n":"time_range","r":true,"sh":"An inclusive query time window.","t":"`$OBJECT`","key$":"time_range","index$":4}},"name":"logs_search","op":{"create":{"input":"data","name":"create","points":[{"a":true,"co":{"id":"POST /v2/insights/query/{region}/logs/search","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":"nyc3","k":"param","n":"query_id","or":"region","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"POST","o":"/v2/insights/query/{region}/logs/search","q":{"exist":["query_id"]},"r":{"param":{"region":"query_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v2"},{"lit":"insights"},{"lit":"query"},{"var":"query_id"},{"lit":"logs"},{"lit":"search"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"}},"relations":{"ancestors":[]},"key$":"logs_search","name__orig":"logs_search","Name":"LogsSearch","name_":"logs_search","name-":"logs-search","NAME":"LOGS_SEARCH","index$":171}, {"active":true,"entity":"logs_search","key$":"BasicLogsSearchFlow","kind":"basic","name":"BasicLogsSearchFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"logs_search_ref01"},"m":{"query_id":"query01"},"o":"create","s":[],"v":[],"index$":0}]}, 'LogsSearch', {"POST /v2/insights/query/{region}/logs/search":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","description":"Request body for searching logs.","required":["time_range"],"properties":{"time_range":{"type":"object","description":"An inclusive query time window.","required":["from","to"],"properties":{"from":{"type":"object","description":"A single point in time. Exactly one value form is set per message.","minProperties":1,"maxProperties":1,"properties":{"absolute":{},"relative":{},"unix_nano":{}},"x-ref":"#/components/schemas/logs_time_instant"},"to":{"type":"object","description":"A single point in time. Exactly one value form is set per message.","minProperties":1,"maxProperties":1,"properties":{"absolute":{},"relative":{},"unix_nano":{}},"x-ref":"#/components/schemas/logs_time_instant"}},"x-ref":"#/components/schemas/logs_time_range","key$":"time_range"},"filter":{"type":"object","description":"A boolean filter tree for logs queries. Exactly one node is set per message.","minProperties":1,"maxProperties":1,"properties":{"condition":{"type":"object","description":"A single field comparison in a logs filter expression.","required":["field","operator"],"properties":{"field":{},"operator":{},"value":{}},"x-ref":"#/components/schemas/logs_filter_condition"},"and":{"type":"object","required":["expressions"],"properties":{"expressions":{}}},"or":{"type":"object","required":["expressions"],"properties":{"expressions":{}}},"not":{"type":"object","description":"A boolean filter tree for logs queries. Exactly one node is set per message.","minProperties":1,"maxProperties":1,"properties":"[Circular *paths./v2/insights/query/{region}/logs/search.post.requestBody.content.application/json.schema.properties.filter.properties]","x-ref":"#/components/schemas/logs_filter_expression"},"text_search":{"type":"object","description":"A substring search across the log body, service name, and resource URN.","required":["query"],"properties":{"query":{}}}},"x-ref":"#/components/schemas/logs_filter_expression","key$":"filter"},"order_by":{"type":"array","description":"Sort clauses applied to the result set.","items":{"type":"object","description":"A sort clause for logs search results.","required":["field"],"properties":{"field":{"type":"object","description":"A reference to a logical field for filters, ordering, grouping, or facets.","required":[],"properties":{},"x-ref":"#/components/schemas/logs_field_ref"},"direction":{"type":"string","description":"The sort direction. Omit to use the server default.","enum":[],"example":"SORT_DIRECTION_DESC"}},"x-ref":"#/components/schemas/logs_order_by"},"key$":"order_by"},"pagination":{"type":"object","description":"Opaque keyset pagination request. Cursors are only valid when ordering by `timestamp` alone.","properties":{"limit":{"type":"integer","format":"int32","description":"Maximum number of results to return. Defaults to 100 and is clamped to 1000.","default":100,"minimum":1,"maximum":1000,"example":100},"cursor":{"type":"string","description":"Opaque cursor from a previous response.","example":"eyJ0cyI6MTc1NjY4NDgwMDAwMDAwMDAwfQ"}},"x-ref":"#/components/schemas/logs_pagination_request","key$":"pagination"}},"x-ref":"#/components/schemas/logs_search_request","index$":1}}}},"parameters":[{"in":"path","name":"region","description":"The datacenter region slug for the query.","required":true,"schema":{"type":"string"},"example":"nyc3","x-ref":"#/components/parameters/parameters_region","index$":0}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const logs_search_ref01_ent = client.LogsSearch()
    let logs_search_ref01_data = setup.data.new.logs_search['logs_search_ref01']
    logs_search_ref01_data['query_id'] = setup.idmap['query01']

    logs_search_ref01_data = (await logs_search_ref01_ent.create(logs_search_ref01_data)).data()
    assert(null != logs_search_ref01_data)


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
      '../../../../.sdk/test/entity/logs_search/LogsSearchTestData.json')

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
    ['logs_search01','logs_search02','logs_search03','query01'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'DIGITALOCEAN_TEST_LOGS_SEARCH_ENTID': idmap,
    'DIGITALOCEAN_TEST_LIVE': 'FALSE',
    'DIGITALOCEAN_TEST_EXPLAIN': 'FALSE',
    'DIGITALOCEAN_APIKEY': '',
  })

  idmap = env['DIGITALOCEAN_TEST_LOGS_SEARCH_ENTID']

  const live = 'TRUE' === env.DIGITALOCEAN_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['DIGITALOCEAN_TEST_LOGS_SEARCH_ENTID']
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
  
