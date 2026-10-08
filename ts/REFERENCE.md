# Digitalocean TypeScript SDK Reference

Complete API reference for the Digitalocean TypeScript SDK.


## DigitaloceanSDK

### Constructor

```ts
new DigitaloceanSDK(options?: object)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `object` | SDK configuration options. |
| `options.apikey` | `string` | API key for authentication. |
| `options.base` | `string` | Base URL for API requests. |
| `options.prefix` | `string` | URL prefix appended after base. |
| `options.suffix` | `string` | URL suffix appended after path. |
| `options.headers` | `object` | Custom headers for all requests. |
| `options.feature` | `object` | Feature configuration. |
| `options.system` | `object` | System overrides (e.g. custom fetch). |


### Static Methods

#### `DigitaloceanSDK.test(testopts?, sdkopts?)`

Create a test client with mock features active.

```ts
const client = DigitaloceanSDK.test()
```

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `testopts` | `object` | Test feature options. |
| `sdkopts` | `object` | Additional SDK options merged with test defaults. |

**Returns:** `DigitaloceanSDK` instance in test mode.


### Instance Methods

#### `AccessPoint(data?: object)`

Create a new `AccessPoint` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `AccessPointEntity` instance.

#### `Account(data?: object)`

Create a new `Account` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `AccountEntity` instance.

#### `Action(data?: object)`

Create a new `Action` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ActionEntity` instance.

#### `ActorLimit(data?: object)`

Create a new `ActorLimit` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ActorLimitEntity` instance.

#### `AddOnApp(data?: object)`

Create a new `AddOnApp` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `AddOnAppEntity` instance.

#### `AddOnPlan(data?: object)`

Create a new `AddOnPlan` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `AddOnPlanEntity` instance.

#### `AddOnResource(data?: object)`

Create a new `AddOnResource` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `AddOnResourceEntity` instance.

#### `ApiAgentVersion(data?: object)`

Create a new `ApiAgentVersion` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ApiAgentVersionEntity` instance.

#### `ApiCreateAgentApiKeyOutput(data?: object)`

Create a new `ApiCreateAgentApiKeyOutput` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ApiCreateAgentApiKeyOutputEntity` instance.

#### `ApiCreateDataSourceFileUploadPresignedUrlsOutput(data?: object)`

Create a new `ApiCreateDataSourceFileUploadPresignedUrlsOutput` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ApiCreateDataSourceFileUploadPresignedUrlsOutputEntity` instance.

#### `ApiCreateKnowledgeBaseDataSourceOutput(data?: object)`

Create a new `ApiCreateKnowledgeBaseDataSourceOutput` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ApiCreateKnowledgeBaseDataSourceOutputEntity` instance.

#### `ApiCreateScenarioSetFromLibraryOutput(data?: object)`

Create a new `ApiCreateScenarioSetFromLibraryOutput` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ApiCreateScenarioSetFromLibraryOutputEntity` instance.

#### `ApiDeleteAgentApiKeyOutput(data?: object)`

Create a new `ApiDeleteAgentApiKeyOutput` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ApiDeleteAgentApiKeyOutputEntity` instance.

#### `ApiDeleteAgentOutput(data?: object)`

Create a new `ApiDeleteAgentOutput` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ApiDeleteAgentOutputEntity` instance.

#### `ApiDeleteAnthropicApiKeyOutput(data?: object)`

Create a new `ApiDeleteAnthropicApiKeyOutput` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ApiDeleteAnthropicApiKeyOutputEntity` instance.

#### `ApiDeleteCustomEvaluationMetricOutput(data?: object)`

Create a new `ApiDeleteCustomEvaluationMetricOutput` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ApiDeleteCustomEvaluationMetricOutputEntity` instance.

#### `ApiDeleteCustomModelOutputPublic(data?: object)`

Create a new `ApiDeleteCustomModelOutputPublic` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ApiDeleteCustomModelOutputPublicEntity` instance.

#### `ApiDeleteEvaluationDatasetOutput(data?: object)`

Create a new `ApiDeleteEvaluationDatasetOutput` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ApiDeleteEvaluationDatasetOutputEntity` instance.

#### `ApiDeleteKnowledgeBaseDataSourceOutput(data?: object)`

Create a new `ApiDeleteKnowledgeBaseDataSourceOutput` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ApiDeleteKnowledgeBaseDataSourceOutputEntity` instance.

#### `ApiDeleteKnowledgeBaseOutput(data?: object)`

Create a new `ApiDeleteKnowledgeBaseOutput` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ApiDeleteKnowledgeBaseOutputEntity` instance.

#### `ApiDeleteModelApiKeyOutput(data?: object)`

Create a new `ApiDeleteModelApiKeyOutput` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ApiDeleteModelApiKeyOutputEntity` instance.

#### `ApiDeleteModelEvaluationPresetOutput(data?: object)`

Create a new `ApiDeleteModelEvaluationPresetOutput` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ApiDeleteModelEvaluationPresetOutputEntity` instance.

#### `ApiDeleteModelEvaluationRunOutputPublic(data?: object)`

Create a new `ApiDeleteModelEvaluationRunOutputPublic` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ApiDeleteModelEvaluationRunOutputPublicEntity` instance.

#### `ApiDeleteModelRouterOutput(data?: object)`

Create a new `ApiDeleteModelRouterOutput` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ApiDeleteModelRouterOutputEntity` instance.

#### `ApiDeleteOpenAiapiKeyOutput(data?: object)`

Create a new `ApiDeleteOpenAiapiKeyOutput` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ApiDeleteOpenAiapiKeyOutputEntity` instance.

#### `ApiDeleteScenarioSetOutput(data?: object)`

Create a new `ApiDeleteScenarioSetOutput` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ApiDeleteScenarioSetOutputEntity` instance.

#### `ApiDeleteScheduledIndexingOutput(data?: object)`

Create a new `ApiDeleteScheduledIndexingOutput` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ApiDeleteScheduledIndexingOutputEntity` instance.

#### `ApiDeleteSimulationRunOutput(data?: object)`

Create a new `ApiDeleteSimulationRunOutput` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ApiDeleteSimulationRunOutputEntity` instance.

#### `ApiDeleteWorkspaceOutput(data?: object)`

Create a new `ApiDeleteWorkspaceOutput` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ApiDeleteWorkspaceOutputEntity` instance.

#### `ApiDropboxOauth2GetTokensOutput(data?: object)`

Create a new `ApiDropboxOauth2GetTokensOutput` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ApiDropboxOauth2GetTokensOutputEntity` instance.

#### `ApiGenerateOauth2UrlOutput(data?: object)`

Create a new `ApiGenerateOauth2UrlOutput` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ApiGenerateOauth2UrlOutputEntity` instance.

#### `ApiGenerateScenarioSetOutput(data?: object)`

Create a new `ApiGenerateScenarioSetOutput` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ApiGenerateScenarioSetOutputEntity` instance.

#### `ApiGetAgentOutput(data?: object)`

Create a new `ApiGetAgentOutput` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ApiGetAgentOutputEntity` instance.

#### `ApiGetAgentUsageOutput(data?: object)`

Create a new `ApiGetAgentUsageOutput` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ApiGetAgentUsageOutputEntity` instance.

#### `ApiGetAnthropicApiKeyOutput(data?: object)`

Create a new `ApiGetAnthropicApiKeyOutput` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ApiGetAnthropicApiKeyOutputEntity` instance.

#### `ApiGetChildrenOutput(data?: object)`

Create a new `ApiGetChildrenOutput` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ApiGetChildrenOutputEntity` instance.

#### `ApiGetCustomModelOutputPublic(data?: object)`

Create a new `ApiGetCustomModelOutputPublic` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ApiGetCustomModelOutputPublicEntity` instance.

#### `ApiGetEvaluationDatasetDownloadUrlOutput(data?: object)`

Create a new `ApiGetEvaluationDatasetDownloadUrlOutput` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ApiGetEvaluationDatasetDownloadUrlOutputEntity` instance.

#### `ApiGetEvaluationRunOutput(data?: object)`

Create a new `ApiGetEvaluationRunOutput` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ApiGetEvaluationRunOutputEntity` instance.

#### `ApiGetEvaluationRunResultsOutput(data?: object)`

Create a new `ApiGetEvaluationRunResultsOutput` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ApiGetEvaluationRunResultsOutputEntity` instance.

#### `ApiGetEvaluationTestCaseOutput(data?: object)`

Create a new `ApiGetEvaluationTestCaseOutput` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ApiGetEvaluationTestCaseOutputEntity` instance.

#### `ApiGetIndexingJobDetailsSignedUrlOutput(data?: object)`

Create a new `ApiGetIndexingJobDetailsSignedUrlOutput` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ApiGetIndexingJobDetailsSignedUrlOutputEntity` instance.

#### `ApiGetKnowledgeBaseIndexingJobOutput(data?: object)`

Create a new `ApiGetKnowledgeBaseIndexingJobOutput` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ApiGetKnowledgeBaseIndexingJobOutputEntity` instance.

#### `ApiGetKnowledgeBaseOutput(data?: object)`

Create a new `ApiGetKnowledgeBaseOutput` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ApiGetKnowledgeBaseOutputEntity` instance.

#### `ApiGetModelEvaluationRunOutput(data?: object)`

Create a new `ApiGetModelEvaluationRunOutput` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ApiGetModelEvaluationRunOutputEntity` instance.

#### `ApiGetModelEvaluationRunResultsDownloadUrlOutput(data?: object)`

Create a new `ApiGetModelEvaluationRunResultsDownloadUrlOutput` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ApiGetModelEvaluationRunResultsDownloadUrlOutputEntity` instance.

#### `ApiGetModelRouterOutput(data?: object)`

Create a new `ApiGetModelRouterOutput` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ApiGetModelRouterOutputEntity` instance.

#### `ApiGetOpenAiapiKeyOutput(data?: object)`

Create a new `ApiGetOpenAiapiKeyOutput` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ApiGetOpenAiapiKeyOutputEntity` instance.

#### `ApiGetScenarioSetDownloadUrlOutput(data?: object)`

Create a new `ApiGetScenarioSetDownloadUrlOutput` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ApiGetScenarioSetDownloadUrlOutputEntity` instance.

#### `ApiGetScenarioSetOutput(data?: object)`

Create a new `ApiGetScenarioSetOutput` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ApiGetScenarioSetOutputEntity` instance.

#### `ApiGetScheduledIndexingOutput(data?: object)`

Create a new `ApiGetScheduledIndexingOutput` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ApiGetScheduledIndexingOutputEntity` instance.

#### `ApiGetSimulationJourneyTrajectoryUrlOutput(data?: object)`

Create a new `ApiGetSimulationJourneyTrajectoryUrlOutput` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ApiGetSimulationJourneyTrajectoryUrlOutputEntity` instance.

#### `ApiGetSimulationRunOutput(data?: object)`

Create a new `ApiGetSimulationRunOutput` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ApiGetSimulationRunOutputEntity` instance.

#### `ApiGetWorkspaceOutput(data?: object)`

Create a new `ApiGetWorkspaceOutput` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ApiGetWorkspaceOutputEntity` instance.

#### `ApiImportCustomModelOutputPublic(data?: object)`

Create a new `ApiImportCustomModelOutputPublic` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ApiImportCustomModelOutputPublicEntity` instance.

#### `ApiIndexedDataSource(data?: object)`

Create a new `ApiIndexedDataSource` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ApiIndexedDataSourceEntity` instance.

#### `ApiLinkAgentFunctionOutput(data?: object)`

Create a new `ApiLinkAgentFunctionOutput` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ApiLinkAgentFunctionOutputEntity` instance.

#### `ApiLinkAgentGuardrailOutput(data?: object)`

Create a new `ApiLinkAgentGuardrailOutput` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ApiLinkAgentGuardrailOutputEntity` instance.

#### `ApiLinkAgentOutput(data?: object)`

Create a new `ApiLinkAgentOutput` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ApiLinkAgentOutputEntity` instance.

#### `ApiLinkKnowledgeBaseOutput(data?: object)`

Create a new `ApiLinkKnowledgeBaseOutput` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ApiLinkKnowledgeBaseOutputEntity` instance.

#### `ApiListAgentApiKeysOutput(data?: object)`

Create a new `ApiListAgentApiKeysOutput` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ApiListAgentApiKeysOutputEntity` instance.

#### `ApiListAgentsByAnthropicKeyOutput(data?: object)`

Create a new `ApiListAgentsByAnthropicKeyOutput` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ApiListAgentsByAnthropicKeyOutputEntity` instance.

#### `ApiListAgentsByOpenAiKeyOutput(data?: object)`

Create a new `ApiListAgentsByOpenAiKeyOutput` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ApiListAgentsByOpenAiKeyOutputEntity` instance.

#### `ApiListAgentsByWorkspaceOutput(data?: object)`

Create a new `ApiListAgentsByWorkspaceOutput` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ApiListAgentsByWorkspaceOutputEntity` instance.

#### `ApiListEvaluationMetricsOutput(data?: object)`

Create a new `ApiListEvaluationMetricsOutput` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ApiListEvaluationMetricsOutputEntity` instance.

#### `ApiListEvaluationRunsByTestCaseOutput(data?: object)`

Create a new `ApiListEvaluationRunsByTestCaseOutput` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ApiListEvaluationRunsByTestCaseOutputEntity` instance.

#### `ApiListEvaluationTestCasesByWorkspaceOutput(data?: object)`

Create a new `ApiListEvaluationTestCasesByWorkspaceOutput` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ApiListEvaluationTestCasesByWorkspaceOutputEntity` instance.

#### `ApiListKnowledgeBaseDataSourcesOutput(data?: object)`

Create a new `ApiListKnowledgeBaseDataSourcesOutput` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ApiListKnowledgeBaseDataSourcesOutputEntity` instance.

#### `ApiListKnowledgeBaseIndexingJobsOutput(data?: object)`

Create a new `ApiListKnowledgeBaseIndexingJobsOutput` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ApiListKnowledgeBaseIndexingJobsOutputEntity` instance.

#### `ApiListModelEvaluationMetricsOutput(data?: object)`

Create a new `ApiListModelEvaluationMetricsOutput` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ApiListModelEvaluationMetricsOutputEntity` instance.

#### `ApiListScenarioLibraryOutput(data?: object)`

Create a new `ApiListScenarioLibraryOutput` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ApiListScenarioLibraryOutputEntity` instance.

#### `ApiListScenariosOutput(data?: object)`

Create a new `ApiListScenariosOutput` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ApiListScenariosOutputEntity` instance.

#### `ApiListSimulationJourneysOutput(data?: object)`

Create a new `ApiListSimulationJourneysOutput` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ApiListSimulationJourneysOutputEntity` instance.

#### `ApiModelCatalogCard(data?: object)`

Create a new `ApiModelCatalogCard` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ApiModelCatalogCardEntity` instance.

#### `ApiModelEvaluationPreset(data?: object)`

Create a new `ApiModelEvaluationPreset` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ApiModelEvaluationPresetEntity` instance.

#### `ApiModelPublic(data?: object)`

Create a new `ApiModelPublic` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ApiModelPublicEntity` instance.

#### `ApiModelRouterPreset(data?: object)`

Create a new `ApiModelRouterPreset` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ApiModelRouterPresetEntity` instance.

#### `ApiModelRouterTaskPreset(data?: object)`

Create a new `ApiModelRouterTaskPreset` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ApiModelRouterTaskPresetEntity` instance.

#### `ApiMoveAgentsToWorkspaceOutput(data?: object)`

Create a new `ApiMoveAgentsToWorkspaceOutput` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ApiMoveAgentsToWorkspaceOutputEntity` instance.

#### `ApiPrompt(data?: object)`

Create a new `ApiPrompt` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ApiPromptEntity` instance.

#### `ApiRollbackToAgentVersionOutput(data?: object)`

Create a new `ApiRollbackToAgentVersionOutput` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ApiRollbackToAgentVersionOutputEntity` instance.

#### `ApiSimulationJourney(data?: object)`

Create a new `ApiSimulationJourney` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ApiSimulationJourneyEntity` instance.

#### `ApiSimulationTrajectory(data?: object)`

Create a new `ApiSimulationTrajectory` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ApiSimulationTrajectoryEntity` instance.

#### `ApiUnlinkAgentFunctionOutput(data?: object)`

Create a new `ApiUnlinkAgentFunctionOutput` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ApiUnlinkAgentFunctionOutputEntity` instance.

#### `ApiUnlinkAgentGuardrailOutput(data?: object)`

Create a new `ApiUnlinkAgentGuardrailOutput` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ApiUnlinkAgentGuardrailOutputEntity` instance.

#### `ApiUnlinkAgentOutput(data?: object)`

Create a new `ApiUnlinkAgentOutput` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ApiUnlinkAgentOutputEntity` instance.

#### `ApiUnlinkKnowledgeBaseOutput(data?: object)`

Create a new `ApiUnlinkKnowledgeBaseOutput` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ApiUnlinkKnowledgeBaseOutputEntity` instance.

#### `ApiUpdateAgentApiKeyOutput(data?: object)`

Create a new `ApiUpdateAgentApiKeyOutput` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ApiUpdateAgentApiKeyOutputEntity` instance.

#### `ApiUpdateAgentFunctionOutput(data?: object)`

Create a new `ApiUpdateAgentFunctionOutput` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ApiUpdateAgentFunctionOutputEntity` instance.

#### `ApiUpdateAgentOutput(data?: object)`

Create a new `ApiUpdateAgentOutput` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ApiUpdateAgentOutputEntity` instance.

#### `ApiUpdateAnthropicApiKeyOutput(data?: object)`

Create a new `ApiUpdateAnthropicApiKeyOutput` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ApiUpdateAnthropicApiKeyOutputEntity` instance.

#### `ApiUpdateCustomEvaluationMetricOutput(data?: object)`

Create a new `ApiUpdateCustomEvaluationMetricOutput` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ApiUpdateCustomEvaluationMetricOutputEntity` instance.

#### `ApiUpdateEvaluationTestCaseOutput(data?: object)`

Create a new `ApiUpdateEvaluationTestCaseOutput` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ApiUpdateEvaluationTestCaseOutputEntity` instance.

#### `ApiUpdateKnowledgeBaseDataSourceOutput(data?: object)`

Create a new `ApiUpdateKnowledgeBaseDataSourceOutput` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ApiUpdateKnowledgeBaseDataSourceOutputEntity` instance.

#### `ApiUpdateKnowledgeBaseOutput(data?: object)`

Create a new `ApiUpdateKnowledgeBaseOutput` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ApiUpdateKnowledgeBaseOutputEntity` instance.

#### `ApiUpdateLinkedAgentOutput(data?: object)`

Create a new `ApiUpdateLinkedAgentOutput` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ApiUpdateLinkedAgentOutputEntity` instance.

#### `ApiUpdateModelApiKeyOutput(data?: object)`

Create a new `ApiUpdateModelApiKeyOutput` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ApiUpdateModelApiKeyOutputEntity` instance.

#### `ApiUpdateModelEvaluationRunOutput(data?: object)`

Create a new `ApiUpdateModelEvaluationRunOutput` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ApiUpdateModelEvaluationRunOutputEntity` instance.

#### `ApiUpdateModelRouterOutput(data?: object)`

Create a new `ApiUpdateModelRouterOutput` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ApiUpdateModelRouterOutputEntity` instance.

#### `ApiUpdateOpenAiapiKeyOutput(data?: object)`

Create a new `ApiUpdateOpenAiapiKeyOutput` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ApiUpdateOpenAiapiKeyOutputEntity` instance.

#### `ApiUpdateScenarioSetOutput(data?: object)`

Create a new `ApiUpdateScenarioSetOutput` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ApiUpdateScenarioSetOutputEntity` instance.

#### `ApiUpdateSimulationRunOutput(data?: object)`

Create a new `ApiUpdateSimulationRunOutput` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ApiUpdateSimulationRunOutputEntity` instance.

#### `ApiUpdateWorkspaceOutput(data?: object)`

Create a new `ApiUpdateWorkspaceOutput` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ApiUpdateWorkspaceOutputEntity` instance.

#### `App(data?: object)`

Create a new `App` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `AppEntity` instance.

#### `AppAlert(data?: object)`

Create a new `AppAlert` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `AppAlertEntity` instance.

#### `AppEvent(data?: object)`

Create a new `AppEvent` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `AppEventEntity` instance.

#### `AppHealth(data?: object)`

Create a new `AppHealth` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `AppHealthEntity` instance.

#### `AppInstance(data?: object)`

Create a new `AppInstance` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `AppInstanceEntity` instance.

#### `AppJobInvocation(data?: object)`

Create a new `AppJobInvocation` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `AppJobInvocationEntity` instance.

#### `AppMetricsBandwidthUsage(data?: object)`

Create a new `AppMetricsBandwidthUsage` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `AppMetricsBandwidthUsageEntity` instance.

#### `AppPropose(data?: object)`

Create a new `AppPropose` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `AppProposeEntity` instance.

#### `AppsDeployment(data?: object)`

Create a new `AppsDeployment` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `AppsDeploymentEntity` instance.

#### `AppsGetExec(data?: object)`

Create a new `AppsGetExec` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `AppsGetExecEntity` instance.

#### `AppsGetLog(data?: object)`

Create a new `AppsGetLog` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `AppsGetLogEntity` instance.

#### `AppsInstanceSize(data?: object)`

Create a new `AppsInstanceSize` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `AppsInstanceSizeEntity` instance.

#### `AppsRegion(data?: object)`

Create a new `AppsRegion` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `AppsRegionEntity` instance.

#### `AssociatedKubernetesResource(data?: object)`

Create a new `AssociatedKubernetesResource` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `AssociatedKubernetesResourceEntity` instance.

#### `AssociatedResourceStatus(data?: object)`

Create a new `AssociatedResourceStatus` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `AssociatedResourceStatusEntity` instance.

#### `AsyncInvoke(data?: object)`

Create a new `AsyncInvoke` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `AsyncInvokeEntity` instance.

#### `Balance(data?: object)`

Create a new `Balance` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `BalanceEntity` instance.

#### `Batch(data?: object)`

Create a new `Batch` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `BatchEntity` instance.

#### `BatchFileCreate(data?: object)`

Create a new `BatchFileCreate` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `BatchFileCreateEntity` instance.

#### `BatchInference(data?: object)`

Create a new `BatchInference` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `BatchInferenceEntity` instance.

#### `BatchResult(data?: object)`

Create a new `BatchResult` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `BatchResultEntity` instance.

#### `Billing(data?: object)`

Create a new `Billing` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `BillingEntity` instance.

#### `BlockStorage(data?: object)`

Create a new `BlockStorage` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `BlockStorageEntity` instance.

#### `BlockStorageAction(data?: object)`

Create a new `BlockStorageAction` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `BlockStorageActionEntity` instance.

#### `ByoipPrefix(data?: object)`

Create a new `ByoipPrefix` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ByoipPrefixEntity` instance.

#### `CdnEndpoint(data?: object)`

Create a new `CdnEndpoint` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `CdnEndpointEntity` instance.

#### `Certificate(data?: object)`

Create a new `Certificate` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `CertificateEntity` instance.

#### `ChatCompletion(data?: object)`

Create a new `ChatCompletion` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ChatCompletionEntity` instance.

#### `Clusterlint(data?: object)`

Create a new `Clusterlint` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ClusterlintEntity` instance.

#### `Connection(data?: object)`

Create a new `Connection` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ConnectionEntity` instance.

#### `ConnectionPool(data?: object)`

Create a new `ConnectionPool` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ConnectionPoolEntity` instance.

#### `ContainerRegistry(data?: object)`

Create a new `ContainerRegistry` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ContainerRegistryEntity` instance.

#### `CreateResponse(data?: object)`

Create a new `CreateResponse` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `CreateResponseEntity` instance.

#### `Credential(data?: object)`

Create a new `Credential` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `CredentialEntity` instance.

#### `Database(data?: object)`

Create a new `Database` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `DatabaseEntity` instance.

#### `DedicatedInference(data?: object)`

Create a new `DedicatedInference` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `DedicatedInferenceEntity` instance.

#### `DedicatedInferenceAccelerator(data?: object)`

Create a new `DedicatedInferenceAccelerator` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `DedicatedInferenceAcceleratorEntity` instance.

#### `DedicatedInferenceGpuModelConfig(data?: object)`

Create a new `DedicatedInferenceGpuModelConfig` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `DedicatedInferenceGpuModelConfigEntity` instance.

#### `DedicatedInferenceSize(data?: object)`

Create a new `DedicatedInferenceSize` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `DedicatedInferenceSizeEntity` instance.

#### `DockerCredential(data?: object)`

Create a new `DockerCredential` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `DockerCredentialEntity` instance.

#### `Domain(data?: object)`

Create a new `Domain` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `DomainEntity` instance.

#### `DomainRecord(data?: object)`

Create a new `DomainRecord` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `DomainRecordEntity` instance.

#### `Droplet(data?: object)`

Create a new `Droplet` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `DropletEntity` instance.

#### `DropletAction(data?: object)`

Create a new `DropletAction` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `DropletActionEntity` instance.

#### `DropletAutoscalePool(data?: object)`

Create a new `DropletAutoscalePool` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `DropletAutoscalePoolEntity` instance.

#### `Embedding(data?: object)`

Create a new `Embedding` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `EmbeddingEntity` instance.

#### `Empty(data?: object)`

Create a new `Empty` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `EmptyEntity` instance.

#### `Firewall(data?: object)`

Create a new `Firewall` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `FirewallEntity` instance.

#### `FloatingIp(data?: object)`

Create a new `FloatingIp` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `FloatingIpEntity` instance.

#### `FloatingIpAction(data?: object)`

Create a new `FloatingIpAction` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `FloatingIpActionEntity` instance.

#### `FunctionKey(data?: object)`

Create a new `FunctionKey` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `FunctionKeyEntity` instance.

#### `FunctionNamespace(data?: object)`

Create a new `FunctionNamespace` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `FunctionNamespaceEntity` instance.

#### `FunctionTrigger(data?: object)`

Create a new `FunctionTrigger` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `FunctionTriggerEntity` instance.

#### `GenaiapiRegion(data?: object)`

Create a new `GenaiapiRegion` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `GenaiapiRegionEntity` instance.

#### `Image(data?: object)`

Create a new `Image` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ImageEntity` instance.

#### `ImageAction(data?: object)`

Create a new `ImageAction` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ImageActionEntity` instance.

#### `Insight(data?: object)`

Create a new `Insight` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `InsightEntity` instance.

#### `InvoiceSummary(data?: object)`

Create a new `InvoiceSummary` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `InvoiceSummaryEntity` instance.

#### `Kubernete(data?: object)`

Create a new `Kubernete` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `KuberneteEntity` instance.

#### `KubernetesOption(data?: object)`

Create a new `KubernetesOption` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `KubernetesOptionEntity` instance.

#### `ListMcpServerTool(data?: object)`

Create a new `ListMcpServerTool` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ListMcpServerToolEntity` instance.

#### `ListProvider(data?: object)`

Create a new `ListProvider` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ListProviderEntity` instance.

#### `ListProviderHealth(data?: object)`

Create a new `ListProviderHealth` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ListProviderHealthEntity` instance.

#### `ListTool(data?: object)`

Create a new `ListTool` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ListToolEntity` instance.

#### `ListToolHealth(data?: object)`

Create a new `ListToolHealth` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ListToolHealthEntity` instance.

#### `ListToolbeltProvider(data?: object)`

Create a new `ListToolbeltProvider` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ListToolbeltProviderEntity` instance.

#### `ListToolkit(data?: object)`

Create a new `ListToolkit` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ListToolkitEntity` instance.

#### `LoadBalancer(data?: object)`

Create a new `LoadBalancer` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `LoadBalancerEntity` instance.

#### `LogsSearch(data?: object)`

Create a new `LogsSearch` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `LogsSearchEntity` instance.

#### `Logsink(data?: object)`

Create a new `Logsink` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `LogsinkEntity` instance.

#### `McpServer(data?: object)`

Create a new `McpServer` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `McpServerEntity` instance.

#### `Message(data?: object)`

Create a new `Message` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `MessageEntity` instance.

#### `Metric(data?: object)`

Create a new `Metric` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `MetricEntity` instance.

#### `Model(data?: object)`

Create a new `Model` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ModelEntity` instance.

#### `MonitoringAlert(data?: object)`

Create a new `MonitoringAlert` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `MonitoringAlertEntity` instance.

#### `MonitoringSink(data?: object)`

Create a new `MonitoringSink` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `MonitoringSinkEntity` instance.

#### `MonitoringSinkDestination(data?: object)`

Create a new `MonitoringSinkDestination` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `MonitoringSinkDestinationEntity` instance.

#### `N1Click(data?: object)`

Create a new `N1Click` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `N1ClickEntity` instance.

#### `N1ClickApplication(data?: object)`

Create a new `N1ClickApplication` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `N1ClickApplicationEntity` instance.

#### `NeighborId(data?: object)`

Create a new `NeighborId` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `NeighborIdEntity` instance.

#### `Nfs(data?: object)`

Create a new `Nfs` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `NfsEntity` instance.

#### `NfsAction2(data?: object)`

Create a new `NfsAction2` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `NfsAction2Entity` instance.

#### `NfsSnapshot(data?: object)`

Create a new `NfsSnapshot` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `NfsSnapshotEntity` instance.

#### `OnlineMigration(data?: object)`

Create a new `OnlineMigration` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `OnlineMigrationEntity` instance.

#### `Option(data?: object)`

Create a new `Option` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `OptionEntity` instance.

#### `Organization(data?: object)`

Create a new `Organization` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `OrganizationEntity` instance.

#### `OutputView(data?: object)`

Create a new `OutputView` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `OutputViewEntity` instance.

#### `PartnerNetworkConnect(data?: object)`

Create a new `PartnerNetworkConnect` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `PartnerNetworkConnectEntity` instance.

#### `PrepaymentConfig(data?: object)`

Create a new `PrepaymentConfig` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `PrepaymentConfigEntity` instance.

#### `PrepaymentStatus(data?: object)`

Create a new `PrepaymentStatus` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `PrepaymentStatusEntity` instance.

#### `Project(data?: object)`

Create a new `Project` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ProjectEntity` instance.

#### `ProjectResource(data?: object)`

Create a new `ProjectResource` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ProjectResourceEntity` instance.

#### `PromQuery(data?: object)`

Create a new `PromQuery` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `PromQueryEntity` instance.

#### `PromQueryRange(data?: object)`

Create a new `PromQueryRange` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `PromQueryRangeEntity` instance.

#### `PromSeries(data?: object)`

Create a new `PromSeries` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `PromSeriesEntity` instance.

#### `PromStringList(data?: object)`

Create a new `PromStringList` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `PromStringListEntity` instance.

#### `Region(data?: object)`

Create a new `Region` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `RegionEntity` instance.

#### `ReservedIPv6(data?: object)`

Create a new `ReservedIPv6` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ReservedIPv6Entity` instance.

#### `ReservedIPv6Action(data?: object)`

Create a new `ReservedIPv6Action` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ReservedIPv6ActionEntity` instance.

#### `ReservedIp(data?: object)`

Create a new `ReservedIp` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ReservedIpEntity` instance.

#### `ReservedIpAction(data?: object)`

Create a new `ReservedIpAction` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ReservedIpActionEntity` instance.

#### `Resync(data?: object)`

Create a new `Resync` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ResyncEntity` instance.

#### `Search(data?: object)`

Create a new `Search` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `SearchEntity` instance.

#### `SecurityPlan(data?: object)`

Create a new `SecurityPlan` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `SecurityPlanEntity` instance.

#### `SecurityRule(data?: object)`

Create a new `SecurityRule` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `SecurityRuleEntity` instance.

#### `SecurityScan(data?: object)`

Create a new `SecurityScan` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `SecurityScanEntity` instance.

#### `SecuritySuppression(data?: object)`

Create a new `SecuritySuppression` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `SecuritySuppressionEntity` instance.

#### `Setting(data?: object)`

Create a new `Setting` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `SettingEntity` instance.

#### `Size(data?: object)`

Create a new `Size` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `SizeEntity` instance.

#### `Snapshot(data?: object)`

Create a new `Snapshot` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `SnapshotEntity` instance.

#### `SpacesKey(data?: object)`

Create a new `SpacesKey` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `SpacesKeyEntity` instance.

#### `SqlMode(data?: object)`

Create a new `SqlMode` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `SqlModeEntity` instance.

#### `SshKey(data?: object)`

Create a new `SshKey` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `SshKeyEntity` instance.

#### `Systemone(data?: object)`

Create a new `Systemone` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `SystemoneEntity` instance.

#### `Tag(data?: object)`

Create a new `Tag` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `TagEntity` instance.

#### `Tool(data?: object)`

Create a new `Tool` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ToolEntity` instance.

#### `Toolbelt(data?: object)`

Create a new `Toolbelt` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ToolbeltEntity` instance.

#### `Uptime(data?: object)`

Create a new `Uptime` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `UptimeEntity` instance.

#### `User(data?: object)`

Create a new `User` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `UserEntity` instance.

#### `VectorDatabase(data?: object)`

Create a new `VectorDatabase` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `VectorDatabaseEntity` instance.

#### `VectordbBackup(data?: object)`

Create a new `VectordbBackup` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `VectordbBackupEntity` instance.

#### `VectordbGetRestoreStatus(data?: object)`

Create a new `VectordbGetRestoreStatus` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `VectordbGetRestoreStatusEntity` instance.

#### `VectordbGetVectorDb(data?: object)`

Create a new `VectordbGetVectorDb` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `VectordbGetVectorDbEntity` instance.

#### `VectordbGetVectorDbAdminCredential(data?: object)`

Create a new `VectordbGetVectorDbAdminCredential` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `VectordbGetVectorDbAdminCredentialEntity` instance.

#### `VectordbRestoreBackup(data?: object)`

Create a new `VectordbRestoreBackup` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `VectordbRestoreBackupEntity` instance.

#### `VectordbUpdateVectorDb(data?: object)`

Create a new `VectordbUpdateVectorDb` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `VectordbUpdateVectorDbEntity` instance.

#### `VectordbUpdateVectorDbTag(data?: object)`

Create a new `VectordbUpdateVectorDbTag` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `VectordbUpdateVectorDbTagEntity` instance.

#### `Vpc(data?: object)`

Create a new `Vpc` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `VpcEntity` instance.

#### `VpcNatGateway(data?: object)`

Create a new `VpcNatGateway` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `VpcNatGatewayEntity` instance.

#### `VpcPeering(data?: object)`

Create a new `VpcPeering` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `VpcPeeringEntity` instance.

#### `VpcRoutesPublicPreview(data?: object)`

Create a new `VpcRoutesPublicPreview` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `VpcRoutesPublicPreviewEntity` instance.

#### `VpcSubnetsPublicPreview(data?: object)`

Create a new `VpcSubnetsPublicPreview` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `VpcSubnetsPublicPreviewEntity` instance.

#### `options()`

Return a deep copy of the current SDK options.

**Returns:** `object`

#### `utility()`

Return a copy of the SDK utility object.

**Returns:** `object`

#### `direct(fetchargs?: object)`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs.path` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs.method` | `string` | HTTP method (default: `GET`). |
| `fetchargs.params` | `object` | Path parameter values for `{param}` substitution. |
| `fetchargs.query` | `object` | Query string parameters. |
| `fetchargs.headers` | `object` | Request headers (merged with defaults). |
| `fetchargs.body` | `any` | Request body (objects are JSON-serialized). |
| `fetchargs.ctrl` | `object` | Control options (e.g. `{ explain: true }`). |
| `fetchargs.ctrl.signal` | `AbortSignal` | Aborts the request in flight: `ok` is then `false` and `err.code` is `request_aborted`. |

**Returns:** `Promise<{ ok, status, headers, data }>`. On a failure
`ok` is `false` and `err` holds the error.

#### `prepare(fetchargs?: object)`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`.

**Returns:** `Promise<{ url, method, headers, body } | Error>`

#### `tester(testopts?, sdkopts?)`

Alias for `DigitaloceanSDK.test()`.

**Returns:** `DigitaloceanSDK` instance in test mode.

#### Cancelling a call

Every entity operation takes an optional `ctrl` object after its match or
data, and an `AbortSignal` in `ctrl.signal` cancels the request in flight.
The operation then rejects with an error whose `code` is
`request_aborted` and whose `cause` is the signal's reason. A request
whose signal has already aborted is not sent. `stream()` takes the signal
as `callopts.signal`, and ends when it aborts.


---

## AccessPointEntity

```ts
const access_point = client.AccessPoint()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `access_policy` | `Record<string, any>` | Yes | Provider-agnostic NFS access policy for an access point. |
| `created_at` | `string` | Yes | The timestamp when the access point was created. |
| `id` | `string` | Yes | The unique identifier of the access point. |
| `is_default` | `boolean` | Yes | Whether this is the share's default access point. |
| `name` | `string` | Yes | The human-readable name of the access point. |
| `path` | `string` | Yes | The export sub-path for this access point (always starts with `/`). |
| `share_id` | `string` | Yes | The unique identifier of the share this access point belongs to. |
| `status` | `string` | Yes | The current lifecycle status of an access point. |
| `updated_at` | `string` | Yes | The timestamp when the access point was last updated. |
| `vpc_id` | `string` | No | The VPC this access point is pinned to. |

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

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.AccessPoint().create({
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

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.AccessPoint().list({ share_id: "example" })
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.AccessPoint().load({ id: 'access_point_id' })
```

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria.

```ts
const result = await client.AccessPoint().remove({ id: 'access_point_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `AccessPointEntity` instance with the same client and
options.

#### `client()`

Return the parent `DigitaloceanSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## AccountEntity

```ts
const account = client.Account()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `droplet_limit` | `number` | Yes | The total number of Droplets current user or team may have active at one time. |
| `email` | `string` | Yes | The email address used by the current user to register for DigitalOcean. |
| `email_verified` | `boolean` | Yes | If true, the user has verified their account via email. |
| `floating_ip_limit` | `number` | Yes | The total number of Floating IPs the current user or team may have. |
| `name` | `string` | No | The display name for the current user. |
| `status` | `string` | Yes | This value is one of "active", "warning" or "locked". |
| `status_message` | `string` | Yes | A human-readable message giving more details about the status of the account. |
| `team` | `Record<string, any>` | No | When authorized in a team context, includes information about the current team. |
| `uuid` | `string` | Yes | The unique universal identifier for the current user. |

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Account().load()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `AccountEntity` instance with the same client and
options.

#### `client()`

Return the parent `DigitaloceanSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ActionEntity

```ts
const action = client.Action()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `completed_at` | `string` | No | A time value given in ISO8601 combined date and time format that represents when the action was completed. |
| `id` | `number` | No | A unique numeric ID that can be used to identify and reference an action. |
| `region` | `Record<string, any>` | Yes |  |
| `region_slug` | `string` | No | A human-readable string that is used as a unique identifier for each region. |
| `resource_id` | `number` | No | A unique identifier for the resource that the action is associated with. |
| `resource_type` | `string` | No | The type of resource that the action is associated with. |
| `started_at` | `string` | No | A time value given in ISO8601 combined date and time format that represents when the action was initiated. |
| `status` | `string` | No | The current status of the action. |
| `type` | `string` | No | This is the type of action that the object represents. |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Action().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Action().load({ id: 1 })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ActionEntity` instance with the same client and
options.

#### `client()`

Return the parent `DigitaloceanSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ActorLimitEntity

```ts
const actor_limit = client.ActorLimit()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `category` | `string` | Yes | The category the limit applies to. |
| `id` | `string` | No |  |
| `requests_per_minute` | `string` | Yes | Calls allowed per minute. |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.ActorLimit().list({ id: "example" })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ActorLimitEntity` instance with the same client and
options.

#### `client()`

Return the parent `DigitaloceanSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## AddOnAppEntity

```ts
const add_on_app = client.AddOnApp()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `app_slug` | `string` | Yes | The slug identifier for the application associated with the resource. |
| `description` | `string` | Yes | A brief description of the metadata item. |
| `display_name` | `string` | Yes | The display name of the metadata item. |
| `eula` | `string` | Yes | The End User License Agreement URL for the resource. |
| `id` | `number` | Yes | Unique identifier for the addon metadata item. |
| `name` | `string` | Yes | The name of the metadata item. |
| `options` | `any[]` | No |  |
| `plans` | `any[]` | Yes | A list of plans available for the resource. |
| `tos` | `string` | Yes | The Terms of Service URL for the resource. |
| `type` | `string` | Yes | The data type of the metadata value. |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.AddOnApp().list()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `AddOnAppEntity` instance with the same client and
options.

#### `client()`

Return the parent `DigitaloceanSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## AddOnPlanEntity

```ts
const add_on_plan = client.AddOnPlan()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `app_name` | `string` | No | The name of the application associated with the resource. |
| `app_slug` | `string` | Yes | The slug identifier for the application associated with the resource. |
| `has_config` | `boolean` | Yes | Indicates if the resource has configuration values set by the vendor. |
| `message` | `string` | No | A message related to the resource, if applicable. |
| `metadata` | `any[]` | No | Metadata associated with the resource, set by the user. |
| `name` | `string` | Yes | The name of the addon resource. |
| `plan_name` | `string` | No | The name of the plan associated with the resource. |
| `plan_price_per_month` | `number` | No | The price of the plan per month in US dollars. |
| `plan_slug` | `string` | Yes | The slug identifier for the plan associated with the resource. |
| `sso_url` | `string` | No | The Single Sign-On URL for the resource, if applicable. |
| `state` | `string` | Yes | The state the resource is currently in. |
| `uuid` | `string` | Yes | The unique identifier for the addon resource. |

### Operations

#### `update(data: object, ctrl?: object)`

Update an existing entity. The data must include the entity `id`.

```ts
const result = await client.AddOnPlan().update({
  resource_uuid: 'resource_uuid',
  // Fields to update
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `AddOnPlanEntity` instance with the same client and
options.

#### `client()`

Return the parent `DigitaloceanSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## AddOnResourceEntity

```ts
const add_on_resource = client.AddOnResource()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `app_name` | `string` | No | The name of the application associated with the resource. |
| `app_slug` | `string` | Yes | The slug identifier for the application associated with the resource. |
| `fleet_uuid` | `string` | No | UUID of the fleet/project to which this resource will belong. |
| `has_config` | `boolean` | Yes | Indicates if the resource has configuration values set by the vendor. |
| `linked_droplet_id` | `number` | No | ID of the droplet to be linked to this resource, if applicable. |
| `message` | `string` | No | A message related to the resource, if applicable. |
| `metadata` | `any[]` | No | Metadata associated with the resource, set by the user. |
| `name` | `string` | Yes | The name of the addon resource. |
| `plan_name` | `string` | No | The name of the plan associated with the resource. |
| `plan_price_per_month` | `number` | No | The price of the plan per month in US dollars. |
| `plan_slug` | `string` | Yes | The slug identifier for the plan associated with the resource. |
| `sso_url` | `string` | No | The Single Sign-On URL for the resource, if applicable. |
| `state` | `string` | Yes | The state the resource is currently in. |
| `uuid` | `string` | Yes | The unique identifier for the addon resource. |

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

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.AddOnResource().create({
  app_slug: 'example_app_slug',
  has_config: true,
  name: 'example_name',
  plan_slug: 'example_plan_slug',
  state: 'example_state',
  uuid: 'example_uuid',
})
```

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.AddOnResource().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.AddOnResource().load({ resource_uuid: 'resource_uuid' })
```

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria.

```ts
const result = await client.AddOnResource().remove({ resource_uuid: 'resource_uuid' })
```

#### `update(data: object, ctrl?: object)`

Update an existing entity. The data must include the entity `id`.

```ts
const result = await client.AddOnResource().update({
  resource_uuid: 'resource_uuid',
  // Fields to update
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `AddOnResourceEntity` instance with the same client and
options.

#### `client()`

Return the parent `DigitaloceanSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ApiAgentVersionEntity

```ts
const api_agent_version = client.ApiAgentVersion()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `agent_uuid` | `string` | No | Uuid of the agent this version belongs to |
| `attached_child_agents` | `any[]` | No | List of child agent relationships |
| `attached_functions` | `any[]` | No | List of function versions |
| `attached_guardrails` | `any[]` | No | List of guardrail version |
| `attached_knowledgebases` | `any[]` | No | List of knowledge base agent versions |
| `can_rollback` | `boolean` | No | Whether the version is able to be rolled back to |
| `created_at` | `string` | No | Creation date |
| `created_by_email` | `string` | No | User who created this version |
| `currently_applied` | `boolean` | No | Whether this is the currently applied configuration |
| `description` | `string` | No | Description of the agent |
| `id` | `string` | No | Unique identifier |
| `instruction` | `string` | No | Instruction for the agent |
| `k` | `number` | No | K value for the agent's configuration |
| `max_tokens` | `number` | No | Max tokens setting for the agent |
| `model_name` | `string` | No | Name of model associated to the agent version |
| `name` | `string` | No | Name of the agent |
| `provide_citations` | `boolean` | No | Whether the agent should provide in-response citations |
| `retrieval_method` | `string` | No | - RETRIEVAL_METHOD_UNKNOWN: The retrieval method is unknown - RETRIEVAL_METHOD_REWRITE: The retrieval method is rewrite - RETRIEVAL_METHOD_STEP_BACK: The retrieval method is step back - RETRIEVAL_METHOD_SUB_QUERIES: The retrieval method is… |
| `tags` | `any[]` | No | Tags associated with the agent |
| `temperature` | `number` | No | Temperature setting for the agent |
| `top_p` | `number` | No | Top_p setting for the agent |
| `trigger_action` | `string` | No | Action triggering the configuration update |
| `version_hash` | `string` | No | Version hash |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.ApiAgentVersion().list({ agent_id: "example" })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ApiAgentVersionEntity` instance with the same client and
options.

#### `client()`

Return the parent `DigitaloceanSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ApiCreateAgentApiKeyOutputEntity

```ts
const api_create_agent_api_key_output = client.ApiCreateAgentApiKeyOutput()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `agent_uuid` | `string` | No | Agent id |
| `created_at` | `string` | No | Creation date |
| `created_by` | `string` | No | Created by |
| `deleted_at` | `string` | No | Deleted date |
| `name` | `string` | No | Name |
| `secret_key` | `string` | No |  |
| `uuid` | `string` | No | Uuid |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.ApiCreateAgentApiKeyOutput().create({
  agent_id: 'example_agent_id',
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ApiCreateAgentApiKeyOutputEntity` instance with the same client and
options.

#### `client()`

Return the parent `DigitaloceanSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ApiCreateDataSourceFileUploadPresignedUrlsOutputEntity

```ts
const api_create_data_source_file_upload_presigned_urls_output = client.ApiCreateDataSourceFileUploadPresignedUrlsOutput()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `files` | `any[]` | No | A list of files to generate presigned URLs for. |
| `request_id` | `string` | No | The ID generated for the request for Presigned URLs. |
| `uploads` | `any[]` | No | A list of generated presigned URLs and object keys, one per file. |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.ApiCreateDataSourceFileUploadPresignedUrlsOutput().create({
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ApiCreateDataSourceFileUploadPresignedUrlsOutputEntity` instance with the same client and
options.

#### `client()`

Return the parent `DigitaloceanSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ApiCreateKnowledgeBaseDataSourceOutputEntity

```ts
const api_create_knowledge_base_data_source_output = client.ApiCreateKnowledgeBaseDataSourceOutput()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `aws_data_source` | `Record<string, any>` | No | AWS S3 Data Source for Display |
| `bucket_name` | `string` | No | Name of storage bucket - Deprecated, moved to data_source_details |
| `chunking_algorithm` | `string` | No |  |
| `chunking_options` | `Record<string, any>` | No |  |
| `created_at` | `string` | No | Creation date / time |
| `dropbox_data_source` | `Record<string, any>` | No | Dropbox Data Source for Display |
| `file_upload_data_source` | `Record<string, any>` | No | File to upload as data source for knowledge base. |
| `google_drive_data_source` | `Record<string, any>` | No | Google Drive Data Source for Display |
| `item_path` | `string` | No | Path of folder or object in bucket - Deprecated, moved to data_source_details |
| `knowledge_base_uuid` | `string` | No | Knowledge base id |
| `last_datasource_indexing_job` | `Record<string, any>` | No |  |
| `region` | `string` | No | Region code - Deprecated, moved to data_source_details |
| `spaces_data_source` | `Record<string, any>` | No | Spaces Bucket Data Source |
| `updated_at` | `string` | No | Last modified |
| `uuid` | `string` | No | Unique id of knowledge base |
| `web_crawler_data_source` | `Record<string, any>` | No | WebCrawlerDataSource |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.ApiCreateKnowledgeBaseDataSourceOutput().create({
  knowledge_base_id: 'example_knowledge_base_id',
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ApiCreateKnowledgeBaseDataSourceOutputEntity` instance with the same client and
options.

#### `client()`

Return the parent `DigitaloceanSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ApiCreateScenarioSetFromLibraryOutputEntity

```ts
const api_create_scenario_set_from_library_output = client.ApiCreateScenarioSetFromLibraryOutput()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `bucket_name` | `string` | No | Object storage bucket holding the scenario file. |
| `bucket_region` | `string` | No | Object storage bucket region. |
| `created_at` | `string` | No | Time created at. |
| `deleted_at` | `string` | No | Time deleted at. |
| `description` | `string` | No | Customer-supplied description. |
| `failure_reason` | `string` | No | Human-readable explanation of a terminal FAILED status. |
| `generator_model_uuid` | `string` | No | Model that produced the scenarios. |
| `library_scenario_uuid` | `string` | No | UUID of the source library entry. |
| `name` | `string` | No | Customer-supplied name. |
| `scenario_count` | `number` | No | Number of scenarios in the set. |
| `scenario_set_uuid` | `string` | No | UUID of the scenario set. |
| `source_export_id` | `string` | No | Signals export UUID that produced this set. |
| `source_goal_description` | `string` | No | The goal that drove generation. |
| `source_kind` | `string` | No | How a scenario set was created. |
| `spaces_key` | `string` | No | Object storage key for the scenario file. |
| `status` | `string` | No | Lifecycle status of a scenario set. |
| `updated_at` | `string` | No | Time last updated at. |
| `workflow_uuid` | `string` | No | Identifier of the generation workflow. |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.ApiCreateScenarioSetFromLibraryOutput().create({
  scenario_library_id: 'example_scenario_library_id',
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ApiCreateScenarioSetFromLibraryOutputEntity` instance with the same client and
options.

#### `client()`

Return the parent `DigitaloceanSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ApiDeleteAgentApiKeyOutputEntity

```ts
const api_delete_agent_api_key_output = client.ApiDeleteAgentApiKeyOutput()
```

### Actions

This entity exposes custom API actions in addition to the standard
operations. Select one with `$action` in the call's argument; the
remaining keys are sent as that action's payload.

| Action | Route | Call |
| --- | --- | --- |
| `regenerate` | `/v2/gen-ai/agents/{agent_uuid}/api_keys/{api_key_uuid}/regenerate` | `client.ApiDeleteAgentApiKeyOutput().update({ $action: 'regenerate', ... })` |

An action returns that action's OWN response, which is not necessarily a
ApiDeleteAgentApiKeyOutput record — check the API definition for its shape.

```ts
const result = await client.ApiDeleteAgentApiKeyOutput().update({
  $action: 'regenerate',
  /* ...the action's own arguments */
})
```

### Operations

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria.

```ts
const result = await client.ApiDeleteAgentApiKeyOutput().remove({ agent_id: 'agent_id', api_key_uuid: 'api_key_uuid' })
```

#### `update(data: object, ctrl?: object)`

Update an existing entity. The data must include the entity `id`.

```ts
const result = await client.ApiDeleteAgentApiKeyOutput().update({
  agent_id: 'agent_id',
  api_key_uuid: 'api_key_uuid',
  // Fields to update
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ApiDeleteAgentApiKeyOutputEntity` instance with the same client and
options.

#### `client()`

Return the parent `DigitaloceanSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ApiDeleteAgentOutputEntity

```ts
const api_delete_agent_output = client.ApiDeleteAgentOutput()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `anthropic_api_key` | `Record<string, any>` | No | Anthropic API Key Info |
| `anthropic_key_uuid` | `string` | No | Optional Anthropic API key ID to use with Anthropic models |
| `api_key_infos` | `any[]` | No | Api key infos |
| `api_keys` | `any[]` | No | Api keys |
| `chatbot` | `Record<string, any>` | No | A Chatbot |
| `chatbot_identifiers` | `any[]` | No | Chatbot identifiers |
| `child_agents` | `any[]` | No | Child agents |
| `conversation_logs_enabled` | `boolean` | No | Whether conversation logs are enabled for the agent |
| `created_at` | `string` | No | Creation date / time |
| `deployment` | `Record<string, any>` | No | Description of deployment |
| `description` | `string` | No | Description of agent |
| `functions` | `any[]` | No |  |
| `guardrails` | `any[]` | No | The guardrails the agent is attached to |
| `if_case` | `string` | No | Instructions to the agent on how to use the route |
| `instruction` | `string` | No | Agent instruction. |
| `k` | `number` | No | How many results should be considered from an attached knowledge base |
| `knowledge_base_uuid` | `any[]` | No | Ids of the knowledge base(s) to attach to the agent |
| `knowledge_bases` | `any[]` | No | Knowledge bases |
| `logging_config` | `Record<string, any>` | No |  |
| `max_tokens` | `number` | No | Specifies the maximum number of tokens the model can process in a single input or output, set as a number between 1 and 512. |
| `mcp_servers` | `any[]` | No | MCP (Model Context Protocol) servers attached to this agent |
| `model` | `Record<string, any>` | No | Description of a Model |
| `model_provider_key` | `Record<string, any>` | No |  |
| `model_provider_key_uuid` | `string` | No |  |
| `model_router` | `Record<string, any>` | No | Model router |
| `model_router_uuid` | `string` | No |  |
| `model_uuid` | `string` | No | Identifier for the foundation model. |
| `name` | `string` | No | Agent name |
| `open_ai_key_uuid` | `string` | No | Optional OpenAI API key ID to use with OpenAI models |
| `openai_api_key` | `Record<string, any>` | No | OpenAI API Key Info |
| `parent_agents` | `any[]` | No | Parent agents |
| `project_id` | `string` | No | The id of the DigitalOcean project this agent will belong to |
| `provide_citations` | `boolean` | No | Whether the agent should provide in-response citations |
| `reasoning_effort` | `string` | No | The reasoning effort for the agent |
| `region` | `string` | No | Region code |
| `retrieval_method` | `string` | No | - RETRIEVAL_METHOD_UNKNOWN: The retrieval method is unknown - RETRIEVAL_METHOD_REWRITE: The retrieval method is rewrite - RETRIEVAL_METHOD_STEP_BACK: The retrieval method is step back - RETRIEVAL_METHOD_SUB_QUERIES: The retrieval method is… |
| `route_created_at` | `string` | No | Creation of route date / time |
| `route_created_by` | `string` | No | Id of user that created the route |
| `route_name` | `string` | No | Route name |
| `route_uuid` | `string` | No | Route uuid |
| `router_preset_slug` | `string` | No |  |
| `tags` | `any[]` | No | Agent tag to organize related resources |
| `temperature` | `number` | No | Controls the model’s creativity, specified as a number between 0 and 1. |
| `template` | `Record<string, any>` | No | Represents an AgentTemplate entity |
| `thinking_token_budget` | `number` | No | The thinking token budget for Anthropic extended thinking (0 = disabled) |
| `top_p` | `number` | No | Defines the cumulative probability threshold for word selection, specified as a number between 0 and 1. |
| `updated_at` | `string` | No | Last modified |
| `url` | `string` | No | Access your agent under this url |
| `user_id` | `string` | No | Id of user that created the agent |
| `uuid` | `string` | No | Unique agent id |
| `version_hash` | `string` | No | The latest version of the agent |
| `vpc_egress_ips` | `any[]` | No | VPC Egress IPs |
| `vpc_uuid` | `string` | No |  |
| `web_fetch_enabled` | `boolean` | No | Whether this agent can use the built-in web_fetch tool. |
| `web_search_enabled` | `boolean` | No | Whether this agent can use the built-in web_search tool. |
| `workspace` | `Record<string, any>` | No |  |
| `workspace_uuid` | `string` | No | Identifier for the workspace |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.ApiDeleteAgentOutput().create({
})
```

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.ApiDeleteAgentOutput().list()
```

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria.

```ts
const result = await client.ApiDeleteAgentOutput().remove({ uuid: 'uuid' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ApiDeleteAgentOutputEntity` instance with the same client and
options.

#### `client()`

Return the parent `DigitaloceanSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ApiDeleteAnthropicApiKeyOutputEntity

```ts
const api_delete_anthropic_api_key_output = client.ApiDeleteAnthropicApiKeyOutput()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `api_key` | `string` | No | Anthropic API key |
| `created_at` | `string` | No | Key creation date |
| `created_by` | `string` | No | Created by user id from DO |
| `deleted_at` | `string` | No | Key deleted date |
| `name` | `string` | No | Name |
| `updated_at` | `string` | No | Key last updated date |
| `uuid` | `string` | No | Uuid |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.ApiDeleteAnthropicApiKeyOutput().create({
})
```

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.ApiDeleteAnthropicApiKeyOutput().list()
```

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria.

```ts
const result = await client.ApiDeleteAnthropicApiKeyOutput().remove({ api_key_uuid: 'api_key_uuid' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ApiDeleteAnthropicApiKeyOutputEntity` instance with the same client and
options.

#### `client()`

Return the parent `DigitaloceanSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ApiDeleteCustomEvaluationMetricOutputEntity

```ts
const api_delete_custom_evaluation_metric_output = client.ApiDeleteCustomEvaluationMetricOutput()
```

### Operations

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria.

```ts
const result = await client.ApiDeleteCustomEvaluationMetricOutput().remove({ metric_uuid: 'metric_uuid' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ApiDeleteCustomEvaluationMetricOutputEntity` instance with the same client and
options.

#### `client()`

Return the parent `DigitaloceanSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ApiDeleteCustomModelOutputPublicEntity

```ts
const api_delete_custom_model_output_public = client.ApiDeleteCustomModelOutputPublic()
```

### Operations

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria.

```ts
const result = await client.ApiDeleteCustomModelOutputPublic().remove({ uuid: 'uuid' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ApiDeleteCustomModelOutputPublicEntity` instance with the same client and
options.

#### `client()`

Return the parent `DigitaloceanSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ApiDeleteEvaluationDatasetOutputEntity

```ts
const api_delete_evaluation_dataset_output = client.ApiDeleteEvaluationDatasetOutput()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `created_at` | `string` | No | Time created at. |
| `dataset_name` | `string` | No | Name of the dataset. |
| `dataset_paradigm` | `string` | No | EvaluationDatasetParadigm is the row/content shape of a dataset, orthogonal to the surface in EvaluationDatasetType (e.g. |
| `dataset_type` | `string` | No |  |
| `dataset_uuid` | `string` | No | UUID of the dataset. |
| `evaluation_dataset_uuid` | `string` | No | Evaluation dataset uuid. |
| `file_size` | `string` | No | The size of the dataset uploaded file in bytes. |
| `file_upload_dataset` | `Record<string, any>` | No | File to upload as data source for knowledge base. |
| `has_ground_truth` | `boolean` | No | Does the dataset have a ground truth column? |
| `name` | `string` | No | The name of the agent evaluation dataset. |
| `row_count` | `number` | No | Number of rows in the dataset. |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.ApiDeleteEvaluationDatasetOutput().create({
})
```

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.ApiDeleteEvaluationDatasetOutput().list()
```

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria.

```ts
const result = await client.ApiDeleteEvaluationDatasetOutput().remove({ dataset_uuid: 'dataset_uuid' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ApiDeleteEvaluationDatasetOutputEntity` instance with the same client and
options.

#### `client()`

Return the parent `DigitaloceanSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ApiDeleteKnowledgeBaseDataSourceOutputEntity

```ts
const api_delete_knowledge_base_data_source_output = client.ApiDeleteKnowledgeBaseDataSourceOutput()
```

### Operations

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria.

```ts
const result = await client.ApiDeleteKnowledgeBaseDataSourceOutput().remove({ data_source_uuid: 'data_source_uuid', knowledge_base_id: 'knowledge_base_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ApiDeleteKnowledgeBaseDataSourceOutputEntity` instance with the same client and
options.

#### `client()`

Return the parent `DigitaloceanSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ApiDeleteKnowledgeBaseOutputEntity

```ts
const api_delete_knowledge_base_output = client.ApiDeleteKnowledgeBaseOutput()
```

### Operations

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria.

```ts
const result = await client.ApiDeleteKnowledgeBaseOutput().remove({ uuid: 'uuid' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ApiDeleteKnowledgeBaseOutputEntity` instance with the same client and
options.

#### `client()`

Return the parent `DigitaloceanSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ApiDeleteModelApiKeyOutputEntity

```ts
const api_delete_model_api_key_output = client.ApiDeleteModelApiKeyOutput()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `created_at` | `string` | No | Creation date |
| `created_by` | `string` | No | Created by |
| `deleted_at` | `string` | No | Deleted date |
| `name` | `string` | No | A human friendly name to identify the key |
| `secret_key` | `string` | No |  |
| `uuid` | `string` | No | Uuid |

### Actions

This entity exposes custom API actions in addition to the standard
operations. Select one with `$action` in the call's argument; the
remaining keys are sent as that action's payload.

| Action | Route | Call |
| --- | --- | --- |
| `regenerate` | `/v2/gen-ai/models/api_keys/{api_key_uuid}/regenerate` | `client.ApiDeleteModelApiKeyOutput().update({ $action: 'regenerate', ... })` |

An action returns that action's OWN response, which is not necessarily a
ApiDeleteModelApiKeyOutput record — check the API definition for its shape.

```ts
const result = await client.ApiDeleteModelApiKeyOutput().update({
  $action: 'regenerate',
  /* ...the action's own arguments */
})
```

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.ApiDeleteModelApiKeyOutput().create({
})
```

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.ApiDeleteModelApiKeyOutput().list()
```

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria.

```ts
const result = await client.ApiDeleteModelApiKeyOutput().remove({ api_key_uuid: 'api_key_uuid' })
```

#### `update(data: object, ctrl?: object)`

Update an existing entity. The data must include the entity `id`.

```ts
const result = await client.ApiDeleteModelApiKeyOutput().update({
  api_key_uuid: 'api_key_uuid',
  // Fields to update
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ApiDeleteModelApiKeyOutputEntity` instance with the same client and
options.

#### `client()`

Return the parent `DigitaloceanSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ApiDeleteModelEvaluationPresetOutputEntity

```ts
const api_delete_model_evaluation_preset_output = client.ApiDeleteModelEvaluationPresetOutput()
```

### Operations

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria.

```ts
const result = await client.ApiDeleteModelEvaluationPresetOutput().remove({ eval_preset_uuid: 'eval_preset_uuid' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ApiDeleteModelEvaluationPresetOutputEntity` instance with the same client and
options.

#### `client()`

Return the parent `DigitaloceanSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ApiDeleteModelEvaluationRunOutputPublicEntity

```ts
const api_delete_model_evaluation_run_output_public = client.ApiDeleteModelEvaluationRunOutputPublic()
```

### Operations

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria.

```ts
const result = await client.ApiDeleteModelEvaluationRunOutputPublic().remove({ eval_run_uuid: 'eval_run_uuid' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ApiDeleteModelEvaluationRunOutputPublicEntity` instance with the same client and
options.

#### `client()`

Return the parent `DigitaloceanSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ApiDeleteModelRouterOutputEntity

```ts
const api_delete_model_router_output = client.ApiDeleteModelRouterOutput()
```

### Operations

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria.

```ts
const result = await client.ApiDeleteModelRouterOutput().remove({ uuid: 'uuid' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ApiDeleteModelRouterOutputEntity` instance with the same client and
options.

#### `client()`

Return the parent `DigitaloceanSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ApiDeleteOpenAiapiKeyOutputEntity

```ts
const api_delete_open_aiapi_key_output = client.ApiDeleteOpenAiapiKeyOutput()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `api_key` | `string` | No | OpenAI API key |
| `created_at` | `string` | No | Key creation date |
| `created_by` | `string` | No | Created by user id from DO |
| `deleted_at` | `string` | No | Key deleted date |
| `models` | `any[]` | No | Models supported by the openAI api key |
| `name` | `string` | No | Name |
| `updated_at` | `string` | No | Key last updated date |
| `uuid` | `string` | No | Uuid |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.ApiDeleteOpenAiapiKeyOutput().create({
})
```

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.ApiDeleteOpenAiapiKeyOutput().list()
```

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria.

```ts
const result = await client.ApiDeleteOpenAiapiKeyOutput().remove({ api_key_uuid: 'api_key_uuid' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ApiDeleteOpenAiapiKeyOutputEntity` instance with the same client and
options.

#### `client()`

Return the parent `DigitaloceanSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ApiDeleteScenarioSetOutputEntity

```ts
const api_delete_scenario_set_output = client.ApiDeleteScenarioSetOutput()
```

### Operations

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria.

```ts
const result = await client.ApiDeleteScenarioSetOutput().remove({ scenario_set_uuid: 'scenario_set_uuid' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ApiDeleteScenarioSetOutputEntity` instance with the same client and
options.

#### `client()`

Return the parent `DigitaloceanSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ApiDeleteScheduledIndexingOutputEntity

```ts
const api_delete_scheduled_indexing_output = client.ApiDeleteScheduledIndexingOutput()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `created_at` | `string` | No | Created at timestamp |
| `days` | `any[]` | No | Days for execution (day is represented same as in a cron expression, e.g. |
| `deleted_at` | `string` | No | Deleted at timestamp (if soft deleted) |
| `is_active` | `boolean` | No | Whether the schedule is currently active |
| `knowledge_base_uuid` | `string` | No | Knowledge base uuid associated with this schedule |
| `last_ran_at` | `string` | No | Last time the schedule was executed |
| `next_run_at` | `string` | No | Next scheduled run |
| `time` | `string` | No | Scheduled time of execution (HH:MM:SS format) |
| `updated_at` | `string` | No | Updated at timestamp |
| `uuid` | `string` | No | Unique identifier for the scheduled indexing entry |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.ApiDeleteScheduledIndexingOutput().create({
})
```

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria.

```ts
const result = await client.ApiDeleteScheduledIndexingOutput().remove({ uuid: 'uuid' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ApiDeleteScheduledIndexingOutputEntity` instance with the same client and
options.

#### `client()`

Return the parent `DigitaloceanSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ApiDeleteSimulationRunOutputEntity

```ts
const api_delete_simulation_run_output = client.ApiDeleteSimulationRunOutput()
```

### Operations

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria.

```ts
const result = await client.ApiDeleteSimulationRunOutput().remove({ run_uuid: 'run_uuid' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ApiDeleteSimulationRunOutputEntity` instance with the same client and
options.

#### `client()`

Return the parent `DigitaloceanSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ApiDeleteWorkspaceOutputEntity

```ts
const api_delete_workspace_output = client.ApiDeleteWorkspaceOutput()
```

### Operations

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria.

```ts
const result = await client.ApiDeleteWorkspaceOutput().remove({ workspace_uuid: 'workspace_uuid' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ApiDeleteWorkspaceOutputEntity` instance with the same client and
options.

#### `client()`

Return the parent `DigitaloceanSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ApiDropboxOauth2GetTokensOutputEntity

```ts
const api_dropbox_oauth2_get_tokens_output = client.ApiDropboxOauth2GetTokensOutput()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `code` | `string` | No | The oauth2 code from google |
| `redirect_url` | `string` | No | Redirect url |
| `refresh_token` | `string` | No | The refresh token |
| `token` | `string` | No | The access token |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.ApiDropboxOauth2GetTokensOutput().create({
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ApiDropboxOauth2GetTokensOutputEntity` instance with the same client and
options.

#### `client()`

Return the parent `DigitaloceanSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ApiGenerateOauth2UrlOutputEntity

```ts
const api_generate_oauth2_url_output = client.ApiGenerateOauth2UrlOutput()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `url` | `string` | No | The oauth2 url |

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.ApiGenerateOauth2UrlOutput().load()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ApiGenerateOauth2UrlOutputEntity` instance with the same client and
options.

#### `client()`

Return the parent `DigitaloceanSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ApiGenerateScenarioSetOutputEntity

```ts
const api_generate_scenario_set_output = client.ApiGenerateScenarioSetOutput()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `bucket_name` | `string` | No | Object storage bucket holding the scenario file. |
| `bucket_region` | `string` | No | Object storage bucket region. |
| `created_at` | `string` | No | Time created at. |
| `deleted_at` | `string` | No | Time deleted at. |
| `description` | `string` | No | Customer-supplied description. |
| `failure_reason` | `string` | No | Human-readable explanation of a terminal FAILED status. |
| `generator_model_uuid` | `string` | No | Model that produced the scenarios. |
| `goal_description` | `string` | No | The goal that drives scenario generation. |
| `library_scenario_uuid` | `string` | No | UUID of the source library entry. |
| `name` | `string` | No | Customer-supplied name. |
| `num_scenarios` | `number` | No | Number of scenarios to generate. |
| `scenario_count` | `number` | No | Number of scenarios in the set. |
| `scenario_set_uuid` | `string` | No | UUID of the scenario set. |
| `source_export_id` | `string` | No | Signals export UUID that produced this set. |
| `source_goal_description` | `string` | No | The goal that drove generation. |
| `source_kind` | `string` | No | How a scenario set was created. |
| `spaces_key` | `string` | No | Object storage key for the scenario file. |
| `status` | `string` | No | Lifecycle status of a scenario set. |
| `updated_at` | `string` | No | Time last updated at. |
| `workflow_uuid` | `string` | No | Identifier of the generation workflow. |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.ApiGenerateScenarioSetOutput().create({
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ApiGenerateScenarioSetOutputEntity` instance with the same client and
options.

#### `client()`

Return the parent `DigitaloceanSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ApiGetAgentOutputEntity

```ts
const api_get_agent_output = client.ApiGetAgentOutput()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `anthropic_api_key` | `Record<string, any>` | No | Anthropic API Key Info |
| `api_key_infos` | `any[]` | No | Api key infos |
| `api_keys` | `any[]` | No | Api keys |
| `chatbot` | `Record<string, any>` | No | A Chatbot |
| `chatbot_identifiers` | `any[]` | No | Chatbot identifiers |
| `child_agents` | `any[]` | No | Child agents |
| `conversation_logs_enabled` | `boolean` | No | Whether conversation logs are enabled for the agent |
| `created_at` | `string` | No | Creation date / time |
| `deployment` | `Record<string, any>` | No | Description of deployment |
| `description` | `string` | No | Description of agent |
| `functions` | `any[]` | No |  |
| `guardrails` | `any[]` | No | The guardrails the agent is attached to |
| `if_case` | `string` | No |  |
| `instruction` | `string` | No | Agent instruction. |
| `k` | `number` | No |  |
| `knowledge_bases` | `any[]` | No | Knowledge bases |
| `logging_config` | `Record<string, any>` | No |  |
| `max_tokens` | `number` | No |  |
| `mcp_servers` | `any[]` | No | MCP (Model Context Protocol) servers attached to this agent |
| `model` | `Record<string, any>` | No | Description of a Model |
| `model_provider_key` | `Record<string, any>` | No |  |
| `model_router` | `Record<string, any>` | No | Model router |
| `name` | `string` | No | Agent name |
| `openai_api_key` | `Record<string, any>` | No | OpenAI API Key Info |
| `parent_agents` | `any[]` | No | Parent agents |
| `project_id` | `string` | No |  |
| `provide_citations` | `boolean` | No | Whether the agent should provide in-response citations |
| `reasoning_effort` | `string` | No | The reasoning effort for the agent |
| `region` | `string` | No | Region code |
| `retrieval_method` | `string` | No | - RETRIEVAL_METHOD_UNKNOWN: The retrieval method is unknown - RETRIEVAL_METHOD_REWRITE: The retrieval method is rewrite - RETRIEVAL_METHOD_STEP_BACK: The retrieval method is step back - RETRIEVAL_METHOD_SUB_QUERIES: The retrieval method is… |
| `route_created_at` | `string` | No | Creation of route date / time |
| `route_created_by` | `string` | No |  |
| `route_name` | `string` | No | Route name |
| `route_uuid` | `string` | No |  |
| `tags` | `any[]` | No | Agent tag to organize related resources |
| `temperature` | `number` | No |  |
| `template` | `Record<string, any>` | No | Represents an AgentTemplate entity |
| `thinking_token_budget` | `number` | No | The thinking token budget for Anthropic extended thinking (0 = disabled) |
| `top_p` | `number` | No |  |
| `updated_at` | `string` | No | Last modified |
| `url` | `string` | No | Access your agent under this url |
| `user_id` | `string` | No | Id of user that created the agent |
| `uuid` | `string` | No | Unique agent id |
| `version_hash` | `string` | No | The latest version of the agent |
| `vpc_egress_ips` | `any[]` | No | VPC Egress IPs |
| `vpc_uuid` | `string` | No |  |
| `web_fetch_enabled` | `boolean` | No | Whether this agent can use the built-in web_fetch tool. |
| `web_search_enabled` | `boolean` | No | Whether this agent can use the built-in web_search tool. |
| `workspace` | `Record<string, any>` | No |  |

### Actions

This entity exposes custom API actions in addition to the standard
operations. Select one with `$action` in the call's argument; the
remaining keys are sent as that action's payload.

| Action | Route | Call |
| --- | --- | --- |
| `deployment_visibility` | `/v2/gen-ai/agents/{uuid}/deployment_visibility` | `client.ApiGetAgentOutput().update({ $action: 'deployment_visibility', ... })` |

An action returns that action's OWN response, which is not necessarily a
ApiGetAgentOutput record — check the API definition for its shape.

```ts
const result = await client.ApiGetAgentOutput().update({
  $action: 'deployment_visibility',
  /* ...the action's own arguments */
})
```

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.ApiGetAgentOutput().load({ uuid: 'uuid' })
```

#### `update(data: object, ctrl?: object)`

Update an existing entity. The data must include the entity `id`.

```ts
const result = await client.ApiGetAgentOutput().update({
  uuid: 'uuid',
  // Fields to update
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ApiGetAgentOutputEntity` instance with the same client and
options.

#### `client()`

Return the parent `DigitaloceanSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ApiGetAgentUsageOutputEntity

```ts
const api_get_agent_usage_output = client.ApiGetAgentUsageOutput()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `log_insights_usage` | `Record<string, any>` | No | Resource Usage Description |
| `usage` | `Record<string, any>` | No | Resource Usage Description |

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.ApiGetAgentUsageOutput().load({ agent_id: 'agent_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ApiGetAgentUsageOutputEntity` instance with the same client and
options.

#### `client()`

Return the parent `DigitaloceanSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ApiGetAnthropicApiKeyOutputEntity

```ts
const api_get_anthropic_api_key_output = client.ApiGetAnthropicApiKeyOutput()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `created_at` | `string` | No | Key creation date |
| `created_by` | `string` | No | Created by user id from DO |
| `deleted_at` | `string` | No | Key deleted date |
| `name` | `string` | No | Name |
| `updated_at` | `string` | No | Key last updated date |
| `uuid` | `string` | No | Uuid |

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.ApiGetAnthropicApiKeyOutput().load({ api_key_uuid: 'api_key_uuid' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ApiGetAnthropicApiKeyOutputEntity` instance with the same client and
options.

#### `client()`

Return the parent `DigitaloceanSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ApiGetChildrenOutputEntity

```ts
const api_get_children_output = client.ApiGetChildrenOutput()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `anthropic_api_key` | `Record<string, any>` | No | Anthropic API Key Info |
| `api_key_infos` | `any[]` | No | Api key infos |
| `api_keys` | `any[]` | No | Api keys |
| `chatbot` | `Record<string, any>` | No | A Chatbot |
| `chatbot_identifiers` | `any[]` | No | Chatbot identifiers |
| `child_agents` | `any[]` | No | Child agents |
| `conversation_logs_enabled` | `boolean` | No | Whether conversation logs are enabled for the agent |
| `created_at` | `string` | No | Creation date / time |
| `deployment` | `Record<string, any>` | No | Description of deployment |
| `description` | `string` | No | Description of agent |
| `functions` | `any[]` | No |  |
| `guardrails` | `any[]` | No | The guardrails the agent is attached to |
| `if_case` | `string` | No |  |
| `instruction` | `string` | No | Agent instruction. |
| `k` | `number` | No |  |
| `knowledge_bases` | `any[]` | No | Knowledge bases |
| `logging_config` | `Record<string, any>` | No |  |
| `max_tokens` | `number` | No |  |
| `mcp_servers` | `any[]` | No | MCP (Model Context Protocol) servers attached to this agent |
| `model` | `Record<string, any>` | No | Description of a Model |
| `model_provider_key` | `Record<string, any>` | No |  |
| `model_router` | `Record<string, any>` | No | Model router |
| `name` | `string` | No | Agent name |
| `openai_api_key` | `Record<string, any>` | No | OpenAI API Key Info |
| `parent_agents` | `any[]` | No | Parent agents |
| `project_id` | `string` | No |  |
| `provide_citations` | `boolean` | No | Whether the agent should provide in-response citations |
| `reasoning_effort` | `string` | No | The reasoning effort for the agent |
| `region` | `string` | No | Region code |
| `retrieval_method` | `string` | No | - RETRIEVAL_METHOD_UNKNOWN: The retrieval method is unknown - RETRIEVAL_METHOD_REWRITE: The retrieval method is rewrite - RETRIEVAL_METHOD_STEP_BACK: The retrieval method is step back - RETRIEVAL_METHOD_SUB_QUERIES: The retrieval method is… |
| `route_created_at` | `string` | No | Creation of route date / time |
| `route_created_by` | `string` | No |  |
| `route_name` | `string` | No | Route name |
| `route_uuid` | `string` | No |  |
| `tags` | `any[]` | No | Agent tag to organize related resources |
| `temperature` | `number` | No |  |
| `template` | `Record<string, any>` | No | Represents an AgentTemplate entity |
| `thinking_token_budget` | `number` | No | The thinking token budget for Anthropic extended thinking (0 = disabled) |
| `top_p` | `number` | No |  |
| `updated_at` | `string` | No | Last modified |
| `url` | `string` | No | Access your agent under this url |
| `user_id` | `string` | No | Id of user that created the agent |
| `uuid` | `string` | No | Unique agent id |
| `version_hash` | `string` | No | The latest version of the agent |
| `vpc_egress_ips` | `any[]` | No | VPC Egress IPs |
| `vpc_uuid` | `string` | No |  |
| `web_fetch_enabled` | `boolean` | No | Whether this agent can use the built-in web_fetch tool. |
| `web_search_enabled` | `boolean` | No | Whether this agent can use the built-in web_search tool. |
| `workspace` | `Record<string, any>` | No |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.ApiGetChildrenOutput().list({ agent_id: "example" })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ApiGetChildrenOutputEntity` instance with the same client and
options.

#### `client()`

Return the parent `DigitaloceanSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ApiGetCustomModelOutputPublicEntity

```ts
const api_get_custom_model_output_public = client.ApiGetCustomModelOutputPublic()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `active_deployments` | `any[]` | No | List of active deployments using this model |
| `architecture` | `string` | No | Model architecture type (free-form string from config.json) |
| `config_json` | `Record<string, any>` | No | Raw config.json contents from the model repository |
| `context_length` | `number` | No | Maximum context length supported by the model |
| `cost_estimate_per_month` | `number` | No | Estimated monthly cost in dollars for hosting |
| `created_at` | `string` | No | Timestamp when the model was created |
| `description` | `string` | No | Description of the custom model |
| `error_message` | `string` | No | User-facing reason the most recent import failed; empty otherwise. |
| `file_count` | `number` | No | Number of files in the model |
| `input_modalities` | `any[]` | No | Input modalities supported (e.g., text, image) |
| `license` | `string` | No | License under which the model is distributed |
| `name` | `string` | No | Name of the custom model |
| `output_modalities` | `any[]` | No | Output modalities supported (e.g., text, image) |
| `parameters` | `string` | No | Number of parameters in the model |
| `source_ref` | `Record<string, any>` | No | Reference to the original source of the model |
| `source_type` | `string` | No | Source from which the model was imported |
| `status` | `string` | No | Import and deployment status of the custom model |
| `storage_region` | `string` | No | Region of the Spaces bucket where model files are stored |
| `tags` | `Record<string, any>` | No | User-defined tags for organizing models |
| `team_id` | `string` | No | Team that owns the model |
| `total_size_bytes` | `string` | No | Total size of model files in bytes |
| `updated_at` | `string` | No | Timestamp when the model was last updated |
| `uuid` | `string` | No | Unique identifier for the custom model |

### Actions

This entity exposes custom API actions in addition to the standard
operations. Select one with `$action` in the call's argument; the
remaining keys are sent as that action's payload.

| Action | Route | Call |
| --- | --- | --- |
| `metadata` | `/v2/gen-ai/custom_models/{uuid}/metadata` | `client.ApiGetCustomModelOutputPublic().update({ $action: 'metadata', ... })` |

An action returns that action's OWN response, which is not necessarily a
ApiGetCustomModelOutputPublic record — check the API definition for its shape.

```ts
const result = await client.ApiGetCustomModelOutputPublic().update({
  $action: 'metadata',
  /* ...the action's own arguments */
})
```

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.ApiGetCustomModelOutputPublic().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.ApiGetCustomModelOutputPublic().load({ uuid: 'uuid' })
```

#### `update(data: object, ctrl?: object)`

Update an existing entity. The data must include the entity `id`.

```ts
const result = await client.ApiGetCustomModelOutputPublic().update({
  uuid: 'uuid',
  // Fields to update
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ApiGetCustomModelOutputPublicEntity` instance with the same client and
options.

#### `client()`

Return the parent `DigitaloceanSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ApiGetEvaluationDatasetDownloadUrlOutputEntity

```ts
const api_get_evaluation_dataset_download_url_output = client.ApiGetEvaluationDatasetDownloadUrlOutput()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `download_url` | `string` | No | The presigned URL to download the dataset file. |
| `expires_at` | `string` | No | The time the URL expires at. |

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.ApiGetEvaluationDatasetDownloadUrlOutput().load({ evaluation_dataset_id: 'evaluation_dataset_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ApiGetEvaluationDatasetDownloadUrlOutputEntity` instance with the same client and
options.

#### `client()`

Return the parent `DigitaloceanSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ApiGetEvaluationRunOutputEntity

```ts
const api_get_evaluation_run_output = client.ApiGetEvaluationRunOutput()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `agent_deleted` | `boolean` | No | Whether agent is deleted |
| `agent_deployment_name` | `string` | No | The agent deployment name |
| `agent_deployment_names` | `any[]` | No | Agent deployment names to run the test case against. |
| `agent_name` | `string` | No | Agent name |
| `agent_uuid` | `string` | No | Agent UUID. |
| `agent_uuids` | `any[]` | No | Agent UUIDs to run the test case against (legacy agents). |
| `agent_version_hash` | `string` | No | Version hash |
| `agent_workspace_uuid` | `string` | No | Agent workspace uuid |
| `created_by_user_email` | `string` | No |  |
| `created_by_user_id` | `string` | No |  |
| `error_description` | `string` | No | The error description |
| `evaluation_run_uuid` | `string` | No | Evaluation run UUID. |
| `evaluation_run_uuids` | `any[]` | No |  |
| `evaluation_test_case_workspace_uuid` | `string` | No | Evaluation test case workspace uuid |
| `finished_at` | `string` | No | Run end time. |
| `pass_status` | `boolean` | No | The pass status of the evaluation run based on the star metric. |
| `queued_at` | `string` | No | Run queued time. |
| `run_level_metric_results` | `any[]` | No |  |
| `run_name` | `string` | No | Run name. |
| `star_metric_result` | `Record<string, any>` | No |  |
| `started_at` | `string` | No | Run start time. |
| `status` | `string` | No | Evaluation Run Statuses |
| `test_case_description` | `string` | No | Test case description. |
| `test_case_name` | `string` | No | Test case name. |
| `test_case_uuid` | `string` | No | Test-case UUID. |
| `test_case_version` | `number` | No | Test-case-version. |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.ApiGetEvaluationRunOutput().create({
})
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.ApiGetEvaluationRunOutput().load({ evaluation_run_uuid: 'evaluation_run_uuid' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ApiGetEvaluationRunOutputEntity` instance with the same client and
options.

#### `client()`

Return the parent `DigitaloceanSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ApiGetEvaluationRunResultsOutputEntity

```ts
const api_get_evaluation_run_results_output = client.ApiGetEvaluationRunResultsOutput()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `evaluation_trace_spans` | `any[]` | No | The evaluated trace spans. |
| `ground_truth` | `string` | No | The ground truth for the prompt. |
| `input` | `string` | No |  |
| `input_tokens` | `string` | No | The number of input tokens used in the prompt. |
| `output` | `string` | No |  |
| `output_tokens` | `string` | No | The number of output tokens used in the prompt. |
| `prompt_chunks` | `any[]` | No | The list of prompt chunks. |
| `prompt_id` | `number` | No | Prompt ID |
| `prompt_level_metric_results` | `any[]` | No | The metric results for the prompt. |
| `trace_id` | `string` | No | The trace id for the prompt. |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.ApiGetEvaluationRunResultsOutput().list({ evaluation_run_id: "example" })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ApiGetEvaluationRunResultsOutputEntity` instance with the same client and
options.

#### `client()`

Return the parent `DigitaloceanSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ApiGetEvaluationTestCaseOutputEntity

```ts
const api_get_evaluation_test_case_output = client.ApiGetEvaluationTestCaseOutput()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `agent_workspace_name` | `string` | No |  |
| `archived_at` | `string` | No |  |
| `created_at` | `string` | No |  |
| `created_by_user_email` | `string` | No |  |
| `created_by_user_id` | `string` | No |  |
| `dataset` | `Record<string, any>` | No |  |
| `dataset_name` | `string` | No |  |
| `dataset_uuid` | `string` | No | Dataset against which the test‑case is executed. |
| `description` | `string` | No | Description of the test case. |
| `latest_version_number_of_runs` | `number` | No |  |
| `metrics` | `any[]` | No | Full metric list to use for evaluation test case. |
| `name` | `string` | No | Name of the test case. |
| `star_metric` | `Record<string, any>` | No |  |
| `test_case_uuid` | `string` | No | Test‑case UUID. |
| `total_runs` | `number` | No |  |
| `updated_at` | `string` | No |  |
| `updated_by_user_email` | `string` | No |  |
| `updated_by_user_id` | `string` | No |  |
| `version` | `number` | No |  |
| `workspace_uuid` | `string` | No | The workspace uuid. |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.ApiGetEvaluationTestCaseOutput().create({
})
```

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.ApiGetEvaluationTestCaseOutput().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.ApiGetEvaluationTestCaseOutput().load({ test_case_uuid: 'test_case_uuid' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ApiGetEvaluationTestCaseOutputEntity` instance with the same client and
options.

#### `client()`

Return the parent `DigitaloceanSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ApiGetIndexingJobDetailsSignedUrlOutputEntity

```ts
const api_get_indexing_job_details_signed_url_output = client.ApiGetIndexingJobDetailsSignedUrlOutput()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `signed_url` | `string` | No | The signed url for downloading the indexing job details |

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.ApiGetIndexingJobDetailsSignedUrlOutput().load({ indexing_job_id: 'indexing_job_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ApiGetIndexingJobDetailsSignedUrlOutputEntity` instance with the same client and
options.

#### `client()`

Return the parent `DigitaloceanSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ApiGetKnowledgeBaseIndexingJobOutputEntity

```ts
const api_get_knowledge_base_indexing_job_output = client.ApiGetKnowledgeBaseIndexingJobOutput()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `completed_datasources` | `number` | No | Number of datasources indexed completed |
| `created_at` | `string` | No | Creation date / time |
| `data_source_jobs` | `any[]` | No | Details on Data Sources included in the Indexing Job |
| `data_source_uuids` | `any[]` | No | List of data source ids to index, if none are provided, all data sources will be indexed |
| `finished_at` | `string` | No |  |
| `is_report_available` | `boolean` | No | Boolean value to determine if the indexing job details are available |
| `knowledge_base_uuid` | `string` | No | Knowledge base id |
| `phase` | `string` | No |  |
| `started_at` | `string` | No |  |
| `status` | `string` | No |  |
| `tokens` | `number` | No | Number of tokens [This field is deprecated] |
| `total_datasources` | `number` | No | Number of datasources being indexed |
| `total_tokens` | `string` | No | Total Tokens Consumed By the Indexing Job |
| `updated_at` | `string` | No | Last modified |
| `uuid` | `string` | No | Unique id |

### Actions

This entity exposes custom API actions in addition to the standard
operations. Select one with `$action` in the call's argument; the
remaining keys are sent as that action's payload.

| Action | Route | Call |
| --- | --- | --- |
| `cancel` | `/v2/gen-ai/indexing_jobs/{uuid}/cancel` | `client.ApiGetKnowledgeBaseIndexingJobOutput().update({ $action: 'cancel', ... })` |

An action returns that action's OWN response, which is not necessarily a
ApiGetKnowledgeBaseIndexingJobOutput record — check the API definition for its shape.

```ts
const result = await client.ApiGetKnowledgeBaseIndexingJobOutput().update({
  $action: 'cancel',
  /* ...the action's own arguments */
})
```

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.ApiGetKnowledgeBaseIndexingJobOutput().create({
})
```

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.ApiGetKnowledgeBaseIndexingJobOutput().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.ApiGetKnowledgeBaseIndexingJobOutput().load({ uuid: 'uuid' })
```

#### `update(data: object, ctrl?: object)`

Update an existing entity. The data must include the entity `id`.

```ts
const result = await client.ApiGetKnowledgeBaseIndexingJobOutput().update({
  uuid: 'uuid',
  // Fields to update
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ApiGetKnowledgeBaseIndexingJobOutputEntity` instance with the same client and
options.

#### `client()`

Return the parent `DigitaloceanSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ApiGetKnowledgeBaseOutputEntity

```ts
const api_get_knowledge_base_output = client.ApiGetKnowledgeBaseOutput()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `database_status` | `string` | No |  |
| `knowledge_base` | `Record<string, any>` | No | Knowledgebase Description |

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.ApiGetKnowledgeBaseOutput().load({ uuid: 'uuid' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ApiGetKnowledgeBaseOutputEntity` instance with the same client and
options.

#### `client()`

Return the parent `DigitaloceanSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ApiGetModelEvaluationRunOutputEntity

```ts
const api_get_model_evaluation_run_output = client.ApiGetModelEvaluationRunOutput()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `links` | `Record<string, any>` | No | Links to other pages |
| `meta` | `Record<string, any>` | No | Meta information about the data set |
| `results` | `any[]` | No | Paginated per-prompt evaluation results. |
| `run` | `Record<string, any>` | No | Model Evaluation Run Detail - full view returned when fetching a specific run. |

### Actions

This entity exposes custom API actions in addition to the standard
operations. Select one with `$action` in the call's argument; the
remaining keys are sent as that action's payload.

| Action | Route | Call |
| --- | --- | --- |
| `cancel` | `/v2/gen-ai/model_evaluation_runs/{eval_run_uuid}/cancel` | `client.ApiGetModelEvaluationRunOutput().update({ $action: 'cancel', ... })` |

An action returns that action's OWN response, which is not necessarily a
ApiGetModelEvaluationRunOutput record — check the API definition for its shape.

```ts
const result = await client.ApiGetModelEvaluationRunOutput().update({
  $action: 'cancel',
  /* ...the action's own arguments */
})
```

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.ApiGetModelEvaluationRunOutput().load({ eval_run_uuid: 'eval_run_uuid' })
```

#### `update(data: object, ctrl?: object)`

Update an existing entity. The data must include the entity `id`.

```ts
const result = await client.ApiGetModelEvaluationRunOutput().update({
  eval_run_uuid: 'eval_run_uuid',
  // Fields to update
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ApiGetModelEvaluationRunOutputEntity` instance with the same client and
options.

#### `client()`

Return the parent `DigitaloceanSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ApiGetModelEvaluationRunResultsDownloadUrlOutputEntity

```ts
const api_get_model_evaluation_run_results_download_url_output = client.ApiGetModelEvaluationRunResultsDownloadUrlOutput()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `download_url` | `string` | No | The presigned URL to download the gzip-compressed JSON results file (.json.gz). |
| `expires_at` | `string` | No | The time the URL expires at. |

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.ApiGetModelEvaluationRunResultsDownloadUrlOutput().load({ model_evaluation_run_id: 'model_evaluation_run_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ApiGetModelEvaluationRunResultsDownloadUrlOutputEntity` instance with the same client and
options.

#### `client()`

Return the parent `DigitaloceanSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ApiGetModelRouterOutputEntity

```ts
const api_get_model_router_output = client.ApiGetModelRouterOutput()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `config` | `Record<string, any>` | No |  |
| `created_at` | `string` | No | Creation date / time |
| `description` | `string` | No | Description |
| `fallback_models` | `any[]` | No | At least one fallback model is required; order defines failover priority |
| `name` | `string` | No | Name of the model router |
| `policies` | `any[]` | No | Router policies |
| `regions` | `any[]` | No | Target regions for the router |
| `updated_at` | `string` | No | Last modified |
| `uuid` | `string` | No | Unique id |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.ApiGetModelRouterOutput().create({
})
```

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.ApiGetModelRouterOutput().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.ApiGetModelRouterOutput().load({ uuid: 'uuid' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ApiGetModelRouterOutputEntity` instance with the same client and
options.

#### `client()`

Return the parent `DigitaloceanSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ApiGetOpenAiapiKeyOutputEntity

```ts
const api_get_open_aiapi_key_output = client.ApiGetOpenAiapiKeyOutput()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `created_at` | `string` | No | Key creation date |
| `created_by` | `string` | No | Created by user id from DO |
| `deleted_at` | `string` | No | Key deleted date |
| `models` | `any[]` | No | Models supported by the openAI api key |
| `name` | `string` | No | Name |
| `updated_at` | `string` | No | Key last updated date |
| `uuid` | `string` | No | Uuid |

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.ApiGetOpenAiapiKeyOutput().load({ api_key_uuid: 'api_key_uuid' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ApiGetOpenAiapiKeyOutputEntity` instance with the same client and
options.

#### `client()`

Return the parent `DigitaloceanSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ApiGetScenarioSetDownloadUrlOutputEntity

```ts
const api_get_scenario_set_download_url_output = client.ApiGetScenarioSetDownloadUrlOutput()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `download_url` | `string` | No | The presigned URL to download the scenario set file. |
| `expires_at` | `string` | No | The time the URL expires at. |

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.ApiGetScenarioSetDownloadUrlOutput().load({ scenario_set_id: 'scenario_set_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ApiGetScenarioSetDownloadUrlOutputEntity` instance with the same client and
options.

#### `client()`

Return the parent `DigitaloceanSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ApiGetScenarioSetOutputEntity

```ts
const api_get_scenario_set_output = client.ApiGetScenarioSetOutput()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `bucket_name` | `string` | No | Object storage bucket holding the scenario file. |
| `bucket_region` | `string` | No | Object storage bucket region. |
| `created_at` | `string` | No | Time created at. |
| `deleted_at` | `string` | No | Time deleted at. |
| `description` | `string` | No | Customer-supplied description. |
| `failure_reason` | `string` | No | Human-readable explanation of a terminal FAILED status. |
| `file_upload_scenario_set` | `any` | No | Uploaded scenario file to ingest. |
| `generator_model_uuid` | `string` | No | Model that produced the scenarios. |
| `library_scenario_uuid` | `string` | No | UUID of the source library entry. |
| `name` | `string` | No | Customer-supplied name. |
| `scenario_count` | `number` | No | Number of scenarios in the set. |
| `scenario_set_uuid` | `string` | No | UUID of the scenario set. |
| `scenarios` | `any[]` | No | Inline scenarios. |
| `source_export_id` | `string` | No | Signals export UUID that produced this set. |
| `source_goal_description` | `string` | No | The goal that drove generation. |
| `source_kind` | `string` | No | How a scenario set was created. |
| `spaces_key` | `string` | No | Object storage key for the scenario file. |
| `status` | `string` | No | Lifecycle status of a scenario set. |
| `updated_at` | `string` | No | Time last updated at. |
| `workflow_uuid` | `string` | No | Identifier of the generation workflow. |

### Actions

This entity exposes custom API actions in addition to the standard
operations. Select one with `$action` in the call's argument; the
remaining keys are sent as that action's payload.

| Action | Route | Call |
| --- | --- | --- |
| `duplicate` | `/v2/gen-ai/scenario_sets/{scenario_set_uuid}/duplicate` | `client.ApiGetScenarioSetOutput().create({ $action: 'duplicate', ... })` |

An action returns that action's OWN response, which is not necessarily a
ApiGetScenarioSetOutput record — check the API definition for its shape.

```ts
const result = await client.ApiGetScenarioSetOutput().create({
  $action: 'duplicate',
  /* ...the action's own arguments */
})
```

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.ApiGetScenarioSetOutput().create({
})
```

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.ApiGetScenarioSetOutput().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.ApiGetScenarioSetOutput().load({ scenario_set_uuid: 'scenario_set_uuid' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ApiGetScenarioSetOutputEntity` instance with the same client and
options.

#### `client()`

Return the parent `DigitaloceanSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ApiGetScheduledIndexingOutputEntity

```ts
const api_get_scheduled_indexing_output = client.ApiGetScheduledIndexingOutput()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `created_at` | `string` | No | Created at timestamp |
| `days` | `any[]` | No | Days for execution (day is represented same as in a cron expression, e.g. |
| `deleted_at` | `string` | No | Deleted at timestamp (if soft deleted) |
| `is_active` | `boolean` | No | Whether the schedule is currently active |
| `knowledge_base_uuid` | `string` | No | Knowledge base uuid associated with this schedule |
| `last_ran_at` | `string` | No | Last time the schedule was executed |
| `next_run_at` | `string` | No | Next scheduled run |
| `time` | `string` | No | Scheduled time of execution (HH:MM:SS format) |
| `updated_at` | `string` | No | Updated at timestamp |
| `uuid` | `string` | No | Unique identifier for the scheduled indexing entry |

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.ApiGetScheduledIndexingOutput().load({ knowledge_base_uuid: 'knowledge_base_uuid' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ApiGetScheduledIndexingOutputEntity` instance with the same client and
options.

#### `client()`

Return the parent `DigitaloceanSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ApiGetSimulationJourneyTrajectoryUrlOutputEntity

```ts
const api_get_simulation_journey_trajectory_url_output = client.ApiGetSimulationJourneyTrajectoryUrlOutput()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `download_url` | `string` | No | The presigned URL to download the trajectory JSON file. |
| `expires_at` | `string` | No | The time the URL expires at. |

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.ApiGetSimulationJourneyTrajectoryUrlOutput().load({ journey_id: 'journey_id', simulation_run_id: 'simulation_run_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ApiGetSimulationJourneyTrajectoryUrlOutputEntity` instance with the same client and
options.

#### `client()`

Return the parent `DigitaloceanSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ApiGetSimulationRunOutputEntity

```ts
const api_get_simulation_run_output = client.ApiGetSimulationRunOutput()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `scenario_results` | `any[]` | No | Per-scenario breakdown of journey outcomes, aggregated from journey rows. |
| `simulation_run` | `Record<string, any>` | No | One execution of a scenario set against a candidate agent. |

### Actions

This entity exposes custom API actions in addition to the standard
operations. Select one with `$action` in the call's argument; the
remaining keys are sent as that action's payload.

| Action | Route | Call |
| --- | --- | --- |
| `cancel` | `/v2/gen-ai/simulation_runs/{run_uuid}/cancel` | `client.ApiGetSimulationRunOutput().update({ $action: 'cancel', ... })` |

An action returns that action's OWN response, which is not necessarily a
ApiGetSimulationRunOutput record — check the API definition for its shape.

```ts
const result = await client.ApiGetSimulationRunOutput().update({
  $action: 'cancel',
  /* ...the action's own arguments */
})
```

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.ApiGetSimulationRunOutput().load({ run_uuid: 'run_uuid' })
```

#### `update(data: object, ctrl?: object)`

Update an existing entity. The data must include the entity `id`.

```ts
const result = await client.ApiGetSimulationRunOutput().update({
  run_uuid: 'run_uuid',
  // Fields to update
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ApiGetSimulationRunOutputEntity` instance with the same client and
options.

#### `client()`

Return the parent `DigitaloceanSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ApiGetWorkspaceOutputEntity

```ts
const api_get_workspace_output = client.ApiGetWorkspaceOutput()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `agent_uuids` | `any[]` | No | Ids of the agents(s) to attach to the workspace |
| `agents` | `any[]` | No | Agents |
| `created_at` | `string` | No | Creation date |
| `created_by` | `string` | No | The id of user who created this workspace |
| `created_by_email` | `string` | No | The email of the user who created this workspace |
| `deleted_at` | `string` | No | Deleted date |
| `description` | `string` | No | Description of the workspace |
| `evaluation_test_cases` | `any[]` | No | Evaluations |
| `name` | `string` | No | Name of the workspace |
| `updated_at` | `string` | No | Update date |
| `uuid` | `string` | No | Unique id |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.ApiGetWorkspaceOutput().create({
})
```

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.ApiGetWorkspaceOutput().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.ApiGetWorkspaceOutput().load({ workspace_uuid: 'workspace_uuid' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ApiGetWorkspaceOutputEntity` instance with the same client and
options.

#### `client()`

Return the parent `DigitaloceanSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ApiImportCustomModelOutputPublicEntity

```ts
const api_import_custom_model_output_public = client.ApiImportCustomModelOutputPublic()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `accept_hf_token_storage` | `boolean` | No | Whether the caller accepts storage of their HuggingFace token for gated model access |
| `accept_terms_and_conditions` | `boolean` | No | Whether the caller accepts the terms and conditions for importing this model |
| `description` | `string` | No | Description of the model |
| `error` | `string` | No |  |
| `import_job` | `Record<string, any>` | No | Import job tracking for a custom model |
| `model` | `Record<string, any>` | No | Custom model - user-imported model from HuggingFace, Spaces, etc. |
| `name` | `string` | No | Name for the imported model |
| `preferred_gpu_region` | `string` | No | Preferred GPU region for deployment |
| `source_ref` | `Record<string, any>` | No | Reference to the original source of the model |
| `source_type` | `string` | No | Source from which the model was imported |
| `tags` | `Record<string, any>` | No | User-defined tags for organizing models |
| `validation_steps` | `any[]` | No | Validation steps performed during import |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.ApiImportCustomModelOutputPublic().create({
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ApiImportCustomModelOutputPublicEntity` instance with the same client and
options.

#### `client()`

Return the parent `DigitaloceanSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ApiIndexedDataSourceEntity

```ts
const api_indexed_data_source = client.ApiIndexedDataSource()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `completed_at` | `string` | No | Timestamp when data source completed indexing |
| `data_source_uuid` | `string` | No | Uuid of the indexed data source |
| `error_details` | `string` | No | A detailed error description |
| `error_msg` | `string` | No | A string code provinding a hint which part of the system experienced an error |
| `failed_item_count` | `string` | No | Total count of files that have failed |
| `indexed_file_count` | `string` | No | Total count of files that have been indexed |
| `indexed_item_count` | `string` | No | Total count of files that have been indexed |
| `removed_item_count` | `string` | No | Total count of files that have been removed |
| `skipped_item_count` | `string` | No | Total count of files that have been skipped |
| `started_at` | `string` | No | Timestamp when data source started indexing |
| `status` | `string` | No |  |
| `total_bytes` | `string` | No | Total size of files in data source in bytes |
| `total_bytes_indexed` | `string` | No | Total size of files in data source in bytes that have been indexed |
| `total_file_count` | `string` | No | Total file count in the data source |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.ApiIndexedDataSource().list({ indexing_job_id: "example" })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ApiIndexedDataSourceEntity` instance with the same client and
options.

#### `client()`

Return the parent `DigitaloceanSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ApiLinkAgentFunctionOutputEntity

```ts
const api_link_agent_function_output = client.ApiLinkAgentFunctionOutput()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `agent_uuid` | `string` | No | Agent id |
| `anthropic_api_key` | `Record<string, any>` | No | Anthropic API Key Info |
| `api_key_infos` | `any[]` | No | Api key infos |
| `api_keys` | `any[]` | No | Api keys |
| `chatbot` | `Record<string, any>` | No | A Chatbot |
| `chatbot_identifiers` | `any[]` | No | Chatbot identifiers |
| `child_agents` | `any[]` | No | Child agents |
| `conversation_logs_enabled` | `boolean` | No | Whether conversation logs are enabled for the agent |
| `created_at` | `string` | No | Creation date / time |
| `deployment` | `Record<string, any>` | No | Description of deployment |
| `description` | `string` | No | Description of agent |
| `faas_name` | `string` | No | The name of the function in the DigitalOcean functions platform |
| `faas_namespace` | `string` | No | The namespace of the function in the DigitalOcean functions platform |
| `function_name` | `string` | No | Function name |
| `functions` | `any[]` | No |  |
| `guardrails` | `any[]` | No | The guardrails the agent is attached to |
| `if_case` | `string` | No |  |
| `input_schema` | `Record<string, any>` | No | Describe the input schema for the function so the agent may call it |
| `instruction` | `string` | No | Agent instruction. |
| `k` | `number` | No |  |
| `knowledge_bases` | `any[]` | No | Knowledge bases |
| `logging_config` | `Record<string, any>` | No |  |
| `max_tokens` | `number` | No |  |
| `mcp_servers` | `any[]` | No | MCP (Model Context Protocol) servers attached to this agent |
| `model` | `Record<string, any>` | No | Description of a Model |
| `model_provider_key` | `Record<string, any>` | No |  |
| `model_router` | `Record<string, any>` | No | Model router |
| `name` | `string` | No | Agent name |
| `openai_api_key` | `Record<string, any>` | No | OpenAI API Key Info |
| `output_schema` | `Record<string, any>` | No | Describe the output schema for the function so the agent handle its response |
| `parent_agents` | `any[]` | No | Parent agents |
| `project_id` | `string` | No |  |
| `provide_citations` | `boolean` | No | Whether the agent should provide in-response citations |
| `reasoning_effort` | `string` | No | The reasoning effort for the agent |
| `region` | `string` | No | Region code |
| `retrieval_method` | `string` | No | - RETRIEVAL_METHOD_UNKNOWN: The retrieval method is unknown - RETRIEVAL_METHOD_REWRITE: The retrieval method is rewrite - RETRIEVAL_METHOD_STEP_BACK: The retrieval method is step back - RETRIEVAL_METHOD_SUB_QUERIES: The retrieval method is… |
| `route_created_at` | `string` | No | Creation of route date / time |
| `route_created_by` | `string` | No |  |
| `route_name` | `string` | No | Route name |
| `route_uuid` | `string` | No |  |
| `tags` | `any[]` | No | Agent tag to organize related resources |
| `temperature` | `number` | No |  |
| `template` | `Record<string, any>` | No | Represents an AgentTemplate entity |
| `thinking_token_budget` | `number` | No | The thinking token budget for Anthropic extended thinking (0 = disabled) |
| `top_p` | `number` | No |  |
| `updated_at` | `string` | No | Last modified |
| `url` | `string` | No | Access your agent under this url |
| `user_id` | `string` | No | Id of user that created the agent |
| `uuid` | `string` | No | Unique agent id |
| `version_hash` | `string` | No | The latest version of the agent |
| `vpc_egress_ips` | `any[]` | No | VPC Egress IPs |
| `vpc_uuid` | `string` | No |  |
| `web_fetch_enabled` | `boolean` | No | Whether this agent can use the built-in web_fetch tool. |
| `web_search_enabled` | `boolean` | No | Whether this agent can use the built-in web_search tool. |
| `workspace` | `Record<string, any>` | No |  |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.ApiLinkAgentFunctionOutput().create({
  agent_id: 'example_agent_id',
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ApiLinkAgentFunctionOutputEntity` instance with the same client and
options.

#### `client()`

Return the parent `DigitaloceanSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ApiLinkAgentGuardrailOutputEntity

```ts
const api_link_agent_guardrail_output = client.ApiLinkAgentGuardrailOutput()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `agent_uuid` | `string` | No | The UUID of the agent. |
| `anthropic_api_key` | `Record<string, any>` | No | Anthropic API Key Info |
| `api_key_infos` | `any[]` | No | Api key infos |
| `api_keys` | `any[]` | No | Api keys |
| `chatbot` | `Record<string, any>` | No | A Chatbot |
| `chatbot_identifiers` | `any[]` | No | Chatbot identifiers |
| `child_agents` | `any[]` | No | Child agents |
| `conversation_logs_enabled` | `boolean` | No | Whether conversation logs are enabled for the agent |
| `created_at` | `string` | No | Creation date / time |
| `deployment` | `Record<string, any>` | No | Description of deployment |
| `description` | `string` | No | Description of agent |
| `functions` | `any[]` | No |  |
| `guardrails` | `any[]` | No | The guardrails the agent is attached to |
| `if_case` | `string` | No |  |
| `instruction` | `string` | No | Agent instruction. |
| `k` | `number` | No |  |
| `knowledge_bases` | `any[]` | No | Knowledge bases |
| `logging_config` | `Record<string, any>` | No |  |
| `max_tokens` | `number` | No |  |
| `mcp_servers` | `any[]` | No | MCP (Model Context Protocol) servers attached to this agent |
| `model` | `Record<string, any>` | No | Description of a Model |
| `model_provider_key` | `Record<string, any>` | No |  |
| `model_router` | `Record<string, any>` | No | Model router |
| `name` | `string` | No | Agent name |
| `openai_api_key` | `Record<string, any>` | No | OpenAI API Key Info |
| `parent_agents` | `any[]` | No | Parent agents |
| `project_id` | `string` | No |  |
| `provide_citations` | `boolean` | No | Whether the agent should provide in-response citations |
| `reasoning_effort` | `string` | No | The reasoning effort for the agent |
| `region` | `string` | No | Region code |
| `retrieval_method` | `string` | No | - RETRIEVAL_METHOD_UNKNOWN: The retrieval method is unknown - RETRIEVAL_METHOD_REWRITE: The retrieval method is rewrite - RETRIEVAL_METHOD_STEP_BACK: The retrieval method is step back - RETRIEVAL_METHOD_SUB_QUERIES: The retrieval method is… |
| `route_created_at` | `string` | No | Creation of route date / time |
| `route_created_by` | `string` | No |  |
| `route_name` | `string` | No | Route name |
| `route_uuid` | `string` | No |  |
| `tags` | `any[]` | No | Agent tag to organize related resources |
| `temperature` | `number` | No |  |
| `template` | `Record<string, any>` | No | Represents an AgentTemplate entity |
| `thinking_token_budget` | `number` | No | The thinking token budget for Anthropic extended thinking (0 = disabled) |
| `top_p` | `number` | No |  |
| `updated_at` | `string` | No | Last modified |
| `url` | `string` | No | Access your agent under this url |
| `user_id` | `string` | No | Id of user that created the agent |
| `uuid` | `string` | No | Unique agent id |
| `version_hash` | `string` | No | The latest version of the agent |
| `vpc_egress_ips` | `any[]` | No | VPC Egress IPs |
| `vpc_uuid` | `string` | No |  |
| `web_fetch_enabled` | `boolean` | No | Whether this agent can use the built-in web_fetch tool. |
| `web_search_enabled` | `boolean` | No | Whether this agent can use the built-in web_search tool. |
| `workspace` | `Record<string, any>` | No |  |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.ApiLinkAgentGuardrailOutput().create({
  agent_id: 'example_agent_id',
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ApiLinkAgentGuardrailOutputEntity` instance with the same client and
options.

#### `client()`

Return the parent `DigitaloceanSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ApiLinkAgentOutputEntity

```ts
const api_link_agent_output = client.ApiLinkAgentOutput()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `child_agent_uuid` | `string` | No | Routed agent id |
| `if_case` | `string` | No |  |
| `parent_agent_uuid` | `string` | No | A unique identifier for the parent agent. |
| `route_name` | `string` | No | Name of route |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.ApiLinkAgentOutput().create({
  agent_id: 'example_agent_id',
  child_agent_uuid: 'example_child_agent_uuid',
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ApiLinkAgentOutputEntity` instance with the same client and
options.

#### `client()`

Return the parent `DigitaloceanSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ApiLinkKnowledgeBaseOutputEntity

```ts
const api_link_knowledge_base_output = client.ApiLinkKnowledgeBaseOutput()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `anthropic_api_key` | `Record<string, any>` | No | Anthropic API Key Info |
| `api_key_infos` | `any[]` | No | Api key infos |
| `api_keys` | `any[]` | No | Api keys |
| `chatbot` | `Record<string, any>` | No | A Chatbot |
| `chatbot_identifiers` | `any[]` | No | Chatbot identifiers |
| `child_agents` | `any[]` | No | Child agents |
| `conversation_logs_enabled` | `boolean` | No | Whether conversation logs are enabled for the agent |
| `created_at` | `string` | No | Creation date / time |
| `deployment` | `Record<string, any>` | No | Description of deployment |
| `description` | `string` | No | Description of agent |
| `functions` | `any[]` | No |  |
| `guardrails` | `any[]` | No | The guardrails the agent is attached to |
| `if_case` | `string` | No |  |
| `instruction` | `string` | No | Agent instruction. |
| `k` | `number` | No |  |
| `knowledge_bases` | `any[]` | No | Knowledge bases |
| `logging_config` | `Record<string, any>` | No |  |
| `max_tokens` | `number` | No |  |
| `mcp_servers` | `any[]` | No | MCP (Model Context Protocol) servers attached to this agent |
| `model` | `Record<string, any>` | No | Description of a Model |
| `model_provider_key` | `Record<string, any>` | No |  |
| `model_router` | `Record<string, any>` | No | Model router |
| `name` | `string` | No | Agent name |
| `openai_api_key` | `Record<string, any>` | No | OpenAI API Key Info |
| `parent_agents` | `any[]` | No | Parent agents |
| `project_id` | `string` | No |  |
| `provide_citations` | `boolean` | No | Whether the agent should provide in-response citations |
| `reasoning_effort` | `string` | No | The reasoning effort for the agent |
| `region` | `string` | No | Region code |
| `retrieval_method` | `string` | No | - RETRIEVAL_METHOD_UNKNOWN: The retrieval method is unknown - RETRIEVAL_METHOD_REWRITE: The retrieval method is rewrite - RETRIEVAL_METHOD_STEP_BACK: The retrieval method is step back - RETRIEVAL_METHOD_SUB_QUERIES: The retrieval method is… |
| `route_created_at` | `string` | No | Creation of route date / time |
| `route_created_by` | `string` | No |  |
| `route_name` | `string` | No | Route name |
| `route_uuid` | `string` | No |  |
| `tags` | `any[]` | No | Agent tag to organize related resources |
| `temperature` | `number` | No |  |
| `template` | `Record<string, any>` | No | Represents an AgentTemplate entity |
| `thinking_token_budget` | `number` | No | The thinking token budget for Anthropic extended thinking (0 = disabled) |
| `top_p` | `number` | No |  |
| `updated_at` | `string` | No | Last modified |
| `url` | `string` | No | Access your agent under this url |
| `user_id` | `string` | No | Id of user that created the agent |
| `uuid` | `string` | No | Unique agent id |
| `version_hash` | `string` | No | The latest version of the agent |
| `vpc_egress_ips` | `any[]` | No | VPC Egress IPs |
| `vpc_uuid` | `string` | No |  |
| `web_fetch_enabled` | `boolean` | No | Whether this agent can use the built-in web_fetch tool. |
| `web_search_enabled` | `boolean` | No | Whether this agent can use the built-in web_search tool. |
| `workspace` | `Record<string, any>` | No |  |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.ApiLinkKnowledgeBaseOutput().create({
  agent_id: 'example_agent_id',
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ApiLinkKnowledgeBaseOutputEntity` instance with the same client and
options.

#### `client()`

Return the parent `DigitaloceanSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ApiListAgentApiKeysOutputEntity

```ts
const api_list_agent_api_keys_output = client.ApiListAgentApiKeysOutput()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `created_at` | `string` | No | Creation date |
| `created_by` | `string` | No | Created by |
| `deleted_at` | `string` | No | Deleted date |
| `name` | `string` | No | Name |
| `secret_key` | `string` | No |  |
| `uuid` | `string` | No | Uuid |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.ApiListAgentApiKeysOutput().list({ agent_id: "example" })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ApiListAgentApiKeysOutputEntity` instance with the same client and
options.

#### `client()`

Return the parent `DigitaloceanSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ApiListAgentsByAnthropicKeyOutputEntity

```ts
const api_list_agents_by_anthropic_key_output = client.ApiListAgentsByAnthropicKeyOutput()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `anthropic_api_key` | `Record<string, any>` | No | Anthropic API Key Info |
| `api_key_infos` | `any[]` | No | Api key infos |
| `api_keys` | `any[]` | No | Api keys |
| `chatbot` | `Record<string, any>` | No | A Chatbot |
| `chatbot_identifiers` | `any[]` | No | Chatbot identifiers |
| `child_agents` | `any[]` | No | Child agents |
| `conversation_logs_enabled` | `boolean` | No | Whether conversation logs are enabled for the agent |
| `created_at` | `string` | No | Creation date / time |
| `deployment` | `Record<string, any>` | No | Description of deployment |
| `description` | `string` | No | Description of agent |
| `functions` | `any[]` | No |  |
| `guardrails` | `any[]` | No | The guardrails the agent is attached to |
| `if_case` | `string` | No |  |
| `instruction` | `string` | No | Agent instruction. |
| `k` | `number` | No |  |
| `knowledge_bases` | `any[]` | No | Knowledge bases |
| `logging_config` | `Record<string, any>` | No |  |
| `max_tokens` | `number` | No |  |
| `mcp_servers` | `any[]` | No | MCP (Model Context Protocol) servers attached to this agent |
| `model` | `Record<string, any>` | No | Description of a Model |
| `model_provider_key` | `Record<string, any>` | No |  |
| `model_router` | `Record<string, any>` | No | Model router |
| `name` | `string` | No | Agent name |
| `openai_api_key` | `Record<string, any>` | No | OpenAI API Key Info |
| `parent_agents` | `any[]` | No | Parent agents |
| `project_id` | `string` | No |  |
| `provide_citations` | `boolean` | No | Whether the agent should provide in-response citations |
| `reasoning_effort` | `string` | No | The reasoning effort for the agent |
| `region` | `string` | No | Region code |
| `retrieval_method` | `string` | No | - RETRIEVAL_METHOD_UNKNOWN: The retrieval method is unknown - RETRIEVAL_METHOD_REWRITE: The retrieval method is rewrite - RETRIEVAL_METHOD_STEP_BACK: The retrieval method is step back - RETRIEVAL_METHOD_SUB_QUERIES: The retrieval method is… |
| `route_created_at` | `string` | No | Creation of route date / time |
| `route_created_by` | `string` | No |  |
| `route_name` | `string` | No | Route name |
| `route_uuid` | `string` | No |  |
| `tags` | `any[]` | No | Agent tag to organize related resources |
| `temperature` | `number` | No |  |
| `template` | `Record<string, any>` | No | Represents an AgentTemplate entity |
| `thinking_token_budget` | `number` | No | The thinking token budget for Anthropic extended thinking (0 = disabled) |
| `top_p` | `number` | No |  |
| `updated_at` | `string` | No | Last modified |
| `url` | `string` | No | Access your agent under this url |
| `user_id` | `string` | No | Id of user that created the agent |
| `uuid` | `string` | No | Unique agent id |
| `version_hash` | `string` | No | The latest version of the agent |
| `vpc_egress_ips` | `any[]` | No | VPC Egress IPs |
| `vpc_uuid` | `string` | No |  |
| `web_fetch_enabled` | `boolean` | No | Whether this agent can use the built-in web_fetch tool. |
| `web_search_enabled` | `boolean` | No | Whether this agent can use the built-in web_search tool. |
| `workspace` | `Record<string, any>` | No |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.ApiListAgentsByAnthropicKeyOutput().list({ key_id: "example" })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ApiListAgentsByAnthropicKeyOutputEntity` instance with the same client and
options.

#### `client()`

Return the parent `DigitaloceanSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ApiListAgentsByOpenAiKeyOutputEntity

```ts
const api_list_agents_by_open_ai_key_output = client.ApiListAgentsByOpenAiKeyOutput()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `anthropic_api_key` | `Record<string, any>` | No | Anthropic API Key Info |
| `api_key_infos` | `any[]` | No | Api key infos |
| `api_keys` | `any[]` | No | Api keys |
| `chatbot` | `Record<string, any>` | No | A Chatbot |
| `chatbot_identifiers` | `any[]` | No | Chatbot identifiers |
| `child_agents` | `any[]` | No | Child agents |
| `conversation_logs_enabled` | `boolean` | No | Whether conversation logs are enabled for the agent |
| `created_at` | `string` | No | Creation date / time |
| `deployment` | `Record<string, any>` | No | Description of deployment |
| `description` | `string` | No | Description of agent |
| `functions` | `any[]` | No |  |
| `guardrails` | `any[]` | No | The guardrails the agent is attached to |
| `if_case` | `string` | No |  |
| `instruction` | `string` | No | Agent instruction. |
| `k` | `number` | No |  |
| `knowledge_bases` | `any[]` | No | Knowledge bases |
| `logging_config` | `Record<string, any>` | No |  |
| `max_tokens` | `number` | No |  |
| `mcp_servers` | `any[]` | No | MCP (Model Context Protocol) servers attached to this agent |
| `model` | `Record<string, any>` | No | Description of a Model |
| `model_provider_key` | `Record<string, any>` | No |  |
| `model_router` | `Record<string, any>` | No | Model router |
| `name` | `string` | No | Agent name |
| `openai_api_key` | `Record<string, any>` | No | OpenAI API Key Info |
| `parent_agents` | `any[]` | No | Parent agents |
| `project_id` | `string` | No |  |
| `provide_citations` | `boolean` | No | Whether the agent should provide in-response citations |
| `reasoning_effort` | `string` | No | The reasoning effort for the agent |
| `region` | `string` | No | Region code |
| `retrieval_method` | `string` | No | - RETRIEVAL_METHOD_UNKNOWN: The retrieval method is unknown - RETRIEVAL_METHOD_REWRITE: The retrieval method is rewrite - RETRIEVAL_METHOD_STEP_BACK: The retrieval method is step back - RETRIEVAL_METHOD_SUB_QUERIES: The retrieval method is… |
| `route_created_at` | `string` | No | Creation of route date / time |
| `route_created_by` | `string` | No |  |
| `route_name` | `string` | No | Route name |
| `route_uuid` | `string` | No |  |
| `tags` | `any[]` | No | Agent tag to organize related resources |
| `temperature` | `number` | No |  |
| `template` | `Record<string, any>` | No | Represents an AgentTemplate entity |
| `thinking_token_budget` | `number` | No | The thinking token budget for Anthropic extended thinking (0 = disabled) |
| `top_p` | `number` | No |  |
| `updated_at` | `string` | No | Last modified |
| `url` | `string` | No | Access your agent under this url |
| `user_id` | `string` | No | Id of user that created the agent |
| `uuid` | `string` | No | Unique agent id |
| `version_hash` | `string` | No | The latest version of the agent |
| `vpc_egress_ips` | `any[]` | No | VPC Egress IPs |
| `vpc_uuid` | `string` | No |  |
| `web_fetch_enabled` | `boolean` | No | Whether this agent can use the built-in web_fetch tool. |
| `web_search_enabled` | `boolean` | No | Whether this agent can use the built-in web_search tool. |
| `workspace` | `Record<string, any>` | No |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.ApiListAgentsByOpenAiKeyOutput().list({ key_id: "example" })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ApiListAgentsByOpenAiKeyOutputEntity` instance with the same client and
options.

#### `client()`

Return the parent `DigitaloceanSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ApiListAgentsByWorkspaceOutputEntity

```ts
const api_list_agents_by_workspace_output = client.ApiListAgentsByWorkspaceOutput()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `anthropic_api_key` | `Record<string, any>` | No | Anthropic API Key Info |
| `api_key_infos` | `any[]` | No | Api key infos |
| `api_keys` | `any[]` | No | Api keys |
| `chatbot` | `Record<string, any>` | No | A Chatbot |
| `chatbot_identifiers` | `any[]` | No | Chatbot identifiers |
| `child_agents` | `any[]` | No | Child agents |
| `conversation_logs_enabled` | `boolean` | No | Whether conversation logs are enabled for the agent |
| `created_at` | `string` | No | Creation date / time |
| `deployment` | `Record<string, any>` | No | Description of deployment |
| `description` | `string` | No | Description of agent |
| `functions` | `any[]` | No |  |
| `guardrails` | `any[]` | No | The guardrails the agent is attached to |
| `if_case` | `string` | No |  |
| `instruction` | `string` | No | Agent instruction. |
| `k` | `number` | No |  |
| `knowledge_bases` | `any[]` | No | Knowledge bases |
| `logging_config` | `Record<string, any>` | No |  |
| `max_tokens` | `number` | No |  |
| `mcp_servers` | `any[]` | No | MCP (Model Context Protocol) servers attached to this agent |
| `model` | `Record<string, any>` | No | Description of a Model |
| `model_provider_key` | `Record<string, any>` | No |  |
| `model_router` | `Record<string, any>` | No | Model router |
| `name` | `string` | No | Agent name |
| `openai_api_key` | `Record<string, any>` | No | OpenAI API Key Info |
| `parent_agents` | `any[]` | No | Parent agents |
| `project_id` | `string` | No |  |
| `provide_citations` | `boolean` | No | Whether the agent should provide in-response citations |
| `reasoning_effort` | `string` | No | The reasoning effort for the agent |
| `region` | `string` | No | Region code |
| `retrieval_method` | `string` | No | - RETRIEVAL_METHOD_UNKNOWN: The retrieval method is unknown - RETRIEVAL_METHOD_REWRITE: The retrieval method is rewrite - RETRIEVAL_METHOD_STEP_BACK: The retrieval method is step back - RETRIEVAL_METHOD_SUB_QUERIES: The retrieval method is… |
| `route_created_at` | `string` | No | Creation of route date / time |
| `route_created_by` | `string` | No |  |
| `route_name` | `string` | No | Route name |
| `route_uuid` | `string` | No |  |
| `tags` | `any[]` | No | Agent tag to organize related resources |
| `temperature` | `number` | No |  |
| `template` | `Record<string, any>` | No | Represents an AgentTemplate entity |
| `thinking_token_budget` | `number` | No | The thinking token budget for Anthropic extended thinking (0 = disabled) |
| `top_p` | `number` | No |  |
| `updated_at` | `string` | No | Last modified |
| `url` | `string` | No | Access your agent under this url |
| `user_id` | `string` | No | Id of user that created the agent |
| `uuid` | `string` | No | Unique agent id |
| `version_hash` | `string` | No | The latest version of the agent |
| `vpc_egress_ips` | `any[]` | No | VPC Egress IPs |
| `vpc_uuid` | `string` | No |  |
| `web_fetch_enabled` | `boolean` | No | Whether this agent can use the built-in web_fetch tool. |
| `web_search_enabled` | `boolean` | No | Whether this agent can use the built-in web_search tool. |
| `workspace` | `Record<string, any>` | No |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.ApiListAgentsByWorkspaceOutput().list({ workspace_id: "example" })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ApiListAgentsByWorkspaceOutputEntity` instance with the same client and
options.

#### `client()`

Return the parent `DigitaloceanSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ApiListEvaluationMetricsOutputEntity

```ts
const api_list_evaluation_metrics_output = client.ApiListEvaluationMetricsOutput()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `associated_presets` | `any[]` | No | Saved model evaluation presets that reference this metric. |
| `category` | `string` | No |  |
| `custom_eval_config` | `Record<string, any>` | No | Configuration for a custom model-evaluation metric scored by an LLM judge. |
| `description` | `string` | No |  |
| `evaluation_scope` | `string` | No | Scope that determines whether a metric belongs to agent evaluation or model evaluation. |
| `inverted` | `boolean` | No | If true, the metric is inverted, meaning that a lower value is better. |
| `is_metric_goal` | `boolean` | No |  |
| `metric_name` | `string` | No |  |
| `metric_rank` | `number` | No |  |
| `metric_type` | `string` | No |  |
| `metric_uuid` | `string` | No |  |
| `metric_value_type` | `string` | No |  |
| `range_max` | `number` | No | The maximum value for the metric. |
| `range_min` | `number` | No | The minimum value for the metric. |
| `source` | `string` | No | Distinguishes platform catalog metrics from user-defined LLM-as-judge metrics. |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.ApiListEvaluationMetricsOutput().list()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ApiListEvaluationMetricsOutputEntity` instance with the same client and
options.

#### `client()`

Return the parent `DigitaloceanSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ApiListEvaluationRunsByTestCaseOutputEntity

```ts
const api_list_evaluation_runs_by_test_case_output = client.ApiListEvaluationRunsByTestCaseOutput()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `agent_deleted` | `boolean` | No | Whether agent is deleted |
| `agent_deployment_name` | `string` | No | The agent deployment name |
| `agent_name` | `string` | No | Agent name |
| `agent_uuid` | `string` | No | Agent UUID. |
| `agent_version_hash` | `string` | No | Version hash |
| `agent_workspace_uuid` | `string` | No | Agent workspace uuid |
| `created_by_user_email` | `string` | No |  |
| `created_by_user_id` | `string` | No |  |
| `error_description` | `string` | No | The error description |
| `evaluation_run_uuid` | `string` | No | Evaluation run UUID. |
| `evaluation_test_case_workspace_uuid` | `string` | No | Evaluation test case workspace uuid |
| `finished_at` | `string` | No | Run end time. |
| `pass_status` | `boolean` | No | The pass status of the evaluation run based on the star metric. |
| `queued_at` | `string` | No | Run queued time. |
| `run_level_metric_results` | `any[]` | No |  |
| `run_name` | `string` | No | Run name. |
| `star_metric_result` | `Record<string, any>` | No |  |
| `started_at` | `string` | No | Run start time. |
| `status` | `string` | No | Evaluation Run Statuses |
| `test_case_description` | `string` | No | Test case description. |
| `test_case_name` | `string` | No | Test case name. |
| `test_case_uuid` | `string` | No | Test-case UUID. |
| `test_case_version` | `number` | No | Test-case-version. |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.ApiListEvaluationRunsByTestCaseOutput().list({ evaluation_test_case_id: "example" })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ApiListEvaluationRunsByTestCaseOutputEntity` instance with the same client and
options.

#### `client()`

Return the parent `DigitaloceanSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ApiListEvaluationTestCasesByWorkspaceOutputEntity

```ts
const api_list_evaluation_test_cases_by_workspace_output = client.ApiListEvaluationTestCasesByWorkspaceOutput()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `archived_at` | `string` | No |  |
| `created_at` | `string` | No |  |
| `created_by_user_email` | `string` | No |  |
| `created_by_user_id` | `string` | No |  |
| `dataset` | `Record<string, any>` | No |  |
| `dataset_name` | `string` | No |  |
| `dataset_uuid` | `string` | No |  |
| `description` | `string` | No |  |
| `latest_version_number_of_runs` | `number` | No |  |
| `metrics` | `any[]` | No |  |
| `name` | `string` | No |  |
| `star_metric` | `Record<string, any>` | No |  |
| `test_case_uuid` | `string` | No |  |
| `total_runs` | `number` | No |  |
| `updated_at` | `string` | No |  |
| `updated_by_user_email` | `string` | No |  |
| `updated_by_user_id` | `string` | No |  |
| `version` | `number` | No |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.ApiListEvaluationTestCasesByWorkspaceOutput().list({ workspace_id: "example" })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ApiListEvaluationTestCasesByWorkspaceOutputEntity` instance with the same client and
options.

#### `client()`

Return the parent `DigitaloceanSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ApiListKnowledgeBaseDataSourcesOutputEntity

```ts
const api_list_knowledge_base_data_sources_output = client.ApiListKnowledgeBaseDataSourcesOutput()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `aws_data_source` | `Record<string, any>` | No | AWS S3 Data Source for Display |
| `bucket_name` | `string` | No | Name of storage bucket - Deprecated, moved to data_source_details |
| `chunking_algorithm` | `string` | No |  |
| `chunking_options` | `Record<string, any>` | No |  |
| `created_at` | `string` | No | Creation date / time |
| `dropbox_data_source` | `Record<string, any>` | No | Dropbox Data Source for Display |
| `file_upload_data_source` | `Record<string, any>` | No | File to upload as data source for knowledge base. |
| `google_drive_data_source` | `Record<string, any>` | No | Google Drive Data Source for Display |
| `item_path` | `string` | No | Path of folder or object in bucket - Deprecated, moved to data_source_details |
| `last_datasource_indexing_job` | `Record<string, any>` | No |  |
| `region` | `string` | No | Region code - Deprecated, moved to data_source_details |
| `spaces_data_source` | `Record<string, any>` | No | Spaces Bucket Data Source |
| `updated_at` | `string` | No | Last modified |
| `uuid` | `string` | No | Unique id of knowledge base |
| `web_crawler_data_source` | `Record<string, any>` | No | WebCrawlerDataSource |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.ApiListKnowledgeBaseDataSourcesOutput().list({ knowledge_base_id: "example" })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ApiListKnowledgeBaseDataSourcesOutputEntity` instance with the same client and
options.

#### `client()`

Return the parent `DigitaloceanSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ApiListKnowledgeBaseIndexingJobsOutputEntity

```ts
const api_list_knowledge_base_indexing_jobs_output = client.ApiListKnowledgeBaseIndexingJobsOutput()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `completed_datasources` | `number` | No | Number of datasources indexed completed |
| `created_at` | `string` | No | Creation date / time |
| `data_source_jobs` | `any[]` | No | Details on Data Sources included in the Indexing Job |
| `data_source_uuids` | `any[]` | No |  |
| `finished_at` | `string` | No |  |
| `is_report_available` | `boolean` | No | Boolean value to determine if the indexing job details are available |
| `knowledge_base_uuid` | `string` | No | Knowledge base id |
| `phase` | `string` | No |  |
| `started_at` | `string` | No |  |
| `status` | `string` | No |  |
| `tokens` | `number` | No | Number of tokens [This field is deprecated] |
| `total_datasources` | `number` | No | Number of datasources being indexed |
| `total_tokens` | `string` | No | Total Tokens Consumed By the Indexing Job |
| `updated_at` | `string` | No | Last modified |
| `uuid` | `string` | No | Unique id |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.ApiListKnowledgeBaseIndexingJobsOutput().list({ knowledge_base_id: "example" })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ApiListKnowledgeBaseIndexingJobsOutputEntity` instance with the same client and
options.

#### `client()`

Return the parent `DigitaloceanSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ApiListModelEvaluationMetricsOutputEntity

```ts
const api_list_model_evaluation_metrics_output = client.ApiListModelEvaluationMetricsOutput()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `associated_presets` | `any[]` | No | Saved model evaluation presets that reference this metric. |
| `category` | `string` | No |  |
| `custom_eval_config` | `Record<string, any>` | No | Configuration for a custom model-evaluation metric scored by an LLM judge. |
| `description` | `string` | No |  |
| `evaluation_scope` | `string` | No | Scope that determines whether a metric belongs to agent evaluation or model evaluation. |
| `inverted` | `boolean` | No | If true, the metric is inverted, meaning that a lower value is better. |
| `is_metric_goal` | `boolean` | No |  |
| `metric_name` | `string` | No |  |
| `metric_rank` | `number` | No |  |
| `metric_type` | `string` | No |  |
| `metric_uuid` | `string` | No |  |
| `metric_value_type` | `string` | No |  |
| `range_max` | `number` | No | The maximum value for the metric. |
| `range_min` | `number` | No | The minimum value for the metric. |
| `source` | `string` | No | Distinguishes platform catalog metrics from user-defined LLM-as-judge metrics. |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.ApiListModelEvaluationMetricsOutput().list()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ApiListModelEvaluationMetricsOutputEntity` instance with the same client and
options.

#### `client()`

Return the parent `DigitaloceanSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ApiListScenarioLibraryOutputEntity

```ts
const api_list_scenario_library_output = client.ApiListScenarioLibraryOutput()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `category` | `string` | No | Optional grouping for catalog browsing (e.g. |
| `created_at` | `string` | No | Time created at. |
| `description` | `string` | No | Curated description. |
| `goal_description` | `string` | No | The goal this scenario set demonstrates, shown as context alongside goal-driven generation. |
| `library_scenario_uuid` | `string` | No | UUID of the library entry. |
| `name` | `string` | No | Curated display name. |
| `scenario_count` | `number` | No | Number of scenarios in the library entry. |
| `status` | `string` | No | Lifecycle status of a Common Scenario & Goal Library entry. |
| `updated_at` | `string` | No | Time last updated at. |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.ApiListScenarioLibraryOutput().list()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ApiListScenarioLibraryOutputEntity` instance with the same client and
options.

#### `client()`

Return the parent `DigitaloceanSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ApiListScenariosOutputEntity

```ts
const api_list_scenarios_output = client.ApiListScenariosOutput()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `description` | `string` | No | What the user tries to accomplish. |
| `exploration_budget` | `number` | No | Number of journeys to explore for this scenario. |
| `max_turns` | `number` | No | Turn budget for the scenario. |
| `name` | `string` | No | Human-readable name for the scenario. |
| `scenario_uuid` | `string` | No | Unique id for the scenario. |
| `stopping_criteria` | `any[]` | No | Judge stopping criteria. |
| `user_persona` | `string` | No | How the user communicates (tone, role). |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.ApiListScenariosOutput().list({ scenario_library_id: "example" })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ApiListScenariosOutputEntity` instance with the same client and
options.

#### `client()`

Return the parent `DigitaloceanSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ApiListSimulationJourneysOutputEntity

```ts
const api_list_simulation_journeys_output = client.ApiListSimulationJourneysOutput()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `created_at` | `string` | No | Time created at. |
| `duration_sec` | `string` | No | Wall-clock time taken for the journey to complete, in seconds. |
| `failure_reason` | `string` | No | Human-readable explanation of a terminal FAILED status. |
| `journey_index` | `number` | No | Zero-based index of this journey within its scenario's exploration budget. |
| `journey_uuid` | `string` | No | UUID of the journey. |
| `judge_reasoning` | `string` | No | Optional judge reasoning for the verdict. |
| `run_uuid` | `string` | No | UUID of the run this journey belongs to. |
| `scenario_uuid` | `string` | No | UUID of the scenario this journey executed. |
| `session_id` | `string` | No | Session identifier for this journey. |
| `status` | `string` | No | Lifecycle status of a single journey. |
| `token_usage` | `Record<string, any>` | No | Per-actor token accounting for a run or journey. |
| `trajectory_bucket_name` | `string` | No | Object storage bucket holding the trajectory JSON. |
| `trajectory_bucket_region` | `string` | No | Object storage bucket region for the trajectory JSON. |
| `trajectory_spaces_key` | `string` | No | Object storage key for the trajectory JSON. |
| `updated_at` | `string` | No | Time last updated at. |
| `verdict` | `string` | No | The judge's verdict for a journey. |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.ApiListSimulationJourneysOutput().list({ simulation_run_id: "example" })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ApiListSimulationJourneysOutputEntity` instance with the same client and
options.

#### `client()`

Return the parent `DigitaloceanSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ApiModelCatalogCardEntity

```ts
const api_model_catalog_card = client.ApiModelCatalogCard()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `availability` | `any[]` | No |  |
| `badges` | `any[]` | No | Badges for models |
| `benchmark_score` | `Record<string, any>` | No | Benchmark scores for this model, stored as arbitrary JSON |
| `capabilities` | `any[]` | No |  |
| `code_snippets` | `Record<string, any>` | No | Code examples for using the model |
| `context_window` | `string` | No | Specs (same as Entry) |
| `created_at` | `string` | No | RFC 3339 timestamp indicating when the model was added to the catalog. |
| `creator` | `string` | No | Model creator/developer (e.g., "Meta", "Anthropic", "OpenAI") |
| `description` | `string` | No | Card-specific |
| `hugging_face_id` | `string` | No | The Hugging Face repository ID (e.g. |
| `id` | `string` | No | Identity (same as Entry) |
| `max_output_tokens` | `string` | No | The maximum number of output tokens the model can generate in a single response. |
| `modalities` | `Record<string, any>` | No | Input/output modalities |
| `model_id` | `string` | No | Model identifier used for API calls (e.g., "llama3.1-70b-instruct") |
| `name` | `string` | No |  |
| `parameter_count` | `number` | No |  |
| `pricing` | `Record<string, any>` | No | Pricing per million tokens (aligns with existing ModelPrice pattern) |
| `pricing_detail` | `Record<string, any>` | No | The complete set of prices for a model, covering every available variant. |
| `provider` | `string` | No |  |
| `scaled_pricing_enabled` | `boolean` | No | True when this model's pricing varies over time. |
| `short_description` | `string` | No |  |
| `type` | `string` | No |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.ApiModelCatalogCard().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.ApiModelCatalogCard().load({ id: 'api_model_catalog_card_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ApiModelCatalogCardEntity` instance with the same client and
options.

#### `client()`

Return the parent `DigitaloceanSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ApiModelEvaluationPresetEntity

```ts
const api_model_evaluation_preset = client.ApiModelEvaluationPreset()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `candidate_inference_config` | `Record<string, any>` | No | Inference configuration for the candidate model during evaluation. |
| `candidate_model_name` | `string` | No | Model slug used to call the candidate model API. |
| `candidate_model_source` | `string` | No | Whether the candidate is a served model (serverless platform, a dedicated deployment, or a model router) or an OHS-hosted agent config. |
| `candidate_model_uuid` | `string` | No | UUID of the candidate model stored on this preset. |
| `candidate_system_prompt` | `string` | No | System prompt / instructions to send to the candidate model. |
| `created_at` | `string` | No | Timestamp when the preset was created. |
| `dataset_name` | `string` | No | Display name of the dataset stored on this preset. |
| `dataset_uuid` | `string` | No | UUID of the dataset stored on this preset. |
| `eval_preset_uuid` | `string` | No | UUID of the evaluation preset. |
| `id` | `string` | No |  |
| `judge_model_name` | `string` | No | Display name of the judge model stored on this preset. |
| `judge_model_uuid` | `string` | No | UUID of the judge model stored on this preset. |
| `metrics` | `any[]` | No | Metrics selected for this preset. |
| `name` | `string` | No | Name of the evaluation preset. |
| `saved_sections` | `any[]` | No | Sections of the inline evaluation config that were persisted when this preset was created. |
| `star_metric` | `Record<string, any>` | No |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.ApiModelEvaluationPreset().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.ApiModelEvaluationPreset().load({ id: 'api_model_evaluation_preset_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ApiModelEvaluationPresetEntity` instance with the same client and
options.

#### `client()`

Return the parent `DigitaloceanSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ApiModelPublicEntity

```ts
const api_model_public = client.ApiModelPublic()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `agreement` | `Record<string, any>` | No | Agreement Description |
| `benchmark_score` | `Record<string, any>` | No | Benchmark scores for this model, stored as arbitrary JSON |
| `capabilities` | `any[]` | No | Model capabilities (inference, reasoning, vectorization, etc.) |
| `context_window` | `string` | No | Context window (maximum tokens) |
| `created_at` | `string` | No | Creation date / time |
| `description` | `string` | No | Model description |
| `endpoints` | `any[]` | No | Available endpoints and their capabilities |
| `id` | `string` | No | Human-readable model identifier |
| `is_foundational` | `boolean` | No | True if it is a foundational model provided by do |
| `kb_default_chunk_size` | `number` | No | Default chunking size limit to show in UI |
| `kb_max_chunk_size` | `number` | No | Maximum chunk size limit of model |
| `kb_min_chunk_size` | `number` | No | Minimum chunking size token limits if model supports KNOWLEDGEBASE usecase |
| `lifecycle_status` | `string` | No | Lifecycle status of the model (internal, public-preview, active, deprecated, end_of_life) |
| `modalities` | `Record<string, any>` | No | Input/output modalities |
| `model_availability` | `string` | No | Model availability (serverless, dedicated, etc.) |
| `name` | `string` | No | Display name of the model |
| `parameter_count` | `number` | No | Parameter count in billions |
| `parent_uuid` | `string` | No | Unique id of the model, this model is based on |
| `pricing` | `Record<string, any>` | No | Pricing per million tokens (aligns with existing ModelPrice pattern) |
| `provider` | `string` | No |  |
| `reasoning_efforts` | `any[]` | No | Available reasoning efforts for this model |
| `settings` | `any[]` | No | Playground settings derived from model metadata |
| `thinking` | `boolean` | No | Whether this model supports extended thinking (Anthropic models) |
| `type` | `string` | No | Model type (chat, embedding, image, reasoning, coding) |
| `updated_at` | `string` | No | Last modified |
| `upload_complete` | `boolean` | No | Model has been fully uploaded |
| `url` | `string` | No | Download url |
| `uuid` | `string` | No | Unique id |
| `version` | `Record<string, any>` | No | Version Information about a Model |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.ApiModelPublic().list()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ApiModelPublicEntity` instance with the same client and
options.

#### `client()`

Return the parent `DigitaloceanSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ApiModelRouterPresetEntity

```ts
const api_model_router_preset = client.ApiModelRouterPreset()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `config` | `Record<string, any>` | No |  |
| `display_name` | `string` | No | Display name for UI surfaces |
| `long_description` | `string` | No | Long description for details views |
| `short_description` | `string` | No | Short description for list views |
| `slug` | `string` | No | Stable slug for routing usage |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.ApiModelRouterPreset().list()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ApiModelRouterPresetEntity` instance with the same client and
options.

#### `client()`

Return the parent `DigitaloceanSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ApiModelRouterTaskPresetEntity

```ts
const api_model_router_task_preset = client.ApiModelRouterTaskPreset()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `category` | `string` | No | Higher-level grouping used by the UI |
| `description` | `string` | No | Task description |
| `models` | `any[]` | No | Default models assigned to this task |
| `name` | `string` | No | Display name |
| `selection_policy` | `Record<string, any>` | No | Selection policy preference for choosing among assigned models. |
| `tags` | `any[]` | No | Lightweight labels for filtering |
| `task_slug` | `string` | No | Task slug |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.ApiModelRouterTaskPreset().list()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ApiModelRouterTaskPresetEntity` instance with the same client and
options.

#### `client()`

Return the parent `DigitaloceanSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ApiMoveAgentsToWorkspaceOutputEntity

```ts
const api_move_agents_to_workspace_output = client.ApiMoveAgentsToWorkspaceOutput()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `agent_uuids` | `any[]` | No | Agent uuids |
| `agents` | `any[]` | No | Agents |
| `created_at` | `string` | No | Creation date |
| `created_by` | `string` | No | The id of user who created this workspace |
| `created_by_email` | `string` | No | The email of the user who created this workspace |
| `deleted_at` | `string` | No | Deleted date |
| `description` | `string` | No | Description of the workspace |
| `evaluation_test_cases` | `any[]` | No | Evaluations |
| `name` | `string` | No | Name of the workspace |
| `updated_at` | `string` | No | Update date |
| `uuid` | `string` | No | Unique id |
| `workspace_uuid` | `string` | No | Workspace uuid to move agents to |

### Operations

#### `update(data: object, ctrl?: object)`

Update an existing entity. The data must include the entity `id`.

```ts
const result = await client.ApiMoveAgentsToWorkspaceOutput().update({
  workspace_id: 'workspace_id',
  // Fields to update
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ApiMoveAgentsToWorkspaceOutputEntity` instance with the same client and
options.

#### `client()`

Return the parent `DigitaloceanSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ApiPromptEntity

```ts
const api_prompt = client.ApiPrompt()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `evaluation_trace_spans` | `any[]` | No | The evaluated trace spans. |
| `ground_truth` | `string` | No | The ground truth for the prompt. |
| `input` | `string` | No |  |
| `input_tokens` | `string` | No | The number of input tokens used in the prompt. |
| `output` | `string` | No |  |
| `output_tokens` | `string` | No | The number of output tokens used in the prompt. |
| `prompt_chunks` | `any[]` | No | The list of prompt chunks. |
| `prompt_id` | `number` | No | Prompt ID |
| `prompt_level_metric_results` | `any[]` | No | The metric results for the prompt. |
| `trace_id` | `string` | No | The trace id for the prompt. |

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.ApiPrompt().load({ evaluation_run_id: 'evaluation_run_id', prompt_id: 1 })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ApiPromptEntity` instance with the same client and
options.

#### `client()`

Return the parent `DigitaloceanSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ApiRollbackToAgentVersionOutputEntity

```ts
const api_rollback_to_agent_version_output = client.ApiRollbackToAgentVersionOutput()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `audit_header` | `Record<string, any>` | No | An alternative way to provide auth information. |
| `uuid` | `string` | No | Agent unique identifier |
| `version_hash` | `string` | No | Unique identifier |

### Operations

#### `update(data: object, ctrl?: object)`

Update an existing entity. The data must include the entity `id`.

```ts
const result = await client.ApiRollbackToAgentVersionOutput().update({
  agent_id: 'agent_id',
  // Fields to update
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ApiRollbackToAgentVersionOutputEntity` instance with the same client and
options.

#### `client()`

Return the parent `DigitaloceanSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ApiSimulationJourneyEntity

```ts
const api_simulation_journey = client.ApiSimulationJourney()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `created_at` | `string` | No | Time created at. |
| `duration_sec` | `string` | No | Wall-clock time taken for the journey to complete, in seconds. |
| `failure_reason` | `string` | No | Human-readable explanation of a terminal FAILED status. |
| `id` | `string` | No |  |
| `journey_index` | `number` | No | Zero-based index of this journey within its scenario's exploration budget. |
| `journey_uuid` | `string` | No | UUID of the journey. |
| `judge_reasoning` | `string` | No | Optional judge reasoning for the verdict. |
| `run_uuid` | `string` | No | UUID of the run this journey belongs to. |
| `scenario_uuid` | `string` | No | UUID of the scenario this journey executed. |
| `session_id` | `string` | No | Session identifier for this journey. |
| `status` | `string` | No | Lifecycle status of a single journey. |
| `token_usage` | `Record<string, any>` | No | Per-actor token accounting for a run or journey. |
| `trajectory_bucket_name` | `string` | No | Object storage bucket holding the trajectory JSON. |
| `trajectory_bucket_region` | `string` | No | Object storage bucket region for the trajectory JSON. |
| `trajectory_spaces_key` | `string` | No | Object storage key for the trajectory JSON. |
| `updated_at` | `string` | No | Time last updated at. |
| `verdict` | `string` | No | The judge's verdict for a journey. |

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.ApiSimulationJourney().load({ id: 'api_simulation_journey_id', simulation_run_id: 'simulation_run_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ApiSimulationJourneyEntity` instance with the same client and
options.

#### `client()`

Return the parent `DigitaloceanSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ApiSimulationTrajectoryEntity

```ts
const api_simulation_trajectory = client.ApiSimulationTrajectory()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `agent_id` | `string` | No | Identifier of the candidate agent under test for this journey. |
| `completed_at` | `string` | No |  |
| `duration_sec` | `string` | No |  |
| `evaluation_metrics` | `any[]` | No | Per-metric scores and judge reasoning for this trajectory. |
| `failure_reason` | `string` | No |  |
| `journey_index` | `number` | No |  |
| `journey_uuid` | `string` | No |  |
| `judge` | `Record<string, any>` | No | Judge output embedded in the trajectory JSON. |
| `max_turns` | `number` | No | Turn budget configured for this journey (per-scenario max_turns, after any run-level override). |
| `messages` | `any[]` | No |  |
| `run_uuid` | `string` | No |  |
| `scenario_uuid` | `string` | No |  |
| `session_id` | `string` | No |  |
| `started_at` | `string` | No |  |
| `status` | `string` | No | Lifecycle status of the trajectory. |
| `token_usage` | `Record<string, any>` | No | Per-actor token accounting for a run or journey. |
| `turn_count` | `number` | No |  |
| `verdict` | `string` | No | The judge's verdict for a journey. |

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.ApiSimulationTrajectory().load({ journey_id: 'journey_id', simulation_run_id: 'simulation_run_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ApiSimulationTrajectoryEntity` instance with the same client and
options.

#### `client()`

Return the parent `DigitaloceanSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ApiUnlinkAgentFunctionOutputEntity

```ts
const api_unlink_agent_function_output = client.ApiUnlinkAgentFunctionOutput()
```

### Operations

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria.

```ts
const result = await client.ApiUnlinkAgentFunctionOutput().remove({ agent_id: 'agent_id', function_uuid: 'function_uuid' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ApiUnlinkAgentFunctionOutputEntity` instance with the same client and
options.

#### `client()`

Return the parent `DigitaloceanSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ApiUnlinkAgentGuardrailOutputEntity

```ts
const api_unlink_agent_guardrail_output = client.ApiUnlinkAgentGuardrailOutput()
```

### Operations

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria.

```ts
const result = await client.ApiUnlinkAgentGuardrailOutput().remove({ agent_id: 'agent_id', guardrail_uuid: 'guardrail_uuid' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ApiUnlinkAgentGuardrailOutputEntity` instance with the same client and
options.

#### `client()`

Return the parent `DigitaloceanSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ApiUnlinkAgentOutputEntity

```ts
const api_unlink_agent_output = client.ApiUnlinkAgentOutput()
```

### Operations

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria.

```ts
const result = await client.ApiUnlinkAgentOutput().remove({ agent_id: 'agent_id', child_agent_uuid: 'child_agent_uuid' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ApiUnlinkAgentOutputEntity` instance with the same client and
options.

#### `client()`

Return the parent `DigitaloceanSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ApiUnlinkKnowledgeBaseOutputEntity

```ts
const api_unlink_knowledge_base_output = client.ApiUnlinkKnowledgeBaseOutput()
```

### Operations

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria.

```ts
const result = await client.ApiUnlinkKnowledgeBaseOutput().remove({ agent_id: 'agent_id', knowledge_base_uuid: 'knowledge_base_uuid' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ApiUnlinkKnowledgeBaseOutputEntity` instance with the same client and
options.

#### `client()`

Return the parent `DigitaloceanSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ApiUpdateAgentApiKeyOutputEntity

```ts
const api_update_agent_api_key_output = client.ApiUpdateAgentApiKeyOutput()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `agent_uuid` | `string` | No | Agent id |
| `api_key_uuid` | `string` | No | API key ID |
| `created_at` | `string` | No | Creation date |
| `created_by` | `string` | No | Created by |
| `deleted_at` | `string` | No | Deleted date |
| `name` | `string` | No | Name |
| `secret_key` | `string` | No |  |
| `uuid` | `string` | No | Uuid |

### Operations

#### `update(data: object, ctrl?: object)`

Update an existing entity. The data must include the entity `id`.

```ts
const result = await client.ApiUpdateAgentApiKeyOutput().update({
  agent_id: 'agent_id',
  api_key_uuid: 'api_key_uuid',
  // Fields to update
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ApiUpdateAgentApiKeyOutputEntity` instance with the same client and
options.

#### `client()`

Return the parent `DigitaloceanSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ApiUpdateAgentFunctionOutputEntity

```ts
const api_update_agent_function_output = client.ApiUpdateAgentFunctionOutput()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `agent_uuid` | `string` | No | Agent id |
| `anthropic_api_key` | `Record<string, any>` | No | Anthropic API Key Info |
| `api_key_infos` | `any[]` | No | Api key infos |
| `api_keys` | `any[]` | No | Api keys |
| `chatbot` | `Record<string, any>` | No | A Chatbot |
| `chatbot_identifiers` | `any[]` | No | Chatbot identifiers |
| `child_agents` | `any[]` | No | Child agents |
| `conversation_logs_enabled` | `boolean` | No | Whether conversation logs are enabled for the agent |
| `created_at` | `string` | No | Creation date / time |
| `deployment` | `Record<string, any>` | No | Description of deployment |
| `description` | `string` | No | Description of agent |
| `faas_name` | `string` | No | The name of the function in the DigitalOcean functions platform |
| `faas_namespace` | `string` | No | The namespace of the function in the DigitalOcean functions platform |
| `function_name` | `string` | No | Function name |
| `function_uuid` | `string` | No | Function id |
| `functions` | `any[]` | No |  |
| `guardrails` | `any[]` | No | The guardrails the agent is attached to |
| `if_case` | `string` | No |  |
| `input_schema` | `Record<string, any>` | No | Describe the input schema for the function so the agent may call it |
| `instruction` | `string` | No | Agent instruction. |
| `k` | `number` | No |  |
| `knowledge_bases` | `any[]` | No | Knowledge bases |
| `logging_config` | `Record<string, any>` | No |  |
| `max_tokens` | `number` | No |  |
| `mcp_servers` | `any[]` | No | MCP (Model Context Protocol) servers attached to this agent |
| `model` | `Record<string, any>` | No | Description of a Model |
| `model_provider_key` | `Record<string, any>` | No |  |
| `model_router` | `Record<string, any>` | No | Model router |
| `name` | `string` | No | Agent name |
| `openai_api_key` | `Record<string, any>` | No | OpenAI API Key Info |
| `output_schema` | `Record<string, any>` | No | Describe the output schema for the function so the agent handle its response |
| `parent_agents` | `any[]` | No | Parent agents |
| `project_id` | `string` | No |  |
| `provide_citations` | `boolean` | No | Whether the agent should provide in-response citations |
| `reasoning_effort` | `string` | No | The reasoning effort for the agent |
| `region` | `string` | No | Region code |
| `retrieval_method` | `string` | No | - RETRIEVAL_METHOD_UNKNOWN: The retrieval method is unknown - RETRIEVAL_METHOD_REWRITE: The retrieval method is rewrite - RETRIEVAL_METHOD_STEP_BACK: The retrieval method is step back - RETRIEVAL_METHOD_SUB_QUERIES: The retrieval method is… |
| `route_created_at` | `string` | No | Creation of route date / time |
| `route_created_by` | `string` | No |  |
| `route_name` | `string` | No | Route name |
| `route_uuid` | `string` | No |  |
| `tags` | `any[]` | No | Agent tag to organize related resources |
| `temperature` | `number` | No |  |
| `template` | `Record<string, any>` | No | Represents an AgentTemplate entity |
| `thinking_token_budget` | `number` | No | The thinking token budget for Anthropic extended thinking (0 = disabled) |
| `top_p` | `number` | No |  |
| `updated_at` | `string` | No | Last modified |
| `url` | `string` | No | Access your agent under this url |
| `user_id` | `string` | No | Id of user that created the agent |
| `uuid` | `string` | No | Unique agent id |
| `version_hash` | `string` | No | The latest version of the agent |
| `vpc_egress_ips` | `any[]` | No | VPC Egress IPs |
| `vpc_uuid` | `string` | No |  |
| `web_fetch_enabled` | `boolean` | No | Whether this agent can use the built-in web_fetch tool. |
| `web_search_enabled` | `boolean` | No | Whether this agent can use the built-in web_search tool. |
| `workspace` | `Record<string, any>` | No |  |

### Operations

#### `update(data: object, ctrl?: object)`

Update an existing entity. The data must include the entity `id`.

```ts
const result = await client.ApiUpdateAgentFunctionOutput().update({
  agent_id: 'agent_id',
  function_uuid: 'function_uuid',
  // Fields to update
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ApiUpdateAgentFunctionOutputEntity` instance with the same client and
options.

#### `client()`

Return the parent `DigitaloceanSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ApiUpdateAgentOutputEntity

```ts
const api_update_agent_output = client.ApiUpdateAgentOutput()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `agent_log_insights_enabled` | `boolean` | No |  |
| `allowed_domains` | `any[]` | No | Optional list of allowed domains for the chatbot - Must use fully qualified domain name (FQDN) such as https://example.com |
| `anthropic_api_key` | `Record<string, any>` | No | Anthropic API Key Info |
| `anthropic_key_uuid` | `string` | No | Optional anthropic key uuid for use with anthropic models |
| `api_key_infos` | `any[]` | No | Api key infos |
| `api_keys` | `any[]` | No | Api keys |
| `chatbot` | `Record<string, any>` | No | A Chatbot |
| `chatbot_identifiers` | `any[]` | No | Chatbot identifiers |
| `child_agents` | `any[]` | No | Child agents |
| `clear_mcp_servers` | `boolean` | No | When true, removes all MCP servers from the agent. |
| `conversation_logs_enabled` | `boolean` | No | Whether conversation logs are enabled for the agent |
| `created_at` | `string` | No | Creation date / time |
| `deployment` | `Record<string, any>` | No | Description of deployment |
| `description` | `string` | No | Description of agent |
| `functions` | `any[]` | No |  |
| `guardrails` | `any[]` | No | The guardrails the agent is attached to |
| `if_case` | `string` | No |  |
| `instruction` | `string` | No | Agent instruction. |
| `k` | `number` | No | How many results should be considered from an attached knowledge base |
| `knowledge_bases` | `any[]` | No | Knowledge bases |
| `logging_config` | `Record<string, any>` | No |  |
| `max_tokens` | `number` | No | Specifies the maximum number of tokens the model can process in a single input or output, set as a number between 1 and 512. |
| `mcp_servers` | `any[]` | No | MCP (Model Context Protocol) servers attached to this agent |
| `model` | `Record<string, any>` | No | Description of a Model |
| `model_provider_key` | `Record<string, any>` | No |  |
| `model_provider_key_uuid` | `string` | No | Optional Model Provider uuid for use with provider models |
| `model_router` | `Record<string, any>` | No | Model router |
| `model_router_uuid` | `string` | No |  |
| `model_uuid` | `string` | No | Identifier for the foundation model. |
| `name` | `string` | No | Agent name |
| `open_ai_key_uuid` | `string` | No | Optional OpenAI key uuid for use with OpenAI models |
| `openai_api_key` | `Record<string, any>` | No | OpenAI API Key Info |
| `parent_agents` | `any[]` | No | Parent agents |
| `project_id` | `string` | No | The id of the DigitalOcean project this agent will belong to |
| `provide_citations` | `boolean` | No | Whether the agent should provide in-response citations |
| `reasoning_effort` | `string` | No | The reasoning effort for the agent |
| `region` | `string` | No | Region code |
| `retrieval_method` | `string` | No | - RETRIEVAL_METHOD_UNKNOWN: The retrieval method is unknown - RETRIEVAL_METHOD_REWRITE: The retrieval method is rewrite - RETRIEVAL_METHOD_STEP_BACK: The retrieval method is step back - RETRIEVAL_METHOD_SUB_QUERIES: The retrieval method is… |
| `route_created_at` | `string` | No | Creation of route date / time |
| `route_created_by` | `string` | No |  |
| `route_name` | `string` | No | Route name |
| `route_uuid` | `string` | No |  |
| `router_preset_slug` | `string` | No |  |
| `tags` | `any[]` | No | Agent tag to organize related resources |
| `temperature` | `number` | No | Controls the model’s creativity, specified as a number between 0 and 1. |
| `template` | `Record<string, any>` | No | Represents an AgentTemplate entity |
| `thinking_token_budget` | `number` | No | The thinking token budget for Anthropic extended thinking (0 = disabled) |
| `top_p` | `number` | No | Defines the cumulative probability threshold for word selection, specified as a number between 0 and 1. |
| `updated_at` | `string` | No | Last modified |
| `url` | `string` | No | Access your agent under this url |
| `user_id` | `string` | No | Id of user that created the agent |
| `uuid` | `string` | No | Unique agent id |
| `version_hash` | `string` | No | The latest version of the agent |
| `vpc_egress_ips` | `any[]` | No | VPC Egress IPs |
| `vpc_uuid` | `string` | No |  |
| `web_fetch_enabled` | `boolean` | No | Whether this agent can use the built-in web_fetch tool. |
| `web_search_enabled` | `boolean` | No | Whether this agent can use the built-in web_search tool. |
| `workspace` | `Record<string, any>` | No |  |

### Operations

#### `update(data: object, ctrl?: object)`

Update an existing entity. The data must include the entity `id`.

```ts
const result = await client.ApiUpdateAgentOutput().update({
  uuid: 'uuid',
  // Fields to update
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ApiUpdateAgentOutputEntity` instance with the same client and
options.

#### `client()`

Return the parent `DigitaloceanSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ApiUpdateAnthropicApiKeyOutputEntity

```ts
const api_update_anthropic_api_key_output = client.ApiUpdateAnthropicApiKeyOutput()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `api_key` | `string` | No | Anthropic API key |
| `api_key_uuid` | `string` | No | API key ID |
| `created_at` | `string` | No | Key creation date |
| `created_by` | `string` | No | Created by user id from DO |
| `deleted_at` | `string` | No | Key deleted date |
| `name` | `string` | No | Name |
| `updated_at` | `string` | No | Key last updated date |
| `uuid` | `string` | No | Uuid |

### Operations

#### `update(data: object, ctrl?: object)`

Update an existing entity. The data must include the entity `id`.

```ts
const result = await client.ApiUpdateAnthropicApiKeyOutput().update({
  api_key_uuid: 'api_key_uuid',
  // Fields to update
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ApiUpdateAnthropicApiKeyOutputEntity` instance with the same client and
options.

#### `client()`

Return the parent `DigitaloceanSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ApiUpdateCustomEvaluationMetricOutputEntity

```ts
const api_update_custom_evaluation_metric_output = client.ApiUpdateCustomEvaluationMetricOutput()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `associated_presets` | `any[]` | No | Saved model evaluation presets that reference this metric. |
| `category` | `string` | No |  |
| `config` | `Record<string, any>` | No | Configuration for a custom model-evaluation metric scored by an LLM judge. |
| `custom_eval_config` | `Record<string, any>` | No | Configuration for a custom model-evaluation metric scored by an LLM judge. |
| `description` | `string` | No |  |
| `evaluation_scope` | `string` | No | Scope that determines whether a metric belongs to agent evaluation or model evaluation. |
| `inverted` | `boolean` | No | If true, the metric is inverted, meaning that a lower value is better. |
| `is_metric_goal` | `boolean` | No |  |
| `metric_name` | `string` | No |  |
| `metric_rank` | `number` | No |  |
| `metric_type` | `string` | No |  |
| `metric_uuid` | `string` | No |  |
| `metric_value_type` | `string` | No |  |
| `range_max` | `number` | No | The maximum value for the metric. |
| `range_min` | `number` | No | The minimum value for the metric. |
| `source` | `string` | No | Distinguishes platform catalog metrics from user-defined LLM-as-judge metrics. |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.ApiUpdateCustomEvaluationMetricOutput().create({
})
```

#### `update(data: object, ctrl?: object)`

Update an existing entity. The data must include the entity `id`.

```ts
const result = await client.ApiUpdateCustomEvaluationMetricOutput().update({
  metric_uuid: 'metric_uuid',
  // Fields to update
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ApiUpdateCustomEvaluationMetricOutputEntity` instance with the same client and
options.

#### `client()`

Return the parent `DigitaloceanSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ApiUpdateEvaluationTestCaseOutputEntity

```ts
const api_update_evaluation_test_case_output = client.ApiUpdateEvaluationTestCaseOutput()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `dataset_uuid` | `string` | No | Dataset against which the test‑case is executed. |
| `description` | `string` | No | Description of the test case. |
| `metrics` | `Record<string, any>` | No |  |
| `name` | `string` | No | Name of the test case. |
| `star_metric` | `Record<string, any>` | No |  |
| `test_case_uuid` | `string` | No | Test-case UUID to update |
| `version` | `number` | No | The new verson of the test case. |

### Operations

#### `update(data: object, ctrl?: object)`

Update an existing entity. The data must include the entity `id`.

```ts
const result = await client.ApiUpdateEvaluationTestCaseOutput().update({
  test_case_uuid: 'test_case_uuid',
  // Fields to update
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ApiUpdateEvaluationTestCaseOutputEntity` instance with the same client and
options.

#### `client()`

Return the parent `DigitaloceanSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ApiUpdateKnowledgeBaseDataSourceOutputEntity

```ts
const api_update_knowledge_base_data_source_output = client.ApiUpdateKnowledgeBaseDataSourceOutput()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `aws_data_source` | `Record<string, any>` | No | AWS S3 Data Source for Display |
| `bucket_name` | `string` | No | Name of storage bucket - Deprecated, moved to data_source_details |
| `chunking_algorithm` | `string` | No |  |
| `chunking_options` | `Record<string, any>` | No |  |
| `created_at` | `string` | No | Creation date / time |
| `data_source_uuid` | `string` | No | Data Source ID (Path Parameter) |
| `dropbox_data_source` | `Record<string, any>` | No | Dropbox Data Source for Display |
| `file_upload_data_source` | `Record<string, any>` | No | File to upload as data source for knowledge base. |
| `google_drive_data_source` | `Record<string, any>` | No | Google Drive Data Source for Display |
| `item_path` | `string` | No | Path of folder or object in bucket - Deprecated, moved to data_source_details |
| `knowledge_base_uuid` | `string` | No | Knowledge Base ID (Path Parameter) |
| `last_datasource_indexing_job` | `Record<string, any>` | No |  |
| `region` | `string` | No | Region code - Deprecated, moved to data_source_details |
| `spaces_data_source` | `Record<string, any>` | No | Spaces Bucket Data Source |
| `updated_at` | `string` | No | Last modified |
| `uuid` | `string` | No | Unique id of knowledge base |
| `web_crawler_data_source` | `Record<string, any>` | No | WebCrawlerDataSource |

### Operations

#### `update(data: object, ctrl?: object)`

Update an existing entity. The data must include the entity `id`.

```ts
const result = await client.ApiUpdateKnowledgeBaseDataSourceOutput().update({
  data_source_uuid: 'data_source_uuid',
  knowledge_base_id: 'knowledge_base_id',
  // Fields to update
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ApiUpdateKnowledgeBaseDataSourceOutputEntity` instance with the same client and
options.

#### `client()`

Return the parent `DigitaloceanSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ApiUpdateKnowledgeBaseOutputEntity

```ts
const api_update_knowledge_base_output = client.ApiUpdateKnowledgeBaseOutput()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `added_to_agent_at` | `string` | No | Time when the knowledge base was added to the agent |
| `created_at` | `string` | No | Creation date / time |
| `database_id` | `string` | No | Identifier of the DigitalOcean OpenSearch database this knowledge base will use, optional. |
| `datasources` | `any[]` | No | Optional data sources to attach at creation. |
| `embedding_model_uuid` | `string` | No | Identifier for the [embedding model](https://docs.digitalocean.com/products/genai-platform/details/models/#embedding-models). |
| `is_public` | `boolean` | No | Whether the knowledge base is public or not |
| `last_indexing_job` | `Record<string, any>` | No | IndexingJob description |
| `name` | `string` | No | Name of knowledge base |
| `project_id` | `string` | No | Identifier of the DigitalOcean project this knowledge base will belong to. |
| `region` | `string` | No | Region code |
| `reranking_config` | `Record<string, any>` | No | Configuration for cross-encoder reranking during retrieval. |
| `size` | `string` | No |  |
| `tags` | `any[]` | No | Tags to organize related resources |
| `updated_at` | `string` | No | Last modified |
| `user_id` | `string` | No | Id of user that created the knowledge base |
| `uuid` | `string` | No | Unique id for knowledge base |
| `vpc_uuid` | `string` | No | The VPC to deploy the knowledge base database in |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.ApiUpdateKnowledgeBaseOutput().create({
})
```

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.ApiUpdateKnowledgeBaseOutput().list()
```

#### `update(data: object, ctrl?: object)`

Update an existing entity. The data must include the entity `id`.

```ts
const result = await client.ApiUpdateKnowledgeBaseOutput().update({
  uuid: 'uuid',
  // Fields to update
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ApiUpdateKnowledgeBaseOutputEntity` instance with the same client and
options.

#### `client()`

Return the parent `DigitaloceanSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ApiUpdateLinkedAgentOutputEntity

```ts
const api_update_linked_agent_output = client.ApiUpdateLinkedAgentOutput()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `child_agent_uuid` | `string` | No | Routed agent id |
| `if_case` | `string` | No | Describes the case in which the child agent should be used |
| `parent_agent_uuid` | `string` | No | A unique identifier for the parent agent. |
| `rollback` | `boolean` | No |  |
| `route_name` | `string` | No | Route name |
| `uuid` | `string` | No | Unique id of linkage |

### Operations

#### `update(data: object, ctrl?: object)`

Update an existing entity. The data must include the entity `id`.

```ts
const result = await client.ApiUpdateLinkedAgentOutput().update({
  agent_id: 'agent_id',
  child_agent_uuid: 'child_agent_uuid',
  // Fields to update
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ApiUpdateLinkedAgentOutputEntity` instance with the same client and
options.

#### `client()`

Return the parent `DigitaloceanSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ApiUpdateModelApiKeyOutputEntity

```ts
const api_update_model_api_key_output = client.ApiUpdateModelApiKeyOutput()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `api_key_uuid` | `string` | No | API key ID |
| `created_at` | `string` | No | Creation date |
| `created_by` | `string` | No | Created by |
| `deleted_at` | `string` | No | Deleted date |
| `name` | `string` | No | Name |
| `secret_key` | `string` | No |  |
| `uuid` | `string` | No | Uuid |

### Operations

#### `update(data: object, ctrl?: object)`

Update an existing entity. The data must include the entity `id`.

```ts
const result = await client.ApiUpdateModelApiKeyOutput().update({
  api_key_uuid: 'api_key_uuid',
  // Fields to update
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ApiUpdateModelApiKeyOutputEntity` instance with the same client and
options.

#### `client()`

Return the parent `DigitaloceanSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ApiUpdateModelEvaluationRunOutputEntity

```ts
const api_update_model_evaluation_run_output = client.ApiUpdateModelEvaluationRunOutput()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `candidate_inference_config` | `Record<string, any>` | No | Inference configuration for the candidate model during evaluation. |
| `candidate_model_name` | `string` | No | Model slug used to call the candidate model API. |
| `candidate_model_source` | `string` | No | Whether the candidate is a served model (serverless platform, a dedicated deployment, or a model router) or an OHS-hosted agent config. |
| `candidate_model_uuid` | `string` | No | UUID of the candidate model to evaluate. |
| `created_at` | `string` | No | Timestamp when the run was created. |
| `dataset_name` | `string` | No | Name of the dataset used for evaluation. |
| `dataset_uuid` | `string` | No | UUID of the dataset to use for evaluation. |
| `epochs` | `number` | No | Number of times to evaluate each dataset row (n-pass/epochs), so the result reports avg@k/pass@k/cons@k instead of a single score. |
| `eval_preset_uuid` | `string` | No |  |
| `eval_run_uuid` | `string` | No | UUID of the created evaluation run. |
| `judge_model_name` | `string` | No |  |
| `judge_model_uuid` | `string` | No | UUID of the judge model used to score responses. |
| `metric_uuids` | `any[]` | No | UUIDs of metrics to evaluate (selected from ListModelEvaluationMetrics). |
| `name` | `string` | No | Name of the evaluation run. |
| `preset_name` | `string` | No |  |
| `preset_save_sections` | `any[]` | No | Which sections of this run's resolved configuration to persist as a reusable preset. |
| `progress` | `Record<string, any>` | No | Per-phase progress for a model evaluation run. |
| `save_as_preset` | `boolean` | No | Deprecated: use `preset_save_sections`. |
| `source` | `string` | No | Source of the run creation (api, sdk, cli). |
| `star_metric` | `Record<string, any>` | No |  |
| `status` | `string` | No | Model Evaluation Run Statuses |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.ApiUpdateModelEvaluationRunOutput().create({
})
```

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.ApiUpdateModelEvaluationRunOutput().list()
```

#### `update(data: object, ctrl?: object)`

Update an existing entity. The data must include the entity `id`.

```ts
const result = await client.ApiUpdateModelEvaluationRunOutput().update({
  eval_run_uuid: 'eval_run_uuid',
  // Fields to update
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ApiUpdateModelEvaluationRunOutputEntity` instance with the same client and
options.

#### `client()`

Return the parent `DigitaloceanSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ApiUpdateModelRouterOutputEntity

```ts
const api_update_model_router_output = client.ApiUpdateModelRouterOutput()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `config` | `Record<string, any>` | No |  |
| `created_at` | `string` | No | Creation date / time |
| `description` | `string` | No | Description |
| `fallback_models` | `any[]` | No |  |
| `name` | `string` | No | Name of the model router |
| `policies` | `any[]` | No | Router policies |
| `regions` | `any[]` | No | Target regions for the router |
| `updated_at` | `string` | No | Last modified |
| `uuid` | `string` | No | Unique id |

### Operations

#### `update(data: object, ctrl?: object)`

Update an existing entity. The data must include the entity `id`.

```ts
const result = await client.ApiUpdateModelRouterOutput().update({
  uuid: 'uuid',
  // Fields to update
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ApiUpdateModelRouterOutputEntity` instance with the same client and
options.

#### `client()`

Return the parent `DigitaloceanSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ApiUpdateOpenAiapiKeyOutputEntity

```ts
const api_update_open_aiapi_key_output = client.ApiUpdateOpenAiapiKeyOutput()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `api_key` | `string` | No | OpenAI API key |
| `api_key_uuid` | `string` | No | API key ID |
| `created_at` | `string` | No | Key creation date |
| `created_by` | `string` | No | Created by user id from DO |
| `deleted_at` | `string` | No | Key deleted date |
| `models` | `any[]` | No | Models supported by the openAI api key |
| `name` | `string` | No | Name |
| `updated_at` | `string` | No | Key last updated date |
| `uuid` | `string` | No | Uuid |

### Operations

#### `update(data: object, ctrl?: object)`

Update an existing entity. The data must include the entity `id`.

```ts
const result = await client.ApiUpdateOpenAiapiKeyOutput().update({
  api_key_uuid: 'api_key_uuid',
  // Fields to update
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ApiUpdateOpenAiapiKeyOutputEntity` instance with the same client and
options.

#### `client()`

Return the parent `DigitaloceanSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ApiUpdateScenarioSetOutputEntity

```ts
const api_update_scenario_set_output = client.ApiUpdateScenarioSetOutput()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `bucket_name` | `string` | No | Object storage bucket holding the scenario file. |
| `bucket_region` | `string` | No | Object storage bucket region. |
| `created_at` | `string` | No | Time created at. |
| `deleted_at` | `string` | No | Time deleted at. |
| `description` | `string` | No | Customer-supplied description. |
| `failure_reason` | `string` | No | Human-readable explanation of a terminal FAILED status. |
| `generator_model_uuid` | `string` | No | Model that produced the scenarios. |
| `library_scenario_uuid` | `string` | No | UUID of the source library entry. |
| `name` | `string` | No | Customer-supplied name. |
| `scenario_count` | `number` | No | Number of scenarios in the set. |
| `scenario_set_uuid` | `string` | No | UUID of the scenario set. |
| `scenarios` | `any[]` | No | Optional inline scenarios to replace the set contents. |
| `source_export_id` | `string` | No | Signals export UUID that produced this set. |
| `source_goal_description` | `string` | No | The goal that drove generation. |
| `source_kind` | `string` | No | How a scenario set was created. |
| `spaces_key` | `string` | No | Object storage key for the scenario file. |
| `status` | `string` | No | Lifecycle status of a scenario set. |
| `updated_at` | `string` | No | Time last updated at. |
| `workflow_uuid` | `string` | No | Identifier of the generation workflow. |

### Operations

#### `update(data: object, ctrl?: object)`

Update an existing entity. The data must include the entity `id`.

```ts
const result = await client.ApiUpdateScenarioSetOutput().update({
  scenario_set_uuid: 'scenario_set_uuid',
  // Fields to update
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ApiUpdateScenarioSetOutputEntity` instance with the same client and
options.

#### `client()`

Return the parent `DigitaloceanSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ApiUpdateSimulationRunOutputEntity

```ts
const api_update_simulation_run_output = client.ApiUpdateSimulationRunOutput()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `agent_config` | `Record<string, any>` | No | Configuration of the candidate agent under test for a simulation run. |
| `created_at` | `string` | No | Time created at. |
| `created_by_user_email` | `string` | No | Email of the user who triggered this run. |
| `created_by_user_id` | `string` | No | User id of the actor who triggered this run. |
| `deleted_at` | `string` | No | Time deleted at. |
| `evaluation_config` | `Record<string, any>` | No | Optional configuration that opts a simulation run into an evaluation. |
| `evaluation_run_uuid` | `string` | No | UUID of the evaluation run reserved for this simulation, when the create request included evaluation_config. |
| `exploration_budget` | `number` | No | Optional run-level journeys-per-scenario override. |
| `failure_reason` | `string` | No | Human-readable explanation of a terminal FAILED status. |
| `journeys_finished` | `number` | No | Number of journeys that have finished (successfully or not). |
| `judge_model_name` | `string` | No | Display name of the judge model (from the model catalog). |
| `judge_model_uuid` | `string` | No | Model used by the judge. |
| `max_turns` | `number` | No | Optional run-level turn budget. |
| `name` | `string` | No | Optional run name. |
| `result_summary` | `Record<string, any>` | No | Aggregated final result of a simulation run: verdict counts plus token and duration totals. |
| `run_uuid` | `string` | No | UUID of the run. |
| `scenario_count` | `number` | No | Number of scenarios in the scenario set for this run. |
| `scenario_set_uuid` | `string` | No | UUID of the scenario set being executed (must exist at run create). |
| `status` | `string` | No | Lifecycle status of a simulation run. |
| `total_journeys` | `number` | No | Total number of journeys (sum of exploration budgets). |
| `updated_at` | `string` | No | Time last updated at. |
| `user_simulator_config` | `Record<string, any>` | No | Optional user simulator model settings such as temperature and max_tokens. |
| `user_simulator_model_name` | `string` | No | Display name of the user simulator model (from the model catalog). |
| `user_simulator_model_uuid` | `string` | No | Model used by the user simulator. |
| `workflow_uuid` | `string` | No | Identifier of the workflow executing this run. |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.ApiUpdateSimulationRunOutput().create({
})
```

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.ApiUpdateSimulationRunOutput().list()
```

#### `update(data: object, ctrl?: object)`

Update an existing entity. The data must include the entity `id`.

```ts
const result = await client.ApiUpdateSimulationRunOutput().update({
  run_uuid: 'run_uuid',
  // Fields to update
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ApiUpdateSimulationRunOutputEntity` instance with the same client and
options.

#### `client()`

Return the parent `DigitaloceanSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ApiUpdateWorkspaceOutputEntity

```ts
const api_update_workspace_output = client.ApiUpdateWorkspaceOutput()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `agents` | `any[]` | No | Agents |
| `created_at` | `string` | No | Creation date |
| `created_by` | `string` | No | The id of user who created this workspace |
| `created_by_email` | `string` | No | The email of the user who created this workspace |
| `deleted_at` | `string` | No | Deleted date |
| `description` | `string` | No | Description of the workspace |
| `evaluation_test_cases` | `any[]` | No | Evaluations |
| `name` | `string` | No | Name of the workspace |
| `updated_at` | `string` | No | Update date |
| `uuid` | `string` | No | Unique id |
| `workspace_uuid` | `string` | No | Workspace UUID. |

### Operations

#### `update(data: object, ctrl?: object)`

Update an existing entity. The data must include the entity `id`.

```ts
const result = await client.ApiUpdateWorkspaceOutput().update({
  workspace_uuid: 'workspace_uuid',
  // Fields to update
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ApiUpdateWorkspaceOutputEntity` instance with the same client and
options.

#### `client()`

Return the parent `DigitaloceanSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## AppEntity

```ts
const app = client.App()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `active_deployment` | `Record<string, any>` | No |  |
| `autoscaling` | `Record<string, any>` | No | Autoscaling event details. |
| `created_at` | `string` | No |  |
| `dedicated_ips` | `any[]` | No |  |
| `default_ingress` | `string` | No |  |
| `deployment` | `Record<string, any>` | No |  |
| `deployment_id` | `string` | No | For deployment events, this is the same as the deployment's ID. |
| `domains` | `any[]` | No |  |
| `id` | `string` | No |  |
| `in_progress_deployment` | `Record<string, any>` | No |  |
| `last_deployment_created_at` | `string` | No |  |
| `live_domain` | `string` | No |  |
| `live_url` | `string` | No |  |
| `live_url_base` | `string` | No |  |
| `owner_uuid` | `string` | No |  |
| `pending_deployment` | `any` | No |  |
| `pinned_deployment` | `any` | No |  |
| `project_id` | `string` | No | Requires `project:read` scope. |
| `region` | `Record<string, any>` | No |  |
| `spec` | `Record<string, any>` | Yes | The desired configuration of an application. |
| `tier_slug` | `string` | No |  |
| `type` | `string` | No | The type of event |
| `update_all_source_versions` | `boolean` | No | Whether or not to update the source versions (for example fetching a new commit or image digest) of all components. |
| `updated_at` | `string` | No |  |
| `vpc` | `Record<string, any>` | No |  |

### Actions

This entity exposes custom API actions in addition to the standard
operations. Select one with `$action` in the call's argument; the
remaining keys are sent as that action's payload.

| Action | Route | Call |
| --- | --- | --- |
| `cancel` | `/v2/apps/{app_id}/events/{event_id}/cancel` | `client.App().create({ $action: 'cancel', ... })` |
| `rollback_commit` | `/v2/apps/{app_id}/rollback/commit` | `client.App().create({ $action: 'rollback_commit', ... })` |
| `rollback_validate` | `/v2/apps/{app_id}/rollback/validate` | `client.App().create({ $action: 'rollback_validate', ... })` |

An action returns that action's OWN response, which is not necessarily a
App record — check the API definition for its shape.

```ts
const result = await client.App().create({
  $action: 'cancel',
  /* ...the action's own arguments */
})
```

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.App().create({
  spec: {},
})
```

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.App().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.App().load({ id: 'app_id' })
```

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria.

```ts
const result = await client.App().remove({ id: 'app_id' })
```

#### `update(data: object, ctrl?: object)`

Update an existing entity. The data must include the entity `id`.

```ts
const result = await client.App().update({
  id: 'app_id',
  // Fields to update
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `AppEntity` instance with the same client and
options.

#### `client()`

Return the parent `DigitaloceanSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## AppAlertEntity

```ts
const app_alert = client.AppAlert()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `component_name` | `string` | No |  |
| `emails` | `any[]` | No |  |
| `id` | `string` | No |  |
| `phase` | `string` | No |  |
| `progress` | `Record<string, any>` | No |  |
| `slack_webhooks` | `any[]` | No |  |
| `spec` | `Record<string, any>` | No |  |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.AppAlert().create({
  alert_id: 'example_alert_id',
  app_id: 'example_app_id',
})
```

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.AppAlert().list({ id: "example" })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `AppAlertEntity` instance with the same client and
options.

#### `client()`

Return the parent `DigitaloceanSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## AppEventEntity

```ts
const app_event = client.AppEvent()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `autoscaling` | `Record<string, any>` | No | Autoscaling event details. |
| `created_at` | `string` | No |  |
| `deployment` | `Record<string, any>` | No |  |
| `deployment_id` | `string` | No | For deployment events, this is the same as the deployment's ID. |
| `id` | `string` | No |  |
| `type` | `string` | No | The type of event |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.AppEvent().list({ id: "example" })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `AppEventEntity` instance with the same client and
options.

#### `client()`

Return the parent `DigitaloceanSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## AppHealthEntity

```ts
const app_health = client.AppHealth()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `components` | `any[]` | No |  |
| `functions_components` | `any[]` | No |  |
| `id` | `string` | No |  |

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.AppHealth().load({ id: 'app_health_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `AppHealthEntity` instance with the same client and
options.

#### `client()`

Return the parent `DigitaloceanSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## AppInstanceEntity

```ts
const app_instance = client.AppInstance()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `component_name` | `string` | No | Name of the component, from the app spec. |
| `component_type` | `string` | No | Supported compute component by DigitalOcean App Platform. |
| `id` | `string` | No |  |
| `instance_alias` | `string` | No | Readable identifier, an alias of the instance name, reference for mapping insights to instance names. |
| `instance_name` | `string` | No | Name of the instance, which is a unique identifier for the instance. |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.AppInstance().list({ id: "example" })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `AppInstanceEntity` instance with the same client and
options.

#### `client()`

Return the parent `DigitaloceanSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## AppJobInvocationEntity

```ts
const app_job_invocation = client.AppJobInvocation()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `completed_at` | `string` | No |  |
| `created_at` | `string` | No |  |
| `deployment_id` | `string` | No |  |
| `id` | `string` | No |  |
| `job_name` | `string` | No |  |
| `phase` | `string` | No | The phase of the job invocation |
| `started_at` | `string` | No |  |
| `trigger` | `Record<string, any>` | No |  |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.AppJobInvocation().create({
  app_id: 'example_app_id',
  job_invocation_id: 'example_job_invocation_id',
})
```

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.AppJobInvocation().list({ id: "example_id" })
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.AppJobInvocation().load({ id: 'app_job_invocation_id', app_id: 'app_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `AppJobInvocationEntity` instance with the same client and
options.

#### `client()`

Return the parent `DigitaloceanSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## AppMetricsBandwidthUsageEntity

```ts
const app_metrics_bandwidth_usage = client.AppMetricsBandwidthUsage()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `app_bandwidth_usage` | `any[]` | No | A list of bandwidth usage details by app. |
| `app_id` | `string` | No | The ID of the app. |
| `app_ids` | `any[]` | Yes | A list of app IDs to query bandwidth metrics for. |
| `bandwidth_bytes` | `string` | No | The used bandwidth amount in bytes. |
| `date` | `string` | No | The date for the metrics data. |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.AppMetricsBandwidthUsage().create({
  app_ids: [],
})
```

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.AppMetricsBandwidthUsage().list({ app_id: "example" })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `AppMetricsBandwidthUsageEntity` instance with the same client and
options.

#### `client()`

Return the parent `DigitaloceanSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## AppProposeEntity

```ts
const app_propose = client.AppPropose()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `app_cost` | `number` | No | The monthly cost of the proposed app in USD. |
| `app_id` | `string` | No | An optional ID of an existing app. |
| `app_is_static` | `boolean` | No | Indicates whether the app is a static app. |
| `app_name_available` | `boolean` | No | Indicates whether the app name is available. |
| `app_name_suggestion` | `string` | No | The suggested name if the proposed app name is unavailable. |
| `app_tier_downgrade_cost` | `number` | No | The monthly cost of the proposed app in USD using the previous pricing plan tier. |
| `existing_static_apps` | `string` | No | The maximum number of free static apps the account can have. |
| `spec` | `Record<string, any>` | Yes | The desired configuration of an application. |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.AppPropose().create({
  spec: {},
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `AppProposeEntity` instance with the same client and
options.

#### `client()`

Return the parent `DigitaloceanSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## AppsDeploymentEntity

```ts
const apps_deployment = client.AppsDeployment()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `cause` | `string` | No |  |
| `cloned_from` | `string` | No |  |
| `components` | `any[]` | No |  |
| `created_at` | `string` | No |  |
| `deployment_id` | `string` | No | The ID of the deployment to rollback to. |
| `force_build` | `boolean` | No |  |
| `functions` | `any[]` | No |  |
| `id` | `string` | No |  |
| `jobs` | `any[]` | No |  |
| `phase` | `string` | No |  |
| `phase_last_updated_at` | `string` | No |  |
| `progress` | `Record<string, any>` | No |  |
| `services` | `any[]` | No |  |
| `skip_pin` | `boolean` | No | Whether to skip pinning the rollback deployment. |
| `spec` | `Record<string, any>` | Yes | The desired configuration of an application. |
| `static_sites` | `any[]` | No |  |
| `tier_slug` | `string` | No |  |
| `updated_at` | `string` | No |  |
| `workers` | `any[]` | No |  |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.AppsDeployment().create({
  app_id: 'example_app_id',
  spec: {},
})
```

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.AppsDeployment().list({ app_id: "example" })
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.AppsDeployment().load({ id: 'apps_deployment_id', app_id: 'app_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `AppsDeploymentEntity` instance with the same client and
options.

#### `client()`

Return the parent `DigitaloceanSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## AppsGetExecEntity

```ts
const apps_get_exec = client.AppsGetExec()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `url` | `string` | No | A websocket URL that allows sending/receiving console input and receiving console output. |

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.AppsGetExec().load({ app_id: 'app_id', component_name: 'component_name' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `AppsGetExecEntity` instance with the same client and
options.

#### `client()`

Return the parent `DigitaloceanSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## AppsGetLogEntity

```ts
const apps_get_log = client.AppsGetLog()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `historic_urls` | `any[]` | No |  |
| `live_url` | `string` | No | A URL of the real-time live logs. |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.AppsGetLog().list({ app_id: "example", type: "example" })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `AppsGetLogEntity` instance with the same client and
options.

#### `client()`

Return the parent `DigitaloceanSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## AppsInstanceSizeEntity

```ts
const apps_instance_size = client.AppsInstanceSize()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `bandwidth_allowance_gib` | `string` | No |  |
| `cpu_type` | `string` | No |  |
| `cpus` | `string` | No |  |
| `deprecation_intent` | `boolean` | No |  |
| `id` | `string` | No |  |
| `memory_bytes` | `string` | No |  |
| `name` | `string` | No |  |
| `scalable` | `boolean` | No |  |
| `single_instance_only` | `boolean` | No |  |
| `slug` | `string` | No |  |
| `tier_downgrade_to` | `string` | No |  |
| `tier_slug` | `string` | No |  |
| `tier_upgrade_to` | `string` | No |  |
| `usd_per_month` | `string` | No |  |
| `usd_per_second` | `string` | No |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.AppsInstanceSize().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.AppsInstanceSize().load({ id: 'apps_instance_size_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `AppsInstanceSizeEntity` instance with the same client and
options.

#### `client()`

Return the parent `DigitaloceanSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## AppsRegionEntity

```ts
const apps_region = client.AppsRegion()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `continent` | `string` | No |  |
| `data_centers` | `any[]` | No |  |
| `default` | `boolean` | No | Whether or not the region is presented as the default. |
| `disabled` | `boolean` | No |  |
| `flag` | `string` | No |  |
| `label` | `string` | No |  |
| `reason` | `string` | No |  |
| `slug` | `string` | No |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.AppsRegion().list()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `AppsRegionEntity` instance with the same client and
options.

#### `client()`

Return the parent `DigitaloceanSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## AssociatedKubernetesResourceEntity

```ts
const associated_kubernetes_resource = client.AssociatedKubernetesResource()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `load_balancers` | `any[]` | No | A list of names and IDs for associated load balancers that can be destroyed along with the cluster. |
| `volume_snapshots` | `any[]` | No | A list of names and IDs for associated volume snapshots that can be destroyed along with the cluster. |
| `volumes` | `any[]` | No | A list of names and IDs for associated volumes that can be destroyed along with the cluster. |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.AssociatedKubernetesResource().list({ cluster_id: "example" })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `AssociatedKubernetesResourceEntity` instance with the same client and
options.

#### `client()`

Return the parent `DigitaloceanSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## AssociatedResourceStatusEntity

```ts
const associated_resource_status = client.AssociatedResourceStatus()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `completed_at` | `string` | No | A time value given in ISO8601 combined date and time format indicating when the requested action was completed. |
| `droplet` | `Record<string, any>` | No | An object containing information about a resource scheduled for deletion. |
| `failures` | `number` | No | A count of the associated resources that failed to be destroyed, if any. |
| `resources` | `Record<string, any>` | No | An object containing additional information about resource related to a Droplet requested to be destroyed. |

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.AssociatedResourceStatus().load({ droplet_id: 1 })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `AssociatedResourceStatusEntity` instance with the same client and
options.

#### `client()`

Return the parent `DigitaloceanSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## AsyncInvokeEntity

```ts
const async_invoke = client.AsyncInvoke()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `completed_at` | `string` | No | The timestamp when the job completed. |
| `created_at` | `string` | Yes | The timestamp when the request was created. |
| `error` | `string` | No | Error message if the job failed. |
| `input` | `Record<string, any>` | Yes | The input parameters for the model invocation. |
| `model_id` | `string` | Yes | The model ID that was invoked. |
| `output` | `Record<string, any>` | No | The output of the invocation. |
| `request_id` | `string` | Yes | A unique identifier for the async invocation request. |
| `started_at` | `string` | No | The timestamp when the job started processing. |
| `status` | `string` | Yes | The current status of the async invocation. |
| `tags` | `any[]` | No | An optional list of key-value tags to attach to the invocation request for tracking or categorization. |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.AsyncInvoke().create({
  created_at: 'example_created_at',
  input: {},
  model_id: 'example_model_id',
  request_id: 'example_request_id',
  status: 'example_status',
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `AsyncInvokeEntity` instance with the same client and
options.

#### `client()`

Return the parent `DigitaloceanSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## BalanceEntity

```ts
const balance = client.Balance()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `account_balance` | `string` | No | Current balance of the customer's most recent billing activity. |
| `generated_at` | `string` | No | The time at which balances were most recently generated. |
| `month_to_date_balance` | `string` | No | Balance as of the `generated_at` time. |
| `month_to_date_usage` | `string` | No | Amount used in the current billing period as of the `generated_at` time. |

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Balance().load()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `BalanceEntity` instance with the same client and
options.

#### `client()`

Return the parent `DigitaloceanSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## BatchEntity

```ts
const batch = client.Batch()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `batch_id` | `string` | Yes | Unique identifier for the batch job. |
| `cancelled_at` | `string` | No |  |
| `completed_at` | `string` | No |  |
| `completion_window` | `string` | Yes | Time window in which the job must complete. |
| `created_at` | `string` | Yes |  |
| `endpoint` | `string` | No | Inference endpoint each request is dispatched to. |
| `error_file_id` | `string` | No | Error sidecar file. |
| `errors` | `any[]` | No | Top-level errors that prevented the batch from completing. |
| `expires_at` | `string` | No | Derived from `created_at` plus `completion_window`. |
| `failed_at` | `string` | No |  |
| `file_id` | `string` | Yes | The `file_id` returned by `POST /v1/batches/files`. |
| `finalizing_at` | `string` | No |  |
| `id` | `string` | No |  |
| `in_progress_at` | `string` | No |  |
| `input_file_id` | `string` | Yes | The uploaded JSONL input file. |
| `metadata` | `Record<string, any>` | No | Metadata attached at creation. |
| `output_file_id` | `string` | No | Output JSONL file. |
| `provider` | `string` | Yes | The inference provider whose JSONL schema the input file conforms to. |
| `request_counts` | `Record<string, any>` | No | Aggregate request counts. |
| `request_id` | `string` | No | The idempotency key supplied at creation. |
| `status` | `string` | Yes | Lifecycle status. |

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

### Actions

This entity exposes custom API actions in addition to the standard
operations. Select one with `$action` in the call's argument; the
remaining keys are sent as that action's payload.

| Action | Route | Call |
| --- | --- | --- |
| `cancel` | `/v1/batches/{batch_id}/cancel` | `client.Batch().create({ $action: 'cancel', ... })` |

An action returns that action's OWN response, which is not necessarily a
Batch record — check the API definition for its shape.

```ts
const result = await client.Batch().create({
  $action: 'cancel',
  /* ...the action's own arguments */
})
```

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.Batch().create({
  batch_id: 'example_batch_id',
  completion_window: 'example_completion_window',
  created_at: 'example_created_at',
  file_id: 'example_file_id',
  input_file_id: 'example_input_file_id',
  provider: 'example_provider',
  status: 'example_status',
})
```

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Batch().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Batch().load({ id: 'batch_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `BatchEntity` instance with the same client and
options.

#### `client()`

Return the parent `DigitaloceanSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## BatchFileCreateEntity

```ts
const batch_file_create = client.BatchFileCreate()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `file_name` | `string` | Yes | The file you plan to upload. |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.BatchFileCreate().create({
  file_name: 'example_file_name',
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `BatchFileCreateEntity` instance with the same client and
options.

#### `client()`

Return the parent `DigitaloceanSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## BatchInferenceEntity

```ts
const batch_inference = client.BatchInference()
```

### Operations

#### `update(data: object, ctrl?: object)`

Update an existing entity. The data must include the entity `id`.

```ts
const result = await client.BatchInference().update({
  // Fields to update
})
```

Sends its body unencoded, as `application/octet-stream`: pass it as `$body`, a `Buffer`, `Uint8Array`, `ArrayBuffer`, `Blob`, stream or string. A stream is read in full before the request is sent, so that a retry sends the same bytes.

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `BatchInferenceEntity` instance with the same client and
options.

#### `client()`

Return the parent `DigitaloceanSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## BatchResultEntity

```ts
const batch_result = client.BatchResult()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `batch_id` | `string` | Yes |  |
| `error_file_url` | `string` | No | Presigned URL for the error sidecar JSONL, if any. |
| `expires_at` | `string` | No | When the presigned URLs expire. |
| `id` | `string` | No |  |
| `output_file_url` | `string` | No | Presigned URL for the main results JSONL. |
| `result_available` | `boolean` | Yes | When `false`, keep polling batch status and retry later. |

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.BatchResult().load({ id: 'batch_result_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `BatchResultEntity` instance with the same client and
options.

#### `client()`

Return the parent `DigitaloceanSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## BillingEntity

```ts
const billing = client.Billing()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `amount` | `string` | No | Amount of the billing history entry. |
| `current_page` | `number` | Yes | Current page number |
| `data_points` | `any[]` | Yes | Array of billing data points, which are day-over-day changes in billing resource usage based on nightly invoice item estimates, for the requested period |
| `date` | `string` | No | Time the billing history entry occurred. |
| `description` | `string` | No | Description of the billing history entry. |
| `id` | `string` | No |  |
| `invoice_id` | `string` | No | ID of the invoice associated with the billing history entry, if applicable. |
| `invoice_items` | `any[]` | No |  |
| `invoice_period` | `string` | No | Billing period of usage for which the invoice is issued, in `YYYY-MM` format. |
| `invoice_uuid` | `string` | No | UUID of the invoice associated with the billing history entry, if applicable. |
| `links` | `Record<string, any>` | No |  |
| `meta` | `any` | Yes |  |
| `total_items` | `number` | Yes | Total number of items available across all pages |
| `total_pages` | `number` | Yes | Total number of pages available |
| `type` | `string` | No | Type of billing history entry. |
| `updated_at` | `string` | No | Time the invoice was last updated. |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Billing().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Billing().load({ invoice_uuid: 'invoice_uuid' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `BillingEntity` instance with the same client and
options.

#### `client()`

Return the parent `DigitaloceanSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## BlockStorageEntity

```ts
const block_storage = client.BlockStorage()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `created_at` | `string` | Yes | A time value given in ISO8601 combined date and time format that represents when the snapshot was created. |
| `description` | `string` | No | An optional free-form text field to describe a block storage volume. |
| `droplet_ids` | `any[]` | No | An array containing the IDs of the Droplets the volume is attached to. |
| `filesystem_label` | `string` | No | The label currently applied to the filesystem. |
| `filesystem_type` | `string` | No | The type of filesystem currently in-use on the volume. |
| `id` | `string` | Yes | The unique identifier for the snapshot. |
| `min_disk_size` | `number` | Yes | The minimum size in GB required for a volume or Droplet to use this snapshot. |
| `name` | `string` | Yes | A human-readable name for the snapshot. |
| `region` | `any` | No |  |
| `regions` | `any[]` | Yes | An array of the regions that the snapshot is available in. |
| `resource_id` | `string` | Yes | The unique identifier for the resource that the snapshot originated from. |
| `resource_type` | `string` | Yes | The type of resource that the snapshot originated from. |
| `size_gigabytes` | `number` | Yes | The billable size of the snapshot in gigabytes. |
| `tags` | `any[]` | Yes | An array of Tags the snapshot has been tagged with.<br><br>Requires `tag:read` scope. |
| `volume` | `Record<string, any>` | No |  |

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

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.BlockStorage().create({
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

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.BlockStorage().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.BlockStorage().load({ volume_id: 'volume_id' })
```

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria.

```ts
const result = await client.BlockStorage().remove({ volume_id: 'volume_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `BlockStorageEntity` instance with the same client and
options.

#### `client()`

Return the parent `DigitaloceanSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## BlockStorageActionEntity

```ts
const block_storage_action = client.BlockStorageAction()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `completed_at` | `string` | No | A time value given in ISO8601 combined date and time format that represents when the action was completed. |
| `id` | `number` | No | A unique numeric ID that can be used to identify and reference an action. |
| `region` | `Record<string, any>` | Yes |  |
| `region_slug` | `string` | No | A human-readable string that is used as a unique identifier for each region. |
| `resource_id` | `number` | No | A unique identifier for the resource that the action is associated with. |
| `resource_type` | `string` | No | The type of resource that the action is associated with. |
| `started_at` | `string` | No | A time value given in ISO8601 combined date and time format that represents when the action was initiated. |
| `status` | `string` | No | The current status of the action. |
| `type` | `string` | No | This is the type of action that the object represents. |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.BlockStorageAction().create({
  region: {},
})
```

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.BlockStorageAction().list({ volume_id: "example" })
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.BlockStorageAction().load({ id: 1, volume_id: 'volume_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `BlockStorageActionEntity` instance with the same client and
options.

#### `client()`

Return the parent `DigitaloceanSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ByoipPrefixEntity

```ts
const byoip_prefix = client.ByoipPrefix()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `advertise` | `boolean` | No | Whether the BYOIP prefix should be advertised |
| `advertised` | `boolean` | No | Whether the BYOIP prefix is being advertised |
| `failure_reason` | `string` | No | Reason for failure, if applicable |
| `id` | `string` | No |  |
| `locked` | `boolean` | No | Whether the BYOIP prefix is locked |
| `name` | `string` | No | Name of the BYOIP prefix |
| `prefix` | `string` | No | The IP prefix in CIDR notation |
| `project_id` | `string` | No | The ID of the project associated with the BYOIP prefix |
| `region` | `string` | No | Region where the BYOIP prefix is located |
| `signature` | `string` | Yes | The signature hash for the prefix creation request |
| `status` | `string` | No | Status of the BYOIP prefix |
| `uuid` | `string` | No | Unique identifier for the BYOIP prefix |
| `validations` | `any[]` | No | List of validation statuses for the BYOIP prefix |

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

### Actions

This entity exposes custom API actions in addition to the standard
operations. Select one with `$action` in the call's argument; the
remaining keys are sent as that action's payload.

| Action | Route | Call |
| --- | --- | --- |
| `ips` | `/v2/byoip_prefixes/{byoip_prefix_uuid}/ips` | `client.ByoipPrefix().list({ $action: 'ips', ... })` |

An action returns that action's OWN response, which is not necessarily a
ByoipPrefix record — check the API definition for its shape.

```ts
const result = await client.ByoipPrefix().list({
  $action: 'ips',
  /* ...the action's own arguments */
})
```

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.ByoipPrefix().create({
  signature: 'example_signature',
})
```

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.ByoipPrefix().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.ByoipPrefix().load({ id: 'byoip_prefix_id' })
```

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria.

```ts
const result = await client.ByoipPrefix().remove({ id: 'byoip_prefix_id' })
```

#### `update(data: object, ctrl?: object)`

Update an existing entity. The data must include the entity `id`.

```ts
const result = await client.ByoipPrefix().update({
  id: 'byoip_prefix_id',
  // Fields to update
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ByoipPrefixEntity` instance with the same client and
options.

#### `client()`

Return the parent `DigitaloceanSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## CdnEndpointEntity

```ts
const cdn_endpoint = client.CdnEndpoint()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `certificate_id` | `string` | No | The ID of a DigitalOcean managed TLS certificate used for SSL when a custom subdomain is provided. |
| `created_at` | `string` | No | A time value given in ISO8601 combined date and time format that represents when the CDN endpoint was created. |
| `custom_domain` | `string` | No | The fully qualified domain name (FQDN) of the custom subdomain used with the CDN endpoint. |
| `endpoint` | `string` | No | The fully qualified domain name (FQDN) from which the CDN-backed content is served. |
| `id` | `string` | No | A unique ID that can be used to identify and reference a CDN endpoint. |
| `origin` | `string` | Yes | The fully qualified domain name (FQDN) for the origin server which provides the content for the CDN. |
| `ttl` | `number` | No | The amount of time the content is cached by the CDN's edge servers in seconds. |

### Actions

This entity exposes custom API actions in addition to the standard
operations. Select one with `$action` in the call's argument; the
remaining keys are sent as that action's payload.

| Action | Route | Call |
| --- | --- | --- |
| `cache` | `/v2/cdn/endpoints/{cdn_id}/cache` | `client.CdnEndpoint().remove({ $action: 'cache', ... })` |

An action returns that action's OWN response, which is not necessarily a
CdnEndpoint record — check the API definition for its shape.

```ts
const result = await client.CdnEndpoint().remove({
  $action: 'cache',
  /* ...the action's own arguments */
})
```

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.CdnEndpoint().create({
  origin: 'example_origin',
})
```

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.CdnEndpoint().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.CdnEndpoint().load({ id: 'cdn_endpoint_id' })
```

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria.

```ts
const result = await client.CdnEndpoint().remove({ id: 'cdn_endpoint_id' })
```

#### `update(data: object, ctrl?: object)`

Update an existing entity. The data must include the entity `id`.

```ts
const result = await client.CdnEndpoint().update({
  id: 'cdn_endpoint_id',
  // Fields to update
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `CdnEndpointEntity` instance with the same client and
options.

#### `client()`

Return the parent `DigitaloceanSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## CertificateEntity

```ts
const certificate = client.Certificate()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `certificate` | `Record<string, any>` | No |  |
| `created_at` | `string` | No | A time value given in ISO8601 combined date and time format that represents when the certificate was created. |
| `dns_names` | `any[]` | No | An array of fully qualified domain names (FQDNs) for which the certificate was issued. |
| `id` | `string` | No | A unique ID that can be used to identify and reference a certificate. |
| `name` | `string` | No | A unique human-readable name referring to a certificate. |
| `not_after` | `string` | No | A time value given in ISO8601 combined date and time format that represents the certificate's expiration date. |
| `sha1_fingerprint` | `string` | No | A unique identifier generated from the SHA-1 fingerprint of the certificate. |
| `state` | `string` | No | A string representing the current state of the certificate. |
| `type` | `string` | No | A string representing the type of the certificate. |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.Certificate().create({
})
```

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Certificate().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Certificate().load({ id: 'certificate_id' })
```

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria.

```ts
const result = await client.Certificate().remove({ id: 'certificate_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `CertificateEntity` instance with the same client and
options.

#### `client()`

Return the parent `DigitaloceanSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ChatCompletionEntity

```ts
const chat_completion = client.ChatCompletion()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `choices` | `any[]` | Yes | A list of chat completion choices. |
| `created` | `number` | Yes | The Unix timestamp (in seconds) of when the chat completion was created. |
| `frequency_penalty` | `number` | No | Number between -2.0 and 2.0. |
| `id` | `string` | Yes | A unique identifier for the chat completion. |
| `logit_bias` | `Record<string, any>` | No | Modify the likelihood of specified tokens appearing in the completion. |
| `logprobs` | `boolean` | No | Whether to return log probabilities of the output tokens or not. |
| `max_completion_tokens` | `number` | No | The maximum number of completion tokens that may be used over the course of the run. |
| `max_tokens` | `number` | No | The maximum number of tokens that can be generated in the completion. |
| `messages` | `any[]` | Yes | A list of messages comprising the conversation so far. |
| `metadata` | `Record<string, any>` | No | Set of 16 key-value pairs that can be attached to an object. |
| `model` | `string` | Yes | The model used for the chat completion. |
| `n` | `number` | No | How many chat completion choices to generate for each input message. |
| `object` | `string` | Yes | The object type, which is always chat.completion. |
| `presence_penalty` | `number` | No | Number between -2.0 and 2.0. |
| `reasoning_effort` | `string` | No | Constrains effort on reasoning for reasoning models. |
| `seed` | `number` | No | If specified, the system will make a best effort to sample deterministically, such that repeated requests with the same seed and parameters should return the same result. |
| `stop` | `any` | No | Up to 4 sequences where the API will stop generating further tokens. |
| `stream` | `boolean` | No | If set to true, the model response data will be streamed to the client as it is generated using server-sent events. |
| `stream_options` | `Record<string, any>` | No | Options for streaming response. |
| `temperature` | `number` | No | What sampling temperature to use, between 0 and 2. |
| `tool_choice` | `any` | No | Controls which (if any) tool is called by the model. |
| `tools` | `any[]` | No | A list of tools the model may call. |
| `top_logprobs` | `number` | No | An integer between 0 and 20 specifying the number of most likely tokens to return at each token position, each with an associated log probability. |
| `top_p` | `number` | No | An alternative to sampling with temperature, called nucleus sampling, where the model considers the results of the tokens with top_p probability mass. |
| `usage` | `Record<string, any>` | Yes | Usage statistics for the completion request. |
| `user` | `string` | No | A unique identifier representing your end-user, which can help DigitalOcean to monitor and detect abuse. |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.ChatCompletion().create({
  choices: [],
  created: 1,
  id: 'example_id',
  messages: [],
  model: 'example_model',
  object: 'example_object',
  usage: {},
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ChatCompletionEntity` instance with the same client and
options.

#### `client()`

Return the parent `DigitaloceanSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ClusterlintEntity

```ts
const clusterlint = client.Clusterlint()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `check_name` | `string` | No | The clusterlint check that resulted in the diagnostic. |
| `message` | `string` | No | Feedback about the object for users to fix. |
| `object` | `Record<string, any>` | No | Metadata about the Kubernetes API object the diagnostic is reported on. |
| `severity` | `string` | No | Can be one of error, warning or suggestion. |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Clusterlint().list({ cluster_id: "example" })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ClusterlintEntity` instance with the same client and
options.

#### `client()`

Return the parent `DigitaloceanSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ConnectionEntity

```ts
const connection = client.Connection()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `api_key` | `Record<string, any>` | No | Set for `team_api_key` connections. |
| `authorization` | `any` | No | Present only while the connection is pending and you created it. |
| `connection` | `any` | No | The connection. |
| `connection_parameters` | `Record<string, any>` | No | Values for the provider's `connection_parameters`, validated against their specifications. |
| `created_at` | `string` | No | When the connection was created. |
| `credential` | `Record<string, any>` | No | Optional credential to connect through. |
| `credential_id` | `string` | No | Empty for `digitalocean_oauth`; otherwise the ID of the team provider credential the connection uses. |
| `credential_kind` | `string` | No | `digitalocean_oauth`, `private_oauth`, or `team_api_key`. |
| `granted_at` | `string` | No | Deprecated: read `oauth.granted_at`. |
| `id` | `string` | No | Opaque connection ID. |
| `network` | `Record<string, any>` | No | Optional private network for the connection's calls. |
| `oauth` | `Record<string, any>` | No | Set for `digitalocean_oauth` and `private_oauth` connections. |
| `owning_user_id` | `string` | No | DigitalOcean user ID of the user who created the connection, when recorded. |
| `provider` | `string` | Yes | Required provider slug, from the provider list. |
| `provider_display_name` | `string` | No | Human-readable provider name, for example `Jira`. |
| `revoked_at` | `string` | No | When the connection was revoked. |
| `scopes` | `any[]` | No | Optional OAuth scopes to request. |
| `status` | `string` | No | pending, active, revoked, or expired. |
| `updated_at` | `string` | No | When the connection was last modified. |
| `user_id` | `string` | Yes | Required. |

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

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.Connection().create({
  provider: 'example_provider',
  user_id: 'example_user_id',
})
```

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Connection().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Connection().load({ id: 'connection_id' })
```

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria.

```ts
const result = await client.Connection().remove({ id: 'connection_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ConnectionEntity` instance with the same client and
options.

#### `client()`

Return the parent `DigitaloceanSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ConnectionPoolEntity

```ts
const connection_pool = client.ConnectionPool()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `connection` | `any` | No |  |
| `db` | `string` | Yes | The database for use with the connection pool. |
| `mode` | `string` | Yes | The PGBouncer transaction mode for the connection pool. |
| `name` | `string` | Yes | A unique name for the connection pool. |
| `private_connection` | `any` | No |  |
| `size` | `number` | Yes | The desired size of the PGBouncer connection pool. |
| `standby_connection` | `any` | No |  |
| `standby_private_connection` | `any` | No |  |
| `user` | `string` | No | The name of the user for use with the connection pool. |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.ConnectionPool().list({ database_id: "example" })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ConnectionPoolEntity` instance with the same client and
options.

#### `client()`

Return the parent `DigitaloceanSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ContainerRegistryEntity

```ts
const container_registry = client.ContainerRegistry()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `available_regions` | `any[]` | No |  |
| `blobs` | `any[]` | No | All blobs associated with this manifest |
| `blobs_deleted` | `number` | No | The number of blobs deleted as a result of this garbage collection. |
| `cancel` | `boolean` | No | A boolean value indicating that the garbage collection should be cancelled. |
| `compressed_size_bytes` | `number` | No | The compressed size of the manifest in bytes. |
| `created_at` | `string` | No | A time value given in ISO8601 combined date and time format that represents when the registry was created. |
| `digest` | `string` | No | The manifest digest |
| `freed_bytes` | `number` | No | The number of bytes freed as a result of this garbage collection. |
| `id` | `string` | No |  |
| `latest_manifest` | `Record<string, any>` | No |  |
| `latest_tag` | `Record<string, any>` | No |  |
| `manifest_count` | `number` | No | The number of manifests in the repository. |
| `manifest_digest` | `string` | No | The digest of the manifest associated with the tag. |
| `name` | `string` | No | A globally unique name for the container registry. |
| `region` | `string` | No | Slug of the region where registry data is stored |
| `registries` | `any[]` | No |  |
| `registry_name` | `string` | No | The name of the container registry. |
| `repository` | `string` | No | The name of the repository. |
| `size_bytes` | `number` | No | The uncompressed size of the manifest in bytes (this size is calculated asynchronously so it may not be immediately available). |
| `status` | `string` | No | The current status of this garbage collection. |
| `storage_usage_bytes` | `number` | No | The amount of storage used in the registry in bytes. |
| `storage_usage_bytes_updated_at` | `string` | No | The time at which the storage usage was updated. |
| `subscription` | `any` | No |  |
| `subscription_tier_slug` | `string` | No | The slug of the subscription tier to sign up for. |
| `subscription_tiers` | `any[]` | No |  |
| `tag` | `string` | No | The name of the tag. |
| `tag_count` | `number` | No | The number of tags in the repository. |
| `tags` | `any[]` | No | All tags associated with this manifest |
| `tier` | `Record<string, any>` | No |  |
| `tier_slug` | `string` | No | The slug of the subscription tier to sign up for. |
| `type` | `string` | No | Type of the garbage collection to run against this registry |
| `updated_at` | `string` | No | The time the garbage collection was last updated. |
| `uuid` | `string` | No | A string specifying the UUID of the garbage collection. |

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

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.ContainerRegistry().create({
})
```

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.ContainerRegistry().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.ContainerRegistry().load({ id: 'container_registry_id' })
```

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria.

```ts
const result = await client.ContainerRegistry().remove({ id: 'container_registry_id' })
```

#### `update(data: object, ctrl?: object)`

Update an existing entity. The data must include the entity `id`.

```ts
const result = await client.ContainerRegistry().update({
  id: 'container_registry_id',
  garbage_collection_uuid: 'garbage_collection_uuid',
  registry_name: 'registry_name',
  // Fields to update
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ContainerRegistryEntity` instance with the same client and
options.

#### `client()`

Return the parent `DigitaloceanSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## CreateResponseEntity

```ts
const create_response = client.CreateResponse()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `created` | `number` | Yes | The Unix timestamp (in seconds) of when the response was created. |
| `id` | `string` | Yes | A unique identifier for the response. |
| `input` | `any` | Yes | The prompt or input content you want the model to respond to. |
| `instructions` | `string` | No | System-level instructions for the model. |
| `max_output_tokens` | `number` | No | Maximum output tokens setting. |
| `metadata` | `Record<string, any>` | No | Set of key-value pairs that can be attached to the request. |
| `model` | `string` | Yes | The model used to generate the response. |
| `object` | `string` | Yes | The object type, which is always `response`. |
| `output` | `any[]` | Yes | An array of content items generated by the model. |
| `parallel_tool_calls` | `boolean` | No | Whether parallel tool calls are enabled. |
| `status` | `string` | No | Status of the response. |
| `stop` | `any` | No | Up to 4 sequences where the API will stop generating further tokens. |
| `stream` | `boolean` | No | Set to true to stream partial responses as Server-Sent Events. |
| `stream_options` | `Record<string, any>` | No | Options for streaming response. |
| `temperature` | `number` | No | Temperature setting used for the response. |
| `tool_choice` | `string` | No | Tool choice setting used for the response. |
| `tools` | `any[]` | No | Tools available for the response. |
| `top_p` | `number` | No | Top-p setting used for the response. |
| `usage` | `Record<string, any>` | Yes | Detailed usage statistics for the Responses API request, including input/output token counts and detailed breakdowns. |
| `user` | `string` | No | User identifier. |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.CreateResponse().create({
  created: 1,
  id: 'example_id',
  input: 'example_input',
  model: 'example_model',
  object: 'example_object',
  output: [],
  usage: {},
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `CreateResponseEntity` instance with the same client and
options.

#### `client()`

Return the parent `DigitaloceanSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## CredentialEntity

```ts
const credential = client.Credential()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `certificate_authority_data` | `string` | No | A base64 encoding of bytes representing the certificate authority data for accessing the cluster. |
| `client_certificate_data` | `string` | No | A base64 encoding of bytes representing the x509 client certificate data for access the cluster. |
| `client_key_data` | `string` | No | A base64 encoding of bytes representing the x509 client key data for access the cluster. |
| `expires_at` | `string` | No | A time value given in ISO8601 combined date and time format that represents when the access token expires. |
| `server` | `string` | No | The URL used to access the cluster API server. |
| `token` | `string` | No | An access token used to authenticate with the cluster. |

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Credential().load({ cluster_id: 'cluster_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `CredentialEntity` instance with the same client and
options.

#### `client()`

Return the parent `DigitaloceanSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## DatabaseEntity

```ts
const database = client.Database()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `access_cert` | `string` | No | Access certificate for TLS client authentication. |
| `access_key` | `string` | No | Access key for TLS client authentication. |
| `autoscale` | `any` | No | Autoscaling configuration for the database cluster. |
| `backup_restore` | `Record<string, any>` | Yes |  |
| `compatibility_level` | `string` | Yes | The compatibility level of the schema registry. |
| `config` | `Record<string, any>` | No |  |
| `connection` | `any` | No |  |
| `created_at` | `string` | No | A time value given in ISO8601 combined date and time format that represents when the database cluster was created. |
| `credentials` | `Record<string, any>` | No |  |
| `db` | `string` | Yes | The database for use with the connection pool. |
| `db_names` | `any[]` | No | An array of strings containing the names of databases created in the database cluster. |
| `do_settings` | `any` | No |  |
| `engine` | `string` | Yes | A slug representing the database engine used for the cluster. |
| `id` | `string` | No | A unique ID that can be used to identify and reference a database replica. |
| `maintenance_window` | `any` | No |  |
| `metrics_endpoints` | `any[]` | No | Public hostname and port of the cluster's metrics endpoint(s). |
| `mode` | `string` | Yes | The PGBouncer transaction mode for the connection pool. |
| `mysql_settings` | `Record<string, any>` | Yes |  |
| `name` | `string` | Yes | The name of the database. |
| `num_nodes` | `number` | Yes | The number of nodes in the database cluster. |
| `partition_count` | `number` | No | The number of partitions available for the topic. |
| `partitions` | `any[]` | No |  |
| `password` | `string` | No | A randomly generated password for the database user.<br>Requires `database:view_credentials` scope. |
| `private_connection` | `any` | No |  |
| `private_network_uuid` | `string` | No | A string specifying the UUID of the VPC to which the read-only replica will be assigned. |
| `project_id` | `string` | No | The ID of the project that the database cluster is assigned to. |
| `region` | `string` | No | A slug identifier for the region where the read-only replica will be located. |
| `replication_factor` | `number` | No | The number of nodes to replicate data across the cluster. |
| `role` | `string` | No | A string representing the database user's role. |
| `rules` | `any[]` | No |  |
| `schema` | `string` | Yes | The schema definition in the specified format. |
| `schema_id` | `number` | Yes | The id for schema. |
| `schema_registry_connection` | `any` | No | The connection details for Schema Registry. |
| `schema_type` | `string` | Yes | The type of the schema. |
| `semantic_version` | `string` | No | A string representing the semantic version of the database engine in use for the cluster. |
| `settings` | `Record<string, any>` | No | User settings that can be updated via the Update a Database User endpoint. |
| `size` | `number` | Yes | The desired size of the PGBouncer connection pool. |
| `standby_connection` | `any` | No |  |
| `standby_private_connection` | `any` | No |  |
| `state` | `string` | No | The state of the Kafka topic. |
| `status` | `string` | No | A string representing the current status of the database cluster. |
| `storage_size_mib` | `number` | No | Additional storage added to the cluster, in MiB. |
| `subject_name` | `string` | Yes | The name of the schema subject. |
| `tags` | `any[]` | No | A flat array of tag names as strings applied to the read-only replica.<br><br>Requires `tag:read` scope. |
| `ui_connection` | `any` | No | The connection details for OpenSearch dashboard. |
| `user` | `string` | No | The name of the user for use with the connection pool. |
| `users` | `any[]` | No |  |
| `version` | `string` | Yes | The version of the schema. |
| `version_end_of_availability` | `string` | No | A timestamp referring to the date when the particular version will no longer be available for creating new clusters. |
| `version_end_of_life` | `string` | No | A timestamp referring to the date when the particular version will no longer be supported. |

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

### Actions

This entity exposes custom API actions in addition to the standard
operations. Select one with `$action` in the call's argument; the
remaining keys are sent as that action's payload.

| Action | Route | Call |
| --- | --- | --- |
| `dbs` | `/v2/databases/{database_cluster_uuid}/dbs` | `client.Database().create({ $action: 'dbs', ... })` |
| `logsink` | `/v2/databases/{database_cluster_uuid}/logsink` | `client.Database().create({ $action: 'logsink', ... })` |
| `pool` | `/v2/databases/{database_cluster_uuid}/pools` | `client.Database().create({ $action: 'pool', ... })` |
| `replica` | `/v2/databases/{database_cluster_uuid}/replicas` | `client.Database().create({ $action: 'replica', ... })` |
| `reset_auth` | `/v2/databases/{database_cluster_uuid}/users/{username}/reset_auth` | `client.Database().create({ $action: 'reset_auth', ... })` |
| `schema_registry` | `/v2/databases/{database_cluster_uuid}/schema-registry` | `client.Database().create({ $action: 'schema_registry', ... })` |
| `topic` | `/v2/databases/{database_cluster_uuid}/topics` | `client.Database().create({ $action: 'topic', ... })` |
| `user` | `/v2/databases/{database_cluster_uuid}/users` | `client.Database().create({ $action: 'user', ... })` |
| `backup` | `/v2/databases/{database_cluster_uuid}/backups` | `client.Database().list({ $action: 'backup', ... })` |
| `dbs` | `/v2/databases/{database_cluster_uuid}/dbs` | `client.Database().list({ $action: 'dbs', ... })` |
| `event` | `/v2/databases/{database_cluster_uuid}/events` | `client.Database().list({ $action: 'event', ... })` |
| `firewall` | `/v2/databases/{database_cluster_uuid}/firewall` | `client.Database().list({ $action: 'firewall', ... })` |
| `index` | `/v2/databases/{database_cluster_uuid}/indexes` | `client.Database().list({ $action: 'index', ... })` |
| `logsink` | `/v2/databases/{database_cluster_uuid}/logsink` | `client.Database().list({ $action: 'logsink', ... })` |
| `replica` | `/v2/databases/{database_cluster_uuid}/replicas` | `client.Database().list({ $action: 'replica', ... })` |
| `schema_registry` | `/v2/databases/{database_cluster_uuid}/schema-registry` | `client.Database().list({ $action: 'schema_registry', ... })` |
| `topic` | `/v2/databases/{database_cluster_uuid}/topics` | `client.Database().list({ $action: 'topic', ... })` |
| `user` | `/v2/databases/{database_cluster_uuid}/users` | `client.Database().list({ $action: 'user', ... })` |
| `autoscale` | `/v2/databases/{database_cluster_uuid}/autoscale` | `client.Database().load({ $action: 'autoscale', ... })` |
| `ca` | `/v2/databases/{database_cluster_uuid}/ca` | `client.Database().load({ $action: 'ca', ... })` |
| `config` | `/v2/databases/{database_cluster_uuid}/config` | `client.Database().load({ $action: 'config', ... })` |
| `do_setting` | `/v2/databases/{database_cluster_uuid}/do_settings` | `client.Database().load({ $action: 'do_setting', ... })` |
| `eviction_policy` | `/v2/databases/{database_cluster_uuid}/eviction_policy` | `client.Database().load({ $action: 'eviction_policy', ... })` |
| `schema_registry_config` | `/v2/databases/{database_cluster_uuid}/schema-registry/config` | `client.Database().load({ $action: 'schema_registry_config', ... })` |
| `config` | `/v2/databases/{database_cluster_uuid}/config` | `client.Database().patch({ $action: 'config', ... })` |
| `autoscale` | `/v2/databases/{database_cluster_uuid}/autoscale` | `client.Database().update({ $action: 'autoscale', ... })` |
| `do_setting` | `/v2/databases/{database_cluster_uuid}/do_settings` | `client.Database().update({ $action: 'do_setting', ... })` |
| `eviction_policy` | `/v2/databases/{database_cluster_uuid}/eviction_policy` | `client.Database().update({ $action: 'eviction_policy', ... })` |
| `firewall` | `/v2/databases/{database_cluster_uuid}/firewall` | `client.Database().update({ $action: 'firewall', ... })` |
| `install_update` | `/v2/databases/{database_cluster_uuid}/install_update` | `client.Database().update({ $action: 'install_update', ... })` |
| `maintenance` | `/v2/databases/{database_cluster_uuid}/maintenance` | `client.Database().update({ $action: 'maintenance', ... })` |
| `migrate` | `/v2/databases/{database_cluster_uuid}/migrate` | `client.Database().update({ $action: 'migrate', ... })` |
| `promote` | `/v2/databases/{database_cluster_uuid}/replicas/{replica_name}/promote` | `client.Database().update({ $action: 'promote', ... })` |
| `resize` | `/v2/databases/{database_cluster_uuid}/resize` | `client.Database().update({ $action: 'resize', ... })` |
| `schema_registry_config` | `/v2/databases/{database_cluster_uuid}/schema-registry/config` | `client.Database().update({ $action: 'schema_registry_config', ... })` |
| `sql_mode` | `/v2/databases/{database_cluster_uuid}/sql_mode` | `client.Database().update({ $action: 'sql_mode', ... })` |
| `upgrade` | `/v2/databases/{database_cluster_uuid}/upgrade` | `client.Database().update({ $action: 'upgrade', ... })` |

An action returns that action's OWN response, which is not necessarily a
Database record — check the API definition for its shape.

```ts
const result = await client.Database().create({
  $action: 'dbs',
  /* ...the action's own arguments */
})
```

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.Database().create({
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

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Database().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Database().load({ id: 'database_id' })
```

#### `patch(data: object, ctrl?: object)`

Change part of an existing entity: only the fields given are sent. The data must include the entity `id`.

```ts
const result = await client.Database().patch({
  id: 'database_id',
  // Only the fields to change
})
```

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria.

```ts
const result = await client.Database().remove({ id: 'database_id' })
```

#### `update(data: object, ctrl?: object)`

Update an existing entity. The data must include the entity `id`.

```ts
const result = await client.Database().update({
  id: 'database_id',
  logsink_id: 'logsink_id',
  // Fields to update
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `DatabaseEntity` instance with the same client and
options.

#### `client()`

Return the parent `DigitaloceanSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## DedicatedInferenceEntity

```ts
const dedicated_inference = client.DedicatedInference()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `access_tokens` | `Record<string, any>` | No | Key-value pairs for provider tokens (e.g. |
| `created_at` | `string` | No | When the Dedicated Inference was created. |
| `dedicated_inference` | `Record<string, any>` | No | A Dedicated Inference instance. |
| `endpoints` | `Record<string, any>` | No |  |
| `id` | `string` | No | Unique ID of the Dedicated Inference. |
| `pending_deployment_spec` | `Record<string, any>` | No | Pending deployment when status is provisioning or updating. |
| `region` | `string` | No | DigitalOcean region where the Dedicated Inference is hosted. |
| `spec` | `Record<string, any>` | Yes | Structured configuration for a Dedicated Inference deployment. |
| `status` | `string` | No | Current state of the Dedicated Inference. |
| `token` | `Record<string, any>` | No | Access token for authenticating to Dedicated Inference endpoints. |
| `updated_at` | `string` | No | When the Dedicated Inference was last updated. |
| `vpc_uuid` | `string` | No | VPC UUID of the Dedicated Inference. |

### Actions

This entity exposes custom API actions in addition to the standard
operations. Select one with `$action` in the call's argument; the
remaining keys are sent as that action's payload.

| Action | Route | Call |
| --- | --- | --- |
| `token` | `/v2/dedicated-inferences/{dedicated_inference_id}/tokens` | `client.DedicatedInference().create({ $action: 'token', ... })` |
| `accelerator` | `/v2/dedicated-inferences/{dedicated_inference_id}/accelerators` | `client.DedicatedInference().list({ $action: 'accelerator', ... })` |
| `token` | `/v2/dedicated-inferences/{dedicated_inference_id}/tokens` | `client.DedicatedInference().list({ $action: 'token', ... })` |
| `ca` | `/v2/dedicated-inferences/{dedicated_inference_id}/ca` | `client.DedicatedInference().load({ $action: 'ca', ... })` |

An action returns that action's OWN response, which is not necessarily a
DedicatedInference record — check the API definition for its shape.

```ts
const result = await client.DedicatedInference().create({
  $action: 'token',
  /* ...the action's own arguments */
})
```

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.DedicatedInference().create({
  spec: {},
})
```

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.DedicatedInference().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.DedicatedInference().load({ id: 'dedicated_inference_id' })
```

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria.

```ts
const result = await client.DedicatedInference().remove({ id: 'dedicated_inference_id' })
```

#### `update(data: object, ctrl?: object)`

Update an existing entity. The data must include the entity `id`.

```ts
const result = await client.DedicatedInference().update({
  id: 'dedicated_inference_id',
  // Fields to update
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `DedicatedInferenceEntity` instance with the same client and
options.

#### `client()`

Return the parent `DigitaloceanSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## DedicatedInferenceAcceleratorEntity

```ts
const dedicated_inference_accelerator = client.DedicatedInferenceAccelerator()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `created_at` | `string` | No |  |
| `id` | `string` | No | Unique ID of the accelerator. |
| `name` | `string` | No | Name of the accelerator. |
| `role` | `string` | No | Role of the accelerator (e.g. |
| `slug` | `string` | No | DigitalOcean GPU slug. |
| `status` | `string` | No | Status of the accelerator. |

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.DedicatedInferenceAccelerator().load({ id: 'dedicated_inference_accelerator_id', dedicated_inference_id: 'dedicated_inference_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `DedicatedInferenceAcceleratorEntity` instance with the same client and
options.

#### `client()`

Return the parent `DigitaloceanSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## DedicatedInferenceGpuModelConfigEntity

```ts
const dedicated_inference_gpu_model_config = client.DedicatedInferenceGpuModelConfig()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `gpu_slugs` | `any[]` | No |  |
| `is_gated_model` | `boolean` | No | Whether the model requires gated access (e.g. |
| `model_name` | `string` | No |  |
| `model_slug` | `string` | No |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.DedicatedInferenceGpuModelConfig().list()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `DedicatedInferenceGpuModelConfigEntity` instance with the same client and
options.

#### `client()`

Return the parent `DigitaloceanSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## DedicatedInferenceSizeEntity

```ts
const dedicated_inference_size = client.DedicatedInferenceSize()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `currency` | `string` | No |  |
| `gpu_slug` | `string` | No |  |
| `price_per_hour` | `string` | No |  |
| `region` | `string` | No |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.DedicatedInferenceSize().list()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `DedicatedInferenceSizeEntity` instance with the same client and
options.

#### `client()`

Return the parent `DigitaloceanSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## DockerCredentialEntity

```ts
const docker_credential = client.DockerCredential()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `registry_digitalocean_com` | `Record<string, any>` | No |  |

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.DockerCredential().load()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `DockerCredentialEntity` instance with the same client and
options.

#### `client()`

Return the parent `DigitaloceanSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## DomainEntity

```ts
const domain = client.Domain()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `string` | No |  |
| `ip_address` | `string` | No | This optional attribute may contain an IP address. |
| `name` | `string` | No | The name of the domain itself. |
| `ttl` | `number` | No | This value is the time to live for the records on this domain, in seconds. |
| `zone_file` | `string` | No | This attribute contains the complete contents of the zone file for the selected domain. |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.Domain().create({
})
```

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Domain().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Domain().load({ id: 'domain_id' })
```

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria.

```ts
const result = await client.Domain().remove({ id: 'domain_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `DomainEntity` instance with the same client and
options.

#### `client()`

Return the parent `DigitaloceanSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## DomainRecordEntity

```ts
const domain_record = client.DomainRecord()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `data` | `string` | No | Variable data depending on record type. |
| `domain_record` | `Record<string, any>` | No |  |
| `flags` | `number` | No | An unsigned integer between 0-255 used for CAA records. |
| `id` | `number` | No | A unique identifier for each domain record. |
| `name` | `string` | No | The host name, alias, or service being defined by the record. |
| `port` | `number` | No | The port for SRV records. |
| `priority` | `number` | No | The priority for SRV and MX records. |
| `tag` | `string` | No | The parameter tag for CAA records. |
| `ttl` | `number` | No | This value is the time to live for the record, in seconds. |
| `type` | `string` | Yes | The type of the DNS record. |
| `weight` | `number` | No | The weight for SRV records. |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.DomainRecord().create({
  domain_name: 'example_domain_name',
  type: 'example_type',
})
```

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.DomainRecord().list({ domain_name: "example" })
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.DomainRecord().load({ id: 1, domain_name: 'domain_name' })
```

#### `patch(data: object, ctrl?: object)`

Change part of an existing entity: only the fields given are sent. The data must include the entity `id`.

```ts
const result = await client.DomainRecord().patch({
  id: 1,
  domain_name: 'domain_name',
  // Only the fields to change
})
```

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria.

```ts
const result = await client.DomainRecord().remove({ id: 1, domain_name: 'domain_name' })
```

#### `update(data: object, ctrl?: object)`

Update an existing entity. The data must include the entity `id`.

```ts
const result = await client.DomainRecord().update({
  id: 1,
  domain_name: 'domain_name',
  // Fields to update
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `DomainRecordEntity` instance with the same client and
options.

#### `client()`

Return the parent `DigitaloceanSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## DropletEntity

```ts
const droplet = client.Droplet()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `backup_ids` | `any[]` | Yes | An array of backup IDs of any backups that have been taken of the Droplet instance. |
| `created_at` | `string` | Yes | A time value given in ISO8601 combined date and time format that represents when the Droplet was created. |
| `disk` | `number` | Yes | The size of the Droplet's disk in gigabytes. |
| `disk_info` | `any[]` | No | An array of objects containing information about the disks available to the Droplet. |
| `droplet` | `Record<string, any>` | No |  |
| `features` | `any[]` | Yes | An array of features enabled on this Droplet. |
| `gpu_info` | `Record<string, any>` | No | An object containing information about the GPU capabilities of Droplets created with this size. |
| `id` | `number` | Yes | A unique identifier for each Droplet instance. |
| `image` | `any` | Yes |  |
| `kernel` | `Record<string, any>` | No | **Note**: All Droplets created after March 2017 use internal kernels by default. |
| `links` | `Record<string, any>` | No |  |
| `locked` | `boolean` | Yes | A boolean value indicating whether the Droplet has been locked, preventing actions by users. |
| `memory` | `number` | Yes | Memory of the Droplet in megabytes. |
| `meta` | `any` | Yes |  |
| `name` | `string` | Yes | The human-readable name set for the Droplet instance. |
| `networks` | `Record<string, any>` | Yes | The details of the network that are configured for the Droplet instance. |
| `next_backup_window` | `any` | Yes |  |
| `policies` | `Record<string, any>` | No | A map where the keys are the Droplet IDs and the values are objects containing the backup policy information for each Droplet. |
| `possible_days` | `any[]` | No | The day of the week the backup will occur. |
| `possible_window_starts` | `any[]` | No | An array of integers representing the hours of the day that a backup can start. |
| `region` | `Record<string, any>` | Yes |  |
| `retention_period_days` | `number` | No | The number of days that a backup will be kept. |
| `size` | `Record<string, any>` | Yes |  |
| `size_slug` | `string` | Yes | The unique slug identifier for the size of this Droplet. |
| `snapshot_ids` | `any[]` | Yes | An array of snapshot IDs of any snapshots created from the Droplet instance.<br>Requires `image:read` scope. |
| `status` | `string` | Yes | A status string indicating the state of the Droplet instance. |
| `subnet_uuid` | `string` | No | A string specifying the UUID of the VPC subnet to which the Droplet is assigned.<br>Requires `vpc:read` scope. |
| `tags` | `any[]` | Yes | An array of Tags the Droplet has been tagged with.<br>Requires `tag:read` scope. |
| `vcpus` | `number` | Yes | The number of virtual CPUs. |
| `volume_ids` | `any[]` | Yes | A flat array including the unique identifier for each Block Storage volume attached to the Droplet.<br>Requires `block_storage:read` scope. |
| `vpc_uuid` | `string` | No | A string specifying the UUID of the VPC to which the Droplet is assigned.<br>Requires `vpc:read` scope. |
| `window_length_hours` | `number` | No | The number of hours that a backup window is open. |

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

### Actions

This entity exposes custom API actions in addition to the standard
operations. Select one with `$action` in the call's argument; the
remaining keys are sent as that action's payload.

| Action | Route | Call |
| --- | --- | --- |
| `destroy_with_associated_resource_retry` | `/v2/droplets/{droplet_id}/destroy_with_associated_resources/retry` | `client.Droplet().create({ $action: 'destroy_with_associated_resource_retry', ... })` |
| `backup` | `/v2/droplets/{droplet_id}/backups` | `client.Droplet().list({ $action: 'backup', ... })` |
| `destroy_with_associated_resource` | `/v2/droplets/{droplet_id}/destroy_with_associated_resources` | `client.Droplet().list({ $action: 'destroy_with_associated_resource', ... })` |
| `firewall` | `/v2/droplets/{droplet_id}/firewalls` | `client.Droplet().list({ $action: 'firewall', ... })` |
| `kernel` | `/v2/droplets/{droplet_id}/kernels` | `client.Droplet().list({ $action: 'kernel', ... })` |
| `neighbor` | `/v2/droplets/{droplet_id}/neighbors` | `client.Droplet().list({ $action: 'neighbor', ... })` |
| `snapshot` | `/v2/droplets/{droplet_id}/snapshots` | `client.Droplet().list({ $action: 'snapshot', ... })` |
| `backup_policy` | `/v2/droplets/{droplet_id}/backups/policy` | `client.Droplet().load({ $action: 'backup_policy', ... })` |
| `destroy_with_associated_resource_dangerous` | `/v2/droplets/{droplet_id}/destroy_with_associated_resources/dangerous` | `client.Droplet().remove({ $action: 'destroy_with_associated_resource_dangerous', ... })` |
| `destroy_with_associated_resource_selective` | `/v2/droplets/{droplet_id}/destroy_with_associated_resources/selective` | `client.Droplet().remove({ $action: 'destroy_with_associated_resource_selective', ... })` |

An action returns that action's OWN response, which is not necessarily a
Droplet record — check the API definition for its shape.

```ts
const result = await client.Droplet().create({
  $action: 'destroy_with_associated_resource_retry',
  /* ...the action's own arguments */
})
```

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.Droplet().create({
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

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Droplet().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Droplet().load({ id: 1 })
```

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria.

```ts
const result = await client.Droplet().remove({ id: 1 })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `DropletEntity` instance with the same client and
options.

#### `client()`

Return the parent `DigitaloceanSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## DropletActionEntity

```ts
const droplet_action = client.DropletAction()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `completed_at` | `string` | No | A time value given in ISO8601 combined date and time format that represents when the action was completed. |
| `id` | `number` | No | A unique numeric ID that can be used to identify and reference an action. |
| `region` | `Record<string, any>` | Yes |  |
| `region_slug` | `string` | No | A human-readable string that is used as a unique identifier for each region. |
| `resource_id` | `number` | No | A unique identifier for the resource that the action is associated with. |
| `resource_type` | `string` | No | The type of resource that the action is associated with. |
| `started_at` | `string` | No | A time value given in ISO8601 combined date and time format that represents when the action was initiated. |
| `status` | `string` | No | The current status of the action. |
| `type` | `string` | No | This is the type of action that the object represents. |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.DropletAction().create({
  region: {},
})
```

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.DropletAction().list({ id: 1 })
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.DropletAction().load({ id: 1, droplet_id: 1 })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `DropletActionEntity` instance with the same client and
options.

#### `client()`

Return the parent `DigitaloceanSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## DropletAutoscalePoolEntity

```ts
const droplet_autoscale_pool = client.DropletAutoscalePool()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `active_resources_count` | `number` | Yes | The number of active Droplets in the autoscale pool. |
| `config` | `Record<string, any>` | Yes | The scaling configuration for an autoscale pool, which is how the pool scales up and down (either by resource utilization or static configuration). |
| `created_at` | `string` | Yes | A time value given in ISO8601 combined date and time format that represents when the autoscale pool was created. |
| `current_instance_count` | `number` | Yes | The current number of Droplets in the autoscale pool. |
| `current_utilization` | `Record<string, any>` | No |  |
| `desired_instance_count` | `number` | Yes | The target number of Droplets for the autoscale pool after the scaling event. |
| `droplet_id` | `number` | Yes | The unique identifier of the Droplet. |
| `droplet_template` | `Record<string, any>` | Yes |  |
| `health_status` | `string` | Yes | The health status of the Droplet. |
| `history_event_id` | `string` | Yes | The unique identifier of the history event. |
| `id` | `string` | Yes | A unique identifier for each autoscale pool instance. |
| `name` | `string` | Yes | The human-readable name set for the autoscale pool. |
| `reason` | `string` | Yes | The reason for the scaling event. |
| `status` | `string` | Yes | The current status of the autoscale pool. |
| `unhealthy_reason` | `string` | No | A human-readable description of why the Droplet is unhealthy. |
| `updated_at` | `string` | Yes | A time value given in ISO8601 combined date and time format that represents when the autoscale pool was last updated. |

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

### Actions

This entity exposes custom API actions in addition to the standard
operations. Select one with `$action` in the call's argument; the
remaining keys are sent as that action's payload.

| Action | Route | Call |
| --- | --- | --- |
| `dangerous` | `/v2/droplets/autoscale/{autoscale_pool_id}/dangerous` | `client.DropletAutoscalePool().remove({ $action: 'dangerous', ... })` |

An action returns that action's OWN response, which is not necessarily a
DropletAutoscalePool record — check the API definition for its shape.

```ts
const result = await client.DropletAutoscalePool().remove({
  $action: 'dangerous',
  /* ...the action's own arguments */
})
```

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.DropletAutoscalePool().create({
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

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.DropletAutoscalePool().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.DropletAutoscalePool().load({ autoscale_pool_id: 'autoscale_pool_id' })
```

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria.

```ts
const result = await client.DropletAutoscalePool().remove({ autoscale_pool_id: 'autoscale_pool_id' })
```

#### `update(data: object, ctrl?: object)`

Update an existing entity. The data must include the entity `id`.

```ts
const result = await client.DropletAutoscalePool().update({
  autoscale_pool_id: 'autoscale_pool_id',
  // Fields to update
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `DropletAutoscalePoolEntity` instance with the same client and
options.

#### `client()`

Return the parent `DigitaloceanSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## EmbeddingEntity

```ts
const embedding = client.Embedding()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `data` | `any[]` | Yes | One entry for each `input` string, in the same order. |
| `encoding_format` | `string` | No | How embedding values are returned in each `data[].embedding` field. |
| `input` | `any` | Yes | A single string or 1–2048 strings; each string produces one row in `data`, in order. |
| `model` | `string` | Yes | The embedding model that produced the vectors. |
| `object` | `string` | Yes | The object type, which is always the string `list`. |
| `usage` | `Record<string, any>` | Yes | Token usage for the embeddings request. |
| `user` | `string` | No | Optional end-user identifier to help with abuse monitoring. |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.Embedding().create({
  data: [],
  input: 'example_input',
  model: 'example_model',
  object: 'example_object',
  usage: {},
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `EmbeddingEntity` instance with the same client and
options.

#### `client()`

Return the parent `DigitaloceanSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## EmptyEntity

```ts
const empty = client.Empty()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `actorId` | `string` | No | Optional actor binding: the user whose connections the session's tool calls use, matched against connection `user_id`. |
| `agentName` | `string` | No | Name of the agent that started the session. |
| `agentUrn` | `string` | No | URN of the agent that started the session. |
| `categories` | `any[]` | Yes | Required. |
| `config` | `Record<string, any>` | No | Optional session options. |
| `createdAt` | `string` | No | When the session was created. |
| `insights` | `any` | No | Omitted when the request omitted insights or explicitly sent null. |
| `mcpUrl` | `string` | No | URL of the session's MCP endpoint, for the agent to connect to. |
| `name` | `string` | Yes | Required human-readable session name. |
| `network` | `any` | No | Product-level session network binding. |
| `overrides` | `any[]` | Yes | Required. |
| `owning_user_id` | `string` | No | DigitalOcean user ID of the user who created the session, when recorded. |
| `policy` | `any` | No | Optional tool-permission policy. |
| `session` | `any` | No | The created session. |
| `sessionUrn` | `string` | No | Session URN, for example `do:managed_agent_session:<uuid>`. |
| `tools` | `any[]` | No | Canonical, version-pinned selected tool references. |
| `updatedAt` | `string` | No | When the session was last modified. |

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

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.Empty().create({
  categories: [],
  name: 'example_name',
  overrides: [],
})
```

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Empty().list()
```

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria.

```ts
const result = await client.Empty().remove({ session_urn: 'session_urn' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `EmptyEntity` instance with the same client and
options.

#### `client()`

Return the parent `DigitaloceanSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## FirewallEntity

```ts
const firewall = client.Firewall()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `created_at` | `string` | No | A time value given in ISO8601 combined date and time format that represents when the firewall was created. |
| `droplet_ids` | `any[]` | No | An array containing the IDs of the Droplets assigned to the firewall. |
| `id` | `string` | No | A unique ID that can be used to identify and reference a firewall. |
| `inbound_rules` | `any[]` | No |  |
| `name` | `string` | No | A human-readable name for a firewall. |
| `outbound_rules` | `any[]` | No |  |
| `pending_changes` | `any[]` | No | An array of objects each containing the fields "droplet_id", "removing", and "status". |
| `status` | `string` | No | A status string indicating the current state of the firewall. |
| `tags` | `any` | No |  |

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

### Actions

This entity exposes custom API actions in addition to the standard
operations. Select one with `$action` in the call's argument; the
remaining keys are sent as that action's payload.

| Action | Route | Call |
| --- | --- | --- |
| `droplet` | `/v2/firewalls/{firewall_id}/droplets` | `client.Firewall().create({ $action: 'droplet', ... })` |
| `rule` | `/v2/firewalls/{firewall_id}/rules` | `client.Firewall().create({ $action: 'rule', ... })` |
| `tag` | `/v2/firewalls/{firewall_id}/tags` | `client.Firewall().create({ $action: 'tag', ... })` |
| `droplet` | `/v2/firewalls/{firewall_id}/droplets` | `client.Firewall().remove({ $action: 'droplet', ... })` |
| `rule` | `/v2/firewalls/{firewall_id}/rules` | `client.Firewall().remove({ $action: 'rule', ... })` |
| `tag` | `/v2/firewalls/{firewall_id}/tags` | `client.Firewall().remove({ $action: 'tag', ... })` |

An action returns that action's OWN response, which is not necessarily a
Firewall record — check the API definition for its shape.

```ts
const result = await client.Firewall().create({
  $action: 'droplet',
  /* ...the action's own arguments */
})
```

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.Firewall().create({
})
```

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Firewall().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Firewall().load({ id: 'firewall_id' })
```

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria.

```ts
const result = await client.Firewall().remove({ id: 'firewall_id' })
```

#### `update(data: object, ctrl?: object)`

Update an existing entity. The data must include the entity `id`.

```ts
const result = await client.Firewall().update({
  id: 'firewall_id',
  // Fields to update
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `FirewallEntity` instance with the same client and
options.

#### `client()`

Return the parent `DigitaloceanSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## FloatingIpEntity

```ts
const floating_ip = client.FloatingIp()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `droplet` | `any` | No | The Droplet that the floating IP has been assigned to. |
| `floating_ip` | `Record<string, any>` | No |  |
| `id` | `string` | No |  |
| `ip` | `string` | No | The public IP address of the floating IP. |
| `links` | `Record<string, any>` | No |  |
| `locked` | `boolean` | No | A boolean value indicating whether or not the floating IP has pending actions preventing new ones from being submitted. |
| `project_id` | `string` | No | The UUID of the project to which the reserved IP currently belongs.<br><br>Requires `project:read` scope. |
| `region` | `any` | No |  |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.FloatingIp().create({
})
```

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.FloatingIp().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.FloatingIp().load({ id: 'floating_ip_id' })
```

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria.

```ts
const result = await client.FloatingIp().remove({ id: 'floating_ip_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `FloatingIpEntity` instance with the same client and
options.

#### `client()`

Return the parent `DigitaloceanSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## FloatingIpActionEntity

```ts
const floating_ip_action = client.FloatingIpAction()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `action` | `Record<string, any>` | No |  |
| `completed_at` | `string` | No | A time value given in ISO8601 combined date and time format that represents when the action was completed. |
| `id` | `number` | No | A unique numeric ID that can be used to identify and reference an action. |
| `project_id` | `string` | No | The UUID of the project to which the reserved IP currently belongs. |
| `region` | `Record<string, any>` | Yes |  |
| `region_slug` | `string` | No | A human-readable string that is used as a unique identifier for each region. |
| `resource_id` | `number` | No | A unique identifier for the resource that the action is associated with. |
| `resource_type` | `string` | No | The type of resource that the action is associated with. |
| `started_at` | `string` | No | A time value given in ISO8601 combined date and time format that represents when the action was initiated. |
| `status` | `string` | No | The current status of the action. |
| `type` | `string` | No | This is the type of action that the object represents. |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.FloatingIpAction().create({
  floating_ip_id: 'example_floating_ip_id',
  region: {},
})
```

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.FloatingIpAction().list({ floating_ip_id: "example" })
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.FloatingIpAction().load({ id: 1, floating_ip_id: 'floating_ip_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `FloatingIpActionEntity` instance with the same client and
options.

#### `client()`

Return the parent `DigitaloceanSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## FunctionKeyEntity

```ts
const function_key = client.FunctionKey()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `created_at` | `string` | No | The date and time the key was created. |
| `expires_at` | `string` | No | When the key expires (null for non-expiring keys). |
| `expires_in` | `string` | No | The duration after which the access key expires, specified as a human-readable duration string in the format `<int>h` (hours) or `<int>d` (days). |
| `id` | `string` | No | The access key's unique identifier with prefix 'dof_v1_'. |
| `name` | `string` | Yes | The access key's name. |
| `updated_at` | `string` | No | The date and time the key was last updated. |

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

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.FunctionKey().create({
  namespace_id: 'example_namespace_id',
  name: 'example_name',
})
```

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.FunctionKey().list({ namespace_id: "example" })
```

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria.

```ts
const result = await client.FunctionKey().remove({ id: 'id', namespace_id: 'namespace_id' })
```

#### `update(data: object, ctrl?: object)`

Update an existing entity. The data must include the entity `id`.

```ts
const result = await client.FunctionKey().update({
  id: 'id',
  namespace_id: 'namespace_id',
  // Fields to update
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `FunctionKeyEntity` instance with the same client and
options.

#### `client()`

Return the parent `DigitaloceanSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## FunctionNamespaceEntity

```ts
const function_namespace = client.FunctionNamespace()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `api_host` | `string` | No | The namespace's API hostname. |
| `created_at` | `string` | No | UTC time string. |
| `key` | `string` | No | A random alpha numeric string. |
| `label` | `string` | No | The namespace's unique name. |
| `namespace` | `string` | No | A unique string format of UUID with a prefix fn-. |
| `region` | `string` | No | The namespace's datacenter region. |
| `updated_at` | `string` | No | UTC time string. |
| `uuid` | `string` | No | The namespace's Universally Unique Identifier. |

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

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.FunctionNamespace().create({
})
```

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.FunctionNamespace().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.FunctionNamespace().load({ namespace_id: 'namespace_id' })
```

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria.

```ts
const result = await client.FunctionNamespace().remove({ namespace_id: 'namespace_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `FunctionNamespaceEntity` instance with the same client and
options.

#### `client()`

Return the parent `DigitaloceanSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## FunctionTriggerEntity

```ts
const function_trigger = client.FunctionTrigger()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `created_at` | `string` | No | UTC time string. |
| `function` | `string` | No | Name of function(action) that exists in the given namespace. |
| `is_enabled` | `boolean` | No | Indicates weather the trigger is paused or unpaused. |
| `name` | `string` | No | The trigger's unique name within the namespace. |
| `namespace` | `string` | No | A unique string format of UUID with a prefix fn-. |
| `scheduled_details` | `Record<string, any>` | Yes | Trigger details for SCHEDULED type, where body is optional. |
| `scheduled_runs` | `Record<string, any>` | No |  |
| `type` | `string` | No | String which indicates the type of trigger source like SCHEDULED. |
| `updated_at` | `string` | No | UTC time string. |

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

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.FunctionTrigger().create({
  namespace_id: 'example_namespace_id',
  scheduled_details: {},
})
```

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.FunctionTrigger().list({ namespace_id: "example" })
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.FunctionTrigger().load({ namespace_id: 'namespace_id', trigger_name: 'trigger_name' })
```

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria.

```ts
const result = await client.FunctionTrigger().remove({ namespace_id: 'namespace_id', trigger_name: 'trigger_name' })
```

#### `update(data: object, ctrl?: object)`

Update an existing entity. The data must include the entity `id`.

```ts
const result = await client.FunctionTrigger().update({
  namespace_id: 'namespace_id',
  trigger_name: 'trigger_name',
  // Fields to update
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `FunctionTriggerEntity` instance with the same client and
options.

#### `client()`

Return the parent `DigitaloceanSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## GenaiapiRegionEntity

```ts
const genaiapi_region = client.GenaiapiRegion()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `inference_url` | `string` | No | Url for inference server |
| `region` | `string` | No | Region code |
| `serves_batch` | `boolean` | No | This datacenter is capable of running batch jobs |
| `serves_inference` | `boolean` | No | This datacenter is capable of serving inference |
| `stream_inference_url` | `string` | No | The url for the inference streaming server |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.GenaiapiRegion().list()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `GenaiapiRegionEntity` instance with the same client and
options.

#### `client()`

Return the parent `DigitaloceanSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ImageEntity

```ts
const image = client.Image()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `created_at` | `string` | No | A time value given in ISO8601 combined date and time format that represents when the image was created. |
| `description` | `string` | No | An optional free-form text field to describe an image. |
| `distribution` | `string` | No | The name of a custom image's distribution. |
| `error_message` | `string` | No | A string containing information about errors that may occur when importing a custom image. |
| `id` | `number` | No | A unique number that can be used to identify and reference a specific image. |
| `min_disk_size` | `number` | No | The minimum disk size in GB required for a Droplet to use this image. |
| `name` | `string` | No | The display name that has been given to an image. |
| `public` | `boolean` | No | This is a boolean value that indicates whether the image in question is public or not. |
| `region` | `string` | Yes | The slug identifier for the region where the resource will initially be available. |
| `regions` | `any[]` | No | This attribute is an array of the regions that the image is available in. |
| `size_gigabytes` | `number` | No | The size of the image in gigabytes. |
| `slug` | `string` | No | A uniquely identifying string that is associated with each of the DigitalOcean-provided public images. |
| `status` | `string` | No | A status string indicating the state of a custom image. |
| `tags` | `any[]` | No | A flat array of tag names as strings to be applied to the resource. |
| `type` | `string` | No | Describes the kind of image. |
| `url` | `string` | Yes | A URL from which the custom Linux virtual machine image may be retrieved. |

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

### Actions

This entity exposes custom API actions in addition to the standard
operations. Select one with `$action` in the call's argument; the
remaining keys are sent as that action's payload.

| Action | Route | Call |
| --- | --- | --- |
| `account_transfer` | `/v2/images/{image_id}/account_transfer` | `client.Image().create({ $action: 'account_transfer', ... })` |
| `account_transfer_accept` | `/v2/images/{image_id}/account_transfer/accept` | `client.Image().create({ $action: 'account_transfer_accept', ... })` |
| `account_transfer_cancel` | `/v2/images/{image_id}/account_transfer/cancel` | `client.Image().create({ $action: 'account_transfer_cancel', ... })` |
| `account_transfer_decline` | `/v2/images/{image_id}/account_transfer/decline` | `client.Image().create({ $action: 'account_transfer_decline', ... })` |
| `generation` | `/v1/images/generations` | `client.Image().create({ $action: 'generation', ... })` |

An action returns that action's OWN response, which is not necessarily a
Image record — check the API definition for its shape.

```ts
const result = await client.Image().create({
  $action: 'account_transfer',
  /* ...the action's own arguments */
})
```

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.Image().create({
  region: 'example_region',
  url: 'example_url',
})
```

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Image().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Image().load({ id: 'image_id' })
```

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria.

```ts
const result = await client.Image().remove({ id: 1 })
```

#### `update(data: object, ctrl?: object)`

Update an existing entity. The data must include the entity `id`.

```ts
const result = await client.Image().update({
  id: 1,
  // Fields to update
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ImageEntity` instance with the same client and
options.

#### `client()`

Return the parent `DigitaloceanSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ImageActionEntity

```ts
const image_action = client.ImageAction()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `completed_at` | `string` | No | A time value given in ISO8601 combined date and time format that represents when the action was completed. |
| `id` | `number` | No | A unique numeric ID that can be used to identify and reference an action. |
| `region` | `Record<string, any>` | Yes |  |
| `region_slug` | `string` | No | A human-readable string that is used as a unique identifier for each region. |
| `resource_id` | `number` | No | A unique identifier for the resource that the action is associated with. |
| `resource_type` | `string` | No | The type of resource that the action is associated with. |
| `started_at` | `string` | No | A time value given in ISO8601 combined date and time format that represents when the action was initiated. |
| `status` | `string` | No | The current status of the action. |
| `type` | `string` | No | This is the type of action that the object represents. |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.ImageAction().list({ id: 1 })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ImageActionEntity` instance with the same client and
options.

#### `client()`

Return the parent `DigitaloceanSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## InsightEntity

```ts
const insight = client.Insight()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `channel_type` | `string` | Yes | The configured channel type. |
| `created_at` | `string` | Yes | Time the alert rule was created. |
| `email` | `Record<string, any>` | Yes | Email notification channel configuration. |
| `id` | `string` | Yes | A unique identifier for the alert instance. |
| `last_notified_at` | `string` | No | Time a notification was last sent for this alert instance. |
| `last_triggered_at` | `string` | Yes | Time the alert instance most recently fired. |
| `name` | `string` | Yes | A human-readable name for the notification channel. |
| `resolved_at` | `string` | No | Time the alert instance resolved. |
| `resource_urn` | `string` | No | URN of the DigitalOcean resource the alert fired for. |
| `rule_id` | `string` | Yes | ID of the alert rule that fired this alert instance. |
| `severity` | `string` | Yes | Severity of the breached threshold. |
| `slack` | `Record<string, any>` | Yes | Slack notification channel configuration as returned in API responses. |
| `spec` | `Record<string, any>` | Yes | Spec for an Insights alert rule. |
| `status` | `string` | Yes | Current status of the alert instance. |
| `triggered_at` | `string` | Yes | Time the alert instance first fired. |
| `updated_at` | `string` | Yes | Time the alert rule was last updated. |
| `usage` | `any` | No |  |
| `value` | `number` | Yes | The observed metric value that breached the threshold. |
| `webhook` | `Record<string, any>` | Yes | Generic HTTPS webhook notification channel configuration as returned in API responses. |

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

### Actions

This entity exposes custom API actions in addition to the standard
operations. Select one with `$action` in the call's argument; the
remaining keys are sent as that action's payload.

| Action | Route | Call |
| --- | --- | --- |
| `alert_rule` | `/v2/insights/alert-rules` | `client.Insight().create({ $action: 'alert_rule', ... })` |
| `notification_channel` | `/v2/insights/notification-channels` | `client.Insight().create({ $action: 'notification_channel', ... })` |
| `alert_instance` | `/v2/insights/alert-instances` | `client.Insight().list({ $action: 'alert_instance', ... })` |
| `alert_rule` | `/v2/insights/alert-rules` | `client.Insight().list({ $action: 'alert_rule', ... })` |
| `notification_channel` | `/v2/insights/notification-channels` | `client.Insight().list({ $action: 'notification_channel', ... })` |

An action returns that action's OWN response, which is not necessarily a
Insight record — check the API definition for its shape.

```ts
const result = await client.Insight().create({
  $action: 'alert_rule',
  /* ...the action's own arguments */
})
```

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Insight().load({ id: 'insight_id' })
```

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria.

```ts
const result = await client.Insight().remove({ id: 'insight_id' })
```

#### `update(data: object, ctrl?: object)`

Update an existing entity. The data must include the entity `id`.

```ts
const result = await client.Insight().update({
  id: 'insight_id',
  // Fields to update
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `InsightEntity` instance with the same client and
options.

#### `client()`

Return the parent `DigitaloceanSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## InvoiceSummaryEntity

```ts
const invoice_summary = client.InvoiceSummary()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `amount` | `string` | No | Total amount of the invoice, in USD. |
| `billing_period` | `string` | No | Billing period of usage for which the invoice is issued, in `YYYY-MM` format. |
| `credits_and_adjustments` | `any` | No |  |
| `id` | `string` | No |  |
| `invoice_id` | `string` | No | ID of the invoice |
| `invoice_uuid` | `string` | No | UUID of the invoice |
| `overages` | `any` | No |  |
| `product_charges` | `any` | No |  |
| `taxes` | `any` | No |  |
| `user_billing_address` | `any` | No |  |
| `user_company` | `string` | No | Company of the DigitalOcean customer being invoiced, if set. |
| `user_email` | `string` | No | Email of the DigitalOcean customer being invoiced. |
| `user_name` | `string` | No | Name of the DigitalOcean customer being invoiced. |

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.InvoiceSummary().load({ id: 'invoice_summary_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `InvoiceSummaryEntity` instance with the same client and
options.

#### `client()`

Return the parent `DigitaloceanSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## KuberneteEntity

```ts
const kubernete = client.Kubernete()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `amd_gpu_device_metrics_exporter_plugin` | `Record<string, any>` | No | An object specifying whether the AMD Device Metrics Exporter should be enabled in the Kubernetes cluster. |
| `amd_gpu_device_plugin` | `Record<string, any>` | No | An object specifying whether the AMD GPU Device Plugin should be enabled in the Kubernetes cluster. |
| `amd_gpu_dra_driver` | `Record<string, any>` | No | An object specifying whether the AMD GPU DRA Driver should be enabled in the Kubernetes cluster. |
| `auto_scale` | `boolean` | No | A boolean value indicating whether auto-scaling is enabled for this node pool. |
| `auto_upgrade` | `boolean` | No | A boolean value indicating whether the cluster will be automatically upgraded to new patch releases during its maintenance window. |
| `cluster_autoscaler_configuration` | `Record<string, any>` | No | An object specifying custom cluster autoscaler configuration. |
| `cluster_subnet` | `string` | No | The range of IP addresses for the overlay network of the Kubernetes cluster in CIDR notation. |
| `control_plane_firewall` | `Record<string, any>` | No | An object specifying the control plane firewall for the Kubernetes cluster. |
| `coredns_autoscaler` | `Record<string, any>` | No | An object specifying whether the Cluster Proportional Autoscaler (CPA) add-on for CoreDNS should be enabled for the Kubernetes cluster. |
| `count` | `number` | Yes | The number of Droplet instances in the node pool. |
| `created_at` | `string` | No | A time value given in ISO8601 combined date and time format that represents when the Kubernetes cluster was created. |
| `endpoint` | `string` | No | The base URL of the API server on the Kubernetes master node. |
| `gpu_partition_mode` | `string` | No | The AMD GPU partition mode for this node pool. |
| `ha` | `boolean` | No | A boolean value indicating whether the control plane is run in a highly available configuration in the cluster. |
| `id` | `string` | No | A unique ID that can be used to identify and reference a specific node pool. |
| `ipv4` | `string` | No | The public IPv4 address of the Kubernetes master node. |
| `isolated_workers` | `boolean` | No | A boolean value indicating whether worker nodes in the cluster are not assigned public IP addresses. |
| `kubernetes_version` | `string` | No | The upstream version string for the version of Kubernetes provided by a given slug. |
| `labels` | `Record<string, any>` | No | An object of key/value mappings specifying labels to apply to all nodes in a pool. |
| `maintenance_policy` | `Record<string, any>` | No | An object specifying the maintenance window policy for the Kubernetes cluster. |
| `max_nodes` | `number` | No | The maximum number of nodes that this node pool can be auto-scaled to. |
| `message` | `string` | No | Status information about the cluster which impacts it's lifecycle. |
| `min_nodes` | `number` | No | The minimum number of nodes that this node pool can be auto-scaled to. |
| `name` | `string` | Yes | A human-readable name for the node pool. |
| `nfs_csi_plugin` | `Record<string, any>` | No | An object specifying whether the NFS CSI plugin should be enabled for the Kubernetes cluster. |
| `node_pools` | `any[]` | Yes | An object specifying the details of the worker nodes available to the Kubernetes cluster. |
| `nodes` | `any[]` | No | An object specifying the details of a specific worker node in a node pool. |
| `nvidia_gpu_device_plugin` | `Record<string, any>` | No | An object specifying whether the Nvidia GPU Device Plugin should be enabled in the Kubernetes cluster. |
| `nvidia_gpu_dra_driver` | `Record<string, any>` | No | An object specifying whether the NVIDIA GPU DRA Driver should be enabled in the Kubernetes cluster. |
| `p2p_oci_registry_plugin` | `Record<string, any>` | No | An object specifying whether the Peer-to-peer OCI registry component should be enabled for the Kubernetes cluster. |
| `rdma_shared_dev_plugin` | `Record<string, any>` | No | An object specifying whether the RDMA shared device plugin should be enabled in the Kubernetes cluster. |
| `region` | `string` | Yes | The slug identifier for the region where the Kubernetes cluster is located. |
| `registries` | `any[]` | No | An array of integrated DOCR registries. |
| `registry_enabled` | `boolean` | No | A read-only boolean value indicating if a container registry is integrated with the cluster. |
| `routing_agent` | `Record<string, any>` | No | An object specifying whether the routing-agent component should be enabled for the Kubernetes cluster. |
| `service_subnet` | `string` | No | The range of assignable IP addresses for services running in the Kubernetes cluster in CIDR notation. |
| `size` | `string` | Yes | The slug identifier for the type of Droplet used as workers in the node pool. |
| `slug` | `string` | No | The slug identifier for an available version of Kubernetes for use when creating or updating a cluster. |
| `sso` | `Record<string, any>` | No | An object specifying Single Sign-On (SSO) configuration for the Kubernetes cluster. |
| `status` | `Record<string, any>` | No | An object containing a `state` attribute whose value is set to a string indicating the current status of the cluster. |
| `supported_features` | `any[]` | No | The features available with the version of Kubernetes provided by a given slug. |
| `surge_upgrade` | `boolean` | No | A boolean value indicating whether surge upgrade is enabled/disabled for the cluster. |
| `tags` | `any[]` | No | An array containing the tags applied to the node pool. |
| `taints` | `any[]` | No | An array of taints to apply to all nodes in a pool. |
| `timestamp` | `string` | No | A timestamp in ISO8601 format that represents when the status message was emitted. |
| `updated_at` | `string` | No | A time value given in ISO8601 combined date and time format that represents when the Kubernetes cluster was last updated. |
| `version` | `string` | Yes | The slug identifier for the version of Kubernetes used for the cluster. |
| `vpc_uuid` | `string` | No | A string specifying the UUID of the VPC to which the Kubernetes cluster is assigned.<br><br>Requires `vpc:read` scope. |
| `worker_subnet_uuid` | `string` | No | The UUID of the VPC subnet worker nodes are attached to. |

### Actions

This entity exposes custom API actions in addition to the standard
operations. Select one with `$action` in the call's argument; the
remaining keys are sent as that action's payload.

| Action | Route | Call |
| --- | --- | --- |
| `cluster` | `/v2/kubernetes/clusters` | `client.Kubernete().create({ $action: 'cluster', ... })` |
| `clusterlint` | `/v2/kubernetes/clusters/{cluster_id}/clusterlint` | `client.Kubernete().create({ $action: 'clusterlint', ... })` |
| `recycle` | `/v2/kubernetes/clusters/{cluster_id}/node_pools/{node_pool_id}/recycle` | `client.Kubernete().create({ $action: 'recycle', ... })` |
| `registry` | `/v2/kubernetes/registries` | `client.Kubernete().create({ $action: 'registry', ... })` |
| `registry` | `/v2/kubernetes/registry` | `client.Kubernete().create({ $action: 'registry', ... })` |
| `upgrade` | `/v2/kubernetes/clusters/{cluster_id}/upgrade` | `client.Kubernete().create({ $action: 'upgrade', ... })` |
| `cluster` | `/v2/kubernetes/clusters` | `client.Kubernete().list({ $action: 'cluster', ... })` |
| `registry` | `/v2/kubernetes/registries` | `client.Kubernete().remove({ $action: 'registry', ... })` |
| `registry` | `/v2/kubernetes/registry` | `client.Kubernete().remove({ $action: 'registry', ... })` |

An action returns that action's OWN response, which is not necessarily a
Kubernete record — check the API definition for its shape.

```ts
const result = await client.Kubernete().create({
  $action: 'cluster',
  /* ...the action's own arguments */
})
```

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.Kubernete().create({
  cluster_id: 'example_cluster_id',
  count: 1,
  name: 'example_name',
  node_pools: [],
  region: 'example_region',
  size: 'example_size',
  version: 'example_version',
})
```

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Kubernete().list({ cluster_id: "example" })
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Kubernete().load({ cluster_id: 'cluster_id' })
```

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria.

```ts
const result = await client.Kubernete().remove({ cluster_id: 'cluster_id' })
```

#### `update(data: object, ctrl?: object)`

Update an existing entity. The data must include the entity `id`.

```ts
const result = await client.Kubernete().update({
  cluster_id: 'cluster_id',
  // Fields to update
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `KuberneteEntity` instance with the same client and
options.

#### `client()`

Return the parent `DigitaloceanSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## KubernetesOptionEntity

```ts
const kubernetes_option = client.KubernetesOption()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `regions` | `any[]` | No |  |
| `sizes` | `any[]` | No |  |
| `versions` | `any[]` | No |  |

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.KubernetesOption().load()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `KubernetesOptionEntity` instance with the same client and
options.

#### `client()`

Return the parent `DigitaloceanSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ListMcpServerToolEntity

```ts
const list_mcp_server_tool = client.ListMcpServerTool()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `description` | `string` | No | Tool description as the server reports it. |
| `enabled` | `boolean` | No | Whether the tool is enabled in your team's catalog. |
| `enabledToolSlugs` | `any[]` | Yes | The complete set of tool slugs (`<server_ref>_<name>`) to enable; every other tool of the server is disabled. |
| `name` | `string` | No | Tool name as the server reports it, normalized to the catalog's naming rules. |
| `quarantineReason` | `string` | No | Why the tool was quarantined; empty otherwise. |
| `quarantined` | `boolean` | No | True when the enabled tool was suspended because it disappeared from the server or its input schema changed incompatibly. |
| `toolSlug` | `string` | No | `<server_ref>_<name>`: the tool's catalog slug, and the value to list in `enabledToolSlugs`. |
| `tools` | `any[]` | No | Tools sorted by name. |
| `user_id` | `string` | No | Required for a server registered with `credentialRefSource` connection when a tool needs verification against the live server, which can only be reached as a user who has authorized it. |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.ListMcpServerTool().list({ server_ref: "example" })
```

#### `update(data: object, ctrl?: object)`

Update an existing entity. The data must include the entity `id`.

```ts
const result = await client.ListMcpServerTool().update({
  server_ref: 'server_ref',
  // Fields to update
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ListMcpServerToolEntity` instance with the same client and
options.

#### `client()`

Return the parent `DigitaloceanSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ListProviderEntity

```ts
const list_provider = client.ListProvider()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `auth_type` | `string` | No | Deprecated: read `auth_types`, since a provider may accept more than one credential kind. |
| `auth_types` | `any[]` | No | Credential kinds the provider accepts, sorted: none|oauth|`shared_api_key`|unknown|`user_oauth_app`|`user_token`. |
| `connection_parameters` | `any[]` | No | Non-sensitive values collected when creating a connection. |
| `credential_parameters` | `any[]` | No | Non-secret values collected when registering an API key provider credential. |
| `description` | `string` | No | Provider description. |
| `display_name` | `string` | No | Human-readable provider name. |
| `name` | `string` | No | Provider slug, used as provider when creating a connection or a provider credential. |
| `oauth_client_setup_url` | `string` | No | HTTPS page at the provider where a team creates that OAuth client, such as its developer console or setup guide. |
| `oauth_redirect_url` | `string` | No | Callback URL a team must register with the provider when it creates its own OAuth client. |
| `scopes` | `any[]` | No | The OAuth scopes a connection may request; a connection that requests none gets all of them. |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.ListProvider().list()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ListProviderEntity` instance with the same client and
options.

#### `client()`

Return the parent `DigitaloceanSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ListProviderHealthEntity

```ts
const list_provider_health = client.ListProviderHealth()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `health` | `any` | No | Metrics over the window. |
| `provider` | `string` | No | Provider ID. |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.ListProviderHealth().list()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ListProviderHealthEntity` instance with the same client and
options.

#### `client()`

Return the parent `DigitaloceanSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ListToolEntity

```ts
const list_tool = client.ListTool()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `definitions` | `any[]` | No | definitions[i] describes tools[i]. |
| `pagination` | `any` | No | page and `per_page` echo the values applied; total is the number of tools matching `toolkitId` across all pages. |
| `tools` | `any[]` | No | Tools on this page, grouped by provider and sorted by name within a provider. |
| `version` | `string` | No | Catalog version identifier, for example `v1`. |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.ListTool().list()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ListToolEntity` instance with the same client and
options.

#### `client()`

Return the parent `DigitaloceanSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ListToolHealthEntity

```ts
const list_tool_health = client.ListToolHealth()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `health` | `any` | No | Metrics over the window. |
| `provider` | `string` | No | ID of the provider that offers the tool. |
| `tool_slug` | `string` | No | Catalog tool slug. |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.ListToolHealth().list()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ListToolHealthEntity` instance with the same client and
options.

#### `client()`

Return the parent `DigitaloceanSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ListToolbeltProviderEntity

```ts
const list_toolbelt_provider = client.ListToolbeltProvider()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `categories` | `any[]` | No | The distinct tool categories among this toolbelt's members for the provider (sorted). |
| `created_at` | `string` | No | When the provider was added to the catalog. |
| `description` | `string` | No | Provider description. |
| `id` | `string` | No | Equals provider; present so the entry has the same shape as a toolkit. |
| `name` | `string` | No | The provider's display name. |
| `provider` | `string` | No | The provider ID. |
| `tool_count` | `number` | No | How many toolbelt members belong to this provider. |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.ListToolbeltProvider().list({ name: "example" })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ListToolbeltProviderEntity` instance with the same client and
options.

#### `client()`

Return the parent `DigitaloceanSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ListToolkitEntity

```ts
const list_toolkit = client.ListToolkit()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `categories` | `any[]` | No | Distinct categories of the provider's released tools, sorted. |
| `created_at` | `string` | No | When the provider was added. |
| `description` | `string` | No | Provider description. |
| `id` | `string` | No | Provider ID. |
| `name` | `string` | No | Human-readable provider name. |
| `provider_kind` | `string` | No | Classifies the provider, for example `managed_api` or `byo_mcp` (one of your team's MCP servers). |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.ListToolkit().list()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ListToolkitEntity` instance with the same client and
options.

#### `client()`

Return the parent `DigitaloceanSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## LoadBalancerEntity

```ts
const load_balancer = client.LoadBalancer()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `algorithm` | `string` | No | This field has been deprecated. |
| `created_at` | `string` | No | A time value given in ISO8601 combined date and time format that represents when the load balancer was created. |
| `disable_lets_encrypt_dns_records` | `boolean` | No | A boolean value indicating whether to disable automatic DNS record creation for Let's Encrypt certificates that are added to the load balancer. |
| `domains` | `any[]` | No | An array of objects specifying the domain configurations for a Global load balancer. |
| `droplet_ids` | `any[]` | No | An array containing the IDs of the Droplets assigned to the load balancer. |
| `enable_backend_keepalive` | `boolean` | No | A boolean value indicating whether HTTP keepalive connections are maintained to target Droplets. |
| `enable_proxy_protocol` | `boolean` | No | A boolean value indicating whether PROXY Protocol is in use. |
| `firewall` | `Record<string, any>` | No | An object specifying allow and deny rules to control traffic to the load balancer. |
| `forwarding_rules` | `any[]` | Yes | An array of objects specifying the forwarding rules for a load balancer. |
| `glb_settings` | `Record<string, any>` | No | An object specifying forwarding configurations for a Global load balancer. |
| `health_check` | `Record<string, any>` | No | An object specifying health check settings for the load balancer. |
| `http_idle_timeout_seconds` | `number` | No | An integer value which configures the idle timeout for HTTP requests to the target droplets. |
| `id` | `string` | No | A unique ID that can be used to identify and reference a load balancer. |
| `ip` | `string` | No | An attribute containing the public-facing IP address of the load balancer. |
| `ipv6` | `string` | No | An attribute containing the public-facing IPv6 address of the load balancer. |
| `name` | `string` | No | A human-readable name for a load balancer instance. |
| `network` | `string` | No | A string indicating whether the load balancer should be external or internal. |
| `network_stack` | `string` | No | A string indicating whether the load balancer will support IPv4 or both IPv4 and IPv6 networking. |
| `project_id` | `string` | No | The ID of the project that the load balancer is associated with. |
| `redirect_http_to_https` | `boolean` | No | A boolean value indicating whether HTTP requests to the load balancer on port 80 will be redirected to HTTPS on port 443. |
| `region` | `Record<string, any>` | No |  |
| `size` | `string` | No | This field has been replaced by the `size_unit` field for all regions except in AMS2, NYC2, and SFO1. |
| `size_unit` | `number` | No | How many nodes the load balancer contains. |
| `status` | `string` | No | A status string indicating the current state of the load balancer. |
| `sticky_sessions` | `Record<string, any>` | No | An object specifying sticky sessions settings for the load balancer. |
| `subnet_uuid` | `string` | No | A string specifying the UUID of the VPC subnet to which the load balancer is assigned. |
| `tag` | `string` | No | The name of a Droplet tag corresponding to Droplets assigned to the load balancer. |
| `target_load_balancer_ids` | `any[]` | No | An array containing the UUIDs of the Regional load balancers to be used as target backends for a Global load balancer. |
| `tls_cipher_policy` | `string` | No | A string indicating the policy for the TLS cipher suites used by the load balancer. |
| `type` | `string` | No | A string indicating whether the load balancer should be a standard regional HTTP load balancer, a regional network load balancer that routes traffic at the TCP/UDP transport layer, or a global load balancer. |
| `vpc_uuid` | `string` | No | A string specifying the UUID of the VPC to which the load balancer is assigned. |

### Actions

This entity exposes custom API actions in addition to the standard
operations. Select one with `$action` in the call's argument; the
remaining keys are sent as that action's payload.

| Action | Route | Call |
| --- | --- | --- |
| `droplet` | `/v2/load_balancers/{lb_id}/droplets` | `client.LoadBalancer().create({ $action: 'droplet', ... })` |
| `forwarding_rule` | `/v2/load_balancers/{lb_id}/forwarding_rules` | `client.LoadBalancer().create({ $action: 'forwarding_rule', ... })` |
| `cache` | `/v2/load_balancers/{lb_id}/cache` | `client.LoadBalancer().remove({ $action: 'cache', ... })` |
| `droplet` | `/v2/load_balancers/{lb_id}/droplets` | `client.LoadBalancer().remove({ $action: 'droplet', ... })` |
| `forwarding_rule` | `/v2/load_balancers/{lb_id}/forwarding_rules` | `client.LoadBalancer().remove({ $action: 'forwarding_rule', ... })` |

An action returns that action's OWN response, which is not necessarily a
LoadBalancer record — check the API definition for its shape.

```ts
const result = await client.LoadBalancer().create({
  $action: 'droplet',
  /* ...the action's own arguments */
})
```

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.LoadBalancer().create({
  forwarding_rules: [],
})
```

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.LoadBalancer().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.LoadBalancer().load({ id: 'load_balancer_id' })
```

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria.

```ts
const result = await client.LoadBalancer().remove({ id: 'load_balancer_id' })
```

#### `update(data: object, ctrl?: object)`

Update an existing entity. The data must include the entity `id`.

```ts
const result = await client.LoadBalancer().update({
  id: 'load_balancer_id',
  // Fields to update
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `LoadBalancerEntity` instance with the same client and
options.

#### `client()`

Return the parent `DigitaloceanSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## LogsSearchEntity

```ts
const logs_search = client.LogsSearch()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `data` | `any[]` | No | Matching log records. |
| `filter` | `Record<string, any>` | No | A boolean filter tree for logs queries. |
| `order_by` | `any[]` | No | Sort clauses applied to the result set. |
| `pagination` | `Record<string, any>` | No | Pagination response. |
| `time_range` | `Record<string, any>` | Yes | An inclusive query time window. |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.LogsSearch().create({
  query_id: 'example_query_id',
  time_range: {},
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `LogsSearchEntity` instance with the same client and
options.

#### `client()`

Return the parent `DigitaloceanSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## LogsinkEntity

```ts
const logsink = client.Logsink()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `config` | `any` | Yes |  |
| `id` | `string` | No |  |
| `sink_id` | `string` | Yes | A unique identifier for Logsink |
| `sink_name` | `string` | Yes | The name of the Logsink |
| `sink_type` | `string` | Yes |  |

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Logsink().load({ id: 'logsink_id', database_id: 'database_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `LogsinkEntity` instance with the same client and
options.

#### `client()`

Return the parent `DigitaloceanSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## McpServerEntity

```ts
const mcp_server = client.McpServer()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `api_key` | `string` | No | For `credentialRefSource` secret: the key or token itself. |
| `createdAt` | `string` | No | When the server was registered, in RFC 3339 format. |
| `credentialRef` | `string` | No | The secret reference supplied at registration when source=secret, or the team's OAuth credential ID when source=connection. |
| `credentialRefSource` | `string` | No | How requests to the server authenticate: none, secret (a key or token sent in the Authorization header), or connection (each user's own OAuth authorization). |
| `description` | `string` | No | Team-authored description, shown on the server's catalog card. |
| `endpoint` | `string` | No | HTTPS URL of the server's MCP endpoint. |
| `id` | `string` | No |  |
| `lastSyncedAt` | `string` | No | When discovery last succeeded, in RFC 3339 format; empty until the first success. |
| `oauth_authorization_ttl_seconds` | `string` | No | How long a user's authorization is reused before re-consent. |
| `oauth_authorize_url` | `string` | No | OAuth authorization endpoint. |
| `oauth_client_id` | `string` | No | Required for `credentialRefSource` connection: the client ID of your team's OAuth client for the server. |
| `oauth_client_secret` | `string` | No | Required for `credentialRefSource` connection. |
| `oauth_scopes` | `any[]` | No | OAuth scopes requested from each user. |
| `oauth_token_url` | `string` | No | Required for `credentialRefSource` connection: the OAuth token endpoint, under the same rules as `oauth_authorize_url`. |
| `protocolVersion` | `string` | No | MCP protocol revision negotiated with the server. |
| `serverRef` | `string` | No | Server identifier, unique within your team. |
| `syncError` | `string` | No | Why the latest discovery failed; empty after a successful one. |
| `syncStatus` | `string` | No | Outcome of the latest discovery: pending (no discovery has finished yet), ok, failed, or `unsupported_protocol`. |
| `toolCount` | `number` | No | Number of tools discovered on the server, whether enabled or not. |
| `transport` | `string` | No | Always `streamable_http`. |
| `updatedAt` | `string` | No | When the server was last modified, in RFC 3339 format. |

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

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.McpServer().create({
})
```

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.McpServer().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.McpServer().load({ id: 'mcp_server_id' })
```

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria.

```ts
const result = await client.McpServer().remove({ id: 'mcp_server_id' })
```

#### `update(data: object, ctrl?: object)`

Update an existing entity. The data must include the entity `id`.

```ts
const result = await client.McpServer().update({
  id: 'mcp_server_id',
  // Fields to update
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `McpServerEntity` instance with the same client and
options.

#### `client()`

Return the parent `DigitaloceanSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## MessageEntity

```ts
const message = client.Message()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `content` | `any[]` | Yes | Assistant output blocks (`text` and/or `tool_use`). |
| `id` | `string` | Yes | Unique identifier for this message object. |
| `max_tokens` | `number` | Yes | Maximum tokens to generate before stopping. |
| `messages` | `any[]` | Yes | Conversation turns. |
| `metadata` | `Record<string, any>` | No | Optional request metadata. |
| `model` | `string` | Yes | Model that produced the message. |
| `reasoning_effort` | `string` | No | DigitalOcean extension for reasoning-capable models. |
| `role` | `string` | Yes | Always `assistant` for this response. |
| `speed` | `string` | No | DigitalOcean extension for preferred inference speed. |
| `stop_reason` | `string` | Yes | Why generation stopped. |
| `stop_sequence` | `string` | No | When `stop_reason` is `stop_sequence`, the sequence that matched. |
| `stop_sequences` | `any[]` | No | Custom strings that stop generation when produced. |
| `stream` | `boolean` | No | When true, the response is streamed using server-sent events (SSE). |
| `system` | `any` | No | System prompt as plain text or as an array of text blocks. |
| `temperature` | `number` | No | Sampling temperature between 0.0 and 1.0. |
| `thinking` | `Record<string, any>` | Yes | Extended thinking configuration. |
| `tool_choice` | `any` | No | Controls how the model uses tools: automatic selection, require any tool, force a specific tool, or a string form accepted by the service. |
| `tools` | `any[]` | No | Tool definitions the model may invoke. |
| `top_k` | `number` | No | Top-K sampling cutoff. |
| `top_p` | `number` | No | Nucleus sampling; use either `temperature` or `top_p`, not both. |
| `type` | `string` | Yes | Object type discriminator. |
| `usage` | `Record<string, any>` | Yes | Token usage for a non-streaming `POST /v1/messages` response. |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.Message().create({
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

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `MessageEntity` instance with the same client and
options.

#### `client()`

Return the parent `DigitaloceanSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## MetricEntity

```ts
const metric = client.Metric()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `result` | `any[]` | Yes | Result of query. |
| `resultType` | `string` | Yes |  |

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Metric().load({ end: 'end', start: 'start' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `MetricEntity` instance with the same client and
options.

#### `client()`

Return the parent `DigitaloceanSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ModelEntity

```ts
const model = client.Model()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `created` | `number` | Yes | The Unix timestamp (in seconds) when the model was created. |
| `id` | `string` | Yes | The model identifier, which can be referenced in the API endpoints. |
| `object` | `string` | Yes | The object type, which is always "model". |
| `owned_by` | `string` | Yes | The organization that owns the model. |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Model().list()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ModelEntity` instance with the same client and
options.

#### `client()`

Return the parent `DigitaloceanSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## MonitoringAlertEntity

```ts
const monitoring_alert = client.MonitoringAlert()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `alerts` | `Record<string, any>` | Yes |  |
| `compare` | `string` | Yes |  |
| `description` | `string` | Yes |  |
| `enabled` | `boolean` | Yes |  |
| `entities` | `any[]` | Yes |  |
| `tags` | `any[]` | Yes |  |
| `type` | `string` | Yes |  |
| `uuid` | `string` | Yes |  |
| `value` | `number` | Yes |  |
| `window` | `string` | Yes |  |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.MonitoringAlert().create({
  alerts: {},
  compare: 'example_compare',
  description: 'example_description',
  enabled: true,
  entities: [],
  tags: [],
  type: 'example_type',
  uuid: 'example_uuid',
  value: 1,
  window: 'example_window',
})
```

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.MonitoringAlert().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.MonitoringAlert().load({ alert_uuid: 'alert_uuid' })
```

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria.

```ts
const result = await client.MonitoringAlert().remove({ alert_uuid: 'alert_uuid' })
```

#### `update(data: object, ctrl?: object)`

Update an existing entity. The data must include the entity `id`.

```ts
const result = await client.MonitoringAlert().update({
  alert_uuid: 'alert_uuid',
  // Fields to update
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `MonitoringAlertEntity` instance with the same client and
options.

#### `client()`

Return the parent `DigitaloceanSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## MonitoringSinkEntity

```ts
const monitoring_sink = client.MonitoringSink()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `destination` | `Record<string, any>` | Yes |  |
| `destination_uuid` | `string` | No | A unique identifier for an already-existing destination. |
| `resources` | `any[]` | No | List of resources identified by their URNs. |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.MonitoringSink().create({
  destination: {},
})
```

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.MonitoringSink().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.MonitoringSink().load({ sink_uuid: 'sink_uuid' })
```

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria.

```ts
const result = await client.MonitoringSink().remove({ sink_uuid: 'sink_uuid' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `MonitoringSinkEntity` instance with the same client and
options.

#### `client()`

Return the parent `DigitaloceanSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## MonitoringSinkDestinationEntity

```ts
const monitoring_sink_destination = client.MonitoringSinkDestination()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `config` | `Record<string, any>` | No | OpenSearch destination configuration with `credentials` omitted. |
| `id` | `string` | No | A unique identifier for a destination. |
| `name` | `string` | No | destination name |
| `type` | `string` | No | The destination type. |

### Field Usage by Operation

| Field | load | list | create | update | remove |
| --- | --- | --- | --- | --- | --- |
| `config` | - | - | Yes | Yes | - |
| `id` | - | - | - | - | - |
| `name` | - | - | - | - | - |
| `type` | - | - | Yes | Yes | - |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.MonitoringSinkDestination().create({
})
```

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.MonitoringSinkDestination().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.MonitoringSinkDestination().load({ id: 'monitoring_sink_destination_id' })
```

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria.

```ts
const result = await client.MonitoringSinkDestination().remove({ id: 'monitoring_sink_destination_id' })
```

#### `update(data: object, ctrl?: object)`

Update an existing entity. The data must include the entity `id`.

```ts
const result = await client.MonitoringSinkDestination().update({
  id: 'monitoring_sink_destination_id',
  // Fields to update
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `MonitoringSinkDestinationEntity` instance with the same client and
options.

#### `client()`

Return the parent `DigitaloceanSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## N1ClickEntity

```ts
const n1_click = client.N1Click()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `slug` | `string` | Yes | The slug identifier for the 1-Click application. |
| `type` | `string` | Yes | The type of the 1-Click application. |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.N1Click().list()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `N1ClickEntity` instance with the same client and
options.

#### `client()`

Return the parent `DigitaloceanSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## N1ClickApplicationEntity

```ts
const n1_click_application = client.N1ClickApplication()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `addon_slugs` | `any[]` | Yes | An array of 1-Click Application slugs to be installed to the Kubernetes cluster. |
| `cluster_uuid` | `string` | Yes | A unique ID for the Kubernetes cluster to which the 1-Click Applications will be installed. |
| `message` | `string` | No | A message about the result of the request. |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.N1ClickApplication().create({
  addon_slugs: [],
  cluster_uuid: 'example_cluster_uuid',
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `N1ClickApplicationEntity` instance with the same client and
options.

#### `client()`

Return the parent `DigitaloceanSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## NeighborIdEntity

```ts
const neighbor_id = client.NeighborId()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `neighbor_ids` | `any[]` | No | An array of arrays. |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.NeighborId().list()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `NeighborIdEntity` instance with the same client and
options.

#### `client()`

Return the parent `DigitaloceanSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## NfsEntity

```ts
const nfs = client.Nfs()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `access_points` | `any[]` | No | Access points configured on this share. |
| `created_at` | `string` | Yes | Timestamp for when the NFS share was created. |
| `host` | `string` | No | The host IP of the NFS server that will be accessible from the associated VPC |
| `id` | `string` | Yes | The unique identifier of the NFS share. |
| `mount_path` | `string` | No | Path at which the share will be available, to be mounted at a target of the user's choice within the client |
| `name` | `string` | Yes | The human-readable name of the share. |
| `performance_tier` | `string` | No | The performance tier of the share. |
| `region` | `string` | Yes | The DigitalOcean region slug (e.g., nyc2, atl1) where the NFS share resides. |
| `size_gib` | `number` | Yes | The desired/provisioned size of the share in GiB (Gibibytes). |
| `status` | `string` | Yes | The current status of the share. |
| `vpc_ids` | `any[]` | No | List of VPC IDs that should be able to access the share. |

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

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.Nfs().create({
  created_at: 'example_created_at',
  id: 'example_id',
  name: 'example_name',
  region: 'example_region',
  size_gib: 1,
  status: 'example_status',
})
```

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Nfs().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Nfs().load({ id: 'nfs_id' })
```

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria.

```ts
const result = await client.Nfs().remove({ id: 'nfs_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `NfsEntity` instance with the same client and
options.

#### `client()`

Return the parent `DigitaloceanSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## NfsAction2Entity

```ts
const nfs_action_2 = client.NfsAction2()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `string` | No |  |

### Actions

This entity exposes custom API actions in addition to the standard
operations. Select one with `$action` in the call's argument; the
remaining keys are sent as that action's payload.

| Action | Route | Call |
| --- | --- | --- |
| `actions` | `/v2/nfs/{nfs_id}/actions` | `client.NfsAction2().create({ $action: 'actions', ... })` |

An action returns that action's OWN response, which is not necessarily a
NfsAction2 record — check the API definition for its shape.

```ts
const result = await client.NfsAction2().create({
  $action: 'actions',
  /* ...the action's own arguments */
})
```

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.NfsAction2().create({
  id: 'example_id',
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `NfsAction2Entity` instance with the same client and
options.

#### `client()`

Return the parent `DigitaloceanSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## NfsSnapshotEntity

```ts
const nfs_snapshot = client.NfsSnapshot()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `created_at` | `string` | Yes | The timestamp when the snapshot was created. |
| `id` | `string` | Yes | The unique identifier of the snapshot. |
| `name` | `string` | Yes | The human-readable name of the snapshot. |
| `region` | `string` | Yes | The DigitalOcean region slug where the snapshot is located. |
| `share_id` | `string` | Yes | The unique identifier of the share from which this snapshot was created. |
| `size_gib` | `number` | Yes | The size of the snapshot in GiB. |
| `status` | `string` | Yes | The current status of the snapshot. |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.NfsSnapshot().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.NfsSnapshot().load({ id: 'nfs_snapshot_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `NfsSnapshotEntity` instance with the same client and
options.

#### `client()`

Return the parent `DigitaloceanSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## OnlineMigrationEntity

```ts
const online_migration = client.OnlineMigration()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `created_at` | `string` | No | The time the migration was initiated, in ISO 8601 format. |
| `disable_ssl` | `boolean` | No | Enables SSL encryption when connecting to the source database. |
| `id` | `string` | No | The ID of the most recent migration. |
| `ignore_dbs` | `any[]` | No | List of databases that should be ignored during migration. |
| `source` | `Record<string, any>` | Yes |  |
| `status` | `string` | No | The current status of the migration. |

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.OnlineMigration().load({ database_id: 'database_id' })
```

#### `update(data: object, ctrl?: object)`

Update an existing entity. The data must include the entity `id`.

```ts
const result = await client.OnlineMigration().update({
  database_id: 'database_id',
  // Fields to update
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `OnlineMigrationEntity` instance with the same client and
options.

#### `client()`

Return the parent `DigitaloceanSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## OptionEntity

```ts
const option = client.Option()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `options` | `Record<string, any>` | No |  |
| `version_availability` | `Record<string, any>` | No |  |

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Option().load()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `OptionEntity` instance with the same client and
options.

#### `client()`

Return the parent `DigitaloceanSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## OrganizationEntity

```ts
const organization = client.Organization()
```

### Actions

This entity exposes custom API actions in addition to the standard
operations. Select one with `$action` in the call's argument; the
remaining keys are sent as that action's payload.

| Action | Route | Call |
| --- | --- | --- |
| `team` | `/v2/organizations/team` | `client.Organization().create({ $action: 'team', ... })` |
| `team` | `/v2/organizations/teams` | `client.Organization().list({ $action: 'team', ... })` |

An action returns that action's OWN response, which is not necessarily a
Organization record — check the API definition for its shape.

```ts
const result = await client.Organization().create({
  $action: 'team',
  /* ...the action's own arguments */
})
```

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.Organization().create({
})
```

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Organization().list()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `OrganizationEntity` instance with the same client and
options.

#### `client()`

Return the parent `DigitaloceanSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## OutputViewEntity

```ts
const output_view = client.OutputView()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `audit` | `Record<string, any>` | No | Null on a preview, which stores nothing. |
| `description` | `string` | No | View description. |
| `fields` | `any[]` | No | The dotted output paths a projection keeps; arrays are traversed element-wise. |
| `id` | `string` | No |  |
| `kind` | `string` | No | `OUTPUT_VIEW_KIND_PROJECTION` or `OUTPUT_VIEW_KIND_TRANSFORM`. |
| `name` | `string` | No | View name, unique per tool version among its owner's views. |
| `output_schema` | `Record<string, any>` | No | The JSON Schema every result of this view satisfies. |
| `team_id` | `string` | No | Your team's ID on your team's views, and empty for a view DigitalOcean publishes to every team. |
| `tool` | `string` | No | The provider-qualified tool slug, for example `exa_search`. |
| `tool_id` | `string` | No | The opaque identity of the exact tool version the view is bound to; tool and version are its readable coordinates. |
| `version` | `string` | No | The tool version, for example `v3`. |
| `view_id` | `string` | No | Output view ID, for example `ov_` followed by 32 hex digits. |

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

### Actions

This entity exposes custom API actions in addition to the standard
operations. Select one with `$action` in the call's argument; the
remaining keys are sent as that action's payload.

| Action | Route | Call |
| --- | --- | --- |
| `preview` | `/v2/action-gateway/output-views/preview` | `client.OutputView().create({ $action: 'preview', ... })` |

An action returns that action's OWN response, which is not necessarily a
OutputView record — check the API definition for its shape.

```ts
const result = await client.OutputView().create({
  $action: 'preview',
  /* ...the action's own arguments */
})
```

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.OutputView().create({
})
```

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.OutputView().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.OutputView().load({ id: 'output_view_id' })
```

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria.

```ts
const result = await client.OutputView().remove({ id: 'output_view_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `OutputViewEntity` instance with the same client and
options.

#### `client()`

Return the parent `DigitaloceanSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## PartnerNetworkConnectEntity

```ts
const partner_network_connect = client.PartnerNetworkConnect()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `bgp` | `Record<string, any>` | No | The BGP configuration for the partner attachment. |
| `bgp_auth_key` | `Record<string, any>` | No |  |
| `children` | `any[]` | No | An array of associated partner attachment UUIDs. |
| `cidr` | `string` | No | A CIDR block representing a remote route. |
| `connection_bandwidth_in_mbps` | `number` | No | The bandwidth (in Mbps) of the connection. |
| `created_at` | `string` | No | A time value given in ISO8601 combined date and time format. |
| `id` | `string` | No | A unique ID that can be used to identify and reference the partner attachment. |
| `naas_provider` | `string` | No | The Network as a Service (NaaS) provider for the partner attachment. |
| `name` | `string` | No | The name of the partner attachment. |
| `parent_uuid` | `string` | No | Associated partner attachment UUID |
| `region` | `string` | No | The region where the partner attachment is located. |
| `state` | `string` | No | The current operational state of the attachment. |
| `vpc_ids` | `any[]` | No | An array of VPC network IDs. |

### Actions

This entity exposes custom API actions in addition to the standard
operations. Select one with `$action` in the call's argument; the
remaining keys are sent as that action's payload.

| Action | Route | Call |
| --- | --- | --- |
| `attachment` | `/v2/partner_network_connect/attachments` | `client.PartnerNetworkConnect().create({ $action: 'attachment', ... })` |
| `service_key` | `/v2/partner_network_connect/attachments/{pa_id}/service_key` | `client.PartnerNetworkConnect().create({ $action: 'service_key', ... })` |
| `attachment` | `/v2/partner_network_connect/attachments` | `client.PartnerNetworkConnect().list({ $action: 'attachment', ... })` |
| `service_key` | `/v2/partner_network_connect/attachments/{pa_id}/service_key` | `client.PartnerNetworkConnect().load({ $action: 'service_key', ... })` |

An action returns that action's OWN response, which is not necessarily a
PartnerNetworkConnect record — check the API definition for its shape.

```ts
const result = await client.PartnerNetworkConnect().create({
  $action: 'attachment',
  /* ...the action's own arguments */
})
```

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.PartnerNetworkConnect().list({ pa_id: "example" })
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.PartnerNetworkConnect().load({ pa_id: 'pa_id' })
```

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria.

```ts
const result = await client.PartnerNetworkConnect().remove({ pa_id: 'pa_id' })
```

#### `update(data: object, ctrl?: object)`

Update an existing entity. The data must include the entity `id`.

```ts
const result = await client.PartnerNetworkConnect().update({
  pa_id: 'pa_id',
  // Fields to update
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `PartnerNetworkConnectEntity` instance with the same client and
options.

#### `client()`

Return the parent `DigitaloceanSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## PrepaymentConfigEntity

```ts
const prepayment_config = client.PrepaymentConfig()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `config` | `Record<string, any>` | No |  |
| `status` | `Record<string, any>` | No |  |

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.PrepaymentConfig().load()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `PrepaymentConfigEntity` instance with the same client and
options.

#### `client()`

Return the parent `DigitaloceanSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## PrepaymentStatusEntity

```ts
const prepayment_status = client.PrepaymentStatus()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `balance` | `string` | No | Current prepayment balance. |
| `blocked` | `boolean` | No | Whether the prepayment gate is currently blocking usage. |
| `eligible` | `boolean` | No | Whether the account is eligible for the prepayment gate experience. |
| `is_auto_prepay_enabled` | `boolean` | No | Whether automatic prepayment top-up is enabled. |
| `month_to_date_balance` | `string` | No | Current account balance including month-to-date usage. |

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.PrepaymentStatus().load()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `PrepaymentStatusEntity` instance with the same client and
options.

#### `client()`

Return the parent `DigitaloceanSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ProjectEntity

```ts
const project = client.Project()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `created_at` | `string` | No | A time value given in ISO8601 combined date and time format that represents when the project was created. |
| `description` | `string` | No | The description of the project. |
| `environment` | `string` | No | The environment of the project's resources. |
| `id` | `string` | No | The unique universal identifier of this project. |
| `is_default` | `boolean` | No | If true, all resources will be added to this project if no project is specified. |
| `name` | `string` | No | The human-readable name for the project. |
| `owner_id` | `number` | No | The integer id of the project owner. |
| `owner_uuid` | `string` | No | The unique universal identifier of the project owner. |
| `purpose` | `string` | No | The purpose of the project. |
| `updated_at` | `string` | No | A time value given in ISO8601 combined date and time format that represents when the project was updated. |

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

### Actions

This entity exposes custom API actions in addition to the standard
operations. Select one with `$action` in the call's argument; the
remaining keys are sent as that action's payload.

| Action | Route | Call |
| --- | --- | --- |
| `default` | `/v2/projects/default` | `client.Project().load({ $action: 'default', ... })` |
| `default` | `/v2/projects/default` | `client.Project().patch({ $action: 'default', ... })` |
| `default` | `/v2/projects/default` | `client.Project().update({ $action: 'default', ... })` |

An action returns that action's OWN response, which is not necessarily a
Project record — check the API definition for its shape.

```ts
const result = await client.Project().load({
  $action: 'default',
  /* ...the action's own arguments */
})
```

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.Project().create({
})
```

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Project().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Project().load({ id: 'project_id' })
```

#### `patch(data: object, ctrl?: object)`

Change part of an existing entity: only the fields given are sent. The data must include the entity `id`.

```ts
const result = await client.Project().patch({
  id: 'project_id',
  // Only the fields to change
})
```

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria.

```ts
const result = await client.Project().remove({ id: 'project_id' })
```

#### `update(data: object, ctrl?: object)`

Update an existing entity. The data must include the entity `id`.

```ts
const result = await client.Project().update({
  id: 'project_id',
  // Fields to update
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ProjectEntity` instance with the same client and
options.

#### `client()`

Return the parent `DigitaloceanSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ProjectResourceEntity

```ts
const project_resource = client.ProjectResource()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `assigned_at` | `string` | No | A time value given in ISO8601 combined date and time format that represents when the project was created. |
| `id` | `string` | No |  |
| `links` | `Record<string, any>` | No | The links object contains the `self` object, which contains the resource relationship. |
| `resources` | `any[]` | No | All resources, including the ones added in the request, that are assigned to the project. |
| `status` | `string` | No | The status of assigning and fetching the resources. |
| `urn` | `string` | No | The uniform resource name (URN) for the resource in the format do:resource_type:resource_id. |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.ProjectResource().create({
  id: 'example_id',
})
```

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.ProjectResource().list({ id: "example" })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ProjectResourceEntity` instance with the same client and
options.

#### `client()`

Return the parent `DigitaloceanSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## PromQueryEntity

```ts
const prom_query = client.PromQuery()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `result` | `any` | Yes | Result payload shape depends on `resultType`. |
| `resultType` | `string` | Yes |  |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.PromQuery().create({
  query_id: 'example_query_id',
  result: 'example_result',
  resultType: 'example_resultType',
})
```

Declares a `application/x-www-form-urlencoded` body, which this SDK does not encode yet: it sends the data as JSON.

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.PromQuery().load({ query_id: 'query_id', query: 'query' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `PromQueryEntity` instance with the same client and
options.

#### `client()`

Return the parent `DigitaloceanSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## PromQueryRangeEntity

```ts
const prom_query_range = client.PromQueryRange()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `result` | `any[]` | Yes | One entry per matching series, each carrying the samples evaluated at every step across the requested range. |
| `resultType` | `string` | Yes |  |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.PromQueryRange().create({
  query_id: 'example_query_id',
  result: [],
  resultType: 'example_resultType',
})
```

Declares a `application/x-www-form-urlencoded` body, which this SDK does not encode yet: it sends the data as JSON.

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.PromQueryRange().load({ query_id: 'query_id', end: 'end', query: 'query', start: 'start', step: 'step' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `PromQueryRangeEntity` instance with the same client and
options.

#### `client()`

Return the parent `DigitaloceanSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## PromSeriesEntity

```ts
const prom_series = client.PromSeries()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `data` | `any[]` | Yes |  |
| `status` | `string` | Yes |  |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.PromSeries().create({
  query_id: 'example_query_id',
  data: [],
  status: 'example_status',
})
```

Declares a `application/x-www-form-urlencoded` body, which this SDK does not encode yet: it sends the data as JSON.

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.PromSeries().list({ query_id: "example", match: [] })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `PromSeriesEntity` instance with the same client and
options.

#### `client()`

Return the parent `DigitaloceanSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## PromStringListEntity

```ts
const prom_string_list = client.PromStringList()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `data` | `any[]` | Yes |  |
| `status` | `string` | Yes |  |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.PromStringList().create({
  query_id: 'example_query_id',
  data: [],
  status: 'example_status',
})
```

Declares a `application/x-www-form-urlencoded` body, which this SDK does not encode yet: it sends the data as JSON.

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.PromStringList().list({ query_id: "example" })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `PromStringListEntity` instance with the same client and
options.

#### `client()`

Return the parent `DigitaloceanSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## RegionEntity

```ts
const region = client.Region()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `available` | `boolean` | Yes | This is a boolean value that represents whether new Droplets can be created in this region. |
| `features` | `any[]` | Yes | This attribute is set to an array which contains features available in this region |
| `name` | `string` | Yes | The display name of the region. |
| `sizes` | `any[]` | Yes | This attribute is set to an array which contains the identifying slugs for the sizes available in this region. |
| `slug` | `string` | Yes | A human-readable string that is used as a unique identifier for each region. |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Region().list()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `RegionEntity` instance with the same client and
options.

#### `client()`

Return the parent `DigitaloceanSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ReservedIPv6Entity

```ts
const reserved_i_pv6 = client.ReservedIPv6()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `droplet` | `any` | No | Requires `droplet:read` scope. |
| `ip` | `string` | No | The public IP address of the reserved IPv6. |
| `region_slug` | `string` | No | The region that the reserved IPv6 is reserved to. |
| `reserved_at` | `string` | No | The date and time when the reserved IPv6 was reserved. |

### Field Usage by Operation

| Field | load | list | create | remove |
| --- | --- | --- | --- | --- |
| `droplet` | - | - | - | - |
| `ip` | - | - | - | - |
| `region_slug` | - | - | Yes | - |
| `reserved_at` | - | - | - | - |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.ReservedIPv6().create({
})
```

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.ReservedIPv6().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.ReservedIPv6().load({ reserved_ipv6: 'reserved_ipv6' })
```

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria.

```ts
const result = await client.ReservedIPv6().remove({ reserved_ipv6: 'reserved_ipv6' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ReservedIPv6Entity` instance with the same client and
options.

#### `client()`

Return the parent `DigitaloceanSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ReservedIPv6ActionEntity

```ts
const reserved_i_pv6_action = client.ReservedIPv6Action()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `action` | `Record<string, any>` | No |  |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.ReservedIPv6Action().create({
  reserved_ipv6_id: 'example_reserved_ipv6_id',
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ReservedIPv6ActionEntity` instance with the same client and
options.

#### `client()`

Return the parent `DigitaloceanSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ReservedIpEntity

```ts
const reserved_ip = client.ReservedIp()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `droplet` | `any` | No | The Droplet that the reserved IP has been assigned to. |
| `id` | `string` | No |  |
| `ip` | `string` | No | The public IP address of the reserved IP. |
| `links` | `Record<string, any>` | No |  |
| `locked` | `boolean` | No | A boolean value indicating whether or not the reserved IP has pending actions preventing new ones from being submitted. |
| `project_id` | `string` | No | The UUID of the project to which the reserved IP currently belongs.<br><br>Requires `project:read` scope. |
| `region` | `any` | No |  |
| `reserved_ip` | `Record<string, any>` | No |  |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.ReservedIp().create({
})
```

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.ReservedIp().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.ReservedIp().load({ id: 'reserved_ip_id' })
```

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria.

```ts
const result = await client.ReservedIp().remove({ id: 'reserved_ip_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ReservedIpEntity` instance with the same client and
options.

#### `client()`

Return the parent `DigitaloceanSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ReservedIpActionEntity

```ts
const reserved_ip_action = client.ReservedIpAction()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `action` | `Record<string, any>` | No |  |
| `completed_at` | `string` | No | A time value given in ISO8601 combined date and time format that represents when the action was completed. |
| `id` | `number` | No | A unique numeric ID that can be used to identify and reference an action. |
| `project_id` | `string` | No | The UUID of the project to which the reserved IP currently belongs. |
| `region` | `Record<string, any>` | Yes |  |
| `region_slug` | `string` | No | A human-readable string that is used as a unique identifier for each region. |
| `resource_id` | `number` | No | A unique identifier for the resource that the action is associated with. |
| `resource_type` | `string` | No | The type of resource that the action is associated with. |
| `started_at` | `string` | No | A time value given in ISO8601 combined date and time format that represents when the action was initiated. |
| `status` | `string` | No | The current status of the action. |
| `type` | `string` | No | This is the type of action that the object represents. |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.ReservedIpAction().create({
  reserved_ip_id: 'example_reserved_ip_id',
  region: {},
})
```

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.ReservedIpAction().list({ reserved_ip_id: "example" })
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.ReservedIpAction().load({ id: 1, reserved_ip_id: 'reserved_ip_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ReservedIpActionEntity` instance with the same client and
options.

#### `client()`

Return the parent `DigitaloceanSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ResyncEntity

```ts
const resync = client.Resync()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `authorization` | `any` | No | Set when discovery could not run because `user_id` has no authorized connection to this server yet. |
| `mcpServer` | `any` | No | The server, including `syncStatus` and `syncError`. |
| `pending` | `boolean` | No | True when discovery is still running (HTTP 202). |
| `tools` | `any[]` | No | Every tool discovered on the server when discovery finished in time; empty when pending is true. |
| `user_id` | `string` | No | Required for a server registered with `credentialRefSource` connection: discovery reaches the server as this user, through their connection, because such a server has no team-wide credential. |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.Resync().create({
  server_ref: 'example_server_ref',
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ResyncEntity` instance with the same client and
options.

#### `client()`

Return the parent `DigitaloceanSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## SearchEntity

```ts
const search = client.Search()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `actorId` | `string` | No | Empty when the session is not bound to an actor. |
| `agentName` | `string` | No | Name of the agent that started the session. |
| `agentUrn` | `string` | No | URN of the agent that started the session. |
| `auth_type` | `string` | No | Deprecated: read `auth_types`, since a provider may accept more than one credential kind. |
| `auth_types` | `any[]` | No | Credential kinds the provider accepts, sorted: none|oauth|`shared_api_key`|unknown|`user_oauth_app`|`user_token`. |
| `config` | `Record<string, any>` | No | Session options as supplied at creation. |
| `connection_parameters` | `any[]` | No | Non-sensitive values collected when creating a connection. |
| `createdAt` | `string` | No | When the session was created. |
| `credential_parameters` | `any[]` | No | Non-secret values collected when registering an API key provider credential. |
| `description` | `string` | No | Description of the latest version. |
| `display_name` | `string` | No | Human-readable label of the latest version. |
| `insights` | `any` | No | Omitted when no explicit customer Insights choice was stored. |
| `latest_version` | `string` | No | Latest version number, as a string. |
| `name` | `string` | No | The required human-readable session name. |
| `network` | `any` | No | Omitted when the request omitted network. |
| `oauth_client_setup_url` | `string` | No | HTTPS page at the provider where a team creates that OAuth client, such as its developer console or setup guide. |
| `oauth_redirect_url` | `string` | No | Callback URL a team must register with the provider when it creates its own OAuth client. |
| `owning_user_id` | `string` | No | DigitalOcean user ID of the user who created the session, when recorded. |
| `policy` | `any` | No | The session's tool-permission policy. |
| `reference_latest` | `string` | No | The toolbelt name, which refers to whichever version is latest. |
| `scopes` | `any[]` | No | The OAuth scopes a connection may request; a connection that requests none gets all of them. |
| `sessionUrn` | `string` | No | Session URN, for example `do:managed_agent_session:<uuid>`. |
| `status` | `string` | No | active, or deprecated once the toolbelt is deleted. |
| `tool_count` | `number` | No | Number of members in the latest version. |
| `tools` | `Record<string, any>` | No | Omitted when the request omitted tools (all tools). |
| `updatedAt` | `string` | No | When the session was last modified. |
| `updated_at` | `string` | No | When the latest version was last modified, in RFC 3339 format. |
| `version_count` | `number` | No | Number of versions recorded under this name, including versions from before the toolbelt was deleted and the name reused. |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Search().list()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `SearchEntity` instance with the same client and
options.

#### `client()`

Return the parent `DigitaloceanSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## SecurityPlanEntity

```ts
const security_plan = client.SecurityPlan()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `tier_coverage` | `Record<string, any>` | No | Scan coverage for each available plan tier. |

### Operations

#### `update(data: object, ctrl?: object)`

Update an existing entity. The data must include the entity `id`.

```ts
const result = await client.SecurityPlan().update({
  // Fields to update
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `SecurityPlanEntity` instance with the same client and
options.

#### `client()`

Return the parent `DigitaloceanSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## SecurityRuleEntity

```ts
const security_rule = client.SecurityRule()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `resource` | `string` | No | The URN of a resource to exclude from future scans. |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.SecurityRule().create({
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `SecurityRuleEntity` instance with the same client and
options.

#### `client()`

Return the parent `DigitaloceanSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## SecurityScanEntity

```ts
const security_scan = client.SecurityScan()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `created_at` | `string` | No | When scan was created. |
| `findings` | `any[]` | No |  |
| `id` | `string` | No | The unique identifier for the scan. |
| `name` | `string` | No | The name of the affected resource. |
| `status` | `string` | No | The status of the scan. |
| `type` | `string` | No | The type of the affected resource. |
| `urn` | `string` | No | The URN for the affected resource. |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.SecurityScan().create({
})
```

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.SecurityScan().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.SecurityScan().load({ scan_id: 'scan_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `SecurityScanEntity` instance with the same client and
options.

#### `client()`

Return the parent `DigitaloceanSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## SecuritySuppressionEntity

```ts
const security_suppression = client.SecuritySuppression()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `resources` | `any[]` | No | The URNs of resources to suppress for the rule. |
| `rule_uuid` | `string` | No | The rule UUID to suppress for the listed resources. |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.SecuritySuppression().create({
})
```

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria.

```ts
const result = await client.SecuritySuppression().remove({ suppression_uuid: 'suppression_uuid' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `SecuritySuppressionEntity` instance with the same client and
options.

#### `client()`

Return the parent `DigitaloceanSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## SettingEntity

```ts
const setting = client.Setting()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `plan_downgrades` | `Record<string, any>` | No |  |
| `settings` | `Record<string, any>` | No |  |
| `tier_coverage` | `Record<string, any>` | No |  |

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Setting().load()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `SettingEntity` instance with the same client and
options.

#### `client()`

Return the parent `DigitaloceanSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## SizeEntity

```ts
const size = client.Size()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `available` | `boolean` | Yes | This is a boolean value that represents whether new Droplets can be created with this size. |
| `description` | `string` | Yes | A string describing the class of Droplets created from this size. |
| `disk` | `number` | Yes | The amount of disk space set aside for Droplets of this size. |
| `disk_info` | `any[]` | No | An array of objects containing information about the disks available to Droplets created with this size. |
| `gpu_info` | `Record<string, any>` | No | An object containing information about the GPU capabilities of Droplets created with this size. |
| `memory` | `number` | Yes | The amount of RAM allocated to Droplets created of this size. |
| `price_hourly` | `number` | Yes | This describes the price of the Droplet size as measured hourly. |
| `price_monthly` | `number` | Yes | This attribute describes the monthly cost of this Droplet size if the Droplet is kept for an entire month. |
| `regions` | `any[]` | Yes | An array containing the region slugs where this size is available for Droplet creates. |
| `slug` | `string` | Yes | A human-readable string that is used to uniquely identify each size. |
| `transfer` | `number` | Yes | The amount of transfer bandwidth that is available for Droplets created in this size. |
| `vcpus` | `number` | Yes | The number of CPUs allocated to Droplets of this size. |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Size().list()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `SizeEntity` instance with the same client and
options.

#### `client()`

Return the parent `DigitaloceanSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## SnapshotEntity

```ts
const snapshot = client.Snapshot()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `created_at` | `string` | Yes | A time value given in ISO8601 combined date and time format that represents when the snapshot was created. |
| `id` | `string` | Yes | The unique identifier for the snapshot. |
| `min_disk_size` | `number` | Yes | The minimum size in GB required for a volume or Droplet to use this snapshot. |
| `name` | `string` | Yes | A human-readable name for the snapshot. |
| `regions` | `any[]` | Yes | An array of the regions that the snapshot is available in. |
| `resource_id` | `string` | Yes | The unique identifier for the resource that the snapshot originated from. |
| `resource_type` | `string` | Yes | The type of resource that the snapshot originated from. |
| `size_gigabytes` | `number` | Yes | The billable size of the snapshot in gigabytes. |
| `tags` | `any[]` | Yes | An array of Tags the snapshot has been tagged with.<br><br>Requires `tag:read` scope. |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Snapshot().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Snapshot().load({ id: 'snapshot_id' })
```

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria.

```ts
const result = await client.Snapshot().remove({ id: 'snapshot_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `SnapshotEntity` instance with the same client and
options.

#### `client()`

Return the parent `DigitaloceanSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## SpacesKeyEntity

```ts
const spaces_key = client.SpacesKey()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `access_key` | `string` | No | The Access Key ID used to access a bucket. |
| `created_at` | `string` | No | The date and time the key was created. |
| `grants` | `any[]` | No | The list of permissions for the access key. |
| `id` | `string` | No |  |
| `keys` | `any[]` | No |  |
| `name` | `string` | No | The access key's name. |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.SpacesKey().create({
})
```

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.SpacesKey().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.SpacesKey().load({ id: 'spaces_key_id' })
```

#### `patch(data: object, ctrl?: object)`

Change part of an existing entity: only the fields given are sent. The data must include the entity `id`.

```ts
const result = await client.SpacesKey().patch({
  id: 'spaces_key_id',
  // Only the fields to change
})
```

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria.

```ts
const result = await client.SpacesKey().remove({ id: 'spaces_key_id' })
```

#### `update(data: object, ctrl?: object)`

Update an existing entity. The data must include the entity `id`.

```ts
const result = await client.SpacesKey().update({
  id: 'spaces_key_id',
  // Fields to update
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `SpacesKeyEntity` instance with the same client and
options.

#### `client()`

Return the parent `DigitaloceanSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## SqlModeEntity

```ts
const sql_mode = client.SqlMode()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `sql_mode` | `string` | Yes | A string specifying the configured SQL modes for the MySQL cluster. |

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.SqlMode().load({ database_id: 'database_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `SqlModeEntity` instance with the same client and
options.

#### `client()`

Return the parent `DigitaloceanSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## SshKeyEntity

```ts
const ssh_key = client.SshKey()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `fingerprint` | `string` | No | A unique identifier that differentiates this key from other keys using a format that SSH recognizes. |
| `id` | `number` | No | A unique identification number for this key. |
| `name` | `string` | Yes | A human-readable display name for this key, used to easily identify the SSH keys when they are displayed. |
| `public_key` | `string` | Yes | The entire public key string that was uploaded. |

### Field Usage by Operation

| Field | load | list | create | update | remove |
| --- | --- | --- | --- | --- | --- |
| `fingerprint` | - | - | - | - | - |
| `id` | - | - | - | - | - |
| `name` | - | - | - | Yes | - |
| `public_key` | - | - | - | - | - |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.SshKey().create({
  name: 'example_name',
  public_key: 'example_public_key',
})
```

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.SshKey().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.SshKey().load({ id: 'ssh_key_id' })
```

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria.

```ts
const result = await client.SshKey().remove({ id: 'ssh_key_id' })
```

#### `update(data: object, ctrl?: object)`

Update an existing entity. The data must include the entity `id`.

```ts
const result = await client.SshKey().update({
  id: 'ssh_key_id',
  // Fields to update
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `SshKeyEntity` instance with the same client and
options.

#### `client()`

Return the parent `DigitaloceanSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## SystemoneEntity

```ts
const systemone = client.Systemone()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `answers` | `Record<string, any>` | Yes | A map of question name to answer, using the same keys as the request's `questions` object. |
| `model` | `string` | Yes | Model ID that produced the response. |
| `questions` | `Record<string, any>` | Yes | A map of question name to question definition. |
| `state` | `string` | Yes | The state to evaluate. |
| `usage` | `Record<string, any>` | Yes | Token usage for the request. |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.Systemone().create({
  answers: {},
  model: 'example_model',
  questions: {},
  state: 'example_state',
  usage: {},
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `SystemoneEntity` instance with the same client and
options.

#### `client()`

Return the parent `DigitaloceanSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## TagEntity

```ts
const tag = client.Tag()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `string` | No |  |
| `name` | `string` | No | The name of the tag. |
| `resources` | `Record<string, any>` | No | An embedded object containing key value pairs of resource type and resource statistics. |

### Actions

This entity exposes custom API actions in addition to the standard
operations. Select one with `$action` in the call's argument; the
remaining keys are sent as that action's payload.

| Action | Route | Call |
| --- | --- | --- |
| `resource` | `/v2/tags/{tag_id}/resources` | `client.Tag().create({ $action: 'resource', ... })` |
| `resource` | `/v2/tags/{tag_id}/resources` | `client.Tag().remove({ $action: 'resource', ... })` |

An action returns that action's OWN response, which is not necessarily a
Tag record — check the API definition for its shape.

```ts
const result = await client.Tag().create({
  $action: 'resource',
  /* ...the action's own arguments */
})
```

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.Tag().create({
})
```

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Tag().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Tag().load({ id: 'tag_id' })
```

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria.

```ts
const result = await client.Tag().remove({ id: 'tag_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `TagEntity` instance with the same client and
options.

#### `client()`

Return the parent `DigitaloceanSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ToolEntity

```ts
const tool = client.Tool()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `category` | `string` | No | Best-effort catalog metadata and is empty for a large share of the catalog. |
| `description` | `string` | No | What the tool does. |
| `history` | `Record<string, any>` | No | Present only when the request set `include_history`. |
| `id` | `string` | No |  |
| `name` | `string` | No | The unqualified tool name, without the provider prefix. |
| `provider` | `string` | No | The ID of the provider that offers the tool, broken out so a client never has to split `tool_slug`. |
| `snapshot` | `any` | No | When the metrics were computed and the window they cover. |
| `title` | `string` | No | Human-readable tool title. |
| `tool` | `any` | No | The tool's metrics over the window. |
| `tool_slug` | `string` | No | The provider-qualified, stable tool identifier (`<provider>_<name>`). |
| `version` | `number` | No | The version this toolbelt version pins for the member, matching the `@<version>` suffix in the corresponding toolbelt.tools entry. |

### Actions

This entity exposes custom API actions in addition to the standard
operations. Select one with `$action` in the call's argument; the
remaining keys are sent as that action's payload.

| Action | Route | Call |
| --- | --- | --- |
| `search` | `/v2/action-gateway/tools/search` | `client.Tool().list({ $action: 'search', ... })` |

An action returns that action's OWN response, which is not necessarily a
Tool record — check the API definition for its shape.

```ts
const result = await client.Tool().list({
  $action: 'search',
  /* ...the action's own arguments */
})
```

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Tool().list({ name: "example", provider_id: "example" })
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Tool().load({ id: 'tool_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ToolEntity` instance with the same client and
options.

#### `client()`

Return the parent `DigitaloceanSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ToolbeltEntity

```ts
const toolbelt = client.Toolbelt()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `created_at` | `string` | No | When this version was created, in RFC 3339 format. |
| `description` | `string` | No | Team-authored description. |
| `display_name` | `string` | No | Human-readable label. |
| `id` | `string` | No |  |
| `latest_version` | `string` | No | Latest version number, as a string. |
| `name` | `string` | No | Toolbelt name, unique among your team's active toolbelts. |
| `next_page_token` | `string` | No | Token for the next page of `tool_details`; empty on the last page. |
| `reference` | `string` | No | `<name>@<version>`, identifying this exact version. |
| `reference_latest` | `string` | No | The toolbelt name, which refers to whichever version is latest. |
| `status` | `string` | No | active, or deprecated once the toolbelt is deleted. |
| `tool_count` | `number` | No | Number of entries in tools. |
| `tool_details` | `any[]` | No | The requested page of resolved catalog metadata for the members named in toolbelt.tools. |
| `toolbelt` | `any` | No | The requested toolbelt version. |
| `tools` | `any[]` | No | Members, sorted, each as `<tool_slug>@<version>`: the tool and the version this toolbelt version pins. |
| `updated_at` | `string` | No | When this version was last modified, in RFC 3339 format. |
| `version` | `string` | No | Version number of this toolbelt version, as a string, for example `3`. |
| `version_count` | `number` | No | Number of versions recorded under this name, including versions from before the toolbelt was deleted and the name reused. |

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

### Actions

This entity exposes custom API actions in addition to the standard
operations. Select one with `$action` in the call's argument; the
remaining keys are sent as that action's payload.

| Action | Route | Call |
| --- | --- | --- |
| `tool_add` | `/v2/action-gateway/toolbelts/{name}/tools/add` | `client.Toolbelt().create({ $action: 'tool_add', ... })` |
| `tool_remove` | `/v2/action-gateway/toolbelts/{name}/tools/remove` | `client.Toolbelt().create({ $action: 'tool_remove', ... })` |

An action returns that action's OWN response, which is not necessarily a
Toolbelt record — check the API definition for its shape.

```ts
const result = await client.Toolbelt().create({
  $action: 'tool_add',
  /* ...the action's own arguments */
})
```

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.Toolbelt().create({
})
```

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Toolbelt().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Toolbelt().load({ id: 'toolbelt_id' })
```

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria.

```ts
const result = await client.Toolbelt().remove({ id: 'toolbelt_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ToolbeltEntity` instance with the same client and
options.

#### `client()`

Return the parent `DigitaloceanSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## UptimeEntity

```ts
const uptime = client.Uptime()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `comparison` | `string` | No | The comparison operator used against the alert's threshold. |
| `enabled` | `boolean` | No | A boolean value indicating whether the check is enabled/disabled. |
| `id` | `string` | No | A unique ID that can be used to identify and reference the alert. |
| `name` | `string` | No | A human-friendly display name. |
| `notifications` | `Record<string, any>` | Yes | The notification settings for a trigger alert. |
| `period` | `string` | No | Period of time the threshold must be exceeded to trigger the alert. |
| `previous_outage` | `Record<string, any>` | No |  |
| `regions` | `any[]` | No | An array containing the selected regions to perform healthchecks from. |
| `target` | `string` | No | The endpoint to perform healthchecks on. |
| `threshold` | `number` | No | The threshold at which the alert will enter a trigger state. |
| `type` | `string` | No | The type of alert. |

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

### Actions

This entity exposes custom API actions in addition to the standard
operations. Select one with `$action` in the call's argument; the
remaining keys are sent as that action's payload.

| Action | Route | Call |
| --- | --- | --- |
| `check` | `/v2/uptime/checks` | `client.Uptime().create({ $action: 'check', ... })` |
| `check` | `/v2/uptime/checks` | `client.Uptime().list({ $action: 'check', ... })` |

An action returns that action's OWN response, which is not necessarily a
Uptime record — check the API definition for its shape.

```ts
const result = await client.Uptime().create({
  $action: 'check',
  /* ...the action's own arguments */
})
```

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.Uptime().create({
  check_id: 'example_check_id',
  notifications: {},
})
```

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Uptime().list({ check_id: "example" })
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Uptime().load({ check_id: 'check_id' })
```

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria.

```ts
const result = await client.Uptime().remove({ check_id: 'check_id' })
```

#### `update(data: object, ctrl?: object)`

Update an existing entity. The data must include the entity `id`.

```ts
const result = await client.Uptime().update({
  check_id: 'check_id',
  // Fields to update
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `UptimeEntity` instance with the same client and
options.

#### `client()`

Return the parent `DigitaloceanSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## UserEntity

```ts
const user = client.User()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `connections` | `any[]` | No | The user's connections that are not revoked, sorted by provider. |
| `groups` | `any[]` | No | A list of in-cluster groups that the user belongs to. |
| `id` | `string` | No |  |
| `pagination` | `any` | No | Paging applied to this response and the total number of users. |
| `sessions` | `any[]` | No | Sessions bound to the user, oldest first. |
| `user_id` | `string` | No | The user ID: a session `actor_id` or a connection `user_id`. |
| `user_ids` | `any[]` | No | User IDs on this page. |
| `username` | `string` | No | The username for the cluster admin user. |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.User().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.User().load({ id: 'user_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `UserEntity` instance with the same client and
options.

#### `client()`

Return the parent `DigitaloceanSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## VectorDatabaseEntity

```ts
const vector_database = client.VectorDatabase()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `string` | No |  |

### Operations

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria.

```ts
const result = await client.VectorDatabase().remove({ id: 'id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `VectorDatabaseEntity` instance with the same client and
options.

#### `client()`

Return the parent `DigitaloceanSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## VectordbBackupEntity

```ts
const vectordb_backup = client.VectordbBackup()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `backup_id` | `string` | No | Unique identifier for the backup (e.g., "vectordb-{uuid}-20240101-120000"). |
| `completed_at` | `string` | No | Timestamp when the backup process completed. |
| `started_at` | `string` | No | Timestamp when the backup process started. |
| `status` | `string` | No | Status of the backup: SUCCESS. |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.VectordbBackup().list({ vector_database_id: "example" })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `VectordbBackupEntity` instance with the same client and
options.

#### `client()`

Return the parent `DigitaloceanSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## VectordbGetRestoreStatusEntity

```ts
const vectordb_get_restore_status = client.VectordbGetRestoreStatus()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `backup_id` | `string` | No | The backup ID being restored. |
| `error` | `string` | No | Error message if the restore failed. |
| `status` | `string` | No | Current status: STARTED, TRANSFERRING, TRANSFERRED, FINALIZING, SUCCESS, FAILED, CANCELLING, CANCELED. |

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.VectordbGetRestoreStatus().load({ backup_id: 'backup_id', vector_database_id: 'vector_database_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `VectordbGetRestoreStatusEntity` instance with the same client and
options.

#### `client()`

Return the parent `DigitaloceanSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## VectordbGetVectorDbEntity

```ts
const vectordb_get_vector_db = client.VectordbGetVectorDb()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `config` | `Record<string, any>` | No | VectorDBConfig holds optional, advanced cluster settings. |
| `created_at` | `string` | No |  |
| `endpoints` | `Record<string, any>` | No | VectorDBEndpoints contains the connection endpoints for a vector database instance. |
| `forked_from_id` | `string` | No | ID of the vector database this instance was forked from. |
| `id` | `string` | No |  |
| `last_restore_id` | `string` | No | Backup_id of the most recent restore initiated against this instance. |
| `name` | `string` | No | Required. |
| `owner_uuid` | `string` | No |  |
| `project_id` | `string` | No | Project this database belongs to. |
| `region` | `string` | No | Required. |
| `size` | `string` | No | Resource tier: small, medium, or large. |
| `status` | `string` | No | Lifecycle state: pending, creating, active, errored, or deleting. |
| `tags` | `any[]` | No | A set of arbitrary tags to organize your vector database |
| `updated_at` | `string` | No |  |

### Actions

This entity exposes custom API actions in addition to the standard
operations. Select one with `$action` in the call's argument; the
remaining keys are sent as that action's payload.

| Action | Route | Call |
| --- | --- | --- |
| `resize` | `/v2/vector-databases/{id}/resize` | `client.VectordbGetVectorDb().create({ $action: 'resize', ... })` |

An action returns that action's OWN response, which is not necessarily a
VectordbGetVectorDb record — check the API definition for its shape.

```ts
const result = await client.VectordbGetVectorDb().create({
  $action: 'resize',
  /* ...the action's own arguments */
})
```

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.VectordbGetVectorDb().create({
})
```

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.VectordbGetVectorDb().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.VectordbGetVectorDb().load({ id: 'vectordb_get_vector_db_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `VectordbGetVectorDbEntity` instance with the same client and
options.

#### `client()`

Return the parent `DigitaloceanSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## VectordbGetVectorDbAdminCredentialEntity

```ts
const vectordb_get_vector_db_admin_credential = client.VectordbGetVectorDbAdminCredential()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `api_token` | `string` | No | API token for that user. |
| `user_id` | `string` | No | Database user id from the cluster secret (opaque; matches what was provisioned). |

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.VectordbGetVectorDbAdminCredential().load({ vector_database_id: 'vector_database_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `VectordbGetVectorDbAdminCredentialEntity` instance with the same client and
options.

#### `client()`

Return the parent `DigitaloceanSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## VectordbRestoreBackupEntity

```ts
const vectordb_restore_backup = client.VectordbRestoreBackup()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `backup_id` | `string` | No | The backup ID being restored. |
| `id` | `string` | No | Required. |
| `status` | `string` | No | Initial status of the restore operation (e.g., "STARTED"). |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.VectordbRestoreBackup().create({
  backup_id: 'example_backup_id',
  vector_database_id: 'example_vector_database_id',
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `VectordbRestoreBackupEntity` instance with the same client and
options.

#### `client()`

Return the parent `DigitaloceanSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## VectordbUpdateVectorDbEntity

```ts
const vectordb_update_vector_db = client.VectordbUpdateVectorDb()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `config` | `Record<string, any>` | No | VectorDBConfig holds optional, advanced cluster settings. |
| `created_at` | `string` | No |  |
| `endpoints` | `Record<string, any>` | No | VectorDBEndpoints contains the connection endpoints for a vector database instance. |
| `forked_from_id` | `string` | No | ID of the vector database this instance was forked from. |
| `id` | `string` | No | ID of the vector database. |
| `last_restore_id` | `string` | No | Backup_id of the most recent restore initiated against this instance. |
| `name` | `string` | No |  |
| `owner_uuid` | `string` | No |  |
| `project_id` | `string` | No | Project this database belongs to. |
| `region` | `string` | No |  |
| `size` | `string` | No | Resource tier: small, medium, or large. |
| `status` | `string` | No | Lifecycle state: pending, creating, active, errored, or deleting. |
| `tags` | `any[]` | No |  |
| `updated_at` | `string` | No |  |

### Operations

#### `update(data: object, ctrl?: object)`

Update an existing entity. The data must include the entity `id`.

```ts
const result = await client.VectordbUpdateVectorDb().update({
  id: 'id',
  // Fields to update
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `VectordbUpdateVectorDbEntity` instance with the same client and
options.

#### `client()`

Return the parent `DigitaloceanSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## VectordbUpdateVectorDbTagEntity

```ts
const vectordb_update_vector_db_tag = client.VectordbUpdateVectorDbTag()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `config` | `Record<string, any>` | No | VectorDBConfig holds optional, advanced cluster settings. |
| `created_at` | `string` | No |  |
| `endpoints` | `Record<string, any>` | No | VectorDBEndpoints contains the connection endpoints for a vector database instance. |
| `forked_from_id` | `string` | No | ID of the vector database this instance was forked from. |
| `id` | `string` | No | Required. |
| `last_restore_id` | `string` | No | Backup_id of the most recent restore initiated against this instance. |
| `name` | `string` | No |  |
| `owner_uuid` | `string` | No |  |
| `project_id` | `string` | No | Project this database belongs to. |
| `region` | `string` | No |  |
| `size` | `string` | No | Resource tier: small, medium, or large. |
| `status` | `string` | No | Lifecycle state: pending, creating, active, errored, or deleting. |
| `tags` | `any[]` | No | Tags to set on the vector database. |
| `updated_at` | `string` | No |  |

### Operations

#### `update(data: object, ctrl?: object)`

Update an existing entity. The data must include the entity `id`.

```ts
const result = await client.VectordbUpdateVectorDbTag().update({
  vector_database_id: 'vector_database_id',
  // Fields to update
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `VectordbUpdateVectorDbTagEntity` instance with the same client and
options.

#### `client()`

Return the parent `DigitaloceanSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## VpcEntity

```ts
const vpc = client.Vpc()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `created_at` | `string` | No | A time value given in ISO8601 combined date and time format. |
| `default` | `boolean` | No | A boolean value indicating whether or not the VPC is the default network for the region. |
| `description` | `string` | No | A free-form text field for describing the VPC's purpose. |
| `id` | `string` | No | A unique ID that can be used to identify and reference the VPC. |
| `ip_range` | `string` | No | The range of IP addresses in the VPC in CIDR notation. |
| `name` | `string` | No | The name of the VPC. |
| `region` | `string` | No | The slug identifier for the region where the VPC will be created. |
| `status` | `string` | No | The current status of the VPC peering. |
| `urn` | `string` | No | The uniform resource name (URN) for the resource in the format do:resource_type:resource_id. |
| `vpc_ids` | `any[]` | No | An array of the two peered VPCs IDs. |

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

### Actions

This entity exposes custom API actions in addition to the standard
operations. Select one with `$action` in the call's argument; the
remaining keys are sent as that action's payload.

| Action | Route | Call |
| --- | --- | --- |
| `peering` | `/v2/vpcs/{vpc_id}/peerings` | `client.Vpc().create({ $action: 'peering', ... })` |
| `member` | `/v2/vpcs/{vpc_id}/members` | `client.Vpc().list({ $action: 'member', ... })` |
| `peering` | `/v2/vpcs/{vpc_id}/peerings` | `client.Vpc().list({ $action: 'peering', ... })` |

An action returns that action's OWN response, which is not necessarily a
Vpc record — check the API definition for its shape.

```ts
const result = await client.Vpc().create({
  $action: 'peering',
  /* ...the action's own arguments */
})
```

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.Vpc().create({
})
```

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Vpc().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Vpc().load({ id: 'vpc_id' })
```

#### `patch(data: object, ctrl?: object)`

Change part of an existing entity: only the fields given are sent. The data must include the entity `id`.

```ts
const result = await client.Vpc().patch({
  id: 'vpc_id',
  // Only the fields to change
})
```

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria.

```ts
const result = await client.Vpc().remove({ id: 'vpc_id' })
```

#### `update(data: object, ctrl?: object)`

Update an existing entity. The data must include the entity `id`.

```ts
const result = await client.Vpc().update({
  id: 'vpc_id',
  // Fields to update
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `VpcEntity` instance with the same client and
options.

#### `client()`

Return the parent `DigitaloceanSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## VpcNatGatewayEntity

```ts
const vpc_nat_gateway = client.VpcNatGateway()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `created_at` | `string` | No | A time value given in ISO8601 combined date and time format that represents when the VPC NAT gateway was created. |
| `egresses` | `Record<string, any>` | No | An object containing egress information for the VPC NAT gateway. |
| `icmp_timeout_seconds` | `number` | No | The ICMP timeout in seconds for the VPC NAT gateway. |
| `id` | `string` | No | The unique identifier for the VPC NAT gateway. |
| `name` | `string` | No | The human-readable name of the VPC NAT gateway. |
| `region` | `string` | No | The region in which the VPC NAT gateway is created. |
| `size` | `number` | No | The size of the VPC NAT gateway. |
| `state` | `string` | No | The current state of the VPC NAT gateway. |
| `tcp_timeout_seconds` | `number` | No | The TCP timeout in seconds for the VPC NAT gateway. |
| `type` | `string` | No | The type of the VPC NAT gateway. |
| `udp_timeout_seconds` | `number` | No | The UDP timeout in seconds for the VPC NAT gateway. |
| `updated_at` | `string` | No | A time value given in ISO8601 combined date and time format that represents when the VPC NAT gateway was last updated. |
| `vpcs` | `any[]` | No | An array of VPCs associated with the VPC NAT gateway. |

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

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.VpcNatGateway().create({
})
```

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.VpcNatGateway().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.VpcNatGateway().load({ id: 'vpc_nat_gateway_id' })
```

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria.

```ts
const result = await client.VpcNatGateway().remove({ id: 'vpc_nat_gateway_id' })
```

#### `update(data: object, ctrl?: object)`

Update an existing entity. The data must include the entity `id`.

```ts
const result = await client.VpcNatGateway().update({
  id: 'vpc_nat_gateway_id',
  // Fields to update
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `VpcNatGatewayEntity` instance with the same client and
options.

#### `client()`

Return the parent `DigitaloceanSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## VpcPeeringEntity

```ts
const vpc_peering = client.VpcPeering()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `created_at` | `string` | No | A time value given in ISO8601 combined date and time format. |
| `id` | `string` | No | A unique ID that can be used to identify and reference the VPC peering. |
| `name` | `string` | No | The name of the VPC peering. |
| `status` | `string` | No | The current status of the VPC peering. |
| `vpc_ids` | `any[]` | No | An array of the two peered VPCs IDs. |

### Field Usage by Operation

| Field | load | list | create | update | remove |
| --- | --- | --- | --- | --- | --- |
| `created_at` | - | - | - | - | - |
| `id` | - | - | - | - | - |
| `name` | - | - | Yes | Yes | - |
| `status` | - | - | - | - | - |
| `vpc_ids` | - | - | Yes | - | - |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.VpcPeering().create({
})
```

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.VpcPeering().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.VpcPeering().load({ id: 'vpc_peering_id' })
```

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria.

```ts
const result = await client.VpcPeering().remove({ id: 'vpc_peering_id' })
```

#### `update(data: object, ctrl?: object)`

Update an existing entity. The data must include the entity `id`.

```ts
const result = await client.VpcPeering().update({
  id: 'vpc_peering_id',
  // Fields to update
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `VpcPeeringEntity` instance with the same client and
options.

#### `client()`

Return the parent `DigitaloceanSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## VpcRoutesPublicPreviewEntity

```ts
const vpc_routes__public_preview = client.VpcRoutesPublicPreview()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `created_at` | `string` | No | The time when the route was created. |
| `destination_cidr` | `string` | Yes | A valid IPv4 CIDR accepted by the VPC routing product. |
| `id` | `string` | Yes | The unique identifier of the route. |
| `modifiable` | `boolean` | No | Whether the caller can update or delete the route. |
| `target_urns` | `any[]` | Yes | The URNs of supported next-hop resources. |
| `type` | `string` | Yes | The route type inferred from how the route is sourced. |

### Actions

This entity exposes custom API actions in addition to the standard
operations. Select one with `$action` in the call's argument; the
remaining keys are sent as that action's payload.

| Action | Route | Call |
| --- | --- | --- |
| `routes` | `/v2/vpcs/{vpc_uuid}/routes` | `client.VpcRoutesPublicPreview().list({ $action: 'routes', ... })` |

An action returns that action's OWN response, which is not necessarily a
VpcRoutesPublicPreview record — check the API definition for its shape.

```ts
const result = await client.VpcRoutesPublicPreview().list({
  $action: 'routes',
  /* ...the action's own arguments */
})
```

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.VpcRoutesPublicPreview().create({
  subnet_id: 'example_subnet_id',
  vpc_id: 'example_vpc_id',
  destination_cidr: 'example_destination_cidr',
  id: 'example_id',
  target_urns: [],
  type: 'example_type',
})
```

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.VpcRoutesPublicPreview().list({ subnet_id: "example", vpc_id: "example" })
```

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria.

```ts
const result = await client.VpcRoutesPublicPreview().remove({ id: 'id', subnet_id: 'subnet_id', vpc_id: 'vpc_id' })
```

#### `update(data: object, ctrl?: object)`

Update an existing entity. The data must include the entity `id`.

```ts
const result = await client.VpcRoutesPublicPreview().update({
  id: 'id',
  subnet_id: 'subnet_id',
  vpc_id: 'vpc_id',
  // Fields to update
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `VpcRoutesPublicPreviewEntity` instance with the same client and
options.

#### `client()`

Return the parent `DigitaloceanSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## VpcSubnetsPublicPreviewEntity

```ts
const vpc_subnets__public_preview = client.VpcSubnetsPublicPreview()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `created_at` | `string` | Yes | The time when the VPC subnet was created. |
| `default` | `boolean` | No | Whether this is the default subnet for the VPC. |
| `id` | `string` | Yes | The unique identifier of the VPC subnet. |
| `ip_range` | `string` | Yes | The IPv4 range assigned to the subnet in CIDR notation. |
| `meta` | `Record<string, any>` | No | Additional information about the VPC subnet. |
| `name` | `string` | Yes | The human-readable name of the VPC subnet. |
| `region` | `string` | Yes | The slug of the region containing the VPC subnet. |
| `type` | `string` | Yes | The type of the VPC subnet. |
| `urn` | `string` | Yes | The uniform resource name of the VPC subnet. |

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

### Actions

This entity exposes custom API actions in addition to the standard
operations. Select one with `$action` in the call's argument; the
remaining keys are sent as that action's payload.

| Action | Route | Call |
| --- | --- | --- |
| `subnets` | `/v2/vpcs/{vpc_uuid}/subnets` | `client.VpcSubnetsPublicPreview().create({ $action: 'subnets', ... })` |
| `subnets` | `/v2/vpcs/{vpc_uuid}/subnets` | `client.VpcSubnetsPublicPreview().list({ $action: 'subnets', ... })` |

An action returns that action's OWN response, which is not necessarily a
VpcSubnetsPublicPreview record — check the API definition for its shape.

```ts
const result = await client.VpcSubnetsPublicPreview().create({
  $action: 'subnets',
  /* ...the action's own arguments */
})
```

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.VpcSubnetsPublicPreview().create({
  id: 'example_id',
  created_at: 'example_created_at',
  ip_range: 'example_ip_range',
  name: 'example_name',
  region: 'example_region',
  type: 'example_type',
  urn: 'example_urn',
})
```

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.VpcSubnetsPublicPreview().list({ subnet_uuid: "example", vpc_id: "example" })
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.VpcSubnetsPublicPreview().load({ subnet_uuid: 'subnet_uuid', vpc_id: 'vpc_id' })
```

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria.

```ts
const result = await client.VpcSubnetsPublicPreview().remove({ subnet_uuid: 'subnet_uuid', vpc_id: 'vpc_id' })
```

#### `update(data: object, ctrl?: object)`

Update an existing entity. The data must include the entity `id`.

```ts
const result = await client.VpcSubnetsPublicPreview().update({
  subnet_uuid: 'subnet_uuid',
  vpc_id: 'vpc_id',
  // Fields to update
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `VpcSubnetsPublicPreviewEntity` instance with the same client and
options.

#### `client()`

Return the parent `DigitaloceanSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | Test transport |


Features are activated via the `feature` option:

```ts
const client = new DigitaloceanSDK({
  feature: {
    test: { active: true },
  }
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

