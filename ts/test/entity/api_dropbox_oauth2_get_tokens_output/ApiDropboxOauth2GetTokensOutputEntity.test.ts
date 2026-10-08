

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


describe('ApiDropboxOauth2GetTokensOutputEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when DIGITALOCEAN_TEST_LIVE=TRUE.
  afterEach(liveDelay('DIGITALOCEAN_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = DigitaloceanSDK.test()
    const ent = testsdk.ApiDropboxOauth2GetTokensOutput()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = DigitaloceanSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.ApiDropboxOauth2GetTokensOutput().create({"code":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.DIGITALOCEAN_TEST_LIVE
    for (const op of ['create']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'api_dropbox_oauth2_get_tokens_output.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"code":{"a":true,"h":"Code","n":"code","r":false,"sh":"The oauth2 code from google","t":"`$STRING`","key$":"code","index$":0},"redirect_url":{"a":true,"h":"Redirect Url","n":"redirect_url","r":false,"sh":"Redirect url","t":"`$STRING`","key$":"redirect_url","index$":1},"refresh_token":{"a":true,"h":"Refresh Token","n":"refresh_token","r":false,"sh":"The refresh token","t":"`$STRING`","key$":"refresh_token","index$":2},"token":{"a":true,"h":"Token","n":"token","r":false,"sh":"The access token","t":"`$STRING`","key$":"token","index$":3}},"name":"api_dropbox_oauth2_get_tokens_output","op":{"create":{"input":"data","name":"create","points":[{"a":true,"co":{"id":"POST /v2/gen-ai/oauth2/dropbox/tokens","source":"openapi3","version":2},"g":{},"k":"http","m":"POST","o":"/v2/gen-ai/oauth2/dropbox/tokens","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v2"},{"lit":"gen-ai"},{"lit":"oauth2"},{"lit":"dropbox"},{"lit":"tokens"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"}},"relations":{"ancestors":[]},"key$":"api_dropbox_oauth2_get_tokens_output","name__orig":"api_dropbox_oauth2_get_tokens_output","Name":"ApiDropboxOauth2GetTokensOutput","name_":"api_dropbox_oauth2_get_tokens_output","name-":"api-dropbox-oauth2-get-tokens-output","NAME":"API_DROPBOX_OAUTH2_GET_TOKENS_OUTPUT","index$":29}, {"active":true,"entity":"api_dropbox_oauth2_get_tokens_output","key$":"BasicApiDropboxOauth2GetTokensOutputFlow","kind":"basic","name":"BasicApiDropboxOauth2GetTokensOutputFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"api_dropbox_oauth2_get_tokens_output_ref01"},"m":{},"o":"create","s":[],"v":[],"index$":0}]}, 'ApiDropboxOauth2GetTokensOutput', {"POST /v2/gen-ai/oauth2/dropbox/tokens":{"protocol":"http","requestBody":{"content":{"application/json":{"schema":{"description":"The oauth2 code from google","properties":{"code":{"description":"The oauth2 code from google","example":"example string","type":"string","key$":"code"},"redirect_url":{"description":"Redirect url","example":"example string","type":"string","key$":"redirect_url"}},"type":"object","x-ref":"#/components/schemas/apiDropboxOauth2GetTokensInput","index$":1}}}},"parameters":[]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const api_dropbox_oauth2_get_tokens_output_ref01_ent = client.ApiDropboxOauth2GetTokensOutput()
    let api_dropbox_oauth2_get_tokens_output_ref01_data = setup.data.new.api_dropbox_oauth2_get_tokens_output['api_dropbox_oauth2_get_tokens_output_ref01']

    api_dropbox_oauth2_get_tokens_output_ref01_data = (await api_dropbox_oauth2_get_tokens_output_ref01_ent.create(api_dropbox_oauth2_get_tokens_output_ref01_data)).data()
    assert(null != api_dropbox_oauth2_get_tokens_output_ref01_data)


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
      '../../../../.sdk/test/entity/api_dropbox_oauth2_get_tokens_output/ApiDropboxOauth2GetTokensOutputTestData.json')

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
    ['api_dropbox_oauth2_get_tokens_output01','api_dropbox_oauth2_get_tokens_output02','api_dropbox_oauth2_get_tokens_output03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'DIGITALOCEAN_TEST_API_DROPBOX_OAUTH2_GET_TOKENS_OUTPUT_ENTID': idmap,
    'DIGITALOCEAN_TEST_LIVE': 'FALSE',
    'DIGITALOCEAN_TEST_EXPLAIN': 'FALSE',
    'DIGITALOCEAN_APIKEY': '',
  })

  idmap = env['DIGITALOCEAN_TEST_API_DROPBOX_OAUTH2_GET_TOKENS_OUTPUT_ENTID']

  const live = 'TRUE' === env.DIGITALOCEAN_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['DIGITALOCEAN_TEST_API_DROPBOX_OAUTH2_GET_TOKENS_OUTPUT_ENTID']
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
  
