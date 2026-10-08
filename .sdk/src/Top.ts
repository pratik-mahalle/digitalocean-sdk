

import {
  cmp,
  Folder,
  Deploy,
  PublishWorkflow,
  ReadmeTop,
  AgentGuideTop,
  License,
  Security,
  Changelog,
} from '@voxgig/sdkgen'


const Top = cmp(function Top(props: any) {
  // The root README.md is hand-written. ReadmeTop still runs (it also prepares
  // names other components use) but writes its README under doc/ instead.
  Folder({ name: 'doc/generated-readme' }, () => {
    ReadmeTop({})
  })

  // Agent onboarding guides at the project root: AGENTS.md + a thin CLAUDE.md,
  // populated with the real target / feature / entity lists. Emitted outside
  // any target Folder (same placement rule as ReadmeTop / Deploy).
  AgentGuideTop({})

  License({})
  Security({})
  Changelog({})

  // Root deployment Makefile: per-target `make deploy-<t>` (publish with
  // credentials injected by the aql key vault) plus an all-targets
  // `make deploy-dry` rehearsal.
  Deploy({})

  PublishWorkflow({})
})


export {
  Top
}

