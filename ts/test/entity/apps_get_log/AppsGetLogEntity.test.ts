

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


describe('AppsGetLogEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when DIGITALOCEAN_TEST_LIVE=TRUE.
  afterEach(liveDelay('DIGITALOCEAN_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = DigitaloceanSDK.test()
    const ent = testsdk.AppsGetLog()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = DigitaloceanSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.AppsGetLog().list({"app_id":1,"type":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.DIGITALOCEAN_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'apps_get_log.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"historic_urls":{"a":true,"h":"Historic Urls","n":"historic_urls","r":false,"t":"`$ARRAY`","key$":"historic_urls","index$":0},"live_url":{"a":true,"h":"Live Url","n":"live_url","r":false,"sh":"A URL of the real-time live logs.","t":"`$STRING`","key$":"live_url","index$":1}},"name":"apps_get_log","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /v2/apps/{app_id}/deployments/{deployment_id}/components/{component_name}/logs","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":"4f6c71e2-1e90-4762-9fee-6cc4a0a9f2cf","k":"param","n":"app_id","or":"app_id","r":true,"t":"`$STRING`","index$":0},{"a":true,"ex":"component","k":"param","n":"component_name","or":"component_name","r":true,"t":"`$STRING`","index$":1},{"a":true,"ex":"3aa4d20e-5527-4c00-b496-601fbd22520a","k":"param","n":"deployment_id","or":"deployment_id","r":true,"t":"`$STRING`","index$":2}],"query":[{"a":true,"ex":true,"k":"query","n":"follow","or":"follow","r":false,"t":"`$BOOLEAN`","index$":0},{"a":true,"ex":"3m","k":"query","n":"pod_connection_timeout","or":"pod_connection_timeout","r":false,"t":"`$STRING`","index$":1},{"a":true,"ex":"BUILD","k":"query","n":"type","or":"type","r":true,"t":"`$STRING`","index$":2}]},"k":"http","m":"GET","o":"/v2/apps/{app_id}/deployments/{deployment_id}/components/{component_name}/logs","q":{"exist":["app_id","component_name","deployment_id","type"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v2"},{"lit":"apps"},{"var":"app_id"},{"lit":"deployments"},{"var":"deployment_id"},{"lit":"components"},{"var":"component_name"},{"lit":"logs"}],"t":{"req":"`reqdata`","res":"`body.historic_urls`"},"index$":0},{"a":true,"co":{"id":"GET /v2/apps/{app_id}/jobs/{job_name}/invocations/{job_invocation_id}/logs","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":"4f6c71e2-1e90-4762-9fee-6cc4a0a9f2cf","k":"param","n":"app_id","or":"app_id","r":true,"t":"`$STRING`","index$":0},{"a":true,"ex":"123e4567-e89b-12d3-a456-426","k":"param","n":"invocation_id","or":"job_invocation_id","r":true,"t":"`$STRING`","index$":1},{"a":true,"ex":"component","k":"param","n":"job_name","or":"job_name","r":true,"t":"`$STRING`","index$":2}],"query":[{"a":true,"ex":"3aa4d20e-5527-4c00-b496-601fbd22520a","k":"query","n":"deployment_id","or":"deployment_id","r":false,"t":"`$STRING`","index$":0},{"a":true,"ex":true,"k":"query","n":"follow","or":"follow","r":false,"t":"`$BOOLEAN`","index$":1},{"a":true,"ex":"3m","k":"query","n":"pod_connection_timeout","or":"pod_connection_timeout","r":false,"t":"`$STRING`","index$":2},{"a":true,"ex":"100","k":"query","n":"tail_line","or":"tail_lines","r":false,"t":"`$STRING`","index$":3},{"a":true,"ex":"JOB_INVOCATION","k":"query","n":"type","or":"type","r":true,"t":"`$STRING`","index$":4}]},"k":"http","m":"GET","o":"/v2/apps/{app_id}/jobs/{job_name}/invocations/{job_invocation_id}/logs","q":{"exist":["app_id","invocation_id","job_name","type"]},"r":{"param":{"job_invocation_id":"invocation_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v2"},{"lit":"apps"},{"var":"app_id"},{"lit":"jobs"},{"var":"job_name"},{"lit":"invocations"},{"var":"invocation_id"},{"lit":"logs"}],"t":{"req":"`reqdata`","res":"`body.historic_urls`"},"index$":1},{"a":true,"co":{"id":"GET /v2/apps/{app_id}/components/{component_name}/logs","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":"4f6c71e2-1e90-4762-9fee-6cc4a0a9f2cf","k":"param","n":"app_id","or":"app_id","r":true,"t":"`$STRING`","index$":0},{"a":true,"ex":"component","k":"param","n":"component_name","or":"component_name","r":true,"t":"`$STRING`","index$":1}],"query":[{"a":true,"ex":true,"k":"query","n":"follow","or":"follow","r":false,"t":"`$BOOLEAN`","index$":0},{"a":true,"ex":"3m","k":"query","n":"pod_connection_timeout","or":"pod_connection_timeout","r":false,"t":"`$STRING`","index$":1},{"a":true,"ex":"BUILD","k":"query","n":"type","or":"type","r":true,"t":"`$STRING`","index$":2}]},"k":"http","m":"GET","o":"/v2/apps/{app_id}/components/{component_name}/logs","q":{"exist":["app_id","component_name","type"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v2"},{"lit":"apps"},{"var":"app_id"},{"lit":"components"},{"var":"component_name"},{"lit":"logs"}],"t":{"req":"`reqdata`","res":"`body.historic_urls`"},"index$":2},{"a":true,"co":{"id":"GET /v2/apps/{app_id}/deployments/{deployment_id}/logs","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":"4f6c71e2-1e90-4762-9fee-6cc4a0a9f2cf","k":"param","n":"app_id","or":"app_id","r":true,"t":"`$STRING`","index$":0},{"a":true,"ex":"3aa4d20e-5527-4c00-b496-601fbd22520a","k":"param","n":"deployment_id","or":"deployment_id","r":true,"t":"`$STRING`","index$":1}],"query":[{"a":true,"ex":true,"k":"query","n":"follow","or":"follow","r":false,"t":"`$BOOLEAN`","index$":0},{"a":true,"ex":"3m","k":"query","n":"pod_connection_timeout","or":"pod_connection_timeout","r":false,"t":"`$STRING`","index$":1},{"a":true,"ex":"BUILD","k":"query","n":"type","or":"type","r":true,"t":"`$STRING`","index$":2}]},"k":"http","m":"GET","o":"/v2/apps/{app_id}/deployments/{deployment_id}/logs","q":{"exist":["app_id","deployment_id","type"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v2"},{"lit":"apps"},{"var":"app_id"},{"lit":"deployments"},{"var":"deployment_id"},{"lit":"logs"}],"t":{"req":"`reqdata`","res":"`body.historic_urls`"},"index$":3},{"a":true,"co":{"id":"GET /v2/apps/{app_id}/events/{event_id}/logs","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":"4f6c71e2-1e90-4762-9fee-6cc4a0a9f2cf","k":"param","n":"app_id","or":"app_id","r":true,"t":"`$STRING`","index$":0},{"a":true,"ex":"4f6c71e2-1e90-4762-9fee-6cc4a0a9f2cf","k":"param","n":"event_id","or":"event_id","r":true,"t":"`$STRING`","index$":1}],"query":[{"a":true,"ex":true,"k":"query","n":"follow","or":"follow","r":false,"t":"`$BOOLEAN`","index$":0},{"a":true,"ex":"3m","k":"query","n":"pod_connection_timeout","or":"pod_connection_timeout","r":false,"t":"`$STRING`","index$":1},{"a":true,"ex":"BUILD","k":"query","n":"type","or":"type","r":true,"t":"`$STRING`","index$":2}]},"k":"http","m":"GET","o":"/v2/apps/{app_id}/events/{event_id}/logs","q":{"exist":["app_id","event_id","type"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v2"},{"lit":"apps"},{"var":"app_id"},{"lit":"events"},{"var":"event_id"},{"lit":"logs"}],"t":{"req":"`reqdata`","res":"`body.historic_urls`"},"index$":4},{"a":true,"co":{"id":"GET /v2/apps/{app_id}/logs","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":"4f6c71e2-1e90-4762-9fee-6cc4a0a9f2cf","k":"param","n":"app_id","or":"app_id","r":true,"t":"`$STRING`","index$":0}],"query":[{"a":true,"ex":true,"k":"query","n":"follow","or":"follow","r":false,"t":"`$BOOLEAN`","index$":0},{"a":true,"ex":"3m","k":"query","n":"pod_connection_timeout","or":"pod_connection_timeout","r":false,"t":"`$STRING`","index$":1},{"a":true,"ex":"BUILD","k":"query","n":"type","or":"type","r":true,"t":"`$STRING`","index$":2}]},"k":"http","m":"GET","o":"/v2/apps/{app_id}/logs","q":{"exist":["app_id","type"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v2"},{"lit":"apps"},{"var":"app_id"},{"lit":"logs"}],"t":{"req":"`reqdata`","res":"`body.historic_urls`"},"index$":5}],"key$":"list"}},"relations":{"ancestors":[["$.main.kit.entity.app"],["$.main.kit.entity.app"],["$.main.kit.entity.app"],["$.main.kit.entity.app"],["$.main.kit.entity.app"],["$.main.kit.entity.app"]]},"key$":"apps_get_log","name__orig":"apps_get_log","Name":"AppsGetLog","name_":"apps_get_log","name-":"apps-get-log","NAME":"APPS_GET_LOG","index$":113}, {"active":true,"entity":"apps_get_log","key$":"BasicAppsGetLogFlow","kind":"basic","name":"BasicAppsGetLogFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{"app_id":"app01"},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"apps_get_log_ref01"}}],"index$":0}]}, 'AppsGetLog', {"GET /v2/apps/{app_id}/deployments/{deployment_id}/components/{component_name}/logs":{"protocol":"http","parameters":[{"description":"The app ID","in":"path","name":"app_id","required":true,"schema":{"type":"string"},"example":"4f6c71e2-1e90-4762-9fee-6cc4a0a9f2cf","x-ref":"#/components/parameters/app_id","index$":0},{"description":"The deployment ID","in":"path","name":"deployment_id","required":true,"schema":{"type":"string"},"example":"3aa4d20e-5527-4c00-b496-601fbd22520a","x-ref":"#/components/parameters/deployment_id","index$":1},{"description":"An optional component name. If set, logs will be limited to this component only.","in":"path","name":"component_name","required":true,"schema":{"type":"string"},"example":"component","x-ref":"#/components/parameters/component","index$":2},{"description":"Whether the logs should follow live updates.","in":"query","name":"follow","schema":{"type":"boolean"},"example":true,"x-ref":"#/components/parameters/live_updates","index$":3},{"description":"The type of logs to retrieve\n- BUILD: Build-time logs\n- DEPLOY: Deploy-time logs\n- RUN: Live run-time logs\n- RUN_RESTARTED: Logs of crashed/restarted instances during runtime\n- AUTOSCALE_EVENT: Logs of an autoscaling event (requires event_id)","in":"query","name":"type","required":true,"schema":{"default":"UNSPECIFIED","enum":["UNSPECIFIED","BUILD","DEPLOY","RUN","RUN_RESTARTED","AUTOSCALE_EVENT"],"type":"string"},"example":"BUILD","x-ref":"#/components/parameters/log_type","index$":4},{"description":"An optional time duration to wait if the underlying component instance is not immediately available. Default: `3m`.","in":"query","name":"pod_connection_timeout","schema":{"type":"string"},"example":"3m","x-ref":"#/components/parameters/time_wait","index$":5}]},"GET /v2/apps/{app_id}/jobs/{job_name}/invocations/{job_invocation_id}/logs":{"protocol":"http","parameters":[{"description":"The app ID","in":"path","name":"app_id","required":true,"schema":{"type":"string"},"example":"4f6c71e2-1e90-4762-9fee-6cc4a0a9f2cf","x-ref":"#/components/parameters/app_id","index$":0},{"description":"The job name to list job invocations for.","in":"path","name":"job_name","required":true,"schema":{"type":"string"},"example":"component","index$":1},{"description":"The ID of the job invocation to retrieve.","in":"path","name":"job_invocation_id","required":true,"schema":{"type":"string"},"example":"123e4567-e89b-12d3-a456-426","x-ref":"#/components/parameters/job_invocation_id","index$":2},{"description":"The deployment ID","in":"query","name":"deployment_id","required":false,"schema":{"type":"string"},"example":"3aa4d20e-5527-4c00-b496-601fbd22520a","index$":3},{"description":"Whether the logs should follow live updates.","in":"query","name":"follow","schema":{"type":"boolean"},"example":true,"x-ref":"#/components/parameters/live_updates","index$":4},{"description":"The type of logs to retrieve","in":"query","name":"type","required":true,"schema":{"type":"string","enum":["JOB_INVOCATION"]},"example":"JOB_INVOCATION","index$":5},{"description":"An optional time duration to wait if the underlying component instance is not immediately available. Default: `3m`.","in":"query","name":"pod_connection_timeout","schema":{"type":"string"},"example":"3m","x-ref":"#/components/parameters/time_wait","index$":6},{"description":"The number of lines from the end of the logs to retrieve.","in":"query","name":"tail_lines","required":false,"schema":{"type":"string","format":"int64"},"example":"100","x-ref":"#/components/parameters/number_lines","index$":7}]},"GET /v2/apps/{app_id}/components/{component_name}/logs":{"protocol":"http","parameters":[{"description":"The app ID","in":"path","name":"app_id","required":true,"schema":{"type":"string"},"example":"4f6c71e2-1e90-4762-9fee-6cc4a0a9f2cf","x-ref":"#/components/parameters/app_id","index$":0},{"description":"An optional component name. If set, logs will be limited to this component only.","in":"path","name":"component_name","required":true,"schema":{"type":"string"},"example":"component","x-ref":"#/components/parameters/component","index$":1},{"description":"Whether the logs should follow live updates.","in":"query","name":"follow","schema":{"type":"boolean"},"example":true,"x-ref":"#/components/parameters/live_updates","index$":2},{"description":"The type of logs to retrieve\n- BUILD: Build-time logs\n- DEPLOY: Deploy-time logs\n- RUN: Live run-time logs\n- RUN_RESTARTED: Logs of crashed/restarted instances during runtime\n- AUTOSCALE_EVENT: Logs of an autoscaling event (requires event_id)","in":"query","name":"type","required":true,"schema":{"default":"UNSPECIFIED","enum":["UNSPECIFIED","BUILD","DEPLOY","RUN","RUN_RESTARTED","AUTOSCALE_EVENT"],"type":"string"},"example":"BUILD","x-ref":"#/components/parameters/log_type","index$":3},{"description":"An optional time duration to wait if the underlying component instance is not immediately available. Default: `3m`.","in":"query","name":"pod_connection_timeout","schema":{"type":"string"},"example":"3m","x-ref":"#/components/parameters/time_wait","index$":4}]},"GET /v2/apps/{app_id}/deployments/{deployment_id}/logs":{"protocol":"http","parameters":[{"description":"The app ID","in":"path","name":"app_id","required":true,"schema":{"type":"string"},"example":"4f6c71e2-1e90-4762-9fee-6cc4a0a9f2cf","x-ref":"#/components/parameters/app_id","index$":0},{"description":"The deployment ID","in":"path","name":"deployment_id","required":true,"schema":{"type":"string"},"example":"3aa4d20e-5527-4c00-b496-601fbd22520a","x-ref":"#/components/parameters/deployment_id","index$":1},{"description":"Whether the logs should follow live updates.","in":"query","name":"follow","schema":{"type":"boolean"},"example":true,"x-ref":"#/components/parameters/live_updates","index$":2},{"description":"The type of logs to retrieve\n- BUILD: Build-time logs\n- DEPLOY: Deploy-time logs\n- RUN: Live run-time logs\n- RUN_RESTARTED: Logs of crashed/restarted instances during runtime\n- AUTOSCALE_EVENT: Logs of an autoscaling event (requires event_id)","in":"query","name":"type","required":true,"schema":{"default":"UNSPECIFIED","enum":["UNSPECIFIED","BUILD","DEPLOY","RUN","RUN_RESTARTED","AUTOSCALE_EVENT"],"type":"string"},"example":"BUILD","x-ref":"#/components/parameters/log_type","index$":3},{"description":"An optional time duration to wait if the underlying component instance is not immediately available. Default: `3m`.","in":"query","name":"pod_connection_timeout","schema":{"type":"string"},"example":"3m","x-ref":"#/components/parameters/time_wait","index$":4}]},"GET /v2/apps/{app_id}/events/{event_id}/logs":{"protocol":"http","parameters":[{"description":"The app ID","in":"path","name":"app_id","required":true,"schema":{"type":"string"},"example":"4f6c71e2-1e90-4762-9fee-6cc4a0a9f2cf","x-ref":"#/components/parameters/app_id","index$":0},{"description":"The event ID","in":"path","name":"event_id","required":true,"schema":{"type":"string"},"example":"4f6c71e2-1e90-4762-9fee-6cc4a0a9f2cf","x-ref":"#/components/parameters/event_id","index$":1},{"description":"Whether the logs should follow live updates.","in":"query","name":"follow","schema":{"type":"boolean"},"example":true,"x-ref":"#/components/parameters/live_updates","index$":2},{"description":"The type of logs to retrieve\n- BUILD: Build-time logs\n- DEPLOY: Deploy-time logs\n- RUN: Live run-time logs\n- RUN_RESTARTED: Logs of crashed/restarted instances during runtime\n- AUTOSCALE_EVENT: Logs of an autoscaling event (requires event_id)","in":"query","name":"type","required":true,"schema":{"default":"UNSPECIFIED","enum":["UNSPECIFIED","BUILD","DEPLOY","RUN","RUN_RESTARTED","AUTOSCALE_EVENT"],"type":"string"},"example":"BUILD","x-ref":"#/components/parameters/log_type","index$":3},{"description":"An optional time duration to wait if the underlying component instance is not immediately available. Default: `3m`.","in":"query","name":"pod_connection_timeout","schema":{"type":"string"},"example":"3m","x-ref":"#/components/parameters/time_wait","index$":4}]},"GET /v2/apps/{app_id}/logs":{"protocol":"http","parameters":[{"description":"The app ID","in":"path","name":"app_id","required":true,"schema":{"type":"string"},"example":"4f6c71e2-1e90-4762-9fee-6cc4a0a9f2cf","x-ref":"#/components/parameters/app_id","index$":0},{"description":"Whether the logs should follow live updates.","in":"query","name":"follow","schema":{"type":"boolean"},"example":true,"x-ref":"#/components/parameters/live_updates","index$":1},{"description":"The type of logs to retrieve\n- BUILD: Build-time logs\n- DEPLOY: Deploy-time logs\n- RUN: Live run-time logs\n- RUN_RESTARTED: Logs of crashed/restarted instances during runtime\n- AUTOSCALE_EVENT: Logs of an autoscaling event (requires event_id)","in":"query","name":"type","required":true,"schema":{"default":"UNSPECIFIED","enum":["UNSPECIFIED","BUILD","DEPLOY","RUN","RUN_RESTARTED","AUTOSCALE_EVENT"],"type":"string"},"example":"BUILD","x-ref":"#/components/parameters/log_type","index$":2},{"description":"An optional time duration to wait if the underlying component instance is not immediately available. Default: `3m`.","in":"query","name":"pod_connection_timeout","schema":{"type":"string"},"example":"3m","x-ref":"#/components/parameters/time_wait","index$":3}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let apps_get_log_ref01_data = Object.values(setup.data.existing.apps_get_log)[0] as any

    // LIST
    const apps_get_log_ref01_ent = client.AppsGetLog()
    const apps_get_log_ref01_match: any = {}
    apps_get_log_ref01_match['app_id'] = setup.idmap['app01']

    const apps_get_log_ref01_list = (await apps_get_log_ref01_ent.list(apps_get_log_ref01_match)).map((e: any) => e.data())


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
      '../../../../.sdk/test/entity/apps_get_log/AppsGetLogTestData.json')

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
    ['apps_get_log01','apps_get_log02','apps_get_log03','app01','app02','app03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'DIGITALOCEAN_TEST_APPS_GET_LOG_ENTID': idmap,
    'DIGITALOCEAN_TEST_LIVE': 'FALSE',
    'DIGITALOCEAN_TEST_EXPLAIN': 'FALSE',
    'DIGITALOCEAN_APIKEY': '',
  })

  idmap = env['DIGITALOCEAN_TEST_APPS_GET_LOG_ENTID']

  const live = 'TRUE' === env.DIGITALOCEAN_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['DIGITALOCEAN_TEST_APPS_GET_LOG_ENTID']
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
  
