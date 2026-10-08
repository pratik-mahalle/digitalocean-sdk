

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


describe('AppsDeploymentEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when DIGITALOCEAN_TEST_LIVE=TRUE.
  afterEach(liveDelay('DIGITALOCEAN_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = DigitaloceanSDK.test()
    const ent = testsdk.AppsDeployment()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = DigitaloceanSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.AppsDeployment().list({"app_id":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.DIGITALOCEAN_TEST_LIVE
    for (const op of ['create', 'list', 'load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'apps_deployment.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"cause":{"a":true,"h":"Cause","n":"cause","r":false,"t":"`$STRING`","key$":"cause","index$":0},"cloned_from":{"a":true,"h":"Cloned From","n":"cloned_from","r":false,"t":"`$STRING`","key$":"cloned_from","index$":1},"components":{"a":true,"h":"Components","n":"components","r":false,"t":"`$ARRAY`","key$":"components","index$":2},"created_at":{"a":true,"fo":"date-time","h":"Created At","n":"created_at","r":false,"t":"`$STRING`","key$":"created_at","index$":3},"deployment_id":{"a":true,"h":"Deployment Id","n":"deployment_id","r":false,"sh":"The ID of the deployment to rollback to.","t":"`$STRING`","key$":"deployment_id","index$":4},"force_build":{"a":true,"h":"Force Build","n":"force_build","r":false,"t":"`$BOOLEAN`","key$":"force_build","index$":5},"functions":{"a":true,"h":"Functions","n":"functions","r":false,"t":"`$ARRAY`","key$":"functions","index$":6},"id":{"a":true,"h":"Id","n":"id","r":false,"t":"`$STRING`","key$":"id","index$":7},"jobs":{"a":true,"h":"Jobs","n":"jobs","r":false,"t":"`$ARRAY`","key$":"jobs","index$":8},"phase":{"a":true,"h":"Phase","n":"phase","r":false,"t":"`$STRING`","key$":"phase","index$":9},"phase_last_updated_at":{"a":true,"fo":"date-time","h":"Phase Last Updated At","n":"phase_last_updated_at","r":false,"t":"`$STRING`","key$":"phase_last_updated_at","index$":10},"progress":{"a":true,"h":"Progress","n":"progress","r":false,"t":"`$OBJECT`","key$":"progress","index$":11},"services":{"a":true,"h":"Services","n":"services","r":false,"t":"`$ARRAY`","key$":"services","index$":12},"skip_pin":{"a":true,"h":"Skip Pin","n":"skip_pin","r":false,"sh":"Whether to skip pinning the rollback deployment.","t":"`$BOOLEAN`","key$":"skip_pin","index$":13},"spec":{"a":true,"h":"Spec","n":"spec","r":true,"sh":"The desired configuration of an application.","t":"`$OBJECT`","union":{"branches":2,"count":1,"depth":7},"key$":"spec","index$":14},"static_sites":{"a":true,"h":"Static Sites","n":"static_sites","r":false,"t":"`$ARRAY`","key$":"static_sites","index$":15},"tier_slug":{"a":true,"h":"Tier Slug","n":"tier_slug","r":false,"ro":true,"t":"`$STRING`","key$":"tier_slug","index$":16},"updated_at":{"a":true,"fo":"date-time","h":"Updated At","n":"updated_at","r":false,"t":"`$STRING`","key$":"updated_at","index$":17},"workers":{"a":true,"h":"Workers","n":"workers","r":false,"t":"`$ARRAY`","key$":"workers","index$":18}},"id":{"field":"id","name":"id"},"name":"apps_deployment","op":{"create":{"input":"data","name":"create","points":[{"a":true,"co":{"id":"POST /v2/apps/{app_id}/deployments/{deployment_id}/cancel","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":"4f6c71e2-1e90-4762-9fee-6cc4a0a9f2cf","k":"param","n":"app_id","or":"app_id","r":true,"t":"`$STRING`","index$":0},{"a":true,"ex":"3aa4d20e-5527-4c00-b496-601fbd22520a","k":"param","n":"deployment_id","or":"deployment_id","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"POST","o":"/v2/apps/{app_id}/deployments/{deployment_id}/cancel","q":{"exist":["app_id","deployment_id"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v2"},{"lit":"apps"},{"var":"app_id"},{"lit":"deployments"},{"var":"deployment_id"},{"lit":"cancel"}],"t":{"req":"`reqdata`","res":"`body.deployment`"},"index$":0},{"a":true,"co":{"id":"POST /v2/apps/{app_id}/deployments","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":"4f6c71e2-1e90-4762-9fee-6cc4a0a9f2cf","k":"param","n":"app_id","or":"app_id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"POST","o":"/v2/apps/{app_id}/deployments","q":{"exist":["app_id"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v2"},{"lit":"apps"},{"var":"app_id"},{"lit":"deployments"}],"t":{"req":"`reqdata`","res":"`body.deployment`"},"index$":1},{"a":true,"co":{"id":"POST /v2/apps/{app_id}/restart","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":"4f6c71e2-1e90-4762-9fee-6cc4a0a9f2cf","k":"param","n":"app_id","or":"app_id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"POST","o":"/v2/apps/{app_id}/restart","q":{"exist":["app_id"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v2"},{"lit":"apps"},{"var":"app_id"},{"lit":"restart"}],"t":{"req":"`reqdata`","res":"`body.deployment`"},"index$":2},{"a":true,"co":{"id":"POST /v2/apps/{app_id}/rollback","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":"4f6c71e2-1e90-4762-9fee-6cc4a0a9f2cf","k":"param","n":"app_id","or":"app_id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"POST","o":"/v2/apps/{app_id}/rollback","q":{"exist":["app_id"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v2"},{"lit":"apps"},{"var":"app_id"},{"lit":"rollback"}],"t":{"req":"`reqdata`","res":"`body.deployment`"},"index$":3},{"a":true,"co":{"id":"POST /v2/apps/{app_id}/rollback/revert","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":"4f6c71e2-1e90-4762-9fee-6cc4a0a9f2cf","k":"param","n":"app_id","or":"app_id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"POST","o":"/v2/apps/{app_id}/rollback/revert","q":{"exist":["app_id"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v2"},{"lit":"apps"},{"var":"app_id"},{"lit":"rollback"},{"lit":"revert"}],"t":{"req":"`reqdata`","res":"`body.deployment`"},"index$":4}],"key$":"create"},"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /v2/apps/{app_id}/deployments","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":"4f6c71e2-1e90-4762-9fee-6cc4a0a9f2cf","k":"param","n":"app_id","or":"app_id","r":true,"t":"`$STRING`","index$":0}],"query":[{"a":true,"ex":["MANUAL","AUTOSCALED"],"k":"query","n":"deployment_type","or":"deployment_types","r":false,"t":"`$ARRAY`","index$":0},{"a":true,"ex":1,"k":"query","n":"page","or":"page","r":false,"t":"`$INTEGER`","index$":1},{"a":true,"ex":2,"k":"query","n":"per_page","or":"per_page","r":false,"t":"`$INTEGER`","index$":2}]},"k":"http","m":"GET","o":"/v2/apps/{app_id}/deployments","q":{"exist":["app_id"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v2"},{"lit":"apps"},{"var":"app_id"},{"lit":"deployments"}],"t":{"req":"`reqdata`","res":"`body.deployments`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /v2/apps/{app_id}/deployments/{deployment_id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":"4f6c71e2-1e90-4762-9fee-6cc4a0a9f2cf","k":"param","n":"app_id","or":"app_id","r":true,"t":"`$STRING`","index$":0},{"a":true,"ex":"3aa4d20e-5527-4c00-b496-601fbd22520a","k":"param","n":"id","or":"deployment_id","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"GET","o":"/v2/apps/{app_id}/deployments/{deployment_id}","q":{"exist":["app_id","id"]},"r":{"param":{"deployment_id":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v2"},{"lit":"apps"},{"var":"app_id"},{"lit":"deployments"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body.deployment`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[["$.main.kit.entity.app"],["$.main.kit.entity.app"]]},"key$":"apps_deployment","name__orig":"apps_deployment","Name":"AppsDeployment","name_":"apps_deployment","name-":"apps-deployment","NAME":"APPS_DEPLOYMENT","index$":109}, {"active":true,"entity":"apps_deployment","key$":"BasicAppsDeploymentFlow","kind":"basic","name":"BasicAppsDeploymentFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"apps_deployment_ref01"},"m":{"app_id":"app01"},"o":"create","s":[],"v":[],"index$":0},{"a":true,"d":{},"i":{},"m":{"app_id":"app01"},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"apps_deployment_ref01"}}],"index$":1},{"a":true,"d":{},"i":{"ref":"apps_deployment_ref01","srcdatavar":"apps_deployment_ref01_data","suffix":"_dt0"},"m":{"app_id":"app01","id":"apps_deployment01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-apps_deployment_ref01"}}],"index$":2}]}, 'AppsDeployment', {"POST /v2/apps/{app_id}/deployments/{deployment_id}/cancel":{"protocol":"http","parameters":[{"description":"The app ID","in":"path","name":"app_id","required":true,"schema":{"type":"string"},"example":"4f6c71e2-1e90-4762-9fee-6cc4a0a9f2cf","x-ref":"#/components/parameters/app_id","index$":0},{"description":"The deployment ID","in":"path","name":"deployment_id","required":true,"schema":{"type":"string"},"example":"3aa4d20e-5527-4c00-b496-601fbd22520a","x-ref":"#/components/parameters/deployment_id","index$":1}]},"POST /v2/apps/{app_id}/deployments":{"protocol":"http","requestBody":{"content":{"application/json":{"schema":{"type":"object","properties":{"force_build":{"title":"Indicates whether to force a build of app from source even if an existing cached build is suitable for re-use","type":"boolean","example":true,"key$":"force_build"}},"x-ref":"#/components/schemas/apps_create_deployment_request","index$":1}}},"required":true},"parameters":[{"description":"The app ID","in":"path","name":"app_id","required":true,"schema":{"type":"string"},"example":"4f6c71e2-1e90-4762-9fee-6cc4a0a9f2cf","x-ref":"#/components/parameters/app_id","index$":0}]},"POST /v2/apps/{app_id}/restart":{"protocol":"http","requestBody":{"content":{"application/json":{"schema":{"type":"object","properties":{"components":{"title":"Optional list of components to restart. If not provided, all components will be restarted.","type":"array","items":{"type":"string"},"example":["component1","component2"],"key$":"components"}},"x-ref":"#/components/schemas/apps_restart_request","index$":1}}}},"parameters":[{"description":"The app ID","in":"path","name":"app_id","required":true,"schema":{"type":"string"},"example":"4f6c71e2-1e90-4762-9fee-6cc4a0a9f2cf","x-ref":"#/components/parameters/app_id","index$":0}]},"POST /v2/apps/{app_id}/rollback":{"protocol":"http","requestBody":{"content":{"application/json":{"schema":{"type":"object","properties":{"deployment_id":{"type":"string","description":"The ID of the deployment to rollback to.","example":"3aa4d20e-5527-4c00-b496-601fbd22520a","key$":"deployment_id"},"skip_pin":{"type":"boolean","description":"Whether to skip pinning the rollback deployment. If false, the rollback deployment will be pinned and any new deployments including Auto Deploy on Push hooks will be disabled until the rollback is either manually committed or reverted via the CommitAppRollback or RevertAppRollback endpoints respectively. If true, the rollback will be immediately committed and the app will remain unpinned.","example":false,"key$":"skip_pin"}},"x-ref":"#/components/schemas/apps_rollback_app_request","index$":1}}},"required":true},"parameters":[{"description":"The app ID","in":"path","name":"app_id","required":true,"schema":{"type":"string"},"example":"4f6c71e2-1e90-4762-9fee-6cc4a0a9f2cf","x-ref":"#/components/parameters/app_id","index$":0}]},"POST /v2/apps/{app_id}/rollback/revert":{"protocol":"http","parameters":[{"description":"The app ID","in":"path","name":"app_id","required":true,"schema":{"type":"string"},"example":"4f6c71e2-1e90-4762-9fee-6cc4a0a9f2cf","x-ref":"#/components/parameters/app_id","index$":0}]},"GET /v2/apps/{app_id}/deployments":{"protocol":"http","parameters":[{"description":"The app ID","in":"path","name":"app_id","required":true,"schema":{"type":"string"},"example":"4f6c71e2-1e90-4762-9fee-6cc4a0a9f2cf","x-ref":"#/components/parameters/app_id","index$":0},{"in":"query","name":"page","required":false,"description":"Which 'page' of paginated results to return.","schema":{"type":"integer","minimum":1,"default":1},"example":1,"x-ref":"#/components/parameters/page","index$":1},{"in":"query","name":"per_page","required":false,"description":"Number of items returned per page","schema":{"type":"integer","minimum":1,"default":20,"maximum":200},"example":2,"x-ref":"#/components/parameters/parameters_per_page","index$":2},{"name":"deployment_types","description":"Optional. Filter deployments by deployment_type\n  - MANUAL: manual deployment\n  - DEPLOY_ON_PUSH: deployment triggered by a push to the app's repository\n  - MAINTENANCE: deployment for maintenance purposes\n  - MANUAL_ROLLBACK: manual revert to a previous deployment\n  - AUTO_ROLLBACK: automatic revert to a previous deployment\n  - UPDATE_DATABASE_TRUSTED_SOURCES: update database trusted sources\n  - AUTOSCALED: deployment that has been autoscaled","in":"query","required":false,"schema":{"type":"array","items":{"type":"string","enum":["MANUAL","DEPLOY_ON_PUSH","MAINTENANCE","MANUAL_ROLLBACK","AUTO_ROLLBACK","UPDATE_DATABASE_TRUSTED_SOURCES","AUTOSCALED"]}},"example":["MANUAL","AUTOSCALED"],"index$":3}]},"GET /v2/apps/{app_id}/deployments/{deployment_id}":{"protocol":"http","parameters":[{"description":"The app ID","in":"path","name":"app_id","required":true,"schema":{"type":"string"},"example":"4f6c71e2-1e90-4762-9fee-6cc4a0a9f2cf","x-ref":"#/components/parameters/app_id","index$":0},{"description":"The deployment ID","in":"path","name":"deployment_id","required":true,"schema":{"type":"string"},"example":"3aa4d20e-5527-4c00-b496-601fbd22520a","x-ref":"#/components/parameters/deployment_id","index$":1}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const apps_deployment_ref01_ent = client.AppsDeployment()
    let apps_deployment_ref01_data = setup.data.new.apps_deployment['apps_deployment_ref01']
    apps_deployment_ref01_data['app_id'] = setup.idmap['app01']

    apps_deployment_ref01_data = (await apps_deployment_ref01_ent.create(apps_deployment_ref01_data)).data()
    assert(null != apps_deployment_ref01_data.id)


    // LIST
    const apps_deployment_ref01_match: any = {}
    apps_deployment_ref01_match['app_id'] = setup.idmap['app01']

    const apps_deployment_ref01_list = (await apps_deployment_ref01_ent.list(apps_deployment_ref01_match)).map((e: any) => e.data())

    assert(!isempty(select(apps_deployment_ref01_list, { id: apps_deployment_ref01_data.id })))


    // LOAD
    const apps_deployment_ref01_match_dt0: any = {}
    apps_deployment_ref01_match_dt0.id = apps_deployment_ref01_data.id
    const apps_deployment_ref01_data_dt0 = (await apps_deployment_ref01_ent.load(apps_deployment_ref01_match_dt0)).data()
    assert(apps_deployment_ref01_data_dt0.id === apps_deployment_ref01_data.id)


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
      '../../../../.sdk/test/entity/apps_deployment/AppsDeploymentTestData.json')

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
    ['apps_deployment01','apps_deployment02','apps_deployment03','app01','app02','app03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'DIGITALOCEAN_TEST_APPS_DEPLOYMENT_ENTID': idmap,
    'DIGITALOCEAN_TEST_LIVE': 'FALSE',
    'DIGITALOCEAN_TEST_EXPLAIN': 'FALSE',
    'DIGITALOCEAN_APIKEY': '',
  })

  idmap = env['DIGITALOCEAN_TEST_APPS_DEPLOYMENT_ENTID']

  const live = 'TRUE' === env.DIGITALOCEAN_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['DIGITALOCEAN_TEST_APPS_DEPLOYMENT_ENTID']
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
  
