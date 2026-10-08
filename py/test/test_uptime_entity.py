# Uptime entity test

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



# main.kit.test.live.strict is true (the default is true): a live
# request that fails, or a live test missing an input it needs,
# fails the test.
# An account with no record for a test to read skips it either way.
LIVE_STRICT = True


class TestUptimeEntity:

    def test_should_create_instance(self):
        testsdk = DigitaloceanSDK.test(None, None)
        ent = testsdk.Uptime(None)
        assert ent is not None

    def test_should_refuse_an_invalid_request(self):
        if "validate" not in (shared_config().get("feature") or {}):
            pytest.skip("feature not present in this SDK: validate")
        client = DigitaloceanSDK.test(
            None, {"feature": {"validate": {"active": True}}})
        with pytest.raises(Exception) as err:
            client.Uptime(None).list({"check_id": 1}, None)
        assert "validate_failed" == getattr(err.value, "code", None)

    def test_should_run_basic_flow(self):
        setup = _uptime_basic_setup(None)
        # Per-op sdk-test-control.json skip — basic test exercises a flow with
        # multiple ops; skipping any one skips the whole flow (steps depend
        # on each other).
        _live = setup.get("live", False)
        for _op in ["create", "list", "update", "load", "remove"]:
            _skip, _reason = runner.is_control_skipped("entityOp", "uptime." + _op, "live" if _live else "unit")
            if _skip:
                pytest.skip(_reason or "skipped via sdk-test-control.json")
                return
        if setup["live"]:
            for _live_key in ["check01"]:
                if setup.get("synthetic_only") or setup["idmap"].get(_live_key) is None:
                    runner.live_miss(LIVE_STRICT, f"Live entity test blocked: needs {_live_key} via DIGITALOCEAN_TEST_UPTIME_ENTID")
        client = setup["client"]

        # CREATE
        uptime_ref01_ent = client.Uptime(None)
        uptime_ref01_data = helpers.to_map(vs.getprop(
            vs.getpath(setup["data"], "new.uptime"), "uptime_ref01"))
        uptime_ref01_data["check_id"] = setup["idmap"]["check01"]

        uptime_ref01_data = helpers.to_map(runner.entity_data(uptime_ref01_ent.create(uptime_ref01_data, None)))
        assert uptime_ref01_data is not None
        assert uptime_ref01_data["id"] is not None

        # LIST
        uptime_ref01_match = {}

        uptime_ref01_list_result = uptime_ref01_ent.list(uptime_ref01_match, None)
        assert isinstance(uptime_ref01_list_result, list)

        found_item = vs.select(
            runner.entity_list_to_data(uptime_ref01_list_result),
            {"id": uptime_ref01_data["id"]})
        assert not vs.isempty(found_item)

        # UPDATE
        uptime_ref01_data_up0_up = {
            "id": uptime_ref01_data["id"],
        }

        uptime_ref01_markdef_up0_name = "comparison"
        uptime_ref01_markdef_up0_value = "Mark01-uptime_ref01_" + str(setup["now"])
        uptime_ref01_data_up0_up[uptime_ref01_markdef_up0_name] = uptime_ref01_markdef_up0_value

        uptime_ref01_resdata_up0 = helpers.to_map(runner.entity_data(uptime_ref01_ent.update(uptime_ref01_data_up0_up, None)))
        assert uptime_ref01_resdata_up0 is not None
        assert uptime_ref01_resdata_up0["id"] == uptime_ref01_data_up0_up["id"]
        assert uptime_ref01_resdata_up0[uptime_ref01_markdef_up0_name] == uptime_ref01_markdef_up0_value

        # LOAD
        uptime_ref01_match_dt0 = {
            "id": uptime_ref01_data["id"],
        }
        uptime_ref01_data_dt0_loaded = uptime_ref01_ent.load(uptime_ref01_match_dt0, None)
        uptime_ref01_data_dt0_load_result = helpers.to_map(runner.entity_data(uptime_ref01_data_dt0_loaded))
        assert uptime_ref01_data_dt0_load_result is not None
        assert uptime_ref01_data_dt0_load_result["id"] == uptime_ref01_data["id"]

        # REMOVE
        uptime_ref01_match_rm0 = {
            "id": uptime_ref01_data["id"],
        }
        uptime_ref01_ent.remove(uptime_ref01_match_rm0, None)

        # LIST
        uptime_ref01_match_rt0 = {}

        uptime_ref01_list_rt0_result = uptime_ref01_ent.list(uptime_ref01_match_rt0, None)
        assert isinstance(uptime_ref01_list_rt0_result, list)

        not_found_item = vs.select(
            runner.entity_list_to_data(uptime_ref01_list_rt0_result),
            {"id": uptime_ref01_data["id"]})
        assert vs.isempty(not_found_item)



def _uptime_basic_setup(extra):
    runner.load_env_local()

    entity_data_file = os.path.join(_TEST_DIR, "../../.sdk/test/entity/uptime/UptimeTestData.json")
    with open(entity_data_file, "r", encoding="utf-8") as f:
        entity_data_source = f.read()

    entity_data = json.loads(entity_data_source)

    options = {}
    options["entity"] = entity_data.get("existing")

    client = DigitaloceanSDK.test(options, extra)

    # Generate idmap via transform.
    idmap = vs.transform(
        ["uptime01", "uptime02", "uptime03", "check01"],
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
        "DIGITALOCEAN_TEST_UPTIME_ENTID")
    _idmap_overridden = _entid_env_raw is not None and _entid_env_raw.strip().startswith("{")

    env = runner.env_override({
        "DIGITALOCEAN_TEST_UPTIME_ENTID": idmap,
        "DIGITALOCEAN_TEST_LIVE": "FALSE",
        "DIGITALOCEAN_TEST_EXPLAIN": "FALSE",
        "DIGITALOCEAN_APIKEY": "",
    })

    idmap_resolved = helpers.to_map(
        env.get("DIGITALOCEAN_TEST_UPTIME_ENTID"))
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
