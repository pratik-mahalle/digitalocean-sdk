# Digitalocean Python SDK Reference

Complete API reference for the Digitalocean Python SDK.


## DigitaloceanSDK

### Constructor

```python
from digitalocean_sdk import DigitaloceanSDK

client = DigitaloceanSDK(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `dict` | SDK configuration options. |
| `options["apikey"]` | `str` | API key for authentication. |
| `options["base"]` | `str` | Base URL for API requests. |
| `options["prefix"]` | `str` | URL prefix appended after base. |
| `options["suffix"]` | `str` | URL suffix appended after path. |
| `options["headers"]` | `dict` | Custom headers for all requests. |
| `options["feature"]` | `dict` | Feature configuration. |
| `options["system"]` | `dict` | System overrides (e.g. custom fetch). |


### Static Methods

#### `DigitaloceanSDK.test(testopts=None, sdkopts=None)`

Create a test client with mock features active. Both arguments may be `None`.

```python
client = DigitaloceanSDK.test()
```


### Instance Methods

#### `AccessPoint(data=None)`

Create a new `AccessPointEntity` instance. Pass `None` for no initial data.

#### `Account(data=None)`

Create a new `AccountEntity` instance. Pass `None` for no initial data.

#### `Action(data=None)`

Create a new `ActionEntity` instance. Pass `None` for no initial data.

#### `ActorLimit(data=None)`

Create a new `ActorLimitEntity` instance. Pass `None` for no initial data.

#### `AddOnApp(data=None)`

Create a new `AddOnAppEntity` instance. Pass `None` for no initial data.

#### `AddOnPlan(data=None)`

Create a new `AddOnPlanEntity` instance. Pass `None` for no initial data.

#### `AddOnResource(data=None)`

Create a new `AddOnResourceEntity` instance. Pass `None` for no initial data.

#### `ApiAgentVersion(data=None)`

Create a new `ApiAgentVersionEntity` instance. Pass `None` for no initial data.

#### `ApiCreateAgentApiKeyOutput(data=None)`

Create a new `ApiCreateAgentApiKeyOutputEntity` instance. Pass `None` for no initial data.

#### `ApiCreateDataSourceFileUploadPresignedUrlsOutput(data=None)`

Create a new `ApiCreateDataSourceFileUploadPresignedUrlsOutputEntity` instance. Pass `None` for no initial data.

#### `ApiCreateKnowledgeBaseDataSourceOutput(data=None)`

Create a new `ApiCreateKnowledgeBaseDataSourceOutputEntity` instance. Pass `None` for no initial data.

#### `ApiCreateScenarioSetFromLibraryOutput(data=None)`

Create a new `ApiCreateScenarioSetFromLibraryOutputEntity` instance. Pass `None` for no initial data.

#### `ApiDeleteAgentApiKeyOutput(data=None)`

Create a new `ApiDeleteAgentApiKeyOutputEntity` instance. Pass `None` for no initial data.

#### `ApiDeleteAgentOutput(data=None)`

Create a new `ApiDeleteAgentOutputEntity` instance. Pass `None` for no initial data.

#### `ApiDeleteAnthropicApiKeyOutput(data=None)`

Create a new `ApiDeleteAnthropicApiKeyOutputEntity` instance. Pass `None` for no initial data.

#### `ApiDeleteCustomEvaluationMetricOutput(data=None)`

Create a new `ApiDeleteCustomEvaluationMetricOutputEntity` instance. Pass `None` for no initial data.

#### `ApiDeleteCustomModelOutputPublic(data=None)`

Create a new `ApiDeleteCustomModelOutputPublicEntity` instance. Pass `None` for no initial data.

#### `ApiDeleteEvaluationDatasetOutput(data=None)`

Create a new `ApiDeleteEvaluationDatasetOutputEntity` instance. Pass `None` for no initial data.

#### `ApiDeleteKnowledgeBaseDataSourceOutput(data=None)`

Create a new `ApiDeleteKnowledgeBaseDataSourceOutputEntity` instance. Pass `None` for no initial data.

#### `ApiDeleteKnowledgeBaseOutput(data=None)`

Create a new `ApiDeleteKnowledgeBaseOutputEntity` instance. Pass `None` for no initial data.

#### `ApiDeleteModelApiKeyOutput(data=None)`

Create a new `ApiDeleteModelApiKeyOutputEntity` instance. Pass `None` for no initial data.

#### `ApiDeleteModelEvaluationPresetOutput(data=None)`

Create a new `ApiDeleteModelEvaluationPresetOutputEntity` instance. Pass `None` for no initial data.

#### `ApiDeleteModelEvaluationRunOutputPublic(data=None)`

Create a new `ApiDeleteModelEvaluationRunOutputPublicEntity` instance. Pass `None` for no initial data.

#### `ApiDeleteModelRouterOutput(data=None)`

Create a new `ApiDeleteModelRouterOutputEntity` instance. Pass `None` for no initial data.

#### `ApiDeleteOpenAiapiKeyOutput(data=None)`

Create a new `ApiDeleteOpenAiapiKeyOutputEntity` instance. Pass `None` for no initial data.

#### `ApiDeleteScenarioSetOutput(data=None)`

Create a new `ApiDeleteScenarioSetOutputEntity` instance. Pass `None` for no initial data.

#### `ApiDeleteScheduledIndexingOutput(data=None)`

Create a new `ApiDeleteScheduledIndexingOutputEntity` instance. Pass `None` for no initial data.

#### `ApiDeleteSimulationRunOutput(data=None)`

Create a new `ApiDeleteSimulationRunOutputEntity` instance. Pass `None` for no initial data.

#### `ApiDeleteWorkspaceOutput(data=None)`

Create a new `ApiDeleteWorkspaceOutputEntity` instance. Pass `None` for no initial data.

#### `ApiDropboxOauth2GetTokensOutput(data=None)`

Create a new `ApiDropboxOauth2GetTokensOutputEntity` instance. Pass `None` for no initial data.

#### `ApiGenerateOauth2UrlOutput(data=None)`

Create a new `ApiGenerateOauth2UrlOutputEntity` instance. Pass `None` for no initial data.

#### `ApiGenerateScenarioSetOutput(data=None)`

Create a new `ApiGenerateScenarioSetOutputEntity` instance. Pass `None` for no initial data.

#### `ApiGetAgentOutput(data=None)`

Create a new `ApiGetAgentOutputEntity` instance. Pass `None` for no initial data.

#### `ApiGetAgentUsageOutput(data=None)`

Create a new `ApiGetAgentUsageOutputEntity` instance. Pass `None` for no initial data.

#### `ApiGetAnthropicApiKeyOutput(data=None)`

Create a new `ApiGetAnthropicApiKeyOutputEntity` instance. Pass `None` for no initial data.

#### `ApiGetChildrenOutput(data=None)`

Create a new `ApiGetChildrenOutputEntity` instance. Pass `None` for no initial data.

#### `ApiGetCustomModelOutputPublic(data=None)`

Create a new `ApiGetCustomModelOutputPublicEntity` instance. Pass `None` for no initial data.

#### `ApiGetEvaluationDatasetDownloadUrlOutput(data=None)`

Create a new `ApiGetEvaluationDatasetDownloadUrlOutputEntity` instance. Pass `None` for no initial data.

#### `ApiGetEvaluationRunOutput(data=None)`

Create a new `ApiGetEvaluationRunOutputEntity` instance. Pass `None` for no initial data.

#### `ApiGetEvaluationRunResultsOutput(data=None)`

Create a new `ApiGetEvaluationRunResultsOutputEntity` instance. Pass `None` for no initial data.

#### `ApiGetEvaluationTestCaseOutput(data=None)`

Create a new `ApiGetEvaluationTestCaseOutputEntity` instance. Pass `None` for no initial data.

#### `ApiGetIndexingJobDetailsSignedUrlOutput(data=None)`

Create a new `ApiGetIndexingJobDetailsSignedUrlOutputEntity` instance. Pass `None` for no initial data.

#### `ApiGetKnowledgeBaseIndexingJobOutput(data=None)`

Create a new `ApiGetKnowledgeBaseIndexingJobOutputEntity` instance. Pass `None` for no initial data.

#### `ApiGetKnowledgeBaseOutput(data=None)`

Create a new `ApiGetKnowledgeBaseOutputEntity` instance. Pass `None` for no initial data.

#### `ApiGetModelEvaluationRunOutput(data=None)`

Create a new `ApiGetModelEvaluationRunOutputEntity` instance. Pass `None` for no initial data.

#### `ApiGetModelEvaluationRunResultsDownloadUrlOutput(data=None)`

Create a new `ApiGetModelEvaluationRunResultsDownloadUrlOutputEntity` instance. Pass `None` for no initial data.

#### `ApiGetModelRouterOutput(data=None)`

Create a new `ApiGetModelRouterOutputEntity` instance. Pass `None` for no initial data.

#### `ApiGetOpenAiapiKeyOutput(data=None)`

Create a new `ApiGetOpenAiapiKeyOutputEntity` instance. Pass `None` for no initial data.

#### `ApiGetScenarioSetDownloadUrlOutput(data=None)`

Create a new `ApiGetScenarioSetDownloadUrlOutputEntity` instance. Pass `None` for no initial data.

#### `ApiGetScenarioSetOutput(data=None)`

Create a new `ApiGetScenarioSetOutputEntity` instance. Pass `None` for no initial data.

#### `ApiGetScheduledIndexingOutput(data=None)`

Create a new `ApiGetScheduledIndexingOutputEntity` instance. Pass `None` for no initial data.

#### `ApiGetSimulationJourneyTrajectoryUrlOutput(data=None)`

Create a new `ApiGetSimulationJourneyTrajectoryUrlOutputEntity` instance. Pass `None` for no initial data.

#### `ApiGetSimulationRunOutput(data=None)`

Create a new `ApiGetSimulationRunOutputEntity` instance. Pass `None` for no initial data.

#### `ApiGetWorkspaceOutput(data=None)`

Create a new `ApiGetWorkspaceOutputEntity` instance. Pass `None` for no initial data.

#### `ApiImportCustomModelOutputPublic(data=None)`

Create a new `ApiImportCustomModelOutputPublicEntity` instance. Pass `None` for no initial data.

#### `ApiIndexedDataSource(data=None)`

Create a new `ApiIndexedDataSourceEntity` instance. Pass `None` for no initial data.

#### `ApiLinkAgentFunctionOutput(data=None)`

Create a new `ApiLinkAgentFunctionOutputEntity` instance. Pass `None` for no initial data.

#### `ApiLinkAgentGuardrailOutput(data=None)`

Create a new `ApiLinkAgentGuardrailOutputEntity` instance. Pass `None` for no initial data.

#### `ApiLinkAgentOutput(data=None)`

Create a new `ApiLinkAgentOutputEntity` instance. Pass `None` for no initial data.

#### `ApiLinkKnowledgeBaseOutput(data=None)`

Create a new `ApiLinkKnowledgeBaseOutputEntity` instance. Pass `None` for no initial data.

#### `ApiListAgentApiKeysOutput(data=None)`

Create a new `ApiListAgentApiKeysOutputEntity` instance. Pass `None` for no initial data.

#### `ApiListAgentsByAnthropicKeyOutput(data=None)`

Create a new `ApiListAgentsByAnthropicKeyOutputEntity` instance. Pass `None` for no initial data.

#### `ApiListAgentsByOpenAiKeyOutput(data=None)`

Create a new `ApiListAgentsByOpenAiKeyOutputEntity` instance. Pass `None` for no initial data.

#### `ApiListAgentsByWorkspaceOutput(data=None)`

Create a new `ApiListAgentsByWorkspaceOutputEntity` instance. Pass `None` for no initial data.

#### `ApiListEvaluationMetricsOutput(data=None)`

Create a new `ApiListEvaluationMetricsOutputEntity` instance. Pass `None` for no initial data.

#### `ApiListEvaluationRunsByTestCaseOutput(data=None)`

Create a new `ApiListEvaluationRunsByTestCaseOutputEntity` instance. Pass `None` for no initial data.

#### `ApiListEvaluationTestCasesByWorkspaceOutput(data=None)`

Create a new `ApiListEvaluationTestCasesByWorkspaceOutputEntity` instance. Pass `None` for no initial data.

#### `ApiListKnowledgeBaseDataSourcesOutput(data=None)`

Create a new `ApiListKnowledgeBaseDataSourcesOutputEntity` instance. Pass `None` for no initial data.

#### `ApiListKnowledgeBaseIndexingJobsOutput(data=None)`

Create a new `ApiListKnowledgeBaseIndexingJobsOutputEntity` instance. Pass `None` for no initial data.

#### `ApiListModelEvaluationMetricsOutput(data=None)`

Create a new `ApiListModelEvaluationMetricsOutputEntity` instance. Pass `None` for no initial data.

#### `ApiListScenarioLibraryOutput(data=None)`

Create a new `ApiListScenarioLibraryOutputEntity` instance. Pass `None` for no initial data.

#### `ApiListScenariosOutput(data=None)`

Create a new `ApiListScenariosOutputEntity` instance. Pass `None` for no initial data.

#### `ApiListSimulationJourneysOutput(data=None)`

Create a new `ApiListSimulationJourneysOutputEntity` instance. Pass `None` for no initial data.

#### `ApiModelCatalogCard(data=None)`

Create a new `ApiModelCatalogCardEntity` instance. Pass `None` for no initial data.

#### `ApiModelEvaluationPreset(data=None)`

Create a new `ApiModelEvaluationPresetEntity` instance. Pass `None` for no initial data.

#### `ApiModelPublic(data=None)`

Create a new `ApiModelPublicEntity` instance. Pass `None` for no initial data.

#### `ApiModelRouterPreset(data=None)`

Create a new `ApiModelRouterPresetEntity` instance. Pass `None` for no initial data.

#### `ApiModelRouterTaskPreset(data=None)`

Create a new `ApiModelRouterTaskPresetEntity` instance. Pass `None` for no initial data.

#### `ApiMoveAgentsToWorkspaceOutput(data=None)`

Create a new `ApiMoveAgentsToWorkspaceOutputEntity` instance. Pass `None` for no initial data.

#### `ApiPrompt(data=None)`

Create a new `ApiPromptEntity` instance. Pass `None` for no initial data.

#### `ApiRollbackToAgentVersionOutput(data=None)`

Create a new `ApiRollbackToAgentVersionOutputEntity` instance. Pass `None` for no initial data.

#### `ApiSimulationJourney(data=None)`

Create a new `ApiSimulationJourneyEntity` instance. Pass `None` for no initial data.

#### `ApiSimulationTrajectory(data=None)`

Create a new `ApiSimulationTrajectoryEntity` instance. Pass `None` for no initial data.

#### `ApiUnlinkAgentFunctionOutput(data=None)`

Create a new `ApiUnlinkAgentFunctionOutputEntity` instance. Pass `None` for no initial data.

#### `ApiUnlinkAgentGuardrailOutput(data=None)`

Create a new `ApiUnlinkAgentGuardrailOutputEntity` instance. Pass `None` for no initial data.

#### `ApiUnlinkAgentOutput(data=None)`

Create a new `ApiUnlinkAgentOutputEntity` instance. Pass `None` for no initial data.

#### `ApiUnlinkKnowledgeBaseOutput(data=None)`

Create a new `ApiUnlinkKnowledgeBaseOutputEntity` instance. Pass `None` for no initial data.

#### `ApiUpdateAgentApiKeyOutput(data=None)`

Create a new `ApiUpdateAgentApiKeyOutputEntity` instance. Pass `None` for no initial data.

#### `ApiUpdateAgentFunctionOutput(data=None)`

Create a new `ApiUpdateAgentFunctionOutputEntity` instance. Pass `None` for no initial data.

#### `ApiUpdateAgentOutput(data=None)`

Create a new `ApiUpdateAgentOutputEntity` instance. Pass `None` for no initial data.

#### `ApiUpdateAnthropicApiKeyOutput(data=None)`

Create a new `ApiUpdateAnthropicApiKeyOutputEntity` instance. Pass `None` for no initial data.

#### `ApiUpdateCustomEvaluationMetricOutput(data=None)`

Create a new `ApiUpdateCustomEvaluationMetricOutputEntity` instance. Pass `None` for no initial data.

#### `ApiUpdateEvaluationTestCaseOutput(data=None)`

Create a new `ApiUpdateEvaluationTestCaseOutputEntity` instance. Pass `None` for no initial data.

#### `ApiUpdateKnowledgeBaseDataSourceOutput(data=None)`

Create a new `ApiUpdateKnowledgeBaseDataSourceOutputEntity` instance. Pass `None` for no initial data.

#### `ApiUpdateKnowledgeBaseOutput(data=None)`

Create a new `ApiUpdateKnowledgeBaseOutputEntity` instance. Pass `None` for no initial data.

#### `ApiUpdateLinkedAgentOutput(data=None)`

Create a new `ApiUpdateLinkedAgentOutputEntity` instance. Pass `None` for no initial data.

#### `ApiUpdateModelApiKeyOutput(data=None)`

Create a new `ApiUpdateModelApiKeyOutputEntity` instance. Pass `None` for no initial data.

#### `ApiUpdateModelEvaluationRunOutput(data=None)`

Create a new `ApiUpdateModelEvaluationRunOutputEntity` instance. Pass `None` for no initial data.

#### `ApiUpdateModelRouterOutput(data=None)`

Create a new `ApiUpdateModelRouterOutputEntity` instance. Pass `None` for no initial data.

#### `ApiUpdateOpenAiapiKeyOutput(data=None)`

Create a new `ApiUpdateOpenAiapiKeyOutputEntity` instance. Pass `None` for no initial data.

#### `ApiUpdateScenarioSetOutput(data=None)`

Create a new `ApiUpdateScenarioSetOutputEntity` instance. Pass `None` for no initial data.

#### `ApiUpdateSimulationRunOutput(data=None)`

Create a new `ApiUpdateSimulationRunOutputEntity` instance. Pass `None` for no initial data.

#### `ApiUpdateWorkspaceOutput(data=None)`

Create a new `ApiUpdateWorkspaceOutputEntity` instance. Pass `None` for no initial data.

#### `App(data=None)`

Create a new `AppEntity` instance. Pass `None` for no initial data.

#### `AppAlert(data=None)`

Create a new `AppAlertEntity` instance. Pass `None` for no initial data.

#### `AppEvent(data=None)`

Create a new `AppEventEntity` instance. Pass `None` for no initial data.

#### `AppHealth(data=None)`

Create a new `AppHealthEntity` instance. Pass `None` for no initial data.

#### `AppInstance(data=None)`

Create a new `AppInstanceEntity` instance. Pass `None` for no initial data.

#### `AppJobInvocation(data=None)`

Create a new `AppJobInvocationEntity` instance. Pass `None` for no initial data.

#### `AppMetricsBandwidthUsage(data=None)`

Create a new `AppMetricsBandwidthUsageEntity` instance. Pass `None` for no initial data.

#### `AppPropose(data=None)`

Create a new `AppProposeEntity` instance. Pass `None` for no initial data.

#### `AppsDeployment(data=None)`

Create a new `AppsDeploymentEntity` instance. Pass `None` for no initial data.

#### `AppsGetExec(data=None)`

Create a new `AppsGetExecEntity` instance. Pass `None` for no initial data.

#### `AppsGetLog(data=None)`

Create a new `AppsGetLogEntity` instance. Pass `None` for no initial data.

#### `AppsInstanceSize(data=None)`

Create a new `AppsInstanceSizeEntity` instance. Pass `None` for no initial data.

#### `AppsRegion(data=None)`

Create a new `AppsRegionEntity` instance. Pass `None` for no initial data.

#### `AssociatedKubernetesResource(data=None)`

Create a new `AssociatedKubernetesResourceEntity` instance. Pass `None` for no initial data.

#### `AssociatedResourceStatus(data=None)`

Create a new `AssociatedResourceStatusEntity` instance. Pass `None` for no initial data.

#### `AsyncInvoke(data=None)`

Create a new `AsyncInvokeEntity` instance. Pass `None` for no initial data.

#### `Balance(data=None)`

Create a new `BalanceEntity` instance. Pass `None` for no initial data.

#### `Batch(data=None)`

Create a new `BatchEntity` instance. Pass `None` for no initial data.

#### `BatchFileCreate(data=None)`

Create a new `BatchFileCreateEntity` instance. Pass `None` for no initial data.

#### `BatchInference(data=None)`

Create a new `BatchInferenceEntity` instance. Pass `None` for no initial data.

#### `BatchResult(data=None)`

Create a new `BatchResultEntity` instance. Pass `None` for no initial data.

#### `Billing(data=None)`

Create a new `BillingEntity` instance. Pass `None` for no initial data.

#### `BlockStorage(data=None)`

Create a new `BlockStorageEntity` instance. Pass `None` for no initial data.

#### `BlockStorageAction(data=None)`

Create a new `BlockStorageActionEntity` instance. Pass `None` for no initial data.

#### `ByoipPrefix(data=None)`

Create a new `ByoipPrefixEntity` instance. Pass `None` for no initial data.

#### `CdnEndpoint(data=None)`

Create a new `CdnEndpointEntity` instance. Pass `None` for no initial data.

#### `Certificate(data=None)`

Create a new `CertificateEntity` instance. Pass `None` for no initial data.

#### `ChatCompletion(data=None)`

Create a new `ChatCompletionEntity` instance. Pass `None` for no initial data.

#### `Clusterlint(data=None)`

Create a new `ClusterlintEntity` instance. Pass `None` for no initial data.

#### `Connection(data=None)`

Create a new `ConnectionEntity` instance. Pass `None` for no initial data.

#### `ConnectionPool(data=None)`

Create a new `ConnectionPoolEntity` instance. Pass `None` for no initial data.

#### `ContainerRegistry(data=None)`

Create a new `ContainerRegistryEntity` instance. Pass `None` for no initial data.

#### `CreateResponse(data=None)`

Create a new `CreateResponseEntity` instance. Pass `None` for no initial data.

#### `Credential(data=None)`

Create a new `CredentialEntity` instance. Pass `None` for no initial data.

#### `Database(data=None)`

Create a new `DatabaseEntity` instance. Pass `None` for no initial data.

#### `DedicatedInference(data=None)`

Create a new `DedicatedInferenceEntity` instance. Pass `None` for no initial data.

#### `DedicatedInferenceAccelerator(data=None)`

Create a new `DedicatedInferenceAcceleratorEntity` instance. Pass `None` for no initial data.

#### `DedicatedInferenceGpuModelConfig(data=None)`

Create a new `DedicatedInferenceGpuModelConfigEntity` instance. Pass `None` for no initial data.

#### `DedicatedInferenceSize(data=None)`

Create a new `DedicatedInferenceSizeEntity` instance. Pass `None` for no initial data.

#### `DockerCredential(data=None)`

Create a new `DockerCredentialEntity` instance. Pass `None` for no initial data.

#### `Domain(data=None)`

Create a new `DomainEntity` instance. Pass `None` for no initial data.

#### `DomainRecord(data=None)`

Create a new `DomainRecordEntity` instance. Pass `None` for no initial data.

#### `Droplet(data=None)`

Create a new `DropletEntity` instance. Pass `None` for no initial data.

#### `DropletAction(data=None)`

Create a new `DropletActionEntity` instance. Pass `None` for no initial data.

#### `DropletAutoscalePool(data=None)`

Create a new `DropletAutoscalePoolEntity` instance. Pass `None` for no initial data.

#### `Embedding(data=None)`

Create a new `EmbeddingEntity` instance. Pass `None` for no initial data.

#### `Empty(data=None)`

Create a new `EmptyEntity` instance. Pass `None` for no initial data.

#### `Firewall(data=None)`

Create a new `FirewallEntity` instance. Pass `None` for no initial data.

#### `FloatingIp(data=None)`

Create a new `FloatingIpEntity` instance. Pass `None` for no initial data.

#### `FloatingIpAction(data=None)`

Create a new `FloatingIpActionEntity` instance. Pass `None` for no initial data.

#### `FunctionKey(data=None)`

Create a new `FunctionKeyEntity` instance. Pass `None` for no initial data.

#### `FunctionNamespace(data=None)`

Create a new `FunctionNamespaceEntity` instance. Pass `None` for no initial data.

#### `FunctionTrigger(data=None)`

Create a new `FunctionTriggerEntity` instance. Pass `None` for no initial data.

#### `GenaiapiRegion(data=None)`

Create a new `GenaiapiRegionEntity` instance. Pass `None` for no initial data.

#### `Image(data=None)`

Create a new `ImageEntity` instance. Pass `None` for no initial data.

#### `ImageAction(data=None)`

Create a new `ImageActionEntity` instance. Pass `None` for no initial data.

#### `Insight(data=None)`

Create a new `InsightEntity` instance. Pass `None` for no initial data.

#### `InvoiceSummary(data=None)`

Create a new `InvoiceSummaryEntity` instance. Pass `None` for no initial data.

#### `Kubernete(data=None)`

Create a new `KuberneteEntity` instance. Pass `None` for no initial data.

#### `KubernetesOption(data=None)`

Create a new `KubernetesOptionEntity` instance. Pass `None` for no initial data.

#### `ListMcpServerTool(data=None)`

Create a new `ListMcpServerToolEntity` instance. Pass `None` for no initial data.

#### `ListProvider(data=None)`

Create a new `ListProviderEntity` instance. Pass `None` for no initial data.

#### `ListProviderHealth(data=None)`

Create a new `ListProviderHealthEntity` instance. Pass `None` for no initial data.

#### `ListTool(data=None)`

Create a new `ListToolEntity` instance. Pass `None` for no initial data.

#### `ListToolHealth(data=None)`

Create a new `ListToolHealthEntity` instance. Pass `None` for no initial data.

#### `ListToolbeltProvider(data=None)`

Create a new `ListToolbeltProviderEntity` instance. Pass `None` for no initial data.

#### `ListToolkit(data=None)`

Create a new `ListToolkitEntity` instance. Pass `None` for no initial data.

#### `LoadBalancer(data=None)`

Create a new `LoadBalancerEntity` instance. Pass `None` for no initial data.

#### `LogsSearch(data=None)`

Create a new `LogsSearchEntity` instance. Pass `None` for no initial data.

#### `Logsink(data=None)`

Create a new `LogsinkEntity` instance. Pass `None` for no initial data.

#### `McpServer(data=None)`

Create a new `McpServerEntity` instance. Pass `None` for no initial data.

#### `Message(data=None)`

Create a new `MessageEntity` instance. Pass `None` for no initial data.

#### `Metric(data=None)`

Create a new `MetricEntity` instance. Pass `None` for no initial data.

#### `Model(data=None)`

Create a new `ModelEntity` instance. Pass `None` for no initial data.

#### `MonitoringAlert(data=None)`

Create a new `MonitoringAlertEntity` instance. Pass `None` for no initial data.

#### `MonitoringSink(data=None)`

Create a new `MonitoringSinkEntity` instance. Pass `None` for no initial data.

#### `MonitoringSinkDestination(data=None)`

Create a new `MonitoringSinkDestinationEntity` instance. Pass `None` for no initial data.

#### `N1Click(data=None)`

Create a new `N1ClickEntity` instance. Pass `None` for no initial data.

#### `N1ClickApplication(data=None)`

Create a new `N1ClickApplicationEntity` instance. Pass `None` for no initial data.

#### `NeighborId(data=None)`

Create a new `NeighborIdEntity` instance. Pass `None` for no initial data.

#### `Nfs(data=None)`

Create a new `NfsEntity` instance. Pass `None` for no initial data.

#### `NfsAction2(data=None)`

Create a new `NfsAction2Entity` instance. Pass `None` for no initial data.

#### `NfsSnapshot(data=None)`

Create a new `NfsSnapshotEntity` instance. Pass `None` for no initial data.

#### `OnlineMigration(data=None)`

Create a new `OnlineMigrationEntity` instance. Pass `None` for no initial data.

#### `Option(data=None)`

Create a new `OptionEntity` instance. Pass `None` for no initial data.

#### `Organization(data=None)`

Create a new `OrganizationEntity` instance. Pass `None` for no initial data.

#### `OutputView(data=None)`

Create a new `OutputViewEntity` instance. Pass `None` for no initial data.

#### `PartnerNetworkConnect(data=None)`

Create a new `PartnerNetworkConnectEntity` instance. Pass `None` for no initial data.

#### `PrepaymentConfig(data=None)`

Create a new `PrepaymentConfigEntity` instance. Pass `None` for no initial data.

#### `PrepaymentStatus(data=None)`

Create a new `PrepaymentStatusEntity` instance. Pass `None` for no initial data.

#### `Project(data=None)`

Create a new `ProjectEntity` instance. Pass `None` for no initial data.

#### `ProjectResource(data=None)`

Create a new `ProjectResourceEntity` instance. Pass `None` for no initial data.

#### `PromQuery(data=None)`

Create a new `PromQueryEntity` instance. Pass `None` for no initial data.

#### `PromQueryRange(data=None)`

Create a new `PromQueryRangeEntity` instance. Pass `None` for no initial data.

#### `PromSeries(data=None)`

Create a new `PromSeriesEntity` instance. Pass `None` for no initial data.

#### `PromStringList(data=None)`

Create a new `PromStringListEntity` instance. Pass `None` for no initial data.

#### `Region(data=None)`

Create a new `RegionEntity` instance. Pass `None` for no initial data.

#### `ReservedIPv6(data=None)`

Create a new `ReservedIPv6Entity` instance. Pass `None` for no initial data.

#### `ReservedIPv6Action(data=None)`

Create a new `ReservedIPv6ActionEntity` instance. Pass `None` for no initial data.

#### `ReservedIp(data=None)`

Create a new `ReservedIpEntity` instance. Pass `None` for no initial data.

#### `ReservedIpAction(data=None)`

Create a new `ReservedIpActionEntity` instance. Pass `None` for no initial data.

#### `Resync(data=None)`

Create a new `ResyncEntity` instance. Pass `None` for no initial data.

#### `Search(data=None)`

Create a new `SearchEntity` instance. Pass `None` for no initial data.

#### `SecurityPlan(data=None)`

Create a new `SecurityPlanEntity` instance. Pass `None` for no initial data.

#### `SecurityRule(data=None)`

Create a new `SecurityRuleEntity` instance. Pass `None` for no initial data.

#### `SecurityScan(data=None)`

Create a new `SecurityScanEntity` instance. Pass `None` for no initial data.

#### `SecuritySuppression(data=None)`

Create a new `SecuritySuppressionEntity` instance. Pass `None` for no initial data.

#### `Setting(data=None)`

Create a new `SettingEntity` instance. Pass `None` for no initial data.

#### `Size(data=None)`

Create a new `SizeEntity` instance. Pass `None` for no initial data.

#### `Snapshot(data=None)`

Create a new `SnapshotEntity` instance. Pass `None` for no initial data.

#### `SpacesKey(data=None)`

Create a new `SpacesKeyEntity` instance. Pass `None` for no initial data.

#### `SqlMode(data=None)`

Create a new `SqlModeEntity` instance. Pass `None` for no initial data.

#### `SshKey(data=None)`

Create a new `SshKeyEntity` instance. Pass `None` for no initial data.

#### `Systemone(data=None)`

Create a new `SystemoneEntity` instance. Pass `None` for no initial data.

#### `Tag(data=None)`

Create a new `TagEntity` instance. Pass `None` for no initial data.

#### `Tool(data=None)`

Create a new `ToolEntity` instance. Pass `None` for no initial data.

#### `Toolbelt(data=None)`

Create a new `ToolbeltEntity` instance. Pass `None` for no initial data.

#### `Uptime(data=None)`

Create a new `UptimeEntity` instance. Pass `None` for no initial data.

#### `User(data=None)`

Create a new `UserEntity` instance. Pass `None` for no initial data.

#### `VectorDatabase(data=None)`

Create a new `VectorDatabaseEntity` instance. Pass `None` for no initial data.

#### `VectordbBackup(data=None)`

Create a new `VectordbBackupEntity` instance. Pass `None` for no initial data.

#### `VectordbGetRestoreStatus(data=None)`

Create a new `VectordbGetRestoreStatusEntity` instance. Pass `None` for no initial data.

#### `VectordbGetVectorDb(data=None)`

Create a new `VectordbGetVectorDbEntity` instance. Pass `None` for no initial data.

#### `VectordbGetVectorDbAdminCredential(data=None)`

Create a new `VectordbGetVectorDbAdminCredentialEntity` instance. Pass `None` for no initial data.

#### `VectordbRestoreBackup(data=None)`

Create a new `VectordbRestoreBackupEntity` instance. Pass `None` for no initial data.

#### `VectordbUpdateVectorDb(data=None)`

Create a new `VectordbUpdateVectorDbEntity` instance. Pass `None` for no initial data.

#### `VectordbUpdateVectorDbTag(data=None)`

Create a new `VectordbUpdateVectorDbTagEntity` instance. Pass `None` for no initial data.

#### `Vpc(data=None)`

Create a new `VpcEntity` instance. Pass `None` for no initial data.

#### `VpcNatGateway(data=None)`

Create a new `VpcNatGatewayEntity` instance. Pass `None` for no initial data.

#### `VpcPeering(data=None)`

Create a new `VpcPeeringEntity` instance. Pass `None` for no initial data.

#### `VpcRoutesPublicPreview(data=None)`

Create a new `VpcRoutesPublicPreviewEntity` instance. Pass `None` for no initial data.

#### `VpcSubnetsPublicPreview(data=None)`

Create a new `VpcSubnetsPublicPreviewEntity` instance. Pass `None` for no initial data.

#### `options_map() -> dict`

Return a deep copy of the current SDK options.

#### `get_utility() -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs=None) -> dict`

Make a direct HTTP request to any API endpoint. Returns a result `dict` with `ok`, `status`, `headers`, and `data` (or `err` on failure). This escape hatch never raises — branch on `result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `str` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `str` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `dict` | Path parameter values. |
| `fetchargs["query"]` | `dict` | Query string parameters. |
| `fetchargs["headers"]` | `dict` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (dicts are JSON-serialized). |

**Returns:** `result_dict`

#### `prepare(fetchargs=None) -> dict`

Prepare a fetch definition without sending. Returns the `fetchdef` and raises on error.


---

## AccessPointEntity

```python
access_point = client.AccessPoint()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `access_policy` | `dict` | Yes | Provider-agnostic NFS access policy for an access point. |
| `created_at` | `str` | Yes | The timestamp when the access point was created. |
| `id` | `str` | Yes | The unique identifier of the access point. |
| `is_default` | `bool` | Yes | Whether this is the share's default access point. |
| `name` | `str` | Yes | The human-readable name of the access point. |
| `path` | `str` | Yes | The export sub-path for this access point (always starts with `/`). |
| `share_id` | `str` | Yes | The unique identifier of the share this access point belongs to. |
| `status` | `str` | Yes | The current lifecycle status of an access point. |
| `updated_at` | `str` | Yes | The timestamp when the access point was last updated. |
| `vpc_id` | `str` | No | The VPC this access point is pinned to. |

### Field Usage by Operation

| Field | load | list | create | remove |
| --- | --- | --- | --- | --- |
| `access_policy` | - | - | - | - |
| `created_at` | - | - | - | - |
| `id` | - | - | - | - |
| `is_default` | - | - | - | - |
| `name` | - | - | - | - |
| `path` | - | - | - | - |
| `share_id` | - | - | - | - |
| `status` | - | - | - | - |
| `updated_at` | - | - | - | - |
| `vpc_id` | - | - | Yes | - |

### Operations

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.AccessPoint().create({
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

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.AccessPoint().list({"share_id": "example"})
for access_point in results:
    print(access_point)
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.AccessPoint().load({"id": "access_point_id"})
```

#### `remove(reqmatch, ctrl=None) -> dict`

Remove the entity matching the given criteria. Raises on error.

```python
result = client.AccessPoint().remove({"id": "access_point_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `AccessPointEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## AccountEntity

```python
account = client.Account()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `droplet_limit` | `int` | Yes | The total number of Droplets current user or team may have active at one time. |
| `email` | `str` | Yes | The email address used by the current user to register for DigitalOcean. |
| `email_verified` | `bool` | Yes | If true, the user has verified their account via email. |
| `floating_ip_limit` | `int` | Yes | The total number of Floating IPs the current user or team may have. |
| `name` | `str` | No | The display name for the current user. |
| `status` | `str` | Yes | This value is one of "active", "warning" or "locked". |
| `status_message` | `str` | Yes | A human-readable message giving more details about the status of the account. |
| `team` | `dict` | No | When authorized in a team context, includes information about the current team. |
| `uuid` | `str` | Yes | The unique universal identifier for the current user. |

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Account().load()
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `AccountEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ActionEntity

```python
action = client.Action()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `completed_at` | `str` | No | A time value given in ISO8601 combined date and time format that represents when the action was completed. |
| `id` | `int` | No | A unique numeric ID that can be used to identify and reference an action. |
| `region` | `dict` | Yes |  |
| `region_slug` | `str` | No | A human-readable string that is used as a unique identifier for each region. |
| `resource_id` | `int` | No | A unique identifier for the resource that the action is associated with. |
| `resource_type` | `str` | No | The type of resource that the action is associated with. |
| `started_at` | `str` | No | A time value given in ISO8601 combined date and time format that represents when the action was initiated. |
| `status` | `str` | No | The current status of the action. |
| `type` | `str` | No | This is the type of action that the object represents. |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.Action().list()
for action in results:
    print(action)
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Action().load({"id": 1})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ActionEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ActorLimitEntity

```python
actor_limit = client.ActorLimit()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `category` | `str` | Yes | The category the limit applies to. |
| `id` | `str` | No |  |
| `requests_per_minute` | `str` | Yes | Calls allowed per minute. |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.ActorLimit().list({"id": "example"})
for actor_limit in results:
    print(actor_limit)
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ActorLimitEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## AddOnAppEntity

```python
add_on_app = client.AddOnApp()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `app_slug` | `str` | Yes | The slug identifier for the application associated with the resource. |
| `description` | `str` | Yes | A brief description of the metadata item. |
| `display_name` | `str` | Yes | The display name of the metadata item. |
| `eula` | `str` | Yes | The End User License Agreement URL for the resource. |
| `id` | `int` | Yes | Unique identifier for the addon metadata item. |
| `name` | `str` | Yes | The name of the metadata item. |
| `options` | `list` | No |  |
| `plans` | `list` | Yes | A list of plans available for the resource. |
| `tos` | `str` | Yes | The Terms of Service URL for the resource. |
| `type` | `str` | Yes | The data type of the metadata value. |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.AddOnApp().list()
for add_on_app in results:
    print(add_on_app)
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `AddOnAppEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## AddOnPlanEntity

```python
add_on_plan = client.AddOnPlan()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `app_name` | `str` | No | The name of the application associated with the resource. |
| `app_slug` | `str` | Yes | The slug identifier for the application associated with the resource. |
| `has_config` | `bool` | Yes | Indicates if the resource has configuration values set by the vendor. |
| `message` | `str` | No | A message related to the resource, if applicable. |
| `metadata` | `list` | No | Metadata associated with the resource, set by the user. |
| `name` | `str` | Yes | The name of the addon resource. |
| `plan_name` | `str` | No | The name of the plan associated with the resource. |
| `plan_price_per_month` | `int` | No | The price of the plan per month in US dollars. |
| `plan_slug` | `str` | Yes | The slug identifier for the plan associated with the resource. |
| `sso_url` | `str` | No | The Single Sign-On URL for the resource, if applicable. |
| `state` | `str` | Yes | The state the resource is currently in. |
| `uuid` | `str` | Yes | The unique identifier for the addon resource. |

### Operations

#### `update(reqdata, ctrl=None) -> dict`

Update an existing entity. The data must include the entity `id`. Returns the updated entity data and raises on error.

```python
result = client.AddOnPlan().update({
    "resource_uuid": "resource_uuid",
    # Fields to update
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `AddOnPlanEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## AddOnResourceEntity

```python
add_on_resource = client.AddOnResource()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `app_name` | `str` | No | The name of the application associated with the resource. |
| `app_slug` | `str` | Yes | The slug identifier for the application associated with the resource. |
| `fleet_uuid` | `str` | No | UUID of the fleet/project to which this resource will belong. |
| `has_config` | `bool` | Yes | Indicates if the resource has configuration values set by the vendor. |
| `linked_droplet_id` | `int` | No | ID of the droplet to be linked to this resource, if applicable. |
| `message` | `str` | No | A message related to the resource, if applicable. |
| `metadata` | `list` | No | Metadata associated with the resource, set by the user. |
| `name` | `str` | Yes | The name of the addon resource. |
| `plan_name` | `str` | No | The name of the plan associated with the resource. |
| `plan_price_per_month` | `int` | No | The price of the plan per month in US dollars. |
| `plan_slug` | `str` | Yes | The slug identifier for the plan associated with the resource. |
| `sso_url` | `str` | No | The Single Sign-On URL for the resource, if applicable. |
| `state` | `str` | Yes | The state the resource is currently in. |
| `uuid` | `str` | Yes | The unique identifier for the addon resource. |

### Field Usage by Operation

| Field | load | list | create | update | remove |
| --- | --- | --- | --- | --- | --- |
| `app_name` | - | - | - | - | - |
| `app_slug` | - | - | - | - | - |
| `fleet_uuid` | - | - | - | - | - |
| `has_config` | - | - | - | - | - |
| `linked_droplet_id` | - | - | - | - | - |
| `message` | - | - | - | - | - |
| `metadata` | - | - | Yes | - | - |
| `name` | - | - | - | - | - |
| `plan_name` | - | - | - | - | - |
| `plan_price_per_month` | - | - | - | - | - |
| `plan_slug` | - | - | - | - | - |
| `sso_url` | - | - | - | - | - |
| `state` | - | - | - | - | - |
| `uuid` | - | - | - | - | - |

### Operations

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.AddOnResource().create({
    "app_slug": "example_app_slug",  # str
    "has_config": True,  # bool
    "name": "example_name",  # str
    "plan_slug": "example_plan_slug",  # str
    "state": "example_state",  # str
    "uuid": "example_uuid",  # str
})
```

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.AddOnResource().list()
for add_on_resource in results:
    print(add_on_resource)
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.AddOnResource().load({"resource_uuid": "resource_uuid"})
```

#### `remove(reqmatch, ctrl=None) -> dict`

Remove the entity matching the given criteria. Raises on error.

```python
result = client.AddOnResource().remove({"resource_uuid": "resource_uuid"})
```

#### `update(reqdata, ctrl=None) -> dict`

Update an existing entity. The data must include the entity `id`. Returns the updated entity data and raises on error.

```python
result = client.AddOnResource().update({
    "resource_uuid": "resource_uuid",
    # Fields to update
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `AddOnResourceEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ApiAgentVersionEntity

```python
api_agent_version = client.ApiAgentVersion()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `agent_uuid` | `str` | No | Uuid of the agent this version belongs to |
| `attached_child_agents` | `list` | No | List of child agent relationships |
| `attached_functions` | `list` | No | List of function versions |
| `attached_guardrails` | `list` | No | List of guardrail version |
| `attached_knowledgebases` | `list` | No | List of knowledge base agent versions |
| `can_rollback` | `bool` | No | Whether the version is able to be rolled back to |
| `created_at` | `str` | No | Creation date |
| `created_by_email` | `str` | No | User who created this version |
| `currently_applied` | `bool` | No | Whether this is the currently applied configuration |
| `description` | `str` | No | Description of the agent |
| `id` | `str` | No | Unique identifier |
| `instruction` | `str` | No | Instruction for the agent |
| `k` | `int` | No | K value for the agent's configuration |
| `max_tokens` | `int` | No | Max tokens setting for the agent |
| `model_name` | `str` | No | Name of model associated to the agent version |
| `name` | `str` | No | Name of the agent |
| `provide_citations` | `bool` | No | Whether the agent should provide in-response citations |
| `retrieval_method` | `str` | No | - RETRIEVAL_METHOD_UNKNOWN: The retrieval method is unknown - RETRIEVAL_METHOD_REWRITE: The retrieval method is rewrite - RETRIEVAL_METHOD_STEP_BACK: The retrieval method is step back - RETRIEVAL_METHOD_SUB_QUERIES: The retrieval method is… |
| `tags` | `list` | No | Tags associated with the agent |
| `temperature` | `float` | No | Temperature setting for the agent |
| `top_p` | `float` | No | Top_p setting for the agent |
| `trigger_action` | `str` | No | Action triggering the configuration update |
| `version_hash` | `str` | No | Version hash |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.ApiAgentVersion().list({"agent_id": "example"})
for api_agent_version in results:
    print(api_agent_version)
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ApiAgentVersionEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ApiCreateAgentApiKeyOutputEntity

```python
api_create_agent_api_key_output = client.ApiCreateAgentApiKeyOutput()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `agent_uuid` | `str` | No | Agent id |
| `created_at` | `str` | No | Creation date |
| `created_by` | `str` | No | Created by |
| `deleted_at` | `str` | No | Deleted date |
| `name` | `str` | No | Name |
| `secret_key` | `str` | No |  |
| `uuid` | `str` | No | Uuid |

### Operations

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.ApiCreateAgentApiKeyOutput().create({
    "agent_id": "example_agent_id",  # str
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ApiCreateAgentApiKeyOutputEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ApiCreateDataSourceFileUploadPresignedUrlsOutputEntity

```python
api_create_data_source_file_upload_presigned_urls_output = client.ApiCreateDataSourceFileUploadPresignedUrlsOutput()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `files` | `list` | No | A list of files to generate presigned URLs for. |
| `request_id` | `str` | No | The ID generated for the request for Presigned URLs. |
| `uploads` | `list` | No | A list of generated presigned URLs and object keys, one per file. |

### Operations

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.ApiCreateDataSourceFileUploadPresignedUrlsOutput().create({
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ApiCreateDataSourceFileUploadPresignedUrlsOutputEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ApiCreateKnowledgeBaseDataSourceOutputEntity

```python
api_create_knowledge_base_data_source_output = client.ApiCreateKnowledgeBaseDataSourceOutput()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `aws_data_source` | `dict` | No | AWS S3 Data Source for Display |
| `bucket_name` | `str` | No | Name of storage bucket - Deprecated, moved to data_source_details |
| `chunking_algorithm` | `str` | No |  |
| `chunking_options` | `dict` | No |  |
| `created_at` | `str` | No | Creation date / time |
| `dropbox_data_source` | `dict` | No | Dropbox Data Source for Display |
| `file_upload_data_source` | `dict` | No | File to upload as data source for knowledge base. |
| `google_drive_data_source` | `dict` | No | Google Drive Data Source for Display |
| `item_path` | `str` | No | Path of folder or object in bucket - Deprecated, moved to data_source_details |
| `knowledge_base_uuid` | `str` | No | Knowledge base id |
| `last_datasource_indexing_job` | `dict` | No |  |
| `region` | `str` | No | Region code - Deprecated, moved to data_source_details |
| `spaces_data_source` | `dict` | No | Spaces Bucket Data Source |
| `updated_at` | `str` | No | Last modified |
| `uuid` | `str` | No | Unique id of knowledge base |
| `web_crawler_data_source` | `dict` | No | WebCrawlerDataSource |

### Operations

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.ApiCreateKnowledgeBaseDataSourceOutput().create({
    "knowledge_base_id": "example_knowledge_base_id",  # str
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ApiCreateKnowledgeBaseDataSourceOutputEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ApiCreateScenarioSetFromLibraryOutputEntity

```python
api_create_scenario_set_from_library_output = client.ApiCreateScenarioSetFromLibraryOutput()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `bucket_name` | `str` | No | Object storage bucket holding the scenario file. |
| `bucket_region` | `str` | No | Object storage bucket region. |
| `created_at` | `str` | No | Time created at. |
| `deleted_at` | `str` | No | Time deleted at. |
| `description` | `str` | No | Customer-supplied description. |
| `failure_reason` | `str` | No | Human-readable explanation of a terminal FAILED status. |
| `generator_model_uuid` | `str` | No | Model that produced the scenarios. |
| `library_scenario_uuid` | `str` | No | UUID of the source library entry. |
| `name` | `str` | No | Customer-supplied name. |
| `scenario_count` | `int` | No | Number of scenarios in the set. |
| `scenario_set_uuid` | `str` | No | UUID of the scenario set. |
| `source_export_id` | `str` | No | Signals export UUID that produced this set. |
| `source_goal_description` | `str` | No | The goal that drove generation. |
| `source_kind` | `str` | No | How a scenario set was created. |
| `spaces_key` | `str` | No | Object storage key for the scenario file. |
| `status` | `str` | No | Lifecycle status of a scenario set. |
| `updated_at` | `str` | No | Time last updated at. |
| `workflow_uuid` | `str` | No | Identifier of the generation workflow. |

### Operations

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.ApiCreateScenarioSetFromLibraryOutput().create({
    "scenario_library_id": "example_scenario_library_id",  # str
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ApiCreateScenarioSetFromLibraryOutputEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ApiDeleteAgentApiKeyOutputEntity

```python
api_delete_agent_api_key_output = client.ApiDeleteAgentApiKeyOutput()
```

### Operations

#### `remove(reqmatch, ctrl=None) -> dict`

Remove the entity matching the given criteria. Raises on error.

```python
result = client.ApiDeleteAgentApiKeyOutput().remove({"agent_id": "agent_id", "api_key_uuid": "api_key_uuid"})
```

#### `update(reqdata, ctrl=None) -> dict`

Update an existing entity. The data must include the entity `id`. Returns the updated entity data and raises on error.

```python
result = client.ApiDeleteAgentApiKeyOutput().update({
    "agent_id": "agent_id",
    "api_key_uuid": "api_key_uuid",
    # Fields to update
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ApiDeleteAgentApiKeyOutputEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ApiDeleteAgentOutputEntity

```python
api_delete_agent_output = client.ApiDeleteAgentOutput()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `anthropic_api_key` | `dict` | No | Anthropic API Key Info |
| `anthropic_key_uuid` | `str` | No | Optional Anthropic API key ID to use with Anthropic models |
| `api_key_infos` | `list` | No | Api key infos |
| `api_keys` | `list` | No | Api keys |
| `chatbot` | `dict` | No | A Chatbot |
| `chatbot_identifiers` | `list` | No | Chatbot identifiers |
| `child_agents` | `list` | No | Child agents |
| `conversation_logs_enabled` | `bool` | No | Whether conversation logs are enabled for the agent |
| `created_at` | `str` | No | Creation date / time |
| `deployment` | `dict` | No | Description of deployment |
| `description` | `str` | No | Description of agent |
| `functions` | `list` | No |  |
| `guardrails` | `list` | No | The guardrails the agent is attached to |
| `if_case` | `str` | No | Instructions to the agent on how to use the route |
| `instruction` | `str` | No | Agent instruction. |
| `k` | `int` | No | How many results should be considered from an attached knowledge base |
| `knowledge_base_uuid` | `list` | No | Ids of the knowledge base(s) to attach to the agent |
| `knowledge_bases` | `list` | No | Knowledge bases |
| `logging_config` | `dict` | No |  |
| `max_tokens` | `int` | No | Specifies the maximum number of tokens the model can process in a single input or output, set as a number between 1 and 512. |
| `mcp_servers` | `list` | No | MCP (Model Context Protocol) servers attached to this agent |
| `model` | `dict` | No | Description of a Model |
| `model_provider_key` | `dict` | No |  |
| `model_provider_key_uuid` | `str` | No |  |
| `model_router` | `dict` | No | Model router |
| `model_router_uuid` | `str` | No |  |
| `model_uuid` | `str` | No | Identifier for the foundation model. |
| `name` | `str` | No | Agent name |
| `open_ai_key_uuid` | `str` | No | Optional OpenAI API key ID to use with OpenAI models |
| `openai_api_key` | `dict` | No | OpenAI API Key Info |
| `parent_agents` | `list` | No | Parent agents |
| `project_id` | `str` | No | The id of the DigitalOcean project this agent will belong to |
| `provide_citations` | `bool` | No | Whether the agent should provide in-response citations |
| `reasoning_effort` | `str` | No | The reasoning effort for the agent |
| `region` | `str` | No | Region code |
| `retrieval_method` | `str` | No | - RETRIEVAL_METHOD_UNKNOWN: The retrieval method is unknown - RETRIEVAL_METHOD_REWRITE: The retrieval method is rewrite - RETRIEVAL_METHOD_STEP_BACK: The retrieval method is step back - RETRIEVAL_METHOD_SUB_QUERIES: The retrieval method is… |
| `route_created_at` | `str` | No | Creation of route date / time |
| `route_created_by` | `str` | No | Id of user that created the route |
| `route_name` | `str` | No | Route name |
| `route_uuid` | `str` | No | Route uuid |
| `router_preset_slug` | `str` | No |  |
| `tags` | `list` | No | Agent tag to organize related resources |
| `temperature` | `float` | No | Controls the model’s creativity, specified as a number between 0 and 1. |
| `template` | `dict` | No | Represents an AgentTemplate entity |
| `thinking_token_budget` | `int` | No | The thinking token budget for Anthropic extended thinking (0 = disabled) |
| `top_p` | `float` | No | Defines the cumulative probability threshold for word selection, specified as a number between 0 and 1. |
| `updated_at` | `str` | No | Last modified |
| `url` | `str` | No | Access your agent under this url |
| `user_id` | `str` | No | Id of user that created the agent |
| `uuid` | `str` | No | Unique agent id |
| `version_hash` | `str` | No | The latest version of the agent |
| `vpc_egress_ips` | `list` | No | VPC Egress IPs |
| `vpc_uuid` | `str` | No |  |
| `web_fetch_enabled` | `bool` | No | Whether this agent can use the built-in web_fetch tool. |
| `web_search_enabled` | `bool` | No | Whether this agent can use the built-in web_search tool. |
| `workspace` | `dict` | No |  |
| `workspace_uuid` | `str` | No | Identifier for the workspace |

### Operations

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.ApiDeleteAgentOutput().create({
})
```

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.ApiDeleteAgentOutput().list()
for api_delete_agent_output in results:
    print(api_delete_agent_output)
```

#### `remove(reqmatch, ctrl=None) -> dict`

Remove the entity matching the given criteria. Raises on error.

```python
result = client.ApiDeleteAgentOutput().remove({"uuid": "uuid"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ApiDeleteAgentOutputEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ApiDeleteAnthropicApiKeyOutputEntity

```python
api_delete_anthropic_api_key_output = client.ApiDeleteAnthropicApiKeyOutput()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `api_key` | `str` | No | Anthropic API key |
| `created_at` | `str` | No | Key creation date |
| `created_by` | `str` | No | Created by user id from DO |
| `deleted_at` | `str` | No | Key deleted date |
| `name` | `str` | No | Name |
| `updated_at` | `str` | No | Key last updated date |
| `uuid` | `str` | No | Uuid |

### Operations

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.ApiDeleteAnthropicApiKeyOutput().create({
})
```

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.ApiDeleteAnthropicApiKeyOutput().list()
for api_delete_anthropic_api_key_output in results:
    print(api_delete_anthropic_api_key_output)
```

#### `remove(reqmatch, ctrl=None) -> dict`

Remove the entity matching the given criteria. Raises on error.

```python
result = client.ApiDeleteAnthropicApiKeyOutput().remove({"api_key_uuid": "api_key_uuid"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ApiDeleteAnthropicApiKeyOutputEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ApiDeleteCustomEvaluationMetricOutputEntity

```python
api_delete_custom_evaluation_metric_output = client.ApiDeleteCustomEvaluationMetricOutput()
```

### Operations

#### `remove(reqmatch, ctrl=None) -> dict`

Remove the entity matching the given criteria. Raises on error.

```python
result = client.ApiDeleteCustomEvaluationMetricOutput().remove({"metric_uuid": "metric_uuid"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ApiDeleteCustomEvaluationMetricOutputEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ApiDeleteCustomModelOutputPublicEntity

```python
api_delete_custom_model_output_public = client.ApiDeleteCustomModelOutputPublic()
```

### Operations

#### `remove(reqmatch, ctrl=None) -> dict`

Remove the entity matching the given criteria. Raises on error.

```python
result = client.ApiDeleteCustomModelOutputPublic().remove({"uuid": "uuid"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ApiDeleteCustomModelOutputPublicEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ApiDeleteEvaluationDatasetOutputEntity

```python
api_delete_evaluation_dataset_output = client.ApiDeleteEvaluationDatasetOutput()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `created_at` | `str` | No | Time created at. |
| `dataset_name` | `str` | No | Name of the dataset. |
| `dataset_paradigm` | `str` | No | EvaluationDatasetParadigm is the row/content shape of a dataset, orthogonal to the surface in EvaluationDatasetType (e.g. |
| `dataset_type` | `str` | No |  |
| `dataset_uuid` | `str` | No | UUID of the dataset. |
| `evaluation_dataset_uuid` | `str` | No | Evaluation dataset uuid. |
| `file_size` | `str` | No | The size of the dataset uploaded file in bytes. |
| `file_upload_dataset` | `dict` | No | File to upload as data source for knowledge base. |
| `has_ground_truth` | `bool` | No | Does the dataset have a ground truth column? |
| `name` | `str` | No | The name of the agent evaluation dataset. |
| `row_count` | `int` | No | Number of rows in the dataset. |

### Operations

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.ApiDeleteEvaluationDatasetOutput().create({
})
```

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.ApiDeleteEvaluationDatasetOutput().list()
for api_delete_evaluation_dataset_output in results:
    print(api_delete_evaluation_dataset_output)
```

#### `remove(reqmatch, ctrl=None) -> dict`

Remove the entity matching the given criteria. Raises on error.

```python
result = client.ApiDeleteEvaluationDatasetOutput().remove({"dataset_uuid": "dataset_uuid"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ApiDeleteEvaluationDatasetOutputEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ApiDeleteKnowledgeBaseDataSourceOutputEntity

```python
api_delete_knowledge_base_data_source_output = client.ApiDeleteKnowledgeBaseDataSourceOutput()
```

### Operations

#### `remove(reqmatch, ctrl=None) -> dict`

Remove the entity matching the given criteria. Raises on error.

```python
result = client.ApiDeleteKnowledgeBaseDataSourceOutput().remove({"data_source_uuid": "data_source_uuid", "knowledge_base_id": "knowledge_base_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ApiDeleteKnowledgeBaseDataSourceOutputEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ApiDeleteKnowledgeBaseOutputEntity

```python
api_delete_knowledge_base_output = client.ApiDeleteKnowledgeBaseOutput()
```

### Operations

#### `remove(reqmatch, ctrl=None) -> dict`

Remove the entity matching the given criteria. Raises on error.

```python
result = client.ApiDeleteKnowledgeBaseOutput().remove({"uuid": "uuid"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ApiDeleteKnowledgeBaseOutputEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ApiDeleteModelApiKeyOutputEntity

```python
api_delete_model_api_key_output = client.ApiDeleteModelApiKeyOutput()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `created_at` | `str` | No | Creation date |
| `created_by` | `str` | No | Created by |
| `deleted_at` | `str` | No | Deleted date |
| `name` | `str` | No | A human friendly name to identify the key |
| `secret_key` | `str` | No |  |
| `uuid` | `str` | No | Uuid |

### Operations

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.ApiDeleteModelApiKeyOutput().create({
})
```

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.ApiDeleteModelApiKeyOutput().list()
for api_delete_model_api_key_output in results:
    print(api_delete_model_api_key_output)
```

#### `remove(reqmatch, ctrl=None) -> dict`

Remove the entity matching the given criteria. Raises on error.

```python
result = client.ApiDeleteModelApiKeyOutput().remove({"api_key_uuid": "api_key_uuid"})
```

#### `update(reqdata, ctrl=None) -> dict`

Update an existing entity. The data must include the entity `id`. Returns the updated entity data and raises on error.

```python
result = client.ApiDeleteModelApiKeyOutput().update({
    "api_key_uuid": "api_key_uuid",
    # Fields to update
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ApiDeleteModelApiKeyOutputEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ApiDeleteModelEvaluationPresetOutputEntity

```python
api_delete_model_evaluation_preset_output = client.ApiDeleteModelEvaluationPresetOutput()
```

### Operations

#### `remove(reqmatch, ctrl=None) -> dict`

Remove the entity matching the given criteria. Raises on error.

```python
result = client.ApiDeleteModelEvaluationPresetOutput().remove({"eval_preset_uuid": "eval_preset_uuid"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ApiDeleteModelEvaluationPresetOutputEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ApiDeleteModelEvaluationRunOutputPublicEntity

```python
api_delete_model_evaluation_run_output_public = client.ApiDeleteModelEvaluationRunOutputPublic()
```

### Operations

#### `remove(reqmatch, ctrl=None) -> dict`

Remove the entity matching the given criteria. Raises on error.

```python
result = client.ApiDeleteModelEvaluationRunOutputPublic().remove({"eval_run_uuid": "eval_run_uuid"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ApiDeleteModelEvaluationRunOutputPublicEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ApiDeleteModelRouterOutputEntity

```python
api_delete_model_router_output = client.ApiDeleteModelRouterOutput()
```

### Operations

#### `remove(reqmatch, ctrl=None) -> dict`

Remove the entity matching the given criteria. Raises on error.

```python
result = client.ApiDeleteModelRouterOutput().remove({"uuid": "uuid"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ApiDeleteModelRouterOutputEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ApiDeleteOpenAiapiKeyOutputEntity

```python
api_delete_open_aiapi_key_output = client.ApiDeleteOpenAiapiKeyOutput()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `api_key` | `str` | No | OpenAI API key |
| `created_at` | `str` | No | Key creation date |
| `created_by` | `str` | No | Created by user id from DO |
| `deleted_at` | `str` | No | Key deleted date |
| `models` | `list` | No | Models supported by the openAI api key |
| `name` | `str` | No | Name |
| `updated_at` | `str` | No | Key last updated date |
| `uuid` | `str` | No | Uuid |

### Operations

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.ApiDeleteOpenAiapiKeyOutput().create({
})
```

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.ApiDeleteOpenAiapiKeyOutput().list()
for api_delete_open_aiapi_key_output in results:
    print(api_delete_open_aiapi_key_output)
```

#### `remove(reqmatch, ctrl=None) -> dict`

Remove the entity matching the given criteria. Raises on error.

```python
result = client.ApiDeleteOpenAiapiKeyOutput().remove({"api_key_uuid": "api_key_uuid"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ApiDeleteOpenAiapiKeyOutputEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ApiDeleteScenarioSetOutputEntity

```python
api_delete_scenario_set_output = client.ApiDeleteScenarioSetOutput()
```

### Operations

#### `remove(reqmatch, ctrl=None) -> dict`

Remove the entity matching the given criteria. Raises on error.

```python
result = client.ApiDeleteScenarioSetOutput().remove({"scenario_set_uuid": "scenario_set_uuid"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ApiDeleteScenarioSetOutputEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ApiDeleteScheduledIndexingOutputEntity

```python
api_delete_scheduled_indexing_output = client.ApiDeleteScheduledIndexingOutput()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `created_at` | `str` | No | Created at timestamp |
| `days` | `list` | No | Days for execution (day is represented same as in a cron expression, e.g. |
| `deleted_at` | `str` | No | Deleted at timestamp (if soft deleted) |
| `is_active` | `bool` | No | Whether the schedule is currently active |
| `knowledge_base_uuid` | `str` | No | Knowledge base uuid associated with this schedule |
| `last_ran_at` | `str` | No | Last time the schedule was executed |
| `next_run_at` | `str` | No | Next scheduled run |
| `time` | `str` | No | Scheduled time of execution (HH:MM:SS format) |
| `updated_at` | `str` | No | Updated at timestamp |
| `uuid` | `str` | No | Unique identifier for the scheduled indexing entry |

### Operations

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.ApiDeleteScheduledIndexingOutput().create({
})
```

#### `remove(reqmatch, ctrl=None) -> dict`

Remove the entity matching the given criteria. Raises on error.

```python
result = client.ApiDeleteScheduledIndexingOutput().remove({"uuid": "uuid"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ApiDeleteScheduledIndexingOutputEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ApiDeleteSimulationRunOutputEntity

```python
api_delete_simulation_run_output = client.ApiDeleteSimulationRunOutput()
```

### Operations

#### `remove(reqmatch, ctrl=None) -> dict`

Remove the entity matching the given criteria. Raises on error.

```python
result = client.ApiDeleteSimulationRunOutput().remove({"run_uuid": "run_uuid"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ApiDeleteSimulationRunOutputEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ApiDeleteWorkspaceOutputEntity

```python
api_delete_workspace_output = client.ApiDeleteWorkspaceOutput()
```

### Operations

#### `remove(reqmatch, ctrl=None) -> dict`

Remove the entity matching the given criteria. Raises on error.

```python
result = client.ApiDeleteWorkspaceOutput().remove({"workspace_uuid": "workspace_uuid"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ApiDeleteWorkspaceOutputEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ApiDropboxOauth2GetTokensOutputEntity

```python
api_dropbox_oauth2_get_tokens_output = client.ApiDropboxOauth2GetTokensOutput()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `code` | `str` | No | The oauth2 code from google |
| `redirect_url` | `str` | No | Redirect url |
| `refresh_token` | `str` | No | The refresh token |
| `token` | `str` | No | The access token |

### Operations

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.ApiDropboxOauth2GetTokensOutput().create({
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ApiDropboxOauth2GetTokensOutputEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ApiGenerateOauth2UrlOutputEntity

```python
api_generate_oauth2_url_output = client.ApiGenerateOauth2UrlOutput()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `url` | `str` | No | The oauth2 url |

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.ApiGenerateOauth2UrlOutput().load()
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ApiGenerateOauth2UrlOutputEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ApiGenerateScenarioSetOutputEntity

```python
api_generate_scenario_set_output = client.ApiGenerateScenarioSetOutput()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `bucket_name` | `str` | No | Object storage bucket holding the scenario file. |
| `bucket_region` | `str` | No | Object storage bucket region. |
| `created_at` | `str` | No | Time created at. |
| `deleted_at` | `str` | No | Time deleted at. |
| `description` | `str` | No | Customer-supplied description. |
| `failure_reason` | `str` | No | Human-readable explanation of a terminal FAILED status. |
| `generator_model_uuid` | `str` | No | Model that produced the scenarios. |
| `goal_description` | `str` | No | The goal that drives scenario generation. |
| `library_scenario_uuid` | `str` | No | UUID of the source library entry. |
| `name` | `str` | No | Customer-supplied name. |
| `num_scenarios` | `int` | No | Number of scenarios to generate. |
| `scenario_count` | `int` | No | Number of scenarios in the set. |
| `scenario_set_uuid` | `str` | No | UUID of the scenario set. |
| `source_export_id` | `str` | No | Signals export UUID that produced this set. |
| `source_goal_description` | `str` | No | The goal that drove generation. |
| `source_kind` | `str` | No | How a scenario set was created. |
| `spaces_key` | `str` | No | Object storage key for the scenario file. |
| `status` | `str` | No | Lifecycle status of a scenario set. |
| `updated_at` | `str` | No | Time last updated at. |
| `workflow_uuid` | `str` | No | Identifier of the generation workflow. |

### Operations

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.ApiGenerateScenarioSetOutput().create({
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ApiGenerateScenarioSetOutputEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ApiGetAgentOutputEntity

```python
api_get_agent_output = client.ApiGetAgentOutput()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `anthropic_api_key` | `dict` | No | Anthropic API Key Info |
| `api_key_infos` | `list` | No | Api key infos |
| `api_keys` | `list` | No | Api keys |
| `chatbot` | `dict` | No | A Chatbot |
| `chatbot_identifiers` | `list` | No | Chatbot identifiers |
| `child_agents` | `list` | No | Child agents |
| `conversation_logs_enabled` | `bool` | No | Whether conversation logs are enabled for the agent |
| `created_at` | `str` | No | Creation date / time |
| `deployment` | `dict` | No | Description of deployment |
| `description` | `str` | No | Description of agent |
| `functions` | `list` | No |  |
| `guardrails` | `list` | No | The guardrails the agent is attached to |
| `if_case` | `str` | No |  |
| `instruction` | `str` | No | Agent instruction. |
| `k` | `int` | No |  |
| `knowledge_bases` | `list` | No | Knowledge bases |
| `logging_config` | `dict` | No |  |
| `max_tokens` | `int` | No |  |
| `mcp_servers` | `list` | No | MCP (Model Context Protocol) servers attached to this agent |
| `model` | `dict` | No | Description of a Model |
| `model_provider_key` | `dict` | No |  |
| `model_router` | `dict` | No | Model router |
| `name` | `str` | No | Agent name |
| `openai_api_key` | `dict` | No | OpenAI API Key Info |
| `parent_agents` | `list` | No | Parent agents |
| `project_id` | `str` | No |  |
| `provide_citations` | `bool` | No | Whether the agent should provide in-response citations |
| `reasoning_effort` | `str` | No | The reasoning effort for the agent |
| `region` | `str` | No | Region code |
| `retrieval_method` | `str` | No | - RETRIEVAL_METHOD_UNKNOWN: The retrieval method is unknown - RETRIEVAL_METHOD_REWRITE: The retrieval method is rewrite - RETRIEVAL_METHOD_STEP_BACK: The retrieval method is step back - RETRIEVAL_METHOD_SUB_QUERIES: The retrieval method is… |
| `route_created_at` | `str` | No | Creation of route date / time |
| `route_created_by` | `str` | No |  |
| `route_name` | `str` | No | Route name |
| `route_uuid` | `str` | No |  |
| `tags` | `list` | No | Agent tag to organize related resources |
| `temperature` | `float` | No |  |
| `template` | `dict` | No | Represents an AgentTemplate entity |
| `thinking_token_budget` | `int` | No | The thinking token budget for Anthropic extended thinking (0 = disabled) |
| `top_p` | `float` | No |  |
| `updated_at` | `str` | No | Last modified |
| `url` | `str` | No | Access your agent under this url |
| `user_id` | `str` | No | Id of user that created the agent |
| `uuid` | `str` | No | Unique agent id |
| `version_hash` | `str` | No | The latest version of the agent |
| `vpc_egress_ips` | `list` | No | VPC Egress IPs |
| `vpc_uuid` | `str` | No |  |
| `web_fetch_enabled` | `bool` | No | Whether this agent can use the built-in web_fetch tool. |
| `web_search_enabled` | `bool` | No | Whether this agent can use the built-in web_search tool. |
| `workspace` | `dict` | No |  |

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.ApiGetAgentOutput().load({"uuid": "uuid"})
```

#### `update(reqdata, ctrl=None) -> dict`

Update an existing entity. The data must include the entity `id`. Returns the updated entity data and raises on error.

```python
result = client.ApiGetAgentOutput().update({
    "uuid": "uuid",
    # Fields to update
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ApiGetAgentOutputEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ApiGetAgentUsageOutputEntity

```python
api_get_agent_usage_output = client.ApiGetAgentUsageOutput()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `log_insights_usage` | `dict` | No | Resource Usage Description |
| `usage` | `dict` | No | Resource Usage Description |

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.ApiGetAgentUsageOutput().load({"agent_id": "agent_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ApiGetAgentUsageOutputEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ApiGetAnthropicApiKeyOutputEntity

```python
api_get_anthropic_api_key_output = client.ApiGetAnthropicApiKeyOutput()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `created_at` | `str` | No | Key creation date |
| `created_by` | `str` | No | Created by user id from DO |
| `deleted_at` | `str` | No | Key deleted date |
| `name` | `str` | No | Name |
| `updated_at` | `str` | No | Key last updated date |
| `uuid` | `str` | No | Uuid |

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.ApiGetAnthropicApiKeyOutput().load({"api_key_uuid": "api_key_uuid"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ApiGetAnthropicApiKeyOutputEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ApiGetChildrenOutputEntity

```python
api_get_children_output = client.ApiGetChildrenOutput()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `anthropic_api_key` | `dict` | No | Anthropic API Key Info |
| `api_key_infos` | `list` | No | Api key infos |
| `api_keys` | `list` | No | Api keys |
| `chatbot` | `dict` | No | A Chatbot |
| `chatbot_identifiers` | `list` | No | Chatbot identifiers |
| `child_agents` | `list` | No | Child agents |
| `conversation_logs_enabled` | `bool` | No | Whether conversation logs are enabled for the agent |
| `created_at` | `str` | No | Creation date / time |
| `deployment` | `dict` | No | Description of deployment |
| `description` | `str` | No | Description of agent |
| `functions` | `list` | No |  |
| `guardrails` | `list` | No | The guardrails the agent is attached to |
| `if_case` | `str` | No |  |
| `instruction` | `str` | No | Agent instruction. |
| `k` | `int` | No |  |
| `knowledge_bases` | `list` | No | Knowledge bases |
| `logging_config` | `dict` | No |  |
| `max_tokens` | `int` | No |  |
| `mcp_servers` | `list` | No | MCP (Model Context Protocol) servers attached to this agent |
| `model` | `dict` | No | Description of a Model |
| `model_provider_key` | `dict` | No |  |
| `model_router` | `dict` | No | Model router |
| `name` | `str` | No | Agent name |
| `openai_api_key` | `dict` | No | OpenAI API Key Info |
| `parent_agents` | `list` | No | Parent agents |
| `project_id` | `str` | No |  |
| `provide_citations` | `bool` | No | Whether the agent should provide in-response citations |
| `reasoning_effort` | `str` | No | The reasoning effort for the agent |
| `region` | `str` | No | Region code |
| `retrieval_method` | `str` | No | - RETRIEVAL_METHOD_UNKNOWN: The retrieval method is unknown - RETRIEVAL_METHOD_REWRITE: The retrieval method is rewrite - RETRIEVAL_METHOD_STEP_BACK: The retrieval method is step back - RETRIEVAL_METHOD_SUB_QUERIES: The retrieval method is… |
| `route_created_at` | `str` | No | Creation of route date / time |
| `route_created_by` | `str` | No |  |
| `route_name` | `str` | No | Route name |
| `route_uuid` | `str` | No |  |
| `tags` | `list` | No | Agent tag to organize related resources |
| `temperature` | `float` | No |  |
| `template` | `dict` | No | Represents an AgentTemplate entity |
| `thinking_token_budget` | `int` | No | The thinking token budget for Anthropic extended thinking (0 = disabled) |
| `top_p` | `float` | No |  |
| `updated_at` | `str` | No | Last modified |
| `url` | `str` | No | Access your agent under this url |
| `user_id` | `str` | No | Id of user that created the agent |
| `uuid` | `str` | No | Unique agent id |
| `version_hash` | `str` | No | The latest version of the agent |
| `vpc_egress_ips` | `list` | No | VPC Egress IPs |
| `vpc_uuid` | `str` | No |  |
| `web_fetch_enabled` | `bool` | No | Whether this agent can use the built-in web_fetch tool. |
| `web_search_enabled` | `bool` | No | Whether this agent can use the built-in web_search tool. |
| `workspace` | `dict` | No |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.ApiGetChildrenOutput().list({"agent_id": "example"})
for api_get_children_output in results:
    print(api_get_children_output)
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ApiGetChildrenOutputEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ApiGetCustomModelOutputPublicEntity

```python
api_get_custom_model_output_public = client.ApiGetCustomModelOutputPublic()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `active_deployments` | `list` | No | List of active deployments using this model |
| `architecture` | `str` | No | Model architecture type (free-form string from config.json) |
| `config_json` | `dict` | No | Raw config.json contents from the model repository |
| `context_length` | `int` | No | Maximum context length supported by the model |
| `cost_estimate_per_month` | `int` | No | Estimated monthly cost in dollars for hosting |
| `created_at` | `str` | No | Timestamp when the model was created |
| `description` | `str` | No | Description of the custom model |
| `error_message` | `str` | No | User-facing reason the most recent import failed; empty otherwise. |
| `file_count` | `int` | No | Number of files in the model |
| `input_modalities` | `list` | No | Input modalities supported (e.g., text, image) |
| `license` | `str` | No | License under which the model is distributed |
| `name` | `str` | No | Name of the custom model |
| `output_modalities` | `list` | No | Output modalities supported (e.g., text, image) |
| `parameters` | `str` | No | Number of parameters in the model |
| `source_ref` | `dict` | No | Reference to the original source of the model |
| `source_type` | `str` | No | Source from which the model was imported |
| `status` | `str` | No | Import and deployment status of the custom model |
| `storage_region` | `str` | No | Region of the Spaces bucket where model files are stored |
| `tags` | `dict` | No | User-defined tags for organizing models |
| `team_id` | `str` | No | Team that owns the model |
| `total_size_bytes` | `str` | No | Total size of model files in bytes |
| `updated_at` | `str` | No | Timestamp when the model was last updated |
| `uuid` | `str` | No | Unique identifier for the custom model |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.ApiGetCustomModelOutputPublic().list()
for api_get_custom_model_output_public in results:
    print(api_get_custom_model_output_public)
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.ApiGetCustomModelOutputPublic().load({"uuid": "uuid"})
```

#### `update(reqdata, ctrl=None) -> dict`

Update an existing entity. The data must include the entity `id`. Returns the updated entity data and raises on error.

```python
result = client.ApiGetCustomModelOutputPublic().update({
    "uuid": "uuid",
    # Fields to update
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ApiGetCustomModelOutputPublicEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ApiGetEvaluationDatasetDownloadUrlOutputEntity

```python
api_get_evaluation_dataset_download_url_output = client.ApiGetEvaluationDatasetDownloadUrlOutput()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `download_url` | `str` | No | The presigned URL to download the dataset file. |
| `expires_at` | `str` | No | The time the URL expires at. |

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.ApiGetEvaluationDatasetDownloadUrlOutput().load({"evaluation_dataset_id": "evaluation_dataset_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ApiGetEvaluationDatasetDownloadUrlOutputEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ApiGetEvaluationRunOutputEntity

```python
api_get_evaluation_run_output = client.ApiGetEvaluationRunOutput()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `agent_deleted` | `bool` | No | Whether agent is deleted |
| `agent_deployment_name` | `str` | No | The agent deployment name |
| `agent_deployment_names` | `list` | No | Agent deployment names to run the test case against. |
| `agent_name` | `str` | No | Agent name |
| `agent_uuid` | `str` | No | Agent UUID. |
| `agent_uuids` | `list` | No | Agent UUIDs to run the test case against (legacy agents). |
| `agent_version_hash` | `str` | No | Version hash |
| `agent_workspace_uuid` | `str` | No | Agent workspace uuid |
| `created_by_user_email` | `str` | No |  |
| `created_by_user_id` | `str` | No |  |
| `error_description` | `str` | No | The error description |
| `evaluation_run_uuid` | `str` | No | Evaluation run UUID. |
| `evaluation_run_uuids` | `list` | No |  |
| `evaluation_test_case_workspace_uuid` | `str` | No | Evaluation test case workspace uuid |
| `finished_at` | `str` | No | Run end time. |
| `pass_status` | `bool` | No | The pass status of the evaluation run based on the star metric. |
| `queued_at` | `str` | No | Run queued time. |
| `run_level_metric_results` | `list` | No |  |
| `run_name` | `str` | No | Run name. |
| `star_metric_result` | `dict` | No |  |
| `started_at` | `str` | No | Run start time. |
| `status` | `str` | No | Evaluation Run Statuses |
| `test_case_description` | `str` | No | Test case description. |
| `test_case_name` | `str` | No | Test case name. |
| `test_case_uuid` | `str` | No | Test-case UUID. |
| `test_case_version` | `int` | No | Test-case-version. |

### Operations

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.ApiGetEvaluationRunOutput().create({
})
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.ApiGetEvaluationRunOutput().load({"evaluation_run_uuid": "evaluation_run_uuid"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ApiGetEvaluationRunOutputEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ApiGetEvaluationRunResultsOutputEntity

```python
api_get_evaluation_run_results_output = client.ApiGetEvaluationRunResultsOutput()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `evaluation_trace_spans` | `list` | No | The evaluated trace spans. |
| `ground_truth` | `str` | No | The ground truth for the prompt. |
| `input` | `str` | No |  |
| `input_tokens` | `str` | No | The number of input tokens used in the prompt. |
| `output` | `str` | No |  |
| `output_tokens` | `str` | No | The number of output tokens used in the prompt. |
| `prompt_chunks` | `list` | No | The list of prompt chunks. |
| `prompt_id` | `int` | No | Prompt ID |
| `prompt_level_metric_results` | `list` | No | The metric results for the prompt. |
| `trace_id` | `str` | No | The trace id for the prompt. |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.ApiGetEvaluationRunResultsOutput().list({"evaluation_run_id": "example"})
for api_get_evaluation_run_results_output in results:
    print(api_get_evaluation_run_results_output)
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ApiGetEvaluationRunResultsOutputEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ApiGetEvaluationTestCaseOutputEntity

```python
api_get_evaluation_test_case_output = client.ApiGetEvaluationTestCaseOutput()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `agent_workspace_name` | `str` | No |  |
| `archived_at` | `str` | No |  |
| `created_at` | `str` | No |  |
| `created_by_user_email` | `str` | No |  |
| `created_by_user_id` | `str` | No |  |
| `dataset` | `dict` | No |  |
| `dataset_name` | `str` | No |  |
| `dataset_uuid` | `str` | No | Dataset against which the test‑case is executed. |
| `description` | `str` | No | Description of the test case. |
| `latest_version_number_of_runs` | `int` | No |  |
| `metrics` | `list` | No | Full metric list to use for evaluation test case. |
| `name` | `str` | No | Name of the test case. |
| `star_metric` | `dict` | No |  |
| `test_case_uuid` | `str` | No | Test‑case UUID. |
| `total_runs` | `int` | No |  |
| `updated_at` | `str` | No |  |
| `updated_by_user_email` | `str` | No |  |
| `updated_by_user_id` | `str` | No |  |
| `version` | `int` | No |  |
| `workspace_uuid` | `str` | No | The workspace uuid. |

### Operations

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.ApiGetEvaluationTestCaseOutput().create({
})
```

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.ApiGetEvaluationTestCaseOutput().list()
for api_get_evaluation_test_case_output in results:
    print(api_get_evaluation_test_case_output)
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.ApiGetEvaluationTestCaseOutput().load({"test_case_uuid": "test_case_uuid"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ApiGetEvaluationTestCaseOutputEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ApiGetIndexingJobDetailsSignedUrlOutputEntity

```python
api_get_indexing_job_details_signed_url_output = client.ApiGetIndexingJobDetailsSignedUrlOutput()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `signed_url` | `str` | No | The signed url for downloading the indexing job details |

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.ApiGetIndexingJobDetailsSignedUrlOutput().load({"indexing_job_id": "indexing_job_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ApiGetIndexingJobDetailsSignedUrlOutputEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ApiGetKnowledgeBaseIndexingJobOutputEntity

```python
api_get_knowledge_base_indexing_job_output = client.ApiGetKnowledgeBaseIndexingJobOutput()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `completed_datasources` | `int` | No | Number of datasources indexed completed |
| `created_at` | `str` | No | Creation date / time |
| `data_source_jobs` | `list` | No | Details on Data Sources included in the Indexing Job |
| `data_source_uuids` | `list` | No | List of data source ids to index, if none are provided, all data sources will be indexed |
| `finished_at` | `str` | No |  |
| `is_report_available` | `bool` | No | Boolean value to determine if the indexing job details are available |
| `knowledge_base_uuid` | `str` | No | Knowledge base id |
| `phase` | `str` | No |  |
| `started_at` | `str` | No |  |
| `status` | `str` | No |  |
| `tokens` | `int` | No | Number of tokens [This field is deprecated] |
| `total_datasources` | `int` | No | Number of datasources being indexed |
| `total_tokens` | `str` | No | Total Tokens Consumed By the Indexing Job |
| `updated_at` | `str` | No | Last modified |
| `uuid` | `str` | No | Unique id |

### Operations

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.ApiGetKnowledgeBaseIndexingJobOutput().create({
})
```

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.ApiGetKnowledgeBaseIndexingJobOutput().list()
for api_get_knowledge_base_indexing_job_output in results:
    print(api_get_knowledge_base_indexing_job_output)
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.ApiGetKnowledgeBaseIndexingJobOutput().load({"uuid": "uuid"})
```

#### `update(reqdata, ctrl=None) -> dict`

Update an existing entity. The data must include the entity `id`. Returns the updated entity data and raises on error.

```python
result = client.ApiGetKnowledgeBaseIndexingJobOutput().update({
    "uuid": "uuid",
    # Fields to update
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ApiGetKnowledgeBaseIndexingJobOutputEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ApiGetKnowledgeBaseOutputEntity

```python
api_get_knowledge_base_output = client.ApiGetKnowledgeBaseOutput()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `database_status` | `str` | No |  |
| `knowledge_base` | `dict` | No | Knowledgebase Description |

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.ApiGetKnowledgeBaseOutput().load({"uuid": "uuid"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ApiGetKnowledgeBaseOutputEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ApiGetModelEvaluationRunOutputEntity

```python
api_get_model_evaluation_run_output = client.ApiGetModelEvaluationRunOutput()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `links` | `dict` | No | Links to other pages |
| `meta` | `dict` | No | Meta information about the data set |
| `results` | `list` | No | Paginated per-prompt evaluation results. |
| `run` | `dict` | No | Model Evaluation Run Detail - full view returned when fetching a specific run. |

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.ApiGetModelEvaluationRunOutput().load({"eval_run_uuid": "eval_run_uuid"})
```

#### `update(reqdata, ctrl=None) -> dict`

Update an existing entity. The data must include the entity `id`. Returns the updated entity data and raises on error.

```python
result = client.ApiGetModelEvaluationRunOutput().update({
    "eval_run_uuid": "eval_run_uuid",
    # Fields to update
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ApiGetModelEvaluationRunOutputEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ApiGetModelEvaluationRunResultsDownloadUrlOutputEntity

```python
api_get_model_evaluation_run_results_download_url_output = client.ApiGetModelEvaluationRunResultsDownloadUrlOutput()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `download_url` | `str` | No | The presigned URL to download the gzip-compressed JSON results file (.json.gz). |
| `expires_at` | `str` | No | The time the URL expires at. |

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.ApiGetModelEvaluationRunResultsDownloadUrlOutput().load({"model_evaluation_run_id": "model_evaluation_run_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ApiGetModelEvaluationRunResultsDownloadUrlOutputEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ApiGetModelRouterOutputEntity

```python
api_get_model_router_output = client.ApiGetModelRouterOutput()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `config` | `dict` | No |  |
| `created_at` | `str` | No | Creation date / time |
| `description` | `str` | No | Description |
| `fallback_models` | `list` | No | At least one fallback model is required; order defines failover priority |
| `name` | `str` | No | Name of the model router |
| `policies` | `list` | No | Router policies |
| `regions` | `list` | No | Target regions for the router |
| `updated_at` | `str` | No | Last modified |
| `uuid` | `str` | No | Unique id |

### Operations

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.ApiGetModelRouterOutput().create({
})
```

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.ApiGetModelRouterOutput().list()
for api_get_model_router_output in results:
    print(api_get_model_router_output)
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.ApiGetModelRouterOutput().load({"uuid": "uuid"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ApiGetModelRouterOutputEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ApiGetOpenAiapiKeyOutputEntity

```python
api_get_open_aiapi_key_output = client.ApiGetOpenAiapiKeyOutput()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `created_at` | `str` | No | Key creation date |
| `created_by` | `str` | No | Created by user id from DO |
| `deleted_at` | `str` | No | Key deleted date |
| `models` | `list` | No | Models supported by the openAI api key |
| `name` | `str` | No | Name |
| `updated_at` | `str` | No | Key last updated date |
| `uuid` | `str` | No | Uuid |

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.ApiGetOpenAiapiKeyOutput().load({"api_key_uuid": "api_key_uuid"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ApiGetOpenAiapiKeyOutputEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ApiGetScenarioSetDownloadUrlOutputEntity

```python
api_get_scenario_set_download_url_output = client.ApiGetScenarioSetDownloadUrlOutput()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `download_url` | `str` | No | The presigned URL to download the scenario set file. |
| `expires_at` | `str` | No | The time the URL expires at. |

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.ApiGetScenarioSetDownloadUrlOutput().load({"scenario_set_id": "scenario_set_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ApiGetScenarioSetDownloadUrlOutputEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ApiGetScenarioSetOutputEntity

```python
api_get_scenario_set_output = client.ApiGetScenarioSetOutput()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `bucket_name` | `str` | No | Object storage bucket holding the scenario file. |
| `bucket_region` | `str` | No | Object storage bucket region. |
| `created_at` | `str` | No | Time created at. |
| `deleted_at` | `str` | No | Time deleted at. |
| `description` | `str` | No | Customer-supplied description. |
| `failure_reason` | `str` | No | Human-readable explanation of a terminal FAILED status. |
| `file_upload_scenario_set` | `Any` | No | Uploaded scenario file to ingest. |
| `generator_model_uuid` | `str` | No | Model that produced the scenarios. |
| `library_scenario_uuid` | `str` | No | UUID of the source library entry. |
| `name` | `str` | No | Customer-supplied name. |
| `scenario_count` | `int` | No | Number of scenarios in the set. |
| `scenario_set_uuid` | `str` | No | UUID of the scenario set. |
| `scenarios` | `list` | No | Inline scenarios. |
| `source_export_id` | `str` | No | Signals export UUID that produced this set. |
| `source_goal_description` | `str` | No | The goal that drove generation. |
| `source_kind` | `str` | No | How a scenario set was created. |
| `spaces_key` | `str` | No | Object storage key for the scenario file. |
| `status` | `str` | No | Lifecycle status of a scenario set. |
| `updated_at` | `str` | No | Time last updated at. |
| `workflow_uuid` | `str` | No | Identifier of the generation workflow. |

### Operations

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.ApiGetScenarioSetOutput().create({
})
```

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.ApiGetScenarioSetOutput().list()
for api_get_scenario_set_output in results:
    print(api_get_scenario_set_output)
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.ApiGetScenarioSetOutput().load({"scenario_set_uuid": "scenario_set_uuid"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ApiGetScenarioSetOutputEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ApiGetScheduledIndexingOutputEntity

```python
api_get_scheduled_indexing_output = client.ApiGetScheduledIndexingOutput()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `created_at` | `str` | No | Created at timestamp |
| `days` | `list` | No | Days for execution (day is represented same as in a cron expression, e.g. |
| `deleted_at` | `str` | No | Deleted at timestamp (if soft deleted) |
| `is_active` | `bool` | No | Whether the schedule is currently active |
| `knowledge_base_uuid` | `str` | No | Knowledge base uuid associated with this schedule |
| `last_ran_at` | `str` | No | Last time the schedule was executed |
| `next_run_at` | `str` | No | Next scheduled run |
| `time` | `str` | No | Scheduled time of execution (HH:MM:SS format) |
| `updated_at` | `str` | No | Updated at timestamp |
| `uuid` | `str` | No | Unique identifier for the scheduled indexing entry |

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.ApiGetScheduledIndexingOutput().load({"knowledge_base_uuid": "knowledge_base_uuid"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ApiGetScheduledIndexingOutputEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ApiGetSimulationJourneyTrajectoryUrlOutputEntity

```python
api_get_simulation_journey_trajectory_url_output = client.ApiGetSimulationJourneyTrajectoryUrlOutput()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `download_url` | `str` | No | The presigned URL to download the trajectory JSON file. |
| `expires_at` | `str` | No | The time the URL expires at. |

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.ApiGetSimulationJourneyTrajectoryUrlOutput().load({"journey_id": "journey_id", "simulation_run_id": "simulation_run_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ApiGetSimulationJourneyTrajectoryUrlOutputEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ApiGetSimulationRunOutputEntity

```python
api_get_simulation_run_output = client.ApiGetSimulationRunOutput()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `scenario_results` | `list` | No | Per-scenario breakdown of journey outcomes, aggregated from journey rows. |
| `simulation_run` | `dict` | No | One execution of a scenario set against a candidate agent. |

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.ApiGetSimulationRunOutput().load({"run_uuid": "run_uuid"})
```

#### `update(reqdata, ctrl=None) -> dict`

Update an existing entity. The data must include the entity `id`. Returns the updated entity data and raises on error.

```python
result = client.ApiGetSimulationRunOutput().update({
    "run_uuid": "run_uuid",
    # Fields to update
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ApiGetSimulationRunOutputEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ApiGetWorkspaceOutputEntity

```python
api_get_workspace_output = client.ApiGetWorkspaceOutput()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `agent_uuids` | `list` | No | Ids of the agents(s) to attach to the workspace |
| `agents` | `list` | No | Agents |
| `created_at` | `str` | No | Creation date |
| `created_by` | `str` | No | The id of user who created this workspace |
| `created_by_email` | `str` | No | The email of the user who created this workspace |
| `deleted_at` | `str` | No | Deleted date |
| `description` | `str` | No | Description of the workspace |
| `evaluation_test_cases` | `list` | No | Evaluations |
| `name` | `str` | No | Name of the workspace |
| `updated_at` | `str` | No | Update date |
| `uuid` | `str` | No | Unique id |

### Operations

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.ApiGetWorkspaceOutput().create({
})
```

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.ApiGetWorkspaceOutput().list()
for api_get_workspace_output in results:
    print(api_get_workspace_output)
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.ApiGetWorkspaceOutput().load({"workspace_uuid": "workspace_uuid"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ApiGetWorkspaceOutputEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ApiImportCustomModelOutputPublicEntity

```python
api_import_custom_model_output_public = client.ApiImportCustomModelOutputPublic()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `accept_hf_token_storage` | `bool` | No | Whether the caller accepts storage of their HuggingFace token for gated model access |
| `accept_terms_and_conditions` | `bool` | No | Whether the caller accepts the terms and conditions for importing this model |
| `description` | `str` | No | Description of the model |
| `error` | `str` | No |  |
| `import_job` | `dict` | No | Import job tracking for a custom model |
| `model` | `dict` | No | Custom model - user-imported model from HuggingFace, Spaces, etc. |
| `name` | `str` | No | Name for the imported model |
| `preferred_gpu_region` | `str` | No | Preferred GPU region for deployment |
| `source_ref` | `dict` | No | Reference to the original source of the model |
| `source_type` | `str` | No | Source from which the model was imported |
| `tags` | `dict` | No | User-defined tags for organizing models |
| `validation_steps` | `list` | No | Validation steps performed during import |

### Operations

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.ApiImportCustomModelOutputPublic().create({
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ApiImportCustomModelOutputPublicEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ApiIndexedDataSourceEntity

```python
api_indexed_data_source = client.ApiIndexedDataSource()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `completed_at` | `str` | No | Timestamp when data source completed indexing |
| `data_source_uuid` | `str` | No | Uuid of the indexed data source |
| `error_details` | `str` | No | A detailed error description |
| `error_msg` | `str` | No | A string code provinding a hint which part of the system experienced an error |
| `failed_item_count` | `str` | No | Total count of files that have failed |
| `indexed_file_count` | `str` | No | Total count of files that have been indexed |
| `indexed_item_count` | `str` | No | Total count of files that have been indexed |
| `removed_item_count` | `str` | No | Total count of files that have been removed |
| `skipped_item_count` | `str` | No | Total count of files that have been skipped |
| `started_at` | `str` | No | Timestamp when data source started indexing |
| `status` | `str` | No |  |
| `total_bytes` | `str` | No | Total size of files in data source in bytes |
| `total_bytes_indexed` | `str` | No | Total size of files in data source in bytes that have been indexed |
| `total_file_count` | `str` | No | Total file count in the data source |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.ApiIndexedDataSource().list({"indexing_job_id": "example"})
for api_indexed_data_source in results:
    print(api_indexed_data_source)
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ApiIndexedDataSourceEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ApiLinkAgentFunctionOutputEntity

```python
api_link_agent_function_output = client.ApiLinkAgentFunctionOutput()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `agent_uuid` | `str` | No | Agent id |
| `anthropic_api_key` | `dict` | No | Anthropic API Key Info |
| `api_key_infos` | `list` | No | Api key infos |
| `api_keys` | `list` | No | Api keys |
| `chatbot` | `dict` | No | A Chatbot |
| `chatbot_identifiers` | `list` | No | Chatbot identifiers |
| `child_agents` | `list` | No | Child agents |
| `conversation_logs_enabled` | `bool` | No | Whether conversation logs are enabled for the agent |
| `created_at` | `str` | No | Creation date / time |
| `deployment` | `dict` | No | Description of deployment |
| `description` | `str` | No | Description of agent |
| `faas_name` | `str` | No | The name of the function in the DigitalOcean functions platform |
| `faas_namespace` | `str` | No | The namespace of the function in the DigitalOcean functions platform |
| `function_name` | `str` | No | Function name |
| `functions` | `list` | No |  |
| `guardrails` | `list` | No | The guardrails the agent is attached to |
| `if_case` | `str` | No |  |
| `input_schema` | `dict` | No | Describe the input schema for the function so the agent may call it |
| `instruction` | `str` | No | Agent instruction. |
| `k` | `int` | No |  |
| `knowledge_bases` | `list` | No | Knowledge bases |
| `logging_config` | `dict` | No |  |
| `max_tokens` | `int` | No |  |
| `mcp_servers` | `list` | No | MCP (Model Context Protocol) servers attached to this agent |
| `model` | `dict` | No | Description of a Model |
| `model_provider_key` | `dict` | No |  |
| `model_router` | `dict` | No | Model router |
| `name` | `str` | No | Agent name |
| `openai_api_key` | `dict` | No | OpenAI API Key Info |
| `output_schema` | `dict` | No | Describe the output schema for the function so the agent handle its response |
| `parent_agents` | `list` | No | Parent agents |
| `project_id` | `str` | No |  |
| `provide_citations` | `bool` | No | Whether the agent should provide in-response citations |
| `reasoning_effort` | `str` | No | The reasoning effort for the agent |
| `region` | `str` | No | Region code |
| `retrieval_method` | `str` | No | - RETRIEVAL_METHOD_UNKNOWN: The retrieval method is unknown - RETRIEVAL_METHOD_REWRITE: The retrieval method is rewrite - RETRIEVAL_METHOD_STEP_BACK: The retrieval method is step back - RETRIEVAL_METHOD_SUB_QUERIES: The retrieval method is… |
| `route_created_at` | `str` | No | Creation of route date / time |
| `route_created_by` | `str` | No |  |
| `route_name` | `str` | No | Route name |
| `route_uuid` | `str` | No |  |
| `tags` | `list` | No | Agent tag to organize related resources |
| `temperature` | `float` | No |  |
| `template` | `dict` | No | Represents an AgentTemplate entity |
| `thinking_token_budget` | `int` | No | The thinking token budget for Anthropic extended thinking (0 = disabled) |
| `top_p` | `float` | No |  |
| `updated_at` | `str` | No | Last modified |
| `url` | `str` | No | Access your agent under this url |
| `user_id` | `str` | No | Id of user that created the agent |
| `uuid` | `str` | No | Unique agent id |
| `version_hash` | `str` | No | The latest version of the agent |
| `vpc_egress_ips` | `list` | No | VPC Egress IPs |
| `vpc_uuid` | `str` | No |  |
| `web_fetch_enabled` | `bool` | No | Whether this agent can use the built-in web_fetch tool. |
| `web_search_enabled` | `bool` | No | Whether this agent can use the built-in web_search tool. |
| `workspace` | `dict` | No |  |

### Operations

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.ApiLinkAgentFunctionOutput().create({
    "agent_id": "example_agent_id",  # str
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ApiLinkAgentFunctionOutputEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ApiLinkAgentGuardrailOutputEntity

```python
api_link_agent_guardrail_output = client.ApiLinkAgentGuardrailOutput()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `agent_uuid` | `str` | No | The UUID of the agent. |
| `anthropic_api_key` | `dict` | No | Anthropic API Key Info |
| `api_key_infos` | `list` | No | Api key infos |
| `api_keys` | `list` | No | Api keys |
| `chatbot` | `dict` | No | A Chatbot |
| `chatbot_identifiers` | `list` | No | Chatbot identifiers |
| `child_agents` | `list` | No | Child agents |
| `conversation_logs_enabled` | `bool` | No | Whether conversation logs are enabled for the agent |
| `created_at` | `str` | No | Creation date / time |
| `deployment` | `dict` | No | Description of deployment |
| `description` | `str` | No | Description of agent |
| `functions` | `list` | No |  |
| `guardrails` | `list` | No | The guardrails the agent is attached to |
| `if_case` | `str` | No |  |
| `instruction` | `str` | No | Agent instruction. |
| `k` | `int` | No |  |
| `knowledge_bases` | `list` | No | Knowledge bases |
| `logging_config` | `dict` | No |  |
| `max_tokens` | `int` | No |  |
| `mcp_servers` | `list` | No | MCP (Model Context Protocol) servers attached to this agent |
| `model` | `dict` | No | Description of a Model |
| `model_provider_key` | `dict` | No |  |
| `model_router` | `dict` | No | Model router |
| `name` | `str` | No | Agent name |
| `openai_api_key` | `dict` | No | OpenAI API Key Info |
| `parent_agents` | `list` | No | Parent agents |
| `project_id` | `str` | No |  |
| `provide_citations` | `bool` | No | Whether the agent should provide in-response citations |
| `reasoning_effort` | `str` | No | The reasoning effort for the agent |
| `region` | `str` | No | Region code |
| `retrieval_method` | `str` | No | - RETRIEVAL_METHOD_UNKNOWN: The retrieval method is unknown - RETRIEVAL_METHOD_REWRITE: The retrieval method is rewrite - RETRIEVAL_METHOD_STEP_BACK: The retrieval method is step back - RETRIEVAL_METHOD_SUB_QUERIES: The retrieval method is… |
| `route_created_at` | `str` | No | Creation of route date / time |
| `route_created_by` | `str` | No |  |
| `route_name` | `str` | No | Route name |
| `route_uuid` | `str` | No |  |
| `tags` | `list` | No | Agent tag to organize related resources |
| `temperature` | `float` | No |  |
| `template` | `dict` | No | Represents an AgentTemplate entity |
| `thinking_token_budget` | `int` | No | The thinking token budget for Anthropic extended thinking (0 = disabled) |
| `top_p` | `float` | No |  |
| `updated_at` | `str` | No | Last modified |
| `url` | `str` | No | Access your agent under this url |
| `user_id` | `str` | No | Id of user that created the agent |
| `uuid` | `str` | No | Unique agent id |
| `version_hash` | `str` | No | The latest version of the agent |
| `vpc_egress_ips` | `list` | No | VPC Egress IPs |
| `vpc_uuid` | `str` | No |  |
| `web_fetch_enabled` | `bool` | No | Whether this agent can use the built-in web_fetch tool. |
| `web_search_enabled` | `bool` | No | Whether this agent can use the built-in web_search tool. |
| `workspace` | `dict` | No |  |

### Operations

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.ApiLinkAgentGuardrailOutput().create({
    "agent_id": "example_agent_id",  # str
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ApiLinkAgentGuardrailOutputEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ApiLinkAgentOutputEntity

```python
api_link_agent_output = client.ApiLinkAgentOutput()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `child_agent_uuid` | `str` | No | Routed agent id |
| `if_case` | `str` | No |  |
| `parent_agent_uuid` | `str` | No | A unique identifier for the parent agent. |
| `route_name` | `str` | No | Name of route |

### Operations

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.ApiLinkAgentOutput().create({
    "agent_id": "example_agent_id",  # str
    "child_agent_uuid": "example_child_agent_uuid",  # str
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ApiLinkAgentOutputEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ApiLinkKnowledgeBaseOutputEntity

```python
api_link_knowledge_base_output = client.ApiLinkKnowledgeBaseOutput()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `anthropic_api_key` | `dict` | No | Anthropic API Key Info |
| `api_key_infos` | `list` | No | Api key infos |
| `api_keys` | `list` | No | Api keys |
| `chatbot` | `dict` | No | A Chatbot |
| `chatbot_identifiers` | `list` | No | Chatbot identifiers |
| `child_agents` | `list` | No | Child agents |
| `conversation_logs_enabled` | `bool` | No | Whether conversation logs are enabled for the agent |
| `created_at` | `str` | No | Creation date / time |
| `deployment` | `dict` | No | Description of deployment |
| `description` | `str` | No | Description of agent |
| `functions` | `list` | No |  |
| `guardrails` | `list` | No | The guardrails the agent is attached to |
| `if_case` | `str` | No |  |
| `instruction` | `str` | No | Agent instruction. |
| `k` | `int` | No |  |
| `knowledge_bases` | `list` | No | Knowledge bases |
| `logging_config` | `dict` | No |  |
| `max_tokens` | `int` | No |  |
| `mcp_servers` | `list` | No | MCP (Model Context Protocol) servers attached to this agent |
| `model` | `dict` | No | Description of a Model |
| `model_provider_key` | `dict` | No |  |
| `model_router` | `dict` | No | Model router |
| `name` | `str` | No | Agent name |
| `openai_api_key` | `dict` | No | OpenAI API Key Info |
| `parent_agents` | `list` | No | Parent agents |
| `project_id` | `str` | No |  |
| `provide_citations` | `bool` | No | Whether the agent should provide in-response citations |
| `reasoning_effort` | `str` | No | The reasoning effort for the agent |
| `region` | `str` | No | Region code |
| `retrieval_method` | `str` | No | - RETRIEVAL_METHOD_UNKNOWN: The retrieval method is unknown - RETRIEVAL_METHOD_REWRITE: The retrieval method is rewrite - RETRIEVAL_METHOD_STEP_BACK: The retrieval method is step back - RETRIEVAL_METHOD_SUB_QUERIES: The retrieval method is… |
| `route_created_at` | `str` | No | Creation of route date / time |
| `route_created_by` | `str` | No |  |
| `route_name` | `str` | No | Route name |
| `route_uuid` | `str` | No |  |
| `tags` | `list` | No | Agent tag to organize related resources |
| `temperature` | `float` | No |  |
| `template` | `dict` | No | Represents an AgentTemplate entity |
| `thinking_token_budget` | `int` | No | The thinking token budget for Anthropic extended thinking (0 = disabled) |
| `top_p` | `float` | No |  |
| `updated_at` | `str` | No | Last modified |
| `url` | `str` | No | Access your agent under this url |
| `user_id` | `str` | No | Id of user that created the agent |
| `uuid` | `str` | No | Unique agent id |
| `version_hash` | `str` | No | The latest version of the agent |
| `vpc_egress_ips` | `list` | No | VPC Egress IPs |
| `vpc_uuid` | `str` | No |  |
| `web_fetch_enabled` | `bool` | No | Whether this agent can use the built-in web_fetch tool. |
| `web_search_enabled` | `bool` | No | Whether this agent can use the built-in web_search tool. |
| `workspace` | `dict` | No |  |

### Operations

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.ApiLinkKnowledgeBaseOutput().create({
    "agent_id": "example_agent_id",  # str
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ApiLinkKnowledgeBaseOutputEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ApiListAgentApiKeysOutputEntity

```python
api_list_agent_api_keys_output = client.ApiListAgentApiKeysOutput()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `created_at` | `str` | No | Creation date |
| `created_by` | `str` | No | Created by |
| `deleted_at` | `str` | No | Deleted date |
| `name` | `str` | No | Name |
| `secret_key` | `str` | No |  |
| `uuid` | `str` | No | Uuid |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.ApiListAgentApiKeysOutput().list({"agent_id": "example"})
for api_list_agent_api_keys_output in results:
    print(api_list_agent_api_keys_output)
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ApiListAgentApiKeysOutputEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ApiListAgentsByAnthropicKeyOutputEntity

```python
api_list_agents_by_anthropic_key_output = client.ApiListAgentsByAnthropicKeyOutput()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `anthropic_api_key` | `dict` | No | Anthropic API Key Info |
| `api_key_infos` | `list` | No | Api key infos |
| `api_keys` | `list` | No | Api keys |
| `chatbot` | `dict` | No | A Chatbot |
| `chatbot_identifiers` | `list` | No | Chatbot identifiers |
| `child_agents` | `list` | No | Child agents |
| `conversation_logs_enabled` | `bool` | No | Whether conversation logs are enabled for the agent |
| `created_at` | `str` | No | Creation date / time |
| `deployment` | `dict` | No | Description of deployment |
| `description` | `str` | No | Description of agent |
| `functions` | `list` | No |  |
| `guardrails` | `list` | No | The guardrails the agent is attached to |
| `if_case` | `str` | No |  |
| `instruction` | `str` | No | Agent instruction. |
| `k` | `int` | No |  |
| `knowledge_bases` | `list` | No | Knowledge bases |
| `logging_config` | `dict` | No |  |
| `max_tokens` | `int` | No |  |
| `mcp_servers` | `list` | No | MCP (Model Context Protocol) servers attached to this agent |
| `model` | `dict` | No | Description of a Model |
| `model_provider_key` | `dict` | No |  |
| `model_router` | `dict` | No | Model router |
| `name` | `str` | No | Agent name |
| `openai_api_key` | `dict` | No | OpenAI API Key Info |
| `parent_agents` | `list` | No | Parent agents |
| `project_id` | `str` | No |  |
| `provide_citations` | `bool` | No | Whether the agent should provide in-response citations |
| `reasoning_effort` | `str` | No | The reasoning effort for the agent |
| `region` | `str` | No | Region code |
| `retrieval_method` | `str` | No | - RETRIEVAL_METHOD_UNKNOWN: The retrieval method is unknown - RETRIEVAL_METHOD_REWRITE: The retrieval method is rewrite - RETRIEVAL_METHOD_STEP_BACK: The retrieval method is step back - RETRIEVAL_METHOD_SUB_QUERIES: The retrieval method is… |
| `route_created_at` | `str` | No | Creation of route date / time |
| `route_created_by` | `str` | No |  |
| `route_name` | `str` | No | Route name |
| `route_uuid` | `str` | No |  |
| `tags` | `list` | No | Agent tag to organize related resources |
| `temperature` | `float` | No |  |
| `template` | `dict` | No | Represents an AgentTemplate entity |
| `thinking_token_budget` | `int` | No | The thinking token budget for Anthropic extended thinking (0 = disabled) |
| `top_p` | `float` | No |  |
| `updated_at` | `str` | No | Last modified |
| `url` | `str` | No | Access your agent under this url |
| `user_id` | `str` | No | Id of user that created the agent |
| `uuid` | `str` | No | Unique agent id |
| `version_hash` | `str` | No | The latest version of the agent |
| `vpc_egress_ips` | `list` | No | VPC Egress IPs |
| `vpc_uuid` | `str` | No |  |
| `web_fetch_enabled` | `bool` | No | Whether this agent can use the built-in web_fetch tool. |
| `web_search_enabled` | `bool` | No | Whether this agent can use the built-in web_search tool. |
| `workspace` | `dict` | No |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.ApiListAgentsByAnthropicKeyOutput().list({"key_id": "example"})
for api_list_agents_by_anthropic_key_output in results:
    print(api_list_agents_by_anthropic_key_output)
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ApiListAgentsByAnthropicKeyOutputEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ApiListAgentsByOpenAiKeyOutputEntity

```python
api_list_agents_by_open_ai_key_output = client.ApiListAgentsByOpenAiKeyOutput()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `anthropic_api_key` | `dict` | No | Anthropic API Key Info |
| `api_key_infos` | `list` | No | Api key infos |
| `api_keys` | `list` | No | Api keys |
| `chatbot` | `dict` | No | A Chatbot |
| `chatbot_identifiers` | `list` | No | Chatbot identifiers |
| `child_agents` | `list` | No | Child agents |
| `conversation_logs_enabled` | `bool` | No | Whether conversation logs are enabled for the agent |
| `created_at` | `str` | No | Creation date / time |
| `deployment` | `dict` | No | Description of deployment |
| `description` | `str` | No | Description of agent |
| `functions` | `list` | No |  |
| `guardrails` | `list` | No | The guardrails the agent is attached to |
| `if_case` | `str` | No |  |
| `instruction` | `str` | No | Agent instruction. |
| `k` | `int` | No |  |
| `knowledge_bases` | `list` | No | Knowledge bases |
| `logging_config` | `dict` | No |  |
| `max_tokens` | `int` | No |  |
| `mcp_servers` | `list` | No | MCP (Model Context Protocol) servers attached to this agent |
| `model` | `dict` | No | Description of a Model |
| `model_provider_key` | `dict` | No |  |
| `model_router` | `dict` | No | Model router |
| `name` | `str` | No | Agent name |
| `openai_api_key` | `dict` | No | OpenAI API Key Info |
| `parent_agents` | `list` | No | Parent agents |
| `project_id` | `str` | No |  |
| `provide_citations` | `bool` | No | Whether the agent should provide in-response citations |
| `reasoning_effort` | `str` | No | The reasoning effort for the agent |
| `region` | `str` | No | Region code |
| `retrieval_method` | `str` | No | - RETRIEVAL_METHOD_UNKNOWN: The retrieval method is unknown - RETRIEVAL_METHOD_REWRITE: The retrieval method is rewrite - RETRIEVAL_METHOD_STEP_BACK: The retrieval method is step back - RETRIEVAL_METHOD_SUB_QUERIES: The retrieval method is… |
| `route_created_at` | `str` | No | Creation of route date / time |
| `route_created_by` | `str` | No |  |
| `route_name` | `str` | No | Route name |
| `route_uuid` | `str` | No |  |
| `tags` | `list` | No | Agent tag to organize related resources |
| `temperature` | `float` | No |  |
| `template` | `dict` | No | Represents an AgentTemplate entity |
| `thinking_token_budget` | `int` | No | The thinking token budget for Anthropic extended thinking (0 = disabled) |
| `top_p` | `float` | No |  |
| `updated_at` | `str` | No | Last modified |
| `url` | `str` | No | Access your agent under this url |
| `user_id` | `str` | No | Id of user that created the agent |
| `uuid` | `str` | No | Unique agent id |
| `version_hash` | `str` | No | The latest version of the agent |
| `vpc_egress_ips` | `list` | No | VPC Egress IPs |
| `vpc_uuid` | `str` | No |  |
| `web_fetch_enabled` | `bool` | No | Whether this agent can use the built-in web_fetch tool. |
| `web_search_enabled` | `bool` | No | Whether this agent can use the built-in web_search tool. |
| `workspace` | `dict` | No |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.ApiListAgentsByOpenAiKeyOutput().list({"key_id": "example"})
for api_list_agents_by_open_ai_key_output in results:
    print(api_list_agents_by_open_ai_key_output)
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ApiListAgentsByOpenAiKeyOutputEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ApiListAgentsByWorkspaceOutputEntity

```python
api_list_agents_by_workspace_output = client.ApiListAgentsByWorkspaceOutput()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `anthropic_api_key` | `dict` | No | Anthropic API Key Info |
| `api_key_infos` | `list` | No | Api key infos |
| `api_keys` | `list` | No | Api keys |
| `chatbot` | `dict` | No | A Chatbot |
| `chatbot_identifiers` | `list` | No | Chatbot identifiers |
| `child_agents` | `list` | No | Child agents |
| `conversation_logs_enabled` | `bool` | No | Whether conversation logs are enabled for the agent |
| `created_at` | `str` | No | Creation date / time |
| `deployment` | `dict` | No | Description of deployment |
| `description` | `str` | No | Description of agent |
| `functions` | `list` | No |  |
| `guardrails` | `list` | No | The guardrails the agent is attached to |
| `if_case` | `str` | No |  |
| `instruction` | `str` | No | Agent instruction. |
| `k` | `int` | No |  |
| `knowledge_bases` | `list` | No | Knowledge bases |
| `logging_config` | `dict` | No |  |
| `max_tokens` | `int` | No |  |
| `mcp_servers` | `list` | No | MCP (Model Context Protocol) servers attached to this agent |
| `model` | `dict` | No | Description of a Model |
| `model_provider_key` | `dict` | No |  |
| `model_router` | `dict` | No | Model router |
| `name` | `str` | No | Agent name |
| `openai_api_key` | `dict` | No | OpenAI API Key Info |
| `parent_agents` | `list` | No | Parent agents |
| `project_id` | `str` | No |  |
| `provide_citations` | `bool` | No | Whether the agent should provide in-response citations |
| `reasoning_effort` | `str` | No | The reasoning effort for the agent |
| `region` | `str` | No | Region code |
| `retrieval_method` | `str` | No | - RETRIEVAL_METHOD_UNKNOWN: The retrieval method is unknown - RETRIEVAL_METHOD_REWRITE: The retrieval method is rewrite - RETRIEVAL_METHOD_STEP_BACK: The retrieval method is step back - RETRIEVAL_METHOD_SUB_QUERIES: The retrieval method is… |
| `route_created_at` | `str` | No | Creation of route date / time |
| `route_created_by` | `str` | No |  |
| `route_name` | `str` | No | Route name |
| `route_uuid` | `str` | No |  |
| `tags` | `list` | No | Agent tag to organize related resources |
| `temperature` | `float` | No |  |
| `template` | `dict` | No | Represents an AgentTemplate entity |
| `thinking_token_budget` | `int` | No | The thinking token budget for Anthropic extended thinking (0 = disabled) |
| `top_p` | `float` | No |  |
| `updated_at` | `str` | No | Last modified |
| `url` | `str` | No | Access your agent under this url |
| `user_id` | `str` | No | Id of user that created the agent |
| `uuid` | `str` | No | Unique agent id |
| `version_hash` | `str` | No | The latest version of the agent |
| `vpc_egress_ips` | `list` | No | VPC Egress IPs |
| `vpc_uuid` | `str` | No |  |
| `web_fetch_enabled` | `bool` | No | Whether this agent can use the built-in web_fetch tool. |
| `web_search_enabled` | `bool` | No | Whether this agent can use the built-in web_search tool. |
| `workspace` | `dict` | No |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.ApiListAgentsByWorkspaceOutput().list({"workspace_id": "example"})
for api_list_agents_by_workspace_output in results:
    print(api_list_agents_by_workspace_output)
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ApiListAgentsByWorkspaceOutputEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ApiListEvaluationMetricsOutputEntity

```python
api_list_evaluation_metrics_output = client.ApiListEvaluationMetricsOutput()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `associated_presets` | `list` | No | Saved model evaluation presets that reference this metric. |
| `category` | `str` | No |  |
| `custom_eval_config` | `dict` | No | Configuration for a custom model-evaluation metric scored by an LLM judge. |
| `description` | `str` | No |  |
| `evaluation_scope` | `str` | No | Scope that determines whether a metric belongs to agent evaluation or model evaluation. |
| `inverted` | `bool` | No | If true, the metric is inverted, meaning that a lower value is better. |
| `is_metric_goal` | `bool` | No |  |
| `metric_name` | `str` | No |  |
| `metric_rank` | `int` | No |  |
| `metric_type` | `str` | No |  |
| `metric_uuid` | `str` | No |  |
| `metric_value_type` | `str` | No |  |
| `range_max` | `float` | No | The maximum value for the metric. |
| `range_min` | `float` | No | The minimum value for the metric. |
| `source` | `str` | No | Distinguishes platform catalog metrics from user-defined LLM-as-judge metrics. |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.ApiListEvaluationMetricsOutput().list()
for api_list_evaluation_metrics_output in results:
    print(api_list_evaluation_metrics_output)
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ApiListEvaluationMetricsOutputEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ApiListEvaluationRunsByTestCaseOutputEntity

```python
api_list_evaluation_runs_by_test_case_output = client.ApiListEvaluationRunsByTestCaseOutput()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `agent_deleted` | `bool` | No | Whether agent is deleted |
| `agent_deployment_name` | `str` | No | The agent deployment name |
| `agent_name` | `str` | No | Agent name |
| `agent_uuid` | `str` | No | Agent UUID. |
| `agent_version_hash` | `str` | No | Version hash |
| `agent_workspace_uuid` | `str` | No | Agent workspace uuid |
| `created_by_user_email` | `str` | No |  |
| `created_by_user_id` | `str` | No |  |
| `error_description` | `str` | No | The error description |
| `evaluation_run_uuid` | `str` | No | Evaluation run UUID. |
| `evaluation_test_case_workspace_uuid` | `str` | No | Evaluation test case workspace uuid |
| `finished_at` | `str` | No | Run end time. |
| `pass_status` | `bool` | No | The pass status of the evaluation run based on the star metric. |
| `queued_at` | `str` | No | Run queued time. |
| `run_level_metric_results` | `list` | No |  |
| `run_name` | `str` | No | Run name. |
| `star_metric_result` | `dict` | No |  |
| `started_at` | `str` | No | Run start time. |
| `status` | `str` | No | Evaluation Run Statuses |
| `test_case_description` | `str` | No | Test case description. |
| `test_case_name` | `str` | No | Test case name. |
| `test_case_uuid` | `str` | No | Test-case UUID. |
| `test_case_version` | `int` | No | Test-case-version. |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.ApiListEvaluationRunsByTestCaseOutput().list({"evaluation_test_case_id": "example"})
for api_list_evaluation_runs_by_test_case_output in results:
    print(api_list_evaluation_runs_by_test_case_output)
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ApiListEvaluationRunsByTestCaseOutputEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ApiListEvaluationTestCasesByWorkspaceOutputEntity

```python
api_list_evaluation_test_cases_by_workspace_output = client.ApiListEvaluationTestCasesByWorkspaceOutput()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `archived_at` | `str` | No |  |
| `created_at` | `str` | No |  |
| `created_by_user_email` | `str` | No |  |
| `created_by_user_id` | `str` | No |  |
| `dataset` | `dict` | No |  |
| `dataset_name` | `str` | No |  |
| `dataset_uuid` | `str` | No |  |
| `description` | `str` | No |  |
| `latest_version_number_of_runs` | `int` | No |  |
| `metrics` | `list` | No |  |
| `name` | `str` | No |  |
| `star_metric` | `dict` | No |  |
| `test_case_uuid` | `str` | No |  |
| `total_runs` | `int` | No |  |
| `updated_at` | `str` | No |  |
| `updated_by_user_email` | `str` | No |  |
| `updated_by_user_id` | `str` | No |  |
| `version` | `int` | No |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.ApiListEvaluationTestCasesByWorkspaceOutput().list({"workspace_id": "example"})
for api_list_evaluation_test_cases_by_workspace_output in results:
    print(api_list_evaluation_test_cases_by_workspace_output)
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ApiListEvaluationTestCasesByWorkspaceOutputEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ApiListKnowledgeBaseDataSourcesOutputEntity

```python
api_list_knowledge_base_data_sources_output = client.ApiListKnowledgeBaseDataSourcesOutput()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `aws_data_source` | `dict` | No | AWS S3 Data Source for Display |
| `bucket_name` | `str` | No | Name of storage bucket - Deprecated, moved to data_source_details |
| `chunking_algorithm` | `str` | No |  |
| `chunking_options` | `dict` | No |  |
| `created_at` | `str` | No | Creation date / time |
| `dropbox_data_source` | `dict` | No | Dropbox Data Source for Display |
| `file_upload_data_source` | `dict` | No | File to upload as data source for knowledge base. |
| `google_drive_data_source` | `dict` | No | Google Drive Data Source for Display |
| `item_path` | `str` | No | Path of folder or object in bucket - Deprecated, moved to data_source_details |
| `last_datasource_indexing_job` | `dict` | No |  |
| `region` | `str` | No | Region code - Deprecated, moved to data_source_details |
| `spaces_data_source` | `dict` | No | Spaces Bucket Data Source |
| `updated_at` | `str` | No | Last modified |
| `uuid` | `str` | No | Unique id of knowledge base |
| `web_crawler_data_source` | `dict` | No | WebCrawlerDataSource |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.ApiListKnowledgeBaseDataSourcesOutput().list({"knowledge_base_id": "example"})
for api_list_knowledge_base_data_sources_output in results:
    print(api_list_knowledge_base_data_sources_output)
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ApiListKnowledgeBaseDataSourcesOutputEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ApiListKnowledgeBaseIndexingJobsOutputEntity

```python
api_list_knowledge_base_indexing_jobs_output = client.ApiListKnowledgeBaseIndexingJobsOutput()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `completed_datasources` | `int` | No | Number of datasources indexed completed |
| `created_at` | `str` | No | Creation date / time |
| `data_source_jobs` | `list` | No | Details on Data Sources included in the Indexing Job |
| `data_source_uuids` | `list` | No |  |
| `finished_at` | `str` | No |  |
| `is_report_available` | `bool` | No | Boolean value to determine if the indexing job details are available |
| `knowledge_base_uuid` | `str` | No | Knowledge base id |
| `phase` | `str` | No |  |
| `started_at` | `str` | No |  |
| `status` | `str` | No |  |
| `tokens` | `int` | No | Number of tokens [This field is deprecated] |
| `total_datasources` | `int` | No | Number of datasources being indexed |
| `total_tokens` | `str` | No | Total Tokens Consumed By the Indexing Job |
| `updated_at` | `str` | No | Last modified |
| `uuid` | `str` | No | Unique id |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.ApiListKnowledgeBaseIndexingJobsOutput().list({"knowledge_base_id": "example"})
for api_list_knowledge_base_indexing_jobs_output in results:
    print(api_list_knowledge_base_indexing_jobs_output)
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ApiListKnowledgeBaseIndexingJobsOutputEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ApiListModelEvaluationMetricsOutputEntity

```python
api_list_model_evaluation_metrics_output = client.ApiListModelEvaluationMetricsOutput()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `associated_presets` | `list` | No | Saved model evaluation presets that reference this metric. |
| `category` | `str` | No |  |
| `custom_eval_config` | `dict` | No | Configuration for a custom model-evaluation metric scored by an LLM judge. |
| `description` | `str` | No |  |
| `evaluation_scope` | `str` | No | Scope that determines whether a metric belongs to agent evaluation or model evaluation. |
| `inverted` | `bool` | No | If true, the metric is inverted, meaning that a lower value is better. |
| `is_metric_goal` | `bool` | No |  |
| `metric_name` | `str` | No |  |
| `metric_rank` | `int` | No |  |
| `metric_type` | `str` | No |  |
| `metric_uuid` | `str` | No |  |
| `metric_value_type` | `str` | No |  |
| `range_max` | `float` | No | The maximum value for the metric. |
| `range_min` | `float` | No | The minimum value for the metric. |
| `source` | `str` | No | Distinguishes platform catalog metrics from user-defined LLM-as-judge metrics. |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.ApiListModelEvaluationMetricsOutput().list()
for api_list_model_evaluation_metrics_output in results:
    print(api_list_model_evaluation_metrics_output)
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ApiListModelEvaluationMetricsOutputEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ApiListScenarioLibraryOutputEntity

```python
api_list_scenario_library_output = client.ApiListScenarioLibraryOutput()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `category` | `str` | No | Optional grouping for catalog browsing (e.g. |
| `created_at` | `str` | No | Time created at. |
| `description` | `str` | No | Curated description. |
| `goal_description` | `str` | No | The goal this scenario set demonstrates, shown as context alongside goal-driven generation. |
| `library_scenario_uuid` | `str` | No | UUID of the library entry. |
| `name` | `str` | No | Curated display name. |
| `scenario_count` | `int` | No | Number of scenarios in the library entry. |
| `status` | `str` | No | Lifecycle status of a Common Scenario & Goal Library entry. |
| `updated_at` | `str` | No | Time last updated at. |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.ApiListScenarioLibraryOutput().list()
for api_list_scenario_library_output in results:
    print(api_list_scenario_library_output)
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ApiListScenarioLibraryOutputEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ApiListScenariosOutputEntity

```python
api_list_scenarios_output = client.ApiListScenariosOutput()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `description` | `str` | No | What the user tries to accomplish. |
| `exploration_budget` | `int` | No | Number of journeys to explore for this scenario. |
| `max_turns` | `int` | No | Turn budget for the scenario. |
| `name` | `str` | No | Human-readable name for the scenario. |
| `scenario_uuid` | `str` | No | Unique id for the scenario. |
| `stopping_criteria` | `list` | No | Judge stopping criteria. |
| `user_persona` | `str` | No | How the user communicates (tone, role). |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.ApiListScenariosOutput().list({"scenario_library_id": "example"})
for api_list_scenarios_output in results:
    print(api_list_scenarios_output)
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ApiListScenariosOutputEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ApiListSimulationJourneysOutputEntity

```python
api_list_simulation_journeys_output = client.ApiListSimulationJourneysOutput()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `created_at` | `str` | No | Time created at. |
| `duration_sec` | `str` | No | Wall-clock time taken for the journey to complete, in seconds. |
| `failure_reason` | `str` | No | Human-readable explanation of a terminal FAILED status. |
| `journey_index` | `int` | No | Zero-based index of this journey within its scenario's exploration budget. |
| `journey_uuid` | `str` | No | UUID of the journey. |
| `judge_reasoning` | `str` | No | Optional judge reasoning for the verdict. |
| `run_uuid` | `str` | No | UUID of the run this journey belongs to. |
| `scenario_uuid` | `str` | No | UUID of the scenario this journey executed. |
| `session_id` | `str` | No | Session identifier for this journey. |
| `status` | `str` | No | Lifecycle status of a single journey. |
| `token_usage` | `dict` | No | Per-actor token accounting for a run or journey. |
| `trajectory_bucket_name` | `str` | No | Object storage bucket holding the trajectory JSON. |
| `trajectory_bucket_region` | `str` | No | Object storage bucket region for the trajectory JSON. |
| `trajectory_spaces_key` | `str` | No | Object storage key for the trajectory JSON. |
| `updated_at` | `str` | No | Time last updated at. |
| `verdict` | `str` | No | The judge's verdict for a journey. |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.ApiListSimulationJourneysOutput().list({"simulation_run_id": "example"})
for api_list_simulation_journeys_output in results:
    print(api_list_simulation_journeys_output)
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ApiListSimulationJourneysOutputEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ApiModelCatalogCardEntity

```python
api_model_catalog_card = client.ApiModelCatalogCard()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `availability` | `list` | No |  |
| `badges` | `list` | No | Badges for models |
| `benchmark_score` | `dict` | No | Benchmark scores for this model, stored as arbitrary JSON |
| `capabilities` | `list` | No |  |
| `code_snippets` | `dict` | No | Code examples for using the model |
| `context_window` | `str` | No | Specs (same as Entry) |
| `created_at` | `str` | No | RFC 3339 timestamp indicating when the model was added to the catalog. |
| `creator` | `str` | No | Model creator/developer (e.g., "Meta", "Anthropic", "OpenAI") |
| `description` | `str` | No | Card-specific |
| `hugging_face_id` | `str` | No | The Hugging Face repository ID (e.g. |
| `id` | `str` | No | Identity (same as Entry) |
| `max_output_tokens` | `str` | No | The maximum number of output tokens the model can generate in a single response. |
| `modalities` | `dict` | No | Input/output modalities |
| `model_id` | `str` | No | Model identifier used for API calls (e.g., "llama3.1-70b-instruct") |
| `name` | `str` | No |  |
| `parameter_count` | `float` | No |  |
| `pricing` | `dict` | No | Pricing per million tokens (aligns with existing ModelPrice pattern) |
| `pricing_detail` | `dict` | No | The complete set of prices for a model, covering every available variant. |
| `provider` | `str` | No |  |
| `scaled_pricing_enabled` | `bool` | No | True when this model's pricing varies over time. |
| `short_description` | `str` | No |  |
| `type` | `str` | No |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.ApiModelCatalogCard().list()
for api_model_catalog_card in results:
    print(api_model_catalog_card)
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.ApiModelCatalogCard().load({"id": "api_model_catalog_card_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ApiModelCatalogCardEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ApiModelEvaluationPresetEntity

```python
api_model_evaluation_preset = client.ApiModelEvaluationPreset()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `candidate_inference_config` | `dict` | No | Inference configuration for the candidate model during evaluation. |
| `candidate_model_name` | `str` | No | Model slug used to call the candidate model API. |
| `candidate_model_source` | `str` | No | Whether the candidate is a served model (serverless platform, a dedicated deployment, or a model router) or an OHS-hosted agent config. |
| `candidate_model_uuid` | `str` | No | UUID of the candidate model stored on this preset. |
| `candidate_system_prompt` | `str` | No | System prompt / instructions to send to the candidate model. |
| `created_at` | `str` | No | Timestamp when the preset was created. |
| `dataset_name` | `str` | No | Display name of the dataset stored on this preset. |
| `dataset_uuid` | `str` | No | UUID of the dataset stored on this preset. |
| `eval_preset_uuid` | `str` | No | UUID of the evaluation preset. |
| `id` | `str` | No |  |
| `judge_model_name` | `str` | No | Display name of the judge model stored on this preset. |
| `judge_model_uuid` | `str` | No | UUID of the judge model stored on this preset. |
| `metrics` | `list` | No | Metrics selected for this preset. |
| `name` | `str` | No | Name of the evaluation preset. |
| `saved_sections` | `list` | No | Sections of the inline evaluation config that were persisted when this preset was created. |
| `star_metric` | `dict` | No |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.ApiModelEvaluationPreset().list()
for api_model_evaluation_preset in results:
    print(api_model_evaluation_preset)
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.ApiModelEvaluationPreset().load({"id": "api_model_evaluation_preset_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ApiModelEvaluationPresetEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ApiModelPublicEntity

```python
api_model_public = client.ApiModelPublic()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `agreement` | `dict` | No | Agreement Description |
| `benchmark_score` | `dict` | No | Benchmark scores for this model, stored as arbitrary JSON |
| `capabilities` | `list` | No | Model capabilities (inference, reasoning, vectorization, etc.) |
| `context_window` | `str` | No | Context window (maximum tokens) |
| `created_at` | `str` | No | Creation date / time |
| `description` | `str` | No | Model description |
| `endpoints` | `list` | No | Available endpoints and their capabilities |
| `id` | `str` | No | Human-readable model identifier |
| `is_foundational` | `bool` | No | True if it is a foundational model provided by do |
| `kb_default_chunk_size` | `int` | No | Default chunking size limit to show in UI |
| `kb_max_chunk_size` | `int` | No | Maximum chunk size limit of model |
| `kb_min_chunk_size` | `int` | No | Minimum chunking size token limits if model supports KNOWLEDGEBASE usecase |
| `lifecycle_status` | `str` | No | Lifecycle status of the model (internal, public-preview, active, deprecated, end_of_life) |
| `modalities` | `dict` | No | Input/output modalities |
| `model_availability` | `str` | No | Model availability (serverless, dedicated, etc.) |
| `name` | `str` | No | Display name of the model |
| `parameter_count` | `float` | No | Parameter count in billions |
| `parent_uuid` | `str` | No | Unique id of the model, this model is based on |
| `pricing` | `dict` | No | Pricing per million tokens (aligns with existing ModelPrice pattern) |
| `provider` | `str` | No |  |
| `reasoning_efforts` | `list` | No | Available reasoning efforts for this model |
| `settings` | `list` | No | Playground settings derived from model metadata |
| `thinking` | `bool` | No | Whether this model supports extended thinking (Anthropic models) |
| `type` | `str` | No | Model type (chat, embedding, image, reasoning, coding) |
| `updated_at` | `str` | No | Last modified |
| `upload_complete` | `bool` | No | Model has been fully uploaded |
| `url` | `str` | No | Download url |
| `uuid` | `str` | No | Unique id |
| `version` | `dict` | No | Version Information about a Model |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.ApiModelPublic().list()
for api_model_public in results:
    print(api_model_public)
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ApiModelPublicEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ApiModelRouterPresetEntity

```python
api_model_router_preset = client.ApiModelRouterPreset()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `config` | `dict` | No |  |
| `display_name` | `str` | No | Display name for UI surfaces |
| `long_description` | `str` | No | Long description for details views |
| `short_description` | `str` | No | Short description for list views |
| `slug` | `str` | No | Stable slug for routing usage |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.ApiModelRouterPreset().list()
for api_model_router_preset in results:
    print(api_model_router_preset)
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ApiModelRouterPresetEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ApiModelRouterTaskPresetEntity

```python
api_model_router_task_preset = client.ApiModelRouterTaskPreset()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `category` | `str` | No | Higher-level grouping used by the UI |
| `description` | `str` | No | Task description |
| `models` | `list` | No | Default models assigned to this task |
| `name` | `str` | No | Display name |
| `selection_policy` | `dict` | No | Selection policy preference for choosing among assigned models. |
| `tags` | `list` | No | Lightweight labels for filtering |
| `task_slug` | `str` | No | Task slug |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.ApiModelRouterTaskPreset().list()
for api_model_router_task_preset in results:
    print(api_model_router_task_preset)
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ApiModelRouterTaskPresetEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ApiMoveAgentsToWorkspaceOutputEntity

```python
api_move_agents_to_workspace_output = client.ApiMoveAgentsToWorkspaceOutput()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `agent_uuids` | `list` | No | Agent uuids |
| `agents` | `list` | No | Agents |
| `created_at` | `str` | No | Creation date |
| `created_by` | `str` | No | The id of user who created this workspace |
| `created_by_email` | `str` | No | The email of the user who created this workspace |
| `deleted_at` | `str` | No | Deleted date |
| `description` | `str` | No | Description of the workspace |
| `evaluation_test_cases` | `list` | No | Evaluations |
| `name` | `str` | No | Name of the workspace |
| `updated_at` | `str` | No | Update date |
| `uuid` | `str` | No | Unique id |
| `workspace_uuid` | `str` | No | Workspace uuid to move agents to |

### Operations

#### `update(reqdata, ctrl=None) -> dict`

Update an existing entity. The data must include the entity `id`. Returns the updated entity data and raises on error.

```python
result = client.ApiMoveAgentsToWorkspaceOutput().update({
    "workspace_id": "workspace_id",
    # Fields to update
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ApiMoveAgentsToWorkspaceOutputEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ApiPromptEntity

```python
api_prompt = client.ApiPrompt()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `evaluation_trace_spans` | `list` | No | The evaluated trace spans. |
| `ground_truth` | `str` | No | The ground truth for the prompt. |
| `input` | `str` | No |  |
| `input_tokens` | `str` | No | The number of input tokens used in the prompt. |
| `output` | `str` | No |  |
| `output_tokens` | `str` | No | The number of output tokens used in the prompt. |
| `prompt_chunks` | `list` | No | The list of prompt chunks. |
| `prompt_id` | `int` | No | Prompt ID |
| `prompt_level_metric_results` | `list` | No | The metric results for the prompt. |
| `trace_id` | `str` | No | The trace id for the prompt. |

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.ApiPrompt().load({"evaluation_run_id": "evaluation_run_id", "prompt_id": 1})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ApiPromptEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ApiRollbackToAgentVersionOutputEntity

```python
api_rollback_to_agent_version_output = client.ApiRollbackToAgentVersionOutput()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `audit_header` | `dict` | No | An alternative way to provide auth information. |
| `uuid` | `str` | No | Agent unique identifier |
| `version_hash` | `str` | No | Unique identifier |

### Operations

#### `update(reqdata, ctrl=None) -> dict`

Update an existing entity. The data must include the entity `id`. Returns the updated entity data and raises on error.

```python
result = client.ApiRollbackToAgentVersionOutput().update({
    "agent_id": "agent_id",
    # Fields to update
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ApiRollbackToAgentVersionOutputEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ApiSimulationJourneyEntity

```python
api_simulation_journey = client.ApiSimulationJourney()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `created_at` | `str` | No | Time created at. |
| `duration_sec` | `str` | No | Wall-clock time taken for the journey to complete, in seconds. |
| `failure_reason` | `str` | No | Human-readable explanation of a terminal FAILED status. |
| `id` | `str` | No |  |
| `journey_index` | `int` | No | Zero-based index of this journey within its scenario's exploration budget. |
| `journey_uuid` | `str` | No | UUID of the journey. |
| `judge_reasoning` | `str` | No | Optional judge reasoning for the verdict. |
| `run_uuid` | `str` | No | UUID of the run this journey belongs to. |
| `scenario_uuid` | `str` | No | UUID of the scenario this journey executed. |
| `session_id` | `str` | No | Session identifier for this journey. |
| `status` | `str` | No | Lifecycle status of a single journey. |
| `token_usage` | `dict` | No | Per-actor token accounting for a run or journey. |
| `trajectory_bucket_name` | `str` | No | Object storage bucket holding the trajectory JSON. |
| `trajectory_bucket_region` | `str` | No | Object storage bucket region for the trajectory JSON. |
| `trajectory_spaces_key` | `str` | No | Object storage key for the trajectory JSON. |
| `updated_at` | `str` | No | Time last updated at. |
| `verdict` | `str` | No | The judge's verdict for a journey. |

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.ApiSimulationJourney().load({"id": "api_simulation_journey_id", "simulation_run_id": "simulation_run_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ApiSimulationJourneyEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ApiSimulationTrajectoryEntity

```python
api_simulation_trajectory = client.ApiSimulationTrajectory()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `agent_id` | `str` | No | Identifier of the candidate agent under test for this journey. |
| `completed_at` | `str` | No |  |
| `duration_sec` | `str` | No |  |
| `evaluation_metrics` | `list` | No | Per-metric scores and judge reasoning for this trajectory. |
| `failure_reason` | `str` | No |  |
| `journey_index` | `int` | No |  |
| `journey_uuid` | `str` | No |  |
| `judge` | `dict` | No | Judge output embedded in the trajectory JSON. |
| `max_turns` | `int` | No | Turn budget configured for this journey (per-scenario max_turns, after any run-level override). |
| `messages` | `list` | No |  |
| `run_uuid` | `str` | No |  |
| `scenario_uuid` | `str` | No |  |
| `session_id` | `str` | No |  |
| `started_at` | `str` | No |  |
| `status` | `str` | No | Lifecycle status of the trajectory. |
| `token_usage` | `dict` | No | Per-actor token accounting for a run or journey. |
| `turn_count` | `int` | No |  |
| `verdict` | `str` | No | The judge's verdict for a journey. |

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.ApiSimulationTrajectory().load({"journey_id": "journey_id", "simulation_run_id": "simulation_run_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ApiSimulationTrajectoryEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ApiUnlinkAgentFunctionOutputEntity

```python
api_unlink_agent_function_output = client.ApiUnlinkAgentFunctionOutput()
```

### Operations

#### `remove(reqmatch, ctrl=None) -> dict`

Remove the entity matching the given criteria. Raises on error.

```python
result = client.ApiUnlinkAgentFunctionOutput().remove({"agent_id": "agent_id", "function_uuid": "function_uuid"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ApiUnlinkAgentFunctionOutputEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ApiUnlinkAgentGuardrailOutputEntity

```python
api_unlink_agent_guardrail_output = client.ApiUnlinkAgentGuardrailOutput()
```

### Operations

#### `remove(reqmatch, ctrl=None) -> dict`

Remove the entity matching the given criteria. Raises on error.

```python
result = client.ApiUnlinkAgentGuardrailOutput().remove({"agent_id": "agent_id", "guardrail_uuid": "guardrail_uuid"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ApiUnlinkAgentGuardrailOutputEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ApiUnlinkAgentOutputEntity

```python
api_unlink_agent_output = client.ApiUnlinkAgentOutput()
```

### Operations

#### `remove(reqmatch, ctrl=None) -> dict`

Remove the entity matching the given criteria. Raises on error.

```python
result = client.ApiUnlinkAgentOutput().remove({"agent_id": "agent_id", "child_agent_uuid": "child_agent_uuid"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ApiUnlinkAgentOutputEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ApiUnlinkKnowledgeBaseOutputEntity

```python
api_unlink_knowledge_base_output = client.ApiUnlinkKnowledgeBaseOutput()
```

### Operations

#### `remove(reqmatch, ctrl=None) -> dict`

Remove the entity matching the given criteria. Raises on error.

```python
result = client.ApiUnlinkKnowledgeBaseOutput().remove({"agent_id": "agent_id", "knowledge_base_uuid": "knowledge_base_uuid"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ApiUnlinkKnowledgeBaseOutputEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ApiUpdateAgentApiKeyOutputEntity

```python
api_update_agent_api_key_output = client.ApiUpdateAgentApiKeyOutput()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `agent_uuid` | `str` | No | Agent id |
| `api_key_uuid` | `str` | No | API key ID |
| `created_at` | `str` | No | Creation date |
| `created_by` | `str` | No | Created by |
| `deleted_at` | `str` | No | Deleted date |
| `name` | `str` | No | Name |
| `secret_key` | `str` | No |  |
| `uuid` | `str` | No | Uuid |

### Operations

#### `update(reqdata, ctrl=None) -> dict`

Update an existing entity. The data must include the entity `id`. Returns the updated entity data and raises on error.

```python
result = client.ApiUpdateAgentApiKeyOutput().update({
    "agent_id": "agent_id",
    "api_key_uuid": "api_key_uuid",
    # Fields to update
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ApiUpdateAgentApiKeyOutputEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ApiUpdateAgentFunctionOutputEntity

```python
api_update_agent_function_output = client.ApiUpdateAgentFunctionOutput()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `agent_uuid` | `str` | No | Agent id |
| `anthropic_api_key` | `dict` | No | Anthropic API Key Info |
| `api_key_infos` | `list` | No | Api key infos |
| `api_keys` | `list` | No | Api keys |
| `chatbot` | `dict` | No | A Chatbot |
| `chatbot_identifiers` | `list` | No | Chatbot identifiers |
| `child_agents` | `list` | No | Child agents |
| `conversation_logs_enabled` | `bool` | No | Whether conversation logs are enabled for the agent |
| `created_at` | `str` | No | Creation date / time |
| `deployment` | `dict` | No | Description of deployment |
| `description` | `str` | No | Description of agent |
| `faas_name` | `str` | No | The name of the function in the DigitalOcean functions platform |
| `faas_namespace` | `str` | No | The namespace of the function in the DigitalOcean functions platform |
| `function_name` | `str` | No | Function name |
| `function_uuid` | `str` | No | Function id |
| `functions` | `list` | No |  |
| `guardrails` | `list` | No | The guardrails the agent is attached to |
| `if_case` | `str` | No |  |
| `input_schema` | `dict` | No | Describe the input schema for the function so the agent may call it |
| `instruction` | `str` | No | Agent instruction. |
| `k` | `int` | No |  |
| `knowledge_bases` | `list` | No | Knowledge bases |
| `logging_config` | `dict` | No |  |
| `max_tokens` | `int` | No |  |
| `mcp_servers` | `list` | No | MCP (Model Context Protocol) servers attached to this agent |
| `model` | `dict` | No | Description of a Model |
| `model_provider_key` | `dict` | No |  |
| `model_router` | `dict` | No | Model router |
| `name` | `str` | No | Agent name |
| `openai_api_key` | `dict` | No | OpenAI API Key Info |
| `output_schema` | `dict` | No | Describe the output schema for the function so the agent handle its response |
| `parent_agents` | `list` | No | Parent agents |
| `project_id` | `str` | No |  |
| `provide_citations` | `bool` | No | Whether the agent should provide in-response citations |
| `reasoning_effort` | `str` | No | The reasoning effort for the agent |
| `region` | `str` | No | Region code |
| `retrieval_method` | `str` | No | - RETRIEVAL_METHOD_UNKNOWN: The retrieval method is unknown - RETRIEVAL_METHOD_REWRITE: The retrieval method is rewrite - RETRIEVAL_METHOD_STEP_BACK: The retrieval method is step back - RETRIEVAL_METHOD_SUB_QUERIES: The retrieval method is… |
| `route_created_at` | `str` | No | Creation of route date / time |
| `route_created_by` | `str` | No |  |
| `route_name` | `str` | No | Route name |
| `route_uuid` | `str` | No |  |
| `tags` | `list` | No | Agent tag to organize related resources |
| `temperature` | `float` | No |  |
| `template` | `dict` | No | Represents an AgentTemplate entity |
| `thinking_token_budget` | `int` | No | The thinking token budget for Anthropic extended thinking (0 = disabled) |
| `top_p` | `float` | No |  |
| `updated_at` | `str` | No | Last modified |
| `url` | `str` | No | Access your agent under this url |
| `user_id` | `str` | No | Id of user that created the agent |
| `uuid` | `str` | No | Unique agent id |
| `version_hash` | `str` | No | The latest version of the agent |
| `vpc_egress_ips` | `list` | No | VPC Egress IPs |
| `vpc_uuid` | `str` | No |  |
| `web_fetch_enabled` | `bool` | No | Whether this agent can use the built-in web_fetch tool. |
| `web_search_enabled` | `bool` | No | Whether this agent can use the built-in web_search tool. |
| `workspace` | `dict` | No |  |

### Operations

#### `update(reqdata, ctrl=None) -> dict`

Update an existing entity. The data must include the entity `id`. Returns the updated entity data and raises on error.

```python
result = client.ApiUpdateAgentFunctionOutput().update({
    "agent_id": "agent_id",
    "function_uuid": "function_uuid",
    # Fields to update
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ApiUpdateAgentFunctionOutputEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ApiUpdateAgentOutputEntity

```python
api_update_agent_output = client.ApiUpdateAgentOutput()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `agent_log_insights_enabled` | `bool` | No |  |
| `allowed_domains` | `list` | No | Optional list of allowed domains for the chatbot - Must use fully qualified domain name (FQDN) such as https://example.com |
| `anthropic_api_key` | `dict` | No | Anthropic API Key Info |
| `anthropic_key_uuid` | `str` | No | Optional anthropic key uuid for use with anthropic models |
| `api_key_infos` | `list` | No | Api key infos |
| `api_keys` | `list` | No | Api keys |
| `chatbot` | `dict` | No | A Chatbot |
| `chatbot_identifiers` | `list` | No | Chatbot identifiers |
| `child_agents` | `list` | No | Child agents |
| `clear_mcp_servers` | `bool` | No | When true, removes all MCP servers from the agent. |
| `conversation_logs_enabled` | `bool` | No | Whether conversation logs are enabled for the agent |
| `created_at` | `str` | No | Creation date / time |
| `deployment` | `dict` | No | Description of deployment |
| `description` | `str` | No | Description of agent |
| `functions` | `list` | No |  |
| `guardrails` | `list` | No | The guardrails the agent is attached to |
| `if_case` | `str` | No |  |
| `instruction` | `str` | No | Agent instruction. |
| `k` | `int` | No | How many results should be considered from an attached knowledge base |
| `knowledge_bases` | `list` | No | Knowledge bases |
| `logging_config` | `dict` | No |  |
| `max_tokens` | `int` | No | Specifies the maximum number of tokens the model can process in a single input or output, set as a number between 1 and 512. |
| `mcp_servers` | `list` | No | MCP (Model Context Protocol) servers attached to this agent |
| `model` | `dict` | No | Description of a Model |
| `model_provider_key` | `dict` | No |  |
| `model_provider_key_uuid` | `str` | No | Optional Model Provider uuid for use with provider models |
| `model_router` | `dict` | No | Model router |
| `model_router_uuid` | `str` | No |  |
| `model_uuid` | `str` | No | Identifier for the foundation model. |
| `name` | `str` | No | Agent name |
| `open_ai_key_uuid` | `str` | No | Optional OpenAI key uuid for use with OpenAI models |
| `openai_api_key` | `dict` | No | OpenAI API Key Info |
| `parent_agents` | `list` | No | Parent agents |
| `project_id` | `str` | No | The id of the DigitalOcean project this agent will belong to |
| `provide_citations` | `bool` | No | Whether the agent should provide in-response citations |
| `reasoning_effort` | `str` | No | The reasoning effort for the agent |
| `region` | `str` | No | Region code |
| `retrieval_method` | `str` | No | - RETRIEVAL_METHOD_UNKNOWN: The retrieval method is unknown - RETRIEVAL_METHOD_REWRITE: The retrieval method is rewrite - RETRIEVAL_METHOD_STEP_BACK: The retrieval method is step back - RETRIEVAL_METHOD_SUB_QUERIES: The retrieval method is… |
| `route_created_at` | `str` | No | Creation of route date / time |
| `route_created_by` | `str` | No |  |
| `route_name` | `str` | No | Route name |
| `route_uuid` | `str` | No |  |
| `router_preset_slug` | `str` | No |  |
| `tags` | `list` | No | Agent tag to organize related resources |
| `temperature` | `float` | No | Controls the model’s creativity, specified as a number between 0 and 1. |
| `template` | `dict` | No | Represents an AgentTemplate entity |
| `thinking_token_budget` | `int` | No | The thinking token budget for Anthropic extended thinking (0 = disabled) |
| `top_p` | `float` | No | Defines the cumulative probability threshold for word selection, specified as a number between 0 and 1. |
| `updated_at` | `str` | No | Last modified |
| `url` | `str` | No | Access your agent under this url |
| `user_id` | `str` | No | Id of user that created the agent |
| `uuid` | `str` | No | Unique agent id |
| `version_hash` | `str` | No | The latest version of the agent |
| `vpc_egress_ips` | `list` | No | VPC Egress IPs |
| `vpc_uuid` | `str` | No |  |
| `web_fetch_enabled` | `bool` | No | Whether this agent can use the built-in web_fetch tool. |
| `web_search_enabled` | `bool` | No | Whether this agent can use the built-in web_search tool. |
| `workspace` | `dict` | No |  |

### Operations

#### `update(reqdata, ctrl=None) -> dict`

Update an existing entity. The data must include the entity `id`. Returns the updated entity data and raises on error.

```python
result = client.ApiUpdateAgentOutput().update({
    "uuid": "uuid",
    # Fields to update
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ApiUpdateAgentOutputEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ApiUpdateAnthropicApiKeyOutputEntity

```python
api_update_anthropic_api_key_output = client.ApiUpdateAnthropicApiKeyOutput()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `api_key` | `str` | No | Anthropic API key |
| `api_key_uuid` | `str` | No | API key ID |
| `created_at` | `str` | No | Key creation date |
| `created_by` | `str` | No | Created by user id from DO |
| `deleted_at` | `str` | No | Key deleted date |
| `name` | `str` | No | Name |
| `updated_at` | `str` | No | Key last updated date |
| `uuid` | `str` | No | Uuid |

### Operations

#### `update(reqdata, ctrl=None) -> dict`

Update an existing entity. The data must include the entity `id`. Returns the updated entity data and raises on error.

```python
result = client.ApiUpdateAnthropicApiKeyOutput().update({
    "api_key_uuid": "api_key_uuid",
    # Fields to update
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ApiUpdateAnthropicApiKeyOutputEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ApiUpdateCustomEvaluationMetricOutputEntity

```python
api_update_custom_evaluation_metric_output = client.ApiUpdateCustomEvaluationMetricOutput()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `associated_presets` | `list` | No | Saved model evaluation presets that reference this metric. |
| `category` | `str` | No |  |
| `config` | `dict` | No | Configuration for a custom model-evaluation metric scored by an LLM judge. |
| `custom_eval_config` | `dict` | No | Configuration for a custom model-evaluation metric scored by an LLM judge. |
| `description` | `str` | No |  |
| `evaluation_scope` | `str` | No | Scope that determines whether a metric belongs to agent evaluation or model evaluation. |
| `inverted` | `bool` | No | If true, the metric is inverted, meaning that a lower value is better. |
| `is_metric_goal` | `bool` | No |  |
| `metric_name` | `str` | No |  |
| `metric_rank` | `int` | No |  |
| `metric_type` | `str` | No |  |
| `metric_uuid` | `str` | No |  |
| `metric_value_type` | `str` | No |  |
| `range_max` | `float` | No | The maximum value for the metric. |
| `range_min` | `float` | No | The minimum value for the metric. |
| `source` | `str` | No | Distinguishes platform catalog metrics from user-defined LLM-as-judge metrics. |

### Operations

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.ApiUpdateCustomEvaluationMetricOutput().create({
})
```

#### `update(reqdata, ctrl=None) -> dict`

Update an existing entity. The data must include the entity `id`. Returns the updated entity data and raises on error.

```python
result = client.ApiUpdateCustomEvaluationMetricOutput().update({
    "metric_uuid": "metric_uuid",
    # Fields to update
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ApiUpdateCustomEvaluationMetricOutputEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ApiUpdateEvaluationTestCaseOutputEntity

```python
api_update_evaluation_test_case_output = client.ApiUpdateEvaluationTestCaseOutput()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `dataset_uuid` | `str` | No | Dataset against which the test‑case is executed. |
| `description` | `str` | No | Description of the test case. |
| `metrics` | `dict` | No |  |
| `name` | `str` | No | Name of the test case. |
| `star_metric` | `dict` | No |  |
| `test_case_uuid` | `str` | No | Test-case UUID to update |
| `version` | `int` | No | The new verson of the test case. |

### Operations

#### `update(reqdata, ctrl=None) -> dict`

Update an existing entity. The data must include the entity `id`. Returns the updated entity data and raises on error.

```python
result = client.ApiUpdateEvaluationTestCaseOutput().update({
    "test_case_uuid": "test_case_uuid",
    # Fields to update
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ApiUpdateEvaluationTestCaseOutputEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ApiUpdateKnowledgeBaseDataSourceOutputEntity

```python
api_update_knowledge_base_data_source_output = client.ApiUpdateKnowledgeBaseDataSourceOutput()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `aws_data_source` | `dict` | No | AWS S3 Data Source for Display |
| `bucket_name` | `str` | No | Name of storage bucket - Deprecated, moved to data_source_details |
| `chunking_algorithm` | `str` | No |  |
| `chunking_options` | `dict` | No |  |
| `created_at` | `str` | No | Creation date / time |
| `data_source_uuid` | `str` | No | Data Source ID (Path Parameter) |
| `dropbox_data_source` | `dict` | No | Dropbox Data Source for Display |
| `file_upload_data_source` | `dict` | No | File to upload as data source for knowledge base. |
| `google_drive_data_source` | `dict` | No | Google Drive Data Source for Display |
| `item_path` | `str` | No | Path of folder or object in bucket - Deprecated, moved to data_source_details |
| `knowledge_base_uuid` | `str` | No | Knowledge Base ID (Path Parameter) |
| `last_datasource_indexing_job` | `dict` | No |  |
| `region` | `str` | No | Region code - Deprecated, moved to data_source_details |
| `spaces_data_source` | `dict` | No | Spaces Bucket Data Source |
| `updated_at` | `str` | No | Last modified |
| `uuid` | `str` | No | Unique id of knowledge base |
| `web_crawler_data_source` | `dict` | No | WebCrawlerDataSource |

### Operations

#### `update(reqdata, ctrl=None) -> dict`

Update an existing entity. The data must include the entity `id`. Returns the updated entity data and raises on error.

```python
result = client.ApiUpdateKnowledgeBaseDataSourceOutput().update({
    "data_source_uuid": "data_source_uuid",
    "knowledge_base_id": "knowledge_base_id",
    # Fields to update
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ApiUpdateKnowledgeBaseDataSourceOutputEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ApiUpdateKnowledgeBaseOutputEntity

```python
api_update_knowledge_base_output = client.ApiUpdateKnowledgeBaseOutput()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `added_to_agent_at` | `str` | No | Time when the knowledge base was added to the agent |
| `created_at` | `str` | No | Creation date / time |
| `database_id` | `str` | No | Identifier of the DigitalOcean OpenSearch database this knowledge base will use, optional. |
| `datasources` | `list` | No | Optional data sources to attach at creation. |
| `embedding_model_uuid` | `str` | No | Identifier for the [embedding model](https://docs.digitalocean.com/products/genai-platform/details/models/#embedding-models). |
| `is_public` | `bool` | No | Whether the knowledge base is public or not |
| `last_indexing_job` | `dict` | No | IndexingJob description |
| `name` | `str` | No | Name of knowledge base |
| `project_id` | `str` | No | Identifier of the DigitalOcean project this knowledge base will belong to. |
| `region` | `str` | No | Region code |
| `reranking_config` | `dict` | No | Configuration for cross-encoder reranking during retrieval. |
| `size` | `str` | No |  |
| `tags` | `list` | No | Tags to organize related resources |
| `updated_at` | `str` | No | Last modified |
| `user_id` | `str` | No | Id of user that created the knowledge base |
| `uuid` | `str` | No | Unique id for knowledge base |
| `vpc_uuid` | `str` | No | The VPC to deploy the knowledge base database in |

### Operations

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.ApiUpdateKnowledgeBaseOutput().create({
})
```

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.ApiUpdateKnowledgeBaseOutput().list()
for api_update_knowledge_base_output in results:
    print(api_update_knowledge_base_output)
```

#### `update(reqdata, ctrl=None) -> dict`

Update an existing entity. The data must include the entity `id`. Returns the updated entity data and raises on error.

```python
result = client.ApiUpdateKnowledgeBaseOutput().update({
    "uuid": "uuid",
    # Fields to update
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ApiUpdateKnowledgeBaseOutputEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ApiUpdateLinkedAgentOutputEntity

```python
api_update_linked_agent_output = client.ApiUpdateLinkedAgentOutput()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `child_agent_uuid` | `str` | No | Routed agent id |
| `if_case` | `str` | No | Describes the case in which the child agent should be used |
| `parent_agent_uuid` | `str` | No | A unique identifier for the parent agent. |
| `rollback` | `bool` | No |  |
| `route_name` | `str` | No | Route name |
| `uuid` | `str` | No | Unique id of linkage |

### Operations

#### `update(reqdata, ctrl=None) -> dict`

Update an existing entity. The data must include the entity `id`. Returns the updated entity data and raises on error.

```python
result = client.ApiUpdateLinkedAgentOutput().update({
    "agent_id": "agent_id",
    "child_agent_uuid": "child_agent_uuid",
    # Fields to update
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ApiUpdateLinkedAgentOutputEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ApiUpdateModelApiKeyOutputEntity

```python
api_update_model_api_key_output = client.ApiUpdateModelApiKeyOutput()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `api_key_uuid` | `str` | No | API key ID |
| `created_at` | `str` | No | Creation date |
| `created_by` | `str` | No | Created by |
| `deleted_at` | `str` | No | Deleted date |
| `name` | `str` | No | Name |
| `secret_key` | `str` | No |  |
| `uuid` | `str` | No | Uuid |

### Operations

#### `update(reqdata, ctrl=None) -> dict`

Update an existing entity. The data must include the entity `id`. Returns the updated entity data and raises on error.

```python
result = client.ApiUpdateModelApiKeyOutput().update({
    "api_key_uuid": "api_key_uuid",
    # Fields to update
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ApiUpdateModelApiKeyOutputEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ApiUpdateModelEvaluationRunOutputEntity

```python
api_update_model_evaluation_run_output = client.ApiUpdateModelEvaluationRunOutput()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `candidate_inference_config` | `dict` | No | Inference configuration for the candidate model during evaluation. |
| `candidate_model_name` | `str` | No | Model slug used to call the candidate model API. |
| `candidate_model_source` | `str` | No | Whether the candidate is a served model (serverless platform, a dedicated deployment, or a model router) or an OHS-hosted agent config. |
| `candidate_model_uuid` | `str` | No | UUID of the candidate model to evaluate. |
| `created_at` | `str` | No | Timestamp when the run was created. |
| `dataset_name` | `str` | No | Name of the dataset used for evaluation. |
| `dataset_uuid` | `str` | No | UUID of the dataset to use for evaluation. |
| `epochs` | `int` | No | Number of times to evaluate each dataset row (n-pass/epochs), so the result reports avg@k/pass@k/cons@k instead of a single score. |
| `eval_preset_uuid` | `str` | No |  |
| `eval_run_uuid` | `str` | No | UUID of the created evaluation run. |
| `judge_model_name` | `str` | No |  |
| `judge_model_uuid` | `str` | No | UUID of the judge model used to score responses. |
| `metric_uuids` | `list` | No | UUIDs of metrics to evaluate (selected from ListModelEvaluationMetrics). |
| `name` | `str` | No | Name of the evaluation run. |
| `preset_name` | `str` | No |  |
| `preset_save_sections` | `list` | No | Which sections of this run's resolved configuration to persist as a reusable preset. |
| `progress` | `dict` | No | Per-phase progress for a model evaluation run. |
| `save_as_preset` | `bool` | No | Deprecated: use `preset_save_sections`. |
| `source` | `str` | No | Source of the run creation (api, sdk, cli). |
| `star_metric` | `dict` | No |  |
| `status` | `str` | No | Model Evaluation Run Statuses |

### Operations

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.ApiUpdateModelEvaluationRunOutput().create({
})
```

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.ApiUpdateModelEvaluationRunOutput().list()
for api_update_model_evaluation_run_output in results:
    print(api_update_model_evaluation_run_output)
```

#### `update(reqdata, ctrl=None) -> dict`

Update an existing entity. The data must include the entity `id`. Returns the updated entity data and raises on error.

```python
result = client.ApiUpdateModelEvaluationRunOutput().update({
    "eval_run_uuid": "eval_run_uuid",
    # Fields to update
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ApiUpdateModelEvaluationRunOutputEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ApiUpdateModelRouterOutputEntity

```python
api_update_model_router_output = client.ApiUpdateModelRouterOutput()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `config` | `dict` | No |  |
| `created_at` | `str` | No | Creation date / time |
| `description` | `str` | No | Description |
| `fallback_models` | `list` | No |  |
| `name` | `str` | No | Name of the model router |
| `policies` | `list` | No | Router policies |
| `regions` | `list` | No | Target regions for the router |
| `updated_at` | `str` | No | Last modified |
| `uuid` | `str` | No | Unique id |

### Operations

#### `update(reqdata, ctrl=None) -> dict`

Update an existing entity. The data must include the entity `id`. Returns the updated entity data and raises on error.

```python
result = client.ApiUpdateModelRouterOutput().update({
    "uuid": "uuid",
    # Fields to update
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ApiUpdateModelRouterOutputEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ApiUpdateOpenAiapiKeyOutputEntity

```python
api_update_open_aiapi_key_output = client.ApiUpdateOpenAiapiKeyOutput()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `api_key` | `str` | No | OpenAI API key |
| `api_key_uuid` | `str` | No | API key ID |
| `created_at` | `str` | No | Key creation date |
| `created_by` | `str` | No | Created by user id from DO |
| `deleted_at` | `str` | No | Key deleted date |
| `models` | `list` | No | Models supported by the openAI api key |
| `name` | `str` | No | Name |
| `updated_at` | `str` | No | Key last updated date |
| `uuid` | `str` | No | Uuid |

### Operations

#### `update(reqdata, ctrl=None) -> dict`

Update an existing entity. The data must include the entity `id`. Returns the updated entity data and raises on error.

```python
result = client.ApiUpdateOpenAiapiKeyOutput().update({
    "api_key_uuid": "api_key_uuid",
    # Fields to update
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ApiUpdateOpenAiapiKeyOutputEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ApiUpdateScenarioSetOutputEntity

```python
api_update_scenario_set_output = client.ApiUpdateScenarioSetOutput()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `bucket_name` | `str` | No | Object storage bucket holding the scenario file. |
| `bucket_region` | `str` | No | Object storage bucket region. |
| `created_at` | `str` | No | Time created at. |
| `deleted_at` | `str` | No | Time deleted at. |
| `description` | `str` | No | Customer-supplied description. |
| `failure_reason` | `str` | No | Human-readable explanation of a terminal FAILED status. |
| `generator_model_uuid` | `str` | No | Model that produced the scenarios. |
| `library_scenario_uuid` | `str` | No | UUID of the source library entry. |
| `name` | `str` | No | Customer-supplied name. |
| `scenario_count` | `int` | No | Number of scenarios in the set. |
| `scenario_set_uuid` | `str` | No | UUID of the scenario set. |
| `scenarios` | `list` | No | Optional inline scenarios to replace the set contents. |
| `source_export_id` | `str` | No | Signals export UUID that produced this set. |
| `source_goal_description` | `str` | No | The goal that drove generation. |
| `source_kind` | `str` | No | How a scenario set was created. |
| `spaces_key` | `str` | No | Object storage key for the scenario file. |
| `status` | `str` | No | Lifecycle status of a scenario set. |
| `updated_at` | `str` | No | Time last updated at. |
| `workflow_uuid` | `str` | No | Identifier of the generation workflow. |

### Operations

#### `update(reqdata, ctrl=None) -> dict`

Update an existing entity. The data must include the entity `id`. Returns the updated entity data and raises on error.

```python
result = client.ApiUpdateScenarioSetOutput().update({
    "scenario_set_uuid": "scenario_set_uuid",
    # Fields to update
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ApiUpdateScenarioSetOutputEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ApiUpdateSimulationRunOutputEntity

```python
api_update_simulation_run_output = client.ApiUpdateSimulationRunOutput()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `agent_config` | `dict` | No | Configuration of the candidate agent under test for a simulation run. |
| `created_at` | `str` | No | Time created at. |
| `created_by_user_email` | `str` | No | Email of the user who triggered this run. |
| `created_by_user_id` | `str` | No | User id of the actor who triggered this run. |
| `deleted_at` | `str` | No | Time deleted at. |
| `evaluation_config` | `dict` | No | Optional configuration that opts a simulation run into an evaluation. |
| `evaluation_run_uuid` | `str` | No | UUID of the evaluation run reserved for this simulation, when the create request included evaluation_config. |
| `exploration_budget` | `int` | No | Optional run-level journeys-per-scenario override. |
| `failure_reason` | `str` | No | Human-readable explanation of a terminal FAILED status. |
| `journeys_finished` | `int` | No | Number of journeys that have finished (successfully or not). |
| `judge_model_name` | `str` | No | Display name of the judge model (from the model catalog). |
| `judge_model_uuid` | `str` | No | Model used by the judge. |
| `max_turns` | `int` | No | Optional run-level turn budget. |
| `name` | `str` | No | Optional run name. |
| `result_summary` | `dict` | No | Aggregated final result of a simulation run: verdict counts plus token and duration totals. |
| `run_uuid` | `str` | No | UUID of the run. |
| `scenario_count` | `int` | No | Number of scenarios in the scenario set for this run. |
| `scenario_set_uuid` | `str` | No | UUID of the scenario set being executed (must exist at run create). |
| `status` | `str` | No | Lifecycle status of a simulation run. |
| `total_journeys` | `int` | No | Total number of journeys (sum of exploration budgets). |
| `updated_at` | `str` | No | Time last updated at. |
| `user_simulator_config` | `dict` | No | Optional user simulator model settings such as temperature and max_tokens. |
| `user_simulator_model_name` | `str` | No | Display name of the user simulator model (from the model catalog). |
| `user_simulator_model_uuid` | `str` | No | Model used by the user simulator. |
| `workflow_uuid` | `str` | No | Identifier of the workflow executing this run. |

### Operations

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.ApiUpdateSimulationRunOutput().create({
})
```

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.ApiUpdateSimulationRunOutput().list()
for api_update_simulation_run_output in results:
    print(api_update_simulation_run_output)
```

#### `update(reqdata, ctrl=None) -> dict`

Update an existing entity. The data must include the entity `id`. Returns the updated entity data and raises on error.

```python
result = client.ApiUpdateSimulationRunOutput().update({
    "run_uuid": "run_uuid",
    # Fields to update
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ApiUpdateSimulationRunOutputEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ApiUpdateWorkspaceOutputEntity

```python
api_update_workspace_output = client.ApiUpdateWorkspaceOutput()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `agents` | `list` | No | Agents |
| `created_at` | `str` | No | Creation date |
| `created_by` | `str` | No | The id of user who created this workspace |
| `created_by_email` | `str` | No | The email of the user who created this workspace |
| `deleted_at` | `str` | No | Deleted date |
| `description` | `str` | No | Description of the workspace |
| `evaluation_test_cases` | `list` | No | Evaluations |
| `name` | `str` | No | Name of the workspace |
| `updated_at` | `str` | No | Update date |
| `uuid` | `str` | No | Unique id |
| `workspace_uuid` | `str` | No | Workspace UUID. |

### Operations

#### `update(reqdata, ctrl=None) -> dict`

Update an existing entity. The data must include the entity `id`. Returns the updated entity data and raises on error.

```python
result = client.ApiUpdateWorkspaceOutput().update({
    "workspace_uuid": "workspace_uuid",
    # Fields to update
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ApiUpdateWorkspaceOutputEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## AppEntity

```python
app = client.App()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `active_deployment` | `dict` | No |  |
| `autoscaling` | `dict` | No | Autoscaling event details. |
| `created_at` | `str` | No |  |
| `dedicated_ips` | `list` | No |  |
| `default_ingress` | `str` | No |  |
| `deployment` | `dict` | No |  |
| `deployment_id` | `str` | No | For deployment events, this is the same as the deployment's ID. |
| `domains` | `list` | No |  |
| `id` | `str` | No |  |
| `in_progress_deployment` | `dict` | No |  |
| `last_deployment_created_at` | `str` | No |  |
| `live_domain` | `str` | No |  |
| `live_url` | `str` | No |  |
| `live_url_base` | `str` | No |  |
| `owner_uuid` | `str` | No |  |
| `pending_deployment` | `Any` | No |  |
| `pinned_deployment` | `Any` | No |  |
| `project_id` | `str` | No | Requires `project:read` scope. |
| `region` | `dict` | No |  |
| `spec` | `dict` | Yes | The desired configuration of an application. |
| `tier_slug` | `str` | No |  |
| `type` | `str` | No | The type of event |
| `update_all_source_versions` | `bool` | No | Whether or not to update the source versions (for example fetching a new commit or image digest) of all components. |
| `updated_at` | `str` | No |  |
| `vpc` | `dict` | No |  |

### Operations

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.App().create({
    "spec": {},  # dict
})
```

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.App().list()
for app in results:
    print(app)
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.App().load({"id": "app_id"})
```

#### `remove(reqmatch, ctrl=None) -> dict`

Remove the entity matching the given criteria. Raises on error.

```python
result = client.App().remove({"id": "app_id"})
```

#### `update(reqdata, ctrl=None) -> dict`

Update an existing entity. The data must include the entity `id`. Returns the updated entity data and raises on error.

```python
result = client.App().update({
    "id": "app_id",
    # Fields to update
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `AppEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## AppAlertEntity

```python
app_alert = client.AppAlert()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `component_name` | `str` | No |  |
| `emails` | `list` | No |  |
| `id` | `str` | No |  |
| `phase` | `str` | No |  |
| `progress` | `dict` | No |  |
| `slack_webhooks` | `list` | No |  |
| `spec` | `dict` | No |  |

### Operations

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.AppAlert().create({
    "alert_id": "example_alert_id",  # str
    "app_id": "example_app_id",  # str
})
```

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.AppAlert().list({"id": "example"})
for app_alert in results:
    print(app_alert)
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `AppAlertEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## AppEventEntity

```python
app_event = client.AppEvent()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `autoscaling` | `dict` | No | Autoscaling event details. |
| `created_at` | `str` | No |  |
| `deployment` | `dict` | No |  |
| `deployment_id` | `str` | No | For deployment events, this is the same as the deployment's ID. |
| `id` | `str` | No |  |
| `type` | `str` | No | The type of event |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.AppEvent().list({"id": "example"})
for app_event in results:
    print(app_event)
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `AppEventEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## AppHealthEntity

```python
app_health = client.AppHealth()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `components` | `list` | No |  |
| `functions_components` | `list` | No |  |
| `id` | `str` | No |  |

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.AppHealth().load({"id": "app_health_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `AppHealthEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## AppInstanceEntity

```python
app_instance = client.AppInstance()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `component_name` | `str` | No | Name of the component, from the app spec. |
| `component_type` | `str` | No | Supported compute component by DigitalOcean App Platform. |
| `id` | `str` | No |  |
| `instance_alias` | `str` | No | Readable identifier, an alias of the instance name, reference for mapping insights to instance names. |
| `instance_name` | `str` | No | Name of the instance, which is a unique identifier for the instance. |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.AppInstance().list({"id": "example"})
for app_instance in results:
    print(app_instance)
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `AppInstanceEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## AppJobInvocationEntity

```python
app_job_invocation = client.AppJobInvocation()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `completed_at` | `str` | No |  |
| `created_at` | `str` | No |  |
| `deployment_id` | `str` | No |  |
| `id` | `str` | No |  |
| `job_name` | `str` | No |  |
| `phase` | `str` | No | The phase of the job invocation |
| `started_at` | `str` | No |  |
| `trigger` | `dict` | No |  |

### Operations

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.AppJobInvocation().create({
    "app_id": "example_app_id",  # str
    "job_invocation_id": "example_job_invocation_id",  # str
})
```

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.AppJobInvocation().list({"id": "example_id"})
for app_job_invocation in results:
    print(app_job_invocation)
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.AppJobInvocation().load({"id": "app_job_invocation_id", "app_id": "app_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `AppJobInvocationEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## AppMetricsBandwidthUsageEntity

```python
app_metrics_bandwidth_usage = client.AppMetricsBandwidthUsage()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `app_bandwidth_usage` | `list` | No | A list of bandwidth usage details by app. |
| `app_id` | `str` | No | The ID of the app. |
| `app_ids` | `list` | Yes | A list of app IDs to query bandwidth metrics for. |
| `bandwidth_bytes` | `str` | No | The used bandwidth amount in bytes. |
| `date` | `str` | No | The date for the metrics data. |

### Operations

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.AppMetricsBandwidthUsage().create({
    "app_ids": [],  # list
})
```

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.AppMetricsBandwidthUsage().list({"app_id": "example"})
for app_metrics_bandwidth_usage in results:
    print(app_metrics_bandwidth_usage)
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `AppMetricsBandwidthUsageEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## AppProposeEntity

```python
app_propose = client.AppPropose()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `app_cost` | `int` | No | The monthly cost of the proposed app in USD. |
| `app_id` | `str` | No | An optional ID of an existing app. |
| `app_is_static` | `bool` | No | Indicates whether the app is a static app. |
| `app_name_available` | `bool` | No | Indicates whether the app name is available. |
| `app_name_suggestion` | `str` | No | The suggested name if the proposed app name is unavailable. |
| `app_tier_downgrade_cost` | `int` | No | The monthly cost of the proposed app in USD using the previous pricing plan tier. |
| `existing_static_apps` | `str` | No | The maximum number of free static apps the account can have. |
| `spec` | `dict` | Yes | The desired configuration of an application. |

### Operations

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.AppPropose().create({
    "spec": {},  # dict
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `AppProposeEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## AppsDeploymentEntity

```python
apps_deployment = client.AppsDeployment()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `cause` | `str` | No |  |
| `cloned_from` | `str` | No |  |
| `components` | `list` | No |  |
| `created_at` | `str` | No |  |
| `deployment_id` | `str` | No | The ID of the deployment to rollback to. |
| `force_build` | `bool` | No |  |
| `functions` | `list` | No |  |
| `id` | `str` | No |  |
| `jobs` | `list` | No |  |
| `phase` | `str` | No |  |
| `phase_last_updated_at` | `str` | No |  |
| `progress` | `dict` | No |  |
| `services` | `list` | No |  |
| `skip_pin` | `bool` | No | Whether to skip pinning the rollback deployment. |
| `spec` | `dict` | Yes | The desired configuration of an application. |
| `static_sites` | `list` | No |  |
| `tier_slug` | `str` | No |  |
| `updated_at` | `str` | No |  |
| `workers` | `list` | No |  |

### Operations

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.AppsDeployment().create({
    "app_id": "example_app_id",  # str
    "spec": {},  # dict
})
```

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.AppsDeployment().list({"app_id": "example"})
for apps_deployment in results:
    print(apps_deployment)
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.AppsDeployment().load({"id": "apps_deployment_id", "app_id": "app_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `AppsDeploymentEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## AppsGetExecEntity

```python
apps_get_exec = client.AppsGetExec()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `url` | `str` | No | A websocket URL that allows sending/receiving console input and receiving console output. |

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.AppsGetExec().load({"app_id": "app_id", "component_name": "component_name"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `AppsGetExecEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## AppsGetLogEntity

```python
apps_get_log = client.AppsGetLog()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `historic_urls` | `list` | No |  |
| `live_url` | `str` | No | A URL of the real-time live logs. |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.AppsGetLog().list({"app_id": "example", "type": "example"})
for apps_get_log in results:
    print(apps_get_log)
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `AppsGetLogEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## AppsInstanceSizeEntity

```python
apps_instance_size = client.AppsInstanceSize()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `bandwidth_allowance_gib` | `str` | No |  |
| `cpu_type` | `str` | No |  |
| `cpus` | `str` | No |  |
| `deprecation_intent` | `bool` | No |  |
| `id` | `str` | No |  |
| `memory_bytes` | `str` | No |  |
| `name` | `str` | No |  |
| `scalable` | `bool` | No |  |
| `single_instance_only` | `bool` | No |  |
| `slug` | `str` | No |  |
| `tier_downgrade_to` | `str` | No |  |
| `tier_slug` | `str` | No |  |
| `tier_upgrade_to` | `str` | No |  |
| `usd_per_month` | `str` | No |  |
| `usd_per_second` | `str` | No |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.AppsInstanceSize().list()
for apps_instance_size in results:
    print(apps_instance_size)
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.AppsInstanceSize().load({"id": "apps_instance_size_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `AppsInstanceSizeEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## AppsRegionEntity

```python
apps_region = client.AppsRegion()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `continent` | `str` | No |  |
| `data_centers` | `list` | No |  |
| `default` | `bool` | No | Whether or not the region is presented as the default. |
| `disabled` | `bool` | No |  |
| `flag` | `str` | No |  |
| `label` | `str` | No |  |
| `reason` | `str` | No |  |
| `slug` | `str` | No |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.AppsRegion().list()
for apps_region in results:
    print(apps_region)
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `AppsRegionEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## AssociatedKubernetesResourceEntity

```python
associated_kubernetes_resource = client.AssociatedKubernetesResource()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `load_balancers` | `list` | No | A list of names and IDs for associated load balancers that can be destroyed along with the cluster. |
| `volume_snapshots` | `list` | No | A list of names and IDs for associated volume snapshots that can be destroyed along with the cluster. |
| `volumes` | `list` | No | A list of names and IDs for associated volumes that can be destroyed along with the cluster. |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.AssociatedKubernetesResource().list({"cluster_id": "example"})
for associated_kubernetes_resource in results:
    print(associated_kubernetes_resource)
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `AssociatedKubernetesResourceEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## AssociatedResourceStatusEntity

```python
associated_resource_status = client.AssociatedResourceStatus()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `completed_at` | `str` | No | A time value given in ISO8601 combined date and time format indicating when the requested action was completed. |
| `droplet` | `dict` | No | An object containing information about a resource scheduled for deletion. |
| `failures` | `int` | No | A count of the associated resources that failed to be destroyed, if any. |
| `resources` | `dict` | No | An object containing additional information about resource related to a Droplet requested to be destroyed. |

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.AssociatedResourceStatus().load({"droplet_id": 1})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `AssociatedResourceStatusEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## AsyncInvokeEntity

```python
async_invoke = client.AsyncInvoke()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `completed_at` | `str` | No | The timestamp when the job completed. |
| `created_at` | `str` | Yes | The timestamp when the request was created. |
| `error` | `str` | No | Error message if the job failed. |
| `input` | `dict` | Yes | The input parameters for the model invocation. |
| `model_id` | `str` | Yes | The model ID that was invoked. |
| `output` | `dict` | No | The output of the invocation. |
| `request_id` | `str` | Yes | A unique identifier for the async invocation request. |
| `started_at` | `str` | No | The timestamp when the job started processing. |
| `status` | `str` | Yes | The current status of the async invocation. |
| `tags` | `list` | No | An optional list of key-value tags to attach to the invocation request for tracking or categorization. |

### Operations

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.AsyncInvoke().create({
    "created_at": "example_created_at",  # str
    "input": {},  # dict
    "model_id": "example_model_id",  # str
    "request_id": "example_request_id",  # str
    "status": "example_status",  # str
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `AsyncInvokeEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## BalanceEntity

```python
balance = client.Balance()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `account_balance` | `str` | No | Current balance of the customer's most recent billing activity. |
| `generated_at` | `str` | No | The time at which balances were most recently generated. |
| `month_to_date_balance` | `str` | No | Balance as of the `generated_at` time. |
| `month_to_date_usage` | `str` | No | Amount used in the current billing period as of the `generated_at` time. |

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Balance().load()
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `BalanceEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## BatchEntity

```python
batch = client.Batch()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `batch_id` | `str` | Yes | Unique identifier for the batch job. |
| `cancelled_at` | `str` | No |  |
| `completed_at` | `str` | No |  |
| `completion_window` | `str` | Yes | Time window in which the job must complete. |
| `created_at` | `str` | Yes |  |
| `endpoint` | `str` | No | Inference endpoint each request is dispatched to. |
| `error_file_id` | `str` | No | Error sidecar file. |
| `errors` | `list` | No | Top-level errors that prevented the batch from completing. |
| `expires_at` | `str` | No | Derived from `created_at` plus `completion_window`. |
| `failed_at` | `str` | No |  |
| `file_id` | `str` | Yes | The `file_id` returned by `POST /v1/batches/files`. |
| `finalizing_at` | `str` | No |  |
| `id` | `str` | No |  |
| `in_progress_at` | `str` | No |  |
| `input_file_id` | `str` | Yes | The uploaded JSONL input file. |
| `metadata` | `dict` | No | Metadata attached at creation. |
| `output_file_id` | `str` | No | Output JSONL file. |
| `provider` | `str` | Yes | The inference provider whose JSONL schema the input file conforms to. |
| `request_counts` | `dict` | No | Aggregate request counts. |
| `request_id` | `str` | No | The idempotency key supplied at creation. |
| `status` | `str` | Yes | Lifecycle status. |

### Field Usage by Operation

| Field | load | list | create |
| --- | --- | --- | --- |
| `batch_id` | - | - | - |
| `cancelled_at` | - | - | - |
| `completed_at` | - | - | - |
| `completion_window` | - | - | - |
| `created_at` | - | - | - |
| `endpoint` | - | - | - |
| `error_file_id` | - | - | - |
| `errors` | - | - | - |
| `expires_at` | - | - | - |
| `failed_at` | - | - | - |
| `file_id` | - | - | - |
| `finalizing_at` | - | - | - |
| `id` | - | - | - |
| `in_progress_at` | - | - | - |
| `input_file_id` | - | - | - |
| `metadata` | - | - | - |
| `output_file_id` | - | - | - |
| `provider` | - | - | - |
| `request_counts` | - | - | - |
| `request_id` | - | - | Yes |
| `status` | - | - | - |

### Operations

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.Batch().create({
    "batch_id": "example_batch_id",  # str
    "completion_window": "example_completion_window",  # str
    "created_at": "example_created_at",  # str
    "file_id": "example_file_id",  # str
    "input_file_id": "example_input_file_id",  # str
    "provider": "example_provider",  # str
    "status": "example_status",  # str
})
```

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.Batch().list()
for batch in results:
    print(batch)
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Batch().load({"id": "batch_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `BatchEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## BatchFileCreateEntity

```python
batch_file_create = client.BatchFileCreate()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `file_name` | `str` | Yes | The file you plan to upload. |

### Operations

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.BatchFileCreate().create({
    "file_name": "example_file_name",  # str
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `BatchFileCreateEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## BatchInferenceEntity

```python
batch_inference = client.BatchInference()
```

### Operations

#### `update(reqdata, ctrl=None) -> dict`

Update an existing entity. The data must include the entity `id`. Returns the updated entity data and raises on error.

```python
result = client.BatchInference().update({
    # Fields to update
})
```

Sends its body unencoded, as `application/octet-stream`: pass it as `$body`, `bytes`, `bytearray`, `memoryview`, a `str` or a file object. A file object is read in full before the request is sent, so that a retry sends the same bytes.

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `BatchInferenceEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## BatchResultEntity

```python
batch_result = client.BatchResult()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `batch_id` | `str` | Yes |  |
| `error_file_url` | `str` | No | Presigned URL for the error sidecar JSONL, if any. |
| `expires_at` | `str` | No | When the presigned URLs expire. |
| `id` | `str` | No |  |
| `output_file_url` | `str` | No | Presigned URL for the main results JSONL. |
| `result_available` | `bool` | Yes | When `false`, keep polling batch status and retry later. |

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.BatchResult().load({"id": "batch_result_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `BatchResultEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## BillingEntity

```python
billing = client.Billing()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `amount` | `str` | No | Amount of the billing history entry. |
| `current_page` | `int` | Yes | Current page number |
| `data_points` | `list` | Yes | Array of billing data points, which are day-over-day changes in billing resource usage based on nightly invoice item estimates, for the requested period |
| `date` | `str` | No | Time the billing history entry occurred. |
| `description` | `str` | No | Description of the billing history entry. |
| `id` | `str` | No |  |
| `invoice_id` | `str` | No | ID of the invoice associated with the billing history entry, if applicable. |
| `invoice_items` | `list` | No |  |
| `invoice_period` | `str` | No | Billing period of usage for which the invoice is issued, in `YYYY-MM` format. |
| `invoice_uuid` | `str` | No | UUID of the invoice associated with the billing history entry, if applicable. |
| `links` | `dict` | No |  |
| `meta` | `Any` | Yes |  |
| `total_items` | `int` | Yes | Total number of items available across all pages |
| `total_pages` | `int` | Yes | Total number of pages available |
| `type` | `str` | No | Type of billing history entry. |
| `updated_at` | `str` | No | Time the invoice was last updated. |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.Billing().list()
for billing in results:
    print(billing)
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Billing().load({"invoice_uuid": "invoice_uuid"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `BillingEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## BlockStorageEntity

```python
block_storage = client.BlockStorage()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `created_at` | `str` | Yes | A time value given in ISO8601 combined date and time format that represents when the snapshot was created. |
| `description` | `str` | No | An optional free-form text field to describe a block storage volume. |
| `droplet_ids` | `list` | No | An array containing the IDs of the Droplets the volume is attached to. |
| `filesystem_label` | `str` | No | The label currently applied to the filesystem. |
| `filesystem_type` | `str` | No | The type of filesystem currently in-use on the volume. |
| `id` | `str` | Yes | The unique identifier for the snapshot. |
| `min_disk_size` | `int` | Yes | The minimum size in GB required for a volume or Droplet to use this snapshot. |
| `name` | `str` | Yes | A human-readable name for the snapshot. |
| `region` | `Any` | No |  |
| `regions` | `list` | Yes | An array of the regions that the snapshot is available in. |
| `resource_id` | `str` | Yes | The unique identifier for the resource that the snapshot originated from. |
| `resource_type` | `str` | Yes | The type of resource that the snapshot originated from. |
| `size_gigabytes` | `float` | Yes | The billable size of the snapshot in gigabytes. |
| `tags` | `list` | Yes | An array of Tags the snapshot has been tagged with.<br><br>Requires `tag:read` scope. |
| `volume` | `dict` | No |  |

### Field Usage by Operation

| Field | load | list | create | remove |
| --- | --- | --- | --- | --- |
| `created_at` | Yes | Yes | - | - |
| `description` | - | - | - | - |
| `droplet_ids` | - | - | - | - |
| `filesystem_label` | - | - | - | - |
| `filesystem_type` | - | - | - | - |
| `id` | Yes | Yes | - | - |
| `min_disk_size` | - | - | - | - |
| `name` | Yes | Yes | - | - |
| `region` | - | - | - | - |
| `regions` | - | - | - | - |
| `resource_id` | - | - | - | - |
| `resource_type` | - | - | - | - |
| `size_gigabytes` | Yes | Yes | - | - |
| `tags` | Yes | Yes | Yes | - |
| `volume` | - | - | - | - |

### Operations

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.BlockStorage().create({
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

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.BlockStorage().list()
for block_storage in results:
    print(block_storage)
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.BlockStorage().load({"volume_id": "volume_id"})
```

#### `remove(reqmatch, ctrl=None) -> dict`

Remove the entity matching the given criteria. Raises on error.

```python
result = client.BlockStorage().remove({"volume_id": "volume_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `BlockStorageEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## BlockStorageActionEntity

```python
block_storage_action = client.BlockStorageAction()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `completed_at` | `str` | No | A time value given in ISO8601 combined date and time format that represents when the action was completed. |
| `id` | `int` | No | A unique numeric ID that can be used to identify and reference an action. |
| `region` | `dict` | Yes |  |
| `region_slug` | `str` | No | A human-readable string that is used as a unique identifier for each region. |
| `resource_id` | `int` | No | A unique identifier for the resource that the action is associated with. |
| `resource_type` | `str` | No | The type of resource that the action is associated with. |
| `started_at` | `str` | No | A time value given in ISO8601 combined date and time format that represents when the action was initiated. |
| `status` | `str` | No | The current status of the action. |
| `type` | `str` | No | This is the type of action that the object represents. |

### Operations

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.BlockStorageAction().create({
    "region": {},  # dict
})
```

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.BlockStorageAction().list({"volume_id": "example"})
for block_storage_action in results:
    print(block_storage_action)
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.BlockStorageAction().load({"id": 1, "volume_id": "volume_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `BlockStorageActionEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ByoipPrefixEntity

```python
byoip_prefix = client.ByoipPrefix()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `advertise` | `bool` | No | Whether the BYOIP prefix should be advertised |
| `advertised` | `bool` | No | Whether the BYOIP prefix is being advertised |
| `failure_reason` | `str` | No | Reason for failure, if applicable |
| `id` | `str` | No |  |
| `locked` | `bool` | No | Whether the BYOIP prefix is locked |
| `name` | `str` | No | Name of the BYOIP prefix |
| `prefix` | `str` | No | The IP prefix in CIDR notation |
| `project_id` | `str` | No | The ID of the project associated with the BYOIP prefix |
| `region` | `str` | No | Region where the BYOIP prefix is located |
| `signature` | `str` | Yes | The signature hash for the prefix creation request |
| `status` | `str` | No | Status of the BYOIP prefix |
| `uuid` | `str` | No | Unique identifier for the BYOIP prefix |
| `validations` | `list` | No | List of validation statuses for the BYOIP prefix |

### Field Usage by Operation

| Field | load | list | create | update | remove |
| --- | --- | --- | --- | --- | --- |
| `advertise` | - | - | - | - | - |
| `advertised` | - | - | - | - | - |
| `failure_reason` | - | - | - | - | - |
| `id` | - | - | - | - | - |
| `locked` | - | - | - | - | - |
| `name` | - | - | - | - | - |
| `prefix` | - | - | Yes | - | - |
| `project_id` | - | - | - | - | - |
| `region` | - | - | Yes | - | - |
| `signature` | - | - | - | - | - |
| `status` | - | - | - | - | - |
| `uuid` | - | - | - | - | - |
| `validations` | - | - | - | - | - |

### Operations

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.ByoipPrefix().create({
    "signature": "example_signature",  # str
})
```

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.ByoipPrefix().list()
for byoip_prefix in results:
    print(byoip_prefix)
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.ByoipPrefix().load({"id": "byoip_prefix_id"})
```

#### `remove(reqmatch, ctrl=None) -> dict`

Remove the entity matching the given criteria. Raises on error.

```python
result = client.ByoipPrefix().remove({"id": "byoip_prefix_id"})
```

#### `update(reqdata, ctrl=None) -> dict`

Update an existing entity. The data must include the entity `id`. Returns the updated entity data and raises on error.

```python
result = client.ByoipPrefix().update({
    "id": "byoip_prefix_id",
    # Fields to update
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ByoipPrefixEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## CdnEndpointEntity

```python
cdn_endpoint = client.CdnEndpoint()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `certificate_id` | `str` | No | The ID of a DigitalOcean managed TLS certificate used for SSL when a custom subdomain is provided. |
| `created_at` | `str` | No | A time value given in ISO8601 combined date and time format that represents when the CDN endpoint was created. |
| `custom_domain` | `str` | No | The fully qualified domain name (FQDN) of the custom subdomain used with the CDN endpoint. |
| `endpoint` | `str` | No | The fully qualified domain name (FQDN) from which the CDN-backed content is served. |
| `id` | `str` | No | A unique ID that can be used to identify and reference a CDN endpoint. |
| `origin` | `str` | Yes | The fully qualified domain name (FQDN) for the origin server which provides the content for the CDN. |
| `ttl` | `int` | No | The amount of time the content is cached by the CDN's edge servers in seconds. |

### Operations

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.CdnEndpoint().create({
    "origin": "example_origin",  # str
})
```

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.CdnEndpoint().list()
for cdn_endpoint in results:
    print(cdn_endpoint)
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.CdnEndpoint().load({"id": "cdn_endpoint_id"})
```

#### `remove(reqmatch, ctrl=None) -> dict`

Remove the entity matching the given criteria. Raises on error.

```python
result = client.CdnEndpoint().remove({"id": "cdn_endpoint_id"})
```

#### `update(reqdata, ctrl=None) -> dict`

Update an existing entity. The data must include the entity `id`. Returns the updated entity data and raises on error.

```python
result = client.CdnEndpoint().update({
    "id": "cdn_endpoint_id",
    # Fields to update
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `CdnEndpointEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## CertificateEntity

```python
certificate = client.Certificate()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `certificate` | `dict` | No |  |
| `created_at` | `str` | No | A time value given in ISO8601 combined date and time format that represents when the certificate was created. |
| `dns_names` | `list` | No | An array of fully qualified domain names (FQDNs) for which the certificate was issued. |
| `id` | `str` | No | A unique ID that can be used to identify and reference a certificate. |
| `name` | `str` | No | A unique human-readable name referring to a certificate. |
| `not_after` | `str` | No | A time value given in ISO8601 combined date and time format that represents the certificate's expiration date. |
| `sha1_fingerprint` | `str` | No | A unique identifier generated from the SHA-1 fingerprint of the certificate. |
| `state` | `str` | No | A string representing the current state of the certificate. |
| `type` | `str` | No | A string representing the type of the certificate. |

### Operations

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.Certificate().create({
})
```

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.Certificate().list()
for certificate in results:
    print(certificate)
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Certificate().load({"id": "certificate_id"})
```

#### `remove(reqmatch, ctrl=None) -> dict`

Remove the entity matching the given criteria. Raises on error.

```python
result = client.Certificate().remove({"id": "certificate_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `CertificateEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ChatCompletionEntity

```python
chat_completion = client.ChatCompletion()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `choices` | `list` | Yes | A list of chat completion choices. |
| `created` | `int` | Yes | The Unix timestamp (in seconds) of when the chat completion was created. |
| `frequency_penalty` | `float` | No | Number between -2.0 and 2.0. |
| `id` | `str` | Yes | A unique identifier for the chat completion. |
| `logit_bias` | `dict` | No | Modify the likelihood of specified tokens appearing in the completion. |
| `logprobs` | `bool` | No | Whether to return log probabilities of the output tokens or not. |
| `max_completion_tokens` | `int` | No | The maximum number of completion tokens that may be used over the course of the run. |
| `max_tokens` | `int` | No | The maximum number of tokens that can be generated in the completion. |
| `messages` | `list` | Yes | A list of messages comprising the conversation so far. |
| `metadata` | `dict` | No | Set of 16 key-value pairs that can be attached to an object. |
| `model` | `str` | Yes | The model used for the chat completion. |
| `n` | `int` | No | How many chat completion choices to generate for each input message. |
| `object` | `str` | Yes | The object type, which is always chat.completion. |
| `presence_penalty` | `float` | No | Number between -2.0 and 2.0. |
| `reasoning_effort` | `str` | No | Constrains effort on reasoning for reasoning models. |
| `seed` | `int` | No | If specified, the system will make a best effort to sample deterministically, such that repeated requests with the same seed and parameters should return the same result. |
| `stop` | `Any` | No | Up to 4 sequences where the API will stop generating further tokens. |
| `stream` | `bool` | No | If set to true, the model response data will be streamed to the client as it is generated using server-sent events. |
| `stream_options` | `dict` | No | Options for streaming response. |
| `temperature` | `float` | No | What sampling temperature to use, between 0 and 2. |
| `tool_choice` | `Any` | No | Controls which (if any) tool is called by the model. |
| `tools` | `list` | No | A list of tools the model may call. |
| `top_logprobs` | `int` | No | An integer between 0 and 20 specifying the number of most likely tokens to return at each token position, each with an associated log probability. |
| `top_p` | `float` | No | An alternative to sampling with temperature, called nucleus sampling, where the model considers the results of the tokens with top_p probability mass. |
| `usage` | `dict` | Yes | Usage statistics for the completion request. |
| `user` | `str` | No | A unique identifier representing your end-user, which can help DigitalOcean to monitor and detect abuse. |

### Operations

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.ChatCompletion().create({
    "choices": [],  # list
    "created": 1,  # int
    "id": "example_id",  # str
    "messages": [],  # list
    "model": "example_model",  # str
    "object": "example_object",  # str
    "usage": {},  # dict
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ChatCompletionEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ClusterlintEntity

```python
clusterlint = client.Clusterlint()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `check_name` | `str` | No | The clusterlint check that resulted in the diagnostic. |
| `message` | `str` | No | Feedback about the object for users to fix. |
| `object` | `dict` | No | Metadata about the Kubernetes API object the diagnostic is reported on. |
| `severity` | `str` | No | Can be one of error, warning or suggestion. |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.Clusterlint().list({"cluster_id": "example"})
for clusterlint in results:
    print(clusterlint)
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ClusterlintEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ConnectionEntity

```python
connection = client.Connection()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `api_key` | `dict` | No | Set for `team_api_key` connections. |
| `authorization` | `Any` | No | Present only while the connection is pending and you created it. |
| `connection` | `Any` | No | The connection. |
| `connection_parameters` | `dict` | No | Values for the provider's `connection_parameters`, validated against their specifications. |
| `created_at` | `str` | No | When the connection was created. |
| `credential` | `dict` | No | Optional credential to connect through. |
| `credential_id` | `str` | No | Empty for `digitalocean_oauth`; otherwise the ID of the team provider credential the connection uses. |
| `credential_kind` | `str` | No | `digitalocean_oauth`, `private_oauth`, or `team_api_key`. |
| `granted_at` | `str` | No | Deprecated: read `oauth.granted_at`. |
| `id` | `str` | No | Opaque connection ID. |
| `network` | `dict` | No | Optional private network for the connection's calls. |
| `oauth` | `dict` | No | Set for `digitalocean_oauth` and `private_oauth` connections. |
| `owning_user_id` | `str` | No | DigitalOcean user ID of the user who created the connection, when recorded. |
| `provider` | `str` | Yes | Required provider slug, from the provider list. |
| `provider_display_name` | `str` | No | Human-readable provider name, for example `Jira`. |
| `revoked_at` | `str` | No | When the connection was revoked. |
| `scopes` | `list` | No | Optional OAuth scopes to request. |
| `status` | `str` | No | pending, active, revoked, or expired. |
| `updated_at` | `str` | No | When the connection was last modified. |
| `user_id` | `str` | Yes | Required. |

### Field Usage by Operation

| Field | load | list | create | remove |
| --- | --- | --- | --- | --- |
| `api_key` | - | - | - | - |
| `authorization` | - | - | - | - |
| `connection` | - | - | - | - |
| `connection_parameters` | - | - | - | - |
| `created_at` | - | - | - | - |
| `credential` | - | - | - | - |
| `credential_id` | - | - | - | - |
| `credential_kind` | - | - | - | - |
| `granted_at` | - | - | - | - |
| `id` | - | - | - | - |
| `network` | - | - | - | - |
| `oauth` | - | - | - | - |
| `owning_user_id` | - | - | - | - |
| `provider` | - | Yes | - | - |
| `provider_display_name` | - | - | - | - |
| `revoked_at` | - | - | - | - |
| `scopes` | - | - | - | - |
| `status` | - | - | - | - |
| `updated_at` | - | - | - | - |
| `user_id` | - | Yes | - | - |

### Operations

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.Connection().create({
    "provider": "example_provider",  # str
    "user_id": "example_user_id",  # str
})
```

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.Connection().list()
for connection in results:
    print(connection)
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Connection().load({"id": "connection_id"})
```

#### `remove(reqmatch, ctrl=None) -> dict`

Remove the entity matching the given criteria. Raises on error.

```python
result = client.Connection().remove({"id": "connection_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ConnectionEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ConnectionPoolEntity

```python
connection_pool = client.ConnectionPool()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `connection` | `Any` | No |  |
| `db` | `str` | Yes | The database for use with the connection pool. |
| `mode` | `str` | Yes | The PGBouncer transaction mode for the connection pool. |
| `name` | `str` | Yes | A unique name for the connection pool. |
| `private_connection` | `Any` | No |  |
| `size` | `int` | Yes | The desired size of the PGBouncer connection pool. |
| `standby_connection` | `Any` | No |  |
| `standby_private_connection` | `Any` | No |  |
| `user` | `str` | No | The name of the user for use with the connection pool. |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.ConnectionPool().list({"database_id": "example"})
for connection_pool in results:
    print(connection_pool)
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ConnectionPoolEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ContainerRegistryEntity

```python
container_registry = client.ContainerRegistry()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `available_regions` | `list` | No |  |
| `blobs` | `list` | No | All blobs associated with this manifest |
| `blobs_deleted` | `int` | No | The number of blobs deleted as a result of this garbage collection. |
| `cancel` | `bool` | No | A boolean value indicating that the garbage collection should be cancelled. |
| `compressed_size_bytes` | `int` | No | The compressed size of the manifest in bytes. |
| `created_at` | `str` | No | A time value given in ISO8601 combined date and time format that represents when the registry was created. |
| `digest` | `str` | No | The manifest digest |
| `freed_bytes` | `int` | No | The number of bytes freed as a result of this garbage collection. |
| `id` | `str` | No |  |
| `latest_manifest` | `dict` | No |  |
| `latest_tag` | `dict` | No |  |
| `manifest_count` | `int` | No | The number of manifests in the repository. |
| `manifest_digest` | `str` | No | The digest of the manifest associated with the tag. |
| `name` | `str` | No | A globally unique name for the container registry. |
| `region` | `str` | No | Slug of the region where registry data is stored |
| `registries` | `list` | No |  |
| `registry_name` | `str` | No | The name of the container registry. |
| `repository` | `str` | No | The name of the repository. |
| `size_bytes` | `int` | No | The uncompressed size of the manifest in bytes (this size is calculated asynchronously so it may not be immediately available). |
| `status` | `str` | No | The current status of this garbage collection. |
| `storage_usage_bytes` | `int` | No | The amount of storage used in the registry in bytes. |
| `storage_usage_bytes_updated_at` | `str` | No | The time at which the storage usage was updated. |
| `subscription` | `Any` | No |  |
| `subscription_tier_slug` | `str` | No | The slug of the subscription tier to sign up for. |
| `subscription_tiers` | `list` | No |  |
| `tag` | `str` | No | The name of the tag. |
| `tag_count` | `int` | No | The number of tags in the repository. |
| `tags` | `list` | No | All tags associated with this manifest |
| `tier` | `dict` | No |  |
| `tier_slug` | `str` | No | The slug of the subscription tier to sign up for. |
| `type` | `str` | No | Type of the garbage collection to run against this registry |
| `updated_at` | `str` | No | The time the garbage collection was last updated. |
| `uuid` | `str` | No | A string specifying the UUID of the garbage collection. |

### Field Usage by Operation

| Field | load | list | create | update | remove |
| --- | --- | --- | --- | --- | --- |
| `available_regions` | - | - | - | - | - |
| `blobs` | - | - | - | - | - |
| `blobs_deleted` | - | - | - | - | - |
| `cancel` | - | - | - | - | - |
| `compressed_size_bytes` | - | - | - | - | - |
| `created_at` | - | - | - | - | - |
| `digest` | - | - | - | - | - |
| `freed_bytes` | - | - | - | - | - |
| `id` | - | - | - | - | - |
| `latest_manifest` | - | - | - | - | - |
| `latest_tag` | - | - | - | - | - |
| `manifest_count` | - | - | - | - | - |
| `manifest_digest` | - | - | - | - | - |
| `name` | - | - | Yes | - | - |
| `region` | - | - | - | - | - |
| `registries` | - | - | - | - | - |
| `registry_name` | - | - | - | - | - |
| `repository` | - | - | - | - | - |
| `size_bytes` | - | - | - | - | - |
| `status` | - | - | - | - | - |
| `storage_usage_bytes` | - | - | - | - | - |
| `storage_usage_bytes_updated_at` | - | - | - | - | - |
| `subscription` | - | - | - | - | - |
| `subscription_tier_slug` | - | - | Yes | - | - |
| `subscription_tiers` | - | - | - | - | - |
| `tag` | - | - | - | - | - |
| `tag_count` | - | - | - | - | - |
| `tags` | - | - | - | - | - |
| `tier` | - | - | - | - | - |
| `tier_slug` | - | - | - | - | - |
| `type` | - | - | - | - | - |
| `updated_at` | - | - | - | - | - |
| `uuid` | - | - | - | - | - |

### Operations

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.ContainerRegistry().create({
})
```

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.ContainerRegistry().list()
for container_registry in results:
    print(container_registry)
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.ContainerRegistry().load({"id": "container_registry_id"})
```

#### `remove(reqmatch, ctrl=None) -> dict`

Remove the entity matching the given criteria. Raises on error.

```python
result = client.ContainerRegistry().remove({"id": "container_registry_id"})
```

#### `update(reqdata, ctrl=None) -> dict`

Update an existing entity. The data must include the entity `id`. Returns the updated entity data and raises on error.

```python
result = client.ContainerRegistry().update({
    "id": "container_registry_id",
    "garbage_collection_uuid": "garbage_collection_uuid",
    "registry_name": "registry_name",
    # Fields to update
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ContainerRegistryEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## CreateResponseEntity

```python
create_response = client.CreateResponse()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `created` | `int` | Yes | The Unix timestamp (in seconds) of when the response was created. |
| `id` | `str` | Yes | A unique identifier for the response. |
| `input` | `Any` | Yes | The prompt or input content you want the model to respond to. |
| `instructions` | `str` | No | System-level instructions for the model. |
| `max_output_tokens` | `int` | No | Maximum output tokens setting. |
| `metadata` | `dict` | No | Set of key-value pairs that can be attached to the request. |
| `model` | `str` | Yes | The model used to generate the response. |
| `object` | `str` | Yes | The object type, which is always `response`. |
| `output` | `list` | Yes | An array of content items generated by the model. |
| `parallel_tool_calls` | `bool` | No | Whether parallel tool calls are enabled. |
| `status` | `str` | No | Status of the response. |
| `stop` | `Any` | No | Up to 4 sequences where the API will stop generating further tokens. |
| `stream` | `bool` | No | Set to true to stream partial responses as Server-Sent Events. |
| `stream_options` | `dict` | No | Options for streaming response. |
| `temperature` | `float` | No | Temperature setting used for the response. |
| `tool_choice` | `str` | No | Tool choice setting used for the response. |
| `tools` | `list` | No | Tools available for the response. |
| `top_p` | `float` | No | Top-p setting used for the response. |
| `usage` | `dict` | Yes | Detailed usage statistics for the Responses API request, including input/output token counts and detailed breakdowns. |
| `user` | `str` | No | User identifier. |

### Operations

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.CreateResponse().create({
    "created": 1,  # int
    "id": "example_id",  # str
    "input": "example_input",  # Any
    "model": "example_model",  # str
    "object": "example_object",  # str
    "output": [],  # list
    "usage": {},  # dict
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `CreateResponseEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## CredentialEntity

```python
credential = client.Credential()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `certificate_authority_data` | `str` | No | A base64 encoding of bytes representing the certificate authority data for accessing the cluster. |
| `client_certificate_data` | `str` | No | A base64 encoding of bytes representing the x509 client certificate data for access the cluster. |
| `client_key_data` | `str` | No | A base64 encoding of bytes representing the x509 client key data for access the cluster. |
| `expires_at` | `str` | No | A time value given in ISO8601 combined date and time format that represents when the access token expires. |
| `server` | `str` | No | The URL used to access the cluster API server. |
| `token` | `str` | No | An access token used to authenticate with the cluster. |

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Credential().load({"cluster_id": "cluster_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `CredentialEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## DatabaseEntity

```python
database = client.Database()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `access_cert` | `str` | No | Access certificate for TLS client authentication. |
| `access_key` | `str` | No | Access key for TLS client authentication. |
| `autoscale` | `Any` | No | Autoscaling configuration for the database cluster. |
| `backup_restore` | `dict` | Yes |  |
| `compatibility_level` | `str` | Yes | The compatibility level of the schema registry. |
| `config` | `dict` | No |  |
| `connection` | `Any` | No |  |
| `created_at` | `str` | No | A time value given in ISO8601 combined date and time format that represents when the database cluster was created. |
| `credentials` | `dict` | No |  |
| `db` | `str` | Yes | The database for use with the connection pool. |
| `db_names` | `list` | No | An array of strings containing the names of databases created in the database cluster. |
| `do_settings` | `Any` | No |  |
| `engine` | `str` | Yes | A slug representing the database engine used for the cluster. |
| `id` | `str` | No | A unique ID that can be used to identify and reference a database replica. |
| `maintenance_window` | `Any` | No |  |
| `metrics_endpoints` | `list` | No | Public hostname and port of the cluster's metrics endpoint(s). |
| `mode` | `str` | Yes | The PGBouncer transaction mode for the connection pool. |
| `mysql_settings` | `dict` | Yes |  |
| `name` | `str` | Yes | The name of the database. |
| `num_nodes` | `int` | Yes | The number of nodes in the database cluster. |
| `partition_count` | `int` | No | The number of partitions available for the topic. |
| `partitions` | `list` | No |  |
| `password` | `str` | No | A randomly generated password for the database user.<br>Requires `database:view_credentials` scope. |
| `private_connection` | `Any` | No |  |
| `private_network_uuid` | `str` | No | A string specifying the UUID of the VPC to which the read-only replica will be assigned. |
| `project_id` | `str` | No | The ID of the project that the database cluster is assigned to. |
| `region` | `str` | No | A slug identifier for the region where the read-only replica will be located. |
| `replication_factor` | `int` | No | The number of nodes to replicate data across the cluster. |
| `role` | `str` | No | A string representing the database user's role. |
| `rules` | `list` | No |  |
| `schema` | `str` | Yes | The schema definition in the specified format. |
| `schema_id` | `int` | Yes | The id for schema. |
| `schema_registry_connection` | `Any` | No | The connection details for Schema Registry. |
| `schema_type` | `str` | Yes | The type of the schema. |
| `semantic_version` | `str` | No | A string representing the semantic version of the database engine in use for the cluster. |
| `settings` | `dict` | No | User settings that can be updated via the Update a Database User endpoint. |
| `size` | `int` | Yes | The desired size of the PGBouncer connection pool. |
| `standby_connection` | `Any` | No |  |
| `standby_private_connection` | `Any` | No |  |
| `state` | `str` | No | The state of the Kafka topic. |
| `status` | `str` | No | A string representing the current status of the database cluster. |
| `storage_size_mib` | `int` | No | Additional storage added to the cluster, in MiB. |
| `subject_name` | `str` | Yes | The name of the schema subject. |
| `tags` | `list` | No | A flat array of tag names as strings applied to the read-only replica.<br><br>Requires `tag:read` scope. |
| `ui_connection` | `Any` | No | The connection details for OpenSearch dashboard. |
| `user` | `str` | No | The name of the user for use with the connection pool. |
| `users` | `list` | No |  |
| `version` | `str` | Yes | The version of the schema. |
| `version_end_of_availability` | `str` | No | A timestamp referring to the date when the particular version will no longer be available for creating new clusters. |
| `version_end_of_life` | `str` | No | A timestamp referring to the date when the particular version will no longer be supported. |

### Field Usage by Operation

| Field | load | list | create | update | patch | remove |
| --- | --- | --- | --- | --- | --- | --- |
| `access_cert` | - | - | - | - | - | - |
| `access_key` | - | - | - | - | - | - |
| `autoscale` | - | - | - | - | - | - |
| `backup_restore` | - | - | - | - | - | - |
| `compatibility_level` | - | - | - | - | - | - |
| `config` | - | - | - | Yes | - | - |
| `connection` | - | - | - | - | - | - |
| `created_at` | - | - | - | - | - | - |
| `credentials` | - | - | - | - | - | - |
| `db` | - | - | - | - | - | - |
| `db_names` | - | - | - | - | - | - |
| `do_settings` | - | - | - | - | - | - |
| `engine` | - | - | - | - | - | - |
| `id` | - | - | - | - | - | - |
| `maintenance_window` | - | - | - | - | - | - |
| `metrics_endpoints` | - | - | - | - | - | - |
| `mode` | - | - | - | - | - | - |
| `mysql_settings` | - | - | - | - | - | - |
| `name` | Yes | - | - | Yes | - | - |
| `num_nodes` | - | - | - | - | - | - |
| `partition_count` | - | - | - | - | - | - |
| `partitions` | - | - | - | - | - | - |
| `password` | - | - | - | - | - | - |
| `private_connection` | - | - | - | - | - | - |
| `private_network_uuid` | - | - | - | - | - | - |
| `project_id` | - | - | - | - | - | - |
| `region` | Yes | Yes | Yes | - | - | - |
| `replication_factor` | - | - | - | - | - | - |
| `role` | - | - | - | - | - | - |
| `rules` | - | - | - | - | - | - |
| `schema` | - | - | - | - | - | - |
| `schema_id` | - | - | - | - | - | - |
| `schema_registry_connection` | - | - | - | - | - | - |
| `schema_type` | - | - | - | - | - | - |
| `semantic_version` | - | - | - | - | - | - |
| `settings` | - | - | - | Yes | - | - |
| `size` | Yes | - | - | - | - | - |
| `standby_connection` | - | - | - | - | - | - |
| `standby_private_connection` | - | - | - | - | - | - |
| `state` | - | - | - | - | - | - |
| `status` | - | - | - | - | - | - |
| `storage_size_mib` | - | - | - | - | - | - |
| `subject_name` | - | - | - | - | - | - |
| `tags` | - | - | - | - | - | - |
| `ui_connection` | - | - | - | - | - | - |
| `user` | - | - | - | - | - | - |
| `users` | - | - | - | - | - | - |
| `version` | Yes | Yes | Yes | - | - | - |
| `version_end_of_availability` | - | - | - | - | - | - |
| `version_end_of_life` | - | - | - | - | - | - |

### Operations

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.Database().create({
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

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.Database().list()
for database in results:
    print(database)
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Database().load({"id": "database_id"})
```

#### `patch(reqdata, ctrl=None) -> dict`

Change part of an existing entity: only the fields given are sent. The data must include the entity `id`. Returns the patched entity data and raises on error.

```python
result = client.Database().patch({
    "id": "database_id",
    # Only the fields to change
})
```

#### `remove(reqmatch, ctrl=None) -> dict`

Remove the entity matching the given criteria. Raises on error.

```python
result = client.Database().remove({"id": "database_id"})
```

#### `update(reqdata, ctrl=None) -> dict`

Update an existing entity. The data must include the entity `id`. Returns the updated entity data and raises on error.

```python
result = client.Database().update({
    "id": "database_id",
    "logsink_id": "logsink_id",
    # Fields to update
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `DatabaseEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## DedicatedInferenceEntity

```python
dedicated_inference = client.DedicatedInference()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `access_tokens` | `dict` | No | Key-value pairs for provider tokens (e.g. |
| `created_at` | `str` | No | When the Dedicated Inference was created. |
| `dedicated_inference` | `dict` | No | A Dedicated Inference instance. |
| `endpoints` | `dict` | No |  |
| `id` | `str` | No | Unique ID of the Dedicated Inference. |
| `pending_deployment_spec` | `dict` | No | Pending deployment when status is provisioning or updating. |
| `region` | `str` | No | DigitalOcean region where the Dedicated Inference is hosted. |
| `spec` | `dict` | Yes | Structured configuration for a Dedicated Inference deployment. |
| `status` | `str` | No | Current state of the Dedicated Inference. |
| `token` | `dict` | No | Access token for authenticating to Dedicated Inference endpoints. |
| `updated_at` | `str` | No | When the Dedicated Inference was last updated. |
| `vpc_uuid` | `str` | No | VPC UUID of the Dedicated Inference. |

### Operations

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.DedicatedInference().create({
    "spec": {},  # dict
})
```

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.DedicatedInference().list()
for dedicated_inference in results:
    print(dedicated_inference)
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.DedicatedInference().load({"id": "dedicated_inference_id"})
```

#### `remove(reqmatch, ctrl=None) -> dict`

Remove the entity matching the given criteria. Raises on error.

```python
result = client.DedicatedInference().remove({"id": "dedicated_inference_id"})
```

#### `update(reqdata, ctrl=None) -> dict`

Update an existing entity. The data must include the entity `id`. Returns the updated entity data and raises on error.

```python
result = client.DedicatedInference().update({
    "id": "dedicated_inference_id",
    # Fields to update
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `DedicatedInferenceEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## DedicatedInferenceAcceleratorEntity

```python
dedicated_inference_accelerator = client.DedicatedInferenceAccelerator()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `created_at` | `str` | No |  |
| `id` | `str` | No | Unique ID of the accelerator. |
| `name` | `str` | No | Name of the accelerator. |
| `role` | `str` | No | Role of the accelerator (e.g. |
| `slug` | `str` | No | DigitalOcean GPU slug. |
| `status` | `str` | No | Status of the accelerator. |

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.DedicatedInferenceAccelerator().load({"id": "dedicated_inference_accelerator_id", "dedicated_inference_id": "dedicated_inference_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `DedicatedInferenceAcceleratorEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## DedicatedInferenceGpuModelConfigEntity

```python
dedicated_inference_gpu_model_config = client.DedicatedInferenceGpuModelConfig()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `gpu_slugs` | `list` | No |  |
| `is_gated_model` | `bool` | No | Whether the model requires gated access (e.g. |
| `model_name` | `str` | No |  |
| `model_slug` | `str` | No |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.DedicatedInferenceGpuModelConfig().list()
for dedicated_inference_gpu_model_config in results:
    print(dedicated_inference_gpu_model_config)
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `DedicatedInferenceGpuModelConfigEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## DedicatedInferenceSizeEntity

```python
dedicated_inference_size = client.DedicatedInferenceSize()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `currency` | `str` | No |  |
| `gpu_slug` | `str` | No |  |
| `price_per_hour` | `str` | No |  |
| `region` | `str` | No |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.DedicatedInferenceSize().list()
for dedicated_inference_size in results:
    print(dedicated_inference_size)
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `DedicatedInferenceSizeEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## DockerCredentialEntity

```python
docker_credential = client.DockerCredential()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `registry_digitalocean_com` | `dict` | No |  |

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.DockerCredential().load()
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `DockerCredentialEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## DomainEntity

```python
domain = client.Domain()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `str` | No |  |
| `ip_address` | `str` | No | This optional attribute may contain an IP address. |
| `name` | `str` | No | The name of the domain itself. |
| `ttl` | `int` | No | This value is the time to live for the records on this domain, in seconds. |
| `zone_file` | `str` | No | This attribute contains the complete contents of the zone file for the selected domain. |

### Operations

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.Domain().create({
})
```

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.Domain().list()
for domain in results:
    print(domain)
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Domain().load({"id": "domain_id"})
```

#### `remove(reqmatch, ctrl=None) -> dict`

Remove the entity matching the given criteria. Raises on error.

```python
result = client.Domain().remove({"id": "domain_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `DomainEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## DomainRecordEntity

```python
domain_record = client.DomainRecord()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `data` | `str` | No | Variable data depending on record type. |
| `domain_record` | `dict` | No |  |
| `flags` | `int` | No | An unsigned integer between 0-255 used for CAA records. |
| `id` | `int` | No | A unique identifier for each domain record. |
| `name` | `str` | No | The host name, alias, or service being defined by the record. |
| `port` | `int` | No | The port for SRV records. |
| `priority` | `int` | No | The priority for SRV and MX records. |
| `tag` | `str` | No | The parameter tag for CAA records. |
| `ttl` | `int` | No | This value is the time to live for the record, in seconds. |
| `type` | `str` | Yes | The type of the DNS record. |
| `weight` | `int` | No | The weight for SRV records. |

### Operations

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.DomainRecord().create({
    "domain_name": "example_domain_name",  # str
    "type": "example_type",  # str
})
```

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.DomainRecord().list({"domain_name": "example"})
for domain_record in results:
    print(domain_record)
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.DomainRecord().load({"id": 1, "domain_name": "domain_name"})
```

#### `patch(reqdata, ctrl=None) -> dict`

Change part of an existing entity: only the fields given are sent. The data must include the entity `id`. Returns the patched entity data and raises on error.

```python
result = client.DomainRecord().patch({
    "id": 1,
    "domain_name": "domain_name",
    # Only the fields to change
})
```

#### `remove(reqmatch, ctrl=None) -> dict`

Remove the entity matching the given criteria. Raises on error.

```python
result = client.DomainRecord().remove({"id": 1, "domain_name": "domain_name"})
```

#### `update(reqdata, ctrl=None) -> dict`

Update an existing entity. The data must include the entity `id`. Returns the updated entity data and raises on error.

```python
result = client.DomainRecord().update({
    "id": 1,
    "domain_name": "domain_name",
    # Fields to update
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `DomainRecordEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## DropletEntity

```python
droplet = client.Droplet()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `backup_ids` | `list` | Yes | An array of backup IDs of any backups that have been taken of the Droplet instance. |
| `created_at` | `str` | Yes | A time value given in ISO8601 combined date and time format that represents when the Droplet was created. |
| `disk` | `int` | Yes | The size of the Droplet's disk in gigabytes. |
| `disk_info` | `list` | No | An array of objects containing information about the disks available to the Droplet. |
| `droplet` | `dict` | No |  |
| `features` | `list` | Yes | An array of features enabled on this Droplet. |
| `gpu_info` | `dict` | No | An object containing information about the GPU capabilities of Droplets created with this size. |
| `id` | `int` | Yes | A unique identifier for each Droplet instance. |
| `image` | `Any` | Yes |  |
| `kernel` | `dict` | No | **Note**: All Droplets created after March 2017 use internal kernels by default. |
| `links` | `dict` | No |  |
| `locked` | `bool` | Yes | A boolean value indicating whether the Droplet has been locked, preventing actions by users. |
| `memory` | `int` | Yes | Memory of the Droplet in megabytes. |
| `meta` | `Any` | Yes |  |
| `name` | `str` | Yes | The human-readable name set for the Droplet instance. |
| `networks` | `dict` | Yes | The details of the network that are configured for the Droplet instance. |
| `next_backup_window` | `Any` | Yes |  |
| `policies` | `dict` | No | A map where the keys are the Droplet IDs and the values are objects containing the backup policy information for each Droplet. |
| `possible_days` | `list` | No | The day of the week the backup will occur. |
| `possible_window_starts` | `list` | No | An array of integers representing the hours of the day that a backup can start. |
| `region` | `dict` | Yes |  |
| `retention_period_days` | `int` | No | The number of days that a backup will be kept. |
| `size` | `dict` | Yes |  |
| `size_slug` | `str` | Yes | The unique slug identifier for the size of this Droplet. |
| `snapshot_ids` | `list` | Yes | An array of snapshot IDs of any snapshots created from the Droplet instance.<br>Requires `image:read` scope. |
| `status` | `str` | Yes | A status string indicating the state of the Droplet instance. |
| `subnet_uuid` | `str` | No | A string specifying the UUID of the VPC subnet to which the Droplet is assigned.<br>Requires `vpc:read` scope. |
| `tags` | `list` | Yes | An array of Tags the Droplet has been tagged with.<br>Requires `tag:read` scope. |
| `vcpus` | `int` | Yes | The number of virtual CPUs. |
| `volume_ids` | `list` | Yes | A flat array including the unique identifier for each Block Storage volume attached to the Droplet.<br>Requires `block_storage:read` scope. |
| `vpc_uuid` | `str` | No | A string specifying the UUID of the VPC to which the Droplet is assigned.<br>Requires `vpc:read` scope. |
| `window_length_hours` | `int` | No | The number of hours that a backup window is open. |

### Field Usage by Operation

| Field | load | list | create | remove |
| --- | --- | --- | --- | --- |
| `backup_ids` | - | - | - | - |
| `created_at` | - | - | - | - |
| `disk` | - | - | - | - |
| `disk_info` | - | - | - | - |
| `droplet` | - | - | - | - |
| `features` | - | - | - | - |
| `gpu_info` | - | - | - | - |
| `id` | - | - | - | - |
| `image` | - | - | - | - |
| `kernel` | - | - | - | - |
| `links` | - | - | - | - |
| `locked` | - | - | - | - |
| `memory` | - | - | - | - |
| `meta` | - | - | - | - |
| `name` | - | Yes | - | - |
| `networks` | - | - | - | - |
| `next_backup_window` | - | - | - | - |
| `policies` | - | - | - | - |
| `possible_days` | - | - | - | - |
| `possible_window_starts` | - | - | - | - |
| `region` | - | - | - | - |
| `retention_period_days` | - | - | - | - |
| `size` | - | - | - | - |
| `size_slug` | - | - | - | - |
| `snapshot_ids` | - | - | - | - |
| `status` | - | - | - | - |
| `subnet_uuid` | - | - | - | - |
| `tags` | - | - | - | - |
| `vcpus` | - | - | - | - |
| `volume_ids` | - | - | - | - |
| `vpc_uuid` | - | - | - | - |
| `window_length_hours` | - | - | - | - |

### Operations

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.Droplet().create({
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

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.Droplet().list()
for droplet in results:
    print(droplet)
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Droplet().load({"id": 1})
```

#### `remove(reqmatch, ctrl=None) -> dict`

Remove the entity matching the given criteria. Raises on error.

```python
result = client.Droplet().remove({"id": 1})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `DropletEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## DropletActionEntity

```python
droplet_action = client.DropletAction()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `completed_at` | `str` | No | A time value given in ISO8601 combined date and time format that represents when the action was completed. |
| `id` | `int` | No | A unique numeric ID that can be used to identify and reference an action. |
| `region` | `dict` | Yes |  |
| `region_slug` | `str` | No | A human-readable string that is used as a unique identifier for each region. |
| `resource_id` | `int` | No | A unique identifier for the resource that the action is associated with. |
| `resource_type` | `str` | No | The type of resource that the action is associated with. |
| `started_at` | `str` | No | A time value given in ISO8601 combined date and time format that represents when the action was initiated. |
| `status` | `str` | No | The current status of the action. |
| `type` | `str` | No | This is the type of action that the object represents. |

### Operations

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.DropletAction().create({
    "region": {},  # dict
})
```

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.DropletAction().list({"id": 1})
for droplet_action in results:
    print(droplet_action)
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.DropletAction().load({"id": 1, "droplet_id": 1})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `DropletActionEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## DropletAutoscalePoolEntity

```python
droplet_autoscale_pool = client.DropletAutoscalePool()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `active_resources_count` | `int` | Yes | The number of active Droplets in the autoscale pool. |
| `config` | `dict` | Yes | The scaling configuration for an autoscale pool, which is how the pool scales up and down (either by resource utilization or static configuration). |
| `created_at` | `str` | Yes | A time value given in ISO8601 combined date and time format that represents when the autoscale pool was created. |
| `current_instance_count` | `int` | Yes | The current number of Droplets in the autoscale pool. |
| `current_utilization` | `dict` | No |  |
| `desired_instance_count` | `int` | Yes | The target number of Droplets for the autoscale pool after the scaling event. |
| `droplet_id` | `int` | Yes | The unique identifier of the Droplet. |
| `droplet_template` | `dict` | Yes |  |
| `health_status` | `str` | Yes | The health status of the Droplet. |
| `history_event_id` | `str` | Yes | The unique identifier of the history event. |
| `id` | `str` | Yes | A unique identifier for each autoscale pool instance. |
| `name` | `str` | Yes | The human-readable name set for the autoscale pool. |
| `reason` | `str` | Yes | The reason for the scaling event. |
| `status` | `str` | Yes | The current status of the autoscale pool. |
| `unhealthy_reason` | `str` | No | A human-readable description of why the Droplet is unhealthy. |
| `updated_at` | `str` | Yes | A time value given in ISO8601 combined date and time format that represents when the autoscale pool was last updated. |

### Field Usage by Operation

| Field | load | list | create | update | remove |
| --- | --- | --- | --- | --- | --- |
| `active_resources_count` | - | - | - | - | - |
| `config` | - | - | - | - | - |
| `created_at` | - | - | - | - | - |
| `current_instance_count` | - | - | - | - | - |
| `current_utilization` | - | Yes | - | - | - |
| `desired_instance_count` | - | - | - | - | - |
| `droplet_id` | - | - | - | - | - |
| `droplet_template` | - | - | - | - | - |
| `health_status` | - | - | - | - | - |
| `history_event_id` | - | - | - | - | - |
| `id` | - | - | - | - | - |
| `name` | - | - | - | - | - |
| `reason` | - | - | - | - | - |
| `status` | - | - | - | - | - |
| `unhealthy_reason` | - | - | - | - | - |
| `updated_at` | - | - | - | - | - |

### Operations

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.DropletAutoscalePool().create({
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

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.DropletAutoscalePool().list()
for droplet_autoscale_pool in results:
    print(droplet_autoscale_pool)
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.DropletAutoscalePool().load({"autoscale_pool_id": "autoscale_pool_id"})
```

#### `remove(reqmatch, ctrl=None) -> dict`

Remove the entity matching the given criteria. Raises on error.

```python
result = client.DropletAutoscalePool().remove({"autoscale_pool_id": "autoscale_pool_id"})
```

#### `update(reqdata, ctrl=None) -> dict`

Update an existing entity. The data must include the entity `id`. Returns the updated entity data and raises on error.

```python
result = client.DropletAutoscalePool().update({
    "autoscale_pool_id": "autoscale_pool_id",
    # Fields to update
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `DropletAutoscalePoolEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## EmbeddingEntity

```python
embedding = client.Embedding()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `data` | `list` | Yes | One entry for each `input` string, in the same order. |
| `encoding_format` | `str` | No | How embedding values are returned in each `data[].embedding` field. |
| `input` | `Any` | Yes | A single string or 1–2048 strings; each string produces one row in `data`, in order. |
| `model` | `str` | Yes | The embedding model that produced the vectors. |
| `object` | `str` | Yes | The object type, which is always the string `list`. |
| `usage` | `dict` | Yes | Token usage for the embeddings request. |
| `user` | `str` | No | Optional end-user identifier to help with abuse monitoring. |

### Operations

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.Embedding().create({
    "data": [],  # list
    "input": "example_input",  # Any
    "model": "example_model",  # str
    "object": "example_object",  # str
    "usage": {},  # dict
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `EmbeddingEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## EmptyEntity

```python
empty = client.Empty()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `actorId` | `str` | No | Optional actor binding: the user whose connections the session's tool calls use, matched against connection `user_id`. |
| `agentName` | `str` | No | Name of the agent that started the session. |
| `agentUrn` | `str` | No | URN of the agent that started the session. |
| `categories` | `list` | Yes | Required. |
| `config` | `dict` | No | Optional session options. |
| `createdAt` | `str` | No | When the session was created. |
| `insights` | `Any` | No | Omitted when the request omitted insights or explicitly sent null. |
| `mcpUrl` | `str` | No | URL of the session's MCP endpoint, for the agent to connect to. |
| `name` | `str` | Yes | Required human-readable session name. |
| `network` | `Any` | No | Product-level session network binding. |
| `overrides` | `list` | Yes | Required. |
| `owning_user_id` | `str` | No | DigitalOcean user ID of the user who created the session, when recorded. |
| `policy` | `Any` | No | Optional tool-permission policy. |
| `session` | `Any` | No | The created session. |
| `sessionUrn` | `str` | No | Session URN, for example `do:managed_agent_session:<uuid>`. |
| `tools` | `list` | No | Canonical, version-pinned selected tool references. |
| `updatedAt` | `str` | No | When the session was last modified. |

### Field Usage by Operation

| Field | list | create | remove |
| --- | --- | --- | --- |
| `actorId` | - | - | - |
| `agentName` | - | - | - |
| `agentUrn` | - | - | - |
| `categories` | - | - | - |
| `config` | - | - | - |
| `createdAt` | - | - | - |
| `insights` | - | - | - |
| `mcpUrl` | - | - | - |
| `name` | Yes | - | - |
| `network` | - | - | - |
| `overrides` | - | - | - |
| `owning_user_id` | - | - | - |
| `policy` | - | - | - |
| `session` | - | - | - |
| `sessionUrn` | - | - | - |
| `tools` | - | - | - |
| `updatedAt` | - | - | - |

### Operations

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.Empty().create({
    "categories": [],  # list
    "name": "example_name",  # str
    "overrides": [],  # list
})
```

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.Empty().list()
for empty in results:
    print(empty)
```

#### `remove(reqmatch, ctrl=None) -> dict`

Remove the entity matching the given criteria. Raises on error.

```python
result = client.Empty().remove({"session_urn": "session_urn"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `EmptyEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## FirewallEntity

```python
firewall = client.Firewall()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `created_at` | `str` | No | A time value given in ISO8601 combined date and time format that represents when the firewall was created. |
| `droplet_ids` | `list` | No | An array containing the IDs of the Droplets assigned to the firewall. |
| `id` | `str` | No | A unique ID that can be used to identify and reference a firewall. |
| `inbound_rules` | `list` | No |  |
| `name` | `str` | No | A human-readable name for a firewall. |
| `outbound_rules` | `list` | No |  |
| `pending_changes` | `list` | No | An array of objects each containing the fields "droplet_id", "removing", and "status". |
| `status` | `str` | No | A status string indicating the current state of the firewall. |
| `tags` | `Any` | No |  |

### Field Usage by Operation

| Field | load | list | create | update | remove |
| --- | --- | --- | --- | --- | --- |
| `created_at` | - | - | - | - | - |
| `droplet_ids` | - | - | - | - | - |
| `id` | - | - | - | - | - |
| `inbound_rules` | - | - | - | - | - |
| `name` | - | - | Yes | Yes | - |
| `outbound_rules` | - | - | - | - | - |
| `pending_changes` | - | - | - | - | - |
| `status` | - | - | - | - | - |
| `tags` | - | - | - | - | - |

### Operations

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.Firewall().create({
})
```

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.Firewall().list()
for firewall in results:
    print(firewall)
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Firewall().load({"id": "firewall_id"})
```

#### `remove(reqmatch, ctrl=None) -> dict`

Remove the entity matching the given criteria. Raises on error.

```python
result = client.Firewall().remove({"id": "firewall_id"})
```

#### `update(reqdata, ctrl=None) -> dict`

Update an existing entity. The data must include the entity `id`. Returns the updated entity data and raises on error.

```python
result = client.Firewall().update({
    "id": "firewall_id",
    # Fields to update
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `FirewallEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## FloatingIpEntity

```python
floating_ip = client.FloatingIp()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `droplet` | `Any` | No | The Droplet that the floating IP has been assigned to. |
| `floating_ip` | `dict` | No |  |
| `id` | `str` | No |  |
| `ip` | `str` | No | The public IP address of the floating IP. |
| `links` | `dict` | No |  |
| `locked` | `bool` | No | A boolean value indicating whether or not the floating IP has pending actions preventing new ones from being submitted. |
| `project_id` | `str` | No | The UUID of the project to which the reserved IP currently belongs.<br><br>Requires `project:read` scope. |
| `region` | `Any` | No |  |

### Operations

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.FloatingIp().create({
})
```

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.FloatingIp().list()
for floating_ip in results:
    print(floating_ip)
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.FloatingIp().load({"id": "floating_ip_id"})
```

#### `remove(reqmatch, ctrl=None) -> dict`

Remove the entity matching the given criteria. Raises on error.

```python
result = client.FloatingIp().remove({"id": "floating_ip_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `FloatingIpEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## FloatingIpActionEntity

```python
floating_ip_action = client.FloatingIpAction()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `action` | `dict` | No |  |
| `completed_at` | `str` | No | A time value given in ISO8601 combined date and time format that represents when the action was completed. |
| `id` | `int` | No | A unique numeric ID that can be used to identify and reference an action. |
| `project_id` | `str` | No | The UUID of the project to which the reserved IP currently belongs. |
| `region` | `dict` | Yes |  |
| `region_slug` | `str` | No | A human-readable string that is used as a unique identifier for each region. |
| `resource_id` | `int` | No | A unique identifier for the resource that the action is associated with. |
| `resource_type` | `str` | No | The type of resource that the action is associated with. |
| `started_at` | `str` | No | A time value given in ISO8601 combined date and time format that represents when the action was initiated. |
| `status` | `str` | No | The current status of the action. |
| `type` | `str` | No | This is the type of action that the object represents. |

### Operations

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.FloatingIpAction().create({
    "floating_ip_id": "example_floating_ip_id",  # str
    "region": {},  # dict
})
```

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.FloatingIpAction().list({"floating_ip_id": "example"})
for floating_ip_action in results:
    print(floating_ip_action)
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.FloatingIpAction().load({"id": 1, "floating_ip_id": "floating_ip_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `FloatingIpActionEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## FunctionKeyEntity

```python
function_key = client.FunctionKey()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `created_at` | `str` | No | The date and time the key was created. |
| `expires_at` | `str` | No | When the key expires (null for non-expiring keys). |
| `expires_in` | `str` | No | The duration after which the access key expires, specified as a human-readable duration string in the format `<int>h` (hours) or `<int>d` (days). |
| `id` | `str` | No | The access key's unique identifier with prefix 'dof_v1_'. |
| `name` | `str` | Yes | The access key's name. |
| `updated_at` | `str` | No | The date and time the key was last updated. |

### Field Usage by Operation

| Field | list | create | update | remove |
| --- | --- | --- | --- | --- |
| `created_at` | - | - | - | - |
| `expires_at` | - | - | - | - |
| `expires_in` | - | - | - | - |
| `id` | - | - | - | - |
| `name` | Yes | - | Yes | - |
| `updated_at` | - | - | - | - |

### Operations

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.FunctionKey().create({
    "namespace_id": "example_namespace_id",  # str
    "name": "example_name",  # str
})
```

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.FunctionKey().list({"namespace_id": "example"})
for function_key in results:
    print(function_key)
```

#### `remove(reqmatch, ctrl=None) -> dict`

Remove the entity matching the given criteria. Raises on error.

```python
result = client.FunctionKey().remove({"id": "id", "namespace_id": "namespace_id"})
```

#### `update(reqdata, ctrl=None) -> dict`

Update an existing entity. The data must include the entity `id`. Returns the updated entity data and raises on error.

```python
result = client.FunctionKey().update({
    "id": "id",
    "namespace_id": "namespace_id",
    # Fields to update
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `FunctionKeyEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## FunctionNamespaceEntity

```python
function_namespace = client.FunctionNamespace()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `api_host` | `str` | No | The namespace's API hostname. |
| `created_at` | `str` | No | UTC time string. |
| `key` | `str` | No | A random alpha numeric string. |
| `label` | `str` | No | The namespace's unique name. |
| `namespace` | `str` | No | A unique string format of UUID with a prefix fn-. |
| `region` | `str` | No | The namespace's datacenter region. |
| `updated_at` | `str` | No | UTC time string. |
| `uuid` | `str` | No | The namespace's Universally Unique Identifier. |

### Field Usage by Operation

| Field | load | list | create | remove |
| --- | --- | --- | --- | --- |
| `api_host` | - | - | - | - |
| `created_at` | - | - | - | - |
| `key` | - | - | - | - |
| `label` | - | - | Yes | - |
| `namespace` | - | - | - | - |
| `region` | - | - | Yes | - |
| `updated_at` | - | - | - | - |
| `uuid` | - | - | - | - |

### Operations

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.FunctionNamespace().create({
})
```

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.FunctionNamespace().list()
for function_namespace in results:
    print(function_namespace)
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.FunctionNamespace().load({"namespace_id": "namespace_id"})
```

#### `remove(reqmatch, ctrl=None) -> dict`

Remove the entity matching the given criteria. Raises on error.

```python
result = client.FunctionNamespace().remove({"namespace_id": "namespace_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `FunctionNamespaceEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## FunctionTriggerEntity

```python
function_trigger = client.FunctionTrigger()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `created_at` | `str` | No | UTC time string. |
| `function` | `str` | No | Name of function(action) that exists in the given namespace. |
| `is_enabled` | `bool` | No | Indicates weather the trigger is paused or unpaused. |
| `name` | `str` | No | The trigger's unique name within the namespace. |
| `namespace` | `str` | No | A unique string format of UUID with a prefix fn-. |
| `scheduled_details` | `dict` | Yes | Trigger details for SCHEDULED type, where body is optional. |
| `scheduled_runs` | `dict` | No |  |
| `type` | `str` | No | String which indicates the type of trigger source like SCHEDULED. |
| `updated_at` | `str` | No | UTC time string. |

### Field Usage by Operation

| Field | load | list | create | update | remove |
| --- | --- | --- | --- | --- | --- |
| `created_at` | - | - | - | - | - |
| `function` | - | - | Yes | - | - |
| `is_enabled` | - | - | Yes | - | - |
| `name` | - | - | Yes | - | - |
| `namespace` | - | - | - | - | - |
| `scheduled_details` | - | - | - | - | - |
| `scheduled_runs` | - | - | - | - | - |
| `type` | - | - | Yes | - | - |
| `updated_at` | - | - | - | - | - |

### Operations

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.FunctionTrigger().create({
    "namespace_id": "example_namespace_id",  # str
    "scheduled_details": {},  # dict
})
```

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.FunctionTrigger().list({"namespace_id": "example"})
for function_trigger in results:
    print(function_trigger)
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.FunctionTrigger().load({"namespace_id": "namespace_id", "trigger_name": "trigger_name"})
```

#### `remove(reqmatch, ctrl=None) -> dict`

Remove the entity matching the given criteria. Raises on error.

```python
result = client.FunctionTrigger().remove({"namespace_id": "namespace_id", "trigger_name": "trigger_name"})
```

#### `update(reqdata, ctrl=None) -> dict`

Update an existing entity. The data must include the entity `id`. Returns the updated entity data and raises on error.

```python
result = client.FunctionTrigger().update({
    "namespace_id": "namespace_id",
    "trigger_name": "trigger_name",
    # Fields to update
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `FunctionTriggerEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## GenaiapiRegionEntity

```python
genaiapi_region = client.GenaiapiRegion()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `inference_url` | `str` | No | Url for inference server |
| `region` | `str` | No | Region code |
| `serves_batch` | `bool` | No | This datacenter is capable of running batch jobs |
| `serves_inference` | `bool` | No | This datacenter is capable of serving inference |
| `stream_inference_url` | `str` | No | The url for the inference streaming server |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.GenaiapiRegion().list()
for genaiapi_region in results:
    print(genaiapi_region)
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `GenaiapiRegionEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ImageEntity

```python
image = client.Image()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `created_at` | `str` | No | A time value given in ISO8601 combined date and time format that represents when the image was created. |
| `description` | `str` | No | An optional free-form text field to describe an image. |
| `distribution` | `str` | No | The name of a custom image's distribution. |
| `error_message` | `str` | No | A string containing information about errors that may occur when importing a custom image. |
| `id` | `int` | No | A unique number that can be used to identify and reference a specific image. |
| `min_disk_size` | `int` | No | The minimum disk size in GB required for a Droplet to use this image. |
| `name` | `str` | No | The display name that has been given to an image. |
| `public` | `bool` | No | This is a boolean value that indicates whether the image in question is public or not. |
| `region` | `str` | Yes | The slug identifier for the region where the resource will initially be available. |
| `regions` | `list` | No | This attribute is an array of the regions that the image is available in. |
| `size_gigabytes` | `float` | No | The size of the image in gigabytes. |
| `slug` | `str` | No | A uniquely identifying string that is associated with each of the DigitalOcean-provided public images. |
| `status` | `str` | No | A status string indicating the state of a custom image. |
| `tags` | `list` | No | A flat array of tag names as strings to be applied to the resource. |
| `type` | `str` | No | Describes the kind of image. |
| `url` | `str` | Yes | A URL from which the custom Linux virtual machine image may be retrieved. |

### Field Usage by Operation

| Field | load | list | create | update | remove |
| --- | --- | --- | --- | --- | --- |
| `created_at` | - | - | - | - | - |
| `description` | - | - | - | - | - |
| `distribution` | - | - | - | - | - |
| `error_message` | - | - | - | - | - |
| `id` | - | - | - | - | - |
| `min_disk_size` | - | - | - | - | - |
| `name` | - | - | Yes | - | - |
| `public` | - | - | - | - | - |
| `region` | - | - | - | - | - |
| `regions` | - | - | - | - | - |
| `size_gigabytes` | - | - | - | - | - |
| `slug` | - | - | - | - | - |
| `status` | - | - | - | - | - |
| `tags` | - | - | - | - | - |
| `type` | - | - | - | - | - |
| `url` | - | - | - | - | - |

### Operations

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.Image().create({
    "region": "example_region",  # str
    "url": "example_url",  # str
})
```

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.Image().list()
for image in results:
    print(image)
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Image().load({"id": "image_id"})
```

#### `remove(reqmatch, ctrl=None) -> dict`

Remove the entity matching the given criteria. Raises on error.

```python
result = client.Image().remove({"id": 1})
```

#### `update(reqdata, ctrl=None) -> dict`

Update an existing entity. The data must include the entity `id`. Returns the updated entity data and raises on error.

```python
result = client.Image().update({
    "id": 1,
    # Fields to update
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ImageEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ImageActionEntity

```python
image_action = client.ImageAction()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `completed_at` | `str` | No | A time value given in ISO8601 combined date and time format that represents when the action was completed. |
| `id` | `int` | No | A unique numeric ID that can be used to identify and reference an action. |
| `region` | `dict` | Yes |  |
| `region_slug` | `str` | No | A human-readable string that is used as a unique identifier for each region. |
| `resource_id` | `int` | No | A unique identifier for the resource that the action is associated with. |
| `resource_type` | `str` | No | The type of resource that the action is associated with. |
| `started_at` | `str` | No | A time value given in ISO8601 combined date and time format that represents when the action was initiated. |
| `status` | `str` | No | The current status of the action. |
| `type` | `str` | No | This is the type of action that the object represents. |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.ImageAction().list({"id": 1})
for image_action in results:
    print(image_action)
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ImageActionEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## InsightEntity

```python
insight = client.Insight()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `channel_type` | `str` | Yes | The configured channel type. |
| `created_at` | `str` | Yes | Time the alert rule was created. |
| `email` | `dict` | Yes | Email notification channel configuration. |
| `id` | `str` | Yes | A unique identifier for the alert instance. |
| `last_notified_at` | `str` | No | Time a notification was last sent for this alert instance. |
| `last_triggered_at` | `str` | Yes | Time the alert instance most recently fired. |
| `name` | `str` | Yes | A human-readable name for the notification channel. |
| `resolved_at` | `str` | No | Time the alert instance resolved. |
| `resource_urn` | `str` | No | URN of the DigitalOcean resource the alert fired for. |
| `rule_id` | `str` | Yes | ID of the alert rule that fired this alert instance. |
| `severity` | `str` | Yes | Severity of the breached threshold. |
| `slack` | `dict` | Yes | Slack notification channel configuration as returned in API responses. |
| `spec` | `dict` | Yes | Spec for an Insights alert rule. |
| `status` | `str` | Yes | Current status of the alert instance. |
| `triggered_at` | `str` | Yes | Time the alert instance first fired. |
| `updated_at` | `str` | Yes | Time the alert rule was last updated. |
| `usage` | `Any` | No |  |
| `value` | `float` | Yes | The observed metric value that breached the threshold. |
| `webhook` | `dict` | Yes | Generic HTTPS webhook notification channel configuration as returned in API responses. |

### Field Usage by Operation

| Field | load | list | create | update | remove |
| --- | --- | --- | --- | --- | --- |
| `channel_type` | - | - | - | - | - |
| `created_at` | - | - | - | - | - |
| `email` | - | - | - | - | - |
| `id` | - | - | - | - | - |
| `last_notified_at` | - | - | - | - | - |
| `last_triggered_at` | - | - | - | - | - |
| `name` | - | - | - | - | - |
| `resolved_at` | - | - | - | - | - |
| `resource_urn` | - | - | - | - | - |
| `rule_id` | - | - | - | - | - |
| `severity` | - | - | - | - | - |
| `slack` | - | - | - | - | - |
| `spec` | - | - | - | - | - |
| `status` | - | - | - | Yes | - |
| `triggered_at` | - | - | - | - | - |
| `updated_at` | - | - | - | - | - |
| `usage` | - | - | - | - | - |
| `value` | - | - | - | - | - |
| `webhook` | - | - | - | - | - |

### Operations

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Insight().load({"id": "insight_id"})
```

#### `remove(reqmatch, ctrl=None) -> dict`

Remove the entity matching the given criteria. Raises on error.

```python
result = client.Insight().remove({"id": "insight_id"})
```

#### `update(reqdata, ctrl=None) -> dict`

Update an existing entity. The data must include the entity `id`. Returns the updated entity data and raises on error.

```python
result = client.Insight().update({
    "id": "insight_id",
    # Fields to update
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `InsightEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## InvoiceSummaryEntity

```python
invoice_summary = client.InvoiceSummary()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `amount` | `str` | No | Total amount of the invoice, in USD. |
| `billing_period` | `str` | No | Billing period of usage for which the invoice is issued, in `YYYY-MM` format. |
| `credits_and_adjustments` | `Any` | No |  |
| `id` | `str` | No |  |
| `invoice_id` | `str` | No | ID of the invoice |
| `invoice_uuid` | `str` | No | UUID of the invoice |
| `overages` | `Any` | No |  |
| `product_charges` | `Any` | No |  |
| `taxes` | `Any` | No |  |
| `user_billing_address` | `Any` | No |  |
| `user_company` | `str` | No | Company of the DigitalOcean customer being invoiced, if set. |
| `user_email` | `str` | No | Email of the DigitalOcean customer being invoiced. |
| `user_name` | `str` | No | Name of the DigitalOcean customer being invoiced. |

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.InvoiceSummary().load({"id": "invoice_summary_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `InvoiceSummaryEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## KuberneteEntity

```python
kubernete = client.Kubernete()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `amd_gpu_device_metrics_exporter_plugin` | `dict` | No | An object specifying whether the AMD Device Metrics Exporter should be enabled in the Kubernetes cluster. |
| `amd_gpu_device_plugin` | `dict` | No | An object specifying whether the AMD GPU Device Plugin should be enabled in the Kubernetes cluster. |
| `amd_gpu_dra_driver` | `dict` | No | An object specifying whether the AMD GPU DRA Driver should be enabled in the Kubernetes cluster. |
| `auto_scale` | `bool` | No | A boolean value indicating whether auto-scaling is enabled for this node pool. |
| `auto_upgrade` | `bool` | No | A boolean value indicating whether the cluster will be automatically upgraded to new patch releases during its maintenance window. |
| `cluster_autoscaler_configuration` | `dict` | No | An object specifying custom cluster autoscaler configuration. |
| `cluster_subnet` | `str` | No | The range of IP addresses for the overlay network of the Kubernetes cluster in CIDR notation. |
| `control_plane_firewall` | `dict` | No | An object specifying the control plane firewall for the Kubernetes cluster. |
| `coredns_autoscaler` | `dict` | No | An object specifying whether the Cluster Proportional Autoscaler (CPA) add-on for CoreDNS should be enabled for the Kubernetes cluster. |
| `count` | `int` | Yes | The number of Droplet instances in the node pool. |
| `created_at` | `str` | No | A time value given in ISO8601 combined date and time format that represents when the Kubernetes cluster was created. |
| `endpoint` | `str` | No | The base URL of the API server on the Kubernetes master node. |
| `gpu_partition_mode` | `str` | No | The AMD GPU partition mode for this node pool. |
| `ha` | `bool` | No | A boolean value indicating whether the control plane is run in a highly available configuration in the cluster. |
| `id` | `str` | No | A unique ID that can be used to identify and reference a specific node pool. |
| `ipv4` | `str` | No | The public IPv4 address of the Kubernetes master node. |
| `isolated_workers` | `bool` | No | A boolean value indicating whether worker nodes in the cluster are not assigned public IP addresses. |
| `kubernetes_version` | `str` | No | The upstream version string for the version of Kubernetes provided by a given slug. |
| `labels` | `dict` | No | An object of key/value mappings specifying labels to apply to all nodes in a pool. |
| `maintenance_policy` | `dict` | No | An object specifying the maintenance window policy for the Kubernetes cluster. |
| `max_nodes` | `int` | No | The maximum number of nodes that this node pool can be auto-scaled to. |
| `message` | `str` | No | Status information about the cluster which impacts it's lifecycle. |
| `min_nodes` | `int` | No | The minimum number of nodes that this node pool can be auto-scaled to. |
| `name` | `str` | Yes | A human-readable name for the node pool. |
| `nfs_csi_plugin` | `dict` | No | An object specifying whether the NFS CSI plugin should be enabled for the Kubernetes cluster. |
| `node_pools` | `list` | Yes | An object specifying the details of the worker nodes available to the Kubernetes cluster. |
| `nodes` | `list` | No | An object specifying the details of a specific worker node in a node pool. |
| `nvidia_gpu_device_plugin` | `dict` | No | An object specifying whether the Nvidia GPU Device Plugin should be enabled in the Kubernetes cluster. |
| `nvidia_gpu_dra_driver` | `dict` | No | An object specifying whether the NVIDIA GPU DRA Driver should be enabled in the Kubernetes cluster. |
| `p2p_oci_registry_plugin` | `dict` | No | An object specifying whether the Peer-to-peer OCI registry component should be enabled for the Kubernetes cluster. |
| `rdma_shared_dev_plugin` | `dict` | No | An object specifying whether the RDMA shared device plugin should be enabled in the Kubernetes cluster. |
| `region` | `str` | Yes | The slug identifier for the region where the Kubernetes cluster is located. |
| `registries` | `list` | No | An array of integrated DOCR registries. |
| `registry_enabled` | `bool` | No | A read-only boolean value indicating if a container registry is integrated with the cluster. |
| `routing_agent` | `dict` | No | An object specifying whether the routing-agent component should be enabled for the Kubernetes cluster. |
| `service_subnet` | `str` | No | The range of assignable IP addresses for services running in the Kubernetes cluster in CIDR notation. |
| `size` | `str` | Yes | The slug identifier for the type of Droplet used as workers in the node pool. |
| `slug` | `str` | No | The slug identifier for an available version of Kubernetes for use when creating or updating a cluster. |
| `sso` | `dict` | No | An object specifying Single Sign-On (SSO) configuration for the Kubernetes cluster. |
| `status` | `dict` | No | An object containing a `state` attribute whose value is set to a string indicating the current status of the cluster. |
| `supported_features` | `list` | No | The features available with the version of Kubernetes provided by a given slug. |
| `surge_upgrade` | `bool` | No | A boolean value indicating whether surge upgrade is enabled/disabled for the cluster. |
| `tags` | `list` | No | An array containing the tags applied to the node pool. |
| `taints` | `list` | No | An array of taints to apply to all nodes in a pool. |
| `timestamp` | `str` | No | A timestamp in ISO8601 format that represents when the status message was emitted. |
| `updated_at` | `str` | No | A time value given in ISO8601 combined date and time format that represents when the Kubernetes cluster was last updated. |
| `version` | `str` | Yes | The slug identifier for the version of Kubernetes used for the cluster. |
| `vpc_uuid` | `str` | No | A string specifying the UUID of the VPC to which the Kubernetes cluster is assigned.<br><br>Requires `vpc:read` scope. |
| `worker_subnet_uuid` | `str` | No | The UUID of the VPC subnet worker nodes are attached to. |

### Operations

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.Kubernete().create({
    "cluster_id": "example_cluster_id",  # str
    "count": 1,  # int
    "name": "example_name",  # str
    "node_pools": [],  # list
    "region": "example_region",  # str
    "size": "example_size",  # str
    "version": "example_version",  # str
})
```

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.Kubernete().list({"cluster_id": "example"})
for kubernete in results:
    print(kubernete)
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Kubernete().load({"cluster_id": "cluster_id"})
```

#### `remove(reqmatch, ctrl=None) -> dict`

Remove the entity matching the given criteria. Raises on error.

```python
result = client.Kubernete().remove({"cluster_id": "cluster_id"})
```

#### `update(reqdata, ctrl=None) -> dict`

Update an existing entity. The data must include the entity `id`. Returns the updated entity data and raises on error.

```python
result = client.Kubernete().update({
    "cluster_id": "cluster_id",
    # Fields to update
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `KuberneteEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## KubernetesOptionEntity

```python
kubernetes_option = client.KubernetesOption()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `regions` | `list` | No |  |
| `sizes` | `list` | No |  |
| `versions` | `list` | No |  |

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.KubernetesOption().load()
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `KubernetesOptionEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ListMcpServerToolEntity

```python
list_mcp_server_tool = client.ListMcpServerTool()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `description` | `str` | No | Tool description as the server reports it. |
| `enabled` | `bool` | No | Whether the tool is enabled in your team's catalog. |
| `enabledToolSlugs` | `list` | Yes | The complete set of tool slugs (`<server_ref>_<name>`) to enable; every other tool of the server is disabled. |
| `name` | `str` | No | Tool name as the server reports it, normalized to the catalog's naming rules. |
| `quarantineReason` | `str` | No | Why the tool was quarantined; empty otherwise. |
| `quarantined` | `bool` | No | True when the enabled tool was suspended because it disappeared from the server or its input schema changed incompatibly. |
| `toolSlug` | `str` | No | `<server_ref>_<name>`: the tool's catalog slug, and the value to list in `enabledToolSlugs`. |
| `tools` | `list` | No | Tools sorted by name. |
| `user_id` | `str` | No | Required for a server registered with `credentialRefSource` connection when a tool needs verification against the live server, which can only be reached as a user who has authorized it. |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.ListMcpServerTool().list({"server_ref": "example"})
for list_mcp_server_tool in results:
    print(list_mcp_server_tool)
```

#### `update(reqdata, ctrl=None) -> dict`

Update an existing entity. The data must include the entity `id`. Returns the updated entity data and raises on error.

```python
result = client.ListMcpServerTool().update({
    "server_ref": "server_ref",
    # Fields to update
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ListMcpServerToolEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ListProviderEntity

```python
list_provider = client.ListProvider()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `auth_type` | `str` | No | Deprecated: read `auth_types`, since a provider may accept more than one credential kind. |
| `auth_types` | `list` | No | Credential kinds the provider accepts, sorted: none|oauth|`shared_api_key`|unknown|`user_oauth_app`|`user_token`. |
| `connection_parameters` | `list` | No | Non-sensitive values collected when creating a connection. |
| `credential_parameters` | `list` | No | Non-secret values collected when registering an API key provider credential. |
| `description` | `str` | No | Provider description. |
| `display_name` | `str` | No | Human-readable provider name. |
| `name` | `str` | No | Provider slug, used as provider when creating a connection or a provider credential. |
| `oauth_client_setup_url` | `str` | No | HTTPS page at the provider where a team creates that OAuth client, such as its developer console or setup guide. |
| `oauth_redirect_url` | `str` | No | Callback URL a team must register with the provider when it creates its own OAuth client. |
| `scopes` | `list` | No | The OAuth scopes a connection may request; a connection that requests none gets all of them. |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.ListProvider().list()
for list_provider in results:
    print(list_provider)
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ListProviderEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ListProviderHealthEntity

```python
list_provider_health = client.ListProviderHealth()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `health` | `Any` | No | Metrics over the window. |
| `provider` | `str` | No | Provider ID. |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.ListProviderHealth().list()
for list_provider_health in results:
    print(list_provider_health)
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ListProviderHealthEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ListToolEntity

```python
list_tool = client.ListTool()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `definitions` | `list` | No | definitions[i] describes tools[i]. |
| `pagination` | `Any` | No | page and `per_page` echo the values applied; total is the number of tools matching `toolkitId` across all pages. |
| `tools` | `list` | No | Tools on this page, grouped by provider and sorted by name within a provider. |
| `version` | `str` | No | Catalog version identifier, for example `v1`. |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.ListTool().list()
for list_tool in results:
    print(list_tool)
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ListToolEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ListToolHealthEntity

```python
list_tool_health = client.ListToolHealth()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `health` | `Any` | No | Metrics over the window. |
| `provider` | `str` | No | ID of the provider that offers the tool. |
| `tool_slug` | `str` | No | Catalog tool slug. |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.ListToolHealth().list()
for list_tool_health in results:
    print(list_tool_health)
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ListToolHealthEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ListToolbeltProviderEntity

```python
list_toolbelt_provider = client.ListToolbeltProvider()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `categories` | `list` | No | The distinct tool categories among this toolbelt's members for the provider (sorted). |
| `created_at` | `str` | No | When the provider was added to the catalog. |
| `description` | `str` | No | Provider description. |
| `id` | `str` | No | Equals provider; present so the entry has the same shape as a toolkit. |
| `name` | `str` | No | The provider's display name. |
| `provider` | `str` | No | The provider ID. |
| `tool_count` | `int` | No | How many toolbelt members belong to this provider. |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.ListToolbeltProvider().list({"name": "example"})
for list_toolbelt_provider in results:
    print(list_toolbelt_provider)
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ListToolbeltProviderEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ListToolkitEntity

```python
list_toolkit = client.ListToolkit()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `categories` | `list` | No | Distinct categories of the provider's released tools, sorted. |
| `created_at` | `str` | No | When the provider was added. |
| `description` | `str` | No | Provider description. |
| `id` | `str` | No | Provider ID. |
| `name` | `str` | No | Human-readable provider name. |
| `provider_kind` | `str` | No | Classifies the provider, for example `managed_api` or `byo_mcp` (one of your team's MCP servers). |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.ListToolkit().list()
for list_toolkit in results:
    print(list_toolkit)
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ListToolkitEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## LoadBalancerEntity

```python
load_balancer = client.LoadBalancer()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `algorithm` | `str` | No | This field has been deprecated. |
| `created_at` | `str` | No | A time value given in ISO8601 combined date and time format that represents when the load balancer was created. |
| `disable_lets_encrypt_dns_records` | `bool` | No | A boolean value indicating whether to disable automatic DNS record creation for Let's Encrypt certificates that are added to the load balancer. |
| `domains` | `list` | No | An array of objects specifying the domain configurations for a Global load balancer. |
| `droplet_ids` | `list` | No | An array containing the IDs of the Droplets assigned to the load balancer. |
| `enable_backend_keepalive` | `bool` | No | A boolean value indicating whether HTTP keepalive connections are maintained to target Droplets. |
| `enable_proxy_protocol` | `bool` | No | A boolean value indicating whether PROXY Protocol is in use. |
| `firewall` | `dict` | No | An object specifying allow and deny rules to control traffic to the load balancer. |
| `forwarding_rules` | `list` | Yes | An array of objects specifying the forwarding rules for a load balancer. |
| `glb_settings` | `dict` | No | An object specifying forwarding configurations for a Global load balancer. |
| `health_check` | `dict` | No | An object specifying health check settings for the load balancer. |
| `http_idle_timeout_seconds` | `int` | No | An integer value which configures the idle timeout for HTTP requests to the target droplets. |
| `id` | `str` | No | A unique ID that can be used to identify and reference a load balancer. |
| `ip` | `str` | No | An attribute containing the public-facing IP address of the load balancer. |
| `ipv6` | `str` | No | An attribute containing the public-facing IPv6 address of the load balancer. |
| `name` | `str` | No | A human-readable name for a load balancer instance. |
| `network` | `str` | No | A string indicating whether the load balancer should be external or internal. |
| `network_stack` | `str` | No | A string indicating whether the load balancer will support IPv4 or both IPv4 and IPv6 networking. |
| `project_id` | `str` | No | The ID of the project that the load balancer is associated with. |
| `redirect_http_to_https` | `bool` | No | A boolean value indicating whether HTTP requests to the load balancer on port 80 will be redirected to HTTPS on port 443. |
| `region` | `dict` | No |  |
| `size` | `str` | No | This field has been replaced by the `size_unit` field for all regions except in AMS2, NYC2, and SFO1. |
| `size_unit` | `int` | No | How many nodes the load balancer contains. |
| `status` | `str` | No | A status string indicating the current state of the load balancer. |
| `sticky_sessions` | `dict` | No | An object specifying sticky sessions settings for the load balancer. |
| `subnet_uuid` | `str` | No | A string specifying the UUID of the VPC subnet to which the load balancer is assigned. |
| `tag` | `str` | No | The name of a Droplet tag corresponding to Droplets assigned to the load balancer. |
| `target_load_balancer_ids` | `list` | No | An array containing the UUIDs of the Regional load balancers to be used as target backends for a Global load balancer. |
| `tls_cipher_policy` | `str` | No | A string indicating the policy for the TLS cipher suites used by the load balancer. |
| `type` | `str` | No | A string indicating whether the load balancer should be a standard regional HTTP load balancer, a regional network load balancer that routes traffic at the TCP/UDP transport layer, or a global load balancer. |
| `vpc_uuid` | `str` | No | A string specifying the UUID of the VPC to which the load balancer is assigned. |

### Operations

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.LoadBalancer().create({
    "forwarding_rules": [],  # list
})
```

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.LoadBalancer().list()
for load_balancer in results:
    print(load_balancer)
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.LoadBalancer().load({"id": "load_balancer_id"})
```

#### `remove(reqmatch, ctrl=None) -> dict`

Remove the entity matching the given criteria. Raises on error.

```python
result = client.LoadBalancer().remove({"id": "load_balancer_id"})
```

#### `update(reqdata, ctrl=None) -> dict`

Update an existing entity. The data must include the entity `id`. Returns the updated entity data and raises on error.

```python
result = client.LoadBalancer().update({
    "id": "load_balancer_id",
    # Fields to update
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `LoadBalancerEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## LogsSearchEntity

```python
logs_search = client.LogsSearch()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `data` | `list` | No | Matching log records. |
| `filter` | `dict` | No | A boolean filter tree for logs queries. |
| `order_by` | `list` | No | Sort clauses applied to the result set. |
| `pagination` | `dict` | No | Pagination response. |
| `time_range` | `dict` | Yes | An inclusive query time window. |

### Operations

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.LogsSearch().create({
    "query_id": "example_query_id",  # str
    "time_range": {},  # dict
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `LogsSearchEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## LogsinkEntity

```python
logsink = client.Logsink()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `config` | `Any` | Yes |  |
| `id` | `str` | No |  |
| `sink_id` | `str` | Yes | A unique identifier for Logsink |
| `sink_name` | `str` | Yes | The name of the Logsink |
| `sink_type` | `str` | Yes |  |

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Logsink().load({"id": "logsink_id", "database_id": "database_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `LogsinkEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## McpServerEntity

```python
mcp_server = client.McpServer()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `api_key` | `str` | No | For `credentialRefSource` secret: the key or token itself. |
| `createdAt` | `str` | No | When the server was registered, in RFC 3339 format. |
| `credentialRef` | `str` | No | The secret reference supplied at registration when source=secret, or the team's OAuth credential ID when source=connection. |
| `credentialRefSource` | `str` | No | How requests to the server authenticate: none, secret (a key or token sent in the Authorization header), or connection (each user's own OAuth authorization). |
| `description` | `str` | No | Team-authored description, shown on the server's catalog card. |
| `endpoint` | `str` | No | HTTPS URL of the server's MCP endpoint. |
| `id` | `str` | No |  |
| `lastSyncedAt` | `str` | No | When discovery last succeeded, in RFC 3339 format; empty until the first success. |
| `oauth_authorization_ttl_seconds` | `str` | No | How long a user's authorization is reused before re-consent. |
| `oauth_authorize_url` | `str` | No | OAuth authorization endpoint. |
| `oauth_client_id` | `str` | No | Required for `credentialRefSource` connection: the client ID of your team's OAuth client for the server. |
| `oauth_client_secret` | `str` | No | Required for `credentialRefSource` connection. |
| `oauth_scopes` | `list` | No | OAuth scopes requested from each user. |
| `oauth_token_url` | `str` | No | Required for `credentialRefSource` connection: the OAuth token endpoint, under the same rules as `oauth_authorize_url`. |
| `protocolVersion` | `str` | No | MCP protocol revision negotiated with the server. |
| `serverRef` | `str` | No | Server identifier, unique within your team. |
| `syncError` | `str` | No | Why the latest discovery failed; empty after a successful one. |
| `syncStatus` | `str` | No | Outcome of the latest discovery: pending (no discovery has finished yet), ok, failed, or `unsupported_protocol`. |
| `toolCount` | `int` | No | Number of tools discovered on the server, whether enabled or not. |
| `transport` | `str` | No | Always `streamable_http`. |
| `updatedAt` | `str` | No | When the server was last modified, in RFC 3339 format. |

### Field Usage by Operation

| Field | load | list | create | update | remove |
| --- | --- | --- | --- | --- | --- |
| `api_key` | - | - | - | - | - |
| `createdAt` | - | - | - | - | - |
| `credentialRef` | - | - | - | - | - |
| `credentialRefSource` | - | - | - | - | - |
| `description` | - | - | - | - | - |
| `endpoint` | - | - | Yes | - | - |
| `id` | - | - | - | - | - |
| `lastSyncedAt` | - | - | - | - | - |
| `oauth_authorization_ttl_seconds` | - | - | - | - | - |
| `oauth_authorize_url` | - | - | - | - | - |
| `oauth_client_id` | - | - | - | - | - |
| `oauth_client_secret` | - | - | - | - | - |
| `oauth_scopes` | - | - | - | - | - |
| `oauth_token_url` | - | - | - | - | - |
| `protocolVersion` | - | - | - | - | - |
| `serverRef` | - | - | Yes | - | - |
| `syncError` | - | - | - | - | - |
| `syncStatus` | - | - | - | - | - |
| `toolCount` | - | - | - | - | - |
| `transport` | - | - | - | - | - |
| `updatedAt` | - | - | - | - | - |

### Operations

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.McpServer().create({
})
```

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.McpServer().list()
for mcp_server in results:
    print(mcp_server)
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.McpServer().load({"id": "mcp_server_id"})
```

#### `remove(reqmatch, ctrl=None) -> dict`

Remove the entity matching the given criteria. Raises on error.

```python
result = client.McpServer().remove({"id": "mcp_server_id"})
```

#### `update(reqdata, ctrl=None) -> dict`

Update an existing entity. The data must include the entity `id`. Returns the updated entity data and raises on error.

```python
result = client.McpServer().update({
    "id": "mcp_server_id",
    # Fields to update
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `McpServerEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## MessageEntity

```python
message = client.Message()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `content` | `list` | Yes | Assistant output blocks (`text` and/or `tool_use`). |
| `id` | `str` | Yes | Unique identifier for this message object. |
| `max_tokens` | `int` | Yes | Maximum tokens to generate before stopping. |
| `messages` | `list` | Yes | Conversation turns. |
| `metadata` | `dict` | No | Optional request metadata. |
| `model` | `str` | Yes | Model that produced the message. |
| `reasoning_effort` | `str` | No | DigitalOcean extension for reasoning-capable models. |
| `role` | `str` | Yes | Always `assistant` for this response. |
| `speed` | `str` | No | DigitalOcean extension for preferred inference speed. |
| `stop_reason` | `str` | Yes | Why generation stopped. |
| `stop_sequence` | `str` | No | When `stop_reason` is `stop_sequence`, the sequence that matched. |
| `stop_sequences` | `list` | No | Custom strings that stop generation when produced. |
| `stream` | `bool` | No | When true, the response is streamed using server-sent events (SSE). |
| `system` | `Any` | No | System prompt as plain text or as an array of text blocks. |
| `temperature` | `float` | No | Sampling temperature between 0.0 and 1.0. |
| `thinking` | `dict` | Yes | Extended thinking configuration. |
| `tool_choice` | `Any` | No | Controls how the model uses tools: automatic selection, require any tool, force a specific tool, or a string form accepted by the service. |
| `tools` | `list` | No | Tool definitions the model may invoke. |
| `top_k` | `int` | No | Top-K sampling cutoff. |
| `top_p` | `float` | No | Nucleus sampling; use either `temperature` or `top_p`, not both. |
| `type` | `str` | Yes | Object type discriminator. |
| `usage` | `dict` | Yes | Token usage for a non-streaming `POST /v1/messages` response. |

### Operations

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.Message().create({
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

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `MessageEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## MetricEntity

```python
metric = client.Metric()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `result` | `list` | Yes | Result of query. |
| `resultType` | `str` | Yes |  |

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Metric().load({"end": "end", "start": "start"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `MetricEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ModelEntity

```python
model = client.Model()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `created` | `int` | Yes | The Unix timestamp (in seconds) when the model was created. |
| `id` | `str` | Yes | The model identifier, which can be referenced in the API endpoints. |
| `object` | `str` | Yes | The object type, which is always "model". |
| `owned_by` | `str` | Yes | The organization that owns the model. |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.Model().list()
for model in results:
    print(model)
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ModelEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## MonitoringAlertEntity

```python
monitoring_alert = client.MonitoringAlert()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `alerts` | `dict` | Yes |  |
| `compare` | `str` | Yes |  |
| `description` | `str` | Yes |  |
| `enabled` | `bool` | Yes |  |
| `entities` | `list` | Yes |  |
| `tags` | `list` | Yes |  |
| `type` | `str` | Yes |  |
| `uuid` | `str` | Yes |  |
| `value` | `float` | Yes |  |
| `window` | `str` | Yes |  |

### Operations

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.MonitoringAlert().create({
    "alerts": {},  # dict
    "compare": "example_compare",  # str
    "description": "example_description",  # str
    "enabled": True,  # bool
    "entities": [],  # list
    "tags": [],  # list
    "type": "example_type",  # str
    "uuid": "example_uuid",  # str
    "value": 1,  # float
    "window": "example_window",  # str
})
```

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.MonitoringAlert().list()
for monitoring_alert in results:
    print(monitoring_alert)
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.MonitoringAlert().load({"alert_uuid": "alert_uuid"})
```

#### `remove(reqmatch, ctrl=None) -> dict`

Remove the entity matching the given criteria. Raises on error.

```python
result = client.MonitoringAlert().remove({"alert_uuid": "alert_uuid"})
```

#### `update(reqdata, ctrl=None) -> dict`

Update an existing entity. The data must include the entity `id`. Returns the updated entity data and raises on error.

```python
result = client.MonitoringAlert().update({
    "alert_uuid": "alert_uuid",
    # Fields to update
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `MonitoringAlertEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## MonitoringSinkEntity

```python
monitoring_sink = client.MonitoringSink()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `destination` | `dict` | Yes |  |
| `destination_uuid` | `str` | No | A unique identifier for an already-existing destination. |
| `resources` | `list` | No | List of resources identified by their URNs. |

### Operations

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.MonitoringSink().create({
    "destination": {},  # dict
})
```

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.MonitoringSink().list()
for monitoring_sink in results:
    print(monitoring_sink)
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.MonitoringSink().load({"sink_uuid": "sink_uuid"})
```

#### `remove(reqmatch, ctrl=None) -> dict`

Remove the entity matching the given criteria. Raises on error.

```python
result = client.MonitoringSink().remove({"sink_uuid": "sink_uuid"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `MonitoringSinkEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## MonitoringSinkDestinationEntity

```python
monitoring_sink_destination = client.MonitoringSinkDestination()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `config` | `dict` | No | OpenSearch destination configuration with `credentials` omitted. |
| `id` | `str` | No | A unique identifier for a destination. |
| `name` | `str` | No | destination name |
| `type` | `str` | No | The destination type. |

### Field Usage by Operation

| Field | load | list | create | update | remove |
| --- | --- | --- | --- | --- | --- |
| `config` | - | - | Yes | Yes | - |
| `id` | - | - | - | - | - |
| `name` | - | - | - | - | - |
| `type` | - | - | Yes | Yes | - |

### Operations

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.MonitoringSinkDestination().create({
})
```

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.MonitoringSinkDestination().list()
for monitoring_sink_destination in results:
    print(monitoring_sink_destination)
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.MonitoringSinkDestination().load({"id": "monitoring_sink_destination_id"})
```

#### `remove(reqmatch, ctrl=None) -> dict`

Remove the entity matching the given criteria. Raises on error.

```python
result = client.MonitoringSinkDestination().remove({"id": "monitoring_sink_destination_id"})
```

#### `update(reqdata, ctrl=None) -> dict`

Update an existing entity. The data must include the entity `id`. Returns the updated entity data and raises on error.

```python
result = client.MonitoringSinkDestination().update({
    "id": "monitoring_sink_destination_id",
    # Fields to update
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `MonitoringSinkDestinationEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## N1ClickEntity

```python
n1_click = client.N1Click()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `slug` | `str` | Yes | The slug identifier for the 1-Click application. |
| `type` | `str` | Yes | The type of the 1-Click application. |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.N1Click().list()
for n1_click in results:
    print(n1_click)
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `N1ClickEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## N1ClickApplicationEntity

```python
n1_click_application = client.N1ClickApplication()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `addon_slugs` | `list` | Yes | An array of 1-Click Application slugs to be installed to the Kubernetes cluster. |
| `cluster_uuid` | `str` | Yes | A unique ID for the Kubernetes cluster to which the 1-Click Applications will be installed. |
| `message` | `str` | No | A message about the result of the request. |

### Operations

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.N1ClickApplication().create({
    "addon_slugs": [],  # list
    "cluster_uuid": "example_cluster_uuid",  # str
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `N1ClickApplicationEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## NeighborIdEntity

```python
neighbor_id = client.NeighborId()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `neighbor_ids` | `list` | No | An array of arrays. |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.NeighborId().list()
for neighbor_id in results:
    print(neighbor_id)
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `NeighborIdEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## NfsEntity

```python
nfs = client.Nfs()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `access_points` | `list` | No | Access points configured on this share. |
| `created_at` | `str` | Yes | Timestamp for when the NFS share was created. |
| `host` | `str` | No | The host IP of the NFS server that will be accessible from the associated VPC |
| `id` | `str` | Yes | The unique identifier of the NFS share. |
| `mount_path` | `str` | No | Path at which the share will be available, to be mounted at a target of the user's choice within the client |
| `name` | `str` | Yes | The human-readable name of the share. |
| `performance_tier` | `str` | No | The performance tier of the share. |
| `region` | `str` | Yes | The DigitalOcean region slug (e.g., nyc2, atl1) where the NFS share resides. |
| `size_gib` | `int` | Yes | The desired/provisioned size of the share in GiB (Gibibytes). |
| `status` | `str` | Yes | The current status of the share. |
| `vpc_ids` | `list` | No | List of VPC IDs that should be able to access the share. |

### Field Usage by Operation

| Field | load | list | create | remove |
| --- | --- | --- | --- | --- |
| `access_points` | - | - | - | - |
| `created_at` | - | - | - | - |
| `host` | - | - | - | - |
| `id` | - | - | - | - |
| `mount_path` | - | - | - | - |
| `name` | - | - | - | - |
| `performance_tier` | - | - | - | - |
| `region` | - | - | - | - |
| `size_gib` | - | - | - | - |
| `status` | - | - | - | - |
| `vpc_ids` | - | - | Yes | - |

### Operations

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.Nfs().create({
    "created_at": "example_created_at",  # str
    "id": "example_id",  # str
    "name": "example_name",  # str
    "region": "example_region",  # str
    "size_gib": 1,  # int
    "status": "example_status",  # str
})
```

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.Nfs().list()
for nfs in results:
    print(nfs)
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Nfs().load({"id": "nfs_id"})
```

#### `remove(reqmatch, ctrl=None) -> dict`

Remove the entity matching the given criteria. Raises on error.

```python
result = client.Nfs().remove({"id": "nfs_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `NfsEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## NfsAction2Entity

```python
nfs_action_2 = client.NfsAction2()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `str` | No |  |

### Operations

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.NfsAction2().create({
    "id": "example_id",  # str
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `NfsAction2Entity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## NfsSnapshotEntity

```python
nfs_snapshot = client.NfsSnapshot()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `created_at` | `str` | Yes | The timestamp when the snapshot was created. |
| `id` | `str` | Yes | The unique identifier of the snapshot. |
| `name` | `str` | Yes | The human-readable name of the snapshot. |
| `region` | `str` | Yes | The DigitalOcean region slug where the snapshot is located. |
| `share_id` | `str` | Yes | The unique identifier of the share from which this snapshot was created. |
| `size_gib` | `int` | Yes | The size of the snapshot in GiB. |
| `status` | `str` | Yes | The current status of the snapshot. |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.NfsSnapshot().list()
for nfs_snapshot in results:
    print(nfs_snapshot)
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.NfsSnapshot().load({"id": "nfs_snapshot_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `NfsSnapshotEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## OnlineMigrationEntity

```python
online_migration = client.OnlineMigration()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `created_at` | `str` | No | The time the migration was initiated, in ISO 8601 format. |
| `disable_ssl` | `bool` | No | Enables SSL encryption when connecting to the source database. |
| `id` | `str` | No | The ID of the most recent migration. |
| `ignore_dbs` | `list` | No | List of databases that should be ignored during migration. |
| `source` | `dict` | Yes |  |
| `status` | `str` | No | The current status of the migration. |

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.OnlineMigration().load({"database_id": "database_id"})
```

#### `update(reqdata, ctrl=None) -> dict`

Update an existing entity. The data must include the entity `id`. Returns the updated entity data and raises on error.

```python
result = client.OnlineMigration().update({
    "database_id": "database_id",
    # Fields to update
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `OnlineMigrationEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## OptionEntity

```python
option = client.Option()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `options` | `dict` | No |  |
| `version_availability` | `dict` | No |  |

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Option().load()
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `OptionEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## OrganizationEntity

```python
organization = client.Organization()
```

### Operations

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.Organization().create({
})
```

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.Organization().list()
for organization in results:
    print(organization)
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `OrganizationEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## OutputViewEntity

```python
output_view = client.OutputView()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `audit` | `dict` | No | Null on a preview, which stores nothing. |
| `description` | `str` | No | View description. |
| `fields` | `list` | No | The dotted output paths a projection keeps; arrays are traversed element-wise. |
| `id` | `str` | No |  |
| `kind` | `str` | No | `OUTPUT_VIEW_KIND_PROJECTION` or `OUTPUT_VIEW_KIND_TRANSFORM`. |
| `name` | `str` | No | View name, unique per tool version among its owner's views. |
| `output_schema` | `dict` | No | The JSON Schema every result of this view satisfies. |
| `team_id` | `str` | No | Your team's ID on your team's views, and empty for a view DigitalOcean publishes to every team. |
| `tool` | `str` | No | The provider-qualified tool slug, for example `exa_search`. |
| `tool_id` | `str` | No | The opaque identity of the exact tool version the view is bound to; tool and version are its readable coordinates. |
| `version` | `str` | No | The tool version, for example `v3`. |
| `view_id` | `str` | No | Output view ID, for example `ov_` followed by 32 hex digits. |

### Field Usage by Operation

| Field | load | list | create | remove |
| --- | --- | --- | --- | --- |
| `audit` | - | - | - | - |
| `description` | - | - | - | - |
| `fields` | - | - | Yes | - |
| `id` | - | - | - | - |
| `kind` | - | - | - | - |
| `name` | - | - | Yes | - |
| `output_schema` | - | - | - | - |
| `team_id` | - | - | - | - |
| `tool` | - | - | - | - |
| `tool_id` | - | - | - | - |
| `version` | - | - | - | - |
| `view_id` | - | - | - | - |

### Operations

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.OutputView().create({
})
```

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.OutputView().list()
for output_view in results:
    print(output_view)
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.OutputView().load({"id": "output_view_id"})
```

#### `remove(reqmatch, ctrl=None) -> dict`

Remove the entity matching the given criteria. Raises on error.

```python
result = client.OutputView().remove({"id": "output_view_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `OutputViewEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## PartnerNetworkConnectEntity

```python
partner_network_connect = client.PartnerNetworkConnect()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `bgp` | `dict` | No | The BGP configuration for the partner attachment. |
| `bgp_auth_key` | `dict` | No |  |
| `children` | `list` | No | An array of associated partner attachment UUIDs. |
| `cidr` | `str` | No | A CIDR block representing a remote route. |
| `connection_bandwidth_in_mbps` | `int` | No | The bandwidth (in Mbps) of the connection. |
| `created_at` | `str` | No | A time value given in ISO8601 combined date and time format. |
| `id` | `str` | No | A unique ID that can be used to identify and reference the partner attachment. |
| `naas_provider` | `str` | No | The Network as a Service (NaaS) provider for the partner attachment. |
| `name` | `str` | No | The name of the partner attachment. |
| `parent_uuid` | `str` | No | Associated partner attachment UUID |
| `region` | `str` | No | The region where the partner attachment is located. |
| `state` | `str` | No | The current operational state of the attachment. |
| `vpc_ids` | `list` | No | An array of VPC network IDs. |

### Operations

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.PartnerNetworkConnect().list({"pa_id": "example"})
for partner_network_connect in results:
    print(partner_network_connect)
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.PartnerNetworkConnect().load({"pa_id": "pa_id"})
```

#### `remove(reqmatch, ctrl=None) -> dict`

Remove the entity matching the given criteria. Raises on error.

```python
result = client.PartnerNetworkConnect().remove({"pa_id": "pa_id"})
```

#### `update(reqdata, ctrl=None) -> dict`

Update an existing entity. The data must include the entity `id`. Returns the updated entity data and raises on error.

```python
result = client.PartnerNetworkConnect().update({
    "pa_id": "pa_id",
    # Fields to update
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `PartnerNetworkConnectEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## PrepaymentConfigEntity

```python
prepayment_config = client.PrepaymentConfig()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `config` | `dict` | No |  |
| `status` | `dict` | No |  |

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.PrepaymentConfig().load()
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `PrepaymentConfigEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## PrepaymentStatusEntity

```python
prepayment_status = client.PrepaymentStatus()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `balance` | `str` | No | Current prepayment balance. |
| `blocked` | `bool` | No | Whether the prepayment gate is currently blocking usage. |
| `eligible` | `bool` | No | Whether the account is eligible for the prepayment gate experience. |
| `is_auto_prepay_enabled` | `bool` | No | Whether automatic prepayment top-up is enabled. |
| `month_to_date_balance` | `str` | No | Current account balance including month-to-date usage. |

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.PrepaymentStatus().load()
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `PrepaymentStatusEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ProjectEntity

```python
project = client.Project()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `created_at` | `str` | No | A time value given in ISO8601 combined date and time format that represents when the project was created. |
| `description` | `str` | No | The description of the project. |
| `environment` | `str` | No | The environment of the project's resources. |
| `id` | `str` | No | The unique universal identifier of this project. |
| `is_default` | `bool` | No | If true, all resources will be added to this project if no project is specified. |
| `name` | `str` | No | The human-readable name for the project. |
| `owner_id` | `int` | No | The integer id of the project owner. |
| `owner_uuid` | `str` | No | The unique universal identifier of the project owner. |
| `purpose` | `str` | No | The purpose of the project. |
| `updated_at` | `str` | No | A time value given in ISO8601 combined date and time format that represents when the project was updated. |

### Field Usage by Operation

| Field | load | list | create | update | patch | remove |
| --- | --- | --- | --- | --- | --- | --- |
| `created_at` | - | - | - | - | - | - |
| `description` | - | - | - | Yes | - | - |
| `environment` | - | - | - | Yes | - | - |
| `id` | - | - | - | - | - | - |
| `is_default` | - | - | - | Yes | - | - |
| `name` | - | - | Yes | Yes | - | - |
| `owner_id` | - | - | - | - | - | - |
| `owner_uuid` | - | - | - | - | - | - |
| `purpose` | - | - | Yes | Yes | - | - |
| `updated_at` | - | - | - | - | - | - |

### Operations

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.Project().create({
})
```

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.Project().list()
for project in results:
    print(project)
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Project().load({"id": "project_id"})
```

#### `patch(reqdata, ctrl=None) -> dict`

Change part of an existing entity: only the fields given are sent. The data must include the entity `id`. Returns the patched entity data and raises on error.

```python
result = client.Project().patch({
    "id": "project_id",
    # Only the fields to change
})
```

#### `remove(reqmatch, ctrl=None) -> dict`

Remove the entity matching the given criteria. Raises on error.

```python
result = client.Project().remove({"id": "project_id"})
```

#### `update(reqdata, ctrl=None) -> dict`

Update an existing entity. The data must include the entity `id`. Returns the updated entity data and raises on error.

```python
result = client.Project().update({
    "id": "project_id",
    # Fields to update
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ProjectEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ProjectResourceEntity

```python
project_resource = client.ProjectResource()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `assigned_at` | `str` | No | A time value given in ISO8601 combined date and time format that represents when the project was created. |
| `id` | `str` | No |  |
| `links` | `dict` | No | The links object contains the `self` object, which contains the resource relationship. |
| `resources` | `list` | No | All resources, including the ones added in the request, that are assigned to the project. |
| `status` | `str` | No | The status of assigning and fetching the resources. |
| `urn` | `str` | No | The uniform resource name (URN) for the resource in the format do:resource_type:resource_id. |

### Operations

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.ProjectResource().create({
    "id": "example_id",  # str
})
```

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.ProjectResource().list({"id": "example"})
for project_resource in results:
    print(project_resource)
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ProjectResourceEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## PromQueryEntity

```python
prom_query = client.PromQuery()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `result` | `Any` | Yes | Result payload shape depends on `resultType`. |
| `resultType` | `str` | Yes |  |

### Operations

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.PromQuery().create({
    "query_id": "example_query_id",  # str
    "result": "example_result",  # Any
    "resultType": "example_resultType",  # str
})
```

Declares a `application/x-www-form-urlencoded` body, which this SDK does not encode yet: it sends the data as JSON.

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.PromQuery().load({"query_id": "query_id", "query": "query"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `PromQueryEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## PromQueryRangeEntity

```python
prom_query_range = client.PromQueryRange()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `result` | `list` | Yes | One entry per matching series, each carrying the samples evaluated at every step across the requested range. |
| `resultType` | `str` | Yes |  |

### Operations

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.PromQueryRange().create({
    "query_id": "example_query_id",  # str
    "result": [],  # list
    "resultType": "example_resultType",  # str
})
```

Declares a `application/x-www-form-urlencoded` body, which this SDK does not encode yet: it sends the data as JSON.

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.PromQueryRange().load({"query_id": "query_id", "end": "end", "query": "query", "start": "start", "step": "step"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `PromQueryRangeEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## PromSeriesEntity

```python
prom_series = client.PromSeries()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `data` | `list` | Yes |  |
| `status` | `str` | Yes |  |

### Operations

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.PromSeries().create({
    "query_id": "example_query_id",  # str
    "data": [],  # list
    "status": "example_status",  # str
})
```

Declares a `application/x-www-form-urlencoded` body, which this SDK does not encode yet: it sends the data as JSON.

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.PromSeries().list({"query_id": "example", "match": []})
for prom_series in results:
    print(prom_series)
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `PromSeriesEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## PromStringListEntity

```python
prom_string_list = client.PromStringList()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `data` | `list` | Yes |  |
| `status` | `str` | Yes |  |

### Operations

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.PromStringList().create({
    "query_id": "example_query_id",  # str
    "data": [],  # list
    "status": "example_status",  # str
})
```

Declares a `application/x-www-form-urlencoded` body, which this SDK does not encode yet: it sends the data as JSON.

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.PromStringList().list({"query_id": "example"})
for prom_string_list in results:
    print(prom_string_list)
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `PromStringListEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## RegionEntity

```python
region = client.Region()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `available` | `bool` | Yes | This is a boolean value that represents whether new Droplets can be created in this region. |
| `features` | `list` | Yes | This attribute is set to an array which contains features available in this region |
| `name` | `str` | Yes | The display name of the region. |
| `sizes` | `list` | Yes | This attribute is set to an array which contains the identifying slugs for the sizes available in this region. |
| `slug` | `str` | Yes | A human-readable string that is used as a unique identifier for each region. |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.Region().list()
for region in results:
    print(region)
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `RegionEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ReservedIPv6Entity

```python
reserved_i_pv6 = client.ReservedIPv6()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `droplet` | `Any` | No | Requires `droplet:read` scope. |
| `ip` | `str` | No | The public IP address of the reserved IPv6. |
| `region_slug` | `str` | No | The region that the reserved IPv6 is reserved to. |
| `reserved_at` | `str` | No | The date and time when the reserved IPv6 was reserved. |

### Field Usage by Operation

| Field | load | list | create | remove |
| --- | --- | --- | --- | --- |
| `droplet` | - | - | - | - |
| `ip` | - | - | - | - |
| `region_slug` | - | - | Yes | - |
| `reserved_at` | - | - | - | - |

### Operations

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.ReservedIPv6().create({
})
```

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.ReservedIPv6().list()
for reserved_i_pv6 in results:
    print(reserved_i_pv6)
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.ReservedIPv6().load({"reserved_ipv6": "reserved_ipv6"})
```

#### `remove(reqmatch, ctrl=None) -> dict`

Remove the entity matching the given criteria. Raises on error.

```python
result = client.ReservedIPv6().remove({"reserved_ipv6": "reserved_ipv6"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ReservedIPv6Entity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ReservedIPv6ActionEntity

```python
reserved_i_pv6_action = client.ReservedIPv6Action()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `action` | `dict` | No |  |

### Operations

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.ReservedIPv6Action().create({
    "reserved_ipv6_id": "example_reserved_ipv6_id",  # str
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ReservedIPv6ActionEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ReservedIpEntity

```python
reserved_ip = client.ReservedIp()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `droplet` | `Any` | No | The Droplet that the reserved IP has been assigned to. |
| `id` | `str` | No |  |
| `ip` | `str` | No | The public IP address of the reserved IP. |
| `links` | `dict` | No |  |
| `locked` | `bool` | No | A boolean value indicating whether or not the reserved IP has pending actions preventing new ones from being submitted. |
| `project_id` | `str` | No | The UUID of the project to which the reserved IP currently belongs.<br><br>Requires `project:read` scope. |
| `region` | `Any` | No |  |
| `reserved_ip` | `dict` | No |  |

### Operations

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.ReservedIp().create({
})
```

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.ReservedIp().list()
for reserved_ip in results:
    print(reserved_ip)
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.ReservedIp().load({"id": "reserved_ip_id"})
```

#### `remove(reqmatch, ctrl=None) -> dict`

Remove the entity matching the given criteria. Raises on error.

```python
result = client.ReservedIp().remove({"id": "reserved_ip_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ReservedIpEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ReservedIpActionEntity

```python
reserved_ip_action = client.ReservedIpAction()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `action` | `dict` | No |  |
| `completed_at` | `str` | No | A time value given in ISO8601 combined date and time format that represents when the action was completed. |
| `id` | `int` | No | A unique numeric ID that can be used to identify and reference an action. |
| `project_id` | `str` | No | The UUID of the project to which the reserved IP currently belongs. |
| `region` | `dict` | Yes |  |
| `region_slug` | `str` | No | A human-readable string that is used as a unique identifier for each region. |
| `resource_id` | `int` | No | A unique identifier for the resource that the action is associated with. |
| `resource_type` | `str` | No | The type of resource that the action is associated with. |
| `started_at` | `str` | No | A time value given in ISO8601 combined date and time format that represents when the action was initiated. |
| `status` | `str` | No | The current status of the action. |
| `type` | `str` | No | This is the type of action that the object represents. |

### Operations

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.ReservedIpAction().create({
    "reserved_ip_id": "example_reserved_ip_id",  # str
    "region": {},  # dict
})
```

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.ReservedIpAction().list({"reserved_ip_id": "example"})
for reserved_ip_action in results:
    print(reserved_ip_action)
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.ReservedIpAction().load({"id": 1, "reserved_ip_id": "reserved_ip_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ReservedIpActionEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ResyncEntity

```python
resync = client.Resync()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `authorization` | `Any` | No | Set when discovery could not run because `user_id` has no authorized connection to this server yet. |
| `mcpServer` | `Any` | No | The server, including `syncStatus` and `syncError`. |
| `pending` | `bool` | No | True when discovery is still running (HTTP 202). |
| `tools` | `list` | No | Every tool discovered on the server when discovery finished in time; empty when pending is true. |
| `user_id` | `str` | No | Required for a server registered with `credentialRefSource` connection: discovery reaches the server as this user, through their connection, because such a server has no team-wide credential. |

### Operations

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.Resync().create({
    "server_ref": "example_server_ref",  # str
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ResyncEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## SearchEntity

```python
search = client.Search()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `actorId` | `str` | No | Empty when the session is not bound to an actor. |
| `agentName` | `str` | No | Name of the agent that started the session. |
| `agentUrn` | `str` | No | URN of the agent that started the session. |
| `auth_type` | `str` | No | Deprecated: read `auth_types`, since a provider may accept more than one credential kind. |
| `auth_types` | `list` | No | Credential kinds the provider accepts, sorted: none|oauth|`shared_api_key`|unknown|`user_oauth_app`|`user_token`. |
| `config` | `dict` | No | Session options as supplied at creation. |
| `connection_parameters` | `list` | No | Non-sensitive values collected when creating a connection. |
| `createdAt` | `str` | No | When the session was created. |
| `credential_parameters` | `list` | No | Non-secret values collected when registering an API key provider credential. |
| `description` | `str` | No | Description of the latest version. |
| `display_name` | `str` | No | Human-readable label of the latest version. |
| `insights` | `Any` | No | Omitted when no explicit customer Insights choice was stored. |
| `latest_version` | `str` | No | Latest version number, as a string. |
| `name` | `str` | No | The required human-readable session name. |
| `network` | `Any` | No | Omitted when the request omitted network. |
| `oauth_client_setup_url` | `str` | No | HTTPS page at the provider where a team creates that OAuth client, such as its developer console or setup guide. |
| `oauth_redirect_url` | `str` | No | Callback URL a team must register with the provider when it creates its own OAuth client. |
| `owning_user_id` | `str` | No | DigitalOcean user ID of the user who created the session, when recorded. |
| `policy` | `Any` | No | The session's tool-permission policy. |
| `reference_latest` | `str` | No | The toolbelt name, which refers to whichever version is latest. |
| `scopes` | `list` | No | The OAuth scopes a connection may request; a connection that requests none gets all of them. |
| `sessionUrn` | `str` | No | Session URN, for example `do:managed_agent_session:<uuid>`. |
| `status` | `str` | No | active, or deprecated once the toolbelt is deleted. |
| `tool_count` | `int` | No | Number of members in the latest version. |
| `tools` | `dict` | No | Omitted when the request omitted tools (all tools). |
| `updatedAt` | `str` | No | When the session was last modified. |
| `updated_at` | `str` | No | When the latest version was last modified, in RFC 3339 format. |
| `version_count` | `int` | No | Number of versions recorded under this name, including versions from before the toolbelt was deleted and the name reused. |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.Search().list()
for search in results:
    print(search)
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `SearchEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## SecurityPlanEntity

```python
security_plan = client.SecurityPlan()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `tier_coverage` | `dict` | No | Scan coverage for each available plan tier. |

### Operations

#### `update(reqdata, ctrl=None) -> dict`

Update an existing entity. The data must include the entity `id`. Returns the updated entity data and raises on error.

```python
result = client.SecurityPlan().update({
    # Fields to update
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `SecurityPlanEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## SecurityRuleEntity

```python
security_rule = client.SecurityRule()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `resource` | `str` | No | The URN of a resource to exclude from future scans. |

### Operations

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.SecurityRule().create({
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `SecurityRuleEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## SecurityScanEntity

```python
security_scan = client.SecurityScan()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `created_at` | `str` | No | When scan was created. |
| `findings` | `list` | No |  |
| `id` | `str` | No | The unique identifier for the scan. |
| `name` | `str` | No | The name of the affected resource. |
| `status` | `str` | No | The status of the scan. |
| `type` | `str` | No | The type of the affected resource. |
| `urn` | `str` | No | The URN for the affected resource. |

### Operations

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.SecurityScan().create({
})
```

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.SecurityScan().list()
for security_scan in results:
    print(security_scan)
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.SecurityScan().load({"scan_id": "scan_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `SecurityScanEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## SecuritySuppressionEntity

```python
security_suppression = client.SecuritySuppression()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `resources` | `list` | No | The URNs of resources to suppress for the rule. |
| `rule_uuid` | `str` | No | The rule UUID to suppress for the listed resources. |

### Operations

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.SecuritySuppression().create({
})
```

#### `remove(reqmatch, ctrl=None) -> dict`

Remove the entity matching the given criteria. Raises on error.

```python
result = client.SecuritySuppression().remove({"suppression_uuid": "suppression_uuid"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `SecuritySuppressionEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## SettingEntity

```python
setting = client.Setting()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `plan_downgrades` | `dict` | No |  |
| `settings` | `dict` | No |  |
| `tier_coverage` | `dict` | No |  |

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Setting().load()
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `SettingEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## SizeEntity

```python
size = client.Size()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `available` | `bool` | Yes | This is a boolean value that represents whether new Droplets can be created with this size. |
| `description` | `str` | Yes | A string describing the class of Droplets created from this size. |
| `disk` | `int` | Yes | The amount of disk space set aside for Droplets of this size. |
| `disk_info` | `list` | No | An array of objects containing information about the disks available to Droplets created with this size. |
| `gpu_info` | `dict` | No | An object containing information about the GPU capabilities of Droplets created with this size. |
| `memory` | `int` | Yes | The amount of RAM allocated to Droplets created of this size. |
| `price_hourly` | `float` | Yes | This describes the price of the Droplet size as measured hourly. |
| `price_monthly` | `float` | Yes | This attribute describes the monthly cost of this Droplet size if the Droplet is kept for an entire month. |
| `regions` | `list` | Yes | An array containing the region slugs where this size is available for Droplet creates. |
| `slug` | `str` | Yes | A human-readable string that is used to uniquely identify each size. |
| `transfer` | `float` | Yes | The amount of transfer bandwidth that is available for Droplets created in this size. |
| `vcpus` | `int` | Yes | The number of CPUs allocated to Droplets of this size. |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.Size().list()
for size in results:
    print(size)
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `SizeEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## SnapshotEntity

```python
snapshot = client.Snapshot()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `created_at` | `str` | Yes | A time value given in ISO8601 combined date and time format that represents when the snapshot was created. |
| `id` | `str` | Yes | The unique identifier for the snapshot. |
| `min_disk_size` | `int` | Yes | The minimum size in GB required for a volume or Droplet to use this snapshot. |
| `name` | `str` | Yes | A human-readable name for the snapshot. |
| `regions` | `list` | Yes | An array of the regions that the snapshot is available in. |
| `resource_id` | `str` | Yes | The unique identifier for the resource that the snapshot originated from. |
| `resource_type` | `str` | Yes | The type of resource that the snapshot originated from. |
| `size_gigabytes` | `float` | Yes | The billable size of the snapshot in gigabytes. |
| `tags` | `list` | Yes | An array of Tags the snapshot has been tagged with.<br><br>Requires `tag:read` scope. |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.Snapshot().list()
for snapshot in results:
    print(snapshot)
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Snapshot().load({"id": "snapshot_id"})
```

#### `remove(reqmatch, ctrl=None) -> dict`

Remove the entity matching the given criteria. Raises on error.

```python
result = client.Snapshot().remove({"id": "snapshot_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `SnapshotEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## SpacesKeyEntity

```python
spaces_key = client.SpacesKey()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `access_key` | `str` | No | The Access Key ID used to access a bucket. |
| `created_at` | `str` | No | The date and time the key was created. |
| `grants` | `list` | No | The list of permissions for the access key. |
| `id` | `str` | No |  |
| `keys` | `list` | No |  |
| `name` | `str` | No | The access key's name. |

### Operations

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.SpacesKey().create({
})
```

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.SpacesKey().list()
for spaces_key in results:
    print(spaces_key)
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.SpacesKey().load({"id": "spaces_key_id"})
```

#### `patch(reqdata, ctrl=None) -> dict`

Change part of an existing entity: only the fields given are sent. The data must include the entity `id`. Returns the patched entity data and raises on error.

```python
result = client.SpacesKey().patch({
    "id": "spaces_key_id",
    # Only the fields to change
})
```

#### `remove(reqmatch, ctrl=None) -> dict`

Remove the entity matching the given criteria. Raises on error.

```python
result = client.SpacesKey().remove({"id": "spaces_key_id"})
```

#### `update(reqdata, ctrl=None) -> dict`

Update an existing entity. The data must include the entity `id`. Returns the updated entity data and raises on error.

```python
result = client.SpacesKey().update({
    "id": "spaces_key_id",
    # Fields to update
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `SpacesKeyEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## SqlModeEntity

```python
sql_mode = client.SqlMode()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `sql_mode` | `str` | Yes | A string specifying the configured SQL modes for the MySQL cluster. |

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.SqlMode().load({"database_id": "database_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `SqlModeEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## SshKeyEntity

```python
ssh_key = client.SshKey()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `fingerprint` | `str` | No | A unique identifier that differentiates this key from other keys using a format that SSH recognizes. |
| `id` | `int` | No | A unique identification number for this key. |
| `name` | `str` | Yes | A human-readable display name for this key, used to easily identify the SSH keys when they are displayed. |
| `public_key` | `str` | Yes | The entire public key string that was uploaded. |

### Field Usage by Operation

| Field | load | list | create | update | remove |
| --- | --- | --- | --- | --- | --- |
| `fingerprint` | - | - | - | - | - |
| `id` | - | - | - | - | - |
| `name` | - | - | - | Yes | - |
| `public_key` | - | - | - | - | - |

### Operations

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.SshKey().create({
    "name": "example_name",  # str
    "public_key": "example_public_key",  # str
})
```

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.SshKey().list()
for ssh_key in results:
    print(ssh_key)
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.SshKey().load({"id": "ssh_key_id"})
```

#### `remove(reqmatch, ctrl=None) -> dict`

Remove the entity matching the given criteria. Raises on error.

```python
result = client.SshKey().remove({"id": "ssh_key_id"})
```

#### `update(reqdata, ctrl=None) -> dict`

Update an existing entity. The data must include the entity `id`. Returns the updated entity data and raises on error.

```python
result = client.SshKey().update({
    "id": "ssh_key_id",
    # Fields to update
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `SshKeyEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## SystemoneEntity

```python
systemone = client.Systemone()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `answers` | `dict` | Yes | A map of question name to answer, using the same keys as the request's `questions` object. |
| `model` | `str` | Yes | Model ID that produced the response. |
| `questions` | `dict` | Yes | A map of question name to question definition. |
| `state` | `str` | Yes | The state to evaluate. |
| `usage` | `dict` | Yes | Token usage for the request. |

### Operations

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.Systemone().create({
    "answers": {},  # dict
    "model": "example_model",  # str
    "questions": {},  # dict
    "state": "example_state",  # str
    "usage": {},  # dict
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `SystemoneEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## TagEntity

```python
tag = client.Tag()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `str` | No |  |
| `name` | `str` | No | The name of the tag. |
| `resources` | `dict` | No | An embedded object containing key value pairs of resource type and resource statistics. |

### Operations

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.Tag().create({
})
```

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.Tag().list()
for tag in results:
    print(tag)
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Tag().load({"id": "tag_id"})
```

#### `remove(reqmatch, ctrl=None) -> dict`

Remove the entity matching the given criteria. Raises on error.

```python
result = client.Tag().remove({"id": "tag_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `TagEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ToolEntity

```python
tool = client.Tool()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `category` | `str` | No | Best-effort catalog metadata and is empty for a large share of the catalog. |
| `description` | `str` | No | What the tool does. |
| `history` | `dict` | No | Present only when the request set `include_history`. |
| `id` | `str` | No |  |
| `name` | `str` | No | The unqualified tool name, without the provider prefix. |
| `provider` | `str` | No | The ID of the provider that offers the tool, broken out so a client never has to split `tool_slug`. |
| `snapshot` | `Any` | No | When the metrics were computed and the window they cover. |
| `title` | `str` | No | Human-readable tool title. |
| `tool` | `Any` | No | The tool's metrics over the window. |
| `tool_slug` | `str` | No | The provider-qualified, stable tool identifier (`<provider>_<name>`). |
| `version` | `int` | No | The version this toolbelt version pins for the member, matching the `@<version>` suffix in the corresponding toolbelt.tools entry. |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.Tool().list({"name": "example", "provider_id": "example"})
for tool in results:
    print(tool)
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Tool().load({"id": "tool_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ToolEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ToolbeltEntity

```python
toolbelt = client.Toolbelt()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `created_at` | `str` | No | When this version was created, in RFC 3339 format. |
| `description` | `str` | No | Team-authored description. |
| `display_name` | `str` | No | Human-readable label. |
| `id` | `str` | No |  |
| `latest_version` | `str` | No | Latest version number, as a string. |
| `name` | `str` | No | Toolbelt name, unique among your team's active toolbelts. |
| `next_page_token` | `str` | No | Token for the next page of `tool_details`; empty on the last page. |
| `reference` | `str` | No | `<name>@<version>`, identifying this exact version. |
| `reference_latest` | `str` | No | The toolbelt name, which refers to whichever version is latest. |
| `status` | `str` | No | active, or deprecated once the toolbelt is deleted. |
| `tool_count` | `int` | No | Number of entries in tools. |
| `tool_details` | `list` | No | The requested page of resolved catalog metadata for the members named in toolbelt.tools. |
| `toolbelt` | `Any` | No | The requested toolbelt version. |
| `tools` | `list` | No | Members, sorted, each as `<tool_slug>@<version>`: the tool and the version this toolbelt version pins. |
| `updated_at` | `str` | No | When this version was last modified, in RFC 3339 format. |
| `version` | `str` | No | Version number of this toolbelt version, as a string, for example `3`. |
| `version_count` | `int` | No | Number of versions recorded under this name, including versions from before the toolbelt was deleted and the name reused. |

### Field Usage by Operation

| Field | load | list | create | remove |
| --- | --- | --- | --- | --- |
| `created_at` | - | - | - | - |
| `description` | - | - | - | - |
| `display_name` | - | - | - | - |
| `id` | - | - | - | - |
| `latest_version` | - | - | - | - |
| `name` | - | - | Yes | - |
| `next_page_token` | - | - | - | - |
| `reference` | - | - | - | - |
| `reference_latest` | - | - | - | - |
| `status` | - | - | - | - |
| `tool_count` | - | - | - | - |
| `tool_details` | - | - | - | - |
| `toolbelt` | - | - | - | - |
| `tools` | - | - | - | - |
| `updated_at` | - | - | - | - |
| `version` | - | - | - | - |
| `version_count` | - | - | - | - |

### Operations

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.Toolbelt().create({
})
```

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.Toolbelt().list()
for toolbelt in results:
    print(toolbelt)
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Toolbelt().load({"id": "toolbelt_id"})
```

#### `remove(reqmatch, ctrl=None) -> dict`

Remove the entity matching the given criteria. Raises on error.

```python
result = client.Toolbelt().remove({"id": "toolbelt_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ToolbeltEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## UptimeEntity

```python
uptime = client.Uptime()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `comparison` | `str` | No | The comparison operator used against the alert's threshold. |
| `enabled` | `bool` | No | A boolean value indicating whether the check is enabled/disabled. |
| `id` | `str` | No | A unique ID that can be used to identify and reference the alert. |
| `name` | `str` | No | A human-friendly display name. |
| `notifications` | `dict` | Yes | The notification settings for a trigger alert. |
| `period` | `str` | No | Period of time the threshold must be exceeded to trigger the alert. |
| `previous_outage` | `dict` | No |  |
| `regions` | `list` | No | An array containing the selected regions to perform healthchecks from. |
| `target` | `str` | No | The endpoint to perform healthchecks on. |
| `threshold` | `int` | No | The threshold at which the alert will enter a trigger state. |
| `type` | `str` | No | The type of alert. |

### Field Usage by Operation

| Field | load | list | create | update | remove |
| --- | --- | --- | --- | --- | --- |
| `comparison` | - | - | - | - | - |
| `enabled` | - | - | - | - | - |
| `id` | - | - | - | - | - |
| `name` | - | - | Yes | Yes | - |
| `notifications` | - | - | - | - | - |
| `period` | - | - | Yes | Yes | - |
| `previous_outage` | - | - | - | - | - |
| `regions` | - | - | - | - | - |
| `target` | - | - | - | - | - |
| `threshold` | - | - | - | - | - |
| `type` | - | - | Yes | Yes | - |

### Operations

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.Uptime().create({
    "check_id": "example_check_id",  # str
    "notifications": {},  # dict
})
```

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.Uptime().list({"check_id": "example"})
for uptime in results:
    print(uptime)
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Uptime().load({"check_id": "check_id"})
```

#### `remove(reqmatch, ctrl=None) -> dict`

Remove the entity matching the given criteria. Raises on error.

```python
result = client.Uptime().remove({"check_id": "check_id"})
```

#### `update(reqdata, ctrl=None) -> dict`

Update an existing entity. The data must include the entity `id`. Returns the updated entity data and raises on error.

```python
result = client.Uptime().update({
    "check_id": "check_id",
    # Fields to update
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `UptimeEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## UserEntity

```python
user = client.User()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `connections` | `list` | No | The user's connections that are not revoked, sorted by provider. |
| `groups` | `list` | No | A list of in-cluster groups that the user belongs to. |
| `id` | `str` | No |  |
| `pagination` | `Any` | No | Paging applied to this response and the total number of users. |
| `sessions` | `list` | No | Sessions bound to the user, oldest first. |
| `user_id` | `str` | No | The user ID: a session `actor_id` or a connection `user_id`. |
| `user_ids` | `list` | No | User IDs on this page. |
| `username` | `str` | No | The username for the cluster admin user. |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.User().list()
for user in results:
    print(user)
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.User().load({"id": "user_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `UserEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## VectorDatabaseEntity

```python
vector_database = client.VectorDatabase()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `str` | No |  |

### Operations

#### `remove(reqmatch, ctrl=None) -> dict`

Remove the entity matching the given criteria. Raises on error.

```python
result = client.VectorDatabase().remove({"id": "id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `VectorDatabaseEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## VectordbBackupEntity

```python
vectordb_backup = client.VectordbBackup()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `backup_id` | `str` | No | Unique identifier for the backup (e.g., "vectordb-{uuid}-20240101-120000"). |
| `completed_at` | `str` | No | Timestamp when the backup process completed. |
| `started_at` | `str` | No | Timestamp when the backup process started. |
| `status` | `str` | No | Status of the backup: SUCCESS. |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.VectordbBackup().list({"vector_database_id": "example"})
for vectordb_backup in results:
    print(vectordb_backup)
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `VectordbBackupEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## VectordbGetRestoreStatusEntity

```python
vectordb_get_restore_status = client.VectordbGetRestoreStatus()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `backup_id` | `str` | No | The backup ID being restored. |
| `error` | `str` | No | Error message if the restore failed. |
| `status` | `str` | No | Current status: STARTED, TRANSFERRING, TRANSFERRED, FINALIZING, SUCCESS, FAILED, CANCELLING, CANCELED. |

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.VectordbGetRestoreStatus().load({"backup_id": "backup_id", "vector_database_id": "vector_database_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `VectordbGetRestoreStatusEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## VectordbGetVectorDbEntity

```python
vectordb_get_vector_db = client.VectordbGetVectorDb()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `config` | `dict` | No | VectorDBConfig holds optional, advanced cluster settings. |
| `created_at` | `str` | No |  |
| `endpoints` | `dict` | No | VectorDBEndpoints contains the connection endpoints for a vector database instance. |
| `forked_from_id` | `str` | No | ID of the vector database this instance was forked from. |
| `id` | `str` | No |  |
| `last_restore_id` | `str` | No | Backup_id of the most recent restore initiated against this instance. |
| `name` | `str` | No | Required. |
| `owner_uuid` | `str` | No |  |
| `project_id` | `str` | No | Project this database belongs to. |
| `region` | `str` | No | Required. |
| `size` | `str` | No | Resource tier: small, medium, or large. |
| `status` | `str` | No | Lifecycle state: pending, creating, active, errored, or deleting. |
| `tags` | `list` | No | A set of arbitrary tags to organize your vector database |
| `updated_at` | `str` | No |  |

### Operations

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.VectordbGetVectorDb().create({
})
```

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.VectordbGetVectorDb().list()
for vectordb_get_vector_db in results:
    print(vectordb_get_vector_db)
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.VectordbGetVectorDb().load({"id": "vectordb_get_vector_db_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `VectordbGetVectorDbEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## VectordbGetVectorDbAdminCredentialEntity

```python
vectordb_get_vector_db_admin_credential = client.VectordbGetVectorDbAdminCredential()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `api_token` | `str` | No | API token for that user. |
| `user_id` | `str` | No | Database user id from the cluster secret (opaque; matches what was provisioned). |

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.VectordbGetVectorDbAdminCredential().load({"vector_database_id": "vector_database_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `VectordbGetVectorDbAdminCredentialEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## VectordbRestoreBackupEntity

```python
vectordb_restore_backup = client.VectordbRestoreBackup()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `backup_id` | `str` | No | The backup ID being restored. |
| `id` | `str` | No | Required. |
| `status` | `str` | No | Initial status of the restore operation (e.g., "STARTED"). |

### Operations

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.VectordbRestoreBackup().create({
    "backup_id": "example_backup_id",  # str
    "vector_database_id": "example_vector_database_id",  # str
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `VectordbRestoreBackupEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## VectordbUpdateVectorDbEntity

```python
vectordb_update_vector_db = client.VectordbUpdateVectorDb()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `config` | `dict` | No | VectorDBConfig holds optional, advanced cluster settings. |
| `created_at` | `str` | No |  |
| `endpoints` | `dict` | No | VectorDBEndpoints contains the connection endpoints for a vector database instance. |
| `forked_from_id` | `str` | No | ID of the vector database this instance was forked from. |
| `id` | `str` | No | ID of the vector database. |
| `last_restore_id` | `str` | No | Backup_id of the most recent restore initiated against this instance. |
| `name` | `str` | No |  |
| `owner_uuid` | `str` | No |  |
| `project_id` | `str` | No | Project this database belongs to. |
| `region` | `str` | No |  |
| `size` | `str` | No | Resource tier: small, medium, or large. |
| `status` | `str` | No | Lifecycle state: pending, creating, active, errored, or deleting. |
| `tags` | `list` | No |  |
| `updated_at` | `str` | No |  |

### Operations

#### `update(reqdata, ctrl=None) -> dict`

Update an existing entity. The data must include the entity `id`. Returns the updated entity data and raises on error.

```python
result = client.VectordbUpdateVectorDb().update({
    "id": "id",
    # Fields to update
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `VectordbUpdateVectorDbEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## VectordbUpdateVectorDbTagEntity

```python
vectordb_update_vector_db_tag = client.VectordbUpdateVectorDbTag()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `config` | `dict` | No | VectorDBConfig holds optional, advanced cluster settings. |
| `created_at` | `str` | No |  |
| `endpoints` | `dict` | No | VectorDBEndpoints contains the connection endpoints for a vector database instance. |
| `forked_from_id` | `str` | No | ID of the vector database this instance was forked from. |
| `id` | `str` | No | Required. |
| `last_restore_id` | `str` | No | Backup_id of the most recent restore initiated against this instance. |
| `name` | `str` | No |  |
| `owner_uuid` | `str` | No |  |
| `project_id` | `str` | No | Project this database belongs to. |
| `region` | `str` | No |  |
| `size` | `str` | No | Resource tier: small, medium, or large. |
| `status` | `str` | No | Lifecycle state: pending, creating, active, errored, or deleting. |
| `tags` | `list` | No | Tags to set on the vector database. |
| `updated_at` | `str` | No |  |

### Operations

#### `update(reqdata, ctrl=None) -> dict`

Update an existing entity. The data must include the entity `id`. Returns the updated entity data and raises on error.

```python
result = client.VectordbUpdateVectorDbTag().update({
    "vector_database_id": "vector_database_id",
    # Fields to update
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `VectordbUpdateVectorDbTagEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## VpcEntity

```python
vpc = client.Vpc()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `created_at` | `str` | No | A time value given in ISO8601 combined date and time format. |
| `default` | `bool` | No | A boolean value indicating whether or not the VPC is the default network for the region. |
| `description` | `str` | No | A free-form text field for describing the VPC's purpose. |
| `id` | `str` | No | A unique ID that can be used to identify and reference the VPC. |
| `ip_range` | `str` | No | The range of IP addresses in the VPC in CIDR notation. |
| `name` | `str` | No | The name of the VPC. |
| `region` | `str` | No | The slug identifier for the region where the VPC will be created. |
| `status` | `str` | No | The current status of the VPC peering. |
| `urn` | `str` | No | The uniform resource name (URN) for the resource in the format do:resource_type:resource_id. |
| `vpc_ids` | `list` | No | An array of the two peered VPCs IDs. |

### Field Usage by Operation

| Field | load | list | create | update | patch | remove |
| --- | --- | --- | --- | --- | --- | --- |
| `created_at` | - | - | - | - | - | - |
| `default` | - | - | - | - | - | - |
| `description` | - | - | - | - | - | - |
| `id` | - | - | - | - | - | - |
| `ip_range` | - | - | - | - | - | - |
| `name` | - | - | Yes | Yes | Yes | - |
| `region` | - | - | Yes | - | - | - |
| `status` | - | - | - | - | - | - |
| `urn` | - | - | - | - | - | - |
| `vpc_ids` | - | - | - | - | - | - |

### Operations

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.Vpc().create({
})
```

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.Vpc().list()
for vpc in results:
    print(vpc)
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Vpc().load({"id": "vpc_id"})
```

#### `patch(reqdata, ctrl=None) -> dict`

Change part of an existing entity: only the fields given are sent. The data must include the entity `id`. Returns the patched entity data and raises on error.

```python
result = client.Vpc().patch({
    "id": "vpc_id",
    # Only the fields to change
})
```

#### `remove(reqmatch, ctrl=None) -> dict`

Remove the entity matching the given criteria. Raises on error.

```python
result = client.Vpc().remove({"id": "vpc_id"})
```

#### `update(reqdata, ctrl=None) -> dict`

Update an existing entity. The data must include the entity `id`. Returns the updated entity data and raises on error.

```python
result = client.Vpc().update({
    "id": "vpc_id",
    # Fields to update
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `VpcEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## VpcNatGatewayEntity

```python
vpc_nat_gateway = client.VpcNatGateway()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `created_at` | `str` | No | A time value given in ISO8601 combined date and time format that represents when the VPC NAT gateway was created. |
| `egresses` | `dict` | No | An object containing egress information for the VPC NAT gateway. |
| `icmp_timeout_seconds` | `int` | No | The ICMP timeout in seconds for the VPC NAT gateway. |
| `id` | `str` | No | The unique identifier for the VPC NAT gateway. |
| `name` | `str` | No | The human-readable name of the VPC NAT gateway. |
| `region` | `str` | No | The region in which the VPC NAT gateway is created. |
| `size` | `int` | No | The size of the VPC NAT gateway. |
| `state` | `str` | No | The current state of the VPC NAT gateway. |
| `tcp_timeout_seconds` | `int` | No | The TCP timeout in seconds for the VPC NAT gateway. |
| `type` | `str` | No | The type of the VPC NAT gateway. |
| `udp_timeout_seconds` | `int` | No | The UDP timeout in seconds for the VPC NAT gateway. |
| `updated_at` | `str` | No | A time value given in ISO8601 combined date and time format that represents when the VPC NAT gateway was last updated. |
| `vpcs` | `list` | No | An array of VPCs associated with the VPC NAT gateway. |

### Field Usage by Operation

| Field | load | list | create | update | remove |
| --- | --- | --- | --- | --- | --- |
| `created_at` | - | - | - | - | - |
| `egresses` | - | - | - | - | - |
| `icmp_timeout_seconds` | - | - | - | - | - |
| `id` | - | - | - | - | - |
| `name` | - | - | Yes | Yes | - |
| `region` | - | - | Yes | - | - |
| `size` | - | - | Yes | Yes | - |
| `state` | - | - | - | - | - |
| `tcp_timeout_seconds` | - | - | - | - | - |
| `type` | - | - | Yes | - | - |
| `udp_timeout_seconds` | - | - | - | - | - |
| `updated_at` | - | - | - | - | - |
| `vpcs` | - | - | Yes | - | - |

### Operations

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.VpcNatGateway().create({
})
```

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.VpcNatGateway().list()
for vpc_nat_gateway in results:
    print(vpc_nat_gateway)
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.VpcNatGateway().load({"id": "vpc_nat_gateway_id"})
```

#### `remove(reqmatch, ctrl=None) -> dict`

Remove the entity matching the given criteria. Raises on error.

```python
result = client.VpcNatGateway().remove({"id": "vpc_nat_gateway_id"})
```

#### `update(reqdata, ctrl=None) -> dict`

Update an existing entity. The data must include the entity `id`. Returns the updated entity data and raises on error.

```python
result = client.VpcNatGateway().update({
    "id": "vpc_nat_gateway_id",
    # Fields to update
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `VpcNatGatewayEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## VpcPeeringEntity

```python
vpc_peering = client.VpcPeering()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `created_at` | `str` | No | A time value given in ISO8601 combined date and time format. |
| `id` | `str` | No | A unique ID that can be used to identify and reference the VPC peering. |
| `name` | `str` | No | The name of the VPC peering. |
| `status` | `str` | No | The current status of the VPC peering. |
| `vpc_ids` | `list` | No | An array of the two peered VPCs IDs. |

### Field Usage by Operation

| Field | load | list | create | update | remove |
| --- | --- | --- | --- | --- | --- |
| `created_at` | - | - | - | - | - |
| `id` | - | - | - | - | - |
| `name` | - | - | Yes | Yes | - |
| `status` | - | - | - | - | - |
| `vpc_ids` | - | - | Yes | - | - |

### Operations

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.VpcPeering().create({
})
```

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.VpcPeering().list()
for vpc_peering in results:
    print(vpc_peering)
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.VpcPeering().load({"id": "vpc_peering_id"})
```

#### `remove(reqmatch, ctrl=None) -> dict`

Remove the entity matching the given criteria. Raises on error.

```python
result = client.VpcPeering().remove({"id": "vpc_peering_id"})
```

#### `update(reqdata, ctrl=None) -> dict`

Update an existing entity. The data must include the entity `id`. Returns the updated entity data and raises on error.

```python
result = client.VpcPeering().update({
    "id": "vpc_peering_id",
    # Fields to update
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `VpcPeeringEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## VpcRoutesPublicPreviewEntity

```python
vpc_routes__public_preview = client.VpcRoutesPublicPreview()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `created_at` | `str` | No | The time when the route was created. |
| `destination_cidr` | `str` | Yes | A valid IPv4 CIDR accepted by the VPC routing product. |
| `id` | `str` | Yes | The unique identifier of the route. |
| `modifiable` | `bool` | No | Whether the caller can update or delete the route. |
| `target_urns` | `list` | Yes | The URNs of supported next-hop resources. |
| `type` | `str` | Yes | The route type inferred from how the route is sourced. |

### Operations

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.VpcRoutesPublicPreview().create({
    "subnet_id": "example_subnet_id",  # str
    "vpc_id": "example_vpc_id",  # str
    "destination_cidr": "example_destination_cidr",  # str
    "id": "example_id",  # str
    "target_urns": [],  # list
    "type": "example_type",  # str
})
```

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.VpcRoutesPublicPreview().list({"subnet_id": "example", "vpc_id": "example"})
for vpc_routes__public_preview in results:
    print(vpc_routes__public_preview)
```

#### `remove(reqmatch, ctrl=None) -> dict`

Remove the entity matching the given criteria. Raises on error.

```python
result = client.VpcRoutesPublicPreview().remove({"id": "id", "subnet_id": "subnet_id", "vpc_id": "vpc_id"})
```

#### `update(reqdata, ctrl=None) -> dict`

Update an existing entity. The data must include the entity `id`. Returns the updated entity data and raises on error.

```python
result = client.VpcRoutesPublicPreview().update({
    "id": "id",
    "subnet_id": "subnet_id",
    "vpc_id": "vpc_id",
    # Fields to update
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `VpcRoutesPublicPreviewEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## VpcSubnetsPublicPreviewEntity

```python
vpc_subnets__public_preview = client.VpcSubnetsPublicPreview()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `created_at` | `str` | Yes | The time when the VPC subnet was created. |
| `default` | `bool` | No | Whether this is the default subnet for the VPC. |
| `id` | `str` | Yes | The unique identifier of the VPC subnet. |
| `ip_range` | `str` | Yes | The IPv4 range assigned to the subnet in CIDR notation. |
| `meta` | `dict` | No | Additional information about the VPC subnet. |
| `name` | `str` | Yes | The human-readable name of the VPC subnet. |
| `region` | `str` | Yes | The slug of the region containing the VPC subnet. |
| `type` | `str` | Yes | The type of the VPC subnet. |
| `urn` | `str` | Yes | The uniform resource name of the VPC subnet. |

### Field Usage by Operation

| Field | load | list | create | update | remove |
| --- | --- | --- | --- | --- | --- |
| `created_at` | - | Yes | - | - | - |
| `default` | - | - | - | - | - |
| `id` | - | - | - | - | - |
| `ip_range` | - | - | - | - | - |
| `meta` | - | - | - | - | - |
| `name` | - | Yes | - | - | - |
| `region` | - | - | - | - | - |
| `type` | - | - | - | - | - |
| `urn` | - | Yes | - | - | - |

### Operations

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.VpcSubnetsPublicPreview().create({
    "id": "example_id",  # str
    "created_at": "example_created_at",  # str
    "ip_range": "example_ip_range",  # str
    "name": "example_name",  # str
    "region": "example_region",  # str
    "type": "example_type",  # str
    "urn": "example_urn",  # str
})
```

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.VpcSubnetsPublicPreview().list({"subnet_uuid": "example", "vpc_id": "example"})
for vpc_subnets__public_preview in results:
    print(vpc_subnets__public_preview)
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.VpcSubnetsPublicPreview().load({"subnet_uuid": "subnet_uuid", "vpc_id": "vpc_id"})
```

#### `remove(reqmatch, ctrl=None) -> dict`

Remove the entity matching the given criteria. Raises on error.

```python
result = client.VpcSubnetsPublicPreview().remove({"subnet_uuid": "subnet_uuid", "vpc_id": "vpc_id"})
```

#### `update(reqdata, ctrl=None) -> dict`

Update an existing entity. The data must include the entity `id`. Returns the updated entity data and raises on error.

```python
result = client.VpcSubnetsPublicPreview().update({
    "subnet_uuid": "subnet_uuid",
    "vpc_id": "vpc_id",
    # Fields to update
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `VpcSubnetsPublicPreviewEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | Test transport |


Features are activated via the `feature` option:

```python
client = DigitaloceanSDK({
    "feature": {
        "test": {"active": True},
    },
})
```


### Configuring features

Each feature is inactive until switched on, and an SDK with no feature
configured does no feature work at all. Every option below keeps its default
unless you name it.

The array form of \`feature\` is significant: several features wrap the
transport, and the order you list them in is the order they nest.

#### `test`

Test transport.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |

| Option | Type |
|---|---|
| `entity` | map |
| `net` | map |

These take no default: the feature behaves one way when you supply them and
another when you do not.

**Usage**

Set `feature.test.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Attaches to pipeline hooks, not the transport, so activation order does
  not change what it observes.
- Installs the BASE transport that the wrapping features wrap, so it must be
  activated before them.
- Inactive by default: leaving it out costs nothing at runtime.

