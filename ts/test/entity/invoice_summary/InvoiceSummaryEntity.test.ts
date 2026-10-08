

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


describe('InvoiceSummaryEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when DIGITALOCEAN_TEST_LIVE=TRUE.
  afterEach(liveDelay('DIGITALOCEAN_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = DigitaloceanSDK.test()
    const ent = testsdk.InvoiceSummary()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = DigitaloceanSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.InvoiceSummary().load({"id":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.DIGITALOCEAN_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'invoice_summary.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"amount":{"a":true,"h":"Amount","n":"amount","r":false,"sh":"Total amount of the invoice, in USD.","t":"`$STRING`","key$":"amount","index$":0},"billing_period":{"a":true,"h":"Billing Period","n":"billing_period","r":false,"sh":"Billing period of usage for which the invoice is issued, in `YYYY-MM` format.","t":"`$STRING`","key$":"billing_period","index$":1},"credits_and_adjustments":{"a":true,"h":"Credits And Adjustments","n":"credits_and_adjustments","r":false,"t":"`$ANY`","key$":"credits_and_adjustments","index$":2},"id":{"a":true,"h":"Id","n":"id","r":false,"t":"`$STRING`","key$":"id","index$":3},"invoice_id":{"a":true,"h":"Invoice Id","n":"invoice_id","r":false,"sh":"ID of the invoice","t":"`$STRING`","key$":"invoice_id","index$":4},"invoice_uuid":{"a":true,"h":"Invoice Uuid","n":"invoice_uuid","r":false,"sh":"UUID of the invoice","t":"`$STRING`","key$":"invoice_uuid","index$":5},"overages":{"a":true,"h":"Overages","n":"overages","r":false,"t":"`$ANY`","key$":"overages","index$":6},"product_charges":{"a":true,"h":"Product Charges","n":"product_charges","r":false,"t":"`$ANY`","key$":"product_charges","index$":7},"taxes":{"a":true,"h":"Taxes","n":"taxes","r":false,"t":"`$ANY`","key$":"taxes","index$":8},"user_billing_address":{"a":true,"h":"User Billing Address","n":"user_billing_address","r":false,"t":"`$ANY`","key$":"user_billing_address","index$":9},"user_company":{"a":true,"h":"User Company","n":"user_company","r":false,"sh":"Company of the DigitalOcean customer being invoiced, if set.","t":"`$STRING`","key$":"user_company","index$":10},"user_email":{"a":true,"h":"User Email","n":"user_email","r":false,"sh":"Email of the DigitalOcean customer being invoiced.","t":"`$STRING`","key$":"user_email","index$":11},"user_name":{"a":true,"h":"User Name","n":"user_name","r":false,"sh":"Name of the DigitalOcean customer being invoiced.","t":"`$STRING`","key$":"user_name","index$":12}},"id":{"field":"id","name":"id"},"name":"invoice_summary","op":{"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /v2/customers/my/invoices/{invoice_uuid}/summary","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":"22737513-0ea7-4206-8ceb-98a575af7681","k":"param","n":"id","or":"invoice_uuid","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/v2/customers/my/invoices/{invoice_uuid}/summary","q":{"exist":["id"]},"r":{"param":{"invoice_uuid":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v2"},{"lit":"customers"},{"lit":"my"},{"lit":"invoices"},{"var":"id"},{"lit":"summary"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"invoice_summary","name__orig":"invoice_summary","Name":"InvoiceSummary","name_":"invoice_summary","name-":"invoice-summary","NAME":"INVOICE_SUMMARY","index$":160}, {"active":true,"entity":"invoice_summary","key$":"BasicInvoiceSummaryFlow","kind":"basic","name":"BasicInvoiceSummaryFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"invoice_summary_ref01","srcdatavar":"invoice_summary_ref01_data","suffix":"_dt0"},"m":{"id":"invoice_summary01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-invoice_summary_ref01"}}],"index$":0}]}, 'InvoiceSummary', {"GET /v2/customers/my/invoices/{invoice_uuid}/summary":{"protocol":"http","parameters":[{"name":"invoice_uuid","description":"UUID of the invoice","in":"path","schema":{"type":"string"},"example":"22737513-0ea7-4206-8ceb-98a575af7681","required":true,"x-ref":"#/components/parameters/invoice_uuid","index$":0}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let invoice_summary_ref01_data = Object.values(setup.data.existing.invoice_summary)[0] as any

    // LOAD
    const invoice_summary_ref01_ent = client.InvoiceSummary()
    const invoice_summary_ref01_match_dt0: any = {}
    invoice_summary_ref01_match_dt0.id = invoice_summary_ref01_data.id
    const invoice_summary_ref01_data_dt0 = (await invoice_summary_ref01_ent.load(invoice_summary_ref01_match_dt0)).data()
    assert(invoice_summary_ref01_data_dt0.id === invoice_summary_ref01_data.id)


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
      '../../../../.sdk/test/entity/invoice_summary/InvoiceSummaryTestData.json')

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
    ['invoice_summary01','invoice_summary02','invoice_summary03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'DIGITALOCEAN_TEST_INVOICE_SUMMARY_ENTID': idmap,
    'DIGITALOCEAN_TEST_LIVE': 'FALSE',
    'DIGITALOCEAN_TEST_EXPLAIN': 'FALSE',
    'DIGITALOCEAN_APIKEY': '',
  })

  idmap = env['DIGITALOCEAN_TEST_INVOICE_SUMMARY_ENTID']

  const live = 'TRUE' === env.DIGITALOCEAN_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['DIGITALOCEAN_TEST_INVOICE_SUMMARY_ENTID']
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
  
