// Typed models for the Digitalocean SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
// params (op.<name>.points[].g.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface AccessPoint {
  access_policy: Record<string, any>
  created_at: string
  id: string
  is_default: boolean
  name: string
  path: string
  share_id: string
  status: string
  updated_at: string
  vpc_id?: string
}

export interface AccessPointLoadMatch {
  id: string
}

export interface AccessPointListMatch {
  share_id: string
  status?: string
}

export interface AccessPointCreateData {
  share_id: string
  access_policy: Record<string, any>
  created_at: string
  id: string
  is_default: boolean
  name: string
  path: string
  status: string
  updated_at: string
  vpc_id?: string
}

export interface AccessPointRemoveMatch {
  id: string
}

export interface Account {
  droplet_limit: number
  email: string
  email_verified: boolean
  floating_ip_limit: number
  name?: string
  status: string
  status_message: string
  team?: Record<string, any>
  uuid: string
}

export interface AccountLoadMatch {
  droplet_limit?: number
  email?: string
  email_verified?: boolean
  floating_ip_limit?: number
  name?: string
  status?: string
  status_message?: string
  team?: Record<string, any>
  uuid?: string
}

export interface Action {
  completed_at?: string
  id?: number
  region: Record<string, any>
  region_slug?: string
  resource_id?: number
  resource_type?: string
  started_at?: string
  status?: string
  type?: string
}

export interface ActionLoadMatch {
  id: number
}

export interface ActionListMatch {
  page?: number
  per_page?: number
}

export interface ActorLimit {
  category: string
  id?: string
  requests_per_minute: string
}

export interface ActorLimitListMatch {
  id: string
}

export interface AddOnApp {
  app_slug: string
  description: string
  display_name: string
  eula: string
  id: number
  name: string
  options?: any[]
  plans: any[]
  tos: string
  type: string
}

export interface AddOnAppListMatch {
  app_slug?: string
  description?: string
  display_name?: string
  eula?: string
  id?: number
  name?: string
  options?: any[]
  plans?: any[]
  tos?: string
  type?: string
}

export interface AddOnPlan {
  app_name?: string
  app_slug: string
  has_config: boolean
  message?: string
  metadata?: any[]
  name: string
  plan_name?: string
  plan_price_per_month?: number
  plan_slug: string
  sso_url?: string
  state: string
  uuid: string
}

export interface AddOnPlanUpdateData {
  resource_uuid: string
  app_name?: string
  app_slug?: string
  has_config?: boolean
  message?: string
  metadata?: any[]
  name?: string
  plan_name?: string
  plan_price_per_month?: number
  plan_slug?: string
  sso_url?: string
  state?: string
  uuid?: string
}

export interface AddOnResource {
  app_name?: string
  app_slug: string
  fleet_uuid?: string
  has_config: boolean
  linked_droplet_id?: number
  message?: string
  metadata?: any[]
  name: string
  plan_name?: string
  plan_price_per_month?: number
  plan_slug: string
  sso_url?: string
  state: string
  uuid: string
}

export interface AddOnResourceLoadMatch {
  resource_uuid: string
}

export interface AddOnResourceListMatch {
  app_name?: string
  app_slug?: string
  fleet_uuid?: string
  has_config?: boolean
  linked_droplet_id?: number
  message?: string
  metadata?: any[]
  name?: string
  plan_name?: string
  plan_price_per_month?: number
  plan_slug?: string
  sso_url?: string
  state?: string
  uuid?: string
}

export interface AddOnResourceCreateData {
  app_name?: string
  app_slug: string
  fleet_uuid?: string
  has_config: boolean
  linked_droplet_id?: number
  message?: string
  metadata?: any[]
  name: string
  plan_name?: string
  plan_price_per_month?: number
  plan_slug: string
  sso_url?: string
  state: string
  uuid: string
}

export interface AddOnResourceUpdateData {
  resource_uuid: string
  app_name?: string
  app_slug?: string
  fleet_uuid?: string
  has_config?: boolean
  linked_droplet_id?: number
  message?: string
  metadata?: any[]
  name?: string
  plan_name?: string
  plan_price_per_month?: number
  plan_slug?: string
  sso_url?: string
  state?: string
  uuid?: string
}

export interface AddOnResourceRemoveMatch {
  resource_uuid: string
}

export interface ApiAgentVersion {
  agent_uuid?: string
  attached_child_agents?: any[]
  attached_functions?: any[]
  attached_guardrails?: any[]
  attached_knowledgebases?: any[]
  can_rollback?: boolean
  created_at?: string
  created_by_email?: string
  currently_applied?: boolean
  description?: string
  id?: string
  instruction?: string
  k?: number
  max_tokens?: number
  model_name?: string
  name?: string
  provide_citations?: boolean
  retrieval_method?: string
  tags?: any[]
  temperature?: number
  top_p?: number
  trigger_action?: string
  version_hash?: string
}

export interface ApiAgentVersionListMatch {
  agent_id: string
  page?: number
  per_page?: number
}

export interface ApiCreateAgentApiKeyOutput {
  agent_uuid?: string
  created_at?: string
  created_by?: string
  deleted_at?: string
  name?: string
  secret_key?: string
  uuid?: string
}

export interface ApiCreateAgentApiKeyOutputCreateData {
  agent_id: string
  agent_uuid?: string
  created_at?: string
  created_by?: string
  deleted_at?: string
  name?: string
  secret_key?: string
  uuid?: string
}

export interface ApiCreateDataSourceFileUploadPresignedUrlsOutput {
  files?: any[]
  request_id?: string
  uploads?: any[]
}

export interface ApiCreateDataSourceFileUploadPresignedUrlsOutputCreateData {
  files?: any[]
  request_id?: string
  uploads?: any[]
}

export interface ApiCreateKnowledgeBaseDataSourceOutput {
  aws_data_source?: Record<string, any>
  bucket_name?: string
  chunking_algorithm?: string
  chunking_options?: Record<string, any>
  created_at?: string
  dropbox_data_source?: Record<string, any>
  file_upload_data_source?: Record<string, any>
  google_drive_data_source?: Record<string, any>
  item_path?: string
  knowledge_base_uuid?: string
  last_datasource_indexing_job?: Record<string, any>
  region?: string
  spaces_data_source?: Record<string, any>
  updated_at?: string
  uuid?: string
  web_crawler_data_source?: Record<string, any>
}

export interface ApiCreateKnowledgeBaseDataSourceOutputCreateData {
  knowledge_base_id: string
  aws_data_source?: Record<string, any>
  bucket_name?: string
  chunking_algorithm?: string
  chunking_options?: Record<string, any>
  created_at?: string
  dropbox_data_source?: Record<string, any>
  file_upload_data_source?: Record<string, any>
  google_drive_data_source?: Record<string, any>
  item_path?: string
  knowledge_base_uuid?: string
  last_datasource_indexing_job?: Record<string, any>
  region?: string
  spaces_data_source?: Record<string, any>
  updated_at?: string
  uuid?: string
  web_crawler_data_source?: Record<string, any>
}

export interface ApiCreateScenarioSetFromLibraryOutput {
  bucket_name?: string
  bucket_region?: string
  created_at?: string
  deleted_at?: string
  description?: string
  failure_reason?: string
  generator_model_uuid?: string
  library_scenario_uuid?: string
  name?: string
  scenario_count?: number
  scenario_set_uuid?: string
  source_export_id?: string
  source_goal_description?: string
  source_kind?: string
  spaces_key?: string
  status?: string
  updated_at?: string
  workflow_uuid?: string
}

export interface ApiCreateScenarioSetFromLibraryOutputCreateData {
  scenario_library_id: string
  bucket_name?: string
  bucket_region?: string
  created_at?: string
  deleted_at?: string
  description?: string
  failure_reason?: string
  generator_model_uuid?: string
  library_scenario_uuid?: string
  name?: string
  scenario_count?: number
  scenario_set_uuid?: string
  source_export_id?: string
  source_goal_description?: string
  source_kind?: string
  spaces_key?: string
  status?: string
  updated_at?: string
  workflow_uuid?: string
}

export interface ApiDeleteAgentApiKeyOutput {
}

export interface ApiDeleteAgentApiKeyOutputUpdateData {
  agent_id: string
  api_key_uuid: string

  // Selects a custom action instead of the plain update:
  //   'regenerate'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface ApiDeleteAgentApiKeyOutputRemoveMatch {
  agent_id: string
  api_key_uuid: string
}

export interface ApiDeleteAgentOutput {
  anthropic_api_key?: Record<string, any>
  anthropic_key_uuid?: string
  api_key_infos?: any[]
  api_keys?: any[]
  chatbot?: Record<string, any>
  chatbot_identifiers?: any[]
  child_agents?: any[]
  conversation_logs_enabled?: boolean
  created_at?: string
  deployment?: Record<string, any>
  description?: string
  functions?: any[]
  guardrails?: any[]
  if_case?: string
  instruction?: string
  k?: number
  knowledge_base_uuid?: any[]
  knowledge_bases?: any[]
  logging_config?: Record<string, any>
  max_tokens?: number
  mcp_servers?: any[]
  model?: Record<string, any>
  model_provider_key?: Record<string, any>
  model_provider_key_uuid?: string
  model_router?: Record<string, any>
  model_router_uuid?: string
  model_uuid?: string
  name?: string
  open_ai_key_uuid?: string
  openai_api_key?: Record<string, any>
  parent_agents?: any[]
  project_id?: string
  provide_citations?: boolean
  reasoning_effort?: string
  region?: string
  retrieval_method?: string
  route_created_at?: string
  route_created_by?: string
  route_name?: string
  route_uuid?: string
  router_preset_slug?: string
  tags?: any[]
  temperature?: number
  template?: Record<string, any>
  thinking_token_budget?: number
  top_p?: number
  updated_at?: string
  url?: string
  user_id?: string
  uuid?: string
  version_hash?: string
  vpc_egress_ips?: any[]
  vpc_uuid?: string
  web_fetch_enabled?: boolean
  web_search_enabled?: boolean
  workspace?: Record<string, any>
  workspace_uuid?: string
}

export interface ApiDeleteAgentOutputListMatch {
  only_deployed?: boolean
  page?: number
  per_page?: number
}

export interface ApiDeleteAgentOutputCreateData {
  anthropic_api_key?: Record<string, any>
  anthropic_key_uuid?: string
  api_key_infos?: any[]
  api_keys?: any[]
  chatbot?: Record<string, any>
  chatbot_identifiers?: any[]
  child_agents?: any[]
  conversation_logs_enabled?: boolean
  created_at?: string
  deployment?: Record<string, any>
  description?: string
  functions?: any[]
  guardrails?: any[]
  if_case?: string
  instruction?: string
  k?: number
  knowledge_base_uuid?: any[]
  knowledge_bases?: any[]
  logging_config?: Record<string, any>
  max_tokens?: number
  mcp_servers?: any[]
  model?: Record<string, any>
  model_provider_key?: Record<string, any>
  model_provider_key_uuid?: string
  model_router?: Record<string, any>
  model_router_uuid?: string
  model_uuid?: string
  name?: string
  open_ai_key_uuid?: string
  openai_api_key?: Record<string, any>
  parent_agents?: any[]
  project_id?: string
  provide_citations?: boolean
  reasoning_effort?: string
  region?: string
  retrieval_method?: string
  route_created_at?: string
  route_created_by?: string
  route_name?: string
  route_uuid?: string
  router_preset_slug?: string
  tags?: any[]
  temperature?: number
  template?: Record<string, any>
  thinking_token_budget?: number
  top_p?: number
  updated_at?: string
  url?: string
  user_id?: string
  uuid?: string
  version_hash?: string
  vpc_egress_ips?: any[]
  vpc_uuid?: string
  web_fetch_enabled?: boolean
  web_search_enabled?: boolean
  workspace?: Record<string, any>
  workspace_uuid?: string
}

export interface ApiDeleteAgentOutputRemoveMatch {
  uuid: string
}

export interface ApiDeleteAnthropicApiKeyOutput {
  api_key?: string
  created_at?: string
  created_by?: string
  deleted_at?: string
  name?: string
  updated_at?: string
  uuid?: string
}

export interface ApiDeleteAnthropicApiKeyOutputListMatch {
  page?: number
  per_page?: number
}

export interface ApiDeleteAnthropicApiKeyOutputCreateData {
  api_key?: string
  created_at?: string
  created_by?: string
  deleted_at?: string
  name?: string
  updated_at?: string
  uuid?: string
}

export interface ApiDeleteAnthropicApiKeyOutputRemoveMatch {
  api_key_uuid: string
}

export interface ApiDeleteCustomEvaluationMetricOutput {
}

export interface ApiDeleteCustomEvaluationMetricOutputRemoveMatch {
  metric_uuid: string
}

export interface ApiDeleteCustomModelOutputPublic {
}

export interface ApiDeleteCustomModelOutputPublicRemoveMatch {
  uuid: string
}

export interface ApiDeleteEvaluationDatasetOutput {
  created_at?: string
  dataset_name?: string
  dataset_paradigm?: string
  dataset_type?: string
  dataset_uuid?: string
  evaluation_dataset_uuid?: string
  file_size?: string
  file_upload_dataset?: Record<string, any>
  has_ground_truth?: boolean
  name?: string
  row_count?: number
}

export interface ApiDeleteEvaluationDatasetOutputListMatch {
  dataset_paradigm?: string
  dataset_type?: string
  has_ground_truth?: boolean
}

export interface ApiDeleteEvaluationDatasetOutputCreateData {
  created_at?: string
  dataset_name?: string
  dataset_paradigm?: string
  dataset_type?: string
  dataset_uuid?: string
  evaluation_dataset_uuid?: string
  file_size?: string
  file_upload_dataset?: Record<string, any>
  has_ground_truth?: boolean
  name?: string
  row_count?: number
}

export interface ApiDeleteEvaluationDatasetOutputRemoveMatch {
  dataset_uuid: string
}

export interface ApiDeleteKnowledgeBaseDataSourceOutput {
}

export interface ApiDeleteKnowledgeBaseDataSourceOutputRemoveMatch {
  data_source_uuid: string
  knowledge_base_id: string
}

export interface ApiDeleteKnowledgeBaseOutput {
}

export interface ApiDeleteKnowledgeBaseOutputRemoveMatch {
  uuid: string
}

export interface ApiDeleteModelApiKeyOutput {
  created_at?: string
  created_by?: string
  deleted_at?: string
  name?: string
  secret_key?: string
  uuid?: string
}

export interface ApiDeleteModelApiKeyOutputListMatch {
  page?: number
  per_page?: number
}

export interface ApiDeleteModelApiKeyOutputCreateData {
  created_at?: string
  created_by?: string
  deleted_at?: string
  name?: string
  secret_key?: string
  uuid?: string
}

export interface ApiDeleteModelApiKeyOutputUpdateData {
  api_key_uuid: string
  created_at?: string
  created_by?: string
  deleted_at?: string
  name?: string
  secret_key?: string
  uuid?: string

  // Selects a custom action instead of the plain update:
  //   'regenerate'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface ApiDeleteModelApiKeyOutputRemoveMatch {
  api_key_uuid: string
}

export interface ApiDeleteModelEvaluationPresetOutput {
}

export interface ApiDeleteModelEvaluationPresetOutputRemoveMatch {
  eval_preset_uuid: string
}

export interface ApiDeleteModelEvaluationRunOutputPublic {
}

export interface ApiDeleteModelEvaluationRunOutputPublicRemoveMatch {
  eval_run_uuid: string
}

export interface ApiDeleteModelRouterOutput {
}

export interface ApiDeleteModelRouterOutputRemoveMatch {
  uuid: string
}

export interface ApiDeleteOpenAiapiKeyOutput {
  api_key?: string
  created_at?: string
  created_by?: string
  deleted_at?: string
  models?: any[]
  name?: string
  updated_at?: string
  uuid?: string
}

export interface ApiDeleteOpenAiapiKeyOutputListMatch {
  page?: number
  per_page?: number
}

export interface ApiDeleteOpenAiapiKeyOutputCreateData {
  api_key?: string
  created_at?: string
  created_by?: string
  deleted_at?: string
  models?: any[]
  name?: string
  updated_at?: string
  uuid?: string
}

export interface ApiDeleteOpenAiapiKeyOutputRemoveMatch {
  api_key_uuid: string
}

export interface ApiDeleteScenarioSetOutput {
}

export interface ApiDeleteScenarioSetOutputRemoveMatch {
  scenario_set_uuid: string
}

export interface ApiDeleteScheduledIndexingOutput {
  created_at?: string
  days?: any[]
  deleted_at?: string
  is_active?: boolean
  knowledge_base_uuid?: string
  last_ran_at?: string
  next_run_at?: string
  time?: string
  updated_at?: string
  uuid?: string
}

export interface ApiDeleteScheduledIndexingOutputCreateData {
  created_at?: string
  days?: any[]
  deleted_at?: string
  is_active?: boolean
  knowledge_base_uuid?: string
  last_ran_at?: string
  next_run_at?: string
  time?: string
  updated_at?: string
  uuid?: string
}

export interface ApiDeleteScheduledIndexingOutputRemoveMatch {
  uuid: string
}

export interface ApiDeleteSimulationRunOutput {
}

export interface ApiDeleteSimulationRunOutputRemoveMatch {
  run_uuid: string
}

export interface ApiDeleteWorkspaceOutput {
}

export interface ApiDeleteWorkspaceOutputRemoveMatch {
  workspace_uuid: string
}

export interface ApiDropboxOauth2GetTokensOutput {
  code?: string
  redirect_url?: string
  refresh_token?: string
  token?: string
}

export interface ApiDropboxOauth2GetTokensOutputCreateData {
  code?: string
  redirect_url?: string
  refresh_token?: string
  token?: string
}

export interface ApiGenerateOauth2UrlOutput {
  url?: string
}

export interface ApiGenerateOauth2UrlOutputLoadMatch {
  redirect_url?: string
  type?: string
}

export interface ApiGenerateScenarioSetOutput {
  bucket_name?: string
  bucket_region?: string
  created_at?: string
  deleted_at?: string
  description?: string
  failure_reason?: string
  generator_model_uuid?: string
  goal_description?: string
  library_scenario_uuid?: string
  name?: string
  num_scenarios?: number
  scenario_count?: number
  scenario_set_uuid?: string
  source_export_id?: string
  source_goal_description?: string
  source_kind?: string
  spaces_key?: string
  status?: string
  updated_at?: string
  workflow_uuid?: string
}

export interface ApiGenerateScenarioSetOutputCreateData {
  bucket_name?: string
  bucket_region?: string
  created_at?: string
  deleted_at?: string
  description?: string
  failure_reason?: string
  generator_model_uuid?: string
  goal_description?: string
  library_scenario_uuid?: string
  name?: string
  num_scenarios?: number
  scenario_count?: number
  scenario_set_uuid?: string
  source_export_id?: string
  source_goal_description?: string
  source_kind?: string
  spaces_key?: string
  status?: string
  updated_at?: string
  workflow_uuid?: string
}

export interface ApiGetAgentOutput {
  anthropic_api_key?: Record<string, any>
  api_key_infos?: any[]
  api_keys?: any[]
  chatbot?: Record<string, any>
  chatbot_identifiers?: any[]
  child_agents?: any[]
  conversation_logs_enabled?: boolean
  created_at?: string
  deployment?: Record<string, any>
  description?: string
  functions?: any[]
  guardrails?: any[]
  if_case?: string
  instruction?: string
  k?: number
  knowledge_bases?: any[]
  logging_config?: Record<string, any>
  max_tokens?: number
  mcp_servers?: any[]
  model?: Record<string, any>
  model_provider_key?: Record<string, any>
  model_router?: Record<string, any>
  name?: string
  openai_api_key?: Record<string, any>
  parent_agents?: any[]
  project_id?: string
  provide_citations?: boolean
  reasoning_effort?: string
  region?: string
  retrieval_method?: string
  route_created_at?: string
  route_created_by?: string
  route_name?: string
  route_uuid?: string
  tags?: any[]
  temperature?: number
  template?: Record<string, any>
  thinking_token_budget?: number
  top_p?: number
  updated_at?: string
  url?: string
  user_id?: string
  uuid?: string
  version_hash?: string
  vpc_egress_ips?: any[]
  vpc_uuid?: string
  web_fetch_enabled?: boolean
  web_search_enabled?: boolean
  workspace?: Record<string, any>
}

export interface ApiGetAgentOutputLoadMatch {
  uuid: string
}

export interface ApiGetAgentOutputUpdateData {
  uuid: string
  anthropic_api_key?: Record<string, any>
  api_key_infos?: any[]
  api_keys?: any[]
  chatbot?: Record<string, any>
  chatbot_identifiers?: any[]
  child_agents?: any[]
  conversation_logs_enabled?: boolean
  created_at?: string
  deployment?: Record<string, any>
  description?: string
  functions?: any[]
  guardrails?: any[]
  if_case?: string
  instruction?: string
  k?: number
  knowledge_bases?: any[]
  logging_config?: Record<string, any>
  max_tokens?: number
  mcp_servers?: any[]
  model?: Record<string, any>
  model_provider_key?: Record<string, any>
  model_router?: Record<string, any>
  name?: string
  openai_api_key?: Record<string, any>
  parent_agents?: any[]
  project_id?: string
  provide_citations?: boolean
  reasoning_effort?: string
  region?: string
  retrieval_method?: string
  route_created_at?: string
  route_created_by?: string
  route_name?: string
  route_uuid?: string
  tags?: any[]
  temperature?: number
  template?: Record<string, any>
  thinking_token_budget?: number
  top_p?: number
  updated_at?: string
  url?: string
  user_id?: string
  version_hash?: string
  vpc_egress_ips?: any[]
  vpc_uuid?: string
  web_fetch_enabled?: boolean
  web_search_enabled?: boolean
  workspace?: Record<string, any>

  // Selects a custom action instead of the plain update:
  //   'deployment_visibility'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface ApiGetAgentUsageOutput {
  log_insights_usage?: Record<string, any>
  usage?: Record<string, any>
}

export interface ApiGetAgentUsageOutputLoadMatch {
  agent_id: string
  start?: string
  stop?: string
}

export interface ApiGetAnthropicApiKeyOutput {
  created_at?: string
  created_by?: string
  deleted_at?: string
  name?: string
  updated_at?: string
  uuid?: string
}

export interface ApiGetAnthropicApiKeyOutputLoadMatch {
  api_key_uuid: string
}

export interface ApiGetChildrenOutput {
  anthropic_api_key?: Record<string, any>
  api_key_infos?: any[]
  api_keys?: any[]
  chatbot?: Record<string, any>
  chatbot_identifiers?: any[]
  child_agents?: any[]
  conversation_logs_enabled?: boolean
  created_at?: string
  deployment?: Record<string, any>
  description?: string
  functions?: any[]
  guardrails?: any[]
  if_case?: string
  instruction?: string
  k?: number
  knowledge_bases?: any[]
  logging_config?: Record<string, any>
  max_tokens?: number
  mcp_servers?: any[]
  model?: Record<string, any>
  model_provider_key?: Record<string, any>
  model_router?: Record<string, any>
  name?: string
  openai_api_key?: Record<string, any>
  parent_agents?: any[]
  project_id?: string
  provide_citations?: boolean
  reasoning_effort?: string
  region?: string
  retrieval_method?: string
  route_created_at?: string
  route_created_by?: string
  route_name?: string
  route_uuid?: string
  tags?: any[]
  temperature?: number
  template?: Record<string, any>
  thinking_token_budget?: number
  top_p?: number
  updated_at?: string
  url?: string
  user_id?: string
  uuid?: string
  version_hash?: string
  vpc_egress_ips?: any[]
  vpc_uuid?: string
  web_fetch_enabled?: boolean
  web_search_enabled?: boolean
  workspace?: Record<string, any>
}

export interface ApiGetChildrenOutputListMatch {
  agent_id: string
}

export interface ApiGetCustomModelOutputPublic {
  active_deployments?: any[]
  architecture?: string
  config_json?: Record<string, any>
  context_length?: number
  cost_estimate_per_month?: number
  created_at?: string
  description?: string
  error_message?: string
  file_count?: number
  input_modalities?: any[]
  license?: string
  name?: string
  output_modalities?: any[]
  parameters?: string
  source_ref?: Record<string, any>
  source_type?: string
  status?: string
  storage_region?: string
  tags?: Record<string, any>
  team_id?: string
  total_size_bytes?: string
  updated_at?: string
  uuid?: string
}

export interface ApiGetCustomModelOutputPublicLoadMatch {
  uuid: string
}

export interface ApiGetCustomModelOutputPublicListMatch {
  page?: number
  per_page?: number
  status?: string
}

export interface ApiGetCustomModelOutputPublicUpdateData {
  uuid: string
  active_deployments?: any[]
  architecture?: string
  config_json?: Record<string, any>
  context_length?: number
  cost_estimate_per_month?: number
  created_at?: string
  description?: string
  error_message?: string
  file_count?: number
  input_modalities?: any[]
  license?: string
  name?: string
  output_modalities?: any[]
  parameters?: string
  source_ref?: Record<string, any>
  source_type?: string
  status?: string
  storage_region?: string
  tags?: Record<string, any>
  team_id?: string
  total_size_bytes?: string
  updated_at?: string

  // Selects a custom action instead of the plain update:
  //   'metadata'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface ApiGetEvaluationDatasetDownloadUrlOutput {
  download_url?: string
  expires_at?: string
}

export interface ApiGetEvaluationDatasetDownloadUrlOutputLoadMatch {
  evaluation_dataset_id: string
}

export interface ApiGetEvaluationRunOutput {
  agent_deleted?: boolean
  agent_deployment_name?: string
  agent_deployment_names?: any[]
  agent_name?: string
  agent_uuid?: string
  agent_uuids?: any[]
  agent_version_hash?: string
  agent_workspace_uuid?: string
  created_by_user_email?: string
  created_by_user_id?: string
  error_description?: string
  evaluation_run_uuid?: string
  evaluation_run_uuids?: any[]
  evaluation_test_case_workspace_uuid?: string
  finished_at?: string
  pass_status?: boolean
  queued_at?: string
  run_level_metric_results?: any[]
  run_name?: string
  star_metric_result?: Record<string, any>
  started_at?: string
  status?: string
  test_case_description?: string
  test_case_name?: string
  test_case_uuid?: string
  test_case_version?: number
}

export interface ApiGetEvaluationRunOutputLoadMatch {
  evaluation_run_uuid: string
}

export interface ApiGetEvaluationRunOutputCreateData {
  agent_deleted?: boolean
  agent_deployment_name?: string
  agent_deployment_names?: any[]
  agent_name?: string
  agent_uuid?: string
  agent_uuids?: any[]
  agent_version_hash?: string
  agent_workspace_uuid?: string
  created_by_user_email?: string
  created_by_user_id?: string
  error_description?: string
  evaluation_run_uuid?: string
  evaluation_run_uuids?: any[]
  evaluation_test_case_workspace_uuid?: string
  finished_at?: string
  pass_status?: boolean
  queued_at?: string
  run_level_metric_results?: any[]
  run_name?: string
  star_metric_result?: Record<string, any>
  started_at?: string
  status?: string
  test_case_description?: string
  test_case_name?: string
  test_case_uuid?: string
  test_case_version?: number
}

export interface ApiGetEvaluationRunResultsOutput {
  evaluation_trace_spans?: any[]
  ground_truth?: string
  input?: string
  input_tokens?: string
  output?: string
  output_tokens?: string
  prompt_chunks?: any[]
  prompt_id?: number
  prompt_level_metric_results?: any[]
  trace_id?: string
}

export interface ApiGetEvaluationRunResultsOutputListMatch {
  evaluation_run_id: string
  page?: number
  per_page?: number
}

export interface ApiGetEvaluationTestCaseOutput {
  agent_workspace_name?: string
  archived_at?: string
  created_at?: string
  created_by_user_email?: string
  created_by_user_id?: string
  dataset?: Record<string, any>
  dataset_name?: string
  dataset_uuid?: string
  description?: string
  latest_version_number_of_runs?: number
  metrics?: any[]
  name?: string
  star_metric?: Record<string, any>
  test_case_uuid?: string
  total_runs?: number
  updated_at?: string
  updated_by_user_email?: string
  updated_by_user_id?: string
  version?: number
  workspace_uuid?: string
}

export interface ApiGetEvaluationTestCaseOutputLoadMatch {
  test_case_uuid: string
  evaluation_test_case_version?: number
}

export interface ApiGetEvaluationTestCaseOutputListMatch {
  agent_workspace_name?: string
  archived_at?: string
  created_at?: string
  created_by_user_email?: string
  created_by_user_id?: string
  dataset?: Record<string, any>
  dataset_name?: string
  dataset_uuid?: string
  description?: string
  latest_version_number_of_runs?: number
  metrics?: any[]
  name?: string
  star_metric?: Record<string, any>
  test_case_uuid?: string
  total_runs?: number
  updated_at?: string
  updated_by_user_email?: string
  updated_by_user_id?: string
  version?: number
  workspace_uuid?: string
}

export interface ApiGetEvaluationTestCaseOutputCreateData {
  agent_workspace_name?: string
  archived_at?: string
  created_at?: string
  created_by_user_email?: string
  created_by_user_id?: string
  dataset?: Record<string, any>
  dataset_name?: string
  dataset_uuid?: string
  description?: string
  latest_version_number_of_runs?: number
  metrics?: any[]
  name?: string
  star_metric?: Record<string, any>
  test_case_uuid?: string
  total_runs?: number
  updated_at?: string
  updated_by_user_email?: string
  updated_by_user_id?: string
  version?: number
  workspace_uuid?: string
}

export interface ApiGetIndexingJobDetailsSignedUrlOutput {
  signed_url?: string
}

export interface ApiGetIndexingJobDetailsSignedUrlOutputLoadMatch {
  indexing_job_id: string
}

export interface ApiGetKnowledgeBaseIndexingJobOutput {
  completed_datasources?: number
  created_at?: string
  data_source_jobs?: any[]
  data_source_uuids?: any[]
  finished_at?: string
  is_report_available?: boolean
  knowledge_base_uuid?: string
  phase?: string
  started_at?: string
  status?: string
  tokens?: number
  total_datasources?: number
  total_tokens?: string
  updated_at?: string
  uuid?: string
}

export interface ApiGetKnowledgeBaseIndexingJobOutputLoadMatch {
  uuid: string
}

export interface ApiGetKnowledgeBaseIndexingJobOutputListMatch {
  page?: number
  per_page?: number
}

export interface ApiGetKnowledgeBaseIndexingJobOutputCreateData {
  completed_datasources?: number
  created_at?: string
  data_source_jobs?: any[]
  data_source_uuids?: any[]
  finished_at?: string
  is_report_available?: boolean
  knowledge_base_uuid?: string
  phase?: string
  started_at?: string
  status?: string
  tokens?: number
  total_datasources?: number
  total_tokens?: string
  updated_at?: string
  uuid?: string
}

export interface ApiGetKnowledgeBaseIndexingJobOutputUpdateData {
  uuid: string
  completed_datasources?: number
  created_at?: string
  data_source_jobs?: any[]
  data_source_uuids?: any[]
  finished_at?: string
  is_report_available?: boolean
  knowledge_base_uuid?: string
  phase?: string
  started_at?: string
  status?: string
  tokens?: number
  total_datasources?: number
  total_tokens?: string
  updated_at?: string

  // Selects a custom action instead of the plain update:
  //   'cancel'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface ApiGetKnowledgeBaseOutput {
  database_status?: string
  knowledge_base?: Record<string, any>
}

export interface ApiGetKnowledgeBaseOutputLoadMatch {
  uuid: string
}

export interface ApiGetModelEvaluationRunOutput {
  links?: Record<string, any>
  meta?: Record<string, any>
  results?: any[]
  run?: Record<string, any>
}

export interface ApiGetModelEvaluationRunOutputLoadMatch {
  eval_run_uuid: string
  page?: number
  per_page?: number
}

export interface ApiGetModelEvaluationRunOutputUpdateData {
  eval_run_uuid: string
  links?: Record<string, any>
  meta?: Record<string, any>
  results?: any[]
  run?: Record<string, any>

  // Selects a custom action instead of the plain update:
  //   'cancel'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface ApiGetModelEvaluationRunResultsDownloadUrlOutput {
  download_url?: string
  expires_at?: string
}

export interface ApiGetModelEvaluationRunResultsDownloadUrlOutputLoadMatch {
  model_evaluation_run_id: string
}

export interface ApiGetModelRouterOutput {
  config?: Record<string, any>
  created_at?: string
  description?: string
  fallback_models?: any[]
  name?: string
  policies?: any[]
  regions?: any[]
  updated_at?: string
  uuid?: string
}

export interface ApiGetModelRouterOutputLoadMatch {
  uuid: string
}

export interface ApiGetModelRouterOutputListMatch {
  page?: number
  per_page?: number
}

export interface ApiGetModelRouterOutputCreateData {
  config?: Record<string, any>
  created_at?: string
  description?: string
  fallback_models?: any[]
  name?: string
  policies?: any[]
  regions?: any[]
  updated_at?: string
  uuid?: string
}

export interface ApiGetOpenAiapiKeyOutput {
  created_at?: string
  created_by?: string
  deleted_at?: string
  models?: any[]
  name?: string
  updated_at?: string
  uuid?: string
}

export interface ApiGetOpenAiapiKeyOutputLoadMatch {
  api_key_uuid: string
}

export interface ApiGetScenarioSetDownloadUrlOutput {
  download_url?: string
  expires_at?: string
}

export interface ApiGetScenarioSetDownloadUrlOutputLoadMatch {
  scenario_set_id: string
}

export interface ApiGetScenarioSetOutput {
  bucket_name?: string
  bucket_region?: string
  created_at?: string
  deleted_at?: string
  description?: string
  failure_reason?: string
  file_upload_scenario_set?: any
  generator_model_uuid?: string
  library_scenario_uuid?: string
  name?: string
  scenario_count?: number
  scenario_set_uuid?: string
  scenarios?: any[]
  source_export_id?: string
  source_goal_description?: string
  source_kind?: string
  spaces_key?: string
  status?: string
  updated_at?: string
  workflow_uuid?: string
}

export interface ApiGetScenarioSetOutputLoadMatch {
  scenario_set_uuid: string
}

export interface ApiGetScenarioSetOutputListMatch {
  page?: number
  per_page?: number
  search?: string
  sort_by?: string
  sort_direction?: string
  source_kind?: any[]
  status?: any[]
}

export interface ApiGetScenarioSetOutputCreateData {
  bucket_name?: string
  bucket_region?: string
  created_at?: string
  deleted_at?: string
  description?: string
  failure_reason?: string
  file_upload_scenario_set?: any
  generator_model_uuid?: string
  library_scenario_uuid?: string
  name?: string
  scenario_count?: number
  scenario_set_uuid?: string
  scenarios?: any[]
  source_export_id?: string
  source_goal_description?: string
  source_kind?: string
  spaces_key?: string
  status?: string
  updated_at?: string
  workflow_uuid?: string

  // Selects a custom action instead of the plain create:
  //   'duplicate'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface ApiGetScheduledIndexingOutput {
  created_at?: string
  days?: any[]
  deleted_at?: string
  is_active?: boolean
  knowledge_base_uuid?: string
  last_ran_at?: string
  next_run_at?: string
  time?: string
  updated_at?: string
  uuid?: string
}

export interface ApiGetScheduledIndexingOutputLoadMatch {
  knowledge_base_uuid: string
}

export interface ApiGetSimulationJourneyTrajectoryUrlOutput {
  download_url?: string
  expires_at?: string
}

export interface ApiGetSimulationJourneyTrajectoryUrlOutputLoadMatch {
  journey_id: string
  simulation_run_id: string
}

export interface ApiGetSimulationRunOutput {
  scenario_results?: any[]
  simulation_run?: Record<string, any>
}

export interface ApiGetSimulationRunOutputLoadMatch {
  run_uuid: string
}

export interface ApiGetSimulationRunOutputUpdateData {
  run_uuid: string
  scenario_results?: any[]
  simulation_run?: Record<string, any>

  // Selects a custom action instead of the plain update:
  //   'cancel'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface ApiGetWorkspaceOutput {
  agent_uuids?: any[]
  agents?: any[]
  created_at?: string
  created_by?: string
  created_by_email?: string
  deleted_at?: string
  description?: string
  evaluation_test_cases?: any[]
  name?: string
  updated_at?: string
  uuid?: string
}

export interface ApiGetWorkspaceOutputLoadMatch {
  workspace_uuid: string
}

export interface ApiGetWorkspaceOutputListMatch {
  agent_uuids?: any[]
  agents?: any[]
  created_at?: string
  created_by?: string
  created_by_email?: string
  deleted_at?: string
  description?: string
  evaluation_test_cases?: any[]
  name?: string
  updated_at?: string
  uuid?: string
}

export interface ApiGetWorkspaceOutputCreateData {
  agent_uuids?: any[]
  agents?: any[]
  created_at?: string
  created_by?: string
  created_by_email?: string
  deleted_at?: string
  description?: string
  evaluation_test_cases?: any[]
  name?: string
  updated_at?: string
  uuid?: string
}

export interface ApiImportCustomModelOutputPublic {
  accept_hf_token_storage?: boolean
  accept_terms_and_conditions?: boolean
  description?: string
  error?: string
  import_job?: Record<string, any>
  model?: Record<string, any>
  name?: string
  preferred_gpu_region?: string
  source_ref?: Record<string, any>
  source_type?: string
  tags?: Record<string, any>
  validation_steps?: any[]
}

export interface ApiImportCustomModelOutputPublicCreateData {
  accept_hf_token_storage?: boolean
  accept_terms_and_conditions?: boolean
  description?: string
  error?: string
  import_job?: Record<string, any>
  model?: Record<string, any>
  name?: string
  preferred_gpu_region?: string
  source_ref?: Record<string, any>
  source_type?: string
  tags?: Record<string, any>
  validation_steps?: any[]
}

export interface ApiIndexedDataSource {
  completed_at?: string
  data_source_uuid?: string
  error_details?: string
  error_msg?: string
  failed_item_count?: string
  indexed_file_count?: string
  indexed_item_count?: string
  removed_item_count?: string
  skipped_item_count?: string
  started_at?: string
  status?: string
  total_bytes?: string
  total_bytes_indexed?: string
  total_file_count?: string
}

export interface ApiIndexedDataSourceListMatch {
  indexing_job_id: string
}

export interface ApiLinkAgentFunctionOutput {
  agent_uuid?: string
  anthropic_api_key?: Record<string, any>
  api_key_infos?: any[]
  api_keys?: any[]
  chatbot?: Record<string, any>
  chatbot_identifiers?: any[]
  child_agents?: any[]
  conversation_logs_enabled?: boolean
  created_at?: string
  deployment?: Record<string, any>
  description?: string
  faas_name?: string
  faas_namespace?: string
  function_name?: string
  functions?: any[]
  guardrails?: any[]
  if_case?: string
  input_schema?: Record<string, any>
  instruction?: string
  k?: number
  knowledge_bases?: any[]
  logging_config?: Record<string, any>
  max_tokens?: number
  mcp_servers?: any[]
  model?: Record<string, any>
  model_provider_key?: Record<string, any>
  model_router?: Record<string, any>
  name?: string
  openai_api_key?: Record<string, any>
  output_schema?: Record<string, any>
  parent_agents?: any[]
  project_id?: string
  provide_citations?: boolean
  reasoning_effort?: string
  region?: string
  retrieval_method?: string
  route_created_at?: string
  route_created_by?: string
  route_name?: string
  route_uuid?: string
  tags?: any[]
  temperature?: number
  template?: Record<string, any>
  thinking_token_budget?: number
  top_p?: number
  updated_at?: string
  url?: string
  user_id?: string
  uuid?: string
  version_hash?: string
  vpc_egress_ips?: any[]
  vpc_uuid?: string
  web_fetch_enabled?: boolean
  web_search_enabled?: boolean
  workspace?: Record<string, any>
}

export interface ApiLinkAgentFunctionOutputCreateData {
  agent_id: string
  agent_uuid?: string
  anthropic_api_key?: Record<string, any>
  api_key_infos?: any[]
  api_keys?: any[]
  chatbot?: Record<string, any>
  chatbot_identifiers?: any[]
  child_agents?: any[]
  conversation_logs_enabled?: boolean
  created_at?: string
  deployment?: Record<string, any>
  description?: string
  faas_name?: string
  faas_namespace?: string
  function_name?: string
  functions?: any[]
  guardrails?: any[]
  if_case?: string
  input_schema?: Record<string, any>
  instruction?: string
  k?: number
  knowledge_bases?: any[]
  logging_config?: Record<string, any>
  max_tokens?: number
  mcp_servers?: any[]
  model?: Record<string, any>
  model_provider_key?: Record<string, any>
  model_router?: Record<string, any>
  name?: string
  openai_api_key?: Record<string, any>
  output_schema?: Record<string, any>
  parent_agents?: any[]
  project_id?: string
  provide_citations?: boolean
  reasoning_effort?: string
  region?: string
  retrieval_method?: string
  route_created_at?: string
  route_created_by?: string
  route_name?: string
  route_uuid?: string
  tags?: any[]
  temperature?: number
  template?: Record<string, any>
  thinking_token_budget?: number
  top_p?: number
  updated_at?: string
  url?: string
  user_id?: string
  uuid?: string
  version_hash?: string
  vpc_egress_ips?: any[]
  vpc_uuid?: string
  web_fetch_enabled?: boolean
  web_search_enabled?: boolean
  workspace?: Record<string, any>
}

export interface ApiLinkAgentGuardrailOutput {
  agent_uuid?: string
  anthropic_api_key?: Record<string, any>
  api_key_infos?: any[]
  api_keys?: any[]
  chatbot?: Record<string, any>
  chatbot_identifiers?: any[]
  child_agents?: any[]
  conversation_logs_enabled?: boolean
  created_at?: string
  deployment?: Record<string, any>
  description?: string
  functions?: any[]
  guardrails?: any[]
  if_case?: string
  instruction?: string
  k?: number
  knowledge_bases?: any[]
  logging_config?: Record<string, any>
  max_tokens?: number
  mcp_servers?: any[]
  model?: Record<string, any>
  model_provider_key?: Record<string, any>
  model_router?: Record<string, any>
  name?: string
  openai_api_key?: Record<string, any>
  parent_agents?: any[]
  project_id?: string
  provide_citations?: boolean
  reasoning_effort?: string
  region?: string
  retrieval_method?: string
  route_created_at?: string
  route_created_by?: string
  route_name?: string
  route_uuid?: string
  tags?: any[]
  temperature?: number
  template?: Record<string, any>
  thinking_token_budget?: number
  top_p?: number
  updated_at?: string
  url?: string
  user_id?: string
  uuid?: string
  version_hash?: string
  vpc_egress_ips?: any[]
  vpc_uuid?: string
  web_fetch_enabled?: boolean
  web_search_enabled?: boolean
  workspace?: Record<string, any>
}

export interface ApiLinkAgentGuardrailOutputCreateData {
  agent_id: string
  agent_uuid?: string
  anthropic_api_key?: Record<string, any>
  api_key_infos?: any[]
  api_keys?: any[]
  chatbot?: Record<string, any>
  chatbot_identifiers?: any[]
  child_agents?: any[]
  conversation_logs_enabled?: boolean
  created_at?: string
  deployment?: Record<string, any>
  description?: string
  functions?: any[]
  guardrails?: any[]
  if_case?: string
  instruction?: string
  k?: number
  knowledge_bases?: any[]
  logging_config?: Record<string, any>
  max_tokens?: number
  mcp_servers?: any[]
  model?: Record<string, any>
  model_provider_key?: Record<string, any>
  model_router?: Record<string, any>
  name?: string
  openai_api_key?: Record<string, any>
  parent_agents?: any[]
  project_id?: string
  provide_citations?: boolean
  reasoning_effort?: string
  region?: string
  retrieval_method?: string
  route_created_at?: string
  route_created_by?: string
  route_name?: string
  route_uuid?: string
  tags?: any[]
  temperature?: number
  template?: Record<string, any>
  thinking_token_budget?: number
  top_p?: number
  updated_at?: string
  url?: string
  user_id?: string
  uuid?: string
  version_hash?: string
  vpc_egress_ips?: any[]
  vpc_uuid?: string
  web_fetch_enabled?: boolean
  web_search_enabled?: boolean
  workspace?: Record<string, any>
}

export interface ApiLinkAgentOutput {
  child_agent_uuid?: string
  if_case?: string
  parent_agent_uuid?: string
  route_name?: string
}

export interface ApiLinkAgentOutputCreateData {
  agent_id: string
  child_agent_uuid: string
  if_case?: string
  parent_agent_uuid?: string
  route_name?: string
}

export interface ApiLinkKnowledgeBaseOutput {
  anthropic_api_key?: Record<string, any>
  api_key_infos?: any[]
  api_keys?: any[]
  chatbot?: Record<string, any>
  chatbot_identifiers?: any[]
  child_agents?: any[]
  conversation_logs_enabled?: boolean
  created_at?: string
  deployment?: Record<string, any>
  description?: string
  functions?: any[]
  guardrails?: any[]
  if_case?: string
  instruction?: string
  k?: number
  knowledge_bases?: any[]
  logging_config?: Record<string, any>
  max_tokens?: number
  mcp_servers?: any[]
  model?: Record<string, any>
  model_provider_key?: Record<string, any>
  model_router?: Record<string, any>
  name?: string
  openai_api_key?: Record<string, any>
  parent_agents?: any[]
  project_id?: string
  provide_citations?: boolean
  reasoning_effort?: string
  region?: string
  retrieval_method?: string
  route_created_at?: string
  route_created_by?: string
  route_name?: string
  route_uuid?: string
  tags?: any[]
  temperature?: number
  template?: Record<string, any>
  thinking_token_budget?: number
  top_p?: number
  updated_at?: string
  url?: string
  user_id?: string
  uuid?: string
  version_hash?: string
  vpc_egress_ips?: any[]
  vpc_uuid?: string
  web_fetch_enabled?: boolean
  web_search_enabled?: boolean
  workspace?: Record<string, any>
}

export interface ApiLinkKnowledgeBaseOutputCreateData {
  agent_id: string
  knowledge_base_uuid?: string
  anthropic_api_key?: Record<string, any>
  api_key_infos?: any[]
  api_keys?: any[]
  chatbot?: Record<string, any>
  chatbot_identifiers?: any[]
  child_agents?: any[]
  conversation_logs_enabled?: boolean
  created_at?: string
  deployment?: Record<string, any>
  description?: string
  functions?: any[]
  guardrails?: any[]
  if_case?: string
  instruction?: string
  k?: number
  knowledge_bases?: any[]
  logging_config?: Record<string, any>
  max_tokens?: number
  mcp_servers?: any[]
  model?: Record<string, any>
  model_provider_key?: Record<string, any>
  model_router?: Record<string, any>
  name?: string
  openai_api_key?: Record<string, any>
  parent_agents?: any[]
  project_id?: string
  provide_citations?: boolean
  reasoning_effort?: string
  region?: string
  retrieval_method?: string
  route_created_at?: string
  route_created_by?: string
  route_name?: string
  route_uuid?: string
  tags?: any[]
  temperature?: number
  template?: Record<string, any>
  thinking_token_budget?: number
  top_p?: number
  updated_at?: string
  url?: string
  user_id?: string
  uuid?: string
  version_hash?: string
  vpc_egress_ips?: any[]
  vpc_uuid?: string
  web_fetch_enabled?: boolean
  web_search_enabled?: boolean
  workspace?: Record<string, any>
}

export interface ApiListAgentApiKeysOutput {
  created_at?: string
  created_by?: string
  deleted_at?: string
  name?: string
  secret_key?: string
  uuid?: string
}

export interface ApiListAgentApiKeysOutputListMatch {
  agent_id: string
  page?: number
  per_page?: number
}

export interface ApiListAgentsByAnthropicKeyOutput {
  anthropic_api_key?: Record<string, any>
  api_key_infos?: any[]
  api_keys?: any[]
  chatbot?: Record<string, any>
  chatbot_identifiers?: any[]
  child_agents?: any[]
  conversation_logs_enabled?: boolean
  created_at?: string
  deployment?: Record<string, any>
  description?: string
  functions?: any[]
  guardrails?: any[]
  if_case?: string
  instruction?: string
  k?: number
  knowledge_bases?: any[]
  logging_config?: Record<string, any>
  max_tokens?: number
  mcp_servers?: any[]
  model?: Record<string, any>
  model_provider_key?: Record<string, any>
  model_router?: Record<string, any>
  name?: string
  openai_api_key?: Record<string, any>
  parent_agents?: any[]
  project_id?: string
  provide_citations?: boolean
  reasoning_effort?: string
  region?: string
  retrieval_method?: string
  route_created_at?: string
  route_created_by?: string
  route_name?: string
  route_uuid?: string
  tags?: any[]
  temperature?: number
  template?: Record<string, any>
  thinking_token_budget?: number
  top_p?: number
  updated_at?: string
  url?: string
  user_id?: string
  uuid?: string
  version_hash?: string
  vpc_egress_ips?: any[]
  vpc_uuid?: string
  web_fetch_enabled?: boolean
  web_search_enabled?: boolean
  workspace?: Record<string, any>
}

export interface ApiListAgentsByAnthropicKeyOutputListMatch {
  key_id: string
  page?: number
  per_page?: number
}

export interface ApiListAgentsByOpenAiKeyOutput {
  anthropic_api_key?: Record<string, any>
  api_key_infos?: any[]
  api_keys?: any[]
  chatbot?: Record<string, any>
  chatbot_identifiers?: any[]
  child_agents?: any[]
  conversation_logs_enabled?: boolean
  created_at?: string
  deployment?: Record<string, any>
  description?: string
  functions?: any[]
  guardrails?: any[]
  if_case?: string
  instruction?: string
  k?: number
  knowledge_bases?: any[]
  logging_config?: Record<string, any>
  max_tokens?: number
  mcp_servers?: any[]
  model?: Record<string, any>
  model_provider_key?: Record<string, any>
  model_router?: Record<string, any>
  name?: string
  openai_api_key?: Record<string, any>
  parent_agents?: any[]
  project_id?: string
  provide_citations?: boolean
  reasoning_effort?: string
  region?: string
  retrieval_method?: string
  route_created_at?: string
  route_created_by?: string
  route_name?: string
  route_uuid?: string
  tags?: any[]
  temperature?: number
  template?: Record<string, any>
  thinking_token_budget?: number
  top_p?: number
  updated_at?: string
  url?: string
  user_id?: string
  uuid?: string
  version_hash?: string
  vpc_egress_ips?: any[]
  vpc_uuid?: string
  web_fetch_enabled?: boolean
  web_search_enabled?: boolean
  workspace?: Record<string, any>
}

export interface ApiListAgentsByOpenAiKeyOutputListMatch {
  key_id: string
  page?: number
  per_page?: number
}

export interface ApiListAgentsByWorkspaceOutput {
  anthropic_api_key?: Record<string, any>
  api_key_infos?: any[]
  api_keys?: any[]
  chatbot?: Record<string, any>
  chatbot_identifiers?: any[]
  child_agents?: any[]
  conversation_logs_enabled?: boolean
  created_at?: string
  deployment?: Record<string, any>
  description?: string
  functions?: any[]
  guardrails?: any[]
  if_case?: string
  instruction?: string
  k?: number
  knowledge_bases?: any[]
  logging_config?: Record<string, any>
  max_tokens?: number
  mcp_servers?: any[]
  model?: Record<string, any>
  model_provider_key?: Record<string, any>
  model_router?: Record<string, any>
  name?: string
  openai_api_key?: Record<string, any>
  parent_agents?: any[]
  project_id?: string
  provide_citations?: boolean
  reasoning_effort?: string
  region?: string
  retrieval_method?: string
  route_created_at?: string
  route_created_by?: string
  route_name?: string
  route_uuid?: string
  tags?: any[]
  temperature?: number
  template?: Record<string, any>
  thinking_token_budget?: number
  top_p?: number
  updated_at?: string
  url?: string
  user_id?: string
  uuid?: string
  version_hash?: string
  vpc_egress_ips?: any[]
  vpc_uuid?: string
  web_fetch_enabled?: boolean
  web_search_enabled?: boolean
  workspace?: Record<string, any>
}

export interface ApiListAgentsByWorkspaceOutputListMatch {
  workspace_id: string
  only_deployed?: boolean
  page?: number
  per_page?: number
}

export interface ApiListEvaluationMetricsOutput {
  associated_presets?: any[]
  category?: string
  custom_eval_config?: Record<string, any>
  description?: string
  evaluation_scope?: string
  inverted?: boolean
  is_metric_goal?: boolean
  metric_name?: string
  metric_rank?: number
  metric_type?: string
  metric_uuid?: string
  metric_value_type?: string
  range_max?: number
  range_min?: number
  source?: string
}

export interface ApiListEvaluationMetricsOutputListMatch {
  associated_presets?: any[]
  category?: string
  custom_eval_config?: Record<string, any>
  description?: string
  evaluation_scope?: string
  inverted?: boolean
  is_metric_goal?: boolean
  metric_name?: string
  metric_rank?: number
  metric_type?: string
  metric_uuid?: string
  metric_value_type?: string
  range_max?: number
  range_min?: number
  source?: string
}

export interface ApiListEvaluationRunsByTestCaseOutput {
  agent_deleted?: boolean
  agent_deployment_name?: string
  agent_name?: string
  agent_uuid?: string
  agent_version_hash?: string
  agent_workspace_uuid?: string
  created_by_user_email?: string
  created_by_user_id?: string
  error_description?: string
  evaluation_run_uuid?: string
  evaluation_test_case_workspace_uuid?: string
  finished_at?: string
  pass_status?: boolean
  queued_at?: string
  run_level_metric_results?: any[]
  run_name?: string
  star_metric_result?: Record<string, any>
  started_at?: string
  status?: string
  test_case_description?: string
  test_case_name?: string
  test_case_uuid?: string
  test_case_version?: number
}

export interface ApiListEvaluationRunsByTestCaseOutputListMatch {
  evaluation_test_case_id: string
  evaluation_test_case_version?: number
}

export interface ApiListEvaluationTestCasesByWorkspaceOutput {
  archived_at?: string
  created_at?: string
  created_by_user_email?: string
  created_by_user_id?: string
  dataset?: Record<string, any>
  dataset_name?: string
  dataset_uuid?: string
  description?: string
  latest_version_number_of_runs?: number
  metrics?: any[]
  name?: string
  star_metric?: Record<string, any>
  test_case_uuid?: string
  total_runs?: number
  updated_at?: string
  updated_by_user_email?: string
  updated_by_user_id?: string
  version?: number
}

export interface ApiListEvaluationTestCasesByWorkspaceOutputListMatch {
  workspace_id: string
}

export interface ApiListKnowledgeBaseDataSourcesOutput {
  aws_data_source?: Record<string, any>
  bucket_name?: string
  chunking_algorithm?: string
  chunking_options?: Record<string, any>
  created_at?: string
  dropbox_data_source?: Record<string, any>
  file_upload_data_source?: Record<string, any>
  google_drive_data_source?: Record<string, any>
  item_path?: string
  last_datasource_indexing_job?: Record<string, any>
  region?: string
  spaces_data_source?: Record<string, any>
  updated_at?: string
  uuid?: string
  web_crawler_data_source?: Record<string, any>
}

export interface ApiListKnowledgeBaseDataSourcesOutputListMatch {
  knowledge_base_id: string
  page?: number
  per_page?: number
}

export interface ApiListKnowledgeBaseIndexingJobsOutput {
  completed_datasources?: number
  created_at?: string
  data_source_jobs?: any[]
  data_source_uuids?: any[]
  finished_at?: string
  is_report_available?: boolean
  knowledge_base_uuid?: string
  phase?: string
  started_at?: string
  status?: string
  tokens?: number
  total_datasources?: number
  total_tokens?: string
  updated_at?: string
  uuid?: string
}

export interface ApiListKnowledgeBaseIndexingJobsOutputListMatch {
  knowledge_base_id: string
}

export interface ApiListModelEvaluationMetricsOutput {
  associated_presets?: any[]
  category?: string
  custom_eval_config?: Record<string, any>
  description?: string
  evaluation_scope?: string
  inverted?: boolean
  is_metric_goal?: boolean
  metric_name?: string
  metric_rank?: number
  metric_type?: string
  metric_uuid?: string
  metric_value_type?: string
  range_max?: number
  range_min?: number
  source?: string
}

export interface ApiListModelEvaluationMetricsOutputListMatch {
  associated_presets?: any[]
  category?: string
  custom_eval_config?: Record<string, any>
  description?: string
  evaluation_scope?: string
  inverted?: boolean
  is_metric_goal?: boolean
  metric_name?: string
  metric_rank?: number
  metric_type?: string
  metric_uuid?: string
  metric_value_type?: string
  range_max?: number
  range_min?: number
  source?: string
}

export interface ApiListScenarioLibraryOutput {
  category?: string
  created_at?: string
  description?: string
  goal_description?: string
  library_scenario_uuid?: string
  name?: string
  scenario_count?: number
  status?: string
  updated_at?: string
}

export interface ApiListScenarioLibraryOutputListMatch {
  category?: string
  page?: number
  per_page?: number
  search?: string
  sort_by?: string
  sort_direction?: string
}

export interface ApiListScenariosOutput {
  description?: string
  exploration_budget?: number
  max_turns?: number
  name?: string
  scenario_uuid?: string
  stopping_criteria?: any[]
  user_persona?: string
}

export interface ApiListScenariosOutputListMatch {
  scenario_library_id: string
  page?: number
  per_page?: number
  search?: string
  sort_by?: string
  sort_direction?: string
}

export interface ApiListSimulationJourneysOutput {
  created_at?: string
  duration_sec?: string
  failure_reason?: string
  journey_index?: number
  journey_uuid?: string
  judge_reasoning?: string
  run_uuid?: string
  scenario_uuid?: string
  session_id?: string
  status?: string
  token_usage?: Record<string, any>
  trajectory_bucket_name?: string
  trajectory_bucket_region?: string
  trajectory_spaces_key?: string
  updated_at?: string
  verdict?: string
}

export interface ApiListSimulationJourneysOutputListMatch {
  simulation_run_id: string
  page?: number
  per_page?: number
  scenario_uuid?: string
  search?: string
  sort_by?: string
  sort_direction?: string
  status?: any[]
  verdict?: any[]
}

export interface ApiModelCatalogCard {
  availability?: any[]
  badges?: any[]
  benchmark_score?: Record<string, any>
  capabilities?: any[]
  code_snippets?: Record<string, any>
  context_window?: string
  created_at?: string
  creator?: string
  description?: string
  hugging_face_id?: string
  id?: string
  max_output_tokens?: string
  modalities?: Record<string, any>
  model_id?: string
  name?: string
  parameter_count?: number
  pricing?: Record<string, any>
  pricing_detail?: Record<string, any>
  provider?: string
  scaled_pricing_enabled?: boolean
  short_description?: string
  type?: string
}

export interface ApiModelCatalogCardLoadMatch {
  id: string
  model_id?: string
}

export interface ApiModelCatalogCardListMatch {
  availability?: any[]
  badge?: any[]
  limit?: number
  model_type?: any[]
  page?: number
  per_page?: number
  provider?: any[]
  search?: string
  sort_by?: string
  sort_direction?: string
  use_case?: string
}

export interface ApiModelEvaluationPreset {
  candidate_inference_config?: Record<string, any>
  candidate_model_name?: string
  candidate_model_source?: string
  candidate_model_uuid?: string
  candidate_system_prompt?: string
  created_at?: string
  dataset_name?: string
  dataset_uuid?: string
  eval_preset_uuid?: string
  id?: string
  judge_model_name?: string
  judge_model_uuid?: string
  metrics?: any[]
  name?: string
  saved_sections?: any[]
  star_metric?: Record<string, any>
}

export interface ApiModelEvaluationPresetLoadMatch {
  id: string
}

export interface ApiModelEvaluationPresetListMatch {
  candidate_inference_config?: Record<string, any>
  candidate_model_name?: string
  candidate_model_source?: string
  candidate_model_uuid?: string
  candidate_system_prompt?: string
  created_at?: string
  dataset_name?: string
  dataset_uuid?: string
  eval_preset_uuid?: string
  id?: string
  judge_model_name?: string
  judge_model_uuid?: string
  metrics?: any[]
  name?: string
  saved_sections?: any[]
  star_metric?: Record<string, any>
}

export interface ApiModelPublic {
  agreement?: Record<string, any>
  benchmark_score?: Record<string, any>
  capabilities?: any[]
  context_window?: string
  created_at?: string
  description?: string
  endpoints?: any[]
  id?: string
  is_foundational?: boolean
  kb_default_chunk_size?: number
  kb_max_chunk_size?: number
  kb_min_chunk_size?: number
  lifecycle_status?: string
  modalities?: Record<string, any>
  model_availability?: string
  name?: string
  parameter_count?: number
  parent_uuid?: string
  pricing?: Record<string, any>
  provider?: string
  reasoning_efforts?: any[]
  settings?: any[]
  thinking?: boolean
  type?: string
  updated_at?: string
  upload_complete?: boolean
  url?: string
  uuid?: string
  version?: Record<string, any>
}

export interface ApiModelPublicListMatch {
  page?: number
  per_page?: number
  public_only?: boolean
  usecase?: any[]
}

export interface ApiModelRouterPreset {
  config?: Record<string, any>
  display_name?: string
  long_description?: string
  short_description?: string
  slug?: string
}

export interface ApiModelRouterPresetListMatch {
  page?: number
  per_page?: number
}

export interface ApiModelRouterTaskPreset {
  category?: string
  description?: string
  models?: any[]
  name?: string
  selection_policy?: Record<string, any>
  tags?: any[]
  task_slug?: string
}

export interface ApiModelRouterTaskPresetListMatch {
  page?: number
  per_page?: number
}

export interface ApiMoveAgentsToWorkspaceOutput {
  agent_uuids?: any[]
  agents?: any[]
  created_at?: string
  created_by?: string
  created_by_email?: string
  deleted_at?: string
  description?: string
  evaluation_test_cases?: any[]
  name?: string
  updated_at?: string
  uuid?: string
  workspace_uuid?: string
}

export interface ApiMoveAgentsToWorkspaceOutputUpdateData {
  workspace_id: string
  agent_uuids?: any[]
  agents?: any[]
  created_at?: string
  created_by?: string
  created_by_email?: string
  deleted_at?: string
  description?: string
  evaluation_test_cases?: any[]
  name?: string
  updated_at?: string
  uuid?: string
  workspace_uuid?: string
}

export interface ApiPrompt {
  evaluation_trace_spans?: any[]
  ground_truth?: string
  input?: string
  input_tokens?: string
  output?: string
  output_tokens?: string
  prompt_chunks?: any[]
  prompt_id?: number
  prompt_level_metric_results?: any[]
  trace_id?: string
}

export interface ApiPromptLoadMatch {
  evaluation_run_id: string
  prompt_id: number
}

export interface ApiRollbackToAgentVersionOutput {
  audit_header?: Record<string, any>
  uuid?: string
  version_hash?: string
}

export interface ApiRollbackToAgentVersionOutputUpdateData {
  agent_id: string
  audit_header?: Record<string, any>
  uuid?: string
  version_hash?: string
}

export interface ApiSimulationJourney {
  created_at?: string
  duration_sec?: string
  failure_reason?: string
  id?: string
  journey_index?: number
  journey_uuid?: string
  judge_reasoning?: string
  run_uuid?: string
  scenario_uuid?: string
  session_id?: string
  status?: string
  token_usage?: Record<string, any>
  trajectory_bucket_name?: string
  trajectory_bucket_region?: string
  trajectory_spaces_key?: string
  updated_at?: string
  verdict?: string
}

export interface ApiSimulationJourneyLoadMatch {
  id: string
  simulation_run_id: string
}

export interface ApiSimulationTrajectory {
  agent_id?: string
  completed_at?: string
  duration_sec?: string
  evaluation_metrics?: any[]
  failure_reason?: string
  journey_index?: number
  journey_uuid?: string
  judge?: Record<string, any>
  max_turns?: number
  messages?: any[]
  run_uuid?: string
  scenario_uuid?: string
  session_id?: string
  started_at?: string
  status?: string
  token_usage?: Record<string, any>
  turn_count?: number
  verdict?: string
}

export interface ApiSimulationTrajectoryLoadMatch {
  journey_id: string
  simulation_run_id: string
}

export interface ApiUnlinkAgentFunctionOutput {
}

export interface ApiUnlinkAgentFunctionOutputRemoveMatch {
  agent_id: string
  function_uuid: string
}

export interface ApiUnlinkAgentGuardrailOutput {
}

export interface ApiUnlinkAgentGuardrailOutputRemoveMatch {
  agent_id: string
  guardrail_uuid: string
}

export interface ApiUnlinkAgentOutput {
}

export interface ApiUnlinkAgentOutputRemoveMatch {
  agent_id: string
  child_agent_uuid: string
}

export interface ApiUnlinkKnowledgeBaseOutput {
}

export interface ApiUnlinkKnowledgeBaseOutputRemoveMatch {
  agent_id: string
  knowledge_base_uuid: string
}

export interface ApiUpdateAgentApiKeyOutput {
  agent_uuid?: string
  api_key_uuid?: string
  created_at?: string
  created_by?: string
  deleted_at?: string
  name?: string
  secret_key?: string
  uuid?: string
}

export interface ApiUpdateAgentApiKeyOutputUpdateData {
  agent_id: string
  api_key_uuid: string
  agent_uuid?: string
  created_at?: string
  created_by?: string
  deleted_at?: string
  name?: string
  secret_key?: string
  uuid?: string
}

export interface ApiUpdateAgentFunctionOutput {
  agent_uuid?: string
  anthropic_api_key?: Record<string, any>
  api_key_infos?: any[]
  api_keys?: any[]
  chatbot?: Record<string, any>
  chatbot_identifiers?: any[]
  child_agents?: any[]
  conversation_logs_enabled?: boolean
  created_at?: string
  deployment?: Record<string, any>
  description?: string
  faas_name?: string
  faas_namespace?: string
  function_name?: string
  function_uuid?: string
  functions?: any[]
  guardrails?: any[]
  if_case?: string
  input_schema?: Record<string, any>
  instruction?: string
  k?: number
  knowledge_bases?: any[]
  logging_config?: Record<string, any>
  max_tokens?: number
  mcp_servers?: any[]
  model?: Record<string, any>
  model_provider_key?: Record<string, any>
  model_router?: Record<string, any>
  name?: string
  openai_api_key?: Record<string, any>
  output_schema?: Record<string, any>
  parent_agents?: any[]
  project_id?: string
  provide_citations?: boolean
  reasoning_effort?: string
  region?: string
  retrieval_method?: string
  route_created_at?: string
  route_created_by?: string
  route_name?: string
  route_uuid?: string
  tags?: any[]
  temperature?: number
  template?: Record<string, any>
  thinking_token_budget?: number
  top_p?: number
  updated_at?: string
  url?: string
  user_id?: string
  uuid?: string
  version_hash?: string
  vpc_egress_ips?: any[]
  vpc_uuid?: string
  web_fetch_enabled?: boolean
  web_search_enabled?: boolean
  workspace?: Record<string, any>
}

export interface ApiUpdateAgentFunctionOutputUpdateData {
  agent_id: string
  function_uuid: string
  agent_uuid?: string
  anthropic_api_key?: Record<string, any>
  api_key_infos?: any[]
  api_keys?: any[]
  chatbot?: Record<string, any>
  chatbot_identifiers?: any[]
  child_agents?: any[]
  conversation_logs_enabled?: boolean
  created_at?: string
  deployment?: Record<string, any>
  description?: string
  faas_name?: string
  faas_namespace?: string
  function_name?: string
  functions?: any[]
  guardrails?: any[]
  if_case?: string
  input_schema?: Record<string, any>
  instruction?: string
  k?: number
  knowledge_bases?: any[]
  logging_config?: Record<string, any>
  max_tokens?: number
  mcp_servers?: any[]
  model?: Record<string, any>
  model_provider_key?: Record<string, any>
  model_router?: Record<string, any>
  name?: string
  openai_api_key?: Record<string, any>
  output_schema?: Record<string, any>
  parent_agents?: any[]
  project_id?: string
  provide_citations?: boolean
  reasoning_effort?: string
  region?: string
  retrieval_method?: string
  route_created_at?: string
  route_created_by?: string
  route_name?: string
  route_uuid?: string
  tags?: any[]
  temperature?: number
  template?: Record<string, any>
  thinking_token_budget?: number
  top_p?: number
  updated_at?: string
  url?: string
  user_id?: string
  uuid?: string
  version_hash?: string
  vpc_egress_ips?: any[]
  vpc_uuid?: string
  web_fetch_enabled?: boolean
  web_search_enabled?: boolean
  workspace?: Record<string, any>
}

export interface ApiUpdateAgentOutput {
  agent_log_insights_enabled?: boolean
  allowed_domains?: any[]
  anthropic_api_key?: Record<string, any>
  anthropic_key_uuid?: string
  api_key_infos?: any[]
  api_keys?: any[]
  chatbot?: Record<string, any>
  chatbot_identifiers?: any[]
  child_agents?: any[]
  clear_mcp_servers?: boolean
  conversation_logs_enabled?: boolean
  created_at?: string
  deployment?: Record<string, any>
  description?: string
  functions?: any[]
  guardrails?: any[]
  if_case?: string
  instruction?: string
  k?: number
  knowledge_bases?: any[]
  logging_config?: Record<string, any>
  max_tokens?: number
  mcp_servers?: any[]
  model?: Record<string, any>
  model_provider_key?: Record<string, any>
  model_provider_key_uuid?: string
  model_router?: Record<string, any>
  model_router_uuid?: string
  model_uuid?: string
  name?: string
  open_ai_key_uuid?: string
  openai_api_key?: Record<string, any>
  parent_agents?: any[]
  project_id?: string
  provide_citations?: boolean
  reasoning_effort?: string
  region?: string
  retrieval_method?: string
  route_created_at?: string
  route_created_by?: string
  route_name?: string
  route_uuid?: string
  router_preset_slug?: string
  tags?: any[]
  temperature?: number
  template?: Record<string, any>
  thinking_token_budget?: number
  top_p?: number
  updated_at?: string
  url?: string
  user_id?: string
  uuid?: string
  version_hash?: string
  vpc_egress_ips?: any[]
  vpc_uuid?: string
  web_fetch_enabled?: boolean
  web_search_enabled?: boolean
  workspace?: Record<string, any>
}

export interface ApiUpdateAgentOutputUpdateData {
  uuid: string
  agent_log_insights_enabled?: boolean
  allowed_domains?: any[]
  anthropic_api_key?: Record<string, any>
  anthropic_key_uuid?: string
  api_key_infos?: any[]
  api_keys?: any[]
  chatbot?: Record<string, any>
  chatbot_identifiers?: any[]
  child_agents?: any[]
  clear_mcp_servers?: boolean
  conversation_logs_enabled?: boolean
  created_at?: string
  deployment?: Record<string, any>
  description?: string
  functions?: any[]
  guardrails?: any[]
  if_case?: string
  instruction?: string
  k?: number
  knowledge_bases?: any[]
  logging_config?: Record<string, any>
  max_tokens?: number
  mcp_servers?: any[]
  model?: Record<string, any>
  model_provider_key?: Record<string, any>
  model_provider_key_uuid?: string
  model_router?: Record<string, any>
  model_router_uuid?: string
  model_uuid?: string
  name?: string
  open_ai_key_uuid?: string
  openai_api_key?: Record<string, any>
  parent_agents?: any[]
  project_id?: string
  provide_citations?: boolean
  reasoning_effort?: string
  region?: string
  retrieval_method?: string
  route_created_at?: string
  route_created_by?: string
  route_name?: string
  route_uuid?: string
  router_preset_slug?: string
  tags?: any[]
  temperature?: number
  template?: Record<string, any>
  thinking_token_budget?: number
  top_p?: number
  updated_at?: string
  url?: string
  user_id?: string
  version_hash?: string
  vpc_egress_ips?: any[]
  vpc_uuid?: string
  web_fetch_enabled?: boolean
  web_search_enabled?: boolean
  workspace?: Record<string, any>
}

export interface ApiUpdateAnthropicApiKeyOutput {
  api_key?: string
  api_key_uuid?: string
  created_at?: string
  created_by?: string
  deleted_at?: string
  name?: string
  updated_at?: string
  uuid?: string
}

export interface ApiUpdateAnthropicApiKeyOutputUpdateData {
  api_key_uuid: string
  api_key?: string
  created_at?: string
  created_by?: string
  deleted_at?: string
  name?: string
  updated_at?: string
  uuid?: string
}

export interface ApiUpdateCustomEvaluationMetricOutput {
  associated_presets?: any[]
  category?: string
  config?: Record<string, any>
  custom_eval_config?: Record<string, any>
  description?: string
  evaluation_scope?: string
  inverted?: boolean
  is_metric_goal?: boolean
  metric_name?: string
  metric_rank?: number
  metric_type?: string
  metric_uuid?: string
  metric_value_type?: string
  range_max?: number
  range_min?: number
  source?: string
}

export interface ApiUpdateCustomEvaluationMetricOutputCreateData {
  associated_presets?: any[]
  category?: string
  config?: Record<string, any>
  custom_eval_config?: Record<string, any>
  description?: string
  evaluation_scope?: string
  inverted?: boolean
  is_metric_goal?: boolean
  metric_name?: string
  metric_rank?: number
  metric_type?: string
  metric_uuid?: string
  metric_value_type?: string
  range_max?: number
  range_min?: number
  source?: string
}

export interface ApiUpdateCustomEvaluationMetricOutputUpdateData {
  metric_uuid: string
  associated_presets?: any[]
  category?: string
  config?: Record<string, any>
  custom_eval_config?: Record<string, any>
  description?: string
  evaluation_scope?: string
  inverted?: boolean
  is_metric_goal?: boolean
  metric_name?: string
  metric_rank?: number
  metric_type?: string
  metric_value_type?: string
  range_max?: number
  range_min?: number
  source?: string
}

export interface ApiUpdateEvaluationTestCaseOutput {
  dataset_uuid?: string
  description?: string
  metrics?: Record<string, any>
  name?: string
  star_metric?: Record<string, any>
  test_case_uuid?: string
  version?: number
}

export interface ApiUpdateEvaluationTestCaseOutputUpdateData {
  test_case_uuid: string
  dataset_uuid?: string
  description?: string
  metrics?: Record<string, any>
  name?: string
  star_metric?: Record<string, any>
  version?: number
}

export interface ApiUpdateKnowledgeBaseDataSourceOutput {
  aws_data_source?: Record<string, any>
  bucket_name?: string
  chunking_algorithm?: string
  chunking_options?: Record<string, any>
  created_at?: string
  data_source_uuid?: string
  dropbox_data_source?: Record<string, any>
  file_upload_data_source?: Record<string, any>
  google_drive_data_source?: Record<string, any>
  item_path?: string
  knowledge_base_uuid?: string
  last_datasource_indexing_job?: Record<string, any>
  region?: string
  spaces_data_source?: Record<string, any>
  updated_at?: string
  uuid?: string
  web_crawler_data_source?: Record<string, any>
}

export interface ApiUpdateKnowledgeBaseDataSourceOutputUpdateData {
  data_source_uuid: string
  knowledge_base_id: string
  aws_data_source?: Record<string, any>
  bucket_name?: string
  chunking_algorithm?: string
  chunking_options?: Record<string, any>
  created_at?: string
  dropbox_data_source?: Record<string, any>
  file_upload_data_source?: Record<string, any>
  google_drive_data_source?: Record<string, any>
  item_path?: string
  knowledge_base_uuid?: string
  last_datasource_indexing_job?: Record<string, any>
  region?: string
  spaces_data_source?: Record<string, any>
  updated_at?: string
  uuid?: string
  web_crawler_data_source?: Record<string, any>
}

export interface ApiUpdateKnowledgeBaseOutput {
  added_to_agent_at?: string
  created_at?: string
  database_id?: string
  datasources?: any[]
  embedding_model_uuid?: string
  is_public?: boolean
  last_indexing_job?: Record<string, any>
  name?: string
  project_id?: string
  region?: string
  reranking_config?: Record<string, any>
  size?: string
  tags?: any[]
  updated_at?: string
  user_id?: string
  uuid?: string
  vpc_uuid?: string
}

export interface ApiUpdateKnowledgeBaseOutputListMatch {
  page?: number
  per_page?: number
}

export interface ApiUpdateKnowledgeBaseOutputCreateData {
  added_to_agent_at?: string
  created_at?: string
  database_id?: string
  datasources?: any[]
  embedding_model_uuid?: string
  is_public?: boolean
  last_indexing_job?: Record<string, any>
  name?: string
  project_id?: string
  region?: string
  reranking_config?: Record<string, any>
  size?: string
  tags?: any[]
  updated_at?: string
  user_id?: string
  uuid?: string
  vpc_uuid?: string
}

export interface ApiUpdateKnowledgeBaseOutputUpdateData {
  uuid: string
  added_to_agent_at?: string
  created_at?: string
  database_id?: string
  datasources?: any[]
  embedding_model_uuid?: string
  is_public?: boolean
  last_indexing_job?: Record<string, any>
  name?: string
  project_id?: string
  region?: string
  reranking_config?: Record<string, any>
  size?: string
  tags?: any[]
  updated_at?: string
  user_id?: string
  vpc_uuid?: string
}

export interface ApiUpdateLinkedAgentOutput {
  child_agent_uuid?: string
  if_case?: string
  parent_agent_uuid?: string
  rollback?: boolean
  route_name?: string
  uuid?: string
}

export interface ApiUpdateLinkedAgentOutputUpdateData {
  agent_id: string
  child_agent_uuid: string
  if_case?: string
  parent_agent_uuid?: string
  rollback?: boolean
  route_name?: string
  uuid?: string
}

export interface ApiUpdateModelApiKeyOutput {
  api_key_uuid?: string
  created_at?: string
  created_by?: string
  deleted_at?: string
  name?: string
  secret_key?: string
  uuid?: string
}

export interface ApiUpdateModelApiKeyOutputUpdateData {
  api_key_uuid: string
  created_at?: string
  created_by?: string
  deleted_at?: string
  name?: string
  secret_key?: string
  uuid?: string
}

export interface ApiUpdateModelEvaluationRunOutput {
  candidate_inference_config?: Record<string, any>
  candidate_model_name?: string
  candidate_model_source?: string
  candidate_model_uuid?: string
  created_at?: string
  dataset_name?: string
  dataset_uuid?: string
  epochs?: number
  eval_preset_uuid?: string
  eval_run_uuid?: string
  judge_model_name?: string
  judge_model_uuid?: string
  metric_uuids?: any[]
  name?: string
  preset_name?: string
  preset_save_sections?: any[]
  progress?: Record<string, any>
  save_as_preset?: boolean
  source?: string
  star_metric?: Record<string, any>
  status?: string
}

export interface ApiUpdateModelEvaluationRunOutputListMatch {
  candidate_type?: any[]
  eval_preset_uuid?: string
  page?: number
  per_page?: number
  search?: string
  sort_by?: string
  sort_direction?: string
  status?: string
}

export interface ApiUpdateModelEvaluationRunOutputCreateData {
  candidate_inference_config?: Record<string, any>
  candidate_model_name?: string
  candidate_model_source?: string
  candidate_model_uuid?: string
  created_at?: string
  dataset_name?: string
  dataset_uuid?: string
  epochs?: number
  eval_preset_uuid?: string
  eval_run_uuid?: string
  judge_model_name?: string
  judge_model_uuid?: string
  metric_uuids?: any[]
  name?: string
  preset_name?: string
  preset_save_sections?: any[]
  progress?: Record<string, any>
  save_as_preset?: boolean
  source?: string
  star_metric?: Record<string, any>
  status?: string
}

export interface ApiUpdateModelEvaluationRunOutputUpdateData {
  eval_run_uuid: string
  candidate_inference_config?: Record<string, any>
  candidate_model_name?: string
  candidate_model_source?: string
  candidate_model_uuid?: string
  created_at?: string
  dataset_name?: string
  dataset_uuid?: string
  epochs?: number
  eval_preset_uuid?: string
  judge_model_name?: string
  judge_model_uuid?: string
  metric_uuids?: any[]
  name?: string
  preset_name?: string
  preset_save_sections?: any[]
  progress?: Record<string, any>
  save_as_preset?: boolean
  source?: string
  star_metric?: Record<string, any>
  status?: string
}

export interface ApiUpdateModelRouterOutput {
  config?: Record<string, any>
  created_at?: string
  description?: string
  fallback_models?: any[]
  name?: string
  policies?: any[]
  regions?: any[]
  updated_at?: string
  uuid?: string
}

export interface ApiUpdateModelRouterOutputUpdateData {
  uuid: string
  config?: Record<string, any>
  created_at?: string
  description?: string
  fallback_models?: any[]
  name?: string
  policies?: any[]
  regions?: any[]
  updated_at?: string
}

export interface ApiUpdateOpenAiapiKeyOutput {
  api_key?: string
  api_key_uuid?: string
  created_at?: string
  created_by?: string
  deleted_at?: string
  models?: any[]
  name?: string
  updated_at?: string
  uuid?: string
}

export interface ApiUpdateOpenAiapiKeyOutputUpdateData {
  api_key_uuid: string
  api_key?: string
  created_at?: string
  created_by?: string
  deleted_at?: string
  models?: any[]
  name?: string
  updated_at?: string
  uuid?: string
}

export interface ApiUpdateScenarioSetOutput {
  bucket_name?: string
  bucket_region?: string
  created_at?: string
  deleted_at?: string
  description?: string
  failure_reason?: string
  generator_model_uuid?: string
  library_scenario_uuid?: string
  name?: string
  scenario_count?: number
  scenario_set_uuid?: string
  scenarios?: any[]
  source_export_id?: string
  source_goal_description?: string
  source_kind?: string
  spaces_key?: string
  status?: string
  updated_at?: string
  workflow_uuid?: string
}

export interface ApiUpdateScenarioSetOutputUpdateData {
  scenario_set_uuid: string
  bucket_name?: string
  bucket_region?: string
  created_at?: string
  deleted_at?: string
  description?: string
  failure_reason?: string
  generator_model_uuid?: string
  library_scenario_uuid?: string
  name?: string
  scenario_count?: number
  scenarios?: any[]
  source_export_id?: string
  source_goal_description?: string
  source_kind?: string
  spaces_key?: string
  status?: string
  updated_at?: string
  workflow_uuid?: string
}

export interface ApiUpdateSimulationRunOutput {
  agent_config?: Record<string, any>
  created_at?: string
  created_by_user_email?: string
  created_by_user_id?: string
  deleted_at?: string
  evaluation_config?: Record<string, any>
  evaluation_run_uuid?: string
  exploration_budget?: number
  failure_reason?: string
  journeys_finished?: number
  judge_model_name?: string
  judge_model_uuid?: string
  max_turns?: number
  name?: string
  result_summary?: Record<string, any>
  run_uuid?: string
  scenario_count?: number
  scenario_set_uuid?: string
  status?: string
  total_journeys?: number
  updated_at?: string
  user_simulator_config?: Record<string, any>
  user_simulator_model_name?: string
  user_simulator_model_uuid?: string
  workflow_uuid?: string
}

export interface ApiUpdateSimulationRunOutputListMatch {
  page?: number
  per_page?: number
  scenario_set_uuid?: string
  search?: string
  sort_by?: string
  sort_direction?: string
  status?: any[]
}

export interface ApiUpdateSimulationRunOutputCreateData {
  agent_config?: Record<string, any>
  created_at?: string
  created_by_user_email?: string
  created_by_user_id?: string
  deleted_at?: string
  evaluation_config?: Record<string, any>
  evaluation_run_uuid?: string
  exploration_budget?: number
  failure_reason?: string
  journeys_finished?: number
  judge_model_name?: string
  judge_model_uuid?: string
  max_turns?: number
  name?: string
  result_summary?: Record<string, any>
  run_uuid?: string
  scenario_count?: number
  scenario_set_uuid?: string
  status?: string
  total_journeys?: number
  updated_at?: string
  user_simulator_config?: Record<string, any>
  user_simulator_model_name?: string
  user_simulator_model_uuid?: string
  workflow_uuid?: string
}

export interface ApiUpdateSimulationRunOutputUpdateData {
  run_uuid: string
  agent_config?: Record<string, any>
  created_at?: string
  created_by_user_email?: string
  created_by_user_id?: string
  deleted_at?: string
  evaluation_config?: Record<string, any>
  evaluation_run_uuid?: string
  exploration_budget?: number
  failure_reason?: string
  journeys_finished?: number
  judge_model_name?: string
  judge_model_uuid?: string
  max_turns?: number
  name?: string
  result_summary?: Record<string, any>
  scenario_count?: number
  scenario_set_uuid?: string
  status?: string
  total_journeys?: number
  updated_at?: string
  user_simulator_config?: Record<string, any>
  user_simulator_model_name?: string
  user_simulator_model_uuid?: string
  workflow_uuid?: string
}

export interface ApiUpdateWorkspaceOutput {
  agents?: any[]
  created_at?: string
  created_by?: string
  created_by_email?: string
  deleted_at?: string
  description?: string
  evaluation_test_cases?: any[]
  name?: string
  updated_at?: string
  uuid?: string
  workspace_uuid?: string
}

export interface ApiUpdateWorkspaceOutputUpdateData {
  workspace_uuid: string
  agents?: any[]
  created_at?: string
  created_by?: string
  created_by_email?: string
  deleted_at?: string
  description?: string
  evaluation_test_cases?: any[]
  name?: string
  updated_at?: string
  uuid?: string
}

export interface App {
  active_deployment?: Record<string, any>
  autoscaling?: Record<string, any>
  created_at?: string
  dedicated_ips?: any[]
  default_ingress?: string
  deployment?: Record<string, any>
  deployment_id?: string
  domains?: any[]
  id?: string
  in_progress_deployment?: Record<string, any>
  last_deployment_created_at?: string
  live_domain?: string
  live_url?: string
  live_url_base?: string
  owner_uuid?: string
  pending_deployment?: any
  pinned_deployment?: any
  project_id?: string
  region?: Record<string, any>
  spec: Record<string, any>
  tier_slug?: string
  type?: string
  update_all_source_versions?: boolean
  updated_at?: string
  vpc?: Record<string, any>
}

export interface AppLoadMatch {
  event_id?: string
  id: string
  name?: string
}

export interface AppListMatch {
  page?: number
  per_page?: number
  with_project?: boolean
}

export interface AppCreateData {
  active_deployment?: Record<string, any>
  autoscaling?: Record<string, any>
  created_at?: string
  dedicated_ips?: any[]
  default_ingress?: string
  deployment?: Record<string, any>
  deployment_id?: string
  domains?: any[]
  id?: string
  in_progress_deployment?: Record<string, any>
  last_deployment_created_at?: string
  live_domain?: string
  live_url?: string
  live_url_base?: string
  owner_uuid?: string
  pending_deployment?: any
  pinned_deployment?: any
  project_id?: string
  region?: Record<string, any>
  spec: Record<string, any>
  tier_slug?: string
  type?: string
  update_all_source_versions?: boolean
  updated_at?: string
  vpc?: Record<string, any>

  // Selects a custom action instead of the plain create:
  //   'cancel' | 'rollback_commit' | 'rollback_validate'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface AppUpdateData {
  id: string
  active_deployment?: Record<string, any>
  autoscaling?: Record<string, any>
  created_at?: string
  dedicated_ips?: any[]
  default_ingress?: string
  deployment?: Record<string, any>
  deployment_id?: string
  domains?: any[]
  in_progress_deployment?: Record<string, any>
  last_deployment_created_at?: string
  live_domain?: string
  live_url?: string
  live_url_base?: string
  owner_uuid?: string
  pending_deployment?: any
  pinned_deployment?: any
  project_id?: string
  region?: Record<string, any>
  spec?: Record<string, any>
  tier_slug?: string
  type?: string
  update_all_source_versions?: boolean
  updated_at?: string
  vpc?: Record<string, any>
}

export interface AppRemoveMatch {
  id: string
}

export interface AppAlert {
  component_name?: string
  emails?: any[]
  id?: string
  phase?: string
  progress?: Record<string, any>
  slack_webhooks?: any[]
  spec?: Record<string, any>
}

export interface AppAlertListMatch {
  id: string
}

export interface AppAlertCreateData {
  alert_id: string
  app_id: string
  component_name?: string
  emails?: any[]
  id?: string
  phase?: string
  progress?: Record<string, any>
  slack_webhooks?: any[]
  spec?: Record<string, any>
}

export interface AppEvent {
  autoscaling?: Record<string, any>
  created_at?: string
  deployment?: Record<string, any>
  deployment_id?: string
  id?: string
  type?: string
}

export interface AppEventListMatch {
  id: string
  event_type?: any[]
  page?: number
  per_page?: number
}

export interface AppHealth {
  components?: any[]
  functions_components?: any[]
  id?: string
}

export interface AppHealthLoadMatch {
  id: string
}

export interface AppInstance {
  component_name?: string
  component_type?: string
  id?: string
  instance_alias?: string
  instance_name?: string
}

export interface AppInstanceListMatch {
  id: string
}

export interface AppJobInvocation {
  completed_at?: string
  created_at?: string
  deployment_id?: string
  id?: string
  job_name?: string
  phase?: string
  started_at?: string
  trigger?: Record<string, any>
}

export interface AppJobInvocationLoadMatch {
  app_id: string
  id: string
  job_name?: string
}

export interface AppJobInvocationListMatch {
  id: string
  deployment_id?: string
  job_name?: any[]
  page?: number
  per_page?: number
}

export interface AppJobInvocationCreateData {
  app_id: string
  job_invocation_id: string
  job_name?: string
  completed_at?: string
  created_at?: string
  deployment_id?: string
  id?: string
  phase?: string
  started_at?: string
  trigger?: Record<string, any>
}

export interface AppMetricsBandwidthUsage {
  app_bandwidth_usage?: any[]
  app_id?: string
  app_ids: any[]
  bandwidth_bytes?: string
  date?: string
}

export interface AppMetricsBandwidthUsageListMatch {
  app_id: string
  date?: string
}

export interface AppMetricsBandwidthUsageCreateData {
  app_bandwidth_usage?: any[]
  app_id?: string
  app_ids: any[]
  bandwidth_bytes?: string
  date?: string
}

export interface AppPropose {
  app_cost?: number
  app_id?: string
  app_is_static?: boolean
  app_name_available?: boolean
  app_name_suggestion?: string
  app_tier_downgrade_cost?: number
  existing_static_apps?: string
  spec: Record<string, any>
}

export interface AppProposeCreateData {
  app_cost?: number
  app_id?: string
  app_is_static?: boolean
  app_name_available?: boolean
  app_name_suggestion?: string
  app_tier_downgrade_cost?: number
  existing_static_apps?: string
  spec: Record<string, any>
}

export interface AppsDeployment {
  cause?: string
  cloned_from?: string
  components?: any[]
  created_at?: string
  deployment_id?: string
  force_build?: boolean
  functions?: any[]
  id?: string
  jobs?: any[]
  phase?: string
  phase_last_updated_at?: string
  progress?: Record<string, any>
  services?: any[]
  skip_pin?: boolean
  spec: Record<string, any>
  static_sites?: any[]
  tier_slug?: string
  updated_at?: string
  workers?: any[]
}

export interface AppsDeploymentLoadMatch {
  app_id: string
  id: string
}

export interface AppsDeploymentListMatch {
  app_id: string
  deployment_type?: any[]
  page?: number
  per_page?: number
}

export interface AppsDeploymentCreateData {
  app_id: string
  deployment_id?: string
  cause?: string
  cloned_from?: string
  components?: any[]
  created_at?: string
  force_build?: boolean
  functions?: any[]
  id?: string
  jobs?: any[]
  phase?: string
  phase_last_updated_at?: string
  progress?: Record<string, any>
  services?: any[]
  skip_pin?: boolean
  spec: Record<string, any>
  static_sites?: any[]
  tier_slug?: string
  updated_at?: string
  workers?: any[]
}

export interface AppsGetExec {
  url?: string
}

export interface AppsGetExecLoadMatch {
  app_id: string
  component_name: string
  deployment_id?: string
  instance_name?: string
}

export interface AppsGetLog {
  historic_urls?: any[]
  live_url?: string
}

export interface AppsGetLogListMatch {
  app_id: string
  component_name?: string
  deployment_id?: string
  follow?: boolean
  pod_connection_timeout?: string
  type: string
  invocation_id?: string
  job_name?: string
  tail_line?: string
  event_id?: string
}

export interface AppsInstanceSize {
  bandwidth_allowance_gib?: string
  cpu_type?: string
  cpus?: string
  deprecation_intent?: boolean
  id?: string
  memory_bytes?: string
  name?: string
  scalable?: boolean
  single_instance_only?: boolean
  slug?: string
  tier_downgrade_to?: string
  tier_slug?: string
  tier_upgrade_to?: string
  usd_per_month?: string
  usd_per_second?: string
}

export interface AppsInstanceSizeLoadMatch {
  id: string
}

export interface AppsInstanceSizeListMatch {
  bandwidth_allowance_gib?: string
  cpu_type?: string
  cpus?: string
  deprecation_intent?: boolean
  id?: string
  memory_bytes?: string
  name?: string
  scalable?: boolean
  single_instance_only?: boolean
  slug?: string
  tier_downgrade_to?: string
  tier_slug?: string
  tier_upgrade_to?: string
  usd_per_month?: string
  usd_per_second?: string
}

export interface AppsRegion {
  continent?: string
  data_centers?: any[]
  default?: boolean
  disabled?: boolean
  flag?: string
  label?: string
  reason?: string
  slug?: string
}

export interface AppsRegionListMatch {
  continent?: string
  data_centers?: any[]
  default?: boolean
  disabled?: boolean
  flag?: string
  label?: string
  reason?: string
  slug?: string
}

export interface AssociatedKubernetesResource {
  load_balancers?: any[]
  volume_snapshots?: any[]
  volumes?: any[]
}

export interface AssociatedKubernetesResourceListMatch {
  cluster_id: string
}

export interface AssociatedResourceStatus {
  completed_at?: string
  droplet?: Record<string, any>
  failures?: number
  resources?: Record<string, any>
}

export interface AssociatedResourceStatusLoadMatch {
  droplet_id: number
}

export interface AsyncInvoke {
  completed_at?: string
  created_at: string
  error?: string
  input: Record<string, any>
  model_id: string
  output?: Record<string, any>
  request_id: string
  started_at?: string
  status: string
  tags?: any[]
}

export interface AsyncInvokeCreateData {
  completed_at?: string
  created_at: string
  error?: string
  input: Record<string, any>
  model_id: string
  output?: Record<string, any>
  request_id: string
  started_at?: string
  status: string
  tags?: any[]
}

export interface Balance {
  account_balance?: string
  generated_at?: string
  month_to_date_balance?: string
  month_to_date_usage?: string
}

export interface BalanceLoadMatch {
  account_balance?: string
  generated_at?: string
  month_to_date_balance?: string
  month_to_date_usage?: string
}

export interface Batch {
  batch_id: string
  cancelled_at?: string
  completed_at?: string
  completion_window: string
  created_at: string
  endpoint?: string
  error_file_id?: string
  errors?: any[]
  expires_at?: string
  failed_at?: string
  file_id: string
  finalizing_at?: string
  id?: string
  in_progress_at?: string
  input_file_id: string
  metadata?: Record<string, any>
  output_file_id?: string
  provider: string
  request_counts?: Record<string, any>
  request_id?: string
  status: string
}

export interface BatchLoadMatch {
  id: string
}

export interface BatchListMatch {
  after?: string
  limit?: number
  status?: string
}

export interface BatchCreateData {
  batch_id: string
  cancelled_at?: string
  completed_at?: string
  completion_window: string
  created_at: string
  endpoint?: string
  error_file_id?: string
  errors?: any[]
  expires_at?: string
  failed_at?: string
  file_id: string
  finalizing_at?: string
  id?: string
  in_progress_at?: string
  input_file_id: string
  metadata?: Record<string, any>
  output_file_id?: string
  provider: string
  request_counts?: Record<string, any>
  request_id?: string
  status: string

  // Selects a custom action instead of the plain create:
  //   'cancel'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface BatchFileCreate {
  file_name: string
}

export interface BatchFileCreateCreateData {
  file_name: string
}

export interface BatchInference {
}

export interface BatchInferenceUpdateData {
  $body?: Uint8Array | ArrayBuffer | Blob | ReadableStream | AsyncIterable<Uint8Array> | string
}

export interface BatchResult {
  batch_id: string
  error_file_url?: string
  expires_at?: string
  id?: string
  output_file_url?: string
  result_available: boolean
}

export interface BatchResultLoadMatch {
  id: string
}

export interface Billing {
  amount?: string
  current_page: number
  data_points: any[]
  date?: string
  description?: string
  id?: string
  invoice_id?: string
  invoice_items?: any[]
  invoice_period?: string
  invoice_uuid?: string
  links?: Record<string, any>
  meta: any
  total_items: number
  total_pages: number
  type?: string
  updated_at?: string
}

export interface BillingLoadMatch {
  invoice_uuid: string
  page?: number
  per_page?: number
}

export interface BillingListMatch {
  amount?: string
  current_page?: number
  data_points?: any[]
  date?: string
  description?: string
  id?: string
  invoice_id?: string
  invoice_items?: any[]
  invoice_period?: string
  invoice_uuid?: string
  links?: Record<string, any>
  meta?: any
  total_items?: number
  total_pages?: number
  type?: string
  updated_at?: string
}

export interface BlockStorage {
  created_at: string
  description?: string
  droplet_ids?: any[]
  filesystem_label?: string
  filesystem_type?: string
  id: string
  min_disk_size: number
  name: string
  region?: any
  regions: any[]
  resource_id: string
  resource_type: string
  size_gigabytes: number
  tags: any[]
  volume?: Record<string, any>
}

export interface BlockStorageLoadMatch {
  volume_id: string
}

export interface BlockStorageListMatch {
  name?: string
  page?: number
  per_page?: number
  region?: string
}

export interface BlockStorageCreateData {
  created_at: string
  description?: string
  droplet_ids?: any[]
  filesystem_label?: string
  filesystem_type?: string
  id: string
  min_disk_size: number
  name: string
  region?: any
  regions: any[]
  resource_id: string
  resource_type: string
  size_gigabytes: number
  tags: any[]
  volume?: Record<string, any>
}

export interface BlockStorageRemoveMatch {
  volume_id: string
}

export interface BlockStorageAction {
  completed_at?: string
  id?: number
  region: Record<string, any>
  region_slug?: string
  resource_id?: number
  resource_type?: string
  started_at?: string
  status?: string
  type?: string
}

export interface BlockStorageActionLoadMatch {
  id: number
  volume_id: string
  page?: number
  per_page?: number
}

export interface BlockStorageActionListMatch {
  volume_id: string
  page?: number
  per_page?: number
}

export interface BlockStorageActionCreateData {
  page?: number
  per_page?: number
  completed_at?: string
  id?: number
  region: Record<string, any>
  region_slug?: string
  resource_id?: number
  resource_type?: string
  started_at?: string
  status?: string
  type?: string
}

export interface ByoipPrefix {
  advertise?: boolean
  advertised?: boolean
  failure_reason?: string
  id?: string
  locked?: boolean
  name?: string
  prefix?: string
  project_id?: string
  region?: string
  signature: string
  status?: string
  uuid?: string
  validations?: any[]
}

export interface ByoipPrefixLoadMatch {
  id: string
}

export interface ByoipPrefixListMatch {
  page?: number
  per_page?: number

  // Selects a custom action instead of the plain list:
  //   'ips'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface ByoipPrefixCreateData {
  advertise?: boolean
  advertised?: boolean
  failure_reason?: string
  id?: string
  locked?: boolean
  name?: string
  prefix?: string
  project_id?: string
  region?: string
  signature: string
  status?: string
  uuid?: string
  validations?: any[]
}

export interface ByoipPrefixUpdateData {
  id: string
  advertise?: boolean
  advertised?: boolean
  failure_reason?: string
  locked?: boolean
  name?: string
  prefix?: string
  project_id?: string
  region?: string
  signature?: string
  status?: string
  uuid?: string
  validations?: any[]
}

export interface ByoipPrefixRemoveMatch {
  id: string
}

export interface CdnEndpoint {
  certificate_id?: string
  created_at?: string
  custom_domain?: string
  endpoint?: string
  id?: string
  origin: string
  ttl?: number
}

export interface CdnEndpointLoadMatch {
  id: string
}

export interface CdnEndpointListMatch {
  page?: number
  per_page?: number
}

export interface CdnEndpointCreateData {
  certificate_id?: string
  created_at?: string
  custom_domain?: string
  endpoint?: string
  id?: string
  origin: string
  ttl?: number
}

export interface CdnEndpointUpdateData {
  id: string
  certificate_id?: string
  created_at?: string
  custom_domain?: string
  endpoint?: string
  origin?: string
  ttl?: number
}

export interface CdnEndpointRemoveMatch {
  id: string

  // Selects a custom action instead of the plain remove:
  //   'cache'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface Certificate {
  certificate?: Record<string, any>
  created_at?: string
  dns_names?: any[]
  id?: string
  name?: string
  not_after?: string
  sha1_fingerprint?: string
  state?: string
  type?: string
}

export interface CertificateLoadMatch {
  id: string
}

export interface CertificateListMatch {
  name?: string
  page?: number
  per_page?: number
}

export interface CertificateCreateData {
  certificate?: Record<string, any>
  created_at?: string
  dns_names?: any[]
  id?: string
  name?: string
  not_after?: string
  sha1_fingerprint?: string
  state?: string
  type?: string
}

export interface CertificateRemoveMatch {
  id: string
}

export interface ChatCompletion {
  choices: any[]
  created: number
  frequency_penalty?: number
  id: string
  logit_bias?: Record<string, any>
  logprobs?: boolean
  max_completion_tokens?: number
  max_tokens?: number
  messages: any[]
  metadata?: Record<string, any>
  model: string
  n?: number
  object: string
  presence_penalty?: number
  reasoning_effort?: string
  seed?: number
  stop?: any
  stream?: boolean
  stream_options?: Record<string, any>
  temperature?: number
  tool_choice?: any
  tools?: any[]
  top_logprobs?: number
  top_p?: number
  usage: Record<string, any>
  user?: string
}

export interface ChatCompletionCreateData {
  choices: any[]
  created: number
  frequency_penalty?: number
  id: string
  logit_bias?: Record<string, any>
  logprobs?: boolean
  max_completion_tokens?: number
  max_tokens?: number
  messages: any[]
  metadata?: Record<string, any>
  model: string
  n?: number
  object: string
  presence_penalty?: number
  reasoning_effort?: string
  seed?: number
  stop?: any
  stream?: boolean
  stream_options?: Record<string, any>
  temperature?: number
  tool_choice?: any
  tools?: any[]
  top_logprobs?: number
  top_p?: number
  usage: Record<string, any>
  user?: string
}

export interface Clusterlint {
  check_name?: string
  message?: string
  object?: Record<string, any>
  severity?: string
}

export interface ClusterlintListMatch {
  cluster_id: string
  run_id?: string
}

export interface Connection {
  api_key?: Record<string, any>
  authorization?: any
  connection?: any
  connection_parameters?: Record<string, any>
  created_at?: string
  credential?: Record<string, any>
  credential_id?: string
  credential_kind?: string
  granted_at?: string
  id?: string
  network?: Record<string, any>
  oauth?: Record<string, any>
  owning_user_id?: string
  provider: string
  provider_display_name?: string
  revoked_at?: string
  scopes?: any[]
  status?: string
  updated_at?: string
  user_id: string
}

export interface ConnectionLoadMatch {
  id: string
}

export interface ConnectionListMatch {
  page?: number
  per_page?: number
  provider?: string
  sort?: string
  sort_direction?: string
  status?: string
  user_id?: string
}

export interface ConnectionCreateData {
  api_key?: Record<string, any>
  authorization?: any
  connection?: any
  connection_parameters?: Record<string, any>
  created_at?: string
  credential?: Record<string, any>
  credential_id?: string
  credential_kind?: string
  granted_at?: string
  id?: string
  network?: Record<string, any>
  oauth?: Record<string, any>
  owning_user_id?: string
  provider: string
  provider_display_name?: string
  revoked_at?: string
  scopes?: any[]
  status?: string
  updated_at?: string
  user_id: string
}

export interface ConnectionRemoveMatch {
  id: string
}

export interface ConnectionPool {
  connection?: any
  db: string
  mode: string
  name: string
  private_connection?: any
  size: number
  standby_connection?: any
  standby_private_connection?: any
  user?: string
}

export interface ConnectionPoolListMatch {
  database_id: string
}

export interface ContainerRegistry {
  available_regions?: any[]
  blobs?: any[]
  blobs_deleted?: number
  cancel?: boolean
  compressed_size_bytes?: number
  created_at?: string
  digest?: string
  freed_bytes?: number
  id?: string
  latest_manifest?: Record<string, any>
  latest_tag?: Record<string, any>
  manifest_count?: number
  manifest_digest?: string
  name?: string
  region?: string
  registries?: any[]
  registry_name?: string
  repository?: string
  size_bytes?: number
  status?: string
  storage_usage_bytes?: number
  storage_usage_bytes_updated_at?: string
  subscription?: any
  subscription_tier_slug?: string
  subscription_tiers?: any[]
  tag?: string
  tag_count?: number
  tags?: any[]
  tier?: Record<string, any>
  tier_slug?: string
  type?: string
  updated_at?: string
  uuid?: string
}

export interface ContainerRegistryLoadMatch {
  id: string
}

export interface ContainerRegistryListMatch {
  available_regions?: any[]
  blobs?: any[]
  blobs_deleted?: number
  cancel?: boolean
  compressed_size_bytes?: number
  created_at?: string
  digest?: string
  freed_bytes?: number
  id?: string
  latest_manifest?: Record<string, any>
  latest_tag?: Record<string, any>
  manifest_count?: number
  manifest_digest?: string
  name?: string
  region?: string
  registries?: any[]
  registry_name?: string
  repository?: string
  size_bytes?: number
  status?: string
  storage_usage_bytes?: number
  storage_usage_bytes_updated_at?: string
  subscription?: any
  subscription_tier_slug?: string
  subscription_tiers?: any[]
  tag?: string
  tag_count?: number
  tags?: any[]
  tier?: Record<string, any>
  tier_slug?: string
  type?: string
  updated_at?: string
  uuid?: string
}

export interface ContainerRegistryCreateData {
  available_regions?: any[]
  blobs?: any[]
  blobs_deleted?: number
  cancel?: boolean
  compressed_size_bytes?: number
  created_at?: string
  digest?: string
  freed_bytes?: number
  id?: string
  latest_manifest?: Record<string, any>
  latest_tag?: Record<string, any>
  manifest_count?: number
  manifest_digest?: string
  name?: string
  region?: string
  registries?: any[]
  registry_name?: string
  repository?: string
  size_bytes?: number
  status?: string
  storage_usage_bytes?: number
  storage_usage_bytes_updated_at?: string
  subscription?: any
  subscription_tier_slug?: string
  subscription_tiers?: any[]
  tag?: string
  tag_count?: number
  tags?: any[]
  tier?: Record<string, any>
  tier_slug?: string
  type?: string
  updated_at?: string
  uuid?: string
}

export interface ContainerRegistryUpdateData {
  garbage_collection_uuid: string
  registry_name: string
  available_regions?: any[]
  blobs?: any[]
  blobs_deleted?: number
  cancel?: boolean
  compressed_size_bytes?: number
  created_at?: string
  digest?: string
  freed_bytes?: number
  id?: string
  latest_manifest?: Record<string, any>
  latest_tag?: Record<string, any>
  manifest_count?: number
  manifest_digest?: string
  name?: string
  region?: string
  registries?: any[]
  repository?: string
  size_bytes?: number
  status?: string
  storage_usage_bytes?: number
  storage_usage_bytes_updated_at?: string
  subscription?: any
  subscription_tier_slug?: string
  subscription_tiers?: any[]
  tag?: string
  tag_count?: number
  tags?: any[]
  tier?: Record<string, any>
  tier_slug?: string
  type?: string
  updated_at?: string
  uuid?: string
}

export interface ContainerRegistryRemoveMatch {
  id: string
}

export interface CreateResponse {
  created: number
  id: string
  input: any
  instructions?: string
  max_output_tokens?: number
  metadata?: Record<string, any>
  model: string
  object: string
  output: any[]
  parallel_tool_calls?: boolean
  status?: string
  stop?: any
  stream?: boolean
  stream_options?: Record<string, any>
  temperature?: number
  tool_choice?: string
  tools?: any[]
  top_p?: number
  usage: Record<string, any>
  user?: string
}

export interface CreateResponseCreateData {
  created: number
  id: string
  input: any
  instructions?: string
  max_output_tokens?: number
  metadata?: Record<string, any>
  model: string
  object: string
  output: any[]
  parallel_tool_calls?: boolean
  status?: string
  stop?: any
  stream?: boolean
  stream_options?: Record<string, any>
  temperature?: number
  tool_choice?: string
  tools?: any[]
  top_p?: number
  usage: Record<string, any>
  user?: string
}

export interface Credential {
  certificate_authority_data?: string
  client_certificate_data?: string
  client_key_data?: string
  expires_at?: string
  server?: string
  token?: string
}

export interface CredentialLoadMatch {
  cluster_id: string
  expiry_second?: number
}

export interface Database {
  access_cert?: string
  access_key?: string
  autoscale?: any
  backup_restore: Record<string, any>
  compatibility_level: string
  config?: Record<string, any>
  connection?: any
  created_at?: string
  credentials?: Record<string, any>
  db: string
  db_names?: any[]
  do_settings?: any
  engine: string
  id?: string
  maintenance_window?: any
  metrics_endpoints?: any[]
  mode: string
  mysql_settings: Record<string, any>
  name: string
  num_nodes: number
  partition_count?: number
  partitions?: any[]
  password?: string
  private_connection?: any
  private_network_uuid?: string
  project_id?: string
  region?: string
  replication_factor?: number
  role?: string
  rules?: any[]
  schema: string
  schema_id: number
  schema_registry_connection?: any
  schema_type: string
  semantic_version?: string
  settings?: Record<string, any>
  size: number
  standby_connection?: any
  standby_private_connection?: any
  state?: string
  status?: string
  storage_size_mib?: number
  subject_name: string
  tags?: any[]
  ui_connection?: any
  user?: string
  users?: any[]
  version: string
  version_end_of_availability?: string
  version_end_of_life?: string
}

export interface DatabaseLoadMatch {
  id: string

  // Selects a custom action instead of the plain load:
  //   'autoscale' | 'ca' | 'config' | 'do_setting' | 'eviction_policy' | 'schema_registry_config'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface DatabaseListMatch {
  tag_name?: string

  // Selects a custom action instead of the plain list:
  //   'backup' | 'dbs' | 'event' | 'firewall' | 'index' | 'logsink' | 'replica' | 'schema_registry' | 'topic' | 'user'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface DatabaseCreateData {
  access_cert?: string
  access_key?: string
  autoscale?: any
  backup_restore: Record<string, any>
  compatibility_level: string
  config?: Record<string, any>
  connection?: any
  created_at?: string
  credentials?: Record<string, any>
  db: string
  db_names?: any[]
  do_settings?: any
  engine: string
  id?: string
  maintenance_window?: any
  metrics_endpoints?: any[]
  mode: string
  mysql_settings: Record<string, any>
  name: string
  num_nodes: number
  partition_count?: number
  partitions?: any[]
  password?: string
  private_connection?: any
  private_network_uuid?: string
  project_id?: string
  region?: string
  replication_factor?: number
  role?: string
  rules?: any[]
  schema: string
  schema_id: number
  schema_registry_connection?: any
  schema_type: string
  semantic_version?: string
  settings?: Record<string, any>
  size: number
  standby_connection?: any
  standby_private_connection?: any
  state?: string
  status?: string
  storage_size_mib?: number
  subject_name: string
  tags?: any[]
  ui_connection?: any
  user?: string
  users?: any[]
  version: string
  version_end_of_availability?: string
  version_end_of_life?: string

  // Selects a custom action instead of the plain create:
  //   'dbs' | 'logsink' | 'pool' | 'replica' | 'reset_auth' | 'schema_registry' | 'topic' | 'user'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface DatabaseUpdateData {
  id: string
  logsink_id: string
  access_cert?: string
  access_key?: string
  autoscale?: any
  backup_restore?: Record<string, any>
  compatibility_level?: string
  config?: Record<string, any>
  connection?: any
  created_at?: string
  credentials?: Record<string, any>
  db?: string
  db_names?: any[]
  do_settings?: any
  engine?: string
  maintenance_window?: any
  metrics_endpoints?: any[]
  mode?: string
  mysql_settings?: Record<string, any>
  name?: string
  num_nodes?: number
  partition_count?: number
  partitions?: any[]
  password?: string
  private_connection?: any
  private_network_uuid?: string
  project_id?: string
  region?: string
  replication_factor?: number
  role?: string
  rules?: any[]
  schema?: string
  schema_id?: number
  schema_registry_connection?: any
  schema_type?: string
  semantic_version?: string
  settings?: Record<string, any>
  size?: number
  standby_connection?: any
  standby_private_connection?: any
  state?: string
  status?: string
  storage_size_mib?: number
  subject_name?: string
  tags?: any[]
  ui_connection?: any
  user?: string
  users?: any[]
  version?: string
  version_end_of_availability?: string
  version_end_of_life?: string

  // Selects a custom action instead of the plain update:
  //   'autoscale' | 'do_setting' | 'eviction_policy' | 'firewall' | 'install_update' | 'maintenance' | 'migrate' | 'promote' | 'resize' | 'schema_registry_config' | 'sql_mode' | 'upgrade'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface DatabasePatchData {
  id: string
  access_cert?: string
  access_key?: string
  autoscale?: any
  backup_restore?: Record<string, any>
  compatibility_level?: string
  config?: Record<string, any>
  connection?: any
  created_at?: string
  credentials?: Record<string, any>
  db?: string
  db_names?: any[]
  do_settings?: any
  engine?: string
  maintenance_window?: any
  metrics_endpoints?: any[]
  mode?: string
  mysql_settings?: Record<string, any>
  name?: string
  num_nodes?: number
  partition_count?: number
  partitions?: any[]
  password?: string
  private_connection?: any
  private_network_uuid?: string
  project_id?: string
  region?: string
  replication_factor?: number
  role?: string
  rules?: any[]
  schema?: string
  schema_id?: number
  schema_registry_connection?: any
  schema_type?: string
  semantic_version?: string
  settings?: Record<string, any>
  size?: number
  standby_connection?: any
  standby_private_connection?: any
  state?: string
  status?: string
  storage_size_mib?: number
  subject_name?: string
  tags?: any[]
  ui_connection?: any
  user?: string
  users?: any[]
  version?: string
  version_end_of_availability?: string
  version_end_of_life?: string

  // Selects a custom action instead of the plain patch:
  //   'config'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface DatabaseRemoveMatch {
  database_name?: string
  id: string
  index_name?: string
  logsink_id?: string
  migration_id?: string
  pool_name?: string
  replica_name?: string
  subject_name?: string
  topic_name?: string
  username?: string
}

export interface DedicatedInference {
  access_tokens?: Record<string, any>
  created_at?: string
  dedicated_inference?: Record<string, any>
  endpoints?: Record<string, any>
  id?: string
  pending_deployment_spec?: Record<string, any>
  region?: string
  spec: Record<string, any>
  status?: string
  token?: Record<string, any>
  updated_at?: string
  vpc_uuid?: string
}

export interface DedicatedInferenceLoadMatch {
  id: string

  // Selects a custom action instead of the plain load:
  //   'ca'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface DedicatedInferenceListMatch {
  page?: number
  per_page?: number
  region?: string

  // Selects a custom action instead of the plain list:
  //   'accelerator' | 'token'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface DedicatedInferenceCreateData {
  access_tokens?: Record<string, any>
  created_at?: string
  dedicated_inference?: Record<string, any>
  endpoints?: Record<string, any>
  id?: string
  pending_deployment_spec?: Record<string, any>
  region?: string
  spec: Record<string, any>
  status?: string
  token?: Record<string, any>
  updated_at?: string
  vpc_uuid?: string

  // Selects a custom action instead of the plain create:
  //   'token'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface DedicatedInferenceUpdateData {
  id: string
  access_tokens?: Record<string, any>
  created_at?: string
  dedicated_inference?: Record<string, any>
  endpoints?: Record<string, any>
  pending_deployment_spec?: Record<string, any>
  region?: string
  spec?: Record<string, any>
  status?: string
  token?: Record<string, any>
  updated_at?: string
  vpc_uuid?: string
}

export interface DedicatedInferenceRemoveMatch {
  id: string
  token_id?: string
}

export interface DedicatedInferenceAccelerator {
  created_at?: string
  id?: string
  name?: string
  role?: string
  slug?: string
  status?: string
}

export interface DedicatedInferenceAcceleratorLoadMatch {
  dedicated_inference_id: string
  id: string
}

export interface DedicatedInferenceGpuModelConfig {
  gpu_slugs?: any[]
  is_gated_model?: boolean
  model_name?: string
  model_slug?: string
}

export interface DedicatedInferenceGpuModelConfigListMatch {
  gpu_slugs?: any[]
  is_gated_model?: boolean
  model_name?: string
  model_slug?: string
}

export interface DedicatedInferenceSize {
  currency?: string
  gpu_slug?: string
  price_per_hour?: string
  region?: string
}

export interface DedicatedInferenceSizeListMatch {
  currency?: string
  gpu_slug?: string
  price_per_hour?: string
  region?: string
}

export interface DockerCredential {
  registry_digitalocean_com?: Record<string, any>
}

export interface DockerCredentialLoadMatch {
  expiry_second?: number
  read_write?: boolean
}

export interface Domain {
  id?: string
  ip_address?: string
  name?: string
  ttl?: number
  zone_file?: string
}

export interface DomainLoadMatch {
  id: string
}

export interface DomainListMatch {
  page?: number
  per_page?: number
}

export interface DomainCreateData {
  id?: string
  ip_address?: string
  name?: string
  ttl?: number
  zone_file?: string
}

export interface DomainRemoveMatch {
  id: string
}

export interface DomainRecord {
  data?: string
  domain_record?: Record<string, any>
  flags?: number
  id?: number
  name?: string
  port?: number
  priority?: number
  tag?: string
  ttl?: number
  type: string
  weight?: number
}

export interface DomainRecordLoadMatch {
  domain_name: string
  id: number
}

export interface DomainRecordListMatch {
  domain_name: string
  name?: string
  page?: number
  per_page?: number
  type?: string
}

export interface DomainRecordCreateData {
  domain_name: string
  data?: string
  domain_record?: Record<string, any>
  flags?: number
  id?: number
  name?: string
  port?: number
  priority?: number
  tag?: string
  ttl?: number
  type: string
  weight?: number
}

export interface DomainRecordUpdateData {
  domain_name: string
  id: number
  data?: string
  domain_record?: Record<string, any>
  flags?: number
  name?: string
  port?: number
  priority?: number
  tag?: string
  ttl?: number
  type?: string
  weight?: number
}

export interface DomainRecordPatchData {
  domain_name: string
  id: number
  data?: string
  domain_record?: Record<string, any>
  flags?: number
  name?: string
  port?: number
  priority?: number
  tag?: string
  ttl?: number
  type?: string
  weight?: number
}

export interface DomainRecordRemoveMatch {
  domain_name: string
  id: number
}

export interface Droplet {
  backup_ids: any[]
  created_at: string
  disk: number
  disk_info?: any[]
  droplet?: Record<string, any>
  features: any[]
  gpu_info?: Record<string, any>
  id: number
  image: any
  kernel?: Record<string, any>
  links?: Record<string, any>
  locked: boolean
  memory: number
  meta: any
  name: string
  networks: Record<string, any>
  next_backup_window: any
  policies?: Record<string, any>
  possible_days?: any[]
  possible_window_starts?: any[]
  region: Record<string, any>
  retention_period_days?: number
  size: Record<string, any>
  size_slug: string
  snapshot_ids: any[]
  status: string
  subnet_uuid?: string
  tags: any[]
  vcpus: number
  volume_ids: any[]
  vpc_uuid?: string
  window_length_hours?: number
}

export interface DropletLoadMatch {
  id: number

  // Selects a custom action instead of the plain load:
  //   'backup_policy'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface DropletListMatch {
  name?: string
  page?: number
  per_page?: number
  tag_name?: string
  type?: string

  // Selects a custom action instead of the plain list:
  //   'backup' | 'destroy_with_associated_resource' | 'firewall' | 'kernel' | 'neighbor' | 'snapshot'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface DropletCreateData {
  backup_ids: any[]
  created_at: string
  disk: number
  disk_info?: any[]
  droplet?: Record<string, any>
  features: any[]
  gpu_info?: Record<string, any>
  id: number
  image: any
  kernel?: Record<string, any>
  links?: Record<string, any>
  locked: boolean
  memory: number
  meta: any
  name: string
  networks: Record<string, any>
  next_backup_window: any
  policies?: Record<string, any>
  possible_days?: any[]
  possible_window_starts?: any[]
  region: Record<string, any>
  retention_period_days?: number
  size: Record<string, any>
  size_slug: string
  snapshot_ids: any[]
  status: string
  subnet_uuid?: string
  tags: any[]
  vcpus: number
  volume_ids: any[]
  vpc_uuid?: string
  window_length_hours?: number

  // Selects a custom action instead of the plain create:
  //   'destroy_with_associated_resource_retry'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface DropletRemoveMatch {
  id: number

  // Selects a custom action instead of the plain remove:
  //   'destroy_with_associated_resource_dangerous' | 'destroy_with_associated_resource_selective'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface DropletAction {
  completed_at?: string
  id?: number
  region: Record<string, any>
  region_slug?: string
  resource_id?: number
  resource_type?: string
  started_at?: string
  status?: string
  type?: string
}

export interface DropletActionLoadMatch {
  droplet_id: number
  id: number
}

export interface DropletActionListMatch {
  id: number
  page?: number
  per_page?: number
}

export interface DropletActionCreateData {
  tag_name?: string
  completed_at?: string
  id?: number
  region: Record<string, any>
  region_slug?: string
  resource_id?: number
  resource_type?: string
  started_at?: string
  status?: string
  type?: string
}

export interface DropletAutoscalePool {
  active_resources_count: number
  config: Record<string, any>
  created_at: string
  current_instance_count: number
  current_utilization?: Record<string, any>
  desired_instance_count: number
  droplet_id: number
  droplet_template: Record<string, any>
  health_status: string
  history_event_id: string
  id: string
  name: string
  reason: string
  status: string
  unhealthy_reason?: string
  updated_at: string
}

export interface DropletAutoscalePoolLoadMatch {
  autoscale_pool_id: string
}

export interface DropletAutoscalePoolListMatch {
  name?: string
  page?: number
  per_page?: number
}

export interface DropletAutoscalePoolCreateData {
  active_resources_count: number
  config: Record<string, any>
  created_at: string
  current_instance_count: number
  current_utilization?: Record<string, any>
  desired_instance_count: number
  droplet_id: number
  droplet_template: Record<string, any>
  health_status: string
  history_event_id: string
  id: string
  name: string
  reason: string
  status: string
  unhealthy_reason?: string
  updated_at: string
}

export interface DropletAutoscalePoolUpdateData {
  autoscale_pool_id: string
  active_resources_count?: number
  config?: Record<string, any>
  created_at?: string
  current_instance_count?: number
  current_utilization?: Record<string, any>
  desired_instance_count?: number
  droplet_id?: number
  droplet_template?: Record<string, any>
  health_status?: string
  history_event_id?: string
  id?: string
  name?: string
  reason?: string
  status?: string
  unhealthy_reason?: string
  updated_at?: string
}

export interface DropletAutoscalePoolRemoveMatch {
  autoscale_pool_id: string

  // Selects a custom action instead of the plain remove:
  //   'dangerous'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface Embedding {
  data: any[]
  encoding_format?: string
  input: any
  model: string
  object: string
  usage: Record<string, any>
  user?: string
}

export interface EmbeddingCreateData {
  data: any[]
  encoding_format?: string
  input: any
  model: string
  object: string
  usage: Record<string, any>
  user?: string
}

export interface Empty {
  actorId?: string
  agentName?: string
  agentUrn?: string
  categories: any[]
  config?: Record<string, any>
  createdAt?: string
  insights?: any
  mcpUrl?: string
  name: string
  network?: any
  overrides: any[]
  owning_user_id?: string
  policy?: any
  session?: any
  sessionUrn?: string
  tools?: any[]
  updatedAt?: string
}

export interface EmptyListMatch {
  end_user_id?: string
  page?: number
  per_page?: number
}

export interface EmptyCreateData {
  actorId?: string
  agentName?: string
  agentUrn?: string
  categories: any[]
  config?: Record<string, any>
  createdAt?: string
  insights?: any
  mcpUrl?: string
  name: string
  network?: any
  overrides: any[]
  owning_user_id?: string
  policy?: any
  session?: any
  sessionUrn?: string
  tools?: any[]
  updatedAt?: string
}

export interface EmptyRemoveMatch {
  session_urn: string
}

export interface Firewall {
  created_at?: string
  droplet_ids?: any[]
  id?: string
  inbound_rules?: any[]
  name?: string
  outbound_rules?: any[]
  pending_changes?: any[]
  status?: string
  tags?: any
}

export interface FirewallLoadMatch {
  id: string
}

export interface FirewallListMatch {
  page?: number
  per_page?: number
}

export interface FirewallCreateData {
  created_at?: string
  droplet_ids?: any[]
  id?: string
  inbound_rules?: any[]
  name?: string
  outbound_rules?: any[]
  pending_changes?: any[]
  status?: string
  tags?: any

  // Selects a custom action instead of the plain create:
  //   'droplet' | 'rule' | 'tag'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface FirewallUpdateData {
  id: string
  created_at?: string
  droplet_ids?: any[]
  inbound_rules?: any[]
  name?: string
  outbound_rules?: any[]
  pending_changes?: any[]
  status?: string
  tags?: any
}

export interface FirewallRemoveMatch {
  id: string

  // Selects a custom action instead of the plain remove:
  //   'droplet' | 'rule' | 'tag'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface FloatingIp {
  droplet?: any
  floating_ip?: Record<string, any>
  id?: string
  ip?: string
  links?: Record<string, any>
  locked?: boolean
  project_id?: string
  region?: any
}

export interface FloatingIpLoadMatch {
  id: string
}

export interface FloatingIpListMatch {
  page?: number
  per_page?: number
}

export interface FloatingIpCreateData {
  droplet?: any
  floating_ip?: Record<string, any>
  id?: string
  ip?: string
  links?: Record<string, any>
  locked?: boolean
  project_id?: string
  region?: any
}

export interface FloatingIpRemoveMatch {
  id: string
}

export interface FloatingIpAction {
  action?: Record<string, any>
  completed_at?: string
  id?: number
  project_id?: string
  region: Record<string, any>
  region_slug?: string
  resource_id?: number
  resource_type?: string
  started_at?: string
  status?: string
  type?: string
}

export interface FloatingIpActionLoadMatch {
  floating_ip_id: string
  id: number
}

export interface FloatingIpActionListMatch {
  floating_ip_id: string
}

export interface FloatingIpActionCreateData {
  floating_ip_id: string
  action?: Record<string, any>
  completed_at?: string
  id?: number
  project_id?: string
  region: Record<string, any>
  region_slug?: string
  resource_id?: number
  resource_type?: string
  started_at?: string
  status?: string
  type?: string
}

export interface FunctionKey {
  created_at?: string
  expires_at?: string
  expires_in?: string
  id?: string
  name: string
  updated_at?: string
}

export interface FunctionKeyListMatch {
  namespace_id: string
}

export interface FunctionKeyCreateData {
  namespace_id: string
  created_at?: string
  expires_at?: string
  expires_in?: string
  id?: string
  name: string
  updated_at?: string
}

export interface FunctionKeyUpdateData {
  id: string
  namespace_id: string
  created_at?: string
  expires_at?: string
  expires_in?: string
  name?: string
  updated_at?: string
}

export interface FunctionKeyRemoveMatch {
  id: string
  namespace_id: string
}

export interface FunctionNamespace {
  api_host?: string
  created_at?: string
  key?: string
  label?: string
  namespace?: string
  region?: string
  updated_at?: string
  uuid?: string
}

export interface FunctionNamespaceLoadMatch {
  namespace_id: string
}

export interface FunctionNamespaceListMatch {
  api_host?: string
  created_at?: string
  key?: string
  label?: string
  namespace?: string
  region?: string
  updated_at?: string
  uuid?: string
}

export interface FunctionNamespaceCreateData {
  api_host?: string
  created_at?: string
  key?: string
  label?: string
  namespace?: string
  region?: string
  updated_at?: string
  uuid?: string
}

export interface FunctionNamespaceRemoveMatch {
  namespace_id: string
}

export interface FunctionTrigger {
  created_at?: string
  function?: string
  is_enabled?: boolean
  name?: string
  namespace?: string
  scheduled_details: Record<string, any>
  scheduled_runs?: Record<string, any>
  type?: string
  updated_at?: string
}

export interface FunctionTriggerLoadMatch {
  namespace_id: string
  trigger_name: string
}

export interface FunctionTriggerListMatch {
  namespace_id: string
}

export interface FunctionTriggerCreateData {
  namespace_id: string
  created_at?: string
  function?: string
  is_enabled?: boolean
  name?: string
  namespace?: string
  scheduled_details: Record<string, any>
  scheduled_runs?: Record<string, any>
  type?: string
  updated_at?: string
}

export interface FunctionTriggerUpdateData {
  namespace_id: string
  trigger_name: string
  created_at?: string
  function?: string
  is_enabled?: boolean
  name?: string
  namespace?: string
  scheduled_details?: Record<string, any>
  scheduled_runs?: Record<string, any>
  type?: string
  updated_at?: string
}

export interface FunctionTriggerRemoveMatch {
  namespace_id: string
  trigger_name: string
}

export interface GenaiapiRegion {
  inference_url?: string
  region?: string
  serves_batch?: boolean
  serves_inference?: boolean
  stream_inference_url?: string
}

export interface GenaiapiRegionListMatch {
  serves_batch?: boolean
  serves_inference?: boolean
}

export interface Image {
  created_at?: string
  description?: string
  distribution?: string
  error_message?: string
  id?: number
  min_disk_size?: number
  name?: string
  public?: boolean
  region: string
  regions?: any[]
  size_gigabytes?: number
  slug?: string
  status?: string
  tags?: any[]
  type?: string
  url: string
}

export interface ImageLoadMatch {
  id: string
}

export interface ImageListMatch {
  page?: number
  per_page?: number
  private?: boolean
  tag_name?: string
  type?: string
}

export interface ImageCreateData {
  created_at?: string
  description?: string
  distribution?: string
  error_message?: string
  id?: number
  min_disk_size?: number
  name?: string
  public?: boolean
  region: string
  regions?: any[]
  size_gigabytes?: number
  slug?: string
  status?: string
  tags?: any[]
  type?: string
  url: string

  // Selects a custom action instead of the plain create:
  //   'account_transfer' | 'account_transfer_accept' | 'account_transfer_cancel' | 'account_transfer_decline' | 'generation'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface ImageUpdateData {
  id: number
  created_at?: string
  description?: string
  distribution?: string
  error_message?: string
  min_disk_size?: number
  name?: string
  public?: boolean
  region?: string
  regions?: any[]
  size_gigabytes?: number
  slug?: string
  status?: string
  tags?: any[]
  type?: string
  url?: string
}

export interface ImageRemoveMatch {
  id: number
}

export interface ImageAction {
  completed_at?: string
  id?: number
  region: Record<string, any>
  region_slug?: string
  resource_id?: number
  resource_type?: string
  started_at?: string
  status?: string
  type?: string
}

export interface ImageActionListMatch {
  id: number
}

export interface Insight {
  channel_type: string
  created_at: string
  email: Record<string, any>
  id: string
  last_notified_at?: string
  last_triggered_at: string
  name: string
  resolved_at?: string
  resource_urn?: string
  rule_id: string
  severity: string
  slack: Record<string, any>
  spec: Record<string, any>
  status: string
  triggered_at: string
  updated_at: string
  usage?: any
  value: number
  webhook: Record<string, any>
}

export interface InsightLoadMatch {
  id: string
}

export interface InsightListMatch {
  page?: number
  per_page?: number
  resource_urn?: string
  rule_id?: string
  status?: string

  // Selects a custom action instead of the plain list:
  //   'alert_instance' | 'alert_rule' | 'notification_channel'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface InsightCreateData {
  channel_type: string
  created_at: string
  email: Record<string, any>
  id: string
  last_notified_at?: string
  last_triggered_at: string
  name: string
  resolved_at?: string
  resource_urn?: string
  rule_id: string
  severity: string
  slack: Record<string, any>
  spec: Record<string, any>
  status: string
  triggered_at: string
  updated_at: string
  usage?: any
  value: number
  webhook: Record<string, any>

  // Selects a custom action instead of the plain create:
  //   'alert_rule' | 'notification_channel'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface InsightUpdateData {
  id: string
  channel_type?: string
  created_at?: string
  email?: Record<string, any>
  last_notified_at?: string
  last_triggered_at?: string
  name?: string
  resolved_at?: string
  resource_urn?: string
  rule_id?: string
  severity?: string
  slack?: Record<string, any>
  spec?: Record<string, any>
  status?: string
  triggered_at?: string
  updated_at?: string
  usage?: any
  value?: number
  webhook?: Record<string, any>
}

export interface InsightRemoveMatch {
  id: string
}

export interface InvoiceSummary {
  amount?: string
  billing_period?: string
  credits_and_adjustments?: any
  id?: string
  invoice_id?: string
  invoice_uuid?: string
  overages?: any
  product_charges?: any
  taxes?: any
  user_billing_address?: any
  user_company?: string
  user_email?: string
  user_name?: string
}

export interface InvoiceSummaryLoadMatch {
  id: string
}

export interface Kubernete {
  amd_gpu_device_metrics_exporter_plugin?: Record<string, any>
  amd_gpu_device_plugin?: Record<string, any>
  amd_gpu_dra_driver?: Record<string, any>
  auto_scale?: boolean
  auto_upgrade?: boolean
  cluster_autoscaler_configuration?: Record<string, any>
  cluster_subnet?: string
  control_plane_firewall?: Record<string, any>
  coredns_autoscaler?: Record<string, any>
  count: number
  created_at?: string
  endpoint?: string
  gpu_partition_mode?: string
  ha?: boolean
  id?: string
  ipv4?: string
  isolated_workers?: boolean
  kubernetes_version?: string
  labels?: Record<string, any>
  maintenance_policy?: Record<string, any>
  max_nodes?: number
  message?: string
  min_nodes?: number
  name: string
  nfs_csi_plugin?: Record<string, any>
  node_pools: any[]
  nodes?: any[]
  nvidia_gpu_device_plugin?: Record<string, any>
  nvidia_gpu_dra_driver?: Record<string, any>
  p2p_oci_registry_plugin?: Record<string, any>
  rdma_shared_dev_plugin?: Record<string, any>
  region: string
  registries?: any[]
  registry_enabled?: boolean
  routing_agent?: Record<string, any>
  service_subnet?: string
  size: string
  slug?: string
  sso?: Record<string, any>
  status?: Record<string, any>
  supported_features?: any[]
  surge_upgrade?: boolean
  tags?: any[]
  taints?: any[]
  timestamp?: string
  updated_at?: string
  version: string
  vpc_uuid?: string
  worker_subnet_uuid?: string
}

export interface KuberneteLoadMatch {
  cluster_id: string
  node_pool_id?: string
  expiry_second?: number
  type?: string
}

export interface KuberneteListMatch {
  cluster_id: string
  since?: string

  // Selects a custom action instead of the plain list:
  //   'cluster'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface KuberneteCreateData {
  cluster_id: string
  amd_gpu_device_metrics_exporter_plugin?: Record<string, any>
  amd_gpu_device_plugin?: Record<string, any>
  amd_gpu_dra_driver?: Record<string, any>
  auto_scale?: boolean
  auto_upgrade?: boolean
  cluster_autoscaler_configuration?: Record<string, any>
  cluster_subnet?: string
  control_plane_firewall?: Record<string, any>
  coredns_autoscaler?: Record<string, any>
  count: number
  created_at?: string
  endpoint?: string
  gpu_partition_mode?: string
  ha?: boolean
  id?: string
  ipv4?: string
  isolated_workers?: boolean
  kubernetes_version?: string
  labels?: Record<string, any>
  maintenance_policy?: Record<string, any>
  max_nodes?: number
  message?: string
  min_nodes?: number
  name: string
  nfs_csi_plugin?: Record<string, any>
  node_pools: any[]
  nodes?: any[]
  nvidia_gpu_device_plugin?: Record<string, any>
  nvidia_gpu_dra_driver?: Record<string, any>
  p2p_oci_registry_plugin?: Record<string, any>
  rdma_shared_dev_plugin?: Record<string, any>
  region: string
  registries?: any[]
  registry_enabled?: boolean
  routing_agent?: Record<string, any>
  service_subnet?: string
  size: string
  slug?: string
  sso?: Record<string, any>
  status?: Record<string, any>
  supported_features?: any[]
  surge_upgrade?: boolean
  tags?: any[]
  taints?: any[]
  timestamp?: string
  updated_at?: string
  version: string
  vpc_uuid?: string
  worker_subnet_uuid?: string

  // Selects a custom action instead of the plain create:
  //   'cluster' | 'clusterlint' | 'recycle' | 'registry' | 'registry' | 'upgrade'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface KuberneteUpdateData {
  cluster_id: string
  node_pool_id?: string
  amd_gpu_device_metrics_exporter_plugin?: Record<string, any>
  amd_gpu_device_plugin?: Record<string, any>
  amd_gpu_dra_driver?: Record<string, any>
  auto_scale?: boolean
  auto_upgrade?: boolean
  cluster_autoscaler_configuration?: Record<string, any>
  cluster_subnet?: string
  control_plane_firewall?: Record<string, any>
  coredns_autoscaler?: Record<string, any>
  count?: number
  created_at?: string
  endpoint?: string
  gpu_partition_mode?: string
  ha?: boolean
  id?: string
  ipv4?: string
  isolated_workers?: boolean
  kubernetes_version?: string
  labels?: Record<string, any>
  maintenance_policy?: Record<string, any>
  max_nodes?: number
  message?: string
  min_nodes?: number
  name?: string
  nfs_csi_plugin?: Record<string, any>
  node_pools?: any[]
  nodes?: any[]
  nvidia_gpu_device_plugin?: Record<string, any>
  nvidia_gpu_dra_driver?: Record<string, any>
  p2p_oci_registry_plugin?: Record<string, any>
  rdma_shared_dev_plugin?: Record<string, any>
  region?: string
  registries?: any[]
  registry_enabled?: boolean
  routing_agent?: Record<string, any>
  service_subnet?: string
  size?: string
  slug?: string
  sso?: Record<string, any>
  status?: Record<string, any>
  supported_features?: any[]
  surge_upgrade?: boolean
  tags?: any[]
  taints?: any[]
  timestamp?: string
  updated_at?: string
  version?: string
  vpc_uuid?: string
  worker_subnet_uuid?: string
}

export interface KuberneteRemoveMatch {
  cluster_id: string
  node_id?: string
  node_pool_id?: string
  replace?: number
  skip_drain?: number

  // Selects a custom action instead of the plain remove:
  //   'registry' | 'registry'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface KubernetesOption {
  regions?: any[]
  sizes?: any[]
  versions?: any[]
}

export interface KubernetesOptionLoadMatch {
  regions?: any[]
  sizes?: any[]
  versions?: any[]
}

export interface ListMcpServerTool {
  description?: string
  enabled?: boolean
  enabledToolSlugs: any[]
  name?: string
  quarantineReason?: string
  quarantined?: boolean
  toolSlug?: string
  tools?: any[]
  user_id?: string
}

export interface ListMcpServerToolListMatch {
  server_ref: string
}

export interface ListMcpServerToolUpdateData {
  server_ref: string
  description?: string
  enabled?: boolean
  enabledToolSlugs?: any[]
  name?: string
  quarantineReason?: string
  quarantined?: boolean
  toolSlug?: string
  tools?: any[]
  user_id?: string
}

export interface ListProvider {
  auth_type?: string
  auth_types?: any[]
  connection_parameters?: any[]
  credential_parameters?: any[]
  description?: string
  display_name?: string
  name?: string
  oauth_client_setup_url?: string
  oauth_redirect_url?: string
  scopes?: any[]
}

export interface ListProviderListMatch {
  auth_type?: string
  auth_types?: any[]
  connection_parameters?: any[]
  credential_parameters?: any[]
  description?: string
  display_name?: string
  name?: string
  oauth_client_setup_url?: string
  oauth_redirect_url?: string
  scopes?: any[]
}

export interface ListProviderHealth {
  health?: any
  provider?: string
}

export interface ListProviderHealthListMatch {
  page?: number
  per_page?: number
  provider?: string
  window?: string
}

export interface ListTool {
  definitions?: any[]
  pagination?: any
  tools?: any[]
  version?: string
}

export interface ListToolListMatch {
  page?: number
  per_page?: number
  toolkit_id?: string
}

export interface ListToolHealth {
  health?: any
  provider?: string
  tool_slug?: string
}

export interface ListToolHealthListMatch {
  page?: number
  per_page?: number
  provider?: string
  window?: string
}

export interface ListToolbeltProvider {
  categories?: any[]
  created_at?: string
  description?: string
  id?: string
  name?: string
  provider?: string
  tool_count?: number
}

export interface ListToolbeltProviderListMatch {
  name: string
  page?: number
  per_page?: number
  search?: string
  version?: string
}

export interface ListToolkit {
  categories?: any[]
  created_at?: string
  description?: string
  id?: string
  name?: string
  provider_kind?: string
}

export interface ListToolkitListMatch {
  categories?: any[]
  created_at?: string
  description?: string
  id?: string
  name?: string
  provider_kind?: string
}

export interface LoadBalancer {
  algorithm?: string
  created_at?: string
  disable_lets_encrypt_dns_records?: boolean
  domains?: any[]
  droplet_ids?: any[]
  enable_backend_keepalive?: boolean
  enable_proxy_protocol?: boolean
  firewall?: Record<string, any>
  forwarding_rules: any[]
  glb_settings?: Record<string, any>
  health_check?: Record<string, any>
  http_idle_timeout_seconds?: number
  id?: string
  ip?: string
  ipv6?: string
  name?: string
  network?: string
  network_stack?: string
  project_id?: string
  redirect_http_to_https?: boolean
  region?: Record<string, any>
  size?: string
  size_unit?: number
  status?: string
  sticky_sessions?: Record<string, any>
  subnet_uuid?: string
  tag?: string
  target_load_balancer_ids?: any[]
  tls_cipher_policy?: string
  type?: string
  vpc_uuid?: string
}

export interface LoadBalancerLoadMatch {
  id: string
}

export interface LoadBalancerListMatch {
  page?: number
  per_page?: number
}

export interface LoadBalancerCreateData {
  algorithm?: string
  created_at?: string
  disable_lets_encrypt_dns_records?: boolean
  domains?: any[]
  droplet_ids?: any[]
  enable_backend_keepalive?: boolean
  enable_proxy_protocol?: boolean
  firewall?: Record<string, any>
  forwarding_rules: any[]
  glb_settings?: Record<string, any>
  health_check?: Record<string, any>
  http_idle_timeout_seconds?: number
  id?: string
  ip?: string
  ipv6?: string
  name?: string
  network?: string
  network_stack?: string
  project_id?: string
  redirect_http_to_https?: boolean
  region?: Record<string, any>
  size?: string
  size_unit?: number
  status?: string
  sticky_sessions?: Record<string, any>
  subnet_uuid?: string
  tag?: string
  target_load_balancer_ids?: any[]
  tls_cipher_policy?: string
  type?: string
  vpc_uuid?: string

  // Selects a custom action instead of the plain create:
  //   'droplet' | 'forwarding_rule'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface LoadBalancerUpdateData {
  id: string
  algorithm?: string
  created_at?: string
  disable_lets_encrypt_dns_records?: boolean
  domains?: any[]
  droplet_ids?: any[]
  enable_backend_keepalive?: boolean
  enable_proxy_protocol?: boolean
  firewall?: Record<string, any>
  forwarding_rules?: any[]
  glb_settings?: Record<string, any>
  health_check?: Record<string, any>
  http_idle_timeout_seconds?: number
  ip?: string
  ipv6?: string
  name?: string
  network?: string
  network_stack?: string
  project_id?: string
  redirect_http_to_https?: boolean
  region?: Record<string, any>
  size?: string
  size_unit?: number
  status?: string
  sticky_sessions?: Record<string, any>
  subnet_uuid?: string
  tag?: string
  target_load_balancer_ids?: any[]
  tls_cipher_policy?: string
  type?: string
  vpc_uuid?: string
}

export interface LoadBalancerRemoveMatch {
  id: string

  // Selects a custom action instead of the plain remove:
  //   'cache' | 'droplet' | 'forwarding_rule'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface LogsSearch {
  data?: any[]
  filter?: Record<string, any>
  order_by?: any[]
  pagination?: Record<string, any>
  time_range: Record<string, any>
}

export interface LogsSearchCreateData {
  query_id: string
  data?: any[]
  filter?: Record<string, any>
  order_by?: any[]
  pagination?: Record<string, any>
  time_range: Record<string, any>
}

export interface Logsink {
  config: any
  id?: string
  sink_id: string
  sink_name: string
  sink_type: string
}

export interface LogsinkLoadMatch {
  database_id: string
  id: string
}

export interface McpServer {
  api_key?: string
  createdAt?: string
  credentialRef?: string
  credentialRefSource?: string
  description?: string
  endpoint?: string
  id?: string
  lastSyncedAt?: string
  oauth_authorization_ttl_seconds?: string
  oauth_authorize_url?: string
  oauth_client_id?: string
  oauth_client_secret?: string
  oauth_scopes?: any[]
  oauth_token_url?: string
  protocolVersion?: string
  serverRef?: string
  syncError?: string
  syncStatus?: string
  toolCount?: number
  transport?: string
  updatedAt?: string
}

export interface McpServerLoadMatch {
  id: string
}

export interface McpServerListMatch {
  api_key?: string
  createdAt?: string
  credentialRef?: string
  credentialRefSource?: string
  description?: string
  endpoint?: string
  id?: string
  lastSyncedAt?: string
  oauth_authorization_ttl_seconds?: string
  oauth_authorize_url?: string
  oauth_client_id?: string
  oauth_client_secret?: string
  oauth_scopes?: any[]
  oauth_token_url?: string
  protocolVersion?: string
  serverRef?: string
  syncError?: string
  syncStatus?: string
  toolCount?: number
  transport?: string
  updatedAt?: string
}

export interface McpServerCreateData {
  api_key?: string
  createdAt?: string
  credentialRef?: string
  credentialRefSource?: string
  description?: string
  endpoint?: string
  id?: string
  lastSyncedAt?: string
  oauth_authorization_ttl_seconds?: string
  oauth_authorize_url?: string
  oauth_client_id?: string
  oauth_client_secret?: string
  oauth_scopes?: any[]
  oauth_token_url?: string
  protocolVersion?: string
  serverRef?: string
  syncError?: string
  syncStatus?: string
  toolCount?: number
  transport?: string
  updatedAt?: string
}

export interface McpServerUpdateData {
  id: string
  api_key?: string
  createdAt?: string
  credentialRef?: string
  credentialRefSource?: string
  description?: string
  endpoint?: string
  lastSyncedAt?: string
  oauth_authorization_ttl_seconds?: string
  oauth_authorize_url?: string
  oauth_client_id?: string
  oauth_client_secret?: string
  oauth_scopes?: any[]
  oauth_token_url?: string
  protocolVersion?: string
  serverRef?: string
  syncError?: string
  syncStatus?: string
  toolCount?: number
  transport?: string
  updatedAt?: string
}

export interface McpServerRemoveMatch {
  id: string
}

export interface Message {
  content: any[]
  id: string
  max_tokens: number
  messages: any[]
  metadata?: Record<string, any>
  model: string
  reasoning_effort?: string
  role: string
  speed?: string
  stop_reason: string
  stop_sequence?: string
  stop_sequences?: any[]
  stream?: boolean
  system?: any
  temperature?: number
  thinking: Record<string, any>
  tool_choice?: any
  tools?: any[]
  top_k?: number
  top_p?: number
  type: string
  usage: Record<string, any>
}

export interface MessageCreateData {
  content: any[]
  id: string
  max_tokens: number
  messages: any[]
  metadata?: Record<string, any>
  model: string
  reasoning_effort?: string
  role: string
  speed?: string
  stop_reason: string
  stop_sequence?: string
  stop_sequences?: any[]
  stream?: boolean
  system?: any
  temperature?: number
  thinking: Record<string, any>
  tool_choice?: any
  tools?: any[]
  top_k?: number
  top_p?: number
  type: string
  usage: Record<string, any>
}

export interface Metric {
  result: any[]
  resultType: string
}

export interface MetricLoadMatch {
  aggregate?: string
  db_id?: string
  end: string
  metric?: string
  start: string
  schema?: string
  direction?: string
  host_id?: string
  interface?: string
  app_component?: string
  app_id?: string
  autoscale_pool_id?: string
  lb_id?: string
}

export interface Model {
  created: number
  id: string
  object: string
  owned_by: string
}

export interface ModelListMatch {
  created?: number
  id?: string
  object?: string
  owned_by?: string
}

export interface MonitoringAlert {
  alerts: Record<string, any>
  compare: string
  description: string
  enabled: boolean
  entities: any[]
  tags: any[]
  type: string
  uuid: string
  value: number
  window: string
}

export interface MonitoringAlertLoadMatch {
  alert_uuid: string
}

export interface MonitoringAlertListMatch {
  page?: number
  per_page?: number
}

export interface MonitoringAlertCreateData {
  alerts: Record<string, any>
  compare: string
  description: string
  enabled: boolean
  entities: any[]
  tags: any[]
  type: string
  uuid: string
  value: number
  window: string
}

export interface MonitoringAlertUpdateData {
  alert_uuid: string
  alerts?: Record<string, any>
  compare?: string
  description?: string
  enabled?: boolean
  entities?: any[]
  tags?: any[]
  type?: string
  uuid?: string
  value?: number
  window?: string
}

export interface MonitoringAlertRemoveMatch {
  alert_uuid: string
}

export interface MonitoringSink {
  destination: Record<string, any>
  destination_uuid?: string
  resources?: any[]
}

export interface MonitoringSinkLoadMatch {
  sink_uuid: string
}

export interface MonitoringSinkListMatch {
  resource_id?: string
}

export interface MonitoringSinkCreateData {
  destination: Record<string, any>
  destination_uuid?: string
  resources?: any[]
}

export interface MonitoringSinkRemoveMatch {
  sink_uuid: string
}

export interface MonitoringSinkDestination {
  config?: Record<string, any>
  id?: string
  name?: string
  type?: string
}

export interface MonitoringSinkDestinationLoadMatch {
  id: string
}

export interface MonitoringSinkDestinationListMatch {
  config?: Record<string, any>
  id?: string
  name?: string
  type?: string
}

export interface MonitoringSinkDestinationCreateData {
  config?: Record<string, any>
  id?: string
  name?: string
  type?: string
}

export interface MonitoringSinkDestinationUpdateData {
  id: string
  config?: Record<string, any>
  name?: string
  type?: string
}

export interface MonitoringSinkDestinationRemoveMatch {
  id: string
}

export interface N1Click {
  slug: string
  type: string
}

export interface N1ClickListMatch {
  type?: string
}

export interface N1ClickApplication {
  addon_slugs: any[]
  cluster_uuid: string
  message?: string
}

export interface N1ClickApplicationCreateData {
  addon_slugs: any[]
  cluster_uuid: string
  message?: string
}

export interface NeighborId {
  neighbor_ids?: any[]
}

export interface NeighborIdListMatch {
  neighbor_ids?: any[]
}

export interface Nfs {
  access_points?: any[]
  created_at: string
  host?: string
  id: string
  mount_path?: string
  name: string
  performance_tier?: string
  region: string
  size_gib: number
  status: string
  vpc_ids?: any[]
}

export interface NfsLoadMatch {
  id: string
  region?: string
}

export interface NfsListMatch {
  region?: string
}

export interface NfsCreateData {
  access_points?: any[]
  created_at: string
  host?: string
  id: string
  mount_path?: string
  name: string
  performance_tier?: string
  region: string
  size_gib: number
  status: string
  vpc_ids?: any[]
}

export interface NfsRemoveMatch {
  id: string
  region?: string
}

export interface NfsAction2 {
  id?: string
}

export interface NfsAction2CreateData {
  id: string

  // Selects a custom action instead of the plain create:
  //   'actions'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface NfsSnapshot {
  created_at: string
  id: string
  name: string
  region: string
  share_id: string
  size_gib: number
  status: string
}

export interface NfsSnapshotLoadMatch {
  id: string
  region?: string
}

export interface NfsSnapshotListMatch {
  region?: string
  share_id?: string
}

export interface OnlineMigration {
  created_at?: string
  disable_ssl?: boolean
  id?: string
  ignore_dbs?: any[]
  source: Record<string, any>
  status?: string
}

export interface OnlineMigrationLoadMatch {
  database_id: string
}

export interface OnlineMigrationUpdateData {
  database_id: string
  created_at?: string
  disable_ssl?: boolean
  id?: string
  ignore_dbs?: any[]
  source?: Record<string, any>
  status?: string
}

export interface Option {
  options?: Record<string, any>
  version_availability?: Record<string, any>
}

export interface OptionLoadMatch {
  options?: Record<string, any>
  version_availability?: Record<string, any>
}

export interface Organization {
}

export interface OrganizationListMatch {

  // Selects a custom action instead of the plain list:
  //   'team'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface OrganizationCreateData {

  // Selects a custom action instead of the plain create:
  //   'team'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface OutputView {
  audit?: Record<string, any>
  description?: string
  fields?: any[]
  id?: string
  kind?: string
  name?: string
  output_schema?: Record<string, any>
  team_id?: string
  tool?: string
  tool_id?: string
  version?: string
  view_id?: string
}

export interface OutputViewLoadMatch {
  id: string
}

export interface OutputViewListMatch {
  page_size?: number
  page_token?: string
  tool?: string
  tool_id?: string
}

export interface OutputViewCreateData {
  audit?: Record<string, any>
  description?: string
  fields?: any[]
  id?: string
  kind?: string
  name?: string
  output_schema?: Record<string, any>
  team_id?: string
  tool?: string
  tool_id?: string
  version?: string
  view_id?: string

  // Selects a custom action instead of the plain create:
  //   'preview'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface OutputViewRemoveMatch {
  id: string
}

export interface PartnerNetworkConnect {
  bgp?: Record<string, any>
  bgp_auth_key?: Record<string, any>
  children?: any[]
  cidr?: string
  connection_bandwidth_in_mbps?: number
  created_at?: string
  id?: string
  naas_provider?: string
  name?: string
  parent_uuid?: string
  region?: string
  state?: string
  vpc_ids?: any[]
}

export interface PartnerNetworkConnectLoadMatch {
  pa_id: string

  // Selects a custom action instead of the plain load:
  //   'service_key'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface PartnerNetworkConnectListMatch {
  pa_id: string
  page?: number
  per_page?: number

  // Selects a custom action instead of the plain list:
  //   'attachment'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface PartnerNetworkConnectCreateData {
  bgp?: Record<string, any>
  bgp_auth_key?: Record<string, any>
  children?: any[]
  cidr?: string
  connection_bandwidth_in_mbps?: number
  created_at?: string
  id?: string
  naas_provider?: string
  name?: string
  parent_uuid?: string
  region?: string
  state?: string
  vpc_ids?: any[]

  // Selects a custom action instead of the plain create:
  //   'attachment' | 'service_key'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface PartnerNetworkConnectUpdateData {
  pa_id: string
  bgp?: Record<string, any>
  bgp_auth_key?: Record<string, any>
  children?: any[]
  cidr?: string
  connection_bandwidth_in_mbps?: number
  created_at?: string
  id?: string
  naas_provider?: string
  name?: string
  parent_uuid?: string
  region?: string
  state?: string
  vpc_ids?: any[]
}

export interface PartnerNetworkConnectRemoveMatch {
  pa_id: string
}

export interface PrepaymentConfig {
  config?: Record<string, any>
  status?: Record<string, any>
}

export interface PrepaymentConfigLoadMatch {
  config?: Record<string, any>
  status?: Record<string, any>
}

export interface PrepaymentStatus {
  balance?: string
  blocked?: boolean
  eligible?: boolean
  is_auto_prepay_enabled?: boolean
  month_to_date_balance?: string
}

export interface PrepaymentStatusLoadMatch {
  balance?: string
  blocked?: boolean
  eligible?: boolean
  is_auto_prepay_enabled?: boolean
  month_to_date_balance?: string
}

export interface Project {
  created_at?: string
  description?: string
  environment?: string
  id?: string
  is_default?: boolean
  name?: string
  owner_id?: number
  owner_uuid?: string
  purpose?: string
  updated_at?: string
}

export interface ProjectLoadMatch {
  id: string

  // Selects a custom action instead of the plain load:
  //   'default'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface ProjectListMatch {
  page?: number
  per_page?: number
}

export interface ProjectCreateData {
  created_at?: string
  description?: string
  environment?: string
  id?: string
  is_default?: boolean
  name?: string
  owner_id?: number
  owner_uuid?: string
  purpose?: string
  updated_at?: string
}

export interface ProjectUpdateData {
  id: string
  created_at?: string
  description?: string
  environment?: string
  is_default?: boolean
  name?: string
  owner_id?: number
  owner_uuid?: string
  purpose?: string
  updated_at?: string

  // Selects a custom action instead of the plain update:
  //   'default'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface ProjectPatchData {
  id: string
  created_at?: string
  description?: string
  environment?: string
  is_default?: boolean
  name?: string
  owner_id?: number
  owner_uuid?: string
  purpose?: string
  updated_at?: string

  // Selects a custom action instead of the plain patch:
  //   'default'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface ProjectRemoveMatch {
  id: string
}

export interface ProjectResource {
  assigned_at?: string
  id?: string
  links?: Record<string, any>
  resources?: any[]
  status?: string
  urn?: string
}

export interface ProjectResourceListMatch {
  id: string
  page?: number
  per_page?: number
}

export interface ProjectResourceCreateData {
  id: string
  assigned_at?: string
  links?: Record<string, any>
  resources?: any[]
  status?: string
  urn?: string
}

export interface PromQuery {
  result: any
  resultType: string
}

export interface PromQueryLoadMatch {
  query_id: string
  query: string
  time?: string
  timeout?: string
}

export interface PromQueryCreateData {
  query_id: string
  result: any
  resultType: string
}

export interface PromQueryRange {
  result: any[]
  resultType: string
}

export interface PromQueryRangeLoadMatch {
  query_id: string
  end: string
  query: string
  start: string
  step: string
  timeout?: string
}

export interface PromQueryRangeCreateData {
  query_id: string
  result: any[]
  resultType: string
}

export interface PromSeries {
  data: any[]
  status: string
}

export interface PromSeriesListMatch {
  query_id: string
  end?: string
  match: any[]
  start?: string
}

export interface PromSeriesCreateData {
  query_id: string
  data: any[]
  status: string
}

export interface PromStringList {
  data: any[]
  status: string
}

export interface PromStringListListMatch {
  name?: string
  query_id: string
  end?: string
  match?: any[]
  start?: string
}

export interface PromStringListCreateData {
  query_id: string
  data: any[]
  status: string
}

export interface Region {
  available: boolean
  features: any[]
  name: string
  sizes: any[]
  slug: string
}

export interface RegionListMatch {
  page?: number
  per_page?: number
}

export interface ReservedIPv6 {
  droplet?: any
  ip?: string
  region_slug?: string
  reserved_at?: string
}

export interface ReservedIPv6LoadMatch {
  reserved_ipv6: string
}

export interface ReservedIPv6ListMatch {
  page?: number
  per_page?: number
}

export interface ReservedIPv6CreateData {
  droplet?: any
  ip?: string
  region_slug?: string
  reserved_at?: string
}

export interface ReservedIPv6RemoveMatch {
  reserved_ipv6: string
}

export interface ReservedIPv6Action {
  action?: Record<string, any>
}

export interface ReservedIPv6ActionCreateData {
  reserved_ipv6_id: string
  action?: Record<string, any>
}

export interface ReservedIp {
  droplet?: any
  id?: string
  ip?: string
  links?: Record<string, any>
  locked?: boolean
  project_id?: string
  region?: any
  reserved_ip?: Record<string, any>
}

export interface ReservedIpLoadMatch {
  id: string
}

export interface ReservedIpListMatch {
  page?: number
  per_page?: number
}

export interface ReservedIpCreateData {
  droplet?: any
  id?: string
  ip?: string
  links?: Record<string, any>
  locked?: boolean
  project_id?: string
  region?: any
  reserved_ip?: Record<string, any>
}

export interface ReservedIpRemoveMatch {
  id: string
}

export interface ReservedIpAction {
  action?: Record<string, any>
  completed_at?: string
  id?: number
  project_id?: string
  region: Record<string, any>
  region_slug?: string
  resource_id?: number
  resource_type?: string
  started_at?: string
  status?: string
  type?: string
}

export interface ReservedIpActionLoadMatch {
  id: number
  reserved_ip_id: string
}

export interface ReservedIpActionListMatch {
  reserved_ip_id: string
}

export interface ReservedIpActionCreateData {
  reserved_ip_id: string
  action?: Record<string, any>
  completed_at?: string
  id?: number
  project_id?: string
  region: Record<string, any>
  region_slug?: string
  resource_id?: number
  resource_type?: string
  started_at?: string
  status?: string
  type?: string
}

export interface Resync {
  authorization?: any
  mcpServer?: any
  pending?: boolean
  tools?: any[]
  user_id?: string
}

export interface ResyncCreateData {
  server_ref: string
  authorization?: any
  mcpServer?: any
  pending?: boolean
  tools?: any[]
  user_id?: string
}

export interface Search {
  actorId?: string
  agentName?: string
  agentUrn?: string
  auth_type?: string
  auth_types?: any[]
  config?: Record<string, any>
  connection_parameters?: any[]
  createdAt?: string
  credential_parameters?: any[]
  description?: string
  display_name?: string
  insights?: any
  latest_version?: string
  name?: string
  network?: any
  oauth_client_setup_url?: string
  oauth_redirect_url?: string
  owning_user_id?: string
  policy?: any
  reference_latest?: string
  scopes?: any[]
  sessionUrn?: string
  status?: string
  tool_count?: number
  tools?: Record<string, any>
  updatedAt?: string
  updated_at?: string
  version_count?: number
}

export interface SearchListMatch {
  end_user_id?: string
  page_size?: number
  page_token?: string
  query?: string
}

export interface SecurityPlan {
  tier_coverage?: Record<string, any>
}

export interface SecurityPlanUpdateData {
  tier_coverage?: Record<string, any>
}

export interface SecurityRule {
  resource?: string
}

export interface SecurityRuleCreateData {
  resource?: string
}

export interface SecurityScan {
  created_at?: string
  findings?: any[]
  id?: string
  name?: string
  status?: string
  type?: string
  urn?: string
}

export interface SecurityScanLoadMatch {
  scan_id: string
  page?: number
  per_page?: number
  severity?: string
  type?: string
}

export interface SecurityScanListMatch {
  page?: number
  per_page?: number
}

export interface SecurityScanCreateData {
  created_at?: string
  findings?: any[]
  id?: string
  name?: string
  status?: string
  type?: string
  urn?: string
}

export interface SecuritySuppression {
  resources?: any[]
  rule_uuid?: string
}

export interface SecuritySuppressionCreateData {
  resources?: any[]
  rule_uuid?: string
}

export interface SecuritySuppressionRemoveMatch {
  suppression_uuid: string
}

export interface Setting {
  plan_downgrades?: Record<string, any>
  settings?: Record<string, any>
  tier_coverage?: Record<string, any>
}

export interface SettingLoadMatch {
  page?: number
  per_page?: number
}

export interface Size {
  available: boolean
  description: string
  disk: number
  disk_info?: any[]
  gpu_info?: Record<string, any>
  memory: number
  price_hourly: number
  price_monthly: number
  regions: any[]
  slug: string
  transfer: number
  vcpus: number
}

export interface SizeListMatch {
  page?: number
  per_page?: number
}

export interface Snapshot {
  created_at: string
  id: string
  min_disk_size: number
  name: string
  regions: any[]
  resource_id: string
  resource_type: string
  size_gigabytes: number
  tags: any[]
}

export interface SnapshotLoadMatch {
  id: string
}

export interface SnapshotListMatch {
  page?: number
  per_page?: number
  resource_type?: string
}

export interface SnapshotRemoveMatch {
  id: string
}

export interface SpacesKey {
  access_key?: string
  created_at?: string
  grants?: any[]
  id?: string
  keys?: any[]
  name?: string
}

export interface SpacesKeyLoadMatch {
  id: string
}

export interface SpacesKeyListMatch {
  bucket?: string
  name?: string
  page?: number
  per_page?: number
  permission?: string
  sort?: string
  sort_direction?: string
}

export interface SpacesKeyCreateData {
  access_key?: string
  created_at?: string
  grants?: any[]
  id?: string
  keys?: any[]
  name?: string
}

export interface SpacesKeyUpdateData {
  id: string
  access_key?: string
  created_at?: string
  grants?: any[]
  keys?: any[]
  name?: string
}

export interface SpacesKeyPatchData {
  id: string
  access_key?: string
  created_at?: string
  grants?: any[]
  keys?: any[]
  name?: string
}

export interface SpacesKeyRemoveMatch {
  id: string
}

export interface SqlMode {
  sql_mode: string
}

export interface SqlModeLoadMatch {
  database_id: string
}

export interface SshKey {
  fingerprint?: string
  id?: number
  name: string
  public_key: string
}

export interface SshKeyLoadMatch {
  id: string
}

export interface SshKeyListMatch {
  page?: number
  per_page?: number
}

export interface SshKeyCreateData {
  fingerprint?: string
  id?: number
  name: string
  public_key: string
}

export interface SshKeyUpdateData {
  id: string
  fingerprint?: string
  name?: string
  public_key?: string
}

export interface SshKeyRemoveMatch {
  id: string
}

export interface Systemone {
  answers: Record<string, any>
  model: string
  questions: Record<string, any>
  state: string
  usage: Record<string, any>
}

export interface SystemoneCreateData {
  answers: Record<string, any>
  model: string
  questions: Record<string, any>
  state: string
  usage: Record<string, any>
}

export interface Tag {
  id?: string
  name?: string
  resources?: Record<string, any>
}

export interface TagLoadMatch {
  id: string
}

export interface TagListMatch {
  page?: number
  per_page?: number
}

export interface TagCreateData {
  id?: string
  name?: string
  resources?: Record<string, any>

  // Selects a custom action instead of the plain create:
  //   'resource'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface TagRemoveMatch {
  id: string

  // Selects a custom action instead of the plain remove:
  //   'resource'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface Tool {
  category?: string
  description?: string
  history?: Record<string, any>
  id?: string
  name?: string
  provider?: string
  snapshot?: any
  title?: string
  tool?: any
  tool_slug?: string
  version?: number
}

export interface ToolLoadMatch {
  id: string
  include_history?: boolean
  window?: string
}

export interface ToolListMatch {
  name: string
  provider_id: string
  page?: number
  per_page?: number
  search?: string
  version?: string

  // Selects a custom action instead of the plain list:
  //   'search'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface Toolbelt {
  created_at?: string
  description?: string
  display_name?: string
  id?: string
  latest_version?: string
  name?: string
  next_page_token?: string
  reference?: string
  reference_latest?: string
  status?: string
  tool_count?: number
  tool_details?: any[]
  toolbelt?: any
  tools?: any[]
  updated_at?: string
  version?: string
  version_count?: number
}

export interface ToolbeltLoadMatch {
  id: string
  page_size?: number
  page_token?: string
  search?: string
  version?: string
}

export interface ToolbeltListMatch {
  page?: number
  per_page?: number
  status?: string
}

export interface ToolbeltCreateData {
  created_at?: string
  description?: string
  display_name?: string
  id?: string
  latest_version?: string
  name?: string
  next_page_token?: string
  reference?: string
  reference_latest?: string
  status?: string
  tool_count?: number
  tool_details?: any[]
  toolbelt?: any
  tools?: any[]
  updated_at?: string
  version?: string
  version_count?: number

  // Selects a custom action instead of the plain create:
  //   'tool_add' | 'tool_remove'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface ToolbeltRemoveMatch {
  id: string
}

export interface Uptime {
  comparison?: string
  enabled?: boolean
  id?: string
  name?: string
  notifications: Record<string, any>
  period?: string
  previous_outage?: Record<string, any>
  regions?: any[]
  target?: string
  threshold?: number
  type?: string
}

export interface UptimeLoadMatch {
  alert_id?: string
  check_id: string
}

export interface UptimeListMatch {
  check_id: string
  page?: number
  per_page?: number

  // Selects a custom action instead of the plain list:
  //   'check'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface UptimeCreateData {
  check_id: string
  comparison?: string
  enabled?: boolean
  id?: string
  name?: string
  notifications: Record<string, any>
  period?: string
  previous_outage?: Record<string, any>
  regions?: any[]
  target?: string
  threshold?: number
  type?: string

  // Selects a custom action instead of the plain create:
  //   'check'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface UptimeUpdateData {
  alert_id?: string
  check_id: string
  comparison?: string
  enabled?: boolean
  id?: string
  name?: string
  notifications?: Record<string, any>
  period?: string
  previous_outage?: Record<string, any>
  regions?: any[]
  target?: string
  threshold?: number
  type?: string
}

export interface UptimeRemoveMatch {
  alert_id?: string
  check_id: string
}

export interface User {
  connections?: any[]
  groups?: any[]
  id?: string
  pagination?: any
  sessions?: any[]
  user_id?: string
  user_ids?: any[]
  username?: string
}

export interface UserLoadMatch {
  id: string
}

export interface UserListMatch {
  page?: number
  per_page?: number
  sort?: string
  sort_direction?: string
  user_id?: string
}

export interface VectorDatabase {
  id?: string
}

export interface VectorDatabaseRemoveMatch {
  id: string
}

export interface VectordbBackup {
  backup_id?: string
  completed_at?: string
  started_at?: string
  status?: string
}

export interface VectordbBackupListMatch {
  vector_database_id: string
}

export interface VectordbGetRestoreStatus {
  backup_id?: string
  error?: string
  status?: string
}

export interface VectordbGetRestoreStatusLoadMatch {
  backup_id: string
  vector_database_id: string
}

export interface VectordbGetVectorDb {
  config?: Record<string, any>
  created_at?: string
  endpoints?: Record<string, any>
  forked_from_id?: string
  id?: string
  last_restore_id?: string
  name?: string
  owner_uuid?: string
  project_id?: string
  region?: string
  size?: string
  status?: string
  tags?: any[]
  updated_at?: string
}

export interface VectordbGetVectorDbLoadMatch {
  id: string
}

export interface VectordbGetVectorDbListMatch {
  page?: number
  per_page?: number
}

export interface VectordbGetVectorDbCreateData {
  config?: Record<string, any>
  created_at?: string
  endpoints?: Record<string, any>
  forked_from_id?: string
  id?: string
  last_restore_id?: string
  name?: string
  owner_uuid?: string
  project_id?: string
  region?: string
  size?: string
  status?: string
  tags?: any[]
  updated_at?: string

  // Selects a custom action instead of the plain create:
  //   'resize'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface VectordbGetVectorDbAdminCredential {
  api_token?: string
  user_id?: string
}

export interface VectordbGetVectorDbAdminCredentialLoadMatch {
  vector_database_id: string
}

export interface VectordbRestoreBackup {
  backup_id?: string
  id?: string
  status?: string
}

export interface VectordbRestoreBackupCreateData {
  backup_id: string
  vector_database_id: string
  id?: string
  status?: string
}

export interface VectordbUpdateVectorDb {
  config?: Record<string, any>
  created_at?: string
  endpoints?: Record<string, any>
  forked_from_id?: string
  id?: string
  last_restore_id?: string
  name?: string
  owner_uuid?: string
  project_id?: string
  region?: string
  size?: string
  status?: string
  tags?: any[]
  updated_at?: string
}

export interface VectordbUpdateVectorDbUpdateData {
  id: string
  config?: Record<string, any>
  created_at?: string
  endpoints?: Record<string, any>
  forked_from_id?: string
  last_restore_id?: string
  name?: string
  owner_uuid?: string
  project_id?: string
  region?: string
  size?: string
  status?: string
  tags?: any[]
  updated_at?: string
}

export interface VectordbUpdateVectorDbTag {
  config?: Record<string, any>
  created_at?: string
  endpoints?: Record<string, any>
  forked_from_id?: string
  id?: string
  last_restore_id?: string
  name?: string
  owner_uuid?: string
  project_id?: string
  region?: string
  size?: string
  status?: string
  tags?: any[]
  updated_at?: string
}

export interface VectordbUpdateVectorDbTagUpdateData {
  vector_database_id: string
  config?: Record<string, any>
  created_at?: string
  endpoints?: Record<string, any>
  forked_from_id?: string
  id?: string
  last_restore_id?: string
  name?: string
  owner_uuid?: string
  project_id?: string
  region?: string
  size?: string
  status?: string
  tags?: any[]
  updated_at?: string
}

export interface Vpc {
  created_at?: string
  default?: boolean
  description?: string
  id?: string
  ip_range?: string
  name?: string
  region?: string
  status?: string
  urn?: string
  vpc_ids?: any[]
}

export interface VpcLoadMatch {
  id: string
}

export interface VpcListMatch {
  page?: number
  per_page?: number

  // Selects a custom action instead of the plain list:
  //   'member' | 'peering'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface VpcCreateData {
  created_at?: string
  default?: boolean
  description?: string
  id?: string
  ip_range?: string
  name?: string
  region?: string
  status?: string
  urn?: string
  vpc_ids?: any[]

  // Selects a custom action instead of the plain create:
  //   'peering'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface VpcUpdateData {
  id: string
  created_at?: string
  default?: boolean
  description?: string
  ip_range?: string
  name?: string
  region?: string
  status?: string
  urn?: string
  vpc_ids?: any[]
}

export interface VpcPatchData {
  id: string
  vpc_peering_id?: string
  created_at?: string
  default?: boolean
  description?: string
  ip_range?: string
  name?: string
  region?: string
  status?: string
  urn?: string
  vpc_ids?: any[]
}

export interface VpcRemoveMatch {
  id: string
}

export interface VpcNatGateway {
  created_at?: string
  egresses?: Record<string, any>
  icmp_timeout_seconds?: number
  id?: string
  name?: string
  region?: string
  size?: number
  state?: string
  tcp_timeout_seconds?: number
  type?: string
  udp_timeout_seconds?: number
  updated_at?: string
  vpcs?: any[]
}

export interface VpcNatGatewayLoadMatch {
  id: string
}

export interface VpcNatGatewayListMatch {
  name?: string
  page?: number
  per_page?: number
  region?: string
  state?: string
  type?: string
}

export interface VpcNatGatewayCreateData {
  created_at?: string
  egresses?: Record<string, any>
  icmp_timeout_seconds?: number
  id?: string
  name?: string
  region?: string
  size?: number
  state?: string
  tcp_timeout_seconds?: number
  type?: string
  udp_timeout_seconds?: number
  updated_at?: string
  vpcs?: any[]
}

export interface VpcNatGatewayUpdateData {
  id: string
  created_at?: string
  egresses?: Record<string, any>
  icmp_timeout_seconds?: number
  name?: string
  region?: string
  size?: number
  state?: string
  tcp_timeout_seconds?: number
  type?: string
  udp_timeout_seconds?: number
  updated_at?: string
  vpcs?: any[]
}

export interface VpcNatGatewayRemoveMatch {
  id: string
}

export interface VpcPeering {
  created_at?: string
  id?: string
  name?: string
  status?: string
  vpc_ids?: any[]
}

export interface VpcPeeringLoadMatch {
  id: string
}

export interface VpcPeeringListMatch {
  page?: number
  per_page?: number
  region?: string
}

export interface VpcPeeringCreateData {
  created_at?: string
  id?: string
  name?: string
  status?: string
  vpc_ids?: any[]
}

export interface VpcPeeringUpdateData {
  id: string
  created_at?: string
  name?: string
  status?: string
  vpc_ids?: any[]
}

export interface VpcPeeringRemoveMatch {
  id: string
}

export interface VpcRoutesPublicPreview {
  created_at?: string
  destination_cidr: string
  id: string
  modifiable?: boolean
  target_urns: any[]
  type: string
}

export interface VpcRoutesPublicPreviewListMatch {
  subnet_id: string
  vpc_id: string
  page?: number
  per_page?: number

  // Selects a custom action instead of the plain list:
  //   'routes'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface VpcRoutesPublicPreviewCreateData {
  subnet_id: string
  vpc_id: string
  created_at?: string
  destination_cidr: string
  id: string
  modifiable?: boolean
  target_urns: any[]
  type: string
}

export interface VpcRoutesPublicPreviewUpdateData {
  id: string
  subnet_id: string
  vpc_id: string
  created_at?: string
  destination_cidr?: string
  modifiable?: boolean
  target_urns?: any[]
  type?: string
}

export interface VpcRoutesPublicPreviewRemoveMatch {
  id: string
  subnet_id: string
  vpc_id: string
}

export interface VpcSubnetsPublicPreview {
  created_at: string
  default?: boolean
  id: string
  ip_range: string
  meta?: Record<string, any>
  name: string
  region: string
  type: string
  urn: string
}

export interface VpcSubnetsPublicPreviewLoadMatch {
  subnet_uuid: string
  vpc_id: string
}

export interface VpcSubnetsPublicPreviewListMatch {
  subnet_uuid: string
  vpc_id: string
  page?: number
  per_page?: number
  resource_type?: string

  // Selects a custom action instead of the plain list:
  //   'subnets'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface VpcSubnetsPublicPreviewCreateData {
  id: string
  created_at: string
  default?: boolean
  ip_range: string
  meta?: Record<string, any>
  name: string
  region: string
  type: string
  urn: string

  // Selects a custom action instead of the plain create:
  //   'subnets'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface VpcSubnetsPublicPreviewUpdateData {
  subnet_uuid: string
  vpc_id: string
  created_at?: string
  default?: boolean
  id?: string
  ip_range?: string
  meta?: Record<string, any>
  name?: string
  region?: string
  type?: string
  urn?: string
}

export interface VpcSubnetsPublicPreviewRemoveMatch {
  subnet_uuid: string
  vpc_id: string
}

