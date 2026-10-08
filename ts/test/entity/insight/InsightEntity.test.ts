

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


describe('InsightEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when DIGITALOCEAN_TEST_LIVE=TRUE.
  afterEach(liveDelay('DIGITALOCEAN_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = DigitaloceanSDK.test()
    const ent = testsdk.Insight()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = DigitaloceanSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.Insight().load({"id":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.DIGITALOCEAN_TEST_LIVE
    for (const op of ['update', 'load', 'remove']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'insight.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"channel_type":{"a":true,"h":"Channel Type","n":"channel_type","r":true,"ro":true,"sh":"The configured channel type.","t":"`$STRING`","key$":"channel_type","index$":0},"created_at":{"a":true,"fo":"date-time","h":"Created At","n":"created_at","r":true,"ro":true,"sh":"Time the alert rule was created.","t":"`$STRING`","key$":"created_at","index$":1},"email":{"a":true,"h":"Email","n":"email","r":true,"sh":"Email notification channel configuration.","t":"`$OBJECT`","key$":"email","index$":2},"id":{"a":true,"fo":"uuid","h":"Id","n":"id","r":true,"ro":true,"sh":"A unique identifier for the alert instance.","t":"`$STRING`","key$":"id","index$":3},"last_notified_at":{"a":true,"fo":"date-time","h":"Last Notified At","n":"last_notified_at","r":false,"sh":"Time a notification was last sent for this alert instance.","t":"`$STRING`","key$":"last_notified_at","index$":4},"last_triggered_at":{"a":true,"fo":"date-time","h":"Last Triggered At","n":"last_triggered_at","r":true,"sh":"Time the alert instance most recently fired.","t":"`$STRING`","key$":"last_triggered_at","index$":5},"name":{"a":true,"h":"Name","n":"name","r":true,"sh":"A human-readable name for the notification channel.","t":"`$STRING`","key$":"name","index$":6},"resolved_at":{"a":true,"fo":"date-time","h":"Resolved At","n":"resolved_at","r":false,"sh":"Time the alert instance resolved.","t":"`$STRING`","key$":"resolved_at","index$":7},"resource_urn":{"a":true,"h":"Resource Urn","n":"resource_urn","r":false,"sh":"URN of the DigitalOcean resource the alert fired for.","t":"`$STRING`","key$":"resource_urn","index$":8},"rule_id":{"a":true,"fo":"uuid","h":"Rule Id","n":"rule_id","r":true,"sh":"ID of the alert rule that fired this alert instance.","t":"`$STRING`","key$":"rule_id","index$":9},"severity":{"a":true,"h":"Severity","n":"severity","r":true,"sh":"Severity of the breached threshold.","t":"`$STRING`","key$":"severity","index$":10},"slack":{"a":true,"h":"Slack","n":"slack","r":true,"sh":"Slack notification channel configuration as returned in API responses.","t":"`$OBJECT`","key$":"slack","index$":11},"spec":{"a":true,"h":"Spec","n":"spec","r":true,"sh":"Spec for an Insights alert rule.","t":"`$OBJECT`","union":{"branches":2,"count":1,"depth":2},"key$":"spec","index$":12},"status":{"a":true,"h":"Status","n":"status","op":{"update":{"req":false,"type":"`$STRING`"}},"r":true,"ro":true,"sh":"Current status of the alert instance.","t":"`$STRING`","key$":"status","index$":13},"triggered_at":{"a":true,"fo":"date-time","h":"Triggered At","n":"triggered_at","r":true,"sh":"Time the alert instance first fired.","t":"`$STRING`","key$":"triggered_at","index$":14},"updated_at":{"a":true,"fo":"date-time","h":"Updated At","n":"updated_at","r":true,"ro":true,"sh":"Time the alert rule was last updated.","t":"`$STRING`","key$":"updated_at","index$":15},"usage":{"a":true,"h":"Usage","n":"usage","r":false,"ro":true,"t":"`$ANY`","key$":"usage","index$":16},"value":{"a":true,"fo":"double","h":"Value","n":"value","r":true,"sh":"The observed metric value that breached the threshold.","t":"`$NUMBER`","key$":"value","index$":17},"webhook":{"a":true,"h":"Webhook","n":"webhook","r":true,"sh":"Generic HTTPS webhook notification channel configuration as returned in API responses.","t":"`$OBJECT`","key$":"webhook","index$":18}},"id":{"field":"id","name":"id"},"name":"insight","op":{"create":{"input":"data","name":"create","points":[{"a":true,"co":{"id":"POST /v2/insights/alert-rules","source":"openapi3","version":2},"g":{},"k":"http","m":"POST","o":"/v2/insights/alert-rules","q":{"$action":"alert_rule"},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v2"},{"lit":"insights"},{"lit":"alert-rules"}],"t":{"req":"`reqdata`","res":"`body.alert_rule`"},"index$":0},{"a":true,"co":{"id":"POST /v2/insights/notification-channels","source":"openapi3","version":2},"g":{},"k":"http","m":"POST","o":"/v2/insights/notification-channels","q":{"$action":"notification_channel"},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v2"},{"lit":"insights"},{"lit":"notification-channels"}],"t":{"req":"`reqdata`","res":"`body.notification_channel`"},"index$":1}],"key$":"create"},"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /v2/insights/alert-instances","source":"openapi3","version":2},"g":{"query":[{"a":true,"ex":1,"k":"query","n":"page","or":"page","r":false,"t":"`$INTEGER`","index$":0},{"a":true,"ex":2,"k":"query","n":"per_page","or":"per_page","r":false,"t":"`$INTEGER`","index$":1},{"a":true,"ex":"do:droplet:12345","k":"query","n":"resource_urn","or":"resource_urn","r":false,"t":"`$STRING`","index$":2},{"a":true,"ex":"8f3a2b1c-4d5e-6f7a-8b9c-0d1e2f3a4b5c","k":"query","n":"rule_id","or":"rule_id","r":false,"t":"`$STRING`","index$":3},{"a":true,"ex":"active","k":"query","n":"status","or":"status","r":false,"t":"`$STRING`","index$":4}]},"k":"http","m":"GET","o":"/v2/insights/alert-instances","q":{"$action":"alert_instance"},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v2"},{"lit":"insights"},{"lit":"alert-instances"}],"t":{"req":"`reqdata`","res":"`body.alert_instances`"},"index$":0},{"a":true,"co":{"id":"GET /v2/insights/alert-rules","source":"openapi3","version":2},"g":{"query":[{"a":true,"ex":1,"k":"query","n":"page","or":"page","r":false,"t":"`$INTEGER`","index$":0},{"a":true,"ex":2,"k":"query","n":"per_page","or":"per_page","r":false,"t":"`$INTEGER`","index$":1},{"a":true,"ex":"do:droplet:12345","k":"query","n":"resource_urn","or":"resource_urn","r":false,"t":"`$STRING`","index$":2}]},"k":"http","m":"GET","o":"/v2/insights/alert-rules","q":{"$action":"alert_rule"},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v2"},{"lit":"insights"},{"lit":"alert-rules"}],"t":{"req":"`reqdata`","res":"`body.alert_rules`"},"index$":1},{"a":true,"co":{"id":"GET /v2/insights/notification-channels","source":"openapi3","version":2},"g":{"query":[{"a":true,"ex":1,"k":"query","n":"page","or":"page","r":false,"t":"`$INTEGER`","index$":0},{"a":true,"ex":2,"k":"query","n":"per_page","or":"per_page","r":false,"t":"`$INTEGER`","index$":1}]},"k":"http","m":"GET","o":"/v2/insights/notification-channels","q":{"$action":"notification_channel"},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v2"},{"lit":"insights"},{"lit":"notification-channels"}],"t":{"req":"`reqdata`","res":"`body.notification_channels`"},"index$":2}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /v2/insights/alert-instances/{id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":"a1b2c3d4-e5f6-7890-abcd-ef1234567890","k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/v2/insights/alert-instances/{id}","q":{"exist":["id"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v2"},{"lit":"insights"},{"lit":"alert-instances"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body.alert_instance`"},"index$":0},{"a":true,"co":{"id":"GET /v2/insights/alert-rules/{id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":"a1b2c3d4-e5f6-7890-abcd-ef1234567890","k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/v2/insights/alert-rules/{id}","q":{"exist":["id"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v2"},{"lit":"insights"},{"lit":"alert-rules"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body.alert_rule`"},"index$":1},{"a":true,"co":{"id":"GET /v2/insights/notification-channels/{id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":"550e8400-e29b-41d4-a716-446655440000","k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/v2/insights/notification-channels/{id}","q":{"exist":["id"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v2"},{"lit":"insights"},{"lit":"notification-channels"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body.notification_channel`"},"index$":2}],"key$":"load"},"remove":{"input":"data","name":"remove","points":[{"a":true,"co":{"id":"DELETE /v2/insights/alert-rules/{id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":"a1b2c3d4-e5f6-7890-abcd-ef1234567890","k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"DELETE","o":"/v2/insights/alert-rules/{id}","q":{"exist":["id"]},"r":{},"s":[{"lit":"v2"},{"lit":"insights"},{"lit":"alert-rules"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0},{"a":true,"co":{"id":"DELETE /v2/insights/notification-channels/{id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":"550e8400-e29b-41d4-a716-446655440000","k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"DELETE","o":"/v2/insights/notification-channels/{id}","q":{"exist":["id"]},"r":{},"s":[{"lit":"v2"},{"lit":"insights"},{"lit":"notification-channels"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":1}],"key$":"remove"},"update":{"input":"data","name":"update","points":[{"a":true,"co":{"id":"PUT /v2/insights/alert-rules/{id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":"a1b2c3d4-e5f6-7890-abcd-ef1234567890","k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"PUT","o":"/v2/insights/alert-rules/{id}","q":{"exist":["id"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v2"},{"lit":"insights"},{"lit":"alert-rules"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body.alert_rule`"},"index$":0},{"a":true,"co":{"id":"PUT /v2/insights/notification-channels/{id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":"550e8400-e29b-41d4-a716-446655440000","k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"PUT","o":"/v2/insights/notification-channels/{id}","q":{"exist":["id"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v2"},{"lit":"insights"},{"lit":"notification-channels"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body.notification_channel`"},"index$":1}],"key$":"update"}},"relations":{"ancestors":[]},"key$":"insight","name__orig":"insight","Name":"Insight","name_":"insight","name-":"insight","NAME":"INSIGHT","index$":159}, {"active":true,"entity":"insight","key$":"BasicInsightFlow","kind":"basic","name":"BasicInsightFlow","param":{},"step":[{"a":false,"d":{},"i":{"ref":"insight_ref01"},"m":{},"o":"create","s":[],"v":[],"unreachable":true},{"a":false,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"insight_ref01"}}],"unreachable":true},{"a":true,"d":{},"i":{"ref":"insight_ref01","srcdatavar":"insight_ref01_data","suffix":"_up0","textfield":"last_notified_at"},"m":{},"o":"update","s":[{"apply":"TextFieldMark","def":{"mark":"Mark01-insight_ref01"}}],"v":[],"index$":0},{"a":true,"d":{},"i":{"ref":"insight_ref01","srcdatavar":"insight_ref01_data","suffix":"_dt0"},"m":{"id":"insight01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-insight_ref01"}}],"index$":1},{"a":true,"d":{},"i":{"ref":"insight_ref01","suffix":"_rm0"},"m":{"id":"insight01"},"o":"remove","s":[],"v":[],"index$":2},{"a":false,"d":{},"i":{"suffix":"_rt0"},"m":{},"o":"list","s":[],"v":[{"apply":"ItemNotExists","def":{"ref":"insight_ref01"}}],"unreachable":true}]}, 'Insight', {"POST /v2/insights/alert-rules":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"allOf":[{"type":"object","description":"Create or update body for an alert rule. `spec` is required. `status` is\noptional; create defaults to `ALERT_RULE_STATUS_ACTIVE`, and update keeps the\nexisting status when omitted.\n","required":["spec"],"properties":{"spec":{"type":"object","description":"Spec for an Insights alert rule. On create, `name`, `query`, `thresholds`,\nand at least one `notification_channels` binding are required. On update,\nomit `notification_channels` to keep existing bindings; an explicit empty\nlist is rejected.\n","required":["name","query","thresholds"],"properties":{"name":{},"query":{},"condition":{},"thresholds":{},"notification_channels":{},"re_alert_duration":{}},"x-ref":"#/components/schemas/alert_rule_spec","key$":"spec"},"status":{"type":"string","description":"Desired alert rule status. Allowed values:\n\n- `ALERT_RULE_STATUS_ACTIVE` = active\n- `ALERT_RULE_STATUS_PAUSED` = paused\n","enum":["ALERT_RULE_STATUS_ACTIVE","ALERT_RULE_STATUS_PAUSED"],"example":"ALERT_RULE_STATUS_ACTIVE","key$":"status"}},"x-ref":"#/components/schemas/alert_rule_request"},{"type":"object","properties":{"spec":{"allOf":[{},{}]}}}],"x-ref":"#/components/schemas/alert_rule_create_request"},"example":{"spec":{"name":"High CPU","query":{"metric":"do.droplets.cpu_utilization","resource_urns":["do:droplet:12345"],"tags":["env:prod"]},"condition":{"window":"EVALUATION_WINDOW_5M"},"thresholds":{"warning":80,"critical":95,"operator":"THRESHOLD_OPERATOR_GREATER_THAN"},"notification_channels":[{"notification_channel_id":"550e8400-e29b-41d4-a716-446655440000","notify_on":["SEVERITY_CRITICAL"]}],"re_alert_duration":"RE_ALERT_DURATION_4H"}}}}},"parameters":[]},"POST /v2/insights/notification-channels":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","description":"Create or update body for a notification channel. Provide a `name` and\nexactly one of `email`, `slack`, or `webhook`.\n\nSecret fields are write-only: send the full value to set or rotate; omit the\nfield on update to keep the existing secret.\n","required":["name"],"oneOf":[{"title":"Email","required":["email"]},{"title":"Slack","required":["slack"]},{"title":"Webhook","required":["webhook"]}],"properties":{"name":{"type":"string","description":"A human-readable name for the notification channel.","example":"Platform alerts","key$":"name"},"email":{"type":"object","description":"Email notification channel configuration. Recipients must be verified team\nmember email addresses.\n","required":["to"],"properties":{"to":{"type":"string","description":"One or more recipient email addresses, separated by commas, semicolons,\nor spaces.\n","example":"alerts@example.com, backup@example.com"}},"x-ref":"#/components/schemas/email_notification_config","key$":"email"},"slack":{"type":"object","description":"Slack notification channel configuration for create and update requests.\n`webhook_url` is write-only: send the full value to set or rotate. Omit\n`webhook_url` on update to keep the existing secret.\n","required":["channel"],"properties":{"webhook_url":{"type":"string","writeOnly":true,"description":"Slack incoming webhook URL. Write-only secret — send the full value on\ncreate or update. Omit on update to retain the existing value. Never\nreturned in responses.\n","example":"https://hooks.slack.com/services/EXAMPLE-WEBHOOK"},"channel":{"type":"string","description":"The Slack channel name to notify.","example":"#platform-alerts"}},"x-ref":"#/components/schemas/slack_notification_config","key$":"slack"},"webhook":{"type":"object","description":"Generic HTTPS webhook notification channel configuration for create and\nupdate requests. The URL must use HTTPS and must not include userinfo.\nOptionally configure either `basic_auth` or `bearer_token` (not both),\ncustom headers, and a signing secret.\n\n`url` is not a secret and is returned in full on read. Credential fields\n(`basic_auth.password`, `bearer_token.token`, `signature.secret`) are\nwrite-only: send the full value to set or rotate. Omit a secret field on\nupdate to keep the existing value. Responses return nested `*_status`\nobjects instead of secret values.\n","required":["url"],"properties":{"url":{"type":"string","format":"uri","description":"HTTPS URL that receives webhook deliveries. Returned in full on read.","example":"https://example.com/hook"},"basic_auth":{"type":"object","description":"HTTP basic authentication credentials for a webhook create or update\nrequest. `password` is write-only: send the full value to set or rotate.\nOmit `password` on update to keep the existing password.\n","required":["username"],"properties":{"username":{},"password":{}},"x-ref":"#/components/schemas/webhook_basic_auth"},"bearer_token":{"type":"object","description":"Bearer token authentication for a webhook create or update request. `token`\nis write-only: send the full value to set or rotate. Omit `token` on update\nto keep the existing token.\n","properties":{"token":{}},"x-ref":"#/components/schemas/webhook_bearer_token"},"headers":{"type":"object","maxProperties":20,"additionalProperties":{"type":"string","example":"1"},"description":"Optional custom HTTP headers to include on webhook deliveries. At most\n20 headers are allowed. Reserved header names such as `host`,\n`content-type`, and `proxy-*` are rejected.\n","example":{"X-Custom":"1"}},"signature":{"type":"object","description":"Optional HMAC signature configuration for a webhook create or update\nrequest. `secret` is write-only: send the full value to set or rotate. Omit\n`secret` on update to keep the existing secret.\n","properties":{"secret":{}},"x-ref":"#/components/schemas/webhook_signature_config"}},"x-ref":"#/components/schemas/webhook_notification_config","key$":"webhook"}},"x-ref":"#/components/schemas/notification_channel_request"},"examples":{"slack":{"summary":"Slack channel","value":{"name":"Platform alerts","slack":{"webhook_url":"https://hooks.slack.com/services/EXAMPLE-WEBHOOK","channel":"#platform-alerts"}}},"email":{"summary":"Email channel","value":{"name":"On-call email","email":{"to":"alerts@example.com, backup@example.com"}}},"webhook":{"summary":"HTTPS webhook with bearer token","value":{"name":"Incident webhook","webhook":{"url":"https://example.com/hook","bearer_token":{"token":"secret-token"},"headers":{"X-Custom":"1"},"signature":{"secret":"whsec"}}}}}}}},"parameters":[]},"GET /v2/insights/alert-instances":{"protocol":"http","parameters":[{"in":"query","name":"per_page","required":false,"description":"Number of items returned per page","schema":{"type":"integer","minimum":1,"default":20,"maximum":200},"example":2,"x-ref":"#/components/parameters/parameters_per_page","index$":0},{"in":"query","name":"page","required":false,"description":"Which 'page' of paginated results to return.","schema":{"type":"integer","minimum":1,"default":1},"example":1,"x-ref":"#/components/parameters/page","index$":1},{"in":"query","name":"status","required":false,"description":"Optional filter. When set, only alert instances with this status are\nreturned.\n","schema":{"type":"string","enum":["active","resolved"]},"example":"active","x-ref":"#/components/parameters/alert_instance_status","index$":2},{"in":"query","name":"rule_id","required":false,"description":"Optional filter. When set, only alert instances fired by the alert rule\nwith this ID are returned.\n","schema":{"type":"string","format":"uuid"},"example":"8f3a2b1c-4d5e-6f7a-8b9c-0d1e2f3a4b5c","x-ref":"#/components/parameters/rule_id","index$":3},{"in":"query","name":"resource_urn","required":false,"description":"Optional filter. When set, only resources associated with this resource URN\nare returned.\n","schema":{"type":"string"},"example":"do:droplet:12345","x-ref":"#/components/parameters/resource_urn","index$":4}]},"GET /v2/insights/alert-rules":{"protocol":"http","parameters":[{"in":"query","name":"page","required":false,"description":"Which 'page' of paginated results to return.","schema":{"type":"integer","minimum":1,"default":1},"example":1,"x-ref":"#/components/parameters/page","index$":0},{"in":"query","name":"per_page","required":false,"description":"Number of items returned per page","schema":{"type":"integer","minimum":1,"default":20,"maximum":200},"example":2,"x-ref":"#/components/parameters/parameters_per_page","index$":1},{"in":"query","name":"resource_urn","required":false,"description":"Optional filter. When set, only resources associated with this resource URN\nare returned.\n","schema":{"type":"string"},"example":"do:droplet:12345","x-ref":"#/components/parameters/resource_urn","index$":2}]},"GET /v2/insights/notification-channels":{"protocol":"http","parameters":[{"in":"query","name":"page","required":false,"description":"Which 'page' of paginated results to return.","schema":{"type":"integer","minimum":1,"default":1},"example":1,"x-ref":"#/components/parameters/page","index$":0},{"in":"query","name":"per_page","required":false,"description":"Number of items returned per page","schema":{"type":"integer","minimum":1,"default":20,"maximum":200},"example":2,"x-ref":"#/components/parameters/parameters_per_page","index$":1}]},"GET /v2/insights/alert-instances/{id}":{"protocol":"http","parameters":[{"in":"path","name":"id","description":"A unique identifier for an alert instance.","required":true,"schema":{"type":"string","format":"uuid"},"example":"a1b2c3d4-e5f6-7890-abcd-ef1234567890","x-ref":"#/components/parameters/alert_instance_id","index$":0}]},"GET /v2/insights/alert-rules/{id}":{"protocol":"http","parameters":[{"in":"path","name":"id","description":"A unique identifier for an alert rule.","required":true,"schema":{"type":"string","format":"uuid"},"example":"a1b2c3d4-e5f6-7890-abcd-ef1234567890","x-ref":"#/components/parameters/alert_rule_id","index$":0}]},"GET /v2/insights/notification-channels/{id}":{"protocol":"http","parameters":[{"in":"path","name":"id","description":"A unique identifier for a notification channel.","required":true,"schema":{"type":"string","format":"uuid"},"example":"550e8400-e29b-41d4-a716-446655440000","x-ref":"#/components/parameters/notification_channel_id","index$":0}]},"DELETE /v2/insights/alert-rules/{id}":{"protocol":"http","parameters":[{"in":"path","name":"id","description":"A unique identifier for an alert rule.","required":true,"schema":{"type":"string","format":"uuid"},"example":"a1b2c3d4-e5f6-7890-abcd-ef1234567890","x-ref":"#/components/parameters/alert_rule_id","index$":0}]},"DELETE /v2/insights/notification-channels/{id}":{"protocol":"http","parameters":[{"in":"path","name":"id","description":"A unique identifier for a notification channel.","required":true,"schema":{"type":"string","format":"uuid"},"example":"550e8400-e29b-41d4-a716-446655440000","x-ref":"#/components/parameters/notification_channel_id","index$":0}]},"PUT /v2/insights/alert-rules/{id}":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","description":"Create or update body for an alert rule. `spec` is required. `status` is\noptional; create defaults to `ALERT_RULE_STATUS_ACTIVE`, and update keeps the\nexisting status when omitted.\n","required":["spec"],"properties":{"spec":{"type":"object","description":"Spec for an Insights alert rule. On create, `name`, `query`, `thresholds`,\nand at least one `notification_channels` binding are required. On update,\nomit `notification_channels` to keep existing bindings; an explicit empty\nlist is rejected.\n","required":["name","query","thresholds"],"properties":{"name":{"type":"string","description":"A human-readable name for the alert rule.","example":"High CPU"},"query":{"type":"object","description":"Metrics query that the alert rule evaluates. `metric` must be a dotted\nOpenTelemetry name (for example `do.droplets.cpu_utilization`). Underscored\nPrometheus-style names are rejected. When `resource_urns` is omitted or empty,\nthe rule is not scoped to specific resources.\n","required":["metric"],"properties":{"metric":{},"filters":{},"resource_urns":{},"tags":{}},"x-ref":"#/components/schemas/metrics_query"},"condition":{"type":"object","description":"Evaluation condition for the alert rule.","properties":{"window":{}},"x-ref":"#/components/schemas/alert_condition"},"thresholds":{"type":"object","description":"Threshold configuration for the alert rule. At least one of `warning` or\n`critical` must be set.\n","required":["operator"],"anyOf":[{},{}],"properties":{"warning":{},"critical":{},"operator":{}},"x-ref":"#/components/schemas/alert_thresholds"},"notification_channels":{"type":"array","description":"Notification channels to notify when the rule fires.","minItems":1,"items":{"type":"object","description":"Binding from an alert rule to a notification channel. When `notify_on` is\nomitted or empty, the channel is notified for all severities.\n","required":[],"properties":{},"x-ref":"#/components/schemas/notification_channel_binding"}},"re_alert_duration":{"type":"string","description":"Minimum wait before re-notifying a still-firing alert. Defaults to\n`RE_ALERT_DURATION_4H` on create when omitted. Allowed values:\n\n- `RE_ALERT_DURATION_30M` = `30m`\n- `RE_ALERT_DURATION_1H` = `1h`\n- `RE_ALERT_DURATION_4H` = `4h`\n- `RE_ALERT_DURATION_NEVER` = never\n","enum":["RE_ALERT_DURATION_30M","RE_ALERT_DURATION_1H","RE_ALERT_DURATION_4H","RE_ALERT_DURATION_NEVER"],"example":"RE_ALERT_DURATION_4H"}},"x-ref":"#/components/schemas/alert_rule_spec","key$":"spec"},"status":{"type":"string","description":"Desired alert rule status. Allowed values:\n\n- `ALERT_RULE_STATUS_ACTIVE` = active\n- `ALERT_RULE_STATUS_PAUSED` = paused\n","enum":["ALERT_RULE_STATUS_ACTIVE","ALERT_RULE_STATUS_PAUSED"],"example":"ALERT_RULE_STATUS_ACTIVE","key$":"status"}},"x-ref":"#/components/schemas/alert_rule_request","index$":1},"example":{"spec":{"name":"High CPU (renamed)","query":{"metric":"do.droplets.cpu_utilization","resource_urns":["do:droplet:12345","do:droplet:67890"]},"condition":{"window":"EVALUATION_WINDOW_15M"},"thresholds":{"critical":90,"operator":"THRESHOLD_OPERATOR_GREATER_THAN_OR_EQUAL"},"notification_channels":[{"notification_channel_id":"550e8400-e29b-41d4-a716-446655440000"}]},"status":"ALERT_RULE_STATUS_PAUSED"}}}},"parameters":[{"in":"path","name":"id","description":"A unique identifier for an alert rule.","required":true,"schema":{"type":"string","format":"uuid"},"example":"a1b2c3d4-e5f6-7890-abcd-ef1234567890","x-ref":"#/components/parameters/alert_rule_id","index$":0}]},"PUT /v2/insights/notification-channels/{id}":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","description":"Create or update body for a notification channel. Provide a `name` and\nexactly one of `email`, `slack`, or `webhook`.\n\nSecret fields are write-only: send the full value to set or rotate; omit the\nfield on update to keep the existing secret.\n","required":["name"],"oneOf":[{"title":"Email","required":["email"]},{"title":"Slack","required":["slack"]},{"title":"Webhook","required":["webhook"]}],"properties":{"name":{"type":"string","description":"A human-readable name for the notification channel.","example":"Platform alerts","key$":"name"},"email":{"type":"object","description":"Email notification channel configuration. Recipients must be verified team\nmember email addresses.\n","required":["to"],"properties":{"to":{"type":"string","description":"One or more recipient email addresses, separated by commas, semicolons,\nor spaces.\n","example":"alerts@example.com, backup@example.com"}},"x-ref":"#/components/schemas/email_notification_config","key$":"email"},"slack":{"type":"object","description":"Slack notification channel configuration for create and update requests.\n`webhook_url` is write-only: send the full value to set or rotate. Omit\n`webhook_url` on update to keep the existing secret.\n","required":["channel"],"properties":{"webhook_url":{"type":"string","writeOnly":true,"description":"Slack incoming webhook URL. Write-only secret — send the full value on\ncreate or update. Omit on update to retain the existing value. Never\nreturned in responses.\n","example":"https://hooks.slack.com/services/EXAMPLE-WEBHOOK"},"channel":{"type":"string","description":"The Slack channel name to notify.","example":"#platform-alerts"}},"x-ref":"#/components/schemas/slack_notification_config","key$":"slack"},"webhook":{"type":"object","description":"Generic HTTPS webhook notification channel configuration for create and\nupdate requests. The URL must use HTTPS and must not include userinfo.\nOptionally configure either `basic_auth` or `bearer_token` (not both),\ncustom headers, and a signing secret.\n\n`url` is not a secret and is returned in full on read. Credential fields\n(`basic_auth.password`, `bearer_token.token`, `signature.secret`) are\nwrite-only: send the full value to set or rotate. Omit a secret field on\nupdate to keep the existing value. Responses return nested `*_status`\nobjects instead of secret values.\n","required":["url"],"properties":{"url":{"type":"string","format":"uri","description":"HTTPS URL that receives webhook deliveries. Returned in full on read.","example":"https://example.com/hook"},"basic_auth":{"type":"object","description":"HTTP basic authentication credentials for a webhook create or update\nrequest. `password` is write-only: send the full value to set or rotate.\nOmit `password` on update to keep the existing password.\n","required":["username"],"properties":{"username":{},"password":{}},"x-ref":"#/components/schemas/webhook_basic_auth"},"bearer_token":{"type":"object","description":"Bearer token authentication for a webhook create or update request. `token`\nis write-only: send the full value to set or rotate. Omit `token` on update\nto keep the existing token.\n","properties":{"token":{}},"x-ref":"#/components/schemas/webhook_bearer_token"},"headers":{"type":"object","maxProperties":20,"additionalProperties":{"type":"string","example":"1"},"description":"Optional custom HTTP headers to include on webhook deliveries. At most\n20 headers are allowed. Reserved header names such as `host`,\n`content-type`, and `proxy-*` are rejected.\n","example":{"X-Custom":"1"}},"signature":{"type":"object","description":"Optional HMAC signature configuration for a webhook create or update\nrequest. `secret` is write-only: send the full value to set or rotate. Omit\n`secret` on update to keep the existing secret.\n","properties":{"secret":{}},"x-ref":"#/components/schemas/webhook_signature_config"}},"x-ref":"#/components/schemas/webhook_notification_config","key$":"webhook"}},"x-ref":"#/components/schemas/notification_channel_request","index$":1},"examples":{"slack_preserve_webhook":{"summary":"Update Slack channel without rotating webhook","value":{"name":"Platform alerts (updated)","slack":{"channel":"#platform-alerts-prod"}}},"slack_rotate_webhook":{"summary":"Update Slack channel and rotate webhook","value":{"name":"Platform alerts (updated)","slack":{"webhook_url":"https://hooks.slack.com/services/EXAMPLE-WEBHOOK","channel":"#platform-alerts-prod"}}}}}}},"parameters":[{"in":"path","name":"id","description":"A unique identifier for a notification channel.","required":true,"schema":{"type":"string","format":"uuid"},"example":"550e8400-e29b-41d4-a716-446655440000","x-ref":"#/components/parameters/notification_channel_id","index$":0}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let insight_ref01_data = Object.values(setup.data.existing.insight)[0] as any

    // UPDATE
    const insight_ref01_ent = client.Insight()
    const insight_ref01_data_up0: any = {}
    insight_ref01_data_up0.id = insight_ref01_data.id

    const insight_ref01_markdef_up0 = { name: 'last_notified_at', value: 'Mark01-insight_ref01_' + setup.now }
    ;(insight_ref01_data_up0 as any)[insight_ref01_markdef_up0.name] = insight_ref01_markdef_up0.value

    const insight_ref01_resdata_up0 = (await insight_ref01_ent.update(insight_ref01_data_up0)).data()
    assert(insight_ref01_resdata_up0.id === insight_ref01_data_up0.id)

    assert((insight_ref01_resdata_up0 as any)[insight_ref01_markdef_up0.name] === insight_ref01_markdef_up0.value)


    // LOAD
    const insight_ref01_match_dt0: any = {}
    insight_ref01_match_dt0.id = insight_ref01_data.id
    const insight_ref01_data_dt0 = (await insight_ref01_ent.load(insight_ref01_match_dt0)).data()
    assert(insight_ref01_data_dt0.id === insight_ref01_data.id)


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
      '../../../../.sdk/test/entity/insight/InsightTestData.json')

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
    ['insight01','insight02','insight03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'DIGITALOCEAN_TEST_INSIGHT_ENTID': idmap,
    'DIGITALOCEAN_TEST_LIVE': 'FALSE',
    'DIGITALOCEAN_TEST_EXPLAIN': 'FALSE',
    'DIGITALOCEAN_APIKEY': '',
  })

  idmap = env['DIGITALOCEAN_TEST_INSIGHT_ENTID']

  const live = 'TRUE' === env.DIGITALOCEAN_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['DIGITALOCEAN_TEST_INSIGHT_ENTID']
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
  
