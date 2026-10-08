# DigitalOcean API

The DigitalOcean API.

## Start here

This guide introduces the API, the client libraries, and the companion tools in this repository. Start with the API capabilities, choose a client for your application, and use the linked reference when you need exact request and response details.

The selected API surface contains 235 entities and 759 HTTP routes. There are 2 SDK targets.

An entity groups related API operations. An operation can have several routes with different inputs or authentication requirements. The SDK exposes the entity and its operations using the conventions of the selected language.

## What the API provides

### AccessPoint

Results: The response will be a JSON object containing the created access point and an action object.; The response will be a JSON object with a key called `access_points`. The value will be an array of objects containing the standard attributes associated with NFS access points.; The response will be a JSON object with a key called `access_point`. The value will be an object containing the standard attributes associated with an NFS access point.; The response will be a JSON object containing the deleted access point (marked as DELETED) and an action object indicating the delete operation.

SDK operations: `create`, `list`, `load`, `remove`.

Key fields to recognise:

- `access_policy`: Provider-agnostic NFS access policy for an access point. Network CIDRs are managed by attach, detach, and managed-access workflows and are not part of this policy.
- `created_at`: The timestamp when the access point was created.
- `id`: The unique identifier of the access point.
- `is_default`: Whether this is the share&#39;s default access point.
- `name`: The human-readable name of the access point. Must be unique per share.

### Account

Results: A JSON object keyed on account with an excerpt of the current user account data.

SDK operations: `load`.

Key fields to recognise:

- `droplet_limit`: The total number of Droplets current user or team may have active at one time. Requires `droplet:read` scope.
- `email`: The email address used by the current user to register for DigitalOcean.
- `email_verified`: If true, the user has verified their account via email. False otherwise.
- `floating_ip_limit`: The total number of Floating IPs the current user or team may have. Requires `reserved_ip:read` scope.
- `name`: The display name for the current user.

### Action

Results: The results will be returned as a JSON object with an actions key. This will be set to an array filled with action objects containing the standard action attributes; The result will be a JSON object with an action key. This will be set to an action object containing the standard action attributes.

SDK operations: `list`, `load`.

Key fields to recognise:

- `completed_at`: A time value given in ISO8601 combined date and time format that represents when the action was completed.
- `id`: A unique numeric ID that can be used to identify and reference an action.
- `region_slug`: A human-readable string that is used as a unique identifier for each region.
- `resource_id`: A unique identifier for the resource that the action is associated with.
- `resource_type`: The type of resource that the action is associated with.

### ActorLimit

Results: The request was successful.

SDK operations: `list`.

Key fields to recognise:

- `category`: The category the limit applies to.
- `id`: A short identifier corresponding to the HTTP status code returned. For example, the ID for a response returning a 404 status code would be &quot;`not_found`.&quot;
- `requests_per_minute`: Calls allowed per minute. 0 blocks every call in the category.

### AddOnApp

Results: The response will be a JSON object with a key called `metadata`. `metadata` will be an array of objects, each representing a metadata item for the app. Each object will contain details such as `id`, `name`, `display_name`, `description`, `type`, and `options`. For additional details specific to the app, find and view its [DigitalOcean Marketplace](https://marketplace.digitalocean.com) page.; The response will be a JSON object with a key called `apps`. `apps` will be an array of objects.

SDK operations: `list`.

Key fields to recognise:

- `app_slug`: The slug identifier for the application associated with the resource.
- `description`: A brief description of the metadata item.
- `display_name`: The display name of the metadata item.
- `eula`: The End User License Agreement URL for the resource.
- `id`: Unique identifier for the addon metadata item.

### AddOnPlan

Results: The response will be a JSON object with a key called `resource`, representing the updated resource.

SDK operations: `update`.

Key fields to recognise:

- `app_name`: The name of the application associated with the resource.
- `app_slug`: The slug identifier for the application associated with the resource.
- `has_config`: Indicates if the resource has configuration values set by the vendor.
- `message`: A message related to the resource, if applicable.
- `metadata`: Metadata associated with the resource, set by the user.

### AddOnResource

Results: The response will be a JSON object with a key called `resource`. The value of this will be the resource created with the given. For additional details specific to the app, find and view its [DigitalOcean Marketplace](https://marketplace.digitalocean.com) page.; The response will be an array of JSON objects with a key called `resources`.; The response will be a JSON object with a key called `resource`.; The action was successful and the response body is empty.; The response will be a JSON object with a key called `resource`, representing the updated resource.

SDK operations: `create`, `list`, `load`, `remove`, `update`.

Key fields to recognise:

- `app_name`: The name of the application associated with the resource.
- `app_slug`: The slug identifier for the application associated with the resource.
- `fleet_uuid`: UUID of the fleet/project to which this resource will belong.
- `has_config`: Indicates if the resource has configuration values set by the vendor.
- `linked_droplet_id`: ID of the droplet to be linked to this resource, if applicable.

### ApiAgentVersion

Results: A successful response.

SDK operations: `list`.

Key fields to recognise:

- `agent_uuid`: Uuid of the agent this version belongs to
- `attached_child_agents`: List of child agent relationships
- `attached_functions`: List of function versions
- `attached_guardrails`: List of guardrail version
- `attached_knowledgebases`: List of knowledge base agent versions

### ApiCreateAgentApiKeyOutput

Results: A successful response.

SDK operations: `create`.

Key fields to recognise:

- `agent_uuid`: Agent id
- `created_at`: Creation date
- `created_by`: Created by
- `deleted_at`: Deleted date
- `name`: Name

### ApiCreateDataSourceFileUploadPresignedUrlsOutput

Results: A successful response.

SDK operations: `create`.

Key fields to recognise:

- `files`: A list of files to generate presigned URLs for.
- `request_id`: The ID generated for the request for Presigned URLs.
- `uploads`: A list of generated presigned URLs and object keys, one per file.

### ApiCreateKnowledgeBaseDataSourceOutput

Results: A successful response.

SDK operations: `create`.

Key fields to recognise:

- `aws_data_source`: AWS S3 Data Source for Display
- `bucket_name`: Name of storage bucket - Deprecated, moved to `data_source_details`
- `created_at`: Creation date / time
- `dropbox_data_source`: Dropbox Data Source for Display
- `file_upload_data_source`: File to upload as data source for knowledge base.

### ApiCreateScenarioSetFromLibraryOutput

Results: A successful response.

SDK operations: `create`.

Key fields to recognise:

- `bucket_name`: Object storage bucket holding the scenario file. Unset while status is generating.
- `bucket_region`: Object storage bucket region. Unset while status is generating.
- `created_at`: Time created at.
- `deleted_at`: Time deleted at. Unset unless the scenario set has been deleted.
- `description`: Customer-supplied description.

### ApiDeleteAgentApiKeyOutput

Results: A successful response.

SDK operations: `remove`, `update`.

### ApiDeleteAgentOutput

Results: A successful response.

SDK operations: `create`, `list`, `remove`.

Key fields to recognise:

- `anthropic_api_key`: Anthropic API Key Info
- `anthropic_key_uuid`: Optional Anthropic API key ID to use with Anthropic models
- `api_key_infos`: Api key infos
- `api_keys`: Api keys
- `chatbot`: A Chatbot

### ApiDeleteAnthropicApiKeyOutput

Results: A successful response.

SDK operations: `create`, `list`, `remove`.

Key fields to recognise:

- `api_key`: Anthropic API key
- `created_at`: Key creation date
- `created_by`: Created by user id from DO
- `deleted_at`: Key deleted date
- `name`: Name

### ApiDeleteCustomEvaluationMetricOutput

Results: A successful response.

SDK operations: `remove`.

### ApiDeleteCustomModelOutputPublic

Results: A successful response.

SDK operations: `remove`.

### ApiDeleteEvaluationDatasetOutput

Results: A successful response.

SDK operations: `create`, `list`, `remove`.

Key fields to recognise:

- `created_at`: Time created at.
- `dataset_name`: Name of the dataset.
- `dataset_paradigm`: EvaluationDatasetParadigm is the row/content shape of a dataset, orthogonal to the surface in EvaluationDatasetType (for example a model dataset can be single- or multi-turn).
- `dataset_uuid`: UUID of the dataset.
- `evaluation_dataset_uuid`: Evaluation dataset uuid.

### ApiDeleteKnowledgeBaseDataSourceOutput

Results: A successful response.

SDK operations: `remove`.

### ApiDeleteKnowledgeBaseOutput

Results: A successful response.

SDK operations: `remove`.

### ApiDeleteModelApiKeyOutput

Results: A successful response.

SDK operations: `create`, `list`, `remove`, `update`.

Key fields to recognise:

- `created_at`: Creation date
- `created_by`: Created by
- `deleted_at`: Deleted date
- `name`: Name
- `uuid`: Uuid

### ApiDeleteModelEvaluationPresetOutput

Results: A successful response.

SDK operations: `remove`.

### ApiDeleteModelEvaluationRunOutputPublic

Results: A successful response.

SDK operations: `remove`.

### ApiDeleteModelRouterOutput

Results: A successful response.

SDK operations: `remove`.

### ApiDeleteOpenAiapiKeyOutput

Results: A successful response.

SDK operations: `create`, `list`, `remove`.

Key fields to recognise:

- `api_key`: OpenAI API key
- `created_at`: Key creation date
- `created_by`: Created by user id from DO
- `deleted_at`: Key deleted date
- `models`: Models supported by the openAI api key

### ApiDeleteScenarioSetOutput

Results: A successful response.

SDK operations: `remove`.

### ApiDeleteScheduledIndexingOutput

Results: A successful response.

SDK operations: `create`, `remove`.

Key fields to recognise:

- `created_at`: Created at timestamp
- `days`: Days for execution (day is represented same as in a cron expression, for example Monday begins with 1 )
- `deleted_at`: Deleted at timestamp (if soft deleted)
- `is_active`: Whether the schedule is currently active
- `knowledge_base_uuid`: Knowledge base uuid associated with this schedule

### ApiDeleteSimulationRunOutput

Results: A successful response.

SDK operations: `remove`.

### ApiDeleteWorkspaceOutput

Results: A successful response.

SDK operations: `remove`.

### ApiDropboxOauth2GetTokensOutput

Results: A successful response.

SDK operations: `create`.

Key fields to recognise:

- `code`: The oauth2 code from google
- `redirect_url`: Redirect url
- `refresh_token`: The refresh token
- `token`: The access token

### ApiGenerateOauth2UrlOutput

Results: A successful response.

SDK operations: `load`.

Key fields to recognise:

- `url`: The oauth2 url

### ApiGenerateScenarioSetOutput

Results: A successful response.

SDK operations: `create`.

Key fields to recognise:

- `bucket_name`: Object storage bucket holding the scenario file. Unset while status is generating.
- `bucket_region`: Object storage bucket region. Unset while status is generating.
- `created_at`: Time created at.
- `deleted_at`: Time deleted at. Unset unless the scenario set has been deleted.
- `description`: Customer-supplied description.

### ApiGetAgentOutput

Results: A successful response.

SDK operations: `load`, `update`.

Key fields to recognise:

- `anthropic_api_key`: Anthropic API Key Info
- `api_key_infos`: Api key infos
- `api_keys`: Api keys
- `chatbot`: A Chatbot
- `chatbot_identifiers`: Chatbot identifiers

### ApiGetAgentUsageOutput

Results: A successful response.

SDK operations: `load`.

Key fields to recognise:

- `log_insights_usage`: Resource Usage Description
- `usage`: Resource Usage Description

### ApiGetAnthropicApiKeyOutput

Results: A successful response.

SDK operations: `load`.

Key fields to recognise:

- `created_at`: Key creation date
- `created_by`: Created by user id from DO
- `deleted_at`: Key deleted date
- `name`: Name
- `updated_at`: Key last updated date

### ApiGetChildrenOutput

Results: A successful response.

SDK operations: `list`.

Key fields to recognise:

- `anthropic_api_key`: Anthropic API Key Info
- `api_key_infos`: Api key infos
- `api_keys`: Api keys
- `chatbot`: A Chatbot
- `chatbot_identifiers`: Chatbot identifiers

### ApiGetCustomModelOutputPublic

Results: A successful response.

SDK operations: `list`, `load`, `update`.

Key fields to recognise:

- `active_deployments`: List of active deployments using this model
- `architecture`: Model architecture type (free-form string from config.json)
- `config_json`: Raw config.json contents from the model repository
- `context_length`: Maximum context length supported by the model
- `cost_estimate_per_month`: Estimated monthly cost in dollars for hosting

### ApiGetEvaluationDatasetDownloadUrlOutput

Results: A successful response.

SDK operations: `load`.

Key fields to recognise:

- `download_url`: The presigned URL to download the dataset file.
- `expires_at`: The time the URL expires at.

### ApiGetEvaluationRunOutput

Results: A successful response.

SDK operations: `create`, `load`.

Key fields to recognise:

- `agent_deleted`: Whether agent is deleted
- `agent_deployment_name`: The agent deployment name
- `agent_deployment_names`: Agent deployment names to run the test case against.
- `agent_name`: Agent name
- `agent_uuid`: Agent UUID.

### ApiGetEvaluationRunResultsOutput

Results: A successful response.

SDK operations: `list`.

Key fields to recognise:

- `evaluation_trace_spans`: The evaluated trace spans.
- `ground_truth`: The ground truth for the prompt.
- `input`: Input data for the span (flexible structure - can be messages array, string, etc.)
- `input_tokens`: The number of input tokens used in the prompt.
- `output`: Output data from the span (flexible structure - can be message, string, etc.)

### ApiGetEvaluationTestCaseOutput

Results: A successful response.

SDK operations: `create`, `list`, `load`.

Key fields to recognise:

- `created_at`: Time created at.
- `dataset_name`: Name of the dataset.
- `dataset_uuid`: UUID of the dataset.
- `description`: Description of the test case.
- `metrics`: Full metric list to use for evaluation test case.

### ApiGetIndexingJobDetailsSignedUrlOutput

Results: A successful response.

SDK operations: `load`.

Key fields to recognise:

- `signed_url`: The signed url for downloading the indexing job details

### ApiGetKnowledgeBaseIndexingJobOutput

Results: A successful response.

SDK operations: `create`, `list`, `load`, `update`.

Key fields to recognise:

- `completed_datasources`: Number of datasources indexed completed
- `created_at`: Creation date / time
- `data_source_jobs`: Details on Data Sources included in the Indexing Job
- `data_source_uuids`: List of data source ids to index, if none are provided, all data sources will be indexed
- `is_report_available`: Boolean value to determine if the indexing job details are available

### ApiGetKnowledgeBaseOutput

Results: A successful response.

SDK operations: `load`.

Key fields to recognise:

- `knowledge_base`: Knowledgebase Description

### ApiGetModelEvaluationRunOutput

Results: A successful response.

SDK operations: `load`, `update`.

Key fields to recognise:

- `links`: Links to other pages
- `meta`: Meta information about the data set
- `results`: Paginated per-prompt evaluation results.
- `run`: Model Evaluation Run Detail - full view returned when fetching a specific run.

### ApiGetModelEvaluationRunResultsDownloadUrlOutput

Results: A successful response.

SDK operations: `load`.

Key fields to recognise:

- `download_url`: The presigned URL to download the gzip-compressed JSON results file (.json.gz).
- `expires_at`: The time the URL expires at.

### ApiGetModelRouterOutput

Results: A successful response.

SDK operations: `create`, `list`, `load`.

Key fields to recognise:

- `created_at`: Creation date / time
- `description`: Description
- `fallback_models`: Router-level fallback models
- `name`: Name of the model router
- `policies`: Task routing policies

### ApiGetOpenAiapiKeyOutput

Results: A successful response.

SDK operations: `load`.

Key fields to recognise:

- `created_at`: Key creation date
- `created_by`: Created by user id from DO
- `deleted_at`: Key deleted date
- `models`: Models supported by the openAI api key
- `name`: Name

### ApiGetScenarioSetDownloadUrlOutput

Results: A successful response.

SDK operations: `load`.

Key fields to recognise:

- `download_url`: The presigned URL to download the scenario set file.
- `expires_at`: The time the URL expires at.

### ApiGetScenarioSetOutput

Results: A successful response.

SDK operations: `create`, `list`, `load`.

Key fields to recognise:

- `bucket_name`: Object storage bucket holding the scenario file. Unset while status is generating.
- `bucket_region`: Object storage bucket region. Unset while status is generating.
- `created_at`: Time created at.
- `deleted_at`: Time deleted at. Unset unless the scenario set has been deleted.
- `description`: Customer-supplied description.

### ApiGetScheduledIndexingOutput

Results: A successful response.

SDK operations: `load`.

Key fields to recognise:

- `created_at`: Created at timestamp
- `days`: Days for execution (day is represented same as in a cron expression, for example Monday begins with 1 )
- `deleted_at`: Deleted at timestamp (if soft deleted)
- `is_active`: Whether the schedule is currently active
- `knowledge_base_uuid`: Knowledge base uuid associated with this schedule

### ApiGetSimulationJourneyTrajectoryUrlOutput

Results: A successful response.

SDK operations: `load`.

Key fields to recognise:

- `download_url`: The presigned URL to download the trajectory JSON file.
- `expires_at`: The time the URL expires at.

### ApiGetSimulationRunOutput

Results: A successful response.

SDK operations: `load`, `update`.

Key fields to recognise:

- `scenario_results`: Per-scenario breakdown of journey outcomes, aggregated from journey rows.
- `simulation_run`: One execution of a scenario set against a candidate agent.

### ApiGetWorkspaceOutput

Results: A successful response.

SDK operations: `create`, `list`, `load`.

Key fields to recognise:

- `agent_uuids`: Ids of the agents(s) to attach to the workspace
- `agents`: Agents
- `created_at`: Creation date
- `created_by`: The id of user who created this workspace
- `created_by_email`: The email of the user who created this workspace

### ApiImportCustomModelOutputPublic

Results: A successful response.

SDK operations: `create`.

Key fields to recognise:

- `accept_hf_token_storage`: Whether the caller accepts storage of their HuggingFace token for gated model access
- `accept_terms_and_conditions`: Whether the caller accepts the terms and conditions for importing this model
- `description`: Description of the custom model
- `error`: Error message if validation failed
- `import_job`: Import job tracking for a custom model

### ApiIndexedDataSource

Results: A successful response.

SDK operations: `list`.

Key fields to recognise:

- `completed_at`: Timestamp when data source completed indexing
- `data_source_uuid`: Uuid of the indexed data source
- `error_details`: A detailed error description
- `error_msg`: A string code provinding a hint which part of the system experienced an error
- `failed_item_count`: Total count of files that have failed

### ApiLinkAgentFunctionOutput

Results: A successful response.

SDK operations: `create`.

Key fields to recognise:

- `agent_uuid`: Agent id
- `anthropic_api_key`: Anthropic API Key Info
- `api_key_infos`: Api key infos
- `api_keys`: Api keys
- `chatbot`: A Chatbot

### ApiLinkAgentGuardrailOutput

Results: A successful response.

SDK operations: `create`.

Key fields to recognise:

- `agent_uuid`: The UUID of the agent.
- `anthropic_api_key`: Anthropic API Key Info
- `api_key_infos`: Api key infos
- `api_keys`: Api keys
- `chatbot`: A Chatbot

### ApiLinkAgentOutput

Results: A successful response.

SDK operations: `create`.

Key fields to recognise:

- `child_agent_uuid`: Routed agent id
- `parent_agent_uuid`: A unique identifier for the parent agent.
- `route_name`: Name of route

### ApiLinkKnowledgeBaseOutput

Results: A successful response.

SDK operations: `create`.

Key fields to recognise:

- `anthropic_api_key`: Anthropic API Key Info
- `api_key_infos`: Api key infos
- `api_keys`: Api keys
- `chatbot`: A Chatbot
- `chatbot_identifiers`: Chatbot identifiers

### ApiListAgentApiKeysOutput

Results: A successful response.

SDK operations: `list`.

Key fields to recognise:

- `created_at`: Creation date
- `created_by`: Created by
- `deleted_at`: Deleted date
- `name`: Name
- `uuid`: Uuid

### ApiListAgentsByAnthropicKeyOutput

Results: A successful response.

SDK operations: `list`.

Key fields to recognise:

- `anthropic_api_key`: Anthropic API Key Info
- `api_key_infos`: Api key infos
- `api_keys`: Api keys
- `chatbot`: A Chatbot
- `chatbot_identifiers`: Chatbot identifiers

### ApiListAgentsByOpenAiKeyOutput

Results: A successful response.

SDK operations: `list`.

Key fields to recognise:

- `anthropic_api_key`: Anthropic API Key Info
- `api_key_infos`: Api key infos
- `api_keys`: Api keys
- `chatbot`: A Chatbot
- `chatbot_identifiers`: Chatbot identifiers

### ApiListAgentsByWorkspaceOutput

Results: A successful response.

SDK operations: `list`.

Key fields to recognise:

- `anthropic_api_key`: Anthropic API Key Info
- `api_key_infos`: Api key infos
- `api_keys`: Api keys
- `chatbot`: A Chatbot
- `chatbot_identifiers`: Chatbot identifiers

### ApiListEvaluationMetricsOutput

Results: A successful response.

SDK operations: `list`.

Key fields to recognise:

- `associated_presets`: Saved model evaluation presets that reference this metric. Populated for custom metrics when listing metrics so the dashboard can warn that deleting the metric will also delete these presets. Empty for built-in metrics.
- `custom_eval_config`: Configuration for a custom model-evaluation metric scored by an LLM judge. Prompt and model response are always included in the judge context.
- `evaluation_scope`: Scope that determines whether a metric belongs to agent evaluation or model evaluation. For backwards compatibility, UNSPECIFIED defaults to agent metrics only in list operations.
- `inverted`: If true, the metric is inverted, meaning that a lower value is better.
- `range_max`: The maximum value for the metric.

### ApiListEvaluationRunsByTestCaseOutput

Results: A successful response.

SDK operations: `list`.

Key fields to recognise:

- `agent_deleted`: Whether agent is deleted
- `agent_deployment_name`: The agent deployment name
- `agent_name`: Agent name
- `agent_uuid`: Agent UUID.
- `agent_version_hash`: Version hash

### ApiListEvaluationTestCasesByWorkspaceOutput

Results: A successful response.

SDK operations: `list`.

Key fields to recognise:

- `created_at`: Time created at.
- `dataset_name`: Name of the dataset.
- `dataset_uuid`: UUID of the dataset.
- `name`: Display name of the saved model evaluation preset.

### ApiListKnowledgeBaseDataSourcesOutput

Results: A successful response.

SDK operations: `list`.

Key fields to recognise:

- `aws_data_source`: AWS S3 Data Source for Display
- `bucket_name`: Name of storage bucket - Deprecated, moved to `data_source_details`
- `created_at`: Creation date / time
- `dropbox_data_source`: Dropbox Data Source for Display
- `file_upload_data_source`: File to upload as data source for knowledge base.

### ApiListKnowledgeBaseIndexingJobsOutput

Results: A successful response.

SDK operations: `list`.

Key fields to recognise:

- `completed_datasources`: Number of datasources indexed completed
- `created_at`: Creation date / time
- `data_source_jobs`: Details on Data Sources included in the Indexing Job
- `is_report_available`: Boolean value to determine if the indexing job details are available
- `knowledge_base_uuid`: Knowledge base id

### ApiListModelEvaluationMetricsOutput

Results: A successful response.

SDK operations: `list`.

Key fields to recognise:

- `associated_presets`: Saved model evaluation presets that reference this metric. Populated for custom metrics when listing metrics so the dashboard can warn that deleting the metric will also delete these presets. Empty for built-in metrics.
- `custom_eval_config`: Configuration for a custom model-evaluation metric scored by an LLM judge. Prompt and model response are always included in the judge context.
- `evaluation_scope`: Scope that determines whether a metric belongs to agent evaluation or model evaluation. For backwards compatibility, UNSPECIFIED defaults to agent metrics only in list operations.
- `inverted`: If true, the metric is inverted, meaning that a lower value is better.
- `range_max`: The maximum value for the metric.

### ApiListScenarioLibraryOutput

Results: A successful response.

SDK operations: `list`.

Key fields to recognise:

- `category`: Optional grouping for catalog browsing (for example &quot;Billing&quot;, &quot;Onboarding&quot;). Empty when uncategorized.
- `created_at`: Time created at.
- `description`: Curated description.
- `goal_description`: The goal this scenario set demonstrates, shown as context alongside goal-driven generation.
- `library_scenario_uuid`: UUID of the library entry.

### ApiListScenariosOutput

Results: A successful response.

SDK operations: `list`.

Key fields to recognise:

- `description`: What the user tries to accomplish. Required.
- `exploration_budget`: Number of journeys to explore for this scenario. Defaults to 1 if unset.
- `max_turns`: Turn budget for the scenario. Falls back to the run-level default if unset.
- `name`: Human-readable name for the scenario. Optional.
- `scenario_uuid`: Unique id for the scenario. Always generated by the API; any customer-supplied value is ignored and overwritten.

### ApiListSimulationJourneysOutput

Results: A successful response.

SDK operations: `list`.

Key fields to recognise:

- `created_at`: Time created at.
- `duration_sec`: Wall-clock time taken for the journey to complete, in seconds.
- `failure_reason`: Human-readable explanation of a terminal FAILED status. Empty otherwise.
- `journey_index`: Zero-based index of this journey within its scenario&#39;s exploration budget.
- `journey_uuid`: UUID of the journey.

### ApiModelCatalogCard

Results: A successful response.

SDK operations: `list`, `load`.

Key fields to recognise:

- `badges`: Badges for models
- `benchmark_score`: Benchmark scores for this model, stored as arbitrary JSON
- `code_snippets`: Code examples for using the model
- `context_window`: Specs (flat)
- `created_at`: RFC 3339 timestamp indicating when the model was added to the catalog.

### ApiModelEvaluationPreset

Results: A successful response.

SDK operations: `list`, `load`.

Key fields to recognise:

- `candidate_inference_config`: Inference configuration for the candidate model during evaluation.
- `candidate_model_name`: Model slug used to call the candidate model API. Empty when the CANDIDATE section was not saved.
- `candidate_model_source`: Whether the candidate is a served model (serverless platform, a dedicated deployment, or a model router) or an OHS-hosted agent config.
- `candidate_model_uuid`: UUID of the candidate model stored on this preset. Empty when the CANDIDATE section was not saved. For DEDICATED candidates this is the dedicated inference deployment UUID.
- `candidate_system_prompt`: System prompt / instructions to send to the candidate model. Empty when the `SYSTEM_PROMPT` section was not saved (check `saved_sections`).

### ApiModelPublic

Results: A successful response.

SDK operations: `list`.

Key fields to recognise:

- `agreement`: Agreement Description
- `benchmark_score`: Benchmark scores for this model, stored as arbitrary JSON
- `capabilities`: Model capabilities (inference, reasoning, vectorization, etc.)
- `context_window`: Context window (maximum tokens)
- `created_at`: Creation date / time

### ApiModelRouterPreset

Results: A successful response.

SDK operations: `list`.

Key fields to recognise:

- `display_name`: Display name for UI surfaces
- `long_description`: Long description for details views
- `short_description`: Short description for list views
- `slug`: Stable slug for routing usage

### ApiModelRouterTaskPreset

Results: A successful response.

SDK operations: `list`.

Key fields to recognise:

- `category`: Higher-level grouping used by the UI
- `description`: Task description
- `models`: Default models assigned to this task
- `name`: Display name
- `selection_policy`: Selection policy preference for choosing among assigned models.

### ApiMoveAgentsToWorkspaceOutput

Results: A successful response.

SDK operations: `update`.

Key fields to recognise:

- `agent_uuids`: Agent uuids
- `agents`: Agents
- `created_at`: Creation date
- `created_by`: The id of user who created this workspace
- `created_by_email`: The email of the user who created this workspace

### ApiPrompt

Results: A successful response.

SDK operations: `load`.

Key fields to recognise:

- `evaluation_trace_spans`: The evaluated trace spans.
- `ground_truth`: The ground truth for the prompt.
- `input`: Input data for the span (flexible structure - can be messages array, string, etc.)
- `input_tokens`: The number of input tokens used in the prompt.
- `output`: Output data from the span (flexible structure - can be message, string, etc.)

### ApiRollbackToAgentVersionOutput

Results: A successful response.

SDK operations: `update`.

Key fields to recognise:

- `audit_header`: An alternative way to provide auth information. for internal use only.
- `uuid`: Agent unique identifier
- `version_hash`: Unique identifier

### ApiSimulationJourney

Results: A successful response.

SDK operations: `load`.

Key fields to recognise:

- `created_at`: Time created at.
- `duration_sec`: Wall-clock time taken for the journey to complete, in seconds.
- `failure_reason`: Human-readable explanation of a terminal FAILED status. Empty otherwise.
- `id`: A short identifier corresponding to the HTTP status code returned. For example, the ID for a response returning a 404 status code would be &quot;`not_found`.&quot;
- `journey_index`: Zero-based index of this journey within its scenario&#39;s exploration budget.

### ApiSimulationTrajectory

Results: A successful response.

SDK operations: `load`.

Key fields to recognise:

- `agent_id`: Identifier of the candidate agent under test for this journey.
- `completed_at`: ISO-8601 timestamp when the message completed.
- `evaluation_metrics`: Per-metric scores and judge reasoning for this trajectory. Empty when the simulation run has no associated evaluation.
- `judge`: Judge output embedded in the trajectory JSON.
- `max_turns`: Turn budget configured for this journey (per-scenario `max_turns`, after any run-level override). Compare with `turn_count` to see how many of the budgeted turns actually ran.

### ApiUnlinkAgentFunctionOutput

Results: A successful response.

SDK operations: `remove`.

### ApiUnlinkAgentGuardrailOutput

Results: A successful response.

SDK operations: `remove`.

### ApiUnlinkAgentOutput

Results: A successful response.

SDK operations: `remove`.

### ApiUnlinkKnowledgeBaseOutput

Results: A successful response.

SDK operations: `remove`.

### ApiUpdateAgentApiKeyOutput

Results: A successful response.

SDK operations: `update`.

Key fields to recognise:

- `agent_uuid`: Agent id
- `api_key_uuid`: API key ID
- `created_at`: Creation date
- `created_by`: Created by
- `deleted_at`: Deleted date

### ApiUpdateAgentFunctionOutput

Results: A successful response.

SDK operations: `update`.

Key fields to recognise:

- `agent_uuid`: Agent id
- `anthropic_api_key`: Anthropic API Key Info
- `api_key_infos`: Api key infos
- `api_keys`: Api keys
- `chatbot`: A Chatbot

### ApiUpdateAgentOutput

Results: A successful response.

SDK operations: `update`.

Key fields to recognise:

- `allowed_domains`: Optional list of allowed domains for the chatbot - Must use fully qualified domain name (FQDN) such as https://example.com
- `anthropic_api_key`: Anthropic API Key Info
- `anthropic_key_uuid`: Optional anthropic key uuid for use with anthropic models
- `api_key_infos`: Api key infos
- `api_keys`: Api keys

### ApiUpdateAnthropicApiKeyOutput

Results: A successful response.

SDK operations: `update`.

Key fields to recognise:

- `api_key`: Anthropic API key
- `api_key_uuid`: API key ID
- `created_at`: Key creation date
- `created_by`: Created by user id from DO
- `deleted_at`: Key deleted date

### ApiUpdateCustomEvaluationMetricOutput

Results: A successful response.

SDK operations: `create`, `update`.

Key fields to recognise:

- `associated_presets`: Saved model evaluation presets that reference this metric. Populated for custom metrics when listing metrics so the dashboard can warn that deleting the metric will also delete these presets. Empty for built-in metrics.
- `config`: Configuration for a custom model-evaluation metric scored by an LLM judge.
- `custom_eval_config`: Configuration for a custom model-evaluation metric scored by an LLM judge. Prompt and model response are always included in the judge context.
- `evaluation_scope`: Scope that determines whether a metric belongs to agent evaluation or model evaluation. For backwards compatibility, UNSPECIFIED defaults to agent metrics only in list operations.
- `inverted`: If true, the metric is inverted, meaning that a lower value is better.

### ApiUpdateEvaluationTestCaseOutput

Results: A successful response.

SDK operations: `update`.

Key fields to recognise:

- `dataset_uuid`: Dataset against which the test‑case is executed.
- `description`: Description of the test case.
- `name`: Name of the test case.
- `test_case_uuid`: Test-case UUID to update
- `version`: The new verson of the test case.

### ApiUpdateKnowledgeBaseDataSourceOutput

Results: A successful response.

SDK operations: `update`.

Key fields to recognise:

- `aws_data_source`: AWS S3 Data Source for Display
- `bucket_name`: Name of storage bucket - Deprecated, moved to `data_source_details`
- `created_at`: Creation date / time
- `data_source_uuid`: Uuid of the indexed data source
- `dropbox_data_source`: Dropbox Data Source for Display

### ApiUpdateKnowledgeBaseOutput

Results: A successful response.

SDK operations: `create`, `list`, `update`.

Key fields to recognise:

- `added_to_agent_at`: Time when the knowledge base was added to the agent
- `created_at`: Creation date / time
- `database_id`: Identifier of the DigitalOcean OpenSearch database this knowledge base will use, optional.
- `datasources`: Optional data sources to attach at creation.
- `embedding_model_uuid`: Identifier for the [embedding model](https://docs.digitalocean.com/products/genai-platform/details/models/#embedding-models).

### ApiUpdateLinkedAgentOutput

Results: A successful response.

SDK operations: `update`.

Key fields to recognise:

- `child_agent_uuid`: Routed agent id
- `if_case`: Describes the case in which the child agent should be used
- `parent_agent_uuid`: A unique identifier for the parent agent.
- `route_name`: Route name
- `uuid`: Unique id of linkage

### ApiUpdateModelApiKeyOutput

Results: A successful response.

SDK operations: `update`.

Key fields to recognise:

- `api_key_uuid`: API key ID
- `created_at`: Creation date
- `created_by`: Created by
- `deleted_at`: Deleted date
- `name`: Name

### ApiUpdateModelEvaluationRunOutput

Results: A successful response.

SDK operations: `create`, `list`, `update`.

Key fields to recognise:

- `candidate_inference_config`: Inference configuration for the candidate model during evaluation.
- `candidate_model_name`: Name of the candidate model being evaluated.
- `candidate_model_source`: Whether the candidate is a served model (serverless platform, a dedicated deployment, or a model router) or an OHS-hosted agent config.
- `candidate_model_uuid`: UUID of the candidate model being evaluated.
- `created_at`: Timestamp when the run was created.

### ApiUpdateModelRouterOutput

Results: A successful response.

SDK operations: `update`.

Key fields to recognise:

- `created_at`: Creation date / time
- `description`: Description
- `fallback_models`: Router-level fallback models
- `name`: Name of the model router
- `policies`: Task routing policies

### ApiUpdateOpenAiapiKeyOutput

Results: A successful response.

SDK operations: `update`.

Key fields to recognise:

- `api_key`: OpenAI API key
- `api_key_uuid`: API key ID
- `created_at`: Key creation date
- `created_by`: Created by user id from DO
- `deleted_at`: Key deleted date

### ApiUpdateScenarioSetOutput

Results: A successful response.

SDK operations: `update`.

Key fields to recognise:

- `bucket_name`: Object storage bucket holding the scenario file. Unset while status is generating.
- `bucket_region`: Object storage bucket region. Unset while status is generating.
- `created_at`: Time created at.
- `deleted_at`: Time deleted at. Unset unless the scenario set has been deleted.
- `description`: Customer-supplied description.

### ApiUpdateSimulationRunOutput

Results: A successful response.

SDK operations: `create`, `list`, `update`.

Key fields to recognise:

- `agent_config`: Configuration of the candidate agent under test for a simulation run.
- `created_at`: Time created at.
- `created_by_user_email`: Email of the user who triggered this run.
- `created_by_user_id`: User id of the actor who triggered this run.
- `deleted_at`: Time deleted at. Unset unless the run has been deleted.

### ApiUpdateWorkspaceOutput

Results: A successful response.

SDK operations: `update`.

Key fields to recognise:

- `agents`: Agents
- `created_at`: Creation date
- `created_by`: The id of user who created this workspace
- `created_by_email`: The email of the user who created this workspace
- `deleted_at`: Deleted date

### App

Results: A JSON with key `event`; The action was successful and the response body is empty.; A JSON object with the validation results.; A JSON or YAML of a `spec` object.; A JSON object with a `apps` key. This is list of object `apps`.; A JSON with key `app`; the ID of the app deleted.; A JSON object of the updated `app`.

SDK operations: `create`, `list`, `load`, `remove`, `update`.

Key fields to recognise:

- `autoscaling`: Autoscaling event details. Only present for autoscaling events.
- `deployment_id`: For deployment events, this is the same as the deployment&#39;s ID. For autoscaling events, this is the deployment that was autoscaled.
- `domains`: A set of hostnames where the application will be available.
- `id`: A short identifier corresponding to the HTTP status code returned. For example, the ID for a response returning a 404 status code would be &quot;`not_found`.&quot;
- `project_id`: Requires `project:read` scope.

### AppAlert

Results: A JSON object with an `alert` key. This is an object of type `alert`.; A JSON object with a `alerts` key. This is list of object `alerts`.

SDK operations: `create`, `list`.

Key fields to recognise:

- `id`: A short identifier corresponding to the HTTP status code returned. For example, the ID for a response returning a 404 status code would be &quot;`not_found`.&quot;

### AppEvent

Results: A JSON with key `events`.

SDK operations: `list`.

Key fields to recognise:

- `autoscaling`: Autoscaling event details. Only present for autoscaling events.
- `deployment_id`: For deployment events, this is the same as the deployment&#39;s ID. For autoscaling events, this is the deployment that was autoscaled.
- `id`: A short identifier corresponding to the HTTP status code returned. For example, the ID for a response returning a 404 status code would be &quot;`not_found`.&quot;
- `type`: The type of event

### AppHealth

Results: A JSON with key `app_health`.

SDK operations: `load`.

Key fields to recognise:

- `id`: A short identifier corresponding to the HTTP status code returned. For example, the ID for a response returning a 404 status code would be &quot;`not_found`.&quot;

### AppInstance

Results: A JSON with key `instances`.

SDK operations: `list`.

Key fields to recognise:

- `component_name`: Name of the component, from the app spec.
- `component_type`: Supported compute component by DigitalOcean App Platform.
- `id`: A short identifier corresponding to the HTTP status code returned. For example, the ID for a response returning a 404 status code would be &quot;`not_found`.&quot;
- `instance_alias`: Readable identifier, an alias of the instance name, reference for mapping insights to instance names.
- `instance_name`: Name of the instance, which is a unique identifier for the instance.

### AppJobInvocation

Results: A JSON with key `job_invocation`; A JSON with key `job_invocations`.

SDK operations: `create`, `list`, `load`.

Key fields to recognise:

- `id`: A short identifier corresponding to the HTTP status code returned. For example, the ID for a response returning a 404 status code would be &quot;`not_found`.&quot;
- `phase`: The phase of the job invocation

### AppMetricsBandwidthUsage

Results: A JSON object with a `app_bandwidth_usage` key.

SDK operations: `create`, `list`.

Key fields to recognise:

- `app_bandwidth_usage`: A list of bandwidth usage details by app.
- `app_id`: The ID of the app.
- `app_ids`: A list of app IDs to query bandwidth metrics for.
- `bandwidth_bytes`: The used bandwidth amount in bytes.
- `date`: The date for the metrics data.

### AppPropose

Results: A JSON object.

SDK operations: `create`.

Key fields to recognise:

- `app_cost`: The monthly cost of the proposed app in USD.
- `app_id`: An optional ID of an existing app.
- `app_is_static`: Indicates whether the app is a static app.
- `app_name_available`: Indicates whether the app name is available.
- `app_name_suggestion`: The suggested name if the proposed app name is unavailable.

### AppsDeployment

Results: A JSON the `deployment` that was just cancelled.; A JSON object with a `deployment` key.; A JSON object with a `deployments` key. This will be a list of all app deployments; A JSON of the requested deployment.

SDK operations: `create`, `list`, `load`.

Key fields to recognise:

- `deployment_id`: The ID of the deployment to rollback to.
- `functions`: Workloads which expose publicly-accessible HTTP services via Functions Components.
- `id`: A short identifier corresponding to the HTTP status code returned. For example, the ID for a response returning a 404 status code would be &quot;`not_found`.&quot;
- `jobs`: Pre and post deployment workloads which do not expose publicly-accessible HTTP routes.
- `services`: Workloads which expose publicly-accessible HTTP services.

### AppsGetExec

Results: A JSON object with a websocket URL that allows sending/receiving console input and output.

SDK operations: `load`.

Key fields to recognise:

- `url`: A websocket URL that allows sending/receiving console input and receiving console output.

### AppsGetLog

Results: A JSON object with urls that point to archived logs; A JSON object with urls that point to Job Invocation logs.

SDK operations: `list`.

Key fields to recognise:

- `live_url`: A URL of the real-time live logs. This URL may use either the `https://` or `wss://` protocols and will keep pushing live logs as they become available.

### AppsInstanceSize

Results: A JSON with key `instance_sizes`; A JSON with key `instance_size`.

SDK operations: `list`, `load`.

Key fields to recognise:

- `id`: A short identifier corresponding to the HTTP status code returned. For example, the ID for a response returning a 404 status code would be &quot;`not_found`.&quot;

### AppsRegion

Results: A JSON object with key `regions`.

SDK operations: `list`.

Key fields to recognise:

- `default`: Whether or not the region is presented as the default.

### AssociatedKubernetesResource

Results: The response will be a JSON object containing `load_balancers`, `volumes`, and `volume_snapshots` keys. Each will be set to an array of objects containing the standard attributes for associated resources.

SDK operations: `list`.

Key fields to recognise:

- `load_balancers`: A list of names and IDs for associated load balancers that can be destroyed along with the cluster.
- `volume_snapshots`: A list of names and IDs for associated volume snapshots that can be destroyed along with the cluster.
- `volumes`: A list of names and IDs for associated volumes that can be destroyed along with the cluster.

### AssociatedResourceStatus

Results: A JSON object containing the status of a request to destroy a Droplet and its associated resources.

SDK operations: `load`.

Key fields to recognise:

- `completed_at`: A time value given in ISO8601 combined date and time format indicating when the requested action was completed.
- `droplet`: An object containing information about a resource scheduled for deletion.
- `failures`: A count of the associated resources that failed to be destroyed, if any.
- `resources`: An object containing additional information about resource related to a Droplet requested to be destroyed.

### AsyncInvoke

Results: The async invocation completed synchronously.; The async invocation request was accepted.

SDK operations: `create`.

Key fields to recognise:

- `completed_at`: The timestamp when the job completed. Null until finished.
- `created_at`: The timestamp when the request was created.
- `error`: Error message if the job failed. Null on success.
- `input`: The input parameters for the model invocation.
- `model_id`: The model ID that was invoked.

### Balance

Results: The response will be a JSON object that contains the following attributes.

SDK operations: `load`.

Key fields to recognise:

- `account_balance`: Current balance of the customer&#39;s most recent billing activity. Does not reflect `month_to_date_usage`.
- `generated_at`: The time at which balances were most recently generated.
- `month_to_date_balance`: Balance as of the `generated_at` time. This value includes the `account_balance` and `month_to_date_usage`.
- `month_to_date_usage`: Amount used in the current billing period as of the `generated_at` time.

### Batch

Results: Cancellation accepted. Returns the updated batch job.; Batch job accepted. Poll `GET /v1/batches/&#123;batch_id&#125;` for status.; Page of batch jobs.; The batch job.

SDK operations: `create`, `list`, `load`.

Key fields to recognise:

- `batch_id`: Unique identifier for the batch job.
- `completion_window`: Time window in which the job must complete.
- `endpoint`: Inference endpoint each request is dispatched to.
- `error_file_id`: Error sidecar file. Null when no errors were produced.
- `errors`: Top-level errors that prevented the batch from completing.

### BatchFileCreate

Results: File intent created.

SDK operations: `create`.

Key fields to recognise:

- `file_name`: The file you plan to upload.

### BatchInference

Results: Upload accepted by object storage.

SDK operations: `update`.

### BatchResult

Results: Presigned download URLs.

SDK operations: `load`.

Key fields to recognise:

- `error_file_url`: Presigned URL for the error sidecar JSONL, if any.
- `expires_at`: When the presigned URLs expire.
- `id`: A short identifier corresponding to the HTTP status code returned. For example, the ID for a response returning a 404 status code would be &quot;`not_found`.&quot;
- `output_file_url`: Presigned URL for the main results JSONL.
- `result_available`: When `false`, keep polling batch status and retry later.

### Billing

Results: The response will be a JSON object that contains the following attributes; The response will be a JSON object contains that contains a list of invoices under the `invoices` key, and the invoice preview under the `invoice_preview` key. Each element contains the invoice summary attributes.; The response will be a JSON object that contains a list of billing data points under the `data_points` key, along with pagination metadata including `total_items`, `total_pages`, and `current_page`.; The response will be a JSON object with a key called `invoice_items`. This will be set to an array of invoice item objects. All resources will be shown on invoices, regardless of permissions.; The response will be a CSV file.; The response will be a PDF file.

SDK operations: `list`, `load`.

Key fields to recognise:

- `amount`: Amount of the billing history entry.
- `current_page`: Current page number
- `data_points`: Array of billing data points, which are day-over-day changes in billing resource usage based on nightly invoice item estimates, for the requested period
- `date`: Time the billing history entry occurred.
- `description`: Description of the billing history entry.

### BlockStorage

Results: You will get back a JSON object that has a `snapshot` key. This will contain the standard snapshot attributes; The response will be a JSON object with a key called `volume`. The value will be an object containing the standard attributes associated with a volume.; You will get back a JSON object that has a `snapshots` key. This will be set to an array of snapshot objects, each of which contain the standard snapshot attributes; The response will be a JSON object with a key called `volumes`. This will be set to an array of volume objects, each of which will contain the standard volume attributes.; The action was successful and the response body is empty.

SDK operations: `create`, `list`, `load`, `remove`.

Key fields to recognise:

- `created_at`: A time value given in ISO8601 combined date and time format that represents when the snapshot was created.
- `description`: An optional free-form text field to describe a block storage volume.
- `droplet_ids`: An array containing the IDs of the Droplets the volume is attached to. Note that at this time, a volume can only be attached to a single Droplet.
- `filesystem_label`: The label currently applied to the filesystem.
- `filesystem_type`: The type of filesystem currently in-use on the volume.

### BlockStorageAction

Results: The response will be an object with a key called `action`. The value of this will be an object that contains the standard volume action attributes; The response will be an object with a key called `action`. The value of this will be an object that contains the standard volume action attributes.

SDK operations: `create`, `list`, `load`.

Key fields to recognise:

- `completed_at`: A time value given in ISO8601 combined date and time format that represents when the action was completed.
- `id`: A unique numeric ID that can be used to identify and reference an action.
- `region_slug`: A human-readable string that is used as a unique identifier for each region.
- `resource_id`: A unique identifier for the resource that the action is associated with.
- `resource_type`: The type of resource that the action is associated with.

### ByoipPrefix

Results: BYOIP prefix request accepted, response will contain the details of the created prefix.; List of IP addresses assigned to resources (such as Droplets) in a BYOIP prefix; List of BYOIP prefixes as an array of BYOIP prefix JSON objects; Details of the requested BYOIP prefix; The action was successful and the response body is empty.; Details of the updated BYOIP prefix.

SDK operations: `create`, `list`, `load`, `remove`, `update`.

Key fields to recognise:

- `advertise`: Whether the BYOIP prefix should be advertised
- `advertised`: Whether the BYOIP prefix is being advertised
- `failure_reason`: Reason for failure, if applicable
- `id`: A short identifier corresponding to the HTTP status code returned. For example, the ID for a response returning a 404 status code would be &quot;`not_found`.&quot;
- `locked`: Whether the BYOIP prefix is locked

### CdnEndpoint

Results: The response will be a JSON object with an `endpoint` key. This will be set to an object containing the standard CDN endpoint attributes.; The result will be a JSON object with an `endpoints` key. This will be set to an array of endpoint objects, each of which will contain the standard CDN endpoint attributes.; The action was successful and the response body is empty.

SDK operations: `create`, `list`, `load`, `remove`, `update`.

Key fields to recognise:

- `certificate_id`: The ID of a DigitalOcean managed TLS certificate used for SSL when a custom subdomain is provided.
- `created_at`: A time value given in ISO8601 combined date and time format that represents when the CDN endpoint was created.
- `custom_domain`: The fully qualified domain name (FQDN) of the custom subdomain used with the CDN endpoint.
- `endpoint`: The fully qualified domain name (FQDN) from which the CDN-backed content is served.
- `id`: A unique ID that can be used to identify and reference a CDN endpoint.

### Certificate

Results: The response will be a JSON object with a key called `certificate`. The value of this will be an object that contains the standard attributes associated with a certificate. When using Let&#39;s Encrypt, the initial value of the certificate&#39;s `state` attribute will be `pending`. When the certificate has been successfully issued by Let&#39;s Encrypt, this will transition to `verified` and be ready for use.; The result will be a JSON object with a `certificates` key. This will be set to an array of certificate objects, each of which will contain the standard certificate attributes.; The response will be a JSON object with a `certificate` key. This will be set to an object containing the standard certificate attributes.; The action was successful and the response body is empty.

SDK operations: `create`, `list`, `load`, `remove`.

Key fields to recognise:

- `created_at`: A time value given in ISO8601 combined date and time format that represents when the certificate was created.
- `dns_names`: An array of fully qualified domain names (FQDNs) for which the certificate was issued.
- `id`: A unique ID that can be used to identify and reference a certificate.
- `name`: A unique human-readable name referring to a certificate.
- `not_after`: A time value given in ISO8601 combined date and time format that represents the certificate&#39;s expiration date.

### ChatCompletion

Results: Successful chat completion. When stream is true, response is sent as Server-Sent Events (text/event-stream); otherwise a single JSON object (application/json) is returned.

SDK operations: `create`.

Key fields to recognise:

- `choices`: A list of chat completion choices. Can be more than one if n is greater than 1.
- `created`: The Unix timestamp (in seconds) of when the chat completion was created.
- `frequency_penalty`: Number between -2.0 and 2.0.
- `id`: A unique identifier for the chat completion.
- `logit_bias`: Modify the likelihood of specified tokens appearing in the completion.

### Clusterlint

Results: The response is a JSON object which contains the diagnostics on Kubernetes objects in the cluster. Each diagnostic will contain some metadata information about the object and feedback for users to act upon.

SDK operations: `list`.

Key fields to recognise:

- `check_name`: The clusterlint check that resulted in the diagnostic.
- `message`: Feedback about the object for users to fix.
- `object`: Metadata about the Kubernetes API object the diagnostic is reported on.
- `severity`: Can be one of error, warning or suggestion.

### Connection

Results: The connection was created.; The request was successful.; The connection was revoked.

SDK operations: `create`, `list`, `load`, `remove`.

Key fields to recognise:

- `api_key`: Set for `team_api_key` connections.
- `authorization`: Present only while the connection is pending.
- `connection`: The connection.
- `connection_parameters`: Non-sensitive provider configuration.
- `created_at`: When the connection was created.

### ConnectionPool

Results: A JSON object with a key of `pools`.

SDK operations: `list`.

Key fields to recognise:

- `db`: The database for use with the connection pool.
- `mode`: The PGBouncer transaction mode for the connection pool. The allowed values are session, transaction, and statement.
- `name`: A unique name for the connection pool. Must be between 3 and 60 characters.
- `size`: The desired size of the PGBouncer connection pool. The maximum allowed size is determined by the size of the cluster&#39;s primary node. 25 backend server connections are allowed for every 1GB of RAM. Three are reserved for maintenance. For example, a primary node with 1 GB of RAM allows for a maximum of 22 backend server connections while one with 4 GB would allow for 97. Note that these are shared across all connection pools in a cluster.
- `user`: The name of the user for use with the connection pool. When excluded, all sessions connect to the database as the inbound user.

### ContainerRegistry

Results: The response will be a JSON object with a key of `garbage_collection`. This will be a json object with attributes representing the currently-active garbage collection.; The response will be a JSON object with the key `registry` containing information about your registry.; The response will be a JSON object with a key called `subscription` containing information about your subscription.; The action was successful and the response body is empty.; The response body will be a JSON object with a key of `manifests`. This will be set to an array containing objects each representing a manifest.; The response body will be a JSON object with a key of `tags`. This will be set to an array containing objects each representing a tag.; The response will be a JSON object with a key of `garbage_collections`. This will be set to an array containing objects representing each past garbage collection. Each will contain the standard Garbage Collection attributes.; The response body will be a JSON object with a key of `repositories`. This will be set to an array containing objects each representing a repository.; The response will be a JSON object with a key called `options` which contains a key called `subscription_tiers` listing the available tiers.

SDK operations: `create`, `list`, `load`, `remove`, `update`.

Key fields to recognise:

- `blobs`: All blobs associated with this manifest
- `blobs_deleted`: The number of blobs deleted as a result of this garbage collection.
- `cancel`: A boolean value indicating that the garbage collection should be cancelled.
- `compressed_size_bytes`: The compressed size of the manifest in bytes.
- `created_at`: The time the garbage collection was created.

### CreateResponse

Results: Successful response. When stream is true, response is sent as Server-Sent Events (text/event-stream); otherwise a single JSON object (application/json) is returned.

SDK operations: `create`.

Key fields to recognise:

- `created`: The Unix timestamp (in seconds) of when the response was created.
- `id`: A unique identifier for the response.
- `input`: The prompt or input content you want the model to respond to.
- `instructions`: System-level instructions for the model.
- `max_output_tokens`: Maximum output tokens setting.

### Credential

Results: A JSON object containing credentials for a cluster.

SDK operations: `load`.

Key fields to recognise:

- `certificate_authority_data`: A base64 encoding of bytes representing the certificate authority data for accessing the cluster.
- `client_certificate_data`: A base64 encoding of bytes representing the x509 client certificate data for access the cluster. This is only returned for clusters without support for token-based authentication. Newly created Kubernetes clusters do not return credentials using certificate-based authentication. For additional information, [see here](https://docs.digitalocean.com/products/kubernetes/how-to/connect-to-cluster/#authenticate).
- `client_key_data`: A base64 encoding of bytes representing the x509 client key data for access the cluster. This is only returned for clusters without support for token-based authentication. Newly created Kubernetes clusters do not return credentials using certificate-based authentication. For additional information, [see here](https://docs.digitalocean.com/products/kubernetes/how-to/connect-to-cluster/#authenticate).
- `expires_at`: A time value given in ISO8601 combined date and time format that represents when the access token expires.
- `server`: The URL used to access the cluster API server.

### Database

Results: A JSON object with a key of `user`.; A JSON object with a key of `db`.; A JSON object with a key of `sink`.; A JSON object with a key of `pool`.; A JSON object with a key of `replica`.; A JSON object.; A JSON object with a key of `topic`.; A JSON object with a key of `database`.; A JSON object with a key of `backups`.; A JSON object with a key of `databases`.; A JSON object with a key of `events`.; A JSON object with a key of `rules`.; A JSON object with a key of `indexes`.; A JSON object with a key of `sinks`.; A JSON object with a key of `replicas`.; A JSON object with a key of `subjects`.; A JSON object with a key of `topics`.; A JSON object with a key of `users`.; A JSON object with a key of `compatibility_level`.; A JSON object with autoscale configuration details.; A JSON object with a key of `ca`.; A JSON object with a key of `config`.; A JSON object with a key of `do_settings`.; A JSON string with a key of `eviction_policy`.; A JSON object with a key of `credentials`.; The action was successful and the response body is empty.; This does not indicate the success or failure of any operation, just that the request has been accepted for processing.

SDK operations: `create`, `list`, `load`, `patch`, `remove`, `update`.

Key fields to recognise:

- `access_cert`: Access certificate for TLS client authentication. (Kafka only)
- `access_key`: Access key for TLS client authentication. (Kafka only)
- `autoscale`: Contains all autoscaling configuration for a database cluster
- `compatibility_level`: The compatibility level of the schema registry.
- `created_at`: A time value given in ISO8601 combined date and time format that represents when the database cluster was created.

### DedicatedInference

Results: Token created; value is returned only once. Store securely.; Dedicated Inference create/update accepted for processing (202). Success or failure is not indicated by the response code.; The response will be a JSON object with a key called `accelerators`. This will be set to an array of accelerator objects. Pagination uses the same `links` and `meta` structure as other list endpoints.; The response will be a JSON object with a key called `tokens`. This will be set to an array of objects (id, name, `created_at`, `is_managed`; value is not returned). Pagination uses the same `links` and `meta` structure as other list endpoints (for example VPC peerings).; The response will be a JSON object with a key called `dedicated_inferences`. This will be set to an array of objects, each of which will contain the standard attributes associated with a Dedicated Inference. Pagination uses the same `links` and `meta` structure as other list endpoints.; Response containing a single Dedicated Inference instance.; CA certificate for the Dedicated Inference (base64-encoded). Required for private endpoint connectivity.; Token revoked.; This does not indicate the success or failure of any operation, just that the request has been accepted for processing.; Dedicated Inference update accepted for processing (202). Response contains only the `dedicated_inference`; no token is returned.

SDK operations: `create`, `list`, `load`, `remove`, `update`.

Key fields to recognise:

- `access_tokens`: Key-value pairs for provider tokens (for example
- `created_at`: When the Dedicated Inference was created.
- `dedicated_inference`: A Dedicated Inference instance.
- `id`: Unique ID of the token.
- `pending_deployment_spec`: Pending deployment when status is provisioning or updating.

### DedicatedInferenceAccelerator

Results: Single accelerator object.

SDK operations: `load`.

Key fields to recognise:

- `id`: Unique ID of the accelerator.
- `name`: Name of the accelerator.
- `role`: Role of the accelerator (for example `prefill_decode`).
- `slug`: DigitalOcean GPU slug.
- `status`: Status of the accelerator.

### DedicatedInferenceGpuModelConfig

Results: GPU model configs (`gpu_slugs`, `model_slug`, `model_name`, `is_gated_model`).

SDK operations: `list`.

Key fields to recognise:

- `is_gated_model`: Whether the model requires gated access (for example Hugging Face token).

### DedicatedInferenceSize

Results: Enabled regions and sizes with pricing.

SDK operations: `list`.

### DockerCredential

Results: A Docker `config.json` file for the container registry.

SDK operations: `load`.

### Domain

Results: The response will be a JSON object with a key called `domain`. The value of this will be an object that contains the standard attributes associated with a domain.; The response will be a JSON object with a key called `domains`. The value of this will be an array of Domain objects, each of which contain the standard domain attributes.; The response will be a JSON object with a key called `domain`. The value of this will be an object that contains the standard attributes defined for a domain.; The action was successful and the response body is empty.

SDK operations: `create`, `list`, `load`, `remove`.

Key fields to recognise:

- `id`: A short identifier corresponding to the HTTP status code returned. For example, the ID for a response returning a 404 status code would be &quot;`not_found`.&quot;
- `ip_address`: This optional attribute may contain an IP address. When provided, an A record will be automatically created pointing to the apex domain.
- `name`: The name of the domain itself. This should follow the standard domain format of `domain.TLD`. For instance, `example.com` is a valid domain name.
- `ttl`: This value is the time to live for the records on this domain, in seconds. This defines the time frame that clients can cache queried information before a refresh should be requested.
- `zone_file`: This attribute contains the complete contents of the zone file for the selected domain. Individual domain record resources should be used to get more granular control over records. However, this attribute can also be used to get information about the SOA record, which is created automatically and is not accessible as an individual record resource.

### DomainRecord

Results: The response body will be a JSON object with a key called `domain_record`. The value of this will be an object representing the new record. Attributes that are not applicable for the record type will be set to `null`. An `id` attribute is generated for each record as part of the object.; The response will be a JSON object with a key called `domain_records`. The value of this will be an array of domain record objects, each of which contains the standard domain record attributes. For attributes that are not used by a specific record type, a value of `null` will be returned. For instance, all records other than SRV will have `null` for the `weight` and `port` attributes.; The response will be a JSON object with a key called `domain_record`. The value of this will be a domain record object which contains the standard domain record attributes.; The action was successful and the response body is empty.

SDK operations: `create`, `list`, `load`, `patch`, `remove`, `update`.

Key fields to recognise:

- `data`: Variable data depending on record type. For example, the &quot;data&quot; value for an A record would be the IPv4 address to which the domain will be mapped. For a CAA record, it would contain the domain name of the CA being granted permission to issue certificates.
- `flags`: An unsigned integer between 0-255 used for CAA records.
- `id`: A unique identifier for each domain record.
- `name`: The host name, alias, or service being defined by the record.
- `port`: The port for SRV records.

### Droplet

Results: This does not indicate the success or failure of any operation, just that the request has been accepted for processing.; Accepted; A JSON object with an `backups` key.; A JSON object containing `snapshots`, `volumes`, and `volume_snapshots` keys.; A JSON object that has a key called `firewalls`.; A JSON object that has a key called `kernels`.; A JSON object with an `droplets` key.; A JSON object with an `snapshots` key.; A JSON object with a key of `droplets`.; A JSON object with an `supported_policies` key set to an array of objects describing each supported backup policy.; The response will be a JSON object with a key called `droplet`. This will be set to a JSON object that contains the standard Droplet attributes.; The response will be a JSON object with a key called `policy`. This will be set to a JSON object that contains the standard Droplet backup policy attributes.; A JSON object with a `policies` key set to a map. The keys are Droplet IDs and the values are objects containing the backup policy information for each Droplet.; The action was successful and the response body is empty. This response has content-type set.

SDK operations: `create`, `list`, `load`, `remove`.

Key fields to recognise:

- `backup_ids`: An array of backup IDs of any backups that have been taken of the Droplet instance. Droplet backups are enabled at the time of the instance creation. Requires `image:read` scope.
- `created_at`: A time value given in ISO8601 combined date and time format that represents when the Droplet was created.
- `disk`: The size of the Droplet&#39;s disk in gigabytes.
- `disk_info`: An array of objects containing information about the disks available to the Droplet.
- `features`: An array of features enabled on this Droplet.

### DropletAction

Results: The response will be a JSON object with a key called `action`.; The response will be a JSON object with a key called `actions`.; A JSON object with an `actions` key.; The result will be a JSON object with an action key. This will be set to an action object containing the standard action attributes.

SDK operations: `create`, `list`, `load`.

Key fields to recognise:

- `completed_at`: A time value given in ISO8601 combined date and time format that represents when the action was completed.
- `id`: A unique numeric ID that can be used to identify and reference an action.
- `region_slug`: A human-readable string that is used as a unique identifier for each region.
- `resource_id`: A unique identifier for the resource that the action is associated with.
- `resource_type`: The type of resource that the action is associated with.

### DropletAutoscalePool

Results: Accepted; A JSON object with a key of `history`.; A JSON object with a key of `droplets`.; A JSON object with a key of `autoscale_pools`.; The response will be a JSON object with a key called `autoscale_pool`. This will be set to a JSON object that contains the standard autoscale pool attributes.; The action was successful and the response body is empty.

SDK operations: `create`, `list`, `load`, `remove`, `update`.

Key fields to recognise:

- `active_resources_count`: The number of active Droplets in the autoscale pool.
- `config`: The scaling configuration for an autoscale pool, which is how the pool scales up and down (either by resource utilization or static configuration).
- `created_at`: A time value given in ISO8601 combined date and time format that represents when the autoscale pool was created.
- `current_instance_count`: The current number of Droplets in the autoscale pool.
- `desired_instance_count`: The target number of Droplets for the autoscale pool after the scaling event.

### Embedding

Results: Embeddings and usage for the given `input` or `inputs`, in order.

SDK operations: `create`.

Key fields to recognise:

- `data`: One entry for each `input` string, in the same order.
- `encoding_format`: How embedding values are returned in each `data[].embedding` field.
- `input`: A single string or 1–2048 strings; each string produces one row in `data`, in order.
- `model`: The embedding model that produced the vectors.
- `object`: The object type, which is always the string `list`.

### Empty

Results: The overrides were removed.; The overrides were set.; The session was created.; The request was successful.; The session was deleted.

SDK operations: `create`, `list`, `remove`.

Key fields to recognise:

- `actorId`: Empty when the session is not bound to an actor.
- `agentName`: Name of the agent that started the session. Empty for sessions created through this API.
- `agentUrn`: URN of the agent that started the session. Empty for sessions created through this API.
- `categories`: Required.
- `config`: Session options as supplied at creation. Omitted when none were supplied.

### Firewall

Results: The action was successful and the response body is empty.; The response will be a JSON object with a firewall key. This will be set to an object containing the standard firewall attributes.; To list all of the firewalls available on your account, send a GET request to `/v2/firewalls`. Firewalls responses will include only the resources that you are granted to see. Ensure that your API token includes all necessary `&lt;resource&gt;:read` permissions for requested firewall.; The response will be a JSON object with a firewall key. This will be set to an object containing the standard firewall attributes. Firewalls responses will include only the resources that you are granted to see. Ensure that your API token includes all necessary `&lt;resource&gt;:read` permissions for requested firewall.; The response will be a JSON object with a `firewall` key. This will be set to an object containing the standard firewall attributes.

SDK operations: `create`, `list`, `load`, `remove`, `update`.

Key fields to recognise:

- `created_at`: A time value given in ISO8601 combined date and time format that represents when the firewall was created.
- `droplet_ids`: An array containing the IDs of the Droplets assigned to the firewall. Requires `droplet:read` scope.
- `id`: A short identifier corresponding to the HTTP status code returned. For example, the ID for a response returning a 404 status code would be &quot;`not_found`.&quot;
- `name`: A human-readable name for a firewall. The name must begin with an alphanumeric character. Subsequent characters must either be alphanumeric characters, a period (.), or a dash (-).
- `pending_changes`: An array of objects each containing the fields &quot;`droplet_id`&quot;, &quot;removing&quot;, and &quot;status&quot;. It is provided to detail exactly which Droplets are having their security policies updated. When empty, all changes have been successfully applied.

### FloatingIp

Results: The response will be a JSON object with a key called `floating_ip`. The value of this will be an object that contains the standard attributes associated with a floating IP. When assigning a floating IP to a Droplet at same time as it created, the response&#39;s `links` object will contain links to both the Droplet and the assignment action. The latter can be used to check the status of the action.; The response will be a JSON object with a key called `floating_ips`. This will be set to an array of floating IP objects, each of which will contain the standard floating IP attributes; The response will be a JSON object with a key called `floating_ip`. The value of this will be an object that contains the standard attributes associated with a floating IP.; The action was successful and the response body is empty.

SDK operations: `create`, `list`, `load`, `remove`.

Key fields to recognise:

- `droplet`: The Droplet that the floating IP has been assigned to. When you query a floating IP, if it is assigned to a Droplet, the entire Droplet object will be returned. If it is not assigned, the value will be null. Requires `droplet:read` scope.
- `id`: A unique identifier for each Droplet instance. This is automatically generated upon Droplet creation.
- `ip`: The public IP address of the floating IP. It also serves as its identifier.
- `locked`: A boolean value indicating whether or not the floating IP has pending actions preventing new ones from being submitted.
- `project_id`: The UUID of the project to which the reserved IP currently belongs. Requires `project:read` scope.

### FloatingIpAction

Results: The response will be an object with a key called `action`. The value of this will be an object that contains the standard floating IP action attributes.; The results will be returned as a JSON object with an `actions` key. This will be set to an array filled with action objects containing the standard floating IP action attributes.

SDK operations: `create`, `list`, `load`.

Key fields to recognise:

- `completed_at`: A time value given in ISO8601 combined date and time format that represents when the action was completed.
- `id`: A unique numeric ID that can be used to identify and reference an action.
- `project_id`: The UUID of the project to which the reserved IP currently belongs.
- `region_slug`: A human-readable string that is used as a unique identifier for each region.
- `resource_id`: A unique identifier for the resource that the action is associated with.

### FunctionKey

Results: A JSON response containing details about the newly created access key.; A JSON response containing a list of access keys for the namespace.; Success. The access key was deleted.; A JSON response containing the updated access key details.

SDK operations: `create`, `list`, `remove`, `update`.

Key fields to recognise:

- `created_at`: The date and time the key was created.
- `expires_at`: When the key expires (null for non-expiring keys).
- `expires_in`: The duration after which the access key expires, specified as a human-readable duration string in the format `&lt;int&gt;h` (hours) or `&lt;int&gt;d` (days).
- `id`: The access key&#39;s unique identifier with prefix &#39;`dof_v1_`&#39;.
- `name`: The access key&#39;s name.

### FunctionNamespace

Results: A JSON response object with a key called `namespace`. The object contains the properties associated with the namespace.; An array of JSON objects with a key called `namespaces`. Each object represents a namespace and contains the properties associated with it.; The action was successful and the response body is empty.

SDK operations: `create`, `list`, `load`, `remove`.

Key fields to recognise:

- `api_host`: The namespace&#39;s API hostname. Each function in a namespace is provided an endpoint at the namespace&#39;s hostname.
- `created_at`: UTC time string.
- `key`: A random alpha numeric string. This key is used in conjunction with the namespace&#39;s UUID to authenticate a user to use the namespace via `doctl`, DigitalOcean&#39;s official CLI.
- `label`: The namespace&#39;s unique name.
- `namespace`: A unique string format of UUID with a prefix fn-.

### FunctionTrigger

Results: A JSON response object with a key called `trigger`. The object contains the properties associated with the trigger.; An array of JSON objects with a key called `namespaces`. Each object represents a namespace and contains the properties associated with it.; The action was successful and the response body is empty.

SDK operations: `create`, `list`, `load`, `remove`, `update`.

Key fields to recognise:

- `created_at`: UTC time string.
- `function`: Name of function(action) that exists in the given namespace.
- `is_enabled`: Indicates weather the trigger is paused or unpaused.
- `name`: The trigger&#39;s unique name within the namespace.
- `namespace`: A unique string format of UUID with a prefix fn-.

### GenaiapiRegion

Results: A successful response.

SDK operations: `list`.

Key fields to recognise:

- `inference_url`: Url for inference server
- `region`: Region code
- `serves_batch`: This datacenter is capable of running batch jobs
- `serves_inference`: This datacenter is capable of serving inference
- `stream_inference_url`: The url for the inference streaming server

### Image

Results: The response will be a JSON object with a key called `transfer_id`. The value of this will be a number that identifies the initiated transfer. If the value is `0`, then the transfer has been accepted. Otherwise, the transfer is pending and waiting for the recipient to accept it.; The action was successful and the response body is empty.; Successful image generation. When stream is true, response is sent as Server-Sent Events (text/event-stream); otherwise a single JSON object (application/json) is returned.; The response will be a JSON object with a key set to `image`. The value of this will be an image object containing a subset of the standard image attributes as listed below, including the image&#39;s `id` and `status`. After initial creation, the `status` will be `NEW`. Using the image&#39;s id, you may query the image&#39;s status by sending a `GET` request to the `/v2/images/$IMAGE_ID` endpoint. When the `status` changes to `available`, the image will be ready for use.; The response will be a JSON object with a key called `images`. This will be set to an array of image objects, each of which will contain the standard image attributes.; The response will be a JSON object with a key called `image`. The value of this will be an image object containing the standard image attributes.; The response will be a JSON object with a key set to `image`. The value of this will be an image object containing the standard image attributes.

SDK operations: `create`, `list`, `load`, `remove`, `update`.

Key fields to recognise:

- `created_at`: The Unix timestamp when the event was created.
- `description`: An optional free-form text field to describe an image.
- `distribution`: The name of a custom image&#39;s distribution. Currently, the valid values are `Arch Linux`, `CentOS`, `CoreOS`, `Debian`, `Fedora`, `Fedora Atomic`, `FreeBSD`, `Gentoo`, `openSUSE`, `RancherOS`, `Rocky Linux`, `Ubuntu`, and `Unknown`. Any other value will be accepted but ignored, and `Unknown` will be used in its place.
- `error_message`: A string containing information about errors that may occur when importing a custom image.
- `id`: A short identifier corresponding to the HTTP status code returned. For example, the ID for a response returning a 404 status code would be &quot;`not_found`.&quot;

### ImageAction

Results: The results will be returned as a JSON object with an `actions` key. This will be set to an array filled with action objects containing the standard action attributes.

SDK operations: `list`.

Key fields to recognise:

- `completed_at`: A time value given in ISO8601 combined date and time format that represents when the action was completed.
- `id`: A unique numeric ID that can be used to identify and reference an action.
- `region_slug`: A human-readable string that is used as a unique identifier for each region.
- `resource_id`: A unique identifier for the resource that the action is associated with.
- `resource_type`: The type of resource that the action is associated with.

### Insight

Results: A single alert rule.; A single notification channel.; The response will be a JSON object with a key called `alert_instances`. This will be set to an array of alert instance objects, each of which will contain the standard attributes associated with an alert instance.; A list of alert rules.; A list of notification channels.; The response will be a JSON object with a key called `alert_instance` containing the standard attributes associated with an alert instance.; The action was successful and the response body is empty.

SDK operations: `create`, `list`, `load`, `remove`, `update`.

Key fields to recognise:

- `channel_type`: The configured channel type. Allowed values: - `CHANNEL_TYPE_EMAIL` = email - `CHANNEL_TYPE_SLACK` = slack - `CHANNEL_TYPE_WEBHOOK` = webhook
- `created_at`: Time the alert rule was created.
- `email`: Email notification channel configuration. Recipients must be verified team member email addresses.
- `id`: A unique identifier for the alert rule.
- `last_notified_at`: Time a notification was last sent for this alert instance.

### InvoiceSummary

Results: To retrieve a summary for an invoice, send a GET request to `/v2/customers/my/invoices/$INVOICE_UUID/summary`.

SDK operations: `load`.

Key fields to recognise:

- `amount`: Total amount of the invoice, in USD. This will reflect month-to-date usage in the invoice preview.
- `billing_period`: Billing period of usage for which the invoice is issued, in `YYYY-MM` format.
- `id`: A short identifier corresponding to the HTTP status code returned. For example, the ID for a response returning a 404 status code would be &quot;`not_found`.&quot;
- `invoice_id`: ID of the invoice
- `invoice_uuid`: UUID of the invoice

### Kubernete

Results: This does not indicate the success or failure of any operation, just that the request has been accepted for processing.; The response is a JSON object with a key called `run_id` that you can later use to fetch the run results.; The response will be a JSON object with a key called `node_pool`. The value of this will be an object containing the standard attributes of a node pool.; The response will be a JSON object with a key called `kubernetes_cluster`. The value of this will be an object containing the standard attributes of a Kubernetes cluster. The IP address and cluster API server endpoint will not be available until the cluster has finished provisioning. The initial value of the cluster&#39;s `status.state` attribute will be `provisioning`. When the cluster is ready, this will transition to `running`.; The action was successful and the response body is empty.; The response will be a JSON object with a key called `node_pools`. This will be set to an array of objects, each of which will contain the standard node pool attributes.; The response is a JSON object which contains status messages for a Kubernetes cluster. Each message object contains a timestamp and an indication of what issue the cluster is experiencing at a given time.; The response will be a JSON object with a key called `available_upgrade_versions`. The value of this will be an array of objects, representing the upgrade versions currently available for this cluster. If the cluster is up-to-date (that is there are no upgrades currently available) `available_upgrade_versions` will be `null`.; The response will be a JSON object with a key called `kubernetes_clusters`. This will be set to an array of objects, each of which will contain the standard Kubernetes cluster attributes.; The response will be a JSON object with a key called `node_pool`. The value of this will be an object containing the standard attributes of a node pool.; The response will be a JSON object with a key called `kubernetes_cluster`. The value of this will be an object containing the standard attributes of a Kubernetes cluster.; A kubeconfig file for the cluster in YAML format.

SDK operations: `create`, `list`, `load`, `remove`, `update`.

Key fields to recognise:

- `amd_gpu_device_metrics_exporter_plugin`: An object specifying whether the AMD Device Metrics Exporter should be enabled in the Kubernetes cluster.
- `amd_gpu_device_plugin`: An object specifying whether the AMD GPU Device Plugin should be enabled in the Kubernetes cluster. It&#39;s enabled by default for clusters with an AMD GPU node pool.
- `amd_gpu_dra_driver`: An object specifying whether the AMD GPU DRA Driver should be enabled in the Kubernetes cluster. Mutually exclusive with `amd_gpu_device_plugin`.
- `auto_scale`: A boolean value indicating whether auto-scaling is enabled for this node pool.
- `auto_upgrade`: A boolean value indicating whether the cluster will be automatically upgraded to new patch releases during its maintenance window.

### KubernetesOption

Results: The response will be a JSON object with a key called `options` which contains `regions`, `versions`, and `sizes` objects listing the available options and the matching slugs for use when creating a new cluster.

SDK operations: `load`.

### ListMcpServerTool

Results: The request was successful.

SDK operations: `list`, `update`.

Key fields to recognise:

- `description`: Tool description as the server reports it.
- `enabled`: Whether the tool is enabled in your team&#39;s catalog.
- `enabledToolSlugs`: The complete set of tool slugs (`&lt;server_ref&gt;_&lt;name&gt;`) to enable; every other tool of the server is disabled.
- `name`: Tool name as the server reports it, normalized to the catalog&#39;s naming rules.
- `quarantineReason`: Why the tool was quarantined; empty otherwise.

### ListProvider

Results: The request was successful.

SDK operations: `list`.

Key fields to recognise:

- `auth_type`: Deprecated: read `auth_types`, since a provider may accept more than one credential kind. This is the first entry of `auth_types` other than `none`, or `none` when that is the only entry.
- `auth_types`: Credential kinds the provider accepts, sorted: none|oauth|`shared_api_key`|unknown|`user_oauth_app`|`user_token`. `none` means the provider needs no credential. `oauth` means users can connect through DigitalOcean&#39;s shared OAuth application. `user_oauth_app` means users can connect through an OAuth client your team registers as a provider credential; without `oauth` alongside it, that is the only way to connect. `shared_api_key` means DigitalOcean supplies the key. `user_token` means your team or its users supply a key or token. `unknown` means the provider declares no kind this API recognizes, including an OAuth provider whose shared application is not available. It is never paired with another kind.
- `connection_parameters`: Non-sensitive values collected when creating a connection. Set only when `auth_types` contains `oauth` or `user_oauth_app`.
- `credential_parameters`: Non-secret values collected when registering an API key provider credential. They are validated against the provider&#39;s declaration and used to derive the credential&#39;s `base_url`; callers cannot supply header names or arbitrary destinations.
- `description`: Provider description.

### ListProviderHealth

Results: The request was successful.

SDK operations: `list`.

Key fields to recognise:

- `health`: Metrics over the window.
- `provider`: Provider ID.

### ListTool

Results: The request was successful.

SDK operations: `list`.

Key fields to recognise:

- `definitions`: definitions[i] describes tools[i].
- `pagination`: page and `per_page` echo the values applied; total is the number of tools matching `toolkitId` across all pages.
- `tools`: Tools on this page, grouped by provider and sorted by name within a provider.
- `version`: Catalog version identifier, for example `v1`.

### ListToolHealth

Results: The request was successful.

SDK operations: `list`.

Key fields to recognise:

- `health`: Metrics over the window.
- `provider`: ID of the provider that offers the tool.
- `tool_slug`: Catalog tool slug.

### ListToolbeltProvider

Results: The request was successful.

SDK operations: `list`.

Key fields to recognise:

- `categories`: The distinct tool categories among this toolbelt&#39;s members for the provider (sorted). Empty for `_legacy` or when no member has a category.
- `created_at`: When this version was created, in RFC 3339 format.
- `description`: Team-authored description.
- `id`: Equals provider; present so the entry has the same shape as a toolkit.
- `name`: Toolbelt name, unique among your team&#39;s active toolbelts.

### ListToolkit

Results: The request was successful.

SDK operations: `list`.

Key fields to recognise:

- `categories`: Distinct categories of the provider&#39;s released tools, sorted.
- `created_at`: When the provider was added.
- `description`: Provider description.
- `id`: Provider ID. For one of your team&#39;s MCP servers it is normally the server&#39;s `serverRef`; `provider_kind` tells the two kinds apart.
- `name`: Human-readable provider name.

### LoadBalancer

Results: The action was successful and the response body is empty.; Accepted; A JSON object with a key of `load_balancers`. This will be set to an array of objects, each of which will contain the standard load balancer attributes.; The response will be a JSON object with a key called `load_balancer`. The value of this will be an object that contains the standard attributes associated with a load balancer; The response will be a JSON object with a key called `load_balancer`. The value of this will be an object containing the standard attributes of a load balancer.

SDK operations: `create`, `list`, `load`, `remove`, `update`.

Key fields to recognise:

- `algorithm`: This field has been deprecated. You can no longer specify an algorithm for load balancers.
- `created_at`: A time value given in ISO8601 combined date and time format that represents when the load balancer was created.
- `disable_lets_encrypt_dns_records`: A boolean value indicating whether to disable automatic DNS record creation for Let&#39;s Encrypt certificates that are added to the load balancer.
- `domains`: An array of objects specifying the domain configurations for a Global load balancer.
- `droplet_ids`: An array containing the IDs of the Droplets assigned to the load balancer.

### LogsSearch

Results: Logs search result.

SDK operations: `create`.

Key fields to recognise:

- `data`: Matching log records. Omitted when no records match.
- `filter`: A boolean filter tree for logs queries.
- `order_by`: Sort clauses applied to the result set.
- `pagination`: Pagination response.
- `time_range`: An inclusive query time window.

### Logsink

Results: A JSON object with logsink properties.

SDK operations: `load`.

Key fields to recognise:

- `id`: A short identifier corresponding to the HTTP status code returned. For example, the ID for a response returning a 404 status code would be &quot;`not_found`.&quot;
- `sink_id`: A unique identifier for Logsink
- `sink_name`: The name of the Logsink

### McpServer

Results: The MCP server was registered.; The request was successful.; The MCP server was deleted.

SDK operations: `create`, `list`, `load`, `remove`, `update`.

Key fields to recognise:

- `api_key`: For `credentialRefSource` secret: the key or token itself.
- `createdAt`: When the server was registered, in RFC 3339 format.
- `credentialRef`: The secret reference supplied at registration when source=secret, or the team&#39;s OAuth credential ID when source=connection. Empty when the server was registered with an `api_key`, whose storage DigitalOcean manages.
- `credentialRefSource`: How requests to the server authenticate: none, secret (a key or token sent in the Authorization header), or connection (each user&#39;s own OAuth authorization).
- `description`: Team-authored description, shown on the server&#39;s catalog card. A resync does not replace it.

### Message

Results: Successful generation. When `stream` is true, the body is `text/event-stream` with server-sent event (SSE) payloads; otherwise `application/json` with `CreateMessageResponse`.

SDK operations: `create`.

Key fields to recognise:

- `content`: Assistant output blocks (`text` and/or `tool_use`).
- `id`: Unique identifier for this message object.
- `max_tokens`: Maximum tokens to generate before stopping.
- `messages`: Conversation turns.
- `metadata`: Optional request metadata.

### Metric

Results: The response will be a JSON object with a key called `data` and `status`.

SDK operations: `load`.

Key fields to recognise:

- `result`: Result of query.

### Model

Results: A list of available models.

SDK operations: `list`.

Key fields to recognise:

- `created`: The Unix timestamp (in seconds) when the model was created.
- `id`: The model identifier, which can be referenced in the API endpoints.
- `object`: The object type, which is always &quot;list&quot;.
- `owned_by`: The organization that owns the model.

### MonitoringAlert

Results: An alert policy.; A list of alert policies.; The action was successful and the response body is empty.

SDK operations: `create`, `list`, `load`, `remove`, `update`.

### MonitoringSink

Results: This does not indicate the success or failure of any operation, just that the request has been accepted for processing.; The response is a JSON object with a `sinks` key.; The response is a JSON object with a `sink` key.; The action was successful and the response body is empty.

SDK operations: `create`, `list`, `load`, `remove`.

Key fields to recognise:

- `destination_uuid`: A unique identifier for an already-existing destination.
- `resources`: List of resources identified by their URNs.

### MonitoringSinkDestination

Results: The response is a JSON object with a `destination` key.; The response is a JSON object with a `destinations` key.; The action was successful and the response body is empty.

SDK operations: `create`, `list`, `load`, `remove`, `update`.

Key fields to recognise:

- `config`: OpenSearch destination configuration with `credentials` omitted.
- `id`: A unique identifier for a destination.
- `name`: destination name
- `type`: The destination type. `opensearch_dbaas` for a DigitalOcean managed OpenSearch cluster or `opensearch_ext` for an externally managed one.

### N1Click

Results: A JSON object with a key of `1_clicks`.

SDK operations: `list`.

Key fields to recognise:

- `slug`: The slug identifier for the 1-Click application.
- `type`: The type of the 1-Click application.

### N1ClickApplication

Results: The response will verify that a job has been successfully created to install a 1-Click. The post-installation lifecycle of a 1-Click application can not be managed via the DigitalOcean API. For additional details specific to the 1-Click, find and view its [DigitalOcean Marketplace](https://marketplace.digitalocean.com) page.

SDK operations: `create`.

Key fields to recognise:

- `addon_slugs`: An array of 1-Click Application slugs to be installed to the Kubernetes cluster.
- `cluster_uuid`: A unique ID for the Kubernetes cluster to which the 1-Click Applications will be installed.
- `message`: A message about the result of the request.

### NeighborId

Results: A JSON object with an `neighbor_ids` key.

SDK operations: `list`.

Key fields to recognise:

- `neighbor_ids`: An array of arrays. Each array will contain a set of Droplet IDs for Droplets that share a physical server.

### Nfs

Results: A JSON response containing details about the new NFS share.; The response will be a JSON object with a key called `shares`. The value will be an array of objects, each containing the standard attributes associated with an NFS share.; The response will be a JSON object with a key called `share`. The value will be an object containing the standard attributes associated with an NFS share.; The action was successful and the response body is empty.

SDK operations: `create`, `list`, `load`, `remove`.

Key fields to recognise:

- `access_points`: Access points configured on this share. The default access point is returned first.
- `created_at`: Timestamp for when the NFS share was created.
- `host`: The host IP of the NFS server that will be accessible from the associated VPC
- `id`: The unique identifier of the NFS share.
- `mount_path`: Path at which the share will be available, to be mounted at a target of the user&#39;s choice within the client

### NfsAction2

Results: The response will be a JSON object with a key called `action`.

SDK operations: `create`.

Key fields to recognise:

- `id`: The unique identifier of the action.

### NfsSnapshot

Results: The response will be a JSON object with a key called `snapshots`. The value will be an array of objects, each containing the standard attributes associated with an NFS snapshot.; The response will be a JSON object with a key called `snapshot`. The value will be an object containing the standard attributes associated with an NFS snapshot.

SDK operations: `list`, `load`.

Key fields to recognise:

- `created_at`: The timestamp when the snapshot was created.
- `id`: The unique identifier of the snapshot.
- `name`: The human-readable name of the snapshot.
- `region`: The DigitalOcean region slug where the snapshot is located.
- `share_id`: The unique identifier of the share from which this snapshot was created.

### OnlineMigration

Results: A JSON object.

SDK operations: `load`, `update`.

Key fields to recognise:

- `created_at`: The time the migration was initiated, in ISO 8601 format.
- `disable_ssl`: Enables SSL encryption when connecting to the source database.
- `id`: The ID of the most recent migration.
- `ignore_dbs`: List of databases that should be ignored during migration.
- `status`: The current status of the migration.

### Option

Results: A JSON string with a key of `options`.

SDK operations: `load`.

### Organization

Results: The response will be a JSON object with a `team` key containing the created team and an optional `invitations` key mapping invitee email addresses to invitation status objects.; The response will be a JSON object with a `teams` key. This will be set to an array of team objects belonging to the organization.

SDK operations: `create`, `list`.

### OutputView

Results: The output view was created.; The output view is valid.; The request was successful.; The output view was deleted.

SDK operations: `create`, `list`, `load`, `remove`.

Key fields to recognise:

- `audit`: Null on a preview, which stores nothing.
- `description`: View description.
- `fields`: The dotted output paths a projection keeps; arrays are traversed element-wise. Empty for a transform.
- `id`: A short identifier corresponding to the HTTP status code returned. For example, the ID for a response returning a 404 status code would be &quot;`not_found`.&quot;
- `kind`: `OUTPUT_VIEW_KIND_PROJECTION` or `OUTPUT_VIEW_KIND_TRANSFORM`.

### PartnerNetworkConnect

Results: The response is an empty JSON object.; The response will be a JSON object with details about the partner attachment including attached VPC network IDs and BGP configuration information; The response will be a JSON object with a `remote_routes` array containing information on all the remote routes associated with the partner attachment; The response will be a JSON object with a `partner_attachments` key that contains an array of all partner attachments; The response will be a JSON object with a `bgp_auth_key` object containing a `value` field with the BGP auth key value; The response will be a JSON object with a `service_key` object containing the service key value and creation information; The response will be a JSON object with details about the partner attachment and `&quot;state&quot;: &quot;DELETING&quot;` to indicate that the partner attachment is being deleted.

SDK operations: `create`, `list`, `load`, `remove`, `update`.

Key fields to recognise:

- `bgp`: The BGP configuration for the partner attachment.
- `children`: An array of associated partner attachment UUIDs.
- `cidr`: A CIDR block representing a remote route.
- `connection_bandwidth_in_mbps`: The bandwidth (in Mbps) of the connection.
- `created_at`: A time value given in ISO8601 combined date and time format.

### PrepaymentConfig

Results: The response will be a JSON object with the customer&#39;s prepayment configuration and current prepayment status.

SDK operations: `load`.

### PrepaymentStatus

Results: The response will be a JSON object with the customer&#39;s prepayment gate status and balances.

SDK operations: `load`.

Key fields to recognise:

- `balance`: Current prepayment balance. Decimal dollars, for example `&quot;25.00&quot;`.
- `blocked`: Whether the prepayment gate is currently blocking usage.
- `eligible`: Whether the account is eligible for the prepayment gate experience.
- `is_auto_prepay_enabled`: Whether automatic prepayment top-up is enabled.
- `month_to_date_balance`: Current account balance including month-to-date usage. Decimal dollars, for example `&quot;75.00&quot;`.

### Project

Results: The response will be a JSON object with a key called `project`. The value of this will be an object with the standard project attributes; The response will be a JSON object with a key called `projects`. The value of this will be an object with the standard project attributes; The action was successful and the response body is empty.

SDK operations: `create`, `list`, `load`, `patch`, `remove`, `update`.

Key fields to recognise:

- `created_at`: A time value given in ISO8601 combined date and time format that represents when the project was created.
- `description`: The description of the project. The maximum length is 255 characters.
- `environment`: The environment of the project&#39;s resources.
- `id`: The unique universal identifier of this project.
- `is_default`: If true, all resources will be added to this project if no project is specified.

### ProjectResource

Results: The response will be a JSON object with a key called `resources`. The value of this will be an object with the standard resource attributes. Only resources that you are authorized to see will be returned.

SDK operations: `create`, `list`.

Key fields to recognise:

- `assigned_at`: A time value given in ISO8601 combined date and time format that represents when the project was created.
- `id`: A short identifier corresponding to the HTTP status code returned. For example, the ID for a response returning a 404 status code would be &quot;`not_found`.&quot;
- `links`: The links object contains the `self` object, which contains the resource relationship.
- `resources`: All resources, including the ones added in the request, that are assigned to the project. Only resources that you are authorized to see will be returned.
- `status`: The status of assigning and fetching the resources.

### PromQuery

Results: Instant query result.

SDK operations: `create`, `load`.

Key fields to recognise:

- `result`: Result payload shape depends on `resultType`. `vector` and `matrix` are series arrays. `scalar` and `string` both use a `[timestamp, value]` sample pair.

### PromQueryRange

Results: Range query result.

SDK operations: `create`, `load`.

Key fields to recognise:

- `result`: One entry per matching series, each carrying the samples evaluated at every step across the requested range.

### PromSeries

Results: Matching series label sets.

SDK operations: `create`, `list`.

### PromStringList

Results: Label names.; Label values.

SDK operations: `create`, `list`.

### Region

Results: A JSON object with a key set to `regions`. The value is an array of `region` objects, each of which contain the standard `region` attributes.

SDK operations: `list`.

Key fields to recognise:

- `available`: This is a boolean value that represents whether new Droplets can be created in this region.
- `features`: This attribute is set to an array which contains features available in this region
- `name`: The display name of the region. This will be a full name that is used in the control panel and other interfaces.
- `sizes`: This attribute is set to an array which contains the identifying slugs for the sizes available in this region. sizes:read is required to view.
- `slug`: A human-readable string that is used as a unique identifier for each region.

### ReservedIPv6

Results: The response will be a JSON object with key `reserved_ipv6`. The value of this will be an object that contains the standard attributes associated with a reserved IPv6.; The response will be a JSON object with a key called `reserved_ipv6s`. This will be set to an array of reserved IP objects, each of which will contain the standard reserved IP attributes; The action was successful and the response body is empty.

SDK operations: `create`, `list`, `load`, `remove`.

Key fields to recognise:

- `droplet`: Requires `droplet:read` scope.
- `ip`: The public IP address of the reserved IPv6. It also serves as its identifier.
- `region_slug`: The region that the reserved IPv6 is reserved to. When you query a reserved IPv6,the `region_slug` will be returned.
- `reserved_at`: The date and time when the reserved IPv6 was reserved.

### ReservedIPv6Action

Results: The response will be an object with a key called `action`. The value of this will be an object that contains the standard reserved IP action attributes.

SDK operations: `create`.

### ReservedIp

Results: The response will be a JSON object with a key called `reserved_ip`. The value of this will be an object that contains the standard attributes associated with a reserved IP. When assigning a reserved IP to a Droplet at same time as it created, the response&#39;s `links` object will contain links to both the Droplet and the assignment action. The latter can be used to check the status of the action.; The response will be a JSON object with a key called `reserved_ips`. This will be set to an array of reserved IP objects, each of which will contain the standard reserved IP attributes; The response will be a JSON object with a key called `reserved_ip`. The value of this will be an object that contains the standard attributes associated with a reserved IP.; The action was successful and the response body is empty.

SDK operations: `create`, `list`, `load`, `remove`.

Key fields to recognise:

- `droplet`: The Droplet that the reserved IP has been assigned to. When you query a reserved IP, if it is assigned to a Droplet, the entire Droplet object will be returned. If it is not assigned, the value will be null. Requires `droplet:read` scope.
- `id`: A unique identifier for each Droplet instance. This is automatically generated upon Droplet creation.
- `ip`: The public IP address of the reserved IP. It also serves as its identifier.
- `locked`: A boolean value indicating whether or not the reserved IP has pending actions preventing new ones from being submitted.
- `project_id`: The UUID of the project to which the reserved IP currently belongs. Requires `project:read` scope.

### ReservedIpAction

Results: The response will be an object with a key called `action`. The value of this will be an object that contains the standard reserved IP action attributes.; The results will be returned as a JSON object with an `actions` key. This will be set to an array filled with action objects containing the standard reserved IP action attributes.

SDK operations: `create`, `list`, `load`.

Key fields to recognise:

- `completed_at`: A time value given in ISO8601 combined date and time format that represents when the action was completed.
- `id`: A unique numeric ID that can be used to identify and reference an action.
- `project_id`: The UUID of the project to which the reserved IP currently belongs.
- `region_slug`: A human-readable string that is used as a unique identifier for each region.
- `resource_id`: A unique identifier for the resource that the action is associated with.

### Resync

Results: Discovery finished.; Discovery is still running. Poll the MCP server for its `syncStatus`.

SDK operations: `create`.

Key fields to recognise:

- `authorization`: Set when discovery could not run because `user_id` has no authorized connection to this server yet. It carries the remedy, send the user to `connect_url` , so the caller acts on this response rather than parsing the server&#39;s `syncError`.
- `mcpServer`: The server, including `syncStatus` and `syncError`.
- `pending`: True when discovery is still running (HTTP 202). Poll the server to see the outcome.
- `tools`: Every tool discovered on the server when discovery finished in time; empty when pending is true.
- `user_id`: Required for a server registered with `credentialRefSource` connection: discovery reaches the server as this user, through their connection, because such a server has no team-wide credential.

### Search

Results: The request was successful.

SDK operations: `list`.

Key fields to recognise:

- `actorId`: Empty when the session is not bound to an actor.
- `agentName`: Name of the agent that started the session. Empty for sessions created through this API.
- `agentUrn`: URN of the agent that started the session. Empty for sessions created through this API.
- `auth_type`: Deprecated: read `auth_types`, since a provider may accept more than one credential kind. This is the first entry of `auth_types` other than `none`, or `none` when that is the only entry.
- `auth_types`: Credential kinds the provider accepts, sorted: none|oauth|`shared_api_key`|unknown|`user_oauth_app`|`user_token`. `none` means the provider needs no credential. `oauth` means users can connect through DigitalOcean&#39;s shared OAuth application. `user_oauth_app` means users can connect through an OAuth client your team registers as a provider credential; without `oauth` alongside it, that is the only way to connect. `shared_api_key` means DigitalOcean supplies the key. `user_token` means your team or its users supply a key or token. `unknown` means the provider declares no kind this API recognizes, including an OAuth provider whose shared application is not available. It is never paired with another kind.

### SecurityPlan

Results: The response will be a JSON object with updated tier coverage.

SDK operations: `update`.

Key fields to recognise:

- `tier_coverage`: Scan coverage for each available plan tier.

### SecurityRule

Results: The action was successful and the response body is empty.

SDK operations: `create`.

Key fields to recognise:

- `resource`: The URN of a resource to exclude from future scans.

### SecurityScan

Results: The response will be a JSON object with a key called `scan`.; The response will be a JSON object with a key called `affected_resources`.; The response will be a JSON object with a key called `scans`. This will be set to an array of objects, each of which will contain the standard attributes associated with a scan.

SDK operations: `create`, `list`, `load`.

Key fields to recognise:

- `created_at`: When scan was created.
- `id`: The unique identifier for the scan.
- `name`: The name of the rule that triggered the finding.
- `status`: The status of the scan.
- `type`: The type of the affected resource.

### SecuritySuppression

Results: The response will be a JSON object containing suppressed resources.; The action was successful and the response body is empty.

SDK operations: `create`, `remove`.

Key fields to recognise:

- `resources`: The URNs of resources to suppress for the rule.
- `rule_uuid`: Unique identifier for the suppressed rule.

### Setting

Results: The response will be a JSON object with scan settings.

SDK operations: `load`.

### Size

Results: A JSON object with a key called `sizes`. The value of this will be an array of `size` objects each of which contain the standard size attributes.

SDK operations: `list`.

Key fields to recognise:

- `available`: This is a boolean value that represents whether new Droplets can be created with this size.
- `description`: A string describing the class of Droplets created from this size. For example: Basic, General Purpose, CPU-Optimized, Memory-Optimized, or Storage-Optimized.
- `disk`: The amount of disk space set aside for Droplets of this size. The value is represented in gigabytes.
- `disk_info`: An array of objects containing information about the disks available to Droplets created with this size.
- `gpu_info`: An object containing information about the GPU capabilities of Droplets created with this size.

### Snapshot

Results: A JSON object with a key of `snapshots`.; A JSON object with a key called `snapshot`.; The action was successful and the response body is empty.

SDK operations: `list`, `load`, `remove`.

Key fields to recognise:

- `created_at`: A time value given in ISO8601 combined date and time format that represents when the snapshot was created.
- `id`: The unique identifier for the snapshot.
- `min_disk_size`: The minimum size in GB required for a volume or Droplet to use this snapshot.
- `name`: A human-readable name for the snapshot.
- `regions`: An array of the regions that the snapshot is available in. The regions are represented by their identifying slug values.

### SpacesKey

Results: A JSON response containing details about the new key.; A JSON response containing a list of keys.; A JSON response containing details about the key.; The response will be a JSON object; The action was successful and the response body is empty.

SDK operations: `create`, `list`, `load`, `patch`, `remove`, `update`.

Key fields to recognise:

- `access_key`: The Access Key ID used to access a bucket.
- `created_at`: The date and time the key was created.
- `grants`: The list of permissions for the access key.
- `id`: A short identifier corresponding to the HTTP status code returned. For example, the ID for a response returning a 404 status code would be &quot;`not_found`.&quot;
- `name`: The access key&#39;s name.

### SqlMode

Results: A JSON string with a key of `sql_mode`.

SDK operations: `load`.

Key fields to recognise:

- `sql_mode`: A string specifying the configured SQL modes for the MySQL cluster.

### SshKey

Results: The response body will be a JSON object with a key set to `ssh_key`.; A JSON object with the key set to `ssh_keys`. The value is an array of `ssh_key` objects, each of which contains the standard `ssh_key` attributes.; A JSON object with the key set to `ssh_key`. The value is an `ssh_key` object containing the standard `ssh_key` attributes.; The action was successful and the response body is empty.

SDK operations: `create`, `list`, `load`, `remove`, `update`.

Key fields to recognise:

- `fingerprint`: A unique identifier that differentiates this key from other keys using a format that SSH recognizes. The fingerprint is created when the key is added to your account.
- `id`: A unique identification number for this key. Can be used to embed a specific SSH key into a Droplet.
- `name`: A human-readable display name for this key, used to easily identify the SSH keys when they are displayed.
- `public_key`: The entire public key string that was uploaded. Embedded into the root user&#39;s `authorized_keys` file if you include this key during Droplet creation.

### Systemone

Results: Successful System One evaluation.

SDK operations: `create`.

Key fields to recognise:

- `answers`: A map of question name to answer, using the same keys as the request&#39;s `questions` object.
- `model`: Model ID that produced the response.
- `questions`: A map of question name to question definition.
- `state`: The state to evaluate.
- `usage`: Token usage for the request. System One billing is input-token only.

### Tag

Results: The action was successful and the response body is empty.; The response will be a JSON object with a key called tag. The value of this will be a tag object containing the standard tag attributes; To list all of your tags, you can send a `GET` request to `/v2/tags`.; The response will be a JSON object with a key called `tag`. The value of this will be a tag object containing the standard tag attributes. Tagged resources will only include resources that you are authorized to see.

SDK operations: `create`, `list`, `load`, `remove`.

Key fields to recognise:

- `id`: A short identifier corresponding to the HTTP status code returned. For example, the ID for a response returning a 404 status code would be &quot;`not_found`.&quot;
- `name`: The name of the tag. Tags may contain letters, numbers, colons, dashes, and underscores. There is a limit of 255 characters per tag. **Note:** Tag names are case stable, which means the capitalization you use when you first create a tag is canonical. When working with tags in the API, you must use the tag&#39;s canonical capitalization. For example, if you create a tag named &quot;PROD&quot;, the URL to add that tag to a resource would be `https://api.digitalocean.com/v2/tags/PROD/resources` (not `/v2/tags/prod/resources`). Tagged resources in the control panel will always display the canonical capitalization. For example, if you create a tag named &quot;PROD&quot;, you can tag resources in the control panel by entering &quot;prod&quot;. The tag will still display with its canonical capitalization, &quot;PROD&quot;.
- `resources`: An embedded object containing key value pairs of resource type and resource statistics. It also includes a count of the total number of resources tagged with the current tag as well as a `last_tagged_uri` attribute set to the last resource tagged with the current tag. This will only include resources that you are authorized to see. For example, to see tagged Droplets, include the `droplet:read` scope.

### Tool

Results: The request was successful.

SDK operations: `list`, `load`.

Key fields to recognise:

- `category`: Best-effort catalog metadata and is empty for a large share of the catalog. Do not rely on it being present.
- `description`: What the tool does.
- `history`: Present only when the request set `include_history`.
- `id`: A short identifier corresponding to the HTTP status code returned. For example, the ID for a response returning a 404 status code would be &quot;`not_found`.&quot;
- `name`: The unqualified tool name, without the provider prefix.

### Toolbelt

Results: The request was successful.; The toolbelt was created.; The toolbelt was deprecated.

SDK operations: `create`, `list`, `load`, `remove`.

Key fields to recognise:

- `created_at`: When this version was created, in RFC 3339 format.
- `description`: Team-authored description.
- `display_name`: Human-readable label.
- `id`: A short identifier corresponding to the HTTP status code returned. For example, the ID for a response returning a 404 status code would be &quot;`not_found`.&quot;
- `latest_version`: Latest version number, as a string.

### Uptime

Results: The response will be a JSON object with a key called `alert`. The value of this will be an object that contains the standard attributes associated with an uptime alert.; The response will be a JSON object with a key called `check`. The value of this will be an object that contains the standard attributes associated with an uptime check.; The response will be a JSON object with a key called `alerts`. This will be set to an array of objects, each of which will contain the standard attributes associated with an uptime alert.; The response will be a JSON object with a key called `checks`. This will be set to an array of objects, each of which will contain the standard attributes associated with an uptime check; The response will be a JSON object with a key called `state`. The value of this will be an object that contains the standard attributes associated with an uptime check&#39;s state.; The action was successful and the response body is empty.

SDK operations: `create`, `list`, `load`, `remove`, `update`.

Key fields to recognise:

- `comparison`: The comparison operator used against the alert&#39;s threshold.
- `enabled`: A boolean value indicating whether the check is enabled/disabled.
- `id`: A unique ID that can be used to identify and reference the alert.
- `name`: A human-friendly display name.
- `notifications`: The notification settings for a trigger alert.

### User

Results: The request was successful.; The response will be a JSON object with a key called `kubernetes_cluster_user` containing the username and in-cluster groups that it belongs to.

SDK operations: `list`, `load`.

Key fields to recognise:

- `connections`: The user&#39;s connections that are not revoked, sorted by provider.
- `groups`: A list of in-cluster groups that the user belongs to.
- `id`: A short identifier corresponding to the HTTP status code returned. For example, the ID for a response returning a 404 status code would be &quot;`not_found`.&quot;
- `pagination`: Paging applied to this response and the total number of users.
- `sessions`: Sessions bound to the user, oldest first.

### VectorDatabase

Results: A successful response.

SDK operations: `remove`.

Key fields to recognise:

- `id`: A short identifier corresponding to the HTTP status code returned. For example, the ID for a response returning a 404 status code would be &quot;`not_found`.&quot;

### VectordbBackup

Results: A successful response.

SDK operations: `list`.

Key fields to recognise:

- `backup_id`: Unique identifier for the backup (for example, &quot;vectordb-&#123;uuid&#125;-20240101-120000&quot;).
- `completed_at`: Timestamp when the backup process completed.
- `started_at`: Timestamp when the backup process started.
- `status`: Status of the backup: SUCCESS.

### VectordbGetRestoreStatus

Results: A successful response.

SDK operations: `load`.

Key fields to recognise:

- `backup_id`: The backup ID being restored.
- `error`: Error message if the restore failed.
- `status`: Current status: STARTED, TRANSFERRING, TRANSFERRED, FINALIZING, SUCCESS, FAILED, CANCELLING, CANCELED.

### VectordbGetVectorDb

Results: A successful response.

SDK operations: `create`, `list`, `load`.

Key fields to recognise:

- `config`: VectorDBConfig holds optional, advanced cluster settings.
- `endpoints`: VectorDBEndpoints contains the connection endpoints for a vector database instance.
- `forked_from_id`: ID of the vector database this instance was forked from. Empty when the instance was created directly via CreateVectorDB. Read-only and set by the platform at fork time; never modifiable through UpdateVectorDB.
- `id`: A short identifier corresponding to the HTTP status code returned. For example, the ID for a response returning a 404 status code would be &quot;`not_found`.&quot;
- `last_restore_id`: `Backup_id` of the most recent restore initiated against this instance. Empty if no restore has ever been triggered. Lets callers recover the identifier of an in-flight or last-completed restore without having to retain the RestoreBackupResponse themselves. Use it with GetRestoreStatus to fetch the live status.

### VectordbGetVectorDbAdminCredential

Results: A successful response.

SDK operations: `load`.

Key fields to recognise:

- `api_token`: API token for that user.
- `user_id`: Database user id from the cluster secret (opaque; matches what was provisioned).

### VectordbRestoreBackup

Results: A successful response.

SDK operations: `create`.

Key fields to recognise:

- `backup_id`: The backup ID being restored.
- `id`: A short identifier corresponding to the HTTP status code returned. For example, the ID for a response returning a 404 status code would be &quot;`not_found`.&quot;
- `status`: Initial status of the restore operation (for example, &quot;STARTED&quot;).

### VectordbUpdateVectorDb

Results: A successful response.

SDK operations: `update`.

Key fields to recognise:

- `config`: VectorDBConfig holds optional, advanced cluster settings.
- `endpoints`: VectorDBEndpoints contains the connection endpoints for a vector database instance.
- `forked_from_id`: ID of the vector database this instance was forked from. Empty when the instance was created directly via CreateVectorDB. Read-only and set by the platform at fork time; never modifiable through UpdateVectorDB.
- `id`: A short identifier corresponding to the HTTP status code returned. For example, the ID for a response returning a 404 status code would be &quot;`not_found`.&quot;
- `last_restore_id`: `Backup_id` of the most recent restore initiated against this instance. Empty if no restore has ever been triggered. Lets callers recover the identifier of an in-flight or last-completed restore without having to retain the RestoreBackupResponse themselves. Use it with GetRestoreStatus to fetch the live status.

### VectordbUpdateVectorDbTag

Results: A successful response.

SDK operations: `update`.

Key fields to recognise:

- `config`: VectorDBConfig holds optional, advanced cluster settings.
- `endpoints`: VectorDBEndpoints contains the connection endpoints for a vector database instance.
- `forked_from_id`: ID of the vector database this instance was forked from. Empty when the instance was created directly via CreateVectorDB. Read-only and set by the platform at fork time; never modifiable through UpdateVectorDB.
- `id`: A short identifier corresponding to the HTTP status code returned. For example, the ID for a response returning a 404 status code would be &quot;`not_found`.&quot;
- `last_restore_id`: `Backup_id` of the most recent restore initiated against this instance. Empty if no restore has ever been triggered. Lets callers recover the identifier of an in-flight or last-completed restore without having to retain the RestoreBackupResponse themselves. Use it with GetRestoreStatus to fetch the live status.

### Vpc

Results: The response will be a JSON object with a key called `peering`, containing the standard attributes associated with a VPC peering.; The response will be a JSON object with a key called `vpc`. The value of this will be an object that contains the standard attributes associated with a VPC.; The response will be a JSON object with a key called members. This will be set to an array of objects, each of which will contain the standard attributes associated with a VPC member. Only resources that you are authorized to see will be returned (for example to see Droplets, you must have `droplet:read`).; The response will be a JSON object with a key called `peerings`. This will be set to an array of objects, each of which will contain the standard attributes associated with a VPC peering.; The response will be a JSON object with a key called `vpcs`. This will be set to an array of objects, each of which will contain the standard attributes associated with a VPC.; The action was successful and the response body is empty.

SDK operations: `create`, `list`, `load`, `patch`, `remove`, `update`.

Key fields to recognise:

- `created_at`: A time value given in ISO8601 combined date and time format.
- `default`: A boolean value indicating whether or not the VPC is the default network for the region. All applicable resources are placed into the default VPC network unless otherwise specified during their creation. The `default` field cannot be unset from `true`. If you want to set a new default VPC network, update the `default` field of another VPC network in the same region. The previous network&#39;s `default` field will be set to `false` when a new default VPC has been defined.
- `description`: A free-form text field for describing the VPC&#39;s purpose. It may be a maximum of 255 characters.
- `id`: A unique ID that can be used to identify and reference the VPC peering.
- `ip_range`: The range of IP addresses in the VPC in CIDR notation. Network ranges cannot overlap with other networks in the same account and must be in range of private addresses as defined in RFC1918. It may not be smaller than `/28` nor larger than `/16`. If no IP range is specified, a `/20` network range is generated that won&#39;t conflict with other VPC networks in your account.

### VpcNatGateway

Results: The response will be a JSON object with a key called `vpc_nat_gateway`. This will be set to a JSON object that contains the standard VPC NAT gateway attributes.; A JSON object with a key of `vpc_nat_gateways`.; The action was successful and the response body is empty.

SDK operations: `create`, `list`, `load`, `remove`, `update`.

Key fields to recognise:

- `created_at`: A time value given in ISO8601 combined date and time format that represents when the VPC NAT gateway was created.
- `egresses`: An optional object specifying the public egress IP address to assign to the VPC NAT gateway. Provide this only to use a specific address. If omitted, DigitalOcean allocates a public IP address automatically.
- `icmp_timeout_seconds`: The ICMP timeout in seconds for the VPC NAT gateway.
- `id`: A short identifier corresponding to the HTTP status code returned. For example, the ID for a response returning a 404 status code would be &quot;`not_found`.&quot;
- `name`: The human-readable name of the VPC NAT gateway.

### VpcPeering

Results: The response will be a JSON object with a key called `vpc_peering`. The value of this will be an object that contains the standard attributes associated with a VPC peering.; The response will be a JSON object with a key called `vpc_peerings`. This will be set to an array of objects, each of which will contain the standard attributes associated with a VPC peering.

SDK operations: `create`, `list`, `load`, `remove`, `update`.

Key fields to recognise:

- `created_at`: A time value given in ISO8601 combined date and time format.
- `id`: A unique ID that can be used to identify and reference the VPC peering.
- `name`: The name of the VPC peering. Must be unique within the team and may only contain alphanumeric characters and dashes.
- `status`: The current status of the VPC peering.
- `vpc_ids`: An array of the two peered VPCs IDs.

### VpcRoutesPublicPreview

Results: A route.; A list of routes.; The action was successful and the response body is empty.

SDK operations: `create`, `list`, `remove`, `update`.

Key fields to recognise:

- `created_at`: The time when the route was created.
- `destination_cidr`: The destination IPv4 network for the route in CIDR notation.
- `id`: The unique identifier of the route.
- `modifiable`: Whether the caller can update or delete the route.
- `target_urns`: The URNs of resources that act as next hops for the route. Supported next hops are Droplets, using a numeric ID in the format `do:droplet:&lt;id&gt;`, and VPC NAT Gateways, using a UUID in the format `do:nat_gateway:&lt;uuid&gt;`.

### VpcSubnetsPublicPreview

Results: A VPC subnet.; A list of resources that are members of the VPC subnet. Only resources that the caller is authorized to view are returned.; A list of VPC subnets.; The action was successful and the response body is empty.

SDK operations: `create`, `list`, `load`, `remove`, `update`.

Key fields to recognise:

- `created_at`: The time when the VPC subnet was created.
- `default`: Whether this is the default subnet for the VPC.
- `id`: The unique identifier of the VPC subnet.
- `ip_range`: The IPv4 range assigned to the subnet in CIDR notation.
- `meta`: Additional information about the VPC subnet.

### Route map

Use this map to locate a capability. Consult the entity reference before supplying request data; routes for the same operation can require different fields.

| Entity | SDK operation | HTTP route | Authentication |
| --- | --- | --- | --- |
| AccessPoint | `create` | `POST /v2/nfs/shares/{share_id}/access_points` | Required |
| AccessPoint | `list` | `GET /v2/nfs/shares/{share_id}/access_points` | Required |
| AccessPoint | `load` | `GET /v2/nfs/access_points/{access_point_id}` | Required |
| AccessPoint | `remove` | `DELETE /v2/nfs/access_points/{access_point_id}` | Required |
| Account | `load` | `GET /v2/account` | Required |
| Action | `list` | `GET /v2/actions` | Required |
| Action | `load` | `GET /v2/actions/{action_id}` | Required |
| ActorLimit | `list` | `GET /v2/action-gateway/actors/{actor_id}/limits` | Required |
| AddOnApp | `list` | `GET /v2/add-ons/apps/{app_slug}/metadata` | Required |
| AddOnApp | `list` | `GET /v2/add-ons/apps` | Required |
| AddOnPlan | `update` | `PATCH /v2/add-ons/saas/{resource_uuid}/plan` | Required |
| AddOnResource | `create` | `POST /v2/add-ons/saas` | Required |
| AddOnResource | `list` | `GET /v2/add-ons/saas` | Required |
| AddOnResource | `load` | `GET /v2/add-ons/saas/{resource_uuid}` | Required |
| AddOnResource | `remove` | `DELETE /v2/add-ons/saas/{resource_uuid}` | Required |
| AddOnResource | `update` | `PATCH /v2/add-ons/saas/{resource_uuid}` | Required |
| ApiAgentVersion | `list` | `GET /v2/gen-ai/agents/{uuid}/versions` | Required |
| ApiCreateAgentApiKeyOutput | `create` | `POST /v2/gen-ai/agents/{agent_uuid}/api_keys` | Required |
| ApiCreateDataSourceFileUploadPresignedUrlsOutput | `create` | `POST /v2/gen-ai/evaluation_datasets/file_upload_presigned_urls` | Required |
| ApiCreateDataSourceFileUploadPresignedUrlsOutput | `create` | `POST /v2/gen-ai/knowledge_bases/data_sources/file_upload_presigned_urls` | Required |
| ApiCreateDataSourceFileUploadPresignedUrlsOutput | `create` | `POST /v2/gen-ai/model_evaluation/datasets/file_upload_presigned_urls` | Required |
| ApiCreateDataSourceFileUploadPresignedUrlsOutput | `create` | `POST /v2/gen-ai/scenario_sets/file_upload_presigned_urls` | Required |
| ApiCreateKnowledgeBaseDataSourceOutput | `create` | `POST /v2/gen-ai/knowledge_bases/{knowledge_base_uuid}/data_sources` | Required |
| ApiCreateScenarioSetFromLibraryOutput | `create` | `POST /v2/gen-ai/scenario_library/{library_scenario_uuid}/create_scenario_set` | Required |
| ApiDeleteAgentApiKeyOutput | `remove` | `DELETE /v2/gen-ai/agents/{agent_uuid}/api_keys/{api_key_uuid}` | Required |
| ApiDeleteAgentApiKeyOutput | `update` | `PUT /v2/gen-ai/agents/{agent_uuid}/api_keys/{api_key_uuid}/regenerate` | Required |
| ApiDeleteAgentOutput | `create` | `POST /v2/gen-ai/agents` | Required |
| ApiDeleteAgentOutput | `list` | `GET /v2/gen-ai/agents` | Required |
| ApiDeleteAgentOutput | `remove` | `DELETE /v2/gen-ai/agents/{uuid}` | Required |
| ApiDeleteAnthropicApiKeyOutput | `create` | `POST /v2/gen-ai/anthropic/keys` | Required |
| ApiDeleteAnthropicApiKeyOutput | `list` | `GET /v2/gen-ai/anthropic/keys` | Required |
| ApiDeleteAnthropicApiKeyOutput | `remove` | `DELETE /v2/gen-ai/anthropic/keys/{api_key_uuid}` | Required |
| ApiDeleteCustomEvaluationMetricOutput | `remove` | `DELETE /v2/gen-ai/custom_evaluation_metrics/{metric_uuid}` | Required |
| ApiDeleteCustomModelOutputPublic | `remove` | `DELETE /v2/gen-ai/custom_models/{uuid}` | Required |
| ApiDeleteEvaluationDatasetOutput | `create` | `POST /v2/gen-ai/evaluation_datasets` | Required |
| ApiDeleteEvaluationDatasetOutput | `list` | `GET /v2/gen-ai/evaluation_datasets` | Required |
| ApiDeleteEvaluationDatasetOutput | `remove` | `DELETE /v2/gen-ai/evaluation_datasets/{dataset_uuid}` | Required |
| ApiDeleteKnowledgeBaseDataSourceOutput | `remove` | `DELETE /v2/gen-ai/knowledge_bases/{knowledge_base_uuid}/data_sources/{data_source_uuid}` | Required |
| ApiDeleteKnowledgeBaseOutput | `remove` | `DELETE /v2/gen-ai/knowledge_bases/{uuid}` | Required |
| ApiDeleteModelApiKeyOutput | `create` | `POST /v2/gen-ai/models/api_keys` | Required |
| ApiDeleteModelApiKeyOutput | `list` | `GET /v2/gen-ai/models/api_keys` | Required |
| ApiDeleteModelApiKeyOutput | `remove` | `DELETE /v2/gen-ai/models/api_keys/{api_key_uuid}` | Required |
| ApiDeleteModelApiKeyOutput | `update` | `PUT /v2/gen-ai/models/api_keys/{api_key_uuid}/regenerate` | Required |
| ApiDeleteModelEvaluationPresetOutput | `remove` | `DELETE /v2/gen-ai/model_evaluation_presets/{eval_preset_uuid}` | Required |
| ApiDeleteModelEvaluationRunOutputPublic | `remove` | `DELETE /v2/gen-ai/model_evaluation_runs/{eval_run_uuid}` | Required |
| ApiDeleteModelRouterOutput | `remove` | `DELETE /v2/gen-ai/models/routers/{uuid}` | Required |
| ApiDeleteOpenAiapiKeyOutput | `create` | `POST /v2/gen-ai/openai/keys` | Required |
| ApiDeleteOpenAiapiKeyOutput | `list` | `GET /v2/gen-ai/openai/keys` | Required |
| ApiDeleteOpenAiapiKeyOutput | `remove` | `DELETE /v2/gen-ai/openai/keys/{api_key_uuid}` | Required |
| ApiDeleteScenarioSetOutput | `remove` | `DELETE /v2/gen-ai/scenario_sets/{scenario_set_uuid}` | Required |
| ApiDeleteScheduledIndexingOutput | `create` | `POST /v2/gen-ai/scheduled-indexing` | Required |
| ApiDeleteScheduledIndexingOutput | `remove` | `DELETE /v2/gen-ai/scheduled-indexing/{uuid}` | Required |
| ApiDeleteSimulationRunOutput | `remove` | `DELETE /v2/gen-ai/simulation_runs/{run_uuid}` | Required |
| ApiDeleteWorkspaceOutput | `remove` | `DELETE /v2/gen-ai/workspaces/{workspace_uuid}` | Required |
| ApiDropboxOauth2GetTokensOutput | `create` | `POST /v2/gen-ai/oauth2/dropbox/tokens` | Required |
| ApiGenerateOauth2UrlOutput | `load` | `GET /v2/gen-ai/oauth2/url` | Required |
| ApiGenerateScenarioSetOutput | `create` | `POST /v2/gen-ai/scenario_sets/generate` | Required |
| ApiGetAgentOutput | `load` | `GET /v2/gen-ai/agents/{uuid}` | Required |
| ApiGetAgentOutput | `update` | `PUT /v2/gen-ai/agents/{uuid}/deployment_visibility` | Required |
| ApiGetAgentUsageOutput | `load` | `GET /v2/gen-ai/agents/{uuid}/usage` | Required |
| ApiGetAnthropicApiKeyOutput | `load` | `GET /v2/gen-ai/anthropic/keys/{api_key_uuid}` | Required |
| ApiGetChildrenOutput | `list` | `GET /v2/gen-ai/agents/{uuid}/child_agents` | Required |
| ApiGetCustomModelOutputPublic | `list` | `GET /v2/gen-ai/custom_models` | Required |
| ApiGetCustomModelOutputPublic | `load` | `GET /v2/gen-ai/custom_models/{uuid}` | Required |
| ApiGetCustomModelOutputPublic | `update` | `PATCH /v2/gen-ai/custom_models/{uuid}/metadata` | Required |
| ApiGetEvaluationDatasetDownloadUrlOutput | `load` | `GET /v2/gen-ai/evaluation_datasets/{dataset_uuid}/download_url` | Required |
| ApiGetEvaluationRunOutput | `create` | `POST /v2/gen-ai/evaluation_runs` | Required |
| ApiGetEvaluationRunOutput | `load` | `GET /v2/gen-ai/evaluation_runs/{evaluation_run_uuid}` | Required |
| ApiGetEvaluationRunResultsOutput | `list` | `GET /v2/gen-ai/evaluation_runs/{evaluation_run_uuid}/results` | Required |
| ApiGetEvaluationTestCaseOutput | `create` | `POST /v2/gen-ai/evaluation_test_cases` | Required |
| ApiGetEvaluationTestCaseOutput | `list` | `GET /v2/gen-ai/evaluation_test_cases` | Required |
| ApiGetEvaluationTestCaseOutput | `load` | `GET /v2/gen-ai/evaluation_test_cases/{test_case_uuid}` | Required |
| ApiGetIndexingJobDetailsSignedUrlOutput | `load` | `GET /v2/gen-ai/indexing_jobs/{indexing_job_uuid}/details_signed_url` | Required |
| ApiGetKnowledgeBaseIndexingJobOutput | `create` | `POST /v2/gen-ai/indexing_jobs` | Required |
| ApiGetKnowledgeBaseIndexingJobOutput | `list` | `GET /v2/gen-ai/indexing_jobs` | Required |
| ApiGetKnowledgeBaseIndexingJobOutput | `load` | `GET /v2/gen-ai/indexing_jobs/{uuid}` | Required |
| ApiGetKnowledgeBaseIndexingJobOutput | `update` | `PUT /v2/gen-ai/indexing_jobs/{uuid}/cancel` | Required |
| ApiGetKnowledgeBaseOutput | `load` | `GET /v2/gen-ai/knowledge_bases/{uuid}` | Required |
| ApiGetModelEvaluationRunOutput | `load` | `GET /v2/gen-ai/model_evaluation_runs/{eval_run_uuid}` | Required |
| ApiGetModelEvaluationRunOutput | `update` | `PUT /v2/gen-ai/model_evaluation_runs/{eval_run_uuid}/cancel` | Required |
| ApiGetModelEvaluationRunResultsDownloadUrlOutput | `load` | `GET /v2/gen-ai/model_evaluation_runs/{eval_run_uuid}/results/download_url` | Required |
| ApiGetModelRouterOutput | `create` | `POST /v2/gen-ai/models/routers` | Required |
| ApiGetModelRouterOutput | `list` | `GET /v2/gen-ai/models/routers` | Required |
| ApiGetModelRouterOutput | `load` | `GET /v2/gen-ai/models/routers/{uuid}` | Required |
| ApiGetOpenAiapiKeyOutput | `load` | `GET /v2/gen-ai/openai/keys/{api_key_uuid}` | Required |
| ApiGetScenarioSetDownloadUrlOutput | `load` | `GET /v2/gen-ai/scenario_sets/{scenario_set_uuid}/download_url` | Required |
| ApiGetScenarioSetOutput | `create` | `POST /v2/gen-ai/scenario_sets/{scenario_set_uuid}/duplicate` | Required |
| ApiGetScenarioSetOutput | `create` | `POST /v2/gen-ai/scenario_sets` | Required |
| ApiGetScenarioSetOutput | `list` | `GET /v2/gen-ai/scenario_sets` | Required |
| ApiGetScenarioSetOutput | `load` | `GET /v2/gen-ai/scenario_sets/{scenario_set_uuid}` | Required |
| ApiGetScheduledIndexingOutput | `load` | `GET /v2/gen-ai/scheduled-indexing/knowledge-base/{knowledge_base_uuid}` | Required |
| ApiGetSimulationJourneyTrajectoryUrlOutput | `load` | `GET /v2/gen-ai/simulation_runs/{run_uuid}/journeys/{journey_uuid}/trajectory_url` | Required |
| ApiGetSimulationRunOutput | `load` | `GET /v2/gen-ai/simulation_runs/{run_uuid}` | Required |
| ApiGetSimulationRunOutput | `update` | `PATCH /v2/gen-ai/simulation_runs/{run_uuid}/cancel` | Required |
| ApiGetWorkspaceOutput | `create` | `POST /v2/gen-ai/workspaces` | Required |
| ApiGetWorkspaceOutput | `list` | `GET /v2/gen-ai/workspaces` | Required |
| ApiGetWorkspaceOutput | `load` | `GET /v2/gen-ai/workspaces/{workspace_uuid}` | Required |
| ApiImportCustomModelOutputPublic | `create` | `POST /v2/gen-ai/custom_models/import` | Required |
| ApiIndexedDataSource | `list` | `GET /v2/gen-ai/indexing_jobs/{indexing_job_uuid}/data_sources` | Required |
| ApiLinkAgentFunctionOutput | `create` | `POST /v2/gen-ai/agents/{agent_uuid}/functions` | Required |
| ApiLinkAgentGuardrailOutput | `create` | `POST /v2/gen-ai/agents/{agent_uuid}/guardrails` | Required |
| ApiLinkAgentOutput | `create` | `POST /v2/gen-ai/agents/{parent_agent_uuid}/child_agents/{child_agent_uuid}` | Required |
| ApiLinkKnowledgeBaseOutput | `create` | `POST /v2/gen-ai/agents/{agent_uuid}/knowledge_bases/{knowledge_base_uuid}` | Required |
| ApiLinkKnowledgeBaseOutput | `create` | `POST /v2/gen-ai/agents/{agent_uuid}/knowledge_bases` | Required |
| ApiListAgentApiKeysOutput | `list` | `GET /v2/gen-ai/agents/{agent_uuid}/api_keys` | Required |
| ApiListAgentsByAnthropicKeyOutput | `list` | `GET /v2/gen-ai/anthropic/keys/{uuid}/agents` | Required |
| ApiListAgentsByOpenAiKeyOutput | `list` | `GET /v2/gen-ai/openai/keys/{uuid}/agents` | Required |
| ApiListAgentsByWorkspaceOutput | `list` | `GET /v2/gen-ai/workspaces/{workspace_uuid}/agents` | Required |
| ApiListEvaluationMetricsOutput | `list` | `GET /v2/gen-ai/evaluation_metrics` | Required |
| ApiListEvaluationRunsByTestCaseOutput | `list` | `GET /v2/gen-ai/evaluation_test_cases/{evaluation_test_case_uuid}/evaluation_runs` | Required |
| ApiListEvaluationTestCasesByWorkspaceOutput | `list` | `GET /v2/gen-ai/workspaces/{workspace_uuid}/evaluation_test_cases` | Required |
| ApiListKnowledgeBaseDataSourcesOutput | `list` | `GET /v2/gen-ai/knowledge_bases/{knowledge_base_uuid}/data_sources` | Required |
| ApiListKnowledgeBaseIndexingJobsOutput | `list` | `GET /v2/gen-ai/knowledge_bases/{knowledge_base_uuid}/indexing_jobs` | Required |
| ApiListModelEvaluationMetricsOutput | `list` | `GET /v2/gen-ai/model_evaluation_metrics` | Required |
| ApiListScenarioLibraryOutput | `list` | `GET /v2/gen-ai/scenario_library` | Required |
| ApiListScenariosOutput | `list` | `GET /v2/gen-ai/scenario_library/{library_scenario_uuid}/scenarios` | Required |
| ApiListScenariosOutput | `list` | `GET /v2/gen-ai/scenario_sets/{scenario_set_uuid}/scenarios` | Required |
| ApiListSimulationJourneysOutput | `list` | `GET /v2/gen-ai/simulation_runs/{run_uuid}/journeys` | Required |
| ApiModelCatalogCard | `list` | `GET /v2/gen-ai/models/catalog` | Required |
| ApiModelCatalogCard | `load` | `GET /v2/gen-ai/models/catalog/{id}` | Required |
| ApiModelEvaluationPreset | `list` | `GET /v2/gen-ai/model_evaluation_presets` | Required |
| ApiModelEvaluationPreset | `load` | `GET /v2/gen-ai/model_evaluation_presets/{eval_preset_uuid}` | Required |
| ApiModelPublic | `list` | `GET /v2/gen-ai/models` | Required |
| ApiModelRouterPreset | `list` | `GET /v2/gen-ai/models/routers/presets` | Required |
| ApiModelRouterTaskPreset | `list` | `GET /v2/gen-ai/models/routers/tasks/presets` | Required |
| ApiMoveAgentsToWorkspaceOutput | `update` | `PUT /v2/gen-ai/workspaces/{workspace_uuid}/agents` | Required |
| ApiPrompt | `load` | `GET /v2/gen-ai/evaluation_runs/{evaluation_run_uuid}/results/{prompt_id}` | Required |
| ApiRollbackToAgentVersionOutput | `update` | `PUT /v2/gen-ai/agents/{uuid}/versions` | Required |
| ApiSimulationJourney | `load` | `GET /v2/gen-ai/simulation_runs/{run_uuid}/journeys/{journey_uuid}` | Required |
| ApiSimulationTrajectory | `load` | `GET /v2/gen-ai/simulation_runs/{run_uuid}/journeys/{journey_uuid}/trajectory` | Required |
| ApiUnlinkAgentFunctionOutput | `remove` | `DELETE /v2/gen-ai/agents/{agent_uuid}/functions/{function_uuid}` | Required |
| ApiUnlinkAgentGuardrailOutput | `remove` | `DELETE /v2/gen-ai/agents/{agent_uuid}/guardrails/{guardrail_uuid}` | Required |
| ApiUnlinkAgentOutput | `remove` | `DELETE /v2/gen-ai/agents/{parent_agent_uuid}/child_agents/{child_agent_uuid}` | Required |
| ApiUnlinkKnowledgeBaseOutput | `remove` | `DELETE /v2/gen-ai/agents/{agent_uuid}/knowledge_bases/{knowledge_base_uuid}` | Required |
| ApiUpdateAgentApiKeyOutput | `update` | `PUT /v2/gen-ai/agents/{agent_uuid}/api_keys/{api_key_uuid}` | Required |
| ApiUpdateAgentFunctionOutput | `update` | `PUT /v2/gen-ai/agents/{agent_uuid}/functions/{function_uuid}` | Required |
| ApiUpdateAgentOutput | `update` | `PUT /v2/gen-ai/agents/{uuid}` | Required |
| ApiUpdateAnthropicApiKeyOutput | `update` | `PUT /v2/gen-ai/anthropic/keys/{api_key_uuid}` | Required |
| ApiUpdateCustomEvaluationMetricOutput | `create` | `POST /v2/gen-ai/custom_evaluation_metrics` | Required |
| ApiUpdateCustomEvaluationMetricOutput | `update` | `PUT /v2/gen-ai/custom_evaluation_metrics/{metric_uuid}` | Required |
| ApiUpdateEvaluationTestCaseOutput | `update` | `PUT /v2/gen-ai/evaluation_test_cases/{test_case_uuid}` | Required |
| ApiUpdateKnowledgeBaseDataSourceOutput | `update` | `PUT /v2/gen-ai/knowledge_bases/{knowledge_base_uuid}/data_sources/{data_source_uuid}` | Required |
| ApiUpdateKnowledgeBaseOutput | `create` | `POST /v2/gen-ai/knowledge_bases` | Required |
| ApiUpdateKnowledgeBaseOutput | `list` | `GET /v2/gen-ai/knowledge_bases` | Required |
| ApiUpdateKnowledgeBaseOutput | `update` | `PUT /v2/gen-ai/knowledge_bases/{uuid}` | Required |
| ApiUpdateLinkedAgentOutput | `update` | `PUT /v2/gen-ai/agents/{parent_agent_uuid}/child_agents/{child_agent_uuid}` | Required |
| ApiUpdateModelApiKeyOutput | `update` | `PUT /v2/gen-ai/models/api_keys/{api_key_uuid}` | Required |
| ApiUpdateModelEvaluationRunOutput | `create` | `POST /v2/gen-ai/model_evaluation_runs` | Required |
| ApiUpdateModelEvaluationRunOutput | `list` | `GET /v2/gen-ai/model_evaluation_runs` | Required |
| ApiUpdateModelEvaluationRunOutput | `update` | `PATCH /v2/gen-ai/model_evaluation_runs/{eval_run_uuid}` | Required |
| ApiUpdateModelRouterOutput | `update` | `PUT /v2/gen-ai/models/routers/{uuid}` | Required |
| ApiUpdateOpenAiapiKeyOutput | `update` | `PUT /v2/gen-ai/openai/keys/{api_key_uuid}` | Required |
| ApiUpdateScenarioSetOutput | `update` | `PUT /v2/gen-ai/scenario_sets/{scenario_set_uuid}` | Required |
| ApiUpdateSimulationRunOutput | `create` | `POST /v2/gen-ai/simulation_runs` | Required |
| ApiUpdateSimulationRunOutput | `list` | `GET /v2/gen-ai/simulation_runs` | Required |
| ApiUpdateSimulationRunOutput | `update` | `PUT /v2/gen-ai/simulation_runs/{run_uuid}` | Required |
| ApiUpdateWorkspaceOutput | `update` | `PUT /v2/gen-ai/workspaces/{workspace_uuid}` | Required |
| App | `create` | `POST /v2/apps/{app_id}/events/{event_id}/cancel` | Required |
| App | `create` | `POST /v2/apps/{app_id}/rollback/commit` | Required |
| App | `create` | `POST /v2/apps/{app_id}/rollback/validate` | Required |
| App | `create` | `POST /v2/apps` | Required |
| App | `list` | `GET /v2/apps` | Required |
| App | `load` | `GET /v2/apps/{app_id}/events/{event_id}` | Required |
| App | `load` | `GET /v2/apps/{id}` | Required |
| App | `remove` | `DELETE /v2/apps/{id}` | Required |
| App | `update` | `PUT /v2/apps/{id}` | Required |
| AppAlert | `create` | `POST /v2/apps/{app_id}/alerts/{alert_id}/destinations` | Required |
| AppAlert | `list` | `GET /v2/apps/{app_id}/alerts` | Required |
| AppEvent | `list` | `GET /v2/apps/{app_id}/events` | Required |
| AppHealth | `load` | `GET /v2/apps/{app_id}/health` | Required |
| AppInstance | `list` | `GET /v2/apps/{app_id}/instances` | Required |
| AppJobInvocation | `create` | `POST /v2/apps/{app_id}/job-invocations/{job_invocation_id}/cancel` | Required |
| AppJobInvocation | `list` | `GET /v2/apps/{app_id}/job-invocations` | Required |
| AppJobInvocation | `load` | `GET /v2/apps/{app_id}/job-invocations/{job_invocation_id}` | Required |
| AppMetricsBandwidthUsage | `create` | `POST /v2/apps/metrics/bandwidth_daily` | Required |
| AppMetricsBandwidthUsage | `list` | `GET /v2/apps/{app_id}/metrics/bandwidth_daily` | Required |
| AppPropose | `create` | `POST /v2/apps/propose` | Required |
| AppsDeployment | `create` | `POST /v2/apps/{app_id}/deployments/{deployment_id}/cancel` | Required |
| AppsDeployment | `create` | `POST /v2/apps/{app_id}/deployments` | Required |
| AppsDeployment | `create` | `POST /v2/apps/{app_id}/restart` | Required |
| AppsDeployment | `create` | `POST /v2/apps/{app_id}/rollback` | Required |
| AppsDeployment | `create` | `POST /v2/apps/{app_id}/rollback/revert` | Required |
| AppsDeployment | `list` | `GET /v2/apps/{app_id}/deployments` | Required |
| AppsDeployment | `load` | `GET /v2/apps/{app_id}/deployments/{deployment_id}` | Required |
| AppsGetExec | `load` | `GET /v2/apps/{app_id}/deployments/{deployment_id}/components/{component_name}/exec` | Required |
| AppsGetExec | `load` | `GET /v2/apps/{app_id}/components/{component_name}/exec` | Required |
| AppsGetLog | `list` | `GET /v2/apps/{app_id}/deployments/{deployment_id}/components/{component_name}/logs` | Required |
| AppsGetLog | `list` | `GET /v2/apps/{app_id}/jobs/{job_name}/invocations/{job_invocation_id}/logs` | Required |
| AppsGetLog | `list` | `GET /v2/apps/{app_id}/components/{component_name}/logs` | Required |
| AppsGetLog | `list` | `GET /v2/apps/{app_id}/deployments/{deployment_id}/logs` | Required |
| AppsGetLog | `list` | `GET /v2/apps/{app_id}/events/{event_id}/logs` | Required |
| AppsGetLog | `list` | `GET /v2/apps/{app_id}/logs` | Required |
| AppsInstanceSize | `list` | `GET /v2/apps/tiers/instance_sizes` | Required |
| AppsInstanceSize | `load` | `GET /v2/apps/tiers/instance_sizes/{slug}` | Required |
| AppsRegion | `list` | `GET /v2/apps/regions` | Required |
| AssociatedKubernetesResource | `list` | `GET /v2/kubernetes/clusters/{cluster_id}/destroy_with_associated_resources` | Required |
| AssociatedResourceStatus | `load` | `GET /v2/droplets/{droplet_id}/destroy_with_associated_resources/status` | Required |
| AsyncInvoke | `create` | `POST /v1/async-invoke` | Required |
| Balance | `load` | `GET /v2/customers/my/balance` | Required |
| Batch | `create` | `POST /v1/batches/{batch_id}/cancel` | Required |
| Batch | `create` | `POST /v1/batches` | Required |
| Batch | `list` | `GET /v1/batches` | Required |
| Batch | `load` | `GET /v1/batches/{batch_id}` | Required |
| BatchFileCreate | `create` | `POST /v1/batches/files` | Required |
| BatchInference | `update` | `PUT /<upload_url>` | Not required |
| BatchResult | `load` | `GET /v1/batches/{batch_id}/results` | Required |
| Billing | `list` | `GET /v2/customers/my/billing_history` | Required |
| Billing | `list` | `GET /v2/customers/my/invoices` | Required |
| Billing | `load` | `GET /v2/billing/{account_urn}/insights/{start_date}/{end_date}` | Required |
| Billing | `load` | `GET /v2/customers/my/invoices/{invoice_uuid}` | Required |
| Billing | `load` | `GET /v2/customers/my/invoices/{invoice_uuid}/csv` | Required |
| Billing | `load` | `GET /v2/customers/my/invoices/{invoice_uuid}/pdf` | Required |
| BlockStorage | `create` | `POST /v2/volumes/{volume_id}/snapshots` | Required |
| BlockStorage | `create` | `POST /v2/volumes` | Required |
| BlockStorage | `list` | `GET /v2/volumes/{volume_id}/snapshots` | Required |
| BlockStorage | `list` | `GET /v2/volumes` | Required |
| BlockStorage | `load` | `GET /v2/volumes/snapshots/{snapshot_id}` | Required |
| BlockStorage | `load` | `GET /v2/volumes/{volume_id}` | Required |
| BlockStorage | `remove` | `DELETE /v2/volumes/snapshots/{snapshot_id}` | Required |
| BlockStorage | `remove` | `DELETE /v2/volumes/{volume_id}` | Required |
| BlockStorage | `remove` | `DELETE /v2/volumes` | Required |
| BlockStorageAction | `create` | `POST /v2/volumes/{volume_id}/actions` | Required |
| BlockStorageAction | `create` | `POST /v2/volumes/actions` | Required |
| BlockStorageAction | `list` | `GET /v2/volumes/{volume_id}/actions` | Required |
| BlockStorageAction | `load` | `GET /v2/volumes/{volume_id}/actions/{action_id}` | Required |
| ByoipPrefix | `create` | `POST /v2/byoip_prefixes` | Required |
| ByoipPrefix | `list` | `GET /v2/byoip_prefixes/{byoip_prefix_uuid}/ips` | Required |
| ByoipPrefix | `list` | `GET /v2/byoip_prefixes` | Required |
| ByoipPrefix | `load` | `GET /v2/byoip_prefixes/{byoip_prefix_uuid}` | Required |
| ByoipPrefix | `remove` | `DELETE /v2/byoip_prefixes/{byoip_prefix_uuid}` | Required |
| ByoipPrefix | `update` | `PATCH /v2/byoip_prefixes/{byoip_prefix_uuid}` | Required |
| CdnEndpoint | `create` | `POST /v2/cdn/endpoints` | Required |
| CdnEndpoint | `list` | `GET /v2/cdn/endpoints` | Required |
| CdnEndpoint | `load` | `GET /v2/cdn/endpoints/{cdn_id}` | Required |
| CdnEndpoint | `remove` | `DELETE /v2/cdn/endpoints/{cdn_id}/cache` | Required |
| CdnEndpoint | `remove` | `DELETE /v2/cdn/endpoints/{cdn_id}` | Required |
| CdnEndpoint | `update` | `PUT /v2/cdn/endpoints/{cdn_id}` | Required |
| Certificate | `create` | `POST /v2/certificates` | Required |
| Certificate | `list` | `GET /v2/certificates` | Required |
| Certificate | `load` | `GET /v2/certificates/{certificate_id}` | Required |
| Certificate | `remove` | `DELETE /v2/certificates/{certificate_id}` | Required |
| ChatCompletion | `create` | `POST /api/v1/chat/completions` | Required |
| ChatCompletion | `create` | `POST /v1/chat/completions` | Required |
| Clusterlint | `list` | `GET /v2/kubernetes/clusters/{cluster_id}/clusterlint` | Required |
| Connection | `create` | `POST /v2/action-gateway/connections` | Required |
| Connection | `list` | `GET /v2/action-gateway/connections` | Required |
| Connection | `load` | `GET /v2/action-gateway/connections/{id}` | Required |
| Connection | `remove` | `DELETE /v2/action-gateway/connections/{id}` | Required |
| ConnectionPool | `list` | `GET /v2/databases/{database_cluster_uuid}/pools` | Required |
| ContainerRegistry | `create` | `POST /v2/registries/{registry_name}/garbage-collection` | Required |
| ContainerRegistry | `create` | `POST /v2/registry/{registry_name}/garbage-collection` | Required |
| ContainerRegistry | `create` | `POST /v2/registries` | Required |
| ContainerRegistry | `create` | `POST /v2/registries/subscription` | Required |
| ContainerRegistry | `create` | `POST /v2/registries/validate-name` | Required |
| ContainerRegistry | `create` | `POST /v2/registry` | Required |
| ContainerRegistry | `create` | `POST /v2/registry/subscription` | Required |
| ContainerRegistry | `create` | `POST /v2/registry/validate-name` | Required |
| ContainerRegistry | `list` | `GET /v2/registries/{registry_name}/repositories/{repository_name}/digests` | Required |
| ContainerRegistry | `list` | `GET /v2/registries/{registry_name}/repositories/{repository_name}/tags` | Required |
| ContainerRegistry | `list` | `GET /v2/registry/{registry_name}/repositories/{repository_name}/digests` | Required |
| ContainerRegistry | `list` | `GET /v2/registry/{registry_name}/repositories/{repository_name}/tags` | Required |
| ContainerRegistry | `list` | `GET /v2/registries/{registry_name}/garbage-collections` | Required |
| ContainerRegistry | `list` | `GET /v2/registries/{registry_name}/repositoriesV2` | Required |
| ContainerRegistry | `list` | `GET /v2/registry/{registry_name}/garbage-collections` | Required |
| ContainerRegistry | `list` | `GET /v2/registry/{registry_name}/repositories` | Required |
| ContainerRegistry | `list` | `GET /v2/registry/{registry_name}/repositoriesV2` | Required |
| ContainerRegistry | `list` | `GET /v2/registries` | Required |
| ContainerRegistry | `load` | `GET /v2/registries/{registry_name}` | Required |
| ContainerRegistry | `load` | `GET /v2/registries/{registry_name}/garbage-collection` | Required |
| ContainerRegistry | `load` | `GET /v2/registry/{registry_name}/garbage-collection` | Required |
| ContainerRegistry | `load` | `GET /v2/registries/options` | Required |
| ContainerRegistry | `load` | `GET /v2/registries/subscription` | Required |
| ContainerRegistry | `load` | `GET /v2/registry` | Required |
| ContainerRegistry | `load` | `GET /v2/registry/options` | Required |
| ContainerRegistry | `load` | `GET /v2/registry/subscription` | Required |
| ContainerRegistry | `remove` | `DELETE /v2/registries/{registry_name}/repositories/{repository_name}/digests/{manifest_digest}` | Required |
| ContainerRegistry | `remove` | `DELETE /v2/registry/{registry_name}/repositories/{repository_name}/digests/{manifest_digest}` | Required |
| ContainerRegistry | `remove` | `DELETE /v2/registries/{registry_name}/repositories/{repository_name}/tags/{repository_tag}` | Required |
| ContainerRegistry | `remove` | `DELETE /v2/registry/{registry_name}/repositories/{repository_name}/tags/{repository_tag}` | Required |
| ContainerRegistry | `remove` | `DELETE /v2/registries/{registry_name}/repositories/{repository_name}` | Required |
| ContainerRegistry | `remove` | `DELETE /v2/registries/{registry_name}` | Required |
| ContainerRegistry | `remove` | `DELETE /v2/registry` | Required |
| ContainerRegistry | `update` | `PUT /v2/registries/{registry_name}/garbage-collection/{garbage_collection_uuid}` | Required |
| ContainerRegistry | `update` | `PUT /v2/registry/{registry_name}/garbage-collection/{garbage_collection_uuid}` | Required |
| CreateResponse | `create` | `POST /v1/responses` | Required |
| Credential | `load` | `GET /v2/kubernetes/clusters/{cluster_id}/credentials` | Required |
| Database | `create` | `POST /v2/databases/{database_cluster_uuid}/users/{username}/reset_auth` | Required |
| Database | `create` | `POST /v2/databases/{database_cluster_uuid}/dbs` | Required |
| Database | `create` | `POST /v2/databases/{database_cluster_uuid}/logsink` | Required |
| Database | `create` | `POST /v2/databases/{database_cluster_uuid}/pools` | Required |
| Database | `create` | `POST /v2/databases/{database_cluster_uuid}/replicas` | Required |
| Database | `create` | `POST /v2/databases/{database_cluster_uuid}/schema-registry` | Required |
| Database | `create` | `POST /v2/databases/{database_cluster_uuid}/topics` | Required |
| Database | `create` | `POST /v2/databases/{database_cluster_uuid}/users` | Required |
| Database | `create` | `POST /v2/databases` | Required |
| Database | `list` | `GET /v2/databases/{database_cluster_uuid}/backups` | Required |
| Database | `list` | `GET /v2/databases/{database_cluster_uuid}/dbs` | Required |
| Database | `list` | `GET /v2/databases/{database_cluster_uuid}/events` | Required |
| Database | `list` | `GET /v2/databases/{database_cluster_uuid}/firewall` | Required |
| Database | `list` | `GET /v2/databases/{database_cluster_uuid}/indexes` | Required |
| Database | `list` | `GET /v2/databases/{database_cluster_uuid}/logsink` | Required |
| Database | `list` | `GET /v2/databases/{database_cluster_uuid}/replicas` | Required |
| Database | `list` | `GET /v2/databases/{database_cluster_uuid}/schema-registry` | Required |
| Database | `list` | `GET /v2/databases/{database_cluster_uuid}/topics` | Required |
| Database | `list` | `GET /v2/databases/{database_cluster_uuid}/users` | Required |
| Database | `list` | `GET /v2/databases` | Required |
| Database | `load` | `GET /v2/databases/{database_cluster_uuid}/schema-registry/{subject_name}/versions/{version}` | Required |
| Database | `load` | `GET /v2/databases/{database_cluster_uuid}/dbs/{database_name}` | Required |
| Database | `load` | `GET /v2/databases/{database_cluster_uuid}/pools/{pool_name}` | Required |
| Database | `load` | `GET /v2/databases/{database_cluster_uuid}/replicas/{replica_name}` | Required |
| Database | `load` | `GET /v2/databases/{database_cluster_uuid}/schema-registry/config/{subject_name}` | Required |
| Database | `load` | `GET /v2/databases/{database_cluster_uuid}/schema-registry/{subject_name}` | Required |
| Database | `load` | `GET /v2/databases/{database_cluster_uuid}/topics/{topic_name}` | Required |
| Database | `load` | `GET /v2/databases/{database_cluster_uuid}/users/{username}` | Required |
| Database | `load` | `GET /v2/databases/{database_cluster_uuid}` | Required |
| Database | `load` | `GET /v2/databases/{database_cluster_uuid}/autoscale` | Required |
| Database | `load` | `GET /v2/databases/{database_cluster_uuid}/ca` | Required |
| Database | `load` | `GET /v2/databases/{database_cluster_uuid}/config` | Required |
| Database | `load` | `GET /v2/databases/{database_cluster_uuid}/do_settings` | Required |
| Database | `load` | `GET /v2/databases/{database_cluster_uuid}/eviction_policy` | Required |
| Database | `load` | `GET /v2/databases/{database_cluster_uuid}/schema-registry/config` | Required |
| Database | `load` | `GET /v2/databases/metrics/credentials` | Required |
| Database | `patch` | `PATCH /v2/databases/{database_cluster_uuid}/config` | Required |
| Database | `remove` | `DELETE /v2/databases/{database_cluster_uuid}/dbs/{database_name}` | Required |
| Database | `remove` | `DELETE /v2/databases/{database_cluster_uuid}/indexes/{index_name}` | Required |
| Database | `remove` | `DELETE /v2/databases/{database_cluster_uuid}/logsink/{logsink_id}` | Required |
| Database | `remove` | `DELETE /v2/databases/{database_cluster_uuid}/online-migration/{migration_id}` | Required |
| Database | `remove` | `DELETE /v2/databases/{database_cluster_uuid}/pools/{pool_name}` | Required |
| Database | `remove` | `DELETE /v2/databases/{database_cluster_uuid}/replicas/{replica_name}` | Required |
| Database | `remove` | `DELETE /v2/databases/{database_cluster_uuid}/schema-registry/{subject_name}` | Required |
| Database | `remove` | `DELETE /v2/databases/{database_cluster_uuid}/topics/{topic_name}` | Required |
| Database | `remove` | `DELETE /v2/databases/{database_cluster_uuid}/users/{username}` | Required |
| Database | `remove` | `DELETE /v2/databases/{database_cluster_uuid}` | Required |
| Database | `update` | `PUT /v2/databases/{database_cluster_uuid}/logsink/{logsink_id}` | Required |
| Database | `update` | `PUT /v2/databases/{database_cluster_uuid}/pools/{pool_name}` | Required |
| Database | `update` | `PUT /v2/databases/{database_cluster_uuid}/replicas/{replica_name}/promote` | Required |
| Database | `update` | `PUT /v2/databases/{database_cluster_uuid}/schema-registry/config/{subject_name}` | Required |
| Database | `update` | `PUT /v2/databases/{database_cluster_uuid}/topics/{topic_name}` | Required |
| Database | `update` | `PUT /v2/databases/{database_cluster_uuid}/users/{username}` | Required |
| Database | `update` | `PUT /v2/databases/{database_cluster_uuid}/autoscale` | Required |
| Database | `update` | `PUT /v2/databases/{database_cluster_uuid}/do_settings` | Required |
| Database | `update` | `PUT /v2/databases/{database_cluster_uuid}/eviction_policy` | Required |
| Database | `update` | `PUT /v2/databases/{database_cluster_uuid}/firewall` | Required |
| Database | `update` | `PUT /v2/databases/{database_cluster_uuid}/install_update` | Required |
| Database | `update` | `PUT /v2/databases/{database_cluster_uuid}/maintenance` | Required |
| Database | `update` | `PUT /v2/databases/{database_cluster_uuid}/migrate` | Required |
| Database | `update` | `PUT /v2/databases/{database_cluster_uuid}/resize` | Required |
| Database | `update` | `PUT /v2/databases/{database_cluster_uuid}/schema-registry/config` | Required |
| Database | `update` | `PUT /v2/databases/{database_cluster_uuid}/sql_mode` | Required |
| Database | `update` | `PUT /v2/databases/{database_cluster_uuid}/upgrade` | Required |
| Database | `update` | `PUT /v2/databases/metrics/credentials` | Required |
| DedicatedInference | `create` | `POST /v2/dedicated-inferences/{dedicated_inference_id}/tokens` | Required |
| DedicatedInference | `create` | `POST /v2/dedicated-inferences` | Required |
| DedicatedInference | `list` | `GET /v2/dedicated-inferences/{dedicated_inference_id}/accelerators` | Required |
| DedicatedInference | `list` | `GET /v2/dedicated-inferences/{dedicated_inference_id}/tokens` | Required |
| DedicatedInference | `list` | `GET /v2/dedicated-inferences` | Required |
| DedicatedInference | `load` | `GET /v2/dedicated-inferences/{dedicated_inference_id}` | Required |
| DedicatedInference | `load` | `GET /v2/dedicated-inferences/{dedicated_inference_id}/ca` | Required |
| DedicatedInference | `remove` | `DELETE /v2/dedicated-inferences/{dedicated_inference_id}/tokens/{token_id}` | Required |
| DedicatedInference | `remove` | `DELETE /v2/dedicated-inferences/{dedicated_inference_id}` | Required |
| DedicatedInference | `update` | `PATCH /v2/dedicated-inferences/{dedicated_inference_id}` | Required |
| DedicatedInferenceAccelerator | `load` | `GET /v2/dedicated-inferences/{dedicated_inference_id}/accelerators/{accelerator_id}` | Required |
| DedicatedInferenceGpuModelConfig | `list` | `GET /v2/dedicated-inferences/gpu-model-config` | Required |
| DedicatedInferenceSize | `list` | `GET /v2/dedicated-inferences/sizes` | Required |
| DockerCredential | `load` | `GET /v2/registries/{registry_name}/docker-credentials` | Required |
| DockerCredential | `load` | `GET /v2/registry/docker-credentials` | Required |
| Domain | `create` | `POST /v2/domains` | Required |
| Domain | `list` | `GET /v2/domains` | Required |
| Domain | `load` | `GET /v2/domains/{domain_name}` | Required |
| Domain | `remove` | `DELETE /v2/domains/{domain_name}` | Required |
| DomainRecord | `create` | `POST /v2/domains/{domain_name}/records` | Required |
| DomainRecord | `list` | `GET /v2/domains/{domain_name}/records` | Required |
| DomainRecord | `load` | `GET /v2/domains/{domain_name}/records/{domain_record_id}` | Required |
| DomainRecord | `patch` | `PATCH /v2/domains/{domain_name}/records/{domain_record_id}` | Required |
| DomainRecord | `remove` | `DELETE /v2/domains/{domain_name}/records/{domain_record_id}` | Required |
| DomainRecord | `update` | `PUT /v2/domains/{domain_name}/records/{domain_record_id}` | Required |
| Droplet | `create` | `POST /v2/droplets/{droplet_id}/destroy_with_associated_resources/retry` | Required |
| Droplet | `create` | `POST /v2/droplets` | Required |
| Droplet | `list` | `GET /v2/droplets/{droplet_id}/backups` | Required |
| Droplet | `list` | `GET /v2/droplets/{droplet_id}/destroy_with_associated_resources` | Required |
| Droplet | `list` | `GET /v2/droplets/{droplet_id}/firewalls` | Required |
| Droplet | `list` | `GET /v2/droplets/{droplet_id}/kernels` | Required |
| Droplet | `list` | `GET /v2/droplets/{droplet_id}/neighbors` | Required |
| Droplet | `list` | `GET /v2/droplets/{droplet_id}/snapshots` | Required |
| Droplet | `list` | `GET /v2/droplets` | Required |
| Droplet | `list` | `GET /v2/droplets/backups/supported_policies` | Required |
| Droplet | `load` | `GET /v2/droplets/{droplet_id}` | Required |
| Droplet | `load` | `GET /v2/droplets/{droplet_id}/backups/policy` | Required |
| Droplet | `load` | `GET /v2/droplets/backups/policies` | Required |
| Droplet | `remove` | `DELETE /v2/droplets/{droplet_id}/destroy_with_associated_resources/dangerous` | Required |
| Droplet | `remove` | `DELETE /v2/droplets/{droplet_id}` | Required |
| Droplet | `remove` | `DELETE /v2/droplets/{droplet_id}/destroy_with_associated_resources/selective` | Required |
| Droplet | `remove` | `DELETE /v2/droplets` | Required |
| DropletAction | `create` | `POST /v2/droplets/{droplet_id}/actions` | Required |
| DropletAction | `create` | `POST /v2/droplets/actions` | Required |
| DropletAction | `list` | `GET /v2/droplets/{droplet_id}/actions` | Required |
| DropletAction | `load` | `GET /v2/droplets/{droplet_id}/actions/{action_id}` | Required |
| DropletAutoscalePool | `create` | `POST /v2/droplets/autoscale` | Required |
| DropletAutoscalePool | `list` | `GET /v2/droplets/autoscale/{autoscale_pool_id}/history` | Required |
| DropletAutoscalePool | `list` | `GET /v2/droplets/autoscale/{autoscale_pool_id}/members` | Required |
| DropletAutoscalePool | `list` | `GET /v2/droplets/autoscale` | Required |
| DropletAutoscalePool | `load` | `GET /v2/droplets/autoscale/{autoscale_pool_id}` | Required |
| DropletAutoscalePool | `remove` | `DELETE /v2/droplets/autoscale/{autoscale_pool_id}/dangerous` | Required |
| DropletAutoscalePool | `remove` | `DELETE /v2/droplets/autoscale/{autoscale_pool_id}` | Required |
| DropletAutoscalePool | `update` | `PUT /v2/droplets/autoscale/{autoscale_pool_id}` | Required |
| Embedding | `create` | `POST /v1/embeddings` | Required |
| Empty | `create` | `POST /v2/action-gateway/actors/{actor_id}/limits:clear` | Required |
| Empty | `create` | `POST /v2/action-gateway/actors/{actor_id}/limits:set` | Required |
| Empty | `create` | `POST /v2/action-gateway/sessions` | Required |
| Empty | `list` | `GET /v2/action-gateway/sessions` | Required |
| Empty | `remove` | `DELETE /v2/action-gateway/sessions/{session_urn}` | Required |
| Firewall | `create` | `POST /v2/firewalls/{firewall_id}/droplets` | Required |
| Firewall | `create` | `POST /v2/firewalls/{firewall_id}/rules` | Required |
| Firewall | `create` | `POST /v2/firewalls/{firewall_id}/tags` | Required |
| Firewall | `create` | `POST /v2/firewalls` | Required |
| Firewall | `list` | `GET /v2/firewalls` | Required |
| Firewall | `load` | `GET /v2/firewalls/{firewall_id}` | Required |
| Firewall | `remove` | `DELETE /v2/firewalls/{firewall_id}` | Required |
| Firewall | `remove` | `DELETE /v2/firewalls/{firewall_id}/droplets` | Required |
| Firewall | `remove` | `DELETE /v2/firewalls/{firewall_id}/rules` | Required |
| Firewall | `remove` | `DELETE /v2/firewalls/{firewall_id}/tags` | Required |
| Firewall | `update` | `PUT /v2/firewalls/{firewall_id}` | Required |
| FloatingIp | `create` | `POST /v2/floating_ips` | Required |
| FloatingIp | `list` | `GET /v2/floating_ips` | Required |
| FloatingIp | `load` | `GET /v2/floating_ips/{floating_ip}` | Required |
| FloatingIp | `remove` | `DELETE /v2/floating_ips/{floating_ip}` | Required |
| FloatingIpAction | `create` | `POST /v2/floating_ips/{floating_ip}/actions` | Required |
| FloatingIpAction | `list` | `GET /v2/floating_ips/{floating_ip}/actions` | Required |
| FloatingIpAction | `load` | `GET /v2/floating_ips/{floating_ip}/actions/{action_id}` | Required |
| FunctionKey | `create` | `POST /v2/functions/namespaces/{namespace_id}/keys` | Required |
| FunctionKey | `list` | `GET /v2/functions/namespaces/{namespace_id}/keys` | Required |
| FunctionKey | `remove` | `DELETE /v2/functions/namespaces/{namespace_id}/keys/{key_id}` | Required |
| FunctionKey | `update` | `PUT /v2/functions/namespaces/{namespace_id}/keys/{key_id}` | Required |
| FunctionNamespace | `create` | `POST /v2/functions/namespaces` | Required |
| FunctionNamespace | `list` | `GET /v2/functions/namespaces` | Required |
| FunctionNamespace | `load` | `GET /v2/functions/namespaces/{namespace_id}` | Required |
| FunctionNamespace | `remove` | `DELETE /v2/functions/namespaces/{namespace_id}` | Required |
| FunctionTrigger | `create` | `POST /v2/functions/namespaces/{namespace_id}/triggers` | Required |
| FunctionTrigger | `list` | `GET /v2/functions/namespaces/{namespace_id}/triggers` | Required |
| FunctionTrigger | `load` | `GET /v2/functions/namespaces/{namespace_id}/triggers/{trigger_name}` | Required |
| FunctionTrigger | `remove` | `DELETE /v2/functions/namespaces/{namespace_id}/triggers/{trigger_name}` | Required |
| FunctionTrigger | `update` | `PUT /v2/functions/namespaces/{namespace_id}/triggers/{trigger_name}` | Required |
| GenaiapiRegion | `list` | `GET /v2/gen-ai/regions` | Required |
| Image | `create` | `POST /v2/images/{image_id}/account_transfer` | Required |
| Image | `create` | `POST /v2/images/{image_id}/account_transfer/accept` | Required |
| Image | `create` | `POST /v2/images/{image_id}/account_transfer/cancel` | Required |
| Image | `create` | `POST /v2/images/{image_id}/account_transfer/decline` | Required |
| Image | `create` | `POST /v1/images/generations` | Required |
| Image | `create` | `POST /v2/images` | Required |
| Image | `list` | `GET /v2/images` | Required |
| Image | `load` | `GET /v2/images/{image_id}` | Required |
| Image | `remove` | `DELETE /v2/images/{image_id}` | Required |
| Image | `update` | `PUT /v2/images/{image_id}` | Required |
| ImageAction | `list` | `GET /v2/images/{image_id}/actions` | Required |
| Insight | `create` | `POST /v2/insights/alert-rules` | Required |
| Insight | `create` | `POST /v2/insights/notification-channels` | Required |
| Insight | `list` | `GET /v2/insights/alert-instances` | Required |
| Insight | `list` | `GET /v2/insights/alert-rules` | Required |
| Insight | `list` | `GET /v2/insights/notification-channels` | Required |
| Insight | `load` | `GET /v2/insights/alert-instances/{id}` | Required |
| Insight | `load` | `GET /v2/insights/alert-rules/{id}` | Required |
| Insight | `load` | `GET /v2/insights/notification-channels/{id}` | Required |
| Insight | `remove` | `DELETE /v2/insights/alert-rules/{id}` | Required |
| Insight | `remove` | `DELETE /v2/insights/notification-channels/{id}` | Required |
| Insight | `update` | `PUT /v2/insights/alert-rules/{id}` | Required |
| Insight | `update` | `PUT /v2/insights/notification-channels/{id}` | Required |
| InvoiceSummary | `load` | `GET /v2/customers/my/invoices/{invoice_uuid}/summary` | Required |
| Kubernete | `create` | `POST /v2/kubernetes/clusters/{cluster_id}/node_pools/{node_pool_id}/recycle` | Required |
| Kubernete | `create` | `POST /v2/kubernetes/clusters/{cluster_id}/clusterlint` | Required |
| Kubernete | `create` | `POST /v2/kubernetes/clusters/{cluster_id}/node_pools` | Required |
| Kubernete | `create` | `POST /v2/kubernetes/clusters/{cluster_id}/upgrade` | Required |
| Kubernete | `create` | `POST /v2/kubernetes/clusters` | Required |
| Kubernete | `create` | `POST /v2/kubernetes/registries` | Required |
| Kubernete | `create` | `POST /v2/kubernetes/registry` | Required |
| Kubernete | `list` | `GET /v2/kubernetes/clusters/{cluster_id}/node_pools` | Required |
| Kubernete | `list` | `GET /v2/kubernetes/clusters/{cluster_id}/status_messages` | Required |
| Kubernete | `list` | `GET /v2/kubernetes/clusters/{cluster_id}/upgrades` | Required |
| Kubernete | `list` | `GET /v2/kubernetes/clusters` | Required |
| Kubernete | `load` | `GET /v2/kubernetes/clusters/{cluster_id}/node_pools/{node_pool_id}` | Required |
| Kubernete | `load` | `GET /v2/kubernetes/clusters/{cluster_id}` | Required |
| Kubernete | `load` | `GET /v2/kubernetes/clusters/{cluster_id}/kubeconfig` | Required |
| Kubernete | `remove` | `DELETE /v2/kubernetes/clusters/{cluster_id}/node_pools/{node_pool_id}/nodes/{node_id}` | Required |
| Kubernete | `remove` | `DELETE /v2/kubernetes/clusters/{cluster_id}/node_pools/{node_pool_id}` | Required |
| Kubernete | `remove` | `DELETE /v2/kubernetes/clusters/{cluster_id}` | Required |
| Kubernete | `remove` | `DELETE /v2/kubernetes/clusters/{cluster_id}/destroy_with_associated_resources/dangerous` | Required |
| Kubernete | `remove` | `DELETE /v2/kubernetes/clusters/{cluster_id}/destroy_with_associated_resources/selective` | Required |
| Kubernete | `remove` | `DELETE /v2/kubernetes/registries` | Required |
| Kubernete | `remove` | `DELETE /v2/kubernetes/registry` | Required |
| Kubernete | `update` | `PUT /v2/kubernetes/clusters/{cluster_id}/node_pools/{node_pool_id}` | Required |
| Kubernete | `update` | `PUT /v2/kubernetes/clusters/{cluster_id}` | Required |
| KubernetesOption | `load` | `GET /v2/kubernetes/options` | Required |
| ListMcpServerTool | `list` | `GET /v2/action-gateway/mcp-servers/{server_ref}/tools` | Required |
| ListMcpServerTool | `update` | `PUT /v2/action-gateway/mcp-servers/{server_ref}/tools` | Required |
| ListProvider | `list` | `GET /v2/action-gateway/tools/providers` | Required |
| ListProviderHealth | `list` | `GET /v2/action-gateway/tools/health/providers` | Required |
| ListTool | `list` | `GET /v2/action-gateway/tools` | Required |
| ListToolHealth | `list` | `GET /v2/action-gateway/tools/health` | Required |
| ListToolbeltProvider | `list` | `GET /v2/action-gateway/toolbelts/{name}/providers` | Required |
| ListToolkit | `list` | `GET /v2/action-gateway/tools/toolkits` | Required |
| LoadBalancer | `create` | `POST /v2/load_balancers/{lb_id}/droplets` | Required |
| LoadBalancer | `create` | `POST /v2/load_balancers/{lb_id}/forwarding_rules` | Required |
| LoadBalancer | `create` | `POST /v2/load_balancers` | Required |
| LoadBalancer | `list` | `GET /v2/load_balancers` | Required |
| LoadBalancer | `load` | `GET /v2/load_balancers/{lb_id}` | Required |
| LoadBalancer | `remove` | `DELETE /v2/load_balancers/{lb_id}` | Required |
| LoadBalancer | `remove` | `DELETE /v2/load_balancers/{lb_id}/cache` | Required |
| LoadBalancer | `remove` | `DELETE /v2/load_balancers/{lb_id}/droplets` | Required |
| LoadBalancer | `remove` | `DELETE /v2/load_balancers/{lb_id}/forwarding_rules` | Required |
| LoadBalancer | `update` | `PUT /v2/load_balancers/{lb_id}` | Required |
| LogsSearch | `create` | `POST /v2/insights/query/{region}/logs/search` | Required |
| Logsink | `load` | `GET /v2/databases/{database_cluster_uuid}/logsink/{logsink_id}` | Required |
| McpServer | `create` | `POST /v2/action-gateway/mcp-servers` | Required |
| McpServer | `list` | `GET /v2/action-gateway/mcp-servers` | Required |
| McpServer | `load` | `GET /v2/action-gateway/mcp-servers/{server_ref}` | Required |
| McpServer | `remove` | `DELETE /v2/action-gateway/mcp-servers/{server_ref}` | Required |
| McpServer | `update` | `PATCH /v2/action-gateway/mcp-servers/{server_ref}` | Required |
| Message | `create` | `POST /v1/messages` | Required |
| Metric | `load` | `GET /v2/monitoring/metrics/database/mysql/load` | Required |
| Metric | `load` | `GET /v2/monitoring/metrics/database/mysql/schema_latency` | Required |
| Metric | `load` | `GET /v2/monitoring/metrics/database/mysql/schema_throughput` | Required |
| Metric | `load` | `GET /v2/monitoring/metrics/droplet/bandwidth` | Required |
| Metric | `load` | `GET /v2/monitoring/metrics/database/mysql/cpu_usage` | Required |
| Metric | `load` | `GET /v2/monitoring/metrics/database/mysql/disk_usage` | Required |
| Metric | `load` | `GET /v2/monitoring/metrics/database/mysql/memory_usage` | Required |
| Metric | `load` | `GET /v2/monitoring/metrics/database/mysql/op_rates` | Required |
| Metric | `load` | `GET /v2/monitoring/metrics/apps/cpu_percentage` | Required |
| Metric | `load` | `GET /v2/monitoring/metrics/apps/memory_percentage` | Required |
| Metric | `load` | `GET /v2/monitoring/metrics/apps/restart_count` | Required |
| Metric | `load` | `GET /v2/monitoring/metrics/droplet_autoscale/current_cpu_utilization` | Required |
| Metric | `load` | `GET /v2/monitoring/metrics/droplet_autoscale/current_instances` | Required |
| Metric | `load` | `GET /v2/monitoring/metrics/droplet_autoscale/current_memory_utilization` | Required |
| Metric | `load` | `GET /v2/monitoring/metrics/droplet_autoscale/target_cpu_utilization` | Required |
| Metric | `load` | `GET /v2/monitoring/metrics/droplet_autoscale/target_instances` | Required |
| Metric | `load` | `GET /v2/monitoring/metrics/droplet_autoscale/target_memory_utilization` | Required |
| Metric | `load` | `GET /v2/monitoring/metrics/database/mysql/index_vs_sequential_reads` | Required |
| Metric | `load` | `GET /v2/monitoring/metrics/database/mysql/threads_active` | Required |
| Metric | `load` | `GET /v2/monitoring/metrics/database/mysql/threads_connected` | Required |
| Metric | `load` | `GET /v2/monitoring/metrics/database/mysql/threads_created_rate` | Required |
| Metric | `load` | `GET /v2/monitoring/metrics/droplet/cpu` | Required |
| Metric | `load` | `GET /v2/monitoring/metrics/droplet/filesystem_free` | Required |
| Metric | `load` | `GET /v2/monitoring/metrics/droplet/filesystem_size` | Required |
| Metric | `load` | `GET /v2/monitoring/metrics/droplet/load_1` | Required |
| Metric | `load` | `GET /v2/monitoring/metrics/droplet/load_15` | Required |
| Metric | `load` | `GET /v2/monitoring/metrics/droplet/load_5` | Required |
| Metric | `load` | `GET /v2/monitoring/metrics/droplet/memory_available` | Required |
| Metric | `load` | `GET /v2/monitoring/metrics/droplet/memory_cached` | Required |
| Metric | `load` | `GET /v2/monitoring/metrics/droplet/memory_free` | Required |
| Metric | `load` | `GET /v2/monitoring/metrics/droplet/memory_total` | Required |
| Metric | `load` | `GET /v2/monitoring/metrics/load_balancer/droplets_connections` | Required |
| Metric | `load` | `GET /v2/monitoring/metrics/load_balancer/droplets_downtime` | Required |
| Metric | `load` | `GET /v2/monitoring/metrics/load_balancer/droplets_health_checks` | Required |
| Metric | `load` | `GET /v2/monitoring/metrics/load_balancer/droplets_http_response_time_50p` | Required |
| Metric | `load` | `GET /v2/monitoring/metrics/load_balancer/droplets_http_response_time_95p` | Required |
| Metric | `load` | `GET /v2/monitoring/metrics/load_balancer/droplets_http_response_time_99p` | Required |
| Metric | `load` | `GET /v2/monitoring/metrics/load_balancer/droplets_http_response_time_avg` | Required |
| Metric | `load` | `GET /v2/monitoring/metrics/load_balancer/droplets_http_responses` | Required |
| Metric | `load` | `GET /v2/monitoring/metrics/load_balancer/droplets_http_session_duration_50p` | Required |
| Metric | `load` | `GET /v2/monitoring/metrics/load_balancer/droplets_http_session_duration_95p` | Required |
| Metric | `load` | `GET /v2/monitoring/metrics/load_balancer/droplets_http_session_duration_avg` | Required |
| Metric | `load` | `GET /v2/monitoring/metrics/load_balancer/droplets_queue_size` | Required |
| Metric | `load` | `GET /v2/monitoring/metrics/load_balancer/frontend_connections_current` | Required |
| Metric | `load` | `GET /v2/monitoring/metrics/load_balancer/frontend_connections_limit` | Required |
| Metric | `load` | `GET /v2/monitoring/metrics/load_balancer/frontend_cpu_utilization` | Required |
| Metric | `load` | `GET /v2/monitoring/metrics/load_balancer/frontend_firewall_dropped_bytes` | Required |
| Metric | `load` | `GET /v2/monitoring/metrics/load_balancer/frontend_firewall_dropped_packets` | Required |
| Metric | `load` | `GET /v2/monitoring/metrics/load_balancer/frontend_http_requests_per_second` | Required |
| Metric | `load` | `GET /v2/monitoring/metrics/load_balancer/frontend_http_responses` | Required |
| Metric | `load` | `GET /v2/monitoring/metrics/load_balancer/frontend_network_throughput_http` | Required |
| Metric | `load` | `GET /v2/monitoring/metrics/load_balancer/frontend_network_throughput_tcp` | Required |
| Metric | `load` | `GET /v2/monitoring/metrics/load_balancer/frontend_network_throughput_udp` | Required |
| Metric | `load` | `GET /v2/monitoring/metrics/load_balancer/frontend_nlb_tcp_network_throughput` | Required |
| Metric | `load` | `GET /v2/monitoring/metrics/load_balancer/frontend_nlb_udp_network_throughput` | Required |
| Metric | `load` | `GET /v2/monitoring/metrics/load_balancer/frontend_tls_connections_current` | Required |
| Metric | `load` | `GET /v2/monitoring/metrics/load_balancer/frontend_tls_connections_exceeding_rate_limit` | Required |
| Metric | `load` | `GET /v2/monitoring/metrics/load_balancer/frontend_tls_connections_limit` | Required |
| Model | `list` | `GET /v1/models` | Required |
| MonitoringAlert | `create` | `POST /v2/monitoring/alerts` | Required |
| MonitoringAlert | `list` | `GET /v2/monitoring/alerts` | Required |
| MonitoringAlert | `load` | `GET /v2/monitoring/alerts/{alert_uuid}` | Required |
| MonitoringAlert | `remove` | `DELETE /v2/monitoring/alerts/{alert_uuid}` | Required |
| MonitoringAlert | `update` | `PUT /v2/monitoring/alerts/{alert_uuid}` | Required |
| MonitoringSink | `create` | `POST /v2/monitoring/sinks` | Required |
| MonitoringSink | `list` | `GET /v2/monitoring/sinks` | Required |
| MonitoringSink | `load` | `GET /v2/monitoring/sinks/{sink_uuid}` | Required |
| MonitoringSink | `remove` | `DELETE /v2/monitoring/sinks/{sink_uuid}` | Required |
| MonitoringSinkDestination | `create` | `POST /v2/monitoring/sinks/destinations` | Required |
| MonitoringSinkDestination | `list` | `GET /v2/monitoring/sinks/destinations` | Required |
| MonitoringSinkDestination | `load` | `GET /v2/monitoring/sinks/destinations/{destination_uuid}` | Required |
| MonitoringSinkDestination | `remove` | `DELETE /v2/monitoring/sinks/destinations/{destination_uuid}` | Required |
| MonitoringSinkDestination | `update` | `POST /v2/monitoring/sinks/destinations/{destination_uuid}` | Required |
| N1Click | `list` | `GET /v2/1-clicks` | Required |
| N1ClickApplication | `create` | `POST /v2/1-clicks/kubernetes` | Required |
| NeighborId | `list` | `GET /v2/reports/droplet_neighbors_ids` | Required |
| Nfs | `create` | `POST /v2/nfs` | Required |
| Nfs | `list` | `GET /v2/nfs` | Required |
| Nfs | `load` | `GET /v2/nfs/{nfs_id}` | Required |
| Nfs | `remove` | `DELETE /v2/nfs/{nfs_id}` | Required |
| Nfs | `remove` | `DELETE /v2/nfs/snapshots/{nfs_snapshot_id}` | Required |
| NfsAction2 | `create` | `POST /v2/nfs/{nfs_id}/actions` | Required |
| NfsSnapshot | `list` | `GET /v2/nfs/snapshots` | Required |
| NfsSnapshot | `load` | `GET /v2/nfs/snapshots/{nfs_snapshot_id}` | Required |
| OnlineMigration | `load` | `GET /v2/databases/{database_cluster_uuid}/online-migration` | Required |
| OnlineMigration | `update` | `PUT /v2/databases/{database_cluster_uuid}/online-migration` | Required |
| Option | `load` | `GET /v2/databases/options` | Required |
| Organization | `create` | `POST /v2/organizations/team` | Required |
| Organization | `list` | `GET /v2/organizations/teams` | Required |
| OutputView | `create` | `POST /v2/action-gateway/output-views` | Required |
| OutputView | `create` | `POST /v2/action-gateway/output-views/preview` | Required |
| OutputView | `list` | `GET /v2/action-gateway/output-views` | Required |
| OutputView | `load` | `GET /v2/action-gateway/output-views/{view_id}` | Required |
| OutputView | `remove` | `DELETE /v2/action-gateway/output-views/{view_id}` | Required |
| PartnerNetworkConnect | `create` | `POST /v2/partner_network_connect/attachments/{pa_id}/service_key` | Required |
| PartnerNetworkConnect | `create` | `POST /v2/partner_network_connect/attachments` | Required |
| PartnerNetworkConnect | `list` | `GET /v2/partner_network_connect/attachments/{pa_id}/remote_routes` | Required |
| PartnerNetworkConnect | `list` | `GET /v2/partner_network_connect/attachments` | Required |
| PartnerNetworkConnect | `load` | `GET /v2/partner_network_connect/attachments/{pa_id}` | Required |
| PartnerNetworkConnect | `load` | `GET /v2/partner_network_connect/attachments/{pa_id}/bgp_auth_key` | Required |
| PartnerNetworkConnect | `load` | `GET /v2/partner_network_connect/attachments/{pa_id}/service_key` | Required |
| PartnerNetworkConnect | `remove` | `DELETE /v2/partner_network_connect/attachments/{pa_id}` | Required |
| PartnerNetworkConnect | `update` | `PATCH /v2/partner_network_connect/attachments/{pa_id}` | Required |
| PrepaymentConfig | `load` | `GET /v2/customers/my/prepayment_config` | Required |
| PrepaymentStatus | `load` | `GET /v2/customers/my/prepayment_status` | Required |
| Project | `create` | `POST /v2/projects` | Required |
| Project | `list` | `GET /v2/projects` | Required |
| Project | `load` | `GET /v2/projects/{project_id}` | Required |
| Project | `load` | `GET /v2/projects/default` | Required |
| Project | `patch` | `PATCH /v2/projects/{project_id}` | Required |
| Project | `patch` | `PATCH /v2/projects/default` | Required |
| Project | `remove` | `DELETE /v2/projects/{project_id}` | Required |
| Project | `update` | `PUT /v2/projects/{project_id}` | Required |
| Project | `update` | `PUT /v2/projects/default` | Required |
| ProjectResource | `create` | `POST /v2/projects/{project_id}/resources` | Required |
| ProjectResource | `create` | `POST /v2/projects/default/resources` | Required |
| ProjectResource | `list` | `GET /v2/projects/{project_id}/resources` | Required |
| ProjectResource | `list` | `GET /v2/projects/default/resources` | Required |
| PromQuery | `create` | `POST /v2/insights/query/{region}/prom/api/v1/query` | Required |
| PromQuery | `load` | `GET /v2/insights/query/{region}/prom/api/v1/query` | Required |
| PromQueryRange | `create` | `POST /v2/insights/query/{region}/prom/api/v1/query_range` | Required |
| PromQueryRange | `load` | `GET /v2/insights/query/{region}/prom/api/v1/query_range` | Required |
| PromSeries | `create` | `POST /v2/insights/query/{region}/prom/api/v1/series` | Required |
| PromSeries | `list` | `GET /v2/insights/query/{region}/prom/api/v1/series` | Required |
| PromStringList | `create` | `POST /v2/insights/query/{region}/prom/api/v1/labels` | Required |
| PromStringList | `list` | `GET /v2/insights/query/{region}/prom/api/v1/label/{name}/values` | Required |
| PromStringList | `list` | `GET /v2/insights/query/{region}/prom/api/v1/labels` | Required |
| Region | `list` | `GET /v2/regions` | Required |
| ReservedIPv6 | `create` | `POST /v2/reserved_ipv6` | Required |
| ReservedIPv6 | `list` | `GET /v2/reserved_ipv6` | Required |
| ReservedIPv6 | `load` | `GET /v2/reserved_ipv6/{reserved_ipv6}` | Required |
| ReservedIPv6 | `remove` | `DELETE /v2/reserved_ipv6/{reserved_ipv6}` | Required |
| ReservedIPv6Action | `create` | `POST /v2/reserved_ipv6/{reserved_ipv6}/actions` | Required |
| ReservedIp | `create` | `POST /v2/reserved_ips` | Required |
| ReservedIp | `list` | `GET /v2/reserved_ips` | Required |
| ReservedIp | `load` | `GET /v2/reserved_ips/{reserved_ip}` | Required |
| ReservedIp | `remove` | `DELETE /v2/reserved_ips/{reserved_ip}` | Required |
| ReservedIpAction | `create` | `POST /v2/reserved_ips/{reserved_ip}/actions` | Required |
| ReservedIpAction | `list` | `GET /v2/reserved_ips/{reserved_ip}/actions` | Required |
| ReservedIpAction | `load` | `GET /v2/reserved_ips/{reserved_ip}/actions/{action_id}` | Required |
| Resync | `create` | `POST /v2/action-gateway/mcp-servers/{server_ref}/resync` | Required |
| Search | `list` | `GET /v2/action-gateway/sessions/search` | Required |
| Search | `list` | `GET /v2/action-gateway/toolbelts/search` | Required |
| Search | `list` | `GET /v2/action-gateway/tools/providers/search` | Required |
| SecurityPlan | `update` | `PUT /v2/security/settings/plan` | Required |
| SecurityRule | `create` | `POST /v2/security/scans/rules` | Required |
| SecurityScan | `create` | `POST /v2/security/scans` | Required |
| SecurityScan | `list` | `GET /v2/security/scans/{scan_id}/findings/{finding_uuid}/affected_resources` | Required |
| SecurityScan | `list` | `GET /v2/security/scans` | Required |
| SecurityScan | `load` | `GET /v2/security/scans/{scan_id}` | Required |
| SecurityScan | `load` | `GET /v2/security/scans/latest` | Required |
| SecuritySuppression | `create` | `POST /v2/security/settings/suppressions` | Required |
| SecuritySuppression | `remove` | `DELETE /v2/security/settings/suppressions/{suppression_uuid}` | Required |
| Setting | `load` | `GET /v2/security/settings` | Required |
| Size | `list` | `GET /v2/sizes` | Required |
| Snapshot | `list` | `GET /v2/snapshots` | Required |
| Snapshot | `load` | `GET /v2/snapshots/{snapshot_id}` | Required |
| Snapshot | `remove` | `DELETE /v2/snapshots/{snapshot_id}` | Required |
| SpacesKey | `create` | `POST /v2/spaces/keys` | Required |
| SpacesKey | `list` | `GET /v2/spaces/keys` | Required |
| SpacesKey | `load` | `GET /v2/spaces/keys/{access_key}` | Required |
| SpacesKey | `patch` | `PATCH /v2/spaces/keys/{access_key}` | Required |
| SpacesKey | `remove` | `DELETE /v2/spaces/keys/{access_key}` | Required |
| SpacesKey | `update` | `PUT /v2/spaces/keys/{access_key}` | Required |
| SqlMode | `load` | `GET /v2/databases/{database_cluster_uuid}/sql_mode` | Required |
| SshKey | `create` | `POST /v2/account/keys` | Required |
| SshKey | `list` | `GET /v2/account/keys` | Required |
| SshKey | `load` | `GET /v2/account/keys/{ssh_key_identifier}` | Required |
| SshKey | `remove` | `DELETE /v2/account/keys/{ssh_key_identifier}` | Required |
| SshKey | `update` | `PUT /v2/account/keys/{ssh_key_identifier}` | Required |
| Systemone | `create` | `POST /v1/systemone` | Required |
| Tag | `create` | `POST /v2/tags/{tag_id}/resources` | Required |
| Tag | `create` | `POST /v2/tags` | Required |
| Tag | `list` | `GET /v2/tags` | Required |
| Tag | `load` | `GET /v2/tags/{tag_id}` | Required |
| Tag | `remove` | `DELETE /v2/tags/{tag_id}` | Required |
| Tag | `remove` | `DELETE /v2/tags/{tag_id}/resources` | Required |
| Tool | `list` | `GET /v2/action-gateway/toolbelts/{name}/providers/{provider}/tools` | Required |
| Tool | `list` | `GET /v2/action-gateway/tools/search` | Required |
| Tool | `load` | `GET /v2/action-gateway/tools/health/tools/{tool_slug}` | Required |
| Toolbelt | `create` | `POST /v2/action-gateway/toolbelts/{name}/tools/add` | Required |
| Toolbelt | `create` | `POST /v2/action-gateway/toolbelts/{name}/tools/remove` | Required |
| Toolbelt | `create` | `POST /v2/action-gateway/toolbelts` | Required |
| Toolbelt | `list` | `GET /v2/action-gateway/toolbelts` | Required |
| Toolbelt | `load` | `GET /v2/action-gateway/toolbelts/{name}` | Required |
| Toolbelt | `remove` | `DELETE /v2/action-gateway/toolbelts/{name}` | Required |
| Uptime | `create` | `POST /v2/uptime/checks/{check_id}/alerts` | Required |
| Uptime | `create` | `POST /v2/uptime/checks` | Required |
| Uptime | `list` | `GET /v2/uptime/checks/{check_id}/alerts` | Required |
| Uptime | `list` | `GET /v2/uptime/checks` | Required |
| Uptime | `load` | `GET /v2/uptime/checks/{check_id}/alerts/{alert_id}` | Required |
| Uptime | `load` | `GET /v2/uptime/checks/{check_id}` | Required |
| Uptime | `load` | `GET /v2/uptime/checks/{check_id}/state` | Required |
| Uptime | `remove` | `DELETE /v2/uptime/checks/{check_id}/alerts/{alert_id}` | Required |
| Uptime | `remove` | `DELETE /v2/uptime/checks/{check_id}` | Required |
| Uptime | `update` | `PUT /v2/uptime/checks/{check_id}/alerts/{alert_id}` | Required |
| Uptime | `update` | `PUT /v2/uptime/checks/{check_id}` | Required |
| User | `list` | `GET /v2/action-gateway/users` | Required |
| User | `load` | `GET /v2/kubernetes/clusters/{cluster_id}/user` | Required |
| User | `load` | `GET /v2/action-gateway/users/{user_id}` | Required |
| VectorDatabase | `remove` | `DELETE /v2/vector-databases/{id}` | Required |
| VectordbBackup | `list` | `GET /v2/vector-databases/{id}/backups` | Required |
| VectordbGetRestoreStatus | `load` | `GET /v2/vector-databases/{id}/backups/{backup_id}/restore` | Required |
| VectordbGetVectorDb | `create` | `POST /v2/vector-databases/{id}/resize` | Required |
| VectordbGetVectorDb | `create` | `POST /v2/vector-databases` | Required |
| VectordbGetVectorDb | `list` | `GET /v2/vector-databases` | Required |
| VectordbGetVectorDb | `load` | `GET /v2/vector-databases/{id}` | Required |
| VectordbGetVectorDbAdminCredential | `load` | `GET /v2/vector-databases/{id}/credentials` | Required |
| VectordbRestoreBackup | `create` | `POST /v2/vector-databases/{id}/backups/{backup_id}/restore` | Required |
| VectordbUpdateVectorDb | `update` | `PUT /v2/vector-databases/{id}` | Required |
| VectordbUpdateVectorDbTag | `update` | `PUT /v2/vector-databases/{id}/tags` | Required |
| Vpc | `create` | `POST /v2/vpcs/{vpc_id}/peerings` | Required |
| Vpc | `create` | `POST /v2/vpcs` | Required |
| Vpc | `list` | `GET /v2/vpcs/{vpc_id}/members` | Required |
| Vpc | `list` | `GET /v2/vpcs/{vpc_id}/peerings` | Required |
| Vpc | `list` | `GET /v2/vpcs` | Required |
| Vpc | `load` | `GET /v2/vpcs/{vpc_id}` | Required |
| Vpc | `patch` | `PATCH /v2/vpcs/{vpc_id}/peerings/{vpc_peering_id}` | Required |
| Vpc | `patch` | `PATCH /v2/vpcs/{vpc_id}` | Required |
| Vpc | `remove` | `DELETE /v2/vpcs/{vpc_id}` | Required |
| Vpc | `update` | `PUT /v2/vpcs/{vpc_id}` | Required |
| VpcNatGateway | `create` | `POST /v2/vpc_nat_gateways` | Required |
| VpcNatGateway | `list` | `GET /v2/vpc_nat_gateways` | Required |
| VpcNatGateway | `load` | `GET /v2/vpc_nat_gateways/{id}` | Required |
| VpcNatGateway | `remove` | `DELETE /v2/vpc_nat_gateways/{id}` | Required |
| VpcNatGateway | `update` | `PUT /v2/vpc_nat_gateways/{id}` | Required |
| VpcPeering | `create` | `POST /v2/vpc_peerings` | Required |
| VpcPeering | `list` | `GET /v2/vpc_peerings` | Required |
| VpcPeering | `load` | `GET /v2/vpc_peerings/{vpc_peering_id}` | Required |
| VpcPeering | `remove` | `DELETE /v2/vpc_peerings/{vpc_peering_id}` | Required |
| VpcPeering | `update` | `PATCH /v2/vpc_peerings/{vpc_peering_id}` | Required |
| VpcRoutesPublicPreview | `create` | `POST /v2/vpcs/{vpc_uuid}/subnets/{subnet_uuid}/routes` | Required |
| VpcRoutesPublicPreview | `list` | `GET /v2/vpcs/{vpc_uuid}/subnets/{subnet_uuid}/routes` | Required |
| VpcRoutesPublicPreview | `list` | `GET /v2/vpcs/{vpc_uuid}/routes` | Required |
| VpcRoutesPublicPreview | `remove` | `DELETE /v2/vpcs/{vpc_uuid}/subnets/{subnet_uuid}/routes/{route_uuid}` | Required |
| VpcRoutesPublicPreview | `update` | `PATCH /v2/vpcs/{vpc_uuid}/subnets/{subnet_uuid}/routes/{route_uuid}` | Required |
| VpcSubnetsPublicPreview | `create` | `POST /v2/vpcs/{vpc_uuid}/subnets` | Required |
| VpcSubnetsPublicPreview | `list` | `GET /v2/vpcs/{vpc_uuid}/subnets/{subnet_uuid}/members` | Required |
| VpcSubnetsPublicPreview | `list` | `GET /v2/vpcs/{vpc_uuid}/subnets` | Required |
| VpcSubnetsPublicPreview | `load` | `GET /v2/vpcs/{vpc_uuid}/subnets/{subnet_uuid}` | Required |
| VpcSubnetsPublicPreview | `remove` | `DELETE /v2/vpcs/{vpc_uuid}/subnets/{subnet_uuid}` | Required |
| VpcSubnetsPublicPreview | `update` | `PATCH /v2/vpcs/{vpc_uuid}/subnets/{subnet_uuid}` | Required |

## Connect to the API

- production: `https://api.digitalocean.com`

The default credential is sent in the `Authorization` header with the `Bearer` prefix.

> ## OAuth Authentication
>
> In order to interact with the DigitalOcean API, you or your application must
> authenticate.
>
> The DigitalOcean API handles this through OAuth, an open standard for
> authorization. OAuth allows you to delegate access to your account.
> Scopes can be used to grant full access, read-only access, or access to
> a specific set of endpoints.
>
> You can generate an OAuth token by visiting the [Apps &amp; API](https://cloud.digitalocean.com/account/api/tokens)
> section of the DigitalOcean control panel for your account.
>
> An OAuth token functions as a complete authentication request. In effect, it
> acts as a substitute for a username and password pair.
>
> Because of this, it is absolutely **essential** that you keep your OAuth
> tokens secure. In fact, upon generation, the web interface will only display
> each token a single time in order to prevent the token from being compromised.
>
> DigitalOcean access tokens begin with an identifiable prefix in order to
> distinguish them from other similar tokens.
>
> - `dop_v1_` for personal access tokens generated in the control panel
> - `doo_v1_` for tokens generated by applications using [the OAuth flow](https://docs.digitalocean.com/reference/api/oauth-api/)
> - `dor_v1_` for OAuth refresh tokens
>
> ### Scopes
>
> Scopes act like permissions assigned to an API token. These permissions
> determine what actions the token can perform. You can create API
> tokens that grant read-only access, full access, or limited access to
> specific endpoints by using custom scopes.
>
> Generally, scopes are designed to match HTTP verbs and common CRUD
> operations (Create, Read, Update, Delete).
>
> | HTTP Verb | CRUD Operation | Scope |
> |---|---|---|
> | GET | Read | `&lt;resource&gt;:read` |
> | POST | Create | `&lt;resource&gt;:create` |
> | PUT/PATCH | Update | `&lt;resource&gt;:update` |
> | DELETE | Delete | `&lt;resource&gt;:delete` |
>
> For example, creating a new Droplet by making a `POST` request to the
> `/v2/droplets` endpoint requires the `droplet:create` scope while
> listing Droplets by making a `GET` request to the `/v2/droplets`
> endpoint requires the `droplet:read` scope.
>
> Each endpoint below specifies which scope is required to access it when
> using custom scopes.
>
> ### How to Authenticate with OAuth
>
> In order to make an authenticated request, include a bearer-type
> `Authorization` header containing your OAuth token. All requests must be
> made over HTTPS.
>
> ### Authenticate with a Bearer Authorization Header
>
> ```
> curl -X $HTTP_METHOD -H &quot;Authorization: Bearer $DIGITALOCEAN_TOKEN&quot; &quot;https://api.digitalocean.com/v2/$OBJECT&quot;
> ```

> ## OAuth Authentication
>
> In order to interact with the DigitalOcean API, you or your application must
> authenticate.
>
> The DigitalOcean API handles this through OAuth, an open standard for
> authorization. OAuth allows you to delegate access to your account.
> Scopes can be used to grant full access, read-only access, or access to
> a specific set of endpoints.
>
> You can generate an OAuth token by visiting the [Apps &amp; API](https://cloud.digitalocean.com/account/api/tokens)
> section of the DigitalOcean control panel for your account.
>
> An OAuth token functions as a complete authentication request. In effect, it
> acts as a substitute for a username and password pair.
>
> Because of this, it is absolutely **essential** that you keep your OAuth
> tokens secure. In fact, upon generation, the web interface will only display
> each token a single time in order to prevent the token from being compromised.
>
> DigitalOcean access tokens begin with an identifiable prefix in order to
> distinguish them from other similar tokens.
>
> - `dop_v1_` for personal access tokens generated in the control panel
> - `doo_v1_` for tokens generated by applications using [the OAuth flow](https://docs.digitalocean.com/reference/api/oauth-api/)
> - `dor_v1_` for OAuth refresh tokens
>
> ### Authenticate with a Bearer Authorization Header
>
> **Serverless Inference:**
>
> ```
> curl -X POST -H &quot;Authorization: Bearer $DIGITALOCEAN_TOKEN&quot; &quot;https://inference.do-ai.run/v1/chat/completions&quot;
> ```
>
> **Agent Inference:**
>
> ```
> curl -X POST -H &quot;Authorization: Bearer $AGENT_ACCESS_KEY&quot; &quot;https://&#123;your-agent-url&#125;.agents.do-ai.run/v1/chat/completions?agent=true&quot;
> ```
>
> **Note:** Agent Inference APIs use an `agent_access_key` (endpoint access
> key) instead of a DigitalOcean OAuth token. The `agent_access_key` is
> provided when you provision an agent endpoint and is scoped to that
> specific agent. It is not interchangeable with DigitalOcean OAuth tokens
> (`dop_v1_*`, `doo_v1_*`, `dor_v1_*`), which are used with Serverless
> Inference and the control-plane API at `https://api.digitalocean.com`.

Check authentication for the route you plan to call. A route that declares no authentication can be used without credentials; this does not change the requirements of other routes. Keep credentials in environment variables or a configured secret provider, and keep them out of source control and logs.

## Make a first request

1. Choose the API server and an operation that matches your task.
2. Check the operation’s required input and authentication. Use values valid for your account and environment.
3. Send one request and inspect the returned data before adding retries, concurrency, or a larger batch.

For an SDK call, install or build the chosen client, create a client instance with its documented configuration, and call the required entity operation. Language references describe the argument shape, asynchronous behaviour, and returned values.

## Choose an SDK

Choose the language already used by your application or service. The clients represent the same API model, while package setup, naming, and return types follow each language. Check the selected client’s reference and tests before integrating it into an existing application.

| Client | Repository directory | Distribution |
| --- | --- | --- |
| Python | `py/` | Build from source |
| TypeScript | `ts/` | Build from source |

Build-from-source entries are not marked as published in the project model. Follow the build instructions in that target’s README, then consume the resulting package using your language’s local dependency mechanism. Published entries give the installation command recorded for that client.

## Operational features

Features supply behaviour around API calls, such as request handling, diagnostics, or local testing. Inclusion in this project does not mean a feature is enabled at runtime. Check the selected SDK’s supported features and configuration defaults, then enable the behaviour your application needs.

- `test`: In-memory mock transport for testing without a live server

Start with the default client configuration. Add request limits and diagnostics as needed, test error paths, and review retry behaviour before using operations that change data. A retry can repeat an operation unless the API provides a suitable guarantee.

## Continue with the documentation

- Follow the first-call guide for the setup sequence.
- Read the authentication guide before using protected routes.
- Use the API reference for request schemas, response formats, and status codes.
- Check the chosen SDK or companion tool reference for its configuration and supported operations.

