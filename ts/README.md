# Digitalocean TypeScript SDK



The TypeScript SDK for the Digitalocean API — a type-safe, entity-oriented client with full async/await support.

The API is exposed as capitalised, semantic **Entities** — e.g.
`client.AccessPoint()` — each with a small set of operations (`list`, `load`, `create`, `update`, `patch`, `remove`)
instead of raw URL paths and query parameters. This keeps the surface
predictable and low-friction for both humans and AI agents.

> Also generated from this model: `py` — see
> the [top-level README](../README.md).


## Install
This package is not yet published to npm. Install it from the GitHub
release tag (`ts/vX.Y.Z`, see [Tags](https://github.com/pratik-mahalle/digitalocean-sdk/tags)), or from a
clone, which carries the compiled `dist/`:

```bash
git clone https://github.com/pratik-mahalle/digitalocean-sdk
npm install ./digitalocean-sdk/ts
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```ts
import { DigitaloceanSDK } from '@voxgig-sdk/digitalocean-sdk'

const client = new DigitaloceanSDK({
  apikey: process.env.DIGITALOCEAN_APIKEY,
})
```

### 2. List accesspoint records

`list()` resolves to an array of AccessPoint ENTITIES — every operation
resolves to entities, not raw records. Iterate them directly, and call
`.data()` on one for the record it holds:

```ts
const accesspoints = await client.AccessPoint().list({ share_id: "example" })

for (const accesspoint of accesspoints) {
  console.log(accesspoint)
}
```

### 3. Load an addon

AddOn is nested under resource_uuid, so provide the `resource_uuid`.
`load()` returns the entity directly and throws on failure:

```ts
try {
  const addon = await client.AddOn().load({
    resource_uuid: 'example_resource_uuid',
  })
  console.log(addon)
} catch (err) {
  console.error('load failed:', err)
}
```

### 4. Create, update, and remove

```ts
// Create — returns the created AccessPoint ENTITY (.data() for the record)
const created = await client.AccessPoint().create({
  share_id: 'example_share_id',
  access_policy: {},
  created_at: 'example_created_at',
  id: 'example_id',
  is_default: true,
  name: 'example_name',
  path: 'example_path',
  status: 'example_status',
  updated_at: 'example_updated_at',
})

// Remove
await client.AccessPoint().remove({
  id: created.data().id!,
})
```


## Error handling

Entity operations reject on failure, so wrap them in `try` / `catch`:

```ts
try {
  const appsregions = await client.AppsRegion().list()
  console.log(appsregions)
} catch (err) {
  console.error('list failed:', err)
}
```

The low-level `direct()` method does **not** throw — it returns the
result envelope. Branch on `ok`; on failure `status` holds the HTTP status
(for error responses) and `err` holds the error:

```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example_id' },
})

if (!result.ok) {
  console.error('request failed:', result.status, result.err)
}
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example' },
})

if (result.ok) {
  console.log(result.status)  // 200
  console.log(result.data)    // response body
}
```

### Prepare a request without sending it

```ts
const fetchdef = await client.prepare({
  path: '/api/resource/{id}',
  method: 'DELETE',
  params: { id: 'example' },
})

// Inspect before sending
console.log(fetchdef.url)
console.log(fetchdef.method)
console.log(fetchdef.headers)
```

### Use test mode

Create a mock client for unit testing — no server required:

```ts
const client = DigitaloceanSDK.test()

const appsregion = await client.AppsRegion().list()
// appsregion is the entity, populated with mock response data
// — call appsregion.data() for the record itself
console.log(appsregion)
```

You can also use the instance method:

```ts
const client = new DigitaloceanSDK({ apikey: '...' })
const testClient = client.tester()
```

### Retain entity state across calls

Entity instances remember their last match and data:

```ts
const entity = client.AppsRegion()

// First call runs the operation and stores its result
await entity.list()

// Subsequent calls reuse the stored state
const data = entity.data()
console.log(data)
```

### Add custom middleware

Pass features via the `extend` option:

```ts
const logger = {
  hooks: {
    PreRequest: (ctx: any) => {
      console.log('Requesting:', ctx.spec.method, ctx.spec.path)
    },
    PreResponse: (ctx: any) => {
      console.log('Status:', ctx.out.request?.status)
    },
  },
}

const client = new DigitaloceanSDK({
  apikey: '...',
  extend: [logger],
})
```

### Run live tests

Create a `.env.local` file at the project root:

```
DIGITALOCEAN_TEST_LIVE=TRUE
DIGITALOCEAN_APIKEY=<your-key>
```

Then run:

```bash
cd ts && npm test
```

Live entity tests continue independent operations after errors and attempt
supported cleanup. Their final result reports failures and missing prerequisites
after the remaining work completes. The model and test inputs determine which
API operations the generated scenarios cover.


## Reference

### DigitaloceanSDK

#### Constructor

```ts
new DigitaloceanSDK(options?: {
  apikey?: string
  base?: string
  prefix?: string
  suffix?: string
  feature?: Record<string, { active: boolean }>
  extend?: Feature[]
})
```

| Option | Type | Description |
| --- | --- | --- |
| `apikey` | `string` | API key for authentication. |
| `base` | `string` | Base URL of the API server. |
| `prefix` | `string` | URL path prefix prepended to all requests. |
| `suffix` | `string` | URL path suffix appended to all requests. |
| `feature` | `object` | Feature activation flags (e.g. `{ test: { active: true } }`). |
| `extend` | `Feature[]` | Additional feature instances to load. |

#### Methods

| Method | Returns | Description |
| --- | --- | --- |
| `options()` | `object` | Deep copy of current SDK options. |
| `utility()` | `Utility` | Deep copy of the SDK utility object. |
| `prepare(fetchargs?)` | `Promise<FetchDef>` | Build an HTTP request definition without sending it. |
| `direct(fetchargs?)` | `Promise<DirectResult>` | Build and send an HTTP request. |
| `AccessPoint(data?)` | `AccessPointEntity` | Create an AccessPoint entity instance. |
| `Account(data?)` | `AccountEntity` | Create an Account entity instance. |
| `Action(data?)` | `ActionEntity` | Create an Action entity instance. |
| `ActorLimit(data?)` | `ActorLimitEntity` | Create an ActorLimit entity instance. |
| `AddOn(data?)` | `AddOnEntity` | Create an AddOn entity instance. |
| `ApiAgentVersion(data?)` | `ApiAgentVersionEntity` | Create an ApiAgentVersion entity instance. |
| `ApiCreateAgentApiKeyOutput(data?)` | `ApiCreateAgentApiKeyOutputEntity` | Create an ApiCreateAgentApiKeyOutput entity instance. |
| `ApiCreateDataSourceFileUploadPresignedUrlsOutput(data?)` | `ApiCreateDataSourceFileUploadPresignedUrlsOutputEntity` | Create an ApiCreateDataSourceFileUploadPresignedUrlsOutput entity instance. |
| `ApiCreateKnowledgeBaseDataSourceOutput(data?)` | `ApiCreateKnowledgeBaseDataSourceOutputEntity` | Create an ApiCreateKnowledgeBaseDataSourceOutput entity instance. |
| `ApiCreateScenarioSetFromLibraryOutput(data?)` | `ApiCreateScenarioSetFromLibraryOutputEntity` | Create an ApiCreateScenarioSetFromLibraryOutput entity instance. |
| `ApiDeleteAgentApiKeyOutput(data?)` | `ApiDeleteAgentApiKeyOutputEntity` | Create an ApiDeleteAgentApiKeyOutput entity instance. |
| `ApiDeleteAgentOutput(data?)` | `ApiDeleteAgentOutputEntity` | Create an ApiDeleteAgentOutput entity instance. |
| `ApiDeleteAnthropicApiKeyOutput(data?)` | `ApiDeleteAnthropicApiKeyOutputEntity` | Create an ApiDeleteAnthropicApiKeyOutput entity instance. |
| `ApiDeleteCustomEvaluationMetricOutput(data?)` | `ApiDeleteCustomEvaluationMetricOutputEntity` | Create an ApiDeleteCustomEvaluationMetricOutput entity instance. |
| `ApiDeleteCustomModelOutputPublic(data?)` | `ApiDeleteCustomModelOutputPublicEntity` | Create an ApiDeleteCustomModelOutputPublic entity instance. |
| `ApiDeleteEvaluationDatasetOutput(data?)` | `ApiDeleteEvaluationDatasetOutputEntity` | Create an ApiDeleteEvaluationDatasetOutput entity instance. |
| `ApiDeleteKnowledgeBaseDataSourceOutput(data?)` | `ApiDeleteKnowledgeBaseDataSourceOutputEntity` | Create an ApiDeleteKnowledgeBaseDataSourceOutput entity instance. |
| `ApiDeleteKnowledgeBaseOutput(data?)` | `ApiDeleteKnowledgeBaseOutputEntity` | Create an ApiDeleteKnowledgeBaseOutput entity instance. |
| `ApiDeleteModelApiKeyOutput(data?)` | `ApiDeleteModelApiKeyOutputEntity` | Create an ApiDeleteModelApiKeyOutput entity instance. |
| `ApiDeleteModelEvaluationPresetOutput(data?)` | `ApiDeleteModelEvaluationPresetOutputEntity` | Create an ApiDeleteModelEvaluationPresetOutput entity instance. |
| `ApiDeleteModelEvaluationRunOutputPublic(data?)` | `ApiDeleteModelEvaluationRunOutputPublicEntity` | Create an ApiDeleteModelEvaluationRunOutputPublic entity instance. |
| `ApiDeleteModelRouterOutput(data?)` | `ApiDeleteModelRouterOutputEntity` | Create an ApiDeleteModelRouterOutput entity instance. |
| `ApiDeleteOpenAiapiKeyOutput(data?)` | `ApiDeleteOpenAiapiKeyOutputEntity` | Create an ApiDeleteOpenAiapiKeyOutput entity instance. |
| `ApiDeleteScenarioSetOutput(data?)` | `ApiDeleteScenarioSetOutputEntity` | Create an ApiDeleteScenarioSetOutput entity instance. |
| `ApiDeleteScheduledIndexingOutput(data?)` | `ApiDeleteScheduledIndexingOutputEntity` | Create an ApiDeleteScheduledIndexingOutput entity instance. |
| `ApiDeleteSimulationRunOutput(data?)` | `ApiDeleteSimulationRunOutputEntity` | Create an ApiDeleteSimulationRunOutput entity instance. |
| `ApiDeleteWorkspaceOutput(data?)` | `ApiDeleteWorkspaceOutputEntity` | Create an ApiDeleteWorkspaceOutput entity instance. |
| `ApiDropboxOauth2GetTokensOutput(data?)` | `ApiDropboxOauth2GetTokensOutputEntity` | Create an ApiDropboxOauth2GetTokensOutput entity instance. |
| `ApiGenerateOauth2UrlOutput(data?)` | `ApiGenerateOauth2UrlOutputEntity` | Create an ApiGenerateOauth2UrlOutput entity instance. |
| `ApiGenerateScenarioSetOutput(data?)` | `ApiGenerateScenarioSetOutputEntity` | Create an ApiGenerateScenarioSetOutput entity instance. |
| `ApiGetAgentOutput(data?)` | `ApiGetAgentOutputEntity` | Create an ApiGetAgentOutput entity instance. |
| `ApiGetAgentUsageOutput(data?)` | `ApiGetAgentUsageOutputEntity` | Create an ApiGetAgentUsageOutput entity instance. |
| `ApiGetAnthropicApiKeyOutput(data?)` | `ApiGetAnthropicApiKeyOutputEntity` | Create an ApiGetAnthropicApiKeyOutput entity instance. |
| `ApiGetChildrenOutput(data?)` | `ApiGetChildrenOutputEntity` | Create an ApiGetChildrenOutput entity instance. |
| `ApiGetCustomModelOutputPublic(data?)` | `ApiGetCustomModelOutputPublicEntity` | Create an ApiGetCustomModelOutputPublic entity instance. |
| `ApiGetEvaluationDatasetDownloadUrlOutput(data?)` | `ApiGetEvaluationDatasetDownloadUrlOutputEntity` | Create an ApiGetEvaluationDatasetDownloadUrlOutput entity instance. |
| `ApiGetEvaluationRunOutput(data?)` | `ApiGetEvaluationRunOutputEntity` | Create an ApiGetEvaluationRunOutput entity instance. |
| `ApiGetEvaluationRunResultsOutput(data?)` | `ApiGetEvaluationRunResultsOutputEntity` | Create an ApiGetEvaluationRunResultsOutput entity instance. |
| `ApiGetEvaluationTestCaseOutput(data?)` | `ApiGetEvaluationTestCaseOutputEntity` | Create an ApiGetEvaluationTestCaseOutput entity instance. |
| `ApiGetIndexingJobDetailsSignedUrlOutput(data?)` | `ApiGetIndexingJobDetailsSignedUrlOutputEntity` | Create an ApiGetIndexingJobDetailsSignedUrlOutput entity instance. |
| `ApiGetKnowledgeBaseIndexingJobOutput(data?)` | `ApiGetKnowledgeBaseIndexingJobOutputEntity` | Create an ApiGetKnowledgeBaseIndexingJobOutput entity instance. |
| `ApiGetKnowledgeBaseOutput(data?)` | `ApiGetKnowledgeBaseOutputEntity` | Create an ApiGetKnowledgeBaseOutput entity instance. |
| `ApiGetModelEvaluationRunOutput(data?)` | `ApiGetModelEvaluationRunOutputEntity` | Create an ApiGetModelEvaluationRunOutput entity instance. |
| `ApiGetModelEvaluationRunResultsDownloadUrlOutput(data?)` | `ApiGetModelEvaluationRunResultsDownloadUrlOutputEntity` | Create an ApiGetModelEvaluationRunResultsDownloadUrlOutput entity instance. |
| `ApiGetModelRouterOutput(data?)` | `ApiGetModelRouterOutputEntity` | Create an ApiGetModelRouterOutput entity instance. |
| `ApiGetOpenAiapiKeyOutput(data?)` | `ApiGetOpenAiapiKeyOutputEntity` | Create an ApiGetOpenAiapiKeyOutput entity instance. |
| `ApiGetScenarioSetDownloadUrlOutput(data?)` | `ApiGetScenarioSetDownloadUrlOutputEntity` | Create an ApiGetScenarioSetDownloadUrlOutput entity instance. |
| `ApiGetScenarioSetOutput(data?)` | `ApiGetScenarioSetOutputEntity` | Create an ApiGetScenarioSetOutput entity instance. |
| `ApiGetScheduledIndexingOutput(data?)` | `ApiGetScheduledIndexingOutputEntity` | Create an ApiGetScheduledIndexingOutput entity instance. |
| `ApiGetSimulationJourneyTrajectoryUrlOutput(data?)` | `ApiGetSimulationJourneyTrajectoryUrlOutputEntity` | Create an ApiGetSimulationJourneyTrajectoryUrlOutput entity instance. |
| `ApiGetSimulationRunOutput(data?)` | `ApiGetSimulationRunOutputEntity` | Create an ApiGetSimulationRunOutput entity instance. |
| `ApiGetWorkspaceOutput(data?)` | `ApiGetWorkspaceOutputEntity` | Create an ApiGetWorkspaceOutput entity instance. |
| `ApiImportCustomModelOutputPublic(data?)` | `ApiImportCustomModelOutputPublicEntity` | Create an ApiImportCustomModelOutputPublic entity instance. |
| `ApiIndexedDataSource(data?)` | `ApiIndexedDataSourceEntity` | Create an ApiIndexedDataSource entity instance. |
| `ApiLinkAgentFunctionOutput(data?)` | `ApiLinkAgentFunctionOutputEntity` | Create an ApiLinkAgentFunctionOutput entity instance. |
| `ApiLinkAgentGuardrailOutput(data?)` | `ApiLinkAgentGuardrailOutputEntity` | Create an ApiLinkAgentGuardrailOutput entity instance. |
| `ApiLinkAgentOutput(data?)` | `ApiLinkAgentOutputEntity` | Create an ApiLinkAgentOutput entity instance. |
| `ApiLinkKnowledgeBaseOutput(data?)` | `ApiLinkKnowledgeBaseOutputEntity` | Create an ApiLinkKnowledgeBaseOutput entity instance. |
| `ApiListAgentApiKeysOutput(data?)` | `ApiListAgentApiKeysOutputEntity` | Create an ApiListAgentApiKeysOutput entity instance. |
| `ApiListAgentsByAnthropicKeyOutput(data?)` | `ApiListAgentsByAnthropicKeyOutputEntity` | Create an ApiListAgentsByAnthropicKeyOutput entity instance. |
| `ApiListAgentsByOpenAiKeyOutput(data?)` | `ApiListAgentsByOpenAiKeyOutputEntity` | Create an ApiListAgentsByOpenAiKeyOutput entity instance. |
| `ApiListAgentsByWorkspaceOutput(data?)` | `ApiListAgentsByWorkspaceOutputEntity` | Create an ApiListAgentsByWorkspaceOutput entity instance. |
| `ApiListEvaluationMetricsOutput(data?)` | `ApiListEvaluationMetricsOutputEntity` | Create an ApiListEvaluationMetricsOutput entity instance. |
| `ApiListEvaluationRunsByTestCaseOutput(data?)` | `ApiListEvaluationRunsByTestCaseOutputEntity` | Create an ApiListEvaluationRunsByTestCaseOutput entity instance. |
| `ApiListEvaluationTestCasesByWorkspaceOutput(data?)` | `ApiListEvaluationTestCasesByWorkspaceOutputEntity` | Create an ApiListEvaluationTestCasesByWorkspaceOutput entity instance. |
| `ApiListKnowledgeBaseDataSourcesOutput(data?)` | `ApiListKnowledgeBaseDataSourcesOutputEntity` | Create an ApiListKnowledgeBaseDataSourcesOutput entity instance. |
| `ApiListKnowledgeBaseIndexingJobsOutput(data?)` | `ApiListKnowledgeBaseIndexingJobsOutputEntity` | Create an ApiListKnowledgeBaseIndexingJobsOutput entity instance. |
| `ApiListModelEvaluationMetricsOutput(data?)` | `ApiListModelEvaluationMetricsOutputEntity` | Create an ApiListModelEvaluationMetricsOutput entity instance. |
| `ApiListScenarioLibraryOutput(data?)` | `ApiListScenarioLibraryOutputEntity` | Create an ApiListScenarioLibraryOutput entity instance. |
| `ApiListScenariosOutput(data?)` | `ApiListScenariosOutputEntity` | Create an ApiListScenariosOutput entity instance. |
| `ApiListSimulationJourneysOutput(data?)` | `ApiListSimulationJourneysOutputEntity` | Create an ApiListSimulationJourneysOutput entity instance. |
| `ApiModelCatalogCard(data?)` | `ApiModelCatalogCardEntity` | Create an ApiModelCatalogCard entity instance. |
| `ApiModelEvaluationPreset(data?)` | `ApiModelEvaluationPresetEntity` | Create an ApiModelEvaluationPreset entity instance. |
| `ApiModelPublic(data?)` | `ApiModelPublicEntity` | Create an ApiModelPublic entity instance. |
| `ApiModelRouterPreset(data?)` | `ApiModelRouterPresetEntity` | Create an ApiModelRouterPreset entity instance. |
| `ApiModelRouterTaskPreset(data?)` | `ApiModelRouterTaskPresetEntity` | Create an ApiModelRouterTaskPreset entity instance. |
| `ApiMoveAgentsToWorkspaceOutput(data?)` | `ApiMoveAgentsToWorkspaceOutputEntity` | Create an ApiMoveAgentsToWorkspaceOutput entity instance. |
| `ApiPrompt(data?)` | `ApiPromptEntity` | Create an ApiPrompt entity instance. |
| `ApiRollbackToAgentVersionOutput(data?)` | `ApiRollbackToAgentVersionOutputEntity` | Create an ApiRollbackToAgentVersionOutput entity instance. |
| `ApiSimulationJourney(data?)` | `ApiSimulationJourneyEntity` | Create an ApiSimulationJourney entity instance. |
| `ApiSimulationTrajectory(data?)` | `ApiSimulationTrajectoryEntity` | Create an ApiSimulationTrajectory entity instance. |
| `ApiUnlinkAgentFunctionOutput(data?)` | `ApiUnlinkAgentFunctionOutputEntity` | Create an ApiUnlinkAgentFunctionOutput entity instance. |
| `ApiUnlinkAgentGuardrailOutput(data?)` | `ApiUnlinkAgentGuardrailOutputEntity` | Create an ApiUnlinkAgentGuardrailOutput entity instance. |
| `ApiUnlinkAgentOutput(data?)` | `ApiUnlinkAgentOutputEntity` | Create an ApiUnlinkAgentOutput entity instance. |
| `ApiUnlinkKnowledgeBaseOutput(data?)` | `ApiUnlinkKnowledgeBaseOutputEntity` | Create an ApiUnlinkKnowledgeBaseOutput entity instance. |
| `ApiUpdateAgentApiKeyOutput(data?)` | `ApiUpdateAgentApiKeyOutputEntity` | Create an ApiUpdateAgentApiKeyOutput entity instance. |
| `ApiUpdateAgentFunctionOutput(data?)` | `ApiUpdateAgentFunctionOutputEntity` | Create an ApiUpdateAgentFunctionOutput entity instance. |
| `ApiUpdateAgentOutput(data?)` | `ApiUpdateAgentOutputEntity` | Create an ApiUpdateAgentOutput entity instance. |
| `ApiUpdateAnthropicApiKeyOutput(data?)` | `ApiUpdateAnthropicApiKeyOutputEntity` | Create an ApiUpdateAnthropicApiKeyOutput entity instance. |
| `ApiUpdateCustomEvaluationMetricOutput(data?)` | `ApiUpdateCustomEvaluationMetricOutputEntity` | Create an ApiUpdateCustomEvaluationMetricOutput entity instance. |
| `ApiUpdateEvaluationTestCaseOutput(data?)` | `ApiUpdateEvaluationTestCaseOutputEntity` | Create an ApiUpdateEvaluationTestCaseOutput entity instance. |
| `ApiUpdateKnowledgeBaseDataSourceOutput(data?)` | `ApiUpdateKnowledgeBaseDataSourceOutputEntity` | Create an ApiUpdateKnowledgeBaseDataSourceOutput entity instance. |
| `ApiUpdateKnowledgeBaseOutput(data?)` | `ApiUpdateKnowledgeBaseOutputEntity` | Create an ApiUpdateKnowledgeBaseOutput entity instance. |
| `ApiUpdateLinkedAgentOutput(data?)` | `ApiUpdateLinkedAgentOutputEntity` | Create an ApiUpdateLinkedAgentOutput entity instance. |
| `ApiUpdateModelApiKeyOutput(data?)` | `ApiUpdateModelApiKeyOutputEntity` | Create an ApiUpdateModelApiKeyOutput entity instance. |
| `ApiUpdateModelEvaluationRunOutput(data?)` | `ApiUpdateModelEvaluationRunOutputEntity` | Create an ApiUpdateModelEvaluationRunOutput entity instance. |
| `ApiUpdateModelRouterOutput(data?)` | `ApiUpdateModelRouterOutputEntity` | Create an ApiUpdateModelRouterOutput entity instance. |
| `ApiUpdateOpenAiapiKeyOutput(data?)` | `ApiUpdateOpenAiapiKeyOutputEntity` | Create an ApiUpdateOpenAiapiKeyOutput entity instance. |
| `ApiUpdateScenarioSetOutput(data?)` | `ApiUpdateScenarioSetOutputEntity` | Create an ApiUpdateScenarioSetOutput entity instance. |
| `ApiUpdateSimulationRunOutput(data?)` | `ApiUpdateSimulationRunOutputEntity` | Create an ApiUpdateSimulationRunOutput entity instance. |
| `ApiUpdateWorkspaceOutput(data?)` | `ApiUpdateWorkspaceOutputEntity` | Create an ApiUpdateWorkspaceOutput entity instance. |
| `App(data?)` | `AppEntity` | Create an App entity instance. |
| `AppAlert(data?)` | `AppAlertEntity` | Create an AppAlert entity instance. |
| `AppEvent(data?)` | `AppEventEntity` | Create an AppEvent entity instance. |
| `AppHealth(data?)` | `AppHealthEntity` | Create an AppHealth entity instance. |
| `AppInstance(data?)` | `AppInstanceEntity` | Create an AppInstance entity instance. |
| `AppJobInvocation(data?)` | `AppJobInvocationEntity` | Create an AppJobInvocation entity instance. |
| `AppMetricsBandwidthUsage(data?)` | `AppMetricsBandwidthUsageEntity` | Create an AppMetricsBandwidthUsage entity instance. |
| `AppPropose(data?)` | `AppProposeEntity` | Create an AppPropose entity instance. |
| `AppsDeployment(data?)` | `AppsDeploymentEntity` | Create an AppsDeployment entity instance. |
| `AppsGetExec(data?)` | `AppsGetExecEntity` | Create an AppsGetExec entity instance. |
| `AppsGetLog(data?)` | `AppsGetLogEntity` | Create an AppsGetLog entity instance. |
| `AppsInstanceSize(data?)` | `AppsInstanceSizeEntity` | Create an AppsInstanceSize entity instance. |
| `AppsRegion(data?)` | `AppsRegionEntity` | Create an AppsRegion entity instance. |
| `AssociatedKubernetesResource(data?)` | `AssociatedKubernetesResourceEntity` | Create an AssociatedKubernetesResource entity instance. |
| `AssociatedResourceStatus(data?)` | `AssociatedResourceStatusEntity` | Create an AssociatedResourceStatus entity instance. |
| `AsyncInvoke(data?)` | `AsyncInvokeEntity` | Create an AsyncInvoke entity instance. |
| `Balance(data?)` | `BalanceEntity` | Create a Balance entity instance. |
| `Batch(data?)` | `BatchEntity` | Create a Batch entity instance. |
| `BatchFileCreate(data?)` | `BatchFileCreateEntity` | Create a BatchFileCreate entity instance. |
| `BatchInference(data?)` | `BatchInferenceEntity` | Create a BatchInference entity instance. |
| `BatchResult(data?)` | `BatchResultEntity` | Create a BatchResult entity instance. |
| `Billing(data?)` | `BillingEntity` | Create a Billing entity instance. |
| `BlockStorage(data?)` | `BlockStorageEntity` | Create a BlockStorage entity instance. |
| `BlockStorageAction(data?)` | `BlockStorageActionEntity` | Create a BlockStorageAction entity instance. |
| `ByoipPrefix(data?)` | `ByoipPrefixEntity` | Create a ByoipPrefix entity instance. |
| `CdnEndpoint(data?)` | `CdnEndpointEntity` | Create a CdnEndpoint entity instance. |
| `Certificate(data?)` | `CertificateEntity` | Create a Certificate entity instance. |
| `ChatCompletion(data?)` | `ChatCompletionEntity` | Create a ChatCompletion entity instance. |
| `Clusterlint(data?)` | `ClusterlintEntity` | Create a Clusterlint entity instance. |
| `Connection(data?)` | `ConnectionEntity` | Create a Connection entity instance. |
| `ConnectionPool(data?)` | `ConnectionPoolEntity` | Create a ConnectionPool entity instance. |
| `ContainerRegistry(data?)` | `ContainerRegistryEntity` | Create a ContainerRegistry entity instance. |
| `CreateResponse(data?)` | `CreateResponseEntity` | Create a CreateResponse entity instance. |
| `Credential(data?)` | `CredentialEntity` | Create a Credential entity instance. |
| `Database(data?)` | `DatabaseEntity` | Create a Database entity instance. |
| `DedicatedInference(data?)` | `DedicatedInferenceEntity` | Create a DedicatedInference entity instance. |
| `DedicatedInferenceAccelerator(data?)` | `DedicatedInferenceAcceleratorEntity` | Create a DedicatedInferenceAccelerator entity instance. |
| `DedicatedInferenceGpuModelConfig(data?)` | `DedicatedInferenceGpuModelConfigEntity` | Create a DedicatedInferenceGpuModelConfig entity instance. |
| `DedicatedInferenceSize(data?)` | `DedicatedInferenceSizeEntity` | Create a DedicatedInferenceSize entity instance. |
| `DockerCredential(data?)` | `DockerCredentialEntity` | Create a DockerCredential entity instance. |
| `Domain(data?)` | `DomainEntity` | Create a Domain entity instance. |
| `DomainRecord(data?)` | `DomainRecordEntity` | Create a DomainRecord entity instance. |
| `Droplet(data?)` | `DropletEntity` | Create a Droplet entity instance. |
| `DropletAction(data?)` | `DropletActionEntity` | Create a DropletAction entity instance. |
| `DropletAutoscalePool(data?)` | `DropletAutoscalePoolEntity` | Create a DropletAutoscalePool entity instance. |
| `Embedding(data?)` | `EmbeddingEntity` | Create an Embedding entity instance. |
| `Empty(data?)` | `EmptyEntity` | Create an Empty entity instance. |
| `Firewall(data?)` | `FirewallEntity` | Create a Firewall entity instance. |
| `FloatingIp(data?)` | `FloatingIpEntity` | Create a FloatingIp entity instance. |
| `FloatingIpAction(data?)` | `FloatingIpActionEntity` | Create a FloatingIpAction entity instance. |
| `Function(data?)` | `FunctionEntity` | Create a Function entity instance. |
| `GenaiapiRegion(data?)` | `GenaiapiRegionEntity` | Create a GenaiapiRegion entity instance. |
| `Image(data?)` | `ImageEntity` | Create an Image entity instance. |
| `ImageAction(data?)` | `ImageActionEntity` | Create an ImageAction entity instance. |
| `Insight(data?)` | `InsightEntity` | Create an Insight entity instance. |
| `InvoiceSummary(data?)` | `InvoiceSummaryEntity` | Create an InvoiceSummary entity instance. |
| `Kubernete(data?)` | `KuberneteEntity` | Create a Kubernete entity instance. |
| `KubernetesOption(data?)` | `KubernetesOptionEntity` | Create a KubernetesOption entity instance. |
| `ListMcpServerTool(data?)` | `ListMcpServerToolEntity` | Create a ListMcpServerTool entity instance. |
| `ListProvider(data?)` | `ListProviderEntity` | Create a ListProvider entity instance. |
| `ListProviderHealth(data?)` | `ListProviderHealthEntity` | Create a ListProviderHealth entity instance. |
| `ListTool(data?)` | `ListToolEntity` | Create a ListTool entity instance. |
| `ListToolHealth(data?)` | `ListToolHealthEntity` | Create a ListToolHealth entity instance. |
| `ListToolbeltProvider(data?)` | `ListToolbeltProviderEntity` | Create a ListToolbeltProvider entity instance. |
| `ListToolkit(data?)` | `ListToolkitEntity` | Create a ListToolkit entity instance. |
| `LoadBalancer(data?)` | `LoadBalancerEntity` | Create a LoadBalancer entity instance. |
| `LogsSearch(data?)` | `LogsSearchEntity` | Create a LogsSearch entity instance. |
| `Logsink(data?)` | `LogsinkEntity` | Create a Logsink entity instance. |
| `McpServer(data?)` | `McpServerEntity` | Create a McpServer entity instance. |
| `Message(data?)` | `MessageEntity` | Create a Message entity instance. |
| `Metric(data?)` | `MetricEntity` | Create a Metric entity instance. |
| `Model(data?)` | `ModelEntity` | Create a Model entity instance. |
| `Monitoring(data?)` | `MonitoringEntity` | Create a Monitoring entity instance. |
| `N1Click(data?)` | `N1ClickEntity` | Create a N1Click entity instance. |
| `N1ClickApplication(data?)` | `N1ClickApplicationEntity` | Create a N1ClickApplication entity instance. |
| `NeighborId(data?)` | `NeighborIdEntity` | Create a NeighborId entity instance. |
| `Nfs(data?)` | `NfsEntity` | Create a Nfs entity instance. |
| `NfsAction2(data?)` | `NfsAction2Entity` | Create a NfsAction2 entity instance. |
| `NfsSnapshot(data?)` | `NfsSnapshotEntity` | Create a NfsSnapshot entity instance. |
| `OnlineMigration(data?)` | `OnlineMigrationEntity` | Create an OnlineMigration entity instance. |
| `Option(data?)` | `OptionEntity` | Create an Option entity instance. |
| `Organization(data?)` | `OrganizationEntity` | Create an Organization entity instance. |
| `OutputView(data?)` | `OutputViewEntity` | Create an OutputView entity instance. |
| `PartnerNetworkConnect(data?)` | `PartnerNetworkConnectEntity` | Create a PartnerNetworkConnect entity instance. |
| `PrepaymentConfig(data?)` | `PrepaymentConfigEntity` | Create a PrepaymentConfig entity instance. |
| `PrepaymentStatus(data?)` | `PrepaymentStatusEntity` | Create a PrepaymentStatus entity instance. |
| `Project(data?)` | `ProjectEntity` | Create a Project entity instance. |
| `ProjectResource(data?)` | `ProjectResourceEntity` | Create a ProjectResource entity instance. |
| `PromQuery(data?)` | `PromQueryEntity` | Create a PromQuery entity instance. |
| `PromQueryRange(data?)` | `PromQueryRangeEntity` | Create a PromQueryRange entity instance. |
| `PromSeries(data?)` | `PromSeriesEntity` | Create a PromSeries entity instance. |
| `PromStringList(data?)` | `PromStringListEntity` | Create a PromStringList entity instance. |
| `Region(data?)` | `RegionEntity` | Create a Region entity instance. |
| `ReservedIPv6(data?)` | `ReservedIPv6Entity` | Create a ReservedIPv6 entity instance. |
| `ReservedIPv6Action(data?)` | `ReservedIPv6ActionEntity` | Create a ReservedIPv6Action entity instance. |
| `ReservedIp(data?)` | `ReservedIpEntity` | Create a ReservedIp entity instance. |
| `ReservedIpAction(data?)` | `ReservedIpActionEntity` | Create a ReservedIpAction entity instance. |
| `Resync(data?)` | `ResyncEntity` | Create a Resync entity instance. |
| `Search(data?)` | `SearchEntity` | Create a Search entity instance. |
| `Security(data?)` | `SecurityEntity` | Create a Security entity instance. |
| `Setting(data?)` | `SettingEntity` | Create a Setting entity instance. |
| `Size(data?)` | `SizeEntity` | Create a Size entity instance. |
| `Snapshot(data?)` | `SnapshotEntity` | Create a Snapshot entity instance. |
| `SpacesKey(data?)` | `SpacesKeyEntity` | Create a SpacesKey entity instance. |
| `SqlMode(data?)` | `SqlModeEntity` | Create a SqlMode entity instance. |
| `SshKey(data?)` | `SshKeyEntity` | Create a SshKey entity instance. |
| `Systemone(data?)` | `SystemoneEntity` | Create a Systemone entity instance. |
| `Tag(data?)` | `TagEntity` | Create a Tag entity instance. |
| `Tool(data?)` | `ToolEntity` | Create a Tool entity instance. |
| `Toolbelt(data?)` | `ToolbeltEntity` | Create a Toolbelt entity instance. |
| `Uptime(data?)` | `UptimeEntity` | Create an Uptime entity instance. |
| `User(data?)` | `UserEntity` | Create an User entity instance. |
| `VectorDatabase(data?)` | `VectorDatabaseEntity` | Create a VectorDatabase entity instance. |
| `VectordbBackup(data?)` | `VectordbBackupEntity` | Create a VectordbBackup entity instance. |
| `VectordbGetRestoreStatus(data?)` | `VectordbGetRestoreStatusEntity` | Create a VectordbGetRestoreStatus entity instance. |
| `VectordbGetVectorDb(data?)` | `VectordbGetVectorDbEntity` | Create a VectordbGetVectorDb entity instance. |
| `VectordbGetVectorDbAdminCredential(data?)` | `VectordbGetVectorDbAdminCredentialEntity` | Create a VectordbGetVectorDbAdminCredential entity instance. |
| `VectordbRestoreBackup(data?)` | `VectordbRestoreBackupEntity` | Create a VectordbRestoreBackup entity instance. |
| `VectordbUpdateVectorDb(data?)` | `VectordbUpdateVectorDbEntity` | Create a VectordbUpdateVectorDb entity instance. |
| `VectordbUpdateVectorDbTag(data?)` | `VectordbUpdateVectorDbTagEntity` | Create a VectordbUpdateVectorDbTag entity instance. |
| `Vpc(data?)` | `VpcEntity` | Create a Vpc entity instance. |
| `VpcNatGateway(data?)` | `VpcNatGatewayEntity` | Create a VpcNatGateway entity instance. |
| `VpcPeering(data?)` | `VpcPeeringEntity` | Create a VpcPeering entity instance. |
| `VpcRoutesPublicPreview(data?)` | `VpcRoutesPublicPreviewEntity` | Create a VpcRoutesPublicPreview entity instance. |
| `VpcSubnetsPublicPreview(data?)` | `VpcSubnetsPublicPreviewEntity` | Create a VpcSubnetsPublicPreview entity instance. |
| `tester(testopts?, sdkopts?)` | `DigitaloceanSDK` | Create a test-mode client instance. |

#### Static methods

| Method | Returns | Description |
| --- | --- | --- |
| `DigitaloceanSDK.test(testopts?, sdkopts?)` | `DigitaloceanSDK` | Create a test-mode client. |

### Entity interface

All entities share the same interface.

#### Methods

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `load(reqmatch?, ctrl?): Promise<Entity>` | Load a single entity by match criteria. |
| `list` | `list(reqmatch?, ctrl?): Promise<Entity[]>` | List entities matching the criteria. |
| `create` | `create(reqdata?, ctrl?): Promise<Entity>` | Create a new entity. |
| `update` | `update(reqdata?, ctrl?): Promise<Entity>` | Update an existing entity. |
| `patch` | `patch(reqdata?, ctrl?): Promise<Entity>` | Change part of an existing entity. |
| `remove` | `remove(reqmatch?, ctrl?): Promise<void>` | Remove an entity. |
| `data` | `data(data?: Partial<Entity>): Entity` | Get or set entity data. |
| `match` | `match(match?: Partial<Entity>): Partial<Entity>` | Get or set entity match criteria. |
| `make` | `make(): Entity` | Create a new instance with the same options. |
| `client` | `client(): DigitaloceanSDK` | Return the parent SDK client. |
| `entopts` | `entopts(): object` | Return a copy of the entity options. |

#### Return values

Entity operations resolve to the entity data directly — there is no
result envelope:

- `load`, `create`, `update` and `patch` resolve to a single entity object.
- `list` resolves to an **array** of entity objects (iterate it directly;
  there is no `.data` and no `.ok`).
- `remove` resolves to `void`.

On a failed request these methods **throw**, so wrap calls in
`try`/`catch` to handle errors. Only `direct()` returns the result
envelope described below.

### DirectResult shape

The `direct()` method returns:

```ts
{
  ok: boolean
  status: number
  headers: object
  data: any
}
```

On error, `ok` is `false` and an `err` property contains the error.

### FetchDef shape

The `prepare()` method returns:

```ts
{
  url: string
  method: string
  headers: Record<string, string>
  body?: any
}
```

### Entities

#### AccessPoint

| Field | Description |
| --- | --- |
| `access_policy` | Provider-agnostic NFS access policy for an access point. |
| `created_at` | The timestamp when the access point was created. |
| `id` | The unique identifier of the access point. |
| `is_default` | Whether this is the share's default access point. |
| `name` | The human-readable name of the access point. |
| `path` | The export sub-path for this access point (always starts with `/`). |
| `share_id` | The unique identifier of the share this access point belongs to. |
| `status` | The current lifecycle status of an access point. |
| `updated_at` | The timestamp when the access point was last updated. |
| `vpc_id` | The VPC this access point is pinned to. |

Operations: create, list, load, remove.

API path: `/v2/nfs/shares/{share_id}/access_points`

#### Account

| Field | Description |
| --- | --- |
| `droplet_limit` | The total number of Droplets current user or team may have active at one time. |
| `email` | The email address used by the current user to register for DigitalOcean. |
| `email_verified` | If true, the user has verified their account via email. |
| `floating_ip_limit` | The total number of Floating IPs the current user or team may have. |
| `name` | The display name for the current user. |
| `status` | This value is one of "active", "warning" or "locked". |
| `status_message` | A human-readable message giving more details about the status of the account. |
| `team` | When authorized in a team context, includes information about the current team. |
| `uuid` | The unique universal identifier for the current user. |

Operations: load.

API path: `/v2/account`

#### Action

| Field | Description |
| --- | --- |
| `action` |  |
| `completed_at` | A time value given in ISO8601 combined date and time format that represents when the action was completed. |
| `id` | A unique numeric ID that can be used to identify and reference an action. |
| `region` |  |
| `region_slug` | A human-readable string that is used as a unique identifier for each region. |
| `resource_id` | A unique identifier for the resource that the action is associated with. |
| `resource_type` | The type of resource that the action is associated with. |
| `started_at` | A time value given in ISO8601 combined date and time format that represents when the action was initiated. |
| `status` | The current status of the action. |
| `type` | This is the type of action that the object represents. |

Operations: create, list, load.

API path: `/v2/images/{image_id}/actions`

#### ActorLimit

| Field | Description |
| --- | --- |
| `category` | The category the limit applies to. |
| `id` |  |
| `requests_per_minute` | Calls allowed per minute. |

Operations: list.

API path: `/v2/action-gateway/actors/{actor_id}/limits`

#### AddOn

| Field | Description |
| --- | --- |
| `app_name` | The name of the application associated with the resource. |
| `app_slug` | The slug identifier for the application associated with the resource. |
| `description` | A brief description of the metadata item. |
| `display_name` | The display name of the metadata item. |
| `has_config` | Indicates if the resource has configuration values set by the vendor. |
| `id` | Unique identifier for the addon metadata item. |
| `message` | A message related to the resource, if applicable. |
| `metadata` | Metadata associated with the resource, set by the user. |
| `name` | The name of the addon resource. |
| `options` |  |
| `plan_name` | The name of the plan associated with the resource. |
| `plan_price_per_month` | The price of the plan per month in US dollars. |
| `plan_slug` | The slug identifier for the plan associated with the resource. |
| `sso_url` | The Single Sign-On URL for the resource, if applicable. |
| `state` | The state the resource is currently in. |
| `type` | The data type of the metadata value. |
| `uuid` | The unique identifier for the addon resource. |

Operations: create, list, load, remove, update.

API path: `/v2/add-ons/saas`

#### ApiAgentVersion

| Field | Description |
| --- | --- |
| `agent_uuid` | Uuid of the agent this version belongs to |
| `attached_child_agents` | List of child agent relationships |
| `attached_functions` | List of function versions |
| `attached_guardrails` | List of guardrail version |
| `attached_knowledgebases` | List of knowledge base agent versions |
| `can_rollback` | Whether the version is able to be rolled back to |
| `created_at` | Creation date |
| `created_by_email` | User who created this version |
| `currently_applied` | Whether this is the currently applied configuration |
| `description` | Description of the agent |
| `id` | Unique identifier |
| `instruction` | Instruction for the agent |
| `k` | K value for the agent's configuration |
| `max_tokens` | Max tokens setting for the agent |
| `model_name` | Name of model associated to the agent version |
| `name` | Name of the agent |
| `provide_citations` | Whether the agent should provide in-response citations |
| `retrieval_method` | - RETRIEVAL_METHOD_UNKNOWN: The retrieval method is unknown - RETRIEVAL_METHOD_REWRITE: The retrieval method is rewrite - RETRIEVAL_METHOD_STEP_BACK: The retrieval method is step back - RETRIEVAL_METHOD_SUB_QUERIES: The retrieval method is… |
| `tags` | Tags associated with the agent |
| `temperature` | Temperature setting for the agent |
| `top_p` | Top_p setting for the agent |
| `trigger_action` | Action triggering the configuration update |
| `version_hash` | Version hash |

Operations: list.

API path: `/v2/gen-ai/agents/{uuid}/versions`

#### ApiCreateAgentApiKeyOutput

| Field | Description |
| --- | --- |
| `agent_uuid` | Agent id |
| `created_at` | Creation date |
| `created_by` | Created by |
| `deleted_at` | Deleted date |
| `name` | Name |
| `secret_key` |  |
| `uuid` | Uuid |

Operations: create.

API path: `/v2/gen-ai/agents/{agent_uuid}/api_keys`

#### ApiCreateDataSourceFileUploadPresignedUrlsOutput

| Field | Description |
| --- | --- |
| `files` | A list of files to generate presigned URLs for. |
| `request_id` | The ID generated for the request for Presigned URLs. |
| `uploads` | A list of generated presigned URLs and object keys, one per file. |

Operations: create.

API path: `/v2/gen-ai/evaluation_datasets/file_upload_presigned_urls`

#### ApiCreateKnowledgeBaseDataSourceOutput

| Field | Description |
| --- | --- |
| `aws_data_source` | AWS S3 Data Source for Display |
| `bucket_name` | Name of storage bucket - Deprecated, moved to data_source_details |
| `chunking_algorithm` |  |
| `chunking_options` |  |
| `created_at` | Creation date / time |
| `dropbox_data_source` | Dropbox Data Source for Display |
| `file_upload_data_source` | File to upload as data source for knowledge base. |
| `google_drive_data_source` | Google Drive Data Source for Display |
| `item_path` | Path of folder or object in bucket - Deprecated, moved to data_source_details |
| `knowledge_base_uuid` | Knowledge base id |
| `last_datasource_indexing_job` |  |
| `region` | Region code - Deprecated, moved to data_source_details |
| `spaces_data_source` | Spaces Bucket Data Source |
| `updated_at` | Last modified |
| `uuid` | Unique id of knowledge base |
| `web_crawler_data_source` | WebCrawlerDataSource |

Operations: create.

API path: `/v2/gen-ai/knowledge_bases/{knowledge_base_uuid}/data_sources`

#### ApiCreateScenarioSetFromLibraryOutput

| Field | Description |
| --- | --- |
| `bucket_name` | Object storage bucket holding the scenario file. |
| `bucket_region` | Object storage bucket region. |
| `created_at` | Time created at. |
| `deleted_at` | Time deleted at. |
| `description` | Customer-supplied description. |
| `failure_reason` | Human-readable explanation of a terminal FAILED status. |
| `generator_model_uuid` | Model that produced the scenarios. |
| `library_scenario_uuid` | UUID of the source library entry. |
| `name` | Customer-supplied name. |
| `scenario_count` | Number of scenarios in the set. |
| `scenario_set_uuid` | UUID of the scenario set. |
| `source_export_id` | Signals export UUID that produced this set. |
| `source_goal_description` | The goal that drove generation. |
| `source_kind` | How a scenario set was created. |
| `spaces_key` | Object storage key for the scenario file. |
| `status` | Lifecycle status of a scenario set. |
| `updated_at` | Time last updated at. |
| `workflow_uuid` | Identifier of the generation workflow. |

Operations: create.

API path: `/v2/gen-ai/scenario_library/{library_scenario_uuid}/create_scenario_set`

#### ApiDeleteAgentApiKeyOutput

| Field | Description |
| --- | --- |

Operations: remove, update.

API path: `/v2/gen-ai/agents/{agent_uuid}/api_keys/{api_key_uuid}`

#### ApiDeleteAgentOutput

| Field | Description |
| --- | --- |
| `anthropic_api_key` | Anthropic API Key Info |
| `anthropic_key_uuid` | Optional Anthropic API key ID to use with Anthropic models |
| `api_key_infos` | Api key infos |
| `api_keys` | Api keys |
| `chatbot` | A Chatbot |
| `chatbot_identifiers` | Chatbot identifiers |
| `child_agents` | Child agents |
| `conversation_logs_enabled` | Whether conversation logs are enabled for the agent |
| `created_at` | Creation date / time |
| `deployment` | Description of deployment |
| `description` | Description of agent |
| `functions` |  |
| `guardrails` | The guardrails the agent is attached to |
| `if_case` | Instructions to the agent on how to use the route |
| `instruction` | Agent instruction. |
| `k` | How many results should be considered from an attached knowledge base |
| `knowledge_base_uuid` | Ids of the knowledge base(s) to attach to the agent |
| `knowledge_bases` | Knowledge bases |
| `logging_config` |  |
| `max_tokens` | Specifies the maximum number of tokens the model can process in a single input or output, set as a number between 1 and 512. |
| `mcp_servers` | MCP (Model Context Protocol) servers attached to this agent |
| `model` | Description of a Model |
| `model_provider_key` |  |
| `model_provider_key_uuid` |  |
| `model_router` | Model router |
| `model_router_uuid` |  |
| `model_uuid` | Identifier for the foundation model. |
| `name` | Agent name |
| `open_ai_key_uuid` | Optional OpenAI API key ID to use with OpenAI models |
| `openai_api_key` | OpenAI API Key Info |
| `parent_agents` | Parent agents |
| `project_id` | The id of the DigitalOcean project this agent will belong to |
| `provide_citations` | Whether the agent should provide in-response citations |
| `reasoning_effort` | The reasoning effort for the agent |
| `region` | Region code |
| `retrieval_method` | - RETRIEVAL_METHOD_UNKNOWN: The retrieval method is unknown - RETRIEVAL_METHOD_REWRITE: The retrieval method is rewrite - RETRIEVAL_METHOD_STEP_BACK: The retrieval method is step back - RETRIEVAL_METHOD_SUB_QUERIES: The retrieval method is… |
| `route_created_at` | Creation of route date / time |
| `route_created_by` | Id of user that created the route |
| `route_name` | Route name |
| `route_uuid` | Route uuid |
| `router_preset_slug` |  |
| `tags` | Agent tag to organize related resources |
| `temperature` | Controls the model’s creativity, specified as a number between 0 and 1. |
| `template` | Represents an AgentTemplate entity |
| `thinking_token_budget` | The thinking token budget for Anthropic extended thinking (0 = disabled) |
| `top_p` | Defines the cumulative probability threshold for word selection, specified as a number between 0 and 1. |
| `updated_at` | Last modified |
| `url` | Access your agent under this url |
| `user_id` | Id of user that created the agent |
| `uuid` | Unique agent id |
| `version_hash` | The latest version of the agent |
| `vpc_egress_ips` | VPC Egress IPs |
| `vpc_uuid` |  |
| `web_fetch_enabled` | Whether this agent can use the built-in web_fetch tool. |
| `web_search_enabled` | Whether this agent can use the built-in web_search tool. |
| `workspace` |  |
| `workspace_uuid` | Identifier for the workspace |

Operations: create, list, remove.

API path: `/v2/gen-ai/agents`

#### ApiDeleteAnthropicApiKeyOutput

| Field | Description |
| --- | --- |
| `api_key` | Anthropic API key |
| `created_at` | Key creation date |
| `created_by` | Created by user id from DO |
| `deleted_at` | Key deleted date |
| `name` | Name |
| `updated_at` | Key last updated date |
| `uuid` | Uuid |

Operations: create, list, remove.

API path: `/v2/gen-ai/anthropic/keys`

#### ApiDeleteCustomEvaluationMetricOutput

| Field | Description |
| --- | --- |

Operations: remove.

API path: `/v2/gen-ai/custom_evaluation_metrics/{metric_uuid}`

#### ApiDeleteCustomModelOutputPublic

| Field | Description |
| --- | --- |

Operations: remove.

API path: `/v2/gen-ai/custom_models/{uuid}`

#### ApiDeleteEvaluationDatasetOutput

| Field | Description |
| --- | --- |
| `created_at` | Time created at. |
| `dataset_name` | Name of the dataset. |
| `dataset_paradigm` | EvaluationDatasetParadigm is the row/content shape of a dataset, orthogonal to the surface in EvaluationDatasetType (e.g. |
| `dataset_type` |  |
| `dataset_uuid` | UUID of the dataset. |
| `evaluation_dataset_uuid` | Evaluation dataset uuid. |
| `file_size` | The size of the dataset uploaded file in bytes. |
| `file_upload_dataset` | File to upload as data source for knowledge base. |
| `has_ground_truth` | Does the dataset have a ground truth column? |
| `name` | The name of the agent evaluation dataset. |
| `row_count` | Number of rows in the dataset. |

Operations: create, list, remove.

API path: `/v2/gen-ai/evaluation_datasets`

#### ApiDeleteKnowledgeBaseDataSourceOutput

| Field | Description |
| --- | --- |

Operations: remove.

API path: `/v2/gen-ai/knowledge_bases/{knowledge_base_uuid}/data_sources/{data_source_uuid}`

#### ApiDeleteKnowledgeBaseOutput

| Field | Description |
| --- | --- |

Operations: remove.

API path: `/v2/gen-ai/knowledge_bases/{uuid}`

#### ApiDeleteModelApiKeyOutput

| Field | Description |
| --- | --- |
| `created_at` | Creation date |
| `created_by` | Created by |
| `deleted_at` | Deleted date |
| `name` | A human friendly name to identify the key |
| `secret_key` |  |
| `uuid` | Uuid |

Operations: create, list, remove, update.

API path: `/v2/gen-ai/models/api_keys`

#### ApiDeleteModelEvaluationPresetOutput

| Field | Description |
| --- | --- |

Operations: remove.

API path: `/v2/gen-ai/model_evaluation_presets/{eval_preset_uuid}`

#### ApiDeleteModelEvaluationRunOutputPublic

| Field | Description |
| --- | --- |

Operations: remove.

API path: `/v2/gen-ai/model_evaluation_runs/{eval_run_uuid}`

#### ApiDeleteModelRouterOutput

| Field | Description |
| --- | --- |

Operations: remove.

API path: `/v2/gen-ai/models/routers/{uuid}`

#### ApiDeleteOpenAiapiKeyOutput

| Field | Description |
| --- | --- |
| `api_key` | OpenAI API key |
| `created_at` | Key creation date |
| `created_by` | Created by user id from DO |
| `deleted_at` | Key deleted date |
| `models` | Models supported by the openAI api key |
| `name` | Name |
| `updated_at` | Key last updated date |
| `uuid` | Uuid |

Operations: create, list, remove.

API path: `/v2/gen-ai/openai/keys`

#### ApiDeleteScenarioSetOutput

| Field | Description |
| --- | --- |

Operations: remove.

API path: `/v2/gen-ai/scenario_sets/{scenario_set_uuid}`

#### ApiDeleteScheduledIndexingOutput

| Field | Description |
| --- | --- |
| `created_at` | Created at timestamp |
| `days` | Days for execution (day is represented same as in a cron expression, e.g. |
| `deleted_at` | Deleted at timestamp (if soft deleted) |
| `is_active` | Whether the schedule is currently active |
| `knowledge_base_uuid` | Knowledge base uuid associated with this schedule |
| `last_ran_at` | Last time the schedule was executed |
| `next_run_at` | Next scheduled run |
| `time` | Scheduled time of execution (HH:MM:SS format) |
| `updated_at` | Updated at timestamp |
| `uuid` | Unique identifier for the scheduled indexing entry |

Operations: create, remove.

API path: `/v2/gen-ai/scheduled-indexing`

#### ApiDeleteSimulationRunOutput

| Field | Description |
| --- | --- |

Operations: remove.

API path: `/v2/gen-ai/simulation_runs/{run_uuid}`

#### ApiDeleteWorkspaceOutput

| Field | Description |
| --- | --- |

Operations: remove.

API path: `/v2/gen-ai/workspaces/{workspace_uuid}`

#### ApiDropboxOauth2GetTokensOutput

| Field | Description |
| --- | --- |
| `code` | The oauth2 code from google |
| `redirect_url` | Redirect url |
| `refresh_token` | The refresh token |
| `token` | The access token |

Operations: create.

API path: `/v2/gen-ai/oauth2/dropbox/tokens`

#### ApiGenerateOauth2UrlOutput

| Field | Description |
| --- | --- |
| `url` | The oauth2 url |

Operations: load.

API path: `/v2/gen-ai/oauth2/url`

#### ApiGenerateScenarioSetOutput

| Field | Description |
| --- | --- |
| `bucket_name` | Object storage bucket holding the scenario file. |
| `bucket_region` | Object storage bucket region. |
| `created_at` | Time created at. |
| `deleted_at` | Time deleted at. |
| `description` | Customer-supplied description. |
| `failure_reason` | Human-readable explanation of a terminal FAILED status. |
| `generator_model_uuid` | Model that produced the scenarios. |
| `goal_description` | The goal that drives scenario generation. |
| `library_scenario_uuid` | UUID of the source library entry. |
| `name` | Customer-supplied name. |
| `num_scenarios` | Number of scenarios to generate. |
| `scenario_count` | Number of scenarios in the set. |
| `scenario_set_uuid` | UUID of the scenario set. |
| `source_export_id` | Signals export UUID that produced this set. |
| `source_goal_description` | The goal that drove generation. |
| `source_kind` | How a scenario set was created. |
| `spaces_key` | Object storage key for the scenario file. |
| `status` | Lifecycle status of a scenario set. |
| `updated_at` | Time last updated at. |
| `workflow_uuid` | Identifier of the generation workflow. |

Operations: create.

API path: `/v2/gen-ai/scenario_sets/generate`

#### ApiGetAgentOutput

| Field | Description |
| --- | --- |
| `anthropic_api_key` | Anthropic API Key Info |
| `api_key_infos` | Api key infos |
| `api_keys` | Api keys |
| `chatbot` | A Chatbot |
| `chatbot_identifiers` | Chatbot identifiers |
| `child_agents` | Child agents |
| `conversation_logs_enabled` | Whether conversation logs are enabled for the agent |
| `created_at` | Creation date / time |
| `deployment` | Description of deployment |
| `description` | Description of agent |
| `functions` |  |
| `guardrails` | The guardrails the agent is attached to |
| `if_case` |  |
| `instruction` | Agent instruction. |
| `k` |  |
| `knowledge_bases` | Knowledge bases |
| `logging_config` |  |
| `max_tokens` |  |
| `mcp_servers` | MCP (Model Context Protocol) servers attached to this agent |
| `model` | Description of a Model |
| `model_provider_key` |  |
| `model_router` | Model router |
| `name` | Agent name |
| `openai_api_key` | OpenAI API Key Info |
| `parent_agents` | Parent agents |
| `project_id` |  |
| `provide_citations` | Whether the agent should provide in-response citations |
| `reasoning_effort` | The reasoning effort for the agent |
| `region` | Region code |
| `retrieval_method` | - RETRIEVAL_METHOD_UNKNOWN: The retrieval method is unknown - RETRIEVAL_METHOD_REWRITE: The retrieval method is rewrite - RETRIEVAL_METHOD_STEP_BACK: The retrieval method is step back - RETRIEVAL_METHOD_SUB_QUERIES: The retrieval method is… |
| `route_created_at` | Creation of route date / time |
| `route_created_by` |  |
| `route_name` | Route name |
| `route_uuid` |  |
| `tags` | Agent tag to organize related resources |
| `temperature` |  |
| `template` | Represents an AgentTemplate entity |
| `thinking_token_budget` | The thinking token budget for Anthropic extended thinking (0 = disabled) |
| `top_p` |  |
| `updated_at` | Last modified |
| `url` | Access your agent under this url |
| `user_id` | Id of user that created the agent |
| `uuid` | Unique agent id |
| `version_hash` | The latest version of the agent |
| `vpc_egress_ips` | VPC Egress IPs |
| `vpc_uuid` |  |
| `web_fetch_enabled` | Whether this agent can use the built-in web_fetch tool. |
| `web_search_enabled` | Whether this agent can use the built-in web_search tool. |
| `workspace` |  |

Operations: load, update.

API path: `/v2/gen-ai/agents/{uuid}`

#### ApiGetAgentUsageOutput

| Field | Description |
| --- | --- |
| `log_insights_usage` | Resource Usage Description |
| `usage` | Resource Usage Description |

Operations: load.

API path: `/v2/gen-ai/agents/{uuid}/usage`

#### ApiGetAnthropicApiKeyOutput

| Field | Description |
| --- | --- |
| `created_at` | Key creation date |
| `created_by` | Created by user id from DO |
| `deleted_at` | Key deleted date |
| `name` | Name |
| `updated_at` | Key last updated date |
| `uuid` | Uuid |

Operations: load.

API path: `/v2/gen-ai/anthropic/keys/{api_key_uuid}`

#### ApiGetChildrenOutput

| Field | Description |
| --- | --- |
| `anthropic_api_key` | Anthropic API Key Info |
| `api_key_infos` | Api key infos |
| `api_keys` | Api keys |
| `chatbot` | A Chatbot |
| `chatbot_identifiers` | Chatbot identifiers |
| `child_agents` | Child agents |
| `conversation_logs_enabled` | Whether conversation logs are enabled for the agent |
| `created_at` | Creation date / time |
| `deployment` | Description of deployment |
| `description` | Description of agent |
| `functions` |  |
| `guardrails` | The guardrails the agent is attached to |
| `if_case` |  |
| `instruction` | Agent instruction. |
| `k` |  |
| `knowledge_bases` | Knowledge bases |
| `logging_config` |  |
| `max_tokens` |  |
| `mcp_servers` | MCP (Model Context Protocol) servers attached to this agent |
| `model` | Description of a Model |
| `model_provider_key` |  |
| `model_router` | Model router |
| `name` | Agent name |
| `openai_api_key` | OpenAI API Key Info |
| `parent_agents` | Parent agents |
| `project_id` |  |
| `provide_citations` | Whether the agent should provide in-response citations |
| `reasoning_effort` | The reasoning effort for the agent |
| `region` | Region code |
| `retrieval_method` | - RETRIEVAL_METHOD_UNKNOWN: The retrieval method is unknown - RETRIEVAL_METHOD_REWRITE: The retrieval method is rewrite - RETRIEVAL_METHOD_STEP_BACK: The retrieval method is step back - RETRIEVAL_METHOD_SUB_QUERIES: The retrieval method is… |
| `route_created_at` | Creation of route date / time |
| `route_created_by` |  |
| `route_name` | Route name |
| `route_uuid` |  |
| `tags` | Agent tag to organize related resources |
| `temperature` |  |
| `template` | Represents an AgentTemplate entity |
| `thinking_token_budget` | The thinking token budget for Anthropic extended thinking (0 = disabled) |
| `top_p` |  |
| `updated_at` | Last modified |
| `url` | Access your agent under this url |
| `user_id` | Id of user that created the agent |
| `uuid` | Unique agent id |
| `version_hash` | The latest version of the agent |
| `vpc_egress_ips` | VPC Egress IPs |
| `vpc_uuid` |  |
| `web_fetch_enabled` | Whether this agent can use the built-in web_fetch tool. |
| `web_search_enabled` | Whether this agent can use the built-in web_search tool. |
| `workspace` |  |

Operations: list.

API path: `/v2/gen-ai/agents/{uuid}/child_agents`

#### ApiGetCustomModelOutputPublic

| Field | Description |
| --- | --- |
| `active_deployments` | List of active deployments using this model |
| `architecture` | Model architecture type (free-form string from config.json) |
| `config_json` | Raw config.json contents from the model repository |
| `context_length` | Maximum context length supported by the model |
| `cost_estimate_per_month` | Estimated monthly cost in dollars for hosting |
| `created_at` | Timestamp when the model was created |
| `description` | Description of the custom model |
| `error_message` | User-facing reason the most recent import failed; empty otherwise. |
| `file_count` | Number of files in the model |
| `input_modalities` | Input modalities supported (e.g., text, image) |
| `license` | License under which the model is distributed |
| `name` | Name of the custom model |
| `output_modalities` | Output modalities supported (e.g., text, image) |
| `parameters` | Number of parameters in the model |
| `source_ref` | Reference to the original source of the model |
| `source_type` | Source from which the model was imported |
| `status` | Import and deployment status of the custom model |
| `storage_region` | Region of the Spaces bucket where model files are stored |
| `tags` | User-defined tags for organizing models |
| `team_id` | Team that owns the model |
| `total_size_bytes` | Total size of model files in bytes |
| `updated_at` | Timestamp when the model was last updated |
| `uuid` | Unique identifier for the custom model |

Operations: list, load, update.

API path: `/v2/gen-ai/custom_models`

#### ApiGetEvaluationDatasetDownloadUrlOutput

| Field | Description |
| --- | --- |
| `download_url` | The presigned URL to download the dataset file. |
| `expires_at` | The time the URL expires at. |

Operations: load.

API path: `/v2/gen-ai/evaluation_datasets/{dataset_uuid}/download_url`

#### ApiGetEvaluationRunOutput

| Field | Description |
| --- | --- |
| `agent_deleted` | Whether agent is deleted |
| `agent_deployment_name` | The agent deployment name |
| `agent_deployment_names` | Agent deployment names to run the test case against. |
| `agent_name` | Agent name |
| `agent_uuid` | Agent UUID. |
| `agent_uuids` | Agent UUIDs to run the test case against (legacy agents). |
| `agent_version_hash` | Version hash |
| `agent_workspace_uuid` | Agent workspace uuid |
| `created_by_user_email` |  |
| `created_by_user_id` |  |
| `error_description` | The error description |
| `evaluation_run_uuid` | Evaluation run UUID. |
| `evaluation_run_uuids` |  |
| `evaluation_test_case_workspace_uuid` | Evaluation test case workspace uuid |
| `finished_at` | Run end time. |
| `pass_status` | The pass status of the evaluation run based on the star metric. |
| `queued_at` | Run queued time. |
| `run_level_metric_results` |  |
| `run_name` | Run name. |
| `star_metric_result` |  |
| `started_at` | Run start time. |
| `status` | Evaluation Run Statuses |
| `test_case_description` | Test case description. |
| `test_case_name` | Test case name. |
| `test_case_uuid` | Test-case UUID. |
| `test_case_version` | Test-case-version. |

Operations: create, load.

API path: `/v2/gen-ai/evaluation_runs`

#### ApiGetEvaluationRunResultsOutput

| Field | Description |
| --- | --- |
| `evaluation_trace_spans` | The evaluated trace spans. |
| `ground_truth` | The ground truth for the prompt. |
| `input` |  |
| `input_tokens` | The number of input tokens used in the prompt. |
| `output` |  |
| `output_tokens` | The number of output tokens used in the prompt. |
| `prompt_chunks` | The list of prompt chunks. |
| `prompt_id` | Prompt ID |
| `prompt_level_metric_results` | The metric results for the prompt. |
| `trace_id` | The trace id for the prompt. |

Operations: list.

API path: `/v2/gen-ai/evaluation_runs/{evaluation_run_uuid}/results`

#### ApiGetEvaluationTestCaseOutput

| Field | Description |
| --- | --- |
| `agent_workspace_name` |  |
| `archived_at` |  |
| `created_at` |  |
| `created_by_user_email` |  |
| `created_by_user_id` |  |
| `dataset` |  |
| `dataset_name` |  |
| `dataset_uuid` | Dataset against which the test‑case is executed. |
| `description` | Description of the test case. |
| `latest_version_number_of_runs` |  |
| `metrics` | Full metric list to use for evaluation test case. |
| `name` | Name of the test case. |
| `star_metric` |  |
| `test_case_uuid` | Test‑case UUID. |
| `total_runs` |  |
| `updated_at` |  |
| `updated_by_user_email` |  |
| `updated_by_user_id` |  |
| `version` |  |
| `workspace_uuid` | The workspace uuid. |

Operations: create, list, load.

API path: `/v2/gen-ai/evaluation_test_cases`

#### ApiGetIndexingJobDetailsSignedUrlOutput

| Field | Description |
| --- | --- |
| `signed_url` | The signed url for downloading the indexing job details |

Operations: load.

API path: `/v2/gen-ai/indexing_jobs/{indexing_job_uuid}/details_signed_url`

#### ApiGetKnowledgeBaseIndexingJobOutput

| Field | Description |
| --- | --- |
| `completed_datasources` | Number of datasources indexed completed |
| `created_at` | Creation date / time |
| `data_source_jobs` | Details on Data Sources included in the Indexing Job |
| `data_source_uuids` | List of data source ids to index, if none are provided, all data sources will be indexed |
| `finished_at` |  |
| `is_report_available` | Boolean value to determine if the indexing job details are available |
| `knowledge_base_uuid` | Knowledge base id |
| `phase` |  |
| `started_at` |  |
| `status` |  |
| `tokens` | Number of tokens [This field is deprecated] |
| `total_datasources` | Number of datasources being indexed |
| `total_tokens` | Total Tokens Consumed By the Indexing Job |
| `updated_at` | Last modified |
| `uuid` | Unique id |

Operations: create, list, load, update.

API path: `/v2/gen-ai/indexing_jobs`

#### ApiGetKnowledgeBaseOutput

| Field | Description |
| --- | --- |
| `database_status` |  |
| `knowledge_base` | Knowledgebase Description |

Operations: load.

API path: `/v2/gen-ai/knowledge_bases/{uuid}`

#### ApiGetModelEvaluationRunOutput

| Field | Description |
| --- | --- |
| `links` | Links to other pages |
| `meta` | Meta information about the data set |
| `results` | Paginated per-prompt evaluation results. |
| `run` | Model Evaluation Run Detail - full view returned when fetching a specific run. |

Operations: load, update.

API path: `/v2/gen-ai/model_evaluation_runs/{eval_run_uuid}`

#### ApiGetModelEvaluationRunResultsDownloadUrlOutput

| Field | Description |
| --- | --- |
| `download_url` | The presigned URL to download the gzip-compressed JSON results file (.json.gz). |
| `expires_at` | The time the URL expires at. |

Operations: load.

API path: `/v2/gen-ai/model_evaluation_runs/{eval_run_uuid}/results/download_url`

#### ApiGetModelRouterOutput

| Field | Description |
| --- | --- |
| `config` |  |
| `created_at` | Creation date / time |
| `description` | Description |
| `fallback_models` | At least one fallback model is required; order defines failover priority |
| `name` | Name of the model router |
| `policies` | Router policies |
| `regions` | Target regions for the router |
| `updated_at` | Last modified |
| `uuid` | Unique id |

Operations: create, list, load.

API path: `/v2/gen-ai/models/routers`

#### ApiGetOpenAiapiKeyOutput

| Field | Description |
| --- | --- |
| `created_at` | Key creation date |
| `created_by` | Created by user id from DO |
| `deleted_at` | Key deleted date |
| `models` | Models supported by the openAI api key |
| `name` | Name |
| `updated_at` | Key last updated date |
| `uuid` | Uuid |

Operations: load.

API path: `/v2/gen-ai/openai/keys/{api_key_uuid}`

#### ApiGetScenarioSetDownloadUrlOutput

| Field | Description |
| --- | --- |
| `download_url` | The presigned URL to download the scenario set file. |
| `expires_at` | The time the URL expires at. |

Operations: load.

API path: `/v2/gen-ai/scenario_sets/{scenario_set_uuid}/download_url`

#### ApiGetScenarioSetOutput

| Field | Description |
| --- | --- |
| `bucket_name` | Object storage bucket holding the scenario file. |
| `bucket_region` | Object storage bucket region. |
| `created_at` | Time created at. |
| `deleted_at` | Time deleted at. |
| `description` | Customer-supplied description. |
| `failure_reason` | Human-readable explanation of a terminal FAILED status. |
| `file_upload_scenario_set` | Uploaded scenario file to ingest. |
| `generator_model_uuid` | Model that produced the scenarios. |
| `library_scenario_uuid` | UUID of the source library entry. |
| `name` | Customer-supplied name. |
| `scenario_count` | Number of scenarios in the set. |
| `scenario_set_uuid` | UUID of the scenario set. |
| `scenarios` | Inline scenarios. |
| `source_export_id` | Signals export UUID that produced this set. |
| `source_goal_description` | The goal that drove generation. |
| `source_kind` | How a scenario set was created. |
| `spaces_key` | Object storage key for the scenario file. |
| `status` | Lifecycle status of a scenario set. |
| `updated_at` | Time last updated at. |
| `workflow_uuid` | Identifier of the generation workflow. |

Operations: create, list, load.

API path: `/v2/gen-ai/scenario_sets/{scenario_set_uuid}/duplicate`

#### ApiGetScheduledIndexingOutput

| Field | Description |
| --- | --- |
| `created_at` | Created at timestamp |
| `days` | Days for execution (day is represented same as in a cron expression, e.g. |
| `deleted_at` | Deleted at timestamp (if soft deleted) |
| `is_active` | Whether the schedule is currently active |
| `knowledge_base_uuid` | Knowledge base uuid associated with this schedule |
| `last_ran_at` | Last time the schedule was executed |
| `next_run_at` | Next scheduled run |
| `time` | Scheduled time of execution (HH:MM:SS format) |
| `updated_at` | Updated at timestamp |
| `uuid` | Unique identifier for the scheduled indexing entry |

Operations: load.

API path: `/v2/gen-ai/scheduled-indexing/knowledge-base/{knowledge_base_uuid}`

#### ApiGetSimulationJourneyTrajectoryUrlOutput

| Field | Description |
| --- | --- |
| `download_url` | The presigned URL to download the trajectory JSON file. |
| `expires_at` | The time the URL expires at. |

Operations: load.

API path: `/v2/gen-ai/simulation_runs/{run_uuid}/journeys/{journey_uuid}/trajectory_url`

#### ApiGetSimulationRunOutput

| Field | Description |
| --- | --- |
| `scenario_results` | Per-scenario breakdown of journey outcomes, aggregated from journey rows. |
| `simulation_run` | One execution of a scenario set against a candidate agent. |

Operations: load, update.

API path: `/v2/gen-ai/simulation_runs/{run_uuid}`

#### ApiGetWorkspaceOutput

| Field | Description |
| --- | --- |
| `agent_uuids` | Ids of the agents(s) to attach to the workspace |
| `agents` | Agents |
| `created_at` | Creation date |
| `created_by` | The id of user who created this workspace |
| `created_by_email` | The email of the user who created this workspace |
| `deleted_at` | Deleted date |
| `description` | Description of the workspace |
| `evaluation_test_cases` | Evaluations |
| `name` | Name of the workspace |
| `updated_at` | Update date |
| `uuid` | Unique id |

Operations: create, list, load.

API path: `/v2/gen-ai/workspaces`

#### ApiImportCustomModelOutputPublic

| Field | Description |
| --- | --- |
| `accept_hf_token_storage` | Whether the caller accepts storage of their HuggingFace token for gated model access |
| `accept_terms_and_conditions` | Whether the caller accepts the terms and conditions for importing this model |
| `description` | Description of the model |
| `error` |  |
| `import_job` | Import job tracking for a custom model |
| `model` | Custom model - user-imported model from HuggingFace, Spaces, etc. |
| `name` | Name for the imported model |
| `preferred_gpu_region` | Preferred GPU region for deployment |
| `source_ref` | Reference to the original source of the model |
| `source_type` | Source from which the model was imported |
| `tags` | User-defined tags for organizing models |
| `validation_steps` | Validation steps performed during import |

Operations: create.

API path: `/v2/gen-ai/custom_models/import`

#### ApiIndexedDataSource

| Field | Description |
| --- | --- |
| `completed_at` | Timestamp when data source completed indexing |
| `data_source_uuid` | Uuid of the indexed data source |
| `error_details` | A detailed error description |
| `error_msg` | A string code provinding a hint which part of the system experienced an error |
| `failed_item_count` | Total count of files that have failed |
| `indexed_file_count` | Total count of files that have been indexed |
| `indexed_item_count` | Total count of files that have been indexed |
| `removed_item_count` | Total count of files that have been removed |
| `skipped_item_count` | Total count of files that have been skipped |
| `started_at` | Timestamp when data source started indexing |
| `status` |  |
| `total_bytes` | Total size of files in data source in bytes |
| `total_bytes_indexed` | Total size of files in data source in bytes that have been indexed |
| `total_file_count` | Total file count in the data source |

Operations: list.

API path: `/v2/gen-ai/indexing_jobs/{indexing_job_uuid}/data_sources`

#### ApiLinkAgentFunctionOutput

| Field | Description |
| --- | --- |
| `agent_uuid` | Agent id |
| `anthropic_api_key` | Anthropic API Key Info |
| `api_key_infos` | Api key infos |
| `api_keys` | Api keys |
| `chatbot` | A Chatbot |
| `chatbot_identifiers` | Chatbot identifiers |
| `child_agents` | Child agents |
| `conversation_logs_enabled` | Whether conversation logs are enabled for the agent |
| `created_at` | Creation date / time |
| `deployment` | Description of deployment |
| `description` | Description of agent |
| `faas_name` | The name of the function in the DigitalOcean functions platform |
| `faas_namespace` | The namespace of the function in the DigitalOcean functions platform |
| `function_name` | Function name |
| `functions` |  |
| `guardrails` | The guardrails the agent is attached to |
| `if_case` |  |
| `input_schema` | Describe the input schema for the function so the agent may call it |
| `instruction` | Agent instruction. |
| `k` |  |
| `knowledge_bases` | Knowledge bases |
| `logging_config` |  |
| `max_tokens` |  |
| `mcp_servers` | MCP (Model Context Protocol) servers attached to this agent |
| `model` | Description of a Model |
| `model_provider_key` |  |
| `model_router` | Model router |
| `name` | Agent name |
| `openai_api_key` | OpenAI API Key Info |
| `output_schema` | Describe the output schema for the function so the agent handle its response |
| `parent_agents` | Parent agents |
| `project_id` |  |
| `provide_citations` | Whether the agent should provide in-response citations |
| `reasoning_effort` | The reasoning effort for the agent |
| `region` | Region code |
| `retrieval_method` | - RETRIEVAL_METHOD_UNKNOWN: The retrieval method is unknown - RETRIEVAL_METHOD_REWRITE: The retrieval method is rewrite - RETRIEVAL_METHOD_STEP_BACK: The retrieval method is step back - RETRIEVAL_METHOD_SUB_QUERIES: The retrieval method is… |
| `route_created_at` | Creation of route date / time |
| `route_created_by` |  |
| `route_name` | Route name |
| `route_uuid` |  |
| `tags` | Agent tag to organize related resources |
| `temperature` |  |
| `template` | Represents an AgentTemplate entity |
| `thinking_token_budget` | The thinking token budget for Anthropic extended thinking (0 = disabled) |
| `top_p` |  |
| `updated_at` | Last modified |
| `url` | Access your agent under this url |
| `user_id` | Id of user that created the agent |
| `uuid` | Unique agent id |
| `version_hash` | The latest version of the agent |
| `vpc_egress_ips` | VPC Egress IPs |
| `vpc_uuid` |  |
| `web_fetch_enabled` | Whether this agent can use the built-in web_fetch tool. |
| `web_search_enabled` | Whether this agent can use the built-in web_search tool. |
| `workspace` |  |

Operations: create.

API path: `/v2/gen-ai/agents/{agent_uuid}/functions`

#### ApiLinkAgentGuardrailOutput

| Field | Description |
| --- | --- |
| `agent_uuid` | The UUID of the agent. |
| `anthropic_api_key` | Anthropic API Key Info |
| `api_key_infos` | Api key infos |
| `api_keys` | Api keys |
| `chatbot` | A Chatbot |
| `chatbot_identifiers` | Chatbot identifiers |
| `child_agents` | Child agents |
| `conversation_logs_enabled` | Whether conversation logs are enabled for the agent |
| `created_at` | Creation date / time |
| `deployment` | Description of deployment |
| `description` | Description of agent |
| `functions` |  |
| `guardrails` | The guardrails the agent is attached to |
| `if_case` |  |
| `instruction` | Agent instruction. |
| `k` |  |
| `knowledge_bases` | Knowledge bases |
| `logging_config` |  |
| `max_tokens` |  |
| `mcp_servers` | MCP (Model Context Protocol) servers attached to this agent |
| `model` | Description of a Model |
| `model_provider_key` |  |
| `model_router` | Model router |
| `name` | Agent name |
| `openai_api_key` | OpenAI API Key Info |
| `parent_agents` | Parent agents |
| `project_id` |  |
| `provide_citations` | Whether the agent should provide in-response citations |
| `reasoning_effort` | The reasoning effort for the agent |
| `region` | Region code |
| `retrieval_method` | - RETRIEVAL_METHOD_UNKNOWN: The retrieval method is unknown - RETRIEVAL_METHOD_REWRITE: The retrieval method is rewrite - RETRIEVAL_METHOD_STEP_BACK: The retrieval method is step back - RETRIEVAL_METHOD_SUB_QUERIES: The retrieval method is… |
| `route_created_at` | Creation of route date / time |
| `route_created_by` |  |
| `route_name` | Route name |
| `route_uuid` |  |
| `tags` | Agent tag to organize related resources |
| `temperature` |  |
| `template` | Represents an AgentTemplate entity |
| `thinking_token_budget` | The thinking token budget for Anthropic extended thinking (0 = disabled) |
| `top_p` |  |
| `updated_at` | Last modified |
| `url` | Access your agent under this url |
| `user_id` | Id of user that created the agent |
| `uuid` | Unique agent id |
| `version_hash` | The latest version of the agent |
| `vpc_egress_ips` | VPC Egress IPs |
| `vpc_uuid` |  |
| `web_fetch_enabled` | Whether this agent can use the built-in web_fetch tool. |
| `web_search_enabled` | Whether this agent can use the built-in web_search tool. |
| `workspace` |  |

Operations: create.

API path: `/v2/gen-ai/agents/{agent_uuid}/guardrails`

#### ApiLinkAgentOutput

| Field | Description |
| --- | --- |
| `child_agent_uuid` | Routed agent id |
| `if_case` |  |
| `parent_agent_uuid` | A unique identifier for the parent agent. |
| `route_name` | Name of route |

Operations: create.

API path: `/v2/gen-ai/agents/{parent_agent_uuid}/child_agents/{child_agent_uuid}`

#### ApiLinkKnowledgeBaseOutput

| Field | Description |
| --- | --- |
| `anthropic_api_key` | Anthropic API Key Info |
| `api_key_infos` | Api key infos |
| `api_keys` | Api keys |
| `chatbot` | A Chatbot |
| `chatbot_identifiers` | Chatbot identifiers |
| `child_agents` | Child agents |
| `conversation_logs_enabled` | Whether conversation logs are enabled for the agent |
| `created_at` | Creation date / time |
| `deployment` | Description of deployment |
| `description` | Description of agent |
| `functions` |  |
| `guardrails` | The guardrails the agent is attached to |
| `if_case` |  |
| `instruction` | Agent instruction. |
| `k` |  |
| `knowledge_bases` | Knowledge bases |
| `logging_config` |  |
| `max_tokens` |  |
| `mcp_servers` | MCP (Model Context Protocol) servers attached to this agent |
| `model` | Description of a Model |
| `model_provider_key` |  |
| `model_router` | Model router |
| `name` | Agent name |
| `openai_api_key` | OpenAI API Key Info |
| `parent_agents` | Parent agents |
| `project_id` |  |
| `provide_citations` | Whether the agent should provide in-response citations |
| `reasoning_effort` | The reasoning effort for the agent |
| `region` | Region code |
| `retrieval_method` | - RETRIEVAL_METHOD_UNKNOWN: The retrieval method is unknown - RETRIEVAL_METHOD_REWRITE: The retrieval method is rewrite - RETRIEVAL_METHOD_STEP_BACK: The retrieval method is step back - RETRIEVAL_METHOD_SUB_QUERIES: The retrieval method is… |
| `route_created_at` | Creation of route date / time |
| `route_created_by` |  |
| `route_name` | Route name |
| `route_uuid` |  |
| `tags` | Agent tag to organize related resources |
| `temperature` |  |
| `template` | Represents an AgentTemplate entity |
| `thinking_token_budget` | The thinking token budget for Anthropic extended thinking (0 = disabled) |
| `top_p` |  |
| `updated_at` | Last modified |
| `url` | Access your agent under this url |
| `user_id` | Id of user that created the agent |
| `uuid` | Unique agent id |
| `version_hash` | The latest version of the agent |
| `vpc_egress_ips` | VPC Egress IPs |
| `vpc_uuid` |  |
| `web_fetch_enabled` | Whether this agent can use the built-in web_fetch tool. |
| `web_search_enabled` | Whether this agent can use the built-in web_search tool. |
| `workspace` |  |

Operations: create.

API path: `/v2/gen-ai/agents/{agent_uuid}/knowledge_bases/{knowledge_base_uuid}`

#### ApiListAgentApiKeysOutput

| Field | Description |
| --- | --- |
| `created_at` | Creation date |
| `created_by` | Created by |
| `deleted_at` | Deleted date |
| `name` | Name |
| `secret_key` |  |
| `uuid` | Uuid |

Operations: list.

API path: `/v2/gen-ai/agents/{agent_uuid}/api_keys`

#### ApiListAgentsByAnthropicKeyOutput

| Field | Description |
| --- | --- |
| `anthropic_api_key` | Anthropic API Key Info |
| `api_key_infos` | Api key infos |
| `api_keys` | Api keys |
| `chatbot` | A Chatbot |
| `chatbot_identifiers` | Chatbot identifiers |
| `child_agents` | Child agents |
| `conversation_logs_enabled` | Whether conversation logs are enabled for the agent |
| `created_at` | Creation date / time |
| `deployment` | Description of deployment |
| `description` | Description of agent |
| `functions` |  |
| `guardrails` | The guardrails the agent is attached to |
| `if_case` |  |
| `instruction` | Agent instruction. |
| `k` |  |
| `knowledge_bases` | Knowledge bases |
| `logging_config` |  |
| `max_tokens` |  |
| `mcp_servers` | MCP (Model Context Protocol) servers attached to this agent |
| `model` | Description of a Model |
| `model_provider_key` |  |
| `model_router` | Model router |
| `name` | Agent name |
| `openai_api_key` | OpenAI API Key Info |
| `parent_agents` | Parent agents |
| `project_id` |  |
| `provide_citations` | Whether the agent should provide in-response citations |
| `reasoning_effort` | The reasoning effort for the agent |
| `region` | Region code |
| `retrieval_method` | - RETRIEVAL_METHOD_UNKNOWN: The retrieval method is unknown - RETRIEVAL_METHOD_REWRITE: The retrieval method is rewrite - RETRIEVAL_METHOD_STEP_BACK: The retrieval method is step back - RETRIEVAL_METHOD_SUB_QUERIES: The retrieval method is… |
| `route_created_at` | Creation of route date / time |
| `route_created_by` |  |
| `route_name` | Route name |
| `route_uuid` |  |
| `tags` | Agent tag to organize related resources |
| `temperature` |  |
| `template` | Represents an AgentTemplate entity |
| `thinking_token_budget` | The thinking token budget for Anthropic extended thinking (0 = disabled) |
| `top_p` |  |
| `updated_at` | Last modified |
| `url` | Access your agent under this url |
| `user_id` | Id of user that created the agent |
| `uuid` | Unique agent id |
| `version_hash` | The latest version of the agent |
| `vpc_egress_ips` | VPC Egress IPs |
| `vpc_uuid` |  |
| `web_fetch_enabled` | Whether this agent can use the built-in web_fetch tool. |
| `web_search_enabled` | Whether this agent can use the built-in web_search tool. |
| `workspace` |  |

Operations: list.

API path: `/v2/gen-ai/anthropic/keys/{uuid}/agents`

#### ApiListAgentsByOpenAiKeyOutput

| Field | Description |
| --- | --- |
| `anthropic_api_key` | Anthropic API Key Info |
| `api_key_infos` | Api key infos |
| `api_keys` | Api keys |
| `chatbot` | A Chatbot |
| `chatbot_identifiers` | Chatbot identifiers |
| `child_agents` | Child agents |
| `conversation_logs_enabled` | Whether conversation logs are enabled for the agent |
| `created_at` | Creation date / time |
| `deployment` | Description of deployment |
| `description` | Description of agent |
| `functions` |  |
| `guardrails` | The guardrails the agent is attached to |
| `if_case` |  |
| `instruction` | Agent instruction. |
| `k` |  |
| `knowledge_bases` | Knowledge bases |
| `logging_config` |  |
| `max_tokens` |  |
| `mcp_servers` | MCP (Model Context Protocol) servers attached to this agent |
| `model` | Description of a Model |
| `model_provider_key` |  |
| `model_router` | Model router |
| `name` | Agent name |
| `openai_api_key` | OpenAI API Key Info |
| `parent_agents` | Parent agents |
| `project_id` |  |
| `provide_citations` | Whether the agent should provide in-response citations |
| `reasoning_effort` | The reasoning effort for the agent |
| `region` | Region code |
| `retrieval_method` | - RETRIEVAL_METHOD_UNKNOWN: The retrieval method is unknown - RETRIEVAL_METHOD_REWRITE: The retrieval method is rewrite - RETRIEVAL_METHOD_STEP_BACK: The retrieval method is step back - RETRIEVAL_METHOD_SUB_QUERIES: The retrieval method is… |
| `route_created_at` | Creation of route date / time |
| `route_created_by` |  |
| `route_name` | Route name |
| `route_uuid` |  |
| `tags` | Agent tag to organize related resources |
| `temperature` |  |
| `template` | Represents an AgentTemplate entity |
| `thinking_token_budget` | The thinking token budget for Anthropic extended thinking (0 = disabled) |
| `top_p` |  |
| `updated_at` | Last modified |
| `url` | Access your agent under this url |
| `user_id` | Id of user that created the agent |
| `uuid` | Unique agent id |
| `version_hash` | The latest version of the agent |
| `vpc_egress_ips` | VPC Egress IPs |
| `vpc_uuid` |  |
| `web_fetch_enabled` | Whether this agent can use the built-in web_fetch tool. |
| `web_search_enabled` | Whether this agent can use the built-in web_search tool. |
| `workspace` |  |

Operations: list.

API path: `/v2/gen-ai/openai/keys/{uuid}/agents`

#### ApiListAgentsByWorkspaceOutput

| Field | Description |
| --- | --- |
| `anthropic_api_key` | Anthropic API Key Info |
| `api_key_infos` | Api key infos |
| `api_keys` | Api keys |
| `chatbot` | A Chatbot |
| `chatbot_identifiers` | Chatbot identifiers |
| `child_agents` | Child agents |
| `conversation_logs_enabled` | Whether conversation logs are enabled for the agent |
| `created_at` | Creation date / time |
| `deployment` | Description of deployment |
| `description` | Description of agent |
| `functions` |  |
| `guardrails` | The guardrails the agent is attached to |
| `if_case` |  |
| `instruction` | Agent instruction. |
| `k` |  |
| `knowledge_bases` | Knowledge bases |
| `logging_config` |  |
| `max_tokens` |  |
| `mcp_servers` | MCP (Model Context Protocol) servers attached to this agent |
| `model` | Description of a Model |
| `model_provider_key` |  |
| `model_router` | Model router |
| `name` | Agent name |
| `openai_api_key` | OpenAI API Key Info |
| `parent_agents` | Parent agents |
| `project_id` |  |
| `provide_citations` | Whether the agent should provide in-response citations |
| `reasoning_effort` | The reasoning effort for the agent |
| `region` | Region code |
| `retrieval_method` | - RETRIEVAL_METHOD_UNKNOWN: The retrieval method is unknown - RETRIEVAL_METHOD_REWRITE: The retrieval method is rewrite - RETRIEVAL_METHOD_STEP_BACK: The retrieval method is step back - RETRIEVAL_METHOD_SUB_QUERIES: The retrieval method is… |
| `route_created_at` | Creation of route date / time |
| `route_created_by` |  |
| `route_name` | Route name |
| `route_uuid` |  |
| `tags` | Agent tag to organize related resources |
| `temperature` |  |
| `template` | Represents an AgentTemplate entity |
| `thinking_token_budget` | The thinking token budget for Anthropic extended thinking (0 = disabled) |
| `top_p` |  |
| `updated_at` | Last modified |
| `url` | Access your agent under this url |
| `user_id` | Id of user that created the agent |
| `uuid` | Unique agent id |
| `version_hash` | The latest version of the agent |
| `vpc_egress_ips` | VPC Egress IPs |
| `vpc_uuid` |  |
| `web_fetch_enabled` | Whether this agent can use the built-in web_fetch tool. |
| `web_search_enabled` | Whether this agent can use the built-in web_search tool. |
| `workspace` |  |

Operations: list.

API path: `/v2/gen-ai/workspaces/{workspace_uuid}/agents`

#### ApiListEvaluationMetricsOutput

| Field | Description |
| --- | --- |
| `associated_presets` | Saved model evaluation presets that reference this metric. |
| `category` |  |
| `custom_eval_config` | Configuration for a custom model-evaluation metric scored by an LLM judge. |
| `description` |  |
| `evaluation_scope` | Scope that determines whether a metric belongs to agent evaluation or model evaluation. |
| `inverted` | If true, the metric is inverted, meaning that a lower value is better. |
| `is_metric_goal` |  |
| `metric_name` |  |
| `metric_rank` |  |
| `metric_type` |  |
| `metric_uuid` |  |
| `metric_value_type` |  |
| `range_max` | The maximum value for the metric. |
| `range_min` | The minimum value for the metric. |
| `source` | Distinguishes platform catalog metrics from user-defined LLM-as-judge metrics. |

Operations: list.

API path: `/v2/gen-ai/evaluation_metrics`

#### ApiListEvaluationRunsByTestCaseOutput

| Field | Description |
| --- | --- |
| `agent_deleted` | Whether agent is deleted |
| `agent_deployment_name` | The agent deployment name |
| `agent_name` | Agent name |
| `agent_uuid` | Agent UUID. |
| `agent_version_hash` | Version hash |
| `agent_workspace_uuid` | Agent workspace uuid |
| `created_by_user_email` |  |
| `created_by_user_id` |  |
| `error_description` | The error description |
| `evaluation_run_uuid` | Evaluation run UUID. |
| `evaluation_test_case_workspace_uuid` | Evaluation test case workspace uuid |
| `finished_at` | Run end time. |
| `pass_status` | The pass status of the evaluation run based on the star metric. |
| `queued_at` | Run queued time. |
| `run_level_metric_results` |  |
| `run_name` | Run name. |
| `star_metric_result` |  |
| `started_at` | Run start time. |
| `status` | Evaluation Run Statuses |
| `test_case_description` | Test case description. |
| `test_case_name` | Test case name. |
| `test_case_uuid` | Test-case UUID. |
| `test_case_version` | Test-case-version. |

Operations: list.

API path: `/v2/gen-ai/evaluation_test_cases/{evaluation_test_case_uuid}/evaluation_runs`

#### ApiListEvaluationTestCasesByWorkspaceOutput

| Field | Description |
| --- | --- |
| `archived_at` |  |
| `created_at` |  |
| `created_by_user_email` |  |
| `created_by_user_id` |  |
| `dataset` |  |
| `dataset_name` |  |
| `dataset_uuid` |  |
| `description` |  |
| `latest_version_number_of_runs` |  |
| `metrics` |  |
| `name` |  |
| `star_metric` |  |
| `test_case_uuid` |  |
| `total_runs` |  |
| `updated_at` |  |
| `updated_by_user_email` |  |
| `updated_by_user_id` |  |
| `version` |  |

Operations: list.

API path: `/v2/gen-ai/workspaces/{workspace_uuid}/evaluation_test_cases`

#### ApiListKnowledgeBaseDataSourcesOutput

| Field | Description |
| --- | --- |
| `aws_data_source` | AWS S3 Data Source for Display |
| `bucket_name` | Name of storage bucket - Deprecated, moved to data_source_details |
| `chunking_algorithm` |  |
| `chunking_options` |  |
| `created_at` | Creation date / time |
| `dropbox_data_source` | Dropbox Data Source for Display |
| `file_upload_data_source` | File to upload as data source for knowledge base. |
| `google_drive_data_source` | Google Drive Data Source for Display |
| `item_path` | Path of folder or object in bucket - Deprecated, moved to data_source_details |
| `last_datasource_indexing_job` |  |
| `region` | Region code - Deprecated, moved to data_source_details |
| `spaces_data_source` | Spaces Bucket Data Source |
| `updated_at` | Last modified |
| `uuid` | Unique id of knowledge base |
| `web_crawler_data_source` | WebCrawlerDataSource |

Operations: list.

API path: `/v2/gen-ai/knowledge_bases/{knowledge_base_uuid}/data_sources`

#### ApiListKnowledgeBaseIndexingJobsOutput

| Field | Description |
| --- | --- |
| `completed_datasources` | Number of datasources indexed completed |
| `created_at` | Creation date / time |
| `data_source_jobs` | Details on Data Sources included in the Indexing Job |
| `data_source_uuids` |  |
| `finished_at` |  |
| `is_report_available` | Boolean value to determine if the indexing job details are available |
| `knowledge_base_uuid` | Knowledge base id |
| `phase` |  |
| `started_at` |  |
| `status` |  |
| `tokens` | Number of tokens [This field is deprecated] |
| `total_datasources` | Number of datasources being indexed |
| `total_tokens` | Total Tokens Consumed By the Indexing Job |
| `updated_at` | Last modified |
| `uuid` | Unique id |

Operations: list.

API path: `/v2/gen-ai/knowledge_bases/{knowledge_base_uuid}/indexing_jobs`

#### ApiListModelEvaluationMetricsOutput

| Field | Description |
| --- | --- |
| `associated_presets` | Saved model evaluation presets that reference this metric. |
| `category` |  |
| `custom_eval_config` | Configuration for a custom model-evaluation metric scored by an LLM judge. |
| `description` |  |
| `evaluation_scope` | Scope that determines whether a metric belongs to agent evaluation or model evaluation. |
| `inverted` | If true, the metric is inverted, meaning that a lower value is better. |
| `is_metric_goal` |  |
| `metric_name` |  |
| `metric_rank` |  |
| `metric_type` |  |
| `metric_uuid` |  |
| `metric_value_type` |  |
| `range_max` | The maximum value for the metric. |
| `range_min` | The minimum value for the metric. |
| `source` | Distinguishes platform catalog metrics from user-defined LLM-as-judge metrics. |

Operations: list.

API path: `/v2/gen-ai/model_evaluation_metrics`

#### ApiListScenarioLibraryOutput

| Field | Description |
| --- | --- |
| `category` | Optional grouping for catalog browsing (e.g. |
| `created_at` | Time created at. |
| `description` | Curated description. |
| `goal_description` | The goal this scenario set demonstrates, shown as context alongside goal-driven generation. |
| `library_scenario_uuid` | UUID of the library entry. |
| `name` | Curated display name. |
| `scenario_count` | Number of scenarios in the library entry. |
| `status` | Lifecycle status of a Common Scenario & Goal Library entry. |
| `updated_at` | Time last updated at. |

Operations: list.

API path: `/v2/gen-ai/scenario_library`

#### ApiListScenariosOutput

| Field | Description |
| --- | --- |
| `description` | What the user tries to accomplish. |
| `exploration_budget` | Number of journeys to explore for this scenario. |
| `max_turns` | Turn budget for the scenario. |
| `name` | Human-readable name for the scenario. |
| `scenario_uuid` | Unique id for the scenario. |
| `stopping_criteria` | Judge stopping criteria. |
| `user_persona` | How the user communicates (tone, role). |

Operations: list.

API path: `/v2/gen-ai/scenario_library/{library_scenario_uuid}/scenarios`

#### ApiListSimulationJourneysOutput

| Field | Description |
| --- | --- |
| `created_at` | Time created at. |
| `duration_sec` | Wall-clock time taken for the journey to complete, in seconds. |
| `failure_reason` | Human-readable explanation of a terminal FAILED status. |
| `journey_index` | Zero-based index of this journey within its scenario's exploration budget. |
| `journey_uuid` | UUID of the journey. |
| `judge_reasoning` | Optional judge reasoning for the verdict. |
| `run_uuid` | UUID of the run this journey belongs to. |
| `scenario_uuid` | UUID of the scenario this journey executed. |
| `session_id` | Session identifier for this journey. |
| `status` | Lifecycle status of a single journey. |
| `token_usage` | Per-actor token accounting for a run or journey. |
| `trajectory_bucket_name` | Object storage bucket holding the trajectory JSON. |
| `trajectory_bucket_region` | Object storage bucket region for the trajectory JSON. |
| `trajectory_spaces_key` | Object storage key for the trajectory JSON. |
| `updated_at` | Time last updated at. |
| `verdict` | The judge's verdict for a journey. |

Operations: list.

API path: `/v2/gen-ai/simulation_runs/{run_uuid}/journeys`

#### ApiModelCatalogCard

| Field | Description |
| --- | --- |
| `availability` |  |
| `badges` | Badges for models |
| `benchmark_score` | Benchmark scores for this model, stored as arbitrary JSON |
| `capabilities` |  |
| `code_snippets` | Code examples for using the model |
| `context_window` | Specs (same as Entry) |
| `created_at` | RFC 3339 timestamp indicating when the model was added to the catalog. |
| `creator` | Model creator/developer (e.g., "Meta", "Anthropic", "OpenAI") |
| `description` | Card-specific |
| `hugging_face_id` | The Hugging Face repository ID (e.g. |
| `id` | Identity (same as Entry) |
| `max_output_tokens` | The maximum number of output tokens the model can generate in a single response. |
| `modalities` | Input/output modalities |
| `model_id` | Model identifier used for API calls (e.g., "llama3.1-70b-instruct") |
| `name` |  |
| `parameter_count` |  |
| `pricing` | Pricing per million tokens (aligns with existing ModelPrice pattern) |
| `pricing_detail` | The complete set of prices for a model, covering every available variant. |
| `provider` |  |
| `scaled_pricing_enabled` | True when this model's pricing varies over time. |
| `short_description` |  |
| `type` |  |

Operations: list, load.

API path: `/v2/gen-ai/models/catalog`

#### ApiModelEvaluationPreset

| Field | Description |
| --- | --- |
| `candidate_inference_config` | Inference configuration for the candidate model during evaluation. |
| `candidate_model_name` | Model slug used to call the candidate model API. |
| `candidate_model_source` | Whether the candidate is a served model (serverless platform, a dedicated deployment, or a model router) or an OHS-hosted agent config. |
| `candidate_model_uuid` | UUID of the candidate model stored on this preset. |
| `candidate_system_prompt` | System prompt / instructions to send to the candidate model. |
| `created_at` | Timestamp when the preset was created. |
| `dataset_name` | Display name of the dataset stored on this preset. |
| `dataset_uuid` | UUID of the dataset stored on this preset. |
| `eval_preset_uuid` | UUID of the evaluation preset. |
| `id` |  |
| `judge_model_name` | Display name of the judge model stored on this preset. |
| `judge_model_uuid` | UUID of the judge model stored on this preset. |
| `metrics` | Metrics selected for this preset. |
| `name` | Name of the evaluation preset. |
| `saved_sections` | Sections of the inline evaluation config that were persisted when this preset was created. |
| `star_metric` |  |

Operations: list, load.

API path: `/v2/gen-ai/model_evaluation_presets`

#### ApiModelPublic

| Field | Description |
| --- | --- |
| `agreement` | Agreement Description |
| `benchmark_score` | Benchmark scores for this model, stored as arbitrary JSON |
| `capabilities` | Model capabilities (inference, reasoning, vectorization, etc.) |
| `context_window` | Context window (maximum tokens) |
| `created_at` | Creation date / time |
| `description` | Model description |
| `endpoints` | Available endpoints and their capabilities |
| `id` | Human-readable model identifier |
| `is_foundational` | True if it is a foundational model provided by do |
| `kb_default_chunk_size` | Default chunking size limit to show in UI |
| `kb_max_chunk_size` | Maximum chunk size limit of model |
| `kb_min_chunk_size` | Minimum chunking size token limits if model supports KNOWLEDGEBASE usecase |
| `lifecycle_status` | Lifecycle status of the model (internal, public-preview, active, deprecated, end_of_life) |
| `modalities` | Input/output modalities |
| `model_availability` | Model availability (serverless, dedicated, etc.) |
| `name` | Display name of the model |
| `parameter_count` | Parameter count in billions |
| `parent_uuid` | Unique id of the model, this model is based on |
| `pricing` | Pricing per million tokens (aligns with existing ModelPrice pattern) |
| `provider` |  |
| `reasoning_efforts` | Available reasoning efforts for this model |
| `settings` | Playground settings derived from model metadata |
| `thinking` | Whether this model supports extended thinking (Anthropic models) |
| `type` | Model type (chat, embedding, image, reasoning, coding) |
| `updated_at` | Last modified |
| `upload_complete` | Model has been fully uploaded |
| `url` | Download url |
| `uuid` | Unique id |
| `version` | Version Information about a Model |

Operations: list.

API path: `/v2/gen-ai/models`

#### ApiModelRouterPreset

| Field | Description |
| --- | --- |
| `config` |  |
| `display_name` | Display name for UI surfaces |
| `long_description` | Long description for details views |
| `short_description` | Short description for list views |
| `slug` | Stable slug for routing usage |

Operations: list.

API path: `/v2/gen-ai/models/routers/presets`

#### ApiModelRouterTaskPreset

| Field | Description |
| --- | --- |
| `category` | Higher-level grouping used by the UI |
| `description` | Task description |
| `models` | Default models assigned to this task |
| `name` | Display name |
| `selection_policy` | Selection policy preference for choosing among assigned models. |
| `tags` | Lightweight labels for filtering |
| `task_slug` | Task slug |

Operations: list.

API path: `/v2/gen-ai/models/routers/tasks/presets`

#### ApiMoveAgentsToWorkspaceOutput

| Field | Description |
| --- | --- |
| `agent_uuids` | Agent uuids |
| `agents` | Agents |
| `created_at` | Creation date |
| `created_by` | The id of user who created this workspace |
| `created_by_email` | The email of the user who created this workspace |
| `deleted_at` | Deleted date |
| `description` | Description of the workspace |
| `evaluation_test_cases` | Evaluations |
| `name` | Name of the workspace |
| `updated_at` | Update date |
| `uuid` | Unique id |
| `workspace_uuid` | Workspace uuid to move agents to |

Operations: update.

API path: `/v2/gen-ai/workspaces/{workspace_uuid}/agents`

#### ApiPrompt

| Field | Description |
| --- | --- |
| `evaluation_trace_spans` | The evaluated trace spans. |
| `ground_truth` | The ground truth for the prompt. |
| `input` |  |
| `input_tokens` | The number of input tokens used in the prompt. |
| `output` |  |
| `output_tokens` | The number of output tokens used in the prompt. |
| `prompt_chunks` | The list of prompt chunks. |
| `prompt_id` | Prompt ID |
| `prompt_level_metric_results` | The metric results for the prompt. |
| `trace_id` | The trace id for the prompt. |

Operations: load.

API path: `/v2/gen-ai/evaluation_runs/{evaluation_run_uuid}/results/{prompt_id}`

#### ApiRollbackToAgentVersionOutput

| Field | Description |
| --- | --- |
| `audit_header` | An alternative way to provide auth information. |
| `uuid` | Agent unique identifier |
| `version_hash` | Unique identifier |

Operations: update.

API path: `/v2/gen-ai/agents/{uuid}/versions`

#### ApiSimulationJourney

| Field | Description |
| --- | --- |
| `created_at` | Time created at. |
| `duration_sec` | Wall-clock time taken for the journey to complete, in seconds. |
| `failure_reason` | Human-readable explanation of a terminal FAILED status. |
| `id` |  |
| `journey_index` | Zero-based index of this journey within its scenario's exploration budget. |
| `journey_uuid` | UUID of the journey. |
| `judge_reasoning` | Optional judge reasoning for the verdict. |
| `run_uuid` | UUID of the run this journey belongs to. |
| `scenario_uuid` | UUID of the scenario this journey executed. |
| `session_id` | Session identifier for this journey. |
| `status` | Lifecycle status of a single journey. |
| `token_usage` | Per-actor token accounting for a run or journey. |
| `trajectory_bucket_name` | Object storage bucket holding the trajectory JSON. |
| `trajectory_bucket_region` | Object storage bucket region for the trajectory JSON. |
| `trajectory_spaces_key` | Object storage key for the trajectory JSON. |
| `updated_at` | Time last updated at. |
| `verdict` | The judge's verdict for a journey. |

Operations: load.

API path: `/v2/gen-ai/simulation_runs/{run_uuid}/journeys/{journey_uuid}`

#### ApiSimulationTrajectory

| Field | Description |
| --- | --- |
| `agent_id` | Identifier of the candidate agent under test for this journey. |
| `completed_at` |  |
| `duration_sec` |  |
| `evaluation_metrics` | Per-metric scores and judge reasoning for this trajectory. |
| `failure_reason` |  |
| `journey_index` |  |
| `journey_uuid` |  |
| `judge` | Judge output embedded in the trajectory JSON. |
| `max_turns` | Turn budget configured for this journey (per-scenario max_turns, after any run-level override). |
| `messages` |  |
| `run_uuid` |  |
| `scenario_uuid` |  |
| `session_id` |  |
| `started_at` |  |
| `status` | Lifecycle status of the trajectory. |
| `token_usage` | Per-actor token accounting for a run or journey. |
| `turn_count` |  |
| `verdict` | The judge's verdict for a journey. |

Operations: load.

API path: `/v2/gen-ai/simulation_runs/{run_uuid}/journeys/{journey_uuid}/trajectory`

#### ApiUnlinkAgentFunctionOutput

| Field | Description |
| --- | --- |

Operations: remove.

API path: `/v2/gen-ai/agents/{agent_uuid}/functions/{function_uuid}`

#### ApiUnlinkAgentGuardrailOutput

| Field | Description |
| --- | --- |

Operations: remove.

API path: `/v2/gen-ai/agents/{agent_uuid}/guardrails/{guardrail_uuid}`

#### ApiUnlinkAgentOutput

| Field | Description |
| --- | --- |

Operations: remove.

API path: `/v2/gen-ai/agents/{parent_agent_uuid}/child_agents/{child_agent_uuid}`

#### ApiUnlinkKnowledgeBaseOutput

| Field | Description |
| --- | --- |

Operations: remove.

API path: `/v2/gen-ai/agents/{agent_uuid}/knowledge_bases/{knowledge_base_uuid}`

#### ApiUpdateAgentApiKeyOutput

| Field | Description |
| --- | --- |
| `agent_uuid` | Agent id |
| `api_key_uuid` | API key ID |
| `created_at` | Creation date |
| `created_by` | Created by |
| `deleted_at` | Deleted date |
| `name` | Name |
| `secret_key` |  |
| `uuid` | Uuid |

Operations: update.

API path: `/v2/gen-ai/agents/{agent_uuid}/api_keys/{api_key_uuid}`

#### ApiUpdateAgentFunctionOutput

| Field | Description |
| --- | --- |
| `agent_uuid` | Agent id |
| `anthropic_api_key` | Anthropic API Key Info |
| `api_key_infos` | Api key infos |
| `api_keys` | Api keys |
| `chatbot` | A Chatbot |
| `chatbot_identifiers` | Chatbot identifiers |
| `child_agents` | Child agents |
| `conversation_logs_enabled` | Whether conversation logs are enabled for the agent |
| `created_at` | Creation date / time |
| `deployment` | Description of deployment |
| `description` | Description of agent |
| `faas_name` | The name of the function in the DigitalOcean functions platform |
| `faas_namespace` | The namespace of the function in the DigitalOcean functions platform |
| `function_name` | Function name |
| `function_uuid` | Function id |
| `functions` |  |
| `guardrails` | The guardrails the agent is attached to |
| `if_case` |  |
| `input_schema` | Describe the input schema for the function so the agent may call it |
| `instruction` | Agent instruction. |
| `k` |  |
| `knowledge_bases` | Knowledge bases |
| `logging_config` |  |
| `max_tokens` |  |
| `mcp_servers` | MCP (Model Context Protocol) servers attached to this agent |
| `model` | Description of a Model |
| `model_provider_key` |  |
| `model_router` | Model router |
| `name` | Agent name |
| `openai_api_key` | OpenAI API Key Info |
| `output_schema` | Describe the output schema for the function so the agent handle its response |
| `parent_agents` | Parent agents |
| `project_id` |  |
| `provide_citations` | Whether the agent should provide in-response citations |
| `reasoning_effort` | The reasoning effort for the agent |
| `region` | Region code |
| `retrieval_method` | - RETRIEVAL_METHOD_UNKNOWN: The retrieval method is unknown - RETRIEVAL_METHOD_REWRITE: The retrieval method is rewrite - RETRIEVAL_METHOD_STEP_BACK: The retrieval method is step back - RETRIEVAL_METHOD_SUB_QUERIES: The retrieval method is… |
| `route_created_at` | Creation of route date / time |
| `route_created_by` |  |
| `route_name` | Route name |
| `route_uuid` |  |
| `tags` | Agent tag to organize related resources |
| `temperature` |  |
| `template` | Represents an AgentTemplate entity |
| `thinking_token_budget` | The thinking token budget for Anthropic extended thinking (0 = disabled) |
| `top_p` |  |
| `updated_at` | Last modified |
| `url` | Access your agent under this url |
| `user_id` | Id of user that created the agent |
| `uuid` | Unique agent id |
| `version_hash` | The latest version of the agent |
| `vpc_egress_ips` | VPC Egress IPs |
| `vpc_uuid` |  |
| `web_fetch_enabled` | Whether this agent can use the built-in web_fetch tool. |
| `web_search_enabled` | Whether this agent can use the built-in web_search tool. |
| `workspace` |  |

Operations: update.

API path: `/v2/gen-ai/agents/{agent_uuid}/functions/{function_uuid}`

#### ApiUpdateAgentOutput

| Field | Description |
| --- | --- |
| `agent_log_insights_enabled` |  |
| `allowed_domains` | Optional list of allowed domains for the chatbot - Must use fully qualified domain name (FQDN) such as https://example.com |
| `anthropic_api_key` | Anthropic API Key Info |
| `anthropic_key_uuid` | Optional anthropic key uuid for use with anthropic models |
| `api_key_infos` | Api key infos |
| `api_keys` | Api keys |
| `chatbot` | A Chatbot |
| `chatbot_identifiers` | Chatbot identifiers |
| `child_agents` | Child agents |
| `clear_mcp_servers` | When true, removes all MCP servers from the agent. |
| `conversation_logs_enabled` | Whether conversation logs are enabled for the agent |
| `created_at` | Creation date / time |
| `deployment` | Description of deployment |
| `description` | Description of agent |
| `functions` |  |
| `guardrails` | The guardrails the agent is attached to |
| `if_case` |  |
| `instruction` | Agent instruction. |
| `k` | How many results should be considered from an attached knowledge base |
| `knowledge_bases` | Knowledge bases |
| `logging_config` |  |
| `max_tokens` | Specifies the maximum number of tokens the model can process in a single input or output, set as a number between 1 and 512. |
| `mcp_servers` | MCP (Model Context Protocol) servers attached to this agent |
| `model` | Description of a Model |
| `model_provider_key` |  |
| `model_provider_key_uuid` | Optional Model Provider uuid for use with provider models |
| `model_router` | Model router |
| `model_router_uuid` |  |
| `model_uuid` | Identifier for the foundation model. |
| `name` | Agent name |
| `open_ai_key_uuid` | Optional OpenAI key uuid for use with OpenAI models |
| `openai_api_key` | OpenAI API Key Info |
| `parent_agents` | Parent agents |
| `project_id` | The id of the DigitalOcean project this agent will belong to |
| `provide_citations` | Whether the agent should provide in-response citations |
| `reasoning_effort` | The reasoning effort for the agent |
| `region` | Region code |
| `retrieval_method` | - RETRIEVAL_METHOD_UNKNOWN: The retrieval method is unknown - RETRIEVAL_METHOD_REWRITE: The retrieval method is rewrite - RETRIEVAL_METHOD_STEP_BACK: The retrieval method is step back - RETRIEVAL_METHOD_SUB_QUERIES: The retrieval method is… |
| `route_created_at` | Creation of route date / time |
| `route_created_by` |  |
| `route_name` | Route name |
| `route_uuid` |  |
| `router_preset_slug` |  |
| `tags` | Agent tag to organize related resources |
| `temperature` | Controls the model’s creativity, specified as a number between 0 and 1. |
| `template` | Represents an AgentTemplate entity |
| `thinking_token_budget` | The thinking token budget for Anthropic extended thinking (0 = disabled) |
| `top_p` | Defines the cumulative probability threshold for word selection, specified as a number between 0 and 1. |
| `updated_at` | Last modified |
| `url` | Access your agent under this url |
| `user_id` | Id of user that created the agent |
| `uuid` | Unique agent id |
| `version_hash` | The latest version of the agent |
| `vpc_egress_ips` | VPC Egress IPs |
| `vpc_uuid` |  |
| `web_fetch_enabled` | Whether this agent can use the built-in web_fetch tool. |
| `web_search_enabled` | Whether this agent can use the built-in web_search tool. |
| `workspace` |  |

Operations: update.

API path: `/v2/gen-ai/agents/{uuid}`

#### ApiUpdateAnthropicApiKeyOutput

| Field | Description |
| --- | --- |
| `api_key` | Anthropic API key |
| `api_key_uuid` | API key ID |
| `created_at` | Key creation date |
| `created_by` | Created by user id from DO |
| `deleted_at` | Key deleted date |
| `name` | Name |
| `updated_at` | Key last updated date |
| `uuid` | Uuid |

Operations: update.

API path: `/v2/gen-ai/anthropic/keys/{api_key_uuid}`

#### ApiUpdateCustomEvaluationMetricOutput

| Field | Description |
| --- | --- |
| `associated_presets` | Saved model evaluation presets that reference this metric. |
| `category` |  |
| `config` | Configuration for a custom model-evaluation metric scored by an LLM judge. |
| `custom_eval_config` | Configuration for a custom model-evaluation metric scored by an LLM judge. |
| `description` |  |
| `evaluation_scope` | Scope that determines whether a metric belongs to agent evaluation or model evaluation. |
| `inverted` | If true, the metric is inverted, meaning that a lower value is better. |
| `is_metric_goal` |  |
| `metric_name` |  |
| `metric_rank` |  |
| `metric_type` |  |
| `metric_uuid` |  |
| `metric_value_type` |  |
| `range_max` | The maximum value for the metric. |
| `range_min` | The minimum value for the metric. |
| `source` | Distinguishes platform catalog metrics from user-defined LLM-as-judge metrics. |

Operations: create, update.

API path: `/v2/gen-ai/custom_evaluation_metrics`

#### ApiUpdateEvaluationTestCaseOutput

| Field | Description |
| --- | --- |
| `dataset_uuid` | Dataset against which the test‑case is executed. |
| `description` | Description of the test case. |
| `metrics` |  |
| `name` | Name of the test case. |
| `star_metric` |  |
| `test_case_uuid` | Test-case UUID to update |
| `version` | The new verson of the test case. |

Operations: update.

API path: `/v2/gen-ai/evaluation_test_cases/{test_case_uuid}`

#### ApiUpdateKnowledgeBaseDataSourceOutput

| Field | Description |
| --- | --- |
| `aws_data_source` | AWS S3 Data Source for Display |
| `bucket_name` | Name of storage bucket - Deprecated, moved to data_source_details |
| `chunking_algorithm` |  |
| `chunking_options` |  |
| `created_at` | Creation date / time |
| `data_source_uuid` | Data Source ID (Path Parameter) |
| `dropbox_data_source` | Dropbox Data Source for Display |
| `file_upload_data_source` | File to upload as data source for knowledge base. |
| `google_drive_data_source` | Google Drive Data Source for Display |
| `item_path` | Path of folder or object in bucket - Deprecated, moved to data_source_details |
| `knowledge_base_uuid` | Knowledge Base ID (Path Parameter) |
| `last_datasource_indexing_job` |  |
| `region` | Region code - Deprecated, moved to data_source_details |
| `spaces_data_source` | Spaces Bucket Data Source |
| `updated_at` | Last modified |
| `uuid` | Unique id of knowledge base |
| `web_crawler_data_source` | WebCrawlerDataSource |

Operations: update.

API path: `/v2/gen-ai/knowledge_bases/{knowledge_base_uuid}/data_sources/{data_source_uuid}`

#### ApiUpdateKnowledgeBaseOutput

| Field | Description |
| --- | --- |
| `added_to_agent_at` | Time when the knowledge base was added to the agent |
| `created_at` | Creation date / time |
| `database_id` | Identifier of the DigitalOcean OpenSearch database this knowledge base will use, optional. |
| `datasources` | Optional data sources to attach at creation. |
| `embedding_model_uuid` | Identifier for the [embedding model](https://docs.digitalocean.com/products/genai-platform/details/models/#embedding-models). |
| `is_public` | Whether the knowledge base is public or not |
| `last_indexing_job` | IndexingJob description |
| `name` | Name of knowledge base |
| `project_id` | Identifier of the DigitalOcean project this knowledge base will belong to. |
| `region` | Region code |
| `reranking_config` | Configuration for cross-encoder reranking during retrieval. |
| `size` |  |
| `tags` | Tags to organize related resources |
| `updated_at` | Last modified |
| `user_id` | Id of user that created the knowledge base |
| `uuid` | Unique id for knowledge base |
| `vpc_uuid` | The VPC to deploy the knowledge base database in |

Operations: create, list, update.

API path: `/v2/gen-ai/knowledge_bases`

#### ApiUpdateLinkedAgentOutput

| Field | Description |
| --- | --- |
| `child_agent_uuid` | Routed agent id |
| `if_case` | Describes the case in which the child agent should be used |
| `parent_agent_uuid` | A unique identifier for the parent agent. |
| `rollback` |  |
| `route_name` | Route name |
| `uuid` | Unique id of linkage |

Operations: update.

API path: `/v2/gen-ai/agents/{parent_agent_uuid}/child_agents/{child_agent_uuid}`

#### ApiUpdateModelApiKeyOutput

| Field | Description |
| --- | --- |
| `api_key_uuid` | API key ID |
| `created_at` | Creation date |
| `created_by` | Created by |
| `deleted_at` | Deleted date |
| `name` | Name |
| `secret_key` |  |
| `uuid` | Uuid |

Operations: update.

API path: `/v2/gen-ai/models/api_keys/{api_key_uuid}`

#### ApiUpdateModelEvaluationRunOutput

| Field | Description |
| --- | --- |
| `candidate_inference_config` | Inference configuration for the candidate model during evaluation. |
| `candidate_model_name` | Model slug used to call the candidate model API. |
| `candidate_model_source` | Whether the candidate is a served model (serverless platform, a dedicated deployment, or a model router) or an OHS-hosted agent config. |
| `candidate_model_uuid` | UUID of the candidate model to evaluate. |
| `created_at` | Timestamp when the run was created. |
| `dataset_name` | Name of the dataset used for evaluation. |
| `dataset_uuid` | UUID of the dataset to use for evaluation. |
| `epochs` | Number of times to evaluate each dataset row (n-pass/epochs), so the result reports avg@k/pass@k/cons@k instead of a single score. |
| `eval_preset_uuid` |  |
| `eval_run_uuid` | UUID of the created evaluation run. |
| `judge_model_name` |  |
| `judge_model_uuid` | UUID of the judge model used to score responses. |
| `metric_uuids` | UUIDs of metrics to evaluate (selected from ListModelEvaluationMetrics). |
| `name` | Name of the evaluation run. |
| `preset_name` |  |
| `preset_save_sections` | Which sections of this run's resolved configuration to persist as a reusable preset. |
| `progress` | Per-phase progress for a model evaluation run. |
| `save_as_preset` | Deprecated: use `preset_save_sections`. |
| `source` | Source of the run creation (api, sdk, cli). |
| `star_metric` |  |
| `status` | Model Evaluation Run Statuses |

Operations: create, list, update.

API path: `/v2/gen-ai/model_evaluation_runs`

#### ApiUpdateModelRouterOutput

| Field | Description |
| --- | --- |
| `config` |  |
| `created_at` | Creation date / time |
| `description` | Description |
| `fallback_models` |  |
| `name` | Name of the model router |
| `policies` | Router policies |
| `regions` | Target regions for the router |
| `updated_at` | Last modified |
| `uuid` | Unique id |

Operations: update.

API path: `/v2/gen-ai/models/routers/{uuid}`

#### ApiUpdateOpenAiapiKeyOutput

| Field | Description |
| --- | --- |
| `api_key` | OpenAI API key |
| `api_key_uuid` | API key ID |
| `created_at` | Key creation date |
| `created_by` | Created by user id from DO |
| `deleted_at` | Key deleted date |
| `models` | Models supported by the openAI api key |
| `name` | Name |
| `updated_at` | Key last updated date |
| `uuid` | Uuid |

Operations: update.

API path: `/v2/gen-ai/openai/keys/{api_key_uuid}`

#### ApiUpdateScenarioSetOutput

| Field | Description |
| --- | --- |
| `bucket_name` | Object storage bucket holding the scenario file. |
| `bucket_region` | Object storage bucket region. |
| `created_at` | Time created at. |
| `deleted_at` | Time deleted at. |
| `description` | Customer-supplied description. |
| `failure_reason` | Human-readable explanation of a terminal FAILED status. |
| `generator_model_uuid` | Model that produced the scenarios. |
| `library_scenario_uuid` | UUID of the source library entry. |
| `name` | Customer-supplied name. |
| `scenario_count` | Number of scenarios in the set. |
| `scenario_set_uuid` | UUID of the scenario set. |
| `scenarios` | Optional inline scenarios to replace the set contents. |
| `source_export_id` | Signals export UUID that produced this set. |
| `source_goal_description` | The goal that drove generation. |
| `source_kind` | How a scenario set was created. |
| `spaces_key` | Object storage key for the scenario file. |
| `status` | Lifecycle status of a scenario set. |
| `updated_at` | Time last updated at. |
| `workflow_uuid` | Identifier of the generation workflow. |

Operations: update.

API path: `/v2/gen-ai/scenario_sets/{scenario_set_uuid}`

#### ApiUpdateSimulationRunOutput

| Field | Description |
| --- | --- |
| `agent_config` | Configuration of the candidate agent under test for a simulation run. |
| `created_at` | Time created at. |
| `created_by_user_email` | Email of the user who triggered this run. |
| `created_by_user_id` | User id of the actor who triggered this run. |
| `deleted_at` | Time deleted at. |
| `evaluation_config` | Optional configuration that opts a simulation run into an evaluation. |
| `evaluation_run_uuid` | UUID of the evaluation run reserved for this simulation, when the create request included evaluation_config. |
| `exploration_budget` | Optional run-level journeys-per-scenario override. |
| `failure_reason` | Human-readable explanation of a terminal FAILED status. |
| `journeys_finished` | Number of journeys that have finished (successfully or not). |
| `judge_model_name` | Display name of the judge model (from the model catalog). |
| `judge_model_uuid` | Model used by the judge. |
| `max_turns` | Optional run-level turn budget. |
| `name` | Optional run name. |
| `result_summary` | Aggregated final result of a simulation run: verdict counts plus token and duration totals. |
| `run_uuid` | UUID of the run. |
| `scenario_count` | Number of scenarios in the scenario set for this run. |
| `scenario_set_uuid` | UUID of the scenario set being executed (must exist at run create). |
| `status` | Lifecycle status of a simulation run. |
| `total_journeys` | Total number of journeys (sum of exploration budgets). |
| `updated_at` | Time last updated at. |
| `user_simulator_config` | Optional user simulator model settings such as temperature and max_tokens. |
| `user_simulator_model_name` | Display name of the user simulator model (from the model catalog). |
| `user_simulator_model_uuid` | Model used by the user simulator. |
| `workflow_uuid` | Identifier of the workflow executing this run. |

Operations: create, list, update.

API path: `/v2/gen-ai/simulation_runs`

#### ApiUpdateWorkspaceOutput

| Field | Description |
| --- | --- |
| `agents` | Agents |
| `created_at` | Creation date |
| `created_by` | The id of user who created this workspace |
| `created_by_email` | The email of the user who created this workspace |
| `deleted_at` | Deleted date |
| `description` | Description of the workspace |
| `evaluation_test_cases` | Evaluations |
| `name` | Name of the workspace |
| `updated_at` | Update date |
| `uuid` | Unique id |
| `workspace_uuid` | Workspace UUID. |

Operations: update.

API path: `/v2/gen-ai/workspaces/{workspace_uuid}`

#### App

| Field | Description |
| --- | --- |
| `active_deployment` |  |
| `autoscaling` | Autoscaling event details. |
| `created_at` |  |
| `dedicated_ips` |  |
| `default_ingress` |  |
| `deployment` |  |
| `deployment_id` | For deployment events, this is the same as the deployment's ID. |
| `domains` |  |
| `id` |  |
| `in_progress_deployment` |  |
| `last_deployment_created_at` |  |
| `live_domain` |  |
| `live_url` |  |
| `live_url_base` |  |
| `owner_uuid` |  |
| `pending_deployment` |  |
| `pinned_deployment` |  |
| `project_id` | Requires `project:read` scope. |
| `region` |  |
| `spec` | The desired configuration of an application. |
| `tier_slug` |  |
| `type` | The type of event |
| `update_all_source_versions` | Whether or not to update the source versions (for example fetching a new commit or image digest) of all components. |
| `updated_at` |  |
| `vpc` |  |

Operations: create, list, load, remove, update.

API path: `/v2/apps/{app_id}/events/{event_id}/cancel`

#### AppAlert

| Field | Description |
| --- | --- |
| `component_name` |  |
| `emails` |  |
| `id` |  |
| `phase` |  |
| `progress` |  |
| `slack_webhooks` |  |
| `spec` |  |

Operations: create, list.

API path: `/v2/apps/{app_id}/alerts/{alert_id}/destinations`

#### AppEvent

| Field | Description |
| --- | --- |
| `autoscaling` | Autoscaling event details. |
| `created_at` |  |
| `deployment` |  |
| `deployment_id` | For deployment events, this is the same as the deployment's ID. |
| `id` |  |
| `type` | The type of event |

Operations: list.

API path: `/v2/apps/{app_id}/events`

#### AppHealth

| Field | Description |
| --- | --- |
| `components` |  |
| `functions_components` |  |
| `id` |  |

Operations: load.

API path: `/v2/apps/{app_id}/health`

#### AppInstance

| Field | Description |
| --- | --- |
| `component_name` | Name of the component, from the app spec. |
| `component_type` | Supported compute component by DigitalOcean App Platform. |
| `id` |  |
| `instance_alias` | Readable identifier, an alias of the instance name, reference for mapping insights to instance names. |
| `instance_name` | Name of the instance, which is a unique identifier for the instance. |

Operations: list.

API path: `/v2/apps/{app_id}/instances`

#### AppJobInvocation

| Field | Description |
| --- | --- |
| `completed_at` |  |
| `created_at` |  |
| `deployment_id` |  |
| `id` |  |
| `job_name` |  |
| `phase` | The phase of the job invocation |
| `started_at` |  |
| `trigger` |  |

Operations: create, list, load.

API path: `/v2/apps/{app_id}/job-invocations/{job_invocation_id}/cancel`

#### AppMetricsBandwidthUsage

| Field | Description |
| --- | --- |
| `app_bandwidth_usage` | A list of bandwidth usage details by app. |
| `app_id` | The ID of the app. |
| `app_ids` | A list of app IDs to query bandwidth metrics for. |
| `bandwidth_bytes` | The used bandwidth amount in bytes. |
| `date` | The date for the metrics data. |

Operations: create, list.

API path: `/v2/apps/metrics/bandwidth_daily`

#### AppPropose

| Field | Description |
| --- | --- |
| `app_cost` | The monthly cost of the proposed app in USD. |
| `app_id` | An optional ID of an existing app. |
| `app_is_static` | Indicates whether the app is a static app. |
| `app_name_available` | Indicates whether the app name is available. |
| `app_name_suggestion` | The suggested name if the proposed app name is unavailable. |
| `app_tier_downgrade_cost` | The monthly cost of the proposed app in USD using the previous pricing plan tier. |
| `existing_static_apps` | The maximum number of free static apps the account can have. |
| `spec` | The desired configuration of an application. |

Operations: create.

API path: `/v2/apps/propose`

#### AppsDeployment

| Field | Description |
| --- | --- |
| `cause` |  |
| `cloned_from` |  |
| `components` |  |
| `created_at` |  |
| `deployment_id` | The ID of the deployment to rollback to. |
| `force_build` |  |
| `functions` |  |
| `id` |  |
| `jobs` |  |
| `phase` |  |
| `phase_last_updated_at` |  |
| `progress` |  |
| `services` |  |
| `skip_pin` | Whether to skip pinning the rollback deployment. |
| `spec` | The desired configuration of an application. |
| `static_sites` |  |
| `tier_slug` |  |
| `updated_at` |  |
| `workers` |  |

Operations: create, list, load.

API path: `/v2/apps/{app_id}/deployments/{deployment_id}/cancel`

#### AppsGetExec

| Field | Description |
| --- | --- |
| `url` | A websocket URL that allows sending/receiving console input and receiving console output. |

Operations: load.

API path: `/v2/apps/{app_id}/deployments/{deployment_id}/components/{component_name}/exec`

#### AppsGetLog

| Field | Description |
| --- | --- |
| `historic_urls` |  |
| `live_url` | A URL of the real-time live logs. |

Operations: list.

API path: `/v2/apps/{app_id}/deployments/{deployment_id}/components/{component_name}/logs`

#### AppsInstanceSize

| Field | Description |
| --- | --- |
| `bandwidth_allowance_gib` |  |
| `cpu_type` |  |
| `cpus` |  |
| `deprecation_intent` |  |
| `id` |  |
| `memory_bytes` |  |
| `name` |  |
| `scalable` |  |
| `single_instance_only` |  |
| `slug` |  |
| `tier_downgrade_to` |  |
| `tier_slug` |  |
| `tier_upgrade_to` |  |
| `usd_per_month` |  |
| `usd_per_second` |  |

Operations: list, load.

API path: `/v2/apps/tiers/instance_sizes`

#### AppsRegion

| Field | Description |
| --- | --- |
| `continent` |  |
| `data_centers` |  |
| `default` | Whether or not the region is presented as the default. |
| `disabled` |  |
| `flag` |  |
| `label` |  |
| `reason` |  |
| `slug` |  |

Operations: list.

API path: `/v2/apps/regions`

#### AssociatedKubernetesResource

| Field | Description |
| --- | --- |
| `load_balancers` | A list of names and IDs for associated load balancers that can be destroyed along with the cluster. |
| `volume_snapshots` | A list of names and IDs for associated volume snapshots that can be destroyed along with the cluster. |
| `volumes` | A list of names and IDs for associated volumes that can be destroyed along with the cluster. |

Operations: list.

API path: `/v2/kubernetes/clusters/{cluster_id}/destroy_with_associated_resources`

#### AssociatedResourceStatus

| Field | Description |
| --- | --- |
| `completed_at` | A time value given in ISO8601 combined date and time format indicating when the requested action was completed. |
| `droplet` | An object containing information about a resource scheduled for deletion. |
| `failures` | A count of the associated resources that failed to be destroyed, if any. |
| `resources` | An object containing additional information about resource related to a Droplet requested to be destroyed. |

Operations: load.

API path: `/v2/droplets/{droplet_id}/destroy_with_associated_resources/status`

#### AsyncInvoke

| Field | Description |
| --- | --- |
| `completed_at` | The timestamp when the job completed. |
| `created_at` | The timestamp when the request was created. |
| `error` | Error message if the job failed. |
| `input` | The input parameters for the model invocation. |
| `model_id` | The model ID that was invoked. |
| `output` | The output of the invocation. |
| `request_id` | A unique identifier for the async invocation request. |
| `started_at` | The timestamp when the job started processing. |
| `status` | The current status of the async invocation. |
| `tags` | An optional list of key-value tags to attach to the invocation request for tracking or categorization. |

Operations: create.

API path: `/v1/async-invoke`

#### Balance

| Field | Description |
| --- | --- |
| `account_balance` | Current balance of the customer's most recent billing activity. |
| `generated_at` | The time at which balances were most recently generated. |
| `month_to_date_balance` | Balance as of the `generated_at` time. |
| `month_to_date_usage` | Amount used in the current billing period as of the `generated_at` time. |

Operations: load.

API path: `/v2/customers/my/balance`

#### Batch

| Field | Description |
| --- | --- |
| `batch_id` | Unique identifier for the batch job. |
| `cancelled_at` |  |
| `completed_at` |  |
| `completion_window` | Time window in which the job must complete. |
| `created_at` |  |
| `endpoint` | Inference endpoint each request is dispatched to. |
| `error_file_id` | Error sidecar file. |
| `errors` | Top-level errors that prevented the batch from completing. |
| `expires_at` | Derived from `created_at` plus `completion_window`. |
| `failed_at` |  |
| `file_id` | The `file_id` returned by `POST /v1/batches/files`. |
| `finalizing_at` |  |
| `id` |  |
| `in_progress_at` |  |
| `input_file_id` | The uploaded JSONL input file. |
| `metadata` | Metadata attached at creation. |
| `output_file_id` | Output JSONL file. |
| `provider` | The inference provider whose JSONL schema the input file conforms to. |
| `request_counts` | Aggregate request counts. |
| `request_id` | The idempotency key supplied at creation. |
| `status` | Lifecycle status. |

Operations: create, list, load.

API path: `/v1/batches/{batch_id}/cancel`

#### BatchFileCreate

| Field | Description |
| --- | --- |
| `file_name` | The file you plan to upload. |

Operations: create.

API path: `/v1/batches/files`

#### BatchInference

| Field | Description |
| --- | --- |

Operations: update.

API path: `/<upload_url>`

#### BatchResult

| Field | Description |
| --- | --- |
| `batch_id` |  |
| `error_file_url` | Presigned URL for the error sidecar JSONL, if any. |
| `expires_at` | When the presigned URLs expire. |
| `id` |  |
| `output_file_url` | Presigned URL for the main results JSONL. |
| `result_available` | When `false`, keep polling batch status and retry later. |

Operations: load.

API path: `/v1/batches/{batch_id}/results`

#### Billing

| Field | Description |
| --- | --- |
| `amount` | Amount of the billing history entry. |
| `current_page` | Current page number |
| `data_points` | Array of billing data points, which are day-over-day changes in billing resource usage based on nightly invoice item estimates, for the requested period |
| `date` | Time the billing history entry occurred. |
| `description` | Description of the billing history entry. |
| `id` |  |
| `invoice_id` | ID of the invoice associated with the billing history entry, if applicable. |
| `invoice_items` |  |
| `invoice_period` | Billing period of usage for which the invoice is issued, in `YYYY-MM` format. |
| `invoice_uuid` | UUID of the invoice associated with the billing history entry, if applicable. |
| `links` |  |
| `meta` |  |
| `total_items` | Total number of items available across all pages |
| `total_pages` | Total number of pages available |
| `type` | Type of billing history entry. |
| `updated_at` | Time the invoice was last updated. |

Operations: list, load.

API path: `/v2/customers/my/billing_history`

#### BlockStorage

| Field | Description |
| --- | --- |
| `created_at` | A time value given in ISO8601 combined date and time format that represents when the snapshot was created. |
| `description` | An optional free-form text field to describe a block storage volume. |
| `droplet_ids` | An array containing the IDs of the Droplets the volume is attached to. |
| `filesystem_label` | The label currently applied to the filesystem. |
| `filesystem_type` | The type of filesystem currently in-use on the volume. |
| `id` | The unique identifier for the snapshot. |
| `min_disk_size` | The minimum size in GB required for a volume or Droplet to use this snapshot. |
| `name` | A human-readable name for the snapshot. |
| `region` |  |
| `regions` | An array of the regions that the snapshot is available in. |
| `resource_id` | The unique identifier for the resource that the snapshot originated from. |
| `resource_type` | The type of resource that the snapshot originated from. |
| `size_gigabytes` | The billable size of the snapshot in gigabytes. |
| `tags` | An array of Tags the snapshot has been tagged with.<br><br>Requires `tag:read` scope. |
| `volume` |  |

Operations: create, list, load, remove.

API path: `/v2/volumes/{volume_id}/snapshots`

#### BlockStorageAction

| Field | Description |
| --- | --- |
| `completed_at` | A time value given in ISO8601 combined date and time format that represents when the action was completed. |
| `id` | A unique numeric ID that can be used to identify and reference an action. |
| `region` |  |
| `region_slug` | A human-readable string that is used as a unique identifier for each region. |
| `resource_id` | A unique identifier for the resource that the action is associated with. |
| `resource_type` | The type of resource that the action is associated with. |
| `started_at` | A time value given in ISO8601 combined date and time format that represents when the action was initiated. |
| `status` | The current status of the action. |
| `type` | This is the type of action that the object represents. |

Operations: create, list, load.

API path: `/v2/volumes/{volume_id}/actions`

#### ByoipPrefix

| Field | Description |
| --- | --- |
| `advertise` | Whether the BYOIP prefix should be advertised |
| `advertised` | Whether the BYOIP prefix is being advertised |
| `failure_reason` | Reason for failure, if applicable |
| `id` |  |
| `locked` | Whether the BYOIP prefix is locked |
| `name` | Name of the BYOIP prefix |
| `prefix` | The IP prefix in CIDR notation |
| `project_id` | The ID of the project associated with the BYOIP prefix |
| `region` | Region where the BYOIP prefix is located |
| `signature` | The signature hash for the prefix creation request |
| `status` | Status of the BYOIP prefix |
| `uuid` | Unique identifier for the BYOIP prefix |
| `validations` | List of validation statuses for the BYOIP prefix |

Operations: create, list, load, remove, update.

API path: `/v2/byoip_prefixes`

#### CdnEndpoint

| Field | Description |
| --- | --- |
| `certificate_id` | The ID of a DigitalOcean managed TLS certificate used for SSL when a custom subdomain is provided. |
| `created_at` | A time value given in ISO8601 combined date and time format that represents when the CDN endpoint was created. |
| `custom_domain` | The fully qualified domain name (FQDN) of the custom subdomain used with the CDN endpoint. |
| `endpoint` | The fully qualified domain name (FQDN) from which the CDN-backed content is served. |
| `id` | A unique ID that can be used to identify and reference a CDN endpoint. |
| `origin` | The fully qualified domain name (FQDN) for the origin server which provides the content for the CDN. |
| `ttl` | The amount of time the content is cached by the CDN's edge servers in seconds. |

Operations: create, list, load, remove, update.

API path: `/v2/cdn/endpoints`

#### Certificate

| Field | Description |
| --- | --- |
| `certificate` |  |
| `created_at` | A time value given in ISO8601 combined date and time format that represents when the certificate was created. |
| `dns_names` | An array of fully qualified domain names (FQDNs) for which the certificate was issued. |
| `id` | A unique ID that can be used to identify and reference a certificate. |
| `name` | A unique human-readable name referring to a certificate. |
| `not_after` | A time value given in ISO8601 combined date and time format that represents the certificate's expiration date. |
| `sha1_fingerprint` | A unique identifier generated from the SHA-1 fingerprint of the certificate. |
| `state` | A string representing the current state of the certificate. |
| `type` | A string representing the type of the certificate. |

Operations: create, list, load, remove.

API path: `/v2/certificates`

#### ChatCompletion

| Field | Description |
| --- | --- |
| `choices` | A list of chat completion choices. |
| `created` | The Unix timestamp (in seconds) of when the chat completion was created. |
| `frequency_penalty` | Number between -2.0 and 2.0. |
| `id` | A unique identifier for the chat completion. |
| `logit_bias` | Modify the likelihood of specified tokens appearing in the completion. |
| `logprobs` | Whether to return log probabilities of the output tokens or not. |
| `max_completion_tokens` | The maximum number of completion tokens that may be used over the course of the run. |
| `max_tokens` | The maximum number of tokens that can be generated in the completion. |
| `messages` | A list of messages comprising the conversation so far. |
| `metadata` | Set of 16 key-value pairs that can be attached to an object. |
| `model` | The model used for the chat completion. |
| `n` | How many chat completion choices to generate for each input message. |
| `object` | The object type, which is always chat.completion. |
| `presence_penalty` | Number between -2.0 and 2.0. |
| `reasoning_effort` | Constrains effort on reasoning for reasoning models. |
| `seed` | If specified, the system will make a best effort to sample deterministically, such that repeated requests with the same seed and parameters should return the same result. |
| `stop` | Up to 4 sequences where the API will stop generating further tokens. |
| `stream` | If set to true, the model response data will be streamed to the client as it is generated using server-sent events. |
| `stream_options` | Options for streaming response. |
| `temperature` | What sampling temperature to use, between 0 and 2. |
| `tool_choice` | Controls which (if any) tool is called by the model. |
| `tools` | A list of tools the model may call. |
| `top_logprobs` | An integer between 0 and 20 specifying the number of most likely tokens to return at each token position, each with an associated log probability. |
| `top_p` | An alternative to sampling with temperature, called nucleus sampling, where the model considers the results of the tokens with top_p probability mass. |
| `usage` | Usage statistics for the completion request. |
| `user` | A unique identifier representing your end-user, which can help DigitalOcean to monitor and detect abuse. |

Operations: create.

API path: `/api/v1/chat/completions`

#### Clusterlint

| Field | Description |
| --- | --- |
| `check_name` | The clusterlint check that resulted in the diagnostic. |
| `message` | Feedback about the object for users to fix. |
| `object` | Metadata about the Kubernetes API object the diagnostic is reported on. |
| `severity` | Can be one of error, warning or suggestion. |

Operations: list.

API path: `/v2/kubernetes/clusters/{cluster_id}/clusterlint`

#### Connection

| Field | Description |
| --- | --- |
| `api_key` | Set for `team_api_key` connections. |
| `authorization` | Present only while the connection is pending and you created it. |
| `connection` | The connection. |
| `connection_parameters` | Values for the provider's `connection_parameters`, validated against their specifications. |
| `created_at` | When the connection was created. |
| `credential` | Optional credential to connect through. |
| `credential_id` | Empty for `digitalocean_oauth`; otherwise the ID of the team provider credential the connection uses. |
| `credential_kind` | `digitalocean_oauth`, `private_oauth`, or `team_api_key`. |
| `granted_at` | Deprecated: read `oauth.granted_at`. |
| `id` | Opaque connection ID. |
| `network` | Optional private network for the connection's calls. |
| `oauth` | Set for `digitalocean_oauth` and `private_oauth` connections. |
| `owning_user_id` | DigitalOcean user ID of the user who created the connection, when recorded. |
| `provider` | Required provider slug, from the provider list. |
| `provider_display_name` | Human-readable provider name, for example `Jira`. |
| `revoked_at` | When the connection was revoked. |
| `scopes` | Optional OAuth scopes to request. |
| `status` | pending, active, revoked, or expired. |
| `updated_at` | When the connection was last modified. |
| `user_id` | Required. |

Operations: create, list, load, remove.

API path: `/v2/action-gateway/connections`

#### ConnectionPool

| Field | Description |
| --- | --- |
| `connection` |  |
| `db` | The database for use with the connection pool. |
| `mode` | The PGBouncer transaction mode for the connection pool. |
| `name` | A unique name for the connection pool. |
| `private_connection` |  |
| `size` | The desired size of the PGBouncer connection pool. |
| `standby_connection` |  |
| `standby_private_connection` |  |
| `user` | The name of the user for use with the connection pool. |

Operations: list.

API path: `/v2/databases/{database_cluster_uuid}/pools`

#### ContainerRegistry

| Field | Description |
| --- | --- |
| `available_regions` |  |
| `blobs` | All blobs associated with this manifest |
| `blobs_deleted` | The number of blobs deleted as a result of this garbage collection. |
| `cancel` | A boolean value indicating that the garbage collection should be cancelled. |
| `compressed_size_bytes` | The compressed size of the manifest in bytes. |
| `created_at` | A time value given in ISO8601 combined date and time format that represents when the registry was created. |
| `digest` | The manifest digest |
| `freed_bytes` | The number of bytes freed as a result of this garbage collection. |
| `id` |  |
| `latest_manifest` |  |
| `latest_tag` |  |
| `manifest_count` | The number of manifests in the repository. |
| `manifest_digest` | The digest of the manifest associated with the tag. |
| `name` | A globally unique name for the container registry. |
| `region` | Slug of the region where registry data is stored |
| `registries` |  |
| `registry_name` | The name of the container registry. |
| `repository` | The name of the repository. |
| `size_bytes` | The uncompressed size of the manifest in bytes (this size is calculated asynchronously so it may not be immediately available). |
| `status` | The current status of this garbage collection. |
| `storage_usage_bytes` | The amount of storage used in the registry in bytes. |
| `storage_usage_bytes_updated_at` | The time at which the storage usage was updated. |
| `subscription` |  |
| `subscription_tier_slug` | The slug of the subscription tier to sign up for. |
| `subscription_tiers` |  |
| `tag` | The name of the tag. |
| `tag_count` | The number of tags in the repository. |
| `tags` | All tags associated with this manifest |
| `tier` |  |
| `tier_slug` | The slug of the subscription tier to sign up for. |
| `type` | Type of the garbage collection to run against this registry |
| `updated_at` | The time the garbage collection was last updated. |
| `uuid` | A string specifying the UUID of the garbage collection. |

Operations: create, list, load, remove, update.

API path: `/v2/registries/{registry_name}/garbage-collection`

#### CreateResponse

| Field | Description |
| --- | --- |
| `created` | The Unix timestamp (in seconds) of when the response was created. |
| `id` | A unique identifier for the response. |
| `input` | The prompt or input content you want the model to respond to. |
| `instructions` | System-level instructions for the model. |
| `max_output_tokens` | Maximum output tokens setting. |
| `metadata` | Set of key-value pairs that can be attached to the request. |
| `model` | The model used to generate the response. |
| `object` | The object type, which is always `response`. |
| `output` | An array of content items generated by the model. |
| `parallel_tool_calls` | Whether parallel tool calls are enabled. |
| `status` | Status of the response. |
| `stop` | Up to 4 sequences where the API will stop generating further tokens. |
| `stream` | Set to true to stream partial responses as Server-Sent Events. |
| `stream_options` | Options for streaming response. |
| `temperature` | Temperature setting used for the response. |
| `tool_choice` | Tool choice setting used for the response. |
| `tools` | Tools available for the response. |
| `top_p` | Top-p setting used for the response. |
| `usage` | Detailed usage statistics for the Responses API request, including input/output token counts and detailed breakdowns. |
| `user` | User identifier. |

Operations: create.

API path: `/v1/responses`

#### Credential

| Field | Description |
| --- | --- |
| `certificate_authority_data` | A base64 encoding of bytes representing the certificate authority data for accessing the cluster. |
| `client_certificate_data` | A base64 encoding of bytes representing the x509 client certificate data for access the cluster. |
| `client_key_data` | A base64 encoding of bytes representing the x509 client key data for access the cluster. |
| `expires_at` | A time value given in ISO8601 combined date and time format that represents when the access token expires. |
| `server` | The URL used to access the cluster API server. |
| `token` | An access token used to authenticate with the cluster. |

Operations: load.

API path: `/v2/kubernetes/clusters/{cluster_id}/credentials`

#### Database

| Field | Description |
| --- | --- |
| `access_cert` | Access certificate for TLS client authentication. |
| `access_key` | Access key for TLS client authentication. |
| `autoscale` | Autoscaling configuration for the database cluster. |
| `backup_restore` |  |
| `compatibility_level` | The compatibility level of the schema registry. |
| `config` |  |
| `connection` |  |
| `created_at` | A time value given in ISO8601 combined date and time format that represents when the database cluster was created. |
| `credentials` |  |
| `db` | The database for use with the connection pool. |
| `db_names` | An array of strings containing the names of databases created in the database cluster. |
| `do_settings` |  |
| `engine` | A slug representing the database engine used for the cluster. |
| `id` | A unique ID that can be used to identify and reference a database replica. |
| `maintenance_window` |  |
| `metrics_endpoints` | Public hostname and port of the cluster's metrics endpoint(s). |
| `mode` | The PGBouncer transaction mode for the connection pool. |
| `mysql_settings` |  |
| `name` | The name of the database. |
| `num_nodes` | The number of nodes in the database cluster. |
| `partition_count` | The number of partitions available for the topic. |
| `partitions` |  |
| `password` | A randomly generated password for the database user.<br>Requires `database:view_credentials` scope. |
| `private_connection` |  |
| `private_network_uuid` | A string specifying the UUID of the VPC to which the read-only replica will be assigned. |
| `project_id` | The ID of the project that the database cluster is assigned to. |
| `region` | A slug identifier for the region where the read-only replica will be located. |
| `replication_factor` | The number of nodes to replicate data across the cluster. |
| `role` | A string representing the database user's role. |
| `rules` |  |
| `schema` | The schema definition in the specified format. |
| `schema_id` | The id for schema. |
| `schema_registry_connection` | The connection details for Schema Registry. |
| `schema_type` | The type of the schema. |
| `semantic_version` | A string representing the semantic version of the database engine in use for the cluster. |
| `settings` | User settings that can be updated via the Update a Database User endpoint. |
| `size` | The desired size of the PGBouncer connection pool. |
| `standby_connection` |  |
| `standby_private_connection` |  |
| `state` | The state of the Kafka topic. |
| `status` | A string representing the current status of the database cluster. |
| `storage_size_mib` | Additional storage added to the cluster, in MiB. |
| `subject_name` | The name of the schema subject. |
| `tags` | A flat array of tag names as strings applied to the read-only replica.<br><br>Requires `tag:read` scope. |
| `ui_connection` | The connection details for OpenSearch dashboard. |
| `user` | The name of the user for use with the connection pool. |
| `users` |  |
| `version` | The version of the schema. |
| `version_end_of_availability` | A timestamp referring to the date when the particular version will no longer be available for creating new clusters. |
| `version_end_of_life` | A timestamp referring to the date when the particular version will no longer be supported. |

Operations: create, list, load, patch, remove, update.

API path: `/v2/databases/{database_cluster_uuid}/users/{username}/reset_auth`

#### DedicatedInference

| Field | Description |
| --- | --- |
| `access_tokens` | Key-value pairs for provider tokens (e.g. |
| `created_at` | When the Dedicated Inference was created. |
| `dedicated_inference` | A Dedicated Inference instance. |
| `endpoints` |  |
| `id` | Unique ID of the Dedicated Inference. |
| `pending_deployment_spec` | Pending deployment when status is provisioning or updating. |
| `region` | DigitalOcean region where the Dedicated Inference is hosted. |
| `spec` | Structured configuration for a Dedicated Inference deployment. |
| `status` | Current state of the Dedicated Inference. |
| `token` | Access token for authenticating to Dedicated Inference endpoints. |
| `updated_at` | When the Dedicated Inference was last updated. |
| `vpc_uuid` | VPC UUID of the Dedicated Inference. |

Operations: create, list, load, remove, update.

API path: `/v2/dedicated-inferences/{dedicated_inference_id}/tokens`

#### DedicatedInferenceAccelerator

| Field | Description |
| --- | --- |
| `created_at` |  |
| `id` | Unique ID of the accelerator. |
| `name` | Name of the accelerator. |
| `role` | Role of the accelerator (e.g. |
| `slug` | DigitalOcean GPU slug. |
| `status` | Status of the accelerator. |

Operations: load.

API path: `/v2/dedicated-inferences/{dedicated_inference_id}/accelerators/{accelerator_id}`

#### DedicatedInferenceGpuModelConfig

| Field | Description |
| --- | --- |
| `gpu_slugs` |  |
| `is_gated_model` | Whether the model requires gated access (e.g. |
| `model_name` |  |
| `model_slug` |  |

Operations: list.

API path: `/v2/dedicated-inferences/gpu-model-config`

#### DedicatedInferenceSize

| Field | Description |
| --- | --- |
| `currency` |  |
| `gpu_slug` |  |
| `price_per_hour` |  |
| `region` |  |

Operations: list.

API path: `/v2/dedicated-inferences/sizes`

#### DockerCredential

| Field | Description |
| --- | --- |
| `registry_digitalocean_com` |  |

Operations: load.

API path: `/v2/registries/{registry_name}/docker-credentials`

#### Domain

| Field | Description |
| --- | --- |
| `id` |  |
| `ip_address` | This optional attribute may contain an IP address. |
| `name` | The name of the domain itself. |
| `ttl` | This value is the time to live for the records on this domain, in seconds. |
| `zone_file` | This attribute contains the complete contents of the zone file for the selected domain. |

Operations: create, list, load, remove.

API path: `/v2/domains`

#### DomainRecord

| Field | Description |
| --- | --- |
| `data` | Variable data depending on record type. |
| `domain_record` |  |
| `flags` | An unsigned integer between 0-255 used for CAA records. |
| `id` | A unique identifier for each domain record. |
| `name` | The host name, alias, or service being defined by the record. |
| `port` | The port for SRV records. |
| `priority` | The priority for SRV and MX records. |
| `tag` | The parameter tag for CAA records. |
| `ttl` | This value is the time to live for the record, in seconds. |
| `type` | The type of the DNS record. |
| `weight` | The weight for SRV records. |

Operations: create, list, load, patch, remove, update.

API path: `/v2/domains/{domain_name}/records`

#### Droplet

| Field | Description |
| --- | --- |
| `backup_ids` | An array of backup IDs of any backups that have been taken of the Droplet instance. |
| `created_at` | A time value given in ISO8601 combined date and time format that represents when the Droplet was created. |
| `disk` | The size of the Droplet's disk in gigabytes. |
| `disk_info` | An array of objects containing information about the disks available to the Droplet. |
| `droplet` |  |
| `features` | An array of features enabled on this Droplet. |
| `gpu_info` | An object containing information about the GPU capabilities of Droplets created with this size. |
| `id` | A unique identifier for each Droplet instance. |
| `image` |  |
| `kernel` | **Note**: All Droplets created after March 2017 use internal kernels by default. |
| `links` |  |
| `locked` | A boolean value indicating whether the Droplet has been locked, preventing actions by users. |
| `memory` | Memory of the Droplet in megabytes. |
| `meta` |  |
| `name` | The human-readable name set for the Droplet instance. |
| `networks` | The details of the network that are configured for the Droplet instance. |
| `next_backup_window` |  |
| `policies` | A map where the keys are the Droplet IDs and the values are objects containing the backup policy information for each Droplet. |
| `possible_days` | The day of the week the backup will occur. |
| `possible_window_starts` | An array of integers representing the hours of the day that a backup can start. |
| `region` |  |
| `retention_period_days` | The number of days that a backup will be kept. |
| `size` |  |
| `size_slug` | The unique slug identifier for the size of this Droplet. |
| `snapshot_ids` | An array of snapshot IDs of any snapshots created from the Droplet instance.<br>Requires `image:read` scope. |
| `status` | A status string indicating the state of the Droplet instance. |
| `subnet_uuid` | A string specifying the UUID of the VPC subnet to which the Droplet is assigned.<br>Requires `vpc:read` scope. |
| `tags` | An array of Tags the Droplet has been tagged with.<br>Requires `tag:read` scope. |
| `vcpus` | The number of virtual CPUs. |
| `volume_ids` | A flat array including the unique identifier for each Block Storage volume attached to the Droplet.<br>Requires `block_storage:read` scope. |
| `vpc_uuid` | A string specifying the UUID of the VPC to which the Droplet is assigned.<br>Requires `vpc:read` scope. |
| `window_length_hours` | The number of hours that a backup window is open. |

Operations: create, list, load, remove.

API path: `/v2/droplets/{droplet_id}/destroy_with_associated_resources/retry`

#### DropletAction

| Field | Description |
| --- | --- |
| `completed_at` | A time value given in ISO8601 combined date and time format that represents when the action was completed. |
| `id` | A unique numeric ID that can be used to identify and reference an action. |
| `region` |  |
| `region_slug` | A human-readable string that is used as a unique identifier for each region. |
| `resource_id` | A unique identifier for the resource that the action is associated with. |
| `resource_type` | The type of resource that the action is associated with. |
| `started_at` | A time value given in ISO8601 combined date and time format that represents when the action was initiated. |
| `status` | The current status of the action. |
| `type` | This is the type of action that the object represents. |

Operations: create, list, load.

API path: `/v2/droplets/{droplet_id}/actions`

#### DropletAutoscalePool

| Field | Description |
| --- | --- |
| `active_resources_count` | The number of active Droplets in the autoscale pool. |
| `config` | The scaling configuration for an autoscale pool, which is how the pool scales up and down (either by resource utilization or static configuration). |
| `created_at` | A time value given in ISO8601 combined date and time format that represents when the autoscale pool was created. |
| `current_instance_count` | The current number of Droplets in the autoscale pool. |
| `current_utilization` |  |
| `desired_instance_count` | The target number of Droplets for the autoscale pool after the scaling event. |
| `droplet_id` | The unique identifier of the Droplet. |
| `droplet_template` |  |
| `health_status` | The health status of the Droplet. |
| `history_event_id` | The unique identifier of the history event. |
| `id` | A unique identifier for each autoscale pool instance. |
| `name` | The human-readable name set for the autoscale pool. |
| `reason` | The reason for the scaling event. |
| `status` | The current status of the autoscale pool. |
| `unhealthy_reason` | A human-readable description of why the Droplet is unhealthy. |
| `updated_at` | A time value given in ISO8601 combined date and time format that represents when the autoscale pool was last updated. |

Operations: create, list, load, remove, update.

API path: `/v2/droplets/autoscale`

#### Embedding

| Field | Description |
| --- | --- |
| `data` | One entry for each `input` string, in the same order. |
| `encoding_format` | How embedding values are returned in each `data[].embedding` field. |
| `input` | A single string or 1–2048 strings; each string produces one row in `data`, in order. |
| `model` | The embedding model that produced the vectors. |
| `object` | The object type, which is always the string `list`. |
| `usage` | Token usage for the embeddings request. |
| `user` | Optional end-user identifier to help with abuse monitoring. |

Operations: create.

API path: `/v1/embeddings`

#### Empty

| Field | Description |
| --- | --- |
| `actorId` | Optional actor binding: the user whose connections the session's tool calls use, matched against connection `user_id`. |
| `agentName` | Name of the agent that started the session. |
| `agentUrn` | URN of the agent that started the session. |
| `categories` | Required. |
| `config` | Optional session options. |
| `createdAt` | When the session was created. |
| `insights` | Omitted when the request omitted insights or explicitly sent null. |
| `mcpUrl` | URL of the session's MCP endpoint, for the agent to connect to. |
| `name` | Required human-readable session name. |
| `network` | Product-level session network binding. |
| `overrides` | Required. |
| `owning_user_id` | DigitalOcean user ID of the user who created the session, when recorded. |
| `policy` | Optional tool-permission policy. |
| `session` | The created session. |
| `sessionUrn` | Session URN, for example `do:managed_agent_session:<uuid>`. |
| `tools` | Canonical, version-pinned selected tool references. |
| `updatedAt` | When the session was last modified. |

Operations: create, list, remove.

API path: `/v2/action-gateway/actors/{actor_id}/limits:clear`

#### Firewall

| Field | Description |
| --- | --- |
| `created_at` | A time value given in ISO8601 combined date and time format that represents when the firewall was created. |
| `droplet_ids` | An array containing the IDs of the Droplets assigned to the firewall. |
| `id` | A unique ID that can be used to identify and reference a firewall. |
| `inbound_rules` |  |
| `name` | A human-readable name for a firewall. |
| `outbound_rules` |  |
| `pending_changes` | An array of objects each containing the fields "droplet_id", "removing", and "status". |
| `status` | A status string indicating the current state of the firewall. |
| `tags` |  |

Operations: create, list, load, remove, update.

API path: `/v2/firewalls/{firewall_id}/droplets`

#### FloatingIp

| Field | Description |
| --- | --- |
| `droplet` | The Droplet that the floating IP has been assigned to. |
| `floating_ip` |  |
| `id` |  |
| `ip` | The public IP address of the floating IP. |
| `links` |  |
| `locked` | A boolean value indicating whether or not the floating IP has pending actions preventing new ones from being submitted. |
| `project_id` | The UUID of the project to which the reserved IP currently belongs.<br><br>Requires `project:read` scope. |
| `region` |  |

Operations: create, list, load, remove.

API path: `/v2/floating_ips`

#### FloatingIpAction

| Field | Description |
| --- | --- |
| `action` |  |
| `completed_at` | A time value given in ISO8601 combined date and time format that represents when the action was completed. |
| `id` | A unique numeric ID that can be used to identify and reference an action. |
| `project_id` | The UUID of the project to which the reserved IP currently belongs. |
| `region` |  |
| `region_slug` | A human-readable string that is used as a unique identifier for each region. |
| `resource_id` | A unique identifier for the resource that the action is associated with. |
| `resource_type` | The type of resource that the action is associated with. |
| `started_at` | A time value given in ISO8601 combined date and time format that represents when the action was initiated. |
| `status` | The current status of the action. |
| `type` | This is the type of action that the object represents. |

Operations: create, list, load.

API path: `/v2/floating_ips/{floating_ip}/actions`

#### Function

| Field | Description |
| --- | --- |
| `api_host` | The namespace's API hostname. |
| `created_at` | UTC time string. |
| `expires_at` | When the key expires (null for non-expiring keys). |
| `expires_in` | The duration after which the access key expires, specified as a human-readable duration string in the format `<int>h` (hours) or `<int>d` (days). |
| `function` | Name of function(action) that exists in the given namespace. |
| `id` | The access key's unique identifier with prefix 'dof_v1_'. |
| `is_enabled` | Indicates weather the trigger is paused or unpaused. |
| `key` | A random alpha numeric string. |
| `label` | The namespace's unique name. |
| `name` | The trigger's unique name within the namespace. |
| `namespace` | A unique string format of UUID with a prefix fn-. |
| `region` | The namespace's datacenter region. |
| `scheduled_details` | Trigger details for SCHEDULED type, where body is optional. |
| `scheduled_runs` |  |
| `type` | String which indicates the type of trigger source like SCHEDULED. |
| `updated_at` | UTC time string. |
| `uuid` | The namespace's Universally Unique Identifier. |

Operations: create, list, load, remove, update.

API path: `/v2/functions/namespaces/{namespace_id}/keys`

#### GenaiapiRegion

| Field | Description |
| --- | --- |
| `inference_url` | Url for inference server |
| `region` | Region code |
| `serves_batch` | This datacenter is capable of running batch jobs |
| `serves_inference` | This datacenter is capable of serving inference |
| `stream_inference_url` | The url for the inference streaming server |

Operations: list.

API path: `/v2/gen-ai/regions`

#### Image

| Field | Description |
| --- | --- |
| `created_at` | A time value given in ISO8601 combined date and time format that represents when the image was created. |
| `description` | An optional free-form text field to describe an image. |
| `distribution` | The name of a custom image's distribution. |
| `error_message` | A string containing information about errors that may occur when importing a custom image. |
| `id` | A unique number that can be used to identify and reference a specific image. |
| `min_disk_size` | The minimum disk size in GB required for a Droplet to use this image. |
| `name` | The display name that has been given to an image. |
| `public` | This is a boolean value that indicates whether the image in question is public or not. |
| `region` | The slug identifier for the region where the resource will initially be available. |
| `regions` | This attribute is an array of the regions that the image is available in. |
| `size_gigabytes` | The size of the image in gigabytes. |
| `slug` | A uniquely identifying string that is associated with each of the DigitalOcean-provided public images. |
| `status` | A status string indicating the state of a custom image. |
| `tags` | A flat array of tag names as strings to be applied to the resource. |
| `type` | Describes the kind of image. |
| `url` | A URL from which the custom Linux virtual machine image may be retrieved. |

Operations: create, list, load, remove, update.

API path: `/v2/images/{image_id}/account_transfer`

#### ImageAction

| Field | Description |
| --- | --- |
| `completed_at` | A time value given in ISO8601 combined date and time format that represents when the action was completed. |
| `id` | A unique numeric ID that can be used to identify and reference an action. |
| `region` |  |
| `region_slug` | A human-readable string that is used as a unique identifier for each region. |
| `resource_id` | A unique identifier for the resource that the action is associated with. |
| `resource_type` | The type of resource that the action is associated with. |
| `started_at` | A time value given in ISO8601 combined date and time format that represents when the action was initiated. |
| `status` | The current status of the action. |
| `type` | This is the type of action that the object represents. |

Operations: list.

API path: `/v2/images/{image_id}/actions`

#### Insight

| Field | Description |
| --- | --- |
| `channel_type` | The configured channel type. |
| `created_at` | Time the alert rule was created. |
| `email` | Email notification channel configuration. |
| `id` | A unique identifier for the alert instance. |
| `last_notified_at` | Time a notification was last sent for this alert instance. |
| `last_triggered_at` | Time the alert instance most recently fired. |
| `name` | A human-readable name for the notification channel. |
| `resolved_at` | Time the alert instance resolved. |
| `resource_urn` | URN of the DigitalOcean resource the alert fired for. |
| `rule_id` | ID of the alert rule that fired this alert instance. |
| `severity` | Severity of the breached threshold. |
| `slack` | Slack notification channel configuration as returned in API responses. |
| `spec` | Spec for an Insights alert rule. |
| `status` | Current status of the alert instance. |
| `triggered_at` | Time the alert instance first fired. |
| `updated_at` | Time the alert rule was last updated. |
| `usage` |  |
| `value` | The observed metric value that breached the threshold. |
| `webhook` | Generic HTTPS webhook notification channel configuration as returned in API responses. |

Operations: create, list, load, remove, update.

API path: `/v2/insights/alert-rules`

#### InvoiceSummary

| Field | Description |
| --- | --- |
| `amount` | Total amount of the invoice, in USD. |
| `billing_period` | Billing period of usage for which the invoice is issued, in `YYYY-MM` format. |
| `credits_and_adjustments` |  |
| `id` |  |
| `invoice_id` | ID of the invoice |
| `invoice_uuid` | UUID of the invoice |
| `overages` |  |
| `product_charges` |  |
| `taxes` |  |
| `user_billing_address` |  |
| `user_company` | Company of the DigitalOcean customer being invoiced, if set. |
| `user_email` | Email of the DigitalOcean customer being invoiced. |
| `user_name` | Name of the DigitalOcean customer being invoiced. |

Operations: load.

API path: `/v2/customers/my/invoices/{invoice_uuid}/summary`

#### Kubernete

| Field | Description |
| --- | --- |
| `amd_gpu_device_metrics_exporter_plugin` | An object specifying whether the AMD Device Metrics Exporter should be enabled in the Kubernetes cluster. |
| `amd_gpu_device_plugin` | An object specifying whether the AMD GPU Device Plugin should be enabled in the Kubernetes cluster. |
| `amd_gpu_dra_driver` | An object specifying whether the AMD GPU DRA Driver should be enabled in the Kubernetes cluster. |
| `auto_scale` | A boolean value indicating whether auto-scaling is enabled for this node pool. |
| `auto_upgrade` | A boolean value indicating whether the cluster will be automatically upgraded to new patch releases during its maintenance window. |
| `cluster_autoscaler_configuration` | An object specifying custom cluster autoscaler configuration. |
| `cluster_subnet` | The range of IP addresses for the overlay network of the Kubernetes cluster in CIDR notation. |
| `control_plane_firewall` | An object specifying the control plane firewall for the Kubernetes cluster. |
| `coredns_autoscaler` | An object specifying whether the Cluster Proportional Autoscaler (CPA) add-on for CoreDNS should be enabled for the Kubernetes cluster. |
| `count` | The number of Droplet instances in the node pool. |
| `created_at` | A time value given in ISO8601 combined date and time format that represents when the Kubernetes cluster was created. |
| `endpoint` | The base URL of the API server on the Kubernetes master node. |
| `gpu_partition_mode` | The AMD GPU partition mode for this node pool. |
| `ha` | A boolean value indicating whether the control plane is run in a highly available configuration in the cluster. |
| `id` | A unique ID that can be used to identify and reference a specific node pool. |
| `ipv4` | The public IPv4 address of the Kubernetes master node. |
| `isolated_workers` | A boolean value indicating whether worker nodes in the cluster are not assigned public IP addresses. |
| `kubernetes_version` | The upstream version string for the version of Kubernetes provided by a given slug. |
| `labels` | An object of key/value mappings specifying labels to apply to all nodes in a pool. |
| `maintenance_policy` | An object specifying the maintenance window policy for the Kubernetes cluster. |
| `max_nodes` | The maximum number of nodes that this node pool can be auto-scaled to. |
| `message` | Status information about the cluster which impacts it's lifecycle. |
| `min_nodes` | The minimum number of nodes that this node pool can be auto-scaled to. |
| `name` | A human-readable name for the node pool. |
| `nfs_csi_plugin` | An object specifying whether the NFS CSI plugin should be enabled for the Kubernetes cluster. |
| `node_pools` | An object specifying the details of the worker nodes available to the Kubernetes cluster. |
| `nodes` | An object specifying the details of a specific worker node in a node pool. |
| `nvidia_gpu_device_plugin` | An object specifying whether the Nvidia GPU Device Plugin should be enabled in the Kubernetes cluster. |
| `nvidia_gpu_dra_driver` | An object specifying whether the NVIDIA GPU DRA Driver should be enabled in the Kubernetes cluster. |
| `p2p_oci_registry_plugin` | An object specifying whether the Peer-to-peer OCI registry component should be enabled for the Kubernetes cluster. |
| `rdma_shared_dev_plugin` | An object specifying whether the RDMA shared device plugin should be enabled in the Kubernetes cluster. |
| `region` | The slug identifier for the region where the Kubernetes cluster is located. |
| `registries` | An array of integrated DOCR registries. |
| `registry_enabled` | A read-only boolean value indicating if a container registry is integrated with the cluster. |
| `routing_agent` | An object specifying whether the routing-agent component should be enabled for the Kubernetes cluster. |
| `service_subnet` | The range of assignable IP addresses for services running in the Kubernetes cluster in CIDR notation. |
| `size` | The slug identifier for the type of Droplet used as workers in the node pool. |
| `slug` | The slug identifier for an available version of Kubernetes for use when creating or updating a cluster. |
| `sso` | An object specifying Single Sign-On (SSO) configuration for the Kubernetes cluster. |
| `status` | An object containing a `state` attribute whose value is set to a string indicating the current status of the cluster. |
| `supported_features` | The features available with the version of Kubernetes provided by a given slug. |
| `surge_upgrade` | A boolean value indicating whether surge upgrade is enabled/disabled for the cluster. |
| `tags` | An array containing the tags applied to the node pool. |
| `taints` | An array of taints to apply to all nodes in a pool. |
| `timestamp` | A timestamp in ISO8601 format that represents when the status message was emitted. |
| `updated_at` | A time value given in ISO8601 combined date and time format that represents when the Kubernetes cluster was last updated. |
| `version` | The slug identifier for the version of Kubernetes used for the cluster. |
| `vpc_uuid` | A string specifying the UUID of the VPC to which the Kubernetes cluster is assigned.<br><br>Requires `vpc:read` scope. |
| `worker_subnet_uuid` | The UUID of the VPC subnet worker nodes are attached to. |

Operations: create, list, load, remove, update.

API path: `/v2/kubernetes/clusters/{cluster_id}/node_pools/{node_pool_id}/recycle`

#### KubernetesOption

| Field | Description |
| --- | --- |
| `regions` |  |
| `sizes` |  |
| `versions` |  |

Operations: load.

API path: `/v2/kubernetes/options`

#### ListMcpServerTool

| Field | Description |
| --- | --- |
| `description` | Tool description as the server reports it. |
| `enabled` | Whether the tool is enabled in your team's catalog. |
| `enabledToolSlugs` | The complete set of tool slugs (`<server_ref>_<name>`) to enable; every other tool of the server is disabled. |
| `name` | Tool name as the server reports it, normalized to the catalog's naming rules. |
| `quarantineReason` | Why the tool was quarantined; empty otherwise. |
| `quarantined` | True when the enabled tool was suspended because it disappeared from the server or its input schema changed incompatibly. |
| `toolSlug` | `<server_ref>_<name>`: the tool's catalog slug, and the value to list in `enabledToolSlugs`. |
| `tools` | Tools sorted by name. |
| `user_id` | Required for a server registered with `credentialRefSource` connection when a tool needs verification against the live server, which can only be reached as a user who has authorized it. |

Operations: list, update.

API path: `/v2/action-gateway/mcp-servers/{server_ref}/tools`

#### ListProvider

| Field | Description |
| --- | --- |
| `auth_type` | Deprecated: read `auth_types`, since a provider may accept more than one credential kind. |
| `auth_types` | Credential kinds the provider accepts, sorted: none|oauth|`shared_api_key`|unknown|`user_oauth_app`|`user_token`. |
| `connection_parameters` | Non-sensitive values collected when creating a connection. |
| `credential_parameters` | Non-secret values collected when registering an API key provider credential. |
| `description` | Provider description. |
| `display_name` | Human-readable provider name. |
| `name` | Provider slug, used as provider when creating a connection or a provider credential. |
| `oauth_client_setup_url` | HTTPS page at the provider where a team creates that OAuth client, such as its developer console or setup guide. |
| `oauth_redirect_url` | Callback URL a team must register with the provider when it creates its own OAuth client. |
| `scopes` | The OAuth scopes a connection may request; a connection that requests none gets all of them. |

Operations: list.

API path: `/v2/action-gateway/tools/providers`

#### ListProviderHealth

| Field | Description |
| --- | --- |
| `health` | Metrics over the window. |
| `provider` | Provider ID. |

Operations: list.

API path: `/v2/action-gateway/tools/health/providers`

#### ListTool

| Field | Description |
| --- | --- |
| `definitions` | definitions[i] describes tools[i]. |
| `pagination` | page and `per_page` echo the values applied; total is the number of tools matching `toolkitId` across all pages. |
| `tools` | Tools on this page, grouped by provider and sorted by name within a provider. |
| `version` | Catalog version identifier, for example `v1`. |

Operations: list.

API path: `/v2/action-gateway/tools`

#### ListToolHealth

| Field | Description |
| --- | --- |
| `health` | Metrics over the window. |
| `provider` | ID of the provider that offers the tool. |
| `tool_slug` | Catalog tool slug. |

Operations: list.

API path: `/v2/action-gateway/tools/health`

#### ListToolbeltProvider

| Field | Description |
| --- | --- |
| `categories` | The distinct tool categories among this toolbelt's members for the provider (sorted). |
| `created_at` | When the provider was added to the catalog. |
| `description` | Provider description. |
| `id` | Equals provider; present so the entry has the same shape as a toolkit. |
| `name` | The provider's display name. |
| `provider` | The provider ID. |
| `tool_count` | How many toolbelt members belong to this provider. |

Operations: list.

API path: `/v2/action-gateway/toolbelts/{name}/providers`

#### ListToolkit

| Field | Description |
| --- | --- |
| `categories` | Distinct categories of the provider's released tools, sorted. |
| `created_at` | When the provider was added. |
| `description` | Provider description. |
| `id` | Provider ID. |
| `name` | Human-readable provider name. |
| `provider_kind` | Classifies the provider, for example `managed_api` or `byo_mcp` (one of your team's MCP servers). |

Operations: list.

API path: `/v2/action-gateway/tools/toolkits`

#### LoadBalancer

| Field | Description |
| --- | --- |
| `algorithm` | This field has been deprecated. |
| `created_at` | A time value given in ISO8601 combined date and time format that represents when the load balancer was created. |
| `disable_lets_encrypt_dns_records` | A boolean value indicating whether to disable automatic DNS record creation for Let's Encrypt certificates that are added to the load balancer. |
| `domains` | An array of objects specifying the domain configurations for a Global load balancer. |
| `droplet_ids` | An array containing the IDs of the Droplets assigned to the load balancer. |
| `enable_backend_keepalive` | A boolean value indicating whether HTTP keepalive connections are maintained to target Droplets. |
| `enable_proxy_protocol` | A boolean value indicating whether PROXY Protocol is in use. |
| `firewall` | An object specifying allow and deny rules to control traffic to the load balancer. |
| `forwarding_rules` | An array of objects specifying the forwarding rules for a load balancer. |
| `glb_settings` | An object specifying forwarding configurations for a Global load balancer. |
| `health_check` | An object specifying health check settings for the load balancer. |
| `http_idle_timeout_seconds` | An integer value which configures the idle timeout for HTTP requests to the target droplets. |
| `id` | A unique ID that can be used to identify and reference a load balancer. |
| `ip` | An attribute containing the public-facing IP address of the load balancer. |
| `ipv6` | An attribute containing the public-facing IPv6 address of the load balancer. |
| `name` | A human-readable name for a load balancer instance. |
| `network` | A string indicating whether the load balancer should be external or internal. |
| `network_stack` | A string indicating whether the load balancer will support IPv4 or both IPv4 and IPv6 networking. |
| `project_id` | The ID of the project that the load balancer is associated with. |
| `redirect_http_to_https` | A boolean value indicating whether HTTP requests to the load balancer on port 80 will be redirected to HTTPS on port 443. |
| `region` |  |
| `size` | This field has been replaced by the `size_unit` field for all regions except in AMS2, NYC2, and SFO1. |
| `size_unit` | How many nodes the load balancer contains. |
| `status` | A status string indicating the current state of the load balancer. |
| `sticky_sessions` | An object specifying sticky sessions settings for the load balancer. |
| `subnet_uuid` | A string specifying the UUID of the VPC subnet to which the load balancer is assigned. |
| `tag` | The name of a Droplet tag corresponding to Droplets assigned to the load balancer. |
| `target_load_balancer_ids` | An array containing the UUIDs of the Regional load balancers to be used as target backends for a Global load balancer. |
| `tls_cipher_policy` | A string indicating the policy for the TLS cipher suites used by the load balancer. |
| `type` | A string indicating whether the load balancer should be a standard regional HTTP load balancer, a regional network load balancer that routes traffic at the TCP/UDP transport layer, or a global load balancer. |
| `vpc_uuid` | A string specifying the UUID of the VPC to which the load balancer is assigned. |

Operations: create, list, load, remove, update.

API path: `/v2/load_balancers/{lb_id}/droplets`

#### LogsSearch

| Field | Description |
| --- | --- |
| `data` | Matching log records. |
| `filter` | A boolean filter tree for logs queries. |
| `order_by` | Sort clauses applied to the result set. |
| `pagination` | Pagination response. |
| `time_range` | An inclusive query time window. |

Operations: create.

API path: `/v2/insights/query/{region}/logs/search`

#### Logsink

| Field | Description |
| --- | --- |
| `config` |  |
| `id` |  |
| `sink_id` | A unique identifier for Logsink |
| `sink_name` | The name of the Logsink |
| `sink_type` |  |

Operations: load.

API path: `/v2/databases/{database_cluster_uuid}/logsink/{logsink_id}`

#### McpServer

| Field | Description |
| --- | --- |
| `api_key` | For `credentialRefSource` secret: the key or token itself. |
| `createdAt` | When the server was registered, in RFC 3339 format. |
| `credentialRef` | The secret reference supplied at registration when source=secret, or the team's OAuth credential ID when source=connection. |
| `credentialRefSource` | How requests to the server authenticate: none, secret (a key or token sent in the Authorization header), or connection (each user's own OAuth authorization). |
| `description` | Team-authored description, shown on the server's catalog card. |
| `endpoint` | HTTPS URL of the server's MCP endpoint. |
| `id` |  |
| `lastSyncedAt` | When discovery last succeeded, in RFC 3339 format; empty until the first success. |
| `oauth_authorization_ttl_seconds` | How long a user's authorization is reused before re-consent. |
| `oauth_authorize_url` | OAuth authorization endpoint. |
| `oauth_client_id` | Required for `credentialRefSource` connection: the client ID of your team's OAuth client for the server. |
| `oauth_client_secret` | Required for `credentialRefSource` connection. |
| `oauth_scopes` | OAuth scopes requested from each user. |
| `oauth_token_url` | Required for `credentialRefSource` connection: the OAuth token endpoint, under the same rules as `oauth_authorize_url`. |
| `protocolVersion` | MCP protocol revision negotiated with the server. |
| `serverRef` | Server identifier, unique within your team. |
| `syncError` | Why the latest discovery failed; empty after a successful one. |
| `syncStatus` | Outcome of the latest discovery: pending (no discovery has finished yet), ok, failed, or `unsupported_protocol`. |
| `toolCount` | Number of tools discovered on the server, whether enabled or not. |
| `transport` | Always `streamable_http`. |
| `updatedAt` | When the server was last modified, in RFC 3339 format. |

Operations: create, list, load, remove, update.

API path: `/v2/action-gateway/mcp-servers`

#### Message

| Field | Description |
| --- | --- |
| `content` | Assistant output blocks (`text` and/or `tool_use`). |
| `id` | Unique identifier for this message object. |
| `max_tokens` | Maximum tokens to generate before stopping. |
| `messages` | Conversation turns. |
| `metadata` | Optional request metadata. |
| `model` | Model that produced the message. |
| `reasoning_effort` | DigitalOcean extension for reasoning-capable models. |
| `role` | Always `assistant` for this response. |
| `speed` | DigitalOcean extension for preferred inference speed. |
| `stop_reason` | Why generation stopped. |
| `stop_sequence` | When `stop_reason` is `stop_sequence`, the sequence that matched. |
| `stop_sequences` | Custom strings that stop generation when produced. |
| `stream` | When true, the response is streamed using server-sent events (SSE). |
| `system` | System prompt as plain text or as an array of text blocks. |
| `temperature` | Sampling temperature between 0.0 and 1.0. |
| `thinking` | Extended thinking configuration. |
| `tool_choice` | Controls how the model uses tools: automatic selection, require any tool, force a specific tool, or a string form accepted by the service. |
| `tools` | Tool definitions the model may invoke. |
| `top_k` | Top-K sampling cutoff. |
| `top_p` | Nucleus sampling; use either `temperature` or `top_p`, not both. |
| `type` | Object type discriminator. |
| `usage` | Token usage for a non-streaming `POST /v1/messages` response. |

Operations: create.

API path: `/v1/messages`

#### Metric

| Field | Description |
| --- | --- |
| `result` | Result of query. |
| `resultType` |  |

Operations: load.

API path: `/v2/monitoring/metrics/database/mysql/load`

#### Model

| Field | Description |
| --- | --- |
| `created` | The Unix timestamp (in seconds) when the model was created. |
| `id` | The model identifier, which can be referenced in the API endpoints. |
| `object` | The object type, which is always "model". |
| `owned_by` | The organization that owns the model. |

Operations: list.

API path: `/v1/models`

#### Monitoring

| Field | Description |
| --- | --- |
| `alerts` |  |
| `compare` |  |
| `config` | OpenSearch destination configuration with `credentials` omitted. |
| `description` |  |
| `destination` |  |
| `enabled` |  |
| `entities` |  |
| `id` | A unique identifier for a destination. |
| `name` | destination name |
| `resources` | List of resources identified by their URNs. |
| `tags` |  |
| `type` | The destination type. |
| `uuid` |  |
| `value` |  |
| `window` |  |

Operations: create, list, load, remove, update.

API path: `/v2/monitoring/sinks/destinations/{destination_uuid}`

#### N1Click

| Field | Description |
| --- | --- |
| `slug` | The slug identifier for the 1-Click application. |
| `type` | The type of the 1-Click application. |

Operations: list.

API path: `/v2/1-clicks`

#### N1ClickApplication

| Field | Description |
| --- | --- |
| `addon_slugs` | An array of 1-Click Application slugs to be installed to the Kubernetes cluster. |
| `cluster_uuid` | A unique ID for the Kubernetes cluster to which the 1-Click Applications will be installed. |
| `message` | A message about the result of the request. |

Operations: create.

API path: `/v2/1-clicks/kubernetes`

#### NeighborId

| Field | Description |
| --- | --- |
| `neighbor_ids` | An array of arrays. |

Operations: list.

API path: `/v2/reports/droplet_neighbors_ids`

#### Nfs

| Field | Description |
| --- | --- |
| `access_points` | Access points configured on this share. |
| `created_at` | Timestamp for when the NFS share was created. |
| `host` | The host IP of the NFS server that will be accessible from the associated VPC |
| `id` | The unique identifier of the NFS share. |
| `mount_path` | Path at which the share will be available, to be mounted at a target of the user's choice within the client |
| `name` | The human-readable name of the share. |
| `performance_tier` | The performance tier of the share. |
| `region` | The DigitalOcean region slug (e.g., nyc2, atl1) where the NFS share resides. |
| `size_gib` | The desired/provisioned size of the share in GiB (Gibibytes). |
| `status` | The current status of the share. |
| `vpc_ids` | List of VPC IDs that should be able to access the share. |

Operations: create, list, load, remove.

API path: `/v2/nfs`

#### NfsAction2

| Field | Description |
| --- | --- |
| `id` |  |

Operations: create.

API path: `/v2/nfs/{nfs_id}/actions`

#### NfsSnapshot

| Field | Description |
| --- | --- |
| `created_at` | The timestamp when the snapshot was created. |
| `id` | The unique identifier of the snapshot. |
| `name` | The human-readable name of the snapshot. |
| `region` | The DigitalOcean region slug where the snapshot is located. |
| `share_id` | The unique identifier of the share from which this snapshot was created. |
| `size_gib` | The size of the snapshot in GiB. |
| `status` | The current status of the snapshot. |

Operations: list, load.

API path: `/v2/nfs/snapshots`

#### OnlineMigration

| Field | Description |
| --- | --- |
| `created_at` | The time the migration was initiated, in ISO 8601 format. |
| `disable_ssl` | Enables SSL encryption when connecting to the source database. |
| `id` | The ID of the most recent migration. |
| `ignore_dbs` | List of databases that should be ignored during migration. |
| `source` |  |
| `status` | The current status of the migration. |

Operations: load, update.

API path: `/v2/databases/{database_cluster_uuid}/online-migration`

#### Option

| Field | Description |
| --- | --- |
| `options` |  |
| `version_availability` |  |

Operations: load.

API path: `/v2/databases/options`

#### Organization

| Field | Description |
| --- | --- |

Operations: create, list.

API path: `/v2/organizations/team`

#### OutputView

| Field | Description |
| --- | --- |
| `audit` | Null on a preview, which stores nothing. |
| `description` | View description. |
| `fields` | The dotted output paths a projection keeps; arrays are traversed element-wise. |
| `id` |  |
| `kind` | `OUTPUT_VIEW_KIND_PROJECTION` or `OUTPUT_VIEW_KIND_TRANSFORM`. |
| `name` | View name, unique per tool version among its owner's views. |
| `output_schema` | The JSON Schema every result of this view satisfies. |
| `team_id` | Your team's ID on your team's views, and empty for a view DigitalOcean publishes to every team. |
| `tool` | The provider-qualified tool slug, for example `exa_search`. |
| `tool_id` | The opaque identity of the exact tool version the view is bound to; tool and version are its readable coordinates. |
| `version` | The tool version, for example `v3`. |
| `view_id` | Output view ID, for example `ov_` followed by 32 hex digits. |

Operations: create, list, load, remove.

API path: `/v2/action-gateway/output-views`

#### PartnerNetworkConnect

| Field | Description |
| --- | --- |
| `bgp` | The BGP configuration for the partner attachment. |
| `bgp_auth_key` |  |
| `children` | An array of associated partner attachment UUIDs. |
| `cidr` | A CIDR block representing a remote route. |
| `connection_bandwidth_in_mbps` | The bandwidth (in Mbps) of the connection. |
| `created_at` | A time value given in ISO8601 combined date and time format. |
| `id` | A unique ID that can be used to identify and reference the partner attachment. |
| `naas_provider` | The Network as a Service (NaaS) provider for the partner attachment. |
| `name` | The name of the partner attachment. |
| `parent_uuid` | Associated partner attachment UUID |
| `region` | The region where the partner attachment is located. |
| `state` | The current operational state of the attachment. |
| `vpc_ids` | An array of VPC network IDs. |

Operations: create, list, load, remove, update.

API path: `/v2/partner_network_connect/attachments/{pa_id}/service_key`

#### PrepaymentConfig

| Field | Description |
| --- | --- |
| `config` |  |
| `status` |  |

Operations: load.

API path: `/v2/customers/my/prepayment_config`

#### PrepaymentStatus

| Field | Description |
| --- | --- |
| `balance` | Current prepayment balance. |
| `blocked` | Whether the prepayment gate is currently blocking usage. |
| `eligible` | Whether the account is eligible for the prepayment gate experience. |
| `is_auto_prepay_enabled` | Whether automatic prepayment top-up is enabled. |
| `month_to_date_balance` | Current account balance including month-to-date usage. |

Operations: load.

API path: `/v2/customers/my/prepayment_status`

#### Project

| Field | Description |
| --- | --- |
| `created_at` | A time value given in ISO8601 combined date and time format that represents when the project was created. |
| `description` | The description of the project. |
| `environment` | The environment of the project's resources. |
| `id` | The unique universal identifier of this project. |
| `is_default` | If true, all resources will be added to this project if no project is specified. |
| `name` | The human-readable name for the project. |
| `owner_id` | The integer id of the project owner. |
| `owner_uuid` | The unique universal identifier of the project owner. |
| `purpose` | The purpose of the project. |
| `updated_at` | A time value given in ISO8601 combined date and time format that represents when the project was updated. |

Operations: create, list, load, patch, remove, update.

API path: `/v2/projects`

#### ProjectResource

| Field | Description |
| --- | --- |
| `assigned_at` | A time value given in ISO8601 combined date and time format that represents when the project was created. |
| `id` |  |
| `links` | The links object contains the `self` object, which contains the resource relationship. |
| `resources` | All resources, including the ones added in the request, that are assigned to the project. |
| `status` | The status of assigning and fetching the resources. |
| `urn` | The uniform resource name (URN) for the resource in the format do:resource_type:resource_id. |

Operations: create, list.

API path: `/v2/projects/{project_id}/resources`

#### PromQuery

| Field | Description |
| --- | --- |
| `result` | Result payload shape depends on `resultType`. |
| `resultType` |  |

Operations: create, load.

API path: `/v2/insights/query/{region}/prom/api/v1/query`

#### PromQueryRange

| Field | Description |
| --- | --- |
| `result` | One entry per matching series, each carrying the samples evaluated at every step across the requested range. |
| `resultType` |  |

Operations: create, load.

API path: `/v2/insights/query/{region}/prom/api/v1/query_range`

#### PromSeries

| Field | Description |
| --- | --- |
| `data` |  |
| `status` |  |

Operations: create, list.

API path: `/v2/insights/query/{region}/prom/api/v1/series`

#### PromStringList

| Field | Description |
| --- | --- |
| `data` |  |
| `status` |  |

Operations: create, list.

API path: `/v2/insights/query/{region}/prom/api/v1/labels`

#### Region

| Field | Description |
| --- | --- |
| `available` | This is a boolean value that represents whether new Droplets can be created in this region. |
| `features` | This attribute is set to an array which contains features available in this region |
| `name` | The display name of the region. |
| `sizes` | This attribute is set to an array which contains the identifying slugs for the sizes available in this region. |
| `slug` | A human-readable string that is used as a unique identifier for each region. |

Operations: list.

API path: `/v2/regions`

#### ReservedIPv6

| Field | Description |
| --- | --- |
| `droplet` | Requires `droplet:read` scope. |
| `ip` | The public IP address of the reserved IPv6. |
| `region_slug` | The region that the reserved IPv6 is reserved to. |
| `reserved_at` | The date and time when the reserved IPv6 was reserved. |

Operations: create, list, load, remove.

API path: `/v2/reserved_ipv6`

#### ReservedIPv6Action

| Field | Description |
| --- | --- |
| `action` |  |

Operations: create.

API path: `/v2/reserved_ipv6/{reserved_ipv6}/actions`

#### ReservedIp

| Field | Description |
| --- | --- |
| `droplet` | The Droplet that the reserved IP has been assigned to. |
| `id` |  |
| `ip` | The public IP address of the reserved IP. |
| `links` |  |
| `locked` | A boolean value indicating whether or not the reserved IP has pending actions preventing new ones from being submitted. |
| `project_id` | The UUID of the project to which the reserved IP currently belongs.<br><br>Requires `project:read` scope. |
| `region` |  |
| `reserved_ip` |  |

Operations: create, list, load, remove.

API path: `/v2/reserved_ips`

#### ReservedIpAction

| Field | Description |
| --- | --- |
| `action` |  |
| `completed_at` | A time value given in ISO8601 combined date and time format that represents when the action was completed. |
| `id` | A unique numeric ID that can be used to identify and reference an action. |
| `project_id` | The UUID of the project to which the reserved IP currently belongs. |
| `region` |  |
| `region_slug` | A human-readable string that is used as a unique identifier for each region. |
| `resource_id` | A unique identifier for the resource that the action is associated with. |
| `resource_type` | The type of resource that the action is associated with. |
| `started_at` | A time value given in ISO8601 combined date and time format that represents when the action was initiated. |
| `status` | The current status of the action. |
| `type` | This is the type of action that the object represents. |

Operations: create, list, load.

API path: `/v2/reserved_ips/{reserved_ip}/actions`

#### Resync

| Field | Description |
| --- | --- |
| `authorization` | Set when discovery could not run because `user_id` has no authorized connection to this server yet. |
| `mcpServer` | The server, including `syncStatus` and `syncError`. |
| `pending` | True when discovery is still running (HTTP 202). |
| `tools` | Every tool discovered on the server when discovery finished in time; empty when pending is true. |
| `user_id` | Required for a server registered with `credentialRefSource` connection: discovery reaches the server as this user, through their connection, because such a server has no team-wide credential. |

Operations: create.

API path: `/v2/action-gateway/mcp-servers/{server_ref}/resync`

#### Search

| Field | Description |
| --- | --- |
| `actorId` | Empty when the session is not bound to an actor. |
| `agentName` | Name of the agent that started the session. |
| `agentUrn` | URN of the agent that started the session. |
| `auth_type` | Deprecated: read `auth_types`, since a provider may accept more than one credential kind. |
| `auth_types` | Credential kinds the provider accepts, sorted: none|oauth|`shared_api_key`|unknown|`user_oauth_app`|`user_token`. |
| `config` | Session options as supplied at creation. |
| `connection_parameters` | Non-sensitive values collected when creating a connection. |
| `createdAt` | When the session was created. |
| `credential_parameters` | Non-secret values collected when registering an API key provider credential. |
| `description` | Description of the latest version. |
| `display_name` | Human-readable label of the latest version. |
| `insights` | Omitted when no explicit customer Insights choice was stored. |
| `latest_version` | Latest version number, as a string. |
| `name` | The required human-readable session name. |
| `network` | Omitted when the request omitted network. |
| `oauth_client_setup_url` | HTTPS page at the provider where a team creates that OAuth client, such as its developer console or setup guide. |
| `oauth_redirect_url` | Callback URL a team must register with the provider when it creates its own OAuth client. |
| `owning_user_id` | DigitalOcean user ID of the user who created the session, when recorded. |
| `policy` | The session's tool-permission policy. |
| `reference_latest` | The toolbelt name, which refers to whichever version is latest. |
| `scopes` | The OAuth scopes a connection may request; a connection that requests none gets all of them. |
| `sessionUrn` | Session URN, for example `do:managed_agent_session:<uuid>`. |
| `status` | active, or deprecated once the toolbelt is deleted. |
| `tool_count` | Number of members in the latest version. |
| `tools` | Omitted when the request omitted tools (all tools). |
| `updatedAt` | When the session was last modified. |
| `updated_at` | When the latest version was last modified, in RFC 3339 format. |
| `version_count` | Number of versions recorded under this name, including versions from before the toolbelt was deleted and the name reused. |

Operations: list.

API path: `/v2/action-gateway/sessions/search`

#### Security

| Field | Description |
| --- | --- |
| `created_at` | When scan was created. |
| `findings` |  |
| `id` | The unique identifier for the scan. |
| `name` | The name of the affected resource. |
| `resource` | The URN of a resource to exclude from future scans. |
| `resources` | The URNs of resources to suppress for the rule. |
| `rule_uuid` | The rule UUID to suppress for the listed resources. |
| `status` | The status of the scan. |
| `tier_coverage` | Scan coverage for each available plan tier. |
| `type` | The type of the affected resource. |
| `urn` | The URN for the affected resource. |

Operations: create, list, load, remove, update.

API path: `/v2/security/scans`

#### Setting

| Field | Description |
| --- | --- |
| `plan_downgrades` |  |
| `settings` |  |
| `tier_coverage` |  |

Operations: load.

API path: `/v2/security/settings`

#### Size

| Field | Description |
| --- | --- |
| `available` | This is a boolean value that represents whether new Droplets can be created with this size. |
| `description` | A string describing the class of Droplets created from this size. |
| `disk` | The amount of disk space set aside for Droplets of this size. |
| `disk_info` | An array of objects containing information about the disks available to Droplets created with this size. |
| `gpu_info` | An object containing information about the GPU capabilities of Droplets created with this size. |
| `memory` | The amount of RAM allocated to Droplets created of this size. |
| `price_hourly` | This describes the price of the Droplet size as measured hourly. |
| `price_monthly` | This attribute describes the monthly cost of this Droplet size if the Droplet is kept for an entire month. |
| `regions` | An array containing the region slugs where this size is available for Droplet creates. |
| `slug` | A human-readable string that is used to uniquely identify each size. |
| `transfer` | The amount of transfer bandwidth that is available for Droplets created in this size. |
| `vcpus` | The number of CPUs allocated to Droplets of this size. |

Operations: list.

API path: `/v2/sizes`

#### Snapshot

| Field | Description |
| --- | --- |
| `created_at` | A time value given in ISO8601 combined date and time format that represents when the snapshot was created. |
| `id` | The unique identifier for the snapshot. |
| `min_disk_size` | The minimum size in GB required for a volume or Droplet to use this snapshot. |
| `name` | A human-readable name for the snapshot. |
| `regions` | An array of the regions that the snapshot is available in. |
| `resource_id` | The unique identifier for the resource that the snapshot originated from. |
| `resource_type` | The type of resource that the snapshot originated from. |
| `size_gigabytes` | The billable size of the snapshot in gigabytes. |
| `tags` | An array of Tags the snapshot has been tagged with.<br><br>Requires `tag:read` scope. |

Operations: list, load, remove.

API path: `/v2/snapshots`

#### SpacesKey

| Field | Description |
| --- | --- |
| `access_key` | The Access Key ID used to access a bucket. |
| `created_at` | The date and time the key was created. |
| `grants` | The list of permissions for the access key. |
| `id` |  |
| `keys` |  |
| `name` | The access key's name. |

Operations: create, list, load, patch, remove, update.

API path: `/v2/spaces/keys`

#### SqlMode

| Field | Description |
| --- | --- |
| `sql_mode` | A string specifying the configured SQL modes for the MySQL cluster. |

Operations: load.

API path: `/v2/databases/{database_cluster_uuid}/sql_mode`

#### SshKey

| Field | Description |
| --- | --- |
| `fingerprint` | A unique identifier that differentiates this key from other keys using a format that SSH recognizes. |
| `id` | A unique identification number for this key. |
| `name` | A human-readable display name for this key, used to easily identify the SSH keys when they are displayed. |
| `public_key` | The entire public key string that was uploaded. |

Operations: create, list, load, remove, update.

API path: `/v2/account/keys`

#### Systemone

| Field | Description |
| --- | --- |
| `answers` | A map of question name to answer, using the same keys as the request's `questions` object. |
| `model` | Model ID that produced the response. |
| `questions` | A map of question name to question definition. |
| `state` | The state to evaluate. |
| `usage` | Token usage for the request. |

Operations: create.

API path: `/v1/systemone`

#### Tag

| Field | Description |
| --- | --- |
| `id` |  |
| `name` | The name of the tag. |
| `resources` | An embedded object containing key value pairs of resource type and resource statistics. |

Operations: create, list, load, remove.

API path: `/v2/tags/{tag_id}/resources`

#### Tool

| Field | Description |
| --- | --- |
| `category` | Best-effort catalog metadata and is empty for a large share of the catalog. |
| `description` | What the tool does. |
| `history` | Present only when the request set `include_history`. |
| `id` |  |
| `name` | The unqualified tool name, without the provider prefix. |
| `provider` | The ID of the provider that offers the tool, broken out so a client never has to split `tool_slug`. |
| `snapshot` | When the metrics were computed and the window they cover. |
| `title` | Human-readable tool title. |
| `tool` | The tool's metrics over the window. |
| `tool_slug` | The provider-qualified, stable tool identifier (`<provider>_<name>`). |
| `version` | The version this toolbelt version pins for the member, matching the `@<version>` suffix in the corresponding toolbelt.tools entry. |

Operations: list, load.

API path: `/v2/action-gateway/toolbelts/{name}/providers/{provider}/tools`

#### Toolbelt

| Field | Description |
| --- | --- |
| `created_at` | When this version was created, in RFC 3339 format. |
| `description` | Team-authored description. |
| `display_name` | Human-readable label. |
| `id` |  |
| `latest_version` | Latest version number, as a string. |
| `name` | Toolbelt name, unique among your team's active toolbelts. |
| `next_page_token` | Token for the next page of `tool_details`; empty on the last page. |
| `reference` | `<name>@<version>`, identifying this exact version. |
| `reference_latest` | The toolbelt name, which refers to whichever version is latest. |
| `status` | active, or deprecated once the toolbelt is deleted. |
| `tool_count` | Number of entries in tools. |
| `tool_details` | The requested page of resolved catalog metadata for the members named in toolbelt.tools. |
| `toolbelt` | The requested toolbelt version. |
| `tools` | Members, sorted, each as `<tool_slug>@<version>`: the tool and the version this toolbelt version pins. |
| `updated_at` | When this version was last modified, in RFC 3339 format. |
| `version` | Version number of this toolbelt version, as a string, for example `3`. |
| `version_count` | Number of versions recorded under this name, including versions from before the toolbelt was deleted and the name reused. |

Operations: create, list, load, remove.

API path: `/v2/action-gateway/toolbelts/{name}/tools/add`

#### Uptime

| Field | Description |
| --- | --- |
| `comparison` | The comparison operator used against the alert's threshold. |
| `enabled` | A boolean value indicating whether the check is enabled/disabled. |
| `id` | A unique ID that can be used to identify and reference the alert. |
| `name` | A human-friendly display name. |
| `notifications` | The notification settings for a trigger alert. |
| `period` | Period of time the threshold must be exceeded to trigger the alert. |
| `previous_outage` |  |
| `regions` | An array containing the selected regions to perform healthchecks from. |
| `target` | The endpoint to perform healthchecks on. |
| `threshold` | The threshold at which the alert will enter a trigger state. |
| `type` | The type of alert. |

Operations: create, list, load, remove, update.

API path: `/v2/uptime/checks/{check_id}/alerts`

#### User

| Field | Description |
| --- | --- |
| `connections` | The user's connections that are not revoked, sorted by provider. |
| `groups` | A list of in-cluster groups that the user belongs to. |
| `id` |  |
| `pagination` | Paging applied to this response and the total number of users. |
| `sessions` | Sessions bound to the user, oldest first. |
| `user_id` | The user ID: a session `actor_id` or a connection `user_id`. |
| `user_ids` | User IDs on this page. |
| `username` | The username for the cluster admin user. |

Operations: list, load.

API path: `/v2/action-gateway/users`

#### VectorDatabase

| Field | Description |
| --- | --- |
| `id` |  |

Operations: remove.

API path: `/v2/vector-databases/{id}`

#### VectordbBackup

| Field | Description |
| --- | --- |
| `backup_id` | Unique identifier for the backup (e.g., "vectordb-{uuid}-20240101-120000"). |
| `completed_at` | Timestamp when the backup process completed. |
| `started_at` | Timestamp when the backup process started. |
| `status` | Status of the backup: SUCCESS. |

Operations: list.

API path: `/v2/vector-databases/{id}/backups`

#### VectordbGetRestoreStatus

| Field | Description |
| --- | --- |
| `backup_id` | The backup ID being restored. |
| `error` | Error message if the restore failed. |
| `status` | Current status: STARTED, TRANSFERRING, TRANSFERRED, FINALIZING, SUCCESS, FAILED, CANCELLING, CANCELED. |

Operations: load.

API path: `/v2/vector-databases/{id}/backups/{backup_id}/restore`

#### VectordbGetVectorDb

| Field | Description |
| --- | --- |
| `config` | VectorDBConfig holds optional, advanced cluster settings. |
| `created_at` |  |
| `endpoints` | VectorDBEndpoints contains the connection endpoints for a vector database instance. |
| `forked_from_id` | ID of the vector database this instance was forked from. |
| `id` |  |
| `last_restore_id` | Backup_id of the most recent restore initiated against this instance. |
| `name` | Required. |
| `owner_uuid` |  |
| `project_id` | Project this database belongs to. |
| `region` | Required. |
| `size` | Resource tier: small, medium, or large. |
| `status` | Lifecycle state: pending, creating, active, errored, or deleting. |
| `tags` | A set of arbitrary tags to organize your vector database |
| `updated_at` |  |

Operations: create, list, load.

API path: `/v2/vector-databases/{id}/resize`

#### VectordbGetVectorDbAdminCredential

| Field | Description |
| --- | --- |
| `api_token` | API token for that user. |
| `user_id` | Database user id from the cluster secret (opaque; matches what was provisioned). |

Operations: load.

API path: `/v2/vector-databases/{id}/credentials`

#### VectordbRestoreBackup

| Field | Description |
| --- | --- |
| `backup_id` | The backup ID being restored. |
| `id` | Required. |
| `status` | Initial status of the restore operation (e.g., "STARTED"). |

Operations: create.

API path: `/v2/vector-databases/{id}/backups/{backup_id}/restore`

#### VectordbUpdateVectorDb

| Field | Description |
| --- | --- |
| `config` | VectorDBConfig holds optional, advanced cluster settings. |
| `created_at` |  |
| `endpoints` | VectorDBEndpoints contains the connection endpoints for a vector database instance. |
| `forked_from_id` | ID of the vector database this instance was forked from. |
| `id` | ID of the vector database. |
| `last_restore_id` | Backup_id of the most recent restore initiated against this instance. |
| `name` |  |
| `owner_uuid` |  |
| `project_id` | Project this database belongs to. |
| `region` |  |
| `size` | Resource tier: small, medium, or large. |
| `status` | Lifecycle state: pending, creating, active, errored, or deleting. |
| `tags` |  |
| `updated_at` |  |

Operations: update.

API path: `/v2/vector-databases/{id}`

#### VectordbUpdateVectorDbTag

| Field | Description |
| --- | --- |
| `config` | VectorDBConfig holds optional, advanced cluster settings. |
| `created_at` |  |
| `endpoints` | VectorDBEndpoints contains the connection endpoints for a vector database instance. |
| `forked_from_id` | ID of the vector database this instance was forked from. |
| `id` | Required. |
| `last_restore_id` | Backup_id of the most recent restore initiated against this instance. |
| `name` |  |
| `owner_uuid` |  |
| `project_id` | Project this database belongs to. |
| `region` |  |
| `size` | Resource tier: small, medium, or large. |
| `status` | Lifecycle state: pending, creating, active, errored, or deleting. |
| `tags` | Tags to set on the vector database. |
| `updated_at` |  |

Operations: update.

API path: `/v2/vector-databases/{id}/tags`

#### Vpc

| Field | Description |
| --- | --- |
| `created_at` | A time value given in ISO8601 combined date and time format. |
| `default` | A boolean value indicating whether or not the VPC is the default network for the region. |
| `description` | A free-form text field for describing the VPC's purpose. |
| `id` | A unique ID that can be used to identify and reference the VPC. |
| `ip_range` | The range of IP addresses in the VPC in CIDR notation. |
| `name` | The name of the VPC. |
| `region` | The slug identifier for the region where the VPC will be created. |
| `status` | The current status of the VPC peering. |
| `urn` | The uniform resource name (URN) for the resource in the format do:resource_type:resource_id. |
| `vpc_ids` | An array of the two peered VPCs IDs. |

Operations: create, list, load, patch, remove, update.

API path: `/v2/vpcs/{vpc_id}/peerings`

#### VpcNatGateway

| Field | Description |
| --- | --- |
| `created_at` | A time value given in ISO8601 combined date and time format that represents when the VPC NAT gateway was created. |
| `egresses` | An object containing egress information for the VPC NAT gateway. |
| `icmp_timeout_seconds` | The ICMP timeout in seconds for the VPC NAT gateway. |
| `id` | The unique identifier for the VPC NAT gateway. |
| `name` | The human-readable name of the VPC NAT gateway. |
| `region` | The region in which the VPC NAT gateway is created. |
| `size` | The size of the VPC NAT gateway. |
| `state` | The current state of the VPC NAT gateway. |
| `tcp_timeout_seconds` | The TCP timeout in seconds for the VPC NAT gateway. |
| `type` | The type of the VPC NAT gateway. |
| `udp_timeout_seconds` | The UDP timeout in seconds for the VPC NAT gateway. |
| `updated_at` | A time value given in ISO8601 combined date and time format that represents when the VPC NAT gateway was last updated. |
| `vpcs` | An array of VPCs associated with the VPC NAT gateway. |

Operations: create, list, load, remove, update.

API path: `/v2/vpc_nat_gateways`

#### VpcPeering

| Field | Description |
| --- | --- |
| `created_at` | A time value given in ISO8601 combined date and time format. |
| `id` | A unique ID that can be used to identify and reference the VPC peering. |
| `name` | The name of the VPC peering. |
| `status` | The current status of the VPC peering. |
| `vpc_ids` | An array of the two peered VPCs IDs. |

Operations: create, list, load, remove, update.

API path: `/v2/vpc_peerings`

#### VpcRoutesPublicPreview

| Field | Description |
| --- | --- |
| `created_at` | The time when the route was created. |
| `destination_cidr` | A valid IPv4 CIDR accepted by the VPC routing product. |
| `id` | The unique identifier of the route. |
| `modifiable` | Whether the caller can update or delete the route. |
| `target_urns` | The URNs of supported next-hop resources. |
| `type` | The route type inferred from how the route is sourced. |

Operations: create, list, remove, update.

API path: `/v2/vpcs/{vpc_uuid}/subnets/{subnet_uuid}/routes`

#### VpcSubnetsPublicPreview

| Field | Description |
| --- | --- |
| `created_at` | The time when the VPC subnet was created. |
| `default` | Whether this is the default subnet for the VPC. |
| `id` | The unique identifier of the VPC subnet. |
| `ip_range` | The IPv4 range assigned to the subnet in CIDR notation. |
| `meta` | Additional information about the VPC subnet. |
| `name` | The human-readable name of the VPC subnet. |
| `region` | The slug of the region containing the VPC subnet. |
| `type` | The type of the VPC subnet. |
| `urn` | The uniform resource name of the VPC subnet. |

Operations: create, list, load, remove, update.

API path: `/v2/vpcs/{vpc_uuid}/subnets`



## Entities


### AccessPoint

Create an instance: `const access_point = client.AccessPoint()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `access_policy` | `Record<string, any>` | Provider-agnostic NFS access policy for an access point. |
| `created_at` | `string` | The timestamp when the access point was created. |
| `id` | `string` | The unique identifier of the access point. |
| `is_default` | `boolean` | Whether this is the share's default access point. |
| `name` | `string` | The human-readable name of the access point. |
| `path` | `string` | The export sub-path for this access point (always starts with `/`). |
| `share_id` | `string` | The unique identifier of the share this access point belongs to. |
| `status` | `string` | The current lifecycle status of an access point. |
| `updated_at` | `string` | The timestamp when the access point was last updated. |
| `vpc_id` | `string` | The VPC this access point is pinned to. |

#### Example: Load

```ts
const access_point = await client.AccessPoint().load({ id: 'access_point_id' })
```

#### Example: List

```ts
const access_points = await client.AccessPoint().list({ share_id: "example" })
```

#### Example: Create

```ts
const access_point = await client.AccessPoint().create({
  share_id: 'example_share_id',
  access_policy: {},
  created_at: 'example_created_at',
  id: 'example_id',
  is_default: true,
  name: 'example_name',
  path: 'example_path',
  status: 'example_status',
  updated_at: 'example_updated_at',
})
```


### Account

Create an instance: `const account = client.Account()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `droplet_limit` | `number` | The total number of Droplets current user or team may have active at one time. |
| `email` | `string` | The email address used by the current user to register for DigitalOcean. |
| `email_verified` | `boolean` | If true, the user has verified their account via email. |
| `floating_ip_limit` | `number` | The total number of Floating IPs the current user or team may have. |
| `name` | `string` | The display name for the current user. |
| `status` | `string` | This value is one of "active", "warning" or "locked". |
| `status_message` | `string` | A human-readable message giving more details about the status of the account. |
| `team` | `Record<string, any>` | When authorized in a team context, includes information about the current team. |
| `uuid` | `string` | The unique universal identifier for the current user. |

#### Example: Load

```ts
const account = await client.Account().load()
```


### Action

Create an instance: `const action = client.Action()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `action` | `Record<string, any>` |  |
| `completed_at` | `string` | A time value given in ISO8601 combined date and time format that represents when the action was completed. |
| `id` | `number` | A unique numeric ID that can be used to identify and reference an action. |
| `region` | `Record<string, any>` |  |
| `region_slug` | `string` | A human-readable string that is used as a unique identifier for each region. |
| `resource_id` | `number` | A unique identifier for the resource that the action is associated with. |
| `resource_type` | `string` | The type of resource that the action is associated with. |
| `started_at` | `string` | A time value given in ISO8601 combined date and time format that represents when the action was initiated. |
| `status` | `string` | The current status of the action. |
| `type` | `string` | This is the type of action that the object represents. |

#### Example: Load

```ts
const action = await client.Action().load({ id: 1 })
```

#### Example: List

```ts
const actions = await client.Action().list()
```

#### Example: Create

```ts
const action = await client.Action().create({
  image_id: 1,
  region: {},
})
```


### ActorLimit

Create an instance: `const actor_limit = client.ActorLimit()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `category` | `string` | The category the limit applies to. |
| `id` | `string` |  |
| `requests_per_minute` | `string` | Calls allowed per minute. |

#### Example: List

```ts
const actor_limits = await client.ActorLimit().list({ id: "example" })
```


### AddOn

Create an instance: `const add_on = client.AddOn()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `app_name` | `string` | The name of the application associated with the resource. |
| `app_slug` | `string` | The slug identifier for the application associated with the resource. |
| `description` | `string` | A brief description of the metadata item. |
| `display_name` | `string` | The display name of the metadata item. |
| `has_config` | `boolean` | Indicates if the resource has configuration values set by the vendor. |
| `id` | `number` | Unique identifier for the addon metadata item. |
| `message` | `string` | A message related to the resource, if applicable. |
| `metadata` | `any[]` | Metadata associated with the resource, set by the user. |
| `name` | `string` | The name of the addon resource. |
| `options` | `any[]` |  |
| `plan_name` | `string` | The name of the plan associated with the resource. |
| `plan_price_per_month` | `number` | The price of the plan per month in US dollars. |
| `plan_slug` | `string` | The slug identifier for the plan associated with the resource. |
| `sso_url` | `string` | The Single Sign-On URL for the resource, if applicable. |
| `state` | `string` | The state the resource is currently in. |
| `type` | `string` | The data type of the metadata value. |
| `uuid` | `string` | The unique identifier for the addon resource. |

#### Example: Load

```ts
const add_on = await client.AddOn().load({ resource_uuid: 'resource_uuid' })
```

#### Example: List

```ts
const add_ons = await client.AddOn().list({ app_slug: "example" })
```

#### Example: Create

```ts
const add_on = await client.AddOn().create({
  app_slug: 'example_app_slug',
  description: 'example_description',
  display_name: 'example_display_name',
  has_config: true,
  id: 1,
  name: 'example_name',
  plan_slug: 'example_plan_slug',
  state: 'example_state',
  type: 'example_type',
  uuid: 'example_uuid',
})
```


### ApiAgentVersion

Create an instance: `const api_agent_version = client.ApiAgentVersion()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `agent_uuid` | `string` | Uuid of the agent this version belongs to |
| `attached_child_agents` | `any[]` | List of child agent relationships |
| `attached_functions` | `any[]` | List of function versions |
| `attached_guardrails` | `any[]` | List of guardrail version |
| `attached_knowledgebases` | `any[]` | List of knowledge base agent versions |
| `can_rollback` | `boolean` | Whether the version is able to be rolled back to |
| `created_at` | `string` | Creation date |
| `created_by_email` | `string` | User who created this version |
| `currently_applied` | `boolean` | Whether this is the currently applied configuration |
| `description` | `string` | Description of the agent |
| `id` | `string` | Unique identifier |
| `instruction` | `string` | Instruction for the agent |
| `k` | `number` | K value for the agent's configuration |
| `max_tokens` | `number` | Max tokens setting for the agent |
| `model_name` | `string` | Name of model associated to the agent version |
| `name` | `string` | Name of the agent |
| `provide_citations` | `boolean` | Whether the agent should provide in-response citations |
| `retrieval_method` | `string` | - RETRIEVAL_METHOD_UNKNOWN: The retrieval method is unknown - RETRIEVAL_METHOD_REWRITE: The retrieval method is rewrite - RETRIEVAL_METHOD_STEP_BACK: The retrieval method is step back - RETRIEVAL_METHOD_SUB_QUERIES: The retrieval method is… |
| `tags` | `any[]` | Tags associated with the agent |
| `temperature` | `number` | Temperature setting for the agent |
| `top_p` | `number` | Top_p setting for the agent |
| `trigger_action` | `string` | Action triggering the configuration update |
| `version_hash` | `string` | Version hash |

#### Example: List

```ts
const api_agent_versions = await client.ApiAgentVersion().list({ agent_id: "example" })
```


### ApiCreateAgentApiKeyOutput

Create an instance: `const api_create_agent_api_key_output = client.ApiCreateAgentApiKeyOutput()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `agent_uuid` | `string` | Agent id |
| `created_at` | `string` | Creation date |
| `created_by` | `string` | Created by |
| `deleted_at` | `string` | Deleted date |
| `name` | `string` | Name |
| `secret_key` | `string` |  |
| `uuid` | `string` | Uuid |

#### Example: Create

```ts
const api_create_agent_api_key_output = await client.ApiCreateAgentApiKeyOutput().create({
  agent_id: 'example_agent_id',
})
```


### ApiCreateDataSourceFileUploadPresignedUrlsOutput

Create an instance: `const api_create_data_source_file_upload_presigned_urls_output = client.ApiCreateDataSourceFileUploadPresignedUrlsOutput()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `files` | `any[]` | A list of files to generate presigned URLs for. |
| `request_id` | `string` | The ID generated for the request for Presigned URLs. |
| `uploads` | `any[]` | A list of generated presigned URLs and object keys, one per file. |

#### Example: Create

```ts
const api_create_data_source_file_upload_presigned_urls_output = await client.ApiCreateDataSourceFileUploadPresignedUrlsOutput().create({
})
```


### ApiCreateKnowledgeBaseDataSourceOutput

Create an instance: `const api_create_knowledge_base_data_source_output = client.ApiCreateKnowledgeBaseDataSourceOutput()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `aws_data_source` | `Record<string, any>` | AWS S3 Data Source for Display |
| `bucket_name` | `string` | Name of storage bucket - Deprecated, moved to data_source_details |
| `chunking_algorithm` | `string` |  |
| `chunking_options` | `Record<string, any>` |  |
| `created_at` | `string` | Creation date / time |
| `dropbox_data_source` | `Record<string, any>` | Dropbox Data Source for Display |
| `file_upload_data_source` | `Record<string, any>` | File to upload as data source for knowledge base. |
| `google_drive_data_source` | `Record<string, any>` | Google Drive Data Source for Display |
| `item_path` | `string` | Path of folder or object in bucket - Deprecated, moved to data_source_details |
| `knowledge_base_uuid` | `string` | Knowledge base id |
| `last_datasource_indexing_job` | `Record<string, any>` |  |
| `region` | `string` | Region code - Deprecated, moved to data_source_details |
| `spaces_data_source` | `Record<string, any>` | Spaces Bucket Data Source |
| `updated_at` | `string` | Last modified |
| `uuid` | `string` | Unique id of knowledge base |
| `web_crawler_data_source` | `Record<string, any>` | WebCrawlerDataSource |

#### Example: Create

```ts
const api_create_knowledge_base_data_source_output = await client.ApiCreateKnowledgeBaseDataSourceOutput().create({
  knowledge_base_id: 'example_knowledge_base_id',
})
```


### ApiCreateScenarioSetFromLibraryOutput

Create an instance: `const api_create_scenario_set_from_library_output = client.ApiCreateScenarioSetFromLibraryOutput()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `bucket_name` | `string` | Object storage bucket holding the scenario file. |
| `bucket_region` | `string` | Object storage bucket region. |
| `created_at` | `string` | Time created at. |
| `deleted_at` | `string` | Time deleted at. |
| `description` | `string` | Customer-supplied description. |
| `failure_reason` | `string` | Human-readable explanation of a terminal FAILED status. |
| `generator_model_uuid` | `string` | Model that produced the scenarios. |
| `library_scenario_uuid` | `string` | UUID of the source library entry. |
| `name` | `string` | Customer-supplied name. |
| `scenario_count` | `number` | Number of scenarios in the set. |
| `scenario_set_uuid` | `string` | UUID of the scenario set. |
| `source_export_id` | `string` | Signals export UUID that produced this set. |
| `source_goal_description` | `string` | The goal that drove generation. |
| `source_kind` | `string` | How a scenario set was created. |
| `spaces_key` | `string` | Object storage key for the scenario file. |
| `status` | `string` | Lifecycle status of a scenario set. |
| `updated_at` | `string` | Time last updated at. |
| `workflow_uuid` | `string` | Identifier of the generation workflow. |

#### Example: Create

```ts
const api_create_scenario_set_from_library_output = await client.ApiCreateScenarioSetFromLibraryOutput().create({
  scenario_library_id: 'example_scenario_library_id',
})
```


### ApiDeleteAgentApiKeyOutput

Create an instance: `const api_delete_agent_api_key_output = client.ApiDeleteAgentApiKeyOutput()`

#### Operations

| Method | Description |
| --- | --- |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |


### ApiDeleteAgentOutput

Create an instance: `const api_delete_agent_output = client.ApiDeleteAgentOutput()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `anthropic_api_key` | `Record<string, any>` | Anthropic API Key Info |
| `anthropic_key_uuid` | `string` | Optional Anthropic API key ID to use with Anthropic models |
| `api_key_infos` | `any[]` | Api key infos |
| `api_keys` | `any[]` | Api keys |
| `chatbot` | `Record<string, any>` | A Chatbot |
| `chatbot_identifiers` | `any[]` | Chatbot identifiers |
| `child_agents` | `any[]` | Child agents |
| `conversation_logs_enabled` | `boolean` | Whether conversation logs are enabled for the agent |
| `created_at` | `string` | Creation date / time |
| `deployment` | `Record<string, any>` | Description of deployment |
| `description` | `string` | Description of agent |
| `functions` | `any[]` |  |
| `guardrails` | `any[]` | The guardrails the agent is attached to |
| `if_case` | `string` | Instructions to the agent on how to use the route |
| `instruction` | `string` | Agent instruction. |
| `k` | `number` | How many results should be considered from an attached knowledge base |
| `knowledge_base_uuid` | `any[]` | Ids of the knowledge base(s) to attach to the agent |
| `knowledge_bases` | `any[]` | Knowledge bases |
| `logging_config` | `Record<string, any>` |  |
| `max_tokens` | `number` | Specifies the maximum number of tokens the model can process in a single input or output, set as a number between 1 and 512. |
| `mcp_servers` | `any[]` | MCP (Model Context Protocol) servers attached to this agent |
| `model` | `Record<string, any>` | Description of a Model |
| `model_provider_key` | `Record<string, any>` |  |
| `model_provider_key_uuid` | `string` |  |
| `model_router` | `Record<string, any>` | Model router |
| `model_router_uuid` | `string` |  |
| `model_uuid` | `string` | Identifier for the foundation model. |
| `name` | `string` | Agent name |
| `open_ai_key_uuid` | `string` | Optional OpenAI API key ID to use with OpenAI models |
| `openai_api_key` | `Record<string, any>` | OpenAI API Key Info |
| `parent_agents` | `any[]` | Parent agents |
| `project_id` | `string` | The id of the DigitalOcean project this agent will belong to |
| `provide_citations` | `boolean` | Whether the agent should provide in-response citations |
| `reasoning_effort` | `string` | The reasoning effort for the agent |
| `region` | `string` | Region code |
| `retrieval_method` | `string` | - RETRIEVAL_METHOD_UNKNOWN: The retrieval method is unknown - RETRIEVAL_METHOD_REWRITE: The retrieval method is rewrite - RETRIEVAL_METHOD_STEP_BACK: The retrieval method is step back - RETRIEVAL_METHOD_SUB_QUERIES: The retrieval method is… |
| `route_created_at` | `string` | Creation of route date / time |
| `route_created_by` | `string` | Id of user that created the route |
| `route_name` | `string` | Route name |
| `route_uuid` | `string` | Route uuid |
| `router_preset_slug` | `string` |  |
| `tags` | `any[]` | Agent tag to organize related resources |
| `temperature` | `number` | Controls the model’s creativity, specified as a number between 0 and 1. |
| `template` | `Record<string, any>` | Represents an AgentTemplate entity |
| `thinking_token_budget` | `number` | The thinking token budget for Anthropic extended thinking (0 = disabled) |
| `top_p` | `number` | Defines the cumulative probability threshold for word selection, specified as a number between 0 and 1. |
| `updated_at` | `string` | Last modified |
| `url` | `string` | Access your agent under this url |
| `user_id` | `string` | Id of user that created the agent |
| `uuid` | `string` | Unique agent id |
| `version_hash` | `string` | The latest version of the agent |
| `vpc_egress_ips` | `any[]` | VPC Egress IPs |
| `vpc_uuid` | `string` |  |
| `web_fetch_enabled` | `boolean` | Whether this agent can use the built-in web_fetch tool. |
| `web_search_enabled` | `boolean` | Whether this agent can use the built-in web_search tool. |
| `workspace` | `Record<string, any>` |  |
| `workspace_uuid` | `string` | Identifier for the workspace |

#### Example: List

```ts
const api_delete_agent_outputs = await client.ApiDeleteAgentOutput().list()
```

#### Example: Create

```ts
const api_delete_agent_output = await client.ApiDeleteAgentOutput().create({
})
```


### ApiDeleteAnthropicApiKeyOutput

Create an instance: `const api_delete_anthropic_api_key_output = client.ApiDeleteAnthropicApiKeyOutput()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `api_key` | `string` | Anthropic API key |
| `created_at` | `string` | Key creation date |
| `created_by` | `string` | Created by user id from DO |
| `deleted_at` | `string` | Key deleted date |
| `name` | `string` | Name |
| `updated_at` | `string` | Key last updated date |
| `uuid` | `string` | Uuid |

#### Example: List

```ts
const api_delete_anthropic_api_key_outputs = await client.ApiDeleteAnthropicApiKeyOutput().list()
```

#### Example: Create

```ts
const api_delete_anthropic_api_key_output = await client.ApiDeleteAnthropicApiKeyOutput().create({
})
```


### ApiDeleteCustomEvaluationMetricOutput

Create an instance: `const api_delete_custom_evaluation_metric_output = client.ApiDeleteCustomEvaluationMetricOutput()`

#### Operations

| Method | Description |
| --- | --- |
| `remove(match)` | Remove the matching entity. |


### ApiDeleteCustomModelOutputPublic

Create an instance: `const api_delete_custom_model_output_public = client.ApiDeleteCustomModelOutputPublic()`

#### Operations

| Method | Description |
| --- | --- |
| `remove(match)` | Remove the matching entity. |


### ApiDeleteEvaluationDatasetOutput

Create an instance: `const api_delete_evaluation_dataset_output = client.ApiDeleteEvaluationDatasetOutput()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `created_at` | `string` | Time created at. |
| `dataset_name` | `string` | Name of the dataset. |
| `dataset_paradigm` | `string` | EvaluationDatasetParadigm is the row/content shape of a dataset, orthogonal to the surface in EvaluationDatasetType (e.g. |
| `dataset_type` | `string` |  |
| `dataset_uuid` | `string` | UUID of the dataset. |
| `evaluation_dataset_uuid` | `string` | Evaluation dataset uuid. |
| `file_size` | `string` | The size of the dataset uploaded file in bytes. |
| `file_upload_dataset` | `Record<string, any>` | File to upload as data source for knowledge base. |
| `has_ground_truth` | `boolean` | Does the dataset have a ground truth column? |
| `name` | `string` | The name of the agent evaluation dataset. |
| `row_count` | `number` | Number of rows in the dataset. |

#### Example: List

```ts
const api_delete_evaluation_dataset_outputs = await client.ApiDeleteEvaluationDatasetOutput().list()
```

#### Example: Create

```ts
const api_delete_evaluation_dataset_output = await client.ApiDeleteEvaluationDatasetOutput().create({
})
```


### ApiDeleteKnowledgeBaseDataSourceOutput

Create an instance: `const api_delete_knowledge_base_data_source_output = client.ApiDeleteKnowledgeBaseDataSourceOutput()`

#### Operations

| Method | Description |
| --- | --- |
| `remove(match)` | Remove the matching entity. |


### ApiDeleteKnowledgeBaseOutput

Create an instance: `const api_delete_knowledge_base_output = client.ApiDeleteKnowledgeBaseOutput()`

#### Operations

| Method | Description |
| --- | --- |
| `remove(match)` | Remove the matching entity. |


### ApiDeleteModelApiKeyOutput

Create an instance: `const api_delete_model_api_key_output = client.ApiDeleteModelApiKeyOutput()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `created_at` | `string` | Creation date |
| `created_by` | `string` | Created by |
| `deleted_at` | `string` | Deleted date |
| `name` | `string` | A human friendly name to identify the key |
| `secret_key` | `string` |  |
| `uuid` | `string` | Uuid |

#### Example: List

```ts
const api_delete_model_api_key_outputs = await client.ApiDeleteModelApiKeyOutput().list()
```

#### Example: Create

```ts
const api_delete_model_api_key_output = await client.ApiDeleteModelApiKeyOutput().create({
})
```


### ApiDeleteModelEvaluationPresetOutput

Create an instance: `const api_delete_model_evaluation_preset_output = client.ApiDeleteModelEvaluationPresetOutput()`

#### Operations

| Method | Description |
| --- | --- |
| `remove(match)` | Remove the matching entity. |


### ApiDeleteModelEvaluationRunOutputPublic

Create an instance: `const api_delete_model_evaluation_run_output_public = client.ApiDeleteModelEvaluationRunOutputPublic()`

#### Operations

| Method | Description |
| --- | --- |
| `remove(match)` | Remove the matching entity. |


### ApiDeleteModelRouterOutput

Create an instance: `const api_delete_model_router_output = client.ApiDeleteModelRouterOutput()`

#### Operations

| Method | Description |
| --- | --- |
| `remove(match)` | Remove the matching entity. |


### ApiDeleteOpenAiapiKeyOutput

Create an instance: `const api_delete_open_aiapi_key_output = client.ApiDeleteOpenAiapiKeyOutput()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `api_key` | `string` | OpenAI API key |
| `created_at` | `string` | Key creation date |
| `created_by` | `string` | Created by user id from DO |
| `deleted_at` | `string` | Key deleted date |
| `models` | `any[]` | Models supported by the openAI api key |
| `name` | `string` | Name |
| `updated_at` | `string` | Key last updated date |
| `uuid` | `string` | Uuid |

#### Example: List

```ts
const api_delete_open_aiapi_key_outputs = await client.ApiDeleteOpenAiapiKeyOutput().list()
```

#### Example: Create

```ts
const api_delete_open_aiapi_key_output = await client.ApiDeleteOpenAiapiKeyOutput().create({
})
```


### ApiDeleteScenarioSetOutput

Create an instance: `const api_delete_scenario_set_output = client.ApiDeleteScenarioSetOutput()`

#### Operations

| Method | Description |
| --- | --- |
| `remove(match)` | Remove the matching entity. |


### ApiDeleteScheduledIndexingOutput

Create an instance: `const api_delete_scheduled_indexing_output = client.ApiDeleteScheduledIndexingOutput()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `created_at` | `string` | Created at timestamp |
| `days` | `any[]` | Days for execution (day is represented same as in a cron expression, e.g. |
| `deleted_at` | `string` | Deleted at timestamp (if soft deleted) |
| `is_active` | `boolean` | Whether the schedule is currently active |
| `knowledge_base_uuid` | `string` | Knowledge base uuid associated with this schedule |
| `last_ran_at` | `string` | Last time the schedule was executed |
| `next_run_at` | `string` | Next scheduled run |
| `time` | `string` | Scheduled time of execution (HH:MM:SS format) |
| `updated_at` | `string` | Updated at timestamp |
| `uuid` | `string` | Unique identifier for the scheduled indexing entry |

#### Example: Create

```ts
const api_delete_scheduled_indexing_output = await client.ApiDeleteScheduledIndexingOutput().create({
})
```


### ApiDeleteSimulationRunOutput

Create an instance: `const api_delete_simulation_run_output = client.ApiDeleteSimulationRunOutput()`

#### Operations

| Method | Description |
| --- | --- |
| `remove(match)` | Remove the matching entity. |


### ApiDeleteWorkspaceOutput

Create an instance: `const api_delete_workspace_output = client.ApiDeleteWorkspaceOutput()`

#### Operations

| Method | Description |
| --- | --- |
| `remove(match)` | Remove the matching entity. |


### ApiDropboxOauth2GetTokensOutput

Create an instance: `const api_dropbox_oauth2_get_tokens_output = client.ApiDropboxOauth2GetTokensOutput()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `code` | `string` | The oauth2 code from google |
| `redirect_url` | `string` | Redirect url |
| `refresh_token` | `string` | The refresh token |
| `token` | `string` | The access token |

#### Example: Create

```ts
const api_dropbox_oauth2_get_tokens_output = await client.ApiDropboxOauth2GetTokensOutput().create({
})
```


### ApiGenerateOauth2UrlOutput

Create an instance: `const api_generate_oauth2_url_output = client.ApiGenerateOauth2UrlOutput()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `url` | `string` | The oauth2 url |

#### Example: Load

```ts
const api_generate_oauth2_url_output = await client.ApiGenerateOauth2UrlOutput().load()
```


### ApiGenerateScenarioSetOutput

Create an instance: `const api_generate_scenario_set_output = client.ApiGenerateScenarioSetOutput()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `bucket_name` | `string` | Object storage bucket holding the scenario file. |
| `bucket_region` | `string` | Object storage bucket region. |
| `created_at` | `string` | Time created at. |
| `deleted_at` | `string` | Time deleted at. |
| `description` | `string` | Customer-supplied description. |
| `failure_reason` | `string` | Human-readable explanation of a terminal FAILED status. |
| `generator_model_uuid` | `string` | Model that produced the scenarios. |
| `goal_description` | `string` | The goal that drives scenario generation. |
| `library_scenario_uuid` | `string` | UUID of the source library entry. |
| `name` | `string` | Customer-supplied name. |
| `num_scenarios` | `number` | Number of scenarios to generate. |
| `scenario_count` | `number` | Number of scenarios in the set. |
| `scenario_set_uuid` | `string` | UUID of the scenario set. |
| `source_export_id` | `string` | Signals export UUID that produced this set. |
| `source_goal_description` | `string` | The goal that drove generation. |
| `source_kind` | `string` | How a scenario set was created. |
| `spaces_key` | `string` | Object storage key for the scenario file. |
| `status` | `string` | Lifecycle status of a scenario set. |
| `updated_at` | `string` | Time last updated at. |
| `workflow_uuid` | `string` | Identifier of the generation workflow. |

#### Example: Create

```ts
const api_generate_scenario_set_output = await client.ApiGenerateScenarioSetOutput().create({
})
```


### ApiGetAgentOutput

Create an instance: `const api_get_agent_output = client.ApiGetAgentOutput()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `anthropic_api_key` | `Record<string, any>` | Anthropic API Key Info |
| `api_key_infos` | `any[]` | Api key infos |
| `api_keys` | `any[]` | Api keys |
| `chatbot` | `Record<string, any>` | A Chatbot |
| `chatbot_identifiers` | `any[]` | Chatbot identifiers |
| `child_agents` | `any[]` | Child agents |
| `conversation_logs_enabled` | `boolean` | Whether conversation logs are enabled for the agent |
| `created_at` | `string` | Creation date / time |
| `deployment` | `Record<string, any>` | Description of deployment |
| `description` | `string` | Description of agent |
| `functions` | `any[]` |  |
| `guardrails` | `any[]` | The guardrails the agent is attached to |
| `if_case` | `string` |  |
| `instruction` | `string` | Agent instruction. |
| `k` | `number` |  |
| `knowledge_bases` | `any[]` | Knowledge bases |
| `logging_config` | `Record<string, any>` |  |
| `max_tokens` | `number` |  |
| `mcp_servers` | `any[]` | MCP (Model Context Protocol) servers attached to this agent |
| `model` | `Record<string, any>` | Description of a Model |
| `model_provider_key` | `Record<string, any>` |  |
| `model_router` | `Record<string, any>` | Model router |
| `name` | `string` | Agent name |
| `openai_api_key` | `Record<string, any>` | OpenAI API Key Info |
| `parent_agents` | `any[]` | Parent agents |
| `project_id` | `string` |  |
| `provide_citations` | `boolean` | Whether the agent should provide in-response citations |
| `reasoning_effort` | `string` | The reasoning effort for the agent |
| `region` | `string` | Region code |
| `retrieval_method` | `string` | - RETRIEVAL_METHOD_UNKNOWN: The retrieval method is unknown - RETRIEVAL_METHOD_REWRITE: The retrieval method is rewrite - RETRIEVAL_METHOD_STEP_BACK: The retrieval method is step back - RETRIEVAL_METHOD_SUB_QUERIES: The retrieval method is… |
| `route_created_at` | `string` | Creation of route date / time |
| `route_created_by` | `string` |  |
| `route_name` | `string` | Route name |
| `route_uuid` | `string` |  |
| `tags` | `any[]` | Agent tag to organize related resources |
| `temperature` | `number` |  |
| `template` | `Record<string, any>` | Represents an AgentTemplate entity |
| `thinking_token_budget` | `number` | The thinking token budget for Anthropic extended thinking (0 = disabled) |
| `top_p` | `number` |  |
| `updated_at` | `string` | Last modified |
| `url` | `string` | Access your agent under this url |
| `user_id` | `string` | Id of user that created the agent |
| `uuid` | `string` | Unique agent id |
| `version_hash` | `string` | The latest version of the agent |
| `vpc_egress_ips` | `any[]` | VPC Egress IPs |
| `vpc_uuid` | `string` |  |
| `web_fetch_enabled` | `boolean` | Whether this agent can use the built-in web_fetch tool. |
| `web_search_enabled` | `boolean` | Whether this agent can use the built-in web_search tool. |
| `workspace` | `Record<string, any>` |  |

#### Example: Load

```ts
const api_get_agent_output = await client.ApiGetAgentOutput().load({ uuid: 'uuid' })
```


### ApiGetAgentUsageOutput

Create an instance: `const api_get_agent_usage_output = client.ApiGetAgentUsageOutput()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `log_insights_usage` | `Record<string, any>` | Resource Usage Description |
| `usage` | `Record<string, any>` | Resource Usage Description |

#### Example: Load

```ts
const api_get_agent_usage_output = await client.ApiGetAgentUsageOutput().load({ agent_id: 'agent_id' })
```


### ApiGetAnthropicApiKeyOutput

Create an instance: `const api_get_anthropic_api_key_output = client.ApiGetAnthropicApiKeyOutput()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `created_at` | `string` | Key creation date |
| `created_by` | `string` | Created by user id from DO |
| `deleted_at` | `string` | Key deleted date |
| `name` | `string` | Name |
| `updated_at` | `string` | Key last updated date |
| `uuid` | `string` | Uuid |

#### Example: Load

```ts
const api_get_anthropic_api_key_output = await client.ApiGetAnthropicApiKeyOutput().load({ api_key_uuid: 'api_key_uuid' })
```


### ApiGetChildrenOutput

Create an instance: `const api_get_children_output = client.ApiGetChildrenOutput()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `anthropic_api_key` | `Record<string, any>` | Anthropic API Key Info |
| `api_key_infos` | `any[]` | Api key infos |
| `api_keys` | `any[]` | Api keys |
| `chatbot` | `Record<string, any>` | A Chatbot |
| `chatbot_identifiers` | `any[]` | Chatbot identifiers |
| `child_agents` | `any[]` | Child agents |
| `conversation_logs_enabled` | `boolean` | Whether conversation logs are enabled for the agent |
| `created_at` | `string` | Creation date / time |
| `deployment` | `Record<string, any>` | Description of deployment |
| `description` | `string` | Description of agent |
| `functions` | `any[]` |  |
| `guardrails` | `any[]` | The guardrails the agent is attached to |
| `if_case` | `string` |  |
| `instruction` | `string` | Agent instruction. |
| `k` | `number` |  |
| `knowledge_bases` | `any[]` | Knowledge bases |
| `logging_config` | `Record<string, any>` |  |
| `max_tokens` | `number` |  |
| `mcp_servers` | `any[]` | MCP (Model Context Protocol) servers attached to this agent |
| `model` | `Record<string, any>` | Description of a Model |
| `model_provider_key` | `Record<string, any>` |  |
| `model_router` | `Record<string, any>` | Model router |
| `name` | `string` | Agent name |
| `openai_api_key` | `Record<string, any>` | OpenAI API Key Info |
| `parent_agents` | `any[]` | Parent agents |
| `project_id` | `string` |  |
| `provide_citations` | `boolean` | Whether the agent should provide in-response citations |
| `reasoning_effort` | `string` | The reasoning effort for the agent |
| `region` | `string` | Region code |
| `retrieval_method` | `string` | - RETRIEVAL_METHOD_UNKNOWN: The retrieval method is unknown - RETRIEVAL_METHOD_REWRITE: The retrieval method is rewrite - RETRIEVAL_METHOD_STEP_BACK: The retrieval method is step back - RETRIEVAL_METHOD_SUB_QUERIES: The retrieval method is… |
| `route_created_at` | `string` | Creation of route date / time |
| `route_created_by` | `string` |  |
| `route_name` | `string` | Route name |
| `route_uuid` | `string` |  |
| `tags` | `any[]` | Agent tag to organize related resources |
| `temperature` | `number` |  |
| `template` | `Record<string, any>` | Represents an AgentTemplate entity |
| `thinking_token_budget` | `number` | The thinking token budget for Anthropic extended thinking (0 = disabled) |
| `top_p` | `number` |  |
| `updated_at` | `string` | Last modified |
| `url` | `string` | Access your agent under this url |
| `user_id` | `string` | Id of user that created the agent |
| `uuid` | `string` | Unique agent id |
| `version_hash` | `string` | The latest version of the agent |
| `vpc_egress_ips` | `any[]` | VPC Egress IPs |
| `vpc_uuid` | `string` |  |
| `web_fetch_enabled` | `boolean` | Whether this agent can use the built-in web_fetch tool. |
| `web_search_enabled` | `boolean` | Whether this agent can use the built-in web_search tool. |
| `workspace` | `Record<string, any>` |  |

#### Example: List

```ts
const api_get_children_outputs = await client.ApiGetChildrenOutput().list({ agent_id: "example" })
```


### ApiGetCustomModelOutputPublic

Create an instance: `const api_get_custom_model_output_public = client.ApiGetCustomModelOutputPublic()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `active_deployments` | `any[]` | List of active deployments using this model |
| `architecture` | `string` | Model architecture type (free-form string from config.json) |
| `config_json` | `Record<string, any>` | Raw config.json contents from the model repository |
| `context_length` | `number` | Maximum context length supported by the model |
| `cost_estimate_per_month` | `number` | Estimated monthly cost in dollars for hosting |
| `created_at` | `string` | Timestamp when the model was created |
| `description` | `string` | Description of the custom model |
| `error_message` | `string` | User-facing reason the most recent import failed; empty otherwise. |
| `file_count` | `number` | Number of files in the model |
| `input_modalities` | `any[]` | Input modalities supported (e.g., text, image) |
| `license` | `string` | License under which the model is distributed |
| `name` | `string` | Name of the custom model |
| `output_modalities` | `any[]` | Output modalities supported (e.g., text, image) |
| `parameters` | `string` | Number of parameters in the model |
| `source_ref` | `Record<string, any>` | Reference to the original source of the model |
| `source_type` | `string` | Source from which the model was imported |
| `status` | `string` | Import and deployment status of the custom model |
| `storage_region` | `string` | Region of the Spaces bucket where model files are stored |
| `tags` | `Record<string, any>` | User-defined tags for organizing models |
| `team_id` | `string` | Team that owns the model |
| `total_size_bytes` | `string` | Total size of model files in bytes |
| `updated_at` | `string` | Timestamp when the model was last updated |
| `uuid` | `string` | Unique identifier for the custom model |

#### Example: Load

```ts
const api_get_custom_model_output_public = await client.ApiGetCustomModelOutputPublic().load({ uuid: 'uuid' })
```

#### Example: List

```ts
const api_get_custom_model_output_publics = await client.ApiGetCustomModelOutputPublic().list()
```


### ApiGetEvaluationDatasetDownloadUrlOutput

Create an instance: `const api_get_evaluation_dataset_download_url_output = client.ApiGetEvaluationDatasetDownloadUrlOutput()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `download_url` | `string` | The presigned URL to download the dataset file. |
| `expires_at` | `string` | The time the URL expires at. |

#### Example: Load

```ts
const api_get_evaluation_dataset_download_url_output = await client.ApiGetEvaluationDatasetDownloadUrlOutput().load({ evaluation_dataset_id: 'evaluation_dataset_id' })
```


### ApiGetEvaluationRunOutput

Create an instance: `const api_get_evaluation_run_output = client.ApiGetEvaluationRunOutput()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `agent_deleted` | `boolean` | Whether agent is deleted |
| `agent_deployment_name` | `string` | The agent deployment name |
| `agent_deployment_names` | `any[]` | Agent deployment names to run the test case against. |
| `agent_name` | `string` | Agent name |
| `agent_uuid` | `string` | Agent UUID. |
| `agent_uuids` | `any[]` | Agent UUIDs to run the test case against (legacy agents). |
| `agent_version_hash` | `string` | Version hash |
| `agent_workspace_uuid` | `string` | Agent workspace uuid |
| `created_by_user_email` | `string` |  |
| `created_by_user_id` | `string` |  |
| `error_description` | `string` | The error description |
| `evaluation_run_uuid` | `string` | Evaluation run UUID. |
| `evaluation_run_uuids` | `any[]` |  |
| `evaluation_test_case_workspace_uuid` | `string` | Evaluation test case workspace uuid |
| `finished_at` | `string` | Run end time. |
| `pass_status` | `boolean` | The pass status of the evaluation run based on the star metric. |
| `queued_at` | `string` | Run queued time. |
| `run_level_metric_results` | `any[]` |  |
| `run_name` | `string` | Run name. |
| `star_metric_result` | `Record<string, any>` |  |
| `started_at` | `string` | Run start time. |
| `status` | `string` | Evaluation Run Statuses |
| `test_case_description` | `string` | Test case description. |
| `test_case_name` | `string` | Test case name. |
| `test_case_uuid` | `string` | Test-case UUID. |
| `test_case_version` | `number` | Test-case-version. |

#### Example: Load

```ts
const api_get_evaluation_run_output = await client.ApiGetEvaluationRunOutput().load({ evaluation_run_uuid: 'evaluation_run_uuid' })
```

#### Example: Create

```ts
const api_get_evaluation_run_output = await client.ApiGetEvaluationRunOutput().create({
})
```


### ApiGetEvaluationRunResultsOutput

Create an instance: `const api_get_evaluation_run_results_output = client.ApiGetEvaluationRunResultsOutput()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `evaluation_trace_spans` | `any[]` | The evaluated trace spans. |
| `ground_truth` | `string` | The ground truth for the prompt. |
| `input` | `string` |  |
| `input_tokens` | `string` | The number of input tokens used in the prompt. |
| `output` | `string` |  |
| `output_tokens` | `string` | The number of output tokens used in the prompt. |
| `prompt_chunks` | `any[]` | The list of prompt chunks. |
| `prompt_id` | `number` | Prompt ID |
| `prompt_level_metric_results` | `any[]` | The metric results for the prompt. |
| `trace_id` | `string` | The trace id for the prompt. |

#### Example: List

```ts
const api_get_evaluation_run_results_outputs = await client.ApiGetEvaluationRunResultsOutput().list({ evaluation_run_id: "example" })
```


### ApiGetEvaluationTestCaseOutput

Create an instance: `const api_get_evaluation_test_case_output = client.ApiGetEvaluationTestCaseOutput()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `agent_workspace_name` | `string` |  |
| `archived_at` | `string` |  |
| `created_at` | `string` |  |
| `created_by_user_email` | `string` |  |
| `created_by_user_id` | `string` |  |
| `dataset` | `Record<string, any>` |  |
| `dataset_name` | `string` |  |
| `dataset_uuid` | `string` | Dataset against which the test‑case is executed. |
| `description` | `string` | Description of the test case. |
| `latest_version_number_of_runs` | `number` |  |
| `metrics` | `any[]` | Full metric list to use for evaluation test case. |
| `name` | `string` | Name of the test case. |
| `star_metric` | `Record<string, any>` |  |
| `test_case_uuid` | `string` | Test‑case UUID. |
| `total_runs` | `number` |  |
| `updated_at` | `string` |  |
| `updated_by_user_email` | `string` |  |
| `updated_by_user_id` | `string` |  |
| `version` | `number` |  |
| `workspace_uuid` | `string` | The workspace uuid. |

#### Example: Load

```ts
const api_get_evaluation_test_case_output = await client.ApiGetEvaluationTestCaseOutput().load({ test_case_uuid: 'test_case_uuid' })
```

#### Example: List

```ts
const api_get_evaluation_test_case_outputs = await client.ApiGetEvaluationTestCaseOutput().list()
```

#### Example: Create

```ts
const api_get_evaluation_test_case_output = await client.ApiGetEvaluationTestCaseOutput().create({
})
```


### ApiGetIndexingJobDetailsSignedUrlOutput

Create an instance: `const api_get_indexing_job_details_signed_url_output = client.ApiGetIndexingJobDetailsSignedUrlOutput()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `signed_url` | `string` | The signed url for downloading the indexing job details |

#### Example: Load

```ts
const api_get_indexing_job_details_signed_url_output = await client.ApiGetIndexingJobDetailsSignedUrlOutput().load({ indexing_job_id: 'indexing_job_id' })
```


### ApiGetKnowledgeBaseIndexingJobOutput

Create an instance: `const api_get_knowledge_base_indexing_job_output = client.ApiGetKnowledgeBaseIndexingJobOutput()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `completed_datasources` | `number` | Number of datasources indexed completed |
| `created_at` | `string` | Creation date / time |
| `data_source_jobs` | `any[]` | Details on Data Sources included in the Indexing Job |
| `data_source_uuids` | `any[]` | List of data source ids to index, if none are provided, all data sources will be indexed |
| `finished_at` | `string` |  |
| `is_report_available` | `boolean` | Boolean value to determine if the indexing job details are available |
| `knowledge_base_uuid` | `string` | Knowledge base id |
| `phase` | `string` |  |
| `started_at` | `string` |  |
| `status` | `string` |  |
| `tokens` | `number` | Number of tokens [This field is deprecated] |
| `total_datasources` | `number` | Number of datasources being indexed |
| `total_tokens` | `string` | Total Tokens Consumed By the Indexing Job |
| `updated_at` | `string` | Last modified |
| `uuid` | `string` | Unique id |

#### Example: Load

```ts
const api_get_knowledge_base_indexing_job_output = await client.ApiGetKnowledgeBaseIndexingJobOutput().load({ uuid: 'uuid' })
```

#### Example: List

```ts
const api_get_knowledge_base_indexing_job_outputs = await client.ApiGetKnowledgeBaseIndexingJobOutput().list()
```

#### Example: Create

```ts
const api_get_knowledge_base_indexing_job_output = await client.ApiGetKnowledgeBaseIndexingJobOutput().create({
})
```


### ApiGetKnowledgeBaseOutput

Create an instance: `const api_get_knowledge_base_output = client.ApiGetKnowledgeBaseOutput()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `database_status` | `string` |  |
| `knowledge_base` | `Record<string, any>` | Knowledgebase Description |

#### Example: Load

```ts
const api_get_knowledge_base_output = await client.ApiGetKnowledgeBaseOutput().load({ uuid: 'uuid' })
```


### ApiGetModelEvaluationRunOutput

Create an instance: `const api_get_model_evaluation_run_output = client.ApiGetModelEvaluationRunOutput()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `links` | `Record<string, any>` | Links to other pages |
| `meta` | `Record<string, any>` | Meta information about the data set |
| `results` | `any[]` | Paginated per-prompt evaluation results. |
| `run` | `Record<string, any>` | Model Evaluation Run Detail - full view returned when fetching a specific run. |

#### Example: Load

```ts
const api_get_model_evaluation_run_output = await client.ApiGetModelEvaluationRunOutput().load({ eval_run_uuid: 'eval_run_uuid' })
```


### ApiGetModelEvaluationRunResultsDownloadUrlOutput

Create an instance: `const api_get_model_evaluation_run_results_download_url_output = client.ApiGetModelEvaluationRunResultsDownloadUrlOutput()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `download_url` | `string` | The presigned URL to download the gzip-compressed JSON results file (.json.gz). |
| `expires_at` | `string` | The time the URL expires at. |

#### Example: Load

```ts
const api_get_model_evaluation_run_results_download_url_output = await client.ApiGetModelEvaluationRunResultsDownloadUrlOutput().load({ model_evaluation_run_id: 'model_evaluation_run_id' })
```


### ApiGetModelRouterOutput

Create an instance: `const api_get_model_router_output = client.ApiGetModelRouterOutput()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `config` | `Record<string, any>` |  |
| `created_at` | `string` | Creation date / time |
| `description` | `string` | Description |
| `fallback_models` | `any[]` | At least one fallback model is required; order defines failover priority |
| `name` | `string` | Name of the model router |
| `policies` | `any[]` | Router policies |
| `regions` | `any[]` | Target regions for the router |
| `updated_at` | `string` | Last modified |
| `uuid` | `string` | Unique id |

#### Example: Load

```ts
const api_get_model_router_output = await client.ApiGetModelRouterOutput().load({ uuid: 'uuid' })
```

#### Example: List

```ts
const api_get_model_router_outputs = await client.ApiGetModelRouterOutput().list()
```

#### Example: Create

```ts
const api_get_model_router_output = await client.ApiGetModelRouterOutput().create({
})
```


### ApiGetOpenAiapiKeyOutput

Create an instance: `const api_get_open_aiapi_key_output = client.ApiGetOpenAiapiKeyOutput()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `created_at` | `string` | Key creation date |
| `created_by` | `string` | Created by user id from DO |
| `deleted_at` | `string` | Key deleted date |
| `models` | `any[]` | Models supported by the openAI api key |
| `name` | `string` | Name |
| `updated_at` | `string` | Key last updated date |
| `uuid` | `string` | Uuid |

#### Example: Load

```ts
const api_get_open_aiapi_key_output = await client.ApiGetOpenAiapiKeyOutput().load({ api_key_uuid: 'api_key_uuid' })
```


### ApiGetScenarioSetDownloadUrlOutput

Create an instance: `const api_get_scenario_set_download_url_output = client.ApiGetScenarioSetDownloadUrlOutput()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `download_url` | `string` | The presigned URL to download the scenario set file. |
| `expires_at` | `string` | The time the URL expires at. |

#### Example: Load

```ts
const api_get_scenario_set_download_url_output = await client.ApiGetScenarioSetDownloadUrlOutput().load({ scenario_set_id: 'scenario_set_id' })
```


### ApiGetScenarioSetOutput

Create an instance: `const api_get_scenario_set_output = client.ApiGetScenarioSetOutput()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `bucket_name` | `string` | Object storage bucket holding the scenario file. |
| `bucket_region` | `string` | Object storage bucket region. |
| `created_at` | `string` | Time created at. |
| `deleted_at` | `string` | Time deleted at. |
| `description` | `string` | Customer-supplied description. |
| `failure_reason` | `string` | Human-readable explanation of a terminal FAILED status. |
| `file_upload_scenario_set` | `any` | Uploaded scenario file to ingest. |
| `generator_model_uuid` | `string` | Model that produced the scenarios. |
| `library_scenario_uuid` | `string` | UUID of the source library entry. |
| `name` | `string` | Customer-supplied name. |
| `scenario_count` | `number` | Number of scenarios in the set. |
| `scenario_set_uuid` | `string` | UUID of the scenario set. |
| `scenarios` | `any[]` | Inline scenarios. |
| `source_export_id` | `string` | Signals export UUID that produced this set. |
| `source_goal_description` | `string` | The goal that drove generation. |
| `source_kind` | `string` | How a scenario set was created. |
| `spaces_key` | `string` | Object storage key for the scenario file. |
| `status` | `string` | Lifecycle status of a scenario set. |
| `updated_at` | `string` | Time last updated at. |
| `workflow_uuid` | `string` | Identifier of the generation workflow. |

#### Example: Load

```ts
const api_get_scenario_set_output = await client.ApiGetScenarioSetOutput().load({ scenario_set_uuid: 'scenario_set_uuid' })
```

#### Example: List

```ts
const api_get_scenario_set_outputs = await client.ApiGetScenarioSetOutput().list()
```

#### Example: Create

```ts
const api_get_scenario_set_output = await client.ApiGetScenarioSetOutput().create({
})
```


### ApiGetScheduledIndexingOutput

Create an instance: `const api_get_scheduled_indexing_output = client.ApiGetScheduledIndexingOutput()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `created_at` | `string` | Created at timestamp |
| `days` | `any[]` | Days for execution (day is represented same as in a cron expression, e.g. |
| `deleted_at` | `string` | Deleted at timestamp (if soft deleted) |
| `is_active` | `boolean` | Whether the schedule is currently active |
| `knowledge_base_uuid` | `string` | Knowledge base uuid associated with this schedule |
| `last_ran_at` | `string` | Last time the schedule was executed |
| `next_run_at` | `string` | Next scheduled run |
| `time` | `string` | Scheduled time of execution (HH:MM:SS format) |
| `updated_at` | `string` | Updated at timestamp |
| `uuid` | `string` | Unique identifier for the scheduled indexing entry |

#### Example: Load

```ts
const api_get_scheduled_indexing_output = await client.ApiGetScheduledIndexingOutput().load({ knowledge_base_uuid: 'knowledge_base_uuid' })
```


### ApiGetSimulationJourneyTrajectoryUrlOutput

Create an instance: `const api_get_simulation_journey_trajectory_url_output = client.ApiGetSimulationJourneyTrajectoryUrlOutput()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `download_url` | `string` | The presigned URL to download the trajectory JSON file. |
| `expires_at` | `string` | The time the URL expires at. |

#### Example: Load

```ts
const api_get_simulation_journey_trajectory_url_output = await client.ApiGetSimulationJourneyTrajectoryUrlOutput().load({ journey_id: 'journey_id', simulation_run_id: 'simulation_run_id' })
```


### ApiGetSimulationRunOutput

Create an instance: `const api_get_simulation_run_output = client.ApiGetSimulationRunOutput()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `scenario_results` | `any[]` | Per-scenario breakdown of journey outcomes, aggregated from journey rows. |
| `simulation_run` | `Record<string, any>` | One execution of a scenario set against a candidate agent. |

#### Example: Load

```ts
const api_get_simulation_run_output = await client.ApiGetSimulationRunOutput().load({ run_uuid: 'run_uuid' })
```


### ApiGetWorkspaceOutput

Create an instance: `const api_get_workspace_output = client.ApiGetWorkspaceOutput()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `agent_uuids` | `any[]` | Ids of the agents(s) to attach to the workspace |
| `agents` | `any[]` | Agents |
| `created_at` | `string` | Creation date |
| `created_by` | `string` | The id of user who created this workspace |
| `created_by_email` | `string` | The email of the user who created this workspace |
| `deleted_at` | `string` | Deleted date |
| `description` | `string` | Description of the workspace |
| `evaluation_test_cases` | `any[]` | Evaluations |
| `name` | `string` | Name of the workspace |
| `updated_at` | `string` | Update date |
| `uuid` | `string` | Unique id |

#### Example: Load

```ts
const api_get_workspace_output = await client.ApiGetWorkspaceOutput().load({ workspace_uuid: 'workspace_uuid' })
```

#### Example: List

```ts
const api_get_workspace_outputs = await client.ApiGetWorkspaceOutput().list()
```

#### Example: Create

```ts
const api_get_workspace_output = await client.ApiGetWorkspaceOutput().create({
})
```


### ApiImportCustomModelOutputPublic

Create an instance: `const api_import_custom_model_output_public = client.ApiImportCustomModelOutputPublic()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `accept_hf_token_storage` | `boolean` | Whether the caller accepts storage of their HuggingFace token for gated model access |
| `accept_terms_and_conditions` | `boolean` | Whether the caller accepts the terms and conditions for importing this model |
| `description` | `string` | Description of the model |
| `error` | `string` |  |
| `import_job` | `Record<string, any>` | Import job tracking for a custom model |
| `model` | `Record<string, any>` | Custom model - user-imported model from HuggingFace, Spaces, etc. |
| `name` | `string` | Name for the imported model |
| `preferred_gpu_region` | `string` | Preferred GPU region for deployment |
| `source_ref` | `Record<string, any>` | Reference to the original source of the model |
| `source_type` | `string` | Source from which the model was imported |
| `tags` | `Record<string, any>` | User-defined tags for organizing models |
| `validation_steps` | `any[]` | Validation steps performed during import |

#### Example: Create

```ts
const api_import_custom_model_output_public = await client.ApiImportCustomModelOutputPublic().create({
})
```


### ApiIndexedDataSource

Create an instance: `const api_indexed_data_source = client.ApiIndexedDataSource()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `completed_at` | `string` | Timestamp when data source completed indexing |
| `data_source_uuid` | `string` | Uuid of the indexed data source |
| `error_details` | `string` | A detailed error description |
| `error_msg` | `string` | A string code provinding a hint which part of the system experienced an error |
| `failed_item_count` | `string` | Total count of files that have failed |
| `indexed_file_count` | `string` | Total count of files that have been indexed |
| `indexed_item_count` | `string` | Total count of files that have been indexed |
| `removed_item_count` | `string` | Total count of files that have been removed |
| `skipped_item_count` | `string` | Total count of files that have been skipped |
| `started_at` | `string` | Timestamp when data source started indexing |
| `status` | `string` |  |
| `total_bytes` | `string` | Total size of files in data source in bytes |
| `total_bytes_indexed` | `string` | Total size of files in data source in bytes that have been indexed |
| `total_file_count` | `string` | Total file count in the data source |

#### Example: List

```ts
const api_indexed_data_sources = await client.ApiIndexedDataSource().list({ indexing_job_id: "example" })
```


### ApiLinkAgentFunctionOutput

Create an instance: `const api_link_agent_function_output = client.ApiLinkAgentFunctionOutput()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `agent_uuid` | `string` | Agent id |
| `anthropic_api_key` | `Record<string, any>` | Anthropic API Key Info |
| `api_key_infos` | `any[]` | Api key infos |
| `api_keys` | `any[]` | Api keys |
| `chatbot` | `Record<string, any>` | A Chatbot |
| `chatbot_identifiers` | `any[]` | Chatbot identifiers |
| `child_agents` | `any[]` | Child agents |
| `conversation_logs_enabled` | `boolean` | Whether conversation logs are enabled for the agent |
| `created_at` | `string` | Creation date / time |
| `deployment` | `Record<string, any>` | Description of deployment |
| `description` | `string` | Description of agent |
| `faas_name` | `string` | The name of the function in the DigitalOcean functions platform |
| `faas_namespace` | `string` | The namespace of the function in the DigitalOcean functions platform |
| `function_name` | `string` | Function name |
| `functions` | `any[]` |  |
| `guardrails` | `any[]` | The guardrails the agent is attached to |
| `if_case` | `string` |  |
| `input_schema` | `Record<string, any>` | Describe the input schema for the function so the agent may call it |
| `instruction` | `string` | Agent instruction. |
| `k` | `number` |  |
| `knowledge_bases` | `any[]` | Knowledge bases |
| `logging_config` | `Record<string, any>` |  |
| `max_tokens` | `number` |  |
| `mcp_servers` | `any[]` | MCP (Model Context Protocol) servers attached to this agent |
| `model` | `Record<string, any>` | Description of a Model |
| `model_provider_key` | `Record<string, any>` |  |
| `model_router` | `Record<string, any>` | Model router |
| `name` | `string` | Agent name |
| `openai_api_key` | `Record<string, any>` | OpenAI API Key Info |
| `output_schema` | `Record<string, any>` | Describe the output schema for the function so the agent handle its response |
| `parent_agents` | `any[]` | Parent agents |
| `project_id` | `string` |  |
| `provide_citations` | `boolean` | Whether the agent should provide in-response citations |
| `reasoning_effort` | `string` | The reasoning effort for the agent |
| `region` | `string` | Region code |
| `retrieval_method` | `string` | - RETRIEVAL_METHOD_UNKNOWN: The retrieval method is unknown - RETRIEVAL_METHOD_REWRITE: The retrieval method is rewrite - RETRIEVAL_METHOD_STEP_BACK: The retrieval method is step back - RETRIEVAL_METHOD_SUB_QUERIES: The retrieval method is… |
| `route_created_at` | `string` | Creation of route date / time |
| `route_created_by` | `string` |  |
| `route_name` | `string` | Route name |
| `route_uuid` | `string` |  |
| `tags` | `any[]` | Agent tag to organize related resources |
| `temperature` | `number` |  |
| `template` | `Record<string, any>` | Represents an AgentTemplate entity |
| `thinking_token_budget` | `number` | The thinking token budget for Anthropic extended thinking (0 = disabled) |
| `top_p` | `number` |  |
| `updated_at` | `string` | Last modified |
| `url` | `string` | Access your agent under this url |
| `user_id` | `string` | Id of user that created the agent |
| `uuid` | `string` | Unique agent id |
| `version_hash` | `string` | The latest version of the agent |
| `vpc_egress_ips` | `any[]` | VPC Egress IPs |
| `vpc_uuid` | `string` |  |
| `web_fetch_enabled` | `boolean` | Whether this agent can use the built-in web_fetch tool. |
| `web_search_enabled` | `boolean` | Whether this agent can use the built-in web_search tool. |
| `workspace` | `Record<string, any>` |  |

#### Example: Create

```ts
const api_link_agent_function_output = await client.ApiLinkAgentFunctionOutput().create({
  agent_id: 'example_agent_id',
})
```


### ApiLinkAgentGuardrailOutput

Create an instance: `const api_link_agent_guardrail_output = client.ApiLinkAgentGuardrailOutput()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `agent_uuid` | `string` | The UUID of the agent. |
| `anthropic_api_key` | `Record<string, any>` | Anthropic API Key Info |
| `api_key_infos` | `any[]` | Api key infos |
| `api_keys` | `any[]` | Api keys |
| `chatbot` | `Record<string, any>` | A Chatbot |
| `chatbot_identifiers` | `any[]` | Chatbot identifiers |
| `child_agents` | `any[]` | Child agents |
| `conversation_logs_enabled` | `boolean` | Whether conversation logs are enabled for the agent |
| `created_at` | `string` | Creation date / time |
| `deployment` | `Record<string, any>` | Description of deployment |
| `description` | `string` | Description of agent |
| `functions` | `any[]` |  |
| `guardrails` | `any[]` | The guardrails the agent is attached to |
| `if_case` | `string` |  |
| `instruction` | `string` | Agent instruction. |
| `k` | `number` |  |
| `knowledge_bases` | `any[]` | Knowledge bases |
| `logging_config` | `Record<string, any>` |  |
| `max_tokens` | `number` |  |
| `mcp_servers` | `any[]` | MCP (Model Context Protocol) servers attached to this agent |
| `model` | `Record<string, any>` | Description of a Model |
| `model_provider_key` | `Record<string, any>` |  |
| `model_router` | `Record<string, any>` | Model router |
| `name` | `string` | Agent name |
| `openai_api_key` | `Record<string, any>` | OpenAI API Key Info |
| `parent_agents` | `any[]` | Parent agents |
| `project_id` | `string` |  |
| `provide_citations` | `boolean` | Whether the agent should provide in-response citations |
| `reasoning_effort` | `string` | The reasoning effort for the agent |
| `region` | `string` | Region code |
| `retrieval_method` | `string` | - RETRIEVAL_METHOD_UNKNOWN: The retrieval method is unknown - RETRIEVAL_METHOD_REWRITE: The retrieval method is rewrite - RETRIEVAL_METHOD_STEP_BACK: The retrieval method is step back - RETRIEVAL_METHOD_SUB_QUERIES: The retrieval method is… |
| `route_created_at` | `string` | Creation of route date / time |
| `route_created_by` | `string` |  |
| `route_name` | `string` | Route name |
| `route_uuid` | `string` |  |
| `tags` | `any[]` | Agent tag to organize related resources |
| `temperature` | `number` |  |
| `template` | `Record<string, any>` | Represents an AgentTemplate entity |
| `thinking_token_budget` | `number` | The thinking token budget for Anthropic extended thinking (0 = disabled) |
| `top_p` | `number` |  |
| `updated_at` | `string` | Last modified |
| `url` | `string` | Access your agent under this url |
| `user_id` | `string` | Id of user that created the agent |
| `uuid` | `string` | Unique agent id |
| `version_hash` | `string` | The latest version of the agent |
| `vpc_egress_ips` | `any[]` | VPC Egress IPs |
| `vpc_uuid` | `string` |  |
| `web_fetch_enabled` | `boolean` | Whether this agent can use the built-in web_fetch tool. |
| `web_search_enabled` | `boolean` | Whether this agent can use the built-in web_search tool. |
| `workspace` | `Record<string, any>` |  |

#### Example: Create

```ts
const api_link_agent_guardrail_output = await client.ApiLinkAgentGuardrailOutput().create({
  agent_id: 'example_agent_id',
})
```


### ApiLinkAgentOutput

Create an instance: `const api_link_agent_output = client.ApiLinkAgentOutput()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `child_agent_uuid` | `string` | Routed agent id |
| `if_case` | `string` |  |
| `parent_agent_uuid` | `string` | A unique identifier for the parent agent. |
| `route_name` | `string` | Name of route |

#### Example: Create

```ts
const api_link_agent_output = await client.ApiLinkAgentOutput().create({
  agent_id: 'example_agent_id',
  child_agent_uuid: 'example_child_agent_uuid',
})
```


### ApiLinkKnowledgeBaseOutput

Create an instance: `const api_link_knowledge_base_output = client.ApiLinkKnowledgeBaseOutput()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `anthropic_api_key` | `Record<string, any>` | Anthropic API Key Info |
| `api_key_infos` | `any[]` | Api key infos |
| `api_keys` | `any[]` | Api keys |
| `chatbot` | `Record<string, any>` | A Chatbot |
| `chatbot_identifiers` | `any[]` | Chatbot identifiers |
| `child_agents` | `any[]` | Child agents |
| `conversation_logs_enabled` | `boolean` | Whether conversation logs are enabled for the agent |
| `created_at` | `string` | Creation date / time |
| `deployment` | `Record<string, any>` | Description of deployment |
| `description` | `string` | Description of agent |
| `functions` | `any[]` |  |
| `guardrails` | `any[]` | The guardrails the agent is attached to |
| `if_case` | `string` |  |
| `instruction` | `string` | Agent instruction. |
| `k` | `number` |  |
| `knowledge_bases` | `any[]` | Knowledge bases |
| `logging_config` | `Record<string, any>` |  |
| `max_tokens` | `number` |  |
| `mcp_servers` | `any[]` | MCP (Model Context Protocol) servers attached to this agent |
| `model` | `Record<string, any>` | Description of a Model |
| `model_provider_key` | `Record<string, any>` |  |
| `model_router` | `Record<string, any>` | Model router |
| `name` | `string` | Agent name |
| `openai_api_key` | `Record<string, any>` | OpenAI API Key Info |
| `parent_agents` | `any[]` | Parent agents |
| `project_id` | `string` |  |
| `provide_citations` | `boolean` | Whether the agent should provide in-response citations |
| `reasoning_effort` | `string` | The reasoning effort for the agent |
| `region` | `string` | Region code |
| `retrieval_method` | `string` | - RETRIEVAL_METHOD_UNKNOWN: The retrieval method is unknown - RETRIEVAL_METHOD_REWRITE: The retrieval method is rewrite - RETRIEVAL_METHOD_STEP_BACK: The retrieval method is step back - RETRIEVAL_METHOD_SUB_QUERIES: The retrieval method is… |
| `route_created_at` | `string` | Creation of route date / time |
| `route_created_by` | `string` |  |
| `route_name` | `string` | Route name |
| `route_uuid` | `string` |  |
| `tags` | `any[]` | Agent tag to organize related resources |
| `temperature` | `number` |  |
| `template` | `Record<string, any>` | Represents an AgentTemplate entity |
| `thinking_token_budget` | `number` | The thinking token budget for Anthropic extended thinking (0 = disabled) |
| `top_p` | `number` |  |
| `updated_at` | `string` | Last modified |
| `url` | `string` | Access your agent under this url |
| `user_id` | `string` | Id of user that created the agent |
| `uuid` | `string` | Unique agent id |
| `version_hash` | `string` | The latest version of the agent |
| `vpc_egress_ips` | `any[]` | VPC Egress IPs |
| `vpc_uuid` | `string` |  |
| `web_fetch_enabled` | `boolean` | Whether this agent can use the built-in web_fetch tool. |
| `web_search_enabled` | `boolean` | Whether this agent can use the built-in web_search tool. |
| `workspace` | `Record<string, any>` |  |

#### Example: Create

```ts
const api_link_knowledge_base_output = await client.ApiLinkKnowledgeBaseOutput().create({
  agent_id: 'example_agent_id',
})
```


### ApiListAgentApiKeysOutput

Create an instance: `const api_list_agent_api_keys_output = client.ApiListAgentApiKeysOutput()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `created_at` | `string` | Creation date |
| `created_by` | `string` | Created by |
| `deleted_at` | `string` | Deleted date |
| `name` | `string` | Name |
| `secret_key` | `string` |  |
| `uuid` | `string` | Uuid |

#### Example: List

```ts
const api_list_agent_api_keys_outputs = await client.ApiListAgentApiKeysOutput().list({ agent_id: "example" })
```


### ApiListAgentsByAnthropicKeyOutput

Create an instance: `const api_list_agents_by_anthropic_key_output = client.ApiListAgentsByAnthropicKeyOutput()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `anthropic_api_key` | `Record<string, any>` | Anthropic API Key Info |
| `api_key_infos` | `any[]` | Api key infos |
| `api_keys` | `any[]` | Api keys |
| `chatbot` | `Record<string, any>` | A Chatbot |
| `chatbot_identifiers` | `any[]` | Chatbot identifiers |
| `child_agents` | `any[]` | Child agents |
| `conversation_logs_enabled` | `boolean` | Whether conversation logs are enabled for the agent |
| `created_at` | `string` | Creation date / time |
| `deployment` | `Record<string, any>` | Description of deployment |
| `description` | `string` | Description of agent |
| `functions` | `any[]` |  |
| `guardrails` | `any[]` | The guardrails the agent is attached to |
| `if_case` | `string` |  |
| `instruction` | `string` | Agent instruction. |
| `k` | `number` |  |
| `knowledge_bases` | `any[]` | Knowledge bases |
| `logging_config` | `Record<string, any>` |  |
| `max_tokens` | `number` |  |
| `mcp_servers` | `any[]` | MCP (Model Context Protocol) servers attached to this agent |
| `model` | `Record<string, any>` | Description of a Model |
| `model_provider_key` | `Record<string, any>` |  |
| `model_router` | `Record<string, any>` | Model router |
| `name` | `string` | Agent name |
| `openai_api_key` | `Record<string, any>` | OpenAI API Key Info |
| `parent_agents` | `any[]` | Parent agents |
| `project_id` | `string` |  |
| `provide_citations` | `boolean` | Whether the agent should provide in-response citations |
| `reasoning_effort` | `string` | The reasoning effort for the agent |
| `region` | `string` | Region code |
| `retrieval_method` | `string` | - RETRIEVAL_METHOD_UNKNOWN: The retrieval method is unknown - RETRIEVAL_METHOD_REWRITE: The retrieval method is rewrite - RETRIEVAL_METHOD_STEP_BACK: The retrieval method is step back - RETRIEVAL_METHOD_SUB_QUERIES: The retrieval method is… |
| `route_created_at` | `string` | Creation of route date / time |
| `route_created_by` | `string` |  |
| `route_name` | `string` | Route name |
| `route_uuid` | `string` |  |
| `tags` | `any[]` | Agent tag to organize related resources |
| `temperature` | `number` |  |
| `template` | `Record<string, any>` | Represents an AgentTemplate entity |
| `thinking_token_budget` | `number` | The thinking token budget for Anthropic extended thinking (0 = disabled) |
| `top_p` | `number` |  |
| `updated_at` | `string` | Last modified |
| `url` | `string` | Access your agent under this url |
| `user_id` | `string` | Id of user that created the agent |
| `uuid` | `string` | Unique agent id |
| `version_hash` | `string` | The latest version of the agent |
| `vpc_egress_ips` | `any[]` | VPC Egress IPs |
| `vpc_uuid` | `string` |  |
| `web_fetch_enabled` | `boolean` | Whether this agent can use the built-in web_fetch tool. |
| `web_search_enabled` | `boolean` | Whether this agent can use the built-in web_search tool. |
| `workspace` | `Record<string, any>` |  |

#### Example: List

```ts
const api_list_agents_by_anthropic_key_outputs = await client.ApiListAgentsByAnthropicKeyOutput().list({ key_id: "example" })
```


### ApiListAgentsByOpenAiKeyOutput

Create an instance: `const api_list_agents_by_open_ai_key_output = client.ApiListAgentsByOpenAiKeyOutput()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `anthropic_api_key` | `Record<string, any>` | Anthropic API Key Info |
| `api_key_infos` | `any[]` | Api key infos |
| `api_keys` | `any[]` | Api keys |
| `chatbot` | `Record<string, any>` | A Chatbot |
| `chatbot_identifiers` | `any[]` | Chatbot identifiers |
| `child_agents` | `any[]` | Child agents |
| `conversation_logs_enabled` | `boolean` | Whether conversation logs are enabled for the agent |
| `created_at` | `string` | Creation date / time |
| `deployment` | `Record<string, any>` | Description of deployment |
| `description` | `string` | Description of agent |
| `functions` | `any[]` |  |
| `guardrails` | `any[]` | The guardrails the agent is attached to |
| `if_case` | `string` |  |
| `instruction` | `string` | Agent instruction. |
| `k` | `number` |  |
| `knowledge_bases` | `any[]` | Knowledge bases |
| `logging_config` | `Record<string, any>` |  |
| `max_tokens` | `number` |  |
| `mcp_servers` | `any[]` | MCP (Model Context Protocol) servers attached to this agent |
| `model` | `Record<string, any>` | Description of a Model |
| `model_provider_key` | `Record<string, any>` |  |
| `model_router` | `Record<string, any>` | Model router |
| `name` | `string` | Agent name |
| `openai_api_key` | `Record<string, any>` | OpenAI API Key Info |
| `parent_agents` | `any[]` | Parent agents |
| `project_id` | `string` |  |
| `provide_citations` | `boolean` | Whether the agent should provide in-response citations |
| `reasoning_effort` | `string` | The reasoning effort for the agent |
| `region` | `string` | Region code |
| `retrieval_method` | `string` | - RETRIEVAL_METHOD_UNKNOWN: The retrieval method is unknown - RETRIEVAL_METHOD_REWRITE: The retrieval method is rewrite - RETRIEVAL_METHOD_STEP_BACK: The retrieval method is step back - RETRIEVAL_METHOD_SUB_QUERIES: The retrieval method is… |
| `route_created_at` | `string` | Creation of route date / time |
| `route_created_by` | `string` |  |
| `route_name` | `string` | Route name |
| `route_uuid` | `string` |  |
| `tags` | `any[]` | Agent tag to organize related resources |
| `temperature` | `number` |  |
| `template` | `Record<string, any>` | Represents an AgentTemplate entity |
| `thinking_token_budget` | `number` | The thinking token budget for Anthropic extended thinking (0 = disabled) |
| `top_p` | `number` |  |
| `updated_at` | `string` | Last modified |
| `url` | `string` | Access your agent under this url |
| `user_id` | `string` | Id of user that created the agent |
| `uuid` | `string` | Unique agent id |
| `version_hash` | `string` | The latest version of the agent |
| `vpc_egress_ips` | `any[]` | VPC Egress IPs |
| `vpc_uuid` | `string` |  |
| `web_fetch_enabled` | `boolean` | Whether this agent can use the built-in web_fetch tool. |
| `web_search_enabled` | `boolean` | Whether this agent can use the built-in web_search tool. |
| `workspace` | `Record<string, any>` |  |

#### Example: List

```ts
const api_list_agents_by_open_ai_key_outputs = await client.ApiListAgentsByOpenAiKeyOutput().list({ key_id: "example" })
```


### ApiListAgentsByWorkspaceOutput

Create an instance: `const api_list_agents_by_workspace_output = client.ApiListAgentsByWorkspaceOutput()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `anthropic_api_key` | `Record<string, any>` | Anthropic API Key Info |
| `api_key_infos` | `any[]` | Api key infos |
| `api_keys` | `any[]` | Api keys |
| `chatbot` | `Record<string, any>` | A Chatbot |
| `chatbot_identifiers` | `any[]` | Chatbot identifiers |
| `child_agents` | `any[]` | Child agents |
| `conversation_logs_enabled` | `boolean` | Whether conversation logs are enabled for the agent |
| `created_at` | `string` | Creation date / time |
| `deployment` | `Record<string, any>` | Description of deployment |
| `description` | `string` | Description of agent |
| `functions` | `any[]` |  |
| `guardrails` | `any[]` | The guardrails the agent is attached to |
| `if_case` | `string` |  |
| `instruction` | `string` | Agent instruction. |
| `k` | `number` |  |
| `knowledge_bases` | `any[]` | Knowledge bases |
| `logging_config` | `Record<string, any>` |  |
| `max_tokens` | `number` |  |
| `mcp_servers` | `any[]` | MCP (Model Context Protocol) servers attached to this agent |
| `model` | `Record<string, any>` | Description of a Model |
| `model_provider_key` | `Record<string, any>` |  |
| `model_router` | `Record<string, any>` | Model router |
| `name` | `string` | Agent name |
| `openai_api_key` | `Record<string, any>` | OpenAI API Key Info |
| `parent_agents` | `any[]` | Parent agents |
| `project_id` | `string` |  |
| `provide_citations` | `boolean` | Whether the agent should provide in-response citations |
| `reasoning_effort` | `string` | The reasoning effort for the agent |
| `region` | `string` | Region code |
| `retrieval_method` | `string` | - RETRIEVAL_METHOD_UNKNOWN: The retrieval method is unknown - RETRIEVAL_METHOD_REWRITE: The retrieval method is rewrite - RETRIEVAL_METHOD_STEP_BACK: The retrieval method is step back - RETRIEVAL_METHOD_SUB_QUERIES: The retrieval method is… |
| `route_created_at` | `string` | Creation of route date / time |
| `route_created_by` | `string` |  |
| `route_name` | `string` | Route name |
| `route_uuid` | `string` |  |
| `tags` | `any[]` | Agent tag to organize related resources |
| `temperature` | `number` |  |
| `template` | `Record<string, any>` | Represents an AgentTemplate entity |
| `thinking_token_budget` | `number` | The thinking token budget for Anthropic extended thinking (0 = disabled) |
| `top_p` | `number` |  |
| `updated_at` | `string` | Last modified |
| `url` | `string` | Access your agent under this url |
| `user_id` | `string` | Id of user that created the agent |
| `uuid` | `string` | Unique agent id |
| `version_hash` | `string` | The latest version of the agent |
| `vpc_egress_ips` | `any[]` | VPC Egress IPs |
| `vpc_uuid` | `string` |  |
| `web_fetch_enabled` | `boolean` | Whether this agent can use the built-in web_fetch tool. |
| `web_search_enabled` | `boolean` | Whether this agent can use the built-in web_search tool. |
| `workspace` | `Record<string, any>` |  |

#### Example: List

```ts
const api_list_agents_by_workspace_outputs = await client.ApiListAgentsByWorkspaceOutput().list({ workspace_id: "example" })
```


### ApiListEvaluationMetricsOutput

Create an instance: `const api_list_evaluation_metrics_output = client.ApiListEvaluationMetricsOutput()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `associated_presets` | `any[]` | Saved model evaluation presets that reference this metric. |
| `category` | `string` |  |
| `custom_eval_config` | `Record<string, any>` | Configuration for a custom model-evaluation metric scored by an LLM judge. |
| `description` | `string` |  |
| `evaluation_scope` | `string` | Scope that determines whether a metric belongs to agent evaluation or model evaluation. |
| `inverted` | `boolean` | If true, the metric is inverted, meaning that a lower value is better. |
| `is_metric_goal` | `boolean` |  |
| `metric_name` | `string` |  |
| `metric_rank` | `number` |  |
| `metric_type` | `string` |  |
| `metric_uuid` | `string` |  |
| `metric_value_type` | `string` |  |
| `range_max` | `number` | The maximum value for the metric. |
| `range_min` | `number` | The minimum value for the metric. |
| `source` | `string` | Distinguishes platform catalog metrics from user-defined LLM-as-judge metrics. |

#### Example: List

```ts
const api_list_evaluation_metrics_outputs = await client.ApiListEvaluationMetricsOutput().list()
```


### ApiListEvaluationRunsByTestCaseOutput

Create an instance: `const api_list_evaluation_runs_by_test_case_output = client.ApiListEvaluationRunsByTestCaseOutput()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `agent_deleted` | `boolean` | Whether agent is deleted |
| `agent_deployment_name` | `string` | The agent deployment name |
| `agent_name` | `string` | Agent name |
| `agent_uuid` | `string` | Agent UUID. |
| `agent_version_hash` | `string` | Version hash |
| `agent_workspace_uuid` | `string` | Agent workspace uuid |
| `created_by_user_email` | `string` |  |
| `created_by_user_id` | `string` |  |
| `error_description` | `string` | The error description |
| `evaluation_run_uuid` | `string` | Evaluation run UUID. |
| `evaluation_test_case_workspace_uuid` | `string` | Evaluation test case workspace uuid |
| `finished_at` | `string` | Run end time. |
| `pass_status` | `boolean` | The pass status of the evaluation run based on the star metric. |
| `queued_at` | `string` | Run queued time. |
| `run_level_metric_results` | `any[]` |  |
| `run_name` | `string` | Run name. |
| `star_metric_result` | `Record<string, any>` |  |
| `started_at` | `string` | Run start time. |
| `status` | `string` | Evaluation Run Statuses |
| `test_case_description` | `string` | Test case description. |
| `test_case_name` | `string` | Test case name. |
| `test_case_uuid` | `string` | Test-case UUID. |
| `test_case_version` | `number` | Test-case-version. |

#### Example: List

```ts
const api_list_evaluation_runs_by_test_case_outputs = await client.ApiListEvaluationRunsByTestCaseOutput().list({ evaluation_test_case_id: "example" })
```


### ApiListEvaluationTestCasesByWorkspaceOutput

Create an instance: `const api_list_evaluation_test_cases_by_workspace_output = client.ApiListEvaluationTestCasesByWorkspaceOutput()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `archived_at` | `string` |  |
| `created_at` | `string` |  |
| `created_by_user_email` | `string` |  |
| `created_by_user_id` | `string` |  |
| `dataset` | `Record<string, any>` |  |
| `dataset_name` | `string` |  |
| `dataset_uuid` | `string` |  |
| `description` | `string` |  |
| `latest_version_number_of_runs` | `number` |  |
| `metrics` | `any[]` |  |
| `name` | `string` |  |
| `star_metric` | `Record<string, any>` |  |
| `test_case_uuid` | `string` |  |
| `total_runs` | `number` |  |
| `updated_at` | `string` |  |
| `updated_by_user_email` | `string` |  |
| `updated_by_user_id` | `string` |  |
| `version` | `number` |  |

#### Example: List

```ts
const api_list_evaluation_test_cases_by_workspace_outputs = await client.ApiListEvaluationTestCasesByWorkspaceOutput().list({ workspace_id: "example" })
```


### ApiListKnowledgeBaseDataSourcesOutput

Create an instance: `const api_list_knowledge_base_data_sources_output = client.ApiListKnowledgeBaseDataSourcesOutput()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `aws_data_source` | `Record<string, any>` | AWS S3 Data Source for Display |
| `bucket_name` | `string` | Name of storage bucket - Deprecated, moved to data_source_details |
| `chunking_algorithm` | `string` |  |
| `chunking_options` | `Record<string, any>` |  |
| `created_at` | `string` | Creation date / time |
| `dropbox_data_source` | `Record<string, any>` | Dropbox Data Source for Display |
| `file_upload_data_source` | `Record<string, any>` | File to upload as data source for knowledge base. |
| `google_drive_data_source` | `Record<string, any>` | Google Drive Data Source for Display |
| `item_path` | `string` | Path of folder or object in bucket - Deprecated, moved to data_source_details |
| `last_datasource_indexing_job` | `Record<string, any>` |  |
| `region` | `string` | Region code - Deprecated, moved to data_source_details |
| `spaces_data_source` | `Record<string, any>` | Spaces Bucket Data Source |
| `updated_at` | `string` | Last modified |
| `uuid` | `string` | Unique id of knowledge base |
| `web_crawler_data_source` | `Record<string, any>` | WebCrawlerDataSource |

#### Example: List

```ts
const api_list_knowledge_base_data_sources_outputs = await client.ApiListKnowledgeBaseDataSourcesOutput().list({ knowledge_base_id: "example" })
```


### ApiListKnowledgeBaseIndexingJobsOutput

Create an instance: `const api_list_knowledge_base_indexing_jobs_output = client.ApiListKnowledgeBaseIndexingJobsOutput()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `completed_datasources` | `number` | Number of datasources indexed completed |
| `created_at` | `string` | Creation date / time |
| `data_source_jobs` | `any[]` | Details on Data Sources included in the Indexing Job |
| `data_source_uuids` | `any[]` |  |
| `finished_at` | `string` |  |
| `is_report_available` | `boolean` | Boolean value to determine if the indexing job details are available |
| `knowledge_base_uuid` | `string` | Knowledge base id |
| `phase` | `string` |  |
| `started_at` | `string` |  |
| `status` | `string` |  |
| `tokens` | `number` | Number of tokens [This field is deprecated] |
| `total_datasources` | `number` | Number of datasources being indexed |
| `total_tokens` | `string` | Total Tokens Consumed By the Indexing Job |
| `updated_at` | `string` | Last modified |
| `uuid` | `string` | Unique id |

#### Example: List

```ts
const api_list_knowledge_base_indexing_jobs_outputs = await client.ApiListKnowledgeBaseIndexingJobsOutput().list({ knowledge_base_id: "example" })
```


### ApiListModelEvaluationMetricsOutput

Create an instance: `const api_list_model_evaluation_metrics_output = client.ApiListModelEvaluationMetricsOutput()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `associated_presets` | `any[]` | Saved model evaluation presets that reference this metric. |
| `category` | `string` |  |
| `custom_eval_config` | `Record<string, any>` | Configuration for a custom model-evaluation metric scored by an LLM judge. |
| `description` | `string` |  |
| `evaluation_scope` | `string` | Scope that determines whether a metric belongs to agent evaluation or model evaluation. |
| `inverted` | `boolean` | If true, the metric is inverted, meaning that a lower value is better. |
| `is_metric_goal` | `boolean` |  |
| `metric_name` | `string` |  |
| `metric_rank` | `number` |  |
| `metric_type` | `string` |  |
| `metric_uuid` | `string` |  |
| `metric_value_type` | `string` |  |
| `range_max` | `number` | The maximum value for the metric. |
| `range_min` | `number` | The minimum value for the metric. |
| `source` | `string` | Distinguishes platform catalog metrics from user-defined LLM-as-judge metrics. |

#### Example: List

```ts
const api_list_model_evaluation_metrics_outputs = await client.ApiListModelEvaluationMetricsOutput().list()
```


### ApiListScenarioLibraryOutput

Create an instance: `const api_list_scenario_library_output = client.ApiListScenarioLibraryOutput()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `category` | `string` | Optional grouping for catalog browsing (e.g. |
| `created_at` | `string` | Time created at. |
| `description` | `string` | Curated description. |
| `goal_description` | `string` | The goal this scenario set demonstrates, shown as context alongside goal-driven generation. |
| `library_scenario_uuid` | `string` | UUID of the library entry. |
| `name` | `string` | Curated display name. |
| `scenario_count` | `number` | Number of scenarios in the library entry. |
| `status` | `string` | Lifecycle status of a Common Scenario & Goal Library entry. |
| `updated_at` | `string` | Time last updated at. |

#### Example: List

```ts
const api_list_scenario_library_outputs = await client.ApiListScenarioLibraryOutput().list()
```


### ApiListScenariosOutput

Create an instance: `const api_list_scenarios_output = client.ApiListScenariosOutput()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `description` | `string` | What the user tries to accomplish. |
| `exploration_budget` | `number` | Number of journeys to explore for this scenario. |
| `max_turns` | `number` | Turn budget for the scenario. |
| `name` | `string` | Human-readable name for the scenario. |
| `scenario_uuid` | `string` | Unique id for the scenario. |
| `stopping_criteria` | `any[]` | Judge stopping criteria. |
| `user_persona` | `string` | How the user communicates (tone, role). |

#### Example: List

```ts
const api_list_scenarios_outputs = await client.ApiListScenariosOutput().list({ scenario_library_id: "example" })
```


### ApiListSimulationJourneysOutput

Create an instance: `const api_list_simulation_journeys_output = client.ApiListSimulationJourneysOutput()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `created_at` | `string` | Time created at. |
| `duration_sec` | `string` | Wall-clock time taken for the journey to complete, in seconds. |
| `failure_reason` | `string` | Human-readable explanation of a terminal FAILED status. |
| `journey_index` | `number` | Zero-based index of this journey within its scenario's exploration budget. |
| `journey_uuid` | `string` | UUID of the journey. |
| `judge_reasoning` | `string` | Optional judge reasoning for the verdict. |
| `run_uuid` | `string` | UUID of the run this journey belongs to. |
| `scenario_uuid` | `string` | UUID of the scenario this journey executed. |
| `session_id` | `string` | Session identifier for this journey. |
| `status` | `string` | Lifecycle status of a single journey. |
| `token_usage` | `Record<string, any>` | Per-actor token accounting for a run or journey. |
| `trajectory_bucket_name` | `string` | Object storage bucket holding the trajectory JSON. |
| `trajectory_bucket_region` | `string` | Object storage bucket region for the trajectory JSON. |
| `trajectory_spaces_key` | `string` | Object storage key for the trajectory JSON. |
| `updated_at` | `string` | Time last updated at. |
| `verdict` | `string` | The judge's verdict for a journey. |

#### Example: List

```ts
const api_list_simulation_journeys_outputs = await client.ApiListSimulationJourneysOutput().list({ simulation_run_id: "example" })
```


### ApiModelCatalogCard

Create an instance: `const api_model_catalog_card = client.ApiModelCatalogCard()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `availability` | `any[]` |  |
| `badges` | `any[]` | Badges for models |
| `benchmark_score` | `Record<string, any>` | Benchmark scores for this model, stored as arbitrary JSON |
| `capabilities` | `any[]` |  |
| `code_snippets` | `Record<string, any>` | Code examples for using the model |
| `context_window` | `string` | Specs (same as Entry) |
| `created_at` | `string` | RFC 3339 timestamp indicating when the model was added to the catalog. |
| `creator` | `string` | Model creator/developer (e.g., "Meta", "Anthropic", "OpenAI") |
| `description` | `string` | Card-specific |
| `hugging_face_id` | `string` | The Hugging Face repository ID (e.g. |
| `id` | `string` | Identity (same as Entry) |
| `max_output_tokens` | `string` | The maximum number of output tokens the model can generate in a single response. |
| `modalities` | `Record<string, any>` | Input/output modalities |
| `model_id` | `string` | Model identifier used for API calls (e.g., "llama3.1-70b-instruct") |
| `name` | `string` |  |
| `parameter_count` | `number` |  |
| `pricing` | `Record<string, any>` | Pricing per million tokens (aligns with existing ModelPrice pattern) |
| `pricing_detail` | `Record<string, any>` | The complete set of prices for a model, covering every available variant. |
| `provider` | `string` |  |
| `scaled_pricing_enabled` | `boolean` | True when this model's pricing varies over time. |
| `short_description` | `string` |  |
| `type` | `string` |  |

#### Example: Load

```ts
const api_model_catalog_card = await client.ApiModelCatalogCard().load({ id: 'api_model_catalog_card_id' })
```

#### Example: List

```ts
const api_model_catalog_cards = await client.ApiModelCatalogCard().list()
```


### ApiModelEvaluationPreset

Create an instance: `const api_model_evaluation_preset = client.ApiModelEvaluationPreset()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `candidate_inference_config` | `Record<string, any>` | Inference configuration for the candidate model during evaluation. |
| `candidate_model_name` | `string` | Model slug used to call the candidate model API. |
| `candidate_model_source` | `string` | Whether the candidate is a served model (serverless platform, a dedicated deployment, or a model router) or an OHS-hosted agent config. |
| `candidate_model_uuid` | `string` | UUID of the candidate model stored on this preset. |
| `candidate_system_prompt` | `string` | System prompt / instructions to send to the candidate model. |
| `created_at` | `string` | Timestamp when the preset was created. |
| `dataset_name` | `string` | Display name of the dataset stored on this preset. |
| `dataset_uuid` | `string` | UUID of the dataset stored on this preset. |
| `eval_preset_uuid` | `string` | UUID of the evaluation preset. |
| `id` | `string` |  |
| `judge_model_name` | `string` | Display name of the judge model stored on this preset. |
| `judge_model_uuid` | `string` | UUID of the judge model stored on this preset. |
| `metrics` | `any[]` | Metrics selected for this preset. |
| `name` | `string` | Name of the evaluation preset. |
| `saved_sections` | `any[]` | Sections of the inline evaluation config that were persisted when this preset was created. |
| `star_metric` | `Record<string, any>` |  |

#### Example: Load

```ts
const api_model_evaluation_preset = await client.ApiModelEvaluationPreset().load({ id: 'api_model_evaluation_preset_id' })
```

#### Example: List

```ts
const api_model_evaluation_presets = await client.ApiModelEvaluationPreset().list()
```


### ApiModelPublic

Create an instance: `const api_model_public = client.ApiModelPublic()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `agreement` | `Record<string, any>` | Agreement Description |
| `benchmark_score` | `Record<string, any>` | Benchmark scores for this model, stored as arbitrary JSON |
| `capabilities` | `any[]` | Model capabilities (inference, reasoning, vectorization, etc.) |
| `context_window` | `string` | Context window (maximum tokens) |
| `created_at` | `string` | Creation date / time |
| `description` | `string` | Model description |
| `endpoints` | `any[]` | Available endpoints and their capabilities |
| `id` | `string` | Human-readable model identifier |
| `is_foundational` | `boolean` | True if it is a foundational model provided by do |
| `kb_default_chunk_size` | `number` | Default chunking size limit to show in UI |
| `kb_max_chunk_size` | `number` | Maximum chunk size limit of model |
| `kb_min_chunk_size` | `number` | Minimum chunking size token limits if model supports KNOWLEDGEBASE usecase |
| `lifecycle_status` | `string` | Lifecycle status of the model (internal, public-preview, active, deprecated, end_of_life) |
| `modalities` | `Record<string, any>` | Input/output modalities |
| `model_availability` | `string` | Model availability (serverless, dedicated, etc.) |
| `name` | `string` | Display name of the model |
| `parameter_count` | `number` | Parameter count in billions |
| `parent_uuid` | `string` | Unique id of the model, this model is based on |
| `pricing` | `Record<string, any>` | Pricing per million tokens (aligns with existing ModelPrice pattern) |
| `provider` | `string` |  |
| `reasoning_efforts` | `any[]` | Available reasoning efforts for this model |
| `settings` | `any[]` | Playground settings derived from model metadata |
| `thinking` | `boolean` | Whether this model supports extended thinking (Anthropic models) |
| `type` | `string` | Model type (chat, embedding, image, reasoning, coding) |
| `updated_at` | `string` | Last modified |
| `upload_complete` | `boolean` | Model has been fully uploaded |
| `url` | `string` | Download url |
| `uuid` | `string` | Unique id |
| `version` | `Record<string, any>` | Version Information about a Model |

#### Example: List

```ts
const api_model_publics = await client.ApiModelPublic().list()
```


### ApiModelRouterPreset

Create an instance: `const api_model_router_preset = client.ApiModelRouterPreset()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `config` | `Record<string, any>` |  |
| `display_name` | `string` | Display name for UI surfaces |
| `long_description` | `string` | Long description for details views |
| `short_description` | `string` | Short description for list views |
| `slug` | `string` | Stable slug for routing usage |

#### Example: List

```ts
const api_model_router_presets = await client.ApiModelRouterPreset().list()
```


### ApiModelRouterTaskPreset

Create an instance: `const api_model_router_task_preset = client.ApiModelRouterTaskPreset()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `category` | `string` | Higher-level grouping used by the UI |
| `description` | `string` | Task description |
| `models` | `any[]` | Default models assigned to this task |
| `name` | `string` | Display name |
| `selection_policy` | `Record<string, any>` | Selection policy preference for choosing among assigned models. |
| `tags` | `any[]` | Lightweight labels for filtering |
| `task_slug` | `string` | Task slug |

#### Example: List

```ts
const api_model_router_task_presets = await client.ApiModelRouterTaskPreset().list()
```


### ApiMoveAgentsToWorkspaceOutput

Create an instance: `const api_move_agents_to_workspace_output = client.ApiMoveAgentsToWorkspaceOutput()`

#### Operations

| Method | Description |
| --- | --- |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `agent_uuids` | `any[]` | Agent uuids |
| `agents` | `any[]` | Agents |
| `created_at` | `string` | Creation date |
| `created_by` | `string` | The id of user who created this workspace |
| `created_by_email` | `string` | The email of the user who created this workspace |
| `deleted_at` | `string` | Deleted date |
| `description` | `string` | Description of the workspace |
| `evaluation_test_cases` | `any[]` | Evaluations |
| `name` | `string` | Name of the workspace |
| `updated_at` | `string` | Update date |
| `uuid` | `string` | Unique id |
| `workspace_uuid` | `string` | Workspace uuid to move agents to |


### ApiPrompt

Create an instance: `const api_prompt = client.ApiPrompt()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `evaluation_trace_spans` | `any[]` | The evaluated trace spans. |
| `ground_truth` | `string` | The ground truth for the prompt. |
| `input` | `string` |  |
| `input_tokens` | `string` | The number of input tokens used in the prompt. |
| `output` | `string` |  |
| `output_tokens` | `string` | The number of output tokens used in the prompt. |
| `prompt_chunks` | `any[]` | The list of prompt chunks. |
| `prompt_id` | `number` | Prompt ID |
| `prompt_level_metric_results` | `any[]` | The metric results for the prompt. |
| `trace_id` | `string` | The trace id for the prompt. |

#### Example: Load

```ts
const api_prompt = await client.ApiPrompt().load({ evaluation_run_id: 'evaluation_run_id', prompt_id: 1 })
```


### ApiRollbackToAgentVersionOutput

Create an instance: `const api_rollback_to_agent_version_output = client.ApiRollbackToAgentVersionOutput()`

#### Operations

| Method | Description |
| --- | --- |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `audit_header` | `Record<string, any>` | An alternative way to provide auth information. |
| `uuid` | `string` | Agent unique identifier |
| `version_hash` | `string` | Unique identifier |


### ApiSimulationJourney

Create an instance: `const api_simulation_journey = client.ApiSimulationJourney()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `created_at` | `string` | Time created at. |
| `duration_sec` | `string` | Wall-clock time taken for the journey to complete, in seconds. |
| `failure_reason` | `string` | Human-readable explanation of a terminal FAILED status. |
| `id` | `string` |  |
| `journey_index` | `number` | Zero-based index of this journey within its scenario's exploration budget. |
| `journey_uuid` | `string` | UUID of the journey. |
| `judge_reasoning` | `string` | Optional judge reasoning for the verdict. |
| `run_uuid` | `string` | UUID of the run this journey belongs to. |
| `scenario_uuid` | `string` | UUID of the scenario this journey executed. |
| `session_id` | `string` | Session identifier for this journey. |
| `status` | `string` | Lifecycle status of a single journey. |
| `token_usage` | `Record<string, any>` | Per-actor token accounting for a run or journey. |
| `trajectory_bucket_name` | `string` | Object storage bucket holding the trajectory JSON. |
| `trajectory_bucket_region` | `string` | Object storage bucket region for the trajectory JSON. |
| `trajectory_spaces_key` | `string` | Object storage key for the trajectory JSON. |
| `updated_at` | `string` | Time last updated at. |
| `verdict` | `string` | The judge's verdict for a journey. |

#### Example: Load

```ts
const api_simulation_journey = await client.ApiSimulationJourney().load({ id: 'api_simulation_journey_id', simulation_run_id: 'simulation_run_id' })
```


### ApiSimulationTrajectory

Create an instance: `const api_simulation_trajectory = client.ApiSimulationTrajectory()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `agent_id` | `string` | Identifier of the candidate agent under test for this journey. |
| `completed_at` | `string` |  |
| `duration_sec` | `string` |  |
| `evaluation_metrics` | `any[]` | Per-metric scores and judge reasoning for this trajectory. |
| `failure_reason` | `string` |  |
| `journey_index` | `number` |  |
| `journey_uuid` | `string` |  |
| `judge` | `Record<string, any>` | Judge output embedded in the trajectory JSON. |
| `max_turns` | `number` | Turn budget configured for this journey (per-scenario max_turns, after any run-level override). |
| `messages` | `any[]` |  |
| `run_uuid` | `string` |  |
| `scenario_uuid` | `string` |  |
| `session_id` | `string` |  |
| `started_at` | `string` |  |
| `status` | `string` | Lifecycle status of the trajectory. |
| `token_usage` | `Record<string, any>` | Per-actor token accounting for a run or journey. |
| `turn_count` | `number` |  |
| `verdict` | `string` | The judge's verdict for a journey. |

#### Example: Load

```ts
const api_simulation_trajectory = await client.ApiSimulationTrajectory().load({ journey_id: 'journey_id', simulation_run_id: 'simulation_run_id' })
```


### ApiUnlinkAgentFunctionOutput

Create an instance: `const api_unlink_agent_function_output = client.ApiUnlinkAgentFunctionOutput()`

#### Operations

| Method | Description |
| --- | --- |
| `remove(match)` | Remove the matching entity. |


### ApiUnlinkAgentGuardrailOutput

Create an instance: `const api_unlink_agent_guardrail_output = client.ApiUnlinkAgentGuardrailOutput()`

#### Operations

| Method | Description |
| --- | --- |
| `remove(match)` | Remove the matching entity. |


### ApiUnlinkAgentOutput

Create an instance: `const api_unlink_agent_output = client.ApiUnlinkAgentOutput()`

#### Operations

| Method | Description |
| --- | --- |
| `remove(match)` | Remove the matching entity. |


### ApiUnlinkKnowledgeBaseOutput

Create an instance: `const api_unlink_knowledge_base_output = client.ApiUnlinkKnowledgeBaseOutput()`

#### Operations

| Method | Description |
| --- | --- |
| `remove(match)` | Remove the matching entity. |


### ApiUpdateAgentApiKeyOutput

Create an instance: `const api_update_agent_api_key_output = client.ApiUpdateAgentApiKeyOutput()`

#### Operations

| Method | Description |
| --- | --- |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `agent_uuid` | `string` | Agent id |
| `api_key_uuid` | `string` | API key ID |
| `created_at` | `string` | Creation date |
| `created_by` | `string` | Created by |
| `deleted_at` | `string` | Deleted date |
| `name` | `string` | Name |
| `secret_key` | `string` |  |
| `uuid` | `string` | Uuid |


### ApiUpdateAgentFunctionOutput

Create an instance: `const api_update_agent_function_output = client.ApiUpdateAgentFunctionOutput()`

#### Operations

| Method | Description |
| --- | --- |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `agent_uuid` | `string` | Agent id |
| `anthropic_api_key` | `Record<string, any>` | Anthropic API Key Info |
| `api_key_infos` | `any[]` | Api key infos |
| `api_keys` | `any[]` | Api keys |
| `chatbot` | `Record<string, any>` | A Chatbot |
| `chatbot_identifiers` | `any[]` | Chatbot identifiers |
| `child_agents` | `any[]` | Child agents |
| `conversation_logs_enabled` | `boolean` | Whether conversation logs are enabled for the agent |
| `created_at` | `string` | Creation date / time |
| `deployment` | `Record<string, any>` | Description of deployment |
| `description` | `string` | Description of agent |
| `faas_name` | `string` | The name of the function in the DigitalOcean functions platform |
| `faas_namespace` | `string` | The namespace of the function in the DigitalOcean functions platform |
| `function_name` | `string` | Function name |
| `function_uuid` | `string` | Function id |
| `functions` | `any[]` |  |
| `guardrails` | `any[]` | The guardrails the agent is attached to |
| `if_case` | `string` |  |
| `input_schema` | `Record<string, any>` | Describe the input schema for the function so the agent may call it |
| `instruction` | `string` | Agent instruction. |
| `k` | `number` |  |
| `knowledge_bases` | `any[]` | Knowledge bases |
| `logging_config` | `Record<string, any>` |  |
| `max_tokens` | `number` |  |
| `mcp_servers` | `any[]` | MCP (Model Context Protocol) servers attached to this agent |
| `model` | `Record<string, any>` | Description of a Model |
| `model_provider_key` | `Record<string, any>` |  |
| `model_router` | `Record<string, any>` | Model router |
| `name` | `string` | Agent name |
| `openai_api_key` | `Record<string, any>` | OpenAI API Key Info |
| `output_schema` | `Record<string, any>` | Describe the output schema for the function so the agent handle its response |
| `parent_agents` | `any[]` | Parent agents |
| `project_id` | `string` |  |
| `provide_citations` | `boolean` | Whether the agent should provide in-response citations |
| `reasoning_effort` | `string` | The reasoning effort for the agent |
| `region` | `string` | Region code |
| `retrieval_method` | `string` | - RETRIEVAL_METHOD_UNKNOWN: The retrieval method is unknown - RETRIEVAL_METHOD_REWRITE: The retrieval method is rewrite - RETRIEVAL_METHOD_STEP_BACK: The retrieval method is step back - RETRIEVAL_METHOD_SUB_QUERIES: The retrieval method is… |
| `route_created_at` | `string` | Creation of route date / time |
| `route_created_by` | `string` |  |
| `route_name` | `string` | Route name |
| `route_uuid` | `string` |  |
| `tags` | `any[]` | Agent tag to organize related resources |
| `temperature` | `number` |  |
| `template` | `Record<string, any>` | Represents an AgentTemplate entity |
| `thinking_token_budget` | `number` | The thinking token budget for Anthropic extended thinking (0 = disabled) |
| `top_p` | `number` |  |
| `updated_at` | `string` | Last modified |
| `url` | `string` | Access your agent under this url |
| `user_id` | `string` | Id of user that created the agent |
| `uuid` | `string` | Unique agent id |
| `version_hash` | `string` | The latest version of the agent |
| `vpc_egress_ips` | `any[]` | VPC Egress IPs |
| `vpc_uuid` | `string` |  |
| `web_fetch_enabled` | `boolean` | Whether this agent can use the built-in web_fetch tool. |
| `web_search_enabled` | `boolean` | Whether this agent can use the built-in web_search tool. |
| `workspace` | `Record<string, any>` |  |


### ApiUpdateAgentOutput

Create an instance: `const api_update_agent_output = client.ApiUpdateAgentOutput()`

#### Operations

| Method | Description |
| --- | --- |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `agent_log_insights_enabled` | `boolean` |  |
| `allowed_domains` | `any[]` | Optional list of allowed domains for the chatbot - Must use fully qualified domain name (FQDN) such as https://example.com |
| `anthropic_api_key` | `Record<string, any>` | Anthropic API Key Info |
| `anthropic_key_uuid` | `string` | Optional anthropic key uuid for use with anthropic models |
| `api_key_infos` | `any[]` | Api key infos |
| `api_keys` | `any[]` | Api keys |
| `chatbot` | `Record<string, any>` | A Chatbot |
| `chatbot_identifiers` | `any[]` | Chatbot identifiers |
| `child_agents` | `any[]` | Child agents |
| `clear_mcp_servers` | `boolean` | When true, removes all MCP servers from the agent. |
| `conversation_logs_enabled` | `boolean` | Whether conversation logs are enabled for the agent |
| `created_at` | `string` | Creation date / time |
| `deployment` | `Record<string, any>` | Description of deployment |
| `description` | `string` | Description of agent |
| `functions` | `any[]` |  |
| `guardrails` | `any[]` | The guardrails the agent is attached to |
| `if_case` | `string` |  |
| `instruction` | `string` | Agent instruction. |
| `k` | `number` | How many results should be considered from an attached knowledge base |
| `knowledge_bases` | `any[]` | Knowledge bases |
| `logging_config` | `Record<string, any>` |  |
| `max_tokens` | `number` | Specifies the maximum number of tokens the model can process in a single input or output, set as a number between 1 and 512. |
| `mcp_servers` | `any[]` | MCP (Model Context Protocol) servers attached to this agent |
| `model` | `Record<string, any>` | Description of a Model |
| `model_provider_key` | `Record<string, any>` |  |
| `model_provider_key_uuid` | `string` | Optional Model Provider uuid for use with provider models |
| `model_router` | `Record<string, any>` | Model router |
| `model_router_uuid` | `string` |  |
| `model_uuid` | `string` | Identifier for the foundation model. |
| `name` | `string` | Agent name |
| `open_ai_key_uuid` | `string` | Optional OpenAI key uuid for use with OpenAI models |
| `openai_api_key` | `Record<string, any>` | OpenAI API Key Info |
| `parent_agents` | `any[]` | Parent agents |
| `project_id` | `string` | The id of the DigitalOcean project this agent will belong to |
| `provide_citations` | `boolean` | Whether the agent should provide in-response citations |
| `reasoning_effort` | `string` | The reasoning effort for the agent |
| `region` | `string` | Region code |
| `retrieval_method` | `string` | - RETRIEVAL_METHOD_UNKNOWN: The retrieval method is unknown - RETRIEVAL_METHOD_REWRITE: The retrieval method is rewrite - RETRIEVAL_METHOD_STEP_BACK: The retrieval method is step back - RETRIEVAL_METHOD_SUB_QUERIES: The retrieval method is… |
| `route_created_at` | `string` | Creation of route date / time |
| `route_created_by` | `string` |  |
| `route_name` | `string` | Route name |
| `route_uuid` | `string` |  |
| `router_preset_slug` | `string` |  |
| `tags` | `any[]` | Agent tag to organize related resources |
| `temperature` | `number` | Controls the model’s creativity, specified as a number between 0 and 1. |
| `template` | `Record<string, any>` | Represents an AgentTemplate entity |
| `thinking_token_budget` | `number` | The thinking token budget for Anthropic extended thinking (0 = disabled) |
| `top_p` | `number` | Defines the cumulative probability threshold for word selection, specified as a number between 0 and 1. |
| `updated_at` | `string` | Last modified |
| `url` | `string` | Access your agent under this url |
| `user_id` | `string` | Id of user that created the agent |
| `uuid` | `string` | Unique agent id |
| `version_hash` | `string` | The latest version of the agent |
| `vpc_egress_ips` | `any[]` | VPC Egress IPs |
| `vpc_uuid` | `string` |  |
| `web_fetch_enabled` | `boolean` | Whether this agent can use the built-in web_fetch tool. |
| `web_search_enabled` | `boolean` | Whether this agent can use the built-in web_search tool. |
| `workspace` | `Record<string, any>` |  |


### ApiUpdateAnthropicApiKeyOutput

Create an instance: `const api_update_anthropic_api_key_output = client.ApiUpdateAnthropicApiKeyOutput()`

#### Operations

| Method | Description |
| --- | --- |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `api_key` | `string` | Anthropic API key |
| `api_key_uuid` | `string` | API key ID |
| `created_at` | `string` | Key creation date |
| `created_by` | `string` | Created by user id from DO |
| `deleted_at` | `string` | Key deleted date |
| `name` | `string` | Name |
| `updated_at` | `string` | Key last updated date |
| `uuid` | `string` | Uuid |


### ApiUpdateCustomEvaluationMetricOutput

Create an instance: `const api_update_custom_evaluation_metric_output = client.ApiUpdateCustomEvaluationMetricOutput()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `associated_presets` | `any[]` | Saved model evaluation presets that reference this metric. |
| `category` | `string` |  |
| `config` | `Record<string, any>` | Configuration for a custom model-evaluation metric scored by an LLM judge. |
| `custom_eval_config` | `Record<string, any>` | Configuration for a custom model-evaluation metric scored by an LLM judge. |
| `description` | `string` |  |
| `evaluation_scope` | `string` | Scope that determines whether a metric belongs to agent evaluation or model evaluation. |
| `inverted` | `boolean` | If true, the metric is inverted, meaning that a lower value is better. |
| `is_metric_goal` | `boolean` |  |
| `metric_name` | `string` |  |
| `metric_rank` | `number` |  |
| `metric_type` | `string` |  |
| `metric_uuid` | `string` |  |
| `metric_value_type` | `string` |  |
| `range_max` | `number` | The maximum value for the metric. |
| `range_min` | `number` | The minimum value for the metric. |
| `source` | `string` | Distinguishes platform catalog metrics from user-defined LLM-as-judge metrics. |

#### Example: Create

```ts
const api_update_custom_evaluation_metric_output = await client.ApiUpdateCustomEvaluationMetricOutput().create({
})
```


### ApiUpdateEvaluationTestCaseOutput

Create an instance: `const api_update_evaluation_test_case_output = client.ApiUpdateEvaluationTestCaseOutput()`

#### Operations

| Method | Description |
| --- | --- |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `dataset_uuid` | `string` | Dataset against which the test‑case is executed. |
| `description` | `string` | Description of the test case. |
| `metrics` | `Record<string, any>` |  |
| `name` | `string` | Name of the test case. |
| `star_metric` | `Record<string, any>` |  |
| `test_case_uuid` | `string` | Test-case UUID to update |
| `version` | `number` | The new verson of the test case. |


### ApiUpdateKnowledgeBaseDataSourceOutput

Create an instance: `const api_update_knowledge_base_data_source_output = client.ApiUpdateKnowledgeBaseDataSourceOutput()`

#### Operations

| Method | Description |
| --- | --- |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `aws_data_source` | `Record<string, any>` | AWS S3 Data Source for Display |
| `bucket_name` | `string` | Name of storage bucket - Deprecated, moved to data_source_details |
| `chunking_algorithm` | `string` |  |
| `chunking_options` | `Record<string, any>` |  |
| `created_at` | `string` | Creation date / time |
| `data_source_uuid` | `string` | Data Source ID (Path Parameter) |
| `dropbox_data_source` | `Record<string, any>` | Dropbox Data Source for Display |
| `file_upload_data_source` | `Record<string, any>` | File to upload as data source for knowledge base. |
| `google_drive_data_source` | `Record<string, any>` | Google Drive Data Source for Display |
| `item_path` | `string` | Path of folder or object in bucket - Deprecated, moved to data_source_details |
| `knowledge_base_uuid` | `string` | Knowledge Base ID (Path Parameter) |
| `last_datasource_indexing_job` | `Record<string, any>` |  |
| `region` | `string` | Region code - Deprecated, moved to data_source_details |
| `spaces_data_source` | `Record<string, any>` | Spaces Bucket Data Source |
| `updated_at` | `string` | Last modified |
| `uuid` | `string` | Unique id of knowledge base |
| `web_crawler_data_source` | `Record<string, any>` | WebCrawlerDataSource |


### ApiUpdateKnowledgeBaseOutput

Create an instance: `const api_update_knowledge_base_output = client.ApiUpdateKnowledgeBaseOutput()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `added_to_agent_at` | `string` | Time when the knowledge base was added to the agent |
| `created_at` | `string` | Creation date / time |
| `database_id` | `string` | Identifier of the DigitalOcean OpenSearch database this knowledge base will use, optional. |
| `datasources` | `any[]` | Optional data sources to attach at creation. |
| `embedding_model_uuid` | `string` | Identifier for the [embedding model](https://docs.digitalocean.com/products/genai-platform/details/models/#embedding-models). |
| `is_public` | `boolean` | Whether the knowledge base is public or not |
| `last_indexing_job` | `Record<string, any>` | IndexingJob description |
| `name` | `string` | Name of knowledge base |
| `project_id` | `string` | Identifier of the DigitalOcean project this knowledge base will belong to. |
| `region` | `string` | Region code |
| `reranking_config` | `Record<string, any>` | Configuration for cross-encoder reranking during retrieval. |
| `size` | `string` |  |
| `tags` | `any[]` | Tags to organize related resources |
| `updated_at` | `string` | Last modified |
| `user_id` | `string` | Id of user that created the knowledge base |
| `uuid` | `string` | Unique id for knowledge base |
| `vpc_uuid` | `string` | The VPC to deploy the knowledge base database in |

#### Example: List

```ts
const api_update_knowledge_base_outputs = await client.ApiUpdateKnowledgeBaseOutput().list()
```

#### Example: Create

```ts
const api_update_knowledge_base_output = await client.ApiUpdateKnowledgeBaseOutput().create({
})
```


### ApiUpdateLinkedAgentOutput

Create an instance: `const api_update_linked_agent_output = client.ApiUpdateLinkedAgentOutput()`

#### Operations

| Method | Description |
| --- | --- |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `child_agent_uuid` | `string` | Routed agent id |
| `if_case` | `string` | Describes the case in which the child agent should be used |
| `parent_agent_uuid` | `string` | A unique identifier for the parent agent. |
| `rollback` | `boolean` |  |
| `route_name` | `string` | Route name |
| `uuid` | `string` | Unique id of linkage |


### ApiUpdateModelApiKeyOutput

Create an instance: `const api_update_model_api_key_output = client.ApiUpdateModelApiKeyOutput()`

#### Operations

| Method | Description |
| --- | --- |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `api_key_uuid` | `string` | API key ID |
| `created_at` | `string` | Creation date |
| `created_by` | `string` | Created by |
| `deleted_at` | `string` | Deleted date |
| `name` | `string` | Name |
| `secret_key` | `string` |  |
| `uuid` | `string` | Uuid |


### ApiUpdateModelEvaluationRunOutput

Create an instance: `const api_update_model_evaluation_run_output = client.ApiUpdateModelEvaluationRunOutput()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `candidate_inference_config` | `Record<string, any>` | Inference configuration for the candidate model during evaluation. |
| `candidate_model_name` | `string` | Model slug used to call the candidate model API. |
| `candidate_model_source` | `string` | Whether the candidate is a served model (serverless platform, a dedicated deployment, or a model router) or an OHS-hosted agent config. |
| `candidate_model_uuid` | `string` | UUID of the candidate model to evaluate. |
| `created_at` | `string` | Timestamp when the run was created. |
| `dataset_name` | `string` | Name of the dataset used for evaluation. |
| `dataset_uuid` | `string` | UUID of the dataset to use for evaluation. |
| `epochs` | `number` | Number of times to evaluate each dataset row (n-pass/epochs), so the result reports avg@k/pass@k/cons@k instead of a single score. |
| `eval_preset_uuid` | `string` |  |
| `eval_run_uuid` | `string` | UUID of the created evaluation run. |
| `judge_model_name` | `string` |  |
| `judge_model_uuid` | `string` | UUID of the judge model used to score responses. |
| `metric_uuids` | `any[]` | UUIDs of metrics to evaluate (selected from ListModelEvaluationMetrics). |
| `name` | `string` | Name of the evaluation run. |
| `preset_name` | `string` |  |
| `preset_save_sections` | `any[]` | Which sections of this run's resolved configuration to persist as a reusable preset. |
| `progress` | `Record<string, any>` | Per-phase progress for a model evaluation run. |
| `save_as_preset` | `boolean` | Deprecated: use `preset_save_sections`. |
| `source` | `string` | Source of the run creation (api, sdk, cli). |
| `star_metric` | `Record<string, any>` |  |
| `status` | `string` | Model Evaluation Run Statuses |

#### Example: List

```ts
const api_update_model_evaluation_run_outputs = await client.ApiUpdateModelEvaluationRunOutput().list()
```

#### Example: Create

```ts
const api_update_model_evaluation_run_output = await client.ApiUpdateModelEvaluationRunOutput().create({
})
```


### ApiUpdateModelRouterOutput

Create an instance: `const api_update_model_router_output = client.ApiUpdateModelRouterOutput()`

#### Operations

| Method | Description |
| --- | --- |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `config` | `Record<string, any>` |  |
| `created_at` | `string` | Creation date / time |
| `description` | `string` | Description |
| `fallback_models` | `any[]` |  |
| `name` | `string` | Name of the model router |
| `policies` | `any[]` | Router policies |
| `regions` | `any[]` | Target regions for the router |
| `updated_at` | `string` | Last modified |
| `uuid` | `string` | Unique id |


### ApiUpdateOpenAiapiKeyOutput

Create an instance: `const api_update_open_aiapi_key_output = client.ApiUpdateOpenAiapiKeyOutput()`

#### Operations

| Method | Description |
| --- | --- |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `api_key` | `string` | OpenAI API key |
| `api_key_uuid` | `string` | API key ID |
| `created_at` | `string` | Key creation date |
| `created_by` | `string` | Created by user id from DO |
| `deleted_at` | `string` | Key deleted date |
| `models` | `any[]` | Models supported by the openAI api key |
| `name` | `string` | Name |
| `updated_at` | `string` | Key last updated date |
| `uuid` | `string` | Uuid |


### ApiUpdateScenarioSetOutput

Create an instance: `const api_update_scenario_set_output = client.ApiUpdateScenarioSetOutput()`

#### Operations

| Method | Description |
| --- | --- |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `bucket_name` | `string` | Object storage bucket holding the scenario file. |
| `bucket_region` | `string` | Object storage bucket region. |
| `created_at` | `string` | Time created at. |
| `deleted_at` | `string` | Time deleted at. |
| `description` | `string` | Customer-supplied description. |
| `failure_reason` | `string` | Human-readable explanation of a terminal FAILED status. |
| `generator_model_uuid` | `string` | Model that produced the scenarios. |
| `library_scenario_uuid` | `string` | UUID of the source library entry. |
| `name` | `string` | Customer-supplied name. |
| `scenario_count` | `number` | Number of scenarios in the set. |
| `scenario_set_uuid` | `string` | UUID of the scenario set. |
| `scenarios` | `any[]` | Optional inline scenarios to replace the set contents. |
| `source_export_id` | `string` | Signals export UUID that produced this set. |
| `source_goal_description` | `string` | The goal that drove generation. |
| `source_kind` | `string` | How a scenario set was created. |
| `spaces_key` | `string` | Object storage key for the scenario file. |
| `status` | `string` | Lifecycle status of a scenario set. |
| `updated_at` | `string` | Time last updated at. |
| `workflow_uuid` | `string` | Identifier of the generation workflow. |


### ApiUpdateSimulationRunOutput

Create an instance: `const api_update_simulation_run_output = client.ApiUpdateSimulationRunOutput()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `agent_config` | `Record<string, any>` | Configuration of the candidate agent under test for a simulation run. |
| `created_at` | `string` | Time created at. |
| `created_by_user_email` | `string` | Email of the user who triggered this run. |
| `created_by_user_id` | `string` | User id of the actor who triggered this run. |
| `deleted_at` | `string` | Time deleted at. |
| `evaluation_config` | `Record<string, any>` | Optional configuration that opts a simulation run into an evaluation. |
| `evaluation_run_uuid` | `string` | UUID of the evaluation run reserved for this simulation, when the create request included evaluation_config. |
| `exploration_budget` | `number` | Optional run-level journeys-per-scenario override. |
| `failure_reason` | `string` | Human-readable explanation of a terminal FAILED status. |
| `journeys_finished` | `number` | Number of journeys that have finished (successfully or not). |
| `judge_model_name` | `string` | Display name of the judge model (from the model catalog). |
| `judge_model_uuid` | `string` | Model used by the judge. |
| `max_turns` | `number` | Optional run-level turn budget. |
| `name` | `string` | Optional run name. |
| `result_summary` | `Record<string, any>` | Aggregated final result of a simulation run: verdict counts plus token and duration totals. |
| `run_uuid` | `string` | UUID of the run. |
| `scenario_count` | `number` | Number of scenarios in the scenario set for this run. |
| `scenario_set_uuid` | `string` | UUID of the scenario set being executed (must exist at run create). |
| `status` | `string` | Lifecycle status of a simulation run. |
| `total_journeys` | `number` | Total number of journeys (sum of exploration budgets). |
| `updated_at` | `string` | Time last updated at. |
| `user_simulator_config` | `Record<string, any>` | Optional user simulator model settings such as temperature and max_tokens. |
| `user_simulator_model_name` | `string` | Display name of the user simulator model (from the model catalog). |
| `user_simulator_model_uuid` | `string` | Model used by the user simulator. |
| `workflow_uuid` | `string` | Identifier of the workflow executing this run. |

#### Example: List

```ts
const api_update_simulation_run_outputs = await client.ApiUpdateSimulationRunOutput().list()
```

#### Example: Create

```ts
const api_update_simulation_run_output = await client.ApiUpdateSimulationRunOutput().create({
})
```


### ApiUpdateWorkspaceOutput

Create an instance: `const api_update_workspace_output = client.ApiUpdateWorkspaceOutput()`

#### Operations

| Method | Description |
| --- | --- |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `agents` | `any[]` | Agents |
| `created_at` | `string` | Creation date |
| `created_by` | `string` | The id of user who created this workspace |
| `created_by_email` | `string` | The email of the user who created this workspace |
| `deleted_at` | `string` | Deleted date |
| `description` | `string` | Description of the workspace |
| `evaluation_test_cases` | `any[]` | Evaluations |
| `name` | `string` | Name of the workspace |
| `updated_at` | `string` | Update date |
| `uuid` | `string` | Unique id |
| `workspace_uuid` | `string` | Workspace UUID. |


### App

Create an instance: `const app = client.App()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `active_deployment` | `Record<string, any>` |  |
| `autoscaling` | `Record<string, any>` | Autoscaling event details. |
| `created_at` | `string` |  |
| `dedicated_ips` | `any[]` |  |
| `default_ingress` | `string` |  |
| `deployment` | `Record<string, any>` |  |
| `deployment_id` | `string` | For deployment events, this is the same as the deployment's ID. |
| `domains` | `any[]` |  |
| `id` | `string` |  |
| `in_progress_deployment` | `Record<string, any>` |  |
| `last_deployment_created_at` | `string` |  |
| `live_domain` | `string` |  |
| `live_url` | `string` |  |
| `live_url_base` | `string` |  |
| `owner_uuid` | `string` |  |
| `pending_deployment` | `any` |  |
| `pinned_deployment` | `any` |  |
| `project_id` | `string` | Requires `project:read` scope. |
| `region` | `Record<string, any>` |  |
| `spec` | `Record<string, any>` | The desired configuration of an application. |
| `tier_slug` | `string` |  |
| `type` | `string` | The type of event |
| `update_all_source_versions` | `boolean` | Whether or not to update the source versions (for example fetching a new commit or image digest) of all components. |
| `updated_at` | `string` |  |
| `vpc` | `Record<string, any>` |  |

#### Example: Load

```ts
const app = await client.App().load({ id: 'app_id' })
```

#### Example: List

```ts
const apps = await client.App().list()
```

#### Example: Create

```ts
const app = await client.App().create({
  spec: {},
})
```


### AppAlert

Create an instance: `const app_alert = client.AppAlert()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `component_name` | `string` |  |
| `emails` | `any[]` |  |
| `id` | `string` |  |
| `phase` | `string` |  |
| `progress` | `Record<string, any>` |  |
| `slack_webhooks` | `any[]` |  |
| `spec` | `Record<string, any>` |  |

#### Example: List

```ts
const app_alerts = await client.AppAlert().list({ id: "example" })
```

#### Example: Create

```ts
const app_alert = await client.AppAlert().create({
  alert_id: 'example_alert_id',
  app_id: 'example_app_id',
})
```


### AppEvent

Create an instance: `const app_event = client.AppEvent()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `autoscaling` | `Record<string, any>` | Autoscaling event details. |
| `created_at` | `string` |  |
| `deployment` | `Record<string, any>` |  |
| `deployment_id` | `string` | For deployment events, this is the same as the deployment's ID. |
| `id` | `string` |  |
| `type` | `string` | The type of event |

#### Example: List

```ts
const app_events = await client.AppEvent().list({ id: "example" })
```


### AppHealth

Create an instance: `const app_health = client.AppHealth()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `components` | `any[]` |  |
| `functions_components` | `any[]` |  |
| `id` | `string` |  |

#### Example: Load

```ts
const app_health = await client.AppHealth().load({ id: 'app_health_id' })
```


### AppInstance

Create an instance: `const app_instance = client.AppInstance()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `component_name` | `string` | Name of the component, from the app spec. |
| `component_type` | `string` | Supported compute component by DigitalOcean App Platform. |
| `id` | `string` |  |
| `instance_alias` | `string` | Readable identifier, an alias of the instance name, reference for mapping insights to instance names. |
| `instance_name` | `string` | Name of the instance, which is a unique identifier for the instance. |

#### Example: List

```ts
const app_instances = await client.AppInstance().list({ id: "example" })
```


### AppJobInvocation

Create an instance: `const app_job_invocation = client.AppJobInvocation()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `completed_at` | `string` |  |
| `created_at` | `string` |  |
| `deployment_id` | `string` |  |
| `id` | `string` |  |
| `job_name` | `string` |  |
| `phase` | `string` | The phase of the job invocation |
| `started_at` | `string` |  |
| `trigger` | `Record<string, any>` |  |

#### Example: Load

```ts
const app_job_invocation = await client.AppJobInvocation().load({ id: 'app_job_invocation_id', app_id: 'app_id' })
```

#### Example: List

```ts
const app_job_invocations = await client.AppJobInvocation().list({ id: "example_id" })
```

#### Example: Create

```ts
const app_job_invocation = await client.AppJobInvocation().create({
  app_id: 'example_app_id',
  job_invocation_id: 'example_job_invocation_id',
})
```


### AppMetricsBandwidthUsage

Create an instance: `const app_metrics_bandwidth_usage = client.AppMetricsBandwidthUsage()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `app_bandwidth_usage` | `any[]` | A list of bandwidth usage details by app. |
| `app_id` | `string` | The ID of the app. |
| `app_ids` | `any[]` | A list of app IDs to query bandwidth metrics for. |
| `bandwidth_bytes` | `string` | The used bandwidth amount in bytes. |
| `date` | `string` | The date for the metrics data. |

#### Example: List

```ts
const app_metrics_bandwidth_usages = await client.AppMetricsBandwidthUsage().list({ app_id: "example" })
```

#### Example: Create

```ts
const app_metrics_bandwidth_usage = await client.AppMetricsBandwidthUsage().create({
  app_ids: [],
})
```


### AppPropose

Create an instance: `const app_propose = client.AppPropose()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `app_cost` | `number` | The monthly cost of the proposed app in USD. |
| `app_id` | `string` | An optional ID of an existing app. |
| `app_is_static` | `boolean` | Indicates whether the app is a static app. |
| `app_name_available` | `boolean` | Indicates whether the app name is available. |
| `app_name_suggestion` | `string` | The suggested name if the proposed app name is unavailable. |
| `app_tier_downgrade_cost` | `number` | The monthly cost of the proposed app in USD using the previous pricing plan tier. |
| `existing_static_apps` | `string` | The maximum number of free static apps the account can have. |
| `spec` | `Record<string, any>` | The desired configuration of an application. |

#### Example: Create

```ts
const app_propose = await client.AppPropose().create({
  spec: {},
})
```


### AppsDeployment

Create an instance: `const apps_deployment = client.AppsDeployment()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `cause` | `string` |  |
| `cloned_from` | `string` |  |
| `components` | `any[]` |  |
| `created_at` | `string` |  |
| `deployment_id` | `string` | The ID of the deployment to rollback to. |
| `force_build` | `boolean` |  |
| `functions` | `any[]` |  |
| `id` | `string` |  |
| `jobs` | `any[]` |  |
| `phase` | `string` |  |
| `phase_last_updated_at` | `string` |  |
| `progress` | `Record<string, any>` |  |
| `services` | `any[]` |  |
| `skip_pin` | `boolean` | Whether to skip pinning the rollback deployment. |
| `spec` | `Record<string, any>` | The desired configuration of an application. |
| `static_sites` | `any[]` |  |
| `tier_slug` | `string` |  |
| `updated_at` | `string` |  |
| `workers` | `any[]` |  |

#### Example: Load

```ts
const apps_deployment = await client.AppsDeployment().load({ id: 'apps_deployment_id', app_id: 'app_id' })
```

#### Example: List

```ts
const apps_deployments = await client.AppsDeployment().list({ app_id: "example" })
```

#### Example: Create

```ts
const apps_deployment = await client.AppsDeployment().create({
  app_id: 'example_app_id',
  spec: {},
})
```


### AppsGetExec

Create an instance: `const apps_get_exec = client.AppsGetExec()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `url` | `string` | A websocket URL that allows sending/receiving console input and receiving console output. |

#### Example: Load

```ts
const apps_get_exec = await client.AppsGetExec().load({ app_id: 'app_id', component_name: 'component_name' })
```


### AppsGetLog

Create an instance: `const apps_get_log = client.AppsGetLog()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `historic_urls` | `any[]` |  |
| `live_url` | `string` | A URL of the real-time live logs. |

#### Example: List

```ts
const apps_get_logs = await client.AppsGetLog().list({ app_id: "example", type: "example" })
```


### AppsInstanceSize

Create an instance: `const apps_instance_size = client.AppsInstanceSize()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `bandwidth_allowance_gib` | `string` |  |
| `cpu_type` | `string` |  |
| `cpus` | `string` |  |
| `deprecation_intent` | `boolean` |  |
| `id` | `string` |  |
| `memory_bytes` | `string` |  |
| `name` | `string` |  |
| `scalable` | `boolean` |  |
| `single_instance_only` | `boolean` |  |
| `slug` | `string` |  |
| `tier_downgrade_to` | `string` |  |
| `tier_slug` | `string` |  |
| `tier_upgrade_to` | `string` |  |
| `usd_per_month` | `string` |  |
| `usd_per_second` | `string` |  |

#### Example: Load

```ts
const apps_instance_size = await client.AppsInstanceSize().load({ id: 'apps_instance_size_id' })
```

#### Example: List

```ts
const apps_instance_sizes = await client.AppsInstanceSize().list()
```


### AppsRegion

Create an instance: `const apps_region = client.AppsRegion()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `continent` | `string` |  |
| `data_centers` | `any[]` |  |
| `default` | `boolean` | Whether or not the region is presented as the default. |
| `disabled` | `boolean` |  |
| `flag` | `string` |  |
| `label` | `string` |  |
| `reason` | `string` |  |
| `slug` | `string` |  |

#### Example: List

```ts
const apps_regions = await client.AppsRegion().list()
```


### AssociatedKubernetesResource

Create an instance: `const associated_kubernetes_resource = client.AssociatedKubernetesResource()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `load_balancers` | `any[]` | A list of names and IDs for associated load balancers that can be destroyed along with the cluster. |
| `volume_snapshots` | `any[]` | A list of names and IDs for associated volume snapshots that can be destroyed along with the cluster. |
| `volumes` | `any[]` | A list of names and IDs for associated volumes that can be destroyed along with the cluster. |

#### Example: List

```ts
const associated_kubernetes_resources = await client.AssociatedKubernetesResource().list({ cluster_id: "example" })
```


### AssociatedResourceStatus

Create an instance: `const associated_resource_status = client.AssociatedResourceStatus()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `completed_at` | `string` | A time value given in ISO8601 combined date and time format indicating when the requested action was completed. |
| `droplet` | `Record<string, any>` | An object containing information about a resource scheduled for deletion. |
| `failures` | `number` | A count of the associated resources that failed to be destroyed, if any. |
| `resources` | `Record<string, any>` | An object containing additional information about resource related to a Droplet requested to be destroyed. |

#### Example: Load

```ts
const associated_resource_status = await client.AssociatedResourceStatus().load({ droplet_id: 1 })
```


### AsyncInvoke

Create an instance: `const async_invoke = client.AsyncInvoke()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `completed_at` | `string` | The timestamp when the job completed. |
| `created_at` | `string` | The timestamp when the request was created. |
| `error` | `string` | Error message if the job failed. |
| `input` | `Record<string, any>` | The input parameters for the model invocation. |
| `model_id` | `string` | The model ID that was invoked. |
| `output` | `Record<string, any>` | The output of the invocation. |
| `request_id` | `string` | A unique identifier for the async invocation request. |
| `started_at` | `string` | The timestamp when the job started processing. |
| `status` | `string` | The current status of the async invocation. |
| `tags` | `any[]` | An optional list of key-value tags to attach to the invocation request for tracking or categorization. |

#### Example: Create

```ts
const async_invoke = await client.AsyncInvoke().create({
  created_at: 'example_created_at',
  input: {},
  model_id: 'example_model_id',
  request_id: 'example_request_id',
  status: 'example_status',
})
```


### Balance

Create an instance: `const balance = client.Balance()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `account_balance` | `string` | Current balance of the customer's most recent billing activity. |
| `generated_at` | `string` | The time at which balances were most recently generated. |
| `month_to_date_balance` | `string` | Balance as of the `generated_at` time. |
| `month_to_date_usage` | `string` | Amount used in the current billing period as of the `generated_at` time. |

#### Example: Load

```ts
const balance = await client.Balance().load()
```


### Batch

Create an instance: `const batch = client.Batch()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `batch_id` | `string` | Unique identifier for the batch job. |
| `cancelled_at` | `string` |  |
| `completed_at` | `string` |  |
| `completion_window` | `string` | Time window in which the job must complete. |
| `created_at` | `string` |  |
| `endpoint` | `string` | Inference endpoint each request is dispatched to. |
| `error_file_id` | `string` | Error sidecar file. |
| `errors` | `any[]` | Top-level errors that prevented the batch from completing. |
| `expires_at` | `string` | Derived from `created_at` plus `completion_window`. |
| `failed_at` | `string` |  |
| `file_id` | `string` | The `file_id` returned by `POST /v1/batches/files`. |
| `finalizing_at` | `string` |  |
| `id` | `string` |  |
| `in_progress_at` | `string` |  |
| `input_file_id` | `string` | The uploaded JSONL input file. |
| `metadata` | `Record<string, any>` | Metadata attached at creation. |
| `output_file_id` | `string` | Output JSONL file. |
| `provider` | `string` | The inference provider whose JSONL schema the input file conforms to. |
| `request_counts` | `Record<string, any>` | Aggregate request counts. |
| `request_id` | `string` | The idempotency key supplied at creation. |
| `status` | `string` | Lifecycle status. |

#### Example: Load

```ts
const batch = await client.Batch().load({ id: 'batch_id' })
```

#### Example: List

```ts
const batchs = await client.Batch().list()
```

#### Example: Create

```ts
const batch = await client.Batch().create({
  batch_id: 'example_batch_id',
  completion_window: 'example_completion_window',
  created_at: 'example_created_at',
  file_id: 'example_file_id',
  input_file_id: 'example_input_file_id',
  provider: 'example_provider',
  status: 'example_status',
})
```


### BatchFileCreate

Create an instance: `const batch_file_create = client.BatchFileCreate()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `file_name` | `string` | The file you plan to upload. |

#### Example: Create

```ts
const batch_file_create = await client.BatchFileCreate().create({
  file_name: 'example_file_name',
})
```


### BatchInference

Create an instance: `const batch_inference = client.BatchInference()`

#### Operations

| Method | Description |
| --- | --- |
| `update(data)` | Update an existing entity. |


### BatchResult

Create an instance: `const batch_result = client.BatchResult()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `batch_id` | `string` |  |
| `error_file_url` | `string` | Presigned URL for the error sidecar JSONL, if any. |
| `expires_at` | `string` | When the presigned URLs expire. |
| `id` | `string` |  |
| `output_file_url` | `string` | Presigned URL for the main results JSONL. |
| `result_available` | `boolean` | When `false`, keep polling batch status and retry later. |

#### Example: Load

```ts
const batch_result = await client.BatchResult().load({ id: 'batch_result_id' })
```


### Billing

Create an instance: `const billing = client.Billing()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `amount` | `string` | Amount of the billing history entry. |
| `current_page` | `number` | Current page number |
| `data_points` | `any[]` | Array of billing data points, which are day-over-day changes in billing resource usage based on nightly invoice item estimates, for the requested period |
| `date` | `string` | Time the billing history entry occurred. |
| `description` | `string` | Description of the billing history entry. |
| `id` | `string` |  |
| `invoice_id` | `string` | ID of the invoice associated with the billing history entry, if applicable. |
| `invoice_items` | `any[]` |  |
| `invoice_period` | `string` | Billing period of usage for which the invoice is issued, in `YYYY-MM` format. |
| `invoice_uuid` | `string` | UUID of the invoice associated with the billing history entry, if applicable. |
| `links` | `Record<string, any>` |  |
| `meta` | `any` |  |
| `total_items` | `number` | Total number of items available across all pages |
| `total_pages` | `number` | Total number of pages available |
| `type` | `string` | Type of billing history entry. |
| `updated_at` | `string` | Time the invoice was last updated. |

#### Example: Load

```ts
const billing = await client.Billing().load({ invoice_uuid: 'invoice_uuid' })
```

#### Example: List

```ts
const billings = await client.Billing().list()
```


### BlockStorage

Create an instance: `const block_storage = client.BlockStorage()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `created_at` | `string` | A time value given in ISO8601 combined date and time format that represents when the snapshot was created. |
| `description` | `string` | An optional free-form text field to describe a block storage volume. |
| `droplet_ids` | `any[]` | An array containing the IDs of the Droplets the volume is attached to. |
| `filesystem_label` | `string` | The label currently applied to the filesystem. |
| `filesystem_type` | `string` | The type of filesystem currently in-use on the volume. |
| `id` | `string` | The unique identifier for the snapshot. |
| `min_disk_size` | `number` | The minimum size in GB required for a volume or Droplet to use this snapshot. |
| `name` | `string` | A human-readable name for the snapshot. |
| `region` | `any` |  |
| `regions` | `any[]` | An array of the regions that the snapshot is available in. |
| `resource_id` | `string` | The unique identifier for the resource that the snapshot originated from. |
| `resource_type` | `string` | The type of resource that the snapshot originated from. |
| `size_gigabytes` | `number` | The billable size of the snapshot in gigabytes. |
| `tags` | `any[]` | An array of Tags the snapshot has been tagged with.<br><br>Requires `tag:read` scope. |
| `volume` | `Record<string, any>` |  |

#### Example: Load

```ts
const block_storage = await client.BlockStorage().load({ volume_id: 'volume_id' })
```

#### Example: List

```ts
const block_storages = await client.BlockStorage().list()
```

#### Example: Create

```ts
const block_storage = await client.BlockStorage().create({
  created_at: 'example_created_at',
  id: 'example_id',
  min_disk_size: 1,
  name: 'example_name',
  regions: [],
  resource_id: 'example_resource_id',
  resource_type: 'example_resource_type',
  size_gigabytes: 1,
  tags: [],
})
```


### BlockStorageAction

Create an instance: `const block_storage_action = client.BlockStorageAction()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `completed_at` | `string` | A time value given in ISO8601 combined date and time format that represents when the action was completed. |
| `id` | `number` | A unique numeric ID that can be used to identify and reference an action. |
| `region` | `Record<string, any>` |  |
| `region_slug` | `string` | A human-readable string that is used as a unique identifier for each region. |
| `resource_id` | `number` | A unique identifier for the resource that the action is associated with. |
| `resource_type` | `string` | The type of resource that the action is associated with. |
| `started_at` | `string` | A time value given in ISO8601 combined date and time format that represents when the action was initiated. |
| `status` | `string` | The current status of the action. |
| `type` | `string` | This is the type of action that the object represents. |

#### Example: Load

```ts
const block_storage_action = await client.BlockStorageAction().load({ id: 1, volume_id: 'volume_id' })
```

#### Example: List

```ts
const block_storage_actions = await client.BlockStorageAction().list({ volume_id: "example" })
```

#### Example: Create

```ts
const block_storage_action = await client.BlockStorageAction().create({
  region: {},
})
```


### ByoipPrefix

Create an instance: `const byoip_prefix = client.ByoipPrefix()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `advertise` | `boolean` | Whether the BYOIP prefix should be advertised |
| `advertised` | `boolean` | Whether the BYOIP prefix is being advertised |
| `failure_reason` | `string` | Reason for failure, if applicable |
| `id` | `string` |  |
| `locked` | `boolean` | Whether the BYOIP prefix is locked |
| `name` | `string` | Name of the BYOIP prefix |
| `prefix` | `string` | The IP prefix in CIDR notation |
| `project_id` | `string` | The ID of the project associated with the BYOIP prefix |
| `region` | `string` | Region where the BYOIP prefix is located |
| `signature` | `string` | The signature hash for the prefix creation request |
| `status` | `string` | Status of the BYOIP prefix |
| `uuid` | `string` | Unique identifier for the BYOIP prefix |
| `validations` | `any[]` | List of validation statuses for the BYOIP prefix |

#### Example: Load

```ts
const byoip_prefix = await client.ByoipPrefix().load({ id: 'byoip_prefix_id' })
```

#### Example: List

```ts
const byoip_prefixs = await client.ByoipPrefix().list()
```

#### Example: Create

```ts
const byoip_prefix = await client.ByoipPrefix().create({
  signature: 'example_signature',
})
```


### CdnEndpoint

Create an instance: `const cdn_endpoint = client.CdnEndpoint()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `certificate_id` | `string` | The ID of a DigitalOcean managed TLS certificate used for SSL when a custom subdomain is provided. |
| `created_at` | `string` | A time value given in ISO8601 combined date and time format that represents when the CDN endpoint was created. |
| `custom_domain` | `string` | The fully qualified domain name (FQDN) of the custom subdomain used with the CDN endpoint. |
| `endpoint` | `string` | The fully qualified domain name (FQDN) from which the CDN-backed content is served. |
| `id` | `string` | A unique ID that can be used to identify and reference a CDN endpoint. |
| `origin` | `string` | The fully qualified domain name (FQDN) for the origin server which provides the content for the CDN. |
| `ttl` | `number` | The amount of time the content is cached by the CDN's edge servers in seconds. |

#### Example: Load

```ts
const cdn_endpoint = await client.CdnEndpoint().load({ id: 'cdn_endpoint_id' })
```

#### Example: List

```ts
const cdn_endpoints = await client.CdnEndpoint().list()
```

#### Example: Create

```ts
const cdn_endpoint = await client.CdnEndpoint().create({
  origin: 'example_origin',
})
```


### Certificate

Create an instance: `const certificate = client.Certificate()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `certificate` | `Record<string, any>` |  |
| `created_at` | `string` | A time value given in ISO8601 combined date and time format that represents when the certificate was created. |
| `dns_names` | `any[]` | An array of fully qualified domain names (FQDNs) for which the certificate was issued. |
| `id` | `string` | A unique ID that can be used to identify and reference a certificate. |
| `name` | `string` | A unique human-readable name referring to a certificate. |
| `not_after` | `string` | A time value given in ISO8601 combined date and time format that represents the certificate's expiration date. |
| `sha1_fingerprint` | `string` | A unique identifier generated from the SHA-1 fingerprint of the certificate. |
| `state` | `string` | A string representing the current state of the certificate. |
| `type` | `string` | A string representing the type of the certificate. |

#### Example: Load

```ts
const certificate = await client.Certificate().load({ id: 'certificate_id' })
```

#### Example: List

```ts
const certificates = await client.Certificate().list()
```

#### Example: Create

```ts
const certificate = await client.Certificate().create({
})
```


### ChatCompletion

Create an instance: `const chat_completion = client.ChatCompletion()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `choices` | `any[]` | A list of chat completion choices. |
| `created` | `number` | The Unix timestamp (in seconds) of when the chat completion was created. |
| `frequency_penalty` | `number` | Number between -2.0 and 2.0. |
| `id` | `string` | A unique identifier for the chat completion. |
| `logit_bias` | `Record<string, any>` | Modify the likelihood of specified tokens appearing in the completion. |
| `logprobs` | `boolean` | Whether to return log probabilities of the output tokens or not. |
| `max_completion_tokens` | `number` | The maximum number of completion tokens that may be used over the course of the run. |
| `max_tokens` | `number` | The maximum number of tokens that can be generated in the completion. |
| `messages` | `any[]` | A list of messages comprising the conversation so far. |
| `metadata` | `Record<string, any>` | Set of 16 key-value pairs that can be attached to an object. |
| `model` | `string` | The model used for the chat completion. |
| `n` | `number` | How many chat completion choices to generate for each input message. |
| `object` | `string` | The object type, which is always chat.completion. |
| `presence_penalty` | `number` | Number between -2.0 and 2.0. |
| `reasoning_effort` | `string` | Constrains effort on reasoning for reasoning models. |
| `seed` | `number` | If specified, the system will make a best effort to sample deterministically, such that repeated requests with the same seed and parameters should return the same result. |
| `stop` | `any` | Up to 4 sequences where the API will stop generating further tokens. |
| `stream` | `boolean` | If set to true, the model response data will be streamed to the client as it is generated using server-sent events. |
| `stream_options` | `Record<string, any>` | Options for streaming response. |
| `temperature` | `number` | What sampling temperature to use, between 0 and 2. |
| `tool_choice` | `any` | Controls which (if any) tool is called by the model. |
| `tools` | `any[]` | A list of tools the model may call. |
| `top_logprobs` | `number` | An integer between 0 and 20 specifying the number of most likely tokens to return at each token position, each with an associated log probability. |
| `top_p` | `number` | An alternative to sampling with temperature, called nucleus sampling, where the model considers the results of the tokens with top_p probability mass. |
| `usage` | `Record<string, any>` | Usage statistics for the completion request. |
| `user` | `string` | A unique identifier representing your end-user, which can help DigitalOcean to monitor and detect abuse. |

#### Example: Create

```ts
const chat_completion = await client.ChatCompletion().create({
  choices: [],
  created: 1,
  id: 'example_id',
  messages: [],
  model: 'example_model',
  object: 'example_object',
  usage: {},
})
```


### Clusterlint

Create an instance: `const clusterlint = client.Clusterlint()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `check_name` | `string` | The clusterlint check that resulted in the diagnostic. |
| `message` | `string` | Feedback about the object for users to fix. |
| `object` | `Record<string, any>` | Metadata about the Kubernetes API object the diagnostic is reported on. |
| `severity` | `string` | Can be one of error, warning or suggestion. |

#### Example: List

```ts
const clusterlints = await client.Clusterlint().list({ cluster_id: "example" })
```


### Connection

Create an instance: `const connection = client.Connection()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `api_key` | `Record<string, any>` | Set for `team_api_key` connections. |
| `authorization` | `any` | Present only while the connection is pending and you created it. |
| `connection` | `any` | The connection. |
| `connection_parameters` | `Record<string, any>` | Values for the provider's `connection_parameters`, validated against their specifications. |
| `created_at` | `string` | When the connection was created. |
| `credential` | `Record<string, any>` | Optional credential to connect through. |
| `credential_id` | `string` | Empty for `digitalocean_oauth`; otherwise the ID of the team provider credential the connection uses. |
| `credential_kind` | `string` | `digitalocean_oauth`, `private_oauth`, or `team_api_key`. |
| `granted_at` | `string` | Deprecated: read `oauth.granted_at`. |
| `id` | `string` | Opaque connection ID. |
| `network` | `Record<string, any>` | Optional private network for the connection's calls. |
| `oauth` | `Record<string, any>` | Set for `digitalocean_oauth` and `private_oauth` connections. |
| `owning_user_id` | `string` | DigitalOcean user ID of the user who created the connection, when recorded. |
| `provider` | `string` | Required provider slug, from the provider list. |
| `provider_display_name` | `string` | Human-readable provider name, for example `Jira`. |
| `revoked_at` | `string` | When the connection was revoked. |
| `scopes` | `any[]` | Optional OAuth scopes to request. |
| `status` | `string` | pending, active, revoked, or expired. |
| `updated_at` | `string` | When the connection was last modified. |
| `user_id` | `string` | Required. |

#### Example: Load

```ts
const connection = await client.Connection().load({ id: 'connection_id' })
```

#### Example: List

```ts
const connections = await client.Connection().list()
```

#### Example: Create

```ts
const connection = await client.Connection().create({
  provider: 'example_provider',
  user_id: 'example_user_id',
})
```


### ConnectionPool

Create an instance: `const connection_pool = client.ConnectionPool()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `connection` | `any` |  |
| `db` | `string` | The database for use with the connection pool. |
| `mode` | `string` | The PGBouncer transaction mode for the connection pool. |
| `name` | `string` | A unique name for the connection pool. |
| `private_connection` | `any` |  |
| `size` | `number` | The desired size of the PGBouncer connection pool. |
| `standby_connection` | `any` |  |
| `standby_private_connection` | `any` |  |
| `user` | `string` | The name of the user for use with the connection pool. |

#### Example: List

```ts
const connection_pools = await client.ConnectionPool().list({ database_id: "example" })
```


### ContainerRegistry

Create an instance: `const container_registry = client.ContainerRegistry()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `available_regions` | `any[]` |  |
| `blobs` | `any[]` | All blobs associated with this manifest |
| `blobs_deleted` | `number` | The number of blobs deleted as a result of this garbage collection. |
| `cancel` | `boolean` | A boolean value indicating that the garbage collection should be cancelled. |
| `compressed_size_bytes` | `number` | The compressed size of the manifest in bytes. |
| `created_at` | `string` | A time value given in ISO8601 combined date and time format that represents when the registry was created. |
| `digest` | `string` | The manifest digest |
| `freed_bytes` | `number` | The number of bytes freed as a result of this garbage collection. |
| `id` | `string` |  |
| `latest_manifest` | `Record<string, any>` |  |
| `latest_tag` | `Record<string, any>` |  |
| `manifest_count` | `number` | The number of manifests in the repository. |
| `manifest_digest` | `string` | The digest of the manifest associated with the tag. |
| `name` | `string` | A globally unique name for the container registry. |
| `region` | `string` | Slug of the region where registry data is stored |
| `registries` | `any[]` |  |
| `registry_name` | `string` | The name of the container registry. |
| `repository` | `string` | The name of the repository. |
| `size_bytes` | `number` | The uncompressed size of the manifest in bytes (this size is calculated asynchronously so it may not be immediately available). |
| `status` | `string` | The current status of this garbage collection. |
| `storage_usage_bytes` | `number` | The amount of storage used in the registry in bytes. |
| `storage_usage_bytes_updated_at` | `string` | The time at which the storage usage was updated. |
| `subscription` | `any` |  |
| `subscription_tier_slug` | `string` | The slug of the subscription tier to sign up for. |
| `subscription_tiers` | `any[]` |  |
| `tag` | `string` | The name of the tag. |
| `tag_count` | `number` | The number of tags in the repository. |
| `tags` | `any[]` | All tags associated with this manifest |
| `tier` | `Record<string, any>` |  |
| `tier_slug` | `string` | The slug of the subscription tier to sign up for. |
| `type` | `string` | Type of the garbage collection to run against this registry |
| `updated_at` | `string` | The time the garbage collection was last updated. |
| `uuid` | `string` | A string specifying the UUID of the garbage collection. |

#### Example: Load

```ts
const container_registry = await client.ContainerRegistry().load({ id: 'container_registry_id' })
```

#### Example: List

```ts
const container_registrys = await client.ContainerRegistry().list()
```

#### Example: Create

```ts
const container_registry = await client.ContainerRegistry().create({
})
```


### CreateResponse

Create an instance: `const create_response = client.CreateResponse()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `created` | `number` | The Unix timestamp (in seconds) of when the response was created. |
| `id` | `string` | A unique identifier for the response. |
| `input` | `any` | The prompt or input content you want the model to respond to. |
| `instructions` | `string` | System-level instructions for the model. |
| `max_output_tokens` | `number` | Maximum output tokens setting. |
| `metadata` | `Record<string, any>` | Set of key-value pairs that can be attached to the request. |
| `model` | `string` | The model used to generate the response. |
| `object` | `string` | The object type, which is always `response`. |
| `output` | `any[]` | An array of content items generated by the model. |
| `parallel_tool_calls` | `boolean` | Whether parallel tool calls are enabled. |
| `status` | `string` | Status of the response. |
| `stop` | `any` | Up to 4 sequences where the API will stop generating further tokens. |
| `stream` | `boolean` | Set to true to stream partial responses as Server-Sent Events. |
| `stream_options` | `Record<string, any>` | Options for streaming response. |
| `temperature` | `number` | Temperature setting used for the response. |
| `tool_choice` | `string` | Tool choice setting used for the response. |
| `tools` | `any[]` | Tools available for the response. |
| `top_p` | `number` | Top-p setting used for the response. |
| `usage` | `Record<string, any>` | Detailed usage statistics for the Responses API request, including input/output token counts and detailed breakdowns. |
| `user` | `string` | User identifier. |

#### Example: Create

```ts
const create_response = await client.CreateResponse().create({
  created: 1,
  id: 'example_id',
  input: 'example_input',
  model: 'example_model',
  object: 'example_object',
  output: [],
  usage: {},
})
```


### Credential

Create an instance: `const credential = client.Credential()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `certificate_authority_data` | `string` | A base64 encoding of bytes representing the certificate authority data for accessing the cluster. |
| `client_certificate_data` | `string` | A base64 encoding of bytes representing the x509 client certificate data for access the cluster. |
| `client_key_data` | `string` | A base64 encoding of bytes representing the x509 client key data for access the cluster. |
| `expires_at` | `string` | A time value given in ISO8601 combined date and time format that represents when the access token expires. |
| `server` | `string` | The URL used to access the cluster API server. |
| `token` | `string` | An access token used to authenticate with the cluster. |

#### Example: Load

```ts
const credential = await client.Credential().load({ cluster_id: 'cluster_id' })
```


### Database

Create an instance: `const database = client.Database()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `patch(data)` | Change part of an existing entity. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `access_cert` | `string` | Access certificate for TLS client authentication. |
| `access_key` | `string` | Access key for TLS client authentication. |
| `autoscale` | `any` | Autoscaling configuration for the database cluster. |
| `backup_restore` | `Record<string, any>` |  |
| `compatibility_level` | `string` | The compatibility level of the schema registry. |
| `config` | `Record<string, any>` |  |
| `connection` | `any` |  |
| `created_at` | `string` | A time value given in ISO8601 combined date and time format that represents when the database cluster was created. |
| `credentials` | `Record<string, any>` |  |
| `db` | `string` | The database for use with the connection pool. |
| `db_names` | `any[]` | An array of strings containing the names of databases created in the database cluster. |
| `do_settings` | `any` |  |
| `engine` | `string` | A slug representing the database engine used for the cluster. |
| `id` | `string` | A unique ID that can be used to identify and reference a database replica. |
| `maintenance_window` | `any` |  |
| `metrics_endpoints` | `any[]` | Public hostname and port of the cluster's metrics endpoint(s). |
| `mode` | `string` | The PGBouncer transaction mode for the connection pool. |
| `mysql_settings` | `Record<string, any>` |  |
| `name` | `string` | The name of the database. |
| `num_nodes` | `number` | The number of nodes in the database cluster. |
| `partition_count` | `number` | The number of partitions available for the topic. |
| `partitions` | `any[]` |  |
| `password` | `string` | A randomly generated password for the database user.<br>Requires `database:view_credentials` scope. |
| `private_connection` | `any` |  |
| `private_network_uuid` | `string` | A string specifying the UUID of the VPC to which the read-only replica will be assigned. |
| `project_id` | `string` | The ID of the project that the database cluster is assigned to. |
| `region` | `string` | A slug identifier for the region where the read-only replica will be located. |
| `replication_factor` | `number` | The number of nodes to replicate data across the cluster. |
| `role` | `string` | A string representing the database user's role. |
| `rules` | `any[]` |  |
| `schema` | `string` | The schema definition in the specified format. |
| `schema_id` | `number` | The id for schema. |
| `schema_registry_connection` | `any` | The connection details for Schema Registry. |
| `schema_type` | `string` | The type of the schema. |
| `semantic_version` | `string` | A string representing the semantic version of the database engine in use for the cluster. |
| `settings` | `Record<string, any>` | User settings that can be updated via the Update a Database User endpoint. |
| `size` | `number` | The desired size of the PGBouncer connection pool. |
| `standby_connection` | `any` |  |
| `standby_private_connection` | `any` |  |
| `state` | `string` | The state of the Kafka topic. |
| `status` | `string` | A string representing the current status of the database cluster. |
| `storage_size_mib` | `number` | Additional storage added to the cluster, in MiB. |
| `subject_name` | `string` | The name of the schema subject. |
| `tags` | `any[]` | A flat array of tag names as strings applied to the read-only replica.<br><br>Requires `tag:read` scope. |
| `ui_connection` | `any` | The connection details for OpenSearch dashboard. |
| `user` | `string` | The name of the user for use with the connection pool. |
| `users` | `any[]` |  |
| `version` | `string` | The version of the schema. |
| `version_end_of_availability` | `string` | A timestamp referring to the date when the particular version will no longer be available for creating new clusters. |
| `version_end_of_life` | `string` | A timestamp referring to the date when the particular version will no longer be supported. |

#### Example: Load

```ts
const database = await client.Database().load({ id: 'database_id' })
```

#### Example: List

```ts
const databases = await client.Database().list()
```

#### Example: Create

```ts
const database = await client.Database().create({
  backup_restore: {},
  compatibility_level: 'example_compatibility_level',
  db: 'example_db',
  engine: 'example_engine',
  mode: 'example_mode',
  mysql_settings: {},
  name: 'example_name',
  num_nodes: 1,
  schema: 'example_schema',
  schema_id: 1,
  schema_type: 'example_schema_type',
  size: 1,
  subject_name: 'example_subject_name',
  version: 'example_version',
})
```


### DedicatedInference

Create an instance: `const dedicated_inference = client.DedicatedInference()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `access_tokens` | `Record<string, any>` | Key-value pairs for provider tokens (e.g. |
| `created_at` | `string` | When the Dedicated Inference was created. |
| `dedicated_inference` | `Record<string, any>` | A Dedicated Inference instance. |
| `endpoints` | `Record<string, any>` |  |
| `id` | `string` | Unique ID of the Dedicated Inference. |
| `pending_deployment_spec` | `Record<string, any>` | Pending deployment when status is provisioning or updating. |
| `region` | `string` | DigitalOcean region where the Dedicated Inference is hosted. |
| `spec` | `Record<string, any>` | Structured configuration for a Dedicated Inference deployment. |
| `status` | `string` | Current state of the Dedicated Inference. |
| `token` | `Record<string, any>` | Access token for authenticating to Dedicated Inference endpoints. |
| `updated_at` | `string` | When the Dedicated Inference was last updated. |
| `vpc_uuid` | `string` | VPC UUID of the Dedicated Inference. |

#### Example: Load

```ts
const dedicated_inference = await client.DedicatedInference().load({ id: 'dedicated_inference_id' })
```

#### Example: List

```ts
const dedicated_inferences = await client.DedicatedInference().list()
```

#### Example: Create

```ts
const dedicated_inference = await client.DedicatedInference().create({
  spec: {},
})
```


### DedicatedInferenceAccelerator

Create an instance: `const dedicated_inference_accelerator = client.DedicatedInferenceAccelerator()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `created_at` | `string` |  |
| `id` | `string` | Unique ID of the accelerator. |
| `name` | `string` | Name of the accelerator. |
| `role` | `string` | Role of the accelerator (e.g. |
| `slug` | `string` | DigitalOcean GPU slug. |
| `status` | `string` | Status of the accelerator. |

#### Example: Load

```ts
const dedicated_inference_accelerator = await client.DedicatedInferenceAccelerator().load({ id: 'dedicated_inference_accelerator_id', dedicated_inference_id: 'dedicated_inference_id' })
```


### DedicatedInferenceGpuModelConfig

Create an instance: `const dedicated_inference_gpu_model_config = client.DedicatedInferenceGpuModelConfig()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `gpu_slugs` | `any[]` |  |
| `is_gated_model` | `boolean` | Whether the model requires gated access (e.g. |
| `model_name` | `string` |  |
| `model_slug` | `string` |  |

#### Example: List

```ts
const dedicated_inference_gpu_model_configs = await client.DedicatedInferenceGpuModelConfig().list()
```


### DedicatedInferenceSize

Create an instance: `const dedicated_inference_size = client.DedicatedInferenceSize()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `currency` | `string` |  |
| `gpu_slug` | `string` |  |
| `price_per_hour` | `string` |  |
| `region` | `string` |  |

#### Example: List

```ts
const dedicated_inference_sizes = await client.DedicatedInferenceSize().list()
```


### DockerCredential

Create an instance: `const docker_credential = client.DockerCredential()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `registry_digitalocean_com` | `Record<string, any>` |  |

#### Example: Load

```ts
const docker_credential = await client.DockerCredential().load()
```


### Domain

Create an instance: `const domain = client.Domain()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |
| `ip_address` | `string` | This optional attribute may contain an IP address. |
| `name` | `string` | The name of the domain itself. |
| `ttl` | `number` | This value is the time to live for the records on this domain, in seconds. |
| `zone_file` | `string` | This attribute contains the complete contents of the zone file for the selected domain. |

#### Example: Load

```ts
const domain = await client.Domain().load({ id: 'domain_id' })
```

#### Example: List

```ts
const domains = await client.Domain().list()
```

#### Example: Create

```ts
const domain = await client.Domain().create({
})
```


### DomainRecord

Create an instance: `const domain_record = client.DomainRecord()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `patch(data)` | Change part of an existing entity. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `data` | `string` | Variable data depending on record type. |
| `domain_record` | `Record<string, any>` |  |
| `flags` | `number` | An unsigned integer between 0-255 used for CAA records. |
| `id` | `number` | A unique identifier for each domain record. |
| `name` | `string` | The host name, alias, or service being defined by the record. |
| `port` | `number` | The port for SRV records. |
| `priority` | `number` | The priority for SRV and MX records. |
| `tag` | `string` | The parameter tag for CAA records. |
| `ttl` | `number` | This value is the time to live for the record, in seconds. |
| `type` | `string` | The type of the DNS record. |
| `weight` | `number` | The weight for SRV records. |

#### Example: Load

```ts
const domain_record = await client.DomainRecord().load({ id: 1, domain_name: 'domain_name' })
```

#### Example: List

```ts
const domain_records = await client.DomainRecord().list({ domain_name: "example" })
```

#### Example: Create

```ts
const domain_record = await client.DomainRecord().create({
  domain_name: 'example_domain_name',
  type: 'example_type',
})
```


### Droplet

Create an instance: `const droplet = client.Droplet()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `backup_ids` | `any[]` | An array of backup IDs of any backups that have been taken of the Droplet instance. |
| `created_at` | `string` | A time value given in ISO8601 combined date and time format that represents when the Droplet was created. |
| `disk` | `number` | The size of the Droplet's disk in gigabytes. |
| `disk_info` | `any[]` | An array of objects containing information about the disks available to the Droplet. |
| `droplet` | `Record<string, any>` |  |
| `features` | `any[]` | An array of features enabled on this Droplet. |
| `gpu_info` | `Record<string, any>` | An object containing information about the GPU capabilities of Droplets created with this size. |
| `id` | `number` | A unique identifier for each Droplet instance. |
| `image` | `any` |  |
| `kernel` | `Record<string, any>` | **Note**: All Droplets created after March 2017 use internal kernels by default. |
| `links` | `Record<string, any>` |  |
| `locked` | `boolean` | A boolean value indicating whether the Droplet has been locked, preventing actions by users. |
| `memory` | `number` | Memory of the Droplet in megabytes. |
| `meta` | `any` |  |
| `name` | `string` | The human-readable name set for the Droplet instance. |
| `networks` | `Record<string, any>` | The details of the network that are configured for the Droplet instance. |
| `next_backup_window` | `any` |  |
| `policies` | `Record<string, any>` | A map where the keys are the Droplet IDs and the values are objects containing the backup policy information for each Droplet. |
| `possible_days` | `any[]` | The day of the week the backup will occur. |
| `possible_window_starts` | `any[]` | An array of integers representing the hours of the day that a backup can start. |
| `region` | `Record<string, any>` |  |
| `retention_period_days` | `number` | The number of days that a backup will be kept. |
| `size` | `Record<string, any>` |  |
| `size_slug` | `string` | The unique slug identifier for the size of this Droplet. |
| `snapshot_ids` | `any[]` | An array of snapshot IDs of any snapshots created from the Droplet instance.<br>Requires `image:read` scope. |
| `status` | `string` | A status string indicating the state of the Droplet instance. |
| `subnet_uuid` | `string` | A string specifying the UUID of the VPC subnet to which the Droplet is assigned.<br>Requires `vpc:read` scope. |
| `tags` | `any[]` | An array of Tags the Droplet has been tagged with.<br>Requires `tag:read` scope. |
| `vcpus` | `number` | The number of virtual CPUs. |
| `volume_ids` | `any[]` | A flat array including the unique identifier for each Block Storage volume attached to the Droplet.<br>Requires `block_storage:read` scope. |
| `vpc_uuid` | `string` | A string specifying the UUID of the VPC to which the Droplet is assigned.<br>Requires `vpc:read` scope. |
| `window_length_hours` | `number` | The number of hours that a backup window is open. |

#### Example: Load

```ts
const droplet = await client.Droplet().load({ id: 1 })
```

#### Example: List

```ts
const droplets = await client.Droplet().list()
```

#### Example: Create

```ts
const droplet = await client.Droplet().create({
  backup_ids: [],
  created_at: 'example_created_at',
  disk: 1,
  features: [],
  id: 1,
  image: 'example_image',
  locked: true,
  memory: 1,
  meta: 'example_meta',
  name: 'example_name',
  networks: {},
  next_backup_window: 'example_next_backup_window',
  region: {},
  size: {},
  size_slug: 'example_size_slug',
  snapshot_ids: [],
  status: 'example_status',
  tags: [],
  vcpus: 1,
  volume_ids: [],
})
```


### DropletAction

Create an instance: `const droplet_action = client.DropletAction()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `completed_at` | `string` | A time value given in ISO8601 combined date and time format that represents when the action was completed. |
| `id` | `number` | A unique numeric ID that can be used to identify and reference an action. |
| `region` | `Record<string, any>` |  |
| `region_slug` | `string` | A human-readable string that is used as a unique identifier for each region. |
| `resource_id` | `number` | A unique identifier for the resource that the action is associated with. |
| `resource_type` | `string` | The type of resource that the action is associated with. |
| `started_at` | `string` | A time value given in ISO8601 combined date and time format that represents when the action was initiated. |
| `status` | `string` | The current status of the action. |
| `type` | `string` | This is the type of action that the object represents. |

#### Example: Load

```ts
const droplet_action = await client.DropletAction().load({ id: 1, droplet_id: 1 })
```

#### Example: List

```ts
const droplet_actions = await client.DropletAction().list({ id: 1 })
```

#### Example: Create

```ts
const droplet_action = await client.DropletAction().create({
  region: {},
})
```


### DropletAutoscalePool

Create an instance: `const droplet_autoscale_pool = client.DropletAutoscalePool()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `active_resources_count` | `number` | The number of active Droplets in the autoscale pool. |
| `config` | `Record<string, any>` | The scaling configuration for an autoscale pool, which is how the pool scales up and down (either by resource utilization or static configuration). |
| `created_at` | `string` | A time value given in ISO8601 combined date and time format that represents when the autoscale pool was created. |
| `current_instance_count` | `number` | The current number of Droplets in the autoscale pool. |
| `current_utilization` | `Record<string, any>` |  |
| `desired_instance_count` | `number` | The target number of Droplets for the autoscale pool after the scaling event. |
| `droplet_id` | `number` | The unique identifier of the Droplet. |
| `droplet_template` | `Record<string, any>` |  |
| `health_status` | `string` | The health status of the Droplet. |
| `history_event_id` | `string` | The unique identifier of the history event. |
| `id` | `string` | A unique identifier for each autoscale pool instance. |
| `name` | `string` | The human-readable name set for the autoscale pool. |
| `reason` | `string` | The reason for the scaling event. |
| `status` | `string` | The current status of the autoscale pool. |
| `unhealthy_reason` | `string` | A human-readable description of why the Droplet is unhealthy. |
| `updated_at` | `string` | A time value given in ISO8601 combined date and time format that represents when the autoscale pool was last updated. |

#### Example: Load

```ts
const droplet_autoscale_pool = await client.DropletAutoscalePool().load({ autoscale_pool_id: 'autoscale_pool_id' })
```

#### Example: List

```ts
const droplet_autoscale_pools = await client.DropletAutoscalePool().list()
```

#### Example: Create

```ts
const droplet_autoscale_pool = await client.DropletAutoscalePool().create({
  active_resources_count: 1,
  config: {},
  created_at: 'example_created_at',
  current_instance_count: 1,
  desired_instance_count: 1,
  droplet_id: 1,
  droplet_template: {},
  health_status: 'example_health_status',
  history_event_id: 'example_history_event_id',
  id: 'example_id',
  name: 'example_name',
  reason: 'example_reason',
  status: 'example_status',
  updated_at: 'example_updated_at',
})
```


### Embedding

Create an instance: `const embedding = client.Embedding()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `data` | `any[]` | One entry for each `input` string, in the same order. |
| `encoding_format` | `string` | How embedding values are returned in each `data[].embedding` field. |
| `input` | `any` | A single string or 1–2048 strings; each string produces one row in `data`, in order. |
| `model` | `string` | The embedding model that produced the vectors. |
| `object` | `string` | The object type, which is always the string `list`. |
| `usage` | `Record<string, any>` | Token usage for the embeddings request. |
| `user` | `string` | Optional end-user identifier to help with abuse monitoring. |

#### Example: Create

```ts
const embedding = await client.Embedding().create({
  data: [],
  input: 'example_input',
  model: 'example_model',
  object: 'example_object',
  usage: {},
})
```


### Empty

Create an instance: `const empty = client.Empty()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `actorId` | `string` | Optional actor binding: the user whose connections the session's tool calls use, matched against connection `user_id`. |
| `agentName` | `string` | Name of the agent that started the session. |
| `agentUrn` | `string` | URN of the agent that started the session. |
| `categories` | `any[]` | Required. |
| `config` | `Record<string, any>` | Optional session options. |
| `createdAt` | `string` | When the session was created. |
| `insights` | `any` | Omitted when the request omitted insights or explicitly sent null. |
| `mcpUrl` | `string` | URL of the session's MCP endpoint, for the agent to connect to. |
| `name` | `string` | Required human-readable session name. |
| `network` | `any` | Product-level session network binding. |
| `overrides` | `any[]` | Required. |
| `owning_user_id` | `string` | DigitalOcean user ID of the user who created the session, when recorded. |
| `policy` | `any` | Optional tool-permission policy. |
| `session` | `any` | The created session. |
| `sessionUrn` | `string` | Session URN, for example `do:managed_agent_session:<uuid>`. |
| `tools` | `any[]` | Canonical, version-pinned selected tool references. |
| `updatedAt` | `string` | When the session was last modified. |

#### Example: List

```ts
const emptys = await client.Empty().list()
```

#### Example: Create

```ts
const empty = await client.Empty().create({
  categories: [],
  name: 'example_name',
  overrides: [],
})
```


### Firewall

Create an instance: `const firewall = client.Firewall()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `created_at` | `string` | A time value given in ISO8601 combined date and time format that represents when the firewall was created. |
| `droplet_ids` | `any[]` | An array containing the IDs of the Droplets assigned to the firewall. |
| `id` | `string` | A unique ID that can be used to identify and reference a firewall. |
| `inbound_rules` | `any[]` |  |
| `name` | `string` | A human-readable name for a firewall. |
| `outbound_rules` | `any[]` |  |
| `pending_changes` | `any[]` | An array of objects each containing the fields "droplet_id", "removing", and "status". |
| `status` | `string` | A status string indicating the current state of the firewall. |
| `tags` | `any` |  |

#### Example: Load

```ts
const firewall = await client.Firewall().load({ id: 'firewall_id' })
```

#### Example: List

```ts
const firewalls = await client.Firewall().list()
```

#### Example: Create

```ts
const firewall = await client.Firewall().create({
})
```


### FloatingIp

Create an instance: `const floating_ip = client.FloatingIp()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `droplet` | `any` | The Droplet that the floating IP has been assigned to. |
| `floating_ip` | `Record<string, any>` |  |
| `id` | `string` |  |
| `ip` | `string` | The public IP address of the floating IP. |
| `links` | `Record<string, any>` |  |
| `locked` | `boolean` | A boolean value indicating whether or not the floating IP has pending actions preventing new ones from being submitted. |
| `project_id` | `string` | The UUID of the project to which the reserved IP currently belongs.<br><br>Requires `project:read` scope. |
| `region` | `any` |  |

#### Example: Load

```ts
const floating_ip = await client.FloatingIp().load({ id: 'floating_ip_id' })
```

#### Example: List

```ts
const floating_ips = await client.FloatingIp().list()
```

#### Example: Create

```ts
const floating_ip = await client.FloatingIp().create({
})
```


### FloatingIpAction

Create an instance: `const floating_ip_action = client.FloatingIpAction()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `action` | `Record<string, any>` |  |
| `completed_at` | `string` | A time value given in ISO8601 combined date and time format that represents when the action was completed. |
| `id` | `number` | A unique numeric ID that can be used to identify and reference an action. |
| `project_id` | `string` | The UUID of the project to which the reserved IP currently belongs. |
| `region` | `Record<string, any>` |  |
| `region_slug` | `string` | A human-readable string that is used as a unique identifier for each region. |
| `resource_id` | `number` | A unique identifier for the resource that the action is associated with. |
| `resource_type` | `string` | The type of resource that the action is associated with. |
| `started_at` | `string` | A time value given in ISO8601 combined date and time format that represents when the action was initiated. |
| `status` | `string` | The current status of the action. |
| `type` | `string` | This is the type of action that the object represents. |

#### Example: Load

```ts
const floating_ip_action = await client.FloatingIpAction().load({ id: 1, floating_ip_id: 'floating_ip_id' })
```

#### Example: List

```ts
const floating_ip_actions = await client.FloatingIpAction().list({ id: "example_id" })
```

#### Example: Create

```ts
const floating_ip_action = await client.FloatingIpAction().create({
  id: 'example_id',
  region: {},
})
```


### Function

Create an instance: `const function_ = client.Function()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `api_host` | `string` | The namespace's API hostname. |
| `created_at` | `string` | UTC time string. |
| `expires_at` | `string` | When the key expires (null for non-expiring keys). |
| `expires_in` | `string` | The duration after which the access key expires, specified as a human-readable duration string in the format `<int>h` (hours) or `<int>d` (days). |
| `function` | `string` | Name of function(action) that exists in the given namespace. |
| `id` | `string` | The access key's unique identifier with prefix 'dof_v1_'. |
| `is_enabled` | `boolean` | Indicates weather the trigger is paused or unpaused. |
| `key` | `string` | A random alpha numeric string. |
| `label` | `string` | The namespace's unique name. |
| `name` | `string` | The trigger's unique name within the namespace. |
| `namespace` | `string` | A unique string format of UUID with a prefix fn-. |
| `region` | `string` | The namespace's datacenter region. |
| `scheduled_details` | `Record<string, any>` | Trigger details for SCHEDULED type, where body is optional. |
| `scheduled_runs` | `Record<string, any>` |  |
| `type` | `string` | String which indicates the type of trigger source like SCHEDULED. |
| `updated_at` | `string` | UTC time string. |
| `uuid` | `string` | The namespace's Universally Unique Identifier. |

#### Example: Load

```ts
const function_ = await client.Function().load({ namespace_id: 'namespace_id' })
```

#### Example: List

```ts
const function_s = await client.Function().list({ namespace_id: "example" })
```

#### Example: Create

```ts
const function_ = await client.Function().create({
  namespace_id: 'example_namespace_id',
  scheduled_details: {},
})
```


### GenaiapiRegion

Create an instance: `const genaiapi_region = client.GenaiapiRegion()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `inference_url` | `string` | Url for inference server |
| `region` | `string` | Region code |
| `serves_batch` | `boolean` | This datacenter is capable of running batch jobs |
| `serves_inference` | `boolean` | This datacenter is capable of serving inference |
| `stream_inference_url` | `string` | The url for the inference streaming server |

#### Example: List

```ts
const genaiapi_regions = await client.GenaiapiRegion().list()
```


### Image

Create an instance: `const image = client.Image()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `created_at` | `string` | A time value given in ISO8601 combined date and time format that represents when the image was created. |
| `description` | `string` | An optional free-form text field to describe an image. |
| `distribution` | `string` | The name of a custom image's distribution. |
| `error_message` | `string` | A string containing information about errors that may occur when importing a custom image. |
| `id` | `number` | A unique number that can be used to identify and reference a specific image. |
| `min_disk_size` | `number` | The minimum disk size in GB required for a Droplet to use this image. |
| `name` | `string` | The display name that has been given to an image. |
| `public` | `boolean` | This is a boolean value that indicates whether the image in question is public or not. |
| `region` | `string` | The slug identifier for the region where the resource will initially be available. |
| `regions` | `any[]` | This attribute is an array of the regions that the image is available in. |
| `size_gigabytes` | `number` | The size of the image in gigabytes. |
| `slug` | `string` | A uniquely identifying string that is associated with each of the DigitalOcean-provided public images. |
| `status` | `string` | A status string indicating the state of a custom image. |
| `tags` | `any[]` | A flat array of tag names as strings to be applied to the resource. |
| `type` | `string` | Describes the kind of image. |
| `url` | `string` | A URL from which the custom Linux virtual machine image may be retrieved. |

#### Example: Load

```ts
const image = await client.Image().load({ id: 'image_id' })
```

#### Example: List

```ts
const images = await client.Image().list()
```

#### Example: Create

```ts
const image = await client.Image().create({
  region: 'example_region',
  url: 'example_url',
})
```


### ImageAction

Create an instance: `const image_action = client.ImageAction()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `completed_at` | `string` | A time value given in ISO8601 combined date and time format that represents when the action was completed. |
| `id` | `number` | A unique numeric ID that can be used to identify and reference an action. |
| `region` | `Record<string, any>` |  |
| `region_slug` | `string` | A human-readable string that is used as a unique identifier for each region. |
| `resource_id` | `number` | A unique identifier for the resource that the action is associated with. |
| `resource_type` | `string` | The type of resource that the action is associated with. |
| `started_at` | `string` | A time value given in ISO8601 combined date and time format that represents when the action was initiated. |
| `status` | `string` | The current status of the action. |
| `type` | `string` | This is the type of action that the object represents. |

#### Example: List

```ts
const image_actions = await client.ImageAction().list({ id: 1 })
```


### Insight

Create an instance: `const insight = client.Insight()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `channel_type` | `string` | The configured channel type. |
| `created_at` | `string` | Time the alert rule was created. |
| `email` | `Record<string, any>` | Email notification channel configuration. |
| `id` | `string` | A unique identifier for the alert instance. |
| `last_notified_at` | `string` | Time a notification was last sent for this alert instance. |
| `last_triggered_at` | `string` | Time the alert instance most recently fired. |
| `name` | `string` | A human-readable name for the notification channel. |
| `resolved_at` | `string` | Time the alert instance resolved. |
| `resource_urn` | `string` | URN of the DigitalOcean resource the alert fired for. |
| `rule_id` | `string` | ID of the alert rule that fired this alert instance. |
| `severity` | `string` | Severity of the breached threshold. |
| `slack` | `Record<string, any>` | Slack notification channel configuration as returned in API responses. |
| `spec` | `Record<string, any>` | Spec for an Insights alert rule. |
| `status` | `string` | Current status of the alert instance. |
| `triggered_at` | `string` | Time the alert instance first fired. |
| `updated_at` | `string` | Time the alert rule was last updated. |
| `usage` | `any` |  |
| `value` | `number` | The observed metric value that breached the threshold. |
| `webhook` | `Record<string, any>` | Generic HTTPS webhook notification channel configuration as returned in API responses. |

#### Example: Load

```ts
const insight = await client.Insight().load({ id: 'insight_id' })
```


### InvoiceSummary

Create an instance: `const invoice_summary = client.InvoiceSummary()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `amount` | `string` | Total amount of the invoice, in USD. |
| `billing_period` | `string` | Billing period of usage for which the invoice is issued, in `YYYY-MM` format. |
| `credits_and_adjustments` | `any` |  |
| `id` | `string` |  |
| `invoice_id` | `string` | ID of the invoice |
| `invoice_uuid` | `string` | UUID of the invoice |
| `overages` | `any` |  |
| `product_charges` | `any` |  |
| `taxes` | `any` |  |
| `user_billing_address` | `any` |  |
| `user_company` | `string` | Company of the DigitalOcean customer being invoiced, if set. |
| `user_email` | `string` | Email of the DigitalOcean customer being invoiced. |
| `user_name` | `string` | Name of the DigitalOcean customer being invoiced. |

#### Example: Load

```ts
const invoice_summary = await client.InvoiceSummary().load({ id: 'invoice_summary_id' })
```


### Kubernete

Create an instance: `const kubernete = client.Kubernete()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `amd_gpu_device_metrics_exporter_plugin` | `Record<string, any>` | An object specifying whether the AMD Device Metrics Exporter should be enabled in the Kubernetes cluster. |
| `amd_gpu_device_plugin` | `Record<string, any>` | An object specifying whether the AMD GPU Device Plugin should be enabled in the Kubernetes cluster. |
| `amd_gpu_dra_driver` | `Record<string, any>` | An object specifying whether the AMD GPU DRA Driver should be enabled in the Kubernetes cluster. |
| `auto_scale` | `boolean` | A boolean value indicating whether auto-scaling is enabled for this node pool. |
| `auto_upgrade` | `boolean` | A boolean value indicating whether the cluster will be automatically upgraded to new patch releases during its maintenance window. |
| `cluster_autoscaler_configuration` | `Record<string, any>` | An object specifying custom cluster autoscaler configuration. |
| `cluster_subnet` | `string` | The range of IP addresses for the overlay network of the Kubernetes cluster in CIDR notation. |
| `control_plane_firewall` | `Record<string, any>` | An object specifying the control plane firewall for the Kubernetes cluster. |
| `coredns_autoscaler` | `Record<string, any>` | An object specifying whether the Cluster Proportional Autoscaler (CPA) add-on for CoreDNS should be enabled for the Kubernetes cluster. |
| `count` | `number` | The number of Droplet instances in the node pool. |
| `created_at` | `string` | A time value given in ISO8601 combined date and time format that represents when the Kubernetes cluster was created. |
| `endpoint` | `string` | The base URL of the API server on the Kubernetes master node. |
| `gpu_partition_mode` | `string` | The AMD GPU partition mode for this node pool. |
| `ha` | `boolean` | A boolean value indicating whether the control plane is run in a highly available configuration in the cluster. |
| `id` | `string` | A unique ID that can be used to identify and reference a specific node pool. |
| `ipv4` | `string` | The public IPv4 address of the Kubernetes master node. |
| `isolated_workers` | `boolean` | A boolean value indicating whether worker nodes in the cluster are not assigned public IP addresses. |
| `kubernetes_version` | `string` | The upstream version string for the version of Kubernetes provided by a given slug. |
| `labels` | `Record<string, any>` | An object of key/value mappings specifying labels to apply to all nodes in a pool. |
| `maintenance_policy` | `Record<string, any>` | An object specifying the maintenance window policy for the Kubernetes cluster. |
| `max_nodes` | `number` | The maximum number of nodes that this node pool can be auto-scaled to. |
| `message` | `string` | Status information about the cluster which impacts it's lifecycle. |
| `min_nodes` | `number` | The minimum number of nodes that this node pool can be auto-scaled to. |
| `name` | `string` | A human-readable name for the node pool. |
| `nfs_csi_plugin` | `Record<string, any>` | An object specifying whether the NFS CSI plugin should be enabled for the Kubernetes cluster. |
| `node_pools` | `any[]` | An object specifying the details of the worker nodes available to the Kubernetes cluster. |
| `nodes` | `any[]` | An object specifying the details of a specific worker node in a node pool. |
| `nvidia_gpu_device_plugin` | `Record<string, any>` | An object specifying whether the Nvidia GPU Device Plugin should be enabled in the Kubernetes cluster. |
| `nvidia_gpu_dra_driver` | `Record<string, any>` | An object specifying whether the NVIDIA GPU DRA Driver should be enabled in the Kubernetes cluster. |
| `p2p_oci_registry_plugin` | `Record<string, any>` | An object specifying whether the Peer-to-peer OCI registry component should be enabled for the Kubernetes cluster. |
| `rdma_shared_dev_plugin` | `Record<string, any>` | An object specifying whether the RDMA shared device plugin should be enabled in the Kubernetes cluster. |
| `region` | `string` | The slug identifier for the region where the Kubernetes cluster is located. |
| `registries` | `any[]` | An array of integrated DOCR registries. |
| `registry_enabled` | `boolean` | A read-only boolean value indicating if a container registry is integrated with the cluster. |
| `routing_agent` | `Record<string, any>` | An object specifying whether the routing-agent component should be enabled for the Kubernetes cluster. |
| `service_subnet` | `string` | The range of assignable IP addresses for services running in the Kubernetes cluster in CIDR notation. |
| `size` | `string` | The slug identifier for the type of Droplet used as workers in the node pool. |
| `slug` | `string` | The slug identifier for an available version of Kubernetes for use when creating or updating a cluster. |
| `sso` | `Record<string, any>` | An object specifying Single Sign-On (SSO) configuration for the Kubernetes cluster. |
| `status` | `Record<string, any>` | An object containing a `state` attribute whose value is set to a string indicating the current status of the cluster. |
| `supported_features` | `any[]` | The features available with the version of Kubernetes provided by a given slug. |
| `surge_upgrade` | `boolean` | A boolean value indicating whether surge upgrade is enabled/disabled for the cluster. |
| `tags` | `any[]` | An array containing the tags applied to the node pool. |
| `taints` | `any[]` | An array of taints to apply to all nodes in a pool. |
| `timestamp` | `string` | A timestamp in ISO8601 format that represents when the status message was emitted. |
| `updated_at` | `string` | A time value given in ISO8601 combined date and time format that represents when the Kubernetes cluster was last updated. |
| `version` | `string` | The slug identifier for the version of Kubernetes used for the cluster. |
| `vpc_uuid` | `string` | A string specifying the UUID of the VPC to which the Kubernetes cluster is assigned.<br><br>Requires `vpc:read` scope. |
| `worker_subnet_uuid` | `string` | The UUID of the VPC subnet worker nodes are attached to. |

#### Example: Load

```ts
const kubernete = await client.Kubernete().load({ cluster_id: 'cluster_id' })
```

#### Example: List

```ts
const kubernetes = await client.Kubernete().list({ cluster_id: "example" })
```

#### Example: Create

```ts
const kubernete = await client.Kubernete().create({
  cluster_id: 'example_cluster_id',
  count: 1,
  name: 'example_name',
  node_pools: [],
  region: 'example_region',
  size: 'example_size',
  version: 'example_version',
})
```


### KubernetesOption

Create an instance: `const kubernetes_option = client.KubernetesOption()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `regions` | `any[]` |  |
| `sizes` | `any[]` |  |
| `versions` | `any[]` |  |

#### Example: Load

```ts
const kubernetes_option = await client.KubernetesOption().load()
```


### ListMcpServerTool

Create an instance: `const list_mcp_server_tool = client.ListMcpServerTool()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `description` | `string` | Tool description as the server reports it. |
| `enabled` | `boolean` | Whether the tool is enabled in your team's catalog. |
| `enabledToolSlugs` | `any[]` | The complete set of tool slugs (`<server_ref>_<name>`) to enable; every other tool of the server is disabled. |
| `name` | `string` | Tool name as the server reports it, normalized to the catalog's naming rules. |
| `quarantineReason` | `string` | Why the tool was quarantined; empty otherwise. |
| `quarantined` | `boolean` | True when the enabled tool was suspended because it disappeared from the server or its input schema changed incompatibly. |
| `toolSlug` | `string` | `<server_ref>_<name>`: the tool's catalog slug, and the value to list in `enabledToolSlugs`. |
| `tools` | `any[]` | Tools sorted by name. |
| `user_id` | `string` | Required for a server registered with `credentialRefSource` connection when a tool needs verification against the live server, which can only be reached as a user who has authorized it. |

#### Example: List

```ts
const list_mcp_server_tools = await client.ListMcpServerTool().list({ server_ref: "example" })
```


### ListProvider

Create an instance: `const list_provider = client.ListProvider()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `auth_type` | `string` | Deprecated: read `auth_types`, since a provider may accept more than one credential kind. |
| `auth_types` | `any[]` | Credential kinds the provider accepts, sorted: none|oauth|`shared_api_key`|unknown|`user_oauth_app`|`user_token`. |
| `connection_parameters` | `any[]` | Non-sensitive values collected when creating a connection. |
| `credential_parameters` | `any[]` | Non-secret values collected when registering an API key provider credential. |
| `description` | `string` | Provider description. |
| `display_name` | `string` | Human-readable provider name. |
| `name` | `string` | Provider slug, used as provider when creating a connection or a provider credential. |
| `oauth_client_setup_url` | `string` | HTTPS page at the provider where a team creates that OAuth client, such as its developer console or setup guide. |
| `oauth_redirect_url` | `string` | Callback URL a team must register with the provider when it creates its own OAuth client. |
| `scopes` | `any[]` | The OAuth scopes a connection may request; a connection that requests none gets all of them. |

#### Example: List

```ts
const list_providers = await client.ListProvider().list()
```


### ListProviderHealth

Create an instance: `const list_provider_health = client.ListProviderHealth()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `health` | `any` | Metrics over the window. |
| `provider` | `string` | Provider ID. |

#### Example: List

```ts
const list_provider_healths = await client.ListProviderHealth().list()
```


### ListTool

Create an instance: `const list_tool = client.ListTool()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `definitions` | `any[]` | definitions[i] describes tools[i]. |
| `pagination` | `any` | page and `per_page` echo the values applied; total is the number of tools matching `toolkitId` across all pages. |
| `tools` | `any[]` | Tools on this page, grouped by provider and sorted by name within a provider. |
| `version` | `string` | Catalog version identifier, for example `v1`. |

#### Example: List

```ts
const list_tools = await client.ListTool().list()
```


### ListToolHealth

Create an instance: `const list_tool_health = client.ListToolHealth()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `health` | `any` | Metrics over the window. |
| `provider` | `string` | ID of the provider that offers the tool. |
| `tool_slug` | `string` | Catalog tool slug. |

#### Example: List

```ts
const list_tool_healths = await client.ListToolHealth().list()
```


### ListToolbeltProvider

Create an instance: `const list_toolbelt_provider = client.ListToolbeltProvider()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `categories` | `any[]` | The distinct tool categories among this toolbelt's members for the provider (sorted). |
| `created_at` | `string` | When the provider was added to the catalog. |
| `description` | `string` | Provider description. |
| `id` | `string` | Equals provider; present so the entry has the same shape as a toolkit. |
| `name` | `string` | The provider's display name. |
| `provider` | `string` | The provider ID. |
| `tool_count` | `number` | How many toolbelt members belong to this provider. |

#### Example: List

```ts
const list_toolbelt_providers = await client.ListToolbeltProvider().list({ name: "example" })
```


### ListToolkit

Create an instance: `const list_toolkit = client.ListToolkit()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `categories` | `any[]` | Distinct categories of the provider's released tools, sorted. |
| `created_at` | `string` | When the provider was added. |
| `description` | `string` | Provider description. |
| `id` | `string` | Provider ID. |
| `name` | `string` | Human-readable provider name. |
| `provider_kind` | `string` | Classifies the provider, for example `managed_api` or `byo_mcp` (one of your team's MCP servers). |

#### Example: List

```ts
const list_toolkits = await client.ListToolkit().list()
```


### LoadBalancer

Create an instance: `const load_balancer = client.LoadBalancer()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `algorithm` | `string` | This field has been deprecated. |
| `created_at` | `string` | A time value given in ISO8601 combined date and time format that represents when the load balancer was created. |
| `disable_lets_encrypt_dns_records` | `boolean` | A boolean value indicating whether to disable automatic DNS record creation for Let's Encrypt certificates that are added to the load balancer. |
| `domains` | `any[]` | An array of objects specifying the domain configurations for a Global load balancer. |
| `droplet_ids` | `any[]` | An array containing the IDs of the Droplets assigned to the load balancer. |
| `enable_backend_keepalive` | `boolean` | A boolean value indicating whether HTTP keepalive connections are maintained to target Droplets. |
| `enable_proxy_protocol` | `boolean` | A boolean value indicating whether PROXY Protocol is in use. |
| `firewall` | `Record<string, any>` | An object specifying allow and deny rules to control traffic to the load balancer. |
| `forwarding_rules` | `any[]` | An array of objects specifying the forwarding rules for a load balancer. |
| `glb_settings` | `Record<string, any>` | An object specifying forwarding configurations for a Global load balancer. |
| `health_check` | `Record<string, any>` | An object specifying health check settings for the load balancer. |
| `http_idle_timeout_seconds` | `number` | An integer value which configures the idle timeout for HTTP requests to the target droplets. |
| `id` | `string` | A unique ID that can be used to identify and reference a load balancer. |
| `ip` | `string` | An attribute containing the public-facing IP address of the load balancer. |
| `ipv6` | `string` | An attribute containing the public-facing IPv6 address of the load balancer. |
| `name` | `string` | A human-readable name for a load balancer instance. |
| `network` | `string` | A string indicating whether the load balancer should be external or internal. |
| `network_stack` | `string` | A string indicating whether the load balancer will support IPv4 or both IPv4 and IPv6 networking. |
| `project_id` | `string` | The ID of the project that the load balancer is associated with. |
| `redirect_http_to_https` | `boolean` | A boolean value indicating whether HTTP requests to the load balancer on port 80 will be redirected to HTTPS on port 443. |
| `region` | `Record<string, any>` |  |
| `size` | `string` | This field has been replaced by the `size_unit` field for all regions except in AMS2, NYC2, and SFO1. |
| `size_unit` | `number` | How many nodes the load balancer contains. |
| `status` | `string` | A status string indicating the current state of the load balancer. |
| `sticky_sessions` | `Record<string, any>` | An object specifying sticky sessions settings for the load balancer. |
| `subnet_uuid` | `string` | A string specifying the UUID of the VPC subnet to which the load balancer is assigned. |
| `tag` | `string` | The name of a Droplet tag corresponding to Droplets assigned to the load balancer. |
| `target_load_balancer_ids` | `any[]` | An array containing the UUIDs of the Regional load balancers to be used as target backends for a Global load balancer. |
| `tls_cipher_policy` | `string` | A string indicating the policy for the TLS cipher suites used by the load balancer. |
| `type` | `string` | A string indicating whether the load balancer should be a standard regional HTTP load balancer, a regional network load balancer that routes traffic at the TCP/UDP transport layer, or a global load balancer. |
| `vpc_uuid` | `string` | A string specifying the UUID of the VPC to which the load balancer is assigned. |

#### Example: Load

```ts
const load_balancer = await client.LoadBalancer().load({ id: 'load_balancer_id' })
```

#### Example: List

```ts
const load_balancers = await client.LoadBalancer().list()
```

#### Example: Create

```ts
const load_balancer = await client.LoadBalancer().create({
  forwarding_rules: [],
})
```


### LogsSearch

Create an instance: `const logs_search = client.LogsSearch()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `data` | `any[]` | Matching log records. |
| `filter` | `Record<string, any>` | A boolean filter tree for logs queries. |
| `order_by` | `any[]` | Sort clauses applied to the result set. |
| `pagination` | `Record<string, any>` | Pagination response. |
| `time_range` | `Record<string, any>` | An inclusive query time window. |

#### Example: Create

```ts
const logs_search = await client.LogsSearch().create({
  query_id: 'example_query_id',
  time_range: {},
})
```


### Logsink

Create an instance: `const logsink = client.Logsink()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `config` | `any` |  |
| `id` | `string` |  |
| `sink_id` | `string` | A unique identifier for Logsink |
| `sink_name` | `string` | The name of the Logsink |
| `sink_type` | `string` |  |

#### Example: Load

```ts
const logsink = await client.Logsink().load({ id: 'logsink_id', database_id: 'database_id' })
```


### McpServer

Create an instance: `const mcp_server = client.McpServer()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `api_key` | `string` | For `credentialRefSource` secret: the key or token itself. |
| `createdAt` | `string` | When the server was registered, in RFC 3339 format. |
| `credentialRef` | `string` | The secret reference supplied at registration when source=secret, or the team's OAuth credential ID when source=connection. |
| `credentialRefSource` | `string` | How requests to the server authenticate: none, secret (a key or token sent in the Authorization header), or connection (each user's own OAuth authorization). |
| `description` | `string` | Team-authored description, shown on the server's catalog card. |
| `endpoint` | `string` | HTTPS URL of the server's MCP endpoint. |
| `id` | `string` |  |
| `lastSyncedAt` | `string` | When discovery last succeeded, in RFC 3339 format; empty until the first success. |
| `oauth_authorization_ttl_seconds` | `string` | How long a user's authorization is reused before re-consent. |
| `oauth_authorize_url` | `string` | OAuth authorization endpoint. |
| `oauth_client_id` | `string` | Required for `credentialRefSource` connection: the client ID of your team's OAuth client for the server. |
| `oauth_client_secret` | `string` | Required for `credentialRefSource` connection. |
| `oauth_scopes` | `any[]` | OAuth scopes requested from each user. |
| `oauth_token_url` | `string` | Required for `credentialRefSource` connection: the OAuth token endpoint, under the same rules as `oauth_authorize_url`. |
| `protocolVersion` | `string` | MCP protocol revision negotiated with the server. |
| `serverRef` | `string` | Server identifier, unique within your team. |
| `syncError` | `string` | Why the latest discovery failed; empty after a successful one. |
| `syncStatus` | `string` | Outcome of the latest discovery: pending (no discovery has finished yet), ok, failed, or `unsupported_protocol`. |
| `toolCount` | `number` | Number of tools discovered on the server, whether enabled or not. |
| `transport` | `string` | Always `streamable_http`. |
| `updatedAt` | `string` | When the server was last modified, in RFC 3339 format. |

#### Example: Load

```ts
const mcp_server = await client.McpServer().load({ id: 'mcp_server_id' })
```

#### Example: List

```ts
const mcp_servers = await client.McpServer().list()
```

#### Example: Create

```ts
const mcp_server = await client.McpServer().create({
})
```


### Message

Create an instance: `const message = client.Message()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `content` | `any[]` | Assistant output blocks (`text` and/or `tool_use`). |
| `id` | `string` | Unique identifier for this message object. |
| `max_tokens` | `number` | Maximum tokens to generate before stopping. |
| `messages` | `any[]` | Conversation turns. |
| `metadata` | `Record<string, any>` | Optional request metadata. |
| `model` | `string` | Model that produced the message. |
| `reasoning_effort` | `string` | DigitalOcean extension for reasoning-capable models. |
| `role` | `string` | Always `assistant` for this response. |
| `speed` | `string` | DigitalOcean extension for preferred inference speed. |
| `stop_reason` | `string` | Why generation stopped. |
| `stop_sequence` | `string` | When `stop_reason` is `stop_sequence`, the sequence that matched. |
| `stop_sequences` | `any[]` | Custom strings that stop generation when produced. |
| `stream` | `boolean` | When true, the response is streamed using server-sent events (SSE). |
| `system` | `any` | System prompt as plain text or as an array of text blocks. |
| `temperature` | `number` | Sampling temperature between 0.0 and 1.0. |
| `thinking` | `Record<string, any>` | Extended thinking configuration. |
| `tool_choice` | `any` | Controls how the model uses tools: automatic selection, require any tool, force a specific tool, or a string form accepted by the service. |
| `tools` | `any[]` | Tool definitions the model may invoke. |
| `top_k` | `number` | Top-K sampling cutoff. |
| `top_p` | `number` | Nucleus sampling; use either `temperature` or `top_p`, not both. |
| `type` | `string` | Object type discriminator. |
| `usage` | `Record<string, any>` | Token usage for a non-streaming `POST /v1/messages` response. |

#### Example: Create

```ts
const message = await client.Message().create({
  content: [],
  id: 'example_id',
  max_tokens: 1,
  messages: [],
  model: 'example_model',
  role: 'example_role',
  stop_reason: 'example_stop_reason',
  thinking: {},
  type: 'example_type',
  usage: {},
})
```


### Metric

Create an instance: `const metric = client.Metric()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `result` | `any[]` | Result of query. |
| `resultType` | `string` |  |

#### Example: Load

```ts
const metric = await client.Metric().load({ end: 'end', start: 'start' })
```


### Model

Create an instance: `const model = client.Model()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `created` | `number` | The Unix timestamp (in seconds) when the model was created. |
| `id` | `string` | The model identifier, which can be referenced in the API endpoints. |
| `object` | `string` | The object type, which is always "model". |
| `owned_by` | `string` | The organization that owns the model. |

#### Example: List

```ts
const models = await client.Model().list()
```


### Monitoring

Create an instance: `const monitoring = client.Monitoring()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `alerts` | `Record<string, any>` |  |
| `compare` | `string` |  |
| `config` | `Record<string, any>` | OpenSearch destination configuration with `credentials` omitted. |
| `description` | `string` |  |
| `destination` | `Record<string, any>` |  |
| `enabled` | `boolean` |  |
| `entities` | `any[]` |  |
| `id` | `string` | A unique identifier for a destination. |
| `name` | `string` | destination name |
| `resources` | `any[]` | List of resources identified by their URNs. |
| `tags` | `any[]` |  |
| `type` | `string` | The destination type. |
| `uuid` | `string` |  |
| `value` | `number` |  |
| `window` | `string` |  |

#### Example: Load

```ts
const monitoring = await client.Monitoring().load({ alert_uuid: 'alert_uuid' })
```

#### Example: List

```ts
const monitorings = await client.Monitoring().list()
```

#### Example: Create

```ts
const monitoring = await client.Monitoring().create({
  destination_uuid: 'example_destination_uuid',
  alerts: {},
  compare: 'example_compare',
  description: 'example_description',
  destination: {},
  enabled: true,
  entities: [],
  tags: [],
  type: 'example_type',
  uuid: 'example_uuid',
  value: 1,
  window: 'example_window',
})
```


### N1Click

Create an instance: `const n1_click = client.N1Click()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `slug` | `string` | The slug identifier for the 1-Click application. |
| `type` | `string` | The type of the 1-Click application. |

#### Example: List

```ts
const n1_clicks = await client.N1Click().list()
```


### N1ClickApplication

Create an instance: `const n1_click_application = client.N1ClickApplication()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `addon_slugs` | `any[]` | An array of 1-Click Application slugs to be installed to the Kubernetes cluster. |
| `cluster_uuid` | `string` | A unique ID for the Kubernetes cluster to which the 1-Click Applications will be installed. |
| `message` | `string` | A message about the result of the request. |

#### Example: Create

```ts
const n1_click_application = await client.N1ClickApplication().create({
  addon_slugs: [],
  cluster_uuid: 'example_cluster_uuid',
})
```


### NeighborId

Create an instance: `const neighbor_id = client.NeighborId()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `neighbor_ids` | `any[]` | An array of arrays. |

#### Example: List

```ts
const neighbor_ids = await client.NeighborId().list()
```


### Nfs

Create an instance: `const nfs = client.Nfs()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `access_points` | `any[]` | Access points configured on this share. |
| `created_at` | `string` | Timestamp for when the NFS share was created. |
| `host` | `string` | The host IP of the NFS server that will be accessible from the associated VPC |
| `id` | `string` | The unique identifier of the NFS share. |
| `mount_path` | `string` | Path at which the share will be available, to be mounted at a target of the user's choice within the client |
| `name` | `string` | The human-readable name of the share. |
| `performance_tier` | `string` | The performance tier of the share. |
| `region` | `string` | The DigitalOcean region slug (e.g., nyc2, atl1) where the NFS share resides. |
| `size_gib` | `number` | The desired/provisioned size of the share in GiB (Gibibytes). |
| `status` | `string` | The current status of the share. |
| `vpc_ids` | `any[]` | List of VPC IDs that should be able to access the share. |

#### Example: Load

```ts
const nfs = await client.Nfs().load({ id: 'nfs_id' })
```

#### Example: List

```ts
const nfss = await client.Nfs().list()
```

#### Example: Create

```ts
const nfs = await client.Nfs().create({
  created_at: 'example_created_at',
  id: 'example_id',
  name: 'example_name',
  region: 'example_region',
  size_gib: 1,
  status: 'example_status',
})
```


### NfsAction2

Create an instance: `const nfs_action_2 = client.NfsAction2()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |

#### Example: Create

```ts
const nfs_action_2 = await client.NfsAction2().create({
  id: 'example_id',
})
```


### NfsSnapshot

Create an instance: `const nfs_snapshot = client.NfsSnapshot()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `created_at` | `string` | The timestamp when the snapshot was created. |
| `id` | `string` | The unique identifier of the snapshot. |
| `name` | `string` | The human-readable name of the snapshot. |
| `region` | `string` | The DigitalOcean region slug where the snapshot is located. |
| `share_id` | `string` | The unique identifier of the share from which this snapshot was created. |
| `size_gib` | `number` | The size of the snapshot in GiB. |
| `status` | `string` | The current status of the snapshot. |

#### Example: Load

```ts
const nfs_snapshot = await client.NfsSnapshot().load({ id: 'nfs_snapshot_id' })
```

#### Example: List

```ts
const nfs_snapshots = await client.NfsSnapshot().list()
```


### OnlineMigration

Create an instance: `const online_migration = client.OnlineMigration()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `created_at` | `string` | The time the migration was initiated, in ISO 8601 format. |
| `disable_ssl` | `boolean` | Enables SSL encryption when connecting to the source database. |
| `id` | `string` | The ID of the most recent migration. |
| `ignore_dbs` | `any[]` | List of databases that should be ignored during migration. |
| `source` | `Record<string, any>` |  |
| `status` | `string` | The current status of the migration. |

#### Example: Load

```ts
const online_migration = await client.OnlineMigration().load({ database_id: 'database_id' })
```


### Option

Create an instance: `const option = client.Option()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `options` | `Record<string, any>` |  |
| `version_availability` | `Record<string, any>` |  |

#### Example: Load

```ts
const option = await client.Option().load()
```


### Organization

Create an instance: `const organization = client.Organization()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |

#### Example: List

```ts
const organizations = await client.Organization().list()
```

#### Example: Create

```ts
const organization = await client.Organization().create({
})
```


### OutputView

Create an instance: `const output_view = client.OutputView()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `audit` | `Record<string, any>` | Null on a preview, which stores nothing. |
| `description` | `string` | View description. |
| `fields` | `any[]` | The dotted output paths a projection keeps; arrays are traversed element-wise. |
| `id` | `string` |  |
| `kind` | `string` | `OUTPUT_VIEW_KIND_PROJECTION` or `OUTPUT_VIEW_KIND_TRANSFORM`. |
| `name` | `string` | View name, unique per tool version among its owner's views. |
| `output_schema` | `Record<string, any>` | The JSON Schema every result of this view satisfies. |
| `team_id` | `string` | Your team's ID on your team's views, and empty for a view DigitalOcean publishes to every team. |
| `tool` | `string` | The provider-qualified tool slug, for example `exa_search`. |
| `tool_id` | `string` | The opaque identity of the exact tool version the view is bound to; tool and version are its readable coordinates. |
| `version` | `string` | The tool version, for example `v3`. |
| `view_id` | `string` | Output view ID, for example `ov_` followed by 32 hex digits. |

#### Example: Load

```ts
const output_view = await client.OutputView().load({ id: 'output_view_id' })
```

#### Example: List

```ts
const output_views = await client.OutputView().list()
```

#### Example: Create

```ts
const output_view = await client.OutputView().create({
})
```


### PartnerNetworkConnect

Create an instance: `const partner_network_connect = client.PartnerNetworkConnect()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `bgp` | `Record<string, any>` | The BGP configuration for the partner attachment. |
| `bgp_auth_key` | `Record<string, any>` |  |
| `children` | `any[]` | An array of associated partner attachment UUIDs. |
| `cidr` | `string` | A CIDR block representing a remote route. |
| `connection_bandwidth_in_mbps` | `number` | The bandwidth (in Mbps) of the connection. |
| `created_at` | `string` | A time value given in ISO8601 combined date and time format. |
| `id` | `string` | A unique ID that can be used to identify and reference the partner attachment. |
| `naas_provider` | `string` | The Network as a Service (NaaS) provider for the partner attachment. |
| `name` | `string` | The name of the partner attachment. |
| `parent_uuid` | `string` | Associated partner attachment UUID |
| `region` | `string` | The region where the partner attachment is located. |
| `state` | `string` | The current operational state of the attachment. |
| `vpc_ids` | `any[]` | An array of VPC network IDs. |

#### Example: Load

```ts
const partner_network_connect = await client.PartnerNetworkConnect().load({ pa_id: 'pa_id' })
```

#### Example: List

```ts
const partner_network_connects = await client.PartnerNetworkConnect().list({ pa_id: "example" })
```


### PrepaymentConfig

Create an instance: `const prepayment_config = client.PrepaymentConfig()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `config` | `Record<string, any>` |  |
| `status` | `Record<string, any>` |  |

#### Example: Load

```ts
const prepayment_config = await client.PrepaymentConfig().load()
```


### PrepaymentStatus

Create an instance: `const prepayment_status = client.PrepaymentStatus()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `balance` | `string` | Current prepayment balance. |
| `blocked` | `boolean` | Whether the prepayment gate is currently blocking usage. |
| `eligible` | `boolean` | Whether the account is eligible for the prepayment gate experience. |
| `is_auto_prepay_enabled` | `boolean` | Whether automatic prepayment top-up is enabled. |
| `month_to_date_balance` | `string` | Current account balance including month-to-date usage. |

#### Example: Load

```ts
const prepayment_status = await client.PrepaymentStatus().load()
```


### Project

Create an instance: `const project = client.Project()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `patch(data)` | Change part of an existing entity. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `created_at` | `string` | A time value given in ISO8601 combined date and time format that represents when the project was created. |
| `description` | `string` | The description of the project. |
| `environment` | `string` | The environment of the project's resources. |
| `id` | `string` | The unique universal identifier of this project. |
| `is_default` | `boolean` | If true, all resources will be added to this project if no project is specified. |
| `name` | `string` | The human-readable name for the project. |
| `owner_id` | `number` | The integer id of the project owner. |
| `owner_uuid` | `string` | The unique universal identifier of the project owner. |
| `purpose` | `string` | The purpose of the project. |
| `updated_at` | `string` | A time value given in ISO8601 combined date and time format that represents when the project was updated. |

#### Example: Load

```ts
const project = await client.Project().load({ id: 'project_id' })
```

#### Example: List

```ts
const projects = await client.Project().list()
```

#### Example: Create

```ts
const project = await client.Project().create({
})
```


### ProjectResource

Create an instance: `const project_resource = client.ProjectResource()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `assigned_at` | `string` | A time value given in ISO8601 combined date and time format that represents when the project was created. |
| `id` | `string` |  |
| `links` | `Record<string, any>` | The links object contains the `self` object, which contains the resource relationship. |
| `resources` | `any[]` | All resources, including the ones added in the request, that are assigned to the project. |
| `status` | `string` | The status of assigning and fetching the resources. |
| `urn` | `string` | The uniform resource name (URN) for the resource in the format do:resource_type:resource_id. |

#### Example: List

```ts
const project_resources = await client.ProjectResource().list({ id: "example" })
```

#### Example: Create

```ts
const project_resource = await client.ProjectResource().create({
  id: 'example_id',
})
```


### PromQuery

Create an instance: `const prom_query = client.PromQuery()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `result` | `any` | Result payload shape depends on `resultType`. |
| `resultType` | `string` |  |

#### Example: Load

```ts
const prom_query = await client.PromQuery().load({ query_id: 'query_id', query: 'query' })
```

#### Example: Create

```ts
const prom_query = await client.PromQuery().create({
  query_id: 'example_query_id',
  result: 'example_result',
  resultType: 'example_resultType',
})
```


### PromQueryRange

Create an instance: `const prom_query_range = client.PromQueryRange()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `result` | `any[]` | One entry per matching series, each carrying the samples evaluated at every step across the requested range. |
| `resultType` | `string` |  |

#### Example: Load

```ts
const prom_query_range = await client.PromQueryRange().load({ query_id: 'query_id', end: 'end', query: 'query', start: 'start', step: 'step' })
```

#### Example: Create

```ts
const prom_query_range = await client.PromQueryRange().create({
  query_id: 'example_query_id',
  result: [],
  resultType: 'example_resultType',
})
```


### PromSeries

Create an instance: `const prom_series = client.PromSeries()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `data` | `any[]` |  |
| `status` | `string` |  |

#### Example: List

```ts
const prom_seriess = await client.PromSeries().list({ query_id: "example", match: [] })
```

#### Example: Create

```ts
const prom_series = await client.PromSeries().create({
  query_id: 'example_query_id',
  data: [],
  status: 'example_status',
})
```


### PromStringList

Create an instance: `const prom_string_list = client.PromStringList()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `data` | `any[]` |  |
| `status` | `string` |  |

#### Example: List

```ts
const prom_string_lists = await client.PromStringList().list({ query_id: "example" })
```

#### Example: Create

```ts
const prom_string_list = await client.PromStringList().create({
  query_id: 'example_query_id',
  data: [],
  status: 'example_status',
})
```


### Region

Create an instance: `const region = client.Region()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `available` | `boolean` | This is a boolean value that represents whether new Droplets can be created in this region. |
| `features` | `any[]` | This attribute is set to an array which contains features available in this region |
| `name` | `string` | The display name of the region. |
| `sizes` | `any[]` | This attribute is set to an array which contains the identifying slugs for the sizes available in this region. |
| `slug` | `string` | A human-readable string that is used as a unique identifier for each region. |

#### Example: List

```ts
const regions = await client.Region().list()
```


### ReservedIPv6

Create an instance: `const reserved_i_pv6 = client.ReservedIPv6()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `droplet` | `any` | Requires `droplet:read` scope. |
| `ip` | `string` | The public IP address of the reserved IPv6. |
| `region_slug` | `string` | The region that the reserved IPv6 is reserved to. |
| `reserved_at` | `string` | The date and time when the reserved IPv6 was reserved. |

#### Example: Load

```ts
const reserved_i_pv6 = await client.ReservedIPv6().load({ reserved_ipv6: 'reserved_ipv6' })
```

#### Example: List

```ts
const reserved_i_pv6s = await client.ReservedIPv6().list()
```

#### Example: Create

```ts
const reserved_i_pv6 = await client.ReservedIPv6().create({
})
```


### ReservedIPv6Action

Create an instance: `const reserved_i_pv6_action = client.ReservedIPv6Action()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `action` | `Record<string, any>` |  |

#### Example: Create

```ts
const reserved_i_pv6_action = await client.ReservedIPv6Action().create({
  reserved_ipv6_id: 'example_reserved_ipv6_id',
})
```


### ReservedIp

Create an instance: `const reserved_ip = client.ReservedIp()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `droplet` | `any` | The Droplet that the reserved IP has been assigned to. |
| `id` | `string` |  |
| `ip` | `string` | The public IP address of the reserved IP. |
| `links` | `Record<string, any>` |  |
| `locked` | `boolean` | A boolean value indicating whether or not the reserved IP has pending actions preventing new ones from being submitted. |
| `project_id` | `string` | The UUID of the project to which the reserved IP currently belongs.<br><br>Requires `project:read` scope. |
| `region` | `any` |  |
| `reserved_ip` | `Record<string, any>` |  |

#### Example: Load

```ts
const reserved_ip = await client.ReservedIp().load({ id: 'reserved_ip_id' })
```

#### Example: List

```ts
const reserved_ips = await client.ReservedIp().list()
```

#### Example: Create

```ts
const reserved_ip = await client.ReservedIp().create({
})
```


### ReservedIpAction

Create an instance: `const reserved_ip_action = client.ReservedIpAction()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `action` | `Record<string, any>` |  |
| `completed_at` | `string` | A time value given in ISO8601 combined date and time format that represents when the action was completed. |
| `id` | `number` | A unique numeric ID that can be used to identify and reference an action. |
| `project_id` | `string` | The UUID of the project to which the reserved IP currently belongs. |
| `region` | `Record<string, any>` |  |
| `region_slug` | `string` | A human-readable string that is used as a unique identifier for each region. |
| `resource_id` | `number` | A unique identifier for the resource that the action is associated with. |
| `resource_type` | `string` | The type of resource that the action is associated with. |
| `started_at` | `string` | A time value given in ISO8601 combined date and time format that represents when the action was initiated. |
| `status` | `string` | The current status of the action. |
| `type` | `string` | This is the type of action that the object represents. |

#### Example: Load

```ts
const reserved_ip_action = await client.ReservedIpAction().load({ id: 1, reserved_ip_id: 'reserved_ip_id' })
```

#### Example: List

```ts
const reserved_ip_actions = await client.ReservedIpAction().list({ id: "example_id" })
```

#### Example: Create

```ts
const reserved_ip_action = await client.ReservedIpAction().create({
  id: 'example_id',
  region: {},
})
```


### Resync

Create an instance: `const resync = client.Resync()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `authorization` | `any` | Set when discovery could not run because `user_id` has no authorized connection to this server yet. |
| `mcpServer` | `any` | The server, including `syncStatus` and `syncError`. |
| `pending` | `boolean` | True when discovery is still running (HTTP 202). |
| `tools` | `any[]` | Every tool discovered on the server when discovery finished in time; empty when pending is true. |
| `user_id` | `string` | Required for a server registered with `credentialRefSource` connection: discovery reaches the server as this user, through their connection, because such a server has no team-wide credential. |

#### Example: Create

```ts
const resync = await client.Resync().create({
  server_ref: 'example_server_ref',
})
```


### Search

Create an instance: `const search = client.Search()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `actorId` | `string` | Empty when the session is not bound to an actor. |
| `agentName` | `string` | Name of the agent that started the session. |
| `agentUrn` | `string` | URN of the agent that started the session. |
| `auth_type` | `string` | Deprecated: read `auth_types`, since a provider may accept more than one credential kind. |
| `auth_types` | `any[]` | Credential kinds the provider accepts, sorted: none|oauth|`shared_api_key`|unknown|`user_oauth_app`|`user_token`. |
| `config` | `Record<string, any>` | Session options as supplied at creation. |
| `connection_parameters` | `any[]` | Non-sensitive values collected when creating a connection. |
| `createdAt` | `string` | When the session was created. |
| `credential_parameters` | `any[]` | Non-secret values collected when registering an API key provider credential. |
| `description` | `string` | Description of the latest version. |
| `display_name` | `string` | Human-readable label of the latest version. |
| `insights` | `any` | Omitted when no explicit customer Insights choice was stored. |
| `latest_version` | `string` | Latest version number, as a string. |
| `name` | `string` | The required human-readable session name. |
| `network` | `any` | Omitted when the request omitted network. |
| `oauth_client_setup_url` | `string` | HTTPS page at the provider where a team creates that OAuth client, such as its developer console or setup guide. |
| `oauth_redirect_url` | `string` | Callback URL a team must register with the provider when it creates its own OAuth client. |
| `owning_user_id` | `string` | DigitalOcean user ID of the user who created the session, when recorded. |
| `policy` | `any` | The session's tool-permission policy. |
| `reference_latest` | `string` | The toolbelt name, which refers to whichever version is latest. |
| `scopes` | `any[]` | The OAuth scopes a connection may request; a connection that requests none gets all of them. |
| `sessionUrn` | `string` | Session URN, for example `do:managed_agent_session:<uuid>`. |
| `status` | `string` | active, or deprecated once the toolbelt is deleted. |
| `tool_count` | `number` | Number of members in the latest version. |
| `tools` | `Record<string, any>` | Omitted when the request omitted tools (all tools). |
| `updatedAt` | `string` | When the session was last modified. |
| `updated_at` | `string` | When the latest version was last modified, in RFC 3339 format. |
| `version_count` | `number` | Number of versions recorded under this name, including versions from before the toolbelt was deleted and the name reused. |

#### Example: List

```ts
const searchs = await client.Search().list()
```


### Security

Create an instance: `const security = client.Security()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `created_at` | `string` | When scan was created. |
| `findings` | `any[]` |  |
| `id` | `string` | The unique identifier for the scan. |
| `name` | `string` | The name of the affected resource. |
| `resource` | `string` | The URN of a resource to exclude from future scans. |
| `resources` | `any[]` | The URNs of resources to suppress for the rule. |
| `rule_uuid` | `string` | The rule UUID to suppress for the listed resources. |
| `status` | `string` | The status of the scan. |
| `tier_coverage` | `Record<string, any>` | Scan coverage for each available plan tier. |
| `type` | `string` | The type of the affected resource. |
| `urn` | `string` | The URN for the affected resource. |

#### Example: Load

```ts
const security = await client.Security().load({ scan_id: 'scan_id' })
```

#### Example: List

```ts
const securitys = await client.Security().list({ finding_id: "example", scan_id: "example" })
```

#### Example: Create

```ts
const security = await client.Security().create({
})
```


### Setting

Create an instance: `const setting = client.Setting()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `plan_downgrades` | `Record<string, any>` |  |
| `settings` | `Record<string, any>` |  |
| `tier_coverage` | `Record<string, any>` |  |

#### Example: Load

```ts
const setting = await client.Setting().load()
```


### Size

Create an instance: `const size = client.Size()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `available` | `boolean` | This is a boolean value that represents whether new Droplets can be created with this size. |
| `description` | `string` | A string describing the class of Droplets created from this size. |
| `disk` | `number` | The amount of disk space set aside for Droplets of this size. |
| `disk_info` | `any[]` | An array of objects containing information about the disks available to Droplets created with this size. |
| `gpu_info` | `Record<string, any>` | An object containing information about the GPU capabilities of Droplets created with this size. |
| `memory` | `number` | The amount of RAM allocated to Droplets created of this size. |
| `price_hourly` | `number` | This describes the price of the Droplet size as measured hourly. |
| `price_monthly` | `number` | This attribute describes the monthly cost of this Droplet size if the Droplet is kept for an entire month. |
| `regions` | `any[]` | An array containing the region slugs where this size is available for Droplet creates. |
| `slug` | `string` | A human-readable string that is used to uniquely identify each size. |
| `transfer` | `number` | The amount of transfer bandwidth that is available for Droplets created in this size. |
| `vcpus` | `number` | The number of CPUs allocated to Droplets of this size. |

#### Example: List

```ts
const sizes = await client.Size().list()
```


### Snapshot

Create an instance: `const snapshot = client.Snapshot()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `created_at` | `string` | A time value given in ISO8601 combined date and time format that represents when the snapshot was created. |
| `id` | `string` | The unique identifier for the snapshot. |
| `min_disk_size` | `number` | The minimum size in GB required for a volume or Droplet to use this snapshot. |
| `name` | `string` | A human-readable name for the snapshot. |
| `regions` | `any[]` | An array of the regions that the snapshot is available in. |
| `resource_id` | `string` | The unique identifier for the resource that the snapshot originated from. |
| `resource_type` | `string` | The type of resource that the snapshot originated from. |
| `size_gigabytes` | `number` | The billable size of the snapshot in gigabytes. |
| `tags` | `any[]` | An array of Tags the snapshot has been tagged with.<br><br>Requires `tag:read` scope. |

#### Example: Load

```ts
const snapshot = await client.Snapshot().load({ id: 'snapshot_id' })
```

#### Example: List

```ts
const snapshots = await client.Snapshot().list()
```


### SpacesKey

Create an instance: `const spaces_key = client.SpacesKey()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `patch(data)` | Change part of an existing entity. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `access_key` | `string` | The Access Key ID used to access a bucket. |
| `created_at` | `string` | The date and time the key was created. |
| `grants` | `any[]` | The list of permissions for the access key. |
| `id` | `string` |  |
| `keys` | `any[]` |  |
| `name` | `string` | The access key's name. |

#### Example: Load

```ts
const spaces_key = await client.SpacesKey().load({ id: 'spaces_key_id' })
```

#### Example: List

```ts
const spaces_keys = await client.SpacesKey().list()
```

#### Example: Create

```ts
const spaces_key = await client.SpacesKey().create({
})
```


### SqlMode

Create an instance: `const sql_mode = client.SqlMode()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `sql_mode` | `string` | A string specifying the configured SQL modes for the MySQL cluster. |

#### Example: Load

```ts
const sql_mode = await client.SqlMode().load({ database_id: 'database_id' })
```


### SshKey

Create an instance: `const ssh_key = client.SshKey()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `fingerprint` | `string` | A unique identifier that differentiates this key from other keys using a format that SSH recognizes. |
| `id` | `number` | A unique identification number for this key. |
| `name` | `string` | A human-readable display name for this key, used to easily identify the SSH keys when they are displayed. |
| `public_key` | `string` | The entire public key string that was uploaded. |

#### Example: Load

```ts
const ssh_key = await client.SshKey().load({ id: 'ssh_key_id' })
```

#### Example: List

```ts
const ssh_keys = await client.SshKey().list()
```

#### Example: Create

```ts
const ssh_key = await client.SshKey().create({
  name: 'example_name',
  public_key: 'example_public_key',
})
```


### Systemone

Create an instance: `const systemone = client.Systemone()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `answers` | `Record<string, any>` | A map of question name to answer, using the same keys as the request's `questions` object. |
| `model` | `string` | Model ID that produced the response. |
| `questions` | `Record<string, any>` | A map of question name to question definition. |
| `state` | `string` | The state to evaluate. |
| `usage` | `Record<string, any>` | Token usage for the request. |

#### Example: Create

```ts
const systemone = await client.Systemone().create({
  answers: {},
  model: 'example_model',
  questions: {},
  state: 'example_state',
  usage: {},
})
```


### Tag

Create an instance: `const tag = client.Tag()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |
| `name` | `string` | The name of the tag. |
| `resources` | `Record<string, any>` | An embedded object containing key value pairs of resource type and resource statistics. |

#### Example: Load

```ts
const tag = await client.Tag().load({ id: 'tag_id' })
```

#### Example: List

```ts
const tags = await client.Tag().list()
```

#### Example: Create

```ts
const tag = await client.Tag().create({
})
```


### Tool

Create an instance: `const tool = client.Tool()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `category` | `string` | Best-effort catalog metadata and is empty for a large share of the catalog. |
| `description` | `string` | What the tool does. |
| `history` | `Record<string, any>` | Present only when the request set `include_history`. |
| `id` | `string` |  |
| `name` | `string` | The unqualified tool name, without the provider prefix. |
| `provider` | `string` | The ID of the provider that offers the tool, broken out so a client never has to split `tool_slug`. |
| `snapshot` | `any` | When the metrics were computed and the window they cover. |
| `title` | `string` | Human-readable tool title. |
| `tool` | `any` | The tool's metrics over the window. |
| `tool_slug` | `string` | The provider-qualified, stable tool identifier (`<provider>_<name>`). |
| `version` | `number` | The version this toolbelt version pins for the member, matching the `@<version>` suffix in the corresponding toolbelt.tools entry. |

#### Example: Load

```ts
const tool = await client.Tool().load({ id: 'tool_id' })
```

#### Example: List

```ts
const tools = await client.Tool().list({ name: "example", provider_id: "example" })
```


### Toolbelt

Create an instance: `const toolbelt = client.Toolbelt()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `created_at` | `string` | When this version was created, in RFC 3339 format. |
| `description` | `string` | Team-authored description. |
| `display_name` | `string` | Human-readable label. |
| `id` | `string` |  |
| `latest_version` | `string` | Latest version number, as a string. |
| `name` | `string` | Toolbelt name, unique among your team's active toolbelts. |
| `next_page_token` | `string` | Token for the next page of `tool_details`; empty on the last page. |
| `reference` | `string` | `<name>@<version>`, identifying this exact version. |
| `reference_latest` | `string` | The toolbelt name, which refers to whichever version is latest. |
| `status` | `string` | active, or deprecated once the toolbelt is deleted. |
| `tool_count` | `number` | Number of entries in tools. |
| `tool_details` | `any[]` | The requested page of resolved catalog metadata for the members named in toolbelt.tools. |
| `toolbelt` | `any` | The requested toolbelt version. |
| `tools` | `any[]` | Members, sorted, each as `<tool_slug>@<version>`: the tool and the version this toolbelt version pins. |
| `updated_at` | `string` | When this version was last modified, in RFC 3339 format. |
| `version` | `string` | Version number of this toolbelt version, as a string, for example `3`. |
| `version_count` | `number` | Number of versions recorded under this name, including versions from before the toolbelt was deleted and the name reused. |

#### Example: Load

```ts
const toolbelt = await client.Toolbelt().load({ id: 'toolbelt_id' })
```

#### Example: List

```ts
const toolbelts = await client.Toolbelt().list()
```

#### Example: Create

```ts
const toolbelt = await client.Toolbelt().create({
})
```


### Uptime

Create an instance: `const uptime = client.Uptime()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `comparison` | `string` | The comparison operator used against the alert's threshold. |
| `enabled` | `boolean` | A boolean value indicating whether the check is enabled/disabled. |
| `id` | `string` | A unique ID that can be used to identify and reference the alert. |
| `name` | `string` | A human-friendly display name. |
| `notifications` | `Record<string, any>` | The notification settings for a trigger alert. |
| `period` | `string` | Period of time the threshold must be exceeded to trigger the alert. |
| `previous_outage` | `Record<string, any>` |  |
| `regions` | `any[]` | An array containing the selected regions to perform healthchecks from. |
| `target` | `string` | The endpoint to perform healthchecks on. |
| `threshold` | `number` | The threshold at which the alert will enter a trigger state. |
| `type` | `string` | The type of alert. |

#### Example: Load

```ts
const uptime = await client.Uptime().load({ check_id: 'check_id' })
```

#### Example: List

```ts
const uptimes = await client.Uptime().list({ check_id: "example" })
```

#### Example: Create

```ts
const uptime = await client.Uptime().create({
  check_id: 'example_check_id',
  notifications: {},
})
```


### User

Create an instance: `const user = client.User()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `connections` | `any[]` | The user's connections that are not revoked, sorted by provider. |
| `groups` | `any[]` | A list of in-cluster groups that the user belongs to. |
| `id` | `string` |  |
| `pagination` | `any` | Paging applied to this response and the total number of users. |
| `sessions` | `any[]` | Sessions bound to the user, oldest first. |
| `user_id` | `string` | The user ID: a session `actor_id` or a connection `user_id`. |
| `user_ids` | `any[]` | User IDs on this page. |
| `username` | `string` | The username for the cluster admin user. |

#### Example: Load

```ts
const user = await client.User().load({ id: 'user_id' })
```

#### Example: List

```ts
const users = await client.User().list()
```


### VectorDatabase

Create an instance: `const vector_database = client.VectorDatabase()`

#### Operations

| Method | Description |
| --- | --- |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |


### VectordbBackup

Create an instance: `const vectordb_backup = client.VectordbBackup()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `backup_id` | `string` | Unique identifier for the backup (e.g., "vectordb-{uuid}-20240101-120000"). |
| `completed_at` | `string` | Timestamp when the backup process completed. |
| `started_at` | `string` | Timestamp when the backup process started. |
| `status` | `string` | Status of the backup: SUCCESS. |

#### Example: List

```ts
const vectordb_backups = await client.VectordbBackup().list({ vector_database_id: "example" })
```


### VectordbGetRestoreStatus

Create an instance: `const vectordb_get_restore_status = client.VectordbGetRestoreStatus()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `backup_id` | `string` | The backup ID being restored. |
| `error` | `string` | Error message if the restore failed. |
| `status` | `string` | Current status: STARTED, TRANSFERRING, TRANSFERRED, FINALIZING, SUCCESS, FAILED, CANCELLING, CANCELED. |

#### Example: Load

```ts
const vectordb_get_restore_status = await client.VectordbGetRestoreStatus().load({ backup_id: 'backup_id', vector_database_id: 'vector_database_id' })
```


### VectordbGetVectorDb

Create an instance: `const vectordb_get_vector_db = client.VectordbGetVectorDb()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `config` | `Record<string, any>` | VectorDBConfig holds optional, advanced cluster settings. |
| `created_at` | `string` |  |
| `endpoints` | `Record<string, any>` | VectorDBEndpoints contains the connection endpoints for a vector database instance. |
| `forked_from_id` | `string` | ID of the vector database this instance was forked from. |
| `id` | `string` |  |
| `last_restore_id` | `string` | Backup_id of the most recent restore initiated against this instance. |
| `name` | `string` | Required. |
| `owner_uuid` | `string` |  |
| `project_id` | `string` | Project this database belongs to. |
| `region` | `string` | Required. |
| `size` | `string` | Resource tier: small, medium, or large. |
| `status` | `string` | Lifecycle state: pending, creating, active, errored, or deleting. |
| `tags` | `any[]` | A set of arbitrary tags to organize your vector database |
| `updated_at` | `string` |  |

#### Example: Load

```ts
const vectordb_get_vector_db = await client.VectordbGetVectorDb().load({ id: 'vectordb_get_vector_db_id' })
```

#### Example: List

```ts
const vectordb_get_vector_dbs = await client.VectordbGetVectorDb().list()
```

#### Example: Create

```ts
const vectordb_get_vector_db = await client.VectordbGetVectorDb().create({
})
```


### VectordbGetVectorDbAdminCredential

Create an instance: `const vectordb_get_vector_db_admin_credential = client.VectordbGetVectorDbAdminCredential()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `api_token` | `string` | API token for that user. |
| `user_id` | `string` | Database user id from the cluster secret (opaque; matches what was provisioned). |

#### Example: Load

```ts
const vectordb_get_vector_db_admin_credential = await client.VectordbGetVectorDbAdminCredential().load({ vector_database_id: 'vector_database_id' })
```


### VectordbRestoreBackup

Create an instance: `const vectordb_restore_backup = client.VectordbRestoreBackup()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `backup_id` | `string` | The backup ID being restored. |
| `id` | `string` | Required. |
| `status` | `string` | Initial status of the restore operation (e.g., "STARTED"). |

#### Example: Create

```ts
const vectordb_restore_backup = await client.VectordbRestoreBackup().create({
  backup_id: 'example_backup_id',
  vector_database_id: 'example_vector_database_id',
})
```


### VectordbUpdateVectorDb

Create an instance: `const vectordb_update_vector_db = client.VectordbUpdateVectorDb()`

#### Operations

| Method | Description |
| --- | --- |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `config` | `Record<string, any>` | VectorDBConfig holds optional, advanced cluster settings. |
| `created_at` | `string` |  |
| `endpoints` | `Record<string, any>` | VectorDBEndpoints contains the connection endpoints for a vector database instance. |
| `forked_from_id` | `string` | ID of the vector database this instance was forked from. |
| `id` | `string` | ID of the vector database. |
| `last_restore_id` | `string` | Backup_id of the most recent restore initiated against this instance. |
| `name` | `string` |  |
| `owner_uuid` | `string` |  |
| `project_id` | `string` | Project this database belongs to. |
| `region` | `string` |  |
| `size` | `string` | Resource tier: small, medium, or large. |
| `status` | `string` | Lifecycle state: pending, creating, active, errored, or deleting. |
| `tags` | `any[]` |  |
| `updated_at` | `string` |  |


### VectordbUpdateVectorDbTag

Create an instance: `const vectordb_update_vector_db_tag = client.VectordbUpdateVectorDbTag()`

#### Operations

| Method | Description |
| --- | --- |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `config` | `Record<string, any>` | VectorDBConfig holds optional, advanced cluster settings. |
| `created_at` | `string` |  |
| `endpoints` | `Record<string, any>` | VectorDBEndpoints contains the connection endpoints for a vector database instance. |
| `forked_from_id` | `string` | ID of the vector database this instance was forked from. |
| `id` | `string` | Required. |
| `last_restore_id` | `string` | Backup_id of the most recent restore initiated against this instance. |
| `name` | `string` |  |
| `owner_uuid` | `string` |  |
| `project_id` | `string` | Project this database belongs to. |
| `region` | `string` |  |
| `size` | `string` | Resource tier: small, medium, or large. |
| `status` | `string` | Lifecycle state: pending, creating, active, errored, or deleting. |
| `tags` | `any[]` | Tags to set on the vector database. |
| `updated_at` | `string` |  |


### Vpc

Create an instance: `const vpc = client.Vpc()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `patch(data)` | Change part of an existing entity. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `created_at` | `string` | A time value given in ISO8601 combined date and time format. |
| `default` | `boolean` | A boolean value indicating whether or not the VPC is the default network for the region. |
| `description` | `string` | A free-form text field for describing the VPC's purpose. |
| `id` | `string` | A unique ID that can be used to identify and reference the VPC. |
| `ip_range` | `string` | The range of IP addresses in the VPC in CIDR notation. |
| `name` | `string` | The name of the VPC. |
| `region` | `string` | The slug identifier for the region where the VPC will be created. |
| `status` | `string` | The current status of the VPC peering. |
| `urn` | `string` | The uniform resource name (URN) for the resource in the format do:resource_type:resource_id. |
| `vpc_ids` | `any[]` | An array of the two peered VPCs IDs. |

#### Example: Load

```ts
const vpc = await client.Vpc().load({ id: 'vpc_id' })
```

#### Example: List

```ts
const vpcs = await client.Vpc().list()
```

#### Example: Create

```ts
const vpc = await client.Vpc().create({
})
```


### VpcNatGateway

Create an instance: `const vpc_nat_gateway = client.VpcNatGateway()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `created_at` | `string` | A time value given in ISO8601 combined date and time format that represents when the VPC NAT gateway was created. |
| `egresses` | `Record<string, any>` | An object containing egress information for the VPC NAT gateway. |
| `icmp_timeout_seconds` | `number` | The ICMP timeout in seconds for the VPC NAT gateway. |
| `id` | `string` | The unique identifier for the VPC NAT gateway. |
| `name` | `string` | The human-readable name of the VPC NAT gateway. |
| `region` | `string` | The region in which the VPC NAT gateway is created. |
| `size` | `number` | The size of the VPC NAT gateway. |
| `state` | `string` | The current state of the VPC NAT gateway. |
| `tcp_timeout_seconds` | `number` | The TCP timeout in seconds for the VPC NAT gateway. |
| `type` | `string` | The type of the VPC NAT gateway. |
| `udp_timeout_seconds` | `number` | The UDP timeout in seconds for the VPC NAT gateway. |
| `updated_at` | `string` | A time value given in ISO8601 combined date and time format that represents when the VPC NAT gateway was last updated. |
| `vpcs` | `any[]` | An array of VPCs associated with the VPC NAT gateway. |

#### Example: Load

```ts
const vpc_nat_gateway = await client.VpcNatGateway().load({ id: 'vpc_nat_gateway_id' })
```

#### Example: List

```ts
const vpc_nat_gateways = await client.VpcNatGateway().list()
```

#### Example: Create

```ts
const vpc_nat_gateway = await client.VpcNatGateway().create({
})
```


### VpcPeering

Create an instance: `const vpc_peering = client.VpcPeering()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `created_at` | `string` | A time value given in ISO8601 combined date and time format. |
| `id` | `string` | A unique ID that can be used to identify and reference the VPC peering. |
| `name` | `string` | The name of the VPC peering. |
| `status` | `string` | The current status of the VPC peering. |
| `vpc_ids` | `any[]` | An array of the two peered VPCs IDs. |

#### Example: Load

```ts
const vpc_peering = await client.VpcPeering().load({ id: 'vpc_peering_id' })
```

#### Example: List

```ts
const vpc_peerings = await client.VpcPeering().list()
```

#### Example: Create

```ts
const vpc_peering = await client.VpcPeering().create({
})
```


### VpcRoutesPublicPreview

Create an instance: `const vpc_routes__public_preview = client.VpcRoutesPublicPreview()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `created_at` | `string` | The time when the route was created. |
| `destination_cidr` | `string` | A valid IPv4 CIDR accepted by the VPC routing product. |
| `id` | `string` | The unique identifier of the route. |
| `modifiable` | `boolean` | Whether the caller can update or delete the route. |
| `target_urns` | `any[]` | The URNs of supported next-hop resources. |
| `type` | `string` | The route type inferred from how the route is sourced. |

#### Example: List

```ts
const vpc_routes__public_previews = await client.VpcRoutesPublicPreview().list({ subnet_id: "example", vpc_id: "example" })
```

#### Example: Create

```ts
const vpc_routes__public_preview = await client.VpcRoutesPublicPreview().create({
  subnet_id: 'example_subnet_id',
  vpc_id: 'example_vpc_id',
  destination_cidr: 'example_destination_cidr',
  id: 'example_id',
  target_urns: [],
  type: 'example_type',
})
```


### VpcSubnetsPublicPreview

Create an instance: `const vpc_subnets__public_preview = client.VpcSubnetsPublicPreview()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `created_at` | `string` | The time when the VPC subnet was created. |
| `default` | `boolean` | Whether this is the default subnet for the VPC. |
| `id` | `string` | The unique identifier of the VPC subnet. |
| `ip_range` | `string` | The IPv4 range assigned to the subnet in CIDR notation. |
| `meta` | `Record<string, any>` | Additional information about the VPC subnet. |
| `name` | `string` | The human-readable name of the VPC subnet. |
| `region` | `string` | The slug of the region containing the VPC subnet. |
| `type` | `string` | The type of the VPC subnet. |
| `urn` | `string` | The uniform resource name of the VPC subnet. |

#### Example: Load

```ts
const vpc_subnets__public_preview = await client.VpcSubnetsPublicPreview().load({ subnet_uuid: 'subnet_uuid', vpc_id: 'vpc_id' })
```

#### Example: List

```ts
const vpc_subnets__public_previews = await client.VpcSubnetsPublicPreview().list({ subnet_uuid: "example", vpc_id: "example" })
```

#### Example: Create

```ts
const vpc_subnets__public_preview = await client.VpcSubnetsPublicPreview().create({
  id: 'example_id',
  created_at: 'example_created_at',
  ip_range: 'example_ip_range',
  name: 'example_name',
  region: 'example_region',
  type: 'example_type',
  urn: 'example_urn',
})
```

## Features

This SDK ships 1 optional features. Each is **inactive until you
switch it on**, so an SDK you have not configured behaves exactly as if none of
them existed — no retries, no cache, no logging, no measurable overhead.

Activate a feature by name in the client options, alongside the options shown
above:

| Feature | What it does |
|---|---|
| [`test`](#test) | Test transport |

### test

Test transport.

| Option | Default |
|---|---|
| `active` | `false` |

Set `feature.test.active` to enable it, then override any of the options above.


## Open types

5 fields are carried as open values rather than typed structures.
This follows from the API definition, not from a gap in this SDK: the
definition describes them with untagged unions —
`oneOf`/`anyOf` branches with no `discriminator` — so it never states which
variant a given value is. Nothing can select a branch reliably, so the SDK
passes the value through unchanged rather than assert a shape the API does not
guarantee.

| Entity | Field | Variants | Nesting |
| --- | --- | --- | --- |
| `logsink` | `config` | 4 | 0 levels |
| `message` | `messages` | 4 | 10 levels |
| `billing` | `links` | 3 | 2 levels |
| `droplet` | `links` | 3 | 2 levels |
| `prom_query` | `result` | 3 | 6 levels |

These values round-trip unchanged — read them, modify them, send them back. If
the API adds a `discriminator` to the definition, regenerating will type them.
Every other field is typed normally.

## Advanced

> The sections above cover everyday use. The material below explains the
> SDK's internals — useful when extending it with custom features, but not
> needed for normal use.

### The operation pipeline

Every entity operation follows a six-stage pipeline. Each stage fires a
feature hook before executing:

```
PrePoint → PreSpec → PreRequest → PreResponse → PreResult → PreDone
```

- **PrePoint**: Resolves which API endpoint to call based on the
  operation name and entity configuration.
- **PreSpec**: Builds the HTTP spec — URL, method, headers, body —
  from the resolved point and the caller's parameters.
- **PreRequest**: Sends the HTTP request. Features can intercept here
  to replace the transport (as TestFeature does with mocks).
- **PreResponse**: Parses the raw HTTP response.
- **PreResult**: Extracts the business data from the parsed response.
- **PreDone**: Final stage before returning to the caller. Entity
  state (match, data) is updated here.

If any stage errors, the pipeline short-circuits and the error surfaces
to the caller — see [Error handling](#error-handling) for how that looks
in this language.

### Features and hooks

Features are the extension mechanism. A feature is an object with a
`hooks` map. Each hook key is a pipeline stage name, and the value is
a function that receives the context.

The SDK ships with built-in features:

- **TestFeature**: Test transport

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Module structure

```
digitalocean/
├── src/
│   ├── DigitaloceanSDK.ts        # Main SDK class
│   ├── entity/             # Entity implementations
│   ├── feature/            # Built-in features (Base, Test, Log)
│   └── utility/            # Utility functions
├── test/                   # Test suites
└── dist/                   # Compiled output
```

Import the SDK from the package root:

```ts
import { DigitaloceanSDK } from '@voxgig-sdk/digitalocean-sdk'
```

### Entity state

Entity instances are stateful. After a successful `list`, the entity
stores the returned data and match criteria internally. Subsequent
calls on the same instance can rely on this state.

```ts
const appsregion = client.AppsRegion()
await appsregion.list()

// appsregion.data() now returns the appsregion data from the last `list`
// appsregion.match() returns the last match criteria
```

Call `make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

The `direct` method gives full control over the HTTP request. Use it
for non-standard endpoints, bulk operations, or any path not modelled
as an entity. The `prepare` method is useful for debugging — it
shows exactly what `direct` would send.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
