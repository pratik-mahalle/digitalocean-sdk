

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


describe('ResyncEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when DIGITALOCEAN_TEST_LIVE=TRUE.
  afterEach(liveDelay('DIGITALOCEAN_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = DigitaloceanSDK.test()
    const ent = testsdk.Resync()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = DigitaloceanSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.Resync().create({"server_ref":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.DIGITALOCEAN_TEST_LIVE
    for (const op of ['create']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'resync.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"authorization":{"a":true,"h":"Authorization","n":"authorization","r":false,"sh":"Set when discovery could not run because `user_id` has no authorized connection to this server yet.","t":"`$ANY`","key$":"authorization","index$":0},"mcpServer":{"a":true,"h":"Mcp Server","n":"mcpServer","r":false,"sh":"The server, including `syncStatus` and `syncError`.","t":"`$ANY`","key$":"mcpServer","index$":1},"pending":{"a":true,"h":"Pending","n":"pending","r":false,"sh":"True when discovery is still running (HTTP 202).","t":"`$BOOLEAN`","key$":"pending","index$":2},"tools":{"a":true,"h":"Tools","n":"tools","r":false,"sh":"Every tool discovered on the server when discovery finished in time; empty when pending is true.","t":"`$ARRAY`","key$":"tools","index$":3},"user_id":{"a":true,"h":"User Id","n":"user_id","r":false,"sh":"Required for a server registered with `credentialRefSource` connection: discovery reaches the server as this user, through their connection, because such a server has no team-wide credential.","t":"`$STRING`","key$":"user_id","index$":4}},"name":"resync","op":{"create":{"input":"data","name":"create","points":[{"a":true,"co":{"id":"POST /v2/action-gateway/mcp-servers/{server_ref}/resync","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":"docs","k":"param","n":"server_ref","or":"server_ref","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"POST","o":"/v2/action-gateway/mcp-servers/{server_ref}/resync","q":{"exist":["server_ref"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v2"},{"lit":"action-gateway"},{"lit":"mcp-servers"},{"var":"server_ref"},{"lit":"resync"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"}},"relations":{"ancestors":[["$.main.kit.entity.mcp_server"]]},"key$":"resync","name__orig":"resync","Name":"Resync","name_":"resync","name-":"resync","NAME":"RESYNC","index$":198}, {"active":true,"entity":"resync","key$":"BasicResyncFlow","kind":"basic","name":"BasicResyncFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"resync_ref01"},"m":{"server_ref":"server_ref01"},"o":"create","s":[],"v":[],"index$":0}]}, 'Resync', {"POST /v2/action-gateway/mcp-servers/{server_ref}/resync":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","properties":{"user_id":{"type":"string","description":"Required for a server registered with `credentialRefSource` connection: discovery reaches the server as this user, through their connection, because such a server has no team-wide credential. Ignored otherwise.","example":"alice","key$":"user_id"}},"description":"Selects the server to discover.","x-ref":"#/components/schemas/mcp_server_resync","index$":1},"example":{}}}},"parameters":[{"name":"server_ref","in":"path","required":true,"description":"Server identifier (`serverRef`) of one of your team's MCP servers.","schema":{"type":"string"},"example":"docs","x-ref":"#/components/parameters/server_ref","index$":0}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const resync_ref01_ent = client.Resync()
    let resync_ref01_data = setup.data.new.resync['resync_ref01']
    resync_ref01_data['server_ref'] = setup.idmap['server_ref01']

    resync_ref01_data = (await resync_ref01_ent.create(resync_ref01_data)).data()
    assert(null != resync_ref01_data)


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
      '../../../../.sdk/test/entity/resync/ResyncTestData.json')

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
    ['resync01','resync02','resync03','mcp_server01','mcp_server02','mcp_server03','server_ref01'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'DIGITALOCEAN_TEST_RESYNC_ENTID': idmap,
    'DIGITALOCEAN_TEST_LIVE': 'FALSE',
    'DIGITALOCEAN_TEST_EXPLAIN': 'FALSE',
    'DIGITALOCEAN_APIKEY': '',
  })

  idmap = env['DIGITALOCEAN_TEST_RESYNC_ENTID']

  const live = 'TRUE' === env.DIGITALOCEAN_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['DIGITALOCEAN_TEST_RESYNC_ENTID']
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
  
