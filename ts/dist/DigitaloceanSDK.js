"use strict";
// Digitalocean Ts SDK
Object.defineProperty(exports, "__esModule", { value: true });
exports.SDK = exports.DigitaloceanSDK = exports.DigitaloceanEntityBase = exports.BaseFeature = exports.config = exports.stdutil = void 0;
const AccessPointEntity_1 = require("./entity/AccessPointEntity");
const AccountEntity_1 = require("./entity/AccountEntity");
const ActionEntity_1 = require("./entity/ActionEntity");
const ActorLimitEntity_1 = require("./entity/ActorLimitEntity");
const AddOnEntity_1 = require("./entity/AddOnEntity");
const ApiAgentVersionEntity_1 = require("./entity/ApiAgentVersionEntity");
const ApiCreateAgentApiKeyOutputEntity_1 = require("./entity/ApiCreateAgentApiKeyOutputEntity");
const ApiCreateDataSourceFileUploadPresignedUrlsOutputEntity_1 = require("./entity/ApiCreateDataSourceFileUploadPresignedUrlsOutputEntity");
const ApiCreateKnowledgeBaseDataSourceOutputEntity_1 = require("./entity/ApiCreateKnowledgeBaseDataSourceOutputEntity");
const ApiCreateScenarioSetFromLibraryOutputEntity_1 = require("./entity/ApiCreateScenarioSetFromLibraryOutputEntity");
const ApiDeleteAgentApiKeyOutputEntity_1 = require("./entity/ApiDeleteAgentApiKeyOutputEntity");
const ApiDeleteAgentOutputEntity_1 = require("./entity/ApiDeleteAgentOutputEntity");
const ApiDeleteAnthropicApiKeyOutputEntity_1 = require("./entity/ApiDeleteAnthropicApiKeyOutputEntity");
const ApiDeleteCustomEvaluationMetricOutputEntity_1 = require("./entity/ApiDeleteCustomEvaluationMetricOutputEntity");
const ApiDeleteCustomModelOutputPublicEntity_1 = require("./entity/ApiDeleteCustomModelOutputPublicEntity");
const ApiDeleteEvaluationDatasetOutputEntity_1 = require("./entity/ApiDeleteEvaluationDatasetOutputEntity");
const ApiDeleteKnowledgeBaseDataSourceOutputEntity_1 = require("./entity/ApiDeleteKnowledgeBaseDataSourceOutputEntity");
const ApiDeleteKnowledgeBaseOutputEntity_1 = require("./entity/ApiDeleteKnowledgeBaseOutputEntity");
const ApiDeleteModelApiKeyOutputEntity_1 = require("./entity/ApiDeleteModelApiKeyOutputEntity");
const ApiDeleteModelEvaluationPresetOutputEntity_1 = require("./entity/ApiDeleteModelEvaluationPresetOutputEntity");
const ApiDeleteModelEvaluationRunOutputPublicEntity_1 = require("./entity/ApiDeleteModelEvaluationRunOutputPublicEntity");
const ApiDeleteModelRouterOutputEntity_1 = require("./entity/ApiDeleteModelRouterOutputEntity");
const ApiDeleteOpenAiapiKeyOutputEntity_1 = require("./entity/ApiDeleteOpenAiapiKeyOutputEntity");
const ApiDeleteScenarioSetOutputEntity_1 = require("./entity/ApiDeleteScenarioSetOutputEntity");
const ApiDeleteScheduledIndexingOutputEntity_1 = require("./entity/ApiDeleteScheduledIndexingOutputEntity");
const ApiDeleteSimulationRunOutputEntity_1 = require("./entity/ApiDeleteSimulationRunOutputEntity");
const ApiDeleteWorkspaceOutputEntity_1 = require("./entity/ApiDeleteWorkspaceOutputEntity");
const ApiDropboxOauth2GetTokensOutputEntity_1 = require("./entity/ApiDropboxOauth2GetTokensOutputEntity");
const ApiGenerateOauth2UrlOutputEntity_1 = require("./entity/ApiGenerateOauth2UrlOutputEntity");
const ApiGenerateScenarioSetOutputEntity_1 = require("./entity/ApiGenerateScenarioSetOutputEntity");
const ApiGetAgentOutputEntity_1 = require("./entity/ApiGetAgentOutputEntity");
const ApiGetAgentUsageOutputEntity_1 = require("./entity/ApiGetAgentUsageOutputEntity");
const ApiGetAnthropicApiKeyOutputEntity_1 = require("./entity/ApiGetAnthropicApiKeyOutputEntity");
const ApiGetChildrenOutputEntity_1 = require("./entity/ApiGetChildrenOutputEntity");
const ApiGetCustomModelOutputPublicEntity_1 = require("./entity/ApiGetCustomModelOutputPublicEntity");
const ApiGetEvaluationDatasetDownloadUrlOutputEntity_1 = require("./entity/ApiGetEvaluationDatasetDownloadUrlOutputEntity");
const ApiGetEvaluationRunOutputEntity_1 = require("./entity/ApiGetEvaluationRunOutputEntity");
const ApiGetEvaluationRunResultsOutputEntity_1 = require("./entity/ApiGetEvaluationRunResultsOutputEntity");
const ApiGetEvaluationTestCaseOutputEntity_1 = require("./entity/ApiGetEvaluationTestCaseOutputEntity");
const ApiGetIndexingJobDetailsSignedUrlOutputEntity_1 = require("./entity/ApiGetIndexingJobDetailsSignedUrlOutputEntity");
const ApiGetKnowledgeBaseIndexingJobOutputEntity_1 = require("./entity/ApiGetKnowledgeBaseIndexingJobOutputEntity");
const ApiGetKnowledgeBaseOutputEntity_1 = require("./entity/ApiGetKnowledgeBaseOutputEntity");
const ApiGetModelEvaluationRunOutputEntity_1 = require("./entity/ApiGetModelEvaluationRunOutputEntity");
const ApiGetModelEvaluationRunResultsDownloadUrlOutputEntity_1 = require("./entity/ApiGetModelEvaluationRunResultsDownloadUrlOutputEntity");
const ApiGetModelRouterOutputEntity_1 = require("./entity/ApiGetModelRouterOutputEntity");
const ApiGetOpenAiapiKeyOutputEntity_1 = require("./entity/ApiGetOpenAiapiKeyOutputEntity");
const ApiGetScenarioSetDownloadUrlOutputEntity_1 = require("./entity/ApiGetScenarioSetDownloadUrlOutputEntity");
const ApiGetScenarioSetOutputEntity_1 = require("./entity/ApiGetScenarioSetOutputEntity");
const ApiGetScheduledIndexingOutputEntity_1 = require("./entity/ApiGetScheduledIndexingOutputEntity");
const ApiGetSimulationJourneyTrajectoryUrlOutputEntity_1 = require("./entity/ApiGetSimulationJourneyTrajectoryUrlOutputEntity");
const ApiGetSimulationRunOutputEntity_1 = require("./entity/ApiGetSimulationRunOutputEntity");
const ApiGetWorkspaceOutputEntity_1 = require("./entity/ApiGetWorkspaceOutputEntity");
const ApiImportCustomModelOutputPublicEntity_1 = require("./entity/ApiImportCustomModelOutputPublicEntity");
const ApiIndexedDataSourceEntity_1 = require("./entity/ApiIndexedDataSourceEntity");
const ApiLinkAgentFunctionOutputEntity_1 = require("./entity/ApiLinkAgentFunctionOutputEntity");
const ApiLinkAgentGuardrailOutputEntity_1 = require("./entity/ApiLinkAgentGuardrailOutputEntity");
const ApiLinkAgentOutputEntity_1 = require("./entity/ApiLinkAgentOutputEntity");
const ApiLinkKnowledgeBaseOutputEntity_1 = require("./entity/ApiLinkKnowledgeBaseOutputEntity");
const ApiListAgentApiKeysOutputEntity_1 = require("./entity/ApiListAgentApiKeysOutputEntity");
const ApiListAgentsByAnthropicKeyOutputEntity_1 = require("./entity/ApiListAgentsByAnthropicKeyOutputEntity");
const ApiListAgentsByOpenAiKeyOutputEntity_1 = require("./entity/ApiListAgentsByOpenAiKeyOutputEntity");
const ApiListAgentsByWorkspaceOutputEntity_1 = require("./entity/ApiListAgentsByWorkspaceOutputEntity");
const ApiListEvaluationMetricsOutputEntity_1 = require("./entity/ApiListEvaluationMetricsOutputEntity");
const ApiListEvaluationRunsByTestCaseOutputEntity_1 = require("./entity/ApiListEvaluationRunsByTestCaseOutputEntity");
const ApiListEvaluationTestCasesByWorkspaceOutputEntity_1 = require("./entity/ApiListEvaluationTestCasesByWorkspaceOutputEntity");
const ApiListKnowledgeBaseDataSourcesOutputEntity_1 = require("./entity/ApiListKnowledgeBaseDataSourcesOutputEntity");
const ApiListKnowledgeBaseIndexingJobsOutputEntity_1 = require("./entity/ApiListKnowledgeBaseIndexingJobsOutputEntity");
const ApiListModelEvaluationMetricsOutputEntity_1 = require("./entity/ApiListModelEvaluationMetricsOutputEntity");
const ApiListScenarioLibraryOutputEntity_1 = require("./entity/ApiListScenarioLibraryOutputEntity");
const ApiListScenariosOutputEntity_1 = require("./entity/ApiListScenariosOutputEntity");
const ApiListSimulationJourneysOutputEntity_1 = require("./entity/ApiListSimulationJourneysOutputEntity");
const ApiModelCatalogCardEntity_1 = require("./entity/ApiModelCatalogCardEntity");
const ApiModelEvaluationPresetEntity_1 = require("./entity/ApiModelEvaluationPresetEntity");
const ApiModelPublicEntity_1 = require("./entity/ApiModelPublicEntity");
const ApiModelRouterPresetEntity_1 = require("./entity/ApiModelRouterPresetEntity");
const ApiModelRouterTaskPresetEntity_1 = require("./entity/ApiModelRouterTaskPresetEntity");
const ApiMoveAgentsToWorkspaceOutputEntity_1 = require("./entity/ApiMoveAgentsToWorkspaceOutputEntity");
const ApiPromptEntity_1 = require("./entity/ApiPromptEntity");
const ApiRollbackToAgentVersionOutputEntity_1 = require("./entity/ApiRollbackToAgentVersionOutputEntity");
const ApiSimulationJourneyEntity_1 = require("./entity/ApiSimulationJourneyEntity");
const ApiSimulationTrajectoryEntity_1 = require("./entity/ApiSimulationTrajectoryEntity");
const ApiUnlinkAgentFunctionOutputEntity_1 = require("./entity/ApiUnlinkAgentFunctionOutputEntity");
const ApiUnlinkAgentGuardrailOutputEntity_1 = require("./entity/ApiUnlinkAgentGuardrailOutputEntity");
const ApiUnlinkAgentOutputEntity_1 = require("./entity/ApiUnlinkAgentOutputEntity");
const ApiUnlinkKnowledgeBaseOutputEntity_1 = require("./entity/ApiUnlinkKnowledgeBaseOutputEntity");
const ApiUpdateAgentApiKeyOutputEntity_1 = require("./entity/ApiUpdateAgentApiKeyOutputEntity");
const ApiUpdateAgentFunctionOutputEntity_1 = require("./entity/ApiUpdateAgentFunctionOutputEntity");
const ApiUpdateAgentOutputEntity_1 = require("./entity/ApiUpdateAgentOutputEntity");
const ApiUpdateAnthropicApiKeyOutputEntity_1 = require("./entity/ApiUpdateAnthropicApiKeyOutputEntity");
const ApiUpdateCustomEvaluationMetricOutputEntity_1 = require("./entity/ApiUpdateCustomEvaluationMetricOutputEntity");
const ApiUpdateEvaluationTestCaseOutputEntity_1 = require("./entity/ApiUpdateEvaluationTestCaseOutputEntity");
const ApiUpdateKnowledgeBaseDataSourceOutputEntity_1 = require("./entity/ApiUpdateKnowledgeBaseDataSourceOutputEntity");
const ApiUpdateKnowledgeBaseOutputEntity_1 = require("./entity/ApiUpdateKnowledgeBaseOutputEntity");
const ApiUpdateLinkedAgentOutputEntity_1 = require("./entity/ApiUpdateLinkedAgentOutputEntity");
const ApiUpdateModelApiKeyOutputEntity_1 = require("./entity/ApiUpdateModelApiKeyOutputEntity");
const ApiUpdateModelEvaluationRunOutputEntity_1 = require("./entity/ApiUpdateModelEvaluationRunOutputEntity");
const ApiUpdateModelRouterOutputEntity_1 = require("./entity/ApiUpdateModelRouterOutputEntity");
const ApiUpdateOpenAiapiKeyOutputEntity_1 = require("./entity/ApiUpdateOpenAiapiKeyOutputEntity");
const ApiUpdateScenarioSetOutputEntity_1 = require("./entity/ApiUpdateScenarioSetOutputEntity");
const ApiUpdateSimulationRunOutputEntity_1 = require("./entity/ApiUpdateSimulationRunOutputEntity");
const ApiUpdateWorkspaceOutputEntity_1 = require("./entity/ApiUpdateWorkspaceOutputEntity");
const AppEntity_1 = require("./entity/AppEntity");
const AppAlertEntity_1 = require("./entity/AppAlertEntity");
const AppEventEntity_1 = require("./entity/AppEventEntity");
const AppHealthEntity_1 = require("./entity/AppHealthEntity");
const AppInstanceEntity_1 = require("./entity/AppInstanceEntity");
const AppJobInvocationEntity_1 = require("./entity/AppJobInvocationEntity");
const AppMetricsBandwidthUsageEntity_1 = require("./entity/AppMetricsBandwidthUsageEntity");
const AppProposeEntity_1 = require("./entity/AppProposeEntity");
const AppsDeploymentEntity_1 = require("./entity/AppsDeploymentEntity");
const AppsGetExecEntity_1 = require("./entity/AppsGetExecEntity");
const AppsGetLogEntity_1 = require("./entity/AppsGetLogEntity");
const AppsInstanceSizeEntity_1 = require("./entity/AppsInstanceSizeEntity");
const AppsRegionEntity_1 = require("./entity/AppsRegionEntity");
const AssociatedKubernetesResourceEntity_1 = require("./entity/AssociatedKubernetesResourceEntity");
const AssociatedResourceStatusEntity_1 = require("./entity/AssociatedResourceStatusEntity");
const AsyncInvokeEntity_1 = require("./entity/AsyncInvokeEntity");
const BalanceEntity_1 = require("./entity/BalanceEntity");
const BatchEntity_1 = require("./entity/BatchEntity");
const BatchFileCreateEntity_1 = require("./entity/BatchFileCreateEntity");
const BatchInferenceEntity_1 = require("./entity/BatchInferenceEntity");
const BatchResultEntity_1 = require("./entity/BatchResultEntity");
const BillingEntity_1 = require("./entity/BillingEntity");
const BlockStorageEntity_1 = require("./entity/BlockStorageEntity");
const BlockStorageActionEntity_1 = require("./entity/BlockStorageActionEntity");
const ByoipPrefixEntity_1 = require("./entity/ByoipPrefixEntity");
const CdnEndpointEntity_1 = require("./entity/CdnEndpointEntity");
const CertificateEntity_1 = require("./entity/CertificateEntity");
const ChatCompletionEntity_1 = require("./entity/ChatCompletionEntity");
const ClusterlintEntity_1 = require("./entity/ClusterlintEntity");
const ConnectionEntity_1 = require("./entity/ConnectionEntity");
const ConnectionPoolEntity_1 = require("./entity/ConnectionPoolEntity");
const ContainerRegistryEntity_1 = require("./entity/ContainerRegistryEntity");
const CreateResponseEntity_1 = require("./entity/CreateResponseEntity");
const CredentialEntity_1 = require("./entity/CredentialEntity");
const DatabaseEntity_1 = require("./entity/DatabaseEntity");
const DedicatedInferenceEntity_1 = require("./entity/DedicatedInferenceEntity");
const DedicatedInferenceAcceleratorEntity_1 = require("./entity/DedicatedInferenceAcceleratorEntity");
const DedicatedInferenceGpuModelConfigEntity_1 = require("./entity/DedicatedInferenceGpuModelConfigEntity");
const DedicatedInferenceSizeEntity_1 = require("./entity/DedicatedInferenceSizeEntity");
const DockerCredentialEntity_1 = require("./entity/DockerCredentialEntity");
const DomainEntity_1 = require("./entity/DomainEntity");
const DomainRecordEntity_1 = require("./entity/DomainRecordEntity");
const DropletEntity_1 = require("./entity/DropletEntity");
const DropletActionEntity_1 = require("./entity/DropletActionEntity");
const DropletAutoscalePoolEntity_1 = require("./entity/DropletAutoscalePoolEntity");
const EmbeddingEntity_1 = require("./entity/EmbeddingEntity");
const EmptyEntity_1 = require("./entity/EmptyEntity");
const FirewallEntity_1 = require("./entity/FirewallEntity");
const FloatingIpEntity_1 = require("./entity/FloatingIpEntity");
const FloatingIpActionEntity_1 = require("./entity/FloatingIpActionEntity");
const FunctionEntity_1 = require("./entity/FunctionEntity");
const GenaiapiRegionEntity_1 = require("./entity/GenaiapiRegionEntity");
const ImageEntity_1 = require("./entity/ImageEntity");
const ImageActionEntity_1 = require("./entity/ImageActionEntity");
const InsightEntity_1 = require("./entity/InsightEntity");
const InvoiceSummaryEntity_1 = require("./entity/InvoiceSummaryEntity");
const KuberneteEntity_1 = require("./entity/KuberneteEntity");
const KubernetesOptionEntity_1 = require("./entity/KubernetesOptionEntity");
const ListMcpServerToolEntity_1 = require("./entity/ListMcpServerToolEntity");
const ListProviderEntity_1 = require("./entity/ListProviderEntity");
const ListProviderHealthEntity_1 = require("./entity/ListProviderHealthEntity");
const ListToolEntity_1 = require("./entity/ListToolEntity");
const ListToolHealthEntity_1 = require("./entity/ListToolHealthEntity");
const ListToolbeltProviderEntity_1 = require("./entity/ListToolbeltProviderEntity");
const ListToolkitEntity_1 = require("./entity/ListToolkitEntity");
const LoadBalancerEntity_1 = require("./entity/LoadBalancerEntity");
const LogsSearchEntity_1 = require("./entity/LogsSearchEntity");
const LogsinkEntity_1 = require("./entity/LogsinkEntity");
const McpServerEntity_1 = require("./entity/McpServerEntity");
const MessageEntity_1 = require("./entity/MessageEntity");
const MetricEntity_1 = require("./entity/MetricEntity");
const ModelEntity_1 = require("./entity/ModelEntity");
const MonitoringEntity_1 = require("./entity/MonitoringEntity");
const N1ClickEntity_1 = require("./entity/N1ClickEntity");
const N1ClickApplicationEntity_1 = require("./entity/N1ClickApplicationEntity");
const NeighborIdEntity_1 = require("./entity/NeighborIdEntity");
const NfsEntity_1 = require("./entity/NfsEntity");
const NfsAction2Entity_1 = require("./entity/NfsAction2Entity");
const NfsSnapshotEntity_1 = require("./entity/NfsSnapshotEntity");
const OnlineMigrationEntity_1 = require("./entity/OnlineMigrationEntity");
const OptionEntity_1 = require("./entity/OptionEntity");
const OrganizationEntity_1 = require("./entity/OrganizationEntity");
const OutputViewEntity_1 = require("./entity/OutputViewEntity");
const PartnerNetworkConnectEntity_1 = require("./entity/PartnerNetworkConnectEntity");
const PrepaymentConfigEntity_1 = require("./entity/PrepaymentConfigEntity");
const PrepaymentStatusEntity_1 = require("./entity/PrepaymentStatusEntity");
const ProjectEntity_1 = require("./entity/ProjectEntity");
const ProjectResourceEntity_1 = require("./entity/ProjectResourceEntity");
const PromQueryEntity_1 = require("./entity/PromQueryEntity");
const PromQueryRangeEntity_1 = require("./entity/PromQueryRangeEntity");
const PromSeriesEntity_1 = require("./entity/PromSeriesEntity");
const PromStringListEntity_1 = require("./entity/PromStringListEntity");
const RegionEntity_1 = require("./entity/RegionEntity");
const ReservedIPv6Entity_1 = require("./entity/ReservedIPv6Entity");
const ReservedIPv6ActionEntity_1 = require("./entity/ReservedIPv6ActionEntity");
const ReservedIpEntity_1 = require("./entity/ReservedIpEntity");
const ReservedIpActionEntity_1 = require("./entity/ReservedIpActionEntity");
const ResyncEntity_1 = require("./entity/ResyncEntity");
const SearchEntity_1 = require("./entity/SearchEntity");
const SecurityEntity_1 = require("./entity/SecurityEntity");
const SettingEntity_1 = require("./entity/SettingEntity");
const SizeEntity_1 = require("./entity/SizeEntity");
const SnapshotEntity_1 = require("./entity/SnapshotEntity");
const SpacesKeyEntity_1 = require("./entity/SpacesKeyEntity");
const SqlModeEntity_1 = require("./entity/SqlModeEntity");
const SshKeyEntity_1 = require("./entity/SshKeyEntity");
const SystemoneEntity_1 = require("./entity/SystemoneEntity");
const TagEntity_1 = require("./entity/TagEntity");
const ToolEntity_1 = require("./entity/ToolEntity");
const ToolbeltEntity_1 = require("./entity/ToolbeltEntity");
const UptimeEntity_1 = require("./entity/UptimeEntity");
const UserEntity_1 = require("./entity/UserEntity");
const VectorDatabaseEntity_1 = require("./entity/VectorDatabaseEntity");
const VectordbBackupEntity_1 = require("./entity/VectordbBackupEntity");
const VectordbGetRestoreStatusEntity_1 = require("./entity/VectordbGetRestoreStatusEntity");
const VectordbGetVectorDbEntity_1 = require("./entity/VectordbGetVectorDbEntity");
const VectordbGetVectorDbAdminCredentialEntity_1 = require("./entity/VectordbGetVectorDbAdminCredentialEntity");
const VectordbRestoreBackupEntity_1 = require("./entity/VectordbRestoreBackupEntity");
const VectordbUpdateVectorDbEntity_1 = require("./entity/VectordbUpdateVectorDbEntity");
const VectordbUpdateVectorDbTagEntity_1 = require("./entity/VectordbUpdateVectorDbTagEntity");
const VpcEntity_1 = require("./entity/VpcEntity");
const VpcNatGatewayEntity_1 = require("./entity/VpcNatGatewayEntity");
const VpcPeeringEntity_1 = require("./entity/VpcPeeringEntity");
const VpcRoutesPublicPreviewEntity_1 = require("./entity/VpcRoutesPublicPreviewEntity");
const VpcSubnetsPublicPreviewEntity_1 = require("./entity/VpcSubnetsPublicPreviewEntity");
const node_util_1 = require("node:util");
const Config_1 = require("./Config");
Object.defineProperty(exports, "config", { enumerable: true, get: function () { return Config_1.config; } });
const DigitaloceanEntityBase_1 = require("./DigitaloceanEntityBase");
Object.defineProperty(exports, "DigitaloceanEntityBase", { enumerable: true, get: function () { return DigitaloceanEntityBase_1.DigitaloceanEntityBase; } });
const Utility_1 = require("./utility/Utility");
const ResultBodyUtility_1 = require("./utility/ResultBodyUtility");
const MakeRequestUtility_1 = require("./utility/MakeRequestUtility");
const PrepareMethodUtility_1 = require("./utility/PrepareMethodUtility");
const BaseFeature_1 = require("./feature/base/BaseFeature");
Object.defineProperty(exports, "BaseFeature", { enumerable: true, get: function () { return BaseFeature_1.BaseFeature; } });
const stdutil = new Utility_1.Utility();
exports.stdutil = stdutil;
class DigitaloceanSDK {
    _mode = 'live';
    _options;
    _utility = new Utility_1.Utility();
    _features;
    _rootctx;
    constructor(options) {
        this._rootctx = this._utility.makeContext({
            client: this,
            utility: this._utility,
            config: Config_1.config,
            options,
            shared: new WeakMap()
        });
        this._options = this._utility.makeOptions(this._rootctx);
        for (const key of ['_options', '_rootctx', '_features']) {
            Object.defineProperty(this, key, {
                value: this[key], enumerable: false, writable: true, configurable: true
            });
        }
        const struct = this._utility.struct;
        const getpath = struct.getpath;
        if (true === getpath(this._options.feature, 'test.active')) {
            this._mode = 'test';
        }
        this._rootctx.options = this._options;
        this._features = [];
        const featureAdd = this._utility.featureAdd;
        const featureInit = this._utility.featureInit;
        // Add features in the resolved order (makeOptions puts an explicit
        // array order first, else defaults to test-first). Ordering matters:
        // the `test` feature installs the base mock transport and the transport
        // features (retry/cache/netsim/proxy/ratelimit) wrap whatever is current,
        // so `test` must be added before them to sit at the base of the chain.
        const extend = this._options.extend || [];
        const featureorder = getpath(this._options, '__derived__.featureorder') || [];
        for (const fname of featureorder) {
            const fopts = this._options.feature[fname] || {};
            if (fopts.active) {
                // An active name with no generated class is legal when an
                // extend-supplied instance carries that name (station's adopt
                // path): the instance is added below, positioned by its own
                // __after__ entry, so skip it here rather than fail construction.
                if (!this._rootctx.config.hasFeature(fname) &&
                    extend.some((f) => fname === f.name)) {
                    continue;
                }
                featureAdd(this._rootctx, this._rootctx.config.makeFeature(fname));
            }
        }
        for (let f of extend) {
            featureAdd(this._rootctx, f);
        }
        for (let f of this._features) {
            featureInit(this._rootctx, f);
        }
        const featureHook = this._utility.featureHook;
        featureHook(this._rootctx, 'PostConstruct');
    }
    options() {
        return this._utility.struct.clone(this._options);
    }
    utility() {
        return this._utility.struct.clone(this._utility);
    }
    async prepare(fetchargs) {
        const utility = this._utility;
        const struct = utility.struct;
        const clone = struct.clone;
        const { makeContext, makeFetchDef, prepareHeaders, prepareAuth, } = utility;
        fetchargs = fetchargs || {};
        let ctx = makeContext({
            opname: 'prepare',
            ctrl: fetchargs.ctrl || {},
        }, this._rootctx);
        const options = this._options;
        const method = String(fetchargs.method || 'GET').toUpperCase();
        if (!(0, PrepareMethodUtility_1.allowed)(options.allow.method, method)) {
            return ctx.error('spec_method_allow', 'Method "' + method +
                '" not allowed by SDK option allow.method value: "' + options.allow.method + '"');
        }
        const spec = {
            base: options.base,
            prefix: options.prefix,
            suffix: options.suffix,
            path: fetchargs.path || '',
            method,
            params: fetchargs.params || {},
            query: fetchargs.query || {},
            headers: prepareHeaders(ctx),
            body: fetchargs.body,
            step: 'start',
        };
        ctx.spec = spec;
        if (fetchargs.headers) {
            const uheaders = fetchargs.headers;
            for (let key in uheaders) {
                spec.headers[key] = uheaders[key];
            }
        }
        const authResult = prepareAuth(ctx);
        if (authResult instanceof Error) {
            return authResult;
        }
        return makeFetchDef(ctx);
    }
    // Raw endpoint access is operator-controllable, like every entity op.
    // Blocking it means denying BOTH the 'direct' and 'graphql' tokens, since
    // either one reaches the same endpoint.
    async direct(fetchargs) {
        if (!(0, PrepareMethodUtility_1.allowed)(this._options.allow.op, 'direct')) {
            return {
                ok: false,
                err: new Error('DigitaloceanSDK: direct: operation not allowed by' +
                    ' SDK option allow.op value: "' + this._options.allow.op + '"'),
            };
        }
        return this._rawRequest(fetchargs);
    }
    // Ungated request path shared by direct() and graphql(), each of which
    // checks its own allow.op token first. Private, rather than a flag on
    // fetchargs: a caller-supplied marker would let anyone opt straight back
    // out of the gate by passing it.
    async _rawRequest(fetchargs) {
        const utility = this._utility;
        const fetcher = utility.fetcher;
        const makeContext = utility.makeContext;
        const fetchdef = await this.prepare(fetchargs);
        if (fetchdef instanceof Error) {
            return { ok: false, err: utility.clean(this._rootctx, fetchdef) };
        }
        let ctx = makeContext({
            opname: 'direct',
            ctrl: (fetchargs || {}).ctrl || {},
        }, this._rootctx);
        try {
            if (true === fetchdef.signal?.aborted) {
                throw fetchdef.signal.reason;
            }
            const fetched = await fetcher(ctx, fetchdef.url, fetchdef);
            if (null == fetched) {
                return { ok: false, err: ctx.error('direct_no_response', 'response: undefined') };
            }
            else if (fetched instanceof Error) {
                return { ok: false, err: utility.clean(ctx, (0, MakeRequestUtility_1.abortError)(ctx, fetched)) };
            }
            const status = fetched.status;
            // No body responses (204 No Content, 304 Not Modified) and explicit
            // zero content-length must skip JSON parsing — fetched.json() would
            // throw `Unexpected end of JSON input` on an empty body.
            const headers = fetched.headers;
            const contentLength = headers && 'function' === typeof headers.get
                ? headers.get('content-length')
                : (headers || {})['content-length'];
            const noBody = 204 === status || 304 === status || '0' === String(contentLength);
            let json = undefined;
            let err = undefined;
            if (!noBody) {
                let text = undefined;
                try {
                    const raw = fetched;
                    if ('function' === typeof raw.text) {
                        text = await raw.text();
                        json = '' === text.trim() ? undefined : JSON.parse(text);
                    }
                    else {
                        json = 'function' === typeof fetched.json ? await fetched.json() : fetched.json;
                    }
                }
                catch (parseErr) {
                    if ('SyntaxError' !== parseErr?.name) {
                        throw parseErr;
                    }
                    err = (0, ResultBodyUtility_1.unreadableBody)(ctx, {
                        status, headers, text: text ?? parseErr.text, sent: fetchdef.headers,
                        failed: 200 <= status && status < 300 ? undefined :
                            ctx.error('request_status', 'request: ' + status + ': ' + fetched.statusText),
                    });
                }
            }
            return {
                ok: null == err && status >= 200 && status < 300,
                status,
                headers: fetched.headers,
                data: json,
                ...(null == err ? {} : { err: utility.clean(ctx, err) }),
            };
        }
        catch (err) {
            return { ok: false, err: utility.clean(ctx, (0, MakeRequestUtility_1.abortError)(ctx, err)) };
        }
    }
    async graphql(query, variables, ctrl) {
        const options = this._options;
        if (!(0, PrepareMethodUtility_1.allowed)(options.allow.op, 'graphql')) {
            return {
                ok: false,
                err: new Error('DigitaloceanSDK: graphql: operation not allowed by' +
                    ' SDK option allow.op value: "' + options.allow.op + '"'),
            };
        }
        const res = await this._rawRequest({
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: { query, variables: variables || {} },
            ctrl,
        });
        // Errors are read BEFORE any status check: a GraphQL parse or validation
        // failure comes back as HTTP 400 carrying the standard { errors: [...] }
        // body, and the raw path represents a non-2xx as { ok: false } with no
        // err — so returning early on status would discard the server's own
        // diagnostics, which are the only useful part of that response.
        const errors = null == res.data ? undefined : res.data.errors;
        if (null != errors && Array.isArray(errors) && 0 < errors.length) {
            const first = errors[0] || {};
            const err = new Error('DigitaloceanSDK: graphql: ' +
                (first.message || 'graphql error'));
            err.graphql = errors;
            return { ok: false, status: res.status, headers: res.headers, err, data: res.data };
        }
        return res;
    }
    // Entity access: `client.AccessPoint().list()` / `client.AccessPoint().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    AccessPoint(entopts) {
        const self = this;
        return new AccessPointEntity_1.AccessPointEntity(self, entopts);
    }
    // Entity access: `client.Account().list()` / `client.Account().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Account(entopts) {
        const self = this;
        return new AccountEntity_1.AccountEntity(self, entopts);
    }
    // Entity access: `client.Action().list()` / `client.Action().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Action(entopts) {
        const self = this;
        return new ActionEntity_1.ActionEntity(self, entopts);
    }
    // Entity access: `client.ActorLimit().list()` / `client.ActorLimit().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    ActorLimit(entopts) {
        const self = this;
        return new ActorLimitEntity_1.ActorLimitEntity(self, entopts);
    }
    // Entity access: `client.AddOn().list()` / `client.AddOn().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    AddOn(entopts) {
        const self = this;
        return new AddOnEntity_1.AddOnEntity(self, entopts);
    }
    // Entity access: `client.ApiAgentVersion().list()` / `client.ApiAgentVersion().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    ApiAgentVersion(entopts) {
        const self = this;
        return new ApiAgentVersionEntity_1.ApiAgentVersionEntity(self, entopts);
    }
    // Entity access: `client.ApiCreateAgentApiKeyOutput().list()` / `client.ApiCreateAgentApiKeyOutput().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    ApiCreateAgentApiKeyOutput(entopts) {
        const self = this;
        return new ApiCreateAgentApiKeyOutputEntity_1.ApiCreateAgentApiKeyOutputEntity(self, entopts);
    }
    // Entity access: `client.ApiCreateDataSourceFileUploadPresignedUrlsOutput().list()` / `client.ApiCreateDataSourceFileUploadPresignedUrlsOutput().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    ApiCreateDataSourceFileUploadPresignedUrlsOutput(entopts) {
        const self = this;
        return new ApiCreateDataSourceFileUploadPresignedUrlsOutputEntity_1.ApiCreateDataSourceFileUploadPresignedUrlsOutputEntity(self, entopts);
    }
    // Entity access: `client.ApiCreateKnowledgeBaseDataSourceOutput().list()` / `client.ApiCreateKnowledgeBaseDataSourceOutput().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    ApiCreateKnowledgeBaseDataSourceOutput(entopts) {
        const self = this;
        return new ApiCreateKnowledgeBaseDataSourceOutputEntity_1.ApiCreateKnowledgeBaseDataSourceOutputEntity(self, entopts);
    }
    // Entity access: `client.ApiCreateScenarioSetFromLibraryOutput().list()` / `client.ApiCreateScenarioSetFromLibraryOutput().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    ApiCreateScenarioSetFromLibraryOutput(entopts) {
        const self = this;
        return new ApiCreateScenarioSetFromLibraryOutputEntity_1.ApiCreateScenarioSetFromLibraryOutputEntity(self, entopts);
    }
    // Entity access: `client.ApiDeleteAgentApiKeyOutput().list()` / `client.ApiDeleteAgentApiKeyOutput().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    ApiDeleteAgentApiKeyOutput(entopts) {
        const self = this;
        return new ApiDeleteAgentApiKeyOutputEntity_1.ApiDeleteAgentApiKeyOutputEntity(self, entopts);
    }
    // Entity access: `client.ApiDeleteAgentOutput().list()` / `client.ApiDeleteAgentOutput().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    ApiDeleteAgentOutput(entopts) {
        const self = this;
        return new ApiDeleteAgentOutputEntity_1.ApiDeleteAgentOutputEntity(self, entopts);
    }
    // Entity access: `client.ApiDeleteAnthropicApiKeyOutput().list()` / `client.ApiDeleteAnthropicApiKeyOutput().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    ApiDeleteAnthropicApiKeyOutput(entopts) {
        const self = this;
        return new ApiDeleteAnthropicApiKeyOutputEntity_1.ApiDeleteAnthropicApiKeyOutputEntity(self, entopts);
    }
    // Entity access: `client.ApiDeleteCustomEvaluationMetricOutput().list()` / `client.ApiDeleteCustomEvaluationMetricOutput().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    ApiDeleteCustomEvaluationMetricOutput(entopts) {
        const self = this;
        return new ApiDeleteCustomEvaluationMetricOutputEntity_1.ApiDeleteCustomEvaluationMetricOutputEntity(self, entopts);
    }
    // Entity access: `client.ApiDeleteCustomModelOutputPublic().list()` / `client.ApiDeleteCustomModelOutputPublic().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    ApiDeleteCustomModelOutputPublic(entopts) {
        const self = this;
        return new ApiDeleteCustomModelOutputPublicEntity_1.ApiDeleteCustomModelOutputPublicEntity(self, entopts);
    }
    // Entity access: `client.ApiDeleteEvaluationDatasetOutput().list()` / `client.ApiDeleteEvaluationDatasetOutput().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    ApiDeleteEvaluationDatasetOutput(entopts) {
        const self = this;
        return new ApiDeleteEvaluationDatasetOutputEntity_1.ApiDeleteEvaluationDatasetOutputEntity(self, entopts);
    }
    // Entity access: `client.ApiDeleteKnowledgeBaseDataSourceOutput().list()` / `client.ApiDeleteKnowledgeBaseDataSourceOutput().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    ApiDeleteKnowledgeBaseDataSourceOutput(entopts) {
        const self = this;
        return new ApiDeleteKnowledgeBaseDataSourceOutputEntity_1.ApiDeleteKnowledgeBaseDataSourceOutputEntity(self, entopts);
    }
    // Entity access: `client.ApiDeleteKnowledgeBaseOutput().list()` / `client.ApiDeleteKnowledgeBaseOutput().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    ApiDeleteKnowledgeBaseOutput(entopts) {
        const self = this;
        return new ApiDeleteKnowledgeBaseOutputEntity_1.ApiDeleteKnowledgeBaseOutputEntity(self, entopts);
    }
    // Entity access: `client.ApiDeleteModelApiKeyOutput().list()` / `client.ApiDeleteModelApiKeyOutput().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    ApiDeleteModelApiKeyOutput(entopts) {
        const self = this;
        return new ApiDeleteModelApiKeyOutputEntity_1.ApiDeleteModelApiKeyOutputEntity(self, entopts);
    }
    // Entity access: `client.ApiDeleteModelEvaluationPresetOutput().list()` / `client.ApiDeleteModelEvaluationPresetOutput().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    ApiDeleteModelEvaluationPresetOutput(entopts) {
        const self = this;
        return new ApiDeleteModelEvaluationPresetOutputEntity_1.ApiDeleteModelEvaluationPresetOutputEntity(self, entopts);
    }
    // Entity access: `client.ApiDeleteModelEvaluationRunOutputPublic().list()` / `client.ApiDeleteModelEvaluationRunOutputPublic().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    ApiDeleteModelEvaluationRunOutputPublic(entopts) {
        const self = this;
        return new ApiDeleteModelEvaluationRunOutputPublicEntity_1.ApiDeleteModelEvaluationRunOutputPublicEntity(self, entopts);
    }
    // Entity access: `client.ApiDeleteModelRouterOutput().list()` / `client.ApiDeleteModelRouterOutput().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    ApiDeleteModelRouterOutput(entopts) {
        const self = this;
        return new ApiDeleteModelRouterOutputEntity_1.ApiDeleteModelRouterOutputEntity(self, entopts);
    }
    // Entity access: `client.ApiDeleteOpenAiapiKeyOutput().list()` / `client.ApiDeleteOpenAiapiKeyOutput().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    ApiDeleteOpenAiapiKeyOutput(entopts) {
        const self = this;
        return new ApiDeleteOpenAiapiKeyOutputEntity_1.ApiDeleteOpenAiapiKeyOutputEntity(self, entopts);
    }
    // Entity access: `client.ApiDeleteScenarioSetOutput().list()` / `client.ApiDeleteScenarioSetOutput().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    ApiDeleteScenarioSetOutput(entopts) {
        const self = this;
        return new ApiDeleteScenarioSetOutputEntity_1.ApiDeleteScenarioSetOutputEntity(self, entopts);
    }
    // Entity access: `client.ApiDeleteScheduledIndexingOutput().list()` / `client.ApiDeleteScheduledIndexingOutput().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    ApiDeleteScheduledIndexingOutput(entopts) {
        const self = this;
        return new ApiDeleteScheduledIndexingOutputEntity_1.ApiDeleteScheduledIndexingOutputEntity(self, entopts);
    }
    // Entity access: `client.ApiDeleteSimulationRunOutput().list()` / `client.ApiDeleteSimulationRunOutput().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    ApiDeleteSimulationRunOutput(entopts) {
        const self = this;
        return new ApiDeleteSimulationRunOutputEntity_1.ApiDeleteSimulationRunOutputEntity(self, entopts);
    }
    // Entity access: `client.ApiDeleteWorkspaceOutput().list()` / `client.ApiDeleteWorkspaceOutput().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    ApiDeleteWorkspaceOutput(entopts) {
        const self = this;
        return new ApiDeleteWorkspaceOutputEntity_1.ApiDeleteWorkspaceOutputEntity(self, entopts);
    }
    // Entity access: `client.ApiDropboxOauth2GetTokensOutput().list()` / `client.ApiDropboxOauth2GetTokensOutput().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    ApiDropboxOauth2GetTokensOutput(entopts) {
        const self = this;
        return new ApiDropboxOauth2GetTokensOutputEntity_1.ApiDropboxOauth2GetTokensOutputEntity(self, entopts);
    }
    // Entity access: `client.ApiGenerateOauth2UrlOutput().list()` / `client.ApiGenerateOauth2UrlOutput().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    ApiGenerateOauth2UrlOutput(entopts) {
        const self = this;
        return new ApiGenerateOauth2UrlOutputEntity_1.ApiGenerateOauth2UrlOutputEntity(self, entopts);
    }
    // Entity access: `client.ApiGenerateScenarioSetOutput().list()` / `client.ApiGenerateScenarioSetOutput().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    ApiGenerateScenarioSetOutput(entopts) {
        const self = this;
        return new ApiGenerateScenarioSetOutputEntity_1.ApiGenerateScenarioSetOutputEntity(self, entopts);
    }
    // Entity access: `client.ApiGetAgentOutput().list()` / `client.ApiGetAgentOutput().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    ApiGetAgentOutput(entopts) {
        const self = this;
        return new ApiGetAgentOutputEntity_1.ApiGetAgentOutputEntity(self, entopts);
    }
    // Entity access: `client.ApiGetAgentUsageOutput().list()` / `client.ApiGetAgentUsageOutput().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    ApiGetAgentUsageOutput(entopts) {
        const self = this;
        return new ApiGetAgentUsageOutputEntity_1.ApiGetAgentUsageOutputEntity(self, entopts);
    }
    // Entity access: `client.ApiGetAnthropicApiKeyOutput().list()` / `client.ApiGetAnthropicApiKeyOutput().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    ApiGetAnthropicApiKeyOutput(entopts) {
        const self = this;
        return new ApiGetAnthropicApiKeyOutputEntity_1.ApiGetAnthropicApiKeyOutputEntity(self, entopts);
    }
    // Entity access: `client.ApiGetChildrenOutput().list()` / `client.ApiGetChildrenOutput().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    ApiGetChildrenOutput(entopts) {
        const self = this;
        return new ApiGetChildrenOutputEntity_1.ApiGetChildrenOutputEntity(self, entopts);
    }
    // Entity access: `client.ApiGetCustomModelOutputPublic().list()` / `client.ApiGetCustomModelOutputPublic().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    ApiGetCustomModelOutputPublic(entopts) {
        const self = this;
        return new ApiGetCustomModelOutputPublicEntity_1.ApiGetCustomModelOutputPublicEntity(self, entopts);
    }
    // Entity access: `client.ApiGetEvaluationDatasetDownloadUrlOutput().list()` / `client.ApiGetEvaluationDatasetDownloadUrlOutput().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    ApiGetEvaluationDatasetDownloadUrlOutput(entopts) {
        const self = this;
        return new ApiGetEvaluationDatasetDownloadUrlOutputEntity_1.ApiGetEvaluationDatasetDownloadUrlOutputEntity(self, entopts);
    }
    // Entity access: `client.ApiGetEvaluationRunOutput().list()` / `client.ApiGetEvaluationRunOutput().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    ApiGetEvaluationRunOutput(entopts) {
        const self = this;
        return new ApiGetEvaluationRunOutputEntity_1.ApiGetEvaluationRunOutputEntity(self, entopts);
    }
    // Entity access: `client.ApiGetEvaluationRunResultsOutput().list()` / `client.ApiGetEvaluationRunResultsOutput().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    ApiGetEvaluationRunResultsOutput(entopts) {
        const self = this;
        return new ApiGetEvaluationRunResultsOutputEntity_1.ApiGetEvaluationRunResultsOutputEntity(self, entopts);
    }
    // Entity access: `client.ApiGetEvaluationTestCaseOutput().list()` / `client.ApiGetEvaluationTestCaseOutput().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    ApiGetEvaluationTestCaseOutput(entopts) {
        const self = this;
        return new ApiGetEvaluationTestCaseOutputEntity_1.ApiGetEvaluationTestCaseOutputEntity(self, entopts);
    }
    // Entity access: `client.ApiGetIndexingJobDetailsSignedUrlOutput().list()` / `client.ApiGetIndexingJobDetailsSignedUrlOutput().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    ApiGetIndexingJobDetailsSignedUrlOutput(entopts) {
        const self = this;
        return new ApiGetIndexingJobDetailsSignedUrlOutputEntity_1.ApiGetIndexingJobDetailsSignedUrlOutputEntity(self, entopts);
    }
    // Entity access: `client.ApiGetKnowledgeBaseIndexingJobOutput().list()` / `client.ApiGetKnowledgeBaseIndexingJobOutput().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    ApiGetKnowledgeBaseIndexingJobOutput(entopts) {
        const self = this;
        return new ApiGetKnowledgeBaseIndexingJobOutputEntity_1.ApiGetKnowledgeBaseIndexingJobOutputEntity(self, entopts);
    }
    // Entity access: `client.ApiGetKnowledgeBaseOutput().list()` / `client.ApiGetKnowledgeBaseOutput().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    ApiGetKnowledgeBaseOutput(entopts) {
        const self = this;
        return new ApiGetKnowledgeBaseOutputEntity_1.ApiGetKnowledgeBaseOutputEntity(self, entopts);
    }
    // Entity access: `client.ApiGetModelEvaluationRunOutput().list()` / `client.ApiGetModelEvaluationRunOutput().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    ApiGetModelEvaluationRunOutput(entopts) {
        const self = this;
        return new ApiGetModelEvaluationRunOutputEntity_1.ApiGetModelEvaluationRunOutputEntity(self, entopts);
    }
    // Entity access: `client.ApiGetModelEvaluationRunResultsDownloadUrlOutput().list()` / `client.ApiGetModelEvaluationRunResultsDownloadUrlOutput().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    ApiGetModelEvaluationRunResultsDownloadUrlOutput(entopts) {
        const self = this;
        return new ApiGetModelEvaluationRunResultsDownloadUrlOutputEntity_1.ApiGetModelEvaluationRunResultsDownloadUrlOutputEntity(self, entopts);
    }
    // Entity access: `client.ApiGetModelRouterOutput().list()` / `client.ApiGetModelRouterOutput().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    ApiGetModelRouterOutput(entopts) {
        const self = this;
        return new ApiGetModelRouterOutputEntity_1.ApiGetModelRouterOutputEntity(self, entopts);
    }
    // Entity access: `client.ApiGetOpenAiapiKeyOutput().list()` / `client.ApiGetOpenAiapiKeyOutput().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    ApiGetOpenAiapiKeyOutput(entopts) {
        const self = this;
        return new ApiGetOpenAiapiKeyOutputEntity_1.ApiGetOpenAiapiKeyOutputEntity(self, entopts);
    }
    // Entity access: `client.ApiGetScenarioSetDownloadUrlOutput().list()` / `client.ApiGetScenarioSetDownloadUrlOutput().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    ApiGetScenarioSetDownloadUrlOutput(entopts) {
        const self = this;
        return new ApiGetScenarioSetDownloadUrlOutputEntity_1.ApiGetScenarioSetDownloadUrlOutputEntity(self, entopts);
    }
    // Entity access: `client.ApiGetScenarioSetOutput().list()` / `client.ApiGetScenarioSetOutput().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    ApiGetScenarioSetOutput(entopts) {
        const self = this;
        return new ApiGetScenarioSetOutputEntity_1.ApiGetScenarioSetOutputEntity(self, entopts);
    }
    // Entity access: `client.ApiGetScheduledIndexingOutput().list()` / `client.ApiGetScheduledIndexingOutput().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    ApiGetScheduledIndexingOutput(entopts) {
        const self = this;
        return new ApiGetScheduledIndexingOutputEntity_1.ApiGetScheduledIndexingOutputEntity(self, entopts);
    }
    // Entity access: `client.ApiGetSimulationJourneyTrajectoryUrlOutput().list()` / `client.ApiGetSimulationJourneyTrajectoryUrlOutput().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    ApiGetSimulationJourneyTrajectoryUrlOutput(entopts) {
        const self = this;
        return new ApiGetSimulationJourneyTrajectoryUrlOutputEntity_1.ApiGetSimulationJourneyTrajectoryUrlOutputEntity(self, entopts);
    }
    // Entity access: `client.ApiGetSimulationRunOutput().list()` / `client.ApiGetSimulationRunOutput().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    ApiGetSimulationRunOutput(entopts) {
        const self = this;
        return new ApiGetSimulationRunOutputEntity_1.ApiGetSimulationRunOutputEntity(self, entopts);
    }
    // Entity access: `client.ApiGetWorkspaceOutput().list()` / `client.ApiGetWorkspaceOutput().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    ApiGetWorkspaceOutput(entopts) {
        const self = this;
        return new ApiGetWorkspaceOutputEntity_1.ApiGetWorkspaceOutputEntity(self, entopts);
    }
    // Entity access: `client.ApiImportCustomModelOutputPublic().list()` / `client.ApiImportCustomModelOutputPublic().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    ApiImportCustomModelOutputPublic(entopts) {
        const self = this;
        return new ApiImportCustomModelOutputPublicEntity_1.ApiImportCustomModelOutputPublicEntity(self, entopts);
    }
    // Entity access: `client.ApiIndexedDataSource().list()` / `client.ApiIndexedDataSource().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    ApiIndexedDataSource(entopts) {
        const self = this;
        return new ApiIndexedDataSourceEntity_1.ApiIndexedDataSourceEntity(self, entopts);
    }
    // Entity access: `client.ApiLinkAgentFunctionOutput().list()` / `client.ApiLinkAgentFunctionOutput().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    ApiLinkAgentFunctionOutput(entopts) {
        const self = this;
        return new ApiLinkAgentFunctionOutputEntity_1.ApiLinkAgentFunctionOutputEntity(self, entopts);
    }
    // Entity access: `client.ApiLinkAgentGuardrailOutput().list()` / `client.ApiLinkAgentGuardrailOutput().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    ApiLinkAgentGuardrailOutput(entopts) {
        const self = this;
        return new ApiLinkAgentGuardrailOutputEntity_1.ApiLinkAgentGuardrailOutputEntity(self, entopts);
    }
    // Entity access: `client.ApiLinkAgentOutput().list()` / `client.ApiLinkAgentOutput().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    ApiLinkAgentOutput(entopts) {
        const self = this;
        return new ApiLinkAgentOutputEntity_1.ApiLinkAgentOutputEntity(self, entopts);
    }
    // Entity access: `client.ApiLinkKnowledgeBaseOutput().list()` / `client.ApiLinkKnowledgeBaseOutput().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    ApiLinkKnowledgeBaseOutput(entopts) {
        const self = this;
        return new ApiLinkKnowledgeBaseOutputEntity_1.ApiLinkKnowledgeBaseOutputEntity(self, entopts);
    }
    // Entity access: `client.ApiListAgentApiKeysOutput().list()` / `client.ApiListAgentApiKeysOutput().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    ApiListAgentApiKeysOutput(entopts) {
        const self = this;
        return new ApiListAgentApiKeysOutputEntity_1.ApiListAgentApiKeysOutputEntity(self, entopts);
    }
    // Entity access: `client.ApiListAgentsByAnthropicKeyOutput().list()` / `client.ApiListAgentsByAnthropicKeyOutput().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    ApiListAgentsByAnthropicKeyOutput(entopts) {
        const self = this;
        return new ApiListAgentsByAnthropicKeyOutputEntity_1.ApiListAgentsByAnthropicKeyOutputEntity(self, entopts);
    }
    // Entity access: `client.ApiListAgentsByOpenAiKeyOutput().list()` / `client.ApiListAgentsByOpenAiKeyOutput().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    ApiListAgentsByOpenAiKeyOutput(entopts) {
        const self = this;
        return new ApiListAgentsByOpenAiKeyOutputEntity_1.ApiListAgentsByOpenAiKeyOutputEntity(self, entopts);
    }
    // Entity access: `client.ApiListAgentsByWorkspaceOutput().list()` / `client.ApiListAgentsByWorkspaceOutput().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    ApiListAgentsByWorkspaceOutput(entopts) {
        const self = this;
        return new ApiListAgentsByWorkspaceOutputEntity_1.ApiListAgentsByWorkspaceOutputEntity(self, entopts);
    }
    // Entity access: `client.ApiListEvaluationMetricsOutput().list()` / `client.ApiListEvaluationMetricsOutput().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    ApiListEvaluationMetricsOutput(entopts) {
        const self = this;
        return new ApiListEvaluationMetricsOutputEntity_1.ApiListEvaluationMetricsOutputEntity(self, entopts);
    }
    // Entity access: `client.ApiListEvaluationRunsByTestCaseOutput().list()` / `client.ApiListEvaluationRunsByTestCaseOutput().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    ApiListEvaluationRunsByTestCaseOutput(entopts) {
        const self = this;
        return new ApiListEvaluationRunsByTestCaseOutputEntity_1.ApiListEvaluationRunsByTestCaseOutputEntity(self, entopts);
    }
    // Entity access: `client.ApiListEvaluationTestCasesByWorkspaceOutput().list()` / `client.ApiListEvaluationTestCasesByWorkspaceOutput().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    ApiListEvaluationTestCasesByWorkspaceOutput(entopts) {
        const self = this;
        return new ApiListEvaluationTestCasesByWorkspaceOutputEntity_1.ApiListEvaluationTestCasesByWorkspaceOutputEntity(self, entopts);
    }
    // Entity access: `client.ApiListKnowledgeBaseDataSourcesOutput().list()` / `client.ApiListKnowledgeBaseDataSourcesOutput().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    ApiListKnowledgeBaseDataSourcesOutput(entopts) {
        const self = this;
        return new ApiListKnowledgeBaseDataSourcesOutputEntity_1.ApiListKnowledgeBaseDataSourcesOutputEntity(self, entopts);
    }
    // Entity access: `client.ApiListKnowledgeBaseIndexingJobsOutput().list()` / `client.ApiListKnowledgeBaseIndexingJobsOutput().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    ApiListKnowledgeBaseIndexingJobsOutput(entopts) {
        const self = this;
        return new ApiListKnowledgeBaseIndexingJobsOutputEntity_1.ApiListKnowledgeBaseIndexingJobsOutputEntity(self, entopts);
    }
    // Entity access: `client.ApiListModelEvaluationMetricsOutput().list()` / `client.ApiListModelEvaluationMetricsOutput().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    ApiListModelEvaluationMetricsOutput(entopts) {
        const self = this;
        return new ApiListModelEvaluationMetricsOutputEntity_1.ApiListModelEvaluationMetricsOutputEntity(self, entopts);
    }
    // Entity access: `client.ApiListScenarioLibraryOutput().list()` / `client.ApiListScenarioLibraryOutput().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    ApiListScenarioLibraryOutput(entopts) {
        const self = this;
        return new ApiListScenarioLibraryOutputEntity_1.ApiListScenarioLibraryOutputEntity(self, entopts);
    }
    // Entity access: `client.ApiListScenariosOutput().list()` / `client.ApiListScenariosOutput().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    ApiListScenariosOutput(entopts) {
        const self = this;
        return new ApiListScenariosOutputEntity_1.ApiListScenariosOutputEntity(self, entopts);
    }
    // Entity access: `client.ApiListSimulationJourneysOutput().list()` / `client.ApiListSimulationJourneysOutput().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    ApiListSimulationJourneysOutput(entopts) {
        const self = this;
        return new ApiListSimulationJourneysOutputEntity_1.ApiListSimulationJourneysOutputEntity(self, entopts);
    }
    // Entity access: `client.ApiModelCatalogCard().list()` / `client.ApiModelCatalogCard().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    ApiModelCatalogCard(entopts) {
        const self = this;
        return new ApiModelCatalogCardEntity_1.ApiModelCatalogCardEntity(self, entopts);
    }
    // Entity access: `client.ApiModelEvaluationPreset().list()` / `client.ApiModelEvaluationPreset().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    ApiModelEvaluationPreset(entopts) {
        const self = this;
        return new ApiModelEvaluationPresetEntity_1.ApiModelEvaluationPresetEntity(self, entopts);
    }
    // Entity access: `client.ApiModelPublic().list()` / `client.ApiModelPublic().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    ApiModelPublic(entopts) {
        const self = this;
        return new ApiModelPublicEntity_1.ApiModelPublicEntity(self, entopts);
    }
    // Entity access: `client.ApiModelRouterPreset().list()` / `client.ApiModelRouterPreset().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    ApiModelRouterPreset(entopts) {
        const self = this;
        return new ApiModelRouterPresetEntity_1.ApiModelRouterPresetEntity(self, entopts);
    }
    // Entity access: `client.ApiModelRouterTaskPreset().list()` / `client.ApiModelRouterTaskPreset().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    ApiModelRouterTaskPreset(entopts) {
        const self = this;
        return new ApiModelRouterTaskPresetEntity_1.ApiModelRouterTaskPresetEntity(self, entopts);
    }
    // Entity access: `client.ApiMoveAgentsToWorkspaceOutput().list()` / `client.ApiMoveAgentsToWorkspaceOutput().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    ApiMoveAgentsToWorkspaceOutput(entopts) {
        const self = this;
        return new ApiMoveAgentsToWorkspaceOutputEntity_1.ApiMoveAgentsToWorkspaceOutputEntity(self, entopts);
    }
    // Entity access: `client.ApiPrompt().list()` / `client.ApiPrompt().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    ApiPrompt(entopts) {
        const self = this;
        return new ApiPromptEntity_1.ApiPromptEntity(self, entopts);
    }
    // Entity access: `client.ApiRollbackToAgentVersionOutput().list()` / `client.ApiRollbackToAgentVersionOutput().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    ApiRollbackToAgentVersionOutput(entopts) {
        const self = this;
        return new ApiRollbackToAgentVersionOutputEntity_1.ApiRollbackToAgentVersionOutputEntity(self, entopts);
    }
    // Entity access: `client.ApiSimulationJourney().list()` / `client.ApiSimulationJourney().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    ApiSimulationJourney(entopts) {
        const self = this;
        return new ApiSimulationJourneyEntity_1.ApiSimulationJourneyEntity(self, entopts);
    }
    // Entity access: `client.ApiSimulationTrajectory().list()` / `client.ApiSimulationTrajectory().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    ApiSimulationTrajectory(entopts) {
        const self = this;
        return new ApiSimulationTrajectoryEntity_1.ApiSimulationTrajectoryEntity(self, entopts);
    }
    // Entity access: `client.ApiUnlinkAgentFunctionOutput().list()` / `client.ApiUnlinkAgentFunctionOutput().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    ApiUnlinkAgentFunctionOutput(entopts) {
        const self = this;
        return new ApiUnlinkAgentFunctionOutputEntity_1.ApiUnlinkAgentFunctionOutputEntity(self, entopts);
    }
    // Entity access: `client.ApiUnlinkAgentGuardrailOutput().list()` / `client.ApiUnlinkAgentGuardrailOutput().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    ApiUnlinkAgentGuardrailOutput(entopts) {
        const self = this;
        return new ApiUnlinkAgentGuardrailOutputEntity_1.ApiUnlinkAgentGuardrailOutputEntity(self, entopts);
    }
    // Entity access: `client.ApiUnlinkAgentOutput().list()` / `client.ApiUnlinkAgentOutput().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    ApiUnlinkAgentOutput(entopts) {
        const self = this;
        return new ApiUnlinkAgentOutputEntity_1.ApiUnlinkAgentOutputEntity(self, entopts);
    }
    // Entity access: `client.ApiUnlinkKnowledgeBaseOutput().list()` / `client.ApiUnlinkKnowledgeBaseOutput().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    ApiUnlinkKnowledgeBaseOutput(entopts) {
        const self = this;
        return new ApiUnlinkKnowledgeBaseOutputEntity_1.ApiUnlinkKnowledgeBaseOutputEntity(self, entopts);
    }
    // Entity access: `client.ApiUpdateAgentApiKeyOutput().list()` / `client.ApiUpdateAgentApiKeyOutput().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    ApiUpdateAgentApiKeyOutput(entopts) {
        const self = this;
        return new ApiUpdateAgentApiKeyOutputEntity_1.ApiUpdateAgentApiKeyOutputEntity(self, entopts);
    }
    // Entity access: `client.ApiUpdateAgentFunctionOutput().list()` / `client.ApiUpdateAgentFunctionOutput().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    ApiUpdateAgentFunctionOutput(entopts) {
        const self = this;
        return new ApiUpdateAgentFunctionOutputEntity_1.ApiUpdateAgentFunctionOutputEntity(self, entopts);
    }
    // Entity access: `client.ApiUpdateAgentOutput().list()` / `client.ApiUpdateAgentOutput().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    ApiUpdateAgentOutput(entopts) {
        const self = this;
        return new ApiUpdateAgentOutputEntity_1.ApiUpdateAgentOutputEntity(self, entopts);
    }
    // Entity access: `client.ApiUpdateAnthropicApiKeyOutput().list()` / `client.ApiUpdateAnthropicApiKeyOutput().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    ApiUpdateAnthropicApiKeyOutput(entopts) {
        const self = this;
        return new ApiUpdateAnthropicApiKeyOutputEntity_1.ApiUpdateAnthropicApiKeyOutputEntity(self, entopts);
    }
    // Entity access: `client.ApiUpdateCustomEvaluationMetricOutput().list()` / `client.ApiUpdateCustomEvaluationMetricOutput().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    ApiUpdateCustomEvaluationMetricOutput(entopts) {
        const self = this;
        return new ApiUpdateCustomEvaluationMetricOutputEntity_1.ApiUpdateCustomEvaluationMetricOutputEntity(self, entopts);
    }
    // Entity access: `client.ApiUpdateEvaluationTestCaseOutput().list()` / `client.ApiUpdateEvaluationTestCaseOutput().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    ApiUpdateEvaluationTestCaseOutput(entopts) {
        const self = this;
        return new ApiUpdateEvaluationTestCaseOutputEntity_1.ApiUpdateEvaluationTestCaseOutputEntity(self, entopts);
    }
    // Entity access: `client.ApiUpdateKnowledgeBaseDataSourceOutput().list()` / `client.ApiUpdateKnowledgeBaseDataSourceOutput().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    ApiUpdateKnowledgeBaseDataSourceOutput(entopts) {
        const self = this;
        return new ApiUpdateKnowledgeBaseDataSourceOutputEntity_1.ApiUpdateKnowledgeBaseDataSourceOutputEntity(self, entopts);
    }
    // Entity access: `client.ApiUpdateKnowledgeBaseOutput().list()` / `client.ApiUpdateKnowledgeBaseOutput().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    ApiUpdateKnowledgeBaseOutput(entopts) {
        const self = this;
        return new ApiUpdateKnowledgeBaseOutputEntity_1.ApiUpdateKnowledgeBaseOutputEntity(self, entopts);
    }
    // Entity access: `client.ApiUpdateLinkedAgentOutput().list()` / `client.ApiUpdateLinkedAgentOutput().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    ApiUpdateLinkedAgentOutput(entopts) {
        const self = this;
        return new ApiUpdateLinkedAgentOutputEntity_1.ApiUpdateLinkedAgentOutputEntity(self, entopts);
    }
    // Entity access: `client.ApiUpdateModelApiKeyOutput().list()` / `client.ApiUpdateModelApiKeyOutput().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    ApiUpdateModelApiKeyOutput(entopts) {
        const self = this;
        return new ApiUpdateModelApiKeyOutputEntity_1.ApiUpdateModelApiKeyOutputEntity(self, entopts);
    }
    // Entity access: `client.ApiUpdateModelEvaluationRunOutput().list()` / `client.ApiUpdateModelEvaluationRunOutput().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    ApiUpdateModelEvaluationRunOutput(entopts) {
        const self = this;
        return new ApiUpdateModelEvaluationRunOutputEntity_1.ApiUpdateModelEvaluationRunOutputEntity(self, entopts);
    }
    // Entity access: `client.ApiUpdateModelRouterOutput().list()` / `client.ApiUpdateModelRouterOutput().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    ApiUpdateModelRouterOutput(entopts) {
        const self = this;
        return new ApiUpdateModelRouterOutputEntity_1.ApiUpdateModelRouterOutputEntity(self, entopts);
    }
    // Entity access: `client.ApiUpdateOpenAiapiKeyOutput().list()` / `client.ApiUpdateOpenAiapiKeyOutput().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    ApiUpdateOpenAiapiKeyOutput(entopts) {
        const self = this;
        return new ApiUpdateOpenAiapiKeyOutputEntity_1.ApiUpdateOpenAiapiKeyOutputEntity(self, entopts);
    }
    // Entity access: `client.ApiUpdateScenarioSetOutput().list()` / `client.ApiUpdateScenarioSetOutput().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    ApiUpdateScenarioSetOutput(entopts) {
        const self = this;
        return new ApiUpdateScenarioSetOutputEntity_1.ApiUpdateScenarioSetOutputEntity(self, entopts);
    }
    // Entity access: `client.ApiUpdateSimulationRunOutput().list()` / `client.ApiUpdateSimulationRunOutput().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    ApiUpdateSimulationRunOutput(entopts) {
        const self = this;
        return new ApiUpdateSimulationRunOutputEntity_1.ApiUpdateSimulationRunOutputEntity(self, entopts);
    }
    // Entity access: `client.ApiUpdateWorkspaceOutput().list()` / `client.ApiUpdateWorkspaceOutput().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    ApiUpdateWorkspaceOutput(entopts) {
        const self = this;
        return new ApiUpdateWorkspaceOutputEntity_1.ApiUpdateWorkspaceOutputEntity(self, entopts);
    }
    // Entity access: `client.App().list()` / `client.App().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    App(entopts) {
        const self = this;
        return new AppEntity_1.AppEntity(self, entopts);
    }
    // Entity access: `client.AppAlert().list()` / `client.AppAlert().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    AppAlert(entopts) {
        const self = this;
        return new AppAlertEntity_1.AppAlertEntity(self, entopts);
    }
    // Entity access: `client.AppEvent().list()` / `client.AppEvent().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    AppEvent(entopts) {
        const self = this;
        return new AppEventEntity_1.AppEventEntity(self, entopts);
    }
    // Entity access: `client.AppHealth().list()` / `client.AppHealth().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    AppHealth(entopts) {
        const self = this;
        return new AppHealthEntity_1.AppHealthEntity(self, entopts);
    }
    // Entity access: `client.AppInstance().list()` / `client.AppInstance().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    AppInstance(entopts) {
        const self = this;
        return new AppInstanceEntity_1.AppInstanceEntity(self, entopts);
    }
    // Entity access: `client.AppJobInvocation().list()` / `client.AppJobInvocation().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    AppJobInvocation(entopts) {
        const self = this;
        return new AppJobInvocationEntity_1.AppJobInvocationEntity(self, entopts);
    }
    // Entity access: `client.AppMetricsBandwidthUsage().list()` / `client.AppMetricsBandwidthUsage().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    AppMetricsBandwidthUsage(entopts) {
        const self = this;
        return new AppMetricsBandwidthUsageEntity_1.AppMetricsBandwidthUsageEntity(self, entopts);
    }
    // Entity access: `client.AppPropose().list()` / `client.AppPropose().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    AppPropose(entopts) {
        const self = this;
        return new AppProposeEntity_1.AppProposeEntity(self, entopts);
    }
    // Entity access: `client.AppsDeployment().list()` / `client.AppsDeployment().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    AppsDeployment(entopts) {
        const self = this;
        return new AppsDeploymentEntity_1.AppsDeploymentEntity(self, entopts);
    }
    // Entity access: `client.AppsGetExec().list()` / `client.AppsGetExec().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    AppsGetExec(entopts) {
        const self = this;
        return new AppsGetExecEntity_1.AppsGetExecEntity(self, entopts);
    }
    // Entity access: `client.AppsGetLog().list()` / `client.AppsGetLog().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    AppsGetLog(entopts) {
        const self = this;
        return new AppsGetLogEntity_1.AppsGetLogEntity(self, entopts);
    }
    // Entity access: `client.AppsInstanceSize().list()` / `client.AppsInstanceSize().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    AppsInstanceSize(entopts) {
        const self = this;
        return new AppsInstanceSizeEntity_1.AppsInstanceSizeEntity(self, entopts);
    }
    // Entity access: `client.AppsRegion().list()` / `client.AppsRegion().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    AppsRegion(entopts) {
        const self = this;
        return new AppsRegionEntity_1.AppsRegionEntity(self, entopts);
    }
    // Entity access: `client.AssociatedKubernetesResource().list()` / `client.AssociatedKubernetesResource().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    AssociatedKubernetesResource(entopts) {
        const self = this;
        return new AssociatedKubernetesResourceEntity_1.AssociatedKubernetesResourceEntity(self, entopts);
    }
    // Entity access: `client.AssociatedResourceStatus().list()` / `client.AssociatedResourceStatus().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    AssociatedResourceStatus(entopts) {
        const self = this;
        return new AssociatedResourceStatusEntity_1.AssociatedResourceStatusEntity(self, entopts);
    }
    // Entity access: `client.AsyncInvoke().list()` / `client.AsyncInvoke().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    AsyncInvoke(entopts) {
        const self = this;
        return new AsyncInvokeEntity_1.AsyncInvokeEntity(self, entopts);
    }
    // Entity access: `client.Balance().list()` / `client.Balance().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Balance(entopts) {
        const self = this;
        return new BalanceEntity_1.BalanceEntity(self, entopts);
    }
    // Entity access: `client.Batch().list()` / `client.Batch().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Batch(entopts) {
        const self = this;
        return new BatchEntity_1.BatchEntity(self, entopts);
    }
    // Entity access: `client.BatchFileCreate().list()` / `client.BatchFileCreate().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    BatchFileCreate(entopts) {
        const self = this;
        return new BatchFileCreateEntity_1.BatchFileCreateEntity(self, entopts);
    }
    // Entity access: `client.BatchInference().list()` / `client.BatchInference().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    BatchInference(entopts) {
        const self = this;
        return new BatchInferenceEntity_1.BatchInferenceEntity(self, entopts);
    }
    // Entity access: `client.BatchResult().list()` / `client.BatchResult().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    BatchResult(entopts) {
        const self = this;
        return new BatchResultEntity_1.BatchResultEntity(self, entopts);
    }
    // Entity access: `client.Billing().list()` / `client.Billing().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Billing(entopts) {
        const self = this;
        return new BillingEntity_1.BillingEntity(self, entopts);
    }
    // Entity access: `client.BlockStorage().list()` / `client.BlockStorage().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    BlockStorage(entopts) {
        const self = this;
        return new BlockStorageEntity_1.BlockStorageEntity(self, entopts);
    }
    // Entity access: `client.BlockStorageAction().list()` / `client.BlockStorageAction().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    BlockStorageAction(entopts) {
        const self = this;
        return new BlockStorageActionEntity_1.BlockStorageActionEntity(self, entopts);
    }
    // Entity access: `client.ByoipPrefix().list()` / `client.ByoipPrefix().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    ByoipPrefix(entopts) {
        const self = this;
        return new ByoipPrefixEntity_1.ByoipPrefixEntity(self, entopts);
    }
    // Entity access: `client.CdnEndpoint().list()` / `client.CdnEndpoint().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    CdnEndpoint(entopts) {
        const self = this;
        return new CdnEndpointEntity_1.CdnEndpointEntity(self, entopts);
    }
    // Entity access: `client.Certificate().list()` / `client.Certificate().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Certificate(entopts) {
        const self = this;
        return new CertificateEntity_1.CertificateEntity(self, entopts);
    }
    // Entity access: `client.ChatCompletion().list()` / `client.ChatCompletion().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    ChatCompletion(entopts) {
        const self = this;
        return new ChatCompletionEntity_1.ChatCompletionEntity(self, entopts);
    }
    // Entity access: `client.Clusterlint().list()` / `client.Clusterlint().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Clusterlint(entopts) {
        const self = this;
        return new ClusterlintEntity_1.ClusterlintEntity(self, entopts);
    }
    // Entity access: `client.Connection().list()` / `client.Connection().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Connection(entopts) {
        const self = this;
        return new ConnectionEntity_1.ConnectionEntity(self, entopts);
    }
    // Entity access: `client.ConnectionPool().list()` / `client.ConnectionPool().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    ConnectionPool(entopts) {
        const self = this;
        return new ConnectionPoolEntity_1.ConnectionPoolEntity(self, entopts);
    }
    // Entity access: `client.ContainerRegistry().list()` / `client.ContainerRegistry().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    ContainerRegistry(entopts) {
        const self = this;
        return new ContainerRegistryEntity_1.ContainerRegistryEntity(self, entopts);
    }
    // Entity access: `client.CreateResponse().list()` / `client.CreateResponse().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    CreateResponse(entopts) {
        const self = this;
        return new CreateResponseEntity_1.CreateResponseEntity(self, entopts);
    }
    // Entity access: `client.Credential().list()` / `client.Credential().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Credential(entopts) {
        const self = this;
        return new CredentialEntity_1.CredentialEntity(self, entopts);
    }
    // Entity access: `client.Database().list()` / `client.Database().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Database(entopts) {
        const self = this;
        return new DatabaseEntity_1.DatabaseEntity(self, entopts);
    }
    // Entity access: `client.DedicatedInference().list()` / `client.DedicatedInference().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    DedicatedInference(entopts) {
        const self = this;
        return new DedicatedInferenceEntity_1.DedicatedInferenceEntity(self, entopts);
    }
    // Entity access: `client.DedicatedInferenceAccelerator().list()` / `client.DedicatedInferenceAccelerator().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    DedicatedInferenceAccelerator(entopts) {
        const self = this;
        return new DedicatedInferenceAcceleratorEntity_1.DedicatedInferenceAcceleratorEntity(self, entopts);
    }
    // Entity access: `client.DedicatedInferenceGpuModelConfig().list()` / `client.DedicatedInferenceGpuModelConfig().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    DedicatedInferenceGpuModelConfig(entopts) {
        const self = this;
        return new DedicatedInferenceGpuModelConfigEntity_1.DedicatedInferenceGpuModelConfigEntity(self, entopts);
    }
    // Entity access: `client.DedicatedInferenceSize().list()` / `client.DedicatedInferenceSize().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    DedicatedInferenceSize(entopts) {
        const self = this;
        return new DedicatedInferenceSizeEntity_1.DedicatedInferenceSizeEntity(self, entopts);
    }
    // Entity access: `client.DockerCredential().list()` / `client.DockerCredential().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    DockerCredential(entopts) {
        const self = this;
        return new DockerCredentialEntity_1.DockerCredentialEntity(self, entopts);
    }
    // Entity access: `client.Domain().list()` / `client.Domain().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Domain(entopts) {
        const self = this;
        return new DomainEntity_1.DomainEntity(self, entopts);
    }
    // Entity access: `client.DomainRecord().list()` / `client.DomainRecord().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    DomainRecord(entopts) {
        const self = this;
        return new DomainRecordEntity_1.DomainRecordEntity(self, entopts);
    }
    // Entity access: `client.Droplet().list()` / `client.Droplet().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Droplet(entopts) {
        const self = this;
        return new DropletEntity_1.DropletEntity(self, entopts);
    }
    // Entity access: `client.DropletAction().list()` / `client.DropletAction().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    DropletAction(entopts) {
        const self = this;
        return new DropletActionEntity_1.DropletActionEntity(self, entopts);
    }
    // Entity access: `client.DropletAutoscalePool().list()` / `client.DropletAutoscalePool().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    DropletAutoscalePool(entopts) {
        const self = this;
        return new DropletAutoscalePoolEntity_1.DropletAutoscalePoolEntity(self, entopts);
    }
    // Entity access: `client.Embedding().list()` / `client.Embedding().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Embedding(entopts) {
        const self = this;
        return new EmbeddingEntity_1.EmbeddingEntity(self, entopts);
    }
    // Entity access: `client.Empty().list()` / `client.Empty().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Empty(entopts) {
        const self = this;
        return new EmptyEntity_1.EmptyEntity(self, entopts);
    }
    // Entity access: `client.Firewall().list()` / `client.Firewall().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Firewall(entopts) {
        const self = this;
        return new FirewallEntity_1.FirewallEntity(self, entopts);
    }
    // Entity access: `client.FloatingIp().list()` / `client.FloatingIp().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    FloatingIp(entopts) {
        const self = this;
        return new FloatingIpEntity_1.FloatingIpEntity(self, entopts);
    }
    // Entity access: `client.FloatingIpAction().list()` / `client.FloatingIpAction().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    FloatingIpAction(entopts) {
        const self = this;
        return new FloatingIpActionEntity_1.FloatingIpActionEntity(self, entopts);
    }
    // Entity access: `client.Function().list()` / `client.Function().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Function(entopts) {
        const self = this;
        return new FunctionEntity_1.FunctionEntity(self, entopts);
    }
    // Entity access: `client.GenaiapiRegion().list()` / `client.GenaiapiRegion().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    GenaiapiRegion(entopts) {
        const self = this;
        return new GenaiapiRegionEntity_1.GenaiapiRegionEntity(self, entopts);
    }
    // Entity access: `client.Image().list()` / `client.Image().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Image(entopts) {
        const self = this;
        return new ImageEntity_1.ImageEntity(self, entopts);
    }
    // Entity access: `client.ImageAction().list()` / `client.ImageAction().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    ImageAction(entopts) {
        const self = this;
        return new ImageActionEntity_1.ImageActionEntity(self, entopts);
    }
    // Entity access: `client.Insight().list()` / `client.Insight().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Insight(entopts) {
        const self = this;
        return new InsightEntity_1.InsightEntity(self, entopts);
    }
    // Entity access: `client.InvoiceSummary().list()` / `client.InvoiceSummary().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    InvoiceSummary(entopts) {
        const self = this;
        return new InvoiceSummaryEntity_1.InvoiceSummaryEntity(self, entopts);
    }
    // Entity access: `client.Kubernete().list()` / `client.Kubernete().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Kubernete(entopts) {
        const self = this;
        return new KuberneteEntity_1.KuberneteEntity(self, entopts);
    }
    // Entity access: `client.KubernetesOption().list()` / `client.KubernetesOption().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    KubernetesOption(entopts) {
        const self = this;
        return new KubernetesOptionEntity_1.KubernetesOptionEntity(self, entopts);
    }
    // Entity access: `client.ListMcpServerTool().list()` / `client.ListMcpServerTool().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    ListMcpServerTool(entopts) {
        const self = this;
        return new ListMcpServerToolEntity_1.ListMcpServerToolEntity(self, entopts);
    }
    // Entity access: `client.ListProvider().list()` / `client.ListProvider().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    ListProvider(entopts) {
        const self = this;
        return new ListProviderEntity_1.ListProviderEntity(self, entopts);
    }
    // Entity access: `client.ListProviderHealth().list()` / `client.ListProviderHealth().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    ListProviderHealth(entopts) {
        const self = this;
        return new ListProviderHealthEntity_1.ListProviderHealthEntity(self, entopts);
    }
    // Entity access: `client.ListTool().list()` / `client.ListTool().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    ListTool(entopts) {
        const self = this;
        return new ListToolEntity_1.ListToolEntity(self, entopts);
    }
    // Entity access: `client.ListToolHealth().list()` / `client.ListToolHealth().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    ListToolHealth(entopts) {
        const self = this;
        return new ListToolHealthEntity_1.ListToolHealthEntity(self, entopts);
    }
    // Entity access: `client.ListToolbeltProvider().list()` / `client.ListToolbeltProvider().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    ListToolbeltProvider(entopts) {
        const self = this;
        return new ListToolbeltProviderEntity_1.ListToolbeltProviderEntity(self, entopts);
    }
    // Entity access: `client.ListToolkit().list()` / `client.ListToolkit().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    ListToolkit(entopts) {
        const self = this;
        return new ListToolkitEntity_1.ListToolkitEntity(self, entopts);
    }
    // Entity access: `client.LoadBalancer().list()` / `client.LoadBalancer().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    LoadBalancer(entopts) {
        const self = this;
        return new LoadBalancerEntity_1.LoadBalancerEntity(self, entopts);
    }
    // Entity access: `client.LogsSearch().list()` / `client.LogsSearch().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    LogsSearch(entopts) {
        const self = this;
        return new LogsSearchEntity_1.LogsSearchEntity(self, entopts);
    }
    // Entity access: `client.Logsink().list()` / `client.Logsink().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Logsink(entopts) {
        const self = this;
        return new LogsinkEntity_1.LogsinkEntity(self, entopts);
    }
    // Entity access: `client.McpServer().list()` / `client.McpServer().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    McpServer(entopts) {
        const self = this;
        return new McpServerEntity_1.McpServerEntity(self, entopts);
    }
    // Entity access: `client.Message().list()` / `client.Message().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Message(entopts) {
        const self = this;
        return new MessageEntity_1.MessageEntity(self, entopts);
    }
    // Entity access: `client.Metric().list()` / `client.Metric().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Metric(entopts) {
        const self = this;
        return new MetricEntity_1.MetricEntity(self, entopts);
    }
    // Entity access: `client.Model().list()` / `client.Model().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Model(entopts) {
        const self = this;
        return new ModelEntity_1.ModelEntity(self, entopts);
    }
    // Entity access: `client.Monitoring().list()` / `client.Monitoring().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Monitoring(entopts) {
        const self = this;
        return new MonitoringEntity_1.MonitoringEntity(self, entopts);
    }
    // Entity access: `client.N1Click().list()` / `client.N1Click().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    N1Click(entopts) {
        const self = this;
        return new N1ClickEntity_1.N1ClickEntity(self, entopts);
    }
    // Entity access: `client.N1ClickApplication().list()` / `client.N1ClickApplication().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    N1ClickApplication(entopts) {
        const self = this;
        return new N1ClickApplicationEntity_1.N1ClickApplicationEntity(self, entopts);
    }
    // Entity access: `client.NeighborId().list()` / `client.NeighborId().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    NeighborId(entopts) {
        const self = this;
        return new NeighborIdEntity_1.NeighborIdEntity(self, entopts);
    }
    // Entity access: `client.Nfs().list()` / `client.Nfs().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Nfs(entopts) {
        const self = this;
        return new NfsEntity_1.NfsEntity(self, entopts);
    }
    // Entity access: `client.NfsAction2().list()` / `client.NfsAction2().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    NfsAction2(entopts) {
        const self = this;
        return new NfsAction2Entity_1.NfsAction2Entity(self, entopts);
    }
    // Entity access: `client.NfsSnapshot().list()` / `client.NfsSnapshot().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    NfsSnapshot(entopts) {
        const self = this;
        return new NfsSnapshotEntity_1.NfsSnapshotEntity(self, entopts);
    }
    // Entity access: `client.OnlineMigration().list()` / `client.OnlineMigration().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    OnlineMigration(entopts) {
        const self = this;
        return new OnlineMigrationEntity_1.OnlineMigrationEntity(self, entopts);
    }
    // Entity access: `client.Option().list()` / `client.Option().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Option(entopts) {
        const self = this;
        return new OptionEntity_1.OptionEntity(self, entopts);
    }
    // Entity access: `client.Organization().list()` / `client.Organization().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Organization(entopts) {
        const self = this;
        return new OrganizationEntity_1.OrganizationEntity(self, entopts);
    }
    // Entity access: `client.OutputView().list()` / `client.OutputView().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    OutputView(entopts) {
        const self = this;
        return new OutputViewEntity_1.OutputViewEntity(self, entopts);
    }
    // Entity access: `client.PartnerNetworkConnect().list()` / `client.PartnerNetworkConnect().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    PartnerNetworkConnect(entopts) {
        const self = this;
        return new PartnerNetworkConnectEntity_1.PartnerNetworkConnectEntity(self, entopts);
    }
    // Entity access: `client.PrepaymentConfig().list()` / `client.PrepaymentConfig().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    PrepaymentConfig(entopts) {
        const self = this;
        return new PrepaymentConfigEntity_1.PrepaymentConfigEntity(self, entopts);
    }
    // Entity access: `client.PrepaymentStatus().list()` / `client.PrepaymentStatus().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    PrepaymentStatus(entopts) {
        const self = this;
        return new PrepaymentStatusEntity_1.PrepaymentStatusEntity(self, entopts);
    }
    // Entity access: `client.Project().list()` / `client.Project().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Project(entopts) {
        const self = this;
        return new ProjectEntity_1.ProjectEntity(self, entopts);
    }
    // Entity access: `client.ProjectResource().list()` / `client.ProjectResource().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    ProjectResource(entopts) {
        const self = this;
        return new ProjectResourceEntity_1.ProjectResourceEntity(self, entopts);
    }
    // Entity access: `client.PromQuery().list()` / `client.PromQuery().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    PromQuery(entopts) {
        const self = this;
        return new PromQueryEntity_1.PromQueryEntity(self, entopts);
    }
    // Entity access: `client.PromQueryRange().list()` / `client.PromQueryRange().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    PromQueryRange(entopts) {
        const self = this;
        return new PromQueryRangeEntity_1.PromQueryRangeEntity(self, entopts);
    }
    // Entity access: `client.PromSeries().list()` / `client.PromSeries().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    PromSeries(entopts) {
        const self = this;
        return new PromSeriesEntity_1.PromSeriesEntity(self, entopts);
    }
    // Entity access: `client.PromStringList().list()` / `client.PromStringList().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    PromStringList(entopts) {
        const self = this;
        return new PromStringListEntity_1.PromStringListEntity(self, entopts);
    }
    // Entity access: `client.Region().list()` / `client.Region().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Region(entopts) {
        const self = this;
        return new RegionEntity_1.RegionEntity(self, entopts);
    }
    // Entity access: `client.ReservedIPv6().list()` / `client.ReservedIPv6().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    ReservedIPv6(entopts) {
        const self = this;
        return new ReservedIPv6Entity_1.ReservedIPv6Entity(self, entopts);
    }
    // Entity access: `client.ReservedIPv6Action().list()` / `client.ReservedIPv6Action().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    ReservedIPv6Action(entopts) {
        const self = this;
        return new ReservedIPv6ActionEntity_1.ReservedIPv6ActionEntity(self, entopts);
    }
    // Entity access: `client.ReservedIp().list()` / `client.ReservedIp().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    ReservedIp(entopts) {
        const self = this;
        return new ReservedIpEntity_1.ReservedIpEntity(self, entopts);
    }
    // Entity access: `client.ReservedIpAction().list()` / `client.ReservedIpAction().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    ReservedIpAction(entopts) {
        const self = this;
        return new ReservedIpActionEntity_1.ReservedIpActionEntity(self, entopts);
    }
    // Entity access: `client.Resync().list()` / `client.Resync().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Resync(entopts) {
        const self = this;
        return new ResyncEntity_1.ResyncEntity(self, entopts);
    }
    // Entity access: `client.Search().list()` / `client.Search().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Search(entopts) {
        const self = this;
        return new SearchEntity_1.SearchEntity(self, entopts);
    }
    // Entity access: `client.Security().list()` / `client.Security().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Security(entopts) {
        const self = this;
        return new SecurityEntity_1.SecurityEntity(self, entopts);
    }
    // Entity access: `client.Setting().list()` / `client.Setting().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Setting(entopts) {
        const self = this;
        return new SettingEntity_1.SettingEntity(self, entopts);
    }
    // Entity access: `client.Size().list()` / `client.Size().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Size(entopts) {
        const self = this;
        return new SizeEntity_1.SizeEntity(self, entopts);
    }
    // Entity access: `client.Snapshot().list()` / `client.Snapshot().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Snapshot(entopts) {
        const self = this;
        return new SnapshotEntity_1.SnapshotEntity(self, entopts);
    }
    // Entity access: `client.SpacesKey().list()` / `client.SpacesKey().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    SpacesKey(entopts) {
        const self = this;
        return new SpacesKeyEntity_1.SpacesKeyEntity(self, entopts);
    }
    // Entity access: `client.SqlMode().list()` / `client.SqlMode().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    SqlMode(entopts) {
        const self = this;
        return new SqlModeEntity_1.SqlModeEntity(self, entopts);
    }
    // Entity access: `client.SshKey().list()` / `client.SshKey().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    SshKey(entopts) {
        const self = this;
        return new SshKeyEntity_1.SshKeyEntity(self, entopts);
    }
    // Entity access: `client.Systemone().list()` / `client.Systemone().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Systemone(entopts) {
        const self = this;
        return new SystemoneEntity_1.SystemoneEntity(self, entopts);
    }
    // Entity access: `client.Tag().list()` / `client.Tag().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Tag(entopts) {
        const self = this;
        return new TagEntity_1.TagEntity(self, entopts);
    }
    // Entity access: `client.Tool().list()` / `client.Tool().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Tool(entopts) {
        const self = this;
        return new ToolEntity_1.ToolEntity(self, entopts);
    }
    // Entity access: `client.Toolbelt().list()` / `client.Toolbelt().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Toolbelt(entopts) {
        const self = this;
        return new ToolbeltEntity_1.ToolbeltEntity(self, entopts);
    }
    // Entity access: `client.Uptime().list()` / `client.Uptime().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Uptime(entopts) {
        const self = this;
        return new UptimeEntity_1.UptimeEntity(self, entopts);
    }
    // Entity access: `client.User().list()` / `client.User().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    User(entopts) {
        const self = this;
        return new UserEntity_1.UserEntity(self, entopts);
    }
    // Entity access: `client.VectorDatabase().list()` / `client.VectorDatabase().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    VectorDatabase(entopts) {
        const self = this;
        return new VectorDatabaseEntity_1.VectorDatabaseEntity(self, entopts);
    }
    // Entity access: `client.VectordbBackup().list()` / `client.VectordbBackup().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    VectordbBackup(entopts) {
        const self = this;
        return new VectordbBackupEntity_1.VectordbBackupEntity(self, entopts);
    }
    // Entity access: `client.VectordbGetRestoreStatus().list()` / `client.VectordbGetRestoreStatus().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    VectordbGetRestoreStatus(entopts) {
        const self = this;
        return new VectordbGetRestoreStatusEntity_1.VectordbGetRestoreStatusEntity(self, entopts);
    }
    // Entity access: `client.VectordbGetVectorDb().list()` / `client.VectordbGetVectorDb().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    VectordbGetVectorDb(entopts) {
        const self = this;
        return new VectordbGetVectorDbEntity_1.VectordbGetVectorDbEntity(self, entopts);
    }
    // Entity access: `client.VectordbGetVectorDbAdminCredential().list()` / `client.VectordbGetVectorDbAdminCredential().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    VectordbGetVectorDbAdminCredential(entopts) {
        const self = this;
        return new VectordbGetVectorDbAdminCredentialEntity_1.VectordbGetVectorDbAdminCredentialEntity(self, entopts);
    }
    // Entity access: `client.VectordbRestoreBackup().list()` / `client.VectordbRestoreBackup().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    VectordbRestoreBackup(entopts) {
        const self = this;
        return new VectordbRestoreBackupEntity_1.VectordbRestoreBackupEntity(self, entopts);
    }
    // Entity access: `client.VectordbUpdateVectorDb().list()` / `client.VectordbUpdateVectorDb().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    VectordbUpdateVectorDb(entopts) {
        const self = this;
        return new VectordbUpdateVectorDbEntity_1.VectordbUpdateVectorDbEntity(self, entopts);
    }
    // Entity access: `client.VectordbUpdateVectorDbTag().list()` / `client.VectordbUpdateVectorDbTag().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    VectordbUpdateVectorDbTag(entopts) {
        const self = this;
        return new VectordbUpdateVectorDbTagEntity_1.VectordbUpdateVectorDbTagEntity(self, entopts);
    }
    // Entity access: `client.Vpc().list()` / `client.Vpc().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Vpc(entopts) {
        const self = this;
        return new VpcEntity_1.VpcEntity(self, entopts);
    }
    // Entity access: `client.VpcNatGateway().list()` / `client.VpcNatGateway().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    VpcNatGateway(entopts) {
        const self = this;
        return new VpcNatGatewayEntity_1.VpcNatGatewayEntity(self, entopts);
    }
    // Entity access: `client.VpcPeering().list()` / `client.VpcPeering().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    VpcPeering(entopts) {
        const self = this;
        return new VpcPeeringEntity_1.VpcPeeringEntity(self, entopts);
    }
    // Entity access: `client.VpcRoutesPublicPreview().list()` / `client.VpcRoutesPublicPreview().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    VpcRoutesPublicPreview(entopts) {
        const self = this;
        return new VpcRoutesPublicPreviewEntity_1.VpcRoutesPublicPreviewEntity(self, entopts);
    }
    // Entity access: `client.VpcSubnetsPublicPreview().list()` / `client.VpcSubnetsPublicPreview().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    VpcSubnetsPublicPreview(entopts) {
        const self = this;
        return new VpcSubnetsPublicPreviewEntity_1.VpcSubnetsPublicPreviewEntity(self, entopts);
    }
    static test(testoptsarg, sdkoptsarg) {
        const struct = stdutil.struct;
        const setpath = struct.setpath;
        const getdef = struct.getdef;
        const clone = struct.clone;
        const setprop = struct.setprop;
        const sdkopts = getdef(clone(sdkoptsarg), {});
        const testopts = getdef(clone(testoptsarg), {});
        setprop(testopts, 'active', true);
        setpath(sdkopts, 'feature.test', testopts);
        const testsdk = new DigitaloceanSDK(sdkopts);
        testsdk._mode = 'test';
        return testsdk;
    }
    tester(testopts, sdkopts) {
        return DigitaloceanSDK.test(testopts, sdkopts);
    }
    toJSON() {
        return { name: 'Digitalocean' };
    }
    toString() {
        return 'Digitalocean ' + this._utility.struct.jsonify(this.toJSON());
    }
    [node_util_1.inspect.custom]() {
        return this.toString();
    }
}
exports.DigitaloceanSDK = DigitaloceanSDK;
const SDK = DigitaloceanSDK;
exports.SDK = SDK;
//# sourceMappingURL=DigitaloceanSDK.js.map