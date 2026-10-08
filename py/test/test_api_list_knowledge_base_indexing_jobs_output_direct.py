# ApiListKnowledgeBaseIndexingJobsOutput direct test

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


class TestApiListKnowledgeBaseIndexingJobsOutputDirect:

    def test_should_direct_list_api_list_knowledge_base_indexing_jobs_output(self):
        setup = _api_list_knowledge_base_indexing_jobs_output_direct_setup([
            {"id": "direct01"},
            {"id": "direct02"},
        ])
        _skip, _reason = runner.is_control_skipped("direct", "direct-list-api_list_knowledge_base_indexing_jobs_output", "live" if setup["live"] else "unit")
        if _skip:
            pytest.skip(_reason or "skipped via sdk-test-control.json")
            return
        if setup["live"]:
            for _live_key in ["knowledge_base01"]:
                if setup["idmap"].get(_live_key) is None:
                    runner.live_miss(LIVE_STRICT, f"Live test blocked: needs {_live_key} via DIGITALOCEAN_TEST_API_LIST_KNOWLEDGE_BASE_INDEXING_JOBS_OUTPUT_ENTID")

        client = setup["client"]

        params = {}
        if setup["live"]:
            params["knowledge_base_id"] = setup["idmap"].get("knowledge_base01")
        else:
            params["knowledge_base_id"] = "direct01"

        result = client.direct({
            "path": "v2/gen-ai/knowledge_bases/{knowledge_base_id}/indexing_jobs",
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



def _api_list_knowledge_base_indexing_jobs_output_direct_setup(mockres):
    runner.load_env_local()

    calls = []

    env = runner.env_override({
        "DIGITALOCEAN_TEST_API_LIST_KNOWLEDGE_BASE_INDEXING_JOBS_OUTPUT_ENTID": {},
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
        idmap = env.get("DIGITALOCEAN_TEST_API_LIST_KNOWLEDGE_BASE_INDEXING_JOBS_OUTPUT_ENTID")
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
