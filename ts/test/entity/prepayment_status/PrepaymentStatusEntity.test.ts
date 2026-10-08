

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


describe('PrepaymentStatusEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when DIGITALOCEAN_TEST_LIVE=TRUE.
  afterEach(liveDelay('DIGITALOCEAN_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = DigitaloceanSDK.test()
    const ent = testsdk.PrepaymentStatus()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = DigitaloceanSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.PrepaymentStatus().load({"balance":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.DIGITALOCEAN_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'prepayment_status.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"balance":{"a":true,"h":"Balance","n":"balance","r":false,"sh":"Current prepayment balance.","t":"`$STRING`","key$":"balance","index$":0},"blocked":{"a":true,"h":"Blocked","n":"blocked","r":false,"sh":"Whether the prepayment gate is currently blocking usage.","t":"`$BOOLEAN`","key$":"blocked","index$":1},"eligible":{"a":true,"h":"Eligible","n":"eligible","r":false,"sh":"Whether the account is eligible for the prepayment gate experience.","t":"`$BOOLEAN`","key$":"eligible","index$":2},"is_auto_prepay_enabled":{"a":true,"h":"Is Auto Prepay Enabled","n":"is_auto_prepay_enabled","r":false,"sh":"Whether automatic prepayment top-up is enabled.","t":"`$BOOLEAN`","key$":"is_auto_prepay_enabled","index$":3},"month_to_date_balance":{"a":true,"h":"Month To Date Balance","n":"month_to_date_balance","r":false,"sh":"Current account balance including month-to-date usage.","t":"`$STRING`","key$":"month_to_date_balance","index$":4}},"name":"prepayment_status","op":{"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /v2/customers/my/prepayment_status","source":"openapi3","version":2},"g":{},"k":"http","m":"GET","o":"/v2/customers/my/prepayment_status","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v2"},{"lit":"customers"},{"lit":"my"},{"lit":"prepayment_status"}],"t":{"req":"`reqdata`","res":"`body.status`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"prepayment_status","name__orig":"prepayment_status","Name":"PrepaymentStatus","name_":"prepayment_status","name-":"prepayment-status","NAME":"PREPAYMENT_STATUS","index$":186}, {"active":true,"entity":"prepayment_status","key$":"BasicPrepaymentStatusFlow","kind":"basic","name":"BasicPrepaymentStatusFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"prepayment_status_ref01","srcdatavar":"prepayment_status_ref01_data","suffix":"_dt0"},"m":{},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-prepayment_status_ref01"}}],"index$":0}]}, 'PrepaymentStatus', {"GET /v2/customers/my/prepayment_status":{"protocol":"http","parameters":[]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let prepayment_status_ref01_data = Object.values(setup.data.existing.prepayment_status)[0] as any

    // LOAD
    const prepayment_status_ref01_ent = client.PrepaymentStatus()
    const prepayment_status_ref01_match_dt0: any = {}
    const prepayment_status_ref01_data_dt0 = (await prepayment_status_ref01_ent.load(prepayment_status_ref01_match_dt0)).data()
    assert(null != prepayment_status_ref01_data_dt0)


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
      '../../../../.sdk/test/entity/prepayment_status/PrepaymentStatusTestData.json')

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
    ['prepayment_status01','prepayment_status02','prepayment_status03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'DIGITALOCEAN_TEST_PREPAYMENT_STATUS_ENTID': idmap,
    'DIGITALOCEAN_TEST_LIVE': 'FALSE',
    'DIGITALOCEAN_TEST_EXPLAIN': 'FALSE',
    'DIGITALOCEAN_APIKEY': '',
  })

  idmap = env['DIGITALOCEAN_TEST_PREPAYMENT_STATUS_ENTID']

  const live = 'TRUE' === env.DIGITALOCEAN_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['DIGITALOCEAN_TEST_PREPAYMENT_STATUS_ENTID']
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
  
