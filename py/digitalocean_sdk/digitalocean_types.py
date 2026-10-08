# Typed models for the Digitalocean SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
# params (op.<name>.points[].g.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.
#
# These are TypedDicts, not dataclasses: the SDK ops return/accept plain dicts
# at runtime, and a TypedDict IS a dict shape, so the types match the runtime.
# Optional (req:false) keys are modelled as TypedDict key-optionality
# (total=False), split into a required base + total=False subclass when a type
# has both required and optional keys.

from __future__ import annotations

from typing import TypedDict, Any


class AccessPointRequired(TypedDict):
    access_policy: dict
    created_at: str
    id: str
    is_default: bool
    name: str
    path: str
    share_id: str
    status: str
    updated_at: str


class AccessPoint(AccessPointRequired, total=False):
    vpc_id: str


class AccessPointLoadMatch(TypedDict):
    id: str


class AccessPointListMatchRequired(TypedDict):
    share_id: str


class AccessPointListMatch(AccessPointListMatchRequired, total=False):
    status: str


class AccessPointCreateDataRequired(TypedDict):
    share_id: str
    access_policy: dict
    created_at: str
    id: str
    is_default: bool
    name: str
    path: str
    status: str
    updated_at: str


class AccessPointCreateData(AccessPointCreateDataRequired, total=False):
    vpc_id: str


class AccessPointRemoveMatch(TypedDict):
    id: str


class AccountRequired(TypedDict):
    droplet_limit: int
    email: str
    email_verified: bool
    floating_ip_limit: int
    status: str
    status_message: str
    uuid: str


class Account(AccountRequired, total=False):
    name: str
    team: dict


class AccountLoadMatch(TypedDict, total=False):
    droplet_limit: int
    email: str
    email_verified: bool
    floating_ip_limit: int
    name: str
    status: str
    status_message: str
    team: dict
    uuid: str


class ActionRequired(TypedDict):
    region: dict


class Action(ActionRequired, total=False):
    completed_at: str
    id: int
    region_slug: str
    resource_id: int
    resource_type: str
    started_at: str
    status: str
    type: str


class ActionLoadMatch(TypedDict):
    id: int


class ActionListMatch(TypedDict, total=False):
    page: int
    per_page: int


class ActorLimitRequired(TypedDict):
    category: str
    requests_per_minute: str


class ActorLimit(ActorLimitRequired, total=False):
    id: str


class ActorLimitListMatch(TypedDict):
    id: str


class AddOnAppRequired(TypedDict):
    app_slug: str
    description: str
    display_name: str
    eula: str
    id: int
    name: str
    plans: list
    tos: str
    type: str


class AddOnApp(AddOnAppRequired, total=False):
    options: list


class AddOnAppListMatch(TypedDict, total=False):
    app_slug: str
    description: str
    display_name: str
    eula: str
    id: int
    name: str
    options: list
    plans: list
    tos: str
    type: str


class AddOnPlanRequired(TypedDict):
    app_slug: str
    has_config: bool
    name: str
    plan_slug: str
    state: str
    uuid: str


class AddOnPlan(AddOnPlanRequired, total=False):
    app_name: str
    message: str
    metadata: list
    plan_name: str
    plan_price_per_month: int
    sso_url: str


class AddOnPlanUpdateDataRequired(TypedDict):
    resource_uuid: str


class AddOnPlanUpdateData(AddOnPlanUpdateDataRequired, total=False):
    app_name: str
    app_slug: str
    has_config: bool
    message: str
    metadata: list
    name: str
    plan_name: str
    plan_price_per_month: int
    plan_slug: str
    sso_url: str
    state: str
    uuid: str


class AddOnResourceRequired(TypedDict):
    app_slug: str
    has_config: bool
    name: str
    plan_slug: str
    state: str
    uuid: str


class AddOnResource(AddOnResourceRequired, total=False):
    app_name: str
    fleet_uuid: str
    linked_droplet_id: int
    message: str
    metadata: list
    plan_name: str
    plan_price_per_month: int
    sso_url: str


class AddOnResourceLoadMatch(TypedDict):
    resource_uuid: str


class AddOnResourceListMatch(TypedDict, total=False):
    app_name: str
    app_slug: str
    fleet_uuid: str
    has_config: bool
    linked_droplet_id: int
    message: str
    metadata: list
    name: str
    plan_name: str
    plan_price_per_month: int
    plan_slug: str
    sso_url: str
    state: str
    uuid: str


class AddOnResourceCreateDataRequired(TypedDict):
    app_slug: str
    has_config: bool
    name: str
    plan_slug: str
    state: str
    uuid: str


class AddOnResourceCreateData(AddOnResourceCreateDataRequired, total=False):
    app_name: str
    fleet_uuid: str
    linked_droplet_id: int
    message: str
    metadata: list
    plan_name: str
    plan_price_per_month: int
    sso_url: str


class AddOnResourceUpdateDataRequired(TypedDict):
    resource_uuid: str


class AddOnResourceUpdateData(AddOnResourceUpdateDataRequired, total=False):
    app_name: str
    app_slug: str
    fleet_uuid: str
    has_config: bool
    linked_droplet_id: int
    message: str
    metadata: list
    name: str
    plan_name: str
    plan_price_per_month: int
    plan_slug: str
    sso_url: str
    state: str
    uuid: str


class AddOnResourceRemoveMatch(TypedDict):
    resource_uuid: str


class ApiAgentVersion(TypedDict, total=False):
    agent_uuid: str
    attached_child_agents: list
    attached_functions: list
    attached_guardrails: list
    attached_knowledgebases: list
    can_rollback: bool
    created_at: str
    created_by_email: str
    currently_applied: bool
    description: str
    id: str
    instruction: str
    k: int
    max_tokens: int
    model_name: str
    name: str
    provide_citations: bool
    retrieval_method: str
    tags: list
    temperature: float
    top_p: float
    trigger_action: str
    version_hash: str


class ApiAgentVersionListMatchRequired(TypedDict):
    agent_id: str


class ApiAgentVersionListMatch(ApiAgentVersionListMatchRequired, total=False):
    page: int
    per_page: int


class ApiCreateAgentApiKeyOutput(TypedDict, total=False):
    agent_uuid: str
    created_at: str
    created_by: str
    deleted_at: str
    name: str
    secret_key: str
    uuid: str


class ApiCreateAgentApiKeyOutputCreateDataRequired(TypedDict):
    agent_id: str


class ApiCreateAgentApiKeyOutputCreateData(ApiCreateAgentApiKeyOutputCreateDataRequired, total=False):
    agent_uuid: str
    created_at: str
    created_by: str
    deleted_at: str
    name: str
    secret_key: str
    uuid: str


class ApiCreateDataSourceFileUploadPresignedUrlsOutput(TypedDict, total=False):
    files: list
    request_id: str
    uploads: list


class ApiCreateDataSourceFileUploadPresignedUrlsOutputCreateData(TypedDict, total=False):
    files: list
    request_id: str
    uploads: list


class ApiCreateKnowledgeBaseDataSourceOutput(TypedDict, total=False):
    aws_data_source: dict
    bucket_name: str
    chunking_algorithm: str
    chunking_options: dict
    created_at: str
    dropbox_data_source: dict
    file_upload_data_source: dict
    google_drive_data_source: dict
    item_path: str
    knowledge_base_uuid: str
    last_datasource_indexing_job: dict
    region: str
    spaces_data_source: dict
    updated_at: str
    uuid: str
    web_crawler_data_source: dict


class ApiCreateKnowledgeBaseDataSourceOutputCreateDataRequired(TypedDict):
    knowledge_base_id: str


class ApiCreateKnowledgeBaseDataSourceOutputCreateData(ApiCreateKnowledgeBaseDataSourceOutputCreateDataRequired, total=False):
    aws_data_source: dict
    bucket_name: str
    chunking_algorithm: str
    chunking_options: dict
    created_at: str
    dropbox_data_source: dict
    file_upload_data_source: dict
    google_drive_data_source: dict
    item_path: str
    knowledge_base_uuid: str
    last_datasource_indexing_job: dict
    region: str
    spaces_data_source: dict
    updated_at: str
    uuid: str
    web_crawler_data_source: dict


class ApiCreateScenarioSetFromLibraryOutput(TypedDict, total=False):
    bucket_name: str
    bucket_region: str
    created_at: str
    deleted_at: str
    description: str
    failure_reason: str
    generator_model_uuid: str
    library_scenario_uuid: str
    name: str
    scenario_count: int
    scenario_set_uuid: str
    source_export_id: str
    source_goal_description: str
    source_kind: str
    spaces_key: str
    status: str
    updated_at: str
    workflow_uuid: str


class ApiCreateScenarioSetFromLibraryOutputCreateDataRequired(TypedDict):
    scenario_library_id: str


class ApiCreateScenarioSetFromLibraryOutputCreateData(ApiCreateScenarioSetFromLibraryOutputCreateDataRequired, total=False):
    bucket_name: str
    bucket_region: str
    created_at: str
    deleted_at: str
    description: str
    failure_reason: str
    generator_model_uuid: str
    library_scenario_uuid: str
    name: str
    scenario_count: int
    scenario_set_uuid: str
    source_export_id: str
    source_goal_description: str
    source_kind: str
    spaces_key: str
    status: str
    updated_at: str
    workflow_uuid: str


class ApiDeleteAgentApiKeyOutput(TypedDict):
    pass


class ApiDeleteAgentApiKeyOutputUpdateData(TypedDict):
    agent_id: str
    api_key_uuid: str


class ApiDeleteAgentApiKeyOutputRemoveMatch(TypedDict):
    agent_id: str
    api_key_uuid: str


class ApiDeleteAgentOutput(TypedDict, total=False):
    anthropic_api_key: dict
    anthropic_key_uuid: str
    api_key_infos: list
    api_keys: list
    chatbot: dict
    chatbot_identifiers: list
    child_agents: list
    conversation_logs_enabled: bool
    created_at: str
    deployment: dict
    description: str
    functions: list
    guardrails: list
    if_case: str
    instruction: str
    k: int
    knowledge_base_uuid: list
    knowledge_bases: list
    logging_config: dict
    max_tokens: int
    mcp_servers: list
    model: dict
    model_provider_key: dict
    model_provider_key_uuid: str
    model_router: dict
    model_router_uuid: str
    model_uuid: str
    name: str
    open_ai_key_uuid: str
    openai_api_key: dict
    parent_agents: list
    project_id: str
    provide_citations: bool
    reasoning_effort: str
    region: str
    retrieval_method: str
    route_created_at: str
    route_created_by: str
    route_name: str
    route_uuid: str
    router_preset_slug: str
    tags: list
    temperature: float
    template: dict
    thinking_token_budget: int
    top_p: float
    updated_at: str
    url: str
    user_id: str
    uuid: str
    version_hash: str
    vpc_egress_ips: list
    vpc_uuid: str
    web_fetch_enabled: bool
    web_search_enabled: bool
    workspace: dict
    workspace_uuid: str


class ApiDeleteAgentOutputListMatch(TypedDict, total=False):
    only_deployed: bool
    page: int
    per_page: int


class ApiDeleteAgentOutputCreateData(TypedDict, total=False):
    anthropic_api_key: dict
    anthropic_key_uuid: str
    api_key_infos: list
    api_keys: list
    chatbot: dict
    chatbot_identifiers: list
    child_agents: list
    conversation_logs_enabled: bool
    created_at: str
    deployment: dict
    description: str
    functions: list
    guardrails: list
    if_case: str
    instruction: str
    k: int
    knowledge_base_uuid: list
    knowledge_bases: list
    logging_config: dict
    max_tokens: int
    mcp_servers: list
    model: dict
    model_provider_key: dict
    model_provider_key_uuid: str
    model_router: dict
    model_router_uuid: str
    model_uuid: str
    name: str
    open_ai_key_uuid: str
    openai_api_key: dict
    parent_agents: list
    project_id: str
    provide_citations: bool
    reasoning_effort: str
    region: str
    retrieval_method: str
    route_created_at: str
    route_created_by: str
    route_name: str
    route_uuid: str
    router_preset_slug: str
    tags: list
    temperature: float
    template: dict
    thinking_token_budget: int
    top_p: float
    updated_at: str
    url: str
    user_id: str
    uuid: str
    version_hash: str
    vpc_egress_ips: list
    vpc_uuid: str
    web_fetch_enabled: bool
    web_search_enabled: bool
    workspace: dict
    workspace_uuid: str


class ApiDeleteAgentOutputRemoveMatch(TypedDict):
    uuid: str


class ApiDeleteAnthropicApiKeyOutput(TypedDict, total=False):
    api_key: str
    created_at: str
    created_by: str
    deleted_at: str
    name: str
    updated_at: str
    uuid: str


class ApiDeleteAnthropicApiKeyOutputListMatch(TypedDict, total=False):
    page: int
    per_page: int


class ApiDeleteAnthropicApiKeyOutputCreateData(TypedDict, total=False):
    api_key: str
    created_at: str
    created_by: str
    deleted_at: str
    name: str
    updated_at: str
    uuid: str


class ApiDeleteAnthropicApiKeyOutputRemoveMatch(TypedDict):
    api_key_uuid: str


class ApiDeleteCustomEvaluationMetricOutput(TypedDict):
    pass


class ApiDeleteCustomEvaluationMetricOutputRemoveMatch(TypedDict):
    metric_uuid: str


class ApiDeleteCustomModelOutputPublic(TypedDict):
    pass


class ApiDeleteCustomModelOutputPublicRemoveMatch(TypedDict):
    uuid: str


class ApiDeleteEvaluationDatasetOutput(TypedDict, total=False):
    created_at: str
    dataset_name: str
    dataset_paradigm: str
    dataset_type: str
    dataset_uuid: str
    evaluation_dataset_uuid: str
    file_size: str
    file_upload_dataset: dict
    has_ground_truth: bool
    name: str
    row_count: int


class ApiDeleteEvaluationDatasetOutputListMatch(TypedDict, total=False):
    dataset_paradigm: str
    dataset_type: str
    has_ground_truth: bool


class ApiDeleteEvaluationDatasetOutputCreateData(TypedDict, total=False):
    created_at: str
    dataset_name: str
    dataset_paradigm: str
    dataset_type: str
    dataset_uuid: str
    evaluation_dataset_uuid: str
    file_size: str
    file_upload_dataset: dict
    has_ground_truth: bool
    name: str
    row_count: int


class ApiDeleteEvaluationDatasetOutputRemoveMatch(TypedDict):
    dataset_uuid: str


class ApiDeleteKnowledgeBaseDataSourceOutput(TypedDict):
    pass


class ApiDeleteKnowledgeBaseDataSourceOutputRemoveMatch(TypedDict):
    data_source_uuid: str
    knowledge_base_id: str


class ApiDeleteKnowledgeBaseOutput(TypedDict):
    pass


class ApiDeleteKnowledgeBaseOutputRemoveMatch(TypedDict):
    uuid: str


class ApiDeleteModelApiKeyOutput(TypedDict, total=False):
    created_at: str
    created_by: str
    deleted_at: str
    name: str
    secret_key: str
    uuid: str


class ApiDeleteModelApiKeyOutputListMatch(TypedDict, total=False):
    page: int
    per_page: int


class ApiDeleteModelApiKeyOutputCreateData(TypedDict, total=False):
    created_at: str
    created_by: str
    deleted_at: str
    name: str
    secret_key: str
    uuid: str


class ApiDeleteModelApiKeyOutputUpdateDataRequired(TypedDict):
    api_key_uuid: str


class ApiDeleteModelApiKeyOutputUpdateData(ApiDeleteModelApiKeyOutputUpdateDataRequired, total=False):
    created_at: str
    created_by: str
    deleted_at: str
    name: str
    secret_key: str
    uuid: str


class ApiDeleteModelApiKeyOutputRemoveMatch(TypedDict):
    api_key_uuid: str


class ApiDeleteModelEvaluationPresetOutput(TypedDict):
    pass


class ApiDeleteModelEvaluationPresetOutputRemoveMatch(TypedDict):
    eval_preset_uuid: str


class ApiDeleteModelEvaluationRunOutputPublic(TypedDict):
    pass


class ApiDeleteModelEvaluationRunOutputPublicRemoveMatch(TypedDict):
    eval_run_uuid: str


class ApiDeleteModelRouterOutput(TypedDict):
    pass


class ApiDeleteModelRouterOutputRemoveMatch(TypedDict):
    uuid: str


class ApiDeleteOpenAiapiKeyOutput(TypedDict, total=False):
    api_key: str
    created_at: str
    created_by: str
    deleted_at: str
    models: list
    name: str
    updated_at: str
    uuid: str


class ApiDeleteOpenAiapiKeyOutputListMatch(TypedDict, total=False):
    page: int
    per_page: int


class ApiDeleteOpenAiapiKeyOutputCreateData(TypedDict, total=False):
    api_key: str
    created_at: str
    created_by: str
    deleted_at: str
    models: list
    name: str
    updated_at: str
    uuid: str


class ApiDeleteOpenAiapiKeyOutputRemoveMatch(TypedDict):
    api_key_uuid: str


class ApiDeleteScenarioSetOutput(TypedDict):
    pass


class ApiDeleteScenarioSetOutputRemoveMatch(TypedDict):
    scenario_set_uuid: str


class ApiDeleteScheduledIndexingOutput(TypedDict, total=False):
    created_at: str
    days: list
    deleted_at: str
    is_active: bool
    knowledge_base_uuid: str
    last_ran_at: str
    next_run_at: str
    time: str
    updated_at: str
    uuid: str


class ApiDeleteScheduledIndexingOutputCreateData(TypedDict, total=False):
    created_at: str
    days: list
    deleted_at: str
    is_active: bool
    knowledge_base_uuid: str
    last_ran_at: str
    next_run_at: str
    time: str
    updated_at: str
    uuid: str


class ApiDeleteScheduledIndexingOutputRemoveMatch(TypedDict):
    uuid: str


class ApiDeleteSimulationRunOutput(TypedDict):
    pass


class ApiDeleteSimulationRunOutputRemoveMatch(TypedDict):
    run_uuid: str


class ApiDeleteWorkspaceOutput(TypedDict):
    pass


class ApiDeleteWorkspaceOutputRemoveMatch(TypedDict):
    workspace_uuid: str


class ApiDropboxOauth2GetTokensOutput(TypedDict, total=False):
    code: str
    redirect_url: str
    refresh_token: str
    token: str


class ApiDropboxOauth2GetTokensOutputCreateData(TypedDict, total=False):
    code: str
    redirect_url: str
    refresh_token: str
    token: str


class ApiGenerateOauth2UrlOutput(TypedDict, total=False):
    url: str


class ApiGenerateOauth2UrlOutputLoadMatch(TypedDict, total=False):
    redirect_url: str
    type: str


class ApiGenerateScenarioSetOutput(TypedDict, total=False):
    bucket_name: str
    bucket_region: str
    created_at: str
    deleted_at: str
    description: str
    failure_reason: str
    generator_model_uuid: str
    goal_description: str
    library_scenario_uuid: str
    name: str
    num_scenarios: int
    scenario_count: int
    scenario_set_uuid: str
    source_export_id: str
    source_goal_description: str
    source_kind: str
    spaces_key: str
    status: str
    updated_at: str
    workflow_uuid: str


class ApiGenerateScenarioSetOutputCreateData(TypedDict, total=False):
    bucket_name: str
    bucket_region: str
    created_at: str
    deleted_at: str
    description: str
    failure_reason: str
    generator_model_uuid: str
    goal_description: str
    library_scenario_uuid: str
    name: str
    num_scenarios: int
    scenario_count: int
    scenario_set_uuid: str
    source_export_id: str
    source_goal_description: str
    source_kind: str
    spaces_key: str
    status: str
    updated_at: str
    workflow_uuid: str


class ApiGetAgentOutput(TypedDict, total=False):
    anthropic_api_key: dict
    api_key_infos: list
    api_keys: list
    chatbot: dict
    chatbot_identifiers: list
    child_agents: list
    conversation_logs_enabled: bool
    created_at: str
    deployment: dict
    description: str
    functions: list
    guardrails: list
    if_case: str
    instruction: str
    k: int
    knowledge_bases: list
    logging_config: dict
    max_tokens: int
    mcp_servers: list
    model: dict
    model_provider_key: dict
    model_router: dict
    name: str
    openai_api_key: dict
    parent_agents: list
    project_id: str
    provide_citations: bool
    reasoning_effort: str
    region: str
    retrieval_method: str
    route_created_at: str
    route_created_by: str
    route_name: str
    route_uuid: str
    tags: list
    temperature: float
    template: dict
    thinking_token_budget: int
    top_p: float
    updated_at: str
    url: str
    user_id: str
    uuid: str
    version_hash: str
    vpc_egress_ips: list
    vpc_uuid: str
    web_fetch_enabled: bool
    web_search_enabled: bool
    workspace: dict


class ApiGetAgentOutputLoadMatch(TypedDict):
    uuid: str


class ApiGetAgentOutputUpdateDataRequired(TypedDict):
    uuid: str


class ApiGetAgentOutputUpdateData(ApiGetAgentOutputUpdateDataRequired, total=False):
    anthropic_api_key: dict
    api_key_infos: list
    api_keys: list
    chatbot: dict
    chatbot_identifiers: list
    child_agents: list
    conversation_logs_enabled: bool
    created_at: str
    deployment: dict
    description: str
    functions: list
    guardrails: list
    if_case: str
    instruction: str
    k: int
    knowledge_bases: list
    logging_config: dict
    max_tokens: int
    mcp_servers: list
    model: dict
    model_provider_key: dict
    model_router: dict
    name: str
    openai_api_key: dict
    parent_agents: list
    project_id: str
    provide_citations: bool
    reasoning_effort: str
    region: str
    retrieval_method: str
    route_created_at: str
    route_created_by: str
    route_name: str
    route_uuid: str
    tags: list
    temperature: float
    template: dict
    thinking_token_budget: int
    top_p: float
    updated_at: str
    url: str
    user_id: str
    version_hash: str
    vpc_egress_ips: list
    vpc_uuid: str
    web_fetch_enabled: bool
    web_search_enabled: bool
    workspace: dict


class ApiGetAgentUsageOutput(TypedDict, total=False):
    log_insights_usage: dict
    usage: dict


class ApiGetAgentUsageOutputLoadMatchRequired(TypedDict):
    agent_id: str


class ApiGetAgentUsageOutputLoadMatch(ApiGetAgentUsageOutputLoadMatchRequired, total=False):
    start: str
    stop: str


class ApiGetAnthropicApiKeyOutput(TypedDict, total=False):
    created_at: str
    created_by: str
    deleted_at: str
    name: str
    updated_at: str
    uuid: str


class ApiGetAnthropicApiKeyOutputLoadMatch(TypedDict):
    api_key_uuid: str


class ApiGetChildrenOutput(TypedDict, total=False):
    anthropic_api_key: dict
    api_key_infos: list
    api_keys: list
    chatbot: dict
    chatbot_identifiers: list
    child_agents: list
    conversation_logs_enabled: bool
    created_at: str
    deployment: dict
    description: str
    functions: list
    guardrails: list
    if_case: str
    instruction: str
    k: int
    knowledge_bases: list
    logging_config: dict
    max_tokens: int
    mcp_servers: list
    model: dict
    model_provider_key: dict
    model_router: dict
    name: str
    openai_api_key: dict
    parent_agents: list
    project_id: str
    provide_citations: bool
    reasoning_effort: str
    region: str
    retrieval_method: str
    route_created_at: str
    route_created_by: str
    route_name: str
    route_uuid: str
    tags: list
    temperature: float
    template: dict
    thinking_token_budget: int
    top_p: float
    updated_at: str
    url: str
    user_id: str
    uuid: str
    version_hash: str
    vpc_egress_ips: list
    vpc_uuid: str
    web_fetch_enabled: bool
    web_search_enabled: bool
    workspace: dict


class ApiGetChildrenOutputListMatch(TypedDict):
    agent_id: str


class ApiGetCustomModelOutputPublic(TypedDict, total=False):
    active_deployments: list
    architecture: str
    config_json: dict
    context_length: int
    cost_estimate_per_month: int
    created_at: str
    description: str
    error_message: str
    file_count: int
    input_modalities: list
    license: str
    name: str
    output_modalities: list
    parameters: str
    source_ref: dict
    source_type: str
    status: str
    storage_region: str
    tags: dict
    team_id: str
    total_size_bytes: str
    updated_at: str
    uuid: str


class ApiGetCustomModelOutputPublicLoadMatch(TypedDict):
    uuid: str


class ApiGetCustomModelOutputPublicListMatch(TypedDict, total=False):
    page: int
    per_page: int
    status: str


class ApiGetCustomModelOutputPublicUpdateDataRequired(TypedDict):
    uuid: str


class ApiGetCustomModelOutputPublicUpdateData(ApiGetCustomModelOutputPublicUpdateDataRequired, total=False):
    active_deployments: list
    architecture: str
    config_json: dict
    context_length: int
    cost_estimate_per_month: int
    created_at: str
    description: str
    error_message: str
    file_count: int
    input_modalities: list
    license: str
    name: str
    output_modalities: list
    parameters: str
    source_ref: dict
    source_type: str
    status: str
    storage_region: str
    tags: dict
    team_id: str
    total_size_bytes: str
    updated_at: str


class ApiGetEvaluationDatasetDownloadUrlOutput(TypedDict, total=False):
    download_url: str
    expires_at: str


class ApiGetEvaluationDatasetDownloadUrlOutputLoadMatch(TypedDict):
    evaluation_dataset_id: str


class ApiGetEvaluationRunOutput(TypedDict, total=False):
    agent_deleted: bool
    agent_deployment_name: str
    agent_deployment_names: list
    agent_name: str
    agent_uuid: str
    agent_uuids: list
    agent_version_hash: str
    agent_workspace_uuid: str
    created_by_user_email: str
    created_by_user_id: str
    error_description: str
    evaluation_run_uuid: str
    evaluation_run_uuids: list
    evaluation_test_case_workspace_uuid: str
    finished_at: str
    pass_status: bool
    queued_at: str
    run_level_metric_results: list
    run_name: str
    star_metric_result: dict
    started_at: str
    status: str
    test_case_description: str
    test_case_name: str
    test_case_uuid: str
    test_case_version: int


class ApiGetEvaluationRunOutputLoadMatch(TypedDict):
    evaluation_run_uuid: str


class ApiGetEvaluationRunOutputCreateData(TypedDict, total=False):
    agent_deleted: bool
    agent_deployment_name: str
    agent_deployment_names: list
    agent_name: str
    agent_uuid: str
    agent_uuids: list
    agent_version_hash: str
    agent_workspace_uuid: str
    created_by_user_email: str
    created_by_user_id: str
    error_description: str
    evaluation_run_uuid: str
    evaluation_run_uuids: list
    evaluation_test_case_workspace_uuid: str
    finished_at: str
    pass_status: bool
    queued_at: str
    run_level_metric_results: list
    run_name: str
    star_metric_result: dict
    started_at: str
    status: str
    test_case_description: str
    test_case_name: str
    test_case_uuid: str
    test_case_version: int


class ApiGetEvaluationRunResultsOutput(TypedDict, total=False):
    evaluation_trace_spans: list
    ground_truth: str
    input: str
    input_tokens: str
    output: str
    output_tokens: str
    prompt_chunks: list
    prompt_id: int
    prompt_level_metric_results: list
    trace_id: str


class ApiGetEvaluationRunResultsOutputListMatchRequired(TypedDict):
    evaluation_run_id: str


class ApiGetEvaluationRunResultsOutputListMatch(ApiGetEvaluationRunResultsOutputListMatchRequired, total=False):
    page: int
    per_page: int


class ApiGetEvaluationTestCaseOutput(TypedDict, total=False):
    agent_workspace_name: str
    archived_at: str
    created_at: str
    created_by_user_email: str
    created_by_user_id: str
    dataset: dict
    dataset_name: str
    dataset_uuid: str
    description: str
    latest_version_number_of_runs: int
    metrics: list
    name: str
    star_metric: dict
    test_case_uuid: str
    total_runs: int
    updated_at: str
    updated_by_user_email: str
    updated_by_user_id: str
    version: int
    workspace_uuid: str


class ApiGetEvaluationTestCaseOutputLoadMatchRequired(TypedDict):
    test_case_uuid: str


class ApiGetEvaluationTestCaseOutputLoadMatch(ApiGetEvaluationTestCaseOutputLoadMatchRequired, total=False):
    evaluation_test_case_version: int


class ApiGetEvaluationTestCaseOutputListMatch(TypedDict, total=False):
    agent_workspace_name: str
    archived_at: str
    created_at: str
    created_by_user_email: str
    created_by_user_id: str
    dataset: dict
    dataset_name: str
    dataset_uuid: str
    description: str
    latest_version_number_of_runs: int
    metrics: list
    name: str
    star_metric: dict
    test_case_uuid: str
    total_runs: int
    updated_at: str
    updated_by_user_email: str
    updated_by_user_id: str
    version: int
    workspace_uuid: str


class ApiGetEvaluationTestCaseOutputCreateData(TypedDict, total=False):
    agent_workspace_name: str
    archived_at: str
    created_at: str
    created_by_user_email: str
    created_by_user_id: str
    dataset: dict
    dataset_name: str
    dataset_uuid: str
    description: str
    latest_version_number_of_runs: int
    metrics: list
    name: str
    star_metric: dict
    test_case_uuid: str
    total_runs: int
    updated_at: str
    updated_by_user_email: str
    updated_by_user_id: str
    version: int
    workspace_uuid: str


class ApiGetIndexingJobDetailsSignedUrlOutput(TypedDict, total=False):
    signed_url: str


class ApiGetIndexingJobDetailsSignedUrlOutputLoadMatch(TypedDict):
    indexing_job_id: str


class ApiGetKnowledgeBaseIndexingJobOutput(TypedDict, total=False):
    completed_datasources: int
    created_at: str
    data_source_jobs: list
    data_source_uuids: list
    finished_at: str
    is_report_available: bool
    knowledge_base_uuid: str
    phase: str
    started_at: str
    status: str
    tokens: int
    total_datasources: int
    total_tokens: str
    updated_at: str
    uuid: str


class ApiGetKnowledgeBaseIndexingJobOutputLoadMatch(TypedDict):
    uuid: str


class ApiGetKnowledgeBaseIndexingJobOutputListMatch(TypedDict, total=False):
    page: int
    per_page: int


class ApiGetKnowledgeBaseIndexingJobOutputCreateData(TypedDict, total=False):
    completed_datasources: int
    created_at: str
    data_source_jobs: list
    data_source_uuids: list
    finished_at: str
    is_report_available: bool
    knowledge_base_uuid: str
    phase: str
    started_at: str
    status: str
    tokens: int
    total_datasources: int
    total_tokens: str
    updated_at: str
    uuid: str


class ApiGetKnowledgeBaseIndexingJobOutputUpdateDataRequired(TypedDict):
    uuid: str


class ApiGetKnowledgeBaseIndexingJobOutputUpdateData(ApiGetKnowledgeBaseIndexingJobOutputUpdateDataRequired, total=False):
    completed_datasources: int
    created_at: str
    data_source_jobs: list
    data_source_uuids: list
    finished_at: str
    is_report_available: bool
    knowledge_base_uuid: str
    phase: str
    started_at: str
    status: str
    tokens: int
    total_datasources: int
    total_tokens: str
    updated_at: str


class ApiGetKnowledgeBaseOutput(TypedDict, total=False):
    database_status: str
    knowledge_base: dict


class ApiGetKnowledgeBaseOutputLoadMatch(TypedDict):
    uuid: str


class ApiGetModelEvaluationRunOutput(TypedDict, total=False):
    links: dict
    meta: dict
    results: list
    run: dict


class ApiGetModelEvaluationRunOutputLoadMatchRequired(TypedDict):
    eval_run_uuid: str


class ApiGetModelEvaluationRunOutputLoadMatch(ApiGetModelEvaluationRunOutputLoadMatchRequired, total=False):
    page: int
    per_page: int


class ApiGetModelEvaluationRunOutputUpdateDataRequired(TypedDict):
    eval_run_uuid: str


class ApiGetModelEvaluationRunOutputUpdateData(ApiGetModelEvaluationRunOutputUpdateDataRequired, total=False):
    links: dict
    meta: dict
    results: list
    run: dict


class ApiGetModelEvaluationRunResultsDownloadUrlOutput(TypedDict, total=False):
    download_url: str
    expires_at: str


class ApiGetModelEvaluationRunResultsDownloadUrlOutputLoadMatch(TypedDict):
    model_evaluation_run_id: str


class ApiGetModelRouterOutput(TypedDict, total=False):
    config: dict
    created_at: str
    description: str
    fallback_models: list
    name: str
    policies: list
    regions: list
    updated_at: str
    uuid: str


class ApiGetModelRouterOutputLoadMatch(TypedDict):
    uuid: str


class ApiGetModelRouterOutputListMatch(TypedDict, total=False):
    page: int
    per_page: int


class ApiGetModelRouterOutputCreateData(TypedDict, total=False):
    config: dict
    created_at: str
    description: str
    fallback_models: list
    name: str
    policies: list
    regions: list
    updated_at: str
    uuid: str


class ApiGetOpenAiapiKeyOutput(TypedDict, total=False):
    created_at: str
    created_by: str
    deleted_at: str
    models: list
    name: str
    updated_at: str
    uuid: str


class ApiGetOpenAiapiKeyOutputLoadMatch(TypedDict):
    api_key_uuid: str


class ApiGetScenarioSetDownloadUrlOutput(TypedDict, total=False):
    download_url: str
    expires_at: str


class ApiGetScenarioSetDownloadUrlOutputLoadMatch(TypedDict):
    scenario_set_id: str


class ApiGetScenarioSetOutput(TypedDict, total=False):
    bucket_name: str
    bucket_region: str
    created_at: str
    deleted_at: str
    description: str
    failure_reason: str
    file_upload_scenario_set: Any
    generator_model_uuid: str
    library_scenario_uuid: str
    name: str
    scenario_count: int
    scenario_set_uuid: str
    scenarios: list
    source_export_id: str
    source_goal_description: str
    source_kind: str
    spaces_key: str
    status: str
    updated_at: str
    workflow_uuid: str


class ApiGetScenarioSetOutputLoadMatch(TypedDict):
    scenario_set_uuid: str


class ApiGetScenarioSetOutputListMatch(TypedDict, total=False):
    page: int
    per_page: int
    search: str
    sort_by: str
    sort_direction: str
    source_kind: list
    status: list


class ApiGetScenarioSetOutputCreateData(TypedDict, total=False):
    bucket_name: str
    bucket_region: str
    created_at: str
    deleted_at: str
    description: str
    failure_reason: str
    file_upload_scenario_set: Any
    generator_model_uuid: str
    library_scenario_uuid: str
    name: str
    scenario_count: int
    scenario_set_uuid: str
    scenarios: list
    source_export_id: str
    source_goal_description: str
    source_kind: str
    spaces_key: str
    status: str
    updated_at: str
    workflow_uuid: str


class ApiGetScheduledIndexingOutput(TypedDict, total=False):
    created_at: str
    days: list
    deleted_at: str
    is_active: bool
    knowledge_base_uuid: str
    last_ran_at: str
    next_run_at: str
    time: str
    updated_at: str
    uuid: str


class ApiGetScheduledIndexingOutputLoadMatch(TypedDict):
    knowledge_base_uuid: str


class ApiGetSimulationJourneyTrajectoryUrlOutput(TypedDict, total=False):
    download_url: str
    expires_at: str


class ApiGetSimulationJourneyTrajectoryUrlOutputLoadMatch(TypedDict):
    journey_id: str
    simulation_run_id: str


class ApiGetSimulationRunOutput(TypedDict, total=False):
    scenario_results: list
    simulation_run: dict


class ApiGetSimulationRunOutputLoadMatch(TypedDict):
    run_uuid: str


class ApiGetSimulationRunOutputUpdateDataRequired(TypedDict):
    run_uuid: str


class ApiGetSimulationRunOutputUpdateData(ApiGetSimulationRunOutputUpdateDataRequired, total=False):
    scenario_results: list
    simulation_run: dict


class ApiGetWorkspaceOutput(TypedDict, total=False):
    agent_uuids: list
    agents: list
    created_at: str
    created_by: str
    created_by_email: str
    deleted_at: str
    description: str
    evaluation_test_cases: list
    name: str
    updated_at: str
    uuid: str


class ApiGetWorkspaceOutputLoadMatch(TypedDict):
    workspace_uuid: str


class ApiGetWorkspaceOutputListMatch(TypedDict, total=False):
    agent_uuids: list
    agents: list
    created_at: str
    created_by: str
    created_by_email: str
    deleted_at: str
    description: str
    evaluation_test_cases: list
    name: str
    updated_at: str
    uuid: str


class ApiGetWorkspaceOutputCreateData(TypedDict, total=False):
    agent_uuids: list
    agents: list
    created_at: str
    created_by: str
    created_by_email: str
    deleted_at: str
    description: str
    evaluation_test_cases: list
    name: str
    updated_at: str
    uuid: str


class ApiImportCustomModelOutputPublic(TypedDict, total=False):
    accept_hf_token_storage: bool
    accept_terms_and_conditions: bool
    description: str
    error: str
    import_job: dict
    model: dict
    name: str
    preferred_gpu_region: str
    source_ref: dict
    source_type: str
    tags: dict
    validation_steps: list


class ApiImportCustomModelOutputPublicCreateData(TypedDict, total=False):
    accept_hf_token_storage: bool
    accept_terms_and_conditions: bool
    description: str
    error: str
    import_job: dict
    model: dict
    name: str
    preferred_gpu_region: str
    source_ref: dict
    source_type: str
    tags: dict
    validation_steps: list


class ApiIndexedDataSource(TypedDict, total=False):
    completed_at: str
    data_source_uuid: str
    error_details: str
    error_msg: str
    failed_item_count: str
    indexed_file_count: str
    indexed_item_count: str
    removed_item_count: str
    skipped_item_count: str
    started_at: str
    status: str
    total_bytes: str
    total_bytes_indexed: str
    total_file_count: str


class ApiIndexedDataSourceListMatch(TypedDict):
    indexing_job_id: str


class ApiLinkAgentFunctionOutput(TypedDict, total=False):
    agent_uuid: str
    anthropic_api_key: dict
    api_key_infos: list
    api_keys: list
    chatbot: dict
    chatbot_identifiers: list
    child_agents: list
    conversation_logs_enabled: bool
    created_at: str
    deployment: dict
    description: str
    faas_name: str
    faas_namespace: str
    function_name: str
    functions: list
    guardrails: list
    if_case: str
    input_schema: dict
    instruction: str
    k: int
    knowledge_bases: list
    logging_config: dict
    max_tokens: int
    mcp_servers: list
    model: dict
    model_provider_key: dict
    model_router: dict
    name: str
    openai_api_key: dict
    output_schema: dict
    parent_agents: list
    project_id: str
    provide_citations: bool
    reasoning_effort: str
    region: str
    retrieval_method: str
    route_created_at: str
    route_created_by: str
    route_name: str
    route_uuid: str
    tags: list
    temperature: float
    template: dict
    thinking_token_budget: int
    top_p: float
    updated_at: str
    url: str
    user_id: str
    uuid: str
    version_hash: str
    vpc_egress_ips: list
    vpc_uuid: str
    web_fetch_enabled: bool
    web_search_enabled: bool
    workspace: dict


class ApiLinkAgentFunctionOutputCreateDataRequired(TypedDict):
    agent_id: str


class ApiLinkAgentFunctionOutputCreateData(ApiLinkAgentFunctionOutputCreateDataRequired, total=False):
    agent_uuid: str
    anthropic_api_key: dict
    api_key_infos: list
    api_keys: list
    chatbot: dict
    chatbot_identifiers: list
    child_agents: list
    conversation_logs_enabled: bool
    created_at: str
    deployment: dict
    description: str
    faas_name: str
    faas_namespace: str
    function_name: str
    functions: list
    guardrails: list
    if_case: str
    input_schema: dict
    instruction: str
    k: int
    knowledge_bases: list
    logging_config: dict
    max_tokens: int
    mcp_servers: list
    model: dict
    model_provider_key: dict
    model_router: dict
    name: str
    openai_api_key: dict
    output_schema: dict
    parent_agents: list
    project_id: str
    provide_citations: bool
    reasoning_effort: str
    region: str
    retrieval_method: str
    route_created_at: str
    route_created_by: str
    route_name: str
    route_uuid: str
    tags: list
    temperature: float
    template: dict
    thinking_token_budget: int
    top_p: float
    updated_at: str
    url: str
    user_id: str
    uuid: str
    version_hash: str
    vpc_egress_ips: list
    vpc_uuid: str
    web_fetch_enabled: bool
    web_search_enabled: bool
    workspace: dict


class ApiLinkAgentGuardrailOutput(TypedDict, total=False):
    agent_uuid: str
    anthropic_api_key: dict
    api_key_infos: list
    api_keys: list
    chatbot: dict
    chatbot_identifiers: list
    child_agents: list
    conversation_logs_enabled: bool
    created_at: str
    deployment: dict
    description: str
    functions: list
    guardrails: list
    if_case: str
    instruction: str
    k: int
    knowledge_bases: list
    logging_config: dict
    max_tokens: int
    mcp_servers: list
    model: dict
    model_provider_key: dict
    model_router: dict
    name: str
    openai_api_key: dict
    parent_agents: list
    project_id: str
    provide_citations: bool
    reasoning_effort: str
    region: str
    retrieval_method: str
    route_created_at: str
    route_created_by: str
    route_name: str
    route_uuid: str
    tags: list
    temperature: float
    template: dict
    thinking_token_budget: int
    top_p: float
    updated_at: str
    url: str
    user_id: str
    uuid: str
    version_hash: str
    vpc_egress_ips: list
    vpc_uuid: str
    web_fetch_enabled: bool
    web_search_enabled: bool
    workspace: dict


class ApiLinkAgentGuardrailOutputCreateDataRequired(TypedDict):
    agent_id: str


class ApiLinkAgentGuardrailOutputCreateData(ApiLinkAgentGuardrailOutputCreateDataRequired, total=False):
    agent_uuid: str
    anthropic_api_key: dict
    api_key_infos: list
    api_keys: list
    chatbot: dict
    chatbot_identifiers: list
    child_agents: list
    conversation_logs_enabled: bool
    created_at: str
    deployment: dict
    description: str
    functions: list
    guardrails: list
    if_case: str
    instruction: str
    k: int
    knowledge_bases: list
    logging_config: dict
    max_tokens: int
    mcp_servers: list
    model: dict
    model_provider_key: dict
    model_router: dict
    name: str
    openai_api_key: dict
    parent_agents: list
    project_id: str
    provide_citations: bool
    reasoning_effort: str
    region: str
    retrieval_method: str
    route_created_at: str
    route_created_by: str
    route_name: str
    route_uuid: str
    tags: list
    temperature: float
    template: dict
    thinking_token_budget: int
    top_p: float
    updated_at: str
    url: str
    user_id: str
    uuid: str
    version_hash: str
    vpc_egress_ips: list
    vpc_uuid: str
    web_fetch_enabled: bool
    web_search_enabled: bool
    workspace: dict


class ApiLinkAgentOutput(TypedDict, total=False):
    child_agent_uuid: str
    if_case: str
    parent_agent_uuid: str
    route_name: str


class ApiLinkAgentOutputCreateDataRequired(TypedDict):
    agent_id: str
    child_agent_uuid: str


class ApiLinkAgentOutputCreateData(ApiLinkAgentOutputCreateDataRequired, total=False):
    if_case: str
    parent_agent_uuid: str
    route_name: str


class ApiLinkKnowledgeBaseOutput(TypedDict, total=False):
    anthropic_api_key: dict
    api_key_infos: list
    api_keys: list
    chatbot: dict
    chatbot_identifiers: list
    child_agents: list
    conversation_logs_enabled: bool
    created_at: str
    deployment: dict
    description: str
    functions: list
    guardrails: list
    if_case: str
    instruction: str
    k: int
    knowledge_bases: list
    logging_config: dict
    max_tokens: int
    mcp_servers: list
    model: dict
    model_provider_key: dict
    model_router: dict
    name: str
    openai_api_key: dict
    parent_agents: list
    project_id: str
    provide_citations: bool
    reasoning_effort: str
    region: str
    retrieval_method: str
    route_created_at: str
    route_created_by: str
    route_name: str
    route_uuid: str
    tags: list
    temperature: float
    template: dict
    thinking_token_budget: int
    top_p: float
    updated_at: str
    url: str
    user_id: str
    uuid: str
    version_hash: str
    vpc_egress_ips: list
    vpc_uuid: str
    web_fetch_enabled: bool
    web_search_enabled: bool
    workspace: dict


class ApiLinkKnowledgeBaseOutputCreateDataRequired(TypedDict):
    agent_id: str


class ApiLinkKnowledgeBaseOutputCreateData(ApiLinkKnowledgeBaseOutputCreateDataRequired, total=False):
    knowledge_base_uuid: str
    anthropic_api_key: dict
    api_key_infos: list
    api_keys: list
    chatbot: dict
    chatbot_identifiers: list
    child_agents: list
    conversation_logs_enabled: bool
    created_at: str
    deployment: dict
    description: str
    functions: list
    guardrails: list
    if_case: str
    instruction: str
    k: int
    knowledge_bases: list
    logging_config: dict
    max_tokens: int
    mcp_servers: list
    model: dict
    model_provider_key: dict
    model_router: dict
    name: str
    openai_api_key: dict
    parent_agents: list
    project_id: str
    provide_citations: bool
    reasoning_effort: str
    region: str
    retrieval_method: str
    route_created_at: str
    route_created_by: str
    route_name: str
    route_uuid: str
    tags: list
    temperature: float
    template: dict
    thinking_token_budget: int
    top_p: float
    updated_at: str
    url: str
    user_id: str
    uuid: str
    version_hash: str
    vpc_egress_ips: list
    vpc_uuid: str
    web_fetch_enabled: bool
    web_search_enabled: bool
    workspace: dict


class ApiListAgentApiKeysOutput(TypedDict, total=False):
    created_at: str
    created_by: str
    deleted_at: str
    name: str
    secret_key: str
    uuid: str


class ApiListAgentApiKeysOutputListMatchRequired(TypedDict):
    agent_id: str


class ApiListAgentApiKeysOutputListMatch(ApiListAgentApiKeysOutputListMatchRequired, total=False):
    page: int
    per_page: int


class ApiListAgentsByAnthropicKeyOutput(TypedDict, total=False):
    anthropic_api_key: dict
    api_key_infos: list
    api_keys: list
    chatbot: dict
    chatbot_identifiers: list
    child_agents: list
    conversation_logs_enabled: bool
    created_at: str
    deployment: dict
    description: str
    functions: list
    guardrails: list
    if_case: str
    instruction: str
    k: int
    knowledge_bases: list
    logging_config: dict
    max_tokens: int
    mcp_servers: list
    model: dict
    model_provider_key: dict
    model_router: dict
    name: str
    openai_api_key: dict
    parent_agents: list
    project_id: str
    provide_citations: bool
    reasoning_effort: str
    region: str
    retrieval_method: str
    route_created_at: str
    route_created_by: str
    route_name: str
    route_uuid: str
    tags: list
    temperature: float
    template: dict
    thinking_token_budget: int
    top_p: float
    updated_at: str
    url: str
    user_id: str
    uuid: str
    version_hash: str
    vpc_egress_ips: list
    vpc_uuid: str
    web_fetch_enabled: bool
    web_search_enabled: bool
    workspace: dict


class ApiListAgentsByAnthropicKeyOutputListMatchRequired(TypedDict):
    key_id: str


class ApiListAgentsByAnthropicKeyOutputListMatch(ApiListAgentsByAnthropicKeyOutputListMatchRequired, total=False):
    page: int
    per_page: int


class ApiListAgentsByOpenAiKeyOutput(TypedDict, total=False):
    anthropic_api_key: dict
    api_key_infos: list
    api_keys: list
    chatbot: dict
    chatbot_identifiers: list
    child_agents: list
    conversation_logs_enabled: bool
    created_at: str
    deployment: dict
    description: str
    functions: list
    guardrails: list
    if_case: str
    instruction: str
    k: int
    knowledge_bases: list
    logging_config: dict
    max_tokens: int
    mcp_servers: list
    model: dict
    model_provider_key: dict
    model_router: dict
    name: str
    openai_api_key: dict
    parent_agents: list
    project_id: str
    provide_citations: bool
    reasoning_effort: str
    region: str
    retrieval_method: str
    route_created_at: str
    route_created_by: str
    route_name: str
    route_uuid: str
    tags: list
    temperature: float
    template: dict
    thinking_token_budget: int
    top_p: float
    updated_at: str
    url: str
    user_id: str
    uuid: str
    version_hash: str
    vpc_egress_ips: list
    vpc_uuid: str
    web_fetch_enabled: bool
    web_search_enabled: bool
    workspace: dict


class ApiListAgentsByOpenAiKeyOutputListMatchRequired(TypedDict):
    key_id: str


class ApiListAgentsByOpenAiKeyOutputListMatch(ApiListAgentsByOpenAiKeyOutputListMatchRequired, total=False):
    page: int
    per_page: int


class ApiListAgentsByWorkspaceOutput(TypedDict, total=False):
    anthropic_api_key: dict
    api_key_infos: list
    api_keys: list
    chatbot: dict
    chatbot_identifiers: list
    child_agents: list
    conversation_logs_enabled: bool
    created_at: str
    deployment: dict
    description: str
    functions: list
    guardrails: list
    if_case: str
    instruction: str
    k: int
    knowledge_bases: list
    logging_config: dict
    max_tokens: int
    mcp_servers: list
    model: dict
    model_provider_key: dict
    model_router: dict
    name: str
    openai_api_key: dict
    parent_agents: list
    project_id: str
    provide_citations: bool
    reasoning_effort: str
    region: str
    retrieval_method: str
    route_created_at: str
    route_created_by: str
    route_name: str
    route_uuid: str
    tags: list
    temperature: float
    template: dict
    thinking_token_budget: int
    top_p: float
    updated_at: str
    url: str
    user_id: str
    uuid: str
    version_hash: str
    vpc_egress_ips: list
    vpc_uuid: str
    web_fetch_enabled: bool
    web_search_enabled: bool
    workspace: dict


class ApiListAgentsByWorkspaceOutputListMatchRequired(TypedDict):
    workspace_id: str


class ApiListAgentsByWorkspaceOutputListMatch(ApiListAgentsByWorkspaceOutputListMatchRequired, total=False):
    only_deployed: bool
    page: int
    per_page: int


class ApiListEvaluationMetricsOutput(TypedDict, total=False):
    associated_presets: list
    category: str
    custom_eval_config: dict
    description: str
    evaluation_scope: str
    inverted: bool
    is_metric_goal: bool
    metric_name: str
    metric_rank: int
    metric_type: str
    metric_uuid: str
    metric_value_type: str
    range_max: float
    range_min: float
    source: str


class ApiListEvaluationMetricsOutputListMatch(TypedDict, total=False):
    associated_presets: list
    category: str
    custom_eval_config: dict
    description: str
    evaluation_scope: str
    inverted: bool
    is_metric_goal: bool
    metric_name: str
    metric_rank: int
    metric_type: str
    metric_uuid: str
    metric_value_type: str
    range_max: float
    range_min: float
    source: str


class ApiListEvaluationRunsByTestCaseOutput(TypedDict, total=False):
    agent_deleted: bool
    agent_deployment_name: str
    agent_name: str
    agent_uuid: str
    agent_version_hash: str
    agent_workspace_uuid: str
    created_by_user_email: str
    created_by_user_id: str
    error_description: str
    evaluation_run_uuid: str
    evaluation_test_case_workspace_uuid: str
    finished_at: str
    pass_status: bool
    queued_at: str
    run_level_metric_results: list
    run_name: str
    star_metric_result: dict
    started_at: str
    status: str
    test_case_description: str
    test_case_name: str
    test_case_uuid: str
    test_case_version: int


class ApiListEvaluationRunsByTestCaseOutputListMatchRequired(TypedDict):
    evaluation_test_case_id: str


class ApiListEvaluationRunsByTestCaseOutputListMatch(ApiListEvaluationRunsByTestCaseOutputListMatchRequired, total=False):
    evaluation_test_case_version: int


class ApiListEvaluationTestCasesByWorkspaceOutput(TypedDict, total=False):
    archived_at: str
    created_at: str
    created_by_user_email: str
    created_by_user_id: str
    dataset: dict
    dataset_name: str
    dataset_uuid: str
    description: str
    latest_version_number_of_runs: int
    metrics: list
    name: str
    star_metric: dict
    test_case_uuid: str
    total_runs: int
    updated_at: str
    updated_by_user_email: str
    updated_by_user_id: str
    version: int


class ApiListEvaluationTestCasesByWorkspaceOutputListMatch(TypedDict):
    workspace_id: str


class ApiListKnowledgeBaseDataSourcesOutput(TypedDict, total=False):
    aws_data_source: dict
    bucket_name: str
    chunking_algorithm: str
    chunking_options: dict
    created_at: str
    dropbox_data_source: dict
    file_upload_data_source: dict
    google_drive_data_source: dict
    item_path: str
    last_datasource_indexing_job: dict
    region: str
    spaces_data_source: dict
    updated_at: str
    uuid: str
    web_crawler_data_source: dict


class ApiListKnowledgeBaseDataSourcesOutputListMatchRequired(TypedDict):
    knowledge_base_id: str


class ApiListKnowledgeBaseDataSourcesOutputListMatch(ApiListKnowledgeBaseDataSourcesOutputListMatchRequired, total=False):
    page: int
    per_page: int


class ApiListKnowledgeBaseIndexingJobsOutput(TypedDict, total=False):
    completed_datasources: int
    created_at: str
    data_source_jobs: list
    data_source_uuids: list
    finished_at: str
    is_report_available: bool
    knowledge_base_uuid: str
    phase: str
    started_at: str
    status: str
    tokens: int
    total_datasources: int
    total_tokens: str
    updated_at: str
    uuid: str


class ApiListKnowledgeBaseIndexingJobsOutputListMatch(TypedDict):
    knowledge_base_id: str


class ApiListModelEvaluationMetricsOutput(TypedDict, total=False):
    associated_presets: list
    category: str
    custom_eval_config: dict
    description: str
    evaluation_scope: str
    inverted: bool
    is_metric_goal: bool
    metric_name: str
    metric_rank: int
    metric_type: str
    metric_uuid: str
    metric_value_type: str
    range_max: float
    range_min: float
    source: str


class ApiListModelEvaluationMetricsOutputListMatch(TypedDict, total=False):
    associated_presets: list
    category: str
    custom_eval_config: dict
    description: str
    evaluation_scope: str
    inverted: bool
    is_metric_goal: bool
    metric_name: str
    metric_rank: int
    metric_type: str
    metric_uuid: str
    metric_value_type: str
    range_max: float
    range_min: float
    source: str


class ApiListScenarioLibraryOutput(TypedDict, total=False):
    category: str
    created_at: str
    description: str
    goal_description: str
    library_scenario_uuid: str
    name: str
    scenario_count: int
    status: str
    updated_at: str


class ApiListScenarioLibraryOutputListMatch(TypedDict, total=False):
    category: str
    page: int
    per_page: int
    search: str
    sort_by: str
    sort_direction: str


class ApiListScenariosOutput(TypedDict, total=False):
    description: str
    exploration_budget: int
    max_turns: int
    name: str
    scenario_uuid: str
    stopping_criteria: list
    user_persona: str


class ApiListScenariosOutputListMatchRequired(TypedDict):
    scenario_library_id: str


class ApiListScenariosOutputListMatch(ApiListScenariosOutputListMatchRequired, total=False):
    page: int
    per_page: int
    search: str
    sort_by: str
    sort_direction: str


class ApiListSimulationJourneysOutput(TypedDict, total=False):
    created_at: str
    duration_sec: str
    failure_reason: str
    journey_index: int
    journey_uuid: str
    judge_reasoning: str
    run_uuid: str
    scenario_uuid: str
    session_id: str
    status: str
    token_usage: dict
    trajectory_bucket_name: str
    trajectory_bucket_region: str
    trajectory_spaces_key: str
    updated_at: str
    verdict: str


class ApiListSimulationJourneysOutputListMatchRequired(TypedDict):
    simulation_run_id: str


class ApiListSimulationJourneysOutputListMatch(ApiListSimulationJourneysOutputListMatchRequired, total=False):
    page: int
    per_page: int
    scenario_uuid: str
    search: str
    sort_by: str
    sort_direction: str
    status: list
    verdict: list


class ApiModelCatalogCard(TypedDict, total=False):
    availability: list
    badges: list
    benchmark_score: dict
    capabilities: list
    code_snippets: dict
    context_window: str
    created_at: str
    creator: str
    description: str
    hugging_face_id: str
    id: str
    max_output_tokens: str
    modalities: dict
    model_id: str
    name: str
    parameter_count: float
    pricing: dict
    pricing_detail: dict
    provider: str
    scaled_pricing_enabled: bool
    short_description: str
    type: str


class ApiModelCatalogCardLoadMatchRequired(TypedDict):
    id: str


class ApiModelCatalogCardLoadMatch(ApiModelCatalogCardLoadMatchRequired, total=False):
    model_id: str


class ApiModelCatalogCardListMatch(TypedDict, total=False):
    availability: list
    badge: list
    limit: int
    model_type: list
    page: int
    per_page: int
    provider: list
    search: str
    sort_by: str
    sort_direction: str
    use_case: str


class ApiModelEvaluationPreset(TypedDict, total=False):
    candidate_inference_config: dict
    candidate_model_name: str
    candidate_model_source: str
    candidate_model_uuid: str
    candidate_system_prompt: str
    created_at: str
    dataset_name: str
    dataset_uuid: str
    eval_preset_uuid: str
    id: str
    judge_model_name: str
    judge_model_uuid: str
    metrics: list
    name: str
    saved_sections: list
    star_metric: dict


class ApiModelEvaluationPresetLoadMatch(TypedDict):
    id: str


class ApiModelEvaluationPresetListMatch(TypedDict, total=False):
    candidate_inference_config: dict
    candidate_model_name: str
    candidate_model_source: str
    candidate_model_uuid: str
    candidate_system_prompt: str
    created_at: str
    dataset_name: str
    dataset_uuid: str
    eval_preset_uuid: str
    id: str
    judge_model_name: str
    judge_model_uuid: str
    metrics: list
    name: str
    saved_sections: list
    star_metric: dict


class ApiModelPublic(TypedDict, total=False):
    agreement: dict
    benchmark_score: dict
    capabilities: list
    context_window: str
    created_at: str
    description: str
    endpoints: list
    id: str
    is_foundational: bool
    kb_default_chunk_size: int
    kb_max_chunk_size: int
    kb_min_chunk_size: int
    lifecycle_status: str
    modalities: dict
    model_availability: str
    name: str
    parameter_count: float
    parent_uuid: str
    pricing: dict
    provider: str
    reasoning_efforts: list
    settings: list
    thinking: bool
    type: str
    updated_at: str
    upload_complete: bool
    url: str
    uuid: str
    version: dict


class ApiModelPublicListMatch(TypedDict, total=False):
    page: int
    per_page: int
    public_only: bool
    usecase: list


class ApiModelRouterPreset(TypedDict, total=False):
    config: dict
    display_name: str
    long_description: str
    short_description: str
    slug: str


class ApiModelRouterPresetListMatch(TypedDict, total=False):
    page: int
    per_page: int


class ApiModelRouterTaskPreset(TypedDict, total=False):
    category: str
    description: str
    models: list
    name: str
    selection_policy: dict
    tags: list
    task_slug: str


class ApiModelRouterTaskPresetListMatch(TypedDict, total=False):
    page: int
    per_page: int


class ApiMoveAgentsToWorkspaceOutput(TypedDict, total=False):
    agent_uuids: list
    agents: list
    created_at: str
    created_by: str
    created_by_email: str
    deleted_at: str
    description: str
    evaluation_test_cases: list
    name: str
    updated_at: str
    uuid: str
    workspace_uuid: str


class ApiMoveAgentsToWorkspaceOutputUpdateDataRequired(TypedDict):
    workspace_id: str


class ApiMoveAgentsToWorkspaceOutputUpdateData(ApiMoveAgentsToWorkspaceOutputUpdateDataRequired, total=False):
    agent_uuids: list
    agents: list
    created_at: str
    created_by: str
    created_by_email: str
    deleted_at: str
    description: str
    evaluation_test_cases: list
    name: str
    updated_at: str
    uuid: str
    workspace_uuid: str


class ApiPrompt(TypedDict, total=False):
    evaluation_trace_spans: list
    ground_truth: str
    input: str
    input_tokens: str
    output: str
    output_tokens: str
    prompt_chunks: list
    prompt_id: int
    prompt_level_metric_results: list
    trace_id: str


class ApiPromptLoadMatch(TypedDict):
    evaluation_run_id: str
    prompt_id: int


class ApiRollbackToAgentVersionOutput(TypedDict, total=False):
    audit_header: dict
    uuid: str
    version_hash: str


class ApiRollbackToAgentVersionOutputUpdateDataRequired(TypedDict):
    agent_id: str


class ApiRollbackToAgentVersionOutputUpdateData(ApiRollbackToAgentVersionOutputUpdateDataRequired, total=False):
    audit_header: dict
    uuid: str
    version_hash: str


class ApiSimulationJourney(TypedDict, total=False):
    created_at: str
    duration_sec: str
    failure_reason: str
    id: str
    journey_index: int
    journey_uuid: str
    judge_reasoning: str
    run_uuid: str
    scenario_uuid: str
    session_id: str
    status: str
    token_usage: dict
    trajectory_bucket_name: str
    trajectory_bucket_region: str
    trajectory_spaces_key: str
    updated_at: str
    verdict: str


class ApiSimulationJourneyLoadMatch(TypedDict):
    id: str
    simulation_run_id: str


class ApiSimulationTrajectory(TypedDict, total=False):
    agent_id: str
    completed_at: str
    duration_sec: str
    evaluation_metrics: list
    failure_reason: str
    journey_index: int
    journey_uuid: str
    judge: dict
    max_turns: int
    messages: list
    run_uuid: str
    scenario_uuid: str
    session_id: str
    started_at: str
    status: str
    token_usage: dict
    turn_count: int
    verdict: str


class ApiSimulationTrajectoryLoadMatch(TypedDict):
    journey_id: str
    simulation_run_id: str


class ApiUnlinkAgentFunctionOutput(TypedDict):
    pass


class ApiUnlinkAgentFunctionOutputRemoveMatch(TypedDict):
    agent_id: str
    function_uuid: str


class ApiUnlinkAgentGuardrailOutput(TypedDict):
    pass


class ApiUnlinkAgentGuardrailOutputRemoveMatch(TypedDict):
    agent_id: str
    guardrail_uuid: str


class ApiUnlinkAgentOutput(TypedDict):
    pass


class ApiUnlinkAgentOutputRemoveMatch(TypedDict):
    agent_id: str
    child_agent_uuid: str


class ApiUnlinkKnowledgeBaseOutput(TypedDict):
    pass


class ApiUnlinkKnowledgeBaseOutputRemoveMatch(TypedDict):
    agent_id: str
    knowledge_base_uuid: str


class ApiUpdateAgentApiKeyOutput(TypedDict, total=False):
    agent_uuid: str
    api_key_uuid: str
    created_at: str
    created_by: str
    deleted_at: str
    name: str
    secret_key: str
    uuid: str


class ApiUpdateAgentApiKeyOutputUpdateDataRequired(TypedDict):
    agent_id: str
    api_key_uuid: str


class ApiUpdateAgentApiKeyOutputUpdateData(ApiUpdateAgentApiKeyOutputUpdateDataRequired, total=False):
    agent_uuid: str
    created_at: str
    created_by: str
    deleted_at: str
    name: str
    secret_key: str
    uuid: str


class ApiUpdateAgentFunctionOutput(TypedDict, total=False):
    agent_uuid: str
    anthropic_api_key: dict
    api_key_infos: list
    api_keys: list
    chatbot: dict
    chatbot_identifiers: list
    child_agents: list
    conversation_logs_enabled: bool
    created_at: str
    deployment: dict
    description: str
    faas_name: str
    faas_namespace: str
    function_name: str
    function_uuid: str
    functions: list
    guardrails: list
    if_case: str
    input_schema: dict
    instruction: str
    k: int
    knowledge_bases: list
    logging_config: dict
    max_tokens: int
    mcp_servers: list
    model: dict
    model_provider_key: dict
    model_router: dict
    name: str
    openai_api_key: dict
    output_schema: dict
    parent_agents: list
    project_id: str
    provide_citations: bool
    reasoning_effort: str
    region: str
    retrieval_method: str
    route_created_at: str
    route_created_by: str
    route_name: str
    route_uuid: str
    tags: list
    temperature: float
    template: dict
    thinking_token_budget: int
    top_p: float
    updated_at: str
    url: str
    user_id: str
    uuid: str
    version_hash: str
    vpc_egress_ips: list
    vpc_uuid: str
    web_fetch_enabled: bool
    web_search_enabled: bool
    workspace: dict


class ApiUpdateAgentFunctionOutputUpdateDataRequired(TypedDict):
    agent_id: str
    function_uuid: str


class ApiUpdateAgentFunctionOutputUpdateData(ApiUpdateAgentFunctionOutputUpdateDataRequired, total=False):
    agent_uuid: str
    anthropic_api_key: dict
    api_key_infos: list
    api_keys: list
    chatbot: dict
    chatbot_identifiers: list
    child_agents: list
    conversation_logs_enabled: bool
    created_at: str
    deployment: dict
    description: str
    faas_name: str
    faas_namespace: str
    function_name: str
    functions: list
    guardrails: list
    if_case: str
    input_schema: dict
    instruction: str
    k: int
    knowledge_bases: list
    logging_config: dict
    max_tokens: int
    mcp_servers: list
    model: dict
    model_provider_key: dict
    model_router: dict
    name: str
    openai_api_key: dict
    output_schema: dict
    parent_agents: list
    project_id: str
    provide_citations: bool
    reasoning_effort: str
    region: str
    retrieval_method: str
    route_created_at: str
    route_created_by: str
    route_name: str
    route_uuid: str
    tags: list
    temperature: float
    template: dict
    thinking_token_budget: int
    top_p: float
    updated_at: str
    url: str
    user_id: str
    uuid: str
    version_hash: str
    vpc_egress_ips: list
    vpc_uuid: str
    web_fetch_enabled: bool
    web_search_enabled: bool
    workspace: dict


class ApiUpdateAgentOutput(TypedDict, total=False):
    agent_log_insights_enabled: bool
    allowed_domains: list
    anthropic_api_key: dict
    anthropic_key_uuid: str
    api_key_infos: list
    api_keys: list
    chatbot: dict
    chatbot_identifiers: list
    child_agents: list
    clear_mcp_servers: bool
    conversation_logs_enabled: bool
    created_at: str
    deployment: dict
    description: str
    functions: list
    guardrails: list
    if_case: str
    instruction: str
    k: int
    knowledge_bases: list
    logging_config: dict
    max_tokens: int
    mcp_servers: list
    model: dict
    model_provider_key: dict
    model_provider_key_uuid: str
    model_router: dict
    model_router_uuid: str
    model_uuid: str
    name: str
    open_ai_key_uuid: str
    openai_api_key: dict
    parent_agents: list
    project_id: str
    provide_citations: bool
    reasoning_effort: str
    region: str
    retrieval_method: str
    route_created_at: str
    route_created_by: str
    route_name: str
    route_uuid: str
    router_preset_slug: str
    tags: list
    temperature: float
    template: dict
    thinking_token_budget: int
    top_p: float
    updated_at: str
    url: str
    user_id: str
    uuid: str
    version_hash: str
    vpc_egress_ips: list
    vpc_uuid: str
    web_fetch_enabled: bool
    web_search_enabled: bool
    workspace: dict


class ApiUpdateAgentOutputUpdateDataRequired(TypedDict):
    uuid: str


class ApiUpdateAgentOutputUpdateData(ApiUpdateAgentOutputUpdateDataRequired, total=False):
    agent_log_insights_enabled: bool
    allowed_domains: list
    anthropic_api_key: dict
    anthropic_key_uuid: str
    api_key_infos: list
    api_keys: list
    chatbot: dict
    chatbot_identifiers: list
    child_agents: list
    clear_mcp_servers: bool
    conversation_logs_enabled: bool
    created_at: str
    deployment: dict
    description: str
    functions: list
    guardrails: list
    if_case: str
    instruction: str
    k: int
    knowledge_bases: list
    logging_config: dict
    max_tokens: int
    mcp_servers: list
    model: dict
    model_provider_key: dict
    model_provider_key_uuid: str
    model_router: dict
    model_router_uuid: str
    model_uuid: str
    name: str
    open_ai_key_uuid: str
    openai_api_key: dict
    parent_agents: list
    project_id: str
    provide_citations: bool
    reasoning_effort: str
    region: str
    retrieval_method: str
    route_created_at: str
    route_created_by: str
    route_name: str
    route_uuid: str
    router_preset_slug: str
    tags: list
    temperature: float
    template: dict
    thinking_token_budget: int
    top_p: float
    updated_at: str
    url: str
    user_id: str
    version_hash: str
    vpc_egress_ips: list
    vpc_uuid: str
    web_fetch_enabled: bool
    web_search_enabled: bool
    workspace: dict


class ApiUpdateAnthropicApiKeyOutput(TypedDict, total=False):
    api_key: str
    api_key_uuid: str
    created_at: str
    created_by: str
    deleted_at: str
    name: str
    updated_at: str
    uuid: str


class ApiUpdateAnthropicApiKeyOutputUpdateDataRequired(TypedDict):
    api_key_uuid: str


class ApiUpdateAnthropicApiKeyOutputUpdateData(ApiUpdateAnthropicApiKeyOutputUpdateDataRequired, total=False):
    api_key: str
    created_at: str
    created_by: str
    deleted_at: str
    name: str
    updated_at: str
    uuid: str


class ApiUpdateCustomEvaluationMetricOutput(TypedDict, total=False):
    associated_presets: list
    category: str
    config: dict
    custom_eval_config: dict
    description: str
    evaluation_scope: str
    inverted: bool
    is_metric_goal: bool
    metric_name: str
    metric_rank: int
    metric_type: str
    metric_uuid: str
    metric_value_type: str
    range_max: float
    range_min: float
    source: str


class ApiUpdateCustomEvaluationMetricOutputCreateData(TypedDict, total=False):
    associated_presets: list
    category: str
    config: dict
    custom_eval_config: dict
    description: str
    evaluation_scope: str
    inverted: bool
    is_metric_goal: bool
    metric_name: str
    metric_rank: int
    metric_type: str
    metric_uuid: str
    metric_value_type: str
    range_max: float
    range_min: float
    source: str


class ApiUpdateCustomEvaluationMetricOutputUpdateDataRequired(TypedDict):
    metric_uuid: str


class ApiUpdateCustomEvaluationMetricOutputUpdateData(ApiUpdateCustomEvaluationMetricOutputUpdateDataRequired, total=False):
    associated_presets: list
    category: str
    config: dict
    custom_eval_config: dict
    description: str
    evaluation_scope: str
    inverted: bool
    is_metric_goal: bool
    metric_name: str
    metric_rank: int
    metric_type: str
    metric_value_type: str
    range_max: float
    range_min: float
    source: str


class ApiUpdateEvaluationTestCaseOutput(TypedDict, total=False):
    dataset_uuid: str
    description: str
    metrics: dict
    name: str
    star_metric: dict
    test_case_uuid: str
    version: int


class ApiUpdateEvaluationTestCaseOutputUpdateDataRequired(TypedDict):
    test_case_uuid: str


class ApiUpdateEvaluationTestCaseOutputUpdateData(ApiUpdateEvaluationTestCaseOutputUpdateDataRequired, total=False):
    dataset_uuid: str
    description: str
    metrics: dict
    name: str
    star_metric: dict
    version: int


class ApiUpdateKnowledgeBaseDataSourceOutput(TypedDict, total=False):
    aws_data_source: dict
    bucket_name: str
    chunking_algorithm: str
    chunking_options: dict
    created_at: str
    data_source_uuid: str
    dropbox_data_source: dict
    file_upload_data_source: dict
    google_drive_data_source: dict
    item_path: str
    knowledge_base_uuid: str
    last_datasource_indexing_job: dict
    region: str
    spaces_data_source: dict
    updated_at: str
    uuid: str
    web_crawler_data_source: dict


class ApiUpdateKnowledgeBaseDataSourceOutputUpdateDataRequired(TypedDict):
    data_source_uuid: str
    knowledge_base_id: str


class ApiUpdateKnowledgeBaseDataSourceOutputUpdateData(ApiUpdateKnowledgeBaseDataSourceOutputUpdateDataRequired, total=False):
    aws_data_source: dict
    bucket_name: str
    chunking_algorithm: str
    chunking_options: dict
    created_at: str
    dropbox_data_source: dict
    file_upload_data_source: dict
    google_drive_data_source: dict
    item_path: str
    knowledge_base_uuid: str
    last_datasource_indexing_job: dict
    region: str
    spaces_data_source: dict
    updated_at: str
    uuid: str
    web_crawler_data_source: dict


class ApiUpdateKnowledgeBaseOutput(TypedDict, total=False):
    added_to_agent_at: str
    created_at: str
    database_id: str
    datasources: list
    embedding_model_uuid: str
    is_public: bool
    last_indexing_job: dict
    name: str
    project_id: str
    region: str
    reranking_config: dict
    size: str
    tags: list
    updated_at: str
    user_id: str
    uuid: str
    vpc_uuid: str


class ApiUpdateKnowledgeBaseOutputListMatch(TypedDict, total=False):
    page: int
    per_page: int


class ApiUpdateKnowledgeBaseOutputCreateData(TypedDict, total=False):
    added_to_agent_at: str
    created_at: str
    database_id: str
    datasources: list
    embedding_model_uuid: str
    is_public: bool
    last_indexing_job: dict
    name: str
    project_id: str
    region: str
    reranking_config: dict
    size: str
    tags: list
    updated_at: str
    user_id: str
    uuid: str
    vpc_uuid: str


class ApiUpdateKnowledgeBaseOutputUpdateDataRequired(TypedDict):
    uuid: str


class ApiUpdateKnowledgeBaseOutputUpdateData(ApiUpdateKnowledgeBaseOutputUpdateDataRequired, total=False):
    added_to_agent_at: str
    created_at: str
    database_id: str
    datasources: list
    embedding_model_uuid: str
    is_public: bool
    last_indexing_job: dict
    name: str
    project_id: str
    region: str
    reranking_config: dict
    size: str
    tags: list
    updated_at: str
    user_id: str
    vpc_uuid: str


class ApiUpdateLinkedAgentOutput(TypedDict, total=False):
    child_agent_uuid: str
    if_case: str
    parent_agent_uuid: str
    rollback: bool
    route_name: str
    uuid: str


class ApiUpdateLinkedAgentOutputUpdateDataRequired(TypedDict):
    agent_id: str
    child_agent_uuid: str


class ApiUpdateLinkedAgentOutputUpdateData(ApiUpdateLinkedAgentOutputUpdateDataRequired, total=False):
    if_case: str
    parent_agent_uuid: str
    rollback: bool
    route_name: str
    uuid: str


class ApiUpdateModelApiKeyOutput(TypedDict, total=False):
    api_key_uuid: str
    created_at: str
    created_by: str
    deleted_at: str
    name: str
    secret_key: str
    uuid: str


class ApiUpdateModelApiKeyOutputUpdateDataRequired(TypedDict):
    api_key_uuid: str


class ApiUpdateModelApiKeyOutputUpdateData(ApiUpdateModelApiKeyOutputUpdateDataRequired, total=False):
    created_at: str
    created_by: str
    deleted_at: str
    name: str
    secret_key: str
    uuid: str


class ApiUpdateModelEvaluationRunOutput(TypedDict, total=False):
    candidate_inference_config: dict
    candidate_model_name: str
    candidate_model_source: str
    candidate_model_uuid: str
    created_at: str
    dataset_name: str
    dataset_uuid: str
    epochs: int
    eval_preset_uuid: str
    eval_run_uuid: str
    judge_model_name: str
    judge_model_uuid: str
    metric_uuids: list
    name: str
    preset_name: str
    preset_save_sections: list
    progress: dict
    save_as_preset: bool
    source: str
    star_metric: dict
    status: str


class ApiUpdateModelEvaluationRunOutputListMatch(TypedDict, total=False):
    candidate_type: list
    eval_preset_uuid: str
    page: int
    per_page: int
    search: str
    sort_by: str
    sort_direction: str
    status: str


class ApiUpdateModelEvaluationRunOutputCreateData(TypedDict, total=False):
    candidate_inference_config: dict
    candidate_model_name: str
    candidate_model_source: str
    candidate_model_uuid: str
    created_at: str
    dataset_name: str
    dataset_uuid: str
    epochs: int
    eval_preset_uuid: str
    eval_run_uuid: str
    judge_model_name: str
    judge_model_uuid: str
    metric_uuids: list
    name: str
    preset_name: str
    preset_save_sections: list
    progress: dict
    save_as_preset: bool
    source: str
    star_metric: dict
    status: str


class ApiUpdateModelEvaluationRunOutputUpdateDataRequired(TypedDict):
    eval_run_uuid: str


class ApiUpdateModelEvaluationRunOutputUpdateData(ApiUpdateModelEvaluationRunOutputUpdateDataRequired, total=False):
    candidate_inference_config: dict
    candidate_model_name: str
    candidate_model_source: str
    candidate_model_uuid: str
    created_at: str
    dataset_name: str
    dataset_uuid: str
    epochs: int
    eval_preset_uuid: str
    judge_model_name: str
    judge_model_uuid: str
    metric_uuids: list
    name: str
    preset_name: str
    preset_save_sections: list
    progress: dict
    save_as_preset: bool
    source: str
    star_metric: dict
    status: str


class ApiUpdateModelRouterOutput(TypedDict, total=False):
    config: dict
    created_at: str
    description: str
    fallback_models: list
    name: str
    policies: list
    regions: list
    updated_at: str
    uuid: str


class ApiUpdateModelRouterOutputUpdateDataRequired(TypedDict):
    uuid: str


class ApiUpdateModelRouterOutputUpdateData(ApiUpdateModelRouterOutputUpdateDataRequired, total=False):
    config: dict
    created_at: str
    description: str
    fallback_models: list
    name: str
    policies: list
    regions: list
    updated_at: str


class ApiUpdateOpenAiapiKeyOutput(TypedDict, total=False):
    api_key: str
    api_key_uuid: str
    created_at: str
    created_by: str
    deleted_at: str
    models: list
    name: str
    updated_at: str
    uuid: str


class ApiUpdateOpenAiapiKeyOutputUpdateDataRequired(TypedDict):
    api_key_uuid: str


class ApiUpdateOpenAiapiKeyOutputUpdateData(ApiUpdateOpenAiapiKeyOutputUpdateDataRequired, total=False):
    api_key: str
    created_at: str
    created_by: str
    deleted_at: str
    models: list
    name: str
    updated_at: str
    uuid: str


class ApiUpdateScenarioSetOutput(TypedDict, total=False):
    bucket_name: str
    bucket_region: str
    created_at: str
    deleted_at: str
    description: str
    failure_reason: str
    generator_model_uuid: str
    library_scenario_uuid: str
    name: str
    scenario_count: int
    scenario_set_uuid: str
    scenarios: list
    source_export_id: str
    source_goal_description: str
    source_kind: str
    spaces_key: str
    status: str
    updated_at: str
    workflow_uuid: str


class ApiUpdateScenarioSetOutputUpdateDataRequired(TypedDict):
    scenario_set_uuid: str


class ApiUpdateScenarioSetOutputUpdateData(ApiUpdateScenarioSetOutputUpdateDataRequired, total=False):
    bucket_name: str
    bucket_region: str
    created_at: str
    deleted_at: str
    description: str
    failure_reason: str
    generator_model_uuid: str
    library_scenario_uuid: str
    name: str
    scenario_count: int
    scenarios: list
    source_export_id: str
    source_goal_description: str
    source_kind: str
    spaces_key: str
    status: str
    updated_at: str
    workflow_uuid: str


class ApiUpdateSimulationRunOutput(TypedDict, total=False):
    agent_config: dict
    created_at: str
    created_by_user_email: str
    created_by_user_id: str
    deleted_at: str
    evaluation_config: dict
    evaluation_run_uuid: str
    exploration_budget: int
    failure_reason: str
    journeys_finished: int
    judge_model_name: str
    judge_model_uuid: str
    max_turns: int
    name: str
    result_summary: dict
    run_uuid: str
    scenario_count: int
    scenario_set_uuid: str
    status: str
    total_journeys: int
    updated_at: str
    user_simulator_config: dict
    user_simulator_model_name: str
    user_simulator_model_uuid: str
    workflow_uuid: str


class ApiUpdateSimulationRunOutputListMatch(TypedDict, total=False):
    page: int
    per_page: int
    scenario_set_uuid: str
    search: str
    sort_by: str
    sort_direction: str
    status: list


class ApiUpdateSimulationRunOutputCreateData(TypedDict, total=False):
    agent_config: dict
    created_at: str
    created_by_user_email: str
    created_by_user_id: str
    deleted_at: str
    evaluation_config: dict
    evaluation_run_uuid: str
    exploration_budget: int
    failure_reason: str
    journeys_finished: int
    judge_model_name: str
    judge_model_uuid: str
    max_turns: int
    name: str
    result_summary: dict
    run_uuid: str
    scenario_count: int
    scenario_set_uuid: str
    status: str
    total_journeys: int
    updated_at: str
    user_simulator_config: dict
    user_simulator_model_name: str
    user_simulator_model_uuid: str
    workflow_uuid: str


class ApiUpdateSimulationRunOutputUpdateDataRequired(TypedDict):
    run_uuid: str


class ApiUpdateSimulationRunOutputUpdateData(ApiUpdateSimulationRunOutputUpdateDataRequired, total=False):
    agent_config: dict
    created_at: str
    created_by_user_email: str
    created_by_user_id: str
    deleted_at: str
    evaluation_config: dict
    evaluation_run_uuid: str
    exploration_budget: int
    failure_reason: str
    journeys_finished: int
    judge_model_name: str
    judge_model_uuid: str
    max_turns: int
    name: str
    result_summary: dict
    scenario_count: int
    scenario_set_uuid: str
    status: str
    total_journeys: int
    updated_at: str
    user_simulator_config: dict
    user_simulator_model_name: str
    user_simulator_model_uuid: str
    workflow_uuid: str


class ApiUpdateWorkspaceOutput(TypedDict, total=False):
    agents: list
    created_at: str
    created_by: str
    created_by_email: str
    deleted_at: str
    description: str
    evaluation_test_cases: list
    name: str
    updated_at: str
    uuid: str
    workspace_uuid: str


class ApiUpdateWorkspaceOutputUpdateDataRequired(TypedDict):
    workspace_uuid: str


class ApiUpdateWorkspaceOutputUpdateData(ApiUpdateWorkspaceOutputUpdateDataRequired, total=False):
    agents: list
    created_at: str
    created_by: str
    created_by_email: str
    deleted_at: str
    description: str
    evaluation_test_cases: list
    name: str
    updated_at: str
    uuid: str


class AppRequired(TypedDict):
    spec: dict


class App(AppRequired, total=False):
    active_deployment: dict
    autoscaling: dict
    created_at: str
    dedicated_ips: list
    default_ingress: str
    deployment: dict
    deployment_id: str
    domains: list
    id: str
    in_progress_deployment: dict
    last_deployment_created_at: str
    live_domain: str
    live_url: str
    live_url_base: str
    owner_uuid: str
    pending_deployment: Any
    pinned_deployment: Any
    project_id: str
    region: dict
    tier_slug: str
    type: str
    update_all_source_versions: bool
    updated_at: str
    vpc: dict


class AppLoadMatchRequired(TypedDict):
    id: str


class AppLoadMatch(AppLoadMatchRequired, total=False):
    event_id: str
    name: str


class AppListMatch(TypedDict, total=False):
    page: int
    per_page: int
    with_project: bool


class AppCreateDataRequired(TypedDict):
    spec: dict


class AppCreateData(AppCreateDataRequired, total=False):
    active_deployment: dict
    autoscaling: dict
    created_at: str
    dedicated_ips: list
    default_ingress: str
    deployment: dict
    deployment_id: str
    domains: list
    id: str
    in_progress_deployment: dict
    last_deployment_created_at: str
    live_domain: str
    live_url: str
    live_url_base: str
    owner_uuid: str
    pending_deployment: Any
    pinned_deployment: Any
    project_id: str
    region: dict
    tier_slug: str
    type: str
    update_all_source_versions: bool
    updated_at: str
    vpc: dict


class AppUpdateDataRequired(TypedDict):
    id: str


class AppUpdateData(AppUpdateDataRequired, total=False):
    active_deployment: dict
    autoscaling: dict
    created_at: str
    dedicated_ips: list
    default_ingress: str
    deployment: dict
    deployment_id: str
    domains: list
    in_progress_deployment: dict
    last_deployment_created_at: str
    live_domain: str
    live_url: str
    live_url_base: str
    owner_uuid: str
    pending_deployment: Any
    pinned_deployment: Any
    project_id: str
    region: dict
    spec: dict
    tier_slug: str
    type: str
    update_all_source_versions: bool
    updated_at: str
    vpc: dict


class AppRemoveMatch(TypedDict):
    id: str


class AppAlert(TypedDict, total=False):
    component_name: str
    emails: list
    id: str
    phase: str
    progress: dict
    slack_webhooks: list
    spec: dict


class AppAlertListMatch(TypedDict):
    id: str


class AppAlertCreateDataRequired(TypedDict):
    alert_id: str
    app_id: str


class AppAlertCreateData(AppAlertCreateDataRequired, total=False):
    component_name: str
    emails: list
    id: str
    phase: str
    progress: dict
    slack_webhooks: list
    spec: dict


class AppEvent(TypedDict, total=False):
    autoscaling: dict
    created_at: str
    deployment: dict
    deployment_id: str
    id: str
    type: str


class AppEventListMatchRequired(TypedDict):
    id: str


class AppEventListMatch(AppEventListMatchRequired, total=False):
    event_type: list
    page: int
    per_page: int


class AppHealth(TypedDict, total=False):
    components: list
    functions_components: list
    id: str


class AppHealthLoadMatch(TypedDict):
    id: str


class AppInstance(TypedDict, total=False):
    component_name: str
    component_type: str
    id: str
    instance_alias: str
    instance_name: str


class AppInstanceListMatch(TypedDict):
    id: str


class AppJobInvocation(TypedDict, total=False):
    completed_at: str
    created_at: str
    deployment_id: str
    id: str
    job_name: str
    phase: str
    started_at: str
    trigger: dict


class AppJobInvocationLoadMatchRequired(TypedDict):
    app_id: str
    id: str


class AppJobInvocationLoadMatch(AppJobInvocationLoadMatchRequired, total=False):
    job_name: str


class AppJobInvocationListMatchRequired(TypedDict):
    id: str


class AppJobInvocationListMatch(AppJobInvocationListMatchRequired, total=False):
    deployment_id: str
    job_name: list
    page: int
    per_page: int


class AppJobInvocationCreateDataRequired(TypedDict):
    app_id: str
    job_invocation_id: str


class AppJobInvocationCreateData(AppJobInvocationCreateDataRequired, total=False):
    job_name: str
    completed_at: str
    created_at: str
    deployment_id: str
    id: str
    phase: str
    started_at: str
    trigger: dict


class AppMetricsBandwidthUsageRequired(TypedDict):
    app_ids: list


class AppMetricsBandwidthUsage(AppMetricsBandwidthUsageRequired, total=False):
    app_bandwidth_usage: list
    app_id: str
    bandwidth_bytes: str
    date: str


class AppMetricsBandwidthUsageListMatchRequired(TypedDict):
    app_id: str


class AppMetricsBandwidthUsageListMatch(AppMetricsBandwidthUsageListMatchRequired, total=False):
    date: str


class AppMetricsBandwidthUsageCreateDataRequired(TypedDict):
    app_ids: list


class AppMetricsBandwidthUsageCreateData(AppMetricsBandwidthUsageCreateDataRequired, total=False):
    app_bandwidth_usage: list
    app_id: str
    bandwidth_bytes: str
    date: str


class AppProposeRequired(TypedDict):
    spec: dict


class AppPropose(AppProposeRequired, total=False):
    app_cost: int
    app_id: str
    app_is_static: bool
    app_name_available: bool
    app_name_suggestion: str
    app_tier_downgrade_cost: int
    existing_static_apps: str


class AppProposeCreateDataRequired(TypedDict):
    spec: dict


class AppProposeCreateData(AppProposeCreateDataRequired, total=False):
    app_cost: int
    app_id: str
    app_is_static: bool
    app_name_available: bool
    app_name_suggestion: str
    app_tier_downgrade_cost: int
    existing_static_apps: str


class AppsDeploymentRequired(TypedDict):
    spec: dict


class AppsDeployment(AppsDeploymentRequired, total=False):
    cause: str
    cloned_from: str
    components: list
    created_at: str
    deployment_id: str
    force_build: bool
    functions: list
    id: str
    jobs: list
    phase: str
    phase_last_updated_at: str
    progress: dict
    services: list
    skip_pin: bool
    static_sites: list
    tier_slug: str
    updated_at: str
    workers: list


class AppsDeploymentLoadMatch(TypedDict):
    app_id: str
    id: str


class AppsDeploymentListMatchRequired(TypedDict):
    app_id: str


class AppsDeploymentListMatch(AppsDeploymentListMatchRequired, total=False):
    deployment_type: list
    page: int
    per_page: int


class AppsDeploymentCreateDataRequired(TypedDict):
    app_id: str
    spec: dict


class AppsDeploymentCreateData(AppsDeploymentCreateDataRequired, total=False):
    deployment_id: str
    cause: str
    cloned_from: str
    components: list
    created_at: str
    force_build: bool
    functions: list
    id: str
    jobs: list
    phase: str
    phase_last_updated_at: str
    progress: dict
    services: list
    skip_pin: bool
    static_sites: list
    tier_slug: str
    updated_at: str
    workers: list


class AppsGetExec(TypedDict, total=False):
    url: str


class AppsGetExecLoadMatchRequired(TypedDict):
    app_id: str
    component_name: str


class AppsGetExecLoadMatch(AppsGetExecLoadMatchRequired, total=False):
    deployment_id: str
    instance_name: str


class AppsGetLog(TypedDict, total=False):
    historic_urls: list
    live_url: str


class AppsGetLogListMatchRequired(TypedDict):
    app_id: str
    type: str


class AppsGetLogListMatch(AppsGetLogListMatchRequired, total=False):
    component_name: str
    deployment_id: str
    follow: bool
    pod_connection_timeout: str
    invocation_id: str
    job_name: str
    tail_line: str
    event_id: str


class AppsInstanceSize(TypedDict, total=False):
    bandwidth_allowance_gib: str
    cpu_type: str
    cpus: str
    deprecation_intent: bool
    id: str
    memory_bytes: str
    name: str
    scalable: bool
    single_instance_only: bool
    slug: str
    tier_downgrade_to: str
    tier_slug: str
    tier_upgrade_to: str
    usd_per_month: str
    usd_per_second: str


class AppsInstanceSizeLoadMatch(TypedDict):
    id: str


class AppsInstanceSizeListMatch(TypedDict, total=False):
    bandwidth_allowance_gib: str
    cpu_type: str
    cpus: str
    deprecation_intent: bool
    id: str
    memory_bytes: str
    name: str
    scalable: bool
    single_instance_only: bool
    slug: str
    tier_downgrade_to: str
    tier_slug: str
    tier_upgrade_to: str
    usd_per_month: str
    usd_per_second: str


class AppsRegion(TypedDict, total=False):
    continent: str
    data_centers: list
    default: bool
    disabled: bool
    flag: str
    label: str
    reason: str
    slug: str


class AppsRegionListMatch(TypedDict, total=False):
    continent: str
    data_centers: list
    default: bool
    disabled: bool
    flag: str
    label: str
    reason: str
    slug: str


class AssociatedKubernetesResource(TypedDict, total=False):
    load_balancers: list
    volume_snapshots: list
    volumes: list


class AssociatedKubernetesResourceListMatch(TypedDict):
    cluster_id: str


class AssociatedResourceStatus(TypedDict, total=False):
    completed_at: str
    droplet: dict
    failures: int
    resources: dict


class AssociatedResourceStatusLoadMatch(TypedDict):
    droplet_id: int


class AsyncInvokeRequired(TypedDict):
    created_at: str
    input: dict
    model_id: str
    request_id: str
    status: str


class AsyncInvoke(AsyncInvokeRequired, total=False):
    completed_at: str
    error: str
    output: dict
    started_at: str
    tags: list


class AsyncInvokeCreateDataRequired(TypedDict):
    created_at: str
    input: dict
    model_id: str
    request_id: str
    status: str


class AsyncInvokeCreateData(AsyncInvokeCreateDataRequired, total=False):
    completed_at: str
    error: str
    output: dict
    started_at: str
    tags: list


class Balance(TypedDict, total=False):
    account_balance: str
    generated_at: str
    month_to_date_balance: str
    month_to_date_usage: str


class BalanceLoadMatch(TypedDict, total=False):
    account_balance: str
    generated_at: str
    month_to_date_balance: str
    month_to_date_usage: str


class BatchRequired(TypedDict):
    batch_id: str
    completion_window: str
    created_at: str
    file_id: str
    input_file_id: str
    provider: str
    status: str


class Batch(BatchRequired, total=False):
    cancelled_at: str
    completed_at: str
    endpoint: str
    error_file_id: str
    errors: list
    expires_at: str
    failed_at: str
    finalizing_at: str
    id: str
    in_progress_at: str
    metadata: dict
    output_file_id: str
    request_counts: dict
    request_id: str


class BatchLoadMatch(TypedDict):
    id: str


class BatchListMatch(TypedDict, total=False):
    after: str
    limit: int
    status: str


class BatchCreateDataRequired(TypedDict):
    batch_id: str
    completion_window: str
    created_at: str
    file_id: str
    input_file_id: str
    provider: str
    status: str


class BatchCreateData(BatchCreateDataRequired, total=False):
    cancelled_at: str
    completed_at: str
    endpoint: str
    error_file_id: str
    errors: list
    expires_at: str
    failed_at: str
    finalizing_at: str
    id: str
    in_progress_at: str
    metadata: dict
    output_file_id: str
    request_counts: dict
    request_id: str


class BatchFileCreate(TypedDict):
    file_name: str


class BatchFileCreateCreateData(TypedDict):
    file_name: str


class BatchInference(TypedDict):
    pass


class BatchInferenceUpdateData(TypedDict):
    pass


class BatchResultRequired(TypedDict):
    batch_id: str
    result_available: bool


class BatchResult(BatchResultRequired, total=False):
    error_file_url: str
    expires_at: str
    id: str
    output_file_url: str


class BatchResultLoadMatch(TypedDict):
    id: str


class BillingRequired(TypedDict):
    current_page: int
    data_points: list
    meta: Any
    total_items: int
    total_pages: int


class Billing(BillingRequired, total=False):
    amount: str
    date: str
    description: str
    id: str
    invoice_id: str
    invoice_items: list
    invoice_period: str
    invoice_uuid: str
    links: dict
    type: str
    updated_at: str


class BillingLoadMatchRequired(TypedDict):
    invoice_uuid: str


class BillingLoadMatch(BillingLoadMatchRequired, total=False):
    page: int
    per_page: int


class BillingListMatch(TypedDict, total=False):
    amount: str
    current_page: int
    data_points: list
    date: str
    description: str
    id: str
    invoice_id: str
    invoice_items: list
    invoice_period: str
    invoice_uuid: str
    links: dict
    meta: Any
    total_items: int
    total_pages: int
    type: str
    updated_at: str


class BlockStorageRequired(TypedDict):
    created_at: str
    id: str
    min_disk_size: int
    name: str
    regions: list
    resource_id: str
    resource_type: str
    size_gigabytes: float
    tags: list


class BlockStorage(BlockStorageRequired, total=False):
    description: str
    droplet_ids: list
    filesystem_label: str
    filesystem_type: str
    region: Any
    volume: dict


class BlockStorageLoadMatch(TypedDict):
    volume_id: str


class BlockStorageListMatch(TypedDict, total=False):
    name: str
    page: int
    per_page: int
    region: str


class BlockStorageCreateDataRequired(TypedDict):
    created_at: str
    id: str
    min_disk_size: int
    name: str
    regions: list
    resource_id: str
    resource_type: str
    size_gigabytes: float
    tags: list


class BlockStorageCreateData(BlockStorageCreateDataRequired, total=False):
    description: str
    droplet_ids: list
    filesystem_label: str
    filesystem_type: str
    region: Any
    volume: dict


class BlockStorageRemoveMatch(TypedDict):
    volume_id: str


class BlockStorageActionRequired(TypedDict):
    region: dict


class BlockStorageAction(BlockStorageActionRequired, total=False):
    completed_at: str
    id: int
    region_slug: str
    resource_id: int
    resource_type: str
    started_at: str
    status: str
    type: str


class BlockStorageActionLoadMatchRequired(TypedDict):
    id: int
    volume_id: str


class BlockStorageActionLoadMatch(BlockStorageActionLoadMatchRequired, total=False):
    page: int
    per_page: int


class BlockStorageActionListMatchRequired(TypedDict):
    volume_id: str


class BlockStorageActionListMatch(BlockStorageActionListMatchRequired, total=False):
    page: int
    per_page: int


class BlockStorageActionCreateDataRequired(TypedDict):
    region: dict


class BlockStorageActionCreateData(BlockStorageActionCreateDataRequired, total=False):
    page: int
    per_page: int
    completed_at: str
    id: int
    region_slug: str
    resource_id: int
    resource_type: str
    started_at: str
    status: str
    type: str


class ByoipPrefixRequired(TypedDict):
    signature: str


class ByoipPrefix(ByoipPrefixRequired, total=False):
    advertise: bool
    advertised: bool
    failure_reason: str
    id: str
    locked: bool
    name: str
    prefix: str
    project_id: str
    region: str
    status: str
    uuid: str
    validations: list


class ByoipPrefixLoadMatch(TypedDict):
    id: str


class ByoipPrefixListMatch(TypedDict, total=False):
    page: int
    per_page: int


class ByoipPrefixCreateDataRequired(TypedDict):
    signature: str


class ByoipPrefixCreateData(ByoipPrefixCreateDataRequired, total=False):
    advertise: bool
    advertised: bool
    failure_reason: str
    id: str
    locked: bool
    name: str
    prefix: str
    project_id: str
    region: str
    status: str
    uuid: str
    validations: list


class ByoipPrefixUpdateDataRequired(TypedDict):
    id: str


class ByoipPrefixUpdateData(ByoipPrefixUpdateDataRequired, total=False):
    advertise: bool
    advertised: bool
    failure_reason: str
    locked: bool
    name: str
    prefix: str
    project_id: str
    region: str
    signature: str
    status: str
    uuid: str
    validations: list


class ByoipPrefixRemoveMatch(TypedDict):
    id: str


class CdnEndpointRequired(TypedDict):
    origin: str


class CdnEndpoint(CdnEndpointRequired, total=False):
    certificate_id: str
    created_at: str
    custom_domain: str
    endpoint: str
    id: str
    ttl: int


class CdnEndpointLoadMatch(TypedDict):
    id: str


class CdnEndpointListMatch(TypedDict, total=False):
    page: int
    per_page: int


class CdnEndpointCreateDataRequired(TypedDict):
    origin: str


class CdnEndpointCreateData(CdnEndpointCreateDataRequired, total=False):
    certificate_id: str
    created_at: str
    custom_domain: str
    endpoint: str
    id: str
    ttl: int


class CdnEndpointUpdateDataRequired(TypedDict):
    id: str


class CdnEndpointUpdateData(CdnEndpointUpdateDataRequired, total=False):
    certificate_id: str
    created_at: str
    custom_domain: str
    endpoint: str
    origin: str
    ttl: int


class CdnEndpointRemoveMatch(TypedDict):
    id: str


class Certificate(TypedDict, total=False):
    certificate: dict
    created_at: str
    dns_names: list
    id: str
    name: str
    not_after: str
    sha1_fingerprint: str
    state: str
    type: str


class CertificateLoadMatch(TypedDict):
    id: str


class CertificateListMatch(TypedDict, total=False):
    name: str
    page: int
    per_page: int


class CertificateCreateData(TypedDict, total=False):
    certificate: dict
    created_at: str
    dns_names: list
    id: str
    name: str
    not_after: str
    sha1_fingerprint: str
    state: str
    type: str


class CertificateRemoveMatch(TypedDict):
    id: str


class ChatCompletionRequired(TypedDict):
    choices: list
    created: int
    id: str
    messages: list
    model: str
    object: str
    usage: dict


class ChatCompletion(ChatCompletionRequired, total=False):
    frequency_penalty: float
    logit_bias: dict
    logprobs: bool
    max_completion_tokens: int
    max_tokens: int
    metadata: dict
    n: int
    presence_penalty: float
    reasoning_effort: str
    seed: int
    stop: Any
    stream: bool
    stream_options: dict
    temperature: float
    tool_choice: Any
    tools: list
    top_logprobs: int
    top_p: float
    user: str


class ChatCompletionCreateDataRequired(TypedDict):
    choices: list
    created: int
    id: str
    messages: list
    model: str
    object: str
    usage: dict


class ChatCompletionCreateData(ChatCompletionCreateDataRequired, total=False):
    frequency_penalty: float
    logit_bias: dict
    logprobs: bool
    max_completion_tokens: int
    max_tokens: int
    metadata: dict
    n: int
    presence_penalty: float
    reasoning_effort: str
    seed: int
    stop: Any
    stream: bool
    stream_options: dict
    temperature: float
    tool_choice: Any
    tools: list
    top_logprobs: int
    top_p: float
    user: str


class Clusterlint(TypedDict, total=False):
    check_name: str
    message: str
    object: dict
    severity: str


class ClusterlintListMatchRequired(TypedDict):
    cluster_id: str


class ClusterlintListMatch(ClusterlintListMatchRequired, total=False):
    run_id: str


class ConnectionRequired(TypedDict):
    provider: str
    user_id: str


class Connection(ConnectionRequired, total=False):
    api_key: dict
    authorization: Any
    connection: Any
    connection_parameters: dict
    created_at: str
    credential: dict
    credential_id: str
    credential_kind: str
    granted_at: str
    id: str
    network: dict
    oauth: dict
    owning_user_id: str
    provider_display_name: str
    revoked_at: str
    scopes: list
    status: str
    updated_at: str


class ConnectionLoadMatch(TypedDict):
    id: str


class ConnectionListMatch(TypedDict, total=False):
    page: int
    per_page: int
    provider: str
    sort: str
    sort_direction: str
    status: str
    user_id: str


class ConnectionCreateDataRequired(TypedDict):
    provider: str
    user_id: str


class ConnectionCreateData(ConnectionCreateDataRequired, total=False):
    api_key: dict
    authorization: Any
    connection: Any
    connection_parameters: dict
    created_at: str
    credential: dict
    credential_id: str
    credential_kind: str
    granted_at: str
    id: str
    network: dict
    oauth: dict
    owning_user_id: str
    provider_display_name: str
    revoked_at: str
    scopes: list
    status: str
    updated_at: str


class ConnectionRemoveMatch(TypedDict):
    id: str


class ConnectionPoolRequired(TypedDict):
    db: str
    mode: str
    name: str
    size: int


class ConnectionPool(ConnectionPoolRequired, total=False):
    connection: Any
    private_connection: Any
    standby_connection: Any
    standby_private_connection: Any
    user: str


class ConnectionPoolListMatch(TypedDict):
    database_id: str


class ContainerRegistry(TypedDict, total=False):
    available_regions: list
    blobs: list
    blobs_deleted: int
    cancel: bool
    compressed_size_bytes: int
    created_at: str
    digest: str
    freed_bytes: int
    id: str
    latest_manifest: dict
    latest_tag: dict
    manifest_count: int
    manifest_digest: str
    name: str
    region: str
    registries: list
    registry_name: str
    repository: str
    size_bytes: int
    status: str
    storage_usage_bytes: int
    storage_usage_bytes_updated_at: str
    subscription: Any
    subscription_tier_slug: str
    subscription_tiers: list
    tag: str
    tag_count: int
    tags: list
    tier: dict
    tier_slug: str
    type: str
    updated_at: str
    uuid: str


class ContainerRegistryLoadMatch(TypedDict):
    id: str


class ContainerRegistryListMatch(TypedDict, total=False):
    available_regions: list
    blobs: list
    blobs_deleted: int
    cancel: bool
    compressed_size_bytes: int
    created_at: str
    digest: str
    freed_bytes: int
    id: str
    latest_manifest: dict
    latest_tag: dict
    manifest_count: int
    manifest_digest: str
    name: str
    region: str
    registries: list
    registry_name: str
    repository: str
    size_bytes: int
    status: str
    storage_usage_bytes: int
    storage_usage_bytes_updated_at: str
    subscription: Any
    subscription_tier_slug: str
    subscription_tiers: list
    tag: str
    tag_count: int
    tags: list
    tier: dict
    tier_slug: str
    type: str
    updated_at: str
    uuid: str


class ContainerRegistryCreateData(TypedDict, total=False):
    available_regions: list
    blobs: list
    blobs_deleted: int
    cancel: bool
    compressed_size_bytes: int
    created_at: str
    digest: str
    freed_bytes: int
    id: str
    latest_manifest: dict
    latest_tag: dict
    manifest_count: int
    manifest_digest: str
    name: str
    region: str
    registries: list
    registry_name: str
    repository: str
    size_bytes: int
    status: str
    storage_usage_bytes: int
    storage_usage_bytes_updated_at: str
    subscription: Any
    subscription_tier_slug: str
    subscription_tiers: list
    tag: str
    tag_count: int
    tags: list
    tier: dict
    tier_slug: str
    type: str
    updated_at: str
    uuid: str


class ContainerRegistryUpdateDataRequired(TypedDict):
    garbage_collection_uuid: str
    registry_name: str


class ContainerRegistryUpdateData(ContainerRegistryUpdateDataRequired, total=False):
    available_regions: list
    blobs: list
    blobs_deleted: int
    cancel: bool
    compressed_size_bytes: int
    created_at: str
    digest: str
    freed_bytes: int
    id: str
    latest_manifest: dict
    latest_tag: dict
    manifest_count: int
    manifest_digest: str
    name: str
    region: str
    registries: list
    repository: str
    size_bytes: int
    status: str
    storage_usage_bytes: int
    storage_usage_bytes_updated_at: str
    subscription: Any
    subscription_tier_slug: str
    subscription_tiers: list
    tag: str
    tag_count: int
    tags: list
    tier: dict
    tier_slug: str
    type: str
    updated_at: str
    uuid: str


class ContainerRegistryRemoveMatch(TypedDict):
    id: str


class CreateResponseRequired(TypedDict):
    created: int
    id: str
    input: Any
    model: str
    object: str
    output: list
    usage: dict


class CreateResponse(CreateResponseRequired, total=False):
    instructions: str
    max_output_tokens: int
    metadata: dict
    parallel_tool_calls: bool
    status: str
    stop: Any
    stream: bool
    stream_options: dict
    temperature: float
    tool_choice: str
    tools: list
    top_p: float
    user: str


class CreateResponseCreateDataRequired(TypedDict):
    created: int
    id: str
    input: Any
    model: str
    object: str
    output: list
    usage: dict


class CreateResponseCreateData(CreateResponseCreateDataRequired, total=False):
    instructions: str
    max_output_tokens: int
    metadata: dict
    parallel_tool_calls: bool
    status: str
    stop: Any
    stream: bool
    stream_options: dict
    temperature: float
    tool_choice: str
    tools: list
    top_p: float
    user: str


class Credential(TypedDict, total=False):
    certificate_authority_data: str
    client_certificate_data: str
    client_key_data: str
    expires_at: str
    server: str
    token: str


class CredentialLoadMatchRequired(TypedDict):
    cluster_id: str


class CredentialLoadMatch(CredentialLoadMatchRequired, total=False):
    expiry_second: int


class DatabaseRequired(TypedDict):
    backup_restore: dict
    compatibility_level: str
    db: str
    engine: str
    mode: str
    mysql_settings: dict
    name: str
    num_nodes: int
    schema: str
    schema_id: int
    schema_type: str
    size: int
    subject_name: str
    version: str


class Database(DatabaseRequired, total=False):
    access_cert: str
    access_key: str
    autoscale: Any
    config: dict
    connection: Any
    created_at: str
    credentials: dict
    db_names: list
    do_settings: Any
    id: str
    maintenance_window: Any
    metrics_endpoints: list
    partition_count: int
    partitions: list
    password: str
    private_connection: Any
    private_network_uuid: str
    project_id: str
    region: str
    replication_factor: int
    role: str
    rules: list
    schema_registry_connection: Any
    semantic_version: str
    settings: dict
    standby_connection: Any
    standby_private_connection: Any
    state: str
    status: str
    storage_size_mib: int
    tags: list
    ui_connection: Any
    user: str
    users: list
    version_end_of_availability: str
    version_end_of_life: str


class DatabaseLoadMatch(TypedDict):
    id: str


class DatabaseListMatch(TypedDict, total=False):
    tag_name: str


class DatabaseCreateDataRequired(TypedDict):
    backup_restore: dict
    compatibility_level: str
    db: str
    engine: str
    mode: str
    mysql_settings: dict
    name: str
    num_nodes: int
    schema: str
    schema_id: int
    schema_type: str
    size: int
    subject_name: str
    version: str


class DatabaseCreateData(DatabaseCreateDataRequired, total=False):
    access_cert: str
    access_key: str
    autoscale: Any
    config: dict
    connection: Any
    created_at: str
    credentials: dict
    db_names: list
    do_settings: Any
    id: str
    maintenance_window: Any
    metrics_endpoints: list
    partition_count: int
    partitions: list
    password: str
    private_connection: Any
    private_network_uuid: str
    project_id: str
    region: str
    replication_factor: int
    role: str
    rules: list
    schema_registry_connection: Any
    semantic_version: str
    settings: dict
    standby_connection: Any
    standby_private_connection: Any
    state: str
    status: str
    storage_size_mib: int
    tags: list
    ui_connection: Any
    user: str
    users: list
    version_end_of_availability: str
    version_end_of_life: str


class DatabaseUpdateDataRequired(TypedDict):
    id: str
    logsink_id: str


class DatabaseUpdateData(DatabaseUpdateDataRequired, total=False):
    access_cert: str
    access_key: str
    autoscale: Any
    backup_restore: dict
    compatibility_level: str
    config: dict
    connection: Any
    created_at: str
    credentials: dict
    db: str
    db_names: list
    do_settings: Any
    engine: str
    maintenance_window: Any
    metrics_endpoints: list
    mode: str
    mysql_settings: dict
    name: str
    num_nodes: int
    partition_count: int
    partitions: list
    password: str
    private_connection: Any
    private_network_uuid: str
    project_id: str
    region: str
    replication_factor: int
    role: str
    rules: list
    schema: str
    schema_id: int
    schema_registry_connection: Any
    schema_type: str
    semantic_version: str
    settings: dict
    size: int
    standby_connection: Any
    standby_private_connection: Any
    state: str
    status: str
    storage_size_mib: int
    subject_name: str
    tags: list
    ui_connection: Any
    user: str
    users: list
    version: str
    version_end_of_availability: str
    version_end_of_life: str


class DatabasePatchDataRequired(TypedDict):
    id: str


class DatabasePatchData(DatabasePatchDataRequired, total=False):
    access_cert: str
    access_key: str
    autoscale: Any
    backup_restore: dict
    compatibility_level: str
    config: dict
    connection: Any
    created_at: str
    credentials: dict
    db: str
    db_names: list
    do_settings: Any
    engine: str
    maintenance_window: Any
    metrics_endpoints: list
    mode: str
    mysql_settings: dict
    name: str
    num_nodes: int
    partition_count: int
    partitions: list
    password: str
    private_connection: Any
    private_network_uuid: str
    project_id: str
    region: str
    replication_factor: int
    role: str
    rules: list
    schema: str
    schema_id: int
    schema_registry_connection: Any
    schema_type: str
    semantic_version: str
    settings: dict
    size: int
    standby_connection: Any
    standby_private_connection: Any
    state: str
    status: str
    storage_size_mib: int
    subject_name: str
    tags: list
    ui_connection: Any
    user: str
    users: list
    version: str
    version_end_of_availability: str
    version_end_of_life: str


class DatabaseRemoveMatchRequired(TypedDict):
    id: str


class DatabaseRemoveMatch(DatabaseRemoveMatchRequired, total=False):
    database_name: str
    index_name: str
    logsink_id: str
    migration_id: str
    pool_name: str
    replica_name: str
    subject_name: str
    topic_name: str
    username: str


class DedicatedInferenceRequired(TypedDict):
    spec: dict


class DedicatedInference(DedicatedInferenceRequired, total=False):
    access_tokens: dict
    created_at: str
    dedicated_inference: dict
    endpoints: dict
    id: str
    pending_deployment_spec: dict
    region: str
    status: str
    token: dict
    updated_at: str
    vpc_uuid: str


class DedicatedInferenceLoadMatch(TypedDict):
    id: str


class DedicatedInferenceListMatch(TypedDict, total=False):
    page: int
    per_page: int
    region: str


class DedicatedInferenceCreateDataRequired(TypedDict):
    spec: dict


class DedicatedInferenceCreateData(DedicatedInferenceCreateDataRequired, total=False):
    access_tokens: dict
    created_at: str
    dedicated_inference: dict
    endpoints: dict
    id: str
    pending_deployment_spec: dict
    region: str
    status: str
    token: dict
    updated_at: str
    vpc_uuid: str


class DedicatedInferenceUpdateDataRequired(TypedDict):
    id: str


class DedicatedInferenceUpdateData(DedicatedInferenceUpdateDataRequired, total=False):
    access_tokens: dict
    created_at: str
    dedicated_inference: dict
    endpoints: dict
    pending_deployment_spec: dict
    region: str
    spec: dict
    status: str
    token: dict
    updated_at: str
    vpc_uuid: str


class DedicatedInferenceRemoveMatchRequired(TypedDict):
    id: str


class DedicatedInferenceRemoveMatch(DedicatedInferenceRemoveMatchRequired, total=False):
    token_id: str


class DedicatedInferenceAccelerator(TypedDict, total=False):
    created_at: str
    id: str
    name: str
    role: str
    slug: str
    status: str


class DedicatedInferenceAcceleratorLoadMatch(TypedDict):
    dedicated_inference_id: str
    id: str


class DedicatedInferenceGpuModelConfig(TypedDict, total=False):
    gpu_slugs: list
    is_gated_model: bool
    model_name: str
    model_slug: str


class DedicatedInferenceGpuModelConfigListMatch(TypedDict, total=False):
    gpu_slugs: list
    is_gated_model: bool
    model_name: str
    model_slug: str


class DedicatedInferenceSize(TypedDict, total=False):
    currency: str
    gpu_slug: str
    price_per_hour: str
    region: str


class DedicatedInferenceSizeListMatch(TypedDict, total=False):
    currency: str
    gpu_slug: str
    price_per_hour: str
    region: str


class DockerCredential(TypedDict, total=False):
    registry_digitalocean_com: dict


class DockerCredentialLoadMatch(TypedDict, total=False):
    expiry_second: int
    read_write: bool


class Domain(TypedDict, total=False):
    id: str
    ip_address: str
    name: str
    ttl: int
    zone_file: str


class DomainLoadMatch(TypedDict):
    id: str


class DomainListMatch(TypedDict, total=False):
    page: int
    per_page: int


class DomainCreateData(TypedDict, total=False):
    id: str
    ip_address: str
    name: str
    ttl: int
    zone_file: str


class DomainRemoveMatch(TypedDict):
    id: str


class DomainRecordRequired(TypedDict):
    type: str


class DomainRecord(DomainRecordRequired, total=False):
    data: str
    domain_record: dict
    flags: int
    id: int
    name: str
    port: int
    priority: int
    tag: str
    ttl: int
    weight: int


class DomainRecordLoadMatch(TypedDict):
    domain_name: str
    id: int


class DomainRecordListMatchRequired(TypedDict):
    domain_name: str


class DomainRecordListMatch(DomainRecordListMatchRequired, total=False):
    name: str
    page: int
    per_page: int
    type: str


class DomainRecordCreateDataRequired(TypedDict):
    domain_name: str
    type: str


class DomainRecordCreateData(DomainRecordCreateDataRequired, total=False):
    data: str
    domain_record: dict
    flags: int
    id: int
    name: str
    port: int
    priority: int
    tag: str
    ttl: int
    weight: int


class DomainRecordUpdateDataRequired(TypedDict):
    domain_name: str
    id: int


class DomainRecordUpdateData(DomainRecordUpdateDataRequired, total=False):
    data: str
    domain_record: dict
    flags: int
    name: str
    port: int
    priority: int
    tag: str
    ttl: int
    type: str
    weight: int


class DomainRecordPatchDataRequired(TypedDict):
    domain_name: str
    id: int


class DomainRecordPatchData(DomainRecordPatchDataRequired, total=False):
    data: str
    domain_record: dict
    flags: int
    name: str
    port: int
    priority: int
    tag: str
    ttl: int
    type: str
    weight: int


class DomainRecordRemoveMatch(TypedDict):
    domain_name: str
    id: int


class DropletRequired(TypedDict):
    backup_ids: list
    created_at: str
    disk: int
    features: list
    id: int
    image: Any
    locked: bool
    memory: int
    meta: Any
    name: str
    networks: dict
    next_backup_window: Any
    region: dict
    size: dict
    size_slug: str
    snapshot_ids: list
    status: str
    tags: list
    vcpus: int
    volume_ids: list


class Droplet(DropletRequired, total=False):
    disk_info: list
    droplet: dict
    gpu_info: dict
    kernel: dict
    links: dict
    policies: dict
    possible_days: list
    possible_window_starts: list
    retention_period_days: int
    subnet_uuid: str
    vpc_uuid: str
    window_length_hours: int


class DropletLoadMatch(TypedDict):
    id: int


class DropletListMatch(TypedDict, total=False):
    name: str
    page: int
    per_page: int
    tag_name: str
    type: str


class DropletCreateDataRequired(TypedDict):
    backup_ids: list
    created_at: str
    disk: int
    features: list
    id: int
    image: Any
    locked: bool
    memory: int
    meta: Any
    name: str
    networks: dict
    next_backup_window: Any
    region: dict
    size: dict
    size_slug: str
    snapshot_ids: list
    status: str
    tags: list
    vcpus: int
    volume_ids: list


class DropletCreateData(DropletCreateDataRequired, total=False):
    disk_info: list
    droplet: dict
    gpu_info: dict
    kernel: dict
    links: dict
    policies: dict
    possible_days: list
    possible_window_starts: list
    retention_period_days: int
    subnet_uuid: str
    vpc_uuid: str
    window_length_hours: int


class DropletRemoveMatch(TypedDict):
    id: int


class DropletActionRequired(TypedDict):
    region: dict


class DropletAction(DropletActionRequired, total=False):
    completed_at: str
    id: int
    region_slug: str
    resource_id: int
    resource_type: str
    started_at: str
    status: str
    type: str


class DropletActionLoadMatch(TypedDict):
    droplet_id: int
    id: int


class DropletActionListMatchRequired(TypedDict):
    id: int


class DropletActionListMatch(DropletActionListMatchRequired, total=False):
    page: int
    per_page: int


class DropletActionCreateDataRequired(TypedDict):
    region: dict


class DropletActionCreateData(DropletActionCreateDataRequired, total=False):
    tag_name: str
    completed_at: str
    id: int
    region_slug: str
    resource_id: int
    resource_type: str
    started_at: str
    status: str
    type: str


class DropletAutoscalePoolRequired(TypedDict):
    active_resources_count: int
    config: dict
    created_at: str
    current_instance_count: int
    desired_instance_count: int
    droplet_id: int
    droplet_template: dict
    health_status: str
    history_event_id: str
    id: str
    name: str
    reason: str
    status: str
    updated_at: str


class DropletAutoscalePool(DropletAutoscalePoolRequired, total=False):
    current_utilization: dict
    unhealthy_reason: str


class DropletAutoscalePoolLoadMatch(TypedDict):
    autoscale_pool_id: str


class DropletAutoscalePoolListMatch(TypedDict, total=False):
    name: str
    page: int
    per_page: int


class DropletAutoscalePoolCreateDataRequired(TypedDict):
    active_resources_count: int
    config: dict
    created_at: str
    current_instance_count: int
    desired_instance_count: int
    droplet_id: int
    droplet_template: dict
    health_status: str
    history_event_id: str
    id: str
    name: str
    reason: str
    status: str
    updated_at: str


class DropletAutoscalePoolCreateData(DropletAutoscalePoolCreateDataRequired, total=False):
    current_utilization: dict
    unhealthy_reason: str


class DropletAutoscalePoolUpdateDataRequired(TypedDict):
    autoscale_pool_id: str


class DropletAutoscalePoolUpdateData(DropletAutoscalePoolUpdateDataRequired, total=False):
    active_resources_count: int
    config: dict
    created_at: str
    current_instance_count: int
    current_utilization: dict
    desired_instance_count: int
    droplet_id: int
    droplet_template: dict
    health_status: str
    history_event_id: str
    id: str
    name: str
    reason: str
    status: str
    unhealthy_reason: str
    updated_at: str


class DropletAutoscalePoolRemoveMatch(TypedDict):
    autoscale_pool_id: str


class EmbeddingRequired(TypedDict):
    data: list
    input: Any
    model: str
    object: str
    usage: dict


class Embedding(EmbeddingRequired, total=False):
    encoding_format: str
    user: str


class EmbeddingCreateDataRequired(TypedDict):
    data: list
    input: Any
    model: str
    object: str
    usage: dict


class EmbeddingCreateData(EmbeddingCreateDataRequired, total=False):
    encoding_format: str
    user: str


class EmptyRequired(TypedDict):
    categories: list
    name: str
    overrides: list


class Empty(EmptyRequired, total=False):
    actorId: str
    agentName: str
    agentUrn: str
    config: dict
    createdAt: str
    insights: Any
    mcpUrl: str
    network: Any
    owning_user_id: str
    policy: Any
    session: Any
    sessionUrn: str
    tools: list
    updatedAt: str


class EmptyListMatch(TypedDict, total=False):
    end_user_id: str
    page: int
    per_page: int


class EmptyCreateDataRequired(TypedDict):
    categories: list
    name: str
    overrides: list


class EmptyCreateData(EmptyCreateDataRequired, total=False):
    actorId: str
    agentName: str
    agentUrn: str
    config: dict
    createdAt: str
    insights: Any
    mcpUrl: str
    network: Any
    owning_user_id: str
    policy: Any
    session: Any
    sessionUrn: str
    tools: list
    updatedAt: str


class EmptyRemoveMatch(TypedDict):
    session_urn: str


class Firewall(TypedDict, total=False):
    created_at: str
    droplet_ids: list
    id: str
    inbound_rules: list
    name: str
    outbound_rules: list
    pending_changes: list
    status: str
    tags: Any


class FirewallLoadMatch(TypedDict):
    id: str


class FirewallListMatch(TypedDict, total=False):
    page: int
    per_page: int


class FirewallCreateData(TypedDict, total=False):
    created_at: str
    droplet_ids: list
    id: str
    inbound_rules: list
    name: str
    outbound_rules: list
    pending_changes: list
    status: str
    tags: Any


class FirewallUpdateDataRequired(TypedDict):
    id: str


class FirewallUpdateData(FirewallUpdateDataRequired, total=False):
    created_at: str
    droplet_ids: list
    inbound_rules: list
    name: str
    outbound_rules: list
    pending_changes: list
    status: str
    tags: Any


class FirewallRemoveMatch(TypedDict):
    id: str


class FloatingIp(TypedDict, total=False):
    droplet: Any
    floating_ip: dict
    id: str
    ip: str
    links: dict
    locked: bool
    project_id: str
    region: Any


class FloatingIpLoadMatch(TypedDict):
    id: str


class FloatingIpListMatch(TypedDict, total=False):
    page: int
    per_page: int


class FloatingIpCreateData(TypedDict, total=False):
    droplet: Any
    floating_ip: dict
    id: str
    ip: str
    links: dict
    locked: bool
    project_id: str
    region: Any


class FloatingIpRemoveMatch(TypedDict):
    id: str


class FloatingIpActionRequired(TypedDict):
    region: dict


class FloatingIpAction(FloatingIpActionRequired, total=False):
    action: dict
    completed_at: str
    id: int
    project_id: str
    region_slug: str
    resource_id: int
    resource_type: str
    started_at: str
    status: str
    type: str


class FloatingIpActionLoadMatch(TypedDict):
    floating_ip_id: str
    id: int


class FloatingIpActionListMatch(TypedDict):
    floating_ip_id: str


class FloatingIpActionCreateDataRequired(TypedDict):
    floating_ip_id: str
    region: dict


class FloatingIpActionCreateData(FloatingIpActionCreateDataRequired, total=False):
    action: dict
    completed_at: str
    id: int
    project_id: str
    region_slug: str
    resource_id: int
    resource_type: str
    started_at: str
    status: str
    type: str


class FunctionKeyRequired(TypedDict):
    name: str


class FunctionKey(FunctionKeyRequired, total=False):
    created_at: str
    expires_at: str
    expires_in: str
    id: str
    updated_at: str


class FunctionKeyListMatch(TypedDict):
    namespace_id: str


class FunctionKeyCreateDataRequired(TypedDict):
    namespace_id: str
    name: str


class FunctionKeyCreateData(FunctionKeyCreateDataRequired, total=False):
    created_at: str
    expires_at: str
    expires_in: str
    id: str
    updated_at: str


class FunctionKeyUpdateDataRequired(TypedDict):
    id: str
    namespace_id: str


class FunctionKeyUpdateData(FunctionKeyUpdateDataRequired, total=False):
    created_at: str
    expires_at: str
    expires_in: str
    name: str
    updated_at: str


class FunctionKeyRemoveMatch(TypedDict):
    id: str
    namespace_id: str


class FunctionNamespace(TypedDict, total=False):
    api_host: str
    created_at: str
    key: str
    label: str
    namespace: str
    region: str
    updated_at: str
    uuid: str


class FunctionNamespaceLoadMatch(TypedDict):
    namespace_id: str


class FunctionNamespaceListMatch(TypedDict, total=False):
    api_host: str
    created_at: str
    key: str
    label: str
    namespace: str
    region: str
    updated_at: str
    uuid: str


class FunctionNamespaceCreateData(TypedDict, total=False):
    api_host: str
    created_at: str
    key: str
    label: str
    namespace: str
    region: str
    updated_at: str
    uuid: str


class FunctionNamespaceRemoveMatch(TypedDict):
    namespace_id: str


class FunctionTriggerRequired(TypedDict):
    scheduled_details: dict


class FunctionTrigger(FunctionTriggerRequired, total=False):
    created_at: str
    function: str
    is_enabled: bool
    name: str
    namespace: str
    scheduled_runs: dict
    type: str
    updated_at: str


class FunctionTriggerLoadMatch(TypedDict):
    namespace_id: str
    trigger_name: str


class FunctionTriggerListMatch(TypedDict):
    namespace_id: str


class FunctionTriggerCreateDataRequired(TypedDict):
    namespace_id: str
    scheduled_details: dict


class FunctionTriggerCreateData(FunctionTriggerCreateDataRequired, total=False):
    created_at: str
    function: str
    is_enabled: bool
    name: str
    namespace: str
    scheduled_runs: dict
    type: str
    updated_at: str


class FunctionTriggerUpdateDataRequired(TypedDict):
    namespace_id: str
    trigger_name: str


class FunctionTriggerUpdateData(FunctionTriggerUpdateDataRequired, total=False):
    created_at: str
    function: str
    is_enabled: bool
    name: str
    namespace: str
    scheduled_details: dict
    scheduled_runs: dict
    type: str
    updated_at: str


class FunctionTriggerRemoveMatch(TypedDict):
    namespace_id: str
    trigger_name: str


class GenaiapiRegion(TypedDict, total=False):
    inference_url: str
    region: str
    serves_batch: bool
    serves_inference: bool
    stream_inference_url: str


class GenaiapiRegionListMatch(TypedDict, total=False):
    serves_batch: bool
    serves_inference: bool


class ImageRequired(TypedDict):
    region: str
    url: str


class Image(ImageRequired, total=False):
    created_at: str
    description: str
    distribution: str
    error_message: str
    id: int
    min_disk_size: int
    name: str
    public: bool
    regions: list
    size_gigabytes: float
    slug: str
    status: str
    tags: list
    type: str


class ImageLoadMatch(TypedDict):
    id: str


class ImageListMatch(TypedDict, total=False):
    page: int
    per_page: int
    private: bool
    tag_name: str
    type: str


class ImageCreateDataRequired(TypedDict):
    region: str
    url: str


class ImageCreateData(ImageCreateDataRequired, total=False):
    created_at: str
    description: str
    distribution: str
    error_message: str
    id: int
    min_disk_size: int
    name: str
    public: bool
    regions: list
    size_gigabytes: float
    slug: str
    status: str
    tags: list
    type: str


class ImageUpdateDataRequired(TypedDict):
    id: int


class ImageUpdateData(ImageUpdateDataRequired, total=False):
    created_at: str
    description: str
    distribution: str
    error_message: str
    min_disk_size: int
    name: str
    public: bool
    region: str
    regions: list
    size_gigabytes: float
    slug: str
    status: str
    tags: list
    type: str
    url: str


class ImageRemoveMatch(TypedDict):
    id: int


class ImageActionRequired(TypedDict):
    region: dict


class ImageAction(ImageActionRequired, total=False):
    completed_at: str
    id: int
    region_slug: str
    resource_id: int
    resource_type: str
    started_at: str
    status: str
    type: str


class ImageActionListMatch(TypedDict):
    id: int


class InsightRequired(TypedDict):
    channel_type: str
    created_at: str
    email: dict
    id: str
    last_triggered_at: str
    name: str
    rule_id: str
    severity: str
    slack: dict
    spec: dict
    status: str
    triggered_at: str
    updated_at: str
    value: float
    webhook: dict


class Insight(InsightRequired, total=False):
    last_notified_at: str
    resolved_at: str
    resource_urn: str
    usage: Any


class InsightLoadMatch(TypedDict):
    id: str


class InsightListMatch(TypedDict, total=False):
    page: int
    per_page: int
    resource_urn: str
    rule_id: str
    status: str


class InsightCreateDataRequired(TypedDict):
    channel_type: str
    created_at: str
    email: dict
    id: str
    last_triggered_at: str
    name: str
    rule_id: str
    severity: str
    slack: dict
    spec: dict
    status: str
    triggered_at: str
    updated_at: str
    value: float
    webhook: dict


class InsightCreateData(InsightCreateDataRequired, total=False):
    last_notified_at: str
    resolved_at: str
    resource_urn: str
    usage: Any


class InsightUpdateDataRequired(TypedDict):
    id: str


class InsightUpdateData(InsightUpdateDataRequired, total=False):
    channel_type: str
    created_at: str
    email: dict
    last_notified_at: str
    last_triggered_at: str
    name: str
    resolved_at: str
    resource_urn: str
    rule_id: str
    severity: str
    slack: dict
    spec: dict
    status: str
    triggered_at: str
    updated_at: str
    usage: Any
    value: float
    webhook: dict


class InsightRemoveMatch(TypedDict):
    id: str


class InvoiceSummary(TypedDict, total=False):
    amount: str
    billing_period: str
    credits_and_adjustments: Any
    id: str
    invoice_id: str
    invoice_uuid: str
    overages: Any
    product_charges: Any
    taxes: Any
    user_billing_address: Any
    user_company: str
    user_email: str
    user_name: str


class InvoiceSummaryLoadMatch(TypedDict):
    id: str


class KuberneteRequired(TypedDict):
    count: int
    name: str
    node_pools: list
    region: str
    size: str
    version: str


class Kubernete(KuberneteRequired, total=False):
    amd_gpu_device_metrics_exporter_plugin: dict
    amd_gpu_device_plugin: dict
    amd_gpu_dra_driver: dict
    auto_scale: bool
    auto_upgrade: bool
    cluster_autoscaler_configuration: dict
    cluster_subnet: str
    control_plane_firewall: dict
    coredns_autoscaler: dict
    created_at: str
    endpoint: str
    gpu_partition_mode: str
    ha: bool
    id: str
    ipv4: str
    isolated_workers: bool
    kubernetes_version: str
    labels: dict
    maintenance_policy: dict
    max_nodes: int
    message: str
    min_nodes: int
    nfs_csi_plugin: dict
    nodes: list
    nvidia_gpu_device_plugin: dict
    nvidia_gpu_dra_driver: dict
    p2p_oci_registry_plugin: dict
    rdma_shared_dev_plugin: dict
    registries: list
    registry_enabled: bool
    routing_agent: dict
    service_subnet: str
    slug: str
    sso: dict
    status: dict
    supported_features: list
    surge_upgrade: bool
    tags: list
    taints: list
    timestamp: str
    updated_at: str
    vpc_uuid: str
    worker_subnet_uuid: str


class KuberneteLoadMatchRequired(TypedDict):
    cluster_id: str


class KuberneteLoadMatch(KuberneteLoadMatchRequired, total=False):
    node_pool_id: str
    expiry_second: int
    type: str


class KuberneteListMatchRequired(TypedDict):
    cluster_id: str


class KuberneteListMatch(KuberneteListMatchRequired, total=False):
    since: str


class KuberneteCreateDataRequired(TypedDict):
    cluster_id: str
    count: int
    name: str
    node_pools: list
    region: str
    size: str
    version: str


class KuberneteCreateData(KuberneteCreateDataRequired, total=False):
    amd_gpu_device_metrics_exporter_plugin: dict
    amd_gpu_device_plugin: dict
    amd_gpu_dra_driver: dict
    auto_scale: bool
    auto_upgrade: bool
    cluster_autoscaler_configuration: dict
    cluster_subnet: str
    control_plane_firewall: dict
    coredns_autoscaler: dict
    created_at: str
    endpoint: str
    gpu_partition_mode: str
    ha: bool
    id: str
    ipv4: str
    isolated_workers: bool
    kubernetes_version: str
    labels: dict
    maintenance_policy: dict
    max_nodes: int
    message: str
    min_nodes: int
    nfs_csi_plugin: dict
    nodes: list
    nvidia_gpu_device_plugin: dict
    nvidia_gpu_dra_driver: dict
    p2p_oci_registry_plugin: dict
    rdma_shared_dev_plugin: dict
    registries: list
    registry_enabled: bool
    routing_agent: dict
    service_subnet: str
    slug: str
    sso: dict
    status: dict
    supported_features: list
    surge_upgrade: bool
    tags: list
    taints: list
    timestamp: str
    updated_at: str
    vpc_uuid: str
    worker_subnet_uuid: str


class KuberneteUpdateDataRequired(TypedDict):
    cluster_id: str


class KuberneteUpdateData(KuberneteUpdateDataRequired, total=False):
    node_pool_id: str
    amd_gpu_device_metrics_exporter_plugin: dict
    amd_gpu_device_plugin: dict
    amd_gpu_dra_driver: dict
    auto_scale: bool
    auto_upgrade: bool
    cluster_autoscaler_configuration: dict
    cluster_subnet: str
    control_plane_firewall: dict
    coredns_autoscaler: dict
    count: int
    created_at: str
    endpoint: str
    gpu_partition_mode: str
    ha: bool
    id: str
    ipv4: str
    isolated_workers: bool
    kubernetes_version: str
    labels: dict
    maintenance_policy: dict
    max_nodes: int
    message: str
    min_nodes: int
    name: str
    nfs_csi_plugin: dict
    node_pools: list
    nodes: list
    nvidia_gpu_device_plugin: dict
    nvidia_gpu_dra_driver: dict
    p2p_oci_registry_plugin: dict
    rdma_shared_dev_plugin: dict
    region: str
    registries: list
    registry_enabled: bool
    routing_agent: dict
    service_subnet: str
    size: str
    slug: str
    sso: dict
    status: dict
    supported_features: list
    surge_upgrade: bool
    tags: list
    taints: list
    timestamp: str
    updated_at: str
    version: str
    vpc_uuid: str
    worker_subnet_uuid: str


class KuberneteRemoveMatchRequired(TypedDict):
    cluster_id: str


class KuberneteRemoveMatch(KuberneteRemoveMatchRequired, total=False):
    node_id: str
    node_pool_id: str
    replace: int
    skip_drain: int


class KubernetesOption(TypedDict, total=False):
    regions: list
    sizes: list
    versions: list


class KubernetesOptionLoadMatch(TypedDict, total=False):
    regions: list
    sizes: list
    versions: list


class ListMcpServerToolRequired(TypedDict):
    enabledToolSlugs: list


class ListMcpServerTool(ListMcpServerToolRequired, total=False):
    description: str
    enabled: bool
    name: str
    quarantineReason: str
    quarantined: bool
    toolSlug: str
    tools: list
    user_id: str


class ListMcpServerToolListMatch(TypedDict):
    server_ref: str


class ListMcpServerToolUpdateDataRequired(TypedDict):
    server_ref: str


class ListMcpServerToolUpdateData(ListMcpServerToolUpdateDataRequired, total=False):
    description: str
    enabled: bool
    enabledToolSlugs: list
    name: str
    quarantineReason: str
    quarantined: bool
    toolSlug: str
    tools: list
    user_id: str


class ListProvider(TypedDict, total=False):
    auth_type: str
    auth_types: list
    connection_parameters: list
    credential_parameters: list
    description: str
    display_name: str
    name: str
    oauth_client_setup_url: str
    oauth_redirect_url: str
    scopes: list


class ListProviderListMatch(TypedDict, total=False):
    auth_type: str
    auth_types: list
    connection_parameters: list
    credential_parameters: list
    description: str
    display_name: str
    name: str
    oauth_client_setup_url: str
    oauth_redirect_url: str
    scopes: list


class ListProviderHealth(TypedDict, total=False):
    health: Any
    provider: str


class ListProviderHealthListMatch(TypedDict, total=False):
    page: int
    per_page: int
    provider: str
    window: str


class ListTool(TypedDict, total=False):
    definitions: list
    pagination: Any
    tools: list
    version: str


class ListToolListMatch(TypedDict, total=False):
    page: int
    per_page: int
    toolkit_id: str


class ListToolHealth(TypedDict, total=False):
    health: Any
    provider: str
    tool_slug: str


class ListToolHealthListMatch(TypedDict, total=False):
    page: int
    per_page: int
    provider: str
    window: str


class ListToolbeltProvider(TypedDict, total=False):
    categories: list
    created_at: str
    description: str
    id: str
    name: str
    provider: str
    tool_count: int


class ListToolbeltProviderListMatchRequired(TypedDict):
    name: str


class ListToolbeltProviderListMatch(ListToolbeltProviderListMatchRequired, total=False):
    page: int
    per_page: int
    search: str
    version: str


class ListToolkit(TypedDict, total=False):
    categories: list
    created_at: str
    description: str
    id: str
    name: str
    provider_kind: str


class ListToolkitListMatch(TypedDict, total=False):
    categories: list
    created_at: str
    description: str
    id: str
    name: str
    provider_kind: str


class LoadBalancerRequired(TypedDict):
    forwarding_rules: list


class LoadBalancer(LoadBalancerRequired, total=False):
    algorithm: str
    created_at: str
    disable_lets_encrypt_dns_records: bool
    domains: list
    droplet_ids: list
    enable_backend_keepalive: bool
    enable_proxy_protocol: bool
    firewall: dict
    glb_settings: dict
    health_check: dict
    http_idle_timeout_seconds: int
    id: str
    ip: str
    ipv6: str
    name: str
    network: str
    network_stack: str
    project_id: str
    redirect_http_to_https: bool
    region: dict
    size: str
    size_unit: int
    status: str
    sticky_sessions: dict
    subnet_uuid: str
    tag: str
    target_load_balancer_ids: list
    tls_cipher_policy: str
    type: str
    vpc_uuid: str


class LoadBalancerLoadMatch(TypedDict):
    id: str


class LoadBalancerListMatch(TypedDict, total=False):
    page: int
    per_page: int


class LoadBalancerCreateDataRequired(TypedDict):
    forwarding_rules: list


class LoadBalancerCreateData(LoadBalancerCreateDataRequired, total=False):
    algorithm: str
    created_at: str
    disable_lets_encrypt_dns_records: bool
    domains: list
    droplet_ids: list
    enable_backend_keepalive: bool
    enable_proxy_protocol: bool
    firewall: dict
    glb_settings: dict
    health_check: dict
    http_idle_timeout_seconds: int
    id: str
    ip: str
    ipv6: str
    name: str
    network: str
    network_stack: str
    project_id: str
    redirect_http_to_https: bool
    region: dict
    size: str
    size_unit: int
    status: str
    sticky_sessions: dict
    subnet_uuid: str
    tag: str
    target_load_balancer_ids: list
    tls_cipher_policy: str
    type: str
    vpc_uuid: str


class LoadBalancerUpdateDataRequired(TypedDict):
    id: str


class LoadBalancerUpdateData(LoadBalancerUpdateDataRequired, total=False):
    algorithm: str
    created_at: str
    disable_lets_encrypt_dns_records: bool
    domains: list
    droplet_ids: list
    enable_backend_keepalive: bool
    enable_proxy_protocol: bool
    firewall: dict
    forwarding_rules: list
    glb_settings: dict
    health_check: dict
    http_idle_timeout_seconds: int
    ip: str
    ipv6: str
    name: str
    network: str
    network_stack: str
    project_id: str
    redirect_http_to_https: bool
    region: dict
    size: str
    size_unit: int
    status: str
    sticky_sessions: dict
    subnet_uuid: str
    tag: str
    target_load_balancer_ids: list
    tls_cipher_policy: str
    type: str
    vpc_uuid: str


class LoadBalancerRemoveMatch(TypedDict):
    id: str


class LogsSearchRequired(TypedDict):
    time_range: dict


class LogsSearch(LogsSearchRequired, total=False):
    data: list
    filter: dict
    order_by: list
    pagination: dict


class LogsSearchCreateDataRequired(TypedDict):
    query_id: str
    time_range: dict


class LogsSearchCreateData(LogsSearchCreateDataRequired, total=False):
    data: list
    filter: dict
    order_by: list
    pagination: dict


class LogsinkRequired(TypedDict):
    config: Any
    sink_id: str
    sink_name: str
    sink_type: str


class Logsink(LogsinkRequired, total=False):
    id: str


class LogsinkLoadMatch(TypedDict):
    database_id: str
    id: str


class McpServer(TypedDict, total=False):
    api_key: str
    createdAt: str
    credentialRef: str
    credentialRefSource: str
    description: str
    endpoint: str
    id: str
    lastSyncedAt: str
    oauth_authorization_ttl_seconds: str
    oauth_authorize_url: str
    oauth_client_id: str
    oauth_client_secret: str
    oauth_scopes: list
    oauth_token_url: str
    protocolVersion: str
    serverRef: str
    syncError: str
    syncStatus: str
    toolCount: int
    transport: str
    updatedAt: str


class McpServerLoadMatch(TypedDict):
    id: str


class McpServerListMatch(TypedDict, total=False):
    api_key: str
    createdAt: str
    credentialRef: str
    credentialRefSource: str
    description: str
    endpoint: str
    id: str
    lastSyncedAt: str
    oauth_authorization_ttl_seconds: str
    oauth_authorize_url: str
    oauth_client_id: str
    oauth_client_secret: str
    oauth_scopes: list
    oauth_token_url: str
    protocolVersion: str
    serverRef: str
    syncError: str
    syncStatus: str
    toolCount: int
    transport: str
    updatedAt: str


class McpServerCreateData(TypedDict, total=False):
    api_key: str
    createdAt: str
    credentialRef: str
    credentialRefSource: str
    description: str
    endpoint: str
    id: str
    lastSyncedAt: str
    oauth_authorization_ttl_seconds: str
    oauth_authorize_url: str
    oauth_client_id: str
    oauth_client_secret: str
    oauth_scopes: list
    oauth_token_url: str
    protocolVersion: str
    serverRef: str
    syncError: str
    syncStatus: str
    toolCount: int
    transport: str
    updatedAt: str


class McpServerUpdateDataRequired(TypedDict):
    id: str


class McpServerUpdateData(McpServerUpdateDataRequired, total=False):
    api_key: str
    createdAt: str
    credentialRef: str
    credentialRefSource: str
    description: str
    endpoint: str
    lastSyncedAt: str
    oauth_authorization_ttl_seconds: str
    oauth_authorize_url: str
    oauth_client_id: str
    oauth_client_secret: str
    oauth_scopes: list
    oauth_token_url: str
    protocolVersion: str
    serverRef: str
    syncError: str
    syncStatus: str
    toolCount: int
    transport: str
    updatedAt: str


class McpServerRemoveMatch(TypedDict):
    id: str


class MessageRequired(TypedDict):
    content: list
    id: str
    max_tokens: int
    messages: list
    model: str
    role: str
    stop_reason: str
    thinking: dict
    type: str
    usage: dict


class Message(MessageRequired, total=False):
    metadata: dict
    reasoning_effort: str
    speed: str
    stop_sequence: str
    stop_sequences: list
    stream: bool
    system: Any
    temperature: float
    tool_choice: Any
    tools: list
    top_k: int
    top_p: float


class MessageCreateDataRequired(TypedDict):
    content: list
    id: str
    max_tokens: int
    messages: list
    model: str
    role: str
    stop_reason: str
    thinking: dict
    type: str
    usage: dict


class MessageCreateData(MessageCreateDataRequired, total=False):
    metadata: dict
    reasoning_effort: str
    speed: str
    stop_sequence: str
    stop_sequences: list
    stream: bool
    system: Any
    temperature: float
    tool_choice: Any
    tools: list
    top_k: int
    top_p: float


class Metric(TypedDict):
    result: list
    resultType: str


class MetricLoadMatchRequired(TypedDict):
    end: str
    start: str


class MetricLoadMatch(MetricLoadMatchRequired, total=False):
    aggregate: str
    db_id: str
    metric: str
    schema: str
    direction: str
    host_id: str
    interface: str
    app_component: str
    app_id: str
    autoscale_pool_id: str
    lb_id: str


class Model(TypedDict):
    created: int
    id: str
    object: str
    owned_by: str


class ModelListMatch(TypedDict, total=False):
    created: int
    id: str
    object: str
    owned_by: str


class MonitoringAlert(TypedDict):
    alerts: dict
    compare: str
    description: str
    enabled: bool
    entities: list
    tags: list
    type: str
    uuid: str
    value: float
    window: str


class MonitoringAlertLoadMatch(TypedDict):
    alert_uuid: str


class MonitoringAlertListMatch(TypedDict, total=False):
    page: int
    per_page: int


class MonitoringAlertCreateData(TypedDict):
    alerts: dict
    compare: str
    description: str
    enabled: bool
    entities: list
    tags: list
    type: str
    uuid: str
    value: float
    window: str


class MonitoringAlertUpdateDataRequired(TypedDict):
    alert_uuid: str


class MonitoringAlertUpdateData(MonitoringAlertUpdateDataRequired, total=False):
    alerts: dict
    compare: str
    description: str
    enabled: bool
    entities: list
    tags: list
    type: str
    uuid: str
    value: float
    window: str


class MonitoringAlertRemoveMatch(TypedDict):
    alert_uuid: str


class MonitoringSinkRequired(TypedDict):
    destination: dict


class MonitoringSink(MonitoringSinkRequired, total=False):
    destination_uuid: str
    resources: list


class MonitoringSinkLoadMatch(TypedDict):
    sink_uuid: str


class MonitoringSinkListMatch(TypedDict, total=False):
    resource_id: str


class MonitoringSinkCreateDataRequired(TypedDict):
    destination: dict


class MonitoringSinkCreateData(MonitoringSinkCreateDataRequired, total=False):
    destination_uuid: str
    resources: list


class MonitoringSinkRemoveMatch(TypedDict):
    sink_uuid: str


class MonitoringSinkDestination(TypedDict, total=False):
    config: dict
    id: str
    name: str
    type: str


class MonitoringSinkDestinationLoadMatch(TypedDict):
    id: str


class MonitoringSinkDestinationListMatch(TypedDict, total=False):
    config: dict
    id: str
    name: str
    type: str


class MonitoringSinkDestinationCreateData(TypedDict, total=False):
    config: dict
    id: str
    name: str
    type: str


class MonitoringSinkDestinationUpdateDataRequired(TypedDict):
    id: str


class MonitoringSinkDestinationUpdateData(MonitoringSinkDestinationUpdateDataRequired, total=False):
    config: dict
    name: str
    type: str


class MonitoringSinkDestinationRemoveMatch(TypedDict):
    id: str


class N1Click(TypedDict):
    slug: str
    type: str


class N1ClickListMatch(TypedDict, total=False):
    type: str


class N1ClickApplicationRequired(TypedDict):
    addon_slugs: list
    cluster_uuid: str


class N1ClickApplication(N1ClickApplicationRequired, total=False):
    message: str


class N1ClickApplicationCreateDataRequired(TypedDict):
    addon_slugs: list
    cluster_uuid: str


class N1ClickApplicationCreateData(N1ClickApplicationCreateDataRequired, total=False):
    message: str


class NeighborId(TypedDict, total=False):
    neighbor_ids: list


class NeighborIdListMatch(TypedDict, total=False):
    neighbor_ids: list


class NfsRequired(TypedDict):
    created_at: str
    id: str
    name: str
    region: str
    size_gib: int
    status: str


class Nfs(NfsRequired, total=False):
    access_points: list
    host: str
    mount_path: str
    performance_tier: str
    vpc_ids: list


class NfsLoadMatchRequired(TypedDict):
    id: str


class NfsLoadMatch(NfsLoadMatchRequired, total=False):
    region: str


class NfsListMatch(TypedDict, total=False):
    region: str


class NfsCreateDataRequired(TypedDict):
    created_at: str
    id: str
    name: str
    region: str
    size_gib: int
    status: str


class NfsCreateData(NfsCreateDataRequired, total=False):
    access_points: list
    host: str
    mount_path: str
    performance_tier: str
    vpc_ids: list


class NfsRemoveMatchRequired(TypedDict):
    id: str


class NfsRemoveMatch(NfsRemoveMatchRequired, total=False):
    region: str


class NfsAction2(TypedDict, total=False):
    id: str


class NfsAction2CreateData(TypedDict):
    id: str


class NfsSnapshot(TypedDict):
    created_at: str
    id: str
    name: str
    region: str
    share_id: str
    size_gib: int
    status: str


class NfsSnapshotLoadMatchRequired(TypedDict):
    id: str


class NfsSnapshotLoadMatch(NfsSnapshotLoadMatchRequired, total=False):
    region: str


class NfsSnapshotListMatch(TypedDict, total=False):
    region: str
    share_id: str


class OnlineMigrationRequired(TypedDict):
    source: dict


class OnlineMigration(OnlineMigrationRequired, total=False):
    created_at: str
    disable_ssl: bool
    id: str
    ignore_dbs: list
    status: str


class OnlineMigrationLoadMatch(TypedDict):
    database_id: str


class OnlineMigrationUpdateDataRequired(TypedDict):
    database_id: str


class OnlineMigrationUpdateData(OnlineMigrationUpdateDataRequired, total=False):
    created_at: str
    disable_ssl: bool
    id: str
    ignore_dbs: list
    source: dict
    status: str


class Option(TypedDict, total=False):
    options: dict
    version_availability: dict


class OptionLoadMatch(TypedDict, total=False):
    options: dict
    version_availability: dict


class Organization(TypedDict):
    pass


class OrganizationListMatch(TypedDict):
    pass


class OrganizationCreateData(TypedDict):
    pass


class OutputView(TypedDict, total=False):
    audit: dict
    description: str
    fields: list
    id: str
    kind: str
    name: str
    output_schema: dict
    team_id: str
    tool: str
    tool_id: str
    version: str
    view_id: str


class OutputViewLoadMatch(TypedDict):
    id: str


class OutputViewListMatch(TypedDict, total=False):
    page_size: int
    page_token: str
    tool: str
    tool_id: str


class OutputViewCreateData(TypedDict, total=False):
    audit: dict
    description: str
    fields: list
    id: str
    kind: str
    name: str
    output_schema: dict
    team_id: str
    tool: str
    tool_id: str
    version: str
    view_id: str


class OutputViewRemoveMatch(TypedDict):
    id: str


class PartnerNetworkConnect(TypedDict, total=False):
    bgp: dict
    bgp_auth_key: dict
    children: list
    cidr: str
    connection_bandwidth_in_mbps: int
    created_at: str
    id: str
    naas_provider: str
    name: str
    parent_uuid: str
    region: str
    state: str
    vpc_ids: list


class PartnerNetworkConnectLoadMatch(TypedDict):
    pa_id: str


class PartnerNetworkConnectListMatchRequired(TypedDict):
    pa_id: str


class PartnerNetworkConnectListMatch(PartnerNetworkConnectListMatchRequired, total=False):
    page: int
    per_page: int


class PartnerNetworkConnectCreateData(TypedDict, total=False):
    bgp: dict
    bgp_auth_key: dict
    children: list
    cidr: str
    connection_bandwidth_in_mbps: int
    created_at: str
    id: str
    naas_provider: str
    name: str
    parent_uuid: str
    region: str
    state: str
    vpc_ids: list


class PartnerNetworkConnectUpdateDataRequired(TypedDict):
    pa_id: str


class PartnerNetworkConnectUpdateData(PartnerNetworkConnectUpdateDataRequired, total=False):
    bgp: dict
    bgp_auth_key: dict
    children: list
    cidr: str
    connection_bandwidth_in_mbps: int
    created_at: str
    id: str
    naas_provider: str
    name: str
    parent_uuid: str
    region: str
    state: str
    vpc_ids: list


class PartnerNetworkConnectRemoveMatch(TypedDict):
    pa_id: str


class PrepaymentConfig(TypedDict, total=False):
    config: dict
    status: dict


class PrepaymentConfigLoadMatch(TypedDict, total=False):
    config: dict
    status: dict


class PrepaymentStatus(TypedDict, total=False):
    balance: str
    blocked: bool
    eligible: bool
    is_auto_prepay_enabled: bool
    month_to_date_balance: str


class PrepaymentStatusLoadMatch(TypedDict, total=False):
    balance: str
    blocked: bool
    eligible: bool
    is_auto_prepay_enabled: bool
    month_to_date_balance: str


class Project(TypedDict, total=False):
    created_at: str
    description: str
    environment: str
    id: str
    is_default: bool
    name: str
    owner_id: int
    owner_uuid: str
    purpose: str
    updated_at: str


class ProjectLoadMatch(TypedDict):
    id: str


class ProjectListMatch(TypedDict, total=False):
    page: int
    per_page: int


class ProjectCreateData(TypedDict, total=False):
    created_at: str
    description: str
    environment: str
    id: str
    is_default: bool
    name: str
    owner_id: int
    owner_uuid: str
    purpose: str
    updated_at: str


class ProjectUpdateDataRequired(TypedDict):
    id: str


class ProjectUpdateData(ProjectUpdateDataRequired, total=False):
    created_at: str
    description: str
    environment: str
    is_default: bool
    name: str
    owner_id: int
    owner_uuid: str
    purpose: str
    updated_at: str


class ProjectPatchDataRequired(TypedDict):
    id: str


class ProjectPatchData(ProjectPatchDataRequired, total=False):
    created_at: str
    description: str
    environment: str
    is_default: bool
    name: str
    owner_id: int
    owner_uuid: str
    purpose: str
    updated_at: str


class ProjectRemoveMatch(TypedDict):
    id: str


class ProjectResource(TypedDict, total=False):
    assigned_at: str
    id: str
    links: dict
    resources: list
    status: str
    urn: str


class ProjectResourceListMatchRequired(TypedDict):
    id: str


class ProjectResourceListMatch(ProjectResourceListMatchRequired, total=False):
    page: int
    per_page: int


class ProjectResourceCreateDataRequired(TypedDict):
    id: str


class ProjectResourceCreateData(ProjectResourceCreateDataRequired, total=False):
    assigned_at: str
    links: dict
    resources: list
    status: str
    urn: str


class PromQuery(TypedDict):
    result: Any
    resultType: str


class PromQueryLoadMatchRequired(TypedDict):
    query_id: str
    query: str


class PromQueryLoadMatch(PromQueryLoadMatchRequired, total=False):
    time: str
    timeout: str


class PromQueryCreateData(TypedDict):
    query_id: str
    result: Any
    resultType: str


class PromQueryRange(TypedDict):
    result: list
    resultType: str


class PromQueryRangeLoadMatchRequired(TypedDict):
    query_id: str
    end: str
    query: str
    start: str
    step: str


class PromQueryRangeLoadMatch(PromQueryRangeLoadMatchRequired, total=False):
    timeout: str


class PromQueryRangeCreateData(TypedDict):
    query_id: str
    result: list
    resultType: str


class PromSeries(TypedDict):
    data: list
    status: str


class PromSeriesListMatchRequired(TypedDict):
    query_id: str
    match: list


class PromSeriesListMatch(PromSeriesListMatchRequired, total=False):
    end: str
    start: str


class PromSeriesCreateData(TypedDict):
    query_id: str
    data: list
    status: str


class PromStringList(TypedDict):
    data: list
    status: str


class PromStringListListMatchRequired(TypedDict):
    query_id: str


class PromStringListListMatch(PromStringListListMatchRequired, total=False):
    name: str
    end: str
    match: list
    start: str


class PromStringListCreateData(TypedDict):
    query_id: str
    data: list
    status: str


class Region(TypedDict):
    available: bool
    features: list
    name: str
    sizes: list
    slug: str


class RegionListMatch(TypedDict, total=False):
    page: int
    per_page: int


class ReservedIPv6(TypedDict, total=False):
    droplet: Any
    ip: str
    region_slug: str
    reserved_at: str


class ReservedIPv6LoadMatch(TypedDict):
    reserved_ipv6: str


class ReservedIPv6ListMatch(TypedDict, total=False):
    page: int
    per_page: int


class ReservedIPv6CreateData(TypedDict, total=False):
    droplet: Any
    ip: str
    region_slug: str
    reserved_at: str


class ReservedIPv6RemoveMatch(TypedDict):
    reserved_ipv6: str


class ReservedIPv6Action(TypedDict, total=False):
    action: dict


class ReservedIPv6ActionCreateDataRequired(TypedDict):
    reserved_ipv6_id: str


class ReservedIPv6ActionCreateData(ReservedIPv6ActionCreateDataRequired, total=False):
    action: dict


class ReservedIp(TypedDict, total=False):
    droplet: Any
    id: str
    ip: str
    links: dict
    locked: bool
    project_id: str
    region: Any
    reserved_ip: dict


class ReservedIpLoadMatch(TypedDict):
    id: str


class ReservedIpListMatch(TypedDict, total=False):
    page: int
    per_page: int


class ReservedIpCreateData(TypedDict, total=False):
    droplet: Any
    id: str
    ip: str
    links: dict
    locked: bool
    project_id: str
    region: Any
    reserved_ip: dict


class ReservedIpRemoveMatch(TypedDict):
    id: str


class ReservedIpActionRequired(TypedDict):
    region: dict


class ReservedIpAction(ReservedIpActionRequired, total=False):
    action: dict
    completed_at: str
    id: int
    project_id: str
    region_slug: str
    resource_id: int
    resource_type: str
    started_at: str
    status: str
    type: str


class ReservedIpActionLoadMatch(TypedDict):
    id: int
    reserved_ip_id: str


class ReservedIpActionListMatch(TypedDict):
    reserved_ip_id: str


class ReservedIpActionCreateDataRequired(TypedDict):
    reserved_ip_id: str
    region: dict


class ReservedIpActionCreateData(ReservedIpActionCreateDataRequired, total=False):
    action: dict
    completed_at: str
    id: int
    project_id: str
    region_slug: str
    resource_id: int
    resource_type: str
    started_at: str
    status: str
    type: str


class Resync(TypedDict, total=False):
    authorization: Any
    mcpServer: Any
    pending: bool
    tools: list
    user_id: str


class ResyncCreateDataRequired(TypedDict):
    server_ref: str


class ResyncCreateData(ResyncCreateDataRequired, total=False):
    authorization: Any
    mcpServer: Any
    pending: bool
    tools: list
    user_id: str


class Search(TypedDict, total=False):
    actorId: str
    agentName: str
    agentUrn: str
    auth_type: str
    auth_types: list
    config: dict
    connection_parameters: list
    createdAt: str
    credential_parameters: list
    description: str
    display_name: str
    insights: Any
    latest_version: str
    name: str
    network: Any
    oauth_client_setup_url: str
    oauth_redirect_url: str
    owning_user_id: str
    policy: Any
    reference_latest: str
    scopes: list
    sessionUrn: str
    status: str
    tool_count: int
    tools: dict
    updatedAt: str
    updated_at: str
    version_count: int


class SearchListMatch(TypedDict, total=False):
    end_user_id: str
    page_size: int
    page_token: str
    query: str


class SecurityPlan(TypedDict, total=False):
    tier_coverage: dict


class SecurityPlanUpdateData(TypedDict, total=False):
    tier_coverage: dict


class SecurityRule(TypedDict, total=False):
    resource: str


class SecurityRuleCreateData(TypedDict, total=False):
    resource: str


class SecurityScan(TypedDict, total=False):
    created_at: str
    findings: list
    id: str
    name: str
    status: str
    type: str
    urn: str


class SecurityScanLoadMatchRequired(TypedDict):
    scan_id: str


class SecurityScanLoadMatch(SecurityScanLoadMatchRequired, total=False):
    page: int
    per_page: int
    severity: str
    type: str


class SecurityScanListMatch(TypedDict, total=False):
    page: int
    per_page: int


class SecurityScanCreateData(TypedDict, total=False):
    created_at: str
    findings: list
    id: str
    name: str
    status: str
    type: str
    urn: str


class SecuritySuppression(TypedDict, total=False):
    resources: list
    rule_uuid: str


class SecuritySuppressionCreateData(TypedDict, total=False):
    resources: list
    rule_uuid: str


class SecuritySuppressionRemoveMatch(TypedDict):
    suppression_uuid: str


class Setting(TypedDict, total=False):
    plan_downgrades: dict
    settings: dict
    tier_coverage: dict


class SettingLoadMatch(TypedDict, total=False):
    page: int
    per_page: int


class SizeRequired(TypedDict):
    available: bool
    description: str
    disk: int
    memory: int
    price_hourly: float
    price_monthly: float
    regions: list
    slug: str
    transfer: float
    vcpus: int


class Size(SizeRequired, total=False):
    disk_info: list
    gpu_info: dict


class SizeListMatch(TypedDict, total=False):
    page: int
    per_page: int


class Snapshot(TypedDict):
    created_at: str
    id: str
    min_disk_size: int
    name: str
    regions: list
    resource_id: str
    resource_type: str
    size_gigabytes: float
    tags: list


class SnapshotLoadMatch(TypedDict):
    id: str


class SnapshotListMatch(TypedDict, total=False):
    page: int
    per_page: int
    resource_type: str


class SnapshotRemoveMatch(TypedDict):
    id: str


class SpacesKey(TypedDict, total=False):
    access_key: str
    created_at: str
    grants: list
    id: str
    keys: list
    name: str


class SpacesKeyLoadMatch(TypedDict):
    id: str


class SpacesKeyListMatch(TypedDict, total=False):
    bucket: str
    name: str
    page: int
    per_page: int
    permission: str
    sort: str
    sort_direction: str


class SpacesKeyCreateData(TypedDict, total=False):
    access_key: str
    created_at: str
    grants: list
    id: str
    keys: list
    name: str


class SpacesKeyUpdateDataRequired(TypedDict):
    id: str


class SpacesKeyUpdateData(SpacesKeyUpdateDataRequired, total=False):
    access_key: str
    created_at: str
    grants: list
    keys: list
    name: str


class SpacesKeyPatchDataRequired(TypedDict):
    id: str


class SpacesKeyPatchData(SpacesKeyPatchDataRequired, total=False):
    access_key: str
    created_at: str
    grants: list
    keys: list
    name: str


class SpacesKeyRemoveMatch(TypedDict):
    id: str


class SqlMode(TypedDict):
    sql_mode: str


class SqlModeLoadMatch(TypedDict):
    database_id: str


class SshKeyRequired(TypedDict):
    name: str
    public_key: str


class SshKey(SshKeyRequired, total=False):
    fingerprint: str
    id: int


class SshKeyLoadMatch(TypedDict):
    id: str


class SshKeyListMatch(TypedDict, total=False):
    page: int
    per_page: int


class SshKeyCreateDataRequired(TypedDict):
    name: str
    public_key: str


class SshKeyCreateData(SshKeyCreateDataRequired, total=False):
    fingerprint: str
    id: int


class SshKeyUpdateDataRequired(TypedDict):
    id: str


class SshKeyUpdateData(SshKeyUpdateDataRequired, total=False):
    fingerprint: str
    name: str
    public_key: str


class SshKeyRemoveMatch(TypedDict):
    id: str


class Systemone(TypedDict):
    answers: dict
    model: str
    questions: dict
    state: str
    usage: dict


class SystemoneCreateData(TypedDict):
    answers: dict
    model: str
    questions: dict
    state: str
    usage: dict


class Tag(TypedDict, total=False):
    id: str
    name: str
    resources: dict


class TagLoadMatch(TypedDict):
    id: str


class TagListMatch(TypedDict, total=False):
    page: int
    per_page: int


class TagCreateData(TypedDict, total=False):
    id: str
    name: str
    resources: dict


class TagRemoveMatch(TypedDict):
    id: str


class Tool(TypedDict, total=False):
    category: str
    description: str
    history: dict
    id: str
    name: str
    provider: str
    snapshot: Any
    title: str
    tool: Any
    tool_slug: str
    version: int


class ToolLoadMatchRequired(TypedDict):
    id: str


class ToolLoadMatch(ToolLoadMatchRequired, total=False):
    include_history: bool
    window: str


class ToolListMatchRequired(TypedDict):
    name: str
    provider_id: str


class ToolListMatch(ToolListMatchRequired, total=False):
    page: int
    per_page: int
    search: str
    version: str


class Toolbelt(TypedDict, total=False):
    created_at: str
    description: str
    display_name: str
    id: str
    latest_version: str
    name: str
    next_page_token: str
    reference: str
    reference_latest: str
    status: str
    tool_count: int
    tool_details: list
    toolbelt: Any
    tools: list
    updated_at: str
    version: str
    version_count: int


class ToolbeltLoadMatchRequired(TypedDict):
    id: str


class ToolbeltLoadMatch(ToolbeltLoadMatchRequired, total=False):
    page_size: int
    page_token: str
    search: str
    version: str


class ToolbeltListMatch(TypedDict, total=False):
    page: int
    per_page: int
    status: str


class ToolbeltCreateData(TypedDict, total=False):
    created_at: str
    description: str
    display_name: str
    id: str
    latest_version: str
    name: str
    next_page_token: str
    reference: str
    reference_latest: str
    status: str
    tool_count: int
    tool_details: list
    toolbelt: Any
    tools: list
    updated_at: str
    version: str
    version_count: int


class ToolbeltRemoveMatch(TypedDict):
    id: str


class UptimeRequired(TypedDict):
    notifications: dict


class Uptime(UptimeRequired, total=False):
    comparison: str
    enabled: bool
    id: str
    name: str
    period: str
    previous_outage: dict
    regions: list
    target: str
    threshold: int
    type: str


class UptimeLoadMatchRequired(TypedDict):
    check_id: str


class UptimeLoadMatch(UptimeLoadMatchRequired, total=False):
    alert_id: str


class UptimeListMatchRequired(TypedDict):
    check_id: str


class UptimeListMatch(UptimeListMatchRequired, total=False):
    page: int
    per_page: int


class UptimeCreateDataRequired(TypedDict):
    check_id: str
    notifications: dict


class UptimeCreateData(UptimeCreateDataRequired, total=False):
    comparison: str
    enabled: bool
    id: str
    name: str
    period: str
    previous_outage: dict
    regions: list
    target: str
    threshold: int
    type: str


class UptimeUpdateDataRequired(TypedDict):
    check_id: str


class UptimeUpdateData(UptimeUpdateDataRequired, total=False):
    alert_id: str
    comparison: str
    enabled: bool
    id: str
    name: str
    notifications: dict
    period: str
    previous_outage: dict
    regions: list
    target: str
    threshold: int
    type: str


class UptimeRemoveMatchRequired(TypedDict):
    check_id: str


class UptimeRemoveMatch(UptimeRemoveMatchRequired, total=False):
    alert_id: str


class User(TypedDict, total=False):
    connections: list
    groups: list
    id: str
    pagination: Any
    sessions: list
    user_id: str
    user_ids: list
    username: str


class UserLoadMatch(TypedDict):
    id: str


class UserListMatch(TypedDict, total=False):
    page: int
    per_page: int
    sort: str
    sort_direction: str
    user_id: str


class VectorDatabase(TypedDict, total=False):
    id: str


class VectorDatabaseRemoveMatch(TypedDict):
    id: str


class VectordbBackup(TypedDict, total=False):
    backup_id: str
    completed_at: str
    started_at: str
    status: str


class VectordbBackupListMatch(TypedDict):
    vector_database_id: str


class VectordbGetRestoreStatus(TypedDict, total=False):
    backup_id: str
    error: str
    status: str


class VectordbGetRestoreStatusLoadMatch(TypedDict):
    backup_id: str
    vector_database_id: str


class VectordbGetVectorDb(TypedDict, total=False):
    config: dict
    created_at: str
    endpoints: dict
    forked_from_id: str
    id: str
    last_restore_id: str
    name: str
    owner_uuid: str
    project_id: str
    region: str
    size: str
    status: str
    tags: list
    updated_at: str


class VectordbGetVectorDbLoadMatch(TypedDict):
    id: str


class VectordbGetVectorDbListMatch(TypedDict, total=False):
    page: int
    per_page: int


class VectordbGetVectorDbCreateData(TypedDict, total=False):
    config: dict
    created_at: str
    endpoints: dict
    forked_from_id: str
    id: str
    last_restore_id: str
    name: str
    owner_uuid: str
    project_id: str
    region: str
    size: str
    status: str
    tags: list
    updated_at: str


class VectordbGetVectorDbAdminCredential(TypedDict, total=False):
    api_token: str
    user_id: str


class VectordbGetVectorDbAdminCredentialLoadMatch(TypedDict):
    vector_database_id: str


class VectordbRestoreBackup(TypedDict, total=False):
    backup_id: str
    id: str
    status: str


class VectordbRestoreBackupCreateDataRequired(TypedDict):
    backup_id: str
    vector_database_id: str


class VectordbRestoreBackupCreateData(VectordbRestoreBackupCreateDataRequired, total=False):
    id: str
    status: str


class VectordbUpdateVectorDb(TypedDict, total=False):
    config: dict
    created_at: str
    endpoints: dict
    forked_from_id: str
    id: str
    last_restore_id: str
    name: str
    owner_uuid: str
    project_id: str
    region: str
    size: str
    status: str
    tags: list
    updated_at: str


class VectordbUpdateVectorDbUpdateDataRequired(TypedDict):
    id: str


class VectordbUpdateVectorDbUpdateData(VectordbUpdateVectorDbUpdateDataRequired, total=False):
    config: dict
    created_at: str
    endpoints: dict
    forked_from_id: str
    last_restore_id: str
    name: str
    owner_uuid: str
    project_id: str
    region: str
    size: str
    status: str
    tags: list
    updated_at: str


class VectordbUpdateVectorDbTag(TypedDict, total=False):
    config: dict
    created_at: str
    endpoints: dict
    forked_from_id: str
    id: str
    last_restore_id: str
    name: str
    owner_uuid: str
    project_id: str
    region: str
    size: str
    status: str
    tags: list
    updated_at: str


class VectordbUpdateVectorDbTagUpdateDataRequired(TypedDict):
    vector_database_id: str


class VectordbUpdateVectorDbTagUpdateData(VectordbUpdateVectorDbTagUpdateDataRequired, total=False):
    config: dict
    created_at: str
    endpoints: dict
    forked_from_id: str
    id: str
    last_restore_id: str
    name: str
    owner_uuid: str
    project_id: str
    region: str
    size: str
    status: str
    tags: list
    updated_at: str


class Vpc(TypedDict, total=False):
    created_at: str
    default: bool
    description: str
    id: str
    ip_range: str
    name: str
    region: str
    status: str
    urn: str
    vpc_ids: list


class VpcLoadMatch(TypedDict):
    id: str


class VpcListMatch(TypedDict, total=False):
    page: int
    per_page: int


class VpcCreateData(TypedDict, total=False):
    created_at: str
    default: bool
    description: str
    id: str
    ip_range: str
    name: str
    region: str
    status: str
    urn: str
    vpc_ids: list


class VpcUpdateDataRequired(TypedDict):
    id: str


class VpcUpdateData(VpcUpdateDataRequired, total=False):
    created_at: str
    default: bool
    description: str
    ip_range: str
    name: str
    region: str
    status: str
    urn: str
    vpc_ids: list


class VpcPatchDataRequired(TypedDict):
    id: str


class VpcPatchData(VpcPatchDataRequired, total=False):
    vpc_peering_id: str
    created_at: str
    default: bool
    description: str
    ip_range: str
    name: str
    region: str
    status: str
    urn: str
    vpc_ids: list


class VpcRemoveMatch(TypedDict):
    id: str


class VpcNatGateway(TypedDict, total=False):
    created_at: str
    egresses: dict
    icmp_timeout_seconds: int
    id: str
    name: str
    region: str
    size: int
    state: str
    tcp_timeout_seconds: int
    type: str
    udp_timeout_seconds: int
    updated_at: str
    vpcs: list


class VpcNatGatewayLoadMatch(TypedDict):
    id: str


class VpcNatGatewayListMatch(TypedDict, total=False):
    name: str
    page: int
    per_page: int
    region: str
    state: str
    type: str


class VpcNatGatewayCreateData(TypedDict, total=False):
    created_at: str
    egresses: dict
    icmp_timeout_seconds: int
    id: str
    name: str
    region: str
    size: int
    state: str
    tcp_timeout_seconds: int
    type: str
    udp_timeout_seconds: int
    updated_at: str
    vpcs: list


class VpcNatGatewayUpdateDataRequired(TypedDict):
    id: str


class VpcNatGatewayUpdateData(VpcNatGatewayUpdateDataRequired, total=False):
    created_at: str
    egresses: dict
    icmp_timeout_seconds: int
    name: str
    region: str
    size: int
    state: str
    tcp_timeout_seconds: int
    type: str
    udp_timeout_seconds: int
    updated_at: str
    vpcs: list


class VpcNatGatewayRemoveMatch(TypedDict):
    id: str


class VpcPeering(TypedDict, total=False):
    created_at: str
    id: str
    name: str
    status: str
    vpc_ids: list


class VpcPeeringLoadMatch(TypedDict):
    id: str


class VpcPeeringListMatch(TypedDict, total=False):
    page: int
    per_page: int
    region: str


class VpcPeeringCreateData(TypedDict, total=False):
    created_at: str
    id: str
    name: str
    status: str
    vpc_ids: list


class VpcPeeringUpdateDataRequired(TypedDict):
    id: str


class VpcPeeringUpdateData(VpcPeeringUpdateDataRequired, total=False):
    created_at: str
    name: str
    status: str
    vpc_ids: list


class VpcPeeringRemoveMatch(TypedDict):
    id: str


class VpcRoutesPublicPreviewRequired(TypedDict):
    destination_cidr: str
    id: str
    target_urns: list
    type: str


class VpcRoutesPublicPreview(VpcRoutesPublicPreviewRequired, total=False):
    created_at: str
    modifiable: bool


class VpcRoutesPublicPreviewListMatchRequired(TypedDict):
    subnet_id: str
    vpc_id: str


class VpcRoutesPublicPreviewListMatch(VpcRoutesPublicPreviewListMatchRequired, total=False):
    page: int
    per_page: int


class VpcRoutesPublicPreviewCreateDataRequired(TypedDict):
    subnet_id: str
    vpc_id: str
    destination_cidr: str
    id: str
    target_urns: list
    type: str


class VpcRoutesPublicPreviewCreateData(VpcRoutesPublicPreviewCreateDataRequired, total=False):
    created_at: str
    modifiable: bool


class VpcRoutesPublicPreviewUpdateDataRequired(TypedDict):
    id: str
    subnet_id: str
    vpc_id: str


class VpcRoutesPublicPreviewUpdateData(VpcRoutesPublicPreviewUpdateDataRequired, total=False):
    created_at: str
    destination_cidr: str
    modifiable: bool
    target_urns: list
    type: str


class VpcRoutesPublicPreviewRemoveMatch(TypedDict):
    id: str
    subnet_id: str
    vpc_id: str


class VpcSubnetsPublicPreviewRequired(TypedDict):
    created_at: str
    id: str
    ip_range: str
    name: str
    region: str
    type: str
    urn: str


class VpcSubnetsPublicPreview(VpcSubnetsPublicPreviewRequired, total=False):
    default: bool
    meta: dict


class VpcSubnetsPublicPreviewLoadMatch(TypedDict):
    subnet_uuid: str
    vpc_id: str


class VpcSubnetsPublicPreviewListMatchRequired(TypedDict):
    subnet_uuid: str
    vpc_id: str


class VpcSubnetsPublicPreviewListMatch(VpcSubnetsPublicPreviewListMatchRequired, total=False):
    page: int
    per_page: int
    resource_type: str


class VpcSubnetsPublicPreviewCreateDataRequired(TypedDict):
    id: str
    created_at: str
    ip_range: str
    name: str
    region: str
    type: str
    urn: str


class VpcSubnetsPublicPreviewCreateData(VpcSubnetsPublicPreviewCreateDataRequired, total=False):
    default: bool
    meta: dict


class VpcSubnetsPublicPreviewUpdateDataRequired(TypedDict):
    subnet_uuid: str
    vpc_id: str


class VpcSubnetsPublicPreviewUpdateData(VpcSubnetsPublicPreviewUpdateDataRequired, total=False):
    created_at: str
    default: bool
    id: str
    ip_range: str
    meta: dict
    name: str
    region: str
    type: str
    urn: str


class VpcSubnetsPublicPreviewRemoveMatch(TypedDict):
    subnet_uuid: str
    vpc_id: str
