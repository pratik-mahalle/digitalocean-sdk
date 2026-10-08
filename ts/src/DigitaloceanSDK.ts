// Digitalocean Ts SDK

import { AccessPointEntity } from './entity/AccessPointEntity'
import { AccountEntity } from './entity/AccountEntity'
import { ActionEntity } from './entity/ActionEntity'
import { ActorLimitEntity } from './entity/ActorLimitEntity'
import { AddOnEntity } from './entity/AddOnEntity'
import { ApiAgentVersionEntity } from './entity/ApiAgentVersionEntity'
import { ApiCreateAgentApiKeyOutputEntity } from './entity/ApiCreateAgentApiKeyOutputEntity'
import { ApiCreateDataSourceFileUploadPresignedUrlsOutputEntity } from './entity/ApiCreateDataSourceFileUploadPresignedUrlsOutputEntity'
import { ApiCreateKnowledgeBaseDataSourceOutputEntity } from './entity/ApiCreateKnowledgeBaseDataSourceOutputEntity'
import { ApiCreateScenarioSetFromLibraryOutputEntity } from './entity/ApiCreateScenarioSetFromLibraryOutputEntity'
import { ApiDeleteAgentApiKeyOutputEntity } from './entity/ApiDeleteAgentApiKeyOutputEntity'
import { ApiDeleteAgentOutputEntity } from './entity/ApiDeleteAgentOutputEntity'
import { ApiDeleteAnthropicApiKeyOutputEntity } from './entity/ApiDeleteAnthropicApiKeyOutputEntity'
import { ApiDeleteCustomEvaluationMetricOutputEntity } from './entity/ApiDeleteCustomEvaluationMetricOutputEntity'
import { ApiDeleteCustomModelOutputPublicEntity } from './entity/ApiDeleteCustomModelOutputPublicEntity'
import { ApiDeleteEvaluationDatasetOutputEntity } from './entity/ApiDeleteEvaluationDatasetOutputEntity'
import { ApiDeleteKnowledgeBaseDataSourceOutputEntity } from './entity/ApiDeleteKnowledgeBaseDataSourceOutputEntity'
import { ApiDeleteKnowledgeBaseOutputEntity } from './entity/ApiDeleteKnowledgeBaseOutputEntity'
import { ApiDeleteModelApiKeyOutputEntity } from './entity/ApiDeleteModelApiKeyOutputEntity'
import { ApiDeleteModelEvaluationPresetOutputEntity } from './entity/ApiDeleteModelEvaluationPresetOutputEntity'
import { ApiDeleteModelEvaluationRunOutputPublicEntity } from './entity/ApiDeleteModelEvaluationRunOutputPublicEntity'
import { ApiDeleteModelRouterOutputEntity } from './entity/ApiDeleteModelRouterOutputEntity'
import { ApiDeleteOpenAiapiKeyOutputEntity } from './entity/ApiDeleteOpenAiapiKeyOutputEntity'
import { ApiDeleteScenarioSetOutputEntity } from './entity/ApiDeleteScenarioSetOutputEntity'
import { ApiDeleteScheduledIndexingOutputEntity } from './entity/ApiDeleteScheduledIndexingOutputEntity'
import { ApiDeleteSimulationRunOutputEntity } from './entity/ApiDeleteSimulationRunOutputEntity'
import { ApiDeleteWorkspaceOutputEntity } from './entity/ApiDeleteWorkspaceOutputEntity'
import { ApiDropboxOauth2GetTokensOutputEntity } from './entity/ApiDropboxOauth2GetTokensOutputEntity'
import { ApiGenerateOauth2UrlOutputEntity } from './entity/ApiGenerateOauth2UrlOutputEntity'
import { ApiGenerateScenarioSetOutputEntity } from './entity/ApiGenerateScenarioSetOutputEntity'
import { ApiGetAgentOutputEntity } from './entity/ApiGetAgentOutputEntity'
import { ApiGetAgentUsageOutputEntity } from './entity/ApiGetAgentUsageOutputEntity'
import { ApiGetAnthropicApiKeyOutputEntity } from './entity/ApiGetAnthropicApiKeyOutputEntity'
import { ApiGetChildrenOutputEntity } from './entity/ApiGetChildrenOutputEntity'
import { ApiGetCustomModelOutputPublicEntity } from './entity/ApiGetCustomModelOutputPublicEntity'
import { ApiGetEvaluationDatasetDownloadUrlOutputEntity } from './entity/ApiGetEvaluationDatasetDownloadUrlOutputEntity'
import { ApiGetEvaluationRunOutputEntity } from './entity/ApiGetEvaluationRunOutputEntity'
import { ApiGetEvaluationRunResultsOutputEntity } from './entity/ApiGetEvaluationRunResultsOutputEntity'
import { ApiGetEvaluationTestCaseOutputEntity } from './entity/ApiGetEvaluationTestCaseOutputEntity'
import { ApiGetIndexingJobDetailsSignedUrlOutputEntity } from './entity/ApiGetIndexingJobDetailsSignedUrlOutputEntity'
import { ApiGetKnowledgeBaseIndexingJobOutputEntity } from './entity/ApiGetKnowledgeBaseIndexingJobOutputEntity'
import { ApiGetKnowledgeBaseOutputEntity } from './entity/ApiGetKnowledgeBaseOutputEntity'
import { ApiGetModelEvaluationRunOutputEntity } from './entity/ApiGetModelEvaluationRunOutputEntity'
import { ApiGetModelEvaluationRunResultsDownloadUrlOutputEntity } from './entity/ApiGetModelEvaluationRunResultsDownloadUrlOutputEntity'
import { ApiGetModelRouterOutputEntity } from './entity/ApiGetModelRouterOutputEntity'
import { ApiGetOpenAiapiKeyOutputEntity } from './entity/ApiGetOpenAiapiKeyOutputEntity'
import { ApiGetScenarioSetDownloadUrlOutputEntity } from './entity/ApiGetScenarioSetDownloadUrlOutputEntity'
import { ApiGetScenarioSetOutputEntity } from './entity/ApiGetScenarioSetOutputEntity'
import { ApiGetScheduledIndexingOutputEntity } from './entity/ApiGetScheduledIndexingOutputEntity'
import { ApiGetSimulationJourneyTrajectoryUrlOutputEntity } from './entity/ApiGetSimulationJourneyTrajectoryUrlOutputEntity'
import { ApiGetSimulationRunOutputEntity } from './entity/ApiGetSimulationRunOutputEntity'
import { ApiGetWorkspaceOutputEntity } from './entity/ApiGetWorkspaceOutputEntity'
import { ApiImportCustomModelOutputPublicEntity } from './entity/ApiImportCustomModelOutputPublicEntity'
import { ApiIndexedDataSourceEntity } from './entity/ApiIndexedDataSourceEntity'
import { ApiLinkAgentFunctionOutputEntity } from './entity/ApiLinkAgentFunctionOutputEntity'
import { ApiLinkAgentGuardrailOutputEntity } from './entity/ApiLinkAgentGuardrailOutputEntity'
import { ApiLinkAgentOutputEntity } from './entity/ApiLinkAgentOutputEntity'
import { ApiLinkKnowledgeBaseOutputEntity } from './entity/ApiLinkKnowledgeBaseOutputEntity'
import { ApiListAgentApiKeysOutputEntity } from './entity/ApiListAgentApiKeysOutputEntity'
import { ApiListAgentsByAnthropicKeyOutputEntity } from './entity/ApiListAgentsByAnthropicKeyOutputEntity'
import { ApiListAgentsByOpenAiKeyOutputEntity } from './entity/ApiListAgentsByOpenAiKeyOutputEntity'
import { ApiListAgentsByWorkspaceOutputEntity } from './entity/ApiListAgentsByWorkspaceOutputEntity'
import { ApiListEvaluationMetricsOutputEntity } from './entity/ApiListEvaluationMetricsOutputEntity'
import { ApiListEvaluationRunsByTestCaseOutputEntity } from './entity/ApiListEvaluationRunsByTestCaseOutputEntity'
import { ApiListEvaluationTestCasesByWorkspaceOutputEntity } from './entity/ApiListEvaluationTestCasesByWorkspaceOutputEntity'
import { ApiListKnowledgeBaseDataSourcesOutputEntity } from './entity/ApiListKnowledgeBaseDataSourcesOutputEntity'
import { ApiListKnowledgeBaseIndexingJobsOutputEntity } from './entity/ApiListKnowledgeBaseIndexingJobsOutputEntity'
import { ApiListModelEvaluationMetricsOutputEntity } from './entity/ApiListModelEvaluationMetricsOutputEntity'
import { ApiListScenarioLibraryOutputEntity } from './entity/ApiListScenarioLibraryOutputEntity'
import { ApiListScenariosOutputEntity } from './entity/ApiListScenariosOutputEntity'
import { ApiListSimulationJourneysOutputEntity } from './entity/ApiListSimulationJourneysOutputEntity'
import { ApiModelCatalogCardEntity } from './entity/ApiModelCatalogCardEntity'
import { ApiModelEvaluationPresetEntity } from './entity/ApiModelEvaluationPresetEntity'
import { ApiModelPublicEntity } from './entity/ApiModelPublicEntity'
import { ApiModelRouterPresetEntity } from './entity/ApiModelRouterPresetEntity'
import { ApiModelRouterTaskPresetEntity } from './entity/ApiModelRouterTaskPresetEntity'
import { ApiMoveAgentsToWorkspaceOutputEntity } from './entity/ApiMoveAgentsToWorkspaceOutputEntity'
import { ApiPromptEntity } from './entity/ApiPromptEntity'
import { ApiRollbackToAgentVersionOutputEntity } from './entity/ApiRollbackToAgentVersionOutputEntity'
import { ApiSimulationJourneyEntity } from './entity/ApiSimulationJourneyEntity'
import { ApiSimulationTrajectoryEntity } from './entity/ApiSimulationTrajectoryEntity'
import { ApiUnlinkAgentFunctionOutputEntity } from './entity/ApiUnlinkAgentFunctionOutputEntity'
import { ApiUnlinkAgentGuardrailOutputEntity } from './entity/ApiUnlinkAgentGuardrailOutputEntity'
import { ApiUnlinkAgentOutputEntity } from './entity/ApiUnlinkAgentOutputEntity'
import { ApiUnlinkKnowledgeBaseOutputEntity } from './entity/ApiUnlinkKnowledgeBaseOutputEntity'
import { ApiUpdateAgentApiKeyOutputEntity } from './entity/ApiUpdateAgentApiKeyOutputEntity'
import { ApiUpdateAgentFunctionOutputEntity } from './entity/ApiUpdateAgentFunctionOutputEntity'
import { ApiUpdateAgentOutputEntity } from './entity/ApiUpdateAgentOutputEntity'
import { ApiUpdateAnthropicApiKeyOutputEntity } from './entity/ApiUpdateAnthropicApiKeyOutputEntity'
import { ApiUpdateCustomEvaluationMetricOutputEntity } from './entity/ApiUpdateCustomEvaluationMetricOutputEntity'
import { ApiUpdateEvaluationTestCaseOutputEntity } from './entity/ApiUpdateEvaluationTestCaseOutputEntity'
import { ApiUpdateKnowledgeBaseDataSourceOutputEntity } from './entity/ApiUpdateKnowledgeBaseDataSourceOutputEntity'
import { ApiUpdateKnowledgeBaseOutputEntity } from './entity/ApiUpdateKnowledgeBaseOutputEntity'
import { ApiUpdateLinkedAgentOutputEntity } from './entity/ApiUpdateLinkedAgentOutputEntity'
import { ApiUpdateModelApiKeyOutputEntity } from './entity/ApiUpdateModelApiKeyOutputEntity'
import { ApiUpdateModelEvaluationRunOutputEntity } from './entity/ApiUpdateModelEvaluationRunOutputEntity'
import { ApiUpdateModelRouterOutputEntity } from './entity/ApiUpdateModelRouterOutputEntity'
import { ApiUpdateOpenAiapiKeyOutputEntity } from './entity/ApiUpdateOpenAiapiKeyOutputEntity'
import { ApiUpdateScenarioSetOutputEntity } from './entity/ApiUpdateScenarioSetOutputEntity'
import { ApiUpdateSimulationRunOutputEntity } from './entity/ApiUpdateSimulationRunOutputEntity'
import { ApiUpdateWorkspaceOutputEntity } from './entity/ApiUpdateWorkspaceOutputEntity'
import { AppEntity } from './entity/AppEntity'
import { AppAlertEntity } from './entity/AppAlertEntity'
import { AppEventEntity } from './entity/AppEventEntity'
import { AppHealthEntity } from './entity/AppHealthEntity'
import { AppInstanceEntity } from './entity/AppInstanceEntity'
import { AppJobInvocationEntity } from './entity/AppJobInvocationEntity'
import { AppMetricsBandwidthUsageEntity } from './entity/AppMetricsBandwidthUsageEntity'
import { AppProposeEntity } from './entity/AppProposeEntity'
import { AppsDeploymentEntity } from './entity/AppsDeploymentEntity'
import { AppsGetExecEntity } from './entity/AppsGetExecEntity'
import { AppsGetLogEntity } from './entity/AppsGetLogEntity'
import { AppsInstanceSizeEntity } from './entity/AppsInstanceSizeEntity'
import { AppsRegionEntity } from './entity/AppsRegionEntity'
import { AssociatedKubernetesResourceEntity } from './entity/AssociatedKubernetesResourceEntity'
import { AssociatedResourceStatusEntity } from './entity/AssociatedResourceStatusEntity'
import { AsyncInvokeEntity } from './entity/AsyncInvokeEntity'
import { BalanceEntity } from './entity/BalanceEntity'
import { BatchEntity } from './entity/BatchEntity'
import { BatchFileCreateEntity } from './entity/BatchFileCreateEntity'
import { BatchInferenceEntity } from './entity/BatchInferenceEntity'
import { BatchResultEntity } from './entity/BatchResultEntity'
import { BillingEntity } from './entity/BillingEntity'
import { BlockStorageEntity } from './entity/BlockStorageEntity'
import { BlockStorageActionEntity } from './entity/BlockStorageActionEntity'
import { ByoipPrefixEntity } from './entity/ByoipPrefixEntity'
import { CdnEndpointEntity } from './entity/CdnEndpointEntity'
import { CertificateEntity } from './entity/CertificateEntity'
import { ChatCompletionEntity } from './entity/ChatCompletionEntity'
import { ClusterlintEntity } from './entity/ClusterlintEntity'
import { ConnectionEntity } from './entity/ConnectionEntity'
import { ConnectionPoolEntity } from './entity/ConnectionPoolEntity'
import { ContainerRegistryEntity } from './entity/ContainerRegistryEntity'
import { CreateResponseEntity } from './entity/CreateResponseEntity'
import { CredentialEntity } from './entity/CredentialEntity'
import { DatabaseEntity } from './entity/DatabaseEntity'
import { DedicatedInferenceEntity } from './entity/DedicatedInferenceEntity'
import { DedicatedInferenceAcceleratorEntity } from './entity/DedicatedInferenceAcceleratorEntity'
import { DedicatedInferenceGpuModelConfigEntity } from './entity/DedicatedInferenceGpuModelConfigEntity'
import { DedicatedInferenceSizeEntity } from './entity/DedicatedInferenceSizeEntity'
import { DockerCredentialEntity } from './entity/DockerCredentialEntity'
import { DomainEntity } from './entity/DomainEntity'
import { DomainRecordEntity } from './entity/DomainRecordEntity'
import { DropletEntity } from './entity/DropletEntity'
import { DropletActionEntity } from './entity/DropletActionEntity'
import { DropletAutoscalePoolEntity } from './entity/DropletAutoscalePoolEntity'
import { EmbeddingEntity } from './entity/EmbeddingEntity'
import { EmptyEntity } from './entity/EmptyEntity'
import { FirewallEntity } from './entity/FirewallEntity'
import { FloatingIpEntity } from './entity/FloatingIpEntity'
import { FloatingIpActionEntity } from './entity/FloatingIpActionEntity'
import { FunctionEntity } from './entity/FunctionEntity'
import { GenaiapiRegionEntity } from './entity/GenaiapiRegionEntity'
import { ImageEntity } from './entity/ImageEntity'
import { ImageActionEntity } from './entity/ImageActionEntity'
import { InsightEntity } from './entity/InsightEntity'
import { InvoiceSummaryEntity } from './entity/InvoiceSummaryEntity'
import { KuberneteEntity } from './entity/KuberneteEntity'
import { KubernetesOptionEntity } from './entity/KubernetesOptionEntity'
import { ListMcpServerToolEntity } from './entity/ListMcpServerToolEntity'
import { ListProviderEntity } from './entity/ListProviderEntity'
import { ListProviderHealthEntity } from './entity/ListProviderHealthEntity'
import { ListToolEntity } from './entity/ListToolEntity'
import { ListToolHealthEntity } from './entity/ListToolHealthEntity'
import { ListToolbeltProviderEntity } from './entity/ListToolbeltProviderEntity'
import { ListToolkitEntity } from './entity/ListToolkitEntity'
import { LoadBalancerEntity } from './entity/LoadBalancerEntity'
import { LogsSearchEntity } from './entity/LogsSearchEntity'
import { LogsinkEntity } from './entity/LogsinkEntity'
import { McpServerEntity } from './entity/McpServerEntity'
import { MessageEntity } from './entity/MessageEntity'
import { MetricEntity } from './entity/MetricEntity'
import { ModelEntity } from './entity/ModelEntity'
import { MonitoringEntity } from './entity/MonitoringEntity'
import { N1ClickEntity } from './entity/N1ClickEntity'
import { N1ClickApplicationEntity } from './entity/N1ClickApplicationEntity'
import { NeighborIdEntity } from './entity/NeighborIdEntity'
import { NfsEntity } from './entity/NfsEntity'
import { NfsAction2Entity } from './entity/NfsAction2Entity'
import { NfsSnapshotEntity } from './entity/NfsSnapshotEntity'
import { OnlineMigrationEntity } from './entity/OnlineMigrationEntity'
import { OptionEntity } from './entity/OptionEntity'
import { OrganizationEntity } from './entity/OrganizationEntity'
import { OutputViewEntity } from './entity/OutputViewEntity'
import { PartnerNetworkConnectEntity } from './entity/PartnerNetworkConnectEntity'
import { PrepaymentConfigEntity } from './entity/PrepaymentConfigEntity'
import { PrepaymentStatusEntity } from './entity/PrepaymentStatusEntity'
import { ProjectEntity } from './entity/ProjectEntity'
import { ProjectResourceEntity } from './entity/ProjectResourceEntity'
import { PromQueryEntity } from './entity/PromQueryEntity'
import { PromQueryRangeEntity } from './entity/PromQueryRangeEntity'
import { PromSeriesEntity } from './entity/PromSeriesEntity'
import { PromStringListEntity } from './entity/PromStringListEntity'
import { RegionEntity } from './entity/RegionEntity'
import { ReservedIPv6Entity } from './entity/ReservedIPv6Entity'
import { ReservedIPv6ActionEntity } from './entity/ReservedIPv6ActionEntity'
import { ReservedIpEntity } from './entity/ReservedIpEntity'
import { ReservedIpActionEntity } from './entity/ReservedIpActionEntity'
import { ResyncEntity } from './entity/ResyncEntity'
import { SearchEntity } from './entity/SearchEntity'
import { SecurityEntity } from './entity/SecurityEntity'
import { SettingEntity } from './entity/SettingEntity'
import { SizeEntity } from './entity/SizeEntity'
import { SnapshotEntity } from './entity/SnapshotEntity'
import { SpacesKeyEntity } from './entity/SpacesKeyEntity'
import { SqlModeEntity } from './entity/SqlModeEntity'
import { SshKeyEntity } from './entity/SshKeyEntity'
import { SystemoneEntity } from './entity/SystemoneEntity'
import { TagEntity } from './entity/TagEntity'
import { ToolEntity } from './entity/ToolEntity'
import { ToolbeltEntity } from './entity/ToolbeltEntity'
import { UptimeEntity } from './entity/UptimeEntity'
import { UserEntity } from './entity/UserEntity'
import { VectorDatabaseEntity } from './entity/VectorDatabaseEntity'
import { VectordbBackupEntity } from './entity/VectordbBackupEntity'
import { VectordbGetRestoreStatusEntity } from './entity/VectordbGetRestoreStatusEntity'
import { VectordbGetVectorDbEntity } from './entity/VectordbGetVectorDbEntity'
import { VectordbGetVectorDbAdminCredentialEntity } from './entity/VectordbGetVectorDbAdminCredentialEntity'
import { VectordbRestoreBackupEntity } from './entity/VectordbRestoreBackupEntity'
import { VectordbUpdateVectorDbEntity } from './entity/VectordbUpdateVectorDbEntity'
import { VectordbUpdateVectorDbTagEntity } from './entity/VectordbUpdateVectorDbTagEntity'
import { VpcEntity } from './entity/VpcEntity'
import { VpcNatGatewayEntity } from './entity/VpcNatGatewayEntity'
import { VpcPeeringEntity } from './entity/VpcPeeringEntity'
import { VpcRoutesPublicPreviewEntity } from './entity/VpcRoutesPublicPreviewEntity'
import { VpcSubnetsPublicPreviewEntity } from './entity/VpcSubnetsPublicPreviewEntity'

export type * from './DigitaloceanTypes'


import { inspect } from 'node:util'

import type { Context, Feature } from './types'

import { config } from './Config'
import { DigitaloceanEntityBase } from './DigitaloceanEntityBase'
import { Utility } from './utility/Utility'
import { unreadableBody } from './utility/ResultBodyUtility'
import { abortError } from './utility/MakeRequestUtility'
import { allowed } from './utility/PrepareMethodUtility'


import { BaseFeature } from './feature/base/BaseFeature'



const stdutil = new Utility()


// A request's outcome: ok is false alone on an error with no response, so a
// caller narrowing on it reaches the status and the data.
type DirectResult =
  | { ok: false, err: any, status?: undefined, headers?: undefined, data?: undefined }
  | { ok: boolean, status: number, headers: any, data: any, err?: any }


class DigitaloceanSDK {
  _mode: string = 'live'
  _options: any
  _utility = new Utility()
  _features: Feature[]
  _rootctx: Context
  

  constructor(options?: any) {

    this._rootctx = this._utility.makeContext({
      client: this,
      utility: this._utility,
      config,
      options,
      shared: new WeakMap()
    })

    this._options = this._utility.makeOptions(this._rootctx)

    for (const key of ['_options', '_rootctx', '_features']) {
      Object.defineProperty(this, key, {
        value: (this as any)[key], enumerable: false, writable: true, configurable: true
      })
    }

    const struct = this._utility.struct
    const getpath = struct.getpath

    if (true === getpath(this._options.feature, 'test.active')) {
      this._mode = 'test'
    }

    this._rootctx.options = this._options

    this._features = []

    const featureAdd = this._utility.featureAdd
    const featureInit = this._utility.featureInit

    // Add features in the resolved order (makeOptions puts an explicit
    // array order first, else defaults to test-first). Ordering matters:
    // the `test` feature installs the base mock transport and the transport
    // features (retry/cache/netsim/proxy/ratelimit) wrap whatever is current,
    // so `test` must be added before them to sit at the base of the chain.
    const extend = this._options.extend || []

    const featureorder = getpath(this._options, '__derived__.featureorder') || []
    for (const fname of featureorder) {
      const fopts = this._options.feature[fname] || {}
      if (fopts.active) {
        // An active name with no generated class is legal when an
        // extend-supplied instance carries that name (station's adopt
        // path): the instance is added below, positioned by its own
        // __after__ entry, so skip it here rather than fail construction.
        if (!this._rootctx.config.hasFeature(fname) &&
          extend.some((f: any) => fname === f.name)) {
          continue
        }
        featureAdd(this._rootctx, this._rootctx.config.makeFeature(fname))
      }
    }

    for (let f of extend) {
      featureAdd(this._rootctx, f)
    }

    for (let f of this._features) {
      featureInit(this._rootctx, f)
    }

    const featureHook = this._utility.featureHook
    featureHook(this._rootctx, 'PostConstruct')
  }


  options() {
    return this._utility.struct.clone(this._options)
  }


  utility() {
    return this._utility.struct.clone(this._utility)
  }

  


  async prepare(fetchargs?: any) {
    const utility = this._utility
    const struct = utility.struct
    const clone = struct.clone

    const {
      makeContext,
      makeFetchDef,
      prepareHeaders,
      prepareAuth,
    } = utility

    fetchargs = fetchargs || {}

    let ctx: Context = makeContext({
      opname: 'prepare',
      ctrl: fetchargs.ctrl || {},
    }, this._rootctx)

    const options = this._options
    const method = String(fetchargs.method || 'GET').toUpperCase()

    if (!allowed(options.allow.method, method)) {
      return ctx.error('spec_method_allow', 'Method "' + method +
        '" not allowed by SDK option allow.method value: "' + options.allow.method + '"')
    }

    const spec: any = {
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
    }

    ctx.spec = spec

    if (fetchargs.headers) {
      const uheaders = fetchargs.headers
      for (let key in uheaders) {
        spec.headers[key] = uheaders[key]
      }
    }

    

    const authResult = prepareAuth(ctx)
    if (authResult instanceof Error) {
      return authResult
    }

    return makeFetchDef(ctx)
  }


  // Raw endpoint access is operator-controllable, like every entity op.
  // Blocking it means denying BOTH the 'direct' and 'graphql' tokens, since
  // either one reaches the same endpoint.
  async direct(fetchargs?: any): Promise<DirectResult> {
    if (!allowed(this._options.allow.op, 'direct')) {
      return {
        ok: false,
        err: new Error('DigitaloceanSDK: direct: operation not allowed by' +
          ' SDK option allow.op value: "' + this._options.allow.op + '"'),
      }
    }

    return this._rawRequest(fetchargs)
  }


  // Ungated request path shared by direct() and graphql(), each of which
  // checks its own allow.op token first. Private, rather than a flag on
  // fetchargs: a caller-supplied marker would let anyone opt straight back
  // out of the gate by passing it.
  async _rawRequest(fetchargs?: any): Promise<DirectResult> {
    const utility = this._utility

    const fetcher = utility.fetcher
    const makeContext = utility.makeContext

    const fetchdef = await this.prepare(fetchargs)
    if (fetchdef instanceof Error) {
      return { ok: false, err: utility.clean(this._rootctx, fetchdef) }
    }

    let ctx: Context = makeContext({
      opname: 'direct',
      ctrl: (fetchargs || {}).ctrl || {},
    }, this._rootctx)

    try {
      if (true === fetchdef.signal?.aborted) {
        throw fetchdef.signal.reason
      }

      const fetched = await fetcher(ctx, fetchdef.url, fetchdef)

      if (null == fetched) {
        return { ok: false, err: ctx.error('direct_no_response', 'response: undefined') }
      }
      else if (fetched instanceof Error) {
        return { ok: false, err: utility.clean(ctx, abortError(ctx, fetched)) }
      }

      const status = fetched.status

      // No body responses (204 No Content, 304 Not Modified) and explicit
      // zero content-length must skip JSON parsing — fetched.json() would
      // throw `Unexpected end of JSON input` on an empty body.
      const headers = fetched.headers
      const contentLength = headers && 'function' === typeof headers.get
        ? headers.get('content-length')
        : (headers || {})['content-length']
      const noBody = 204 === status || 304 === status || '0' === String(contentLength)

      let json: any = undefined
      let err: any = undefined
      if (!noBody) {
        let text: any = undefined
        try {
          const raw: any = fetched
          if ('function' === typeof raw.text) {
            text = await raw.text()
            json = '' === text.trim() ? undefined : JSON.parse(text)
          }
          else {
            json = 'function' === typeof fetched.json ? await fetched.json() : fetched.json
          }
        }
        catch (parseErr: any) {
          if ('SyntaxError' !== parseErr?.name) {
            throw parseErr
          }
          err = unreadableBody(ctx, {
            status, headers, text: text ?? parseErr.text, sent: fetchdef.headers,
            failed: 200 <= status && status < 300 ? undefined :
              ctx.error('request_status', 'request: ' + status + ': ' + fetched.statusText),
          })
        }
      }

      return {
        ok: null == err && status >= 200 && status < 300,
        status,
        headers: fetched.headers,
        data: json,
        ...(null == err ? {} : { err: utility.clean(ctx, err) }),
      }
    }
    catch (err: any) {
      return { ok: false, err: utility.clean(ctx, abortError(ctx, err)) }
    }
  }



  async graphql(query: string, variables?: any, ctrl?: any) {
    const options = this._options

    if (!allowed(options.allow.op, 'graphql')) {
      return {
        ok: false,
        err: new Error('DigitaloceanSDK: graphql: operation not allowed by' +
          ' SDK option allow.op value: "' + options.allow.op + '"'),
      }
    }

    const res: any = await this._rawRequest({
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: { query, variables: variables || {} },
      ctrl,
    })

    // Errors are read BEFORE any status check: a GraphQL parse or validation
    // failure comes back as HTTP 400 carrying the standard { errors: [...] }
    // body, and the raw path represents a non-2xx as { ok: false } with no
    // err — so returning early on status would discard the server's own
    // diagnostics, which are the only useful part of that response.
    const errors = null == res.data ? undefined : res.data.errors

    if (null != errors && Array.isArray(errors) && 0 < errors.length) {
      const first = errors[0] || {}
      const err: any = new Error('DigitaloceanSDK: graphql: ' +
        (first.message || 'graphql error'))
      err.graphql = errors
      return { ok: false, status: res.status, headers: res.headers, err, data: res.data }
    }

    return res
  }



  // Entity access: `client.AccessPoint().list()` / `client.AccessPoint().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  AccessPoint(entopts?: Record<string, any>) {
    const self = this
    return new AccessPointEntity(self, entopts)
  }


  // Entity access: `client.Account().list()` / `client.Account().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  Account(entopts?: Record<string, any>) {
    const self = this
    return new AccountEntity(self, entopts)
  }


  // Entity access: `client.Action().list()` / `client.Action().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  Action(entopts?: Record<string, any>) {
    const self = this
    return new ActionEntity(self, entopts)
  }


  // Entity access: `client.ActorLimit().list()` / `client.ActorLimit().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  ActorLimit(entopts?: Record<string, any>) {
    const self = this
    return new ActorLimitEntity(self, entopts)
  }


  // Entity access: `client.AddOn().list()` / `client.AddOn().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  AddOn(entopts?: Record<string, any>) {
    const self = this
    return new AddOnEntity(self, entopts)
  }


  // Entity access: `client.ApiAgentVersion().list()` / `client.ApiAgentVersion().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  ApiAgentVersion(entopts?: Record<string, any>) {
    const self = this
    return new ApiAgentVersionEntity(self, entopts)
  }


  // Entity access: `client.ApiCreateAgentApiKeyOutput().list()` / `client.ApiCreateAgentApiKeyOutput().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  ApiCreateAgentApiKeyOutput(entopts?: Record<string, any>) {
    const self = this
    return new ApiCreateAgentApiKeyOutputEntity(self, entopts)
  }


  // Entity access: `client.ApiCreateDataSourceFileUploadPresignedUrlsOutput().list()` / `client.ApiCreateDataSourceFileUploadPresignedUrlsOutput().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  ApiCreateDataSourceFileUploadPresignedUrlsOutput(entopts?: Record<string, any>) {
    const self = this
    return new ApiCreateDataSourceFileUploadPresignedUrlsOutputEntity(self, entopts)
  }


  // Entity access: `client.ApiCreateKnowledgeBaseDataSourceOutput().list()` / `client.ApiCreateKnowledgeBaseDataSourceOutput().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  ApiCreateKnowledgeBaseDataSourceOutput(entopts?: Record<string, any>) {
    const self = this
    return new ApiCreateKnowledgeBaseDataSourceOutputEntity(self, entopts)
  }


  // Entity access: `client.ApiCreateScenarioSetFromLibraryOutput().list()` / `client.ApiCreateScenarioSetFromLibraryOutput().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  ApiCreateScenarioSetFromLibraryOutput(entopts?: Record<string, any>) {
    const self = this
    return new ApiCreateScenarioSetFromLibraryOutputEntity(self, entopts)
  }


  // Entity access: `client.ApiDeleteAgentApiKeyOutput().list()` / `client.ApiDeleteAgentApiKeyOutput().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  ApiDeleteAgentApiKeyOutput(entopts?: Record<string, any>) {
    const self = this
    return new ApiDeleteAgentApiKeyOutputEntity(self, entopts)
  }


  // Entity access: `client.ApiDeleteAgentOutput().list()` / `client.ApiDeleteAgentOutput().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  ApiDeleteAgentOutput(entopts?: Record<string, any>) {
    const self = this
    return new ApiDeleteAgentOutputEntity(self, entopts)
  }


  // Entity access: `client.ApiDeleteAnthropicApiKeyOutput().list()` / `client.ApiDeleteAnthropicApiKeyOutput().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  ApiDeleteAnthropicApiKeyOutput(entopts?: Record<string, any>) {
    const self = this
    return new ApiDeleteAnthropicApiKeyOutputEntity(self, entopts)
  }


  // Entity access: `client.ApiDeleteCustomEvaluationMetricOutput().list()` / `client.ApiDeleteCustomEvaluationMetricOutput().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  ApiDeleteCustomEvaluationMetricOutput(entopts?: Record<string, any>) {
    const self = this
    return new ApiDeleteCustomEvaluationMetricOutputEntity(self, entopts)
  }


  // Entity access: `client.ApiDeleteCustomModelOutputPublic().list()` / `client.ApiDeleteCustomModelOutputPublic().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  ApiDeleteCustomModelOutputPublic(entopts?: Record<string, any>) {
    const self = this
    return new ApiDeleteCustomModelOutputPublicEntity(self, entopts)
  }


  // Entity access: `client.ApiDeleteEvaluationDatasetOutput().list()` / `client.ApiDeleteEvaluationDatasetOutput().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  ApiDeleteEvaluationDatasetOutput(entopts?: Record<string, any>) {
    const self = this
    return new ApiDeleteEvaluationDatasetOutputEntity(self, entopts)
  }


  // Entity access: `client.ApiDeleteKnowledgeBaseDataSourceOutput().list()` / `client.ApiDeleteKnowledgeBaseDataSourceOutput().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  ApiDeleteKnowledgeBaseDataSourceOutput(entopts?: Record<string, any>) {
    const self = this
    return new ApiDeleteKnowledgeBaseDataSourceOutputEntity(self, entopts)
  }


  // Entity access: `client.ApiDeleteKnowledgeBaseOutput().list()` / `client.ApiDeleteKnowledgeBaseOutput().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  ApiDeleteKnowledgeBaseOutput(entopts?: Record<string, any>) {
    const self = this
    return new ApiDeleteKnowledgeBaseOutputEntity(self, entopts)
  }


  // Entity access: `client.ApiDeleteModelApiKeyOutput().list()` / `client.ApiDeleteModelApiKeyOutput().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  ApiDeleteModelApiKeyOutput(entopts?: Record<string, any>) {
    const self = this
    return new ApiDeleteModelApiKeyOutputEntity(self, entopts)
  }


  // Entity access: `client.ApiDeleteModelEvaluationPresetOutput().list()` / `client.ApiDeleteModelEvaluationPresetOutput().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  ApiDeleteModelEvaluationPresetOutput(entopts?: Record<string, any>) {
    const self = this
    return new ApiDeleteModelEvaluationPresetOutputEntity(self, entopts)
  }


  // Entity access: `client.ApiDeleteModelEvaluationRunOutputPublic().list()` / `client.ApiDeleteModelEvaluationRunOutputPublic().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  ApiDeleteModelEvaluationRunOutputPublic(entopts?: Record<string, any>) {
    const self = this
    return new ApiDeleteModelEvaluationRunOutputPublicEntity(self, entopts)
  }


  // Entity access: `client.ApiDeleteModelRouterOutput().list()` / `client.ApiDeleteModelRouterOutput().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  ApiDeleteModelRouterOutput(entopts?: Record<string, any>) {
    const self = this
    return new ApiDeleteModelRouterOutputEntity(self, entopts)
  }


  // Entity access: `client.ApiDeleteOpenAiapiKeyOutput().list()` / `client.ApiDeleteOpenAiapiKeyOutput().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  ApiDeleteOpenAiapiKeyOutput(entopts?: Record<string, any>) {
    const self = this
    return new ApiDeleteOpenAiapiKeyOutputEntity(self, entopts)
  }


  // Entity access: `client.ApiDeleteScenarioSetOutput().list()` / `client.ApiDeleteScenarioSetOutput().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  ApiDeleteScenarioSetOutput(entopts?: Record<string, any>) {
    const self = this
    return new ApiDeleteScenarioSetOutputEntity(self, entopts)
  }


  // Entity access: `client.ApiDeleteScheduledIndexingOutput().list()` / `client.ApiDeleteScheduledIndexingOutput().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  ApiDeleteScheduledIndexingOutput(entopts?: Record<string, any>) {
    const self = this
    return new ApiDeleteScheduledIndexingOutputEntity(self, entopts)
  }


  // Entity access: `client.ApiDeleteSimulationRunOutput().list()` / `client.ApiDeleteSimulationRunOutput().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  ApiDeleteSimulationRunOutput(entopts?: Record<string, any>) {
    const self = this
    return new ApiDeleteSimulationRunOutputEntity(self, entopts)
  }


  // Entity access: `client.ApiDeleteWorkspaceOutput().list()` / `client.ApiDeleteWorkspaceOutput().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  ApiDeleteWorkspaceOutput(entopts?: Record<string, any>) {
    const self = this
    return new ApiDeleteWorkspaceOutputEntity(self, entopts)
  }


  // Entity access: `client.ApiDropboxOauth2GetTokensOutput().list()` / `client.ApiDropboxOauth2GetTokensOutput().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  ApiDropboxOauth2GetTokensOutput(entopts?: Record<string, any>) {
    const self = this
    return new ApiDropboxOauth2GetTokensOutputEntity(self, entopts)
  }


  // Entity access: `client.ApiGenerateOauth2UrlOutput().list()` / `client.ApiGenerateOauth2UrlOutput().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  ApiGenerateOauth2UrlOutput(entopts?: Record<string, any>) {
    const self = this
    return new ApiGenerateOauth2UrlOutputEntity(self, entopts)
  }


  // Entity access: `client.ApiGenerateScenarioSetOutput().list()` / `client.ApiGenerateScenarioSetOutput().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  ApiGenerateScenarioSetOutput(entopts?: Record<string, any>) {
    const self = this
    return new ApiGenerateScenarioSetOutputEntity(self, entopts)
  }


  // Entity access: `client.ApiGetAgentOutput().list()` / `client.ApiGetAgentOutput().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  ApiGetAgentOutput(entopts?: Record<string, any>) {
    const self = this
    return new ApiGetAgentOutputEntity(self, entopts)
  }


  // Entity access: `client.ApiGetAgentUsageOutput().list()` / `client.ApiGetAgentUsageOutput().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  ApiGetAgentUsageOutput(entopts?: Record<string, any>) {
    const self = this
    return new ApiGetAgentUsageOutputEntity(self, entopts)
  }


  // Entity access: `client.ApiGetAnthropicApiKeyOutput().list()` / `client.ApiGetAnthropicApiKeyOutput().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  ApiGetAnthropicApiKeyOutput(entopts?: Record<string, any>) {
    const self = this
    return new ApiGetAnthropicApiKeyOutputEntity(self, entopts)
  }


  // Entity access: `client.ApiGetChildrenOutput().list()` / `client.ApiGetChildrenOutput().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  ApiGetChildrenOutput(entopts?: Record<string, any>) {
    const self = this
    return new ApiGetChildrenOutputEntity(self, entopts)
  }


  // Entity access: `client.ApiGetCustomModelOutputPublic().list()` / `client.ApiGetCustomModelOutputPublic().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  ApiGetCustomModelOutputPublic(entopts?: Record<string, any>) {
    const self = this
    return new ApiGetCustomModelOutputPublicEntity(self, entopts)
  }


  // Entity access: `client.ApiGetEvaluationDatasetDownloadUrlOutput().list()` / `client.ApiGetEvaluationDatasetDownloadUrlOutput().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  ApiGetEvaluationDatasetDownloadUrlOutput(entopts?: Record<string, any>) {
    const self = this
    return new ApiGetEvaluationDatasetDownloadUrlOutputEntity(self, entopts)
  }


  // Entity access: `client.ApiGetEvaluationRunOutput().list()` / `client.ApiGetEvaluationRunOutput().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  ApiGetEvaluationRunOutput(entopts?: Record<string, any>) {
    const self = this
    return new ApiGetEvaluationRunOutputEntity(self, entopts)
  }


  // Entity access: `client.ApiGetEvaluationRunResultsOutput().list()` / `client.ApiGetEvaluationRunResultsOutput().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  ApiGetEvaluationRunResultsOutput(entopts?: Record<string, any>) {
    const self = this
    return new ApiGetEvaluationRunResultsOutputEntity(self, entopts)
  }


  // Entity access: `client.ApiGetEvaluationTestCaseOutput().list()` / `client.ApiGetEvaluationTestCaseOutput().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  ApiGetEvaluationTestCaseOutput(entopts?: Record<string, any>) {
    const self = this
    return new ApiGetEvaluationTestCaseOutputEntity(self, entopts)
  }


  // Entity access: `client.ApiGetIndexingJobDetailsSignedUrlOutput().list()` / `client.ApiGetIndexingJobDetailsSignedUrlOutput().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  ApiGetIndexingJobDetailsSignedUrlOutput(entopts?: Record<string, any>) {
    const self = this
    return new ApiGetIndexingJobDetailsSignedUrlOutputEntity(self, entopts)
  }


  // Entity access: `client.ApiGetKnowledgeBaseIndexingJobOutput().list()` / `client.ApiGetKnowledgeBaseIndexingJobOutput().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  ApiGetKnowledgeBaseIndexingJobOutput(entopts?: Record<string, any>) {
    const self = this
    return new ApiGetKnowledgeBaseIndexingJobOutputEntity(self, entopts)
  }


  // Entity access: `client.ApiGetKnowledgeBaseOutput().list()` / `client.ApiGetKnowledgeBaseOutput().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  ApiGetKnowledgeBaseOutput(entopts?: Record<string, any>) {
    const self = this
    return new ApiGetKnowledgeBaseOutputEntity(self, entopts)
  }


  // Entity access: `client.ApiGetModelEvaluationRunOutput().list()` / `client.ApiGetModelEvaluationRunOutput().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  ApiGetModelEvaluationRunOutput(entopts?: Record<string, any>) {
    const self = this
    return new ApiGetModelEvaluationRunOutputEntity(self, entopts)
  }


  // Entity access: `client.ApiGetModelEvaluationRunResultsDownloadUrlOutput().list()` / `client.ApiGetModelEvaluationRunResultsDownloadUrlOutput().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  ApiGetModelEvaluationRunResultsDownloadUrlOutput(entopts?: Record<string, any>) {
    const self = this
    return new ApiGetModelEvaluationRunResultsDownloadUrlOutputEntity(self, entopts)
  }


  // Entity access: `client.ApiGetModelRouterOutput().list()` / `client.ApiGetModelRouterOutput().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  ApiGetModelRouterOutput(entopts?: Record<string, any>) {
    const self = this
    return new ApiGetModelRouterOutputEntity(self, entopts)
  }


  // Entity access: `client.ApiGetOpenAiapiKeyOutput().list()` / `client.ApiGetOpenAiapiKeyOutput().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  ApiGetOpenAiapiKeyOutput(entopts?: Record<string, any>) {
    const self = this
    return new ApiGetOpenAiapiKeyOutputEntity(self, entopts)
  }


  // Entity access: `client.ApiGetScenarioSetDownloadUrlOutput().list()` / `client.ApiGetScenarioSetDownloadUrlOutput().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  ApiGetScenarioSetDownloadUrlOutput(entopts?: Record<string, any>) {
    const self = this
    return new ApiGetScenarioSetDownloadUrlOutputEntity(self, entopts)
  }


  // Entity access: `client.ApiGetScenarioSetOutput().list()` / `client.ApiGetScenarioSetOutput().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  ApiGetScenarioSetOutput(entopts?: Record<string, any>) {
    const self = this
    return new ApiGetScenarioSetOutputEntity(self, entopts)
  }


  // Entity access: `client.ApiGetScheduledIndexingOutput().list()` / `client.ApiGetScheduledIndexingOutput().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  ApiGetScheduledIndexingOutput(entopts?: Record<string, any>) {
    const self = this
    return new ApiGetScheduledIndexingOutputEntity(self, entopts)
  }


  // Entity access: `client.ApiGetSimulationJourneyTrajectoryUrlOutput().list()` / `client.ApiGetSimulationJourneyTrajectoryUrlOutput().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  ApiGetSimulationJourneyTrajectoryUrlOutput(entopts?: Record<string, any>) {
    const self = this
    return new ApiGetSimulationJourneyTrajectoryUrlOutputEntity(self, entopts)
  }


  // Entity access: `client.ApiGetSimulationRunOutput().list()` / `client.ApiGetSimulationRunOutput().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  ApiGetSimulationRunOutput(entopts?: Record<string, any>) {
    const self = this
    return new ApiGetSimulationRunOutputEntity(self, entopts)
  }


  // Entity access: `client.ApiGetWorkspaceOutput().list()` / `client.ApiGetWorkspaceOutput().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  ApiGetWorkspaceOutput(entopts?: Record<string, any>) {
    const self = this
    return new ApiGetWorkspaceOutputEntity(self, entopts)
  }


  // Entity access: `client.ApiImportCustomModelOutputPublic().list()` / `client.ApiImportCustomModelOutputPublic().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  ApiImportCustomModelOutputPublic(entopts?: Record<string, any>) {
    const self = this
    return new ApiImportCustomModelOutputPublicEntity(self, entopts)
  }


  // Entity access: `client.ApiIndexedDataSource().list()` / `client.ApiIndexedDataSource().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  ApiIndexedDataSource(entopts?: Record<string, any>) {
    const self = this
    return new ApiIndexedDataSourceEntity(self, entopts)
  }


  // Entity access: `client.ApiLinkAgentFunctionOutput().list()` / `client.ApiLinkAgentFunctionOutput().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  ApiLinkAgentFunctionOutput(entopts?: Record<string, any>) {
    const self = this
    return new ApiLinkAgentFunctionOutputEntity(self, entopts)
  }


  // Entity access: `client.ApiLinkAgentGuardrailOutput().list()` / `client.ApiLinkAgentGuardrailOutput().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  ApiLinkAgentGuardrailOutput(entopts?: Record<string, any>) {
    const self = this
    return new ApiLinkAgentGuardrailOutputEntity(self, entopts)
  }


  // Entity access: `client.ApiLinkAgentOutput().list()` / `client.ApiLinkAgentOutput().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  ApiLinkAgentOutput(entopts?: Record<string, any>) {
    const self = this
    return new ApiLinkAgentOutputEntity(self, entopts)
  }


  // Entity access: `client.ApiLinkKnowledgeBaseOutput().list()` / `client.ApiLinkKnowledgeBaseOutput().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  ApiLinkKnowledgeBaseOutput(entopts?: Record<string, any>) {
    const self = this
    return new ApiLinkKnowledgeBaseOutputEntity(self, entopts)
  }


  // Entity access: `client.ApiListAgentApiKeysOutput().list()` / `client.ApiListAgentApiKeysOutput().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  ApiListAgentApiKeysOutput(entopts?: Record<string, any>) {
    const self = this
    return new ApiListAgentApiKeysOutputEntity(self, entopts)
  }


  // Entity access: `client.ApiListAgentsByAnthropicKeyOutput().list()` / `client.ApiListAgentsByAnthropicKeyOutput().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  ApiListAgentsByAnthropicKeyOutput(entopts?: Record<string, any>) {
    const self = this
    return new ApiListAgentsByAnthropicKeyOutputEntity(self, entopts)
  }


  // Entity access: `client.ApiListAgentsByOpenAiKeyOutput().list()` / `client.ApiListAgentsByOpenAiKeyOutput().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  ApiListAgentsByOpenAiKeyOutput(entopts?: Record<string, any>) {
    const self = this
    return new ApiListAgentsByOpenAiKeyOutputEntity(self, entopts)
  }


  // Entity access: `client.ApiListAgentsByWorkspaceOutput().list()` / `client.ApiListAgentsByWorkspaceOutput().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  ApiListAgentsByWorkspaceOutput(entopts?: Record<string, any>) {
    const self = this
    return new ApiListAgentsByWorkspaceOutputEntity(self, entopts)
  }


  // Entity access: `client.ApiListEvaluationMetricsOutput().list()` / `client.ApiListEvaluationMetricsOutput().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  ApiListEvaluationMetricsOutput(entopts?: Record<string, any>) {
    const self = this
    return new ApiListEvaluationMetricsOutputEntity(self, entopts)
  }


  // Entity access: `client.ApiListEvaluationRunsByTestCaseOutput().list()` / `client.ApiListEvaluationRunsByTestCaseOutput().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  ApiListEvaluationRunsByTestCaseOutput(entopts?: Record<string, any>) {
    const self = this
    return new ApiListEvaluationRunsByTestCaseOutputEntity(self, entopts)
  }


  // Entity access: `client.ApiListEvaluationTestCasesByWorkspaceOutput().list()` / `client.ApiListEvaluationTestCasesByWorkspaceOutput().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  ApiListEvaluationTestCasesByWorkspaceOutput(entopts?: Record<string, any>) {
    const self = this
    return new ApiListEvaluationTestCasesByWorkspaceOutputEntity(self, entopts)
  }


  // Entity access: `client.ApiListKnowledgeBaseDataSourcesOutput().list()` / `client.ApiListKnowledgeBaseDataSourcesOutput().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  ApiListKnowledgeBaseDataSourcesOutput(entopts?: Record<string, any>) {
    const self = this
    return new ApiListKnowledgeBaseDataSourcesOutputEntity(self, entopts)
  }


  // Entity access: `client.ApiListKnowledgeBaseIndexingJobsOutput().list()` / `client.ApiListKnowledgeBaseIndexingJobsOutput().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  ApiListKnowledgeBaseIndexingJobsOutput(entopts?: Record<string, any>) {
    const self = this
    return new ApiListKnowledgeBaseIndexingJobsOutputEntity(self, entopts)
  }


  // Entity access: `client.ApiListModelEvaluationMetricsOutput().list()` / `client.ApiListModelEvaluationMetricsOutput().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  ApiListModelEvaluationMetricsOutput(entopts?: Record<string, any>) {
    const self = this
    return new ApiListModelEvaluationMetricsOutputEntity(self, entopts)
  }


  // Entity access: `client.ApiListScenarioLibraryOutput().list()` / `client.ApiListScenarioLibraryOutput().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  ApiListScenarioLibraryOutput(entopts?: Record<string, any>) {
    const self = this
    return new ApiListScenarioLibraryOutputEntity(self, entopts)
  }


  // Entity access: `client.ApiListScenariosOutput().list()` / `client.ApiListScenariosOutput().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  ApiListScenariosOutput(entopts?: Record<string, any>) {
    const self = this
    return new ApiListScenariosOutputEntity(self, entopts)
  }


  // Entity access: `client.ApiListSimulationJourneysOutput().list()` / `client.ApiListSimulationJourneysOutput().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  ApiListSimulationJourneysOutput(entopts?: Record<string, any>) {
    const self = this
    return new ApiListSimulationJourneysOutputEntity(self, entopts)
  }


  // Entity access: `client.ApiModelCatalogCard().list()` / `client.ApiModelCatalogCard().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  ApiModelCatalogCard(entopts?: Record<string, any>) {
    const self = this
    return new ApiModelCatalogCardEntity(self, entopts)
  }


  // Entity access: `client.ApiModelEvaluationPreset().list()` / `client.ApiModelEvaluationPreset().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  ApiModelEvaluationPreset(entopts?: Record<string, any>) {
    const self = this
    return new ApiModelEvaluationPresetEntity(self, entopts)
  }


  // Entity access: `client.ApiModelPublic().list()` / `client.ApiModelPublic().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  ApiModelPublic(entopts?: Record<string, any>) {
    const self = this
    return new ApiModelPublicEntity(self, entopts)
  }


  // Entity access: `client.ApiModelRouterPreset().list()` / `client.ApiModelRouterPreset().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  ApiModelRouterPreset(entopts?: Record<string, any>) {
    const self = this
    return new ApiModelRouterPresetEntity(self, entopts)
  }


  // Entity access: `client.ApiModelRouterTaskPreset().list()` / `client.ApiModelRouterTaskPreset().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  ApiModelRouterTaskPreset(entopts?: Record<string, any>) {
    const self = this
    return new ApiModelRouterTaskPresetEntity(self, entopts)
  }


  // Entity access: `client.ApiMoveAgentsToWorkspaceOutput().list()` / `client.ApiMoveAgentsToWorkspaceOutput().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  ApiMoveAgentsToWorkspaceOutput(entopts?: Record<string, any>) {
    const self = this
    return new ApiMoveAgentsToWorkspaceOutputEntity(self, entopts)
  }


  // Entity access: `client.ApiPrompt().list()` / `client.ApiPrompt().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  ApiPrompt(entopts?: Record<string, any>) {
    const self = this
    return new ApiPromptEntity(self, entopts)
  }


  // Entity access: `client.ApiRollbackToAgentVersionOutput().list()` / `client.ApiRollbackToAgentVersionOutput().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  ApiRollbackToAgentVersionOutput(entopts?: Record<string, any>) {
    const self = this
    return new ApiRollbackToAgentVersionOutputEntity(self, entopts)
  }


  // Entity access: `client.ApiSimulationJourney().list()` / `client.ApiSimulationJourney().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  ApiSimulationJourney(entopts?: Record<string, any>) {
    const self = this
    return new ApiSimulationJourneyEntity(self, entopts)
  }


  // Entity access: `client.ApiSimulationTrajectory().list()` / `client.ApiSimulationTrajectory().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  ApiSimulationTrajectory(entopts?: Record<string, any>) {
    const self = this
    return new ApiSimulationTrajectoryEntity(self, entopts)
  }


  // Entity access: `client.ApiUnlinkAgentFunctionOutput().list()` / `client.ApiUnlinkAgentFunctionOutput().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  ApiUnlinkAgentFunctionOutput(entopts?: Record<string, any>) {
    const self = this
    return new ApiUnlinkAgentFunctionOutputEntity(self, entopts)
  }


  // Entity access: `client.ApiUnlinkAgentGuardrailOutput().list()` / `client.ApiUnlinkAgentGuardrailOutput().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  ApiUnlinkAgentGuardrailOutput(entopts?: Record<string, any>) {
    const self = this
    return new ApiUnlinkAgentGuardrailOutputEntity(self, entopts)
  }


  // Entity access: `client.ApiUnlinkAgentOutput().list()` / `client.ApiUnlinkAgentOutput().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  ApiUnlinkAgentOutput(entopts?: Record<string, any>) {
    const self = this
    return new ApiUnlinkAgentOutputEntity(self, entopts)
  }


  // Entity access: `client.ApiUnlinkKnowledgeBaseOutput().list()` / `client.ApiUnlinkKnowledgeBaseOutput().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  ApiUnlinkKnowledgeBaseOutput(entopts?: Record<string, any>) {
    const self = this
    return new ApiUnlinkKnowledgeBaseOutputEntity(self, entopts)
  }


  // Entity access: `client.ApiUpdateAgentApiKeyOutput().list()` / `client.ApiUpdateAgentApiKeyOutput().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  ApiUpdateAgentApiKeyOutput(entopts?: Record<string, any>) {
    const self = this
    return new ApiUpdateAgentApiKeyOutputEntity(self, entopts)
  }


  // Entity access: `client.ApiUpdateAgentFunctionOutput().list()` / `client.ApiUpdateAgentFunctionOutput().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  ApiUpdateAgentFunctionOutput(entopts?: Record<string, any>) {
    const self = this
    return new ApiUpdateAgentFunctionOutputEntity(self, entopts)
  }


  // Entity access: `client.ApiUpdateAgentOutput().list()` / `client.ApiUpdateAgentOutput().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  ApiUpdateAgentOutput(entopts?: Record<string, any>) {
    const self = this
    return new ApiUpdateAgentOutputEntity(self, entopts)
  }


  // Entity access: `client.ApiUpdateAnthropicApiKeyOutput().list()` / `client.ApiUpdateAnthropicApiKeyOutput().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  ApiUpdateAnthropicApiKeyOutput(entopts?: Record<string, any>) {
    const self = this
    return new ApiUpdateAnthropicApiKeyOutputEntity(self, entopts)
  }


  // Entity access: `client.ApiUpdateCustomEvaluationMetricOutput().list()` / `client.ApiUpdateCustomEvaluationMetricOutput().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  ApiUpdateCustomEvaluationMetricOutput(entopts?: Record<string, any>) {
    const self = this
    return new ApiUpdateCustomEvaluationMetricOutputEntity(self, entopts)
  }


  // Entity access: `client.ApiUpdateEvaluationTestCaseOutput().list()` / `client.ApiUpdateEvaluationTestCaseOutput().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  ApiUpdateEvaluationTestCaseOutput(entopts?: Record<string, any>) {
    const self = this
    return new ApiUpdateEvaluationTestCaseOutputEntity(self, entopts)
  }


  // Entity access: `client.ApiUpdateKnowledgeBaseDataSourceOutput().list()` / `client.ApiUpdateKnowledgeBaseDataSourceOutput().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  ApiUpdateKnowledgeBaseDataSourceOutput(entopts?: Record<string, any>) {
    const self = this
    return new ApiUpdateKnowledgeBaseDataSourceOutputEntity(self, entopts)
  }


  // Entity access: `client.ApiUpdateKnowledgeBaseOutput().list()` / `client.ApiUpdateKnowledgeBaseOutput().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  ApiUpdateKnowledgeBaseOutput(entopts?: Record<string, any>) {
    const self = this
    return new ApiUpdateKnowledgeBaseOutputEntity(self, entopts)
  }


  // Entity access: `client.ApiUpdateLinkedAgentOutput().list()` / `client.ApiUpdateLinkedAgentOutput().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  ApiUpdateLinkedAgentOutput(entopts?: Record<string, any>) {
    const self = this
    return new ApiUpdateLinkedAgentOutputEntity(self, entopts)
  }


  // Entity access: `client.ApiUpdateModelApiKeyOutput().list()` / `client.ApiUpdateModelApiKeyOutput().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  ApiUpdateModelApiKeyOutput(entopts?: Record<string, any>) {
    const self = this
    return new ApiUpdateModelApiKeyOutputEntity(self, entopts)
  }


  // Entity access: `client.ApiUpdateModelEvaluationRunOutput().list()` / `client.ApiUpdateModelEvaluationRunOutput().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  ApiUpdateModelEvaluationRunOutput(entopts?: Record<string, any>) {
    const self = this
    return new ApiUpdateModelEvaluationRunOutputEntity(self, entopts)
  }


  // Entity access: `client.ApiUpdateModelRouterOutput().list()` / `client.ApiUpdateModelRouterOutput().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  ApiUpdateModelRouterOutput(entopts?: Record<string, any>) {
    const self = this
    return new ApiUpdateModelRouterOutputEntity(self, entopts)
  }


  // Entity access: `client.ApiUpdateOpenAiapiKeyOutput().list()` / `client.ApiUpdateOpenAiapiKeyOutput().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  ApiUpdateOpenAiapiKeyOutput(entopts?: Record<string, any>) {
    const self = this
    return new ApiUpdateOpenAiapiKeyOutputEntity(self, entopts)
  }


  // Entity access: `client.ApiUpdateScenarioSetOutput().list()` / `client.ApiUpdateScenarioSetOutput().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  ApiUpdateScenarioSetOutput(entopts?: Record<string, any>) {
    const self = this
    return new ApiUpdateScenarioSetOutputEntity(self, entopts)
  }


  // Entity access: `client.ApiUpdateSimulationRunOutput().list()` / `client.ApiUpdateSimulationRunOutput().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  ApiUpdateSimulationRunOutput(entopts?: Record<string, any>) {
    const self = this
    return new ApiUpdateSimulationRunOutputEntity(self, entopts)
  }


  // Entity access: `client.ApiUpdateWorkspaceOutput().list()` / `client.ApiUpdateWorkspaceOutput().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  ApiUpdateWorkspaceOutput(entopts?: Record<string, any>) {
    const self = this
    return new ApiUpdateWorkspaceOutputEntity(self, entopts)
  }


  // Entity access: `client.App().list()` / `client.App().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  App(entopts?: Record<string, any>) {
    const self = this
    return new AppEntity(self, entopts)
  }


  // Entity access: `client.AppAlert().list()` / `client.AppAlert().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  AppAlert(entopts?: Record<string, any>) {
    const self = this
    return new AppAlertEntity(self, entopts)
  }


  // Entity access: `client.AppEvent().list()` / `client.AppEvent().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  AppEvent(entopts?: Record<string, any>) {
    const self = this
    return new AppEventEntity(self, entopts)
  }


  // Entity access: `client.AppHealth().list()` / `client.AppHealth().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  AppHealth(entopts?: Record<string, any>) {
    const self = this
    return new AppHealthEntity(self, entopts)
  }


  // Entity access: `client.AppInstance().list()` / `client.AppInstance().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  AppInstance(entopts?: Record<string, any>) {
    const self = this
    return new AppInstanceEntity(self, entopts)
  }


  // Entity access: `client.AppJobInvocation().list()` / `client.AppJobInvocation().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  AppJobInvocation(entopts?: Record<string, any>) {
    const self = this
    return new AppJobInvocationEntity(self, entopts)
  }


  // Entity access: `client.AppMetricsBandwidthUsage().list()` / `client.AppMetricsBandwidthUsage().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  AppMetricsBandwidthUsage(entopts?: Record<string, any>) {
    const self = this
    return new AppMetricsBandwidthUsageEntity(self, entopts)
  }


  // Entity access: `client.AppPropose().list()` / `client.AppPropose().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  AppPropose(entopts?: Record<string, any>) {
    const self = this
    return new AppProposeEntity(self, entopts)
  }


  // Entity access: `client.AppsDeployment().list()` / `client.AppsDeployment().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  AppsDeployment(entopts?: Record<string, any>) {
    const self = this
    return new AppsDeploymentEntity(self, entopts)
  }


  // Entity access: `client.AppsGetExec().list()` / `client.AppsGetExec().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  AppsGetExec(entopts?: Record<string, any>) {
    const self = this
    return new AppsGetExecEntity(self, entopts)
  }


  // Entity access: `client.AppsGetLog().list()` / `client.AppsGetLog().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  AppsGetLog(entopts?: Record<string, any>) {
    const self = this
    return new AppsGetLogEntity(self, entopts)
  }


  // Entity access: `client.AppsInstanceSize().list()` / `client.AppsInstanceSize().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  AppsInstanceSize(entopts?: Record<string, any>) {
    const self = this
    return new AppsInstanceSizeEntity(self, entopts)
  }


  // Entity access: `client.AppsRegion().list()` / `client.AppsRegion().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  AppsRegion(entopts?: Record<string, any>) {
    const self = this
    return new AppsRegionEntity(self, entopts)
  }


  // Entity access: `client.AssociatedKubernetesResource().list()` / `client.AssociatedKubernetesResource().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  AssociatedKubernetesResource(entopts?: Record<string, any>) {
    const self = this
    return new AssociatedKubernetesResourceEntity(self, entopts)
  }


  // Entity access: `client.AssociatedResourceStatus().list()` / `client.AssociatedResourceStatus().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  AssociatedResourceStatus(entopts?: Record<string, any>) {
    const self = this
    return new AssociatedResourceStatusEntity(self, entopts)
  }


  // Entity access: `client.AsyncInvoke().list()` / `client.AsyncInvoke().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  AsyncInvoke(entopts?: Record<string, any>) {
    const self = this
    return new AsyncInvokeEntity(self, entopts)
  }


  // Entity access: `client.Balance().list()` / `client.Balance().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  Balance(entopts?: Record<string, any>) {
    const self = this
    return new BalanceEntity(self, entopts)
  }


  // Entity access: `client.Batch().list()` / `client.Batch().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  Batch(entopts?: Record<string, any>) {
    const self = this
    return new BatchEntity(self, entopts)
  }


  // Entity access: `client.BatchFileCreate().list()` / `client.BatchFileCreate().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  BatchFileCreate(entopts?: Record<string, any>) {
    const self = this
    return new BatchFileCreateEntity(self, entopts)
  }


  // Entity access: `client.BatchInference().list()` / `client.BatchInference().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  BatchInference(entopts?: Record<string, any>) {
    const self = this
    return new BatchInferenceEntity(self, entopts)
  }


  // Entity access: `client.BatchResult().list()` / `client.BatchResult().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  BatchResult(entopts?: Record<string, any>) {
    const self = this
    return new BatchResultEntity(self, entopts)
  }


  // Entity access: `client.Billing().list()` / `client.Billing().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  Billing(entopts?: Record<string, any>) {
    const self = this
    return new BillingEntity(self, entopts)
  }


  // Entity access: `client.BlockStorage().list()` / `client.BlockStorage().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  BlockStorage(entopts?: Record<string, any>) {
    const self = this
    return new BlockStorageEntity(self, entopts)
  }


  // Entity access: `client.BlockStorageAction().list()` / `client.BlockStorageAction().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  BlockStorageAction(entopts?: Record<string, any>) {
    const self = this
    return new BlockStorageActionEntity(self, entopts)
  }


  // Entity access: `client.ByoipPrefix().list()` / `client.ByoipPrefix().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  ByoipPrefix(entopts?: Record<string, any>) {
    const self = this
    return new ByoipPrefixEntity(self, entopts)
  }


  // Entity access: `client.CdnEndpoint().list()` / `client.CdnEndpoint().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  CdnEndpoint(entopts?: Record<string, any>) {
    const self = this
    return new CdnEndpointEntity(self, entopts)
  }


  // Entity access: `client.Certificate().list()` / `client.Certificate().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  Certificate(entopts?: Record<string, any>) {
    const self = this
    return new CertificateEntity(self, entopts)
  }


  // Entity access: `client.ChatCompletion().list()` / `client.ChatCompletion().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  ChatCompletion(entopts?: Record<string, any>) {
    const self = this
    return new ChatCompletionEntity(self, entopts)
  }


  // Entity access: `client.Clusterlint().list()` / `client.Clusterlint().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  Clusterlint(entopts?: Record<string, any>) {
    const self = this
    return new ClusterlintEntity(self, entopts)
  }


  // Entity access: `client.Connection().list()` / `client.Connection().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  Connection(entopts?: Record<string, any>) {
    const self = this
    return new ConnectionEntity(self, entopts)
  }


  // Entity access: `client.ConnectionPool().list()` / `client.ConnectionPool().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  ConnectionPool(entopts?: Record<string, any>) {
    const self = this
    return new ConnectionPoolEntity(self, entopts)
  }


  // Entity access: `client.ContainerRegistry().list()` / `client.ContainerRegistry().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  ContainerRegistry(entopts?: Record<string, any>) {
    const self = this
    return new ContainerRegistryEntity(self, entopts)
  }


  // Entity access: `client.CreateResponse().list()` / `client.CreateResponse().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  CreateResponse(entopts?: Record<string, any>) {
    const self = this
    return new CreateResponseEntity(self, entopts)
  }


  // Entity access: `client.Credential().list()` / `client.Credential().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  Credential(entopts?: Record<string, any>) {
    const self = this
    return new CredentialEntity(self, entopts)
  }


  // Entity access: `client.Database().list()` / `client.Database().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  Database(entopts?: Record<string, any>) {
    const self = this
    return new DatabaseEntity(self, entopts)
  }


  // Entity access: `client.DedicatedInference().list()` / `client.DedicatedInference().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  DedicatedInference(entopts?: Record<string, any>) {
    const self = this
    return new DedicatedInferenceEntity(self, entopts)
  }


  // Entity access: `client.DedicatedInferenceAccelerator().list()` / `client.DedicatedInferenceAccelerator().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  DedicatedInferenceAccelerator(entopts?: Record<string, any>) {
    const self = this
    return new DedicatedInferenceAcceleratorEntity(self, entopts)
  }


  // Entity access: `client.DedicatedInferenceGpuModelConfig().list()` / `client.DedicatedInferenceGpuModelConfig().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  DedicatedInferenceGpuModelConfig(entopts?: Record<string, any>) {
    const self = this
    return new DedicatedInferenceGpuModelConfigEntity(self, entopts)
  }


  // Entity access: `client.DedicatedInferenceSize().list()` / `client.DedicatedInferenceSize().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  DedicatedInferenceSize(entopts?: Record<string, any>) {
    const self = this
    return new DedicatedInferenceSizeEntity(self, entopts)
  }


  // Entity access: `client.DockerCredential().list()` / `client.DockerCredential().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  DockerCredential(entopts?: Record<string, any>) {
    const self = this
    return new DockerCredentialEntity(self, entopts)
  }


  // Entity access: `client.Domain().list()` / `client.Domain().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  Domain(entopts?: Record<string, any>) {
    const self = this
    return new DomainEntity(self, entopts)
  }


  // Entity access: `client.DomainRecord().list()` / `client.DomainRecord().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  DomainRecord(entopts?: Record<string, any>) {
    const self = this
    return new DomainRecordEntity(self, entopts)
  }


  // Entity access: `client.Droplet().list()` / `client.Droplet().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  Droplet(entopts?: Record<string, any>) {
    const self = this
    return new DropletEntity(self, entopts)
  }


  // Entity access: `client.DropletAction().list()` / `client.DropletAction().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  DropletAction(entopts?: Record<string, any>) {
    const self = this
    return new DropletActionEntity(self, entopts)
  }


  // Entity access: `client.DropletAutoscalePool().list()` / `client.DropletAutoscalePool().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  DropletAutoscalePool(entopts?: Record<string, any>) {
    const self = this
    return new DropletAutoscalePoolEntity(self, entopts)
  }


  // Entity access: `client.Embedding().list()` / `client.Embedding().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  Embedding(entopts?: Record<string, any>) {
    const self = this
    return new EmbeddingEntity(self, entopts)
  }


  // Entity access: `client.Empty().list()` / `client.Empty().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  Empty(entopts?: Record<string, any>) {
    const self = this
    return new EmptyEntity(self, entopts)
  }


  // Entity access: `client.Firewall().list()` / `client.Firewall().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  Firewall(entopts?: Record<string, any>) {
    const self = this
    return new FirewallEntity(self, entopts)
  }


  // Entity access: `client.FloatingIp().list()` / `client.FloatingIp().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  FloatingIp(entopts?: Record<string, any>) {
    const self = this
    return new FloatingIpEntity(self, entopts)
  }


  // Entity access: `client.FloatingIpAction().list()` / `client.FloatingIpAction().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  FloatingIpAction(entopts?: Record<string, any>) {
    const self = this
    return new FloatingIpActionEntity(self, entopts)
  }


  // Entity access: `client.Function().list()` / `client.Function().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  Function(entopts?: Record<string, any>) {
    const self = this
    return new FunctionEntity(self, entopts)
  }


  // Entity access: `client.GenaiapiRegion().list()` / `client.GenaiapiRegion().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  GenaiapiRegion(entopts?: Record<string, any>) {
    const self = this
    return new GenaiapiRegionEntity(self, entopts)
  }


  // Entity access: `client.Image().list()` / `client.Image().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  Image(entopts?: Record<string, any>) {
    const self = this
    return new ImageEntity(self, entopts)
  }


  // Entity access: `client.ImageAction().list()` / `client.ImageAction().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  ImageAction(entopts?: Record<string, any>) {
    const self = this
    return new ImageActionEntity(self, entopts)
  }


  // Entity access: `client.Insight().list()` / `client.Insight().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  Insight(entopts?: Record<string, any>) {
    const self = this
    return new InsightEntity(self, entopts)
  }


  // Entity access: `client.InvoiceSummary().list()` / `client.InvoiceSummary().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  InvoiceSummary(entopts?: Record<string, any>) {
    const self = this
    return new InvoiceSummaryEntity(self, entopts)
  }


  // Entity access: `client.Kubernete().list()` / `client.Kubernete().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  Kubernete(entopts?: Record<string, any>) {
    const self = this
    return new KuberneteEntity(self, entopts)
  }


  // Entity access: `client.KubernetesOption().list()` / `client.KubernetesOption().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  KubernetesOption(entopts?: Record<string, any>) {
    const self = this
    return new KubernetesOptionEntity(self, entopts)
  }


  // Entity access: `client.ListMcpServerTool().list()` / `client.ListMcpServerTool().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  ListMcpServerTool(entopts?: Record<string, any>) {
    const self = this
    return new ListMcpServerToolEntity(self, entopts)
  }


  // Entity access: `client.ListProvider().list()` / `client.ListProvider().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  ListProvider(entopts?: Record<string, any>) {
    const self = this
    return new ListProviderEntity(self, entopts)
  }


  // Entity access: `client.ListProviderHealth().list()` / `client.ListProviderHealth().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  ListProviderHealth(entopts?: Record<string, any>) {
    const self = this
    return new ListProviderHealthEntity(self, entopts)
  }


  // Entity access: `client.ListTool().list()` / `client.ListTool().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  ListTool(entopts?: Record<string, any>) {
    const self = this
    return new ListToolEntity(self, entopts)
  }


  // Entity access: `client.ListToolHealth().list()` / `client.ListToolHealth().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  ListToolHealth(entopts?: Record<string, any>) {
    const self = this
    return new ListToolHealthEntity(self, entopts)
  }


  // Entity access: `client.ListToolbeltProvider().list()` / `client.ListToolbeltProvider().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  ListToolbeltProvider(entopts?: Record<string, any>) {
    const self = this
    return new ListToolbeltProviderEntity(self, entopts)
  }


  // Entity access: `client.ListToolkit().list()` / `client.ListToolkit().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  ListToolkit(entopts?: Record<string, any>) {
    const self = this
    return new ListToolkitEntity(self, entopts)
  }


  // Entity access: `client.LoadBalancer().list()` / `client.LoadBalancer().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  LoadBalancer(entopts?: Record<string, any>) {
    const self = this
    return new LoadBalancerEntity(self, entopts)
  }


  // Entity access: `client.LogsSearch().list()` / `client.LogsSearch().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  LogsSearch(entopts?: Record<string, any>) {
    const self = this
    return new LogsSearchEntity(self, entopts)
  }


  // Entity access: `client.Logsink().list()` / `client.Logsink().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  Logsink(entopts?: Record<string, any>) {
    const self = this
    return new LogsinkEntity(self, entopts)
  }


  // Entity access: `client.McpServer().list()` / `client.McpServer().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  McpServer(entopts?: Record<string, any>) {
    const self = this
    return new McpServerEntity(self, entopts)
  }


  // Entity access: `client.Message().list()` / `client.Message().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  Message(entopts?: Record<string, any>) {
    const self = this
    return new MessageEntity(self, entopts)
  }


  // Entity access: `client.Metric().list()` / `client.Metric().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  Metric(entopts?: Record<string, any>) {
    const self = this
    return new MetricEntity(self, entopts)
  }


  // Entity access: `client.Model().list()` / `client.Model().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  Model(entopts?: Record<string, any>) {
    const self = this
    return new ModelEntity(self, entopts)
  }


  // Entity access: `client.Monitoring().list()` / `client.Monitoring().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  Monitoring(entopts?: Record<string, any>) {
    const self = this
    return new MonitoringEntity(self, entopts)
  }


  // Entity access: `client.N1Click().list()` / `client.N1Click().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  N1Click(entopts?: Record<string, any>) {
    const self = this
    return new N1ClickEntity(self, entopts)
  }


  // Entity access: `client.N1ClickApplication().list()` / `client.N1ClickApplication().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  N1ClickApplication(entopts?: Record<string, any>) {
    const self = this
    return new N1ClickApplicationEntity(self, entopts)
  }


  // Entity access: `client.NeighborId().list()` / `client.NeighborId().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  NeighborId(entopts?: Record<string, any>) {
    const self = this
    return new NeighborIdEntity(self, entopts)
  }


  // Entity access: `client.Nfs().list()` / `client.Nfs().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  Nfs(entopts?: Record<string, any>) {
    const self = this
    return new NfsEntity(self, entopts)
  }


  // Entity access: `client.NfsAction2().list()` / `client.NfsAction2().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  NfsAction2(entopts?: Record<string, any>) {
    const self = this
    return new NfsAction2Entity(self, entopts)
  }


  // Entity access: `client.NfsSnapshot().list()` / `client.NfsSnapshot().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  NfsSnapshot(entopts?: Record<string, any>) {
    const self = this
    return new NfsSnapshotEntity(self, entopts)
  }


  // Entity access: `client.OnlineMigration().list()` / `client.OnlineMigration().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  OnlineMigration(entopts?: Record<string, any>) {
    const self = this
    return new OnlineMigrationEntity(self, entopts)
  }


  // Entity access: `client.Option().list()` / `client.Option().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  Option(entopts?: Record<string, any>) {
    const self = this
    return new OptionEntity(self, entopts)
  }


  // Entity access: `client.Organization().list()` / `client.Organization().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  Organization(entopts?: Record<string, any>) {
    const self = this
    return new OrganizationEntity(self, entopts)
  }


  // Entity access: `client.OutputView().list()` / `client.OutputView().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  OutputView(entopts?: Record<string, any>) {
    const self = this
    return new OutputViewEntity(self, entopts)
  }


  // Entity access: `client.PartnerNetworkConnect().list()` / `client.PartnerNetworkConnect().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  PartnerNetworkConnect(entopts?: Record<string, any>) {
    const self = this
    return new PartnerNetworkConnectEntity(self, entopts)
  }


  // Entity access: `client.PrepaymentConfig().list()` / `client.PrepaymentConfig().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  PrepaymentConfig(entopts?: Record<string, any>) {
    const self = this
    return new PrepaymentConfigEntity(self, entopts)
  }


  // Entity access: `client.PrepaymentStatus().list()` / `client.PrepaymentStatus().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  PrepaymentStatus(entopts?: Record<string, any>) {
    const self = this
    return new PrepaymentStatusEntity(self, entopts)
  }


  // Entity access: `client.Project().list()` / `client.Project().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  Project(entopts?: Record<string, any>) {
    const self = this
    return new ProjectEntity(self, entopts)
  }


  // Entity access: `client.ProjectResource().list()` / `client.ProjectResource().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  ProjectResource(entopts?: Record<string, any>) {
    const self = this
    return new ProjectResourceEntity(self, entopts)
  }


  // Entity access: `client.PromQuery().list()` / `client.PromQuery().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  PromQuery(entopts?: Record<string, any>) {
    const self = this
    return new PromQueryEntity(self, entopts)
  }


  // Entity access: `client.PromQueryRange().list()` / `client.PromQueryRange().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  PromQueryRange(entopts?: Record<string, any>) {
    const self = this
    return new PromQueryRangeEntity(self, entopts)
  }


  // Entity access: `client.PromSeries().list()` / `client.PromSeries().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  PromSeries(entopts?: Record<string, any>) {
    const self = this
    return new PromSeriesEntity(self, entopts)
  }


  // Entity access: `client.PromStringList().list()` / `client.PromStringList().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  PromStringList(entopts?: Record<string, any>) {
    const self = this
    return new PromStringListEntity(self, entopts)
  }


  // Entity access: `client.Region().list()` / `client.Region().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  Region(entopts?: Record<string, any>) {
    const self = this
    return new RegionEntity(self, entopts)
  }


  // Entity access: `client.ReservedIPv6().list()` / `client.ReservedIPv6().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  ReservedIPv6(entopts?: Record<string, any>) {
    const self = this
    return new ReservedIPv6Entity(self, entopts)
  }


  // Entity access: `client.ReservedIPv6Action().list()` / `client.ReservedIPv6Action().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  ReservedIPv6Action(entopts?: Record<string, any>) {
    const self = this
    return new ReservedIPv6ActionEntity(self, entopts)
  }


  // Entity access: `client.ReservedIp().list()` / `client.ReservedIp().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  ReservedIp(entopts?: Record<string, any>) {
    const self = this
    return new ReservedIpEntity(self, entopts)
  }


  // Entity access: `client.ReservedIpAction().list()` / `client.ReservedIpAction().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  ReservedIpAction(entopts?: Record<string, any>) {
    const self = this
    return new ReservedIpActionEntity(self, entopts)
  }


  // Entity access: `client.Resync().list()` / `client.Resync().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  Resync(entopts?: Record<string, any>) {
    const self = this
    return new ResyncEntity(self, entopts)
  }


  // Entity access: `client.Search().list()` / `client.Search().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  Search(entopts?: Record<string, any>) {
    const self = this
    return new SearchEntity(self, entopts)
  }


  // Entity access: `client.Security().list()` / `client.Security().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  Security(entopts?: Record<string, any>) {
    const self = this
    return new SecurityEntity(self, entopts)
  }


  // Entity access: `client.Setting().list()` / `client.Setting().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  Setting(entopts?: Record<string, any>) {
    const self = this
    return new SettingEntity(self, entopts)
  }


  // Entity access: `client.Size().list()` / `client.Size().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  Size(entopts?: Record<string, any>) {
    const self = this
    return new SizeEntity(self, entopts)
  }


  // Entity access: `client.Snapshot().list()` / `client.Snapshot().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  Snapshot(entopts?: Record<string, any>) {
    const self = this
    return new SnapshotEntity(self, entopts)
  }


  // Entity access: `client.SpacesKey().list()` / `client.SpacesKey().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  SpacesKey(entopts?: Record<string, any>) {
    const self = this
    return new SpacesKeyEntity(self, entopts)
  }


  // Entity access: `client.SqlMode().list()` / `client.SqlMode().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  SqlMode(entopts?: Record<string, any>) {
    const self = this
    return new SqlModeEntity(self, entopts)
  }


  // Entity access: `client.SshKey().list()` / `client.SshKey().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  SshKey(entopts?: Record<string, any>) {
    const self = this
    return new SshKeyEntity(self, entopts)
  }


  // Entity access: `client.Systemone().list()` / `client.Systemone().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  Systemone(entopts?: Record<string, any>) {
    const self = this
    return new SystemoneEntity(self, entopts)
  }


  // Entity access: `client.Tag().list()` / `client.Tag().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  Tag(entopts?: Record<string, any>) {
    const self = this
    return new TagEntity(self, entopts)
  }


  // Entity access: `client.Tool().list()` / `client.Tool().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  Tool(entopts?: Record<string, any>) {
    const self = this
    return new ToolEntity(self, entopts)
  }


  // Entity access: `client.Toolbelt().list()` / `client.Toolbelt().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  Toolbelt(entopts?: Record<string, any>) {
    const self = this
    return new ToolbeltEntity(self, entopts)
  }


  // Entity access: `client.Uptime().list()` / `client.Uptime().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  Uptime(entopts?: Record<string, any>) {
    const self = this
    return new UptimeEntity(self, entopts)
  }


  // Entity access: `client.User().list()` / `client.User().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  User(entopts?: Record<string, any>) {
    const self = this
    return new UserEntity(self, entopts)
  }


  // Entity access: `client.VectorDatabase().list()` / `client.VectorDatabase().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  VectorDatabase(entopts?: Record<string, any>) {
    const self = this
    return new VectorDatabaseEntity(self, entopts)
  }


  // Entity access: `client.VectordbBackup().list()` / `client.VectordbBackup().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  VectordbBackup(entopts?: Record<string, any>) {
    const self = this
    return new VectordbBackupEntity(self, entopts)
  }


  // Entity access: `client.VectordbGetRestoreStatus().list()` / `client.VectordbGetRestoreStatus().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  VectordbGetRestoreStatus(entopts?: Record<string, any>) {
    const self = this
    return new VectordbGetRestoreStatusEntity(self, entopts)
  }


  // Entity access: `client.VectordbGetVectorDb().list()` / `client.VectordbGetVectorDb().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  VectordbGetVectorDb(entopts?: Record<string, any>) {
    const self = this
    return new VectordbGetVectorDbEntity(self, entopts)
  }


  // Entity access: `client.VectordbGetVectorDbAdminCredential().list()` / `client.VectordbGetVectorDbAdminCredential().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  VectordbGetVectorDbAdminCredential(entopts?: Record<string, any>) {
    const self = this
    return new VectordbGetVectorDbAdminCredentialEntity(self, entopts)
  }


  // Entity access: `client.VectordbRestoreBackup().list()` / `client.VectordbRestoreBackup().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  VectordbRestoreBackup(entopts?: Record<string, any>) {
    const self = this
    return new VectordbRestoreBackupEntity(self, entopts)
  }


  // Entity access: `client.VectordbUpdateVectorDb().list()` / `client.VectordbUpdateVectorDb().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  VectordbUpdateVectorDb(entopts?: Record<string, any>) {
    const self = this
    return new VectordbUpdateVectorDbEntity(self, entopts)
  }


  // Entity access: `client.VectordbUpdateVectorDbTag().list()` / `client.VectordbUpdateVectorDbTag().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  VectordbUpdateVectorDbTag(entopts?: Record<string, any>) {
    const self = this
    return new VectordbUpdateVectorDbTagEntity(self, entopts)
  }


  // Entity access: `client.Vpc().list()` / `client.Vpc().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  Vpc(entopts?: Record<string, any>) {
    const self = this
    return new VpcEntity(self, entopts)
  }


  // Entity access: `client.VpcNatGateway().list()` / `client.VpcNatGateway().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  VpcNatGateway(entopts?: Record<string, any>) {
    const self = this
    return new VpcNatGatewayEntity(self, entopts)
  }


  // Entity access: `client.VpcPeering().list()` / `client.VpcPeering().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  VpcPeering(entopts?: Record<string, any>) {
    const self = this
    return new VpcPeeringEntity(self, entopts)
  }


  // Entity access: `client.VpcRoutesPublicPreview().list()` / `client.VpcRoutesPublicPreview().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  VpcRoutesPublicPreview(entopts?: Record<string, any>) {
    const self = this
    return new VpcRoutesPublicPreviewEntity(self, entopts)
  }


  // Entity access: `client.VpcSubnetsPublicPreview().list()` / `client.VpcSubnetsPublicPreview().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  VpcSubnetsPublicPreview(entopts?: Record<string, any>) {
    const self = this
    return new VpcSubnetsPublicPreviewEntity(self, entopts)
  }




  static test(testoptsarg?: any, sdkoptsarg?: any) {
    const struct = stdutil.struct
    const setpath = struct.setpath
    const getdef = struct.getdef
    const clone = struct.clone
    const setprop = struct.setprop

    const sdkopts = getdef(clone(sdkoptsarg), {})
    const testopts = getdef(clone(testoptsarg), {})
    setprop(testopts, 'active', true)
    setpath(sdkopts, 'feature.test', testopts)

    const testsdk = new DigitaloceanSDK(sdkopts)
    testsdk._mode = 'test'

    return testsdk
  }


  tester(testopts?: any, sdkopts?: any) {
    return DigitaloceanSDK.test(testopts, sdkopts)
  }


  toJSON() {
    return { name: 'Digitalocean' }
  }

  toString() {
    return 'Digitalocean ' + this._utility.struct.jsonify(this.toJSON())
  }

  [inspect.custom]() {
    return this.toString()
  }

}




const SDK = DigitaloceanSDK


export {
  stdutil,
  config,
  

  BaseFeature,
  DigitaloceanEntityBase,

  DigitaloceanSDK,
  SDK,
}


export type { DirectResult }
