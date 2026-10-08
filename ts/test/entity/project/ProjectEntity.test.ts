

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


describe('ProjectEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when DIGITALOCEAN_TEST_LIVE=TRUE.
  afterEach(liveDelay('DIGITALOCEAN_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = DigitaloceanSDK.test()
    const ent = testsdk.Project()
    assert(null != ent)
  })


  class FailHook extends BaseFeature {
    name = 'failhook'
    version = '0.0.1'
    active = true
    unexpected = 0
    init() { }
    PreSpec() { throw new Error('project hook failed') }
    PreUnexpected() { this.unexpected++ }
  }

  test('stream-error', async () => {
    const offline = { net: { offline: true } }
    await assert.rejects(async () => {
      for await (const _item of DigitaloceanSDK.test(offline).Project().stream('list')) { }
    }, /offline/)

    for await (const _item of DigitaloceanSDK.test(offline).Project()
      .stream('list', undefined, { ctrl: { throw: false } })) { }

    if (null != (config as any).feature?.rbac) {
      const denied = DigitaloceanSDK.test(undefined, { feature: { rbac: { active: true, deny: true } } })
      await assert.rejects(async () => {
        for await (const _item of denied.Project().stream('list')) { }
      }, (err: any) => 'rbac_denied' === err.code)
    }
  })

  test('stream-ctrl', async () => {
    const explain: any = {}
    const ctrl: any = { explain }
    for await (const _item of DigitaloceanSDK.test().Project().stream('list', undefined, { ctrl })) { }
    assert.deepStrictEqual(Object.keys(ctrl), ['explain'])
    assert(explain === ctrl.explain && 0 < Object.keys(explain).length)
  })

  test('unexpected', async () => {
    const hook = new FailHook()
    const client = new DigitaloceanSDK({ feature: { test: { active: true } }, extend: [hook] })
    await assert.rejects(client.Project().list(), /hook failed/)
    assert(0 < hook.unexpected)

    const fired = hook.unexpected
    assert.strictEqual(await client.Project().list(undefined, { throw: false }), undefined)
    assert(fired < hook.unexpected)
  })

  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = DigitaloceanSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.Project().list({"page":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.DIGITALOCEAN_TEST_LIVE
    for (const op of ['create', 'list', 'update', 'load', 'remove']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'project.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"created_at":{"a":true,"fo":"date-time","h":"Created At","n":"created_at","r":false,"ro":true,"sh":"A time value given in ISO8601 combined date and time format that represents when the project was created.","t":"`$STRING`","key$":"created_at","index$":0},"description":{"a":true,"h":"Description","n":"description","op":{"update":{"req":true,"type":"`$STRING`"}},"r":false,"sh":"The description of the project.","t":"`$STRING`","key$":"description","index$":1},"environment":{"a":true,"h":"Environment","n":"environment","op":{"update":{"req":true,"type":"`$STRING`"}},"r":false,"sh":"The environment of the project's resources.","t":"`$STRING`","key$":"environment","index$":2},"id":{"a":true,"fo":"uuid","h":"Id","n":"id","r":false,"ro":true,"sh":"The unique universal identifier of this project.","t":"`$STRING`","key$":"id","index$":3},"is_default":{"a":true,"h":"Is Default","n":"is_default","op":{"update":{"req":true,"type":"`$BOOLEAN`"}},"r":false,"sh":"If true, all resources will be added to this project if no project is specified.","t":"`$BOOLEAN`","key$":"is_default","index$":4},"name":{"a":true,"h":"Name","n":"name","op":{"create":{"req":true,"type":"`$STRING`"},"update":{"req":true,"type":"`$STRING`"}},"r":false,"sh":"The human-readable name for the project.","t":"`$STRING`","key$":"name","index$":5},"owner_id":{"a":true,"h":"Owner Id","n":"owner_id","r":false,"ro":true,"sh":"The integer id of the project owner.","t":"`$INTEGER`","key$":"owner_id","index$":6},"owner_uuid":{"a":true,"h":"Owner Uuid","n":"owner_uuid","r":false,"ro":true,"sh":"The unique universal identifier of the project owner.","t":"`$STRING`","key$":"owner_uuid","index$":7},"purpose":{"a":true,"h":"Purpose","n":"purpose","op":{"create":{"req":true,"type":"`$STRING`"},"update":{"req":true,"type":"`$STRING`"}},"r":false,"sh":"The purpose of the project.","t":"`$STRING`","key$":"purpose","index$":8},"updated_at":{"a":true,"fo":"date-time","h":"Updated At","n":"updated_at","r":false,"ro":true,"sh":"A time value given in ISO8601 combined date and time format that represents when the project was updated.","t":"`$STRING`","key$":"updated_at","index$":9}},"id":{"field":"id","name":"id"},"name":"project","op":{"create":{"input":"data","name":"create","points":[{"a":true,"co":{"id":"POST /v2/projects","source":"openapi3","version":2},"g":{},"k":"http","m":"POST","o":"/v2/projects","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v2"},{"lit":"projects"}],"t":{"req":"`reqdata`","res":"`body.project`"},"index$":0}],"key$":"create"},"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /v2/projects","source":"openapi3","version":2},"g":{"query":[{"a":true,"ex":1,"k":"query","n":"page","or":"page","r":false,"t":"`$INTEGER`","index$":0},{"a":true,"ex":2,"k":"query","n":"per_page","or":"per_page","r":false,"t":"`$INTEGER`","index$":1}]},"k":"http","m":"GET","o":"/v2/projects","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v2"},{"lit":"projects"}],"t":{"req":"`reqdata`","res":"`body.projects`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /v2/projects/{project_id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":"4de7ac8b-495b-4884-9a69-1050c6793cd6","k":"param","n":"id","or":"project_id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/v2/projects/{project_id}","q":{"exist":["id"]},"r":{"param":{"project_id":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v2"},{"lit":"projects"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body.project`"},"index$":0},{"a":true,"co":{"id":"GET /v2/projects/default","source":"openapi3","version":2},"g":{},"k":"http","m":"GET","o":"/v2/projects/default","q":{"$action":"default"},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v2"},{"lit":"projects"},{"lit":"default"}],"t":{"req":"`reqdata`","res":"`body.project`"},"index$":1}],"key$":"load"},"patch":{"input":"data","name":"patch","points":[{"a":true,"co":{"id":"PATCH /v2/projects/{project_id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":"4de7ac8b-495b-4884-9a69-1050c6793cd6","k":"param","n":"id","or":"project_id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"PATCH","o":"/v2/projects/{project_id}","q":{"exist":["id"]},"r":{"param":{"project_id":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v2"},{"lit":"projects"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body.project`"},"index$":0},{"a":true,"co":{"id":"PATCH /v2/projects/default","source":"openapi3","version":2},"g":{},"k":"http","m":"PATCH","o":"/v2/projects/default","q":{"$action":"default"},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v2"},{"lit":"projects"},{"lit":"default"}],"t":{"req":"`reqdata`","res":"`body.project`"},"index$":1}],"key$":"patch"},"remove":{"input":"data","name":"remove","points":[{"a":true,"co":{"id":"DELETE /v2/projects/{project_id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":"4de7ac8b-495b-4884-9a69-1050c6793cd6","k":"param","n":"id","or":"project_id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"DELETE","o":"/v2/projects/{project_id}","q":{"exist":["id"]},"r":{"param":{"project_id":"id"}},"s":[{"lit":"v2"},{"lit":"projects"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"remove"},"update":{"input":"data","name":"update","points":[{"a":true,"co":{"id":"PUT /v2/projects/{project_id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":"4de7ac8b-495b-4884-9a69-1050c6793cd6","k":"param","n":"id","or":"project_id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"PUT","o":"/v2/projects/{project_id}","q":{"exist":["id"]},"r":{"param":{"project_id":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v2"},{"lit":"projects"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body.project`"},"index$":0},{"a":true,"co":{"id":"PUT /v2/projects/default","source":"openapi3","version":2},"g":{},"k":"http","m":"PUT","o":"/v2/projects/default","q":{"$action":"default"},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v2"},{"lit":"projects"},{"lit":"default"}],"t":{"req":"`reqdata`","res":"`body.project`"},"index$":1}],"key$":"update"}},"relations":{"ancestors":[]},"key$":"project","name__orig":"project","Name":"Project","name_":"project","name-":"project","NAME":"PROJECT","index$":187}, {"active":true,"entity":"project","key$":"BasicProjectFlow","kind":"basic","name":"BasicProjectFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"project_ref01"},"m":{},"o":"create","s":[],"v":[],"index$":0},{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"project_ref01"}}],"index$":1},{"a":true,"d":{},"i":{"ref":"project_ref01","srcdatavar":"project_ref01_data","suffix":"_up0","textfield":"description"},"m":{},"o":"update","s":[{"apply":"TextFieldMark","def":{"mark":"Mark01-project_ref01"}}],"v":[],"index$":2},{"a":true,"d":{},"i":{"ref":"project_ref01","srcdatavar":"project_ref01_data","suffix":"_dt0"},"m":{},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-project_ref01"}}],"index$":3},{"a":true,"d":{},"i":{"ref":"project_ref01","suffix":"_rm0"},"m":{"id":"project01"},"o":"remove","s":[],"v":[],"index$":4},{"a":true,"d":{},"i":{"suffix":"_rt0"},"m":{},"o":"list","s":[],"v":[{"apply":"ItemNotExists","def":{"ref":"project_ref01"}}],"index$":5}]}, 'Project', {"POST /v2/projects":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"allOf":[{"type":"object","properties":{"id":{"type":"string","format":"uuid","readOnly":true,"example":"4e1bfbc3-dc3e-41f2-a18f-1b4d7ba71679","description":"The unique universal identifier of this project.","key$":"id"},"owner_uuid":{"type":"string","readOnly":true,"example":"99525febec065ca37b2ffe4f852fd2b2581895e7","description":"The unique universal identifier of the project owner.","key$":"owner_uuid"},"owner_id":{"type":"integer","readOnly":true,"example":258992,"description":"The integer id of the project owner.","key$":"owner_id"},"name":{"type":"string","maxLength":175,"example":"my-web-api","description":"The human-readable name for the project. The maximum length is 175 characters and the name must be unique.","key$":"name"},"description":{"type":"string","maxLength":255,"example":"My website API","description":"The description of the project. The maximum length is 255 characters.","key$":"description"},"purpose":{"type":"string","maxLength":255,"example":"Service or API","description":"The purpose of the project. The maximum length is 255 characters. It can\nhave one of the following values:\n\n- Just trying out DigitalOcean\n- Class project / Educational purposes\n- Website or blog\n- Web Application\n- Service or API\n- Mobile Application\n- Machine learning / AI / Data processing\n- IoT\n- Operational / Developer tooling\n\nIf another value for purpose is specified, for example, \"your custom purpose\",\nyour purpose will be stored as `Other: your custom purpose`.\n","key$":"purpose"},"environment":{"type":"string","enum":["Development","Staging","Production"],"example":"Production","description":"The environment of the project's resources.","key$":"environment"},"created_at":{"type":"string","format":"date-time","readOnly":true,"example":"2018-09-27T20:10:35Z","description":"A time value given in ISO8601 combined date and time format that represents when the project was created.","key$":"created_at"},"updated_at":{"type":"string","format":"date-time","readOnly":true,"example":"2018-09-27T20:10:35Z","description":"A time value given in ISO8601 combined date and time format that represents when the project was updated.","key$":"updated_at"}},"x-ref":"#/components/schemas/project_base"}],"required":["name","purpose"],"index$":1}}}},"parameters":[]},"GET /v2/projects":{"protocol":"http","parameters":[{"in":"query","name":"per_page","required":false,"description":"Number of items returned per page","schema":{"type":"integer","minimum":1,"default":20,"maximum":200},"example":2,"x-ref":"#/components/parameters/parameters_per_page","index$":0},{"in":"query","name":"page","required":false,"description":"Which 'page' of paginated results to return.","schema":{"type":"integer","minimum":1,"default":1},"example":1,"x-ref":"#/components/parameters/page","index$":1}]},"GET /v2/projects/{project_id}":{"protocol":"http","parameters":[{"in":"path","name":"project_id","description":"A unique identifier for a project.","required":true,"schema":{"type":"string","format":"uuid","minimum":1},"example":"4de7ac8b-495b-4884-9a69-1050c6793cd6","x-ref":"#/components/parameters/project_id","index$":0}]},"GET /v2/projects/default":{"protocol":"http","parameters":[]},"PATCH /v2/projects/{project_id}":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"allOf":[{"type":"object","properties":{"id":{"type":"string","format":"uuid","readOnly":true,"example":"4e1bfbc3-dc3e-41f2-a18f-1b4d7ba71679","description":"The unique universal identifier of this project.","key$":"id"},"owner_uuid":{"type":"string","readOnly":true,"example":"99525febec065ca37b2ffe4f852fd2b2581895e7","description":"The unique universal identifier of the project owner.","key$":"owner_uuid"},"owner_id":{"type":"integer","readOnly":true,"example":258992,"description":"The integer id of the project owner.","key$":"owner_id"},"name":{"type":"string","maxLength":175,"example":"my-web-api","description":"The human-readable name for the project. The maximum length is 175 characters and the name must be unique.","key$":"name"},"description":{"type":"string","maxLength":255,"example":"My website API","description":"The description of the project. The maximum length is 255 characters.","key$":"description"},"purpose":{"type":"string","maxLength":255,"example":"Service or API","description":"The purpose of the project. The maximum length is 255 characters. It can\nhave one of the following values:\n\n- Just trying out DigitalOcean\n- Class project / Educational purposes\n- Website or blog\n- Web Application\n- Service or API\n- Mobile Application\n- Machine learning / AI / Data processing\n- IoT\n- Operational / Developer tooling\n\nIf another value for purpose is specified, for example, \"your custom purpose\",\nyour purpose will be stored as `Other: your custom purpose`.\n","key$":"purpose"},"environment":{"type":"string","enum":["Development","Staging","Production"],"example":"Production","description":"The environment of the project's resources.","key$":"environment"},"created_at":{"type":"string","format":"date-time","readOnly":true,"example":"2018-09-27T20:10:35Z","description":"A time value given in ISO8601 combined date and time format that represents when the project was created.","key$":"created_at"},"updated_at":{"type":"string","format":"date-time","readOnly":true,"example":"2018-09-27T20:10:35Z","description":"A time value given in ISO8601 combined date and time format that represents when the project was updated.","key$":"updated_at"}},"x-ref":"#/components/schemas/project_base"},{"type":"object","properties":{"is_default":{"type":"boolean","example":false,"description":"If true, all resources will be added to this project if no project is specified.","key$":"is_default"}}}],"x-ref":"#/components/schemas/project","index$":1},"example":{"name":"my-web-api"}}}},"parameters":[{"in":"path","name":"project_id","description":"A unique identifier for a project.","required":true,"schema":{"type":"string","format":"uuid","minimum":1},"example":"4de7ac8b-495b-4884-9a69-1050c6793cd6","x-ref":"#/components/parameters/project_id","index$":0}]},"PATCH /v2/projects/default":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"allOf":[{"type":"object","properties":{"id":{"type":"string","format":"uuid","readOnly":true,"example":"4e1bfbc3-dc3e-41f2-a18f-1b4d7ba71679","description":"The unique universal identifier of this project.","key$":"id"},"owner_uuid":{"type":"string","readOnly":true,"example":"99525febec065ca37b2ffe4f852fd2b2581895e7","description":"The unique universal identifier of the project owner.","key$":"owner_uuid"},"owner_id":{"type":"integer","readOnly":true,"example":258992,"description":"The integer id of the project owner.","key$":"owner_id"},"name":{"type":"string","maxLength":175,"example":"my-web-api","description":"The human-readable name for the project. The maximum length is 175 characters and the name must be unique.","key$":"name"},"description":{"type":"string","maxLength":255,"example":"My website API","description":"The description of the project. The maximum length is 255 characters.","key$":"description"},"purpose":{"type":"string","maxLength":255,"example":"Service or API","description":"The purpose of the project. The maximum length is 255 characters. It can\nhave one of the following values:\n\n- Just trying out DigitalOcean\n- Class project / Educational purposes\n- Website or blog\n- Web Application\n- Service or API\n- Mobile Application\n- Machine learning / AI / Data processing\n- IoT\n- Operational / Developer tooling\n\nIf another value for purpose is specified, for example, \"your custom purpose\",\nyour purpose will be stored as `Other: your custom purpose`.\n","key$":"purpose"},"environment":{"type":"string","enum":["Development","Staging","Production"],"example":"Production","description":"The environment of the project's resources.","key$":"environment"},"created_at":{"type":"string","format":"date-time","readOnly":true,"example":"2018-09-27T20:10:35Z","description":"A time value given in ISO8601 combined date and time format that represents when the project was created.","key$":"created_at"},"updated_at":{"type":"string","format":"date-time","readOnly":true,"example":"2018-09-27T20:10:35Z","description":"A time value given in ISO8601 combined date and time format that represents when the project was updated.","key$":"updated_at"}},"x-ref":"#/components/schemas/project_base"},{"type":"object","properties":{"is_default":{"type":"boolean","example":false,"description":"If true, all resources will be added to this project if no project is specified.","key$":"is_default"}}}],"x-ref":"#/components/schemas/project"},"example":{"name":"my-web-api"}}}},"parameters":[]},"DELETE /v2/projects/{project_id}":{"protocol":"http","parameters":[{"in":"path","name":"project_id","description":"A unique identifier for a project.","required":true,"schema":{"type":"string","format":"uuid","minimum":1},"example":"4de7ac8b-495b-4884-9a69-1050c6793cd6","x-ref":"#/components/parameters/project_id","index$":0}]},"PUT /v2/projects/{project_id}":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"allOf":[{"allOf":[{"type":"object","properties":{"id":{},"owner_uuid":{},"owner_id":{},"name":{},"description":{},"purpose":{},"environment":{},"created_at":{},"updated_at":{}},"x-ref":"#/components/schemas/project_base"},{"type":"object","properties":{"is_default":{}}}],"x-ref":"#/components/schemas/project"}],"required":["name","description","purpose","environment","is_default"],"index$":1}}}},"parameters":[{"in":"path","name":"project_id","description":"A unique identifier for a project.","required":true,"schema":{"type":"string","format":"uuid","minimum":1},"example":"4de7ac8b-495b-4884-9a69-1050c6793cd6","x-ref":"#/components/parameters/project_id","index$":0}]},"PUT /v2/projects/default":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"allOf":[{"allOf":[{"type":"object","properties":{"id":{},"owner_uuid":{},"owner_id":{},"name":{},"description":{},"purpose":{},"environment":{},"created_at":{},"updated_at":{}},"x-ref":"#/components/schemas/project_base"},{"type":"object","properties":{"is_default":{}}}],"x-ref":"#/components/schemas/project"}],"required":["name","description","purpose","environment","is_default"]}}}},"parameters":[]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const project_ref01_ent = client.Project()
    let project_ref01_data = setup.data.new.project['project_ref01']

    project_ref01_data = (await project_ref01_ent.create(project_ref01_data)).data()
    assert(null != project_ref01_data.id)


    // LIST
    const project_ref01_match: any = {}

    const project_ref01_list = (await project_ref01_ent.list(project_ref01_match)).map((e: any) => e.data())

    assert(!isempty(select(project_ref01_list, { id: project_ref01_data.id })))


    // UPDATE
    const project_ref01_data_up0: any = {}
    project_ref01_data_up0.id = project_ref01_data.id

    const project_ref01_markdef_up0 = { name: 'description', value: 'Mark01-project_ref01_' + setup.now }
    ;(project_ref01_data_up0 as any)[project_ref01_markdef_up0.name] = project_ref01_markdef_up0.value

    const project_ref01_resdata_up0 = (await project_ref01_ent.update(project_ref01_data_up0)).data()
    assert(project_ref01_resdata_up0.id === project_ref01_data_up0.id)

    assert((project_ref01_resdata_up0 as any)[project_ref01_markdef_up0.name] === project_ref01_markdef_up0.value)


    // LOAD
    const project_ref01_match_dt0: any = {}
    project_ref01_match_dt0.id = project_ref01_data.id
    const project_ref01_data_dt0 = (await project_ref01_ent.load(project_ref01_match_dt0)).data()
    assert(project_ref01_data_dt0.id === project_ref01_data.id)


    // REMOVE
    const project_ref01_match_rm0: any = { id: project_ref01_data.id }
    await project_ref01_ent.remove(project_ref01_match_rm0)
  

    // LIST
    const project_ref01_match_rt0: any = {}

    const project_ref01_list_rt0 = (await project_ref01_ent.list(project_ref01_match_rt0)).map((e: any) => e.data())

    assert(isempty(select(project_ref01_list_rt0, { id: project_ref01_data.id })))


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
      '../../../../.sdk/test/entity/project/ProjectTestData.json')

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
    ['project01','project02','project03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'DIGITALOCEAN_TEST_PROJECT_ENTID': idmap,
    'DIGITALOCEAN_TEST_LIVE': 'FALSE',
    'DIGITALOCEAN_TEST_EXPLAIN': 'FALSE',
    'DIGITALOCEAN_APIKEY': '',
  })

  idmap = env['DIGITALOCEAN_TEST_PROJECT_ENTID']

  const live = 'TRUE' === env.DIGITALOCEAN_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['DIGITALOCEAN_TEST_PROJECT_ENTID']
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
  
