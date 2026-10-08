# Digitalocean SDK exists test

import pytest
from digitalocean_sdk import DigitaloceanSDK


class TestExists:

    def test_should_create_test_sdk(self):
        testsdk = DigitaloceanSDK.test(None, None)
        assert testsdk is not None
