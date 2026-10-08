# Digitalocean SDK

from digitalocean_sdk.utility.voxgig_struct import voxgig_struct as vs
from digitalocean_sdk.core.utility_type import DigitaloceanUtility
from digitalocean_sdk.core.spec import DigitaloceanSpec
from digitalocean_sdk.core import helpers
from digitalocean_sdk.utility.prepare_method import allowed
from digitalocean_sdk.utility.result_body import unreadable_body

# Load utility registration (populates Utility._registrar)
from digitalocean_sdk.utility import register

# Load features
from digitalocean_sdk.feature.base_feature import DigitaloceanBaseFeature
from digitalocean_sdk.features import _has_feature, _make_feature


class DigitaloceanSDK:
    # The options hold the credential. A slot keeps them reachable as
    # `client.options` and out of `vars(client)` and every attribute dump;
    # the dict entry keeps the instance open for everything else.
    __slots__ = ("_options", "__dict__")

    def __init__(self, options=None):
        self.mode = "live"
        self.features = []
        self._options = None

        utility = DigitaloceanUtility()
        self._utility = utility

        from digitalocean_sdk.config import shared_config
        config = shared_config()

        self._rootctx = utility.make_context({
            "client": self,
            "utility": utility,
            "config": config,
            "options": options if options is not None else {},
            "shared": {},
        }, None)

        self.options = utility.make_options(self._rootctx)

        if vs.getpath(self.options, "feature.test.active") is True:
            self.mode = "test"

        self._rootctx.options = self.options

        # Add features in the resolved order (make_options puts an explicit
        # list order first, else defaults to test-first). Ordering matters: the
        # `test` feature installs the base mock transport and the transport
        # features (retry/cache/netsim/proxy/ratelimit) wrap whatever is
        # current, so `test` must be added before them to sit at the base.
        # Extension feature INSTANCES come from the RAW construction
        # options - extend is consumed exactly once, here. make_options
        # strips the key before cloning (vs.clone flattens arbitrary
        # objects), so self.options never carries the instances.
        feature_opts = helpers.to_map(vs.getprop(self.options, "feature"))
        extend = options.get("extend") if isinstance(options, dict) else None
        if not isinstance(extend, list):
            extend = []
        if feature_opts is not None:
            featureorder = vs.getpath(self.options, "__derived__.featureorder")
            if isinstance(featureorder, list):
                for fname in featureorder:
                    fopts = helpers.to_map(feature_opts.get(fname))
                    if fopts is not None and fopts.get("active") is True:
                        # An active name with no generated feature class is
                        # legal when an extend-supplied instance carries that
                        # name (station's adopt path): the instance is added
                        # below, positioned by its own __after__ entry, so
                        # skip it here rather than add a BaseFeature stray
                        # that would silently shift feature positions.
                        if not _has_feature(fname) and any(
                            fname == (f.get("name") if isinstance(f, dict)
                                      else getattr(f, "name", None))
                            for f in extend
                        ):
                            continue
                        utility.feature_add(self._rootctx, _make_feature(fname))

        # Add extension features.
        for f in extend:
            if isinstance(f, dict) or (hasattr(f, "get_name") and callable(f.get_name)):
                utility.feature_add(self._rootctx, f)

        # Initialize features.
        for f in self.features:
            utility.feature_init(self._rootctx, f)

        utility.feature_hook(self._rootctx, "PostConstruct")

        # #BuildFeatures

    @property
    def options(self):
        return self._options

    @options.setter
    def options(self, value):
        self._options = value

    def __repr__(self):
        return "DigitaloceanSDK(mode=" + repr(self.mode) + ")"

    def options_map(self):
        out = vs.clone(self.options)
        if isinstance(out, dict):
            return out
        return {}

    def get_utility(self):
        return DigitaloceanUtility.copy(self._utility)

    def get_root_ctx(self):
        return self._rootctx

    def prepare(self, fetchargs=None):
        utility = self._utility

        if fetchargs is None:
            fetchargs = {}

        ctrl = helpers.to_map(vs.getprop(fetchargs, "ctrl"))
        if ctrl is None:
            ctrl = {}

        ctx = utility.make_context({
            "opname": "prepare",
            "ctrl": ctrl,
        }, self._rootctx)

        options = self.options

        path = vs.getprop(fetchargs, "path") or ""
        if not isinstance(path, str):
            path = ""

        method = vs.getprop(fetchargs, "method") or "GET"
        if not isinstance(method, str):
            method = "GET"
        method = method.upper()

        allow_method = vs.getpath(options, "allow.method")
        if not allowed(allow_method, method):
            raise ctx.make_error("spec_method_allow",
                'Method "' + method +
                '" not allowed by SDK option allow.method value: "' + str(allow_method) + '"')

        params = helpers.to_map(vs.getprop(fetchargs, "params"))
        if params is None:
            params = {}
        query = helpers.to_map(vs.getprop(fetchargs, "query"))
        if query is None:
            query = {}

        headers = utility.prepare_headers(ctx)

        base = vs.getprop(options, "base") or ""
        if not isinstance(base, str):
            base = ""
        prefix = vs.getprop(options, "prefix") or ""
        if not isinstance(prefix, str):
            prefix = ""
        suffix = vs.getprop(options, "suffix") or ""
        if not isinstance(suffix, str):
            suffix = ""

        ctx.spec = DigitaloceanSpec({
            "base": base,
            "prefix": prefix,
            "suffix": suffix,
            "path": path,
            "method": method,
            "params": params,
            "query": query,
            "headers": headers,
            "body": vs.getprop(fetchargs, "body"),
            "step": "start",
        })

        # Merge user-provided headers.
        uh = vs.getprop(fetchargs, "headers")
        if isinstance(uh, dict):
            for k, v in uh.items():
                ctx.spec.headers[k] = v

        _, err = utility.prepare_auth(ctx)
        if err is not None:
            raise err

        fetchdef, err = utility.make_fetch_def(ctx)
        if err is not None:
            raise err

        return fetchdef

    # Raw endpoint access is operator-controllable, like every entity op.
    # Blocking it means denying BOTH the 'direct' and 'graphql' tokens, since
    # either one reaches the same endpoint.
    def direct(self, fetchargs=None):
        if not self._op_allowed("direct"):
            return self._op_denied("direct")

        return self._raw_request(fetchargs)

    # Is this raw-access op permitted by the SDK's allow.op option?
    def _op_allowed(self, op):
        return allowed(vs.getpath(self.options, "allow.op"), op)

    def _op_denied(self, op):
        allow_op = vs.getpath(self.options, "allow.op")
        return {
            "ok": False,
            "err": Exception(
                "DigitaloceanSDK: " + op + ": operation not allowed by"
                ' SDK option allow.op value: "' + str(allow_op) + '"'),
        }

    # Ungated request path shared by direct and graphql, each of which checks
    # its own allow.op token first. Private, rather than a flag on fetchargs:
    # a caller-supplied marker would let anyone opt straight back out of the
    # gate by passing it.
    def _raw_request(self, fetchargs=None):
        utility = self._utility

        try:
            fetchdef = self.prepare(fetchargs)
        except Exception as err:
            # direct() is the raw-HTTP escape hatch: it never raises, it
            # returns a result object callers branch on via result["ok"].
            # That error never passes through make_error, so it is cleaned.
            return {"ok": False, "err": utility.clean(self._rootctx, err)}

        if fetchargs is None:
            fetchargs = {}
        ctrl = helpers.to_map(vs.getprop(fetchargs, "ctrl"))
        if ctrl is None:
            ctrl = {}

        ctx = utility.make_context({
            "opname": "direct",
            "ctrl": ctrl,
        }, self._rootctx)

        url = fetchdef.get("url", "")
        fetched, fetch_err = utility.fetcher(ctx, url, fetchdef)

        if fetch_err is not None:
            return {"ok": False, "err": utility.clean(ctx, fetch_err)}

        if fetched is None:
            return {
                "ok": False,
                "err": ctx.make_error("direct_no_response", "response: undefined"),
            }

        if isinstance(fetched, dict):
            status = helpers.to_int(vs.getprop(fetched, "status"))
            headers = vs.getprop(fetched, "headers") or {}

            # No-body responses (204, 304) and explicit zero content-length
            # must skip JSON parsing — calling json() on an empty body raises.
            content_length = None
            if isinstance(headers, dict):
                content_length = headers.get("content-length")
            no_body = status in (204, 304) or str(content_length) == "0"

            json_data = None
            body_err = None
            if not no_body:
                jf = vs.getprop(fetched, "json")
                if callable(jf):
                    try:
                        json_data = jf()
                    except Exception:
                        # Non-JSON body (e.g. text/plain, text/html). Surface
                        # status + headers but leave data as None.
                        json_data = None
                if vs.getprop(fetched, "unreadable") is True:
                    failed = None if 200 <= status < 300 else ctx.make_error(
                        "request_status",
                        "request: " + str(status) + ": " + str(vs.getprop(fetched, "statusText")))
                    body_err = unreadable_body(ctx, status, headers, vs.getprop(fetched, "body"),
                                               fetchdef.get("headers"), failed)

            out = {
                "ok": body_err is None and status >= 200 and status < 300,
                "status": status,
                "headers": headers,
                "data": json_data,
            }
            if body_err is not None:
                out["err"] = utility.clean(ctx, body_err)
            return out

        return {
            "ok": False,
            "err": ctx.make_error("direct_invalid", "invalid response type"),
        }

    # Raw GraphQL access: the pressure valve that makes the generated
    # surface's deliberate omissions (per-call selection sets, typed filter
    # builders, batching, subscriptions) livable — the whole schema stays
    # reachable.
    #
    # Thin wrapper over the same prepare/fetch path direct uses, with the one
    # thing raw direct cannot do for GraphQL: a GraphQL failure rides HTTP 200
    # as a top-level `errors` array, so status alone would report a failed
    # query as ok.
    #
    # NOTE: like direct, this bypasses the feature pipeline — no retry,
    # ratelimit or paging features apply.
    def graphql(self, query, variables=None, ctrl=None):
        if not self._op_allowed("graphql"):
            return self._op_denied("graphql")

        res = self._raw_request({
            "method": "POST",
            "headers": {"content-type": "application/json"},
            "body": {"query": query, "variables": variables or {}},
            "ctrl": ctrl or {},
        })

        # Errors are read BEFORE any status check: a GraphQL parse or
        # validation failure comes back as HTTP 400 carrying the standard
        # { errors: [...] } body, and the raw path represents a non-2xx as
        # ok:False with no err — so returning early on status would discard
        # the server's own diagnostics, which are the only useful part of
        # that response.
        errors = vs.getpath(res, "data.errors")

        if isinstance(errors, list) and 0 < len(errors):
            first = errors[0] if isinstance(errors[0], dict) else {}
            msg = first.get("message") or "graphql error"
            res["ok"] = False
            res["err"] = Exception("DigitaloceanSDK: graphql: " + str(msg))
            res["graphql"] = errors

        return res


    def AccessPoint(self, data=None) -> "AccessPointEntity":
        """Entity factory: client.AccessPoint().list() / client.AccessPoint().load({"id": ...})."""
        from digitalocean_sdk.entity.access_point_entity import AccessPointEntity
        return AccessPointEntity(self, data)


    def Account(self, data=None) -> "AccountEntity":
        """Entity factory: client.Account().list() / client.Account().load({"id": ...})."""
        from digitalocean_sdk.entity.account_entity import AccountEntity
        return AccountEntity(self, data)


    def Action(self, data=None) -> "ActionEntity":
        """Entity factory: client.Action().list() / client.Action().load({"id": ...})."""
        from digitalocean_sdk.entity.action_entity import ActionEntity
        return ActionEntity(self, data)


    def ActorLimit(self, data=None) -> "ActorLimitEntity":
        """Entity factory: client.ActorLimit().list() / client.ActorLimit().load({"id": ...})."""
        from digitalocean_sdk.entity.actor_limit_entity import ActorLimitEntity
        return ActorLimitEntity(self, data)


    def AddOnApp(self, data=None) -> "AddOnAppEntity":
        """Entity factory: client.AddOnApp().list() / client.AddOnApp().load({"id": ...})."""
        from digitalocean_sdk.entity.add_on_app_entity import AddOnAppEntity
        return AddOnAppEntity(self, data)


    def AddOnPlan(self, data=None) -> "AddOnPlanEntity":
        """Entity factory: client.AddOnPlan().list() / client.AddOnPlan().load({"id": ...})."""
        from digitalocean_sdk.entity.add_on_plan_entity import AddOnPlanEntity
        return AddOnPlanEntity(self, data)


    def AddOnResource(self, data=None) -> "AddOnResourceEntity":
        """Entity factory: client.AddOnResource().list() / client.AddOnResource().load({"id": ...})."""
        from digitalocean_sdk.entity.add_on_resource_entity import AddOnResourceEntity
        return AddOnResourceEntity(self, data)


    def ApiAgentVersion(self, data=None) -> "ApiAgentVersionEntity":
        """Entity factory: client.ApiAgentVersion().list() / client.ApiAgentVersion().load({"id": ...})."""
        from digitalocean_sdk.entity.api_agent_version_entity import ApiAgentVersionEntity
        return ApiAgentVersionEntity(self, data)


    def ApiCreateAgentApiKeyOutput(self, data=None) -> "ApiCreateAgentApiKeyOutputEntity":
        """Entity factory: client.ApiCreateAgentApiKeyOutput().list() / client.ApiCreateAgentApiKeyOutput().load({"id": ...})."""
        from digitalocean_sdk.entity.api_create_agent_api_key_output_entity import ApiCreateAgentApiKeyOutputEntity
        return ApiCreateAgentApiKeyOutputEntity(self, data)


    def ApiCreateDataSourceFileUploadPresignedUrlsOutput(self, data=None) -> "ApiCreateDataSourceFileUploadPresignedUrlsOutputEntity":
        """Entity factory: client.ApiCreateDataSourceFileUploadPresignedUrlsOutput().list() / client.ApiCreateDataSourceFileUploadPresignedUrlsOutput().load({"id": ...})."""
        from digitalocean_sdk.entity.api_create_data_source_file_upload_presigned_urls_output_entity import ApiCreateDataSourceFileUploadPresignedUrlsOutputEntity
        return ApiCreateDataSourceFileUploadPresignedUrlsOutputEntity(self, data)


    def ApiCreateKnowledgeBaseDataSourceOutput(self, data=None) -> "ApiCreateKnowledgeBaseDataSourceOutputEntity":
        """Entity factory: client.ApiCreateKnowledgeBaseDataSourceOutput().list() / client.ApiCreateKnowledgeBaseDataSourceOutput().load({"id": ...})."""
        from digitalocean_sdk.entity.api_create_knowledge_base_data_source_output_entity import ApiCreateKnowledgeBaseDataSourceOutputEntity
        return ApiCreateKnowledgeBaseDataSourceOutputEntity(self, data)


    def ApiCreateScenarioSetFromLibraryOutput(self, data=None) -> "ApiCreateScenarioSetFromLibraryOutputEntity":
        """Entity factory: client.ApiCreateScenarioSetFromLibraryOutput().list() / client.ApiCreateScenarioSetFromLibraryOutput().load({"id": ...})."""
        from digitalocean_sdk.entity.api_create_scenario_set_from_library_output_entity import ApiCreateScenarioSetFromLibraryOutputEntity
        return ApiCreateScenarioSetFromLibraryOutputEntity(self, data)


    def ApiDeleteAgentApiKeyOutput(self, data=None) -> "ApiDeleteAgentApiKeyOutputEntity":
        """Entity factory: client.ApiDeleteAgentApiKeyOutput().list() / client.ApiDeleteAgentApiKeyOutput().load({"id": ...})."""
        from digitalocean_sdk.entity.api_delete_agent_api_key_output_entity import ApiDeleteAgentApiKeyOutputEntity
        return ApiDeleteAgentApiKeyOutputEntity(self, data)


    def ApiDeleteAgentOutput(self, data=None) -> "ApiDeleteAgentOutputEntity":
        """Entity factory: client.ApiDeleteAgentOutput().list() / client.ApiDeleteAgentOutput().load({"id": ...})."""
        from digitalocean_sdk.entity.api_delete_agent_output_entity import ApiDeleteAgentOutputEntity
        return ApiDeleteAgentOutputEntity(self, data)


    def ApiDeleteAnthropicApiKeyOutput(self, data=None) -> "ApiDeleteAnthropicApiKeyOutputEntity":
        """Entity factory: client.ApiDeleteAnthropicApiKeyOutput().list() / client.ApiDeleteAnthropicApiKeyOutput().load({"id": ...})."""
        from digitalocean_sdk.entity.api_delete_anthropic_api_key_output_entity import ApiDeleteAnthropicApiKeyOutputEntity
        return ApiDeleteAnthropicApiKeyOutputEntity(self, data)


    def ApiDeleteCustomEvaluationMetricOutput(self, data=None) -> "ApiDeleteCustomEvaluationMetricOutputEntity":
        """Entity factory: client.ApiDeleteCustomEvaluationMetricOutput().list() / client.ApiDeleteCustomEvaluationMetricOutput().load({"id": ...})."""
        from digitalocean_sdk.entity.api_delete_custom_evaluation_metric_output_entity import ApiDeleteCustomEvaluationMetricOutputEntity
        return ApiDeleteCustomEvaluationMetricOutputEntity(self, data)


    def ApiDeleteCustomModelOutputPublic(self, data=None) -> "ApiDeleteCustomModelOutputPublicEntity":
        """Entity factory: client.ApiDeleteCustomModelOutputPublic().list() / client.ApiDeleteCustomModelOutputPublic().load({"id": ...})."""
        from digitalocean_sdk.entity.api_delete_custom_model_output_public_entity import ApiDeleteCustomModelOutputPublicEntity
        return ApiDeleteCustomModelOutputPublicEntity(self, data)


    def ApiDeleteEvaluationDatasetOutput(self, data=None) -> "ApiDeleteEvaluationDatasetOutputEntity":
        """Entity factory: client.ApiDeleteEvaluationDatasetOutput().list() / client.ApiDeleteEvaluationDatasetOutput().load({"id": ...})."""
        from digitalocean_sdk.entity.api_delete_evaluation_dataset_output_entity import ApiDeleteEvaluationDatasetOutputEntity
        return ApiDeleteEvaluationDatasetOutputEntity(self, data)


    def ApiDeleteKnowledgeBaseDataSourceOutput(self, data=None) -> "ApiDeleteKnowledgeBaseDataSourceOutputEntity":
        """Entity factory: client.ApiDeleteKnowledgeBaseDataSourceOutput().list() / client.ApiDeleteKnowledgeBaseDataSourceOutput().load({"id": ...})."""
        from digitalocean_sdk.entity.api_delete_knowledge_base_data_source_output_entity import ApiDeleteKnowledgeBaseDataSourceOutputEntity
        return ApiDeleteKnowledgeBaseDataSourceOutputEntity(self, data)


    def ApiDeleteKnowledgeBaseOutput(self, data=None) -> "ApiDeleteKnowledgeBaseOutputEntity":
        """Entity factory: client.ApiDeleteKnowledgeBaseOutput().list() / client.ApiDeleteKnowledgeBaseOutput().load({"id": ...})."""
        from digitalocean_sdk.entity.api_delete_knowledge_base_output_entity import ApiDeleteKnowledgeBaseOutputEntity
        return ApiDeleteKnowledgeBaseOutputEntity(self, data)


    def ApiDeleteModelApiKeyOutput(self, data=None) -> "ApiDeleteModelApiKeyOutputEntity":
        """Entity factory: client.ApiDeleteModelApiKeyOutput().list() / client.ApiDeleteModelApiKeyOutput().load({"id": ...})."""
        from digitalocean_sdk.entity.api_delete_model_api_key_output_entity import ApiDeleteModelApiKeyOutputEntity
        return ApiDeleteModelApiKeyOutputEntity(self, data)


    def ApiDeleteModelEvaluationPresetOutput(self, data=None) -> "ApiDeleteModelEvaluationPresetOutputEntity":
        """Entity factory: client.ApiDeleteModelEvaluationPresetOutput().list() / client.ApiDeleteModelEvaluationPresetOutput().load({"id": ...})."""
        from digitalocean_sdk.entity.api_delete_model_evaluation_preset_output_entity import ApiDeleteModelEvaluationPresetOutputEntity
        return ApiDeleteModelEvaluationPresetOutputEntity(self, data)


    def ApiDeleteModelEvaluationRunOutputPublic(self, data=None) -> "ApiDeleteModelEvaluationRunOutputPublicEntity":
        """Entity factory: client.ApiDeleteModelEvaluationRunOutputPublic().list() / client.ApiDeleteModelEvaluationRunOutputPublic().load({"id": ...})."""
        from digitalocean_sdk.entity.api_delete_model_evaluation_run_output_public_entity import ApiDeleteModelEvaluationRunOutputPublicEntity
        return ApiDeleteModelEvaluationRunOutputPublicEntity(self, data)


    def ApiDeleteModelRouterOutput(self, data=None) -> "ApiDeleteModelRouterOutputEntity":
        """Entity factory: client.ApiDeleteModelRouterOutput().list() / client.ApiDeleteModelRouterOutput().load({"id": ...})."""
        from digitalocean_sdk.entity.api_delete_model_router_output_entity import ApiDeleteModelRouterOutputEntity
        return ApiDeleteModelRouterOutputEntity(self, data)


    def ApiDeleteOpenAiapiKeyOutput(self, data=None) -> "ApiDeleteOpenAiapiKeyOutputEntity":
        """Entity factory: client.ApiDeleteOpenAiapiKeyOutput().list() / client.ApiDeleteOpenAiapiKeyOutput().load({"id": ...})."""
        from digitalocean_sdk.entity.api_delete_open_aiapi_key_output_entity import ApiDeleteOpenAiapiKeyOutputEntity
        return ApiDeleteOpenAiapiKeyOutputEntity(self, data)


    def ApiDeleteScenarioSetOutput(self, data=None) -> "ApiDeleteScenarioSetOutputEntity":
        """Entity factory: client.ApiDeleteScenarioSetOutput().list() / client.ApiDeleteScenarioSetOutput().load({"id": ...})."""
        from digitalocean_sdk.entity.api_delete_scenario_set_output_entity import ApiDeleteScenarioSetOutputEntity
        return ApiDeleteScenarioSetOutputEntity(self, data)


    def ApiDeleteScheduledIndexingOutput(self, data=None) -> "ApiDeleteScheduledIndexingOutputEntity":
        """Entity factory: client.ApiDeleteScheduledIndexingOutput().list() / client.ApiDeleteScheduledIndexingOutput().load({"id": ...})."""
        from digitalocean_sdk.entity.api_delete_scheduled_indexing_output_entity import ApiDeleteScheduledIndexingOutputEntity
        return ApiDeleteScheduledIndexingOutputEntity(self, data)


    def ApiDeleteSimulationRunOutput(self, data=None) -> "ApiDeleteSimulationRunOutputEntity":
        """Entity factory: client.ApiDeleteSimulationRunOutput().list() / client.ApiDeleteSimulationRunOutput().load({"id": ...})."""
        from digitalocean_sdk.entity.api_delete_simulation_run_output_entity import ApiDeleteSimulationRunOutputEntity
        return ApiDeleteSimulationRunOutputEntity(self, data)


    def ApiDeleteWorkspaceOutput(self, data=None) -> "ApiDeleteWorkspaceOutputEntity":
        """Entity factory: client.ApiDeleteWorkspaceOutput().list() / client.ApiDeleteWorkspaceOutput().load({"id": ...})."""
        from digitalocean_sdk.entity.api_delete_workspace_output_entity import ApiDeleteWorkspaceOutputEntity
        return ApiDeleteWorkspaceOutputEntity(self, data)


    def ApiDropboxOauth2GetTokensOutput(self, data=None) -> "ApiDropboxOauth2GetTokensOutputEntity":
        """Entity factory: client.ApiDropboxOauth2GetTokensOutput().list() / client.ApiDropboxOauth2GetTokensOutput().load({"id": ...})."""
        from digitalocean_sdk.entity.api_dropbox_oauth2_get_tokens_output_entity import ApiDropboxOauth2GetTokensOutputEntity
        return ApiDropboxOauth2GetTokensOutputEntity(self, data)


    def ApiGenerateOauth2UrlOutput(self, data=None) -> "ApiGenerateOauth2UrlOutputEntity":
        """Entity factory: client.ApiGenerateOauth2UrlOutput().list() / client.ApiGenerateOauth2UrlOutput().load({"id": ...})."""
        from digitalocean_sdk.entity.api_generate_oauth2_url_output_entity import ApiGenerateOauth2UrlOutputEntity
        return ApiGenerateOauth2UrlOutputEntity(self, data)


    def ApiGenerateScenarioSetOutput(self, data=None) -> "ApiGenerateScenarioSetOutputEntity":
        """Entity factory: client.ApiGenerateScenarioSetOutput().list() / client.ApiGenerateScenarioSetOutput().load({"id": ...})."""
        from digitalocean_sdk.entity.api_generate_scenario_set_output_entity import ApiGenerateScenarioSetOutputEntity
        return ApiGenerateScenarioSetOutputEntity(self, data)


    def ApiGetAgentOutput(self, data=None) -> "ApiGetAgentOutputEntity":
        """Entity factory: client.ApiGetAgentOutput().list() / client.ApiGetAgentOutput().load({"id": ...})."""
        from digitalocean_sdk.entity.api_get_agent_output_entity import ApiGetAgentOutputEntity
        return ApiGetAgentOutputEntity(self, data)


    def ApiGetAgentUsageOutput(self, data=None) -> "ApiGetAgentUsageOutputEntity":
        """Entity factory: client.ApiGetAgentUsageOutput().list() / client.ApiGetAgentUsageOutput().load({"id": ...})."""
        from digitalocean_sdk.entity.api_get_agent_usage_output_entity import ApiGetAgentUsageOutputEntity
        return ApiGetAgentUsageOutputEntity(self, data)


    def ApiGetAnthropicApiKeyOutput(self, data=None) -> "ApiGetAnthropicApiKeyOutputEntity":
        """Entity factory: client.ApiGetAnthropicApiKeyOutput().list() / client.ApiGetAnthropicApiKeyOutput().load({"id": ...})."""
        from digitalocean_sdk.entity.api_get_anthropic_api_key_output_entity import ApiGetAnthropicApiKeyOutputEntity
        return ApiGetAnthropicApiKeyOutputEntity(self, data)


    def ApiGetChildrenOutput(self, data=None) -> "ApiGetChildrenOutputEntity":
        """Entity factory: client.ApiGetChildrenOutput().list() / client.ApiGetChildrenOutput().load({"id": ...})."""
        from digitalocean_sdk.entity.api_get_children_output_entity import ApiGetChildrenOutputEntity
        return ApiGetChildrenOutputEntity(self, data)


    def ApiGetCustomModelOutputPublic(self, data=None) -> "ApiGetCustomModelOutputPublicEntity":
        """Entity factory: client.ApiGetCustomModelOutputPublic().list() / client.ApiGetCustomModelOutputPublic().load({"id": ...})."""
        from digitalocean_sdk.entity.api_get_custom_model_output_public_entity import ApiGetCustomModelOutputPublicEntity
        return ApiGetCustomModelOutputPublicEntity(self, data)


    def ApiGetEvaluationDatasetDownloadUrlOutput(self, data=None) -> "ApiGetEvaluationDatasetDownloadUrlOutputEntity":
        """Entity factory: client.ApiGetEvaluationDatasetDownloadUrlOutput().list() / client.ApiGetEvaluationDatasetDownloadUrlOutput().load({"id": ...})."""
        from digitalocean_sdk.entity.api_get_evaluation_dataset_download_url_output_entity import ApiGetEvaluationDatasetDownloadUrlOutputEntity
        return ApiGetEvaluationDatasetDownloadUrlOutputEntity(self, data)


    def ApiGetEvaluationRunOutput(self, data=None) -> "ApiGetEvaluationRunOutputEntity":
        """Entity factory: client.ApiGetEvaluationRunOutput().list() / client.ApiGetEvaluationRunOutput().load({"id": ...})."""
        from digitalocean_sdk.entity.api_get_evaluation_run_output_entity import ApiGetEvaluationRunOutputEntity
        return ApiGetEvaluationRunOutputEntity(self, data)


    def ApiGetEvaluationRunResultsOutput(self, data=None) -> "ApiGetEvaluationRunResultsOutputEntity":
        """Entity factory: client.ApiGetEvaluationRunResultsOutput().list() / client.ApiGetEvaluationRunResultsOutput().load({"id": ...})."""
        from digitalocean_sdk.entity.api_get_evaluation_run_results_output_entity import ApiGetEvaluationRunResultsOutputEntity
        return ApiGetEvaluationRunResultsOutputEntity(self, data)


    def ApiGetEvaluationTestCaseOutput(self, data=None) -> "ApiGetEvaluationTestCaseOutputEntity":
        """Entity factory: client.ApiGetEvaluationTestCaseOutput().list() / client.ApiGetEvaluationTestCaseOutput().load({"id": ...})."""
        from digitalocean_sdk.entity.api_get_evaluation_test_case_output_entity import ApiGetEvaluationTestCaseOutputEntity
        return ApiGetEvaluationTestCaseOutputEntity(self, data)


    def ApiGetIndexingJobDetailsSignedUrlOutput(self, data=None) -> "ApiGetIndexingJobDetailsSignedUrlOutputEntity":
        """Entity factory: client.ApiGetIndexingJobDetailsSignedUrlOutput().list() / client.ApiGetIndexingJobDetailsSignedUrlOutput().load({"id": ...})."""
        from digitalocean_sdk.entity.api_get_indexing_job_details_signed_url_output_entity import ApiGetIndexingJobDetailsSignedUrlOutputEntity
        return ApiGetIndexingJobDetailsSignedUrlOutputEntity(self, data)


    def ApiGetKnowledgeBaseIndexingJobOutput(self, data=None) -> "ApiGetKnowledgeBaseIndexingJobOutputEntity":
        """Entity factory: client.ApiGetKnowledgeBaseIndexingJobOutput().list() / client.ApiGetKnowledgeBaseIndexingJobOutput().load({"id": ...})."""
        from digitalocean_sdk.entity.api_get_knowledge_base_indexing_job_output_entity import ApiGetKnowledgeBaseIndexingJobOutputEntity
        return ApiGetKnowledgeBaseIndexingJobOutputEntity(self, data)


    def ApiGetKnowledgeBaseOutput(self, data=None) -> "ApiGetKnowledgeBaseOutputEntity":
        """Entity factory: client.ApiGetKnowledgeBaseOutput().list() / client.ApiGetKnowledgeBaseOutput().load({"id": ...})."""
        from digitalocean_sdk.entity.api_get_knowledge_base_output_entity import ApiGetKnowledgeBaseOutputEntity
        return ApiGetKnowledgeBaseOutputEntity(self, data)


    def ApiGetModelEvaluationRunOutput(self, data=None) -> "ApiGetModelEvaluationRunOutputEntity":
        """Entity factory: client.ApiGetModelEvaluationRunOutput().list() / client.ApiGetModelEvaluationRunOutput().load({"id": ...})."""
        from digitalocean_sdk.entity.api_get_model_evaluation_run_output_entity import ApiGetModelEvaluationRunOutputEntity
        return ApiGetModelEvaluationRunOutputEntity(self, data)


    def ApiGetModelEvaluationRunResultsDownloadUrlOutput(self, data=None) -> "ApiGetModelEvaluationRunResultsDownloadUrlOutputEntity":
        """Entity factory: client.ApiGetModelEvaluationRunResultsDownloadUrlOutput().list() / client.ApiGetModelEvaluationRunResultsDownloadUrlOutput().load({"id": ...})."""
        from digitalocean_sdk.entity.api_get_model_evaluation_run_results_download_url_output_entity import ApiGetModelEvaluationRunResultsDownloadUrlOutputEntity
        return ApiGetModelEvaluationRunResultsDownloadUrlOutputEntity(self, data)


    def ApiGetModelRouterOutput(self, data=None) -> "ApiGetModelRouterOutputEntity":
        """Entity factory: client.ApiGetModelRouterOutput().list() / client.ApiGetModelRouterOutput().load({"id": ...})."""
        from digitalocean_sdk.entity.api_get_model_router_output_entity import ApiGetModelRouterOutputEntity
        return ApiGetModelRouterOutputEntity(self, data)


    def ApiGetOpenAiapiKeyOutput(self, data=None) -> "ApiGetOpenAiapiKeyOutputEntity":
        """Entity factory: client.ApiGetOpenAiapiKeyOutput().list() / client.ApiGetOpenAiapiKeyOutput().load({"id": ...})."""
        from digitalocean_sdk.entity.api_get_open_aiapi_key_output_entity import ApiGetOpenAiapiKeyOutputEntity
        return ApiGetOpenAiapiKeyOutputEntity(self, data)


    def ApiGetScenarioSetDownloadUrlOutput(self, data=None) -> "ApiGetScenarioSetDownloadUrlOutputEntity":
        """Entity factory: client.ApiGetScenarioSetDownloadUrlOutput().list() / client.ApiGetScenarioSetDownloadUrlOutput().load({"id": ...})."""
        from digitalocean_sdk.entity.api_get_scenario_set_download_url_output_entity import ApiGetScenarioSetDownloadUrlOutputEntity
        return ApiGetScenarioSetDownloadUrlOutputEntity(self, data)


    def ApiGetScenarioSetOutput(self, data=None) -> "ApiGetScenarioSetOutputEntity":
        """Entity factory: client.ApiGetScenarioSetOutput().list() / client.ApiGetScenarioSetOutput().load({"id": ...})."""
        from digitalocean_sdk.entity.api_get_scenario_set_output_entity import ApiGetScenarioSetOutputEntity
        return ApiGetScenarioSetOutputEntity(self, data)


    def ApiGetScheduledIndexingOutput(self, data=None) -> "ApiGetScheduledIndexingOutputEntity":
        """Entity factory: client.ApiGetScheduledIndexingOutput().list() / client.ApiGetScheduledIndexingOutput().load({"id": ...})."""
        from digitalocean_sdk.entity.api_get_scheduled_indexing_output_entity import ApiGetScheduledIndexingOutputEntity
        return ApiGetScheduledIndexingOutputEntity(self, data)


    def ApiGetSimulationJourneyTrajectoryUrlOutput(self, data=None) -> "ApiGetSimulationJourneyTrajectoryUrlOutputEntity":
        """Entity factory: client.ApiGetSimulationJourneyTrajectoryUrlOutput().list() / client.ApiGetSimulationJourneyTrajectoryUrlOutput().load({"id": ...})."""
        from digitalocean_sdk.entity.api_get_simulation_journey_trajectory_url_output_entity import ApiGetSimulationJourneyTrajectoryUrlOutputEntity
        return ApiGetSimulationJourneyTrajectoryUrlOutputEntity(self, data)


    def ApiGetSimulationRunOutput(self, data=None) -> "ApiGetSimulationRunOutputEntity":
        """Entity factory: client.ApiGetSimulationRunOutput().list() / client.ApiGetSimulationRunOutput().load({"id": ...})."""
        from digitalocean_sdk.entity.api_get_simulation_run_output_entity import ApiGetSimulationRunOutputEntity
        return ApiGetSimulationRunOutputEntity(self, data)


    def ApiGetWorkspaceOutput(self, data=None) -> "ApiGetWorkspaceOutputEntity":
        """Entity factory: client.ApiGetWorkspaceOutput().list() / client.ApiGetWorkspaceOutput().load({"id": ...})."""
        from digitalocean_sdk.entity.api_get_workspace_output_entity import ApiGetWorkspaceOutputEntity
        return ApiGetWorkspaceOutputEntity(self, data)


    def ApiImportCustomModelOutputPublic(self, data=None) -> "ApiImportCustomModelOutputPublicEntity":
        """Entity factory: client.ApiImportCustomModelOutputPublic().list() / client.ApiImportCustomModelOutputPublic().load({"id": ...})."""
        from digitalocean_sdk.entity.api_import_custom_model_output_public_entity import ApiImportCustomModelOutputPublicEntity
        return ApiImportCustomModelOutputPublicEntity(self, data)


    def ApiIndexedDataSource(self, data=None) -> "ApiIndexedDataSourceEntity":
        """Entity factory: client.ApiIndexedDataSource().list() / client.ApiIndexedDataSource().load({"id": ...})."""
        from digitalocean_sdk.entity.api_indexed_data_source_entity import ApiIndexedDataSourceEntity
        return ApiIndexedDataSourceEntity(self, data)


    def ApiLinkAgentFunctionOutput(self, data=None) -> "ApiLinkAgentFunctionOutputEntity":
        """Entity factory: client.ApiLinkAgentFunctionOutput().list() / client.ApiLinkAgentFunctionOutput().load({"id": ...})."""
        from digitalocean_sdk.entity.api_link_agent_function_output_entity import ApiLinkAgentFunctionOutputEntity
        return ApiLinkAgentFunctionOutputEntity(self, data)


    def ApiLinkAgentGuardrailOutput(self, data=None) -> "ApiLinkAgentGuardrailOutputEntity":
        """Entity factory: client.ApiLinkAgentGuardrailOutput().list() / client.ApiLinkAgentGuardrailOutput().load({"id": ...})."""
        from digitalocean_sdk.entity.api_link_agent_guardrail_output_entity import ApiLinkAgentGuardrailOutputEntity
        return ApiLinkAgentGuardrailOutputEntity(self, data)


    def ApiLinkAgentOutput(self, data=None) -> "ApiLinkAgentOutputEntity":
        """Entity factory: client.ApiLinkAgentOutput().list() / client.ApiLinkAgentOutput().load({"id": ...})."""
        from digitalocean_sdk.entity.api_link_agent_output_entity import ApiLinkAgentOutputEntity
        return ApiLinkAgentOutputEntity(self, data)


    def ApiLinkKnowledgeBaseOutput(self, data=None) -> "ApiLinkKnowledgeBaseOutputEntity":
        """Entity factory: client.ApiLinkKnowledgeBaseOutput().list() / client.ApiLinkKnowledgeBaseOutput().load({"id": ...})."""
        from digitalocean_sdk.entity.api_link_knowledge_base_output_entity import ApiLinkKnowledgeBaseOutputEntity
        return ApiLinkKnowledgeBaseOutputEntity(self, data)


    def ApiListAgentApiKeysOutput(self, data=None) -> "ApiListAgentApiKeysOutputEntity":
        """Entity factory: client.ApiListAgentApiKeysOutput().list() / client.ApiListAgentApiKeysOutput().load({"id": ...})."""
        from digitalocean_sdk.entity.api_list_agent_api_keys_output_entity import ApiListAgentApiKeysOutputEntity
        return ApiListAgentApiKeysOutputEntity(self, data)


    def ApiListAgentsByAnthropicKeyOutput(self, data=None) -> "ApiListAgentsByAnthropicKeyOutputEntity":
        """Entity factory: client.ApiListAgentsByAnthropicKeyOutput().list() / client.ApiListAgentsByAnthropicKeyOutput().load({"id": ...})."""
        from digitalocean_sdk.entity.api_list_agents_by_anthropic_key_output_entity import ApiListAgentsByAnthropicKeyOutputEntity
        return ApiListAgentsByAnthropicKeyOutputEntity(self, data)


    def ApiListAgentsByOpenAiKeyOutput(self, data=None) -> "ApiListAgentsByOpenAiKeyOutputEntity":
        """Entity factory: client.ApiListAgentsByOpenAiKeyOutput().list() / client.ApiListAgentsByOpenAiKeyOutput().load({"id": ...})."""
        from digitalocean_sdk.entity.api_list_agents_by_open_ai_key_output_entity import ApiListAgentsByOpenAiKeyOutputEntity
        return ApiListAgentsByOpenAiKeyOutputEntity(self, data)


    def ApiListAgentsByWorkspaceOutput(self, data=None) -> "ApiListAgentsByWorkspaceOutputEntity":
        """Entity factory: client.ApiListAgentsByWorkspaceOutput().list() / client.ApiListAgentsByWorkspaceOutput().load({"id": ...})."""
        from digitalocean_sdk.entity.api_list_agents_by_workspace_output_entity import ApiListAgentsByWorkspaceOutputEntity
        return ApiListAgentsByWorkspaceOutputEntity(self, data)


    def ApiListEvaluationMetricsOutput(self, data=None) -> "ApiListEvaluationMetricsOutputEntity":
        """Entity factory: client.ApiListEvaluationMetricsOutput().list() / client.ApiListEvaluationMetricsOutput().load({"id": ...})."""
        from digitalocean_sdk.entity.api_list_evaluation_metrics_output_entity import ApiListEvaluationMetricsOutputEntity
        return ApiListEvaluationMetricsOutputEntity(self, data)


    def ApiListEvaluationRunsByTestCaseOutput(self, data=None) -> "ApiListEvaluationRunsByTestCaseOutputEntity":
        """Entity factory: client.ApiListEvaluationRunsByTestCaseOutput().list() / client.ApiListEvaluationRunsByTestCaseOutput().load({"id": ...})."""
        from digitalocean_sdk.entity.api_list_evaluation_runs_by_test_case_output_entity import ApiListEvaluationRunsByTestCaseOutputEntity
        return ApiListEvaluationRunsByTestCaseOutputEntity(self, data)


    def ApiListEvaluationTestCasesByWorkspaceOutput(self, data=None) -> "ApiListEvaluationTestCasesByWorkspaceOutputEntity":
        """Entity factory: client.ApiListEvaluationTestCasesByWorkspaceOutput().list() / client.ApiListEvaluationTestCasesByWorkspaceOutput().load({"id": ...})."""
        from digitalocean_sdk.entity.api_list_evaluation_test_cases_by_workspace_output_entity import ApiListEvaluationTestCasesByWorkspaceOutputEntity
        return ApiListEvaluationTestCasesByWorkspaceOutputEntity(self, data)


    def ApiListKnowledgeBaseDataSourcesOutput(self, data=None) -> "ApiListKnowledgeBaseDataSourcesOutputEntity":
        """Entity factory: client.ApiListKnowledgeBaseDataSourcesOutput().list() / client.ApiListKnowledgeBaseDataSourcesOutput().load({"id": ...})."""
        from digitalocean_sdk.entity.api_list_knowledge_base_data_sources_output_entity import ApiListKnowledgeBaseDataSourcesOutputEntity
        return ApiListKnowledgeBaseDataSourcesOutputEntity(self, data)


    def ApiListKnowledgeBaseIndexingJobsOutput(self, data=None) -> "ApiListKnowledgeBaseIndexingJobsOutputEntity":
        """Entity factory: client.ApiListKnowledgeBaseIndexingJobsOutput().list() / client.ApiListKnowledgeBaseIndexingJobsOutput().load({"id": ...})."""
        from digitalocean_sdk.entity.api_list_knowledge_base_indexing_jobs_output_entity import ApiListKnowledgeBaseIndexingJobsOutputEntity
        return ApiListKnowledgeBaseIndexingJobsOutputEntity(self, data)


    def ApiListModelEvaluationMetricsOutput(self, data=None) -> "ApiListModelEvaluationMetricsOutputEntity":
        """Entity factory: client.ApiListModelEvaluationMetricsOutput().list() / client.ApiListModelEvaluationMetricsOutput().load({"id": ...})."""
        from digitalocean_sdk.entity.api_list_model_evaluation_metrics_output_entity import ApiListModelEvaluationMetricsOutputEntity
        return ApiListModelEvaluationMetricsOutputEntity(self, data)


    def ApiListScenarioLibraryOutput(self, data=None) -> "ApiListScenarioLibraryOutputEntity":
        """Entity factory: client.ApiListScenarioLibraryOutput().list() / client.ApiListScenarioLibraryOutput().load({"id": ...})."""
        from digitalocean_sdk.entity.api_list_scenario_library_output_entity import ApiListScenarioLibraryOutputEntity
        return ApiListScenarioLibraryOutputEntity(self, data)


    def ApiListScenariosOutput(self, data=None) -> "ApiListScenariosOutputEntity":
        """Entity factory: client.ApiListScenariosOutput().list() / client.ApiListScenariosOutput().load({"id": ...})."""
        from digitalocean_sdk.entity.api_list_scenarios_output_entity import ApiListScenariosOutputEntity
        return ApiListScenariosOutputEntity(self, data)


    def ApiListSimulationJourneysOutput(self, data=None) -> "ApiListSimulationJourneysOutputEntity":
        """Entity factory: client.ApiListSimulationJourneysOutput().list() / client.ApiListSimulationJourneysOutput().load({"id": ...})."""
        from digitalocean_sdk.entity.api_list_simulation_journeys_output_entity import ApiListSimulationJourneysOutputEntity
        return ApiListSimulationJourneysOutputEntity(self, data)


    def ApiModelCatalogCard(self, data=None) -> "ApiModelCatalogCardEntity":
        """Entity factory: client.ApiModelCatalogCard().list() / client.ApiModelCatalogCard().load({"id": ...})."""
        from digitalocean_sdk.entity.api_model_catalog_card_entity import ApiModelCatalogCardEntity
        return ApiModelCatalogCardEntity(self, data)


    def ApiModelEvaluationPreset(self, data=None) -> "ApiModelEvaluationPresetEntity":
        """Entity factory: client.ApiModelEvaluationPreset().list() / client.ApiModelEvaluationPreset().load({"id": ...})."""
        from digitalocean_sdk.entity.api_model_evaluation_preset_entity import ApiModelEvaluationPresetEntity
        return ApiModelEvaluationPresetEntity(self, data)


    def ApiModelPublic(self, data=None) -> "ApiModelPublicEntity":
        """Entity factory: client.ApiModelPublic().list() / client.ApiModelPublic().load({"id": ...})."""
        from digitalocean_sdk.entity.api_model_public_entity import ApiModelPublicEntity
        return ApiModelPublicEntity(self, data)


    def ApiModelRouterPreset(self, data=None) -> "ApiModelRouterPresetEntity":
        """Entity factory: client.ApiModelRouterPreset().list() / client.ApiModelRouterPreset().load({"id": ...})."""
        from digitalocean_sdk.entity.api_model_router_preset_entity import ApiModelRouterPresetEntity
        return ApiModelRouterPresetEntity(self, data)


    def ApiModelRouterTaskPreset(self, data=None) -> "ApiModelRouterTaskPresetEntity":
        """Entity factory: client.ApiModelRouterTaskPreset().list() / client.ApiModelRouterTaskPreset().load({"id": ...})."""
        from digitalocean_sdk.entity.api_model_router_task_preset_entity import ApiModelRouterTaskPresetEntity
        return ApiModelRouterTaskPresetEntity(self, data)


    def ApiMoveAgentsToWorkspaceOutput(self, data=None) -> "ApiMoveAgentsToWorkspaceOutputEntity":
        """Entity factory: client.ApiMoveAgentsToWorkspaceOutput().list() / client.ApiMoveAgentsToWorkspaceOutput().load({"id": ...})."""
        from digitalocean_sdk.entity.api_move_agents_to_workspace_output_entity import ApiMoveAgentsToWorkspaceOutputEntity
        return ApiMoveAgentsToWorkspaceOutputEntity(self, data)


    def ApiPrompt(self, data=None) -> "ApiPromptEntity":
        """Entity factory: client.ApiPrompt().list() / client.ApiPrompt().load({"id": ...})."""
        from digitalocean_sdk.entity.api_prompt_entity import ApiPromptEntity
        return ApiPromptEntity(self, data)


    def ApiRollbackToAgentVersionOutput(self, data=None) -> "ApiRollbackToAgentVersionOutputEntity":
        """Entity factory: client.ApiRollbackToAgentVersionOutput().list() / client.ApiRollbackToAgentVersionOutput().load({"id": ...})."""
        from digitalocean_sdk.entity.api_rollback_to_agent_version_output_entity import ApiRollbackToAgentVersionOutputEntity
        return ApiRollbackToAgentVersionOutputEntity(self, data)


    def ApiSimulationJourney(self, data=None) -> "ApiSimulationJourneyEntity":
        """Entity factory: client.ApiSimulationJourney().list() / client.ApiSimulationJourney().load({"id": ...})."""
        from digitalocean_sdk.entity.api_simulation_journey_entity import ApiSimulationJourneyEntity
        return ApiSimulationJourneyEntity(self, data)


    def ApiSimulationTrajectory(self, data=None) -> "ApiSimulationTrajectoryEntity":
        """Entity factory: client.ApiSimulationTrajectory().list() / client.ApiSimulationTrajectory().load({"id": ...})."""
        from digitalocean_sdk.entity.api_simulation_trajectory_entity import ApiSimulationTrajectoryEntity
        return ApiSimulationTrajectoryEntity(self, data)


    def ApiUnlinkAgentFunctionOutput(self, data=None) -> "ApiUnlinkAgentFunctionOutputEntity":
        """Entity factory: client.ApiUnlinkAgentFunctionOutput().list() / client.ApiUnlinkAgentFunctionOutput().load({"id": ...})."""
        from digitalocean_sdk.entity.api_unlink_agent_function_output_entity import ApiUnlinkAgentFunctionOutputEntity
        return ApiUnlinkAgentFunctionOutputEntity(self, data)


    def ApiUnlinkAgentGuardrailOutput(self, data=None) -> "ApiUnlinkAgentGuardrailOutputEntity":
        """Entity factory: client.ApiUnlinkAgentGuardrailOutput().list() / client.ApiUnlinkAgentGuardrailOutput().load({"id": ...})."""
        from digitalocean_sdk.entity.api_unlink_agent_guardrail_output_entity import ApiUnlinkAgentGuardrailOutputEntity
        return ApiUnlinkAgentGuardrailOutputEntity(self, data)


    def ApiUnlinkAgentOutput(self, data=None) -> "ApiUnlinkAgentOutputEntity":
        """Entity factory: client.ApiUnlinkAgentOutput().list() / client.ApiUnlinkAgentOutput().load({"id": ...})."""
        from digitalocean_sdk.entity.api_unlink_agent_output_entity import ApiUnlinkAgentOutputEntity
        return ApiUnlinkAgentOutputEntity(self, data)


    def ApiUnlinkKnowledgeBaseOutput(self, data=None) -> "ApiUnlinkKnowledgeBaseOutputEntity":
        """Entity factory: client.ApiUnlinkKnowledgeBaseOutput().list() / client.ApiUnlinkKnowledgeBaseOutput().load({"id": ...})."""
        from digitalocean_sdk.entity.api_unlink_knowledge_base_output_entity import ApiUnlinkKnowledgeBaseOutputEntity
        return ApiUnlinkKnowledgeBaseOutputEntity(self, data)


    def ApiUpdateAgentApiKeyOutput(self, data=None) -> "ApiUpdateAgentApiKeyOutputEntity":
        """Entity factory: client.ApiUpdateAgentApiKeyOutput().list() / client.ApiUpdateAgentApiKeyOutput().load({"id": ...})."""
        from digitalocean_sdk.entity.api_update_agent_api_key_output_entity import ApiUpdateAgentApiKeyOutputEntity
        return ApiUpdateAgentApiKeyOutputEntity(self, data)


    def ApiUpdateAgentFunctionOutput(self, data=None) -> "ApiUpdateAgentFunctionOutputEntity":
        """Entity factory: client.ApiUpdateAgentFunctionOutput().list() / client.ApiUpdateAgentFunctionOutput().load({"id": ...})."""
        from digitalocean_sdk.entity.api_update_agent_function_output_entity import ApiUpdateAgentFunctionOutputEntity
        return ApiUpdateAgentFunctionOutputEntity(self, data)


    def ApiUpdateAgentOutput(self, data=None) -> "ApiUpdateAgentOutputEntity":
        """Entity factory: client.ApiUpdateAgentOutput().list() / client.ApiUpdateAgentOutput().load({"id": ...})."""
        from digitalocean_sdk.entity.api_update_agent_output_entity import ApiUpdateAgentOutputEntity
        return ApiUpdateAgentOutputEntity(self, data)


    def ApiUpdateAnthropicApiKeyOutput(self, data=None) -> "ApiUpdateAnthropicApiKeyOutputEntity":
        """Entity factory: client.ApiUpdateAnthropicApiKeyOutput().list() / client.ApiUpdateAnthropicApiKeyOutput().load({"id": ...})."""
        from digitalocean_sdk.entity.api_update_anthropic_api_key_output_entity import ApiUpdateAnthropicApiKeyOutputEntity
        return ApiUpdateAnthropicApiKeyOutputEntity(self, data)


    def ApiUpdateCustomEvaluationMetricOutput(self, data=None) -> "ApiUpdateCustomEvaluationMetricOutputEntity":
        """Entity factory: client.ApiUpdateCustomEvaluationMetricOutput().list() / client.ApiUpdateCustomEvaluationMetricOutput().load({"id": ...})."""
        from digitalocean_sdk.entity.api_update_custom_evaluation_metric_output_entity import ApiUpdateCustomEvaluationMetricOutputEntity
        return ApiUpdateCustomEvaluationMetricOutputEntity(self, data)


    def ApiUpdateEvaluationTestCaseOutput(self, data=None) -> "ApiUpdateEvaluationTestCaseOutputEntity":
        """Entity factory: client.ApiUpdateEvaluationTestCaseOutput().list() / client.ApiUpdateEvaluationTestCaseOutput().load({"id": ...})."""
        from digitalocean_sdk.entity.api_update_evaluation_test_case_output_entity import ApiUpdateEvaluationTestCaseOutputEntity
        return ApiUpdateEvaluationTestCaseOutputEntity(self, data)


    def ApiUpdateKnowledgeBaseDataSourceOutput(self, data=None) -> "ApiUpdateKnowledgeBaseDataSourceOutputEntity":
        """Entity factory: client.ApiUpdateKnowledgeBaseDataSourceOutput().list() / client.ApiUpdateKnowledgeBaseDataSourceOutput().load({"id": ...})."""
        from digitalocean_sdk.entity.api_update_knowledge_base_data_source_output_entity import ApiUpdateKnowledgeBaseDataSourceOutputEntity
        return ApiUpdateKnowledgeBaseDataSourceOutputEntity(self, data)


    def ApiUpdateKnowledgeBaseOutput(self, data=None) -> "ApiUpdateKnowledgeBaseOutputEntity":
        """Entity factory: client.ApiUpdateKnowledgeBaseOutput().list() / client.ApiUpdateKnowledgeBaseOutput().load({"id": ...})."""
        from digitalocean_sdk.entity.api_update_knowledge_base_output_entity import ApiUpdateKnowledgeBaseOutputEntity
        return ApiUpdateKnowledgeBaseOutputEntity(self, data)


    def ApiUpdateLinkedAgentOutput(self, data=None) -> "ApiUpdateLinkedAgentOutputEntity":
        """Entity factory: client.ApiUpdateLinkedAgentOutput().list() / client.ApiUpdateLinkedAgentOutput().load({"id": ...})."""
        from digitalocean_sdk.entity.api_update_linked_agent_output_entity import ApiUpdateLinkedAgentOutputEntity
        return ApiUpdateLinkedAgentOutputEntity(self, data)


    def ApiUpdateModelApiKeyOutput(self, data=None) -> "ApiUpdateModelApiKeyOutputEntity":
        """Entity factory: client.ApiUpdateModelApiKeyOutput().list() / client.ApiUpdateModelApiKeyOutput().load({"id": ...})."""
        from digitalocean_sdk.entity.api_update_model_api_key_output_entity import ApiUpdateModelApiKeyOutputEntity
        return ApiUpdateModelApiKeyOutputEntity(self, data)


    def ApiUpdateModelEvaluationRunOutput(self, data=None) -> "ApiUpdateModelEvaluationRunOutputEntity":
        """Entity factory: client.ApiUpdateModelEvaluationRunOutput().list() / client.ApiUpdateModelEvaluationRunOutput().load({"id": ...})."""
        from digitalocean_sdk.entity.api_update_model_evaluation_run_output_entity import ApiUpdateModelEvaluationRunOutputEntity
        return ApiUpdateModelEvaluationRunOutputEntity(self, data)


    def ApiUpdateModelRouterOutput(self, data=None) -> "ApiUpdateModelRouterOutputEntity":
        """Entity factory: client.ApiUpdateModelRouterOutput().list() / client.ApiUpdateModelRouterOutput().load({"id": ...})."""
        from digitalocean_sdk.entity.api_update_model_router_output_entity import ApiUpdateModelRouterOutputEntity
        return ApiUpdateModelRouterOutputEntity(self, data)


    def ApiUpdateOpenAiapiKeyOutput(self, data=None) -> "ApiUpdateOpenAiapiKeyOutputEntity":
        """Entity factory: client.ApiUpdateOpenAiapiKeyOutput().list() / client.ApiUpdateOpenAiapiKeyOutput().load({"id": ...})."""
        from digitalocean_sdk.entity.api_update_open_aiapi_key_output_entity import ApiUpdateOpenAiapiKeyOutputEntity
        return ApiUpdateOpenAiapiKeyOutputEntity(self, data)


    def ApiUpdateScenarioSetOutput(self, data=None) -> "ApiUpdateScenarioSetOutputEntity":
        """Entity factory: client.ApiUpdateScenarioSetOutput().list() / client.ApiUpdateScenarioSetOutput().load({"id": ...})."""
        from digitalocean_sdk.entity.api_update_scenario_set_output_entity import ApiUpdateScenarioSetOutputEntity
        return ApiUpdateScenarioSetOutputEntity(self, data)


    def ApiUpdateSimulationRunOutput(self, data=None) -> "ApiUpdateSimulationRunOutputEntity":
        """Entity factory: client.ApiUpdateSimulationRunOutput().list() / client.ApiUpdateSimulationRunOutput().load({"id": ...})."""
        from digitalocean_sdk.entity.api_update_simulation_run_output_entity import ApiUpdateSimulationRunOutputEntity
        return ApiUpdateSimulationRunOutputEntity(self, data)


    def ApiUpdateWorkspaceOutput(self, data=None) -> "ApiUpdateWorkspaceOutputEntity":
        """Entity factory: client.ApiUpdateWorkspaceOutput().list() / client.ApiUpdateWorkspaceOutput().load({"id": ...})."""
        from digitalocean_sdk.entity.api_update_workspace_output_entity import ApiUpdateWorkspaceOutputEntity
        return ApiUpdateWorkspaceOutputEntity(self, data)


    def App(self, data=None) -> "AppEntity":
        """Entity factory: client.App().list() / client.App().load({"id": ...})."""
        from digitalocean_sdk.entity.app_entity import AppEntity
        return AppEntity(self, data)


    def AppAlert(self, data=None) -> "AppAlertEntity":
        """Entity factory: client.AppAlert().list() / client.AppAlert().load({"id": ...})."""
        from digitalocean_sdk.entity.app_alert_entity import AppAlertEntity
        return AppAlertEntity(self, data)


    def AppEvent(self, data=None) -> "AppEventEntity":
        """Entity factory: client.AppEvent().list() / client.AppEvent().load({"id": ...})."""
        from digitalocean_sdk.entity.app_event_entity import AppEventEntity
        return AppEventEntity(self, data)


    def AppHealth(self, data=None) -> "AppHealthEntity":
        """Entity factory: client.AppHealth().list() / client.AppHealth().load({"id": ...})."""
        from digitalocean_sdk.entity.app_health_entity import AppHealthEntity
        return AppHealthEntity(self, data)


    def AppInstance(self, data=None) -> "AppInstanceEntity":
        """Entity factory: client.AppInstance().list() / client.AppInstance().load({"id": ...})."""
        from digitalocean_sdk.entity.app_instance_entity import AppInstanceEntity
        return AppInstanceEntity(self, data)


    def AppJobInvocation(self, data=None) -> "AppJobInvocationEntity":
        """Entity factory: client.AppJobInvocation().list() / client.AppJobInvocation().load({"id": ...})."""
        from digitalocean_sdk.entity.app_job_invocation_entity import AppJobInvocationEntity
        return AppJobInvocationEntity(self, data)


    def AppMetricsBandwidthUsage(self, data=None) -> "AppMetricsBandwidthUsageEntity":
        """Entity factory: client.AppMetricsBandwidthUsage().list() / client.AppMetricsBandwidthUsage().load({"id": ...})."""
        from digitalocean_sdk.entity.app_metrics_bandwidth_usage_entity import AppMetricsBandwidthUsageEntity
        return AppMetricsBandwidthUsageEntity(self, data)


    def AppPropose(self, data=None) -> "AppProposeEntity":
        """Entity factory: client.AppPropose().list() / client.AppPropose().load({"id": ...})."""
        from digitalocean_sdk.entity.app_propose_entity import AppProposeEntity
        return AppProposeEntity(self, data)


    def AppsDeployment(self, data=None) -> "AppsDeploymentEntity":
        """Entity factory: client.AppsDeployment().list() / client.AppsDeployment().load({"id": ...})."""
        from digitalocean_sdk.entity.apps_deployment_entity import AppsDeploymentEntity
        return AppsDeploymentEntity(self, data)


    def AppsGetExec(self, data=None) -> "AppsGetExecEntity":
        """Entity factory: client.AppsGetExec().list() / client.AppsGetExec().load({"id": ...})."""
        from digitalocean_sdk.entity.apps_get_exec_entity import AppsGetExecEntity
        return AppsGetExecEntity(self, data)


    def AppsGetLog(self, data=None) -> "AppsGetLogEntity":
        """Entity factory: client.AppsGetLog().list() / client.AppsGetLog().load({"id": ...})."""
        from digitalocean_sdk.entity.apps_get_log_entity import AppsGetLogEntity
        return AppsGetLogEntity(self, data)


    def AppsInstanceSize(self, data=None) -> "AppsInstanceSizeEntity":
        """Entity factory: client.AppsInstanceSize().list() / client.AppsInstanceSize().load({"id": ...})."""
        from digitalocean_sdk.entity.apps_instance_size_entity import AppsInstanceSizeEntity
        return AppsInstanceSizeEntity(self, data)


    def AppsRegion(self, data=None) -> "AppsRegionEntity":
        """Entity factory: client.AppsRegion().list() / client.AppsRegion().load({"id": ...})."""
        from digitalocean_sdk.entity.apps_region_entity import AppsRegionEntity
        return AppsRegionEntity(self, data)


    def AssociatedKubernetesResource(self, data=None) -> "AssociatedKubernetesResourceEntity":
        """Entity factory: client.AssociatedKubernetesResource().list() / client.AssociatedKubernetesResource().load({"id": ...})."""
        from digitalocean_sdk.entity.associated_kubernetes_resource_entity import AssociatedKubernetesResourceEntity
        return AssociatedKubernetesResourceEntity(self, data)


    def AssociatedResourceStatus(self, data=None) -> "AssociatedResourceStatusEntity":
        """Entity factory: client.AssociatedResourceStatus().list() / client.AssociatedResourceStatus().load({"id": ...})."""
        from digitalocean_sdk.entity.associated_resource_status_entity import AssociatedResourceStatusEntity
        return AssociatedResourceStatusEntity(self, data)


    def AsyncInvoke(self, data=None) -> "AsyncInvokeEntity":
        """Entity factory: client.AsyncInvoke().list() / client.AsyncInvoke().load({"id": ...})."""
        from digitalocean_sdk.entity.async_invoke_entity import AsyncInvokeEntity
        return AsyncInvokeEntity(self, data)


    def Balance(self, data=None) -> "BalanceEntity":
        """Entity factory: client.Balance().list() / client.Balance().load({"id": ...})."""
        from digitalocean_sdk.entity.balance_entity import BalanceEntity
        return BalanceEntity(self, data)


    def Batch(self, data=None) -> "BatchEntity":
        """Entity factory: client.Batch().list() / client.Batch().load({"id": ...})."""
        from digitalocean_sdk.entity.batch_entity import BatchEntity
        return BatchEntity(self, data)


    def BatchFileCreate(self, data=None) -> "BatchFileCreateEntity":
        """Entity factory: client.BatchFileCreate().list() / client.BatchFileCreate().load({"id": ...})."""
        from digitalocean_sdk.entity.batch_file_create_entity import BatchFileCreateEntity
        return BatchFileCreateEntity(self, data)


    def BatchInference(self, data=None) -> "BatchInferenceEntity":
        """Entity factory: client.BatchInference().list() / client.BatchInference().load({"id": ...})."""
        from digitalocean_sdk.entity.batch_inference_entity import BatchInferenceEntity
        return BatchInferenceEntity(self, data)


    def BatchResult(self, data=None) -> "BatchResultEntity":
        """Entity factory: client.BatchResult().list() / client.BatchResult().load({"id": ...})."""
        from digitalocean_sdk.entity.batch_result_entity import BatchResultEntity
        return BatchResultEntity(self, data)


    def Billing(self, data=None) -> "BillingEntity":
        """Entity factory: client.Billing().list() / client.Billing().load({"id": ...})."""
        from digitalocean_sdk.entity.billing_entity import BillingEntity
        return BillingEntity(self, data)


    def BlockStorage(self, data=None) -> "BlockStorageEntity":
        """Entity factory: client.BlockStorage().list() / client.BlockStorage().load({"id": ...})."""
        from digitalocean_sdk.entity.block_storage_entity import BlockStorageEntity
        return BlockStorageEntity(self, data)


    def BlockStorageAction(self, data=None) -> "BlockStorageActionEntity":
        """Entity factory: client.BlockStorageAction().list() / client.BlockStorageAction().load({"id": ...})."""
        from digitalocean_sdk.entity.block_storage_action_entity import BlockStorageActionEntity
        return BlockStorageActionEntity(self, data)


    def ByoipPrefix(self, data=None) -> "ByoipPrefixEntity":
        """Entity factory: client.ByoipPrefix().list() / client.ByoipPrefix().load({"id": ...})."""
        from digitalocean_sdk.entity.byoip_prefix_entity import ByoipPrefixEntity
        return ByoipPrefixEntity(self, data)


    def CdnEndpoint(self, data=None) -> "CdnEndpointEntity":
        """Entity factory: client.CdnEndpoint().list() / client.CdnEndpoint().load({"id": ...})."""
        from digitalocean_sdk.entity.cdn_endpoint_entity import CdnEndpointEntity
        return CdnEndpointEntity(self, data)


    def Certificate(self, data=None) -> "CertificateEntity":
        """Entity factory: client.Certificate().list() / client.Certificate().load({"id": ...})."""
        from digitalocean_sdk.entity.certificate_entity import CertificateEntity
        return CertificateEntity(self, data)


    def ChatCompletion(self, data=None) -> "ChatCompletionEntity":
        """Entity factory: client.ChatCompletion().list() / client.ChatCompletion().load({"id": ...})."""
        from digitalocean_sdk.entity.chat_completion_entity import ChatCompletionEntity
        return ChatCompletionEntity(self, data)


    def Clusterlint(self, data=None) -> "ClusterlintEntity":
        """Entity factory: client.Clusterlint().list() / client.Clusterlint().load({"id": ...})."""
        from digitalocean_sdk.entity.clusterlint_entity import ClusterlintEntity
        return ClusterlintEntity(self, data)


    def Connection(self, data=None) -> "ConnectionEntity":
        """Entity factory: client.Connection().list() / client.Connection().load({"id": ...})."""
        from digitalocean_sdk.entity.connection_entity import ConnectionEntity
        return ConnectionEntity(self, data)


    def ConnectionPool(self, data=None) -> "ConnectionPoolEntity":
        """Entity factory: client.ConnectionPool().list() / client.ConnectionPool().load({"id": ...})."""
        from digitalocean_sdk.entity.connection_pool_entity import ConnectionPoolEntity
        return ConnectionPoolEntity(self, data)


    def ContainerRegistry(self, data=None) -> "ContainerRegistryEntity":
        """Entity factory: client.ContainerRegistry().list() / client.ContainerRegistry().load({"id": ...})."""
        from digitalocean_sdk.entity.container_registry_entity import ContainerRegistryEntity
        return ContainerRegistryEntity(self, data)


    def CreateResponse(self, data=None) -> "CreateResponseEntity":
        """Entity factory: client.CreateResponse().list() / client.CreateResponse().load({"id": ...})."""
        from digitalocean_sdk.entity.create_response_entity import CreateResponseEntity
        return CreateResponseEntity(self, data)


    def Credential(self, data=None) -> "CredentialEntity":
        """Entity factory: client.Credential().list() / client.Credential().load({"id": ...})."""
        from digitalocean_sdk.entity.credential_entity import CredentialEntity
        return CredentialEntity(self, data)


    def Database(self, data=None) -> "DatabaseEntity":
        """Entity factory: client.Database().list() / client.Database().load({"id": ...})."""
        from digitalocean_sdk.entity.database_entity import DatabaseEntity
        return DatabaseEntity(self, data)


    def DedicatedInference(self, data=None) -> "DedicatedInferenceEntity":
        """Entity factory: client.DedicatedInference().list() / client.DedicatedInference().load({"id": ...})."""
        from digitalocean_sdk.entity.dedicated_inference_entity import DedicatedInferenceEntity
        return DedicatedInferenceEntity(self, data)


    def DedicatedInferenceAccelerator(self, data=None) -> "DedicatedInferenceAcceleratorEntity":
        """Entity factory: client.DedicatedInferenceAccelerator().list() / client.DedicatedInferenceAccelerator().load({"id": ...})."""
        from digitalocean_sdk.entity.dedicated_inference_accelerator_entity import DedicatedInferenceAcceleratorEntity
        return DedicatedInferenceAcceleratorEntity(self, data)


    def DedicatedInferenceGpuModelConfig(self, data=None) -> "DedicatedInferenceGpuModelConfigEntity":
        """Entity factory: client.DedicatedInferenceGpuModelConfig().list() / client.DedicatedInferenceGpuModelConfig().load({"id": ...})."""
        from digitalocean_sdk.entity.dedicated_inference_gpu_model_config_entity import DedicatedInferenceGpuModelConfigEntity
        return DedicatedInferenceGpuModelConfigEntity(self, data)


    def DedicatedInferenceSize(self, data=None) -> "DedicatedInferenceSizeEntity":
        """Entity factory: client.DedicatedInferenceSize().list() / client.DedicatedInferenceSize().load({"id": ...})."""
        from digitalocean_sdk.entity.dedicated_inference_size_entity import DedicatedInferenceSizeEntity
        return DedicatedInferenceSizeEntity(self, data)


    def DockerCredential(self, data=None) -> "DockerCredentialEntity":
        """Entity factory: client.DockerCredential().list() / client.DockerCredential().load({"id": ...})."""
        from digitalocean_sdk.entity.docker_credential_entity import DockerCredentialEntity
        return DockerCredentialEntity(self, data)


    def Domain(self, data=None) -> "DomainEntity":
        """Entity factory: client.Domain().list() / client.Domain().load({"id": ...})."""
        from digitalocean_sdk.entity.domain_entity import DomainEntity
        return DomainEntity(self, data)


    def DomainRecord(self, data=None) -> "DomainRecordEntity":
        """Entity factory: client.DomainRecord().list() / client.DomainRecord().load({"id": ...})."""
        from digitalocean_sdk.entity.domain_record_entity import DomainRecordEntity
        return DomainRecordEntity(self, data)


    def Droplet(self, data=None) -> "DropletEntity":
        """Entity factory: client.Droplet().list() / client.Droplet().load({"id": ...})."""
        from digitalocean_sdk.entity.droplet_entity import DropletEntity
        return DropletEntity(self, data)


    def DropletAction(self, data=None) -> "DropletActionEntity":
        """Entity factory: client.DropletAction().list() / client.DropletAction().load({"id": ...})."""
        from digitalocean_sdk.entity.droplet_action_entity import DropletActionEntity
        return DropletActionEntity(self, data)


    def DropletAutoscalePool(self, data=None) -> "DropletAutoscalePoolEntity":
        """Entity factory: client.DropletAutoscalePool().list() / client.DropletAutoscalePool().load({"id": ...})."""
        from digitalocean_sdk.entity.droplet_autoscale_pool_entity import DropletAutoscalePoolEntity
        return DropletAutoscalePoolEntity(self, data)


    def Embedding(self, data=None) -> "EmbeddingEntity":
        """Entity factory: client.Embedding().list() / client.Embedding().load({"id": ...})."""
        from digitalocean_sdk.entity.embedding_entity import EmbeddingEntity
        return EmbeddingEntity(self, data)


    def Empty(self, data=None) -> "EmptyEntity":
        """Entity factory: client.Empty().list() / client.Empty().load({"id": ...})."""
        from digitalocean_sdk.entity.empty_entity import EmptyEntity
        return EmptyEntity(self, data)


    def Firewall(self, data=None) -> "FirewallEntity":
        """Entity factory: client.Firewall().list() / client.Firewall().load({"id": ...})."""
        from digitalocean_sdk.entity.firewall_entity import FirewallEntity
        return FirewallEntity(self, data)


    def FloatingIp(self, data=None) -> "FloatingIpEntity":
        """Entity factory: client.FloatingIp().list() / client.FloatingIp().load({"id": ...})."""
        from digitalocean_sdk.entity.floating_ip_entity import FloatingIpEntity
        return FloatingIpEntity(self, data)


    def FloatingIpAction(self, data=None) -> "FloatingIpActionEntity":
        """Entity factory: client.FloatingIpAction().list() / client.FloatingIpAction().load({"id": ...})."""
        from digitalocean_sdk.entity.floating_ip_action_entity import FloatingIpActionEntity
        return FloatingIpActionEntity(self, data)


    def FunctionKey(self, data=None) -> "FunctionKeyEntity":
        """Entity factory: client.FunctionKey().list() / client.FunctionKey().load({"id": ...})."""
        from digitalocean_sdk.entity.function_key_entity import FunctionKeyEntity
        return FunctionKeyEntity(self, data)


    def FunctionNamespace(self, data=None) -> "FunctionNamespaceEntity":
        """Entity factory: client.FunctionNamespace().list() / client.FunctionNamespace().load({"id": ...})."""
        from digitalocean_sdk.entity.function_namespace_entity import FunctionNamespaceEntity
        return FunctionNamespaceEntity(self, data)


    def FunctionTrigger(self, data=None) -> "FunctionTriggerEntity":
        """Entity factory: client.FunctionTrigger().list() / client.FunctionTrigger().load({"id": ...})."""
        from digitalocean_sdk.entity.function_trigger_entity import FunctionTriggerEntity
        return FunctionTriggerEntity(self, data)


    def GenaiapiRegion(self, data=None) -> "GenaiapiRegionEntity":
        """Entity factory: client.GenaiapiRegion().list() / client.GenaiapiRegion().load({"id": ...})."""
        from digitalocean_sdk.entity.genaiapi_region_entity import GenaiapiRegionEntity
        return GenaiapiRegionEntity(self, data)


    def Image(self, data=None) -> "ImageEntity":
        """Entity factory: client.Image().list() / client.Image().load({"id": ...})."""
        from digitalocean_sdk.entity.image_entity import ImageEntity
        return ImageEntity(self, data)


    def ImageAction(self, data=None) -> "ImageActionEntity":
        """Entity factory: client.ImageAction().list() / client.ImageAction().load({"id": ...})."""
        from digitalocean_sdk.entity.image_action_entity import ImageActionEntity
        return ImageActionEntity(self, data)


    def Insight(self, data=None) -> "InsightEntity":
        """Entity factory: client.Insight().list() / client.Insight().load({"id": ...})."""
        from digitalocean_sdk.entity.insight_entity import InsightEntity
        return InsightEntity(self, data)


    def InvoiceSummary(self, data=None) -> "InvoiceSummaryEntity":
        """Entity factory: client.InvoiceSummary().list() / client.InvoiceSummary().load({"id": ...})."""
        from digitalocean_sdk.entity.invoice_summary_entity import InvoiceSummaryEntity
        return InvoiceSummaryEntity(self, data)


    def Kubernete(self, data=None) -> "KuberneteEntity":
        """Entity factory: client.Kubernete().list() / client.Kubernete().load({"id": ...})."""
        from digitalocean_sdk.entity.kubernete_entity import KuberneteEntity
        return KuberneteEntity(self, data)


    def KubernetesOption(self, data=None) -> "KubernetesOptionEntity":
        """Entity factory: client.KubernetesOption().list() / client.KubernetesOption().load({"id": ...})."""
        from digitalocean_sdk.entity.kubernetes_option_entity import KubernetesOptionEntity
        return KubernetesOptionEntity(self, data)


    def ListMcpServerTool(self, data=None) -> "ListMcpServerToolEntity":
        """Entity factory: client.ListMcpServerTool().list() / client.ListMcpServerTool().load({"id": ...})."""
        from digitalocean_sdk.entity.list_mcp_server_tool_entity import ListMcpServerToolEntity
        return ListMcpServerToolEntity(self, data)


    def ListProvider(self, data=None) -> "ListProviderEntity":
        """Entity factory: client.ListProvider().list() / client.ListProvider().load({"id": ...})."""
        from digitalocean_sdk.entity.list_provider_entity import ListProviderEntity
        return ListProviderEntity(self, data)


    def ListProviderHealth(self, data=None) -> "ListProviderHealthEntity":
        """Entity factory: client.ListProviderHealth().list() / client.ListProviderHealth().load({"id": ...})."""
        from digitalocean_sdk.entity.list_provider_health_entity import ListProviderHealthEntity
        return ListProviderHealthEntity(self, data)


    def ListTool(self, data=None) -> "ListToolEntity":
        """Entity factory: client.ListTool().list() / client.ListTool().load({"id": ...})."""
        from digitalocean_sdk.entity.list_tool_entity import ListToolEntity
        return ListToolEntity(self, data)


    def ListToolHealth(self, data=None) -> "ListToolHealthEntity":
        """Entity factory: client.ListToolHealth().list() / client.ListToolHealth().load({"id": ...})."""
        from digitalocean_sdk.entity.list_tool_health_entity import ListToolHealthEntity
        return ListToolHealthEntity(self, data)


    def ListToolbeltProvider(self, data=None) -> "ListToolbeltProviderEntity":
        """Entity factory: client.ListToolbeltProvider().list() / client.ListToolbeltProvider().load({"id": ...})."""
        from digitalocean_sdk.entity.list_toolbelt_provider_entity import ListToolbeltProviderEntity
        return ListToolbeltProviderEntity(self, data)


    def ListToolkit(self, data=None) -> "ListToolkitEntity":
        """Entity factory: client.ListToolkit().list() / client.ListToolkit().load({"id": ...})."""
        from digitalocean_sdk.entity.list_toolkit_entity import ListToolkitEntity
        return ListToolkitEntity(self, data)


    def LoadBalancer(self, data=None) -> "LoadBalancerEntity":
        """Entity factory: client.LoadBalancer().list() / client.LoadBalancer().load({"id": ...})."""
        from digitalocean_sdk.entity.load_balancer_entity import LoadBalancerEntity
        return LoadBalancerEntity(self, data)


    def LogsSearch(self, data=None) -> "LogsSearchEntity":
        """Entity factory: client.LogsSearch().list() / client.LogsSearch().load({"id": ...})."""
        from digitalocean_sdk.entity.logs_search_entity import LogsSearchEntity
        return LogsSearchEntity(self, data)


    def Logsink(self, data=None) -> "LogsinkEntity":
        """Entity factory: client.Logsink().list() / client.Logsink().load({"id": ...})."""
        from digitalocean_sdk.entity.logsink_entity import LogsinkEntity
        return LogsinkEntity(self, data)


    def McpServer(self, data=None) -> "McpServerEntity":
        """Entity factory: client.McpServer().list() / client.McpServer().load({"id": ...})."""
        from digitalocean_sdk.entity.mcp_server_entity import McpServerEntity
        return McpServerEntity(self, data)


    def Message(self, data=None) -> "MessageEntity":
        """Entity factory: client.Message().list() / client.Message().load({"id": ...})."""
        from digitalocean_sdk.entity.message_entity import MessageEntity
        return MessageEntity(self, data)


    def Metric(self, data=None) -> "MetricEntity":
        """Entity factory: client.Metric().list() / client.Metric().load({"id": ...})."""
        from digitalocean_sdk.entity.metric_entity import MetricEntity
        return MetricEntity(self, data)


    def Model(self, data=None) -> "ModelEntity":
        """Entity factory: client.Model().list() / client.Model().load({"id": ...})."""
        from digitalocean_sdk.entity.model_entity import ModelEntity
        return ModelEntity(self, data)


    def MonitoringAlert(self, data=None) -> "MonitoringAlertEntity":
        """Entity factory: client.MonitoringAlert().list() / client.MonitoringAlert().load({"id": ...})."""
        from digitalocean_sdk.entity.monitoring_alert_entity import MonitoringAlertEntity
        return MonitoringAlertEntity(self, data)


    def MonitoringSink(self, data=None) -> "MonitoringSinkEntity":
        """Entity factory: client.MonitoringSink().list() / client.MonitoringSink().load({"id": ...})."""
        from digitalocean_sdk.entity.monitoring_sink_entity import MonitoringSinkEntity
        return MonitoringSinkEntity(self, data)


    def MonitoringSinkDestination(self, data=None) -> "MonitoringSinkDestinationEntity":
        """Entity factory: client.MonitoringSinkDestination().list() / client.MonitoringSinkDestination().load({"id": ...})."""
        from digitalocean_sdk.entity.monitoring_sink_destination_entity import MonitoringSinkDestinationEntity
        return MonitoringSinkDestinationEntity(self, data)


    def N1Click(self, data=None) -> "N1ClickEntity":
        """Entity factory: client.N1Click().list() / client.N1Click().load({"id": ...})."""
        from digitalocean_sdk.entity.n1_click_entity import N1ClickEntity
        return N1ClickEntity(self, data)


    def N1ClickApplication(self, data=None) -> "N1ClickApplicationEntity":
        """Entity factory: client.N1ClickApplication().list() / client.N1ClickApplication().load({"id": ...})."""
        from digitalocean_sdk.entity.n1_click_application_entity import N1ClickApplicationEntity
        return N1ClickApplicationEntity(self, data)


    def NeighborId(self, data=None) -> "NeighborIdEntity":
        """Entity factory: client.NeighborId().list() / client.NeighborId().load({"id": ...})."""
        from digitalocean_sdk.entity.neighbor_id_entity import NeighborIdEntity
        return NeighborIdEntity(self, data)


    def Nfs(self, data=None) -> "NfsEntity":
        """Entity factory: client.Nfs().list() / client.Nfs().load({"id": ...})."""
        from digitalocean_sdk.entity.nfs_entity import NfsEntity
        return NfsEntity(self, data)


    def NfsAction2(self, data=None) -> "NfsAction2Entity":
        """Entity factory: client.NfsAction2().list() / client.NfsAction2().load({"id": ...})."""
        from digitalocean_sdk.entity.nfs_action_2_entity import NfsAction2Entity
        return NfsAction2Entity(self, data)


    def NfsSnapshot(self, data=None) -> "NfsSnapshotEntity":
        """Entity factory: client.NfsSnapshot().list() / client.NfsSnapshot().load({"id": ...})."""
        from digitalocean_sdk.entity.nfs_snapshot_entity import NfsSnapshotEntity
        return NfsSnapshotEntity(self, data)


    def OnlineMigration(self, data=None) -> "OnlineMigrationEntity":
        """Entity factory: client.OnlineMigration().list() / client.OnlineMigration().load({"id": ...})."""
        from digitalocean_sdk.entity.online_migration_entity import OnlineMigrationEntity
        return OnlineMigrationEntity(self, data)


    def Option(self, data=None) -> "OptionEntity":
        """Entity factory: client.Option().list() / client.Option().load({"id": ...})."""
        from digitalocean_sdk.entity.option_entity import OptionEntity
        return OptionEntity(self, data)


    def Organization(self, data=None) -> "OrganizationEntity":
        """Entity factory: client.Organization().list() / client.Organization().load({"id": ...})."""
        from digitalocean_sdk.entity.organization_entity import OrganizationEntity
        return OrganizationEntity(self, data)


    def OutputView(self, data=None) -> "OutputViewEntity":
        """Entity factory: client.OutputView().list() / client.OutputView().load({"id": ...})."""
        from digitalocean_sdk.entity.output_view_entity import OutputViewEntity
        return OutputViewEntity(self, data)


    def PartnerNetworkConnect(self, data=None) -> "PartnerNetworkConnectEntity":
        """Entity factory: client.PartnerNetworkConnect().list() / client.PartnerNetworkConnect().load({"id": ...})."""
        from digitalocean_sdk.entity.partner_network_connect_entity import PartnerNetworkConnectEntity
        return PartnerNetworkConnectEntity(self, data)


    def PrepaymentConfig(self, data=None) -> "PrepaymentConfigEntity":
        """Entity factory: client.PrepaymentConfig().list() / client.PrepaymentConfig().load({"id": ...})."""
        from digitalocean_sdk.entity.prepayment_config_entity import PrepaymentConfigEntity
        return PrepaymentConfigEntity(self, data)


    def PrepaymentStatus(self, data=None) -> "PrepaymentStatusEntity":
        """Entity factory: client.PrepaymentStatus().list() / client.PrepaymentStatus().load({"id": ...})."""
        from digitalocean_sdk.entity.prepayment_status_entity import PrepaymentStatusEntity
        return PrepaymentStatusEntity(self, data)


    def Project(self, data=None) -> "ProjectEntity":
        """Entity factory: client.Project().list() / client.Project().load({"id": ...})."""
        from digitalocean_sdk.entity.project_entity import ProjectEntity
        return ProjectEntity(self, data)


    def ProjectResource(self, data=None) -> "ProjectResourceEntity":
        """Entity factory: client.ProjectResource().list() / client.ProjectResource().load({"id": ...})."""
        from digitalocean_sdk.entity.project_resource_entity import ProjectResourceEntity
        return ProjectResourceEntity(self, data)


    def PromQuery(self, data=None) -> "PromQueryEntity":
        """Entity factory: client.PromQuery().list() / client.PromQuery().load({"id": ...})."""
        from digitalocean_sdk.entity.prom_query_entity import PromQueryEntity
        return PromQueryEntity(self, data)


    def PromQueryRange(self, data=None) -> "PromQueryRangeEntity":
        """Entity factory: client.PromQueryRange().list() / client.PromQueryRange().load({"id": ...})."""
        from digitalocean_sdk.entity.prom_query_range_entity import PromQueryRangeEntity
        return PromQueryRangeEntity(self, data)


    def PromSeries(self, data=None) -> "PromSeriesEntity":
        """Entity factory: client.PromSeries().list() / client.PromSeries().load({"id": ...})."""
        from digitalocean_sdk.entity.prom_series_entity import PromSeriesEntity
        return PromSeriesEntity(self, data)


    def PromStringList(self, data=None) -> "PromStringListEntity":
        """Entity factory: client.PromStringList().list() / client.PromStringList().load({"id": ...})."""
        from digitalocean_sdk.entity.prom_string_list_entity import PromStringListEntity
        return PromStringListEntity(self, data)


    def Region(self, data=None) -> "RegionEntity":
        """Entity factory: client.Region().list() / client.Region().load({"id": ...})."""
        from digitalocean_sdk.entity.region_entity import RegionEntity
        return RegionEntity(self, data)


    def ReservedIPv6(self, data=None) -> "ReservedIPv6Entity":
        """Entity factory: client.ReservedIPv6().list() / client.ReservedIPv6().load({"id": ...})."""
        from digitalocean_sdk.entity.reserved_i_pv6_entity import ReservedIPv6Entity
        return ReservedIPv6Entity(self, data)


    def ReservedIPv6Action(self, data=None) -> "ReservedIPv6ActionEntity":
        """Entity factory: client.ReservedIPv6Action().list() / client.ReservedIPv6Action().load({"id": ...})."""
        from digitalocean_sdk.entity.reserved_i_pv6_action_entity import ReservedIPv6ActionEntity
        return ReservedIPv6ActionEntity(self, data)


    def ReservedIp(self, data=None) -> "ReservedIpEntity":
        """Entity factory: client.ReservedIp().list() / client.ReservedIp().load({"id": ...})."""
        from digitalocean_sdk.entity.reserved_ip_entity import ReservedIpEntity
        return ReservedIpEntity(self, data)


    def ReservedIpAction(self, data=None) -> "ReservedIpActionEntity":
        """Entity factory: client.ReservedIpAction().list() / client.ReservedIpAction().load({"id": ...})."""
        from digitalocean_sdk.entity.reserved_ip_action_entity import ReservedIpActionEntity
        return ReservedIpActionEntity(self, data)


    def Resync(self, data=None) -> "ResyncEntity":
        """Entity factory: client.Resync().list() / client.Resync().load({"id": ...})."""
        from digitalocean_sdk.entity.resync_entity import ResyncEntity
        return ResyncEntity(self, data)


    def Search(self, data=None) -> "SearchEntity":
        """Entity factory: client.Search().list() / client.Search().load({"id": ...})."""
        from digitalocean_sdk.entity.search_entity import SearchEntity
        return SearchEntity(self, data)


    def SecurityPlan(self, data=None) -> "SecurityPlanEntity":
        """Entity factory: client.SecurityPlan().list() / client.SecurityPlan().load({"id": ...})."""
        from digitalocean_sdk.entity.security_plan_entity import SecurityPlanEntity
        return SecurityPlanEntity(self, data)


    def SecurityRule(self, data=None) -> "SecurityRuleEntity":
        """Entity factory: client.SecurityRule().list() / client.SecurityRule().load({"id": ...})."""
        from digitalocean_sdk.entity.security_rule_entity import SecurityRuleEntity
        return SecurityRuleEntity(self, data)


    def SecurityScan(self, data=None) -> "SecurityScanEntity":
        """Entity factory: client.SecurityScan().list() / client.SecurityScan().load({"id": ...})."""
        from digitalocean_sdk.entity.security_scan_entity import SecurityScanEntity
        return SecurityScanEntity(self, data)


    def SecuritySuppression(self, data=None) -> "SecuritySuppressionEntity":
        """Entity factory: client.SecuritySuppression().list() / client.SecuritySuppression().load({"id": ...})."""
        from digitalocean_sdk.entity.security_suppression_entity import SecuritySuppressionEntity
        return SecuritySuppressionEntity(self, data)


    def Setting(self, data=None) -> "SettingEntity":
        """Entity factory: client.Setting().list() / client.Setting().load({"id": ...})."""
        from digitalocean_sdk.entity.setting_entity import SettingEntity
        return SettingEntity(self, data)


    def Size(self, data=None) -> "SizeEntity":
        """Entity factory: client.Size().list() / client.Size().load({"id": ...})."""
        from digitalocean_sdk.entity.size_entity import SizeEntity
        return SizeEntity(self, data)


    def Snapshot(self, data=None) -> "SnapshotEntity":
        """Entity factory: client.Snapshot().list() / client.Snapshot().load({"id": ...})."""
        from digitalocean_sdk.entity.snapshot_entity import SnapshotEntity
        return SnapshotEntity(self, data)


    def SpacesKey(self, data=None) -> "SpacesKeyEntity":
        """Entity factory: client.SpacesKey().list() / client.SpacesKey().load({"id": ...})."""
        from digitalocean_sdk.entity.spaces_key_entity import SpacesKeyEntity
        return SpacesKeyEntity(self, data)


    def SqlMode(self, data=None) -> "SqlModeEntity":
        """Entity factory: client.SqlMode().list() / client.SqlMode().load({"id": ...})."""
        from digitalocean_sdk.entity.sql_mode_entity import SqlModeEntity
        return SqlModeEntity(self, data)


    def SshKey(self, data=None) -> "SshKeyEntity":
        """Entity factory: client.SshKey().list() / client.SshKey().load({"id": ...})."""
        from digitalocean_sdk.entity.ssh_key_entity import SshKeyEntity
        return SshKeyEntity(self, data)


    def Systemone(self, data=None) -> "SystemoneEntity":
        """Entity factory: client.Systemone().list() / client.Systemone().load({"id": ...})."""
        from digitalocean_sdk.entity.systemone_entity import SystemoneEntity
        return SystemoneEntity(self, data)


    def Tag(self, data=None) -> "TagEntity":
        """Entity factory: client.Tag().list() / client.Tag().load({"id": ...})."""
        from digitalocean_sdk.entity.tag_entity import TagEntity
        return TagEntity(self, data)


    def Tool(self, data=None) -> "ToolEntity":
        """Entity factory: client.Tool().list() / client.Tool().load({"id": ...})."""
        from digitalocean_sdk.entity.tool_entity import ToolEntity
        return ToolEntity(self, data)


    def Toolbelt(self, data=None) -> "ToolbeltEntity":
        """Entity factory: client.Toolbelt().list() / client.Toolbelt().load({"id": ...})."""
        from digitalocean_sdk.entity.toolbelt_entity import ToolbeltEntity
        return ToolbeltEntity(self, data)


    def Uptime(self, data=None) -> "UptimeEntity":
        """Entity factory: client.Uptime().list() / client.Uptime().load({"id": ...})."""
        from digitalocean_sdk.entity.uptime_entity import UptimeEntity
        return UptimeEntity(self, data)


    def User(self, data=None) -> "UserEntity":
        """Entity factory: client.User().list() / client.User().load({"id": ...})."""
        from digitalocean_sdk.entity.user_entity import UserEntity
        return UserEntity(self, data)


    def VectorDatabase(self, data=None) -> "VectorDatabaseEntity":
        """Entity factory: client.VectorDatabase().list() / client.VectorDatabase().load({"id": ...})."""
        from digitalocean_sdk.entity.vector_database_entity import VectorDatabaseEntity
        return VectorDatabaseEntity(self, data)


    def VectordbBackup(self, data=None) -> "VectordbBackupEntity":
        """Entity factory: client.VectordbBackup().list() / client.VectordbBackup().load({"id": ...})."""
        from digitalocean_sdk.entity.vectordb_backup_entity import VectordbBackupEntity
        return VectordbBackupEntity(self, data)


    def VectordbGetRestoreStatus(self, data=None) -> "VectordbGetRestoreStatusEntity":
        """Entity factory: client.VectordbGetRestoreStatus().list() / client.VectordbGetRestoreStatus().load({"id": ...})."""
        from digitalocean_sdk.entity.vectordb_get_restore_status_entity import VectordbGetRestoreStatusEntity
        return VectordbGetRestoreStatusEntity(self, data)


    def VectordbGetVectorDb(self, data=None) -> "VectordbGetVectorDbEntity":
        """Entity factory: client.VectordbGetVectorDb().list() / client.VectordbGetVectorDb().load({"id": ...})."""
        from digitalocean_sdk.entity.vectordb_get_vector_db_entity import VectordbGetVectorDbEntity
        return VectordbGetVectorDbEntity(self, data)


    def VectordbGetVectorDbAdminCredential(self, data=None) -> "VectordbGetVectorDbAdminCredentialEntity":
        """Entity factory: client.VectordbGetVectorDbAdminCredential().list() / client.VectordbGetVectorDbAdminCredential().load({"id": ...})."""
        from digitalocean_sdk.entity.vectordb_get_vector_db_admin_credential_entity import VectordbGetVectorDbAdminCredentialEntity
        return VectordbGetVectorDbAdminCredentialEntity(self, data)


    def VectordbRestoreBackup(self, data=None) -> "VectordbRestoreBackupEntity":
        """Entity factory: client.VectordbRestoreBackup().list() / client.VectordbRestoreBackup().load({"id": ...})."""
        from digitalocean_sdk.entity.vectordb_restore_backup_entity import VectordbRestoreBackupEntity
        return VectordbRestoreBackupEntity(self, data)


    def VectordbUpdateVectorDb(self, data=None) -> "VectordbUpdateVectorDbEntity":
        """Entity factory: client.VectordbUpdateVectorDb().list() / client.VectordbUpdateVectorDb().load({"id": ...})."""
        from digitalocean_sdk.entity.vectordb_update_vector_db_entity import VectordbUpdateVectorDbEntity
        return VectordbUpdateVectorDbEntity(self, data)


    def VectordbUpdateVectorDbTag(self, data=None) -> "VectordbUpdateVectorDbTagEntity":
        """Entity factory: client.VectordbUpdateVectorDbTag().list() / client.VectordbUpdateVectorDbTag().load({"id": ...})."""
        from digitalocean_sdk.entity.vectordb_update_vector_db_tag_entity import VectordbUpdateVectorDbTagEntity
        return VectordbUpdateVectorDbTagEntity(self, data)


    def Vpc(self, data=None) -> "VpcEntity":
        """Entity factory: client.Vpc().list() / client.Vpc().load({"id": ...})."""
        from digitalocean_sdk.entity.vpc_entity import VpcEntity
        return VpcEntity(self, data)


    def VpcNatGateway(self, data=None) -> "VpcNatGatewayEntity":
        """Entity factory: client.VpcNatGateway().list() / client.VpcNatGateway().load({"id": ...})."""
        from digitalocean_sdk.entity.vpc_nat_gateway_entity import VpcNatGatewayEntity
        return VpcNatGatewayEntity(self, data)


    def VpcPeering(self, data=None) -> "VpcPeeringEntity":
        """Entity factory: client.VpcPeering().list() / client.VpcPeering().load({"id": ...})."""
        from digitalocean_sdk.entity.vpc_peering_entity import VpcPeeringEntity
        return VpcPeeringEntity(self, data)


    def VpcRoutesPublicPreview(self, data=None) -> "VpcRoutesPublicPreviewEntity":
        """Entity factory: client.VpcRoutesPublicPreview().list() / client.VpcRoutesPublicPreview().load({"id": ...})."""
        from digitalocean_sdk.entity.vpc_routes__public_preview_entity import VpcRoutesPublicPreviewEntity
        return VpcRoutesPublicPreviewEntity(self, data)


    def VpcSubnetsPublicPreview(self, data=None) -> "VpcSubnetsPublicPreviewEntity":
        """Entity factory: client.VpcSubnetsPublicPreview().list() / client.VpcSubnetsPublicPreview().load({"id": ...})."""
        from digitalocean_sdk.entity.vpc_subnets__public_preview_entity import VpcSubnetsPublicPreviewEntity
        return VpcSubnetsPublicPreviewEntity(self, data)



    @classmethod
    def test(cls, testopts=None, sdkopts=None) -> "DigitaloceanSDK":
        if sdkopts is None:
            sdkopts = {}
        sdkopts = vs.clone(sdkopts)
        if not isinstance(sdkopts, dict):
            sdkopts = {}

        if testopts is None:
            testopts = {}
        testopts = vs.clone(testopts)
        if not isinstance(testopts, dict):
            testopts = {}
        testopts["active"] = True

        vs.setpath(sdkopts, "feature.test", testopts)

        sdk = cls(sdkopts)
        sdk.mode = "test"

        return sdk


from typing import TYPE_CHECKING

if TYPE_CHECKING:
    from digitalocean_sdk.entity.access_point_entity import AccessPointEntity
    from digitalocean_sdk.entity.account_entity import AccountEntity
    from digitalocean_sdk.entity.action_entity import ActionEntity
    from digitalocean_sdk.entity.actor_limit_entity import ActorLimitEntity
    from digitalocean_sdk.entity.add_on_app_entity import AddOnAppEntity
    from digitalocean_sdk.entity.add_on_plan_entity import AddOnPlanEntity
    from digitalocean_sdk.entity.add_on_resource_entity import AddOnResourceEntity
    from digitalocean_sdk.entity.api_agent_version_entity import ApiAgentVersionEntity
    from digitalocean_sdk.entity.api_create_agent_api_key_output_entity import ApiCreateAgentApiKeyOutputEntity
    from digitalocean_sdk.entity.api_create_data_source_file_upload_presigned_urls_output_entity import ApiCreateDataSourceFileUploadPresignedUrlsOutputEntity
    from digitalocean_sdk.entity.api_create_knowledge_base_data_source_output_entity import ApiCreateKnowledgeBaseDataSourceOutputEntity
    from digitalocean_sdk.entity.api_create_scenario_set_from_library_output_entity import ApiCreateScenarioSetFromLibraryOutputEntity
    from digitalocean_sdk.entity.api_delete_agent_api_key_output_entity import ApiDeleteAgentApiKeyOutputEntity
    from digitalocean_sdk.entity.api_delete_agent_output_entity import ApiDeleteAgentOutputEntity
    from digitalocean_sdk.entity.api_delete_anthropic_api_key_output_entity import ApiDeleteAnthropicApiKeyOutputEntity
    from digitalocean_sdk.entity.api_delete_custom_evaluation_metric_output_entity import ApiDeleteCustomEvaluationMetricOutputEntity
    from digitalocean_sdk.entity.api_delete_custom_model_output_public_entity import ApiDeleteCustomModelOutputPublicEntity
    from digitalocean_sdk.entity.api_delete_evaluation_dataset_output_entity import ApiDeleteEvaluationDatasetOutputEntity
    from digitalocean_sdk.entity.api_delete_knowledge_base_data_source_output_entity import ApiDeleteKnowledgeBaseDataSourceOutputEntity
    from digitalocean_sdk.entity.api_delete_knowledge_base_output_entity import ApiDeleteKnowledgeBaseOutputEntity
    from digitalocean_sdk.entity.api_delete_model_api_key_output_entity import ApiDeleteModelApiKeyOutputEntity
    from digitalocean_sdk.entity.api_delete_model_evaluation_preset_output_entity import ApiDeleteModelEvaluationPresetOutputEntity
    from digitalocean_sdk.entity.api_delete_model_evaluation_run_output_public_entity import ApiDeleteModelEvaluationRunOutputPublicEntity
    from digitalocean_sdk.entity.api_delete_model_router_output_entity import ApiDeleteModelRouterOutputEntity
    from digitalocean_sdk.entity.api_delete_open_aiapi_key_output_entity import ApiDeleteOpenAiapiKeyOutputEntity
    from digitalocean_sdk.entity.api_delete_scenario_set_output_entity import ApiDeleteScenarioSetOutputEntity
    from digitalocean_sdk.entity.api_delete_scheduled_indexing_output_entity import ApiDeleteScheduledIndexingOutputEntity
    from digitalocean_sdk.entity.api_delete_simulation_run_output_entity import ApiDeleteSimulationRunOutputEntity
    from digitalocean_sdk.entity.api_delete_workspace_output_entity import ApiDeleteWorkspaceOutputEntity
    from digitalocean_sdk.entity.api_dropbox_oauth2_get_tokens_output_entity import ApiDropboxOauth2GetTokensOutputEntity
    from digitalocean_sdk.entity.api_generate_oauth2_url_output_entity import ApiGenerateOauth2UrlOutputEntity
    from digitalocean_sdk.entity.api_generate_scenario_set_output_entity import ApiGenerateScenarioSetOutputEntity
    from digitalocean_sdk.entity.api_get_agent_output_entity import ApiGetAgentOutputEntity
    from digitalocean_sdk.entity.api_get_agent_usage_output_entity import ApiGetAgentUsageOutputEntity
    from digitalocean_sdk.entity.api_get_anthropic_api_key_output_entity import ApiGetAnthropicApiKeyOutputEntity
    from digitalocean_sdk.entity.api_get_children_output_entity import ApiGetChildrenOutputEntity
    from digitalocean_sdk.entity.api_get_custom_model_output_public_entity import ApiGetCustomModelOutputPublicEntity
    from digitalocean_sdk.entity.api_get_evaluation_dataset_download_url_output_entity import ApiGetEvaluationDatasetDownloadUrlOutputEntity
    from digitalocean_sdk.entity.api_get_evaluation_run_output_entity import ApiGetEvaluationRunOutputEntity
    from digitalocean_sdk.entity.api_get_evaluation_run_results_output_entity import ApiGetEvaluationRunResultsOutputEntity
    from digitalocean_sdk.entity.api_get_evaluation_test_case_output_entity import ApiGetEvaluationTestCaseOutputEntity
    from digitalocean_sdk.entity.api_get_indexing_job_details_signed_url_output_entity import ApiGetIndexingJobDetailsSignedUrlOutputEntity
    from digitalocean_sdk.entity.api_get_knowledge_base_indexing_job_output_entity import ApiGetKnowledgeBaseIndexingJobOutputEntity
    from digitalocean_sdk.entity.api_get_knowledge_base_output_entity import ApiGetKnowledgeBaseOutputEntity
    from digitalocean_sdk.entity.api_get_model_evaluation_run_output_entity import ApiGetModelEvaluationRunOutputEntity
    from digitalocean_sdk.entity.api_get_model_evaluation_run_results_download_url_output_entity import ApiGetModelEvaluationRunResultsDownloadUrlOutputEntity
    from digitalocean_sdk.entity.api_get_model_router_output_entity import ApiGetModelRouterOutputEntity
    from digitalocean_sdk.entity.api_get_open_aiapi_key_output_entity import ApiGetOpenAiapiKeyOutputEntity
    from digitalocean_sdk.entity.api_get_scenario_set_download_url_output_entity import ApiGetScenarioSetDownloadUrlOutputEntity
    from digitalocean_sdk.entity.api_get_scenario_set_output_entity import ApiGetScenarioSetOutputEntity
    from digitalocean_sdk.entity.api_get_scheduled_indexing_output_entity import ApiGetScheduledIndexingOutputEntity
    from digitalocean_sdk.entity.api_get_simulation_journey_trajectory_url_output_entity import ApiGetSimulationJourneyTrajectoryUrlOutputEntity
    from digitalocean_sdk.entity.api_get_simulation_run_output_entity import ApiGetSimulationRunOutputEntity
    from digitalocean_sdk.entity.api_get_workspace_output_entity import ApiGetWorkspaceOutputEntity
    from digitalocean_sdk.entity.api_import_custom_model_output_public_entity import ApiImportCustomModelOutputPublicEntity
    from digitalocean_sdk.entity.api_indexed_data_source_entity import ApiIndexedDataSourceEntity
    from digitalocean_sdk.entity.api_link_agent_function_output_entity import ApiLinkAgentFunctionOutputEntity
    from digitalocean_sdk.entity.api_link_agent_guardrail_output_entity import ApiLinkAgentGuardrailOutputEntity
    from digitalocean_sdk.entity.api_link_agent_output_entity import ApiLinkAgentOutputEntity
    from digitalocean_sdk.entity.api_link_knowledge_base_output_entity import ApiLinkKnowledgeBaseOutputEntity
    from digitalocean_sdk.entity.api_list_agent_api_keys_output_entity import ApiListAgentApiKeysOutputEntity
    from digitalocean_sdk.entity.api_list_agents_by_anthropic_key_output_entity import ApiListAgentsByAnthropicKeyOutputEntity
    from digitalocean_sdk.entity.api_list_agents_by_open_ai_key_output_entity import ApiListAgentsByOpenAiKeyOutputEntity
    from digitalocean_sdk.entity.api_list_agents_by_workspace_output_entity import ApiListAgentsByWorkspaceOutputEntity
    from digitalocean_sdk.entity.api_list_evaluation_metrics_output_entity import ApiListEvaluationMetricsOutputEntity
    from digitalocean_sdk.entity.api_list_evaluation_runs_by_test_case_output_entity import ApiListEvaluationRunsByTestCaseOutputEntity
    from digitalocean_sdk.entity.api_list_evaluation_test_cases_by_workspace_output_entity import ApiListEvaluationTestCasesByWorkspaceOutputEntity
    from digitalocean_sdk.entity.api_list_knowledge_base_data_sources_output_entity import ApiListKnowledgeBaseDataSourcesOutputEntity
    from digitalocean_sdk.entity.api_list_knowledge_base_indexing_jobs_output_entity import ApiListKnowledgeBaseIndexingJobsOutputEntity
    from digitalocean_sdk.entity.api_list_model_evaluation_metrics_output_entity import ApiListModelEvaluationMetricsOutputEntity
    from digitalocean_sdk.entity.api_list_scenario_library_output_entity import ApiListScenarioLibraryOutputEntity
    from digitalocean_sdk.entity.api_list_scenarios_output_entity import ApiListScenariosOutputEntity
    from digitalocean_sdk.entity.api_list_simulation_journeys_output_entity import ApiListSimulationJourneysOutputEntity
    from digitalocean_sdk.entity.api_model_catalog_card_entity import ApiModelCatalogCardEntity
    from digitalocean_sdk.entity.api_model_evaluation_preset_entity import ApiModelEvaluationPresetEntity
    from digitalocean_sdk.entity.api_model_public_entity import ApiModelPublicEntity
    from digitalocean_sdk.entity.api_model_router_preset_entity import ApiModelRouterPresetEntity
    from digitalocean_sdk.entity.api_model_router_task_preset_entity import ApiModelRouterTaskPresetEntity
    from digitalocean_sdk.entity.api_move_agents_to_workspace_output_entity import ApiMoveAgentsToWorkspaceOutputEntity
    from digitalocean_sdk.entity.api_prompt_entity import ApiPromptEntity
    from digitalocean_sdk.entity.api_rollback_to_agent_version_output_entity import ApiRollbackToAgentVersionOutputEntity
    from digitalocean_sdk.entity.api_simulation_journey_entity import ApiSimulationJourneyEntity
    from digitalocean_sdk.entity.api_simulation_trajectory_entity import ApiSimulationTrajectoryEntity
    from digitalocean_sdk.entity.api_unlink_agent_function_output_entity import ApiUnlinkAgentFunctionOutputEntity
    from digitalocean_sdk.entity.api_unlink_agent_guardrail_output_entity import ApiUnlinkAgentGuardrailOutputEntity
    from digitalocean_sdk.entity.api_unlink_agent_output_entity import ApiUnlinkAgentOutputEntity
    from digitalocean_sdk.entity.api_unlink_knowledge_base_output_entity import ApiUnlinkKnowledgeBaseOutputEntity
    from digitalocean_sdk.entity.api_update_agent_api_key_output_entity import ApiUpdateAgentApiKeyOutputEntity
    from digitalocean_sdk.entity.api_update_agent_function_output_entity import ApiUpdateAgentFunctionOutputEntity
    from digitalocean_sdk.entity.api_update_agent_output_entity import ApiUpdateAgentOutputEntity
    from digitalocean_sdk.entity.api_update_anthropic_api_key_output_entity import ApiUpdateAnthropicApiKeyOutputEntity
    from digitalocean_sdk.entity.api_update_custom_evaluation_metric_output_entity import ApiUpdateCustomEvaluationMetricOutputEntity
    from digitalocean_sdk.entity.api_update_evaluation_test_case_output_entity import ApiUpdateEvaluationTestCaseOutputEntity
    from digitalocean_sdk.entity.api_update_knowledge_base_data_source_output_entity import ApiUpdateKnowledgeBaseDataSourceOutputEntity
    from digitalocean_sdk.entity.api_update_knowledge_base_output_entity import ApiUpdateKnowledgeBaseOutputEntity
    from digitalocean_sdk.entity.api_update_linked_agent_output_entity import ApiUpdateLinkedAgentOutputEntity
    from digitalocean_sdk.entity.api_update_model_api_key_output_entity import ApiUpdateModelApiKeyOutputEntity
    from digitalocean_sdk.entity.api_update_model_evaluation_run_output_entity import ApiUpdateModelEvaluationRunOutputEntity
    from digitalocean_sdk.entity.api_update_model_router_output_entity import ApiUpdateModelRouterOutputEntity
    from digitalocean_sdk.entity.api_update_open_aiapi_key_output_entity import ApiUpdateOpenAiapiKeyOutputEntity
    from digitalocean_sdk.entity.api_update_scenario_set_output_entity import ApiUpdateScenarioSetOutputEntity
    from digitalocean_sdk.entity.api_update_simulation_run_output_entity import ApiUpdateSimulationRunOutputEntity
    from digitalocean_sdk.entity.api_update_workspace_output_entity import ApiUpdateWorkspaceOutputEntity
    from digitalocean_sdk.entity.app_entity import AppEntity
    from digitalocean_sdk.entity.app_alert_entity import AppAlertEntity
    from digitalocean_sdk.entity.app_event_entity import AppEventEntity
    from digitalocean_sdk.entity.app_health_entity import AppHealthEntity
    from digitalocean_sdk.entity.app_instance_entity import AppInstanceEntity
    from digitalocean_sdk.entity.app_job_invocation_entity import AppJobInvocationEntity
    from digitalocean_sdk.entity.app_metrics_bandwidth_usage_entity import AppMetricsBandwidthUsageEntity
    from digitalocean_sdk.entity.app_propose_entity import AppProposeEntity
    from digitalocean_sdk.entity.apps_deployment_entity import AppsDeploymentEntity
    from digitalocean_sdk.entity.apps_get_exec_entity import AppsGetExecEntity
    from digitalocean_sdk.entity.apps_get_log_entity import AppsGetLogEntity
    from digitalocean_sdk.entity.apps_instance_size_entity import AppsInstanceSizeEntity
    from digitalocean_sdk.entity.apps_region_entity import AppsRegionEntity
    from digitalocean_sdk.entity.associated_kubernetes_resource_entity import AssociatedKubernetesResourceEntity
    from digitalocean_sdk.entity.associated_resource_status_entity import AssociatedResourceStatusEntity
    from digitalocean_sdk.entity.async_invoke_entity import AsyncInvokeEntity
    from digitalocean_sdk.entity.balance_entity import BalanceEntity
    from digitalocean_sdk.entity.batch_entity import BatchEntity
    from digitalocean_sdk.entity.batch_file_create_entity import BatchFileCreateEntity
    from digitalocean_sdk.entity.batch_inference_entity import BatchInferenceEntity
    from digitalocean_sdk.entity.batch_result_entity import BatchResultEntity
    from digitalocean_sdk.entity.billing_entity import BillingEntity
    from digitalocean_sdk.entity.block_storage_entity import BlockStorageEntity
    from digitalocean_sdk.entity.block_storage_action_entity import BlockStorageActionEntity
    from digitalocean_sdk.entity.byoip_prefix_entity import ByoipPrefixEntity
    from digitalocean_sdk.entity.cdn_endpoint_entity import CdnEndpointEntity
    from digitalocean_sdk.entity.certificate_entity import CertificateEntity
    from digitalocean_sdk.entity.chat_completion_entity import ChatCompletionEntity
    from digitalocean_sdk.entity.clusterlint_entity import ClusterlintEntity
    from digitalocean_sdk.entity.connection_entity import ConnectionEntity
    from digitalocean_sdk.entity.connection_pool_entity import ConnectionPoolEntity
    from digitalocean_sdk.entity.container_registry_entity import ContainerRegistryEntity
    from digitalocean_sdk.entity.create_response_entity import CreateResponseEntity
    from digitalocean_sdk.entity.credential_entity import CredentialEntity
    from digitalocean_sdk.entity.database_entity import DatabaseEntity
    from digitalocean_sdk.entity.dedicated_inference_entity import DedicatedInferenceEntity
    from digitalocean_sdk.entity.dedicated_inference_accelerator_entity import DedicatedInferenceAcceleratorEntity
    from digitalocean_sdk.entity.dedicated_inference_gpu_model_config_entity import DedicatedInferenceGpuModelConfigEntity
    from digitalocean_sdk.entity.dedicated_inference_size_entity import DedicatedInferenceSizeEntity
    from digitalocean_sdk.entity.docker_credential_entity import DockerCredentialEntity
    from digitalocean_sdk.entity.domain_entity import DomainEntity
    from digitalocean_sdk.entity.domain_record_entity import DomainRecordEntity
    from digitalocean_sdk.entity.droplet_entity import DropletEntity
    from digitalocean_sdk.entity.droplet_action_entity import DropletActionEntity
    from digitalocean_sdk.entity.droplet_autoscale_pool_entity import DropletAutoscalePoolEntity
    from digitalocean_sdk.entity.embedding_entity import EmbeddingEntity
    from digitalocean_sdk.entity.empty_entity import EmptyEntity
    from digitalocean_sdk.entity.firewall_entity import FirewallEntity
    from digitalocean_sdk.entity.floating_ip_entity import FloatingIpEntity
    from digitalocean_sdk.entity.floating_ip_action_entity import FloatingIpActionEntity
    from digitalocean_sdk.entity.function_key_entity import FunctionKeyEntity
    from digitalocean_sdk.entity.function_namespace_entity import FunctionNamespaceEntity
    from digitalocean_sdk.entity.function_trigger_entity import FunctionTriggerEntity
    from digitalocean_sdk.entity.genaiapi_region_entity import GenaiapiRegionEntity
    from digitalocean_sdk.entity.image_entity import ImageEntity
    from digitalocean_sdk.entity.image_action_entity import ImageActionEntity
    from digitalocean_sdk.entity.insight_entity import InsightEntity
    from digitalocean_sdk.entity.invoice_summary_entity import InvoiceSummaryEntity
    from digitalocean_sdk.entity.kubernete_entity import KuberneteEntity
    from digitalocean_sdk.entity.kubernetes_option_entity import KubernetesOptionEntity
    from digitalocean_sdk.entity.list_mcp_server_tool_entity import ListMcpServerToolEntity
    from digitalocean_sdk.entity.list_provider_entity import ListProviderEntity
    from digitalocean_sdk.entity.list_provider_health_entity import ListProviderHealthEntity
    from digitalocean_sdk.entity.list_tool_entity import ListToolEntity
    from digitalocean_sdk.entity.list_tool_health_entity import ListToolHealthEntity
    from digitalocean_sdk.entity.list_toolbelt_provider_entity import ListToolbeltProviderEntity
    from digitalocean_sdk.entity.list_toolkit_entity import ListToolkitEntity
    from digitalocean_sdk.entity.load_balancer_entity import LoadBalancerEntity
    from digitalocean_sdk.entity.logs_search_entity import LogsSearchEntity
    from digitalocean_sdk.entity.logsink_entity import LogsinkEntity
    from digitalocean_sdk.entity.mcp_server_entity import McpServerEntity
    from digitalocean_sdk.entity.message_entity import MessageEntity
    from digitalocean_sdk.entity.metric_entity import MetricEntity
    from digitalocean_sdk.entity.model_entity import ModelEntity
    from digitalocean_sdk.entity.monitoring_alert_entity import MonitoringAlertEntity
    from digitalocean_sdk.entity.monitoring_sink_entity import MonitoringSinkEntity
    from digitalocean_sdk.entity.monitoring_sink_destination_entity import MonitoringSinkDestinationEntity
    from digitalocean_sdk.entity.n1_click_entity import N1ClickEntity
    from digitalocean_sdk.entity.n1_click_application_entity import N1ClickApplicationEntity
    from digitalocean_sdk.entity.neighbor_id_entity import NeighborIdEntity
    from digitalocean_sdk.entity.nfs_entity import NfsEntity
    from digitalocean_sdk.entity.nfs_action_2_entity import NfsAction2Entity
    from digitalocean_sdk.entity.nfs_snapshot_entity import NfsSnapshotEntity
    from digitalocean_sdk.entity.online_migration_entity import OnlineMigrationEntity
    from digitalocean_sdk.entity.option_entity import OptionEntity
    from digitalocean_sdk.entity.organization_entity import OrganizationEntity
    from digitalocean_sdk.entity.output_view_entity import OutputViewEntity
    from digitalocean_sdk.entity.partner_network_connect_entity import PartnerNetworkConnectEntity
    from digitalocean_sdk.entity.prepayment_config_entity import PrepaymentConfigEntity
    from digitalocean_sdk.entity.prepayment_status_entity import PrepaymentStatusEntity
    from digitalocean_sdk.entity.project_entity import ProjectEntity
    from digitalocean_sdk.entity.project_resource_entity import ProjectResourceEntity
    from digitalocean_sdk.entity.prom_query_entity import PromQueryEntity
    from digitalocean_sdk.entity.prom_query_range_entity import PromQueryRangeEntity
    from digitalocean_sdk.entity.prom_series_entity import PromSeriesEntity
    from digitalocean_sdk.entity.prom_string_list_entity import PromStringListEntity
    from digitalocean_sdk.entity.region_entity import RegionEntity
    from digitalocean_sdk.entity.reserved_i_pv6_entity import ReservedIPv6Entity
    from digitalocean_sdk.entity.reserved_i_pv6_action_entity import ReservedIPv6ActionEntity
    from digitalocean_sdk.entity.reserved_ip_entity import ReservedIpEntity
    from digitalocean_sdk.entity.reserved_ip_action_entity import ReservedIpActionEntity
    from digitalocean_sdk.entity.resync_entity import ResyncEntity
    from digitalocean_sdk.entity.search_entity import SearchEntity
    from digitalocean_sdk.entity.security_plan_entity import SecurityPlanEntity
    from digitalocean_sdk.entity.security_rule_entity import SecurityRuleEntity
    from digitalocean_sdk.entity.security_scan_entity import SecurityScanEntity
    from digitalocean_sdk.entity.security_suppression_entity import SecuritySuppressionEntity
    from digitalocean_sdk.entity.setting_entity import SettingEntity
    from digitalocean_sdk.entity.size_entity import SizeEntity
    from digitalocean_sdk.entity.snapshot_entity import SnapshotEntity
    from digitalocean_sdk.entity.spaces_key_entity import SpacesKeyEntity
    from digitalocean_sdk.entity.sql_mode_entity import SqlModeEntity
    from digitalocean_sdk.entity.ssh_key_entity import SshKeyEntity
    from digitalocean_sdk.entity.systemone_entity import SystemoneEntity
    from digitalocean_sdk.entity.tag_entity import TagEntity
    from digitalocean_sdk.entity.tool_entity import ToolEntity
    from digitalocean_sdk.entity.toolbelt_entity import ToolbeltEntity
    from digitalocean_sdk.entity.uptime_entity import UptimeEntity
    from digitalocean_sdk.entity.user_entity import UserEntity
    from digitalocean_sdk.entity.vector_database_entity import VectorDatabaseEntity
    from digitalocean_sdk.entity.vectordb_backup_entity import VectordbBackupEntity
    from digitalocean_sdk.entity.vectordb_get_restore_status_entity import VectordbGetRestoreStatusEntity
    from digitalocean_sdk.entity.vectordb_get_vector_db_entity import VectordbGetVectorDbEntity
    from digitalocean_sdk.entity.vectordb_get_vector_db_admin_credential_entity import VectordbGetVectorDbAdminCredentialEntity
    from digitalocean_sdk.entity.vectordb_restore_backup_entity import VectordbRestoreBackupEntity
    from digitalocean_sdk.entity.vectordb_update_vector_db_entity import VectordbUpdateVectorDbEntity
    from digitalocean_sdk.entity.vectordb_update_vector_db_tag_entity import VectordbUpdateVectorDbTagEntity
    from digitalocean_sdk.entity.vpc_entity import VpcEntity
    from digitalocean_sdk.entity.vpc_nat_gateway_entity import VpcNatGatewayEntity
    from digitalocean_sdk.entity.vpc_peering_entity import VpcPeeringEntity
    from digitalocean_sdk.entity.vpc_routes__public_preview_entity import VpcRoutesPublicPreviewEntity
    from digitalocean_sdk.entity.vpc_subnets__public_preview_entity import VpcSubnetsPublicPreviewEntity
