# AppsDeployment direct test

import json
import pytest

from digitalocean_sdk.utility.voxgig_struct import voxgig_struct as vs
from digitalocean_sdk import DigitaloceanSDK
from digitalocean_sdk.core import helpers
from test import runner


# main.kit.test.live.strict is true (the default is true): a live
# request that fails, or a live test missing an input it needs,
# fails the test.
# An account with no record for a test to read skips it either way.
LIVE_STRICT = True


def _live_ok(result):
    status = helpers.to_int(result.get("status"))
    return result.get("err") is None and bool(result.get("ok")) and 200 <= status < 300


class TestAppsDeploymentDirect:

    def test_should_direct_list_apps_deployment(self):
        setup = _apps_deployment_direct_setup([
            {"id": "direct01"},
            {"id": "direct02"},
        ])
        _skip, _reason = runner.is_control_skipped("direct", "direct-list-apps_deployment", "live" if setup["live"] else "unit")
        if _skip:
            pytest.skip(_reason or "skipped via sdk-test-control.json")
            return
        if setup["live"]:
            for _live_key in ["app01"]:
                if setup["idmap"].get(_live_key) is None:
                    runner.live_miss(LIVE_STRICT, f"Live test blocked: needs {_live_key} via DIGITALOCEAN_TEST_APPS_DEPLOYMENT_ENTID")

        client = setup["client"]

        params = {}
        if setup["live"]:
            params["app_id"] = setup["idmap"].get("app01")
        else:
            params["app_id"] = "direct01"

        result = client.direct({
            "path": "v2/apps/{app_id}/deployments",
            "method": "GET",
            "params": params,
        })
        if setup["live"]:
            if not _live_ok(result):
                runner.live_miss(LIVE_STRICT, "Live list failed: " + runner.live_describe(result))
            if runner.live_list(result.get("data")) is None:
                runner.live_miss(LIVE_STRICT, "Live list returned no list: " + runner.live_describe(result))
        else:
            assert result["ok"] is True
            assert helpers.to_int(result["status"]) == 200
            assert isinstance(result["data"], list)
            assert len(result["data"]) == 2
            assert len(setup["calls"]) == 1

    def test_should_direct_load_apps_deployment(self):
        setup = _apps_deployment_direct_setup({"id": "direct01"})
        _skip, _reason = runner.is_control_skipped("direct", "direct-load-apps_deployment", "live" if setup["live"] else "unit")
        if _skip:
            pytest.skip(_reason or "skipped via sdk-test-control.json")
            return
        client = setup["client"]

        params = {}
        query = {}
        if setup["live"]:
            params["app_id"] = "4f6c71e2-1e90-4762-9fee-6cc4a0a9f2cf"
            params["id"] = "3aa4d20e-5527-4c00-b496-601fbd22520a"
            pass
        else:
            params["app_id"] = "direct01"
            params["id"] = "direct02"
            pass

        result = client.direct({
            "path": "v2/apps/{app_id}/deployments/{id}",
            "method": "GET",
            "params": params,
            "query": query,
        })
        if setup["live"]:
            if not _live_ok(result):
                runner.live_miss(LIVE_STRICT, "Live load failed: " + runner.live_describe(result))
            if result.get("data") is None:
                runner.live_miss(LIVE_STRICT, "Live load returned no data: " + runner.live_describe(result))
        else:
            assert result["ok"] is True
            assert helpers.to_int(result["status"]) == 200
            assert result["data"] is not None
            if isinstance(result["data"], dict):
                assert result["data"]["id"] == "direct01"
            assert len(setup["calls"]) == 1



def _apps_deployment_direct_setup(mockres):
    runner.load_env_local()

    calls = []

    env = runner.env_override({
        "DIGITALOCEAN_TEST_APPS_DEPLOYMENT_ENTID": {},
        "DIGITALOCEAN_TEST_LIVE": "FALSE",
        "DIGITALOCEAN_APIKEY": "",
    })

    live = env.get("DIGITALOCEAN_TEST_LIVE") == "TRUE"

    if live:
        # sdk-test-control.json's test.client.options seeds the live
        # client; the generated fields below overwrite anything they name.
        merged_opts = dict(runner.live_client_options())
        merged_opts.update({
            "apikey": env.get("DIGITALOCEAN_APIKEY"),
        })
        client = DigitaloceanSDK(merged_opts)
        idmap = env.get("DIGITALOCEAN_TEST_APPS_DEPLOYMENT_ENTID")
        return {
            "client": client,
            "calls": calls,
            "live": True,
            "idmap": idmap if isinstance(idmap, dict) else {},
        }

    def mock_fetch(url, init):
        calls.append({"url": url, "init": init})
        return {
            "status": 200,
            "statusText": "OK",
            "headers": {},
            "json": lambda: mockres if mockres is not None else {"id": "direct01"},
            "body": "mock",
        }, None

    client = DigitaloceanSDK({
        "base": "http://localhost:8080",
        "system": {
            "fetch": mock_fetch,
        },
    })

    return {
        "client": client,
        "calls": calls,
        "live": False,
        "idmap": {},
    }
