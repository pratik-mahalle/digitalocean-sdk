# Digitalocean SDK utility: make_context

from projectname_sdk.core.context import DigitaloceanContext


def make_context_util(ctxmap, basectx):
    return DigitaloceanContext(ctxmap, basectx)
