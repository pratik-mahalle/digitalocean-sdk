

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


describe('AppEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when DIGITALOCEAN_TEST_LIVE=TRUE.
  afterEach(liveDelay('DIGITALOCEAN_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = DigitaloceanSDK.test()
    const ent = testsdk.App()
    assert(null != ent)
  })


  class FailHook extends BaseFeature {
    name = 'failhook'
    version = '0.0.1'
    active = true
    unexpected = 0
    init() { }
    PreSpec() { throw new Error('app hook failed') }
    PreUnexpected() { this.unexpected++ }
  }

  test('stream-error', async () => {
    const offline = { net: { offline: true } }
    await assert.rejects(async () => {
      for await (const _item of DigitaloceanSDK.test(offline).App().stream('list')) { }
    }, /offline/)

    for await (const _item of DigitaloceanSDK.test(offline).App()
      .stream('list', undefined, { ctrl: { throw: false } })) { }

    if (null != (config as any).feature?.rbac) {
      const denied = DigitaloceanSDK.test(undefined, { feature: { rbac: { active: true, deny: true } } })
      await assert.rejects(async () => {
        for await (const _item of denied.App().stream('list')) { }
      }, (err: any) => 'rbac_denied' === err.code)
    }
  })

  test('stream-ctrl', async () => {
    const explain: any = {}
    const ctrl: any = { explain }
    for await (const _item of DigitaloceanSDK.test().App().stream('list', undefined, { ctrl })) { }
    assert.deepStrictEqual(Object.keys(ctrl), ['explain'])
    assert(explain === ctrl.explain && 0 < Object.keys(explain).length)
  })

  test('unexpected', async () => {
    const hook = new FailHook()
    const client = new DigitaloceanSDK({ feature: { test: { active: true } }, extend: [hook] })
    await assert.rejects(client.App().list(), /hook failed/)
    assert(0 < hook.unexpected)

    const fired = hook.unexpected
    assert.strictEqual(await client.App().list(undefined, { throw: false }), undefined)
    assert(fired < hook.unexpected)
  })

  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = DigitaloceanSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.App().list({"page":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.DIGITALOCEAN_TEST_LIVE
    for (const op of ['create', 'list', 'update', 'load', 'remove']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'app.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"active_deployment":{"a":true,"h":"Active Deployment","n":"active_deployment","r":false,"t":"`$OBJECT`","union":{"branches":2,"count":1,"depth":9},"key$":"active_deployment","index$":0},"autoscaling":{"a":true,"h":"Autoscaling","n":"autoscaling","r":false,"sh":"Autoscaling event details.","t":"`$OBJECT`","key$":"autoscaling","index$":1},"created_at":{"a":true,"fo":"date-time","h":"Created At","n":"created_at","r":false,"ro":true,"t":"`$STRING`","key$":"created_at","index$":2},"dedicated_ips":{"a":true,"h":"Dedicated Ips","n":"dedicated_ips","r":false,"ro":true,"t":"`$ARRAY`","key$":"dedicated_ips","index$":3},"default_ingress":{"a":true,"h":"Default Ingress","n":"default_ingress","r":false,"ro":true,"t":"`$STRING`","key$":"default_ingress","index$":4},"deployment":{"a":true,"h":"Deployment","n":"deployment","r":false,"t":"`$OBJECT`","union":{"branches":2,"count":1,"depth":9},"key$":"deployment","index$":5},"deployment_id":{"a":true,"h":"Deployment Id","n":"deployment_id","r":false,"sh":"For deployment events, this is the same as the deployment's ID.","t":"`$STRING`","key$":"deployment_id","index$":6},"domains":{"a":true,"h":"Domains","n":"domains","r":false,"ro":true,"t":"`$ARRAY`","key$":"domains","index$":7},"id":{"a":true,"h":"Id","n":"id","r":false,"ro":true,"t":"`$STRING`","key$":"id","index$":8},"in_progress_deployment":{"a":true,"h":"In Progress Deployment","n":"in_progress_deployment","r":false,"t":"`$OBJECT`","union":{"branches":2,"count":1,"depth":9},"key$":"in_progress_deployment","index$":9},"last_deployment_created_at":{"a":true,"fo":"date-time","h":"Last Deployment Created At","n":"last_deployment_created_at","r":false,"ro":true,"t":"`$STRING`","key$":"last_deployment_created_at","index$":10},"live_domain":{"a":true,"h":"Live Domain","n":"live_domain","r":false,"ro":true,"t":"`$STRING`","key$":"live_domain","index$":11},"live_url":{"a":true,"h":"Live Url","n":"live_url","r":false,"ro":true,"t":"`$STRING`","key$":"live_url","index$":12},"live_url_base":{"a":true,"h":"Live Url Base","n":"live_url_base","r":false,"ro":true,"t":"`$STRING`","key$":"live_url_base","index$":13},"owner_uuid":{"a":true,"h":"Owner Uuid","n":"owner_uuid","r":false,"ro":true,"t":"`$STRING`","key$":"owner_uuid","index$":14},"pending_deployment":{"a":true,"h":"Pending Deployment","n":"pending_deployment","r":false,"t":"`$ANY`","union":{"branches":2,"count":1,"depth":11},"key$":"pending_deployment","index$":15},"pinned_deployment":{"a":true,"h":"Pinned Deployment","n":"pinned_deployment","r":false,"t":"`$ANY`","union":{"branches":2,"count":1,"depth":11},"key$":"pinned_deployment","index$":16},"project_id":{"a":true,"h":"Project Id","n":"project_id","r":false,"ro":true,"sh":"Requires `project:read` scope.","t":"`$STRING`","key$":"project_id","index$":17},"region":{"a":true,"h":"Region","n":"region","r":false,"t":"`$OBJECT`","key$":"region","index$":18},"spec":{"a":true,"h":"Spec","n":"spec","r":true,"sh":"The desired configuration of an application.","t":"`$OBJECT`","union":{"branches":2,"count":1,"depth":7},"key$":"spec","index$":19},"tier_slug":{"a":true,"h":"Tier Slug","n":"tier_slug","r":false,"ro":true,"t":"`$STRING`","key$":"tier_slug","index$":20},"type":{"a":true,"h":"Type","n":"type","r":false,"sh":"The type of event","t":"`$STRING`","key$":"type","index$":21},"update_all_source_versions":{"a":true,"h":"Update All Source Versions","n":"update_all_source_versions","r":false,"sh":"Whether or not to update the source versions (for example fetching a new commit or image digest) of all components.","t":"`$BOOLEAN`","key$":"update_all_source_versions","index$":22},"updated_at":{"a":true,"fo":"date-time","h":"Updated At","n":"updated_at","r":false,"ro":true,"t":"`$STRING`","key$":"updated_at","index$":23},"vpc":{"a":true,"h":"Vpc","n":"vpc","r":false,"ro":true,"t":"`$OBJECT`","key$":"vpc","index$":24}},"id":{"field":"id","name":"id"},"name":"app","op":{"create":{"input":"data","name":"create","points":[{"a":true,"co":{"id":"POST /v2/apps/{app_id}/events/{event_id}/cancel","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":"4f6c71e2-1e90-4762-9fee-6cc4a0a9f2cf","k":"param","n":"event_id","or":"event_id","r":true,"t":"`$STRING`","index$":0},{"a":true,"ex":"4f6c71e2-1e90-4762-9fee-6cc4a0a9f2cf","k":"param","n":"id","or":"app_id","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"POST","o":"/v2/apps/{app_id}/events/{event_id}/cancel","q":{"$action":"cancel","exist":["event_id","id"]},"r":{"param":{"app_id":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v2"},{"lit":"apps"},{"var":"id"},{"lit":"events"},{"var":"event_id"},{"lit":"cancel"}],"t":{"req":"`reqdata`","res":"`body.event`"},"index$":0},{"a":true,"co":{"id":"POST /v2/apps/{app_id}/rollback/commit","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":"4f6c71e2-1e90-4762-9fee-6cc4a0a9f2cf","k":"param","n":"id","or":"app_id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"POST","o":"/v2/apps/{app_id}/rollback/commit","q":{"$action":"rollback_commit","exist":["id"]},"r":{"param":{"app_id":"id"}},"s":[{"lit":"v2"},{"lit":"apps"},{"var":"id"},{"lit":"rollback"},{"lit":"commit"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":1},{"a":true,"co":{"id":"POST /v2/apps/{app_id}/rollback/validate","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":"4f6c71e2-1e90-4762-9fee-6cc4a0a9f2cf","k":"param","n":"id","or":"app_id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"POST","o":"/v2/apps/{app_id}/rollback/validate","q":{"$action":"rollback_validate","exist":["id"]},"r":{"param":{"app_id":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v2"},{"lit":"apps"},{"var":"id"},{"lit":"rollback"},{"lit":"validate"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":2},{"a":true,"co":{"id":"POST /v2/apps","source":"openapi3","version":2},"g":{"header":[{"a":true,"ex":"application/json","k":"header","n":"accept","or":"Accept","r":false,"t":"`$STRING`","index$":0},{"a":true,"ex":"application/json","k":"header","n":"content_type","or":"Content-Type","r":false,"t":"`$STRING`","index$":1}]},"k":"http","m":"POST","o":"/v2/apps","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v2"},{"lit":"apps"}],"t":{"req":"`reqdata`","res":"`body.app`"},"index$":3}],"key$":"create"},"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /v2/apps","source":"openapi3","version":2},"g":{"query":[{"a":true,"ex":1,"k":"query","n":"page","or":"page","r":false,"t":"`$INTEGER`","index$":0},{"a":true,"ex":2,"k":"query","n":"per_page","or":"per_page","r":false,"t":"`$INTEGER`","index$":1},{"a":true,"ex":true,"k":"query","n":"with_project","or":"with_projects","r":false,"t":"`$BOOLEAN`","index$":2}]},"k":"http","m":"GET","o":"/v2/apps","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v2"},{"lit":"apps"}],"t":{"req":"`reqdata`","res":"`body.apps`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /v2/apps/{app_id}/events/{event_id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":"4f6c71e2-1e90-4762-9fee-6cc4a0a9f2cf","k":"param","n":"event_id","or":"event_id","r":true,"t":"`$STRING`","index$":0},{"a":true,"ex":"4f6c71e2-1e90-4762-9fee-6cc4a0a9f2cf","k":"param","n":"id","or":"app_id","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"GET","o":"/v2/apps/{app_id}/events/{event_id}","q":{"exist":["event_id","id"]},"r":{"param":{"app_id":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v2"},{"lit":"apps"},{"var":"id"},{"lit":"events"},{"var":"event_id"}],"t":{"req":"`reqdata`","res":"`body.event`"},"index$":0},{"a":true,"co":{"id":"GET /v2/apps/{id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":"4f6c71e2-1e90-4762-9fee-6cc4a0a9f2cf","k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":0}],"query":[{"a":true,"ex":"myApp","k":"query","n":"name","or":"name","r":false,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/v2/apps/{id}","q":{"exist":["id"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v2"},{"lit":"apps"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body.app`"},"index$":1}],"key$":"load"},"remove":{"input":"data","name":"remove","points":[{"a":true,"co":{"id":"DELETE /v2/apps/{id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":"4f6c71e2-1e90-4762-9fee-6cc4a0a9f2cf","k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"DELETE","o":"/v2/apps/{id}","q":{"exist":["id"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v2"},{"lit":"apps"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"remove"},"update":{"input":"data","name":"update","points":[{"a":true,"co":{"id":"PUT /v2/apps/{id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":"4f6c71e2-1e90-4762-9fee-6cc4a0a9f2cf","k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"PUT","o":"/v2/apps/{id}","q":{"exist":["id"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v2"},{"lit":"apps"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body.app`"},"index$":0}],"key$":"update"}},"relations":{"ancestors":[]},"key$":"app","name__orig":"app","Name":"App","name_":"app","name-":"app","NAME":"APP","index$":103}, {"active":true,"entity":"app","key$":"BasicAppFlow","kind":"basic","name":"BasicAppFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"app_ref01"},"m":{},"o":"create","s":[],"v":[],"index$":0},{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"app_ref01"}}],"index$":1},{"a":true,"d":{},"i":{"ref":"app_ref01","srcdatavar":"app_ref01_data","suffix":"_up0","textfield":"deployment_id"},"m":{},"o":"update","s":[{"apply":"TextFieldMark","def":{"mark":"Mark01-app_ref01"}}],"v":[],"index$":2},{"a":true,"d":{},"i":{"ref":"app_ref01","srcdatavar":"app_ref01_data","suffix":"_dt0"},"m":{"id":"app01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-app_ref01"}}],"index$":3},{"a":true,"d":{},"i":{"ref":"app_ref01","suffix":"_rm0"},"m":{"id":"app01"},"o":"remove","s":[],"v":[],"index$":4},{"a":true,"d":{},"i":{"suffix":"_rt0"},"m":{},"o":"list","s":[],"v":[{"apply":"ItemNotExists","def":{"ref":"app_ref01"}}],"index$":5}]}, 'App', {"POST /v2/apps/{app_id}/events/{event_id}/cancel":{"protocol":"http","parameters":[{"description":"The app ID","in":"path","name":"app_id","required":true,"schema":{"type":"string"},"example":"4f6c71e2-1e90-4762-9fee-6cc4a0a9f2cf","x-ref":"#/components/parameters/app_id","index$":0},{"description":"The event ID","in":"path","name":"event_id","required":true,"schema":{"type":"string"},"example":"4f6c71e2-1e90-4762-9fee-6cc4a0a9f2cf","x-ref":"#/components/parameters/event_id","index$":1}]},"POST /v2/apps/{app_id}/rollback/commit":{"protocol":"http","parameters":[{"description":"The app ID","in":"path","name":"app_id","required":true,"schema":{"type":"string"},"example":"4f6c71e2-1e90-4762-9fee-6cc4a0a9f2cf","x-ref":"#/components/parameters/app_id","index$":0}]},"POST /v2/apps/{app_id}/rollback/validate":{"protocol":"http","requestBody":{"content":{"application/json":{"schema":{"type":"object","properties":{"deployment_id":{"type":"string","description":"The ID of the deployment to rollback to.","example":"3aa4d20e-5527-4c00-b496-601fbd22520a","key$":"deployment_id"},"skip_pin":{"type":"boolean","description":"Whether to skip pinning the rollback deployment. If false, the rollback deployment will be pinned and any new deployments including Auto Deploy on Push hooks will be disabled until the rollback is either manually committed or reverted via the CommitAppRollback or RevertAppRollback endpoints respectively. If true, the rollback will be immediately committed and the app will remain unpinned.","example":false,"key$":"skip_pin"}},"x-ref":"#/components/schemas/apps_rollback_app_request"}}},"required":true},"parameters":[{"description":"The app ID","in":"path","name":"app_id","required":true,"schema":{"type":"string"},"example":"4f6c71e2-1e90-4762-9fee-6cc4a0a9f2cf","x-ref":"#/components/parameters/app_id","index$":0}]},"POST /v2/apps":{"protocol":"http","requestBody":{"content":{"application/json":{"schema":{"properties":{"spec":{"title":"AppSpec","type":"object","description":"The desired configuration of an application.","properties":{"name":{"description":"The name of the app. Must be unique across all apps in the same account.","maxLength":32,"minLength":2,"pattern":"^[a-z][a-z0-9-]{0,30}[a-z0-9]$","type":"string","example":"web-app-01"},"region":{"description":"The slug form of the geographical origin of the app. Default: `nearest available`","type":"string","enum":["atl","nyc","sfo","tor","ams","fra","lon","blr","sgp","syd"],"example":"nyc"},"disable_edge_cache":{"description":"If set to `true`, the app will **not** be cached at the edge (CDN). Enable this option if you want to manage CDN configuration yourself—whether by using an external CDN provider or by handling static content and caching within your app. This setting is also recommended for apps that require real-time data or serve dynamic content, such as those using Server-Sent Events (SSE) over GET, or hosting an MCP (Model Context Protocol) Server that utilizes SSE.  \n**Note:** This feature is not available for static site components.  \nFor more information, see [Disable CDN Cache](https://docs.digitalocean.com/products/app-platform/how-to/cache-content/#disable-cdn-cache).","type":"boolean","default":false},"disable_email_obfuscation":{"description":"If set to `true`, email addresses in the app will not be obfuscated. This is\nuseful for apps that require email addresses to be visible (in the HTML markup).","type":"boolean","default":false},"enhanced_threat_control_enabled":{"description":"If set to `true`, suspicious requests will go through additional security checks to help mitigate layer 7 DDoS attacks.","type":"boolean","default":false},"domains":{"description":"A set of hostnames where the application will be available.","type":"array","items":{"type":"object","properties":{},"required":[],"x-ref":"#/components/schemas/app_domain_spec"}},"services":{"description":"Workloads which expose publicly-accessible HTTP services.","type":"array","items":{"allOf":[],"x-ref":"#/components/schemas/app_service_spec"}},"static_sites":{"description":"Content which can be rendered to static web assets.","type":"array","items":{"allOf":[],"required":[],"x-ref":"#/components/schemas/app_static_site_spec"}},"jobs":{"description":"Pre and post deployment workloads which do not expose publicly-accessible HTTP routes.","type":"array","items":{"allOf":[],"x-ref":"#/components/schemas/app_job_spec"}},"workers":{"description":"Workloads which do not expose publicly-accessible HTTP services.","items":{"allOf":[],"required":[],"x-ref":"#/components/schemas/app_worker_spec"},"type":"array"},"functions":{"description":"Workloads which expose publicly-accessible HTTP services via Functions Components.","items":{"type":"object","properties":{},"required":[],"x-ref":"#/components/schemas/app_functions_spec"},"type":"array"},"databases":{"description":"Database instances which can provide persistence to workloads within the\napplication.","type":"array","items":{"type":"object","properties":{},"required":[],"x-ref":"#/components/schemas/app_database_spec"}},"ingress":{"type":"object","properties":{"rules":{},"custom_error_page_url":{}},"description":"Specification for app ingress configurations.","x-ref":"#/components/schemas/app_ingress_spec"},"egress":{"type":"object","description":"Specification for app egress configurations.","properties":{"type":{}},"x-ref":"#/components/schemas/app_egress_spec"},"maintenance":{"type":"object","description":"Specification to configure maintenance settings for the app, such as maintenance mode and archiving the app.","properties":{"enabled":{},"archive":{},"offline_page_url":{}},"x-ref":"#/components/schemas/app_maintenance_spec"},"vpc":{"type":"object","readOnly":true,"properties":{"id":{},"egress_ips":{}},"x-ref":"#/components/schemas/apps_vpc"}},"required":["name"],"x-ref":"#/components/schemas/app_spec","key$":"spec"},"project_id":{"type":"string","description":"The ID of the project the app should be assigned to. If omitted, it will be assigned to your default project.\n<br><br>Requires `project:assign_resource` and `project:update` scopes.\n","key$":"project_id"}},"required":["spec"],"type":"object","x-ref":"#/components/schemas/apps_create_app_request","index$":1},"example":{"spec":{"name":"web-app","region":"nyc","disable_edge_cache":true,"disable_email_obfuscation":false,"enhanced_threat_control_enabled":true,"services":[{"name":"api","github":{"branch":"main","deploy_on_push":true,"repo":"digitalocean/sample-golang"},"run_command":"bin/api","environment_slug":"node-js","instance_count":2,"instance_size_slug":"apps-s-1vcpu-0.5gb","routes":[{"path":"/api"}]}],"egress":{"type":"DEDICATED_IP"},"vpc":{"id":"c22d8f48-4bc4-49f5-8ca0-58e7164427ac"}}}}},"required":true},"parameters":[{"description":"The content-type that should be used by the response. By default, the response will be `application/json`. `application/yaml` is also supported.","in":"header","name":"Accept","schema":{"type":"string","enum":["application/json","application/yaml"]},"example":"application/json","x-ref":"#/components/parameters/accept","index$":0},{"description":"The content-type used for the request. By default, the requests are assumed to use `application/json`. `application/yaml` is also supported.","in":"header","name":"Content-Type","schema":{"type":"string","enum":["application/json","application/yaml"]},"example":"application/json","x-ref":"#/components/parameters/content-type","index$":1}]},"GET /v2/apps":{"protocol":"http","parameters":[{"in":"query","name":"page","required":false,"description":"Which 'page' of paginated results to return.","schema":{"type":"integer","minimum":1,"default":1},"example":1,"x-ref":"#/components/parameters/page","index$":0},{"in":"query","name":"per_page","required":false,"description":"Number of items returned per page","schema":{"type":"integer","minimum":1,"default":20,"maximum":200},"example":2,"x-ref":"#/components/parameters/parameters_per_page","index$":1},{"description":"Whether the project_id of listed apps should be fetched and included.","in":"query","name":"with_projects","schema":{"type":"boolean"},"example":true,"x-ref":"#/components/parameters/with_projects","index$":2}]},"GET /v2/apps/{app_id}/events/{event_id}":{"protocol":"http","parameters":[{"description":"The app ID","in":"path","name":"app_id","required":true,"schema":{"type":"string"},"example":"4f6c71e2-1e90-4762-9fee-6cc4a0a9f2cf","x-ref":"#/components/parameters/app_id","index$":0},{"description":"The event ID","in":"path","name":"event_id","required":true,"schema":{"type":"string"},"example":"4f6c71e2-1e90-4762-9fee-6cc4a0a9f2cf","x-ref":"#/components/parameters/event_id","index$":1}]},"GET /v2/apps/{id}":{"protocol":"http","parameters":[{"description":"The ID of the app","in":"path","name":"id","required":true,"schema":{"type":"string"},"example":"4f6c71e2-1e90-4762-9fee-6cc4a0a9f2cf","x-ref":"#/components/parameters/id_app","index$":0},{"description":"The name of the app to retrieve.","in":"query","name":"name","schema":{"type":"string"},"example":"myApp","x-ref":"#/components/parameters/app_name","index$":1}]},"DELETE /v2/apps/{id}":{"protocol":"http","parameters":[{"description":"The ID of the app","in":"path","name":"id","required":true,"schema":{"type":"string"},"example":"4f6c71e2-1e90-4762-9fee-6cc4a0a9f2cf","x-ref":"#/components/parameters/id_app","index$":0}]},"PUT /v2/apps/{id}":{"protocol":"http","requestBody":{"content":{"application/json":{"schema":{"type":"object","properties":{"spec":{"title":"AppSpec","type":"object","description":"The desired configuration of an application.","properties":{"name":{"description":"The name of the app. Must be unique across all apps in the same account.","maxLength":32,"minLength":2,"pattern":"^[a-z][a-z0-9-]{0,30}[a-z0-9]$","type":"string","example":"web-app-01"},"region":{"description":"The slug form of the geographical origin of the app. Default: `nearest available`","type":"string","enum":["atl","nyc","sfo","tor","ams","fra","lon","blr","sgp","syd"],"example":"nyc"},"disable_edge_cache":{"description":"If set to `true`, the app will **not** be cached at the edge (CDN). Enable this option if you want to manage CDN configuration yourself—whether by using an external CDN provider or by handling static content and caching within your app. This setting is also recommended for apps that require real-time data or serve dynamic content, such as those using Server-Sent Events (SSE) over GET, or hosting an MCP (Model Context Protocol) Server that utilizes SSE.  \n**Note:** This feature is not available for static site components.  \nFor more information, see [Disable CDN Cache](https://docs.digitalocean.com/products/app-platform/how-to/cache-content/#disable-cdn-cache).","type":"boolean","default":false},"disable_email_obfuscation":{"description":"If set to `true`, email addresses in the app will not be obfuscated. This is\nuseful for apps that require email addresses to be visible (in the HTML markup).","type":"boolean","default":false},"enhanced_threat_control_enabled":{"description":"If set to `true`, suspicious requests will go through additional security checks to help mitigate layer 7 DDoS attacks.","type":"boolean","default":false},"domains":{"description":"A set of hostnames where the application will be available.","type":"array","items":{"type":"object","properties":{},"required":[],"x-ref":"#/components/schemas/app_domain_spec"}},"services":{"description":"Workloads which expose publicly-accessible HTTP services.","type":"array","items":{"allOf":[],"x-ref":"#/components/schemas/app_service_spec"}},"static_sites":{"description":"Content which can be rendered to static web assets.","type":"array","items":{"allOf":[],"required":[],"x-ref":"#/components/schemas/app_static_site_spec"}},"jobs":{"description":"Pre and post deployment workloads which do not expose publicly-accessible HTTP routes.","type":"array","items":{"allOf":[],"x-ref":"#/components/schemas/app_job_spec"}},"workers":{"description":"Workloads which do not expose publicly-accessible HTTP services.","items":{"allOf":[],"required":[],"x-ref":"#/components/schemas/app_worker_spec"},"type":"array"},"functions":{"description":"Workloads which expose publicly-accessible HTTP services via Functions Components.","items":{"type":"object","properties":{},"required":[],"x-ref":"#/components/schemas/app_functions_spec"},"type":"array"},"databases":{"description":"Database instances which can provide persistence to workloads within the\napplication.","type":"array","items":{"type":"object","properties":{},"required":[],"x-ref":"#/components/schemas/app_database_spec"}},"ingress":{"type":"object","properties":{"rules":{},"custom_error_page_url":{}},"description":"Specification for app ingress configurations.","x-ref":"#/components/schemas/app_ingress_spec"},"egress":{"type":"object","description":"Specification for app egress configurations.","properties":{"type":{}},"x-ref":"#/components/schemas/app_egress_spec"},"maintenance":{"type":"object","description":"Specification to configure maintenance settings for the app, such as maintenance mode and archiving the app.","properties":{"enabled":{},"archive":{},"offline_page_url":{}},"x-ref":"#/components/schemas/app_maintenance_spec"},"vpc":{"type":"object","readOnly":true,"properties":{"id":{},"egress_ips":{}},"x-ref":"#/components/schemas/apps_vpc"}},"required":["name"],"x-ref":"#/components/schemas/app_spec","key$":"spec"},"update_all_source_versions":{"type":"boolean","description":"Whether or not to update the source versions (for example fetching a new commit or image digest) of all components. By default (when this is false) only newly added sources will be updated to avoid changes like updating the scale of a component from also updating the respective code.","example":true,"default":false,"key$":"update_all_source_versions"}},"required":["spec"],"x-ref":"#/components/schemas/apps_update_app_request","index$":1}}},"required":true},"parameters":[{"description":"The ID of the app","in":"path","name":"id","required":true,"schema":{"type":"string"},"example":"4f6c71e2-1e90-4762-9fee-6cc4a0a9f2cf","x-ref":"#/components/parameters/id_app","index$":0}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const app_ref01_ent = client.App()
    let app_ref01_data = setup.data.new.app['app_ref01']

    app_ref01_data = (await app_ref01_ent.create(app_ref01_data)).data()
    assert(null != app_ref01_data.id)


    // LIST
    const app_ref01_match: any = {}

    const app_ref01_list = (await app_ref01_ent.list(app_ref01_match)).map((e: any) => e.data())

    assert(!isempty(select(app_ref01_list, { id: app_ref01_data.id })))


    // UPDATE
    const app_ref01_data_up0: any = {}
    app_ref01_data_up0.id = app_ref01_data.id

    const app_ref01_markdef_up0 = { name: 'deployment_id', value: 'Mark01-app_ref01_' + setup.now }
    ;(app_ref01_data_up0 as any)[app_ref01_markdef_up0.name] = app_ref01_markdef_up0.value

    const app_ref01_resdata_up0 = (await app_ref01_ent.update(app_ref01_data_up0)).data()
    assert(app_ref01_resdata_up0.id === app_ref01_data_up0.id)

    assert((app_ref01_resdata_up0 as any)[app_ref01_markdef_up0.name] === app_ref01_markdef_up0.value)


    // LOAD
    const app_ref01_match_dt0: any = {}
    app_ref01_match_dt0.id = app_ref01_data.id
    const app_ref01_data_dt0 = (await app_ref01_ent.load(app_ref01_match_dt0)).data()
    assert(app_ref01_data_dt0.id === app_ref01_data.id)


    // REMOVE
    const app_ref01_match_rm0: any = { id: app_ref01_data.id }
    await app_ref01_ent.remove(app_ref01_match_rm0)
  

    // LIST
    const app_ref01_match_rt0: any = {}

    const app_ref01_list_rt0 = (await app_ref01_ent.list(app_ref01_match_rt0)).map((e: any) => e.data())

    assert(isempty(select(app_ref01_list_rt0, { id: app_ref01_data.id })))


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
      '../../../../.sdk/test/entity/app/AppTestData.json')

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
    ['app01','app02','app03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'DIGITALOCEAN_TEST_APP_ENTID': idmap,
    'DIGITALOCEAN_TEST_LIVE': 'FALSE',
    'DIGITALOCEAN_TEST_EXPLAIN': 'FALSE',
    'DIGITALOCEAN_APIKEY': '',
  })

  idmap = env['DIGITALOCEAN_TEST_APP_ENTID']

  const live = 'TRUE' === env.DIGITALOCEAN_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['DIGITALOCEAN_TEST_APP_ENTID']
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
  
