

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


describe('ImageEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when DIGITALOCEAN_TEST_LIVE=TRUE.
  afterEach(liveDelay('DIGITALOCEAN_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = DigitaloceanSDK.test()
    const ent = testsdk.Image()
    assert(null != ent)
  })


  class FailHook extends BaseFeature {
    name = 'failhook'
    version = '0.0.1'
    active = true
    unexpected = 0
    init() { }
    PreSpec() { throw new Error('image hook failed') }
    PreUnexpected() { this.unexpected++ }
  }

  test('stream-error', async () => {
    const offline = { net: { offline: true } }
    await assert.rejects(async () => {
      for await (const _item of DigitaloceanSDK.test(offline).Image().stream('list')) { }
    }, /offline/)

    for await (const _item of DigitaloceanSDK.test(offline).Image()
      .stream('list', undefined, { ctrl: { throw: false } })) { }

    if (null != (config as any).feature?.rbac) {
      const denied = DigitaloceanSDK.test(undefined, { feature: { rbac: { active: true, deny: true } } })
      await assert.rejects(async () => {
        for await (const _item of denied.Image().stream('list')) { }
      }, (err: any) => 'rbac_denied' === err.code)
    }
  })

  test('stream-ctrl', async () => {
    const explain: any = {}
    const ctrl: any = { explain }
    for await (const _item of DigitaloceanSDK.test().Image().stream('list', undefined, { ctrl })) { }
    assert.deepStrictEqual(Object.keys(ctrl), ['explain'])
    assert(explain === ctrl.explain && 0 < Object.keys(explain).length)
  })

  test('unexpected', async () => {
    const hook = new FailHook()
    const client = new DigitaloceanSDK({ feature: { test: { active: true } }, extend: [hook] })
    await assert.rejects(client.Image().list(), /hook failed/)
    assert(0 < hook.unexpected)

    const fired = hook.unexpected
    assert.strictEqual(await client.Image().list(undefined, { throw: false }), undefined)
    assert(fired < hook.unexpected)
  })

  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = DigitaloceanSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.Image().list({"page":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.DIGITALOCEAN_TEST_LIVE
    for (const op of ['create', 'list', 'update', 'load', 'remove']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'image.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"created_at":{"a":true,"fo":"date-time","h":"Created At","n":"created_at","r":false,"sh":"A time value given in ISO8601 combined date and time format that represents when the image was created.","t":"`$STRING`","key$":"created_at","index$":0},"description":{"a":true,"h":"Description","n":"description","r":false,"sh":"An optional free-form text field to describe an image.","t":"`$STRING`","key$":"description","index$":1},"distribution":{"a":true,"h":"Distribution","n":"distribution","r":false,"sh":"The name of a custom image's distribution.","t":"`$STRING`","key$":"distribution","index$":2},"error_message":{"a":true,"h":"Error Message","n":"error_message","r":false,"sh":"A string containing information about errors that may occur when importing a custom image.","t":"`$STRING`","key$":"error_message","index$":3},"id":{"a":true,"h":"Id","n":"id","r":false,"ro":true,"sh":"A unique number that can be used to identify and reference a specific image.","t":"`$INTEGER`","key$":"id","index$":4},"min_disk_size":{"a":true,"h":"Min Disk Size","n":"min_disk_size","r":false,"sh":"The minimum disk size in GB required for a Droplet to use this image.","t":"`$INTEGER`","key$":"min_disk_size","index$":5},"name":{"a":true,"h":"Name","n":"name","op":{"create":{"req":true,"type":"`$STRING`"}},"r":false,"sh":"The display name that has been given to an image.","t":"`$STRING`","key$":"name","index$":6},"public":{"a":true,"h":"Public","n":"public","r":false,"sh":"This is a boolean value that indicates whether the image in question is public or not.","t":"`$BOOLEAN`","key$":"public","index$":7},"region":{"a":true,"h":"Region","n":"region","r":true,"sh":"The slug identifier for the region where the resource will initially be available.","t":"`$STRING`","key$":"region","index$":8},"regions":{"a":true,"h":"Regions","n":"regions","r":false,"sh":"This attribute is an array of the regions that the image is available in.","t":"`$ARRAY`","key$":"regions","index$":9},"size_gigabytes":{"a":true,"fo":"float","h":"Size Gigabytes","n":"size_gigabytes","r":false,"sh":"The size of the image in gigabytes.","t":"`$NUMBER`","key$":"size_gigabytes","index$":10},"slug":{"a":true,"h":"Slug","n":"slug","r":false,"sh":"A uniquely identifying string that is associated with each of the DigitalOcean-provided public images.","t":"`$STRING`","key$":"slug","index$":11},"status":{"a":true,"h":"Status","n":"status","r":false,"sh":"A status string indicating the state of a custom image.","t":"`$STRING`","key$":"status","index$":12},"tags":{"a":true,"h":"Tags","n":"tags","r":false,"sh":"A flat array of tag names as strings to be applied to the resource.","t":"`$ARRAY`","key$":"tags","index$":13},"type":{"a":true,"h":"Type","n":"type","r":false,"sh":"Describes the kind of image.","t":"`$STRING`","key$":"type","index$":14},"url":{"a":true,"h":"Url","n":"url","r":true,"sh":"A URL from which the custom Linux virtual machine image may be retrieved.","t":"`$STRING`","key$":"url","index$":15}},"id":{"field":"id","name":"id"},"name":"image","op":{"create":{"input":"data","name":"create","points":[{"a":true,"co":{"id":"POST /v2/images/{image_id}/account_transfer","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":62137902,"k":"param","n":"id","or":"image_id","r":true,"t":"`$INTEGER`","index$":0}]},"k":"http","m":"POST","o":"/v2/images/{image_id}/account_transfer","q":{"$action":"account_transfer","exist":["id"]},"r":{"param":{"image_id":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v2"},{"lit":"images"},{"var":"id"},{"lit":"account_transfer"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0},{"a":true,"co":{"id":"POST /v2/images/{image_id}/account_transfer/accept","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":62137902,"k":"param","n":"id","or":"image_id","r":true,"t":"`$INTEGER`","index$":0}]},"k":"http","m":"POST","o":"/v2/images/{image_id}/account_transfer/accept","q":{"$action":"account_transfer_accept","exist":["id"]},"r":{"param":{"image_id":"id"}},"s":[{"lit":"v2"},{"lit":"images"},{"var":"id"},{"lit":"account_transfer"},{"lit":"accept"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":1},{"a":true,"co":{"id":"POST /v2/images/{image_id}/account_transfer/cancel","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":62137902,"k":"param","n":"id","or":"image_id","r":true,"t":"`$INTEGER`","index$":0}]},"k":"http","m":"POST","o":"/v2/images/{image_id}/account_transfer/cancel","q":{"$action":"account_transfer_cancel","exist":["id"]},"r":{"param":{"image_id":"id"}},"s":[{"lit":"v2"},{"lit":"images"},{"var":"id"},{"lit":"account_transfer"},{"lit":"cancel"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":2},{"a":true,"co":{"id":"POST /v2/images/{image_id}/account_transfer/decline","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":62137902,"k":"param","n":"id","or":"image_id","r":true,"t":"`$INTEGER`","index$":0}]},"k":"http","m":"POST","o":"/v2/images/{image_id}/account_transfer/decline","q":{"$action":"account_transfer_decline","exist":["id"]},"r":{"param":{"image_id":"id"}},"s":[{"lit":"v2"},{"lit":"images"},{"var":"id"},{"lit":"account_transfer"},{"lit":"decline"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":3},{"a":true,"co":{"id":"POST /v1/images/generations","source":"openapi3","version":2},"g":{},"k":"http","m":"POST","o":"/v1/images/generations","q":{"$action":"generation"},"r":{},"rs":{"alternatives":[{"kind":"raw","media":"text/event-stream"}],"kind":"json","media":"application/json"},"s":[{"lit":"v1"},{"lit":"images"},{"lit":"generations"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":4},{"a":true,"co":{"id":"POST /v2/images","source":"openapi3","version":2},"g":{},"k":"http","m":"POST","o":"/v2/images","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v2"},{"lit":"images"}],"t":{"req":"`reqdata`","res":"`body.image`"},"index$":5}],"key$":"create"},"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /v2/images","source":"openapi3","version":2},"g":{"query":[{"a":true,"ex":1,"k":"query","n":"page","or":"page","r":false,"t":"`$INTEGER`","index$":0},{"a":true,"ex":2,"k":"query","n":"per_page","or":"per_page","r":false,"t":"`$INTEGER`","index$":1},{"a":true,"ex":true,"k":"query","n":"private","or":"private","r":false,"t":"`$BOOLEAN`","index$":2},{"a":true,"ex":"base-image","k":"query","n":"tag_name","or":"tag_name","r":false,"t":"`$STRING`","index$":3},{"a":true,"ex":"distribution","k":"query","n":"type","or":"type","r":false,"t":"`$STRING`","index$":4}]},"k":"http","m":"GET","o":"/v2/images","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v2"},{"lit":"images"}],"t":{"req":"`reqdata`","res":"`body.images`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /v2/images/{image_id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":62137902,"k":"param","n":"id","or":"image_id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/v2/images/{image_id}","q":{"exist":["id"]},"r":{"param":{"image_id":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v2"},{"lit":"images"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body.image`"},"index$":0}],"key$":"load"},"remove":{"input":"data","name":"remove","points":[{"a":true,"co":{"id":"DELETE /v2/images/{image_id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":62137902,"k":"param","n":"id","or":"image_id","r":true,"t":"`$INTEGER`","index$":0}]},"k":"http","m":"DELETE","o":"/v2/images/{image_id}","q":{"exist":["id"]},"r":{"param":{"image_id":"id"}},"s":[{"lit":"v2"},{"lit":"images"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"remove"},"update":{"input":"data","name":"update","points":[{"a":true,"co":{"id":"PUT /v2/images/{image_id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":62137902,"k":"param","n":"id","or":"image_id","r":true,"t":"`$INTEGER`","index$":0}]},"k":"http","m":"PUT","o":"/v2/images/{image_id}","q":{"exist":["id"]},"r":{"param":{"image_id":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v2"},{"lit":"images"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body.image`"},"index$":0}],"key$":"update"}},"relations":{"ancestors":[]},"key$":"image","name__orig":"image","Name":"Image","name_":"image","name-":"image","NAME":"IMAGE","index$":153}, {"active":true,"entity":"image","key$":"BasicImageFlow","kind":"basic","name":"BasicImageFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"image_ref01"},"m":{},"o":"create","s":[],"v":[],"index$":0},{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"image_ref01"}}],"index$":1},{"a":true,"d":{},"i":{"ref":"image_ref01","srcdatavar":"image_ref01_data","suffix":"_up0","textfield":"created_at"},"m":{},"o":"update","s":[{"apply":"TextFieldMark","def":{"mark":"Mark01-image_ref01"}}],"v":[],"index$":2},{"a":true,"d":{},"i":{"ref":"image_ref01","srcdatavar":"image_ref01_data","suffix":"_dt0"},"m":{"id":"image01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-image_ref01"}}],"index$":3},{"a":true,"d":{},"i":{"ref":"image_ref01","suffix":"_rm0"},"m":{"id":"image01"},"o":"remove","s":[],"v":[],"index$":4},{"a":true,"d":{},"i":{"suffix":"_rt0"},"m":{},"o":"list","s":[],"v":[{"apply":"ItemNotExists","def":{"ref":"image_ref01"}}],"index$":5}]}, 'Image', {"POST /v2/images/{image_id}/account_transfer":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"oneOf":[{"title":"Transfer To Email","type":"object","properties":{"recipient_email":{"type":"string","example":"alice@example.com","description":"The email address of the user account that the image will be transferred to."}},"required":["recipient_email"]},{"title":"Transfer To Team","type":"object","properties":{"recipient_uuid":{"type":"string","example":"4f6c71e2-1e90-4762-9fee-6cc4a0a9f2cf","description":"The UUID of the team that the image will be transferred to."}},"required":["recipient_uuid"]}],"x-ref":"#/components/schemas/images_post_account_transfer_create"}}}},"parameters":[{"in":"path","name":"image_id","description":"A unique number that can be used to identify and reference a specific image.","required":true,"schema":{"type":"integer"},"example":62137902,"x-ref":"#/components/parameters/image_id","index$":0}]},"POST /v2/images/{image_id}/account_transfer/accept":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"allOf":[{"title":"Transfer ID","type":"object","properties":{"transfer_id":{"type":"integer","description":"A unique number that used to identify and reference an image account transfer.","example":3164444}},"required":["transfer_id"]},{"title":"Recipient Team UUID","type":"object","properties":{"recipient_uuid":{"type":"string","description":"The UUID of the team that the image will be transferred to.","example":"4f6c71e2-1e90-4762-9fee-6cc4a0a9f2cf"}},"required":["recipient_uuid"]}],"x-ref":"#/components/schemas/images_post_account_transfer_accept"}}}},"parameters":[{"in":"path","name":"image_id","description":"A unique number that can be used to identify and reference a specific image.","required":true,"schema":{"type":"integer"},"example":62137902,"x-ref":"#/components/parameters/image_id","index$":0}]},"POST /v2/images/{image_id}/account_transfer/cancel":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","properties":{"transfer_id":{"type":"integer","description":"A unique number that used to identify and reference an image account transfer.","example":3164444}},"required":["transfer_id"],"x-ref":"#/components/schemas/images_post_account_transfer_cancel"}}}},"parameters":[{"in":"path","name":"image_id","description":"A unique number that can be used to identify and reference a specific image.","required":true,"schema":{"type":"integer"},"example":62137902,"x-ref":"#/components/parameters/image_id","index$":0}]},"POST /v2/images/{image_id}/account_transfer/decline":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","properties":{"transfer_id":{"type":"integer","description":"A unique number that used to identify and reference an image account transfer.","example":3164444}},"required":["transfer_id"],"x-ref":"#/components/schemas/images_post_account_transfer_decline"}}}},"parameters":[{"in":"path","name":"image_id","description":"A unique number that can be used to identify and reference a specific image.","required":true,"schema":{"type":"integer"},"example":62137902,"x-ref":"#/components/parameters/image_id","index$":0}]},"POST /v1/images/generations":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","description":"Request body for image generation.","required":["prompt","model","n"],"properties":{"prompt":{"type":"string","minLength":1,"description":"A text description of the desired image(s). Supports up to 32,000 characters and provides automatic prompt optimization for best results.\n","example":"A cute baby sea otter floating on its back in calm blue water"},"model":{"type":"string","description":"The model to use for image generation.\n","example":"openai-gpt-image-1"},"moderation":{"type":"string","nullable":true,"description":"The moderation setting for the image generation. Supported values: low, auto.\n","example":"auto"},"background":{"type":"string","nullable":true,"description":"The background setting for the image generation. Supported values: transparent, opaque, auto.\n","example":"auto"},"output_format":{"type":"string","nullable":true,"description":"The output format for the image generation. Supported values: png, webp, jpeg.\n","example":"png"},"output_compression":{"type":"integer","minimum":0,"nullable":true,"description":"The output compression level for the image generation (0-100).\n","example":100},"n":{"type":"integer","minimum":1,"maximum":10,"description":"The number of images to generate. Must be between 1 and 10.\n","example":1},"quality":{"type":"string","nullable":true,"description":"The quality of the image that will be generated. Supported values: auto, high, medium, low.\n","example":"auto"},"size":{"type":"string","description":"The size of the generated images. GPT-IMAGE-1 supports: auto (automatically select best size), 1536x1024 (landscape), 1024x1536 (portrait).\n","enum":["auto","1536x1024","1024x1536"],"example":"auto"},"stream":{"type":"boolean","default":false,"nullable":true,"description":"If set to true, partial image data will be streamed as the image is being generated. The response will be sent as server-sent events with partial image chunks. When stream is true, partial_images must be greater than 0.\n","example":false},"partial_images":{"type":"integer","minimum":0,"nullable":true,"description":"The number of partial image chunks to return during streaming generation. Defaults to 0. When stream=true, this must be greater than 0 to receive progressive updates of the image as it is being generated.\n","example":1},"user":{"type":"string","maxLength":256,"nullable":true,"description":"A unique identifier representing your end-user, which can help DigitalOcean to monitor and detect abuse.\n","example":"user-1234"}},"x-ref":"#/components/schemas/create_image_request"}}}},"parameters":[]},"POST /v2/images":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","allOf":[{"type":"object","properties":{"name":{"type":"string","description":"The display name that has been given to an image.  This is what is shown in the control panel and is generally a descriptive title for the image in question.","example":"Nifty New Snapshot","x-ref":"#/components/schemas/image_name","key$":"name"},"distribution":{"type":"string","description":"The name of a custom image's distribution. Currently, the valid values are  `Arch Linux`, `CentOS`, `CoreOS`, `Debian`, `Fedora`, `Fedora Atomic`,  `FreeBSD`, `Gentoo`, `openSUSE`, `RancherOS`, `Rocky Linux`, `Ubuntu`, and `Unknown`.  Any other value will be accepted but ignored, and `Unknown` will be used in its place.","enum":["Arch Linux","CentOS","CoreOS","Debian","Fedora","Fedora Atomic","FreeBSD","Gentoo","openSUSE","RancherOS","Rocky Linux","Ubuntu","Unknown"],"example":"Ubuntu","x-ref":"#/components/schemas/distribution","key$":"distribution"},"description":{"type":"string","description":"An optional free-form text field to describe an image.","example":" ","x-ref":"#/components/schemas/image_description","key$":"description"}},"x-ref":"#/components/schemas/image_update"},{"properties":{"url":{"type":"string","description":"A URL from which the custom Linux virtual machine image may be retrieved.  The image it points to must be in the raw, qcow2, vhdx, vdi, or vmdk format.  It may be compressed using gzip or bzip2 and must be smaller than 100 GB after being decompressed.","example":"http://cloud-images.ubuntu.com/minimal/releases/bionic/release/ubuntu-18.04-minimal-cloudimg-amd64.img","key$":"url"},"region":{"type":"string","description":"The slug identifier for the region where the resource will initially be  available.","enum":["ams1","ams2","ams3","blr1","fra1","lon1","nyc1","nyc2","nyc3","sfo1","sfo2","sfo3","sgp1","tor1","syd1"],"example":"nyc3","x-ref":"#/components/schemas/region_slug","key$":"region"},"tags":{"type":"array","items":{"type":"string"},"nullable":true,"description":"A flat array of tag names as strings to be applied to the resource. Tag names may be for either existing or new tags. <br><br>Requires `tag:create` scope.","example":["base-image","prod"],"x-ref":"#/components/schemas/tags_array","key$":"tags"}}}],"required":["name","url","region"],"example":{"name":"ubuntu-18.04-minimal","url":"http://cloud-images.ubuntu.com/minimal/releases/bionic/release/ubuntu-18.04-minimal-cloudimg-amd64.img","distribution":"Ubuntu","region":"nyc3","description":"Cloud-optimized image w/ small footprint","tags":["base-image","prod"]},"x-ref":"#/components/schemas/image_new_custom","index$":1}}}},"parameters":[]},"GET /v2/images":{"protocol":"http","parameters":[{"in":"query","name":"type","description":"Filters results based on image type which can be either `application` or `distribution`.","required":false,"schema":{"type":"string","enum":["application","distribution"]},"example":"distribution","x-ref":"#/components/parameters/type","index$":0},{"in":"query","name":"private","description":"Used to filter only user images.","required":false,"schema":{"type":"boolean"},"example":true,"x-ref":"#/components/parameters/private","index$":1},{"in":"query","name":"tag_name","description":"Used to filter images by a specific tag.","required":false,"schema":{"type":"string"},"example":"base-image","x-ref":"#/components/parameters/tag","index$":2},{"in":"query","name":"per_page","required":false,"description":"Number of items returned per page","schema":{"type":"integer","minimum":1,"default":20,"maximum":200},"example":2,"x-ref":"#/components/parameters/parameters_per_page","index$":3},{"in":"query","name":"page","required":false,"description":"Which 'page' of paginated results to return.","schema":{"type":"integer","minimum":1,"default":1},"example":1,"x-ref":"#/components/parameters/page","index$":4}]},"GET /v2/images/{image_id}":{"protocol":"http","parameters":[{"in":"path","name":"image_id","description":"A unique number (id) or string (slug) used to identify and reference a\nspecific image.\n\n**Public** images can be identified by image `id` or `slug`.\n\n**Private** images *must* be identified by image `id`.\n","required":true,"schema":{"anyOf":[{"type":"integer"},{"type":"string"}]},"examples":{"byId":{"summary":"Retrieve a public or private image by id","value":62137902},"bySlug":{"summary":"Retrieve a public image by slug","value":"ubuntu-16-04-x64"}},"index$":0}]},"DELETE /v2/images/{image_id}":{"protocol":"http","parameters":[{"in":"path","name":"image_id","description":"A unique number that can be used to identify and reference a specific image.","required":true,"schema":{"type":"integer"},"example":62137902,"x-ref":"#/components/parameters/image_id","index$":0}]},"PUT /v2/images/{image_id}":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","properties":{"name":{"type":"string","description":"The display name that has been given to an image.  This is what is shown in the control panel and is generally a descriptive title for the image in question.","example":"Nifty New Snapshot","x-ref":"#/components/schemas/image_name","key$":"name"},"distribution":{"type":"string","description":"The name of a custom image's distribution. Currently, the valid values are  `Arch Linux`, `CentOS`, `CoreOS`, `Debian`, `Fedora`, `Fedora Atomic`,  `FreeBSD`, `Gentoo`, `openSUSE`, `RancherOS`, `Rocky Linux`, `Ubuntu`, and `Unknown`.  Any other value will be accepted but ignored, and `Unknown` will be used in its place.","enum":["Arch Linux","CentOS","CoreOS","Debian","Fedora","Fedora Atomic","FreeBSD","Gentoo","openSUSE","RancherOS","Rocky Linux","Ubuntu","Unknown"],"example":"Ubuntu","x-ref":"#/components/schemas/distribution","key$":"distribution"},"description":{"type":"string","description":"An optional free-form text field to describe an image.","example":" ","x-ref":"#/components/schemas/image_description","key$":"description"}},"x-ref":"#/components/schemas/image_update","index$":1}}}},"parameters":[{"in":"path","name":"image_id","description":"A unique number that can be used to identify and reference a specific image.","required":true,"schema":{"type":"integer"},"example":62137902,"x-ref":"#/components/parameters/image_id","index$":0}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const image_ref01_ent = client.Image()
    let image_ref01_data = setup.data.new.image['image_ref01']

    image_ref01_data = (await image_ref01_ent.create(image_ref01_data)).data()
    assert(null != image_ref01_data.id)


    // LIST
    const image_ref01_match: any = {}

    const image_ref01_list = (await image_ref01_ent.list(image_ref01_match)).map((e: any) => e.data())

    assert(!isempty(select(image_ref01_list, { id: image_ref01_data.id })))


    // UPDATE
    const image_ref01_data_up0: any = {}
    image_ref01_data_up0.id = image_ref01_data.id

    const image_ref01_markdef_up0 = { name: 'created_at', value: 'Mark01-image_ref01_' + setup.now }
    ;(image_ref01_data_up0 as any)[image_ref01_markdef_up0.name] = image_ref01_markdef_up0.value

    const image_ref01_resdata_up0 = (await image_ref01_ent.update(image_ref01_data_up0)).data()
    assert(image_ref01_resdata_up0.id === image_ref01_data_up0.id)

    assert((image_ref01_resdata_up0 as any)[image_ref01_markdef_up0.name] === image_ref01_markdef_up0.value)


    // LOAD
    const image_ref01_match_dt0: any = {}
    image_ref01_match_dt0.id = image_ref01_data.id
    const image_ref01_data_dt0 = (await image_ref01_ent.load(image_ref01_match_dt0)).data()
    assert(image_ref01_data_dt0.id === image_ref01_data.id)


    // REMOVE
    const image_ref01_match_rm0: any = { id: image_ref01_data.id }
    await image_ref01_ent.remove(image_ref01_match_rm0)
  

    // LIST
    const image_ref01_match_rt0: any = {}

    const image_ref01_list_rt0 = (await image_ref01_ent.list(image_ref01_match_rt0)).map((e: any) => e.data())

    assert(isempty(select(image_ref01_list_rt0, { id: image_ref01_data.id })))


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
      '../../../../.sdk/test/entity/image/ImageTestData.json')

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
    ['image01','image02','image03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'DIGITALOCEAN_TEST_IMAGE_ENTID': idmap,
    'DIGITALOCEAN_TEST_LIVE': 'FALSE',
    'DIGITALOCEAN_TEST_EXPLAIN': 'FALSE',
    'DIGITALOCEAN_APIKEY': '',
  })

  idmap = env['DIGITALOCEAN_TEST_IMAGE_ENTID']

  const live = 'TRUE' === env.DIGITALOCEAN_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['DIGITALOCEAN_TEST_IMAGE_ENTID']
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
  
