# Digitalocean Python SDK



The Python SDK for the Digitalocean API — an entity-oriented client following Pythonic conventions.

The SDK exposes the API as capitalised, semantic **Entities** — for example `client.AccessPoint()` — each
carrying a small, uniform set of operations (`list`, `load`, `create`, `update`, `patch`, `remove`) instead of raw URL
paths and query strings. You work with named resources and verbs, which
keeps the cognitive load low.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to PyPI. Install it from the GitHub
release tag (`py/vX.Y.Z`, see [Tags](https://github.com/pratik-mahalle/digitalocean-sdk/tags)) or
from a source checkout:

```bash
pip install -e .
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```python
import os
from digitalocean_sdk import DigitaloceanSDK

client = DigitaloceanSDK({
    "apikey": os.environ.get("DIGITALOCEAN_APIKEY"),
})
```

### 2. List accesspoint records

`list()` returns a `list` of records (each a `dict`) and raises on
error — iterate it directly.

```python
try:
    accesspoints = client.AccessPoint().list({"share_id": "example"})
    for accesspoint in accesspoints:
        print(accesspoint)
except Exception as err:
    print(f"list failed: {err}")
```

### 3. Load an addon

AddOn is nested under resource_uuid, so provide the `resource_uuid`.
`load()` returns the ENTITY — call data_get() for the record — and raises on error.

```python
try:
    addon = client.AddOn().load({"resource_uuid": "example_resource_uuid"})
    print(addon)
except Exception as err:
    print(f"load failed: {err}")
```

### 4. Create, update, and remove

```python
# Create — returns the ENTITY (call data_get() for the record)
created = client.AccessPoint().create({"share_id": "example_share_id", "access_policy": {}, "created_at": "example_created_at", "id": "example_id", "is_default": True, "name": "example_name", "path": "example_path", "status": "example_status", "updated_at": "example_updated_at"})

# Remove
client.AccessPoint().remove({"id": created.data_get()["id"]})
```


## Error handling

Entity operations raise on failure, so wrap them in `try` / `except`:

```python
try:
    appsregions = client.AppsRegion().list()
    print(appsregions)
except Exception as err:
    print(f"list failed: {err}")
```

`direct()` does **not** raise — it returns the result envelope. Branch
on `ok`; on failure `status` holds the HTTP status (for error responses)
and `err` holds a transport error, so read both defensively:

```python
result = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example_id"},
})

if not result["ok"]:
    print("request failed:", result.get("status"), result.get("err"))
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```python
result = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example"},
})

if result["ok"]:
    print(result["status"])  # 200
    print(result["data"])    # response body
else:
    # A non-2xx response carries status + data (the error body); a
    # transport-level failure carries err instead. Only one is present, so
    # read both with .get() rather than indexing a key that may be absent.
    print(result.get("status"), result.get("err"))
```

### Prepare a request without sending it

```python
# prepare() returns the fetch definition and raises on error.
fetchdef = client.prepare({
    "path": "/api/resource/{id}",
    "method": "DELETE",
    "params": {"id": "example"},
})

print(fetchdef["url"])
print(fetchdef["method"])
print(fetchdef["headers"])
```

### Use test mode

Create a mock client for unit testing — no server required:

```python
client = DigitaloceanSDK.test()

# Entity ops return the ENTITY and raises on error;
# call data_get() for the record.
appsregion = client.AppsRegion().list()
# appsregion contains the mock response record
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```python
def mock_fetch(url, init):
    return {
        "status": 200,
        "statusText": "OK",
        "headers": {},
        "json": lambda: {"id": "mock01"},
    }, None

client = DigitaloceanSDK({
    "base": "http://localhost:8080",
    "system": {
        "fetch": mock_fetch,
    },
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
cd py && pytest test/
```


## Reference

### DigitaloceanSDK

```python
from digitalocean_sdk import DigitaloceanSDK

client = DigitaloceanSDK(options)
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `apikey` | `str` | API key for authentication. |
| `base` | `str` | Base URL of the API server. |
| `prefix` | `str` | URL path prefix prepended to all requests. |
| `suffix` | `str` | URL path suffix appended to all requests. |
| `feature` | `dict` | Feature activation flags. |
| `extend` | `list` | Additional Feature instances to load. |
| `system` | `dict` | System overrides (e.g. custom `fetch` function). |

### test

```python
client = DigitaloceanSDK.test(testopts, sdkopts)
```

Creates a test-mode client with mock transport. Both arguments may be `None`.

### DigitaloceanSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `() -> dict` | Deep copy of current SDK options. |
| `get_utility` | `() -> Utility` | Copy of the SDK utility object. |
| `prepare` | `(fetchargs) -> dict` | Build an HTTP request definition without sending. Raises on error. |
| `direct` | `(fetchargs) -> dict` | Build and send an HTTP request. Returns a result dict (branch on `ok`). |
| `AccessPoint` | `(data) -> AccessPointEntity` | Create an AccessPoint entity instance. |
| `Account` | `(data) -> AccountEntity` | Create an Account entity instance. |
| `Action` | `(data) -> ActionEntity` | Create an Action entity instance. |
| `ActorLimit` | `(data) -> ActorLimitEntity` | Create an ActorLimit entity instance. |
| `AddOn` | `(data) -> AddOnEntity` | Create an AddOn entity instance. |
| `ApiAgentVersion` | `(data) -> ApiAgentVersionEntity` | Create an ApiAgentVersion entity instance. |
| `ApiCreateAgentApiKeyOutput` | `(data) -> ApiCreateAgentApiKeyOutputEntity` | Create an ApiCreateAgentApiKeyOutput entity instance. |
| `ApiCreateDataSourceFileUploadPresignedUrlsOutput` | `(data) -> ApiCreateDataSourceFileUploadPresignedUrlsOutputEntity` | Create an ApiCreateDataSourceFileUploadPresignedUrlsOutput entity instance. |
| `ApiCreateKnowledgeBaseDataSourceOutput` | `(data) -> ApiCreateKnowledgeBaseDataSourceOutputEntity` | Create an ApiCreateKnowledgeBaseDataSourceOutput entity instance. |
| `ApiCreateScenarioSetFromLibraryOutput` | `(data) -> ApiCreateScenarioSetFromLibraryOutputEntity` | Create an ApiCreateScenarioSetFromLibraryOutput entity instance. |
| `ApiDeleteAgentApiKeyOutput` | `(data) -> ApiDeleteAgentApiKeyOutputEntity` | Create an ApiDeleteAgentApiKeyOutput entity instance. |
| `ApiDeleteAgentOutput` | `(data) -> ApiDeleteAgentOutputEntity` | Create an ApiDeleteAgentOutput entity instance. |
| `ApiDeleteAnthropicApiKeyOutput` | `(data) -> ApiDeleteAnthropicApiKeyOutputEntity` | Create an ApiDeleteAnthropicApiKeyOutput entity instance. |
| `ApiDeleteCustomEvaluationMetricOutput` | `(data) -> ApiDeleteCustomEvaluationMetricOutputEntity` | Create an ApiDeleteCustomEvaluationMetricOutput entity instance. |
| `ApiDeleteCustomModelOutputPublic` | `(data) -> ApiDeleteCustomModelOutputPublicEntity` | Create an ApiDeleteCustomModelOutputPublic entity instance. |
| `ApiDeleteEvaluationDatasetOutput` | `(data) -> ApiDeleteEvaluationDatasetOutputEntity` | Create an ApiDeleteEvaluationDatasetOutput entity instance. |
| `ApiDeleteKnowledgeBaseDataSourceOutput` | `(data) -> ApiDeleteKnowledgeBaseDataSourceOutputEntity` | Create an ApiDeleteKnowledgeBaseDataSourceOutput entity instance. |
| `ApiDeleteKnowledgeBaseOutput` | `(data) -> ApiDeleteKnowledgeBaseOutputEntity` | Create an ApiDeleteKnowledgeBaseOutput entity instance. |
| `ApiDeleteModelApiKeyOutput` | `(data) -> ApiDeleteModelApiKeyOutputEntity` | Create an ApiDeleteModelApiKeyOutput entity instance. |
| `ApiDeleteModelEvaluationPresetOutput` | `(data) -> ApiDeleteModelEvaluationPresetOutputEntity` | Create an ApiDeleteModelEvaluationPresetOutput entity instance. |
| `ApiDeleteModelEvaluationRunOutputPublic` | `(data) -> ApiDeleteModelEvaluationRunOutputPublicEntity` | Create an ApiDeleteModelEvaluationRunOutputPublic entity instance. |
| `ApiDeleteModelRouterOutput` | `(data) -> ApiDeleteModelRouterOutputEntity` | Create an ApiDeleteModelRouterOutput entity instance. |
| `ApiDeleteOpenAiapiKeyOutput` | `(data) -> ApiDeleteOpenAiapiKeyOutputEntity` | Create an ApiDeleteOpenAiapiKeyOutput entity instance. |
| `ApiDeleteScenarioSetOutput` | `(data) -> ApiDeleteScenarioSetOutputEntity` | Create an ApiDeleteScenarioSetOutput entity instance. |
| `ApiDeleteScheduledIndexingOutput` | `(data) -> ApiDeleteScheduledIndexingOutputEntity` | Create an ApiDeleteScheduledIndexingOutput entity instance. |
| `ApiDeleteSimulationRunOutput` | `(data) -> ApiDeleteSimulationRunOutputEntity` | Create an ApiDeleteSimulationRunOutput entity instance. |
| `ApiDeleteWorkspaceOutput` | `(data) -> ApiDeleteWorkspaceOutputEntity` | Create an ApiDeleteWorkspaceOutput entity instance. |
| `ApiDropboxOauth2GetTokensOutput` | `(data) -> ApiDropboxOauth2GetTokensOutputEntity` | Create an ApiDropboxOauth2GetTokensOutput entity instance. |
| `ApiGenerateOauth2UrlOutput` | `(data) -> ApiGenerateOauth2UrlOutputEntity` | Create an ApiGenerateOauth2UrlOutput entity instance. |
| `ApiGenerateScenarioSetOutput` | `(data) -> ApiGenerateScenarioSetOutputEntity` | Create an ApiGenerateScenarioSetOutput entity instance. |
| `ApiGetAgentOutput` | `(data) -> ApiGetAgentOutputEntity` | Create an ApiGetAgentOutput entity instance. |
| `ApiGetAgentUsageOutput` | `(data) -> ApiGetAgentUsageOutputEntity` | Create an ApiGetAgentUsageOutput entity instance. |
| `ApiGetAnthropicApiKeyOutput` | `(data) -> ApiGetAnthropicApiKeyOutputEntity` | Create an ApiGetAnthropicApiKeyOutput entity instance. |
| `ApiGetChildrenOutput` | `(data) -> ApiGetChildrenOutputEntity` | Create an ApiGetChildrenOutput entity instance. |
| `ApiGetCustomModelOutputPublic` | `(data) -> ApiGetCustomModelOutputPublicEntity` | Create an ApiGetCustomModelOutputPublic entity instance. |
| `ApiGetEvaluationDatasetDownloadUrlOutput` | `(data) -> ApiGetEvaluationDatasetDownloadUrlOutputEntity` | Create an ApiGetEvaluationDatasetDownloadUrlOutput entity instance. |
| `ApiGetEvaluationRunOutput` | `(data) -> ApiGetEvaluationRunOutputEntity` | Create an ApiGetEvaluationRunOutput entity instance. |
| `ApiGetEvaluationRunResultsOutput` | `(data) -> ApiGetEvaluationRunResultsOutputEntity` | Create an ApiGetEvaluationRunResultsOutput entity instance. |
| `ApiGetEvaluationTestCaseOutput` | `(data) -> ApiGetEvaluationTestCaseOutputEntity` | Create an ApiGetEvaluationTestCaseOutput entity instance. |
| `ApiGetIndexingJobDetailsSignedUrlOutput` | `(data) -> ApiGetIndexingJobDetailsSignedUrlOutputEntity` | Create an ApiGetIndexingJobDetailsSignedUrlOutput entity instance. |
| `ApiGetKnowledgeBaseIndexingJobOutput` | `(data) -> ApiGetKnowledgeBaseIndexingJobOutputEntity` | Create an ApiGetKnowledgeBaseIndexingJobOutput entity instance. |
| `ApiGetKnowledgeBaseOutput` | `(data) -> ApiGetKnowledgeBaseOutputEntity` | Create an ApiGetKnowledgeBaseOutput entity instance. |
| `ApiGetModelEvaluationRunOutput` | `(data) -> ApiGetModelEvaluationRunOutputEntity` | Create an ApiGetModelEvaluationRunOutput entity instance. |
| `ApiGetModelEvaluationRunResultsDownloadUrlOutput` | `(data) -> ApiGetModelEvaluationRunResultsDownloadUrlOutputEntity` | Create an ApiGetModelEvaluationRunResultsDownloadUrlOutput entity instance. |
| `ApiGetModelRouterOutput` | `(data) -> ApiGetModelRouterOutputEntity` | Create an ApiGetModelRouterOutput entity instance. |
| `ApiGetOpenAiapiKeyOutput` | `(data) -> ApiGetOpenAiapiKeyOutputEntity` | Create an ApiGetOpenAiapiKeyOutput entity instance. |
| `ApiGetScenarioSetDownloadUrlOutput` | `(data) -> ApiGetScenarioSetDownloadUrlOutputEntity` | Create an ApiGetScenarioSetDownloadUrlOutput entity instance. |
| `ApiGetScenarioSetOutput` | `(data) -> ApiGetScenarioSetOutputEntity` | Create an ApiGetScenarioSetOutput entity instance. |
| `ApiGetScheduledIndexingOutput` | `(data) -> ApiGetScheduledIndexingOutputEntity` | Create an ApiGetScheduledIndexingOutput entity instance. |
| `ApiGetSimulationJourneyTrajectoryUrlOutput` | `(data) -> ApiGetSimulationJourneyTrajectoryUrlOutputEntity` | Create an ApiGetSimulationJourneyTrajectoryUrlOutput entity instance. |
| `ApiGetSimulationRunOutput` | `(data) -> ApiGetSimulationRunOutputEntity` | Create an ApiGetSimulationRunOutput entity instance. |
| `ApiGetWorkspaceOutput` | `(data) -> ApiGetWorkspaceOutputEntity` | Create an ApiGetWorkspaceOutput entity instance. |
| `ApiImportCustomModelOutputPublic` | `(data) -> ApiImportCustomModelOutputPublicEntity` | Create an ApiImportCustomModelOutputPublic entity instance. |
| `ApiIndexedDataSource` | `(data) -> ApiIndexedDataSourceEntity` | Create an ApiIndexedDataSource entity instance. |
| `ApiLinkAgentFunctionOutput` | `(data) -> ApiLinkAgentFunctionOutputEntity` | Create an ApiLinkAgentFunctionOutput entity instance. |
| `ApiLinkAgentGuardrailOutput` | `(data) -> ApiLinkAgentGuardrailOutputEntity` | Create an ApiLinkAgentGuardrailOutput entity instance. |
| `ApiLinkAgentOutput` | `(data) -> ApiLinkAgentOutputEntity` | Create an ApiLinkAgentOutput entity instance. |
| `ApiLinkKnowledgeBaseOutput` | `(data) -> ApiLinkKnowledgeBaseOutputEntity` | Create an ApiLinkKnowledgeBaseOutput entity instance. |
| `ApiListAgentApiKeysOutput` | `(data) -> ApiListAgentApiKeysOutputEntity` | Create an ApiListAgentApiKeysOutput entity instance. |
| `ApiListAgentsByAnthropicKeyOutput` | `(data) -> ApiListAgentsByAnthropicKeyOutputEntity` | Create an ApiListAgentsByAnthropicKeyOutput entity instance. |
| `ApiListAgentsByOpenAiKeyOutput` | `(data) -> ApiListAgentsByOpenAiKeyOutputEntity` | Create an ApiListAgentsByOpenAiKeyOutput entity instance. |
| `ApiListAgentsByWorkspaceOutput` | `(data) -> ApiListAgentsByWorkspaceOutputEntity` | Create an ApiListAgentsByWorkspaceOutput entity instance. |
| `ApiListEvaluationMetricsOutput` | `(data) -> ApiListEvaluationMetricsOutputEntity` | Create an ApiListEvaluationMetricsOutput entity instance. |
| `ApiListEvaluationRunsByTestCaseOutput` | `(data) -> ApiListEvaluationRunsByTestCaseOutputEntity` | Create an ApiListEvaluationRunsByTestCaseOutput entity instance. |
| `ApiListEvaluationTestCasesByWorkspaceOutput` | `(data) -> ApiListEvaluationTestCasesByWorkspaceOutputEntity` | Create an ApiListEvaluationTestCasesByWorkspaceOutput entity instance. |
| `ApiListKnowledgeBaseDataSourcesOutput` | `(data) -> ApiListKnowledgeBaseDataSourcesOutputEntity` | Create an ApiListKnowledgeBaseDataSourcesOutput entity instance. |
| `ApiListKnowledgeBaseIndexingJobsOutput` | `(data) -> ApiListKnowledgeBaseIndexingJobsOutputEntity` | Create an ApiListKnowledgeBaseIndexingJobsOutput entity instance. |
| `ApiListModelEvaluationMetricsOutput` | `(data) -> ApiListModelEvaluationMetricsOutputEntity` | Create an ApiListModelEvaluationMetricsOutput entity instance. |
| `ApiListScenarioLibraryOutput` | `(data) -> ApiListScenarioLibraryOutputEntity` | Create an ApiListScenarioLibraryOutput entity instance. |
| `ApiListScenariosOutput` | `(data) -> ApiListScenariosOutputEntity` | Create an ApiListScenariosOutput entity instance. |
| `ApiListSimulationJourneysOutput` | `(data) -> ApiListSimulationJourneysOutputEntity` | Create an ApiListSimulationJourneysOutput entity instance. |
| `ApiModelCatalogCard` | `(data) -> ApiModelCatalogCardEntity` | Create an ApiModelCatalogCard entity instance. |
| `ApiModelEvaluationPreset` | `(data) -> ApiModelEvaluationPresetEntity` | Create an ApiModelEvaluationPreset entity instance. |
| `ApiModelPublic` | `(data) -> ApiModelPublicEntity` | Create an ApiModelPublic entity instance. |
| `ApiModelRouterPreset` | `(data) -> ApiModelRouterPresetEntity` | Create an ApiModelRouterPreset entity instance. |
| `ApiModelRouterTaskPreset` | `(data) -> ApiModelRouterTaskPresetEntity` | Create an ApiModelRouterTaskPreset entity instance. |
| `ApiMoveAgentsToWorkspaceOutput` | `(data) -> ApiMoveAgentsToWorkspaceOutputEntity` | Create an ApiMoveAgentsToWorkspaceOutput entity instance. |
| `ApiPrompt` | `(data) -> ApiPromptEntity` | Create an ApiPrompt entity instance. |
| `ApiRollbackToAgentVersionOutput` | `(data) -> ApiRollbackToAgentVersionOutputEntity` | Create an ApiRollbackToAgentVersionOutput entity instance. |
| `ApiSimulationJourney` | `(data) -> ApiSimulationJourneyEntity` | Create an ApiSimulationJourney entity instance. |
| `ApiSimulationTrajectory` | `(data) -> ApiSimulationTrajectoryEntity` | Create an ApiSimulationTrajectory entity instance. |
| `ApiUnlinkAgentFunctionOutput` | `(data) -> ApiUnlinkAgentFunctionOutputEntity` | Create an ApiUnlinkAgentFunctionOutput entity instance. |
| `ApiUnlinkAgentGuardrailOutput` | `(data) -> ApiUnlinkAgentGuardrailOutputEntity` | Create an ApiUnlinkAgentGuardrailOutput entity instance. |
| `ApiUnlinkAgentOutput` | `(data) -> ApiUnlinkAgentOutputEntity` | Create an ApiUnlinkAgentOutput entity instance. |
| `ApiUnlinkKnowledgeBaseOutput` | `(data) -> ApiUnlinkKnowledgeBaseOutputEntity` | Create an ApiUnlinkKnowledgeBaseOutput entity instance. |
| `ApiUpdateAgentApiKeyOutput` | `(data) -> ApiUpdateAgentApiKeyOutputEntity` | Create an ApiUpdateAgentApiKeyOutput entity instance. |
| `ApiUpdateAgentFunctionOutput` | `(data) -> ApiUpdateAgentFunctionOutputEntity` | Create an ApiUpdateAgentFunctionOutput entity instance. |
| `ApiUpdateAgentOutput` | `(data) -> ApiUpdateAgentOutputEntity` | Create an ApiUpdateAgentOutput entity instance. |
| `ApiUpdateAnthropicApiKeyOutput` | `(data) -> ApiUpdateAnthropicApiKeyOutputEntity` | Create an ApiUpdateAnthropicApiKeyOutput entity instance. |
| `ApiUpdateCustomEvaluationMetricOutput` | `(data) -> ApiUpdateCustomEvaluationMetricOutputEntity` | Create an ApiUpdateCustomEvaluationMetricOutput entity instance. |
| `ApiUpdateEvaluationTestCaseOutput` | `(data) -> ApiUpdateEvaluationTestCaseOutputEntity` | Create an ApiUpdateEvaluationTestCaseOutput entity instance. |
| `ApiUpdateKnowledgeBaseDataSourceOutput` | `(data) -> ApiUpdateKnowledgeBaseDataSourceOutputEntity` | Create an ApiUpdateKnowledgeBaseDataSourceOutput entity instance. |
| `ApiUpdateKnowledgeBaseOutput` | `(data) -> ApiUpdateKnowledgeBaseOutputEntity` | Create an ApiUpdateKnowledgeBaseOutput entity instance. |
| `ApiUpdateLinkedAgentOutput` | `(data) -> ApiUpdateLinkedAgentOutputEntity` | Create an ApiUpdateLinkedAgentOutput entity instance. |
| `ApiUpdateModelApiKeyOutput` | `(data) -> ApiUpdateModelApiKeyOutputEntity` | Create an ApiUpdateModelApiKeyOutput entity instance. |
| `ApiUpdateModelEvaluationRunOutput` | `(data) -> ApiUpdateModelEvaluationRunOutputEntity` | Create an ApiUpdateModelEvaluationRunOutput entity instance. |
| `ApiUpdateModelRouterOutput` | `(data) -> ApiUpdateModelRouterOutputEntity` | Create an ApiUpdateModelRouterOutput entity instance. |
| `ApiUpdateOpenAiapiKeyOutput` | `(data) -> ApiUpdateOpenAiapiKeyOutputEntity` | Create an ApiUpdateOpenAiapiKeyOutput entity instance. |
| `ApiUpdateScenarioSetOutput` | `(data) -> ApiUpdateScenarioSetOutputEntity` | Create an ApiUpdateScenarioSetOutput entity instance. |
| `ApiUpdateSimulationRunOutput` | `(data) -> ApiUpdateSimulationRunOutputEntity` | Create an ApiUpdateSimulationRunOutput entity instance. |
| `ApiUpdateWorkspaceOutput` | `(data) -> ApiUpdateWorkspaceOutputEntity` | Create an ApiUpdateWorkspaceOutput entity instance. |
| `App` | `(data) -> AppEntity` | Create an App entity instance. |
| `AppAlert` | `(data) -> AppAlertEntity` | Create an AppAlert entity instance. |
| `AppEvent` | `(data) -> AppEventEntity` | Create an AppEvent entity instance. |
| `AppHealth` | `(data) -> AppHealthEntity` | Create an AppHealth entity instance. |
| `AppInstance` | `(data) -> AppInstanceEntity` | Create an AppInstance entity instance. |
| `AppJobInvocation` | `(data) -> AppJobInvocationEntity` | Create an AppJobInvocation entity instance. |
| `AppMetricsBandwidthUsage` | `(data) -> AppMetricsBandwidthUsageEntity` | Create an AppMetricsBandwidthUsage entity instance. |
| `AppPropose` | `(data) -> AppProposeEntity` | Create an AppPropose entity instance. |
| `AppsDeployment` | `(data) -> AppsDeploymentEntity` | Create an AppsDeployment entity instance. |
| `AppsGetExec` | `(data) -> AppsGetExecEntity` | Create an AppsGetExec entity instance. |
| `AppsGetLog` | `(data) -> AppsGetLogEntity` | Create an AppsGetLog entity instance. |
| `AppsInstanceSize` | `(data) -> AppsInstanceSizeEntity` | Create an AppsInstanceSize entity instance. |
| `AppsRegion` | `(data) -> AppsRegionEntity` | Create an AppsRegion entity instance. |
| `AssociatedKubernetesResource` | `(data) -> AssociatedKubernetesResourceEntity` | Create an AssociatedKubernetesResource entity instance. |
| `AssociatedResourceStatus` | `(data) -> AssociatedResourceStatusEntity` | Create an AssociatedResourceStatus entity instance. |
| `AsyncInvoke` | `(data) -> AsyncInvokeEntity` | Create an AsyncInvoke entity instance. |
| `Balance` | `(data) -> BalanceEntity` | Create a Balance entity instance. |
| `Batch` | `(data) -> BatchEntity` | Create a Batch entity instance. |
| `BatchFileCreate` | `(data) -> BatchFileCreateEntity` | Create a BatchFileCreate entity instance. |
| `BatchInference` | `(data) -> BatchInferenceEntity` | Create a BatchInference entity instance. |
| `BatchResult` | `(data) -> BatchResultEntity` | Create a BatchResult entity instance. |
| `Billing` | `(data) -> BillingEntity` | Create a Billing entity instance. |
| `BlockStorage` | `(data) -> BlockStorageEntity` | Create a BlockStorage entity instance. |
| `BlockStorageAction` | `(data) -> BlockStorageActionEntity` | Create a BlockStorageAction entity instance. |
| `ByoipPrefix` | `(data) -> ByoipPrefixEntity` | Create a ByoipPrefix entity instance. |
| `CdnEndpoint` | `(data) -> CdnEndpointEntity` | Create a CdnEndpoint entity instance. |
| `Certificate` | `(data) -> CertificateEntity` | Create a Certificate entity instance. |
| `ChatCompletion` | `(data) -> ChatCompletionEntity` | Create a ChatCompletion entity instance. |
| `Clusterlint` | `(data) -> ClusterlintEntity` | Create a Clusterlint entity instance. |
| `Connection` | `(data) -> ConnectionEntity` | Create a Connection entity instance. |
| `ConnectionPool` | `(data) -> ConnectionPoolEntity` | Create a ConnectionPool entity instance. |
| `ContainerRegistry` | `(data) -> ContainerRegistryEntity` | Create a ContainerRegistry entity instance. |
| `CreateResponse` | `(data) -> CreateResponseEntity` | Create a CreateResponse entity instance. |
| `Credential` | `(data) -> CredentialEntity` | Create a Credential entity instance. |
| `Database` | `(data) -> DatabaseEntity` | Create a Database entity instance. |
| `DedicatedInference` | `(data) -> DedicatedInferenceEntity` | Create a DedicatedInference entity instance. |
| `DedicatedInferenceAccelerator` | `(data) -> DedicatedInferenceAcceleratorEntity` | Create a DedicatedInferenceAccelerator entity instance. |
| `DedicatedInferenceGpuModelConfig` | `(data) -> DedicatedInferenceGpuModelConfigEntity` | Create a DedicatedInferenceGpuModelConfig entity instance. |
| `DedicatedInferenceSize` | `(data) -> DedicatedInferenceSizeEntity` | Create a DedicatedInferenceSize entity instance. |
| `DockerCredential` | `(data) -> DockerCredentialEntity` | Create a DockerCredential entity instance. |
| `Domain` | `(data) -> DomainEntity` | Create a Domain entity instance. |
| `DomainRecord` | `(data) -> DomainRecordEntity` | Create a DomainRecord entity instance. |
| `Droplet` | `(data) -> DropletEntity` | Create a Droplet entity instance. |
| `DropletAction` | `(data) -> DropletActionEntity` | Create a DropletAction entity instance. |
| `DropletAutoscalePool` | `(data) -> DropletAutoscalePoolEntity` | Create a DropletAutoscalePool entity instance. |
| `Embedding` | `(data) -> EmbeddingEntity` | Create an Embedding entity instance. |
| `Empty` | `(data) -> EmptyEntity` | Create an Empty entity instance. |
| `Firewall` | `(data) -> FirewallEntity` | Create a Firewall entity instance. |
| `FloatingIp` | `(data) -> FloatingIpEntity` | Create a FloatingIp entity instance. |
| `FloatingIpAction` | `(data) -> FloatingIpActionEntity` | Create a FloatingIpAction entity instance. |
| `Function` | `(data) -> FunctionEntity` | Create a Function entity instance. |
| `GenaiapiRegion` | `(data) -> GenaiapiRegionEntity` | Create a GenaiapiRegion entity instance. |
| `Image` | `(data) -> ImageEntity` | Create an Image entity instance. |
| `ImageAction` | `(data) -> ImageActionEntity` | Create an ImageAction entity instance. |
| `Insight` | `(data) -> InsightEntity` | Create an Insight entity instance. |
| `InvoiceSummary` | `(data) -> InvoiceSummaryEntity` | Create an InvoiceSummary entity instance. |
| `Kubernete` | `(data) -> KuberneteEntity` | Create a Kubernete entity instance. |
| `KubernetesOption` | `(data) -> KubernetesOptionEntity` | Create a KubernetesOption entity instance. |
| `ListMcpServerTool` | `(data) -> ListMcpServerToolEntity` | Create a ListMcpServerTool entity instance. |
| `ListProvider` | `(data) -> ListProviderEntity` | Create a ListProvider entity instance. |
| `ListProviderHealth` | `(data) -> ListProviderHealthEntity` | Create a ListProviderHealth entity instance. |
| `ListTool` | `(data) -> ListToolEntity` | Create a ListTool entity instance. |
| `ListToolHealth` | `(data) -> ListToolHealthEntity` | Create a ListToolHealth entity instance. |
| `ListToolbeltProvider` | `(data) -> ListToolbeltProviderEntity` | Create a ListToolbeltProvider entity instance. |
| `ListToolkit` | `(data) -> ListToolkitEntity` | Create a ListToolkit entity instance. |
| `LoadBalancer` | `(data) -> LoadBalancerEntity` | Create a LoadBalancer entity instance. |
| `LogsSearch` | `(data) -> LogsSearchEntity` | Create a LogsSearch entity instance. |
| `Logsink` | `(data) -> LogsinkEntity` | Create a Logsink entity instance. |
| `McpServer` | `(data) -> McpServerEntity` | Create a McpServer entity instance. |
| `Message` | `(data) -> MessageEntity` | Create a Message entity instance. |
| `Metric` | `(data) -> MetricEntity` | Create a Metric entity instance. |
| `Model` | `(data) -> ModelEntity` | Create a Model entity instance. |
| `Monitoring` | `(data) -> MonitoringEntity` | Create a Monitoring entity instance. |
| `N1Click` | `(data) -> N1ClickEntity` | Create a N1Click entity instance. |
| `N1ClickApplication` | `(data) -> N1ClickApplicationEntity` | Create a N1ClickApplication entity instance. |
| `NeighborId` | `(data) -> NeighborIdEntity` | Create a NeighborId entity instance. |
| `Nfs` | `(data) -> NfsEntity` | Create a Nfs entity instance. |
| `NfsAction2` | `(data) -> NfsAction2Entity` | Create a NfsAction2 entity instance. |
| `NfsSnapshot` | `(data) -> NfsSnapshotEntity` | Create a NfsSnapshot entity instance. |
| `OnlineMigration` | `(data) -> OnlineMigrationEntity` | Create an OnlineMigration entity instance. |
| `Option` | `(data) -> OptionEntity` | Create an Option entity instance. |
| `Organization` | `(data) -> OrganizationEntity` | Create an Organization entity instance. |
| `OutputView` | `(data) -> OutputViewEntity` | Create an OutputView entity instance. |
| `PartnerNetworkConnect` | `(data) -> PartnerNetworkConnectEntity` | Create a PartnerNetworkConnect entity instance. |
| `PrepaymentConfig` | `(data) -> PrepaymentConfigEntity` | Create a PrepaymentConfig entity instance. |
| `PrepaymentStatus` | `(data) -> PrepaymentStatusEntity` | Create a PrepaymentStatus entity instance. |
| `Project` | `(data) -> ProjectEntity` | Create a Project entity instance. |
| `ProjectResource` | `(data) -> ProjectResourceEntity` | Create a ProjectResource entity instance. |
| `PromQuery` | `(data) -> PromQueryEntity` | Create a PromQuery entity instance. |
| `PromQueryRange` | `(data) -> PromQueryRangeEntity` | Create a PromQueryRange entity instance. |
| `PromSeries` | `(data) -> PromSeriesEntity` | Create a PromSeries entity instance. |
| `PromStringList` | `(data) -> PromStringListEntity` | Create a PromStringList entity instance. |
| `Region` | `(data) -> RegionEntity` | Create a Region entity instance. |
| `ReservedIPv6` | `(data) -> ReservedIPv6Entity` | Create a ReservedIPv6 entity instance. |
| `ReservedIPv6Action` | `(data) -> ReservedIPv6ActionEntity` | Create a ReservedIPv6Action entity instance. |
| `ReservedIp` | `(data) -> ReservedIpEntity` | Create a ReservedIp entity instance. |
| `ReservedIpAction` | `(data) -> ReservedIpActionEntity` | Create a ReservedIpAction entity instance. |
| `Resync` | `(data) -> ResyncEntity` | Create a Resync entity instance. |
| `Search` | `(data) -> SearchEntity` | Create a Search entity instance. |
| `Security` | `(data) -> SecurityEntity` | Create a Security entity instance. |
| `Setting` | `(data) -> SettingEntity` | Create a Setting entity instance. |
| `Size` | `(data) -> SizeEntity` | Create a Size entity instance. |
| `Snapshot` | `(data) -> SnapshotEntity` | Create a Snapshot entity instance. |
| `SpacesKey` | `(data) -> SpacesKeyEntity` | Create a SpacesKey entity instance. |
| `SqlMode` | `(data) -> SqlModeEntity` | Create a SqlMode entity instance. |
| `SshKey` | `(data) -> SshKeyEntity` | Create a SshKey entity instance. |
| `Systemone` | `(data) -> SystemoneEntity` | Create a Systemone entity instance. |
| `Tag` | `(data) -> TagEntity` | Create a Tag entity instance. |
| `Tool` | `(data) -> ToolEntity` | Create a Tool entity instance. |
| `Toolbelt` | `(data) -> ToolbeltEntity` | Create a Toolbelt entity instance. |
| `Uptime` | `(data) -> UptimeEntity` | Create an Uptime entity instance. |
| `User` | `(data) -> UserEntity` | Create an User entity instance. |
| `VectorDatabase` | `(data) -> VectorDatabaseEntity` | Create a VectorDatabase entity instance. |
| `VectordbBackup` | `(data) -> VectordbBackupEntity` | Create a VectordbBackup entity instance. |
| `VectordbGetRestoreStatus` | `(data) -> VectordbGetRestoreStatusEntity` | Create a VectordbGetRestoreStatus entity instance. |
| `VectordbGetVectorDb` | `(data) -> VectordbGetVectorDbEntity` | Create a VectordbGetVectorDb entity instance. |
| `VectordbGetVectorDbAdminCredential` | `(data) -> VectordbGetVectorDbAdminCredentialEntity` | Create a VectordbGetVectorDbAdminCredential entity instance. |
| `VectordbRestoreBackup` | `(data) -> VectordbRestoreBackupEntity` | Create a VectordbRestoreBackup entity instance. |
| `VectordbUpdateVectorDb` | `(data) -> VectordbUpdateVectorDbEntity` | Create a VectordbUpdateVectorDb entity instance. |
| `VectordbUpdateVectorDbTag` | `(data) -> VectordbUpdateVectorDbTagEntity` | Create a VectordbUpdateVectorDbTag entity instance. |
| `Vpc` | `(data) -> VpcEntity` | Create a Vpc entity instance. |
| `VpcNatGateway` | `(data) -> VpcNatGatewayEntity` | Create a VpcNatGateway entity instance. |
| `VpcPeering` | `(data) -> VpcPeeringEntity` | Create a VpcPeering entity instance. |
| `VpcRoutesPublicPreview` | `(data) -> VpcRoutesPublicPreviewEntity` | Create a VpcRoutesPublicPreview entity instance. |
| `VpcSubnetsPublicPreview` | `(data) -> VpcSubnetsPublicPreviewEntity` | Create a VpcSubnetsPublicPreview entity instance. |

### Entity interface

All entities share the same interface.

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `(reqmatch, ctrl) -> any` | Load a single entity by match criteria. Raises on error. |
| `list` | `(reqmatch, ctrl) -> list` | List entities matching the criteria. Raises on error. |
| `create` | `(reqdata, ctrl) -> any` | Create a new entity. Raises on error. |
| `update` | `(reqdata, ctrl) -> any` | Update an existing entity. Raises on error. |
| `patch` | `(reqdata, ctrl) -> any` | Change part of an existing entity. Raises on error. |
| `remove` | `(reqmatch, ctrl) -> any` | Remove an entity. Raises on error. |
| `data_get` | `() -> dict` | Get entity data. |
| `data_set` | `(data)` | Set entity data. |
| `match_get` | `() -> dict` | Get entity match criteria. |
| `match_set` | `(match)` | Set entity match criteria. |
| `make` | `() -> Entity` | Create a new instance with the same options. |
| `get_name` | `() -> str` | Return the entity name. |

### Result shape

Entity operations return the ENTITY (call data_get() for the record) (a `dict` for single-entity
ops, a `list` for `list`) and raise on error. Wrap calls in
`try`/`except` to handle failures.

The `direct()` escape hatch never raises — it returns a result `dict`
you branch on via `result["ok"]`:

| Key | Type | Description |
| --- | --- | --- |
| `ok` | `bool` | `True` if the HTTP status is 2xx. |
| `status` | `int` | HTTP status code. |
| `headers` | `dict` | Response headers. |
| `data` | `any` | Parsed JSON response body. |

On error, `ok` is `False` and `err` contains the error value.

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

Operations: Create, List, Load, Remove.

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

Operations: Load.

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

Operations: Create, List, Load.

API path: `/v2/images/{image_id}/actions`

#### ActorLimit

| Field | Description |
| --- | --- |
| `category` | The category the limit applies to. |
| `id` |  |
| `requests_per_minute` | Calls allowed per minute. |

Operations: List.

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

Operations: Create, List, Load, Remove, Update.

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

Operations: List.

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

Operations: Create.

API path: `/v2/gen-ai/agents/{agent_uuid}/api_keys`

#### ApiCreateDataSourceFileUploadPresignedUrlsOutput

| Field | Description |
| --- | --- |
| `files` | A list of files to generate presigned URLs for. |
| `request_id` | The ID generated for the request for Presigned URLs. |
| `uploads` | A list of generated presigned URLs and object keys, one per file. |

Operations: Create.

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

Operations: Create.

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

Operations: Create.

API path: `/v2/gen-ai/scenario_library/{library_scenario_uuid}/create_scenario_set`

#### ApiDeleteAgentApiKeyOutput

| Field | Description |
| --- | --- |

Operations: Remove, Update.

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

Operations: Create, List, Remove.

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

Operations: Create, List, Remove.

API path: `/v2/gen-ai/anthropic/keys`

#### ApiDeleteCustomEvaluationMetricOutput

| Field | Description |
| --- | --- |

Operations: Remove.

API path: `/v2/gen-ai/custom_evaluation_metrics/{metric_uuid}`

#### ApiDeleteCustomModelOutputPublic

| Field | Description |
| --- | --- |

Operations: Remove.

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

Operations: Create, List, Remove.

API path: `/v2/gen-ai/evaluation_datasets`

#### ApiDeleteKnowledgeBaseDataSourceOutput

| Field | Description |
| --- | --- |

Operations: Remove.

API path: `/v2/gen-ai/knowledge_bases/{knowledge_base_uuid}/data_sources/{data_source_uuid}`

#### ApiDeleteKnowledgeBaseOutput

| Field | Description |
| --- | --- |

Operations: Remove.

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

Operations: Create, List, Remove, Update.

API path: `/v2/gen-ai/models/api_keys`

#### ApiDeleteModelEvaluationPresetOutput

| Field | Description |
| --- | --- |

Operations: Remove.

API path: `/v2/gen-ai/model_evaluation_presets/{eval_preset_uuid}`

#### ApiDeleteModelEvaluationRunOutputPublic

| Field | Description |
| --- | --- |

Operations: Remove.

API path: `/v2/gen-ai/model_evaluation_runs/{eval_run_uuid}`

#### ApiDeleteModelRouterOutput

| Field | Description |
| --- | --- |

Operations: Remove.

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

Operations: Create, List, Remove.

API path: `/v2/gen-ai/openai/keys`

#### ApiDeleteScenarioSetOutput

| Field | Description |
| --- | --- |

Operations: Remove.

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

Operations: Create, Remove.

API path: `/v2/gen-ai/scheduled-indexing`

#### ApiDeleteSimulationRunOutput

| Field | Description |
| --- | --- |

Operations: Remove.

API path: `/v2/gen-ai/simulation_runs/{run_uuid}`

#### ApiDeleteWorkspaceOutput

| Field | Description |
| --- | --- |

Operations: Remove.

API path: `/v2/gen-ai/workspaces/{workspace_uuid}`

#### ApiDropboxOauth2GetTokensOutput

| Field | Description |
| --- | --- |
| `code` | The oauth2 code from google |
| `redirect_url` | Redirect url |
| `refresh_token` | The refresh token |
| `token` | The access token |

Operations: Create.

API path: `/v2/gen-ai/oauth2/dropbox/tokens`

#### ApiGenerateOauth2UrlOutput

| Field | Description |
| --- | --- |
| `url` | The oauth2 url |

Operations: Load.

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

Operations: Create.

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

Operations: Load, Update.

API path: `/v2/gen-ai/agents/{uuid}`

#### ApiGetAgentUsageOutput

| Field | Description |
| --- | --- |
| `log_insights_usage` | Resource Usage Description |
| `usage` | Resource Usage Description |

Operations: Load.

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

Operations: Load.

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

Operations: List.

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

Operations: List, Load, Update.

API path: `/v2/gen-ai/custom_models`

#### ApiGetEvaluationDatasetDownloadUrlOutput

| Field | Description |
| --- | --- |
| `download_url` | The presigned URL to download the dataset file. |
| `expires_at` | The time the URL expires at. |

Operations: Load.

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

Operations: Create, Load.

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

Operations: List.

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

Operations: Create, List, Load.

API path: `/v2/gen-ai/evaluation_test_cases`

#### ApiGetIndexingJobDetailsSignedUrlOutput

| Field | Description |
| --- | --- |
| `signed_url` | The signed url for downloading the indexing job details |

Operations: Load.

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

Operations: Create, List, Load, Update.

API path: `/v2/gen-ai/indexing_jobs`

#### ApiGetKnowledgeBaseOutput

| Field | Description |
| --- | --- |
| `database_status` |  |
| `knowledge_base` | Knowledgebase Description |

Operations: Load.

API path: `/v2/gen-ai/knowledge_bases/{uuid}`

#### ApiGetModelEvaluationRunOutput

| Field | Description |
| --- | --- |
| `links` | Links to other pages |
| `meta` | Meta information about the data set |
| `results` | Paginated per-prompt evaluation results. |
| `run` | Model Evaluation Run Detail - full view returned when fetching a specific run. |

Operations: Load, Update.

API path: `/v2/gen-ai/model_evaluation_runs/{eval_run_uuid}`

#### ApiGetModelEvaluationRunResultsDownloadUrlOutput

| Field | Description |
| --- | --- |
| `download_url` | The presigned URL to download the gzip-compressed JSON results file (.json.gz). |
| `expires_at` | The time the URL expires at. |

Operations: Load.

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

Operations: Create, List, Load.

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

Operations: Load.

API path: `/v2/gen-ai/openai/keys/{api_key_uuid}`

#### ApiGetScenarioSetDownloadUrlOutput

| Field | Description |
| --- | --- |
| `download_url` | The presigned URL to download the scenario set file. |
| `expires_at` | The time the URL expires at. |

Operations: Load.

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

Operations: Create, List, Load.

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

Operations: Load.

API path: `/v2/gen-ai/scheduled-indexing/knowledge-base/{knowledge_base_uuid}`

#### ApiGetSimulationJourneyTrajectoryUrlOutput

| Field | Description |
| --- | --- |
| `download_url` | The presigned URL to download the trajectory JSON file. |
| `expires_at` | The time the URL expires at. |

Operations: Load.

API path: `/v2/gen-ai/simulation_runs/{run_uuid}/journeys/{journey_uuid}/trajectory_url`

#### ApiGetSimulationRunOutput

| Field | Description |
| --- | --- |
| `scenario_results` | Per-scenario breakdown of journey outcomes, aggregated from journey rows. |
| `simulation_run` | One execution of a scenario set against a candidate agent. |

Operations: Load, Update.

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

Operations: Create, List, Load.

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

Operations: Create.

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

Operations: List.

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

Operations: Create.

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

Operations: Create.

API path: `/v2/gen-ai/agents/{agent_uuid}/guardrails`

#### ApiLinkAgentOutput

| Field | Description |
| --- | --- |
| `child_agent_uuid` | Routed agent id |
| `if_case` |  |
| `parent_agent_uuid` | A unique identifier for the parent agent. |
| `route_name` | Name of route |

Operations: Create.

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

Operations: Create.

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

Operations: List.

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

Operations: List.

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

Operations: List.

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

Operations: List.

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

Operations: List.

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

Operations: List.

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

Operations: List.

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

Operations: List.

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

Operations: List.

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

Operations: List.

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

Operations: List.

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

Operations: List.

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

Operations: List.

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

Operations: List, Load.

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

Operations: List, Load.

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

Operations: List.

API path: `/v2/gen-ai/models`

#### ApiModelRouterPreset

| Field | Description |
| --- | --- |
| `config` |  |
| `display_name` | Display name for UI surfaces |
| `long_description` | Long description for details views |
| `short_description` | Short description for list views |
| `slug` | Stable slug for routing usage |

Operations: List.

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

Operations: List.

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

Operations: Update.

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

Operations: Load.

API path: `/v2/gen-ai/evaluation_runs/{evaluation_run_uuid}/results/{prompt_id}`

#### ApiRollbackToAgentVersionOutput

| Field | Description |
| --- | --- |
| `audit_header` | An alternative way to provide auth information. |
| `uuid` | Agent unique identifier |
| `version_hash` | Unique identifier |

Operations: Update.

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

Operations: Load.

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

Operations: Load.

API path: `/v2/gen-ai/simulation_runs/{run_uuid}/journeys/{journey_uuid}/trajectory`

#### ApiUnlinkAgentFunctionOutput

| Field | Description |
| --- | --- |

Operations: Remove.

API path: `/v2/gen-ai/agents/{agent_uuid}/functions/{function_uuid}`

#### ApiUnlinkAgentGuardrailOutput

| Field | Description |
| --- | --- |

Operations: Remove.

API path: `/v2/gen-ai/agents/{agent_uuid}/guardrails/{guardrail_uuid}`

#### ApiUnlinkAgentOutput

| Field | Description |
| --- | --- |

Operations: Remove.

API path: `/v2/gen-ai/agents/{parent_agent_uuid}/child_agents/{child_agent_uuid}`

#### ApiUnlinkKnowledgeBaseOutput

| Field | Description |
| --- | --- |

Operations: Remove.

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

Operations: Update.

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

Operations: Update.

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

Operations: Update.

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

Operations: Update.

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

Operations: Create, Update.

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

Operations: Update.

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

Operations: Update.

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

Operations: Create, List, Update.

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

Operations: Update.

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

Operations: Update.

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

Operations: Create, List, Update.

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

Operations: Update.

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

Operations: Update.

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

Operations: Update.

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

Operations: Create, List, Update.

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

Operations: Update.

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

Operations: Create, List, Load, Remove, Update.

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

Operations: Create, List.

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

Operations: List.

API path: `/v2/apps/{app_id}/events`

#### AppHealth

| Field | Description |
| --- | --- |
| `components` |  |
| `functions_components` |  |
| `id` |  |

Operations: Load.

API path: `/v2/apps/{app_id}/health`

#### AppInstance

| Field | Description |
| --- | --- |
| `component_name` | Name of the component, from the app spec. |
| `component_type` | Supported compute component by DigitalOcean App Platform. |
| `id` |  |
| `instance_alias` | Readable identifier, an alias of the instance name, reference for mapping insights to instance names. |
| `instance_name` | Name of the instance, which is a unique identifier for the instance. |

Operations: List.

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

Operations: Create, List, Load.

API path: `/v2/apps/{app_id}/job-invocations/{job_invocation_id}/cancel`

#### AppMetricsBandwidthUsage

| Field | Description |
| --- | --- |
| `app_bandwidth_usage` | A list of bandwidth usage details by app. |
| `app_id` | The ID of the app. |
| `app_ids` | A list of app IDs to query bandwidth metrics for. |
| `bandwidth_bytes` | The used bandwidth amount in bytes. |
| `date` | The date for the metrics data. |

Operations: Create, List.

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

Operations: Create.

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

Operations: Create, List, Load.

API path: `/v2/apps/{app_id}/deployments/{deployment_id}/cancel`

#### AppsGetExec

| Field | Description |
| --- | --- |
| `url` | A websocket URL that allows sending/receiving console input and receiving console output. |

Operations: Load.

API path: `/v2/apps/{app_id}/deployments/{deployment_id}/components/{component_name}/exec`

#### AppsGetLog

| Field | Description |
| --- | --- |
| `historic_urls` |  |
| `live_url` | A URL of the real-time live logs. |

Operations: List.

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

Operations: List, Load.

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

Operations: List.

API path: `/v2/apps/regions`

#### AssociatedKubernetesResource

| Field | Description |
| --- | --- |
| `load_balancers` | A list of names and IDs for associated load balancers that can be destroyed along with the cluster. |
| `volume_snapshots` | A list of names and IDs for associated volume snapshots that can be destroyed along with the cluster. |
| `volumes` | A list of names and IDs for associated volumes that can be destroyed along with the cluster. |

Operations: List.

API path: `/v2/kubernetes/clusters/{cluster_id}/destroy_with_associated_resources`

#### AssociatedResourceStatus

| Field | Description |
| --- | --- |
| `completed_at` | A time value given in ISO8601 combined date and time format indicating when the requested action was completed. |
| `droplet` | An object containing information about a resource scheduled for deletion. |
| `failures` | A count of the associated resources that failed to be destroyed, if any. |
| `resources` | An object containing additional information about resource related to a Droplet requested to be destroyed. |

Operations: Load.

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

Operations: Create.

API path: `/v1/async-invoke`

#### Balance

| Field | Description |
| --- | --- |
| `account_balance` | Current balance of the customer's most recent billing activity. |
| `generated_at` | The time at which balances were most recently generated. |
| `month_to_date_balance` | Balance as of the `generated_at` time. |
| `month_to_date_usage` | Amount used in the current billing period as of the `generated_at` time. |

Operations: Load.

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

Operations: Create, List, Load.

API path: `/v1/batches/{batch_id}/cancel`

#### BatchFileCreate

| Field | Description |
| --- | --- |
| `file_name` | The file you plan to upload. |

Operations: Create.

API path: `/v1/batches/files`

#### BatchInference

| Field | Description |
| --- | --- |

Operations: Update.

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

Operations: Load.

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

Operations: List, Load.

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

Operations: Create, List, Load, Remove.

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

Operations: Create, List, Load.

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

Operations: Create, List, Load, Remove, Update.

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

Operations: Create, List, Load, Remove, Update.

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

Operations: Create, List, Load, Remove.

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

Operations: Create.

API path: `/api/v1/chat/completions`

#### Clusterlint

| Field | Description |
| --- | --- |
| `check_name` | The clusterlint check that resulted in the diagnostic. |
| `message` | Feedback about the object for users to fix. |
| `object` | Metadata about the Kubernetes API object the diagnostic is reported on. |
| `severity` | Can be one of error, warning or suggestion. |

Operations: List.

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

Operations: Create, List, Load, Remove.

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

Operations: List.

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

Operations: Create, List, Load, Remove, Update.

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

Operations: Create.

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

Operations: Load.

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

Operations: Create, List, Load, Patch, Remove, Update.

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

Operations: Create, List, Load, Remove, Update.

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

Operations: Load.

API path: `/v2/dedicated-inferences/{dedicated_inference_id}/accelerators/{accelerator_id}`

#### DedicatedInferenceGpuModelConfig

| Field | Description |
| --- | --- |
| `gpu_slugs` |  |
| `is_gated_model` | Whether the model requires gated access (e.g. |
| `model_name` |  |
| `model_slug` |  |

Operations: List.

API path: `/v2/dedicated-inferences/gpu-model-config`

#### DedicatedInferenceSize

| Field | Description |
| --- | --- |
| `currency` |  |
| `gpu_slug` |  |
| `price_per_hour` |  |
| `region` |  |

Operations: List.

API path: `/v2/dedicated-inferences/sizes`

#### DockerCredential

| Field | Description |
| --- | --- |
| `registry_digitalocean_com` |  |

Operations: Load.

API path: `/v2/registries/{registry_name}/docker-credentials`

#### Domain

| Field | Description |
| --- | --- |
| `id` |  |
| `ip_address` | This optional attribute may contain an IP address. |
| `name` | The name of the domain itself. |
| `ttl` | This value is the time to live for the records on this domain, in seconds. |
| `zone_file` | This attribute contains the complete contents of the zone file for the selected domain. |

Operations: Create, List, Load, Remove.

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

Operations: Create, List, Load, Patch, Remove, Update.

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

Operations: Create, List, Load, Remove.

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

Operations: Create, List, Load.

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

Operations: Create, List, Load, Remove, Update.

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

Operations: Create.

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

Operations: Create, List, Remove.

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

Operations: Create, List, Load, Remove, Update.

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

Operations: Create, List, Load, Remove.

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

Operations: Create, List, Load.

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

Operations: Create, List, Load, Remove, Update.

API path: `/v2/functions/namespaces/{namespace_id}/keys`

#### GenaiapiRegion

| Field | Description |
| --- | --- |
| `inference_url` | Url for inference server |
| `region` | Region code |
| `serves_batch` | This datacenter is capable of running batch jobs |
| `serves_inference` | This datacenter is capable of serving inference |
| `stream_inference_url` | The url for the inference streaming server |

Operations: List.

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

Operations: Create, List, Load, Remove, Update.

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

Operations: List.

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

Operations: Create, List, Load, Remove, Update.

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

Operations: Load.

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

Operations: Create, List, Load, Remove, Update.

API path: `/v2/kubernetes/clusters/{cluster_id}/node_pools/{node_pool_id}/recycle`

#### KubernetesOption

| Field | Description |
| --- | --- |
| `regions` |  |
| `sizes` |  |
| `versions` |  |

Operations: Load.

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

Operations: List, Update.

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

Operations: List.

API path: `/v2/action-gateway/tools/providers`

#### ListProviderHealth

| Field | Description |
| --- | --- |
| `health` | Metrics over the window. |
| `provider` | Provider ID. |

Operations: List.

API path: `/v2/action-gateway/tools/health/providers`

#### ListTool

| Field | Description |
| --- | --- |
| `definitions` | definitions[i] describes tools[i]. |
| `pagination` | page and `per_page` echo the values applied; total is the number of tools matching `toolkitId` across all pages. |
| `tools` | Tools on this page, grouped by provider and sorted by name within a provider. |
| `version` | Catalog version identifier, for example `v1`. |

Operations: List.

API path: `/v2/action-gateway/tools`

#### ListToolHealth

| Field | Description |
| --- | --- |
| `health` | Metrics over the window. |
| `provider` | ID of the provider that offers the tool. |
| `tool_slug` | Catalog tool slug. |

Operations: List.

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

Operations: List.

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

Operations: List.

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

Operations: Create, List, Load, Remove, Update.

API path: `/v2/load_balancers/{lb_id}/droplets`

#### LogsSearch

| Field | Description |
| --- | --- |
| `data` | Matching log records. |
| `filter` | A boolean filter tree for logs queries. |
| `order_by` | Sort clauses applied to the result set. |
| `pagination` | Pagination response. |
| `time_range` | An inclusive query time window. |

Operations: Create.

API path: `/v2/insights/query/{region}/logs/search`

#### Logsink

| Field | Description |
| --- | --- |
| `config` |  |
| `id` |  |
| `sink_id` | A unique identifier for Logsink |
| `sink_name` | The name of the Logsink |
| `sink_type` |  |

Operations: Load.

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

Operations: Create, List, Load, Remove, Update.

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

Operations: Create.

API path: `/v1/messages`

#### Metric

| Field | Description |
| --- | --- |
| `result` | Result of query. |
| `resultType` |  |

Operations: Load.

API path: `/v2/monitoring/metrics/database/mysql/load`

#### Model

| Field | Description |
| --- | --- |
| `created` | The Unix timestamp (in seconds) when the model was created. |
| `id` | The model identifier, which can be referenced in the API endpoints. |
| `object` | The object type, which is always "model". |
| `owned_by` | The organization that owns the model. |

Operations: List.

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

Operations: Create, List, Load, Remove, Update.

API path: `/v2/monitoring/sinks/destinations/{destination_uuid}`

#### N1Click

| Field | Description |
| --- | --- |
| `slug` | The slug identifier for the 1-Click application. |
| `type` | The type of the 1-Click application. |

Operations: List.

API path: `/v2/1-clicks`

#### N1ClickApplication

| Field | Description |
| --- | --- |
| `addon_slugs` | An array of 1-Click Application slugs to be installed to the Kubernetes cluster. |
| `cluster_uuid` | A unique ID for the Kubernetes cluster to which the 1-Click Applications will be installed. |
| `message` | A message about the result of the request. |

Operations: Create.

API path: `/v2/1-clicks/kubernetes`

#### NeighborId

| Field | Description |
| --- | --- |
| `neighbor_ids` | An array of arrays. |

Operations: List.

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

Operations: Create, List, Load, Remove.

API path: `/v2/nfs`

#### NfsAction2

| Field | Description |
| --- | --- |
| `id` |  |

Operations: Create.

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

Operations: List, Load.

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

Operations: Load, Update.

API path: `/v2/databases/{database_cluster_uuid}/online-migration`

#### Option

| Field | Description |
| --- | --- |
| `options` |  |
| `version_availability` |  |

Operations: Load.

API path: `/v2/databases/options`

#### Organization

| Field | Description |
| --- | --- |

Operations: Create, List.

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

Operations: Create, List, Load, Remove.

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

Operations: Create, List, Load, Remove, Update.

API path: `/v2/partner_network_connect/attachments/{pa_id}/service_key`

#### PrepaymentConfig

| Field | Description |
| --- | --- |
| `config` |  |
| `status` |  |

Operations: Load.

API path: `/v2/customers/my/prepayment_config`

#### PrepaymentStatus

| Field | Description |
| --- | --- |
| `balance` | Current prepayment balance. |
| `blocked` | Whether the prepayment gate is currently blocking usage. |
| `eligible` | Whether the account is eligible for the prepayment gate experience. |
| `is_auto_prepay_enabled` | Whether automatic prepayment top-up is enabled. |
| `month_to_date_balance` | Current account balance including month-to-date usage. |

Operations: Load.

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

Operations: Create, List, Load, Patch, Remove, Update.

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

Operations: Create, List.

API path: `/v2/projects/{project_id}/resources`

#### PromQuery

| Field | Description |
| --- | --- |
| `result` | Result payload shape depends on `resultType`. |
| `resultType` |  |

Operations: Create, Load.

API path: `/v2/insights/query/{region}/prom/api/v1/query`

#### PromQueryRange

| Field | Description |
| --- | --- |
| `result` | One entry per matching series, each carrying the samples evaluated at every step across the requested range. |
| `resultType` |  |

Operations: Create, Load.

API path: `/v2/insights/query/{region}/prom/api/v1/query_range`

#### PromSeries

| Field | Description |
| --- | --- |
| `data` |  |
| `status` |  |

Operations: Create, List.

API path: `/v2/insights/query/{region}/prom/api/v1/series`

#### PromStringList

| Field | Description |
| --- | --- |
| `data` |  |
| `status` |  |

Operations: Create, List.

API path: `/v2/insights/query/{region}/prom/api/v1/labels`

#### Region

| Field | Description |
| --- | --- |
| `available` | This is a boolean value that represents whether new Droplets can be created in this region. |
| `features` | This attribute is set to an array which contains features available in this region |
| `name` | The display name of the region. |
| `sizes` | This attribute is set to an array which contains the identifying slugs for the sizes available in this region. |
| `slug` | A human-readable string that is used as a unique identifier for each region. |

Operations: List.

API path: `/v2/regions`

#### ReservedIPv6

| Field | Description |
| --- | --- |
| `droplet` | Requires `droplet:read` scope. |
| `ip` | The public IP address of the reserved IPv6. |
| `region_slug` | The region that the reserved IPv6 is reserved to. |
| `reserved_at` | The date and time when the reserved IPv6 was reserved. |

Operations: Create, List, Load, Remove.

API path: `/v2/reserved_ipv6`

#### ReservedIPv6Action

| Field | Description |
| --- | --- |
| `action` |  |

Operations: Create.

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

Operations: Create, List, Load, Remove.

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

Operations: Create, List, Load.

API path: `/v2/reserved_ips/{reserved_ip}/actions`

#### Resync

| Field | Description |
| --- | --- |
| `authorization` | Set when discovery could not run because `user_id` has no authorized connection to this server yet. |
| `mcpServer` | The server, including `syncStatus` and `syncError`. |
| `pending` | True when discovery is still running (HTTP 202). |
| `tools` | Every tool discovered on the server when discovery finished in time; empty when pending is true. |
| `user_id` | Required for a server registered with `credentialRefSource` connection: discovery reaches the server as this user, through their connection, because such a server has no team-wide credential. |

Operations: Create.

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

Operations: List.

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

Operations: Create, List, Load, Remove, Update.

API path: `/v2/security/scans`

#### Setting

| Field | Description |
| --- | --- |
| `plan_downgrades` |  |
| `settings` |  |
| `tier_coverage` |  |

Operations: Load.

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

Operations: List.

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

Operations: List, Load, Remove.

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

Operations: Create, List, Load, Patch, Remove, Update.

API path: `/v2/spaces/keys`

#### SqlMode

| Field | Description |
| --- | --- |
| `sql_mode` | A string specifying the configured SQL modes for the MySQL cluster. |

Operations: Load.

API path: `/v2/databases/{database_cluster_uuid}/sql_mode`

#### SshKey

| Field | Description |
| --- | --- |
| `fingerprint` | A unique identifier that differentiates this key from other keys using a format that SSH recognizes. |
| `id` | A unique identification number for this key. |
| `name` | A human-readable display name for this key, used to easily identify the SSH keys when they are displayed. |
| `public_key` | The entire public key string that was uploaded. |

Operations: Create, List, Load, Remove, Update.

API path: `/v2/account/keys`

#### Systemone

| Field | Description |
| --- | --- |
| `answers` | A map of question name to answer, using the same keys as the request's `questions` object. |
| `model` | Model ID that produced the response. |
| `questions` | A map of question name to question definition. |
| `state` | The state to evaluate. |
| `usage` | Token usage for the request. |

Operations: Create.

API path: `/v1/systemone`

#### Tag

| Field | Description |
| --- | --- |
| `id` |  |
| `name` | The name of the tag. |
| `resources` | An embedded object containing key value pairs of resource type and resource statistics. |

Operations: Create, List, Load, Remove.

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

Operations: List, Load.

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

Operations: Create, List, Load, Remove.

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

Operations: Create, List, Load, Remove, Update.

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

Operations: List, Load.

API path: `/v2/action-gateway/users`

#### VectorDatabase

| Field | Description |
| --- | --- |
| `id` |  |

Operations: Remove.

API path: `/v2/vector-databases/{id}`

#### VectordbBackup

| Field | Description |
| --- | --- |
| `backup_id` | Unique identifier for the backup (e.g., "vectordb-{uuid}-20240101-120000"). |
| `completed_at` | Timestamp when the backup process completed. |
| `started_at` | Timestamp when the backup process started. |
| `status` | Status of the backup: SUCCESS. |

Operations: List.

API path: `/v2/vector-databases/{id}/backups`

#### VectordbGetRestoreStatus

| Field | Description |
| --- | --- |
| `backup_id` | The backup ID being restored. |
| `error` | Error message if the restore failed. |
| `status` | Current status: STARTED, TRANSFERRING, TRANSFERRED, FINALIZING, SUCCESS, FAILED, CANCELLING, CANCELED. |

Operations: Load.

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

Operations: Create, List, Load.

API path: `/v2/vector-databases/{id}/resize`

#### VectordbGetVectorDbAdminCredential

| Field | Description |
| --- | --- |
| `api_token` | API token for that user. |
| `user_id` | Database user id from the cluster secret (opaque; matches what was provisioned). |

Operations: Load.

API path: `/v2/vector-databases/{id}/credentials`

#### VectordbRestoreBackup

| Field | Description |
| --- | --- |
| `backup_id` | The backup ID being restored. |
| `id` | Required. |
| `status` | Initial status of the restore operation (e.g., "STARTED"). |

Operations: Create.

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

Operations: Update.

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

Operations: Update.

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

Operations: Create, List, Load, Patch, Remove, Update.

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

Operations: Create, List, Load, Remove, Update.

API path: `/v2/vpc_nat_gateways`

#### VpcPeering

| Field | Description |
| --- | --- |
| `created_at` | A time value given in ISO8601 combined date and time format. |
| `id` | A unique ID that can be used to identify and reference the VPC peering. |
| `name` | The name of the VPC peering. |
| `status` | The current status of the VPC peering. |
| `vpc_ids` | An array of the two peered VPCs IDs. |

Operations: Create, List, Load, Remove, Update.

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

Operations: Create, List, Remove, Update.

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

Operations: Create, List, Load, Remove, Update.

API path: `/v2/vpcs/{vpc_uuid}/subnets`



## Entities


### AccessPoint

Create an instance: `access_point = client.AccessPoint()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `access_policy` | `dict` | Provider-agnostic NFS access policy for an access point. |
| `created_at` | `str` | The timestamp when the access point was created. |
| `id` | `str` | The unique identifier of the access point. |
| `is_default` | `bool` | Whether this is the share's default access point. |
| `name` | `str` | The human-readable name of the access point. |
| `path` | `str` | The export sub-path for this access point (always starts with `/`). |
| `share_id` | `str` | The unique identifier of the share this access point belongs to. |
| `status` | `str` | The current lifecycle status of an access point. |
| `updated_at` | `str` | The timestamp when the access point was last updated. |
| `vpc_id` | `str` | The VPC this access point is pinned to. |

#### Example: Load

```python
access_point = client.AccessPoint().load({"id": "access_point_id"})
```

#### Example: List

```python
access_points = client.AccessPoint().list({"share_id": "example"})
```

#### Example: Create

```python
access_point = client.AccessPoint().create({
    "share_id": "example_share_id",  # str
    "access_policy": {},  # dict
    "created_at": "example_created_at",  # str
    "id": "example_id",  # str
    "is_default": True,  # bool
    "name": "example_name",  # str
    "path": "example_path",  # str
    "status": "example_status",  # str
    "updated_at": "example_updated_at",  # str
})
```


### Account

Create an instance: `account = client.Account()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `droplet_limit` | `int` | The total number of Droplets current user or team may have active at one time. |
| `email` | `str` | The email address used by the current user to register for DigitalOcean. |
| `email_verified` | `bool` | If true, the user has verified their account via email. |
| `floating_ip_limit` | `int` | The total number of Floating IPs the current user or team may have. |
| `name` | `str` | The display name for the current user. |
| `status` | `str` | This value is one of "active", "warning" or "locked". |
| `status_message` | `str` | A human-readable message giving more details about the status of the account. |
| `team` | `dict` | When authorized in a team context, includes information about the current team. |
| `uuid` | `str` | The unique universal identifier for the current user. |

#### Example: Load

```python
account = client.Account().load()
```


### Action

Create an instance: `action = client.Action()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `action` | `dict` |  |
| `completed_at` | `str` | A time value given in ISO8601 combined date and time format that represents when the action was completed. |
| `id` | `int` | A unique numeric ID that can be used to identify and reference an action. |
| `region` | `dict` |  |
| `region_slug` | `str` | A human-readable string that is used as a unique identifier for each region. |
| `resource_id` | `int` | A unique identifier for the resource that the action is associated with. |
| `resource_type` | `str` | The type of resource that the action is associated with. |
| `started_at` | `str` | A time value given in ISO8601 combined date and time format that represents when the action was initiated. |
| `status` | `str` | The current status of the action. |
| `type` | `str` | This is the type of action that the object represents. |

#### Example: Load

```python
action = client.Action().load({"id": 1})
```

#### Example: List

```python
actions = client.Action().list()
```

#### Example: Create

```python
action = client.Action().create({
    "image_id": 1,  # int
    "region": {},  # dict
})
```


### ActorLimit

Create an instance: `actor_limit = client.ActorLimit()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `category` | `str` | The category the limit applies to. |
| `id` | `str` |  |
| `requests_per_minute` | `str` | Calls allowed per minute. |

#### Example: List

```python
actor_limits = client.ActorLimit().list({"id": "example"})
```


### AddOn

Create an instance: `add_on = client.AddOn()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `app_name` | `str` | The name of the application associated with the resource. |
| `app_slug` | `str` | The slug identifier for the application associated with the resource. |
| `description` | `str` | A brief description of the metadata item. |
| `display_name` | `str` | The display name of the metadata item. |
| `has_config` | `bool` | Indicates if the resource has configuration values set by the vendor. |
| `id` | `int` | Unique identifier for the addon metadata item. |
| `message` | `str` | A message related to the resource, if applicable. |
| `metadata` | `list` | Metadata associated with the resource, set by the user. |
| `name` | `str` | The name of the addon resource. |
| `options` | `list` |  |
| `plan_name` | `str` | The name of the plan associated with the resource. |
| `plan_price_per_month` | `int` | The price of the plan per month in US dollars. |
| `plan_slug` | `str` | The slug identifier for the plan associated with the resource. |
| `sso_url` | `str` | The Single Sign-On URL for the resource, if applicable. |
| `state` | `str` | The state the resource is currently in. |
| `type` | `str` | The data type of the metadata value. |
| `uuid` | `str` | The unique identifier for the addon resource. |

#### Example: Load

```python
add_on = client.AddOn().load({"resource_uuid": "resource_uuid"})
```

#### Example: List

```python
add_ons = client.AddOn().list({"app_slug": "example"})
```

#### Example: Create

```python
add_on = client.AddOn().create({
    "app_slug": "example_app_slug",  # str
    "description": "example_description",  # str
    "display_name": "example_display_name",  # str
    "has_config": True,  # bool
    "id": 1,  # int
    "name": "example_name",  # str
    "plan_slug": "example_plan_slug",  # str
    "state": "example_state",  # str
    "type": "example_type",  # str
    "uuid": "example_uuid",  # str
})
```


### ApiAgentVersion

Create an instance: `api_agent_version = client.ApiAgentVersion()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `agent_uuid` | `str` | Uuid of the agent this version belongs to |
| `attached_child_agents` | `list` | List of child agent relationships |
| `attached_functions` | `list` | List of function versions |
| `attached_guardrails` | `list` | List of guardrail version |
| `attached_knowledgebases` | `list` | List of knowledge base agent versions |
| `can_rollback` | `bool` | Whether the version is able to be rolled back to |
| `created_at` | `str` | Creation date |
| `created_by_email` | `str` | User who created this version |
| `currently_applied` | `bool` | Whether this is the currently applied configuration |
| `description` | `str` | Description of the agent |
| `id` | `str` | Unique identifier |
| `instruction` | `str` | Instruction for the agent |
| `k` | `int` | K value for the agent's configuration |
| `max_tokens` | `int` | Max tokens setting for the agent |
| `model_name` | `str` | Name of model associated to the agent version |
| `name` | `str` | Name of the agent |
| `provide_citations` | `bool` | Whether the agent should provide in-response citations |
| `retrieval_method` | `str` | - RETRIEVAL_METHOD_UNKNOWN: The retrieval method is unknown - RETRIEVAL_METHOD_REWRITE: The retrieval method is rewrite - RETRIEVAL_METHOD_STEP_BACK: The retrieval method is step back - RETRIEVAL_METHOD_SUB_QUERIES: The retrieval method is… |
| `tags` | `list` | Tags associated with the agent |
| `temperature` | `float` | Temperature setting for the agent |
| `top_p` | `float` | Top_p setting for the agent |
| `trigger_action` | `str` | Action triggering the configuration update |
| `version_hash` | `str` | Version hash |

#### Example: List

```python
api_agent_versions = client.ApiAgentVersion().list({"agent_id": "example"})
```


### ApiCreateAgentApiKeyOutput

Create an instance: `api_create_agent_api_key_output = client.ApiCreateAgentApiKeyOutput()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `agent_uuid` | `str` | Agent id |
| `created_at` | `str` | Creation date |
| `created_by` | `str` | Created by |
| `deleted_at` | `str` | Deleted date |
| `name` | `str` | Name |
| `secret_key` | `str` |  |
| `uuid` | `str` | Uuid |

#### Example: Create

```python
api_create_agent_api_key_output = client.ApiCreateAgentApiKeyOutput().create({
    "agent_id": "example_agent_id",  # str
})
```


### ApiCreateDataSourceFileUploadPresignedUrlsOutput

Create an instance: `api_create_data_source_file_upload_presigned_urls_output = client.ApiCreateDataSourceFileUploadPresignedUrlsOutput()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `files` | `list` | A list of files to generate presigned URLs for. |
| `request_id` | `str` | The ID generated for the request for Presigned URLs. |
| `uploads` | `list` | A list of generated presigned URLs and object keys, one per file. |

#### Example: Create

```python
api_create_data_source_file_upload_presigned_urls_output = client.ApiCreateDataSourceFileUploadPresignedUrlsOutput().create({
})
```


### ApiCreateKnowledgeBaseDataSourceOutput

Create an instance: `api_create_knowledge_base_data_source_output = client.ApiCreateKnowledgeBaseDataSourceOutput()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `aws_data_source` | `dict` | AWS S3 Data Source for Display |
| `bucket_name` | `str` | Name of storage bucket - Deprecated, moved to data_source_details |
| `chunking_algorithm` | `str` |  |
| `chunking_options` | `dict` |  |
| `created_at` | `str` | Creation date / time |
| `dropbox_data_source` | `dict` | Dropbox Data Source for Display |
| `file_upload_data_source` | `dict` | File to upload as data source for knowledge base. |
| `google_drive_data_source` | `dict` | Google Drive Data Source for Display |
| `item_path` | `str` | Path of folder or object in bucket - Deprecated, moved to data_source_details |
| `knowledge_base_uuid` | `str` | Knowledge base id |
| `last_datasource_indexing_job` | `dict` |  |
| `region` | `str` | Region code - Deprecated, moved to data_source_details |
| `spaces_data_source` | `dict` | Spaces Bucket Data Source |
| `updated_at` | `str` | Last modified |
| `uuid` | `str` | Unique id of knowledge base |
| `web_crawler_data_source` | `dict` | WebCrawlerDataSource |

#### Example: Create

```python
api_create_knowledge_base_data_source_output = client.ApiCreateKnowledgeBaseDataSourceOutput().create({
    "knowledge_base_id": "example_knowledge_base_id",  # str
})
```


### ApiCreateScenarioSetFromLibraryOutput

Create an instance: `api_create_scenario_set_from_library_output = client.ApiCreateScenarioSetFromLibraryOutput()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `bucket_name` | `str` | Object storage bucket holding the scenario file. |
| `bucket_region` | `str` | Object storage bucket region. |
| `created_at` | `str` | Time created at. |
| `deleted_at` | `str` | Time deleted at. |
| `description` | `str` | Customer-supplied description. |
| `failure_reason` | `str` | Human-readable explanation of a terminal FAILED status. |
| `generator_model_uuid` | `str` | Model that produced the scenarios. |
| `library_scenario_uuid` | `str` | UUID of the source library entry. |
| `name` | `str` | Customer-supplied name. |
| `scenario_count` | `int` | Number of scenarios in the set. |
| `scenario_set_uuid` | `str` | UUID of the scenario set. |
| `source_export_id` | `str` | Signals export UUID that produced this set. |
| `source_goal_description` | `str` | The goal that drove generation. |
| `source_kind` | `str` | How a scenario set was created. |
| `spaces_key` | `str` | Object storage key for the scenario file. |
| `status` | `str` | Lifecycle status of a scenario set. |
| `updated_at` | `str` | Time last updated at. |
| `workflow_uuid` | `str` | Identifier of the generation workflow. |

#### Example: Create

```python
api_create_scenario_set_from_library_output = client.ApiCreateScenarioSetFromLibraryOutput().create({
    "scenario_library_id": "example_scenario_library_id",  # str
})
```


### ApiDeleteAgentApiKeyOutput

Create an instance: `api_delete_agent_api_key_output = client.ApiDeleteAgentApiKeyOutput()`

#### Operations

| Method | Description |
| --- | --- |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |


### ApiDeleteAgentOutput

Create an instance: `api_delete_agent_output = client.ApiDeleteAgentOutput()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list()` | List entities, optionally matching the given criteria. |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `anthropic_api_key` | `dict` | Anthropic API Key Info |
| `anthropic_key_uuid` | `str` | Optional Anthropic API key ID to use with Anthropic models |
| `api_key_infos` | `list` | Api key infos |
| `api_keys` | `list` | Api keys |
| `chatbot` | `dict` | A Chatbot |
| `chatbot_identifiers` | `list` | Chatbot identifiers |
| `child_agents` | `list` | Child agents |
| `conversation_logs_enabled` | `bool` | Whether conversation logs are enabled for the agent |
| `created_at` | `str` | Creation date / time |
| `deployment` | `dict` | Description of deployment |
| `description` | `str` | Description of agent |
| `functions` | `list` |  |
| `guardrails` | `list` | The guardrails the agent is attached to |
| `if_case` | `str` | Instructions to the agent on how to use the route |
| `instruction` | `str` | Agent instruction. |
| `k` | `int` | How many results should be considered from an attached knowledge base |
| `knowledge_base_uuid` | `list` | Ids of the knowledge base(s) to attach to the agent |
| `knowledge_bases` | `list` | Knowledge bases |
| `logging_config` | `dict` |  |
| `max_tokens` | `int` | Specifies the maximum number of tokens the model can process in a single input or output, set as a number between 1 and 512. |
| `mcp_servers` | `list` | MCP (Model Context Protocol) servers attached to this agent |
| `model` | `dict` | Description of a Model |
| `model_provider_key` | `dict` |  |
| `model_provider_key_uuid` | `str` |  |
| `model_router` | `dict` | Model router |
| `model_router_uuid` | `str` |  |
| `model_uuid` | `str` | Identifier for the foundation model. |
| `name` | `str` | Agent name |
| `open_ai_key_uuid` | `str` | Optional OpenAI API key ID to use with OpenAI models |
| `openai_api_key` | `dict` | OpenAI API Key Info |
| `parent_agents` | `list` | Parent agents |
| `project_id` | `str` | The id of the DigitalOcean project this agent will belong to |
| `provide_citations` | `bool` | Whether the agent should provide in-response citations |
| `reasoning_effort` | `str` | The reasoning effort for the agent |
| `region` | `str` | Region code |
| `retrieval_method` | `str` | - RETRIEVAL_METHOD_UNKNOWN: The retrieval method is unknown - RETRIEVAL_METHOD_REWRITE: The retrieval method is rewrite - RETRIEVAL_METHOD_STEP_BACK: The retrieval method is step back - RETRIEVAL_METHOD_SUB_QUERIES: The retrieval method is… |
| `route_created_at` | `str` | Creation of route date / time |
| `route_created_by` | `str` | Id of user that created the route |
| `route_name` | `str` | Route name |
| `route_uuid` | `str` | Route uuid |
| `router_preset_slug` | `str` |  |
| `tags` | `list` | Agent tag to organize related resources |
| `temperature` | `float` | Controls the model’s creativity, specified as a number between 0 and 1. |
| `template` | `dict` | Represents an AgentTemplate entity |
| `thinking_token_budget` | `int` | The thinking token budget for Anthropic extended thinking (0 = disabled) |
| `top_p` | `float` | Defines the cumulative probability threshold for word selection, specified as a number between 0 and 1. |
| `updated_at` | `str` | Last modified |
| `url` | `str` | Access your agent under this url |
| `user_id` | `str` | Id of user that created the agent |
| `uuid` | `str` | Unique agent id |
| `version_hash` | `str` | The latest version of the agent |
| `vpc_egress_ips` | `list` | VPC Egress IPs |
| `vpc_uuid` | `str` |  |
| `web_fetch_enabled` | `bool` | Whether this agent can use the built-in web_fetch tool. |
| `web_search_enabled` | `bool` | Whether this agent can use the built-in web_search tool. |
| `workspace` | `dict` |  |
| `workspace_uuid` | `str` | Identifier for the workspace |

#### Example: List

```python
api_delete_agent_outputs = client.ApiDeleteAgentOutput().list()
```

#### Example: Create

```python
api_delete_agent_output = client.ApiDeleteAgentOutput().create({
})
```


### ApiDeleteAnthropicApiKeyOutput

Create an instance: `api_delete_anthropic_api_key_output = client.ApiDeleteAnthropicApiKeyOutput()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list()` | List entities, optionally matching the given criteria. |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `api_key` | `str` | Anthropic API key |
| `created_at` | `str` | Key creation date |
| `created_by` | `str` | Created by user id from DO |
| `deleted_at` | `str` | Key deleted date |
| `name` | `str` | Name |
| `updated_at` | `str` | Key last updated date |
| `uuid` | `str` | Uuid |

#### Example: List

```python
api_delete_anthropic_api_key_outputs = client.ApiDeleteAnthropicApiKeyOutput().list()
```

#### Example: Create

```python
api_delete_anthropic_api_key_output = client.ApiDeleteAnthropicApiKeyOutput().create({
})
```


### ApiDeleteCustomEvaluationMetricOutput

Create an instance: `api_delete_custom_evaluation_metric_output = client.ApiDeleteCustomEvaluationMetricOutput()`

#### Operations

| Method | Description |
| --- | --- |
| `remove(match)` | Remove the matching entity. |


### ApiDeleteCustomModelOutputPublic

Create an instance: `api_delete_custom_model_output_public = client.ApiDeleteCustomModelOutputPublic()`

#### Operations

| Method | Description |
| --- | --- |
| `remove(match)` | Remove the matching entity. |


### ApiDeleteEvaluationDatasetOutput

Create an instance: `api_delete_evaluation_dataset_output = client.ApiDeleteEvaluationDatasetOutput()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list()` | List entities, optionally matching the given criteria. |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `created_at` | `str` | Time created at. |
| `dataset_name` | `str` | Name of the dataset. |
| `dataset_paradigm` | `str` | EvaluationDatasetParadigm is the row/content shape of a dataset, orthogonal to the surface in EvaluationDatasetType (e.g. |
| `dataset_type` | `str` |  |
| `dataset_uuid` | `str` | UUID of the dataset. |
| `evaluation_dataset_uuid` | `str` | Evaluation dataset uuid. |
| `file_size` | `str` | The size of the dataset uploaded file in bytes. |
| `file_upload_dataset` | `dict` | File to upload as data source for knowledge base. |
| `has_ground_truth` | `bool` | Does the dataset have a ground truth column? |
| `name` | `str` | The name of the agent evaluation dataset. |
| `row_count` | `int` | Number of rows in the dataset. |

#### Example: List

```python
api_delete_evaluation_dataset_outputs = client.ApiDeleteEvaluationDatasetOutput().list()
```

#### Example: Create

```python
api_delete_evaluation_dataset_output = client.ApiDeleteEvaluationDatasetOutput().create({
})
```


### ApiDeleteKnowledgeBaseDataSourceOutput

Create an instance: `api_delete_knowledge_base_data_source_output = client.ApiDeleteKnowledgeBaseDataSourceOutput()`

#### Operations

| Method | Description |
| --- | --- |
| `remove(match)` | Remove the matching entity. |


### ApiDeleteKnowledgeBaseOutput

Create an instance: `api_delete_knowledge_base_output = client.ApiDeleteKnowledgeBaseOutput()`

#### Operations

| Method | Description |
| --- | --- |
| `remove(match)` | Remove the matching entity. |


### ApiDeleteModelApiKeyOutput

Create an instance: `api_delete_model_api_key_output = client.ApiDeleteModelApiKeyOutput()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list()` | List entities, optionally matching the given criteria. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `created_at` | `str` | Creation date |
| `created_by` | `str` | Created by |
| `deleted_at` | `str` | Deleted date |
| `name` | `str` | A human friendly name to identify the key |
| `secret_key` | `str` |  |
| `uuid` | `str` | Uuid |

#### Example: List

```python
api_delete_model_api_key_outputs = client.ApiDeleteModelApiKeyOutput().list()
```

#### Example: Create

```python
api_delete_model_api_key_output = client.ApiDeleteModelApiKeyOutput().create({
})
```


### ApiDeleteModelEvaluationPresetOutput

Create an instance: `api_delete_model_evaluation_preset_output = client.ApiDeleteModelEvaluationPresetOutput()`

#### Operations

| Method | Description |
| --- | --- |
| `remove(match)` | Remove the matching entity. |


### ApiDeleteModelEvaluationRunOutputPublic

Create an instance: `api_delete_model_evaluation_run_output_public = client.ApiDeleteModelEvaluationRunOutputPublic()`

#### Operations

| Method | Description |
| --- | --- |
| `remove(match)` | Remove the matching entity. |


### ApiDeleteModelRouterOutput

Create an instance: `api_delete_model_router_output = client.ApiDeleteModelRouterOutput()`

#### Operations

| Method | Description |
| --- | --- |
| `remove(match)` | Remove the matching entity. |


### ApiDeleteOpenAiapiKeyOutput

Create an instance: `api_delete_open_aiapi_key_output = client.ApiDeleteOpenAiapiKeyOutput()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list()` | List entities, optionally matching the given criteria. |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `api_key` | `str` | OpenAI API key |
| `created_at` | `str` | Key creation date |
| `created_by` | `str` | Created by user id from DO |
| `deleted_at` | `str` | Key deleted date |
| `models` | `list` | Models supported by the openAI api key |
| `name` | `str` | Name |
| `updated_at` | `str` | Key last updated date |
| `uuid` | `str` | Uuid |

#### Example: List

```python
api_delete_open_aiapi_key_outputs = client.ApiDeleteOpenAiapiKeyOutput().list()
```

#### Example: Create

```python
api_delete_open_aiapi_key_output = client.ApiDeleteOpenAiapiKeyOutput().create({
})
```


### ApiDeleteScenarioSetOutput

Create an instance: `api_delete_scenario_set_output = client.ApiDeleteScenarioSetOutput()`

#### Operations

| Method | Description |
| --- | --- |
| `remove(match)` | Remove the matching entity. |


### ApiDeleteScheduledIndexingOutput

Create an instance: `api_delete_scheduled_indexing_output = client.ApiDeleteScheduledIndexingOutput()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `created_at` | `str` | Created at timestamp |
| `days` | `list` | Days for execution (day is represented same as in a cron expression, e.g. |
| `deleted_at` | `str` | Deleted at timestamp (if soft deleted) |
| `is_active` | `bool` | Whether the schedule is currently active |
| `knowledge_base_uuid` | `str` | Knowledge base uuid associated with this schedule |
| `last_ran_at` | `str` | Last time the schedule was executed |
| `next_run_at` | `str` | Next scheduled run |
| `time` | `str` | Scheduled time of execution (HH:MM:SS format) |
| `updated_at` | `str` | Updated at timestamp |
| `uuid` | `str` | Unique identifier for the scheduled indexing entry |

#### Example: Create

```python
api_delete_scheduled_indexing_output = client.ApiDeleteScheduledIndexingOutput().create({
})
```


### ApiDeleteSimulationRunOutput

Create an instance: `api_delete_simulation_run_output = client.ApiDeleteSimulationRunOutput()`

#### Operations

| Method | Description |
| --- | --- |
| `remove(match)` | Remove the matching entity. |


### ApiDeleteWorkspaceOutput

Create an instance: `api_delete_workspace_output = client.ApiDeleteWorkspaceOutput()`

#### Operations

| Method | Description |
| --- | --- |
| `remove(match)` | Remove the matching entity. |


### ApiDropboxOauth2GetTokensOutput

Create an instance: `api_dropbox_oauth2_get_tokens_output = client.ApiDropboxOauth2GetTokensOutput()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `code` | `str` | The oauth2 code from google |
| `redirect_url` | `str` | Redirect url |
| `refresh_token` | `str` | The refresh token |
| `token` | `str` | The access token |

#### Example: Create

```python
api_dropbox_oauth2_get_tokens_output = client.ApiDropboxOauth2GetTokensOutput().create({
})
```


### ApiGenerateOauth2UrlOutput

Create an instance: `api_generate_oauth2_url_output = client.ApiGenerateOauth2UrlOutput()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `url` | `str` | The oauth2 url |

#### Example: Load

```python
api_generate_oauth2_url_output = client.ApiGenerateOauth2UrlOutput().load()
```


### ApiGenerateScenarioSetOutput

Create an instance: `api_generate_scenario_set_output = client.ApiGenerateScenarioSetOutput()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `bucket_name` | `str` | Object storage bucket holding the scenario file. |
| `bucket_region` | `str` | Object storage bucket region. |
| `created_at` | `str` | Time created at. |
| `deleted_at` | `str` | Time deleted at. |
| `description` | `str` | Customer-supplied description. |
| `failure_reason` | `str` | Human-readable explanation of a terminal FAILED status. |
| `generator_model_uuid` | `str` | Model that produced the scenarios. |
| `goal_description` | `str` | The goal that drives scenario generation. |
| `library_scenario_uuid` | `str` | UUID of the source library entry. |
| `name` | `str` | Customer-supplied name. |
| `num_scenarios` | `int` | Number of scenarios to generate. |
| `scenario_count` | `int` | Number of scenarios in the set. |
| `scenario_set_uuid` | `str` | UUID of the scenario set. |
| `source_export_id` | `str` | Signals export UUID that produced this set. |
| `source_goal_description` | `str` | The goal that drove generation. |
| `source_kind` | `str` | How a scenario set was created. |
| `spaces_key` | `str` | Object storage key for the scenario file. |
| `status` | `str` | Lifecycle status of a scenario set. |
| `updated_at` | `str` | Time last updated at. |
| `workflow_uuid` | `str` | Identifier of the generation workflow. |

#### Example: Create

```python
api_generate_scenario_set_output = client.ApiGenerateScenarioSetOutput().create({
})
```


### ApiGetAgentOutput

Create an instance: `api_get_agent_output = client.ApiGetAgentOutput()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `anthropic_api_key` | `dict` | Anthropic API Key Info |
| `api_key_infos` | `list` | Api key infos |
| `api_keys` | `list` | Api keys |
| `chatbot` | `dict` | A Chatbot |
| `chatbot_identifiers` | `list` | Chatbot identifiers |
| `child_agents` | `list` | Child agents |
| `conversation_logs_enabled` | `bool` | Whether conversation logs are enabled for the agent |
| `created_at` | `str` | Creation date / time |
| `deployment` | `dict` | Description of deployment |
| `description` | `str` | Description of agent |
| `functions` | `list` |  |
| `guardrails` | `list` | The guardrails the agent is attached to |
| `if_case` | `str` |  |
| `instruction` | `str` | Agent instruction. |
| `k` | `int` |  |
| `knowledge_bases` | `list` | Knowledge bases |
| `logging_config` | `dict` |  |
| `max_tokens` | `int` |  |
| `mcp_servers` | `list` | MCP (Model Context Protocol) servers attached to this agent |
| `model` | `dict` | Description of a Model |
| `model_provider_key` | `dict` |  |
| `model_router` | `dict` | Model router |
| `name` | `str` | Agent name |
| `openai_api_key` | `dict` | OpenAI API Key Info |
| `parent_agents` | `list` | Parent agents |
| `project_id` | `str` |  |
| `provide_citations` | `bool` | Whether the agent should provide in-response citations |
| `reasoning_effort` | `str` | The reasoning effort for the agent |
| `region` | `str` | Region code |
| `retrieval_method` | `str` | - RETRIEVAL_METHOD_UNKNOWN: The retrieval method is unknown - RETRIEVAL_METHOD_REWRITE: The retrieval method is rewrite - RETRIEVAL_METHOD_STEP_BACK: The retrieval method is step back - RETRIEVAL_METHOD_SUB_QUERIES: The retrieval method is… |
| `route_created_at` | `str` | Creation of route date / time |
| `route_created_by` | `str` |  |
| `route_name` | `str` | Route name |
| `route_uuid` | `str` |  |
| `tags` | `list` | Agent tag to organize related resources |
| `temperature` | `float` |  |
| `template` | `dict` | Represents an AgentTemplate entity |
| `thinking_token_budget` | `int` | The thinking token budget for Anthropic extended thinking (0 = disabled) |
| `top_p` | `float` |  |
| `updated_at` | `str` | Last modified |
| `url` | `str` | Access your agent under this url |
| `user_id` | `str` | Id of user that created the agent |
| `uuid` | `str` | Unique agent id |
| `version_hash` | `str` | The latest version of the agent |
| `vpc_egress_ips` | `list` | VPC Egress IPs |
| `vpc_uuid` | `str` |  |
| `web_fetch_enabled` | `bool` | Whether this agent can use the built-in web_fetch tool. |
| `web_search_enabled` | `bool` | Whether this agent can use the built-in web_search tool. |
| `workspace` | `dict` |  |

#### Example: Load

```python
api_get_agent_output = client.ApiGetAgentOutput().load({"uuid": "uuid"})
```


### ApiGetAgentUsageOutput

Create an instance: `api_get_agent_usage_output = client.ApiGetAgentUsageOutput()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `log_insights_usage` | `dict` | Resource Usage Description |
| `usage` | `dict` | Resource Usage Description |

#### Example: Load

```python
api_get_agent_usage_output = client.ApiGetAgentUsageOutput().load({"agent_id": "agent_id"})
```


### ApiGetAnthropicApiKeyOutput

Create an instance: `api_get_anthropic_api_key_output = client.ApiGetAnthropicApiKeyOutput()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `created_at` | `str` | Key creation date |
| `created_by` | `str` | Created by user id from DO |
| `deleted_at` | `str` | Key deleted date |
| `name` | `str` | Name |
| `updated_at` | `str` | Key last updated date |
| `uuid` | `str` | Uuid |

#### Example: Load

```python
api_get_anthropic_api_key_output = client.ApiGetAnthropicApiKeyOutput().load({"api_key_uuid": "api_key_uuid"})
```


### ApiGetChildrenOutput

Create an instance: `api_get_children_output = client.ApiGetChildrenOutput()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `anthropic_api_key` | `dict` | Anthropic API Key Info |
| `api_key_infos` | `list` | Api key infos |
| `api_keys` | `list` | Api keys |
| `chatbot` | `dict` | A Chatbot |
| `chatbot_identifiers` | `list` | Chatbot identifiers |
| `child_agents` | `list` | Child agents |
| `conversation_logs_enabled` | `bool` | Whether conversation logs are enabled for the agent |
| `created_at` | `str` | Creation date / time |
| `deployment` | `dict` | Description of deployment |
| `description` | `str` | Description of agent |
| `functions` | `list` |  |
| `guardrails` | `list` | The guardrails the agent is attached to |
| `if_case` | `str` |  |
| `instruction` | `str` | Agent instruction. |
| `k` | `int` |  |
| `knowledge_bases` | `list` | Knowledge bases |
| `logging_config` | `dict` |  |
| `max_tokens` | `int` |  |
| `mcp_servers` | `list` | MCP (Model Context Protocol) servers attached to this agent |
| `model` | `dict` | Description of a Model |
| `model_provider_key` | `dict` |  |
| `model_router` | `dict` | Model router |
| `name` | `str` | Agent name |
| `openai_api_key` | `dict` | OpenAI API Key Info |
| `parent_agents` | `list` | Parent agents |
| `project_id` | `str` |  |
| `provide_citations` | `bool` | Whether the agent should provide in-response citations |
| `reasoning_effort` | `str` | The reasoning effort for the agent |
| `region` | `str` | Region code |
| `retrieval_method` | `str` | - RETRIEVAL_METHOD_UNKNOWN: The retrieval method is unknown - RETRIEVAL_METHOD_REWRITE: The retrieval method is rewrite - RETRIEVAL_METHOD_STEP_BACK: The retrieval method is step back - RETRIEVAL_METHOD_SUB_QUERIES: The retrieval method is… |
| `route_created_at` | `str` | Creation of route date / time |
| `route_created_by` | `str` |  |
| `route_name` | `str` | Route name |
| `route_uuid` | `str` |  |
| `tags` | `list` | Agent tag to organize related resources |
| `temperature` | `float` |  |
| `template` | `dict` | Represents an AgentTemplate entity |
| `thinking_token_budget` | `int` | The thinking token budget for Anthropic extended thinking (0 = disabled) |
| `top_p` | `float` |  |
| `updated_at` | `str` | Last modified |
| `url` | `str` | Access your agent under this url |
| `user_id` | `str` | Id of user that created the agent |
| `uuid` | `str` | Unique agent id |
| `version_hash` | `str` | The latest version of the agent |
| `vpc_egress_ips` | `list` | VPC Egress IPs |
| `vpc_uuid` | `str` |  |
| `web_fetch_enabled` | `bool` | Whether this agent can use the built-in web_fetch tool. |
| `web_search_enabled` | `bool` | Whether this agent can use the built-in web_search tool. |
| `workspace` | `dict` |  |

#### Example: List

```python
api_get_children_outputs = client.ApiGetChildrenOutput().list({"agent_id": "example"})
```


### ApiGetCustomModelOutputPublic

Create an instance: `api_get_custom_model_output_public = client.ApiGetCustomModelOutputPublic()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `active_deployments` | `list` | List of active deployments using this model |
| `architecture` | `str` | Model architecture type (free-form string from config.json) |
| `config_json` | `dict` | Raw config.json contents from the model repository |
| `context_length` | `int` | Maximum context length supported by the model |
| `cost_estimate_per_month` | `int` | Estimated monthly cost in dollars for hosting |
| `created_at` | `str` | Timestamp when the model was created |
| `description` | `str` | Description of the custom model |
| `error_message` | `str` | User-facing reason the most recent import failed; empty otherwise. |
| `file_count` | `int` | Number of files in the model |
| `input_modalities` | `list` | Input modalities supported (e.g., text, image) |
| `license` | `str` | License under which the model is distributed |
| `name` | `str` | Name of the custom model |
| `output_modalities` | `list` | Output modalities supported (e.g., text, image) |
| `parameters` | `str` | Number of parameters in the model |
| `source_ref` | `dict` | Reference to the original source of the model |
| `source_type` | `str` | Source from which the model was imported |
| `status` | `str` | Import and deployment status of the custom model |
| `storage_region` | `str` | Region of the Spaces bucket where model files are stored |
| `tags` | `dict` | User-defined tags for organizing models |
| `team_id` | `str` | Team that owns the model |
| `total_size_bytes` | `str` | Total size of model files in bytes |
| `updated_at` | `str` | Timestamp when the model was last updated |
| `uuid` | `str` | Unique identifier for the custom model |

#### Example: Load

```python
api_get_custom_model_output_public = client.ApiGetCustomModelOutputPublic().load({"uuid": "uuid"})
```

#### Example: List

```python
api_get_custom_model_output_publics = client.ApiGetCustomModelOutputPublic().list()
```


### ApiGetEvaluationDatasetDownloadUrlOutput

Create an instance: `api_get_evaluation_dataset_download_url_output = client.ApiGetEvaluationDatasetDownloadUrlOutput()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `download_url` | `str` | The presigned URL to download the dataset file. |
| `expires_at` | `str` | The time the URL expires at. |

#### Example: Load

```python
api_get_evaluation_dataset_download_url_output = client.ApiGetEvaluationDatasetDownloadUrlOutput().load({"evaluation_dataset_id": "evaluation_dataset_id"})
```


### ApiGetEvaluationRunOutput

Create an instance: `api_get_evaluation_run_output = client.ApiGetEvaluationRunOutput()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `agent_deleted` | `bool` | Whether agent is deleted |
| `agent_deployment_name` | `str` | The agent deployment name |
| `agent_deployment_names` | `list` | Agent deployment names to run the test case against. |
| `agent_name` | `str` | Agent name |
| `agent_uuid` | `str` | Agent UUID. |
| `agent_uuids` | `list` | Agent UUIDs to run the test case against (legacy agents). |
| `agent_version_hash` | `str` | Version hash |
| `agent_workspace_uuid` | `str` | Agent workspace uuid |
| `created_by_user_email` | `str` |  |
| `created_by_user_id` | `str` |  |
| `error_description` | `str` | The error description |
| `evaluation_run_uuid` | `str` | Evaluation run UUID. |
| `evaluation_run_uuids` | `list` |  |
| `evaluation_test_case_workspace_uuid` | `str` | Evaluation test case workspace uuid |
| `finished_at` | `str` | Run end time. |
| `pass_status` | `bool` | The pass status of the evaluation run based on the star metric. |
| `queued_at` | `str` | Run queued time. |
| `run_level_metric_results` | `list` |  |
| `run_name` | `str` | Run name. |
| `star_metric_result` | `dict` |  |
| `started_at` | `str` | Run start time. |
| `status` | `str` | Evaluation Run Statuses |
| `test_case_description` | `str` | Test case description. |
| `test_case_name` | `str` | Test case name. |
| `test_case_uuid` | `str` | Test-case UUID. |
| `test_case_version` | `int` | Test-case-version. |

#### Example: Load

```python
api_get_evaluation_run_output = client.ApiGetEvaluationRunOutput().load({"evaluation_run_uuid": "evaluation_run_uuid"})
```

#### Example: Create

```python
api_get_evaluation_run_output = client.ApiGetEvaluationRunOutput().create({
})
```


### ApiGetEvaluationRunResultsOutput

Create an instance: `api_get_evaluation_run_results_output = client.ApiGetEvaluationRunResultsOutput()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `evaluation_trace_spans` | `list` | The evaluated trace spans. |
| `ground_truth` | `str` | The ground truth for the prompt. |
| `input` | `str` |  |
| `input_tokens` | `str` | The number of input tokens used in the prompt. |
| `output` | `str` |  |
| `output_tokens` | `str` | The number of output tokens used in the prompt. |
| `prompt_chunks` | `list` | The list of prompt chunks. |
| `prompt_id` | `int` | Prompt ID |
| `prompt_level_metric_results` | `list` | The metric results for the prompt. |
| `trace_id` | `str` | The trace id for the prompt. |

#### Example: List

```python
api_get_evaluation_run_results_outputs = client.ApiGetEvaluationRunResultsOutput().list({"evaluation_run_id": "example"})
```


### ApiGetEvaluationTestCaseOutput

Create an instance: `api_get_evaluation_test_case_output = client.ApiGetEvaluationTestCaseOutput()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `agent_workspace_name` | `str` |  |
| `archived_at` | `str` |  |
| `created_at` | `str` |  |
| `created_by_user_email` | `str` |  |
| `created_by_user_id` | `str` |  |
| `dataset` | `dict` |  |
| `dataset_name` | `str` |  |
| `dataset_uuid` | `str` | Dataset against which the test‑case is executed. |
| `description` | `str` | Description of the test case. |
| `latest_version_number_of_runs` | `int` |  |
| `metrics` | `list` | Full metric list to use for evaluation test case. |
| `name` | `str` | Name of the test case. |
| `star_metric` | `dict` |  |
| `test_case_uuid` | `str` | Test‑case UUID. |
| `total_runs` | `int` |  |
| `updated_at` | `str` |  |
| `updated_by_user_email` | `str` |  |
| `updated_by_user_id` | `str` |  |
| `version` | `int` |  |
| `workspace_uuid` | `str` | The workspace uuid. |

#### Example: Load

```python
api_get_evaluation_test_case_output = client.ApiGetEvaluationTestCaseOutput().load({"test_case_uuid": "test_case_uuid"})
```

#### Example: List

```python
api_get_evaluation_test_case_outputs = client.ApiGetEvaluationTestCaseOutput().list()
```

#### Example: Create

```python
api_get_evaluation_test_case_output = client.ApiGetEvaluationTestCaseOutput().create({
})
```


### ApiGetIndexingJobDetailsSignedUrlOutput

Create an instance: `api_get_indexing_job_details_signed_url_output = client.ApiGetIndexingJobDetailsSignedUrlOutput()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `signed_url` | `str` | The signed url for downloading the indexing job details |

#### Example: Load

```python
api_get_indexing_job_details_signed_url_output = client.ApiGetIndexingJobDetailsSignedUrlOutput().load({"indexing_job_id": "indexing_job_id"})
```


### ApiGetKnowledgeBaseIndexingJobOutput

Create an instance: `api_get_knowledge_base_indexing_job_output = client.ApiGetKnowledgeBaseIndexingJobOutput()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `completed_datasources` | `int` | Number of datasources indexed completed |
| `created_at` | `str` | Creation date / time |
| `data_source_jobs` | `list` | Details on Data Sources included in the Indexing Job |
| `data_source_uuids` | `list` | List of data source ids to index, if none are provided, all data sources will be indexed |
| `finished_at` | `str` |  |
| `is_report_available` | `bool` | Boolean value to determine if the indexing job details are available |
| `knowledge_base_uuid` | `str` | Knowledge base id |
| `phase` | `str` |  |
| `started_at` | `str` |  |
| `status` | `str` |  |
| `tokens` | `int` | Number of tokens [This field is deprecated] |
| `total_datasources` | `int` | Number of datasources being indexed |
| `total_tokens` | `str` | Total Tokens Consumed By the Indexing Job |
| `updated_at` | `str` | Last modified |
| `uuid` | `str` | Unique id |

#### Example: Load

```python
api_get_knowledge_base_indexing_job_output = client.ApiGetKnowledgeBaseIndexingJobOutput().load({"uuid": "uuid"})
```

#### Example: List

```python
api_get_knowledge_base_indexing_job_outputs = client.ApiGetKnowledgeBaseIndexingJobOutput().list()
```

#### Example: Create

```python
api_get_knowledge_base_indexing_job_output = client.ApiGetKnowledgeBaseIndexingJobOutput().create({
})
```


### ApiGetKnowledgeBaseOutput

Create an instance: `api_get_knowledge_base_output = client.ApiGetKnowledgeBaseOutput()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `database_status` | `str` |  |
| `knowledge_base` | `dict` | Knowledgebase Description |

#### Example: Load

```python
api_get_knowledge_base_output = client.ApiGetKnowledgeBaseOutput().load({"uuid": "uuid"})
```


### ApiGetModelEvaluationRunOutput

Create an instance: `api_get_model_evaluation_run_output = client.ApiGetModelEvaluationRunOutput()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `links` | `dict` | Links to other pages |
| `meta` | `dict` | Meta information about the data set |
| `results` | `list` | Paginated per-prompt evaluation results. |
| `run` | `dict` | Model Evaluation Run Detail - full view returned when fetching a specific run. |

#### Example: Load

```python
api_get_model_evaluation_run_output = client.ApiGetModelEvaluationRunOutput().load({"eval_run_uuid": "eval_run_uuid"})
```


### ApiGetModelEvaluationRunResultsDownloadUrlOutput

Create an instance: `api_get_model_evaluation_run_results_download_url_output = client.ApiGetModelEvaluationRunResultsDownloadUrlOutput()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `download_url` | `str` | The presigned URL to download the gzip-compressed JSON results file (.json.gz). |
| `expires_at` | `str` | The time the URL expires at. |

#### Example: Load

```python
api_get_model_evaluation_run_results_download_url_output = client.ApiGetModelEvaluationRunResultsDownloadUrlOutput().load({"model_evaluation_run_id": "model_evaluation_run_id"})
```


### ApiGetModelRouterOutput

Create an instance: `api_get_model_router_output = client.ApiGetModelRouterOutput()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `config` | `dict` |  |
| `created_at` | `str` | Creation date / time |
| `description` | `str` | Description |
| `fallback_models` | `list` | At least one fallback model is required; order defines failover priority |
| `name` | `str` | Name of the model router |
| `policies` | `list` | Router policies |
| `regions` | `list` | Target regions for the router |
| `updated_at` | `str` | Last modified |
| `uuid` | `str` | Unique id |

#### Example: Load

```python
api_get_model_router_output = client.ApiGetModelRouterOutput().load({"uuid": "uuid"})
```

#### Example: List

```python
api_get_model_router_outputs = client.ApiGetModelRouterOutput().list()
```

#### Example: Create

```python
api_get_model_router_output = client.ApiGetModelRouterOutput().create({
})
```


### ApiGetOpenAiapiKeyOutput

Create an instance: `api_get_open_aiapi_key_output = client.ApiGetOpenAiapiKeyOutput()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `created_at` | `str` | Key creation date |
| `created_by` | `str` | Created by user id from DO |
| `deleted_at` | `str` | Key deleted date |
| `models` | `list` | Models supported by the openAI api key |
| `name` | `str` | Name |
| `updated_at` | `str` | Key last updated date |
| `uuid` | `str` | Uuid |

#### Example: Load

```python
api_get_open_aiapi_key_output = client.ApiGetOpenAiapiKeyOutput().load({"api_key_uuid": "api_key_uuid"})
```


### ApiGetScenarioSetDownloadUrlOutput

Create an instance: `api_get_scenario_set_download_url_output = client.ApiGetScenarioSetDownloadUrlOutput()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `download_url` | `str` | The presigned URL to download the scenario set file. |
| `expires_at` | `str` | The time the URL expires at. |

#### Example: Load

```python
api_get_scenario_set_download_url_output = client.ApiGetScenarioSetDownloadUrlOutput().load({"scenario_set_id": "scenario_set_id"})
```


### ApiGetScenarioSetOutput

Create an instance: `api_get_scenario_set_output = client.ApiGetScenarioSetOutput()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `bucket_name` | `str` | Object storage bucket holding the scenario file. |
| `bucket_region` | `str` | Object storage bucket region. |
| `created_at` | `str` | Time created at. |
| `deleted_at` | `str` | Time deleted at. |
| `description` | `str` | Customer-supplied description. |
| `failure_reason` | `str` | Human-readable explanation of a terminal FAILED status. |
| `file_upload_scenario_set` | `Any` | Uploaded scenario file to ingest. |
| `generator_model_uuid` | `str` | Model that produced the scenarios. |
| `library_scenario_uuid` | `str` | UUID of the source library entry. |
| `name` | `str` | Customer-supplied name. |
| `scenario_count` | `int` | Number of scenarios in the set. |
| `scenario_set_uuid` | `str` | UUID of the scenario set. |
| `scenarios` | `list` | Inline scenarios. |
| `source_export_id` | `str` | Signals export UUID that produced this set. |
| `source_goal_description` | `str` | The goal that drove generation. |
| `source_kind` | `str` | How a scenario set was created. |
| `spaces_key` | `str` | Object storage key for the scenario file. |
| `status` | `str` | Lifecycle status of a scenario set. |
| `updated_at` | `str` | Time last updated at. |
| `workflow_uuid` | `str` | Identifier of the generation workflow. |

#### Example: Load

```python
api_get_scenario_set_output = client.ApiGetScenarioSetOutput().load({"scenario_set_uuid": "scenario_set_uuid"})
```

#### Example: List

```python
api_get_scenario_set_outputs = client.ApiGetScenarioSetOutput().list()
```

#### Example: Create

```python
api_get_scenario_set_output = client.ApiGetScenarioSetOutput().create({
})
```


### ApiGetScheduledIndexingOutput

Create an instance: `api_get_scheduled_indexing_output = client.ApiGetScheduledIndexingOutput()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `created_at` | `str` | Created at timestamp |
| `days` | `list` | Days for execution (day is represented same as in a cron expression, e.g. |
| `deleted_at` | `str` | Deleted at timestamp (if soft deleted) |
| `is_active` | `bool` | Whether the schedule is currently active |
| `knowledge_base_uuid` | `str` | Knowledge base uuid associated with this schedule |
| `last_ran_at` | `str` | Last time the schedule was executed |
| `next_run_at` | `str` | Next scheduled run |
| `time` | `str` | Scheduled time of execution (HH:MM:SS format) |
| `updated_at` | `str` | Updated at timestamp |
| `uuid` | `str` | Unique identifier for the scheduled indexing entry |

#### Example: Load

```python
api_get_scheduled_indexing_output = client.ApiGetScheduledIndexingOutput().load({"knowledge_base_uuid": "knowledge_base_uuid"})
```


### ApiGetSimulationJourneyTrajectoryUrlOutput

Create an instance: `api_get_simulation_journey_trajectory_url_output = client.ApiGetSimulationJourneyTrajectoryUrlOutput()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `download_url` | `str` | The presigned URL to download the trajectory JSON file. |
| `expires_at` | `str` | The time the URL expires at. |

#### Example: Load

```python
api_get_simulation_journey_trajectory_url_output = client.ApiGetSimulationJourneyTrajectoryUrlOutput().load({"journey_id": "journey_id", "simulation_run_id": "simulation_run_id"})
```


### ApiGetSimulationRunOutput

Create an instance: `api_get_simulation_run_output = client.ApiGetSimulationRunOutput()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `scenario_results` | `list` | Per-scenario breakdown of journey outcomes, aggregated from journey rows. |
| `simulation_run` | `dict` | One execution of a scenario set against a candidate agent. |

#### Example: Load

```python
api_get_simulation_run_output = client.ApiGetSimulationRunOutput().load({"run_uuid": "run_uuid"})
```


### ApiGetWorkspaceOutput

Create an instance: `api_get_workspace_output = client.ApiGetWorkspaceOutput()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `agent_uuids` | `list` | Ids of the agents(s) to attach to the workspace |
| `agents` | `list` | Agents |
| `created_at` | `str` | Creation date |
| `created_by` | `str` | The id of user who created this workspace |
| `created_by_email` | `str` | The email of the user who created this workspace |
| `deleted_at` | `str` | Deleted date |
| `description` | `str` | Description of the workspace |
| `evaluation_test_cases` | `list` | Evaluations |
| `name` | `str` | Name of the workspace |
| `updated_at` | `str` | Update date |
| `uuid` | `str` | Unique id |

#### Example: Load

```python
api_get_workspace_output = client.ApiGetWorkspaceOutput().load({"workspace_uuid": "workspace_uuid"})
```

#### Example: List

```python
api_get_workspace_outputs = client.ApiGetWorkspaceOutput().list()
```

#### Example: Create

```python
api_get_workspace_output = client.ApiGetWorkspaceOutput().create({
})
```


### ApiImportCustomModelOutputPublic

Create an instance: `api_import_custom_model_output_public = client.ApiImportCustomModelOutputPublic()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `accept_hf_token_storage` | `bool` | Whether the caller accepts storage of their HuggingFace token for gated model access |
| `accept_terms_and_conditions` | `bool` | Whether the caller accepts the terms and conditions for importing this model |
| `description` | `str` | Description of the model |
| `error` | `str` |  |
| `import_job` | `dict` | Import job tracking for a custom model |
| `model` | `dict` | Custom model - user-imported model from HuggingFace, Spaces, etc. |
| `name` | `str` | Name for the imported model |
| `preferred_gpu_region` | `str` | Preferred GPU region for deployment |
| `source_ref` | `dict` | Reference to the original source of the model |
| `source_type` | `str` | Source from which the model was imported |
| `tags` | `dict` | User-defined tags for organizing models |
| `validation_steps` | `list` | Validation steps performed during import |

#### Example: Create

```python
api_import_custom_model_output_public = client.ApiImportCustomModelOutputPublic().create({
})
```


### ApiIndexedDataSource

Create an instance: `api_indexed_data_source = client.ApiIndexedDataSource()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `completed_at` | `str` | Timestamp when data source completed indexing |
| `data_source_uuid` | `str` | Uuid of the indexed data source |
| `error_details` | `str` | A detailed error description |
| `error_msg` | `str` | A string code provinding a hint which part of the system experienced an error |
| `failed_item_count` | `str` | Total count of files that have failed |
| `indexed_file_count` | `str` | Total count of files that have been indexed |
| `indexed_item_count` | `str` | Total count of files that have been indexed |
| `removed_item_count` | `str` | Total count of files that have been removed |
| `skipped_item_count` | `str` | Total count of files that have been skipped |
| `started_at` | `str` | Timestamp when data source started indexing |
| `status` | `str` |  |
| `total_bytes` | `str` | Total size of files in data source in bytes |
| `total_bytes_indexed` | `str` | Total size of files in data source in bytes that have been indexed |
| `total_file_count` | `str` | Total file count in the data source |

#### Example: List

```python
api_indexed_data_sources = client.ApiIndexedDataSource().list({"indexing_job_id": "example"})
```


### ApiLinkAgentFunctionOutput

Create an instance: `api_link_agent_function_output = client.ApiLinkAgentFunctionOutput()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `agent_uuid` | `str` | Agent id |
| `anthropic_api_key` | `dict` | Anthropic API Key Info |
| `api_key_infos` | `list` | Api key infos |
| `api_keys` | `list` | Api keys |
| `chatbot` | `dict` | A Chatbot |
| `chatbot_identifiers` | `list` | Chatbot identifiers |
| `child_agents` | `list` | Child agents |
| `conversation_logs_enabled` | `bool` | Whether conversation logs are enabled for the agent |
| `created_at` | `str` | Creation date / time |
| `deployment` | `dict` | Description of deployment |
| `description` | `str` | Description of agent |
| `faas_name` | `str` | The name of the function in the DigitalOcean functions platform |
| `faas_namespace` | `str` | The namespace of the function in the DigitalOcean functions platform |
| `function_name` | `str` | Function name |
| `functions` | `list` |  |
| `guardrails` | `list` | The guardrails the agent is attached to |
| `if_case` | `str` |  |
| `input_schema` | `dict` | Describe the input schema for the function so the agent may call it |
| `instruction` | `str` | Agent instruction. |
| `k` | `int` |  |
| `knowledge_bases` | `list` | Knowledge bases |
| `logging_config` | `dict` |  |
| `max_tokens` | `int` |  |
| `mcp_servers` | `list` | MCP (Model Context Protocol) servers attached to this agent |
| `model` | `dict` | Description of a Model |
| `model_provider_key` | `dict` |  |
| `model_router` | `dict` | Model router |
| `name` | `str` | Agent name |
| `openai_api_key` | `dict` | OpenAI API Key Info |
| `output_schema` | `dict` | Describe the output schema for the function so the agent handle its response |
| `parent_agents` | `list` | Parent agents |
| `project_id` | `str` |  |
| `provide_citations` | `bool` | Whether the agent should provide in-response citations |
| `reasoning_effort` | `str` | The reasoning effort for the agent |
| `region` | `str` | Region code |
| `retrieval_method` | `str` | - RETRIEVAL_METHOD_UNKNOWN: The retrieval method is unknown - RETRIEVAL_METHOD_REWRITE: The retrieval method is rewrite - RETRIEVAL_METHOD_STEP_BACK: The retrieval method is step back - RETRIEVAL_METHOD_SUB_QUERIES: The retrieval method is… |
| `route_created_at` | `str` | Creation of route date / time |
| `route_created_by` | `str` |  |
| `route_name` | `str` | Route name |
| `route_uuid` | `str` |  |
| `tags` | `list` | Agent tag to organize related resources |
| `temperature` | `float` |  |
| `template` | `dict` | Represents an AgentTemplate entity |
| `thinking_token_budget` | `int` | The thinking token budget for Anthropic extended thinking (0 = disabled) |
| `top_p` | `float` |  |
| `updated_at` | `str` | Last modified |
| `url` | `str` | Access your agent under this url |
| `user_id` | `str` | Id of user that created the agent |
| `uuid` | `str` | Unique agent id |
| `version_hash` | `str` | The latest version of the agent |
| `vpc_egress_ips` | `list` | VPC Egress IPs |
| `vpc_uuid` | `str` |  |
| `web_fetch_enabled` | `bool` | Whether this agent can use the built-in web_fetch tool. |
| `web_search_enabled` | `bool` | Whether this agent can use the built-in web_search tool. |
| `workspace` | `dict` |  |

#### Example: Create

```python
api_link_agent_function_output = client.ApiLinkAgentFunctionOutput().create({
    "agent_id": "example_agent_id",  # str
})
```


### ApiLinkAgentGuardrailOutput

Create an instance: `api_link_agent_guardrail_output = client.ApiLinkAgentGuardrailOutput()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `agent_uuid` | `str` | The UUID of the agent. |
| `anthropic_api_key` | `dict` | Anthropic API Key Info |
| `api_key_infos` | `list` | Api key infos |
| `api_keys` | `list` | Api keys |
| `chatbot` | `dict` | A Chatbot |
| `chatbot_identifiers` | `list` | Chatbot identifiers |
| `child_agents` | `list` | Child agents |
| `conversation_logs_enabled` | `bool` | Whether conversation logs are enabled for the agent |
| `created_at` | `str` | Creation date / time |
| `deployment` | `dict` | Description of deployment |
| `description` | `str` | Description of agent |
| `functions` | `list` |  |
| `guardrails` | `list` | The guardrails the agent is attached to |
| `if_case` | `str` |  |
| `instruction` | `str` | Agent instruction. |
| `k` | `int` |  |
| `knowledge_bases` | `list` | Knowledge bases |
| `logging_config` | `dict` |  |
| `max_tokens` | `int` |  |
| `mcp_servers` | `list` | MCP (Model Context Protocol) servers attached to this agent |
| `model` | `dict` | Description of a Model |
| `model_provider_key` | `dict` |  |
| `model_router` | `dict` | Model router |
| `name` | `str` | Agent name |
| `openai_api_key` | `dict` | OpenAI API Key Info |
| `parent_agents` | `list` | Parent agents |
| `project_id` | `str` |  |
| `provide_citations` | `bool` | Whether the agent should provide in-response citations |
| `reasoning_effort` | `str` | The reasoning effort for the agent |
| `region` | `str` | Region code |
| `retrieval_method` | `str` | - RETRIEVAL_METHOD_UNKNOWN: The retrieval method is unknown - RETRIEVAL_METHOD_REWRITE: The retrieval method is rewrite - RETRIEVAL_METHOD_STEP_BACK: The retrieval method is step back - RETRIEVAL_METHOD_SUB_QUERIES: The retrieval method is… |
| `route_created_at` | `str` | Creation of route date / time |
| `route_created_by` | `str` |  |
| `route_name` | `str` | Route name |
| `route_uuid` | `str` |  |
| `tags` | `list` | Agent tag to organize related resources |
| `temperature` | `float` |  |
| `template` | `dict` | Represents an AgentTemplate entity |
| `thinking_token_budget` | `int` | The thinking token budget for Anthropic extended thinking (0 = disabled) |
| `top_p` | `float` |  |
| `updated_at` | `str` | Last modified |
| `url` | `str` | Access your agent under this url |
| `user_id` | `str` | Id of user that created the agent |
| `uuid` | `str` | Unique agent id |
| `version_hash` | `str` | The latest version of the agent |
| `vpc_egress_ips` | `list` | VPC Egress IPs |
| `vpc_uuid` | `str` |  |
| `web_fetch_enabled` | `bool` | Whether this agent can use the built-in web_fetch tool. |
| `web_search_enabled` | `bool` | Whether this agent can use the built-in web_search tool. |
| `workspace` | `dict` |  |

#### Example: Create

```python
api_link_agent_guardrail_output = client.ApiLinkAgentGuardrailOutput().create({
    "agent_id": "example_agent_id",  # str
})
```


### ApiLinkAgentOutput

Create an instance: `api_link_agent_output = client.ApiLinkAgentOutput()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `child_agent_uuid` | `str` | Routed agent id |
| `if_case` | `str` |  |
| `parent_agent_uuid` | `str` | A unique identifier for the parent agent. |
| `route_name` | `str` | Name of route |

#### Example: Create

```python
api_link_agent_output = client.ApiLinkAgentOutput().create({
    "agent_id": "example_agent_id",  # str
    "child_agent_uuid": "example_child_agent_uuid",  # str
})
```


### ApiLinkKnowledgeBaseOutput

Create an instance: `api_link_knowledge_base_output = client.ApiLinkKnowledgeBaseOutput()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `anthropic_api_key` | `dict` | Anthropic API Key Info |
| `api_key_infos` | `list` | Api key infos |
| `api_keys` | `list` | Api keys |
| `chatbot` | `dict` | A Chatbot |
| `chatbot_identifiers` | `list` | Chatbot identifiers |
| `child_agents` | `list` | Child agents |
| `conversation_logs_enabled` | `bool` | Whether conversation logs are enabled for the agent |
| `created_at` | `str` | Creation date / time |
| `deployment` | `dict` | Description of deployment |
| `description` | `str` | Description of agent |
| `functions` | `list` |  |
| `guardrails` | `list` | The guardrails the agent is attached to |
| `if_case` | `str` |  |
| `instruction` | `str` | Agent instruction. |
| `k` | `int` |  |
| `knowledge_bases` | `list` | Knowledge bases |
| `logging_config` | `dict` |  |
| `max_tokens` | `int` |  |
| `mcp_servers` | `list` | MCP (Model Context Protocol) servers attached to this agent |
| `model` | `dict` | Description of a Model |
| `model_provider_key` | `dict` |  |
| `model_router` | `dict` | Model router |
| `name` | `str` | Agent name |
| `openai_api_key` | `dict` | OpenAI API Key Info |
| `parent_agents` | `list` | Parent agents |
| `project_id` | `str` |  |
| `provide_citations` | `bool` | Whether the agent should provide in-response citations |
| `reasoning_effort` | `str` | The reasoning effort for the agent |
| `region` | `str` | Region code |
| `retrieval_method` | `str` | - RETRIEVAL_METHOD_UNKNOWN: The retrieval method is unknown - RETRIEVAL_METHOD_REWRITE: The retrieval method is rewrite - RETRIEVAL_METHOD_STEP_BACK: The retrieval method is step back - RETRIEVAL_METHOD_SUB_QUERIES: The retrieval method is… |
| `route_created_at` | `str` | Creation of route date / time |
| `route_created_by` | `str` |  |
| `route_name` | `str` | Route name |
| `route_uuid` | `str` |  |
| `tags` | `list` | Agent tag to organize related resources |
| `temperature` | `float` |  |
| `template` | `dict` | Represents an AgentTemplate entity |
| `thinking_token_budget` | `int` | The thinking token budget for Anthropic extended thinking (0 = disabled) |
| `top_p` | `float` |  |
| `updated_at` | `str` | Last modified |
| `url` | `str` | Access your agent under this url |
| `user_id` | `str` | Id of user that created the agent |
| `uuid` | `str` | Unique agent id |
| `version_hash` | `str` | The latest version of the agent |
| `vpc_egress_ips` | `list` | VPC Egress IPs |
| `vpc_uuid` | `str` |  |
| `web_fetch_enabled` | `bool` | Whether this agent can use the built-in web_fetch tool. |
| `web_search_enabled` | `bool` | Whether this agent can use the built-in web_search tool. |
| `workspace` | `dict` |  |

#### Example: Create

```python
api_link_knowledge_base_output = client.ApiLinkKnowledgeBaseOutput().create({
    "agent_id": "example_agent_id",  # str
})
```


### ApiListAgentApiKeysOutput

Create an instance: `api_list_agent_api_keys_output = client.ApiListAgentApiKeysOutput()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `created_at` | `str` | Creation date |
| `created_by` | `str` | Created by |
| `deleted_at` | `str` | Deleted date |
| `name` | `str` | Name |
| `secret_key` | `str` |  |
| `uuid` | `str` | Uuid |

#### Example: List

```python
api_list_agent_api_keys_outputs = client.ApiListAgentApiKeysOutput().list({"agent_id": "example"})
```


### ApiListAgentsByAnthropicKeyOutput

Create an instance: `api_list_agents_by_anthropic_key_output = client.ApiListAgentsByAnthropicKeyOutput()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `anthropic_api_key` | `dict` | Anthropic API Key Info |
| `api_key_infos` | `list` | Api key infos |
| `api_keys` | `list` | Api keys |
| `chatbot` | `dict` | A Chatbot |
| `chatbot_identifiers` | `list` | Chatbot identifiers |
| `child_agents` | `list` | Child agents |
| `conversation_logs_enabled` | `bool` | Whether conversation logs are enabled for the agent |
| `created_at` | `str` | Creation date / time |
| `deployment` | `dict` | Description of deployment |
| `description` | `str` | Description of agent |
| `functions` | `list` |  |
| `guardrails` | `list` | The guardrails the agent is attached to |
| `if_case` | `str` |  |
| `instruction` | `str` | Agent instruction. |
| `k` | `int` |  |
| `knowledge_bases` | `list` | Knowledge bases |
| `logging_config` | `dict` |  |
| `max_tokens` | `int` |  |
| `mcp_servers` | `list` | MCP (Model Context Protocol) servers attached to this agent |
| `model` | `dict` | Description of a Model |
| `model_provider_key` | `dict` |  |
| `model_router` | `dict` | Model router |
| `name` | `str` | Agent name |
| `openai_api_key` | `dict` | OpenAI API Key Info |
| `parent_agents` | `list` | Parent agents |
| `project_id` | `str` |  |
| `provide_citations` | `bool` | Whether the agent should provide in-response citations |
| `reasoning_effort` | `str` | The reasoning effort for the agent |
| `region` | `str` | Region code |
| `retrieval_method` | `str` | - RETRIEVAL_METHOD_UNKNOWN: The retrieval method is unknown - RETRIEVAL_METHOD_REWRITE: The retrieval method is rewrite - RETRIEVAL_METHOD_STEP_BACK: The retrieval method is step back - RETRIEVAL_METHOD_SUB_QUERIES: The retrieval method is… |
| `route_created_at` | `str` | Creation of route date / time |
| `route_created_by` | `str` |  |
| `route_name` | `str` | Route name |
| `route_uuid` | `str` |  |
| `tags` | `list` | Agent tag to organize related resources |
| `temperature` | `float` |  |
| `template` | `dict` | Represents an AgentTemplate entity |
| `thinking_token_budget` | `int` | The thinking token budget for Anthropic extended thinking (0 = disabled) |
| `top_p` | `float` |  |
| `updated_at` | `str` | Last modified |
| `url` | `str` | Access your agent under this url |
| `user_id` | `str` | Id of user that created the agent |
| `uuid` | `str` | Unique agent id |
| `version_hash` | `str` | The latest version of the agent |
| `vpc_egress_ips` | `list` | VPC Egress IPs |
| `vpc_uuid` | `str` |  |
| `web_fetch_enabled` | `bool` | Whether this agent can use the built-in web_fetch tool. |
| `web_search_enabled` | `bool` | Whether this agent can use the built-in web_search tool. |
| `workspace` | `dict` |  |

#### Example: List

```python
api_list_agents_by_anthropic_key_outputs = client.ApiListAgentsByAnthropicKeyOutput().list({"key_id": "example"})
```


### ApiListAgentsByOpenAiKeyOutput

Create an instance: `api_list_agents_by_open_ai_key_output = client.ApiListAgentsByOpenAiKeyOutput()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `anthropic_api_key` | `dict` | Anthropic API Key Info |
| `api_key_infos` | `list` | Api key infos |
| `api_keys` | `list` | Api keys |
| `chatbot` | `dict` | A Chatbot |
| `chatbot_identifiers` | `list` | Chatbot identifiers |
| `child_agents` | `list` | Child agents |
| `conversation_logs_enabled` | `bool` | Whether conversation logs are enabled for the agent |
| `created_at` | `str` | Creation date / time |
| `deployment` | `dict` | Description of deployment |
| `description` | `str` | Description of agent |
| `functions` | `list` |  |
| `guardrails` | `list` | The guardrails the agent is attached to |
| `if_case` | `str` |  |
| `instruction` | `str` | Agent instruction. |
| `k` | `int` |  |
| `knowledge_bases` | `list` | Knowledge bases |
| `logging_config` | `dict` |  |
| `max_tokens` | `int` |  |
| `mcp_servers` | `list` | MCP (Model Context Protocol) servers attached to this agent |
| `model` | `dict` | Description of a Model |
| `model_provider_key` | `dict` |  |
| `model_router` | `dict` | Model router |
| `name` | `str` | Agent name |
| `openai_api_key` | `dict` | OpenAI API Key Info |
| `parent_agents` | `list` | Parent agents |
| `project_id` | `str` |  |
| `provide_citations` | `bool` | Whether the agent should provide in-response citations |
| `reasoning_effort` | `str` | The reasoning effort for the agent |
| `region` | `str` | Region code |
| `retrieval_method` | `str` | - RETRIEVAL_METHOD_UNKNOWN: The retrieval method is unknown - RETRIEVAL_METHOD_REWRITE: The retrieval method is rewrite - RETRIEVAL_METHOD_STEP_BACK: The retrieval method is step back - RETRIEVAL_METHOD_SUB_QUERIES: The retrieval method is… |
| `route_created_at` | `str` | Creation of route date / time |
| `route_created_by` | `str` |  |
| `route_name` | `str` | Route name |
| `route_uuid` | `str` |  |
| `tags` | `list` | Agent tag to organize related resources |
| `temperature` | `float` |  |
| `template` | `dict` | Represents an AgentTemplate entity |
| `thinking_token_budget` | `int` | The thinking token budget for Anthropic extended thinking (0 = disabled) |
| `top_p` | `float` |  |
| `updated_at` | `str` | Last modified |
| `url` | `str` | Access your agent under this url |
| `user_id` | `str` | Id of user that created the agent |
| `uuid` | `str` | Unique agent id |
| `version_hash` | `str` | The latest version of the agent |
| `vpc_egress_ips` | `list` | VPC Egress IPs |
| `vpc_uuid` | `str` |  |
| `web_fetch_enabled` | `bool` | Whether this agent can use the built-in web_fetch tool. |
| `web_search_enabled` | `bool` | Whether this agent can use the built-in web_search tool. |
| `workspace` | `dict` |  |

#### Example: List

```python
api_list_agents_by_open_ai_key_outputs = client.ApiListAgentsByOpenAiKeyOutput().list({"key_id": "example"})
```


### ApiListAgentsByWorkspaceOutput

Create an instance: `api_list_agents_by_workspace_output = client.ApiListAgentsByWorkspaceOutput()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `anthropic_api_key` | `dict` | Anthropic API Key Info |
| `api_key_infos` | `list` | Api key infos |
| `api_keys` | `list` | Api keys |
| `chatbot` | `dict` | A Chatbot |
| `chatbot_identifiers` | `list` | Chatbot identifiers |
| `child_agents` | `list` | Child agents |
| `conversation_logs_enabled` | `bool` | Whether conversation logs are enabled for the agent |
| `created_at` | `str` | Creation date / time |
| `deployment` | `dict` | Description of deployment |
| `description` | `str` | Description of agent |
| `functions` | `list` |  |
| `guardrails` | `list` | The guardrails the agent is attached to |
| `if_case` | `str` |  |
| `instruction` | `str` | Agent instruction. |
| `k` | `int` |  |
| `knowledge_bases` | `list` | Knowledge bases |
| `logging_config` | `dict` |  |
| `max_tokens` | `int` |  |
| `mcp_servers` | `list` | MCP (Model Context Protocol) servers attached to this agent |
| `model` | `dict` | Description of a Model |
| `model_provider_key` | `dict` |  |
| `model_router` | `dict` | Model router |
| `name` | `str` | Agent name |
| `openai_api_key` | `dict` | OpenAI API Key Info |
| `parent_agents` | `list` | Parent agents |
| `project_id` | `str` |  |
| `provide_citations` | `bool` | Whether the agent should provide in-response citations |
| `reasoning_effort` | `str` | The reasoning effort for the agent |
| `region` | `str` | Region code |
| `retrieval_method` | `str` | - RETRIEVAL_METHOD_UNKNOWN: The retrieval method is unknown - RETRIEVAL_METHOD_REWRITE: The retrieval method is rewrite - RETRIEVAL_METHOD_STEP_BACK: The retrieval method is step back - RETRIEVAL_METHOD_SUB_QUERIES: The retrieval method is… |
| `route_created_at` | `str` | Creation of route date / time |
| `route_created_by` | `str` |  |
| `route_name` | `str` | Route name |
| `route_uuid` | `str` |  |
| `tags` | `list` | Agent tag to organize related resources |
| `temperature` | `float` |  |
| `template` | `dict` | Represents an AgentTemplate entity |
| `thinking_token_budget` | `int` | The thinking token budget for Anthropic extended thinking (0 = disabled) |
| `top_p` | `float` |  |
| `updated_at` | `str` | Last modified |
| `url` | `str` | Access your agent under this url |
| `user_id` | `str` | Id of user that created the agent |
| `uuid` | `str` | Unique agent id |
| `version_hash` | `str` | The latest version of the agent |
| `vpc_egress_ips` | `list` | VPC Egress IPs |
| `vpc_uuid` | `str` |  |
| `web_fetch_enabled` | `bool` | Whether this agent can use the built-in web_fetch tool. |
| `web_search_enabled` | `bool` | Whether this agent can use the built-in web_search tool. |
| `workspace` | `dict` |  |

#### Example: List

```python
api_list_agents_by_workspace_outputs = client.ApiListAgentsByWorkspaceOutput().list({"workspace_id": "example"})
```


### ApiListEvaluationMetricsOutput

Create an instance: `api_list_evaluation_metrics_output = client.ApiListEvaluationMetricsOutput()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `associated_presets` | `list` | Saved model evaluation presets that reference this metric. |
| `category` | `str` |  |
| `custom_eval_config` | `dict` | Configuration for a custom model-evaluation metric scored by an LLM judge. |
| `description` | `str` |  |
| `evaluation_scope` | `str` | Scope that determines whether a metric belongs to agent evaluation or model evaluation. |
| `inverted` | `bool` | If true, the metric is inverted, meaning that a lower value is better. |
| `is_metric_goal` | `bool` |  |
| `metric_name` | `str` |  |
| `metric_rank` | `int` |  |
| `metric_type` | `str` |  |
| `metric_uuid` | `str` |  |
| `metric_value_type` | `str` |  |
| `range_max` | `float` | The maximum value for the metric. |
| `range_min` | `float` | The minimum value for the metric. |
| `source` | `str` | Distinguishes platform catalog metrics from user-defined LLM-as-judge metrics. |

#### Example: List

```python
api_list_evaluation_metrics_outputs = client.ApiListEvaluationMetricsOutput().list()
```


### ApiListEvaluationRunsByTestCaseOutput

Create an instance: `api_list_evaluation_runs_by_test_case_output = client.ApiListEvaluationRunsByTestCaseOutput()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `agent_deleted` | `bool` | Whether agent is deleted |
| `agent_deployment_name` | `str` | The agent deployment name |
| `agent_name` | `str` | Agent name |
| `agent_uuid` | `str` | Agent UUID. |
| `agent_version_hash` | `str` | Version hash |
| `agent_workspace_uuid` | `str` | Agent workspace uuid |
| `created_by_user_email` | `str` |  |
| `created_by_user_id` | `str` |  |
| `error_description` | `str` | The error description |
| `evaluation_run_uuid` | `str` | Evaluation run UUID. |
| `evaluation_test_case_workspace_uuid` | `str` | Evaluation test case workspace uuid |
| `finished_at` | `str` | Run end time. |
| `pass_status` | `bool` | The pass status of the evaluation run based on the star metric. |
| `queued_at` | `str` | Run queued time. |
| `run_level_metric_results` | `list` |  |
| `run_name` | `str` | Run name. |
| `star_metric_result` | `dict` |  |
| `started_at` | `str` | Run start time. |
| `status` | `str` | Evaluation Run Statuses |
| `test_case_description` | `str` | Test case description. |
| `test_case_name` | `str` | Test case name. |
| `test_case_uuid` | `str` | Test-case UUID. |
| `test_case_version` | `int` | Test-case-version. |

#### Example: List

```python
api_list_evaluation_runs_by_test_case_outputs = client.ApiListEvaluationRunsByTestCaseOutput().list({"evaluation_test_case_id": "example"})
```


### ApiListEvaluationTestCasesByWorkspaceOutput

Create an instance: `api_list_evaluation_test_cases_by_workspace_output = client.ApiListEvaluationTestCasesByWorkspaceOutput()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `archived_at` | `str` |  |
| `created_at` | `str` |  |
| `created_by_user_email` | `str` |  |
| `created_by_user_id` | `str` |  |
| `dataset` | `dict` |  |
| `dataset_name` | `str` |  |
| `dataset_uuid` | `str` |  |
| `description` | `str` |  |
| `latest_version_number_of_runs` | `int` |  |
| `metrics` | `list` |  |
| `name` | `str` |  |
| `star_metric` | `dict` |  |
| `test_case_uuid` | `str` |  |
| `total_runs` | `int` |  |
| `updated_at` | `str` |  |
| `updated_by_user_email` | `str` |  |
| `updated_by_user_id` | `str` |  |
| `version` | `int` |  |

#### Example: List

```python
api_list_evaluation_test_cases_by_workspace_outputs = client.ApiListEvaluationTestCasesByWorkspaceOutput().list({"workspace_id": "example"})
```


### ApiListKnowledgeBaseDataSourcesOutput

Create an instance: `api_list_knowledge_base_data_sources_output = client.ApiListKnowledgeBaseDataSourcesOutput()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `aws_data_source` | `dict` | AWS S3 Data Source for Display |
| `bucket_name` | `str` | Name of storage bucket - Deprecated, moved to data_source_details |
| `chunking_algorithm` | `str` |  |
| `chunking_options` | `dict` |  |
| `created_at` | `str` | Creation date / time |
| `dropbox_data_source` | `dict` | Dropbox Data Source for Display |
| `file_upload_data_source` | `dict` | File to upload as data source for knowledge base. |
| `google_drive_data_source` | `dict` | Google Drive Data Source for Display |
| `item_path` | `str` | Path of folder or object in bucket - Deprecated, moved to data_source_details |
| `last_datasource_indexing_job` | `dict` |  |
| `region` | `str` | Region code - Deprecated, moved to data_source_details |
| `spaces_data_source` | `dict` | Spaces Bucket Data Source |
| `updated_at` | `str` | Last modified |
| `uuid` | `str` | Unique id of knowledge base |
| `web_crawler_data_source` | `dict` | WebCrawlerDataSource |

#### Example: List

```python
api_list_knowledge_base_data_sources_outputs = client.ApiListKnowledgeBaseDataSourcesOutput().list({"knowledge_base_id": "example"})
```


### ApiListKnowledgeBaseIndexingJobsOutput

Create an instance: `api_list_knowledge_base_indexing_jobs_output = client.ApiListKnowledgeBaseIndexingJobsOutput()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `completed_datasources` | `int` | Number of datasources indexed completed |
| `created_at` | `str` | Creation date / time |
| `data_source_jobs` | `list` | Details on Data Sources included in the Indexing Job |
| `data_source_uuids` | `list` |  |
| `finished_at` | `str` |  |
| `is_report_available` | `bool` | Boolean value to determine if the indexing job details are available |
| `knowledge_base_uuid` | `str` | Knowledge base id |
| `phase` | `str` |  |
| `started_at` | `str` |  |
| `status` | `str` |  |
| `tokens` | `int` | Number of tokens [This field is deprecated] |
| `total_datasources` | `int` | Number of datasources being indexed |
| `total_tokens` | `str` | Total Tokens Consumed By the Indexing Job |
| `updated_at` | `str` | Last modified |
| `uuid` | `str` | Unique id |

#### Example: List

```python
api_list_knowledge_base_indexing_jobs_outputs = client.ApiListKnowledgeBaseIndexingJobsOutput().list({"knowledge_base_id": "example"})
```


### ApiListModelEvaluationMetricsOutput

Create an instance: `api_list_model_evaluation_metrics_output = client.ApiListModelEvaluationMetricsOutput()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `associated_presets` | `list` | Saved model evaluation presets that reference this metric. |
| `category` | `str` |  |
| `custom_eval_config` | `dict` | Configuration for a custom model-evaluation metric scored by an LLM judge. |
| `description` | `str` |  |
| `evaluation_scope` | `str` | Scope that determines whether a metric belongs to agent evaluation or model evaluation. |
| `inverted` | `bool` | If true, the metric is inverted, meaning that a lower value is better. |
| `is_metric_goal` | `bool` |  |
| `metric_name` | `str` |  |
| `metric_rank` | `int` |  |
| `metric_type` | `str` |  |
| `metric_uuid` | `str` |  |
| `metric_value_type` | `str` |  |
| `range_max` | `float` | The maximum value for the metric. |
| `range_min` | `float` | The minimum value for the metric. |
| `source` | `str` | Distinguishes platform catalog metrics from user-defined LLM-as-judge metrics. |

#### Example: List

```python
api_list_model_evaluation_metrics_outputs = client.ApiListModelEvaluationMetricsOutput().list()
```


### ApiListScenarioLibraryOutput

Create an instance: `api_list_scenario_library_output = client.ApiListScenarioLibraryOutput()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `category` | `str` | Optional grouping for catalog browsing (e.g. |
| `created_at` | `str` | Time created at. |
| `description` | `str` | Curated description. |
| `goal_description` | `str` | The goal this scenario set demonstrates, shown as context alongside goal-driven generation. |
| `library_scenario_uuid` | `str` | UUID of the library entry. |
| `name` | `str` | Curated display name. |
| `scenario_count` | `int` | Number of scenarios in the library entry. |
| `status` | `str` | Lifecycle status of a Common Scenario & Goal Library entry. |
| `updated_at` | `str` | Time last updated at. |

#### Example: List

```python
api_list_scenario_library_outputs = client.ApiListScenarioLibraryOutput().list()
```


### ApiListScenariosOutput

Create an instance: `api_list_scenarios_output = client.ApiListScenariosOutput()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `description` | `str` | What the user tries to accomplish. |
| `exploration_budget` | `int` | Number of journeys to explore for this scenario. |
| `max_turns` | `int` | Turn budget for the scenario. |
| `name` | `str` | Human-readable name for the scenario. |
| `scenario_uuid` | `str` | Unique id for the scenario. |
| `stopping_criteria` | `list` | Judge stopping criteria. |
| `user_persona` | `str` | How the user communicates (tone, role). |

#### Example: List

```python
api_list_scenarios_outputs = client.ApiListScenariosOutput().list({"scenario_library_id": "example"})
```


### ApiListSimulationJourneysOutput

Create an instance: `api_list_simulation_journeys_output = client.ApiListSimulationJourneysOutput()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `created_at` | `str` | Time created at. |
| `duration_sec` | `str` | Wall-clock time taken for the journey to complete, in seconds. |
| `failure_reason` | `str` | Human-readable explanation of a terminal FAILED status. |
| `journey_index` | `int` | Zero-based index of this journey within its scenario's exploration budget. |
| `journey_uuid` | `str` | UUID of the journey. |
| `judge_reasoning` | `str` | Optional judge reasoning for the verdict. |
| `run_uuid` | `str` | UUID of the run this journey belongs to. |
| `scenario_uuid` | `str` | UUID of the scenario this journey executed. |
| `session_id` | `str` | Session identifier for this journey. |
| `status` | `str` | Lifecycle status of a single journey. |
| `token_usage` | `dict` | Per-actor token accounting for a run or journey. |
| `trajectory_bucket_name` | `str` | Object storage bucket holding the trajectory JSON. |
| `trajectory_bucket_region` | `str` | Object storage bucket region for the trajectory JSON. |
| `trajectory_spaces_key` | `str` | Object storage key for the trajectory JSON. |
| `updated_at` | `str` | Time last updated at. |
| `verdict` | `str` | The judge's verdict for a journey. |

#### Example: List

```python
api_list_simulation_journeys_outputs = client.ApiListSimulationJourneysOutput().list({"simulation_run_id": "example"})
```


### ApiModelCatalogCard

Create an instance: `api_model_catalog_card = client.ApiModelCatalogCard()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `availability` | `list` |  |
| `badges` | `list` | Badges for models |
| `benchmark_score` | `dict` | Benchmark scores for this model, stored as arbitrary JSON |
| `capabilities` | `list` |  |
| `code_snippets` | `dict` | Code examples for using the model |
| `context_window` | `str` | Specs (same as Entry) |
| `created_at` | `str` | RFC 3339 timestamp indicating when the model was added to the catalog. |
| `creator` | `str` | Model creator/developer (e.g., "Meta", "Anthropic", "OpenAI") |
| `description` | `str` | Card-specific |
| `hugging_face_id` | `str` | The Hugging Face repository ID (e.g. |
| `id` | `str` | Identity (same as Entry) |
| `max_output_tokens` | `str` | The maximum number of output tokens the model can generate in a single response. |
| `modalities` | `dict` | Input/output modalities |
| `model_id` | `str` | Model identifier used for API calls (e.g., "llama3.1-70b-instruct") |
| `name` | `str` |  |
| `parameter_count` | `float` |  |
| `pricing` | `dict` | Pricing per million tokens (aligns with existing ModelPrice pattern) |
| `pricing_detail` | `dict` | The complete set of prices for a model, covering every available variant. |
| `provider` | `str` |  |
| `scaled_pricing_enabled` | `bool` | True when this model's pricing varies over time. |
| `short_description` | `str` |  |
| `type` | `str` |  |

#### Example: Load

```python
api_model_catalog_card = client.ApiModelCatalogCard().load({"id": "api_model_catalog_card_id"})
```

#### Example: List

```python
api_model_catalog_cards = client.ApiModelCatalogCard().list()
```


### ApiModelEvaluationPreset

Create an instance: `api_model_evaluation_preset = client.ApiModelEvaluationPreset()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `candidate_inference_config` | `dict` | Inference configuration for the candidate model during evaluation. |
| `candidate_model_name` | `str` | Model slug used to call the candidate model API. |
| `candidate_model_source` | `str` | Whether the candidate is a served model (serverless platform, a dedicated deployment, or a model router) or an OHS-hosted agent config. |
| `candidate_model_uuid` | `str` | UUID of the candidate model stored on this preset. |
| `candidate_system_prompt` | `str` | System prompt / instructions to send to the candidate model. |
| `created_at` | `str` | Timestamp when the preset was created. |
| `dataset_name` | `str` | Display name of the dataset stored on this preset. |
| `dataset_uuid` | `str` | UUID of the dataset stored on this preset. |
| `eval_preset_uuid` | `str` | UUID of the evaluation preset. |
| `id` | `str` |  |
| `judge_model_name` | `str` | Display name of the judge model stored on this preset. |
| `judge_model_uuid` | `str` | UUID of the judge model stored on this preset. |
| `metrics` | `list` | Metrics selected for this preset. |
| `name` | `str` | Name of the evaluation preset. |
| `saved_sections` | `list` | Sections of the inline evaluation config that were persisted when this preset was created. |
| `star_metric` | `dict` |  |

#### Example: Load

```python
api_model_evaluation_preset = client.ApiModelEvaluationPreset().load({"id": "api_model_evaluation_preset_id"})
```

#### Example: List

```python
api_model_evaluation_presets = client.ApiModelEvaluationPreset().list()
```


### ApiModelPublic

Create an instance: `api_model_public = client.ApiModelPublic()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `agreement` | `dict` | Agreement Description |
| `benchmark_score` | `dict` | Benchmark scores for this model, stored as arbitrary JSON |
| `capabilities` | `list` | Model capabilities (inference, reasoning, vectorization, etc.) |
| `context_window` | `str` | Context window (maximum tokens) |
| `created_at` | `str` | Creation date / time |
| `description` | `str` | Model description |
| `endpoints` | `list` | Available endpoints and their capabilities |
| `id` | `str` | Human-readable model identifier |
| `is_foundational` | `bool` | True if it is a foundational model provided by do |
| `kb_default_chunk_size` | `int` | Default chunking size limit to show in UI |
| `kb_max_chunk_size` | `int` | Maximum chunk size limit of model |
| `kb_min_chunk_size` | `int` | Minimum chunking size token limits if model supports KNOWLEDGEBASE usecase |
| `lifecycle_status` | `str` | Lifecycle status of the model (internal, public-preview, active, deprecated, end_of_life) |
| `modalities` | `dict` | Input/output modalities |
| `model_availability` | `str` | Model availability (serverless, dedicated, etc.) |
| `name` | `str` | Display name of the model |
| `parameter_count` | `float` | Parameter count in billions |
| `parent_uuid` | `str` | Unique id of the model, this model is based on |
| `pricing` | `dict` | Pricing per million tokens (aligns with existing ModelPrice pattern) |
| `provider` | `str` |  |
| `reasoning_efforts` | `list` | Available reasoning efforts for this model |
| `settings` | `list` | Playground settings derived from model metadata |
| `thinking` | `bool` | Whether this model supports extended thinking (Anthropic models) |
| `type` | `str` | Model type (chat, embedding, image, reasoning, coding) |
| `updated_at` | `str` | Last modified |
| `upload_complete` | `bool` | Model has been fully uploaded |
| `url` | `str` | Download url |
| `uuid` | `str` | Unique id |
| `version` | `dict` | Version Information about a Model |

#### Example: List

```python
api_model_publics = client.ApiModelPublic().list()
```


### ApiModelRouterPreset

Create an instance: `api_model_router_preset = client.ApiModelRouterPreset()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `config` | `dict` |  |
| `display_name` | `str` | Display name for UI surfaces |
| `long_description` | `str` | Long description for details views |
| `short_description` | `str` | Short description for list views |
| `slug` | `str` | Stable slug for routing usage |

#### Example: List

```python
api_model_router_presets = client.ApiModelRouterPreset().list()
```


### ApiModelRouterTaskPreset

Create an instance: `api_model_router_task_preset = client.ApiModelRouterTaskPreset()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `category` | `str` | Higher-level grouping used by the UI |
| `description` | `str` | Task description |
| `models` | `list` | Default models assigned to this task |
| `name` | `str` | Display name |
| `selection_policy` | `dict` | Selection policy preference for choosing among assigned models. |
| `tags` | `list` | Lightweight labels for filtering |
| `task_slug` | `str` | Task slug |

#### Example: List

```python
api_model_router_task_presets = client.ApiModelRouterTaskPreset().list()
```


### ApiMoveAgentsToWorkspaceOutput

Create an instance: `api_move_agents_to_workspace_output = client.ApiMoveAgentsToWorkspaceOutput()`

#### Operations

| Method | Description |
| --- | --- |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `agent_uuids` | `list` | Agent uuids |
| `agents` | `list` | Agents |
| `created_at` | `str` | Creation date |
| `created_by` | `str` | The id of user who created this workspace |
| `created_by_email` | `str` | The email of the user who created this workspace |
| `deleted_at` | `str` | Deleted date |
| `description` | `str` | Description of the workspace |
| `evaluation_test_cases` | `list` | Evaluations |
| `name` | `str` | Name of the workspace |
| `updated_at` | `str` | Update date |
| `uuid` | `str` | Unique id |
| `workspace_uuid` | `str` | Workspace uuid to move agents to |


### ApiPrompt

Create an instance: `api_prompt = client.ApiPrompt()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `evaluation_trace_spans` | `list` | The evaluated trace spans. |
| `ground_truth` | `str` | The ground truth for the prompt. |
| `input` | `str` |  |
| `input_tokens` | `str` | The number of input tokens used in the prompt. |
| `output` | `str` |  |
| `output_tokens` | `str` | The number of output tokens used in the prompt. |
| `prompt_chunks` | `list` | The list of prompt chunks. |
| `prompt_id` | `int` | Prompt ID |
| `prompt_level_metric_results` | `list` | The metric results for the prompt. |
| `trace_id` | `str` | The trace id for the prompt. |

#### Example: Load

```python
api_prompt = client.ApiPrompt().load({"evaluation_run_id": "evaluation_run_id", "prompt_id": 1})
```


### ApiRollbackToAgentVersionOutput

Create an instance: `api_rollback_to_agent_version_output = client.ApiRollbackToAgentVersionOutput()`

#### Operations

| Method | Description |
| --- | --- |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `audit_header` | `dict` | An alternative way to provide auth information. |
| `uuid` | `str` | Agent unique identifier |
| `version_hash` | `str` | Unique identifier |


### ApiSimulationJourney

Create an instance: `api_simulation_journey = client.ApiSimulationJourney()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `created_at` | `str` | Time created at. |
| `duration_sec` | `str` | Wall-clock time taken for the journey to complete, in seconds. |
| `failure_reason` | `str` | Human-readable explanation of a terminal FAILED status. |
| `id` | `str` |  |
| `journey_index` | `int` | Zero-based index of this journey within its scenario's exploration budget. |
| `journey_uuid` | `str` | UUID of the journey. |
| `judge_reasoning` | `str` | Optional judge reasoning for the verdict. |
| `run_uuid` | `str` | UUID of the run this journey belongs to. |
| `scenario_uuid` | `str` | UUID of the scenario this journey executed. |
| `session_id` | `str` | Session identifier for this journey. |
| `status` | `str` | Lifecycle status of a single journey. |
| `token_usage` | `dict` | Per-actor token accounting for a run or journey. |
| `trajectory_bucket_name` | `str` | Object storage bucket holding the trajectory JSON. |
| `trajectory_bucket_region` | `str` | Object storage bucket region for the trajectory JSON. |
| `trajectory_spaces_key` | `str` | Object storage key for the trajectory JSON. |
| `updated_at` | `str` | Time last updated at. |
| `verdict` | `str` | The judge's verdict for a journey. |

#### Example: Load

```python
api_simulation_journey = client.ApiSimulationJourney().load({"id": "api_simulation_journey_id", "simulation_run_id": "simulation_run_id"})
```


### ApiSimulationTrajectory

Create an instance: `api_simulation_trajectory = client.ApiSimulationTrajectory()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `agent_id` | `str` | Identifier of the candidate agent under test for this journey. |
| `completed_at` | `str` |  |
| `duration_sec` | `str` |  |
| `evaluation_metrics` | `list` | Per-metric scores and judge reasoning for this trajectory. |
| `failure_reason` | `str` |  |
| `journey_index` | `int` |  |
| `journey_uuid` | `str` |  |
| `judge` | `dict` | Judge output embedded in the trajectory JSON. |
| `max_turns` | `int` | Turn budget configured for this journey (per-scenario max_turns, after any run-level override). |
| `messages` | `list` |  |
| `run_uuid` | `str` |  |
| `scenario_uuid` | `str` |  |
| `session_id` | `str` |  |
| `started_at` | `str` |  |
| `status` | `str` | Lifecycle status of the trajectory. |
| `token_usage` | `dict` | Per-actor token accounting for a run or journey. |
| `turn_count` | `int` |  |
| `verdict` | `str` | The judge's verdict for a journey. |

#### Example: Load

```python
api_simulation_trajectory = client.ApiSimulationTrajectory().load({"journey_id": "journey_id", "simulation_run_id": "simulation_run_id"})
```


### ApiUnlinkAgentFunctionOutput

Create an instance: `api_unlink_agent_function_output = client.ApiUnlinkAgentFunctionOutput()`

#### Operations

| Method | Description |
| --- | --- |
| `remove(match)` | Remove the matching entity. |


### ApiUnlinkAgentGuardrailOutput

Create an instance: `api_unlink_agent_guardrail_output = client.ApiUnlinkAgentGuardrailOutput()`

#### Operations

| Method | Description |
| --- | --- |
| `remove(match)` | Remove the matching entity. |


### ApiUnlinkAgentOutput

Create an instance: `api_unlink_agent_output = client.ApiUnlinkAgentOutput()`

#### Operations

| Method | Description |
| --- | --- |
| `remove(match)` | Remove the matching entity. |


### ApiUnlinkKnowledgeBaseOutput

Create an instance: `api_unlink_knowledge_base_output = client.ApiUnlinkKnowledgeBaseOutput()`

#### Operations

| Method | Description |
| --- | --- |
| `remove(match)` | Remove the matching entity. |


### ApiUpdateAgentApiKeyOutput

Create an instance: `api_update_agent_api_key_output = client.ApiUpdateAgentApiKeyOutput()`

#### Operations

| Method | Description |
| --- | --- |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `agent_uuid` | `str` | Agent id |
| `api_key_uuid` | `str` | API key ID |
| `created_at` | `str` | Creation date |
| `created_by` | `str` | Created by |
| `deleted_at` | `str` | Deleted date |
| `name` | `str` | Name |
| `secret_key` | `str` |  |
| `uuid` | `str` | Uuid |


### ApiUpdateAgentFunctionOutput

Create an instance: `api_update_agent_function_output = client.ApiUpdateAgentFunctionOutput()`

#### Operations

| Method | Description |
| --- | --- |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `agent_uuid` | `str` | Agent id |
| `anthropic_api_key` | `dict` | Anthropic API Key Info |
| `api_key_infos` | `list` | Api key infos |
| `api_keys` | `list` | Api keys |
| `chatbot` | `dict` | A Chatbot |
| `chatbot_identifiers` | `list` | Chatbot identifiers |
| `child_agents` | `list` | Child agents |
| `conversation_logs_enabled` | `bool` | Whether conversation logs are enabled for the agent |
| `created_at` | `str` | Creation date / time |
| `deployment` | `dict` | Description of deployment |
| `description` | `str` | Description of agent |
| `faas_name` | `str` | The name of the function in the DigitalOcean functions platform |
| `faas_namespace` | `str` | The namespace of the function in the DigitalOcean functions platform |
| `function_name` | `str` | Function name |
| `function_uuid` | `str` | Function id |
| `functions` | `list` |  |
| `guardrails` | `list` | The guardrails the agent is attached to |
| `if_case` | `str` |  |
| `input_schema` | `dict` | Describe the input schema for the function so the agent may call it |
| `instruction` | `str` | Agent instruction. |
| `k` | `int` |  |
| `knowledge_bases` | `list` | Knowledge bases |
| `logging_config` | `dict` |  |
| `max_tokens` | `int` |  |
| `mcp_servers` | `list` | MCP (Model Context Protocol) servers attached to this agent |
| `model` | `dict` | Description of a Model |
| `model_provider_key` | `dict` |  |
| `model_router` | `dict` | Model router |
| `name` | `str` | Agent name |
| `openai_api_key` | `dict` | OpenAI API Key Info |
| `output_schema` | `dict` | Describe the output schema for the function so the agent handle its response |
| `parent_agents` | `list` | Parent agents |
| `project_id` | `str` |  |
| `provide_citations` | `bool` | Whether the agent should provide in-response citations |
| `reasoning_effort` | `str` | The reasoning effort for the agent |
| `region` | `str` | Region code |
| `retrieval_method` | `str` | - RETRIEVAL_METHOD_UNKNOWN: The retrieval method is unknown - RETRIEVAL_METHOD_REWRITE: The retrieval method is rewrite - RETRIEVAL_METHOD_STEP_BACK: The retrieval method is step back - RETRIEVAL_METHOD_SUB_QUERIES: The retrieval method is… |
| `route_created_at` | `str` | Creation of route date / time |
| `route_created_by` | `str` |  |
| `route_name` | `str` | Route name |
| `route_uuid` | `str` |  |
| `tags` | `list` | Agent tag to organize related resources |
| `temperature` | `float` |  |
| `template` | `dict` | Represents an AgentTemplate entity |
| `thinking_token_budget` | `int` | The thinking token budget for Anthropic extended thinking (0 = disabled) |
| `top_p` | `float` |  |
| `updated_at` | `str` | Last modified |
| `url` | `str` | Access your agent under this url |
| `user_id` | `str` | Id of user that created the agent |
| `uuid` | `str` | Unique agent id |
| `version_hash` | `str` | The latest version of the agent |
| `vpc_egress_ips` | `list` | VPC Egress IPs |
| `vpc_uuid` | `str` |  |
| `web_fetch_enabled` | `bool` | Whether this agent can use the built-in web_fetch tool. |
| `web_search_enabled` | `bool` | Whether this agent can use the built-in web_search tool. |
| `workspace` | `dict` |  |


### ApiUpdateAgentOutput

Create an instance: `api_update_agent_output = client.ApiUpdateAgentOutput()`

#### Operations

| Method | Description |
| --- | --- |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `agent_log_insights_enabled` | `bool` |  |
| `allowed_domains` | `list` | Optional list of allowed domains for the chatbot - Must use fully qualified domain name (FQDN) such as https://example.com |
| `anthropic_api_key` | `dict` | Anthropic API Key Info |
| `anthropic_key_uuid` | `str` | Optional anthropic key uuid for use with anthropic models |
| `api_key_infos` | `list` | Api key infos |
| `api_keys` | `list` | Api keys |
| `chatbot` | `dict` | A Chatbot |
| `chatbot_identifiers` | `list` | Chatbot identifiers |
| `child_agents` | `list` | Child agents |
| `clear_mcp_servers` | `bool` | When true, removes all MCP servers from the agent. |
| `conversation_logs_enabled` | `bool` | Whether conversation logs are enabled for the agent |
| `created_at` | `str` | Creation date / time |
| `deployment` | `dict` | Description of deployment |
| `description` | `str` | Description of agent |
| `functions` | `list` |  |
| `guardrails` | `list` | The guardrails the agent is attached to |
| `if_case` | `str` |  |
| `instruction` | `str` | Agent instruction. |
| `k` | `int` | How many results should be considered from an attached knowledge base |
| `knowledge_bases` | `list` | Knowledge bases |
| `logging_config` | `dict` |  |
| `max_tokens` | `int` | Specifies the maximum number of tokens the model can process in a single input or output, set as a number between 1 and 512. |
| `mcp_servers` | `list` | MCP (Model Context Protocol) servers attached to this agent |
| `model` | `dict` | Description of a Model |
| `model_provider_key` | `dict` |  |
| `model_provider_key_uuid` | `str` | Optional Model Provider uuid for use with provider models |
| `model_router` | `dict` | Model router |
| `model_router_uuid` | `str` |  |
| `model_uuid` | `str` | Identifier for the foundation model. |
| `name` | `str` | Agent name |
| `open_ai_key_uuid` | `str` | Optional OpenAI key uuid for use with OpenAI models |
| `openai_api_key` | `dict` | OpenAI API Key Info |
| `parent_agents` | `list` | Parent agents |
| `project_id` | `str` | The id of the DigitalOcean project this agent will belong to |
| `provide_citations` | `bool` | Whether the agent should provide in-response citations |
| `reasoning_effort` | `str` | The reasoning effort for the agent |
| `region` | `str` | Region code |
| `retrieval_method` | `str` | - RETRIEVAL_METHOD_UNKNOWN: The retrieval method is unknown - RETRIEVAL_METHOD_REWRITE: The retrieval method is rewrite - RETRIEVAL_METHOD_STEP_BACK: The retrieval method is step back - RETRIEVAL_METHOD_SUB_QUERIES: The retrieval method is… |
| `route_created_at` | `str` | Creation of route date / time |
| `route_created_by` | `str` |  |
| `route_name` | `str` | Route name |
| `route_uuid` | `str` |  |
| `router_preset_slug` | `str` |  |
| `tags` | `list` | Agent tag to organize related resources |
| `temperature` | `float` | Controls the model’s creativity, specified as a number between 0 and 1. |
| `template` | `dict` | Represents an AgentTemplate entity |
| `thinking_token_budget` | `int` | The thinking token budget for Anthropic extended thinking (0 = disabled) |
| `top_p` | `float` | Defines the cumulative probability threshold for word selection, specified as a number between 0 and 1. |
| `updated_at` | `str` | Last modified |
| `url` | `str` | Access your agent under this url |
| `user_id` | `str` | Id of user that created the agent |
| `uuid` | `str` | Unique agent id |
| `version_hash` | `str` | The latest version of the agent |
| `vpc_egress_ips` | `list` | VPC Egress IPs |
| `vpc_uuid` | `str` |  |
| `web_fetch_enabled` | `bool` | Whether this agent can use the built-in web_fetch tool. |
| `web_search_enabled` | `bool` | Whether this agent can use the built-in web_search tool. |
| `workspace` | `dict` |  |


### ApiUpdateAnthropicApiKeyOutput

Create an instance: `api_update_anthropic_api_key_output = client.ApiUpdateAnthropicApiKeyOutput()`

#### Operations

| Method | Description |
| --- | --- |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `api_key` | `str` | Anthropic API key |
| `api_key_uuid` | `str` | API key ID |
| `created_at` | `str` | Key creation date |
| `created_by` | `str` | Created by user id from DO |
| `deleted_at` | `str` | Key deleted date |
| `name` | `str` | Name |
| `updated_at` | `str` | Key last updated date |
| `uuid` | `str` | Uuid |


### ApiUpdateCustomEvaluationMetricOutput

Create an instance: `api_update_custom_evaluation_metric_output = client.ApiUpdateCustomEvaluationMetricOutput()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `associated_presets` | `list` | Saved model evaluation presets that reference this metric. |
| `category` | `str` |  |
| `config` | `dict` | Configuration for a custom model-evaluation metric scored by an LLM judge. |
| `custom_eval_config` | `dict` | Configuration for a custom model-evaluation metric scored by an LLM judge. |
| `description` | `str` |  |
| `evaluation_scope` | `str` | Scope that determines whether a metric belongs to agent evaluation or model evaluation. |
| `inverted` | `bool` | If true, the metric is inverted, meaning that a lower value is better. |
| `is_metric_goal` | `bool` |  |
| `metric_name` | `str` |  |
| `metric_rank` | `int` |  |
| `metric_type` | `str` |  |
| `metric_uuid` | `str` |  |
| `metric_value_type` | `str` |  |
| `range_max` | `float` | The maximum value for the metric. |
| `range_min` | `float` | The minimum value for the metric. |
| `source` | `str` | Distinguishes platform catalog metrics from user-defined LLM-as-judge metrics. |

#### Example: Create

```python
api_update_custom_evaluation_metric_output = client.ApiUpdateCustomEvaluationMetricOutput().create({
})
```


### ApiUpdateEvaluationTestCaseOutput

Create an instance: `api_update_evaluation_test_case_output = client.ApiUpdateEvaluationTestCaseOutput()`

#### Operations

| Method | Description |
| --- | --- |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `dataset_uuid` | `str` | Dataset against which the test‑case is executed. |
| `description` | `str` | Description of the test case. |
| `metrics` | `dict` |  |
| `name` | `str` | Name of the test case. |
| `star_metric` | `dict` |  |
| `test_case_uuid` | `str` | Test-case UUID to update |
| `version` | `int` | The new verson of the test case. |


### ApiUpdateKnowledgeBaseDataSourceOutput

Create an instance: `api_update_knowledge_base_data_source_output = client.ApiUpdateKnowledgeBaseDataSourceOutput()`

#### Operations

| Method | Description |
| --- | --- |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `aws_data_source` | `dict` | AWS S3 Data Source for Display |
| `bucket_name` | `str` | Name of storage bucket - Deprecated, moved to data_source_details |
| `chunking_algorithm` | `str` |  |
| `chunking_options` | `dict` |  |
| `created_at` | `str` | Creation date / time |
| `data_source_uuid` | `str` | Data Source ID (Path Parameter) |
| `dropbox_data_source` | `dict` | Dropbox Data Source for Display |
| `file_upload_data_source` | `dict` | File to upload as data source for knowledge base. |
| `google_drive_data_source` | `dict` | Google Drive Data Source for Display |
| `item_path` | `str` | Path of folder or object in bucket - Deprecated, moved to data_source_details |
| `knowledge_base_uuid` | `str` | Knowledge Base ID (Path Parameter) |
| `last_datasource_indexing_job` | `dict` |  |
| `region` | `str` | Region code - Deprecated, moved to data_source_details |
| `spaces_data_source` | `dict` | Spaces Bucket Data Source |
| `updated_at` | `str` | Last modified |
| `uuid` | `str` | Unique id of knowledge base |
| `web_crawler_data_source` | `dict` | WebCrawlerDataSource |


### ApiUpdateKnowledgeBaseOutput

Create an instance: `api_update_knowledge_base_output = client.ApiUpdateKnowledgeBaseOutput()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list()` | List entities, optionally matching the given criteria. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `added_to_agent_at` | `str` | Time when the knowledge base was added to the agent |
| `created_at` | `str` | Creation date / time |
| `database_id` | `str` | Identifier of the DigitalOcean OpenSearch database this knowledge base will use, optional. |
| `datasources` | `list` | Optional data sources to attach at creation. |
| `embedding_model_uuid` | `str` | Identifier for the [embedding model](https://docs.digitalocean.com/products/genai-platform/details/models/#embedding-models). |
| `is_public` | `bool` | Whether the knowledge base is public or not |
| `last_indexing_job` | `dict` | IndexingJob description |
| `name` | `str` | Name of knowledge base |
| `project_id` | `str` | Identifier of the DigitalOcean project this knowledge base will belong to. |
| `region` | `str` | Region code |
| `reranking_config` | `dict` | Configuration for cross-encoder reranking during retrieval. |
| `size` | `str` |  |
| `tags` | `list` | Tags to organize related resources |
| `updated_at` | `str` | Last modified |
| `user_id` | `str` | Id of user that created the knowledge base |
| `uuid` | `str` | Unique id for knowledge base |
| `vpc_uuid` | `str` | The VPC to deploy the knowledge base database in |

#### Example: List

```python
api_update_knowledge_base_outputs = client.ApiUpdateKnowledgeBaseOutput().list()
```

#### Example: Create

```python
api_update_knowledge_base_output = client.ApiUpdateKnowledgeBaseOutput().create({
})
```


### ApiUpdateLinkedAgentOutput

Create an instance: `api_update_linked_agent_output = client.ApiUpdateLinkedAgentOutput()`

#### Operations

| Method | Description |
| --- | --- |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `child_agent_uuid` | `str` | Routed agent id |
| `if_case` | `str` | Describes the case in which the child agent should be used |
| `parent_agent_uuid` | `str` | A unique identifier for the parent agent. |
| `rollback` | `bool` |  |
| `route_name` | `str` | Route name |
| `uuid` | `str` | Unique id of linkage |


### ApiUpdateModelApiKeyOutput

Create an instance: `api_update_model_api_key_output = client.ApiUpdateModelApiKeyOutput()`

#### Operations

| Method | Description |
| --- | --- |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `api_key_uuid` | `str` | API key ID |
| `created_at` | `str` | Creation date |
| `created_by` | `str` | Created by |
| `deleted_at` | `str` | Deleted date |
| `name` | `str` | Name |
| `secret_key` | `str` |  |
| `uuid` | `str` | Uuid |


### ApiUpdateModelEvaluationRunOutput

Create an instance: `api_update_model_evaluation_run_output = client.ApiUpdateModelEvaluationRunOutput()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list()` | List entities, optionally matching the given criteria. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `candidate_inference_config` | `dict` | Inference configuration for the candidate model during evaluation. |
| `candidate_model_name` | `str` | Model slug used to call the candidate model API. |
| `candidate_model_source` | `str` | Whether the candidate is a served model (serverless platform, a dedicated deployment, or a model router) or an OHS-hosted agent config. |
| `candidate_model_uuid` | `str` | UUID of the candidate model to evaluate. |
| `created_at` | `str` | Timestamp when the run was created. |
| `dataset_name` | `str` | Name of the dataset used for evaluation. |
| `dataset_uuid` | `str` | UUID of the dataset to use for evaluation. |
| `epochs` | `int` | Number of times to evaluate each dataset row (n-pass/epochs), so the result reports avg@k/pass@k/cons@k instead of a single score. |
| `eval_preset_uuid` | `str` |  |
| `eval_run_uuid` | `str` | UUID of the created evaluation run. |
| `judge_model_name` | `str` |  |
| `judge_model_uuid` | `str` | UUID of the judge model used to score responses. |
| `metric_uuids` | `list` | UUIDs of metrics to evaluate (selected from ListModelEvaluationMetrics). |
| `name` | `str` | Name of the evaluation run. |
| `preset_name` | `str` |  |
| `preset_save_sections` | `list` | Which sections of this run's resolved configuration to persist as a reusable preset. |
| `progress` | `dict` | Per-phase progress for a model evaluation run. |
| `save_as_preset` | `bool` | Deprecated: use `preset_save_sections`. |
| `source` | `str` | Source of the run creation (api, sdk, cli). |
| `star_metric` | `dict` |  |
| `status` | `str` | Model Evaluation Run Statuses |

#### Example: List

```python
api_update_model_evaluation_run_outputs = client.ApiUpdateModelEvaluationRunOutput().list()
```

#### Example: Create

```python
api_update_model_evaluation_run_output = client.ApiUpdateModelEvaluationRunOutput().create({
})
```


### ApiUpdateModelRouterOutput

Create an instance: `api_update_model_router_output = client.ApiUpdateModelRouterOutput()`

#### Operations

| Method | Description |
| --- | --- |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `config` | `dict` |  |
| `created_at` | `str` | Creation date / time |
| `description` | `str` | Description |
| `fallback_models` | `list` |  |
| `name` | `str` | Name of the model router |
| `policies` | `list` | Router policies |
| `regions` | `list` | Target regions for the router |
| `updated_at` | `str` | Last modified |
| `uuid` | `str` | Unique id |


### ApiUpdateOpenAiapiKeyOutput

Create an instance: `api_update_open_aiapi_key_output = client.ApiUpdateOpenAiapiKeyOutput()`

#### Operations

| Method | Description |
| --- | --- |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `api_key` | `str` | OpenAI API key |
| `api_key_uuid` | `str` | API key ID |
| `created_at` | `str` | Key creation date |
| `created_by` | `str` | Created by user id from DO |
| `deleted_at` | `str` | Key deleted date |
| `models` | `list` | Models supported by the openAI api key |
| `name` | `str` | Name |
| `updated_at` | `str` | Key last updated date |
| `uuid` | `str` | Uuid |


### ApiUpdateScenarioSetOutput

Create an instance: `api_update_scenario_set_output = client.ApiUpdateScenarioSetOutput()`

#### Operations

| Method | Description |
| --- | --- |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `bucket_name` | `str` | Object storage bucket holding the scenario file. |
| `bucket_region` | `str` | Object storage bucket region. |
| `created_at` | `str` | Time created at. |
| `deleted_at` | `str` | Time deleted at. |
| `description` | `str` | Customer-supplied description. |
| `failure_reason` | `str` | Human-readable explanation of a terminal FAILED status. |
| `generator_model_uuid` | `str` | Model that produced the scenarios. |
| `library_scenario_uuid` | `str` | UUID of the source library entry. |
| `name` | `str` | Customer-supplied name. |
| `scenario_count` | `int` | Number of scenarios in the set. |
| `scenario_set_uuid` | `str` | UUID of the scenario set. |
| `scenarios` | `list` | Optional inline scenarios to replace the set contents. |
| `source_export_id` | `str` | Signals export UUID that produced this set. |
| `source_goal_description` | `str` | The goal that drove generation. |
| `source_kind` | `str` | How a scenario set was created. |
| `spaces_key` | `str` | Object storage key for the scenario file. |
| `status` | `str` | Lifecycle status of a scenario set. |
| `updated_at` | `str` | Time last updated at. |
| `workflow_uuid` | `str` | Identifier of the generation workflow. |


### ApiUpdateSimulationRunOutput

Create an instance: `api_update_simulation_run_output = client.ApiUpdateSimulationRunOutput()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list()` | List entities, optionally matching the given criteria. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `agent_config` | `dict` | Configuration of the candidate agent under test for a simulation run. |
| `created_at` | `str` | Time created at. |
| `created_by_user_email` | `str` | Email of the user who triggered this run. |
| `created_by_user_id` | `str` | User id of the actor who triggered this run. |
| `deleted_at` | `str` | Time deleted at. |
| `evaluation_config` | `dict` | Optional configuration that opts a simulation run into an evaluation. |
| `evaluation_run_uuid` | `str` | UUID of the evaluation run reserved for this simulation, when the create request included evaluation_config. |
| `exploration_budget` | `int` | Optional run-level journeys-per-scenario override. |
| `failure_reason` | `str` | Human-readable explanation of a terminal FAILED status. |
| `journeys_finished` | `int` | Number of journeys that have finished (successfully or not). |
| `judge_model_name` | `str` | Display name of the judge model (from the model catalog). |
| `judge_model_uuid` | `str` | Model used by the judge. |
| `max_turns` | `int` | Optional run-level turn budget. |
| `name` | `str` | Optional run name. |
| `result_summary` | `dict` | Aggregated final result of a simulation run: verdict counts plus token and duration totals. |
| `run_uuid` | `str` | UUID of the run. |
| `scenario_count` | `int` | Number of scenarios in the scenario set for this run. |
| `scenario_set_uuid` | `str` | UUID of the scenario set being executed (must exist at run create). |
| `status` | `str` | Lifecycle status of a simulation run. |
| `total_journeys` | `int` | Total number of journeys (sum of exploration budgets). |
| `updated_at` | `str` | Time last updated at. |
| `user_simulator_config` | `dict` | Optional user simulator model settings such as temperature and max_tokens. |
| `user_simulator_model_name` | `str` | Display name of the user simulator model (from the model catalog). |
| `user_simulator_model_uuid` | `str` | Model used by the user simulator. |
| `workflow_uuid` | `str` | Identifier of the workflow executing this run. |

#### Example: List

```python
api_update_simulation_run_outputs = client.ApiUpdateSimulationRunOutput().list()
```

#### Example: Create

```python
api_update_simulation_run_output = client.ApiUpdateSimulationRunOutput().create({
})
```


### ApiUpdateWorkspaceOutput

Create an instance: `api_update_workspace_output = client.ApiUpdateWorkspaceOutput()`

#### Operations

| Method | Description |
| --- | --- |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `agents` | `list` | Agents |
| `created_at` | `str` | Creation date |
| `created_by` | `str` | The id of user who created this workspace |
| `created_by_email` | `str` | The email of the user who created this workspace |
| `deleted_at` | `str` | Deleted date |
| `description` | `str` | Description of the workspace |
| `evaluation_test_cases` | `list` | Evaluations |
| `name` | `str` | Name of the workspace |
| `updated_at` | `str` | Update date |
| `uuid` | `str` | Unique id |
| `workspace_uuid` | `str` | Workspace UUID. |


### App

Create an instance: `app = client.App()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `active_deployment` | `dict` |  |
| `autoscaling` | `dict` | Autoscaling event details. |
| `created_at` | `str` |  |
| `dedicated_ips` | `list` |  |
| `default_ingress` | `str` |  |
| `deployment` | `dict` |  |
| `deployment_id` | `str` | For deployment events, this is the same as the deployment's ID. |
| `domains` | `list` |  |
| `id` | `str` |  |
| `in_progress_deployment` | `dict` |  |
| `last_deployment_created_at` | `str` |  |
| `live_domain` | `str` |  |
| `live_url` | `str` |  |
| `live_url_base` | `str` |  |
| `owner_uuid` | `str` |  |
| `pending_deployment` | `Any` |  |
| `pinned_deployment` | `Any` |  |
| `project_id` | `str` | Requires `project:read` scope. |
| `region` | `dict` |  |
| `spec` | `dict` | The desired configuration of an application. |
| `tier_slug` | `str` |  |
| `type` | `str` | The type of event |
| `update_all_source_versions` | `bool` | Whether or not to update the source versions (for example fetching a new commit or image digest) of all components. |
| `updated_at` | `str` |  |
| `vpc` | `dict` |  |

#### Example: Load

```python
app = client.App().load({"id": "app_id"})
```

#### Example: List

```python
apps = client.App().list()
```

#### Example: Create

```python
app = client.App().create({
    "spec": {},  # dict
})
```


### AppAlert

Create an instance: `app_alert = client.AppAlert()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `component_name` | `str` |  |
| `emails` | `list` |  |
| `id` | `str` |  |
| `phase` | `str` |  |
| `progress` | `dict` |  |
| `slack_webhooks` | `list` |  |
| `spec` | `dict` |  |

#### Example: List

```python
app_alerts = client.AppAlert().list({"id": "example"})
```

#### Example: Create

```python
app_alert = client.AppAlert().create({
    "alert_id": "example_alert_id",  # str
    "app_id": "example_app_id",  # str
})
```


### AppEvent

Create an instance: `app_event = client.AppEvent()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `autoscaling` | `dict` | Autoscaling event details. |
| `created_at` | `str` |  |
| `deployment` | `dict` |  |
| `deployment_id` | `str` | For deployment events, this is the same as the deployment's ID. |
| `id` | `str` |  |
| `type` | `str` | The type of event |

#### Example: List

```python
app_events = client.AppEvent().list({"id": "example"})
```


### AppHealth

Create an instance: `app_health = client.AppHealth()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `components` | `list` |  |
| `functions_components` | `list` |  |
| `id` | `str` |  |

#### Example: Load

```python
app_health = client.AppHealth().load({"id": "app_health_id"})
```


### AppInstance

Create an instance: `app_instance = client.AppInstance()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `component_name` | `str` | Name of the component, from the app spec. |
| `component_type` | `str` | Supported compute component by DigitalOcean App Platform. |
| `id` | `str` |  |
| `instance_alias` | `str` | Readable identifier, an alias of the instance name, reference for mapping insights to instance names. |
| `instance_name` | `str` | Name of the instance, which is a unique identifier for the instance. |

#### Example: List

```python
app_instances = client.AppInstance().list({"id": "example"})
```


### AppJobInvocation

Create an instance: `app_job_invocation = client.AppJobInvocation()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `completed_at` | `str` |  |
| `created_at` | `str` |  |
| `deployment_id` | `str` |  |
| `id` | `str` |  |
| `job_name` | `str` |  |
| `phase` | `str` | The phase of the job invocation |
| `started_at` | `str` |  |
| `trigger` | `dict` |  |

#### Example: Load

```python
app_job_invocation = client.AppJobInvocation().load({"id": "app_job_invocation_id", "app_id": "app_id"})
```

#### Example: List

```python
app_job_invocations = client.AppJobInvocation().list({"id": "example_id"})
```

#### Example: Create

```python
app_job_invocation = client.AppJobInvocation().create({
    "app_id": "example_app_id",  # str
    "job_invocation_id": "example_job_invocation_id",  # str
})
```


### AppMetricsBandwidthUsage

Create an instance: `app_metrics_bandwidth_usage = client.AppMetricsBandwidthUsage()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `app_bandwidth_usage` | `list` | A list of bandwidth usage details by app. |
| `app_id` | `str` | The ID of the app. |
| `app_ids` | `list` | A list of app IDs to query bandwidth metrics for. |
| `bandwidth_bytes` | `str` | The used bandwidth amount in bytes. |
| `date` | `str` | The date for the metrics data. |

#### Example: List

```python
app_metrics_bandwidth_usages = client.AppMetricsBandwidthUsage().list({"app_id": "example"})
```

#### Example: Create

```python
app_metrics_bandwidth_usage = client.AppMetricsBandwidthUsage().create({
    "app_ids": [],  # list
})
```


### AppPropose

Create an instance: `app_propose = client.AppPropose()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `app_cost` | `int` | The monthly cost of the proposed app in USD. |
| `app_id` | `str` | An optional ID of an existing app. |
| `app_is_static` | `bool` | Indicates whether the app is a static app. |
| `app_name_available` | `bool` | Indicates whether the app name is available. |
| `app_name_suggestion` | `str` | The suggested name if the proposed app name is unavailable. |
| `app_tier_downgrade_cost` | `int` | The monthly cost of the proposed app in USD using the previous pricing plan tier. |
| `existing_static_apps` | `str` | The maximum number of free static apps the account can have. |
| `spec` | `dict` | The desired configuration of an application. |

#### Example: Create

```python
app_propose = client.AppPropose().create({
    "spec": {},  # dict
})
```


### AppsDeployment

Create an instance: `apps_deployment = client.AppsDeployment()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `cause` | `str` |  |
| `cloned_from` | `str` |  |
| `components` | `list` |  |
| `created_at` | `str` |  |
| `deployment_id` | `str` | The ID of the deployment to rollback to. |
| `force_build` | `bool` |  |
| `functions` | `list` |  |
| `id` | `str` |  |
| `jobs` | `list` |  |
| `phase` | `str` |  |
| `phase_last_updated_at` | `str` |  |
| `progress` | `dict` |  |
| `services` | `list` |  |
| `skip_pin` | `bool` | Whether to skip pinning the rollback deployment. |
| `spec` | `dict` | The desired configuration of an application. |
| `static_sites` | `list` |  |
| `tier_slug` | `str` |  |
| `updated_at` | `str` |  |
| `workers` | `list` |  |

#### Example: Load

```python
apps_deployment = client.AppsDeployment().load({"id": "apps_deployment_id", "app_id": "app_id"})
```

#### Example: List

```python
apps_deployments = client.AppsDeployment().list({"app_id": "example"})
```

#### Example: Create

```python
apps_deployment = client.AppsDeployment().create({
    "app_id": "example_app_id",  # str
    "spec": {},  # dict
})
```


### AppsGetExec

Create an instance: `apps_get_exec = client.AppsGetExec()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `url` | `str` | A websocket URL that allows sending/receiving console input and receiving console output. |

#### Example: Load

```python
apps_get_exec = client.AppsGetExec().load({"app_id": "app_id", "component_name": "component_name"})
```


### AppsGetLog

Create an instance: `apps_get_log = client.AppsGetLog()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `historic_urls` | `list` |  |
| `live_url` | `str` | A URL of the real-time live logs. |

#### Example: List

```python
apps_get_logs = client.AppsGetLog().list({"app_id": "example", "type": "example"})
```


### AppsInstanceSize

Create an instance: `apps_instance_size = client.AppsInstanceSize()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `bandwidth_allowance_gib` | `str` |  |
| `cpu_type` | `str` |  |
| `cpus` | `str` |  |
| `deprecation_intent` | `bool` |  |
| `id` | `str` |  |
| `memory_bytes` | `str` |  |
| `name` | `str` |  |
| `scalable` | `bool` |  |
| `single_instance_only` | `bool` |  |
| `slug` | `str` |  |
| `tier_downgrade_to` | `str` |  |
| `tier_slug` | `str` |  |
| `tier_upgrade_to` | `str` |  |
| `usd_per_month` | `str` |  |
| `usd_per_second` | `str` |  |

#### Example: Load

```python
apps_instance_size = client.AppsInstanceSize().load({"id": "apps_instance_size_id"})
```

#### Example: List

```python
apps_instance_sizes = client.AppsInstanceSize().list()
```


### AppsRegion

Create an instance: `apps_region = client.AppsRegion()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `continent` | `str` |  |
| `data_centers` | `list` |  |
| `default` | `bool` | Whether or not the region is presented as the default. |
| `disabled` | `bool` |  |
| `flag` | `str` |  |
| `label` | `str` |  |
| `reason` | `str` |  |
| `slug` | `str` |  |

#### Example: List

```python
apps_regions = client.AppsRegion().list()
```


### AssociatedKubernetesResource

Create an instance: `associated_kubernetes_resource = client.AssociatedKubernetesResource()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `load_balancers` | `list` | A list of names and IDs for associated load balancers that can be destroyed along with the cluster. |
| `volume_snapshots` | `list` | A list of names and IDs for associated volume snapshots that can be destroyed along with the cluster. |
| `volumes` | `list` | A list of names and IDs for associated volumes that can be destroyed along with the cluster. |

#### Example: List

```python
associated_kubernetes_resources = client.AssociatedKubernetesResource().list({"cluster_id": "example"})
```


### AssociatedResourceStatus

Create an instance: `associated_resource_status = client.AssociatedResourceStatus()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `completed_at` | `str` | A time value given in ISO8601 combined date and time format indicating when the requested action was completed. |
| `droplet` | `dict` | An object containing information about a resource scheduled for deletion. |
| `failures` | `int` | A count of the associated resources that failed to be destroyed, if any. |
| `resources` | `dict` | An object containing additional information about resource related to a Droplet requested to be destroyed. |

#### Example: Load

```python
associated_resource_status = client.AssociatedResourceStatus().load({"droplet_id": 1})
```


### AsyncInvoke

Create an instance: `async_invoke = client.AsyncInvoke()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `completed_at` | `str` | The timestamp when the job completed. |
| `created_at` | `str` | The timestamp when the request was created. |
| `error` | `str` | Error message if the job failed. |
| `input` | `dict` | The input parameters for the model invocation. |
| `model_id` | `str` | The model ID that was invoked. |
| `output` | `dict` | The output of the invocation. |
| `request_id` | `str` | A unique identifier for the async invocation request. |
| `started_at` | `str` | The timestamp when the job started processing. |
| `status` | `str` | The current status of the async invocation. |
| `tags` | `list` | An optional list of key-value tags to attach to the invocation request for tracking or categorization. |

#### Example: Create

```python
async_invoke = client.AsyncInvoke().create({
    "created_at": "example_created_at",  # str
    "input": {},  # dict
    "model_id": "example_model_id",  # str
    "request_id": "example_request_id",  # str
    "status": "example_status",  # str
})
```


### Balance

Create an instance: `balance = client.Balance()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `account_balance` | `str` | Current balance of the customer's most recent billing activity. |
| `generated_at` | `str` | The time at which balances were most recently generated. |
| `month_to_date_balance` | `str` | Balance as of the `generated_at` time. |
| `month_to_date_usage` | `str` | Amount used in the current billing period as of the `generated_at` time. |

#### Example: Load

```python
balance = client.Balance().load()
```


### Batch

Create an instance: `batch = client.Batch()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `batch_id` | `str` | Unique identifier for the batch job. |
| `cancelled_at` | `str` |  |
| `completed_at` | `str` |  |
| `completion_window` | `str` | Time window in which the job must complete. |
| `created_at` | `str` |  |
| `endpoint` | `str` | Inference endpoint each request is dispatched to. |
| `error_file_id` | `str` | Error sidecar file. |
| `errors` | `list` | Top-level errors that prevented the batch from completing. |
| `expires_at` | `str` | Derived from `created_at` plus `completion_window`. |
| `failed_at` | `str` |  |
| `file_id` | `str` | The `file_id` returned by `POST /v1/batches/files`. |
| `finalizing_at` | `str` |  |
| `id` | `str` |  |
| `in_progress_at` | `str` |  |
| `input_file_id` | `str` | The uploaded JSONL input file. |
| `metadata` | `dict` | Metadata attached at creation. |
| `output_file_id` | `str` | Output JSONL file. |
| `provider` | `str` | The inference provider whose JSONL schema the input file conforms to. |
| `request_counts` | `dict` | Aggregate request counts. |
| `request_id` | `str` | The idempotency key supplied at creation. |
| `status` | `str` | Lifecycle status. |

#### Example: Load

```python
batch = client.Batch().load({"id": "batch_id"})
```

#### Example: List

```python
batchs = client.Batch().list()
```

#### Example: Create

```python
batch = client.Batch().create({
    "batch_id": "example_batch_id",  # str
    "completion_window": "example_completion_window",  # str
    "created_at": "example_created_at",  # str
    "file_id": "example_file_id",  # str
    "input_file_id": "example_input_file_id",  # str
    "provider": "example_provider",  # str
    "status": "example_status",  # str
})
```


### BatchFileCreate

Create an instance: `batch_file_create = client.BatchFileCreate()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `file_name` | `str` | The file you plan to upload. |

#### Example: Create

```python
batch_file_create = client.BatchFileCreate().create({
    "file_name": "example_file_name",  # str
})
```


### BatchInference

Create an instance: `batch_inference = client.BatchInference()`

#### Operations

| Method | Description |
| --- | --- |
| `update(data)` | Update an existing entity. |


### BatchResult

Create an instance: `batch_result = client.BatchResult()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `batch_id` | `str` |  |
| `error_file_url` | `str` | Presigned URL for the error sidecar JSONL, if any. |
| `expires_at` | `str` | When the presigned URLs expire. |
| `id` | `str` |  |
| `output_file_url` | `str` | Presigned URL for the main results JSONL. |
| `result_available` | `bool` | When `false`, keep polling batch status and retry later. |

#### Example: Load

```python
batch_result = client.BatchResult().load({"id": "batch_result_id"})
```


### Billing

Create an instance: `billing = client.Billing()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `amount` | `str` | Amount of the billing history entry. |
| `current_page` | `int` | Current page number |
| `data_points` | `list` | Array of billing data points, which are day-over-day changes in billing resource usage based on nightly invoice item estimates, for the requested period |
| `date` | `str` | Time the billing history entry occurred. |
| `description` | `str` | Description of the billing history entry. |
| `id` | `str` |  |
| `invoice_id` | `str` | ID of the invoice associated with the billing history entry, if applicable. |
| `invoice_items` | `list` |  |
| `invoice_period` | `str` | Billing period of usage for which the invoice is issued, in `YYYY-MM` format. |
| `invoice_uuid` | `str` | UUID of the invoice associated with the billing history entry, if applicable. |
| `links` | `dict` |  |
| `meta` | `Any` |  |
| `total_items` | `int` | Total number of items available across all pages |
| `total_pages` | `int` | Total number of pages available |
| `type` | `str` | Type of billing history entry. |
| `updated_at` | `str` | Time the invoice was last updated. |

#### Example: Load

```python
billing = client.Billing().load({"invoice_uuid": "invoice_uuid"})
```

#### Example: List

```python
billings = client.Billing().list()
```


### BlockStorage

Create an instance: `block_storage = client.BlockStorage()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `created_at` | `str` | A time value given in ISO8601 combined date and time format that represents when the snapshot was created. |
| `description` | `str` | An optional free-form text field to describe a block storage volume. |
| `droplet_ids` | `list` | An array containing the IDs of the Droplets the volume is attached to. |
| `filesystem_label` | `str` | The label currently applied to the filesystem. |
| `filesystem_type` | `str` | The type of filesystem currently in-use on the volume. |
| `id` | `str` | The unique identifier for the snapshot. |
| `min_disk_size` | `int` | The minimum size in GB required for a volume or Droplet to use this snapshot. |
| `name` | `str` | A human-readable name for the snapshot. |
| `region` | `Any` |  |
| `regions` | `list` | An array of the regions that the snapshot is available in. |
| `resource_id` | `str` | The unique identifier for the resource that the snapshot originated from. |
| `resource_type` | `str` | The type of resource that the snapshot originated from. |
| `size_gigabytes` | `float` | The billable size of the snapshot in gigabytes. |
| `tags` | `list` | An array of Tags the snapshot has been tagged with.<br><br>Requires `tag:read` scope. |
| `volume` | `dict` |  |

#### Example: Load

```python
block_storage = client.BlockStorage().load({"volume_id": "volume_id"})
```

#### Example: List

```python
block_storages = client.BlockStorage().list()
```

#### Example: Create

```python
block_storage = client.BlockStorage().create({
    "created_at": "example_created_at",  # str
    "id": "example_id",  # str
    "min_disk_size": 1,  # int
    "name": "example_name",  # str
    "regions": [],  # list
    "resource_id": "example_resource_id",  # str
    "resource_type": "example_resource_type",  # str
    "size_gigabytes": 1,  # float
    "tags": [],  # list
})
```


### BlockStorageAction

Create an instance: `block_storage_action = client.BlockStorageAction()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `completed_at` | `str` | A time value given in ISO8601 combined date and time format that represents when the action was completed. |
| `id` | `int` | A unique numeric ID that can be used to identify and reference an action. |
| `region` | `dict` |  |
| `region_slug` | `str` | A human-readable string that is used as a unique identifier for each region. |
| `resource_id` | `int` | A unique identifier for the resource that the action is associated with. |
| `resource_type` | `str` | The type of resource that the action is associated with. |
| `started_at` | `str` | A time value given in ISO8601 combined date and time format that represents when the action was initiated. |
| `status` | `str` | The current status of the action. |
| `type` | `str` | This is the type of action that the object represents. |

#### Example: Load

```python
block_storage_action = client.BlockStorageAction().load({"id": 1, "volume_id": "volume_id"})
```

#### Example: List

```python
block_storage_actions = client.BlockStorageAction().list({"volume_id": "example"})
```

#### Example: Create

```python
block_storage_action = client.BlockStorageAction().create({
    "region": {},  # dict
})
```


### ByoipPrefix

Create an instance: `byoip_prefix = client.ByoipPrefix()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `advertise` | `bool` | Whether the BYOIP prefix should be advertised |
| `advertised` | `bool` | Whether the BYOIP prefix is being advertised |
| `failure_reason` | `str` | Reason for failure, if applicable |
| `id` | `str` |  |
| `locked` | `bool` | Whether the BYOIP prefix is locked |
| `name` | `str` | Name of the BYOIP prefix |
| `prefix` | `str` | The IP prefix in CIDR notation |
| `project_id` | `str` | The ID of the project associated with the BYOIP prefix |
| `region` | `str` | Region where the BYOIP prefix is located |
| `signature` | `str` | The signature hash for the prefix creation request |
| `status` | `str` | Status of the BYOIP prefix |
| `uuid` | `str` | Unique identifier for the BYOIP prefix |
| `validations` | `list` | List of validation statuses for the BYOIP prefix |

#### Example: Load

```python
byoip_prefix = client.ByoipPrefix().load({"id": "byoip_prefix_id"})
```

#### Example: List

```python
byoip_prefixs = client.ByoipPrefix().list()
```

#### Example: Create

```python
byoip_prefix = client.ByoipPrefix().create({
    "signature": "example_signature",  # str
})
```


### CdnEndpoint

Create an instance: `cdn_endpoint = client.CdnEndpoint()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `certificate_id` | `str` | The ID of a DigitalOcean managed TLS certificate used for SSL when a custom subdomain is provided. |
| `created_at` | `str` | A time value given in ISO8601 combined date and time format that represents when the CDN endpoint was created. |
| `custom_domain` | `str` | The fully qualified domain name (FQDN) of the custom subdomain used with the CDN endpoint. |
| `endpoint` | `str` | The fully qualified domain name (FQDN) from which the CDN-backed content is served. |
| `id` | `str` | A unique ID that can be used to identify and reference a CDN endpoint. |
| `origin` | `str` | The fully qualified domain name (FQDN) for the origin server which provides the content for the CDN. |
| `ttl` | `int` | The amount of time the content is cached by the CDN's edge servers in seconds. |

#### Example: Load

```python
cdn_endpoint = client.CdnEndpoint().load({"id": "cdn_endpoint_id"})
```

#### Example: List

```python
cdn_endpoints = client.CdnEndpoint().list()
```

#### Example: Create

```python
cdn_endpoint = client.CdnEndpoint().create({
    "origin": "example_origin",  # str
})
```


### Certificate

Create an instance: `certificate = client.Certificate()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `certificate` | `dict` |  |
| `created_at` | `str` | A time value given in ISO8601 combined date and time format that represents when the certificate was created. |
| `dns_names` | `list` | An array of fully qualified domain names (FQDNs) for which the certificate was issued. |
| `id` | `str` | A unique ID that can be used to identify and reference a certificate. |
| `name` | `str` | A unique human-readable name referring to a certificate. |
| `not_after` | `str` | A time value given in ISO8601 combined date and time format that represents the certificate's expiration date. |
| `sha1_fingerprint` | `str` | A unique identifier generated from the SHA-1 fingerprint of the certificate. |
| `state` | `str` | A string representing the current state of the certificate. |
| `type` | `str` | A string representing the type of the certificate. |

#### Example: Load

```python
certificate = client.Certificate().load({"id": "certificate_id"})
```

#### Example: List

```python
certificates = client.Certificate().list()
```

#### Example: Create

```python
certificate = client.Certificate().create({
})
```


### ChatCompletion

Create an instance: `chat_completion = client.ChatCompletion()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `choices` | `list` | A list of chat completion choices. |
| `created` | `int` | The Unix timestamp (in seconds) of when the chat completion was created. |
| `frequency_penalty` | `float` | Number between -2.0 and 2.0. |
| `id` | `str` | A unique identifier for the chat completion. |
| `logit_bias` | `dict` | Modify the likelihood of specified tokens appearing in the completion. |
| `logprobs` | `bool` | Whether to return log probabilities of the output tokens or not. |
| `max_completion_tokens` | `int` | The maximum number of completion tokens that may be used over the course of the run. |
| `max_tokens` | `int` | The maximum number of tokens that can be generated in the completion. |
| `messages` | `list` | A list of messages comprising the conversation so far. |
| `metadata` | `dict` | Set of 16 key-value pairs that can be attached to an object. |
| `model` | `str` | The model used for the chat completion. |
| `n` | `int` | How many chat completion choices to generate for each input message. |
| `object` | `str` | The object type, which is always chat.completion. |
| `presence_penalty` | `float` | Number between -2.0 and 2.0. |
| `reasoning_effort` | `str` | Constrains effort on reasoning for reasoning models. |
| `seed` | `int` | If specified, the system will make a best effort to sample deterministically, such that repeated requests with the same seed and parameters should return the same result. |
| `stop` | `Any` | Up to 4 sequences where the API will stop generating further tokens. |
| `stream` | `bool` | If set to true, the model response data will be streamed to the client as it is generated using server-sent events. |
| `stream_options` | `dict` | Options for streaming response. |
| `temperature` | `float` | What sampling temperature to use, between 0 and 2. |
| `tool_choice` | `Any` | Controls which (if any) tool is called by the model. |
| `tools` | `list` | A list of tools the model may call. |
| `top_logprobs` | `int` | An integer between 0 and 20 specifying the number of most likely tokens to return at each token position, each with an associated log probability. |
| `top_p` | `float` | An alternative to sampling with temperature, called nucleus sampling, where the model considers the results of the tokens with top_p probability mass. |
| `usage` | `dict` | Usage statistics for the completion request. |
| `user` | `str` | A unique identifier representing your end-user, which can help DigitalOcean to monitor and detect abuse. |

#### Example: Create

```python
chat_completion = client.ChatCompletion().create({
    "choices": [],  # list
    "created": 1,  # int
    "id": "example_id",  # str
    "messages": [],  # list
    "model": "example_model",  # str
    "object": "example_object",  # str
    "usage": {},  # dict
})
```


### Clusterlint

Create an instance: `clusterlint = client.Clusterlint()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `check_name` | `str` | The clusterlint check that resulted in the diagnostic. |
| `message` | `str` | Feedback about the object for users to fix. |
| `object` | `dict` | Metadata about the Kubernetes API object the diagnostic is reported on. |
| `severity` | `str` | Can be one of error, warning or suggestion. |

#### Example: List

```python
clusterlints = client.Clusterlint().list({"cluster_id": "example"})
```


### Connection

Create an instance: `connection = client.Connection()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `api_key` | `dict` | Set for `team_api_key` connections. |
| `authorization` | `Any` | Present only while the connection is pending and you created it. |
| `connection` | `Any` | The connection. |
| `connection_parameters` | `dict` | Values for the provider's `connection_parameters`, validated against their specifications. |
| `created_at` | `str` | When the connection was created. |
| `credential` | `dict` | Optional credential to connect through. |
| `credential_id` | `str` | Empty for `digitalocean_oauth`; otherwise the ID of the team provider credential the connection uses. |
| `credential_kind` | `str` | `digitalocean_oauth`, `private_oauth`, or `team_api_key`. |
| `granted_at` | `str` | Deprecated: read `oauth.granted_at`. |
| `id` | `str` | Opaque connection ID. |
| `network` | `dict` | Optional private network for the connection's calls. |
| `oauth` | `dict` | Set for `digitalocean_oauth` and `private_oauth` connections. |
| `owning_user_id` | `str` | DigitalOcean user ID of the user who created the connection, when recorded. |
| `provider` | `str` | Required provider slug, from the provider list. |
| `provider_display_name` | `str` | Human-readable provider name, for example `Jira`. |
| `revoked_at` | `str` | When the connection was revoked. |
| `scopes` | `list` | Optional OAuth scopes to request. |
| `status` | `str` | pending, active, revoked, or expired. |
| `updated_at` | `str` | When the connection was last modified. |
| `user_id` | `str` | Required. |

#### Example: Load

```python
connection = client.Connection().load({"id": "connection_id"})
```

#### Example: List

```python
connections = client.Connection().list()
```

#### Example: Create

```python
connection = client.Connection().create({
    "provider": "example_provider",  # str
    "user_id": "example_user_id",  # str
})
```


### ConnectionPool

Create an instance: `connection_pool = client.ConnectionPool()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `connection` | `Any` |  |
| `db` | `str` | The database for use with the connection pool. |
| `mode` | `str` | The PGBouncer transaction mode for the connection pool. |
| `name` | `str` | A unique name for the connection pool. |
| `private_connection` | `Any` |  |
| `size` | `int` | The desired size of the PGBouncer connection pool. |
| `standby_connection` | `Any` |  |
| `standby_private_connection` | `Any` |  |
| `user` | `str` | The name of the user for use with the connection pool. |

#### Example: List

```python
connection_pools = client.ConnectionPool().list({"database_id": "example"})
```


### ContainerRegistry

Create an instance: `container_registry = client.ContainerRegistry()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `available_regions` | `list` |  |
| `blobs` | `list` | All blobs associated with this manifest |
| `blobs_deleted` | `int` | The number of blobs deleted as a result of this garbage collection. |
| `cancel` | `bool` | A boolean value indicating that the garbage collection should be cancelled. |
| `compressed_size_bytes` | `int` | The compressed size of the manifest in bytes. |
| `created_at` | `str` | A time value given in ISO8601 combined date and time format that represents when the registry was created. |
| `digest` | `str` | The manifest digest |
| `freed_bytes` | `int` | The number of bytes freed as a result of this garbage collection. |
| `id` | `str` |  |
| `latest_manifest` | `dict` |  |
| `latest_tag` | `dict` |  |
| `manifest_count` | `int` | The number of manifests in the repository. |
| `manifest_digest` | `str` | The digest of the manifest associated with the tag. |
| `name` | `str` | A globally unique name for the container registry. |
| `region` | `str` | Slug of the region where registry data is stored |
| `registries` | `list` |  |
| `registry_name` | `str` | The name of the container registry. |
| `repository` | `str` | The name of the repository. |
| `size_bytes` | `int` | The uncompressed size of the manifest in bytes (this size is calculated asynchronously so it may not be immediately available). |
| `status` | `str` | The current status of this garbage collection. |
| `storage_usage_bytes` | `int` | The amount of storage used in the registry in bytes. |
| `storage_usage_bytes_updated_at` | `str` | The time at which the storage usage was updated. |
| `subscription` | `Any` |  |
| `subscription_tier_slug` | `str` | The slug of the subscription tier to sign up for. |
| `subscription_tiers` | `list` |  |
| `tag` | `str` | The name of the tag. |
| `tag_count` | `int` | The number of tags in the repository. |
| `tags` | `list` | All tags associated with this manifest |
| `tier` | `dict` |  |
| `tier_slug` | `str` | The slug of the subscription tier to sign up for. |
| `type` | `str` | Type of the garbage collection to run against this registry |
| `updated_at` | `str` | The time the garbage collection was last updated. |
| `uuid` | `str` | A string specifying the UUID of the garbage collection. |

#### Example: Load

```python
container_registry = client.ContainerRegistry().load({"id": "container_registry_id"})
```

#### Example: List

```python
container_registrys = client.ContainerRegistry().list()
```

#### Example: Create

```python
container_registry = client.ContainerRegistry().create({
})
```


### CreateResponse

Create an instance: `create_response = client.CreateResponse()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `created` | `int` | The Unix timestamp (in seconds) of when the response was created. |
| `id` | `str` | A unique identifier for the response. |
| `input` | `Any` | The prompt or input content you want the model to respond to. |
| `instructions` | `str` | System-level instructions for the model. |
| `max_output_tokens` | `int` | Maximum output tokens setting. |
| `metadata` | `dict` | Set of key-value pairs that can be attached to the request. |
| `model` | `str` | The model used to generate the response. |
| `object` | `str` | The object type, which is always `response`. |
| `output` | `list` | An array of content items generated by the model. |
| `parallel_tool_calls` | `bool` | Whether parallel tool calls are enabled. |
| `status` | `str` | Status of the response. |
| `stop` | `Any` | Up to 4 sequences where the API will stop generating further tokens. |
| `stream` | `bool` | Set to true to stream partial responses as Server-Sent Events. |
| `stream_options` | `dict` | Options for streaming response. |
| `temperature` | `float` | Temperature setting used for the response. |
| `tool_choice` | `str` | Tool choice setting used for the response. |
| `tools` | `list` | Tools available for the response. |
| `top_p` | `float` | Top-p setting used for the response. |
| `usage` | `dict` | Detailed usage statistics for the Responses API request, including input/output token counts and detailed breakdowns. |
| `user` | `str` | User identifier. |

#### Example: Create

```python
create_response = client.CreateResponse().create({
    "created": 1,  # int
    "id": "example_id",  # str
    "input": "example_input",  # Any
    "model": "example_model",  # str
    "object": "example_object",  # str
    "output": [],  # list
    "usage": {},  # dict
})
```


### Credential

Create an instance: `credential = client.Credential()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `certificate_authority_data` | `str` | A base64 encoding of bytes representing the certificate authority data for accessing the cluster. |
| `client_certificate_data` | `str` | A base64 encoding of bytes representing the x509 client certificate data for access the cluster. |
| `client_key_data` | `str` | A base64 encoding of bytes representing the x509 client key data for access the cluster. |
| `expires_at` | `str` | A time value given in ISO8601 combined date and time format that represents when the access token expires. |
| `server` | `str` | The URL used to access the cluster API server. |
| `token` | `str` | An access token used to authenticate with the cluster. |

#### Example: Load

```python
credential = client.Credential().load({"cluster_id": "cluster_id"})
```


### Database

Create an instance: `database = client.Database()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `patch(data)` | Change part of an existing entity. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `access_cert` | `str` | Access certificate for TLS client authentication. |
| `access_key` | `str` | Access key for TLS client authentication. |
| `autoscale` | `Any` | Autoscaling configuration for the database cluster. |
| `backup_restore` | `dict` |  |
| `compatibility_level` | `str` | The compatibility level of the schema registry. |
| `config` | `dict` |  |
| `connection` | `Any` |  |
| `created_at` | `str` | A time value given in ISO8601 combined date and time format that represents when the database cluster was created. |
| `credentials` | `dict` |  |
| `db` | `str` | The database for use with the connection pool. |
| `db_names` | `list` | An array of strings containing the names of databases created in the database cluster. |
| `do_settings` | `Any` |  |
| `engine` | `str` | A slug representing the database engine used for the cluster. |
| `id` | `str` | A unique ID that can be used to identify and reference a database replica. |
| `maintenance_window` | `Any` |  |
| `metrics_endpoints` | `list` | Public hostname and port of the cluster's metrics endpoint(s). |
| `mode` | `str` | The PGBouncer transaction mode for the connection pool. |
| `mysql_settings` | `dict` |  |
| `name` | `str` | The name of the database. |
| `num_nodes` | `int` | The number of nodes in the database cluster. |
| `partition_count` | `int` | The number of partitions available for the topic. |
| `partitions` | `list` |  |
| `password` | `str` | A randomly generated password for the database user.<br>Requires `database:view_credentials` scope. |
| `private_connection` | `Any` |  |
| `private_network_uuid` | `str` | A string specifying the UUID of the VPC to which the read-only replica will be assigned. |
| `project_id` | `str` | The ID of the project that the database cluster is assigned to. |
| `region` | `str` | A slug identifier for the region where the read-only replica will be located. |
| `replication_factor` | `int` | The number of nodes to replicate data across the cluster. |
| `role` | `str` | A string representing the database user's role. |
| `rules` | `list` |  |
| `schema` | `str` | The schema definition in the specified format. |
| `schema_id` | `int` | The id for schema. |
| `schema_registry_connection` | `Any` | The connection details for Schema Registry. |
| `schema_type` | `str` | The type of the schema. |
| `semantic_version` | `str` | A string representing the semantic version of the database engine in use for the cluster. |
| `settings` | `dict` | User settings that can be updated via the Update a Database User endpoint. |
| `size` | `int` | The desired size of the PGBouncer connection pool. |
| `standby_connection` | `Any` |  |
| `standby_private_connection` | `Any` |  |
| `state` | `str` | The state of the Kafka topic. |
| `status` | `str` | A string representing the current status of the database cluster. |
| `storage_size_mib` | `int` | Additional storage added to the cluster, in MiB. |
| `subject_name` | `str` | The name of the schema subject. |
| `tags` | `list` | A flat array of tag names as strings applied to the read-only replica.<br><br>Requires `tag:read` scope. |
| `ui_connection` | `Any` | The connection details for OpenSearch dashboard. |
| `user` | `str` | The name of the user for use with the connection pool. |
| `users` | `list` |  |
| `version` | `str` | The version of the schema. |
| `version_end_of_availability` | `str` | A timestamp referring to the date when the particular version will no longer be available for creating new clusters. |
| `version_end_of_life` | `str` | A timestamp referring to the date when the particular version will no longer be supported. |

#### Example: Load

```python
database = client.Database().load({"id": "database_id"})
```

#### Example: List

```python
databases = client.Database().list()
```

#### Example: Create

```python
database = client.Database().create({
    "backup_restore": {},  # dict
    "compatibility_level": "example_compatibility_level",  # str
    "db": "example_db",  # str
    "engine": "example_engine",  # str
    "mode": "example_mode",  # str
    "mysql_settings": {},  # dict
    "name": "example_name",  # str
    "num_nodes": 1,  # int
    "schema": "example_schema",  # str
    "schema_id": 1,  # int
    "schema_type": "example_schema_type",  # str
    "size": 1,  # int
    "subject_name": "example_subject_name",  # str
    "version": "example_version",  # str
})
```


### DedicatedInference

Create an instance: `dedicated_inference = client.DedicatedInference()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `access_tokens` | `dict` | Key-value pairs for provider tokens (e.g. |
| `created_at` | `str` | When the Dedicated Inference was created. |
| `dedicated_inference` | `dict` | A Dedicated Inference instance. |
| `endpoints` | `dict` |  |
| `id` | `str` | Unique ID of the Dedicated Inference. |
| `pending_deployment_spec` | `dict` | Pending deployment when status is provisioning or updating. |
| `region` | `str` | DigitalOcean region where the Dedicated Inference is hosted. |
| `spec` | `dict` | Structured configuration for a Dedicated Inference deployment. |
| `status` | `str` | Current state of the Dedicated Inference. |
| `token` | `dict` | Access token for authenticating to Dedicated Inference endpoints. |
| `updated_at` | `str` | When the Dedicated Inference was last updated. |
| `vpc_uuid` | `str` | VPC UUID of the Dedicated Inference. |

#### Example: Load

```python
dedicated_inference = client.DedicatedInference().load({"id": "dedicated_inference_id"})
```

#### Example: List

```python
dedicated_inferences = client.DedicatedInference().list()
```

#### Example: Create

```python
dedicated_inference = client.DedicatedInference().create({
    "spec": {},  # dict
})
```


### DedicatedInferenceAccelerator

Create an instance: `dedicated_inference_accelerator = client.DedicatedInferenceAccelerator()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `created_at` | `str` |  |
| `id` | `str` | Unique ID of the accelerator. |
| `name` | `str` | Name of the accelerator. |
| `role` | `str` | Role of the accelerator (e.g. |
| `slug` | `str` | DigitalOcean GPU slug. |
| `status` | `str` | Status of the accelerator. |

#### Example: Load

```python
dedicated_inference_accelerator = client.DedicatedInferenceAccelerator().load({"id": "dedicated_inference_accelerator_id", "dedicated_inference_id": "dedicated_inference_id"})
```


### DedicatedInferenceGpuModelConfig

Create an instance: `dedicated_inference_gpu_model_config = client.DedicatedInferenceGpuModelConfig()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `gpu_slugs` | `list` |  |
| `is_gated_model` | `bool` | Whether the model requires gated access (e.g. |
| `model_name` | `str` |  |
| `model_slug` | `str` |  |

#### Example: List

```python
dedicated_inference_gpu_model_configs = client.DedicatedInferenceGpuModelConfig().list()
```


### DedicatedInferenceSize

Create an instance: `dedicated_inference_size = client.DedicatedInferenceSize()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `currency` | `str` |  |
| `gpu_slug` | `str` |  |
| `price_per_hour` | `str` |  |
| `region` | `str` |  |

#### Example: List

```python
dedicated_inference_sizes = client.DedicatedInferenceSize().list()
```


### DockerCredential

Create an instance: `docker_credential = client.DockerCredential()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `registry_digitalocean_com` | `dict` |  |

#### Example: Load

```python
docker_credential = client.DockerCredential().load()
```


### Domain

Create an instance: `domain = client.Domain()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `str` |  |
| `ip_address` | `str` | This optional attribute may contain an IP address. |
| `name` | `str` | The name of the domain itself. |
| `ttl` | `int` | This value is the time to live for the records on this domain, in seconds. |
| `zone_file` | `str` | This attribute contains the complete contents of the zone file for the selected domain. |

#### Example: Load

```python
domain = client.Domain().load({"id": "domain_id"})
```

#### Example: List

```python
domains = client.Domain().list()
```

#### Example: Create

```python
domain = client.Domain().create({
})
```


### DomainRecord

Create an instance: `domain_record = client.DomainRecord()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `patch(data)` | Change part of an existing entity. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `data` | `str` | Variable data depending on record type. |
| `domain_record` | `dict` |  |
| `flags` | `int` | An unsigned integer between 0-255 used for CAA records. |
| `id` | `int` | A unique identifier for each domain record. |
| `name` | `str` | The host name, alias, or service being defined by the record. |
| `port` | `int` | The port for SRV records. |
| `priority` | `int` | The priority for SRV and MX records. |
| `tag` | `str` | The parameter tag for CAA records. |
| `ttl` | `int` | This value is the time to live for the record, in seconds. |
| `type` | `str` | The type of the DNS record. |
| `weight` | `int` | The weight for SRV records. |

#### Example: Load

```python
domain_record = client.DomainRecord().load({"id": 1, "domain_name": "domain_name"})
```

#### Example: List

```python
domain_records = client.DomainRecord().list({"domain_name": "example"})
```

#### Example: Create

```python
domain_record = client.DomainRecord().create({
    "domain_name": "example_domain_name",  # str
    "type": "example_type",  # str
})
```


### Droplet

Create an instance: `droplet = client.Droplet()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `backup_ids` | `list` | An array of backup IDs of any backups that have been taken of the Droplet instance. |
| `created_at` | `str` | A time value given in ISO8601 combined date and time format that represents when the Droplet was created. |
| `disk` | `int` | The size of the Droplet's disk in gigabytes. |
| `disk_info` | `list` | An array of objects containing information about the disks available to the Droplet. |
| `droplet` | `dict` |  |
| `features` | `list` | An array of features enabled on this Droplet. |
| `gpu_info` | `dict` | An object containing information about the GPU capabilities of Droplets created with this size. |
| `id` | `int` | A unique identifier for each Droplet instance. |
| `image` | `Any` |  |
| `kernel` | `dict` | **Note**: All Droplets created after March 2017 use internal kernels by default. |
| `links` | `dict` |  |
| `locked` | `bool` | A boolean value indicating whether the Droplet has been locked, preventing actions by users. |
| `memory` | `int` | Memory of the Droplet in megabytes. |
| `meta` | `Any` |  |
| `name` | `str` | The human-readable name set for the Droplet instance. |
| `networks` | `dict` | The details of the network that are configured for the Droplet instance. |
| `next_backup_window` | `Any` |  |
| `policies` | `dict` | A map where the keys are the Droplet IDs and the values are objects containing the backup policy information for each Droplet. |
| `possible_days` | `list` | The day of the week the backup will occur. |
| `possible_window_starts` | `list` | An array of integers representing the hours of the day that a backup can start. |
| `region` | `dict` |  |
| `retention_period_days` | `int` | The number of days that a backup will be kept. |
| `size` | `dict` |  |
| `size_slug` | `str` | The unique slug identifier for the size of this Droplet. |
| `snapshot_ids` | `list` | An array of snapshot IDs of any snapshots created from the Droplet instance.<br>Requires `image:read` scope. |
| `status` | `str` | A status string indicating the state of the Droplet instance. |
| `subnet_uuid` | `str` | A string specifying the UUID of the VPC subnet to which the Droplet is assigned.<br>Requires `vpc:read` scope. |
| `tags` | `list` | An array of Tags the Droplet has been tagged with.<br>Requires `tag:read` scope. |
| `vcpus` | `int` | The number of virtual CPUs. |
| `volume_ids` | `list` | A flat array including the unique identifier for each Block Storage volume attached to the Droplet.<br>Requires `block_storage:read` scope. |
| `vpc_uuid` | `str` | A string specifying the UUID of the VPC to which the Droplet is assigned.<br>Requires `vpc:read` scope. |
| `window_length_hours` | `int` | The number of hours that a backup window is open. |

#### Example: Load

```python
droplet = client.Droplet().load({"id": 1})
```

#### Example: List

```python
droplets = client.Droplet().list()
```

#### Example: Create

```python
droplet = client.Droplet().create({
    "backup_ids": [],  # list
    "created_at": "example_created_at",  # str
    "disk": 1,  # int
    "features": [],  # list
    "id": 1,  # int
    "image": "example_image",  # Any
    "locked": True,  # bool
    "memory": 1,  # int
    "meta": "example_meta",  # Any
    "name": "example_name",  # str
    "networks": {},  # dict
    "next_backup_window": "example_next_backup_window",  # Any
    "region": {},  # dict
    "size": {},  # dict
    "size_slug": "example_size_slug",  # str
    "snapshot_ids": [],  # list
    "status": "example_status",  # str
    "tags": [],  # list
    "vcpus": 1,  # int
    "volume_ids": [],  # list
})
```


### DropletAction

Create an instance: `droplet_action = client.DropletAction()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `completed_at` | `str` | A time value given in ISO8601 combined date and time format that represents when the action was completed. |
| `id` | `int` | A unique numeric ID that can be used to identify and reference an action. |
| `region` | `dict` |  |
| `region_slug` | `str` | A human-readable string that is used as a unique identifier for each region. |
| `resource_id` | `int` | A unique identifier for the resource that the action is associated with. |
| `resource_type` | `str` | The type of resource that the action is associated with. |
| `started_at` | `str` | A time value given in ISO8601 combined date and time format that represents when the action was initiated. |
| `status` | `str` | The current status of the action. |
| `type` | `str` | This is the type of action that the object represents. |

#### Example: Load

```python
droplet_action = client.DropletAction().load({"id": 1, "droplet_id": 1})
```

#### Example: List

```python
droplet_actions = client.DropletAction().list({"id": 1})
```

#### Example: Create

```python
droplet_action = client.DropletAction().create({
    "region": {},  # dict
})
```


### DropletAutoscalePool

Create an instance: `droplet_autoscale_pool = client.DropletAutoscalePool()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `active_resources_count` | `int` | The number of active Droplets in the autoscale pool. |
| `config` | `dict` | The scaling configuration for an autoscale pool, which is how the pool scales up and down (either by resource utilization or static configuration). |
| `created_at` | `str` | A time value given in ISO8601 combined date and time format that represents when the autoscale pool was created. |
| `current_instance_count` | `int` | The current number of Droplets in the autoscale pool. |
| `current_utilization` | `dict` |  |
| `desired_instance_count` | `int` | The target number of Droplets for the autoscale pool after the scaling event. |
| `droplet_id` | `int` | The unique identifier of the Droplet. |
| `droplet_template` | `dict` |  |
| `health_status` | `str` | The health status of the Droplet. |
| `history_event_id` | `str` | The unique identifier of the history event. |
| `id` | `str` | A unique identifier for each autoscale pool instance. |
| `name` | `str` | The human-readable name set for the autoscale pool. |
| `reason` | `str` | The reason for the scaling event. |
| `status` | `str` | The current status of the autoscale pool. |
| `unhealthy_reason` | `str` | A human-readable description of why the Droplet is unhealthy. |
| `updated_at` | `str` | A time value given in ISO8601 combined date and time format that represents when the autoscale pool was last updated. |

#### Example: Load

```python
droplet_autoscale_pool = client.DropletAutoscalePool().load({"autoscale_pool_id": "autoscale_pool_id"})
```

#### Example: List

```python
droplet_autoscale_pools = client.DropletAutoscalePool().list()
```

#### Example: Create

```python
droplet_autoscale_pool = client.DropletAutoscalePool().create({
    "active_resources_count": 1,  # int
    "config": {},  # dict
    "created_at": "example_created_at",  # str
    "current_instance_count": 1,  # int
    "desired_instance_count": 1,  # int
    "droplet_id": 1,  # int
    "droplet_template": {},  # dict
    "health_status": "example_health_status",  # str
    "history_event_id": "example_history_event_id",  # str
    "id": "example_id",  # str
    "name": "example_name",  # str
    "reason": "example_reason",  # str
    "status": "example_status",  # str
    "updated_at": "example_updated_at",  # str
})
```


### Embedding

Create an instance: `embedding = client.Embedding()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `data` | `list` | One entry for each `input` string, in the same order. |
| `encoding_format` | `str` | How embedding values are returned in each `data[].embedding` field. |
| `input` | `Any` | A single string or 1–2048 strings; each string produces one row in `data`, in order. |
| `model` | `str` | The embedding model that produced the vectors. |
| `object` | `str` | The object type, which is always the string `list`. |
| `usage` | `dict` | Token usage for the embeddings request. |
| `user` | `str` | Optional end-user identifier to help with abuse monitoring. |

#### Example: Create

```python
embedding = client.Embedding().create({
    "data": [],  # list
    "input": "example_input",  # Any
    "model": "example_model",  # str
    "object": "example_object",  # str
    "usage": {},  # dict
})
```


### Empty

Create an instance: `empty = client.Empty()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list()` | List entities, optionally matching the given criteria. |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `actorId` | `str` | Optional actor binding: the user whose connections the session's tool calls use, matched against connection `user_id`. |
| `agentName` | `str` | Name of the agent that started the session. |
| `agentUrn` | `str` | URN of the agent that started the session. |
| `categories` | `list` | Required. |
| `config` | `dict` | Optional session options. |
| `createdAt` | `str` | When the session was created. |
| `insights` | `Any` | Omitted when the request omitted insights or explicitly sent null. |
| `mcpUrl` | `str` | URL of the session's MCP endpoint, for the agent to connect to. |
| `name` | `str` | Required human-readable session name. |
| `network` | `Any` | Product-level session network binding. |
| `overrides` | `list` | Required. |
| `owning_user_id` | `str` | DigitalOcean user ID of the user who created the session, when recorded. |
| `policy` | `Any` | Optional tool-permission policy. |
| `session` | `Any` | The created session. |
| `sessionUrn` | `str` | Session URN, for example `do:managed_agent_session:<uuid>`. |
| `tools` | `list` | Canonical, version-pinned selected tool references. |
| `updatedAt` | `str` | When the session was last modified. |

#### Example: List

```python
emptys = client.Empty().list()
```

#### Example: Create

```python
empty = client.Empty().create({
    "categories": [],  # list
    "name": "example_name",  # str
    "overrides": [],  # list
})
```


### Firewall

Create an instance: `firewall = client.Firewall()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `created_at` | `str` | A time value given in ISO8601 combined date and time format that represents when the firewall was created. |
| `droplet_ids` | `list` | An array containing the IDs of the Droplets assigned to the firewall. |
| `id` | `str` | A unique ID that can be used to identify and reference a firewall. |
| `inbound_rules` | `list` |  |
| `name` | `str` | A human-readable name for a firewall. |
| `outbound_rules` | `list` |  |
| `pending_changes` | `list` | An array of objects each containing the fields "droplet_id", "removing", and "status". |
| `status` | `str` | A status string indicating the current state of the firewall. |
| `tags` | `Any` |  |

#### Example: Load

```python
firewall = client.Firewall().load({"id": "firewall_id"})
```

#### Example: List

```python
firewalls = client.Firewall().list()
```

#### Example: Create

```python
firewall = client.Firewall().create({
})
```


### FloatingIp

Create an instance: `floating_ip = client.FloatingIp()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `droplet` | `Any` | The Droplet that the floating IP has been assigned to. |
| `floating_ip` | `dict` |  |
| `id` | `str` |  |
| `ip` | `str` | The public IP address of the floating IP. |
| `links` | `dict` |  |
| `locked` | `bool` | A boolean value indicating whether or not the floating IP has pending actions preventing new ones from being submitted. |
| `project_id` | `str` | The UUID of the project to which the reserved IP currently belongs.<br><br>Requires `project:read` scope. |
| `region` | `Any` |  |

#### Example: Load

```python
floating_ip = client.FloatingIp().load({"id": "floating_ip_id"})
```

#### Example: List

```python
floating_ips = client.FloatingIp().list()
```

#### Example: Create

```python
floating_ip = client.FloatingIp().create({
})
```


### FloatingIpAction

Create an instance: `floating_ip_action = client.FloatingIpAction()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `action` | `dict` |  |
| `completed_at` | `str` | A time value given in ISO8601 combined date and time format that represents when the action was completed. |
| `id` | `int` | A unique numeric ID that can be used to identify and reference an action. |
| `project_id` | `str` | The UUID of the project to which the reserved IP currently belongs. |
| `region` | `dict` |  |
| `region_slug` | `str` | A human-readable string that is used as a unique identifier for each region. |
| `resource_id` | `int` | A unique identifier for the resource that the action is associated with. |
| `resource_type` | `str` | The type of resource that the action is associated with. |
| `started_at` | `str` | A time value given in ISO8601 combined date and time format that represents when the action was initiated. |
| `status` | `str` | The current status of the action. |
| `type` | `str` | This is the type of action that the object represents. |

#### Example: Load

```python
floating_ip_action = client.FloatingIpAction().load({"id": 1, "floating_ip_id": "floating_ip_id"})
```

#### Example: List

```python
floating_ip_actions = client.FloatingIpAction().list({"id": "example_id"})
```

#### Example: Create

```python
floating_ip_action = client.FloatingIpAction().create({
    "id": "example_id",  # str
    "region": {},  # dict
})
```


### Function

Create an instance: `function = client.Function()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `api_host` | `str` | The namespace's API hostname. |
| `created_at` | `str` | UTC time string. |
| `expires_at` | `str` | When the key expires (null for non-expiring keys). |
| `expires_in` | `str` | The duration after which the access key expires, specified as a human-readable duration string in the format `<int>h` (hours) or `<int>d` (days). |
| `function` | `str` | Name of function(action) that exists in the given namespace. |
| `id` | `str` | The access key's unique identifier with prefix 'dof_v1_'. |
| `is_enabled` | `bool` | Indicates weather the trigger is paused or unpaused. |
| `key` | `str` | A random alpha numeric string. |
| `label` | `str` | The namespace's unique name. |
| `name` | `str` | The trigger's unique name within the namespace. |
| `namespace` | `str` | A unique string format of UUID with a prefix fn-. |
| `region` | `str` | The namespace's datacenter region. |
| `scheduled_details` | `dict` | Trigger details for SCHEDULED type, where body is optional. |
| `scheduled_runs` | `dict` |  |
| `type` | `str` | String which indicates the type of trigger source like SCHEDULED. |
| `updated_at` | `str` | UTC time string. |
| `uuid` | `str` | The namespace's Universally Unique Identifier. |

#### Example: Load

```python
function = client.Function().load({"namespace_id": "namespace_id"})
```

#### Example: List

```python
functions = client.Function().list({"namespace_id": "example"})
```

#### Example: Create

```python
function = client.Function().create({
    "namespace_id": "example_namespace_id",  # str
    "scheduled_details": {},  # dict
})
```


### GenaiapiRegion

Create an instance: `genaiapi_region = client.GenaiapiRegion()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `inference_url` | `str` | Url for inference server |
| `region` | `str` | Region code |
| `serves_batch` | `bool` | This datacenter is capable of running batch jobs |
| `serves_inference` | `bool` | This datacenter is capable of serving inference |
| `stream_inference_url` | `str` | The url for the inference streaming server |

#### Example: List

```python
genaiapi_regions = client.GenaiapiRegion().list()
```


### Image

Create an instance: `image = client.Image()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `created_at` | `str` | A time value given in ISO8601 combined date and time format that represents when the image was created. |
| `description` | `str` | An optional free-form text field to describe an image. |
| `distribution` | `str` | The name of a custom image's distribution. |
| `error_message` | `str` | A string containing information about errors that may occur when importing a custom image. |
| `id` | `int` | A unique number that can be used to identify and reference a specific image. |
| `min_disk_size` | `int` | The minimum disk size in GB required for a Droplet to use this image. |
| `name` | `str` | The display name that has been given to an image. |
| `public` | `bool` | This is a boolean value that indicates whether the image in question is public or not. |
| `region` | `str` | The slug identifier for the region where the resource will initially be available. |
| `regions` | `list` | This attribute is an array of the regions that the image is available in. |
| `size_gigabytes` | `float` | The size of the image in gigabytes. |
| `slug` | `str` | A uniquely identifying string that is associated with each of the DigitalOcean-provided public images. |
| `status` | `str` | A status string indicating the state of a custom image. |
| `tags` | `list` | A flat array of tag names as strings to be applied to the resource. |
| `type` | `str` | Describes the kind of image. |
| `url` | `str` | A URL from which the custom Linux virtual machine image may be retrieved. |

#### Example: Load

```python
image = client.Image().load({"id": "image_id"})
```

#### Example: List

```python
images = client.Image().list()
```

#### Example: Create

```python
image = client.Image().create({
    "region": "example_region",  # str
    "url": "example_url",  # str
})
```


### ImageAction

Create an instance: `image_action = client.ImageAction()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `completed_at` | `str` | A time value given in ISO8601 combined date and time format that represents when the action was completed. |
| `id` | `int` | A unique numeric ID that can be used to identify and reference an action. |
| `region` | `dict` |  |
| `region_slug` | `str` | A human-readable string that is used as a unique identifier for each region. |
| `resource_id` | `int` | A unique identifier for the resource that the action is associated with. |
| `resource_type` | `str` | The type of resource that the action is associated with. |
| `started_at` | `str` | A time value given in ISO8601 combined date and time format that represents when the action was initiated. |
| `status` | `str` | The current status of the action. |
| `type` | `str` | This is the type of action that the object represents. |

#### Example: List

```python
image_actions = client.ImageAction().list({"id": 1})
```


### Insight

Create an instance: `insight = client.Insight()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `channel_type` | `str` | The configured channel type. |
| `created_at` | `str` | Time the alert rule was created. |
| `email` | `dict` | Email notification channel configuration. |
| `id` | `str` | A unique identifier for the alert instance. |
| `last_notified_at` | `str` | Time a notification was last sent for this alert instance. |
| `last_triggered_at` | `str` | Time the alert instance most recently fired. |
| `name` | `str` | A human-readable name for the notification channel. |
| `resolved_at` | `str` | Time the alert instance resolved. |
| `resource_urn` | `str` | URN of the DigitalOcean resource the alert fired for. |
| `rule_id` | `str` | ID of the alert rule that fired this alert instance. |
| `severity` | `str` | Severity of the breached threshold. |
| `slack` | `dict` | Slack notification channel configuration as returned in API responses. |
| `spec` | `dict` | Spec for an Insights alert rule. |
| `status` | `str` | Current status of the alert instance. |
| `triggered_at` | `str` | Time the alert instance first fired. |
| `updated_at` | `str` | Time the alert rule was last updated. |
| `usage` | `Any` |  |
| `value` | `float` | The observed metric value that breached the threshold. |
| `webhook` | `dict` | Generic HTTPS webhook notification channel configuration as returned in API responses. |

#### Example: Load

```python
insight = client.Insight().load({"id": "insight_id"})
```


### InvoiceSummary

Create an instance: `invoice_summary = client.InvoiceSummary()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `amount` | `str` | Total amount of the invoice, in USD. |
| `billing_period` | `str` | Billing period of usage for which the invoice is issued, in `YYYY-MM` format. |
| `credits_and_adjustments` | `Any` |  |
| `id` | `str` |  |
| `invoice_id` | `str` | ID of the invoice |
| `invoice_uuid` | `str` | UUID of the invoice |
| `overages` | `Any` |  |
| `product_charges` | `Any` |  |
| `taxes` | `Any` |  |
| `user_billing_address` | `Any` |  |
| `user_company` | `str` | Company of the DigitalOcean customer being invoiced, if set. |
| `user_email` | `str` | Email of the DigitalOcean customer being invoiced. |
| `user_name` | `str` | Name of the DigitalOcean customer being invoiced. |

#### Example: Load

```python
invoice_summary = client.InvoiceSummary().load({"id": "invoice_summary_id"})
```


### Kubernete

Create an instance: `kubernete = client.Kubernete()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `amd_gpu_device_metrics_exporter_plugin` | `dict` | An object specifying whether the AMD Device Metrics Exporter should be enabled in the Kubernetes cluster. |
| `amd_gpu_device_plugin` | `dict` | An object specifying whether the AMD GPU Device Plugin should be enabled in the Kubernetes cluster. |
| `amd_gpu_dra_driver` | `dict` | An object specifying whether the AMD GPU DRA Driver should be enabled in the Kubernetes cluster. |
| `auto_scale` | `bool` | A boolean value indicating whether auto-scaling is enabled for this node pool. |
| `auto_upgrade` | `bool` | A boolean value indicating whether the cluster will be automatically upgraded to new patch releases during its maintenance window. |
| `cluster_autoscaler_configuration` | `dict` | An object specifying custom cluster autoscaler configuration. |
| `cluster_subnet` | `str` | The range of IP addresses for the overlay network of the Kubernetes cluster in CIDR notation. |
| `control_plane_firewall` | `dict` | An object specifying the control plane firewall for the Kubernetes cluster. |
| `coredns_autoscaler` | `dict` | An object specifying whether the Cluster Proportional Autoscaler (CPA) add-on for CoreDNS should be enabled for the Kubernetes cluster. |
| `count` | `int` | The number of Droplet instances in the node pool. |
| `created_at` | `str` | A time value given in ISO8601 combined date and time format that represents when the Kubernetes cluster was created. |
| `endpoint` | `str` | The base URL of the API server on the Kubernetes master node. |
| `gpu_partition_mode` | `str` | The AMD GPU partition mode for this node pool. |
| `ha` | `bool` | A boolean value indicating whether the control plane is run in a highly available configuration in the cluster. |
| `id` | `str` | A unique ID that can be used to identify and reference a specific node pool. |
| `ipv4` | `str` | The public IPv4 address of the Kubernetes master node. |
| `isolated_workers` | `bool` | A boolean value indicating whether worker nodes in the cluster are not assigned public IP addresses. |
| `kubernetes_version` | `str` | The upstream version string for the version of Kubernetes provided by a given slug. |
| `labels` | `dict` | An object of key/value mappings specifying labels to apply to all nodes in a pool. |
| `maintenance_policy` | `dict` | An object specifying the maintenance window policy for the Kubernetes cluster. |
| `max_nodes` | `int` | The maximum number of nodes that this node pool can be auto-scaled to. |
| `message` | `str` | Status information about the cluster which impacts it's lifecycle. |
| `min_nodes` | `int` | The minimum number of nodes that this node pool can be auto-scaled to. |
| `name` | `str` | A human-readable name for the node pool. |
| `nfs_csi_plugin` | `dict` | An object specifying whether the NFS CSI plugin should be enabled for the Kubernetes cluster. |
| `node_pools` | `list` | An object specifying the details of the worker nodes available to the Kubernetes cluster. |
| `nodes` | `list` | An object specifying the details of a specific worker node in a node pool. |
| `nvidia_gpu_device_plugin` | `dict` | An object specifying whether the Nvidia GPU Device Plugin should be enabled in the Kubernetes cluster. |
| `nvidia_gpu_dra_driver` | `dict` | An object specifying whether the NVIDIA GPU DRA Driver should be enabled in the Kubernetes cluster. |
| `p2p_oci_registry_plugin` | `dict` | An object specifying whether the Peer-to-peer OCI registry component should be enabled for the Kubernetes cluster. |
| `rdma_shared_dev_plugin` | `dict` | An object specifying whether the RDMA shared device plugin should be enabled in the Kubernetes cluster. |
| `region` | `str` | The slug identifier for the region where the Kubernetes cluster is located. |
| `registries` | `list` | An array of integrated DOCR registries. |
| `registry_enabled` | `bool` | A read-only boolean value indicating if a container registry is integrated with the cluster. |
| `routing_agent` | `dict` | An object specifying whether the routing-agent component should be enabled for the Kubernetes cluster. |
| `service_subnet` | `str` | The range of assignable IP addresses for services running in the Kubernetes cluster in CIDR notation. |
| `size` | `str` | The slug identifier for the type of Droplet used as workers in the node pool. |
| `slug` | `str` | The slug identifier for an available version of Kubernetes for use when creating or updating a cluster. |
| `sso` | `dict` | An object specifying Single Sign-On (SSO) configuration for the Kubernetes cluster. |
| `status` | `dict` | An object containing a `state` attribute whose value is set to a string indicating the current status of the cluster. |
| `supported_features` | `list` | The features available with the version of Kubernetes provided by a given slug. |
| `surge_upgrade` | `bool` | A boolean value indicating whether surge upgrade is enabled/disabled for the cluster. |
| `tags` | `list` | An array containing the tags applied to the node pool. |
| `taints` | `list` | An array of taints to apply to all nodes in a pool. |
| `timestamp` | `str` | A timestamp in ISO8601 format that represents when the status message was emitted. |
| `updated_at` | `str` | A time value given in ISO8601 combined date and time format that represents when the Kubernetes cluster was last updated. |
| `version` | `str` | The slug identifier for the version of Kubernetes used for the cluster. |
| `vpc_uuid` | `str` | A string specifying the UUID of the VPC to which the Kubernetes cluster is assigned.<br><br>Requires `vpc:read` scope. |
| `worker_subnet_uuid` | `str` | The UUID of the VPC subnet worker nodes are attached to. |

#### Example: Load

```python
kubernete = client.Kubernete().load({"cluster_id": "cluster_id"})
```

#### Example: List

```python
kubernetes = client.Kubernete().list({"cluster_id": "example"})
```

#### Example: Create

```python
kubernete = client.Kubernete().create({
    "cluster_id": "example_cluster_id",  # str
    "count": 1,  # int
    "name": "example_name",  # str
    "node_pools": [],  # list
    "region": "example_region",  # str
    "size": "example_size",  # str
    "version": "example_version",  # str
})
```


### KubernetesOption

Create an instance: `kubernetes_option = client.KubernetesOption()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `regions` | `list` |  |
| `sizes` | `list` |  |
| `versions` | `list` |  |

#### Example: Load

```python
kubernetes_option = client.KubernetesOption().load()
```


### ListMcpServerTool

Create an instance: `list_mcp_server_tool = client.ListMcpServerTool()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `description` | `str` | Tool description as the server reports it. |
| `enabled` | `bool` | Whether the tool is enabled in your team's catalog. |
| `enabledToolSlugs` | `list` | The complete set of tool slugs (`<server_ref>_<name>`) to enable; every other tool of the server is disabled. |
| `name` | `str` | Tool name as the server reports it, normalized to the catalog's naming rules. |
| `quarantineReason` | `str` | Why the tool was quarantined; empty otherwise. |
| `quarantined` | `bool` | True when the enabled tool was suspended because it disappeared from the server or its input schema changed incompatibly. |
| `toolSlug` | `str` | `<server_ref>_<name>`: the tool's catalog slug, and the value to list in `enabledToolSlugs`. |
| `tools` | `list` | Tools sorted by name. |
| `user_id` | `str` | Required for a server registered with `credentialRefSource` connection when a tool needs verification against the live server, which can only be reached as a user who has authorized it. |

#### Example: List

```python
list_mcp_server_tools = client.ListMcpServerTool().list({"server_ref": "example"})
```


### ListProvider

Create an instance: `list_provider = client.ListProvider()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `auth_type` | `str` | Deprecated: read `auth_types`, since a provider may accept more than one credential kind. |
| `auth_types` | `list` | Credential kinds the provider accepts, sorted: none|oauth|`shared_api_key`|unknown|`user_oauth_app`|`user_token`. |
| `connection_parameters` | `list` | Non-sensitive values collected when creating a connection. |
| `credential_parameters` | `list` | Non-secret values collected when registering an API key provider credential. |
| `description` | `str` | Provider description. |
| `display_name` | `str` | Human-readable provider name. |
| `name` | `str` | Provider slug, used as provider when creating a connection or a provider credential. |
| `oauth_client_setup_url` | `str` | HTTPS page at the provider where a team creates that OAuth client, such as its developer console or setup guide. |
| `oauth_redirect_url` | `str` | Callback URL a team must register with the provider when it creates its own OAuth client. |
| `scopes` | `list` | The OAuth scopes a connection may request; a connection that requests none gets all of them. |

#### Example: List

```python
list_providers = client.ListProvider().list()
```


### ListProviderHealth

Create an instance: `list_provider_health = client.ListProviderHealth()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `health` | `Any` | Metrics over the window. |
| `provider` | `str` | Provider ID. |

#### Example: List

```python
list_provider_healths = client.ListProviderHealth().list()
```


### ListTool

Create an instance: `list_tool = client.ListTool()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `definitions` | `list` | definitions[i] describes tools[i]. |
| `pagination` | `Any` | page and `per_page` echo the values applied; total is the number of tools matching `toolkitId` across all pages. |
| `tools` | `list` | Tools on this page, grouped by provider and sorted by name within a provider. |
| `version` | `str` | Catalog version identifier, for example `v1`. |

#### Example: List

```python
list_tools = client.ListTool().list()
```


### ListToolHealth

Create an instance: `list_tool_health = client.ListToolHealth()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `health` | `Any` | Metrics over the window. |
| `provider` | `str` | ID of the provider that offers the tool. |
| `tool_slug` | `str` | Catalog tool slug. |

#### Example: List

```python
list_tool_healths = client.ListToolHealth().list()
```


### ListToolbeltProvider

Create an instance: `list_toolbelt_provider = client.ListToolbeltProvider()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `categories` | `list` | The distinct tool categories among this toolbelt's members for the provider (sorted). |
| `created_at` | `str` | When the provider was added to the catalog. |
| `description` | `str` | Provider description. |
| `id` | `str` | Equals provider; present so the entry has the same shape as a toolkit. |
| `name` | `str` | The provider's display name. |
| `provider` | `str` | The provider ID. |
| `tool_count` | `int` | How many toolbelt members belong to this provider. |

#### Example: List

```python
list_toolbelt_providers = client.ListToolbeltProvider().list({"name": "example"})
```


### ListToolkit

Create an instance: `list_toolkit = client.ListToolkit()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `categories` | `list` | Distinct categories of the provider's released tools, sorted. |
| `created_at` | `str` | When the provider was added. |
| `description` | `str` | Provider description. |
| `id` | `str` | Provider ID. |
| `name` | `str` | Human-readable provider name. |
| `provider_kind` | `str` | Classifies the provider, for example `managed_api` or `byo_mcp` (one of your team's MCP servers). |

#### Example: List

```python
list_toolkits = client.ListToolkit().list()
```


### LoadBalancer

Create an instance: `load_balancer = client.LoadBalancer()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `algorithm` | `str` | This field has been deprecated. |
| `created_at` | `str` | A time value given in ISO8601 combined date and time format that represents when the load balancer was created. |
| `disable_lets_encrypt_dns_records` | `bool` | A boolean value indicating whether to disable automatic DNS record creation for Let's Encrypt certificates that are added to the load balancer. |
| `domains` | `list` | An array of objects specifying the domain configurations for a Global load balancer. |
| `droplet_ids` | `list` | An array containing the IDs of the Droplets assigned to the load balancer. |
| `enable_backend_keepalive` | `bool` | A boolean value indicating whether HTTP keepalive connections are maintained to target Droplets. |
| `enable_proxy_protocol` | `bool` | A boolean value indicating whether PROXY Protocol is in use. |
| `firewall` | `dict` | An object specifying allow and deny rules to control traffic to the load balancer. |
| `forwarding_rules` | `list` | An array of objects specifying the forwarding rules for a load balancer. |
| `glb_settings` | `dict` | An object specifying forwarding configurations for a Global load balancer. |
| `health_check` | `dict` | An object specifying health check settings for the load balancer. |
| `http_idle_timeout_seconds` | `int` | An integer value which configures the idle timeout for HTTP requests to the target droplets. |
| `id` | `str` | A unique ID that can be used to identify and reference a load balancer. |
| `ip` | `str` | An attribute containing the public-facing IP address of the load balancer. |
| `ipv6` | `str` | An attribute containing the public-facing IPv6 address of the load balancer. |
| `name` | `str` | A human-readable name for a load balancer instance. |
| `network` | `str` | A string indicating whether the load balancer should be external or internal. |
| `network_stack` | `str` | A string indicating whether the load balancer will support IPv4 or both IPv4 and IPv6 networking. |
| `project_id` | `str` | The ID of the project that the load balancer is associated with. |
| `redirect_http_to_https` | `bool` | A boolean value indicating whether HTTP requests to the load balancer on port 80 will be redirected to HTTPS on port 443. |
| `region` | `dict` |  |
| `size` | `str` | This field has been replaced by the `size_unit` field for all regions except in AMS2, NYC2, and SFO1. |
| `size_unit` | `int` | How many nodes the load balancer contains. |
| `status` | `str` | A status string indicating the current state of the load balancer. |
| `sticky_sessions` | `dict` | An object specifying sticky sessions settings for the load balancer. |
| `subnet_uuid` | `str` | A string specifying the UUID of the VPC subnet to which the load balancer is assigned. |
| `tag` | `str` | The name of a Droplet tag corresponding to Droplets assigned to the load balancer. |
| `target_load_balancer_ids` | `list` | An array containing the UUIDs of the Regional load balancers to be used as target backends for a Global load balancer. |
| `tls_cipher_policy` | `str` | A string indicating the policy for the TLS cipher suites used by the load balancer. |
| `type` | `str` | A string indicating whether the load balancer should be a standard regional HTTP load balancer, a regional network load balancer that routes traffic at the TCP/UDP transport layer, or a global load balancer. |
| `vpc_uuid` | `str` | A string specifying the UUID of the VPC to which the load balancer is assigned. |

#### Example: Load

```python
load_balancer = client.LoadBalancer().load({"id": "load_balancer_id"})
```

#### Example: List

```python
load_balancers = client.LoadBalancer().list()
```

#### Example: Create

```python
load_balancer = client.LoadBalancer().create({
    "forwarding_rules": [],  # list
})
```


### LogsSearch

Create an instance: `logs_search = client.LogsSearch()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `data` | `list` | Matching log records. |
| `filter` | `dict` | A boolean filter tree for logs queries. |
| `order_by` | `list` | Sort clauses applied to the result set. |
| `pagination` | `dict` | Pagination response. |
| `time_range` | `dict` | An inclusive query time window. |

#### Example: Create

```python
logs_search = client.LogsSearch().create({
    "query_id": "example_query_id",  # str
    "time_range": {},  # dict
})
```


### Logsink

Create an instance: `logsink = client.Logsink()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `config` | `Any` |  |
| `id` | `str` |  |
| `sink_id` | `str` | A unique identifier for Logsink |
| `sink_name` | `str` | The name of the Logsink |
| `sink_type` | `str` |  |

#### Example: Load

```python
logsink = client.Logsink().load({"id": "logsink_id", "database_id": "database_id"})
```


### McpServer

Create an instance: `mcp_server = client.McpServer()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `api_key` | `str` | For `credentialRefSource` secret: the key or token itself. |
| `createdAt` | `str` | When the server was registered, in RFC 3339 format. |
| `credentialRef` | `str` | The secret reference supplied at registration when source=secret, or the team's OAuth credential ID when source=connection. |
| `credentialRefSource` | `str` | How requests to the server authenticate: none, secret (a key or token sent in the Authorization header), or connection (each user's own OAuth authorization). |
| `description` | `str` | Team-authored description, shown on the server's catalog card. |
| `endpoint` | `str` | HTTPS URL of the server's MCP endpoint. |
| `id` | `str` |  |
| `lastSyncedAt` | `str` | When discovery last succeeded, in RFC 3339 format; empty until the first success. |
| `oauth_authorization_ttl_seconds` | `str` | How long a user's authorization is reused before re-consent. |
| `oauth_authorize_url` | `str` | OAuth authorization endpoint. |
| `oauth_client_id` | `str` | Required for `credentialRefSource` connection: the client ID of your team's OAuth client for the server. |
| `oauth_client_secret` | `str` | Required for `credentialRefSource` connection. |
| `oauth_scopes` | `list` | OAuth scopes requested from each user. |
| `oauth_token_url` | `str` | Required for `credentialRefSource` connection: the OAuth token endpoint, under the same rules as `oauth_authorize_url`. |
| `protocolVersion` | `str` | MCP protocol revision negotiated with the server. |
| `serverRef` | `str` | Server identifier, unique within your team. |
| `syncError` | `str` | Why the latest discovery failed; empty after a successful one. |
| `syncStatus` | `str` | Outcome of the latest discovery: pending (no discovery has finished yet), ok, failed, or `unsupported_protocol`. |
| `toolCount` | `int` | Number of tools discovered on the server, whether enabled or not. |
| `transport` | `str` | Always `streamable_http`. |
| `updatedAt` | `str` | When the server was last modified, in RFC 3339 format. |

#### Example: Load

```python
mcp_server = client.McpServer().load({"id": "mcp_server_id"})
```

#### Example: List

```python
mcp_servers = client.McpServer().list()
```

#### Example: Create

```python
mcp_server = client.McpServer().create({
})
```


### Message

Create an instance: `message = client.Message()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `content` | `list` | Assistant output blocks (`text` and/or `tool_use`). |
| `id` | `str` | Unique identifier for this message object. |
| `max_tokens` | `int` | Maximum tokens to generate before stopping. |
| `messages` | `list` | Conversation turns. |
| `metadata` | `dict` | Optional request metadata. |
| `model` | `str` | Model that produced the message. |
| `reasoning_effort` | `str` | DigitalOcean extension for reasoning-capable models. |
| `role` | `str` | Always `assistant` for this response. |
| `speed` | `str` | DigitalOcean extension for preferred inference speed. |
| `stop_reason` | `str` | Why generation stopped. |
| `stop_sequence` | `str` | When `stop_reason` is `stop_sequence`, the sequence that matched. |
| `stop_sequences` | `list` | Custom strings that stop generation when produced. |
| `stream` | `bool` | When true, the response is streamed using server-sent events (SSE). |
| `system` | `Any` | System prompt as plain text or as an array of text blocks. |
| `temperature` | `float` | Sampling temperature between 0.0 and 1.0. |
| `thinking` | `dict` | Extended thinking configuration. |
| `tool_choice` | `Any` | Controls how the model uses tools: automatic selection, require any tool, force a specific tool, or a string form accepted by the service. |
| `tools` | `list` | Tool definitions the model may invoke. |
| `top_k` | `int` | Top-K sampling cutoff. |
| `top_p` | `float` | Nucleus sampling; use either `temperature` or `top_p`, not both. |
| `type` | `str` | Object type discriminator. |
| `usage` | `dict` | Token usage for a non-streaming `POST /v1/messages` response. |

#### Example: Create

```python
message = client.Message().create({
    "content": [],  # list
    "id": "example_id",  # str
    "max_tokens": 1,  # int
    "messages": [],  # list
    "model": "example_model",  # str
    "role": "example_role",  # str
    "stop_reason": "example_stop_reason",  # str
    "thinking": {},  # dict
    "type": "example_type",  # str
    "usage": {},  # dict
})
```


### Metric

Create an instance: `metric = client.Metric()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `result` | `list` | Result of query. |
| `resultType` | `str` |  |

#### Example: Load

```python
metric = client.Metric().load({"end": "end", "start": "start"})
```


### Model

Create an instance: `model = client.Model()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `created` | `int` | The Unix timestamp (in seconds) when the model was created. |
| `id` | `str` | The model identifier, which can be referenced in the API endpoints. |
| `object` | `str` | The object type, which is always "model". |
| `owned_by` | `str` | The organization that owns the model. |

#### Example: List

```python
models = client.Model().list()
```


### Monitoring

Create an instance: `monitoring = client.Monitoring()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `alerts` | `dict` |  |
| `compare` | `str` |  |
| `config` | `dict` | OpenSearch destination configuration with `credentials` omitted. |
| `description` | `str` |  |
| `destination` | `dict` |  |
| `enabled` | `bool` |  |
| `entities` | `list` |  |
| `id` | `str` | A unique identifier for a destination. |
| `name` | `str` | destination name |
| `resources` | `list` | List of resources identified by their URNs. |
| `tags` | `list` |  |
| `type` | `str` | The destination type. |
| `uuid` | `str` |  |
| `value` | `float` |  |
| `window` | `str` |  |

#### Example: Load

```python
monitoring = client.Monitoring().load({"alert_uuid": "alert_uuid"})
```

#### Example: List

```python
monitorings = client.Monitoring().list()
```

#### Example: Create

```python
monitoring = client.Monitoring().create({
    "destination_uuid": "example_destination_uuid",  # str
    "alerts": {},  # dict
    "compare": "example_compare",  # str
    "description": "example_description",  # str
    "destination": {},  # dict
    "enabled": True,  # bool
    "entities": [],  # list
    "tags": [],  # list
    "type": "example_type",  # str
    "uuid": "example_uuid",  # str
    "value": 1,  # float
    "window": "example_window",  # str
})
```


### N1Click

Create an instance: `n1_click = client.N1Click()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `slug` | `str` | The slug identifier for the 1-Click application. |
| `type` | `str` | The type of the 1-Click application. |

#### Example: List

```python
n1_clicks = client.N1Click().list()
```


### N1ClickApplication

Create an instance: `n1_click_application = client.N1ClickApplication()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `addon_slugs` | `list` | An array of 1-Click Application slugs to be installed to the Kubernetes cluster. |
| `cluster_uuid` | `str` | A unique ID for the Kubernetes cluster to which the 1-Click Applications will be installed. |
| `message` | `str` | A message about the result of the request. |

#### Example: Create

```python
n1_click_application = client.N1ClickApplication().create({
    "addon_slugs": [],  # list
    "cluster_uuid": "example_cluster_uuid",  # str
})
```


### NeighborId

Create an instance: `neighbor_id = client.NeighborId()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `neighbor_ids` | `list` | An array of arrays. |

#### Example: List

```python
neighbor_ids = client.NeighborId().list()
```


### Nfs

Create an instance: `nfs = client.Nfs()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `access_points` | `list` | Access points configured on this share. |
| `created_at` | `str` | Timestamp for when the NFS share was created. |
| `host` | `str` | The host IP of the NFS server that will be accessible from the associated VPC |
| `id` | `str` | The unique identifier of the NFS share. |
| `mount_path` | `str` | Path at which the share will be available, to be mounted at a target of the user's choice within the client |
| `name` | `str` | The human-readable name of the share. |
| `performance_tier` | `str` | The performance tier of the share. |
| `region` | `str` | The DigitalOcean region slug (e.g., nyc2, atl1) where the NFS share resides. |
| `size_gib` | `int` | The desired/provisioned size of the share in GiB (Gibibytes). |
| `status` | `str` | The current status of the share. |
| `vpc_ids` | `list` | List of VPC IDs that should be able to access the share. |

#### Example: Load

```python
nfs = client.Nfs().load({"id": "nfs_id"})
```

#### Example: List

```python
nfss = client.Nfs().list()
```

#### Example: Create

```python
nfs = client.Nfs().create({
    "created_at": "example_created_at",  # str
    "id": "example_id",  # str
    "name": "example_name",  # str
    "region": "example_region",  # str
    "size_gib": 1,  # int
    "status": "example_status",  # str
})
```


### NfsAction2

Create an instance: `nfs_action_2 = client.NfsAction2()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `str` |  |

#### Example: Create

```python
nfs_action_2 = client.NfsAction2().create({
    "id": "example_id",  # str
})
```


### NfsSnapshot

Create an instance: `nfs_snapshot = client.NfsSnapshot()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `created_at` | `str` | The timestamp when the snapshot was created. |
| `id` | `str` | The unique identifier of the snapshot. |
| `name` | `str` | The human-readable name of the snapshot. |
| `region` | `str` | The DigitalOcean region slug where the snapshot is located. |
| `share_id` | `str` | The unique identifier of the share from which this snapshot was created. |
| `size_gib` | `int` | The size of the snapshot in GiB. |
| `status` | `str` | The current status of the snapshot. |

#### Example: Load

```python
nfs_snapshot = client.NfsSnapshot().load({"id": "nfs_snapshot_id"})
```

#### Example: List

```python
nfs_snapshots = client.NfsSnapshot().list()
```


### OnlineMigration

Create an instance: `online_migration = client.OnlineMigration()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `created_at` | `str` | The time the migration was initiated, in ISO 8601 format. |
| `disable_ssl` | `bool` | Enables SSL encryption when connecting to the source database. |
| `id` | `str` | The ID of the most recent migration. |
| `ignore_dbs` | `list` | List of databases that should be ignored during migration. |
| `source` | `dict` |  |
| `status` | `str` | The current status of the migration. |

#### Example: Load

```python
online_migration = client.OnlineMigration().load({"database_id": "database_id"})
```


### Option

Create an instance: `option = client.Option()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `options` | `dict` |  |
| `version_availability` | `dict` |  |

#### Example: Load

```python
option = client.Option().load()
```


### Organization

Create an instance: `organization = client.Organization()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list()` | List entities, optionally matching the given criteria. |

#### Example: List

```python
organizations = client.Organization().list()
```

#### Example: Create

```python
organization = client.Organization().create({
})
```


### OutputView

Create an instance: `output_view = client.OutputView()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `audit` | `dict` | Null on a preview, which stores nothing. |
| `description` | `str` | View description. |
| `fields` | `list` | The dotted output paths a projection keeps; arrays are traversed element-wise. |
| `id` | `str` |  |
| `kind` | `str` | `OUTPUT_VIEW_KIND_PROJECTION` or `OUTPUT_VIEW_KIND_TRANSFORM`. |
| `name` | `str` | View name, unique per tool version among its owner's views. |
| `output_schema` | `dict` | The JSON Schema every result of this view satisfies. |
| `team_id` | `str` | Your team's ID on your team's views, and empty for a view DigitalOcean publishes to every team. |
| `tool` | `str` | The provider-qualified tool slug, for example `exa_search`. |
| `tool_id` | `str` | The opaque identity of the exact tool version the view is bound to; tool and version are its readable coordinates. |
| `version` | `str` | The tool version, for example `v3`. |
| `view_id` | `str` | Output view ID, for example `ov_` followed by 32 hex digits. |

#### Example: Load

```python
output_view = client.OutputView().load({"id": "output_view_id"})
```

#### Example: List

```python
output_views = client.OutputView().list()
```

#### Example: Create

```python
output_view = client.OutputView().create({
})
```


### PartnerNetworkConnect

Create an instance: `partner_network_connect = client.PartnerNetworkConnect()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `bgp` | `dict` | The BGP configuration for the partner attachment. |
| `bgp_auth_key` | `dict` |  |
| `children` | `list` | An array of associated partner attachment UUIDs. |
| `cidr` | `str` | A CIDR block representing a remote route. |
| `connection_bandwidth_in_mbps` | `int` | The bandwidth (in Mbps) of the connection. |
| `created_at` | `str` | A time value given in ISO8601 combined date and time format. |
| `id` | `str` | A unique ID that can be used to identify and reference the partner attachment. |
| `naas_provider` | `str` | The Network as a Service (NaaS) provider for the partner attachment. |
| `name` | `str` | The name of the partner attachment. |
| `parent_uuid` | `str` | Associated partner attachment UUID |
| `region` | `str` | The region where the partner attachment is located. |
| `state` | `str` | The current operational state of the attachment. |
| `vpc_ids` | `list` | An array of VPC network IDs. |

#### Example: Load

```python
partner_network_connect = client.PartnerNetworkConnect().load({"pa_id": "pa_id"})
```

#### Example: List

```python
partner_network_connects = client.PartnerNetworkConnect().list({"pa_id": "example"})
```


### PrepaymentConfig

Create an instance: `prepayment_config = client.PrepaymentConfig()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `config` | `dict` |  |
| `status` | `dict` |  |

#### Example: Load

```python
prepayment_config = client.PrepaymentConfig().load()
```


### PrepaymentStatus

Create an instance: `prepayment_status = client.PrepaymentStatus()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `balance` | `str` | Current prepayment balance. |
| `blocked` | `bool` | Whether the prepayment gate is currently blocking usage. |
| `eligible` | `bool` | Whether the account is eligible for the prepayment gate experience. |
| `is_auto_prepay_enabled` | `bool` | Whether automatic prepayment top-up is enabled. |
| `month_to_date_balance` | `str` | Current account balance including month-to-date usage. |

#### Example: Load

```python
prepayment_status = client.PrepaymentStatus().load()
```


### Project

Create an instance: `project = client.Project()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `patch(data)` | Change part of an existing entity. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `created_at` | `str` | A time value given in ISO8601 combined date and time format that represents when the project was created. |
| `description` | `str` | The description of the project. |
| `environment` | `str` | The environment of the project's resources. |
| `id` | `str` | The unique universal identifier of this project. |
| `is_default` | `bool` | If true, all resources will be added to this project if no project is specified. |
| `name` | `str` | The human-readable name for the project. |
| `owner_id` | `int` | The integer id of the project owner. |
| `owner_uuid` | `str` | The unique universal identifier of the project owner. |
| `purpose` | `str` | The purpose of the project. |
| `updated_at` | `str` | A time value given in ISO8601 combined date and time format that represents when the project was updated. |

#### Example: Load

```python
project = client.Project().load({"id": "project_id"})
```

#### Example: List

```python
projects = client.Project().list()
```

#### Example: Create

```python
project = client.Project().create({
})
```


### ProjectResource

Create an instance: `project_resource = client.ProjectResource()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `assigned_at` | `str` | A time value given in ISO8601 combined date and time format that represents when the project was created. |
| `id` | `str` |  |
| `links` | `dict` | The links object contains the `self` object, which contains the resource relationship. |
| `resources` | `list` | All resources, including the ones added in the request, that are assigned to the project. |
| `status` | `str` | The status of assigning and fetching the resources. |
| `urn` | `str` | The uniform resource name (URN) for the resource in the format do:resource_type:resource_id. |

#### Example: List

```python
project_resources = client.ProjectResource().list({"id": "example"})
```

#### Example: Create

```python
project_resource = client.ProjectResource().create({
    "id": "example_id",  # str
})
```


### PromQuery

Create an instance: `prom_query = client.PromQuery()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `result` | `Any` | Result payload shape depends on `resultType`. |
| `resultType` | `str` |  |

#### Example: Load

```python
prom_query = client.PromQuery().load({"query_id": "query_id", "query": "query"})
```

#### Example: Create

```python
prom_query = client.PromQuery().create({
    "query_id": "example_query_id",  # str
    "result": "example_result",  # Any
    "resultType": "example_resultType",  # str
})
```


### PromQueryRange

Create an instance: `prom_query_range = client.PromQueryRange()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `result` | `list` | One entry per matching series, each carrying the samples evaluated at every step across the requested range. |
| `resultType` | `str` |  |

#### Example: Load

```python
prom_query_range = client.PromQueryRange().load({"query_id": "query_id", "end": "end", "query": "query", "start": "start", "step": "step"})
```

#### Example: Create

```python
prom_query_range = client.PromQueryRange().create({
    "query_id": "example_query_id",  # str
    "result": [],  # list
    "resultType": "example_resultType",  # str
})
```


### PromSeries

Create an instance: `prom_series = client.PromSeries()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `data` | `list` |  |
| `status` | `str` |  |

#### Example: List

```python
prom_seriess = client.PromSeries().list({"query_id": "example", "match": []})
```

#### Example: Create

```python
prom_series = client.PromSeries().create({
    "query_id": "example_query_id",  # str
    "data": [],  # list
    "status": "example_status",  # str
})
```


### PromStringList

Create an instance: `prom_string_list = client.PromStringList()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `data` | `list` |  |
| `status` | `str` |  |

#### Example: List

```python
prom_string_lists = client.PromStringList().list({"query_id": "example"})
```

#### Example: Create

```python
prom_string_list = client.PromStringList().create({
    "query_id": "example_query_id",  # str
    "data": [],  # list
    "status": "example_status",  # str
})
```


### Region

Create an instance: `region = client.Region()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `available` | `bool` | This is a boolean value that represents whether new Droplets can be created in this region. |
| `features` | `list` | This attribute is set to an array which contains features available in this region |
| `name` | `str` | The display name of the region. |
| `sizes` | `list` | This attribute is set to an array which contains the identifying slugs for the sizes available in this region. |
| `slug` | `str` | A human-readable string that is used as a unique identifier for each region. |

#### Example: List

```python
regions = client.Region().list()
```


### ReservedIPv6

Create an instance: `reserved_i_pv6 = client.ReservedIPv6()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `droplet` | `Any` | Requires `droplet:read` scope. |
| `ip` | `str` | The public IP address of the reserved IPv6. |
| `region_slug` | `str` | The region that the reserved IPv6 is reserved to. |
| `reserved_at` | `str` | The date and time when the reserved IPv6 was reserved. |

#### Example: Load

```python
reserved_i_pv6 = client.ReservedIPv6().load({"reserved_ipv6": "reserved_ipv6"})
```

#### Example: List

```python
reserved_i_pv6s = client.ReservedIPv6().list()
```

#### Example: Create

```python
reserved_i_pv6 = client.ReservedIPv6().create({
})
```


### ReservedIPv6Action

Create an instance: `reserved_i_pv6_action = client.ReservedIPv6Action()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `action` | `dict` |  |

#### Example: Create

```python
reserved_i_pv6_action = client.ReservedIPv6Action().create({
    "reserved_ipv6_id": "example_reserved_ipv6_id",  # str
})
```


### ReservedIp

Create an instance: `reserved_ip = client.ReservedIp()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `droplet` | `Any` | The Droplet that the reserved IP has been assigned to. |
| `id` | `str` |  |
| `ip` | `str` | The public IP address of the reserved IP. |
| `links` | `dict` |  |
| `locked` | `bool` | A boolean value indicating whether or not the reserved IP has pending actions preventing new ones from being submitted. |
| `project_id` | `str` | The UUID of the project to which the reserved IP currently belongs.<br><br>Requires `project:read` scope. |
| `region` | `Any` |  |
| `reserved_ip` | `dict` |  |

#### Example: Load

```python
reserved_ip = client.ReservedIp().load({"id": "reserved_ip_id"})
```

#### Example: List

```python
reserved_ips = client.ReservedIp().list()
```

#### Example: Create

```python
reserved_ip = client.ReservedIp().create({
})
```


### ReservedIpAction

Create an instance: `reserved_ip_action = client.ReservedIpAction()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `action` | `dict` |  |
| `completed_at` | `str` | A time value given in ISO8601 combined date and time format that represents when the action was completed. |
| `id` | `int` | A unique numeric ID that can be used to identify and reference an action. |
| `project_id` | `str` | The UUID of the project to which the reserved IP currently belongs. |
| `region` | `dict` |  |
| `region_slug` | `str` | A human-readable string that is used as a unique identifier for each region. |
| `resource_id` | `int` | A unique identifier for the resource that the action is associated with. |
| `resource_type` | `str` | The type of resource that the action is associated with. |
| `started_at` | `str` | A time value given in ISO8601 combined date and time format that represents when the action was initiated. |
| `status` | `str` | The current status of the action. |
| `type` | `str` | This is the type of action that the object represents. |

#### Example: Load

```python
reserved_ip_action = client.ReservedIpAction().load({"id": 1, "reserved_ip_id": "reserved_ip_id"})
```

#### Example: List

```python
reserved_ip_actions = client.ReservedIpAction().list({"id": "example_id"})
```

#### Example: Create

```python
reserved_ip_action = client.ReservedIpAction().create({
    "id": "example_id",  # str
    "region": {},  # dict
})
```


### Resync

Create an instance: `resync = client.Resync()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `authorization` | `Any` | Set when discovery could not run because `user_id` has no authorized connection to this server yet. |
| `mcpServer` | `Any` | The server, including `syncStatus` and `syncError`. |
| `pending` | `bool` | True when discovery is still running (HTTP 202). |
| `tools` | `list` | Every tool discovered on the server when discovery finished in time; empty when pending is true. |
| `user_id` | `str` | Required for a server registered with `credentialRefSource` connection: discovery reaches the server as this user, through their connection, because such a server has no team-wide credential. |

#### Example: Create

```python
resync = client.Resync().create({
    "server_ref": "example_server_ref",  # str
})
```


### Search

Create an instance: `search = client.Search()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `actorId` | `str` | Empty when the session is not bound to an actor. |
| `agentName` | `str` | Name of the agent that started the session. |
| `agentUrn` | `str` | URN of the agent that started the session. |
| `auth_type` | `str` | Deprecated: read `auth_types`, since a provider may accept more than one credential kind. |
| `auth_types` | `list` | Credential kinds the provider accepts, sorted: none|oauth|`shared_api_key`|unknown|`user_oauth_app`|`user_token`. |
| `config` | `dict` | Session options as supplied at creation. |
| `connection_parameters` | `list` | Non-sensitive values collected when creating a connection. |
| `createdAt` | `str` | When the session was created. |
| `credential_parameters` | `list` | Non-secret values collected when registering an API key provider credential. |
| `description` | `str` | Description of the latest version. |
| `display_name` | `str` | Human-readable label of the latest version. |
| `insights` | `Any` | Omitted when no explicit customer Insights choice was stored. |
| `latest_version` | `str` | Latest version number, as a string. |
| `name` | `str` | The required human-readable session name. |
| `network` | `Any` | Omitted when the request omitted network. |
| `oauth_client_setup_url` | `str` | HTTPS page at the provider where a team creates that OAuth client, such as its developer console or setup guide. |
| `oauth_redirect_url` | `str` | Callback URL a team must register with the provider when it creates its own OAuth client. |
| `owning_user_id` | `str` | DigitalOcean user ID of the user who created the session, when recorded. |
| `policy` | `Any` | The session's tool-permission policy. |
| `reference_latest` | `str` | The toolbelt name, which refers to whichever version is latest. |
| `scopes` | `list` | The OAuth scopes a connection may request; a connection that requests none gets all of them. |
| `sessionUrn` | `str` | Session URN, for example `do:managed_agent_session:<uuid>`. |
| `status` | `str` | active, or deprecated once the toolbelt is deleted. |
| `tool_count` | `int` | Number of members in the latest version. |
| `tools` | `dict` | Omitted when the request omitted tools (all tools). |
| `updatedAt` | `str` | When the session was last modified. |
| `updated_at` | `str` | When the latest version was last modified, in RFC 3339 format. |
| `version_count` | `int` | Number of versions recorded under this name, including versions from before the toolbelt was deleted and the name reused. |

#### Example: List

```python
searchs = client.Search().list()
```


### Security

Create an instance: `security = client.Security()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `created_at` | `str` | When scan was created. |
| `findings` | `list` |  |
| `id` | `str` | The unique identifier for the scan. |
| `name` | `str` | The name of the affected resource. |
| `resource` | `str` | The URN of a resource to exclude from future scans. |
| `resources` | `list` | The URNs of resources to suppress for the rule. |
| `rule_uuid` | `str` | The rule UUID to suppress for the listed resources. |
| `status` | `str` | The status of the scan. |
| `tier_coverage` | `dict` | Scan coverage for each available plan tier. |
| `type` | `str` | The type of the affected resource. |
| `urn` | `str` | The URN for the affected resource. |

#### Example: Load

```python
security = client.Security().load({"scan_id": "scan_id"})
```

#### Example: List

```python
securitys = client.Security().list({"finding_id": "example", "scan_id": "example"})
```

#### Example: Create

```python
security = client.Security().create({
})
```


### Setting

Create an instance: `setting = client.Setting()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `plan_downgrades` | `dict` |  |
| `settings` | `dict` |  |
| `tier_coverage` | `dict` |  |

#### Example: Load

```python
setting = client.Setting().load()
```


### Size

Create an instance: `size = client.Size()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `available` | `bool` | This is a boolean value that represents whether new Droplets can be created with this size. |
| `description` | `str` | A string describing the class of Droplets created from this size. |
| `disk` | `int` | The amount of disk space set aside for Droplets of this size. |
| `disk_info` | `list` | An array of objects containing information about the disks available to Droplets created with this size. |
| `gpu_info` | `dict` | An object containing information about the GPU capabilities of Droplets created with this size. |
| `memory` | `int` | The amount of RAM allocated to Droplets created of this size. |
| `price_hourly` | `float` | This describes the price of the Droplet size as measured hourly. |
| `price_monthly` | `float` | This attribute describes the monthly cost of this Droplet size if the Droplet is kept for an entire month. |
| `regions` | `list` | An array containing the region slugs where this size is available for Droplet creates. |
| `slug` | `str` | A human-readable string that is used to uniquely identify each size. |
| `transfer` | `float` | The amount of transfer bandwidth that is available for Droplets created in this size. |
| `vcpus` | `int` | The number of CPUs allocated to Droplets of this size. |

#### Example: List

```python
sizes = client.Size().list()
```


### Snapshot

Create an instance: `snapshot = client.Snapshot()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `created_at` | `str` | A time value given in ISO8601 combined date and time format that represents when the snapshot was created. |
| `id` | `str` | The unique identifier for the snapshot. |
| `min_disk_size` | `int` | The minimum size in GB required for a volume or Droplet to use this snapshot. |
| `name` | `str` | A human-readable name for the snapshot. |
| `regions` | `list` | An array of the regions that the snapshot is available in. |
| `resource_id` | `str` | The unique identifier for the resource that the snapshot originated from. |
| `resource_type` | `str` | The type of resource that the snapshot originated from. |
| `size_gigabytes` | `float` | The billable size of the snapshot in gigabytes. |
| `tags` | `list` | An array of Tags the snapshot has been tagged with.<br><br>Requires `tag:read` scope. |

#### Example: Load

```python
snapshot = client.Snapshot().load({"id": "snapshot_id"})
```

#### Example: List

```python
snapshots = client.Snapshot().list()
```


### SpacesKey

Create an instance: `spaces_key = client.SpacesKey()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `patch(data)` | Change part of an existing entity. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `access_key` | `str` | The Access Key ID used to access a bucket. |
| `created_at` | `str` | The date and time the key was created. |
| `grants` | `list` | The list of permissions for the access key. |
| `id` | `str` |  |
| `keys` | `list` |  |
| `name` | `str` | The access key's name. |

#### Example: Load

```python
spaces_key = client.SpacesKey().load({"id": "spaces_key_id"})
```

#### Example: List

```python
spaces_keys = client.SpacesKey().list()
```

#### Example: Create

```python
spaces_key = client.SpacesKey().create({
})
```


### SqlMode

Create an instance: `sql_mode = client.SqlMode()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `sql_mode` | `str` | A string specifying the configured SQL modes for the MySQL cluster. |

#### Example: Load

```python
sql_mode = client.SqlMode().load({"database_id": "database_id"})
```


### SshKey

Create an instance: `ssh_key = client.SshKey()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `fingerprint` | `str` | A unique identifier that differentiates this key from other keys using a format that SSH recognizes. |
| `id` | `int` | A unique identification number for this key. |
| `name` | `str` | A human-readable display name for this key, used to easily identify the SSH keys when they are displayed. |
| `public_key` | `str` | The entire public key string that was uploaded. |

#### Example: Load

```python
ssh_key = client.SshKey().load({"id": "ssh_key_id"})
```

#### Example: List

```python
ssh_keys = client.SshKey().list()
```

#### Example: Create

```python
ssh_key = client.SshKey().create({
    "name": "example_name",  # str
    "public_key": "example_public_key",  # str
})
```


### Systemone

Create an instance: `systemone = client.Systemone()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `answers` | `dict` | A map of question name to answer, using the same keys as the request's `questions` object. |
| `model` | `str` | Model ID that produced the response. |
| `questions` | `dict` | A map of question name to question definition. |
| `state` | `str` | The state to evaluate. |
| `usage` | `dict` | Token usage for the request. |

#### Example: Create

```python
systemone = client.Systemone().create({
    "answers": {},  # dict
    "model": "example_model",  # str
    "questions": {},  # dict
    "state": "example_state",  # str
    "usage": {},  # dict
})
```


### Tag

Create an instance: `tag = client.Tag()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `str` |  |
| `name` | `str` | The name of the tag. |
| `resources` | `dict` | An embedded object containing key value pairs of resource type and resource statistics. |

#### Example: Load

```python
tag = client.Tag().load({"id": "tag_id"})
```

#### Example: List

```python
tags = client.Tag().list()
```

#### Example: Create

```python
tag = client.Tag().create({
})
```


### Tool

Create an instance: `tool = client.Tool()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `category` | `str` | Best-effort catalog metadata and is empty for a large share of the catalog. |
| `description` | `str` | What the tool does. |
| `history` | `dict` | Present only when the request set `include_history`. |
| `id` | `str` |  |
| `name` | `str` | The unqualified tool name, without the provider prefix. |
| `provider` | `str` | The ID of the provider that offers the tool, broken out so a client never has to split `tool_slug`. |
| `snapshot` | `Any` | When the metrics were computed and the window they cover. |
| `title` | `str` | Human-readable tool title. |
| `tool` | `Any` | The tool's metrics over the window. |
| `tool_slug` | `str` | The provider-qualified, stable tool identifier (`<provider>_<name>`). |
| `version` | `int` | The version this toolbelt version pins for the member, matching the `@<version>` suffix in the corresponding toolbelt.tools entry. |

#### Example: Load

```python
tool = client.Tool().load({"id": "tool_id"})
```

#### Example: List

```python
tools = client.Tool().list({"name": "example", "provider_id": "example"})
```


### Toolbelt

Create an instance: `toolbelt = client.Toolbelt()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `created_at` | `str` | When this version was created, in RFC 3339 format. |
| `description` | `str` | Team-authored description. |
| `display_name` | `str` | Human-readable label. |
| `id` | `str` |  |
| `latest_version` | `str` | Latest version number, as a string. |
| `name` | `str` | Toolbelt name, unique among your team's active toolbelts. |
| `next_page_token` | `str` | Token for the next page of `tool_details`; empty on the last page. |
| `reference` | `str` | `<name>@<version>`, identifying this exact version. |
| `reference_latest` | `str` | The toolbelt name, which refers to whichever version is latest. |
| `status` | `str` | active, or deprecated once the toolbelt is deleted. |
| `tool_count` | `int` | Number of entries in tools. |
| `tool_details` | `list` | The requested page of resolved catalog metadata for the members named in toolbelt.tools. |
| `toolbelt` | `Any` | The requested toolbelt version. |
| `tools` | `list` | Members, sorted, each as `<tool_slug>@<version>`: the tool and the version this toolbelt version pins. |
| `updated_at` | `str` | When this version was last modified, in RFC 3339 format. |
| `version` | `str` | Version number of this toolbelt version, as a string, for example `3`. |
| `version_count` | `int` | Number of versions recorded under this name, including versions from before the toolbelt was deleted and the name reused. |

#### Example: Load

```python
toolbelt = client.Toolbelt().load({"id": "toolbelt_id"})
```

#### Example: List

```python
toolbelts = client.Toolbelt().list()
```

#### Example: Create

```python
toolbelt = client.Toolbelt().create({
})
```


### Uptime

Create an instance: `uptime = client.Uptime()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `comparison` | `str` | The comparison operator used against the alert's threshold. |
| `enabled` | `bool` | A boolean value indicating whether the check is enabled/disabled. |
| `id` | `str` | A unique ID that can be used to identify and reference the alert. |
| `name` | `str` | A human-friendly display name. |
| `notifications` | `dict` | The notification settings for a trigger alert. |
| `period` | `str` | Period of time the threshold must be exceeded to trigger the alert. |
| `previous_outage` | `dict` |  |
| `regions` | `list` | An array containing the selected regions to perform healthchecks from. |
| `target` | `str` | The endpoint to perform healthchecks on. |
| `threshold` | `int` | The threshold at which the alert will enter a trigger state. |
| `type` | `str` | The type of alert. |

#### Example: Load

```python
uptime = client.Uptime().load({"check_id": "check_id"})
```

#### Example: List

```python
uptimes = client.Uptime().list({"check_id": "example"})
```

#### Example: Create

```python
uptime = client.Uptime().create({
    "check_id": "example_check_id",  # str
    "notifications": {},  # dict
})
```


### User

Create an instance: `user = client.User()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `connections` | `list` | The user's connections that are not revoked, sorted by provider. |
| `groups` | `list` | A list of in-cluster groups that the user belongs to. |
| `id` | `str` |  |
| `pagination` | `Any` | Paging applied to this response and the total number of users. |
| `sessions` | `list` | Sessions bound to the user, oldest first. |
| `user_id` | `str` | The user ID: a session `actor_id` or a connection `user_id`. |
| `user_ids` | `list` | User IDs on this page. |
| `username` | `str` | The username for the cluster admin user. |

#### Example: Load

```python
user = client.User().load({"id": "user_id"})
```

#### Example: List

```python
users = client.User().list()
```


### VectorDatabase

Create an instance: `vector_database = client.VectorDatabase()`

#### Operations

| Method | Description |
| --- | --- |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `str` |  |


### VectordbBackup

Create an instance: `vectordb_backup = client.VectordbBackup()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `backup_id` | `str` | Unique identifier for the backup (e.g., "vectordb-{uuid}-20240101-120000"). |
| `completed_at` | `str` | Timestamp when the backup process completed. |
| `started_at` | `str` | Timestamp when the backup process started. |
| `status` | `str` | Status of the backup: SUCCESS. |

#### Example: List

```python
vectordb_backups = client.VectordbBackup().list({"vector_database_id": "example"})
```


### VectordbGetRestoreStatus

Create an instance: `vectordb_get_restore_status = client.VectordbGetRestoreStatus()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `backup_id` | `str` | The backup ID being restored. |
| `error` | `str` | Error message if the restore failed. |
| `status` | `str` | Current status: STARTED, TRANSFERRING, TRANSFERRED, FINALIZING, SUCCESS, FAILED, CANCELLING, CANCELED. |

#### Example: Load

```python
vectordb_get_restore_status = client.VectordbGetRestoreStatus().load({"backup_id": "backup_id", "vector_database_id": "vector_database_id"})
```


### VectordbGetVectorDb

Create an instance: `vectordb_get_vector_db = client.VectordbGetVectorDb()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `config` | `dict` | VectorDBConfig holds optional, advanced cluster settings. |
| `created_at` | `str` |  |
| `endpoints` | `dict` | VectorDBEndpoints contains the connection endpoints for a vector database instance. |
| `forked_from_id` | `str` | ID of the vector database this instance was forked from. |
| `id` | `str` |  |
| `last_restore_id` | `str` | Backup_id of the most recent restore initiated against this instance. |
| `name` | `str` | Required. |
| `owner_uuid` | `str` |  |
| `project_id` | `str` | Project this database belongs to. |
| `region` | `str` | Required. |
| `size` | `str` | Resource tier: small, medium, or large. |
| `status` | `str` | Lifecycle state: pending, creating, active, errored, or deleting. |
| `tags` | `list` | A set of arbitrary tags to organize your vector database |
| `updated_at` | `str` |  |

#### Example: Load

```python
vectordb_get_vector_db = client.VectordbGetVectorDb().load({"id": "vectordb_get_vector_db_id"})
```

#### Example: List

```python
vectordb_get_vector_dbs = client.VectordbGetVectorDb().list()
```

#### Example: Create

```python
vectordb_get_vector_db = client.VectordbGetVectorDb().create({
})
```


### VectordbGetVectorDbAdminCredential

Create an instance: `vectordb_get_vector_db_admin_credential = client.VectordbGetVectorDbAdminCredential()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `api_token` | `str` | API token for that user. |
| `user_id` | `str` | Database user id from the cluster secret (opaque; matches what was provisioned). |

#### Example: Load

```python
vectordb_get_vector_db_admin_credential = client.VectordbGetVectorDbAdminCredential().load({"vector_database_id": "vector_database_id"})
```


### VectordbRestoreBackup

Create an instance: `vectordb_restore_backup = client.VectordbRestoreBackup()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `backup_id` | `str` | The backup ID being restored. |
| `id` | `str` | Required. |
| `status` | `str` | Initial status of the restore operation (e.g., "STARTED"). |

#### Example: Create

```python
vectordb_restore_backup = client.VectordbRestoreBackup().create({
    "backup_id": "example_backup_id",  # str
    "vector_database_id": "example_vector_database_id",  # str
})
```


### VectordbUpdateVectorDb

Create an instance: `vectordb_update_vector_db = client.VectordbUpdateVectorDb()`

#### Operations

| Method | Description |
| --- | --- |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `config` | `dict` | VectorDBConfig holds optional, advanced cluster settings. |
| `created_at` | `str` |  |
| `endpoints` | `dict` | VectorDBEndpoints contains the connection endpoints for a vector database instance. |
| `forked_from_id` | `str` | ID of the vector database this instance was forked from. |
| `id` | `str` | ID of the vector database. |
| `last_restore_id` | `str` | Backup_id of the most recent restore initiated against this instance. |
| `name` | `str` |  |
| `owner_uuid` | `str` |  |
| `project_id` | `str` | Project this database belongs to. |
| `region` | `str` |  |
| `size` | `str` | Resource tier: small, medium, or large. |
| `status` | `str` | Lifecycle state: pending, creating, active, errored, or deleting. |
| `tags` | `list` |  |
| `updated_at` | `str` |  |


### VectordbUpdateVectorDbTag

Create an instance: `vectordb_update_vector_db_tag = client.VectordbUpdateVectorDbTag()`

#### Operations

| Method | Description |
| --- | --- |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `config` | `dict` | VectorDBConfig holds optional, advanced cluster settings. |
| `created_at` | `str` |  |
| `endpoints` | `dict` | VectorDBEndpoints contains the connection endpoints for a vector database instance. |
| `forked_from_id` | `str` | ID of the vector database this instance was forked from. |
| `id` | `str` | Required. |
| `last_restore_id` | `str` | Backup_id of the most recent restore initiated against this instance. |
| `name` | `str` |  |
| `owner_uuid` | `str` |  |
| `project_id` | `str` | Project this database belongs to. |
| `region` | `str` |  |
| `size` | `str` | Resource tier: small, medium, or large. |
| `status` | `str` | Lifecycle state: pending, creating, active, errored, or deleting. |
| `tags` | `list` | Tags to set on the vector database. |
| `updated_at` | `str` |  |


### Vpc

Create an instance: `vpc = client.Vpc()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `patch(data)` | Change part of an existing entity. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `created_at` | `str` | A time value given in ISO8601 combined date and time format. |
| `default` | `bool` | A boolean value indicating whether or not the VPC is the default network for the region. |
| `description` | `str` | A free-form text field for describing the VPC's purpose. |
| `id` | `str` | A unique ID that can be used to identify and reference the VPC. |
| `ip_range` | `str` | The range of IP addresses in the VPC in CIDR notation. |
| `name` | `str` | The name of the VPC. |
| `region` | `str` | The slug identifier for the region where the VPC will be created. |
| `status` | `str` | The current status of the VPC peering. |
| `urn` | `str` | The uniform resource name (URN) for the resource in the format do:resource_type:resource_id. |
| `vpc_ids` | `list` | An array of the two peered VPCs IDs. |

#### Example: Load

```python
vpc = client.Vpc().load({"id": "vpc_id"})
```

#### Example: List

```python
vpcs = client.Vpc().list()
```

#### Example: Create

```python
vpc = client.Vpc().create({
})
```


### VpcNatGateway

Create an instance: `vpc_nat_gateway = client.VpcNatGateway()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `created_at` | `str` | A time value given in ISO8601 combined date and time format that represents when the VPC NAT gateway was created. |
| `egresses` | `dict` | An object containing egress information for the VPC NAT gateway. |
| `icmp_timeout_seconds` | `int` | The ICMP timeout in seconds for the VPC NAT gateway. |
| `id` | `str` | The unique identifier for the VPC NAT gateway. |
| `name` | `str` | The human-readable name of the VPC NAT gateway. |
| `region` | `str` | The region in which the VPC NAT gateway is created. |
| `size` | `int` | The size of the VPC NAT gateway. |
| `state` | `str` | The current state of the VPC NAT gateway. |
| `tcp_timeout_seconds` | `int` | The TCP timeout in seconds for the VPC NAT gateway. |
| `type` | `str` | The type of the VPC NAT gateway. |
| `udp_timeout_seconds` | `int` | The UDP timeout in seconds for the VPC NAT gateway. |
| `updated_at` | `str` | A time value given in ISO8601 combined date and time format that represents when the VPC NAT gateway was last updated. |
| `vpcs` | `list` | An array of VPCs associated with the VPC NAT gateway. |

#### Example: Load

```python
vpc_nat_gateway = client.VpcNatGateway().load({"id": "vpc_nat_gateway_id"})
```

#### Example: List

```python
vpc_nat_gateways = client.VpcNatGateway().list()
```

#### Example: Create

```python
vpc_nat_gateway = client.VpcNatGateway().create({
})
```


### VpcPeering

Create an instance: `vpc_peering = client.VpcPeering()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `created_at` | `str` | A time value given in ISO8601 combined date and time format. |
| `id` | `str` | A unique ID that can be used to identify and reference the VPC peering. |
| `name` | `str` | The name of the VPC peering. |
| `status` | `str` | The current status of the VPC peering. |
| `vpc_ids` | `list` | An array of the two peered VPCs IDs. |

#### Example: Load

```python
vpc_peering = client.VpcPeering().load({"id": "vpc_peering_id"})
```

#### Example: List

```python
vpc_peerings = client.VpcPeering().list()
```

#### Example: Create

```python
vpc_peering = client.VpcPeering().create({
})
```


### VpcRoutesPublicPreview

Create an instance: `vpc_routes__public_preview = client.VpcRoutesPublicPreview()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list()` | List entities, optionally matching the given criteria. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `created_at` | `str` | The time when the route was created. |
| `destination_cidr` | `str` | A valid IPv4 CIDR accepted by the VPC routing product. |
| `id` | `str` | The unique identifier of the route. |
| `modifiable` | `bool` | Whether the caller can update or delete the route. |
| `target_urns` | `list` | The URNs of supported next-hop resources. |
| `type` | `str` | The route type inferred from how the route is sourced. |

#### Example: List

```python
vpc_routes__public_previews = client.VpcRoutesPublicPreview().list({"subnet_id": "example", "vpc_id": "example"})
```

#### Example: Create

```python
vpc_routes__public_preview = client.VpcRoutesPublicPreview().create({
    "subnet_id": "example_subnet_id",  # str
    "vpc_id": "example_vpc_id",  # str
    "destination_cidr": "example_destination_cidr",  # str
    "id": "example_id",  # str
    "target_urns": [],  # list
    "type": "example_type",  # str
})
```


### VpcSubnetsPublicPreview

Create an instance: `vpc_subnets__public_preview = client.VpcSubnetsPublicPreview()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `created_at` | `str` | The time when the VPC subnet was created. |
| `default` | `bool` | Whether this is the default subnet for the VPC. |
| `id` | `str` | The unique identifier of the VPC subnet. |
| `ip_range` | `str` | The IPv4 range assigned to the subnet in CIDR notation. |
| `meta` | `dict` | Additional information about the VPC subnet. |
| `name` | `str` | The human-readable name of the VPC subnet. |
| `region` | `str` | The slug of the region containing the VPC subnet. |
| `type` | `str` | The type of the VPC subnet. |
| `urn` | `str` | The uniform resource name of the VPC subnet. |

#### Example: Load

```python
vpc_subnets__public_preview = client.VpcSubnetsPublicPreview().load({"subnet_uuid": "subnet_uuid", "vpc_id": "vpc_id"})
```

#### Example: List

```python
vpc_subnets__public_previews = client.VpcSubnetsPublicPreview().list({"subnet_uuid": "example", "vpc_id": "example"})
```

#### Example: Create

```python
vpc_subnets__public_preview = client.VpcSubnetsPublicPreview().create({
    "id": "example_id",  # str
    "created_at": "example_created_at",  # str
    "ip_range": "example_ip_range",  # str
    "name": "example_name",  # str
    "region": "example_region",  # str
    "type": "example_type",  # str
    "urn": "example_urn",  # str
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

Features are the extension mechanism. A feature is a Python class
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

The SDK ships with built-in features:

- **TestFeature**: Test transport

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as dicts

The Python SDK uses plain dicts throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `helpers.to_map()` to safely validate that a value is a dict.

### Module structure

```
py/
├── digitalocean_sdk.py         -- Main SDK module
├── config.py                    -- Configuration
├── schema.py                    -- Generated option + entity specs
├── features.py                  -- Feature factory
├── core/                        -- Core types and context
├── entity/                      -- Entity implementations
├── feature/                     -- Built-in features (Base, Test, Log)
├── utility/                     -- Utility functions and struct library
└── test/                        -- Test suites
```

The main module (`digitalocean_sdk`) exports the SDK class.
Import entity or utility modules directly only when needed.

### Entity state

Entity instances are stateful. After a successful `list`, the entity
stores the returned data and match criteria internally.

```python
appsregion = client.AppsRegion()
appsregion.list()

# appsregion.data_get() now returns the appsregion data from the last list
# appsregion.match_get() returns the last match criteria
```

Call `make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

`direct()` gives full control over the HTTP request. Use it for
non-standard endpoints, bulk operations, or any path not modelled as
an entity. `prepare()` builds the request without sending it — useful
for debugging or custom transport.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
