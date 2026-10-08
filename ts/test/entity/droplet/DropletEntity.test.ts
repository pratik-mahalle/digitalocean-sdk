

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


describe('DropletEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when DIGITALOCEAN_TEST_LIVE=TRUE.
  afterEach(liveDelay('DIGITALOCEAN_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = DigitaloceanSDK.test()
    const ent = testsdk.Droplet()
    assert(null != ent)
  })


  class FailHook extends BaseFeature {
    name = 'failhook'
    version = '0.0.1'
    active = true
    unexpected = 0
    init() { }
    PreSpec() { throw new Error('droplet hook failed') }
    PreUnexpected() { this.unexpected++ }
  }

  test('stream-error', async () => {
    const offline = { net: { offline: true } }
    await assert.rejects(async () => {
      for await (const _item of DigitaloceanSDK.test(offline).Droplet().stream('list')) { }
    }, /offline/)

    for await (const _item of DigitaloceanSDK.test(offline).Droplet()
      .stream('list', undefined, { ctrl: { throw: false } })) { }

    if (null != (config as any).feature?.rbac) {
      const denied = DigitaloceanSDK.test(undefined, { feature: { rbac: { active: true, deny: true } } })
      await assert.rejects(async () => {
        for await (const _item of denied.Droplet().stream('list')) { }
      }, (err: any) => 'rbac_denied' === err.code)
    }
  })

  test('stream-ctrl', async () => {
    const explain: any = {}
    const ctrl: any = { explain }
    for await (const _item of DigitaloceanSDK.test().Droplet().stream('list', undefined, { ctrl })) { }
    assert.deepStrictEqual(Object.keys(ctrl), ['explain'])
    assert(explain === ctrl.explain && 0 < Object.keys(explain).length)
  })

  test('unexpected', async () => {
    const hook = new FailHook()
    const client = new DigitaloceanSDK({ feature: { test: { active: true } }, extend: [hook] })
    await assert.rejects(client.Droplet().list(), /hook failed/)
    assert(0 < hook.unexpected)

    const fired = hook.unexpected
    assert.strictEqual(await client.Droplet().list(undefined, { throw: false }), undefined)
    assert(fired < hook.unexpected)
  })

  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = DigitaloceanSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.Droplet().list({"name":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.DIGITALOCEAN_TEST_LIVE
    for (const op of ['create', 'list', 'load', 'remove']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'droplet.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"backup_ids":{"a":true,"h":"Backup Ids","n":"backup_ids","r":true,"sh":"An array of backup IDs of any backups that have been taken of the Droplet instance.","t":"`$ARRAY`","key$":"backup_ids","index$":0},"created_at":{"a":true,"fo":"date-time","h":"Created At","n":"created_at","r":true,"sh":"A time value given in ISO8601 combined date and time format that represents when the Droplet was created.","t":"`$STRING`","key$":"created_at","index$":1},"disk":{"a":true,"h":"Disk","n":"disk","r":true,"sh":"The size of the Droplet's disk in gigabytes.","t":"`$INTEGER`","key$":"disk","index$":2},"disk_info":{"a":true,"h":"Disk Info","n":"disk_info","r":false,"sh":"An array of objects containing information about the disks available to the Droplet.","t":"`$ARRAY`","key$":"disk_info","index$":3},"droplet":{"a":true,"h":"Droplet","n":"droplet","r":false,"t":"`$OBJECT`","key$":"droplet","index$":4},"features":{"a":true,"h":"Features","n":"features","r":true,"sh":"An array of features enabled on this Droplet.","t":"`$ARRAY`","key$":"features","index$":5},"gpu_info":{"a":true,"h":"Gpu Info","n":"gpu_info","r":false,"sh":"An object containing information about the GPU capabilities of Droplets created with this size.","t":"`$OBJECT`","key$":"gpu_info","index$":6},"id":{"a":true,"h":"Id","n":"id","r":true,"sh":"A unique identifier for each Droplet instance.","t":"`$INTEGER`","key$":"id","index$":7},"image":{"a":true,"h":"Image","n":"image","r":true,"t":"`$ANY`","key$":"image","index$":8},"kernel":{"a":true,"de":true,"h":"Kernel","n":"kernel","r":false,"sh":"**Note**: All Droplets created after March 2017 use internal kernels by default.","t":"`$OBJECT`","key$":"kernel","index$":9},"links":{"a":true,"h":"Links","n":"links","r":false,"t":"`$OBJECT`","union":{"branches":3,"count":1,"depth":2},"key$":"links","index$":10},"locked":{"a":true,"h":"Locked","n":"locked","r":true,"sh":"A boolean value indicating whether the Droplet has been locked, preventing actions by users.","t":"`$BOOLEAN`","key$":"locked","index$":11},"memory":{"a":true,"h":"Memory","n":"memory","r":true,"sh":"Memory of the Droplet in megabytes.","t":"`$INTEGER`","key$":"memory","index$":12},"meta":{"a":true,"h":"Meta","n":"meta","r":true,"t":"`$ANY`","key$":"meta","index$":13},"name":{"a":true,"h":"Name","n":"name","op":{"list":{"req":false,"type":"`$STRING`"}},"r":true,"sh":"The human-readable name set for the Droplet instance.","t":"`$STRING`","key$":"name","index$":14},"networks":{"a":true,"h":"Networks","n":"networks","r":true,"sh":"The details of the network that are configured for the Droplet instance.","t":"`$OBJECT`","key$":"networks","index$":15},"next_backup_window":{"a":true,"h":"Next Backup Window","n":"next_backup_window","r":true,"t":"`$ANY`","key$":"next_backup_window","index$":16},"policies":{"a":true,"h":"Policies","n":"policies","r":false,"sh":"A map where the keys are the Droplet IDs and the values are objects containing the backup policy information for each Droplet.","t":"`$OBJECT`","key$":"policies","index$":17},"possible_days":{"a":true,"h":"Possible Days","n":"possible_days","r":false,"sh":"The day of the week the backup will occur.","t":"`$ARRAY`","key$":"possible_days","index$":18},"possible_window_starts":{"a":true,"h":"Possible Window Starts","n":"possible_window_starts","r":false,"sh":"An array of integers representing the hours of the day that a backup can start.","t":"`$ARRAY`","key$":"possible_window_starts","index$":19},"region":{"a":true,"h":"Region","n":"region","r":true,"t":"`$OBJECT`","key$":"region","index$":20},"retention_period_days":{"a":true,"h":"Retention Period Days","n":"retention_period_days","r":false,"sh":"The number of days that a backup will be kept.","t":"`$INTEGER`","key$":"retention_period_days","index$":21},"size":{"a":true,"h":"Size","n":"size","r":true,"t":"`$OBJECT`","key$":"size","index$":22},"size_slug":{"a":true,"h":"Size Slug","n":"size_slug","r":true,"sh":"The unique slug identifier for the size of this Droplet.","t":"`$STRING`","key$":"size_slug","index$":23},"snapshot_ids":{"a":true,"h":"Snapshot Ids","n":"snapshot_ids","r":true,"sh":"An array of snapshot IDs of any snapshots created from the Droplet instance.<br>Requires `image:read` scope.","t":"`$ARRAY`","key$":"snapshot_ids","index$":24},"status":{"a":true,"h":"Status","n":"status","r":true,"sh":"A status string indicating the state of the Droplet instance.","t":"`$STRING`","key$":"status","index$":25},"subnet_uuid":{"a":true,"h":"Subnet Uuid","n":"subnet_uuid","r":false,"sh":"A string specifying the UUID of the VPC subnet to which the Droplet is assigned.<br>Requires `vpc:read` scope.","t":"`$STRING`","key$":"subnet_uuid","index$":26},"tags":{"a":true,"h":"Tags","n":"tags","r":true,"sh":"An array of Tags the Droplet has been tagged with.<br>Requires `tag:read` scope.","t":"`$ARRAY`","key$":"tags","index$":27},"vcpus":{"a":true,"h":"Vcpus","n":"vcpus","r":true,"sh":"The number of virtual CPUs.","t":"`$INTEGER`","key$":"vcpus","index$":28},"volume_ids":{"a":true,"h":"Volume Ids","n":"volume_ids","r":true,"sh":"A flat array including the unique identifier for each Block Storage volume attached to the Droplet.<br>Requires `block_storage:read` scope.","t":"`$ARRAY`","key$":"volume_ids","index$":29},"vpc_uuid":{"a":true,"h":"Vpc Uuid","n":"vpc_uuid","r":false,"sh":"A string specifying the UUID of the VPC to which the Droplet is assigned.<br>Requires `vpc:read` scope.","t":"`$STRING`","key$":"vpc_uuid","index$":30},"window_length_hours":{"a":true,"h":"Window Length Hours","n":"window_length_hours","r":false,"sh":"The number of hours that a backup window is open.","t":"`$INTEGER`","key$":"window_length_hours","index$":31}},"id":{"field":"id","name":"id"},"name":"droplet","op":{"create":{"input":"data","name":"create","points":[{"a":true,"co":{"id":"POST /v2/droplets/{droplet_id}/destroy_with_associated_resources/retry","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":3164444,"k":"param","n":"id","or":"droplet_id","r":true,"t":"`$INTEGER`","index$":0}]},"k":"http","m":"POST","o":"/v2/droplets/{droplet_id}/destroy_with_associated_resources/retry","q":{"$action":"destroy_with_associated_resource_retry","exist":["id"]},"r":{"param":{"droplet_id":"id"}},"s":[{"lit":"v2"},{"lit":"droplets"},{"var":"id"},{"lit":"destroy_with_associated_resources"},{"lit":"retry"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0},{"a":true,"co":{"id":"POST /v2/droplets","source":"openapi3","version":2},"g":{},"k":"http","m":"POST","o":"/v2/droplets","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v2"},{"lit":"droplets"}],"t":{"req":"`reqdata`","res":"`body.droplet`"},"index$":1}],"key$":"create"},"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /v2/droplets/{droplet_id}/backups","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":3164444,"k":"param","n":"id","or":"droplet_id","r":true,"t":"`$INTEGER`","index$":0}],"query":[{"a":true,"ex":1,"k":"query","n":"page","or":"page","r":false,"t":"`$INTEGER`","index$":0},{"a":true,"ex":2,"k":"query","n":"per_page","or":"per_page","r":false,"t":"`$INTEGER`","index$":1}]},"k":"http","m":"GET","o":"/v2/droplets/{droplet_id}/backups","q":{"$action":"backup","exist":["id"]},"r":{"param":{"droplet_id":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v2"},{"lit":"droplets"},{"var":"id"},{"lit":"backups"}],"t":{"req":"`reqdata`","res":"`body.backups`"},"index$":0},{"a":true,"co":{"id":"GET /v2/droplets/{droplet_id}/destroy_with_associated_resources","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":3164444,"k":"param","n":"id","or":"droplet_id","r":true,"t":"`$INTEGER`","index$":0}]},"k":"http","m":"GET","o":"/v2/droplets/{droplet_id}/destroy_with_associated_resources","q":{"$action":"destroy_with_associated_resource","exist":["id"]},"r":{"param":{"droplet_id":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v2"},{"lit":"droplets"},{"var":"id"},{"lit":"destroy_with_associated_resources"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":1},{"a":true,"co":{"id":"GET /v2/droplets/{droplet_id}/firewalls","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":3164444,"k":"param","n":"id","or":"droplet_id","r":true,"t":"`$INTEGER`","index$":0}],"query":[{"a":true,"ex":1,"k":"query","n":"page","or":"page","r":false,"t":"`$INTEGER`","index$":0},{"a":true,"ex":2,"k":"query","n":"per_page","or":"per_page","r":false,"t":"`$INTEGER`","index$":1}]},"k":"http","m":"GET","o":"/v2/droplets/{droplet_id}/firewalls","q":{"$action":"firewall","exist":["id"]},"r":{"param":{"droplet_id":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v2"},{"lit":"droplets"},{"var":"id"},{"lit":"firewalls"}],"t":{"req":"`reqdata`","res":"`body.firewalls`"},"index$":2},{"a":true,"co":{"id":"GET /v2/droplets/{droplet_id}/kernels","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":3164444,"k":"param","n":"id","or":"droplet_id","r":true,"t":"`$INTEGER`","index$":0}],"query":[{"a":true,"ex":1,"k":"query","n":"page","or":"page","r":false,"t":"`$INTEGER`","index$":0},{"a":true,"ex":2,"k":"query","n":"per_page","or":"per_page","r":false,"t":"`$INTEGER`","index$":1}]},"k":"http","m":"GET","o":"/v2/droplets/{droplet_id}/kernels","q":{"$action":"kernel","exist":["id"]},"r":{"param":{"droplet_id":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v2"},{"lit":"droplets"},{"var":"id"},{"lit":"kernels"}],"t":{"req":"`reqdata`","res":"`body.kernels`"},"index$":3},{"a":true,"co":{"id":"GET /v2/droplets/{droplet_id}/neighbors","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":3164444,"k":"param","n":"id","or":"droplet_id","r":true,"t":"`$INTEGER`","index$":0}]},"k":"http","m":"GET","o":"/v2/droplets/{droplet_id}/neighbors","q":{"$action":"neighbor","exist":["id"]},"r":{"param":{"droplet_id":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v2"},{"lit":"droplets"},{"var":"id"},{"lit":"neighbors"}],"t":{"req":"`reqdata`","res":"`body.droplets`"},"index$":4},{"a":true,"co":{"id":"GET /v2/droplets/{droplet_id}/snapshots","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":3164444,"k":"param","n":"id","or":"droplet_id","r":true,"t":"`$INTEGER`","index$":0}],"query":[{"a":true,"ex":1,"k":"query","n":"page","or":"page","r":false,"t":"`$INTEGER`","index$":0},{"a":true,"ex":2,"k":"query","n":"per_page","or":"per_page","r":false,"t":"`$INTEGER`","index$":1}]},"k":"http","m":"GET","o":"/v2/droplets/{droplet_id}/snapshots","q":{"$action":"snapshot","exist":["id"]},"r":{"param":{"droplet_id":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v2"},{"lit":"droplets"},{"var":"id"},{"lit":"snapshots"}],"t":{"req":"`reqdata`","res":"`body.snapshots`"},"index$":5},{"a":true,"co":{"id":"GET /v2/droplets","source":"openapi3","version":2},"g":{"query":[{"a":true,"ex":"web-01","k":"query","n":"name","or":"name","r":false,"t":"`$STRING`","index$":0},{"a":true,"ex":1,"k":"query","n":"page","or":"page","r":false,"t":"`$INTEGER`","index$":1},{"a":true,"ex":2,"k":"query","n":"per_page","or":"per_page","r":false,"t":"`$INTEGER`","index$":2},{"a":true,"ex":"env:prod","k":"query","n":"tag_name","or":"tag_name","r":false,"t":"`$STRING`","index$":3},{"a":true,"ex":"droplets","k":"query","n":"type","or":"type","r":false,"t":"`$STRING`","index$":4}]},"k":"http","m":"GET","o":"/v2/droplets","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v2"},{"lit":"droplets"}],"t":{"req":"`reqdata`","res":"`body.droplets`"},"index$":6},{"a":true,"co":{"id":"GET /v2/droplets/backups/supported_policies","source":"openapi3","version":2},"g":{},"k":"http","m":"GET","o":"/v2/droplets/backups/supported_policies","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v2"},{"lit":"droplets"},{"lit":"backups"},{"lit":"supported_policies"}],"t":{"req":"`reqdata`","res":"`body.supported_policies`"},"index$":7}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /v2/droplets/{droplet_id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":3164444,"k":"param","n":"id","or":"droplet_id","r":true,"t":"`$INTEGER`","index$":0}]},"k":"http","m":"GET","o":"/v2/droplets/{droplet_id}","q":{"exist":["id"]},"r":{"param":{"droplet_id":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v2"},{"lit":"droplets"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body.droplet`"},"index$":0},{"a":true,"co":{"id":"GET /v2/droplets/{droplet_id}/backups/policy","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":3164444,"k":"param","n":"id","or":"droplet_id","r":true,"t":"`$INTEGER`","index$":0}]},"k":"http","m":"GET","o":"/v2/droplets/{droplet_id}/backups/policy","q":{"$action":"backup_policy","exist":["id"]},"r":{"param":{"droplet_id":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v2"},{"lit":"droplets"},{"var":"id"},{"lit":"backups"},{"lit":"policy"}],"t":{"req":"`reqdata`","res":"`body.policy`"},"index$":1},{"a":true,"co":{"id":"GET /v2/droplets/backups/policies","source":"openapi3","version":2},"g":{"query":[{"a":true,"ex":1,"k":"query","n":"page","or":"page","r":false,"t":"`$INTEGER`","index$":0},{"a":true,"ex":2,"k":"query","n":"per_page","or":"per_page","r":false,"t":"`$INTEGER`","index$":1}]},"k":"http","m":"GET","o":"/v2/droplets/backups/policies","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v2"},{"lit":"droplets"},{"lit":"backups"},{"lit":"policies"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":2}],"key$":"load"},"remove":{"input":"data","name":"remove","points":[{"a":true,"co":{"id":"DELETE /v2/droplets/{droplet_id}/destroy_with_associated_resources/dangerous","source":"openapi3","version":2},"g":{"header":[{"a":true,"ex":true,"k":"header","n":"x_dangerous","or":"X-Dangerous","r":true,"t":"`$BOOLEAN`","index$":0}],"params":[{"a":true,"ex":3164444,"k":"param","n":"id","or":"droplet_id","r":true,"t":"`$INTEGER`","index$":0}]},"k":"http","m":"DELETE","o":"/v2/droplets/{droplet_id}/destroy_with_associated_resources/dangerous","q":{"$action":"destroy_with_associated_resource_dangerous","exist":["id","x_dangerous"]},"r":{"param":{"droplet_id":"id"}},"s":[{"lit":"v2"},{"lit":"droplets"},{"var":"id"},{"lit":"destroy_with_associated_resources"},{"lit":"dangerous"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0},{"a":true,"co":{"id":"DELETE /v2/droplets/{droplet_id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":3164444,"k":"param","n":"id","or":"droplet_id","r":true,"t":"`$INTEGER`","index$":0}]},"k":"http","m":"DELETE","o":"/v2/droplets/{droplet_id}","q":{"exist":["id"]},"r":{"param":{"droplet_id":"id"}},"s":[{"lit":"v2"},{"lit":"droplets"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":1},{"a":true,"co":{"id":"DELETE /v2/droplets/{droplet_id}/destroy_with_associated_resources/selective","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":3164444,"k":"param","n":"id","or":"droplet_id","r":true,"t":"`$INTEGER`","index$":0}]},"k":"http","m":"DELETE","o":"/v2/droplets/{droplet_id}/destroy_with_associated_resources/selective","q":{"$action":"destroy_with_associated_resource_selective","exist":["id"]},"r":{"param":{"droplet_id":"id"}},"s":[{"lit":"v2"},{"lit":"droplets"},{"var":"id"},{"lit":"destroy_with_associated_resources"},{"lit":"selective"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":2},{"a":true,"co":{"id":"DELETE /v2/droplets","source":"openapi3","version":2},"g":{"query":[{"a":true,"ex":"env:test","k":"query","n":"tag_name","or":"tag_name","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"DELETE","o":"/v2/droplets","q":{"exist":["tag_name"]},"r":{},"s":[{"lit":"v2"},{"lit":"droplets"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":3}],"key$":"remove"}},"relations":{"ancestors":[]},"key$":"droplet","name__orig":"droplet","Name":"Droplet","name_":"droplet","name-":"droplet","NAME":"DROPLET","index$":145}, {"active":true,"entity":"droplet","key$":"BasicDropletFlow","kind":"basic","name":"BasicDropletFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"droplet_ref01"},"m":{},"o":"create","s":[],"v":[],"index$":0},{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"droplet_ref01"}}],"index$":1},{"a":true,"d":{},"i":{"ref":"droplet_ref01","srcdatavar":"droplet_ref01_data","suffix":"_dt0"},"m":{},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-droplet_ref01"}}],"index$":2},{"a":true,"d":{},"i":{"ref":"droplet_ref01","suffix":"_rm0"},"m":{},"o":"remove","s":[],"v":[],"index$":3},{"a":true,"d":{},"i":{"suffix":"_rt0"},"m":{},"o":"list","s":[],"v":[{"apply":"ItemNotExists","def":{"ref":"droplet_ref01"}}],"index$":4}]}, 'Droplet', {"POST /v2/droplets/{droplet_id}/destroy_with_associated_resources/retry":{"protocol":"http","parameters":[{"in":"path","name":"droplet_id","description":"A unique identifier for a Droplet instance.","required":true,"schema":{"type":"integer","minimum":1},"example":3164444,"x-ref":"#/components/parameters/droplet_id","index$":0}]},"POST /v2/droplets":{"protocol":"http","requestBody":{"content":{"application/json":{"schema":{"oneOf":[{"title":"Single Droplet Request","allOf":[{"type":"object","properties":{"name":{}},"required":["name"]},{"type":"object","properties":{"region":{},"size":{},"image":{},"ssh_keys":{},"backups":{},"backup_policy":{},"ipv6":{},"monitoring":{},"tags":{},"user_data":{},"private_networking":{},"volumes":{},"vpc_uuid":{},"subnet_uuid":{},"with_droplet_agent":{},"public_networking":{}},"required":["size","image"],"x-ref":"#/components/schemas/droplet_create"}],"x-ref":"#/components/schemas/droplet_single_create"},{"title":"Multiple Droplet Request","allOf":[{"type":"object","properties":{"names":{}},"required":["names"]},{"type":"object","properties":{"region":{},"size":{},"image":{},"ssh_keys":{},"backups":{},"backup_policy":{},"ipv6":{},"monitoring":{},"tags":{},"user_data":{},"private_networking":{},"volumes":{},"vpc_uuid":{},"subnet_uuid":{},"with_droplet_agent":{},"public_networking":{}},"required":["size","image"],"x-ref":"#/components/schemas/droplet_create"}],"x-ref":"#/components/schemas/droplet_multi_create"}],"index$":1},"examples":{"Single Droplet Create Request":{"value":{"name":"example.com","region":"nyc3","size":"s-1vcpu-1gb","image":"ubuntu-20-04-x64","ssh_keys":[289794,"3b:16:e4:bf:8b:00:8b:b8:59:8c:a9:d3:f0:19:fa:45"],"backups":true,"ipv6":true,"monitoring":true,"tags":["env:prod","web"],"user_data":"#cloud-config\nruncmd:\n  - touch /test.txt\n","vpc_uuid":"760e09ef-dc84-11e8-981e-3cfdfeaae000","subnet_uuid":"9c7a0d63-3c4e-4d3d-9f56-3b0fb0e5e4a1"},"x-ref":"#/components/examples/droplet_create_request"},"Multiple Droplet Create Request":{"value":{"names":["sub-01.example.com","sub-02.example.com"],"region":"nyc3","size":"s-1vcpu-1gb","image":"ubuntu-20-04-x64","ssh_keys":[289794,"3b:16:e4:bf:8b:00:8b:b8:59:8c:a9:d3:f0:19:fa:45"],"backups":true,"ipv6":true,"monitoring":true,"tags":["env:prod","web"],"user_data":"#cloud-config\nruncmd:\n  - touch /test.txt\n","vpc_uuid":"760e09ef-dc84-11e8-981e-3cfdfeaae000","subnet_uuid":"9c7a0d63-3c4e-4d3d-9f56-3b0fb0e5e4a1"},"x-ref":"#/components/examples/droplet_multi_create_request"}}}}},"parameters":[]},"GET /v2/droplets/{droplet_id}/backups":{"protocol":"http","parameters":[{"in":"path","name":"droplet_id","description":"A unique identifier for a Droplet instance.","required":true,"schema":{"type":"integer","minimum":1},"example":3164444,"x-ref":"#/components/parameters/droplet_id","index$":0},{"in":"query","name":"per_page","required":false,"description":"Number of items returned per page","schema":{"type":"integer","minimum":1,"default":20,"maximum":200},"example":2,"x-ref":"#/components/parameters/parameters_per_page","index$":1},{"in":"query","name":"page","required":false,"description":"Which 'page' of paginated results to return.","schema":{"type":"integer","minimum":1,"default":1},"example":1,"x-ref":"#/components/parameters/page","index$":2}]},"GET /v2/droplets/{droplet_id}/destroy_with_associated_resources":{"protocol":"http","parameters":[{"in":"path","name":"droplet_id","description":"A unique identifier for a Droplet instance.","required":true,"schema":{"type":"integer","minimum":1},"example":3164444,"x-ref":"#/components/parameters/droplet_id","index$":0}]},"GET /v2/droplets/{droplet_id}/firewalls":{"protocol":"http","parameters":[{"in":"path","name":"droplet_id","description":"A unique identifier for a Droplet instance.","required":true,"schema":{"type":"integer","minimum":1},"example":3164444,"x-ref":"#/components/parameters/droplet_id","index$":0},{"in":"query","name":"per_page","required":false,"description":"Number of items returned per page","schema":{"type":"integer","minimum":1,"default":20,"maximum":200},"example":2,"x-ref":"#/components/parameters/parameters_per_page","index$":1},{"in":"query","name":"page","required":false,"description":"Which 'page' of paginated results to return.","schema":{"type":"integer","minimum":1,"default":1},"example":1,"x-ref":"#/components/parameters/page","index$":2}]},"GET /v2/droplets/{droplet_id}/kernels":{"protocol":"http","parameters":[{"in":"path","name":"droplet_id","description":"A unique identifier for a Droplet instance.","required":true,"schema":{"type":"integer","minimum":1},"example":3164444,"x-ref":"#/components/parameters/droplet_id","index$":0},{"in":"query","name":"per_page","required":false,"description":"Number of items returned per page","schema":{"type":"integer","minimum":1,"default":20,"maximum":200},"example":2,"x-ref":"#/components/parameters/parameters_per_page","index$":1},{"in":"query","name":"page","required":false,"description":"Which 'page' of paginated results to return.","schema":{"type":"integer","minimum":1,"default":1},"example":1,"x-ref":"#/components/parameters/page","index$":2}]},"GET /v2/droplets/{droplet_id}/neighbors":{"protocol":"http","parameters":[{"in":"path","name":"droplet_id","description":"A unique identifier for a Droplet instance.","required":true,"schema":{"type":"integer","minimum":1},"example":3164444,"x-ref":"#/components/parameters/droplet_id","index$":0}]},"GET /v2/droplets/{droplet_id}/snapshots":{"protocol":"http","parameters":[{"in":"path","name":"droplet_id","description":"A unique identifier for a Droplet instance.","required":true,"schema":{"type":"integer","minimum":1},"example":3164444,"x-ref":"#/components/parameters/droplet_id","index$":0},{"in":"query","name":"per_page","required":false,"description":"Number of items returned per page","schema":{"type":"integer","minimum":1,"default":20,"maximum":200},"example":2,"x-ref":"#/components/parameters/parameters_per_page","index$":1},{"in":"query","name":"page","required":false,"description":"Which 'page' of paginated results to return.","schema":{"type":"integer","minimum":1,"default":1},"example":1,"x-ref":"#/components/parameters/page","index$":2}]},"GET /v2/droplets":{"protocol":"http","parameters":[{"in":"query","name":"per_page","required":false,"description":"Number of items returned per page","schema":{"type":"integer","minimum":1,"default":20,"maximum":200},"example":2,"x-ref":"#/components/parameters/parameters_per_page","index$":0},{"in":"query","name":"page","required":false,"description":"Which 'page' of paginated results to return.","schema":{"type":"integer","minimum":1,"default":1},"example":1,"x-ref":"#/components/parameters/page","index$":1},{"in":"query","name":"tag_name","description":"Used to filter Droplets by a specific tag. Can not be combined with `name` or `type`.<br>Requires `tag:read` scope.","required":false,"schema":{"type":"string"},"example":"env:prod","x-ref":"#/components/parameters/droplet_tag_name","index$":2},{"in":"query","name":"name","description":"Used to filter list response by Droplet name returning only exact matches. It is case-insensitive and can not be combined with `tag_name`.","required":false,"schema":{"type":"string"},"example":"web-01","x-ref":"#/components/parameters/droplet_name","index$":3},{"in":"query","name":"type","description":"When `type` is set to `gpus`, only GPU Droplets will be returned. By default, only non-GPU Droplets are returned. Can not be combined with `tag_name`.","required":false,"schema":{"type":"string","enum":["droplets","gpus"]},"example":"droplets","x-ref":"#/components/parameters/droplet_type","index$":4}]},"GET /v2/droplets/backups/supported_policies":{"protocol":"http","parameters":[]},"GET /v2/droplets/{droplet_id}":{"protocol":"http","parameters":[{"in":"path","name":"droplet_id","description":"A unique identifier for a Droplet instance.","required":true,"schema":{"type":"integer","minimum":1},"example":3164444,"x-ref":"#/components/parameters/droplet_id","index$":0}]},"GET /v2/droplets/{droplet_id}/backups/policy":{"protocol":"http","parameters":[{"in":"path","name":"droplet_id","description":"A unique identifier for a Droplet instance.","required":true,"schema":{"type":"integer","minimum":1},"example":3164444,"x-ref":"#/components/parameters/droplet_id","index$":0}]},"GET /v2/droplets/backups/policies":{"protocol":"http","parameters":[{"in":"query","name":"per_page","required":false,"description":"Number of items returned per page","schema":{"type":"integer","minimum":1,"default":20,"maximum":200},"example":2,"x-ref":"#/components/parameters/parameters_per_page","index$":0},{"in":"query","name":"page","required":false,"description":"Which 'page' of paginated results to return.","schema":{"type":"integer","minimum":1,"default":1},"example":1,"x-ref":"#/components/parameters/page","index$":1}]},"DELETE /v2/droplets/{droplet_id}/destroy_with_associated_resources/dangerous":{"protocol":"http","parameters":[{"in":"path","name":"droplet_id","description":"A unique identifier for a Droplet instance.","required":true,"schema":{"type":"integer","minimum":1},"example":3164444,"x-ref":"#/components/parameters/droplet_id","index$":0},{"in":"header","name":"X-Dangerous","description":"Acknowledge this action will destroy the Droplet and all associated resources and _can not_ be reversed.","schema":{"type":"boolean"},"example":true,"required":true,"x-ref":"#/components/parameters/x_dangerous","index$":1}]},"DELETE /v2/droplets/{droplet_id}":{"protocol":"http","parameters":[{"in":"path","name":"droplet_id","description":"A unique identifier for a Droplet instance.","required":true,"schema":{"type":"integer","minimum":1},"example":3164444,"x-ref":"#/components/parameters/droplet_id","index$":0}]},"DELETE /v2/droplets/{droplet_id}/destroy_with_associated_resources/selective":{"protocol":"http","requestBody":{"content":{"application/json":{"schema":{"type":"object","description":"An object containing information about a resource to be scheduled for deletion.","properties":{"floating_ips":{"type":"array","deprecated":true,"description":"An array of unique identifiers for the floating IPs to be scheduled for deletion.","items":{"type":"string"},"example":["6186916"]},"reserved_ips":{"type":"array","description":"An array of unique identifiers for the reserved IPs to be scheduled for deletion.","items":{"type":"string"},"example":["6186916"]},"snapshots":{"type":"array","description":"An array of unique identifiers for the snapshots to be scheduled for deletion.","items":{"type":"string"},"example":["61486916"]},"volumes":{"type":"array","description":"An array of unique identifiers for the volumes to be scheduled for deletion.","items":{"type":"string"},"example":["ba49449a-7435-11ea-b89e-0a58ac14480f"]},"volume_snapshots":{"type":"array","description":"An array of unique identifiers for the volume snapshots to be scheduled for deletion.","items":{"type":"string"},"example":["edb0478d-7436-11ea-86e6-0a58ac144b91"]}},"x-ref":"#/components/schemas/selective_destroy_associated_resource"}}}},"parameters":[{"in":"path","name":"droplet_id","description":"A unique identifier for a Droplet instance.","required":true,"schema":{"type":"integer","minimum":1},"example":3164444,"x-ref":"#/components/parameters/droplet_id","index$":0}]},"DELETE /v2/droplets":{"protocol":"http","parameters":[{"in":"query","name":"tag_name","description":"Specifies Droplets to be deleted by tag.","required":true,"schema":{"type":"string"},"example":"env:test","x-ref":"#/components/parameters/droplet_delete_tag_name","index$":0}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const droplet_ref01_ent = client.Droplet()
    let droplet_ref01_data = setup.data.new.droplet['droplet_ref01']

    droplet_ref01_data = (await droplet_ref01_ent.create(droplet_ref01_data)).data()
    assert(null != droplet_ref01_data.id)


    // LIST
    const droplet_ref01_match: any = {}

    const droplet_ref01_list = (await droplet_ref01_ent.list(droplet_ref01_match)).map((e: any) => e.data())

    assert(!isempty(select(droplet_ref01_list, { id: droplet_ref01_data.id })))


    // LOAD
    const droplet_ref01_match_dt0: any = {}
    droplet_ref01_match_dt0.id = droplet_ref01_data.id
    const droplet_ref01_data_dt0 = (await droplet_ref01_ent.load(droplet_ref01_match_dt0)).data()
    assert(droplet_ref01_data_dt0.id === droplet_ref01_data.id)


    // REMOVE
    const droplet_ref01_match_rm0: any = { id: droplet_ref01_data.id }
    await droplet_ref01_ent.remove(droplet_ref01_match_rm0)
  

    // LIST
    const droplet_ref01_match_rt0: any = {}

    const droplet_ref01_list_rt0 = (await droplet_ref01_ent.list(droplet_ref01_match_rt0)).map((e: any) => e.data())

    assert(isempty(select(droplet_ref01_list_rt0, { id: droplet_ref01_data.id })))


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
      '../../../../.sdk/test/entity/droplet/DropletTestData.json')

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
    ['droplet01','droplet02','droplet03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'DIGITALOCEAN_TEST_DROPLET_ENTID': idmap,
    'DIGITALOCEAN_TEST_LIVE': 'FALSE',
    'DIGITALOCEAN_TEST_EXPLAIN': 'FALSE',
    'DIGITALOCEAN_APIKEY': '',
  })

  idmap = env['DIGITALOCEAN_TEST_DROPLET_ENTID']

  const live = 'TRUE' === env.DIGITALOCEAN_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['DIGITALOCEAN_TEST_DROPLET_ENTID']
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
  
