

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


describe('MonitoringEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when DIGITALOCEAN_TEST_LIVE=TRUE.
  afterEach(liveDelay('DIGITALOCEAN_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = DigitaloceanSDK.test()
    const ent = testsdk.Monitoring()
    assert(null != ent)
  })


  class FailHook extends BaseFeature {
    name = 'failhook'
    version = '0.0.1'
    active = true
    unexpected = 0
    init() { }
    PreSpec() { throw new Error('monitoring hook failed') }
    PreUnexpected() { this.unexpected++ }
  }

  test('stream-error', async () => {
    const offline = { net: { offline: true } }
    await assert.rejects(async () => {
      for await (const _item of DigitaloceanSDK.test(offline).Monitoring().stream('list')) { }
    }, /offline/)

    for await (const _item of DigitaloceanSDK.test(offline).Monitoring()
      .stream('list', undefined, { ctrl: { throw: false } })) { }

    if (null != (config as any).feature?.rbac) {
      const denied = DigitaloceanSDK.test(undefined, { feature: { rbac: { active: true, deny: true } } })
      await assert.rejects(async () => {
        for await (const _item of denied.Monitoring().stream('list')) { }
      }, (err: any) => 'rbac_denied' === err.code)
    }
  })

  test('stream-ctrl', async () => {
    const explain: any = {}
    const ctrl: any = { explain }
    for await (const _item of DigitaloceanSDK.test().Monitoring().stream('list', undefined, { ctrl })) { }
    assert.deepStrictEqual(Object.keys(ctrl), ['explain'])
    assert(explain === ctrl.explain && 0 < Object.keys(explain).length)
  })

  test('unexpected', async () => {
    const hook = new FailHook()
    const client = new DigitaloceanSDK({ feature: { test: { active: true } }, extend: [hook] })
    await assert.rejects(client.Monitoring().list(), /hook failed/)
    assert(0 < hook.unexpected)

    const fired = hook.unexpected
    assert.strictEqual(await client.Monitoring().list(undefined, { throw: false }), undefined)
    assert(fired < hook.unexpected)
  })

  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = DigitaloceanSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.Monitoring().list({"compare":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.DIGITALOCEAN_TEST_LIVE
    for (const op of ['create', 'list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'monitoring.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"alerts":{"a":true,"h":"Alerts","n":"alerts","r":true,"t":"`$OBJECT`","key$":"alerts","index$":0},"compare":{"a":true,"h":"Compare","n":"compare","r":true,"t":"`$STRING`","key$":"compare","index$":1},"config":{"a":true,"h":"Config","n":"config","op":{"create":{"req":true,"type":"`$OBJECT`"}},"r":false,"sh":"OpenSearch destination configuration with `credentials` omitted.","t":"`$OBJECT`","key$":"config","index$":2},"description":{"a":true,"h":"Description","n":"description","r":true,"t":"`$STRING`","key$":"description","index$":3},"destination":{"a":true,"h":"Destination","n":"destination","r":true,"t":"`$OBJECT`","key$":"destination","index$":4},"enabled":{"a":true,"h":"Enabled","n":"enabled","r":true,"t":"`$BOOLEAN`","key$":"enabled","index$":5},"entities":{"a":true,"h":"Entities","n":"entities","r":true,"t":"`$ARRAY`","key$":"entities","index$":6},"id":{"a":true,"h":"Id","n":"id","r":false,"sh":"A unique identifier for a destination.","t":"`$STRING`","key$":"id","index$":7},"name":{"a":true,"h":"Name","n":"name","r":false,"sh":"destination name","t":"`$STRING`","key$":"name","index$":8},"resources":{"a":true,"h":"Resources","n":"resources","r":false,"sh":"List of resources identified by their URNs.","t":"`$ARRAY`","key$":"resources","index$":9},"tags":{"a":true,"h":"Tags","n":"tags","r":true,"t":"`$ARRAY`","key$":"tags","index$":10},"type":{"a":true,"h":"Type","n":"type","op":{"create":{"req":false,"type":"`$STRING`"},"list":{"req":false,"type":"`$STRING`"},"load":{"req":false,"type":"`$STRING`"}},"r":true,"sh":"The destination type.","t":"`$STRING`","key$":"type","index$":11},"uuid":{"a":true,"h":"Uuid","n":"uuid","r":true,"t":"`$STRING`","key$":"uuid","index$":12},"value":{"a":true,"fo":"float","h":"Value","n":"value","r":true,"t":"`$NUMBER`","key$":"value","index$":13},"window":{"a":true,"h":"Window","n":"window","r":true,"t":"`$STRING`","key$":"window","index$":14}},"id":{"field":"id","name":"id"},"name":"monitoring","op":{"create":{"input":"data","name":"create","points":[{"a":true,"co":{"id":"POST /v2/monitoring/sinks/destinations/{destination_uuid}","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":"1a64809f-1708-48ee-a742-dec8d481b8d1","k":"param","n":"destination_uuid","or":"destination_uuid","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"POST","o":"/v2/monitoring/sinks/destinations/{destination_uuid}","q":{"exist":["destination_uuid"]},"r":{},"s":[{"lit":"v2"},{"lit":"monitoring"},{"lit":"sinks"},{"lit":"destinations"},{"var":"destination_uuid"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0},{"a":true,"co":{"id":"POST /v2/monitoring/alerts","source":"openapi3","version":2},"g":{},"k":"http","m":"POST","o":"/v2/monitoring/alerts","q":{"$action":"alert"},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v2"},{"lit":"monitoring"},{"lit":"alerts"}],"t":{"req":"`reqdata`","res":"`body.policy`"},"index$":1},{"a":true,"co":{"id":"POST /v2/monitoring/sinks","source":"openapi3","version":2},"g":{},"k":"http","m":"POST","o":"/v2/monitoring/sinks","q":{"$action":"sink"},"r":{},"s":[{"lit":"v2"},{"lit":"monitoring"},{"lit":"sinks"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":2},{"a":true,"co":{"id":"POST /v2/monitoring/sinks/destinations","source":"openapi3","version":2},"g":{},"k":"http","m":"POST","o":"/v2/monitoring/sinks/destinations","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v2"},{"lit":"monitoring"},{"lit":"sinks"},{"lit":"destinations"}],"t":{"req":"`reqdata`","res":"`body.destination`"},"index$":3}],"key$":"create"},"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /v2/monitoring/alerts","source":"openapi3","version":2},"g":{"query":[{"a":true,"ex":1,"k":"query","n":"page","or":"page","r":false,"t":"`$INTEGER`","index$":0},{"a":true,"ex":2,"k":"query","n":"per_page","or":"per_page","r":false,"t":"`$INTEGER`","index$":1}]},"k":"http","m":"GET","o":"/v2/monitoring/alerts","q":{"$action":"alert"},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v2"},{"lit":"monitoring"},{"lit":"alerts"}],"t":{"req":"`reqdata`","res":"`body.policies`"},"index$":0},{"a":true,"co":{"id":"GET /v2/monitoring/sinks","source":"openapi3","version":2},"g":{"query":[{"a":true,"ex":"do:kubernetes:5ba4518b-b9e2-4978-aa92-2d4c727e8824","k":"query","n":"resource_id","or":"resource_id","r":false,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/v2/monitoring/sinks","q":{"$action":"sink"},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v2"},{"lit":"monitoring"},{"lit":"sinks"}],"t":{"req":"`reqdata`","res":"`body.sinks`"},"index$":1},{"a":true,"co":{"id":"GET /v2/monitoring/sinks/destinations","source":"openapi3","version":2},"g":{},"k":"http","m":"GET","o":"/v2/monitoring/sinks/destinations","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v2"},{"lit":"monitoring"},{"lit":"sinks"},{"lit":"destinations"}],"t":{"req":"`reqdata`","res":"`body.destinations`"},"index$":2}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /v2/monitoring/alerts/{alert_uuid}","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":"4de7ac8b-495b-4884-9a69-1050c6793cd6","k":"param","n":"alert_uuid","or":"alert_uuid","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/v2/monitoring/alerts/{alert_uuid}","q":{"exist":["alert_uuid"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v2"},{"lit":"monitoring"},{"lit":"alerts"},{"var":"alert_uuid"}],"t":{"req":"`reqdata`","res":"`body.policy`"},"index$":0},{"a":true,"co":{"id":"GET /v2/monitoring/sinks/destinations/{destination_uuid}","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":"1a64809f-1708-48ee-a742-dec8d481b8d1","k":"param","n":"destination_uuid","or":"destination_uuid","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/v2/monitoring/sinks/destinations/{destination_uuid}","q":{"exist":["destination_uuid"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v2"},{"lit":"monitoring"},{"lit":"sinks"},{"lit":"destinations"},{"var":"destination_uuid"}],"t":{"req":"`reqdata`","res":"`body.destination`"},"index$":1},{"a":true,"co":{"id":"GET /v2/monitoring/sinks/{sink_uuid}","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":"78b172b6-52c3-4a4b-96d5-78d3f1a0b18c","k":"param","n":"sink_uuid","or":"sink_uuid","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/v2/monitoring/sinks/{sink_uuid}","q":{"exist":["sink_uuid"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v2"},{"lit":"monitoring"},{"lit":"sinks"},{"var":"sink_uuid"}],"t":{"req":"`reqdata`","res":"`body.sink`"},"index$":2}],"key$":"load"},"remove":{"input":"data","name":"remove","points":[{"a":true,"co":{"id":"DELETE /v2/monitoring/alerts/{alert_uuid}","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":"4de7ac8b-495b-4884-9a69-1050c6793cd6","k":"param","n":"alert_uuid","or":"alert_uuid","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"DELETE","o":"/v2/monitoring/alerts/{alert_uuid}","q":{"exist":["alert_uuid"]},"r":{},"s":[{"lit":"v2"},{"lit":"monitoring"},{"lit":"alerts"},{"var":"alert_uuid"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0},{"a":true,"co":{"id":"DELETE /v2/monitoring/sinks/destinations/{destination_uuid}","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":"1a64809f-1708-48ee-a742-dec8d481b8d1","k":"param","n":"destination_uuid","or":"destination_uuid","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"DELETE","o":"/v2/monitoring/sinks/destinations/{destination_uuid}","q":{"exist":["destination_uuid"]},"r":{},"s":[{"lit":"v2"},{"lit":"monitoring"},{"lit":"sinks"},{"lit":"destinations"},{"var":"destination_uuid"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":1},{"a":true,"co":{"id":"DELETE /v2/monitoring/sinks/{sink_uuid}","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":"78b172b6-52c3-4a4b-96d5-78d3f1a0b18c","k":"param","n":"sink_uuid","or":"sink_uuid","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"DELETE","o":"/v2/monitoring/sinks/{sink_uuid}","q":{"exist":["sink_uuid"]},"r":{},"s":[{"lit":"v2"},{"lit":"monitoring"},{"lit":"sinks"},{"var":"sink_uuid"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":2}],"key$":"remove"},"update":{"input":"data","name":"update","points":[{"a":true,"co":{"id":"PUT /v2/monitoring/alerts/{alert_uuid}","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":"4de7ac8b-495b-4884-9a69-1050c6793cd6","k":"param","n":"alert_uuid","or":"alert_uuid","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"PUT","o":"/v2/monitoring/alerts/{alert_uuid}","q":{"exist":["alert_uuid"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v2"},{"lit":"monitoring"},{"lit":"alerts"},{"var":"alert_uuid"}],"t":{"req":"`reqdata`","res":"`body.policy`"},"index$":0}],"key$":"update"}},"relations":{"ancestors":[]},"key$":"monitoring","name__orig":"monitoring","Name":"Monitoring","name_":"monitoring","name-":"monitoring","NAME":"MONITORING","index$":173}, {"active":true,"entity":"monitoring","key$":"BasicMonitoringFlow","kind":"basic","name":"BasicMonitoringFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"monitoring_ref01"},"m":{},"o":"create","s":[],"v":[],"index$":0},{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"monitoring_ref01"}}],"index$":1},{"a":false,"d":{},"i":{"ref":"monitoring_ref01","srcdatavar":"monitoring_ref01_data","suffix":"_up0","textfield":"compare"},"m":{},"o":"update","s":[{"apply":"TextFieldMark","def":{"mark":"Mark01-monitoring_ref01"}}],"v":[],"unreachable":true},{"a":false,"d":{},"i":{"ref":"monitoring_ref01","srcdatavar":"monitoring_ref01_data","suffix":"_dt0"},"m":{"id":"monitoring01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-monitoring_ref01"}}],"unreachable":true},{"a":false,"d":{},"i":{"ref":"monitoring_ref01","suffix":"_rm0"},"m":{"id":"monitoring01"},"o":"remove","s":[],"v":[],"unreachable":true},{"a":true,"d":{},"i":{"suffix":"_rt0"},"m":{},"o":"list","s":[],"v":[{"apply":"ItemNotExists","def":{"ref":"monitoring_ref01"}}],"index$":2}]}, 'Monitoring', {"POST /v2/monitoring/sinks/destinations/{destination_uuid}":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","required":["config","type"],"properties":{"name":{"type":"string","description":"destination name","example":"managed_opensearch_cluster","key$":"name"},"type":{"type":"string","enum":["opensearch_dbaas","opensearch_ext"],"description":"The destination type. `opensearch_dbaas` for a DigitalOcean managed OpenSearch\ncluster or `opensearch_ext` for an externally managed one.\n","key$":"type"},"config":{"type":"object","required":["endpoint"],"properties":{"credentials":{"type":"object","description":"Credentials for an OpenSearch cluster user. Optional if `cluster_uuid` is passed.","properties":{"username":{},"password":{}}},"endpoint":{"type":"string","example":"example.com","description":"host of the OpenSearch cluster"},"cluster_uuid":{"type":"string","example":"85148069-7e35-4999-80bd-6fa1637ca385","description":"A unique identifier for a managed OpenSearch cluster."},"cluster_name":{"type":"string","example":"managed_dbaas_cluster","description":"Name of a managed OpenSearch cluster."},"index_name":{"type":"string","description":"OpenSearch index to send logs to.","example":"logs"},"retention_days":{"type":"integer","description":"Number of days to retain logs in an OpenSearch cluster.","example":14,"default":14}},"x-ref":"#/components/schemas/opensearch_config_request","key$":"config"}},"x-ref":"#/components/schemas/destination_request","index$":1}}}},"parameters":[{"in":"path","name":"destination_uuid","description":"A unique identifier for a destination.","required":true,"schema":{"type":"string"},"example":"1a64809f-1708-48ee-a742-dec8d481b8d1","x-ref":"#/components/parameters/destination_uuid","index$":0}]},"POST /v2/monitoring/alerts":{"protocol":"http","requestBody":{"description":"The `type` field dictates what type of entity that the alert policy applies to and hence what type of entity is passed in the `entities` array. If both the `tags` array and `entities` array are empty the alert policy applies to all entities of the relevant type that are owned by the user account. Otherwise the following table shows the valid entity types for each type of alert policy:\n\nType | Description | Valid Entity Type\n-----|-------------|--------------------\n`v1/insights/droplet/memory_utilization_percent` | alert on the percent of memory utilization | Droplet ID\n`v1/insights/droplet/disk_read` | alert on the rate of disk read I/O in MBps | Droplet ID\n`v1/insights/droplet/load_5` | alert on the 5 minute load average | Droplet ID\n`v1/insights/droplet/load_15` | alert on the 15 minute load average | Droplet ID\n`v1/insights/droplet/disk_utilization_percent` | alert on the percent of disk utilization | Droplet ID\n`v1/insights/droplet/cpu` | alert on the percent of CPU utilization | Droplet ID\n`v1/insights/droplet/disk_write` | alert on the rate of disk write I/O in MBps | Droplet ID\n`v1/insights/droplet/public_outbound_bandwidth` | alert on the rate of public outbound bandwidth in Mbps | Droplet ID\n`v1/insights/droplet/public_inbound_bandwidth` | alert on the rate of public inbound bandwidth in Mbps | Droplet ID\n`v1/insights/droplet/private_outbound_bandwidth` | alert on the rate of private outbound bandwidth in Mbps | Droplet ID\n`v1/insights/droplet/private_inbound_bandwidth` | alert on the rate of private inbound bandwidth in Mbps | Droplet ID\n`v1/insights/droplet/load_1` | alert on the 1 minute load average | Droplet ID\n`v1/insights/lbaas/avg_cpu_utilization_percent`|alert on the percent of CPU utilization|load balancer ID\n`v1/insights/lbaas/connection_utilization_percent`|alert on the percent of connection utilization|load balancer ID\n`v1/insights/lbaas/droplet_health`|alert on Droplet health status changes|load balancer ID\n`v1/insights/lbaas/tls_connections_per_second_utilization_percent`|alert on the percent of TLS connections per second utilization (requires at least one HTTPS forwarding rule)|load balancer ID\n`v1/insights/lbaas/increase_in_http_error_rate_percentage_5xx`|alert on the percent increase of 5xx level http errors over 5m|load balancer ID\n`v1/insights/lbaas/increase_in_http_error_rate_percentage_4xx`|alert on the percent increase of 4xx level http errors over 5m|load balancer ID\n`v1/insights/lbaas/increase_in_http_error_rate_count_5xx`|alert on the count of 5xx level http errors over 5m|load balancer ID\n`v1/insights/lbaas/increase_in_http_error_rate_count_4xx`|alert on the count of 4xx level http errors over 5m|load balancer ID\n`v1/insights/lbaas/high_http_request_response_time`|alert on high average http response time|load balancer ID\n`v1/insights/lbaas/high_http_request_response_time_50p`|alert on high 50th percentile http response time|load balancer ID\n`v1/insights/lbaas/high_http_request_response_time_95p`|alert on high 95th percentile http response time|load balancer ID\n`v1/insights/lbaas/high_http_request_response_time_99p`|alert on high 99th percentile http response time|load balancer ID\n`v1/dbaas/alerts/load_15_alerts` | alert on 15 minute load average across the database cluster | database cluster UUID\n`v1/dbaas/alerts/memory_utilization_alerts` | alert on the percent memory utilization average across the database cluster | database cluster UUID\n`v1/dbaas/alerts/disk_utilization_alerts` | alert on the percent disk utilization average across the database cluster | database cluster UUID\n`v1/dbaas/alerts/cpu_alerts` | alert on the percent CPU usage average across the database cluster | database cluster UUID\n`v1/droplet/autoscale_alerts/current_instances` | alert on current pool size | autoscale pool ID\n`v1/droplet/autoscale_alerts/target_instances` | alert on target pool size | autoscale pool ID\n`v1/droplet/autoscale_alerts/current_cpu_utilization` | alert on current average CPU utilization | autoscale pool ID\n`v1/droplet/autoscale_alerts/target_cpu_utilization` | alert on target average CPU utilization | autoscale pool ID\n`v1/droplet/autoscale_alerts/current_memory_utilization` | alert on current average memory utilization | autoscale pool ID\n`v1/droplet/autoscale_alerts/target_memory_utilization` | alert on target average memory utilization | autoscale pool ID\n`v1/droplet/autoscale_alerts/scale_up` | alert on scale up event | autoscale pool ID\n`v1/droplet/autoscale_alerts/scale_down` | alert on scale down event | autoscale pool ID\n","required":true,"content":{"application/json":{"schema":{"type":"object","required":["type","description","compare","value","window","entities","tags","alerts","enabled"],"properties":{"alerts":{"type":"object","required":["slack","email"],"properties":{"email":{"description":"An email to notify on an alert trigger.","example":["bob@exmaple.com"],"type":"array","items":{"type":"string"}},"slack":{"type":"array","description":"Slack integration details.","items":{"type":"object","required":[],"properties":{},"x-ref":"#/components/schemas/slack_details"}}},"x-ref":"#/components/schemas/alerts","key$":"alerts"},"compare":{"type":"string","example":"GreaterThan","enum":["GreaterThan","LessThan"],"key$":"compare"},"description":{"type":"string","example":"CPU Alert","key$":"description"},"enabled":{"type":"boolean","example":true,"key$":"enabled"},"entities":{"type":"array","items":{"type":"string"},"example":["192018292"],"key$":"entities"},"tags":{"type":"array","items":{"type":"string"},"example":["droplet_tag"],"key$":"tags"},"type":{"type":"string","enum":["v1/insights/droplet/load_1","v1/insights/droplet/load_5","v1/insights/droplet/load_15","v1/insights/droplet/memory_utilization_percent","v1/insights/droplet/disk_utilization_percent","v1/insights/droplet/cpu","v1/insights/droplet/disk_read","v1/insights/droplet/disk_write","v1/insights/droplet/public_outbound_bandwidth","v1/insights/droplet/public_inbound_bandwidth","v1/insights/droplet/private_outbound_bandwidth","v1/insights/droplet/private_inbound_bandwidth","v1/insights/lbaas/avg_cpu_utilization_percent","v1/insights/lbaas/connection_utilization_percent","v1/insights/lbaas/droplet_health","v1/insights/lbaas/tls_connections_per_second_utilization_percent","v1/insights/lbaas/increase_in_http_error_rate_percentage_5xx","v1/insights/lbaas/increase_in_http_error_rate_percentage_4xx","v1/insights/lbaas/increase_in_http_error_rate_count_5xx","v1/insights/lbaas/increase_in_http_error_rate_count_4xx","v1/insights/lbaas/high_http_request_response_time","v1/insights/lbaas/high_http_request_response_time_50p","v1/insights/lbaas/high_http_request_response_time_95p","v1/insights/lbaas/high_http_request_response_time_99p","v1/dbaas/alerts/load_15_alerts","v1/dbaas/alerts/memory_utilization_alerts","v1/dbaas/alerts/disk_utilization_alerts","v1/dbaas/alerts/cpu_alerts","v1/droplet/autoscale_alerts/current_instances","v1/droplet/autoscale_alerts/target_instances","v1/droplet/autoscale_alerts/current_cpu_utilization","v1/droplet/autoscale_alerts/target_cpu_utilization","v1/droplet/autoscale_alerts/current_memory_utilization","v1/droplet/autoscale_alerts/target_memory_utilization","v1/droplet/autoscale_alerts/scale_up","v1/droplet/autoscale_alerts/scale_down"],"example":"v1/insights/droplet/cpu","key$":"type"},"value":{"type":"number","format":"float","example":80,"key$":"value"},"window":{"type":"string","example":"5m","enum":["5m","10m","30m","1h"],"key$":"window"}},"x-ref":"#/components/schemas/alert_policy_request"}}}},"parameters":[]},"POST /v2/monitoring/sinks":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"properties":{"destination_uuid":{"type":"string","example":"9df2b7e9-3fb2-4577-b60a-e9c0d53f9a99","description":"A unique identifier for an already-existing destination."},"resources":{"type":"array","description":"List of resources identified by their URNs.","items":{"type":"object","required":["urn"],"properties":{"urn":{"type":"string","pattern":"^do:kubernetes:.*","example":"do:kubernetes:f453aa14-646e-4cf8-8c62-75a19fb24ec2","description":"The uniform resource name (URN) for the resource in the format do:resource_type:resource_id."},"name":{"type":"string","description":"resource name","example":"managed_kubernetes_cluster"}},"x-ref":"#/components/schemas/sink_resource"}}}}}}},"parameters":[]},"POST /v2/monitoring/sinks/destinations":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","required":["config","type"],"properties":{"name":{"type":"string","description":"destination name","example":"managed_opensearch_cluster","key$":"name"},"type":{"type":"string","enum":["opensearch_dbaas","opensearch_ext"],"description":"The destination type. `opensearch_dbaas` for a DigitalOcean managed OpenSearch\ncluster or `opensearch_ext` for an externally managed one.\n","key$":"type"},"config":{"type":"object","required":["endpoint"],"properties":{"credentials":{"type":"object","description":"Credentials for an OpenSearch cluster user. Optional if `cluster_uuid` is passed.","properties":{"username":{},"password":{}}},"endpoint":{"type":"string","example":"example.com","description":"host of the OpenSearch cluster"},"cluster_uuid":{"type":"string","example":"85148069-7e35-4999-80bd-6fa1637ca385","description":"A unique identifier for a managed OpenSearch cluster."},"cluster_name":{"type":"string","example":"managed_dbaas_cluster","description":"Name of a managed OpenSearch cluster."},"index_name":{"type":"string","description":"OpenSearch index to send logs to.","example":"logs"},"retention_days":{"type":"integer","description":"Number of days to retain logs in an OpenSearch cluster.","example":14,"default":14}},"x-ref":"#/components/schemas/opensearch_config_request","key$":"config"}},"x-ref":"#/components/schemas/destination_request","index$":1},"examples":{"Managed OpenSearch Cluster":{"value":{"name":"managed_opensearch_cluster","type":"opensearch_dbaas","config":{"endpoint":"db-opensearch-nyc3-123456-do-user-123456-0.g.db.ondigitalocean.com","cluster_uuid":"85148069-7e35-4999-80bd-6fa1637ca385","cluster_name":"managed_dbaas_cluster","index_name":"logs","retention_days":14}}},"External OpenSearch Cluster":{"value":{"name":"external_opensearch","type":"opensearch_ext","config":{"endpoint":"example.com","credentials":{"username":"username","password":"password"},"index_name":"logs","retention_days":14}}}}}}},"parameters":[]},"GET /v2/monitoring/alerts":{"protocol":"http","parameters":[{"in":"query","name":"per_page","required":false,"description":"Number of items returned per page","schema":{"type":"integer","minimum":1,"default":20,"maximum":200},"example":2,"x-ref":"#/components/parameters/parameters_per_page","index$":0},{"in":"query","name":"page","required":false,"description":"Which 'page' of paginated results to return.","schema":{"type":"integer","minimum":1,"default":1},"example":1,"x-ref":"#/components/parameters/page","index$":1}]},"GET /v2/monitoring/sinks":{"protocol":"http","parameters":[{"in":"query","name":"resource_id","description":"A unique URN for a resource.","schema":{"type":"string","pattern":"^do:(dbaas|domain|droplet|floatingip|loadbalancer|space|volume|kubernetes|vpc):.*","example":"do:droplet:13457723","description":"The uniform resource name (URN) for the resource in the format do:resource_type:resource_id.","x-ref":"#/components/schemas/urn"},"example":"do:kubernetes:5ba4518b-b9e2-4978-aa92-2d4c727e8824","x-ref":"#/components/parameters/resource_id","index$":0}]},"GET /v2/monitoring/sinks/destinations":{"protocol":"http","parameters":[]},"GET /v2/monitoring/alerts/{alert_uuid}":{"protocol":"http","parameters":[{"in":"path","name":"alert_uuid","description":"A unique identifier for an alert policy.","required":true,"schema":{"type":"string"},"example":"4de7ac8b-495b-4884-9a69-1050c6793cd6","x-ref":"#/components/parameters/alert_uuid","index$":0}]},"GET /v2/monitoring/sinks/destinations/{destination_uuid}":{"protocol":"http","parameters":[{"in":"path","name":"destination_uuid","description":"A unique identifier for a destination.","required":true,"schema":{"type":"string"},"example":"1a64809f-1708-48ee-a742-dec8d481b8d1","x-ref":"#/components/parameters/destination_uuid","index$":0}]},"GET /v2/monitoring/sinks/{sink_uuid}":{"protocol":"http","parameters":[{"in":"path","name":"sink_uuid","description":"A unique identifier for a sink.","required":true,"schema":{"type":"string"},"example":"78b172b6-52c3-4a4b-96d5-78d3f1a0b18c","x-ref":"#/components/parameters/sink_uuid","index$":0}]},"DELETE /v2/monitoring/alerts/{alert_uuid}":{"protocol":"http","parameters":[{"in":"path","name":"alert_uuid","description":"A unique identifier for an alert policy.","required":true,"schema":{"type":"string"},"example":"4de7ac8b-495b-4884-9a69-1050c6793cd6","x-ref":"#/components/parameters/alert_uuid","index$":0}]},"DELETE /v2/monitoring/sinks/destinations/{destination_uuid}":{"protocol":"http","parameters":[{"in":"path","name":"destination_uuid","description":"A unique identifier for a destination.","required":true,"schema":{"type":"string"},"example":"1a64809f-1708-48ee-a742-dec8d481b8d1","x-ref":"#/components/parameters/destination_uuid","index$":0}]},"DELETE /v2/monitoring/sinks/{sink_uuid}":{"protocol":"http","parameters":[{"in":"path","name":"sink_uuid","description":"A unique identifier for a sink.","required":true,"schema":{"type":"string"},"example":"78b172b6-52c3-4a4b-96d5-78d3f1a0b18c","x-ref":"#/components/parameters/sink_uuid","index$":0}]},"PUT /v2/monitoring/alerts/{alert_uuid}":{"protocol":"http","requestBody":{"description":"The `type` field dictates what type of entity that the alert policy applies to and hence what type of entity is passed in the `entities` array. If both the `tags` array and `entities` array are empty the alert policy applies to all entities of the relevant type that are owned by the user account. Otherwise the following table shows the valid entity types for each type of alert policy:\n\nType | Description | Valid Entity Type\n-----|-------------|--------------------\n`v1/insights/droplet/memory_utilization_percent` | alert on the percent of memory utilization | Droplet ID\n`v1/insights/droplet/disk_read` | alert on the rate of disk read I/O in MBps | Droplet ID\n`v1/insights/droplet/load_5` | alert on the 5 minute load average | Droplet ID\n`v1/insights/droplet/load_15` | alert on the 15 minute load average | Droplet ID\n`v1/insights/droplet/disk_utilization_percent` | alert on the percent of disk utilization | Droplet ID\n`v1/insights/droplet/cpu` | alert on the percent of CPU utilization | Droplet ID\n`v1/insights/droplet/disk_write` | alert on the rate of disk write I/O in MBps | Droplet ID\n`v1/insights/droplet/public_outbound_bandwidth` | alert on the rate of public outbound bandwidth in Mbps | Droplet ID\n`v1/insights/droplet/public_inbound_bandwidth` | alert on the rate of public inbound bandwidth in Mbps | Droplet ID\n`v1/insights/droplet/private_outbound_bandwidth` | alert on the rate of private outbound bandwidth in Mbps | Droplet ID\n`v1/insights/droplet/private_inbound_bandwidth` | alert on the rate of private inbound bandwidth in Mbps | Droplet ID\n`v1/insights/droplet/load_1` | alert on the 1 minute load average | Droplet ID\n`v1/insights/lbaas/avg_cpu_utilization_percent`|alert on the percent of CPU utilization|load balancer ID\n`v1/insights/lbaas/connection_utilization_percent`|alert on the percent of connection utilization|load balancer ID\n`v1/insights/lbaas/droplet_health`|alert on Droplet health status changes|load balancer ID\n`v1/insights/lbaas/tls_connections_per_second_utilization_percent`|alert on the percent of TLS connections per second utilization (requires at least one HTTPS forwarding rule)|load balancer ID\n`v1/insights/lbaas/increase_in_http_error_rate_percentage_5xx`|alert on the percent increase of 5xx level http errors over 5m|load balancer ID\n`v1/insights/lbaas/increase_in_http_error_rate_percentage_4xx`|alert on the percent increase of 4xx level http errors over 5m|load balancer ID\n`v1/insights/lbaas/increase_in_http_error_rate_count_5xx`|alert on the count of 5xx level http errors over 5m|load balancer ID\n`v1/insights/lbaas/increase_in_http_error_rate_count_4xx`|alert on the count of 4xx level http errors over 5m|load balancer ID\n`v1/insights/lbaas/high_http_request_response_time`|alert on high average http response time|load balancer ID\n`v1/insights/lbaas/high_http_request_response_time_50p`|alert on high 50th percentile http response time|load balancer ID\n`v1/insights/lbaas/high_http_request_response_time_95p`|alert on high 95th percentile http response time|load balancer ID\n`v1/insights/lbaas/high_http_request_response_time_99p`|alert on high 99th percentile http response time|load balancer ID\n`v1/dbaas/alerts/load_15_alerts` | alert on 15 minute load average across the database cluster | database cluster UUID\n`v1/dbaas/alerts/memory_utilization_alerts` | alert on the percent memory utilization average across the database cluster | database cluster UUID\n`v1/dbaas/alerts/disk_utilization_alerts` | alert on the percent disk utilization average across the database cluster | database cluster UUID\n`v1/dbaas/alerts/cpu_alerts` | alert on the percent CPU usage average across the database cluster | database cluster UUID\n`v1/droplet/autoscale_alerts/current_instances` | alert on current pool size | autoscale pool ID\n`v1/droplet/autoscale_alerts/target_instances` | alert on target pool size | autoscale pool ID\n`v1/droplet/autoscale_alerts/current_cpu_utilization` | alert on current average CPU utilization | autoscale pool ID\n`v1/droplet/autoscale_alerts/target_cpu_utilization` | alert on target average CPU utilization | autoscale pool ID\n`v1/droplet/autoscale_alerts/current_memory_utilization` | alert on current average memory utilization | autoscale pool ID\n`v1/droplet/autoscale_alerts/target_memory_utilization` | alert on target average memory utilization | autoscale pool ID\n`v1/droplet/autoscale_alerts/scale_up` | alert on scale up event | autoscale pool ID\n`v1/droplet/autoscale_alerts/scale_down` | alert on scale down event | autoscale pool ID\n","required":true,"content":{"application/json":{"schema":{"type":"object","required":["type","description","compare","value","window","entities","tags","alerts","enabled"],"properties":{"alerts":{"type":"object","required":["slack","email"],"properties":{"email":{"description":"An email to notify on an alert trigger.","example":["bob@exmaple.com"],"type":"array","items":{"type":"string"}},"slack":{"type":"array","description":"Slack integration details.","items":{"type":"object","required":[],"properties":{},"x-ref":"#/components/schemas/slack_details"}}},"x-ref":"#/components/schemas/alerts","key$":"alerts"},"compare":{"type":"string","example":"GreaterThan","enum":["GreaterThan","LessThan"],"key$":"compare"},"description":{"type":"string","example":"CPU Alert","key$":"description"},"enabled":{"type":"boolean","example":true,"key$":"enabled"},"entities":{"type":"array","items":{"type":"string"},"example":["192018292"],"key$":"entities"},"tags":{"type":"array","items":{"type":"string"},"example":["droplet_tag"],"key$":"tags"},"type":{"type":"string","enum":["v1/insights/droplet/load_1","v1/insights/droplet/load_5","v1/insights/droplet/load_15","v1/insights/droplet/memory_utilization_percent","v1/insights/droplet/disk_utilization_percent","v1/insights/droplet/cpu","v1/insights/droplet/disk_read","v1/insights/droplet/disk_write","v1/insights/droplet/public_outbound_bandwidth","v1/insights/droplet/public_inbound_bandwidth","v1/insights/droplet/private_outbound_bandwidth","v1/insights/droplet/private_inbound_bandwidth","v1/insights/lbaas/avg_cpu_utilization_percent","v1/insights/lbaas/connection_utilization_percent","v1/insights/lbaas/droplet_health","v1/insights/lbaas/tls_connections_per_second_utilization_percent","v1/insights/lbaas/increase_in_http_error_rate_percentage_5xx","v1/insights/lbaas/increase_in_http_error_rate_percentage_4xx","v1/insights/lbaas/increase_in_http_error_rate_count_5xx","v1/insights/lbaas/increase_in_http_error_rate_count_4xx","v1/insights/lbaas/high_http_request_response_time","v1/insights/lbaas/high_http_request_response_time_50p","v1/insights/lbaas/high_http_request_response_time_95p","v1/insights/lbaas/high_http_request_response_time_99p","v1/dbaas/alerts/load_15_alerts","v1/dbaas/alerts/memory_utilization_alerts","v1/dbaas/alerts/disk_utilization_alerts","v1/dbaas/alerts/cpu_alerts","v1/droplet/autoscale_alerts/current_instances","v1/droplet/autoscale_alerts/target_instances","v1/droplet/autoscale_alerts/current_cpu_utilization","v1/droplet/autoscale_alerts/target_cpu_utilization","v1/droplet/autoscale_alerts/current_memory_utilization","v1/droplet/autoscale_alerts/target_memory_utilization","v1/droplet/autoscale_alerts/scale_up","v1/droplet/autoscale_alerts/scale_down"],"example":"v1/insights/droplet/cpu","key$":"type"},"value":{"type":"number","format":"float","example":80,"key$":"value"},"window":{"type":"string","example":"5m","enum":["5m","10m","30m","1h"],"key$":"window"}},"x-ref":"#/components/schemas/alert_policy_request","index$":1}}}},"parameters":[{"in":"path","name":"alert_uuid","description":"A unique identifier for an alert policy.","required":true,"schema":{"type":"string"},"example":"4de7ac8b-495b-4884-9a69-1050c6793cd6","x-ref":"#/components/parameters/alert_uuid","index$":0}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const monitoring_ref01_ent = client.Monitoring()
    let monitoring_ref01_data = setup.data.new.monitoring['monitoring_ref01']

    monitoring_ref01_data = (await monitoring_ref01_ent.create(monitoring_ref01_data)).data()
    assert(null != monitoring_ref01_data.id)


    // LIST
    const monitoring_ref01_match: any = {}

    const monitoring_ref01_list = (await monitoring_ref01_ent.list(monitoring_ref01_match)).map((e: any) => e.data())

    assert(!isempty(select(monitoring_ref01_list, { id: monitoring_ref01_data.id })))


    // LIST
    const monitoring_ref01_match_rt0: any = {}

    const monitoring_ref01_list_rt0 = (await monitoring_ref01_ent.list(monitoring_ref01_match_rt0)).map((e: any) => e.data())

    assert(isempty(select(monitoring_ref01_list_rt0, { id: monitoring_ref01_data.id })))


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
      '../../../../.sdk/test/entity/monitoring/MonitoringTestData.json')

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
    ['monitoring01','monitoring02','monitoring03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'DIGITALOCEAN_TEST_MONITORING_ENTID': idmap,
    'DIGITALOCEAN_TEST_LIVE': 'FALSE',
    'DIGITALOCEAN_TEST_EXPLAIN': 'FALSE',
    'DIGITALOCEAN_APIKEY': '',
  })

  idmap = env['DIGITALOCEAN_TEST_MONITORING_ENTID']

  const live = 'TRUE' === env.DIGITALOCEAN_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['DIGITALOCEAN_TEST_MONITORING_ENTID']
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
  
