

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


describe('OutputViewEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when DIGITALOCEAN_TEST_LIVE=TRUE.
  afterEach(liveDelay('DIGITALOCEAN_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = DigitaloceanSDK.test()
    const ent = testsdk.OutputView()
    assert(null != ent)
  })


  class FailHook extends BaseFeature {
    name = 'failhook'
    version = '0.0.1'
    active = true
    unexpected = 0
    init() { }
    PreSpec() { throw new Error('output_view hook failed') }
    PreUnexpected() { this.unexpected++ }
  }

  test('stream-error', async () => {
    const offline = { net: { offline: true } }
    await assert.rejects(async () => {
      for await (const _item of DigitaloceanSDK.test(offline).OutputView().stream('list')) { }
    }, /offline/)

    for await (const _item of DigitaloceanSDK.test(offline).OutputView()
      .stream('list', undefined, { ctrl: { throw: false } })) { }

    if (null != (config as any).feature?.rbac) {
      const denied = DigitaloceanSDK.test(undefined, { feature: { rbac: { active: true, deny: true } } })
      await assert.rejects(async () => {
        for await (const _item of denied.OutputView().stream('list')) { }
      }, (err: any) => 'rbac_denied' === err.code)
    }
  })

  test('stream-ctrl', async () => {
    const explain: any = {}
    const ctrl: any = { explain }
    for await (const _item of DigitaloceanSDK.test().OutputView().stream('list', undefined, { ctrl })) { }
    assert.deepStrictEqual(Object.keys(ctrl), ['explain'])
    assert(explain === ctrl.explain && 0 < Object.keys(explain).length)
  })

  test('unexpected', async () => {
    const hook = new FailHook()
    const client = new DigitaloceanSDK({ feature: { test: { active: true } }, extend: [hook] })
    await assert.rejects(client.OutputView().list(), /hook failed/)
    assert(0 < hook.unexpected)

    const fired = hook.unexpected
    assert.strictEqual(await client.OutputView().list(undefined, { throw: false }), undefined)
    assert(fired < hook.unexpected)
  })

  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = DigitaloceanSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.OutputView().list({"page_size":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.DIGITALOCEAN_TEST_LIVE
    for (const op of ['create', 'list', 'load', 'remove']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'output_view.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"audit":{"a":true,"h":"Audit","n":"audit","r":false,"sh":"Null on a preview, which stores nothing.","t":"`$OBJECT`","key$":"audit","index$":0},"description":{"a":true,"h":"Description","n":"description","r":false,"sh":"View description.","t":"`$STRING`","key$":"description","index$":1},"fields":{"a":true,"h":"Fields","n":"fields","op":{"create":{"req":true,"type":"`$ARRAY`"}},"r":false,"sh":"The dotted output paths a projection keeps; arrays are traversed element-wise.","t":"`$ARRAY`","key$":"fields","index$":2},"id":{"a":true,"h":"Id","n":"id","r":false,"t":"`$STRING`","key$":"id","index$":3},"kind":{"a":true,"h":"Kind","n":"kind","r":false,"sh":"`OUTPUT_VIEW_KIND_PROJECTION` or `OUTPUT_VIEW_KIND_TRANSFORM`.","t":"`$STRING`","key$":"kind","index$":4},"name":{"a":true,"h":"Name","n":"name","op":{"create":{"req":true,"type":"`$STRING`"}},"r":false,"sh":"View name, unique per tool version among its owner's views.","t":"`$STRING`","key$":"name","index$":5},"output_schema":{"a":true,"h":"Output Schema","n":"output_schema","r":false,"sh":"The JSON Schema every result of this view satisfies.","t":"`$OBJECT`","key$":"output_schema","index$":6},"team_id":{"a":true,"h":"Team Id","n":"team_id","r":false,"sh":"Your team's ID on your team's views, and empty for a view DigitalOcean publishes to every team.","t":"`$STRING`","key$":"team_id","index$":7},"tool":{"a":true,"h":"Tool","n":"tool","r":false,"sh":"The provider-qualified tool slug, for example `exa_search`.","t":"`$STRING`","key$":"tool","index$":8},"tool_id":{"a":true,"h":"Tool Id","n":"tool_id","r":false,"sh":"The opaque identity of the exact tool version the view is bound to; tool and version are its readable coordinates.","t":"`$STRING`","key$":"tool_id","index$":9},"version":{"a":true,"h":"Version","n":"version","r":false,"sh":"The tool version, for example `v3`.","t":"`$STRING`","key$":"version","index$":10},"view_id":{"a":true,"h":"View Id","n":"view_id","r":false,"sh":"Output view ID, for example `ov_` followed by 32 hex digits.","t":"`$STRING`","key$":"view_id","index$":11}},"id":{"field":"id","name":"id"},"name":"output_view","op":{"create":{"input":"data","name":"create","points":[{"a":true,"co":{"id":"POST /v2/action-gateway/output-views","source":"openapi3","version":2},"g":{},"k":"http","m":"POST","o":"/v2/action-gateway/output-views","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v2"},{"lit":"action-gateway"},{"lit":"output-views"}],"t":{"req":"`reqdata`","res":"`body.view`"},"index$":0},{"a":true,"co":{"id":"POST /v2/action-gateway/output-views/preview","source":"openapi3","version":2},"g":{},"k":"http","m":"POST","o":"/v2/action-gateway/output-views/preview","q":{"$action":"preview"},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v2"},{"lit":"action-gateway"},{"lit":"output-views"},{"lit":"preview"}],"t":{"req":"`reqdata`","res":"`body.view`"},"index$":1}],"key$":"create"},"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /v2/action-gateway/output-views","source":"openapi3","version":2},"g":{"query":[{"a":true,"ex":20,"k":"query","n":"page_size","or":"page_size","r":false,"t":"`$INTEGER`","index$":0},{"a":true,"ex":"ZXhhX3dlYl9zZWFyY2hAMQ","k":"query","n":"page_token","or":"page_token","r":false,"t":"`$STRING`","index$":1},{"a":true,"ex":"exa_web_search","k":"query","n":"tool","or":"tool","r":false,"t":"`$STRING`","index$":2},{"a":true,"ex":"tul_exa_web_search","k":"query","n":"tool_id","or":"tool_id","r":false,"t":"`$STRING`","index$":3}]},"k":"http","m":"GET","o":"/v2/action-gateway/output-views","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v2"},{"lit":"action-gateway"},{"lit":"output-views"}],"t":{"req":"`reqdata`","res":"`body.views`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /v2/action-gateway/output-views/{view_id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":"ov_4f0c2a9d8e1b47c6a3d5f7e9b1c3a5d7","k":"param","n":"id","or":"view_id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/v2/action-gateway/output-views/{view_id}","q":{"exist":["id"]},"r":{"param":{"view_id":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v2"},{"lit":"action-gateway"},{"lit":"output-views"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body.view`"},"index$":0}],"key$":"load"},"remove":{"input":"data","name":"remove","points":[{"a":true,"co":{"id":"DELETE /v2/action-gateway/output-views/{view_id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":"ov_4f0c2a9d8e1b47c6a3d5f7e9b1c3a5d7","k":"param","n":"id","or":"view_id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"DELETE","o":"/v2/action-gateway/output-views/{view_id}","q":{"exist":["id"]},"r":{"param":{"view_id":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v2"},{"lit":"action-gateway"},{"lit":"output-views"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body.view`"},"index$":0}],"key$":"remove"}},"relations":{"ancestors":[]},"key$":"output_view","name__orig":"output_view","Name":"OutputView","name_":"output_view","name-":"output-view","NAME":"OUTPUT_VIEW","index$":183}, {"active":true,"entity":"output_view","key$":"BasicOutputViewFlow","kind":"basic","name":"BasicOutputViewFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"output_view_ref01"},"m":{},"o":"create","s":[],"v":[],"index$":0},{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"output_view_ref01"}}],"index$":1},{"a":true,"d":{},"i":{"ref":"output_view_ref01","srcdatavar":"output_view_ref01_data","suffix":"_dt0"},"m":{"id":"output_view01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-output_view_ref01"}}],"index$":2},{"a":true,"d":{},"i":{"ref":"output_view_ref01","suffix":"_rm0"},"m":{"id":"output_view01"},"o":"remove","s":[],"v":[],"index$":3},{"a":true,"d":{},"i":{"suffix":"_rt0"},"m":{},"o":"list","s":[],"v":[{"apply":"ItemNotExists","def":{"ref":"output_view_ref01"}}],"index$":4}]}, 'OutputView', {"POST /v2/action-gateway/output-views":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","description":"Describes a projection of one tool version's output.","required":["name","fields"],"properties":{"tool":{"type":"string","description":"Exactly one of tool or `tool_id` selects the tool version. tool is a provider-qualified slug, optionally pinned as `<tool>@<version>`. You can bind only the released version your catalog exposes: an unpinned slug resolves it and the response echoes it as version; a pin must equal it, and a `tool_id` (the opaque identity from tool search) must be that version. Any other version returns 404.","example":"exa_web_search","key$":"tool"},"tool_id":{"type":"string","description":"Opaque ID of the tool version; see tool.","example":"","key$":"tool_id"},"name":{"type":"string","pattern":"^[a-z][a-z0-9_-]{0,63}$","description":"View name. Must match `^`[a-z]``[a-z0-9_-]`{0,63}$` and be unique per tool version within your team.","example":"titles-and-urls","key$":"name"},"description":{"type":"string","maxLength":512,"example":"Keep only result titles and URLs.","description":"Optional description. At most 512 bytes.","key$":"description"},"fields":{"type":"array","minItems":1,"maxItems":64,"description":"Output paths to keep, 1 to 64 of them. Each is a dotted path of up to 8 segments made of `[A-Za-z0-9_-]`, and must be declared by the tool's output schema; arrays are traversed element-wise. Paths may not repeat or be a prefix of one another. The tool version must declare an object output schema.","items":{"type":"string"},"example":["results.title","results.url"],"key$":"fields"}},"x-ref":"#/components/schemas/output_view_create","index$":1},"example":{"tool":"exa_web_search","name":"titles-and-urls","description":"Keep only result titles and URLs.","fields":["results.title","results.url"]}}}},"parameters":[]},"POST /v2/action-gateway/output-views/preview":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","description":"Carries the same fields as CreateOutputViewRequest. name and description are optional here: when present they are validated as on create, so a form can preview before the view is named.","required":["fields"],"properties":{"tool":{"type":"string","example":"exa_web_search","description":"Tool slug, optionally pinned; as on create."},"tool_id":{"type":"string","example":"","description":"Opaque ID of the tool version; as on create."},"name":{"type":"string","example":"titles-and-urls","description":"Optional view name, validated as on create when present."},"description":{"type":"string","example":"Keep only result titles and URLs.","description":"Optional description, validated as on create when present."},"fields":{"type":"array","items":{"type":"string"},"example":["results.title","results.url"],"description":"Output paths to keep; as on create."}},"x-ref":"#/components/schemas/output_view_preview"},"example":{"tool":"exa_web_search","fields":["results.title","results.url"]}}}},"parameters":[]},"GET /v2/action-gateway/output-views":{"protocol":"http","parameters":[{"name":"tool","in":"query","required":false,"description":"At most one of tool or `tool_id`, as on create. With one set, the list is the published views plus your team's own on that tool version. With neither, it is every live view your team owns plus every published view on a tool version your catalog exposes, across tools.","schema":{"type":"string"},"example":"exa_web_search","x-ref":"#/components/parameters/output_view_tool","index$":0},{"name":"tool_id","in":"query","required":false,"description":"Opaque ID of the tool version; see tool.","schema":{"type":"string"},"example":"tul_exa_web_search","x-ref":"#/components/parameters/output_view_tool_id","index$":1},{"name":"page_size","in":"query","required":false,"description":"Page size, 1 to 100. Defaults to 20 when omitted or 0; other values are rejected with 400.","schema":{"type":"integer","minimum":1,"maximum":100,"default":20},"example":20,"x-ref":"#/components/parameters/page_size","index$":2},{"name":"page_token","in":"query","required":false,"description":"`next_page_token` from the previous response. Valid only with the same tool selection; otherwise the request is rejected with 400.","schema":{"type":"string"},"example":"ZXhhX3dlYl9zZWFyY2hAMQ","x-ref":"#/components/parameters/page_token","index$":3}]},"GET /v2/action-gateway/output-views/{view_id}":{"protocol":"http","parameters":[{"name":"view_id","in":"path","required":true,"description":"Output view ID.","schema":{"type":"string"},"example":"ov_4f0c2a9d8e1b47c6a3d5f7e9b1c3a5d7","x-ref":"#/components/parameters/view_id","index$":0}]},"DELETE /v2/action-gateway/output-views/{view_id}":{"protocol":"http","parameters":[{"name":"view_id","in":"path","required":true,"description":"Output view ID.","schema":{"type":"string"},"example":"ov_4f0c2a9d8e1b47c6a3d5f7e9b1c3a5d7","x-ref":"#/components/parameters/view_id","index$":0}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const output_view_ref01_ent = client.OutputView()
    let output_view_ref01_data = setup.data.new.output_view['output_view_ref01']

    output_view_ref01_data = (await output_view_ref01_ent.create(output_view_ref01_data)).data()
    assert(null != output_view_ref01_data.id)


    // LIST
    const output_view_ref01_match: any = {}

    const output_view_ref01_list = (await output_view_ref01_ent.list(output_view_ref01_match)).map((e: any) => e.data())

    assert(!isempty(select(output_view_ref01_list, { id: output_view_ref01_data.id })))


    // LOAD
    const output_view_ref01_match_dt0: any = {}
    output_view_ref01_match_dt0.id = output_view_ref01_data.id
    const output_view_ref01_data_dt0 = (await output_view_ref01_ent.load(output_view_ref01_match_dt0)).data()
    assert(output_view_ref01_data_dt0.id === output_view_ref01_data.id)


    // REMOVE
    const output_view_ref01_match_rm0: any = { id: output_view_ref01_data.id }
    await output_view_ref01_ent.remove(output_view_ref01_match_rm0)
  

    // LIST
    const output_view_ref01_match_rt0: any = {}

    const output_view_ref01_list_rt0 = (await output_view_ref01_ent.list(output_view_ref01_match_rt0)).map((e: any) => e.data())

    assert(isempty(select(output_view_ref01_list_rt0, { id: output_view_ref01_data.id })))


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
      '../../../../.sdk/test/entity/output_view/OutputViewTestData.json')

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
    ['output_view01','output_view02','output_view03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'DIGITALOCEAN_TEST_OUTPUT_VIEW_ENTID': idmap,
    'DIGITALOCEAN_TEST_LIVE': 'FALSE',
    'DIGITALOCEAN_TEST_EXPLAIN': 'FALSE',
    'DIGITALOCEAN_APIKEY': '',
  })

  idmap = env['DIGITALOCEAN_TEST_OUTPUT_VIEW_ENTID']

  const live = 'TRUE' === env.DIGITALOCEAN_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['DIGITALOCEAN_TEST_OUTPUT_VIEW_ENTID']
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
  
