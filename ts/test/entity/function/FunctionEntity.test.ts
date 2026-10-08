

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


describe('FunctionEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when DIGITALOCEAN_TEST_LIVE=TRUE.
  afterEach(liveDelay('DIGITALOCEAN_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = DigitaloceanSDK.test()
    const ent = testsdk.Function()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = DigitaloceanSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.Function().list({"namespace_id":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.DIGITALOCEAN_TEST_LIVE
    for (const op of ['create', 'list', 'load', 'remove']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'function.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"api_host":{"a":true,"h":"Api Host","n":"api_host","r":false,"sh":"The namespace's API hostname.","t":"`$STRING`","key$":"api_host","index$":0},"created_at":{"a":true,"fo":"date-time","h":"Created At","n":"created_at","r":false,"ro":true,"sh":"UTC time string.","t":"`$STRING`","key$":"created_at","index$":1},"expires_at":{"a":true,"fo":"date-time","h":"Expires At","n":"expires_at","r":false,"ro":true,"sh":"When the key expires (null for non-expiring keys).","t":"`$STRING`","key$":"expires_at","index$":2},"expires_in":{"a":true,"h":"Expires In","n":"expires_in","r":false,"sh":"The duration after which the access key expires, specified as a human-readable duration string in the format `<int>h` (hours) or `<int>d` (days).","t":"`$STRING`","key$":"expires_in","index$":3},"function":{"a":true,"h":"Function","n":"function","op":{"create":{"req":true,"type":"`$STRING`"}},"r":false,"sh":"Name of function(action) that exists in the given namespace.","t":"`$STRING`","key$":"function","index$":4},"id":{"a":true,"h":"Id","n":"id","r":false,"ro":true,"sh":"The access key's unique identifier with prefix 'dof_v1_'.","t":"`$STRING`","key$":"id","index$":5},"is_enabled":{"a":true,"h":"Is Enabled","n":"is_enabled","op":{"create":{"req":true,"type":"`$BOOLEAN`"}},"r":false,"sh":"Indicates weather the trigger is paused or unpaused.","t":"`$BOOLEAN`","key$":"is_enabled","index$":6},"key":{"a":true,"h":"Key","n":"key","r":false,"sh":"A random alpha numeric string.","t":"`$STRING`","key$":"key","index$":7},"label":{"a":true,"h":"Label","n":"label","r":false,"sh":"The namespace's unique name.","t":"`$STRING`","key$":"label","index$":8},"name":{"a":true,"h":"Name","n":"name","op":{"create":{"req":true,"type":"`$STRING`"},"update":{"req":true,"type":"`$STRING`"}},"r":false,"sh":"The trigger's unique name within the namespace.","t":"`$STRING`","key$":"name","index$":9},"namespace":{"a":true,"h":"Namespace","n":"namespace","r":false,"sh":"A unique string format of UUID with a prefix fn-.","t":"`$STRING`","key$":"namespace","index$":10},"region":{"a":true,"h":"Region","n":"region","r":false,"sh":"The namespace's datacenter region.","t":"`$STRING`","key$":"region","index$":11},"scheduled_details":{"a":true,"h":"Scheduled Details","n":"scheduled_details","r":true,"sh":"Trigger details for SCHEDULED type, where body is optional.","t":"`$OBJECT`","key$":"scheduled_details","index$":12},"scheduled_runs":{"a":true,"h":"Scheduled Runs","n":"scheduled_runs","r":false,"t":"`$OBJECT`","key$":"scheduled_runs","index$":13},"type":{"a":true,"h":"Type","n":"type","op":{"create":{"req":true,"type":"`$STRING`"}},"r":false,"sh":"String which indicates the type of trigger source like SCHEDULED.","t":"`$STRING`","key$":"type","index$":14},"updated_at":{"a":true,"fo":"date-time","h":"Updated At","n":"updated_at","r":false,"ro":true,"sh":"UTC time string.","t":"`$STRING`","key$":"updated_at","index$":15},"uuid":{"a":true,"h":"Uuid","n":"uuid","r":false,"sh":"The namespace's Universally Unique Identifier.","t":"`$STRING`","key$":"uuid","index$":16}},"id":{"field":"id","name":"id"},"name":"function","op":{"create":{"input":"data","name":"create","points":[{"a":true,"co":{"id":"POST /v2/functions/namespaces/{namespace_id}/keys","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":"fn-xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx","k":"param","n":"namespace_id","or":"namespace_id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"POST","o":"/v2/functions/namespaces/{namespace_id}/keys","q":{"exist":["namespace_id"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v2"},{"lit":"functions"},{"lit":"namespaces"},{"var":"namespace_id"},{"lit":"keys"}],"t":{"req":"`reqdata`","res":"`body.access_key`"},"index$":0},{"a":true,"co":{"id":"POST /v2/functions/namespaces/{namespace_id}/triggers","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":"fn-xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx","k":"param","n":"namespace_id","or":"namespace_id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"POST","o":"/v2/functions/namespaces/{namespace_id}/triggers","q":{"exist":["namespace_id"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v2"},{"lit":"functions"},{"lit":"namespaces"},{"var":"namespace_id"},{"lit":"triggers"}],"t":{"req":"`reqdata`","res":"`body.trigger`"},"index$":1},{"a":true,"co":{"id":"POST /v2/functions/namespaces","source":"openapi3","version":2},"g":{},"k":"http","m":"POST","o":"/v2/functions/namespaces","q":{"$action":"namespace"},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v2"},{"lit":"functions"},{"lit":"namespaces"}],"t":{"req":"`reqdata`","res":"`body.namespace`"},"index$":2}],"key$":"create"},"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /v2/functions/namespaces/{namespace_id}/keys","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":"fn-xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx","k":"param","n":"namespace_id","or":"namespace_id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/v2/functions/namespaces/{namespace_id}/keys","q":{"exist":["namespace_id"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v2"},{"lit":"functions"},{"lit":"namespaces"},{"var":"namespace_id"},{"lit":"keys"}],"t":{"req":"`reqdata`","res":"`body.access_keys`"},"index$":0},{"a":true,"co":{"id":"GET /v2/functions/namespaces/{namespace_id}/triggers","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":"fn-xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx","k":"param","n":"namespace_id","or":"namespace_id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/v2/functions/namespaces/{namespace_id}/triggers","q":{"exist":["namespace_id"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v2"},{"lit":"functions"},{"lit":"namespaces"},{"var":"namespace_id"},{"lit":"triggers"}],"t":{"req":"`reqdata`","res":"`body.triggers`"},"index$":1},{"a":true,"co":{"id":"GET /v2/functions/namespaces","source":"openapi3","version":2},"g":{},"k":"http","m":"GET","o":"/v2/functions/namespaces","q":{"$action":"namespace"},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v2"},{"lit":"functions"},{"lit":"namespaces"}],"t":{"req":"`reqdata`","res":"`body.namespaces`"},"index$":2}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /v2/functions/namespaces/{namespace_id}/triggers/{trigger_name}","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":"fn-xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx","k":"param","n":"namespace_id","or":"namespace_id","r":true,"t":"`$STRING`","index$":0},{"a":true,"ex":"my trigger","k":"param","n":"trigger_name","or":"trigger_name","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"GET","o":"/v2/functions/namespaces/{namespace_id}/triggers/{trigger_name}","q":{"exist":["namespace_id","trigger_name"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v2"},{"lit":"functions"},{"lit":"namespaces"},{"var":"namespace_id"},{"lit":"triggers"},{"var":"trigger_name"}],"t":{"req":"`reqdata`","res":"`body.trigger`"},"index$":0},{"a":true,"co":{"id":"GET /v2/functions/namespaces/{namespace_id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":"fn-xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx","k":"param","n":"namespace_id","or":"namespace_id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/v2/functions/namespaces/{namespace_id}","q":{"exist":["namespace_id"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v2"},{"lit":"functions"},{"lit":"namespaces"},{"var":"namespace_id"}],"t":{"req":"`reqdata`","res":"`body.namespace`"},"index$":1}],"key$":"load"},"remove":{"input":"data","name":"remove","points":[{"a":true,"co":{"id":"DELETE /v2/functions/namespaces/{namespace_id}/keys/{key_id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":"dof-xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx","k":"param","n":"key_id","or":"key_id","r":true,"t":"`$STRING`","index$":0},{"a":true,"ex":"fn-xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx","k":"param","n":"namespace_id","or":"namespace_id","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"DELETE","o":"/v2/functions/namespaces/{namespace_id}/keys/{key_id}","q":{"exist":["key_id","namespace_id"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v2"},{"lit":"functions"},{"lit":"namespaces"},{"var":"namespace_id"},{"lit":"keys"},{"var":"key_id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0},{"a":true,"co":{"id":"DELETE /v2/functions/namespaces/{namespace_id}/triggers/{trigger_name}","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":"fn-xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx","k":"param","n":"namespace_id","or":"namespace_id","r":true,"t":"`$STRING`","index$":0},{"a":true,"ex":"my trigger","k":"param","n":"trigger_name","or":"trigger_name","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"DELETE","o":"/v2/functions/namespaces/{namespace_id}/triggers/{trigger_name}","q":{"exist":["namespace_id","trigger_name"]},"r":{},"s":[{"lit":"v2"},{"lit":"functions"},{"lit":"namespaces"},{"var":"namespace_id"},{"lit":"triggers"},{"var":"trigger_name"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":1},{"a":true,"co":{"id":"DELETE /v2/functions/namespaces/{namespace_id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":"fn-xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx","k":"param","n":"namespace_id","or":"namespace_id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"DELETE","o":"/v2/functions/namespaces/{namespace_id}","q":{"exist":["namespace_id"]},"r":{},"s":[{"lit":"v2"},{"lit":"functions"},{"lit":"namespaces"},{"var":"namespace_id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":2}],"key$":"remove"},"update":{"input":"data","name":"update","points":[{"a":true,"co":{"id":"PUT /v2/functions/namespaces/{namespace_id}/keys/{key_id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":"dof-xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx","k":"param","n":"key_id","or":"key_id","r":true,"t":"`$STRING`","index$":0},{"a":true,"ex":"fn-xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx","k":"param","n":"namespace_id","or":"namespace_id","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"PUT","o":"/v2/functions/namespaces/{namespace_id}/keys/{key_id}","q":{"exist":["key_id","namespace_id"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v2"},{"lit":"functions"},{"lit":"namespaces"},{"var":"namespace_id"},{"lit":"keys"},{"var":"key_id"}],"t":{"req":"`reqdata`","res":"`body.access_key`"},"index$":0},{"a":true,"co":{"id":"PUT /v2/functions/namespaces/{namespace_id}/triggers/{trigger_name}","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":"fn-xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx","k":"param","n":"namespace_id","or":"namespace_id","r":true,"t":"`$STRING`","index$":0},{"a":true,"ex":"my trigger","k":"param","n":"trigger_name","or":"trigger_name","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"PUT","o":"/v2/functions/namespaces/{namespace_id}/triggers/{trigger_name}","q":{"exist":["namespace_id","trigger_name"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v2"},{"lit":"functions"},{"lit":"namespaces"},{"var":"namespace_id"},{"lit":"triggers"},{"var":"trigger_name"}],"t":{"req":"`reqdata`","res":"`body.trigger`"},"index$":1}],"key$":"update"}},"relations":{"ancestors":[]},"key$":"function","name__orig":"function","Name":"Function","name_":"function","name-":"function","NAME":"FUNCTION","index$":151}, {"active":true,"entity":"function","key$":"BasicFunctionFlow","kind":"basic","name":"BasicFunctionFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"function_ref01"},"m":{"namespace_id":"namespace01"},"o":"create","s":[],"v":[],"index$":0},{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"function_ref01"}}],"index$":1},{"a":false,"d":{"namespace_id":"namespace01"},"i":{"ref":"function_ref01","srcdatavar":"function_ref01_data","suffix":"_up0","textfield":"api_host"},"m":{},"o":"update","s":[{"apply":"TextFieldMark","def":{"mark":"Mark01-function_ref01"}}],"v":[],"unreachable":true},{"a":true,"d":{},"i":{"ref":"function_ref01","srcdatavar":"function_ref01_data","suffix":"_dt0"},"m":{"id":"function01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-function_ref01"}}],"index$":2},{"a":true,"d":{},"i":{"ref":"function_ref01","suffix":"_rm0"},"m":{"id":"function01"},"o":"remove","s":[],"v":[],"index$":3},{"a":true,"d":{},"i":{"suffix":"_rt0"},"m":{},"o":"list","s":[],"v":[{"apply":"ItemNotExists","def":{"ref":"function_ref01"}}],"index$":4}]}, 'Function', {"POST /v2/functions/namespaces/{namespace_id}/keys":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","properties":{"name":{"type":"string","description":"The access key's name.","example":"my-function-access-key","key$":"name"},"expires_in":{"type":"string","description":"The duration after which the access key expires, specified as a human-readable duration string in the format `<int>h` (hours) or `<int>d` (days). Minimum value is `1h`. If omitted, the key will never expire.","example":"7d","key$":"expires_in"}},"required":["name"],"x-ref":"#/components/schemas/access_key_create_request","index$":1},"examples":{"Create Non-Expiring Key":{"value":{"name":"my-function-access-key"}},"Create Expiring Key":{"value":{"name":"my-function-access-key","expires_in":"7d"}}}}}},"parameters":[{"name":"namespace_id","description":"The ID of the namespace to be managed.","in":"path","schema":{"type":"string"},"example":"fn-xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx","required":true,"x-ref":"#/components/parameters/namespace_id","index$":0}]},"POST /v2/functions/namespaces/{namespace_id}/triggers":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","properties":{"name":{"type":"string","example":"my trigger","description":"The trigger's unique name within the namespace.","key$":"name"},"function":{"type":"string","example":"hello","description":"Name of function(action) that exists in the given namespace.","key$":"function"},"type":{"type":"string","example":"SCHEDULED","description":"One of different type of triggers. Currently only SCHEDULED is supported.","key$":"type"},"is_enabled":{"type":"boolean","example":true,"description":"Indicates weather the trigger is paused or unpaused.","key$":"is_enabled"},"scheduled_details":{"type":"object","description":"Trigger details for SCHEDULED type, where body is optional.\n","properties":{"cron":{"description":"valid cron expression string which is required for SCHEDULED type triggers.","type":"string","example":"* * * * *"},"body":{"description":"Optional data to be sent to function while triggering the function.","type":"object","nullable":true,"properties":{"name":{}}}},"required":["cron"],"x-ref":"#/components/schemas/scheduled_details","key$":"scheduled_details"}},"required":["name","function","type","is_enabled","scheduled_details"],"x-ref":"#/components/schemas/create_trigger","index$":1}}}},"parameters":[{"name":"namespace_id","description":"The ID of the namespace to be managed.","in":"path","schema":{"type":"string"},"example":"fn-xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx","required":true,"x-ref":"#/components/parameters/namespace_id","index$":0}]},"POST /v2/functions/namespaces":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","properties":{"region":{"type":"string","example":"nyc1","description":"The [datacenter region](https://docs.digitalocean.com/products/platform/availability-matrix/#available-datacenters) in which to create the namespace."},"label":{"type":"string","example":"my namespace","description":"The namespace's unique name."}},"required":["region","label"],"x-ref":"#/components/schemas/create_namespace"}}}},"parameters":[]},"GET /v2/functions/namespaces/{namespace_id}/keys":{"protocol":"http","parameters":[{"name":"namespace_id","description":"The ID of the namespace to be managed.","in":"path","schema":{"type":"string"},"example":"fn-xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx","required":true,"x-ref":"#/components/parameters/namespace_id","index$":0}]},"GET /v2/functions/namespaces/{namespace_id}/triggers":{"protocol":"http","parameters":[{"name":"namespace_id","description":"The ID of the namespace to be managed.","in":"path","schema":{"type":"string"},"example":"fn-xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx","required":true,"x-ref":"#/components/parameters/namespace_id","index$":0}]},"GET /v2/functions/namespaces":{"protocol":"http","parameters":[]},"GET /v2/functions/namespaces/{namespace_id}/triggers/{trigger_name}":{"protocol":"http","parameters":[{"name":"namespace_id","description":"The ID of the namespace to be managed.","in":"path","schema":{"type":"string"},"example":"fn-xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx","required":true,"x-ref":"#/components/parameters/namespace_id","index$":0},{"name":"trigger_name","description":"The name of the trigger to be managed.","in":"path","schema":{"type":"string"},"example":"my trigger","required":true,"x-ref":"#/components/parameters/trigger_name","index$":1}]},"GET /v2/functions/namespaces/{namespace_id}":{"protocol":"http","parameters":[{"name":"namespace_id","description":"The ID of the namespace to be managed.","in":"path","schema":{"type":"string"},"example":"fn-xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx","required":true,"x-ref":"#/components/parameters/namespace_id","index$":0}]},"DELETE /v2/functions/namespaces/{namespace_id}/keys/{key_id}":{"protocol":"http","parameters":[{"name":"namespace_id","description":"The ID of the namespace to be managed.","in":"path","schema":{"type":"string"},"example":"fn-xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx","required":true,"x-ref":"#/components/parameters/namespace_id","index$":0},{"name":"key_id","description":"The ID of the access key to be managed.","in":"path","schema":{"type":"string"},"example":"dof-xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx","required":true,"x-ref":"#/components/parameters/key_id","index$":1}]},"DELETE /v2/functions/namespaces/{namespace_id}/triggers/{trigger_name}":{"protocol":"http","parameters":[{"name":"namespace_id","description":"The ID of the namespace to be managed.","in":"path","schema":{"type":"string"},"example":"fn-xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx","required":true,"x-ref":"#/components/parameters/namespace_id","index$":0},{"name":"trigger_name","description":"The name of the trigger to be managed.","in":"path","schema":{"type":"string"},"example":"my trigger","required":true,"x-ref":"#/components/parameters/trigger_name","index$":1}]},"DELETE /v2/functions/namespaces/{namespace_id}":{"protocol":"http","parameters":[{"name":"namespace_id","description":"The ID of the namespace to be managed.","in":"path","schema":{"type":"string"},"example":"fn-xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx","required":true,"x-ref":"#/components/parameters/namespace_id","index$":0}]},"PUT /v2/functions/namespaces/{namespace_id}/keys/{key_id}":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","properties":{"name":{"type":"string","description":"The new name for the access key.","example":"updated-key-name","key$":"name"}},"required":["name"],"index$":1},"examples":{"Update Key Name":{"value":{"name":"updated-key-name"}}}}}},"parameters":[{"name":"namespace_id","description":"The ID of the namespace to be managed.","in":"path","schema":{"type":"string"},"example":"fn-xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx","required":true,"x-ref":"#/components/parameters/namespace_id","index$":0},{"name":"key_id","description":"The ID of the access key to be managed.","in":"path","schema":{"type":"string"},"example":"dof-xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx","required":true,"x-ref":"#/components/parameters/key_id","index$":1}]},"PUT /v2/functions/namespaces/{namespace_id}/triggers/{trigger_name}":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","properties":{"is_enabled":{"type":"boolean","example":true,"description":"Indicates weather the trigger is paused or unpaused.","key$":"is_enabled"},"scheduled_details":{"type":"object","description":"Trigger details for SCHEDULED type, where body is optional.\n","properties":{"cron":{"description":"valid cron expression string which is required for SCHEDULED type triggers.","type":"string","example":"* * * * *"},"body":{"description":"Optional data to be sent to function while triggering the function.","type":"object","nullable":true,"properties":{"name":{}}}},"required":["cron"],"x-ref":"#/components/schemas/scheduled_details","key$":"scheduled_details"}},"x-ref":"#/components/schemas/update_trigger","index$":1}}}},"parameters":[{"name":"namespace_id","description":"The ID of the namespace to be managed.","in":"path","schema":{"type":"string"},"example":"fn-xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx","required":true,"x-ref":"#/components/parameters/namespace_id","index$":0},{"name":"trigger_name","description":"The name of the trigger to be managed.","in":"path","schema":{"type":"string"},"example":"my trigger","required":true,"x-ref":"#/components/parameters/trigger_name","index$":1}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const function_ref01_ent = client.Function()
    let function_ref01_data = setup.data.new.function['function_ref01']
    function_ref01_data['namespace_id'] = setup.idmap['namespace01']

    function_ref01_data = (await function_ref01_ent.create(function_ref01_data)).data()
    assert(null != function_ref01_data.id)


    // LIST
    const function_ref01_match: any = {}

    const function_ref01_list = (await function_ref01_ent.list(function_ref01_match)).map((e: any) => e.data())

    assert(!isempty(select(function_ref01_list, { id: function_ref01_data.id })))


    // LOAD
    const function_ref01_match_dt0: any = {}
    function_ref01_match_dt0.id = function_ref01_data.id
    const function_ref01_data_dt0 = (await function_ref01_ent.load(function_ref01_match_dt0)).data()
    assert(function_ref01_data_dt0.id === function_ref01_data.id)


    // REMOVE
    const function_ref01_match_rm0: any = { id: function_ref01_data.id }
    await function_ref01_ent.remove(function_ref01_match_rm0)
  

    // LIST
    const function_ref01_match_rt0: any = {}

    const function_ref01_list_rt0 = (await function_ref01_ent.list(function_ref01_match_rt0)).map((e: any) => e.data())

    assert(isempty(select(function_ref01_list_rt0, { id: function_ref01_data.id })))


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
      '../../../../.sdk/test/entity/function/FunctionTestData.json')

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
    ['function01','function02','function03','namespace01'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'DIGITALOCEAN_TEST_FUNCTION_ENTID': idmap,
    'DIGITALOCEAN_TEST_LIVE': 'FALSE',
    'DIGITALOCEAN_TEST_EXPLAIN': 'FALSE',
    'DIGITALOCEAN_APIKEY': '',
  })

  idmap = env['DIGITALOCEAN_TEST_FUNCTION_ENTID']

  const live = 'TRUE' === env.DIGITALOCEAN_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['DIGITALOCEAN_TEST_FUNCTION_ENTID']
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
  
