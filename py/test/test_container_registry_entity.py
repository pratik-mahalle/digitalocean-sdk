# ContainerRegistry entity test

import json
import os
import time

import pytest

from digitalocean_sdk.utility.voxgig_struct import voxgig_struct as vs
from digitalocean_sdk import DigitaloceanSDK
from digitalocean_sdk.core import helpers
from digitalocean_sdk.config import shared_config
from digitalocean_sdk.feature.base_feature import DigitaloceanBaseFeature

_TEST_DIR = os.path.dirname(os.path.abspath(__file__))
from test import runner


class _FailHook(DigitaloceanBaseFeature):
    def __init__(self):
        super().__init__()
        self.name = "failhook"
        self.unexpected = 0

    def init(self, ctx, options):
        pass

    def PreSpec(self, ctx):
        raise RuntimeError("container_registry hook failed")

    def PreUnexpected(self, ctx):
        self.unexpected += 1



# main.kit.test.live.strict is true (the default is true): a live
# request that fails, or a live test missing an input it needs,
# fails the test.
# An account with no record for a test to read skips it either way.
LIVE_STRICT = True


class TestContainerRegistryEntity:

    def test_should_create_instance(self):
        testsdk = DigitaloceanSDK.test(None, None)
        ent = testsdk.ContainerRegistry(None)
        assert ent is not None

    def test_should_stream(self):
        # Feature #4: the entity stream(action, ...) method runs the op
        # pipeline and yields result items. With the streaming feature active
        # it yields the feature's incremental output; otherwise it falls back
        # to the materialised list so stream always yields.
        seed = {
            "entity": {
                "container_registry": {
                    "s1": {"id": "s1"},
                    "s2": {"id": "s2"},
                    "s3": {"id": "s3"},
                }
            }
        }

        # Fallback: streaming inactive -> yields the materialised list items.
        base = DigitaloceanSDK.test(seed, None)
        seen = list(base.ContainerRegistry(None).stream("list", None, None))
        assert len(seen) == 3

        # Inbound: streaming active -> yields each item from the feature.
        from digitalocean_sdk.config import shared_config
        cfg = shared_config()
        if isinstance(cfg.get("feature"), dict) and "streaming" in cfg["feature"]:
            sdk = DigitaloceanSDK.test(
                seed, {"feature": {"streaming": {"active": True}}})
            got = []
            for item in sdk.ContainerRegistry(None).stream("list", None, None):
                if isinstance(item, list):
                    got.extend(item)
                else:
                    got.append(item)
            assert len(got) == 3

    def test_should_report_a_failed_stream(self):
        offline = {"net": {"offline": True}}
        with pytest.raises(Exception, match="offline"):
            list(DigitaloceanSDK.test(offline, None).ContainerRegistry(None).stream("list", None, None))

        quiet = {"ctrl": {"throw": False}}
        list(DigitaloceanSDK.test(offline, None).ContainerRegistry(None).stream("list", None, quiet))

        if "rbac" in (shared_config().get("feature") or {}):
            denied = DigitaloceanSDK.test(
                None, {"feature": {"rbac": {"active": True, "deny": True}}})
            with pytest.raises(Exception) as err:
                list(denied.ContainerRegistry(None).stream("list", None, None))
            assert "rbac_denied" == getattr(err.value, "code", None)

    def test_should_leave_the_callers_ctrl(self):
        explain = {}
        ctrl = {"explain": explain}
        list(DigitaloceanSDK.test(None, None).ContainerRegistry(None).stream("list", None, {"ctrl": ctrl}))
        assert ["explain"] == list(ctrl.keys())
        assert explain is ctrl["explain"] and 0 < len(explain)

    def test_should_fire_pre_unexpected(self):
        hook = _FailHook()
        client = DigitaloceanSDK({"feature": {"test": {"active": True}}, "extend": [hook]})
        with pytest.raises(Exception, match="hook failed"):
            client.ContainerRegistry(None).list(None, None)
        assert 0 < hook.unexpected

        fired = hook.unexpected
        assert client.ContainerRegistry(None).list(None, {"throw": False}) is None
        assert fired < hook.unexpected

    def test_should_refuse_an_invalid_request(self):
        if "validate" not in (shared_config().get("feature") or {}):
            pytest.skip("feature not present in this SDK: validate")
        client = DigitaloceanSDK.test(
            None, {"feature": {"validate": {"active": True}}})
        with pytest.raises(Exception) as err:
            client.ContainerRegistry(None).list({"blobs_deleted": "x"}, None)
        assert "validate_failed" == getattr(err.value, "code", None)

    def test_should_run_basic_flow(self):
        setup = _container_registry_basic_setup(None)
        # Per-op sdk-test-control.json skip — basic test exercises a flow with
        # multiple ops; skipping any one skips the whole flow (steps depend
        # on each other).
        _live = setup.get("live", False)
        for _op in ["create", "list", "load", "remove"]:
            _skip, _reason = runner.is_control_skipped("entityOp", "container_registry." + _op, "live" if _live else "unit")
            if _skip:
                pytest.skip(_reason or "skipped via sdk-test-control.json")
                return
        if setup["live"]:
            for _live_key in ["registry_name01", "repository_name01"]:
                if setup.get("synthetic_only") or setup["idmap"].get(_live_key) is None:
                    runner.live_miss(LIVE_STRICT, f"Live entity test blocked: needs {_live_key} via DIGITALOCEAN_TEST_CONTAINER_REGISTRY_ENTID")
        client = setup["client"]

        # CREATE
        container_registry_ref01_ent = client.ContainerRegistry(None)
        container_registry_ref01_data = helpers.to_map(vs.getprop(
            vs.getpath(setup["data"], "new.container_registry"), "container_registry_ref01"))
        container_registry_ref01_data["registry_name"] = setup["idmap"]["registry_name01"]
        container_registry_ref01_data["repository_name"] = setup["idmap"]["repository_name01"]

        container_registry_ref01_data = helpers.to_map(runner.entity_data(container_registry_ref01_ent.create(container_registry_ref01_data, None)))
        assert container_registry_ref01_data is not None
        assert container_registry_ref01_data["id"] is not None

        # LIST
        container_registry_ref01_match = {}

        container_registry_ref01_list_result = container_registry_ref01_ent.list(container_registry_ref01_match, None)
        assert isinstance(container_registry_ref01_list_result, list)

        found_item = vs.select(
            runner.entity_list_to_data(container_registry_ref01_list_result),
            {"id": container_registry_ref01_data["id"]})
        assert not vs.isempty(found_item)

        # LOAD
        container_registry_ref01_match_dt0 = {
            "id": container_registry_ref01_data["id"],
        }
        container_registry_ref01_data_dt0_loaded = container_registry_ref01_ent.load(container_registry_ref01_match_dt0, None)
        container_registry_ref01_data_dt0_load_result = helpers.to_map(runner.entity_data(container_registry_ref01_data_dt0_loaded))
        assert container_registry_ref01_data_dt0_load_result is not None
        assert container_registry_ref01_data_dt0_load_result["id"] == container_registry_ref01_data["id"]

        # REMOVE
        container_registry_ref01_match_rm0 = {
            "id": container_registry_ref01_data["id"],
        }
        container_registry_ref01_ent.remove(container_registry_ref01_match_rm0, None)

        # LIST
        container_registry_ref01_match_rt0 = {}

        container_registry_ref01_list_rt0_result = container_registry_ref01_ent.list(container_registry_ref01_match_rt0, None)
        assert isinstance(container_registry_ref01_list_rt0_result, list)

        not_found_item = vs.select(
            runner.entity_list_to_data(container_registry_ref01_list_rt0_result),
            {"id": container_registry_ref01_data["id"]})
        assert vs.isempty(not_found_item)



def _container_registry_basic_setup(extra):
    runner.load_env_local()

    entity_data_file = os.path.join(_TEST_DIR, "../../.sdk/test/entity/container_registry/ContainerRegistryTestData.json")
    with open(entity_data_file, "r", encoding="utf-8") as f:
        entity_data_source = f.read()

    entity_data = json.loads(entity_data_source)

    options = {}
    options["entity"] = entity_data.get("existing")

    client = DigitaloceanSDK.test(options, extra)

    # Generate idmap via transform.
    idmap = vs.transform(
        ["container_registry01", "container_registry02", "container_registry03", "tag01", "tag02", "tag03", "registry_name01", "repository_name01"],
        {
            "`$PACK`": ["", {
                "`$KEY`": "`$COPY`",
                "`$VAL`": ["`$FORMAT`", "upper", "`$COPY`"],
            }],
        }
    )

    # Whether *_ENTID supplied the idmap, read before env_override consumes
    # it: without it, the ids a live flow binds are the fixture's synthetic ones.
    _entid_env_raw = os.environ.get(
        "DIGITALOCEAN_TEST_CONTAINER_REGISTRY_ENTID")
    _idmap_overridden = _entid_env_raw is not None and _entid_env_raw.strip().startswith("{")

    env = runner.env_override({
        "DIGITALOCEAN_TEST_CONTAINER_REGISTRY_ENTID": idmap,
        "DIGITALOCEAN_TEST_LIVE": "FALSE",
        "DIGITALOCEAN_TEST_EXPLAIN": "FALSE",
        "DIGITALOCEAN_APIKEY": "",
    })

    idmap_resolved = helpers.to_map(
        env.get("DIGITALOCEAN_TEST_CONTAINER_REGISTRY_ENTID"))
    if idmap_resolved is None:
        idmap_resolved = helpers.to_map(idmap)

    if env.get("DIGITALOCEAN_TEST_LIVE") == "TRUE":
        merged_opts = vs.merge([
            # FIRST, so the generated fields below win: sdk-test-control.json's
            # test.client.options adds to the live client, it does not
            # redirect it.
            runner.live_client_options(),
            {
                "apikey": env.get("DIGITALOCEAN_APIKEY"),
            },
            extra or {},
        ])
        client = DigitaloceanSDK(helpers.to_map(merged_opts))

    _live = env.get("DIGITALOCEAN_TEST_LIVE") == "TRUE"
    return {
        "client": client,
        "data": entity_data,
        "idmap": idmap_resolved,
        "env": env,
        "explain": env.get("DIGITALOCEAN_TEST_EXPLAIN") == "TRUE",
        "live": _live,
        "synthetic_only": _live and not _idmap_overridden,
        "now": int(time.time() * 1000),
    }
