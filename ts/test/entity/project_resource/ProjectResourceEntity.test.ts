

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


describe('ProjectResourceEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when DIGITALOCEAN_TEST_LIVE=TRUE.
  afterEach(liveDelay('DIGITALOCEAN_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = DigitaloceanSDK.test()
    const ent = testsdk.ProjectResource()
    assert(null != ent)
  })


  class FailHook extends BaseFeature {
    name = 'failhook'
    version = '0.0.1'
    active = true
    unexpected = 0
    init() { }
    PreSpec() { throw new Error('project_resource hook failed') }
    PreUnexpected() { this.unexpected++ }
  }

  test('stream-error', async () => {
    const offline = { net: { offline: true } }
    await assert.rejects(async () => {
      for await (const _item of DigitaloceanSDK.test(offline).ProjectResource().stream('list')) { }
    }, /offline/)

    for await (const _item of DigitaloceanSDK.test(offline).ProjectResource()
      .stream('list', undefined, { ctrl: { throw: false } })) { }

    if (null != (config as any).feature?.rbac) {
      const denied = DigitaloceanSDK.test(undefined, { feature: { rbac: { active: true, deny: true } } })
      await assert.rejects(async () => {
        for await (const _item of denied.ProjectResource().stream('list')) { }
      }, (err: any) => 'rbac_denied' === err.code)
    }
  })

  test('stream-ctrl', async () => {
    const explain: any = {}
    const ctrl: any = { explain }
    for await (const _item of DigitaloceanSDK.test().ProjectResource().stream('list', undefined, { ctrl })) { }
    assert.deepStrictEqual(Object.keys(ctrl), ['explain'])
    assert(explain === ctrl.explain && 0 < Object.keys(explain).length)
  })

  test('unexpected', async () => {
    const hook = new FailHook()
    const client = new DigitaloceanSDK({ feature: { test: { active: true } }, extend: [hook] })
    await assert.rejects(client.ProjectResource().list(), /hook failed/)
    assert(0 < hook.unexpected)

    const fired = hook.unexpected
    assert.strictEqual(await client.ProjectResource().list(undefined, { throw: false }), undefined)
    assert(fired < hook.unexpected)
  })

  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = DigitaloceanSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.ProjectResource().list({"id":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.DIGITALOCEAN_TEST_LIVE
    for (const op of ['create', 'list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'project_resource.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"assigned_at":{"a":true,"fo":"date-time","h":"Assigned At","n":"assigned_at","r":false,"sh":"A time value given in ISO8601 combined date and time format that represents when the project was created.","t":"`$STRING`","key$":"assigned_at","index$":0},"id":{"a":true,"h":"Id","n":"id","r":false,"t":"`$STRING`","key$":"id","index$":1},"links":{"a":true,"h":"Links","n":"links","r":false,"sh":"The links object contains the `self` object, which contains the resource relationship.","t":"`$OBJECT`","key$":"links","index$":2},"resources":{"a":true,"h":"Resources","n":"resources","r":false,"sh":"All resources, including the ones added in the request, that are assigned to the project.","t":"`$ARRAY`","key$":"resources","index$":3},"status":{"a":true,"h":"Status","n":"status","r":false,"sh":"The status of assigning and fetching the resources.","t":"`$STRING`","key$":"status","index$":4},"urn":{"a":true,"h":"Urn","n":"urn","r":false,"sh":"The uniform resource name (URN) for the resource in the format do:resource_type:resource_id.","t":"`$STRING`","key$":"urn","index$":5}},"id":{"field":"id","name":"id"},"name":"project_resource","op":{"create":{"input":"data","name":"create","points":[{"a":true,"co":{"id":"POST /v2/projects/{project_id}/resources","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":"4de7ac8b-495b-4884-9a69-1050c6793cd6","k":"param","n":"id","or":"project_id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"POST","o":"/v2/projects/{project_id}/resources","q":{"exist":["id"]},"r":{"param":{"project_id":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v2"},{"lit":"projects"},{"var":"id"},{"lit":"resources"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0},{"a":true,"co":{"id":"POST /v2/projects/default/resources","source":"openapi3","version":2},"g":{},"k":"http","m":"POST","o":"/v2/projects/default/resources","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v2"},{"lit":"projects"},{"lit":"default"},{"lit":"resources"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":1}],"key$":"create"},"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /v2/projects/{project_id}/resources","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":"4de7ac8b-495b-4884-9a69-1050c6793cd6","k":"param","n":"id","or":"project_id","r":true,"t":"`$STRING`","index$":0}],"query":[{"a":true,"ex":1,"k":"query","n":"page","or":"page","r":false,"t":"`$INTEGER`","index$":0},{"a":true,"ex":2,"k":"query","n":"per_page","or":"per_page","r":false,"t":"`$INTEGER`","index$":1}]},"k":"http","m":"GET","o":"/v2/projects/{project_id}/resources","q":{"exist":["id"]},"r":{"param":{"project_id":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v2"},{"lit":"projects"},{"var":"id"},{"lit":"resources"}],"t":{"req":"`reqdata`","res":"`body.resources`"},"index$":0},{"a":true,"co":{"id":"GET /v2/projects/default/resources","source":"openapi3","version":2},"g":{},"k":"http","m":"GET","o":"/v2/projects/default/resources","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v2"},{"lit":"projects"},{"lit":"default"},{"lit":"resources"}],"t":{"req":"`reqdata`","res":"`body.resources`"},"index$":1}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"project_resource","name__orig":"project_resource","Name":"ProjectResource","name_":"project_resource","name-":"project-resource","NAME":"PROJECT_RESOURCE","index$":188}, {"active":true,"entity":"project_resource","key$":"BasicProjectResourceFlow","kind":"basic","name":"BasicProjectResourceFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"project_resource_ref01"},"m":{},"o":"create","s":[],"v":[],"index$":0},{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"project_resource_ref01"}}],"index$":1}]}, 'ProjectResource', {"POST /v2/projects/{project_id}/resources":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","properties":{"resources":{"type":"array","items":{"type":"string","pattern":"^do:(dbaas|domain|droplet|floatingip|loadbalancer|space|volume|kubernetes|vpc):.*","example":"do:droplet:13457723","description":"The uniform resource name (URN) for the resource in the format do:resource_type:resource_id.","x-ref":"#/components/schemas/urn"},"example":["do:droplet:13457723"],"description":"A list of uniform resource names (URNs) to be added to a project. Only resources that you are authorized to see will be returned.","key$":"resources"}},"x-ref":"#/components/schemas/project_assignment","index$":1},"examples":{"assign_resources":{"value":{"resources":["do:droplet:13457723","do:domain:example.com"]}}}}}},"parameters":[{"in":"path","name":"project_id","description":"A unique identifier for a project.","required":true,"schema":{"type":"string","format":"uuid","minimum":1},"example":"4de7ac8b-495b-4884-9a69-1050c6793cd6","x-ref":"#/components/parameters/project_id","index$":0}]},"POST /v2/projects/default/resources":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","properties":{"resources":{"type":"array","items":{"type":"string","pattern":"^do:(dbaas|domain|droplet|floatingip|loadbalancer|space|volume|kubernetes|vpc):.*","example":"do:droplet:13457723","description":"The uniform resource name (URN) for the resource in the format do:resource_type:resource_id.","x-ref":"#/components/schemas/urn"},"example":["do:droplet:13457723"],"description":"A list of uniform resource names (URNs) to be added to a project. Only resources that you are authorized to see will be returned.","key$":"resources"}},"x-ref":"#/components/schemas/project_assignment","index$":1},"examples":{"assign_resources":{"value":{"resources":["do:droplet:13457723","do:domain:example.com"]}}}}}},"parameters":[]},"GET /v2/projects/{project_id}/resources":{"protocol":"http","parameters":[{"in":"path","name":"project_id","description":"A unique identifier for a project.","required":true,"schema":{"type":"string","format":"uuid","minimum":1},"example":"4de7ac8b-495b-4884-9a69-1050c6793cd6","x-ref":"#/components/parameters/project_id","index$":0},{"in":"query","name":"per_page","required":false,"description":"Number of items returned per page","schema":{"type":"integer","minimum":1,"default":20,"maximum":200},"example":2,"x-ref":"#/components/parameters/parameters_per_page","index$":1},{"in":"query","name":"page","required":false,"description":"Which 'page' of paginated results to return.","schema":{"type":"integer","minimum":1,"default":1},"example":1,"x-ref":"#/components/parameters/page","index$":2}]},"GET /v2/projects/default/resources":{"protocol":"http","parameters":[]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const project_resource_ref01_ent = client.ProjectResource()
    let project_resource_ref01_data = setup.data.new.project_resource['project_resource_ref01']

    project_resource_ref01_data = (await project_resource_ref01_ent.create(project_resource_ref01_data)).data()
    assert(null != project_resource_ref01_data.id)


    // LIST
    const project_resource_ref01_match: any = {}

    const project_resource_ref01_list = (await project_resource_ref01_ent.list(project_resource_ref01_match)).map((e: any) => e.data())

    assert(!isempty(select(project_resource_ref01_list, { id: project_resource_ref01_data.id })))


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
      '../../../../.sdk/test/entity/project_resource/ProjectResourceTestData.json')

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
    ['project_resource01','project_resource02','project_resource03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'DIGITALOCEAN_TEST_PROJECT_RESOURCE_ENTID': idmap,
    'DIGITALOCEAN_TEST_LIVE': 'FALSE',
    'DIGITALOCEAN_TEST_EXPLAIN': 'FALSE',
    'DIGITALOCEAN_APIKEY': '',
  })

  idmap = env['DIGITALOCEAN_TEST_PROJECT_RESOURCE_ENTID']

  const live = 'TRUE' === env.DIGITALOCEAN_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['DIGITALOCEAN_TEST_PROJECT_RESOURCE_ENTID']
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
  
